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

    // 2. Total Revenue: Sum of APPROVED payment proofs
    const approvedPayments = await db.paymentProof.aggregate({
      where: { 
        status: 'APPROVED',
        ...(dateFilter && { updatedAt: dateFilter })
      },
      _sum: { amount: true }
    });
    const totalRevenue = Number(approvedPayments._sum.amount || 0);

    // 3. Dynamic Debt Calculation
    let totalDebt = 0;

    if (!dateFilter) {
      // TOTAL: Live standing credit balance snapshot across all sales reps
      const reps = await db.user.aggregate({
        where: { role: 'SALES_REP' },
        _sum: { creditBalance: true }
      });
      totalDebt = Number(reps._sum.creditBalance || 0);
    } else {
      // PERIOD FILTERED: (Total Stock Checked Out - Total Approved Returns)
      const issued = (db as any).stockIssuance
        ? await (db as any).stockIssuance.aggregate({
            where: { createdAt: dateFilter },
            _sum: { totalWholesaleValue: true }
          })
        : { _sum: { totalWholesaleValue: 0 } };

      const returned = (db as any).stockReturn
        ? await (db as any).stockReturn.aggregate({
            where: { 
              status: 'APPROVED',
              updatedAt: dateFilter 
            },
            _sum: { totalValue: true }
          })
        : { _sum: { totalValue: 0 } };

      const issuedAmount = Number(issued._sum?.totalWholesaleValue || 0);
      const returnedAmount = Number(returned._sum?.totalValue || 0);

      totalDebt = issuedAmount - returnedAmount;
    }

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