'use strict';

const path = require('path');
const { app, BrowserWindow, Menu, shell, ipcMain, globalShortcut, screen, powerSaveBlocker } = require('electron');
const { resolveAppUrl, allowedOrigins } = require('./config');
const windowState = require('./windowState');
const nativePrint = require('./print');
const updater = require('./updater');

// The web app opens the customer display via window.open(url, this name, ...).
// We intercept it to place the window fullscreen on a second monitor (§6-4).
const CUSTOMER_DISPLAY_FRAME = 'PurpleHereCustomerDisplay';

let _powerBlockerId = null;

const APP_URL = resolveAppUrl();
const ALLOWED = allowedOrigins();

// §6-5: prevent a second instance — a duplicate window means a duplicate
// auto-print poller, which means duplicate kitchen tickets. This is a hard
// requirement, not an optimization.
const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  app.quit();
}

let mainWindow = null;
let diagWindow = null;

// P1 diagnostics window — a LOCAL page (no web-app contact) that exercises the
// native print bridge directly. Opened via Ctrl+Shift+D. This is the "bridge
// self-test UI" from design §7 (P1 completion criteria).
function openDiagnostics() {
  if (diagWindow && !diagWindow.isDestroyed()) {
    diagWindow.focus();
    return;
  }
  diagWindow = new BrowserWindow({
    width: 720,
    height: 640,
    title: 'Purple POS — Print Diagnostics',
    webPreferences: {
      preload: path.join(__dirname, 'diagnostics', 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  diagWindow.setMenuBarVisibility(false);
  diagWindow.loadFile(path.join(__dirname, 'diagnostics', 'index.html'));
  diagWindow.on('closed', () => { diagWindow = null; });
}

function originOf(url) {
  try {
    return new URL(url).origin;
  } catch (_) {
    return null;
  }
}

function isInternal(url) {
  return ALLOWED.has(originOf(url));
}

function createMainWindow() {
  // First launch has no saved state → start maximized (POS standard is a
  // full-screen workspace, not a small floating window). Later launches restore
  // whatever size/maximized state the operator last left it at.
  const { bounds, maximized } = windowState.restoreBounds('main', {
    x: undefined,
    y: undefined,
    width: 1280,
    height: 800,
    maximized: true
  });

  mainWindow = new BrowserWindow({
    x: bounds.x,
    y: bounds.y,
    width: bounds.width,
    height: bounds.height,
    minWidth: 1024,
    minHeight: 600,
    show: false,
    backgroundColor: '#ffffff',
    title: 'Purple POS',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
      // §6-5 / §1: keep timers (the print poller) running at full speed even
      // when the window is minimized or the machine is idle.
      backgroundThrottling: false
    }
  });

  windowState.track('main', mainWindow);

  mainWindow.once('ready-to-show', () => {
    if (maximized) mainWindow.maximize();
    mainWindow.show();
  });

  // External navigation: keep the shell pinned to our origin. Anything else
  // (payment provider, external links) opens in the system browser (§6-5).
  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (!isInternal(url)) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });

  mainWindow.webContents.setWindowOpenHandler(({ url, frameName }) => {
    // Customer display: open fullscreen on a second monitor if one exists (§6-4).
    if (frameName === CUSTOMER_DISPLAY_FRAME) {
      const primary = screen.getPrimaryDisplay();
      const external = screen.getAllDisplays().find((d) => d.id !== primary.id) || primary;
      const b = external.bounds;
      return {
        action: 'allow',
        overrideBrowserWindowOptions: {
          x: b.x,
          y: b.y,
          width: b.width,
          height: b.height,
          fullscreen: external.id !== primary.id, // fullscreen only on the 2nd screen
          autoHideMenuBar: true,
          backgroundColor: '#000000',
          webPreferences: { contextIsolation: true, nodeIntegration: false }
        }
      };
    }
    // Other internal window.open -> allow as a normal window.
    if (isInternal(url) || url.startsWith('about:blank')) {
      return { action: 'allow' };
    }
    // External links -> system browser.
    shell.openExternal(url);
    return { action: 'deny' };
  });

  // Crash / white-screen recovery (§6-5).
  mainWindow.webContents.on('render-process-gone', (_event, details) => {
    console.error('[main] render-process-gone:', details.reason);
    if (!mainWindow.isDestroyed()) {
      mainWindow.reload();
    }
  });

  mainWindow.webContents.on('unresponsive', () => {
    console.warn('[main] renderer unresponsive');
  });

  mainWindow.webContents.on('did-fail-load', (_e, errorCode, errorDesc, validatedURL, isMainFrame) => {
    // Network hiccup on the initial/remote load — retry the main frame so the
    // store isn't left on a blank screen if wifi blips during startup.
    if (isMainFrame && errorCode !== -3 /* not ERR_ABORTED */) {
      console.warn(`[main] did-fail-load ${errorCode} ${errorDesc} ${validatedURL} — retrying in 3s`);
      setTimeout(() => {
        if (!mainWindow.isDestroyed()) mainWindow.loadURL(APP_URL);
      }, 3000);
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
    // Closing the POS window = exit intent. Force a full quit so the process really
    // terminates — otherwise the cached hidden print window (htmlPrinter `_win`, kept
    // alive for silent printing) leaves an INVISIBLE process running. That zombie holds
    // the single-instance lock (§6-5), so the next launch silently quits and the app
    // "won't reopen" until a reboot kills it (with MIN, 2026-07-08). app.quit() closes
    // every window (incl. the hidden print window) and exits cleanly → relaunch works.
    app.quit();
  });

  console.log(`[main] loading ${APP_URL}`);
  mainWindow.loadURL(APP_URL);
}

app.on('second-instance', () => {
  // Someone tried to launch a second copy — focus the existing window instead.
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});

app.whenReady().then(() => {
  // No File/Edit/View/Window/Help menu bar — a POS is a kiosk-style app, not a
  // browser. Removing it also kills the "this feels like a browser" impression.
  // Clipboard shortcuts still work in inputs; our own shortcuts (F11, Ctrl+Shift+D)
  // are registered as global accelerators below, independent of the menu.
  Menu.setApplicationMenu(null);

  ipcMain.handle('desktop:version', () => app.getVersion());

  // Register the native print bridge (§4). Printer enumeration borrows the main
  // window's webContents.
  nativePrint.register(() => (mainWindow && !mainWindow.isDestroyed() ? mainWindow.webContents : null));

  createMainWindow();

  // §6-5: keep the store monitor awake (sleep was a socket-drop cause on the web+QZ setup).
  try { _powerBlockerId = powerSaveBlocker.start('prevent-display-sleep'); } catch (_) {}

  // §6-5: start with Windows so the POS is up after a reboot. (Toggleable later.)
  try {
    if (process.platform === 'win32') app.setLoginItemSettings({ openAtLogin: true });
  } catch (_) {}

  // §6-6: auto-update — no-op unless a feed URL is configured (safe for pilot).
  updater.init();

  globalShortcut.register('CommandOrControl+Shift+D', openDiagnostics);

  // F11 toggles fullscreen; Ctrl+Shift+I opens DevTools (hidden by default,
  // no visible menu). Kept minimal per §6-5.
  globalShortcut.register('F11', () => {
    if (mainWindow) mainWindow.setFullScreen(!mainWindow.isFullScreen());
  });
  globalShortcut.register('CommandOrControl+Shift+I', () => {
    if (mainWindow) mainWindow.webContents.toggleDevTools();
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});

app.on('window-all-closed', () => {
  app.quit();
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
  // Explicitly destroy the cached hidden print window so nothing keeps the process
  // alive past quit (zombie → single-instance lock → "won't reopen"). Backstop to app.quit().
  try { nativePrint.destroyPrintWindow(); } catch (_) { /* best effort */ }
});
