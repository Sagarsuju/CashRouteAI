from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.atms import router as atms_router
from app.api.vehicles import router as vehicles_router

from contextlib import asynccontextmanager
from app.database.database import init_db

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Ensure tables are created on startup if database is accessible
    try:
        init_db()
        print("Database tables initialized successfully.")
    except Exception as e:
        print(f"Warning: Could not connect to database on startup: {e}")
    yield

app = FastAPI(
    title="CashRouteAI Backend",
    description="Intraday ATM cash optimization and CIT route planning system API",
    version="0.1.0",
    lifespan=lifespan,
)

# Enable CORS for frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health_check():
    return {
        "status": "ok",
        "service": "cashroute-ai",
    }


# Include API Routers
app.include_router(atms_router, prefix="/api")
app.include_router(vehicles_router, prefix="/api")
