# Fable 게이트 판정 2026-10-16 — 직원(Staff 모자) 승인 즉시 반영 (RA 목록 + 상대 화면 실시간)

판정자: Fable(리더). 설계 `.claude/fable-design-20261016-staff-approval-live.md`. 구현 작업방 f320f0a8 (diff `/home/irene/.claude/jobs/f320f0a8/tmp/diff.patch` + locale 8파일 + session-state).
게이트 사유: `check-sensitive-diff` 대상(⑤ 보안 경계 — `users.js GET /` 범위 확장 · `socketService.js` 룸 판정). 돈·마이그·보호파일 접촉 0.

## 판정: **PASS**

## 1. diff 범위 대조 (설계 외 변경 0 인가)
| 설계 항목 | 구현 | 대조 |
|---|---|---|
| §3.1 `services/contextSignals.js` — 늦은 `require('../server').io` · 예외 삼킴 · 당사자 kind 3개만 · 매장 룸은 restaurant 일 때 · 페이로드에 이름/이메일/user_id 없음 | 그대로(41줄). `label` 은 당사자 전송에만 | ✓ |
| §3.2 호출 6곳 | POST(created) · approve(granted) · reject(rejected) · DELETE(cancelled — SELECT 1쿼리 뒤 DELETE, pending 만 신호) · users POST /:id/contexts(granted, label=entityName) · users DELETE(revoked, SELECT 에 entity_type 추가) | ✓ |
| §3.3 `GET /users?include_contexts=1` RA 분기 | 조건 `RA && include_contexts==='1' && (role 없음 or 'Staff')` — 역할 필터 조건은 설계에 없던 **합리적 추가**(role=RA 필터에 Staff 모자 행이 섞이지 않게; L4 가 단언). 행 shape 설계대로 · 네이티브 행 무변경 · 검색어는 JS 로 같은 3칸 | ✓ |
| §4.1 토스터 | 신호 2개 중계 · 토스트는 granted/rejected/revoked 만 · store-changed 토스트 없음 · 재연결 resync(첫 연결 제외) | ✓ |
| §4.2 AuthContext · §4.3 선택 화면(+visibilitychange, focus 안 씀) · §4.4 StaffPage(onChanged · 300ms 디바운스 · 배지 · 액션 숨김 · RA/SA 만 리스너) · §4.5 패널 | 그대로 | ✓ |
| §4.6 i18n | `auth:context.live.*` 3키 · `staff:staffPage.linkedAccount/linkedNoPin` · 4언어 전부 · `auth`·`staff` ns 는 i18n.ts 사전 로드 목록에 있음 | ✓ |
| §6 테스트 L1~L8 · §6.1 health-check 1건 · §10 문서 §6.4.1 · SW 5.96 | 있음 | ✓ |
| 무접촉 약속: `services/userContexts.js` · MainLayout · 인쇄 8 · KDS | git status 에 없음 · print-guard 8/8 | ✓ |

**설계 이탈 2건 — 둘 다 수용:**
1. `socketService.js` `/notifications` join: `auth.id` → `auth.userId || auth.id`. 근거 실측(판정자 재확인): 발급 토큰 3곳(`authService.js:110` · `auth.js:717/753 baseClaims` · `staff.js:34`)이 전부 `userId` 키 → `user:{id}` 룸은 지금까지 **한 번도 만들어진 적 없음**. 이 수정 없이는 설계의 당사자 신호가 원리상 전달 불가라 설계의 전제 결함을 바로잡은 것. 영향 범위: `user:` 룸으로 보내는 기존 호출자는 `pushService.sendPushToUser` 하나(`routes/push.js:173` 본인 시험 푸시) → 그동안 안 뜨던 in-app 토스트가 뜨게 되는 것뿐, 회귀 없음. 보안 경계 변화 0(토큰 신원만 믿는 원칙 그대로, 페이로드 무시 그대로). **FI-E 를 판정자가 직접 재현**: `auth.id` 로 되돌림 → 8건 중 4실패(당사자 수신 단언 전부) → 원복 cmp 0 → 8/8.
2. StaffPage 권한 태그 라벨에 `WORK_ACCESS` 포함 — 표시 결함(`access_pos` 날것) 수정, 2줄. 범위 안(같은 화면·같은 칸).

