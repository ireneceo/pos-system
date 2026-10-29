# Fable 게이트 판정 — 발주 내역 · 대조 화면 결제 동선 (2026-10-29 · 작업방 b15040ba)

> 설계: `.claude/fable-design-20261029-invoice-pay-flow.md` §3 R-1~R-5 · 입력: `~/.claude/jobs/b15040ba/tmp/fable-gate-input.md` · diff: `~/.claude/jobs/b15040ba/tmp/team-diff.patch`(13파일 · 786줄)
> 규칙: CLAUDE.md «Fable 게이트 정지 훅» · «검증 규율 4조항». 이 판정은 코드를 읽고 기계 검사·실호출·실브라우저를 **직접 다시 돌린** 결과로만 쓴다. 운영 쓰기 0 · 운영 배포 0.

## 0. 결론 — **PASS (조건부)**

설계 범위 밖 변경 0 · 가드 전부 통과 · 실호출 4/4 재현 · 바뀐 두 화면 실브라우저 크래시 0 을 내가 다시 확인했다. 조건은 아래 §5 두 가지(배포 때 지키면 되는 것 — 코드 추가 수정 없음).
게이트 마커: `node dev-backend/scripts/fable-gate.js pass` 로 **현재 지문**에 찍는다. 이 뒤로 코드를 한 줄이라도 고치면 마커가 죽는다 — 설계 §5-4 대로 문서(§8-8·§8-9)는 **배포 뒤**에 쓴다.

## 1. ① diff 범위 대조 — 설계 R-1~R-5 와 일치, 밖의 변경 0

| 설계 | diff | 판정 |
|---|---|---|
| R-1 Pay·Receive & pay → 공용 `UI/Button success size=small`, ThemedButton 무변경 | `PurchaseOrdersPage.tsx` 두 버튼만 교체. `Theme/ThemedButton.tsx` 무접촉(다른 ThemedButton 사용처 그대로) | ✓ |
| R-2 «Payment» select(전체/unpaid/paid/refunded) → 서버 `payment_status` where + 모르는 값 400 `INVALID_PAYMENT_STATUS` · 상태 칸 아래 결제 줄(초안·취소·승인대기 제외 · Paid·수단·날짜 / Refunded / Monthly·SOA / Unpaid · 매장 타임존) | 서버 `purchase-orders-crud.js` 9줄(ENUM 3값·400) · 화면 select + `fetch` 파라미터 · 결제 줄은 바로 위 «Seller marked as dispatched» 줄과 같은 인라인 div 패턴(새 로컬 styled 0) · `formatDate`=`utils/timezone`(매장 타임존) | ✓ |
| R-3 대조 화면 Record payment — 뜨는 조건 5개 · 청구서 문(`ReceivePayModal mode=pay + invoiceId` → `mark-paid-external`) · 수령 전 회색 안내 · paid 면 «Paid·수단·날짜» · SOA 문구 · 가입 업체 없음 · 확정 전 안내(막지 않음) · `onGoReconcile` 안 넘김 · `onDone→load()`+drawerSkipped 안내 · 서버 GET +칸 · 돌아가기 문구 scopeQS 로 분기 · 700행 도움말 | `InvoiceReconcilePage.tsx` 조건 순서 paid → SOA → 상태 제외 → 청구서 없음 → 버튼(+confirmFirst). `ReceivePayModal` 은 `invoiceId` 가 있으면 `/api/invoices/:id/mark-paid-external` 로 들어간다(모달 100~106행, 기존 계약). 서버 `cost-reconciliation.js` GET 에 `payment_method·paid_at·trade_invoice_id·payable_amount·payable_basis·pay_via_soa` + `entity_type` — `payableFrom(po, sellerIsExternal)`·`utils/payViaSoa.payViaSoa` 둘 다 목록 라우트와 **같은 함수**(단일 소스 유지, 화면 재계산 0). 돌아가기 **로직** 무변경(307→316행 `goBack` 그대로), 문구만 분기 | ✓ |
| R-4 ① 멱등 마이그(설계 SQL 그대로 · refunded 무접촉 · 드로어 0 · `deploy` 등록 · 바뀐 번호 출력) ② `ALREADY_PAID` 사람말 4언어 · 서버 무변경 | `migrate-po-payment-mirror-backfill.js` WHERE·SET 이 설계 SQL 과 문자 그대로 일치 + 트랜잭션·`FOR UPDATE`·영향행≠대상이면 롤백(설계보다 보수적). 레지스트리 `deploy` 끝에 추가. `ReceivePayModal` 오류 분기 1개 + 4언어 키 | ✓ |
| R-5 하지 않는 것 | `buyerScope`·`checkPaymentPermission`·`recordPayment`·`ThemedButton`·브랜드/푸드코트 청구서 화면·Reverse payment 추가 — diff 에 **없음**. 🔒 인쇄 보호파일 8/8 무변경 | ✓ |

