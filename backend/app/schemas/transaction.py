from datetime import datetime
from pydantic import BaseModel, ConfigDict


class TransactionBase(BaseModel):
    atm_id: str
    timestamp: datetime
    withdrawal_amount: float = 0.0
    deposit_amount: float = 0.0
    cash_balance: float
    withdrawal_count: int = 1


class TransactionCreate(TransactionBase):
    pass


class TransactionResponse(TransactionBase):
    id: int

    model_config = ConfigDict(from_attributes=True)
