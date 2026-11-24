# 브랜드 매니저 «기존 계정 초대» — Fable 게이트 판정 (2026-11-24)

[Claude Code · Fable 판정] · 설계 `.claude/fable-design-20261124-brand-manager-invite.md` · 개발서버만 · 운영 쓰기 0 · 배포 안 함

## 판정: **PASS** (고칠 것 0 · 참고 4)

게이트 종류: 보안 경계 변경(초대·회수 권한이 브랜드 주인에게 열림). DB 구조·마이그 0 · 🔒 보호 파일 0.

## 1. 설계 범위 대조 (diff)

이 일의 파일만 읽음(다른 방의 미커밋 작업 — 11-23 판매 주문 취소·환불, 10-29 `e2e/playwright.config.js` — 은 범위 밖).

| 설계 | 구현 | 결과 |
|---|---|---|
| §2.1 새 라우트 | `routes/context-requests.js:391` `POST /invite/brand-manager` — `/:id` 계열 위 · `authenticateToken` 명시 · 역할 → 데모 → brand_ids(1~50·정규화·중복 제거) → 브랜드 전부 실존+주인(하나라도 아니면 전체 404, :408-415) → 권한 정규화 → 대상 판정 → 브랜드별 건너뜀 → 한 트랜잭션 | 일치 |
| §2.2 수락 3곳 | :848-850 초대자 재확인(409) · :853 좌석 검사 `isRestaurantHat` 일 때만 · :864 브랜드 행은 `userContexts.parsePermissions` | 일치 |
| §2.3 결과 알림 | `notifyInviteResult` entityType(:287) · `utils/notificationLinks.js:92` `brand:'/pos/brand/manager'` | 일치 |
| §2.4 /sent · 취소 | :564 BG 가지(내 브랜드 × Brand Manager 만) · `findCancellableInvite` :241 지금 주인 · 취소 로그 :962 | 일치 |
| §2.5 떼기 | `routes/users.js:1479` `canManageContextRowOrOwnBrandHat` 하나를 PUT(:1502)·DELETE(:1551)가 같이 씀 · 회수 로그 :1562 | 일치 |
| §2.6 EMAIL_IN_USE | `routes/brands-core.js:985` 이메일 겹칠 때만 | 일치 |
| §2.7 메일 | `utils/notificationTemplates.js:1346` + locales 4언어 | 일치 |
| §2.8 무접촉 | `grantContext`·`visibleRequestScope`·`GRANTABLE_COMBINATIONS`·`POST /invite`·`middleware/auth.js`·`services/`·`models/` diff 0 | 확인 |
| §3 화면 | 모달 신규 · 버튼 · 대기 초대 · 취소 · 떼기 · EMAIL_IN_USE 잇기 · 받은 초대 카드 | 일치(아래 2건 차이 승인) |

**설계와 다른 2건 — 승인:**
- 대기 초대를 목록 행이 아니라 **목록 아래 별도 표**로(`BrandStaffPage.tsx:825`). 매니저 표와 칸이 달라 따로 두는 쪽이 낫다. 통계 카드가 대기를 세지 않는 것도 그대로 지켜짐.
- `NotificationToaster.tsx:148` — 설계 파일 목록에 없던 한 줄(브랜드 초대 알림 문구가 «as staff» 로 나가던 것). §3.2 의 뜻(브랜드 초대가 직원 초대로 읽히지 않게) 안이고 보호 파일 아님.
- `health-check.js` 옛 검사 «데모 BG /sent 403» → «200 + 매장 초대 0건» 변경은 §2.4 가 연 것 그대로(검사를 느슨하게 한 게 아니라 새 약속으로 바꿈).

## 2. 가드 스크립트 (내가 다시 돌림)

- `check-print-guard` 8/8 변경 없음
- `verify-all` 22/23 — 실패는 `deploy-ready` 하나(배포 기록의 sw_version 6.26 ≠ 실제 6.27 — 배포 준비 방이 기록을 쓸 때 맞춰지는 칸, 이 일의 결함 아님). 번들 신선도·타입 기준선·i18n 4언어·디자인·타임존·health-check 전체·인쇄 라우트 가드 통과. 실브라우저 mount(`--full`)는 다시 안 돌림(팀원 실행분 — 번들 09:41 이 마지막 프론트 수정 09:39 뒤임은 확인).
- `health-check --category=security` 113/113
- `check-sensitive-diff`: 게이트 대상(이 일 = 보안 경계).

