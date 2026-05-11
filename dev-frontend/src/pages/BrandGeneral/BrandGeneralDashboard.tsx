import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getRestaurantDisplayName } from '../../utils/restaurantDisplay';
import { DashboardStatsGrid, DashboardStatCard, DashboardStatLabel, DashboardStatValue } from '../../components/UI';
import { DataTable, DataTableHead, DataTableHeaderCell, DataTableRow, DataTableCell, DataTableEmpty } from '../../components/UI/DataTable';
import { SetupGuide, WelcomeModal } from '../../components/Common';
import { Walkthrough, TourTrigger, type TourStep } from '../../components/Walkthrough';
import { useBrandCurrency } from '../../hooks/useBrandCurrency';
import { useSetupStatus } from '../../hooks/useSetupStatus';
import { formatCurrency } from '../../utils/currency';
import { useAuth } from '../../contexts/AuthContext';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';
import { useRoleDisplayName } from '../../utils/roleDisplay';

import { getAuthToken } from '../../utils/auth';
// ============================================================================
// Styled Components — RestaurantDashboard 기준 통일
// ============================================================================

const Container = styled.div`
  min-height: 100vh;
`;

const Header = styled.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  margin-bottom: 0;
  height: 80px;
  min-height: 80px;
  max-height: 80px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 16px;
    height: auto;
    min-height: 56px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

const Content = styled.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Subtitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #6B7C93;
  margin-top: 4px;
`;

const SubscriptionBadge = styled.span<{ variant: 'trial' | 'active' | 'expiring' | 'expired' }>`
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  ${({ variant }) => {
    switch (variant) {
      case 'trial': return 'background: #FEF3C7; color: #92400E; border: 1px solid #FCD34D;';
      case 'active': return 'background: #ECFDF5; color: #065F46; border: 1px solid #A7F3D0;';
      case 'expiring': return 'background: #FFF7ED; color: #9A3412; border: 1px solid #FDBA74;';
      case 'expired': return 'background: #FEF2F2; color: #991B1B; border: 1px solid #FECACA;';
    }
  }}
  &:hover { opacity: 0.8; }
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 32px;
  align-items: stretch;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    align-items: stretch;
  }
`;

const ChartContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 28px;
  border: 1px solid #E6EBF1;

  @media (max-width: 768px) {
    padding: 20px;
  }

  h3 {
    margin: 0 0 24px 0;
    color: #0A2540;
    font-size: 18px;
    font-weight: 600;
  }
`;

const AlertsPanel = styled.div`
  background: white;
  border-radius: 16px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  display: flex;
  flex-direction: column;

  h3 {
    margin: 0 0 16px 0;
    color: #0A2540;
    font-size: 16px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }
`;

const AlertsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 4px; }
`;

const Alert = styled.div<{ type: 'warning' | 'error' | 'info' | 'success' }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s;
  background: ${props => {
    switch(props.type) {
      case 'error': return '#FEF2F2';
      case 'warning': return '#FFFBEB';
      case 'success': return '#ECFDF5';
      case 'info': return '#EFF6FF';
      default: return '#F8FAFC';
    }
  }};
  border: 1px solid ${props => {
    switch(props.type) {
      case 'error': return '#FECACA';
      case 'warning': return '#FDE68A';
      case 'success': return '#A7F3D0';
      case 'info': return '#BFDBFE';
      default: return '#E6EBF1';
    }
  }};
  flex-shrink: 0;

  &:hover { box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06); }
`;

const AlertContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const AlertTitle = styled.div<{ type: 'warning' | 'error' | 'info' | 'success' }>`
  font-size: 13px;
  font-weight: 600;
  color: ${props => {
    switch(props.type) {
      case 'error': return '#DC2626';
      case 'warning': return '#D97706';
      case 'success': return '#059669';
      case 'info': return '#2563EB';
      default: return '#374151';
    }
  }};
`;

const AlertDescription = styled.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`;

const QuickActionsSection = styled.div`
  margin-bottom: 32px;

  h3 {
    margin: 0 0 20px 0;
    color: #0A2540;
    font-size: 18px;
    font-weight: 600;
  }
`;

const QuickActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`;

const QuickActionCard = styled.div`
  padding: 24px;
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #F6F9FC;
    .icon { color: #0A2540; }
    .title { color: #0A2540; }
  }

  .icon {
    font-size: 32px;
    margin-bottom: 12px;
    color: #6B7C93;
    transition: color 0.2s;
    font-family: 'Lucida Console', 'Courier New', monospace;
  }

  .title {
    font-weight: 600;
    font-size: 16px;
    color: #0A2540;
    margin-bottom: 4px;
    transition: color 0.2s;
  }

  .description {
    font-size: 13px;
    color: #6B7280;
  }
`;

// Charts
const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 32px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ChartTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`;

// Table
const RecentOrdersSection = styled.div`
  background: white;
  border-radius: 16px;
  border: 1px solid #E6EBF1;
  overflow: hidden;

  h3 {
    padding: 20px 24px;
    margin: 0;
    color: #0A2540;
    font-size: 18px;
    font-weight: 600;
    border-bottom: 1px solid #F3F4F6;
  }

  @media (max-width: 1024px) {
    background: transparent;
    border: none;
    overflow: visible;
    border-radius: 0;

    h3 {
      padding: 8px 0 12px;
      border-bottom: none;
    }
  }
