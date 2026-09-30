from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.vehicle import Vehicle
from app.schemas.vehicle import VehicleResponse

router = APIRouter(prefix="/vehicles", tags=["Vehicles"])


@router.get("", response_model=List[VehicleResponse])
def get_vehicles(db: Session = Depends(get_db)):
    """Fetch all CIT vehicles from database."""
    try:
        vehicles = db.query(Vehicle).order_by(Vehicle.id).all()
        return vehicles
    except Exception as e:
        raise HTTPException(
            status_code=503,
            detail=f"Database unavailable: {str(e)}",
        )
