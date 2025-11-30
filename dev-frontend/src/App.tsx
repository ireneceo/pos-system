import React from 'react';
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

// Landing Pages
import HomePage from './pages/Landing/HomePage';
import AboutPage from './pages/Landing/AboutPage';
import ServicePage from './pages/Landing/ServicePage';

// Pages
import LoginPage from './pages/Login/LoginPage';
import LiveOrdersPage from './pages/LiveOrders/LiveOrdersPage';
import POSTerminalPage from './pages/POSTerminal/POSTerminalPage';
import KitchenDisplayPage from './pages/KitchenDisplay/KitchenDisplayPage';
import CustomerDisplayPage from './pages/CustomerDisplay/CustomerDisplayPage';
import PromotionsPage from './pages/Promotions/PromotionsPage';
import ReportsPage from './pages/Reports/ReportsPage';
import SettingsPage from './pages/Settings/SettingsPage';
import MenuManagementPage from './pages/MenuManagement/MenuManagementPage';
import CategoryManagementPage from './pages/CategoryManagement/CategoryManagementPage';
import OptionManagementPage from './pages/OptionManagement/OptionManagementPage';
import CustomersPage from './pages/Customers/CustomersPage';
import StaffPage from './pages/Staff/StaffPage';
import ProfilePage from './pages/Profile/ProfilePage';
import SalesPage from './pages/Sales/SalesPage';
import MobileApp from './mobile/MobileApp';
import CompanyInformationPage from './pages/CompanyInformation/CompanyInformationPage';
import ActivityHistoryPage from './pages/ActivityHistory/ActivityHistoryPage';

// Role-specific pages
import AdminDashboard from './pages/Admin/AdminDashboard';
import ManagersPage from './pages/Admin/ManagersPage';
import RestaurantsPage from './pages/Admin/RestaurantsPage';
import SubscriptionsPage from './pages/Admin/SubscriptionsPage';
import InvoicesPage from './pages/Admin/InvoicesPage';
import RestaurantInvoicesPage from './pages/Restaurant/InvoicesPage';
import ManagerInvoicesPage from './pages/Manager/InvoicesPage';
import PlansPage from './pages/Admin/PlansPage';
import AnalyticsPage from './pages/Admin/AnalyticsPage';
import SystemInquiryPage from './pages/Admin/SystemInquiryPage';
import ManagerSupportTicketsPage from './pages/Manager/SupportTicketsPage';
import RestaurantSupportTicketsPage from './pages/Restaurant/SupportTicketsPage';
import OperationInquiryPage from './pages/Manager/OperationInquiryPage';
import RestaurantOperationInquiryPage from './pages/Restaurant/OperationInquiryPage';
import SystemConfigPage from './pages/Admin/SystemConfigPage';
import SecurityPage from './pages/Admin/SecurityPage';
import BackupRestorePage from './pages/Admin/BackupRestorePage';
import SystemLogsPage from './pages/Admin/SystemLogsPage';
import RestaurantSubscriptionsPage from './pages/Admin/RestaurantSubscriptionsPage';
import ManagerDashboard from './pages/Manager/ManagerDashboard';
import ManagerSubscriptionsPage from './pages/Manager/SubscriptionsPage';
import ManagerRestaurantsPage from './pages/Manager/RestaurantsPage';
import ManagerStaffManagementPage from './pages/Manager/StaffManagementPage';
import AdminStaffManagementPage from './pages/Admin/StaffManagementPage';
import ManagerSalesPage from './pages/Manager/SalesPage';
import ManagerReportsPage from './pages/Manager/ManagerReportsPage';
import ManagerCustomersPage from './pages/Manager/ManagerCustomersPage';
import ManagerPromotionsPage from './pages/Manager/ManagerPromotionsPage';
import ManagerPlansPage from './pages/Manager/PlansPage';
import AdminSettingsPage from './pages/Admin/AdminSettingsPage';
import SiteSettingsPage from './pages/Admin/SiteSettingsPage';
import RestaurantDashboard from './pages/Restaurant/RestaurantDashboard';
import BasicDashboard from './pages/Basic/BasicDashboard';
import NotificationSettingsPage from './pages/NotificationSettings/NotificationSettingsPage';

// New Manager Role Dashboards
import FoodcourtGeneralDashboard from './pages/FoodcourtGeneral/FoodcourtGeneralDashboard';
import BrandGeneralDashboard from './pages/BrandGeneral/BrandGeneralDashboard';
import FoodcourtManagerDashboard from './pages/Foodcourt/FoodcourtManagerDashboard';
import BrandManagerDashboard from './pages/Brand/BrandManagerDashboard';

// Recipe Management
import RecipeManagementPage from './pages/RecipeManagement/RecipeManagementPage';
import RecipesPage from './pages/Recipes/RecipesPage';
import IngredientsPage from './pages/Ingredients/IngredientsPage';

// New Manager Role Specific Pages
import FoodcourtManagement from './pages/FoodcourtGeneral/FoodcourtManagement';
import FoodcourtStats from './pages/FoodcourtGeneral/FoodcourtStats';
import BrandManagement from './pages/BrandGeneral/BrandManagement';
import BrandPerformance from './pages/BrandGeneral/BrandPerformance';
import RentManagement from './pages/Foodcourt/RentManagement';
import TenantSupport from './pages/Foodcourt/TenantSupport';
import FranchiseSupport from './pages/Brand/FranchiseSupport';
import BrandReports from './pages/Brand/BrandReports';

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
                      <Routes>
                      {/* Landing Pages (Public) */}
                      <Route path="/" element={<HomePage />} />
                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/service" element={<ServicePage />} />

                      {/* POS Login */}
                      <Route path="/pos" element={<LoginPage />} />

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
                      <Route path="/pos/admin/settings" element={
                        <ProtectedRoute requiredRole={['System Admin']}>
                          <AdminSettingsPage />
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

                      {/* Recipe Management for Brand General */}
                      <Route path="/pos/recipes" element={
                        <ProtectedRoute requiredRole={['Brand General', 'System Admin']}>
                          <RecipeManagementPage />
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
                      <Route path="/pos/manager/promotions" element={
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
                      <Route path="/restaurant/:restaurantId/promotions" element={
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
                    </Routes>
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
