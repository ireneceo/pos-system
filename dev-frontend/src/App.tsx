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
// Login Page (keep static - frequently used, first contact)
import LoginPage from './pages/Login/LoginPage';

// Landing Pages — lazy (logged-in users never hit these; visitors see "Loading…" once)
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
const SystemConfigPage = React.lazy(() => import('./pages/Admin/SystemConfigPage'));
const SystemProductManagementPage = React.lazy(() => import('./pages/Admin/SystemProductManagementPage'));
const HardwareQuotesPage = React.lazy(() => import('./pages/Admin/HardwareQuotesPage'));
const SecurityPage = React.lazy(() => import('./pages/Admin/SecurityPage'));
const BackupRestorePage = React.lazy(() => import('./pages/Admin/BackupRestorePage'));
const SystemLogsPage = React.lazy(() => import('./pages/Admin/SystemLogsPage'));
const ContentManagementPage = React.lazy(() => import('./pages/Admin/ContentManagementPage'));
const RestaurantSubscriptionsPage = React.lazy(() => import('./pages/Admin/RestaurantSubscriptionsPage'));
const ManagerDashboard = React.lazy(() => import('./pages/Manager/ManagerDashboard'));
const ManagerSubscriptionsPage = React.lazy(() => import('./pages/Manager/SubscriptionsPage'));
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
const RecipeManagementPage = React.lazy(() => import('./pages/RecipeManagement/RecipeManagementPage'));
const RestaurantIngredientsPage = React.lazy(() => import('./pages/RecipeManagement/IngredientsPage'));
const RecipesPage = React.lazy(() => import('./pages/Recipes/RecipesPage'));
const IngredientsPage = React.lazy(() => import('./pages/Ingredients/IngredientsPage'));
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
const FoodcourtManagement = React.lazy(() => import('./pages/FoodcourtGeneral/FoodcourtManagement'));
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
const TenantSupport = React.lazy(() => import('./pages/Foodcourt/TenantSupport'));
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
    const loadSiteSettings = async () => {
      try {
        const response = await fetch('/api/site-settings');
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
        console.error('Failed to load site settings:', error);
      }
    };

    loadSiteSettings();
  }, []);

  return (
    <ThemeProvider>
      <SiteSettingsProvider>
          <CustomerProvider>
            <OrderProvider>
              <Router>
                <AuthProvider>
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
                        <CookieConsentBanner />
                        <NotificationToaster />
                        <PwaInstallBanner />
                        <OfflineBanner />
                        <OfflineLockOverlay />
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
                      <Route path="/pos/admin/support" element={
                        <ProtectedRoute requiredRole={['System Admin']}>
                          <SystemInquiryPage />
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
                      <Route path="/pos/admin/system-config" element={
                        <ProtectedRoute requiredRole={['System Admin']}>
                          <SystemConfigPage />
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
                      <Route path="/pos/admin/security" element={
                        <ProtectedRoute requiredRole={['System Admin']}>
                          <SecurityPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/admin/backup" element={
                        <ProtectedRoute requiredRole={['System Admin']}>
                          <BackupRestorePage />
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
                      <Route path="/pos/foodcourt/general/management" element={
                        <ProtectedRoute requiredRole={['Foodcourt General', 'Foodcourt Manager']}>
                          <FoodcourtManagement />
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
                      <Route path="/pos/brand/payment-settings" element={
                        <ProtectedRoute requiredRole={['Brand General', 'Brand Manager']}>
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

                      {/* Recipe & Ingredient Management Pages */}
                      <Route path="/pos/recipe-management/recipes" element={
                        <ProtectedRoute requiredRole={['Brand General', 'Brand Manager', 'System Admin']}>
                          <RecipesPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/recipe-management/ingredients" element={
                        <ProtectedRoute requiredRole={['Brand General', 'Brand Manager', 'System Admin']}>
                          <IngredientsPage />
                        </ProtectedRoute>
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
                        <ProtectedRoute requiredRole={['Foodcourt Manager']}>
                          <RentManagement />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/foodcourt/tenant-support" element={
                        <ProtectedRoute requiredRole={['Foodcourt Manager']}>
                          <TenantSupport />
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
