import { Request, Response, NextFunction } from "express";
import { db } from "../config/db.js";
import bcrypt from "bcrypt";

// GET /api/v1/admin/reps
// GET /api/v1/admin/reps
export const getSalesReps = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const reps = await db.user.findMany({
      where: { role: 'SALES_REP' },
      select: {
        id: true,
        fullName: true,
        username: true,
        creditLimit: true,
        creditBalance: true,
        createdAt: true,
        profilePic: true,
        paymentProofs: {
          where: { status: 'APPROVED' },
          orderBy: { createdAt: 'desc' },
          take: 5,
          select: { id: true, amount: true, createdAt: true }
        },
        stockIssusances: {
          orderBy: { createdAt: 'desc' },
          take: 5,
          select: { id: true, totalWholesaleValue: true, createdAt: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    const repsWithLedger = reps.map(rep => {
      const payments = rep.paymentProofs.map(p => ({
        id: p.id,
        type: 'PAYMENT',
        amount: p.amount,
        createdAt: p.createdAt
      }));
      
      const charges = rep.stockIssusances.map(i => ({
        id: i.id,
        type: 'CHARGE', 
        amount: i.totalWholesaleValue,
        createdAt: i.createdAt
      }));

      const mergedTransactions = [...payments, ...charges]
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        .slice(0, 5);

      return {
        id: rep.id,
        fullName: rep.fullName,
        username: rep.username,
        creditLimit: rep.creditLimit,
        creditBalance: rep.creditBalance,
        createdAt: rep.createdAt,
        transactions: mergedTransactions
      };
    });

    res.status(200).json({
      status: 'success',
      data: repsWithLedger
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/v1/admin/reps
export const enrollSalesRep = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { fullName, username, creditLimit } = req.body;

    const defaultPassword = '123456';
    const passwordHash = await bcrypt.hash(defaultPassword, 10);

    const newUser = await db.user.create({
      data: {
        fullName,
        username: username.toLowerCase(),
        passwordHash, 
        role: 'SALES_REP',
        creditLimit: Number(creditLimit || 0),
        creditBalance: 0,
        requiresPasswordChange: true,
      }
    });

    res.status(201).json({
      status: 'success',
      data: {
        id: newUser.id,
        fullName: newUser.fullName,
        username: newUser.username
      }
    });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/v1/admin/reps/:id
export const removeSalesRep = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Fix: Explicitly cast to string to satisfy Prisma's strict type requirements
    const id = req.params.id as string;
    
    await db.user.delete({
      where: { id }
    });

    res.status(200).json({
      status: 'success',
      message: 'Agent successfully removed from the system.'
    });
  } catch (err) {
    next(err);
  }
};