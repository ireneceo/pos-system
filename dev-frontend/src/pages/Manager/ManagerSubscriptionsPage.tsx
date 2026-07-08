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
  nextBilling: string;
  features: string[];
  usage: {
    currentMenuItems: number;
    menuItemLimit: number;
    monthlyTransactions: number;
    storageUsed: number;
    storageLimit: number;
  };
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
  overflow: hidden;
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

interface PlanOptionData {
  id: number;
  name: string;
  display_name: string;
  monthly_price: number;
  annual_price: number;
  is_current: boolean;
  change_type: 'upgrade' | 'downgrade' | null;
  limits: { orders: number; staff: number; menu_items: number };
}

interface PlanOptionsCurrent {
  plan_type: string;
  billing_cycle: string;
  currency: string;
  can_change: boolean;
  change_blocked_reason: string | null;
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

  useEffect(() => {
    if (defaultCurrency) {
      setSelectedCurrency(defaultCurrency);
    }
  }, [defaultCurrency]);

  const loadSubscriptions = useCallback(async () => {
    try {
      if (!user?.id) return;

      // Fetch restaurants for this manager
      const response = await fetch(`/api/restaurants/manager/${user.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch restaurants');
      }

      const restaurants = await response.json();

      // Transform restaurant data to subscription format
      const subscriptionsData: Subscription[] = restaurants.map((restaurant: any) => {
          const planType = restaurant.plan_type?.toLowerCase().replace(' plan', '') || 'basic';
          const isActive = restaurant.status === 'active';
          
          // Define plan features and limits based on menu quantities
          const planFeatures: { [key: string]: { features: string[], limits: { menuItems: number, storage: number } } } = {
            basic: {
              features: ['Up to 50 menu items', 'Basic POS features', 'Email support', '10GB storage', 'Monthly reports'],
              limits: { menuItems: 50, storage: 10 }
            },
            professional: {
              features: ['Up to 200 menu items', 'Advanced POS features', 'Priority support', '50GB storage', 'Real-time analytics'],
              limits: { menuItems: 200, storage: 50 }
            },
            enterprise: {
              features: ['Unlimited menu items', 'Full POS suite', '24/7 support', 'Unlimited storage', 'Custom integrations'],
              limits: { menuItems: -1, storage: -1 }
            }
          };
          
          const plan = planFeatures[planType] || planFeatures.basic;
          
          return {
            id: `sub-${restaurant.id}`,
            restaurantId: restaurant.id.toString(),
            restaurantName: restaurant.name,
            planName: restaurant.plan_type || 'Basic Plan',
            planType: planType as 'basic' | 'professional' | 'enterprise',
            monthlyFee: parseFloat(restaurant.plan_amount) || 29,
            status: isActive ? 'active' : (restaurant.status === 'cancelled' ? 'cancelled' : restaurant.status === 'suspended' ? 'suspended' : 'expired'),
            nextBilling: restaurant.subscription_end ? new Date(restaurant.subscription_end).toISOString().split('T')[0] : new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
            features: plan.features,
            usage: {
              currentMenuItems: Math.floor(Math.random() * (plan.limits.menuItems > 0 ? plan.limits.menuItems * 0.7 : 150)) + 10,
              menuItemLimit: plan.limits.menuItems,
              monthlyTransactions: Math.floor(Math.random() * 2000) + 500,
              storageUsed: Math.floor(Math.random() * (plan.limits.storage > 0 ? plan.limits.storage * 0.8 : 100)) + 5,
              storageLimit: plan.limits.storage
            }
          };
        });
        
      setSubscriptions(subscriptionsData);

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

  const handleManageSubscription = (subscription: Subscription) => {
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

  const handleBulkBilling = () => {
    setInfoModal({ open: true, title: 'Coming Soon', message: 'Bulk billing management will be available in an upcoming release.' });
  };

  return (
    <>
      <Container>
        <Header>
          <Title>{t('admin:managerSubscriptionsPage.subscriptions')}</Title>
          <ActionSection>
            <Button variant="secondary" onClick={handleExportData}>{t('admin:managerSubscriptionsPage.exportReport')}</Button>
            <Button variant="primary" onClick={handleBulkBilling}>{t('admin:managerSubscriptionsPage.manageBilling')}</Button>
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
                      Next billing: {formatDateTime(subscription.nextBilling, null, { year: 'numeric', month: '2-digit', day: '2-digit' })}
                    </NextBilling>
                  </StatusSection>

                  <UsageSection>
                    <SectionTitle>{t('admin:managerSubscriptionsPage.currentUsage')}</SectionTitle>
                    <UsageItem>
                      <UsageLabel>{t('admin:managerSubscriptionsPage.menuItems')}</UsageLabel>
                      <UsageValue warning={getUsagePercentage(subscription.usage.currentMenuItems, subscription.usage.menuItemLimit) >= 80}>
                        {formatUsage(subscription.usage.currentMenuItems, subscription.usage.menuItemLimit)}
                      </UsageValue>
                    </UsageItem>
                    {subscription.usage.menuItemLimit !== -1 && (
                      <UsageBar>
                        <UsageProgress 
                          percentage={getUsagePercentage(subscription.usage.currentMenuItems, subscription.usage.menuItemLimit)}
                          warning={getUsagePercentage(subscription.usage.currentMenuItems, subscription.usage.menuItemLimit) >= 80}
                        />
                      </UsageBar>
                    )}

                    <UsageItem style={{ marginTop: '12px' }}>
                      <UsageLabel>{t('admin:managerSubscriptionsPage.monthlyTransactions')}</UsageLabel>
                      <UsageValue>
                        {subscription.usage.monthlyTransactions.toLocaleString()}
                      </UsageValue>
                    </UsageItem>

                    <UsageItem style={{ marginTop: '12px' }}>
                      <UsageLabel>{t('admin:managerSubscriptionsPage.storage')}</UsageLabel>
                      <UsageValue warning={getUsagePercentage(subscription.usage.storageUsed, subscription.usage.storageLimit) >= 80}>
                        {subscription.usage.storageLimit === -1 ? `${subscription.usage.storageUsed}GB` : `${subscription.usage.storageUsed}GB / ${subscription.usage.storageLimit}GB`}
                      </UsageValue>
                    </UsageItem>
                    {subscription.usage.storageLimit !== -1 && (
                      <UsageBar>
                        <UsageProgress 
                          percentage={getUsagePercentage(subscription.usage.storageUsed, subscription.usage.storageLimit)}
                          warning={getUsagePercentage(subscription.usage.storageUsed, subscription.usage.storageLimit) >= 80}
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

                  <ActionButtons>
                    <ActionButton onClick={() => handleManageSubscription(subscription)}>
                      Manage
                    </ActionButton>
                    <ActionButton variant="primary" onClick={() => handleUpgradePlan(subscription)}>
                      Change Plan
                    </ActionButton>
                    {subscription.status === 'active' && (
                      <ActionButton variant="danger" onClick={() => handleSuspendSubscription()}>
                        Suspend
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
    </>
  );
};

export default ManagerSubscriptionsPage;