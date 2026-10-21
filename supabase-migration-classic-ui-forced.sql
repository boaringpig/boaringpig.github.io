-- Flips the beta-dashboard default: beta is now the default experience for
-- every group. This column replaces beta_ui_enabled (left in place, unused,
-- rather than dropped). Semantics are inverted on purpose: true = force
-- this group to classic-only. Existing beta_ui_enabled values are not
-- migrated over -- every group starts fresh allowing beta, which is the
-- whole point of this change.
ALTER TABLE group_settings ADD COLUMN IF NOT EXISTS classic_ui_forced BOOLEAN DEFAULT false;
