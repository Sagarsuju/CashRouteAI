-- CashRouteAI Database Seed Data (PostgreSQL)

-- 1. Insert 15 ATMs (2 high-risk, 1 medium-risk, 12 normal)
INSERT INTO atms (atm_id, latitude, longitude, location, cash_capacity, current_cash, status) VALUES
('ATM-001', 40.712776, -74.005974, 'Downtown Financial Hub - Wall Street', 200000.0, 12000.0, 'critical'),
('ATM-002', 40.750568, -73.993519, 'Metro Central Station - Penn Plaza', 250000.0, 18000.0, 'critical'),
('ATM-003', 40.758896, -73.985130, 'Times Square Shopping Arcade', 200000.0, 45000.0, 'low_cash'),
('ATM-004', 40.761421, -73.977643, 'Midtown Avenue Business Tower', 200000.0, 140000.0, 'active'),
('ATM-005', 40.782865, -73.965355, 'Uptown Central Medical Center', 180000.0, 135000.0, 'active'),
('ATM-006', 40.728157, -73.994198, 'Greenwich Village University Campus', 150000.0, 110000.0, 'active'),
('ATM-007', 40.706086, -74.008851, 'Battery Park Ferry Terminal', 160000.0, 120000.0, 'active'),
('ATM-008', 40.741895, -73.989308, 'Flatiron Tech District', 220000.0, 170000.0, 'active'),
('ATM-009', 40.752726, -73.977229, 'Grand Central Concourse', 300000.0, 225000.0, 'active'),
('ATM-010', 40.718096, -73.988205, 'Lower East Side Market Plaza', 150000.0, 95000.0, 'active'),
('ATM-011', 40.768561, -73.982269, 'Columbus Circle Galleria', 250000.0, 180000.0, 'active'),
('ATM-012', 40.735657, -73.990425, 'Union Square Transit Point', 220000.0, 150000.0, 'active'),
('ATM-013', 40.702758, -73.987342, 'DUMBO Tech Walkway', 180000.0, 130000.0, 'active'),
('ATM-014', 40.692532, -73.987483, 'Downtown Brooklyn Civic Center', 200000.0, 145000.0, 'active'),
('ATM-015', 40.714418, -73.956322, 'Williamsburg Waterfront Complex', 180000.0, 125000.0, 'active');

-- 2. Insert 3 CIT Vehicles
INSERT INTO vehicles (vehicle_id, latitude, longitude, cash_capacity, insurance_limit, cash_onboard, status) VALUES
('CIT-001', 40.7128, -74.0060, 1500000.0, 2000000.0, 450000.0, 'available'),
('CIT-002', 40.7306, -73.9352, 2000000.0, 2500000.0, 800000.0, 'en_route'),
('CIT-003', 40.7589, -73.9851, 1200000.0, 1500000.0, 0.0, 'available');

-- 3. Insert Risk Alerts
INSERT INTO alerts (atm_id, alert_type, severity, message, resolved) VALUES
('ATM-001', 'stockout_imminent', 'critical', 'Critical low cash remaining ($12,000 / 6%). Stockout predicted in < 90 mins.', FALSE),
('ATM-002', 'rapid_depletion', 'critical', 'High withdrawal velocity detected ($18,000 / 7.2%). Immediate replenishment needed.', FALSE),
('ATM-003', 'low_cash_threshold', 'medium', 'Current cash below 25% threshold ($45,000). Schedule replenishment route.', FALSE);
