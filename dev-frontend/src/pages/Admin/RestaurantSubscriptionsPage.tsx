import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Modal as CommonModal } from '../../components/UI';
import { RestaurantSubscription } from '../../interfaces/RestaurantSubscription';
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import { formatCurrency } from '../../utils/currency';

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
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
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

// Filter Bar components are now imported from Common/FilterComponents

// Table styles matching StaffManagementPage
const SubscriptionTable = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2.5fr 1.5fr 1fr 1fr 1fr 1fr 180px;
  gap: 16px;
  padding: 16px 24px;
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
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
  border-bottom: 1px solid #F3F4F6;
  align-items: center;
  transition: all 0.2s;

  &:hover {
    background: #F8FAFC;
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
  color: #6B7280;
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
  background: ${props => props.type === 'self' ? '#ECFDF5' : '#DBEAFE'};
  color: ${props => props.type === 'self' ? '#059669' : '#1E40AF'};
`;

const PlanBadge = styled.span<{ plan: string }>`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${props => {
    switch(props.plan) {
      case 'enterprise': return '#EDE9FE';
      case 'professional': return '#DBEAFE';
      case 'basic': return '#F3F4F6';
      default: return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch(props.plan) {
      case 'enterprise': return '#7C3AED';
      case 'professional': return '#1E40AF';
      case 'basic': return '#6B7280';
      default: return '#6B7280';
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
  white-space: nowrap;
  text-transform: uppercase;
  background: ${props => {
    switch(props.status) {
      case 'active': return '#ECFDF5';
      case 'trial': return '#FEF3C7';
      case 'expired': return '#FEE2E2';
      case 'suspended': return '#F3F4F6';
      case 'cancelled': return '#FEF2F2';
      default: return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'active': return '#059669';
      case 'trial': return '#D97706';
      case 'expired': return '#DC2626';
      case 'suspended': return '#6B7280';
      case 'cancelled': return '#DC2626';
      default: return '#6B7280';
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
  background: #F3F4F6;
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
  color: #6B7280;
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
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  color: #6B7280;
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
  color: #6B7280;
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
  border: 1px solid #E6EBF1;
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
  const [subscriptions, setSubscriptions] = useState<RestaurantSubscription[]>([]);
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
  const [showAddRestaurantModal, setShowAddRestaurantModal] = useState(false);
  
  // Form states
  const [newPlan, setNewPlan] = useState('');
  const [newPaymentModel, setNewPaymentModel] = useState('');
  const [suspendReason, setSuspendReason] = useState('');
  
  // Add restaurant form states
  const [newRestaurant, setNewRestaurant] = useState({
    name: '',
    managerId: '',
    managerName: '',
    planType: 'basic',
    paymentModel: 'self' as 'self' | 'manager',
    billingCycle: 'monthly' as 'monthly' | 'annual'
  });

  useEffect(() => {
    // TODO: Implement API call to fetch restaurant subscriptions
    setSubscriptions([]);
  }, []);

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
  const selfPayingRestaurants = subscriptions.filter(s => s.paymentModel === 'self').length;
  const monthlyRevenue = subscriptions
    .filter(s => s.status === 'active')
    .reduce((sum, s) => sum + (s.billingCycle === 'monthly' ? s.monthlyFee : s.annualFee / 12), 0);

  const formatLimit = (limit: number) => limit === -1 ? 'Unlimited' : limit.toLocaleString();
  
  // Modal handlers
  const handleViewDetails = (subscription: RestaurantSubscription) => {
    setSelectedSubscription(subscription);
    setShowDetailsModal(true);
  };
  
  const handleChangePlan = (subscription: RestaurantSubscription) => {
    setSelectedSubscription(subscription);
    setNewPlan(subscription.planType);
    setShowPlanModal(true);
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
  
  const handleReactivate = (subscriptionId: string) => {
    setSubscriptions(prev => prev.map(sub => 
      sub.id === subscriptionId 
        ? { ...sub, status: 'active', updatedAt: new Date().toISOString().split('T')[0] }
        : sub
    ));
    alert('Subscription reactivated successfully!');
  };
  
  const confirmChangePlan = () => {
    if (!selectedSubscription) return;
    
    const planPricing = {
      basic: { monthly: 29, annual: 290, orderLimit: 1000 },
      professional: { monthly: 99, annual: 990, orderLimit: 10000 },
      enterprise: { monthly: 199, annual: 2190, orderLimit: -1 }
    };
    
    const pricing = planPricing[newPlan as keyof typeof planPricing];
    
    setSubscriptions(prev => prev.map(sub => 
      sub.id === selectedSubscription.id 
        ? {
            ...sub,
            planType: newPlan as 'basic' | 'professional' | 'enterprise',
            monthlyFee: pricing.monthly,
            annualFee: pricing.annual,
            orderLimit: pricing.orderLimit,
            updatedAt: new Date().toISOString().split('T')[0]
          }
        : sub
    ));
    
    setShowPlanModal(false);
    alert('Plan changed successfully!');
  };
  
  const confirmSwitchPayment = () => {
    if (!selectedSubscription) return;
    
    setSubscriptions(prev => prev.map(sub => 
      sub.id === selectedSubscription.id 
        ? { 
            ...sub, 
            paymentModel: newPaymentModel as 'self' | 'manager',
            updatedAt: new Date().toISOString().split('T')[0]
          }
        : sub
    ));
    
    setShowPaymentModal(false);
    alert('Payment method updated successfully!');
  };
  
  const confirmSuspend = () => {
    if (!selectedSubscription || !suspendReason) return;
    
    setSubscriptions(prev => prev.map(sub => 
      sub.id === selectedSubscription.id 
        ? { 
            ...sub, 
            status: 'suspended',
            updatedAt: new Date().toISOString().split('T')[0]
          }
        : sub
    ));
    
    setShowSuspendModal(false);
    alert('Subscription suspended successfully!');
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
  
  // Add restaurant functionality
  const handleAddRestaurant = () => {
    setNewRestaurant({
      name: '',
      managerId: '',
      managerName: '',
      planType: 'basic',
      paymentModel: 'self',
      billingCycle: 'monthly'
    });
    setShowAddRestaurantModal(true);
  };
  
  const confirmAddRestaurant = () => {
    if (!newRestaurant.name || !newRestaurant.managerName) {
      alert('Please fill in all required fields');
      return;
    }
    
    const planPricing = {
      basic: { monthly: 29, annual: 290, orderLimit: 1000 },
      professional: { monthly: 99, annual: 990, orderLimit: 10000 },
      enterprise: { monthly: 199, annual: 2190, orderLimit: -1 }
    };
    
    const pricing = planPricing[newRestaurant.planType as keyof typeof planPricing];
    
    const newSubscription: RestaurantSubscription = {
      id: `sub-rest-${Date.now()}`,
      restaurantId: `rest-${Date.now()}`,
      restaurantName: newRestaurant.name,
      managerId: newRestaurant.managerId || `mgr-${Date.now()}`,
      managerName: newRestaurant.managerName,
      planType: newRestaurant.planType as 'basic' | 'professional' | 'enterprise',
      status: 'trial',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days trial
      monthlyFee: pricing.monthly,
      annualFee: pricing.annual,
      billingCycle: newRestaurant.billingCycle,
      orderLimit: pricing.orderLimit,
      currentOrders: 0,
      usagePercentage: 0,
      paymentModel: newRestaurant.paymentModel,
      payerId: newRestaurant.paymentModel === 'self' ? `rest-${Date.now()}` : newRestaurant.managerId,
      payerName: newRestaurant.paymentModel === 'self' ? newRestaurant.name : newRestaurant.managerName,
      features: pricing.orderLimit === 1000 
        ? ['Up to 1k orders/month', 'Basic analytics', 'Email support']
        : pricing.orderLimit === 10000
        ? ['Up to 10k orders/month', 'Advanced analytics', 'Priority support']
        : ['Unlimited orders', 'Custom analytics', '24/7 support', 'Multi-location'],
      lastPayment: '-',
      nextPayment: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      autoRenew: false,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    
    setSubscriptions(prev => [newSubscription, ...prev]);
    setShowAddRestaurantModal(false);
    alert('Restaurant added successfully with 30-day trial!');
  };

  return (
    <>
      <Container>
        <Header>
          <Title>Restaurant Subscriptions</Title>
          <ActionSection>
            <Button variant="secondary" onClick={handleExportReport}>Export Report</Button>
            <Button variant="primary" onClick={handleAddRestaurant}>Add Restaurant</Button>
          </ActionSection>
        </Header>
        <Content>

        <StatsGrid>
          <StatCard color="#059669">
            <StatValue>{totalSubscriptions}</StatValue>
            <StatLabel>Total Restaurants</StatLabel>
          </StatCard>
          <StatCard color="#2563EB">
            <StatValue>{activeSubscriptions}</StatValue>
            <StatLabel>Active Subscriptions</StatLabel>
          </StatCard>
          <StatCard color="#D97706">
            <StatValue>{trialSubscriptions}</StatValue>
            <StatLabel>Trial Subscriptions</StatLabel>
          </StatCard>
          <StatCard color="#7C3AED">
            <StatValue>{selfPayingRestaurants}</StatValue>
            <StatLabel>Self-Paying</StatLabel>
          </StatCard>
          <StatCard color="#DC2626">
            <StatValue>{formatCurrency(monthlyRevenue)}</StatValue>
            <StatLabel>Monthly Revenue</StatLabel>
          </StatCard>
        </StatsGrid>

        <FilterBar>
          <FilterSelect
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="trial">Trial</option>
            <option value="expired">Expired</option>
            <option value="suspended">Suspended</option>
            <option value="cancelled">Cancelled</option>
          </FilterSelect>

          <FilterSelect
            value={filterPlan}
            onChange={(e) => setFilterPlan(e.target.value)}
          >
            <option value="all">All Plans</option>
            <option value="basic">Basic</option>
            <option value="professional">Professional</option>
            <option value="enterprise">Enterprise</option>
          </FilterSelect>

          <FilterSelect
            value={filterPayment}
            onChange={(e) => setFilterPayment(e.target.value)}
          >
            <option value="all">All Payment Types</option>
            <option value="self">Self-Paying</option>
            <option value="manager">Manager-Paid</option>
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
            <span>Restaurant</span>
            <span>Manager</span>
            <span>Plan</span>
            <span>Price</span>
            <span>Status</span>
            <span>Usage</span>
            <span>Actions</span>
          </TableHeader>

          {filteredSubscriptions.map(subscription => (
            <TableRow key={subscription.id}>
              <RestaurantInfo>
                <RestaurantName>{subscription.restaurantName}</RestaurantName>
                <ManagerInfo>
                  <PaymentBadge type={subscription.paymentModel}>
                    {subscription.paymentModel === 'self' ? 'Self' : 'Manager'}
                  </PaymentBadge>
                  {subscription.payerName}
                </ManagerInfo>
              </RestaurantInfo>

              <div>
                <div style={{ fontSize: '14px', color: '#0A2540' }}>{subscription.managerName}</div>
                <div style={{ fontSize: '12px', color: '#6B7280' }}>{subscription.managerId}</div>
              </div>

              <PlanBadge plan={subscription.planType}>
                {subscription.planType}
              </PlanBadge>

              <PriceCell>
                {formatCurrency(subscription.billingCycle === 'monthly' ? subscription.monthlyFee : subscription.annualFee)}
                <div style={{ fontSize: '11px', color: '#6B7280' }}>
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
                    onClick={() => handleReactivate(subscription.id)}
                    disabled={subscription.status === 'cancelled'}
                  >
                    Reactivate
                  </ActionButton>
                )}
              </ActionButtons>
            </TableRow>
          ))}

          {filteredSubscriptions.length === 0 && (
            <div style={{ padding: '60px 20px', textAlign: 'center', color: '#6B7280' }}>
              No subscriptions found
            </div>
          )}
        </SubscriptionTable>
        
        {/* Details Modal */}
        {showDetailsModal && selectedSubscription && (
          <CommonModal isOpen={true} onClose={() => setShowDetailsModal(false)} title="Subscription Details" footer={<><Button variant="secondary" onClick={() => setShowDetailsModal(false)}>Close</Button></>}>
                <DetailSection>
                  <DetailLabel>Restaurant</DetailLabel>
                  <DetailValue>{selectedSubscription.restaurantName}</DetailValue>
                </DetailSection>
                <DetailSection>
                  <DetailLabel>Manager</DetailLabel>
                  <DetailValue>{selectedSubscription.managerName}</DetailValue>
                </DetailSection>
                <DetailSection>
                  <DetailLabel>Plan</DetailLabel>
                  <DetailValue>{selectedSubscription.planType}</DetailValue>
                </DetailSection>
                <DetailSection>
                  <DetailLabel>Status</DetailLabel>
                  <StatusBadge status={selectedSubscription.status}>{selectedSubscription.status}</StatusBadge>
                </DetailSection>
                <DetailSection>
                  <DetailLabel>Pricing</DetailLabel>
                  <DetailValue>
                    {formatCurrency(selectedSubscription.billingCycle === 'monthly' ? selectedSubscription.monthlyFee : selectedSubscription.annualFee)}
                    /{selectedSubscription.billingCycle}
                  </DetailValue>
                </DetailSection>
                <DetailSection>
                  <DetailLabel>Order Usage</DetailLabel>
                  <DetailValue>
                    {selectedSubscription.currentOrders.toLocaleString()} / {formatLimit(selectedSubscription.orderLimit)}
                    {selectedSubscription.orderLimit > 0 && ` (${selectedSubscription.usagePercentage}%)`}
                  </DetailValue>
                </DetailSection>
                <DetailSection>
                  <DetailLabel>Payment Model</DetailLabel>
                  <DetailValue>
                    <PaymentBadge type={selectedSubscription.paymentModel}>
                      {selectedSubscription.paymentModel === 'self' ? 'Self-Paying' : 'Manager-Paid'}
                    </PaymentBadge>
                    <div style={{fontSize: '12px', color: '#6B7280', marginTop: '4px'}}>
                      Paid by: {selectedSubscription.payerName}
                    </div>
                  </DetailValue>
                </DetailSection>
                <DetailSection>
                  <DetailLabel>Features</DetailLabel>
                  <FeaturesList>
                    {selectedSubscription.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </FeaturesList>
                </DetailSection>
                <DetailSection>
                  <DetailLabel>Subscription Period</DetailLabel>
                  <DetailValue>{selectedSubscription.startDate} to {selectedSubscription.endDate}</DetailValue>
                </DetailSection>
                <DetailSection>
                  <DetailLabel>Last Payment</DetailLabel>
                  <DetailValue>{selectedSubscription.lastPayment}</DetailValue>
                </DetailSection>
                <DetailSection>
                  <DetailLabel>Next Payment</DetailLabel>
                  <DetailValue>{selectedSubscription.nextPayment}</DetailValue>
                </DetailSection>
                <DetailSection>
                  <DetailLabel>Auto Renew</DetailLabel>
                  <DetailValue>{selectedSubscription.autoRenew ? 'Yes' : 'No'}</DetailValue>
                </DetailSection>
          </CommonModal>
        )}

        {/* Change Plan Modal */}
        {showPlanModal && selectedSubscription && (
          <CommonModal isOpen={true} onClose={() => setShowPlanModal(false)} title="Change Plan" footer={<><Button variant="secondary" onClick={() => setShowPlanModal(false)}>Cancel</Button><Button variant="primary" onClick={confirmChangePlan}>Change Plan</Button></>}>
                <FormGroup>
                  <FormLabel>Current Plan: {selectedSubscription.planType}</FormLabel>
                  <FormLabel>Select New Plan:</FormLabel>
                  <FilterSelect value={newPlan} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setNewPlan(e.target.value)}>
                    <option value="basic">Basic - RM 29/month (Up to 1k orders)</option>
                    <option value="professional">Professional - RM 99/month (Up to 10k orders)</option>
                    <option value="enterprise">Enterprise - RM 199/month (Unlimited orders)</option>
                  </FilterSelect>
                </FormGroup>
          </CommonModal>
        )}

        {/* Switch Payment Modal */}
        {showPaymentModal && selectedSubscription && (
          <CommonModal isOpen={true} onClose={() => setShowPaymentModal(false)} title="Switch Payment Method" footer={<><Button variant="secondary" onClick={() => setShowPaymentModal(false)}>Cancel</Button><Button variant="primary" onClick={confirmSwitchPayment}>Update Payment</Button></>}>
                <FormGroup>
                  <FormLabel>Current: {selectedSubscription.paymentModel === 'self' ? 'Self-Paying' : 'Manager-Paid'}</FormLabel>
                  <FormLabel>Select New Payment Method:</FormLabel>
                  <FilterSelect value={newPaymentModel} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setNewPaymentModel(e.target.value)}>
                    <option value="self">Self-Paying (Restaurant pays directly)</option>
                    <option value="manager">Manager-Paid (Manager pays on behalf)</option>
                  </FilterSelect>
                </FormGroup>
          </CommonModal>
        )}

        {/* Suspend Modal */}
        {showSuspendModal && selectedSubscription && (
          <CommonModal isOpen={true} onClose={() => setShowSuspendModal(false)} title="Suspend Subscription" footer={<><Button variant="secondary" onClick={() => setShowSuspendModal(false)}>Cancel</Button><Button variant="primary" onClick={confirmSuspend} disabled={!suspendReason.trim()} style={{background: suspendReason.trim() ? '#DC2626' : '#9CA3AF'}}>Suspend Subscription</Button></>}>
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

        {/* Add Restaurant Modal */}
        {showAddRestaurantModal && (
          <CommonModal isOpen={true} onClose={() => setShowAddRestaurantModal(false)} title="Add New Restaurant" footer={<><Button variant="secondary" onClick={() => setShowAddRestaurantModal(false)}>Cancel</Button><Button variant="primary" onClick={confirmAddRestaurant} disabled={!newRestaurant.name || !newRestaurant.managerName}>Add Restaurant</Button></>}>
                <FormGroup>
                  <FormLabel>Restaurant Name *</FormLabel>
                  <SearchInput
                    value={newRestaurant.name}
                    onChange={(e) => setNewRestaurant(prev => ({...prev, name: e.target.value}))}
                    placeholder="Enter restaurant name..."
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Manager Name *</FormLabel>
                  <SearchInput
                    value={newRestaurant.managerName}
                    onChange={(e) => setNewRestaurant(prev => ({...prev, managerName: e.target.value}))}
                    placeholder="Enter manager name..."
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Manager ID (optional)</FormLabel>
                  <SearchInput
                    value={newRestaurant.managerId}
                    onChange={(e) => setNewRestaurant(prev => ({...prev, managerId: e.target.value}))}
                    placeholder="Auto-generated if empty"
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Initial Plan</FormLabel>
                  <FilterSelect
                    value={newRestaurant.planType}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setNewRestaurant(prev => ({...prev, planType: e.target.value as 'basic' | 'professional' | 'enterprise'}))}
                  >
                    <option value="basic">Basic - RM 29/month (Up to 1k orders)</option>
                    <option value="professional">Professional - RM 99/month (Up to 10k orders)</option>
                    <option value="enterprise">Enterprise - RM 199/month (Unlimited orders)</option>
                  </FilterSelect>
                </FormGroup>
                <FormGroup>
                  <FormLabel>Payment Model</FormLabel>
                  <FilterSelect
                    value={newRestaurant.paymentModel}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setNewRestaurant(prev => ({...prev, paymentModel: e.target.value as 'self' | 'manager'}))}
                  >
                    <option value="self">Self-Paying (Restaurant pays directly)</option>
                    <option value="manager">Manager-Paid (Manager pays on behalf)</option>
                  </FilterSelect>
                </FormGroup>
                <FormGroup>
                  <FormLabel>Billing Cycle</FormLabel>
                  <FilterSelect
                    value={newRestaurant.billingCycle}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setNewRestaurant(prev => ({...prev, billingCycle: e.target.value as 'monthly' | 'annual'}))}
                  >
                    <option value="monthly">Monthly</option>
                    <option value="annual">Annual (10% discount)</option>
                  </FilterSelect>
                </FormGroup>
                <div style={{color: '#059669', fontSize: '14px', padding: '12px', background: '#ECFDF5', borderRadius: '8px', marginTop: '16px'}}>
                  New restaurants start with a 30-day free trial period
                </div>
          </CommonModal>
        )}
        </Content>
      </Container>
    </>
  );
};

export default RestaurantSubscriptionsPage;