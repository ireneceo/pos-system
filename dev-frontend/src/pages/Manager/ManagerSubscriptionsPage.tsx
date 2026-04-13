import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { StatsGrid, StatCard, StatValue, StatLabel } from '../../components/UI/StatCard';
import { useAuth } from '../../contexts/AuthContext';
import { useBrandCurrency } from '../../hooks/useBrandCurrency';
import { formatCurrency } from '../../utils/currency';
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
  border-bottom: 1px solid #E6EBF1;
  margin-bottom: 0;
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
    color: #6B7280;
    border: 1px solid #E6EBF1;
    
    &:hover {
      background: #F8FAFC;
      color: #0A2540;
      border-color: #CBD5E1;
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
  border: 1px solid #E6EBF1;
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
      case 'basic': return 'linear-gradient(135deg, #6B7280 0%, #9CA3AF 100%)';
      default: return '#F3F4F6';
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
      default: return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'active': return '#059669';
      case 'overdue': return '#DC2626';
      case 'suspended': return '#D97706';
      default: return '#6B7280';
    }
  }};
`;

const NextBilling = styled.div`
  font-size: 12px;
  color: #6B7280;
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
  color: #6B7280;
`;

const UsageValue = styled.div<{ warning?: boolean }>`
  font-size: 13px;
  font-weight: 600;
  color: ${props => props.warning ? '#D97706' : '#0A2540'};
`;

const UsageBar = styled.div`
  width: 100%;
  height: 4px;
  background: #F3F4F6;
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
  color: #374151;
  margin-bottom: 12px;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FeatureItem = styled.li`
  font-size: 12px;
  color: #6B7280;
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
    color: #6B7280;
    border-color: #E6EBF1;
    
    &:hover {
      background: #F8FAFC;
      color: #0A2540;
      border-color: #CBD5E1;
    }
  `}
`;

const ManagerSubscriptionsPage: React.FC = () => {
  const { t } = useTranslation('admin');
  const { user } = useAuth();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const { defaultCurrency } = useBrandCurrency();
  const [selectedCurrency, setSelectedCurrency] = useState<string>('RM');

  useEffect(() => {
    if (defaultCurrency) {
      setSelectedCurrency(defaultCurrency);
    }
  }, [defaultCurrency]);

  useEffect(() => {
    const fetchManagerSubscriptions = async () => {
      try {
        if (!user?.id) return;
        
        console.log('🔄 Fetching restaurants for manager:', user.id);
        
        // Fetch restaurants for this manager
        const response = await fetch(`/api/restaurants/manager/${user.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch restaurants');
        }
        
        const restaurants = await response.json();
        console.log('📝 Manager restaurants:', restaurants);
        
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
        
        console.log('✅ Transformed subscriptions:', subscriptionsData);
        setSubscriptions(subscriptionsData);
        
      } catch (error) {
        console.error('❌ Error fetching manager subscriptions:', error);
        setSubscriptions([]);
      }
    };
    
    fetchManagerSubscriptions();
  }, [user]);

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

  const handleUpgradePlan = (subscriptionId: string) => {
    alert(`Upgrade plan functionality for ${subscriptionId} will be implemented`);
  };

  const handleManageSubscription = (subscriptionId: string) => {
    alert(`Manage subscription functionality for ${subscriptionId} will be implemented`);
  };

  const handleSuspendSubscription = (subscriptionId: string) => {
    alert(`Suspend subscription functionality for ${subscriptionId} will be implemented`);
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
    alert('Bulk billing management functionality will be implemented');
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
                      Next billing: {new Date(subscription.nextBilling).toLocaleDateString()}
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
                    <ActionButton onClick={() => handleManageSubscription(subscription.id)}>
                      Manage
                    </ActionButton>
                    <ActionButton variant="primary" onClick={() => handleUpgradePlan(subscription.id)}>
                      Upgrade
                    </ActionButton>
                    {subscription.status === 'active' && (
                      <ActionButton variant="danger" onClick={() => handleSuspendSubscription(subscription.id)}>
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
    </>
  );
};

export default ManagerSubscriptionsPage;