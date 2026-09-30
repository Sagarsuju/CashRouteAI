from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict


class ATMBase(BaseModel):
    atm_id: str
    latitude: float
    longitude: float
    location: str
    cash_capacity: float
    current_cash: float
    status: str = "active"


class ATMCreate(ATMBase):
    pass


class ATMUpdate(BaseModel):
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    location: Optional[str] = None
    cash_capacity: Optional[float] = None
    current_cash: Optional[float] = None
    status: Optional[str] = None


class ATMResponse(ATMBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
