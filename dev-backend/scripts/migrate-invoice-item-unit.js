#!/usr/bin/env node
/**
 * Migration — invoice_items.unit 추가 + 거래 인보이스 라인 재작성(공급업체 상품명 + 단위)
 *
 * 배경 (2026-08-31 Irene):
 *   ① "리스트에 숫자 위에 단위도 표시해야 할 것 같아. 인보이스랑 모든 곳에 다 단위 따라다녀야 할 것 같아."
 *   ② "공급업체에 보내는 건 우리 표시이름은 없어도 되지 않아? … 인보이스는 모두 공급업체에 보내는 건
 *      모두 공급업체 상품표시"
 *   ③ 기존분도 바꿀지 물으니 — "B로 해. 아직 발주관리 제대로 안해서 바꿔도 돼."
 *
 * 실측으로 확인된 문제 2가지:
 *   - `invoice_items` 에 **단위 컬럼이 아예 없다.** 발주 라인(`purchase_order_items.unit`)에는
 *     단위가 이미 있는데(dev 127건 중 119건) 거래 인보이스를 만들 때 통째로 버려졌다.
 *   - 인보이스 라인 이름이 `purchase_order_items.description` = **우리 내부 재고명 스냅샷**이었다.
 *     공급업체 상품명과 실제로 다르다 — 예: 우리 `Cheddar Cheese` ↔ 공급업체 `Fresh Whole Milk`,
 *     우리 `Beef Rib` ↔ 공급업체 `Australian Beef Rib`. 받는 쪽이 자기 창고와 대조를 못 한다.
 *
 * 조치:
 *   1. `invoice_items.unit` VARCHAR(50) NULL 추가 (추가 전용 · 기존 행 영향 0).
 *   2. 기존 거래 인보이스 라인을 발주 라인 기준으로 재작성 — 이름은 공급업체 상품명(없으면 내부명 폴백),
 *      단위는 발주 라인의 단위.
 *
 * 연결 고리는 **`purchase_orders.trade_invoice_id` FK** 를 쓴다(notes 문자열 파싱 아님).
 * 라인 대응은 양쪽 다 `id ASC` — `createTradeInvoice` 가 PO 라인 순서대로 만들었기 때문이고,
 * **개수가 다르면 그 인보이스는 건너뛴다**(짝이 안 맞는 상태에서 이름을 옮기면 엉뚱한 줄이 바뀐다).
 *
 * ⛔ 금액은 절대 건드리지 않는다 — 이름(description)과 단위(unit)만 쓴다.
 *
 * Usage:
 *   node scripts/migrate-invoice-item-unit.js --dry-run
 *   node scripts/migrate-invoice-item-unit.js
 *
 * 멱등성: 컬럼 있으면 ALTER skip. 재작성은 값이 이미 같으면 no-op(변경 0행).
 */

require('dotenv').config();
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

const DRY = process.argv.includes('--dry-run');
const log = (m) => console.log(`[migrate-invoice-item-unit]${DRY ? ' [DRY]' : ''} ${m}`);

async function hasColumn(table, column) {
  const rows = await sequelize.query(
    `SELECT COLUMN_NAME c FROM information_schema.columns
     WHERE table_schema = DATABASE() AND table_name = :table AND column_name = :column`,
    { replacements: { table, column }, type: QueryTypes.SELECT });
  return rows.length > 0;
}

