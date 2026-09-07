import { Request, Response, NextFunction } from "express";
import { db } from "../config/db.js";
import { UnauthorizedError } from "../utils/errors.js";

// GET /api/v1/notes
export const getNotes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) throw new UnauthorizedError("User not authenticated");

    const notes = await db.note.findMany({
      where: { userId: req.user.id },
      orderBy: { dateKey: 'desc' }
    });

    const notesRecord: Record<string, string> = {};
    notes.forEach(n => {
      notesRecord[n.dateKey] = n.content;
    });

    res.status(200).json({ status: 'success', data: notesRecord });
  } catch (err) {
    next(err);
  }
};

// POST /api/v1/notes
export const saveNote = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) throw new UnauthorizedError("User not authenticated");

    const dateKey = req.body.dateKey as string;
    const content = req.body.content as string;
    
    if (!dateKey) {
      res.status(400).json({ message: "Date key is required." });
      return;
    }

    if (!content || content.trim() === '') {
      await db.note.deleteMany({
        where: { userId: req.user.id, dateKey }
      });
      res.status(200).json({ status: 'success', message: 'Note deleted.' });
      return;
    }

    const note = await db.note.upsert({
      where: {
        userId_dateKey: { userId: req.user.id, dateKey }
      },
      update: { content },
      create: { userId: req.user.id, dateKey, content }
    });

    res.status(200).json({ status: 'success', data: note });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/v1/notes/:dateKey
export const deleteNote = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) throw new UnauthorizedError("User not authenticated");
    const dateKey = req.params.dateKey as string;

    await db.note.deleteMany({
      where: { userId: req.user.id, dateKey }
    });

    res.status(200).json({ status: 'success', message: 'Note deleted successfully.' });
  } catch (err) {
    next(err);
  }
};