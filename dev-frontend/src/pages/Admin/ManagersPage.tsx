import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import {
  Container,
  Header,
  Title,
  ActionSection,
  Button,
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
  // ActionButton, // Removed - not used after handleEditManager was commented out
  IconButton
, Modal as CommonModal } from '../../components/UI';
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import { formatCurrency, getPlanPrice, formatPlanPrice, getActivePlanCurrencies, normalizeCurrencyCode } from '../../utils/currency';
import { formatPhoneForDisplay } from '../../utils/phoneUtils';
import PhoneInput from '../../components/Common/PhoneInput';
import { useStore } from '../../contexts/StoreContext';
import { useTranslation } from 'react-i18next';

import { getAuthToken } from '../../utils/auth';
interface Manager {
  id: string;
  managerId: string;
  userId: number; // Actual numeric user ID for filtering
  fullName: string;
  companyName: string;
  email: string;
  position: string;
  department: string;
  phone: string;
  status: 'active' | 'inactive';
  restaurantCount: number;
  totalRevenue: number;
  createdAt: string;
  lastActive: string;
  address: string;
  role?: string;
  planType?: string;
  planAmount?: number | string;
  billingCycle?: 'monthly' | 'annual';
  paymentModel?: string;
  autoRenew?: boolean;
  subscriptionStart?: string;
  subscriptionEnd?: string;
  subscriptionStatus?: string;
  currency?: string;
  is_demo?: boolean;
  is_test?: boolean;
}

// Common components now imported from ../../components/UI
// Page-specific styled components below

// 페이지별 반응형 테이블 헤더 (Managers 전용)
const ManagerTableHeader = styled(CommonTableHeader)`
  @media (max-width: 1400px) {
    & > span:nth-child(4),
    & > span:nth-child(5) {
      display: none;
    }
  }

  @media (max-width: 1024px) {
    & > span:nth-child(3),
    & > span:nth-child(4),
    & > span:nth-child(5) {
      display: none;
    }
  }
`;

// 페이지별 반응형 테이블 행 (Managers 전용)
const ManagerTableRow = styled(CommonTableRow)`
  @media (max-width: 1400px) {
    & > div:nth-child(4),
    & > div:nth-child(5) {
      display: none;
    }
  }

  @media (max-width: 1024px) {
    & > div:nth-child(3),
    & > div:nth-child(4),
    & > div:nth-child(5) {
      display: none;
    }
  }
`;

const ManagerInfo = styled.div``;

const CompanyName = styled.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`;

const ContactInfo = styled.div`
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
      case 'inactive': return '#FEE2E2';
      default: return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'active': return '#059669';
      case 'inactive': return '#DC2626';
      default: return '#6B7280';
    }
  }};
`;

const IconSymbol = styled.span`
  font-size: 13px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-weight: 500;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
`;

// Validation helpers


const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormLabel = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`;

