// Rep Submits Return Request
export const submitReturn = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { items, totalValue, reason } = req.body;

    const stockReturn = await db.stockReturn.create({
      data: {
        userId,
        totalValue,
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

    res.status(201).json({ message: "Return request submitted.", data: stockReturn });
  } catch (error) {
    res.status(500).json({ message: "Failed to submit return request." });
  }
};

// Admin Processes Return
export const processReturn = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { destination } = req.body; // 'WAREHOUSE' or 'SUPPLIER'
    const adminId = req.user?.id;

    const pendingReturn = await db.stockReturn.findUnique({
      where: { id },
      include: { items: true }
    });

    if (!pendingReturn || pendingReturn.status !== 'PENDING') {
      res.status(400).json({ message: "Return request not found or already processed." });
      return;
    }

    // Prepare database operations
    const operations: any[] = [
      // 1. Mark as approved and set destination
      db.stockReturn.update({
        where: { id },
        data: { status: 'APPROVED', destination }
      }),
      // 2. Decrement Rep's Debt
      db.user.update({
        where: { id: pendingReturn.userId },
        data: { creditBalance: { decrement: pendingReturn.totalValue } }
      }),
      // 3. Write to Immutable Ledger
      db.ledgerEntry.create({
        data: {
          fromEntity: 'SALES_REP',
          fromEntityId: pendingReturn.userId,
          toEntity: destination,
          toEntityId: adminId,
          amount: pendingReturn.totalValue,
          transferMethod: 'STOCK_RETURN',
          transactionRefId: pendingReturn.id,
          auditRemark: `Stock returned to ${destination}. Reason: ${pendingReturn.reason}`,
        }
      })
    ];

    // 4. If returning to Warehouse, increment physical stock
    if (destination === 'WAREHOUSE') {
      for (const item of pendingReturn.items) {
        operations.push(
          db.inventory.update({
            where: { id: item.itemId },
            data: { stock: { increment: item.quantity } }
          })
        );
      }
    }

    // Execute all math simultaneously in an unbreakable transaction
    await db.$transaction(operations);

    res.status(200).json({ message: "Return processed successfully." });
  } catch (error) {
    console.error("Return Transaction Error:", error);
    res.status(500).json({ message: "Critical error processing return." });
  }
};