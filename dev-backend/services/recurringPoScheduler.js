/**
 * 정기 발주 스케줄러 — 매 정각(2026-10-22 Fable 설계 recurring-po §3-3).
 * 일은 services/poScheduleService.runDueSchedules 가 한다(health-check 가 now 를 넣어 직접 부른다).
 * 생성 시각 = 구매자 시간대 07:00 이후 첫 정각 · 하루 1건(행 잠금 + UNIQUE) · 실행 기록 SchedulerRun 'recurring_po_hourly'.
 */
const cron = require('node-cron');
const logger = require('../utils/logger');

let task = null;

function start(io = null) {
  if (task) return;
  task = cron.schedule('0 * * * *', async () => {
    try {
      const { runDueSchedules } = require('./poScheduleService');
      const r = await runDueSchedules({ io });
      if (r.due) logger.info(`[RecurringPoScheduler] due=${r.due} created=${r.created} pending_approval=${r.pending_approval} failed=${r.failed}`);
    } catch (e) {
      logger.error('[RecurringPoScheduler] tick failed:', e.message);
    }
  });
  logger.info('[RecurringPoScheduler] started (hourly)');
}

function stop() { if (task) { task.stop(); task = null; } }

module.exports = { start, stop };
