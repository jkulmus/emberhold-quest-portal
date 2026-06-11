CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL,
    role_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role_id INTEGER REFERENCES roles(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS quests (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    difficulty VARCHAR(50) NOT NULL,
    reward VARCHAR(150),
    duration_minutes INTEGER,
    max_party_size INTEGER,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO roles (role_name, role_description)
VALUES
    ('user', 'Standard guild member'),
    ('staff', 'Guild staff member who manages reservations'),
    ('admin', 'Guild master with full system access')
ON CONFLICT (role_name) DO NOTHING;

INSERT INTO quests (
    title,
    description,
    difficulty,
    reward,
    duration_minutes,
    max_party_size
)
VALUES
(
    'The Ember Trial',
    'Recover a lost emberstone from the old watchtower and prove your worth to the guild',
    'Beginner',
    'Guild Recognition',
    60,
    6
),
(
    'The Dragon''s Ledger',
    'Track down a missing merchant ledger rumored to be hidden near a dragon''s resting place',
    'Intermediate',
    'Merchant Favor',
    90,
    8
),
(
    'The Ashen Crown',
    'Venture into the ruins beyond Emberhold and recover the legendary Ashen Crown',
    'Advanced',
    'Royal Commendation',
    120,
    5
)
ON CONFLICT (title) DO NOTHING;