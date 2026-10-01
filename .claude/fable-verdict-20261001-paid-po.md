# Fable 게이트 판정 — «결제 뒤 발주 금액 정정» (2026-10-01)

대상: 개발 SW `5.68-paid-po-total-fix-20260930` · 운영 `5.67` 대비 변경 12건 · 지문 `4e2608075113…`
Irene 원문(2026-10-01): 「응응. 하나씩 다 해. 제대로」 → 이 묶음은 게이트 판정 후 배포.

## 판정: **PASS** (배포 가능 · 차단 조치 0 · 비차단 후속 3건)

## 1. 범위 대조 (설계 밖 변경 0)
운영 서버 `production-backend` 사본을 ssh 로 읽어(쓰기 0) dev 와 직접 diff — git 커밋 경계(ba45ec6f6 에 v3.105 분과 섞임)에 의존하지 않았다.
- `services/purchaseOrderPayment.js` (+44): `netDrawerOut` · `adjustPaidAmount` 신설, `reversePayment` 의 되돌릴 금액이 «원래 한 줄» → «순출금». export 2개 추가. 그 외 줄 무변경.
- `services/reconcileInvoiceSync.js` (+5): `opts.allowPaid` 일 때만 결제된 청구서 재작성 허용, finalize 뒤 `paid_amount = total_amount`. 외부 공급업체 게이트(①)는 allowPaid 보다 **앞**에 있어 가입 판매자 청구서는 여전히 안 건드린다.
- `routes/cost-reconciliation.js` (+17): 커밋 뒤 `allowPaid: wasPaid` 전달 + 결제된 발주면 별도 트랜잭션으로 `adjustPaidAmount` · 응답 `paid_adjustment`. 라인 저장·원가·전파·소급 블록 무접촉.
- `scripts/health-check.js` (+33): cash 계약 1건 신설(42 결제 → 40 확정 → 45 재정정 → 취소 순 0).
- 프론트: `InvoiceReconcilePage.tsx` 타입 1칸 + 안내 1줄(결제됨 ∧ 외부일 때만) · purchaseOrders 4언어 키 1개 · `sw.js` 5.68.
- 기록 JSON 1건 신규. `.sweep-cache.json` 은 검증 산출물.
- 🔒 인쇄 보호파일 8/8 무변경 · DB 스키마 변경 0 · 마이그 0 · 🔒 KDS 무접촉.

Irene 선택 «발주에 총액만 적으면 차액 자동» 과 규칙 「아이템별 수정 > 이후 반영 체크 / 총액 수정 > 이번 인보이스만」에 맞는다. 기존 Fable 규칙 두 개(09-10 «대조 총액을 낸다» = `payableFrom` · §5-3 «지우지 않고 반대 기록»)의 연장이며 새 원장·새 칸 0.

## 2. 가드 스크립트 (내가 직접 실행)
print-guard 8/8 변경 없음 · design-guard 신규 0 · timezone 신규 0 · migration registry 드리프트 0 · i18n verify Errors 0 · check-sensitive-diff = ②돈 1건(이 판정의 대상) + 안전망 1건(health-check, 근거 = 계약 신설).

## 3. 실호출 · 반증 (내가 직접)
- `health-check --category=cash` **19/19** (신설 계약 포함, 실제 POST /pay → /reconcile total_only → /refund-payment).
- **고장주입(팀원 2종과 다른 경로)**: `reconcileInvoiceSync` 의 `paid_amount` 동기 1줄을 끈 뒤 pm2 restart → 신설 계약 **✗ 1건 실패**(청구서 total 40 / paid 42 로 갈림을 정확히 잡음) → cp 원복(cmp 동일) → restart → **19/19**. 워킹트리 clean 유지. 팀원 반증 2종(차액 호출 제거·취소를 원래 금액으로)과 합쳐 세 갈래(드로어 차액·취소 순금액·청구서 동기) 모두 반증됨.
- `verify-all`(기본) 결과는 §6.

## 4. 운영 데이터 대조 (읽기만 · ssh stdin 실행, 운영에 파일 0)
- 매장10 PO 12·26·52: 전부 `cash` · `paid` · 미대조(`invoice_reconciled_at` null) · 드로어 out 1줄씩(17.50/30.00/70.00, 전부 shift 4) · 청구서 131/140/159 paid = total. 코드의 전제(cash_movement_id 있음 · 외부 공급업체 · 순출금 = 원래 한 줄)와 정확히 일치.
- 매장10 열린 시프트 **정확히 1개**(id 4, 2026-07-07 개시, 미마감). 운영 전체 열린 시프트 2개 이상인 매장 **0** → `MULTIPLE_OPEN_SHIFTS`·`no_open_shift` 가 첫 사용에서 날 조건이 지금 없다.
- 결제된 외부 공급업체 발주 중 현금은 매장10 3건뿐. 나머지(매장8·브랜드1·매장10 bank_transfer, PO 60·65 는 method null)는 `not_drawer_cash` 로 드로어 무접촉 + 청구서만 정정 → 의도대로.

