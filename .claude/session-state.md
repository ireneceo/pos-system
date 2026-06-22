# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-06-22 (발주·공급업체 흐름 + 누출차단 + 인보이스/반응형 + 모달 스태킹 — DEV 검증 통과·운영 미배포)
**버전:** **v3.60 운영 배포됨 (2026-06-20).** 6/21~6/22 작업 전체 DEV 미배포. SW_VERSION=3.87-connectmodal-portal-20260622.
**작업 상태:** 완료 (DEV /검증 통과) — **운영 배포 대기(Irene /배포)**

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션, 2026-06-22)
- **외부공급업체 상품 등록(RA, 2경로)** — 솔루션 미가입 공급업체 상품을 buyer가 직접 등록. ①SupplierProfile Add/Edit/Delete ②재고 "Register on external supplier"(입력→검색→없으면 생성, 같은 이름 재사용=중복X). 소유권 가드(is_system_registered=false+registered_by=나). docs/EXTERNAL_SUPPLIER_PRODUCTS.md, [[reference_external_supplier_products]]. 백엔드 `routes/supplier-directory.js` CRUD.
- **교차테넌트 재료 누출 차단** — `GET /api/brands/:id/ingredients` 의 `brand_id IS NULL` 절이 전 시스템 레스토랑 재료를 BG에 노출 → 소유 브랜드만. BG 발주 "My Stock Items"=ProductIngredient(owner) 단일소스. [[reference_bg_ra_product_chains]]
- **발주 buyerEntity 필드 오타** — `user.brandId`(camel)→`brand_id`(snake). BG/FG 발주에 stock item 안 뜨던 근본원인. [[reference_user_object_snake_case]]
- **발주 incoming-orders 날짜필터** 기본 'all' / Cart 높이 49px 정렬
- **인보이스 to_pay→All(전 역할)** — 결제대기 탭 기간 기본 'all'(미결제 안 가림). Restaurant·Owner 수정/Brand·Foodcourt 기존/Manager 해당없음
- **공급업체 Staff 행 액션** — AllSuppliersView ownEndpoint Staff 누락 수정. (/pos/suppliers "안 나옴"=옛 SW 캐시→bump 해소)
- **재고 편집모달 연결섹션** — New/Edit 모달에 "공급업체 연결/외부공급업체 등록"(현재셀러 칩). New=저장 먼저 안내
- **ConnectSellerModal 스태킹 수정** — 편집모달(body portal)에서 열 때 인라인 ConnectSellerModal이 뒤로 깔림 → createPortal(body) 통일로 위에 뜸(편집 유지). [[reference_modal_portal_stacking]]
- **반응형 10인치 실측** — 4페이지+시재드로어/파이널마감 모달, 1024·800px·주문데이터 유무 모두 **가로넘침 0**(데모38 시드). 재현 흔들림 없어 수정 불필요. POS·KDS 인쇄파일 무변경
- **검증** — /검증 10단계 통과: hydration 0·timezone 신규 0·build·API 8/8(소유권 403·누출 0·익명 401)·mount 8/8·health 107/107·print-guard 8/8·design 0·i18n 0

> (6/21 누적분: 데모버그 8건·다매장 쿠폰·시재 드로어·발주 오너승인·디자인 통일 — 모두 DEV·미배포. DEVELOPMENT_PLAN 아카이브 참조.)

### 다음 확정 작업
- 없음 — 지시 대기
  (단, **운영 미배포**: 6/21~6/22 작업 전체가 검증 끝나고 /배포 대기. 외부공급업체 상품 등록의 **BG/FG 프론트**는 백엔드 재사용 가능한 후속이지만, 진행은 Irene 지시 기준.)

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- 외부공급업체 상품 등록 **BG/FG 프론트** — 백엔드(`/api/external-suppliers/:id/products`)는 이미 BG/FG 지원, 프론트만 추가
- /pos/suppliers "안 나옴" 후속 — 옛 캐시 추정·bump 했으나, 배포 후에도 특정 탭/공급업체 안 보이면 구체 repro 필요
- 인앱 Docs/매뉴얼 시스템 — docs/IN_APP_DOCS_MANUAL_SYSTEM.md 기획만
- 매장 실프린터 확인 — Z-Report·드로어·주방티켓 현장 눈확인
- 쿠폰/외부공급업체 페이지 i18n(영어 하드코딩 → 4언어)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
