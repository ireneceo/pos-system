# Fable 게이트 요청 — 배송 완료 → 청구서 · 72시간 자동 완료 (2026-10-30 · 작업방 d5ebceff)

## Irene 원문
https://purplehere.com/pos/brand/general/incoming-orders  고객이 안받았다고 주문완료가 안되면 어떻게 해? 일정기간이 지나면 그냥 완료처리 되어야 해. 인보이스가 안나오잖아. 배송완료되면 인보이스 나와야 하는 거 아니야?

## 설계
`.claude/fable-design-20261030-po-auto-complete.md` (Fable)

## 이 방이 바꾼 파일 (미커밋 · 개발서버)
- 신규 `dev-backend/services/poAutoReceiveService.js` · `dev-backend/services/poAutoReceiveScheduler.js`(매시 5분)
- `dev-backend/server.js` — 스케줄러 시작 2줄(761~762). ⚠ 같은 파일 listen 주소(LISTEN_HOST) 변경은 다른 방(78273ae2) 몫
- `dev-backend/routes/seller-orders.js` — /deliver 커밋 뒤 청구서 헬퍼 + 메일 한 문장 + 목록·상세 auto_receive_at
- `dev-backend/routes/carrier-webhooks.js` — delivered 적용 뒤 청구서 헬퍼 1줄
- `dev-backend/routes/purchase-orders-crud.js` — 구매자 목록·상세 auto_receive_at
- `dev-backend/services/poNotifications.js` — fireAutoReceivedNotifications
- `dev-backend/utils/notificationTemplates.js` — buyerReceivedEmail auto 플래그 · poAutoCompletedEmail · `dev-backend/locales/*/email.json`
- `dev-backend/scripts/health-check.js` — inventory AC1~AC4 3건 + hcCleanupPurchaseOrders 가 delivered 청구서도 기다림
- 화면 `IncomingOrdersView.tsx` · `PurchaseOrdersPage.tsx`(POStatus·StatusVariantMap 에 delivered 추가 — 타입 기준선 때문) · `PurchaseOrderDetailPage.tsx` · `public/locales/*/{supplier,purchaseOrders,billing}.json`
- 문서 `docs/PURCHASE_ORDER_SYSTEM.md` 끝 절
- 다른 방 미커밋(이 일과 무관): restaurants-ingredients.js · costSync.js · restaurantCatalogLink.js(오너 다매장 a54ec5ac) · server.js LISTEN_HOST · playwright.config.js · GTM 4파일

## 설계와 다른 점(구현자 판단)
- 스케줄러 매시 **5분**(정기 발주 정각과 안 겹치게).
- markAllReceived 는 tracking 이벤트 note 를 기본값으로 쓰고 `source` 를 tracking_info 최상위에 넣음 → 자동 완료 뒤 같은 트랜잭션에서 마지막 received 이벤트에 note «Auto-completed …» + `source:'auto_receive'` 를 덧씀(markAllReceived 본문 무접촉).
- userId = 발주 created_by_user_id(InventoryBatch/Transaction created_by 는 NULL 허용이었음).
- 웹훅 delivered 메일(기존 TODO)은 손대지 않음.

## 검사 숫자 (이 방 실행)
- health-check inventory: AC1(배송 완료 즉시 청구서 1장 · 구매자 뒤 수령해도 같은 id) · AC2·AC5(71h 0건 · 73h 동시 2실행 합 completed 1 · status received · 수령량 = 주문량 · 구매자 재고 +3 · 마지막 이벤트 received/auto_receive/«Auto-completed» · 재실행 2회 0건·재고 그대로 · 판매자/구매자 상세 auto_receive_at = 배송완료+72h · 완료 뒤 null · 알림 로그 판매자 recipients=22,2212 · 구매자 recipients=163,164) · AC3·AC4(구매자 먼저 수령 → 0건·재고 1회 · shipped/partial_received/cancelled → candidates 0) — 전부 통과(94건 중 실패 0 · inventory)
- 고장주입: ⓐ /deliver 청구서 호출 제거(+pm2 restart) → AC1 실패 «배송 완료 뒤 청구서 없음» ⓑ autoReceiveOne 잠근 뒤 상태 재확인+기한 재확인(73~75줄) 제거 → AC2 실패 ⓒ AUTO_RECEIVE_HOURS=0 → AC2 실패 «AUTO_RECEIVE_HOURS=0» — 셋 다 원복(diff 확인)
- verify-all --full(1차, 번들 main.72e6efdd): 22/24 — ✗ 배포 준비(기록 파일·SW 버전 = 배포 방 몫) · ✗ 타입 기준선(PurchaseOrdersPage POStatus 에 delivered 없음 → 고침 → --only type-baseline 통과 → 다시 빌드). health-check 전체 435/435 · 인쇄 보호 8/8 · 디자인 신규 0 · i18n OK · mount sweep 크래시 0
- 그 전 실행에서 잡힌 것: «고아 거래청구서 1→2». 원인 = 검사 AC3 가 /deliver 직후(같은 ms 대) mark-received → `createTradeInvoice` 두 호출이 동시에 돌아 청구서 2장(멱등 확인이 잠금 없이 읽기만). 검사를 «배송 완료 청구서가 붙은 뒤 수령»으로 고치고 시험 청구서 2장(ZZ-HC-Q6) 삭제. **createTradeInvoice 의 동시 호출 중복 자체는 설계상 무접촉이라 그대로** — 판정 부탁.
- verify-all --full(2차, 다시 빌드 뒤 번들): 22/24 — ✓ health-check 전체 · 인쇄 보호 8/8 · 타입 기준선 · i18n · 디자인 · 인스펙션 등 / ✗ 배포 준비(배포 기록 파일·SW 버전 = 배포 방 몫) / ✗ mount sweep 1184.7s 로 제한 1200s 근처에서 실패 — 남은 출력(manager 105/105 OK)에 실패 줄 없음 → 시간 초과 추정, 서버 load 3~4. `--only mount` 다시 돌리는 중 → `~/.claude/jobs/d5ebceff/tmp/mount.log`(끝나면 팀원이 결과를 전달). 이 판정 중 실브라우저 sweep 은 돌리지 말아 주세요(겹치면 또 시간 초과).
- 확인용 데모: 발주 53054 `PO-R38-CHK-AUTO-mvv62jgw`(매장 38 ← 브랜드 17 K-Dine · notes [확인용]) — 실 API ship 200 → deliver 200 → 청구서 33277 즉시 · auto_receive_at 2026-11-02T16:08:30Z

## 판정 부탁
설계 대비 diff 범위 · 가드 · 실호출 증명 · 배포 안전성(마이그 0 · 운영 첫 실행 때 옛 delivered 일괄 완료) — 통과면 `node dev-backend/scripts/fable-gate.js pass --note "…"` 를 Fable 이 찍는다. 판정문: `.claude/fable-gate-20261030-po-auto-complete.md`
