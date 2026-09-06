import React, { Suspense } from 'react';
import './i18n';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { OrderProvider } from './contexts/OrderContext';
import { StoreProvider } from './contexts/StoreContext';
import { MenuProvider } from './contexts/MenuContext';
import { CustomerProvider } from './contexts/CustomerContext';
import { StaffProvider } from './contexts/StaffContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ContextFollowGate from './components/ContextFollowGate';
import { PaymentStatusProvider } from './contexts/PaymentStatusContext';
import { SiteSettingsProvider } from './contexts/SiteSettingsContext';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import CookieConsentBanner from './components/Common/CookieConsentBanner';
import PosLayout from './components/Layout/PosLayout';
import { PwaInstallProvider } from './contexts/PwaInstallContext';
import { OfflineProvider } from './contexts/OfflineContext';
import OfflineBanner from './components/Offline/OfflineBanner';
import OfflineLockOverlay from './components/Offline/OfflineLockOverlay';
import NotificationToaster from './components/Common/NotificationToaster';
import PwaInstallBanner from './components/Common/PwaInstallBanner';
import InstallGuideModal from './components/Common/InstallGuideModal';
import AutoPrintFailureBanner from './components/AutoPrintFailureBanner';
import PrintDeviceReporter from './components/PrintDeviceReporter';
// Login Page (keep static - frequently used, first contact)
import LoginPage from './pages/Login/LoginPage';

// Landing Pages — lazy (logged-in users never hit these; visitors see "Loading…" once)
// 멀티 컨텍스트 로그인 — 선택 화면(lazy) + 크로스탭 팔로우 게이트(항상 마운트, 렌더는 이벤트 시에만)
const ContextSelectPage = React.lazy(() => import('./pages/ContextSelect/ContextSelectPage'));
const HomePage = React.lazy(() => import('./pages/Landing/HomePage'));
const AboutPage = React.lazy(() => import('./pages/Landing/AboutPage'));
const FeaturesPage = React.lazy(() => import('./pages/Landing/FeaturesPage'));
const PricingPage = React.lazy(() => import('./pages/Landing/PricingPage'));
const PackagesPage = React.lazy(() => import('./pages/Landing/PackagesPage'));
const ContactPage = React.lazy(() => import('./pages/Landing/ContactPage'));
const DemoPage = React.lazy(() => import('./pages/Landing/DemoPage'));
const SignupPage = React.lazy(() => import('./pages/Landing/SignupPage'));
const ForgotPasswordPage = React.lazy(() => import('./pages/Landing/ForgotPasswordPage'));
const ResetPasswordPage = React.lazy(() => import('./pages/Landing/ResetPasswordPage'));
const CompanyPage = React.lazy(() => import('./pages/Landing/CompanyPage'));
const PrivacyPolicyPage = React.lazy(() => import('./pages/Landing/PrivacyPolicyPage'));
const TermsOfServicePage = React.lazy(() => import('./pages/Landing/TermsOfServicePage'));
const FAQPage = React.lazy(() => import('./pages/Landing/FAQPage'));
const BlogPage = React.lazy(() => import('./pages/Landing/BlogPage'));
const NewsPage = React.lazy(() => import('./pages/Landing/NewsPage'));
const BlogPostPage = React.lazy(() => import('./pages/Landing/BlogPostPage'));
// Mobile App — lazy (separate entry, heavy customer-facing bundle)
const MobileApp = React.lazy(() => import('./mobile/MobileApp'));

// Loading Component
const PageLoader = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '16px',
    color: '#4B5563'
  }}>
    Loading...
  </div>
);

// Notification Preferences redirect — routes to the correct page based on user role
const NotificationPreferencesRedirect: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!user) { navigate('/pos', { replace: true }); return; }
    if (user.role === 'System Admin') navigate('/pos/admin/notification-settings', { replace: true });
    else if (user.role === 'Restaurant Admin' || user.role === 'Staff') navigate(`/restaurant/${user.restaurantId}/notification-settings`, { replace: true });
    else if (user.role === 'Restaurant Owner') navigate('/pos/owner/notification-settings', { replace: true });
    else navigate('/pos/manager/notification-settings', { replace: true });
  }, [user, navigate]);
  return null;
};

// Lazy load all other pages
const VerifyEmailPage = React.lazy(() => import('./pages/Login/VerifyEmailPage'));
// Referral System (Refer & Earn)
const ReferralLayout = React.lazy(() => import('./components/Referral/ReferralLayout'));
const ReferralLoginPage = React.lazy(() => import('./pages/Referral/ReferralLoginPage'));
const ReferralSignupPage = React.lazy(() => import('./pages/Referral/ReferralSignupPage'));
const ReferralDashboardPage = React.lazy(() => import('./pages/Referral/ReferralDashboardPage'));
const ReferralWalletPage = React.lazy(() => import('./pages/Referral/ReferralWalletPage'));
const ReferralProfilePage = React.lazy(() => import('./pages/Referral/ReferralProfilePage'));
const ReferralManagementPage = React.lazy(() => import('./pages/Admin/ReferralManagementPage'));
const ReferralLandingPage = React.lazy(() => import('./pages/Landing/ReferralLandingPage'));
const LiveOrdersPage = React.lazy(() => import('./pages/LiveOrders/LiveOrdersPage'));
const ReservationsTimelinePage = React.lazy(() => import('./pages/Reservations/ReservationsTimelinePage'));
const ReservationPage = React.lazy(() => import('./mobile/pages/ReservationPage'));
const ReservationsListPage = React.lazy(() => import('./mobile/pages/ReservationsListPage'));
const POSTerminalPage = React.lazy(() => import('./pages/POSTerminal/POSTerminalPage'));
const KitchenDisplayPage = React.lazy(() => import('./pages/KitchenDisplay/KitchenDisplayPage'));
const CustomerDisplayPage = React.lazy(() => import('./pages/CustomerDisplay/CustomerDisplayPage'));
const CheckoutDisplayPage = React.lazy(() => import('./pages/CheckoutDisplay/CheckoutDisplayPage'));
const PromotionsPage = React.lazy(() => import('./pages/Promotions/PromotionsPage'));
const ReportsPage = React.lazy(() => import('./pages/Reports/ReportsPage'));
const CashUpPage = React.lazy(() => import('./pages/CashManagement/CashUpPage'));
const SettingsPage = React.lazy(() => import('./pages/Settings/SettingsPage'));
const MenuManagementPage = React.lazy(() => import('./pages/MenuManagement/MenuManagementPage'));
const CategoryManagementPage = React.lazy(() => import('./pages/CategoryManagement/CategoryManagementPage'));
const OptionManagementPage = React.lazy(() => import('./pages/OptionManagement/OptionManagementPage'));
const CustomersPage = React.lazy(() => import('./pages/Customers/CustomersPage'));
const StaffPage = React.lazy(() => import('./pages/Staff/StaffPage'));
const ProfilePage = React.lazy(() => import('./pages/Profile/ProfilePage'));
const SalesPage = React.lazy(() => import('./pages/Sales/SalesPage'));
const CompanyInformationPage = React.lazy(() => import('./pages/CompanyInformation/CompanyInformationPage'));
const BrandCompanyInfoPage = React.lazy(() => import('./pages/Brand/BrandCompanyInfoPage'));
const FoodcourtCompanyInfoPage = React.lazy(() => import('./pages/Foodcourt/FoodcourtCompanyInfoPage'));
const ActivityHistoryPage = React.lazy(() => import('./pages/ActivityHistory/ActivityHistoryPage'));
const FloorPlanPage = React.lazy(() => import('./pages/FloorPlan/FloorPlanPage'));
const FloorPlanEditor = React.lazy(() => import('./pages/FloorPlan/FloorPlanEditor'));

