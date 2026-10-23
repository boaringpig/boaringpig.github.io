-- Site-wide branding strings (page title, login heading). Unlike
-- group_settings (one row per master, used once a group is known), these
-- show before any user has logged in -- there's no group context yet to
-- key off of -- so this is a single shared row, admin-only to edit (see
-- src/beta/components/admin/SiteSettingsForm.jsx, on the admin-only
-- Masters tab).
CREATE TABLE IF NOT EXISTS site_settings (
	id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
	page_title TEXT DEFAULT 'TPF - Management Tool',
	login_heading TEXT DEFAULT 'Management Tool Login',
	updated_at TIMESTAMPTZ DEFAULT now(),
	updated_by TEXT
);

INSERT INTO site_settings (id, page_title, login_heading)
VALUES (1, 'TPF - Management Tool', 'Management Tool Login')
ON CONFLICT (id) DO NOTHING;
