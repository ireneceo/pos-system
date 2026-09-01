import React, { useState, useEffect, useCallback } from 'react';
import ConfirmModal from '../../components/ConfirmModal';
import { Modal as CommonModal } from '../../components/UI';
import styled from 'styled-components';
import { StatsGrid, StatCard, StatValue, StatLabel } from '../../components/UI/StatCard';
import { useAuth } from '../../contexts/AuthContext';
import { useBrandCurrency } from '../../hooks/useBrandCurrency';
import { formatCurrency } from '../../utils/currency';
import { formatDateTime } from '../../utils/timezone';
import { getAuthToken } from '../../utils/auth';
import { useTranslation } from 'react-i18next';

interface Subscription {
  id: string;
  restaurantId: string;
  restaurantName: string;
  planName: string;
  planType: 'basic' | 'professional' | 'enterprise';
  monthlyFee: number;
  status: 'active' | 'trial' | 'expired' | 'suspended' | 'cancelled';
  nextBilling: string | null;
  features: string[];
  // Real usage from the subscription API (staff/menu/orders are the same counters the
  // backend enforces on downgrade). Storage has no meter → not shown rather than faked.
  usage: {
    menuItems: number;
    menuItemLimit: number;
    monthlyOrders: number;
    orderLimit: number;
    staff: number;
    staffLimit: number;
  };
  pending: {
    planType: string;
    changeDate: string | null;
    changeType: string | null;
  } | null;
  paymentModel: string;      // 'restaurant' | 'brand_manager' | 'foodcourt_manager' | 'restaurant_owner'
  billedToName: string | null;
}

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

const ActionSection = styled.div`
  display: flex;
  gap: 12px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
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

const SubscriptionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 24px;
`;

const SubscriptionCard = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #C7CED6;
  /* 2026-09-01: 세로만 hidden, 가로는 auto. overflow:hidden 이면 안의 표가 넓어질 때
     스크롤이 아니라 잘려서 오른쪽 열에 손이 닿지 않는다(1025~1400px 노트북 구간).
     세로 hidden 유지라 둥근 모서리는 그대로다. 실측: scripts/responsive-audit.js */
  overflow-x: auto;
  overflow-y: hidden;
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

const CardHeader = styled.div<{ planType: string }>`
  padding: 20px 24px;
  background: ${props => {
    switch(props.planType) {
      case 'enterprise': return 'linear-gradient(135deg, #5B21B6 0%, #7C3AED 100%)';
      case 'professional': return 'linear-gradient(135deg, #1E40AF 0%, #2563EB 100%)';
      case 'basic': return 'linear-gradient(135deg, #4B5563 0%, #6B7280 100%)';
      default: return '#F1F4F8';
    }
  }};
  color: white;
`;

const RestaurantName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 4px 0;
`;

const PlanInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PlanName = styled.div`
  font-size: 14px;
  opacity: 0.9;
  text-transform: capitalize;
`;

const MonthlyFee = styled.div`
  font-size: 20px;
  font-weight: 700;
`;

const CardContent = styled.div`
  padding: 24px;
`;

const StatusSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  background: ${props => {
    switch(props.status) {
      case 'active': return '#ECFDF5';
      case 'overdue': return '#FEF2F2';
      case 'suspended': return '#FEF3C7';
      default: return '#F1F4F8';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'active': return '#059669';
      case 'overdue': return '#DC2626';
      case 'suspended': return '#D97706';
      default: return '#4B5563';
    }
  }};
`;

const NextBilling = styled.div`
  font-size: 12px;
  color: #4B5563;
`;

const UsageSection = styled.div`
  margin-bottom: 20px;
`;

const UsageItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const UsageLabel = styled.div`
  font-size: 13px;
  color: #4B5563;
`;

const UsageValue = styled.div<{ warning?: boolean }>`
  font-size: 13px;
  font-weight: 600;
  color: ${props => props.warning ? '#D97706' : '#0A2540'};
`;

