import React, { useState, useEffect } from 'react';
import ConfirmModal from '../../components/ConfirmModal';
import styled from 'styled-components';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import { getRestaurantDisplayName } from '../../utils/restaurantDisplay';
import { formatEntityAddress, AppLocale } from '../../utils/formatAddress';
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
, Modal as CommonModal } from '../../components/UI';
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import DateRangeField from '../../components/Common/DateRangeField';
import SubscriptionFormFields, { type SubscriptionValues, type UserType as SubUserType, type BillingCycle, type PaymentModel, type DiscountType } from '../../components/Subscription/SubscriptionFormFields';
import { getPlanPrice, formatPlanPrice, normalizeCurrencyCode, formatCurrency, getActivePlanCurrencies } from '../../utils/currency';
import { useTranslation } from 'react-i18next';

import { getAuthToken } from '../../utils/auth';
interface RestaurantSubscription {
  id: string;
  restaurantId: string;
  restaurantName: string;
  branchName?: string | null;
  managerId: string;
  managerName: string;
  planType: 'basic' | 'professional' | 'enterprise' | string;
  status: 'active' | 'trial' | 'overdue' | 'expired' | 'suspended' | 'cancelled';
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
  currency?: string;
  discountType: 'none' | 'percentage' | 'fixed';
  discountValue: number;
  discountReason: string;
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
      case 'overdue': return '#FEF9C3';
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
      case 'overdue': return '#CA8A04';
      case 'expired': return '#DC2626';
      case 'suspended': return '#DC2626';
      case 'cancelled': return '#6B7280';
      default: return '#6B7280';
    }
  }};
`;

const PlanBadge = styled.span<{ planType: string }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  background: ${props => {
    const pt = (props.planType || '').toLowerCase();
    if (pt.includes('basic')) return '#DBEAFE';
    if (pt.includes('professional')) return '#E4E7FF';
    if (pt.includes('enterprise')) return '#FEF3C7';
    return '#F3F4F6';
  }};
  color: ${props => {
    const pt = (props.planType || '').toLowerCase();
    if (pt.includes('basic')) return '#1E40AF';
    if (pt.includes('professional')) return '#635BFF';
    if (pt.includes('enterprise')) return '#D97706';
    return '#6B7280';
  }};
`;

const IconSymbol = styled.span`
  font-size: 14px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
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

const SuccessMessage = styled.p`
  color: #6B7280;
  margin: 0 0 20px;
  line-height: 1.5;
