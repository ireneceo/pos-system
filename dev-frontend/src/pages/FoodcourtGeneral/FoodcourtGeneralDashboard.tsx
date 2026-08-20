import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContextSwitchQuickAction } from '../../components/ContextSwitchQuickAction';
import styled from 'styled-components';
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
  border-bottom: 1px solid #C7CED6;
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
  background: #F9FAFB;
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
  color: #4B5563;
  margin-top: 4px;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const SubscriptionBadge = styled.span<{ variant: 'trial' | 'active' | 'expiring' | 'expired' }>`
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
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
  border: 1px solid #C7CED6;

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
  border: 1px solid #C7CED6;
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
  &::-webkit-scrollbar-thumb { background: #64748B; border-radius: 4px; }
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
      default: return '#F1F4F8';
    }
  }};
  border: 1px solid ${props => {
    switch(props.type) {
      case 'error': return '#FECACA';
      case 'warning': return '#FDE68A';
      case 'success': return '#A7F3D0';
      case 'info': return '#BFDBFE';
      default: return '#C7CED6';
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
      default: return '#1F2937';
    }
  }};
`;

const AlertDescription = styled.div`
  font-size: 12px;
  color: #4B5563;
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
  border: 1px solid #C7CED6;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #F4F6F9;
    .icon { color: #0A2540; }
    .title { color: #0A2540; }
  }

  .icon {
    font-size: 32px;
    margin-bottom: 12px;
    color: #4B5563;
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
    color: #4B5563;
  }
`;

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
  border: 1px solid #C7CED6;
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

const RecentOrdersSection = styled.div`
  background: white;
  border-radius: 16px;
  border: 1px solid #C7CED6;
  overflow: hidden;

  h3 {
    padding: 20px 24px;
    margin: 0;
    color: #0A2540;
    font-size: 18px;
    font-weight: 600;
    border-bottom: 1px solid #F1F4F8;
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
      default: return 'background: #F1F4F8; color: #1F2937;';
    }
  }}
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: #4B5563;
  font-size: 14px;
`;

const PIE_COLORS = ['#EA580C', '#F97316', '#FB923C', '#FDBA74', '#FED7AA', '#FFF7ED', '#FFFBEB'];

// FG dashboard walkthrough — 5 step tour over sidebar items + header trigger.
const fgTourSteps = (t: (k: string, fallback?: string) => string): TourStep[] => ([
  {
    selector: '[data-tour="sidebar-company-info"]',
    title: t('walkthrough:fg.step1.title', 'Start with company info'),
    description: t('walkthrough:fg.step1.description', 'Add your business registration, tax ID and contact details. These appear on every invoice you issue.'),
    position: 'right'
  },
  {
    selector: '[data-tour="sidebar-branches"]',
    title: t('walkthrough:fg.step2.title', 'Add your first branch'),
    description: t('walkthrough:fg.step2.description', 'A branch is a physical food court location. You need at least one before you can place units or tenants.'),
    position: 'right'
  },
  {
    selector: '[data-tour="sidebar-floor-plan"]',
    title: t('walkthrough:fg.step3.title', 'Lay out the floor plan'),
    description: t('walkthrough:fg.step3.description', 'Draw the unit grid for each branch. Tenants will be placed onto these units later.'),
    position: 'right'
  },
  {
    selector: '[data-tour="sidebar-tenancy"]',
    title: t('walkthrough:fg.step4.title', 'Bring in tenant restaurants'),
    description: t('walkthrough:fg.step4.description', 'Connect existing restaurants or invite new ones to operate inside your food court.'),
    position: 'right'
  },
  {
    selector: '[data-tour="header-tour-trigger"]',
    title: t('walkthrough:fg.step5.title', 'Replay anytime'),
    description: t('walkthrough:fg.step5.description', 'Use the Show me around button in the header whenever you want to see this tour again.'),
    position: 'bottom'
  }
]);

// ============================================================================
// Tenancy Operations section — contract pipeline + expiring + billing gaps + forecast
// ============================================================================

const TenancyOpsSection = styled.div`
  background: white;
  padding: 24px 28px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  margin-bottom: 24px;
  border: 1px solid #C7CED6;
`;

const TenancyOpsHeader = styled.div`
  margin-bottom: 20px;
  h3 { margin: 0 0 4px; font-size: 18px; font-weight: 700; color: #0A2540; }
`;

