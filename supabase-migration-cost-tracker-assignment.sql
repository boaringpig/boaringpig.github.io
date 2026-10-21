-- Cost trackers must always be assigned to one or more pigs (slaves), so a
-- running tracker only ever shows up on the dashboard of the pig(s) it's
-- actually for -- not broadcast to every slave in the group the way the
-- previous (unassigned) trackers effectively were.
--
-- A single array column is enough here (rather than a join table like
-- task_assignments) because there is only ever one running tracker per
-- group at a time (see stopAllActiveCostTrackers in
-- js/database-cost-trackers.js) and a tracker's assignment doesn't need
-- independent per-pig status tracking the way a shared task does.

ALTER TABLE active_cost_trackers ADD COLUMN IF NOT EXISTS assigned_to TEXT[];

CREATE INDEX IF NOT EXISTS idx_active_cost_trackers_assigned_to
	ON active_cost_trackers USING GIN (assigned_to);

-- Not NOT NULL: existing stopped/historical rows predate this column and
-- have no assignment on record. New rows are required to supply one at the
-- application layer (js/database-cost-trackers.js's startLiveCostTracker
-- rejects an empty/missing assignedTo before inserting).
