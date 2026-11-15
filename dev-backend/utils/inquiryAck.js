/**
 * 시스템 문의 접수 확인 — 보낼지 판단 (2026-11-15 · Fable 설계 .claude/fable-design-20261115-inquiry-autoreply-board.md §2-3)
 * 고정 문구 접수 확인만. 보내지 않는 경우:
 *  - 제목이 «[auto]» 로 시작 — 화면이 스스로 올린 오류 신고(고객이 쓴 글이 아님)
 *  - 종류 diagnostic
 *  - 문의 주인이 System Admin — 우리 쪽이 만든 문의
 * 문의 대화에 답글 줄을 넣거나 상태를 바꾸지 않는다(점검 방의 «아직 답 안 함» 판단이 틀어짐).
 */
// 화면이 스스로 올린 오류 신고(utils/reportIssue.ts 제목 «[auto] 경로 — 오류»)
function isAutoReport(ticket) {
  return !!ticket && /^\s*\[auto\]/i.test(String(ticket.subject || ''));
}

function shouldAcknowledgeTicket(ticket) {
  if (!ticket || !ticket.customerId) return false;
  if (isAutoReport(ticket)) return false;
  if (String(ticket.category || '') === 'diagnostic') return false;
  if (String(ticket.customerRole || '') === 'System Admin') return false;
  return true;
}

module.exports = { shouldAcknowledgeTicket, isAutoReport };
