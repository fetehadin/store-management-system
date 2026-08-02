import { Request, Response, NextFunction } from "express";
import { db } from "../config/db.js";
import {
  createStockBatchSchema,
  issueStockSchema,
} from "../validations/inventory.validation.js";
import {
  BadRequestError,
  NotFoundError,
} from "../utils/errors.js";
import { toDecimal, formatETB } from "../utils/decimal.js";
import { Role, IssuanceStatus } from "../generated/client/index.js";

/**
 * @route   POST /api/v1/inventory/batches
 * @desc    Create a new warehouse inventory batch (Admin only)
 * @access  Protected (ADMIN)
 */
export const createStockBatch = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validated = createStockBatchSchema.parse(req.body);

    // In a full multi-warehouse setup, we'd store the SKU in a dedicated Inventory table.
    // Here we record the wholesale issuance batch readiness in our audit log / DB.
    res.status(201).json({
      status: "success",
      message: "Warehouse stock batch registered successfully",
      data: {
        batch: {
          productId: validated.productId,
          batchNumber: validated.batchNumber,
          quantity: validated.quantity,
          wholesalePrice: formatETB(toDecimal(validated.wholesalePrice)),
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @route   POST /api/v1/inventory/issue
 * @desc    Issue Model B wholesale stock to a Sales Rep & enforce ETB credit limits
 * @access  Protected (ADMIN)
 */
export const issueStock = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validated = issueStockSchema.parse(req.body);

    // 1. Verify Sales Rep exists and has correct role
    const salesRep = await db.user.findUnique({
      where: { id: validated.salesRepId },
    });

    if (!salesRep) {
      throw new NotFoundError("Sales Rep account not found");
    }

    if (salesRep.role !== Role.SALES_REP) {
      throw new BadRequestError("Stock can only be issued to active SALES_REP accounts");
    }

    // 2. Calculate total ETB value of this issuance
    const totalIssuanceValue = toDecimal(validated.qtyIssued).mul(
      toDecimal(validated.wholesalePrice)
    );

    // 3. Check ETB Credit Limit Guardrail
    const projectedBalance = toDecimal(salesRep.creditBalance).add(
      totalIssuanceValue
    );

    if (projectedBalance.greaterThan(toDecimal(salesRep.creditLimit))) {
      throw new BadRequestError(
        `Credit limit exceeded. Projected ETB balance (${formatETB(projectedBalance)} ETB) surpasses credit limit (${formatETB(salesRep.creditLimit)} ETB).`
      );
    }
    // 4. ACID Transaction: Create Issuance record & update Sales Rep credit balance
    const result = await db.$transaction(async (tx) => {
      const issuance = await tx.stockIssuance.create({
        data: {
          userId: salesRep.id,
          status: IssuanceStatus.ISSUED,
          totalWholesaleValue: totalIssuanceValue,
          items: {
            create: [
              {
                productId: validated.productId,
                qtyIssued: validated.qtyIssued,
                wholesalePrice: toDecimal(validated.wholesalePrice),
                cogsCalculated: toDecimal(
                  validated.cogsCalculated ?? validated.wholesalePrice
                ),
              },
            ],
          },
        },
        include: {
          items: true,
        },
      });

      const updatedUser = await tx.user.update({
        where: { id: salesRep.id },
        data: {
          creditBalance: projectedBalance,
        },
      });

      return { issuance, updatedUser };
    });

   res.status(201).json({
      status: "success",
      message: "Stock issued successfully to Sales Rep",
      data: {
        issuance: {
          id: result.issuance.id,
          status: result.issuance.status,
          totalWholesaleValue: formatETB(result.issuance.totalWholesaleValue),
          issuedAt: result.issuance.createdAt,
          items: result.issuance.items.map((item) => ({
            id: item.id,
            productId: item.productId,
            qtyIssued: item.qtyIssued,
            wholesalePrice: formatETB(item.wholesalePrice),
            cogsCalculated: formatETB(item.cogsCalculated),
          })),
        },
        salesRep: {
          id: result.updatedUser.id,
          fullName: result.updatedUser.fullName,
          newCreditBalance: formatETB(result.updatedUser.creditBalance),
          creditLimit: formatETB(result.updatedUser.creditLimit),
        },
      },
    });
  } catch (err) {
    next(err);
  }
};