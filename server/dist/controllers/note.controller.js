"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.saveNote = exports.getNotes = void 0;
const db_js_1 = require("../config/db.js");
const errors_js_1 = require("../utils/errors.js");
// GET /api/v1/notes
const getNotes = async (req, res, next) => {
    try {
        if (!req.user)
            throw new errors_js_1.UnauthorizedError("User not authenticated");
        const notes = await db_js_1.db.note.findMany({
            where: { userId: req.user.id },
            orderBy: { dateKey: 'desc' }
        });
        const notesRecord = {};
        notes.forEach(n => {
            notesRecord[n.dateKey] = n.content;
        });
        res.status(200).json({ status: 'success', data: notesRecord });
    }
    catch (err) {
        next(err);
    }
};
exports.getNotes = getNotes;
// POST /api/v1/notes
const saveNote = async (req, res, next) => {
    try {
        if (!req.user)
            throw new errors_js_1.UnauthorizedError("User not authenticated");
        const dateKey = req.body.dateKey;
        const content = req.body.content;
        if (!dateKey) {
            res.status(400).json({ message: "Date key is required." });
            return;
        }
        if (!content || content.trim() === '') {
            await db_js_1.db.note.deleteMany({
                where: { userId: req.user.id, dateKey }
            });
            res.status(200).json({ status: 'success', message: 'Note deleted.' });
            return;
        }
        const note = await db_js_1.db.note.upsert({
            where: {
                userId_dateKey: { userId: req.user.id, dateKey }
            },
            update: { content },
            create: { userId: req.user.id, dateKey, content }
        });
        res.status(200).json({ status: 'success', data: note });
    }
    catch (err) {
        next(err);
    }
};
exports.saveNote = saveNote;
// DELETE /api/v1/notes/:dateKey
const deleteNote = async (req, res, next) => {
    try {
        if (!req.user)
            throw new errors_js_1.UnauthorizedError("User not authenticated");
        const dateKey = req.params.dateKey;
        await db_js_1.db.note.deleteMany({
            where: { userId: req.user.id, dateKey }
        });
        res.status(200).json({ status: 'success', message: 'Note deleted successfully.' });
    }
    catch (err) {
        next(err);
    }
};
exports.deleteNote = deleteNote;
