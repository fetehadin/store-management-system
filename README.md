# Store Management System (V1)

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=ReactQuery&logoColor=white)

## Executive Summary
This project is a production-grade, end-to-end B2B distribution and reverse-logistics platform. Designed for high-volume wholesale operations, the system orchestrates physical inventory movement and financial liability across three distinct entities: Administrators (Warehouse), Sales Representatives (Field Operators), and External Suppliers. 

The architecture is built on a strict, immutable financial ledger and a First-In-First-Out (FIFO) inventory batching engine. It guarantees ACID-compliant database transactions, preventing data anomalies during complex operations like partial supplier refunds, multi-batch stock checkouts, and dynamic debt reconciliation.

## System Architecture
The platform is divided into two primary environments:
*   **Backend Server:** A RESTful API built with Node.js and Express, utilizing Prisma ORM for type-safe database interactions with PostgreSQL.
*   **Mobile Client:** A cross-platform mobile application built with React Native and Expo, utilizing React Query for asynchronous state management and Zustand for global synchronous state.

## Core Capabilities (V1 Release)

### 1. Immutable Financial Ledger
*   **Automated Debt Reconciliation:** Every physical movement of stock automatically triggers a corresponding financial entry, adjusting the active debt balances of Sales Reps and Suppliers in real-time.
*   **Audit Entity Tracking:** Transactions are cryptographically mapped between specific entities (`ADMIN_STORE`, `SALES_REP`, `SUPPLIER`), ensuring a complete, unbreakable audit trail of all financial liabilities and clearances.

### 2. Advanced Inventory & Margin Protection
*   **FIFO Batching Engine:** Inventory is not stored as a generic pool. Every item is tied to a specific supplier batch. Stock issuances automatically deduct from the oldest available batches.
*   **Dynamic Margin Protection:** The frontend dynamically renders the highest active `unitCostPrice` across all available batches, ensuring sales margins are protected during periods of supplier price volatility.
*   **Visual Asset Management:** Supports base64 image capture and rendering for precise product identification directly from the field.

### 3. Reverse Logistics & Return Routing
*   **LIFO Trace Algorithm:** Handles complex reverse-logistics. When a Sales Rep returns unsold stock, the system dynamically identifies the most recent supplier batch and routes the stock accordingly.
*   **Multi-Destination Routing:** Administrators can approve returns to be re-injected into the internal warehouse stock, or routed directly back to the original supplier (automatically deducting the wholesale cost from the active supplier debt).

### 4. Supplier & Procurement Management
*   **Granular Batch Tracking:** Track exact payable balances across multiple active inventory batches. 
*   **Transactional Ledger Payments:** Issue partial or full payments against specific supplier batches.
*   **Strict Deletion Constraints:** ERP-level safeguards prevent the deletion of suppliers or batches if unsold physical stock remains in the warehouse or if outstanding financial debt exists.

### 5. Role-Based Mobile Portals
*   **Admin Dashboard:** Features a centralized Approvals Desk to verify field payment proofs, authorize stock returns, manage the supplier registry, and monitor global system analytics.
*   **Sales Rep Dashboard:** A streamlined field-operations interface featuring live debt synchronization, warehouse checkout (POS), digital field notes, and persistent notification streams.

---

## Local Development & Setup

### Prerequisites
*   Node.js (v18+)
*   PostgreSQL instance running locally or via cloud provider
*   Expo CLI
*   Git

### Repository Initialization
Clone the repository to your local machine using SSH:
```bash
git clone git@github.com:fetehadin/store-management-system.git
cd store-management-system
Backend Setup
Navigate to the server directory:

Bash
cd server
Install dependencies:

Bash
npm install
Configure the environment variables. Create a .env file in the server directory:

Code snippet
PORT=5000
DATABASE_URL="postgresql://user:password@localhost:5432/store_management?schema=public"
JWT_SECRET="your_secure_jwt_secret"
CORS_ORIGIN="*"
NODE_ENV="development"
Synchronize the Prisma schema with the database:

Bash
npx prisma db push
npx prisma generate
Start the development server:

Bash
npm run dev
Mobile Client Setup
Navigate to the mobile client directory from the repository root:

Bash
cd mobile-client
Install dependencies:

Bash
npm install
Configure the environment variables. Create a .env file in the mobile-client directory. Use your local IPv4 address so the physical device can communicate with the backend:

Code snippet
EXPO_PUBLIC_BASE_IP=[http://192.168.](http://192.168.)X.X:5000
Start the Expo bundler:

Bash
npx expo start
Database Schema Highlights
The system relies on a tightly coupled relational schema. Key entities include:

User: Tracks authentication, roles, and real-time creditBalance.

Supplier: Tracks external vendors and their active creditBalance.

InventoryBatch: Tracks physical units, supplier origin, unit costs, and archive statuses.

LedgerEntry: The immutable core of the system, tracking fromEntity, toEntity, and transferMethod for every logical transaction.

StockReturn: Manages the state of reverse logistics (PENDING, APPROVED, REJECTED) and destination routing.

Security & Data Integrity
ACID Compliance: All multi-step financial adjustments (e.g., deducting stock, clearing rep debt, logging the audit trail) are wrapped in db.$transaction() blocks. If any single query fails, the entire operation rolls back, preventing ghost stock or orphaned debt.

Foreign Key Constraints: Prisma relations enforce strict data hierarchy (e.g., Supplier deletions cascade, but are protected by business-logic validation checks).

Sanitization: All monetary values are handled using a custom toDecimal utility to prevent floating-point precision errors during debt calculation.