'use strict';
/**
 * 모자(컨텍스트) 상태 동기화 신호 — .claude/fable-design-20261016-staff-approval-live.md §3.1.
 *
 * 알림이 아니다: push_enabled·카테고리 게이트를 타지 않고(emitInApp/sendPushToUser 쓰지 말 것 —
 * 그건 'notification' 이벤트라 전원 토스트 + 게이트), 데이터도 싣지 않는다. «다시 읽어라» 만 전하고
 * 받는 쪽이 자기 권한으로 GET 한다. 이름·이메일·user_id 를 페이로드에 넣지 말 것(매장 룸엔 Staff 도 있다).
 *
 *   context:changed       → user:{userId}        (granted · rejected · revoked)   + label(토스트 문구용)
 *   context:store-changed → restaurant:{entityId} (모든 kind, entity_type='restaurant' 일 때)
 *
 * 실패해도 호출한 쓰기(승인 등)를 실패시키지 않는다 — 예외를 전부 삼킨다.
 */
const SUBJECT_KINDS = new Set(['granted', 'rejected', 'revoked']);

function emitContextChanged({ kind, userId, entityType, entityId, role, requestId = null, label = null }) {
  try {
    const server = require('../server');
    const io = server && server.io;
    if (!io) return;
    const ns = io.of('/notifications');
    const base = {
      kind,
      entity_type: entityType,
      entity_id: entityId != null ? Number(entityId) : null,
      role: role || null,
      request_id: requestId != null ? Number(requestId) : null,
      at: new Date().toISOString()
    };
    if (userId && SUBJECT_KINDS.has(kind)) {
      ns.to(`user:${userId}`).emit('context:changed', { ...base, label: label || null });
    }
    if (entityType === 'restaurant' && entityId) {
      ns.to(`restaurant:${entityId}`).emit('context:store-changed', base);
    }
  } catch (e) {
    // server 미준비·io 없음 — 신호는 부가
  }
}

module.exports = { emitContextChanged };
