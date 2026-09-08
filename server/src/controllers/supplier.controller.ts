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
      let supplierTotalDynamicDebt = 0; 

      sup.batches.forEach((b: any) => {
        if (!batchMap.has(b.batchCode)) {
          batchMap.set(b.batchCode, { id: b.batchCode, date: b.createdAt.toLocaleDateString(), totalAmount: 0, amountPaid: 0, items: [] });
        }
        const batchEntry = batchMap.get(b.batchCode);
        const lineTotal = Number(b.quantityRecieved) * Number(b.unitCostPrice);
        const linePaid = Number(b.amountPaid || 0);

        batchEntry.totalAmount += lineTotal;
        batchEntry.amountPaid += linePaid;
        batchEntry.items.push({
          id: b.id, name: b.product.name, category: b.product.category || 'General',
          qty: b.quantityRecieved, remainingQty: b.remainingQty, cost: Number(b.unitCostPrice), selling: Number(b.product.price)
        });
      });

      const batchesArray = Array.from(batchMap.values()).map((batch: any) => {
        const unpaid = batch.totalAmount - batch.amountPaid;
        supplierTotalDynamicDebt += unpaid;
        return { ...batch, unpaidAmount: Math.max(0, unpaid) };
      });

      return { id: sup.id, name: sup.name, totalPayable: supplierTotalDynamicDebt, batches: batchesArray };
    });
    res.status(200).json({ status: 'success', data: formattedSuppliers });
  } catch (err) { next(err); }
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
          data: { batchCode, supplierId: supplier.id, productId: product.id, quantityRecieved: Number(item.qty), remainingQty: Number(item.qty), unitCostPrice: Number(item.cost) }
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
          data: { batchCode, supplierId: id, productId: product.id, quantityRecieved: Number(item.qty), remainingQty: Number(item.qty), unitCostPrice: Number(item.cost) }
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

    if (isNaN(remainingPayment) || remainingPayment <= 0) {
      res.status(400).json({ message: 'Valid payment amount required.' }); return;
    }

    await db.$transaction(async (tx) => {
      const batches = await tx.inventoryBatch.findMany({ where: { batchCode, supplierId }, orderBy: { createdAt: 'asc' } });
      
      for (const b of batches) {
        if (remainingPayment <= 0) break;
        const lineDebt = (Number(b.quantityRecieved) * Number(b.unitCostPrice)) - Number(b.amountPaid);

        if (lineDebt > 0) {
          const payForThisLine = Math.min(lineDebt, remainingPayment);
          await tx.inventoryBatch.update({ where: { id: b.id }, data: { amountPaid: { increment: payForThisLine } } });
          remainingPayment -= payForThisLine;
        }
      }

      const supplier = await tx.supplier.findUnique({ where: { id: supplierId } });
      const newBalance = Math.max(0, Number(supplier?.creditBalance || 0) - Number(amount));
      await tx.supplier.update({ where: { id: supplierId }, data: { creditBalance: newBalance } });

      await tx.ledgerEntry.create({
        data: {
          fromEntity: 'ADMIN_STORE', toEntity: 'SUPPLIER', toEntityId: supplierId, amount: Number(amount),
          transferMethod: transferMethod || 'CASH', auditRemark: `Paid against batch ${batchCode}.`, transactionRefId: `BATCH-PAY-${Date.now()}`
        }
      });
    });
    res.status(200).json({ status: 'success' });
  } catch (err) { next(err); }
};

export const refundSupplierBatch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { supplierId, batchCode } = req.params;
    const { refunds } = req.body;

    if (!refunds || !Array.isArray(refunds) || refunds.length === 0) {
       res.status(422).json({ message: 'Valid refund items required.' }); return;
    }

    await db.$transaction(async (tx) => {
      let totalRefundValue = 0;
      for (const refund of refunds) {
        const batchRow = await tx.inventoryBatch.findUnique({ where: { id: refund.itemId } });
        if (!batchRow) throw new Error(`Batch item ${refund.itemId} not found.`);

        // --- STRICT BUSINESS LOGIC VALIDATION ---
        if (refund.refundQty > batchRow.remainingQty) {
          throw new Error(`Invalid refund: You requested to refund ${refund.refundQty}, but only ${batchRow.remainingQty} remain in stock.`);
        }

        const actualRefundQty = refund.refundQty;
        totalRefundValue += (Number(batchRow.unitCostPrice) * actualRefundQty);

        await tx.inventoryBatch.update({
          where: { id: refund.itemId },
          data: { quantityRecieved: { decrement: actualRefundQty }, remainingQty: { decrement: actualRefundQty } }
        });
      }
      
      const supplier = await tx.supplier.findUnique({ where: { id: supplierId } });
      const newBalance = Math.max(0, Number(supplier?.creditBalance || 0) - totalRefundValue);
      await tx.supplier.update({ where: { id: supplierId }, data: { creditBalance: newBalance } });

      await tx.ledgerEntry.create({
        data: {
          fromEntity: 'SUPPLIER', toEntity: 'ADMIN_STORE', toEntityId: supplierId, amount: totalRefundValue,
          transferMethod: 'REFUND_ADJUSTMENT', auditRemark: `Refunded items from batch ${batchCode}.`, transactionRefId: `BATCH-REF-${Date.now()}`
        }
      });
    });
    res.status(200).json({ status: 'success' });
  } catch (err: any) { 
    // Catch transaction throws as 400 Bad Request
    res.status(400).json({ status: 'error', message: err.message }); 
  }
};

export const deleteSupplier = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await db.supplier.delete({ where: { id: req.params.id } });
    res.status(200).json({ status: 'success' });
  } catch (err) { next(err); }
};

export const deleteSupplierBatch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await db.inventoryBatch.updateMany({ where: { batchCode: req.params.batchCode, supplierId: req.params.supplierId }, data: { isArchived: true } });
    res.status(200).json({ status: 'success' });
  } catch (err) { next(err); }
};