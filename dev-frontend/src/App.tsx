import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { OrderProvider } from './contexts/OrderContext';
import { StoreProvider } from './contexts/StoreContext';
import { MenuProvider } from './contexts/MenuContext';
import { CustomerProvider } from './contexts/CustomerContext';
import { StaffProvider } from './contexts/StaffContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { PaymentStatusProvider } from './contexts/PaymentStatusContext';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
// Landing Pages (keep static - first load)
import HomePage from './pages/Landing/HomePage';
import AboutPage from './pages/Landing/AboutPage';
import FeaturesPage from './pages/Landing/FeaturesPage';
import ServicePage from './pages/Landing/ServicePage';
import PricingPage from './pages/Landing/PricingPage';
import ContactPage from './pages/Landing/ContactPage';
import DemoPage from './pages/Landing/DemoPage';
import CompanyPage from './pages/Landing/CompanyPage';
import PrivacyPolicyPage from './pages/Landing/PrivacyPolicyPage';
import TermsOfServicePage from './pages/Landing/TermsOfServicePage';
import FAQPage from './pages/Landing/FAQPage';
import BlogPage from './pages/Landing/BlogPage';
import BlogPostPage from './pages/Landing/BlogPostPage';
// Login Page (keep static - frequently used)
import LoginPage from './pages/Login/LoginPage';
// Mobile App (keep static - separate entry point)
import MobileApp from './mobile/MobileApp';

// Loading Component
const PageLoader = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '16px',
    color: '#6B7280'
  }}>
    Loading...
  </div>
);

// Lazy load all other pages
const LiveOrdersPage = React.lazy(() => import('./pages/LiveOrders/LiveOrdersPage'));
const POSTerminalPage = React.lazy(() => import('./pages/POSTerminal/POSTerminalPage'));
const KitchenDisplayPage = React.lazy(() => import('./pages/KitchenDisplay/KitchenDisplayPage'));
const CustomerDisplayPage = React.lazy(() => import('./pages/CustomerDisplay/CustomerDisplayPage'));
const PromotionsPage = React.lazy(() => import('./pages/Promotions/PromotionsPage'));
const ReportsPage = React.lazy(() => import('./pages/Reports/ReportsPage'));
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

// Admin pages
const AdminDashboard = React.lazy(() => import('./pages/Admin/AdminDashboard'));
const ManagersPage = React.lazy(() => import('./pages/Admin/ManagersPage'));
const RestaurantsPage = React.lazy(() => import('./pages/Admin/RestaurantsPage'));
const SubscriptionsPage = React.lazy(() => import('./pages/Admin/SubscriptionsPage'));
const InvoicesPage = React.lazy(() => import('./pages/Admin/InvoicesPage'));
const RestaurantInvoicesPage = React.lazy(() => import('./pages/Restaurant/InvoicesPage'));
const ManagerInvoicesPage = React.lazy(() => import('./pages/Manager/InvoicesPage'));
const PlansPage = React.lazy(() => import('./pages/Admin/PlansPage'));
const AnalyticsPage = React.lazy(() => import('./pages/Admin/AnalyticsPage'));
const SystemInquiryPage = React.lazy(() => import('./pages/Admin/SystemInquiryPage'));
const ContactInquiriesPage = React.lazy(() => import('./pages/Admin/ContactInquiriesPage'));
const ManagerSupportTicketsPage = React.lazy(() => import('./pages/Manager/SupportTicketsPage'));
const RestaurantSupportTicketsPage = React.lazy(() => import('./pages/Restaurant/SupportTicketsPage'));
const OperationInquiryPage = React.lazy(() => import('./pages/Manager/OperationInquiryPage'));
const RestaurantOperationInquiryPage = React.lazy(() => import('./pages/Restaurant/OperationInquiryPage'));
const SystemConfigPage = React.lazy(() => import('./pages/Admin/SystemConfigPage'));
const SecurityPage = React.lazy(() => import('./pages/Admin/SecurityPage'));
const BackupRestorePage = React.lazy(() => import('./pages/Admin/BackupRestorePage'));
const SystemLogsPage = React.lazy(() => import('./pages/Admin/SystemLogsPage'));
const ContentManagementPage = React.lazy(() => import('./pages/Admin/ContentManagementPage'));
const RestaurantSubscriptionsPage = React.lazy(() => import('./pages/Admin/RestaurantSubscriptionsPage'));
const ManagerDashboard = React.lazy(() => import('./pages/Manager/ManagerDashboard'));
const ManagerSubscriptionsPage = React.lazy(() => import('./pages/Manager/SubscriptionsPage'));
const ManagerRestaurantsPage = React.lazy(() => import('./pages/Manager/RestaurantsPage'));
const ManagerStaffManagementPage = React.lazy(() => import('./pages/Manager/StaffManagementPage'));
const AdminStaffManagementPage = React.lazy(() => import('./pages/Admin/StaffManagementPage'));
const ManagerSalesPage = React.lazy(() => import('./pages/Manager/SalesPage'));
const ManagerReportsPage = React.lazy(() => import('./pages/Manager/ManagerReportsPage'));
const ManagerCustomersPage = React.lazy(() => import('./pages/Manager/ManagerCustomersPage'));
const ManagerPromotionsPage = React.lazy(() => import('./pages/Manager/ManagerPromotionsPage'));
const ManagerPlansPage = React.lazy(() => import('./pages/Manager/PlansPage'));
const AdminSettingsPage = React.lazy(() => import('./pages/Admin/AdminSettingsPage'));
const AdminPaymentSettingsPage = React.lazy(() => import('./pages/Admin/PaymentSettingsPage'));
const SiteSettingsPage = React.lazy(() => import('./pages/Admin/SiteSettingsPage'));
const RestaurantDashboard = React.lazy(() => import('./pages/Restaurant/RestaurantDashboard'));
const BasicDashboard = React.lazy(() => import('./pages/Basic/BasicDashboard'));
const NotificationSettingsPage = React.lazy(() => import('./pages/NotificationSettings/NotificationSettingsPage'));

