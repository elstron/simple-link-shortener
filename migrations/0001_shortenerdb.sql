-- Migration number: 0001 	 2026-01-31T16:30:59.438Z
--

CREATE TABLE IF NOT EXISTS roles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(50) NOT NULL UNIQUE,
  description VARCHAR(255)
);

INSERT INTO roles (name, description) VALUES
('admin', 'Administrator with full access'),
('user', 'Regular user with limited access');

CREATE TABLE IF NOT EXISTS users  (
  id TEXT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(100) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  verified BOOLEAN DEFAULT FALSE,
  profile_picture VARCHAR(255),
  role_id INTEGER DEFAULT 2,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (role_id) REFERENCES roles(id)
);

INSERT INTO users (id, username, first_name, last_name, email, password_hash, verified, profile_picture, role_id)
VALUES
('331f6514-440e-4085-8119-fee1df8c6270', 'anonymous', 'John', 'Doe', 'anonymous@example.com', 'hashed_password_here', TRUE, 'https://example.com/profile_pictures/anonymous.png', 2);


PRAGMA defer_foreign_keys = on;

CREATE TABLE IF NOT EXISTS links_copy (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url VARCHAR(255) NOT NULL UNIQUE,
    short_url VARCHAR(255) NOT NULL,
    clicks INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO links_copy (id, url, short_url, clicks, created_at, user_id)
SELECT id, url, short_url, clicks, created_at, "331f6514-440e-4085-8119-fee1df8c6270" FROM links;
DROP TABLE links;
ALTER TABLE links_copy RENAME TO links;

PRAGMA defer_foreign_keys = off;
