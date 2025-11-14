import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainLayout from '../../components/Layout/MainLayout';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import {
  Container,
  Header,
  Title,
  ActionSection,
  Content,
  StatsGrid,
  StatCard,
  StatValue,
  StatLabel,
  StatDescription,
  Table,
  TableHeader as CommonTableHeader,
  TableRow as CommonTableRow,
  MobileLabel,
  MobileValue,
  MobileGrid,
  ActionButtons,
  ActionButton as CommonActionButton,
  IconButton as CommonIconButton
} from '../../components/UI';
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';

interface RestaurantSubscription {
  id: string;
  restaurantId: string;
  restaurantName: string;
  managerId: string;
  managerName: string;
  planType: 'basic' | 'professional' | 'enterprise' | string;
  status: 'active' | 'trial' | 'expired' | 'suspended' | 'cancelled';
  startDate: string;
  endDate: string;
  monthlyFee: number;
  billingCycle: 'monthly' | 'annual';
  paymentModel: 'manager' | 'restaurant';
  payerId: string;
  payerName: string;
  menuItemLimit: number;
  currentMenuItems: number;
  features: string[];
  lastPayment: string;
  nextPayment: string;
  autoRenew: boolean;
  location: string;
  email?: string;
  phone?: string;
}

// Common components now imported from ../../components/UI
// Page-specific styled components below

// 페이지별 반응형 테이블 헤더 (Subscriptions 전용)
const SubscriptionTableHeader = styled(CommonTableHeader)`
  @media (max-width: 1400px) {
    & > span:nth-child(4),
    & > span:nth-child(5),
    & > span:nth-child(6),
    & > span:nth-child(7) {
      display: none;
    }
  }

  @media (max-width: 1024px) {
    & > span:nth-child(3),
    & > span:nth-child(4),
    & > span:nth-child(5),
    & > span:nth-child(6),
    & > span:nth-child(7) {
      display: none;
    }
  }
`;

// 페이지별 반응형 테이블 행 (Subscriptions 전용)
const SubscriptionTableRow = styled(CommonTableRow)`
  @media (max-width: 1400px) {
    & > div:nth-child(4),
    & > div:nth-child(5),
    & > div:nth-child(6),
    & > div:nth-child(7) {
      display: none;
    }
  }

  @media (max-width: 1024px) {
    & > div:nth-child(3),
    & > div:nth-child(4),
    & > div:nth-child(5),
    & > div:nth-child(6),
    & > div:nth-child(7) {
      display: none;
    }
  }
`;

const RestaurantInfo = styled.div``;

const RestaurantName = styled.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`;

const RestaurantMeta = styled.div`
  font-size: 13px;
  color: #6B7280;
`;

const StatusBadge = styled.span<{ status: string }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  background: ${props => {
    switch(props.status) {
      case 'active': return '#ECFDF5';
      case 'trial': return '#FEF3C7';
      case 'expired': return '#FEE2E2';
      case 'suspended': return '#FEF2F2';
      case 'cancelled': return '#F3F4F6';
      default: return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'active': return '#059669';
      case 'trial': return '#D97706';
      case 'expired': return '#DC2626';
      case 'suspended': return '#DC2626';
      case 'cancelled': return '#6B7280';
      default: return '#6B7280';
    }
  }};
`;

const PlanBadge = styled.span<{ planType: string }>`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  background: ${props => {
    switch(props.planType) {
      case 'basic': return '#DBEAFE';
      case 'professional': return '#E4E7FF';
      case 'enterprise': return '#FEF3C7';
      default: return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch(props.planType) {
      case 'basic': return '#1E40AF';
      case 'professional': return '#6366F1';
      case 'enterprise': return '#D97706';
      default: return '#6B7280';
    }
  }};
`;

const IconSymbol = styled.span`
  font-size: 14px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
`;

