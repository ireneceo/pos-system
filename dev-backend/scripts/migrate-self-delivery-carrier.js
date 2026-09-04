/**
 * scripts/migrate-self-delivery-carrier.js — 배송사 목록에 **직접 배송**을 넣는다.
 *
 * 배경 (2026-09-04 Irene): 브랜드가 출고를 'Mark As Shipped' 로 찍을 때
 *   Carrier 는 필수인데 목록에 Lalamove·Grab·J&T·Ninja Van·Pos Laju 뿐이라
 *   **자기 차로 직접 갖다 주는 경우 고를 것이 없었다.**
 *   (자유입력 칸이 있긴 하나, 매번 손으로 적으면 매장마다 표기가 갈린다.)
 *
 * 왜 특수 처리가 아니라 테이블 한 줄인가:
 *   `carriers.tracking_url_template` 은 nullable 이고, 화면은 이미
 *   "추적 URL 없는 배송사" 를 링크 대신 **평문**으로 그린다(IncomingOrdersView).
 *   그래서 한 줄만 넣으면 배송사를 쓰는 모든 화면에 자동으로 나온다 — 화면 코드 무변경.
 *   ⛔ 프론트에 `code === 'self'` 같은 분기를 만들지 말 것. 그게 두 번째 목록이 된다.
 *
 * 멱등: code 로 찾아 없을 때만 만든다. 이미 있으면 이름·정렬만 맞춘다.
 */
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

const CODE = 'self_delivery';
const NAME = 'Self Delivery';

(async () => {
  const rows = await sequelize.query('SELECT id, name, sort_order FROM carriers WHERE code = :c',
    { replacements: { c: CODE }, type: QueryTypes.SELECT });

  if (rows.length === 0) {
    await sequelize.query(
      `INSERT INTO carriers (code, name, tracking_url_template, is_active, sort_order, created_at, updated_at)
       VALUES (:c, :n, NULL, 1, 0, NOW(), NOW())`,
      { replacements: { c: CODE, n: NAME } });
    console.log(`+ 배송사 '${NAME}' (${CODE}) 추가 — 추적 URL 없음, 목록 맨 앞`);
  } else {
    // ⚠ `is_active` 는 건드리지 않는다. 이 마이그는 `deploy` 라 매 배포 재실행되는데,
    //    관리자가 이 배송사를 끈 뒤 다음 배포가 되살리면 **사람 결정을 기계가 덮는다**(Fable 2026-09-04).
    //    시드가 책임질 것은 존재·이름·정렬이지 켜짐/꺼짐 결정이 아니다.
    await sequelize.query('UPDATE carriers SET name = :n, sort_order = 0 WHERE code = :c',
      { replacements: { c: CODE, n: NAME } });
    console.log(`= 배송사 '${NAME}' (${CODE}) 이미 있음 — 이름·정렬만 맞춤 (활성 여부는 그대로)`);
  }

  const all = await sequelize.query('SELECT code, name FROM carriers WHERE is_active = 1 ORDER BY sort_order, id',
    { type: QueryTypes.SELECT });
  console.log('현재 목록: ' + all.map(r => r.name).join(' · '));
  process.exit(0);
})().catch((e) => { console.error(e.message); process.exit(1); });
