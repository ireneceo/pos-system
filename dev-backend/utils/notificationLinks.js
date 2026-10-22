/**
 * 알림 버튼 주소 — «자격 → 화면» 표 한 곳 (2026-10-22 Fable 설계 notification-addressee §4)
 *
 * 왜: 메일 버튼 주소 다수가 없는 화면이었다(/pos/seller-orders · /pos/invoices · /pos/notices ·
 * /pos/supply/contracts …→ 404). 템플릿이 주소를 박지 않고 여기 표에서 받는다.
 * 모든 버튼은 진입 화면 `/go?ctx=…&to=…` 을 거친다 — 다른 모자(역할)로 들어와 있으면
 * 그 화면이 모자 전환을 처리한다(dev-frontend pages/NotificationEntry).
 * 표의 모든 경로는 scripts/check-notification-links.js 가 App.tsx Route 와 대조한다.
 */

const BASE_URL = process.env.FRONTEND_URL || (process.env.NODE_ENV === 'production' ? 'https://purplehere.com' : 'https://dev.purplehere.com');

// kind → users.role (ctx 의 세 번째 칸)
const KIND_ROLE = {
  store: 'Restaurant Admin',
  store_staff: 'Staff',
  owner: 'Restaurant Owner',
  brand: 'Brand General',
  brand_manager: 'Brand Manager',
  foodcourt: 'Foodcourt General',
  foodcourt_manager: 'Foodcourt Manager',
  supplier: 'Supplier Admin',
  admin: 'System Admin'
};

// target → kind → 경로(:rid · :poId 는 params 로 채움). 없는 칸 = 그 자격 메일에 안 쓰임.
const PO_COMMON = '/pos/purchase-orders/:poId';
const PO_HISTORY = '/pos/purchase-orders/history';
const PO_SCHEDULES = '/pos/purchase-orders/recurring';  // 정기 발주 목록 (2026-10-22)
const TARGETS = {
  dashboard: {
    store: '/restaurant/:rid/dashboard', store_staff: '/restaurant/:rid/dashboard', owner: '/pos/owner/dashboard',
    brand: '/pos/brand/general/dashboard', brand_manager: '/pos/brand/dashboard',
    foodcourt: '/pos/foodcourt/general/dashboard', foodcourt_manager: '/pos/foodcourt/dashboard',
    supplier: '/pos/supplier/dashboard', admin: '/pos/admin/dashboard'
  },
  po_detail: {
    store: PO_COMMON, store_staff: PO_COMMON, owner: PO_COMMON, brand: PO_COMMON, brand_manager: PO_COMMON,
    foodcourt: PO_COMMON, foodcourt_manager: PO_COMMON, admin: PO_COMMON
  },
  po_history: {
    store: PO_HISTORY, store_staff: PO_HISTORY, owner: PO_HISTORY, brand: PO_HISTORY, brand_manager: PO_HISTORY,
    foodcourt: PO_HISTORY, foodcourt_manager: PO_HISTORY, admin: PO_HISTORY
  },
  po_approvals: { owner: '/pos/owner/po-approvals' },
  po_schedules: {
    store: PO_SCHEDULES, store_staff: PO_SCHEDULES, owner: PO_SCHEDULES, brand: PO_SCHEDULES, brand_manager: PO_SCHEDULES,
    foodcourt: PO_SCHEDULES, foodcourt_manager: PO_SCHEDULES
  },
  seller_orders: {
    brand: '/pos/brand/general/incoming-orders', brand_manager: '/pos/brand/general/incoming-orders',
    foodcourt: '/pos/foodcourt/general/incoming-orders', foodcourt_manager: '/pos/foodcourt/general/incoming-orders',
    supplier: '/pos/supplier/orders'
  },
  invoices: {
    store: '/restaurant/:rid/invoices', store_staff: '/restaurant/:rid/invoices', owner: '/pos/owner/invoices',
    brand: '/pos/brand/invoices', brand_manager: '/pos/brand/invoices',
    foodcourt: '/pos/foodcourt/invoices', foodcourt_manager: '/pos/foodcourt/invoices',
    supplier: '/pos/supplier/invoices', admin: '/pos/admin/invoices'
  },
  // 구매자가 낼 거래 청구서·정산서 — 브랜드/푸드코트도 «내가 낼 청구서» 화면(2026-09-29 soa2 §5-A 에서 정한 주소)
  trade_invoices_buyer: {
    store: '/restaurant/:rid/invoices', store_staff: '/restaurant/:rid/invoices', owner: '/pos/owner/invoices',
    brand: '/pos/brand/invoices', brand_manager: '/pos/brand/invoices',
    foodcourt: '/pos/foodcourt/invoices', foodcourt_manager: '/pos/foodcourt/invoices'
  },
  trade_invoices_seller: {
    brand: '/pos/brand/trade-invoices', brand_manager: '/pos/brand/trade-invoices',
    foodcourt: '/pos/foodcourt/trade-invoices', foodcourt_manager: '/pos/foodcourt/trade-invoices',
    supplier: '/pos/supplier/trade-invoices'
  },
  // 브랜드·푸드코트가 매장에 발행한 청구서(구독·임대 등) — 발행자 화면
  issued_invoices: {
    brand: '/pos/brand/invoices', brand_manager: '/pos/manager/invoices',
    foodcourt: '/pos/foodcourt/invoices', foodcourt_manager: '/pos/manager/invoices',
    admin: '/pos/admin/invoices'
  },
  contracts: {
    store: '/pos/suppliers?tab=contracts', store_staff: '/pos/suppliers?tab=contracts', owner: '/pos/suppliers?tab=contracts',
    brand: '/pos/suppliers?tab=contracts', brand_manager: '/pos/suppliers?tab=contracts',
    foodcourt: '/pos/suppliers?tab=contracts', foodcourt_manager: '/pos/suppliers?tab=contracts',
    supplier: '/pos/supplier/contracts'
  },
  notices: {
    store: '/restaurant/:rid/notices', store_staff: '/restaurant/:rid/notices', owner: '/pos/owner/notices',
    brand: '/pos/brand/general/notices', brand_manager: '/pos/brand/general/notices',
    foodcourt: '/pos/foodcourt/general/notices', foodcourt_manager: '/pos/foodcourt/general/notices',
    supplier: '/pos/supplier/notices', admin: '/pos/admin/notices'
  },
  live_orders: { store: '/restaurant/:rid/live-orders', store_staff: '/restaurant/:rid/live-orders' },
  reservations: { store: '/restaurant/:rid/reservations', store_staff: '/restaurant/:rid/reservations' },
  staff: { store: '/restaurant/:rid/staff', admin: '/pos/admin/staff' },
  leave_requests: { store: '/restaurant/:rid/attendance?tab=leave' },
  my_attendance: { store: '/restaurant/:rid/my-attendance', store_staff: '/restaurant/:rid/my-attendance' },
  select_context: {}
};
const SELECT_CONTEXT_PATH = '/pos/select-context';

