# Fable 설계 요청 (대기) — 레스토랑 오너 공급업체·가격 관리 · 발주/관리 권한 분리 (2026-10-19 · 작업방 3259bc08)
결과 파일: .claude/fable-design-20261019-owner-supplier-management.md (Fable 이 씀)

## Irene 원문
«레스토랑 오너가 공급업체랑 공급업체 가격도 관리하게 해줘. 재고아이템이랑 연결하는 건 레스토랑 관리자 몫이고 공급업체랑 상품은 레스토랑오너도 관리해야 해. 발주관리에서 발주하는 거랑 관리하는 걸 권한을 나눠야 하는 것 같아. 그리고 같은 공급업체와 그들의 상품을 레스토랑 오너가 다른 자기 레스토랑에 연결되게 해줘. 브랜드제너럴에 전에 연동되던건 제대로 끊긴 건지 확인하고. 레스토랑 오너가 발주/결제/업체관리에 주로 참여 가능하게 구조를 확인해봐. 그리고 여기까지 계획하면 전체 구조도 작성해뒀던 거 다시 정리해줘. 클로드코드 페이지 있지?»

## 읽을 것
docs/SUPPLIER_CONTRACT_SYSTEM.md §H-2·§H-3 · docs/TRADE_STRUCTURE.md · docs/PURCHASE_ORDER_SYSTEM.md · dev-backend/middleware/buyerScope.js · dev-backend/utils/supplierAccess.js · dev-backend/routes/supplier-directory.js · dev-frontend/src/pages/Suppliers/{UnifiedSuppliersPage,AllSuppliersView}.tsx · MainLayout.tsx ownerCategories(🔒) · 구조도 원본 dev-backend/content/structure-map.html

## 팀원 실측 — 개발(데모 오너 289 = 매장 2·3, API 실호출)
- 오너 자기 실체: 외부 공급업체 목록 200 · 등록 201 · 상품 추가(unit_price) · 삭제 200. 소유 매장 전부 한 행 상속(매장별 끄기)
- 오너 403: /api/supplier-contracts · /api/supplier-directory 목록(«No buyer entity») · 매장 전환으로 /external-suppliers · /supplier-contracts · /supplier-catalog · /ingredients (OWNER_ACTING_ROUTES 밖) → 매장이 각자 등록한 업체·가입 공급업체 계약을 오너가 못 봄/못 관리. 재고아이템 연결 403(의도대로)
- 오너 사이드바에 «Suppliers» 없음(🔒 MainLayout)
- 매장 직원: 발주와 공급업체 메뉴가 같은 권한 키(Staff 'inventory', 매니저 operations/products/management 혼재 — MainLayout 1745·1753·1849·2042·2050)
- 개발 DB 브랜드 등록 업체의 매장 계약·연결·발주·청구서 0

## 운영 실측(읽기 전용, 10-19 Irene «응»)
- 외부 업체: 매장 등록 47 · 브랜드 등록 29(+inactive 2). 계약: 매장 active 42/terminated 8 · 브랜드 active 29/terminated 2
- 브랜드 등록 업체에 매장 계약 terminated 3(매장 10 · JASMINE·UGS·GIT Consult · 09-21 = 복사본 전환 전 끈 흔적). 매장 연결 0 · 매장 발주 0 · 매장 지불 청구서 0 · 발행자 어긋남 0 · shared_with_stores=1 active 0 → 브랜드 연동 끊김
- 오너 역할 계정: 27(데모 1·2·3) · 31 · 36(소유 매장 없음) · 64(비활성)
- 실매장 10 «with MIN Cafe»(brand 1 유일 매장) ownership = 사용자 23 **Brand General** — 오너 역할 계정 아님
- 매장 10 자기 업체 32(브랜드 복사본 23 + 자체 9) · 가입 공급업체 계약 active 29/terminated 6 · 오너 등록 업체 0

## 제약
운영 쓰기·배포 없음 · MainLayout 🔒(Irene 승인+bless) · 새 목록/테이블/자동 복제 경로 금지(구조 문서 먼저) · 권한 경계 변경 → 구현 뒤 Fable 게이트 1회 · ENUM expand-only
## 바라는 결과
설계 + Irene 컨펌 항목(선택지·결과·Fable 권고) + 구조도에 반영할 «진행 중/바뀜» 지시
