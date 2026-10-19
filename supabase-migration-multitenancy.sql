-- Multi-Tenancy Migration: multiple masters, each with their own slave group,
-- an admin flag, and per-group terminology.
-- Run this once in the Supabase SQL editor. Additive and backfills from the
-- single existing master, so it's safe to run against the live, already-seeded
-- database created by supabase-migration.sql.

-- 1. Admin flag + account status on users
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;
ALTER TABLE users ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active';

-- 2. Per-master group settings (terminology + display label)
CREATE TABLE IF NOT EXISTS group_settings (
    master_username TEXT PRIMARY KEY REFERENCES users(username),
    group_label TEXT DEFAULT 'Household',
    master_label TEXT DEFAULT 'Master',
    master_label_plural TEXT DEFAULT 'Masters',
    slave_label TEXT DEFAULT 'pig',
    slave_label_plural TEXT DEFAULT 'pigs',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO group_settings (master_username)
SELECT username FROM users WHERE role = 'master'
ON CONFLICT (master_username) DO NOTHING;

-- 3. Add master_username to every tenant-owned table and backfill it from the
--    single master that exists today.
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS master_username TEXT REFERENCES users(username);
ALTER TABLE suggestions ADD COLUMN IF NOT EXISTS master_username TEXT REFERENCES users(username);
ALTER TABLE rewards ADD COLUMN IF NOT EXISTS master_username TEXT REFERENCES users(username);
ALTER TABLE "userRewardPurchases" ADD COLUMN IF NOT EXISTS master_username TEXT REFERENCES users(username);
ALTER TABLE active_cost_trackers ADD COLUMN IF NOT EXISTS master_username TEXT REFERENCES users(username);
ALTER TABLE "userActivity" ADD COLUMN IF NOT EXISTS master_username TEXT REFERENCES users(username);
ALTER TABLE task_assignments ADD COLUMN IF NOT EXISTS master_username TEXT REFERENCES users(username);
ALTER TABLE "userProfiles" ADD COLUMN IF NOT EXISTS master_username TEXT REFERENCES users(username);

DO $$
DECLARE
    single_master TEXT;
BEGIN
    SELECT username INTO single_master FROM users WHERE role = 'master' LIMIT 1;

    IF single_master IS NOT NULL THEN
        UPDATE tasks SET master_username = single_master WHERE master_username IS NULL;
        UPDATE suggestions SET master_username = single_master WHERE master_username IS NULL;
        UPDATE rewards SET master_username = single_master WHERE master_username IS NULL;
        UPDATE "userRewardPurchases" SET master_username = single_master WHERE master_username IS NULL;
        UPDATE active_cost_trackers SET master_username = single_master WHERE master_username IS NULL;
        UPDATE "userActivity" SET master_username = single_master WHERE master_username IS NULL;
        UPDATE task_assignments SET master_username = single_master WHERE master_username IS NULL;
        UPDATE "userProfiles" SET master_username = single_master WHERE master_username IS NULL;
    END IF;
END $$;

-- Enforce not-null now that backfill is done. Skip this for a table if you ever
-- have rows that legitimately couldn't be backfilled (e.g. no master existed yet).
ALTER TABLE tasks ALTER COLUMN master_username SET NOT NULL;
ALTER TABLE suggestions ALTER COLUMN master_username SET NOT NULL;
ALTER TABLE rewards ALTER COLUMN master_username SET NOT NULL;
ALTER TABLE "userRewardPurchases" ALTER COLUMN master_username SET NOT NULL;
ALTER TABLE active_cost_trackers ALTER COLUMN master_username SET NOT NULL;
ALTER TABLE "userActivity" ALTER COLUMN master_username SET NOT NULL;
ALTER TABLE task_assignments ALTER COLUMN master_username SET NOT NULL;
ALTER TABLE "userProfiles" ALTER COLUMN master_username SET NOT NULL;

-- 4. userProfiles: points become per (master, slave) instead of per slave, so a
--    slave shared across two masters has independent point totals in each group.
--    Drop whatever unique constraint currently sits on username alone (it was
--    the upsert onConflict target), then add the composite one.
DO $$
DECLARE
    old_constraint TEXT;
BEGIN
    SELECT con.conname INTO old_constraint
    FROM pg_constraint con
    JOIN pg_class rel ON rel.oid = con.conrelid
    JOIN pg_attribute att ON att.attrelid = con.conrelid AND att.attnum = con.conkey[1]
    WHERE rel.relname = 'userProfiles'
      AND con.contype IN ('u', 'p')
      AND array_length(con.conkey, 1) = 1
      AND att.attname = 'username';

    IF old_constraint IS NOT NULL THEN
        EXECUTE format('ALTER TABLE "userProfiles" DROP CONSTRAINT %I', old_constraint);
    END IF;
END $$;

ALTER TABLE "userProfiles" ADD CONSTRAINT "userProfiles_master_username_key" UNIQUE (master_username, username);

-- 5. rewardSystemSettings: one settings row per master instead of a single
--    hardcoded "system_settings" row. Backfill the existing row, then move the
--    primary key from id to master_username.
ALTER TABLE "rewardSystemSettings" ADD COLUMN IF NOT EXISTS master_username TEXT REFERENCES users(username);

DO $$
DECLARE
    single_master TEXT;
    old_pk TEXT;
BEGIN
    SELECT username INTO single_master FROM users WHERE role = 'master' LIMIT 1;

    IF single_master IS NOT NULL THEN
        UPDATE "rewardSystemSettings" SET master_username = single_master WHERE master_username IS NULL;
    END IF;

    SELECT con.conname INTO old_pk
    FROM pg_constraint con
    JOIN pg_class rel ON rel.oid = con.conrelid
    WHERE rel.relname = 'rewardSystemSettings' AND con.contype = 'p';

    IF old_pk IS NOT NULL THEN
        EXECUTE format('ALTER TABLE "rewardSystemSettings" DROP CONSTRAINT %I', old_pk);
    END IF;
END $$;

ALTER TABLE "rewardSystemSettings" ALTER COLUMN master_username SET NOT NULL;
ALTER TABLE "rewardSystemSettings" ADD CONSTRAINT "rewardSystemSettings_pkey" PRIMARY KEY (master_username);

-- 6. Indexes to keep the new per-tenant filters fast.
CREATE INDEX IF NOT EXISTS idx_tasks_master ON tasks(master_username);
CREATE INDEX IF NOT EXISTS idx_suggestions_master ON suggestions(master_username);
CREATE INDEX IF NOT EXISTS idx_rewards_master ON rewards(master_username);
CREATE INDEX IF NOT EXISTS idx_user_reward_purchases_master ON "userRewardPurchases"(master_username);
CREATE INDEX IF NOT EXISTS idx_active_cost_trackers_master ON active_cost_trackers(master_username);
CREATE INDEX IF NOT EXISTS idx_user_activity_master ON "userActivity"(master_username);
CREATE INDEX IF NOT EXISTS idx_task_assignments_master ON task_assignments(master_username);

-- 7. Bootstrap yourself as admin. Run this one manually with YOUR existing
--    master username (the single master row seeded by the original migration
--    was 'skeen' — double-check before running):
-- UPDATE users SET is_admin = true WHERE username = 'skeen';
