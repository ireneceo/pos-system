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
    // 0.1.8: was "prompt once per version, ever". One "Later" and the app went silent for good,
    // so a shop could run a stale build indefinitely. Now: at most once per version per DAY —
    // enough to be noticed, not enough to nag a live POS.
    const promptedAt = new Map();
    const REPROMPT_MS = 24 * 60 * 60 * 1000;
    autoUpdater.on('update-downloaded', (info) => {
      ulog('downloaded: ' + (info && info.version));
      const v = (info && info.version) || '';
      const last = v ? promptedAt.get(v) : undefined;
      if (last !== undefined && (Date.now() - last) < REPROMPT_MS) return;
      if (v) promptedAt.set(v, Date.now());
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

    // 0.1.8 — the update that never arrived. A shop POS is never closed: staff pick "Later",
    // the app stays open for weeks, and `autoInstallOnAppQuit` never fires. That is how with MIN
    // sat on a build we had already fixed while we hunted a bug that no longer existed.
    //
    // So install it ourselves — but ONLY when it cannot cost the shop a ticket:
    //   • 03:00–05:59 local (shop is closed)
    //   • no keyboard/mouse for 15 min (nobody is mid-order)
    //   • no print job queued or running (a ticket is not mid-flight)
    // Then quitAndInstall(silent, forceRunAfter) restarts the app by itself, so the POS is back
    // up before opening. Any orders that arrive during the ~30s restart are NOT lost: the server
    // keeps needs_print set and the poller collects them on the way back.
    // We never force a restart during business hours — that is the one thing worse than a stale build.
    installWhenSafe();
  } catch (e) {
    console.warn('[updater] init skipped:', e && e.message);
  }
}

// Arm the night-idle installer once an update is downloaded and waiting.
function installWhenSafe() {
  let armed = false;
  autoUpdater.on('update-downloaded', () => { armed = true; });

  const IDLE_SECONDS = 15 * 60;
  setInterval(() => {
    if (!armed) return;
    try {
      const { powerMonitor } = require('electron');
      // 머신 로컬 시각을 쓰는 게 맞다 — 묻는 것이 "이 POS 가 지금 새벽인가"이기 때문.
      // (레스토랑 설정 타임존은 화면 표시용 규칙이고, 여기엔 해당하지 않는다.)
      const hour = new Date().getHours();
      const idle = powerMonitor.getSystemIdleTime();
      let printIdle = true;
      try { printIdle = require('./print/serialQueue').isIdle(); } catch (_) { /* assume idle */ }

      if (hour >= 3 && hour < 6 && idle >= IDLE_SECONDS && printIdle) {
        armed = false;
        ulog(`night-idle install (hour=${hour} idle=${idle}s printIdle=${printIdle})`);
        try {
          autoUpdater.quitAndInstall(true, true);
        } catch (e) {
          // 설치가 실패하면(권한/파일 락/서명) 다시 무장한다. 여기서 조용히 포기하면 그 PC 는
          // 영영 업데이트되지 않는다 — 지금 고치고 있는 바로 그 문제를 재생산하는 셈이다.
          armed = true;
          ulog('quitAndInstall failed (re-armed): ' + (e && e.message));
        }
      }
    } catch (_) { /* never break the updater */ }
  }, 5 * 60 * 1000);
}

module.exports = { init };
