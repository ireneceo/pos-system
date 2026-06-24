// 직원 username 매장 네임스페이스 strip.
// 내부 저장 형태는 `r{restaurantId}:{staffId}` (예: r16:server1) — 매장별 같은 ID 재사용을
// 위해 전역 UNIQUE 를 우회하려고 prefix 를 붙인다(routes/users.js, docs/STAFF_ACCESS_AND_IDENTITY_DESIGN.md §6).
// 화면에는 항상 prefix 를 벗긴 깨끗한 ID(예: server1)만 보여줘야 한다.
// 기존에 StaffPage.tsx / StaffManagementPage.tsx 가 각자 로컬로 복제하던 동일 로직의 단일 소스.
export const stripStaffNs = (u?: string | null): string => (u || '').replace(/^r\d+:/i, '');

// 화면 표시용 직원 이름: full_name 우선, 없으면 prefix 벗긴 username.
export const displayStaffName = (
  fullName?: string | null,
  username?: string | null,
  fallback = 'Staff'
): string => (fullName && fullName.trim()) || stripStaffNs(username) || fallback;