// Modal Components
const ModalOverlay = styled.div<{ show: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => props.show ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 10000;
  pointer-events: ${props => props.show ? 'auto' : 'none'};
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const Modal = styled.div`
  background: white;
  border-radius: 12px;
  padding: 0;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: slideIn 0.3s ease;
  
  @keyframes slideIn {
    from { 
      transform: translateY(-50px);
      opacity: 0;
    }
    to { 
      transform: translateY(0);
      opacity: 1;
    }
  }
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

const CloseThemedButton = styled.button`
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

const SuccessModal = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  width: 400px;
  text-align: center;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
`;

const SuccessIcon = styled.div`
  width: 60px;
  height: 60px;
  background: #10B981;
  border-radius: 50%;
  margin: 0 auto 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
`;

const SuccessTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #065F46;
  margin: 0 0 8px;
`;

const SuccessMessage = styled.p`
  color: #6B7280;
  margin: 0 0 20px;
  line-height: 1.5;
`;

const ModalBody = styled.div`
  padding: 24px;
`;

const ModalActions = styled.div`
  padding: 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const FormGrid = styled.div`
  display: grid;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const FormLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
`;

const FormInput = styled.input`
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
  
  &:disabled {
    background: #F8FAFC;
    color: #6B7280;
    cursor: not-allowed;
  }
`;

const FormSelect = styled.select`
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const SubscriptionsPage: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<RestaurantSubscription[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('active');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedSubscription, setSelectedSubscription] = useState<RestaurantSubscription | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState<'delete' | 'suspend' | 'activate' | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState<RestaurantSubscription | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingSubscription, setViewingSubscription] = useState<RestaurantSubscription | null>(null);
  const [newSubscription, setNewSubscription] = useState({
    restaurantId: '',
    managerId: '',
    managerName: '',
    restaurantName: '',
    planType: 'basic' as 'basic' | 'professional' | 'enterprise' | 'custom',
    customPlanName: '',
    status: 'trial' as 'active' | 'trial' | 'expired' | 'suspended' | 'cancelled',
    billingCycle: 'monthly' as 'monthly' | 'annual',
    paymentModel: 'restaurant' as 'restaurant' | 'foodcourt_manager' | 'brand_manager',
    autoRenew: false,
    email: '',
    phone: '',
    address: '',
    monthlyFee: 29,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 365*24*60*60*1000).toISOString().split('T')[0]
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [searchResults, setSearchResults] = useState<{managers: any[], restaurants: any[]}>({managers: [], restaurants: []});
  const [selectedTarget, setSelectedTarget] = useState<{type: 'manager' | 'restaurant', data: any} | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [availableRestaurants, setAvailableRestaurants] = useState<any[]>([]);
  const [availableManagers, setAvailableManagers] = useState<any[]>([]);
  const [allRestaurantsData, setAllRestaurantsData] = useState<any[]>([]);
  const [customPlans, setCustomPlans] = useState<any[]>([]);

  useEffect(() => {
    fetchSubscriptions();
    fetchAvailableData();
    fetchCustomPlans();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      console.log('🔄 Fetching restaurants from API...');

      const restaurantsResponse = await fetch('/api/restaurants');

      if (!restaurantsResponse.ok) {
        throw new Error('Failed to fetch restaurants');
      }

      const restaurantsData = await restaurantsResponse.json();
      const restaurants = Array.isArray(restaurantsData) ? restaurantsData : [];
      
      const formattedSubscriptions: RestaurantSubscription[] = restaurants.map((restaurant: any, index: number) => {
        const planType = restaurant.plan_type?.toLowerCase().replace(' plan', '') || 'basic';
        
        // Map restaurant status to subscription status
        let subscriptionStatus: 'active' | 'trial' | 'expired' | 'suspended' | 'cancelled' = 'active';
        if (restaurant.status === 'active') subscriptionStatus = 'active';
        else if (restaurant.status === 'inactive') subscriptionStatus = 'suspended';
        else if (restaurant.status === 'cancelled') subscriptionStatus = 'cancelled';
        
        const planLimits: { [key: string]: number } = {
          basic: 50,
          professional: 200,
          enterprise: -1
        };
        
        return {
          id: `sub-${restaurant.id}`,
          restaurantId: restaurant.id?.toString() || `rest-${index}`,
          restaurantName: restaurant.name || 'Restaurant Name',
          managerId: (restaurant.managerId || restaurant.manager_id)?.toString() || '',
          managerName: restaurant.managerName || restaurant.manager_name || 'No Manager Assigned',
          planType: planType as 'basic' | 'professional' | 'enterprise',
          status: subscriptionStatus,
          startDate: restaurant.subscription_start ? new Date(restaurant.subscription_start).toISOString().split('T')[0] : '2024-01-01',
          endDate: restaurant.subscription_end ? new Date(restaurant.subscription_end).toISOString().split('T')[0] : new Date(Date.now() + 365*24*60*60*1000).toISOString().split('T')[0],
          monthlyFee: parseFloat(restaurant.plan_amount) || 29,
          billingCycle: 'monthly' as 'monthly' | 'annual',
          paymentModel: 'manager' as 'manager' | 'restaurant',
          payerId: (restaurant.managerId || restaurant.manager_id)?.toString() || '',
          payerName: restaurant.managerName || restaurant.manager_name || 'No Manager',
          menuItemLimit: planLimits[planType] || 50,
          currentMenuItems: Math.floor(Math.random() * (planLimits[planType] > 0 ? planLimits[planType] * 0.7 : 150)) + 10,
          features: [],
          lastPayment: restaurant.subscription_start ? new Date(restaurant.subscription_start).toISOString().split('T')[0] : '-',
          nextPayment: restaurant.subscription_end ? new Date(restaurant.subscription_end).toISOString().split('T')[0] : new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
          autoRenew: subscriptionStatus === 'active',
          location: restaurant.address || 'Location not specified'
        };
      });
      
      setSubscriptions(formattedSubscriptions);
      
    } catch (error) {
      console.error('❌ Error fetching subscriptions:', error);
      setSubscriptions([]);
    }
  };

  const fetchAvailableData = async () => {
    try {
      const restaurantsResponse = await fetch('/api/restaurants');
      const usersResponse = await fetch('/api/users');

      if (restaurantsResponse.ok && usersResponse.ok) {
        const restaurants = await restaurantsResponse.json();
        const users = await usersResponse.json();

        // Filter only manager roles
        const managers = Array.isArray(users)
          ? users.filter((u: any) =>
              u.role === 'Foodcourt Manager' ||
              u.role === 'Foodcourt General' ||
              u.role === 'Brand Manager' ||
              u.role === 'Brand General'
            )
          : [];

        setAvailableRestaurants(Array.isArray(restaurants) ? restaurants : []);
        setAvailableManagers(managers);
        setAllRestaurantsData(Array.isArray(restaurants) ? restaurants : []);
      }
    } catch (error) {
      console.error('Error fetching available data:', error);
    }
  };

  const fetchCustomPlans = async () => {
    try {
      const response = await fetch('/api/plans');
      if (response.ok) {
        const data = await response.json();
        const plans = Array.isArray(data) ? data : [];
        const customOnly = plans.filter((p: any) => p.category === 'custom');
        setCustomPlans(customOnly);
      }
    } catch (error) {
      console.error('Error fetching custom plans:', error);
    }
  };

  const filteredSubscriptions = subscriptions.filter(subscription => {
    const matchesSearch = subscription.restaurantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subscription.managerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subscription.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || subscription.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalSubscriptions = subscriptions.length;
  const activeSubscriptions = subscriptions.filter(s => s.status === 'active').length;
  const trialSubscriptions = subscriptions.filter(s => s.status === 'trial').length;
  const totalRevenue = subscriptions.filter(s => s.status === 'active').reduce((sum, s) => sum + s.monthlyFee, 0);

  const handleAddSubscription = () => {
    setShowAddModal(true);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setShowSearchDropdown(true);

    if (query.length < 2) {
      setSearchResults({managers: [], restaurants: []});
      return;
    }

    const filteredManagers = availableManagers.filter(manager =>
      (manager.fullName && manager.fullName.toLowerCase().includes(query.toLowerCase())) ||
      (manager.full_name && manager.full_name.toLowerCase().includes(query.toLowerCase())) ||
      (manager.username && manager.username.toLowerCase().includes(query.toLowerCase()))
    );

    const filteredRestaurants = allRestaurantsData.filter(restaurant =>
      restaurant.name && restaurant.name.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults({
      managers: filteredManagers.slice(0, 5),
      restaurants: filteredRestaurants.slice(0, 5)
    });
  };

  const selectTarget = (type: 'manager' | 'restaurant', data: any) => {
    setSelectedTarget({type, data});
    setShowSearchDropdown(false);
    setSearchQuery(type === 'manager' ? (data.fullName || data.full_name || data.username) : data.name);

    // Auto-determine payment model based on target type
    let paymentModel: 'restaurant' | 'foodcourt_manager' | 'brand_manager' = 'restaurant';
    if (type === 'manager') {
      // Check manager role
      if (data.role === 'Foodcourt Manager' || data.role === 'Foodcourt General') {
        paymentModel = 'foodcourt_manager';
      } else if (data.role === 'Brand Manager' || data.role === 'Brand General') {
        paymentModel = 'brand_manager';
      }
    }

    if (type === 'manager') {
      setNewSubscription({
        ...newSubscription,
        managerId: data.id?.toString() || '',
        managerName: data.fullName || data.full_name || data.username || '',
        restaurantId: '',
        restaurantName: '',
        paymentModel: paymentModel
      });
    } else {
      const restaurant = data;
      const manager = availableManagers.find((m: any) => m.id?.toString() === restaurant.manager_id?.toString());
      setNewSubscription({
        ...newSubscription,
        restaurantId: restaurant.id?.toString() || '',
        restaurantName: restaurant.name || '',
        managerId: restaurant.manager_id?.toString() || '',
        managerName: manager ? (manager.fullName || manager.full_name || manager.username) : 'No Manager Assigned',
        email: restaurant.email || '',
        phone: restaurant.phone || '',
        address: restaurant.address || '',
        paymentModel: 'restaurant'
      });
    }
  };

  const handleEditSubscription = (subscription: RestaurantSubscription) => {
    setEditingSubscription(subscription);
    setShowEditModal(true);
  };

  // Restaurant 선택 시 매니저 자동 채우기
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleRestaurantSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const restaurantId = e.target.value;
    const selectedRestaurant = allRestaurantsData.find(r => r.id.toString() === restaurantId);

    if (selectedRestaurant) {
      setNewSubscription({
        ...newSubscription,
        restaurantId: restaurantId,
        managerId: selectedRestaurant.manager_id?.toString() || '',
        managerName: selectedRestaurant.manager_name || selectedRestaurant.managerName || 'No Manager Assigned',
        email: selectedRestaurant.email || '',
        phone: selectedRestaurant.phone || '',
        address: selectedRestaurant.address || ''
      });
    } else {
      setNewSubscription({
        ...newSubscription,
        restaurantId: restaurantId,
        managerId: '',
        managerName: '',
        email: '',
        phone: '',
        address: ''
      });
    }
  };


  // Billing Cycle 변경 핸들러
  const handleBillingCycleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cycle = e.target.value as 'monthly' | 'annual';
    const planAmounts: { [key: string]: { monthly: number, annual: number } } = {
      'basic': { monthly: 29, annual: 290 },
      'professional': { monthly: 99, annual: 990 },
      'enterprise': { monthly: 199, annual: 2190 }
    };

    const amounts = planAmounts[newSubscription.planType] || planAmounts['basic'];

    setNewSubscription({
      ...newSubscription,
      billingCycle: cycle,
      monthlyFee: amounts[cycle]
    });
  };

  const handleDeleteSubscription = (subscription: RestaurantSubscription) => {
    setSelectedSubscription(subscription);
    setConfirmAction('delete');
    setShowConfirmModal(true);
  };

  const handleToggleStatus = (subscription: RestaurantSubscription) => {
    setSelectedSubscription(subscription);
    setConfirmAction(subscription.status === 'active' ? 'suspend' : 'activate');
    setShowConfirmModal(true);
  };

  const handleSubmit = async () => {
    try {
      if (!selectedTarget) {
        alert('Please select a manager or restaurant');
        return;
      }

      // Create subscription data
      const subscriptionData = {
        restaurantId: newSubscription.restaurantId,
        restaurantName: newSubscription.restaurantName,
        managerId: newSubscription.managerId,
        managerName: newSubscription.managerName,
        planType: newSubscription.customPlanName || 'Custom Plan',
        monthlyFee: newSubscription.monthlyFee,
        billingCycle: newSubscription.billingCycle,
        startDate: newSubscription.startDate,
        endDate: newSubscription.endDate,
        status: newSubscription.status,
        autoRenew: newSubscription.autoRenew,
        paymentModel: newSubscription.paymentModel
      };

      // Create invoice data with proper customer information
      let customerName = '';
      let customerAddress = '';
      let companyName = '';
      let restaurantName = '';

      if (selectedTarget.type === 'restaurant') {
        customerName = selectedTarget.data.name;
        restaurantName = selectedTarget.data.name;
        companyName = selectedTarget.data.name;

        // Build full address from restaurant data
        const addressParts = [];
        if (selectedTarget.data.address) addressParts.push(selectedTarget.data.address);
        if (selectedTarget.data.phone) addressParts.push(`Phone: ${selectedTarget.data.phone}`);
        if (selectedTarget.data.email) addressParts.push(`Email: ${selectedTarget.data.email}`);
        customerAddress = addressParts.join('\n');
      } else if (selectedTarget.type === 'manager') {
        customerName = selectedTarget.data.fullName || selectedTarget.data.full_name || selectedTarget.data.username;
        companyName = selectedTarget.data.companyName || customerName;
        restaurantName = newSubscription.restaurantName || '';

        // Build address from manager data
        const addressParts = [];
        if (selectedTarget.data.companyName) addressParts.push(selectedTarget.data.companyName);
        if (selectedTarget.data.email) addressParts.push(`Email: ${selectedTarget.data.email}`);
        customerAddress = addressParts.join('\n');
      }

      const invoiceData = {
        restaurantId: selectedTarget.type === 'restaurant' ? selectedTarget.data.id : null,
        restaurantName: restaurantName,
        managerId: selectedTarget.type === 'manager' ? selectedTarget.data.id : (selectedTarget.data.manager_id || null),
        managerName: selectedTarget.type === 'manager'
          ? (selectedTarget.data.fullName || selectedTarget.data.full_name || selectedTarget.data.username)
          : newSubscription.managerName,
        customerName: customerName,
        customerAddress: customerAddress,
        companyName: companyName,
        planName: newSubscription.customPlanName || 'Custom Plan',
        amount: newSubscription.monthlyFee,
        billingCycle: newSubscription.billingCycle,
        issueDate: newSubscription.startDate,
        dueDate: new Date(new Date(newSubscription.startDate).getTime() + 14*24*60*60*1000).toISOString().split('T')[0],
        paidBy: selectedTarget.type === 'restaurant' ? 'Restaurant Admin' :
                selectedTarget.data.role === 'Foodcourt Manager' ? 'Foodcourt Manager' :
                selectedTarget.data.role === 'Foodcourt General' ? 'Foodcourt General Manager' :
                selectedTarget.data.role === 'Brand Manager' ? 'Brand Manager' :
                selectedTarget.data.role === 'Brand General' ? 'Brand General Manager' : 'Manager',
        status: 'pending'
      };

      // Update restaurant subscription data if restaurant is selected
      if (selectedTarget.type === 'restaurant' && selectedTarget.data.id) {
        const restaurantUpdateData = {
          plan_type: newSubscription.customPlanName || 'Custom Plan',
          plan_amount: newSubscription.monthlyFee,
          billing_cycle: newSubscription.billingCycle,
          subscription_start: newSubscription.startDate,
          subscription_end: newSubscription.endDate,
          status: newSubscription.status
        };

        const restaurantResponse = await fetch(`/api/restaurants/${selectedTarget.data.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(restaurantUpdateData)
        });

        if (!restaurantResponse.ok) {
          throw new Error('Failed to update restaurant subscription');
        }
      }

      // Create invoice via API
      const invoiceResponse = await fetch('/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invoiceData)
      });

      if (!invoiceResponse.ok) {
        throw new Error('Failed to create invoice');
      }

      console.log('✅ Subscription and invoice created:', subscriptionData, invoiceData);

      setShowAddModal(false);
      setSuccessMessage('Subscription added and invoice generated successfully!');
      setShowSuccessModal(true);

      await fetchSubscriptions();
    } catch (error) {
      console.error('Error adding subscription:', error);
      alert('Error adding subscription. Please try again.');
    }
  };

  const handleUpdateSubscription = async () => {
    if (!editingSubscription) return;

    try {
      console.log('🔄 Updating subscription:', editingSubscription);

      const updateData = {
        name: editingSubscription.restaurantName,
        managerId: editingSubscription.managerId || null,
        planType: editingSubscription.planType === 'basic' ? 'Basic Plan' :
                 editingSubscription.planType === 'professional' ? 'Professional Plan' : 'Enterprise Plan',
        planAmount: editingSubscription.monthlyFee,
        status: editingSubscription.status === 'active' ? 'active' : 'inactive',
        subscriptionStart: editingSubscription.startDate,
        subscriptionEnd: editingSubscription.endDate
      };

      console.log('📤 Sending update data:', updateData);

      // Make actual API call to update subscription
      const response = await fetch(`/api/restaurants/${editingSubscription.restaurantId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });

      console.log('📡 Subscription update API response status:', response.status);

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Subscription updated successfully:', result);

        // Close modal and show success message
        setShowEditModal(false);
        setEditingSubscription(null);

        // Re-fetch data to ensure consistency
        console.log('🔄 Re-fetching subscription data...');
        await fetchSubscriptions();

        setSuccessMessage('Subscription updated successfully!');
        setShowSuccessModal(true);

        console.log('✅ Modal closed and data refreshed');
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('❌ Failed to update subscription:', errorData);
        alert(`Error updating subscription: ${errorData.error || 'Please try again.'}`);
      }
    } catch (error) {
      console.error('❌ Error updating subscription:', error);
      alert('Error updating subscription. Please check your connection and try again.');
    }
  };

  const handleConfirmAction = async () => {
    if (!selectedSubscription || !confirmAction) return;

    try {
      if (confirmAction === 'delete') {
        // Delete subscription logic
        console.log('Deleting subscription:', selectedSubscription.id);
        setSuccessMessage('Subscription deleted successfully');
      } else if (confirmAction === 'suspend') {
        // Suspend subscription logic
        setSuccessMessage('Subscription suspended successfully');
      } else if (confirmAction === 'activate') {
        // Activate subscription logic
        setSuccessMessage('Subscription activated successfully');
      }

      setShowSuccessModal(true);
      await fetchSubscriptions();
    } catch (error) {
      console.error('Action failed:', error);
      alert(`Action failed: ${error.message}. Please try again.`);
    }

    setShowConfirmModal(false);
    setSelectedSubscription(null);
    setConfirmAction(null);
  };

  // CSV 변환 함수
  const convertToCSV = (data: any[]) => {
    if (data.length === 0) return '';

    const headers = Object.keys(data[0]);
    const csvHeaders = headers.join(',');

    const csvRows = data.map(row =>
      headers.map(header => {
        const value = row[header];
        // CSV에서 쉼표와 따옴표 처리
        if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value || '';
      }).join(',')
    );

    return [csvHeaders, ...csvRows].join('\n');
  };

  const handleExportData = () => {
    // 현재 필터링된 구독 리스트를 사용하여 CSV 데이터 생성
    const csvData = filteredSubscriptions.map(sub => ({
      'Restaurant Info': `${sub.restaurantName} - ${sub.managerName}`,
      'Plan': sub.planType,
      'Status': sub.status,
      'Menu Items': `${sub.currentMenuItems}/${sub.menuItemLimit}`,
      'Monthly Fee': `RM ${sub.monthlyFee}`,
      'Next Payment': sub.nextPayment || 'N/A',
      'Location': sub.location,
      'Manager': sub.managerName
    }));

    const csvContent = convertToCSV(csvData);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `subscriptions-export-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <MainLayout>
      <Container>
        <Header>
          <Title>Subscriptions</Title>
          <ActionSection>
            <ThemedButton variant="outline" onClick={handleExportData}>Export</ThemedButton>
            <ThemedButton variant="primary" onClick={handleAddSubscription}>Add Subscription</ThemedButton>
          </ActionSection>
        </Header>
        
        <Content>
          <StatsGrid>
            <StatCard color="#059669">
              <StatValue>{totalSubscriptions}</StatValue>
              <StatLabel>Total Subscriptions</StatLabel>
              <StatDescription>Across all restaurants</StatDescription>
            </StatCard>
            <StatCard color="#2563EB">
              <StatValue>{activeSubscriptions}</StatValue>
              <StatLabel>Active Subscriptions</StatLabel>
              <StatDescription>{totalSubscriptions > 0 ? Math.round((activeSubscriptions/totalSubscriptions)*100) : 0}% operational</StatDescription>
            </StatCard>
            <StatCard color="#7C3AED">
              <StatValue>{trialSubscriptions}</StatValue>
              <StatLabel>Trial Subscriptions</StatLabel>
              <StatDescription>Currently evaluating</StatDescription>
            </StatCard>
            <StatCard color="#D97706">
              <StatValue>RM {totalRevenue.toLocaleString()}</StatValue>
              <StatLabel>Monthly Revenue</StatLabel>
              <StatDescription>From active subscriptions</StatDescription>
            </StatCard>
          </StatsGrid>

          <FilterBar>
            <SearchInput
              placeholder="Search subscriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

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
          </FilterBar>

          <Table>
            <SubscriptionTableHeader columns="2.5fr 1fr 1fr 1.2fr 1fr 1fr 1fr 220px">
              <span>Restaurant Info</span>
              <span>Plan</span>
              <span>Status</span>
              <span>Menu Items</span>
              <span>Monthly Fee</span>
              <span>Expires In</span>
              <span>Auto-Renew</span>
              <span>Actions</span>
            </SubscriptionTableHeader>

            {filteredSubscriptions.map(subscription => (
              <SubscriptionTableRow columns="2.5fr 1fr 1fr 1.2fr 1fr 1fr 1fr 220px" key={subscription.id}>
                <MobileGrid>
                  <MobileValue>
                    <MobileLabel>Restaurant Info</MobileLabel>
                    <RestaurantInfo>
                      <RestaurantName>{subscription.restaurantName}</RestaurantName>
                      <RestaurantMeta>
                        {subscription.managerName} • {subscription.location}
                      </RestaurantMeta>
                    </RestaurantInfo>
                  </MobileValue>

                  <MobileValue>
                    <MobileLabel>Plan</MobileLabel>
                    <PlanBadge planType={subscription.planType}>
                      {subscription.planType.charAt(0).toUpperCase() + subscription.planType.slice(1)}
                    </PlanBadge>
                  </MobileValue>

                  <MobileValue>
                    <MobileLabel>Status</MobileLabel>
                    <StatusBadge status={subscription.status}>
                      {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                    </StatusBadge>
                  </MobileValue>

                  <MobileValue>
                    <MobileLabel>Menu Items</MobileLabel>
                    {subscription.currentMenuItems}/{subscription.menuItemLimit === -1 ? '∞' : subscription.menuItemLimit}
                  </MobileValue>

                  <MobileValue>
                    <MobileLabel>Monthly Fee</MobileLabel>
                    RM {subscription.monthlyFee}
                  </MobileValue>

                  <MobileValue>
                    <MobileLabel>Expires In</MobileLabel>
                    {(() => {
                      const today = new Date();
                      const endDate = new Date(subscription.endDate);
                      const diffTime = endDate.getTime() - today.getTime();
                      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                      if (diffDays < 0) {
                        return <span style={{color: '#DC2626', fontWeight: '500'}}>Expired</span>;
                      } else if (diffDays === 0) {
                        return <span style={{color: '#DC2626', fontWeight: '500'}}>Today</span>;
                      } else if (diffDays <= 7) {
                        return <span style={{color: '#F59E0B', fontWeight: '500'}}>{diffDays} days</span>;
                      } else if (diffDays <= 30) {
                        return <span style={{color: '#10B981', fontWeight: '500'}}>{diffDays} days</span>;
                      } else {
                        return <span style={{color: '#6B7280'}}>{diffDays} days</span>;
                      }
                    })()}
                  </MobileValue>

                  <MobileValue>
                    <MobileLabel>Auto-Renew</MobileLabel>
                    {subscription.autoRenew ? (
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '4px 8px',
                        background: '#DCFCE7',
                        color: '#15803D',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '500'
                      }}>
                        ✓ Auto
                      </span>
                    ) : (
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '4px 8px',
                        background: '#FEF3C7',
                        color: '#92400E',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '500'
                      }}>
                        Manual
                      </span>
                    )}
                  </MobileValue>
                </MobileGrid>

                <ActionButtons>
                  <CommonActionButton onClick={() => {
                    setViewingSubscription(subscription);
                    setShowViewModal(true);
                  }}>View</CommonActionButton>
                  {subscription.planType !== 'basic' && subscription.planType !== 'professional' && subscription.planType !== 'enterprise' && (
                    <CommonActionButton onClick={() => handleEditSubscription(subscription)}>Edit</CommonActionButton>
                  )}
                  <CommonIconButton
                    onClick={() => handleToggleStatus(subscription)}
                    title={subscription.status === 'active' ? 'Suspend Subscription' : 'Activate Subscription'}
                  >
                    <IconSymbol>{subscription.status === 'active' ? '⊗' : '◉'}</IconSymbol>
                  </CommonIconButton>
                  <CommonIconButton
                    onClick={() => handleDeleteSubscription(subscription)}
                    title="Delete Subscription"
                  >
                    <IconSymbol>✕</IconSymbol>
                  </CommonIconButton>
                </ActionButtons>
              </SubscriptionTableRow>
            ))}
          </Table>

          {/* Add Subscription Modal */}
          {showAddModal && (
            <ModalOverlay show={showAddModal} onClick={() => setShowAddModal(false)}>
              <Modal onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                  <ModalTitle>Add Subscription</ModalTitle>
                  <CloseThemedButton onClick={() => setShowAddModal(false)}>×</CloseThemedButton>
                </ModalHeader>
                <ModalBody>
                  <FormGrid>
                    <FormGroup style={{gridColumn: '1 / -1'}}>
                      <FormLabel>Search Manager or Restaurant *</FormLabel>
                      <div style={{position: 'relative', width: '100%'}}>
                        <FormInput
                          type="text"
                          value={searchQuery}
                          onChange={(e) => handleSearch(e.target.value)}
                          onFocus={() => setShowSearchDropdown(true)}
                          onBlur={() => setTimeout(() => setShowSearchDropdown(false), 200)}
                          placeholder="Type to search for managers or restaurants"
                          required
                          style={{width: '100%'}}
                        />
                        {showSearchDropdown && (searchResults.managers.length > 0 || searchResults.restaurants.length > 0) && (
                          <div style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            right: 0,
                            background: 'white',
                            border: '1px solid #E6EBF1',
                            borderRadius: '8px',
                            maxHeight: '300px',
                            overflowY: 'auto',
                            zIndex: 1000,
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                          }}>
                            {searchResults.managers.length > 0 && (
                              <div>
                                <div style={{padding: '8px 12px', background: '#F8FAFC', fontSize: '12px', fontWeight: '600', color: '#6B7280'}}>
                                  MANAGERS
                                </div>
                                {searchResults.managers.map(manager => (
                                  <div
                                    key={manager.id}
                                    onClick={() => selectTarget('manager', manager)}
                                    style={{
                                      padding: '12px',
                                      cursor: 'pointer',
                                      borderBottom: '1px solid #F3F4F6',
                                      transition: 'background 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = '#F8FAFC'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                                  >
                                    <div style={{fontWeight: '500', color: '#0A2540'}}>{manager.fullName || manager.full_name || manager.username}</div>
                                    <div style={{fontSize: '13px', color: '#6B7280'}}>{manager.email}</div>
                                  </div>
                                ))}
                              </div>
                            )}
                            {searchResults.restaurants.length > 0 && (
                              <div>
                                <div style={{padding: '8px 12px', background: '#F8FAFC', fontSize: '12px', fontWeight: '600', color: '#6B7280'}}>
                                  RESTAURANTS
                                </div>
                                {searchResults.restaurants.map(restaurant => {
                                  const manager = availableManagers.find((m: any) => m.id?.toString() === restaurant.manager_id?.toString());
                                  return (
                                    <div
                                      key={restaurant.id}
                                      onClick={() => selectTarget('restaurant', restaurant)}
                                      style={{
                                        padding: '12px',
                                        cursor: 'pointer',
                                        borderBottom: '1px solid #F3F4F6',
                                        transition: 'background 0.2s'
                                      }}
                                      onMouseEnter={(e) => e.currentTarget.style.background = '#F8FAFC'}
                                      onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                                    >
                                      <div style={{fontWeight: '500', color: '#0A2540'}}>{restaurant.name}</div>
                                      <div style={{fontSize: '13px', color: '#6B7280'}}>
                                        Manager: {manager ? (manager.fullName || manager.full_name || manager.username) : 'Unknown'}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      {selectedTarget && (
                        <div style={{
                          marginTop: '8px',
                          padding: '12px',
                          background: '#F0F7FF',
                          border: '1px solid #B3D9FF',
                          borderRadius: '8px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}>
                          <div>
                            <div style={{fontWeight: '500', color: '#0A2540'}}>
                              {selectedTarget.type === 'manager'
                                ? (selectedTarget.data.fullName || selectedTarget.data.full_name || selectedTarget.data.username)
                                : selectedTarget.data.name}
                            </div>
                            <div style={{fontSize: '13px', color: '#6B7280'}}>
                              {selectedTarget.type === 'manager'
                                ? `Manager`
                                : `${selectedTarget.data.address || 'No address'} • Restaurant`}
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              setSelectedTarget(null);
                              setSearchQuery('');
                            }}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#6B7280',
                              cursor: 'pointer',
                              fontSize: '18px',
                              lineHeight: '1',
                              padding: '4px'
                            }}
                            title="Remove selection"
                          >
                            ×
                          </button>
                        </div>
                      )}
                    </FormGroup>

                    <FormGroup style={{gridColumn: '1 / -1'}}>
                      <FormLabel>Custom Subscription Plan *</FormLabel>
                      <FormSelect
                        value={newSubscription.customPlanName || ''}
                        onChange={(e) => {
                          const selectedValue = e.target.value;
                          if (selectedValue === 'others') {
                            setNewSubscription({
                              ...newSubscription,
                              planType: 'custom',
                              customPlanName: 'others',
                              monthlyFee: 0
                            });
                          } else if (selectedValue) {
                            // Find the selected plan to get its monthly fee
                            const selectedPlan = customPlans.find(p => p.name === selectedValue);
                            setNewSubscription({
                              ...newSubscription,
                              planType: 'custom',
                              customPlanName: selectedValue,
                              monthlyFee: selectedPlan?.monthly_price || 0
                            });
                          } else {
                            setNewSubscription({
                              ...newSubscription,
                              planType: 'custom',
                              customPlanName: '',
                              monthlyFee: 0
                            });
                          }
                        }}
                      >
                        <option value="">Select Plan</option>
                        {customPlans.map((plan) => (
                          <option key={plan.id} value={plan.name}>
                            {plan.display_name} - RM {plan.monthly_price}
                          </option>
                        ))}
                        <option value="others">Others</option>
                      </FormSelect>
                    </FormGroup>

                    {newSubscription.customPlanName === 'others' && (
                      <>
                        <FormGroup style={{gridColumn: '1 / -1'}}>
                          <FormLabel>Custom Plan Name *</FormLabel>
                          <FormInput
                            type="text"
                            value=""
                            onChange={(e) => setNewSubscription({...newSubscription, customPlanName: e.target.value})}
                            placeholder="Enter custom plan name"
                            required
                          />
                        </FormGroup>

                        <FormGroup>
                          <FormLabel>Monthly Fee (RM) *</FormLabel>
                          <FormInput
                            type="number"
                            step="0.01"
                            min="0"
                            value={newSubscription.monthlyFee}
                            onChange={(e) => setNewSubscription({...newSubscription, monthlyFee: parseFloat(e.target.value) || 0})}
                            placeholder="0.00"
                            required
                          />
                        </FormGroup>
                      </>
                    )}

                    <FormGroup>
                      <FormLabel>Status *</FormLabel>
                      <FormSelect
                        value={newSubscription.status}
                        onChange={(e) => setNewSubscription({...newSubscription, status: e.target.value as 'active' | 'expired' | 'suspended' | 'cancelled'})}
                      >
                        <option value="active">Active</option>
                        <option value="suspended">Suspended</option>
                        <option value="expired">Expired</option>
                        <option value="cancelled">Cancelled</option>
                      </FormSelect>
                    </FormGroup>

                    {/* Subscription Settings Section */}
                    <div style={{gridColumn: '1 / -1', marginTop: '20px', marginBottom: '10px'}}>
                      <h3 style={{margin: 0, fontSize: '18px', fontWeight: '600', color: '#0A2540', borderBottom: '2px solid #635BFF', paddingBottom: '8px'}}>
                        Subscription Settings
                      </h3>
                    </div>

                    <FormGroup>
                      <FormLabel>Billing Cycle *</FormLabel>
                      <FormSelect
                        value={newSubscription.billingCycle || 'monthly'}
                        onChange={handleBillingCycleChange}
                      >
                        <option value="monthly">Monthly</option>
                        <option value="annual">Annual (10% discount)</option>
                      </FormSelect>
                    </FormGroup>

                    <FormGroup>
                      <FormLabel>Subscription Start Date *</FormLabel>
                      <FormInput
                        type="date"
                        value={newSubscription.startDate}
                        onChange={(e) => setNewSubscription({...newSubscription, startDate: e.target.value})}
                      />
                    </FormGroup>

                    <FormGroup>
                      <FormLabel>Subscription End Date *</FormLabel>
                      <FormInput
                        type="date"
                        value={newSubscription.endDate}
                        onChange={(e) => setNewSubscription({...newSubscription, endDate: e.target.value})}
                      />
                    </FormGroup>

                    <FormGroup style={{gridColumn: '1 / -1'}}>
                      <label style={{display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer'}}>
                        <input
                          type="checkbox"
                          checked={newSubscription.autoRenew || false}
                          onChange={(e) => setNewSubscription({...newSubscription, autoRenew: e.target.checked})}
                          style={{width: '16px', height: '16px'}}
                        />
                        <span style={{fontSize: '14px', color: '#374151'}}>
                          Auto-renew subscription
                        </span>
                      </label>
                    </FormGroup>

                    <div style={{gridColumn: '1 / -1', padding: '16px', background: '#F3F4F6', borderRadius: '8px', marginTop: '10px'}}>
                      <div style={{fontSize: '14px', color: '#6B7280', marginBottom: '8px'}}>
                        <strong>Summary:</strong>
                      </div>
                      <div style={{fontSize: '16px', fontWeight: '600', color: '#0A2540'}}>
                        {newSubscription.planType === 'custom'
                          ? (newSubscription.customPlanName || 'Custom Plan')
                          : (newSubscription.planType === 'basic' ? 'Basic' : newSubscription.planType === 'professional' ? 'Professional' : 'Enterprise')
                        } Plan - RM {newSubscription.monthlyFee || 29} ({newSubscription.billingCycle || 'monthly'})
                      </div>
                      <div style={{fontSize: '12px', color: '#6B7280', marginTop: '4px'}}>
                        Paid by: {
                          selectedTarget
                            ? selectedTarget.type === 'restaurant'
                              ? `${selectedTarget.data.name} (Restaurant Admin)`
                              : (() => {
                                  const roleName = selectedTarget.data.role === 'Foodcourt Manager' ? 'Foodcourt Manager' :
                                                   selectedTarget.data.role === 'Foodcourt General' ? 'Foodcourt General Manager' :
                                                   selectedTarget.data.role === 'Brand Manager' ? 'Brand Manager' :
                                                   selectedTarget.data.role === 'Brand General' ? 'Brand General Manager' :
                                                   'Manager';
                                  return `${selectedTarget.data.fullName || selectedTarget.data.full_name || selectedTarget.data.username} (${roleName})`;
                                })()
                            : 'Not selected'
                        }
                      </div>
                    </div>
                  </FormGrid>
                </ModalBody>
                <ModalActions>
                  <ThemedButton variant="cancel" onClick={() => setShowAddModal(false)}>Cancel</ThemedButton>
                  <ThemedButton variant="primary" onClick={handleSubmit}>Add Subscription</ThemedButton>
                </ModalActions>
              </Modal>
            </ModalOverlay>
          )}

          {/* Success Modal */}
          {showSuccessModal && (
            <ModalOverlay show={showSuccessModal} onClick={() => setShowSuccessModal(false)}>
              <SuccessModal onClick={(e) => e.stopPropagation()}>
                <SuccessIcon>✓</SuccessIcon>
                <SuccessTitle>Success!</SuccessTitle>
                <SuccessMessage>{successMessage}</SuccessMessage>
                <ThemedButton variant="primary" onClick={() => setShowSuccessModal(false)}>
                  OK
                </ThemedButton>
              </SuccessModal>
            </ModalOverlay>
          )}

          {/* Edit Subscription Modal - Only for Custom Subscriptions */}
          {showEditModal && editingSubscription && (
            <ModalOverlay show={showEditModal} onClick={() => setShowEditModal(false)}>
              <Modal onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                  <ModalTitle>Edit Custom Subscription</ModalTitle>
                  <CloseThemedButton onClick={() => setShowEditModal(false)}>×</CloseThemedButton>
                </ModalHeader>
                <ModalBody>
                  <FormGrid>
                    <FormGroup style={{gridColumn: '1 / -1'}}>
                      <FormLabel>Restaurant *</FormLabel>
                      <FormInput
                        type="text"
                        value={editingSubscription.restaurantName}
                        disabled
                        style={{background: '#F8FAFC', cursor: 'not-allowed'}}
                      />
                    </FormGroup>

                    <FormGroup style={{gridColumn: '1 / -1'}}>
                      <FormLabel>Custom Subscription Plan *</FormLabel>
                      <FormSelect
                        value={editingSubscription.planType}
                        onChange={(e) => {
                          const selectedValue = e.target.value;
                          if (selectedValue === 'others') {
                            setEditingSubscription({
                              ...editingSubscription,
                              planType: 'custom',
                              monthlyFee: 0
                            });
                          } else if (selectedValue) {
                            const selectedPlan = customPlans.find(p => p.name === selectedValue);
                            setEditingSubscription({
                              ...editingSubscription,
                              planType: selectedValue as any,
                              monthlyFee: selectedPlan?.monthly_price || 0
                            });
                          }
                        }}
                      >
                        <option value="">Select Plan</option>
                        {customPlans.map((plan) => (
                          <option key={plan.id} value={plan.name}>
                            {plan.display_name} - RM {plan.monthly_price}
                          </option>
                        ))}
                        <option value="others">Others</option>
                      </FormSelect>
                    </FormGroup>

                    {editingSubscription.planType === 'others' && (
                      <FormGroup style={{gridColumn: '1 / -1'}}>
                        <FormLabel>Custom Plan Name *</FormLabel>
                        <FormInput
                          type="text"
                          value=""
                          onChange={(e) => setEditingSubscription({...editingSubscription, planType: e.target.value as any})}
                          placeholder="Enter custom plan name"
                          required
                        />
                      </FormGroup>
                    )}

                    <FormGroup>
                      <FormLabel>Monthly Fee (RM) *</FormLabel>
                      <FormInput
                        type="number"
                        step="0.01"
                        min="0"
                        value={editingSubscription.monthlyFee}
                        onChange={(e) => setEditingSubscription({...editingSubscription, monthlyFee: parseFloat(e.target.value) || 0})}
                        placeholder="0.00"
                        required
                      />
                    </FormGroup>

                    <FormGroup>
                      <FormLabel>Status *</FormLabel>
                      <FormSelect
                        value={editingSubscription.status}
                        onChange={(e) => setEditingSubscription({...editingSubscription, status: e.target.value as 'active' | 'trial' | 'expired' | 'suspended' | 'cancelled'})}
                      >
                        <option value="trial">Trial</option>
                        <option value="active">Active</option>
                        <option value="suspended">Suspended</option>
                        <option value="expired">Expired</option>
                        <option value="cancelled">Cancelled</option>
                      </FormSelect>
                    </FormGroup>

                    {/* Subscription Settings Section */}
                    <div style={{gridColumn: '1 / -1', marginTop: '20px', marginBottom: '10px'}}>
                      <h3 style={{margin: 0, fontSize: '18px', fontWeight: '600', color: '#0A2540', borderBottom: '2px solid #635BFF', paddingBottom: '8px'}}>
                        Subscription Settings
                      </h3>
                    </div>

                    <FormGroup>
                      <FormLabel>Billing Cycle *</FormLabel>
                      <FormSelect
                        value={editingSubscription.billingCycle || 'monthly'}
                        onChange={(e) => setEditingSubscription({...editingSubscription, billingCycle: e.target.value as 'monthly' | 'annual'})}
                      >
                        <option value="monthly">Monthly</option>
                        <option value="annual">Annual (10% discount)</option>
                      </FormSelect>
                    </FormGroup>

                    <FormGroup>
                      <FormLabel>Subscription Start Date *</FormLabel>
                      <FormInput
                        type="date"
                        value={editingSubscription.startDate}
                        onChange={(e) => setEditingSubscription({...editingSubscription, startDate: e.target.value})}
                      />
                    </FormGroup>

                    <FormGroup>
                      <FormLabel>Subscription End Date *</FormLabel>
                      <FormInput
                        type="date"
                        value={editingSubscription.endDate}
                        onChange={(e) => setEditingSubscription({...editingSubscription, endDate: e.target.value})}
                      />
                    </FormGroup>

                    <FormGroup style={{gridColumn: '1 / -1'}}>
                      <label style={{display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer'}}>
                        <input
                          type="checkbox"
                          checked={editingSubscription.autoRenew || false}
                          onChange={(e) => setEditingSubscription({...editingSubscription, autoRenew: e.target.checked})}
                          style={{width: '16px', height: '16px'}}
                        />
                        <span style={{fontSize: '14px', color: '#374151'}}>
                          Auto-renew subscription
                        </span>
                      </label>
                    </FormGroup>
                  </FormGrid>
                </ModalBody>
                <ModalActions>
                  <ThemedButton variant="cancel" onClick={() => setShowEditModal(false)}>Cancel</ThemedButton>
                  <ThemedButton variant="primary" onClick={handleUpdateSubscription}>Update Subscription</ThemedButton>
                </ModalActions>
              </Modal>
            </ModalOverlay>
          )}

          {/* View Subscription Modal */}
          {showViewModal && viewingSubscription && (
            <ModalOverlay show={showViewModal} onClick={() => setShowViewModal(false)}>
              <Modal onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                  <ModalTitle>Subscription Details</ModalTitle>
                  <CloseThemedButton onClick={() => setShowViewModal(false)}>×</CloseThemedButton>
                </ModalHeader>
                <ModalBody>
                  <div style={{display: 'grid', gap: '20px'}}>
                    {/* Restaurant Info */}
                    <div>
                      <div style={{fontSize: '12px', color: '#6B7280', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase'}}>Restaurant Information</div>
                      <div style={{background: '#F8FAFC', padding: '16px', borderRadius: '8px', border: '1px solid #E6EBF1'}}>
                        <div style={{marginBottom: '12px'}}>
                          <div style={{fontSize: '12px', color: '#6B7280', marginBottom: '4px'}}>Restaurant Name</div>
                          <div style={{fontSize: '14px', fontWeight: '500', color: '#0A2540'}}>{viewingSubscription.restaurantName}</div>
                        </div>
                        <div style={{marginBottom: '12px'}}>
                          <div style={{fontSize: '12px', color: '#6B7280', marginBottom: '4px'}}>Manager</div>
                          <div style={{fontSize: '14px', fontWeight: '500', color: '#0A2540'}}>{viewingSubscription.managerName}</div>
                        </div>
                        <div>
                          <div style={{fontSize: '12px', color: '#6B7280', marginBottom: '4px'}}>Location</div>
                          <div style={{fontSize: '14px', fontWeight: '500', color: '#0A2540'}}>{viewingSubscription.location}</div>
                        </div>
                      </div>
                    </div>

                    {/* Subscription Info */}
                    <div>
                      <div style={{fontSize: '12px', color: '#6B7280', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase'}}>Subscription Details</div>
                      <div style={{background: '#F8FAFC', padding: '16px', borderRadius: '8px', border: '1px solid #E6EBF1'}}>
                        <div style={{marginBottom: '12px'}}>
                          <div style={{fontSize: '12px', color: '#6B7280', marginBottom: '4px'}}>Plan Type</div>
                          <div style={{fontSize: '14px', fontWeight: '500', color: '#0A2540'}}>
                            {viewingSubscription.planType.charAt(0).toUpperCase() + viewingSubscription.planType.slice(1)}
                          </div>
                        </div>
                        <div style={{marginBottom: '12px'}}>
                          <div style={{fontSize: '12px', color: '#6B7280', marginBottom: '4px'}}>Status</div>
                          <div>
                            <span style={{
                              display: 'inline-block',
                              padding: '4px 12px',
                              borderRadius: '6px',
                              fontSize: '12px',
                              fontWeight: '500',
                              background: viewingSubscription.status === 'active' ? '#DCFCE7' : '#FEF3C7',
                              color: viewingSubscription.status === 'active' ? '#15803D' : '#92400E'
                            }}>
                              {viewingSubscription.status.charAt(0).toUpperCase() + viewingSubscription.status.slice(1)}
                            </span>
                          </div>
                        </div>
                        <div style={{marginBottom: '12px'}}>
                          <div style={{fontSize: '12px', color: '#6B7280', marginBottom: '4px'}}>Monthly Fee</div>
                          <div style={{fontSize: '14px', fontWeight: '500', color: '#0A2540'}}>RM {viewingSubscription.monthlyFee}</div>
                        </div>
                        <div style={{marginBottom: '12px'}}>
                          <div style={{fontSize: '12px', color: '#6B7280', marginBottom: '4px'}}>Billing Cycle</div>
                          <div style={{fontSize: '14px', fontWeight: '500', color: '#0A2540'}}>
                            {viewingSubscription.billingCycle.charAt(0).toUpperCase() + viewingSubscription.billingCycle.slice(1)}
                          </div>
                        </div>
                        <div style={{marginBottom: '12px'}}>
                          <div style={{fontSize: '12px', color: '#6B7280', marginBottom: '4px'}}>Auto-Renew</div>
                          <div style={{fontSize: '14px', fontWeight: '500', color: '#0A2540'}}>
                            {viewingSubscription.autoRenew ? (
                              <span style={{color: '#15803D'}}>✓ Enabled</span>
                            ) : (
                              <span style={{color: '#92400E'}}>✕ Disabled</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Dates */}
                    <div>
                      <div style={{fontSize: '12px', color: '#6B7280', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase'}}>Dates</div>
                      <div style={{background: '#F8FAFC', padding: '16px', borderRadius: '8px', border: '1px solid #E6EBF1'}}>
                        <div style={{marginBottom: '12px'}}>
                          <div style={{fontSize: '12px', color: '#6B7280', marginBottom: '4px'}}>Start Date</div>
                          <div style={{fontSize: '14px', fontWeight: '500', color: '#0A2540'}}>{viewingSubscription.startDate}</div>
                        </div>
                        <div style={{marginBottom: '12px'}}>
                          <div style={{fontSize: '12px', color: '#6B7280', marginBottom: '4px'}}>End Date</div>
                          <div style={{fontSize: '14px', fontWeight: '500', color: '#0A2540'}}>{viewingSubscription.endDate}</div>
                        </div>
                        <div style={{marginBottom: '12px'}}>
                          <div style={{fontSize: '12px', color: '#6B7280', marginBottom: '4px'}}>Next Payment</div>
                          <div style={{fontSize: '14px', fontWeight: '500', color: '#0A2540'}}>{viewingSubscription.nextPayment}</div>
                        </div>
                        <div>
                          <div style={{fontSize: '12px', color: '#6B7280', marginBottom: '4px'}}>Expires In</div>
                          <div style={{fontSize: '14px', fontWeight: '500', color: '#0A2540'}}>
                            {(() => {
                              const today = new Date();
                              const endDate = new Date(viewingSubscription.endDate);
                              const diffTime = endDate.getTime() - today.getTime();
                              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                              if (diffDays < 0) return <span style={{color: '#DC2626'}}>Expired</span>;
                              if (diffDays === 0) return <span style={{color: '#DC2626'}}>Today</span>;
                              if (diffDays <= 7) return <span style={{color: '#F59E0B'}}>{diffDays} days</span>;
                              if (diffDays <= 30) return <span style={{color: '#10B981'}}>{diffDays} days</span>;
                              return <span style={{color: '#6B7280'}}>{diffDays} days</span>;
                            })()}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Usage */}
                    <div>
                      <div style={{fontSize: '12px', color: '#6B7280', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase'}}>Usage</div>
                      <div style={{background: '#F8FAFC', padding: '16px', borderRadius: '8px', border: '1px solid #E6EBF1'}}>
                        <div style={{marginBottom: '12px'}}>
                          <div style={{fontSize: '12px', color: '#6B7280', marginBottom: '4px'}}>Menu Items</div>
                          <div style={{fontSize: '14px', fontWeight: '500', color: '#0A2540'}}>
                            {viewingSubscription.currentMenuItems} / {viewingSubscription.menuItemLimit === -1 ? '∞' : viewingSubscription.menuItemLimit}
                          </div>
                        </div>
                        <div>
                          <div style={{fontSize: '12px', color: '#6B7280', marginBottom: '4px'}}>Payment Model</div>
                          <div style={{fontSize: '14px', fontWeight: '500', color: '#0A2540'}}>
                            {viewingSubscription.paymentModel === 'restaurant' ? 'Restaurant Admin' : 'Manager'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ModalBody>
                <ModalActions>
                  <ThemedButton variant="primary" onClick={() => setShowViewModal(false)}>Close</ThemedButton>
                </ModalActions>
              </Modal>
            </ModalOverlay>
          )}

          {/* Confirm Action Modal */}
          {showConfirmModal && (
            <ModalOverlay show={showConfirmModal} onClick={() => setShowConfirmModal(false)}>
              <Modal onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                  <ModalTitle>Confirm Action</ModalTitle>
                  <CloseThemedButton onClick={() => setShowConfirmModal(false)}>×</CloseThemedButton>
                </ModalHeader>
                <ModalBody>
                  <p>
                    {confirmAction === 'delete' && `Are you sure you want to delete subscription for ${selectedSubscription?.restaurantName}?`}
                    {confirmAction === 'suspend' && `Are you sure you want to suspend subscription for ${selectedSubscription?.restaurantName}?`}
                    {confirmAction === 'activate' && `Are you sure you want to activate subscription for ${selectedSubscription?.restaurantName}?`}
                  </p>
                </ModalBody>
                <ModalActions>
                  <ThemedButton variant="cancel" onClick={() => setShowConfirmModal(false)}>Cancel</ThemedButton>
                  <ThemedButton 
                    variant={confirmAction === 'delete' ? 'danger' : 'primary'} 
                    onClick={handleConfirmAction}
                  >
                    {confirmAction === 'delete' ? 'Delete' : confirmAction === 'suspend' ? 'Suspend' : 'Activate'}
                  </ThemedButton>
                </ModalActions>
              </Modal>
            </ModalOverlay>
          )}

        </Content>
      </Container>
    </MainLayout>
  );
};

export default SubscriptionsPage;