import { getAuthToken } from './auth';

/**
 * 받은 공지 모두 읽음 (2026-09-11).
 * 서버가 받은 목록(`GET /api/notices/received`)과 **같은 범위**로 읽음 처리한다 — 화면에서 id 를 모아 보내지 않는다.
 * ⚠ 인박스의 `/api/inbox/mark-all-read` 는 쓰지 않는다: 브랜드·푸드코트 총괄의 매장 공지를 범위에 넣지 않아
 *   공지 화면에서 누르면 일부가 안 읽힌 채 남는다.
 * @returns 읽음 처리한 수신 행 수. 실패하면 null.
 */
export async function markAllNoticesRead(): Promise<number | null> {
  try {
    const token = getAuthToken();
    const r = await fetch('/api/notices/mark-all-read', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    });
    const j = await r.json().catch(() => null);
    if (!r.ok || !j?.success) {
      console.error('[notices] mark-all-read failed', r.status, j?.message);
      return null;
    }
    return Number(j.data?.marked) || 0;
  } catch (e) {
    console.error('[notices] mark-all-read error', e);
    return null;
  }
}