**설계와 다른 점 2건 — 둘 다 수용(설계 안에서의 선택):**
1. 초록 색: `UI/Button success` = `theme.status.successAlt` **#059669**(청구서 상세 창 Button success 와 같음) · 청구서 목록 `LocalActionButton success` 는 `successAlt2` #10B981. 설계 R-1 은 «다르면 토큰 쪽에 맞춘다(인라인 hex 금지)» — 팀원이 토큰을 그대로 써 인라인 hex 0. 두 초록은 같은 계열(디자인 규칙 3 의 danger 혼동 같은 문제 아님). 통일은 디자인 부채로 남긴다(이번 범위 밖).
2. reconcile GET `entity_type` 1칸 추가(설계 6칸 + 1) — 모달 `buyerIsRestaurant`(현금서랍 분기)에 필요. `po` 의 기존 칸을 읽기만 하고 권한 문(`checkPOOwnership`)은 그대로라 노출 위험 0. 설계 §1-4 가 «없다»고 적은 목록에 이미 들어 있던 칸이다.

## 2. ② 가드 스크립트 — 내가 다시 실행

- `check-sensitive-diff` → ③ 마이그 1 + 안전망(health-check) → **게이트 대상 확인**(이 판정의 근거). 일반 변경 40건 중 이번 작업 밖(GTM 4파일 등)은 다른 일의 보류분 — 이번 판정 범위 아님, 덮어쓰지 않았음.
- `check-print-guard` 8/8 변경 없음 · `check-design-guard` 신규 위반 0(합계 299 = baseline 295 + 기존 부채 집계 차이, 신규 0) · `check-migration-registry` 미분류·유령·중복 0 · `npm run i18n:verify` Errors 0.
- 서빙 번들 = 빌드 산출물(`main.cd113139.js` cmp 일치 · 빌드 01:39 > 소스 최종 수정 01:33). 새 문자열이 지연 청크에 있음(`548…chunk` reconcile.pay.button/backToInvoices · `2694…chunk` list.filter.allPayments · alreadyPaid 4청크).

## 3. ③ 실호출 · 실브라우저 — 내가 다시 실행

- `health-check --category=invoice-pay-flow` **4/4** (T1 필터·400 / T2 목록↔대조 GET `payable_amount·basis·pay_via_soa·trade_invoice_id` 확정 전·후 일치 / T3 마이그: paid_at=청구서·payment_method 승계·드로어 0·재실행 0·refunded 불변·청구서 미결제 발주 불변 / T4 청구서 문 200→409 ALREADY_PAID·오너 200). 잔재 0, 임시 오너 계정 잔존 0.
- **고장주입 3/3**(팀원 보고 — 재주입 안 함): ① where 줄 제거→T1 실패 ② 마이그 `i.status='paid'` 제거→처음엔 T3 가 못 잡음 → «청구서 미결제 발주 불변» 단언 추가 뒤 실패 확인 ③ `payable_amount→total_amount`→T2 실패. ②에서 검사기가 0건으로 통과하던 것을 잡아 단언을 보강한 것은 4조항 §3(판정 기계부터 의심)대로다. ②주입이 개발 DB 미결제 발주 10건을 paid 로 바꾼 사고는 팀원이 되돌렸고, **내가 확인**: 그 10건 전부 unpaid·paid_at NULL·payment_method NULL · 개발 DB «발주 unpaid·청구서 paid» 드리프트 0 · 역방향(발주 paid·청구서 미결제) 0 · DEVSEED-R10-RECV-886555 는 paid(bank_transfer, paid_at=청구서 2026-06-10) 로 마이그 1건 맞춰진 상태.
- **실브라우저(독립 재측정 · 데모 38 Restaurant Admin 토큰 · 1440 · SW 차단)** — 전체 sweep(11분·메모리 정지) 대신 바뀐 화면 3개만:
  - `/pos/purchase-orders/history`: pageerror 0 · console.error 0 · Pay 버튼 4개 배경 **rgb(5,150,105)** · Payment select 1 · Unpaid 줄 5 · «paid» 선택 → 요청에 `payment_status=paid` 포함 · Pay 버튼 0.
  - `/pos/purchase-orders/46664/reconcile?entity_type=…`: pageerror 0 · Record payment 1(배경 rgb(5,150,105)) · Confirm this total 1 · 돌아가기 **«Back to invoices»** · 클릭 → 모달에 Supplier invoice/Ordered · Bank transfer(제출 안 함, Esc).
  - 같은 주소 scope 없이: pageerror 0 · 돌아가기 **«Back to order»** · Record payment 1.