// Admin pages
const AdminDashboard = React.lazy(() => import('./pages/Admin/AdminDashboard'));
const PrintHealthPage = React.lazy(() => import('./pages/Admin/PrintHealthPage'));
const ManagersPage = React.lazy(() => import('./pages/Admin/ManagersPage'));
const RestaurantsPage = React.lazy(() => import('./pages/Admin/RestaurantsPage'));
const SubscriptionsPage = React.lazy(() => import('./pages/Admin/SubscriptionsPage'));
const InvoicesPage = React.lazy(() => import('./pages/Admin/InvoicesPage'));
const RestaurantInvoicesPage = React.lazy(() => import('./pages/Restaurant/InvoicesPage'));
const ManagerInvoicesPage = React.lazy(() => import('./pages/Manager/InvoicesPage'));
const PlansPage = React.lazy(() => import('./pages/Admin/PlansPage'));
const AdminReportsPage = React.lazy(() => import('./pages/Admin/ReportsPage'));
const SystemInquiryPage = React.lazy(() => import('./pages/Admin/SystemInquiryPage'));
const ContactInquiriesPage = React.lazy(() => import('./pages/Admin/ContactInquiriesPage'));
const ManagerSupportTicketsPage = React.lazy(() => import('./pages/Manager/SupportTicketsPage'));
const RestaurantSupportTicketsPage = React.lazy(() => import('./pages/Restaurant/SupportTicketsPage'));
const OperationInquiryPage = React.lazy(() => import('./pages/Manager/OperationInquiryPage'));
const RestaurantOperationInquiryPage = React.lazy(() => import('./pages/Restaurant/OperationInquiryPage'));
const SystemProductManagementPage = React.lazy(() => import('./pages/Admin/SystemProductManagementPage'));
const HardwareQuotesPage = React.lazy(() => import('./pages/Admin/HardwareQuotesPage'));
const SystemLogsPage = React.lazy(() => import('./pages/Admin/SystemLogsPage'));
const ContentManagementPage = React.lazy(() => import('./pages/Admin/ContentManagementPage'));
const RestaurantSubscriptionsPage = React.lazy(() => import('./pages/Admin/RestaurantSubscriptionsPage'));
const ManagerDashboard = React.lazy(() => import('./pages/Manager/ManagerDashboard'));
const ManagerSubscriptionsPage = React.lazy(() => import('./pages/Manager/ManagerSubscriptionsPage'));
const ManagerRestaurantsPage = React.lazy(() => import('./pages/Manager/RestaurantsPage'));
const ManagerAdminManagementPage = React.lazy(() => import('./pages/Manager/AdminManagementPage'));
const AdminStaffManagementPage = React.lazy(() => import('./pages/Admin/StaffManagementPage'));
const ManagerSalesPage = React.lazy(() => import('./pages/Manager/SalesPage'));
const ManagerReportsPage = React.lazy(() => import('./pages/Manager/ManagerReportsPage'));
// ManagerCustomersPage 삭제됨 (restaurantId 하드코딩 버그 + 기획 미확정)
const ManagerPromotionsPage = React.lazy(() => import('./pages/Manager/ManagerPromotionsPage'));
const ManagerPlansPage = React.lazy(() => import('./pages/Manager/PlansPage'));
const AdminSettingsPage = React.lazy(() => import('./pages/Admin/AdminSettingsPage'));
const CarriersPage = React.lazy(() => import('./pages/Admin/CarriersPage'));
const CarrierWebhookEventsPage = React.lazy(() => import('./pages/Admin/CarrierWebhookEventsPage'));
const PurchaseOrderPrintPage = React.lazy(() => import('./pages/PurchaseOrders/PurchaseOrderPrintPage'));
const AdminPaymentSettingsPage = React.lazy(() => import('./pages/Admin/PaymentSettingsPage'));
const SiteSettingsPage = React.lazy(() => import('./pages/Admin/SiteSettingsPage'));
const RestaurantDashboard = React.lazy(() => import('./pages/Restaurant/RestaurantDashboard'));
const BasicDashboard = React.lazy(() => import('./pages/Basic/BasicDashboard'));
const NotificationSettingsPage = React.lazy(() => import('./pages/NotificationSettings/NotificationSettingsPage'));
const InboxPage = React.lazy(() => import('./pages/Inbox/InboxPage'));
const SchedulerMonitorPage = React.lazy(() => import('./pages/Admin/SchedulerMonitorPage'));

// Manager Role Dashboards
const FoodcourtGeneralDashboard = React.lazy(() => import('./pages/FoodcourtGeneral/FoodcourtGeneralDashboard'));
const BrandGeneralDashboard = React.lazy(() => import('./pages/BrandGeneral/BrandGeneralDashboard'));
const FoodcourtManagerDashboard = React.lazy(() => import('./pages/Foodcourt/FoodcourtManagerDashboard'));
const BrandManagerDashboard = React.lazy(() => import('./pages/Brand/BrandManagerDashboard'));
const BrandStaffPage = React.lazy(() => import('./pages/Brand/BrandStaffPage'));
const FoodcourtStaffPage = React.lazy(() => import('./pages/Foodcourt/FoodcourtStaffPage'));

// Recipe Management
const DeployRecordsPage = React.lazy(() => import('./pages/Admin/DeployRecordsPage'));
const RecipeManagementPage = React.lazy(() => import('./pages/RecipeManagement/RecipeManagementPage'));
const RestaurantIngredientsPage = React.lazy(() => import('./pages/RecipeManagement/IngredientsPage'));
const SuppliersPage = React.lazy(() => import('./pages/Suppliers/SuppliersPage'));
const UnifiedSuppliersPage = React.lazy(() => import('./pages/Suppliers/UnifiedSuppliersPage'));

// Inventory Management
const InventoryPage = React.lazy(() => import('./pages/Inventory/InventoryPage'));
const StockTakePage = React.lazy(() => import('./pages/Inventory/StockTakePage'));
const BrandInventoryPage = React.lazy(() => import('./pages/BrandInventory/BrandInventoryPage'));
const ProductRecipePage = React.lazy(() => import('./pages/ProductRecipe/ProductRecipePage'));
const BrandProductRecipePage = React.lazy(() => import('./pages/BrandProductRecipe/BrandProductRecipePage'));
const BrandIngredientsPage = React.lazy(() => import('./pages/BrandProductRecipe/BrandIngredientsPage'));

// Brand Product Management
const BrandProductManagementPage = React.lazy(() => import('./pages/BrandProductManagement/BrandProductManagementPage'));

// Restaurant Owner Pages
const OwnerDashboardPage = React.lazy(() => import('./pages/Owner/OwnerDashboardPage'));
const OwnerRestaurantsPage = React.lazy(() => import('./pages/Owner/OwnerRestaurantsPage'));
const OwnerPerformancePage = React.lazy(() => import('./pages/Owner/OwnerPerformance'));
const OwnerReportsPage = React.lazy(() => import('./pages/Owner/OwnerReportsPage'));
const OwnerInvoicesPage = React.lazy(() => import('./pages/Owner/OwnerInvoicesPage'));
const OwnerNoticesPage = React.lazy(() => import('./pages/Owner/NoticesPage'));
const OwnerSystemInquiryPage = React.lazy(() => import('./pages/Owner/OwnerSystemInquiryPage'));
const OwnerOperationInquiryPage = React.lazy(() => import('./pages/Owner/OwnerOperationInquiryPage'));
const OwnerPoApprovalsPage = React.lazy(() => import('./pages/Owner/OwnerPoApprovalsPage'));

// Manager Role Specific Pages
const FoodcourtReportsPage = React.lazy(() => import('./pages/FoodcourtGeneral/FoodcourtReportsPage'));
const FoodcourtSubscriptionsPage = React.lazy(() => import('./pages/FoodcourtGeneral/FoodcourtSubscriptionsPage'));
const FoodcourtInvoicesPage = React.lazy(() => import('./pages/FoodcourtGeneral/FoodcourtInvoicesPage'));
const FoodcourtTradeInvoicesPage = React.lazy(() => import('./pages/FoodcourtGeneral/FoodcourtTradeInvoicesPage'));
const FoodcourtPlansPage = React.lazy(() => import('./pages/FoodcourtGeneral/FoodcourtPlansPage'));
const FoodcourtPaymentSettingsPage = React.lazy(() => import('./pages/FoodcourtGeneral/FoodcourtPaymentSettingsPage'));
const BrandManagement = React.lazy(() => import('./pages/BrandGeneral/BrandManagement'));
const BrandPerformance = React.lazy(() => import('./pages/BrandGeneral/BrandPerformance'));
const BrandReportsPage = React.lazy(() => import('./pages/BrandGeneral/BrandReportsPage'));
const BrandSubscriptionsPage = React.lazy(() => import('./pages/BrandGeneral/BrandSubscriptionsPage'));
const BrandInvoicesPage = React.lazy(() => import('./pages/BrandGeneral/BrandInvoicesPage'));
const BrandTradeInvoicesPage = React.lazy(() => import('./pages/BrandGeneral/BrandTradeInvoicesPage'));
const BrandPlansPage = React.lazy(() => import('./pages/BrandGeneral/BrandPlansPage'));
const BrandPaymentSettingsPage = React.lazy(() => import('./pages/BrandGeneral/BrandPaymentSettingsPage'));
// Brand Menu System (v3.32+)
const BrandMenusPage = React.lazy(() => import('./pages/BrandGeneral/BrandMenusPage'));
const RestaurantBrandMenuUpdatesPage = React.lazy(() => import('./pages/Restaurant/BrandMenuUpdatesPage'));
const FranchiseManagementPage = React.lazy(() => import('./pages/BrandGeneral/FranchiseManagementPage'));
const BrandFranchiseMapStandalone = React.lazy(() => import('./pages/BrandGeneral/BrandFranchiseMapStandalone'));
const TenancyManagementPage = React.lazy(() => import('./pages/FoodcourtGeneral/TenancyManagementPage'));
const FoodcourtTenancyMapStandalone = React.lazy(() => import('./pages/FoodcourtGeneral/FoodcourtTenancyMapStandalone'));
const FoodcourtFloorPlanPage = React.lazy(() => import('./pages/FoodcourtGeneral/FoodcourtFloorPlanPage'));
const FoodcourtFloorPlanEditorPage = React.lazy(() => import('./pages/FoodcourtGeneral/FoodcourtFloorPlanEditorPage'));
const FoodcourtBranchesPage = React.lazy(() => import('./pages/FoodcourtGeneral/FoodcourtBranchesPage'));
const RentManagement = React.lazy(() => import('./pages/Foodcourt/RentManagement'));
// BrandReports, FranchiseSupport 삭제됨 (미사용 placeholder)

// Brand General Inquiry Pages
const BrandSystemInquiryPage = React.lazy(() => import('./pages/Brand/SystemInquiryPage'));
const BrandOperationInquiryPage = React.lazy(() => import('./pages/Brand/OperationInquiryPage'));

