from datetime import datetime, timezone
from sqlalchemy import Column, DateTime, Float, ForeignKey, Integer, String, JSON
from sqlalchemy.orm import relationship
from app.database.connection import Base


class Route(Base):
    __tablename__ = "routes"

    id = Column(Integer, primary_key=True, index=True)
    vehicle_id = Column(String(50), ForeignKey("vehicles.vehicle_id", ondelete="CASCADE"), nullable=False, index=True)
    route_data = Column(JSON, nullable=False, default=dict)
    total_distance_km = Column(Float, nullable=False, default=0.0)
    estimated_time_minutes = Column(Float, nullable=False, default=0.0)
    cash_required = Column(Float, nullable=False, default=0.0)
    status = Column(String(50), nullable=False, default="planned", index=True)
    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )

    # Relationships
    vehicle = relationship("Vehicle", back_populates="routes")
