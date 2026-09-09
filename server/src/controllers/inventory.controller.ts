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
 * @route   GET /api/v1/inventory/products
 * @desc    Fetch live inventory with dynamic FIFO cost calculation and categories
 * @access  Protected (ADMIN)
 */
export const getInventory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const products = await db.product.findMany({
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
        // 1. Calculate total available physical stock across all active batches
        const totalStock = product.batches.reduce(
          (sum, batch) => sum + batch.remainingQty,
          0
        );

        // 2. Identify the active FIFO batch (the oldest batch that still has sellable units)
        const activeBatch = product.batches.find((b) => b.remainingQty > 0);
        const currentCostPrice = activeBatch ? activeBatch.unitCostPrice : 0;

        return {
          id: product.id,
          name: product.name,
          category: (product as any).category || "General",
          imageUrl: (product as any).imageUrl || null,
          stock: totalStock,
          costPrice: Number(currentCostPrice),
          sellingPrice: Number(product.price),
        };
      })
      .filter((product) => product.stock > 0); // <-- THE FIX: Filters out any product with 0 total stock

    res.status(200).json({
      status: "success",
      data: mappedInventory,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @route   PATCH /api/v1/inventory/products/:id/price
 * @desc    Update the live selling price of a product
 * @access  Protected (ADMIN)
 */
export const updateSellingPrice = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { price } = req.body;

    if (price === undefined || isNaN(Number(price))) {
      throw new BadRequestError("A valid price is required.");
    }

    await db.product.update({
      where: { id },
      data: { price: toDecimal(price) },
    });

    res.status(200).json({
      status: "success",
      message: "Selling price updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

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
    // 1. AUTO-INJECT THE ID FROM THE LOGIN TOKEN (BULLETPROOF)
    if (req.user?.id) {
      req.body.salesRepId = req.user.id;
    }

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
          fromEntity: AuditEntity.ADMIN_STORE,
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

export const getMyStock = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      throw new BadRequestError("User authentication required");
    }

    // 1. Fetch all issuances for this Sales Rep that are active
    const issuances = await db.stockIssuance.findMany({
      where: { userId: userId, status: "ISSUED" },
      include: { items: true },
    });

    // 2. Aggregate quantities by productId (in case they checked out the same item twice)
    const stockMap = new Map<string, { qty: number; price: number }>();

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
    const products = await db.product.findMany({
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
  } catch (err) {
    next(err);
  }
};


/**
 * @route   GET /api/v1/inventory/products/suggestions
 * @desc    Fetch distinct product names and categories for autocomplete to prevent dirty data
 * @access  Protected (ADMIN)
 */
export const getProductSuggestions = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const query = (req.query.q as string) || "";
    
    // Fetch distinct names and categories matching the search query
    const products = await db.product.findMany({
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
  } catch (err) {
    next(err);
  }
};