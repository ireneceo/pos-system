import React, { useState, useEffect, useMemo } from 'react';
import ConfirmModal from '../../components/ConfirmModal';
import styled from 'styled-components';
import { getRestaurantDisplayName } from '../../utils/restaurantDisplay';
import { formatEntityAddress, AppLocale } from '../../utils/formatAddress';
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
  ActionButton,
  IconButton,
  EmptyState,
  Modal as CommonModal
} from '../../components/UI';
import { Tabs, Tab, Badge } from '../../components/Common/TabComponents';
import { useTabParam } from '../../hooks/useTabParam';
import { useAuth } from '../../contexts/AuthContext';
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import { formatCurrency, getActivePlanCurrencies } from '../../utils/currency';
import { useStore } from '../../contexts/StoreContext';
import PhoneInput from '../../components/Common/PhoneInput';
import { useTranslation } from 'react-i18next';

import { getAuthToken } from '../../utils/auth';
import SubscriptionFormFields, { type BillingCycle, type PaymentModel, type DiscountType } from '../../components/Subscription/SubscriptionFormFields';
// Auth header helper for API calls
const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

interface Staff {
  id: string;
  username: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  pin_code?: string | null;
  restaurantId?: string;
  restaurantName?: string;
  companyName?: string;
  status: 'active' | 'inactive';
  joinDate: string;
  lastActive: string;
  permissions: string[];
  is_demo?: boolean;
  is_test?: boolean;
}

// Common components now imported from ../../components/UI
// Page-specific styled components below

// 페이지별 반응형 테이블 헤더 (StaffManagement 전용)
// 1024px 이하에서는 CommonTableRow 가 display:block 으로 변환되어 MobileGrid 가 자동 카드 배치.
// 데스크탑(>=1024px)에서는 6 column grid 그대로 유지. 컬럼 숨김 hack 제거.
const StaffTableHeader = styled(CommonTableHeader)``;
const StaffTableRow = styled(CommonTableRow)``;

const StaffInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    gap: 10px;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #F1F4F8;
  }
`;

const StaffAvatar = styled.div<{ role: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
  color: white;
  flex-shrink: 0;
  background: ${props => {
    switch(props.role) {
      case 'System Admin': return '#DC2626';
      case 'Restaurant Admin': return '#059669';
      case 'Staff': return '#7C3AED';
      case 'Foodcourt Manager': return '#D97706';
      case 'Foodcourt General': return '#EA580C';
      case 'Brand Manager': return '#2563EB';
      case 'Brand General': return '#1D4ED8';
      default: return '#4B5563';
    }
  }};

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    font-size: 14px;
  }
`;

const StaffDetails = styled.div``;

const StaffName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const StaffEmail = styled.div`
  font-size: 12px;
  color: #4B5563;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;

  @media (max-width: 768px) {
    font-size: 11px;
  }
`;

const RoleBadge = styled.span<{ role: string }>`
  display: inline-block;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 600;
  text-align: center;
  line-height: 1.4;
  max-width: 100%;
  word-wrap: break-word;
  background: ${props => {
    switch(props.role) {
      case 'System Admin': return '#FEE2E2';
      case 'Restaurant Admin': return '#ECFDF5';
      case 'Staff': return '#EDE9FE';
      case 'Foodcourt Manager': return '#FEF3C7';
      case 'Foodcourt General': return '#FED7AA';
      case 'Brand Manager': return '#DBEAFE';
      case 'Brand General': return '#BFDBFE';
      default: return '#F1F4F8';
    }
  }};
  color: ${props => {
    switch(props.role) {
      case 'System Admin': return '#DC2626';
      case 'Restaurant Admin': return '#059669';
      case 'Staff': return '#7C3AED';
      case 'Foodcourt Manager': return '#D97706';
      case 'Foodcourt General': return '#EA580C';
      case 'Brand Manager': return '#2563EB';
      case 'Brand General': return '#1D4ED8';
      default: return '#4B5563';
    }
  }};

  @media (max-width: 768px) {
    font-size: 10px;
    padding: 4px 10px;
  }
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
      default: return '#F1F4F8';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'active': return '#059669';
      case 'inactive': return '#DC2626';
      default: return '#4B5563';
    }
  }};

  @media (max-width: 768px) {
    font-size: 10px;
    padding: 4px 10px;
  }
`;

const IconSymbol = styled.span`
  font-size: 16px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #4B5563;
  display: inline-block;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;


const FormGrid = styled.div`
  display: grid;
  gap: 20px;
  margin-bottom: 24px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const Select = styled.select`
  padding: 12px 16px;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  font-size: 14px;
  background: white;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:disabled {
    background: #F1F4F8;
    color: #4B5563;
    cursor: not-allowed;
  }
`;

const RestaurantSearchInput = styled(Input)`
  width: 100%;
`;

const DropdownContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  max-height: 240px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  margin-top: 4px;
`;

const DropdownItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid #F1F4F8;
  transition: background 0.15s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #F1F4F8;
  }
`;

const DropdownItemTitle = styled.div`
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 4px;
`;

const DropdownItemSubtitle = styled.div`
  font-size: 12px;
  color: #4B5563;
`;

const SelectedBadge = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background: #ECFDF5;
  border: 1px solid #10B981;
  border-radius: 6px;
  margin-top: 8px;
  font-size: 14px;
  color: #059669;

  strong {
    margin-left: 4px;
    color: #047857;
  }
`;


const ErrorMessage = styled.div`
  padding: 12px 16px;
  background: #FEE2E2;
  border: 1px solid #FCA5A5;
  border-radius: 6px;
  color: #991B1B;
  font-size: 14px;
  line-height: 1.5;
