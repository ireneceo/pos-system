# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-04-29 (Staff 삭제 기능 fix 추가, v3.20 배포 후보 누적)
**버전:** **v3.19** (운영) → 누적 v3.20 배포 후보
**작업 상태:** 개발 완료 — Irene 브라우저 테스트 → /배포 v3.20

### 진행 중인 작업
- 없음

### 2026-04-29 추가 — 블로그/랜딩 admin 작업 OS-사용자 무관 패턴 정착
- 문제: lua OS 사용자가 `/글쓰기` 발행 단계에서 막힘. 원인은 백엔드 `.env`(irene:irene 600) 권한 — application 권한 차단 아님.
- 해결: 모든 admin 작업을 HTTP API 호출 패턴으로 통일 (DB 직접 접근 금지)
- 신규: `scripts/sa-token.js` (SA JWT 발급 헬퍼), `scripts/blog-bulk-publish.js` (login + bulk POST 통합)
- 자격증명: `~/.purple-pos/creds.json` (chmod 600) 또는 `PURPLE_USER`/`PURPLE_PASS`
- 6개 스킬에 ★ 사용자 환경/권한 모델 섹션 추가: `/글쓰기`, `/블로그발행`, `/블로그감사`, `/블로그리서치`, `/블로그초안`, `/블로그캘린더`
- `/블로그발행` 전체 재작성 (모든 단계 API 패턴)
- `/글쓰기` 6단계 재작성 (`blog-bulk-publish.js` 사용 강제, 우회 명시 금지)
- 검증: T1 자격증명 부재 fail-fast ✓ / T2 401 fail ✓ / T3 payload 부재 fail-fast ✓ / T4 bulk POST + group_id 응답 ✓ / health-check 43/43 ✓

### 2026-04-29 추가 — Staff 삭제 기능 수정
- 문제: `/pos/admin/staff` 페이지에서 `staff.role !== 'System Admin'` 가드로 SA 역할 staff는 삭제 버튼 자체가 비표시
- Frontend `StaffManagementPage.tsx`: 가드를 `currentUser.id !== staff.id`로 변경 (자기 자신만 차단). confirmDelete 에러 메시지를 alert로 노출.
- Backend `routes/users.js` DELETE: self-delete 차단 가드 추가 (`req.user.id === req.params.id` → 400)
- Admin123(id=228, han.sj.lua@gmail.com, 어제 잘못 만든 SA) cascade 삭제 — 같은 이메일/유저네임 slot 비음
- 검증: T1 self-delete 차단(400) ✓ / T2 같은 이메일 재가입(201) ✓ / T3 타 user 삭제(200) ✓ / health-check 43/43 ✓ / 빌드 `main.cf314102.js`

### 완료된 작업 (이번 세션 — 2026-04-28)

**Timezone Coverage 일괄 (Frontend 2 + Backend 11)**
- 모든 toLocaleDateString/TimeString 호출에 entity 타임존 적용 (operation_settings.timeZone, KL fallback)
- 검증: invoice billing period KL `2/1-2/28`, NY `1/31-2/27` 차이 확인 = timezone 실작동 증명

**모바일 상단 헤더 fix**
- StaffInfo 480px → 768px 분기 (모바일 전체 아바타만 표시)
- HeaderActions gap 480px 미만 4px / ProfileButton padding 4px·gap 0
- LoginPage LanguageSelector globe variant 통일 (dropdown 우측 정렬)

**항목 12 — Restaurants 계약 뱃지** (Contract Phase 2 잔여 마무리)
- `routes/restaurants-crud.js` list endpoint batch contract fetch (N+1 회피, stage priority sort)
- Manager/Owner Restaurants 페이지에 ContractBadge + 만료일 표시

**Supply Chain Sprint 7 — Operational Hardening** (4 영역 + 12 빈틈 + ε.1~4 결정)
- inventory_transactions/batches polymorphic (entity_type/entity_id + hook + 백필 86 rows)
- Returns 양방향 환원 (brand/foodcourt seller 분기 + Currency invariant)
- 수령 splits + auto-returns + 사후 discrepancy PUT
- PO.status ENUM 확장 (in_transit, delivery_failed)
- Carrier webhook 인프라 (HMAC + 2단계 + idempotency)
- 신규 admin 페이지 `/pos/admin/carrier-webhooks` + Carriers 모달 webhook 섹션
- path-level middleware fix (brand-inventory.js router.use)

### 검증 결과
- test-sprint7.js: **19/19 PASS**
- /검증 10단계: **모두 PASS** (state-hydration 0, 빌드 exit 0, health-check 43/43, SPA 13/13, 역할 격리 12/12, API roundtrip 11/11)
- 배포 artifact: `main.6f0b969f.js` 1.71MB

