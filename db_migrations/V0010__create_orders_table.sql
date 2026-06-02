CREATE TABLE t_p43817028_soft_furniture_store.orders (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    items JSONB NOT NULL,
    total_amount INTEGER NOT NULL,
    payment_status VARCHAR(50) DEFAULT 'pending',
    best2pay_order_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);