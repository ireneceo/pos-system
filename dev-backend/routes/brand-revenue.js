/**
 * routes/brand-revenue.js — 브랜드제너럴 **자기 매출** 리포트.
 *
 * 왜 있나 (Irene 2026-09-07 · Fable 설계):
 *   "브랜드제너럴의 리포트는 브랜드 제너럴의 판매를 가지고 해야 하는 거 아니야?
 *    리포트는 브랜드제너럴이 파는 프로덕트랑 구독판매 또는 개별판매(인보이스)랑 연결해줘."
 *   기존 BrandReportsPage 6탭은 전부 `/api/orders`(매장 주문)라 Performance 와 같은 물건이었다.
 *   그쪽은 "매장 판매 분석"으로 옮기고, 여기서는 **브랜드가 청구한 것**을 본다.
 *
 * 🔑 진실원장 = **브랜드가 발행한 인보이스**(`issuer_type='brand'`). 발주(PO)는 주문이지 매출이 아니다.
 *   세 묶음:
 *     프로덕트 개별판매 = `invoice_category='trade'`      (매장이 브랜드에 발주 → 수령 시 자동 발행)
 *     구독 판매        = `invoice_category='brand_plan'`  (entity_plans 월정액)
 *     수수료·기타      = 그 밖의 브랜드 발행 인보이스     (brand_royalty · brand_marketing …)
 *   ⛔ `soa` 는 **더하지 않는다** — 이미 발행된 trade 인보이스를 묶은 부모라 더하면 이중집계다.
 *
 * ⚠ 보안: 쿼리의 `brand_id` 를 신뢰하지 않는다. 범위는 `requireBrandScope` 가 정한 것만 쓴다
 *   (System Admin 만 override 가능 — brand-soa.js 와 같은 규칙).
 */
const express = require('express');
const router = express.Router();
const { Op, fn, col } = require('sequelize');
const { Invoice, Restaurant, Brand, PurchaseOrder } = require('../models');
const { authenticateToken } = require('../middleware/auth');
const { requireBrandScope } = require('../middleware/brandScope');

// 매출로 세지 않는 상태 — 취소된 청구는 매출이 아니다.
const DEAD_STATUSES = ['cancelled', 'draft'];
// 수금된 것으로 보는 상태.
const PAID_STATUSES = ['paid'];

/** brand-soa.js 와 같은 규칙 (복제 금지 — 여기서 바꾸면 저기도 바꿔야 한다). */
function brandIdsFromScope(req) {
  const scope = req.brandScope;
  if (scope.isAdmin) return scope.brandId != null ? [scope.brandId] : null;
  return scope.brandId != null ? [scope.brandId] : scope.ownedBrandIds;
}

/** 카테고리를 화면이 쓰는 세 묶음으로 접는다. */
function bucketOf(category) {
  if (category === 'trade') return 'product_sales';
  if (category === 'brand_plan') return 'subscription_sales';
  return 'fees_other';
}

