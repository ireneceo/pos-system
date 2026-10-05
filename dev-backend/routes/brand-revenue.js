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
      // 화면 체크박스(브랜드 여러 개) — 범위 밖이 섞이면 403. 규칙은 판매 통계와 같은 resolveSalesBrandIds 하나.
      const scoped = resolveSalesBrandIds(req);
      if (scoped.forbidden) return res.status(403).json({ success: false, message: 'Brand not in your scope' });
      const brandIds = scoped.ids;
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
      // 화면 체크박스(매장 여러 개). 'none' = 아무 매장도 → 매장 청구서 0건
      if (req.query.restaurant_ids !== undefined && req.query.restaurant_ids !== '') {
        const rids = req.query.restaurant_ids === 'none' ? [0] : idList(req.query.restaurant_ids);
        where.payer_type = 'restaurant';
        where.payer_id = { [Op.in]: rids.length ? rids : [0] };
      }

      const invoices = await Invoice.findAll({
        where,
        attributes: ['id', 'invoice_number', 'invoice_category', 'status', 'total_amount', 'paid_amount',
          'discount_amount', 'subtotal',
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

      // discounted = 할인해 준 금액 합계 (2026-09-17 Irene 「0원 무료라도 할인해준 건 보여줘야 해」).
      //   청구액·수금액만 보여 주면 «얼마를 깎아 줬는가» 가 어디에도 안 남는다.
      const empty = () => ({ invoiced: 0, paid: 0, outstanding: 0, discounted: 0, count: 0 });
      const buckets = { product_sales: empty(), subscription_sales: empty(), fees_other: empty() };
      const totals = empty();
      const byRestaurant = new Map();
      const rows = [];

      for (const inv of invoices) {
        // soa 는 자식 trade 인보이스의 묶음이라 금액을 더하면 두 번 센다. 목록에도 넣지 않는다.
        if (inv.invoice_category === 'soa') continue;

        const amount = Number(inv.total_amount || 0);
        const discounted = Number(inv.discount_amount || 0);
        const paid = PAID_STATUSES.includes(inv.status) ? amount : Number(inv.paid_amount || 0);
        const outstanding = Math.max(0, Math.round((amount - paid) * 100) / 100);
        const b = bucketOf(inv.invoice_category);

        for (const t of [buckets[b], totals]) {
          t.invoiced += amount; t.paid += paid; t.outstanding += outstanding; t.discounted += discounted; t.count += 1;
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
        r.invoiced += amount; r.paid += paid; r.outstanding += outstanding; r.discounted += discounted; r.count += 1;

        rows.push({
          id: inv.id,
          invoice_number: inv.invoice_number,
          category: inv.invoice_category,
          bucket: b,
          status: inv.status,
          amount, paid, outstanding, discounted,
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

/* ────────────────────────────────────────────────────────────────────────────
 * GET /api/brand/sales-report — 브랜드 **판매 내역 통계** (2026-10-05 Irene)
 *
 *   「카테고리별로 매출보는 탭도 추가해줘 … 브랜드별로도 볼 수 있어야 … 레스토랑 매출통계처럼」
 *   「매출통계 잡을 때 레스토랑들, 브랜드들 체크해서 볼 수 있게」(with MIN 같은 직영점은 따로 봐야 한다)
 *   「주문시점으로 기준이 맞아」
 *
 * 기준 = **주문 시점**(발주 제출 시각, 없으면 생성 시각)의 브랜드 판매 발주 중
 *        수령 완료(received)이거나 청구서가 붙은 것. 취소·초안 제외.
 * 금액 = 발주 품목 금액(line_total) — 거래 청구서 품목이 같은 값을 옮겨 적는다(purchaseOrderService).
 *        배송비는 품목이 아니라 따로 센다.
 * 카테고리 = 품목 → 판매 연결(ingredient_seller_products, seller_type='brand') → 브랜드 상품 → 브랜드 상품 카테고리.
 *
 * ⚠ 보안: 브랜드는 요청값을 그대로 쓰지 않는다 — `requireBrandScope` 범위(소유∪배정) 안의 것만.
 *   범위 밖 브랜드가 하나라도 섞이면 403. 매장 목록은 그 브랜드들에서 산 매장만 내려 준다.
 * ──────────────────────────────────────────────────────────────────────────── */
const { sequelize } = require('../config/database');
const { getDateBounds } = require('../utils/dateTimeHelper');
/** 시각 → 그 시간대 달력의 YYYY-MM-DD */
const localDay = (d, tz) => new Intl.DateTimeFormat('en-CA', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' }).format(d);

const idList = (v) => String(v || '').split(',').map(x => x.trim()).filter(x => /^\d+$/.test(x)).map(Number);
const validTz = (tz) => { try { Intl.DateTimeFormat('en-US', { timeZone: tz }); return true; } catch { return false; } };

/** 요청한 브랜드 목록을 범위와 맞춘다. null = 시스템관리자 전체. 범위 밖이면 { forbidden: true }. */
function resolveSalesBrandIds(req) {
  const allowed = brandIdsFromScope(req);          // null(관리자 전체) | number[]
  const asked = idList(req.query.brand_ids);
  if (!asked.length) return { ids: allowed };
  if (allowed && asked.some(id => !allowed.includes(id))) return { forbidden: true };
  return { ids: asked };
}

router.get(
  '/brand/sales-report',
  authenticateToken,
  requireBrandScope(),
  async (req, res) => {
    try {
      const scoped = resolveSalesBrandIds(req);
      if (scoped.forbidden) return res.status(403).json({ success: false, message: 'Brand not in your scope' });
      const brandIds = scoped.ids;
      if (brandIds && brandIds.length === 0) return res.status(403).json({ success: false, message: 'No brand in scope' });

      const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
      const { start, end } = req.query;
      if (!DATE_RE.test(String(start || '')) || !DATE_RE.test(String(end || ''))) {
        return res.status(400).json({ success: false, message: 'start and end (YYYY-MM-DD) are required' });
      }
      const tz = validTz(req.query.tz) ? req.query.tz : 'Asia/Kuala_Lumpur';
      const from = getDateBounds(start, tz).startOfDay;
      const to = getDateBounds(end, tz).endOfDay;
      // 매장 선택 — 값이 없으면 전체, 'none' 이면 아무 매장도(빈 결과)
      const storeParam = req.query.restaurant_ids;
      const storeIds = storeParam === 'none' ? [] : idList(storeParam);
      const storeFilterOn = storeParam !== undefined && storeParam !== '';

      // 선택지 — 범위 안 브랜드와, 그 브랜드에서 한 번이라도 산 매장(기간 무관: 체크박스가 기간마다 바뀌지 않게)
      const optBrandWhere = brandIdsFromScope(req);
      const brandOptions = await Brand.findAll({
        where: optBrandWhere ? { id: optBrandWhere } : {}, attributes: ['id', 'name'], order: [['name', 'ASC']]
      });
      const storeOptions = await sequelize.query(
        `SELECT DISTINCT r.id, r.name FROM purchase_orders po JOIN restaurants r ON r.id = po.entity_id
          WHERE po.seller_type = 'brand' AND po.entity_type = 'restaurant'
            ${optBrandWhere ? 'AND po.seller_entity_id IN (:optBrands)' : ''}
          ORDER BY r.name`,
        { replacements: { optBrands: optBrandWhere || [0] }, type: 'SELECT' });

      const emptyResult = { totals: { orders: 0, amount: 0, delivery: 0, stores: 0, lines: 0 },
        by_category: [], by_product: [], by_store: [], by_brand: [], trend: [], trend_unit: 'day' };
      if (storeFilterOn && storeIds.length === 0) {
        return res.json({ success: true, data: { ...emptyResult, options: { brands: brandOptions, stores: storeOptions } } });
      }

      const lines = await sequelize.query(
        `SELECT po.id AS po_id, po.seller_entity_id AS brand_id, po.entity_id AS restaurant_id, r.name AS restaurant_name,
                COALESCE(po.submitted_at, po.created_at) AS ordered_at, COALESCE(po.delivery_fee, 0) AS delivery_fee,
                poi.quantity_ordered AS qty, poi.unit, COALESCE(poi.line_total, 0) AS amount, poi.description,
                bp.id AS product_id, bp.name AS product_name, c.id AS category_id, c.name AS category_name
           FROM purchase_orders po
           JOIN purchase_order_items poi ON poi.purchase_order_id = po.id
           LEFT JOIN restaurants r ON r.id = po.entity_id
           LEFT JOIN ingredient_seller_products isp ON isp.id = poi.ingredient_seller_product_id AND isp.seller_type = 'brand'
           LEFT JOIN brand_products bp ON bp.id = isp.seller_product_id
           LEFT JOIN brand_product_categories c ON c.id = bp.category_id
          WHERE po.seller_type = 'brand' AND po.entity_type = 'restaurant'
            ${brandIds ? 'AND po.seller_entity_id IN (:brandIds)' : ''}
            ${storeFilterOn ? 'AND po.entity_id IN (:storeIds)' : ''}
            AND po.status NOT IN ('cancelled', 'draft')
            AND (po.status = 'received' OR po.trade_invoice_id IS NOT NULL)
            AND COALESCE(po.submitted_at, po.created_at) BETWEEN :from AND :to`,
        { replacements: { brandIds: brandIds || [0], storeIds: storeIds.length ? storeIds : [0], from, to }, type: 'SELECT' });

      const r2 = (n) => Math.round(n * 100) / 100;
      const bName = new Map(brandOptions.map(b => [b.id, b.name]));
      const orders = new Map();      // po_id → { brand_id, restaurant_id, delivery }
      const cats = new Map(); const prods = new Map(); const stores = new Map(); const brandsAgg = new Map();
      const spanDays = Math.round((to - from) / 86400000);
      const trendUnit = spanDays > 62 ? 'month' : 'day';
      const trend = new Map();
      let amount = 0;

      for (const l of lines) {
        const amt = Number(l.amount) || 0;
        amount += amt;
        if (!orders.has(l.po_id)) {
          orders.set(l.po_id, { brand_id: l.brand_id, restaurant_id: l.restaurant_id, delivery: Number(l.delivery_fee) || 0 });
        }
        const catKey = l.category_id ?? 'none';
        if (!cats.has(catKey)) cats.set(catKey, { category_id: l.category_id ?? null, name: l.category_name || null, amount: 0, orders: new Set(), products: new Map() });
        const c = cats.get(catKey); c.amount += amt; c.orders.add(l.po_id);
        const prodKey = l.product_id ?? `d:${l.description || '?'}`;
        if (!prods.has(prodKey)) prods.set(prodKey, { product_id: l.product_id ?? null, name: l.product_name || l.description || '—',
          category_id: l.category_id ?? null, category_name: l.category_name || null, unit: l.unit || '', qty: 0, amount: 0, orders: new Set(), stores: new Set() });
        const p = prods.get(prodKey); p.qty += Number(l.qty) || 0; p.amount += amt; p.orders.add(l.po_id); p.stores.add(l.restaurant_id);
        if (!c.products.has(prodKey)) c.products.set(prodKey, p);
        if (!stores.has(l.restaurant_id)) stores.set(l.restaurant_id, { restaurant_id: l.restaurant_id, name: l.restaurant_name || `#${l.restaurant_id}`, amount: 0, orders: new Set() });
        const st = stores.get(l.restaurant_id); st.amount += amt; st.orders.add(l.po_id);
        if (!brandsAgg.has(l.brand_id)) brandsAgg.set(l.brand_id, { brand_id: l.brand_id, name: bName.get(l.brand_id) || `#${l.brand_id}`, amount: 0, orders: new Set() });
        const ba = brandsAgg.get(l.brand_id); ba.amount += amt; ba.orders.add(l.po_id);
        const day = localDay(new Date(l.ordered_at), tz);           // YYYY-MM-DD (매장 달력)
        const tKey = trendUnit === 'month' ? day.slice(0, 7) : day;
        trend.set(tKey, (trend.get(tKey) || 0) + amt);
      }
      let delivery = 0;
      for (const o of orders.values()) delivery += o.delivery;

      const pOut = (p) => ({ product_id: p.product_id, name: p.name, category_id: p.category_id, category_name: p.category_name,
        unit: p.unit, qty: r2(p.qty), amount: r2(p.amount), orders: p.orders.size, stores: p.stores.size });
      const byDesc = (a, b) => b.amount - a.amount;

      res.json({
        success: true,
        data: {
          totals: { orders: orders.size, amount: r2(amount), delivery: r2(delivery), stores: stores.size, lines: lines.length },
          by_category: [...cats.values()].map(c => ({ category_id: c.category_id, name: c.name, amount: r2(c.amount),
            orders: c.orders.size, share: amount ? r2((c.amount / amount) * 100) : 0,
            products: [...c.products.values()].map(pOut).sort(byDesc) })).sort(byDesc),
          by_product: [...prods.values()].map(pOut).sort(byDesc),
          by_store: [...stores.values()].map(s => ({ restaurant_id: s.restaurant_id, name: s.name, amount: r2(s.amount), orders: s.orders.size })).sort(byDesc),
          by_brand: [...brandsAgg.values()].map(b => ({ brand_id: b.brand_id, name: b.name, amount: r2(b.amount), orders: b.orders.size })).sort(byDesc),
          trend: [...trend.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([k, v]) => ({ key: k, amount: r2(v) })),
          trend_unit: trendUnit,
          options: { brands: brandOptions, stores: storeOptions }
        }
      });
    } catch (err) {
      console.error('GET /api/brand/sales-report error:', err);
      res.status(500).json({ success: false, message: 'Failed to load sales report' });
    }
  }
);

module.exports = router;
