/* SQL commands - CREATE PRODUCTS table */
CREATE TABLE products (
 id SERIAL PRIMARY KEY,
 name VARCHAR(100) NOT NULL,
 price INTEGER NOT NULL,
 created_at TIMESTAMP DEFAULT NOW(),
 category_id INTEGER NULL,
 CONSTRAINT fk_products_category
 FOREIGN KEY (category_id) REFERENCES categories(id)
 ON DELETE SET NULL
);