- 팀원 실측(390 폭 줄바꿈 · 청구서 → Compare with invoice → 대조 → Back → 청구서 목록)은 위와 모순 없음.

## 4. ④ 배포 안전성

- 마이그: 단일 UPDATE·트랜잭션·`FOR UPDATE`·영향행 검증·멱등(재실행 0건 T3 증명). `invoices` 테이블은 soft-delete 칸이 없어(`deleted_at` 0) 조건 누락 없음. `mirrorPaidToPurchaseOrders` 와 비교: 같은 where(unpaid 만) + 설계가 더한 두 가지(cancelled 제외 · `payment_method` 를 청구서에서 승계) — 모두 설계 명시. 스키마·ENUM 변경 0 → `check-enum-parity` 무관. 롤백 경로: 코드 롤백만으로 충분(데이터는 «청구서 paid 인 발주를 paid 로» 한 방향이라 되돌릴 이유 없음).
- **운영 영향: 발주 1행 PO-R10-20260904-001 이 paid 로 바뀐다**(팀원 운영 읽기 실측, 설계 §1-2) — Irene «/배포» 때 배포 루프가 실행. 보고에 그 번호를 적는다.
- 서버 라우트 변경은 where 1줄 + 응답 칸 추가뿐 — 기존 호출부 호환(필드 추가만).
- SW bump·배포 기록은 배포 준비 몫(verify-all ✗1 이 그 항목) — 코드 판정과 무관.

## 5. 조건 (PASS 유지 조건 — 코드 수정 아님)

1. **배포 전 `verify-all --full` 의 mount sweep 1회**(배포 게이트가 어차피 돌린다 — 메모리 게이트가 막으면 기다린다, 우회 금지). 이번엔 서버 메모리 정지로 8역할 전체 sweep 을 못 돌렸고, 나는 바뀐 화면 3개만 좁게 확인했다. 바뀐 3파일은 POS·모바일·KDS 핵심 화면에 안 들어가지만, `ReceivePayModal` 은 발주 상세·발주 대기·`ExternalInvoicePayAction`(청구서 화면)에서도 쓰이므로 전체 sweep 으로 닫는다. 실패하면 배포 중단·재판정.
2. **배포 보고에 운영 1행(PO-R10-20260904-001 → paid) 명시** + 마이그 출력에 찍히는 발주 번호를 그대로 옮긴다. 1행이 아니면(0 또는 2+) 배포 전 멈추고 그 번호를 운영 읽기로 확인.

## 6. 확인 못 한 것 (추측하지 않음)

- 오너 **실브라우저**(데모 오너 매장 2·3 에 외부 업체 받은 발주 픽스처 없음) — API 는 T4 로 증명(스코프 GET 200 · mark-paid-external 200 · 발주 paid). 화면은 매장과 같은 컴포넌트·같은 라우트라 별도 위험을 보지 않는다. 배포 뒤 Irene 확인 항목으로 남긴다(«확인할 곳» 에 오너 링크).
- Irene 가 «동기화 안 됨» 을 본 발주 번호(설계 §4 질문) — 답 없음. 운영 드리프트가 PO 29 하나뿐이라는 실측에 기대어 진행. 다른 번호면 운영 읽기로 재실측.
- ko/en 409 사람말 문구 실화면(설계 §6 ⓔ) — 코드 분기와 4언어 키는 확인했으나 «청구서만 paid» 픽스처로 화면을 띄우지는 않았다. 문구 1개라 되돌리기 쉬움.

## 7. 지문·마커

`fable-gate.js pass --note` 를 이 판정 직후 실행(실행 주체 = 이 Fable 세션). 지문은 워킹트리 전체(미추적 `fable-request-20261029-brand-profitability.md` 포함)라 **커밋 전까지 아무 파일도 더 고치지 않는다.** 설계 §5-4 의 문서 작업(§8-8·§8-9)은 배포 뒤.
