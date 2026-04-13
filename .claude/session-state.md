## 현재 작업 상태
**마지막 업데이트:** 2026-04-13
**현재 버전:** v3.13
**작업 상태:** 완료 (DB 변경은 dev+prod 즉시 반영, 코드 변경은 배포 3으로 완료)

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션 — 2026-04-13)

#### 1. Dangling Restaurant Admin 가드 (치명 — 배포 3에 포함, 운영 반영 완료)
- 증상: `hsoooj@naver.com` (prod user 30) - Restaurant Admin인데 `restaurant_id=NULL`. 로그인 시 프론트가 `/restaurant/1/dashboard` 폴백 → 모든 API 403/404
- 백엔드 `POST /api/users`: role=Restaurant Admin/Staff인데 restaurant_id 없으면 400 차단
- 백엔드 `PUT /api/users/:id`: 업데이트로 dangling 상태 만드는 시도 차단 (restaurant_id null 또는 role 승격 시)
- 백엔드 `POST /api/users`: `skipVerification is not defined` ReferenceError 부수 fix (req.body destructure)
- 프론트 `App.tsx`: `user.restaurantId || '1'` 하드코딩 폴백 제거 → `NoRestaurantAssigned` 에러 화면 렌더
- 프론트 `ProtectedRoute.tsx`: restaurant-scoped 역할이 restaurant_id 없이 `/restaurant/:id/*` 접근 시 `/pos`로 바운스 (cross-tenant 누수 차단). `|| '1'` 폴백 4건 모두 제거
- 프론트 `LoginPage.tsx` / `OperationInquiryPage.tsx`: 하드코딩 폴백 제거
- dev/prod DB 양쪽에서 hsoooj@naver.com 테스트 계정 삭제

#### 2. AddonModule 전체 역할 1:1 분리 (DB만, 배포 불필요)
- 사이드바 메뉴와 1:1 모듈 매핑을 위해 번들 모듈 8개 해제
- 신규 advanced 모듈 8개 생성 (dev + prod 동시):
  - restaurant: `work_manuals`, `ingredients`, `suppliers`
  - brand: `brand_work_manuals`, `brand_ingredients`, `brand_suppliers`
  - foodcourt: `fc_work_manuals`
  - owner: `owner_work_manuals`
- 기존 모듈 ui_routes 축소: `notices`, `recipe_management`, `inventory_management`, `brand_notices`, `brand_product_recipes`, `brand_inventory`, `fc_notices`, `owner_notices`
- 이름 정리: `inventory_management` + `brand_inventory` "Inventory & Supplier Management" → **"Inventory"**
- `menu_management`는 그대로 유지 (menu/categories/options 번들 유지 — Irene 지시)

### 운영 배포 (이번 세션)
- 배포 1 (23:14 MYT 2026-04-12): 인보이스 i18n + nowrap + PDF 분할 — `main.7c8f69a7.js`
- 배포 2 (23:52 MYT 2026-04-12): hardware quantity/unit_price + DELETE FK fix + payment_settings recalc — 백엔드 only
- 배포 3 (06:33 UTC 2026-04-13): modification_history 양형식 + Brand-Restaurant 연결 + Dangling Admin 가드 — `main.f5a7070a.js`, smoke 10/10, 버전 v3.13 유지
- 배포 4 (08:10 UTC 2026-04-13): no-op 재배포 (모듈 이름 이슈 진단 중 Irene 요청) — `main.f5a7070a.js` 동일 해시

### 중요: 운영 영향 (수동 조치 필요)

신규 모듈 8개는 기존 플랜에 **자동 포함되지 않음** (opt-in 정책). 기존 고객의 접근권 복구하려면 System Admin이 수동으로 플랜 편집 필요:
- **Restaurant plans (Basic/Pro/Enterprise)**: Work Manuals, Ingredients, Suppliers 체크 — 14개 레스토랑 영향
- **Brand plans (Basic/Pro/Enterprise)**: Work Manuals, Ingredients, Suppliers 체크
- **Foodcourt plans**: Work Manuals 체크
- **Owner plans**: Work Manuals 체크

위치: `https://purplehere.com/pos/admin/plans` → 각 플랜 Edit 모달 → Advanced Modules 섹션

### 다음 할 일
1. Irene 수동 플랜 편집 (위 4개 역할 플랜별로 신규 advanced 모듈 체크)
2. 모든 역할 모든 페이지 레스토랑 이름 옆에 `branch_name` 표시 (같은 브랜드 내 이름 중복 구분)
3. `POST /api/restaurants` requireRole 누락 (HIGH 보안 갭) 수정
4. "No Active Subscription" 배너 정책 결정

### DB 변경 (이번 세션)
- `invoice_items` 테이블에 `quantity INT NOT NULL DEFAULT 1`, `unit_price DECIMAL(10,2)` 컬럼 추가 (배포 2 때)
- modification_history JSON 컬럼 데이터 정합성 복구 (배포 2 때)
- `addon_modules` 테이블: 8행 신규 INSERT + 8행 UPDATE (ui_routes 축소 + 이름 정리). dev+prod 양쪽 반영

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
