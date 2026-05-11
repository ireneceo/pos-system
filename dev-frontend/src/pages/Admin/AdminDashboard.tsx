import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { DashboardStatsGrid, DashboardStatCard, DashboardStatLabel, DashboardStatValue } from '../../components/UI';
import { DataTable, DataTableHead, DataTableHeaderCell, DataTableRow, DataTableCell, DataTableEmpty } from '../../components/UI/DataTable';
import { Tabs, Tab } from '../../components/Common/TabComponents';
import { useTabParam } from '../../hooks/useTabParam';
import { formatCurrency } from '../../utils/currency';
import { formatDateTime } from '../../utils/timezone';
import { useStore } from '../../contexts/StoreContext';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { useRoleDisplayName } from '../../utils/roleDisplay';
import { SetupGuide, WelcomeModal } from '../../components/Common';
import { Walkthrough, TourTrigger, type TourStep } from '../../components/Walkthrough';
import { useSetupStatus } from '../../hooks/useSetupStatus';

import { getAuthToken } from '../../utils/auth';
interface CurrencyRevenue {
  [currency: string]: number;
}

interface BusinessMetrics {
  totalManagers: number;
  activeSubscriptions: number;
  totalRestaurants: number;
  monthlyRevenue: CurrencyRevenue;
  yearlyRevenue: CurrencyRevenue;
  cumulativeRevenue: CurrencyRevenue;
  averageRevenuePerUser: number;
  churnRate: number;
  growthRate: number;
  customerLifetimeValue: number;
  supportTickets: number;
  systemUptime: number;
  activeUsers: number;
  totalTransactions: number;
}

interface RevenueData {
  period: string;
  revenue: number;
  revenueByCurrency: CurrencyRevenue;
  invoiceCount: number;
}

interface Manager {
  id: string;
  companyName: string;
  email: string;
  planType: 'basic' | 'professional' | 'enterprise';
  subscriptionStatus: 'active' | 'trial' | 'expired';
  restaurantCount: number;
  totalRevenue: number;
  totalRevenueByCurrency: CurrencyRevenue;
  createdAt: string;
  lastActive: string;
  healthScore: number;
  riskLevel: 'low' | 'medium' | 'high';
}

// Normalize currency codes (MYR and RM are the same currency)
const normalizeCurrency = (code: string): string => {
  if (code === 'MYR' || code === 'RM') return 'MYR';
  return code;
};

// Merge same-currency entries after normalization
const mergeCurrencyRevenue = (byCurrency: CurrencyRevenue): CurrencyRevenue => {
  const merged: CurrencyRevenue = {};
  Object.entries(byCurrency).forEach(([cur, amount]) => {
    const normalized = normalizeCurrency(cur);
    merged[normalized] = (merged[normalized] || 0) + amount;
  });
  return merged;
};

// Helper: format multi-currency revenue as "RM 1,200 / $ 500 / ₩ 30,000"
const formatMultiCurrency = (byCurrency: CurrencyRevenue): string => {
  const merged = mergeCurrencyRevenue(byCurrency);
  const entries = Object.entries(merged).filter(([, amount]) => amount > 0);
  if (entries.length === 0) return formatCurrency(0, 'MYR');
  return entries.map(([currency, amount]) => formatCurrency(amount, currency)).join(' / ');
};

// Helper: get total for a specific currency from CurrencyRevenue
const getCurrencyTotal = (byCurrency: CurrencyRevenue, selectedCurrency: string): number => {
  const merged = mergeCurrencyRevenue(byCurrency);
  return merged[selectedCurrency] || 0;
};

// Helper: format currency revenue for display
const formatCurrencyDisplay = (byCurrency: CurrencyRevenue, selectedCurrency: string): { lines: { currency: string; amount: number }[]; single: boolean } => {
  const merged = mergeCurrencyRevenue(byCurrency);
  return {
    lines: [{ currency: selectedCurrency, amount: merged[selectedCurrency] || 0 }],
    single: true
  };
};

// Helper: get current date parts in a specific timezone
const getDatePartsInTimezone = (timezone: string): { year: number; month: number; day: number } => {
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-CA', { timeZone: timezone }); // YYYY-MM-DD
  const [year, month, day] = dateStr.split('-').map(Number);
  return { year, month: month - 1, day }; // month is 0-based like JS Date
};

// Helper: get date parts from a date string in a specific timezone
const getInvoiceDatePartsInTimezone = (dateStr: string, timezone: string): { year: number; month: number; day: number } => {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return { year: 0, month: -1, day: 0 };
  const formatted = date.toLocaleDateString('en-CA', { timeZone: timezone }); // YYYY-MM-DD
  const [year, month, day] = formatted.split('-').map(Number);
  return { year, month: month - 1, day };
};

// Helper: find the currency with most invoices (by count, not amount)
const getMostUsedCurrency = (invoices: any[], supportedCurs: string[]): string => {
  const counts: { [currency: string]: number } = {};
  invoices.forEach((inv: any) => {
    if (inv.status !== 'draft' && inv.status !== 'cancelled') {
      const cur = normalizeCurrency(inv.currency || 'MYR');
      counts[cur] = (counts[cur] || 0) + 1;
    }
  });
  let best = supportedCurs[0] || 'MYR';
  let bestCount = 0;
  supportedCurs.forEach(cur => {
    if ((counts[cur] || 0) > bestCount) {
      bestCount = counts[cur] || 0;
      best = cur;
    }
  });
  return best;
};

const CurrencyFilterBar = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

const CurrencyFilterBtn = styled.button<{ active: boolean }>`
  padding: 5px 14px;
  border-radius: 20px;
  border: 1px solid ${props => props.active ? '#635BFF' : '#E6EBF1'};
  background: ${props => props.active ? '#635BFF' : 'white'};
  color: ${props => props.active ? 'white' : '#6B7C93'};
  font-size: 13px;
  font-weight: ${props => props.active ? '600' : '500'};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #635BFF;
    color: ${props => props.active ? 'white' : '#635BFF'};
  }
`;

const CurrencyLines = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const CurrencyLine = styled.div<{ fontSize?: string }>`
  font-size: ${props => props.fontSize || '14px'};
  font-weight: 700;
  color: inherit;
  line-height: 1.3;
  white-space: nowrap;
`;

const Container = styled.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
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


const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 32px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
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

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: #CBD5E1;
    border-radius: 4px;
  }
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

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  }
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

    .icon {
      color: #0A2540;
    }

    .title {
      color: #0A2540;
    }
  }

  .icon {
    font-size: 32px;
    margin-bottom: 12px;
    color: #6B7C93;
  }

  .title {
    font-size: 14px;
    font-weight: 600;
    color: #425466;
    margin-bottom: 4px;
  }

  .description {
    font-size: 12px;
    color: #8898AA;
  }
