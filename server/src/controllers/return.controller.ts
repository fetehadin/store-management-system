import { Request, Response, NextFunction } from "express";
import { db } from "../config/db.js";
import { toDecimal } from "../utils/decimal.js";
import { AuditEntity, ReturnDestination } from "../generated/client/index.js";
import { UnauthorizedError, BadRequestError } from "../utils/errors.js";

// 1. Rep Submits Return Request
export const submitReturn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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

    res.status(201).json({ status: "success", message: "Return request submitted.", data: stockReturn });
  } catch (error) { next(error); }
};

// 2. Admin Fetches Pending Returns (with Product Names)
export const getPendingReturns = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const pendingReturns = await db.stockReturn.findMany({
      where: { status: 'PENDING' },
      include: {
        user: { select: { fullName: true } },
        items: true 
      },
      orderBy: { createdAt: "desc" },
    });

    const productIds = [...new Set(pendingReturns.flatMap(r => r.items.map(i => i.itemId)))];
    const products = await db.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true, name: true, price: true }
    });
    const productMap = new Map(products.map(p => [p.id, p]));

    const formattedReturns = pendingReturns.map(ret => ({
      ...ret,
      items: ret.items.map(item => {
        const prod = productMap.get(item.itemId);
        return {
          ...item,
          product: { name: prod?.name || 'Unknown Product', price: prod?.price || 0 }
        };
      })
    }));

    res.status(200).json({ status: "success", data: formattedReturns });
  } catch (err) { next(err); }
};

// 3. Admin Approves Return (Adds directly back to batch & clears debt)
export const processReturn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params as Record<string, string>;
    const adminId = req.user?.id;
    
    if (!adminId) throw new UnauthorizedError("Admin authorization required");

    const pendingReturn = await db.stockReturn.findUnique({
      where: { id },
      include: { items: true }
    });

    if (!pendingReturn || pendingReturn.status !== 'PENDING') {
      throw new BadRequestError("Return request not found or already processed.");
    }

    const operations: any[] = [
      // 1. Approve the return
      db.stockReturn.update({
        where: { id },
        data: { status: 'APPROVED', destination: ReturnDestination.WAREHOUSE }
      }),
      // 2. Decrement the Rep's Debt
      db.user.update({
        where: { id: pendingReturn.userId },
        data: { creditBalance: { decrement: pendingReturn.totalValue } }
      }),
      // 3. Ledger Audit
      db.ledgerEntry.create({
        data: {
          fromEntity: AuditEntity.SALES_REP,
          fromEntityId: pendingReturn.userId,
          toEntity: AuditEntity.ADMIN_STORE,
          toEntityId: adminId,
          amount: pendingReturn.totalValue, 
          transferMethod: 'STOCK_RETURN',
          transactionRefId: pendingReturn.id,
          auditRemark: `Stock returned by Rep to WAREHOUSE. Reason: ${pendingReturn.reason}`,
        }
      })
    ];

    // 4. Add items back into their most recent batch live stock
    for (const item of pendingReturn.items) {
      const latestBatch = await db.inventoryBatch.findFirst({
        where: { productId: item.itemId },
        orderBy: { createdAt: 'desc' },
      });

      if (!latestBatch) {
        throw new BadRequestError(`Cannot return to stock: No batch found for item ${item.itemId}.`);
      }

      operations.push(
        db.inventoryBatch.update({
          where: { id: latestBatch.id },
          data: { remainingQty: { increment: item.quantity } }
        })
      );
    }

    await db.$transaction(operations);

    res.status(200).json({ status: "success", message: "Return processed and added to stock." });
  } catch (error) { next(error); }
};