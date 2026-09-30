# CashRouteAI

CashRouteAI is an intraday ATM cash optimization and Cash-In-Transit (CIT) route planning system designed for financial logistics.

> **Status:** Project scaffolding & structure initialization phase. Placeholder structures created; core ML, optimization, database, and APIs are pending implementation.

---

## 1. What CashRouteAI Is

CashRouteAI addresses two critical inefficiencies in banking and ATM operations:
1. **Intraday ATM Cash Optimization:** Predicting cash depletion rates and optimizing replenishment schedules to minimize stockouts and idle cash holding costs.
2. **CIT Route Planning:** Generating cost-effective, secure, and time-window-compliant routes for Cash-In-Transit vehicles servicing ATM networks.

---

## 2. Current Architecture

CashRouteAI follows a clean, single-repository monolithic architecture:

```
CashRouteAI/
├── frontend/    → Next.js (App Router, TypeScript)
├── backend/     → FastAPI (Python application)
├── database/    → PostgreSQL (Schema & Seed migrations)
└── docs/        → Architecture and design specifications
```

---

## 3. Frontend Technology

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Target Pages:**
  - `/dashboard`: High-level operational overview & KPI metrics (Placeholder)
  - `/atms`: ATM status, cash levels, and health monitoring (Placeholder)
  - `/vehicles`: CIT fleet status, capacity, and dispatch info (Placeholder)
  - `/routes`: Route schedules and map visualization (Placeholder)
  - `/alerts`: Urgent cash-out and replenishment alerts (Placeholder)
- **Status:** Initial directory structure and minimal placeholder routes created.

---

## 4. Backend Technology

- **Framework:** FastAPI
- **Language:** Python
- **Current Endpoints:**
  - `GET /api/health`: Health check endpoint (`{"status": "ok", "service": "cashroute-ai"}`)
- **Status:** Minimal health check server initialized; domain APIs, services, and schemas are defined as placeholders.

---

## 5. Database

- **Database Engine:** PostgreSQL
- **Migrations/DDL:**
  - `database/schema.sql` (Placeholder)
  - `database/seed.sql` (Placeholder)
- **Status:** Schema and seed files initialized as placeholders; tables and relationships will be designed in the upcoming step.

---

## 6. Planned Machine Learning Component

- **Tooling:** Python, `scikit-learn`
- **Objective:** Intraday cash demand forecasting for ATM nodes based on historical withdrawal trends, day-of-week patterns, holidays, and localized events.
- **Status:** Pending implementation (scaffolded under `backend/ml/` and `backend/app/services/demand_prediction.py`).

---

## 7. Planned Route Optimization Component

- **Tooling:** Google OR-Tools
- **Objective:** Capacitated Vehicle Routing Problem with Time Windows (CVRPTW), safety scoring, and cash-limit constraints for CIT operations.
- **Status:** Pending implementation (scaffolded under `backend/app/services/route_optimizer.py`).

---

## Getting Started

### Backend Health Check
```bash
cd backend
python -m pip install -r requirements.txt
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000
```
Visit: `http://127.0.0.1:8000/api/health`
