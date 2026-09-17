// 주문 감사기록 ENUM 에 'updated' 추가 (2026-09-17).
//   `routes/orders-crud.js:1135` 가 PATCH 마다 actionType:'updated' 로 기록을 남기는데 ENUM 에 그 값이
//   없어 MySQL 이 잘라내고 insert 가 실패했다. 실패는 warn 으로만 찍혀 **주문 수정 이력이 통째로 안 남았다**.
//   운영 로그 실측: 2026-09-17 07:25 에만 3건.
// ⚠ expand-only — 목록 하드코딩 교체 금지(scripts/lib/enumExpand).
// 멱등. Usage: node scripts/migrate-order-action-updated.js
const { sequelize } = require('../config/database');
const { expandEnum } = require('./lib/enumExpand');

(async () => {
  const r = await expandEnum(sequelize, 'order_actions', 'action_type', ['updated']);
  console.log(r.added.length ? `+ action_type 에 ${r.added.join(',')} 추가` : '= action_type 에 updated 이미 있음');
  console.log(`  현재 값 ${r.current.length}종`);
  console.log('Done.');
  process.exit(0);
})().catch(err => { console.error('Migration failed:', err); process.exit(1); });
