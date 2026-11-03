/**
 * 아침 재고 알림(브랜드) 스케줄러 — 매 정각 (2026-11-03 Fable 설계 phase2 §5-4).
 * 일은 services/brandStockAlertService.runDue 가 한다(health-check 가 now 를 넣어 직접 부른다).
 * 실행 기록 SchedulerRun 'brand_stock_alert_hourly'. 정기 발주 스케줄러(recurringPoScheduler)와 같은 꼴.
 */
const cron = require('node-cron');
const logger = require('../utils/logger');

let task = null;

function start() {
  if (task) return;
  task = cron.schedule('0 * * * *', async () => {
    try {
      const { runDue } = require('./brandStockAlertService');
      const r = await runDue({});
      if (r.sent || r.failed) logger.info(`[BrandStockAlertScheduler] sent=${r.sent} quiet=${r.skipped_quiet} done=${r.skipped_done} failed=${r.failed}`);
    } catch (e) {
      logger.error('[BrandStockAlertScheduler] tick failed:', e.message);
    }
  });
  logger.info('[BrandStockAlertScheduler] started (hourly)');
}

function stop() { if (task) { task.stop(); task = null; } }

module.exports = { start, stop };
