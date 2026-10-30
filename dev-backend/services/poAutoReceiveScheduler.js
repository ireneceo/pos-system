/**
 * 배송 완료 뒤 자동 완료 스케줄러 — 매 정각(2026-10-30 Fable 설계 po-auto-complete §2-2).
 * 일은 services/poAutoReceiveService.runAutoReceive 가 한다(health-check 가 now 를 넣어 직접 부른다).
 * 실행 기록 SchedulerRun 'po_auto_receive_hourly'.
 */
const cron = require('node-cron');
const logger = require('../utils/logger');

let task = null;

function start(io = null) {
  if (task) return;
  task = cron.schedule('5 * * * *', async () => {
    try {
      const { runAutoReceive } = require('./poAutoReceiveService');
      const r = await runAutoReceive({ io });
      if (r.candidates) logger.info(`[PoAutoReceiveScheduler] candidates=${r.candidates} completed=${r.completed} skipped=${r.skipped} failed=${r.failed}`);
    } catch (e) {
      logger.error('[PoAutoReceiveScheduler] tick failed:', e.message);
    }
  });
  logger.info('[PoAutoReceiveScheduler] started (hourly)');
}

function stop() { if (task) { task.stop(); task = null; } }

module.exports = { start, stop };
