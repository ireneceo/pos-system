# Purple POS — 개발 세션 상태

## 현재 작업 상태

**마지막 업데이트:** 2026-07-06 #3 (**운영 배포 완료** — 모바일중복주문 수리 + 인스펙션 하니스 확장(돈·주문무결성+유저스코프+IDOR가드). Backup 20260706_134639, Smoke 9/9, 안전게이트 6/6. 운영 4흐름 실검증 PASS.)
**버전:** 운영=**v3.67 / SW 4.58** (2026-07-06 배포, 모바일 중복주문 방지 + 하니스 확장)
**작업 상태:** ✅ 배포·검증·버전상승·릴리즈노트 완료. 실물 프린터 종이확인만 Irene 매장 몫.

### ✅ 운영 배포 + 4흐름 검증 완료 (2026-07-06 #3)
- **배포**: `deploy-to-production.sh --auto` — 안전게이트 6/6 통과(인쇄보호8·인쇄필드·디자인·**IDOR가드(신규)**·health107·**하니스22/24(신규)**), DB스키마 동일(마이그0), Backup 20260706_134639, Smoke 9/9. 포함분=모바일중복주문 수리(멱등키+ER_DUP catch)+하니스 확장(order-integrity/유저스코프FK/route-guard)+deploy게이트 5→6.
- **운영 4흐름 실검증**(데모매장 id=1, 실API, 마커정리): 주문관리(생성/재조회/+Round)✓ · **멱등(동시8→1주문,500=0)✓**(배포한 수리 운영실증) · 단계이동(pending→preparing→ready→served)✓ · 결제(cash /payments completed)✓ · 프린트계약(pending-print→printed→재인쇄0,kitchen_items2)✓. health-check 106/107(1=print-guard가 운영 dev-frontend경로부재로 뜨는 아티팩트, 인쇄회귀 아님).
- **정리**: 검증 테스트주문 0(mysql FK-safe), 운영에 쌓여있던 좀비 `node -e` 33개 종료(DB연결 물던 것), 임시파일 0. 앱 정상(production-backend online, HTTP200).
- **미결**: ①버전 상승 여부(모바일중복=사용자체감 → 릴리즈노트 대상 가능, Irene 확인) ②실물 프린터 종이확인(매장, Irene 눈) — 인쇄코드 무변경이라 회귀위험은 없음.

### 진행 중인 작업 — 모바일 중복주문(2번 주문) 수정 [dev 반영·미배포]

**구현 완료 (autosave 커밋 b6ff2545에 포함, HEAD 기준):**
- `dev-frontend/src/utils/offlineOrderQueue.ts`: 카트-안정 멱등키(`getStableIdempotencyKey`/`cartSignature`/`clearStableIdempotencyKey`) + `fetchWithTimeout(20s)`
- `dev-frontend/src/mobile/pages/PaymentPage.tsx`: handlePayment서 `stableIdemKey` 계산→counter/QR-Bank/online 3경로 사용, fetch→fetchWithTimeout, 성공 시 clear, 미사용 import 제거
- `dev-backend/routes/orders-crud.js`(🔒보호파일): 재시도 catch서 ER_DUP_ENTRY→기존주문 조회 반환(동시요청 500 제거). **9줄, 인쇄 블록 무접촉 확인됨**
- P3 가독성: MobileLayout 카트뱃지=총수량(reduce), CartPage 수량 18px bold, PaymentPage 요약수량 bold

**검증 완료:**
- ✅ 동시/순차 같은키 3요청 → 주문 1개(중복0), 동시 500 사라짐 (dev 실호출, 데모매장3)
- ✅ health-check 106/107 (1=orders-crud 보호파일 감지=승인됨) · order-totals 20/20 · 빌드 클린(경고는 기존부채 타파일)
- ✅ orders-crud diff = 멱등 9줄만(16e73e1b→HEAD), pending-print/printed/print-claim/kitchen_items 무접촉

