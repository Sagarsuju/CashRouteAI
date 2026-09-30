-- CashRouteAI Database Schema (PostgreSQL)

-- Drop existing tables in reverse dependency order
DROP TABLE IF EXISTS alerts CASCADE;
DROP TABLE IF EXISTS routes CASCADE;
DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS vehicles CASCADE;
DROP TABLE IF EXISTS atms CASCADE;

-- 1. ATMs Table
CREATE TABLE atms (
    id SERIAL PRIMARY KEY,
    atm_id VARCHAR(50) UNIQUE NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    location VARCHAR(255) NOT NULL,
    cash_capacity DOUBLE PRECISION NOT NULL,
    current_cash DOUBLE PRECISION NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_atms_atm_id ON atms(atm_id);
CREATE INDEX idx_atms_status ON atms(status);

-- 2. Vehicles Table (CIT Fleet)
CREATE TABLE vehicles (
    id SERIAL PRIMARY KEY,
    vehicle_id VARCHAR(50) UNIQUE NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    cash_capacity DOUBLE PRECISION NOT NULL,
    insurance_limit DOUBLE PRECISION NOT NULL,
    cash_onboard DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    status VARCHAR(50) NOT NULL DEFAULT 'available',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_vehicles_vehicle_id ON vehicles(vehicle_id);
CREATE INDEX idx_vehicles_status ON vehicles(status);

-- 3. Transactions Table (ATM Cash Events)
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    atm_id VARCHAR(50) NOT NULL REFERENCES atms(atm_id) ON DELETE CASCADE,
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    withdrawal_amount DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    deposit_amount DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    cash_balance DOUBLE PRECISION NOT NULL,
    withdrawal_count INTEGER NOT NULL DEFAULT 1
);

CREATE INDEX idx_transactions_atm_id ON transactions(atm_id);
CREATE INDEX idx_transactions_timestamp ON transactions(timestamp);

-- 4. Routes Table (CIT Routing Plans)
CREATE TABLE routes (
    id SERIAL PRIMARY KEY,
    vehicle_id VARCHAR(50) NOT NULL REFERENCES vehicles(vehicle_id) ON DELETE CASCADE,
    route_data JSONB NOT NULL DEFAULT '{}'::jsonb,
    total_distance_km DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    estimated_time_minutes DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    cash_required DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    status VARCHAR(50) NOT NULL DEFAULT 'planned',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_routes_vehicle_id ON routes(vehicle_id);
CREATE INDEX idx_routes_status ON routes(status);

-- 5. Alerts Table (Operational and Risk Alerts)
CREATE TABLE alerts (
    id SERIAL PRIMARY KEY,
    atm_id VARCHAR(50) REFERENCES atms(atm_id) ON DELETE SET NULL,
    vehicle_id VARCHAR(50) REFERENCES vehicles(vehicle_id) ON DELETE SET NULL,
    alert_type VARCHAR(100) NOT NULL,
    severity VARCHAR(50) NOT NULL DEFAULT 'medium',
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    resolved BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE INDEX idx_alerts_atm_id ON alerts(atm_id);
CREATE INDEX idx_alerts_severity ON alerts(severity);
CREATE INDEX idx_alerts_resolved ON alerts(resolved);