## 2. 가드·기계 게이트 (판정자 실행)
- `check-print-guard` 8/8 변경 없음 · `check-design-guard` 신규 위반 0
- jest `context-live`(L1~L8) + `context-requests` + `user-contexts-switch` + `socket-auth` = **76/76**
- 고장주입: 팀원 FI-A~E 5/5(원복 cmp 0) + 판정자 FI-E 재현 1회(위) — 양성·음성 단언 쌍(L1 «다른 매장 무수신»)이 있어 FI-B 류 오배달도 잡힌다.
- `check-sensitive-diff`: 대상(운영 스냅샷 대비 이전 묶음 포함) — 이 방 몫은 ⑤. 미들웨어·마운트·공개 라우트 변경 0 확인.
- `verify-all --full`(mount sweep 포함): 팀원 회차는 다른 솔루션 메모리 경합으로 강제 종료 → **판정자가 재실행** — 결과 아래 §4.

## 3. 실호출·실브라우저
- 서버: pm2 재시작(17:04:20) 이 변경 파일 mtime 뒤 · 서빙 번들 `main.ba86c630.js` 에 `context:store-changed` 포함 · 서빙 `sw.js` = 5.96 (17:17 빌드).
- 팀원 두 창 흐름 23/23 ×3(스크립트 `flow.js`) — 판정자는 스크린샷으로 재확인: `flow-B-linked-1440.png` RA 목록에 「Linked account」 배지 행 · Staff ID/PIN «—» · 권한 라벨 «POS / Counter …» · 액션 없음 · 통계 Staff 수 포함 / `flow-A-granted.png` 선택 화면 카드 즉시 + 토스트 «Access to KFC Sunway Pyramid was approved — tap to switch» / `flow-M-390.png` 390 폭 카드형 정상.
- 1회차 B 창 `pageerror reading 'update'`: `index.tsx:133` 의 SW `reg.update()` 60초 setInterval + 시험 브라우저 `serviceWorkers:'block'` 조합 → 시험 환경 artifact, 이 변경과 무관. 판정 수용(운영 브라우저는 SW 등록이 되므로 재현 경로 없음).

## 4. 배포 안전성
- 마이그 0 · 운영 쓰기 0 · 응답 shape 변경 0(플래그 opt-in · BG 응답 바이트 동일을 L4·health-check 가 상시 검사) · 새 소켓 이벤트는 옛 번들이 무시 → 롤백 = 번들+백엔드 복원, 잔여물 0.
- SW 5.96 · 배포 기록 sw_version 은 배포 방 몫(verify-all ✗ 항목은 그 성격).
- **판정자 `verify-all --full` 재실행: 23/24 ✓** — 실브라우저 mount sweep(8역할 + /pos/manager/*) **크래시 0** (745s) · tsc 기준선 파일별 신규 0(팀원 회차 «확인 불가» 해소) · health-check 전체 ✓ · 인쇄 라우트 가드 ✓ · i18n 4언어 ✓ · 훅 TDZ ✓. 유일한 ✗ = «배포 준비» 기록 sw_version 5.95 ≠ sw.js 5.96 — 배포 기록 갱신은 /배포 방 몫(이 방이 고칠 것 아님, 이전 회차와 같은 성격). 로그 `/tmp/fable-verify-all-staff-live.log`.

## 5. 비차단 지적 (다음 때)
1. `GET /users` RA 분기의 `console.log('✓ Found …')` 는 종전 것이지만 이제 연결 계정 수까지 센다 — 문제 아님, 메모만.
2. 재연결 resync 는 로그인한 모든 사용자가 소켓 재연결마다 `GET /api/auth/contexts` 1회 — 매장 기기 수 × 재연결 빈도라 미미. 운영에서 재연결 폭주 로그가 보이면 그때 디바운스.
3. 1440 스크린샷에서 액션 열 머리글이 오른쪽에 잘린다 — 종전 DataTable 노트북 폭 잘림([[reference_datatable_desktop_clipping]]), 이 변경과 무관.
4. 초대 설계(2ad9cc97 방) 재개 시 §9 인계 메모대로 §5.2·§6.1-1·2 는 «완료(이 건)» 처리, `kind:'invited'` 당사자 전송 추가.

## 6. 운영 반영 뒤 Irene 확인 1회
실매장 RA 가 요청 승인 → 직원 목록에 바로 뜨는지 · 상대 폰 선택 화면에 카드+토스트가 새로고침 없이 뜨는지.
