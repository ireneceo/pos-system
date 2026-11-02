# 게이트용 사실 — 직영 INTERNAL (2026-11-02 · 작업방 0c838bc5 · Opus 실측)

설계: .claude/fable-design-20261102-direct-store-billing.md · 처음 사실: .claude/fable-facts-20261102-direct-store-billing.md

## 이 일이 바꾼 파일 (다른 방 미커밋 변경은 그대로 둠)
- dev-backend/utils/paymentTerms.js · routes/entity-billing.js · services/purchaseOrderService.js(줄 단위 Edit — deliveredAtOf 다른 방 변경 보존) · services/purchaseOrderPayment.js · models/PurchaseOrder.js · scripts/migrate-po-payment-method-internal.js(신규) · scripts/migrations.registry.json(deploy) · scripts/health-check.js(끝에 defineInternalSettlementTests 추가 + 등록 1줄) · scripts/route-guard-baseline.json(settle-internal 2개 추가 — 같은 파일 GET/PUT 이 이미 baseline · 같은 resolveRestaurantFor* 소유검사 · bless 가 owner claim 1줄을 지워서 그 줄은 되돌려 넣음)
- dev-frontend/src/components/Billing/BillingTermsModal.tsx · public/locales/{en,ko,zh,ms}/billing.json · purchaseOrders.json
- docs/BG_FG_TRADE_BILLING.md 절 추가 · docs/INVOICE_SYSTEM.md §3.1 한 줄
- sw.js 안 건드림(같은 트리에서 다른 방이 이미 6.05 로 올렸고 미배포)

## 검증 숫자
- 마이그 개발 DB 2회 실행(멱등) → payment_method enum(...,'personal','internal') · check-migration-registry 통과(deploy)
- health-check --grep=직영 4/4 (① 저장 정규화·공급업체 검증 400·익명 401·남의 매장 settle 404 ② 발행 paid/internal·due null·paid_amount=total·paid_at=issued_at·발주 paid/internal·멱등·RA 배지 전후 같음(3)·pending 0·gatewayPayableError 409·revenue-report 행 amount=paid=37.5 outstanding 0·sales-report 200·refund-payment 400 INTERNAL_SETTLEMENT ③ 현금 선결제 → cash ④ NET_15 settle 409 NOT_INTERNAL·pending 청구서→INTERNAL 저장→open_invoices≥1→settle→청구서·발주 internal→재호출 0·open 0) · 잔재 감시 고아청구서 0→0
- ④ 는 데모 매장에 원래 열린 브랜드 청구서가 있으면 그것까지 바꾸므로 시작 전 0건 아니면 실패로 멈추게 함
- 고장주입 1: createTradeInvoice internal 분기 false → ② 실패(pending_payment·due 11-09·paid 0) → 원복 4/4
- 고장주입 2: reversePayment internal 차단 false + pm2 restart → ② 실패(환불 200) → 원복·restart → 4/4
- 실브라우저(demo-brand, /pos/manager/restaurants, 매장 38): INTERNAL 고르면 Invoice Cycle·Credit Limit 숨김·안내 문구 · 저장 → 다시 열면 «1 invoices … (RM 20.00)» · Settle → 확인창 문구 · «1 invoices · 1 orders marked paid (internal)» · 요약 «Internal · no payment» · DB 청구서·발주 paid/internal · console.error 0 · 시험 행 삭제·조건 원복
- 빌드 1회(build:dev exit 0 · 경고는 다른 파일 기존 것) · verify-all --full: 21/24 통과 — 실패 3 = ① route-guard(settle-internal 2개 → 위 baseline 등록 뒤 «신규 0») ② deploy-ready(배포 기록 파일 없음 — 배포 준비 몫) ③ inspection O-INT-001 1건 = 주문 41909 «[확인용] Performance boundary» (다른 방 98b32450 시험 데이터, 이 일 전부터 있던 것) · health-check 전체 통과 · mount sweep 8역할 통과 · print-guard 8/8 · design-guard 신규 0 · i18n 통과 · 타입 기준선 통과
- check-sensitive-diff: FABLE 게이트 대상

## 확인 못 함
- SOA 묶인 쌍의 settle(syncSoaChildren 경로) — 데모에 열린 SOA 쌍이 없어 실호출 안 함. 코드: routes/entity-billing.js settleInternal 의 soa 분기
- 운영 실데이터(with MIN Cafe 미지급 건수) — 이 방에서 운영 읽기 권한 거부
- check-enum-parity(운영 비교) 실행 안 함 — 배포 때 마이그가 먼저 도는지는 배포 게이트 몫
