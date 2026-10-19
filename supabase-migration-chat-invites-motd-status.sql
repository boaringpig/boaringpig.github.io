-- Chat, Invites, MOTD, and Slave Status Message migration.
-- Additive only; safe to run against the live, already-seeded database.
-- No RLS: matches every other table in this schema (see supabase-migration*.sql) --
-- the app uses a single shared anon key with no Supabase Auth, so tenant
-- isolation is enforced client-side via master_username filters, not RLS.

-- 1. Per-master-group chatroom -------------------------------------------
CREATE TABLE IF NOT EXISTS chat_messages (
    id BIGSERIAL PRIMARY KEY,
    master_username TEXT REFERENCES users(username) NOT NULL,
    sender_username TEXT REFERENCES users(username) NOT NULL,
    body TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_chat_messages_master ON chat_messages(master_username, created_at DESC);

-- 2. Invite system -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS invites (
    id BIGSERIAL PRIMARY KEY,
    code TEXT UNIQUE NOT NULL,
    master_username TEXT REFERENCES users(username) NOT NULL,
    created_by TEXT REFERENCES users(username) NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'redeemed', 'revoked')),
    redeemed_by TEXT REFERENCES users(username),
    redeemed_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_invites_master ON invites(master_username);

-- 3. Message of the Day -------------------------------------------------------
CREATE TABLE IF NOT EXISTS motd_messages (
    id BIGSERIAL PRIMARY KEY,
    master_username TEXT REFERENCES users(username) NOT NULL,
    body TEXT NOT NULL,
    position INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_motd_messages_master ON motd_messages(master_username, position);

-- current_index is an array index into the ordered motd_messages list for
-- this master, not a message id -- deleting/reordering messages never needs
-- to touch this table, reads just do `index % messages.length`.
CREATE TABLE IF NOT EXISTS motd_state (
    master_username TEXT PRIMARY KEY REFERENCES users(username),
    current_index INTEGER NOT NULL DEFAULT 0,
    last_advanced_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Slave status message ------------------------------------------------------
-- Global per-slave (like display_name), not per-group: it's self-expression
-- tied to the person, and the common case is one group per slave anyway.
ALTER TABLE users ADD COLUMN IF NOT EXISTS status_message TEXT;