`;

const AdminStaffManagementPage: React.FC = () => {
  const { t, i18n } = useTranslation('admin');
  const { user: currentUser } = useAuth();
  const { operationSettings } = useStore();
  const [activeTab, handleTabChange] = useTabParam<'all' | 'System Admin' | 'Restaurant Admin' | 'Staff' | 'Managers'>('all');
  const [infoModal, setInfoModal] = useState<{ open: boolean; title: string; message: string }>({ open: false, title: '', message: '' });
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [restaurantFilter, setRestaurantFilter] = useState('all');
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [restaurantSearchQuery, setRestaurantSearchQuery] = useState('');
  const [restaurantSearchResults, setRestaurantSearchResults] = useState<any[]>([]);
  const [showRestaurantDropdown, setShowRestaurantDropdown] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);
  const [editRestaurantSearchQuery, setEditRestaurantSearchQuery] = useState('');
  const [editRestaurantSearchResults, setEditRestaurantSearchResults] = useState<any[]>([]);
  const [showEditRestaurantDropdown, setShowEditRestaurantDropdown] = useState(false);
  const [editSelectedRestaurant, setEditSelectedRestaurant] = useState<any>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [viewingPermissions, setViewingPermissions] = useState<Staff | null>(null);
  const [editingPermissions, setEditingPermissions] = useState<string[]>([]);
  const [newStaff, setNewStaff] = useState({
    username: '',
    name: '',
    email: '',
    phone: '',
    type: 'restaurant_staff' as 'restaurant_staff' | 'company_staff' | 'freelancer' | 'our_staff',
    role: '',
    department: '',
    restaurantId: '',
    companyName: '',
    pin_code: '',
    // v3.27 unified subscription form (Brand/Foodcourt General + Restaurant Owner + Supplier Admin)
    currency: 'MYR',
    planType: '',
    planAmount: '0',
    billingCycle: '' as '' | 'monthly' | 'annual',
    paymentModel: 'self_pay' as 'self_pay' | 'brand_pays' | 'foodcourt_pays',
    subscriptionStart: '',
    subscriptionEnd: '',
    autoRenew: true,
    treatAsTrial: false,
    activateNow: true,
    discountType: 'none' as 'none' | 'percentage' | 'fixed',
    discountValue: '0',
    discountReason: ''
  });
  const [formError, setFormError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [successPassword, setSuccessPassword] = useState('');
  const [passwordCopied, setPasswordCopied] = useState(false);
  const [availablePlans, setAvailablePlans] = useState<any[]>([]);
  const planCurrencies = useMemo(() => getActivePlanCurrencies(availablePlans), [availablePlans]);

  useEffect(() => {
    fetch('/api/plans', { headers: { Authorization: `Bearer ${getAuthToken()}` } })
      .then(r => r.ok ? r.json() : [])
      .then(j => {
        // /api/plans 는 array 직접 반환 (ManagersPage 와 동일 패턴)
        const arr = Array.isArray(j) ? j : (Array.isArray(j?.data) ? j.data : []);
        setAvailablePlans(arr);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        console.log('👥 [Admin] Fetching all staff across system...');
        
        // Fetch all users in system
        const usersResponse = await fetch('/api/users', { headers: getAuthHeaders() });
        console.log('📡 Users API response status:', usersResponse.status);

        if (usersResponse.ok) {
          const usersData = await usersResponse.json();
          console.log('👥 All users data from API:', usersData);

          // Fetch all restaurants to map staff to restaurants
          const restaurantsResponse = await fetch('/api/restaurants', { headers: getAuthHeaders() });
          const restaurantsData = restaurantsResponse.ok ? await restaurantsResponse.json() : [];
          console.log('🏪 All restaurants data:', restaurantsData);

          // Store restaurants in state for form dropdowns
          if (Array.isArray(restaurantsData)) {
            setRestaurants(restaurantsData);
          }

          // Create restaurant map
          const restaurantMap: Record<number, { name: string; company: string }> = {};
          if (Array.isArray(restaurantsData)) {
            restaurantsData.forEach((restaurant: any) => {
              restaurantMap[restaurant.id] = {
                name: restaurant.name,
                company: restaurant.company_name || 'Purple Here'
              };
            });
          }
          
          // Transform all users to staff format - handle both data array and direct array
          const usersArray = usersData.data || usersData;
          const transformedStaff: Staff[] = usersArray
            .map((user: any) => {
              let type: 'restaurant_staff' | 'company_staff' | 'freelancer' | 'our_staff';
              let companyName = 'Purple Here';
              let restaurantName;

              // Determine type based on role
              const managerRoles = ['Foodcourt Manager', 'Foodcourt General', 'Brand Manager', 'Brand General'];

              if (user.role === 'System Admin') {
                type = 'our_staff';
                companyName = user.company_name || 'Purple Here';
              } else if (managerRoles.includes(user.role)) {
                type = 'company_staff';
                companyName = user.company_name || 'Purple Here';
              } else if (user.role === 'Restaurant Admin' || user.role === 'Staff') {
                if (user.restaurant_id) {
                  type = 'restaurant_staff';
                  // Use restaurant_name from API first, fallback to restaurantMap
                  restaurantName = user.restaurant_name || restaurantMap[user.restaurant_id]?.name || 'Unknown Restaurant';
                  companyName = restaurantMap[user.restaurant_id]?.company || 'Purple Here';
                } else {
                  type = 'our_staff';
                }
              } else {
                // Default fallback
                type = 'company_staff';
              }
              
              return {
                id: user.id.toString(),
                username: user.username || '',
                name: user.full_name || user.username || 'Unknown',
                email: user.email,
                phone: user.phone || '+60 12-345-6789',
                type,
                role: user.role,
                department: user.restaurant_id ? 'Restaurant Operations' :
                           user.role === 'System Admin' ? 'Administration' : 'Operations',
                pin_code: user.pin_code || null,
                restaurantId: user.restaurant_id?.toString(),
                restaurantName,
                companyName,
                status: 'active' as const,
                joinDate: user.createdAt ? new Date(user.createdAt).toISOString().split('T')[0] : '2024-01-01',
                lastActive: 'Active',
                permissions: user.role === 'System Admin' ? ['all'] :
                            user.role === 'Restaurant Admin' ? ['pos', 'inventory', 'reports'] :
                            ['pos'],
                is_demo: user.is_demo || false
              };
            });

          console.log('✅ [Admin] Transformed all staff data:', transformedStaff);
          setStaffList(transformedStaff);
        } else {
          console.error('Failed to fetch users data');
        }
      } catch (error) {
        console.error('Error fetching staff data:', error);
      }
    };

    fetchStaff();
  }, []);

  // Filter staff based on active tab and filters
  const filteredStaff = staffList.filter(staff => {
    // Tab filter (now based on role instead of type)
    if (activeTab !== 'all') {
      if (activeTab === 'Managers') {
        // For Managers tab, show all 4 manager roles
        const managerRoles = ['Foodcourt General', 'Foodcourt Manager', 'Brand General', 'Brand Manager'];
        if (!managerRoles.includes(staff.role)) return false;
      } else if (staff.role !== activeTab) {
        return false;
      }
    }
    
    // Search filter
    if (searchQuery && !staff.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !staff.email.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !(staff.restaurantName && staff.restaurantName.toLowerCase().includes(searchQuery.toLowerCase()))) {
      return false;
    }
    
    // Role filter
    if (roleFilter !== 'all' && staff.role !== roleFilter) {
      return false;
    }
    
    // Status filter
    if (statusFilter !== 'all' && staff.status !== statusFilter) {
      return false;
    }
    
    // Restaurant filter (only for restaurant staff)
    if (restaurantFilter !== 'all' && staff.restaurantId !== restaurantFilter) {
      return false;
    }
    
    return true;
  });

  // Calculate statistics by role
  const managerRoles = ['Foodcourt General', 'Foodcourt Manager', 'Brand General', 'Brand Manager'];
  const stats = {
    total: staffList.length,
    systemAdmin: staffList.filter(s => s.role === 'System Admin').length,
    restaurantAdmin: staffList.filter(s => s.role === 'Restaurant Admin').length,
    staff: staffList.filter(s => s.role === 'Staff').length,
    managers: staffList.filter(s => managerRoles.includes(s.role)).length,
    active: staffList.filter(s => s.status === 'active').length
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
    // 현재 필터링된 스탭 리스트를 사용하여 CSV 데이터 생성
    const csvData = filteredStaff.map(staff => ({
      'Staff Member': staff.name,
      'Email': staff.email,
      'Company & Location': `${staff.companyName} - ${staff.restaurantName || 'Head Office'}`,
      'Role': staff.role,
      'Department': staff.department,
      'Status': staff.status,
      'Phone': staff.phone,
      'Join Date': staff.joinDate,
      'Last Active': staff.lastActive
    }));

    const csvContent = convertToCSV(csvData);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `staff-export-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleAddStaff = () => {
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setFormError('');
    setSelectedRestaurant(null);
    setRestaurantSearchQuery('');
    setNewStaff({
      username: '',
      name: '',
      email: '',
      phone: '',
      type: 'restaurant_staff',
      role: '',
      department: '',
      restaurantId: '',
      companyName: '',
      pin_code: '',
      currency: 'MYR',
      planType: '',
      planAmount: '0',
      billingCycle: '' as '' | 'monthly' | 'annual',
      paymentModel: 'self_pay' as 'self_pay' | 'brand_pays' | 'foodcourt_pays',
      subscriptionStart: '',
      subscriptionEnd: '',
      autoRenew: true,
      treatAsTrial: false,
      activateNow: true,
      discountType: 'none' as 'none' | 'percentage' | 'fixed',
      discountValue: '0',
      discountReason: ''
    });
  };

  const handleSubmitStaff = async () => {
    // Clear previous error
    setFormError('');

    // Validate required fields in order
    if (!newStaff.role) {
      setFormError('Role selection is required');
      return;
    }

    if (!newStaff.username || newStaff.username.trim() === '') {
      setFormError('Staff ID (Username) is required');
      return;
    }

    if (!newStaff.name || newStaff.name.trim() === '') {
      setFormError('Full Name is required');
      return;
    }

    if (!newStaff.email || newStaff.email.trim() === '') {
      setFormError('Email address is required');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newStaff.email)) {
      setFormError('Please enter a valid email address');
      return;
    }

    // Validate restaurant selection for Restaurant Admin and Staff roles
    if ((newStaff.role === 'Restaurant Admin' || newStaff.role === 'Staff') && !selectedRestaurant && !newStaff.restaurantId) {
      setFormError('Please select a restaurant for Restaurant Admin and Staff roles');
      return;
    }

    try {
      // Create new staff/user in database
      const staffUserData: Record<string, any> = {
        username: newStaff.username.trim(),
        email: newStaff.email.trim(),
        role: newStaff.role,
        full_name: newStaff.name.trim(),
        phone: newStaff.phone ? newStaff.phone.trim() : null,
        department: newStaff.department ? newStaff.department.trim() : null,
        company_name: newStaff.companyName ? newStaff.companyName.trim() : null,
        restaurant_id: newStaff.restaurantId ? parseInt(newStaff.restaurantId) : null,
        manager_id: null
      };
      if ((newStaff.pin_code || '').length === 4) {
        staffUserData.pin_code = newStaff.pin_code;
      }

      // Subscription fields — Brand/Foodcourt General + Restaurant Owner + Supplier Admin
      const SUBSCRIBING_ROLES = ['Brand General', 'Foodcourt General', 'Restaurant Owner', 'Supplier Admin'];
      if (SUBSCRIBING_ROLES.includes(newStaff.role) && newStaff.planType && newStaff.subscriptionStart) {
        staffUserData.plan_type = newStaff.planType;
        staffUserData.plan_amount = parseFloat(newStaff.planAmount) || 0;
        staffUserData.billing_cycle = newStaff.billingCycle || 'monthly';
        staffUserData.currency = newStaff.currency || 'MYR';
        staffUserData.subscription_start = newStaff.subscriptionStart;
        staffUserData.subscription_end = newStaff.subscriptionEnd || null;
        staffUserData.auto_renew = newStaff.autoRenew;
        staffUserData.discount_type = newStaff.discountType || 'none';
        staffUserData.discount_value = newStaff.discountType === 'none' ? 0 : (parseFloat(newStaff.discountValue) || 0);
        staffUserData.discount_reason = newStaff.discountType === 'none' ? null : (newStaff.discountReason || null);
      }

      console.log('🔄 [Admin] Creating new staff user:', staffUserData);

      const response = await fetch('/api/users', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(staffUserData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ [Admin] Failed to create staff:', errorData);
        setFormError(errorData.error || 'Failed to create staff. Please try again.');
        return; // Don't proceed if creation failed
      }

      // Only proceed if response is OK
      const result = await response.json();
      console.log('✅ [Admin] Staff created successfully:', result);

      // Close modal first
      handleCloseModal();

      // Show success message with generated password
      setSuccessMessage(`Staff member "${newStaff.username}" created successfully.`);
      setSuccessPassword(result.generatedPassword || '');
      setPasswordCopied(false);
      setShowSuccessModal(true);

      // Refresh staff list only after successful creation
      const usersResponse = await fetch('/api/users', { headers: getAuthHeaders() });
      if (usersResponse.ok) {
        const usersData = await usersResponse.json();
        const restaurantsResponse = await fetch('/api/restaurants', { headers: getAuthHeaders() });
        const restaurantsData = restaurantsResponse.ok ? await restaurantsResponse.json() : [];

        const restaurantMap: Record<number, { name: string; company: string }> = {};
        if (Array.isArray(restaurantsData)) {
          restaurantsData.forEach((restaurant: any) => {
            restaurantMap[restaurant.id] = {
              name: restaurant.name,
              company: restaurant.company_name || 'OrderHere'
            };
          });
        }

        // Handle both response formats: { data: [...] } or { success: true, data: [...] }
        const usersList = usersData.data || usersData;
        if (!Array.isArray(usersList)) {
          console.error('Invalid users data format:', usersData);
          throw new Error('Invalid users data format');
        }

        const transformedStaff: Staff[] = usersList
          .map((user: any) => {
            let type: 'restaurant_staff' | 'company_staff' | 'freelancer' | 'our_staff';
            let companyName = 'OrderHere';
            let restaurantName;

            // Determine type based on role
            const managerRoles = ['Foodcourt Manager', 'Foodcourt General', 'Brand Manager', 'Brand General'];

            if (user.role === 'System Admin') {
              type = 'our_staff';
              companyName = user.company_name || 'Purple Here';
            } else if (managerRoles.includes(user.role)) {
              type = 'company_staff';
              companyName = user.company_name || 'Purple Here';
            } else if (user.role === 'Restaurant Admin' || user.role === 'Staff') {
              if (user.restaurant_id) {
                type = 'restaurant_staff';
                const restaurantInfo = restaurantMap[user.restaurant_id];
                // Use restaurant_name from API first, fallback to restaurantMap
                restaurantName = user.restaurant_name || restaurantInfo?.name || 'Unknown Restaurant';
                companyName = restaurantInfo?.company || 'Purple Here';
              } else {
                type = 'our_staff';
              }
            } else {
              // Default fallback
              type = 'company_staff';
            }

            return {
              id: user.id.toString(),
              username: user.username || '',
              name: user.full_name || user.username || 'Unknown',
              email: user.email,
              phone: user.phone || '',
              type,
              role: user.role,
              department: user.department || '',
              pin_code: user.pin_code || null,
              restaurantId: user.restaurant_id?.toString(),
              restaurantName,
              companyName,
              status: 'active' as const,
              joinDate: user.createdAt ? new Date(user.createdAt).toISOString().split('T')[0] : '2024-01-01',
              lastActive: 'Active',
              permissions: user.permissions || []
            };
          });

        setStaffList(transformedStaff);
      }
    } catch (error) {
      console.error('Error creating staff:', error);
      setFormError('An error occurred while creating staff. Please try again.');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setNewStaff(prev => {
      const updated = { ...prev, [field]: value };

      // Automatically set type based on role
      if (field === 'role') {
        switch (value) {
          case 'Staff':
          case 'Restaurant Admin':
            updated.type = 'restaurant_staff';
            break;
          case 'System Admin':
            updated.type = 'our_staff';
            break;
          default:
            updated.type = 'company_staff';
        }
      }

      return updated;
    });

    // Clear restaurant selection when role changes to non-restaurant roles
    if (field === 'role' && value !== 'Restaurant Admin' && value !== 'Staff') {
      setSelectedRestaurant(null);
      setRestaurantSearchQuery('');
      setRestaurantSearchResults([]);
      setShowRestaurantDropdown(false);
    }
  };

  const handleRestaurantSearch = (query: string) => {
    setRestaurantSearchQuery(query);
    setShowRestaurantDropdown(true);

    if (query.length < 1) {
      setRestaurantSearchResults(restaurants.slice(0, 10));
      return;
    }

    const filtered = restaurants.filter(restaurant =>
      restaurant.name && restaurant.name.toLowerCase().includes(query.toLowerCase())
    );
    setRestaurantSearchResults(filtered.slice(0, 10));
  };

  const handleRestaurantSelect = (restaurant: any) => {
    setSelectedRestaurant(restaurant);
    setRestaurantSearchQuery(restaurant.name);
    setShowRestaurantDropdown(false);
    setNewStaff(prev => ({ ...prev, restaurantId: restaurant.id }));
  };

  const handleEditRestaurantSearch = (query: string) => {
    setEditRestaurantSearchQuery(query);
    setShowEditRestaurantDropdown(true);

    if (query.length < 1) {
      setEditRestaurantSearchResults(restaurants.slice(0, 10));
      return;
    }

    const filtered = restaurants.filter(restaurant =>
      restaurant.name && restaurant.name.toLowerCase().includes(query.toLowerCase())
    );
    setEditRestaurantSearchResults(filtered.slice(0, 10));
  };

  const handleEditRestaurantSelect = (restaurant: any) => {
    setEditSelectedRestaurant(restaurant);
    setEditRestaurantSearchQuery(restaurant.name);
    setShowEditRestaurantDropdown(false);
    setEditingStaff(prev => ({ ...prev!, restaurantId: restaurant.id }));
  };

  const handleEditStaff = (staff: Staff) => {
    setEditingStaff(staff);

    // Set restaurant search query for edit modal
    if (staff.restaurantId) {
      const restaurant = restaurants.find(r => r.id === staff.restaurantId);
      if (restaurant) {
        setEditRestaurantSearchQuery(restaurant.name);
        setEditSelectedRestaurant(restaurant);
      }
    } else {
      setEditRestaurantSearchQuery('');
      setEditSelectedRestaurant(null);
    }

    setShowEditModal(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleViewPermissions = (staff: Staff) => {
    setViewingPermissions(staff);
    setEditingPermissions([...getPermissionsByRole(staff.role)]);
    setShowPermissionsModal(true);
  };

  const handleClosePermissionsModal = () => {
    setShowPermissionsModal(false);
    setViewingPermissions(null);
    setEditingPermissions([]);
  };

  const handleUpdatePermissions = async () => {
    if (!viewingPermissions) return;

    try {
      console.log('🔄 [Admin] Updating permissions for user:', viewingPermissions.id, 'New role:', viewingPermissions.role);

      const response = await fetch(`/api/users/${viewingPermissions.id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          role: viewingPermissions.role
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ [Admin] Failed to update permissions:', errorData);
        setInfoModal({ open: true, title: 'Permission Update Failed', message: `Failed to update permission: ${errorData.error || 'Unknown error'}` });
        return;
      }

      const responseData = await response.json();
      console.log('✅ [Admin] Permissions update successful:', responseData);

      // Close modal first
      setShowPermissionsModal(false);
      setViewingPermissions(null);

      // Reload fresh data from database to ensure sync
      const updatedResponse = await fetch(`/api/users/${viewingPermissions.id}`, { headers: getAuthHeaders() });
      if (updatedResponse.ok) {
        const updatedResult = await updatedResponse.json();
        const updatedUser = updatedResult.data || updatedResult;

        // Fetch restaurants data to recalculate type and company info
        const restaurantsResponse = await fetch('/api/restaurants', { headers: getAuthHeaders() });
        const restaurantsData = restaurantsResponse.ok ? await restaurantsResponse.json() : [];

        const restaurantMap: Record<number, { name: string; company: string }> = {};
        if (Array.isArray(restaurantsData)) {
          restaurantsData.forEach((restaurant: any) => {
            restaurantMap[restaurant.id] = {
              name: restaurant.name,
              company: restaurant.company_name || 'OrderHere'
            };
          });
        }

        // Recalculate type, companyName, and restaurantName based on updated role
        let type: 'restaurant_staff' | 'company_staff' | 'freelancer' | 'our_staff';
        let companyName = 'OrderHere';
        let restaurantName;

        const managerRoles = ['Foodcourt Manager', 'Foodcourt General', 'Brand Manager', 'Brand General'];

        if (updatedUser.role === 'System Admin') {
          type = 'our_staff';
          companyName = updatedUser.company_name || 'OrderHere';
        } else if (managerRoles.includes(updatedUser.role)) {
          type = 'company_staff';
          companyName = updatedUser.company_name || 'OrderHere';
        } else if (updatedUser.role === 'Restaurant Admin' || updatedUser.role === 'Staff') {
          if (updatedUser.restaurant_id) {
            type = 'restaurant_staff';
            const restaurantInfo = restaurantMap[updatedUser.restaurant_id];
            restaurantName = updatedUser.restaurant_name || restaurantInfo?.name || 'Unknown Restaurant';
            companyName = restaurantInfo?.company || 'Purple Here';
          } else {
            type = 'our_staff';
          }
        } else {
          type = 'company_staff';
        }

        // Update the specific staff member in local state
        setStaffList(prevStaff =>
          prevStaff.map(staff =>
            staff.id === viewingPermissions.id
              ? {
                  ...staff,
                  role: updatedUser.role,
                  permissions: editingPermissions,
                  type,
                  companyName,
                  restaurantName
                }
              : staff
          )
        );
      } else {
        // If we can't get fresh data, just force reload
        window.location.reload();
      }
    } catch (error) {
      console.error('Error updating role:', error);
      // 실패 시 모달은 열어둔 채로 유지
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const togglePermission = (permission: string) => {
    setEditingPermissions(prev =>
      prev.includes(permission)
        ? prev.filter(p => p !== permission)
        : [...prev, permission]
    );
  };

  const getPermissionsByRole = (role: string): string[] => {
    switch (role) {
      case 'System Admin':
        return ['Full System Management', 'All User Management', 'Subscription Management', 'Invoice Management', 'System Settings'];
      case 'Restaurant Admin':
        return ['POS System', 'Menu Management', 'Order Management', 'Staff Management', 'Sales Reports'];
      case 'Staff':
        return ['POS System', 'Order Processing', 'Customer Service'];
      default:
        return ['Basic Access'];
    }
  };

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingStaff, setDeletingStaff] = useState<Staff | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState<'toggle' | 'resetPassword' | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);

  const deleteStaff = async (staff: Staff) => {
    setDeletingStaff(staff);
    setShowDeleteConfirm(true);
  };

  const handleToggleStaffStatus = (staff: Staff) => {
    setSelectedStaff(staff);
    setConfirmAction('toggle');
    setShowConfirmModal(true);
  };

  const handleResetStaffPassword = (staff: Staff) => {
    setSelectedStaff(staff);
    setConfirmAction('resetPassword');
    setShowConfirmModal(true);
  };

  const handleConfirmAction = async () => {
    if (!selectedStaff || !confirmAction) return;

    try {
      if (confirmAction === 'toggle') {
        const newStatus = selectedStaff.status === 'active' ? 'inactive' : 'active';

        const response = await fetch(`/api/users/${selectedStaff.id}`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify({
            status: newStatus
          })
        });

        if (response.ok) {
          // Update local state
          setStaffList(prev => prev.map(staff =>
            staff.id === selectedStaff.id ? { ...staff, status: newStatus } : staff
          ));
          setInfoModal({ open: true, title: 'Status Updated', message: `Staff ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully.` });
        } else {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Status update failed');
        }
      } else if (confirmAction === 'resetPassword') {
        const response = await fetch(`/api/users/${selectedStaff.id}/reset-password`, {
          method: 'POST',
          headers: getAuthHeaders()
        });

        if (response.ok) {
          const result = await response.json();
          setSuccessMessage(`Password for "${selectedStaff.username || selectedStaff.email}" has been reset.`);
          setSuccessPassword(result.tempPassword || '');
          setPasswordCopied(false);
          setShowSuccessModal(true);
        } else {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Password reset failed');
        }
      }
    } catch (error) {
      console.error('❌ Action failed:', error);
      setInfoModal({ open: true, title: 'Action Failed', message: `Action failed: ${error.message}. Please try again.` });
    }

    setShowConfirmModal(false);
    setSelectedStaff(null);
    setConfirmAction(null);
  };

  const confirmDelete = async () => {
    if (!deletingStaff) return;

    try {
      const response = await fetch(`/api/users/${deletingStaff.id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (response.ok) {
        setStaffList(prevStaff => prevStaff.filter(s => s.id !== deletingStaff.id));
        setShowDeleteConfirm(false);
        setDeletingStaff(null);
      } else {
        const errorData = await response.json().catch(() => ({}));
        setInfoModal({ open: true, title: 'Delete Failed', message: `Failed to delete: ${errorData.error || errorData.message || `HTTP ${response.status}`}` });
      }
    } catch (error: any) {
      setInfoModal({ open: true, title: 'Delete Failed', message: `Error deleting staff: ${error.message || error}` });
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setDeletingStaff(null);
  };

  const handleUpdateStaff = async () => {
    if (!editingStaff) return;

    // Validate required fields
    if (!editingStaff.name || editingStaff.name.trim() === '') {
      setInfoModal({ open: true, title: 'Required Fields', message: 'Full Name is required.' });
      return;
    }

    if (!editingStaff.email || editingStaff.email.trim() === '') {
      setInfoModal({ open: true, title: 'Required Fields', message: 'Email is required.' });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editingStaff.email)) {
      setInfoModal({ open: true, title: 'Invalid Email', message: 'Please enter a valid email address.' });
      return;
    }

    if (!editingStaff.role) {
      setInfoModal({ open: true, title: 'Required Fields', message: 'Role is required.' });
      return;
    }

    try {
      console.log('🔄 [Admin] Updating staff:', editingStaff);

      const requestData: Record<string, any> = {
        full_name: editingStaff.name.trim(),
        email: editingStaff.email.trim(),
        role: editingStaff.role,
        department: editingStaff.department ? editingStaff.department.trim() : null,
        phone: editingStaff.phone ? editingStaff.phone.trim() : null
      };
      // 카운터(POS) 운영 권한 — Staff 만 적용. 서빙 전용은 pos_counter 제거. (Admin 은 역할로 항상 가능)
      if (editingStaff.role === 'Staff') {
        requestData.permissions = Array.isArray(editingStaff.permissions) ? editingStaff.permissions : [];
      }
      if (editingStaff.pin_code && editingStaff.pin_code.length === 4) {
        requestData.pin_code = editingStaff.pin_code;
      }

      console.log('📝 [Admin] Request data:', requestData);

      const response = await fetch(`/api/users/${editingStaff.id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(requestData)
      });

      console.log('📝 [Admin] Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ [Admin] Failed to update staff:', errorData);
        setInfoModal({ open: true, title: 'Update Failed', message: `Failed to update staff: ${errorData.error || 'Unknown error'}` });
        return;
      }

      const responseData = await response.json();
      console.log('✅ [Admin] Update successful:', responseData);

      // Close modal first
      setShowEditModal(false);
      setEditingStaff(null);

      // Reload fresh data from database to ensure sync
      const updatedResponse = await fetch(`/api/users/${editingStaff.id}`, { headers: getAuthHeaders() });
      if (updatedResponse.ok) {
        const updatedResult = await updatedResponse.json();
        const updatedUser = updatedResult.data || updatedResult;

        // Fetch restaurants data to recalculate type and company info
        const restaurantsResponse = await fetch('/api/restaurants', { headers: getAuthHeaders() });
        const restaurantsData = restaurantsResponse.ok ? await restaurantsResponse.json() : [];

        const restaurantMap: Record<number, { name: string; company: string }> = {};
        if (Array.isArray(restaurantsData)) {
          restaurantsData.forEach((restaurant: any) => {
            restaurantMap[restaurant.id] = {
              name: restaurant.name,
              company: restaurant.company_name || 'OrderHere'
            };
          });
        }

        // Recalculate type, companyName, and restaurantName based on updated role
        let type: 'restaurant_staff' | 'company_staff' | 'freelancer' | 'our_staff';
        let companyName = 'OrderHere';
        let restaurantName;

        const managerRoles = ['Foodcourt Manager', 'Foodcourt General', 'Brand Manager', 'Brand General'];

        if (updatedUser.role === 'System Admin') {
          type = 'our_staff';
          companyName = updatedUser.company_name || 'OrderHere';
        } else if (managerRoles.includes(updatedUser.role)) {
          type = 'company_staff';
          companyName = updatedUser.company_name || 'OrderHere';
        } else if (updatedUser.role === 'Restaurant Admin' || updatedUser.role === 'Staff') {
          if (updatedUser.restaurant_id) {
            type = 'restaurant_staff';
            const restaurantInfo = restaurantMap[updatedUser.restaurant_id];
            restaurantName = updatedUser.restaurant_name || restaurantInfo?.name || 'Unknown Restaurant';
            companyName = restaurantInfo?.company || 'Purple Here';
          } else {
            type = 'our_staff';
          }
        } else {
          type = 'company_staff';
        }

        // Update the specific staff member in local state
        setStaffList(prevStaff =>
          prevStaff.map(staff =>
            staff.id === editingStaff.id
              ? {
                  ...staff,
                  name: updatedUser.full_name,
                  email: updatedUser.email,
                  role: updatedUser.role,
                  department: updatedUser.department,
                  phone: updatedUser.phone,
                  pin_code: updatedUser.pin_code || null,
                  type,
                  companyName,
                  restaurantName
                }
              : staff
          )
        );
      } else {
        // If we can't get fresh data, just force reload
        window.location.reload();
      }

    } catch (error) {
      console.error('❌ [Admin] Error updating staff:', error);
      setInfoModal({ open: true, title: 'Update Failed', message: `Staff update error: ${error.message}` });
    }
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditingStaff(null);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handlePromoteStaff = async (staff: Staff) => {
    const roles = ['Staff', 'Restaurant Admin', 'System Admin'];
    const currentIndex = roles.indexOf(staff.role);
    if (currentIndex >= roles.length - 1) {
      return;
    }

    setSelectedStaff(staff);
    setConfirmAction('toggle' as any);
    setShowConfirmModal(true);
  };

  const getInitials = (name: string) => {
    if (!name) return '?';

    const words = name.trim().split(' ').filter(word => word.length > 0);

    if (words.length === 0) return '?';

    // If single word, take first 2 characters
    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    }

    // If multiple words, take first character of each word (max 2)
    return words
      .slice(0, 2)
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  // Get unique restaurants for filter
  const uniqueRestaurants = Array.from(
    new Map(staffList
      .filter(s => s.restaurantId && s.restaurantName && s.restaurantName.trim() !== '')
      .map(s => [s.restaurantId!, { id: s.restaurantId!, name: s.restaurantName! }])
    ).values()
  );

  // Get unique roles for filter (exclude Manager)
  const roles = Array.from(new Set(staffList.map(s => s.role))).filter(role => role !== 'Manager');

  return (
    <>
      <Container>
        <Header>
          <Title>{t('admin:staffManagementPage.staffManagement')}</Title>
          <ActionSection>
            <Button variant="secondary" onClick={handleExportData}>{t('admin:staffManagementPage.export')}</Button>
            <Button variant="primary" onClick={handleAddStaff}>
              Add Staff
            </Button>
          </ActionSection>
        </Header>
        
        <Content>
          <StatsGrid>
            <StatCard color="#059669">
              <StatValue>{stats.total}</StatValue>
              <StatLabel>{t('admin:staffManagementPage.totalStaff')}</StatLabel>
              <StatDescription>{t('admin:staffManagementPage.acrossEntireSystem')}</StatDescription>
            </StatCard>
            <StatCard color="#2563EB">
              <StatValue>{stats.managers}</StatValue>
              <StatLabel>{t('admin:staffManagementPage.managers')}</StatLabel>
              <StatDescription>4 manager roles</StatDescription>
            </StatCard>
            <StatCard color="#7C3AED">
              <StatValue>{stats.active}</StatValue>
              <StatLabel>{t('admin:staffManagementPage.activeStaff')}</StatLabel>
              <StatDescription>{Math.round((stats.active/stats.total)*100)}% of total</StatDescription>
            </StatCard>
          </StatsGrid>

          <Tabs>
            <Tab active={activeTab === 'all'} onClick={() => handleTabChange('all')}>
              All Staff <Badge count={stats.total} showZero />
            </Tab>
            <Tab active={activeTab === 'System Admin'} onClick={() => handleTabChange('System Admin')}>
              System Admin <Badge count={stats.systemAdmin || 0} showZero />
            </Tab>
            <Tab active={activeTab === 'Managers'} onClick={() => handleTabChange('Managers')}>
              Managers <Badge count={stats.managers || 0} showZero />
            </Tab>
            <Tab active={activeTab === 'Restaurant Admin'} onClick={() => handleTabChange('Restaurant Admin')}>
              Restaurant Admin <Badge count={stats.restaurantAdmin || 0} showZero />
            </Tab>
            <Tab active={activeTab === 'Staff'} onClick={() => handleTabChange('Staff')}>
              Staff <Badge count={stats.staff || 0} showZero />
            </Tab>
          </Tabs>

          <FilterBar>
            <FilterSelect
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">{t('admin:staffManagementPage.allRoles')}</option>
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </FilterSelect>

            <FilterSelect
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">{t('admin:staffManagementPage.allStatus')}</option>
              <option value="active">{t('admin:staffManagementPage.active')}</option>
              <option value="inactive">{t('admin:staffManagementPage.inactive')}</option>
            </FilterSelect>

            <FilterSelect
              value={restaurantFilter}
              onChange={(e) => setRestaurantFilter(e.target.value)}
              style={{ display: activeTab === 'all' || activeTab === 'Restaurant Admin' || activeTab === 'Staff' ? 'block' : 'none' }}
            >
              <option value="all">{t('admin:staffManagementPage.allRestaurants')}</option>
              {uniqueRestaurants.map(rest => (
                <option key={rest.id} value={rest.id}>{getRestaurantDisplayName(rest)}</option>
              ))}
            </FilterSelect>

            <SearchInput
              type="text"
              placeholder="Search by name, email, or restaurant..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </FilterBar>

          <Table>
            <StaffTableHeader columns="2.2fr 2fr 1.3fr 1.2fr 0.9fr 220px">
              <span className="col-info">{t('admin:staffManagementPage.staffMember')}</span>
              <span className="col-info">{t('admin:staffManagementPage.companyLocation')}</span>
              <span>{t('admin:staffManagementPage.role')}</span>
              <span>{t('admin:staffManagementPage.department')}</span>
              <span>{t('admin:staffManagementPage.status')}</span>
              <span className="col-action">{t('admin:staffManagementPage.actions')}</span>
            </StaffTableHeader>

            {filteredStaff.length === 0 ? (
              <EmptyState>
                <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                  No staff found
                </div>
                <div style={{ fontSize: '14px' }}>
                  Try adjusting your filters or add new staff members
                </div>
              </EmptyState>
            ) : (
              filteredStaff.map(staff => (
                <StaffTableRow columns="2.2fr 2fr 1.3fr 1.2fr 0.9fr 220px" key={staff.id}>
                  <StaffInfo className="col-info">
                    <StaffAvatar role={staff.role}>
                      {getInitials(staff.name)}
                    </StaffAvatar>
                    <StaffDetails>
                      <StaffName>{staff.name}{staff.is_demo && <span style={{ fontSize: '10px', fontWeight: 600, color: '#fff', background: '#F59E0B', padding: '1px 6px', borderRadius: '4px', marginLeft: '6px', verticalAlign: 'middle' }}>{t('admin:staffManagementPage.demo')}</span>}{staff.is_test && <span style={{ fontSize: '10px', fontWeight: 600, color: '#fff', background: '#8B5CF6', padding: '1px 6px', borderRadius: '4px', marginLeft: '6px', verticalAlign: 'middle' }}>{t('admin:staffManagementPage.test')}</span>}</StaffName>
                      <StaffEmail>{staff.username} • {staff.email}</StaffEmail>
                    </StaffDetails>
                  </StaffInfo>

                  <MobileGrid>
                    <MobileValue>
                      <MobileLabel>{t('admin:staffManagementPage.companyLocation')}</MobileLabel>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: '#0A2540', marginBottom: '2px' }}>
                        {staff.companyName}
                      </div>
                      <div style={{ fontSize: '11px', color: '#4B5563' }}>
                        {staff.restaurantName || 'Head Office'}
                      </div>
                    </MobileValue>

                    <MobileValue>
                      <MobileLabel>{t('admin:staffManagementPage.role')}</MobileLabel>
                      <RoleBadge role={staff.role}>
                        {staff.role}
                      </RoleBadge>
                    </MobileValue>

                    <MobileValue>
                      <MobileLabel>{t('admin:staffManagementPage.department')}</MobileLabel>
                      <div style={{ fontSize: '13px', color: '#4B5563' }}>
                        {staff.department}
                      </div>
                    </MobileValue>

                    <MobileValue>
                      <MobileLabel>{t('admin:staffManagementPage.status')}</MobileLabel>
                      <StatusBadge status={staff.status}>
                        {staff.status === 'active' ? 'Active' : 'Inactive'}
                      </StatusBadge>
                    </MobileValue>
                  </MobileGrid>

                  <ActionButtons>
                    <ActionButton onClick={() => handleEditStaff(staff)}>
                      Edit
                    </ActionButton>
                    <IconButton
                      onClick={() => handleToggleStaffStatus(staff)}
                      title={staff.status === 'active' ? 'Deactivate Staff' : 'Activate Staff'}
                    >
                      <IconSymbol>{staff.status === 'active' ? '⊗' : '◉'}</IconSymbol>
                    </IconButton>
                    <IconButton
                      onClick={() => handleResetStaffPassword(staff)}
                      title="Reset Password"
                    >
                      <IconSymbol>⚷</IconSymbol>
                    </IconButton>
                    {currentUser?.id?.toString() !== staff.id?.toString() && (
                      <IconButton
                        onClick={() => deleteStaff(staff)}
                        title="Delete Staff"
                      >
                        <IconSymbol>×</IconSymbol>
                      </IconButton>
                    )}
                  </ActionButtons>
                </StaffTableRow>
              ))
            )}
          </Table>
        </Content>
        
        {showAddModal && (
        <CommonModal isOpen={true} onClose={handleCloseModal} title="Add Staff" footer={<><Button variant="secondary" onClick={handleCloseModal}>{t('admin:staffManagementPage.cancel')}</Button><Button variant="primary" onClick={handleSubmitStaff}>{t('admin:staffManagementPage.addStaff')}</Button></>}>
            
            <FormGrid>
              <FormGroup>
                <Label>Role *</Label>
                <Select
                  value={newStaff.role}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                >
                  <option value="">{t('admin:staffManagementPage.selectRole')}</option>
                  <option value="Staff">{t('admin:staffManagementPage.staff')}</option>
                  <option value="Restaurant Admin">{t('admin:staffManagementPage.restaurantAdmin')}</option>
                  <option value="Restaurant Owner">Restaurant Owner</option>
                  <option value="Foodcourt Manager">{t('admin:staffManagementPage.foodcourtManager')}</option>
                  <option value="Foodcourt General">{t('admin:staffManagementPage.foodcourtGeneral')}</option>
                  <option value="Brand Manager">{t('admin:staffManagementPage.brandManager')}</option>
                  <option value="Brand General">{t('admin:staffManagementPage.brandGeneral')}</option>
                  <option value="Supplier Admin">Supplier Admin</option>
                  <option value="System Admin">{t('admin:staffManagementPage.systemAdmin')}</option>
                </Select>
              </FormGroup>

              {newStaff.role === 'Restaurant Admin' && (
                <div style={{
                  gridColumn: '1 / -1',
                  padding: '12px 16px',
                  background: '#FEF3C7',
                  border: '1px solid #FCD34D',
                  borderRadius: '8px',
                  fontSize: '13px',
                  color: '#92400E',
                  lineHeight: '1.5'
                }}>
                  <strong>Note:</strong> Restaurant Admin accounts are normally created automatically when registering a new restaurant (Restaurants page &gt; Add Restaurant). Creating one here will require manually assigning a restaurant afterwards.
                </div>
              )}

              <FormGroup>
                <Label>Staff ID (Username) *</Label>
                <Input
                  type="text"
                  value={newStaff.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  placeholder="Enter unique staff ID"
                />
                <div style={{
                  fontSize: '12px',
                  color: '#4B5563',
                  marginTop: '6px',
                  padding: '8px',
                  background: '#F1F4F8',
                  borderRadius: '4px'
                }}>
                  ℹ️ A strong password will be auto-generated and shown after creation
                </div>
              </FormGroup>

              <FormGroup>
                <Label>Full Name *</Label>
                <Input
                  type="text"
                  value={newStaff.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter full name"
                />
              </FormGroup>

              <FormGroup>
                <Label>Email *</Label>
                <Input
                  type="email"
                  value={newStaff.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter email address"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>{t('admin:staffManagementPage.phone')}</Label>
                <PhoneInput
                  value={newStaff.phone}
                  onChange={(value) => handleInputChange('phone', value)}
                />
              </FormGroup>

              {/* Manager Role - Company Name */}
              {(newStaff.role === 'foodcourt_manager' ||
                newStaff.role === 'foodcourt_general' ||
                newStaff.role === 'brand_manager' ||
                newStaff.role === 'brand_general') && (
                <FormGroup>
                  <Label>{t('admin:staffManagementPage.companyName')}</Label>
                  <Input
                    type="text"
                    value={newStaff.companyName || ''}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    placeholder="Enter company name"
                  />
                </FormGroup>
              )}

              {/* Restaurant Admin & Staff Role - Restaurant Selection */}
              {(newStaff.role === 'Restaurant Admin' || newStaff.role === 'Staff') && (
                <FormGroup style={{ position: 'relative' }}>
                  <Label>Restaurant *</Label>
                  <RestaurantSearchInput
                    type="text"
                    value={restaurantSearchQuery}
                    onChange={(e) => handleRestaurantSearch(e.target.value)}
                    onFocus={() => {
                      setShowRestaurantDropdown(true);
                      if (restaurantSearchQuery.length === 0) {
                        setRestaurantSearchResults(restaurants.slice(0, 10));
                      }
                    }}
                    onBlur={() => setTimeout(() => setShowRestaurantDropdown(false), 200)}
                    placeholder="Type to search for restaurants"
                  />
                  {showRestaurantDropdown && restaurantSearchResults.length > 0 && (
                    <DropdownContainer>
                      {restaurantSearchResults.map(restaurant => (
                        <DropdownItem
                          key={restaurant.id}
                          onClick={() => handleRestaurantSelect(restaurant)}
                        >
                          <DropdownItemTitle>{getRestaurantDisplayName(restaurant)}</DropdownItemTitle>
                          <DropdownItemSubtitle>
                            {formatEntityAddress(restaurant, (i18n.language as AppLocale) || 'en') || 'No address provided'}
                          </DropdownItemSubtitle>
                        </DropdownItem>
                      ))}
                    </DropdownContainer>
                  )}
                  {selectedRestaurant && (
                    <SelectedBadge>
                      ✓ Selected: <strong>{getRestaurantDisplayName(selectedRestaurant)}</strong>
                    </SelectedBadge>
                  )}
                </FormGroup>
              )}

              {/* System Admin Role - Company Name */}
              {newStaff.role === 'System Admin' && (
                <FormGroup>
                  <Label>{t('admin:staffManagementPage.companyName')}</Label>
                  <Input
                    type="text"
                    value={newStaff.companyName || ''}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    placeholder="Enter company name"
                  />
                </FormGroup>
              )}

              <FormGroup>
                <Label>{t('admin:staffManagementPage.department')}</Label>
                <Input
                  type="text"
                  value={newStaff.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  placeholder="e.g. Operations, Service, Kitchen, Management"
                />
              </FormGroup>

              {/* PIN Code - only for Restaurant Admin & Staff */}
              {(newStaff.role === 'Restaurant Admin' || newStaff.role === 'Staff') && (
                <FormGroup>
                  <Label>{t('admin:staffManagementPage.pinCode4Digits')}</Label>
                  <Input
                    type="text"
                    inputMode="numeric"
                    maxLength={4}
                    value={newStaff.pin_code}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9]/g, '');
                      handleInputChange('pin_code', val);
                    }}
                    placeholder="e.g. 1234"
                    autoComplete="off"
                    style={{ letterSpacing: '8px', fontSize: '18px', textAlign: 'center', fontFamily: 'monospace' }}
                  />
                  <div style={{ fontSize: '12px', color: '#4B5563', marginTop: '4px' }}>
                    Used for quick cashier switch at POS terminal
                  </div>
                </FormGroup>
              )}

              {/* v3.27 unified subscription form — Brand/Foodcourt General + Restaurant Owner + Supplier Admin */}
              {['Brand General', 'Foodcourt General', 'Restaurant Owner', 'Supplier Admin'].includes(newStaff.role) && (
                <FormGroup style={{ gridColumn: '1 / -1', marginTop: '8px', paddingTop: '16px', borderTop: '1px solid #C7CED6' }}>
                  <SubscriptionFormFields
                    userType={
                      newStaff.role === 'Brand General' ? 'brand' :
                      newStaff.role === 'Foodcourt General' ? 'foodcourt' :
                      newStaff.role === 'Supplier Admin' ? 'supplier' : 'owner'
                    }
                    mode="add"
                    availablePlans={availablePlans}
                    planCurrencies={planCurrencies}
                    values={{
                      currency: newStaff.currency,
                      plan_type: newStaff.planType,
                      plan_amount: newStaff.planAmount || '0',
                      billing_cycle: newStaff.billingCycle as BillingCycle,
                      payment_model: newStaff.paymentModel as PaymentModel,
                      subscription_start: newStaff.subscriptionStart,
                      subscription_end: newStaff.subscriptionEnd,
                      auto_renew: newStaff.autoRenew,
                      treat_as_trial: newStaff.treatAsTrial,
                      activate_now: newStaff.activateNow,
                      discount_type: newStaff.discountType as DiscountType,
                      discount_value: newStaff.discountValue,
                      discount_reason: newStaff.discountReason
                    }}
                    onChange={(patch) => {
                      const map: Record<string, string> = {
                        currency: 'currency', plan_type: 'planType', plan_amount: 'planAmount',
                        billing_cycle: 'billingCycle', payment_model: 'paymentModel',
                        subscription_start: 'subscriptionStart', subscription_end: 'subscriptionEnd',
                        auto_renew: 'autoRenew', treat_as_trial: 'treatAsTrial',
                        activate_now: 'activateNow', discount_type: 'discountType',
                        discount_value: 'discountValue', discount_reason: 'discountReason'
                      };
                      Object.entries(patch).forEach(([k, v]) => {
                        const target = map[k];
                        if (target) setNewStaff(prev => ({ ...prev, [target]: v }));
                      });
                    }}
                  />
                </FormGroup>
              )}

            </FormGrid>

            {formError && (
              <ErrorMessage style={{ marginTop: '16px' }}>{formError}</ErrorMessage>
            )}

        </CommonModal>
        )}

        {/* Edit Staff Modal */}
        {showEditModal && (
        <CommonModal isOpen={true} onClose={handleCloseEditModal} title="Edit Staff Member" footer={<><Button variant="secondary" onClick={handleCloseEditModal}>{t('admin:staffManagementPage.cancel')}</Button><Button variant="primary" onClick={handleUpdateStaff}>{t('admin:staffManagementPage.updateStaff')}</Button></>}>
            
            {editingStaff && (
              <>
                <FormGrid>
                  <FormGroup>
                    <Label>Role *</Label>
                    <Select
                      value={editingStaff.role}
                      onChange={(e) => setEditingStaff({...editingStaff, role: e.target.value})}
                    >
                      <option value="">{t('admin:staffManagementPage.selectRole')}</option>
                      <option value="Staff">{t('admin:staffManagementPage.staff')}</option>
                      <option value="Restaurant Admin">{t('admin:staffManagementPage.restaurantAdmin')}</option>
                      <option value="Foodcourt Manager">{t('admin:staffManagementPage.foodcourtManager')}</option>
                      <option value="Foodcourt General">{t('admin:staffManagementPage.foodcourtGeneral')}</option>
                      <option value="Brand Manager">{t('admin:staffManagementPage.brandManager')}</option>
                      <option value="Brand General">{t('admin:staffManagementPage.brandGeneral')}</option>
                      <option value="System Admin">{t('admin:staffManagementPage.systemAdmin')}</option>
                    </Select>
                  </FormGroup>


                  <FormGroup>
                    <Label>{t('admin:staffManagementPage.staffIdUsername')}</Label>
                    <Input
                      type="text"
                      value={editingStaff.username}
                      disabled
                      style={{ backgroundColor: '#F1F4F8', color: '#4B5563' }}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Full Name *</Label>
                    <Input
                      type="text"
                      value={editingStaff.name}
                      onChange={(e) => setEditingStaff({...editingStaff, name: e.target.value})}
                      placeholder="Enter full name"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Email *</Label>
                    <Input
                      type="email"
                      value={editingStaff.email}
                      onChange={(e) => setEditingStaff({...editingStaff, email: e.target.value})}
                      placeholder="Enter email address"
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>{t('admin:staffManagementPage.phone')}</Label>
                    <PhoneInput
                      value={editingStaff.phone}
                      onChange={(value) => setEditingStaff({...editingStaff, phone: value})}
                    />
                  </FormGroup>

                  {/* Manager Role - Company Name */}
                  {editingStaff.role === 'Manager' && (
                    <FormGroup>
                      <Label>{t('admin:staffManagementPage.companyName')}</Label>
                      <Input
                        type="text"
                        value={editingStaff.companyName || ''}
                        onChange={(e) => setEditingStaff({...editingStaff, companyName: e.target.value})}
                        placeholder="Enter company name"
                      />
                    </FormGroup>
                  )}

                  {/* Restaurant Admin & Staff Role - Restaurant Selection */}
                  {(editingStaff.role === 'Restaurant Admin' || editingStaff.role === 'Staff') && (
                    <FormGroup style={{ position: 'relative' }}>
                      <Label>{t('admin:staffManagementPage.restaurant')}</Label>
                      <RestaurantSearchInput
                        type="text"
                        value={editRestaurantSearchQuery}
                        onChange={(e) => handleEditRestaurantSearch(e.target.value)}
                        onFocus={() => {
                          setShowEditRestaurantDropdown(true);
                          if (editRestaurantSearchQuery.length === 0) {
                            setEditRestaurantSearchResults(restaurants.slice(0, 10));
                          }
                        }}
                        onBlur={() => setTimeout(() => setShowEditRestaurantDropdown(false), 200)}
                        placeholder="Type to search for restaurants"
                      />
                      {showEditRestaurantDropdown && editRestaurantSearchResults.length > 0 && (
                        <DropdownContainer>
                          {editRestaurantSearchResults.map(restaurant => (
                            <DropdownItem
                              key={restaurant.id}
                              onClick={() => handleEditRestaurantSelect(restaurant)}
                            >
                              <DropdownItemTitle>{getRestaurantDisplayName(restaurant)}</DropdownItemTitle>
                              <DropdownItemSubtitle>
                                {formatEntityAddress(restaurant, (i18n.language as AppLocale) || 'en') || 'No address provided'}
                              </DropdownItemSubtitle>
                            </DropdownItem>
                          ))}
                        </DropdownContainer>
                      )}
                      {editSelectedRestaurant && (
                        <SelectedBadge>
                          ✓ Selected: <strong>{getRestaurantDisplayName(editSelectedRestaurant)}</strong>
                        </SelectedBadge>
                      )}
                    </FormGroup>
                  )}

                  {/* System Admin Role - Company Name */}
                  {editingStaff.role === 'System Admin' && (
                    <FormGroup>
                      <Label>{t('admin:staffManagementPage.companyName')}</Label>
                      <Input
                        type="text"
                        value={editingStaff.companyName || ''}
                        onChange={(e) => setEditingStaff({...editingStaff, companyName: e.target.value})}
                        placeholder="Enter company name"
                      />
                    </FormGroup>
                  )}

                  <FormGroup>
                    <Label>{t('admin:staffManagementPage.department')}</Label>
                    <Input
                      type="text"
                      value={editingStaff.department}
                      onChange={(e) => setEditingStaff({...editingStaff, department: e.target.value})}
                      placeholder="e.g. Operations, Service, Kitchen, Management"
                    />
                  </FormGroup>

                  {/* PIN Code - only for Restaurant Admin & Staff */}
                  {(editingStaff.role === 'Restaurant Admin' || editingStaff.role === 'Staff') && (
                    <FormGroup>
                      <Label>{t('admin:staffManagementPage.pinCode4Digits')}</Label>
                      <Input
                        type="text"
                        inputMode="numeric"
                        maxLength={4}
                        value={editingStaff.pin_code || ''}
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^0-9]/g, '');
                          setEditingStaff({...editingStaff, pin_code: val});
                        }}
                        placeholder={editingStaff.pin_code ? '****' : 'Enter PIN'}
                        autoComplete="off"
                        style={{ letterSpacing: '8px', fontSize: '18px', textAlign: 'center', fontFamily: 'monospace' }}
                      />
                      <div style={{ fontSize: '12px', color: '#4B5563', marginTop: '4px' }}>
                        Leave empty to keep current PIN
                      </div>
                    </FormGroup>
                  )}

                  {/* 카운터(POS) 운영 권한 — Staff 만. 끄면 서빙 전용 직원(결제/취소/void/현금박스/정산 숨김) */}
                  {editingStaff.role === 'Staff' && (() => {
                    const hasCounter = Array.isArray(editingStaff.permissions) && editingStaff.permissions.includes('pos_counter');
                    const toggleCounter = () => {
                      const cur = Array.isArray(editingStaff.permissions) ? editingStaff.permissions : [];
                      const next = hasCounter ? cur.filter(p => p !== 'pos_counter') : [...cur, 'pos_counter'];
                      setEditingStaff({ ...editingStaff, permissions: next });
                    };
                    return (
                      <FormGroup>
                        <Label>{t('admin:staffManagementPage.counterOps', { defaultValue: 'Counter (POS) operations' })}</Label>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                          <div style={{ fontSize: '13px', color: '#4B5563', lineHeight: 1.4 }}>
                            {t('admin:staffManagementPage.counterOpsDesc', { defaultValue: 'Allow payment, cancel, void, cash drawer & settlement. Turn off for serving-only staff.' })}
                          </div>
                          <button
                            type="button"
                            role="switch"
                            aria-checked={hasCounter}
                            onClick={toggleCounter}
                            title={hasCounter ? 'Counter operations enabled' : 'Serving-only'}
                            style={{
                              flexShrink: 0, width: '48px', height: '28px', borderRadius: '999px', border: 'none', cursor: 'pointer',
                              background: hasCounter ? '#635BFF' : '#C7CED6', position: 'relative', transition: 'background .15s', padding: 0
                            }}
                          >
                            <span style={{
                              position: 'absolute', top: '3px', left: hasCounter ? '23px' : '3px', width: '22px', height: '22px',
                              borderRadius: '50%', background: '#fff', transition: 'left .15s', boxShadow: '0 1px 2px rgba(0,0,0,.2)'
                            }} />
                          </button>
                        </div>
                      </FormGroup>
                    );
                  })()}
                </FormGrid>

              </>
            )}
        </CommonModal>
        )}

        {/* Permissions Modal */}
        {showPermissionsModal && (
        <CommonModal isOpen={true} onClose={handleClosePermissionsModal} title="Permission Management" footer={<><Button variant="secondary" onClick={handleClosePermissionsModal}>{t('admin:staffManagementPage.cancel')}</Button><Button variant="primary" onClick={handleUpdatePermissions}>{t('admin:staffManagementPage.changeRole')}</Button></>}>
            
            {viewingPermissions && (
              <>
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <StaffAvatar role={viewingPermissions.role}>
                      {getInitials(viewingPermissions.name)}
                    </StaffAvatar>
                    <div>
                      <div style={{ fontSize: '18px', fontWeight: '600', color: '#0A2540' }}>
                        {viewingPermissions.name}
                      </div>
                      <div style={{ fontSize: '14px', color: '#4B5563' }}>
                        {viewingPermissions.role} - {viewingPermissions.companyName}
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#0A2540', marginBottom: '12px' }}>
                    Select Role
                  </h3>
                  <div style={{ fontSize: '12px', color: '#4B5563', marginBottom: '16px' }}>
                    Select an appropriate role. Each role includes predefined permissions.
                  </div>

                  <div style={{ display: 'grid', gap: '12px' }}>
                    {[
                      {
                        role: 'Staff',
                        title: 'General Staff',
                        description: 'Basic POS system usage',
                        permissions: ['POS System', 'Order Processing', 'Customer Service'],
                        color: '#059669'
                      },
                      {
                        role: 'Restaurant Admin',
                        title: 'Restaurant Manager',
                        description: 'Overall restaurant operations management',
                        permissions: ['POS System', 'Menu Management', 'Order Management', 'Staff Management', 'Sales Reports'],
                        color: '#DC2626'
                      },
                      {
                        role: 'System Admin',
                        title: 'System Administrator',
                        description: 'Full system management',
                        permissions: ['Full System Management', 'All User Management', 'Subscription Management', 'Invoice Management', 'System Settings'],
                        color: '#DC2626'
                      }
                    ].map((roleData, index) => (
                      <div 
                        key={index}
                        onClick={() => {
                          if (viewingPermissions) {
                            setViewingPermissions({...viewingPermissions, role: roleData.role});
                            setEditingPermissions(roleData.permissions);
                          }
                        }}
                        style={{ 
                          padding: '16px',
                          backgroundColor: viewingPermissions?.role === roleData.role ? '#F0F4FF' : '#F1F4F8',
                          borderRadius: '8px',
                          border: viewingPermissions?.role === roleData.role ? '2px solid #635BFF' : '1px solid #C7CED6',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                          <div 
                            style={{ 
                              width: '12px', 
                              height: '12px', 
                              borderRadius: '50%', 
                              backgroundColor: roleData.color,
                              marginRight: '12px'
                            }}
                          />
                          <div style={{ fontSize: '16px', fontWeight: '600', color: '#0A2540' }}>
                            {roleData.title}
                          </div>
                          {viewingPermissions?.role === roleData.role && (
                            <span style={{ marginLeft: 'auto', color: '#635BFF', fontSize: '14px' }}>✓</span>
                          )}
                        </div>
                        <div style={{ fontSize: '13px', color: '#4B5563', marginBottom: '12px' }}>
                          {roleData.description}
                        </div>
                        <div style={{ fontSize: '12px', color: '#1F2937' }}>
                          <strong>Included Permissions:</strong>
                          <div style={{ marginTop: '4px', fontSize: '11px', color: '#4B5563' }}>
                            {roleData.permissions.join(', ')}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
              </>
            )}
        </CommonModal>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && deletingStaff && (
        <CommonModal isOpen={true} onClose={cancelDelete} title="Delete Staff" footer={<><Button variant="secondary" onClick={cancelDelete}>{t('admin:staffManagementPage.cancel')}</Button><Button variant="primary" onClick={confirmDelete} style={{ backgroundColor: '#DC2626', borderColor: '#EF4444' }}>{t('admin:staffManagementPage.delete')}</Button></>}>
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <StaffAvatar role={deletingStaff.role}>
                      {getInitials(deletingStaff.name)}
                    </StaffAvatar>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: '600', color: '#0A2540' }}>
                        {deletingStaff.name}
                      </div>
                      <div style={{ fontSize: '14px', color: '#4B5563' }}>
                        {deletingStaff.role} - {deletingStaff.companyName}
                      </div>
                    </div>
                  </div>

                  <div style={{ padding: '16px', backgroundColor: '#FEF2F2', borderRadius: '8px', border: '1px solid #FECACA' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <span style={{ color: '#DC2626', fontSize: '16px' }}>&#9888;</span>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#DC2626' }}>
                        Are you sure you want to delete?
                      </div>
                    </div>
                    <div style={{ fontSize: '13px', color: '#991B1B', lineHeight: '1.6' }}>
                      {deletingStaff.role === 'Restaurant Admin' ? (
                        <>
                          <div>• The restaurant's admin will be unlinked (restaurant remains)</div>
                          <div>• Orders processed by this admin will keep their records</div>
                          <div>• Activity logs will be preserved (user reference cleared)</div>
                        </>
                      ) : (
                        <>
                          <div>• This staff account will be permanently deleted</div>
                          <div>• POS cashier sessions by this staff will keep their records</div>
                          <div>• Activity logs will be preserved (user reference cleared)</div>
                        </>
                      )}
                      <div style={{ marginTop: '8px', fontWeight: '600' }}>{t('admin:staffManagementPage.thisActionCannotBeUndone')}</div>
                    </div>
                  </div>
                </div>
        </CommonModal>
        )}

        {/* Confirm Action Modal */}
        {showConfirmModal && selectedStaff && (
        <CommonModal isOpen={true} onClose={() => setShowConfirmModal(false)} title="Confirm Action" footer={<><Button variant="secondary" onClick={() => setShowConfirmModal(false)}>{t('admin:staffManagementPage.cancel')}</Button><Button variant="primary" onClick={handleConfirmAction}>{confirmAction === 'toggle' ? 'Confirm' : 'Reset Password'}</Button></>}>
                  <div style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                      <StaffAvatar role={selectedStaff.role}>
                        {getInitials(selectedStaff.name)}
                      </StaffAvatar>
                      <div>
                        <div style={{ fontSize: '16px', fontWeight: '600', color: '#0A2540' }}>
                          {selectedStaff.name}
                        </div>
                        <div style={{ fontSize: '14px', color: '#4B5563' }}>
                          {selectedStaff.role} - {selectedStaff.companyName}
                        </div>
                      </div>
                    </div>

                    <div style={{ padding: '16px', backgroundColor: '#F1F4F8', borderRadius: '8px' }}>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937', marginBottom: '8px' }}>
                        {confirmAction === 'toggle' && `${selectedStaff.status === 'active' ? 'Deactivate' : 'Activate'} Staff Member?`}
                        {confirmAction === 'resetPassword' && 'Reset Password?'}
                      </div>
                      <div style={{ fontSize: '13px', color: '#4B5563', lineHeight: '1.4' }}>
                        {confirmAction === 'toggle' && `This will ${selectedStaff.status === 'active' ? 'deactivate' : 'activate'} ${selectedStaff.name}'s account.`}
                        {confirmAction === 'resetPassword' && `This will reset ${selectedStaff.name}'s password. A new strong password will be generated.`}
                      </div>
                    </div>
                  </div>
        </CommonModal>
        )}

        {/* Success Message Modal */}
        {showSuccessModal && (
        <CommonModal isOpen={true} onClose={() => setShowSuccessModal(false)} title="Password Generated" size="small" footer={<>
          {successPassword && <Button variant="secondary" onClick={() => { navigator.clipboard.writeText(successPassword); setPasswordCopied(true); setTimeout(() => setPasswordCopied(false), 2000); }}>{passwordCopied ? 'Copied!' : 'Copy Password'}</Button>}
          <Button variant="primary" onClick={() => setShowSuccessModal(false)}>{t('admin:staffManagementPage.done')}</Button>
        </>}>
          <div style={{ marginBottom: '20px', fontSize: '14px', color: '#4B5563' }}>
            {successMessage} Please share this password securely. They should change it after first login.
          </div>
          {successPassword && (
            <div style={{ background: '#F1F4F8', border: '1px solid #C7CED6', borderRadius: '8px', padding: '16px', textAlign: 'center', marginBottom: '16px' }}>
              <div style={{ fontSize: '12px', color: '#4B5563', marginBottom: '8px', fontWeight: 600 }}>{t('admin:staffManagementPage.temporaryPassword')}</div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: '#0A2540', fontFamily: 'monospace', letterSpacing: '1px', userSelect: 'all' as const }}>{successPassword}</div>
            </div>
          )}
          <div style={{ fontSize: '12px', color: '#DC2626' }}>{t('admin:staffManagementPage.thisPasswordWillNotBeShownAgainPleaseCopyItNow')}</div>
        </CommonModal>
        )}
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

export default AdminStaffManagementPage;