-- Migration number: 0002 	 2026-01-31T21:14:59.139Z
PRAGMA defer_foreign_keys = on;

CREATE TABLE IF NOT EXISTS links_copy (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url VARCHAR(255) NOT NULL UNIQUE,
    short_url VARCHAR(255) NOT NULL,
    clicks INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO links_copy (id, url, short_url, clicks, created_at, user_id)
SELECT id, url, short_url, clicks, created_at, "331f6514-440e-4085-8119-fee1df8c6270" FROM links;
DROP TABLE links;
ALTER TABLE links_copy RENAME TO links;

PRAGMA defer_foreign_keys = off;
