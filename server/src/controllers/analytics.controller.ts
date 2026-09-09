import { Request, Response, NextFunction } from "express";
import { db } from "../config/db.js";

export const getFinancialSummary = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { period } = req.query; // 'Today', 'Yesterday', 'This Week', 'Total'

    // 1. Calculate isolated date boundaries without mutating shared Date objects
    let dateFilter: any = undefined;

    if (period && period !== 'Total') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (period === 'Today') {
        dateFilter = { gte: today };
      } else if (period === 'Yesterday') {
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        dateFilter = { gte: yesterday, lt: today };
      } else if (period === 'This Week') {
        const startOfWeek = new Date(today);
        const currentDay = startOfWeek.getDay(); 
        
        // JS defaults Sunday to 0. We shift it so Monday is 0 days away, and Sunday is 6 days away.
        const distanceToMonday = currentDay === 0 ? 6 : currentDay - 1;
        
        startOfWeek.setDate(startOfWeek.getDate() - distanceToMonday);
        dateFilter = { gte: startOfWeek };
      }
    }

    // 2. Total Revenue: Sum of live Sales records, filtered by date if a period is selected
    const salesAggregate = await db.sale.aggregate({
      where: {
        ...(dateFilter && { createdAt: dateFilter })
      },
      _sum: { totalAmount: true }
    });
    const totalRevenue = Number(salesAggregate._sum.totalAmount || 0);

    // 3. Dynamic Supplier Debt Calculation (Mirrors the Suppliers page)
    const batches = await db.inventoryBatch.findMany({
      ...(dateFilter ? { where: { createdAt: dateFilter } } : {})
    });

    const batchMap = new Map();
    batches.forEach(b => {
      if (!batchMap.has(b.batchCode)) {
        batchMap.set(b.batchCode, { totalAmount: 0, amountPaid: 0 });
      }
      const entry = batchMap.get(b.batchCode);
      entry.totalAmount += Number(b.quantityRecieved) * Number(b.unitCostPrice);
      entry.amountPaid += Number(b.amountPaid || 0);
    });

    const totalDebt = Array.from(batchMap.values()).reduce((sum: number, batch: any) => {
      const unpaid = batch.totalAmount - batch.amountPaid;
      return sum + Math.max(0, unpaid);
    }, 0);

    // 4. Net Balance Calculation
    const netBalance = totalRevenue - totalDebt;

    res.status(200).json({
      status: 'success',
      data: {
        netBalance,
        totalRevenue,
        totalDebt
      }
    });
  } catch (err) {
    next(err);
  }
};