async function run() {
  try {
    // ── 1. 컬럼 추가 (멱등) ───────────────────────────────────────────────
    if (await hasColumn('invoice_items', 'unit')) {
      log('skip ALTER — invoice_items.unit already present');
    } else {
      const sql = `ALTER TABLE invoice_items ADD COLUMN unit VARCHAR(50) NULL COMMENT '발주 라인에서 옮겨온 단위(kg/g/L/piece…). 발주 유래가 아닌 인보이스는 NULL'`;
      log(`적용 SQL: ${sql}`);
      if (!DRY) await sequelize.query(sql);
    }

    // ── 1-b. quantity INT → DECIMAL(10,2) (확장, 데이터 무손실) ───────────
    // 🔴 단위만 붙이고 수량이 정수면 "2.5 kg" 를 못 적는다 — 단위 없는 숫자보다 나쁜 상태다.
    //    `invoice_items.quantity` 가 `int` 라, 방금 배포된 BG 단위주문(kg·g 소수 발주,
    //    실증 2.5kg → RM75)이 거래 인보이스로 넘어가는 순간 **2 로 조용히 깎인다.**
    //    현재 소수 발주 라인은 0건이라 피해는 아직 없다(dev 실측 127건 중 0건) — 지금이 고칠 때다.
    // ✅ 금액 무영향 확인: 인보이스 합계는 `utils/invoiceCalculation.js` 가 **calculated_amount** 를
    //    더해서 낸다(quantity × unit_price 가 아니다). 수량은 표시용이라 타입을 넓혀도 금액이 안 변한다.
    // int → decimal 확장이라 기존 정수값은 그대로 보존된다(1 → 1.00).
    const qtyType = await sequelize.query(
      `SELECT column_type ct FROM information_schema.columns
       WHERE table_schema = DATABASE() AND table_name = 'invoice_items' AND column_name = 'quantity'`,
      { type: QueryTypes.SELECT });
    const isInt = /^int/i.test(qtyType[0]?.ct || '');
    if (!isInt) {
      log(`skip ALTER — invoice_items.quantity already ${qtyType[0]?.ct || '(unknown)'}`);
    } else {
      const sql = `ALTER TABLE invoice_items MODIFY COLUMN quantity DECIMAL(10,2) NOT NULL DEFAULT 1 COMMENT '소수 허용 — kg·g·L 단위 발주(2.5kg 등)가 정수로 깎이지 않게 (2026-08-31)'`;
      log(`적용 SQL: ${sql}`);
      if (!DRY) await sequelize.query(sql);
    }

    if (DRY) {
      const n = await sequelize.query(
        `SELECT COUNT(*) c FROM purchase_orders WHERE trade_invoice_id IS NOT NULL`,
        { type: QueryTypes.SELECT });
      log(`DRY-RUN — 재작성 대상 후보 발주 ${n[0].c}건. 실제 변경 없음`);
      process.exit(0);
    }

    // ── 2. 기존 거래 인보이스 라인 재작성 ────────────────────────────────
    const pos = await sequelize.query(
      `SELECT id, po_number, trade_invoice_id FROM purchase_orders
       WHERE trade_invoice_id IS NOT NULL ORDER BY id`,
      { type: QueryTypes.SELECT });

    let touchedInvoices = 0, touchedLines = 0, skippedMismatch = 0, unchanged = 0;

    for (const po of pos) {
      // 발주 라인 + 공급업체 상품명(다형 조인 — seller_type 으로 다리를 나눈다.
      // 타입 필터 없이 한쪽에 조인하면 ID 충돌로 가짜 행이 붙는다: 2026-08-30 실제 오측 사례)
      const poItems = await sequelize.query(
        `SELECT poi.id, poi.description, poi.unit, poi.quantity_ordered,
                COALESCE(sp.name, bp.name) AS seller_product_name
         FROM purchase_order_items poi
         LEFT JOIN ingredient_seller_products isp ON isp.id = poi.ingredient_seller_product_id
         LEFT JOIN supplier_products sp ON sp.id = isp.seller_product_id AND isp.seller_type = 'supplier'
         LEFT JOIN brand_products  bp ON bp.id = isp.seller_product_id AND isp.seller_type = 'brand'
         WHERE poi.purchase_order_id = :poId ORDER BY poi.id ASC`,
        { replacements: { poId: po.id }, type: QueryTypes.SELECT });

      const invItems = await sequelize.query(
        `SELECT id, description, unit, quantity FROM invoice_items WHERE invoice_id = :invId ORDER BY id ASC`,
        { replacements: { invId: po.trade_invoice_id }, type: QueryTypes.SELECT });

      if (!poItems.length || poItems.length !== invItems.length) {
        if (invItems.length) skippedMismatch++;
        continue;
      }

      let changedHere = 0;
      for (let i = 0; i < invItems.length; i++) {
        const src = poItems[i], dst = invItems[i];
        // 공급업체 상품명 우선, 없으면 내부명 폴백(옛 발주·외부 판매자도 빈칸이 되지 않게)
        const name = src.seller_product_name || src.description || dst.description;
        const unit = src.unit || null;
        // 수량도 발주 라인 기준으로 맞춘다 — 정수 컬럼이던 시절 깎였을 수 있어서.
        // 오늘 기준 소수 발주 0건이라 실제로는 no-op 이지만, 앞으로 들어올 2.5kg 류를 위해 규칙을 세운다.
        const qty = src.quantity_ordered != null ? Number(src.quantity_ordered) : Number(dst.quantity);
        const sameQty = Number(dst.quantity) === qty;
        if (dst.description === name && dst.unit === unit && sameQty) { continue; }
        await sequelize.query(
          `UPDATE invoice_items SET description = :name, unit = :unit, quantity = :qty WHERE id = :id`,
          { replacements: { name, unit, qty, id: dst.id } });
        changedHere++;
      }
      if (changedHere) { touchedInvoices++; touchedLines += changedHere; } else { unchanged++; }
    }

    log(`재작성: 인보이스 ${touchedInvoices}건 / 라인 ${touchedLines}건 변경 · 이미 일치 ${unchanged}건 · 라인수 불일치로 건너뜀 ${skippedMismatch}건`);

    // ── 3. 자가검증 ──────────────────────────────────────────────────────
    const chk = await sequelize.query(
      `SELECT COUNT(*) total, SUM(ii.unit IS NOT NULL) with_unit
       FROM invoice_items ii
       JOIN purchase_orders po ON po.trade_invoice_id = ii.invoice_id`,
      { type: QueryTypes.SELECT });
    log(`검증: 발주 유래 인보이스 라인 ${chk[0].total}건 중 단위 보유 ${chk[0].with_unit}건`);

    log('✓ done');
    process.exit(0);
  } catch (e) {
    console.error('[migrate-invoice-item-unit] ✗ failed:', e && e.message);
    process.exit(1);
  }
}
run();
