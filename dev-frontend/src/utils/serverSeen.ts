/**
 * serverSeen — «서버에서 마지막으로 응답이 온 때» 하나만 기억한다 (docs/OFFLINE_MODE_DESIGN.md §16-11).
 * 연결 확인 핑만 늦었을 뿐 다른 API 응답이 오고 있으면 끊긴 게 아니다 — OfflineContext 가 이것을 본다.
 * httpClient 가 /api 응답(status < 500, 서비스워커 캐시 아님)마다 noteServerSeen() 을 부른다. import 0(순환 없음).
 */
let lastSeenAt = 0;
export function noteServerSeen(): void { lastSeenAt = Date.now(); }
/** 마지막 서버 응답 뒤 지난 ms. 아직 없으면 Infinity. */
export function msSinceServerSeen(): number { return lastSeenAt ? Date.now() - lastSeenAt : Number.POSITIVE_INFINITY; }
