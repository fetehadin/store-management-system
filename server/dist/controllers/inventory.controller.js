"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductSuggestions = exports.getMyStock = exports.issueStock = exports.createStockBatch = exports.updateSellingPrice = exports.getInventory = void 0;
const db_js_1 = require("../config/db.js");
const inventory_validation_js_1 = require("../validations/inventory.validation.js");
const errors_js_1 = require("../utils/errors.js");
const decimal_js_1 = require("../utils/decimal.js");
const index_js_1 = require("../generated/client/index.js");
/**
 * @route   GET /api/v1/inventory/products
 * @desc    Fetch live inventory with dynamic FIFO cost calculation and categories
 * @access  Protected (ADMIN)
 */
const getInventory = async (_req, res, next) => {
    try {
        const products = await db_js_1.db.product.findMany({
            include: {
                // Fetch all batches to calculate strict FIFO logic
                batches: {
                    orderBy: { createdAt: "asc" }, // Oldest first
                },
            },
            orderBy: { createdAt: "desc" },
        });
        const mappedInventory = products
            .map((product) => {
            // 1. Filter to only batches that actually have physical stock right now
            const activeBatches = product.batches.filter((b) => b.remainingQty > 0);
            // 2. Calculate total available physical stock across all active batches
            const totalStock = activeBatches.reduce((sum, batch) => sum + batch.remainingQty, 0);
            // 3. FIX: Find the highest cost price among all active batches (Margin Protection)
            const highestCostPrice = activeBatches.length > 0
                ? Math.max(...activeBatches.map(b => Number(b.unitCostPrice)))
                : 0;
            return {
                id: product.id,
                name: product.name,
                category: product.category || "General",
                imageUrl: product.imageUrl || null,
                stock: totalStock,
                costPrice: highestCostPrice,
                sellingPrice: Number(product.price),
            };
        })
            .filter((product) => product.stock > 0); // Filters out any product with 0 total stock
        res.status(200).json({
            status: "success",
            data: mappedInventory,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getInventory = getInventory;
/**
 * @route   PATCH /api/v1/inventory/products/:id/price
 * @desc    Update the live selling price of a product
 * @access  Protected (ADMIN)
 */
const updateSellingPrice = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { price } = req.body;
        if (price === undefined || isNaN(Number(price))) {
            throw new errors_js_1.BadRequestError("A valid price is required.");
        }
        await db_js_1.db.product.update({
            where: { id },
            data: { price: (0, decimal_js_1.toDecimal)(price) },
        });
        res.status(200).json({
            status: "success",
            message: "Selling price updated successfully",
        });
    }
    catch (err) {
        next(err);
    }
};
exports.updateSellingPrice = updateSellingPrice;
/**
 * @route   POST /api/v1/inventory/batches
 * @desc    Legacy stub / wrapper for warehouse batch receiving (Admin only)
 * @access  Protected (ADMIN)
 */
const createStockBatch = async (req, res, next) => {
    try {
        const validated = inventory_validation_js_1.createStockBatchSchema.parse(req.body);
        res.status(201).json({
            status: "success",
            message: "Warehouse stock batch registered successfully",
            data: {
                batch: {
                    productId: validated.productId,
                    batchNumber: validated.batchNumber,
                    quantity: validated.quantity,
                    wholesalePrice: (0, decimal_js_1.formatETB)((0, decimal_js_1.toDecimal)(validated.wholesalePrice)),
                },
            },
        });
    }
    catch (err) {
        next(err);
    }
};
exports.createStockBatch = createStockBatch;
/**
 * @route   POST /api/v1/inventory/issue
 * @desc    Issue Model B wholesale stock with FIFO stock deduction, COGS calculation & automatic ledger wiring
 * @access  Protected (ADMIN)
 */
const issueStock = async (req, res, next) => {
    try {
        // 1. AUTO-INJECT THE ID FROM THE LOGIN TOKEN (BULLETPROOF)
        if (req.user?.id) {
            req.body.salesRepId = req.user.id;
        }
        const validated = inventory_validation_js_1.issueStockSchema.parse(req.body);
        // 1. Verify Sales Rep exists and has correct role
        const salesRep = await db_js_1.db.user.findUnique({
            where: { id: validated.salesRepId },
        });
        if (!salesRep) {
            throw new errors_js_1.NotFoundError("Sales Rep account not found");
        }
        if (salesRep.role !== index_js_1.Role.SALES_REP) {
            throw new errors_js_1.BadRequestError("Stock can only be issued to active SALES_REP accounts");
        }
        // 2. Query oldest sellable batches in FIFO order (createdAt: asc)
        const availableBatches = await db_js_1.db.inventoryBatch.findMany({
            where: {
                productId: validated.productId,
                remainingQty: { gt: 0 },
            },
            orderBy: { createdAt: "asc" },
        });
        const totalAvailableStock = availableBatches.reduce((sum, batch) => sum + batch.remainingQty, 0);
        if (totalAvailableStock < validated.qtyIssued) {
            throw new errors_js_1.BadRequestError(`Insufficient warehouse stock. Requested: ${validated.qtyIssued} units, Available: ${totalAvailableStock} units.`);
        }
        // 3. Calculate total ETB value of this issuance & verify credit limit
        const totalIssuanceValue = (0, decimal_js_1.toDecimal)(validated.qtyIssued).mul((0, decimal_js_1.toDecimal)(validated.wholesalePrice));
        const projectedBalance = (0, decimal_js_1.toDecimal)(salesRep.creditBalance).add(totalIssuanceValue);
        if (projectedBalance.greaterThan((0, decimal_js_1.toDecimal)(salesRep.creditLimit))) {
            throw new errors_js_1.BadRequestError(`Credit limit exceeded. Projected ETB balance (${(0, decimal_js_1.formatETB)(projectedBalance)} ETB) surpasses credit limit (${(0, decimal_js_1.formatETB)(salesRep.creditLimit)} ETB).`);
        }
        // 4. FIFO Allocation Algorithm: compute batch updates and blended COGS
        let qtyRemainingToAllocate = validated.qtyIssued;
        let totalCogsETB = (0, decimal_js_1.toDecimal)(0);
        const batchUpdates = [];
        for (const batch of availableBatches) {
            if (qtyRemainingToAllocate <= 0)
                break;
            const qtyTakenFromBatch = Math.min(batch.remainingQty, qtyRemainingToAllocate);
            const cogsContribution = (0, decimal_js_1.toDecimal)(qtyTakenFromBatch).mul((0, decimal_js_1.toDecimal)(batch.unitCostPrice));
            totalCogsETB = totalCogsETB.add(cogsContribution);
            batchUpdates.push({
                id: batch.id,
                newRemainingQty: batch.remainingQty - qtyTakenFromBatch,
            });
            qtyRemainingToAllocate -= qtyTakenFromBatch;
        }
        // Blended Unit COGS = Total COGS / Total Quantity Issued
        const blendedUnitCogs = totalCogsETB.div((0, decimal_js_1.toDecimal)(validated.qtyIssued));
        // 5. ACID Transaction: update physical stock, create issuance, update balance & record ledger entry
        const result = await db_js_1.db.$transaction(async (tx) => {
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
                    status: index_js_1.IssuanceStatus.ISSUED,
                    totalWholesaleValue: totalIssuanceValue,
                    items: {
                        create: [
                            {
                                productId: validated.productId,
                                qtyIssued: validated.qtyIssued,
                                qtyRemaining: validated.qtyIssued,
                                wholesalePrice: (0, decimal_js_1.toDecimal)(validated.wholesalePrice),
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
                    fromEntity: index_js_1.AuditEntity.ADMIN_STORE,
                    toEntity: index_js_1.AuditEntity.SALES_REP,
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
                    totalWholesaleValue: (0, decimal_js_1.formatETB)(result.issuance.totalWholesaleValue),
                    issuedAt: result.issuance.createdAt,
                    items: result.issuance.items.map((item) => ({
                        id: item.id,
                        productId: item.productId,
                        qtyIssued: item.qtyIssued,
                        wholesalePrice: (0, decimal_js_1.formatETB)(item.wholesalePrice),
                        cogsCalculated: (0, decimal_js_1.formatETB)(item.cogsCalculated),
                    })),
                },
                salesRep: {
                    id: result.updatedUser.id,
                    fullName: result.updatedUser.fullName,
                    newCreditBalance: (0, decimal_js_1.formatETB)(result.updatedUser.creditBalance),
                    creditLimit: (0, decimal_js_1.formatETB)(result.updatedUser.creditLimit),
                },
                auditLedgerEntryId: result.ledgerEntry.id,
            },
        });
    }
    catch (err) {
        next(err);
    }
};
exports.issueStock = issueStock;
const getMyStock = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            throw new errors_js_1.BadRequestError("User authentication required");
        }
        // 1. Fetch all issuances for this Sales Rep that are active
        const issuances = await db_js_1.db.stockIssuance.findMany({
            where: { userId: userId, status: "ISSUED" },
            include: { items: true },
        });
        // 2. Aggregate quantities by productId (in case they checked out the same item twice)
        const stockMap = new Map();
        for (const issuance of issuances) {
            for (const item of issuance.items) {
                // Fallback to qtyIssued if qtyRemaining wasn't strictly populated
                const qtyAvailable = item.qtyRemaining ?? item.qtyIssued;
                if (qtyAvailable > 0) {
                    const current = stockMap.get(item.productId) || { qty: 0, price: Number(item.wholesalePrice) };
                    stockMap.set(item.productId, {
                        qty: current.qty + qtyAvailable,
                        price: Number(item.wholesalePrice),
                    });
                }
            }
        }
        // 3. Fetch Product details (names) so the mobile app can display them
        const productIds = Array.from(stockMap.keys());
        const products = await db_js_1.db.product.findMany({
            where: { id: { in: productIds } }
        });
        const productMap = new Map(products.map(p => [p.id, p.name]));
        // 4. Format exactly how the mobile app expects it
        const formattedStock = Array.from(stockMap.entries()).map(([productId, data]) => ({
            id: productId,
            name: productMap.get(productId) || "Unknown Product",
            sellingPrice: data.price,
            qtyHeld: data.qty
        }));
        res.status(200).json({ data: formattedStock });
    }
    catch (err) {
        next(err);
    }
};
exports.getMyStock = getMyStock;
/**
 * @route   GET /api/v1/inventory/products/suggestions
 * @desc    Fetch distinct product names and categories for autocomplete to prevent dirty data
 * @access  Protected (ADMIN)
 */
const getProductSuggestions = async (req, res, next) => {
    try {
        const query = req.query.q || "";
        // Fetch distinct names and categories matching the search query
        const products = await db_js_1.db.product.findMany({
            where: {
                OR: [
                    { name: { contains: query, mode: "insensitive" } },
                    { category: { contains: query, mode: "insensitive" } }
                ]
            },
            distinct: ['name', 'category'],
            select: { name: true, category: true, price: true },
            take: 10, // O(limit) constraint to ensure fast network payloads
        });
        res.status(200).json({ status: 'success', data: products });
    }
    catch (err) {
        next(err);
    }
};
exports.getProductSuggestions = getProductSuggestions;
