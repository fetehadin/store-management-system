import { Request, Response, NextFunction } from "express";
import { db } from "../config/db.js";
import { reportQuerySchema } from "../validations/report.validation.js";
import { toDecimal, formatETB } from "../utils/decimal.js";
import { Role, IssuanceStatus } from "../generated/client/index.js";

/**
 * @route   GET /api/v1/reports/gross-profit
 * @desc    Get real-time Gross Profit, FIFO COGS & Margin analytics (Admin only)
 * @access  Protected (ADMIN)
 */
export const getGrossProfitReport = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { startDate, endDate, salesRepId } = reportQuerySchema.parse(
      req.query
    );

    // Build Prisma where filter
    const whereClause: Record<string, unknown> = {
      status: IssuanceStatus.ISSUED,
    };

    if (salesRepId) {
      whereClause.userId = salesRepId;
    }

    if (startDate || endDate) {
      const dateFilter: Record<string, Date> = {};
      if (startDate) dateFilter.gte = new Date(startDate);
      if (endDate) dateFilter.lte = new Date(endDate);
      whereClause.createdAt = dateFilter;
    }

    // Fetch all matching issuances along with their locked-in COGS line items
    const issuances = await db.stockIssuance.findMany({
      where: whereClause,
      include: {
        items: true,
      },
      orderBy: { createdAt: "desc" },
    });

    let totalRevenueETB = toDecimal(0);
    let totalCogsETB = toDecimal(0);
    let totalUnitsIssued = 0;

    // Map to track performance per product ID
    const productStatsMap = new Map<
      string,
      {
        unitsIssued: number;
        revenue: ReturnType<typeof toDecimal>;
        cogs: ReturnType<typeof toDecimal>;
      }
    >();

    for (const issuance of issuances) {
      for (const item of issuance.items) {
        const qty = item.qtyIssued;
        const itemRevenue = toDecimal(item.wholesalePrice).mul(qty);
        const itemCogs = toDecimal(item.cogsCalculated).mul(qty);

        totalUnitsIssued += qty;
        totalRevenueETB = totalRevenueETB.add(itemRevenue);
        totalCogsETB = totalCogsETB.add(itemCogs);

        const existing = productStatsMap.get(item.productId) || {
          unitsIssued: 0,
          revenue: toDecimal(0),
          cogs: toDecimal(0),
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
    const productBreakdown = Array.from(productStatsMap.entries()).map(
      ([productId, stats]) => {
        const profit = stats.revenue.sub(stats.cogs);
        const margin = stats.revenue.greaterThan(0)
          ? profit.div(stats.revenue).mul(100).toDecimalPlaces(2).toNumber()
          : 0;

        return {
          productId,
          unitsIssued: stats.unitsIssued,
          revenueETB: formatETB(stats.revenue),
          cogsETB: formatETB(stats.cogs),
          grossProfitETB: formatETB(profit),
          grossMarginPercent: `${margin}%`,
        };
      }
    );

    res.status(200).json({
      status: "success",
      data: {
        summary: {
          totalIssuancesCount: issuances.length,
          totalUnitsIssued,
          totalRevenueETB: formatETB(totalRevenueETB),
          totalCogsETB: formatETB(totalCogsETB),
          grossProfitETB: formatETB(grossProfitETB),
          grossMarginPercent: `${grossMarginPercent}%`,
        },
        productBreakdown,
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @route   GET /api/v1/reports/sales-performance
 * @desc    Get Sales Rep performance leaderboard & credit debt exposure (Admin only)
 * @access  Protected (ADMIN)
 */
export const getSalesRepPerformanceReport = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const salesReps = await db.user.findMany({
      where: { role: Role.SALES_REP },
      include: {
        stockIssusances: { // <-- Corrected relation name matching schema
          where: { status: IssuanceStatus.ISSUED },
          include: { items: true },
        },
      },
      orderBy: { fullName: "asc" },
    });

    const performanceList = salesReps.map((rep) => {
      let repRevenueETB = toDecimal(0);
      let repCogsETB = toDecimal(0);
      let repUnitsIssued = 0;

      for (const issuance of rep.stockIssusances) { // <-- Corrected property name
        for (const item of issuance.items) {
          const qty = item.qtyIssued;
          const itemRevenue = toDecimal(item.wholesalePrice).mul(qty);
          const itemCogs = toDecimal(item.cogsCalculated).mul(qty);

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

      const creditBalance = toDecimal(rep.creditBalance);
      const creditLimit = toDecimal(rep.creditLimit);
      const remainingCredit = creditLimit.sub(creditBalance);

      return {
        salesRepId: rep.id,
        fullName: rep.fullName,
        phone: rep.phone,
        totalIssuancesCount: rep.stockIssusances.length, // <-- Corrected property name
        totalUnitsIssued: repUnitsIssued,
        revenueGeneratedETB: formatETB(repRevenueETB),
        cogsETB: formatETB(repCogsETB),
        grossProfitETB: formatETB(repProfitETB),
        profitMarginPercent: `${repMarginPercent}%`,
        creditExposure: {
          currentDebtETB: formatETB(creditBalance),
          creditLimitETB: formatETB(creditLimit),
          remainingCreditCapacityETB: formatETB(remainingCredit),
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
  } catch (err) {
    next(err);
  }
};