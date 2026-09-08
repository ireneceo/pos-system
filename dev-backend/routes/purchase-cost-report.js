/**
 * 구매·원가 리포트 — 설계 §8 P2 (2026-09-08)
 *
 * "우리가 이 품목을 얼마에 사 왔나"를 **관측**한다.
 *
 * ⛔ 이건 리포트일 뿐 **원가 결정 정책이 아니다.**
 *   원가는 여전히 «공급업체 현재가» 하나다(메모리 reference_cost_two_paths).
 *   평균·±폭은 보여주기만 하고, 어디에도 원가로 쓰이지 않는다. 평균을 원가로 삼는 분기를 만들지 않는다.
 *
 * ## 무엇을 세나
 *   실효가 = `COALESCE(invoiced_unit_price, unit_price)`
 *     — 인보이스 대조로 확정된 실제 청구가가 있으면 그것, 없으면 발주 시점 합의가.
 *   대상 = **실제로 받은 발주**(received · partial_received · closed)
 *     — 받지 않은 발주는 "그 값에 샀다"는 근거가 못 된다(services/priceHistory 와 같은 기준).
 *
 * ## 범위
 *   구매자 범위는 `requireBuyerRole` 이 정한 것만 쓴다. 쿼리의 entity 를 신뢰하지 않는다.
 */
const express = require('express');
const router = express.Router();
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const { authenticateToken } = require('../middleware/auth');
const { requireBuyerRole } = require('../middleware/buyerScope');

router.use('/purchase-cost-report', authenticateToken, requireBuyerRole);

const RECEIVED = ['received', 'partial_received', 'closed'];
const round2 = (n) => Math.round(Number(n || 0) * 100) / 100;
const round4 = (n) => Math.round(Number(n || 0) * 10000) / 10000;

