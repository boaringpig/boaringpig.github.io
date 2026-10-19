# Beta Dashboard (React)

This is a from-scratch React rebuild of the authenticated app, running
**side by side** with the original vanilla-JS app in `../../js/`. It's an
opt-in beta: a master group only sees it if an admin has turned it on for
their group (see "Turning it on" below). Nothing here replaces or deletes
the classic UI - someone can always click "Exit beta" and go back.

This doc assumes you have **never used React before**. Read it top to
bottom once; after that you should be able to find your way around.

## The five-minute mental model

1. A **component** is a JavaScript function that returns some JSX (HTML-like
   syntax mixed into JS). React calls that function to produce the DOM.
2. A component **re-renders** (its function runs again) whenever its state
   changes - either its own `useState`, or a value it reads from a parent
   via props or Context.
3. **Hooks** are functions starting with `use` that let a plain function
   component have state (`useState`), run side effects like fetching data
   (`useEffect`), or read shared data (`useContext`, wrapped here as
   `useApp()`).
4. There is no page reload, ever. Every "navigation" in this app
   (`App.jsx`'s `activeTab` state) just swaps which component is rendered.

If a sentence below doesn't make sense, it's almost certainly explained by
one of those four points.

## Project structure

```
src/beta/
  main.jsx            entry point - mounts/unmounts the whole app
  App.jsx             layout shell + tab switching
  context/
    AppContext.jsx     "who am I, what group, what theme" - read with useApp()
  hooks/               one file per entity: fetch + realtime-subscribe + mutate
  components/
    layout/            Header, NavTabs
    common/            Button, Card, TextInput, Modal, Badge, EmptyState,
                        ErrorState, LoadingSpinner - the shared design system
    tasks/ suggestions/ rewards/ costTrackers/ dashboard/ admin/ calendar/
                        one folder per feature area, mirrors ../../js/ui-*.js
  styles/
    tokens.css          CSS variables (colors, spacing) - the theme lives here
    global.css          resets + mobile-first responsive base rules
  utils/
    taskStatus.js        shared label/tone helpers for task status badges
```

Every component `Foo.jsx` that needs styling has a sibling `Foo.module.css`.
Vite turns `import styles from "./Foo.module.css"` into an object of
auto-generated unique class names (`styles.card`, `styles.heading`, ...) so
styles never leak between components - no naming conventions to remember,
no global stylesheet to scroll through.

## Hybrid data flow: why mutations call into `js/`, not Supabase directly

This is the single most important thing to understand before changing
anything.

**Reads** (fetching a list, subscribing to live updates) happen entirely in
this React app's hooks (see `hooks/useRealtimeList.js`). They talk straight
to Supabase via `window.supabase` (the same client instance the classic app
already created in `js/database.js`).

**Writes** (create a task, approve a purchase, start a cost tracker, ...) go
through the *existing* functions in `js/database-*.js` - e.g.
`window.createTask(...)`, `window.approveTask(id)`,
`window.purchaseReward(id)`. Those functions already contain all the real
business logic (demerit penalty math, invoice totals, validation,
permission checks) and have been in production use. Re-implementing that
math here, separately, would mean two copies that will eventually disagree
with each other - a classic "two sources of truth" bug.

The loop closes itself: a write updates a row in Supabase -> every open tab
(classic or beta, master or slave) has a realtime subscription on that table
-> React's hook sees the change and re-renders. You never need to manually
refresh state after calling a mutation.

Three functions used to read straight from the classic HTML form's
`<input>` elements instead of taking parameters (`window.createTask`,
`window.submitTaskSuggestion`, `window.addNewPig` in
`js/database-tasks.js` / `js/database-suggestions.js` / `js/database-pigs.js`).
Those got a small, backward-compatible change: they now accept an optional
object of overrides that's used instead of the DOM read when provided.
Calling them with no arguments at all (the classic app's own call sites)
behaves exactly as before. If you add a new mutation and it also reads
straight from a DOM id, follow the same pattern rather than duplicating its
logic here.

A few things that "just work" from React with zero changes, because they
already operate on `document.body` rather than inside `#mainApp`:
`window.showNotification(...)`, `window.showConfirmModal(...)`,
`window.showAppealModal(...)`, `window.showEditSuggestionModal(...)`.

## Theming: per-group colors

Each master group has five admin-configurable colors, stored on the
`group_settings` table (`theme_bg`, `theme_card`, `theme_elevated`,
`theme_text_primary`, `theme_text_secondary` - see
`supabase-migration-beta-theme.sql`). `AppContext` reads them (via
`window.groupTheme`, loaded by `js/terminology.js`'s `loadGroupTerms`) and
`App.jsx` applies them as inline CSS variables on the root `.betaApp`
element:

```jsx
<div className="betaApp" style={{ "--color-bg": theme.bg, ... }}>
```

Every component's `.module.css` reads colors through `var(--color-bg)` etc.
(defined with fallback defaults in `styles/tokens.css`), never a hardcoded
hex value. That's the entire mechanism - no theming library, no CSS-in-JS.

Admins edit these colors from the "Masters" tab
(`components/admin/MasterEditForm.jsx`, admin-only) or, in the classic UI,
from the same "Edit Master" modal in `js/ui-admin.js`. Both call the same
underlying functions in `js/database-admin.js`, so there's one
implementation of "how a master's theme gets saved."

### WCAG contrast checklist

`js/contrast.js` implements the WCAG relative-luminance/contrast-ratio
formulas in plain JS (no framework dependency), used by both the classic and
React theme editors to show a live pass/fail readout
(`components/admin/ContrastChecklist.jsx`) as an admin picks colors.

Pre-computed for the built-in default palette:

| Text | Background | Ratio | Needs | Result |
|---|---|---|---|---|
| Primary `#fafafa` | Background `#09090b` | ~19.1:1 | 4.5:1 | Pass |
| Primary `#fafafa` | Card `#131316` | ~17.8:1 | 4.5:1 | Pass |
| Primary `#fafafa` | Elevated `#1a1a20` | ~16.6:1 | 4.5:1 | Pass |
| Secondary `#a1a1aa` | Background `#09090b` | ~7.8:1 | 4.5:1 | Pass |
| Secondary `#a1a1aa` | Card `#131316` | ~7.2:1 | 4.5:1 | Pass |
| Secondary `#a1a1aa` | Elevated `#1a1a20` | ~6.8:1 | 4.5:1 | Pass |

All six pairings clear the stricter 4.5:1 "normal text" threshold (so they
also clear the 3:1 "large text" one). If an admin picks custom colors, the
live checklist in the edit form will flag anything that drops below 4.5:1 -
nothing stops them from saving it anyway (it's their group to brand), but
the warning is visible before they do.

## The required interaction-state matrix

Every interactive component in `components/common/` explicitly defines:
**default -> hover -> focus-visible -> disabled -> loading** (where a
loading state applies), plus every list-fetching page has an explicit
**loading -> error -> empty -> populated** sequence
(`LoadingSpinner` / `ErrorState` / `EmptyState` / the real content). When you
build a new interactive element, start from `Button.jsx` / `Button.module.css`
as the reference implementation of the first matrix, and any `*Page.jsx`
file as the reference for the second.

`global.css` adds one rule that covers every button/input/select/textarea/
link app-wide: a visible focus ring on `:focus-visible` (keyboard
navigation) that mouse clicks don't trigger.

## Responsive approach

Mobile-first: unprefixed CSS rules target small screens, and `@media (min-
width: ...)` rules widen things for desktop (see `styles/global.css`'s
`.betaContainer` and `components/dashboard/DashboardPage.module.css`'s grid
for examples). Grids use `repeat(auto-fit, minmax(...))` / `auto-fill` so
cards reflow without a breakpoint for every screen size. The nav bar scrolls
horizontally rather than wrapping awkwardly on narrow phones.

## How to add a new tab/page

1. Add a folder under `components/<your-area>/` with a `<YourArea>Page.jsx`.
2. If it needs data, add a hook in `hooks/` following the pattern in
   `hooks/useSuggestions.js` (smallest example) - wrap `useRealtimeList` for
   reads, and thin wrapper functions around existing `window.*` mutations
   for writes.
3. Register the tab in `components/layout/NavTabs.jsx` (the `tabs` array)
   and in `App.jsx`'s `PageSwitch`.

## Deliberate scope decisions

- **Why no router library**: this app has a handful of tabs and no need for
  shareable deep links, so a plain `useState` in `App.jsx` is simpler to
  read than configuring a router. If deep links become a requirement later,
  swap `activeTab` state for a router of your choice - `PageSwitch` is
  already structured as the thing a router would replace.
- **Why an agenda list, not a calendar grid**: the classic app pulls in the
  FullCalendar library (several CSS/JS CDN scripts) for the Calendar tab.
  Adding that to the React bundle too would mean two copies of a heavy
  calendar dependency for one small feature, so the beta Calendar tab is a
  simple date-grouped list of tasks with due dates instead
  (`components/calendar/CalendarPage.jsx`).
- **The decorative Spiral Generator tool** (`js/spiral-integration.js`) is a
  novelty animation unrelated to the task/reward/admin domain and isn't
  ported here.
- **Browser support note**: a few `.module.css` files use the CSS
  `color-mix()` function for hover-state color tints (e.g.
  `Button.module.css`). It's supported in current Chrome/Firefox/Safari but
  not in older browsers - acceptable for an internal beta tool, but worth
  knowing if you ever need to support something older.

## Turning the beta on for a group (as an admin)

1. Run `supabase-migration-beta-theme.sql` (adds the theme/beta columns -
   see the repo root for this and the other pending migration).
2. Log in as an admin account, go to the "Masters" tab (classic or beta -
   both work), edit the group you want to opt in, tick "Enable React beta
   dashboard for this group", pick colors if you want something custom, and
   save.
3. Everyone in that group will see a "Try Beta Dashboard" button appear next
   to their user badge after their next login (or next page load if already
   logged in and the page re-runs `loadGroupTerms`).
