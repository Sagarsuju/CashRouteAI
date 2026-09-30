"""Seed script to populate PostgreSQL database with demo/simulated data.

Includes:
- 15 ATMs (2 high-risk, 1 medium-risk, 12 normal)
- 3 CIT vehicles
- 120+ historical cash transactions
- Operational risk alerts
"""
import random
from datetime import datetime, timedelta, timezone

from app.database.connection import SessionLocal, engine
from app.database.database import init_db
from app.models.alert import Alert
from app.models.atm import ATM
from app.models.transaction import Transaction
from app.models.vehicle import Vehicle


def seed_database():
    """Populate database with simulated dataset."""
    init_db()
    db = SessionLocal()

    try:
        # Check if already seeded
        if db.query(ATM).count() > 0:
            print("Database already contains ATM records. Clearing existing records for clean seed...")
            db.query(Alert).delete()
            db.query(Transaction).delete()
            db.query(ATM).delete()
            db.query(Vehicle).delete()
            db.commit()

        print("Seeding ATMs...")
        now = datetime.now(timezone.utc)

        # 15 ATMs: 2 high-risk, 1 medium-risk, 12 normal
        atms_data = [
            # High-risk ATMs (Critical cash depletion)
            {
                "atm_id": "ATM-001",
                "latitude": 40.712776,
                "longitude": -74.005974,
                "location": "Downtown Financial Hub - Wall Street",
                "cash_capacity": 200000.0,
                "current_cash": 12000.0,  # 6% -> High risk
                "status": "critical",
            },
            {
                "atm_id": "ATM-002",
                "latitude": 40.750568,
                "longitude": -73.993519,
                "location": "Metro Central Station - Penn Plaza",
                "cash_capacity": 250000.0,
                "current_cash": 18000.0,  # 7.2% -> High risk
                "status": "critical",
            },
            # Medium-risk ATM (Low cash)
            {
                "atm_id": "ATM-003",
                "latitude": 40.758896,
                "longitude": -73.985130,
                "location": "Times Square Shopping Arcade",
                "cash_capacity": 200000.0,
                "current_cash": 45000.0,  # 22.5% -> Medium risk
                "status": "low_cash",
            },
            # 12 Normal ATMs
            {
                "atm_id": "ATM-004",
                "latitude": 40.761421,
                "longitude": -73.977643,
                "location": "Midtown Avenue Business Tower",
                "cash_capacity": 200000.0,
                "current_cash": 140000.0,
                "status": "active",
            },
            {
                "atm_id": "ATM-005",
                "latitude": 40.782865,
                "longitude": -73.965355,
                "location": "Uptown Central Medical Center",
                "cash_capacity": 180000.0,
                "current_cash": 135000.0,
                "status": "active",
            },
            {
                "atm_id": "ATM-006",
                "latitude": 40.728157,
                "longitude": -73.994198,
                "location": "Greenwich Village University Campus",
                "cash_capacity": 150000.0,
                "current_cash": 110000.0,
                "status": "active",
            },
            {
                "atm_id": "ATM-007",
                "latitude": 40.706086,
                "longitude": -74.008851,
                "location": "Battery Park Ferry Terminal",
                "cash_capacity": 160000.0,
                "current_cash": 120000.0,
                "status": "active",
            },
            {
                "atm_id": "ATM-008",
                "latitude": 40.741895,
                "longitude": -73.989308,
                "location": "Flatiron Tech District",
                "cash_capacity": 220000.0,
                "current_cash": 170000.0,
                "status": "active",
            },
            {
                "atm_id": "ATM-009",
                "latitude": 40.752726,
                "longitude": -73.977229,
                "location": "Grand Central Concourse",
                "cash_capacity": 300000.0,
                "current_cash": 225000.0,
                "status": "active",
            },
            {
                "atm_id": "ATM-010",
                "latitude": 40.718096,
                "longitude": -73.988205,
                "location": "Lower East Side Market Plaza",
                "cash_capacity": 150000.0,
                "current_cash": 95000.0,
                "status": "active",
            },
            {
                "atm_id": "ATM-011",
                "latitude": 40.768561,
                "longitude": -73.982269,
                "location": "Columbus Circle Galleria",
                "cash_capacity": 250000.0,
                "current_cash": 180000.0,
                "status": "active",
            },
            {
                "atm_id": "ATM-012",
                "latitude": 40.735657,
                "longitude": -73.990425,
                "location": "Union Square Transit Point",
                "cash_capacity": 220000.0,
                "current_cash": 150000.0,
                "status": "active",
            },
            {
                "atm_id": "ATM-013",
                "latitude": 40.702758,
                "longitude": -73.987342,
                "location": "DUMBO Tech Walkway",
                "cash_capacity": 180000.0,
                "current_cash": 130000.0,
                "status": "active",
            },
            {
                "atm_id": "ATM-014",
                "latitude": 40.692532,
                "longitude": -73.987483,
                "location": "Downtown Brooklyn Civic Center",
                "cash_capacity": 200000.0,
                "current_cash": 145000.0,
                "status": "active",
            },
            {
                "atm_id": "ATM-015",
                "latitude": 40.714418,
                "longitude": -73.956322,
                "location": "Williamsburg Waterfront Complex",
                "cash_capacity": 180000.0,
                "current_cash": 125000.0,
                "status": "active",
            },
        ]

        atm_objects = []
        for a in atms_data:
            atm_obj = ATM(
                atm_id=a["atm_id"],
                latitude=a["latitude"],
                longitude=a["longitude"],
                location=a["location"],
                cash_capacity=a["cash_capacity"],
                current_cash=a["current_cash"],
                status=a["status"],
                created_at=now - timedelta(days=30),
                updated_at=now,
            )
            db.add(atm_obj)
            atm_objects.append(atm_obj)

        db.commit()
        print(f"Inserted {len(atm_objects)} ATMs.")

        print("Seeding CIT Vehicles...")
        # 3 CIT vehicles
        vehicles_data = [
            {
                "vehicle_id": "CIT-001",
                "latitude": 40.7128,
                "longitude": -74.0060,
                "cash_capacity": 1500000.0,
                "insurance_limit": 2000000.0,
                "cash_onboard": 450000.0,
                "status": "available",
            },
            {
                "vehicle_id": "CIT-002",
                "latitude": 40.7306,
                "longitude": -73.9352,
                "cash_capacity": 2000000.0,
                "insurance_limit": 2500000.0,
                "cash_onboard": 800000.0,
                "status": "en_route",
            },
            {
                "vehicle_id": "CIT-003",
                "latitude": 40.7589,
                "longitude": -73.9851,
                "cash_capacity": 1200000.0,
                "insurance_limit": 1500000.0,
                "cash_onboard": 0.0,
                "status": "available",
            },
        ]

        for v in vehicles_data:
            veh_obj = Vehicle(
                vehicle_id=v["vehicle_id"],
                latitude=v["latitude"],
                longitude=v["longitude"],
                cash_capacity=v["cash_capacity"],
                insurance_limit=v["insurance_limit"],
                cash_onboard=v["cash_onboard"],
                status=v["status"],
                created_at=now - timedelta(days=60),
                updated_at=now,
            )
            db.add(veh_obj)

        db.commit()
        print(f"Inserted {len(vehicles_data)} CIT vehicles.")

        print("Seeding Transactions (100+ simulated events)...")
        # Generate 120+ realistic transactions over the last 48 hours
        random.seed(42)
        transactions = []
        for atm_info in atms_data:
            aid = atm_info["atm_id"]
            is_critical = aid in ["ATM-001", "ATM-002"]
            is_medium = aid == "ATM-003"
            
            # Critical ATMs had much heavier transaction volume
            num_tx = 15 if is_critical else (10 if is_medium else 6)
            balance = atm_info["cash_capacity"]

            for i in range(num_tx):
                # Spread back across 48 hours
                tx_time = now - timedelta(hours=(num_tx - i) * 3 + random.randint(0, 50) / 60.0)
                
                withdrawal = random.choice([200.0, 500.0, 800.0, 1500.0, 2500.0, 4000.0])
                if is_critical:
                    withdrawal *= random.uniform(2.5, 4.0)
                elif is_medium:
                    withdrawal *= random.uniform(1.5, 2.5)

                balance = max(5000.0, balance - withdrawal)
                
                tx = Transaction(
                    atm_id=aid,
                    timestamp=tx_time,
                    withdrawal_amount=round(withdrawal, 2),
                    deposit_amount=0.0,
                    cash_balance=round(balance, 2),
                    withdrawal_count=random.randint(1, 4),
                )
                transactions.append(tx)
                db.add(tx)

        db.commit()
        print(f"Inserted {len(transactions)} transactions.")

        print("Seeding Alerts...")
        alerts_data = [
            Alert(
                atm_id="ATM-001",
                alert_type="stockout_imminent",
                severity="critical",
                message="Critical low cash remaining ($12,000 / 6%). Stockout predicted in < 90 mins.",
                created_at=now - timedelta(minutes=45),
                resolved=False,
            ),
            Alert(
                atm_id="ATM-002",
                alert_type="rapid_depletion",
                severity="critical",
                message="High withdrawal velocity detected ($18,000 / 7.2%). Immediate replenishment needed.",
                created_at=now - timedelta(minutes=30),
                resolved=False,
            ),
            Alert(
                atm_id="ATM-003",
                alert_type="low_cash_threshold",
                severity="medium",
                message="Current cash below 25% threshold ($45,000). Schedule replenishment route.",
                created_at=now - timedelta(hours=2),
                resolved=False,
            ),
        ]
        for alert in alerts_data:
            db.add(alert)

        db.commit()
        print(f"Inserted {len(alerts_data)} alerts.")
        print("Database seed completed successfully!")

    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    seed_database()
