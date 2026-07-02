# Purple POS Desktop (Electron)

Windows desktop shell for Purple POS that **replaces QZ Tray**. The shell loads
the existing remote web app (`https://purplehere.com/pos`) unchanged and swaps
only the "browser → printer" transport layer for a native one.

Design single source of truth: [`/var/www/docs/DESKTOP_APP_DESIGN.md`](../docs/DESKTOP_APP_DESIGN.md).

## Core idea

- **Remote URL load** (design D1): never a local bundle. Same origin ⇒ IndexedDB,
  localStorage, cookies, socket.io, and the Service Worker all keep working
  exactly like the browser. Deploying the web app = updating the app UI.
- **Transparent QZ replacement** (D2): `window.__NATIVE_PRINT` (added in P1) lets
  `billPrint.js` delegate its QZ send functions to native IPC. When absent (a
  plain browser) the web app takes its existing QZ path — byte-for-byte identical.
- **Print structure unchanged** (D3, 🔒): the POS1 single-poller model, claims,
  dispatch order, and consolidated-ticket guards are all reused from the web app.
  Native only replaces *transport*.

## Develop

Requires Node 18+ and the ability to run a GUI (macOS/Windows/Linux desktop).

```bash
cd desktop-pos
npm install
npm run start:dev   # loads https://dev.purplehere.com/pos
npm run start       # loads https://purplehere.com/pos (production)
```

URL resolution (`src/config.js`):
- `PURPLE_POS_URL=<full url>` — explicit override
- `PURPLE_POS_ENV=dev|prod` — shorthand
- `--dev` CLI flag — same as dev
- default — production

## Layout

```
src/
  main.js         Electron main process (window, single-instance, crash recovery)
  preload.js      contextBridge (P0: __PURPLE_DESKTOP marker; P1: __NATIVE_PRINT)
  config.js       dev/prod URL + allowed-origin resolution
  windowState.js  position/size/maximized persistence
```

## Phases

- **P0** scaffold — remote load, single-instance, contextIsolation,
  backgroundThrottling:false, crash recovery, window-state restore. *(current)*
- **P1** native bridge + main-process printing (HTML pixel, LAN raw; winspool stub)
- **P2** `billPrint.js` cut-points (feature-detect branches only) — 🔒 gated
- **P3** shell completion (2nd-monitor customer display, auto-update, NSIS)
- **P4** store pilot (thefire POS1), coexisting with QZ

## Build (Windows installer)

```bash
npm run dist:win    # electron-builder NSIS -> release/
```