`;

const StatusBadge = styled.span<{ status: string }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  ${props => {
    switch (props.status) {
      case 'paid': return 'background: #D1FAE5; color: #065F46;';
      case 'pending_payment': return 'background: #FEF3C7; color: #92400E;';
      case 'overdue': return 'background: #FEE2E2; color: #991B1B;';
      case 'sent': return 'background: #DBEAFE; color: #1E40AF;';
      default: return 'background: #F3F4F6; color: #374151;';
    }
  }}
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: #6B7C93;
  font-size: 14px;
`;

const PIE_COLORS = ['#DC2626', '#EF4444', '#F87171', '#FCA5A5', '#FECACA', '#FEE2E2', '#FFF5F5'];

// Brand General walkthrough — 5 step over sidebar items + header trigger.
const bgTourSteps = (t: (k: string, fallback?: string) => string): TourStep[] => ([
  {
    selector: '[data-tour="sidebar-bg-company-info"]',
    title: t('walkthrough:bg.step1.title', 'Start with brand company info'),
    description: t('walkthrough:bg.step1.description', "Add your brand's business registration, tax ID and contact details."),
    position: 'right'
  },
  {
    selector: '[data-tour="sidebar-bg-restaurants"]',
    title: t('walkthrough:bg.step2.title', 'Link restaurants to your brand'),
    description: t('walkthrough:bg.step2.description', 'Each franchisee location must be connected to your brand to share recipes, ingredients and products.'),
    position: 'right'
  },
  {
    selector: '[data-tour="sidebar-bg-ingredients"]',
    title: t('walkthrough:bg.step3.title', 'Define brand ingredients'),
    description: t('walkthrough:bg.step3.description', 'Set up the master list of ingredients used across all your recipes.'),
    position: 'right'
  },
  {
    selector: '[data-tour="sidebar-bg-products"]',
    title: t('walkthrough:bg.step4.title', 'Add brand products'),
    description: t('walkthrough:bg.step4.description', 'Register the menu items your brand offers. Linked restaurants pull from this catalog automatically.'),
    position: 'right'
  },
  {
    selector: '[data-tour="header-tour-trigger"]',
    title: t('walkthrough:bg.step5.title', 'Replay anytime'),
    description: t('walkthrough:bg.step5.description', 'Use Show me around in the header to revisit this tour whenever you need.'),
    position: 'bottom'
  }
]);

// ============================================================================
// Franchise Operations section — contract pipeline + expiring + billing gaps + royalty forecast
// Mirrors Foodcourt Dashboard's Tenancy Operations for visual + mental-model consistency.
// ============================================================================
const FranchiseOpsSection = styled.div`
  background: white;
  padding: 24px 28px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  margin-bottom: 24px;
  border: 1px solid #E6EBF1;
`;
const FranchiseOpsHeader = styled.div`
  margin-bottom: 20px;
  h3 { margin: 0 0 4px; font-size: 18px; font-weight: 700; color: #0A2540; }
`;
const FranchiseOpsSubtitle = styled.div`font-size: 13px; color: #6B7C93;`;
const FunnelRow = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
  margin-bottom: 20px;
  @media (max-width: 960px) { grid-template-columns: repeat(3, 1fr); }