// Manager Role Dashboards
const FoodcourtGeneralDashboard = React.lazy(() => import('./pages/FoodcourtGeneral/FoodcourtGeneralDashboard'));
const BrandGeneralDashboard = React.lazy(() => import('./pages/BrandGeneral/BrandGeneralDashboard'));
const FoodcourtManagerDashboard = React.lazy(() => import('./pages/Foodcourt/FoodcourtManagerDashboard'));
const BrandManagerDashboard = React.lazy(() => import('./pages/Brand/BrandManagerDashboard'));

// Recipe Management
const RecipeManagementPage = React.lazy(() => import('./pages/RecipeManagement/RecipeManagementPage'));
const RecipesPage = React.lazy(() => import('./pages/Recipes/RecipesPage'));
const IngredientsPage = React.lazy(() => import('./pages/Ingredients/IngredientsPage'));
const SuppliersPage = React.lazy(() => import('./pages/Suppliers/SuppliersPage'));

// Inventory Management
const InventoryPage = React.lazy(() => import('./pages/Inventory/InventoryPage'));
const StockTakePage = React.lazy(() => import('./pages/Inventory/StockTakePage'));
const BrandInventoryPage = React.lazy(() => import('./pages/BrandInventory/BrandInventoryPage'));
const ProductRecipePage = React.lazy(() => import('./pages/ProductRecipe/ProductRecipePage'));
const BrandProductRecipePage = React.lazy(() => import('./pages/BrandProductRecipe/BrandProductRecipePage'));

// Brand Product Management
const BrandProductManagementPage = React.lazy(() => import('./pages/BrandProductManagement/BrandProductManagementPage'));

// Manager Role Specific Pages
const FoodcourtManagement = React.lazy(() => import('./pages/FoodcourtGeneral/FoodcourtManagement'));
const FoodcourtStats = React.lazy(() => import('./pages/FoodcourtGeneral/FoodcourtStats'));
const FoodcourtSubscriptionsPage = React.lazy(() => import('./pages/FoodcourtGeneral/FoodcourtSubscriptionsPage'));
const FoodcourtInvoicesPage = React.lazy(() => import('./pages/FoodcourtGeneral/FoodcourtInvoicesPage'));
const FoodcourtPlansPage = React.lazy(() => import('./pages/FoodcourtGeneral/FoodcourtPlansPage'));
const FoodcourtPaymentSettingsPage = React.lazy(() => import('./pages/FoodcourtGeneral/FoodcourtPaymentSettingsPage'));
const BrandManagement = React.lazy(() => import('./pages/BrandGeneral/BrandManagement'));
const BrandPerformance = React.lazy(() => import('./pages/BrandGeneral/BrandPerformance'));
const BrandReportsPage = React.lazy(() => import('./pages/BrandGeneral/BrandReportsPage'));
const BrandSubscriptionsPage = React.lazy(() => import('./pages/BrandGeneral/BrandSubscriptionsPage'));
const BrandInvoicesPage = React.lazy(() => import('./pages/BrandGeneral/BrandInvoicesPage'));
const BrandPlansPage = React.lazy(() => import('./pages/BrandGeneral/BrandPlansPage'));
const BrandPaymentSettingsPage = React.lazy(() => import('./pages/BrandGeneral/BrandPaymentSettingsPage'));
const RentManagement = React.lazy(() => import('./pages/Foodcourt/RentManagement'));
const TenantSupport = React.lazy(() => import('./pages/Foodcourt/TenantSupport'));
const FranchiseSupport = React.lazy(() => import('./pages/Brand/FranchiseSupport'));
const BrandReports = React.lazy(() => import('./pages/Brand/BrandReports'));

