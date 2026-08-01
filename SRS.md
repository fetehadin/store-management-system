
# 📄 Software Requirements Specification (SRS)

**Project Title:** Ethio Wholesale & Micro-Distribution Ledger System  
**Repository:** `git@github.com:fetehadin/b2b-distro-management-system.git`  
**Classification:** Confidential / Proprietary  
**Version:** 1.0.0  
**Currency:** ETB (Ethiopian Birr — Single Currency)  
**Localization:** English & Amharic  

---

## 1. Executive Domain Summary

The platform manages a three-tier supply chain: **Suppliers** $\rightarrow$ **Store Warehouse** $\rightarrow$ **Sales Reps** $\rightarrow$ **Retail Shops**. 

* **Model B (Wholesale Credit Buyer):** When stock is assigned to a Sales Rep, their account is debited at an Admin-defined wholesale price. Any markup earned when selling to retail shops belongs to the rep.
* **FIFO Costing Engine:** Tracks stock in sequential batches from suppliers, calculating exact Cost of Goods Sold (COGS) and net owner profit even during market price fluctuations.
* **Admin "Store Direct" House Account:** An independent profile for the Store Counter to execute walk-in cash or direct credit sales using the exact same FIFO pipeline.
* **Dual-Direction Credit & Audit Trail:** Maintains immutable ledgers for supplier debts and sales rep liabilities with receipt verification and mandatory structured remarks.

---

## 2. Role-Based Access Control (RBAC)

| Module / Action | Admin / Owner | Sales Rep |
| :--- | :---: | :---: |
| **Supplier & Purchase Order Management** | Full Access | Blocked |
| **Warehouse Inventory & FIFO Batches** | Full Access | Read-Only (Shared Live Stock: Qty & Wholesale Price only) |
| **Stock Issuance & Checkout** | Full Access | Read-Only (Personal Assigned Stock History) |
| **Admin Direct Store Counter** | Full Access | Blocked |
| **Payment Proof Submission** | Override / Approve | Create (Upload screenshots via ML Kit OCR) |
| **Stock Returns Processing** | Inspect, Approve, Route | Create (Initiate return request) |
| **Universal Financial Ledger** | Full Access (All Entities) | Read-Only (Own ledger transactions only) |

---

## 3. Detailed Functional Requirements

### 3.1 FIFO Inventory Costing & Profit Calculations
* **REQ-INV-01 (Batch Lot Creation):** Purchases from suppliers create an `InventoryBatch` record containing: `batchCode`, `supplierId`, `productId`, `quantityReceived`, `unitCostPrice`, `remainingQty`, and `createdAt`.
* **REQ-INV-02 (Sequential FIFO Deduction):** Stock deductions must pull from the oldest active batch (`remainingQty > 0`) sorted by `createdAt ASC`.
* **REQ-INV-03 (COGS Calculation):** Cost of Goods Sold is dynamically computed using exact decimal arithmetic:
  $$\text{COGS} = \sum_{i=1}^{n} (\text{Quantity Deducted}_i \times \text{Unit Cost Price}_i)$$
* **REQ-INV-04 (Net Owner Profit):** Owner profit per transaction is computed as:
  $$\text{Owner Profit} = (\text{Wholesale Price} \times \text{Quantity Issued}) - \text{COGS}$$

### 3.2 Sales Rep Wholesale Credit (Model B)
* **REQ-REP-01 (Wholesale Liability):** Stock checkout debits the rep's ledger balance by:
  $$\text{Debt Added} = \text{Current Wholesale Price} \times \text{Quantity Issued}$$
* **REQ-REP-02 (Credit Limit Enforcement):** If `(creditBalance + newIssuance) > creditLimit`, the checkout is blocked unless overridden by Admin credentials.
* **REQ-REP-03 (Shared Live Stock Feed):** Sales reps must have access to a real-time inventory feed displaying item names (English/Amharic), available warehouse stock, and wholesale prices. Supplier names, unit cost prices, and profit margins are strictly hidden.

### 3.3 Admin Store Direct Counter
* **REQ-ADM-01 (House Profile):** Admin can execute direct store sales under an independent profile (`ADMIN_STORE`).
* **REQ-ADM-02 (Unified FIFO Pipeline):** Direct counter sales utilize the exact same FIFO allocation and profit calculation pipeline as field sales reps.
* **REQ-ADM-03 (Instant/Credit Settlement):** Supports instant cash settlement (`balance = 0`) or credit logging against direct buyers.

### 3.4 Receipt Verification & Anti-Fraud Engine
* **REQ-PAY-01 (Supported Receipts):** Accepts transfer screenshots from CBE Mobile Banking, Telebirr, Awash, BOA, and Coop Bank.
* **REQ-PAY-02 (On-Device OCR Preview):** Flutter app uses Google ML Kit (`google_mlkit_text_recognition`) to extract `Ref ID`, `Amount`, and `Sender/Payer` locally for user review prior to upload.
* **REQ-PAY-03 (Remark/Sender Fallback):** If `Remark / Reason` is empty or generic (`"MB Transfer"`), the system defaults to recording the `Sender / Payer Name`.
* **REQ-PAY-04 (3-Layer Anti-Duplication Shield):**
  * **Layer 1:** Rejects identical image uploads via SHA-256 file hash checking.
  * **Layer 2:** Rejects duplicate claims via a database `UNIQUE` index on sanitized Reference IDs (`FT...`).
  * **Layer 3:** Validates that the receiver account belongs to the Store Owner.
* **REQ-PAY-05 (Verification Queue):** Uploads enter a `PENDING_ADMIN_VERIFICATION` state. Rep debt is reduced **only after explicit Admin approval**.

### 3.5 Returns & Damaged Goods Workflow
* **REQ-RET-01 (Good Stock Return):** Admin approval credits the rep's account by `Wholesale Price × Quantity` and restores items to active FIFO stock.
* **REQ-RET-02 (Damaged Stock Quarantine):** Admin approval credits the rep's account by `Wholesale Price × Quantity` and routes items to `DAMAGED_QUARANTINE` inventory (non-sellable).

### 3.6 Universal Audit Trail
* **REQ-AUD-01 (Mandatory Audit Metadata):** Every financial ledger entry must store `fromEntity`, `toEntity`, `amount`, and `transactionDate`.
* **REQ-AUD-02 (Admin Proof Policy):** Any financial action taken by an Admin must attach either an **Uploaded Receipt Screenshot URL** or a **Mandatory Structured Audit Remark**.

### 3.7 Offline Mobile Queue
* **REQ-OFF-01 (Offline Browsing):** Live Stock Catalog is cached locally in Hive for offline viewing.
* **REQ-OFF-02 (Draft Queueing):** Payment submissions created offline enter a local sync queue and push automatically upon reconnection.
* **REQ-OFF-03 (Online-Only Checkout):** Finalizing stock checkouts or inventory deductions requires an active internet connection to maintain FIFO lot integrity.

---

## 4. Non-Functional Requirements

* **NFR-01 (ACID Transactions):** All stock allocations and financial adjustments execute within single PostgreSQL transaction blocks.
* **NFR-02 (Decimal Precision):** Currency math strictly utilizes `decimal.js` on Node.js and `DECIMAL(12, 2)` in PostgreSQL to eliminate floating-point errors.
* **NFR-03 (Localization):** UI and exported reports dynamically render in **English** and **Amharic** using Ethiopic UTF-8 script.
* **NFR-04 (Security):** API authenticated via BetterAuth tokens. Sensitive routes protected with RBAC middleware and input payload validation via Zod.