`;


const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }

  & > * {
    min-width: 0;
  }
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
  width: 100%;
  box-sizing: border-box;
  min-width: 0;

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
  width: 100%;
  box-sizing: border-box;
  min-width: 0;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const SubscriptionsPage: React.FC = () => {
  const { t, i18n } = useTranslation('admin');
  const [subscriptions, setSubscriptions] = useState<RestaurantSubscription[]>([]);
  const [infoModal, setInfoModal] = useState<{ open: boolean; title: string; message: string }>({ open: false, title: '', message: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedSubscription, setSelectedSubscription] = useState<RestaurantSubscription | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState<'delete' | 'suspend' | 'activate' | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState<RestaurantSubscription | null>(null);
  // Custom plan name input — separate from planType so typing doesn't make the
  // "others" branch disappear (legacy bug: planType was overwritten on first keystroke).
  const [editCustomPlanName, setEditCustomPlanName] = useState('');
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingSubscription, setViewingSubscription] = useState<RestaurantSubscription | null>(null);
  const [newSubscription, setNewSubscription] = useState({
    restaurantId: '',
    managerId: '',
    managerName: '',
    restaurantName: '',
    planType: 'basic' as 'basic' | 'professional' | 'enterprise' | 'custom',
    customPlanName: '',
    status: 'active' as 'active' | 'trial' | 'expired' | 'suspended' | 'cancelled',
    billingCycle: '' as BillingCycle,            // empty by default — user must pick
    paymentModel: 'restaurant' as PaymentModel,
    autoRenew: true,
    email: '',
    phone: '',
    address: '',
    monthlyFee: 0,
    currency: 'MYR',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    treatAsTrial: false,
    activateNow: true,
    discountType: 'none' as DiscountType,
    discountValue: 0,
    discountReason: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [searchResults, setSearchResults] = useState<{managers: any[], restaurants: any[]}>({managers: [], restaurants: []});
  const [selectedTarget, setSelectedTarget] = useState<{type: 'manager' | 'restaurant', data: any} | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [availableRestaurants, setAvailableRestaurants] = useState<any[]>([]);
  const [availableManagers, setAvailableManagers] = useState<any[]>([]);
  const [allRestaurantsData, setAllRestaurantsData] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [customPlans, setCustomPlans] = useState<any[]>([]);
  const [availablePlans, setAvailablePlans] = useState<any[]>([]);
  const [userType, setUserType] = useState<SubUserType>('restaurant');

  useEffect(() => {
    fetchSubscriptions();
    fetchAvailableData();
    fetchCustomPlans();
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await fetch('/api/plans');
      if (response.ok) {
        const plans = await response.json();
        const activePlans = plans.filter((p: any) => p.is_active);
        setAvailablePlans(activePlans);
      }
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  };

  const fetchSubscriptions = async () => {
    try {
      const token = getAuthToken();
      const headers: any = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      // Fetch all data sources in parallel
      const [restaurantsResponse, usersResponse] = await Promise.all([
        fetch('/api/restaurants', { headers }),
        fetch('/api/users', { headers })
      ]);

      const restaurantsData = restaurantsResponse.ok ? await restaurantsResponse.json() : [];
      const usersData = usersResponse.ok ? await usersResponse.json() : [];
      const restaurants = Array.isArray(restaurantsData) ? restaurantsData : [];
      const users = Array.isArray(usersData) ? usersData : (usersData.data || []);

      setAllRestaurantsData(restaurants);

      const allSubs: RestaurantSubscription[] = [];

      // 1. Restaurant subscriptions
      restaurants.forEach((restaurant: any, index: number) => {
        const planType = restaurant.planType || restaurant.plan_type || 'Basic Plan';
        let subscriptionStatus: 'active' | 'trial' | 'expired' | 'suspended' | 'cancelled' = 'active';
        if (restaurant.status === 'trial') subscriptionStatus = 'trial';
        else if (restaurant.status === 'active') subscriptionStatus = 'active';
        else if (restaurant.status === 'overdue') subscriptionStatus = 'expired';
        else if (restaurant.status === 'suspended') subscriptionStatus = 'suspended';
        else if (restaurant.status === 'inactive') subscriptionStatus = 'suspended';
        else if (restaurant.status === 'cancelled') subscriptionStatus = 'cancelled';

        allSubs.push({
          id: `sub-rest-${restaurant.id}`,
          restaurantId: restaurant.id?.toString() || `rest-${index}`,
          restaurantName: restaurant.name || 'Restaurant Name',
          branchName: restaurant.branch_name || null,
          currency: restaurant.currency || 'MYR',
          managerId: (restaurant.managerId || restaurant.admin_id)?.toString() || '',
          managerName: `${restaurant.admin?.username || restaurant.managerId || ''} • ${restaurant.admin?.email || restaurant.managerName || restaurant.admin_name || 'No Manager Assigned'}`,
          planType,
          status: subscriptionStatus,
          startDate: (restaurant.subscriptionStart || restaurant.subscription_start) ? new Date(restaurant.subscriptionStart || restaurant.subscription_start).toISOString().split('T')[0] : '',
          endDate: (restaurant.subscriptionEnd || restaurant.subscription_end) ? new Date(restaurant.subscriptionEnd || restaurant.subscription_end).toISOString().split('T')[0] : '',
          monthlyFee: parseFloat(restaurant.planAmount || restaurant.plan_amount) || 0,
          billingCycle: (restaurant.billingCycle || restaurant.billing_cycle || 'monthly') as 'monthly' | 'annual',
          paymentModel: 'restaurant' as any,
          payerId: (restaurant.managerId || restaurant.admin_id)?.toString() || '',
          payerName: restaurant.managerName || restaurant.admin_name || '',
          menuItemLimit: restaurant.menu_item_limit || 50,
          currentMenuItems: 0,
          features: [],
          lastPayment: '',
          nextPayment: (restaurant.subscriptionEnd || restaurant.subscription_end) ? new Date(restaurant.subscriptionEnd || restaurant.subscription_end).toISOString().split('T')[0] : '',
          autoRenew: restaurant.auto_renew !== undefined ? restaurant.auto_renew : true,
          location: restaurant.address || '',
          discountType: restaurant.discount_type || 'none',
          discountValue: parseFloat(restaurant.discount_value) || 0,
          discountReason: restaurant.discount_reason || '',
          entityType: 'restaurant',
          isDemo: restaurant.is_demo || false,
          isTest: restaurant.is_test || false
        } as any);
      });

      // 2. User-based subscriptions (Brand/Foodcourt General + Manager + Restaurant Owner + Supplier Admin)
      users.filter((u: any) => ['Brand General', 'Brand Manager', 'Foodcourt General', 'Foodcourt Manager', 'Restaurant Owner', 'Supplier Admin'].includes(u.role)).forEach((u: any) => {
        let planType = '';
        let planAmount = 0;
        let billingCycle = 'monthly';
        let currency = 'MYR';
        let subStatus = 'active';
        let subStart = '';
        let subEnd = '';

        // 모든 user-based role 은 user 테이블의 plan_type/plan_amount/... 직접 사용 (통일).
        // Brand 의 brand_plan_* / Foodcourt 의 fc_plan_* 컬럼은 legacy fallback 으로만.
        planType = u.plan_type || u.brand_plan_type || u.fc_plan_type || '';
        planAmount = parseFloat(u.plan_amount || u.brand_plan_amount || u.fc_plan_amount) || 0;
        billingCycle = u.billing_cycle || u.brand_billing_cycle || u.fc_billing_cycle || 'monthly';
        currency = u.currency || u.brand_currency || u.fc_currency || 'MYR';
        subStatus = u.subscription_status || u.brand_subscription_status || u.fc_subscription_status || 'active';
        subStart = u.subscription_start || u.brand_subscription_start || u.fc_subscription_start || '';
        subEnd = u.subscription_end || u.brand_subscription_end || u.fc_subscription_end || '';

        if (!planType) return; // No plan assigned, skip

        allSubs.push({
          id: `sub-user-${u.id}`,
          restaurantId: u.id?.toString(),
          restaurantName: u.full_name || u.username,
          currency,
          managerId: u.id?.toString(),
          managerName: `${u.username} • ${u.email}`,
          planType,
          status: (subStatus || 'active') as any,
          startDate: subStart ? new Date(subStart).toISOString().split('T')[0] : '',
          endDate: subEnd ? new Date(subEnd).toISOString().split('T')[0] : '',
          monthlyFee: planAmount,
          billingCycle: billingCycle as 'monthly' | 'annual',
          paymentModel: 'manager' as any,
          payerId: u.id?.toString(),
          payerName: u.full_name || u.username,
          menuItemLimit: 0,
          currentMenuItems: 0,
          features: [],
          lastPayment: '',
          nextPayment: subEnd ? new Date(subEnd).toISOString().split('T')[0] : '',
          autoRenew: true,
          location: u.address || '',
          discountType: 'none',
          discountValue: 0,
          discountReason: '',
          entityType: u.role.includes('Brand') ? 'brand' : u.role.includes('Foodcourt') ? 'foodcourt' : u.role === 'Supplier Admin' ? 'supplier' : 'owner',
          userRole: u.role,
          isDemo: u.is_demo || false,
          isTest: u.is_test || false
        } as any);
      });

      setSubscriptions(allSubs);

    } catch (error) {
      console.error('❌ Error fetching subscriptions:', error);
      setSubscriptions([]);
    }
  };

  const fetchAvailableData = async () => {
    try {
      const token = getAuthToken();
      const headers: HeadersInit = token ? { 'Authorization': `Bearer ${token}` } : {};

      const restaurantsResponse = await fetch('/api/restaurants', { headers });
      const usersResponse = await fetch('/api/users?role=Manager', { headers });

      if (restaurantsResponse.ok && usersResponse.ok) {
        const restaurantsData = await restaurantsResponse.json();
        const usersData = await usersResponse.json();

        const restaurants = Array.isArray(restaurantsData) ? restaurantsData : (restaurantsData.data || []);
        const managers = Array.isArray(usersData) ? usersData : (usersData.data || []);

        setAvailableRestaurants(restaurants);
        setAvailableManagers(managers);
        setAllRestaurantsData(restaurants);
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

  const [filterEntityType, setFilterEntityType] = useState<'all' | 'restaurant' | 'brand' | 'foodcourt' | 'owner'>('all');

  const filteredSubscriptions = subscriptions.filter(subscription => {
    const matchesSearch = subscription.restaurantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subscription.managerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subscription.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || subscription.status === filterStatus;
    const entityType = (subscription as any).entityType || 'restaurant';
    const matchesEntity = filterEntityType === 'all' || entityType === filterEntityType;
    return matchesSearch && matchesFilter && matchesEntity;
  });

  const totalSubscriptions = subscriptions.length;
  const activeSubscriptions = subscriptions.filter(s => s.status === 'active').length;
  const trialSubscriptions = subscriptions.filter(s => s.status === 'trial').length;
  const totalRevenue = subscriptions.filter(s => s.status === 'active').reduce((sum, s) => sum + s.monthlyFee, 0);

  const handleAddSubscription = () => {
    // Get first available plan for current user type
    const filteredPlans = availablePlans.filter(p => p.plan_target === userType);
    const firstPlan = filteredPlans.length > 0 ? filteredPlans[0] : null;

    // Reset form with appropriate defaults — keep all v3.27 unified fields
    setNewSubscription({
      restaurantId: '',
      managerId: '',
      managerName: '',
      restaurantName: '',
      planType: 'custom',
      customPlanName: firstPlan ? firstPlan.display_name : '',
      status: 'active',
      billingCycle: '',                 // empty default — user must pick
      currency: 'MYR',
      paymentModel: userType === 'brand' ? 'brand_manager' : userType === 'foodcourt' ? 'foodcourt_manager' : 'restaurant',
      autoRenew: true,
      email: '',
      phone: '',
      address: '',
      monthlyFee: firstPlan ? getPlanPrice(firstPlan, 'MYR') : 0,
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      treatAsTrial: false,
      activateNow: true,
      discountType: 'none',
      discountValue: 0,
      discountReason: ''
    });

    setSelectedTarget(null);
    setSearchQuery('');

    setShowAddModal(true);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setShowSearchDropdown(true);

    // Filter managers by userType — 구독 대상은 General + Owner + Supplier Admin (SUBSCRIBING_ROLES).
    // Manager 들(Brand Manager, Foodcourt Manager)은 산하 사용자라 own subscription 없음 — 검색 결과에서 제외.
    // 이미 plan_type 있는 user 도 제외 — 중복 등록 방지 (변경하려면 list 에서 Edit).
    const hasActiveSubscription = (m: any) =>
      !!(m.plan_type || m.brand_plan_type || m.fc_plan_type);
    const roleFilter = (manager: any) => {
      if (hasActiveSubscription(manager)) return false;
      if (userType === 'brand') {
        return manager.role === 'Brand General';
      } else if (userType === 'foodcourt') {
        return manager.role === 'Foodcourt General';
      } else if (userType === 'owner') {
        return manager.role === 'Restaurant Owner';
      } else if (userType === 'supplier') {
        return manager.role === 'Supplier Admin';
      }
      return true;
    };

    const typeFilteredManagers = availableManagers.filter(roleFilter);

    if (query.length < 1) {
      setSearchResults({
        managers: typeFilteredManagers.slice(0, 10),
        restaurants: allRestaurantsData.slice(0, 10)
      });
      return;
    }

    const filteredManagers = typeFilteredManagers.filter(manager =>
      (manager.fullName && manager.fullName.toLowerCase().includes(query.toLowerCase())) ||
      (manager.full_name && manager.full_name.toLowerCase().includes(query.toLowerCase())) ||
      (manager.username && manager.username.toLowerCase().includes(query.toLowerCase())) ||
      (manager.email && manager.email.toLowerCase().includes(query.toLowerCase()))
    );

    const filteredRestaurants = allRestaurantsData.filter(restaurant =>
      (restaurant.name && restaurant.name.toLowerCase().includes(query.toLowerCase())) ||
      (restaurant.address && restaurant.address.toLowerCase().includes(query.toLowerCase()))
    );

    setSearchResults({
      managers: filteredManagers.slice(0, 10),
      restaurants: filteredRestaurants.slice(0, 10)
    });
  };

  const selectTarget = (type: 'manager' | 'restaurant', data: any) => {
    setSelectedTarget({type, data});
    setShowSearchDropdown(false);
    setSearchQuery(type === 'manager' ? (data.fullName || data.full_name || data.username) : data.name);

    // Auto-determine payment model based on target type
    let paymentModel: 'restaurant' | 'foodcourt_manager' | 'brand_manager' | 'restaurant_owner' = 'restaurant';
    if (type === 'manager') {
      // Check manager role
      if (data.role === 'Restaurant Owner') {
        paymentModel = 'restaurant_owner';
      } else if (data.role === 'Foodcourt Manager' || data.role === 'Foodcourt General') {
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
      const manager = availableManagers.find((m: any) => m.id?.toString() === restaurant.admin_id?.toString());
      setNewSubscription({
        ...newSubscription,
        restaurantId: restaurant.id?.toString() || '',
        restaurantName: restaurant.name || '',
        managerId: restaurant.admin_id?.toString() || '',
        managerName: manager ? (manager.fullName || manager.full_name || manager.username) : 'No Manager Assigned',
        email: restaurant.email || '',
        phone: restaurant.phone || '',
        address: restaurant.address || '',
        paymentModel: 'restaurant'
      });
    }
  };

  const handleEditSubscription = (subscription: RestaurantSubscription) => {
    // planType이 availablePlans에 없으면 사용자 정의 plan으로 간주 — 입력란에 prefill.
    const matchedPlan = availablePlans.find(
      p => p.plan_target === 'restaurant' && p.display_name === subscription.planType
    );
    if (!matchedPlan && subscription.planType) {
      setEditingSubscription({ ...subscription, planType: 'custom' });
      setEditCustomPlanName(subscription.planType);
    } else {
      setEditingSubscription(subscription);
      setEditCustomPlanName('');
    }
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
        managerId: selectedRestaurant.admin_id?.toString() || '',
        managerName: selectedRestaurant.admin_name || selectedRestaurant.managerName || 'No Manager Assigned',
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
    // Find matching plan from availablePlans
    const selectedPlan = availablePlans.find(p => p.display_name === newSubscription.customPlanName);
    const cur = normalizeCurrencyCode(selectedTarget?.data?.currency || 'MYR');
    const price = selectedPlan ? getPlanPrice(selectedPlan, cur, cycle) : newSubscription.monthlyFee;

    setNewSubscription({
      ...newSubscription,
      billingCycle: cycle,
      monthlyFee: price
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
        setInfoModal({ open: true, title: 'Required Field', message: 'Please select a manager or restaurant.' });
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

      const planName = newSubscription.customPlanName || 'Custom Plan';
      const dueDate = new Date(new Date(newSubscription.startDate).getTime() + 14*24*60*60*1000).toISOString().split('T')[0];
      const payerType = selectedTarget.type === 'restaurant' ? 'restaurant' :
                selectedTarget.data.role === 'Restaurant Owner' ? 'restaurant_owner' :
                selectedTarget.data.role?.includes('Foodcourt') ? 'foodcourt_manager' :
                selectedTarget.data.role?.includes('Brand') ? 'brand_manager' : 'restaurant';

      const invoicePayload = {
        invoice_data: {
          restaurant_id: selectedTarget.type === 'restaurant' ? selectedTarget.data.id : null,
          due_date: dueDate,
          total_amount: newSubscription.monthlyFee,
          currency: 'MYR',
          status: 'pending_payment',
          type: 'manual',
          issuer_type: 'system_admin',
          issuer_id: null,
          payer_type: payerType,
          payer_id: selectedTarget.type === 'manager' ? selectedTarget.data.id : (selectedTarget.data.admin_id || null),
          invoice_category: 'subscription',
          category_display_name: `Subscription - ${planName}`,
          billing_period_start: newSubscription.startDate,
          billing_period_end: newSubscription.endDate || dueDate,
          notes: `POS Subscription: ${planName} (${newSubscription.billingCycle})`
        },
        items: [{
          item_type: 'subscription',
          description: `${planName} - ${newSubscription.billingCycle === 'annual' ? 'Annual' : 'Monthly'} Subscription`,
          calculation_method: 'fixed',
          fixed_amount: newSubscription.monthlyFee,
          calculated_amount: newSubscription.monthlyFee,
          tax_rate: 0,
          tax_amount: 0,
          total_amount: newSubscription.monthlyFee
        }]
      };

      // Update entity subscription data based on target type
      const authToken = getAuthToken();
      const authHeaders = {
        'Content-Type': 'application/json',
        ...(authToken ? { 'Authorization': `Bearer ${authToken}` } : {})
      };

      if (selectedTarget.type === 'restaurant' && selectedTarget.data.id) {
        const restaurantUpdateData = {
          plan_type: newSubscription.customPlanName || 'Custom Plan',
          plan_amount: newSubscription.monthlyFee,
          billing_cycle: newSubscription.billingCycle,
          currency: newSubscription.currency || 'MYR',
          subscription_start: newSubscription.startDate,
          subscription_end: newSubscription.endDate,
          status: newSubscription.status,
          auto_renew: newSubscription.autoRenew,
          // v3.27 unified subscription form fields
          discount_type: newSubscription.discountType || 'none',
          discount_value: newSubscription.discountValue || 0,
          discount_reason: newSubscription.discountReason || null
        };

        const restaurantResponse = await fetch(`/api/restaurants/${selectedTarget.data.id}`, {
          method: 'PUT',
          headers: authHeaders,
          body: JSON.stringify(restaurantUpdateData)
        });

        if (!restaurantResponse.ok) {
          throw new Error('Failed to update restaurant subscription');
        }
      } else if (selectedTarget.type === 'manager' && selectedTarget.data.id) {
        const role = selectedTarget.data.role || '';
        const subscriptionData: any = {
          plan_type: newSubscription.planType || newSubscription.customPlanName || 'Custom Plan',
          plan_amount: parseFloat(String(newSubscription.monthlyFee)) || 0,
          billing_cycle: newSubscription.billingCycle || 'monthly',
          currency: newSubscription.currency || 'MYR',
          subscription_status: newSubscription.status === 'trial' ? 'trial' : 'active',
          subscription_start: newSubscription.startDate,
          subscription_end: newSubscription.endDate,
          auto_renew: newSubscription.autoRenew,
          // v3.27 unified subscription form fields
          discount_type: newSubscription.discountType || 'none',
          discount_value: newSubscription.discountValue || 0,
          discount_reason: newSubscription.discountReason || null
        };

        // Brand General / Foodcourt General / Restaurant Owner / Supplier Admin 모두 User 자체에 구독 저장.
        // Brand/Foodcourt entity 의 subscription 은 별도 (entity 운영용 — 여기선 user 단위 통합).
        if (['Brand General', 'Brand Manager', 'Foodcourt General', 'Foodcourt Manager', 'Restaurant Owner', 'Supplier Admin'].includes(role)) {
          const resp = await fetch(`/api/users/${selectedTarget.data.id}`, {
            method: 'PUT',
            headers: authHeaders,
            body: JSON.stringify(subscriptionData)
          });
          if (!resp.ok) {
            const err = await resp.json().catch(() => ({}));
            throw new Error(err.message || err.error?.message || `Failed to update ${role} subscription`);
          }

          // entity (Brand/Foodcourt) 에도 동기화 — entity 연결 있을 때만
          const entityId = role.includes('Brand') ? selectedTarget.data.brand_id : selectedTarget.data.foodcourt_id;
          if (entityId && (role.includes('Brand') || role.includes('Foodcourt'))) {
            const entityPath = role.includes('Brand') ? `brands` : `foodcourts`;
            await fetch(`/api/${entityPath}/${entityId}/subscription`, {
              method: 'PUT',
              headers: authHeaders,
              body: JSON.stringify(subscriptionData)
            }).catch(() => {});  // entity sync 는 best-effort
          }
        }
      }

      // Create invoice via API
      const token = getAuthToken();
      const invoiceResponse = await fetch('/api/invoices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(invoicePayload)
      });

      if (!invoiceResponse.ok) {
        const errData = await invoiceResponse.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errData.error || 'Failed to create invoice');
      }

      console.log('Subscription and invoice created:', subscriptionData);

      setShowAddModal(false);
      setSuccessMessage('Subscription added and invoice generated successfully!');
      setShowSuccessModal(true);

      await fetchSubscriptions();
    } catch (error) {
      console.error('Error adding subscription:', error);
      setInfoModal({ open: true, title: 'Add Failed', message: 'Error adding subscription. Please try again.' });
    }
  };

  const handleUpdateSubscription = async () => {
    if (!editingSubscription) return;

    try {
      console.log('🔄 Updating subscription:', editingSubscription);

      // Use the plan name as-is (display_name from PlanTemplate).
      // For "others"/custom plans, the user-typed name lives in editCustomPlanName.
      const planName = editingSubscription.planType === 'custom'
        ? (editCustomPlanName || 'Custom Plan')
        : (editingSubscription.planType || 'Custom Plan');

      const updateData = {
        name: editingSubscription.restaurantName,
        managerId: editingSubscription.managerId || null,
        planType: planName,
        plan_type: planName,
        planAmount: editingSubscription.monthlyFee,
        plan_amount: editingSubscription.monthlyFee,
        status: editingSubscription.status === 'active' ? 'active' : 'inactive',
        subscriptionStart: editingSubscription.startDate,
        subscriptionEnd: editingSubscription.endDate,
        subscription_start: editingSubscription.startDate,
        subscription_end: editingSubscription.endDate,
        discount_type: editingSubscription.discountType || 'none',
        discount_value: editingSubscription.discountValue || 0,
        discount_reason: editingSubscription.discountReason || null
      };

      console.log('📤 Sending update data:', updateData);

      const token = getAuthToken();
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };

      // Update subscription based on entity type
      const entityType = (editingSubscription as any).entityType;
      let apiUrl = `/api/restaurants/${editingSubscription.restaurantId}`;
      let apiBody = updateData;

      if (entityType === 'brand' || entityType === 'foodcourt' || entityType === 'owner') {
        // For Brand/FC/Owner: update via /api/users/:id
        apiUrl = `/api/users/${editingSubscription.restaurantId}`;
        apiBody = {
          plan_type: planName,
          plan_amount: editingSubscription.monthlyFee,
          billing_cycle: (editingSubscription as any).billingCycle || 'monthly',
          currency: (editingSubscription as any).currency || 'MYR',
          subscription_start: editingSubscription.startDate,
          subscription_end: editingSubscription.endDate,
          subscription_status: editingSubscription.status
        } as any;
      }

      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers,
        body: JSON.stringify(apiBody)
      });

      console.log('📡 Subscription update API response status:', response.status);

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Subscription updated successfully:', result);

        setShowEditModal(false);
        setEditingSubscription(null);

        console.log('🔄 Re-fetching subscription data...');
        await fetchSubscriptions();

        setSuccessMessage('Subscription updated successfully!');
        setShowSuccessModal(true);

        console.log('✅ Modal closed and data refreshed');
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('❌ Failed to update subscription:', errorData);
        setInfoModal({ open: true, title: 'Update Failed', message: `Error updating subscription: ${errorData.error || 'Please try again.'}` });
      }
    } catch (error) {
      console.error('❌ Error updating subscription:', error);
      setInfoModal({ open: true, title: 'Update Failed', message: 'Error updating subscription. Please check your connection and try again.' });
    }
  };

  const handleConfirmAction = async () => {
    if (!selectedSubscription || !confirmAction) return;

    try {
      const token = getAuthToken();
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      };

      if (confirmAction === 'delete') {
        // Delete subscription - actually deletes the restaurant
        console.log('Deleting subscription:', selectedSubscription.id, 'restaurantId:', selectedSubscription.restaurantId);

        const response = await fetch(`/api/restaurants/${selectedSubscription.restaurantId}`, {
          method: 'DELETE',
          headers
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
          throw new Error(errorData.error || 'Failed to delete subscription');
        }

        setSuccessMessage('Subscription deleted successfully');
      } else if (confirmAction === 'suspend') {
        // Suspend subscription
        const response = await fetch(`/api/restaurants/${selectedSubscription.restaurantId}`, {
          method: 'PUT',
          headers,
          body: JSON.stringify({ status: 'suspended' })
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
          throw new Error(errorData.error || 'Failed to suspend subscription');
        }

        setSuccessMessage('Subscription suspended successfully');
      } else if (confirmAction === 'activate') {
        // Activate subscription - set status to active
        const response = await fetch(`/api/restaurants/${selectedSubscription.restaurantId}`, {
          method: 'PUT',
          headers,
          body: JSON.stringify({ status: 'active' })
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
          throw new Error(errorData.error || 'Failed to activate subscription');
        }

        setSuccessMessage('Subscription activated successfully');
      }

      setShowSuccessModal(true);
      await fetchSubscriptions();
    } catch (error: any) {
      console.error('Action failed:', error);
      setInfoModal({ open: true, title: 'Action Failed', message: `Action failed: ${error.message || 'Unknown error'}. Please try again.` });
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
    <>
      <Container>
        <Header>
          <Title>{t('admin:subscriptionsPage.subscriptions')}</Title>
          <ActionSection>
            <ThemedButton variant="outline" onClick={handleExportData}>{t('admin:subscriptionsPage.export')}</ThemedButton>
            <ThemedButton variant="primary" onClick={handleAddSubscription}>{t('admin:subscriptionsPage.addSubscription')}</ThemedButton>
          </ActionSection>
        </Header>
        
        <Content>
          <StatsGrid>
            <StatCard color="#059669">
              <StatValue>{totalSubscriptions}</StatValue>
              <StatLabel>{t('admin:subscriptionsPage.totalSubscriptions')}</StatLabel>
              <StatDescription>{t('admin:subscriptionsPage.acrossAllRestaurants')}</StatDescription>
            </StatCard>
            <StatCard color="#2563EB">
              <StatValue>{activeSubscriptions}</StatValue>
              <StatLabel>{t('admin:subscriptionsPage.activeSubscriptions')}</StatLabel>
              <StatDescription>{totalSubscriptions > 0 ? Math.round((activeSubscriptions/totalSubscriptions)*100) : 0}% operational</StatDescription>
            </StatCard>
            <StatCard color="#7C3AED">
              <StatValue>{trialSubscriptions}</StatValue>
              <StatLabel>{t('admin:subscriptionsPage.trialSubscriptions')}</StatLabel>
              <StatDescription>{t('admin:subscriptionsPage.currentlyEvaluating')}</StatDescription>
            </StatCard>
            <StatCard color="#D97706">
              <StatValue>RM {totalRevenue.toLocaleString()}</StatValue>
              <StatLabel>{t('admin:subscriptionsPage.monthlyRevenue')}</StatLabel>
              <StatDescription>{t('admin:subscriptionsPage.fromActiveSubscriptions')}</StatDescription>
            </StatCard>
          </StatsGrid>

          <FilterBar>
            <FilterSelect
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">{t('admin:subscriptionsPage.allStatus')}</option>
              <option value="active">{t('admin:subscriptionsPage.active')}</option>
              <option value="trial">{t('admin:subscriptionsPage.trial')}</option>
              <option value="expired">{t('admin:subscriptionsPage.expired')}</option>
              <option value="suspended">{t('admin:subscriptionsPage.suspended')}</option>
              <option value="cancelled">{t('admin:subscriptionsPage.cancelled')}</option>
            </FilterSelect>

            <FilterSelect
              value={filterEntityType}
              onChange={(e) => setFilterEntityType(e.target.value as any)}
            >
              <option value="all">{t('admin:subscriptionsPage.allTypes')}</option>
              <option value="restaurant">{t('admin:subscriptionsPage.restaurant')}</option>
              <option value="brand">{t('admin:subscriptionsPage.brandGeneral')}</option>
              <option value="foodcourt">{t('admin:subscriptionsPage.foodcourtGeneral')}</option>
              <option value="owner">{t('admin:subscriptionsPage.restaurantOwner')}</option>
            </FilterSelect>

            <SearchInput
              placeholder="Search subscriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </FilterBar>

          <Table>
            <SubscriptionTableHeader columns="2.5fr 1.3fr 0.8fr 1fr 1fr 0.8fr 0.8fr 200px">
              <span className="col-info">{t('admin:subscriptionsPage.subscriber')}</span>
              <span>{t('admin:subscriptionsPage.plan')}</span>
              <span>{t('admin:subscriptionsPage.status')}</span>
              <span>{t('admin:subscriptionsPage.menuItems')}</span>
              <span className="col-fee">{t('admin:subscriptionsPage.monthlyFee')}</span>
              <span>{t('admin:subscriptionsPage.expiresIn')}</span>
              <span>{t('admin:subscriptionsPage.autorenew')}</span>
              <span className="col-action">{t('admin:subscriptionsPage.actions')}</span>
            </SubscriptionTableHeader>

            {filteredSubscriptions.map(subscription => (
              <SubscriptionTableRow columns="2.5fr 1.3fr 0.8fr 1fr 1fr 0.8fr 0.8fr 200px" key={subscription.id}>
                <MobileGrid>
                  <MobileValue className="col-info">
                    <MobileLabel>{t('admin:subscriptionsPage.subscriber')}</MobileLabel>
                    <RestaurantInfo>
                      <RestaurantName>
                        {subscription.restaurantName}
                        {subscription.branchName && <span style={{ fontSize: '12px', fontWeight: 500, color: '#6B7C93', background: '#F3F4F6', padding: '1px 8px', borderRadius: '4px', marginLeft: '6px', verticalAlign: 'middle' }}>{subscription.branchName}</span>}
                        {(subscription as any).isDemo && <span style={{ fontSize: '10px', fontWeight: 600, color: '#fff', background: '#F59E0B', padding: '1px 6px', borderRadius: '4px', marginLeft: '6px', verticalAlign: 'middle' }}>{t('admin:subscriptionsPage.demo')}</span>}
                        {(subscription as any).isTest && <span style={{ fontSize: '10px', fontWeight: 600, color: '#fff', background: '#8B5CF6', padding: '1px 6px', borderRadius: '4px', marginLeft: '6px', verticalAlign: 'middle' }}>{t('admin:subscriptionsPage.test')}</span>}
                        {subscription.currency && <span style={{ fontSize: '11px', fontWeight: 500, color: '#635BFF', background: '#F0EDFF', padding: '1px 6px', borderRadius: '4px', marginLeft: '6px', verticalAlign: 'middle' }}>{subscription.currency}</span>}
                        {(subscription as any).entityType && (subscription as any).entityType !== 'restaurant' && (
                          <span style={{ fontSize: '10px', fontWeight: 600, padding: '1px 6px', borderRadius: '4px', marginLeft: '4px', verticalAlign: 'middle',
                            color: (subscription as any).entityType === 'brand' ? '#7C3AED' : (subscription as any).entityType === 'foodcourt' ? '#059669' : '#D97706',
                            background: (subscription as any).entityType === 'brand' ? '#EDE9FE' : (subscription as any).entityType === 'foodcourt' ? '#D1FAE5' : '#FEF3C7'
                          }}>
                            {(subscription as any).entityType === 'brand' ? 'Brand' : (subscription as any).entityType === 'foodcourt' ? 'Foodcourt' : 'Owner'}
                          </span>
                        )}
                      </RestaurantName>
                      <RestaurantMeta>
                        {(subscription as any).userRole
                          ? `${(subscription as any).userRole} • ${subscription.managerName}`
                          : subscription.managerName}
                        {subscription.location ? ` • ${subscription.location}` : ''}
                      </RestaurantMeta>
                    </RestaurantInfo>
                  </MobileValue>

                  <MobileValue>
                    <MobileLabel>{t('admin:subscriptionsPage.plan')}</MobileLabel>
                    <PlanBadge planType={subscription.planType}>
                      {subscription.planType.charAt(0).toUpperCase() + subscription.planType.slice(1)}
                    </PlanBadge>
                  </MobileValue>

                  <MobileValue>
                    <MobileLabel>{t('admin:subscriptionsPage.status')}</MobileLabel>
                    <StatusBadge status={subscription.status}>
                      {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                    </StatusBadge>
                  </MobileValue>

                  <MobileValue>
                    <MobileLabel>{t('admin:subscriptionsPage.menuItems')}</MobileLabel>
                    {subscription.currentMenuItems}/{subscription.menuItemLimit === -1 ? '∞' : subscription.menuItemLimit}
                  </MobileValue>

                  <MobileValue className="col-fee">
                    <MobileLabel>{t('admin:subscriptionsPage.monthlyFee')}</MobileLabel>
                    {subscription.discountType !== 'none' && subscription.discountValue > 0 ? (
                      <div>
                        <span style={{textDecoration: 'line-through', color: '#9CA3AF', fontSize: '12px'}}>RM {subscription.monthlyFee}</span>
                        <div style={{color: '#15803D', fontWeight: '600'}}>
                          RM {(subscription.discountType === 'percentage'
                            ? subscription.monthlyFee * (1 - subscription.discountValue / 100)
                            : Math.max(0, subscription.monthlyFee - subscription.discountValue)
                          ).toFixed(2)}
                        </div>
                      </div>
                    ) : (
                      <>RM {subscription.monthlyFee}</>
                    )}
                  </MobileValue>

                  <MobileValue>
                    <MobileLabel>{t('admin:subscriptionsPage.expiresIn')}</MobileLabel>
                    {(() => {
                      const today = new Date();
                      const endDate = new Date(subscription.endDate);
                      const diffTime = endDate.getTime() - today.getTime();
                      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                      if (diffDays < 0) {
                        return <span style={{color: '#DC2626', fontWeight: '500'}}>{t('admin:subscriptionsPage.expired')}</span>;
                      } else if (diffDays === 0) {
                        return <span style={{color: '#DC2626', fontWeight: '500'}}>{t('admin:subscriptionsPage.today')}</span>;
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
                    <MobileLabel>{t('admin:subscriptionsPage.autorenew')}</MobileLabel>
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
                  }}>{t('admin:subscriptionsPage.view')}</CommonActionButton>
                  <CommonActionButton onClick={() => handleEditSubscription(subscription)}>{t('admin:subscriptionsPage.edit')}</CommonActionButton>
                  <CommonIconButton
                    onClick={() => handleToggleStatus(subscription)}
                    title={subscription.status === 'active' ? 'Suspend' : (subscription.status === 'suspended' || subscription.status === 'overdue') ? 'Restore Subscription' : 'Activate'}
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
                        <CommonModal isOpen={true} onClose={() => setShowAddModal(false)} title="Add Subscription" footer={<><ThemedButton variant="cancel" onClick={() => setShowAddModal(false)}>{t('admin:subscriptionsPage.cancel')}</ThemedButton><ThemedButton variant="primary" onClick={handleSubmit}>{t('admin:subscriptionsPage.addSubscription')}</ThemedButton></>}>

                  <FormGrid>
                    <FormGroup>
                      <FormLabel>{t('subscription:userTypeLabel', 'User Type')} *</FormLabel>
                      <FilterSelect
                        value={userType}
                        onChange={(e) => {
                          const newType = e.target.value as SubUserType;
                          setUserType(newType);
                          setSelectedTarget(null);
                          setSearchQuery('');
                          setNewSubscription(prev => ({
                            ...prev,
                            planType: 'custom',
                            customPlanName: '',
                            monthlyFee: 0,
                            paymentModel: newType === 'brand' ? 'brand_manager' : newType === 'foodcourt' ? 'foodcourt_manager' : 'restaurant'
                          }));
                        }}
                      >
                        <option value="restaurant">{t('subscription:userTypeOptions.restaurant', 'Restaurant Admin')}</option>
                        <option value="brand">{t('subscription:userTypeOptions.brand', 'Brand General')}</option>
                        <option value="foodcourt">{t('subscription:userTypeOptions.foodcourt', 'Foodcourt General')}</option>
                        <option value="owner">{t('subscription:userTypeOptions.owner', 'Restaurant Owner')}</option>
                        <option value="supplier">{t('subscription:userTypeOptions.supplier', 'Supplier Admin')}</option>
                      </FilterSelect>
                    </FormGroup>

                    <FormGroup style={{position: 'relative', zIndex: 100}}>
                      <FormLabel>
                        {userType === 'restaurant' ? 'Search Restaurant *' : userType === 'owner' ? 'Search Owner *' : 'Search Manager *'}
                      </FormLabel>
                      <div style={{position: 'relative', width: '100%'}}>
                        <FormInput
                          type="text"
                          value={searchQuery}
                          onChange={(e) => handleSearch(e.target.value)}
                          onFocus={() => {
                            setShowSearchDropdown(true);
                            if (searchQuery.length < 1) {
                              handleSearch('');
                            }
                          }}
                          onBlur={() => setTimeout(() => setShowSearchDropdown(false), 200)}
                          placeholder={userType === 'restaurant' ? 'Click to search restaurants...' : userType === 'owner' ? 'Click to search owners...' : 'Click to search managers...'}
                          required
                        />
                        {showSearchDropdown && (
                          <div style={{
                            position: 'absolute',
                            top: 'calc(100% + 4px)',
                            left: 0,
                            right: 0,
                            background: 'white',
                            border: '1px solid #E6EBF1',
                            borderRadius: '8px',
                            maxHeight: '300px',
                            overflowY: 'auto',
                            zIndex: 9999,
                            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)'
                          }}>
                            {userType !== 'restaurant' && searchResults.managers.length > 0 && (
                              <div>
                                <div style={{padding: '8px 12px', background: '#F8FAFC', fontSize: '12px', fontWeight: '600', color: '#6B7280'}}>
                                  {userType === 'owner' ? 'OWNERS' : 'MANAGERS'}
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
                            {userType === 'restaurant' && searchResults.restaurants.length > 0 && (
                              <div>
                                <div style={{padding: '8px 12px', background: '#F8FAFC', fontSize: '12px', fontWeight: '600', color: '#6B7280'}}>
                                  RESTAURANTS
                                </div>
                                {searchResults.restaurants.map(restaurant => {
                                  const manager = availableManagers.find((m: any) => m.id?.toString() === restaurant.admin_id?.toString());
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
                                      <div style={{fontWeight: '500', color: '#0A2540'}}>{getRestaurantDisplayName(restaurant)}</div>
                                      <div style={{fontSize: '13px', color: '#6B7280'}}>
                                        Admin: {restaurant.admin ? `${restaurant.admin.name} (${restaurant.admin.email})` : 'No Admin'}
                                        {manager ? ` • Manager: ${manager.fullName || manager.full_name || manager.username}` : ''}
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
                                : `${selectedTarget.data.admin ? `Admin: ${selectedTarget.data.admin.name}` : 'No Admin'} • ${formatEntityAddress(selectedTarget.data, (i18n.language as AppLocale) || 'en') || 'No address'}`}
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

                    {/* Unified subscription fields (v3.27) — replaces the old per-page form */}
                    <div style={{ gridColumn: '1 / -1' }}>
                      <SubscriptionFormFields
                        userType={userType}
                        mode="add"
                        availablePlans={availablePlans}
                        planCurrencies={getActivePlanCurrencies(availablePlans)}
                        values={{
                          currency: newSubscription.currency || 'MYR',
                          plan_type: newSubscription.customPlanName || '',
                          plan_amount: String(newSubscription.monthlyFee || 0),
                          billing_cycle: newSubscription.billingCycle || '',
                          payment_model: newSubscription.paymentModel as PaymentModel,
                          subscription_start: newSubscription.startDate,
                          subscription_end: newSubscription.endDate,
                          auto_renew: newSubscription.autoRenew,
                          treat_as_trial: newSubscription.treatAsTrial,
                          activate_now: newSubscription.activateNow,
                          discount_type: newSubscription.discountType,
                          discount_value: newSubscription.discountValue,
                          discount_reason: newSubscription.discountReason
                        }}
                        onChange={(patch) => setNewSubscription(prev => ({
                          ...prev,
                          ...(patch.currency !== undefined ? { currency: patch.currency } : {}),
                          ...(patch.plan_type !== undefined ? { customPlanName: patch.plan_type, planType: 'custom' } : {}),
                          ...(patch.plan_amount !== undefined ? { monthlyFee: parseFloat(patch.plan_amount) || 0 } : {}),
                          ...(patch.billing_cycle !== undefined ? { billingCycle: patch.billing_cycle } : {}),
                          ...(patch.payment_model !== undefined ? { paymentModel: patch.payment_model } : {}),
                          ...(patch.subscription_start !== undefined ? { startDate: patch.subscription_start } : {}),
                          ...(patch.subscription_end !== undefined ? { endDate: patch.subscription_end } : {}),
                          ...(patch.auto_renew !== undefined ? { autoRenew: patch.auto_renew } : {}),
                          ...(patch.treat_as_trial !== undefined ? { treatAsTrial: patch.treat_as_trial, status: patch.treat_as_trial ? 'trial' : 'active' } : {}),
                          ...(patch.activate_now !== undefined ? { activateNow: patch.activate_now } : {}),
                          ...(patch.discount_type !== undefined ? { discountType: patch.discount_type } : {}),
                          ...(patch.discount_value !== undefined ? { discountValue: patch.discount_value } : {}),
                          ...(patch.discount_reason !== undefined ? { discountReason: patch.discount_reason } : {}),
                        }))}
                      />
                    </div>
                  </FormGrid>
                
            </CommonModal>
          )}

          {/* Success Modal */}
          {showSuccessModal && (
            <CommonModal isOpen={true} onClose={() => setShowSuccessModal(false)} title="Success!" size="small" footer={<><ThemedButton variant="primary" onClick={() => setShowSuccessModal(false)}>{t('admin:subscriptionsPage.ok')}</ThemedButton></>}>
              <div style={{ textAlign: 'center' }}>
                <SuccessIcon>✓</SuccessIcon>
                <SuccessMessage>{successMessage}</SuccessMessage>
              </div>
            </CommonModal>
          )}

          {/* Edit Subscription Modal — uses SubscriptionFormFields for shared subscription fields,
              with Plan select + Status dropdown rendered externally (Status is edit-only, and the
              Plan picker preserves the legacy "others" custom plan name affordance). */}
          {showEditModal && editingSubscription && (
                        <CommonModal isOpen={true} onClose={() => setShowEditModal(false)} title="Edit Custom Subscription" footer={<><ThemedButton variant="cancel" onClick={() => setShowEditModal(false)}>{t('admin:subscriptionsPage.cancel')}</ThemedButton><ThemedButton variant="primary" onClick={handleUpdateSubscription}>{t('admin:subscriptionsPage.updateSubscription')}</ThemedButton></>}>

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

                    {/* Plan select — rendered outside SubscriptionFormFields so we can offer
                        the legacy "Others" option that lets admins type a custom plan name. */}
                    <FormGroup style={{gridColumn: '1 / -1'}}>
                      <FormLabel>Subscription Plan *</FormLabel>
                      <FormSelect
                        value={editingSubscription.planType === 'custom' ? 'others' : editingSubscription.planType}
                        onChange={(e) => {
                          const selectedValue = e.target.value;
                          if (selectedValue === 'others') {
                            setEditingSubscription({
                              ...editingSubscription,
                              planType: 'custom',
                              monthlyFee: 0
                            });
                          } else if (selectedValue) {
                            const selectedPlan = availablePlans.find(p => p.display_name === selectedValue);
                            if (selectedPlan) {
                              const cur = normalizeCurrencyCode(editingSubscription.currency || 'MYR');
                              setEditingSubscription({
                                ...editingSubscription,
                                planType: selectedValue as any,
                                monthlyFee: getPlanPrice(selectedPlan, cur)
                              });
                            }
                          }
                        }}
                      >
                        <option value="">{t('admin:subscriptionsPage.selectPlan')}</option>
                        {availablePlans
                          .filter(p => p.plan_target === 'restaurant')
                          .map((plan) => {
                            const cur = normalizeCurrencyCode(editingSubscription.currency || 'MYR');
                            const isCurrentPlan = plan.display_name === editingSubscription.planType;
                            const currentAmount = editingSubscription.monthlyFee;
                            const latestAmount = getPlanPrice(plan, cur);
                            const hasDiff = isCurrentPlan && currentAmount !== latestAmount;
                            return (
                              <option key={plan.id} value={plan.display_name}>
                                {plan.display_name} - {formatPlanPrice(plan, cur)}{hasDiff ? ` (current: ${currentAmount})` : ''}
                              </option>
                            );
                          })}
                        <option value="others">{t('admin:subscriptionsPage.others')}</option>
                      </FormSelect>
                    </FormGroup>

                    {editingSubscription.planType === 'custom' && (
                      <FormGroup style={{gridColumn: '1 / -1'}}>
                        <FormLabel>Custom Plan Name *</FormLabel>
                        <FormInput
                          type="text"
                          value={editCustomPlanName}
                          onChange={(e) => setEditCustomPlanName(e.target.value)}
                          placeholder="Enter custom plan name"
                          required
                        />
                      </FormGroup>
                    )}

                    {/* Monthly Fee — kept editable for custom plans (auto-set when picking a template). */}
                    <FormGroup>
                      <FormLabel>Monthly Fee ({editingSubscription.currency || 'MYR'}) *</FormLabel>
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

                    {/* Status — admin-driven state transition, edit-only (Add uses treat_as_trial / activate_now). */}
                    <FormGroup>
                      <FormLabel>Status *</FormLabel>
                      <FormSelect
                        value={editingSubscription.status}
                        onChange={(e) => setEditingSubscription({...editingSubscription, status: e.target.value as 'active' | 'trial' | 'expired' | 'suspended' | 'cancelled'})}
                      >
                        <option value="trial">{t('admin:subscriptionsPage.trial')}</option>
                        <option value="active">{t('admin:subscriptionsPage.active')}</option>
                        <option value="suspended">{t('admin:subscriptionsPage.suspended')}</option>
                        <option value="expired">{t('admin:subscriptionsPage.expired')}</option>
                        <option value="cancelled">{t('admin:subscriptionsPage.cancelled')}</option>
                      </FormSelect>
                    </FormGroup>

                    {/* Unified subscription fields — same component the Add modal uses.
                        Plan, Trial, Activate-now are hidden because Edit handles them externally / not applicable. */}
                    <div style={{ gridColumn: '1 / -1' }}>
                      <SubscriptionFormFields
                        userType="restaurant"
                        mode="edit"
                        availablePlans={availablePlans}
                        planCurrencies={getActivePlanCurrencies(availablePlans)}
                        options={{ hidePlan: true, hideTrial: true, hideActivateNow: true }}
                        values={{
                          currency: editingSubscription.currency || 'MYR',
                          plan_type: editingSubscription.planType || '',
                          plan_amount: String(editingSubscription.monthlyFee || 0),
                          billing_cycle: (editingSubscription.billingCycle || 'monthly') as BillingCycle,
                          payment_model: (editingSubscription.paymentModel as PaymentModel) || 'restaurant',
                          subscription_start: editingSubscription.startDate,
                          subscription_end: editingSubscription.endDate,
                          auto_renew: editingSubscription.autoRenew ?? true,
                          treat_as_trial: false,
                          activate_now: false,
                          discount_type: (editingSubscription.discountType || 'none') as DiscountType,
                          discount_value: editingSubscription.discountValue || 0,
                          discount_reason: editingSubscription.discountReason || ''
                        }}
                        onChange={(patch) => setEditingSubscription(prev => prev ? {
                          ...prev,
                          ...(patch.currency !== undefined ? { currency: patch.currency } : {}),
                          ...(patch.plan_amount !== undefined ? { monthlyFee: parseFloat(patch.plan_amount) || 0 } : {}),
                          ...(patch.billing_cycle !== undefined ? { billingCycle: patch.billing_cycle as 'monthly' | 'annual' } : {}),
                          ...(patch.payment_model !== undefined ? { paymentModel: patch.payment_model as any } : {}),
                          ...(patch.subscription_start !== undefined ? { startDate: patch.subscription_start } : {}),
                          ...(patch.subscription_end !== undefined ? { endDate: patch.subscription_end } : {}),
                          ...(patch.auto_renew !== undefined ? { autoRenew: patch.auto_renew } : {}),
                          ...(patch.discount_type !== undefined ? { discountType: patch.discount_type as any } : {}),
                          ...(patch.discount_value !== undefined ? { discountValue: patch.discount_value } : {}),
                          ...(patch.discount_reason !== undefined ? { discountReason: patch.discount_reason } : {}),
                        } : prev)}
                      />
                    </div>
                  </FormGrid>

            </CommonModal>
          )}

          {/* View Subscription Modal */}
          {showViewModal && viewingSubscription && (
                        <CommonModal isOpen={true} onClose={() => setShowViewModal(false)} title="Subscription Details" footer={<><ThemedButton variant="primary" onClick={() => setShowViewModal(false)}>{t('admin:subscriptionsPage.close')}</ThemedButton></>}>

                  <div style={{display: 'grid', gap: '20px'}}>
                    {/* Restaurant Info */}
                    <div>
                      <div style={{fontSize: '12px', color: '#6B7280', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase'}}>{t('admin:subscriptionsPage.restaurantInformation')}</div>
                      <div style={{background: '#F8FAFC', padding: '16px', borderRadius: '8px', border: '1px solid #E6EBF1'}}>
                        <div style={{marginBottom: '12px'}}>
                          <div style={{fontSize: '12px', color: '#6B7280', marginBottom: '4px'}}>{t('admin:subscriptionsPage.restaurantName')}</div>
                          <div style={{fontSize: '14px', fontWeight: '500', color: '#0A2540'}}>{viewingSubscription.restaurantName}</div>
                        </div>
                        <div style={{marginBottom: '12px'}}>
                          <div style={{fontSize: '12px', color: '#6B7280', marginBottom: '4px'}}>{t('admin:subscriptionsPage.manager')}</div>
                          <div style={{fontSize: '14px', fontWeight: '500', color: '#0A2540'}}>{viewingSubscription.managerName}</div>
                        </div>
                        <div>
                          <div style={{fontSize: '12px', color: '#6B7280', marginBottom: '4px'}}>{t('admin:subscriptionsPage.location')}</div>
                          <div style={{fontSize: '14px', fontWeight: '500', color: '#0A2540'}}>{viewingSubscription.location}</div>
                        </div>
                      </div>
                    </div>

                    {/* Subscription Info */}
                    <div>
                      <div style={{fontSize: '12px', color: '#6B7280', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase'}}>{t('admin:subscriptionsPage.subscriptionDetails')}</div>
                      <div style={{background: '#F8FAFC', padding: '16px', borderRadius: '8px', border: '1px solid #E6EBF1'}}>
                        <div style={{marginBottom: '12px'}}>
                          <div style={{fontSize: '12px', color: '#6B7280', marginBottom: '4px'}}>{t('admin:subscriptionsPage.planType')}</div>
                          <div style={{fontSize: '14px', fontWeight: '500', color: '#0A2540'}}>
                            {viewingSubscription.planType.charAt(0).toUpperCase() + viewingSubscription.planType.slice(1)}
                          </div>
                        </div>
                        <div style={{marginBottom: '12px'}}>
                          <div style={{fontSize: '12px', color: '#6B7280', marginBottom: '4px'}}>{t('admin:subscriptionsPage.status')}</div>
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
                          <div style={{fontSize: '12px', color: '#6B7280', marginBottom: '4px'}}>{t('admin:subscriptionsPage.monthlyFee')}</div>
                          {viewingSubscription.discountType !== 'none' && viewingSubscription.discountValue > 0 ? (
                            <div>
                              <span style={{textDecoration: 'line-through', color: '#9CA3AF', fontSize: '13px'}}>RM {viewingSubscription.monthlyFee}</span>
                              <div style={{fontSize: '16px', fontWeight: '600', color: '#15803D'}}>
                                RM {(viewingSubscription.discountType === 'percentage'
                                  ? viewingSubscription.monthlyFee * (1 - viewingSubscription.discountValue / 100)
                                  : Math.max(0, viewingSubscription.monthlyFee - viewingSubscription.discountValue)
                                ).toFixed(2)}
                                <span style={{fontSize: '12px', fontWeight: '500', marginLeft: '4px'}}>
                                  (-{viewingSubscription.discountType === 'percentage' ? `${viewingSubscription.discountValue}%` : `RM ${viewingSubscription.discountValue}`})
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div style={{fontSize: '14px', fontWeight: '500', color: '#0A2540'}}>RM {viewingSubscription.monthlyFee}</div>
                          )}
                        </div>
                        <div style={{marginBottom: '12px'}}>
                          <div style={{fontSize: '12px', color: '#6B7280', marginBottom: '4px'}}>{t('admin:subscriptionsPage.billingCycle')}</div>
                          <div style={{fontSize: '14px', fontWeight: '500', color: '#0A2540'}}>
                            {viewingSubscription.billingCycle.charAt(0).toUpperCase() + viewingSubscription.billingCycle.slice(1)}
                          </div>
                        </div>
                        <div style={{marginBottom: '12px'}}>
                          <div style={{fontSize: '12px', color: '#6B7280', marginBottom: '4px'}}>{t('admin:subscriptionsPage.autorenew')}</div>
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

                    {/* Discount Info */}
                    {viewingSubscription.discountType !== 'none' && viewingSubscription.discountValue > 0 && (
                      <div>
                        <div style={{fontSize: '12px', color: '#6B7280', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase'}}>{t('admin:subscriptionsPage.discount')}</div>
                        <div style={{background: '#F0FDF4', padding: '16px', borderRadius: '8px', border: '1px solid #BBF7D0'}}>
                          <div style={{marginBottom: '12px'}}>
                            <div style={{fontSize: '12px', color: '#166534', marginBottom: '4px'}}>{t('admin:subscriptionsPage.type')}</div>
                            <div style={{fontSize: '14px', fontWeight: '500', color: '#15803D'}}>
                              {viewingSubscription.discountType === 'percentage' ? 'Percentage' : 'Fixed Amount'}
                            </div>
                          </div>
                          <div style={{marginBottom: '12px'}}>
                            <div style={{fontSize: '12px', color: '#166534', marginBottom: '4px'}}>{t('admin:subscriptionsPage.value')}</div>
                            <div style={{fontSize: '14px', fontWeight: '500', color: '#15803D'}}>
                              {viewingSubscription.discountType === 'percentage' ? `${viewingSubscription.discountValue}%` : `RM ${viewingSubscription.discountValue.toFixed(2)}`}
                            </div>
                          </div>
                          {viewingSubscription.discountReason && (
                            <div>
                              <div style={{fontSize: '12px', color: '#166534', marginBottom: '4px'}}>{t('admin:subscriptionsPage.reason')}</div>
                              <div style={{fontSize: '14px', fontWeight: '500', color: '#15803D'}}>{viewingSubscription.discountReason}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Dates */}
                    <div>
                      <div style={{fontSize: '12px', color: '#6B7280', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase'}}>{t('admin:subscriptionsPage.dates')}</div>
                      <div style={{background: '#F8FAFC', padding: '16px', borderRadius: '8px', border: '1px solid #E6EBF1'}}>
                        <div style={{marginBottom: '12px'}}>
                          <div style={{fontSize: '12px', color: '#6B7280', marginBottom: '4px'}}>{t('admin:subscriptionsPage.startDate')}</div>
                          <div style={{fontSize: '14px', fontWeight: '500', color: '#0A2540'}}>{viewingSubscription.startDate}</div>
                        </div>
                        <div style={{marginBottom: '12px'}}>
                          <div style={{fontSize: '12px', color: '#6B7280', marginBottom: '4px'}}>{t('admin:subscriptionsPage.endDate')}</div>
                          <div style={{fontSize: '14px', fontWeight: '500', color: '#0A2540'}}>{viewingSubscription.endDate}</div>
                        </div>
                        <div style={{marginBottom: '12px'}}>
                          <div style={{fontSize: '12px', color: '#6B7280', marginBottom: '4px'}}>{t('admin:subscriptionsPage.nextPayment')}</div>
                          <div style={{fontSize: '14px', fontWeight: '500', color: '#0A2540'}}>{viewingSubscription.nextPayment}</div>
                        </div>
                        <div>
                          <div style={{fontSize: '12px', color: '#6B7280', marginBottom: '4px'}}>{t('admin:subscriptionsPage.expiresIn')}</div>
                          <div style={{fontSize: '14px', fontWeight: '500', color: '#0A2540'}}>
                            {(() => {
                              const today = new Date();
                              const endDate = new Date(viewingSubscription.endDate);
                              const diffTime = endDate.getTime() - today.getTime();
                              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                              if (diffDays < 0) return <span style={{color: '#DC2626'}}>{t('admin:subscriptionsPage.expired')}</span>;
                              if (diffDays === 0) return <span style={{color: '#DC2626'}}>{t('admin:subscriptionsPage.today')}</span>;
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
                      <div style={{fontSize: '12px', color: '#6B7280', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase'}}>{t('admin:subscriptionsPage.usage')}</div>
                      <div style={{background: '#F8FAFC', padding: '16px', borderRadius: '8px', border: '1px solid #E6EBF1'}}>
                        <div style={{marginBottom: '12px'}}>
                          <div style={{fontSize: '12px', color: '#6B7280', marginBottom: '4px'}}>{t('admin:subscriptionsPage.menuItems')}</div>
                          <div style={{fontSize: '14px', fontWeight: '500', color: '#0A2540'}}>
                            {viewingSubscription.currentMenuItems} / {viewingSubscription.menuItemLimit === -1 ? '∞' : viewingSubscription.menuItemLimit}
                          </div>
                        </div>
                        <div>
                          <div style={{fontSize: '12px', color: '#6B7280', marginBottom: '4px'}}>{t('admin:subscriptionsPage.paymentModel')}</div>
                          <div style={{fontSize: '14px', fontWeight: '500', color: '#0A2540'}}>
                            {viewingSubscription.paymentModel === 'restaurant' ? 'Restaurant Admin' : 'Manager'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                
            </CommonModal>
          )}

          {/* Confirm Action Modal */}
          {showConfirmModal && (
                        <CommonModal isOpen={true} onClose={() => setShowConfirmModal(false)} title="Confirm Action" footer={<><ThemedButton variant="cancel" onClick={() => setShowConfirmModal(false)}>{t('admin:subscriptionsPage.cancel')}</ThemedButton><ThemedButton variant={confirmAction === 'delete' ? 'danger' : 'primary'} onClick={handleConfirmAction} > {confirmAction === 'delete' ? 'Delete' : confirmAction === 'suspend' ? 'Suspend' : 'Activate'} </ThemedButton></>}>

                  <p>
                    {confirmAction === 'delete' && `Are you sure you want to delete subscription for ${selectedSubscription?.restaurantName}?`}
                    {confirmAction === 'suspend' && `Are you sure you want to suspend subscription for ${selectedSubscription?.restaurantName}?`}
                    {confirmAction === 'activate' && `Are you sure you want to activate subscription for ${selectedSubscription?.restaurantName}?`}
                  </p>
                
            </CommonModal>
          )}

        </Content>
      </Container>
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

export default SubscriptionsPage;