## 5. 배포 안전성
마이그 0 · 롤백 = 코드 되돌리기(이전 백업 디렉터리 복원) · SW 5.68 > 운영 5.67 · 프론트 번들(dev 05:50 빌드)에 `5.68` 과 `reconcile.step1.paidAdjust` 포함 확인. 빌드 뒤 커밋 0fa8d5ecc 는 타입 선언 중복 제거뿐(런타임 무영향, 배포 스크립트가 다시 빌드).

## 6. 기계 게이트 verify-all (기본) — 22/23 · 실패 1 = «번들 신선도»
- 통과 22: 인쇄 무결성·인쇄 필드계약·디자인·i18n 하드코딩·IDOR·마이그 레지스트리·배포 준비(기록 7칸)·타임존·데스크탑 피드·hydration·죽은 핸들러·매출 정의·SEO 주소·통화·훅 TDZ·민감 diff·계약 테스트·health-check 전체·인쇄 라우트 가드·타입 기준선·i18n 4언어·인스펙션.
- 실패 1 «번들 신선도»: 서빙 번들(09-30 05:50 빌드)보다 `InvoiceReconcilePage.tsx` 가 새롭다. 원인 = 빌드 **뒤** 커밋 0fa8d5ecc(중복 타입 선언 `seller_is_external?: boolean` 1줄 삭제 — TS 타입 전용, 내보내는 JS 0 변경). 번들은 기능적으로 소스와 같다. 코드 결함이 아니라 **순서 결함**(프론트 빌드 1회 규칙 위반: 빌드 뒤에 소스를 또 고침).
- **배포 전 기계 조치(판단 불필요 · 팀원 실행)**: `cd /var/www/dev-frontend && npm run build:dev` → `node scripts/verify-all.js` 23/23 확인 → `/배포`. 빌드 산출물(`dev-frontend-build/`)·`.sweep-cache.json` 은 gitignore 라 **게이트 지문이 안 바뀐다**(마커 유지). 소스는 한 글자도 고치지 말 것(고치면 마커 사망 + 이 판정 무효).

## 7. 비차단 후속 (배포 뒤 다음 묶음 · 팀원 몫 · 이 판정의 조건 아님)
1. **`paid_adjustment` 결과를 대조 화면 결과문에 보이기** — `invoice_sync` 미동기 사유는 보여 주는데(§8-3 B-4) 차액 결과는 안 보인다. 열린 시프트 0개(`no_open_shift`)·2개 이상이면 청구서는 고쳐지고 드로어만 안 움직인 채 **조용히** 넘어간다. 다음 저장 때 시프트가 열려 있으면 순출금 기준으로 스스로 맞춰지므로 데이터는 안 깨지지만, Irene 신고 문장(「대조해도 현금 그대로」)이 설명 없이 재현될 수 있다. 결제의 `drawerSkipped` 모달과 같은 모양으로 1줄(adjusted 면 «차액 ±N 현금관리에 기록» / no_open_shift 면 «시프트가 없어 드로어 미반영 — 시프트 열고 다시 확정»). 운영은 지금 시프트가 상시 열려 있어 차단하지 않는다.
2. **`reversePayment` 순출금의 가장자리** — «결제 → 시프트 없는 상태에서 취소(drawerSkipped, in 없음) → 재결제 → 취소» 순서면 순출금에 첫 결제분이 남아 되돌림이 커진다(옛 코드는 마지막 한 줄만 되돌렸다). 실제로는 시프트 없이 취소한 뒤 재결제하는 드문 경로. 고치려면 `netDrawerOut` 을 **현재 `cash_movement_id` 이후의 이동만**으로 좁히면 두 의미가 한 번에 맞는다. 운영 데이터엔 해당 사례 0.
3. 기존 결함(이번 범위 밖): `reimbursePersonalPayment` 는 `payableFrom` 이 아니라 `total_amount` 로 갚는다 — 대조 총액이 다르면 개인에게 발주액을 갚는다. 개인금액 결제에 대조를 쓰는 사례가 생기면 그때 같은 규칙으로.

## 8. 확인 불가 (추측 안 함)
- `no_open_shift` · `MULTIPLE_OPEN_SHIFTS` 분기는 실호출하지 않았다(코드 판독 + 기존 결제 경로의 같은 분기가 health-check 로 증명됨).
- 실브라우저에서 «이 총액으로 확정» 클릭 뒤 현금관리 화면에 «Amount corrected» 줄이 뜨는 모습 — 팀원 mount sweep 은 크래시 0 이지만 이 클릭 흐름은 배포 후 Irene 실사용(매장10 PO 12·26·52 중 1건)으로 확인.

## 9. 마커 · 기록 순서 (게이트 지문 주의)
이 판정 파일은 미추적 파일이라 지문에 들어간다 → **파일을 쓴 뒤** `fable-gate.js pass` 를 찍었다. 배포 전에 이 파일·기록 JSON·session-state 외 문서를 건드리거나 **커밋하면 마커가 죽는다**(HEAD 트리 해시 포함). 기록·커밋은 **배포 후**에.
