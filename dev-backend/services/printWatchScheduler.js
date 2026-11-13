/**
 * 인쇄 지킴이 정기 작업 — 매시 7분 (2026-11-13 · 설계 .claude/fable-design-20261113-print-monitoring.md §3).
 * 일은 services/printWatch.runWatch 가 한다(health-check 가 now 를 넣어 직접 부른다).
 * 실행 기록 SchedulerRun 'print_watch_hourly'. 주인 프로세스만 켠다(server.js isSchedulerOwner 블록).
 */
const cron = require('node-cron');
const logger = require('../utils/logger');

let task = null;

async function tick(now = new Date()) {
  const { SchedulerRun } = require('../models');
  let run = null;
  try { run = await SchedulerRun.create({ job_name: 'print_watch_hourly', status: 'running', started_at: now }); }
  catch (e) { logger.warn('[PrintWatch] SchedulerRun.create 실패, 계속 진행:', e.message); }
  try {
    const { runWatch } = require('./printWatch');
    const stats = await runWatch({ now });
    if (run) await run.update({ status: 'success', finished_at: new Date(), duration_ms: Date.now() - now.getTime(), results: stats }).catch(() => {});
    if (stats.opened || stats.resolved) logger.info(`[PrintWatch] 매장 ${stats.restaurants} · 새 발견 ${stats.opened} · 계속 ${stats.updated} · 풀림 ${stats.resolved}`);
    return stats;
  } catch (e) {
    logger.error('[PrintWatch] tick failed:', e.message);
    if (run) await run.update({ status: 'error', finished_at: new Date(), duration_ms: Date.now() - now.getTime(), error_message: String(e.message).slice(0, 1000) }).catch(() => {});
    return null;
  }
}

function start() {
  if (task) return;
  task = cron.schedule('7 * * * *', () => { tick().catch(() => {}); });
  logger.info('[PrintWatch] started (hourly :07)');
}

function stop() { if (task) { task.stop(); task = null; } }

module.exports = { start, stop, tick };
