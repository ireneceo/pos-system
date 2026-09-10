/**
 * 발주 ↔ 인보이스 원가 대조 (설계: docs/PURCHASE_ORDER_SYSTEM.md 끝 절)
 *
 * 세 엔드포인트:
 *   GET  /api/purchase-orders/:id/reconcile  — 대조 화면이 필요한 것 전부(발주 라인 + 기존 대조값 + 인보이스 파일)
 *   POST /api/purchase-orders/:id/reconcile  — 사람이 확인한 숫자를 확정
 *   GET  /api/cost-changes                   — "마지막으로 누가 언제 이 원가를 바꿨나" (§7 표시 동기화)
 *
 * ## 이 파일이 지키는 규칙
 * 1. ⛔ **발주 스냅샷 `unit_price` 를 덮어쓰지 않는다.** 청구 실측은 `invoiced_unit_price` 에 따로 앉는다.
 *    "예상(발주) vs 실제(청구)" 두 값이 나란히 남는 것이 이 기능의 존재 이유다(§2).
 * 2. ⛔ **자동 매칭 결과는 저장되지 않는다.** 매칭기는 프론트 순수 함수이고, 서버는 사람이 확인해 보낸
 *    값만 받는다. 파싱 실수가 원가로 굳는 것을 막는 유일한 자물쇠(§1).
 * 3. 세금·배송·할인은 **라인 단가에 섞지 않는다** — 발주 헤더 칸으로 따로 간다(§2).
 * 4. 원가 전파는 **새 코드를 쓰지 않는다** — 판매상품가를 고치고 `recomputeForSellerProduct` 가
 *    이미 있는 길로 흐른다(§3). 범위 규칙: **누가 샀느냐 = 누구 원가가 바뀌느냐.**
 */

const express = require('express');
const router = express.Router();
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const {
  PurchaseOrder, PurchaseOrderItem, SupplierCompany, SupplierProduct, IngredientSellerProduct
} = require('../models');
const { authenticateToken } = require('../middleware/auth');
const { requireBuyerRole } = require('../middleware/buyerScope');
const { sanitizeString } = require('../middleware/validation');
const { recomputeForSellerProduct } = require('../services/costSync');

// 경로 한정 가드 — `router.use(guard)` 로 걸면 /api 전체가 잠긴다(메모리: router_use_leaks_to_api_root)
router.use('/purchase-orders', authenticateToken, requireBuyerRole);
router.use('/cost-changes', authenticateToken, requireBuyerRole);

/** 발주가 이 구매자 것인지. purchase-orders-workflow.js:109 과 같은 규칙. */
function checkPOOwnership(po, req) {
  if (req.buyerIsAdmin && !req.buyerEntity) return true; // SA, 전환 안 함
  if (!req.buyerEntity) return false;
  return po.entity_type === req.buyerEntity.type && po.entity_id === req.buyerEntity.id;
}

