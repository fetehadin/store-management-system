import { db } from "../config/db.js";
import { hashPassword } from "../utils/password.js"; // Use our shared utility!
import { Role } from "../generated/client/index.js";
import { toDecimal } from "../utils/decimal.js";

async function main() {
  console.log("🌱 Starting database seed...");

  // 1. Clean existing data
  await db.ledgerEntry.deleteMany({});
  await db.paymentProof.deleteMany({});
  await db.issuanceItem.deleteMany({});
  await db.stockIssuance.deleteMany({});
  await db.inventoryBatch.deleteMany({});
  await db.product.deleteMany({});
  await db.supplier.deleteMany({});
  await db.user.deleteMany({});

  console.log("🧹 Cleared old database records.");

  // 2. Hash default passwords using our unified utility
  const passwordHash = await hashPassword("123456");

  // 3. Create Users
  const adminUser = await db.user.create({
    data: {
      fullName: "Mohammed Taju (Admin)",
      username: "admin",
      passwordHash,
      role: Role.ADMIN,
      requiresPasswordChange: false,
      creditLimit: toDecimal(0),
      creditBalance: toDecimal(0),
    },
  });

  const salesRep1 = await db.user.create({
    data: {
      fullName: "Abebe Kebede (Sales Rep)",
      username: "abebe.k",
      passwordHash,
      role: Role.SALES_REP,
      requiresPasswordChange: true,
      creditLimit: toDecimal(100000),
      creditBalance: toDecimal(45000),
    },
  });

  const salesRep2 = await db.user.create({
    data: {
      fullName: "Dawit Tadesse (Sales Rep)",
      username: "dawit.t",
      passwordHash,
      role: Role.SALES_REP,
      requiresPasswordChange: false,
      creditLimit: toDecimal(100000),
      creditBalance: toDecimal(95000),
    },
  });

  console.log(`👤 Created users: Admin (${adminUser.username}), Sales Reps (${salesRep1.username}, ${salesRep2.username})`);

  // 4. Create Suppliers
  const supplier1 = await db.supplier.create({
    data: {
      name: "Habesha Bottling & Distribution PLC",
      phone: "0911223344",
      creditBalance: toDecimal(0),
    },
  });

  const supplier2 = await db.supplier.create({
    data: {
      name: "Awash Agro-Processing S.C.",
      phone: "0922334455",
      creditBalance: toDecimal(0),
    },
  });

  console.log(`🏭 Created suppliers: ${supplier1.name}, ${supplier2.name}`);

  // 5. Create Products
  const product1 = await db.product.create({
    data: {
      name: "Premium Sugar (50kg)",
      description: "Standard industrial wholesale sack",
      price: toDecimal(3500.00),
    },
  });

  const product2 = await db.product.create({
    data: {
      name: "Refined Cooking Oil (5L)",
      description: "Vegetable cooking oil container",
      price: toDecimal(1200.00),
    },
  });

  console.log(`📦 Created products: ${product1.name}, ${product2.name}`);

  // 6. Receive Inventory Batches (FIFO setup)
  const batch1 = await db.inventoryBatch.create({
    data: {
      batchCode: "BATCH-SUGAR-2026-01",
      productId: product1.id,
      supplierId: supplier1.id,
      quantityRecieved: 450,
      remainingQty: 450,
      unitCostPrice: toDecimal(3200.00),
    },
  });

  const batch2 = await db.inventoryBatch.create({
    data: {
      batchCode: "BATCH-OIL-2026-01",
      productId: product2.id,
      supplierId: supplier2.id,
      quantityRecieved: 120,
      remainingQty: 120,
      unitCostPrice: toDecimal(1050.00),
    },
  });

  console.log(`📥 Created inventory batches: ${batch1.batchCode}, ${batch2.batchCode}`);

  console.log("✨ Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error during database seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });