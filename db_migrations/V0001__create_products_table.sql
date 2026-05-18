CREATE TABLE IF NOT EXISTS t_p43817028_soft_furniture_store.products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    price INTEGER NOT NULL,
    old_price INTEGER,
    img TEXT NOT NULL,
    tag VARCHAR(100),
    angle_type VARCHAR(50),
    fabric VARCHAR(100),
    description TEXT,
    specs JSONB DEFAULT '[]',
    colors JSONB DEFAULT '[]',
    images JSONB DEFAULT '[]',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);