const UsageBar = styled.div`
  width: 100%;
  height: 4px;
  background: #F1F4F8;
  border-radius: 2px;
  margin-top: 4px;
  overflow: hidden;
`;

const UsageProgress = styled.div<{ percentage: number; warning?: boolean }>`
  width: ${props => props.percentage}%;
  height: 100%;
  background: ${props => props.warning ? '#D97706' : props.percentage >= 90 ? '#DC2626' : '#059669'};
  transition: all 0.3s;
`;

const FeaturesSection = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 12px;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FeatureItem = styled.li`
  font-size: 12px;
  color: #4B5563;
  padding: 2px 0;
  position: relative;
  padding-left: 16px;
  
  &:before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #059669;
    font-weight: bold;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'danger' }>`
  flex: 1;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;
  
  ${props => props.variant === 'primary' ? `
    background: #635BFF;
    color: white;
    border-color: #635BFF;
    
    &:hover {
      background: #5A51E6;
    }
  ` : props.variant === 'danger' ? `
    background: #FEF2F2;
    color: #EF4444;
    border-color: #EF4444;

    &:hover {
      background: #FEE2E2;
    }
  ` : `
    background: white;
    color: #4B5563;
    border-color: #C7CED6;
    
    &:hover {
      background: #F1F4F8;
      color: #0A2540;
      border-color: #64748B;
    }
  `}
`;

const ModalSubtitle = styled.div`
  font-size: 14px;
  color: #4B5563;
  margin-bottom: 20px;
`;

const PlanList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const PlanOption = styled.button<{ selected?: boolean; disabled?: boolean }>`
  text-align: left;
  padding: 16px;
  border-radius: 8px;
  border: 2px solid ${props => props.selected ? '#635BFF' : '#C7CED6'};
  background: ${props => props.selected ? '#F5F3FF' : 'white'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.6 : 1};
  transition: all 0.15s;

  &:hover {
    border-color: ${props => props.disabled ? '#C7CED6' : '#635BFF'};
  }
`;

const PlanOptionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
`;

const PlanOptionName = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
`;

const PlanOptionPrice = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: #0A2540;
`;

const PlanOptionMeta = styled.div`
  font-size: 12px;
  color: #4B5563;
  margin-top: 6px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
`;

const ChangeTag = styled.span<{ kind?: string }>`
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 6px;
  background: ${props => props.kind === 'upgrade' ? '#ECFDF5' : props.kind === 'downgrade' ? '#FEF3C7' : '#F1F4F8'};
  color: ${props => props.kind === 'upgrade' ? '#059669' : props.kind === 'downgrade' ? '#D97706' : '#4B5563'};
`;

const CurrentTag = styled.span`
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 6px;
  background: #EEF2FF;
  color: #635BFF;
`;

const CycleToggle = styled.div`
  display: flex;
  gap: 8px;
  margin: 16px 0;
`;

const CycleButton = styled.button<{ active?: boolean }>`
  flex: 1;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid ${props => props.active ? '#635BFF' : '#C7CED6'};
  background: ${props => props.active ? '#635BFF' : 'white'};
  color: ${props => props.active ? 'white' : '#4B5563'};
`;

const BlockedNote = styled.div`
  padding: 16px;
  background: #FEF3C7;
  border-radius: 8px;
  color: #92400E;
  font-size: 14px;
`;

const ModalError = styled.div`
  padding: 12px 16px;
  background: #FEF2F2;
  border-radius: 8px;
  color: #DC2626;
  font-size: 13px;
  margin-bottom: 16px;
`;

const PendingNote = styled.div`
  padding: 12px 16px;
  background: #FFFBEB;
  border: 1px solid #FDE68A;
  border-radius: 8px;
  color: #92400E;
  font-size: 13px;
  line-height: 1.5;
  margin-bottom: 20px;
`;

