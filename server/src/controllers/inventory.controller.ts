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
import { Role, IssuanceStatus, AuditEntity } from "../generated/client/index.js";

/**
 * @route   POST /api/v1/inventory/batches
 * @desc    Legacy stub / wrapper for warehouse batch receiving (Admin only)
 * @access  Protected (ADMIN)
 */
export const createStockBatch = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validated = createStockBatchSchema.parse(req.body);

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
 * @desc    Issue Model B wholesale stock with FIFO stock deduction, COGS calculation & automatic ledger wiring
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

    // 2. Query oldest sellable batches in FIFO order (createdAt: asc)
    const availableBatches = await db.inventoryBatch.findMany({
      where: {
        productId: validated.productId,
        remainingQty: { gt: 0 },
      },
      orderBy: { createdAt: "asc" },
    });

    const totalAvailableStock = availableBatches.reduce(
      (sum, batch) => sum + batch.remainingQty,
      0
    );

    if (totalAvailableStock < validated.qtyIssued) {
      throw new BadRequestError(
        `Insufficient warehouse stock. Requested: ${validated.qtyIssued} units, Available: ${totalAvailableStock} units.`
      );
    }

    // 3. Calculate total ETB value of this issuance & verify credit limit
    const totalIssuanceValue = toDecimal(validated.qtyIssued).mul(
      toDecimal(validated.wholesalePrice)
    );

    const projectedBalance = toDecimal(salesRep.creditBalance).add(
      totalIssuanceValue
    );

    if (projectedBalance.greaterThan(toDecimal(salesRep.creditLimit))) {
      throw new BadRequestError(
        `Credit limit exceeded. Projected ETB balance (${formatETB(projectedBalance)} ETB) surpasses credit limit (${formatETB(salesRep.creditLimit)} ETB).`
      );
    }

    // 4. FIFO Allocation Algorithm: compute batch updates and blended COGS
    let qtyRemainingToAllocate = validated.qtyIssued;
    let totalCogsETB = toDecimal(0);
    const batchUpdates: { id: string; newRemainingQty: number }[] = [];

    for (const batch of availableBatches) {
      if (qtyRemainingToAllocate <= 0) break;

      const qtyTakenFromBatch = Math.min(
        batch.remainingQty,
        qtyRemainingToAllocate
      );

      const cogsContribution = toDecimal(qtyTakenFromBatch).mul(
        toDecimal(batch.unitCostPrice)
      );
      totalCogsETB = totalCogsETB.add(cogsContribution);

      batchUpdates.push({
        id: batch.id,
        newRemainingQty: batch.remainingQty - qtyTakenFromBatch,
      });

      qtyRemainingToAllocate -= qtyTakenFromBatch;
    }

    // Blended Unit COGS = Total COGS / Total Quantity Issued
    const blendedUnitCogs = totalCogsETB.div(toDecimal(validated.qtyIssued));

    // 5. ACID Transaction: update physical stock, create issuance, update balance & record ledger entry
    const result = await db.$transaction(async (tx) => {
      // 5a. Deduct stock across all allocated FIFO batches
      for (const update of batchUpdates) {
        await tx.inventoryBatch.update({
          where: { id: update.id },
          data: { remainingQty: update.newRemainingQty },
        });
      }

      // 5b. Create parent StockIssuance header + child IssuanceItem with FIFO COGS
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
                cogsCalculated: blendedUnitCogs,
              },
            ],
          },
        },
        include: { items: true },
      });

      // 5c. Update Sales Rep's ETB credit balance
      const updatedUser = await tx.user.update({
        where: { id: salesRep.id },
        data: { creditBalance: projectedBalance },
      });

      // 5d. AUTOMATED LEDGER WIRE: create audit trail entry debiting the Sales Rep
      const ledgerEntry = await tx.ledgerEntry.create({
        data: {
          fromEntity: AuditEntity.ADMIN_STORE, // <-- MATCHED TO YOUR EXACT SCHEMA ENUM!
          toEntity: AuditEntity.SALES_REP,
          toEntityId: salesRep.id,
          amount: totalIssuanceValue,
          transferMethod: "STOCK_ISSUANCE_CREDIT",
          auditRemark: `Auto-ledger: Issued ${validated.qtyIssued} units of product ${validated.productId} (Issuance ID: ${issuance.id})`,
          transactionRefId: `ISS-${issuance.id}`,
        },
      });

      return { issuance, updatedUser, ledgerEntry, blendedUnitCogs };
    });

    res.status(201).json({
      status: "success",
      message: "Stock issued, FIFO inventory deducted, and ledger entry recorded successfully",
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
        auditLedgerEntryId: result.ledgerEntry.id,
      },
    });
  } catch (err) {
    next(err);
  }
};