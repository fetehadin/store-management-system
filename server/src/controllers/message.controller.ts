import { Request, Response, NextFunction } from "express";
import { db } from "../config/db.js";
import { UnauthorizedError } from "../utils/errors.js";

// GET /api/v1/messages
export const getMessages = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) throw new UnauthorizedError("User not authenticated");

    const messages = await db.message.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' }
    });

    const formatted = messages.map(m => ({
      id: m.id,
      title: m.title,
      body: m.body,
      type: m.type,
      date: m.createdAt,
      isRead: m.isRead
    }));

    res.status(200).json({ status: 'success', data: formatted });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/v1/messages/:id/dismiss
export const dismissMessage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) throw new UnauthorizedError("User not authenticated");
    const id = req.params.id as string;

    await db.message.updateMany({
      where: { id, userId: req.user.id },
      data: { isRead: true }
    });

    res.status(200).json({ status: 'success', message: 'Message dismissed.' });
  } catch (err) {
    next(err);
  }
};