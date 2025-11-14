import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainLayout from '../../components/Layout/MainLayout';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import {
  StatsGrid,
  StatCard,
  StatLabel,
  StatValue,
  StatDescription,
  Container,
  Header,
  Title,
  ActionSection,
  Content,
  Button
} from '../../components/UI';
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';

interface Plan {
  id: string;
  name: string;
  displayName: string;
  description: string;
  category: 'basic' | 'custom';
  monthlyPrice: number;
  annualPrice: number;
  restaurantLimit: number;
  orderLimit: number;
  features: string[];
  isPopular: boolean;
  isActive: boolean;
  createdAt: string;
  subscriptionCount: number;
}

// Common components now imported from ../../components/UI
// Page-specific styled components below


const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

const PlanCard = styled.div<{ isPopular?: boolean; isActive?: boolean }>`
  background: white;
  border-radius: 16px;
  padding: 32px;
  border: 2px solid ${props => props.isPopular ? '#635BFF' : '#E6EBF1'};
  position: relative;
  transition: all 0.2s;
  opacity: ${props => props.isActive ? 1 : 0.6};
  display: flex;
  flex-direction: column;
  min-height: 550px;

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    transform: translateY(-4px);
  }

  ${props => props.isPopular && `
    &::before {
      content: 'Most Popular';
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      background: #635BFF;
      color: white;
      padding: 6px 16px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  `}
`;

const PlanHeader = styled.div`
  text-align: center;
  margin-bottom: 32px;
  margin-top: 36px;
`;

const PlanName = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 8px;
  text-transform: capitalize;
`;

const PlanDescription = styled.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
`;

const PlanPricing = styled.div`
  text-align: center;
`;

const MonthlyPrice = styled.div`
  font-size: 36px;
  font-weight: 800;
  color: #0A2540;
  margin-bottom: 4px;
`;

const AnnualPrice = styled.div`
  font-size: 14px;
  color: #059669;
  font-weight: 600;
  margin-bottom: 8px;
`;

const PricingNote = styled.div`
  font-size: 12px;
  color: #6B7280;
`;

const PlanLimits = styled.div`
  margin: 24px 0;
  padding: 20px;
  background: #F8FAFC;
  border-radius: 12px;
`;

const LimitItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const LimitLabel = styled.span`
  font-size: 14px;
  color: #374151;
`;

const LimitValue = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 24px 0;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  font-size: 14px;
  color: #374151;
  
  &:before {
    content: '✓';
    color: #059669;
    font-weight: bold;
    margin-right: 12px;
    font-size: 16px;
  }
`;

const PlanStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  margin-bottom: 0;
  padding-top: 20px;
  padding-bottom: 20px;
  border-top: 1px solid #E6EBF1;
  border-bottom: 1px solid #E6EBF1;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`;

const StatDesc = styled.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`;

const StatusBadge = styled.span<{ isActive: boolean }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  text-transform: uppercase;
  background: ${props => props.isActive ? '#ECFDF5' : '#FEF2F2'};
  color: ${props => props.isActive ? '#059669' : '#DC2626'};
`;

const CategoryBadge = styled.span<{ category: 'basic' | 'custom' }>`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${props => props.category === 'basic' ? '#DBEAFE' : '#FEF3C7'};
  color: ${props => props.category === 'basic' ? '#1E40AF' : '#92400E'};
`;

const BadgeContainer = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 8px;
  align-items: center;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`;

const PlanButton = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  flex: 1;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
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
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);
    }
  ` : props.variant === 'danger' ? `
    background: transparent;
    color: #DC2626;
    border-color: #FCA5A5;
    
    &:hover {
      background: #FEE2E2;
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

// Modal Components
const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
`;

const ModalHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #6B7280;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #F3F4F6;
    color: #374151;
  }
`;

const ModalBody = styled.div`
  padding: 24px;
  overflow-y: auto;
  flex: 1;
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

const FormInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const FormTextArea = styled.textarea`
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

const PricingRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

const LimitsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`;

const CheckboxItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  
  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: #635BFF;
  }
  
  label {
    font-size: 14px;
    color: #0A2540;
    cursor: pointer;
  }