// Foodcourt General Inquiry Pages
const FoodcourtSystemInquiryPage = React.lazy(() => import('./pages/Foodcourt/SystemInquiryPage'));
const FoodcourtOperationInquiryPage = React.lazy(() => import('./pages/Foodcourt/OperationInquiryPage'));

// Notices Pages
const AdminNoticesPage = React.lazy(() => import('./pages/Admin/NoticesPage'));
const BrandNoticesPage = React.lazy(() => import('./pages/Brand/NoticesPage'));
const FoodcourtNoticesPage = React.lazy(() => import('./pages/Foodcourt/NoticesPage'));
const RestaurantNoticesPage = React.lazy(() => import('./pages/Restaurant/NoticesPage'));

// Work Manuals Pages
const AdminWorkManualsPage = React.lazy(() => import('./pages/Admin/WorkManualsPage'));
const BrandWorkManualsPage = React.lazy(() => import('./pages/Brand/WorkManualsPage'));
const FoodcourtWorkManualsPage = React.lazy(() => import('./pages/Foodcourt/WorkManualsPage'));
const OwnerWorkManualsPage = React.lazy(() => import('./pages/Owner/WorkManualsPage'));
const RestaurantWorkManualsPage = React.lazy(() => import('./pages/Restaurant/WorkManualsPage'));

// Sprint 1 — Supply Chain Design 1
const SupplierDashboard = React.lazy(() => import('./pages/Supplier/SupplierDashboard'));
const SupplierProductsPage = React.lazy(() => import('./pages/Supplier/SupplierProductsPage'));
const SupplierInventoryPage = React.lazy(() => import('./pages/Supplier/SupplierInventoryPage'));
const SupplierCompanyInfoPage = React.lazy(() => import('./pages/Supplier/SupplierCompanyInfoPage'));
const SupplierPaymentSettingsPage = React.lazy(() => import('./pages/Supplier/SupplierPaymentSettingsPage'));
const SupplierInvoiceSettingsPage = React.lazy(() => import('./pages/Supplier/SupplierInvoiceSettingsPage'));
const SupplierInvoicesPage = React.lazy(() => import('./pages/Supplier/SupplierInvoicesPage'));
const SupplierSystemInquiryPage = React.lazy(() => import('./pages/Supplier/SupplierSystemInquiryPage'));
const SupplierCustomersPage = React.lazy(() => import('./pages/Supplier/SupplierCustomersPage'));
const SupplierContractsPage = React.lazy(() => import('./pages/Supplier/SupplierContractsPage'));
const SupplierOrdersPage = React.lazy(() => import('./pages/Supplier/SupplierOrdersPage'));
const SupplierTradeInvoicesPage = React.lazy(() => import('./pages/Supplier/SupplierTradeInvoicesPage'));
const SupplierStaffPage = React.lazy(() => import('./pages/Supplier/SupplierStaffPage'));
// SupplierSoaPage merged into SupplierTradeInvoicesPage (memory: Invoice + SOA unified).
const BrandIncomingOrdersPage = React.lazy(() => import('./pages/IncomingOrders/BrandIncomingOrdersPage'));
const FoodcourtIncomingOrdersPage = React.lazy(() => import('./pages/IncomingOrders/FoodcourtIncomingOrdersPage'));
// PurchaseInvoicesPage removed — superseded by per-role invoice pages (B1 SOA 재설계, v3.20)
const FoodcourtProductsPage = React.lazy(() => import('./pages/FoodcourtGeneral/FoodcourtProductsPage'));
const FoodcourtInventoryPage = React.lazy(() => import('./pages/FoodcourtGeneral/FoodcourtInventoryPage'));
const SupplierCompaniesPage = React.lazy(() => import('./pages/Admin/SupplierCompaniesPage'));
const SupplierInvitationsPage = React.lazy(() => import('./pages/Admin/SupplierInvitationsPage'));

// Sprint 2 — Supply Chain Design 2 (Buyer-side Supplier Directory + Contracts)
const SupplierDirectoryPage = React.lazy(() => import('./pages/SupplierDirectory/SupplierDirectoryPage'));
const SupplierProfilePage = React.lazy(() => import('./pages/SupplierDirectory/SupplierProfilePage'));
const MySuppliersPage = React.lazy(() => import('./pages/SupplierDirectory/MySuppliersPage'));
// Sprint 2: Contract detail uses MySuppliersPage with auto-open modal (no separate page)
// Sprint 3 — Purchase Orders (buyer-side ordering)
const PurchaseOrdersPage = React.lazy(() => import('./pages/PurchaseOrders/PurchaseOrdersPage'));
const StockLedgerLinkPage = React.lazy(() => import('./pages/StockLedger/StockLedgerLinkPage'));
const NewPurchaseOrderPage = React.lazy(() => import('./pages/PurchaseOrders/NewPurchaseOrderPage'));
const PurchaseOrderStagingPage = React.lazy(() => import('./pages/PurchaseOrders/PurchaseOrderStagingPage'));
const PurchaseOrderDetailPage = React.lazy(() => import('./pages/PurchaseOrders/PurchaseOrderDetailPage'));

// Shown when a restaurant-scoped user logs in without an assigned restaurant.
// Avoids the previous silent fallback to `/restaurant/1/dashboard` which leaked
// into another tenant and cascaded into 403/404 on every API call.
const NoRestaurantAssigned: React.FC = () => {
  const { logout } = useAuth();
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '40px',
        maxWidth: '480px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#0A2540', marginBottom: '12px' }}>No restaurant assigned</h2>
        <p style={{ color: '#4B5563', fontSize: '14px', lineHeight: 1.6, marginBottom: '24px' }}>
          Your account does not have a restaurant linked yet. Please contact your
          administrator to assign a restaurant to this account before signing in.
        </p>
        <button
          onClick={logout}
          style={{
            padding: '12px 24px',
            background: '#635BFF',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

// POS Root redirect component (for authenticated users)
const PosRootRedirect: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/pos" replace />;
  }

  // Redirect to appropriate dashboard based on user role
  switch (user?.role) {
    case 'System Admin':
      return <Navigate to="/pos/admin/dashboard" replace />;
    case 'Foodcourt General':
      return <Navigate to="/pos/foodcourt/general/dashboard" replace />;
    case 'Brand General':
      return <Navigate to="/pos/brand/general/dashboard" replace />;
    case 'Foodcourt Manager':
      return <Navigate to="/pos/foodcourt/general/dashboard" replace />;
    case 'Brand Manager':
      return <Navigate to="/pos/brand/general/dashboard" replace />;
    case 'Restaurant Owner':
      return <Navigate to="/pos/owner/dashboard" replace />;
    case 'Supplier Admin':
    case 'Supplier Staff':
      return <Navigate to="/pos/supplier/dashboard" replace />;
    case 'Referral Partner':
      // Referral-only users have no POS dashboard — bounce to their app instead
      return <Navigate to="/referral/dashboard" replace />;
    case 'Restaurant Admin':
    case 'Staff': {
      if (!user?.restaurantId) {
        return <NoRestaurantAssigned />;
      }
      return <Navigate to={`/restaurant/${user.restaurantId}/dashboard`} replace />;
    }
    default: {
      if (!user?.restaurantId) {
        return <NoRestaurantAssigned />;
      }
      return <Navigate to={`/restaurant/${user.restaurantId}/dashboard`} replace />;
    }
  }
};

// Legacy /pos/restaurant/* routes redirect to new /restaurant/:restaurantId/* structure
const LegacyRestaurantRedirect: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user?.restaurantId) {
    return <NoRestaurantAssigned />;
  }

  // Extract the path after /pos/restaurant/
  const pathAfterRestaurant = location.pathname.replace('/pos/restaurant/', '');

  // Redirect to new structure
  return <Navigate to={`/restaurant/${user.restaurantId}/${pathAfterRestaurant}`} replace />;
};

