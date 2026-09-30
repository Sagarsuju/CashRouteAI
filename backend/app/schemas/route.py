from datetime import datetime
from typing import Any, Dict
from pydantic import BaseModel, ConfigDict


class RouteBase(BaseModel):
    vehicle_id: str
    route_data: Dict[str, Any] = {}
    total_distance_km: float = 0.0
    estimated_time_minutes: float = 0.0
    cash_required: float = 0.0
    status: str = "planned"


class RouteCreate(RouteBase):
    pass


class RouteResponse(RouteBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