const num = (v) => (v === undefined || v === null || v === '' ? null : Number(v));
const money = (v) => { const n = num(v); return n !== null && Number.isFinite(n) && n >= 0 ? n : null; };

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/purchase-orders/:id/reconcile — 대조 화면 데이터
// ─────────────────────────────────────────────────────────────────────────────
router.get('/purchase-orders/:id/reconcile', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) return res.status(404).json({ success: false, message: 'Not found' });

    const po = await PurchaseOrder.findByPk(id);
    if (!po || !checkPOOwnership(po, req)) return res.status(404).json({ success: false, message: 'Not found' });

    const items = await PurchaseOrderItem.findAll({
      where: { purchase_order_id: id },
      order: [['id', 'ASC']]
    });

    // 판매자가 외부인지 — 외부면 업로드된 인보이스가 원본이고 우리 청구서는 추정치다(§5)
    let sellerIsExternal = false;
    let sellerName = null;
    if (po.seller_type === 'supplier') {
      const sc = await SupplierCompany.findByPk(po.seller_entity_id, { attributes: ['id', 'name', 'is_system_registered'] });
      if (sc) { sellerIsExternal = !sc.is_system_registered; sellerName = sc.name; }
    }

    // 라인이 가리키는 판매자 상품 — 대조 확정 후 "이 가격으로 판매상품가를 바꿀까?" 대상
    const mapIds = items.map((i) => i.ingredient_seller_product_id).filter(Boolean);
    const maps = mapIds.length
      ? await IngredientSellerProduct.findAll({
          where: { id: mapIds },
          attributes: ['id', 'seller_type', 'seller_entity_id', 'seller_product_id', 'unit_price']
        })
      : [];
    const mapById = new Map(maps.map((m) => [m.id, m]));

    // 판매자 상품의 **이름 2종** — 매칭에 쓴다 (2026-09-10 Fable D3).
    //   `name`         우리가 등록한 그 판매자 상품명
    //   `invoice_name` 그 판매자가 **자기 인보이스에 찍는 이름** (사람이 한 번 짝지어 준 것)
    // 지금까지 GET 이 이름을 아예 안 보내서, 화면이 늘 우리 내부 이름으로만 맞추고 있었다.
    const supplierProductIds = [...new Set(maps
      .filter((m) => m.seller_type === 'supplier' && m.seller_product_id)
      .map((m) => m.seller_product_id))];
    const spById = new Map();
    if (supplierProductIds.length) {
      const sps = await SupplierProduct.findAll({
        where: { id: supplierProductIds },
        attributes: ['id', 'name', 'invoice_name'],
      });
      for (const sp of sps) spById.set(sp.id, sp);
    }

    res.json({
      success: true,
      data: {
        purchase_order: {
          id: po.id, po_number: po.po_number, status: po.status, payment_status: po.payment_status,
          currency: po.currency, subtotal: po.subtotal, tax_amount: po.tax_amount, total_amount: po.total_amount,
          seller_type: po.seller_type, seller_entity_id: po.seller_entity_id,
          seller_is_external: sellerIsExternal, seller_name: sellerName,
          external_invoice_url: po.external_invoice_url,
          external_invoice_filename: po.external_invoice_filename,
          external_invoice_uploaded_at: po.external_invoice_uploaded_at,
          invoice_number: po.invoice_number, invoice_date: po.invoice_date,
          invoice_total: po.invoice_total, invoice_tax: po.invoice_tax,
          invoice_delivery: po.invoice_delivery, invoice_discount: po.invoice_discount,
          invoice_reconciled_at: po.invoice_reconciled_at,
          invoice_reconciled_by_user_id: po.invoice_reconciled_by_user_id
        },
        items: items.map((it) => {
          const m = mapById.get(it.ingredient_seller_product_id);
          return {
            id: it.id,
            description: it.description,
            unit: it.unit,
            quantity_ordered: it.quantity_ordered,
            quantity_received: it.quantity_received,
            // 발주 시점 합의가 — 절대 덮어쓰지 않는 스냅샷
            unit_price: it.unit_price,
            line_total: it.line_total,
            // 대조로 확정된 실제값 (null = 미대조)
            invoiced_unit_price: it.invoiced_unit_price,
            invoiced_quantity: it.invoiced_quantity,
            ingredient_seller_product_id: it.ingredient_seller_product_id,
            seller_product_id: m ? m.seller_product_id : null,
            seller_type: m ? m.seller_type : null,
            seller_entity_id: m ? m.seller_entity_id : null,
            seller_product_name: (m && spById.get(m.seller_product_id)) ? spById.get(m.seller_product_id).name : null,
            seller_invoice_name: (m && spById.get(m.seller_product_id)) ? spById.get(m.seller_product_id).invoice_name : null
          };
        })
      }
    });
  } catch (err) {
    console.error('GET /purchase-orders/:id/reconcile error:', err);
    res.status(500).json({ success: false, message: 'Failed to load reconciliation data' });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/purchase-orders/:id/reconcile — 사람이 확인한 숫자를 확정
//
// body: {
//   invoice: { number, date, total, tax, delivery, discount },
//   lines:   [{ item_id, invoiced_unit_price, invoiced_quantity, apply_to_seller_price }],
// }
// `apply_to_seller_price` 가 true 인 라인만 판매상품가를 바꾸고 원가 전파를 태운다.
// ─────────────────────────────────────────────────────────────────────────────
router.post('/purchase-orders/:id/reconcile', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!Number.isFinite(id)) return res.status(404).json({ success: false, message: 'Not found' });

  const po = await PurchaseOrder.findByPk(id);
  if (!po || !checkPOOwnership(po, req)) return res.status(404).json({ success: false, message: 'Not found' });

  const body = req.body || {};
  const lines = Array.isArray(body.lines) ? body.lines : [];
  if (!lines.length) return res.status(400).json({ success: false, message: 'lines required' });

  // 라인은 이 발주의 것만 — 남의 발주 라인 id 를 섞어 보내는 것을 막는다
  const items = await PurchaseOrderItem.findAll({ where: { purchase_order_id: id } });
  const itemById = new Map(items.map((i) => [i.id, i]));
  for (const l of lines) {
    if (!itemById.has(parseInt(l.item_id, 10))) {
      return res.status(400).json({ success: false, message: `Line ${l.item_id} is not part of this order` });
    }
    if (money(l.invoiced_unit_price) === null) {
      return res.status(400).json({ success: false, message: `Line ${l.item_id}: invoiced_unit_price must be a non-negative number` });
    }
    if (l.invoiced_quantity !== undefined && l.invoiced_quantity !== null && money(l.invoiced_quantity) === null) {
      return res.status(400).json({ success: false, message: `Line ${l.item_id}: invoiced_quantity must be a non-negative number` });
    }
  }

  const inv = body.invoice || {};
  const actor = {
    changed_by_user_id: req.user && req.user.id,
    changed_by_name: req.user && (req.user.name || req.user.email)
  };

  const t = await sequelize.transaction();
  try {
    // ① 라인별 청구 실측값 — 발주 스냅샷 unit_price 는 손대지 않는다
    //   함께: 그 줄이 인보이스에서 어떤 이름으로 불렸는지를 판매자 상품에 기억시킨다(이름 사전).
    //   ⛔ 쓰기 대상은 **이 발주의 라인이 가리키는 판매자 상품**뿐이다 — 발주 소유권 검사를
    //     이미 통과한 경로라 별도 권한 문을 만들지 않는다(남의 매장 상품은 닿을 수 없다).
    const itemIds = lines.map((l) => parseInt(l.item_id, 10)).filter(Number.isFinite);
    const ownItems = itemIds.length
      ? await PurchaseOrderItem.findAll({
          where: { id: itemIds, purchase_order_id: po.id },
          attributes: ['id', 'ingredient_seller_product_id'], transaction: t })
      : [];
    const ownItemById = new Map(ownItems.map((i) => [i.id, i]));

    for (const l of lines) {
      const itemId = parseInt(l.item_id, 10);
      await PurchaseOrderItem.update({
        invoiced_unit_price: money(l.invoiced_unit_price),
        invoiced_quantity: l.invoiced_quantity === undefined ? null : money(l.invoiced_quantity)
      }, { where: { id: itemId }, transaction: t });

      // 이름 사전 갱신 — 값이 실제로 왔을 때만, 그리고 **이 발주의 라인일 때만**
      const alias = typeof l.invoice_line_name === 'string' ? sanitizeString(l.invoice_line_name).trim().slice(0, 255) : '';
      const own = ownItemById.get(itemId);
      if (alias && own && own.ingredient_seller_product_id) {
        const map = await IngredientSellerProduct.findByPk(own.ingredient_seller_product_id, { transaction: t });
        if (map && map.seller_type === 'supplier' && map.seller_product_id) {
          await SupplierProduct.update({ invoice_name: alias },
            { where: { id: map.seller_product_id }, transaction: t });
        }
      }
    }

    // ② 인보이스 헤더 — 세금·배송·할인은 라인에 섞지 않고 여기 따로 앉는다
    await po.update({
      invoice_number: inv.number ? sanitizeString(String(inv.number)) : po.invoice_number,
      invoice_date: inv.date || po.invoice_date,
      invoice_total: money(inv.total),
      invoice_tax: money(inv.tax),
      invoice_delivery: money(inv.delivery),
      invoice_discount: money(inv.discount),
      invoice_reconciled_at: new Date(),
      invoice_reconciled_by_user_id: actor.changed_by_user_id || null
    }, { transaction: t });

    await t.commit();
  } catch (err) {
    await t.rollback();
    console.error('POST /purchase-orders/:id/reconcile error:', err);
    return res.status(500).json({ success: false, message: 'Failed to save reconciliation' });
  }

  // ③ 원가 전파 — 커밋 뒤에 돈다. 전파가 실패해도 대조 기록은 살아야 한다
  //    (supplier-products.js:815 과 같은 규칙). 전파는 판매상품가를 고치는 것으로만 일어난다.
  const propagated = [];
  const failed = [];
  const retroResults = [];
  for (const l of lines) {
    const item0 = itemById.get(parseInt(l.item_id, 10));

    // 과거 발주 소급 (설계 §4) — **판매가 반영과 별개 옵션**이다.
    //   대상은 같은 매핑의 미결제·미수령·미대조 라인뿐이고, 결제된 발주는 절대 건드리지 않는다.
    //   기본은 꺼짐 — 사람이 켤 때만 돈다.
    if (l.retro_apply && item0 && item0.ingredient_seller_product_id) {
      const retroPrice = money(l.invoiced_unit_price);
      if (retroPrice !== null) {
        try {
          const { applyRetro } = require('../services/retroApplyPrice');
          const out = await applyRetro({
            mappingId: item0.ingredient_seller_product_id,
            buyer: { type: po.entity_type, id: po.entity_id },
            newPrice: retroPrice, excludePoId: po.id,
            actor, note: `인보이스 대조 소급 — ${po.po_number}`
          });
          retroResults.push({ item_id: item0.id, ...out });
        } catch (e) {
          console.error(`[reconcile] 라인 ${l.item_id} 소급 실패:`, e.message);
          retroResults.push({ item_id: item0.id, error: e.message });
        }
      }
    }

    if (!l.apply_to_seller_price) continue;
    const item = item0;
    if (!item || !item.ingredient_seller_product_id) continue;
    try {
      const map = await IngredientSellerProduct.findByPk(item.ingredient_seller_product_id);
      if (!map || map.seller_type !== 'supplier') continue; // 지금은 공급업체 상품만 (설계 §3 진입점)
      const sp = await SupplierProduct.findByPk(map.seller_product_id);
      if (!sp) continue;
      const newPrice = money(l.invoiced_unit_price);
      if (newPrice === null) continue;

      // ⛔ **내가 등록한 외부 공급업체의 상품만** 가격을 고칠 수 있다.
      //   가입(플랫폼) 공급업체의 상품가는 그 공급업체 소유다 — 여기서 덮으면 같은 상품을 사는
      //   **다른 매장의 원가까지** 같이 움직인다(dev 실측: 한 상품에 매핑 4개). 크로스테넌트 쓰기다.
      //   외부 공급업체는 우리가 등록한 장부일 뿐이라 구매자가 고쳐도 되고, 그게 설계 §5 의 전제다.
      const sc = await SupplierCompany.findByPk(sp.supplier_company_id,
        { attributes: ['id', 'name', 'is_system_registered', 'registered_by_entity_type', 'registered_by_entity_id'] });
      const ownedExternal = !!sc && !sc.is_system_registered
        && sc.registered_by_entity_type === po.entity_type
        && Number(sc.registered_by_entity_id) === Number(po.entity_id);
      if (!ownedExternal) {
        propagated.push({
          item_id: item.id,
          seller_product_id: sp.id,
          new_price: null,
          moved: 0,
          targets: [{ changed: false, reason: sc && sc.is_system_registered
            ? '가입 공급업체의 판매가는 공급업체만 바꿉니다 — 청구값은 기록됐습니다'
            : '내가 등록한 외부 공급업체가 아닙니다 — 청구값은 기록됐습니다' }]
        });
        continue;
      }

      await sp.update({ unit_price: newPrice });
      const out = await recomputeForSellerProduct('supplier', sp.id, {
        sequelize,
        ctx: {
          source: 'invoice_reconcile',
          entity_type: po.entity_type,
          entity_id: po.entity_id,
          seller_type: 'supplier',
          seller_entity_id: map.seller_entity_id,
          purchase_order_id: po.id,
          note: `인보이스 대조 — ${po.po_number}`,
          ...actor
        }
      });
      // 판매상품가는 바뀌어도 원가가 안 움직일 수 있다 — 그 재료가 **다른 공급처를 선호**로 두고
      // 있으면 costSync 가 선호 쪽 가격을 쓴다(services/costSync.js 규칙 1). 화면이 "왜 안 움직였나"를
      // 말할 수 있도록 각 대상의 결과를 그대로 돌려준다. 조용히 0 만 주면 결함처럼 보인다.
      propagated.push({
        item_id: item.id,
        seller_product_id: sp.id,
        new_price: newPrice,
        moved: out.filter((x) => x && x.changed).length,
        targets: out.map((x) => (x && x.changed
          ? { changed: true, from: x.from, to: x.to, source: x.source, name: x.name }
          : { changed: false, reason: (x && (x.skip || '값 변화 없음')) || '대상 없음' }))
      });
    } catch (e) {
      console.error(`[reconcile] 라인 ${l.item_id} 전파 실패:`, e.message);
      failed.push({ item_id: l.item_id, message: e.message });
    }
  }

  // ④ 우리 청구서를 업로드 인보이스 값으로 맞춘다 (설계 §5-3) — **외부 공급업체 건만**.
  //    우리가 자동 발행한 거래 청구서는 추정치이고, 매장이 올린 인보이스가 원본이다.
  //    ⛔ 이미 결제된 청구서는 건드리지 않는다(서비스가 사유를 돌려준다).
  //    커밋 뒤에 돈다 — 실패해도 대조 기록은 살아야 한다.
  let invoiceSync = { synced: false, reason: null };
  try {
    const { syncTradeInvoiceFromReconcile } = require('../services/reconcileInvoiceSync');
    invoiceSync = await syncTradeInvoiceFromReconcile(po.id, { actorId: actor.changed_by_user_id });
  } catch (e) {
    console.error(`[reconcile] 청구서 동기화 실패 (발주 ${po.id}):`, e.message);
    invoiceSync = { synced: false, reason: `청구서 동기화 실패: ${e.message}` };
  }

  const fresh = await PurchaseOrder.findByPk(id);
  res.json({
    success: true,
    data: {
      purchase_order: fresh,
      lines_saved: lines.length,
      // 청구서를 고쳤는지 / 왜 안 고쳤는지 그대로 돌려준다 — 조용히 넘어가면 금액이 어긋난 채 남는다
      invoice_sync: invoiceSync,
      // 과거 발주 소급 결과 (켠 라인만). batch_id 로 되돌릴 수 있다.
      retro: retroResults,
      propagated,
      // 전파 실패는 숨기지 않는다 — 대조는 저장됐고 원가만 못 따라간 상태다
      propagation_failed: failed
    }
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/cost-changes?subject_type=&subject_id=&limit= — §7 표시 동기화
// 재고/재료 상세 · 공급업체 상품 목록 · 레시피 원가 칸이 **같은 API 하나**를 읽는다.
// ─────────────────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────
// GET  /api/purchase-orders/:id/retro-preview?item_id=&price=  — 소급 대상 미리보기
// POST /api/purchase-orders/:id/retro-revert                   — 소급 되돌리기(batch_id)
// 설계 §4. 미리보기는 쓰지 않는다 — 사람이 몇 건인지 보고 켠다.
// ─────────────────────────────────────────────────────────────────────────────
router.get('/purchase-orders/:id/retro-preview', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const po = await PurchaseOrder.findByPk(id);
    if (!po || !checkPOOwnership(po, req)) return res.status(404).json({ success: false, message: 'Not found' });
    const item = await PurchaseOrderItem.findOne({
      where: { id: parseInt(req.query.item_id, 10), purchase_order_id: id }
    });
    if (!item || !item.ingredient_seller_product_id) {
      return res.json({ success: true, data: { targets: [], reason: '이 라인에는 연결된 공급처가 없습니다' } });
    }
    const { previewRetroTargets } = require('../services/retroApplyPrice');
    const targets = await previewRetroTargets({
      mappingId: item.ingredient_seller_product_id,
      buyer: { type: po.entity_type, id: po.entity_id },
      excludePoId: po.id
    });
    res.json({ success: true, data: { targets, count: targets.length } });
  } catch (err) {
    console.error('GET retro-preview error:', err);
    res.status(500).json({ success: false, message: 'Failed to preview' });
  }
});

router.post('/purchase-orders/:id/retro-revert', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const po = await PurchaseOrder.findByPk(id);
    if (!po || !checkPOOwnership(po, req)) return res.status(404).json({ success: false, message: 'Not found' });
    const batchId = sanitizeString(String(req.body?.batch_id || ''));
    if (!batchId) return res.status(400).json({ success: false, message: 'batch_id required' });
    const { revertRetro } = require('../services/retroApplyPrice');
    const out = await revertRetro({
      batchId,
      actor: { changed_by_user_id: req.user && req.user.id, changed_by_name: req.user && (req.user.name || req.user.email) }
    });
    res.json({ success: true, data: out });
  } catch (err) {
    console.error('POST retro-revert error:', err);
    res.status(500).json({ success: false, message: 'Failed to revert' });
  }
});

