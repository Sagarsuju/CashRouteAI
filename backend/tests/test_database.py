import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.database.connection import Base, get_db
from app.database.seed_data import seed_database
from app.main import app
from app.models.alert import Alert
from app.models.atm import ATM
from app.models.transaction import Transaction
from app.models.vehicle import Vehicle

# Setup isolated test database
TEST_DATABASE_URL = "sqlite:///./test_cashroute.db"
test_engine = create_engine(TEST_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)


def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db


@pytest.fixture(scope="module", autouse=True)
def setup_database():
    Base.metadata.create_all(bind=test_engine)
    # Seed data into test database
    db = TestingSessionLocal()
    from datetime import datetime, timezone, timedelta
    now = datetime.now(timezone.utc)
    
    # 15 ATMs
    atms_to_insert = [
        ATM(atm_id="ATM-001", latitude=40.712776, longitude=-74.005974, location="Downtown Financial Hub", cash_capacity=200000.0, current_cash=12000.0, status="critical"),
        ATM(atm_id="ATM-002", latitude=40.750568, longitude=-73.993519, location="Metro Central Station", cash_capacity=250000.0, current_cash=18000.0, status="critical"),
        ATM(atm_id="ATM-003", latitude=40.758896, longitude=-73.985130, location="Times Square Arcade", cash_capacity=200000.0, current_cash=45000.0, status="low_cash"),
    ]
    for i in range(4, 16):
        atms_to_insert.append(ATM(atm_id=f"ATM-{i:03d}", latitude=40.7 + i*0.005, longitude=-73.9 - i*0.005, location=f"Location {i}", cash_capacity=200000.0, current_cash=150000.0, status="active"))
    
    db.add_all(atms_to_insert)

    # 3 Vehicles
    vehicles_to_insert = [
        Vehicle(vehicle_id="CIT-001", latitude=40.7128, longitude=-74.0060, cash_capacity=1500000.0, insurance_limit=2000000.0, cash_onboard=450000.0, status="available"),
        Vehicle(vehicle_id="CIT-002", latitude=40.7306, longitude=-73.9352, cash_capacity=2000000.0, insurance_limit=2500000.0, cash_onboard=800000.0, status="en_route"),
        Vehicle(vehicle_id="CIT-003", latitude=40.7589, longitude=-73.9851, cash_capacity=1200000.0, insurance_limit=1500000.0, cash_onboard=0.0, status="available"),
    ]
    db.add_all(vehicles_to_insert)

    # 100+ Transactions
    txs = []
    for i in range(110):
        txs.append(Transaction(
            atm_id="ATM-001" if i % 2 == 0 else "ATM-002",
            timestamp=now - timedelta(hours=i),
            withdrawal_amount=500.0,
            deposit_amount=0.0,
            cash_balance=100000.0 - (i * 200),
            withdrawal_count=1,
        ))
    db.add_all(txs)
    db.commit()
    db.close()

    yield

    Base.metadata.drop_all(bind=test_engine)
    test_engine.dispose()
    import os
    if os.path.exists("test_cashroute.db"):
        try:
            os.remove("test_cashroute.db")
        except Exception:
            pass


def test_health():
    client = TestClient(app)
    res = client.get("/api/health")
    assert res.status_code == 200
    assert res.json() == {"status": "ok", "service": "cashroute-ai"}


def test_atms_endpoint():
    client = TestClient(app)
    res = client.get("/api/atms")
    assert res.status_code == 200
    data = res.json()
    assert len(data) == 15
    critical_atms = [a for a in data if a["status"] == "critical"]
    low_cash_atms = [a for a in data if a["status"] == "low_cash"]
    active_atms = [a for a in data if a["status"] == "active"]
    assert len(critical_atms) == 2
    assert len(low_cash_atms) == 1
    assert len(active_atms) == 12


def test_vehicles_endpoint():
    client = TestClient(app)
    res = client.get("/api/vehicles")
    assert res.status_code == 200
    data = res.json()
    assert len(data) == 3
    vehicle_ids = [v["vehicle_id"] for v in data]
    assert "CIT-001" in vehicle_ids
    assert "CIT-002" in vehicle_ids
    assert "CIT-003" in vehicle_ids


def test_transaction_count():
    db = TestingSessionLocal()
    try:
        tx_count = db.query(Transaction).count()
        assert tx_count >= 100
    finally:
        db.close()


def test_swagger_docs():
    client = TestClient(app)
    res = client.get("/docs")
    assert res.status_code == 200
    assert "Swagger UI" in res.text
