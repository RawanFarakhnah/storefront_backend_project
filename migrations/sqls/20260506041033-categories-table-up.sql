/* SQL commands - CREATE CATEGORIES table */
CREATE TABLE categories (
 id SERIAL PRIMARY KEY,
 name VARCHAR(100) NOT NULL,
 description TEXT
);