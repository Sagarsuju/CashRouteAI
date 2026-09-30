from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict


class AlertBase(BaseModel):
    atm_id: Optional[str] = None
    vehicle_id: Optional[str] = None
    alert_type: str
    severity: str = "medium"
    message: str
    resolved: bool = False


class AlertCreate(AlertBase):
    pass


class AlertResponse(AlertBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