// Brand General Inquiry Pages
const BrandSystemInquiryPage = React.lazy(() => import('./pages/Brand/SystemInquiryPage'));
const BrandOperationInquiryPage = React.lazy(() => import('./pages/Brand/OperationInquiryPage'));

// Foodcourt General Inquiry Pages
const FoodcourtSystemInquiryPage = React.lazy(() => import('./pages/Foodcourt/SystemInquiryPage'));
const FoodcourtOperationInquiryPage = React.lazy(() => import('./pages/Foodcourt/OperationInquiryPage'));

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
      return <Navigate to="/pos/foodcourt/dashboard" replace />;
    case 'Brand Manager':
      return <Navigate to="/pos/brand/dashboard" replace />;
    case 'Restaurant Admin':
    case 'Staff': {
      // For Restaurant Admin and Staff, include restaurantId in URL
      const restaurantId = user?.restaurantId || '1';
      const targetRoute = user?.role === 'Restaurant Admin'
        ? `/restaurant/${restaurantId}/dashboard`
        : `/restaurant/${restaurantId}/basic`;
      return <Navigate to={targetRoute} replace />;
    }
    default: {
      const restaurantId = user?.restaurantId || '1';
      return <Navigate to={`/restaurant/${restaurantId}/basic`} replace />;
    }
  }
};

