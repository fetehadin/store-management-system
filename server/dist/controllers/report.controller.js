"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSalesRepPerformanceReport = exports.getGrossProfitReport = void 0;
const db_js_1 = require("../config/db.js");
const report_validation_js_1 = require("../validations/report.validation.js");
const decimal_js_1 = require("../utils/decimal.js");
const index_js_1 = require("../generated/client/index.js");
/**
 * @route   GET /api/v1/reports/gross-profit
 * @desc    Get real-time Gross Profit, FIFO COGS & Margin analytics (Admin only)
 * @access  Protected (ADMIN)
 */
const getGrossProfitReport = async (req, res, next) => {
    try {
        const { startDate, endDate, salesRepId } = report_validation_js_1.reportQuerySchema.parse(req.query);
        // Build Prisma where filter
        const whereClause = {
            status: index_js_1.IssuanceStatus.ISSUED,
        };
        if (salesRepId) {
            whereClause.userId = salesRepId;
        }
        if (startDate || endDate) {
            const dateFilter = {};
            if (startDate)
                dateFilter.gte = new Date(startDate);
            if (endDate)
                dateFilter.lte = new Date(endDate);
            whereClause.createdAt = dateFilter;
        }
        // Fetch all matching issuances along with their locked-in COGS line items
        const issuances = await db_js_1.db.stockIssuance.findMany({
            where: whereClause,
            include: {
                items: true,
            },
            orderBy: { createdAt: "desc" },
        });
        let totalRevenueETB = (0, decimal_js_1.toDecimal)(0);
        let totalCogsETB = (0, decimal_js_1.toDecimal)(0);
        let totalUnitsIssued = 0;
        // Map to track performance per product ID
        const productStatsMap = new Map();
        for (const issuance of issuances) {
            for (const item of issuance.items) {
                const qty = item.qtyIssued;
                const itemRevenue = (0, decimal_js_1.toDecimal)(item.wholesalePrice).mul(qty);
                const itemCogs = (0, decimal_js_1.toDecimal)(item.cogsCalculated).mul(qty);
                totalUnitsIssued += qty;
                totalRevenueETB = totalRevenueETB.add(itemRevenue);
                totalCogsETB = totalCogsETB.add(itemCogs);
                const existing = productStatsMap.get(item.productId) || {
                    unitsIssued: 0,
                    revenue: (0, decimal_js_1.toDecimal)(0),
                    cogs: (0, decimal_js_1.toDecimal)(0),
                };
                productStatsMap.set(item.productId, {
                    unitsIssued: existing.unitsIssued + qty,
                    revenue: existing.revenue.add(itemRevenue),
                    cogs: existing.cogs.add(itemCogs),
                });
            }
        }
        const grossProfitETB = totalRevenueETB.sub(totalCogsETB);
        // Calculate Gross Profit Margin % = (Gross Profit / Revenue) * 100
        const grossMarginPercent = totalRevenueETB.greaterThan(0)
            ? grossProfitETB
                .div(totalRevenueETB)
                .mul(100)
                .toDecimalPlaces(2)
                .toNumber()
            : 0;
        // Format product breakdown table
        const productBreakdown = Array.from(productStatsMap.entries()).map(([productId, stats]) => {
            const profit = stats.revenue.sub(stats.cogs);
            const margin = stats.revenue.greaterThan(0)
                ? profit.div(stats.revenue).mul(100).toDecimalPlaces(2).toNumber()
                : 0;
            return {
                productId,
                unitsIssued: stats.unitsIssued,
                revenueETB: (0, decimal_js_1.formatETB)(stats.revenue),
                cogsETB: (0, decimal_js_1.formatETB)(stats.cogs),
                grossProfitETB: (0, decimal_js_1.formatETB)(profit),
                grossMarginPercent: `${margin}%`,
            };
        });
        res.status(200).json({
            status: "success",
            data: {
                summary: {
                    totalIssuancesCount: issuances.length,
                    totalUnitsIssued,
                    totalRevenueETB: (0, decimal_js_1.formatETB)(totalRevenueETB),
                    totalCogsETB: (0, decimal_js_1.formatETB)(totalCogsETB),
                    grossProfitETB: (0, decimal_js_1.formatETB)(grossProfitETB),
                    grossMarginPercent: `${grossMarginPercent}%`,
                },
                productBreakdown,
            },
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getGrossProfitReport = getGrossProfitReport;
/**
 * @route   GET /api/v1/reports/sales-performance
 * @desc    Get Sales Rep performance leaderboard & credit debt exposure (Admin only)
 * @access  Protected (ADMIN)
 */
const getSalesRepPerformanceReport = async (_req, res, next) => {
    try {
        const salesReps = await db_js_1.db.user.findMany({
            where: { role: index_js_1.Role.SALES_REP },
            include: {
                stockIssusances: {
                    where: { status: index_js_1.IssuanceStatus.ISSUED },
                    include: { items: true },
                },
            },
            orderBy: { fullName: "asc" },
        });
        const performanceList = salesReps.map((rep) => {
            let repRevenueETB = (0, decimal_js_1.toDecimal)(0);
            let repCogsETB = (0, decimal_js_1.toDecimal)(0);
            let repUnitsIssued = 0;
            for (const issuance of rep.stockIssusances) { // <-- Corrected property name
                for (const item of issuance.items) {
                    const qty = item.qtyIssued;
                    const itemRevenue = (0, decimal_js_1.toDecimal)(item.wholesalePrice).mul(qty);
                    const itemCogs = (0, decimal_js_1.toDecimal)(item.cogsCalculated).mul(qty);
                    repUnitsIssued += qty;
                    repRevenueETB = repRevenueETB.add(itemRevenue);
                    repCogsETB = repCogsETB.add(itemCogs);
                }
            }
            const repProfitETB = repRevenueETB.sub(repCogsETB);
            const repMarginPercent = repRevenueETB.greaterThan(0)
                ? repProfitETB
                    .div(repRevenueETB)
                    .mul(100)
                    .toDecimalPlaces(2)
                    .toNumber()
                : 0;
            const creditBalance = (0, decimal_js_1.toDecimal)(rep.creditBalance);
            const creditLimit = (0, decimal_js_1.toDecimal)(rep.creditLimit);
            const remainingCredit = creditLimit.sub(creditBalance);
            return {
                salesRepId: rep.id,
                fullName: rep.fullName,
                totalIssuancesCount: rep.stockIssusances.length, // <-- Corrected property name
                totalUnitsIssued: repUnitsIssued,
                revenueGeneratedETB: (0, decimal_js_1.formatETB)(repRevenueETB),
                cogsETB: (0, decimal_js_1.formatETB)(repCogsETB),
                grossProfitETB: (0, decimal_js_1.formatETB)(repProfitETB),
                profitMarginPercent: `${repMarginPercent}%`,
                creditExposure: {
                    currentDebtETB: (0, decimal_js_1.formatETB)(creditBalance),
                    creditLimitETB: (0, decimal_js_1.formatETB)(creditLimit),
                    remainingCreditCapacityETB: (0, decimal_js_1.formatETB)(remainingCredit),
                },
            };
        });
        // Sort leaderboard highest profit generated first
        performanceList.sort((a, b) => {
            const profitA = parseFloat(a.grossProfitETB.replace(/,/g, ""));
            const profitB = parseFloat(b.grossProfitETB.replace(/,/g, ""));
            return profitB - profitA;
        });
        res.status(200).json({
            status: "success",
            data: {
                totalActiveSalesReps: performanceList.length,
                leaderboard: performanceList,
            },
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getSalesRepPerformanceReport = getSalesRepPerformanceReport;
