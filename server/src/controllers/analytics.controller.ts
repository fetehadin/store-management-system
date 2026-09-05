import { Request, Response, NextFunction } from "express";
import { db } from "../config/db.js";

export const getFinancialSummary = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { period } = req.query; // 'Today', 'Yesterday', 'This Week', 'Total'

    // Calculate date filters based on the period
    let dateFilter = {};
    const now = new Date();
    
    if (period === 'Today') {
      const startOfDay = new Date(now.setHours(0, 0, 0, 0));
      dateFilter = { gte: startOfDay };
    } else if (period === 'Yesterday') {
      const startOfYesterday = new Date(now.setDate(now.getDate() - 1));
      startOfYesterday.setHours(0, 0, 0, 0);
      const endOfYesterday = new Date(startOfYesterday);
      endOfYesterday.setHours(23, 59, 59, 999);
      dateFilter = { gte: startOfYesterday, lte: endOfYesterday };
    } else if (period === 'This Week') {
      const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
      startOfWeek.setHours(0, 0, 0, 0);
      dateFilter = { gte: startOfWeek };
    }

    // 1. Total Revenue: Sum of all APPROVED payments in this period
    const approvedPayments = await db.paymentProof.aggregate({
      where: { 
        status: 'APPROVED',
        ...(period !== 'Total' && { updatedAt: dateFilter })
      },
      _sum: { amount: true }
    });
    const totalRevenue = Number(approvedPayments._sum.amount || 0);

    // 2. Total Debt: Sum of all active credit balances from Sales Reps
    const reps = await db.user.aggregate({
      where: { role: 'SALES_REP' },
      _sum: { creditBalance: true }
    });
    const totalDebt = Number(reps._sum.creditBalance || 0);

    // 3. Net Balance
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