// Legacy /pos/restaurant/* routes redirect to new /restaurant/:restaurantId/* structure
const LegacyRestaurantRedirect: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  // Extract the path after /pos/restaurant/
  const pathAfterRestaurant = location.pathname.replace('/pos/restaurant/', '');
  const restaurantId = user?.restaurantId || '1';

  // Redirect to new structure
  return <Navigate to={`/restaurant/${restaurantId}/${pathAfterRestaurant}`} replace />;
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

          // Update favicon
          if (settings.favicon_url) {
            const favicon = document.getElementById('favicon') as HTMLLinkElement;
            if (favicon) {
              favicon.href = settings.favicon_url;
            }
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
      <StoreProvider>
        <CustomerProvider>
          <OrderProvider>
            <Router>
              <AuthProvider>
                <StaffProvider>
                  <MenuProvider>
                    <PaymentStatusProvider>
                      <ScrollToTop />
                      <Suspense fallback={<PageLoader />}>
                      <Routes>
                      {/* Landing Pages (Public) */}
                      <Route path="/" element={<HomePage />} />
                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/features" element={<FeaturesPage />} />
                      <Route path="/service" element={<ServicePage />} />
                      <Route path="/pricing" element={<PricingPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/demo" element={<DemoPage />} />
                      <Route path="/company" element={<CompanyPage />} />
                      <Route path="/privacy" element={<PrivacyPolicyPage />} />
                      <Route path="/terms" element={<TermsOfServicePage />} />
                      <Route path="/faq" element={<FAQPage />} />
                      <Route path="/blog" element={<BlogPage />} />
                      <Route path="/blog/:slug" element={<BlogPostPage />} />

                      {/* POS Login */}
                      <Route path="/pos" element={<LoginPage />} />
                      <Route path="/login" element={<LoginPage />} />

                      {/* Mobile Routes (QR Order - Outside POS) */}
                      <Route path="/mobile/*" element={<MobileApp />} />

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
                          <AnalyticsPage />
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
                      <Route path="/pos/admin/system-config" element={
                        <ProtectedRoute requiredRole={['System Admin']}>
                          <SystemConfigPage />
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

                      {/* Foodcourt General Routes */}
                      <Route path="/pos/foodcourt/general/dashboard" element={
                        <ProtectedRoute requiredRole={['Foodcourt General']}>
                          <FoodcourtGeneralDashboard />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/foodcourt/general/management" element={
                        <ProtectedRoute requiredRole={['Foodcourt General']}>
                          <FoodcourtManagement />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/foodcourt/general/stats" element={
                        <ProtectedRoute requiredRole={['Foodcourt General']}>
                          <FoodcourtStats />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/foodcourt/general/subscriptions" element={
                        <ProtectedRoute requiredRole={['Foodcourt General']}>
                          <FoodcourtSubscriptionsPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/foodcourt/general/system-inquiry" element={
                        <ProtectedRoute requiredRole={['Foodcourt General']}>
                          <FoodcourtSystemInquiryPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/foodcourt/general/operation-inquiry" element={
                        <ProtectedRoute requiredRole={['Foodcourt General']}>
                          <FoodcourtOperationInquiryPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/foodcourt/invoices" element={
                        <ProtectedRoute requiredRole={['Foodcourt General', 'Foodcourt Manager']}>
                          <FoodcourtInvoicesPage />
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

                      {/* Brand General Routes */}
                      <Route path="/pos/brand/general/dashboard" element={
                        <ProtectedRoute requiredRole={['Brand General']}>
                          <BrandGeneralDashboard />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/brand/general/management" element={
                        <ProtectedRoute requiredRole={['Brand General']}>
                          <BrandManagement />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/brand/general/performance" element={
                        <ProtectedRoute requiredRole={['Brand General']}>
                          <BrandPerformance />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/brand/general/reports" element={
                        <ProtectedRoute requiredRole={['Brand General']}>
                          <BrandReportsPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/brand/general/subscriptions" element={
                        <ProtectedRoute requiredRole={['Brand General']}>
                          <BrandSubscriptionsPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/brand/general/system-inquiry" element={
                        <ProtectedRoute requiredRole={['Brand General']}>
                          <BrandSystemInquiryPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/brand/general/operation-inquiry" element={
                        <ProtectedRoute requiredRole={['Brand General']}>
                          <BrandOperationInquiryPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/brand/invoices" element={
                        <ProtectedRoute requiredRole={['Brand General', 'Brand Manager']}>
                          <BrandInvoicesPage />
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
                        <ProtectedRoute requiredRole={['Brand General', 'Brand Manager', 'System Admin']}>
                          <SuppliersPage />
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
                      <Route path="/pos/brand/franchise-support" element={
                        <ProtectedRoute requiredRole={['Brand Manager']}>
                          <FranchiseSupport />
                        </ProtectedRoute>
                      } />
                      <Route path="/pos/brand/reports" element={
                        <ProtectedRoute requiredRole={['Brand Manager']}>
                          <BrandReports />
                        </ProtectedRoute>
                      } />

                      {/* Manager Routes - 모든 매니저 역할이 접근 가능 */}
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
                      <Route path="/pos/manager/staff" element={
                        <ProtectedRoute requiredRole={['Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager']}>
                          <ManagerStaffManagementPage />
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
                      <Route path="/pos/manager/customers" element={
                        <ProtectedRoute requiredRole={['Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager']}>
                          <ManagerCustomersPage />
                        </ProtectedRoute>
                      } />
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

                      {/* Legacy /pos/restaurant/* routes - redirect to new /restaurant/:restaurantId/* structure */}
                      <Route path="/pos/restaurant/*" element={<LegacyRestaurantRedirect />} />

                      {/* Restaurant Admin Routes - NEW STRUCTURE with restaurantId in URL */}
                      <Route path="/restaurant/:restaurantId/dashboard" element={
                        <ProtectedRoute requireRestaurantMatch={true} requiredRole={['Restaurant Admin', 'Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager']}>
                          <RestaurantDashboard />
                        </ProtectedRoute>
                      } />
                      <Route path="/restaurant/:restaurantId/live-orders" element={
                        <ProtectedRoute requireRestaurantMatch={true} requiredRole={['Restaurant Admin', 'Staff']}>
                          <LiveOrdersPage />
                        </ProtectedRoute>
                      } />
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
                      <Route path="/restaurant/:restaurantId/menu" element={
                        <ProtectedRoute requireRestaurantMatch={true} requiredRole={['System Admin', 'Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager', 'Restaurant Admin']}>
                          <MenuManagementPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/restaurant/:restaurantId/categories" element={
                        <ProtectedRoute requireRestaurantMatch={true} requiredRole={['System Admin', 'Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager', 'Restaurant Admin']}>
                          <CategoryManagementPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/restaurant/:restaurantId/options" element={
                        <ProtectedRoute requireRestaurantMatch={true} requiredRole={['System Admin', 'Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager', 'Restaurant Admin']}>
                          <OptionManagementPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/restaurant/:restaurantId/recipe-management" element={
                        <ProtectedRoute requireRestaurantMatch={true} requiredRole={['System Admin', 'Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager', 'Restaurant Admin']}>
                          <RecipeManagementPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/restaurant/:restaurantId/suppliers" element={
                        <ProtectedRoute requireRestaurantMatch={true} requiredRole={['System Admin', 'Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager', 'Restaurant Admin']}>
                          <SuppliersPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/restaurant/:restaurantId/customers" element={
                        <ProtectedRoute requireRestaurantMatch={true} requiredRole={['System Admin', 'Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager', 'Restaurant Admin']}>
                          <CustomersPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/restaurant/:restaurantId/staff" element={
                        <ProtectedRoute requireRestaurantMatch={true} requiredRole={['System Admin', 'Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager', 'Restaurant Admin']}>
                          <StaffPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/restaurant/:restaurantId/sales" element={
                        <ProtectedRoute requireRestaurantMatch={true} requiredRole={['System Admin', 'Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager', 'Restaurant Admin']}>
                          <SalesPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/restaurant/:restaurantId/coupons" element={
                        <ProtectedRoute requireRestaurantMatch={true} requiredRole={['System Admin', 'Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager', 'Restaurant Admin']}>
                          <PromotionsPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/restaurant/:restaurantId/reports" element={
                        <ProtectedRoute requireRestaurantMatch={true} requiredRole={['System Admin', 'Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager', 'Restaurant Admin']}>
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
                      <Route path="/restaurant/:restaurantId/settings" element={
                        <ProtectedRoute requireRestaurantMatch={true} requiredRole={['System Admin', 'Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager', 'Restaurant Admin']}>
                          <SettingsPage />
                        </ProtectedRoute>
                      } />

                      {/* Legacy POS Routes - Redirect to new structure */}
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
                        <ProtectedRoute requireRestaurantMatch={true} requiredRole={['Restaurant Admin']}>
                          <RestaurantInvoicesPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/restaurant/:restaurantId/history" element={
                        <ProtectedRoute requireRestaurantMatch={true} requiredRole={['Restaurant Admin']}>
                          <ActivityHistoryPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/restaurant/:restaurantId/notification-settings" element={
                        <ProtectedRoute requireRestaurantMatch={true} requiredRole={['Restaurant Admin']}>
                          <NotificationSettingsPage />
                        </ProtectedRoute>
                      } />

                      {/* Inventory Management Routes */}
                      <Route path="/restaurant/:restaurantId/inventory" element={
                        <ProtectedRoute requireRestaurantMatch={true} requiredRole={['System Admin', 'Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager', 'Restaurant Admin']}>
                          <InventoryPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/restaurant/:restaurantId/stock-take" element={
                        <ProtectedRoute requireRestaurantMatch={true} requiredRole={['System Admin', 'Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager', 'Restaurant Admin']}>
                          <StockTakePage />
                        </ProtectedRoute>
                      } />
                      <Route path="/restaurants/:restaurantId/inventory" element={
                        <ProtectedRoute requireRestaurantMatch={true} requiredRole={['System Admin', 'Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager', 'Restaurant Admin']}>
                          <InventoryPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/restaurants/:restaurantId/stock-take" element={
                        <ProtectedRoute requireRestaurantMatch={true} requiredRole={['System Admin', 'Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager', 'Restaurant Admin']}>
                          <StockTakePage />
                        </ProtectedRoute>
                      } />

                      {/* Product Recipe Management */}
                      <Route path="/restaurant/:restaurantId/product-recipes" element={
                        <ProtectedRoute requireRestaurantMatch={true} requiredRole={['System Admin', 'Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager', 'Restaurant Admin']}>
                          <ProductRecipePage />
                        </ProtectedRoute>
                      } />
                    </Routes>
                    </Suspense>
                    </PaymentStatusProvider>
                  </MenuProvider>
                </StaffProvider>
              </AuthProvider>
            </Router>
          </OrderProvider>
        </CustomerProvider>
      </StoreProvider>
    </ThemeProvider>
  );
}

export default App;
