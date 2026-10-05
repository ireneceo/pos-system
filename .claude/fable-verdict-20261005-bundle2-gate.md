# Fable 게이트 판정 2026-10-05 — 묶음 ①역할 추가 요청 ②최소주문·연결 환산·등록 화면 ③단말기 결제창

판정자 Fable(리더) · 대상 = 미커밋 워킹트리 80건(HEAD 760c8c886 위) · SW 5.84-context-request-moq-terminal-20261005.
설계 근거: `.claude/fable-design-20261005-context-request.md`(D1~D4) · `.claude/fable-design-20261005-moq-product-form.md`(①~⑦). ③은 설계 없음(팀원 리더 수정) — 운영 실측 기반 diff 로 판정.

## 판정: **PASS (조건 4 — 전부 배포 뒤 처리, 배포 차단 아님)**

## Fable 직접 실측 (팀원 보고와 별개)
- `check-print-guard` 8/8 변경 0 · `check-design-guard` 신규 0 · `check-sensitive-diff` ②③⑤ 대상(예상대로) · `verify-all` **23/23**(non-full, Fable 재실행) · `i18n:verify` Errors 0.
- jest `context-requests` + `user-contexts-switch`: **병렬 1회 ⑨ 실패(52/53) → `--runInBand` 53/53 · 단독 15/15.** 원인 = 두 스위트가 demo rid 18 의 user_contexts 를 동시에 쓰고 ⑨가 `countRestaurantSeats(18)` 를 두 시점에 비교 → 테스트 격리 결함, 코드 결함 아님(조건 ②).
- diff 직접 대조: auth.js 투영 · auth.js switch-context · userContexts.js(grantContext 유일 쓰기·resolveGrantedContext 단일 SQL·countRestaurantSeats 공유) · context-requests.js(router.use 가드 없음 · 리터럴 경로가 /:id 앞 · visibleRequestScope 단일 범위 · 승인은 grantContext 만) · 마이그 2(CREATE/ADD COLUMN NULL · INSERT 0 · 레지스트리 deploy) · poMinOrder.js(구매자 3경로 · 판매자 core enforceMinOrder:false · 호출부 3곳 ok:false→rollback 확인) · deriveLinkConversion + 연결 생성부 5곳 · PaymentModal canConfirm(`useTerminal && terminalIssue → false`, 모든 issue 분기에 Try again 존재 · 수동기록/단말기 선택은 canConfirm 밖 경로) · TerminalPanel busyTitle 4언어 · sw.js 5.84.
- 🔒 인쇄 8파일 · KDS · MainLayout 무접촉.

## 설계 이탈 항목 판정
| 항목 | 판정 |
|---|---|
| grantContext 에 같은 매장 RA↔Staff 겹침 400 추가 | **수용** — UC-008 불변식을 SA 직접 부여 경로에도 지킴(안 넣으면 인스펙션만 울림) |
| SA 직접 부여도 permissions 수신 | **수용** — Staff 모자가 grantContext 하나로 들어가려면 필요, 다른 조합은 무시 |
| permissions 마이그: 표 없으면 sync | **수용** — 새 환경 실행 순서 방어, 운영은 ADD COLUMN 만 |
| 설계 §11 문서(MULTI_CONTEXT_LOGIN_DESIGN.md) 미작성 | **조건 ①** — 게이트 지문이 docs 를 잡으므로 배포 뒤 즉시 작성 |
| MOQ 1 = «정하지 않음» 으로 검사 제외 | **수용** — S1 실측(measure 114 중 110 이 1 · 0.3~0.7 무게 주문 20줄)이 「1 을 하한으로 읽으면 운영 주문 전부 차단」을 증명. 서버 `effectiveMinOrder`·화면 `minQtyOf` 같은 규칙. 문서 PURCHASE_ORDER_SYSTEM 에 기록됨 |
| 상품 16 수정 → «45g 신규 등록, 16 유지» | **수용** — 설계 ①의 전제(연결 0·발주 0)가 실측(연결 1 · 수령 2)으로 깨졌으니 결론도 바뀌는 게 맞다. 1kg 과 45g/pack 은 규격이 다른 상품이라 §5-3 «같은 물건 두 줄» 아님 |
| classifyConversion 무변경 → 같은 단위·기준양≠1·conv 1 기존 연결은 R-SC-007 이 못 잡음 | **수용(후속)** — 신규 연결은 deriveLinkConversion 이 막는다. 기존 행 소급은 설계대로 없음. 조건 ④ |
| health-check 픽스처 6건 수량 max(원래, MOQ) | **수용** — 새 규칙에 맞춘 픽스처, 단언 약화 없음(차감량도 같은 qty 로 비교) |
| Mark as Sent·직접구매 제출에 MOQ 검사 없음 | **수용** — 생성 시 검사됨. 판매자가 뒤에 MOQ 올린 초안의 그 두 경로는 구멍이나 운영 미달 0 건, submit 경로는 막힘 |
| 단말기 ③ Confirm 잠김 범위 확대(voided 만 → 모든 issue) | **수용** — 분할 R1 과 같은 규칙으로 통일, 재시도는 패널 Try again, e2e 가 비활성 단언 |

## 조건 (배포 뒤)
① `docs/MULTI_CONTEXT_LOGIN_DESIGN.md` §3.7·§4.3·§5.6·§6.4·§6.2·§8·Q3 작성(설계 §11) — 다음 커밋.
② `tests/context-requests.test.js` ⑨ 와 `user-contexts-switch.test.js` 가 rid 18 을 공유 — 격리(⑨ 를 rid 39 로 옮기거나 같은 파일로 합치거나 package.json jest 에 runInBand) 1건. 그때까지 두 스위트는 `--runInBand` 로 돌린다.
③ Irene 배포 후 확인(기록 JSON `irene_actions_after_deploy` 그대로): 45g 신규 등록 미리보기 문장 · 선택 화면 «+ 역할 추가 요청» 1건 · 단말기 거절 뒤 Confirm 잠김.
④ 후속 등록: 기존 같은 단위·기준양≠1·환산 1 연결 R-SC-007 탐지 보강(release JSON remaining 에 이미 기록).

## 확인 불가 (팀원 보고 그대로 — Fable 도 재현 안 함)
빌드 단계 프론트 고장주입 · 요청 모달·승인 패널·등록 폼 미리보기 실클릭 · 메일 실발송 · 운영 실단말기 BUSY 재현. mount sweep(697s 크래시 0)·e2e 13/13×3·po-min-order 1/1 은 팀원 실행 결과를 신뢰(Fable 재실행 없음 — 번들 1회 규율).
