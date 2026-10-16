# Fable 게이트 판정 2026-10-16 — 기존 계정을 매장 직원으로 연결 (멀티 로그인 v1.4 「초대」)

판정자: Fable(리더). 설계 `.claude/fable-design-20261016-link-existing-account-staff.md` (Irene «권고대로 진행해 줘» → D1=A 초대→본인 수락 · D2=예).
대상 지문: `25a8863c34494999b4db045f1bfe7eeae52612651ab5f8b07eaf2a88ee943bb5` (판정 시작 시 `fable-gate.js fingerprint` 로 재확인 — 팀원 보고와 일치). 이 문서를 쓴 뒤 `pass` 를 찍었으므로 마커 지문은 이 문서를 포함한 값이다.
코드 수정 0 (판정만). 운영 접속 0 · 운영 쓰기 0.

## 판정: PASS

## 1. diff 범위 대조 — 설계 밖 변경 0
- `git diff --stat HEAD` 35 파일 + 미추적 4(설계 문서 · 마이그 · jest · 초대 모달). 전부 설계 §1 «들어가는 것» ①~⑧ 안.
- **`services/userContexts.js` 변경 0** (설계 §5.5 봉인 — git status 에 없음). 쓰기 경로는 여전히 `grantContext` 하나: 수락(`/:id/accept`)·권한 수정(`PUT /users/:id/contexts/:cid`) 둘 다 `grantContext` 호출, `user_contexts` 직접 INSERT/UPDATE 0.
- 🔒 인쇄 보호파일 8개 무접촉(print-guard 8/8 — 내가 실행) · KDS 무접촉 · `MainLayout` 무접촉.
- 팀원이 «설계와 다르게 한 것» 7건을 읽고 수용:
  1. `pending_invitations` 를 `/auth/me` 대신 로그인 응답 + `GET /auth/contexts` 에 — `AuthContext.refreshContexts` 가 `/auth/contexts` 를 읽으므로 신호·새로고침 때 같이 갱신된다. 목적(초대 있으면 선택 화면 유도) 동일. 수용.
  2. «기존 계정 초대» 버튼 RA 만 — SA 는 직접 부여가 이미 있음. 수용.
  3. 신호 kind `updated`·`invite_cancelled`(당사자)·`invite_declined`(매장 룸만) — `contextSignals.SUBJECT_KINDS` 와 토스트 키(`auth:context.live.updated|invited` 4언어 존재 확인) 일치. 수용.
  4. 받은 사람은 `DELETE /:id` 로 초대를 못 지움(requester 분기 한정) · `/mine` data 는 requester 만 · 5건 상한 requester 만 — 설계 §3 «수락·거절은 본인만 · 거절은 /decline» 의 정합. 수용.
  5. `fetchDedupe` NON_DEDUPED 에 `/context-requests/` — 실측 결함(거절 뒤 패널 잔존)의 원인이 2초 GET 캐시라는 판단에 동의(`/auth/contexts` 와 같은 사유). 프론트 jest 4/4 (내가 실행 — 화면 jest 는 게이트 밖이라 직접). 수용.
  6. 390 폭 줄바꿈·1440 권한 라벨 « — » 앞까지 — 화면 다듬기. 저장본 `invite-390.png` 확인: 초대 행 글 안 잘림, 버튼 아랫줄. 수용.
  7. 시험 매장 rid 7·6(demo) — DB 확인 is_demo=1 · active. rid 18 은 inactive. 수용.

## 2. 가드·검사 (전부 내가 다시 실행)
| 검사 | 결과 |
|---|---|
| `check-print-guard.js` | 8/8 변경 없음 |
| `check-sensitive-diff.js` | ①②③⑤ 접촉 → 게이트 대상(정상 판정) |
| `check-design-guard.js` | 신규 0 (baseline 295 → 299 는 기존 부채 집계, 신규 위반 0 판정) |
| `check-migration-registry.js` | 분류 정상 (`migrate-user-context-requests-invite.js` = deploy) |
| 마이그 재실행 | 칸 3·인덱스 1 전부 «already exists (skip)» — 멱등 · 값 쓰기 0. DB: `initiator enum NOT NULL DEFAULT requester` · `created_by int NULL` · `permissions json NULL` · 인덱스 (entity_type,entity_id,status,initiator) |
| jest 4 스위트 | **81/81** (단독 실행). ※ 내가 인스펙션·DB 조회를 병렬로 돌린 1회차엔 `context-requests.test.js` pending-count 1건이 80/81 — 단독 재실행 81/81. 코드 결함 아님(스위트 간 격리가 매장 id 기준이라 외부 DB 접근과 겹치면 흔들림). 게이트는 순차 실행 유지 |
| health-check | **394/394** (신규 3건 포함: 익명 401×3 · 데모 RA invite 403/sent 200 · 데모 BG sent 403/PUT 404 · 중복 400 문구에 역할·매장 번호 없음) |
| 인스펙션 user-contexts | UC-001~010 전부 ✅ (신규 0, baseline 11 은 다른 스위트) |
| `i18n:verify` | 오류 0 · 4언어 키 일치 게이트 ✓ |
| `verify-all` (non-full) | 22/23 — ✗ 1 = «배포 준비: 기록 sw_version 5.95 ≠ 실제 5.97» = 배포 방 산출물(`releases/2026-10-17-staff-attendance.json`). 앞 게이트(6f31e87f9)에서도 같은 ✗. 이 방 결함 아님 |
| 번들 | `dev-frontend-build` 에 `context-requests/invite` 포함 · `sw.js` 5.97. mount sweep 은 재실행 안 함(11분·공유 서버) — 대신 `.sweep-cache.json` 키(sha256 index.html+main.js)를 내가 같은 식으로 재계산해 **현재 서빙 번들과 일치** 확인 → 팀원 보고 «8역할 크래시 0» 이 최종 번들 것임 |

