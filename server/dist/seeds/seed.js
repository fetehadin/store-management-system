"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_js_1 = require("../config/db.js");
const password_js_1 = require("../utils/password.js");
const index_js_1 = require("../generated/client/index.js");
const decimal_js_1 = require("../utils/decimal.js");
async function main() {
    console.log("🌱 Starting minimal database seed...");
    // 1. Clean existing data to ensure a fresh start
    await db_js_1.db.ledgerEntry.deleteMany({});
    await db_js_1.db.paymentProof.deleteMany({});
    await db_js_1.db.issuanceItem.deleteMany({});
    await db_js_1.db.stockIssuance.deleteMany({});
    await db_js_1.db.inventoryBatch.deleteMany({});
    await db_js_1.db.product.deleteMany({});
    await db_js_1.db.supplier.deleteMany({});
    await db_js_1.db.user.deleteMany({});
    console.log("🧹 Cleared all old database records.");
    // 2. Hash default password
    const passwordHash = await (0, password_js_1.hashPassword)("123456");
    // 3. Create the Master Admin User ONLY
    const adminUser = await db_js_1.db.user.create({
        data: {
            fullName: "Mohammed Taju",
            username: "admin",
            passwordHash,
            role: index_js_1.Role.ADMIN,
            requiresPasswordChange: false,
            creditLimit: (0, decimal_js_1.toDecimal)(0),
            creditBalance: (0, decimal_js_1.toDecimal)(0),
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
    await db_js_1.db.$disconnect();
});
