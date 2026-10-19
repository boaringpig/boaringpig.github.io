-- Beta React Dashboard Migration: per-group theme colors + the beta opt-in flag.
-- Run this AFTER supabase-migration-multitenancy.sql (it depends on the
-- group_settings table that migration creates). Additive and safe to run
-- against a live database.

ALTER TABLE group_settings ADD COLUMN IF NOT EXISTS beta_ui_enabled BOOLEAN DEFAULT false;

-- Defaults match the beta dashboard's built-in dark theme (already verified
-- against WCAG AA contrast requirements - see src/beta/README.md).
ALTER TABLE group_settings ADD COLUMN IF NOT EXISTS theme_bg TEXT DEFAULT '#09090b';
ALTER TABLE group_settings ADD COLUMN IF NOT EXISTS theme_card TEXT DEFAULT '#131316';
ALTER TABLE group_settings ADD COLUMN IF NOT EXISTS theme_elevated TEXT DEFAULT '#1a1a20';
ALTER TABLE group_settings ADD COLUMN IF NOT EXISTS theme_text_primary TEXT DEFAULT '#fafafa';
ALTER TABLE group_settings ADD COLUMN IF NOT EXISTS theme_text_secondary TEXT DEFAULT '#a1a1aa';
