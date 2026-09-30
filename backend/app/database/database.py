"""Database initialization and session utilities."""
from app.database.connection import Base, SessionLocal, engine, get_db


def init_db():
    """Create all database tables based on declarative models if connection succeeds."""
    from app import models  # noqa: F401 - ensure models are registered
    from sqlalchemy import text
    with engine.connect() as conn:
        conn.execute(text("SELECT 1"))
    Base.metadata.create_all(bind=engine)
