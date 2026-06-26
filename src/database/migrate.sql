-- ── Drop tables if they exist (for fresh setup) ──
DROP TABLE IF EXISTS budgets;
DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users;

-- ── Create tables ────────────────────────────────

CREATE TABLE users (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  email       VARCHAR(150) UNIQUE NOT NULL,
  password    VARCHAR(255),
  google_id   VARCHAR(255),
  created_at  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE categories (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  type        VARCHAR(10) NOT NULL CHECK (type IN ('income', 'expense')),
  icon        VARCHAR(50),
  is_default  BOOLEAN DEFAULT FALSE,
  user_id     INT REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE transactions (
  id            SERIAL PRIMARY KEY,
  title         VARCHAR(150) NOT NULL,
  amount        DECIMAL(10,2) NOT NULL,
  type          VARCHAR(10) NOT NULL CHECK (type IN ('income', 'expense')),
  date          DATE NOT NULL,
  notes         TEXT,
  user_id       INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category_id   INT REFERENCES categories(id) ON DELETE SET NULL,
  created_at    TIMESTAMP DEFAULT NOW()
);

CREATE TABLE budgets (
  id           SERIAL PRIMARY KEY,
  amount       DECIMAL(10,2) NOT NULL,
  month        INT NOT NULL CHECK (month BETWEEN 1 AND 12),
  year         INT NOT NULL,
  user_id      INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category_id  INT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  created_at   TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, category_id, month, year)
);

-- ── Insert default categories ─────────────────────

INSERT INTO categories (name, type, icon, is_default) VALUES
('Salary',     'income',  '💼', TRUE),
('Freelance',  'income',  '💻', TRUE),
('Investment', 'income',  '📈', TRUE),
('Food',       'expense', '🍔', TRUE),
('Transport',  'expense', '🚗', TRUE),
('Rent',       'expense', '🏠', TRUE),
('Shopping',   'expense', '🛍️', TRUE),
('Health',     'expense', '💊', TRUE),
('Education',  'expense', '📚', TRUE),
('Other',      'expense', '📦', TRUE);