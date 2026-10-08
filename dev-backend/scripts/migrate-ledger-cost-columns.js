/**
 * 재고 장부에 금액 칸 추가 (2026-10-08 · Fable 판정 `.claude/fable-verdict-20261008-inventory-po-cost.md` Ⅱ-2-A·C)
 *
 * ① inventory_transactions.unit_cost  DECIMAL(12,4) NULL — 그 순간 원가(기준양 base_quantity 의 가격) 스냅샷
 * ② inventory_transactions.cost_value DECIMAL(12,2) NULL — 이 줄의 금액(부호 = quantity_change 부호)
 * ③ inventory_transactions.base_quantity DECIMAL(10,2) NULL — 금액을 낸 기준양(나중에 재료 기준양이 바뀌어도 이 줄 금액을 다시 설명할 수 있게)
 * ④ inventory_transactions.reason_code VARCHAR(32) NULL — 폐기·조정 사유 코드(어휘 = utils/wasteReasons.js, DB ENUM 아님)
 * ⑤ cost_change_logs.source ENUM 에 'receive'·'production' 추가(expand-only) — 수령·만들기가 매장 원가를 바꾼 이력
 * (일반재고 general_stock_transactions 는 이미 unit_cost·total_cost 두 칸이 있어 추가하지 않는다 — 같은 개념에 칸 두 벌 금지)
 *
 * ⛔ 백필 금지 — 지난 줄은 그때 원가를 모른다. NULL 은 리포트에서 «금액 미상» 으로 센다.
 * 성질: 멱등(칸이 있으면 건너뜀) · 칸은 전부 NULL 허용이라 옛 코드와 공존(되돌리기 = 칸을 둔 채 옛 코드).
 */
require('dotenv/config');
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');
const { expandEnum } = require('./lib/enumExpand');

const COLUMNS = [
  ['inventory_transactions', 'unit_cost', "DECIMAL(12,4) NULL COMMENT '그 순간 원가(기준양의 가격) 스냅샷'"],
  ['inventory_transactions', 'cost_value', "DECIMAL(12,2) NULL COMMENT '이 줄 금액(부호=수량 부호)'"],
  ['inventory_transactions', 'base_quantity', "DECIMAL(10,2) NULL COMMENT '금액을 낸 기준양'"],
  ['inventory_transactions', 'reason_code', "VARCHAR(32) NULL COMMENT '폐기·조정 사유 코드(utils/wasteReasons.js)'"],
];

async function main() {
  let added = 0;
  for (const [table, col, def] of COLUMNS) {
    const exists = await sequelize.query(
      `SELECT COLUMN_NAME FROM information_schema.COLUMNS
        WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = :table AND COLUMN_NAME = :col`,
      { type: QueryTypes.SELECT, replacements: { table, col } }
    );
    if (exists.length) { console.log(`[ledger-cost] ${table}.${col} 이미 존재 — skip`); continue; }
    await sequelize.query(`ALTER TABLE \`${table}\` ADD COLUMN \`${col}\` ${def}`);
    console.log(`[ledger-cost] ${table}.${col} 추가`);
    added++;
  }
  const r = await expandEnum(sequelize, 'cost_change_logs', 'source', ['receive', 'production']);
  console.log(`[ledger-cost] cost_change_logs.source 추가값: ${r.added.length ? r.added.join(',') : '없음'}`);
  console.log(`[ledger-cost] 완료 — 추가 ${added}칸`);
}

main()
  .then(() => process.exit(0))
  .catch((e) => { console.error('[ledger-cost] 실패:', e.message); process.exit(1); });
