import React, { useState, useEffect, useCallback } from 'react';
import ConfirmModal from '../../components/ConfirmModal';
import styled from 'styled-components';
import { Modal as CommonModal, StatsGrid, StatCard, StatValue, StatLabel } from '../../components/UI';
import { RestaurantSubscription } from '../../interfaces/RestaurantSubscription';
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import { formatCurrency } from '../../utils/currency';
import { getAuthHeaders } from '../../utils/auth';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface PlanOption {
  id: number;
  name: string;
  display_name: string;
  monthly_price: number;
  annual_price: number;
  is_current: boolean;
  change_type: 'upgrade' | 'downgrade' | null;
}

const Container = styled.div`
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: 0;
  }
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

const ActionSection = styled.div`
  display: flex;
  gap: 12px;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  
  ${props => props.variant === 'primary' ? `
    background: #635BFF;
    color: white;
    
    &:hover {
      background: #5A51E6;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);
    }
  ` : `
    background: white;
    color: #4B5563;
    border: 1px solid #C7CED6;
    
    &:hover {
      background: #F1F4F8;
      color: #0A2540;
      border-color: #64748B;
    }
  `}
`;


// Filter Bar components are now imported from Common/FilterComponents

// Table styles matching StaffManagementPage
const SubscriptionTable = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #C7CED6;
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2.5fr 1.5fr 1fr 1fr 1fr 1fr 180px;
  gap: 16px;
  padding: 16px 24px;
  background: #F1F4F8;
  border-bottom: 1px solid #C7CED6;
  font-size: 12px;
  font-weight: 600;
  color: #4B5563;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (max-width: 1200px) {
    grid-template-columns: 2fr 1fr 1fr 150px;
    & > span:nth-child(3),
    & > span:nth-child(4),
    & > span:nth-child(5) {
      display: none;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr 120px;
    & > span:not(:first-child):not(:last-child) {
      display: none;
    }
  }
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2.5fr 1.5fr 1fr 1fr 1fr 1fr 180px;
  gap: 16px;
  padding: 20px 24px;
  border-bottom: 1px solid #F1F4F8;
  align-items: center;
  transition: all 0.2s;

  &:hover {
    background: #F1F4F8;
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 1200px) {
    grid-template-columns: 2fr 1fr 1fr 150px;
    & > div:nth-child(3),
    & > div:nth-child(4),
    & > div:nth-child(5) {
      display: none;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr 120px;
    & > div:not(:first-child):not(:last-child) {
      display: none;
    }
    padding: 16px;
  }
`;

const RestaurantInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const RestaurantName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`;

const ManagerInfo = styled.div`
  font-size: 12px;
  color: #4B5563;
`;

// const PaymentInfo = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   margin-top: 8px;
// `;

const PaymentBadge = styled.span<{ type: string }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  white-space: nowrap;
  display: inline-block;
  background: ${props => props.type === 'self' ? '#ECFDF5' : '#DBEAFE'};
  color: ${props => props.type === 'self' ? '#059669' : '#1E40AF'};
`;

const PlanBadge = styled.span<{ plan: string }>`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  white-space: nowrap;
  display: inline-block;
  background: ${props => {
    switch(props.plan) {
      case 'enterprise': return '#EDE9FE';
      case 'professional': return '#DBEAFE';
      case 'basic': return '#F1F4F8';
      default: return '#F1F4F8';
    }
  }};
  color: ${props => {
    switch(props.plan) {
      case 'enterprise': return '#7C3AED';
      case 'professional': return '#1E40AF';
      case 'basic': return '#4B5563';
      default: return '#4B5563';
    }
  }};
`;

const PriceCell = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #059669;
`;

const StatusBadge = styled.span<{ status: string }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  white-space: nowrap;
  background: ${props => {
    switch(props.status) {
      case 'active': return '#ECFDF5';
      case 'trial': return '#FEF3C7';
      case 'expired': return '#FEE2E2';
      case 'suspended': return '#F1F4F8';
      case 'cancelled': return '#FEF2F2';
      default: return '#F1F4F8';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'active': return '#059669';
      case 'trial': return '#D97706';
      case 'expired': return '#DC2626';
      case 'suspended': return '#4B5563';
      case 'cancelled': return '#DC2626';
      default: return '#4B5563';
    }
  }};