router.get(
  '/brand/revenue-report',
  authenticateToken,
  requireBrandScope(),
  async (req, res) => {
    try {
      const brandIds = brandIdsFromScope(req);
      const where = { issuer_type: 'brand', status: { [Op.notIn]: DEAD_STATUSES } };
      if (brandIds) where.issuer_id = { [Op.in]: brandIds };

      // 기간 기준은 발행일. `issued_at` 이 비어 있는 옛 행은 생성일로 본다.
      // ⛔ 원시 SQL 로 날짜를 문자열 연결하지 않는다 — Sequelize 조건으로만 짠다(주입 여지 0).
      //   `models` 는 sequelize 인스턴스를 내보내지 않아 literal + escape 조합이 500 을 냈다(2026-09-07).
      const { start, end, restaurant_id } = req.query;
      const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
      const from = DATE_RE.test(String(start || '')) ? new Date(`${start}T00:00:00.000Z`) : null;
      const to = DATE_RE.test(String(end || '')) ? new Date(`${end}T23:59:59.999Z`) : null;
      if (from || to) {
        const range = {};
        if (from) range[Op.gte] = from;
        if (to) range[Op.lte] = to;
        where[Op.and] = [{
          [Op.or]: [
            { issued_at: range },
            { issued_at: null, createdAt: range }   // 발행일이 비어 있는 옛 행은 생성일로 본다
          ]
        }];
      }
      if (restaurant_id && /^\d+$/.test(String(restaurant_id))) {
        where.payer_type = 'restaurant';
        where.payer_id = Number(restaurant_id);
      }

      const invoices = await Invoice.findAll({
        where,
        attributes: ['id', 'invoice_number', 'invoice_category', 'status', 'total_amount', 'paid_amount',
          'currency', 'issuer_id', 'payer_type', 'payer_id', 'issued_at', 'due_date', 'createdAt'],
        order: [['createdAt', 'DESC']],
        limit: 2000
      });

      // 구매자(매장) 이름 — 한 번에 조회해서 붙인다(행마다 쿼리 금지).
      const restaurantIds = [...new Set(invoices
        .filter(i => i.payer_type === 'restaurant' && i.payer_id).map(i => i.payer_id))];
      const restaurants = restaurantIds.length
        ? await Restaurant.findAll({ where: { id: restaurantIds }, attributes: ['id', 'name'] }) : [];
      const rName = new Map(restaurants.map(r => [r.id, r.name]));

      const brandIdsSeen = [...new Set(invoices.map(i => i.issuer_id).filter(Boolean))];
      const brands = brandIdsSeen.length
        ? await Brand.findAll({ where: { id: brandIdsSeen }, attributes: ['id', 'name'] }) : [];
      const bName = new Map(brands.map(b => [b.id, b.name]));

      const empty = () => ({ invoiced: 0, paid: 0, outstanding: 0, count: 0 });
      const buckets = { product_sales: empty(), subscription_sales: empty(), fees_other: empty() };
      const totals = empty();
      const byRestaurant = new Map();
      const rows = [];

      for (const inv of invoices) {
        // soa 는 자식 trade 인보이스의 묶음이라 금액을 더하면 두 번 센다. 목록에도 넣지 않는다.
        if (inv.invoice_category === 'soa') continue;

        const amount = Number(inv.total_amount || 0);
        const paid = PAID_STATUSES.includes(inv.status) ? amount : Number(inv.paid_amount || 0);
        const outstanding = Math.max(0, Math.round((amount - paid) * 100) / 100);
        const b = bucketOf(inv.invoice_category);

        for (const t of [buckets[b], totals]) {
          t.invoiced += amount; t.paid += paid; t.outstanding += outstanding; t.count += 1;
        }

        const key = inv.payer_type === 'restaurant' ? inv.payer_id : `other:${inv.payer_type}`;
        if (!byRestaurant.has(key)) {
          byRestaurant.set(key, {
            restaurant_id: inv.payer_type === 'restaurant' ? inv.payer_id : null,
            name: inv.payer_type === 'restaurant' ? (rName.get(inv.payer_id) || `#${inv.payer_id}`) : inv.payer_type,
            ...empty()
          });
        }
        const r = byRestaurant.get(key);
        r.invoiced += amount; r.paid += paid; r.outstanding += outstanding; r.count += 1;

        rows.push({
          id: inv.id,
          invoice_number: inv.invoice_number,
          category: inv.invoice_category,
          bucket: b,
          status: inv.status,
          amount, paid, outstanding,
          currency: inv.currency || 'MYR',
          brand_id: inv.issuer_id,
          brand_name: bName.get(inv.issuer_id) || null,
          buyer_name: inv.payer_type === 'restaurant' ? (rName.get(inv.payer_id) || null) : inv.payer_type,
          issued_at: inv.issued_at || inv.createdAt,
          due_date: inv.due_date
        });
      }

      const round = (o) => ({ ...o, invoiced: Math.round(o.invoiced * 100) / 100,
        paid: Math.round(o.paid * 100) / 100, outstanding: Math.round(o.outstanding * 100) / 100 });

      // **매출 누락 신호** — 수령까지 끝난 발주인데 거래 인보이스가 안 붙은 건수.
      //   화면에 한 줄로 보여준다. 리포트가 비어 보이는 이유가 여기 있을 수 있어서다.
      const gapWhere = { status: 'received', trade_invoice_id: null, seller_type: 'brand' };
      if (brandIds) gapWhere.seller_entity_id = { [Op.in]: brandIds };
      const gap = await PurchaseOrder.findAll({
        where: gapWhere,
        attributes: [[fn('COUNT', col('id')), 'count'], [fn('SUM', col('total_amount')), 'amount']],
        raw: true
      });

      res.json({
        success: true,
        data: {
          buckets: {
            product_sales: round(buckets.product_sales),
            subscription_sales: round(buckets.subscription_sales),
            fees_other: round(buckets.fees_other)
          },
          totals: round(totals),
          by_restaurant: [...byRestaurant.values()].map(round).sort((a, b) => b.invoiced - a.invoiced),
          invoices: rows,
          uninvoiced_received_pos: {
            count: Number(gap[0]?.count || 0),
            amount: Math.round(Number(gap[0]?.amount || 0) * 100) / 100
          }
        }
      });
    } catch (err) {
      console.error('GET /api/brand/revenue-report error:', err);
      res.status(500).json({ success: false, message: 'Failed to load revenue report' });
    }
  }
);

module.exports = router;
