"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsWithStock = exports.receiveInventoryBatch = exports.createProduct = exports.createSupplier = void 0;
const db_js_1 = require("../config/db.js");
const catalog_validation_js_1 = require("../validations/catalog.validation.js");
const errors_js_1 = require("../utils/errors.js");
const decimal_js_1 = require("../utils/decimal.js");
/**
 * @route   POST /api/v1/suppliers
 * @desc    Onboard a new wholesale supplier (Admin only)
 * @access  Protected (ADMIN)
 */
const createSupplier = async (req, res, next) => {
    try {
        const validated = catalog_validation_js_1.createSupplierSchema.parse(req.body);
        const existing = await db_js_1.db.supplier.findUnique({
            where: { phone: validated.phone },
        });
        if (existing) {
            throw new errors_js_1.ConflictError("A supplier with this phone number already exists");
        }
        const supplier = await db_js_1.db.supplier.create({
            data: {
                name: validated.name,
                phone: validated.phone,
                creditBalance: (0, decimal_js_1.toDecimal)(validated.creditBalance),
            },
        });
        res.status(201).json({
            status: "success",
            message: "Wholesale supplier registered successfully",
            data: {
                id: supplier.id,
                name: supplier.name,
                phone: supplier.phone,
                creditBalance: (0, decimal_js_1.formatETB)(supplier.creditBalance),
            },
        });
    }
    catch (err) {
        next(err);
    }
};
exports.createSupplier = createSupplier;
/**
 * @route   POST /api/v1/products
 * @desc    Create a new Model B wholesale product catalog entry (Admin only)
 * @access  Protected (ADMIN)
 */
const createProduct = async (req, res, next) => {
    try {
        const validated = catalog_validation_js_1.createProductSchema.parse(req.body);
        const product = await db_js_1.db.product.create({
            data: {
                name: validated.name,
                description: validated.description,
                price: (0, decimal_js_1.toDecimal)(validated.price),
            },
        });
        res.status(201).json({
            status: "success",
            message: "Product catalog item created successfully",
            data: {
                id: product.id,
                name: product.name,
                description: product.description,
                price: (0, decimal_js_1.formatETB)(product.price),
            },
        });
    }
    catch (err) {
        next(err);
    }
};
exports.createProduct = createProduct;
/**
 * @route   POST /api/v1/products/batches
 * @desc    Receive a physical inventory batch from a supplier & lock in FIFO cost (Admin only)
 * @access  Protected (ADMIN)
 */
const receiveInventoryBatch = async (req, res, next) => {
    try {
        const validated = catalog_validation_js_1.receiveBatchSchema.parse(req.body);
        const existingBatch = await db_js_1.db.inventoryBatch.findUnique({
            where: { batchCode: validated.batchCode },
        });
        if (existingBatch) {
            throw new errors_js_1.ConflictError("An inventory batch with this batchCode already exists");
        }
        const [product, supplier] = await Promise.all([
            db_js_1.db.product.findUnique({ where: { id: validated.productId } }),
            db_js_1.db.supplier.findUnique({ where: { id: validated.supplierId } }),
        ]);
        if (!product)
            throw new errors_js_1.NotFoundError("Product not found");
        if (!supplier)
            throw new errors_js_1.NotFoundError("Supplier not found");
        const batch = await db_js_1.db.inventoryBatch.create({
            data: {
                batchCode: validated.batchCode,
                productId: validated.productId,
                supplierId: validated.supplierId,
                quantityRecieved: validated.quantityRecieved,
                remainingQty: validated.quantityRecieved, // Initially, remaining equals received!
                unitCostPrice: (0, decimal_js_1.toDecimal)(validated.unitCostPrice),
            },
        });
        res.status(201).json({
            status: "success",
            message: "Inventory batch received and FIFO cost locked in successfully",
            data: {
                id: batch.id,
                batchCode: batch.batchCode,
                productId: batch.productId,
                supplierId: batch.supplierId,
                quantityRecieved: batch.quantityRecieved,
                remainingQty: batch.remainingQty,
                unitCostPrice: (0, decimal_js_1.formatETB)(batch.unitCostPrice),
                createdAt: batch.createdAt,
            },
        });
    }
    catch (err) {
        next(err);
    }
};
exports.receiveInventoryBatch = receiveInventoryBatch;
/**
 * @route   GET /api/v1/products
 * @desc    Get all products along with their total available warehouse stock
 * @access  Protected (Authenticated Users)
 */
const getProductsWithStock = async (_req, res, next) => {
    try {
        const products = await db_js_1.db.product.findMany({
            include: {
                batches: {
                    where: {
                        remainingQty: {
                            gt: 0,
                        },
                    },
                    orderBy: {
                        createdAt: "asc", // FIFO order: oldest stock first
                    },
                },
            },
        });
        const formatted = products.map((prod) => {
            const totalAvailableStock = prod.batches.reduce((sum, batch) => sum + batch.remainingQty, 0);
            return {
                id: prod.id,
                name: prod.name,
                description: prod.description,
                defaultWholesalePrice: (0, decimal_js_1.formatETB)(prod.price),
                totalAvailableStock,
                activeBatches: prod.batches.map((b) => ({
                    batchCode: b.batchCode,
                    remainingQty: b.remainingQty,
                    unitCostPrice: (0, decimal_js_1.formatETB)(b.unitCostPrice),
                })),
            };
        });
        res.status(200).json({
            status: "success",
            data: formatted,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getProductsWithStock = getProductsWithStock;
