## 현재 작업 상태
**마지막 업데이트:** 2026-04-11 (운영 배포 + /개발완료 — 버전 v3.12 유지)
**현재 버전:** v3.12
**작업 상태:** 완료

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션 — 2026-04-11)

#### 1. notices 데모/테스트 계정 제외- `routes/notices.js` broadcast 4개 target(all/role/brand/foodcourt)에서 `is_demo=false, is_test=false` 필터
- `select_restaurants`는 명시 선택이라 그대로
- Restaurant Admin/Staff는 소속 레스토랑까지 교차 체크
- 검증 10/10, 원복 완료
- 문서: `docs/DEMO_ACCOUNT_GUIDE.md` 보호 규칙 테이블 업데이트

#### 2. admin 하드웨어 max_quantity 무제한 UI- `SystemProductManagementPage.tsx` Hardware Package 편집 모달
- loader `|| 1` → `?? 0` (기존 0이 1로 변조되던 핵심 버그)
- 신규 addon 기본값 0, input `min="0"`, `|| 0` fallback, `(0 = unlimited)` 힌트
- **운영 DB**: `system_product_addons.max_quantity=1`인 108건을 0으로 일괄 UPDATE (백업 `system_product_addons_20260411_175650.sql`)

#### 3. /packages Quote Summary 소프트웨어 구독 라인- `PackagesPage.tsx` Request a Quote 모달: 플랜/청구주기/가격 + "Billed separately" 안내
- 하드웨어 one-time 총액과 dashed divider로 분리
- 체크박스/플랜/가격 없을 때 숨김 가드
- i18n 2 keys × 4 lang (en/ko/zh/ms)

#### 4. /packages Request a Quote 모달 레이아웃- z-index `200 → 10000` (Landing 헤더 1000 뒤로 숨던 문제)
- ModalContent `max-height: calc(100vh - 40px)`, flex column
- ModalTitle 상단 고정(`flex-shrink:0` + border-bottom)
- ModalForm 중앙만 스크롤(`overflow-y: auto`)
- ModalButtonRow 하단 sticky(`position: sticky; bottom:0` + border-top)
- 모바일(≤640px) 풀스크린

#### 5. admin payment-settings 응답 형식 표준화- `GET/POST /api/admin/payment-settings` → `{success, data}` 래핑
- 에러 응답 `{success:false, message}` 정규화
- 프론트에 legacy/새 래핑 둘 다 수용하는 defensive 언랩
- **`/available/:currency`는 연쇄 영향 커서 별도 작업**

### 운영 배포 (2026-04-11 18:32)
- commit `94a0bcfd` (기능) + `149ec25e` (CHANGELOG)
- `main.cf7275d4.js` 운영 반영
- smoke: 10/10 passed
- 백업: `/var/www/backups/20260411_183058`

### 후속 과제 (별도 세션 권장)
- **Phase C-6 나머지** 거대 컴포넌트 4개 분할 (패턴 확립됨, 참조: `components/Inventory/`)
  - `pages/LiveOrders/LiveOrdersPage.tsx` 4458줄
  - `pages/BrandGeneral/BrandInvoicesPage.tsx` 4566줄
  - `pages/Admin/InvoicesPage.tsx` 4205줄
  - `mobile/pages/PaymentPage.tsx` 2597줄
- payment-settings `/available/:currency` 표준화 (brands/foodcourts sibling 포함, 프론트 6+ 페이지)
- DB sync "Too many keys specified" 경고 (10 models, MySQL 64-key 한도)
- `entity_plan_charges` 테이블 운영 동기화

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
