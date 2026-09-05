import { Request, Response, NextFunction } from "express";
import { db } from "../config/db.js";
import bcrypt from "bcrypt";

// GET /api/v1/admin/reps
export const getSalesReps = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const reps = await db.user.findMany({
      where: { role: 'SALES_REP' },
      select: {
        id: true,
        fullName: true,
        username: true,
        creditLimit: true,
        creditBalance: true,
        // Removed profilePic as it is not in your Prisma schema
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' }
    });

    const repsWithLedger = reps.map(rep => ({
      ...rep,
      transactions: [] 
    }));

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
    const { id } = req.params;
    
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