const PendingCancelButton = styled.button`
  display: block;
  margin-top: 8px;
  padding: 0;
  background: none;
  border: none;
  color: #B45309;
  font-size: 13px;
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer;
`;

interface PlanOptionData {
  id: number;
  name: string;
  display_name: string;
  monthly_price: number;
  annual_price: number;
  features: string[];
  is_current: boolean;
  change_type: 'upgrade' | 'downgrade' | null;
  limits: { orders: number; staff: number; menu_items: number };
}

interface PlanOptionsCurrent {
  plan_type: string;
  plan_amount: number;
  billing_cycle: string;
  currency: string;
  status: string;
  subscription_end: string | null;
  can_change: boolean;
  change_blocked_reason: string | null;
  pending_plan_type: string | null;
  plan_change_date: string | null;
  plan_change_type: string | null;
  payment_model: string;
  billed_to_name: string | null;
  current_usage: { staff_count: number; menu_item_count: number; order_count: number };
}

const ManagerSubscriptionsPage: React.FC = () => {
  const { t } = useTranslation('admin');
  const { user } = useAuth();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [infoModal, setInfoModal] = useState<{ open: boolean; title: string; message: string }>({ open: false, title: '', message: '' });
  const { defaultCurrency } = useBrandCurrency();
  const [selectedCurrency, setSelectedCurrency] = useState<string>('RM');

  // Plan-change modal state
  const [planModal, setPlanModal] = useState<Subscription | null>(null);
  const [planOptions, setPlanOptions] = useState<PlanOptionData[]>([]);
  const [planCurrent, setPlanCurrent] = useState<PlanOptionsCurrent | null>(null);
  const [planLoading, setPlanLoading] = useState(false);
  const [planError, setPlanError] = useState<string | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
  const [selectedCycle, setSelectedCycle] = useState<'monthly' | 'annual'>('monthly');
  const [submitting, setSubmitting] = useState(false);
  const [cancelTarget, setCancelTarget] = useState<Subscription | null>(null);
  const [payerTarget, setPayerTarget] = useState<Subscription | null>(null);

  // Which "manager pays" model applies to this viewer — a Foodcourt manager bills via
  // the foodcourt, a Brand manager via the brand.
  const managerPaymentModel = (user?.role === 'Foodcourt General' || user?.role === 'Foodcourt Manager')
    ? 'foodcourt_manager'
    : 'brand_manager';

  useEffect(() => {
    if (defaultCurrency) {
      setSelectedCurrency(defaultCurrency);
    }
  }, [defaultCurrency]);

  const loadSubscriptions = useCallback(async () => {
    try {
      if (!user?.id) return;
      const token = getAuthToken();
      const auth = { headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) } };

      const response = await fetch(`/api/restaurants/manager/${user.id}`, auth);
      if (!response.ok) {
        throw new Error('Failed to fetch restaurants');
      }
      const restaurants = await response.json();

      // Per restaurant, read the subscription snapshot the backend actually bills on
      // (plan, price, usage counters, pending change). No client-side plan tables —
      // features/limits come from the PlanTemplate the plan is on.
      const subscriptionsData = await Promise.all(
        (restaurants || []).map(async (restaurant: any): Promise<Subscription | null> => {
          const res = await fetch(`/api/subscriptions/manager/restaurant/${restaurant.id}/plan-options`, auth);
          const json = await res.json().catch(() => ({}));
          if (!res.ok || !json.success) return null;

          const current: PlanOptionsCurrent = json.data.current;
          const plans: PlanOptionData[] = json.data.available_plans || [];
          const currentPlan = plans.find((p) => p.is_current);
          const limits = currentPlan?.limits || { orders: -1, staff: -1, menu_items: -1 };
          const shortType = (current.plan_type || '').toLowerCase().replace(' plan', '');

          return {
            id: `sub-${restaurant.id}`,
            restaurantId: String(restaurant.id),
            restaurantName: restaurant.name,
            planName: current.plan_type || 'No plan',
            planType: (['basic', 'professional', 'enterprise'].includes(shortType) ? shortType : 'basic') as Subscription['planType'],
            monthlyFee: current.plan_amount || 0,
            status: (['active', 'trial', 'expired', 'suspended', 'cancelled'].includes(current.status)
              ? current.status
              : 'expired') as Subscription['status'],
            nextBilling: current.subscription_end || null,
            features: currentPlan?.features || [],
            usage: {
              menuItems: current.current_usage?.menu_item_count ?? 0,
              menuItemLimit: limits.menu_items ?? -1,
              monthlyOrders: current.current_usage?.order_count ?? 0,
              orderLimit: limits.orders ?? -1,
              staff: current.current_usage?.staff_count ?? 0,
              staffLimit: limits.staff ?? -1,
            },
            pending: current.pending_plan_type
              ? {
                  planType: current.pending_plan_type,
                  changeDate: current.plan_change_date,
                  changeType: current.plan_change_type,
                }
              : null,
            paymentModel: current.payment_model || 'restaurant',
            billedToName: current.billed_to_name || null,
          };
        })
      );

      setSubscriptions(subscriptionsData.filter((s): s is Subscription => s !== null));
    } catch (error) {
      console.error('Error fetching manager subscriptions:', error);
      setSubscriptions([]);
    }
  }, [user]);

  useEffect(() => {
    loadSubscriptions();
  }, [loadSubscriptions]);

  const totalMonthlyFee = subscriptions.reduce((sum, sub) => sum + sub.monthlyFee, 0);
  const activeSubscriptions = subscriptions.filter(sub => sub.status === 'active').length;
  const inactiveSubscriptions = subscriptions.filter(sub => sub.status !== 'active').length;

  const formatUsage = (current: number, limit: number) => {
    if (limit === -1) return 'Unlimited';
    return `${current.toLocaleString()} / ${limit.toLocaleString()}`;
  };

  const getUsagePercentage = (current: number, limit: number) => {
    if (limit === -1) return 0;
    return Math.min((current / limit) * 100, 100);
  };

  const openPlanModal = async (subscription: Subscription) => {
    setPlanModal(subscription);
    setPlanOptions([]);
    setPlanCurrent(null);
    setSelectedPlanId(null);
    setPlanError(null);
    setPlanLoading(true);
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/subscriptions/manager/restaurant/${subscription.restaurantId}/plan-options`, {
        headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) }
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setPlanError(json.message || 'Failed to load plan options.');
        return;
      }
      const current: PlanOptionsCurrent = json.data.current;
      const plans: PlanOptionData[] = json.data.available_plans || [];
      setPlanCurrent(current);
      setPlanOptions(plans);
      setSelectedCycle(current.billing_cycle === 'annual' ? 'annual' : 'monthly');
    } catch (err) {
      console.error('Error loading plan options:', err);
      setPlanError('Failed to load plan options.');
    } finally {
      setPlanLoading(false);
    }
  };

  const closePlanModal = () => {
    setPlanModal(null);
    setPlanOptions([]);
    setPlanCurrent(null);
    setSelectedPlanId(null);
    setPlanError(null);
    setSubmitting(false);
  };

  const handleUpgradePlan = (subscription: Subscription) => {
    openPlanModal(subscription);
  };

  const handleConfirmPlanChange = async () => {
    if (!planModal || selectedPlanId == null) return;
    setSubmitting(true);
    setPlanError(null);
    try {
      const token = getAuthToken();
      const res = await fetch('/api/subscriptions/change-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({
          restaurant_id: planModal.restaurantId,
          new_plan_id: selectedPlanId,
          new_billing_cycle: selectedCycle
        })
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setPlanError(json.message || 'Failed to change plan.');
        setSubmitting(false);
        return;
      }
      closePlanModal();
      await loadSubscriptions();
    } catch (err) {
      console.error('Error changing plan:', err);
      setPlanError('Failed to change plan.');
      setSubmitting(false);
    }
  };

  const handleSuspendSubscription = () => {
    setInfoModal({
      open: true,
      title: 'Managed by System Admin',
      message: 'Suspending or cancelling a subscription is handled by the System Admin. Managers can upgrade or downgrade the plan only.'
    });
  };

  // Who pays this restaurant's POS subscription — the manager (brand/foodcourt) or the
  // restaurant itself. Switching also re-points the restaurant's unpaid invoices, so
  // both calls must land; ported from the previous Manager subscriptions page.
  const handlePaymentModelSwitch = async (subscription: Subscription) => {
    const nextModel = subscription.paymentModel === 'restaurant' ? managerPaymentModel : 'restaurant';
    setPayerTarget(null);
    try {
      const token = getAuthToken();
      const headers = { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) };

      const res = await fetch(`/api/restaurants/${subscription.restaurantId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ payment_model: nextModel })
      });
      if (!res.ok) {
        setInfoModal({ open: true, title: t('admin:managerSubscriptionsPage.couldNotSwitchPayer'), message: t('admin:managerSubscriptionsPage.switchPayerFailed') });
        return;
      }

      const invRes = await fetch(`/api/invoices/update-payer/${subscription.restaurantId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ payment_model: nextModel })
      });
      if (!invRes.ok) {
        setInfoModal({
          open: true,
          title: t('admin:managerSubscriptionsPage.payerSwitchedInvoicesUnchanged'),
          message: t('admin:managerSubscriptionsPage.payerSwitchedInvoicesUnchangedMessage')
        });
      }

      await loadSubscriptions();
    } catch (err) {
      console.error('Error switching payment model:', err);
      setInfoModal({ open: true, title: t('admin:managerSubscriptionsPage.couldNotSwitchPayer'), message: t('admin:managerSubscriptionsPage.switchPayerFailed') });
    }
  };

  // Cancel a scheduled (downgrade / cycle) change before it applies. Without this a
  // manager could schedule a change and have no way to undo it.
  const handleCancelPending = async (subscription: Subscription) => {
    setCancelTarget(null);
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/subscriptions/change-plan?restaurant_id=${encodeURIComponent(subscription.restaurantId)}`, {
        method: 'DELETE',
        headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) }
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.success) {
        setInfoModal({ open: true, title: t('admin:managerSubscriptionsPage.couldNotCancel'), message: json.message || t('admin:managerSubscriptionsPage.cancelScheduledFailed') });
        return;
      }
      await loadSubscriptions();
    } catch (err) {
      console.error('Error cancelling scheduled plan change:', err);
      setInfoModal({ open: true, title: t('admin:managerSubscriptionsPage.couldNotCancel'), message: t('admin:managerSubscriptionsPage.cancelScheduledFailed') });
    }
  };

  const handleExportData = () => {
    const exportData = {
      exportDate: new Date().toISOString(),
      manager: user?.name,
      totalSubscriptions: subscriptions.length,
      totalMonthlyFee,
      subscriptions: subscriptions.map(sub => ({
        restaurantName: sub.restaurantName,
        planName: sub.planName,
        monthlyFee: sub.monthlyFee,
        status: sub.status,
        nextBilling: sub.nextBilling,
        usage: sub.usage
      }))
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `subscription-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Container>
        <Header>
          <Title>{t('admin:managerSubscriptionsPage.subscriptions')}</Title>
          <ActionSection>
            <Button variant="secondary" onClick={handleExportData}>{t('admin:managerSubscriptionsPage.exportReport')}</Button>
          </ActionSection>
        </Header>
        
        <Content>
          <StatsGrid>
            <StatCard color="#059669">
              <StatValue>{subscriptions.length}</StatValue>
              <StatLabel>{t('admin:managerSubscriptionsPage.totalSubscriptions')}</StatLabel>
            </StatCard>
            <StatCard color="#2563EB">
              <StatValue>{activeSubscriptions}</StatValue>
              <StatLabel>{t('admin:managerSubscriptionsPage.activeSubscriptions')}</StatLabel>
            </StatCard>
            <StatCard color="#DC2626">
              <StatValue>{inactiveSubscriptions}</StatValue>
              <StatLabel>{t('admin:managerSubscriptionsPage.nonactiveSubscriptions')}</StatLabel>
            </StatCard>
            <StatCard color="#7C3AED">
              <StatValue>{formatCurrency(totalMonthlyFee, selectedCurrency)}</StatValue>
              <StatLabel>{t('admin:managerSubscriptionsPage.monthlyFees')}</StatLabel>
            </StatCard>
          </StatsGrid>

          <SubscriptionGrid>
            {subscriptions.map(subscription => (
              <SubscriptionCard key={subscription.id}>
                <CardHeader planType={subscription.planType}>
                  <RestaurantName>{subscription.restaurantName}</RestaurantName>
                  <PlanInfo>
                    <PlanName>{subscription.planName}</PlanName>
                    <MonthlyFee>{formatCurrency(subscription.monthlyFee, selectedCurrency)}/mo</MonthlyFee>
                  </PlanInfo>
                </CardHeader>

                <CardContent>
                  <StatusSection>
                    <StatusBadge status={subscription.status}>
                      {subscription.status}
                    </StatusBadge>
                    <NextBilling>
                      {t('admin:managerSubscriptionsPage.nextBilling')}: {subscription.nextBilling
                        ? formatDateTime(subscription.nextBilling, null, { year: 'numeric', month: '2-digit', day: '2-digit' })
                        : t('admin:managerSubscriptionsPage.notScheduled')}
                    </NextBilling>
                  </StatusSection>

                  {subscription.pending && (
                    <PendingNote>
                      <strong>
                        {subscription.pending.changeType === 'downgrade'
                          ? t('admin:managerSubscriptionsPage.downgradeScheduled')
                          : t('admin:managerSubscriptionsPage.changeScheduled')}
                      </strong>
                      {' '}&rarr; {subscription.pending.planType}
                      {subscription.pending.changeDate && (
                        <> on {formatDateTime(subscription.pending.changeDate, null, { year: 'numeric', month: '2-digit', day: '2-digit' })}</>
                      )}
                      <PendingCancelButton type="button" onClick={() => setCancelTarget(subscription)}>
                        {t('admin:managerSubscriptionsPage.cancelScheduledChange')}
                      </PendingCancelButton>
                    </PendingNote>
                  )}

                  <UsageSection>
                    <SectionTitle>{t('admin:managerSubscriptionsPage.currentUsage')}</SectionTitle>
                    <UsageItem>
                      <UsageLabel>{t('admin:managerSubscriptionsPage.menuItems')}</UsageLabel>
                      <UsageValue warning={getUsagePercentage(subscription.usage.menuItems, subscription.usage.menuItemLimit) >= 80}>
                        {formatUsage(subscription.usage.menuItems, subscription.usage.menuItemLimit)}
                      </UsageValue>
                    </UsageItem>
                    {subscription.usage.menuItemLimit !== -1 && (
                      <UsageBar>
                        <UsageProgress
                          percentage={getUsagePercentage(subscription.usage.menuItems, subscription.usage.menuItemLimit)}
                          warning={getUsagePercentage(subscription.usage.menuItems, subscription.usage.menuItemLimit) >= 80}
                        />
                      </UsageBar>
                    )}

                    <UsageItem style={{ marginTop: '12px' }}>
                      <UsageLabel>{t('admin:managerSubscriptionsPage.monthlyTransactions')}</UsageLabel>
                      <UsageValue warning={getUsagePercentage(subscription.usage.monthlyOrders, subscription.usage.orderLimit) >= 80}>
                        {formatUsage(subscription.usage.monthlyOrders, subscription.usage.orderLimit)}
                      </UsageValue>
                    </UsageItem>
                    {subscription.usage.orderLimit !== -1 && (
                      <UsageBar>
                        <UsageProgress
                          percentage={getUsagePercentage(subscription.usage.monthlyOrders, subscription.usage.orderLimit)}
                          warning={getUsagePercentage(subscription.usage.monthlyOrders, subscription.usage.orderLimit) >= 80}
                        />
                      </UsageBar>
                    )}

                    <UsageItem style={{ marginTop: '12px' }}>
                      <UsageLabel>{t('admin:managerSubscriptionsPage.staff')}</UsageLabel>
                      <UsageValue warning={getUsagePercentage(subscription.usage.staff, subscription.usage.staffLimit) >= 80}>
                        {formatUsage(subscription.usage.staff, subscription.usage.staffLimit)}
                      </UsageValue>
                    </UsageItem>
                    {subscription.usage.staffLimit !== -1 && (
                      <UsageBar>
                        <UsageProgress
                          percentage={getUsagePercentage(subscription.usage.staff, subscription.usage.staffLimit)}
                          warning={getUsagePercentage(subscription.usage.staff, subscription.usage.staffLimit) >= 80}
                        />
                      </UsageBar>
                    )}
                  </UsageSection>

                  <FeaturesSection>
                    <SectionTitle>{t('admin:managerSubscriptionsPage.planFeatures')}</SectionTitle>
                    <FeaturesList>
                      {subscription.features.map((feature, index) => (
                        <FeatureItem key={index}>{feature}</FeatureItem>
                      ))}
                    </FeaturesList>
                  </FeaturesSection>

                  <UsageItem style={{ marginTop: '16px' }}>
                    <UsageLabel>{t('admin:managerSubscriptionsPage.billedTo')}</UsageLabel>
                    <UsageValue>
                      {subscription.paymentModel === 'restaurant'
                        ? t('admin:managerSubscriptionsPage.billedToRestaurant')
                        : subscription.billedToName || '-'}
                    </UsageValue>
                  </UsageItem>

                  <ActionButtons>
                    <ActionButton variant="primary" onClick={() => handleUpgradePlan(subscription)}>
                      {t('admin:managerSubscriptionsPage.changePlan')}
                    </ActionButton>
                    <ActionButton onClick={() => setPayerTarget(subscription)}>
                      {subscription.paymentModel === 'restaurant'
                        ? t('admin:managerSubscriptionsPage.billToMe')
                        : t('admin:managerSubscriptionsPage.billToRestaurant')}
                    </ActionButton>
                    {subscription.status === 'active' && (
                      <ActionButton variant="danger" onClick={() => handleSuspendSubscription()}>
                        {t('admin:managerSubscriptionsPage.suspend')}
                      </ActionButton>
                    )}
                  </ActionButtons>
                </CardContent>
              </SubscriptionCard>
            ))}
          </SubscriptionGrid>
        </Content>
      </Container>
      {planModal && (
        <CommonModal
          isOpen={true}
          onClose={closePlanModal}
          title="Change Subscription Plan"
          footer={
            <>
              <Button variant="secondary" onClick={closePlanModal}>Cancel</Button>
              <Button
                variant="primary"
                onClick={handleConfirmPlanChange}
                disabled={
                  submitting ||
                  planLoading ||
                  !planCurrent?.can_change ||
                  selectedPlanId == null ||
                  planOptions.find(p => p.id === selectedPlanId)?.is_current
                }
              >
                {submitting ? 'Changing...' : 'Confirm Change'}
              </Button>
            </>
          }
        >
          <ModalSubtitle>
            {planModal.restaurantName}
            {planCurrent && <> &mdash; Current: {planCurrent.plan_type} ({planCurrent.billing_cycle})</>}
          </ModalSubtitle>

          {planError && <ModalError>{planError}</ModalError>}

          {planLoading && <div style={{ padding: '24px 0', color: '#4B5563' }}>Loading plan options...</div>}

          {!planLoading && planCurrent && !planCurrent.can_change && (
            <BlockedNote>
              {planCurrent.change_blocked_reason || 'This plan cannot be changed at the moment.'}
            </BlockedNote>
          )}

          {!planLoading && planCurrent?.can_change && (
            <>
              <CycleToggle>
                <CycleButton active={selectedCycle === 'monthly'} onClick={() => setSelectedCycle('monthly')}>
                  Monthly
                </CycleButton>
                <CycleButton active={selectedCycle === 'annual'} onClick={() => setSelectedCycle('annual')}>
                  Annual
                </CycleButton>
              </CycleToggle>

              <PlanList>
                {planOptions.map(plan => {
                  const price = selectedCycle === 'annual' ? plan.annual_price : plan.monthly_price;
                  const cur = planCurrent.currency;
                  return (
                    <PlanOption
                      key={plan.id}
                      selected={selectedPlanId === plan.id}
                      disabled={plan.is_current}
                      onClick={() => { if (!plan.is_current) setSelectedPlanId(plan.id); }}
                    >
                      <PlanOptionHeader>
                        <PlanOptionName>{plan.display_name || plan.name}</PlanOptionName>
                        <PlanOptionPrice>
                          {formatCurrency(price, cur)}/{selectedCycle === 'annual' ? 'yr' : 'mo'}
                        </PlanOptionPrice>
                      </PlanOptionHeader>
                      <PlanOptionMeta>
                        {plan.is_current && <CurrentTag>Current</CurrentTag>}
                        {plan.change_type === 'upgrade' && <ChangeTag kind="upgrade">Upgrade</ChangeTag>}
                        {plan.change_type === 'downgrade' && <ChangeTag kind="downgrade">Downgrade</ChangeTag>}
                        <span>
                          {plan.limits.orders === -1 ? 'Unlimited' : `Up to ${plan.limits.orders?.toLocaleString?.() ?? plan.limits.orders}`} orders/mo
                        </span>
                        <span>
                          {plan.limits.staff === -1 ? 'Unlimited' : plan.limits.staff} staff
                        </span>
                      </PlanOptionMeta>
                    </PlanOption>
                  );
                })}
              </PlanList>

              <div style={{ marginTop: '16px', fontSize: '13px', color: '#4B5563' }}>
                Upgrades apply immediately with prorated billing. Downgrades take effect at the next billing cycle.
              </div>
            </>
          )}
        </CommonModal>
      )}
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
      <ConfirmModal
        isOpen={payerTarget !== null}
        title={t('admin:managerSubscriptionsPage.changePayerTitle')}
        message={payerTarget
          ? (payerTarget.paymentModel === 'restaurant'
              ? `You will be billed for ${payerTarget.restaurantName}'s POS subscription from now on. Its unpaid invoices move to you.`
              : `${payerTarget.restaurantName} will be billed for its own POS subscription from now on. Its unpaid invoices move to the restaurant.`)
          : ''}
        onConfirm={() => { if (payerTarget) handlePaymentModelSwitch(payerTarget); }}
        onCancel={() => setPayerTarget(null)}
        confirmText="Confirm"
        type="warning"
      />
      <ConfirmModal
        isOpen={cancelTarget !== null}
        title={t('admin:managerSubscriptionsPage.cancelScheduledTitle')}
        message={cancelTarget
          ? `${cancelTarget.restaurantName} will stay on ${cancelTarget.planName}. The scheduled change to ${cancelTarget.pending?.planType} will be removed.`
          : ''}
        onConfirm={() => { if (cancelTarget) handleCancelPending(cancelTarget); }}
        onCancel={() => setCancelTarget(null)}
        confirmText="Cancel change"
        cancelText="Keep it"
        type="warning"
      />
    </>
  );
};

export default ManagerSubscriptionsPage;