"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLedgerHistory = exports.createLedgerEntry = void 0;
const db_js_1 = require("../config/db.js");
const ledger_validation_js_1 = require("../validations/ledger.validation.js");
const errors_js_1 = require("../utils/errors.js");
const decimal_js_1 = require("../utils/decimal.js");
const index_js_1 = require("../generated/client/index.js");
/**
 * @route   POST /api/v1/ledger
 * @desc    Record a manual financial adjustment or audit ledger entry (Admin only)
 * @access  Protected (ADMIN)
 */
const createLedgerEntry = async (req, res, next) => {
    try {
        const validated = ledger_validation_js_1.createLedgerEntrySchema.parse(req.body);
        // If transactionRefId is provided, check unique constraint gracefully
        if (validated.transactionRefId) {
            const existingRef = await db_js_1.db.ledgerEntry.findUnique({
                where: { transactionRefId: validated.transactionRefId },
            });
            if (existingRef) {
                throw new errors_js_1.ConflictError("A ledger entry with this transaction reference ID already exists.");
            }
        }
        const ledgerEntry = await db_js_1.db.ledgerEntry.create({
            data: {
                fromEntity: validated.fromEntity,
                fromEntityId: validated.fromEntityId,
                toEntity: validated.toEntity,
                toEntityId: validated.toEntityId,
                amount: (0, decimal_js_1.toDecimal)(validated.amount),
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
                amount: (0, decimal_js_1.formatETB)(ledgerEntry.amount),
                transferMethod: ledgerEntry.transferMethod,
                auditRemark: ledgerEntry.auditRemark,
            },
        });
    }
    catch (err) {
        next(err);
    }
};
exports.createLedgerEntry = createLedgerEntry;
/**
 * @route   GET /api/v1/ledger
 * @desc    Retrieve immutable financial audit trail with pagination & filtering
 * @access  Protected (Authenticated Users)
 */
const getLedgerHistory = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new errors_js_1.UnauthorizedError("User authentication required");
        }
        const { page, limit, fromEntity, toEntity, transferMethod } = ledger_validation_js_1.getLedgerQuerySchema.parse(req.query);
        const skip = (page - 1) * limit;
        // Build query filter
        const whereClause = {};
        if (fromEntity)
            whereClause.fromEntity = fromEntity;
        if (toEntity)
            whereClause.toEntity = toEntity;
        if (transferMethod)
            whereClause.transferMethod = transferMethod;
        // If Sales Rep, restrict view to only their own transaction entries
        if (req.user.role === index_js_1.Role.SALES_REP) {
            whereClause.OR = [
                { fromEntityId: req.user.id },
                { toEntityId: req.user.id },
            ];
        }
        const [entries, totalCount] = await Promise.all([
            db_js_1.db.ledgerEntry.findMany({
                where: whereClause,
                skip,
                take: limit,
                orderBy: { transactionDate: "desc" },
            }),
            db_js_1.db.ledgerEntry.count({ where: whereClause }),
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
                    amount: (0, decimal_js_1.formatETB)(entry.amount),
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
    }
    catch (err) {
        next(err);
    }
};
exports.getLedgerHistory = getLedgerHistory;