/** 기본 기간 = 최근 90일. 날짜는 문자열 그대로 쓰고 서버 로컬 해석에 맡기지 않는다. */
function periodOf(req) {
  const end = /^\d{4}-\d{2}-\d{2}$/.test(String(req.query.end || '')) ? req.query.end : null;
  const start = /^\d{4}-\d{2}-\d{2}$/.test(String(req.query.start || '')) ? req.query.start : null;
  if (start && end) return { start, end };
  const now = new Date();
  const e = now.toISOString().slice(0, 10);
  const s = new Date(now.getTime() - 90 * 86400000).toISOString().slice(0, 10);
  return { start: start || s, end: end || e };
}

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/purchase-cost-report?start=&end=
//   품목별: 산 횟수 · 총액 · 평균가 · 최저 · 최고 · 마지막가 · 오르내림
//   합계  : 기간 총 구매액 · 품목 수 · 발주 수
// ─────────────────────────────────────────────────────────────────────────────
router.get('/purchase-cost-report', async (req, res) => {
  try {
    if (!req.buyerEntity && !req.buyerIsAdmin) {
      return res.status(403).json({ success: false, message: 'Buyer scope required' });
    }
    const { start, end } = periodOf(req);
    const where = [
      "po.status IN (:received)",
      'po.deleted_at IS NULL',
      'DATE(COALESCE(po.received_at, po.updated_at)) BETWEEN :start AND :end'
    ];
    const repl = { received: RECEIVED, start, end };
    if (req.buyerEntity) {
      where.push('po.entity_type = :et AND po.entity_id = :ei');
      repl.et = req.buyerEntity.type;
      repl.ei = req.buyerEntity.id;
    }

    // 품목 기준 = 판매자 상품 매핑(같은 물건을 같은 곳에서 산 것끼리 묶는다).
    // 매핑이 없는 옛 라인은 이름으로 묶는다(빈칸이 되지 않게).
    const rows = await sequelize.query(
      `SELECT poi.ingredient_seller_product_id map_id,
              COALESCE(poi.description, '(이름 없음)') name,
              poi.unit,
              COUNT(*) times,
              SUM(COALESCE(poi.invoiced_quantity, poi.quantity_ordered)) qty,
              ROUND(SUM(COALESCE(poi.invoiced_unit_price, poi.unit_price)
                        * COALESCE(poi.invoiced_quantity, poi.quantity_ordered)), 2) spend,
              ROUND(AVG(COALESCE(poi.invoiced_unit_price, poi.unit_price)), 4) avg_price,
              ROUND(MIN(COALESCE(poi.invoiced_unit_price, poi.unit_price)), 4) min_price,
              ROUND(MAX(COALESCE(poi.invoiced_unit_price, poi.unit_price)), 4) max_price,
              SUM(poi.invoiced_unit_price IS NOT NULL) invoiced_lines,
              MAX(COALESCE(po.received_at, po.updated_at)) last_at
         FROM purchase_order_items poi
         JOIN purchase_orders po ON po.id = poi.purchase_order_id
        WHERE ${where.join(' AND ')}
        GROUP BY poi.ingredient_seller_product_id, name, poi.unit
        ORDER BY spend DESC
        LIMIT 200`,
      { type: QueryTypes.SELECT, replacements: repl });

    // 마지막 가격은 그룹 함수로 못 뽑는다(집계와 순서가 다른 질문) — 한 번 더 읽어 붙인다.
    const lastByKey = new Map();
    if (rows.length) {
      const lastRows = await sequelize.query(
        `SELECT poi.ingredient_seller_product_id map_id,
                COALESCE(poi.description, '(이름 없음)') name,
                COALESCE(poi.invoiced_unit_price, poi.unit_price) price,
                COALESCE(po.received_at, po.updated_at) at
           FROM purchase_order_items poi
           JOIN purchase_orders po ON po.id = poi.purchase_order_id
          WHERE ${where.join(' AND ')}
          ORDER BY at DESC, poi.id DESC`,
        { type: QueryTypes.SELECT, replacements: repl });
      for (const r of lastRows) {
        const key = `${r.map_id ?? 'x'}|${r.name}`;
        if (!lastByKey.has(key)) lastByKey.set(key, Number(r.price));
      }
    }

    const items = rows.map((r) => {
      const key = `${r.map_id ?? 'x'}|${r.name}`;
      const last = lastByKey.has(key) ? lastByKey.get(key) : null;
      const avg = Number(r.avg_price || 0);
      // 오르내림 폭 = (최고 − 최저) ÷ 평균. 한 번만 샀으면 0 이고, 그건 "변동 없음"이 아니라
      // "비교할 것이 없음"이다 — 화면이 구분할 수 있게 times 를 함께 준다.
      const spreadPct = avg > 0 ? Math.round(((Number(r.max_price) - Number(r.min_price)) / avg) * 1000) / 10 : 0;
      const vsAvgPct = (last != null && avg > 0) ? Math.round(((last - avg) / avg) * 1000) / 10 : null;
      return {
        map_id: r.map_id, name: r.name, unit: r.unit,
        times: Number(r.times), qty: round2(r.qty), spend: round2(r.spend),
        avg_price: round4(r.avg_price), min_price: round4(r.min_price), max_price: round4(r.max_price),
        last_price: last != null ? round4(last) : null,
        spread_pct: spreadPct,
        vs_avg_pct: vsAvgPct,
        invoiced_lines: Number(r.invoiced_lines || 0),
        last_at: r.last_at
      };
    });

    // 월별 구매액 — 그래프용
    const trend = await sequelize.query(
      `SELECT DATE_FORMAT(COALESCE(po.received_at, po.updated_at), '%Y-%m') month,
              ROUND(SUM(COALESCE(poi.invoiced_unit_price, poi.unit_price)
                        * COALESCE(poi.invoiced_quantity, poi.quantity_ordered)), 2) spend,
              COUNT(DISTINCT po.id) orders
         FROM purchase_order_items poi
         JOIN purchase_orders po ON po.id = poi.purchase_order_id
        WHERE ${where.join(' AND ')}
        GROUP BY month ORDER BY month`,
      { type: QueryTypes.SELECT, replacements: repl });

    const totals = items.reduce((a, i) => ({
      spend: a.spend + i.spend, items: a.items + 1, times: a.times + i.times
    }), { spend: 0, items: 0, times: 0 });

    res.json({
      success: true,
      data: {
        period: { start, end },
        totals: { spend: round2(totals.spend), items: totals.items, lines: totals.times },
        items,
        trend: trend.map((t) => ({ month: t.month, spend: round2(t.spend), orders: Number(t.orders) })),
        // 이 리포트는 관측이다 — 원가는 여전히 공급업체 현재가 하나다(설계 §8).
        note: 'observation_only'
      }
    });
  } catch (err) {
    console.error('GET /purchase-cost-report error:', err);
    res.status(500).json({ success: false, message: 'Failed to load purchase cost report' });
  }
});

module.exports = router;