`;
const FunnelCell = styled.div<{ $color: string }>`
  padding: 14px 12px;
  background: #F8FAFC;
  border-left: 3px solid ${p => p.$color};
  border-radius: 6px;
  .label { font-size: 10px; font-weight: 600; color: #6B7C93; text-transform: uppercase; letter-spacing: 0.3px; margin-bottom: 6px; }
  .count { font-size: 22px; font-weight: 700; color: ${p => p.$color}; line-height: 1; }
`;
const FunnelTotal = styled.div`
  padding: 14px 12px;
  background: #F0EDFF;
  border-left: 3px solid #635BFF;
  border-radius: 6px;
  .label { font-size: 10px; font-weight: 600; color: #6B7C93; text-transform: uppercase; letter-spacing: 0.3px; margin-bottom: 6px; }
  .count { font-size: 22px; font-weight: 700; color: #635BFF; line-height: 1; }
`;
const FranchiseOpsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
  @media (max-width: 1100px) { grid-template-columns: 1fr; }
`;
const OpsCard = styled.div<{ $highlight?: boolean }>`
  padding: 16px 18px;
  background: ${p => p.$highlight ? '#F0EDFF' : '#F8FAFC'};
  border: 1px solid ${p => p.$highlight ? '#DDD6FE' : '#E6EBF1'};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`;
const OpsCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
  h4 { margin: 0; font-size: 13px; font-weight: 600; color: #0A2540; }
`;
const OpsCardStats = styled.div`
  display: flex; gap: 6px; font-size: 12px; font-weight: 600; color: #4B5563;
  small { font-weight: 500; color: #9CA3AF; margin-left: 2px; }
`;
const OpsEmpty = styled.div`font-size: 12px; color: #9CA3AF; font-style: italic; padding: 8px 0;`;
const OpsList = styled.div`display: flex; flex-direction: column; gap: 6px;`;
const OpsListItem = styled.div`
  display: flex; justify-content: space-between; align-items: center;
  padding: 8px 10px; background: white; border-radius: 6px;
  border: 1px solid #E6EBF1; cursor: pointer;
  transition: border-color 0.15s, box-shadow 0.15s;
  &:hover { border-color: #635BFF; box-shadow: 0 2px 6px rgba(99, 91, 255, 0.08); }
  .primary {
    font-size: 12px; font-weight: 600; color: #0A2540;
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    flex: 1; min-width: 0; margin-right: 8px;
  }
  .sub { font-weight: 500; color: #6B7C93; }
`;
const OpsBadge = styled.span<{ $urgent?: boolean }>`
  font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 10px;
  background: ${p => p.$urgent ? '#FEE2E2' : '#DCFCE7'};
  color: ${p => p.$urgent ? '#991B1B' : '#15803D'};
  white-space: nowrap; flex-shrink: 0;
`;
const ForecastValue = styled.div`font-size: 26px; font-weight: 700; color: #635BFF; line-height: 1.1; margin-bottom: 4px;`;
const ForecastMeta = styled.div`font-size: 12px; color: #4B5563; margin-bottom: 8px;`;
const ForecastNote = styled.div`font-size: 11px; color: #9CA3AF; font-style: italic; line-height: 1.4;`;

// ============================================================================
// Component
// ============================================================================

const BrandGeneralDashboard: React.FC = () => {
  const { t } = useTranslation('brand');
  const displayRole = useRoleDisplayName();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { defaultCurrency } = useBrandCurrency();
  const [currency, setCurrency] = useState('RM');
  const [loading, setLoading] = useState(true);
  const [brandId, setBrandId] = useState<number | null>(null);
  const [brandTimeZone, setBrandTimeZone] = useState<string>('Asia/Kuala_Lumpur');
  const [chartPeriod, setChartPeriod] = useState('year');
  const { items: setupItems } = useSetupStatus({ role: user?.role || '', brandId: user?.brand_id });

  const [stats, setStats] = useState({
    totalRestaurants: 0,
    monthlyRevenue: 0,
    monthlyOrders: 0,
    avgRevenuePerRestaurant: 0,
    pendingInvoices: 0,
    overdueInvoices: 0,
    activePlans: 0,
  });

  const [trendData, setTrendData] = useState<any[]>([]);
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [subscriptionInfo, setSubscriptionInfo] = useState<{ planType?: string; status?: string; daysLeft?: number }>({});
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [franchiseOps, setFranchiseOps] = useState<any | null>(null);
  const [alerts, setAlerts] = useState<Array<{ type: 'warning' | 'info' | 'success'; title: string; message: string; link?: string }>>([]);
  const [badgeCounts, setBadgeCounts] = useState({ systemInquiry: 0, operationInquiry: 0, notices: 0, invoices: 0 });
  const [activeContracts, setActiveContracts] = useState<any[]>([]);

  useEffect(() => {
    if (defaultCurrency) setCurrency(defaultCurrency);
  }, [defaultCurrency]);

  useEffect(() => {
    fetchDashboardData();
    fetchBadgeCounts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchBadgeCounts = async () => {
    try {
      const token = getAuthToken();
      if (!token) return;
      const res = await fetch('/api/badge-counts', { headers: { 'Authorization': `Bearer ${token}` } });
      if (res.ok) {
        const data = await res.json();
        if (data.success) setBadgeCounts(data.data);
      }
    } catch { /* silent */ }
  };

  useEffect(() => {
    if (brandId) fetchTrendData(brandId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartPeriod, brandId]);

  const getHeaders = () => ({
    'Authorization': `Bearer ${getAuthToken()}`,
    'Content-Type': 'application/json'
  });

  const fetchDashboardData = async () => {
    try {
      const token = getAuthToken();
      if (!token) return;
      setLoading(true);
      const headers = getHeaders();

      const brandsRes = await fetch('/api/brands', { headers });
      const brandsData = await brandsRes.json();
      const brands = brandsData.data || brandsData || [];
      const brand = brands[0];
      if (!brand) { setLoading(false); return; }
      setBrandId(brand.id);
      const brandOps = typeof brand.operation_settings === 'string'
        ? (() => { try { return JSON.parse(brand.operation_settings); } catch { return {}; } })()
        : (brand.operation_settings || {});
      if (brandOps?.timeZone) setBrandTimeZone(brandOps.timeZone);

      if (brand.restaurants && brand.restaurants.length > 0 && brand.restaurants[0].currency) {
        setCurrency(brand.restaurants[0].currency);
      }

      const now = new Date();
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
      const today = now.toISOString().split('T')[0];

      const [revenueRes, plansRes, invoicesRes, subsRes, subStatusRes, contractsRes] = await Promise.all([
        fetch(`/api/brands/${brand.id}/revenue?start_date=${monthStart}&end_date=${today}`, { headers }),
        fetch(`/api/brands/${brand.id}/plans`, { headers }),
        fetch('/api/invoices', { headers }),
        fetch(`/api/brands/${brand.id}/subscriptions`, { headers }),
        fetch('/api/restaurants/subscription-status', { headers }),
        fetch('/api/contracts?stage=active', { headers }),
      ]);

      const [revenueData, plansData, invoicesData, subsData, subStatusData, contractsData] = await Promise.all([
        revenueRes.json(), plansRes.json(), invoicesRes.json(), subsRes.json(), subStatusRes.json(), contractsRes.json(),
      ]);

      // Active contracts
      const activeContractsList = Array.isArray(contractsData?.data) ? contractsData.data : (Array.isArray(contractsData) ? contractsData : []);
      setActiveContracts(activeContractsList);

      // Subscription info for header badge
      const subStatus = subStatusData.data || subStatusData;
      if (subStatus.subscriptionStatus) {
        const userRes = await fetch(`/api/users/${user?.id}`, { headers });
        const userData = await userRes.json();
        const u = userData.data || userData;
        setSubscriptionInfo({
          planType: u.plan_type || brand.plan_type,
          status: subStatus.subscriptionStatus,
          daysLeft: u.subscription_end ? Math.ceil((new Date(u.subscription_end).getTime() - Date.now()) / (1000 * 60 * 60 * 24)) : undefined
        });
      }

      const revenue = revenueData.data || revenueData;
      const totalRevenue = parseFloat(revenue.total_revenue || 0);
      const restaurantRevenues = revenue.restaurants || [];
      const totalOrders = restaurantRevenues.reduce((sum: number, r: any) => sum + (r.order_count || 0), 0);
      setRestaurants(restaurantRevenues);

      const plans = plansData.data || plansData || [];
      const activePlans = plans.filter((p: any) => p.is_active !== false).length;

      const invoices = invoicesData.data || invoicesData || [];
      const pendingInvoices = invoices.filter((inv: any) => inv.status === 'pending_payment' || inv.status === 'sent').length;
      const overdueInvoices = invoices.filter((inv: any) => inv.status === 'overdue').length;

      const subs = subsData.data || subsData || [];
      setSubscriptions(subs);

      setStats({
        totalRestaurants: restaurantRevenues.length,
        monthlyRevenue: totalRevenue,
        monthlyOrders: totalOrders,
        avgRevenuePerRestaurant: restaurantRevenues.length > 0 ? totalRevenue / restaurantRevenues.length : 0,
        pendingInvoices,
        overdueInvoices,
        activePlans,
      });

      // Generate alerts
      const alertList: Array<{ type: 'warning' | 'info' | 'success'; title: string; message: string; link?: string }> = [];
      if (overdueInvoices > 0) {
        alertList.push({ type: 'warning', title: 'Overdue Invoices', message: `${overdueInvoices} invoice(s) need attention`, link: '/pos/brand/invoices' });
      }
      if (pendingInvoices > 0) {
        alertList.push({ type: 'info', title: 'Pending Invoices', message: `${pendingInvoices} invoice(s) pending payment`, link: '/pos/brand/invoices' });
      }
      const noOrderRestaurants = restaurantRevenues.filter((r: any) => (r.order_count || 0) === 0);
      if (noOrderRestaurants.length > 0) {
        alertList.push({ type: 'info', title: 'No Orders', message: `${noOrderRestaurants.length} restaurant(s) with no orders this month`, link: '/pos/brand/general/management' });
      }
      if (badgeCounts.notices > 0) {
        alertList.push({ type: 'info', title: 'Unread Notices', message: `${badgeCounts.notices} unread notice(s)`, link: '/pos/brand/notices' });
      }
      if (badgeCounts.systemInquiry > 0) {
        alertList.push({ type: 'info', title: 'System Inquiry', message: `${badgeCounts.systemInquiry} inquiry(s) with new replies`, link: '/pos/brand/system-inquiry' });
      }
      if (badgeCounts.operationInquiry > 0) {
        alertList.push({ type: 'info', title: 'Operation Inquiry', message: `${badgeCounts.operationInquiry} open inquiry(s)`, link: '/pos/brand/operation-inquiry' });
      }
      if (alertList.length === 0) {
        alertList.push({ type: 'success', title: 'All Clear', message: 'All systems running smoothly. No issues detected.' });
      }
      setAlerts(alertList);

      fetchTrendData(brand.id);
      fetchFranchiseOps(brand.id);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFranchiseOps = async (bId: number) => {
    try {
      const token = getAuthToken();
      if (!token) return;
      const res = await fetch(`/api/brands/${bId}/franchise-dashboard`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setFranchiseOps(data.data);
    } catch (e) { /* silent */ }
  };

  const fetchTrendData = async (bId: number) => {
    try {
      const token = getAuthToken();
      if (!token) return;
      const headers = getHeaders();
      const res = await fetch(`/api/brands/${bId}/sales-trend?period=${chartPeriod}`, { headers });
      const data = await res.json();
      setTrendData(data.data || []);
    } catch (error) {
      console.error('Error fetching trend data:', error);
    }
  };

  const pieData = restaurants
    .filter((r: any) => parseFloat(r.revenue || 0) > 0)
    .map((r: any) => ({ name: r.name ? getRestaurantDisplayName(r) : (r.restaurant_branch_name ? `${r.restaurant_name} (${r.restaurant_branch_name})` : (r.restaurant_name || 'Unknown')), value: parseFloat(r.revenue || 0) }))
    .sort((a: any, b: any) => b.value - a.value)
    .slice(0, 7);

  const topSubscriptions = [...subscriptions]
    .sort((a: any, b: any) => (b.current_month?.revenue || 0) - (a.current_month?.revenue || 0))
    .slice(0, 5);

  if (loading) {
    return (
      <Container>
        <Header><Title>{t('brand:brandGeneralDashboard.brandDashboard')}</Title></Header>
        <Content>
          <div style={{ textAlign: 'center', padding: '40px' }}>{t('brand:brandGeneralDashboard.loadingDashboard')}</div>
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      <Walkthrough tourKey="bg_dashboard" steps={bgTourSteps(t)} version={1} autoStart />
      <Header>
        <Title>{t('brand:brandGeneralDashboard.brandDashboard')}</Title>
        <TourTrigger tourKey="bg_dashboard" />
        {subscriptionInfo.planType && (
          <Subtitle>
            <span>{subscriptionInfo.planType}</span>
            {(() => {
              const s = subscriptionInfo;
              if (s.status === 'trial') {
                return <SubscriptionBadge variant="trial" onClick={() => navigate('/pos/profile?tab=subscription')}>Trial{s.daysLeft !== undefined ? ` • ${s.daysLeft > 0 ? s.daysLeft + ' days left' : 'Expired'}` : ''}</SubscriptionBadge>;
              }
              if (s.status === 'active' && s.daysLeft !== undefined) {
                if (s.daysLeft <= 0) return <SubscriptionBadge variant="expired" onClick={() => navigate('/pos/profile?tab=subscription')}>{t('brand:brandGeneralDashboard.expired')}</SubscriptionBadge>;
                if (s.daysLeft <= 30) return <SubscriptionBadge variant="expiring" onClick={() => navigate('/pos/profile?tab=subscription')}>{s.daysLeft} days left</SubscriptionBadge>;
                return <SubscriptionBadge variant="active" onClick={() => navigate('/pos/profile?tab=subscription')}>{s.daysLeft} days left</SubscriptionBadge>;
              }
              if (s.status === 'expired' || s.status === 'suspended') return <SubscriptionBadge variant="expired" onClick={() => navigate('/pos/profile?tab=subscription')}>{s.status}</SubscriptionBadge>;
              return <SubscriptionBadge variant="active" onClick={() => navigate('/pos/profile?tab=subscription')}>{t('brand:brandGeneralDashboard.active')}</SubscriptionBadge>;
            })()}
          </Subtitle>
        )}
      </Header>

      <Content>
        {user?.id && (
          <WelcomeModal
            userKey={user.id}
            userName={user.fullName || user.username}
            roleLabel={displayRole(user.role)}
            items={setupItems}
          />
        )}
        {setupItems.length > 0 && (
          <SetupGuide items={setupItems} entityId={`brand_${user?.brand_id}`} />
        )}

        {/* KPI Cards */}
        <DashboardStatsGrid>
          <DashboardStatCard color="#DC2626">
            <DashboardStatLabel>{t('brand:brandGeneralDashboard.franchiseRestaurants')}</DashboardStatLabel>
            <DashboardStatValue>{stats.totalRestaurants}</DashboardStatValue>
          </DashboardStatCard>
          <DashboardStatCard color="#059669">
            <DashboardStatLabel>{t('brand:brandGeneralDashboard.monthlyRevenue')}</DashboardStatLabel>
            <DashboardStatValue>{formatCurrency(stats.monthlyRevenue, currency)}</DashboardStatValue>
          </DashboardStatCard>
          <DashboardStatCard color="#2563EB">
            <DashboardStatLabel>{t('brand:brandGeneralDashboard.monthlyOrders')}</DashboardStatLabel>
            <DashboardStatValue>{stats.monthlyOrders.toLocaleString()}</DashboardStatValue>
          </DashboardStatCard>
          <DashboardStatCard color="#7C3AED">
            <DashboardStatLabel>{t('brand:brandGeneralDashboard.avgRevenueRestaurant')}</DashboardStatLabel>
            <DashboardStatValue>{formatCurrency(stats.avgRevenuePerRestaurant, currency)}</DashboardStatValue>
          </DashboardStatCard>
          <DashboardStatCard color="#F59E0B">
            <DashboardStatLabel>{t('brand:brandGeneralDashboard.pendingInvoices')}</DashboardStatLabel>
            <DashboardStatValue>{stats.pendingInvoices}</DashboardStatValue>
          </DashboardStatCard>
          <DashboardStatCard color={stats.overdueInvoices > 0 ? '#EF4444' : '#059669'}>
            <DashboardStatLabel>{t('brand:brandGeneralDashboard.overdueInvoices')}</DashboardStatLabel>
            <DashboardStatValue>{stats.overdueInvoices}</DashboardStatValue>
          </DashboardStatCard>
          <DashboardStatCard color="#10B981">
            <DashboardStatLabel>{t('brand:brandGeneralDashboard.activePlans')}</DashboardStatLabel>
            <DashboardStatValue>{stats.activePlans}</DashboardStatValue>
          </DashboardStatCard>
        </DashboardStatsGrid>

        {/* Chart + Notifications */}
        <MainGrid>
          <ChartContainer>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0 }}>{t('brand:brandGeneralDashboard.revenueTrend')}</h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                {(['week', 'month', 'year'] as const).map(p => (
                  <button
                    key={p}
                    onClick={() => setChartPeriod(p)}
                    style={{
                      padding: '6px 12px',
                      background: chartPeriod === p ? '#635BFF' : 'transparent',
                      color: chartPeriod === p ? 'white' : '#6B7280',
                      border: '1px solid #E6EBF1',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '13px'
                    }}
                  >
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            {trendData.length > 0 ? (
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                  <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#6B7C93' }} />
                  <YAxis tick={{ fontSize: 12, fill: '#6B7C93' }} tickFormatter={(v) => v >= 1000 ? `${(v/1000).toFixed(0)}k` : v} />
                  <Tooltip
                    formatter={(value: any) => [formatCurrency(value, currency), 'Revenue']}
                    labelStyle={{ color: '#0A2540', fontWeight: 600 }}
                    contentStyle={{ borderRadius: 8, border: '1px solid #E6EBF1' }}
                  />
                  <Line type="monotone" dataKey="sales" stroke="#DC2626" strokeWidth={2} dot={{ r: 4, fill: '#DC2626' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <LoadingContainer>{t('brand:brandGeneralDashboard.noSalesDataForThisPeriod')}</LoadingContainer>
            )}
          </ChartContainer>

          <AlertsPanel>
            <h3>{t('brand:brandGeneralDashboard.notifications')}</h3>
            <AlertsList>
              {alerts.map((alert, idx) => (
                <Alert key={idx} type={alert.type} onClick={() => alert.link && navigate(alert.link)}>
                  <AlertContent>
                    <AlertTitle type={alert.type}>{alert.title}</AlertTitle>
                    <AlertDescription>{alert.message}</AlertDescription>
                  </AlertContent>
                </Alert>
              ))}
            </AlertsList>
          </AlertsPanel>
        </MainGrid>

        {/* Quick Actions */}
        <QuickActionsSection>
          <h3>{t('brand:brandGeneralDashboard.quickActions')}</h3>
          <QuickActionsGrid>
            <QuickActionCard onClick={() => navigate('/pos/brand/general/management')}>
              <div className="icon">▬</div>
              <div className="title">{t('brand:brandGeneralDashboard.brands')}</div>
              <div className="description">{t('brand:brandGeneralDashboard.brandManagement')}</div>
            </QuickActionCard>
            <QuickActionCard onClick={() => navigate('/pos/brand/invoices')}>
              <div className="icon">▦</div>
              <div className="title">{t('brand:brandGeneralDashboard.invoices')}</div>
              <div className="description">{t('brand:brandGeneralDashboard.invoiceManagement')}</div>
            </QuickActionCard>
            <QuickActionCard onClick={() => navigate('/pos/brand/plans')}>
              <div className="icon">☰</div>
              <div className="title">{t('brand:brandGeneralDashboard.subscriptionPlans')}</div>
              <div className="description">{t('brand:brandGeneralDashboard.planConfiguration')}</div>
            </QuickActionCard>
            <QuickActionCard onClick={() => navigate('/pos/brand/general/reports')}>
              <div className="icon">◉</div>
              <div className="title">{t('brand:brandGeneralDashboard.reports')}</div>
              <div className="description">{t('brand:brandGeneralDashboard.performanceAnalytics')}</div>
            </QuickActionCard>
          </QuickActionsGrid>
        </QuickActionsSection>

        {/* Revenue Distribution + Active Contracts */}
        <ChartGrid>
          <ChartCard>
            <ChartHeader>
              <ChartTitle>{t('brand:brandGeneralDashboard.revenueDistribution')}</ChartTitle>
            </ChartHeader>
            {pieData.length > 0 ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <ResponsiveContainer width="50%" height={220}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
                      {pieData.map((_: any, index: number) => (
                        <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any) => formatCurrency(value, currency)} />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ flex: 1 }}>
                  {pieData.map((item: any, idx: number) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, fontSize: 13, color: '#374151' }}>
                      <div style={{ width: 10, height: 10, borderRadius: 2, background: PIE_COLORS[idx % PIE_COLORS.length], flexShrink: 0 }} />
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{item.name}</span>
                      <span style={{ fontWeight: 600, flexShrink: 0 }}>{formatCurrency(item.value, currency)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <LoadingContainer>{t('brand:brandGeneralDashboard.noRevenueDataAvailable')}</LoadingContainer>
            )}
          </ChartCard>
          <ChartCard>
            <ChartHeader>
              <ChartTitle>{t('brand:brandGeneralDashboard.activeContracts', 'Active Contracts')}</ChartTitle>
              <a href="/pos/brand/franchise" style={{ fontSize: '13px', color: '#635BFF', textDecoration: 'none', fontWeight: 500 }}>
                {t('brand:brandGeneralDashboard.viewAll', 'View all')} →
              </a>
            </ChartHeader>
            <div style={{ textAlign: 'center', padding: '12px 0 16px', borderBottom: '1px solid #E6EBF1', marginBottom: '12px' }}>
              <div style={{ fontSize: '36px', fontWeight: 700, color: '#0A2540', lineHeight: 1 }}>
                {activeContracts.length}
              </div>
              <div style={{ fontSize: '12px', color: '#6B7C93', marginTop: '4px' }}>
                {t('brand:brandGeneralDashboard.franchisesInOperation', 'Franchises in operation')}
              </div>
            </div>
            <div style={{ maxHeight: '180px', overflowY: 'auto' }}>
              {activeContracts.length > 0 ? (
                activeContracts.slice(0, 5).map((c: any) => {
                  const name = c.restaurant?.name
                    ? (c.restaurant.branch_name ? `${c.restaurant.name} (${c.restaurant.branch_name})` : c.restaurant.name)
                    : (c.applicant_company_name || c.applicant_name || '-');
                  const endDate = c.end_date ? new Date(c.end_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: brandTimeZone }) : '-';
                  return (
                    <div
                      key={c.id}
                      onClick={() => window.location.href = `/pos/brand/franchise?view=pipeline&id=${c.id}`}
                      style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '8px 0', borderBottom: '1px solid #F3F4F6',
                        cursor: 'pointer', fontSize: '13px'
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#F8FAFC')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      <div style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#0A2540', fontWeight: 500 }}>
                        {name}
                      </div>
                      <div style={{ fontSize: '12px', color: '#6B7C93', flexShrink: 0, marginLeft: '8px' }}>
                        ~ {endDate}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div style={{ textAlign: 'center', color: '#9CA3AF', fontSize: '13px', padding: '20px 0' }}>
                  {t('brand:brandGeneralDashboard.noActiveContracts', 'No active contracts')}
                </div>
              )}
            </div>
          </ChartCard>
        </ChartGrid>

        {/* Franchise Operations — contract pipeline + expiring + billing gaps + royalty forecast */}
        {franchiseOps && (
          <FranchiseOpsSection>
            <FranchiseOpsHeader>
              <h3>{t('brand:brandGeneralDashboard.franchiseOperations', 'Franchise Operations')}</h3>
              <FranchiseOpsSubtitle>
                {t('brand:brandGeneralDashboard.franchiseOpsSubtitle', 'Contract lifecycle, billing gaps, and royalty forecast')}
              </FranchiseOpsSubtitle>
            </FranchiseOpsHeader>

            {/* Pipeline funnel */}
            <FunnelRow>
              {(['proposal', 'contracting', 'setup', 'active', 'expired'] as const).map((stage) => {
                const colors: Record<string, string> = {
                  proposal: '#8B5CF6', contracting: '#F97316', setup: '#3B82F6',
                  active: '#16A34A', expired: '#EF4444'
                };
                const labels: Record<string, string> = {
                  proposal: t('brand:brandGeneralDashboard.stageProposal', 'Proposal'),
                  contracting: t('brand:brandGeneralDashboard.stageContracting', 'In Talks'),
                  setup: t('brand:brandGeneralDashboard.stageSetup', 'Setup'),
                  active: t('brand:brandGeneralDashboard.stageActive', 'Active'),
                  expired: t('brand:brandGeneralDashboard.stageExpired', 'Expired')
                };
                return (
                  <FunnelCell key={stage} $color={colors[stage]}>
                    <div className="label">{labels[stage]}</div>
                    <div className="count">{franchiseOps.pipeline?.[stage] ?? 0}</div>
                  </FunnelCell>
                );
              })}
              <FunnelTotal>
                <div className="label">{t('brand:brandGeneralDashboard.totalContracts', 'Total')}</div>
                <div className="count">{franchiseOps.pipeline?.total ?? 0}</div>
              </FunnelTotal>
            </FunnelRow>

            {/* Expiring + Billing Gaps + Royalty Forecast */}
            <FranchiseOpsGrid>
              <OpsCard>
                <OpsCardHeader>
                  <h4>{t('brand:brandGeneralDashboard.expiringSoon', 'Expiring Soon')}</h4>
                  <OpsCardStats>
                    <span>{franchiseOps.expiring?.count_30d ?? 0} <small>{t('brand:brandGeneralDashboard.in30d', 'in 30d')}</small></span>
                    <span>·</span>
                    <span>{franchiseOps.expiring?.count_90d ?? 0} <small>{t('brand:brandGeneralDashboard.in90d', 'in 90d')}</small></span>
                  </OpsCardStats>
                </OpsCardHeader>
                {(franchiseOps.expiring?.list || []).length === 0 ? (
                  <OpsEmpty>{t('brand:brandGeneralDashboard.noExpiring', 'No contracts expiring soon.')}</OpsEmpty>
                ) : (
                  <OpsList>
                    {(franchiseOps.expiring.list as any[]).slice(0, 5).map((c) => {
                      const restaurantLabel = c.restaurant?.name
                        ? `${c.restaurant.name}${c.restaurant.branch_name ? ` · ${c.restaurant.branch_name}` : ''}`
                        : c.applicant_company_name;
                      return (
                        <OpsListItem
                          key={c.id}
                          onClick={() => navigate(`/pos/brand/franchise?id=${c.id}`)}
                          role="button" tabIndex={0}
                          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigate(`/pos/brand/franchise?id=${c.id}`); }}
                        >
                          <div className="primary">
                            {c.contract_number || `#${c.id}`}
                            {restaurantLabel && <span className="sub"> · {restaurantLabel}</span>}
                          </div>
                          <OpsBadge $urgent={c.days_left <= 30}>
                            {c.days_left > 0 ? `${c.days_left}d` : t('brand:brandGeneralDashboard.overdue', 'overdue')}
                          </OpsBadge>
                        </OpsListItem>
                      );
                    })}
                  </OpsList>
                )}
              </OpsCard>

              <OpsCard>
                <OpsCardHeader>
                  <h4>{t('brand:brandGeneralDashboard.billingGaps', 'Billing Gaps')}</h4>
                  <OpsCardStats>
                    <span>{franchiseOps.billing_gaps?.count ?? 0} <small>{t('brand:brandGeneralDashboard.unlinked', 'active w/o plan')}</small></span>
                  </OpsCardStats>
                </OpsCardHeader>
                {(franchiseOps.billing_gaps?.list || []).length === 0 ? (
                  <OpsEmpty>
                    {t('brand:brandGeneralDashboard.noBillingGaps', 'All active franchise contracts have plans linked.')}
                  </OpsEmpty>
                ) : (
                  <OpsList>
                    {(franchiseOps.billing_gaps.list as any[]).slice(0, 5).map((c) => {
                      const restaurantLabel = c.restaurant?.name
                        ? `${c.restaurant.name}${c.restaurant.branch_name ? ` · ${c.restaurant.branch_name}` : ''}`
                        : c.applicant_company_name;
                      return (
                        <OpsListItem
                          key={c.id}
                          onClick={() => navigate(`/pos/brand/franchise?id=${c.id}`)}
                          role="button" tabIndex={0}
                          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigate(`/pos/brand/franchise?id=${c.id}`); }}
                        >
                          <div className="primary">
                            {c.contract_number || `#${c.id}`}
                            {restaurantLabel && <span className="sub"> · {restaurantLabel}</span>}
                          </div>
                          <OpsBadge $urgent>
                            ! {t('brand:brandGeneralDashboard.noPlan', 'no plan')}
                          </OpsBadge>
                        </OpsListItem>
                      );
                    })}
                  </OpsList>
                )}
              </OpsCard>

              <OpsCard $highlight>
                <OpsCardHeader>
                  <h4>{t('brand:brandGeneralDashboard.royaltyForecast', 'Royalty Forecast (Monthly)')}</h4>
                </OpsCardHeader>
                {franchiseOps.revenue_forecast?.financial_redacted ? (
                  <OpsEmpty>🔒 {t('brand:brandGeneralDashboard.forecastRedacted', 'Forecast hidden for your role')}</OpsEmpty>
                ) : (
                  <>
                    <ForecastValue>
                      {formatCurrency(franchiseOps.revenue_forecast?.estimated_monthly_fixed_floor || 0, franchiseOps.revenue_forecast?.currency || currency)}
                    </ForecastValue>
                    <ForecastMeta>
                      {franchiseOps.revenue_forecast?.active_plans_count ?? 0} {t('brand:brandGeneralDashboard.activePlansLinked', 'active plans linked')}
                    </ForecastMeta>
                    <ForecastNote>
                      {t('brand:brandGeneralDashboard.forecastNote', 'Fixed + combined min-guarantee only. Percentage-based royalty excluded (varies with restaurant revenue).')}
                    </ForecastNote>
                  </>
                )}
              </OpsCard>
            </FranchiseOpsGrid>
          </FranchiseOpsSection>
        )}

        {/* Restaurant Performance Table */}
        <RecentOrdersSection>
          <h3>{t('brand:brandGeneralDashboard.restaurantPerformance')}</h3>
          {topSubscriptions.length === 0 ? (
            <DataTableEmpty>{t('brand:brandGeneralDashboard.noRestaurantData', 'No restaurant data available')}</DataTableEmpty>
          ) : (
            <DataTable>
              <DataTableHead>
                <tr>
                  <DataTableHeaderCell align="left">{t('brand:brandGeneralDashboard.restaurant')}</DataTableHeaderCell>
                  <DataTableHeaderCell align="left">{t('brand:brandGeneralDashboard.plan')}</DataTableHeaderCell>
                  <DataTableHeaderCell align="right">{t('brand:brandGeneralDashboard.monthlyRevenue')}</DataTableHeaderCell>
                  <DataTableHeaderCell align="right">{t('brand:brandGeneralDashboard.orders')}</DataTableHeaderCell>
                  <DataTableHeaderCell align="right">{t('brand:brandGeneralDashboard.estimatedCharges')}</DataTableHeaderCell>
                  <DataTableHeaderCell align="left">{t('brand:brandGeneralDashboard.invoiceStatus')}</DataTableHeaderCell>
                </tr>
              </DataTableHead>
              <tbody>
                {topSubscriptions.map((sub: any, idx: number) => (
                  <DataTableRow key={idx}>
                    <DataTableCell data-label={t('brand:brandGeneralDashboard.restaurant')} style={{ fontWeight: 600, color: '#0A2540' }}>
                      {sub.restaurant_branch_name ? `${sub.restaurant_name} (${sub.restaurant_branch_name})` : (sub.restaurant_name || '-')}
                    </DataTableCell>
                    <DataTableCell data-label={t('brand:brandGeneralDashboard.plan')}>{sub.plan?.name || 'No Plan'}</DataTableCell>
                    <DataTableCell align="right" data-label={t('brand:brandGeneralDashboard.monthlyRevenue')}>{formatCurrency(sub.current_month?.revenue || 0, currency)}</DataTableCell>
                    <DataTableCell align="right" data-label={t('brand:brandGeneralDashboard.orders')}>{sub.current_month?.order_count || 0}</DataTableCell>
                    <DataTableCell align="right" data-label={t('brand:brandGeneralDashboard.estimatedCharges')}>{formatCurrency(sub.current_month?.estimated_charges || 0, currency)}</DataTableCell>
                    <DataTableCell data-label={t('brand:brandGeneralDashboard.invoiceStatus')}>
                      <StatusBadge status={sub.latest_invoice?.status || 'none'}>
                        {(sub.latest_invoice?.status || 'N/A').replace(/_/g, ' ')}
                      </StatusBadge>
                    </DataTableCell>
                  </DataTableRow>
                ))}
              </tbody>
            </DataTable>
          )}
        </RecentOrdersSection>
      </Content>
    </Container>
  );
};

export default BrandGeneralDashboard;
