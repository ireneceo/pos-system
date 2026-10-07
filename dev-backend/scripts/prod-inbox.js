#!/usr/bin/env node
/**
 * 운영 «들어온 업무» 읽기 — /개발시작 1-B단계 (2026-10-07 Irene «개발시작에 실제 들어온 업무문의와 피드백 확인해서 판단하고 조치하게»)
 *
 * ⛔ 읽기 전용. SELECT 만 한다 — 운영 DB 에 쓰지 않는다(답장·상태 변경은 Irene 지시 때만).
 *
 * 실행(개발서버에서):
 *   scp dev-backend/scripts/prod-inbox.js irene@87.106.78.146:/tmp/prod-inbox.js && \
 *   ssh irene@87.106.78.146 'cd /var/www/production-backend && timeout 60 node /tmp/prod-inbox.js --days=14; rm -f /tmp/prod-inbox.js'
 *
 * 보는 곳
 *   ① support_tickets  — 매장·브랜드가 플랫폼에 보낸 시스템 문의(버그·기능 요청·자동 오류 신고). 열린 것 전부 + 최근 N일 새 글
 *   ② comments(support_ticket) — 그 문의에 달린 후속 글(최근 N일). 고객이 다시 쓴 글이 여기 온다
 *   ③ contact_inquiries — 랜딩 문의(체험·가격·데모). 아직 처리 안 된 것
 *   ④ operation_tickets — 매장↔브랜드/푸드코트 운영 문의. 개발 업무가 아니라 개수만
 */
const path = require('path');
const base = process.cwd();
const { sequelize } = require(path.join(base, 'config/database'));

const daysArg = (process.argv.find((a) => a.startsWith('--days=')) || '--days=14').split('=')[1];
const DAYS = Math.max(1, Math.min(90, parseInt(daysArg, 10) || 14));

const q = async (sql, replacements = {}) => (await sequelize.query(sql, { replacements }))[0];
const cut = (s, n) => String(s == null ? '' : s).replace(/\s+/g, ' ').trim().slice(0, n);
const day = (d) => (d ? new Date(d).toISOString().replace('T', ' ').slice(0, 16) + 'Z' : '-');

(async () => {
  console.log(`=== 운영 들어온 업무 (읽기 전용 · 최근 ${DAYS}일 · ${day(new Date())}) ===\n`);

  const tickets = await q(`
    SELECT id, ticketNumber, status, priority, category, createdAt, updatedAt,
           customerName, customerRole, restaurantName, subject, description
      FROM support_tickets
     WHERE status IN ('open','in-progress') OR createdAt > NOW() - INTERVAL :d DAY
     ORDER BY createdAt DESC`, { d: DAYS });
  console.log(`① 시스템 문의 — 열린 것 + 최근 새 글: ${tickets.length}건`);
  for (const t of tickets) {
    console.log(`- ${t.ticketNumber} [${t.status}/${t.priority}/${t.category}] ${day(t.createdAt)} · ${t.customerRole || '-'} ${t.customerName || ''}${t.restaurantName ? ' @' + t.restaurantName : ''}`);
    console.log(`  제목: ${cut(t.subject, 200)}`);
    console.log(`  내용: ${cut(t.description, 1500)}`);
  }

  const comments = await q(`
    SELECT c.entity_id, c.author_name, c.author_role, c.content, c.createdAt, c.is_internal, s.ticketNumber, s.status
      FROM comments c LEFT JOIN support_tickets s ON s.id = c.entity_id
     WHERE c.entity_type = 'support_ticket' AND c.createdAt > NOW() - INTERVAL :d DAY
     ORDER BY c.createdAt`, { d: DAYS });
  console.log(`\n② 시스템 문의 후속 글(최근): ${comments.length}건`);
  for (const c of comments) {
    console.log(`- ${c.ticketNumber || c.entity_id} [문의 ${c.status || '?'}] ${day(c.createdAt)} · ${c.author_role || '-'} ${c.author_name || ''}${c.is_internal ? ' (내부 메모)' : ''}`);
    console.log(`  ${cut(c.content, 800)}`);
  }

  const contacts = await q(`
    SELECT id, inquiry_type, status, createdAt, name, company_name, interested_plan, message
      FROM contact_inquiries
     WHERE status IN ('new','in_progress') OR createdAt > NOW() - INTERVAL :d DAY
     ORDER BY createdAt DESC`, { d: DAYS });
  console.log(`\n③ 랜딩 문의 — 미처리 + 최근: ${contacts.length}건`);
  for (const c of contacts) {
    console.log(`- #${c.id} [${c.status}/${c.inquiry_type}] ${day(c.createdAt)} · ${c.name || '-'}${c.company_name ? ' / ' + c.company_name : ''}${c.interested_plan ? ' · ' + c.interested_plan : ''}`);
    console.log(`  ${cut(c.message, 600)}`);
  }

  const ops = await q(`SELECT status, COUNT(*) c FROM operation_tickets GROUP BY status`);
  console.log(`\n④ 운영 문의(매장↔브랜드, 개발 업무 아님): ${ops.map((o) => o.status + ' ' + o.c).join(' · ') || '0'}`);

  process.exit(0);
})().catch((e) => { console.error('읽기 실패:', e.message); process.exit(1); });
