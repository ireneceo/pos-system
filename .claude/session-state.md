# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-04-29 (PO/Supplier/Invoice 통합 UX 정리 완료)
**버전:** **v3.19** (운영) → 누적 v3.21 후보 (개발 미배포, Sprint 7 + 이번 세션 변경 모두 포함)
**작업 상태:** 완료

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)

**Cart 페이지 (`/pos/purchase-orders`):**
- viewport 고정 (PageWrap, cart 푸터 항상 보임)
- 타이틀 "Purchase Order" (4 언어)
- 검색 확장 — name/sku/desc/unit/category.name/company.name OR-검색

**PO history (`/pos/purchase-orders/history`):**
- LiveOrders 동일 FilterToolbar (DatePeriodFilter + SearchableSelect 공급업체)
- 우측 슬라이드 패널 (PO번호 클릭 또는 View → 전체 DetailPage embedded)
- Print/Download 아이콘 (이미지 + 텍스트 제거)
- 인보이스 섹션 + View/Download (외부/시스템 인보이스 모두)

**PO Detail:**
- embedded mode — Modal 패턴 (EmbeddedTitle + Content + EmbeddedFooter sticky)
- Edit 버튼 제거 (완료된 주문 수정 불가), "+ Order More" 액션

**PO 액션/데이터:**
- DB 컬럼 — `external_invoice_url/filename/uploaded_at`
- BE endpoints — upload-invoice (외부 공급업체만), mark-received
- list/detail 응답 보강 — item_count/total_quantity/seller_name/is_external/external_invoice_url/trade_invoice_id

**통화 정책:**
- createPurchaseOrderCore 에 `NO_BUYER_CURRENCY`/`CURRENCY_MISMATCH` 차단 + `/pos/settings` 안내
- FE confirm 모달

**사이드바 (4 역할):**
- 섹션명 Suppliers → Order
- 메뉴: Purchase Order / Order History / Suppliers (Purchase Invoices 메뉴 제거)
- Suppliers 1메뉴 (My/Find 페이지 내 PageTab 통합)

**Suppliers 페이지:**
- My Suppliers ↔ Find Suppliers 탭바
- "+ External Supplier" → "External Supplier"

**Stock Items:**
- Ingredients → Stock Items (4 언어)
- Products 섹션 → Operations 섹션 (Inventory 위)
- AddonModule(inventory_management).ui_routes 에 `/restaurant/*/ingredients` 추가

**Invoice 통합:**
- Restaurant Invoices 페이지에 SOA 묶음 inline 카드 (별도 탭 X)
- SoaBundleRow — 보라 SOA 뱃지 + 월 + 공급업체 + count + total + Pay All / Download
- expand 시 child 인보이스 (참고용, 결제버튼 X)
- All / To Pay 탭에서 SOA child 자동 hide
- BE — `/api/purchase-invoices/soa/:supplierId/pay`, `/pdf` (표지 + 합본)

**데이터 fix:**
- tracking_info.events.note Object 저장 버그 (mark-received/mark-sent-external 인자 순서 오류) 수정
- 기존 corrupt PO 자동 정상화

**샘플 데이터:**
- PO 4건 (PO-R5-SAMPLE-01~04, status=received) → Trade Invoice 4건 → SOA 1건 (S4 Sup Co. MYR 280.60)

### 다음 할 일

1. **선택 — Owner/Brand General/Foodcourt General 인보이스 페이지에도 SOA inline 표시 패턴 동일 적용** (현재 Restaurant Admin 만 적용됨)
2. `deploy-dev.sh` wrapper 의 build 출력 swallow 버그 수정 (현재 우회: `npx react-scripts build` 직접 실행 + 수동 cp)
3. 운영 배포 (`/배포`) — v3.21 묶음 (Sprint 7 + 이번 세션) — Irene 결정

---

## 환경 / 인증 현황

- 백엔드: dev-backend (PM2, port 3001), uptime ~30분
- 프론트: nginx → /var/www/dev-frontend-build, 배포된 번들 `main.4463cd8e.js` (2026-04-29 18:28)
- DB: purple_dev_db (MySQL)
- 테스트: kdine_admin (Restaurant Admin, restaurant_id=5)

---

## 주요 문서 위치

- `/var/www/CLAUDE.md` — 프로젝트 워크플로우 + 검증 절차
- `/var/www/DEVELOPMENT_PLAN.md` — Phase 로드맵 + 작업 히스토리
- `/var/www/CHANGELOG.md` — 배포 전 변경 내역 (Unreleased)
- `/var/www/dev-frontend/UI_DESIGN_GUIDE.md` — Modal 패턴, 디자인 토큰
- `/var/www/docs/INVOICE_SYSTEM.md`
- `/var/www/docs/SUPPLY_CHAIN_SPRINT_*.md` — Sprint 1~7 설계 문서

---

## 복구 가이드

새 Claude 세션 시작 시:

```
session-state.md 읽고 이어서 개발해.
```
