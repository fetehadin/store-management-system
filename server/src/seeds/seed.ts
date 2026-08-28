import { db } from "../config/db.js";
import bcrypt from "bcrypt";
import { Role } from "../generated/client/index.js";
import { toDecimal } from "../utils/decimal.js";

async function main() {
  console.log("🌱 Starting database seed...");

  // 1. Clean existing data (respecting foreign key relationships)
  await db.ledgerEntry.deleteMany({});
  await db.paymentProof.deleteMany({});
  await db.issuanceItem.deleteMany({});
  await db.stockIssuance.deleteMany({});
  await db.inventoryBatch.deleteMany({});
  await db.product.deleteMany({});
  await db.supplier.deleteMany({});
  await db.user.deleteMany({});

  console.log("🧹 Cleared old database records.");

  // 2. Hash default passwords
  const passwordHash = await bcrypt.hash("Password123!", 10);

  // 3. Create Users (Admin & Sales Reps)
  const adminUser = await db.user.create({
    data: {
      fullName: "Mohammed Taju (Admin)",
      phone: "0911000000",
      passwordHash,
      role: Role.ADMIN,
      creditLimit: toDecimal(0),
      creditBalance: toDecimal(0),
    },
  });

  const salesRep1 = await db.user.create({
    data: {
      fullName: "Dawit Tadesse (Sales Rep)",
      phone: "0922112233",
      passwordHash,
      role: Role.SALES_REP,
      creditLimit: toDecimal(50000),
      creditBalance: toDecimal(0),
    },
  });

  const salesRep2 = await db.user.create({
    data: {
      fullName: "Mekdes Lemma (Sales Rep)",
      phone: "0933445566",
      passwordHash,
      role: Role.SALES_REP,
      creditLimit: toDecimal(75000),
      creditBalance: toDecimal(0),
    },
  });

  console.log(`👤 Created users: Admin (${adminUser.phone}), Sales Reps (${salesRep1.phone}, ${salesRep2.phone})`);

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
      name: "Highland Mineral Water (2L Pack)",
      description: "Pack of 6 bottles of 2-liter natural mineral water",
      price: toDecimal(450.00),
    },
  });

  const product2 = await db.product.create({
    data: {
      name: "Faffa Food Complex Baby Formula (500g)",
      description: "Nutritious fortified infant cereal",
      price: toDecimal(320.00),
    },
  });

  console.log(`📦 Created products: ${product1.name}, ${product2.name}`);

  // 6. Receive Inventory Batches (FIFO setup)
  const batch1 = await db.inventoryBatch.create({
    data: {
      batchCode: "BATCH-HL-2026-01",
      productId: product1.id,
      supplierId: supplier1.id,
      quantityRecieved: 200,
      remainingQty: 200,
      unitCostPrice: toDecimal(350.00),
    },
  });

  const batch2 = await db.inventoryBatch.create({
    data: {
      batchCode: "BATCH-FA-2026-01",
      productId: product2.id,
      supplierId: supplier2.id,
      quantityRecieved: 150,
      remainingQty: 150,
      unitCostPrice: toDecimal(240.00),
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