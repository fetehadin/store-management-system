"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeSalesRep = exports.enrollSalesRep = exports.getSalesReps = void 0;
const db_js_1 = require("../config/db.js");
const bcrypt_1 = __importDefault(require("bcrypt"));
// GET /api/v1/admin/reps
// GET /api/v1/admin/reps
const getSalesReps = async (_req, res, next) => {
    try {
        const reps = await db_js_1.db.user.findMany({
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
                profilePic: rep.profilePic,
                createdAt: rep.createdAt,
                transactions: mergedTransactions
            };
        });
        res.status(200).json({
            status: 'success',
            data: repsWithLedger
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getSalesReps = getSalesReps;
// POST /api/v1/admin/reps
const enrollSalesRep = async (req, res, next) => {
    try {
        const { fullName, username, creditLimit } = req.body;
        const defaultPassword = '123456';
        const passwordHash = await bcrypt_1.default.hash(defaultPassword, 10);
        const newUser = await db_js_1.db.user.create({
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
    }
    catch (err) {
        next(err);
    }
};
exports.enrollSalesRep = enrollSalesRep;
// DELETE /api/v1/admin/reps/:id
const removeSalesRep = async (req, res, next) => {
    try {
        // Fix: Explicitly cast to string to satisfy Prisma's strict type requirements
        const id = req.params.id;
        await db_js_1.db.user.delete({
            where: { id }
        });
        res.status(200).json({
            status: 'success',
            message: 'Agent successfully removed from the system.'
        });
    }
    catch (err) {
        next(err);
    }
};
exports.removeSalesRep = removeSalesRep;