function fill(pattern, addressee, params = {}) {
  const rid = params.rid || (addressee && addressee.entity_type === 'restaurant' ? addressee.entity_id : null);
  return pattern
    .replace(':rid', rid != null ? encodeURIComponent(String(rid)) : '')
    .replace(':poId', params.poId != null ? encodeURIComponent(String(params.poId)) : '');
}

/** 자격·목적지 → 앱 안 경로. 표에 없으면 그 자격 대시보드(경고 한 줄). */
function targetPath(addressee, target, params) {
  if (target === 'select_context') return SELECT_CONTEXT_PATH;
  const kind = addressee && addressee.kind;
  const row = TARGETS[target];
  const pattern = row && kind && row[kind];
  if (pattern) {
    const p = fill(pattern, addressee, params);
    if (!p.includes('//') && !/\/$/.test(p)) return p;
  }
  if (target !== 'dashboard') console.warn(`[notificationLinks] unknown target ${target} for ${kind}`);
  const dash = kind && TARGETS.dashboard[kind];
  return dash ? fill(dash, addressee, params) : '/pos';
}

/** ctx 값 «entity_type:entity_id:role». 오너는 owner:{매장}:Restaurant Owner. */
function ctxOf(addressee) {
  if (!addressee || !KIND_ROLE[addressee.kind]) return null;
  const role = KIND_ROLE[addressee.kind];
  const type = addressee.kind === 'owner' ? 'owner'
    : addressee.kind === 'admin' ? 'system' : addressee.entity_type;
  return `${type}:${addressee.entity_id != null ? addressee.entity_id : ''}:${role}`;
}

/** 메일 버튼 주소(전체 URL). 자격이 있으면 /go 경유, 없으면(account) 직접 경로. */
function goLink(addressee, target, params) {
  const path = targetPath(addressee, target, params);
  const ctx = ctxOf(addressee);
  if (!ctx) return `${BASE_URL}${path}`;
  const name = (addressee.entity_name || '').toString().trim().slice(0, 80);
  // n = 화면에 보일 자리 이름(«K-DINE 으로 열까요?») — 판정에는 안 쓴다(판정은 ctx 만).
  return `${BASE_URL}/go?ctx=${encodeURIComponent(ctx)}&to=${encodeURIComponent(path)}${name ? `&n=${encodeURIComponent(name)}` : ''}`;
}

/** 배치용 — 수신자마다 자격이 다를 때 버튼 주소도 그 자격 것으로. */
function allPatterns() {
  const out = new Set([SELECT_CONTEXT_PATH]);
  for (const row of Object.values(TARGETS)) for (const p of Object.values(row)) out.add(p.split('?')[0]);
  return [...out];
}

module.exports = { BASE_URL, TARGETS, KIND_ROLE, targetPath, ctxOf, goLink, allPatterns };
