# b2b-distro-management-system

> **Security Classification:** Confidential / Private Repository  
> **Target Region:** Ethiopia (ETB Currency)  
> **Supported Languages:** English & Amharic  

An enterprise-grade, mobile-first B2B supply chain management, FIFO inventory costing, and dual-direction financial ledger system built for wholesale distribution networks.

---

## Repository Architecture (Client / Server Monorepo)

The repository is structured into two isolated workspaces: `server/` (Backend Node.js API) and `client/` (Flutter Mobile App).

```text
b2b-distro-management-system/
├── server/                        # Node.js + Express + TypeScript REST API
│   ├── prisma/                    # Database models and migration scripts
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── src/                       # Application source code
│   │   ├── config/                # Environment, BetterAuth, i18n
│   │   ├── constants/             # Enums, roles, audit entity types
│   │   ├── middlewares/           # Auth, RBAC, Zod validation, rate limits
│   │   ├── modules/               # Domain modules (inventory, ledger, etc.)
│   │   │   ├── auth/
│   │   │   ├── inventory/
│   │   │   ├── ledger/
│   │   │   ├── sales-reps/
│   │   │   ├── suppliers/
│   │   │   └── verification/
│   │   └── utils/                 # Decimal math, SHA-256 hashers, logger
│   ├── tests/                     # Jest unit and integration tests
│   ├── .env.example
│   ├── Dockerfile                 # Production server container build
│   ├── package.json
│   └── tsconfig.json
│
├── client/                        # Flutter Cross-Platform Native Mobile Client
│   ├── android/                   # Android build configuration
│   ├── ios/                       # iOS build configuration
│   ├── lib/                       # Flutter Application Source
│   │   ├── core/                  # Interceptors, theme, i18n (Amharic/English)
│   │   ├── features/              # Feature slices (BLoC + UI screens)
│   │   │   ├── auth/
│   │   │   ├── inventory/         # Shared Live Stock Catalog & FIFO views
│   │   │   ├── ledger/            # Personal & Universal Audit Ledgers
│   │   │   ├── sales/             # Stock checkout & Admin store counter
│   │   │   └── verification/      # ML Kit OCR & receipt upload queue
│   │   └── main.dart              # App initialization
│   ├── test/                      # Widget and BLoC unit tests
│   └── pubspec.yaml               # Dart dependencies
│
├── .github/                       # Automated CI/CD Deployment Workflows
│   └── workflows/
│       └── deploy.yml
├── docker-compose.yml             # Local Orchestration (PostgreSQL + Express)
├── README.md                      # Workspace documentation
└── SRS.md                         # Software Requirements Specification

## Technology Stack Summary

| Domain | Technology | Key Responsibilities |
| :--- | :--- | :--- |
| **Backend API** | **Node.js + Express (TypeScript)** | REST API, strict Zod validation, arbitrary-precision currency math (`decimal.js`), structured logging. |
| **Authentication** | **BetterAuth** | Stateless API token auth (Bearer headers), rate-limiting, role-based access control (RBAC). |
| **Database & ORM** | **PostgreSQL + Prisma ORM** | ACID transactions, strict schema constraints, unique index on transaction IDs (`FT...`). |
| **Mobile Client** | **Flutter (Dart v3.12+)** | Native Android/iOS app, state management (`flutter_bloc`), HTTP client (`dio`), i18n (`intl`). |
| **On-Device OCR** | **Google ML Kit (Flutter)** | Free, local text recognition on screenshots prior to server verification. |
| **Infrastructure** | **Docker + Hetzner VPS** | Containerization, PostgreSQL orchestration, GitHub Actions CI/CD deployment. |

---

## Local Development Setup

### 1. Prerequisites
* **Node.js** (v26 LTS / Current)
* **Flutter SDK** (v3.47+)
* **Docker & Docker Compose**
* **Git**

### 2. Database & Server Setup (`/server`)

```bash
# Navigate to server workspace
cd server

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Start local PostgreSQL container (from repository root)
cd .. && docker-compose up -d postgres && cd server

# Run Prisma database migrations
npx prisma migrate dev

# Start local dev server with hot reload
npm run dev
3. Mobile Client Setup (/client)Bash# Navigate to client workspace
cd client

# Fetch Flutter dependencies
flutter pub get

# Run on connected device or emulator
flutter run
Testing & ValidationBackend Tests: Run cd server && npm test (Executes Jest unit tests for FIFO math, ledger calculations, and receipt deduplication).Type Check: Run cd server && npm run type-check.Mobile Tests: Run cd client && flutter test.