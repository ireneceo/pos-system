// 직원 username 매장 네임스페이스 strip (백엔드).
// 내부 저장 형태 `r{restaurant_id}:{staffId}` (예: r16:server1) — routes/users.js 참조.
// 화면/티켓/리포트에 들어가는 표시값(cashier_name 등)에는 prefix 를 벗긴 깨끗한 값만 써야 한다.
function stripStaffNs(u) {
  if (u == null) return u;
  return String(u).replace(/^r\d+:/i, '');
}
module.exports = { stripStaffNs };