`;

// Tabs and Tab components now imported from Common/TabComponents

const TableContainer = styled.div`
  background: white;
  border-radius: 0 0 16px 16px;
  border: 1px solid #E6EBF1;
  border-top: none;
  overflow: hidden;
`;

const CompanyInfo = styled.div`
  .name {
    font-weight: 600;
    color: #0A2540;
    margin-bottom: 4px;
  }

  .email {
    font-size: 13px;
    color: #6B7280;
  }
`;

const HealthScore = styled.div<{ score: number }>`
  display: flex;
  align-items: center;
  gap: 8px;

  .score {
    font-weight: 600;
    color: ${props => props.score >= 80 ? '#059669' : props.score >= 60 ? '#D97706' : '#DC2626'};
  }

  .bar {
    width: 60px;
    height: 6px;
    background: #F3F4F6;
    border-radius: 3px;
    overflow: hidden;

    &::after {
      content: '';
      display: block;
      width: ${props => props.score}%;
      height: 100%;
      background: ${props => props.score >= 80 ? '#059669' : props.score >= 60 ? '#D97706' : '#DC2626'};
      transition: width 0.3s ease;
    }
  }
`;

const Badge = styled.span<{ variant: string }>`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;

  ${props => {
    switch(props.variant) {
      case 'enterprise':
        return 'background: #EDE9FE; color: #5B21B6;';
      case 'professional':
        return 'background: #DBEAFE; color: #1E40AF;';
      case 'basic':
        return 'background: #F3F4F6; color: #6B7280;';
      case 'active':
        return 'background: #ECFDF5; color: #059669;';
      case 'trial':
        return 'background: #FEF3C7; color: #D97706;';
      case 'expired':
        return 'background: #FEE2E2; color: #DC2626;';
      case 'low':
        return 'background: #ECFDF5; color: #059669;';
      case 'medium':
        return 'background: #FEF3C7; color: #D97706;';
      case 'high':
        return 'background: #FEE2E2; color: #DC2626;';
      default:
        return 'background: #F3F4F6; color: #6B7280;';
    }
  }}
`;

// Unused component - commented out for future use if needed
// const ActionButton = styled.button`
//   padding: 6px 12px;
//   background: transparent;
//   border: 1px solid #E6EBF1;
//   border-radius: 6px;
//   color: #6B7280;
//   font-size: 13px;
//   font-weight: 500;
//   cursor: pointer;
//   transition: all 0.2s;
//   margin-right: 8px;
//
//   &:hover {
//     border-color: #635BFF;
//     color: #635BFF;
//     background: #F4F3FF;
//   }
// `;

// System Admin walkthrough — 5 step over sidebar items + header trigger.
const adminTourSteps = (t: (k: string, fallback?: string) => string): TourStep[] => ([
  {
    selector: '[data-tour="sidebar-admin-settings"]',
    title: t('walkthrough:admin.step1.title', 'Set platform company info'),
    description: t('walkthrough:admin.step1.description', "Configure the platform operator's business details."),
    position: 'right'
  },
  {
    selector: '[data-tour="sidebar-admin-site-settings"]',
    title: t('walkthrough:admin.step2.title', 'Configure SMTP & email'),
    description: t('walkthrough:admin.step2.description', 'Set up the outbound email server for notifications and invoices.'),
    position: 'right'
  },
  {
    selector: '[data-tour="sidebar-admin-plans"]',
    title: t('walkthrough:admin.step3.title', 'Create subscription plan templates'),
    description: t('walkthrough:admin.step3.description', 'Define the plans customers can subscribe to.'),
    position: 'right'
  },
  {
    selector: '[data-tour="sidebar-admin-payment"]',
    title: t('walkthrough:admin.step4.title', 'Enable a payment channel'),
    description: t('walkthrough:admin.step4.description', 'Turn on at least one payment channel so customers can pay subscription invoices.'),
    position: 'right'
  },
  {
    selector: '[data-tour="header-tour-trigger"]',
    title: t('walkthrough:admin.step5.title', 'Replay anytime'),
    description: t('walkthrough:admin.step5.description', 'Use Show me around in the header to revisit this tour whenever you need.'),
    position: 'bottom'
  }
]);