### 변경 파일

**Backend (12)**
- 신규: `models/CarrierWebhookEvent.js`, `routes/carrier-webhooks.js`, `scripts/sprint7-migration.js`
- 수정: `models/{InventoryTransaction,InventoryBatch,PurchaseOrder,PurchaseOrderItem,PurchaseOrderReturn,Carrier,index}.js`, `routes/{po-returns,purchase-orders,carriers,brand-inventory,restaurants-crud,notices,invoices-helpers,invoices-main,restaurants-subscription,subscriptions}.js`, `services/{authService,invoiceScheduler,subscriptionScheduler,soaScheduler}.js`, `utils/{notificationTemplates,invoiceEmailTemplate}.js`, `server.js`

**Frontend (10)**
- 신규: `pages/Admin/CarrierWebhookEventsPage.tsx`
- 수정: `pages/PurchaseOrders/PurchaseOrderDetailPage.tsx`, `pages/Admin/CarriersPage.tsx`, `pages/Manager/RestaurantsPage.tsx`, `pages/Owner/OwnerRestaurantsPage.tsx`, `pages/BrandGeneral/BrandGeneralDashboard.tsx`, `pages/FoodcourtGeneral/FoodcourtFloorPlanPage.tsx`, `pages/Login/LoginPage.tsx`, `App.tsx`, `components/Layout/MainLayout.tsx`

**Docs (3)**
- 신규: `docs/SUPPLY_CHAIN_SPRINT_7.md`
- 수정: `docs/PURCHASE_ORDER_SYSTEM.md` (Sprint 7 정식 해결 노트 추가)
- 메모리 신규: `reference_entity_polymorphic.md`, `reference_webhook_hmac.md`

---

## 🎯 다음 세션 — Irene 브라우저 테스트 (15분 코스) → /배포 v3.20

서버 사이드 검증은 모두 끝났음. 브라우저 클릭 흐름만 Irene이 직접 확인.

| # | 시간 | 액션 | 확인 포인트 |
|---|---|---|---|
| 1 | 2분 | SA 로그인 → `/pos/admin/carrier-webhooks` | 신규 페이지 진입. 사이드바 ⚡ "Carrier Webhooks" 추가됨. 통계 카드 4종 |
| 2 | 3분 | "🧪 Send Simulate Event" → Lalamove + JSON payload 그대로 → Send | `✓ Event N — status: applied/failed` 결과. SIM 노란 배지 row. View → Drawer (raw payload + signature_valid + applied_at) |
| 3 | 2분 | `/pos/admin/carriers` → Lalamove Edit → 모달 하단 "⚡ Webhook Integration" | ✓ Active 표시 + Endpoint URL 노출 |
| 4 | 2분 | 🔄 Regenerate Secret → 노란 경고 → Confirm | 빨강 박스에 secret 한 번 큰 글씨 + 📋 Copy 버튼 |
| 5 | 2분 | BG 로그인 → `/pos/brand/general/purchase-orders` → shipped 상태 PO | PO Detail 진입 |
| 6 | 3분 | Receive → ⊕ Report issue → segmented control → Damaged 15 | "✦ Auto-return will be created for 15..." 인라인 안내 |
| 7 | 1분 | Confirm Receipt → PO 새로고침 | Returns 섹션에 auto-generated 라벨 + Brand seller stock 환원 (BG inventory 페이지) |

### 모바일 반응형 (선택, 추가 5분)
- `/pos/login` 375px: globe LanguageSelector 잘림 없음
- MainLayout 헤더 480~768px: 아바타만 표시
- Receive Modal split row 375px: 가로 grid → 세로 카드 stack

### 테스트 데이터 (live)
- R#38 PO 40건 (다양한 stage)
- Lalamove carrier: webhook secret + status_map 자동 설정 (검증 단계에서 생성됨)

### 테스트 OK 시 → `/배포` v3.20

배포 묶음:
1. Timezone Coverage 일괄
2. 모바일 헤더 fix
3. 항목 12 — Restaurants 계약 뱃지
4. Sprint 7 — Operational Hardening
5. path-level middleware fix

배포 스크립트: `/var/www/deploy-to-production.sh` (sprint7-migration.js 자동 실행, 콘텐츠 sync 기본 ON)

### Sprint 7 미완료 (후속, v3.21 또는 별도)
- BG Inventory Transactions tab UI (backend ready)
- i18n 4언어 키 (모든 t() 호출에 영문 fallback 있어 동작 영향 없음)
- Carrier 운영 매뉴얼 (secret 등록 절차)
- Sprint 8~10 (15개 빈틈 중 11개 남음)
- 또는 Referral System 신규 시스템 분기

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