const FormInput = styled.input`
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.15s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:disabled {
    background: #F9FAFB;
    color: #6B7280;
    cursor: not-allowed;
  }

  &::placeholder {
    color: #9CA3AF;
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  min-height: 80px;
  resize: vertical;
  transition: all 0.15s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

const ManagersPage: React.FC = () => {
  const { t } = useTranslation('admin');
  const { operationSettings } = useStore();
  useAuth();
  const [managers, setManagers] = useState<Manager[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [successPassword, setSuccessPassword] = useState('');
  const [passwordCopied, setPasswordCopied] = useState(false);
  const [selectedManager, setSelectedManager] = useState<Manager | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState<'delete' | 'resetPassword' | 'toggle' | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingManager, setEditingManager] = useState<Manager | null>(null);
  const [addModalWarning, setAddModalWarning] = useState('');
  const [editModalWarning, setEditModalWarning] = useState('');
  const [actionError, setActionError] = useState('');
  const [newManager, setNewManager] = useState({
    managerId: '',
    fullName: '',
    companyName: '',
    email: '',
    position: '',
    department: '',
    phone: '',
    address: '',
    role: 'Foodcourt General' as 'Foodcourt General' | 'Foodcourt Manager' | 'Brand General' | 'Brand Manager' | 'Restaurant Owner',
    parentManagerId: '' as string, // For Brand Manager - links to Brand General
    // Subscription fields
    currency: 'MYR',
    planType: '',
    planAmount: '149.00',
    billingCycle: 'monthly' as 'monthly' | 'annual',
    paymentModel: 'foodcourt_manager' as 'foodcourt_manager' | 'brand_manager' | 'restaurant_owner',
    autoRenew: true,
    subscriptionStart: new Date().toISOString().split('T')[0],
    subscriptionEnd: ''
  });
  const [availablePlans, setAvailablePlans] = useState<any[]>([]);
  const planCurrencies = useMemo(() => getActivePlanCurrencies(availablePlans), [availablePlans]);
  const [brandGenerals, setBrandGenerals] = useState<any[]>([]);
  const [foodcourtGenerals, setFoodcourtGenerals] = useState<any[]>([]);

  const navigate = useNavigate();

  const handleViewManagerRestaurants = (manager: Manager) => {
    // Use the actual numeric user ID for filtering
    console.log('🔗 Navigating to restaurants for manager:', manager.fullName, 'User ID:', manager.userId, 'Manager object:', manager);
    navigate(`/pos/admin/restaurants?managerId=${manager.userId}&managerName=${encodeURIComponent(manager.fullName)}`);
  };

  const fetchManagers = async () => {
    try {
      console.log('🔄 Fetching managers from API...');

      // Fetch managers only (4 roles: Foodcourt General, Foodcourt Manager, Brand General, Brand Manager)
      const usersResponse = await fetch('/api/users?role=Manager', { headers: getAuthHeaders() });
      console.log('📡 Users API response status:', usersResponse.status);

      if (usersResponse.ok) {
        const usersData = await usersResponse.json();
        console.log('👥 Manager users data from API:', usersData);

        // Fetch all restaurants to calculate counts and revenue
        const restaurantsResponse = await fetch('/api/restaurants', { headers: getAuthHeaders() });
        const restaurantsData = restaurantsResponse.ok ? await restaurantsResponse.json() : [];
        console.log('🏪 All restaurants data:', restaurantsData);

        // Handle both data array and direct array
        const managerUsers = usersData.data || usersData;
        console.log('👔 Manager users found:', managerUsers);

        if (managerUsers.length === 0) {
          console.log('⚠️ No manager users found');
          setManagers([]);
          return;
        }

        // Fetch invoices once for all managers
        let invoicesData: any[] = [];
        try {
          const invoicesResponse = await fetch('/api/invoices', { headers: getAuthHeaders() });
          if (invoicesResponse.ok) {
            const invoices = await invoicesResponse.json();
            invoicesData = invoices.data || invoices;
          }
        } catch (error) {
          console.error('❌ Error fetching invoices:', error);
        }

        // Transform API data to Manager interface
        const managersData: Manager[] = managerUsers.map((user: any) => {
          console.log('🔄 Processing manager:', user);

          // Find restaurants managed by this manager using both old managerId and new managers array
          const managerRestaurants = restaurantsData.filter((restaurant: any) => {
            // Check old single managerId field
            const matchesManagerId = restaurant.managerId === user.id.toString();
            // Check new managers array
            const matchesManagersArray = restaurant.managers && Array.isArray(restaurant.managers) &&
              restaurant.managers.some((m: any) => m.id.toString() === user.id.toString());
            return matchesManagerId || matchesManagersArray;
          });

          console.log(`🔍 Manager ${user.username} (ID: ${user.id}) has ${managerRestaurants.length} restaurants`);

          // Calculate total revenue from actual invoices
          let totalRevenue = 0;
          try {
            // Sum up invoices for restaurants managed by this manager
            totalRevenue = invoicesData
              .filter((invoice: any) => {
                return managerRestaurants.some((restaurant: any) =>
                  restaurant.id.toString() === invoice.restaurant_id?.toString()
                );
              })
              .reduce((sum: number, invoice: any) => {
                  return sum + (parseFloat(invoice.amount || invoice.total || 0));
                }, 0);
          } catch (error) {
            console.log('Could not fetch invoices for revenue calculation:', error);
            totalRevenue = 0;
          }
          
          // Managers are active by default
          const subscriptionStatus = 'active';
          
          // Map subscription data from joined brand/foodcourt tables
          const isBrandGeneral = user.role === 'Brand General';
          const isFoodcourtGeneral = user.role === 'Foodcourt General';

          const entityPlanType = isBrandGeneral ? user.brand_plan_type : isFoodcourtGeneral ? user.fc_plan_type : user.plan_type;
          const entityPlanAmount = isBrandGeneral ? user.brand_plan_amount : isFoodcourtGeneral ? user.fc_plan_amount : null;
          const entityBillingCycle = isBrandGeneral ? user.brand_billing_cycle : isFoodcourtGeneral ? user.fc_billing_cycle : null;
          const entitySubStatus = isBrandGeneral ? user.brand_subscription_status : isFoodcourtGeneral ? user.fc_subscription_status : user.subscription_status;
          const entitySubStart = isBrandGeneral ? user.brand_subscription_start : isFoodcourtGeneral ? user.fc_subscription_start : user.subscription_start;
          const entitySubEnd = isBrandGeneral ? user.brand_subscription_end : isFoodcourtGeneral ? user.fc_subscription_end : user.subscription_end;
          const entityCurrency = isBrandGeneral ? user.brand_currency : isFoodcourtGeneral ? user.fc_currency : 'MYR';

          const managerData = {
            id: `mgr-${user.id}`,
            managerId: user.username || `manager-${user.id}`,
            userId: user.id, // Store numeric user ID for filtering
            fullName: user.full_name || user.username || 'Unknown Name',
            companyName: user.company_name && user.company_name !== 'Unknown Company' ? user.company_name : user.brand_name || user.foodcourt_name || user.full_name || 'N/A',
            email: user.email,
            position: user.role || user.position || 'Manager',
            department: user.department || 'Management',
            phone: user.phone || '+60 12-345-6789',
            status: subscriptionStatus as 'active' | 'inactive',
            restaurantCount: managerRestaurants.length,
            totalRevenue: totalRevenue,
            createdAt: user.createdAt ? new Date(user.createdAt).toISOString().split('T')[0] : '2024-01-01',
            lastActive: new Date().toISOString().split('T')[0],
            address: user.address || 'No address provided',
            role: user.role,
            planType: entityPlanType || undefined,
            planAmount: entityPlanAmount || undefined,
            billingCycle: entityBillingCycle || undefined,
            subscriptionStatus: entitySubStatus || undefined,
            subscriptionStart: entitySubStart ? new Date(entitySubStart).toISOString().split('T')[0] : undefined,
            subscriptionEnd: entitySubEnd ? new Date(entitySubEnd).toISOString().split('T')[0] : undefined,
            currency: entityCurrency || 'MYR',
            is_demo: user.is_demo || false,
            is_test: user.is_test || false
          };
          
          console.log('✅ Transformed manager:', managerData);
          return managerData;
        });
        
        console.log('✅ All transformed managers data:', managersData);
        console.log('✅ Setting managers state with', managersData.length, 'managers');
        setManagers(managersData);
        
      } else {
        console.error('❌ Failed to fetch users:', usersResponse.status);
        setManagers([]);
      }
      
    } catch (error) {
      console.error('❌ Error fetching managers:', error);
      console.error('Error details:', error);
      setManagers([]);
    }
  };

  useEffect(() => {
    fetchManagers();
    fetchPlans();
    fetchGeneralManagers();
  }, []);

  // Fetch Brand Generals and Foodcourt Generals for parent manager selection
  const fetchGeneralManagers = async () => {
    try {
      const response = await fetch('/api/users?role=Manager', { headers: getAuthHeaders() });
      if (response.ok) {
        const data = await response.json();
        const users = data.data || data;

        // Filter Brand Generals
        const brandGens = users.filter((u: any) => u.role === 'Brand General');
        setBrandGenerals(brandGens);

        // Filter Foodcourt Generals
        const foodcourtGens = users.filter((u: any) => u.role === 'Foodcourt General');
        setFoodcourtGenerals(foodcourtGens);

        console.log('📊 Loaded Brand Generals:', brandGens.length, 'Foodcourt Generals:', foodcourtGens.length);
      }
    } catch (error) {
      console.error('Error fetching general managers:', error);
    }
  };

  const fetchPlans = async () => {
    try {
      const response = await fetch('/api/plans', { headers: getAuthHeaders() });
      if (response.ok) {
        const plans = await response.json();
        // Filter brand, foodcourt, and owner plans
        const managerPlans = plans.filter((p: any) =>
          (p.plan_target === 'brand' || p.plan_target === 'foodcourt' || p.plan_target === 'owner') && p.is_active
        );
        setAvailablePlans(managerPlans);
      }
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  };

  // Filter plans based on manager role
  const getFilteredPlans = (role: string) => {
    if (role === 'Brand General' || role === 'Brand Manager') {
      return availablePlans.filter(p => p.plan_target === 'brand');
    } else if (role === 'Foodcourt General' || role === 'Foodcourt Manager') {
      return availablePlans.filter(p => p.plan_target === 'foodcourt');
    } else if (role === 'Restaurant Owner') {
      return availablePlans.filter(p => p.plan_target === 'owner');
    }
    return [];
  };

  console.log('🔍 Filtering managers:', {
    totalManagers: managers.length,
    searchTerm,
    filterStatus,
    managers: managers
  });

  const filteredManagers = managers.filter(manager => {
    const matchesSearch = manager.managerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         manager.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         manager.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         manager.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         manager.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         manager.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || manager.status === filterStatus;
    
    console.log('🔍 Manager filter check:', {
      manager: manager.managerId,
      matchesSearch,
      matchesFilter,
      managerStatus: manager.status,
      expectedStatus: filterStatus
    });
    
    return matchesSearch && matchesFilter;
  });

  console.log('🔍 Filtered results:', filteredManagers.length, 'managers');

  const totalManagers = managers.length;
  const totalRestaurants = managers.reduce((sum, m) => sum + m.restaurantCount, 0);
  // Active subscriptions = total restaurants (since each restaurant is a separate subscription)
  const activeSubscriptions = totalRestaurants;
  const totalRevenue = managers.reduce((sum, m) => sum + m.totalRevenue, 0);

  const handleAddManager = () => {
    console.log('🔵 Add Manager button clicked');
    try {
      // Get first foodcourt plan as default (since default role is Foodcourt General)
      const foodcourtPlans = availablePlans.filter(p => p.plan_target === 'foodcourt');
      const firstPlan = foodcourtPlans.length > 0 ? foodcourtPlans[0] : null;

      const today = new Date().toISOString().split('T')[0];

      setNewManager({
        managerId: '',
        fullName: '',
        companyName: '',
        email: '',
        position: '',
        department: '',
        phone: '',
        address: '',
        role: 'Foodcourt General',
        parentManagerId: '',
        currency: 'MYR',
        planType: firstPlan ? firstPlan.display_name : '',
        planAmount: firstPlan ? String(getPlanPrice(firstPlan || {}, 'MYR')) : '149.00',
        billingCycle: 'monthly',
        paymentModel: 'foodcourt_manager',
        autoRenew: true,
        subscriptionStart: today,
        subscriptionEnd: calcSubscriptionEnd(today, 'monthly')
      });

      setShowAddModal(true);
      console.log('✅ Modal state updated to true');
    } catch (error) {
      console.error('❌ Error opening modal:', error);
      setAddModalWarning('Error opening modal: ' + error.message);
    }
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

  const handleExportManagers = () => {
    // 현재 필터링된 매니저 리스트를 사용하여 CSV 데이터 생성
    const csvData = filteredManagers.map(manager => ({
      'Manager Info': `${manager.fullName} (${manager.companyName})`,
      'Email': manager.email,
      'Phone': manager.phone,
      'Status': manager.status,
      'Restaurants': manager.restaurantCount,
      'Revenue (RM)': manager.totalRevenue.toLocaleString(),
      'Last Active': manager.lastActive,
      'Position': manager.position,
      'Department': manager.department,
      'Address': manager.address,
      'Created At': manager.createdAt
    }));

    const csvContent = convertToCSV(csvData);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `managers-export-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);

    const foodcourtPlans = availablePlans.filter(p => p.plan_target === 'foodcourt');
    const firstPlan = foodcourtPlans.length > 0 ? foodcourtPlans[0] : null;
    const today = new Date().toISOString().split('T')[0];

    setNewManager({
      managerId: '',
      fullName: '',
      companyName: '',
      email: '',
      position: '',
      department: '',
      phone: '',
      address: '',
      role: 'Foodcourt General',
      parentManagerId: '',
      currency: 'MYR',
      planType: firstPlan ? firstPlan.display_name : '',
      planAmount: firstPlan ? String(getPlanPrice(firstPlan || {}, 'MYR')) : '149.00',
      billingCycle: 'monthly',
      paymentModel: 'foodcourt_manager',
      autoRenew: true,
      subscriptionStart: today,
      subscriptionEnd: calcSubscriptionEnd(today, 'monthly')
    });
  };

  // Auto-calculate subscription end date from start + billing cycle
  const calcSubscriptionEnd = (start: string, cycle: string) => {
    if (!start) return '';
    const d = new Date(start);
    if (cycle === 'annual') {
      d.setFullYear(d.getFullYear() + 1);
    } else {
      d.setMonth(d.getMonth() + 1);
    }
    return d.toISOString().split('T')[0];
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setNewManager(prev => {
      const updated = {
        ...prev,
        [field]: field === 'autoRenew' ? value === 'true' || value === true : value
      };
      // Auto-calc end date when start or billing cycle changes
      if (field === 'subscriptionStart' || field === 'billingCycle') {
        const start = field === 'subscriptionStart' ? String(value) : prev.subscriptionStart;
        const cycle = field === 'billingCycle' ? String(value) : prev.billingCycle;
        updated.subscriptionEnd = calcSubscriptionEnd(start, cycle);
      }
      return updated;
    });
  };

  const handleToggleStatus = (manager: Manager) => {
    setSelectedManager(manager);
    setConfirmAction('toggle');
    setShowConfirmModal(true);
  };

  const handlePasswordReset = (manager: Manager) => {
    setSelectedManager(manager);
    setConfirmAction('resetPassword');
    setShowConfirmModal(true);
  };

  const handleDeleteManager = (manager: Manager) => {
    setSelectedManager(manager);
    setConfirmAction('delete');
    setShowConfirmModal(true);
  };

  const handleEditManager = (manager: Manager) => {
    // Use actual subscription data from the manager (loaded from backend join)
    const role = manager.role as 'Foodcourt General' | 'Brand General' | 'Restaurant Owner';
    const filteredPlans = getFilteredPlans(role);
    const firstPlan = filteredPlans.length > 0 ? filteredPlans[0] : null;

    setEditingManager({
      ...manager,
      planType: manager.planType || (firstPlan ? firstPlan.display_name : ''),
      planAmount: manager.planAmount || (firstPlan ? firstPlan.base_price_monthly : '149.00'),
      billingCycle: (manager.billingCycle || 'monthly') as 'monthly' | 'annual',
      paymentModel: role === 'Brand General' ? 'brand_manager' : role === 'Restaurant Owner' ? 'restaurant_owner' : 'foodcourt_manager',
      autoRenew: manager.autoRenew !== undefined ? manager.autoRenew : true,
      subscriptionStart: manager.subscriptionStart || new Date().toISOString().split('T')[0],
      subscriptionEnd: manager.subscriptionEnd || '',
      currency: manager.currency || 'MYR'
    });
    setShowEditModal(true);
  };

  const handleUpdateManager = async () => {
    if (!editingManager) return;

    if (!editingManager.managerId || !editingManager.fullName || !editingManager.companyName || !editingManager.email || !editingManager.position || !editingManager.department || !editingManager.phone) {
      setEditModalWarning('Please fill in all required fields');
      return;
    }

    try {
      console.log('🔄 Updating manager:', editingManager);

      // Extract the real user ID from the manager ID (remove 'mgr-' prefix)
      const userId = editingManager.id.replace('mgr-', '');
      console.log('📝 Extracted user ID:', userId);

      // Prepare update data for backend API
      const updateData: any = {
        username: editingManager.managerId, // Manager ID as username
        full_name: editingManager.fullName,
        company_name: editingManager.companyName,
        email: editingManager.email,
        position: editingManager.position,
        department: editingManager.department,
        phone: editingManager.phone,
        address: editingManager.address
      };

      // Add subscription fields for General roles and Owner
      if (editingManager.role === 'Brand General' || editingManager.role === 'Foodcourt General' || editingManager.role === 'Restaurant Owner') {
        updateData.plan_type = editingManager.planType;
        updateData.plan_amount = parseFloat(String(editingManager.planAmount)) || 0;
        updateData.billing_cycle = editingManager.billingCycle;
        updateData.currency = (editingManager as any).currency || 'MYR';
        updateData.subscription_start = editingManager.subscriptionStart;
        updateData.subscription_end = editingManager.subscriptionEnd;
        updateData.auto_renew = (editingManager as any).autoRenew !== false;
      }

      console.log('📝 Update data:', updateData);

      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updateData)
      });

      console.log('📡 Update response status:', response.status);

      if (response.ok) {
        setShowEditModal(false);
        setEditingManager(null);
        setEditModalWarning('');
        await fetchManagers();
      } else {
        const errorData = await response.json();
        setEditModalWarning(errorData.error || 'Update failed');
      }
    } catch (error) {
      setEditModalWarning('Error updating manager: ' + (error as Error).message);
    }
  };

  const handleConfirmAction = async () => {
    if (!selectedManager || !confirmAction) return;

    try {
      if (confirmAction === 'delete') {
        const userId = selectedManager.id.replace('mgr-', '');

        const response = await fetch(`/api/users/${userId}`, {
          method: 'DELETE',
          headers: getAuthHeaders()
        });

        if (response.ok) {
          await fetchManagers();
        } else {
          const errorData = await response.json().catch(() => ({ error: 'Delete failed' }));
          setActionError(errorData.error || `Delete failed: ${response.status}`);
        }
      } else if (confirmAction === 'resetPassword') {
        const userId = selectedManager.id.replace('mgr-', '');

        const response = await fetch(`/api/users/${userId}/reset-password`, {
          method: 'POST',
          headers: getAuthHeaders()
        });

        if (response.ok) {
          const result = await response.json();
          setSuccessMessage('Password has been reset.');
          setSuccessPassword(result.tempPassword || '');
          setPasswordCopied(false);
          setShowSuccessModal(true);
        } else {
          setActionError('Password reset failed');
        }
      } else if (confirmAction === 'toggle') {
        const userId = selectedManager.id.replace('mgr-', '');
        const newStatus = selectedManager.status === 'active' ? 'inactive' : 'active';

        const response = await fetch(`/api/users/${userId}`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify({ status: newStatus })
        });

        if (response.ok) {
          setManagers(prev => prev.map(m =>
            m.id === selectedManager.id ? { ...m, status: newStatus } : m
          ));
        } else {
          setActionError('Status update failed');
        }
      }
    } catch (error) {
      setActionError(`Action failed: ${(error as Error).message}. Please try again.`);
    }

    setShowConfirmModal(false);
    setSelectedManager(null);
    setConfirmAction(null);
  };

  // Test connection function
  const testConnection = async () => {
    try {
      console.log('🔗 Testing connection to /api/users...');
      const testResponse = await fetch('/api/users?role=Manager', {
        method: 'GET',
        headers: getAuthHeaders(),
        mode: 'cors'
      });

      console.log('🔗 Test response status:', testResponse.status);
      console.log('🔗 Test response ok:', testResponse.ok);

      if (testResponse.ok) {
        const testData = await testResponse.json();
        console.log('🔗 Test data received:', Array.isArray(testData) ? `${testData.length} managers` : 'Non-array response');
        return true;
      } else {
        console.error('🔗 Connection test failed with status:', testResponse.status);
        return false;
      }
    } catch (error) {
      console.error('🔗 Connection test failed:', error);
      return false;
    }
  };

  const handleSubmit = async () => {
    console.log('🔄 Handle submit called with data:', newManager);
    
    // Test connection first
    const isConnected = await testConnection();
    if (!isConnected) {
      setAddModalWarning('Cannot connect to backend server. Please check if the server is running');
      return;
    }

    if (!newManager.managerId || !newManager.fullName || !newManager.companyName || !newManager.email || !newManager.position || !newManager.department || !newManager.phone) {
      setAddModalWarning('Please fill in all required fields');
      return;
    }

    // Validate that Brand Manager has a parent Brand General selected
    if (newManager.role === 'Brand Manager' && !newManager.parentManagerId) {
      setAddModalWarning('Please select a Brand General for this Brand Manager');
      return;
    }

    // Validate that Foodcourt Manager has a parent Foodcourt General selected
    if (newManager.role === 'Foodcourt Manager' && !newManager.parentManagerId) {
      setAddModalWarning('Please select a Foodcourt General for this Foodcourt Manager');
      return;
    }

    console.log('✅ Validation passed, proceeding with manager creation...');

    try {
      // Use managerId as username and include all profile data
      const managerUserData: any = {
        username: newManager.managerId,
        email: newManager.email,
        role: newManager.role,
        full_name: newManager.fullName,
        company_name: newManager.companyName,
        position: newManager.position,
        department: newManager.department,
        phone: newManager.phone,
        address: newManager.address
      };

      // Add subscription fields for General roles and Owner
      if (newManager.role === 'Brand General' || newManager.role === 'Foodcourt General' || newManager.role === 'Restaurant Owner') {
        managerUserData.plan_type = newManager.planType;
        managerUserData.plan_amount = parseFloat(newManager.planAmount) || 0;
        managerUserData.billing_cycle = newManager.billingCycle;
        managerUserData.currency = newManager.currency;
        managerUserData.subscription_start = newManager.subscriptionStart;
        managerUserData.subscription_end = newManager.subscriptionEnd;
        managerUserData.auto_renew = newManager.autoRenew !== false;
      }

      // Add manager_id (parent manager) for Brand Manager and Foodcourt Manager
      if ((newManager.role === 'Brand Manager' || newManager.role === 'Foodcourt Manager') && newManager.parentManagerId) {
        managerUserData.manager_id = parseInt(newManager.parentManagerId);
      }

      console.log('🔄 Creating manager user:', managerUserData);
      console.log('📍 API URL:', '/api/users');

      const response = await fetch('/api/users', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(managerUserData)
      });

      console.log('📡 Response status:', response.status);
      console.log('📡 Response ok:', response.ok);
      
      let result;
      const contentType = response.headers.get('content-type');
      console.log('📡 Content-Type:', contentType);
      
      if (contentType && contentType.includes('application/json')) {
        result = await response.json();
      } else {
        const responseText = await response.text();
        console.log('📡 Response text:', responseText);
        
        if (responseText.trim() === '') {
          throw new Error('Empty response from server');
        }
        
        try {
          result = JSON.parse(responseText);
        } catch (parseError) {
          console.error('❌ Failed to parse response:', parseError);
          console.error('Response was:', responseText);
          throw new Error(`Invalid JSON response: ${responseText.substring(0, 100)}...`);
        }
      }
      
      console.log('📡 Parsed result:', result);

      if (response.ok) {
        setSuccessMessage('Manager created successfully.');
        setSuccessPassword(result.generatedPassword || '');
        setPasswordCopied(false);
        setShowSuccessModal(true);

        handleCloseModal();
        await fetchManagers();
      } else {
        setAddModalWarning('Failed to create manager: ' + (result.error || result.message || 'Unknown error'));
      }
    } catch (error) {
      if ((error as Error).message.includes('Failed to fetch')) {
        setAddModalWarning('Cannot connect to server. Please ensure the backend server is running');
      } else {
        setAddModalWarning('Error creating manager: ' + (error as Error).message);
      }
    }
  };

  return (
    <>
      <Container>
        <Header>
          <Title>{t('admin:managersPage.managers')}</Title>
          <ActionSection>
            <Button variant="secondary" onClick={handleExportManagers}>{t('admin:managersPage.export')}</Button>
            <Button variant="primary" onClick={handleAddManager}>{t('admin:managersPage.addManager')}</Button>
          </ActionSection>
        </Header>
        
        <Content>
          <StatsGrid>
          <StatCard color="#059669">
            <StatValue>{totalManagers}</StatValue>
            <StatLabel>{t('admin:managersPage.totalManagers')}</StatLabel>
            <StatDescription>{t('admin:managersPage.currentlyActive')}</StatDescription>
          </StatCard>
          <StatCard color="#2563EB">
            <StatValue>{activeSubscriptions}</StatValue>
            <StatLabel>{t('admin:managersPage.activeSubscriptions')}</StatLabel>
            <StatDescription>{totalManagers > 0 ? (totalRestaurants/totalManagers).toFixed(1) : 0} restaurants per manager</StatDescription>
          </StatCard>
          <StatCard color="#7C3AED">
            <StatValue>{totalRestaurants}</StatValue>
            <StatLabel>{t('admin:managersPage.totalRestaurants')}</StatLabel>
            <StatDescription>{t('admin:managersPage.acrossAllManagers')}</StatDescription>
          </StatCard>
          <StatCard color="#D97706">
            <StatValue>{formatCurrency(totalRevenue / 1000, operationSettings.currency).replace(/\.\d+/, '')}k</StatValue>
            <StatLabel>{t('admin:managersPage.totalRevenue')}</StatLabel>
            <StatDescription>{t('admin:managersPage.fromActualInvoices')}</StatDescription>
          </StatCard>
        </StatsGrid>

        <FilterBar>
          <FilterSelect
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">{t('admin:managersPage.allStatus')}</option>
            <option value="active">{t('admin:managersPage.active')}</option>
            <option value="inactive">{t('admin:managersPage.inactive')}</option>
          </FilterSelect>

          <SearchInput
            type="text"
            placeholder="Search by name, email, or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </FilterBar>

        <Table>
          <ManagerTableHeader columns="2fr 1fr 1fr 1fr 1fr 200px">
            <span className="col-info">{t('admin:managersPage.managerInfo')}</span>
            <span>{t('admin:managersPage.status')}</span>
            <span>{t('admin:managersPage.restaurants')}</span>
            <span className="col-revenue">{t('admin:managersPage.revenueRm')}</span>
            <span>{t('admin:managersPage.lastActive')}</span>
            <span className="col-action">{t('admin:managersPage.actions')}</span>
          </ManagerTableHeader>

          {filteredManagers.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#6B7280' }}>
              <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                No managers found
              </div>
              <div style={{ fontSize: '14px' }}>
                {managers.length === 0 ? 'Data may still be loading...' : 'Try adjusting your filters'}
              </div>
            </div>
          ) : (
            filteredManagers.map(manager => (
              <ManagerTableRow columns="2fr 1fr 1fr 1fr 1fr 200px" key={manager.id}>
                <MobileGrid>
                  <MobileValue className="col-info">
                    <MobileLabel>{t('admin:managersPage.managerInfo')}</MobileLabel>
                    <ManagerInfo>
                      <CompanyName>{manager.fullName}{manager.is_demo && <span style={{ fontSize: '10px', fontWeight: 600, color: '#fff', background: '#F59E0B', padding: '1px 6px', borderRadius: '4px', marginLeft: '6px', verticalAlign: 'middle' }}>{t('admin:managersPage.demo')}</span>}{manager.is_test && <span style={{ fontSize: '10px', fontWeight: 600, color: '#fff', background: '#8B5CF6', padding: '1px 6px', borderRadius: '4px', marginLeft: '6px', verticalAlign: 'middle' }}>{t('admin:managersPage.test')}</span>}</CompanyName>
                      <ContactInfo>
                        {manager.managerId} • {manager.email}
                      </ContactInfo>
                    </ManagerInfo>
                  </MobileValue>

                  <MobileValue>
                    <MobileLabel>{t('admin:managersPage.status')}</MobileLabel>
                    <div>
                      <StatusBadge status={manager.status}>
                        {manager.status === 'active' ? 'Active' : 'Inactive'}
                      </StatusBadge>
                    </div>
                  </MobileValue>

                  <MobileValue>
                    <MobileLabel>{t('admin:managersPage.restaurants')}</MobileLabel>
                    <span
                      style={{
                        color: '#635BFF',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                        fontWeight: '600'
                      }}
                      onClick={() => handleViewManagerRestaurants(manager)}
                      title={`View restaurants managed by ${manager.fullName}`}
                    >
                      {manager.restaurantCount}
                    </span>
                  </MobileValue>

                  <MobileValue className="col-revenue">
                    <MobileLabel>{t('admin:managersPage.revenueRm')}</MobileLabel>
                    <div style={{ fontSize: '14px', color: '#374151', fontWeight: '600' }}>
                      {manager.totalRevenue.toLocaleString()}
                    </div>
                  </MobileValue>

                  <MobileValue>
                    <MobileLabel>{t('admin:managersPage.lastActive')}</MobileLabel>
                    <div style={{ fontSize: '14px', color: '#6B7280' }}>
                      {manager.lastActive}
                    </div>
                  </MobileValue>
                </MobileGrid>

                <ActionButtons>
                  <IconButton
                    onClick={() => handleEditManager(manager)}
                    title="Edit Manager"
                  >
                    <IconSymbol>{t('admin:managersPage.edit')}</IconSymbol>
                  </IconButton>
                  <IconButton
                    onClick={() => handleToggleStatus(manager)}
                    title={manager.status === 'active' ? 'Deactivate Manager' : 'Activate Manager'}
                  >
                    <IconSymbol>{manager.status === 'active' ? '⊗' : '◉'}</IconSymbol>
                  </IconButton>
                  <IconButton
                    onClick={() => handlePasswordReset(manager)}
                    title="Reset Password"
                  >
                    <IconSymbol>⚷</IconSymbol>
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteManager(manager)}
                    title="Delete Manager"
                  >
                    <IconSymbol>✕</IconSymbol>
                  </IconButton>
                </ActionButtons>
              </ManagerTableRow>
            ))
          )}
        </Table>

        {/* Add Manager Modal */}
        {showAddModal && (
                <CommonModal isOpen={true} onClose={handleCloseModal} title="Add New Manager" footer={<><Button variant="secondary" onClick={handleCloseModal}>{t('admin:managersPage.cancel')}</Button><Button variant="primary" onClick={handleSubmit}>{t('admin:managersPage.addManager')}</Button></>}>

              <FormGrid>
                <FormGroup>
                  <FormLabel>Manager ID *</FormLabel>
                  <FormInput
                    type="text"
                    placeholder="Enter unique manager ID"
                    value={newManager.managerId}
                    onChange={(e) => handleInputChange('managerId', e.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Full Name *</FormLabel>
                  <FormInput
                    type="text"
                    placeholder="Enter full name"
                    value={newManager.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Company Name *</FormLabel>
                  <FormInput
                    type="text"
                    placeholder="Enter company name"
                    value={newManager.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Manager Role *</FormLabel>
                  <FilterSelect
                    value={newManager.role}
                    onChange={(e) => {
                      const newRole = e.target.value as 'Foodcourt General' | 'Foodcourt Manager' | 'Brand General' | 'Brand Manager' | 'Restaurant Owner';
                      handleInputChange('role', newRole);

                      // Update plan and payment model based on role
                      const filteredPlans = getFilteredPlans(newRole);
                      const firstPlan = filteredPlans.length > 0 ? filteredPlans[0] : null;
                      const paymentModel = newRole === 'Restaurant Owner' ? 'restaurant_owner' : (newRole === 'Brand General' || newRole === 'Brand Manager') ? 'brand_manager' : 'foodcourt_manager';

                      setNewManager(prev => ({
                        ...prev,
                        role: newRole,
                        parentManagerId: '', // Reset parent when role changes
                        planType: firstPlan ? firstPlan.display_name : prev.planType,
                        planAmount: firstPlan ? String(getPlanPrice(firstPlan || {}, prev.currency)) : prev.planAmount,
                        paymentModel: paymentModel
                      }));
                    }}
                  >
                    <option value="Foodcourt General">{t('admin:managersPage.foodcourtGeneral')}</option>
                    <option value="Foodcourt Manager">{t('admin:managersPage.foodcourtManager')}</option>
                    <option value="Brand General">{t('admin:managersPage.brandGeneral')}</option>
                    <option value="Brand Manager">{t('admin:managersPage.brandManager')}</option>
                    <option value="Restaurant Owner">{t('admin:managersPage.restaurantOwner')}</option>
                  </FilterSelect>
                </FormGroup>

                {/* Show Brand General selection when Brand Manager is selected */}
                {newManager.role === 'Brand Manager' && (
                  <FormGroup>
                    <FormLabel>Brand General * (Parent Manager)</FormLabel>
                    <FilterSelect
                      value={newManager.parentManagerId}
                      onChange={(e) => handleInputChange('parentManagerId', e.target.value)}
                    >
                      <option value="">{t('admin:managersPage.selectBrandGeneral')}</option>
                      {brandGenerals.map((bg: any) => (
                        <option key={bg.id} value={bg.id}>
                          {bg.full_name || bg.username} ({bg.company_name || 'No Company'})
                        </option>
                      ))}
                    </FilterSelect>
                  </FormGroup>
                )}

                {/* Show Foodcourt General selection when Foodcourt Manager is selected */}
                {newManager.role === 'Foodcourt Manager' && (
                  <FormGroup>
                    <FormLabel>Foodcourt General * (Parent Manager)</FormLabel>
                    <FilterSelect
                      value={newManager.parentManagerId}
                      onChange={(e) => handleInputChange('parentManagerId', e.target.value)}
                    >
                      <option value="">{t('admin:managersPage.selectFoodcourtGeneral')}</option>
                      {foodcourtGenerals.map((fg: any) => (
                        <option key={fg.id} value={fg.id}>
                          {fg.full_name || fg.username} ({fg.company_name || 'No Company'})
                        </option>
                      ))}
                    </FilterSelect>
                  </FormGroup>
                )}

                <FormGroup>
                  <FormLabel>Position *</FormLabel>
                  <FormInput
                    type="text"
                    placeholder="Enter position (e.g., General Manager, Operations Manager)"
                    value={newManager.position}
                    onChange={(e) => handleInputChange('position', e.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Department *</FormLabel>
                  <FormInput
                    type="text"
                    placeholder="Enter department (e.g., Operations, Sales, Marketing)"
                    value={newManager.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Email Address *</FormLabel>
                  <FormInput
                    type="email"
                    placeholder="Enter email address"
                    value={newManager.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Phone Number *</FormLabel>
                  <PhoneInput
                    value={newManager.phone}
                    onChange={(value) => handleInputChange('phone', value)}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>{t('admin:managersPage.address')}</FormLabel>
                  <FormTextarea
                    placeholder="Enter company address"
                    value={newManager.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                  />
                </FormGroup>

                {/* Subscription Settings - Show for General roles and Owner */}
                {(newManager.role === 'Foodcourt General' || newManager.role === 'Brand General' || newManager.role === 'Restaurant Owner') && (
                  <>
                    <FormGroup style={{gridColumn: '1 / -1', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #E6EBF1'}}>
                      <h3 style={{fontSize: '14px', fontWeight: '600', color: '#0A2540', marginBottom: '12px'}}>{t('admin:managersPage.subscriptionSettings')}</h3>
                    </FormGroup>

                    <FormGroup>
                      <FormLabel>Currency *</FormLabel>
                      <FilterSelect
                        value={newManager.currency}
                        onChange={(e) => {
                          const cur = e.target.value;
                          const selectedPlan = getFilteredPlans(newManager.role).find(p => p.display_name === newManager.planType);
                          handleInputChange('currency', cur);
                          if (selectedPlan) {
                            handleInputChange('planAmount', String(getPlanPrice(selectedPlan, cur)));
                          }
                        }}
                      >
                        {planCurrencies.map(cur => (
                          <option key={cur} value={cur}>{cur}</option>
                        ))}
                      </FilterSelect>
                    </FormGroup>

                    <FormGroup>
                      <FormLabel>Subscription Plan *</FormLabel>
                      <FilterSelect
                        value={newManager.planType}
                        onChange={(e) => {
                          const selectedPlan = getFilteredPlans(newManager.role).find(p => p.display_name === e.target.value);
                          handleInputChange('planType', e.target.value);
                          if (selectedPlan) {
                            handleInputChange('planAmount', String(getPlanPrice(selectedPlan, newManager.currency)));
                          }
                        }}
                      >
                        <option value="">{t('admin:managersPage.selectPlan')}</option>
                        {getFilteredPlans(newManager.role).map(plan => (
                          <option key={plan.id} value={plan.display_name}>
                            {plan.display_name} ({formatPlanPrice(plan, newManager.currency)}/month)
                          </option>
                        ))}
                      </FilterSelect>
                    </FormGroup>

                    <FormGroup>
                      <FormLabel>Billing Cycle *</FormLabel>
                      <FilterSelect
                        value={newManager.billingCycle}
                        onChange={(e) => handleInputChange('billingCycle', e.target.value)}
                      >
                        <option value="monthly">{t('admin:managersPage.monthly')}</option>
                        <option value="annual">{t('admin:managersPage.annual')}</option>
                      </FilterSelect>
                    </FormGroup>

                    <FormGroup>
                      <FormLabel>Subscription Start Date *</FormLabel>
                      <FormInput
                        type="date"
                        value={newManager.subscriptionStart}
                        onChange={(e) => handleInputChange('subscriptionStart', e.target.value)}
                      />
                    </FormGroup>

                    <FormGroup>
                      <FormLabel>{t('admin:managersPage.subscriptionEndDateAuto')}</FormLabel>
                      <FormInput
                        type="date"
                        value={newManager.subscriptionEnd}
                        disabled
                        style={{ backgroundColor: '#F8FAFC', color: '#6B7280' }}
                      />
                    </FormGroup>

                    <FormGroup style={{gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: '8px'}}>
                      <input
                        type="checkbox"
                        checked={newManager.autoRenew}
                        onChange={(e) => handleInputChange('autoRenew', e.target.checked ? 'true' : 'false')}
                        style={{width: '16px', height: '16px', accentColor: '#635BFF'}}
                      />
                      <FormLabel style={{marginBottom: 0}}>{t('admin:managersPage.autorenewSubscription')}</FormLabel>
                    </FormGroup>
                  </>
                )}
              </FormGrid>
              {addModalWarning && (
                <div style={{ padding: '12px', background: '#FEE2E2', border: '1px solid #EF4444', borderRadius: '8px', color: '#DC2626', fontSize: '14px', marginTop: '8px' }}>
                  {addModalWarning}
                </div>
              )}
            
        </CommonModal>
        )}

        {/* Info Modal (password reset result) */}
        {showSuccessModal && (
        <CommonModal isOpen={true} onClose={() => setShowSuccessModal(false)} title="Password Generated" size="small" footer={<>
          {successPassword && <Button variant="secondary" onClick={() => { navigator.clipboard.writeText(successPassword); setPasswordCopied(true); setTimeout(() => setPasswordCopied(false), 2000); }}>{passwordCopied ? 'Copied!' : 'Copy Password'}</Button>}
          <Button variant="primary" onClick={() => setShowSuccessModal(false)}>{t('admin:managersPage.done')}</Button>
        </>}>
          <div style={{ marginBottom: '20px', fontSize: '14px', color: '#6B7280' }}>
            {successMessage} Please share this password securely. They should change it after first login.
          </div>
          {successPassword && (
            <div style={{ background: '#F8FAFC', border: '1px solid #E6EBF1', borderRadius: '8px', padding: '16px', textAlign: 'center', marginBottom: '16px' }}>
              <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px', fontWeight: 600 }}>{t('admin:managersPage.temporaryPassword')}</div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: '#0A2540', fontFamily: 'monospace', letterSpacing: '1px', userSelect: 'all' as const }}>{successPassword}</div>
            </div>
          )}
          <div style={{ fontSize: '12px', color: '#DC2626' }}>{t('admin:managersPage.thisPasswordWillNotBeShownAgainPleaseCopyItNow')}</div>
        </CommonModal>
        )}

        {/* View Manager Modal */}
        {showViewModal && selectedManager && (
                <CommonModal isOpen={true} onClose={() => setShowViewModal(false)} title="Manager Details" footer={<><Button variant="secondary" onClick={() => setShowViewModal(false)}>{t('admin:managersPage.close')}</Button></>}>

              <FormGrid>
                <FormGroup>
                  <FormLabel>{t('admin:managersPage.managerId')}</FormLabel>
                  <FormInput type="text" value={selectedManager.managerId} disabled />
                </FormGroup>
                <FormGroup>
                  <FormLabel>{t('admin:managersPage.fullName')}</FormLabel>
                  <FormInput type="text" value={selectedManager.fullName} disabled />
                </FormGroup>
                <FormGroup>
                  <FormLabel>{t('admin:managersPage.companyName')}</FormLabel>
                  <FormInput type="text" value={selectedManager.companyName} disabled />
                </FormGroup>
                <FormGroup>
                  <FormLabel>{t('admin:managersPage.position')}</FormLabel>
                  <FormInput type="text" value={selectedManager.position} disabled />
                </FormGroup>
                <FormGroup>
                  <FormLabel>{t('admin:managersPage.department')}</FormLabel>
                  <FormInput type="text" value={selectedManager.department} disabled />
                </FormGroup>
                <FormGroup>
                  <FormLabel>{t('admin:managersPage.emailAddress')}</FormLabel>
                  <FormInput type="email" value={selectedManager.email} disabled />
                </FormGroup>
                <FormGroup>
                  <FormLabel>{t('admin:managersPage.phoneNumber')}</FormLabel>
                  <FormInput type="tel" value={formatPhoneForDisplay(selectedManager.phone)} disabled />
                </FormGroup>
                <FormGroup>
                  <FormLabel>{t('admin:managersPage.status')}</FormLabel>
                  <FormInput type="text" value={selectedManager.status === 'active' ? 'Active' : 'Inactive'} disabled />
                </FormGroup>
                <FormGroup>
                  <FormLabel>{t('admin:managersPage.restaurantCount')}</FormLabel>
                  <FormInput type="text" value={selectedManager.restaurantCount.toString()} disabled />
                </FormGroup>
                <FormGroup>
                  <FormLabel>{t('admin:managersPage.totalRevenue')}</FormLabel>
                  <FormInput type="text" value={formatCurrency(selectedManager.totalRevenue, operationSettings.currency)} disabled />
                </FormGroup>
                <FormGroup>
                  <FormLabel>{t('admin:managersPage.createdDate')}</FormLabel>
                  <FormInput type="text" value={selectedManager.createdAt} disabled />
                </FormGroup>
                <FormGroup>
                  <FormLabel>{t('admin:managersPage.lastActive')}</FormLabel>
                  <FormInput type="text" value={selectedManager.lastActive} disabled />
                </FormGroup>
                <FormGroup>
                  <FormLabel>{t('admin:managersPage.address')}</FormLabel>
                  <FormTextarea value={selectedManager.address} disabled />
                </FormGroup>
              </FormGrid>
            
        </CommonModal>
        )}

        {/* Edit Manager Modal */}
        {showEditModal && editingManager && (
                <CommonModal isOpen={true} onClose={() => setShowEditModal(false)} title="Edit Manager" footer={<><Button variant="secondary" onClick={() => { setShowEditModal(false); setEditModalWarning(''); }}>{t('admin:managersPage.cancel')}</Button><Button variant="primary" onClick={handleUpdateManager}>{t('admin:managersPage.updateManager')}</Button></>}>

              <FormGrid>
                <FormGroup>
                  <FormLabel>Manager ID * (Read-only)</FormLabel>
                  <FormInput
                    type="text"
                    value={editingManager.managerId}
                    disabled
                    style={{ backgroundColor: '#F8FAFC', color: '#6B7280' }}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Full Name *</FormLabel>
                  <FormInput
                    type="text"
                    value={editingManager.fullName}
                    onChange={(e) => setEditingManager({...editingManager, fullName: e.target.value})}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Company Name *</FormLabel>
                  <FormInput
                    type="text"
                    value={editingManager.companyName}
                    onChange={(e) => setEditingManager({...editingManager, companyName: e.target.value})}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Position *</FormLabel>
                  <FormInput
                    type="text"
                    value={editingManager.position}
                    onChange={(e) => setEditingManager({...editingManager, position: e.target.value})}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Department *</FormLabel>
                  <FormInput
                    type="text"
                    value={editingManager.department}
                    onChange={(e) => setEditingManager({...editingManager, department: e.target.value})}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Email Address *</FormLabel>
                  <FormInput
                    type="email"
                    value={editingManager.email}
                    onChange={(e) => setEditingManager({...editingManager, email: e.target.value})}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Phone Number *</FormLabel>
                  <PhoneInput
                    value={editingManager.phone}
                    onChange={(value) => setEditingManager({...editingManager, phone: value})}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>{t('admin:managersPage.address')}</FormLabel>
                  <FormTextarea
                    value={editingManager.address}
                    onChange={(e) => setEditingManager({...editingManager, address: e.target.value})}
                  />
                </FormGroup>

                {/* Show Brand General selection for Brand Manager */}
                {editingManager.role === 'Brand Manager' && (
                  <FormGroup>
                    <FormLabel>Brand General * (Parent Manager)</FormLabel>
                    <FilterSelect
                      value={(editingManager as any).manager_id || ''}
                      onChange={(e) => setEditingManager({...editingManager, manager_id: e.target.value} as any)}
                    >
                      <option value="">{t('admin:managersPage.selectBrandGeneral')}</option>
                      {brandGenerals.map((bg: any) => (
                        <option key={bg.id} value={bg.id}>
                          {bg.full_name || bg.username} ({bg.company_name || 'No Company'})
                        </option>
                      ))}
                    </FilterSelect>
                  </FormGroup>
                )}

                {/* Show Foodcourt General selection for Foodcourt Manager */}
                {editingManager.role === 'Foodcourt Manager' && (
                  <FormGroup>
                    <FormLabel>Foodcourt General * (Parent Manager)</FormLabel>
                    <FilterSelect
                      value={(editingManager as any).manager_id || ''}
                      onChange={(e) => setEditingManager({...editingManager, manager_id: e.target.value} as any)}
                    >
                      <option value="">{t('admin:managersPage.selectFoodcourtGeneral')}</option>
                      {foodcourtGenerals.map((fg: any) => (
                        <option key={fg.id} value={fg.id}>
                          {fg.full_name || fg.username} ({fg.company_name || 'No Company'})
                        </option>
                      ))}
                    </FilterSelect>
                  </FormGroup>
                )}

                {/* Subscription Settings - Show for General roles and Owner */}
                {(editingManager.role === 'Foodcourt General' || editingManager.role === 'Brand General' || editingManager.role === 'Restaurant Owner') && (
                  <>
                    <FormGroup style={{gridColumn: '1 / -1', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #E6EBF1'}}>
                      <h3 style={{fontSize: '14px', fontWeight: '600', color: '#0A2540', marginBottom: '12px'}}>{t('admin:managersPage.subscriptionSettings')}</h3>
                    </FormGroup>

                    <FormGroup>
                      <FormLabel>Currency *</FormLabel>
                      <FilterSelect
                        value={normalizeCurrencyCode((editingManager as any).currency || 'MYR')}
                        onChange={(e) => {
                          const cur = e.target.value;
                          const selectedPlan = getFilteredPlans(editingManager.role).find(p => p.display_name === editingManager.planType);
                          setEditingManager({
                            ...editingManager,
                            currency: cur,
                            planAmount: selectedPlan ? String(getPlanPrice(selectedPlan, cur)) : editingManager.planAmount
                          } as any);
                        }}
                      >
                        {planCurrencies.map(cur => (
                          <option key={cur} value={cur}>{cur}</option>
                        ))}
                      </FilterSelect>
                    </FormGroup>

                    <FormGroup>
                      <FormLabel>Subscription Plan *</FormLabel>
                      <FilterSelect
                        value={editingManager.planType || ''}
                        onChange={(e) => {
                          const selectedPlan = getFilteredPlans(editingManager.role).find(p => p.display_name === e.target.value);
                          const cur = normalizeCurrencyCode((editingManager as any).currency || 'MYR');
                          setEditingManager({
                            ...editingManager,
                            planType: e.target.value,
                            planAmount: selectedPlan ? String(getPlanPrice(selectedPlan, cur)) : editingManager.planAmount
                          });
                        }}
                      >
                        <option value="">{t('admin:managersPage.selectPlan')}</option>
                        {getFilteredPlans(editingManager.role).map(plan => (
                          <option key={plan.id} value={plan.display_name}>
                            {plan.display_name} ({formatPlanPrice(plan, normalizeCurrencyCode((editingManager as any).currency || 'MYR'))}/month)
                          </option>
                        ))}
                      </FilterSelect>
                    </FormGroup>

                    <FormGroup>
                      <FormLabel>Billing Cycle *</FormLabel>
                      <FilterSelect
                        value={editingManager.billingCycle || 'monthly'}
                        onChange={(e) => {
                          const cycle = e.target.value as 'monthly' | 'annual';
                          setEditingManager({
                            ...editingManager,
                            billingCycle: cycle,
                            subscriptionEnd: calcSubscriptionEnd(editingManager.subscriptionStart || '', cycle)
                          });
                        }}
                      >
                        <option value="monthly">{t('admin:managersPage.monthly')}</option>
                        <option value="annual">{t('admin:managersPage.annual')}</option>
                      </FilterSelect>
                    </FormGroup>

                    <FormGroup>
                      <FormLabel>Subscription Start Date *</FormLabel>
                      <FormInput
                        type="date"
                        value={editingManager.subscriptionStart || new Date().toISOString().split('T')[0]}
                        onChange={(e) => {
                          const start = e.target.value;
                          setEditingManager({
                            ...editingManager,
                            subscriptionStart: start,
                            subscriptionEnd: calcSubscriptionEnd(start, editingManager.billingCycle || 'monthly')
                          });
                        }}
                      />
                    </FormGroup>

                    <FormGroup>
                      <FormLabel>{t('admin:managersPage.subscriptionEndDateAuto')}</FormLabel>
                      <FormInput
                        type="date"
                        value={editingManager.subscriptionEnd || ''}
                        disabled
                        style={{ backgroundColor: '#F8FAFC', color: '#6B7280' }}
                      />
                    </FormGroup>
                  </>
                )}
              </FormGrid>
              {editModalWarning && (
                <div style={{ padding: '12px', background: '#FEE2E2', border: '1px solid #EF4444', borderRadius: '8px', color: '#DC2626', fontSize: '14px', marginTop: '8px' }}>
                  {editModalWarning}
                </div>
              )}
            
        </CommonModal>
        )}

        {/* Confirm Action Modal */}
        {showConfirmModal && (
                <CommonModal isOpen={true} onClose={() => setShowConfirmModal(false)} title="Confirm Action" footer={<><Button variant="secondary" onClick={() => setShowConfirmModal(false)}>{t('admin:managersPage.cancel')}</Button><Button variant={confirmAction === 'delete' ? 'danger' : 'primary'} onClick={handleConfirmAction} > {confirmAction === 'delete' ? 'Delete' : confirmAction === 'resetPassword' ? 'Reset Password' : 'Confirm'} </Button></>}>

              <div>
                {confirmAction === 'delete' && (
                  <div>
                    <p style={{ margin: '0 0 12px', fontWeight: '600', color: '#DC2626' }}>
                      Are you sure you want to delete "{selectedManager?.fullName}" ({selectedManager?.managerId})?
                    </p>
                    <div style={{ padding: '12px 16px', backgroundColor: '#FEF2F2', borderRadius: '8px', border: '1px solid #FECACA', fontSize: '13px', color: '#991B1B', lineHeight: '1.6' }}>
                      {selectedManager?.role === 'Brand General' && (
                        <>
                          <div>• Brands owned by this user will be unlinked (owner cleared, brands remain)</div>
                          <div>• Restaurants under those brands will not be affected</div>
                          <div>• Operation tickets and notices by this user will be preserved</div>
                          <div>• Activity logs will be preserved (user reference cleared)</div>
                        </>
                      )}
                      {selectedManager?.role === 'Foodcourt General' && (
                        <>
                          <div>• Foodcourts owned by this user will be unlinked (owner cleared, foodcourts remain)</div>
                          <div>• Restaurants under those foodcourts will not be affected</div>
                          <div>• Operation tickets and notices by this user will be preserved</div>
                          <div>• Activity logs will be preserved (user reference cleared)</div>
                        </>
                      )}
                      {selectedManager?.role === 'Restaurant Owner' && (
                        <>
                          <div>• All restaurant ownership links will be removed</div>
                          <div>• Restaurants will remain but without an owner</div>
                          <div>• Operation tickets and notices by this user will be preserved</div>
                          <div>• Activity logs will be preserved (user reference cleared)</div>
                        </>
                      )}
                      <div style={{ marginTop: '8px', fontWeight: '600' }}>{t('admin:managersPage.thisActionCannotBeUndone')}</div>
                    </div>
                  </div>
                )}
                {confirmAction === 'resetPassword' && (
                  <p>Are you sure you want to reset the password for "{selectedManager?.fullName}" ({selectedManager?.managerId})?</p>
                )}
                {confirmAction === 'toggle' && (
                  <p>Are you sure you want to {selectedManager?.status === 'active' ? 'deactivate' : 'activate'} "{selectedManager?.fullName}" ({selectedManager?.managerId})?</p>
                )}
              </div>
            
        </CommonModal>
        )}

        {/* Action Error Modal */}
        {actionError && (
                <CommonModal isOpen={true} onClose={() => setActionError('')} title="Error" footer={<><Button variant="primary" onClick={() => setActionError('')}>{t('admin:managersPage.ok')}</Button></>}>

              <p style={{ color: '#DC2626' }}>{actionError}</p>
            
        </CommonModal>
        )}

        </Content>
      </Container>
    </>
  );
};

export default ManagersPage;