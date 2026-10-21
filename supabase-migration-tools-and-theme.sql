-- Saved spiral configs and cost-tracker presets (reusable libraries owned
-- by a master), plus light-mode variants of the 5 existing per-group dark
-- colors (theme_bg/theme_card/theme_elevated/theme_text_primary/
-- theme_text_secondary, added in supabase-migration-beta-theme.sql).
-- Additive only; safe to run against the live, already-seeded database.

CREATE TABLE IF NOT EXISTS saved_spirals (
    id BIGSERIAL PRIMARY KEY,
    master_username TEXT REFERENCES users(username) NOT NULL,
    created_by TEXT REFERENCES users(username) NOT NULL,
    name TEXT NOT NULL,
    config JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_saved_spirals_master ON saved_spirals(master_username);

CREATE TABLE IF NOT EXISTS saved_cost_tracker_presets (
    id BIGSERIAL PRIMARY KEY,
    master_username TEXT REFERENCES users(username) NOT NULL,
    created_by TEXT REFERENCES users(username) NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    rate NUMERIC NOT NULL DEFAULT 50,
    currency TEXT NOT NULL DEFAULT '€',
    increment_interval INTEGER NOT NULL DEFAULT 60000,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_cost_tracker_presets_master ON saved_cost_tracker_presets(master_username);

ALTER TABLE group_settings ADD COLUMN IF NOT EXISTS theme_bg_light TEXT DEFAULT '#ffffff';
ALTER TABLE group_settings ADD COLUMN IF NOT EXISTS theme_card_light TEXT DEFAULT '#f4f4f5';
ALTER TABLE group_settings ADD COLUMN IF NOT EXISTS theme_elevated_light TEXT DEFAULT '#e4e4e7';
ALTER TABLE group_settings ADD COLUMN IF NOT EXISTS theme_text_primary_light TEXT DEFAULT '#18181b';
ALTER TABLE group_settings ADD COLUMN IF NOT EXISTS theme_text_secondary_light TEXT DEFAULT '#52525b';
