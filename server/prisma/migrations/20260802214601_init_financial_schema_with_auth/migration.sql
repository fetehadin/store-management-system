-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'SALES_REP');

-- CreateEnum
CREATE TYPE "ProofStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "AuditEntity" AS ENUM ('ADMIN_STORE', 'SALES_REP', 'SUPPLIER', 'DIRECT_BUYER');

-- CreateEnum
CREATE TYPE "IssuanceStatus" AS ENUM ('ISSUED', 'RETURNED', 'PARTIAL_RETURNED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'SALES_REP',
    "creditLimit" DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    "creditBalance" DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Supplier" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "creditBalance" DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL(12,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InventoryBatch" (
    "id" TEXT NOT NULL,
    "batchCode" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "quantityRecieved" INTEGER NOT NULL,
    "remainingQty" INTEGER NOT NULL,
    "unitCostPrice" DECIMAL(12,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InventoryBatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockIssuance" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "IssuanceStatus" NOT NULL DEFAULT 'ISSUED',
    "totalWholesaleValue" DECIMAL(12,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StockIssuance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IssuanceItem" (
    "id" TEXT NOT NULL,
    "issuanceId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "wholesalePrice" DECIMAL(12,2) NOT NULL,
    "qtyIssued" INTEGER NOT NULL,
    "cogsCalculated" DECIMAL(12,2) NOT NULL,

    CONSTRAINT "IssuanceItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentProof" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "transactionRedId" TEXT NOT NULL,
    "sha256Hash" TEXT NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "senderName" TEXT,
    "reasonRemark" TEXT,
    "receipeImageUrl" TEXT,
    "status" "ProofStatus" NOT NULL DEFAULT 'PENDING',
    "adminRemark" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaymentProof_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LedgerEntry" (
    "id" TEXT NOT NULL,
    "transactionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fromEntity" "AuditEntity" NOT NULL,
    "fromEntityId" TEXT,
    "toEntity" "AuditEntity" NOT NULL,
    "toEntityId" TEXT,
    "amount" DECIMAL(12,2) NOT NULL,
    "transferMethod" TEXT NOT NULL,
    "receiptUrl" TEXT,
    "auditRemark" TEXT,
    "transactionRefId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LedgerEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_phone_key" ON "Supplier"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "InventoryBatch_batchCode_key" ON "InventoryBatch"("batchCode");

-- CreateIndex
CREATE INDEX "InventoryBatch_productId_remainingQty_createdAt_idx" ON "InventoryBatch"("productId", "remainingQty", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentProof_transactionRedId_key" ON "PaymentProof"("transactionRedId");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentProof_sha256Hash_key" ON "PaymentProof"("sha256Hash");

-- CreateIndex
CREATE INDEX "PaymentProof_status_createdAt_idx" ON "PaymentProof"("status", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "LedgerEntry_transactionRefId_key" ON "LedgerEntry"("transactionRefId");

-- CreateIndex
CREATE INDEX "LedgerEntry_fromEntity_toEntity_transactionDate_idx" ON "LedgerEntry"("fromEntity", "toEntity", "transactionDate");

-- AddForeignKey
ALTER TABLE "InventoryBatch" ADD CONSTRAINT "InventoryBatch_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryBatch" ADD CONSTRAINT "InventoryBatch_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockIssuance" ADD CONSTRAINT "StockIssuance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IssuanceItem" ADD CONSTRAINT "IssuanceItem_issuanceId_fkey" FOREIGN KEY ("issuanceId") REFERENCES "StockIssuance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentProof" ADD CONSTRAINT "PaymentProof_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
