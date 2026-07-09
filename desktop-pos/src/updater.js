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
    // 2026-07-09 (Irene): the old silent "installs on quit" left users not knowing an update
    // was ready (the download is background, so they'd quit before it finished or never restart).
    // Standard UX: when the update is downloaded, PROMPT to restart-and-install now. If they pick
    // Later, it still auto-installs on the next app quit (autoInstallOnAppQuit). No manual links.
    autoUpdater.on('update-downloaded', (info) => {
      console.log('[updater] downloaded:', info && info.version);
      try {
        const { dialog, BrowserWindow } = require('electron');
        const win = BrowserWindow.getFocusedWindow() || (BrowserWindow.getAllWindows() || [])[0] || null;
        const opts = {
          type: 'info',
          buttons: ['지금 재시작 / Restart now', '나중에 / Later'],
          defaultId: 0,
          cancelId: 1,
          noLink: true,
          title: '업데이트 준비 완료 / Update ready',
          message: `새 버전${info && info.version ? ' ' + info.version : ''}이 준비됐습니다. / A new version is ready.`,
          detail: '지금 재시작하면 바로 적용됩니다. "나중에"를 누르면 다음에 앱을 닫을 때 자동으로 설치됩니다.'
        };
        const p = win ? dialog.showMessageBox(win, opts) : dialog.showMessageBox(opts);
        Promise.resolve(p).then((r) => {
          if (r && r.response === 0) {
            setImmediate(() => { try { autoUpdater.quitAndInstall(); } catch (e) { console.warn('[updater] quitAndInstall:', e && e.message); } });
          }
        }).catch(() => {});
      } catch (e) {
        console.warn('[updater] prompt failed (will install on quit):', e && e.message);
      }
    });
    autoUpdater.checkForUpdatesAndNotify().catch((e) => console.warn('[updater] check failed:', e && e.message));
    // Re-check periodically so an all-day-open POS eventually pulls + prompts (every 30 min).
    try { setInterval(() => { try { autoUpdater.checkForUpdates().catch(() => {}); } catch (_) {} }, 30 * 60 * 1000); } catch (_) { /* non-fatal */ }
  } catch (e) {
    console.warn('[updater] init skipped:', e && e.message);
  }
}

module.exports = { init };
