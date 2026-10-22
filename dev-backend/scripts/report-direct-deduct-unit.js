#!/usr/bin/env node
/**
 * 재고아이템 다이렉트 브랜드 상품 — 출고 차감 환산 읽기 보고 (쓰기 0)
 *   2026-10-22 Fable 판정 D3 (.claude/fable-design-20261022-direct-deduct-unit.md)
 *
 * 그날까지 출고·반품은 «1 주문단위 = 재고아이템 1» 로 뺐다. 규격이 1 이 아닌 상품(«500 g/pack»)은
 * 그만큼 덜 빠졌다. 이 스크립트는 그런 상품과 그 재고아이템에 남은 판매·반품 장부 줄 수를 **세기만** 한다.
 * 기계가 과거 숫자를 고치지 않는다 — 있으면 사람이 재고 조정으로 맞춘다.
 *
 * 사용: node scripts/report-direct-deduct-unit.js   (운영은 운영검증 때 production-backend 에서 같은 방식)
 */
require('dotenv').config({ quiet: true });
const { sequelize } = require('../config/database');
const { listDirectDeductRows } = require('../utils/directDeductAudit');

(async () => {
  const q = async (sql, r) => sequelize.query(sql, { replacements: r, type: sequelize.QueryTypes.SELECT });
  const rows = await listDirectDeductRows(q);
  const withPast = rows.filter((r) => r.sold_lines > 0 || r.return_lines > 0);
  console.log(`규격 있는(환산≠1) 또는 단위 안 맞는 다이렉트 상품: ${rows.length}건 · 그중 판매·반품 장부 줄이 있는 것: ${withPast.length}건`);
  for (const r of rows) {
    console.log(`  #${r.product_id} ${r.product_name} | ${r.sell_base} ${r.sell_unit} ↔ 재고아이템 #${r.stock_item_id} ${r.stock_unit}`
      + ` | 환산 ${r.conv}${r.compatible ? '' : ' (단위 안 맞음)'} | 판매 줄 ${r.sold_lines}(${r.sold_qty}) · 반품 줄 ${r.return_lines}(${r.return_qty})`);
  }
  await sequelize.close();
  process.exit(0);
})().catch((e) => { console.error(e.message); process.exit(1); });
