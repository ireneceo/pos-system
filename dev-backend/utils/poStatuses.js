/**
 * 발주 상태 단일 소스 (P4-5, 2026-09-02).
 *
 * "수령 가능한 상태"가 라우트 파일 안에만 있어서, 화면이 그 목록을 알 방법이 없었다
 * (staging 은 `?status=draft` 하나만 물어볼 수 있었다). 화면과 서버가 **같은 목록**을 보게
 * 여기 한 곳에 둔다 — 프론트에 목록을 복사하면 상태가 늘 때 조용히 갈라진다.
 */

// 수령 처리를 열어 주는 상태. draft·pending_approval·cancelled·rejected·received·closed 는 제외.
//   (pending_approval 을 넣으면 오너 승인을 입고로 우회할 수 있다 — 2026-07-13 Fable)
const RECEIVABLE_STATUSES = ['submitted', 'confirmed', 'shipped', 'in_transit', 'delivered', 'partial_received'];

module.exports = { RECEIVABLE_STATUSES };
