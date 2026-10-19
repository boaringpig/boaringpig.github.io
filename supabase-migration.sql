-- Multi-Pig Migration Script
-- Run this in Supabase SQL Editor BEFORE deploying the new code.

-- 1. Add columns to existing tables
ALTER TABLE users ADD COLUMN IF NOT EXISTS display_name TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'slave';
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS assignment_mode TEXT DEFAULT 'individual';

-- 2. Set existing user roles
UPDATE users SET role = 'master', display_name = 'Sir' WHERE username = 'skeen';
UPDATE users SET role = 'slave', display_name = 'Pig' WHERE username = 'schinken';

-- 3. Create master_slave_relationships table
CREATE TABLE IF NOT EXISTS master_slave_relationships (
    id SERIAL PRIMARY KEY,
    master_username TEXT NOT NULL,
    slave_username TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    status TEXT DEFAULT 'active',
    UNIQUE(master_username, slave_username)
);

-- 4. Seed existing relationship
INSERT INTO master_slave_relationships (master_username, slave_username, status)
VALUES ('skeen', 'schinken', 'active')
ON CONFLICT (master_username, slave_username) DO NOTHING;

-- 5. Create task_assignments table (for shared tasks)
CREATE TABLE IF NOT EXISTS task_assignments (
    id SERIAL PRIMARY KEY,
    task_id INTEGER NOT NULL,
    assigned_to TEXT NOT NULL,
    status TEXT DEFAULT 'todo',
    completed_at TIMESTAMPTZ,
    completed_by TEXT,
    UNIQUE(task_id, assigned_to)
);

-- 6. Enable Realtime on new tables
-- NOTE: You must also enable Realtime for these tables in the Supabase Dashboard:
--   Database > Replication > Enable for: master_slave_relationships, task_assignments
