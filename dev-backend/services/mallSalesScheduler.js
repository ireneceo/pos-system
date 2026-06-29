/**
 * mallSalesScheduler — 입점몰 매출보고 일일 전송 cron.
 *
 * 매일 마감 후(04:00 MYT = 18:00 UTC… node-cron 은 서버 UTC 기준) enabled 연동을 순회,
 * 최근 N영업일(기본 7) 24레코드를 upsert 전송. 실행 결과는 SchedulerRun 에 기록(Admin 모니터),
 * 연동 행에도 last_run/last_status/last_error 갱신.
 *
 * 운영 URL/자격증명 미수령 매장은 token_url 미설정으로 자연히 실패 기록만 남고 다른 매장에 무영향.
 */

const cron = require('node-cron');
const { RestaurantSalesIntegration, SchedulerRun } = require('../models');
const mallSalesService = require('./mallSalesService');
const logger = require('../utils/logger');

async function runDailySend(opts = {}) {
  let run = null;
  const startMs = Date.now();
  try {
    run = await SchedulerRun.create({ job_name: 'mall_sales_daily', status: 'running', started_at: new Date() });
  } catch (e) {
    logger.warn('[mallSales] SchedulerRun.create 실패, 계속 진행:', e.message);
  }

  const results = [];
  let errorCount = 0;
  try {
    const integrations = await RestaurantSalesIntegration.findAll({ where: { enabled: true } });
    for (const integ of integrations) {
      try {
        const r = await mallSalesService.sendForRestaurant(integ, { days: opts.days });
        const hadFailure = r.failed.length > 0;
        if (hadFailure) errorCount++;
        await integ.update({
          last_run_at: new Date(),
          last_status: hadFailure ? (r.sent.length ? 'partial' : 'error') : 'success',
          last_error: hadFailure ? r.failed.map(f => `${f.date}: ${f.error}`).join(' | ').slice(0, 1000) : null
        });
        results.push({ restaurant_id: integ.restaurant_id, sent: r.sent.length, failed: r.failed.length });
      } catch (e) {
        errorCount++;
        logger.error(`[mallSales] restaurant ${integ.restaurant_id} 전송 오류: ${e.message}`);
        try {
          await integ.update({ last_run_at: new Date(), last_status: 'error', last_error: String(e.message).slice(0, 1000) });
        } catch { /* noop */ }
        results.push({ restaurant_id: integ.restaurant_id, error: e.message });
      }
    }

    if (run) {
      await run.update({
        status: errorCount > 0 ? 'partial' : 'success',
        finished_at: new Date(),
        duration_ms: Date.now() - startMs,
        results: { integrations: integrations.length, errors: errorCount, detail: results.slice(0, 20) }
      });
    }
    logger.info(`[mallSales] 일일 전송 완료: ${results.length} 매장, 오류 ${errorCount}`);
  } catch (err) {
    logger.error('[mallSales] 일일 전송 실패:', err.message);
    if (run) {
      await run.update({ status: 'error', finished_at: new Date(), duration_ms: Date.now() - startMs, error_message: err.message });
    }
  }
  return { results, errorCount };
}

function start() {
  // 매일 18:00 UTC (= 02:00 MYT) — 전 영업일 마감 후. 최근 7일 upsert 라 정정도 따라잡음.
  cron.schedule('0 18 * * *', () => { runDailySend(); });
  logger.info('Mall sales scheduler started — daily 18:00 UTC (02:00 MYT)');
}

module.exports = { start, runDailySend };