`;

const ModalActions = styled.div`
  padding: 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const DetailSection = styled.div`
  margin-bottom: 24px;

  h4 {
    font-size: 16px;
    font-weight: 600;
    color: #0A2540;
    margin: 0 0 16px 0;
    padding-bottom: 8px;
    border-bottom: 1px solid #E6EBF1;
  }
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const DetailLabel = styled.span`
  font-size: 14px;
  color: #6B7280;
  font-weight: 500;
`;

const DetailValue = styled.span`
  font-size: 14px;
  color: #0A2540;
  font-weight: 500;
`;


const PlansPage: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [subscriptionStats, setSubscriptionStats] = useState<{[key: string]: number}>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'basic' | 'custom'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  // Form data for create plan
  const [createFormData, setCreateFormData] = useState({
    name: '',
    display_name: '',
    description: '',
    category: 'basic' as 'basic' | 'custom',
    base_price_monthly: '',
    base_price_annual: '',
    order_limit: '',
    menu_item_limit: '',
    staff_limit: '',
    features: '',
    is_popular: false,
    is_active: true
  });

  useEffect(() => {
    fetchSubscriptionStats();
  }, []);

  useEffect(() => {
    if (Object.keys(subscriptionStats).length >= 0) {
      fetchPlans();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscriptionStats]);

  const fetchSubscriptionStats = async () => {
    try {
      const response = await fetch('/api/plans/stats/subscriptions');
      if (!response.ok) throw new Error('Failed to fetch subscription stats');
      const data = await response.json();

      // Transform subscription stats by plan
      const statsByPlan: {[key: string]: number} = {};
      if (data && Array.isArray(data)) {
        data.forEach((item: any) => {
          statsByPlan[item.plan_name] = item.count || 0;
        });
      }
      setSubscriptionStats(statsByPlan);
    } catch (error) {
      console.error('Error fetching subscription stats:', error);
      // Fallback to default stats if API fails
      setSubscriptionStats({});
    }
  };

  const fetchPlans = async () => {
    try {
      const response = await fetch('/api/plans');
      if (!response.ok) throw new Error('Failed to fetch plans');

      const data = await response.json();

      // Transform API data to match frontend interface
      const transformedPlans: Plan[] = data.map((plan: any) => {
        let features: string[] = [];
        try {
          // Parse features if it's a JSON string
          if (typeof plan.features === 'string') {
            features = JSON.parse(plan.features);
          } else if (Array.isArray(plan.features)) {
            features = plan.features;
          }
        } catch (e) {
          console.warn('Failed to parse features for plan:', plan.name, e);
          features = [];
        }

        return {
          id: `plan-${plan.id}`,
          name: plan.name,
          displayName: plan.display_name,
          description: getDefaultDescription(plan.name),
          category: plan.category || 'basic',
          monthlyPrice: parseFloat(plan.base_price_monthly),
          annualPrice: parseFloat(plan.base_price_annual),
          restaurantLimit: plan.staff_limit, // Using staff_limit as restaurant limit
          orderLimit: plan.order_limit,
          features: features,
          isPopular: plan.name === 'professional',
          isActive: plan.is_active,
          createdAt: plan.createdAt ? new Date(plan.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          subscriptionCount: subscriptionStats[plan.display_name] || 0
        };
      });

      setPlans(transformedPlans);
    } catch (error) {
      console.error('Error fetching plans:', error);
      // Fallback to default plans if API fails
      setPlans(getDefaultPlans());
    }
  };

  const createPlan = async () => {
    try {
      // For custom plans, set all limits to -1 (unlimited)
      const isCustom = createFormData.category === 'custom';

      // Prepare data for API
      const planData = {
        name: createFormData.name,
        display_name: createFormData.display_name,
        description: createFormData.description,
        category: createFormData.category,
        base_price_monthly: parseFloat(createFormData.base_price_monthly) || 0,
        base_price_annual: parseFloat(createFormData.base_price_annual) || 0,
        order_limit: isCustom ? -1 : (parseInt(createFormData.order_limit) || -1),
        menu_item_limit: isCustom ? -1 : (parseInt(createFormData.menu_item_limit) || -1),
        staff_limit: isCustom ? -1 : (parseInt(createFormData.staff_limit) || -1),
        features: createFormData.features.split('\n').filter(f => f.trim()),
        is_popular: createFormData.is_popular,
        is_active: createFormData.is_active
      };

      console.log('Creating plan with data:', planData);

      const response = await fetch('/api/plans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(planData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create plan');
      }

      // Reset form
      setCreateFormData({
        name: '',
        display_name: '',
        description: '',
        category: 'basic' as 'basic' | 'custom',
        base_price_monthly: '',
        base_price_annual: '',
        order_limit: '',
        menu_item_limit: '',
        staff_limit: '',
        features: '',
        is_popular: false,
        is_active: true
      });

      // Close modal and refresh plans
      setShowCreateModal(false);
      fetchPlans();
    } catch (error) {
      console.error('Error creating plan:', error);
      alert('Failed to create plan: ' + error.message);
    }
  };

  const deletePlan = async (planId: string) => {
    if (!window.confirm('Are you sure you want to delete this plan? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/plans/${planId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete plan');
      }

      // Close modal and refresh plans
      setShowEditModal(false);
      fetchPlans();
      alert('Plan deleted successfully');
    } catch (error) {
      console.error('Error deleting plan:', error);
      alert('Failed to delete plan: ' + error.message);
    }
  };

  const getDefaultDescription = (name: string) => {
    switch(name) {
      case 'basic':
        return 'Perfect for single restaurant owners starting their POS journey';
      case 'professional':
        return 'Ideal for growing businesses with multiple locations';
      case 'enterprise':
        return 'Comprehensive solution for large restaurant chains and food courts';
      default:
        return 'Subscription plan for restaurant management';
    }
  };

  const getDefaultPlans = (): Plan[] => {
    return [
      {
        id: 'plan-basic',
        name: 'basic',
        displayName: 'Basic',
        description: 'Perfect for single restaurant owners starting their POS journey',
        category: 'basic',
        monthlyPrice: 29,
        annualPrice: 290,
        restaurantLimit: 1,
        orderLimit: 1000,
        features: [
          'Up to 1,000 orders per month',
          'Up to 50 menu items',
          'Up to 5 staff accounts',
          'Basic analytics',
          'Community support',
          'Standard POS features'
        ],
        isPopular: false,
        isActive: true,
        createdAt: '2024-01-01',
        subscriptionCount: subscriptionStats['Basic'] || 0
      },
      {
        id: 'plan-professional',
        name: 'professional',
        displayName: 'Professional',
        description: 'Ideal for growing businesses with multiple locations',
        category: 'basic',
        monthlyPrice: 99,
        annualPrice: 990,
        restaurantLimit: 5,
        orderLimit: 10000,
        features: [
          'Up to 10,000 orders per month',
          'Up to 200 menu items',
          'Up to 20 staff accounts',
          'Advanced analytics',
          'Email support',
          'Inventory management',
          'Customer loyalty program',
          'Multi-location support'
        ],
        isPopular: true,
        isActive: true,
        createdAt: '2024-01-01',
        subscriptionCount: subscriptionStats['Professional'] || 0
      },
      {
        id: 'plan-enterprise',
        name: 'enterprise',
        displayName: 'Enterprise',
        description: 'Comprehensive solution for large restaurant chains and food courts',
        category: 'basic',
        monthlyPrice: 199,
        annualPrice: 2190,
        restaurantLimit: -1,
        orderLimit: -1,
        features: [
          'Unlimited orders',
          'Unlimited menu items',
          'Unlimited staff accounts',
          'Premium analytics & reports',
          'Priority 24/7 support',
          'Custom branding',
          'API access',
          'Dedicated account manager',
          'Custom integrations',
          'Training sessions'
        ],
        isPopular: false,
        isActive: true,
        createdAt: '2024-01-01',
        subscriptionCount: subscriptionStats['Enterprise'] || 0
      }
    ];
  };

  const activePlans = plans.filter(p => p.isActive).length;
  const totalSubscriptions = plans.reduce((sum, p) => sum + p.subscriptionCount, 0);
  const monthlyRevenue = plans.reduce((sum, p) => sum + (p.monthlyPrice * p.subscriptionCount), 0);

  const formatCurrency = (amount: number) => `RM ${amount.toLocaleString('en-MY', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const formatLimit = (limit: number) => limit === -1 ? 'Unlimited' : limit.toLocaleString();
  
  // Button handlers
  const handleCreatePlan = () => {
    setShowCreateModal(true);
  };
  
  const handleExportPlans = async () => {
    try {
      const response = await fetch('/api/plans/export/csv');
      if (!response.ok) throw new Error('Failed to export plans');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `subscription-plans-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error exporting plans:', error);
      console.error('Failed to export plans. Please try again.');
    }
  };
  
  const handleEditPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setShowEditModal(true);
  };
  
  const handleViewDetails = (plan: Plan) => {
    setSelectedPlan(plan);
    setShowDetailsModal(true);
  };
  
  const handleToggleStatus = (planId: string) => {
    setPlans(prev => prev.map(plan =>
      plan.id === planId
        ? { ...plan, isActive: !plan.isActive }
        : plan
    ));
  };

  // Filtered plans
  const filteredPlans = plans.filter(plan => {
    const matchesSearch = plan.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || plan.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' ||
                         (statusFilter === 'active' && plan.isActive) ||
                         (statusFilter === 'inactive' && !plan.isActive);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const basicPlansCount = plans.filter(p => p.category === 'basic').length;
  const customPlansCount = plans.filter(p => p.category === 'custom').length;

  return (
    <MainLayout>
      <Container>
        <Header>
          <Title>Subscription Plans</Title>
          <ActionSection>
            <Button variant="secondary" onClick={handleExportPlans}>Export</Button>
            <Button variant="primary" onClick={handleCreatePlan}>Create Plan</Button>
          </ActionSection>
        </Header>
        <Content>

        <StatsGrid>
          <StatCard color="#059669">
            <StatValue>{plans.length}</StatValue>
            <StatLabel>Total Plans</StatLabel>
            <StatDescription>{basicPlansCount} basic + {customPlansCount} custom</StatDescription>
          </StatCard>
          <StatCard color="#10B981">
            <StatValue>{activePlans}</StatValue>
            <StatLabel>Active Plans</StatLabel>
            <StatDescription>{plans.length > 0 ? Math.round((activePlans/plans.length)*100) : 0}% available</StatDescription>
          </StatCard>
          <StatCard color="#F59E0B">
            <StatValue>{totalSubscriptions}</StatValue>
            <StatLabel>Total Subscriptions</StatLabel>
            <StatDescription>Across all plans</StatDescription>
          </StatCard>
          <StatCard color="#DC2626">
            <StatValue>{formatCurrency(monthlyRevenue)}</StatValue>
            <StatLabel>Monthly Revenue</StatLabel>
            <StatDescription>From all subscriptions</StatDescription>
          </StatCard>
        </StatsGrid>

        <FilterBar>
          <SearchInput
            type="text"
            placeholder="Search plans..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FilterSelect
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as any)}
          >
            <option value="all">All Categories</option>
            <option value="basic">Basic Plans</option>
            <option value="custom">Custom Plans</option>
          </FilterSelect>
          <FilterSelect
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </FilterSelect>
        </FilterBar>

        <PlansGrid>
          {filteredPlans.map(plan => (
            <PlanCard key={plan.id} isPopular={plan.isPopular} isActive={plan.isActive}>
              <BadgeContainer>
                <CategoryBadge category={plan.category}>
                  {plan.category === 'basic' ? 'Basic' : 'Custom'}
                </CategoryBadge>
                <StatusBadge isActive={plan.isActive}>
                  {plan.isActive ? 'Active' : 'Inactive'}
                </StatusBadge>
              </BadgeContainer>

              <PlanHeader>
                <PlanName>{plan.displayName}</PlanName>
                <PlanDescription>{plan.description}</PlanDescription>

                <PlanPricing>
                  <MonthlyPrice>
                    {formatCurrency(plan.monthlyPrice)}<span style={{fontSize: '16px', color: '#6B7280'}}>/month</span>
                  </MonthlyPrice>
                  {plan.annualPrice > 0 && plan.monthlyPrice > 0 && (
                    <AnnualPrice>
                      {formatCurrency(plan.annualPrice)}/year
                      {plan.monthlyPrice * 12 > plan.annualPrice && (
                        <span> (Save {Math.round(((plan.monthlyPrice * 12 - plan.annualPrice) / (plan.monthlyPrice * 12)) * 100)}%)</span>
                      )}
                    </AnnualPrice>
                  )}
                  <PricingNote>Billed monthly or annually</PricingNote>
                </PlanPricing>
              </PlanHeader>

              {plan.category === 'basic' && (
                <PlanLimits>
                  <LimitItem>
                    <LimitLabel>Restaurants</LimitLabel>
                    <LimitValue>{formatLimit(plan.restaurantLimit)}</LimitValue>
                  </LimitItem>
                  <LimitItem>
                    <LimitLabel>Orders/month</LimitLabel>
                    <LimitValue>{formatLimit(plan.orderLimit)}</LimitValue>
                  </LimitItem>
                </PlanLimits>
              )}

              <FeaturesList>
                {(Array.isArray(plan.features) ? plan.features : []).map((feature, index) => (
                  <FeatureItem key={index}>{feature}</FeatureItem>
                ))}
              </FeaturesList>

              <PlanStats>
                <StatItem>
                  <StatNumber>{plan.subscriptionCount}</StatNumber>
                  <StatDesc>Subscriptions</StatDesc>
                </StatItem>
                <StatItem>
                  <StatNumber>{formatCurrency(plan.monthlyPrice * plan.subscriptionCount)}</StatNumber>
                  <StatDesc>Monthly Revenue</StatDesc>
                </StatItem>
              </PlanStats>

              <ActionButtons>
                <PlanButton
                  variant="primary"
                  onClick={() => handleEditPlan(plan)}
                >
                  Edit
                </PlanButton>
                <PlanButton
                  variant="secondary"
                  onClick={() => handleViewDetails(plan)}
                >
                  View
                </PlanButton>
                {!plan.isActive ? (
                  <PlanButton 
                    variant="primary"
                    onClick={() => handleToggleStatus(plan.id)}
                  >
                    Activate
                  </PlanButton>
                ) : (
                  <PlanButton 
                    variant="danger"
                    onClick={() => handleToggleStatus(plan.id)}
                  >
                    Deactivate
                  </PlanButton>
                )}
              </ActionButtons>
            </PlanCard>
          ))}
        </PlansGrid>
        
        {/* Create Plan Modal */}
        {showCreateModal && (
          <Modal>
            <ModalContent>
              <ModalHeader>
                <ModalTitle>Create New Plan</ModalTitle>
                <CloseButton onClick={() => setShowCreateModal(false)}>×</CloseButton>
              </ModalHeader>
              <ModalBody>
                <FormGroup>
                  <FormLabel>Plan Category *</FormLabel>
                  <FormSelect
                    value={createFormData.category}
                    onChange={(e) => setCreateFormData(prev => ({...prev, category: e.target.value as 'basic' | 'custom'}))}
                  >
                    <option value="basic">Basic Subscription</option>
                    <option value="custom">Custom Subscription</option>
                  </FormSelect>
                </FormGroup>
                <FormGroup>
                  <FormLabel>Plan Name</FormLabel>
                  <FormInput
                    type="text"
                    placeholder="Enter plan name..."
                    value={createFormData.name}
                    onChange={(e) => setCreateFormData(prev => ({...prev, name: e.target.value}))}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Display Name</FormLabel>
                  <FormInput
                    type="text"
                    placeholder="Enter display name..."
                    value={createFormData.display_name}
                    onChange={(e) => setCreateFormData(prev => ({...prev, display_name: e.target.value}))}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Description</FormLabel>
                  <FormTextArea
                    placeholder="Enter plan description..."
                    rows={3}
                    value={createFormData.description}
                    onChange={(e) => setCreateFormData(prev => ({...prev, description: e.target.value}))}
                  />
                </FormGroup>
                <PricingRow>
                  <FormGroup>
                    <FormLabel>Monthly Price (RM)</FormLabel>
                    <FormInput
                      type="number"
                      placeholder="0"
                      value={createFormData.base_price_monthly}
                      onChange={(e) => setCreateFormData(prev => ({...prev, base_price_monthly: e.target.value}))}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Annual Price (RM)</FormLabel>
                    <FormInput
                      type="number"
                      placeholder="0"
                      value={createFormData.base_price_annual}
                      onChange={(e) => setCreateFormData(prev => ({...prev, base_price_annual: e.target.value}))}
                    />
                  </FormGroup>
                </PricingRow>
                {createFormData.category === 'basic' && (
                  <>
                    <LimitsRow>
                      <FormGroup>
                        <FormLabel>Menu Item Limit</FormLabel>
                        <FormInput
                          type="number"
                          placeholder="-1 for unlimited"
                          value={createFormData.menu_item_limit}
                          onChange={(e) => setCreateFormData(prev => ({...prev, menu_item_limit: e.target.value}))}
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormLabel>Order Limit (per month)</FormLabel>
                        <FormInput
                          type="number"
                          placeholder="-1 for unlimited"
                          value={createFormData.order_limit}
                          onChange={(e) => setCreateFormData(prev => ({...prev, order_limit: e.target.value}))}
                        />
                      </FormGroup>
                    </LimitsRow>
                    <FormGroup>
                      <FormLabel>Staff Limit</FormLabel>
                      <FormInput
                        type="number"
                        placeholder="-1 for unlimited"
                        value={createFormData.staff_limit}
                        onChange={(e) => setCreateFormData(prev => ({...prev, staff_limit: e.target.value}))}
                      />
                    </FormGroup>
                  </>
                )}
                <FormGroup>
                  <FormLabel>Features (one per line)</FormLabel>
                  <FormTextArea
                    placeholder="Enter features, one per line..."
                    rows={6}
                    value={createFormData.features}
                    onChange={(e) => setCreateFormData(prev => ({...prev, features: e.target.value}))}
                  />
                </FormGroup>
                <CheckboxGroup>
                  <CheckboxItem>
                    <input
                      type="checkbox"
                      id="popular"
                      checked={createFormData.is_popular}
                      onChange={(e) => setCreateFormData(prev => ({...prev, is_popular: e.target.checked}))}
                    />
                    <label htmlFor="popular">Mark as Most Popular</label>
                  </CheckboxItem>
                  <CheckboxItem>
                    <input
                      type="checkbox"
                      id="active"
                      checked={createFormData.is_active}
                      onChange={(e) => setCreateFormData(prev => ({...prev, is_active: e.target.checked}))}
                    />
                    <label htmlFor="active">Set as Active</label>
                  </CheckboxItem>
                </CheckboxGroup>
              </ModalBody>
              <ModalActions>
                <Button variant="secondary" onClick={() => setShowCreateModal(false)}>Cancel</Button>
                <Button variant="primary" onClick={createPlan}>Create</Button>
              </ModalActions>
            </ModalContent>
          </Modal>
        )}
        
        {/* Edit Plan Modal */}
        {showEditModal && selectedPlan && (
          <Modal>
            <ModalContent>
              <ModalHeader>
                <ModalTitle>Edit Plan: {selectedPlan.displayName}</ModalTitle>
                <CloseButton onClick={() => setShowEditModal(false)}>×</CloseButton>
              </ModalHeader>
              <ModalBody>
                <FormGroup>
                  <FormLabel>Display Name</FormLabel>
                  <FormInput type="text" defaultValue={selectedPlan.displayName} />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Description</FormLabel>
                  <FormTextArea defaultValue={selectedPlan.description} rows={3} />
                </FormGroup>
                <PricingRow>
                  <FormGroup>
                    <FormLabel>Monthly Price (RM)</FormLabel>
                    <FormInput type="number" defaultValue={selectedPlan.monthlyPrice} />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Annual Price (RM)</FormLabel>
                    <FormInput type="number" defaultValue={selectedPlan.annualPrice} />
                  </FormGroup>
                </PricingRow>
                <LimitsRow>
                  <FormGroup>
                    <FormLabel>Restaurant Limit</FormLabel>
                    <FormInput type="number" defaultValue={selectedPlan.restaurantLimit} />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Order Limit (per month)</FormLabel>
                    <FormInput type="number" defaultValue={selectedPlan.orderLimit} />
                  </FormGroup>
                </LimitsRow>
                <FormGroup>
                  <FormLabel>Features (one per line)</FormLabel>
                  <FormTextArea defaultValue={selectedPlan.features.join('\n')} rows={6} />
                </FormGroup>
                <CheckboxGroup>
                  <CheckboxItem>
                    <input type="checkbox" id="edit-popular" defaultChecked={selectedPlan.isPopular} />
                    <label htmlFor="edit-popular">Mark as Most Popular</label>
                  </CheckboxItem>
                  <CheckboxItem>
                    <input type="checkbox" id="edit-active" defaultChecked={selectedPlan.isActive} />
                    <label htmlFor="edit-active">Set as Active</label>
                  </CheckboxItem>
                </CheckboxGroup>
              </ModalBody>
              <ModalActions>
                <ThemedButton variant="cancel" onClick={() => setShowEditModal(false)}>Cancel</ThemedButton>
                <ThemedButton variant="danger-outline" onClick={() => deletePlan(selectedPlan.id)}>Delete</ThemedButton>
                <ThemedButton variant="primary" onClick={() => {
                  setShowEditModal(false);
                  fetchPlans(); // Refresh plan list
                }}>Update Plan</ThemedButton>
              </ModalActions>
            </ModalContent>
          </Modal>
        )}
        
        {/* View Details Modal */}
        {showDetailsModal && selectedPlan && (
          <Modal>
            <ModalContent>
              <ModalHeader>
                <ModalTitle>Plan Details: {selectedPlan.displayName}</ModalTitle>
                <CloseButton onClick={() => setShowDetailsModal(false)}>×</CloseButton>
              </ModalHeader>
              <ModalBody>
                <DetailSection>
                  <DetailRow>
                    <DetailLabel>Plan ID</DetailLabel>
                    <DetailValue>{selectedPlan.id}</DetailValue>
                  </DetailRow>
                  <DetailRow>
                    <DetailLabel>Internal Name</DetailLabel>
                    <DetailValue>{selectedPlan.name}</DetailValue>
                  </DetailRow>
                  <DetailRow>
                    <DetailLabel>Display Name</DetailLabel>
                    <DetailValue>{selectedPlan.displayName}</DetailValue>
                  </DetailRow>
                  <DetailRow>
                    <DetailLabel>Status</DetailLabel>
                    <StatusBadge isActive={selectedPlan.isActive}>
                      {selectedPlan.isActive ? 'Active' : 'Inactive'}
                    </StatusBadge>
                  </DetailRow>
                  <DetailRow>
                    <DetailLabel>Popular Plan</DetailLabel>
                    <DetailValue>{selectedPlan.isPopular ? 'Yes' : 'No'}</DetailValue>
                  </DetailRow>
                </DetailSection>

                <DetailSection>
                  <h4>Pricing</h4>
                  <DetailRow>
                    <DetailLabel>Monthly Price</DetailLabel>
                    <DetailValue>{formatCurrency(selectedPlan.monthlyPrice)}</DetailValue>
                  </DetailRow>
                  <DetailRow>
                    <DetailLabel>Annual Price</DetailLabel>
                    <DetailValue>{formatCurrency(selectedPlan.annualPrice)}</DetailValue>
                  </DetailRow>
                  <DetailRow>
                    <DetailLabel>Annual Discount</DetailLabel>
                    <DetailValue>
                      {Math.round(((selectedPlan.monthlyPrice * 12 - selectedPlan.annualPrice) / (selectedPlan.monthlyPrice * 12)) * 100)}%
                    </DetailValue>
                  </DetailRow>
                </DetailSection>

                <DetailSection>
                  <h4>Limits</h4>
                  <DetailRow>
                    <DetailLabel>Restaurant Limit</DetailLabel>
                    <DetailValue>{formatLimit(selectedPlan.restaurantLimit)}</DetailValue>
                  </DetailRow>
                  <DetailRow>
                    <DetailLabel>Monthly Order Limit</DetailLabel>
                    <DetailValue>{formatLimit(selectedPlan.orderLimit)}</DetailValue>
                  </DetailRow>
                </DetailSection>

                <DetailSection>
                  <h4>Statistics</h4>
                  <DetailRow>
                    <DetailLabel>Current Subscriptions</DetailLabel>
                    <DetailValue>{selectedPlan.subscriptionCount}</DetailValue>
                  </DetailRow>
                  <DetailRow>
                    <DetailLabel>Monthly Revenue</DetailLabel>
                    <DetailValue>{formatCurrency(selectedPlan.monthlyPrice * selectedPlan.subscriptionCount)}</DetailValue>
                  </DetailRow>
                  <DetailRow>
                    <DetailLabel>Created Date</DetailLabel>
                    <DetailValue>{selectedPlan.createdAt}</DetailValue>
                  </DetailRow>
                </DetailSection>

                <DetailSection>
                  <h4>Features</h4>
                  <FeaturesList>
                    {(Array.isArray(selectedPlan.features) ? selectedPlan.features : []).map((feature, index) => (
                      <FeatureItem key={index}>{feature}</FeatureItem>
                    ))}
                  </FeaturesList>
                </DetailSection>
              </ModalBody>
            </ModalContent>
          </Modal>
        )}

        </Content>
      </Container>
    </MainLayout>
  );
};

export default PlansPage;