"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFinancialSummary = void 0;
const db_js_1 = require("../config/db.js");
const getFinancialSummary = async (req, res, next) => {
    try {
        const { period } = req.query; // 'Today', 'Yesterday', 'This Week', 'Total'
        // 1. Calculate isolated date boundaries
        let dateFilter = undefined;
        if (period && period !== 'Total') {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (period === 'Today') {
                dateFilter = { gte: today };
            }
            else if (period === 'Yesterday') {
                const yesterday = new Date(today);
                yesterday.setDate(yesterday.getDate() - 1);
                dateFilter = { gte: yesterday, lt: today };
            }
            else if (period === 'This Week') {
                const startOfWeek = new Date(today);
                const currentDay = startOfWeek.getDay();
                const distanceToMonday = currentDay === 0 ? 6 : currentDay - 1;
                startOfWeek.setDate(startOfWeek.getDate() - distanceToMonday);
                dateFilter = { gte: startOfWeek };
            }
        }
        // 2. Total Revenue (Sales Outstanding - Money owed TO you by Sales Reps)
        let totalRevenue = 0;
        if (!dateFilter) {
            // TOTAL: Sum of all active Sales Reps' credit balances (Accounts Receivable)
            const reps = await db_js_1.db.user.aggregate({
                where: { role: 'SALES_REP' },
                _sum: { creditBalance: true }
            });
            totalRevenue = Number(reps._sum.creditBalance || 0);
        }
        else {
            // PERIOD FILTERED: Value of stock issued in this period
            const issued = await db_js_1.db.stockIssuance.aggregate({
                where: { createdAt: dateFilter },
                _sum: { totalWholesaleValue: true }
            });
            // Fallback for stock returns if the table exists
            let returnedAmount = 0;
            if ('stockReturn' in db_js_1.db) {
                const returned = await db_js_1.db.stockReturn.aggregate({
                    where: { status: 'APPROVED', updatedAt: dateFilter },
                    _sum: { totalValue: true }
                });
                returnedAmount = Number(returned._sum.totalValue || 0);
            }
            totalRevenue = Number(issued._sum.totalWholesaleValue || 0) - returnedAmount;
        }
        // 3. Total Debt (Suppliers - Money you owe TO Vendors)
        const batches = await db_js_1.db.inventoryBatch.findMany({
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
        const totalDebt = Array.from(batchMap.values()).reduce((sum, batch) => {
            const unpaid = batch.totalAmount - batch.amountPaid;
            return sum + Math.max(0, unpaid);
        }, 0);
        // 4. Net Balance (The true health of the business)
        const netBalance = totalRevenue - totalDebt;
        res.status(200).json({
            status: 'success',
            data: {
                netBalance,
                totalRevenue,
                totalDebt
            }
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getFinancialSummary = getFinancialSummary;
