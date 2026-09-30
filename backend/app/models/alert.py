from datetime import datetime, timezone
from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship
from app.database.connection import Base


class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True)
    atm_id = Column(String(50), ForeignKey("atms.atm_id", ondelete="SET NULL"), nullable=True, index=True)
    vehicle_id = Column(String(50), ForeignKey("vehicles.vehicle_id", ondelete="SET NULL"), nullable=True, index=True)
    alert_type = Column(String(100), nullable=False)
    severity = Column(String(50), nullable=False, default="medium", index=True)
    message = Column(Text, nullable=False)
    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )
    resolved = Column(Boolean, nullable=False, default=False, index=True)

    # Relationships
    atm = relationship("ATM", back_populates="alerts")
    vehicle = relationship("Vehicle", back_populates="alerts")
