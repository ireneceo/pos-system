/**
 * 브랜드 매니저 메뉴 권한 표 — 일반 매니저(BrandStaffPage)와 멀티아이디 매니저 모자(UserContextsSection)가 같이 쓴다(2026-10-26).
 * 서버 키 집합 = dev-backend/services/userContexts.js BRAND_MANAGER_PERMISSION_KEYS (tests/brand-manager-hat-permissions.test.js 가 대조).
 */
// Brand Manager 메뉴 접근 = 기능 묶음(2026-10-11 Fable 판정 §2-4). 괄호 안 = MainLayout brandCategories 가 실제로 켜는 메뉴 —
//   두 곳을 같이 고친다. 브랜드 범위(회사 전체/고른 브랜드)는 BrandStaffPage «Brand Access» 가 따로 정한다.
export const BRAND_MANAGER_PERMISSION_GROUPS = [
  { key: 'dashboard', label: 'Dashboard', alwaysOn: true },
  { key: 'management', label: 'Brands & Franchise (Brands / Brand Menus / Recipes / Franchise / Restaurants / Restaurant Admins / Franchise Map / Coupons)', alwaysOn: false },
  { key: 'products', label: 'Products & Stock (Products / Product Recipes / Stock Items / Bulk Link / Inventory / Suppliers)', alwaysOn: false },
  { key: 'operations', label: 'Orders & Billing (Sales Orders / Purchase Order / Order History / Invoices / Trade Invoices)', alwaysOn: false },
  { key: 'reports', label: 'Reports & Performance (Reports / Performance)', alwaysOn: false },
  { key: 'communication', label: 'Communication (Notices / Work Manuals / Inquiries)', alwaysOn: false },
  { key: 'plans_payments', label: 'Plans & Subscriptions (Brand Plans / Subscriptions)', alwaysOn: false },
];
