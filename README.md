# Pure Design System – Dashboard (Native APIs)

A single-page dashboard built to **explore [Pure Design System (PDS)](https://pureweb.dev/manifesto)** and **native browser APIs only**—no React, Vue, or other UI frameworks. The goal is to show that the browser is enough: PDS for design tokens and components, and standard Web APIs for behaviour.

**Features:** Home (stats + line chart), Inbox, Customers, Board (Kanban + drag-and-drop), Settings (General, Members, Notifications, Security), **login page** at `/login`, and a **theme override** (light + dark) loaded after PDS via `pds:ready`.

## Goals

- **Pure Design System**: Use PDS for layout, tokens, primitives, and web components (`pds-drawer`, `pds-tabstrip`, `pds-icon`, etc.) with no extra UI dependencies.
- **Native browser APIs**: Prefer built-in APIs over libraries:
  - **Navigation API** (with hash fallback) for routing
  - **Fetch** + **Cache API** (and in-memory fallback) for cached API calls
  - **Static imports** for page modules (single esbuild bundle, no chunk 404s)
  - **Web Speech API** (Speech Synthesis) for “Read aloud”
  - **Web Authentication API** (passkeys) for the demo button
  - **View Transitions API** for page changes
  - **HTML Drag and Drop** for the Board
  - **Canvas** for simple charts

## What’s in the project

| Area | Description |
|------|-------------|
| **Router** (`src/js/router.js`) | Hash-based routing using the [Navigation API](https://developer.mozilla.org/en-US/docs/Web/API/Navigation_API) when available, with `hashchange` fallback. Prevents re-running the same path to avoid loops (e.g. when `replaceState` is used by `pds-tabstrip`). |
| **Layout** (`src/js/layout.js`) | Sidebar (with collapsible Settings), toolbar (search, notifications, theme), and main outlet. Built with semantic HTML and PDS classes. |
| **Pages** (`src/js/pages/*.js`) | Home (stats + chart with hover tooltip), Inbox (mails), Customers (table), **Login** (`/login`), Settings (tabstrip: General, Members, Notifications, Security), Board (Kanban + drag-and-drop). Statically imported so the single esbuild bundle works without 404s. |
| **Cache** (`src/js/lib/fetch-cache.js`) | Cached `fetch` for `/api/*`: uses **Cache API** when available, otherwise an in-memory cache with TTL. The in-memory store is wrapped in a **[Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)** to count cache hits/misses without changing the public API. |
| **Charts** (`src/js/lib/chart.js`) | Simple line/bar charts using the **Canvas API**. |
| **Speech** (`src/js/lib/speech.js`) | **Web Speech API** (Speech Synthesis) for “Read aloud” on the Board, with priming and voice selection for better support across browsers. |
| **Components** | Command palette and notifications slideover built with `pds-drawer`; theme drawer with `pds-theme`. |
| **Theme** | `theme-override.css` overrides PDS tokens (light + `html[data-theme="dark"]`). Injected on **`pds:ready`** via `adoptedStyleSheets` so it wins over PDS `@layer` styles. |

## Running the project

```bash
pnpm install
pnpm dev
```

Then open the URL shown (e.g. `http://127.0.0.1:4173`). Use **`https://localhost:4173`** if you want to try the passkey (Web Authn) demo; many browsers require a secure context.

## Project structure

```
src/js/
  app.js           # Entry: PDS.start, layout, route registration, initRouter
  router.js        # Navigation API + hash routing, same-path guard
  layout.js        # Sidebar, toolbar, main outlet
  components/      # Command palette, notifications slideover
  pages/           # One module per route (dynamic import)
  lib/             # fetch-cache (with Proxy), chart, speech, animations, countries-data
public/
  api/             # Mock JSON (stats, mails, notifications, customers, members)
  assets/          # PDS (components, styles, icons), app.css, theme-override.css, built app.js
```

## Design choices

- **No external UI framework**: Only PDS and vanilla JS. Styling uses PDS tokens (e.g. `var(--spacing-4)`, `var(--color-surface-elevated)`) and utility classes from the ontology.
- **Hash routing**: Routes are `#/`, `#/inbox`, `#/board`, `#/settings/members`, etc., so the app works without a server that does HTML fallback.
- **Proxy for cache stats**: The in-memory fetch cache is wrapped in a `Proxy` so `get`/`set`/`clear` behave like a normal `Map`, while hit/miss counts are updated and exposed via `getCacheStats()`.
- **Single initial apply**: The router tracks the last applied path and skips re-running when the path is unchanged, avoiding infinite re-renders when components (e.g. `pds-tabstrip`) update the hash with `replaceState`.

## References

- [Pure Design System](https://pureweb.dev/) / [Pure Web Manifesto](https://pureweb.dev/manifesto)
- [Navigation API](https://developer.mozilla.org/en-US/docs/Web/API/Navigation_API)
- [Proxy (JavaScript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [Web Authentication API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API)
