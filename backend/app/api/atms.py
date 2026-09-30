from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.atm import ATM
from app.schemas.atm import ATMResponse

router = APIRouter(prefix="/atms", tags=["ATMs"])


@router.get("", response_model=List[ATMResponse])
def get_atms(db: Session = Depends(get_db)):
    """Fetch all ATMs from database."""
    try:
        atms = db.query(ATM).order_by(ATM.id).all()
        return atms
    except Exception as e:
        raise HTTPException(
            status_code=503,
            detail=f"Database unavailable: {str(e)}",
        )
