# Beta Dashboard (React)

This is a from-scratch React rebuild of the authenticated app, and is now
the **only** authenticated UI - classic's view markup (every tab, the two
tool modals) was removed once this had full feature parity. `../../js/`
still exists and still runs, but only for: the login/invite-signup screen
(before this app ever mounts), bootstrapping/auth/realtime-sync
(`js/core/`), and as the home for every mutation this app's hooks call by
name (see "Hybrid data flow" below) - there's no classic rendering left
for any of it to feed.

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
                        one folder per feature area
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
already created in `js/core/database.js`).

**Writes** (create a task, approve a purchase, start a cost tracker, ...) go
through the *existing* functions in `js/database-*.js` - e.g.
`window.createTask(...)`, `window.approveTask(id)`,
`window.purchaseReward(id)`. Those functions already contain all the real
business logic (demerit penalty math, invoice totals, validation,
permission checks) and have been in production use. Re-implementing that
math here, separately, would mean two copies that will eventually disagree
with each other - a classic "two sources of truth" bug.

The loop is *meant* to close itself: a write updates a row in Supabase ->
every open tab has a realtime subscription on that table -> React's hook
sees the change and re-renders. In practice, this Supabase project's
`supabase_realtime` publication is empty (confirmed via
`SELECT tablename FROM pg_publication_tables WHERE pubname = 'supabase_realtime'`
returning zero rows) - a project/dashboard setting, not something any
migration or client code sets up - so no table's `postgres_changes` events
ever reach any client. Until that's fixed server-side, don't rely on the
subscription alone: either have the mutation's own hook call `reload()`
after it resolves (see `useCostTrackers.js`), or add a polling fallback
alongside the subscription (see `useChat.js`'s `setInterval`).

Three functions were originally written to read straight from the classic
HTML form's `<input>` elements instead of taking parameters
(`window.createTask`, `window.submitTaskSuggestion`, `window.addNewPig` in
`js/tasks/database-tasks.js` / `js/suggestions/database-suggestions.js` /
`js/admin/database-pigs.js`). Each accepts an optional object of overrides
used instead of the DOM read when provided - this React app is now the
only caller of all three, always passing one. The DOM-read branch is dead
code at this point (nothing left calls these with no arguments), kept only
because removing it is a separate, lower-value cleanup from retiring the
view markup that used to call it. If you add a new mutation and it reads
straight from a DOM id, don't follow that old pattern - just take
parameters.

A few things that "just work" from React with zero changes, because they
build their own `document.body`-appended markup rather than depending on
any classic view markup: `window.showNotification(...)`,
`window.showConfirmModal(...)`, `window.showAppealModal(...)`,
`window.showEditSuggestionModal(...)`.

## Theming: per-group colors

Each master group has five admin-configurable colors, stored on the
`group_settings` table (`theme_bg`, `theme_card`, `theme_elevated`,
`theme_text_primary`, `theme_text_secondary` - see
`supabase-migration-beta-theme.sql`). `AppContext` reads them (via
`window.groupTheme`, loaded by `js/theming/terminology.js`'s `loadGroupTerms`)
and `App.jsx` applies them as inline CSS variables on the root `.betaApp`
element:

```jsx
<div className="betaApp" style={{ "--color-bg": theme.bg, ... }}>
```

Every component's `.module.css` reads colors through `var(--color-bg)` etc.
(defined with fallback defaults in `styles/tokens.css`), never a hardcoded
hex value. That's the entire mechanism - no theming library, no CSS-in-JS.

Admins edit these colors from the "Masters" tab
(`components/admin/MasterEditForm.jsx`, admin-only), which calls the
underlying save functions in `js/admin/database-admin.js`.

### WCAG contrast checklist

`js/theming/contrast.js` implements the WCAG relative-luminance/contrast-ratio
formulas in plain JS (no framework dependency), used by the theme editor to
show a live pass/fail readout (`components/admin/ContrastChecklist.jsx`) as
an admin picks colors.

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
- **Why the Calendar tab uses `window.FullCalendar`/`window.rrule` instead of
  an npm package**: those libraries are already loaded once as global
  `<script>` tags in `index.html` (FullCalendar core + daygrid/timegrid/list
  plugins, RRule). `CalendarPage.jsx` references the globals directly
  (`new window.FullCalendar.Calendar(...)`) rather than adding
  `@fullcalendar/react` as a bundle dependency, so there's only ever one
  copy of a fairly heavy calendar library on the page. Note the rrule CDN
  script's UMD global is `window.rrule` (lowercase) with `RRule` as a
  property on it, not a bare `window.RRule`.
- **Browser support note**: a few `.module.css` files use the CSS
  `color-mix()` function for hover-state color tints (e.g.
  `Button.module.css`). It's supported in current Chrome/Firefox/Safari but
  not in older browsers - acceptable for an internal beta tool, but worth
  knowing if you ever need to support something older.
