import { Request, Response, NextFunction } from "express";
import { db } from "../config/db.js";

// GET /api/v1/admin/suppliers
export const getSuppliers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const suppliers = await db.supplier.findMany({
      include: {
        batches: {
          include: { product: true },
          orderBy: { createdAt: 'desc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    const formattedSuppliers = suppliers.map((sup: any) => {
      const batchMap = new Map();

      sup.batches.forEach((b: any) => {
        if (!batchMap.has(b.batchCode)) {
          batchMap.set(b.batchCode, {
            id: b.batchCode,
            date: b.createdAt.toLocaleDateString(),
            status: 'Unpaid',
            totalAmount: 0,
            items: []
          });
        }
        
        const batchEntry = batchMap.get(b.batchCode);
        const lineTotal = Number(b.quantityRecieved) * Number(b.unitCostPrice);
        batchEntry.totalAmount += lineTotal;

        batchEntry.items.push({
          id: b.id,
          name: b.product.name,
          category: b.product.category || 'General',
          qty: b.quantityRecieved,
          cost: Number(b.unitCostPrice),
          selling: Number(b.product.price)
        });
      });

      return {
        id: sup.id,
        name: sup.name,
        totalPayable: Number(sup.creditBalance || 0),
        batches: Array.from(batchMap.values())
      };
    });

    res.status(200).json({ status: 'success', data: formattedSuppliers });
  } catch (err) {
    next(err);
  }
};

// POST /api/v1/admin/suppliers
export const enrollSupplier = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, items } = req.body;

    if (!name || !items || !Array.isArray(items) || items.length === 0) {
      res.status(400).json({ message: "Vendor name and items are required." });
      return;
    }

    const batchCode = `BATCH-${Math.floor(1000 + Math.random() * 9000)}`;
    const batchTotal = items.reduce((sum: number, item: any) => sum + (item.qty * item.cost), 0);

    const newSupplier = await db.$transaction(async (tx) => {
      const supplier = await tx.supplier.create({
        data: {
          name,
          creditBalance: batchTotal,
        }
      });

      for (const item of items) {
        let product = await tx.product.findFirst({ where: { name: item.name } });
        if (product) {
          product = await tx.product.update({
            where: { id: product.id },
            data: {
              price: item.selling,
              category: item.category || product.category,
              imageUrl: item.photoUri || product.imageUrl
            }
          });
        } else {
          product = await tx.product.create({
            data: {
              name: item.name,
              category: item.category || 'General',
              price: item.selling,
              imageUrl: item.photoUri || null
            }
          });
        }

        await tx.inventoryBatch.create({
          data: {
            batchCode,
            supplierId: supplier.id,
            productId: product.id,
            quantityRecieved: Number(item.qty),
            remainingQty: Number(item.qty),
            unitCostPrice: Number(item.cost)
          }
        });
      }

      return supplier;
    });

    res.status(201).json({ status: 'success', data: newSupplier });
  } catch (err) {
    next(err);
  }
};

// POST /api/v1/admin/suppliers/:id/batches
export const addSupplierBatch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      res.status(400).json({ message: "Batch items are required." });
      return;
    }

    const batchCode = `BATCH-${Math.floor(1000 + Math.random() * 9000)}`;
    const batchTotal = items.reduce((sum: number, item: any) => sum + (item.qty * item.cost), 0);

    await db.$transaction(async (tx) => {
      const supplier = await tx.supplier.findUnique({ where: { id } });
      const newBalance = Number(supplier?.creditBalance || 0) + batchTotal;

      await tx.supplier.update({
        where: { id },
        data: { creditBalance: newBalance }
      });

      for (const item of items) {
        let product = await tx.product.findFirst({ where: { name: item.name } });
        if (product) {
          product = await tx.product.update({
            where: { id: product.id },
            data: { price: item.selling, category: item.category || product.category }
          });
        } else {
          product = await tx.product.create({
            data: {
              name: item.name,
              category: item.category || 'General',
              price: item.selling,
              imageUrl: item.photoUri || null
            }
          });
        }

        await tx.inventoryBatch.create({
          data: {
            batchCode,
            supplierId: id,
            productId: product.id,
            quantityRecieved: Number(item.qty),
            remainingQty: Number(item.qty),
            unitCostPrice: Number(item.cost)
          }
        });
      }
    });

    res.status(201).json({ status: 'success' });
  } catch (err) {
    next(err);
  }
};

// POST /api/v1/admin/suppliers/:supplierId/batches/:batchCode/pay
export const paySupplierBatch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { supplierId, batchCode } = req.params;
    const { amount, transferMethod, reference } = req.body;

    const paymentAmount = Number(amount);
    if (isNaN(paymentAmount) || paymentAmount <= 0) {
      res.status(400).json({ message: 'Valid payment amount required.' });
      return;
    }

    const result = await db.$transaction(async (tx) => {
      const supplier = await tx.supplier.findUnique({ where: { id: supplierId } });
      const currentBalance = Number(supplier?.creditBalance || 0);
      const newBalance = Math.max(0, currentBalance - paymentAmount); // Clamp at 0

      const updatedSupplier = await tx.supplier.update({
        where: { id: supplierId },
        data: { creditBalance: newBalance }
      });

      await tx.ledgerEntry.create({
        data: {
          fromEntity: 'ADMIN_STORE',
          toEntity: 'SUPPLIER',
          toEntityId: supplierId,
          amount: paymentAmount,
          transferMethod: transferMethod || 'CASH',
          auditRemark: `Paid against batch ${batchCode}. Ref: ${reference || 'N/A'}`,
          transactionRefId: `BATCH-PAY-${Date.now()}`,
        }
      });

      return { updatedSupplier };
    });

    res.status(200).json({ status: 'success', data: result.updatedSupplier });
  } catch (err) {
    next(err);
  }
};

// POST /api/v1/admin/suppliers/:supplierId/batches/:batchCode/refund
export const refundSupplierBatch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { supplierId, batchCode } = req.params;
    const { refunds } = req.body;

    if (!refunds || !Array.isArray(refunds) || refunds.length === 0) {
       res.status(400).json({ message: 'Valid refund items required.' });
       return;
    }

    await db.$transaction(async (tx) => {
      let totalRefundValue = 0;

      for (const refund of refunds) {
        const batchRow = await tx.inventoryBatch.findUnique({ where: { id: refund.itemId } });
        if (!batchRow) continue;

        const actualRefundQty = Math.min(batchRow.remainingQty, refund.refundQty);
        totalRefundValue += (Number(batchRow.unitCostPrice) * actualRefundQty);

        await tx.inventoryBatch.update({
          where: { id: refund.itemId },
          data: { 
            quantityRecieved: { decrement: actualRefundQty },
            remainingQty: { decrement: actualRefundQty } 
          }
        });
      }

      const supplier = await tx.supplier.findUnique({ where: { id: supplierId } });
      const currentBalance = Number(supplier?.creditBalance || 0);
      const newBalance = Math.max(0, currentBalance - totalRefundValue); // Clamp at 0

      await tx.supplier.update({
        where: { id: supplierId },
        data: { creditBalance: newBalance }
      });

      await tx.ledgerEntry.create({
        data: {
          fromEntity: 'SUPPLIER',
          toEntity: 'ADMIN_STORE',
          toEntityId: supplierId,
          amount: totalRefundValue,
          transferMethod: 'REFUND_ADJUSTMENT',
          auditRemark: `Refunded items from batch ${batchCode}.`,
          transactionRefId: `BATCH-REFUND-${Date.now()}`,
        }
      });
    });

    res.status(200).json({ status: 'success' });
  } catch (err) {
    next(err);
  }
};