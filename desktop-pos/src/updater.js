'use strict';

// Auto-update via electron-updater (generic provider), §6-6.
// SAFE FOR PILOT: it is a no-op if the update feed / app-update.yml is absent or
// unreachable, and never crashes the app — network/feed errors are swallowed.
// Once installers are hosted at the publish URL (package.json build.publish),
// updates flow automatically; until then this simply does nothing harmful.

let autoUpdater = null;
try { autoUpdater = require('electron-updater').autoUpdater; } catch (_) { /* dep absent in dev */ }

function init() {
  if (!autoUpdater) return;
  try {
    const feed = process.env.PURPLE_POS_UPDATE_URL;
    if (feed) autoUpdater.setFeedURL({ provider: 'generic', url: feed });
    autoUpdater.autoDownload = true;
    autoUpdater.autoInstallOnAppQuit = true;
    autoUpdater.on('error', (e) => console.warn('[updater] error:', e && e.message));
    autoUpdater.on('update-available', (i) => console.log('[updater] update available:', i && i.version));
    autoUpdater.on('update-downloaded', () => console.log('[updater] downloaded — installs on quit'));
    autoUpdater.checkForUpdatesAndNotify().catch((e) => console.warn('[updater] check failed:', e && e.message));
  } catch (e) {
    console.warn('[updater] init skipped:', e && e.message);
  }
}

module.exports = { init };
