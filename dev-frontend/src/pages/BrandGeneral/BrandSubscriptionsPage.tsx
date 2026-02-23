import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import MainLayout from '../../components/Layout/MainLayout';
import { useAuth } from '../../contexts/AuthContext';
import { API_BASE_URL } from '../../config/api';
import { formatCurrency } from '../../utils/currency';
import { useBrandCurrency } from '../../hooks/useBrandCurrency';
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import {
  Table,
  TableHeader as CommonTableHeader,
  TableRow as CommonTableRow,
  MobileLabel,
  MobileValue,
  MobileGrid
} from '../../components/UI';

// ============================================
// Styled Components
// ============================================

const Container = styled.div`
  min-height: 100vh;
  background: #FAFBFC;
`;

const Content = styled.div`
  padding: 32px;
  @media (max-width: 768px) { padding: 20px; }
`;

const Header = styled.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  height: 56px;
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

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;
  @media (max-width: 768px) { font-size: 20px; }
`;

const ActionSection = styled.div`
  display: flex;
  gap: 12px;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'success' }>`
  padding: 10px 18px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  ${props => props.variant === 'primary' ? `
    background: #635BFF; color: white;
    &:hover { background: #5A51E6; transform: translateY(-1px); }
  ` : props.variant === 'success' ? `
    background: #059669; color: white;
    &:hover { background: #047857; transform: translateY(-1px); }
  ` : `
    background: white; color: #374151; border: 1px solid #E6EBF1;
    &:hover { background: #F8FAFC; border-color: #635BFF; }
  `}
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const TabContainer = styled.div`
  display: flex;
  gap: 0;
  margin-bottom: 24px;
  border-bottom: 2px solid #E6EBF1;
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.active ? '#635BFF' : '#6B7280'};
  background: none;
  border: none;
  border-bottom: 2px solid ${props => props.active ? '#635BFF' : 'transparent'};
  margin-bottom: -2px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover { color: #635BFF; }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`;

const StatCard = styled.div<{ color?: string }>`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${props => props.color || '#635BFF'};
  transition: all 0.2s;
  &:hover { box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); transform: translateY(-2px); }
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StatSub = styled.div`
  font-size: 12px;
  color: #9CA3AF;
  margin-top: 4px;
`;

const SubscriptionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(480px, 1fr));
  gap: 24px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;
  &:hover { box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1); transform: translateY(-2px); border-color: #635BFF; }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

const RestaurantName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 4px 0;
`;

const RestaurantEmail = styled.div`
  font-size: 13px;
  color: #6B7280;
`;

const Badge = styled.span<{ variant: 'green' | 'yellow' | 'red' | 'gray' | 'blue' | 'purple' }>`
  padding: 5px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  ${props => {
    switch (props.variant) {
      case 'green': return 'background: #ECFDF5; color: #059669;';
      case 'yellow': return 'background: #FEF3C7; color: #D97706;';
      case 'red': return 'background: #FEE2E2; color: #DC2626;';
      case 'blue': return 'background: #DBEAFE; color: #2563EB;';
      case 'purple': return 'background: #EDE9FE; color: #7C3AED;';
      default: return 'background: #F3F4F6; color: #6B7280;';
    }
  }}
`;

const PlanSection = styled.div`
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const PlanName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`;

const PlanDetail = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #6B7280;
  padding: 4px 0;
  & + & { border-top: 1px solid #E6EBF1; }
`;

const PlanDetailLabel = styled.span`
  color: #6B7280;
`;

const PlanDetailValue = styled.span`
  font-weight: 600;
  color: #0A2540;
`;

const RevenueSection = styled.div`
  padding: 16px;
  background: #F0FDF4;
  border-radius: 8px;
  border: 1px solid #BBF7D0;
  margin-bottom: 16px;
`;

const RevenueTitle = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #059669;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`;

const RevenueAmount = styled.div`
  font-size: 22px;
  font-weight: 700;
  color: #059669;
`;

const RevenueSub = styled.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 4px;
`;

const ChargesSection = styled.div`
  padding: 16px;
  background: #FFF7ED;
  border-radius: 8px;
  border: 1px solid #FED7AA;
  margin-bottom: 16px;
`;

const ChargesTitle = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #C2410C;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`;

const ChargesItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  padding: 4px 0;
  color: #6B7280;
`;

const ChargesTotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  font-weight: 700;
  padding-top: 8px;
  margin-top: 8px;
  border-top: 2px solid #FDBA74;
  color: #C2410C;
`;

const InvoiceSection = styled.div`
  padding: 12px 16px;
  background: white;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InvoiceInfo = styled.div``;

const InvoiceNumber = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
`;

const InvoiceDate = styled.div`
  font-size: 12px;
  color: #6B7280;
`;

const NoPlanTag = styled.div`
  padding: 12px 16px;
  background: #F9FAFB;
  border: 1px dashed #D1D5DB;
  border-radius: 8px;
  text-align: center;
  color: #9CA3AF;
  font-size: 14px;
  margin-bottom: 16px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 40px;
  color: #9CA3AF;
`;

const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const EmptyTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #6B7280;
  margin-bottom: 8px;
`;

const EmptyDescription = styled.div`
  font-size: 14px;
  color: #9CA3AF;
`;

// Modal styles
const ModalOverlay = styled.div<{ show: boolean }>`
  display: ${props => props.show ? 'flex' : 'none'};
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  align-items: flex-start;
  justify-content: center;
  overflow-y: auto;
  padding: 40px 0;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 32px;
  max-width: 560px;
  width: 90%;
  flex-shrink: 0;
`;

const ModalTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: #0A2540;
  margin: 0 0 8px 0;
`;

const ModalSubtitle = styled.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 24px 0;
`;

const ModalActions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 40px;
  color: #6B7280;
  font-size: 14px;
`;

// POS Subscriptions table styles
const POSTableHeader = styled(CommonTableHeader)`
  @media (max-width: 1200px) {
    & > span:nth-child(5),
    & > span:nth-child(6) {
      display: none;
    }
  }
  @media (max-width: 900px) {
    & > span:nth-child(3),
    & > span:nth-child(4),
    & > span:nth-child(5),
    & > span:nth-child(6) {
      display: none;
    }
  }
`;

const POSTableRow = styled(CommonTableRow)`
  @media (max-width: 1200px) {
    & > div:nth-child(5),
    & > div:nth-child(6) {
      display: none;
    }
  }
  @media (max-width: 900px) {
    & > div:nth-child(3),
    & > div:nth-child(4),
    & > div:nth-child(5),
    & > div:nth-child(6) {
      display: none;
    }
  }
`;

const POSRestaurantName = styled.div`
  font-weight: 600;
  color: #0A2540;
  font-size: 14px;
`;

const POSRestaurantMeta = styled.div`
  font-size: 12px;
  color: #9CA3AF;
  margin-top: 2px;
`;

const PlanBadge = styled.span<{ planType: string }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: capitalize;
  ${props => {
    switch (props.planType) {
      case 'basic': return 'background: #F3F4F6; color: #374151;';
      case 'professional': return 'background: #EDE9FE; color: #7C3AED;';
      case 'enterprise': return 'background: #FEF3C7; color: #92400E;';
      default: return 'background: #F3F4F6; color: #374151;';
    }
  }}
`;

const StatusBadge2 = styled.span<{ status: string }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  ${props => {
    switch (props.status) {
      case 'active': return 'background: #ECFDF5; color: #059669;';
      case 'trial': return 'background: #DBEAFE; color: #2563EB;';
      case 'expired': return 'background: #FEE2E2; color: #DC2626;';
      case 'suspended': return 'background: #FEF3C7; color: #D97706;';
      case 'cancelled': return 'background: #F3F4F6; color: #6B7280;';
      default: return 'background: #F3F4F6; color: #6B7280;';
    }
  }}
`;

interface POSSubscription {
  id: string;
  restaurantName: string;
  adminName: string;
  location: string;
  planType: string;
  status: string;
  monthlyFee: number;
  paymentModel: string;
  startDate: string;
  endDate: string;
  autoRenew: boolean;
}

// ============================================
// Interfaces
// ============================================

interface BrandPlanSubscription {
  restaurant_id: number;
  restaurant_name: string;
  restaurant_email: string;
  restaurant_status: string;
  plan: {
    id: number;
    name: string;
    subscription_fee: string;
    revenue_percentage: string;
    rent_type: string;
    billing_cycle: string;
    auto_generate: boolean;
    activation_date: string;
  } | null;
  latest_invoice: {
    id: number;
    invoice_number: string;
    total_amount: string;
    status: string;
    billing_period_start: string;
    billing_period_end: string;
    due_date: string;
  } | null;
  current_month: {
    revenue: number;
    order_count: number;
    estimated_charges: {
      items: Array<{
        item_type: string;
        description: string;
        calculated_amount: number;
        tax_amount: number;
        total_amount: number;
      }>;
      subtotal: number;
      taxAmount: number;
      totalAmount: number;
    } | null;
  };
}

interface GenerateResult {
  generated: number;
  skipped: number;
  total: number;
  period: { start: string; end: string };
  results: Array<{
    restaurant: string;
    status: string;
    reason?: string;
    invoice_number?: string;
    amount?: number;
    revenue?: number;
  }>;
}

// ============================================
// Component
// ============================================

const BrandSubscriptionsPage: React.FC = () => {
  const { user } = useAuth();
  const { defaultCurrency } = useBrandCurrency();
  const [brandId, setBrandId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'brand_plans' | 'pos_subscriptions'>('brand_plans');
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [brandSubs, setBrandSubs] = useState<BrandPlanSubscription[]>([]);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [generateResult, setGenerateResult] = useState<GenerateResult | null>(null);
  const [showResultModal, setShowResultModal] = useState(false);
  // POS Subscriptions state
  const [posSubs, setPosSubs] = useState<POSSubscription[]>([]);
  const [posLoading, setPosLoading] = useState(false);
  const [posSearchTerm, setPosSearchTerm] = useState('');
  const [posFilterStatus, setPosFilterStatus] = useState('all');
  const [posFilterPayment, setPosFilterPayment] = useState('all');
  const [generateError, setGenerateError] = useState('');

  const token = localStorage.getItem('auth_token');

  useEffect(() => {
    if (user?.brand_id) {
      setBrandId(Number(user.brand_id));
    }
  }, [user]);

  const fetchBrandSubscriptions = useCallback(async () => {
    if (!brandId) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/brands/${brandId}/subscriptions`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setBrandSubs(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching brand subscriptions:', error);
    } finally {
      setLoading(false);
    }
  }, [brandId, token]);

  useEffect(() => {
    fetchBrandSubscriptions();
  }, [fetchBrandSubscriptions]);

  // Fetch POS subscriptions (restaurants data)
  const fetchPOSSubscriptions = useCallback(async () => {
    if (!token) return;
    setPosLoading(true);
    try {
      const response = await fetch('/api/restaurants', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        const restaurants = Array.isArray(data) ? data : [];
        const formatted: POSSubscription[] = restaurants.map((r: any) => {
          const planType = r.plan_type?.toLowerCase().replace(' plan', '') || 'basic';
          let status = 'active';
          if (r.status === 'trial') status = 'trial';
          else if (r.status === 'inactive' || r.status === 'suspended') status = 'suspended';
          else if (r.status === 'expired') status = 'expired';
          else if (r.status === 'cancelled') status = 'cancelled';

          return {
            id: r.id?.toString(),
            restaurantName: r.name || 'Unknown',
            adminName: r.admin_name || r.managerName || '-',
            location: r.address || '-',
            planType,
            status,
            monthlyFee: parseFloat(r.plan_amount) || 29,
            paymentModel: r.payment_model || 'restaurant',
            startDate: r.subscription_start ? new Date(r.subscription_start).toISOString().split('T')[0] : '-',
            endDate: r.subscription_end ? new Date(r.subscription_end).toISOString().split('T')[0] : '-',
            autoRenew: r.status === 'active'
          };
        });
        setPosSubs(formatted);
      }
    } catch (error) {
      console.error('Error fetching POS subscriptions:', error);
    } finally {
      setPosLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (activeTab === 'pos_subscriptions') {
      fetchPOSSubscriptions();
    }
  }, [activeTab, fetchPOSSubscriptions]);

  const handleGenerateInvoices = async () => {
    if (!brandId) return;
    setGenerating(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/brands/${brandId}/generate-invoices`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({})
      });
      if (response.ok) {
        const data = await response.json();
        setGenerateResult(data.data);
        setShowGenerateModal(false);
        setShowResultModal(true);
        fetchBrandSubscriptions();
      } else {
        const err = await response.json().catch(() => ({ message: 'Unknown error' }));
        setGenerateError(`Failed: ${err.message}`);
      }
    } catch (error) {
      console.error('Error generating invoices:', error);
      setGenerateError('Failed to generate invoices');
    } finally {
      setGenerating(false);
    }
  };

  // Stats
  const totalRestaurants = brandSubs.length;
  const withPlan = brandSubs.filter(s => s.plan !== null).length;
  const totalMonthRevenue = brandSubs.reduce((sum, s) => sum + (s.current_month?.revenue || 0), 0);
  const totalEstimatedCharges = brandSubs.reduce((sum, s) => sum + (s.current_month?.estimated_charges?.totalAmount || 0), 0);
  const currency = defaultCurrency || 'MYR';

  const getInvoiceStatusBadge = (status: string): 'green' | 'yellow' | 'red' | 'gray' | 'blue' | 'purple' => {
    switch (status) {
      case 'paid': return 'green';
      case 'pending_payment': return 'yellow';
      case 'payment_submitted': return 'blue';
      case 'overdue': return 'red';
      case 'cancelled': return 'gray';
      default: return 'gray';
    }
  };

  // POS Subscriptions filtering
  const filteredPosSubs = posSubs.filter(sub => {
    const matchesSearch = sub.restaurantName.toLowerCase().includes(posSearchTerm.toLowerCase()) ||
                          sub.adminName.toLowerCase().includes(posSearchTerm.toLowerCase()) ||
                          sub.location.toLowerCase().includes(posSearchTerm.toLowerCase());
    const matchesStatus = posFilterStatus === 'all' || sub.status === posFilterStatus;
    const matchesPayment = posFilterPayment === 'all' || sub.paymentModel === posFilterPayment;
    return matchesSearch && matchesStatus && matchesPayment;
  });

  const posActiveCount = posSubs.filter(s => s.status === 'active').length;
  const posTrialCount = posSubs.filter(s => s.status === 'trial').length;
  const posTotalFee = posSubs.filter(s => s.status === 'active' || s.status === 'trial').reduce((sum, s) => sum + s.monthlyFee, 0);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <MainLayout>
      <Container>
        <Header>
          <Title>Subscriptions</Title>
          <ActionSection>
            {activeTab === 'brand_plans' && (
              <Button variant="success" onClick={() => setShowGenerateModal(true)} disabled={withPlan === 0}>
                Generate Invoices
              </Button>
            )}
          </ActionSection>
        </Header>

        <Content>
          <TabContainer>
            <Tab active={activeTab === 'brand_plans'} onClick={() => setActiveTab('brand_plans')}>
              Brand Plans ({withPlan})
            </Tab>
            <Tab active={activeTab === 'pos_subscriptions'} onClick={() => setActiveTab('pos_subscriptions')}>
              POS Subscriptions ({totalRestaurants})
            </Tab>
          </TabContainer>

          {activeTab === 'brand_plans' && (
            <>
              <StatsGrid>
                <StatCard color="#059669">
                  <StatValue>{totalRestaurants}</StatValue>
                  <StatLabel>Brand Restaurants</StatLabel>
                  <StatSub>{withPlan} with plans assigned</StatSub>
                </StatCard>
                <StatCard color="#2563EB">
                  <StatValue>{formatCurrency(totalMonthRevenue, currency)}</StatValue>
                  <StatLabel>This Month Revenue</StatLabel>
                  <StatSub>All brand restaurants combined</StatSub>
                </StatCard>
                <StatCard color="#7C3AED">
                  <StatValue>{formatCurrency(totalEstimatedCharges, currency)}</StatValue>
                  <StatLabel>Estimated Charges</StatLabel>
                  <StatSub>Based on current month revenue</StatSub>
                </StatCard>
                <StatCard color="#D97706">
                  <StatValue>{brandSubs.filter(s => s.latest_invoice?.status === 'pending_payment').length}</StatValue>
                  <StatLabel>Pending Invoices</StatLabel>
                  <StatSub>Awaiting payment</StatSub>
                </StatCard>
              </StatsGrid>

              {loading ? (
                <LoadingSpinner>Loading subscription data...</LoadingSpinner>
              ) : brandSubs.length === 0 ? (
                <EmptyState>
                  <EmptyIcon>&#x1F4CB;</EmptyIcon>
                  <EmptyTitle>No Restaurants</EmptyTitle>
                  <EmptyDescription>No restaurants are assigned to this brand yet.</EmptyDescription>
                </EmptyState>
              ) : (
                <SubscriptionGrid>
                  {brandSubs.map(sub => (
                    <Card key={sub.restaurant_id}>
                      <CardHeader>
                        <div>
                          <RestaurantName>{sub.restaurant_name}</RestaurantName>
                          <RestaurantEmail>{sub.restaurant_email || 'No email'}</RestaurantEmail>
                        </div>
                        <Badge variant={sub.restaurant_status === 'active' ? 'green' : 'gray'}>
                          {sub.restaurant_status}
                        </Badge>
                      </CardHeader>

                      {sub.plan ? (
                        <>
                          <PlanSection>
                            <PlanName>{sub.plan.name}</PlanName>
                            {parseFloat(sub.plan.subscription_fee) > 0 && (
                              <PlanDetail>
                                <PlanDetailLabel>Subscription Fee</PlanDetailLabel>
                                <PlanDetailValue>{formatCurrency(parseFloat(sub.plan.subscription_fee), currency)}/mo</PlanDetailValue>
                              </PlanDetail>
                            )}
                            {parseFloat(sub.plan.revenue_percentage) > 0 && (
                              <PlanDetail>
                                <PlanDetailLabel>Revenue Royalty</PlanDetailLabel>
                                <PlanDetailValue>{sub.plan.revenue_percentage}%</PlanDetailValue>
                              </PlanDetail>
                            )}
                            {sub.plan.rent_type !== 'none' && (
                              <PlanDetail>
                                <PlanDetailLabel>Rent Type</PlanDetailLabel>
                                <PlanDetailValue style={{ textTransform: 'capitalize' }}>{sub.plan.rent_type}</PlanDetailValue>
                              </PlanDetail>
                            )}
                            <PlanDetail>
                              <PlanDetailLabel>Billing</PlanDetailLabel>
                              <PlanDetailValue style={{ textTransform: 'capitalize' }}>{sub.plan.billing_cycle} {sub.plan.auto_generate ? '(Auto)' : '(Manual)'}</PlanDetailValue>
                            </PlanDetail>
                            <PlanDetail>
                              <PlanDetailLabel>Active Since</PlanDetailLabel>
                              <PlanDetailValue>{formatDate(sub.plan.activation_date)}</PlanDetailValue>
                            </PlanDetail>
                          </PlanSection>

                          <RevenueSection>
                            <RevenueTitle>Current Month Revenue</RevenueTitle>
                            <RevenueAmount>{formatCurrency(sub.current_month.revenue, currency)}</RevenueAmount>
                            <RevenueSub>{sub.current_month.order_count} completed orders</RevenueSub>
                          </RevenueSection>

                          {sub.current_month.estimated_charges && sub.current_month.estimated_charges.items.length > 0 && (
                            <ChargesSection>
                              <ChargesTitle>Estimated Charges (This Month)</ChargesTitle>
                              {sub.current_month.estimated_charges.items.map((item, idx) => (
                                <ChargesItem key={idx}>
                                  <span>{item.item_type === 'subscription_fee' ? 'Subscription Fee' : item.item_type === 'revenue_percentage' ? 'Revenue Royalty' : 'Rent'}</span>
                                  <span>{formatCurrency(item.calculated_amount, currency)}</span>
                                </ChargesItem>
                              ))}
                              {sub.current_month.estimated_charges.taxAmount > 0 && (
                                <ChargesItem>
                                  <span>Tax</span>
                                  <span>{formatCurrency(sub.current_month.estimated_charges.taxAmount, currency)}</span>
                                </ChargesItem>
                              )}
                              <ChargesTotalRow>
                                <span>Total</span>
                                <span>{formatCurrency(sub.current_month.estimated_charges.totalAmount, currency)}</span>
                              </ChargesTotalRow>
                            </ChargesSection>
                          )}
                        </>
                      ) : (
                        <NoPlanTag>No brand plan assigned - Go to Plans page to assign</NoPlanTag>
                      )}

                      {sub.latest_invoice && (
                        <InvoiceSection>
                          <InvoiceInfo>
                            <InvoiceNumber>{sub.latest_invoice.invoice_number}</InvoiceNumber>
                            <InvoiceDate>
                              {formatDate(sub.latest_invoice.billing_period_start)} ~ {formatDate(sub.latest_invoice.billing_period_end)}
                            </InvoiceDate>
                          </InvoiceInfo>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ fontWeight: 600, color: '#0A2540' }}>
                              {formatCurrency(parseFloat(sub.latest_invoice.total_amount), currency)}
                            </span>
                            <Badge variant={getInvoiceStatusBadge(sub.latest_invoice.status)}>
                              {sub.latest_invoice.status.replace(/_/g, ' ')}
                            </Badge>
                          </div>
                        </InvoiceSection>
                      )}
                    </Card>
                  ))}
                </SubscriptionGrid>
              )}
            </>
          )}

          {activeTab === 'pos_subscriptions' && (
            <>
              <StatsGrid>
                <StatCard color="#635BFF">
                  <StatValue>{posSubs.length}</StatValue>
                  <StatLabel>Total Restaurants</StatLabel>
                  <StatSub>{posActiveCount} active, {posTrialCount} trial</StatSub>
                </StatCard>
                <StatCard color="#059669">
                  <StatValue>{posActiveCount}</StatValue>
                  <StatLabel>Active Subscriptions</StatLabel>
                </StatCard>
                <StatCard color="#2563EB">
                  <StatValue>{formatCurrency(posTotalFee, currency)}</StatValue>
                  <StatLabel>Monthly POS Fees</StatLabel>
                  <StatSub>Active + Trial combined</StatSub>
                </StatCard>
                <StatCard color="#D97706">
                  <StatValue>{posSubs.filter(s => s.paymentModel === 'brand_manager').length}</StatValue>
                  <StatLabel>Paid by Manager</StatLabel>
                  <StatSub>{posSubs.filter(s => s.paymentModel === 'restaurant').length} paid by restaurant</StatSub>
                </StatCard>
              </StatsGrid>

              <FilterBar>
                <SearchInput
                  placeholder="Search restaurants..."
                  value={posSearchTerm}
                  onChange={(e) => setPosSearchTerm(e.target.value)}
                />
                <FilterSelect
                  value={posFilterStatus}
                  onChange={(e) => setPosFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="trial">Trial</option>
                  <option value="expired">Expired</option>
                  <option value="suspended">Suspended</option>
                  <option value="cancelled">Cancelled</option>
                </FilterSelect>
                <FilterSelect
                  value={posFilterPayment}
                  onChange={(e) => setPosFilterPayment(e.target.value)}
                >
                  <option value="all">All Payment</option>
                  <option value="brand_manager">Paid by Manager</option>
                  <option value="restaurant">Paid by Restaurant</option>
                </FilterSelect>
              </FilterBar>

              {posLoading ? (
                <LoadingSpinner>Loading POS subscription data...</LoadingSpinner>
              ) : posSubs.length === 0 ? (
                <EmptyState>
                  <EmptyIcon>&#x1F4E6;</EmptyIcon>
                  <EmptyTitle>No POS Subscriptions</EmptyTitle>
                  <EmptyDescription>No restaurants are assigned to this brand yet.</EmptyDescription>
                </EmptyState>
              ) : (
                <Table>
                  <POSTableHeader columns="2.5fr 1fr 1fr 1fr 1fr 1fr">
                    <span>Restaurant</span>
                    <span>Plan</span>
                    <span>Status</span>
                    <span>Monthly Fee</span>
                    <span>Paid By</span>
                    <span>Expires</span>
                  </POSTableHeader>

                  {filteredPosSubs.map(sub => (
                    <POSTableRow columns="2.5fr 1fr 1fr 1fr 1fr 1fr" key={sub.id}>
                      <MobileGrid>
                        <MobileValue>
                          <MobileLabel>Restaurant</MobileLabel>
                          <div>
                            <POSRestaurantName>{sub.restaurantName}</POSRestaurantName>
                            <POSRestaurantMeta>{sub.adminName} &middot; {sub.location}</POSRestaurantMeta>
                          </div>
                        </MobileValue>

                        <MobileValue>
                          <MobileLabel>Plan</MobileLabel>
                          <PlanBadge planType={sub.planType}>
                            {sub.planType.charAt(0).toUpperCase() + sub.planType.slice(1)}
                          </PlanBadge>
                        </MobileValue>

                        <MobileValue>
                          <MobileLabel>Status</MobileLabel>
                          <StatusBadge2 status={sub.status}>
                            {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                          </StatusBadge2>
                        </MobileValue>

                        <MobileValue>
                          <MobileLabel>Monthly Fee</MobileLabel>
                          {formatCurrency(sub.monthlyFee, currency)}
                        </MobileValue>

                        <MobileValue>
                          <MobileLabel>Paid By</MobileLabel>
                          <span style={{
                            display: 'inline-flex',
                            padding: '4px 8px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: 500,
                            background: sub.paymentModel === 'brand_manager' ? '#EDE9FE' : '#F3F4F6',
                            color: sub.paymentModel === 'brand_manager' ? '#7C3AED' : '#6B7280'
                          }}>
                            {sub.paymentModel === 'brand_manager' ? 'Manager' : 'Restaurant'}
                          </span>
                        </MobileValue>

                        <MobileValue>
                          <MobileLabel>Expires</MobileLabel>
                          {(() => {
                            if (sub.endDate === '-') return <span style={{color: '#9CA3AF'}}>-</span>;
                            const today = new Date();
                            const endDate = new Date(sub.endDate);
                            const diffDays = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                            if (diffDays < 0) return <span style={{color: '#DC2626', fontWeight: 500}}>Expired</span>;
                            if (diffDays <= 7) return <span style={{color: '#F59E0B', fontWeight: 500}}>{diffDays}d</span>;
                            if (diffDays <= 30) return <span style={{color: '#10B981', fontWeight: 500}}>{diffDays}d</span>;
                            return <span style={{color: '#6B7280'}}>{diffDays}d</span>;
                          })()}
                        </MobileValue>
                      </MobileGrid>
                    </POSTableRow>
                  ))}
                </Table>
              )}
            </>
          )}
        </Content>
      </Container>

      {/* Generate Invoices Confirmation Modal */}
      <ModalOverlay show={showGenerateModal}>
        <ModalContent>
          <ModalTitle>Generate Brand Invoices</ModalTitle>
          <ModalSubtitle>
            This will generate invoices for the previous month based on each restaurant's assigned plan and actual revenue.
          </ModalSubtitle>

          <div style={{ padding: '16px', background: '#F0FDF4', borderRadius: '8px', marginBottom: '16px' }}>
            <div style={{ fontSize: '13px', color: '#059669', fontWeight: 600, marginBottom: '8px' }}>Summary</div>
            <div style={{ fontSize: '14px', color: '#374151' }}>
              <div>{withPlan} restaurant(s) with active brand plans</div>
              <div>Invoices for auto-generate plans will be created</div>
              <div>Duplicate invoices will be automatically skipped</div>
            </div>
          </div>

          <div style={{ padding: '12px 16px', background: '#FEF3C7', borderRadius: '8px' }}>
            <div style={{ fontSize: '13px', color: '#92400E' }}>
              Revenue-based charges (royalty %, rent %) are calculated from completed orders in the billing period.
            </div>
          </div>

          {generateError && (
            <div style={{padding: '10px 16px', marginTop: '12px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', color: '#DC2626', fontSize: '13px'}}>
              {generateError}
            </div>
          )}

          <ModalActions>
            <Button variant="secondary" onClick={() => { setShowGenerateModal(false); setGenerateError(''); }}>Cancel</Button>
            <Button variant="success" onClick={() => { setGenerateError(''); handleGenerateInvoices(); }} disabled={generating}>
              {generating ? 'Generating...' : 'Generate Now'}
            </Button>
          </ModalActions>
        </ModalContent>
      </ModalOverlay>

      {/* Generation Result Modal */}
      <ModalOverlay show={showResultModal}>
        <ModalContent>
          <ModalTitle>Invoice Generation Complete</ModalTitle>
          {generateResult && (
            <>
              <ModalSubtitle>
                Period: {generateResult.period.start} ~ {generateResult.period.end}
              </ModalSubtitle>

              <StatsGrid style={{ marginBottom: '16px' }}>
                <StatCard color="#059669">
                  <StatValue>{generateResult.generated}</StatValue>
                  <StatLabel>Generated</StatLabel>
                </StatCard>
                <StatCard color="#D97706">
                  <StatValue>{generateResult.skipped}</StatValue>
                  <StatLabel>Skipped</StatLabel>
                </StatCard>
              </StatsGrid>

              <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {generateResult.results.map((r, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 0',
                    borderBottom: '1px solid #F3F4F6',
                    fontSize: '13px'
                  }}>
                    <div>
                      <div style={{ fontWeight: 600, color: '#0A2540' }}>{r.restaurant}</div>
                      {r.invoice_number && (
                        <div style={{ color: '#6B7280', fontSize: '12px' }}>
                          {r.invoice_number} - {formatCurrency(r.amount || 0, currency)}
                        </div>
                      )}
                      {r.reason && <div style={{ color: '#9CA3AF', fontSize: '12px' }}>{r.reason}</div>}
                    </div>
                    <Badge variant={r.status === 'generated' ? 'green' : 'yellow'}>
                      {r.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </>
          )}

          <ModalActions>
            <Button variant="primary" onClick={() => setShowResultModal(false)} style={{ flex: 1 }}>
              Close
            </Button>
          </ModalActions>
        </ModalContent>
      </ModalOverlay>
    </MainLayout>
  );
};

export default BrandSubscriptionsPage;
