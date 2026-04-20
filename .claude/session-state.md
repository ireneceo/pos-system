## 현재 작업 상태
**마지막 업데이트:** 2026-04-20 UTC
**작업 상태:** 완료 (미배포)

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션 — 2026-04-20)

1. **Manager 지점/브랜드 접근 enforcement** — `users.branch_id/brand_id` 기반 실제 필터 (contracts / invoices / units / branches / restaurants 5개 라우트). `getManagerScope()` 헬퍼 + auth 미들웨어 `branch_id` 노출. 통합 테스트 8/8 pass
2. **Contract 리스트 Active/Archive 탭** — expired 드롭다운 누락 버그 수정. Pipeline 4단계 유지, Archive는 List 뷰 강제
3. **Restaurant 리스트 Operational/Archive 탭** — Suspended를 Operational에 유지 (결제 주의). 백엔드 `?status=` 다중값 필터 추가
4. **Brand Franchise Map** — Leaflet + OSM 클러스터링, 상태 5색 핀, Franchise=★ / Direct=●, 핀 크기 = 30일 매출, 점선 원 = territory radius
5. **Foodcourt Tenancy Map** — Branch 큰 핀(점유율 %) + Restaurant 작은 핀, 유닛 통계, territory radius
6. **수동 좌표 편집 UI** — Restaurant + FoodcourtBranch 폼에 lat/lng
7. **Auto-Geocoding (Nominatim)** — POST/PUT 비동기 훅 + backfill 스크립트
8. **DB `restaurants.latitude/longitude`** 추가
9. **AddonModule 등록** — brand_franchise / fc_tenancy / fc_branches 신규. 모든 Brand/Foodcourt 플랜에 자동 포함. `scripts/register-map-modules.js` idempotent
10. **i18n 4개 언어** 확장 (tabs + franchiseTabs + map legend + lat/lng)

### 수정/신규 파일

**백엔드**
- 수정: middleware/auth.js, models/Restaurant.js, routes/{brands,foodcourts,contracts,invoices-main,restaurants-crud,foodcourt-branches,foodcourt-units}.js
- 신규: utils/geocoding.js, scripts/backfill-restaurant-geocode.js, scripts/register-map-modules.js

**프론트엔드**
- 수정: components/Contract/ContractManagementPage.tsx, pages/Admin/RestaurantsPage.tsx, pages/BrandGeneral/FranchiseManagementPage.tsx, pages/FoodcourtGeneral/{TenancyManagementPage,FoodcourtBranchesPage}.tsx
- 신규: pages/BrandGeneral/BrandFranchiseMapPage.tsx, pages/FoodcourtGeneral/FoodcourtTenancyMapPage.tsx
- 의존성: leaflet, react-leaflet, leaflet.markercluster + types

### 검증 결과
- state-hydration-check: 0 warnings
- 빌드 (3회): exit 0
- Manager scope 통합 테스트: 8/8
- API 권한 테스트: 6/6
- health-check: 40/40
- i18n:verify: Errors 0

### 운영 배포 시 필요한 작업 (미배포)
1. `ALTER TABLE restaurants ADD latitude DOUBLE NULL, ADD longitude DOUBLE NULL`
2. `cd /var/www/production-backend && node scripts/register-map-modules.js`
3. `cd /var/www/production-backend && node scripts/backfill-restaurant-geocode.js` (선택)
4. production-frontend 빌드 배포 (leaflet 패키지 포함)

### 다음 할 일

**단기**:
- 운영 배포 (다음 세션 `/배포` 명령 대기)
- 브라우저에서 실제 UI 확인 (Irene 검증 후 배포 판단)

**후속 개발 (우선순위)**:
- Floor Plan 시스템 (Branch 평면도 이미지 업로드 + 유닛 좌표 매핑 + Contract.location_description 자동 동기화)
- 랜딩페이지 Features/Pricing 페이지에 Franchise Map / Tenancy Map 기능 소개 추가
- FAQ에 Map 사용법 Q&A 2~3건 추가
- 릴리즈 블로그 포스트 초안 (v3.16 예정)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
