'use strict';

const fs = require('fs');
const path = require('path');
const { app, screen } = require('electron');

// Minimal window-state persistence (position/size/maximized) without extra deps.
// Stored as JSON in the app's userData dir, keyed by window name.

function stateFile(name) {
  return path.join(app.getPath('userData'), `window-state-${name}.json`);
}

function readState(name) {
  try {
    const raw = fs.readFileSync(stateFile(name), 'utf8');
    return JSON.parse(raw);
  } catch (_) {
    return null;
  }
}

function writeState(name, state) {
  try {
    fs.writeFileSync(stateFile(name), JSON.stringify(state), 'utf8');
  } catch (_) {
    // Non-fatal: window state is a convenience, never block the app on it.
  }
}

// Returns a BrowserWindow options fragment (bounds) that is validated to be
// visible on some currently-connected display. Falls back to defaults if the
// saved bounds are off-screen (e.g. a monitor was unplugged).
function restoreBounds(name, defaults) {
  const saved = readState(name);
  if (!saved || !saved.bounds) {
    return { bounds: { ...defaults }, maximized: false };
  }

  const b = saved.bounds;
  const visible = screen.getAllDisplays().some((d) => {
    const wa = d.workArea;
    // Require at least a portion of the window to intersect the work area.
    return (
      b.x < wa.x + wa.width &&
      b.x + b.width > wa.x &&
      b.y < wa.y + wa.height &&
      b.y + b.height > wa.y
    );
  });

  if (!visible) {
    return { bounds: { ...defaults }, maximized: false };
  }
  return { bounds: b, maximized: !!saved.maximized };
}

// Wire a window's move/resize/close to persist its state.
function track(name, win) {
  const persist = () => {
    if (win.isDestroyed()) return;
    const maximized = win.isMaximized();
    // Use normal bounds so un-maximizing restores a sane size.
    const bounds = maximized ? win.getNormalBounds() : win.getBounds();
    writeState(name, { bounds, maximized });
  };

  win.on('resize', persist);
  win.on('move', persist);
  win.on('close', persist);
}

module.exports = { restoreBounds, track };
