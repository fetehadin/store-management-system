import { Request, Response, NextFunction } from "express";
import { db } from "../config/db.js";

export const getSuppliers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const suppliers = await db.supplier.findMany({
      include: {
        batches: {
          where: { isArchived: false },
          include: { product: true },
          orderBy: { createdAt: 'desc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    const formattedSuppliers = suppliers.map((sup: any) => {
      const batchMap = new Map();
      let supplierTotalDynamicDebt = 0; // We calculate the real debt on the fly!

      sup.batches.forEach((b: any) => {
        if (!batchMap.has(b.batchCode)) {
          batchMap.set(b.batchCode, {
            id: b.batchCode,
            date: b.createdAt.toLocaleDateString(),
            totalAmount: 0,
            amountPaid: 0,
            items: []
          });
        }
        
        const batchEntry = batchMap.get(b.batchCode);
        const lineTotal = Number(b.quantityRecieved) * Number(b.unitCostPrice);
        const linePaid = Number(b.amountPaid || 0);

        batchEntry.totalAmount += lineTotal;
        batchEntry.amountPaid += linePaid;

        batchEntry.items.push({
          id: b.id,
          name: b.product.name,
          category: b.product.category || 'General',
          qty: b.quantityRecieved,
          remainingQty: b.remainingQty,
          cost: Number(b.unitCostPrice),
          selling: Number(b.product.price)
        });
      });

      // Calculate the specific unpaid amount for each batch
      const batchesArray = Array.from(batchMap.values()).map((batch: any) => {
        const unpaid = batch.totalAmount - batch.amountPaid;
        supplierTotalDynamicDebt += unpaid;
        return {
          ...batch,
          unpaidAmount: Math.max(0, unpaid) // Protect against negative numbers
        };
      });

      return {
        id: sup.id,
        name: sup.name,
        totalPayable: supplierTotalDynamicDebt, // Perfect, dynamic source of truth
        batches: batchesArray
      };
    });

    res.status(200).json({ status: 'success', data: formattedSuppliers });
  } catch (err) {
    next(err);
  }
};

export const enrollSupplier = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, items } = req.body;
    const batchCode = `BATCH-${Math.floor(1000 + Math.random() * 9000)}`;
    const batchTotal = items.reduce((sum: number, item: any) => sum + (item.qty * item.cost), 0);

    const newSupplier = await db.$transaction(async (tx) => {
      const supplier = await tx.supplier.create({ data: { name, creditBalance: batchTotal } });

      for (const item of items) {
        let product = await tx.product.findFirst({ where: { name: item.name } });
        if (product) {
          product = await tx.product.update({ where: { id: product.id }, data: { price: item.selling, category: item.category || product.category, imageUrl: item.photoUri || product.imageUrl } });
        } else {
          product = await tx.product.create({ data: { name: item.name, category: item.category || 'General', price: item.selling, imageUrl: item.photoUri || null } });
        }

        await tx.inventoryBatch.create({
          data: {
            batchCode, supplierId: supplier.id, productId: product.id,
            quantityRecieved: Number(item.qty), remainingQty: Number(item.qty), unitCostPrice: Number(item.cost)
          }
        });
      }
      return supplier;
    });
    res.status(201).json({ status: 'success', data: newSupplier });
  } catch (err) { next(err); }
};

export const addSupplierBatch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { items } = req.body;
    const batchCode = `BATCH-${Math.floor(1000 + Math.random() * 9000)}`;
    const batchTotal = items.reduce((sum: number, item: any) => sum + (item.qty * item.cost), 0);

    await db.$transaction(async (tx) => {
      await tx.supplier.update({ where: { id }, data: { creditBalance: { increment: batchTotal } } });
      for (const item of items) {
        let product = await tx.product.findFirst({ where: { name: item.name } });
        if (product) {
          product = await tx.product.update({ where: { id: product.id }, data: { price: item.selling, category: item.category || product.category } });
        } else {
          product = await tx.product.create({ data: { name: item.name, category: item.category || 'General', price: item.selling, imageUrl: item.photoUri || null } });
        }
        await tx.inventoryBatch.create({
          data: {
            batchCode, supplierId: id, productId: product.id,
            quantityRecieved: Number(item.qty), remainingQty: Number(item.qty), unitCostPrice: Number(item.cost)
          }
        });
      }
    });
    res.status(201).json({ status: 'success' });
  } catch (err) { next(err); }
};

