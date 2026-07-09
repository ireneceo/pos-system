'use strict';

// Auto-update via electron-updater (generic provider), §6-6.
// SAFE FOR PILOT: it is a no-op if the update feed / app-update.yml is absent or
// unreachable, and never crashes the app — network/feed errors are swallowed.
// Once installers are hosted at the publish URL (package.json build.publish),
// updates flow automatically; until then this simply does nothing harmful.

let autoUpdater = null;
try { autoUpdater = require('electron-updater').autoUpdater; } catch (_) { /* dep absent in dev */ }

// 0.1.7: persistent updater log. The 0.1.2 "silently never updated" saga (with MIN) was
// undebuggable because every updater event went to console.* — invisible in a packaged app.
// Append events to <userData>/updater.log so a store machine carries its own evidence.
// Best-effort only; logging must never break the updater. Truncates at ~256 KB.
function ulog(msg) {
  const line = new Date().toISOString() + ' ' + msg;
  console.log('[updater] ' + msg);
  try {
    const fs = require('fs');
    const path = require('path');
    const { app } = require('electron');
    const f = path.join(app.getPath('userData'), 'updater.log');
    try { if (fs.existsSync(f) && fs.statSync(f).size > 256 * 1024) fs.truncateSync(f, 0); } catch (_) {}
    fs.appendFileSync(f, line + '\n', 'utf8');
  } catch (_) { /* best effort */ }
}

function init() {
  if (!autoUpdater) return;
  try {
    const feed = process.env.PURPLE_POS_UPDATE_URL;
    if (feed) autoUpdater.setFeedURL({ provider: 'generic', url: feed });
    autoUpdater.autoDownload = true;
    autoUpdater.autoInstallOnAppQuit = true;
    ulog('init v' + (function () { try { return require('electron').app.getVersion(); } catch (_) { return '?'; } })() + (feed ? ' feed=' + feed : ' feed=app-update.yml'));
    autoUpdater.on('error', (e) => ulog('error: ' + (e && e.message)));
    autoUpdater.on('checking-for-update', () => ulog('checking'));
    autoUpdater.on('update-not-available', (i) => ulog('up-to-date (latest=' + ((i && i.version) || '?') + ')'));
    autoUpdater.on('update-available', (i) => ulog('available: ' + (i && i.version)));
    // 2026-07-09 (Irene): the old silent "installs on quit" left users not knowing an update
    // was ready (the download is background, so they'd quit before it finished or never restart).
    // Standard UX: when the update is downloaded, PROMPT to restart-and-install now. If they pick
    // Later, it still auto-installs on the next app quit (autoInstallOnAppQuit). No manual links.
    // 0.1.7: electron-updater RE-EMITS 'update-downloaded' on every periodic re-check once
    // the file is cached (every 30 min here). Without this guard the restart-modal would
    // reappear over a live POS all day after one "Later". Prompt ONCE per version; after
    // "Later" the update still auto-installs on the next app quit (autoInstallOnAppQuit).
    const promptedVersions = new Set();
    autoUpdater.on('update-downloaded', (info) => {
      ulog('downloaded: ' + (info && info.version));
      const v = (info && info.version) || '';
      if (v && promptedVersions.has(v)) return;
      if (v) promptedVersions.add(v);
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
