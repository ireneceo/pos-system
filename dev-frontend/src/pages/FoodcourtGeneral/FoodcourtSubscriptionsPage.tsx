import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainLayout from '../../components/Layout/MainLayout';
import { useAuth } from '../../contexts/AuthContext';
import { RestaurantSubscription } from '../../interfaces/RestaurantSubscription';
import { API_BASE_URL } from '../../config/api';
import { formatCurrency } from '../../utils/currency';
import { useBrandCurrency } from '../../hooks/useBrandCurrency';

const Container = styled.div`
  min-height: 100vh;
  background: #FAFBFC;
`;

const Content = styled.div`
  padding: 32px;
  
  @media (max-width: 768px) {
    padding: 20px;
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
      transform: translateY(-1px);
    }
  ` : `
    background: white;
    color: #374151;
    border: 1px solid #E6EBF1;
    
    &:hover {
      background: #F8FAFC;
      border-color: #635BFF;
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

const StatTrend = styled.div<{ positive?: boolean }>`
  font-size: 12px;
  color: ${props => props.positive ? '#059669' : '#DC2626'};
  font-weight: 500;
  margin-top: 4px;
`;

// Unused styled component - kept for reference
// const StatDetail = styled.div`
//   font-size: 12px;
//   color: #9CA3AF;
// `;

const SubscriptionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  gap: 24px;
`;

const SubscriptionCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
    border-color: #635BFF;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

const RestaurantInfo = styled.div`
  flex: 1;
`;

const RestaurantName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`;

// Unused styled component - kept for reference
// const Location = styled.p`
//   font-size: 14px;
//   color: #6B7280;
// `;

const StatusBadge = styled.span<{ status: string }>`
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
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

const PlanInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
`;

const PlanDetails = styled.div``;

const PlanName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  text-transform: capitalize;
`;

const PlanBilling = styled.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`;

const PlanPrice = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #059669;
`;

const PaymentModelInfo = styled.div<{ model: string }>`
  margin: 16px 0;
  padding: 12px;
  background: ${props => props.model === 'self' ? '#FEF3C7' : '#E0F2FE'};
  border-radius: 8px;
  border: 1px solid ${props => props.model === 'self' ? '#F59E0B' : '#0EA5E9'};
`;

const PaymentLabel = styled.div<{ model: string }>`
  font-size: 12px;
  font-weight: 600;
  color: ${props => props.model === 'self' ? '#92400E' : '#0C4A6E'};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
`;

const PaymentInfo = styled.div<{ model: string }>`
  font-size: 14px;
  color: ${props => props.model === 'self' ? '#92400E' : '#0C4A6E'};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'danger' | 'warning' }>`
  flex: 1;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
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
    background: transparent;
    color: #DC2626;
    border-color: #FCA5A5;
    
    &:hover {
      background: #FEE2E2;
    }
  ` : props.variant === 'warning' ? `
    background: transparent;
    color: #D97706;
    border-color: #FCD34D;
    
    &:hover {
      background: #FEF3C7;
    }
  ` : `
    background: transparent;
    color: #6B7280;
    border-color: #E6EBF1;
    
    &:hover {
      background: #F8FAFC;
      color: #0A2540;
    }
  `}
`;

const DateInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin: 16px 0;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
`;

const DateItem = styled.div``;

const DateLabel = styled.div`
  font-size: 11px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 2px;
`;

const DateValue = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: #374151;
`;

// Modal Styles
const Modal = styled.div<{ show: boolean }>`
  display: ${props => props.show ? 'flex' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 32px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  margin-bottom: 24px;
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0 0 8px 0;
`;

const ModalSubtitle = styled.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  color: #374151;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #CBD5E1;
  }
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #635BFF;
    background: #F8F9FF;
  }
  
  input:checked + & {
    border-color: #635BFF;
    background: #F8F9FF;
  }
`;

const RadioInput = styled.input`
  width: 16px;
  height: 16px;
  accent-color: #635BFF;
`;

const PlanCard = styled.div<{ selected: boolean }>`
  padding: 16px;
  border: 2px solid ${props => props.selected ? '#635BFF' : '#E6EBF1'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  background: ${props => props.selected ? '#F8F9FF' : 'white'};
  
  &:hover {
    border-color: #635BFF;
  }
`;

const PlanTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  text-transform: capitalize;
  margin-bottom: 4px;
`;

const ModalPlanPrice = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #059669;
  margin-bottom: 8px;
`;

const PlanFeatures = styled.ul`
  font-size: 12px;
  color: #6B7280;
  margin: 0;
  padding-left: 20px;
`;

const ModalActions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`;

const ModalButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  flex: 1;
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
    }
  ` : `
    background: white;
    color: #6B7280;
    border: 1px solid #E6EBF1;
    
    &:hover {
      background: #F8FAFC;
      color: #0A2540;
    }
  `}
