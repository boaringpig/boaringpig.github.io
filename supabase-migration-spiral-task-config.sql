-- "Send as Task" on the Spiral Generator (src/beta/components/spiral/
-- SpiralTaskModal.jsx) created a `type: "spiral"` task with no actual
-- spiral config attached, so once assigned there was no way for the pig
-- to view the animation -- the task was just a bare checkbox. This column
-- stores that config (spirals/textSettings/globalSettings, same shape
-- saved_spirals.config already uses) on the task row itself, so the pig's
-- task list can render a "View Spiral" playback modal from it.
--
-- Quoted/camelCase to match the rest of the tasks table's existing
-- JS-facing columns (assignedTo, createdAt, isRepeating, ...), not the
-- snake_case convention used by tables added later.

ALTER TABLE tasks ADD COLUMN IF NOT EXISTS "spiralConfig" JSONB;