## 3. 반증 (규율 2조항)
- 팀원 FI-18~22 (응답에 대상 id·역할 → 11 실패 / scope initiator 제거 → 8 실패 / canManageContextRow entity_id 제거 → 2 실패 / 문구 역할 되살림 → 1 실패 / 수락 좌석 본검사 제거 → 1 실패 / 원복 20/20). 나는 지문 보존을 위해 코드 주입을 재현하지 않았고, 대신 `tests/context-invites.test.js` 의 단언이 각 주입에 실제로 반응하는 구조인지 읽어 확인했다(②keys not.toContain user_id/role · ④초대자·SA approve 404 · ⑤r39 PUT/DELETE 404 · ①/Brand Manager|restaurant ID|system user/ 부정 · ⑧accept 403).
- **내가 직접 한 반증 1건(코드 무접촉)**: dev DB 에 «승인된 초대인데 결정자 ≠ 본인» 행 1개 삽입 → 인스펙션 **UC-010 ❌ 1건** → 삭제(1행) → **UC-010 ✅ 0건**. 셀프 부여 사후 감시가 실제로 잡는다.

## 4. 실호출·실브라우저
- API 계약은 jest 81건(내가 실행)으로 증명: 문구·코드(EMAIL_IN_USE+canInvite · STAFF_ID_IN_USE) → 초대 201(대상 id/역할 없음 · grantor 행) → 받은 요청 패널 0 · pending-count 0 → 거부 사유 7종 → RA body restaurant_id 무시 → 로그인·/auth/contexts `pending_invitations` 1 → `/mine` meta.invitations → 본인만 수락(남 404 · 초대자/SA approve 404) → 모자 행 granted_by=초대자 · decided_by=본인 · 카드 · 재수락 409 → include_contexts 에만 연결 계정 · 남의 매장 없음 → RA 권한 수정 200/0개 400/남 404/BG 404/익명 401 → 조회는 SA 전용 403 유지 → 해제 200 → 폴백 헤더 → 거절 rejected·보낸 초대에서 제거·내 요청에 안 섞임 → 취소 200/남 404 → 방향 충돌 409 두 문구 → 좌석 보낼 때 403·수락 때 403(본검사).
- 실브라우저: 팀원 22/22 × 3회(최종 번들) + 저장본 3장(번들 18:29:53 직후 18:30 저장). 내가 390 저장본 1장 열어 확인.

## 5. 배포 안전성
- 마이그 1개: ADD COLUMN ×3(DEFAULT/NULL) + 인덱스 1 · INSERT 0 · registry `deploy` · `process.exit` 있음 · 표 없으면 모델 sync. 기존 행 영향 0(`initiator` DEFAULT 'requester' 로 종전 의미). ENUM 은 새 칸(expand-only 충돌 없음, `status` ENUM 무접촉). 모델 인덱스 이름이 마이그와 같아 sync --alter 와 중복 생성 없음.
- SW 5.96 → 5.97 (프론트 변경 마지막에 1회).
- 롤백 = 이전 번들+백엔드 복원. 칸은 남아도 무해. **단 옛 승인 라우트는 `initiator` 를 모르므로 롤백 시 pending 초대가 옛 패널에 요청처럼 보일 수 있다 → 롤백 절차에 `DELETE FROM user_context_requests WHERE initiator='grantor' AND status='pending'` 1줄**(설계 §10). 배포 기록에 적을 것(아래).
- 운영 쓰기 0. 보안 경계 변경 = `DELETE /users/:id/contexts/:cid` 의 `requireRole('System Admin')` 제거 → 핸들러 안 `canManageContextRow`(SA 전부 · RA 자기 매장 × Staff 행만 · 그 외 404) — jest ⑤ + health-check 로 증명. `GET`/`POST /users/:id/contexts` 는 SA 전용 그대로(실호출 403 확인).

## 6. 고칠 것 (코드 아님 — 게이트를 막지 않음)
1. **배포 방**: 배포 기록 `verification.sw_version` 을 `5.97-staff-invite-20261016` 으로(verify-all ✗ 1 의 원인) + 롤백 메모에 위 DELETE 1줄 + 마이그 `migrate-user-context-requests-invite.js` 포함.
2. **dev 데이터**: `restaurants.id=18`(Test Debug Restaurant, demo·inactive) `staff_limit` 이 999 — 설계 부록(10-16 아침)엔 5. 어느 시험이 남겼는지 불명(이 방 코드와 무관 · `context-requests.test.js` 는 읽은 값을 그대로 원복). 편할 때 5 로.
3. **관찰(변경 불필요 · 설계 그대로)**: `/invite` 400 문구 «Cannot invite a system administrator / Demo accounts cannot be invited / deactivated» 는 그 이메일 계정의 종류를 알린다 — 설계 §3 이 명시한 문구이고, RA 는 그 이메일을 이미 아는 사람이며 역할·매장 번호(이번에 지운 것)보다 좁다. 기록만.
4. **확인 못 한 것(팀원 보고 그대로)**: 메일 실수신(@example.com) · 실제 휴대폰 · 운영 nginx/데이터 · 빠른 로그인 응답의 `pending_invitations` 는 코드만(`loginAsTestAccount` 에 같은 헬퍼 호출 — 읽어서 확인).

## 7. 마커 뒤 규칙
- 이 뒤로 바뀌어도 되는 파일은 `.claude/session-state.md` 하나(지문 제외). 다른 파일을 한 줄이라도 고치면 마커가 죽는다 — 커밋에 이 문서를 **포함**해서 올릴 것. 메모리·DEVELOPMENT_PLAN 갱신은 커밋 뒤.