## 3. 실호출 (내가 다시 돌림)

- jest `brand-manager-invite` 17/17 · 모자 묶음 6개 `--runInBand` 106/106.
- 사례 6(좌석 가드)이 «브랜드 24 가 이미 있으면 건너뜀» 이라 실제로 돌았는지 확인: 개발 DB 에 브랜드 24 없음 → 돌았다.
- **고장주입 1건 직접 재현**: 새 라우트의 주인 판정(:411)을 `if (false)` 로 → 17 중 1 실패(사례 3) → 원복(cmp 동일) → 17/17. 팀원의 5/5 보고와 맞음(나머지 4건은 팀원 실행분).
- **jest 에 없는 사례를 임시 스크립트로 37건 실호출(36 통과 · 1건은 내 검사 기준이 틀림 — 아래 참고 ②)**, 임시 계정·브랜드만, 끝나고 삭제(남은 것 0):
  - 연결 매니저(모자 쓴 상태)가 초대 → 403 · /sent → 403 · 자기 모자 DELETE → 404 · 다른 브랜드 직원 목록 → 403
  - Restaurant Owner 초대 → 403 · 데모 대상 400 · 시스템 관리자 대상 400
  - 남의 브랜드 404 와 없는 브랜드 404 의 문구가 같음(존재 여부 안 샘)
  - brand_ids 문자열·빈 배열·51개·음수·`'1 OR 1=1'` → 전부 400
  - 수락 → 전환: role Brand Manager · brand_id = 그 브랜드 · 권한 = 고른 값(`dashboard, products, reports`) · 수락 안 한 브랜드로 전환 403 · 재수락 409
  - 주인이 **매장 관리자(RA) 모자** DELETE·PUT → 404, 행 그대로
  - 다른 BG 가 초대 취소 → 404 · 주인이 자기 초대 approve·reject → 403
  - 초대한 사람 비활성 → 수락 409 · 모자 0
  - 시스템 관리자가 남의 브랜드로 초대 → 수락 200
  - 메일 4언어(en·ko·zh·ms) 렌더: 빠진 키·`{{}}` 노출 0
- 화면: 팀원 e2e 스크린샷 4장 읽음(대기 표 1440 · 모달 390 · 받는 사람 카드 · 연결 매니저 행). e2e 자체는 다시 안 돌림.

## 4. 배포 안전성

마이그 0 · 새 표·칸 0 · SW 6.27 로 올림 · 되돌리기 = 코드만. 옛 화면(6.26)이 새 서버를 만나도 깨질 호출 없음(/sent BG 가 403→200 으로 바뀐 것을 읽는 옛 화면 없음 — `ContextRequestsPanel` 은 RA·SA 화면).

## 5. 참고 (막지 않음 — 지금 고칠 필요 없음)

① jest 에 없는 설계 §5 조각(연결 매니저·오너 403, RA 모자 DELETE 404, 전환 뒤 범위)은 위 3절에서 실호출로 확인했다. 다음에 이 파일을 건드릴 때 jest 로 옮기면 좋다.
② 수락 활동 기록에 `restaurant_id` 가 수락한 사람의 본래 매장으로 찍힌다(`logActivity` 기본값 — 매장 초대·SA 부여와 같은 종전 동작). 브랜드 번호가 매장 칸에 들어가는 문제(설계가 막으려던 것)는 없다.
③ `/sent` 가 수락 전에도 대상의 이름(full_name)을 주인에게 보여 준다 — 매장 직원 초대(10-16 통과)와 같은 SELECT·같은 규칙.
④ jest 사례 6 의 «브랜드 24 있으면 조용히 건너뜀» 은 언젠가 통과처럼 보이는 빈 검사가 될 수 있다 — 건너뛸 때 실패로 바꾸는 편이 낫다(지금은 실제로 돈다).

## 6. 확인 못 함

실제 메일 발송·받은 편지함 모양 · zh/ms 화면 · 390 폭의 대기 초대 표 · 운영의 withmin1 / GIT consulting 상태.

## 7. 다음

운영 반영: 다음 배포 때(배포 준비 방이 기록의 sw_version 을 6.27 로 맞춤). 이 판정 뒤 코드를 한 줄이라도 고치면 마커는 무효 — 다시 판정.
