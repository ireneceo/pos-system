// K-DINE IPC 보호 — 브랜드 2 «K-DINE with MIN» 의 «매장으로 보내기 멈춤»(menu_settings.push_frozen) 켜기
// (2026-11-08 Fable 설계 c 1-b · Irene «IPC는 건드리지 말고 케이다인누들만 다 보내게 해줘»)
//   푸시가 이제 브랜드 내용을 전부(이름·가격·사진·카테고리) 보내므로, 매장 8 IPC 판매 메뉴가 덮이지 않게
//   배포 순간부터 기계 가드를 세운다. 쓰는 곳 = brands 1행(브랜드 쪽 설정) — 매장 표 무접촉.
// 멱등: push_frozen 칸이 «아예 없을 때만» true 로 넣는다. 누가 화면에서 false 로 풀었으면 다시 켜지 않는다.
// 브랜드 2 가 없거나 이름이 다르면(개발서버 등) 아무것도 안 하고 끝(종료코드 0).
// 되돌리기: 브랜드 메뉴 › Settings 토글 «Pause sending to stores» 끄기.
// Usage: node scripts/migrate-brand-menu-push-frozen-ipc.js
const { sequelize } = require('../config/database');

const BRAND_ID = 2;
const BRAND_NAME = 'K-DINE with MIN';

(async () => {
  const [rows] = await sequelize.query('SELECT id, name, menu_settings FROM brands WHERE id = :id', { replacements: { id: BRAND_ID } });
  const b = rows[0];
  if (!b || b.name !== BRAND_NAME) {
    console.log(`= 브랜드 ${BRAND_ID} «${BRAND_NAME}» 없음 — 건너뜀`);
    process.exit(0);
  }
  let s = b.menu_settings;
  if (typeof s === 'string') { try { s = JSON.parse(s); } catch (_) { s = null; } }
  s = (s && typeof s === 'object') ? s : {};
  if ('push_frozen' in s) {
    console.log(`= 브랜드 ${BRAND_ID} push_frozen 이미 정해짐 (${s.push_frozen}) — 그대로`);
    process.exit(0);
  }
  s.push_frozen = true;
  const [res] = await sequelize.query('UPDATE brands SET menu_settings = :s WHERE id = :id',
    { replacements: { s: JSON.stringify(s), id: BRAND_ID } });
  console.log(`+ 브랜드 ${BRAND_ID} push_frozen = true (affected ${res.affectedRows})`);
  process.exit(0);
})().catch((e) => { console.error('migrate-brand-menu-push-frozen-ipc 실패:', e.message); process.exit(1); });