`;

const UsageCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const UsageBar = styled.div`
  width: 100px;
  height: 6px;
  background: #F1F4F8;
  border-radius: 3px;
  overflow: hidden;
`;

const UsageProgress = styled.div<{ percentage: number }>`
  height: 100%;
  width: ${props => props.percentage}%;
  background: ${props => props.percentage > 90 ? '#DC2626' : props.percentage > 75 ? '#D97706' : '#059669'};
  transition: width 0.3s ease;
`;

const UsageText = styled.div`
  font-size: 11px;
  color: #4B5563;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  justify-content: flex-end;

  @media (max-width: 1200px) {
    gap: 4px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 4px;
    width: 100%;
  }
`;

const ActionButton = styled.button`
  padding: 6px 12px;
  background: transparent;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  color: #4B5563;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin-right: 8px;

  &:hover {
    border-color: #635BFF;
    color: #635BFF;
    background: #F4F3FF;
  }

  &:last-child {
    margin-right: 0;
  }
`;

// Modal Components

const DetailSection = styled.div`
  margin-bottom: 16px;
`;

const DetailLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #4B5563;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
`;

const DetailValue = styled.div`
  font-size: 14px;
  color: #0A2540;
`;

const FeaturesList = styled.ul`
  margin: 0;
  padding-left: 16px;
  font-size: 14px;
  color: #0A2540;
  
  li {
    margin-bottom: 4px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 8px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;


const RestaurantSubscriptionsPage: React.FC = () => {
  const { t } = useTranslation('admin');
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState<RestaurantSubscription[]>([]);
  const [infoModal, setInfoModal] = useState<{ open: boolean; title: string; message: string }>({ open: false, title: '', message: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPlan, setFilterPlan] = useState('all');
  const [filterPayment, setFilterPayment] = useState('all');
  
  // Modal states
  const [selectedSubscription, setSelectedSubscription] = useState<RestaurantSubscription | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  
  // Form states
  const [newPlan, setNewPlan] = useState('');
  const [newPaymentModel, setNewPaymentModel] = useState('');
  const [suspendReason, setSuspendReason] = useState('');

  // Real plan data (server-owned pricing) + request states
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [planOptions, setPlanOptions] = useState<PlanOption[]>([]);
  const [planLoading, setPlanLoading] = useState(false);
  const [planError, setPlanError] = useState<string | null>(null);
  const [planCycle, setPlanCycle] = useState<'monthly' | 'annual'>('monthly');
  const [cancelTarget, setCancelTarget] = useState<RestaurantSubscription | null>(null);
  
  // Real subscription data: every restaurant's live plan/status/payer, straight from
  // the tables billing runs on. (Until 2026-07-11 this page was a mock — the list was
  // hardcoded to [] and the actions only mutated local state behind a success message.)
  const loadSubscriptions = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/restaurants', { headers: getAuthHeaders() });
      if (!res.ok) throw new Error('Failed to fetch restaurants');
      const json = await res.json();
      const rows: any[] = Array.isArray(json) ? json : (json.data || []);

      const mapped: RestaurantSubscription[] = rows.map((r: any) => {
        const payerIsRestaurant = !r.payment_model || r.payment_model === 'restaurant';
        const monthly = parseFloat(r.planAmount ?? r.plan_amount) || 0;
        const cycle = (r.billing_cycle === 'annual' ? 'annual' : 'monthly') as 'monthly' | 'annual';
        return {
          id: `sub-${r.id}`,
          restaurantId: String(r.id),
          restaurantName: r.name,
          branchName: r.branch_name || null,
          currency: r.currency || 'MYR',
          managerId: String(r.admin?.id || ''),
          managerName: r.admin?.name || r.admin_name || '-',
          planType: r.planType || r.plan_type || '-',
          status: (['active', 'trial', 'expired', 'suspended', 'cancelled'].includes(r.status)
            ? r.status : 'expired') as RestaurantSubscription['status'],
          startDate: r.subscriptionStart || r.subscription_start || '',
          endDate: r.subscriptionEnd || r.subscription_end || '',
          monthlyFee: monthly,
          annualFee: 0,          // 연간 금액은 플랜 변경 모달이 서버(PlanPrice)에서 직접 읽는다
          billingCycle: cycle,
          orderLimit: r.order_limit ?? -1,
          currentOrders: 0,
          usagePercentage: 0,
          paymentModel: (payerIsRestaurant ? 'self' : 'manager') as 'self' | 'manager',
          payerId: payerIsRestaurant ? String(r.id) : String(r.admin?.id || ''),
          payerName: payerIsRestaurant ? r.name : (r.admin?.name || 'Manager'),
          features: [],
          lastPayment: '-',
          nextPayment: r.subscriptionEnd || r.subscription_end || '-',
          autoRenew: true,
          createdAt: r.createdAt || '',
          updatedAt: r.updatedAt || '',
        } as RestaurantSubscription;
      });

      setSubscriptions(mapped);
    } catch (error) {
      console.error('Error loading restaurant subscriptions:', error);
      setSubscriptions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSubscriptions();
  }, [loadSubscriptions]);

  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesSearch = sub.restaurantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sub.managerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || sub.status === filterStatus;
    const matchesPlan = filterPlan === 'all' || sub.planType === filterPlan;
    const matchesPayment = filterPayment === 'all' || sub.paymentModel === filterPayment;
    return matchesSearch && matchesStatus && matchesPlan && matchesPayment;
  });

  const totalSubscriptions = subscriptions.length;
  const activeSubscriptions = subscriptions.filter(s => s.status === 'active').length;
  const trialSubscriptions = subscriptions.filter(s => s.status === 'trial').length;

  const monthlyRevenue = subscriptions
    .filter(s => s.status === 'active')
    .reduce((sum, s) => sum + (s.billingCycle === 'monthly' ? s.monthlyFee : s.annualFee / 12), 0);

  const formatLimit = (limit: number) => limit === -1 ? 'Unlimited' : limit.toLocaleString();
  
  // Modal handlers
  const handleViewDetails = (subscription: RestaurantSubscription) => {
    setSelectedSubscription(subscription);
    setShowDetailsModal(true);
  };
  
  const handleChangePlan = async (subscription: RestaurantSubscription) => {
    setSelectedSubscription(subscription);
    setNewPlan('');
    setPlanOptions([]);
    setPlanError(null);
    setShowPlanModal(true);
    setPlanLoading(true);
    try {
      // Same source the tenant sees — plans + prices + upgrade/downgrade classification
      // from PlanTemplate/PlanPrice (no client-side price table).
      const res = await fetch(`/api/subscriptions/manager/restaurant/${subscription.restaurantId}/plan-options`, { headers: getAuthHeaders() });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setPlanError(json.message || 'Failed to load plan options.');
        return;
      }
      setPlanOptions(json.data.available_plans || []);
      setPlanCycle(json.data.current?.billing_cycle === 'annual' ? 'annual' : 'monthly');
    } catch (err) {
      console.error('Error loading plan options:', err);
      setPlanError('Failed to load plan options.');
    } finally {
      setPlanLoading(false);
    }
  };

  // const handleSwitchPayment = (subscription: RestaurantSubscription) => {
  //   setSelectedSubscription(subscription);
  //   setNewPaymentModel(subscription.paymentModel);
  //   setShowPaymentModal(true);
  // };

  const handleSuspend = (subscription: RestaurantSubscription) => {
    setSelectedSubscription(subscription);
    setSuspendReason('');
    setShowSuspendModal(true);
  };
  
  // Status changes hit the restaurant record billing/login checks actually read.
  // Invoicing only runs for 'active' restaurants, so suspend/cancel also stops billing.
  const setRestaurantStatus = async (subscription: RestaurantSubscription, status: 'active' | 'suspended' | 'cancelled') => {
    const res = await fetch(`/api/restaurants/${subscription.restaurantId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify({ status })
    });
    if (!res.ok) throw new Error(`Failed to set status to ${status}`);
  };

  const handleReactivate = async (subscription: RestaurantSubscription) => {
    try {
      await setRestaurantStatus(subscription, 'active');
      await loadSubscriptions();
    } catch (err) {
      console.error('Error reactivating subscription:', err);
      setInfoModal({ open: true, title: 'Could not reactivate', message: 'Failed to reactivate this subscription.' });
    }
  };

  // Terminating a subscription for good. Suspension is reversible; cancellation is the
  // end state, so it is confirmed separately and stops invoicing.
  const confirmCancelSubscription = async () => {
    if (!cancelTarget) return;
    const target = cancelTarget;
    setCancelTarget(null);
    try {
      await setRestaurantStatus(target, 'cancelled');
      await loadSubscriptions();
    } catch (err) {
      console.error('Error cancelling subscription:', err);
      setInfoModal({ open: true, title: 'Could not cancel', message: 'Failed to cancel this subscription.' });
    }
  };

  const confirmChangePlan = async () => {
    if (!selectedSubscription || !newPlan) return;
    setSubmitting(true);
    setPlanError(null);
    try {
      // Server owns pricing, proration, limits and the invoice — never a local price table.
      const res = await fetch('/api/subscriptions/change-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify({
          restaurant_id: selectedSubscription.restaurantId,
          new_plan_id: Number(newPlan),
          new_billing_cycle: planCycle
        })
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setPlanError(json.message || 'Failed to change plan.');
        return;
      }
      setShowPlanModal(false);
      await loadSubscriptions();
    } catch (err) {
      console.error('Error changing plan:', err);
      setPlanError('Failed to change plan.');
    } finally {
      setSubmitting(false);
    }
  };

  const confirmSwitchPayment = async () => {
    if (!selectedSubscription) return;
    const model = newPaymentModel === 'manager' ? 'brand_manager' : 'restaurant';
    try {
      const res = await fetch(`/api/restaurants/${selectedSubscription.restaurantId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify({ payment_model: model })
      });
      if (!res.ok) throw new Error('Failed to update payment model');

      // Unpaid invoices must follow the payer, else they stay addressed to the old one.
      const inv = await fetch(`/api/invoices/update-payer/${selectedSubscription.restaurantId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify({ payment_model: model })
      });
      if (!inv.ok) {
        setInfoModal({
          open: true,
          title: 'Payer switched, invoices unchanged',
          message: 'The payer was updated, but existing unpaid invoices could not be re-pointed. Please check the invoices page.'
        });
      }

      setShowPaymentModal(false);
      await loadSubscriptions();
    } catch (err) {
      console.error('Error switching payment model:', err);
      setInfoModal({ open: true, title: 'Could not switch payer', message: 'Failed to update who is billed for this subscription.' });
    }
  };
  
  const confirmSuspend = async () => {
    if (!selectedSubscription || !suspendReason) return;
    setSubmitting(true);
    try {
      await setRestaurantStatus(selectedSubscription, 'suspended');
      setShowSuspendModal(false);
      await loadSubscriptions();
    } catch (err) {
      console.error('Error suspending subscription:', err);
      setInfoModal({ open: true, title: 'Could not suspend', message: 'Failed to suspend this subscription.' });
    } finally {
      setSubmitting(false);
    }
  };
  
  // Export functionality
  const handleExportReport = () => {
    const csvContent = [
      ['Restaurant Name', 'Manager', 'Plan', 'Status', 'Monthly Fee', 'Payment Model', 'Usage', 'Last Payment', 'Next Payment'].join(','),
      ...filteredSubscriptions.map(sub => [
        `"${sub.restaurantName}"`,
        `"${sub.managerName}"`,
        sub.planType,
        sub.status,
        `RM ${sub.monthlyFee}`,
        sub.paymentModel === 'self' ? 'Self-Paying' : 'Manager-Paid',
        sub.orderLimit > 0 ? `${sub.usagePercentage}%` : 'Unlimited',
        sub.lastPayment,
        sub.nextPayment
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `restaurant-subscriptions-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  
  return (
    <>
      <Container>
        <Header>
          <Title>{t('admin:restaurantSubscriptionsPage.restaurantSubscriptions')}</Title>
          <ActionSection>
            <Button variant="secondary" onClick={handleExportReport}>{t('admin:restaurantSubscriptionsPage.exportReport')}</Button>
            <Button variant="primary" onClick={() => navigate('/pos/admin/restaurants')}>{t('admin:restaurantSubscriptionsPage.addRestaurant')}</Button>
          </ActionSection>
        </Header>
        <Content>

        <StatsGrid>
          <StatCard color="#059669">
            <StatValue>{totalSubscriptions}</StatValue>
            <StatLabel>{t('admin:restaurantSubscriptionsPage.totalRestaurants')}</StatLabel>
          </StatCard>
          <StatCard color="#2563EB">
            <StatValue>{activeSubscriptions}</StatValue>
            <StatLabel>{t('admin:restaurantSubscriptionsPage.activeSubscriptions')}</StatLabel>
          </StatCard>
          <StatCard color="#D97706">
            <StatValue>{trialSubscriptions}</StatValue>
            <StatLabel>{t('admin:restaurantSubscriptionsPage.trialSubscriptions')}</StatLabel>
          </StatCard>
          <StatCard color="#DC2626">
            <StatValue>{formatCurrency(monthlyRevenue)}</StatValue>
            <StatLabel>{t('admin:restaurantSubscriptionsPage.monthlyRevenue')}</StatLabel>
          </StatCard>
        </StatsGrid>

        <FilterBar>
          <FilterSelect
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">{t('admin:restaurantSubscriptionsPage.allStatus')}</option>
            <option value="active">{t('admin:restaurantSubscriptionsPage.active')}</option>
            <option value="trial">{t('admin:restaurantSubscriptionsPage.trial')}</option>
            <option value="expired">{t('admin:restaurantSubscriptionsPage.expired')}</option>
            <option value="suspended">{t('admin:restaurantSubscriptionsPage.suspended')}</option>
            <option value="cancelled">{t('admin:restaurantSubscriptionsPage.cancelled')}</option>
          </FilterSelect>

          <FilterSelect
            value={filterPlan}
            onChange={(e) => setFilterPlan(e.target.value)}
          >
            <option value="all">{t('admin:restaurantSubscriptionsPage.allPlans')}</option>
            <option value="basic">{t('admin:restaurantSubscriptionsPage.basic')}</option>
            <option value="professional">{t('admin:restaurantSubscriptionsPage.professional')}</option>
            <option value="enterprise">{t('admin:restaurantSubscriptionsPage.enterprise')}</option>
          </FilterSelect>

          <FilterSelect
            value={filterPayment}
            onChange={(e) => setFilterPayment(e.target.value)}
          >
            <option value="all">{t('admin:restaurantSubscriptionsPage.allPaymentTypes')}</option>
            <option value="self">{t('admin:restaurantSubscriptionsPage.selfpaying')}</option>
            <option value="manager">{t('admin:restaurantSubscriptionsPage.managerpaid')}</option>
          </FilterSelect>

          <SearchInput
            type="text"
            placeholder="Search restaurants or managers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </FilterBar>

        <SubscriptionTable>
          <TableHeader>
            <span>{t('admin:restaurantSubscriptionsPage.restaurant')}</span>
            <span>{t('admin:restaurantSubscriptionsPage.manager')}</span>
            <span>{t('admin:restaurantSubscriptionsPage.plan')}</span>
            <span>{t('admin:restaurantSubscriptionsPage.price')}</span>
            <span>{t('admin:restaurantSubscriptionsPage.status')}</span>
            <span>{t('admin:restaurantSubscriptionsPage.usage')}</span>
            <span>{t('admin:restaurantSubscriptionsPage.actions')}</span>
          </TableHeader>

          {filteredSubscriptions.map(subscription => (
            <TableRow key={subscription.id}>
              <RestaurantInfo>
                <RestaurantName>{subscription.restaurantName}{subscription.branchName && <span style={{ fontSize: '12px', fontWeight: 500, color: '#4B5563', background: '#F1F4F8', padding: '1px 8px', borderRadius: '4px', marginLeft: '6px' }}>{subscription.branchName}</span>}</RestaurantName>
                <ManagerInfo>
                  <PaymentBadge type={subscription.paymentModel}>
                    {subscription.paymentModel === 'self' ? 'Self' : 'Manager'}
                  </PaymentBadge>
                  {subscription.payerName}
                </ManagerInfo>
              </RestaurantInfo>

              <div>
                <div style={{ fontSize: '14px', color: '#0A2540' }}>{subscription.managerName}</div>
                <div style={{ fontSize: '12px', color: '#4B5563' }}>{subscription.managerId}</div>
              </div>

              <PlanBadge plan={subscription.planType}>
                {subscription.planType}
              </PlanBadge>

              <PriceCell>
                {formatCurrency(subscription.billingCycle === 'monthly' ? subscription.monthlyFee : subscription.annualFee)}
                <div style={{ fontSize: '11px', color: '#4B5563' }}>
                  /{subscription.billingCycle === 'monthly' ? 'month' : 'year'}
                </div>
              </PriceCell>

              <StatusBadge status={subscription.status}>
                {subscription.status}
              </StatusBadge>

              <UsageCell>
                <UsageBar>
                  <UsageProgress percentage={subscription.usagePercentage} />
                </UsageBar>
                <UsageText>
                  {subscription.currentOrders.toLocaleString()} / {formatLimit(subscription.orderLimit)}
                </UsageText>
              </UsageCell>

              <ActionButtons>
                <ActionButton onClick={() => handleViewDetails(subscription)}>
                  Details
                </ActionButton>
                {subscription.status === 'active' || subscription.status === 'trial' ? (
                  <>
                    <ActionButton onClick={() => handleChangePlan(subscription)}>
                      Plan
                    </ActionButton>
                    <ActionButton onClick={() => handleSuspend(subscription)}>
                      Suspend
                    </ActionButton>
                  </>
                ) : (
                  <ActionButton
                    onClick={() => handleReactivate(subscription)}
                    disabled={subscription.status === 'cancelled'}
                  >
                    Reactivate
                  </ActionButton>
                )}
                {subscription.status !== 'cancelled' && (
                  <ActionButton onClick={() => setCancelTarget(subscription)}>
                    Cancel
                  </ActionButton>
                )}
              </ActionButtons>
            </TableRow>
          ))}

          {filteredSubscriptions.length === 0 && (
            <div style={{ padding: '60px 20px', textAlign: 'center', color: '#4B5563' }}>
              No subscriptions found
            </div>
          )}
        </SubscriptionTable>
        
        {/* Details Modal */}
        {showDetailsModal && selectedSubscription && (
          <CommonModal isOpen={true} onClose={() => setShowDetailsModal(false)} title="Subscription Details" footer={<><Button variant="secondary" onClick={() => setShowDetailsModal(false)}>{t('admin:restaurantSubscriptionsPage.close')}</Button></>}>
                <DetailSection>
                  <DetailLabel>{t('admin:restaurantSubscriptionsPage.restaurant')}</DetailLabel>
                  <DetailValue>{selectedSubscription.restaurantName}</DetailValue>
                </DetailSection>
                <DetailSection>
                  <DetailLabel>{t('admin:restaurantSubscriptionsPage.manager')}</DetailLabel>
                  <DetailValue>{selectedSubscription.managerName}</DetailValue>
                </DetailSection>
                <DetailSection>
                  <DetailLabel>{t('admin:restaurantSubscriptionsPage.plan')}</DetailLabel>
                  <DetailValue>{selectedSubscription.planType}</DetailValue>
                </DetailSection>
                <DetailSection>
                  <DetailLabel>{t('admin:restaurantSubscriptionsPage.status')}</DetailLabel>
                  <StatusBadge status={selectedSubscription.status}>{selectedSubscription.status}</StatusBadge>
                </DetailSection>
                <DetailSection>
                  <DetailLabel>{t('admin:restaurantSubscriptionsPage.pricing')}</DetailLabel>
                  <DetailValue>
                    {formatCurrency(selectedSubscription.billingCycle === 'monthly' ? selectedSubscription.monthlyFee : selectedSubscription.annualFee)}
                    /{selectedSubscription.billingCycle}
                  </DetailValue>
                </DetailSection>
                <DetailSection>
                  <DetailLabel>{t('admin:restaurantSubscriptionsPage.orderUsage')}</DetailLabel>
                  <DetailValue>
                    {selectedSubscription.currentOrders.toLocaleString()} / {formatLimit(selectedSubscription.orderLimit)}
                    {selectedSubscription.orderLimit > 0 && ` (${selectedSubscription.usagePercentage}%)`}
                  </DetailValue>
                </DetailSection>
                <DetailSection>
                  <DetailLabel>{t('admin:restaurantSubscriptionsPage.paymentModel')}</DetailLabel>
                  <DetailValue>
                    <PaymentBadge type={selectedSubscription.paymentModel}>
                      {selectedSubscription.paymentModel === 'self' ? 'Self-Paying' : 'Manager-Paid'}
                    </PaymentBadge>
                    <div style={{fontSize: '12px', color: '#4B5563', marginTop: '4px'}}>
                      Paid by: {selectedSubscription.payerName}
                    </div>
                  </DetailValue>
                </DetailSection>
                <DetailSection>
                  <DetailLabel>{t('admin:restaurantSubscriptionsPage.features')}</DetailLabel>
                  <FeaturesList>
                    {selectedSubscription.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </FeaturesList>
                </DetailSection>
                <DetailSection>
                  <DetailLabel>{t('admin:restaurantSubscriptionsPage.subscriptionPeriod')}</DetailLabel>
                  <DetailValue>{selectedSubscription.startDate} to {selectedSubscription.endDate}</DetailValue>
                </DetailSection>
                <DetailSection>
                  <DetailLabel>{t('admin:restaurantSubscriptionsPage.lastPayment')}</DetailLabel>
                  <DetailValue>{selectedSubscription.lastPayment}</DetailValue>
                </DetailSection>
                <DetailSection>
                  <DetailLabel>{t('admin:restaurantSubscriptionsPage.nextPayment')}</DetailLabel>
                  <DetailValue>{selectedSubscription.nextPayment}</DetailValue>
                </DetailSection>
                <DetailSection>
                  <DetailLabel>{t('admin:restaurantSubscriptionsPage.autoRenew')}</DetailLabel>
                  <DetailValue>{selectedSubscription.autoRenew ? 'Yes' : 'No'}</DetailValue>
                </DetailSection>
          </CommonModal>
        )}

        {/* Change Plan Modal — plans/prices come from the server (PlanTemplate/PlanPrice) */}
        {showPlanModal && selectedSubscription && (
          <CommonModal isOpen={true} onClose={() => setShowPlanModal(false)} title="Change Plan" footer={<><Button variant="secondary" onClick={() => setShowPlanModal(false)}>{t('admin:restaurantSubscriptionsPage.cancel')}</Button><Button variant="primary" onClick={confirmChangePlan} disabled={submitting || planLoading || !newPlan}>{submitting ? '...' : t('admin:restaurantSubscriptionsPage.changePlan')}</Button></>}>
                {planError && (
                  <div style={{ padding: '12px 16px', background: '#FEF2F2', borderRadius: '8px', color: '#DC2626', fontSize: '13px', marginBottom: '16px' }}>
                    {planError}
                  </div>
                )}
                <FormGroup>
                  <FormLabel>Restaurant: {selectedSubscription.restaurantName}</FormLabel>
                  <FormLabel>Current Plan: {selectedSubscription.planType}</FormLabel>

                  <FormLabel>Billing Cycle</FormLabel>
                  <FilterSelect value={planCycle} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPlanCycle(e.target.value as 'monthly' | 'annual')}>
                    <option value="monthly">Monthly</option>
                    <option value="annual">Annual</option>
                  </FilterSelect>

                  <FormLabel>Select New Plan</FormLabel>
                  <FilterSelect value={newPlan} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setNewPlan(e.target.value)} disabled={planLoading}>
                    <option value="">{planLoading ? 'Loading plans...' : 'Select a plan'}</option>
                    {planOptions.filter(p => !p.is_current).map(p => (
                      <option key={p.id} value={String(p.id)}>
                        {p.display_name || p.name} — {formatCurrency(planCycle === 'annual' ? p.annual_price : p.monthly_price, selectedSubscription.currency || 'MYR')}
                        /{planCycle === 'annual' ? 'yr' : 'mo'}
                        {p.change_type ? ` (${p.change_type})` : ''}
                      </option>
                    ))}
                  </FilterSelect>

                  <div style={{ fontSize: '13px', color: '#4B5563', marginTop: '12px' }}>
                    Upgrades apply immediately with a prorated invoice. Downgrades take effect at the next billing cycle.
                  </div>
                </FormGroup>
          </CommonModal>
        )}

        {/* Switch Payment Modal */}
        {showPaymentModal && selectedSubscription && (
          <CommonModal isOpen={true} onClose={() => setShowPaymentModal(false)} title="Switch Payment Method" footer={<><Button variant="secondary" onClick={() => setShowPaymentModal(false)}>{t('admin:restaurantSubscriptionsPage.cancel')}</Button><Button variant="primary" onClick={confirmSwitchPayment}>{t('admin:restaurantSubscriptionsPage.updatePayment')}</Button></>}>
                <FormGroup>
                  <FormLabel>Current: {selectedSubscription.paymentModel === 'self' ? 'Self-Paying' : 'Manager-Paid'}</FormLabel>
                  <FormLabel>Select New Payment Method:</FormLabel>
                  <FilterSelect value={newPaymentModel} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setNewPaymentModel(e.target.value)}>
                    <option value="self">{t('admin:restaurantSubscriptionsPage.selfpayingRestaurantPaysDirectly')}</option>
                    <option value="manager">{t('admin:restaurantSubscriptionsPage.managerpaidManagerPaysOnBehalf')}</option>
                  </FilterSelect>
                </FormGroup>
          </CommonModal>
        )}

        {/* Suspend Modal */}
        {showSuspendModal && selectedSubscription && (
          <CommonModal isOpen={true} onClose={() => setShowSuspendModal(false)} title="Suspend Subscription" footer={<><Button variant="secondary" onClick={() => setShowSuspendModal(false)}>{t('admin:restaurantSubscriptionsPage.cancel')}</Button><Button variant="primary" onClick={confirmSuspend} disabled={!suspendReason.trim()} style={{background: suspendReason.trim() ? '#DC2626' : '#6B7280'}}>{t('admin:restaurantSubscriptionsPage.suspendSubscription')}</Button></>}>
                <FormGroup>
                  <FormLabel>Restaurant: {selectedSubscription.restaurantName}</FormLabel>
                  <FormLabel>Suspension Reason:</FormLabel>
                  <TextArea
                    value={suspendReason}
                    onChange={(e) => setSuspendReason(e.target.value)}
                    placeholder="Enter reason for suspension..."
                    rows={4}
                  />
                </FormGroup>
                <div style={{color: '#DC2626', fontSize: '14px', marginTop: '8px'}}>
                  This will immediately stop all services for this restaurant.
                </div>
          </CommonModal>
        )}

        </Content>
      </Container>
      <ConfirmModal
        isOpen={cancelTarget !== null}
        title="Cancel subscription"
        message={cancelTarget
          ? `${cancelTarget.restaurantName}'s subscription will be cancelled. Billing stops and any scheduled plan change is dropped. Use Suspend instead if this is temporary.`
          : ''}
        onConfirm={confirmCancelSubscription}
        onCancel={() => setCancelTarget(null)}
        confirmText="Cancel subscription"
        cancelText="Keep it"
        type="danger"
      />
      <ConfirmModal
        isOpen={infoModal.open}
        title={infoModal.title}
        message={infoModal.message}
        onConfirm={() => setInfoModal({ open: false, title: '', message: '' })}
        onCancel={() => setInfoModal({ open: false, title: '', message: '' })}
        confirmText="OK"
        type="info"
        singleButton
      />
    </>
  );
};

export default RestaurantSubscriptionsPage;