const AdminDashboard: React.FC = () => {
  const { t } = useTranslation('admin');
  const displayRole = useRoleDisplayName();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { operationSettings, siteTimezone } = useStore();
  const { items: setupItems } = useSetupStatus({ role: user?.role || '' });
  const [activeTab, handleTabChange] = useTabParam<'overview' | 'performance' | 'health' | 'system'>('overview');
  const [managers, setManagers] = useState<Manager[]>([]);
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [invoicesData, setInvoicesData] = useState<any[]>([]);
  const [timePeriod, setTimePeriod] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  const [selectedCurrency, setSelectedCurrency] = useState<string>('');
  const [supportedCurrencies, setSupportedCurrencies] = useState<string[]>([]);
  const [systemLogAlerts, setSystemLogAlerts] = useState<{ criticalCount: number; errorCount: number; total: number }>({ criticalCount: 0, errorCount: 0, total: 0 });

  // Today's date string in site timezone (YYYY-MM-DD) for alerts
  const todayInTz = useMemo(() => {
    try {
      return new Date().toLocaleDateString('en-CA', { timeZone: siteTimezone || 'Asia/Kuala_Lumpur' });
    } catch { return new Date().toISOString().split('T')[0]; }
  }, [siteTimezone]);
  const [metrics, setMetrics] = useState<BusinessMetrics>({
    totalManagers: 0,
    activeSubscriptions: 0,
    totalRestaurants: 0,
    monthlyRevenue: {},
    yearlyRevenue: {},
    cumulativeRevenue: {},
    averageRevenuePerUser: 0,
    churnRate: 0,
    growthRate: 0,
    customerLifetimeValue: 0,
    supportTickets: 0,
    systemUptime: 99.9,
    activeUsers: 0,
    totalTransactions: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {

        const token = getAuthToken();
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        };

        // Fetch managers
        const usersResponse = await fetch('/api/users?role=Manager', { headers });
        if (!usersResponse.ok) {
          throw new Error('Failed to fetch users');
        }
        const usersData = await usersResponse.json();
        const managerUsersRaw = usersData.data || usersData;
        const managerUsers = managerUsersRaw.filter((u: any) => !u.is_demo && !u.is_test);

        // Fetch restaurants
        const restaurantsResponse = await fetch('/api/restaurants', { headers });
        if (!restaurantsResponse.ok) {
          throw new Error('Failed to fetch restaurants');
        }
        const restaurantsData = await restaurantsResponse.json();
        const allRestaurantsRaw = restaurantsData.data || restaurantsData;
        const allRestaurants = allRestaurantsRaw.filter((r: any) => !r.is_demo && !r.is_test);

        // Convert restaurants to subscription data (same as SubscriptionsPage)
        let subscriptionsData = [];
        if (allRestaurants && allRestaurants.length > 0) {
          subscriptionsData = allRestaurants.map((restaurant: any) => {
            // Map restaurant status to subscription status
            let subscriptionStatus = 'active';
            if (restaurant.status === 'active') subscriptionStatus = 'active';
            else if (restaurant.status === 'inactive') subscriptionStatus = 'suspended';

            return {
              status: subscriptionStatus,
              restaurantId: restaurant.id,
              restaurantName: restaurant.name
            };
          });
        }

        // Calculate system transactions (manager + restaurant activities)

        // Fetch supported currencies from payment settings
        let supportedCurs: string[] = [];
        try {
          const currencyRes = await fetch('/api/currencies/supported', { headers });
          if (currencyRes.ok) {
            const currencyData = await currencyRes.json();
            supportedCurs = (currencyData.data || currencyData || []).map((c: any) =>
              normalizeCurrency(typeof c === 'string' ? c : c.code)
            );
          }
        } catch (e) {
          console.error('Error fetching supported currencies:', e);
        }
        if (supportedCurs.length === 0) supportedCurs = ['RM'];
        // Deduplicate (MYR and RM both normalize to RM)
        supportedCurs = Array.from(new Set(supportedCurs));
        setSupportedCurrencies(supportedCurs);

        // Fetch system log alerts summary (24h critical/error)
        try {
          const alertsRes = await fetch('/api/system-logs/alerts-summary', { headers });
          if (alertsRes.ok) {
            const alertsData = await alertsRes.json();
            if (alertsData.success) {
              setSystemLogAlerts(alertsData.data);
            }
          }
        } catch (e) {
          console.error('Error fetching system log alerts:', e);
        }

        // Fetch invoices for revenue data
        const invoicesResponse = await fetch('/api/invoices', { headers });
        let currentInvoicesData: any[] = [];
        let revenueDataArray: RevenueData[] = [];
        const cumulativeRevenueByCurrency: CurrencyRevenue = {};

        if (invoicesResponse.ok) {
          const invoices = await invoicesResponse.json();
          currentInvoicesData = invoices.data || invoices;
          setInvoicesData(currentInvoicesData);

          // Set default currency to highest-revenue if not yet set
          if (!selectedCurrency) {
            const bestCur = getMostUsedCurrency(currentInvoicesData, supportedCurs);
            setSelectedCurrency(bestCur);
          }

          // Calculate total revenue from completed invoices only, grouped by currency
          const completedInvoices = currentInvoicesData.filter((invoice: any) =>
            invoice.status === 'completed' || invoice.status === 'paid'
          );

          completedInvoices.forEach((invoice: any) => {
            const amount = parseFloat(invoice.total || invoice.total_amount || invoice.amount || 0);
            const cur = invoice.currency || 'MYR';
            cumulativeRevenueByCurrency[cur] = (cumulativeRevenueByCurrency[cur] || 0) + amount;
          });


          // Calculate revenue data by period
          const revenueByPeriod = new Map<string, { revenue: number, revenueByCurrency: CurrencyRevenue, count: number }>();
          const now = new Date();

          // Generate period keys based on selected time period
          let periods: string[] = [];

          if (timePeriod === 'week') {
            // Last 7 days
            for (let i = 6; i >= 0; i--) {
              const date = new Date(now);
              date.setDate(now.getDate() - i);
              periods.push(date.toISOString().split('T')[0]);
            }
          } else if (timePeriod === 'month') {
            // Last 12 weeks (3 months)
            for (let i = 11; i >= 0; i--) {
              const date = new Date(now);
              date.setDate(now.getDate() - (i * 7));
              const weekStart = new Date(date);
              weekStart.setDate(date.getDate() - date.getDay());
              periods.push(`W${Math.floor(i/4) + 1}-${weekStart.getMonth() + 1}/${weekStart.getDate()}`);
            }
          } else if (timePeriod === 'quarter') {
            // Last 6 months
            for (let i = 5; i >= 0; i--) {
              const date = new Date(now);
              date.setMonth(now.getMonth() - i);
              periods.push(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`);
            }
          } else { // year
            // Last 12 months
            for (let i = 11; i >= 0; i--) {
              const date = new Date(now);
              date.setMonth(now.getMonth() - i);
              periods.push(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`);
            }
          }

          // Initialize all periods with 0
          periods.forEach(period => {
            revenueByPeriod.set(period, { revenue: 0, revenueByCurrency: {}, count: 0 });
          });

          currentInvoicesData.forEach((invoice: any) => {
            const date = new Date(invoice.issueDate || invoice.createdAt || invoice.created_at);
            let periodKey = '';

            if (timePeriod === 'week') {
              periodKey = date.toISOString().split('T')[0];
            } else if (timePeriod === 'month') {
              // Find which week this belongs to
              const weekStart = new Date(date);
              weekStart.setDate(date.getDate() - date.getDay());
              const weeksFromNow = Math.floor((now.getTime() - weekStart.getTime()) / (7 * 24 * 60 * 60 * 1000));
              if (weeksFromNow < 12) {
                periodKey = `W${Math.floor(weeksFromNow/4) + 1}-${weekStart.getMonth() + 1}/${weekStart.getDate()}`;
              }
            } else if (timePeriod === 'quarter') {
              periodKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            } else { // year
              periodKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            }

            if (periodKey && revenueByPeriod.has(periodKey)) {
              const amount = parseFloat(invoice.total_amount || invoice.amount || invoice.total || 0);
              const cur = invoice.currency || 'MYR';
              const existing = revenueByPeriod.get(periodKey)!;
              const updatedByCurrency = { ...existing.revenueByCurrency };
              updatedByCurrency[cur] = (updatedByCurrency[cur] || 0) + amount;
              revenueByPeriod.set(periodKey, {
                revenue: existing.revenue + amount,
                revenueByCurrency: updatedByCurrency,
                count: existing.count + 1
              });
            }
          });

          revenueDataArray = Array.from(revenueByPeriod.entries())
            .map(([period, data]) => ({
              period,
              revenue: data.revenue,
              revenueByCurrency: data.revenueByCurrency,
              invoiceCount: data.count
            }))
            .sort((a, b) => {
              if (timePeriod === 'year') {
                return parseInt(a.period) - parseInt(b.period);
              }
              return a.period.localeCompare(b.period);
            });
        }

        // Fetch support tickets for system health
        let supportTicketsCount = 0;
        try {
          const ticketsResponse = await fetch('/api/support-tickets', { headers });
          if (ticketsResponse.ok) {
            const ticketsData = await ticketsResponse.json();
            supportTicketsCount = (ticketsData.data || ticketsData || []).length;
          }
        } catch (error) {
          console.error('Error fetching support tickets:', error);
          supportTicketsCount = 0;
        }

        setRevenueData(revenueDataArray);

        // Transform data
        const managersData: Manager[] = (managerUsers || []).map((user: any) => {
          const managerRestaurants = (allRestaurants || []).filter((restaurant: any) =>
            restaurant.managerId === user.id.toString() ||
            restaurant.admin_id === parseInt(user.id) ||
            parseInt(restaurant.managerId) === user.id ||
            restaurant.managerId === user.id
          );


          // Calculate real revenue from invoices for this manager's restaurants
          const managerRestaurantIds = managerRestaurants.map((r: any) => r.id);
          const managerInvoices = currentInvoicesData.filter((inv: any) =>
            managerRestaurantIds.includes(inv.restaurant_id || inv.restaurantId)
          );
          const paidInvoices = managerInvoices.filter((inv: any) => inv.status === 'paid' || inv.status === 'completed');
          const totalRevenue = paidInvoices.reduce((sum: number, inv: any) =>
            sum + (parseFloat(inv.total_amount || inv.amount || inv.total || '0')), 0);
          const totalRevenueByCurrency: CurrencyRevenue = {};
          paidInvoices.forEach((inv: any) => {
            const amt = parseFloat(inv.total_amount || inv.amount || inv.total || '0');
            const cur = inv.currency || 'MYR';
            totalRevenueByCurrency[cur] = (totalRevenueByCurrency[cur] || 0) + amt;
          });
          const subscriptionStatus = managerRestaurants.length > 0 ? 'active' : 'trial';
          // Health score based on payment behavior
          const overdueInvoices = managerInvoices.filter((inv: any) => inv.status === 'overdue');
          const healthScore = managerInvoices.length === 0 ? 70 :
            Math.max(0, Math.min(100, Math.round(100 - (overdueInvoices.length / Math.max(managerInvoices.length, 1)) * 100)));
          const riskLevel = healthScore >= 80 ? 'low' : healthScore >= 60 ? 'medium' : 'high';

          return {
            id: `mgr-${user.id}`,
            companyName: user.full_name || user.username || 'Manager Company',
            email: user.email,
            planType: managerRestaurants.length > 5 ? 'enterprise' :
                     managerRestaurants.length > 2 ? 'professional' : 'basic',
            subscriptionStatus: subscriptionStatus as 'active' | 'trial' | 'expired',
            restaurantCount: managerRestaurants.length,
            totalRevenue: totalRevenue,
            totalRevenueByCurrency: totalRevenueByCurrency,
            createdAt: user.createdAt ? new Date(user.createdAt).toISOString().split('T')[0] : '2024-01-01',
            lastActive: new Date().toISOString().split('T')[0],
            healthScore,
            riskLevel: riskLevel as 'low' | 'medium' | 'high'
          };
        });

        setManagers(managersData);

        // Calculate comprehensive metrics using real data
        const totalManagers = managersData.length;
        const activeSubscriptions = subscriptionsData.filter((s: any) => s.status === 'active').length;
        const totalRestaurants = allRestaurants?.length || managersData.reduce((sum, m) => sum + m.restaurantCount, 0);
        // Calculate monthly revenue from paid invoices only (this month), grouped by currency
        // Use site timezone for date comparisons
        const tz = siteTimezone || 'Asia/Kuala_Lumpur';
        const { year: thisYear, month: thisMonth } = getDatePartsInTimezone(tz);
        const paidInvoices = currentInvoicesData.filter((invoice: any) =>
          invoice.status === 'completed' || invoice.status === 'paid'
        );
        const monthlyPaidInvoices = paidInvoices.filter((invoice: any) => {
          const dateStr = invoice.issueDate || invoice.issued_at || invoice.createdAt;
          const { year, month } = getInvoiceDatePartsInTimezone(dateStr, tz);
          return month === thisMonth && year === thisYear;
        });

        const monthlyRevenue: CurrencyRevenue = {};
        monthlyPaidInvoices.forEach((invoice: any) => {
          const amount = parseFloat(invoice.total || invoice.total_amount || invoice.amount || '0');
          const cur = invoice.currency || 'MYR';
          monthlyRevenue[cur] = (monthlyRevenue[cur] || 0) + amount;
        });

        // This year revenue from paid invoices, grouped by currency
        const yearlyPaidInvoices = paidInvoices.filter((invoice: any) => {
          const dateStr = invoice.issueDate || invoice.issued_at || invoice.createdAt;
          const { year } = getInvoiceDatePartsInTimezone(dateStr, tz);
          return year === thisYear;
        });

        const yearlyRevenue: CurrencyRevenue = {};
        yearlyPaidInvoices.forEach((invoice: any) => {
          const amount = parseFloat(invoice.total || invoice.total_amount || invoice.amount || '0');
          const cur = invoice.currency || 'MYR';
          yearlyRevenue[cur] = (yearlyRevenue[cur] || 0) + amount;
        });

        // Total cumulative revenue (all time paid invoices) - already grouped above
        const cumulativeRevenue = cumulativeRevenueByCurrency;
        const monthlyRevenueTotal = Object.values(monthlyRevenue).reduce((a, b) => a + b, 0);
        const averageRevenuePerUser = totalManagers > 0 ? monthlyRevenueTotal / totalManagers : 0;
        // Calculate real metrics from data
        const totalSubscriptions = subscriptionsData.length;
        const churnRate = totalSubscriptions > 0 ? ((subscriptionsData.filter((s: any) => s.status === 'cancelled').length / totalSubscriptions) * 100) : 0;
        const growthRate = totalManagers > 0 ? ((totalRestaurants / totalManagers - 1) * 100) : 0;
        const customerLifetimeValue = averageRevenuePerUser * 12; // Annual revenue
        const activeUsers = activeSubscriptions; // Active subscription holders
        // Calculate monthly system transactions (timezone-aware)
        const { year: currentYear, month: currentMonth } = getDatePartsInTimezone(tz);

        // Count manager activities this month
        const managerActivities = managersData.filter((manager: any) => {
          if (!manager.createdAt) return false;
          const { year, month } = getInvoiceDatePartsInTimezone(manager.createdAt, tz);
          return month === currentMonth && year === currentYear;
        }).length;

        // Count restaurant activities this month
        const restaurantActivities = allRestaurants.filter((restaurant: any) => {
          if (!restaurant.createdAt) return false;
          const { year, month } = getInvoiceDatePartsInTimezone(restaurant.createdAt, tz);
          return month === currentMonth && year === currentYear;
        }).length;

        // Count invoice activities this month
        const invoiceActivities = currentInvoicesData.filter((invoice: any) => {
          if (!invoice.createdAt) return false;
          const { year, month } = getInvoiceDatePartsInTimezone(invoice.createdAt, tz);
          return month === currentMonth && year === currentYear;
        }).length;

        const totalTransactions = managerActivities + restaurantActivities + invoiceActivities;

        setMetrics({
          totalManagers,
          activeSubscriptions,
          totalRestaurants,
          monthlyRevenue,
          yearlyRevenue,
          cumulativeRevenue,
          averageRevenuePerUser,
          churnRate,
          growthRate,
          customerLifetimeValue,
          supportTickets: supportTicketsCount,
          systemUptime: 99.9,
          activeUsers,
          totalTransactions
        });

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // No fake fallback data - show zeros when API fails
      }
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timePeriod, siteTimezone]);

  return (
    <>
      <Container>
        <Walkthrough tourKey="admin_dashboard" steps={adminTourSteps(t)} version={1} autoStart />
        <Header>
          <Title>{t('admin:adminDashboard.adminDashboard')}</Title>
          <TourTrigger tourKey="admin_dashboard" />
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
          {setupItems.length > 0 && <SetupGuide items={setupItems} entityId={user?.id} />}
          {/* Currency Filter - only show supported currencies from payment settings */}
          {supportedCurrencies.length > 0 && (
            <CurrencyFilterBar>
              <span style={{ fontSize: '13px', color: '#6B7C93', fontWeight: 500, marginRight: '4px' }}>Currency:</span>
              {supportedCurrencies.map(cur => (
                <CurrencyFilterBtn
                  key={cur}
                  active={selectedCurrency === cur}
                  onClick={() => setSelectedCurrency(cur)}
                >
                  {cur}
                </CurrencyFilterBtn>
              ))}
            </CurrencyFilterBar>
          )}

          <DashboardStatsGrid>
          <DashboardStatCard
            color="#F59E0B"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/pos/admin/report')}
          >
            <DashboardStatLabel>{t('admin:adminDashboard.monthlyRevenue')}</DashboardStatLabel>
            <DashboardStatValue>
              {(() => {
                const display = formatCurrencyDisplay(metrics.monthlyRevenue, selectedCurrency);
                if (display.single) return formatCurrency(display.lines[0].amount, display.lines[0].currency);
                return (
                  <CurrencyLines>
                    {display.lines.map(l => (
                      <CurrencyLine key={l.currency} fontSize={display.lines.length > 2 ? '14px' : '16px'}>
                        {formatCurrency(l.amount, l.currency)}
                      </CurrencyLine>
                    ))}
                  </CurrencyLines>
                );
              })()}
            </DashboardStatValue>
          </DashboardStatCard>

          <DashboardStatCard
            color="#059669"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/pos/admin/report')}
          >
            <DashboardStatLabel>{t('admin:adminDashboard.thisYearRevenue')}</DashboardStatLabel>
            <DashboardStatValue>
              {(() => {
                const display = formatCurrencyDisplay(metrics.yearlyRevenue, selectedCurrency);
                if (display.single) return formatCurrency(display.lines[0].amount, display.lines[0].currency);
                return (
                  <CurrencyLines>
                    {display.lines.map(l => (
                      <CurrencyLine key={l.currency} fontSize={display.lines.length > 2 ? '14px' : '16px'}>
                        {formatCurrency(l.amount, l.currency)}
                      </CurrencyLine>
                    ))}
                  </CurrencyLines>
                );
              })()}
            </DashboardStatValue>
          </DashboardStatCard>

          <DashboardStatCard
            color="#10B981"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/pos/admin/report')}
          >
            <DashboardStatLabel>{t('admin:adminDashboard.cumulativeRevenue')}</DashboardStatLabel>
            <DashboardStatValue>
              {(() => {
                const display = formatCurrencyDisplay(metrics.cumulativeRevenue, selectedCurrency);
                if (display.single) return formatCurrency(display.lines[0].amount, display.lines[0].currency);
                return (
                  <CurrencyLines>
                    {display.lines.map(l => (
                      <CurrencyLine key={l.currency} fontSize={display.lines.length > 2 ? '14px' : '16px'}>
                        {formatCurrency(l.amount, l.currency)}
                      </CurrencyLine>
                    ))}
                  </CurrencyLines>
                );
              })()}
            </DashboardStatValue>
          </DashboardStatCard>

          <DashboardStatCard
            color="#2563EB"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/pos/admin/managers')}
          >
            <DashboardStatLabel>{t('admin:adminDashboard.totalManagers')}</DashboardStatLabel>
            <DashboardStatValue>{metrics.totalManagers}</DashboardStatValue>
          </DashboardStatCard>

          <DashboardStatCard
            color="#7C3AED"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/pos/admin/subscriptions')}
          >
            <DashboardStatLabel>{t('admin:adminDashboard.activeSubscriptions')}</DashboardStatLabel>
            <DashboardStatValue>{metrics.activeSubscriptions}</DashboardStatValue>
          </DashboardStatCard>

          <DashboardStatCard
            color="#6366F1"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/pos/admin/restaurants')}
          >
            <DashboardStatLabel>{t('admin:adminDashboard.totalRestaurants')}</DashboardStatLabel>
            <DashboardStatValue>{metrics.totalRestaurants}</DashboardStatValue>
          </DashboardStatCard>


          <DashboardStatCard
            color="#8B5CF6"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/pos/admin/support')}
          >
            <DashboardStatLabel>{t('admin:adminDashboard.supportTickets')}</DashboardStatLabel>
            <DashboardStatValue>{metrics.supportTickets}</DashboardStatValue>
          </DashboardStatCard>

          <DashboardStatCard
            color="#EF4444"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/pos/admin/managers')}
          >
            <DashboardStatLabel>{t('admin:adminDashboard.activeUsers')}</DashboardStatLabel>
            <DashboardStatValue>{metrics.activeUsers}</DashboardStatValue>
          </DashboardStatCard>


        </DashboardStatsGrid>

        <MainGrid>
          <ChartContainer>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3>{t('admin:adminDashboard.revenueGrowthAnalytics')}</h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setTimePeriod('week')}
                  style={{
                    padding: '6px 12px',
                    background: timePeriod === 'week' ? '#635BFF' : 'transparent',
                    color: timePeriod === 'week' ? 'white' : '#6B7280',
                    border: '1px solid #E6EBF1',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '13px'
                  }}
                >
                  Week
                </button>
                <button
                  onClick={() => setTimePeriod('month')}
                  style={{
                    padding: '6px 12px',
                    background: timePeriod === 'month' ? '#635BFF' : 'transparent',
                    color: timePeriod === 'month' ? 'white' : '#6B7280',
                    border: '1px solid #E6EBF1',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '13px'
                  }}
                >
                  Month
                </button>
                <button
                  onClick={() => setTimePeriod('quarter')}
                  style={{
                    padding: '6px 12px',
                    background: timePeriod === 'quarter' ? '#635BFF' : 'transparent',
                    color: timePeriod === 'quarter' ? 'white' : '#6B7280',
                    border: '1px solid #E6EBF1',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '13px'
                  }}
                >
                  Quarter
                </button>
                <button
                  onClick={() => setTimePeriod('year')}
                  style={{
                    padding: '6px 12px',
                    background: timePeriod === 'year' ? '#635BFF' : 'transparent',
                    color: timePeriod === 'year' ? 'white' : '#6B7280',
                    border: '1px solid #E6EBF1',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '13px'
                  }}
                >
                  Year
                </button>
              </div>
            </div>

            <div style={{ padding: '20px', background: '#F8FAFC', borderRadius: '12px', minHeight: '160px' }}>
              {revenueData.length > 0 ? (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', height: '120px', gap: '8px', marginBottom: '16px' }}>
                    {revenueData.map((data) => {
                      const barRevenue = getCurrencyTotal(data.revenueByCurrency, selectedCurrency);
                      const maxRevenue = Math.max(...revenueData.map(d => getCurrencyTotal(d.revenueByCurrency, selectedCurrency)));
                      return (
                        <div key={data.period} style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          flex: 1
                        }}>
                          <div
                            style={{
                              width: '100%',
                              maxWidth: '40px',
                              height: `${maxRevenue > 0 ? Math.max(4, (barRevenue / maxRevenue) * 80) : 4}px`,
                              background: barRevenue > 0 ? '#635BFF' : '#E5E7EB',
                              borderRadius: '4px 4px 0 0',
                              marginBottom: '8px'
                            }}
                            title={`${data.period}: ${formatCurrency(barRevenue, selectedCurrency)}`}
                          />
                          <div style={{ fontSize: '11px', color: '#6B7280', textAlign: 'center' }}>
                            {timePeriod === 'week'
                              ? formatDateTime(data.period, null, { month: 'short', day: 'numeric' })
                              : timePeriod === 'month'
                              ? data.period.replace('W1-', '').replace('W2-', '').replace('W3-', '').replace('W4-', '')
                              : timePeriod === 'quarter'
                              ? formatDateTime(data.period + '-01', null, { month: 'short', year: '2-digit' })
                              : formatDateTime(data.period + '-01', null, { month: 'short', year: '2-digit' })
                            }
                          </div>
                          <div style={{ fontSize: '10px', color: '#6B7280', textAlign: 'center' }}>
                            {barRevenue > 0
                              ? formatCurrency(barRevenue, selectedCurrency)
                              : '-'
                            }
                          </div>
                          <div style={{ fontSize: '9px', color: '#9CA3AF', textAlign: 'center' }}>
                            {data.invoiceCount || 0} inv
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid #E5E7EB' }}>
                    <div style={{ fontSize: '13px', color: '#6B7280' }}>
                      {timePeriod === 'week' ? 'Last 7 days' :
                       timePeriod === 'month' ? 'Last 12 weeks' :
                       timePeriod === 'quarter' ? 'Last 6 months' :
                       'Last 12 months'}
                      <span style={{ marginLeft: '8px', color: '#635BFF', fontWeight: 600 }}>({selectedCurrency})</span>
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: '#059669' }}>
                      {(() => {
                        const getRevForPeriod = (d: RevenueData) => getCurrencyTotal(d.revenueByCurrency, selectedCurrency);
                        const firstPeriod = revenueData.find(d => getRevForPeriod(d) > 0);
                        const lastPeriod = revenueData[revenueData.length - 1];
                        if (firstPeriod && lastPeriod && getRevForPeriod(firstPeriod) > 0) {
                          const growth = ((getRevForPeriod(lastPeriod) - getRevForPeriod(firstPeriod)) / getRevForPeriod(firstPeriod)) * 100;
                          return growth > 0 ? `+${growth.toFixed(1)}%` : growth < 0 ? `${growth.toFixed(1)}%` : '0%';
                        }
                        return 'No change';
                      })()}
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', color: '#6B7280', paddingTop: '40px' }}>
                  <p>Total Revenue: {formatMultiCurrency(metrics.monthlyRevenue)}</p>
                  <p>Growth Rate: +{metrics.growthRate.toFixed(1)}% YoY</p>
                  <p>{t('admin:adminDashboard.invoiceDataLoading')}</p>
                </div>
              )}
            </div>
          </ChartContainer>

          <AlertsPanel>
            <h3>{t('admin:adminDashboard.notifications')}</h3>
            <AlertsList>
              {/* System Log Alerts - Critical/Error in last 24h */}
              {systemLogAlerts.total > 0 && (
                <Alert
                  type={systemLogAlerts.criticalCount > 0 ? 'error' : 'warning'}
                  onClick={() => navigate('/pos/admin/logs')}
                >
                  <AlertContent>
                    <AlertTitle type={systemLogAlerts.criticalCount > 0 ? 'error' : 'warning'}>
                      {systemLogAlerts.criticalCount > 0 ? 'Critical System Alerts' : 'System Error Alerts'}
                    </AlertTitle>
                    <AlertDescription>
                      {systemLogAlerts.criticalCount > 0 && `${systemLogAlerts.criticalCount} critical`}
                      {systemLogAlerts.criticalCount > 0 && systemLogAlerts.errorCount > 0 && ', '}
                      {systemLogAlerts.errorCount > 0 && `${systemLogAlerts.errorCount} error`}
                      {' '}log(s) in the last 24 hours - Click to investigate
                    </AlertDescription>
                  </AlertContent>
                </Alert>
              )}

              {/* New Manager Alert - Today's new managers */}
              {managers.filter((m: any) => {
                try { return new Date(m.createdAt).toLocaleDateString('en-CA', { timeZone: siteTimezone }) === todayInTz; } catch { return false; }
              }).length > 0 && (
                <Alert type="info" onClick={() => navigate('/pos/admin/managers')}>
                  <AlertContent>
                    <AlertTitle type="info">{t('admin:adminDashboard.newManagerRegistration')}</AlertTitle>
                    <AlertDescription>{managers.filter((m: any) => {
                      try { return new Date(m.createdAt).toLocaleDateString('en-CA', { timeZone: siteTimezone }) === todayInTz; } catch { return false; }
                    }).length} new manager(s) registered today - Click to view</AlertDescription>
                  </AlertContent>
                </Alert>
              )}

              {/* Support Tickets Alert */}
              {metrics.supportTickets > 0 && (
                <Alert type="warning" onClick={() => navigate('/pos/admin/support')}>
                  <AlertContent>
                    <AlertTitle type="warning">{t('admin:adminDashboard.supportTicketsPending')}</AlertTitle>
                    <AlertDescription>{metrics.supportTickets} open support ticket(s) require attention - Click to view</AlertDescription>
                  </AlertContent>
                </Alert>
              )}

              {/* Revenue Alert - When new revenue is generated today */}
              {invoicesData.filter((invoice: any) => {
                try { return new Date(invoice.createdAt).toLocaleDateString('en-CA', { timeZone: siteTimezone }) === todayInTz; } catch { return false; }
              }).length > 0 && (
                <Alert type="info" onClick={() => navigate('/pos/admin/report')}>
                  <AlertContent>
                    <AlertTitle type="info">{t('admin:adminDashboard.newRevenueGenerated')}</AlertTitle>
                    <AlertDescription>
                      {(() => {
                        const todayInvoices = invoicesData.filter((invoice: any) => {
                          try { return new Date(invoice.createdAt).toLocaleDateString('en-CA', { timeZone: siteTimezone }) === todayInTz; } catch { return false; }
                        });
                        const byCurrency: CurrencyRevenue = {};
                        todayInvoices.forEach((inv: any) => {
                          const amt = parseFloat(inv.total_amount || inv.amount || 0);
                          const cur = inv.currency || 'MYR';
                          byCurrency[cur] = (byCurrency[cur] || 0) + amt;
                        });
                        return formatMultiCurrency(byCurrency);
                      })()}
                      {' '}earned today from {invoicesData.filter((invoice: any) => {
                        try { return new Date(invoice.createdAt).toLocaleDateString('en-CA', { timeZone: siteTimezone }) === todayInTz; } catch { return false; }
                      }).length} transaction(s) - Click to view details
                    </AlertDescription>
                  </AlertContent>
                </Alert>
              )}

              {/* No alerts - All Clear */}
              {systemLogAlerts.total === 0 &&
              managers.filter((m: any) => {
                try { return new Date(m.createdAt).toLocaleDateString('en-CA', { timeZone: siteTimezone }) === todayInTz; } catch { return false; }
              }).length === 0 &&
              metrics.supportTickets === 0 &&
              invoicesData.filter((invoice: any) => {
                try { return new Date(invoice.createdAt).toLocaleDateString('en-CA', { timeZone: siteTimezone }) === todayInTz; } catch { return false; }
              }).length === 0 && (
                <Alert type="success" onClick={() => {}}>
                  <AlertContent>
                    <AlertTitle type="success">{t('admin:adminDashboard.allClear')}</AlertTitle>
                    <AlertDescription>{t('admin:adminDashboard.noNewActivitiesAllSystemsRunningSmoothly')}</AlertDescription>
                  </AlertContent>
                </Alert>
              )}
            </AlertsList>
          </AlertsPanel>
        </MainGrid>

        {/* Quick Actions */}
        <QuickActionsSection>
          <h3>{t('admin:adminDashboard.quickActions')}</h3>
          <QuickActionsGrid>
            <QuickActionCard onClick={() => navigate('/pos/admin/restaurants')}>
              <div className="icon">◐</div>
              <div className="title">{t('admin:adminDashboard.restaurants')}</div>
              <div className="description">{t('admin:adminDashboard.manageAllRestaurants')}</div>
            </QuickActionCard>
            <QuickActionCard onClick={() => navigate('/pos/admin/invoices')}>
              <div className="icon">▦</div>
              <div className="title">{t('admin:adminDashboard.invoices')}</div>
              <div className="description">{t('admin:adminDashboard.invoiceManagement')}</div>
            </QuickActionCard>
            <QuickActionCard onClick={() => navigate('/pos/admin/notices')}>
              <div className="icon">◈</div>
              <div className="title">{t('admin:adminDashboard.notices')}</div>
              <div className="description">{t('admin:adminDashboard.communicationHub')}</div>
            </QuickActionCard>
            <QuickActionCard onClick={() => navigate('/pos/admin/report')}>
              <div className="icon">☰</div>
              <div className="title">{t('admin:adminDashboard.report')}</div>
              <div className="description">{t('admin:adminDashboard.platformAnalytics')}</div>
            </QuickActionCard>
          </QuickActionsGrid>
        </QuickActionsSection>

        <Tabs>
          <Tab active={activeTab === 'overview'} onClick={() => handleTabChange('overview')}>
            Manager Overview
          </Tab>
          <Tab active={activeTab === 'performance'} onClick={() => handleTabChange('performance')}>
            Performance Analytics
          </Tab>
          <Tab active={activeTab === 'health'} onClick={() => handleTabChange('health')}>
            Account Health
          </Tab>
          <Tab active={activeTab === 'system'} onClick={() => handleTabChange('system')}>
            System Operations
          </Tab>
        </Tabs>

        {activeTab === 'overview' && (
          managers.length === 0 ? (
            <DataTableEmpty>{t('admin:adminDashboard.noManagerData', 'No manager data available')}</DataTableEmpty>
          ) : (
            <DataTable>
              <DataTableHead>
                <tr>
                  <DataTableHeaderCell align="left">{t('admin:adminDashboard.managerCompany')}</DataTableHeaderCell>
                  <DataTableHeaderCell align="left">{t('admin:adminDashboard.plan')}</DataTableHeaderCell>
                  <DataTableHeaderCell align="left">{t('admin:adminDashboard.status')}</DataTableHeaderCell>
                  <DataTableHeaderCell align="right">{t('admin:adminDashboard.restaurants')}</DataTableHeaderCell>
                  <DataTableHeaderCell align="right">{t('admin:adminDashboard.monthlyRevenue')}</DataTableHeaderCell>
                  <DataTableHeaderCell align="left">{t('admin:adminDashboard.healthScore')}</DataTableHeaderCell>
                  <DataTableHeaderCell align="left">{t('admin:adminDashboard.riskLevel')}</DataTableHeaderCell>
                </tr>
              </DataTableHead>
              <tbody>
                {managers.map(manager => (
                  <DataTableRow key={manager.id}>
                    <DataTableCell data-label={t('admin:adminDashboard.managerCompany')}>
                      <CompanyInfo>
                        <div className="name">{manager.companyName}</div>
                        <div className="email">{manager.email}</div>
                      </CompanyInfo>
                    </DataTableCell>
                    <DataTableCell data-label={t('admin:adminDashboard.plan')}>
                      <Badge variant={manager.planType}>{manager.planType}</Badge>
                    </DataTableCell>
                    <DataTableCell data-label={t('admin:adminDashboard.status')}>
                      <Badge variant={manager.subscriptionStatus}>{manager.subscriptionStatus}</Badge>
                    </DataTableCell>
                    <DataTableCell align="right" data-label={t('admin:adminDashboard.restaurants')}>{manager.restaurantCount}</DataTableCell>
                    <DataTableCell align="right" data-label={t('admin:adminDashboard.monthlyRevenue')}>{formatMultiCurrency(manager.totalRevenueByCurrency)}</DataTableCell>
                    <DataTableCell data-label={t('admin:adminDashboard.healthScore')}>
                      <HealthScore score={manager.healthScore}>
                        <span className="score">{manager.healthScore}%</span>
                        <div className="bar"></div>
                      </HealthScore>
                    </DataTableCell>
                    <DataTableCell data-label={t('admin:adminDashboard.riskLevel')}>
                      <Badge variant={manager.riskLevel}>{manager.riskLevel}</Badge>
                    </DataTableCell>
                  </DataTableRow>
                ))}
              </tbody>
            </DataTable>
          )
        )}

        {activeTab === 'performance' && (
          <TableContainer style={{ padding: '32px' }}>
            <h3 style={{ marginBottom: '20px', color: '#0A2540' }}>{t('admin:adminDashboard.performanceAnalytics')}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              <div style={{ padding: '20px', background: '#F8FAFC', borderRadius: '12px' }}>
                <h4 style={{ color: '#059669', marginBottom: '10px' }}>Revenue Insights ({selectedCurrency})</h4>
                <p>• Monthly revenue: {formatCurrency(getCurrencyTotal(metrics.monthlyRevenue, selectedCurrency), selectedCurrency)}</p>
                <p>• Yearly revenue: {formatCurrency(getCurrencyTotal(metrics.yearlyRevenue, selectedCurrency), selectedCurrency)}</p>
                <p>• ARPU: {formatCurrency(metrics.averageRevenuePerUser, operationSettings.currency)}</p>
              </div>
              <div style={{ padding: '20px', background: '#F8FAFC', borderRadius: '12px' }}>
                <h4 style={{ color: '#2563EB', marginBottom: '10px' }}>{t('admin:adminDashboard.businessOverview')}</h4>
                <p>• Total managers: {metrics.totalManagers}</p>
                <p>• Active subscriptions: {metrics.activeSubscriptions}</p>
                <p>• Open support tickets: {metrics.supportTickets}</p>
              </div>
              <div style={{ padding: '20px', background: '#F8FAFC', borderRadius: '12px' }}>
                <h4 style={{ color: '#7C3AED', marginBottom: '10px' }}>{t('admin:adminDashboard.restaurantMetrics')}</h4>
                <p>• Total restaurants: {metrics.totalRestaurants}</p>
                <p>• This month activities: {metrics.totalTransactions}</p>
                <p>• Cumulative revenue: {formatCurrency(getCurrencyTotal(metrics.cumulativeRevenue, selectedCurrency), selectedCurrency)}</p>
              </div>
            </div>
          </TableContainer>
        )}

        {activeTab === 'health' && (
          <TableContainer style={{ padding: '32px' }}>
            <h3 style={{ marginBottom: '20px', color: '#0A2540' }}>{t('admin:adminDashboard.accountHealthMonitoring')}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <h4>{t('admin:adminDashboard.healthScoreDistribution')}</h4>
                <div style={{ padding: '20px', background: '#F8FAFC', borderRadius: '12px' }}>
                  <p>🟢 Healthy (80-100): {managers.filter(m => m.healthScore >= 80).length} accounts</p>
                  <p>🟡 At Risk (60-79): {managers.filter(m => m.healthScore >= 60 && m.healthScore < 80).length} accounts</p>
                  <p>🔴 Critical (&lt;60): {managers.filter(m => m.healthScore < 60).length} accounts</p>
                </div>
              </div>
              <div>
                <h4>{t('admin:adminDashboard.riskFactors')}</h4>
                <div style={{ padding: '20px', background: '#F8FAFC', borderRadius: '12px' }}>
                  <p>• Payment delays: Monitor automated</p>
                  <p>• Usage decline: Real-time alerts</p>
                  <p>• Support escalations: Tracked</p>
                  <p>• Contract renewals: 45-day alerts</p>
                </div>
              </div>
            </div>
          </TableContainer>
        )}

        {activeTab === 'system' && (
          <TableContainer style={{ padding: '32px' }}>
            <h3 style={{ marginBottom: '20px', color: '#0A2540' }}>{t('admin:adminDashboard.systemOperations')}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              <div style={{ padding: '20px', background: '#F8FAFC', borderRadius: '12px' }}>
                <h4 style={{ color: '#059669' }}>{t('admin:adminDashboard.invoiceSummary')}</h4>
                <p>• Total invoices: {invoicesData.length}</p>
                <p>• Paid: {invoicesData.filter((i: any) => i.status === 'paid' || i.status === 'completed').length}</p>
                <p>• Pending: {invoicesData.filter((i: any) => i.status === 'pending_payment').length}</p>
                <p>• Overdue: {invoicesData.filter((i: any) => i.status === 'overdue').length}</p>
              </div>
              <div style={{ padding: '20px', background: '#F8FAFC', borderRadius: '12px' }}>
                <h4 style={{ color: '#2563EB' }}>{t('admin:adminDashboard.userActivity')}</h4>
                <p>• Total managers: {metrics.totalManagers}</p>
                <p>• Active users: {metrics.activeUsers}</p>
                <p>• Total restaurants: {metrics.totalRestaurants}</p>
                <p>• Active subscriptions: {metrics.activeSubscriptions}</p>
              </div>
            </div>
          </TableContainer>
        )}
        </Content>
      </Container>
    </>
  );
};

export default AdminDashboard;