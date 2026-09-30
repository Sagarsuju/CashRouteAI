from datetime import datetime, timezone
from sqlalchemy import Column, DateTime, Float, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from app.database.connection import Base


class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    atm_id = Column(String(50), ForeignKey("atms.atm_id", ondelete="CASCADE"), nullable=False, index=True)
    timestamp = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
        index=True,
    )
    withdrawal_amount = Column(Float, nullable=False, default=0.0)
    deposit_amount = Column(Float, nullable=False, default=0.0)
    cash_balance = Column(Float, nullable=False)
    withdrawal_count = Column(Integer, nullable=False, default=1)

    # Relationships
    atm = relationship("ATM", back_populates="transactions")
