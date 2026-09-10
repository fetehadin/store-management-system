import { Request, Response, NextFunction } from "express";
import { db } from "../config/db.js";
import { toDecimal } from "../utils/decimal.js";
import { AuditEntity, ReturnDestination } from "../generated/client/index.js";
import { UnauthorizedError, BadRequestError } from "../utils/errors.js";

// Rep Submits Return Request (Sales Rep -> Admin Warehouse/Supplier)
export const submitReturn = async (
  req: Request, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) throw new UnauthorizedError("User authentication required");

    const { items, totalValue, reason } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new BadRequestError("Return request must contain at least one item.");
    }

    const stockReturn = await db.stockReturn.create({
      data: {
        userId,
        totalValue: toDecimal(totalValue),
        reason,
        status: 'PENDING',
        items: {
          create: items.map((item: any) => ({
            itemId: item.itemId, 
            quantity: item.quantity
          }))
        }
      }
    });

    res.status(201).json({ 
      status: "success",
      message: "Return request submitted successfully.", 
      data: stockReturn 
    });
  } catch (error) {
    next(error);
  }
};

// Admin Fetches All Pending Stock Returns
export const getPendingReturns = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const pendingReturns = await db.stockReturn.findMany({
      where: { status: 'PENDING' },
      include: {
        user: { select: { fullName: true } },
        items: true
      },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
      status: "success",
      data: pendingReturns,
    });
  } catch (err) {
    next(err);
  }
};

// Admin Processes Return (Decides whether it goes back to WAREHOUSE or SUPPLIER)
export const processReturn = async (
  req: Request, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { destination } = req.body; // 'WAREHOUSE' or 'SUPPLIER'
    const adminId = req.user?.id;
    
    if (!adminId) throw new UnauthorizedError("Admin authorization required");

    if (!Object.values(ReturnDestination).includes(destination)) {
      throw new BadRequestError("Invalid return destination. Must be WAREHOUSE or SUPPLIER.");
    }

    const pendingReturn = await db.stockReturn.findUnique({
      where: { id },
      include: { items: true }
    });

    if (!pendingReturn || pendingReturn.status !== 'PENDING') {
      throw new BadRequestError("Return request not found or already processed.");
    }

    // Map ReturnDestination to AuditEntity enum safely for the immutable ledger
    const targetEntity = destination === ReturnDestination.WAREHOUSE 
      ? AuditEntity.ADMIN_STORE 
      : AuditEntity.SUPPLIER;

    // Prepare core database operations
    const operations: any[] = [
      // 1. Mark as approved and set destination
      db.stockReturn.update({
        where: { id },
        data: { status: 'APPROVED', destination }
      }),
      
      // 2. Decrement Rep's Debt (Clearing liability for returned stock)
      db.user.update({
        where: { id: pendingReturn.userId },
        data: { creditBalance: { decrement: pendingReturn.totalValue } }
      }),
      
      // 3. Write to Immutable Ledger
      db.ledgerEntry.create({
        data: {
          fromEntity: AuditEntity.SALES_REP,
          fromEntityId: pendingReturn.userId,
          toEntity: targetEntity,
          toEntityId: adminId,
          amount: pendingReturn.totalValue,
          transferMethod: 'STOCK_RETURN',
          transactionRefId: pendingReturn.id,
          auditRemark: `Stock returned to ${destination}. Reason: ${pendingReturn.reason}`,
        }
      })
    ];

    // 4. If returning to Warehouse, re-inject into FIFO stock as a new batch
    if (destination === ReturnDestination.WAREHOUSE) {
      for (const item of pendingReturn.items) {
        operations.push(
          db.inventoryBatch.create({
            data: {
              batchCode: `RET-${pendingReturn.id.substring(0, 8).toUpperCase()}`,
              productId: item.itemId, 
              supplierId: adminId, 
              quantityRecieved: item.quantity,
              remainingQty: item.quantity,
              unitCostPrice: toDecimal(0), 
              amountPaid: toDecimal(0),
              isArchived: false
            }
          })
        );
      }
    }

    // Execute all updates simultaneously in an unbreakable transaction
    await db.$transaction(operations);

    res.status(200).json({ 
      status: "success", 
      message: "Return processed successfully. Rep debt adjusted." 
    });
  } catch (error) {
    console.error("Return Transaction Error:", error);
    next(error); 
  }
};