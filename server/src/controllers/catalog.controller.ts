import { Request, Response, NextFunction } from "express";
import { db } from "../config/db.js";
import {
  createSupplierSchema,
  createProductSchema,
  receiveBatchSchema,
} from "../validations/catalog.validation.js";
import {
  ConflictError,
  NotFoundError,
} from "../utils/errors.js";
import { toDecimal, formatETB } from "../utils/decimal.js";

/**
 * @route   POST /api/v1/suppliers
 * @desc    Onboard a new wholesale supplier (Admin only)
 * @access  Protected (ADMIN)
 */
export const createSupplier = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validated = createSupplierSchema.parse(req.body);

    const supplier = await db.supplier.create({
      data: {
        name: validated.name,
        creditBalance: toDecimal(validated.creditBalance),
      },
    });

    res.status(201).json({
      status: "success",
      message: "Wholesale supplier registered successfully",
      data: {
        id: supplier.id,
        name: supplier.name,
        creditBalance: formatETB(supplier.creditBalance),
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @route   POST /api/v1/products
 * @desc    Create a new Model B wholesale product catalog entry (Admin only)
 * @access  Protected (ADMIN)
 */
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validated = createProductSchema.parse(req.body);

    const product = await db.product.create({
      data: {
        name: validated.name,
        description: validated.description,
        price: toDecimal(validated.price),
      },
    });

    res.status(201).json({
      status: "success",
      message: "Product catalog item created successfully",
      data: {
        id: product.id,
        name: product.name,
        description: product.description,
        price: formatETB(product.price),
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @route   POST /api/v1/products/batches
 * @desc    Receive a physical inventory batch from a supplier & lock in FIFO cost (Admin only)
 * @access  Protected (ADMIN)
 */
export const receiveInventoryBatch = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validated = receiveBatchSchema.parse(req.body);

    const existingBatch = await db.inventoryBatch.findFirst({
      where: { batchCode: validated.batchCode },
    });

    if (existingBatch) {
      throw new ConflictError("An inventory batch with this batchCode already exists");
    }

    const [product, supplier] = await Promise.all([
      db.product.findUnique({ where: { id: validated.productId } }),
      db.supplier.findUnique({ where: { id: validated.supplierId } }),
    ]);

    if (!product) throw new NotFoundError("Product not found");
    if (!supplier) throw new NotFoundError("Supplier not found");

    const batch = await db.inventoryBatch.create({
      data: {
        batchCode: validated.batchCode,
        productId: validated.productId,
        supplierId: validated.supplierId,
        quantityRecieved: validated.quantityRecieved,
        remainingQty: validated.quantityRecieved, // Initially, remaining equals received!
        unitCostPrice: toDecimal(validated.unitCostPrice),
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
        unitCostPrice: formatETB(batch.unitCostPrice),
        createdAt: batch.createdAt,
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @route   GET /api/v1/products
 * @desc    Get all products along with their total available warehouse stock
 * @access  Protected (Authenticated Users)
 */
export const getProductsWithStock = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const products = await db.product.findMany({
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
      const totalAvailableStock = prod.batches.reduce(
        (sum, batch) => sum + batch.remainingQty,
        0
      );

      return {
        id: prod.id,
        name: prod.name,
        description: prod.description,
        defaultWholesalePrice: formatETB(prod.price),
        totalAvailableStock,
        activeBatches: prod.batches.map((b) => ({
          batchCode: b.batchCode,
          remainingQty: b.remainingQty,
          unitCostPrice: formatETB(b.unitCostPrice),
        })),
      };
    });

    res.status(200).json({
      status: "success",
      data: formatted,
    });
  } catch (err) {
    next(err);
  }
};