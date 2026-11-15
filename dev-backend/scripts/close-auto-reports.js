#!/usr/bin/env node
/**
 * 해결된 «화면 자동 오류 신고» 를 resolved 로 닫기 (2026-11-15 Irene «권고대로» · Fable 권고 ①)
 *
 * 대상: 제목이 «[auto]» 로 시작하는 시스템 문의만 (사람이 쓴 문의는 Irene 지시 때만 — 이 스크립트는 거절).
 * 닫는 조건 (둘 다): 고친 내용이 운영에 나간 시각(--fixed-at) 을 넘기고
 *                    그 시각 뒤 같은 화면 경로의 자동 신고가 0건.
 * 상태는 closed 가 아니라 resolved (사람이 닫은 것과 구분). DB 를 직접 고치므로 메일은 나가지 않는다.
 *
 * 사용 (운영 서버에서 — 정기 점검 방이 0-B 절차로):
 *   node scripts/close-auto-reports.js SUPP-2026-6842-103@2026-09-17T12:00:00Z SUPP-…@…          # 미리보기
 *   node scripts/close-auto-reports.js --apply SUPP-2026-6842-103@2026-09-17T12:00:00Z …            # 실제로 닫음
 * BACKEND_DIR 로 백엔드 폴더 지정 가능(기본: 이 파일의 상위 폴더).
 */
const path = require('path');
const BACKEND = process.env.BACKEND_DIR || path.join(__dirname, '..');
require(path.join(BACKEND, 'node_modules/dotenv')).config({ path: path.join(BACKEND, '.env') });
const { sequelize } = require(path.join(BACKEND, 'config/database'));

const OPEN = ['open', 'in-progress'];
const pathOf = (subject) => String(subject || '').replace(/^\s*\[auto\]\s*/i, '').split(' — ')[0].trim();

(async () => {
  const args = process.argv.slice(2);
  const apply = args.includes('--apply');
  const items = args.filter(a => !a.startsWith('--'));
  if (!items.length) { console.log('사용: [--apply] 문의번호@고친것이_운영에_나간_시각 …'); process.exit(2); }
  let bad = 0;
  for (const it of items) {
    const [num, fixedRaw] = it.split('@');
    const fixedAt = new Date(fixedRaw);
    if (!num || isNaN(fixedAt)) { console.log(`✗ ${it} — «번호@시각» 형식이 아님`); bad++; continue; }
    const [[t]] = await sequelize.query('SELECT id,ticketNumber,status,subject,createdAt FROM support_tickets WHERE ticketNumber=?', { replacements: [num] });
    if (!t) { console.log(`✗ ${num} — 없음`); bad++; continue; }
    if (!/^\s*\[auto\]/i.test(t.subject || '')) { console.log(`✗ ${num} — 자동 신고가 아님(사람이 쓴 문의는 닫지 않음)`); bad++; continue; }
    if (!OPEN.includes(t.status)) { console.log(`· ${num} — 이미 ${t.status} (그대로)`); continue; }
    if (new Date(t.createdAt) > fixedAt) { console.log(`✗ ${num} — 고친 시각보다 뒤에 들어온 신고(${new Date(t.createdAt).toISOString()})`); bad++; continue; }
    const p = pathOf(t.subject);
    const [[again]] = await sequelize.query(
      "SELECT COUNT(*) c FROM support_tickets WHERE subject LIKE '[auto]%' AND createdAt > ? AND subject LIKE ?",
      { replacements: [fixedAt, `%${p.replace(/[%_]/g, m => '\\' + m)} —%`] });
    if (Number(again.c) > 0) { console.log(`✗ ${num} — 고친 뒤에도 같은 화면(${p}) 자동 신고 ${again.c}건 → 닫지 않음`); bad++; continue; }
    if (!apply) { console.log(`○ ${num} — 닫을 수 있음 (화면 ${p} · 고친 뒤 재신고 0 · 미리보기)`); continue; }
    const [, meta] = await sequelize.query(
      "UPDATE support_tickets SET status='resolved', updatedAt=NOW() WHERE id=? AND status IN ('open','in-progress') AND subject LIKE '[auto]%'",
      { replacements: [t.id] });
    const [[after]] = await sequelize.query('SELECT status,updatedAt FROM support_tickets WHERE id=?', { replacements: [t.id] });
    console.log(`✓ ${num} — 바뀐 줄 ${meta && meta.affectedRows} · 지금 ${after.status} (화면 ${p} · 고친 뒤 재신고 0)`);
  }
  await sequelize.close();
  process.exit(bad ? 1 : 0);
})().catch(e => { console.error('오류', e.message); process.exit(1); });
