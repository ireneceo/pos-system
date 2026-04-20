## 현재 작업 상태
**마지막 업데이트:** 2026-04-20 21:XX UTC (저녁)
**작업 상태:** 완료 (미배포)

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션 — 2026-04-20 저녁)

1. **Brand Franchise Map / Foodcourt Branch Map — Standalone 창 분리**
   - `window.open(_blank)` 새 창, PosLayout 밖 라우트
   - 사이드 리스트 패널 (지도 확대 + 상세 정보)
   - 핀 스타일 정제 (외부 보라 그림자 제거, 선택 링, franchise=★/direct=●)
   - Brand Map 다중 브랜드 개선 (레스토랑 많은 순 정렬 + 드롭다운 + 카운트)

2. **Foodcourt Floor Plan 시스템 (뷰 + 에디터) 신규**
   - View: `/pos/foodcourt/floor-plan` (지점별 매장 배치 표시 + 매장 클릭 시 계약 4섹션 상세 패널)
   - Editor: `/pos/foodcourt/floor-plan-editor` (레스토랑 FloorPlanEditor 패턴 복제, FloorPlanCanvas 재사용, Add Store shape 4종, drag/resize/undo/save)
   - 1 지점 = 1 평면도 단순화 (자동 생성)
   - DB: foodcourt_floor_plans 테이블 + foodcourt_units 좌표 컬럼

3. **Branch Unit Numbering 시스템 신규**
   - `foodcourt_branches.unit_config JSON` 컬럼
   - Branch 편집 모달 신규 섹션 (Toggle + Zone cards)
   - Prefix 토글(선택) + Free-form textarea (자유 입력)
   - 범위 확장: `01-20` / `A01-A10` / `05A-08A` / `P-2-01A-05A` 자동 확장
   - Preview/Sync API (contract 연결 유닛 삭제 보호)
   - 저장 시 Contract 드롭다운 + Floor Plan Unplaced 자동 반영

4. **공용 컴포넌트화**
   - Branch 편집 모달 → `CommonModal size="large"` + `FormRow/FormGroup/FormLabel/FormInput/FormSelect`
   - 필드 overlap 해소, `Add Branch` (+기호 제거)
   - 사이드바 Foodcourt: Tenancy / Branch Map / Floor Plan 3개 메뉴

5. **AddonModule `fc_floor_plan` 등록** + 모든 Foodcourt plan(Basic/Pro/Enterprise) 편입

### 수정/신규 파일

**백엔드**
- 신규: `models/FoodcourtFloorPlan.js`, `routes/foodcourt-floor-plans.js`
- 수정: `models/FoodcourtBranch.js` (unit_config), `models/FoodcourtUnit.js` (plan_*), `models/index.js`, `routes/foodcourt-branches.js` (unit_config + sync-units + free-form generator), `routes/foodcourts.js` (tenancy-map), `server.js`

**프론트엔드**
- 신규: `pages/FoodcourtGeneral/FoodcourtFloorPlanPage.tsx` (뷰), `FoodcourtFloorPlanEditorPage.tsx` (에디터), `FoodcourtTenancyMapStandalone.tsx`, `pages/BrandGeneral/BrandFranchiseMapStandalone.tsx`
- 수정: `components/Layout/MainLayout.tsx`, `components/ProtectedRoute.tsx`, `pages/FoodcourtGeneral/FoodcourtBranchesPage.tsx` (Unit Numbering + 공용 컴포넌트), `FoodcourtTenancyMapPage.tsx` (지점 중심), `pages/BrandGeneral/BrandFranchiseMapPage.tsx` (핀 스타일), `App.tsx`

### 검증 결과
- state-hydration-check: 0 warnings
- 빌드: exit 0 (여러 차례)
- Floor Plan API: Create 201 / Batch save 200 / Read-back shapes 일치 / 권한 차단 403/404/401
- Unit Numbering 자유 입력 파싱: `P-2-01A-05A` 5개 / `05A-08A` 4개 / `01-20` 20개 / mixed list OK
- health-check: 40/40 pass

### 운영 배포 시 필요한 작업 (미배포)
1. `CREATE TABLE foodcourt_floor_plans (...)` — 신규 테이블
2. `ALTER TABLE foodcourt_units ADD COLUMN floor_plan_id INT NULL, plan_x/plan_y/plan_width/plan_height FLOAT, plan_shape VARCHAR(20)` + FK
3. `ALTER TABLE foodcourt_branches ADD COLUMN unit_config JSON NULL`
4. `node scripts/register-map-modules.js` (fc_floor_plan 모듈 + Plan 편입)
5. production-frontend 빌드 배포

### 다음 할 일
**단기**
- 운영 배포 (`/배포` 명령)
- 실제 유저 흐름 검증 (Foodcourt General 로그인 → 지점 Unit Numbering 설정 → Floor Plan 에디터로 배치 → 뷰에서 클릭 확인)

**후속 개발 (우선순위)**
- 랜딩페이지 Features/Pricing 에 Franchise Map / Branch Map / Floor Plan 기능 소개
- FAQ Q&A (Unit Numbering 사용법, 범위 표기법, Floor Plan 편집 방법)
- 릴리즈 블로그 포스트 (v3.16 예정)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