const TenancyOpsSubtitle = styled.div`
  font-size: 13px;
  color: #4B5563;
`;

const FunnelRow = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
  margin-bottom: 20px;
  @media (max-width: 960px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const FunnelCell = styled.div<{ $color: string }>`
  padding: 14px 12px;
  background: #F1F4F8;
  border-left: 3px solid ${p => p.$color};
  border-radius: 6px;
  .label {
    font-size: 10px;
    font-weight: 600;
    color: #4B5563;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    margin-bottom: 6px;
  }
  .count {
    font-size: 22px;
    font-weight: 700;
    color: ${p => p.$color};
    line-height: 1;
  }
`;

const FunnelTotal = styled.div`
  padding: 14px 12px;
  background: #F0EDFF;
  border-left: 3px solid #635BFF;
  border-radius: 6px;
  .label {
    font-size: 10px;
    font-weight: 600;
    color: #4B5563;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    margin-bottom: 6px;
  }
  .count {
    font-size: 22px;
    font-weight: 700;
    color: #635BFF;
    line-height: 1;
  }
`;

const TenancyOpsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

const OpsCard = styled.div<{ $highlight?: boolean }>`
  padding: 16px 18px;
  background: ${p => p.$highlight ? '#F0EDFF' : '#F1F4F8'};
  border: 1px solid ${p => p.$highlight ? '#DDD6FE' : '#C7CED6'};
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
  h4 {
    margin: 0;
    font-size: 13px;
    font-weight: 600;
    color: #0A2540;
  }
`;

const OpsCardStats = styled.div`
  display: flex;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #374151;
  small {
    font-weight: 500;
    color: #6B7280;
    margin-left: 2px;
  }
`;

const OpsEmpty = styled.div`
  font-size: 12px;
  color: #6B7280;
  font-style: italic;
  padding: 8px 0;
`;

const OpsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const OpsListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 10px;
  background: white;
  border-radius: 6px;
  border: 1px solid #C7CED6;
  cursor: pointer;
  transition: border-color 0.15s, box-shadow 0.15s;
  &:hover {
    border-color: #635BFF;
    box-shadow: 0 2px 6px rgba(99, 91, 255, 0.08);
  }
  .primary {
    font-size: 12px;
    font-weight: 600;
    color: #0A2540;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
    min-width: 0;
    margin-right: 8px;
  }
  .sub {
    font-weight: 500;
    color: #4B5563;
  }
`;

const OpsBadge = styled.span<{ $urgent?: boolean }>`
  font-size: 10px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 10px;
  background: ${p => p.$urgent ? '#FEE2E2' : '#DCFCE7'};
  color: ${p => p.$urgent ? '#991B1B' : '#15803D'};
  white-space: nowrap;
  flex-shrink: 0;
`;

const ForecastValue = styled.div`
  font-size: 26px;
  font-weight: 700;
  color: #635BFF;
  line-height: 1.1;
  margin-bottom: 4px;
`;

const ForecastMeta = styled.div`
  font-size: 12px;
  color: #374151;
  margin-bottom: 8px;
`;

const ForecastNote = styled.div`
  font-size: 11px;
  color: #6B7280;
  font-style: italic;
  line-height: 1.4;
`;

// ============================================================================
// Component
// ============================================================================

const FoodcourtGeneralDashboard: React.FC = () => {
  const ctxSwitchItem = useContextSwitchQuickAction();
  const { t } = useTranslation('foodcourt');
  const displayRole = useRoleDisplayName();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { defaultCurrency } = useBrandCurrency();
  const [currency, setCurrency] = useState('RM');
  const [loading, setLoading] = useState(true);
  const [foodcourtId, setFoodcourtId] = useState<number | null>(null);
  const [chartPeriod, setChartPeriod] = useState('year');
  const { items: setupItems } = useSetupStatus({ role: user?.role || '', foodcourtId: user?.foodcourt_id });

  const [stats, setStats] = useState({
    totalRestaurants: 0,
    monthlyRevenue: 0,
    monthlyOrders: 0,
    avgRevenuePerTenant: 0,
    pendingInvoices: 0,
    overdueInvoices: 0,
    activePlans: 0,
  });

  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [trendData, setTrendData] = useState<any[]>([]);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<Array<{ type: 'warning' | 'info' | 'success'; title: string; message: string; link?: string }>>([]);
  const [subscriptionInfo, setSubscriptionInfo] = useState<{ planType?: string; status?: string; daysLeft?: number }>({});
  const [badgeCounts, setBadgeCounts] = useState({ systemInquiry: 0, operationInquiry: 0, notices: 0, invoices: 0 });
  const [tenancyOps, setTenancyOps] = useState<any | null>(null);

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
    if (foodcourtId) fetchTrendData(foodcourtId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartPeriod, foodcourtId]);

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

      const foodcourtsRes = await fetch('/api/foodcourts', { headers });
      const foodcourtsData = await foodcourtsRes.json();
      const foodcourts = (Array.isArray(foodcourtsData?.data) ? foodcourtsData.data : Array.isArray(foodcourtsData) ? foodcourtsData : []);
      const foodcourt = foodcourts[0];
      if (!foodcourt) { setLoading(false); return; }
      setFoodcourtId(foodcourt.id);

      if (foodcourt.restaurants && foodcourt.restaurants.length > 0 && foodcourt.restaurants[0].currency) {
        setCurrency(foodcourt.restaurants[0].currency);
      }

      const now = new Date();
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
      const today = now.toISOString().split('T')[0];

      const [revenueRes, plansRes, invoicesRes, subsRes] = await Promise.all([
        fetch(`/api/foodcourts/${foodcourt.id}/revenue?start_date=${monthStart}&end_date=${today}`, { headers }),
        fetch(`/api/foodcourts/${foodcourt.id}/plans`, { headers }),
        fetch('/api/invoices', { headers }),
        fetch(`/api/foodcourts/${foodcourt.id}/subscriptions`, { headers }),
      ]);

      const [revenueData, plansData, invoicesData, subsData] = await Promise.all([
        revenueRes.json(), plansRes.json(), invoicesRes.json(), subsRes.json(),
      ]);

      const revenue = revenueData.data || revenueData;
      const totalRevenue = parseFloat(revenue.total_revenue || 0);
      const restaurantRevenues = revenue.restaurants || [];
      const totalOrders = restaurantRevenues.reduce((sum: number, r: any) => sum + (r.order_count || 0), 0);
      setRestaurants(restaurantRevenues);

      const plans = (Array.isArray(plansData?.data) ? plansData.data : Array.isArray(plansData) ? plansData : []);
      const activePlans = plans.filter((p: any) => p.is_active !== false).length;

      const invoices = (Array.isArray(invoicesData?.data) ? invoicesData.data : Array.isArray(invoicesData) ? invoicesData : []);
      const pendingInvoices = invoices.filter((inv: any) =>
        inv.status === 'pending_payment' || inv.status === 'payment_submitted'
      ).length;
      const overdueInvoices = invoices.filter((inv: any) => inv.status === 'overdue').length;

      const subs = (Array.isArray(subsData?.data) ? subsData.data : Array.isArray(subsData) ? subsData : []);
      setSubscriptions(subs);

      setStats({
        totalRestaurants: restaurantRevenues.length,
        monthlyRevenue: totalRevenue,
        monthlyOrders: totalOrders,
        avgRevenuePerTenant: restaurantRevenues.length > 0 ? totalRevenue / restaurantRevenues.length : 0,
        pendingInvoices,
        overdueInvoices,
        activePlans,
      });

      const alertList: Array<{ type: 'warning' | 'info' | 'success'; title: string; message: string; link?: string }> = [];
      if (overdueInvoices > 0) {
        alertList.push({ type: 'warning', title: 'Overdue Invoices', message: `${overdueInvoices} invoice(s) need attention`, link: '/pos/foodcourt/invoices' });
      }
      if (pendingInvoices > 0) {
        alertList.push({ type: 'info', title: 'Pending Invoices', message: `${pendingInvoices} invoice(s) pending payment`, link: '/pos/foodcourt/invoices' });
      }
      const noOrderTenants = restaurantRevenues.filter((r: any) => (r.order_count || 0) === 0);
      if (noOrderTenants.length > 0) {
        alertList.push({ type: 'info', title: 'No Orders', message: `${noOrderTenants.length} tenant(s) with no orders this month`, link: '/pos/foodcourt/tenancy' });
      }
      if (badgeCounts.notices > 0) {
        alertList.push({ type: 'info', title: 'Unread Notices', message: `${badgeCounts.notices} unread notice(s)`, link: '/pos/foodcourt/notices' });
      }
      if (badgeCounts.systemInquiry > 0) {
        alertList.push({ type: 'info', title: 'System Inquiry', message: `${badgeCounts.systemInquiry} inquiry(s) with new replies`, link: '/pos/foodcourt/system-inquiry' });
      }
      if (badgeCounts.operationInquiry > 0) {
        alertList.push({ type: 'info', title: 'Operation Inquiry', message: `${badgeCounts.operationInquiry} open inquiry(s)`, link: '/pos/foodcourt/operation-inquiry' });
      }
      if (alertList.length === 0) {
        alertList.push({ type: 'success', title: 'All Clear', message: 'All systems running smoothly. No issues detected.' });
      }
      setAlerts(alertList);

      // Subscription info for header
      try {
        const subStatusRes = await fetch('/api/restaurants/subscription-status', { headers });
        const subStatusData = await subStatusRes.json();
        const subStatus = subStatusData.data || subStatusData;
        const userRes = await fetch(`/api/users/${user?.id}`, { headers });
        const userData = await userRes.json();
        const u = userData.data || userData;
        setSubscriptionInfo({
          planType: u.plan_type || foodcourt.plan_type,
          status: subStatus.subscriptionStatus,
          daysLeft: u.subscription_end ? Math.ceil((new Date(u.subscription_end).getTime() - Date.now()) / (1000 * 60 * 60 * 24)) : undefined
        });
      } catch (e) { /* silent */ }

      fetchTrendData(foodcourt.id);
      fetchTenancyOps(foodcourt.id);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTenancyOps = async (fcId: number) => {
    try {
      const token = getAuthToken();
      if (!token) return;
      const res = await fetch(`/api/foodcourts/${fcId}/tenancy-dashboard`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setTenancyOps(data.data);
    } catch (e) { /* silent */ }
  };

  const fetchTrendData = async (fcId: number) => {
    try {
      const token = getAuthToken();
      if (!token) return;
      const headers = getHeaders();
      const res = await fetch(`/api/foodcourts/${fcId}/sales-trend?period=${chartPeriod}`, { headers });
      const data = await res.json();
      setTrendData(data.data || []);
    } catch (error) {
      console.error('Error fetching trend data:', error);
    }
  };

  const pieData = restaurants
    .filter((r: any) => parseFloat(r.revenue || 0) > 0)
    .map((r: any) => ({ name: r.restaurant_name || r.name || 'Unknown', value: parseFloat(r.revenue || 0) }))
    .sort((a: any, b: any) => b.value - a.value)
    .slice(0, 7);

  const topSubscriptions = [...subscriptions]
    .sort((a: any, b: any) => (b.current_month?.revenue || 0) - (a.current_month?.revenue || 0))
    .slice(0, 5);

  if (loading) {
    return (
      <Container>
        <Header><Title>{t('foodcourt:foodcourtGeneralDashboard.foodcourtDashboard')}</Title></Header>
        <Content>
          <div style={{ textAlign: 'center', padding: '40px' }}>{t('foodcourt:foodcourtGeneralDashboard.loadingDashboard')}</div>
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      <Walkthrough tourKey="fg_dashboard" steps={fgTourSteps(t)} version={1} autoStart />
      <Header>
        <Title>{t('foodcourt:foodcourtGeneralDashboard.foodcourtDashboard')}</Title>
        <HeaderRight>
          <TourTrigger tourKey="fg_dashboard" />
          {subscriptionInfo.planType && (
            <Subtitle>
            <span>{subscriptionInfo.planType}</span>
            {(() => {
              const s = subscriptionInfo;
              if (s.status === 'trial') return <SubscriptionBadge variant="trial" onClick={() => navigate('/pos/profile?tab=subscription')}>Trial{s.daysLeft !== undefined ? ` • ${s.daysLeft > 0 ? s.daysLeft + ' days left' : 'Expired'}` : ''}</SubscriptionBadge>;
              if (s.status === 'active' && s.daysLeft !== undefined) {
                if (s.daysLeft <= 0) return <SubscriptionBadge variant="expired" onClick={() => navigate('/pos/profile?tab=subscription')}>{t('foodcourt:foodcourtGeneralDashboard.expired')}</SubscriptionBadge>;
                if (s.daysLeft <= 30) return <SubscriptionBadge variant="expiring" onClick={() => navigate('/pos/profile?tab=subscription')}>{s.daysLeft} days left</SubscriptionBadge>;
                return <SubscriptionBadge variant="active" onClick={() => navigate('/pos/profile?tab=subscription')}>{s.daysLeft} days left</SubscriptionBadge>;
              }
              if (s.status === 'expired' || s.status === 'suspended') return <SubscriptionBadge variant="expired" onClick={() => navigate('/pos/profile?tab=subscription')}>{s.status}</SubscriptionBadge>;
              return <SubscriptionBadge variant="active" onClick={() => navigate('/pos/profile?tab=subscription')}>{t('foodcourt:foodcourtGeneralDashboard.active')}</SubscriptionBadge>;
            })()}
            </Subtitle>
          )}
        </HeaderRight>
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
          <SetupGuide items={setupItems} entityId={`foodcourt_${user?.foodcourt_id}`} />
        )}

        {/* KPI Cards */}
        <DashboardStatsGrid>
          <DashboardStatCard color="#EA580C">
            <DashboardStatLabel>{t('foodcourt:foodcourtGeneralDashboard.tenantRestaurants')}</DashboardStatLabel>
            <DashboardStatValue>{stats.totalRestaurants}</DashboardStatValue>
          </DashboardStatCard>
          <DashboardStatCard color="#059669">
            <DashboardStatLabel>{t('foodcourt:foodcourtGeneralDashboard.monthlyRevenue')}</DashboardStatLabel>
            <DashboardStatValue>{formatCurrency(stats.monthlyRevenue, currency)}</DashboardStatValue>
          </DashboardStatCard>
          <DashboardStatCard color="#2563EB">
            <DashboardStatLabel>{t('foodcourt:foodcourtGeneralDashboard.monthlyOrders')}</DashboardStatLabel>
            <DashboardStatValue>{stats.monthlyOrders.toLocaleString()}</DashboardStatValue>
          </DashboardStatCard>
          <DashboardStatCard color="#7C3AED">
            <DashboardStatLabel>{t('foodcourt:foodcourtGeneralDashboard.avgRevenueTenant')}</DashboardStatLabel>
            <DashboardStatValue>{formatCurrency(stats.avgRevenuePerTenant, currency)}</DashboardStatValue>
          </DashboardStatCard>
          <DashboardStatCard color="#F59E0B">
            <DashboardStatLabel>{t('foodcourt:foodcourtGeneralDashboard.pendingInvoices')}</DashboardStatLabel>
            <DashboardStatValue>{stats.pendingInvoices}</DashboardStatValue>
          </DashboardStatCard>
          <DashboardStatCard color={stats.overdueInvoices > 0 ? '#EF4444' : '#059669'}>
            <DashboardStatLabel>{t('foodcourt:foodcourtGeneralDashboard.overdueInvoices')}</DashboardStatLabel>
            <DashboardStatValue>{stats.overdueInvoices}</DashboardStatValue>
          </DashboardStatCard>
          <DashboardStatCard color="#10B981">
            <DashboardStatLabel>{t('foodcourt:foodcourtGeneralDashboard.activePlans')}</DashboardStatLabel>
            <DashboardStatValue>{stats.activePlans}</DashboardStatValue>
          </DashboardStatCard>
        </DashboardStatsGrid>

        {/* Chart + Notifications */}
        <MainGrid>
          <ChartContainer>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0 }}>{t('foodcourt:foodcourtGeneralDashboard.revenueTrend')}</h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                {(['week', 'month', 'year'] as const).map(p => (
                  <button
                    key={p}
                    onClick={() => setChartPeriod(p)}
                    style={{
                      padding: '6px 12px',
                      background: chartPeriod === p ? '#635BFF' : 'transparent',
                      color: chartPeriod === p ? 'white' : '#4B5563',
                      border: '1px solid #C7CED6',
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
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F4F8" />
                  <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#4B5563' }} />
                  <YAxis tick={{ fontSize: 12, fill: '#4B5563' }} tickFormatter={(v) => v >= 1000 ? `${(v/1000).toFixed(0)}k` : v} />
                  <Tooltip
                    formatter={(value: any) => [formatCurrency(value, currency), 'Revenue']}
                    labelStyle={{ color: '#0A2540', fontWeight: 600 }}
                    contentStyle={{ borderRadius: 8, border: '1px solid #C7CED6' }}
                  />
                  <Line type="monotone" dataKey="sales" stroke="#EA580C" strokeWidth={2} dot={{ r: 4, fill: '#EA580C' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <LoadingContainer>{t('foodcourt:foodcourtGeneralDashboard.noSalesDataForThisPeriod')}</LoadingContainer>
            )}
          </ChartContainer>

          <AlertsPanel>
            <h3>{t('foodcourt:foodcourtGeneralDashboard.notifications')}</h3>
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
          <h3>{t('foodcourt:foodcourtGeneralDashboard.quickActions')}</h3>
          <QuickActionsGrid>
            <QuickActionCard onClick={() => navigate('/pos/foodcourt/tenancy')}>
              <div className="icon">◉</div>
              <div className="title">{t('foodcourt:foodcourtGeneralDashboard.foodcourts')}</div>
              <div className="description">{t('foodcourt:foodcourtGeneralDashboard.foodcourtManagement')}</div>
            </QuickActionCard>
            <QuickActionCard onClick={() => navigate('/pos/foodcourt/invoices')}>
              <div className="icon">▦</div>
              <div className="title">{t('foodcourt:foodcourtGeneralDashboard.invoices')}</div>
              <div className="description">{t('foodcourt:foodcourtGeneralDashboard.invoiceManagement')}</div>
            </QuickActionCard>
            <QuickActionCard onClick={() => navigate('/pos/foodcourt/plans')}>
              <div className="icon">☰</div>
              <div className="title">{t('foodcourt:foodcourtGeneralDashboard.subscriptionPlans')}</div>
              <div className="description">{t('foodcourt:foodcourtGeneralDashboard.planConfiguration')}</div>
            </QuickActionCard>
            <QuickActionCard onClick={() => navigate('/pos/foodcourt/general/reports')}>
              <div className="icon">▲</div>
              <div className="title">{t('foodcourt:foodcourtGeneralDashboard.statistics')}</div>
              <div className="description">{t('foodcourt:foodcourtGeneralDashboard.performanceAnalytics')}</div>
            </QuickActionCard>
                      {/* 컨텍스트 전환 — 고를 자격이 2개 이상일 때만 나타난다(설계 §6.2) */}
            {ctxSwitchItem && (
              <QuickActionCard onClick={ctxSwitchItem.onClick}>
                <div className="icon">{ctxSwitchItem.icon}</div>
                <div className="title">{ctxSwitchItem.title}</div>
                <div className="description">{ctxSwitchItem.desc}</div>
              </QuickActionCard>
            )}
</QuickActionsGrid>
        </QuickActionsSection>

        {/* Revenue Distribution Chart */}
        <ChartGrid>
          <ChartCard>
            <ChartHeader>
              <ChartTitle>{t('foodcourt:foodcourtGeneralDashboard.revenueDistribution')}</ChartTitle>
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
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, fontSize: 13, color: '#1F2937' }}>
                      <div style={{ width: 10, height: 10, borderRadius: 2, background: PIE_COLORS[idx % PIE_COLORS.length], flexShrink: 0 }} />
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{item.name}</span>
                      <span style={{ fontWeight: 600, flexShrink: 0 }}>{formatCurrency(item.value, currency)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <LoadingContainer>{t('foodcourt:foodcourtGeneralDashboard.noRevenueDataAvailable')}</LoadingContainer>
            )}
          </ChartCard>
        </ChartGrid>

        {/* Tenancy Operations — contract pipeline + expiring + billing gaps + forecast */}
        {tenancyOps && (
          <TenancyOpsSection>
            <TenancyOpsHeader>
              <h3>{t('foodcourt:foodcourtGeneralDashboard.tenancyOperations', 'Tenancy Operations')}</h3>
              <TenancyOpsSubtitle>
                {t('foodcourt:foodcourtGeneralDashboard.tenancyOpsSubtitle', 'Contract lifecycle, billing gaps, and revenue forecast')}
              </TenancyOpsSubtitle>
            </TenancyOpsHeader>

            {/* Pipeline funnel */}
            <FunnelRow>
              {(['proposal', 'contracting', 'setup', 'active', 'vacant'] as const).map((stage) => {
                const colors: Record<string, string> = {
                  proposal: '#8B5CF6', contracting: '#F97316', setup: '#3B82F6',
                  active: '#16A34A', vacant: '#6B7280'
                };
                const labels: Record<string, string> = {
                  proposal: t('foodcourt:foodcourtGeneralDashboard.stageProposal', 'Proposal'),
                  contracting: t('foodcourt:foodcourtGeneralDashboard.stageContracting', 'In Talks'),
                  setup: t('foodcourt:foodcourtGeneralDashboard.stageSetup', 'Setup'),
                  active: t('foodcourt:foodcourtGeneralDashboard.stageActive', 'Active'),
                  vacant: t('foodcourt:foodcourtGeneralDashboard.stageVacant', 'Vacant')
                };
                return (
                  <FunnelCell key={stage} $color={colors[stage]}>
                    <div className="label">{labels[stage]}</div>
                    <div className="count">{tenancyOps.pipeline?.[stage] ?? 0}</div>
                  </FunnelCell>
                );
              })}
              <FunnelTotal>
                <div className="label">{t('foodcourt:foodcourtGeneralDashboard.totalUnits', 'Total Units')}</div>
                <div className="count">{tenancyOps.pipeline?.total ?? 0}</div>
              </FunnelTotal>
            </FunnelRow>

            {/* Expiring + Billing Gaps side by side */}
            <TenancyOpsGrid>
              <OpsCard>
                <OpsCardHeader>
                  <h4>{t('foodcourt:foodcourtGeneralDashboard.expiringSoon', 'Expiring Soon')}</h4>
                  <OpsCardStats>
                    <span>{tenancyOps.expiring?.count_30d ?? 0} <small>{t('foodcourt:foodcourtGeneralDashboard.in30d', 'in 30d')}</small></span>
                    <span>·</span>
                    <span>{tenancyOps.expiring?.count_90d ?? 0} <small>{t('foodcourt:foodcourtGeneralDashboard.in90d', 'in 90d')}</small></span>
                  </OpsCardStats>
                </OpsCardHeader>
                {(tenancyOps.expiring?.list || []).length === 0 ? (
                  <OpsEmpty>{t('foodcourt:foodcourtGeneralDashboard.noExpiring', 'No contracts expiring soon.')}</OpsEmpty>
                ) : (
                  <OpsList>
                    {(tenancyOps.expiring.list as any[]).slice(0, 5).map((c) => (
                      <OpsListItem key={c.id} onClick={() => navigate(`/pos/foodcourt/tenancy?id=${c.id}`)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigate(`/pos/foodcourt/tenancy?id=${c.id}`); }}>
                        <div className="primary">
                          {c.contract_number || `#${c.id}`}
                          {c.applicant_company_name && <span className="sub"> · {c.applicant_company_name}</span>}
                        </div>
                        <OpsBadge $urgent={c.days_left <= 30}>
                          {c.days_left > 0 ? `${c.days_left}d` : t('foodcourt:foodcourtGeneralDashboard.overdue', 'overdue')}
                        </OpsBadge>
                      </OpsListItem>
                    ))}
                  </OpsList>
                )}
              </OpsCard>

              <OpsCard>
                <OpsCardHeader>
                  <h4>{t('foodcourt:foodcourtGeneralDashboard.billingGaps', 'Billing Gaps')}</h4>
                  <OpsCardStats>
                    <span>{tenancyOps.billing_gaps?.count ?? 0} <small>{t('foodcourt:foodcourtGeneralDashboard.unlinked', 'active w/o plan')}</small></span>
                  </OpsCardStats>
                </OpsCardHeader>
                {(tenancyOps.billing_gaps?.list || []).length === 0 ? (
                  <OpsEmpty>
                    {t('foodcourt:foodcourtGeneralDashboard.noBillingGaps', 'All active contracts have billing plans linked.')}
                  </OpsEmpty>
                ) : (
                  <OpsList>
                    {(tenancyOps.billing_gaps.list as any[]).slice(0, 5).map((c) => (
                      <OpsListItem key={c.id} onClick={() => navigate(`/pos/foodcourt/tenancy?id=${c.id}`)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigate(`/pos/foodcourt/tenancy?id=${c.id}`); }}>
                        <div className="primary">
                          {c.contract_number || `#${c.id}`}
                          {c.applicant_company_name && <span className="sub"> · {c.applicant_company_name}</span>}
                        </div>
                        <OpsBadge $urgent>
                          ! {t('foodcourt:foodcourtGeneralDashboard.noPlan', 'no plan')}
                        </OpsBadge>
                      </OpsListItem>
                    ))}
                  </OpsList>
                )}
              </OpsCard>

              {/* Revenue Forecast */}
              <OpsCard $highlight>
                <OpsCardHeader>
                  <h4>{t('foodcourt:foodcourtGeneralDashboard.revenueForecast', 'Revenue Forecast (Monthly)')}</h4>
                </OpsCardHeader>
                {tenancyOps.revenue_forecast?.financial_redacted ? (
                  <OpsEmpty>{t('foodcourt:foodcourtGeneralDashboard.forecastRedacted', 'Forecast hidden for your role')}</OpsEmpty>
                ) : (
                  <>
                    <ForecastValue>
                      {formatCurrency(tenancyOps.revenue_forecast?.estimated_monthly_fixed_floor || 0, tenancyOps.revenue_forecast?.currency || currency)}
                    </ForecastValue>
                    <ForecastMeta>
                      {tenancyOps.revenue_forecast?.active_plans_count ?? 0} {t('foodcourt:foodcourtGeneralDashboard.activePlansLinked', 'active plans linked')}
                    </ForecastMeta>
                    <ForecastNote>
                      {t('foodcourt:foodcourtGeneralDashboard.forecastNote', 'Fixed + combined min-guarantee only. Variable % portion depends on tenant revenue.')}
                    </ForecastNote>
                  </>
                )}
              </OpsCard>
            </TenancyOpsGrid>
          </TenancyOpsSection>
        )}

        {/* Tenant Performance Table */}
        <RecentOrdersSection>
          <h3>{t('foodcourt:foodcourtGeneralDashboard.tenantPerformance')}</h3>
          {topSubscriptions.length === 0 ? (
            <DataTableEmpty>{t('foodcourt:foodcourtGeneralDashboard.noTenantData', 'No tenant data available')}</DataTableEmpty>
          ) : (
            <DataTable>
              <DataTableHead>
                <tr>
                  <DataTableHeaderCell align="left">{t('foodcourt:foodcourtGeneralDashboard.tenant')}</DataTableHeaderCell>
                  <DataTableHeaderCell align="left">{t('foodcourt:foodcourtGeneralDashboard.plan')}</DataTableHeaderCell>
                  <DataTableHeaderCell align="right">{t('foodcourt:foodcourtGeneralDashboard.monthlyRevenue')}</DataTableHeaderCell>
                  <DataTableHeaderCell align="right">{t('foodcourt:foodcourtGeneralDashboard.orders')}</DataTableHeaderCell>
                  <DataTableHeaderCell align="right">{t('foodcourt:foodcourtGeneralDashboard.estimatedCharges')}</DataTableHeaderCell>
                  <DataTableHeaderCell align="left">{t('foodcourt:foodcourtGeneralDashboard.invoiceStatus')}</DataTableHeaderCell>
                </tr>
              </DataTableHead>
              <tbody>
                {topSubscriptions.map((sub: any, idx: number) => (
                  <DataTableRow key={idx}>
                    <DataTableCell data-label={t('foodcourt:foodcourtGeneralDashboard.tenant')} style={{ fontWeight: 600, color: '#0A2540' }}>
                      {sub.restaurant_branch_name ? `${sub.restaurant_name} (${sub.restaurant_branch_name})` : sub.restaurant_name || '-'}
                    </DataTableCell>
                    <DataTableCell data-label={t('foodcourt:foodcourtGeneralDashboard.plan')}>{sub.plan?.name || 'No Plan'}</DataTableCell>
                    <DataTableCell align="right" data-label={t('foodcourt:foodcourtGeneralDashboard.monthlyRevenue')}>{formatCurrency(sub.current_month?.revenue || 0, currency)}</DataTableCell>
                    <DataTableCell align="right" data-label={t('foodcourt:foodcourtGeneralDashboard.orders')}>{sub.current_month?.order_count || 0}</DataTableCell>
                    <DataTableCell align="right" data-label={t('foodcourt:foodcourtGeneralDashboard.estimatedCharges')}>{formatCurrency(sub.current_month?.estimated_charges || 0, currency)}</DataTableCell>
                    <DataTableCell data-label={t('foodcourt:foodcourtGeneralDashboard.invoiceStatus')}>
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

export default FoodcourtGeneralDashboard;