### 다음 확정 작업 (Irene 지시 — 다음 세션서 실행)
> Fable PASS + print-guard bless + 운영 컬럼확인 **모두 이 세션서 완료**. **남은 건 배포 한 줄.**
1. **배포**: `bash /var/www/deploy-to-production.sh --auto` (안전게이트 5/5 자동통과 — print-guard 이미 bless됨). 커밋은 autosave(b6ff2545~)에 이미 있음.
2. 배포 후: 운영서 동시-키 멱등 1회 재확인(같은 key 2요청→주문 1개) 권장.

**Fable 게이트 결과:** ✅ **PASS — 배포 가능** (2026-07-06). 12 동시요청→주문 1개(신규 catch 11회 실증), 돈 무결성(조작 total 무시), 인쇄 계약 7/7·보호블록 무접촉, 오탐흡수 안전(카트라인 id=timestamp라 새 카트=새 키).
- ✅ **print-guard bless 완료** (2026-07-06 07:21, 8파일 신규 기준) — 배포 안전게이트 통과함
- ✅ **운영 orders.idempotency_key varchar(64) + uniq 인덱스 존재 확인** (catch 경로 유효)
- **⇒ 남은 것: `bash /var/www/deploy-to-production.sh --auto` 배포 한 줄만.** 배포 후 운영서 동시-키 멱등 1회 재확인 권장.
- ⚠️ Fable 발견 이슈#1(배포 비차단, **후속**): 모바일 dine-in 자동머지 경로(orders-crud.js:640-693)는 멱등 미적용 — 응답유실/20s abort 후 큐 재전송 시 같은 품목 재머지=계산서 품목 중복 가능(오프라인큐 도입때부터 있던 구멍). 후속: 머지 시 idem 키 기록 후 upfront 대조.

### ✅ 인벤토리 브랜드모드 클러스터 #5/6/23/35/36 — 검증 완료 (2026-07-06, 코드 변경 0)
> Irene 지시로 착수 → **조사 결과 이미 07-04 auto-save(272075de)에 프론트·백엔드 전부 구현돼 있었음**(session-state엔 "잔여"로만 남아 미검증·미보고 상태였음). 재작업 없이 실 API로 end-to-end 증명 후 기록.
- #5 설정 404: `useSettingsModal` 브랜드 분기 → `PUT /product-ingredients/:id`(settings 필드 수용). 실 API PUT+GET 왕복 저장확인 ✅
- #6 발주 seller-sources 404: `useOrderModal` 브랜드 분기 → `GET /product-ingredients/:id/seller-sources`(200, 404 제거) + PO 전송은 `product_ingredient_id` 사용. 백엔드 purchase-orders-crud:731-757·workflow:424/758 처리확인 ✅
- #36 History 미기록: `POST /product-ingredients/:id/adjust-stock`가 InventoryTransaction 기록 → `GET /product-ingredients/transactions`(History 탭)에 노출. 실 API 재고 100→105 이동+거래행 매칭 ✅
- #23 route nav: `InventoryManager`·`TransactionHistorySection` 브랜드 경로(`/brand/product-recipe`·`/product-ingredients/transactions`) ✅(프론트)
- #35 Dismiss no-op: `useAlertResolver` 브랜드=클라 생성 alert 로컬 제거 ✅(프론트)
- **검증**: demo-brand(id=22,brand_id=10) 실 API 5/5 PASS(데이터 원복)·print-guard 8/8 무접촉·코드 변경 0. Fable 게이트 비대상(인쇄/KDS/돈·주문 무접촉).
- **배포**: 이미 main(auto-save 조상)에 포함 → 다음 배포에 자연 편승. 별도 커밋 불필요.

### ✅ 인스펙션 하니스 확장 — 돈·주문 무결성 + 유저스코프 + IDOR 가드 (2026-07-06 #2, dev 검증완료·**Fable PASS**·미배포)
> 후속후보 "하니스 추가 스위트(돈/주문·보안경계)"를 실행. Irene "다해/문제찾아/막 바꾸지 말고 문서화된 규칙 근거로". 단일진실 = 메모리 [[reference_inspection_harness]] · [[reference_idor_sweep]].

