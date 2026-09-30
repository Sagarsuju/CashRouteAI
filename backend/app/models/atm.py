from datetime import datetime, timezone
from sqlalchemy import Column, DateTime, Float, Integer, String
from sqlalchemy.orm import relationship
from app.database.connection import Base


class ATM(Base):
    __tablename__ = "atms"

    id = Column(Integer, primary_key=True, index=True)
    atm_id = Column(String(50), unique=True, nullable=False, index=True)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    location = Column(String(255), nullable=False)
    cash_capacity = Column(Float, nullable=False)
    current_cash = Column(Float, nullable=False)
    status = Column(String(50), nullable=False, default="active", index=True)
    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )
    updated_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
        nullable=False,
    )

    # Relationships
    transactions = relationship("Transaction", back_populates="atm", cascade="all, delete-orphan")
    alerts = relationship("Alert", back_populates="atm")
