-- Migration number: 0003 	 2026-01-31T23:34:40.993Z
--
PRAGMA defer_foreign_keys = on;

CREATE TABLE IF NOT EXISTS users_copy (
  id TEXT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  verified BOOLEAN DEFAULT FALSE,
  profile_picture VARCHAR(255),
  role_id INTEGER DEFAULT 2,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (role_id) REFERENCES roles(id)
);

INSERT INTO users_copy (id, username, first_name, last_name, email, password_hash, verified, profile_picture, role_id)
SELECT id, username, first_name, last_name, email, password_hash, verified, profile_picture, role_id FROM users;
DROP TABLE users;
ALTER TABLE users_copy RENAME TO users;

PRAGMA defer_foreign_keys = off;