**추가/수정 파일 (dev only, 커밋/배포 안 함):**
- `dev-backend/scripts/inspection/suites/order-integrity.js` (신규): 돈·주문 무결성 6불변식 — O-INT-001 최근주문(≥2026-06-06 고정컷) 금액재구성 일치(orderTotals 공식 동형), 002 음수금액, 003 중복 idempotency_key(=모바일중복수리 계약), 004 고아결제, 005 비취소 결제합=total, 006 완료주문 품목존재(창+SEED/IMP제외 라이브게이트). **전부 현재 0.**
- `dev-backend/scripts/inspection/suites/referential.js` (수정): S-REF-006 유저 매장스코프 FK(baseline 2=삭제매장 가리키는 옛 테스트계정), S-REF-007 유저 브랜드/푸드코트/공급사 스코프 FK(0 라이브).
- `dev-backend/scripts/check-route-guard.js` (신규): IDOR(cross-tenant) 정적 가드 — `/restaurant/:param` 무방비 라우트를 print/design-guard 모델(baseline)로 상시화. 인라인검사(req.user.restaurant_id 비교/ensureRestaurant) 감지로 오탐0. **현재 무방비 0.**
- `dev-backend/scripts/inspection/baseline.json`: baseline 2건(R-SC-006, S-REF-006).
- `deploy-to-production.sh`: 안전게이트 **5→6개**(route-guard 4/6 추가, 전부 fail-closed).
- 메모리 3건 갱신(reference_inspection_harness, reference_idor_sweep).

**검증:** 하니스 22/24(신규0·exit0)·order-integrity 6/6·route-guard 무방비0(주입 exit1 실증)·print-guard **8/8 무접촉**·deploy 문법OK. 각 불변식 위반주입→감지→정리 실증.

**Fable 게이트: CONDITIONAL→PASS.** 1차서 **치명 B-1 발견**(route-guard `--summary`가 판정 건너뛰고 exit0=게이트 fail-open, 취약라우트 감지하고도 배포통과). 수정(판정 항상실행)+주입으로 fail-closed 실증→**PASS**. 부수수정: B-3 주석-only false-SAFE 차단(V4 보너스 닫힘), B-2 스코프한계 문서화, O-INT-006 baseline뮤트→라이브게이트화. 잔여 비차단: B-3 우측관용구 false-fail(안전방향·현코드 무영향), O-INT-001 subtotal-NULL 블라인드(Fable 수용동의).

**미결(선택):** 삭제매장 가리키는 옛 RA 테스트계정 2건(irenetest001→r20, reprox→r176) 정리는 유저계정 건드림이라 Irene 지시 대기. route-guard 정규식 우측관용구 양방향 확장(선택). 이 하니스 확장분은 다음 배포에 자연 편승(별도 커밋 불필요, working-tree 배포).

### 후속 후보 (아이디어 메모, 확정 X)
> /개발시작 자동 추천 대상 아님.

- 설정 operations 레이아웃: `SettingsGrid`에 `align-items:start`+`grid-auto-flow:dense` 적용(dev 반영). Irene 확인 대기 — 홀수/전폭 경계 빈칸 남으면 operations만 masonry(CSS columns, 전폭=column-span:all) 에스컬레이션. SettingsGrid 13곳 공유·전폭카드 12개라 전면변경은 눈검증 후.
- `dev-frontend/scripts/ui-layout-sweep.js`: UI 반응형/레이아웃 스위트 — 헤드리스가 무거운 라이브 설정페이지 로드서 hang. 재접근: **localhost 빌드 대상 로드** 또는 더 가벼운 대기/평가.
- ~~인스펙션 하니스 추가 스위트(돈/주문 무결성·보안경계 도메인)~~ → **✅ 2026-07-06 #2 완료**(위 참조: order-integrity 스위트 + 유저스코프 FK + IDOR route-guard, Fable PASS). 보안경계 라우트계층은 health-check가 이미 커버라 DB불변식 대신 IDOR 정적가드만 추가. R-SC-006 dev 미분류 정리(선택)는 잔여.

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
