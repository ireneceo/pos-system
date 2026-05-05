# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-05-05 (Features 페이지 캡처 정합성 — backstage cleanup)
**버전:** **v3.24** (개발 중, 운영 미배포)
**작업 상태:** dev cleanup 완료 (운영 배포 안 함 — 사용자 지시)

---

## ⚡ 빠른 재개

```
session-state.md 읽고 이어서 개발해.
```

---

## 📦 2026-05-05 작업 (Features 페이지 캡처 정합성)

### 배경
Irene 피드백: `https://dev.purplehere.com/features` 의 카드들 중 이미지가 빠져있는 것들이 많고, 특히 Restaurant 탭 + 기타 모든 역할 탭에 빈 카드가 산재. "개발 안 된 기능이 있으면 'Coming soon'이라도 표시해야지 그냥 이미지만 없으면 어떻게 해?"

### 수행 내역
1. **Audit 스크립트** — 선언된 `getImages(code, count)` vs 실제 webp 파일 정합성 검사 (`/tmp/audit.js`)
2. **빈 캡처 16개 삭제** — 9KB 이하 blank webp / "데이터 없음" 페이지 캡처 폐기
3. **고아 파일 rename** — brand_products_5→3, inventory_management_5→4 (선언 슬롯 채움)
4. **Work Manuals 시드 14건** — brand 1+4, restaurant 5, foodcourt 7 (Daily Opening Checklist, K-DINE 표준 등)
5. **Owner ownership + tickets 시드** — demo_owner(289) ↔ restaurant 1/2/3 ownership + 5개 OperationTicket
6. **MySuppliersPage 버그 fix** — API `supplierCompany.name` 중첩 → 평면 `supplier_name` fallback 매핑
7. **Phase 6+7 캡처 11개 신규**
   - Restaurant: buyer_supplier_contracts / buyer_purchase_orders / buyer_purchase_invoices / work_manuals
   - Brand: brand_work_manuals
   - Foodcourt: fc_work_manuals
   - Owner: operation_inquiry / system_inquiry / reports / work_manuals
   - Supplier: admin_staff
8. **FeaturesPage count 0→1 일괄 업데이트** — 11 codes × 4 role tabs = 20 위치
9. **빌드 + dev 배포** — `main.49f61c9d.js` (운영 미배포)

### 최종 상태
- 104 declared codes / **81 with images** (이전 70) / **23 coming soon** (이전 34) / 0 broken
- Restaurant 탭 5개 중 4개가 실제 데이터 캡처 (Membership만 진짜 Phase 2)

### 남은 23개 "Coming soon" — 진짜 미개발 / 시드 큰 작업
- Membership, supplier_multi_warehouse 등 Phase 2
- fc_inventory: i18n 버그 ("KEY 'STATUS (EN)' RETURNED AN OBJECT" literal 출력) — 별도 fix 필요
- brand_ingredients/brand_suppliers: 재료-공급자 매핑 + 카탈로그 셋업 큰 작업

### 신규 시드 스크립트
- `dev-backend/scripts/seed-work-manuals-v3.25.js`
- `dev-backend/scripts/seed-owner-inquiries-v3.25.js`

### 수정된 파일
- `dev-frontend/src/pages/Landing/FeaturesPage.tsx`
- `dev-frontend/src/pages/SupplierDirectory/MySuppliersPage.tsx`
- `dev-frontend/scripts/capture-features.js`
- `dev-frontend/public/images/features/dashboard/` (11 신규 + 16 삭제 + 2 rename)
- `dev-backend/scripts/seed-work-manuals-v3.25.js` (신규)
- `dev-backend/scripts/seed-owner-inquiries-v3.25.js` (신규)

---

## 다음 할 일 (DEVELOPMENT_PLAN.md 기반)

남은 "Coming soon" 23개 중 우선순위:

1. **fc_inventory i18n 버그 fix** — `KEY 'STATUS (EN)' RETURNED AN OBJECT INSTEAD OF STRING` literal 출력. 백엔드 응답 status 가 객체 (다국어 객체?)인데 frontend 가 문자열 기대. status 키 정상화.
2. **brand_ingredients / brand_suppliers 시드 + 캡처** — Brand 레벨 재료 카탈로그 + 공급자 매핑 데이터 셋업
3. **System Inquiry 모델 확인 + owner_system_inquiry 시드** — OperationTicket 외 별도 SystemTicket 모델인지 확인 필요
4. **Foodcourt fc_coupons / fc_customers / fc_floor_plan / fc_products / fc_stats 캡처** — 데이터 시드 필요
5. **Supplier 측 incoming PO 흐름 캡처** — buyer 측 PO 가 supplier 20번에 도달하도록 흐름 점검

또는 v3.24 backstage cleanup 후속으로 통합 운영 배포 (사용자 지시 시).

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