export const paySupplierBatch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { supplierId, batchCode } = req.params;
    const { amount, transferMethod, reference } = req.body;
    let remainingPayment = Number(amount);

    const result = await db.$transaction(async (tx) => {
      // 1. Fetch all items in this batch
      const batches = await tx.inventoryBatch.findMany({ where: { batchCode, supplierId }, orderBy: { createdAt: 'asc' } });
      
      // 2. Distribute payment across items to track exactly what is paid off
      for (const b of batches) {
        if (remainingPayment <= 0) break;
        const lineTotal = Number(b.quantityRecieved) * Number(b.unitCostPrice);
        const linePaid = Number(b.amountPaid);
        const lineDebt = lineTotal - linePaid;

        if (lineDebt > 0) {
          const payForThisLine = Math.min(lineDebt, remainingPayment);
          await tx.inventoryBatch.update({
            where: { id: b.id },
            data: { amountPaid: { increment: payForThisLine } }
          });
          remainingPayment -= payForThisLine;
        }
      }

      await tx.ledgerEntry.create({
        data: {
          fromEntity: 'ADMIN_STORE', toEntity: 'SUPPLIER', toEntityId: supplierId,
          amount: Number(amount), transferMethod: transferMethod || 'CASH',
          auditRemark: `Paid against batch ${batchCode}. Ref: ${reference || 'N/A'}`, transactionRefId: `BATCH-PAY-${Date.now()}`,
        }
      });
      return { success: true };
    });

    res.status(200).json({ status: 'success' });
  } catch (err) { next(err); }
};

export const refundSupplierBatch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { supplierId, batchCode } = req.params;
    const { refunds } = req.body;

    await db.$transaction(async (tx) => {
      let totalRefundValue = 0;
      for (const refund of refunds) {
        const batchRow = await tx.inventoryBatch.findUnique({ where: { id: refund.itemId } });
        if (!batchRow) continue;

        const actualRefundQty = Math.min(batchRow.remainingQty, refund.refundQty);
        totalRefundValue += (Number(batchRow.unitCostPrice) * actualRefundQty);

        await tx.inventoryBatch.update({
          where: { id: refund.itemId },
          data: { quantityRecieved: { decrement: actualRefundQty }, remainingQty: { decrement: actualRefundQty } }
        });
      }
      
      await tx.ledgerEntry.create({
        data: {
          fromEntity: 'SUPPLIER', toEntity: 'ADMIN_STORE', toEntityId: supplierId,
          amount: totalRefundValue, transferMethod: 'REFUND_ADJUSTMENT',
          auditRemark: `Refunded items from batch ${batchCode}.`, transactionRefId: `BATCH-REFUND-${Date.now()}`,
        }
      });
    });
    res.status(200).json({ status: 'success' });
  } catch (err) { next(err); }
};

export const deleteSupplier = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    await db.supplier.delete({ where: { id } });
    res.status(200).json({ status: 'success', message: 'Supplier deleted successfully.' });
  } catch (err) { next(err); }
};

export const deleteSupplierBatch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { supplierId, batchCode } = req.params;
    await db.inventoryBatch.updateMany({
      where: { batchCode: batchCode, supplierId: supplierId },
      data: { isArchived: true }
    });
    res.status(200).json({ status: 'success', message: 'Batch archived successfully.' });
  } catch (err) { next(err); }
};