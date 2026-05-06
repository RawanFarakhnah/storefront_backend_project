/* SQL commands - CREATE USERS table */
CREATE TABLE users (
 id SERIAL PRIMARY KEY,
 firstName VARCHAR(100),
 lastName VARCHAR(100),
 password_digest VARCHAR(250) NOT NULL,
 created_at TIMESTAMP DEFAULT NOW()
);