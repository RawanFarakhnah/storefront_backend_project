/* SQL commands - CREATE ORDERS table */
CREATE TABLE orders (
 id SERIAL PRIMARY KEY,
 status VARCHAR(20) CHECK (status IN ('active', 'complete')),
 created_at TIMESTAMP DEFAULT NOW(),
 user_id INTEGER NOT NULL,
 CONSTRAINT fk_orders_user
 FOREIGN KEY (user_id) REFERENCES users(id)
 ON DELETE CASCADE
);


CREATE TABLE orders_products (
 order_id INTEGER NOT NULL,
 product_id INTEGER NOT NULL,
 quantity INTEGER DEFAULT 1,
 PRIMARY KEY (order_id, product_id),
 
 CONSTRAINT fk_orders_products_order
 FOREIGN KEY (order_id) REFERENCES orders(id)
 ON DELETE CASCADE,

 CONSTRAINT fk_orders_products_product
 FOREIGN KEY (product_id) REFERENCES products(id)
 ON DELETE CASCADE
);