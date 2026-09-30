from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict


class VehicleBase(BaseModel):
    vehicle_id: str
    latitude: float
    longitude: float
    cash_capacity: float
    insurance_limit: float
    cash_onboard: float = 0.0
    status: str = "available"


class VehicleCreate(VehicleBase):
    pass


class VehicleUpdate(BaseModel):
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    cash_capacity: Optional[float] = None
    insurance_limit: Optional[float] = None
    cash_onboard: Optional[float] = None
    status: Optional[str] = None


class VehicleResponse(VehicleBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