const SUBJECT_TYPES = ['seller_product', 'ingredient', 'product_ingredient', 'po_item'];

router.get('/cost-changes', async (req, res) => {
  try {
    const subjectType = String(req.query.subject_type || '');
    const subjectId = parseInt(req.query.subject_id, 10);
    if (!SUBJECT_TYPES.includes(subjectType)) {
      return res.status(400).json({ success: false, message: `subject_type must be one of ${SUBJECT_TYPES.join(', ')}` });
    }
    if (!Number.isFinite(subjectId)) {
      return res.status(400).json({ success: false, message: 'subject_id required' });
    }
    const limit = Math.min(parseInt(req.query.limit, 10) || 20, 100);

    // 구매자 범위 — 자기 것만 본다. 판매자 상품 이력은 구매자 구분이 없으니(entity 가 null)
    // 그 경우만 열어 둔다. SA 전환 없이 들어오면 전체.
    const where = ['subject_type = :st', 'subject_id = :si'];
    const repl = { st: subjectType, si: subjectId, limit };
    if (req.buyerEntity) {
      // ⛔ entity 가 비어 있는 행을 무조건 열어주면 안 된다. 판매자가 자기 상품가를 고쳐서 생긴
      //   재료 원가 이력은 구매자 정보 없이 남는데(services/costSync 의 seller_edit),
      //   그 재료는 **남의 매장 것일 수 있다.** 지금 그런 행이 0건이라 아직 새지 않았을 뿐이다.
      //   판매자 상품(seller_product) 이력만 구매자 없이 존재하는 것이 정상이고,
      //   그것도 **내가 실제로 그 상품을 쓰는 매핑을 가진 경우에만** 보여준다.
      if (subjectType === 'seller_product') {
        const [linked] = await sequelize.query(
          `SELECT 1 AS ok FROM ingredient_seller_products isp
             LEFT JOIN ingredients i ON i.id = isp.ingredient_id
            WHERE isp.seller_product_id = :sp AND isp.is_active = 1
              AND ((:et = 'restaurant' AND i.restaurant_id = :ei)
                OR (:et = 'brand' AND i.brand_id = :ei)
                OR (:et = 'foodcourt' AND i.foodcourt_id = :ei))
            LIMIT 1`,
          { type: QueryTypes.SELECT, replacements: { sp: subjectId, et: req.buyerEntity.type, ei: req.buyerEntity.id } });
        if (!linked) return res.json({ success: true, data: { latest: null, history: [] } });
        where.push('(entity_type IS NULL OR (entity_type = :et AND entity_id = :ei))');
      } else {
        where.push('entity_type = :et AND entity_id = :ei');
      }
      repl.et = req.buyerEntity.type;
      repl.ei = req.buyerEntity.id;
    }

    const rows = await sequelize.query(
      `SELECT id, subject_type, subject_id, entity_type, entity_id, seller_type, seller_entity_id,
              old_value, new_value, unit, source, purchase_order_id, batch_id,
              changed_by_user_id, changed_by_name, note, changed_at
         FROM cost_change_logs
        WHERE ${where.join(' AND ')}
        ORDER BY changed_at DESC, id DESC
        LIMIT :limit`,
      { type: QueryTypes.SELECT, replacements: repl });

    res.json({ success: true, data: { latest: rows[0] || null, history: rows } });
  } catch (err) {
    console.error('GET /cost-changes error:', err);
    res.status(500).json({ success: false, message: 'Failed to load cost changes' });
  }
});

module.exports = router;
