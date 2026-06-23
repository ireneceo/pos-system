# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-06-22
**버전:** **v3.61 운영 배포 완료** (2026-06-22). 배포 2회 Backup 20260622_204037·211326, Smoke 9/9, 스키마 dev=운영 완전일치(144=144), SW=3.90.
**작업 상태:** 완료

### 진행 중인 작업
- 없음 (발주/재고 개선 묶음 검증 완료 — 아래)

### 완료된 작업 (이번 세션 추가, 2026-06-23 — DEV·미배포)
- **발주/재고 개선 묶음** (auto-save 2c01c798 마무리 + 검증):
  1. 입고예정(on-order) 뱃지 — 활성 발주(submitted~partial_received)의 (ordered−received)×conversion 을 ingredient별 집계해 재고 목록에 "↧ N incoming" + 가장 빠른 입고예정일. `inventory-core.js`·`Inventory/types.ts`·`Inventory/sections/StockListSection.tsx`
  2. "Add to My Stock" 양방향 등록 — 카탈로그 상품을 주문 없이 스톡아이템으로 등록(stockOnly) + 셀러 SearchableSelect·미분류 버킷·최신순 정렬. `NewPurchaseOrderPage.tsx`·`supplier-directory.js`(catalog created_at DESC)·purchaseOrders.json(4언어)
  - 검증: build exit0+dev배포(SW 현행)·on_order 실API 8/8(수식 (5-2)×3=9 정확+정리복귀)·supplier-catalog 200 서버정렬·RA/BG ingredients created_at 확인·print-guard 8/8·design 신규0·i18n 0·health 107/107. 운영 배포 대기(Irene /배포).

### 완료된 작업 (이번 세션, v3.61)
- 이메일 바운스 차단 — notificationService is_test 가드 + 데모계정 정규화 (surgical 운영배포)
- 자동프린트 Q1/Q2 — OFF→ON 옛티켓 폭주(MainLayout cutoff) + 밀릴때 미인쇄(backlog) 수정. billPrint 무수정
- 발주 같은 공급업체 합치기(merge + staging consolidate, 공급업체당 1 PO) + 아이템/PO 삭제 + 카트 영속화 + "Planned Order" 개명 + Pending POs 링크
- 외부공급업체 — 디렉토리 프라이버시 + 재료에서 선택방식 등록 + from-legacy 브리지 + WhatsApp/Email 품목목록 + ConnectSellerModal 정렬 + 품목 이름표시
- 플로어플랜 핫픽스 — 새주문 알림음 모든 주문(테이블 포함) + 헤더 반응형(≤1440 gear 수납·테마 축약)
- 스키마 정합 — 고아 컬럼 users.push_preferences 제거 → dev=운영 완전일치
- with MIN QZ 진단 티켓 168건 정리 + 응대 (운영)

### 다음 확정 작업
- **브랜드제너럴(BG) 오퍼레이션 메뉴 동일 적용 (Irene 확정 2026-06-22)** — RA 발주·공급업체 흐름을 BG에 맞게. 상당부분 buyer-agnostic이라 이미 동작(검증 필요) + BG 재고(ProductIngredient) 화면 진입점 대응. 계획서 `docs/BG_OPERATION_MENU_PARITY.md`. 발주 전체 `docs/PURCHASE_ORDER_SYSTEM.md §H`.

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- 실프린터 종이 확인 — autoprint Q1/Q2(방식코드 무변경 저위험) Z-Report·주방티켓 현장 눈확인
- 플로어플랜 새주문 소리 — 운영 실주문 + 스피커 ON 귀확인
- 브랜드공유 외부공급업체 상품 동반 + 활성/비활성 토글 (docs EXTERNAL_SUPPLIER_PRODUCTS §9-2)
- 쿠폰/외부공급업체 페이지 i18n (영어 하드코딩 → 4언어)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
