"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_js_1 = require("../config/db.js");
const bcrypt_1 = __importDefault(require("bcrypt"));
const index_js_1 = require("../generated/client/index.js");
const decimal_js_1 = require("../utils/decimal.js");
async function main() {
    console.log("🌱 Starting database seed...");
    // 1. Clean existing data (respecting foreign key relationships)
    await db_js_1.db.ledgerEntry.deleteMany({});
    await db_js_1.db.paymentProof.deleteMany({});
    await db_js_1.db.issuanceItem.deleteMany({});
    await db_js_1.db.stockIssuance.deleteMany({});
    await db_js_1.db.inventoryBatch.deleteMany({});
    await db_js_1.db.product.deleteMany({});
    await db_js_1.db.supplier.deleteMany({});
    await db_js_1.db.user.deleteMany({});
    console.log("🧹 Cleared old database records.");
    // 2. Hash default passwords
    const passwordHash = await bcrypt_1.default.hash("Password123!", 10);
    // 3. Create Users (Admin & Sales Reps)
    const adminUser = await db_js_1.db.user.create({
        data: {
            fullName: "Mohammed Taju (Admin)",
            phone: "0911000000",
            passwordHash,
            role: index_js_1.Role.ADMIN,
            creditLimit: (0, decimal_js_1.toDecimal)(0),
            creditBalance: (0, decimal_js_1.toDecimal)(0),
        },
    });
    const salesRep1 = await db_js_1.db.user.create({
        data: {
            fullName: "Dawit Tadesse (Sales Rep)",
            phone: "0922112233",
            passwordHash,
            role: index_js_1.Role.SALES_REP,
            creditLimit: (0, decimal_js_1.toDecimal)(50000),
            creditBalance: (0, decimal_js_1.toDecimal)(0),
        },
    });
    const salesRep2 = await db_js_1.db.user.create({
        data: {
            fullName: "Mekdes Lemma (Sales Rep)",
            phone: "0933445566",
            passwordHash,
            role: index_js_1.Role.SALES_REP,
            creditLimit: (0, decimal_js_1.toDecimal)(75000),
            creditBalance: (0, decimal_js_1.toDecimal)(0),
        },
    });
    console.log(`👤 Created users: Admin (${adminUser.phone}), Sales Reps (${salesRep1.phone}, ${salesRep2.phone})`);
    // 4. Create Suppliers
    const supplier1 = await db_js_1.db.supplier.create({
        data: {
            name: "Habesha Bottling & Distribution PLC",
            phone: "0911223344",
            creditBalance: (0, decimal_js_1.toDecimal)(0),
        },
    });
    const supplier2 = await db_js_1.db.supplier.create({
        data: {
            name: "Awash Agro-Processing S.C.",
            phone: "0922334455",
            creditBalance: (0, decimal_js_1.toDecimal)(0),
        },
    });
    console.log(`🏭 Created suppliers: ${supplier1.name}, ${supplier2.name}`);
    // 5. Create Products
    const product1 = await db_js_1.db.product.create({
        data: {
            name: "Highland Mineral Water (2L Pack)",
            description: "Pack of 6 bottles of 2-liter natural mineral water",
            price: (0, decimal_js_1.toDecimal)(450.00),
        },
    });
    const product2 = await db_js_1.db.product.create({
        data: {
            name: "Faffa Food Complex Baby Formula (500g)",
            description: "Nutritious fortified infant cereal",
            price: (0, decimal_js_1.toDecimal)(320.00),
        },
    });
    console.log(`📦 Created products: ${product1.name}, ${product2.name}`);
    // 6. Receive Inventory Batches (FIFO setup)
    const batch1 = await db_js_1.db.inventoryBatch.create({
        data: {
            batchCode: "BATCH-HL-2026-01",
            productId: product1.id,
            supplierId: supplier1.id,
            quantityRecieved: 200,
            remainingQty: 200,
            unitCostPrice: (0, decimal_js_1.toDecimal)(350.00),
        },
    });
    const batch2 = await db_js_1.db.inventoryBatch.create({
        data: {
            batchCode: "BATCH-FA-2026-01",
            productId: product2.id,
            supplierId: supplier2.id,
            quantityRecieved: 150,
            remainingQty: 150,
            unitCostPrice: (0, decimal_js_1.toDecimal)(240.00),
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
    await db_js_1.db.$disconnect();
});