function App() {
  // Load site settings and update SEO on mount
  React.useEffect(() => {
    // 언마운트/이동 시 우리가 명시적으로 취소하고, catch 에서 그 취소만 골라 침묵시킨다.
    // ⛔ 메시지 문자열로 거르지 않는다 — 진짜 네트워크 장애도 같은 문자열을 낸다.
    const controller = new AbortController();
    const loadSiteSettings = async () => {
      try {
        const response = await fetch('/api/site-settings', { signal: controller.signal });
        if (response.ok) {
          const settings = await response.json();

          // Update document title
          if (settings.seo_title) {
            document.title = settings.seo_title;
          }

          // Update favicon — cache-bust + localStorage 캐싱 (다음 접속 시 inline script 가 즉시 적용 → 깜빡임 차단)
          if (settings.favicon_url) {
            const url = settings.favicon_url;
            const bustUrl = url.startsWith('data:') ? url : `${url}${url.includes('?') ? '&' : '?'}v=${Date.now()}`;
            document.querySelectorAll("link[rel~='icon']").forEach(el => {
              (el as HTMLLinkElement).href = bustUrl;
            });
            const appleTouchIcon = document.getElementById('apple-touch-icon') as HTMLLinkElement;
            if (appleTouchIcon) {
              appleTouchIcon.href = bustUrl;
            }
            try { localStorage.setItem('site_favicon_url', settings.favicon_url); } catch(e) { /* silent */ }
          } else {
            // System 관리자가 favicon 제거한 경우 캐시도 제거
            try { localStorage.removeItem('site_favicon_url'); } catch(e) { /* silent */ }
          }

          // Update meta description
          if (settings.seo_description) {
            const metaDesc = document.getElementById('meta-description');
            if (metaDesc) {
              metaDesc.setAttribute('content', settings.seo_description);
            }
          }

          // Update meta keywords
          if (settings.seo_keywords) {
            const metaKeywords = document.getElementById('meta-keywords');
            if (metaKeywords) {
              metaKeywords.setAttribute('content', settings.seo_keywords);
            }
          }

          // Update Open Graph tags
          if (settings.seo_title) {
            const ogTitle = document.getElementById('og-title');
            const twitterTitle = document.getElementById('twitter-title');
            if (ogTitle) ogTitle.setAttribute('content', settings.seo_title);
            if (twitterTitle) twitterTitle.setAttribute('content', settings.seo_title);
          }

          if (settings.seo_description) {
            const ogDesc = document.getElementById('og-description');
            const twitterDesc = document.getElementById('twitter-description');
            if (ogDesc) ogDesc.setAttribute('content', settings.seo_description);
            if (twitterDesc) twitterDesc.setAttribute('content', settings.seo_description);
          }

          if (settings.og_image_url) {
            const ogImage = document.getElementById('og-image');
            const twitterImage = document.getElementById('twitter-image');
            if (ogImage) ogImage.setAttribute('content', settings.og_image_url);
            if (twitterImage) twitterImage.setAttribute('content', settings.og_image_url);
          }
        }
      } catch (error) {
        // 우리가 취소한 요청은 실패가 아니다.
        if (controller.signal.aborted || (error as Error)?.name === 'AbortError') return;
        console.error('Failed to load site settings:', error);
      }
    };

    loadSiteSettings();
    return () => controller.abort();
  }, []);

  return (
    <ThemeProvider>
      <SiteSettingsProvider>
          <CustomerProvider>
            <OrderProvider>
              <Router>
                <AuthProvider>
                {/* 다른 탭에서 컨텍스트가 바뀌면 이 탭도 따라오게 한다(§4.7).
                    MainLayout(인쇄 보호파일)이 아니라 여기 두는 이유 = 보호파일 무접촉. */}
                <ContextFollowGate />
                <StoreProvider>
                  {/* ConsolidatedTicketRunner removed 2026-06-09 — the consolidated
                      order ticket is now produced by the existing kitchen-print mirror
                      (billPrint.printKitchenTicketViaRawBT) routed to the configured
                      printer, so it covers new orders + cancel/move with no duplicate.
                      The separate poller was redundant and caused double prints. */}
                  <StaffProvider>
                    <MenuProvider>
                      <PaymentStatusProvider>
                      <PwaInstallProvider>
                       <OfflineProvider>
                        <ScrollToTop />
                        {/* 2026-07-09 (Irene): native app version badge (top-left) only. The
                            in-app "지금 업데이트" download banner was removed — it pushed a manual
                            .exe download (wrong UX). The app updates ITSELF via electron-updater
                            (0.1.5+ shows its own "restart to update" prompt). Native app only. */}
                        {typeof window !== 'undefined' && (window as any).__NATIVE_PRINT && (
                          <div style={{ position: 'fixed', top: 0, left: 0, zIndex: 2147483647, fontSize: '10px', lineHeight: '14px', padding: '1px 6px', background: 'rgba(99,91,255,0.92)', color: '#fff', borderBottomRightRadius: '6px', fontWeight: 700, letterSpacing: '0.3px', pointerEvents: 'none', fontFamily: 'monospace' }}>
                            app v{String((window as any).__NATIVE_PRINT.version || '?')}
                          </div>
                        )}
                        <CookieConsentBanner />
                        <NotificationToaster />
                        <PwaInstallBanner />
                        <InstallGuideModal />
                        <OfflineBanner />
                        <OfflineLockOverlay />
                        {/* Print Self-Diagnose (docs/PRINT_SELF_DIAGNOSE_DESIGN.md):
                            failure banner (deep-links to Settings>Printer diagnose) +
                            passive device reporter. Both are read-only w.r.t. the print
                            pipeline — the protected files stay untouched (print-guard 8/8). */}
                        <AutoPrintFailureBanner />
                        <PrintDeviceReporter />
                      <Suspense fallback={<PageLoader />}>
                      <Routes>
                      {/* ===== PUBLIC ROUTES (No MainLayout) ===== */}
                      <Route path="/" element={<HomePage />} />
                      <Route path="/install" element={<Navigate to="/" replace />} />
                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/features" element={<FeaturesPage />} />
                      <Route path="/service" element={<Navigate to="/features" replace />} />
                      <Route path="/pricing" element={<PricingPage />} />
                      <Route path="/packages" element={<PackagesPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/demo" element={<DemoPage />} />
                      <Route path="/signup" element={<SignupPage />} />
                      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                      <Route path="/reset-password" element={<ResetPasswordPage />} />
                      <Route path="/company" element={<CompanyPage />} />
                      <Route path="/privacy" element={<PrivacyPolicyPage />} />
                      <Route path="/terms" element={<TermsOfServicePage />} />
                      <Route path="/faq" element={<FAQPage />} />
                      <Route path="/referral-program" element={<ReferralLandingPage />} />
                      <Route path="/blog" element={<BlogPage />} />
                      <Route path="/blog/:slug" element={<BlogPostPage />} />
                      <Route path="/news" element={<NewsPage />} />
                      <Route path="/news/:slug" element={<BlogPostPage />} />

                      {/* Login & Email Verification */}
                      <Route path="/pos" element={<LoginPage />} />
                      {/* 컨텍스트 선택 — 부여받은 모자가 2개 이상인 사용자만 도달한다 */}
                      <Route path="/pos/select-context" element={<ProtectedRoute><ContextSelectPage /></ProtectedRoute>} />
                      <Route path="/verify-email" element={<VerifyEmailPage />} />

                      {/* Referral System (Refer & Earn) — auth handled at the page/Layout level (Phase 1D will wire ProtectedRoute) */}
                      <Route path="/referral" element={<Navigate to="/referral/dashboard" replace />} />
                      <Route path="/referral/login" element={<ReferralLoginPage />} />
                      <Route path="/referral/signup" element={<ReferralSignupPage />} />
                      <Route path="/referral/dashboard" element={<ReferralLayout><ReferralDashboardPage /></ReferralLayout>} />
                      <Route path="/referral/wallet" element={<ReferralLayout><ReferralWalletPage /></ReferralLayout>} />
                      <Route path="/referral/profile" element={<ReferralLayout><ReferralProfilePage /></ReferralLayout>} />

                      <Route path="/notification-preferences" element={
                        <NotificationPreferencesRedirect />
                      } />

                      {/* Mobile */}
                      <Route path="/mobile/*" element={<MobileApp />} />

                      {/* ===== FULL-SCREEN ROUTES (No MainLayout) ===== */}
                      <Route path="/restaurant/:restaurantId/pos-terminal" element={
                        <ProtectedRoute requireRestaurantMatch={true} requiredRole={['Restaurant Admin', 'Staff']}>
                          <POSTerminalPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/restaurant/:restaurantId/kitchen" element={
                        <ProtectedRoute requireRestaurantMatch={true} requiredRole={['Restaurant Admin', 'Staff']}>
                          <KitchenDisplayPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/restaurant/:restaurantId/display" element={
                        <ProtectedRoute requireRestaurantMatch={true} requiredRole={['Restaurant Admin', 'Staff']}>
                          <CustomerDisplayPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/restaurant/:restaurantId/checkout-display" element={
                        <ProtectedRoute requireRestaurantMatch={true} requiredRole={['Restaurant Admin', 'Staff']}>
                          <CheckoutDisplayPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/restaurant/:restaurantId/floor-plan" element={
                        <ProtectedRoute requireRestaurantMatch={true} requiredRole={['Restaurant Admin', 'Staff']}>
                          <FloorPlanPage />
                        </ProtectedRoute>
                      } />
                      {/* Floor Plan Editor — standalone (no MainLayout sidebar), Floor Plan 에서만 진입 */}
                      <Route path="/restaurant/:restaurantId/floor-plan-editor" element={
                        <ProtectedRoute requireRestaurantMatch={true} requiredRole={['Restaurant Admin']}>
                          <FloorPlanEditor />
                        </ProtectedRoute>
                      } />

                      {/* Foodcourt Floor Plan — standalone window (no MainLayout) */}
                      <Route path="/pos/foodcourt/floor-plan" element={
                        <ProtectedRoute requiredRole={['Foodcourt General', 'Foodcourt Manager']}>
                          <FoodcourtFloorPlanPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/foodcourt/floor-plan-editor" element={
                        <ProtectedRoute requiredRole={['Foodcourt General']}>
                          <FoodcourtFloorPlanEditorPage />
                        </ProtectedRoute>
                      } />

                      {/* ===== POS LAYOUT ROUTES (MainLayout mounted once) ===== */}
                      <Route element={<PosLayout />}>

                      {/* System Admin Routes */}
                      <Route path="/pos/admin/dashboard" element={
                        <ProtectedRoute requiredRole={['System Admin']}>
                          <AdminDashboard />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/admin/managers" element={
                        <ProtectedRoute requiredRole={['System Admin']}>
                          <ManagersPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/admin/restaurants" element={
                        <ProtectedRoute requiredRole={['System Admin']}>
                          <RestaurantsPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/admin/subscriptions" element={
                        <ProtectedRoute requiredRole={['System Admin']}>
                          <SubscriptionsPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/admin/staff" element={
                        <ProtectedRoute requiredRole={['System Admin']}>
                          <AdminStaffManagementPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/admin/invoices" element={
                        <ProtectedRoute requiredRole={['System Admin']}>
                          <InvoicesPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/admin/plans" element={
                        <ProtectedRoute requiredRole={['System Admin']}>
                          <PlansPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/admin/report" element={
                        <ProtectedRoute requiredRole={['System Admin']}>
                          <AdminReportsPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/admin/print-health" element={
                        <ProtectedRoute requiredRole={['System Admin']}>
                          <PrintHealthPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/admin/support" element={
                        <ProtectedRoute requiredRole={['System Admin']}>
                          <SystemInquiryPage />
                        </ProtectedRoute>
                      } />
                      {/* 솔루션 개발이슈 — 배포 회차별 개발 현황(시스템 관리자 전용, 읽기만) */}
                      <Route path="/pos/admin/deploy-records" element={
                        <ProtectedRoute requiredRole="System Admin">
                          <DeployRecordsPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/admin/contact-inquiries" element={
                        <ProtectedRoute requiredRole={['System Admin']}>
                          <ContactInquiriesPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/admin/notices" element={
                        <ProtectedRoute requiredRole={['System Admin']}>
                          <AdminNoticesPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/admin/work-manuals" element={
                        <ProtectedRoute requiredRole={['System Admin']}>
                          <AdminWorkManualsPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/admin/system-products" element={
                        <ProtectedRoute requiredRole={['System Admin']}>
                          <SystemProductManagementPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/admin/hardware-quotes" element={
                        <ProtectedRoute requiredRole={['System Admin']}>
                          <HardwareQuotesPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/admin/logs" element={
                        <ProtectedRoute requiredRole={['System Admin']}>
                          <SystemLogsPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/admin/content" element={
                        <ProtectedRoute requiredRole={['System Admin']}>
                          <ContentManagementPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/admin/settings" element={
                        <ProtectedRoute requiredRole={['System Admin']}>
                          <AdminSettingsPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/admin/carriers" element={
                        <ProtectedRoute requiredRole={['System Admin']}>
                          <CarriersPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/admin/carrier-webhooks" element={
                        <ProtectedRoute requiredRole={['System Admin']}>
                          <CarrierWebhookEventsPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/admin/history" element={
                        <ProtectedRoute requiredRole={['System Admin']}>
                          <ActivityHistoryPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/admin/payment-settings" element={
                        <ProtectedRoute requiredRole={['System Admin']}>
                          <AdminPaymentSettingsPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/admin/site-settings" element={
                        <ProtectedRoute requiredRole={['System Admin']}>
                          <SiteSettingsPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/admin/restaurant-subscriptions" element={
                        <ProtectedRoute requiredRole={['System Admin']}>
                          <RestaurantSubscriptionsPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/admin/notification-settings" element={
                        <ProtectedRoute requiredRole={['System Admin']}>
                          <NotificationSettingsPage />
                        </ProtectedRoute>
                      } />

                      {/* Common Profile Route for All Roles */}
                      <Route path="/pos/profile" element={
                        <ProtectedRoute>
                          <ProfilePage />
                        </ProtectedRoute>
                      } />

                      {/* Unified Inbox — all logged-in roles */}
                      <Route path="/pos/inbox" element={
                        <ProtectedRoute>
                          <InboxPage />
                        </ProtectedRoute>
                      } />

                      {/* Scheduler monitoring — System Admin only */}
                      <Route path="/pos/admin/scheduler-monitor" element={
                        <ProtectedRoute requiredRole={['System Admin']}>
                          <SchedulerMonitorPage />
                        </ProtectedRoute>
                      } />

                      {/* Referral System management — System Admin only (Phase 2) */}
                      <Route path="/pos/admin/referrals" element={
                        <ProtectedRoute requiredRole={['System Admin']}>
                          <ReferralManagementPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/restaurant/:id/inbox" element={
                        <ProtectedRoute>
                          <InboxPage />
                        </ProtectedRoute>
                      } />

                      {/* Restaurant Owner Routes */}
                      <Route path="/pos/owner/dashboard" element={
                        <ProtectedRoute requiredRole={['Restaurant Owner']}>
                          <OwnerDashboardPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/owner/restaurants" element={
                        <ProtectedRoute requiredRole={['Restaurant Owner']}>
                          <OwnerRestaurantsPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/owner/performance" element={
                        <ProtectedRoute requiredRole={['Restaurant Owner']}>
                          <OwnerPerformancePage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/owner/reports" element={
                        <ProtectedRoute requiredRole={['Restaurant Owner']}>
                          <OwnerReportsPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/owner/invoices" element={
                        <ProtectedRoute requiredRole={['Restaurant Owner']}>
                          <OwnerInvoicesPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/owner/po-approvals" element={
                        <ProtectedRoute requiredRole={['Restaurant Owner']}>
                          <OwnerPoApprovalsPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/owner/notices" element={
                        <ProtectedRoute requiredRole={['Restaurant Owner']}>
                          <OwnerNoticesPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/owner/work-manuals" element={
                        <ProtectedRoute requiredRole={['Restaurant Owner']}>
                          <OwnerWorkManualsPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/owner/system-inquiry" element={
                        <ProtectedRoute requiredRole={['Restaurant Owner']}>
                          <OwnerSystemInquiryPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/owner/operation-inquiry" element={
                        <ProtectedRoute requiredRole={['Restaurant Owner']}>
                          <OwnerOperationInquiryPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/owner/history" element={
                        <ProtectedRoute requiredRole={['Restaurant Owner']}>
                          <ActivityHistoryPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/owner/notification-settings" element={
                        <ProtectedRoute requiredRole={['Restaurant Owner']}>
                          <NotificationSettingsPage />
                        </ProtectedRoute>
                      } />

                      {/* Foodcourt General / Foodcourt Manager Routes */}
                      <Route path="/pos/foodcourt/general/dashboard" element={
                        <ProtectedRoute requiredRole={['Foodcourt General', 'Foodcourt Manager']}>
                          <FoodcourtGeneralDashboard />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/foodcourt/tenancy" element={
                        <ProtectedRoute requiredRole={['Foodcourt General', 'Foodcourt Manager']}>
                          <TenancyManagementPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/foodcourt/tenancy-map" element={
                        <ProtectedRoute requiredRole={['Foodcourt General', 'Foodcourt Manager']}>
                          <FoodcourtTenancyMapStandalone />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/foodcourt/branches" element={
                        <ProtectedRoute requiredRole={['Foodcourt General']}>
                          <FoodcourtBranchesPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/foodcourt/general/reports" element={
                        <ProtectedRoute requiredRole={['Foodcourt General', 'Foodcourt Manager']}>
                          <FoodcourtReportsPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/foodcourt/general/subscriptions" element={
                        <ProtectedRoute requiredRole={['Foodcourt General', 'Foodcourt Manager']}>
                          <FoodcourtSubscriptionsPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/foodcourt/general/system-inquiry" element={
                        <ProtectedRoute requiredRole={['Foodcourt General', 'Foodcourt Manager']}>
                          <FoodcourtSystemInquiryPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/foodcourt/general/operation-inquiry" element={
                        <ProtectedRoute requiredRole={['Foodcourt General', 'Foodcourt Manager']}>
                          <FoodcourtOperationInquiryPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/foodcourt/manager" element={
                        <ProtectedRoute requiredRole={['Foodcourt General']}>
                          <FoodcourtStaffPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/foodcourt/general/notices" element={
                        <ProtectedRoute requiredRole={['Foodcourt General', 'Foodcourt Manager']}>
                          <FoodcourtNoticesPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/foodcourt/general/work-manuals" element={
                        <ProtectedRoute requiredRole={['Foodcourt General', 'Foodcourt Manager']}>
                          <FoodcourtWorkManualsPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/foodcourt/invoices" element={
                        <ProtectedRoute requiredRole={['Foodcourt General', 'Foodcourt Manager']}>
                          <FoodcourtInvoicesPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/foodcourt/trade-invoices" element={
                        <ProtectedRoute requiredRole={['Foodcourt General', 'Foodcourt Manager']}>
                          <FoodcourtTradeInvoicesPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/foodcourt/history" element={
                        <ProtectedRoute requiredRole={['Foodcourt General', 'Foodcourt Manager']}>
                          <ActivityHistoryPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/foodcourt/plans" element={
                        <ProtectedRoute requiredRole={['Foodcourt General', 'Foodcourt Manager']}>
                          <FoodcourtPlansPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/foodcourt/payment-settings" element={
                        <ProtectedRoute requiredRole={['Foodcourt General', 'Foodcourt Manager']}>
                          <FoodcourtPaymentSettingsPage />
                        </ProtectedRoute>
                      } />

                      {/* Brand General / Brand Manager Routes */}
                      <Route path="/pos/brand/general/dashboard" element={
                        <ProtectedRoute requiredRole={['Brand General', 'Brand Manager']}>
                          <BrandGeneralDashboard />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/brand/general/management" element={
                        <ProtectedRoute requiredRole={['Brand General', 'Brand Manager']}>
                          <BrandManagement />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/brand/franchise" element={
                        <ProtectedRoute requiredRole={['Brand General', 'Brand Manager']}>
                          <FranchiseManagementPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/brand/franchise-map" element={
                        <ProtectedRoute requiredRole={['Brand General', 'Brand Manager']}>
                          <BrandFranchiseMapStandalone />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/brand/general/performance" element={
                        <ProtectedRoute requiredRole={['Brand General', 'Brand Manager']}>
                          <BrandPerformance />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/brand/general/reports" element={
                        <ProtectedRoute requiredRole={['Brand General', 'Brand Manager']}>
                          <BrandReportsPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/brand/general/subscriptions" element={
                        <ProtectedRoute requiredRole={['Brand General', 'Brand Manager']}>
                          <BrandSubscriptionsPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/brand/general/system-inquiry" element={
                        <ProtectedRoute requiredRole={['Brand General', 'Brand Manager']}>
                          <BrandSystemInquiryPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/brand/general/operation-inquiry" element={
                        <ProtectedRoute requiredRole={['Brand General', 'Brand Manager']}>
                          <BrandOperationInquiryPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/brand/manager" element={
                        <ProtectedRoute requiredRole={['Brand General']}>
                          <BrandStaffPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/brand/general/notices" element={
                        <ProtectedRoute requiredRole={['Brand General', 'Brand Manager']}>
                          <BrandNoticesPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/brand/general/work-manuals" element={
                        <ProtectedRoute requiredRole={['Brand General', 'Brand Manager']}>
                          <BrandWorkManualsPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/brand/history" element={
                        <ProtectedRoute requiredRole={['Brand General', 'Brand Manager']}>
                          <ActivityHistoryPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/brand/invoices" element={
                        <ProtectedRoute requiredRole={['Brand General', 'Brand Manager']}>
                          <BrandInvoicesPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/brand/trade-invoices" element={
                        <ProtectedRoute requiredRole={['Brand General', 'Brand Manager']}>
                          <BrandTradeInvoicesPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/brand/plans" element={
                        <ProtectedRoute requiredRole={['Brand General', 'Brand Manager']}>
                          <BrandPlansPage />
                        </ProtectedRoute>
                      } />
                      {/* 2026-09-06 Fable 판정: 결제 설정(Stripe/PayPal·은행계좌)은 **돈 경계**다.
                          서버(`brands-core.js` payment-settings GET/PUT)가 Brand Manager 를 **일부러 403**
                          으로 막는데 화면만 열려 있어, 매니저가 들어가면 빈 화면·오류를 봤다.
                          서버를 넓히는 게 아니라 **화면을 서버에 맞춘다** — BM 에게는 이 메뉴를 안 준다.
                          (사이드바도 함께 숨긴다 — MainLayout 의 plans 섹션.) */}
                      <Route path="/pos/brand/payment-settings" element={
                        <ProtectedRoute requiredRole={['Brand General']}>
                          <BrandPaymentSettingsPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/brand/company-info" element={
                        <ProtectedRoute requiredRole={['Brand General', 'Brand Manager']}>
                          <BrandCompanyInfoPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/foodcourt/company-info" element={
                        <ProtectedRoute requiredRole={['Foodcourt General', 'Foodcourt Manager']}>
                          <FoodcourtCompanyInfoPage />
                        </ProtectedRoute>
                      } />

                      {/* Recipe Management for Brand General */}
                      <Route path="/pos/recipes" element={
                        <ProtectedRoute requiredRole={['Brand General', 'Brand Manager', 'System Admin']}>
                          <RecipeManagementPage />
                        </ProtectedRoute>
                      } />

                      {/* Brand Product Management for Brand General */}
                      <Route path="/pos/brand-products" element={
                        <ProtectedRoute requiredRole={['Brand General', 'Brand Manager', 'System Admin']}>
                          <BrandProductManagementPage />
                        </ProtectedRoute>
                      } />

                      {/* Brand Menu System (v3.32+) — BG side */}
                      <Route path="/pos/brand-menus" element={
                        <ProtectedRoute requiredRole={['Brand General', 'Brand Manager', 'System Admin']}>
                          <BrandMenusPage />
                        </ProtectedRoute>
                      } />
                      {/* Legacy redirects — Categories / OptionGroups are now tabs inside /pos/brand-menus */}
                      <Route path="/pos/brand-menu-categories" element={<Navigate to="/pos/brand-menus?tab=categories" replace />} />
                      <Route path="/pos/brand-menu-option-groups" element={<Navigate to="/pos/brand-menus?tab=options" replace />} />

                      {/* Brand Menu System — Restaurant side */}
                      <Route path="/restaurant/:restaurantId/brand-menu-updates" element={
                        <ProtectedRoute requiredRole={['Restaurant Admin', 'Staff', 'Brand General', 'Brand Manager', 'Foodcourt General', 'System Admin', 'Restaurant Owner']}>
                          <RestaurantBrandMenuUpdatesPage />
                        </ProtectedRoute>
                      } />

                      {/* Brand Inventory Management */}
                      <Route path="/pos/brand-inventory" element={
                        <ProtectedRoute requiredRole={['Brand General', 'Brand Manager', 'System Admin']}>
                          <BrandInventoryPage />
                        </ProtectedRoute>
                      } />

                      {/* Brand Product Recipe Management */}
                      <Route path="/pos/brand-product-recipes" element={
                        <ProtectedRoute requiredRole={['Brand General', 'Brand Manager', 'System Admin']}>
                          <BrandProductRecipePage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/brand-ingredients" element={
                        <ProtectedRoute requiredRole={['Brand General', 'Brand Manager', 'System Admin']}>
                          <BrandIngredientsPage />
                        </ProtectedRoute>
                      } />

                      {/* ⛔ 2026-09-06 삭제 — `/pos/recipe-management/recipes`·`/ingredients` 두 화면.
                          어느 역할 허용목록(ROLE_ROUTES)에도 없어 **열면 대시보드로 튕기는** 죽은 화면이었다
                          (기계 판정: 두 주소 모두 도달 가능 역할 0). 안에 `base_quantity` 미적용
                          (치즈 70 g → RM 6,510)·저장 시 `cost` 미전송(DB 원가 0) 결함이 들어 있어,
                          살려 두는 것 자체가 위험이었다.
                          BG 사이드바 "Brand Recipes" 는 `/pos/recipes`(RecipeManagementPage)로 별개다. */}
                      {/* 2026-09-02: BG 네임스페이스의 "매장 공유 표준 재료" 화면.
                          위 /pos/recipe-management/ingredients 는 라우트는 있으나 **BG 허용 목록에 없어
                          열면 대시보드로 튕겼다** — 즉 BG 에게는 이 목록을 보는 화면이 아예 없었다
                          (운영에서 꺼진 미러 재료 63건이 화면 밖에서 꺼진 이유). 가드를 넓히지 않고
                          BG 네임스페이스(`/pos/brand/general/*` 는 이미 허용)에 라우트를 신설한다. */}
                      {/* F6 (2026-09-04, docs/INGREDIENT_UNIFICATION_DESIGN.md):
                          재료 목록은 Stock Items 하나다. 이 화면(Shared Ingredients)은 같은 개념의
                          두 번째 목록이라 없앤다. 라우트는 즐겨찾기·옛 링크를 위해 남기고 리다이렉트만 한다. */}
                      <Route path="/pos/brand/general/ingredients" element={
                        <Navigate to="/pos/brand-ingredients" replace />
                      } />

                      {/* Suppliers Management */}
                      <Route path="/pos/suppliers" element={
                        <ProtectedRoute requiredRole={['Restaurant Admin','Restaurant Owner','Staff','Brand General','Brand Manager','Foodcourt General','Foodcourt Manager','System Admin']}>
                          <UnifiedSuppliersPage />
                        </ProtectedRoute>
                      } />

                      {/* Foodcourt Manager Routes */}
                      <Route path="/pos/foodcourt/dashboard" element={
                        <ProtectedRoute requiredRole={['Foodcourt Manager']}>
                          <FoodcourtManagerDashboard />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/foodcourt/rent-management" element={
                        <ProtectedRoute requiredRole={['Foodcourt General', 'Foodcourt Manager']}>
                          <RentManagement />
                        </ProtectedRoute>
                      } />

                      {/* Brand Manager Routes */}
                      <Route path="/pos/brand/dashboard" element={
                        <ProtectedRoute requiredRole={['Brand Manager']}>
                          <BrandManagerDashboard />
                        </ProtectedRoute>
                      } />
                      {/* BrandReports, FranchiseSupport 라우트 삭제됨 (미사용 placeholder) */}

                      {/* Manager Routes */}
                      <Route path="/pos/manager/dashboard" element={
                        <ProtectedRoute requiredRole={['Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager']}>
                          <ManagerDashboard />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/manager/subscriptions" element={
                        <ProtectedRoute requiredRole={['Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager']}>
                          <ManagerSubscriptionsPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/manager/restaurants" element={
                        <ProtectedRoute requiredRole={['Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager']}>
                          <ManagerRestaurantsPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/manager/admins" element={
                        <ProtectedRoute requiredRole={['Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager']}>
                          <ManagerAdminManagementPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/manager/sales" element={
                        <ProtectedRoute requiredRole={['Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager']}>
                          <ManagerSalesPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/manager/reports" element={
                        <ProtectedRoute requiredRole={['Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager']}>
                          <ManagerReportsPage />
                        </ProtectedRoute>
                      } />
                      {/* ManagerCustomersPage 라우트 삭제됨 */}
                      <Route path="/pos/manager/coupons" element={
                        <ProtectedRoute requiredRole={['Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager']}>
                          <ManagerPromotionsPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/manager/plans" element={
                        <ProtectedRoute requiredRole={['Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager']}>
                          <ManagerPlansPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/manager/support" element={
                        <ProtectedRoute requiredRole={['Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager']}>
                          <ManagerSupportTicketsPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/manager/operation-inquiry" element={
                        <ProtectedRoute requiredRole={['Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager']}>
                          <OperationInquiryPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/manager/invoices" element={
                        <ProtectedRoute requiredRole={['Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager']}>
                          <ManagerInvoicesPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/manager/notification-settings" element={
                        <ProtectedRoute requiredRole={['Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager']}>
                          <NotificationSettingsPage />
                        </ProtectedRoute>
                      } />

                      {/* Legacy routes */}
                      <Route path="/pos/restaurant/*" element={<LegacyRestaurantRedirect />} />
                      <Route path="/pos/dashboard" element={
                        <ProtectedRoute>
                          <PosRootRedirect />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/basic" element={
                        <ProtectedRoute>
                          <BasicDashboard />
                        </ProtectedRoute>
                      } />

                      {/* Restaurant Admin Routes */}
                      <Route path="/restaurant/:restaurantId/dashboard" element={
                        <ProtectedRoute requireRestaurantMatch={true} requiredRole={['Restaurant Admin', 'Staff', 'Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager']}>
                          <RestaurantDashboard />
                        </ProtectedRoute>
                      } />
                      <Route path="/restaurant/:restaurantId/live-orders" element={
                        <ProtectedRoute requireRestaurantMatch={true} requiredRole={['Restaurant Admin', 'Staff']}>
                          <LiveOrdersPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/restaurant/:restaurantId/reservations" element={
                        <ProtectedRoute requireRestaurantMatch={true} requiredRole={['Restaurant Admin', 'Staff']}>
                          <ReservationsTimelinePage />
                        </ProtectedRoute>
                      } />
                      {/* Cash Management(시재관리) 회계 리스트 — POS 권한 스탭 포함. /cash-drawer·/cash-up 구 경로 호환. */}
                      <Route path="/restaurant/:restaurantId/cash-management" element={
                        <ProtectedRoute requireRestaurantMatch={true} requiredRole={['Restaurant Admin', 'Restaurant Owner', 'Staff']}>
                          <CashUpPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/restaurant/:restaurantId/cash-drawer" element={
                        <ProtectedRoute requireRestaurantMatch={true} requiredRole={['Restaurant Admin', 'Restaurant Owner', 'Staff']}>
                          <CashUpPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/restaurant/:restaurantId/cash-up" element={
                        <ProtectedRoute requireRestaurantMatch={true} requiredRole={['Restaurant Admin', 'Restaurant Owner', 'Staff']}>
                          <CashUpPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/restaurant/:restaurantId/menu" element={
                        <ProtectedRoute requireRestaurantMatch={true} requiredRole={['System Admin', 'Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager', 'Restaurant Admin', 'Staff']}>
                          <MenuManagementPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/restaurant/:restaurantId/categories" element={
                        <ProtectedRoute requireRestaurantMatch={true} requiredRole={['System Admin', 'Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager', 'Restaurant Admin', 'Staff']}>
                          <CategoryManagementPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/restaurant/:restaurantId/options" element={
                        <ProtectedRoute requireRestaurantMatch={true} requiredRole={['System Admin', 'Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager', 'Restaurant Admin', 'Staff']}>
                          <OptionManagementPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/restaurant/:restaurantId/recipe-management" element={
                        <ProtectedRoute requireRestaurantMatch={true} requiredRole={['System Admin', 'Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager', 'Restaurant Admin', 'Staff']}>
                          <RecipeManagementPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/restaurant/:restaurantId/ingredients" element={
                        <ProtectedRoute requireRestaurantMatch={true} requiredRole={['System Admin', 'Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager', 'Restaurant Admin', 'Staff']}>
                          <RestaurantIngredientsPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/restaurant/:restaurantId/suppliers" element={
                        <ProtectedRoute requireRestaurantMatch={true} requiredRole={['System Admin', 'Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager', 'Restaurant Admin', 'Staff']}>
                          <SuppliersPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/restaurant/:restaurantId/customers" element={
                        <ProtectedRoute requireRestaurantMatch={true} requiredRole={['System Admin', 'Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager', 'Restaurant Admin', 'Staff']}>
                          <CustomersPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/restaurant/:restaurantId/staff" element={
                        <ProtectedRoute requireRestaurantMatch={true} requiredRole={['System Admin', 'Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager', 'Restaurant Admin']}>
                          <StaffPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/restaurant/:restaurantId/sales" element={
                        <ProtectedRoute requireRestaurantMatch={true} requiredRole={['System Admin', 'Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager', 'Restaurant Admin', 'Staff']}>
                          <SalesPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/restaurant/:restaurantId/coupons" element={
                        <ProtectedRoute requireRestaurantMatch={true} requiredRole={['System Admin', 'Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager', 'Restaurant Admin', 'Staff']}>
                          <PromotionsPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/restaurant/:restaurantId/reports" element={
                        <ProtectedRoute requireRestaurantMatch={true} requiredRole={['System Admin', 'Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager', 'Restaurant Admin', 'Staff']}>
                          <ReportsPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/restaurant/:restaurantId/support" element={
                        <ProtectedRoute requireRestaurantMatch={true} requiredRole={['Restaurant Admin', 'Staff']}>
                          <RestaurantSupportTicketsPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/restaurant/:restaurantId/operation-inquiry" element={
                        <ProtectedRoute requireRestaurantMatch={true} requiredRole={['Restaurant Admin', 'Staff']}>
                          <RestaurantOperationInquiryPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/restaurant/:restaurantId/notices" element={
                        <ProtectedRoute requireRestaurantMatch={true} requiredRole={['Restaurant Admin', 'Staff']}>
                          <RestaurantNoticesPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/restaurant/:restaurantId/work-manuals" element={
                        <ProtectedRoute requireRestaurantMatch={true} requiredRole={['Restaurant Admin', 'Staff']}>
                          <RestaurantWorkManualsPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/restaurant/:restaurantId/settings" element={
                        <ProtectedRoute requireRestaurantMatch={true} requiredRole={['System Admin', 'Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager', 'Restaurant Admin', 'Staff']}>
                          <SettingsPage />
                        </ProtectedRoute>
                      } />
                      {/* floor-plan-editor moved to standalone (above) — Floor Plan 본 페이지와 동일 풀화면 */}
                      <Route path="/restaurant/:restaurantId/company-information" element={
                        <ProtectedRoute requireRestaurantMatch={true} requiredRole={['Restaurant Admin', 'Staff']}>
                          <CompanyInformationPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/restaurant/:restaurantId/profile" element={
                        <ProtectedRoute requireRestaurantMatch={true}>
                          <ProfilePage />
                        </ProtectedRoute>
                      } />
                      <Route path="/restaurant/:restaurantId/invoices" element={
                        <ProtectedRoute requireRestaurantMatch={true} requiredRole={['Restaurant Admin', 'Staff']}>
                          <RestaurantInvoicesPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/restaurant/:restaurantId/history" element={
                        <ProtectedRoute requireRestaurantMatch={true} requiredRole={['Restaurant Admin', 'Staff']}>
                          <ActivityHistoryPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/restaurant/:restaurantId/notification-settings" element={
                        <ProtectedRoute requireRestaurantMatch={true} requiredRole={['Restaurant Admin', 'Staff']}>
                          <NotificationSettingsPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/restaurant/:restaurantId/inventory" element={
                        <ProtectedRoute requireRestaurantMatch={true} requiredRole={['System Admin', 'Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager', 'Restaurant Admin', 'Staff']}>
                          <InventoryPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/restaurant/:restaurantId/stock-take" element={
                        <ProtectedRoute requireRestaurantMatch={true} requiredRole={['System Admin', 'Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager', 'Restaurant Admin', 'Staff']}>
                          <StockTakePage />
                        </ProtectedRoute>
                      } />
                      <Route path="/restaurants/:restaurantId/inventory" element={
                        <ProtectedRoute requireRestaurantMatch={true} requiredRole={['System Admin', 'Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager', 'Restaurant Admin', 'Staff']}>
                          <InventoryPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/restaurants/:restaurantId/stock-take" element={
                        <ProtectedRoute requireRestaurantMatch={true} requiredRole={['System Admin', 'Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager', 'Restaurant Admin', 'Staff']}>
                          <StockTakePage />
                        </ProtectedRoute>
                      } />
                      <Route path="/restaurant/:restaurantId/product-recipes" element={
                        <ProtectedRoute requireRestaurantMatch={true} requiredRole={['System Admin', 'Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager', 'Restaurant Admin', 'Staff']}>
                          <ProductRecipePage />
                        </ProtectedRoute>
                      } />

                      {/* Sprint 1 — Supply Chain Design 1 */}
                      <Route path="/pos/supplier/dashboard" element={
                        <ProtectedRoute requiredRole={['Supplier Admin', 'System Admin']}>
                          <SupplierDashboard />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/supplier/notices" element={
                        <ProtectedRoute requiredRole={['Supplier Admin', 'System Admin']}>
                          <BrandNoticesPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/supplier/products" element={
                        <ProtectedRoute requiredRole={['Supplier Admin', 'System Admin']}>
                          <SupplierProductsPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/supplier/inventory" element={
                        <ProtectedRoute requiredRole={['Supplier Admin', 'System Admin']}>
                          <SupplierInventoryPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/supplier/company-info" element={
                        <ProtectedRoute requiredRole={['Supplier Admin', 'System Admin']}>
                          <SupplierCompanyInfoPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/supplier/payment-settings" element={
                        <ProtectedRoute requiredRole={['Supplier Admin', 'System Admin']}>
                          <SupplierPaymentSettingsPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/supplier/invoice-settings" element={
                        <ProtectedRoute requiredRole={['Supplier Admin', 'System Admin']}>
                          <SupplierInvoiceSettingsPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/supplier/invoices" element={
                        <ProtectedRoute requiredRole={['Supplier Admin', 'System Admin']}>
                          <SupplierInvoicesPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/supplier/system-inquiry" element={
                        <ProtectedRoute requiredRole={['Supplier Admin', 'System Admin']}>
                          <SupplierSystemInquiryPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/supplier/customers" element={
                        <ProtectedRoute requiredRole={['Supplier Admin', 'System Admin']}>
                          <SupplierCustomersPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/supplier/contracts" element={
                        <ProtectedRoute requiredRole={['Supplier Admin', 'System Admin']}>
                          <SupplierContractsPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/supplier/orders" element={
                        <ProtectedRoute requiredRole={['Supplier Admin', 'System Admin']}>
                          <SupplierOrdersPage />
                        </ProtectedRoute>
                      } />
                      {/* 2026-08-27: 공급업체 전용 발주서 인쇄본. 이전에는 수신함 Print 버튼이
                          구매자 경로(`/pos/purchase-orders/:id/print?as=seller`)를 열었는데,
                          공급업체에게 허용된 경로는 `/pos/supplier/*` 뿐이라(AuthContext ROLE_ROUTES)
                          **눌러도 목록으로 튕겼다.** 서버(seller-orders)는 원래 열려 있었다 —
                          프론트 경로만 질서 밖에 있던 것. 예외를 없애 네임스페이스 안으로 편입한다.
                          판매자 모드는 **경로로 강제**한다(쿼리 파라미터에 맡기면 파라미터가 빠졌을 때
                          구매자 엔드포인트를 때려 403 화면이 된다). Supplier Staff 는 서버
                          SELLER_ROLES 에 없어 403 이므로 제외 — 프론트가 서버보다 넓으면 안 된다. */}
                      <Route path="/pos/supplier/orders/:id/print" element={
                        <ProtectedRoute requiredRole={['Supplier Admin', 'System Admin']}>
                          <PurchaseOrderPrintPage forceSellerView />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/supplier/trade-invoices" element={
                        <ProtectedRoute requiredRole={['Supplier Admin', 'System Admin']}>
                          <SupplierTradeInvoicesPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/foodcourt/general/products" element={
                        <ProtectedRoute requiredRole={['Foodcourt General', 'Foodcourt Manager', 'System Admin']}>
                          <FoodcourtProductsPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/foodcourt/general/inventory" element={
                        <ProtectedRoute requiredRole={['Foodcourt General', 'Foodcourt Manager', 'System Admin']}>
                          <FoodcourtInventoryPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/admin/supplier-companies" element={
                        <ProtectedRoute requiredRole={['System Admin']}>
                          <SupplierCompaniesPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/admin/supplier-invitations" element={
                        <ProtectedRoute requiredRole={['System Admin']}>
                          <SupplierInvitationsPage />
                        </ProtectedRoute>
                      } />

                      {/* Sprint 2 — Supply Chain Design 2 (Buyer-side Supplier Directory + Contracts) */}
                      <Route path="/pos/suppliers/directory" element={
                        <ProtectedRoute requiredRole={['Restaurant Admin','Restaurant Owner','Staff','Brand General','Brand Manager','Foodcourt General','Foodcourt Manager','System Admin']}>
                          <SupplierDirectoryPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/suppliers/directory/:supplierId" element={
                        <ProtectedRoute requiredRole={['Restaurant Admin','Restaurant Owner','Staff','Brand General','Brand Manager','Foodcourt General','Foodcourt Manager','System Admin']}>
                          <SupplierProfilePage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/suppliers/contracts" element={
                        <Navigate to="/pos/suppliers?tab=contracts" replace />
                      } />
                      <Route path="/pos/suppliers/contracts/:contractId" element={
                        <ProtectedRoute requiredRole={['Restaurant Admin','Restaurant Owner','Staff','Brand General','Brand Manager','Foodcourt General','Foodcourt Manager','System Admin']}>
                          <MySuppliersPage />
                        </ProtectedRoute>
                      } />

                      {/* 재고 장부 정렬 + 일괄 링크 (docs/STOCK_LEDGER_UNIFICATION_DESIGN.md)
                          가드는 두 겹이다 — 여기 requiredRole + AuthContext ROLE_ROUTES.
                          한쪽만 고치면 여전히 튕긴다 (reference_frontend_route_guard_two_layers). */}
                      <Route path="/pos/stock-ledger" element={
                        <ProtectedRoute requiredRole={['Brand General','Restaurant Admin','System Admin']}>
                          <StockLedgerLinkPage />
                        </ProtectedRoute>
                      } />

                      {/* Sprint 3 — Purchase Orders */}
                      <Route path="/pos/purchase-orders" element={
                        <ProtectedRoute requiredRole={['Restaurant Admin','Restaurant Owner','Brand General','Brand Manager','Foodcourt General','Foodcourt Manager','System Admin']}>
                          <NewPurchaseOrderPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/purchase-orders/history" element={
                        <ProtectedRoute requiredRole={['Restaurant Admin','Restaurant Owner','Staff','Brand General','Brand Manager','Foodcourt General','Foodcourt Manager','System Admin']}>
                          <PurchaseOrdersPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/purchase-orders/staging" element={
                        <ProtectedRoute requiredRole={['Restaurant Admin','Restaurant Owner','Brand General','Brand Manager','Foodcourt General','Foodcourt Manager','System Admin']}>
                          <PurchaseOrderStagingPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/purchase-orders/new" element={
                        <ProtectedRoute requiredRole={['Restaurant Admin','Restaurant Owner','Brand General','Brand Manager','Foodcourt General','Foodcourt Manager','System Admin']}>
                          <NewPurchaseOrderPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/purchase-orders/:id" element={
                        <ProtectedRoute requiredRole={['Restaurant Admin','Restaurant Owner','Staff','Brand General','Brand Manager','Foodcourt General','Foodcourt Manager','System Admin']}>
                          <PurchaseOrderDetailPage />
                        </ProtectedRoute>
                      } />
                      {/* 구매자쪽 인쇄본. 공급업체는 여기 오지 않는다 — 공급업체 화면은 전부
                          `/pos/supplier/*` 네임스페이스에 살고 ROLE_ROUTES 가 그 질서를 강제한다.
                          공급업체 전용 인쇄 경로는 아래 `/pos/supplier/orders/:id/print`. */}
                      <Route path="/pos/purchase-orders/:id/print" element={
                        <ProtectedRoute requiredRole={['Restaurant Admin','Restaurant Owner','Staff','Brand General','Brand Manager','Foodcourt General','Foodcourt Manager','System Admin']}>
                          <PurchaseOrderPrintPage />
                        </ProtectedRoute>
                      } />

                      {/* Sprint 4 — Seller-side Incoming Orders + Buyer-side Purchase Invoices */}
                      {/* SOA merged into Trade Invoices (memory: Invoice + SOA unified). Legacy URL redirects. */}
                      <Route path="/pos/supplier/soa" element={<Navigate to="/pos/supplier/trade-invoices" replace />} />
                      {/* B2 — Supplier Staff (Advanced module supplier_admin_staff) */}
                      <Route path="/pos/supplier/staff" element={
                        <ProtectedRoute requiredRole={['Supplier Admin','System Admin']}>
                          <SupplierStaffPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/brand/general/incoming-orders" element={
                        <ProtectedRoute requiredRole={['Brand General','Brand Manager','System Admin']}>
                          <BrandIncomingOrdersPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/foodcourt/general/incoming-orders" element={
                        <ProtectedRoute requiredRole={['Foodcourt General','Foodcourt Manager','System Admin']}>
                          <FoodcourtIncomingOrdersPage />
                        </ProtectedRoute>
                      } />
                      {/* /pos/purchase-invoices removed — superseded by per-role invoice pages (memory: Invoice + SOA unified) */}

                      </Route>{/* End PosLayout */}
                    </Routes>
                    </Suspense>
                       </OfflineProvider>
                      </PwaInstallProvider>
                      </PaymentStatusProvider>
                    </MenuProvider>
                  </StaffProvider>
                </StoreProvider>
                </AuthProvider>
              </Router>
            </OrderProvider>
          </CustomerProvider>
      </SiteSettingsProvider>
    </ThemeProvider>
  );
}

export default App;