`;

const FoodcourtSubscriptionsPage: React.FC = () => {
  const { user } = useAuth();
  const [subscriptions, setSubscriptions] = useState<RestaurantSubscription[]>([]);
  const { defaultCurrency } = useBrandCurrency();
  const [selectedCurrency, setSelectedCurrency] = useState<string>('RM');

  useEffect(() => {
    if (defaultCurrency) {
      setSelectedCurrency(defaultCurrency);
    }
  }, [defaultCurrency]);

  useEffect(() => {
    // 실제 API에서 매니저의 레스토랑 구독 데이터 로드
    const fetchSubscriptions = async () => {
      try {
        const managerId = user?.managerId || user?.id || '2';
        const response = await fetch(`${API_BASE_URL}/api/restaurants/subscriptions/manager/${managerId}`);
        if (response.ok) {
          const data = await response.json();
          
          // Add plan features based on plan type
          const subscriptionsWithFeatures = data.map((sub: any) => ({
            ...sub,
            features: getPlanFeatures(sub.planType)
          }));
          
          setSubscriptions(subscriptionsWithFeatures);
        } else {
          console.error('Failed to fetch subscriptions');
        }
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
      }
    };
    
    if (user) {
      fetchSubscriptions();
    }
  }, [user]);
  
  // Helper function to get plan features
  const getPlanFeatures = (planType: string) => {
    switch(planType) {
      case 'basic':
        return ['Up to 1k Orders/month', 'Basic Analytics', 'Community Support'];
      case 'professional':
        return ['Up to 10k Orders/month', 'Standard Analytics', 'Email Support', 'Staff Management'];
      case 'enterprise':
        return ['Unlimited Orders', 'Advanced Analytics', 'Priority Support', 'Custom Branding'];
      default:
        return [];
    }
  };


  const activeSubscriptions = subscriptions.filter(s => s.status === 'active').length;
  const totalMonthlyFees = subscriptions
    .filter(s => s.paymentModel === 'manager' && s.status === 'active')
    .reduce((sum, s) => sum + (s.billingCycle === 'monthly' ? s.monthlyFee : s.annualFee / 12), 0);
  const selfPayingRestaurants = subscriptions.filter(s => s.paymentModel === 'self').length;
  const trialSubscriptions = subscriptions.filter(s => s.status === 'trial').length;

  const handleExportData = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const exportData = {
      exportDate: new Date().toISOString(),
      manager: user?.name || 'Manager',
      totalRestaurants: subscriptions.length,
      activeSubscriptions,
      selfPayingRestaurants,
      trialSubscriptions,
      totalMonthlyPayment: totalMonthlyFees,
      subscriptions: subscriptions.map(sub => ({
        restaurantName: sub.restaurantName,
        location: sub.location,
        planType: sub.planType,
        status: sub.status,
        paymentModel: sub.paymentModel,
        billingCycle: sub.billingCycle,
        monthlyFee: sub.monthlyFee,
        annualFee: sub.annualFee,
        startDate: sub.startDate,
        nextPayment: sub.nextPayment,
        currentOrders: sub.currentOrders,
        orderLimit: sub.orderLimit === -1 ? 'Unlimited' : sub.orderLimit
      }))
    };

    // Create CSV content
    const csvHeaders = ['Restaurant', 'Location', 'Plan', 'Status', 'Payment Model', 'Billing Cycle', 'Monthly Fee', 'Annual Fee', 'Start Date', 'Next Payment', 'Current Orders', 'Order Limit'];
    const csvRows = subscriptions.map(sub => [
      sub.restaurantName,
      sub.location,
      sub.planType,
      sub.status,
      sub.paymentModel,
      sub.billingCycle,
      sub.monthlyFee,
      sub.annualFee,
      sub.startDate,
      sub.nextPayment,
      sub.currentOrders,
      sub.orderLimit === -1 ? 'Unlimited' : sub.orderLimit
    ]);

    const csvContent = [
      csvHeaders.join(','),
      ...csvRows.map(row => row.join(','))
    ].join('\n');

    // Create and download CSV file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `subscriptions-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    alert('Subscription data exported successfully!');
  };

  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<RestaurantSubscription | null>(null);
  const [availableRestaurants, setAvailableRestaurants] = useState<any[]>([]);
  
  // Debug log for availableRestaurants state changes
  useEffect(() => {
    console.log('🍽️ availableRestaurants state changed:', availableRestaurants);
  }, [availableRestaurants]);
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'professional' | 'enterprise'>('basic');
  const [selectedBilling, setSelectedBilling] = useState<'monthly' | 'annual'>('monthly');
  const [selectedPaymentModel, setSelectedPaymentModel] = useState<'manager' | 'self'>('manager');

  useEffect(() => {
    // Load available restaurants from API
    const fetchAvailableRestaurants = async () => {
      try {
        const managerId = user?.managerId || user?.id || '2';
        console.log('🔍 Fetching available restaurants for manager:', managerId);
        const response = await fetch(`${API_BASE_URL}/api/restaurants/available/${managerId}`);
        console.log('📡 Response status:', response.status);
        if (response.ok) {
          const data = await response.json();
          console.log('📦 Available restaurants data:', data);
          setAvailableRestaurants(data);
        } else {
          console.error('Failed to fetch available restaurants');
          setAvailableRestaurants([]);
        }
      } catch (error) {
        console.error('Error fetching available restaurants:', error);
        setAvailableRestaurants([]);
      }
    };
    
    if (user) {
      fetchAvailableRestaurants();
    }
  }, [user]);

  const handleAddSubscription = async () => {
    if (!selectedRestaurant) {
      alert('Please select a restaurant');
      return;
    }

    try {
      const managerId = user?.managerId || user?.id || '2';
      const response = await fetch(`${API_BASE_URL}/api/restaurants/subscriptions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          restaurantId: selectedRestaurant,
          managerId: managerId,
          planType: selectedPlan,
          billingCycle: selectedBilling,
          paymentModel: selectedPaymentModel
        })
      });

      if (response.ok) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const result = await response.json();

        // Refresh subscriptions list
        const subscriptionsResponse = await fetch(`${API_BASE_URL}/api/restaurants/subscriptions/manager/${managerId}`);
        if (subscriptionsResponse.ok) {
          const data = await subscriptionsResponse.json();
          const subscriptionsWithFeatures = data.map((sub: any) => ({
            ...sub,
            features: getPlanFeatures(sub.planType)
          }));
          setSubscriptions(subscriptionsWithFeatures);
        }

        // Refresh available restaurants
        const availableResponse = await fetch(`${API_BASE_URL}/api/restaurants/available/${managerId}`);
        if (availableResponse.ok) {
          const availableData = await availableResponse.json();
          setAvailableRestaurants(availableData);
        }

        setShowAddModal(false);
        setSelectedRestaurant('');
        setSelectedPlan('basic');
        setSelectedBilling('monthly');
        setSelectedPaymentModel('manager');
        alert('Subscription added successfully!');
      } else {
        const error = await response.json();
        alert(`Failed to add subscription: ${error.error}`);
      }
    } catch (error) {
      console.error('Error adding subscription:', error);
      alert('Error adding subscription. Please try again.');
    }
  };


  const handleConfirmUpgrade = () => {
    if (!selectedSubscription) return;

    const planPrices = {
      basic: { monthly: 29, annual: 290, orderLimit: 1000 },
      professional: { monthly: 99, annual: 990, orderLimit: 10000 },
      enterprise: { monthly: 199, annual: 2190, orderLimit: -1 }
    };

    setSubscriptions(subscriptions.map(sub => 
      sub.id === selectedSubscription.id 
        ? { 
            ...sub, 
            planType: selectedPlan,
            monthlyFee: planPrices[selectedPlan].monthly,
            annualFee: planPrices[selectedPlan].annual,
            orderLimit: planPrices[selectedPlan].orderLimit,
            nextPayment: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
          }
        : sub
    ));

    setShowUpgradeModal(false);
    setSelectedSubscription(null);
    alert(`Plan updated to ${selectedPlan}. Changes will be applied from next billing cycle.`);
  };

  const handleCancelSubscription = (subscriptionId: string, restaurantName: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to cancel the subscription for ${restaurantName}?\n\n` +
      'This action will:\n' +
      '• End the subscription at the current billing cycle\n' +
      '• Disable access to premium features\n' +
      '• Cannot be undone'
    );
    
    if (confirmed) {
      setSubscriptions(subscriptions.map(sub => 
        sub.id === subscriptionId 
          ? { ...sub, status: 'cancelled' as const }
          : sub
      ));
      alert('Subscription has been cancelled. The restaurant will maintain access until the end of the current billing period.');
    }
  };

  const handlePaymentModelSwitch = async (subscriptionId: string, newModel: 'self' | 'manager') => {
    // Extract restaurant ID from subscription ID (format: sub-{restaurantId})
    const restaurantId = subscriptionId.replace('sub-', '');

    // Map frontend model to backend model
    const backendModel = newModel === 'manager' ? 'brand_manager' : 'restaurant';

    try {
      const token = localStorage.getItem('auth_token');

      // 1. Update restaurant payment_model
      const response = await fetch(`${API_BASE_URL}/api/restaurants/${restaurantId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ payment_model: backendModel })
      });

      if (!response.ok) {
        throw new Error('Failed to update payment model');
      }

      // 2. Update unpaid invoices payer_type
      const invoiceResponse = await fetch(`${API_BASE_URL}/api/invoices/update-payer/${restaurantId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ payment_model: backendModel })
      });

      if (!invoiceResponse.ok) {
        console.warn('Failed to update invoice payers, but restaurant payment model was updated');
      }

      // 3. Update local state
      setSubscriptions(subscriptions.map(sub =>
        sub.id === subscriptionId
          ? {
              ...sub,
              paymentModel: newModel,
              payerId: newModel === 'manager' ? sub.managerId : sub.restaurantId,
              payerName: newModel === 'manager' ? sub.managerName : 'Restaurant Owner'
            }
          : sub
      ));

      alert(`Payment model switched to ${newModel === 'manager' ? 'Manager-Pay' : 'Self-Pay'} successfully!`);
    } catch (error) {
      console.error('Error switching payment model:', error);
      alert('Failed to switch payment model. Please try again.');
    }
  };

  const handleUpgradePlan = (subscription: RestaurantSubscription) => {
    setSelectedSubscription(subscription);
    setSelectedPlan(subscription.planType);
    setShowUpgradeModal(true);
  };

  return (
    <MainLayout>
      <Container>
        <Header>
          <Title>Subscriptions</Title>
          <ActionSection>
            <Button variant="secondary" onClick={handleExportData}>Export Data</Button>
            <Button variant="primary" onClick={() => setShowAddModal(true)}>Add Subscription</Button>
          </ActionSection>
        </Header>

        <Content>
          <StatsGrid>
          <StatCard color="#059669">
            <StatValue>{subscriptions.length}</StatValue>
            <StatLabel>Total Restaurants</StatLabel>
            <StatTrend positive>Under your management</StatTrend>
          </StatCard>
          <StatCard color="#2563EB">
            <StatValue>{activeSubscriptions}</StatValue>
            <StatLabel>Active Subscriptions</StatLabel>
            <StatTrend positive>{Math.round((activeSubscriptions/subscriptions.length)*100)}% operational</StatTrend>
          </StatCard>
          <StatCard color="#7C3AED">
            <StatValue>{formatCurrency(totalMonthlyFees)}</StatValue>
            <StatLabel>Your Monthly Payment</StatLabel>
            <StatTrend positive>Manager-paid restaurants only</StatTrend>
          </StatCard>
          <StatCard color="#D97706">
            <StatValue>{selfPayingRestaurants}</StatValue>
            <StatLabel>Self-Paying Restaurants</StatLabel>
            <StatTrend positive>Direct billing to restaurant</StatTrend>
          </StatCard>
        </StatsGrid>

        <SubscriptionGrid>
          {subscriptions.map(subscription => (
            <SubscriptionCard key={subscription.id}>
              <CardHeader>
                <RestaurantInfo>
                  <RestaurantName>{subscription.restaurantName}</RestaurantName>
                </RestaurantInfo>
                <StatusBadge status={subscription.status}>
                  {subscription.status}
                </StatusBadge>
              </CardHeader>

              <PlanInfo>
                <PlanDetails>
                  <PlanName>{subscription.planType}</PlanName>
                  <PlanBilling>
                    {subscription.billingCycle === 'monthly' ? 'Monthly billing' : 'Annual billing'}
                  </PlanBilling>
                </PlanDetails>
                <PlanPrice>
                  {formatCurrency(subscription.billingCycle === 'monthly' ? subscription.monthlyFee : subscription.annualFee)}
                  {subscription.billingCycle === 'annual' && <span style={{fontSize: '12px', color: '#6B7280'}}>/year</span>}
                </PlanPrice>
              </PlanInfo>

              <PaymentModelInfo model={subscription.paymentModel}>
                <PaymentLabel model={subscription.paymentModel}>
                  {subscription.paymentModel === 'self' ? 'Self-Paying' : 'Manager-Paid'}
                </PaymentLabel>
                <PaymentInfo model={subscription.paymentModel}>
                  {subscription.paymentModel === 'self' 
                    ? 'Restaurant pays directly'
                    : 'You handle payment for this restaurant'
                  }
                </PaymentInfo>
              </PaymentModelInfo>

              <DateInfo>
                <DateItem>
                  <DateLabel>Start Date</DateLabel>
                  <DateValue>{subscription.startDate}</DateValue>
                </DateItem>
                <DateItem>
                  <DateLabel>Next Payment</DateLabel>
                  <DateValue>{subscription.nextPayment}</DateValue>
                </DateItem>
              </DateInfo>

              <ActionButtons>
                <ActionButton 
                  variant="primary" 
                  onClick={() => window.open(`/manager/reports?restaurant=${subscription.restaurantId}`, '_blank')}
                >
                  View Reports
                </ActionButton>
                <ActionButton 
                  variant="warning"
                  onClick={() => {
                    const newModel = subscription.paymentModel === 'self' ? 'manager' : 'self';
                    handlePaymentModelSwitch(subscription.id, newModel);
                  }}
                >
                  Switch to {subscription.paymentModel === 'self' ? 'Manager-Pay' : 'Self-Pay'}
                </ActionButton>
                <ActionButton onClick={() => handleUpgradePlan(subscription)}>
                  {subscription.planType === 'enterprise' ? 'Change Plan' : 'Upgrade/Downgrade'}
                </ActionButton>
                {subscription.status !== 'cancelled' && (
                  <ActionButton 
                    variant="danger"
                    onClick={() => handleCancelSubscription(subscription.id, subscription.restaurantName)}
                  >
                    Cancel Subscription
                  </ActionButton>
                )}
              </ActionButtons>
            </SubscriptionCard>
          ))}
        </SubscriptionGrid>
        </Content>
      </Container>

      {/* Add Subscription Modal */}
      <Modal show={showAddModal}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Add New Subscription</ModalTitle>
            <ModalSubtitle>Connect a restaurant to a subscription plan</ModalSubtitle>
          </ModalHeader>

          <FormGroup>
            <FormLabel>Select Restaurant</FormLabel>
            <Select 
              value={selectedRestaurant} 
              onChange={(e) => setSelectedRestaurant(e.target.value)}
            >
              <option value="">Choose a restaurant...</option>
              {availableRestaurants.map(restaurant => (
                <option key={restaurant.id} value={restaurant.id}>
                  {restaurant.name} - {restaurant.location}
                </option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup>
            <FormLabel>Select Plan</FormLabel>
            <RadioGroup>
              <PlanCard 
                selected={selectedPlan === 'basic'}
                onClick={() => setSelectedPlan('basic')}
              >
                <PlanTitle>Basic</PlanTitle>
                <ModalPlanPrice>{formatCurrency(29, selectedCurrency)}/month</ModalPlanPrice>
                <PlanFeatures>
                  <li>Up to 1,000 orders/month</li>
                  <li>Basic analytics</li>
                  <li>5 staff accounts</li>
                </PlanFeatures>
              </PlanCard>

              <PlanCard 
                selected={selectedPlan === 'professional'}
                onClick={() => setSelectedPlan('professional')}
              >
                <PlanTitle>Professional</PlanTitle>
                <ModalPlanPrice>{formatCurrency(99, selectedCurrency)}/month</ModalPlanPrice>
                <PlanFeatures>
                  <li>Up to 10,000 orders/month</li>
                  <li>Advanced analytics</li>
                  <li>Unlimited staff accounts</li>
                </PlanFeatures>
              </PlanCard>

              <PlanCard 
                selected={selectedPlan === 'enterprise'}
                onClick={() => setSelectedPlan('enterprise')}
              >
                <PlanTitle>Enterprise</PlanTitle>
                <ModalPlanPrice>{formatCurrency(199, selectedCurrency)}/month</ModalPlanPrice>
                <PlanFeatures>
                  <li>Unlimited orders</li>
                  <li>Custom analytics</li>
                  <li>Priority support</li>
                </PlanFeatures>
              </PlanCard>
            </RadioGroup>
          </FormGroup>

          <FormGroup>
            <FormLabel>Billing Cycle</FormLabel>
            <RadioGroup>
              <RadioLabel>
                <RadioInput 
                  type="radio" 
                  name="billing" 
                  checked={selectedBilling === 'monthly'}
                  onChange={() => setSelectedBilling('monthly')}
                />
                Monthly Billing
              </RadioLabel>
              <RadioLabel>
                <RadioInput 
                  type="radio" 
                  name="billing" 
                  checked={selectedBilling === 'annual'}
                  onChange={() => setSelectedBilling('annual')}
                />
                Annual Billing (Save 17%)
              </RadioLabel>
            </RadioGroup>
          </FormGroup>

          <FormGroup>
            <FormLabel>Payment Model</FormLabel>
            <RadioGroup>
              <RadioLabel>
                <RadioInput 
                  type="radio" 
                  name="payment" 
                  checked={selectedPaymentModel === 'manager'}
                  onChange={() => setSelectedPaymentModel('manager')}
                />
                Manager Pays (You handle payment)
              </RadioLabel>
              <RadioLabel>
                <RadioInput 
                  type="radio" 
                  name="payment" 
                  checked={selectedPaymentModel === 'self'}
                  onChange={() => setSelectedPaymentModel('self')}
                />
                Restaurant Self-Pay
              </RadioLabel>
            </RadioGroup>
          </FormGroup>

          <ModalActions>
            <ModalButton variant="secondary" onClick={() => setShowAddModal(false)}>
              Cancel
            </ModalButton>
            <ModalButton variant="primary" onClick={handleAddSubscription}>
              Add Subscription
            </ModalButton>
          </ModalActions>
        </ModalContent>
      </Modal>

      {/* Upgrade/Downgrade Plan Modal */}
      <Modal show={showUpgradeModal}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Change Subscription Plan</ModalTitle>
            <ModalSubtitle>
              {selectedSubscription?.restaurantName} - Current: {selectedSubscription?.planType}
            </ModalSubtitle>
          </ModalHeader>

          <FormGroup>
            <FormLabel>Select New Plan</FormLabel>
            <RadioGroup>
              <PlanCard 
                selected={selectedPlan === 'basic'}
                onClick={() => setSelectedPlan('basic')}
              >
                <PlanTitle>Basic</PlanTitle>
                <ModalPlanPrice>{formatCurrency(29, selectedCurrency)}/month</ModalPlanPrice>
                <PlanFeatures>
                  <li>Up to 1,000 orders/month</li>
                  <li>Basic analytics</li>
                  <li>5 staff accounts</li>
                </PlanFeatures>
              </PlanCard>

              <PlanCard 
                selected={selectedPlan === 'professional'}
                onClick={() => setSelectedPlan('professional')}
              >
                <PlanTitle>Professional</PlanTitle>
                <ModalPlanPrice>{formatCurrency(99, selectedCurrency)}/month</ModalPlanPrice>
                <PlanFeatures>
                  <li>Up to 10,000 orders/month</li>
                  <li>Advanced analytics</li>
                  <li>Unlimited staff accounts</li>
                </PlanFeatures>
              </PlanCard>

              <PlanCard 
                selected={selectedPlan === 'enterprise'}
                onClick={() => setSelectedPlan('enterprise')}
              >
                <PlanTitle>Enterprise</PlanTitle>
                <ModalPlanPrice>{formatCurrency(199, selectedCurrency)}/month</ModalPlanPrice>
                <PlanFeatures>
                  <li>Unlimited orders</li>
                  <li>Custom analytics</li>
                  <li>Priority support</li>
                </PlanFeatures>
              </PlanCard>
            </RadioGroup>
          </FormGroup>

          <div style={{padding: '16px', background: '#FEF3C7', borderRadius: '8px', marginBottom: '16px'}}>
            <strong style={{color: '#92400E'}}>Important:</strong>
            <p style={{color: '#92400E', fontSize: '14px', margin: '4px 0 0 0'}}>
              Plan changes will take effect from the next billing cycle. 
              {selectedSubscription?.planType === selectedPlan && ' (No change selected)'}
            </p>
          </div>

          <ModalActions>
            <ModalButton variant="secondary" onClick={() => setShowUpgradeModal(false)}>
              Cancel
            </ModalButton>
            <ModalButton 
              variant="primary" 
              onClick={handleConfirmUpgrade}
              disabled={selectedSubscription?.planType === selectedPlan}
            >
              Confirm Change
            </ModalButton>
          </ModalActions>
        </ModalContent>
      </Modal>
    </MainLayout>
  );
};

export default FoodcourtSubscriptionsPage;