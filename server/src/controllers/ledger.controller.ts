import { Request, Response, NextFunction } from "express";
import { db } from "../config/db.js";
import {
  createLedgerEntrySchema,
  getLedgerQuerySchema,
} from "../validations/ledger.validation.js";
import { ConflictError, UnauthorizedError } from "../utils/errors.js";
import { toDecimal, formatETB } from "../utils/decimal.js";
import { Role } from "../generated/client/index.js";

/**
 * @route   POST /api/v1/ledger
 * @desc    Record a manual financial adjustment or audit ledger entry (Admin only)
 * @access  Protected (ADMIN)
 */
export const createLedgerEntry = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validated = createLedgerEntrySchema.parse(req.body);

    // If transactionRefId is provided, check unique constraint gracefully
    if (validated.transactionRefId) {
      const existingRef = await db.ledgerEntry.findUnique({
        where: { transactionRefId: validated.transactionRefId },
      });

      if (existingRef) {
        throw new ConflictError(
          "A ledger entry with this transaction reference ID already exists."
        );
      }
    }

    const ledgerEntry = await db.ledgerEntry.create({
      data: {
        fromEntity: validated.fromEntity,
        fromEntityId: validated.fromEntityId,
        toEntity: validated.toEntity,
        toEntityId: validated.toEntityId,
        amount: toDecimal(validated.amount),
        transferMethod: validated.transferMethod,
        receiptUrl: validated.receiptUrl,
        auditRemark: validated.auditRemark,
        transactionRefId: validated.transactionRefId,
      },
    });

    res.status(201).json({
      status: "success",
      message: "Ledger audit entry recorded successfully",
      data: {
        id: ledgerEntry.id,
        transactionDate: ledgerEntry.transactionDate,
        fromEntity: ledgerEntry.fromEntity,
        toEntity: ledgerEntry.toEntity,
        amount: formatETB(ledgerEntry.amount),
        transferMethod: ledgerEntry.transferMethod,
        auditRemark: ledgerEntry.auditRemark,
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @route   GET /api/v1/ledger
 * @desc    Retrieve immutable financial audit trail with pagination & filtering
 * @access  Protected (Authenticated Users)
 */
export const getLedgerHistory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      throw new UnauthorizedError("User authentication required");
    }

    const { page, limit, fromEntity, toEntity, transferMethod } =
      getLedgerQuerySchema.parse(req.query);

    const skip = (page - 1) * limit;

    // Build query filter
    const whereClause: Record<string, unknown> = {};

    if (fromEntity) whereClause.fromEntity = fromEntity;
    if (toEntity) whereClause.toEntity = toEntity;
    if (transferMethod) whereClause.transferMethod = transferMethod;

    // If Sales Rep, restrict view to only their own transaction entries
    if (req.user.role === Role.SALES_REP) {
      whereClause.OR = [
        { fromEntityId: req.user.id },
        { toEntityId: req.user.id },
      ];
    }

    const [entries, totalCount] = await Promise.all([
      db.ledgerEntry.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: { transactionDate: "desc" },
      }),
      db.ledgerEntry.count({ where: whereClause }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    res.status(200).json({
      status: "success",
      data: {
        entries: entries.map((entry) => ({
          id: entry.id,
          transactionDate: entry.transactionDate,
          fromEntity: entry.fromEntity,
          fromEntityId: entry.fromEntityId,
          toEntity: entry.toEntity,
          toEntityId: entry.toEntityId,
          amount: formatETB(entry.amount),
          transferMethod: entry.transferMethod,
          receiptUrl: entry.receiptUrl,
          auditRemark: entry.auditRemark,
          transactionRefId: entry.transactionRefId,
        })),
        pagination: {
          currentPage: page,
          limit,
          totalCount,
          totalPages,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};