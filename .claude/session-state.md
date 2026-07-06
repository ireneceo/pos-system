# Purple POS — 개발 세션 상태

## 현재 작업 상태

**마지막 업데이트:** 2026-07-06 (모바일 중복주문 수정 — 구현+검증 완료, Fable 게이트 결과 대기 → bless+배포 대기)
**버전:** 운영=**v3.66 / SW 4.58**
**작업 상태:** 진행 중 — 배포 직전 (Fable 게이트 → bless → 배포)

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

### 후속 후보 (아이디어 메모, 확정 X)
> /개발시작 자동 추천 대상 아님.

- 설정 operations 레이아웃: `SettingsGrid`에 `align-items:start`+`grid-auto-flow:dense` 적용(dev 반영). Irene 확인 대기 — 홀수/전폭 경계 빈칸 남으면 operations만 masonry(CSS columns, 전폭=column-span:all) 에스컬레이션. SettingsGrid 13곳 공유·전폭카드 12개라 전면변경은 눈검증 후.
- `dev-frontend/scripts/ui-layout-sweep.js`: UI 반응형/레이아웃 스위트 — 헤드리스가 무거운 라이브 설정페이지 로드서 hang. 재접근: **localhost 빌드 대상 로드** 또는 더 가벼운 대기/평가.
- 인스펙션 하니스 추가 스위트(돈/주문 무결성·보안경계 도메인), R-SC-006 dev 미분류 정리(선택)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
