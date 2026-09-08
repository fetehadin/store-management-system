import { db } from "../config/db.js";
import { hashPassword } from "../utils/password.js"; 
import { Role } from "../generated/client/index.js";
import { toDecimal } from "../utils/decimal.js";

async function main() {
  console.log("🌱 Starting minimal database seed...");

  // 1. Clean existing data to ensure a fresh start
  await db.ledgerEntry.deleteMany({});
  await db.paymentProof.deleteMany({});
  await db.issuanceItem.deleteMany({});
  await db.stockIssuance.deleteMany({});
  await db.inventoryBatch.deleteMany({});
  await db.product.deleteMany({});
  await db.supplier.deleteMany({});
  await db.user.deleteMany({});

  console.log("🧹 Cleared all old database records.");

  // 2. Hash default password
  const passwordHash = await hashPassword("123456");

  // 3. Create the Master Admin User ONLY
  const adminUser = await db.user.create({
    data: {
      fullName: "Mohammed Taju",
      username: "admin",
      passwordHash,
      role: Role.ADMIN,
      requiresPasswordChange: false,
      creditLimit: toDecimal(0),
      creditBalance: toDecimal(0),
    },
  });

  console.log(`✅ Created Admin account: ${adminUser.username} (Password: 123456)`);
  console.log("✨ Minimal seeding completed! You can now log in and manage the rest via the app.");
}

main()
  .catch((e) => {
    console.error("❌ Error during database seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });