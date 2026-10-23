-- Per-group app header subtitle (shown under the group label in that
-- group's own header, src/beta/components/layout/Header.jsx). Edited
-- alongside the rest of a group's terminology in MasterEditForm.jsx --
-- unlike the site-wide title/login heading (site_settings), this one
-- differs per master's group.
ALTER TABLE group_settings ADD COLUMN IF NOT EXISTS app_subtitle TEXT DEFAULT 'Management Tool';
