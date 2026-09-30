"""Cash demand prediction endpoints (Placeholder).

Will handle intraday cash withdrawal forecast triggers and predictions per ATM.
"""
from fastapi import APIRouter

router = APIRouter(prefix="/prediction", tags=["Prediction"])
