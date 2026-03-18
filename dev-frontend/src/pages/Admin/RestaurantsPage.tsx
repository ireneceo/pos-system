import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import {
  StatsGrid,
  StatCard,
  StatValue,
  StatLabel,
  StatDescription,
  Container,
  Header,
  Title,
  ActionSection,
  Content
, Modal as CommonModal } from '../../components/UI';
import { ModalWarning } from '../../components/UI/Modal';
import ConfirmModal from '../../components/ConfirmModal';
// Using page-specific filter components instead of common ones
import { useStore } from '../../contexts/StoreContext';
import { formatCurrency, getPlanPrice, formatPlanPrice, getActivePlanCurrencies, COUNTRY_TO_CURRENCY, normalizeCurrencyCode } from '../../utils/currency';
import { formatPhoneForDisplay } from '../../utils/phoneUtils';
import PhoneInput from '../../components/Common/PhoneInput';
import { COUNTRIES } from '../../constants/countries';
// API imports removed - using direct fetch like StaffManagementPage and ManagersPage

interface Restaurant {
  id: string;
  name: string;
  managerId: string;
  managerName: string;
  admin?: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    role: string;
  } | null;
  managers?: Array<{
    id: string;
    name: string;
    email: string;
    role: string;
    isPrimary: boolean;
  }>;
  location: string;
  cuisine: string;
  status: 'active' | 'inactive' | 'trial' | 'expired' | 'suspended' | 'cancelled';
  todaySales: number;
  todayOrders: number;
  staffCount: number;
  rating: number;
  createdAt: string;
  lastOrder: string;
  email?: string;
  phone?: string;
  address?: string;
  country?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  businessRegistration?: string;
  taxId?: string;
  planType?: string;
  planAmount?: string;
  billingCycle?: 'monthly' | 'annual';
  paymentModel?: 'restaurant' | 'brand_manager' | 'foodcourt_manager';
  autoRenew?: boolean;
  subscriptionStart?: string;
  subscriptionEnd?: string;
  brand_id?: number;
  foodcourt_id?: number;
  currency?: string;
  discount_type?: 'none' | 'percentage' | 'fixed';
  discount_value?: number;
  discount_reason?: string;
  is_demo?: boolean;
}

// Common components now imported from ../../components/UI
// Page-specific styled components below

const RestaurantGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 24px;
`;

const RestaurantCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;
  cursor: pointer;
  
  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
    border-color: #635BFF;
  }
`;

const RestaurantHeader = styled.div`
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

const RestaurantMeta = styled.div`
  font-size: 13px;
  color: #6B7280;
  margin-bottom: 2px;
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
      case 'inactive': return '#DC2626';
      case 'trial': return '#D97706';
      case 'expired': return '#DC2626';
      case 'suspended': return '#DC2626';
      case 'cancelled': return '#6B7280';
      default: return '#6B7280';
    }
  }};
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
`;

const Metric = styled.div`
  text-align: center;
`;

const MetricValue = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`;

const MetricLabel = styled.div`
  font-size: 11px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 2px;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 8px;
`;

const Star = styled.span<{ filled: boolean }>`
  color: ${props => props.filled ? '#FFC107' : '#E5E7EB'};
  font-size: 14px;
`;


const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

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
  gap: 4px;
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

const FormTextarea = styled.textarea`
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 80px;
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

// Page-specific filter wrapper - ensures no overlap
const PageFilterWrapper = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: flex-start;
  position: relative;
  z-index: 100;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const PageSearchInput = styled.input`
  flex: 0 1 220px;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;

  &::placeholder {
    color: #9CA3AF;
  }

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  @media (max-width: 600px) {
    flex: 1 1 100%;
    width: 100%;
  }
`;

const PageFilterSelect = styled.select`
  flex: 0 0 140px;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  @media (max-width: 600px) {
    flex: 1 1 100%;
    width: 100%;
  }
`;

// Advanced Dropdown Styled Components
const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
  min-width: 0;
`;

// Filter용 Dropdown Container (고정 너비)
const FilterDropdownContainer = styled.div`
  position: relative;
  flex: 0 0 180px;
  min-width: 0;
  z-index: 50;

  &:focus-within {
    z-index: 60;
  }

  @media (max-width: 600px) {
    flex: 1 1 100%;
    width: 100%;
  }
`;

const DropdownInput = styled.input`
  padding: 12px 16px;
  padding-right: 32px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  text-overflow: ellipsis;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:hover {
    border-color: #D1D5DB;
  }
`;

const DropdownMenu = styled.div<{ show: boolean }>`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  min-width: 250px;
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  max-height: 250px;
  overflow-y: auto;
  z-index: 9999;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  display: ${props => props.show ? 'block' : 'none'};
`;

const DropdownItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid #F1F3F5;
  transition: background-color 0.2s;

  &:hover {
    background: #F8FAFC;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const ManagerName = styled.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 2px;
`;

const ManagerDetails = styled.div`
  font-size: 12px;
  color: #6B7280;
`;

const SelectedManagersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
  min-height: 32px;
`;

const ManagerTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background: #F3F4F6;
  border-radius: 6px;
  font-size: 13px;
  color: #374151;
`;

const RemoveTagButton = styled.button`
  background: none;
  border: none;
  color: #9CA3AF;
  cursor: pointer;
  padding: 0;
  font-size: 14px;
  line-height: 1;
  display: flex;
  align-items: center;

  &:hover {
    color: #DC2626;
  }
`;

const ClearButton = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 16px;
  color: #9CA3AF;
  cursor: pointer;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #6B7280;
  }
`;

const ActiveButton = styled.button`
  padding: 6px 12px;
  background: #635BFF;
  border: 1px solid #635BFF;
  border-radius: 6px;
  color: white;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin-right: 8px;

  &:hover {
    background: #5A51E6;
    border-color: #5A51E6;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);
  }

  &:last-child {
    margin-right: 0;
  }
`;

const RestaurantsPage: React.FC = () => {
  const { operationSettings } = useStore();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterManager, setFilterManager] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  // Inline warning messages instead of browser alerts
  const [addModalWarning, setAddModalWarning] = useState('');
  const [editModalWarning, setEditModalWarning] = useState('');
  const [editingRestaurant, setEditingRestaurant] = useState<Restaurant | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [managerSearchQuery, setManagerSearchQuery] = useState('');
  const [showManagerDropdown, setShowManagerDropdown] = useState(false);
  const [filteredManagers, setFilteredManagers] = useState<any[]>([]);
  const [selectedManagers, setSelectedManagers] = useState<any[]>([]);
  // Edit modal dropdown states
  const [editManagerSearchQuery, setEditManagerSearchQuery] = useState('');
  const [showEditManagerDropdown, setShowEditManagerDropdown] = useState(false);
  const [filteredEditManagers, setFilteredEditManagers] = useState<any[]>([]);
  const [selectedEditManagers, setSelectedEditManagers] = useState<any[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingRestaurant, setDeletingRestaurant] = useState<Restaurant | null>(null);
  // Filter manager states
  const [filterManagerSearchQuery, setFilterManagerSearchQuery] = useState('');
  const [showFilterManagerDropdown, setShowFilterManagerDropdown] = useState(false);
  const [filteredFilterManagers, setFilteredFilterManagers] = useState<any[]>([]);
  const [newRestaurant, setNewRestaurant] = useState({
    name: '',
    managerId: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'MY',
    businessRegistration: '',
    taxId: '',
    cuisine: '',
    planType: 'Basic Plan',
    planAmount: '49.00',
    currency: 'MYR',
    status: 'active' as 'active' | 'inactive' | 'trial' | 'expired' | 'suspended' | 'cancelled',
    // Trial 체크박스 - 최초 등록 시에만 선택 가능
    enableTrial: true, // 기본값: 7일 무료 체험
    // Subscription Settings 추가
    billingCycle: 'monthly' as 'monthly' | 'annual',
    paymentModel: 'restaurant' as 'restaurant' | 'brand_manager' | 'foodcourt_manager',
    autoRenew: true,
    subscriptionStart: new Date().toISOString().split('T')[0],
    subscriptionEnd: '',
  });
  const [availableManagers, setAvailableManagers] = useState<any[]>([]);
  const [availablePlans, setAvailablePlans] = useState<any[]>([]);
  const planCurrencies = useMemo(() => getActivePlanCurrencies(availablePlans), [availablePlans]);
  const [brands, setBrands] = useState<Array<{ id: number; name: string; code: string; currency: string }>>([]);

  // Restaurant Admin states
  const [adminAction, setAdminAction] = useState<'create' | 'assign'>('create');
  const [newAdminData, setNewAdminData] = useState({ fullName: '', email: '', username: '', password: '', phone: '' });
  const [selectedAdmin, setSelectedAdmin] = useState<any>(null);
  const [adminCandidates, setAdminCandidates] = useState<any[]>([]);
  const [adminSearchQuery, setAdminSearchQuery] = useState('');
  const [showAdminDropdown, setShowAdminDropdown] = useState(false);
  // Edit modal admin states
  const [editAdminAction, setEditAdminAction] = useState<'keep' | 'create' | 'change'>('keep');
  const [editNewAdminData, setEditNewAdminData] = useState({ fullName: '', email: '', username: '', password: '', phone: '' });
  const [editSelectedAdmin, setEditSelectedAdmin] = useState<any>(null);
  const [editAdminSearchQuery, setEditAdminSearchQuery] = useState('');
  const [showEditAdminDropdown, setShowEditAdminDropdown] = useState(false);

  // Filter Brand states
  const [filterBrand, setFilterBrand] = useState('all');
  const [filterBrandSearchQuery, setFilterBrandSearchQuery] = useState('');
  const [showFilterBrandDropdown, setShowFilterBrandDropdown] = useState(false);
  const [filteredFilterBrands, setFilteredFilterBrands] = useState<any[]>([]);

  // Filter Manager Search Functions
  const handleFilterManagerSearch = (query: string) => {
    setFilterManagerSearchQuery(query);
    setShowFilterManagerDropdown(true);

    if (query.length < 1) {
      setFilteredFilterManagers(availableManagers.slice(0, 10));
      return;
    }

    const filtered = availableManagers.filter(manager => {
      const searchTerm = query.toLowerCase();
      const fullName = (manager.full_name || '').toLowerCase();
      const username = (manager.username || '').toLowerCase();
      const email = (manager.email || '').toLowerCase();

      return fullName.includes(searchTerm) ||
             username.includes(searchTerm) ||
             email.includes(searchTerm);
    }).slice(0, 10);

    setFilteredFilterManagers(filtered);
  };

  const handleFilterManagerSelect = (manager: any) => {
    setFilterManager(manager.id.toString());
    setFilterManagerSearchQuery(manager.full_name || manager.username);
    setShowFilterManagerDropdown(false);
  };

  const handleFilterManagerClear = () => {
    setFilterManager('all');
    setFilterManagerSearchQuery('');
    setShowFilterManagerDropdown(false);
  };

  // Filter Brand Search Functions
  const handleFilterBrandSearch = (query: string) => {
    setFilterBrandSearchQuery(query);
    setShowFilterBrandDropdown(true);

    if (query.length < 1) {
      setFilteredFilterBrands(brands.slice(0, 10));
      return;
    }

    const filtered = brands.filter(brand => {
      const searchTerm = query.toLowerCase();
      const name = (brand.name || '').toLowerCase();
      const code = (brand.code || '').toLowerCase();

      return name.includes(searchTerm) || code.includes(searchTerm);
    }).slice(0, 10);

    setFilteredFilterBrands(filtered);
  };

  const handleFilterBrandSelect = (brand: any) => {
    setFilterBrand(brand.id.toString());
    setFilterBrandSearchQuery(brand.name);
    setShowFilterBrandDropdown(false);
  };

  const handleFilterBrandClear = () => {
    setFilterBrand('all');
    setFilterBrandSearchQuery('');
    setShowFilterBrandDropdown(false);
    // Clear URL params
    navigate('/pos/admin/restaurants', { replace: true });
  };

  useEffect(() => {
    Promise.all([fetchRestaurants(), fetchPlans(), fetchBrands()]);

    // URL 파라미터에서 매니저 ID를 읽어서 필터 설정
    const managerId = searchParams.get('managerId');
    const managerName = searchParams.get('managerName');

    if (managerId && managerName) {
      console.log('🔍 Setting manager filter from URL:', { managerId, managerName });
      setFilterManager(managerId);
      setFilterManagerSearchQuery(decodeURIComponent(managerName));
    }

    // URL 파라미터에서 브랜드 ID를 읽어서 필터 설정
    const brandId = searchParams.get('brandId');
    const brandName = searchParams.get('brandName');

    if (brandId && brandName) {
      console.log('🔍 Setting brand filter from URL:', { brandId, brandName });
      setFilterBrand(brandId);
      setFilterBrandSearchQuery(decodeURIComponent(brandName));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // searchParams 의존성 제거 - 첫 로드시에만 실행

  const fetchBrands = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/brands', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setBrands(data);
      }
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  const fetchPlans = async () => {
    try {
      const response = await fetch('/api/plans');
      if (response.ok) {
        const plans = await response.json();
        // Filter only restaurant plans
        const restaurantPlans = plans.filter((p: any) => p.plan_target === 'restaurant' && p.is_active);
        setAvailablePlans(restaurantPlans);

        // Set first plan as default if available
        if (restaurantPlans.length > 0) {
          const firstPlan = restaurantPlans[0];
          setNewRestaurant(prev => ({
            ...prev,
            planType: firstPlan.display_name,
            planAmount: firstPlan.base_price_monthly
          }));
        }
      }
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  };

  const fetchRestaurants = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const headers: HeadersInit = token ? { 'Authorization': `Bearer ${token}` } : {};

      const [restaurantsResponse, managersResponse] = await Promise.all([
        fetch('/api/restaurants', { headers }),
        fetch('/api/users?role=Manager', { headers })
      ]);

      if (restaurantsResponse.ok) {
        const restaurantsData = await restaurantsResponse.json();
        const managersData = managersResponse.ok ? await managersResponse.json() : [];

        const restaurantsArray = restaurantsData.data || restaurantsData;
        const managersArray = managersData.data || managersData;

        const restaurants = Array.isArray(restaurantsArray) ? restaurantsArray : [];
        const managers = Array.isArray(managersArray) ? managersArray : [];

        setAvailableManagers(managers);

        // Transform API data to Restaurant interface format
        const formattedRestaurants: Restaurant[] = restaurants.map((restaurant: any, index: number) => {
          return {
            id: restaurant.id?.toString() || `rest-${index}`,
            name: restaurant.name || 'Restaurant Name',
            admin: restaurant.admin || null,
            managerId: restaurant.managerId || '',
            managerName: restaurant.managerName || 'No Manager Assigned',
            managers: restaurant.managers || [],
            location: restaurant.location || 'Location not specified',
            cuisine: restaurant.cuisine || 'Various',
            status: restaurant.status || 'active',
            todaySales: restaurant.todaySales || 0,
            todayOrders: restaurant.todayOrders || 0,
            staffCount: restaurant.staffCount || 0,
            rating: restaurant.rating || 4.5,
            createdAt: restaurant.createdAt ? new Date(restaurant.createdAt).toISOString().split('T')[0] : '2024-01-01',
            lastOrder: restaurant.lastOrder || 'Never',
            email: restaurant.email || '',
            phone: restaurant.phone || '',
            address: restaurant.address || '',
            country: restaurant.country || '',
            brand_id: restaurant.brand_id || null,
            foodcourt_id: restaurant.foodcourt_id || null,
            paymentModel: restaurant.payment_model || 'restaurant',
            subscriptionStart: restaurant.subscriptionStart || null,
            subscriptionEnd: restaurant.subscriptionEnd || null,
            planType: restaurant.planType || 'Basic Plan',
            planAmount: restaurant.planAmount || '29.00',
            billingCycle: restaurant.billingCycle || restaurant.billing_cycle || 'monthly',
            autoRenew: (restaurant.autoRenew !== undefined ? restaurant.autoRenew : (restaurant.auto_renew !== undefined ? restaurant.auto_renew : true)),
            discount_type: restaurant.discount_type || 'none',
            discount_value: restaurant.discount_value || 0,
            discount_reason: restaurant.discount_reason || ''
          };
        });

        console.log('✅ Formatted restaurants:', formattedRestaurants);
        console.log('✅ Setting restaurants state with', formattedRestaurants.length, 'restaurants');
        setRestaurants(formattedRestaurants);
      } else {
        console.error('❌ Failed to fetch restaurants data');
        setRestaurants([]);
        setAvailableManagers([]);
      }
    } catch (error) {
      console.error('❌ Error fetching restaurants:', error);
      setRestaurants([]);
      setAvailableManagers([]);
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

  const handleExportRestaurants = () => {
    // 현재 필터링된 레스토랑 리스트를 사용하여 CSV 데이터 생성
    const csvData = filteredRestaurants.map(restaurant => ({
      'Restaurant Name': restaurant.name,
      'Manager': restaurant.managerName,
      'Location': restaurant.location,
      'Cuisine': restaurant.cuisine,
      'Status': restaurant.status,
      'Rating': restaurant.rating,
      'Today Sales': formatCurrency(restaurant.todaySales, operationSettings.currency),
      'Today Orders': restaurant.todayOrders,
      'Staff Count': restaurant.staffCount,
      'Phone': restaurant.phone,
      'Email': restaurant.email,
      'Address': restaurant.address,
      'Created At': restaurant.createdAt
    }));

    const csvContent = convertToCSV(csvData);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `restaurants-export-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleAddRestaurant = () => {
    const endDate = new Date();
    endDate.setFullYear(endDate.getFullYear() + 1); // 1년 후

    // Get first available plan or use defaults
    const firstPlan = availablePlans.length > 0 ? availablePlans[0] : null;

    setNewRestaurant({
      name: '',
      managerId: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'MY',
      businessRegistration: '',
      taxId: '',
      cuisine: '',
      planType: firstPlan ? firstPlan.display_name : 'Basic Plan',
      planAmount: firstPlan ? String(getPlanPrice(firstPlan, 'MYR')) : '49.00',
      currency: 'MYR',
      status: 'active' as 'active' | 'inactive' | 'trial' | 'expired' | 'suspended' | 'cancelled',
      enableTrial: true,
      billingCycle: 'monthly' as 'monthly' | 'annual',
      paymentModel: 'restaurant' as 'restaurant' | 'brand_manager' | 'foodcourt_manager',
      autoRenew: true,
      subscriptionStart: new Date().toISOString().split('T')[0],
      subscriptionEnd: endDate.toISOString().split('T')[0]
    });
    setManagerSearchQuery('');
    setFilteredManagers([]);
    setShowManagerDropdown(false);
    setSelectedManagers([]);
    // Reset admin states
    setAdminAction('create');
    setNewAdminData({ fullName: '', email: '', username: '', password: '', phone: '' });
    setSelectedAdmin(null);
    setAdminCandidates([]);
    setAdminSearchQuery('');
    setShowAdminDropdown(false);
    setShowAddModal(true);
  };

  // Admin candidate search
  const handleAdminSearch = async (query: string) => {
    setAdminSearchQuery(query);
    setShowAdminDropdown(true);
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/users/available-admins?q=${encodeURIComponent(query)}`, {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      if (response.ok) {
        const data = await response.json();
        setAdminCandidates(data.data || []);
      }
    } catch (error) {
      console.error('Error searching admin candidates:', error);
    }
  };

  const handleAdminSelect = (user: any) => {
    setSelectedAdmin(user);
    setAdminSearchQuery(user.full_name || user.username);
    setShowAdminDropdown(false);
  };

  // Edit modal admin candidate search
  const handleEditAdminSearch = async (query: string) => {
    setEditAdminSearchQuery(query);
    setShowEditAdminDropdown(true);
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/users/available-admins?q=${encodeURIComponent(query)}`, {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      if (response.ok) {
        const data = await response.json();
        setAdminCandidates(data.data || []);
      }
    } catch (error) {
      console.error('Error searching admin candidates:', error);
    }
  };

  const handleEditAdminSelect = (user: any) => {
    setEditSelectedAdmin(user);
    setEditAdminSearchQuery(user.full_name || user.username);
    setShowEditAdminDropdown(false);
  };

  const handleManagerSearch = (query: string) => {
    setManagerSearchQuery(query);
    setShowManagerDropdown(true);

    if (query.length < 1) {
      // Show first 10 managers when no search query
      setFilteredManagers(availableManagers.slice(0, 10));
      return;
    }

    const filtered = availableManagers.filter(manager =>
      (manager.full_name && manager.full_name.toLowerCase().includes(query.toLowerCase())) ||
      (manager.username && manager.username.toLowerCase().includes(query.toLowerCase())) ||
      (manager.email && manager.email.toLowerCase().includes(query.toLowerCase()))
    );
    setFilteredManagers(filtered.slice(0, 10));
  };

  const handleManagerSelect = (manager: any) => {
    // Check if manager is already selected
    if (!selectedManagers.find(m => m.id === manager.id)) {
      setSelectedManagers([...selectedManagers, manager]);
    }
    setManagerSearchQuery('');
    setShowManagerDropdown(false);
  };

  const handleRemoveManager = (managerId: string) => {
    setSelectedManagers(selectedManagers.filter(m => m.id.toString() !== managerId));
  };

  // Edit Modal Manager Search Functions
  const handleEditManagerSearch = (query: string) => {
    setEditManagerSearchQuery(query);
    setShowEditManagerDropdown(true);

    if (query.length < 1) {
      setFilteredEditManagers(availableManagers.slice(0, 10));
      return;
    }

    const filtered = availableManagers.filter(manager =>
      (manager.full_name && manager.full_name.toLowerCase().includes(query.toLowerCase())) ||
      (manager.username && manager.username.toLowerCase().includes(query.toLowerCase()))
    );
    setFilteredEditManagers(filtered.slice(0, 10));
  };

  const handleEditManagerSelect = (manager: any) => {
    // Check if manager is already selected
    if (!selectedEditManagers.find(m => m.id === manager.id)) {
      setSelectedEditManagers([...selectedEditManagers, manager]);
    }
    setEditManagerSearchQuery('');
    setShowEditManagerDropdown(false);
  };

  const handleRemoveEditManager = (managerId: string) => {
    setSelectedEditManagers(selectedEditManagers.filter(m => m.id.toString() !== managerId));
  };

  const handleViewRestaurant = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowViewModal(true);
  };

  const handleEditRestaurant = (restaurant: Restaurant) => {
    console.log('🔍 Opening edit for restaurant:', restaurant.name);
    console.log('🔍 Restaurant managers array:', restaurant.managers);
    console.log('🔍 Available managers:', availableManagers);

    // Get first available plan or use existing planType
    const firstPlan = availablePlans.length > 0 ? availablePlans[0] : null;
    const defaultPlanType = restaurant.planType || (firstPlan ? firstPlan.display_name : 'Basic Plan');
    const restCurrency = normalizeCurrencyCode(restaurant.currency || 'MYR');
    const defaultPlanAmount = restaurant.planAmount || (firstPlan ? String(getPlanPrice(firstPlan, restCurrency)) : '49.00');

    const editData = {
      ...restaurant,
      email: restaurant.email || '',
      phone: restaurant.phone || '',
      address: restaurant.location || '',
      planType: defaultPlanType,
      planAmount: defaultPlanAmount,
      billingCycle: (restaurant.billingCycle as 'monthly' | 'annual') || 'monthly',
      paymentModel: (restaurant.paymentModel as 'restaurant' | 'brand_manager' | 'foodcourt_manager') || 'restaurant',
      autoRenew: restaurant.autoRenew !== undefined ? restaurant.autoRenew : true,
      subscriptionStart: restaurant.subscriptionStart || new Date().toISOString().split('T')[0],
      subscriptionEnd: restaurant.subscriptionEnd || new Date(Date.now() + 365*24*60*60*1000).toISOString().split('T')[0],
    };

    setEditingRestaurant(editData);

    // Load current manager(s) into selectedEditManagers from managers array
    if (restaurant.managers && restaurant.managers.length > 0) {
      console.log('✅ Loading managers from managers array:', restaurant.managers);
      // Map restaurant.managers to availableManagers format
      const loadedManagers = restaurant.managers
        .map(rm => {
          const found = availableManagers.find(am => am.id.toString() === rm.id.toString());
          console.log(`🔍 Mapping manager ${rm.id} (${rm.name}):`, found ? `Found: ${found.full_name}` : 'NOT FOUND');
          return found;
        })
        .filter(m => m !== undefined) as any[];
      console.log('✅ Loaded managers for edit:', loadedManagers);
      setSelectedEditManagers(loadedManagers);
    } else if (restaurant.managerId) {
      // Fallback to single managerId if managers array not available
      console.log('⚠️ No managers array, using single managerId:', restaurant.managerId);
      const currentManager = availableManagers.find(m => m.id.toString() === restaurant.managerId.toString());
      if (currentManager) {
        setSelectedEditManagers([currentManager]);
      } else {
        setSelectedEditManagers([]);
      }
    } else {
      console.log('⚠️ No managers found');
      setSelectedEditManagers([]);
    }

    // Set edit manager search query
    setEditManagerSearchQuery('');
    setFilteredEditManagers([]);
    setShowEditManagerDropdown(false);
    // Reset edit admin states
    setEditAdminAction('keep');
    setEditNewAdminData({ fullName: '', email: '', username: '', password: '', phone: '' });
    setEditSelectedAdmin(null);
    setEditAdminSearchQuery('');
    setShowEditAdminDropdown(false);
    setShowEditModal(true);
  };

  const handleSubmitAdd = async () => {
    try {
      console.log('Adding restaurant:', newRestaurant);
      console.log('Selected managers:', selectedManagers);
      setAddModalWarning(''); // Clear previous warning

      // Validate required fields
      if (!newRestaurant.name || !newRestaurant.email || !newRestaurant.phone || !newRestaurant.address) {
        setAddModalWarning('Please fill in all required fields (Name, Email, Phone, Address).');
        return;
      }

      // Validate admin fields
      if (adminAction === 'create') {
        if (!newAdminData.fullName || !newAdminData.email || !newAdminData.username || !newAdminData.password) {
          setAddModalWarning('Please fill in all required Restaurant Admin fields (Full Name, Email, Username, Password).');
          return;
        }
        if (newAdminData.password.length < 8) {
          setAddModalWarning('Admin password must be at least 8 characters.');
          return;
        }
        if (!/[a-z]/.test(newAdminData.password) || !/[A-Z]/.test(newAdminData.password) || !/[0-9]/.test(newAdminData.password)) {
          setAddModalWarning('Admin password must contain uppercase, lowercase letters and a number.');
          return;
        }
      } else if (adminAction === 'assign') {
        if (!selectedAdmin) {
          setAddModalWarning('Please select an existing user as Restaurant Admin.');
          return;
        }
      }

      // Create restaurant data payload with admin info
      const restaurantData: any = {
        name: newRestaurant.name,
        adminAction,
        // Send oversight managers (Brand/Foodcourt)
        managerIds: selectedManagers.map(m => parseInt(m.id.toString())),
        email: newRestaurant.email,
        phone: newRestaurant.phone,
        address: newRestaurant.address,
        city: newRestaurant.city,
        state: newRestaurant.state,
        postal_code: newRestaurant.postalCode,
        country: newRestaurant.country,
        business_registration: newRestaurant.businessRegistration,
        tax_id: newRestaurant.taxId,
        location: newRestaurant.address, // Use address as location
        cuisine: newRestaurant.cuisine || 'Various',
        status: newRestaurant.status,
        planType: newRestaurant.planType,
        planAmount: parseFloat(newRestaurant.planAmount),
        currency: newRestaurant.currency,
        billingCycle: newRestaurant.billingCycle,
        payment_model: newRestaurant.paymentModel,
        autoRenew: newRestaurant.autoRenew,
        subscriptionStart: newRestaurant.subscriptionStart,
        subscriptionEnd: newRestaurant.subscriptionEnd
      };

      // Add admin-specific fields
      if (adminAction === 'create') {
        restaurantData.adminEmail = newAdminData.email;
        restaurantData.adminPassword = newAdminData.password;
        restaurantData.adminUsername = newAdminData.username;
        restaurantData.adminFullName = newAdminData.fullName;
        restaurantData.adminPhone = newAdminData.phone || undefined;
      } else if (adminAction === 'assign') {
        restaurantData.adminUserId = parseInt(selectedAdmin.id.toString());
      }

      console.log('📤 Sending restaurant data:', restaurantData);

      // Use direct fetch with Authorization header
      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/restaurants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(restaurantData)
      });

      console.log('📡 Restaurant creation API response status:', response.status);

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Restaurant created successfully:', result);

        setAddModalWarning('');
        setShowAddModal(false);
        // Refresh restaurant list
        await fetchRestaurants();
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('❌ Failed to create restaurant:', errorData);
        // Handle both { error: 'string' } and { error: { message, details } } formats
        let errorMsg = 'Please try again.';
        if (typeof errorData.error === 'string') {
          errorMsg = errorData.error;
        } else if (errorData.error?.message) {
          errorMsg = errorData.error.message;
          if (errorData.error.details?.length) {
            errorMsg += ': ' + errorData.error.details.map((d: any) => d.message).join(', ');
          }
        } else if (errorData.message) {
          errorMsg = errorData.message;
        }
        setAddModalWarning(errorMsg);
      }
    } catch (error) {
      console.error('❌ Error adding restaurant:', error);
      setAddModalWarning('Error adding restaurant. Please check your connection and try again.');
    }
  };

  const handleRestoreSubscription = async (restaurant: Restaurant) => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/restaurants/${restaurant.id}/restore-subscription`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const result = await response.json();
      if (result.success) {
        await fetchRestaurants();
      } else {
        setEditModalWarning(result.message || 'Failed to restore subscription');
      }
    } catch (error) {
      console.error('Error restoring subscription:', error);
    }
  };

  const handleToggleStatus = async (restaurant: Restaurant) => {
    try {
      const newStatus = restaurant.status === 'active' ? 'inactive' : 'active';

      console.log(`🔄 Toggling restaurant ${restaurant.id} status from ${restaurant.status} to ${newStatus}`);

      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/restaurants/${restaurant.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          status: newStatus
        })
      });

      if (response.ok) {
        setRestaurants(restaurants.map(r =>
          r.id === restaurant.id ? {...r, status: newStatus} : r
        ));
        console.log(`✅ Restaurant status updated to ${newStatus}`);
      } else {
        const errorData = await response.json();
        console.error(`Failed to update status: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error toggling restaurant status:', error);
    }
  };

  const handleSubmitEdit = async () => {
    if (!editingRestaurant) return;

    try {
      console.log('🔄 Updating restaurant:', editingRestaurant);
      console.log('🔍 Selected edit managers:', selectedEditManagers);
      setEditModalWarning(''); // Clear previous warning

      // Validate required fields
      if (!editingRestaurant.name) {
        setEditModalWarning('Please fill in all required fields.');
        return;
      }

      // Validate admin change fields
      if (editAdminAction === 'create') {
        if (!editNewAdminData.fullName || !editNewAdminData.email || !editNewAdminData.username || !editNewAdminData.password) {
          setEditModalWarning('Please fill in all required new Admin fields.');
          return;
        }
      } else if (editAdminAction === 'change') {
        if (!editSelectedAdmin) {
          setEditModalWarning('Please select an existing user as new Admin.');
          return;
        }
      }

      // Create restaurant update data payload with all fields
      const updateData: any = {
        name: editingRestaurant.name,
        managerIds: selectedEditManagers.map(m => parseInt(m.id.toString())),
        email: editingRestaurant.email || '',
        phone: editingRestaurant.phone || '',
        address: editingRestaurant.address || editingRestaurant.location || '',
        location: editingRestaurant.address || editingRestaurant.location || '',
        city: editingRestaurant.city || '',
        state: editingRestaurant.state || '',
        postal_code: editingRestaurant.postalCode || '',
        country: editingRestaurant.country || 'MY',
        business_registration: editingRestaurant.businessRegistration || '',
        tax_id: editingRestaurant.taxId || '',
        cuisine: editingRestaurant.cuisine || 'Various',
        status: editingRestaurant.status,
        planType: editingRestaurant.planType || 'Basic Plan',
        planAmount: parseFloat(editingRestaurant.planAmount || '49.00'),
        currency: normalizeCurrencyCode(editingRestaurant.currency || 'MYR'),
        billingCycle: editingRestaurant.billingCycle || 'monthly',
        payment_model: editingRestaurant.paymentModel || 'restaurant',
        autoRenew: editingRestaurant.autoRenew || true,
        subscriptionStart: editingRestaurant.subscriptionStart,
        subscriptionEnd: editingRestaurant.subscriptionEnd,
        discount_type: editingRestaurant.discount_type || 'none',
        discount_value: editingRestaurant.discount_type && editingRestaurant.discount_type !== 'none' ? (editingRestaurant.discount_value || 0) : 0,
        discount_reason: editingRestaurant.discount_reason || ''
      };

      // Add admin change fields
      if (editAdminAction === 'create') {
        updateData.adminAction = 'create';
        updateData.adminEmail = editNewAdminData.email;
        updateData.adminPassword = editNewAdminData.password;
        updateData.adminUsername = editNewAdminData.username;
        updateData.adminFullName = editNewAdminData.fullName;
        updateData.adminPhone = editNewAdminData.phone || undefined;
      } else if (editAdminAction === 'change') {
        updateData.adminAction = 'change';
        updateData.adminUserId = parseInt(editSelectedAdmin.id.toString());
      }

      console.log('📤 Sending restaurant update data:', updateData);

      // Use direct fetch with Authorization header
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/restaurants/${editingRestaurant.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      });

      console.log('📡 Restaurant update API response status:', response.status);

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Restaurant updated successfully:', result);

        setEditModalWarning('');
        setShowEditModal(false);
        setEditingRestaurant(null);
        // Refresh restaurant list
        await fetchRestaurants();
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('❌ Failed to update restaurant:', errorData);
        let errorMsg = 'Please try again.';
        if (typeof errorData.error === 'string') {
          errorMsg = errorData.error;
        } else if (errorData.error?.message) {
          errorMsg = errorData.error.message;
          if (errorData.error.details?.length) {
            errorMsg += ': ' + errorData.error.details.map((d: any) => d.message).join(', ');
          }
        } else if (errorData.message) {
          errorMsg = errorData.message;
        }
        setEditModalWarning(errorMsg);
      }
    } catch (error) {
      console.error('❌ Error updating restaurant:', error);
      setEditModalWarning('Error updating restaurant. Please check your connection and try again.');
    }
  };

  const handleDeleteRestaurant = (restaurant: Restaurant) => {
    setDeletingRestaurant(restaurant);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteRestaurant = async () => {
    if (!deletingRestaurant) return;

    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/restaurants/${deletingRestaurant.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setShowDeleteConfirm(false);
        setDeletingRestaurant(null);
        setEditModalWarning('');
        setShowEditModal(false);
        setEditingRestaurant(null);

        // Refresh restaurant list
        await fetchRestaurants();
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        let errorMsg = 'Please try again.';
        if (typeof errorData.error === 'string') errorMsg = errorData.error;
        else if (errorData.error?.message) errorMsg = errorData.error.message;
        else if (errorData.message) errorMsg = errorData.message;
        setShowDeleteConfirm(false);
        setDeletingRestaurant(null);
        setEditModalWarning(`Error deleting restaurant: ${errorMsg}`);
      }
    } catch (error) {
      setShowDeleteConfirm(false);
      setDeletingRestaurant(null);
      setEditModalWarning('Error deleting restaurant. Please check your connection and try again.');
    }
  };

  const handleViewReport = (restaurant: Restaurant) => {
    console.log('Navigating to report for restaurant:', restaurant.name);
    // Navigate to report page with restaurant filter
    navigate(`/admin/report?restaurantId=${restaurant.id}&restaurantName=${encodeURIComponent(restaurant.name)}`);
  };

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.managerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || restaurant.status === filterStatus;

    // Check both old single managerId and new managers array for filtering
    const managerIdMatch = restaurant.managerId === filterManager;
    const managersArrayMatch = restaurant.managers && Array.isArray(restaurant.managers) &&
                               restaurant.managers.some((m: any) => m.id.toString() === filterManager);
    const matchesManager = filterManager === 'all' || managerIdMatch || managersArrayMatch;

    // Brand filtering
    const matchesBrand = filterBrand === 'all' ||
                         (restaurant.brand_id && restaurant.brand_id.toString() === filterBrand);

    // Debug logging for each restaurant when filtering by manager
    if (filterManager !== 'all') {
      console.log('🔍 Restaurant filter check:', {
        restaurantName: restaurant.name,
        restaurantManagerId: restaurant.managerId,
        restaurantManagers: restaurant.managers,
        filterManager,
        managerIdMatch,
        managersArrayMatch,
        matchesManager
      });
    }

    return matchesSearch && matchesStatus && matchesManager && matchesBrand;
  });

  console.log('🔍 Filter debug:', {
    totalRestaurants: restaurants.length,
    filteredRestaurants: filteredRestaurants.length,
    searchTerm,
    filterStatus,
    filterManager,
    restaurants: restaurants.slice(0, 2) // Show first 2 restaurants
  });

  const totalRestaurants = restaurants.length;
  const activeRestaurants = restaurants.filter(r => r.status === 'active').length;
  const totalSales = restaurants.reduce((sum, r) => sum + r.todaySales, 0);
  const totalOrders = restaurants.reduce((sum, r) => sum + r.todayOrders, 0);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star key={i} filled={i <= rating}>
          ★
        </Star>
      );
    }
    return stars;
  };

  const uniqueManagers = Array.from(new Set(restaurants.map(r => ({ id: r.managerId, name: r.managerName }))))
    .filter((manager, index, self) => self.findIndex(m => m.id === manager.id) === index);

  console.log('🎨 RestaurantsPage rendering with:', {
    restaurantsCount: restaurants.length,
    filteredCount: filteredRestaurants.length,
    managersCount: availableManagers.length,
    uniqueManagersCount: uniqueManagers.length,
    firstRestaurant: restaurants[0],
    firstFiltered: filteredRestaurants[0]
  });

  return (
    <>
      <Container>
        <Header>
          <Title>Restaurants</Title>
          <ActionSection>
            <ThemedButton variant="outline" onClick={handleExportRestaurants}>Export</ThemedButton>
            <ThemedButton variant="primary" onClick={handleAddRestaurant}>Add Restaurant</ThemedButton>
          </ActionSection>
        </Header>
        
        <Content>
          <StatsGrid>
          <StatCard color="#059669">
            <StatValue>{totalRestaurants}</StatValue>
            <StatLabel>Total Restaurants</StatLabel>
            <StatDescription>Across all managers</StatDescription>
          </StatCard>
          <StatCard color="#2563EB">
            <StatValue>{activeRestaurants}</StatValue>
            <StatLabel>Active Restaurants</StatLabel>
            <StatDescription>{totalRestaurants > 0 ? Math.round((activeRestaurants/totalRestaurants)*100) : 0}% operational</StatDescription>
          </StatCard>
          <StatCard color="#7C3AED">
            <StatValue>{formatCurrency(totalSales, operationSettings.currency)}</StatValue>
            <StatLabel>Today's Total Sales</StatLabel>
            <StatDescription>Combined revenue</StatDescription>
          </StatCard>
          <StatCard color="#D97706">
            <StatValue>{totalOrders}</StatValue>
            <StatLabel>Today's Orders</StatLabel>
            <StatDescription>All restaurants</StatDescription>
          </StatCard>
        </StatsGrid>

        <PageFilterWrapper>
          <FilterDropdownContainer>
            <DropdownInput
              type="text"
              placeholder="Search managers..."
              value={filterManagerSearchQuery}
              onChange={(e) => handleFilterManagerSearch(e.target.value)}
              onFocus={() => {
                setShowFilterManagerDropdown(true);
                if (filterManagerSearchQuery.length === 0) {
                  setFilteredFilterManagers(availableManagers.slice(0, 10));
                }
              }}
              onBlur={() => setTimeout(() => setShowFilterManagerDropdown(false), 200)}
            />
            {filterManager !== 'all' && filterManagerSearchQuery && (
              <ClearButton onClick={handleFilterManagerClear}>
                ×
              </ClearButton>
            )}
            <DropdownMenu show={showFilterManagerDropdown}>
              <DropdownItem onClick={() => {
                setFilterManager('all');
                setFilterManagerSearchQuery('');
                setShowFilterManagerDropdown(false);
              }}>
                <ManagerName>All Managers</ManagerName>
                <ManagerDetails>Show all restaurants</ManagerDetails>
              </DropdownItem>
              {filteredFilterManagers.map(manager => (
                <DropdownItem
                  key={manager.id}
                  onClick={() => handleFilterManagerSelect(manager)}
                >
                  <ManagerName>{manager.full_name || manager.username}</ManagerName>
                  <ManagerDetails>{manager.username} • {manager.email}</ManagerDetails>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </FilterDropdownContainer>
          <FilterDropdownContainer>
            <DropdownInput
              type="text"
              placeholder="Search brands..."
              value={filterBrandSearchQuery}
              onChange={(e) => handleFilterBrandSearch(e.target.value)}
              onFocus={() => {
                setShowFilterBrandDropdown(true);
                if (filterBrandSearchQuery.length === 0) {
                  setFilteredFilterBrands(brands.slice(0, 10));
                }
              }}
              onBlur={() => setTimeout(() => setShowFilterBrandDropdown(false), 200)}
            />
            {filterBrand !== 'all' && filterBrandSearchQuery && (
              <ClearButton onClick={handleFilterBrandClear}>
                ×
              </ClearButton>
            )}
            <DropdownMenu show={showFilterBrandDropdown}>
              <DropdownItem onClick={() => {
                setFilterBrand('all');
                setFilterBrandSearchQuery('');
                setShowFilterBrandDropdown(false);
                navigate('/pos/admin/restaurants', { replace: true });
              }}>
                <ManagerName>All Brands</ManagerName>
                <ManagerDetails>Show all restaurants</ManagerDetails>
              </DropdownItem>
              {filteredFilterBrands.map(brand => (
                <DropdownItem
                  key={brand.id}
                  onClick={() => handleFilterBrandSelect(brand)}
                >
                  <ManagerName>{brand.name}</ManagerName>
                  <ManagerDetails>{brand.code} • {brand.currency}</ManagerDetails>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </FilterDropdownContainer>
          <PageFilterSelect value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="trial">Trial</option>
            <option value="expired">Expired</option>
            <option value="suspended">Suspended</option>
            <option value="cancelled">Cancelled</option>
          </PageFilterSelect>
          <PageSearchInput
            placeholder="Search restaurants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </PageFilterWrapper>

        <RestaurantGrid>
          {filteredRestaurants.length === 0 ? (
            <div style={{ 
              gridColumn: '1 / -1',
              textAlign: 'center', 
              padding: '40px 20px',
              color: '#6B7280',
              fontSize: '16px'
            }}>
              {restaurants.length === 0
                ? 'Loading restaurants...'
                : 'No restaurants found matching your criteria.'
              }
              <br />
              <small style={{ fontSize: '14px', marginTop: '10px', display: 'block' }}>
                Total restaurants: {restaurants.length} | Filtered: {filteredRestaurants.length}
              </small>
            </div>
          ) : (
            filteredRestaurants.map(restaurant => (
            <RestaurantCard key={restaurant.id}>
              <RestaurantHeader>
                <RestaurantInfo>
                  <RestaurantName>{restaurant.name} {restaurant.currency && <span style={{ fontSize: '11px', fontWeight: 500, color: '#635BFF', background: '#F0EDFF', padding: '1px 6px', borderRadius: '4px', marginLeft: '6px', verticalAlign: 'middle' }}>{restaurant.currency}</span>}{restaurant.is_demo && <span style={{ fontSize: '10px', fontWeight: 600, color: '#fff', background: '#F59E0B', padding: '1px 6px', borderRadius: '4px', marginLeft: '6px', verticalAlign: 'middle' }}>DEMO</span>}{restaurant.is_test && <span style={{ fontSize: '10px', fontWeight: 600, color: '#fff', background: '#8B5CF6', padding: '1px 6px', borderRadius: '4px', marginLeft: '6px', verticalAlign: 'middle' }}>TEST</span>}</RestaurantName>
                  <RestaurantMeta>
                    Admin: {restaurant.admin ? `${restaurant.admin.name} (${restaurant.admin.email})` : 'No Admin Assigned'}
                  </RestaurantMeta>
                  {restaurant.managers && restaurant.managers.length > 0 && (
                    <RestaurantMeta>
                      Managers: {restaurant.managers.map(m => m.name).join(', ')}
                    </RestaurantMeta>
                  )}
                  <RestaurantMeta>{restaurant.location} • {restaurant.cuisine}</RestaurantMeta>
                </RestaurantInfo>
                <StatusBadge status={restaurant.status}>
                  {restaurant.status}
                </StatusBadge>
              </RestaurantHeader>

              <RatingContainer>
                {renderStars(restaurant.rating)}
                <span style={{ fontSize: '12px', color: '#6B7280', marginLeft: '4px' }}>
                  {restaurant.rating} • Created: {new Date(restaurant.createdAt).toLocaleDateString()}
                </span>
              </RatingContainer>

              <MetricsGrid>
                <Metric>
                  <MetricValue>{formatCurrency(restaurant.todaySales, operationSettings.currency)}</MetricValue>
                  <MetricLabel>Today's Sales</MetricLabel>
                </Metric>
                <Metric>
                  <MetricValue>{restaurant.todayOrders}</MetricValue>
                  <MetricLabel>Orders</MetricLabel>
                </Metric>
                <Metric>
                  <MetricValue>{restaurant.staffCount}</MetricValue>
                  <MetricLabel>Staff</MetricLabel>
                </Metric>
              </MetricsGrid>
              
              <div style={{ marginTop: '16px', display: 'flex', gap: '8px', paddingTop: '16px', borderTop: '1px solid #F3F4F6', flexWrap: 'wrap' }}>
                <ActiveButton onClick={() => handleViewRestaurant(restaurant)}>
                  View
                </ActiveButton>
                <ActionButton onClick={() => handleViewReport(restaurant)}>
                  Report
                </ActionButton>
                <ActionButton onClick={() => handleEditRestaurant(restaurant)}>
                  Edit
                </ActionButton>
                {(restaurant.status === 'suspended' || restaurant.status === 'overdue') && (
                  <ActionButton
                    onClick={() => handleRestoreSubscription(restaurant)}
                    style={{ background: '#EFF6FF', color: '#2563EB', border: '1px solid #93C5FD' }}
                  >
                    Restore
                  </ActionButton>
                )}
                <ActionButton
                  onClick={() => handleToggleStatus(restaurant)}
                  style={{
                    background: restaurant.status === 'active' ? '#FEE2E2' : '#ECFDF5',
                    color: restaurant.status === 'active' ? '#DC2626' : '#059669',
                    border: `1px solid ${restaurant.status === 'active' ? '#FCA5A5' : '#A7F3D0'}`
                  }}
                >
                  {restaurant.status === 'active' ? 'Deactivate' : 'Activate'}
                </ActionButton>
              </div>
            </RestaurantCard>
          )))}
        </RestaurantGrid>

        {/* Add Restaurant Modal */}
        {showAddModal && (
                    <CommonModal isOpen={true} onClose={() => setShowAddModal(false)} title="Add Restaurant" footer={<><ThemedButton variant="cancel" onClick={() => { setAddModalWarning(''); setShowAddModal(false); }}>Cancel</ThemedButton><ThemedButton variant="primary" onClick={handleSubmitAdd}>Add Restaurant</ThemedButton></>}>

                <FormGrid>
                  <FormGroup style={{ gridColumn: '1 / -1' }}>
                    <FormLabel>Restaurant Name *</FormLabel>
                    <FormInput
                      type="text"
                      placeholder="Enter restaurant name"
                      value={newRestaurant.name}
                      onChange={(e) => setNewRestaurant({...newRestaurant, name: e.target.value})}
                    />
                  </FormGroup>

                  {/* Restaurant Admin Section */}
                  <div style={{gridColumn: '1 / -1', marginTop: '8px', marginBottom: '4px'}}>
                    <h3 style={{margin: 0, fontSize: '16px', fontWeight: '600', color: '#0A2540', borderBottom: '2px solid #635BFF', paddingBottom: '8px'}}>
                      Restaurant Admin *
                    </h3>
                    <div style={{display: 'flex', gap: '16px', marginTop: '12px'}}>
                      <label style={{
                        display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer',
                        padding: '8px 16px', borderRadius: '8px',
                        background: adminAction === 'create' ? '#F0EFFF' : '#F9FAFB',
                        border: adminAction === 'create' ? '2px solid #635BFF' : '2px solid #E5E7EB',
                        transition: 'all 0.2s'
                      }}>
                        <input
                          type="radio"
                          name="adminAction"
                          checked={adminAction === 'create'}
                          onChange={() => { setAdminAction('create'); setSelectedAdmin(null); }}
                          style={{ accentColor: '#635BFF' }}
                        />
                        <span style={{fontSize: '14px', fontWeight: '500', color: '#374151'}}>Create New Account</span>
                      </label>
                      <label style={{
                        display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer',
                        padding: '8px 16px', borderRadius: '8px',
                        background: adminAction === 'assign' ? '#F0EFFF' : '#F9FAFB',
                        border: adminAction === 'assign' ? '2px solid #635BFF' : '2px solid #E5E7EB',
                        transition: 'all 0.2s'
                      }}>
                        <input
                          type="radio"
                          name="adminAction"
                          checked={adminAction === 'assign'}
                          onChange={() => { setAdminAction('assign'); setNewAdminData({ fullName: '', email: '', username: '', password: '', phone: '' }); }}
                          style={{ accentColor: '#635BFF' }}
                        />
                        <span style={{fontSize: '14px', fontWeight: '500', color: '#374151'}}>Select Existing User</span>
                      </label>
                    </div>
                  </div>

                  {adminAction === 'create' ? (
                    <>
                      <FormGroup>
                        <FormLabel>Admin Full Name *</FormLabel>
                        <FormInput
                          type="text"
                          placeholder="e.g., Kim Owner"
                          value={newAdminData.fullName}
                          onChange={(e) => setNewAdminData({...newAdminData, fullName: e.target.value})}
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormLabel>Admin Email *</FormLabel>
                        <FormInput
                          type="email"
                          placeholder="admin@restaurant.com"
                          value={newAdminData.email}
                          onChange={(e) => setNewAdminData({...newAdminData, email: e.target.value})}
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormLabel>Admin Username *</FormLabel>
                        <FormInput
                          type="text"
                          placeholder="e.g., kim_owner"
                          value={newAdminData.username}
                          onChange={(e) => setNewAdminData({...newAdminData, username: e.target.value})}
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormLabel>Admin Password *</FormLabel>
                        <FormInput
                          type="password"
                          placeholder="Min 8 chars, uppercase + lowercase + number"
                          value={newAdminData.password}
                          onChange={(e) => setNewAdminData({...newAdminData, password: e.target.value})}
                        />
                      </FormGroup>
                      <FormGroup style={{gridColumn: '1 / -1'}}>
                        <FormLabel>Admin Phone</FormLabel>
                        <PhoneInput
                          value={newAdminData.phone}
                          onChange={(value) => setNewAdminData({...newAdminData, phone: value})}
                          defaultCountry={newRestaurant.country}
                        />
                      </FormGroup>
                    </>
                  ) : (
                    <FormGroup style={{ position: 'relative', gridColumn: '1 / -1', zIndex: 100 }}>
                      <FormLabel>Search and select an existing user</FormLabel>
                      <DropdownContainer>
                        <DropdownInput
                          type="text"
                          placeholder="Type to search by name, email, or username..."
                          value={adminSearchQuery}
                          onChange={(e) => handleAdminSearch(e.target.value)}
                          onFocus={() => handleAdminSearch(adminSearchQuery)}
                          onBlur={() => setTimeout(() => setShowAdminDropdown(false), 200)}
                        />
                        <DropdownMenu show={showAdminDropdown}>
                          {adminCandidates.length === 0 ? (
                            <div style={{padding: '12px 16px', color: '#6B7280', fontSize: '13px'}}>
                              {adminSearchQuery.length > 0 ? 'No available users found' : 'Type to search users...'}
                            </div>
                          ) : (
                            adminCandidates.map(user => (
                              <DropdownItem
                                key={user.id}
                                onClick={() => handleAdminSelect(user)}
                              >
                                <ManagerName>{user.full_name || user.username}</ManagerName>
                                <ManagerDetails>{user.email} • {user.role}</ManagerDetails>
                              </DropdownItem>
                            ))
                          )}
                        </DropdownMenu>
                      </DropdownContainer>
                      {selectedAdmin && (
                        <div style={{
                          marginTop: '8px', padding: '12px 16px', background: '#F0EFFF',
                          borderRadius: '8px', border: '1px solid #D4D0FF',
                          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                        }}>
                          <div>
                            <div style={{fontWeight: '600', color: '#1F2937', fontSize: '14px'}}>
                              {selectedAdmin.full_name || selectedAdmin.username}
                            </div>
                            <div style={{fontSize: '12px', color: '#6B7280'}}>
                              {selectedAdmin.email} • {selectedAdmin.role}
                            </div>
                          </div>
                          <button
                            onClick={() => { setSelectedAdmin(null); setAdminSearchQuery(''); }}
                            style={{
                              background: 'none', border: 'none', cursor: 'pointer',
                              color: '#DC2626', fontSize: '18px', fontWeight: '600'
                            }}
                          >×</button>
                        </div>
                      )}
                    </FormGroup>
                  )}

                  {/* Oversight Managers (Optional) */}
                  <div style={{gridColumn: '1 / -1', marginTop: '16px', marginBottom: '4px'}}>
                    <h3 style={{margin: 0, fontSize: '16px', fontWeight: '600', color: '#0A2540', borderBottom: '1px solid #E5E7EB', paddingBottom: '8px'}}>
                      Oversight Managers (Optional)
                    </h3>
                    <div style={{fontSize: '12px', color: '#6B7280', marginTop: '4px'}}>
                      Brand/Foodcourt managers who oversee this restaurant
                    </div>
                  </div>

                  <FormGroup style={{ position: 'relative', gridColumn: '1 / -1', zIndex: 90 }}>
                    <DropdownContainer>
                      <DropdownInput
                        type="text"
                        placeholder="Search and select oversight managers..."
                        value={managerSearchQuery}
                        onChange={(e) => handleManagerSearch(e.target.value)}
                        onFocus={() => {
                          setShowManagerDropdown(true);
                          setFilteredManagers(availableManagers.slice(0, 10));
                        }}
                        onBlur={() => setTimeout(() => setShowManagerDropdown(false), 200)}
                      />
                      <DropdownMenu show={showManagerDropdown}>
                        {filteredManagers.map(manager => (
                          <DropdownItem
                            key={manager.id}
                            onClick={() => handleManagerSelect(manager)}
                          >
                            <ManagerName>{manager.full_name || manager.username}</ManagerName>
                            <ManagerDetails>{manager.username} • {manager.email} • {manager.role}</ManagerDetails>
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </DropdownContainer>
                    {selectedManagers.length > 0 && (
                      <SelectedManagersContainer>
                        {selectedManagers.map(manager => (
                          <ManagerTag key={manager.id}>
                            {manager.full_name || manager.username}
                            <RemoveTagButton onClick={() => handleRemoveManager(manager.id.toString())}>
                              ×
                            </RemoveTagButton>
                          </ManagerTag>
                        ))}
                      </SelectedManagersContainer>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Email Address *</FormLabel>
                    <FormInput
                      type="email"
                      placeholder="restaurant@example.com"
                      value={newRestaurant.email}
                      onChange={(e) => setNewRestaurant({...newRestaurant, email: e.target.value})}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Phone Number *</FormLabel>
                    <PhoneInput
                      value={newRestaurant.phone}
                      onChange={(value) => setNewRestaurant({...newRestaurant, phone: value})}
                      defaultCountry={newRestaurant.country}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Address *</FormLabel>
                    <FormTextarea
                      placeholder="Enter restaurant address"
                      value={newRestaurant.address}
                      onChange={(e) => setNewRestaurant({...newRestaurant, address: e.target.value})}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>City</FormLabel>
                    <FormInput
                      type="text"
                      placeholder="e.g., Kuala Lumpur"
                      value={newRestaurant.city}
                      onChange={(e) => setNewRestaurant({...newRestaurant, city: e.target.value})}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>State / Province</FormLabel>
                    <FormInput
                      type="text"
                      placeholder="e.g., Selangor"
                      value={newRestaurant.state}
                      onChange={(e) => setNewRestaurant({...newRestaurant, state: e.target.value})}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Postal Code</FormLabel>
                    <FormInput
                      type="text"
                      placeholder="e.g., 50000"
                      value={newRestaurant.postalCode}
                      onChange={(e) => setNewRestaurant({...newRestaurant, postalCode: e.target.value})}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Country</FormLabel>
                    <FormSelect
                      value={newRestaurant.country}
                      onChange={(e) => {
                        const countryCode = e.target.value;
                        const autoCurrency = COUNTRY_TO_CURRENCY[countryCode] || newRestaurant.currency;
                        const planCurrency = planCurrencies.includes(autoCurrency as any) ? autoCurrency : newRestaurant.currency;
                        const selectedPlan = availablePlans.find(p => p.display_name === newRestaurant.planType);
                        setNewRestaurant({
                          ...newRestaurant,
                          country: countryCode,
                          currency: planCurrency,
                          planAmount: selectedPlan ? String(getPlanPrice(selectedPlan, planCurrency)) : newRestaurant.planAmount
                        });
                      }}
                    >
                      {COUNTRIES.map(country => (
                        <option key={country.code} value={country.code}>
                          {country.name}
                        </option>
                      ))}
                    </FormSelect>
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Business Registration No.</FormLabel>
                    <FormInput
                      type="text"
                      placeholder="e.g., 123456-A"
                      value={newRestaurant.businessRegistration}
                      onChange={(e) => setNewRestaurant({...newRestaurant, businessRegistration: e.target.value})}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Tax ID / GST No.</FormLabel>
                    <FormInput
                      type="text"
                      placeholder="e.g., 000123456789"
                      value={newRestaurant.taxId}
                      onChange={(e) => setNewRestaurant({...newRestaurant, taxId: e.target.value})}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Cuisine Type</FormLabel>
                    <FormInput
                      type="text"
                      placeholder="e.g., Malaysian, Chinese, Italian"
                      value={newRestaurant.cuisine}
                      onChange={(e) => setNewRestaurant({...newRestaurant, cuisine: e.target.value})}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Currency *</FormLabel>
                    <FormSelect
                      value={newRestaurant.currency}
                      onChange={(e) => {
                        const cur = e.target.value;
                        const selectedPlan = availablePlans.find(p => p.display_name === newRestaurant.planType);
                        setNewRestaurant({
                          ...newRestaurant,
                          currency: cur,
                          planAmount: selectedPlan ? String(getPlanPrice(selectedPlan, cur)) : '0'
                        });
                      }}
                    >
                      {planCurrencies.map(cur => (
                        <option key={cur} value={cur}>{cur} ({formatCurrency(0, cur).charAt(0) === '0' ? cur : formatCurrency(0, cur).split(' ')[0]})</option>
                      ))}
                    </FormSelect>
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Plan Type *</FormLabel>
                    <FormSelect
                      value={newRestaurant.planType}
                      onChange={(e) => {
                        const selectedPlan = availablePlans.find(p => p.display_name === e.target.value);
                        setNewRestaurant({
                          ...newRestaurant,
                          planType: e.target.value,
                          planAmount: selectedPlan ? String(getPlanPrice(selectedPlan, newRestaurant.currency)) : '0'
                        });
                      }}
                    >
                      {availablePlans.filter(p => p.plan_target === 'restaurant').map(plan => (
                        <option key={plan.id} value={plan.display_name}>
                          {plan.display_name} ({formatPlanPrice(plan, newRestaurant.currency)}/month)
                        </option>
                      ))}
                    </FormSelect>
                  </FormGroup>

                  <FormGroup style={{gridColumn: '1 / -1'}}>
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '16px 20px',
                      background: newRestaurant.status === 'trial' ? '#F0EFFF' : '#F9FAFB',
                      borderRadius: '12px',
                      border: newRestaurant.status === 'trial' ? '2px solid #635BFF' : '2px solid #E5E7EB',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}>
                      <input
                        type="checkbox"
                        checked={newRestaurant.status === 'trial'}
                        onChange={(e) => {
                          if (e.target.checked) {
                            const startDate = new Date();
                            const endDate = new Date();
                            endDate.setDate(endDate.getDate() + 7);
                            setNewRestaurant({
                              ...newRestaurant,
                              status: 'trial',
                              subscriptionStart: startDate.toISOString().split('T')[0],
                              subscriptionEnd: endDate.toISOString().split('T')[0],
                              planAmount: '0.00'
                            });
                          } else {
                            setNewRestaurant({
                              ...newRestaurant,
                              status: 'active',
                              planAmount: String(getPlanPrice(availablePlans.find(p => p.display_name === newRestaurant.planType) || {}, newRestaurant.currency))
                            });
                          }
                        }}
                        style={{
                          width: '20px',
                          height: '20px',
                          accentColor: '#635BFF',
                          cursor: 'pointer'
                        }}
                      />
                      <div>
                        <div style={{fontWeight: '600', color: '#1F2937', fontSize: '15px'}}>
                          Apply 7-Day Free Trial
                        </div>
                        <div style={{fontSize: '13px', color: '#6B7280', marginTop: '2px'}}>
                          New restaurant will start with a 7-day free trial period
                        </div>
                      </div>
                    </label>
                  </FormGroup>

                  {/* Subscription Settings 섹션 */}
                  <div style={{gridColumn: '1 / -1', marginTop: '20px', marginBottom: '10px'}}>
                    <h3 style={{margin: 0, fontSize: '18px', fontWeight: '600', color: '#0A2540', borderBottom: '2px solid #635BFF', paddingBottom: '8px'}}>
                      Subscription Settings
                    </h3>
                  </div>

                  <FormGroup>
                    <FormLabel>Billing Cycle *</FormLabel>
                    <FormSelect
                      value={newRestaurant.billingCycle}
                      onChange={(e) => {
                        const cycle = e.target.value as 'monthly' | 'annual';
                        const selectedPlan = availablePlans.find((p: any) => p.display_name === newRestaurant.planType);
                        const price = selectedPlan ? getPlanPrice(selectedPlan, newRestaurant.currency, cycle) : 0;
                        setNewRestaurant({
                          ...newRestaurant,
                          billingCycle: cycle,
                          planAmount: price.toFixed(2)
                        });
                      }}
                    >
                      <option value="monthly">Monthly</option>
                      <option value="annual">Annual</option>
                    </FormSelect>
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Payment Model *</FormLabel>
                    <FormSelect
                      value={newRestaurant.paymentModel}
                      onChange={(e) => setNewRestaurant({...newRestaurant, paymentModel: e.target.value as any})}
                    >
                      <option value="restaurant">Restaurant Admin</option>
                      <option value="foodcourt_manager">Foodcourt Manager</option>
                      <option value="brand_manager">Brand Manager</option>
                    </FormSelect>
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Subscription Start Date *</FormLabel>
                    <FormInput
                      type="date"
                      value={newRestaurant.subscriptionStart}
                      onChange={(e) => setNewRestaurant({...newRestaurant, subscriptionStart: e.target.value})}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Subscription End Date *</FormLabel>
                    <FormInput
                      type="date"
                      value={newRestaurant.subscriptionEnd}
                      onChange={(e) => setNewRestaurant({...newRestaurant, subscriptionEnd: e.target.value})}
                    />
                  </FormGroup>

                  <FormGroup style={{gridColumn: '1 / -1'}}>
                    <label style={{display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer'}}>
                      <input
                        type="checkbox"
                        checked={newRestaurant.autoRenew}
                        onChange={(e) => setNewRestaurant({...newRestaurant, autoRenew: e.target.checked})}
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
                      {newRestaurant.planType} - {formatCurrency(parseFloat(newRestaurant.planAmount) || 0, newRestaurant.currency || 'MYR')} ({newRestaurant.billingCycle})
                    </div>
                    <div style={{fontSize: '12px', color: '#6B7280', marginTop: '4px'}}>
                      Paid by: {newRestaurant.paymentModel === 'brand_manager' ? 'Brand Manager' : newRestaurant.paymentModel === 'foodcourt_manager' ? 'Foodcourt Manager' : 'Restaurant Admin'}
                    </div>
                  </div>
                </FormGrid>
                {addModalWarning && (
                  <ModalWarning>{addModalWarning}</ModalWarning>
                )}
              
          </CommonModal>
        )}

        {/* Edit Restaurant Modal */}
        {showEditModal && editingRestaurant && (
                    <CommonModal isOpen={true} onClose={() => setShowEditModal(false)} title="Edit Restaurant" footer={<><ThemedButton variant="cancel" onClick={() => { setEditModalWarning(''); setShowEditModal(false); }}>Cancel</ThemedButton><ThemedButton variant="danger-outline" onClick={() => handleDeleteRestaurant(editingRestaurant)}>Delete</ThemedButton><ThemedButton variant="primary" onClick={handleSubmitEdit}>Update Restaurant</ThemedButton></>}>

                <FormGrid>
                  <FormGroup style={{ gridColumn: '1 / -1' }}>
                    <FormLabel>Restaurant Name *</FormLabel>
                    <FormInput
                      type="text"
                      placeholder="Enter restaurant name"
                      value={editingRestaurant.name}
                      onChange={(e) => setEditingRestaurant({...editingRestaurant, name: e.target.value})}
                    />
                  </FormGroup>

                  {/* Current Restaurant Admin */}
                  <div style={{gridColumn: '1 / -1', marginTop: '8px', marginBottom: '4px'}}>
                    <h3 style={{margin: 0, fontSize: '16px', fontWeight: '600', color: '#0A2540', borderBottom: '2px solid #635BFF', paddingBottom: '8px'}}>
                      Restaurant Admin
                    </h3>
                  </div>

                  {editingRestaurant.admin ? (
                    <div style={{gridColumn: '1 / -1', padding: '12px 16px', background: '#F0EFFF', borderRadius: '8px', border: '1px solid #D4D0FF'}}>
                      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <div>
                          <div style={{fontWeight: '600', color: '#1F2937', fontSize: '14px'}}>
                            {editingRestaurant.admin.name}
                          </div>
                          <div style={{fontSize: '12px', color: '#6B7280'}}>
                            {editingRestaurant.admin.email} {editingRestaurant.admin.phone ? `• ${editingRestaurant.admin.phone}` : ''}
                          </div>
                        </div>
                        {editAdminAction === 'keep' && (
                          <button
                            onClick={() => setEditAdminAction('change')}
                            style={{
                              background: '#FEF3C7', border: '1px solid #FCD34D', borderRadius: '6px',
                              padding: '6px 12px', cursor: 'pointer', fontSize: '12px', fontWeight: '600', color: '#92400E'
                            }}
                          >Change Admin</button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div style={{gridColumn: '1 / -1', padding: '12px 16px', background: '#FEF2F2', borderRadius: '8px', border: '1px solid #FECACA'}}>
                      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <div style={{fontSize: '13px', color: '#DC2626'}}>No Restaurant Admin assigned</div>
                        {editAdminAction === 'keep' && (
                          <button
                            onClick={() => setEditAdminAction('create')}
                            style={{
                              background: '#635BFF', border: 'none', borderRadius: '6px',
                              padding: '6px 12px', cursor: 'pointer', fontSize: '12px', fontWeight: '600', color: '#fff'
                            }}
                          >Assign Admin</button>
                        )}
                      </div>
                    </div>
                  )}

                  {editAdminAction !== 'keep' && (
                    <>
                      <div style={{gridColumn: '1 / -1', display: 'flex', gap: '16px', marginTop: '8px'}}>
                        <label style={{
                          display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer',
                          padding: '8px 16px', borderRadius: '8px',
                          background: editAdminAction === 'create' ? '#F0EFFF' : '#F9FAFB',
                          border: editAdminAction === 'create' ? '2px solid #635BFF' : '2px solid #E5E7EB'
                        }}>
                          <input type="radio" name="editAdminAction" checked={editAdminAction === 'create'}
                            onChange={() => { setEditAdminAction('create'); setEditSelectedAdmin(null); }}
                            style={{ accentColor: '#635BFF' }} />
                          <span style={{fontSize: '14px', fontWeight: '500', color: '#374151'}}>Create New Account</span>
                        </label>
                        <label style={{
                          display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer',
                          padding: '8px 16px', borderRadius: '8px',
                          background: editAdminAction === 'change' ? '#F0EFFF' : '#F9FAFB',
                          border: editAdminAction === 'change' ? '2px solid #635BFF' : '2px solid #E5E7EB'
                        }}>
                          <input type="radio" name="editAdminAction" checked={editAdminAction === 'change'}
                            onChange={() => { setEditAdminAction('change'); setEditNewAdminData({ fullName: '', email: '', username: '', password: '', phone: '' }); }}
                            style={{ accentColor: '#635BFF' }} />
                          <span style={{fontSize: '14px', fontWeight: '500', color: '#374151'}}>Select Existing User</span>
                        </label>
                        <button onClick={() => setEditAdminAction('keep')} style={{
                          background: 'none', border: '1px solid #E5E7EB', borderRadius: '8px',
                          padding: '8px 16px', cursor: 'pointer', fontSize: '13px', color: '#6B7280'
                        }}>Cancel</button>
                      </div>

                      {editAdminAction === 'create' ? (
                        <>
                          <FormGroup>
                            <FormLabel>New Admin Full Name *</FormLabel>
                            <FormInput type="text" placeholder="e.g., Kim Owner"
                              value={editNewAdminData.fullName}
                              onChange={(e) => setEditNewAdminData({...editNewAdminData, fullName: e.target.value})} />
                          </FormGroup>
                          <FormGroup>
                            <FormLabel>New Admin Email *</FormLabel>
                            <FormInput type="email" placeholder="admin@restaurant.com"
                              value={editNewAdminData.email}
                              onChange={(e) => setEditNewAdminData({...editNewAdminData, email: e.target.value})} />
                          </FormGroup>
                          <FormGroup>
                            <FormLabel>New Admin Username *</FormLabel>
                            <FormInput type="text" placeholder="e.g., kim_owner"
                              value={editNewAdminData.username}
                              onChange={(e) => setEditNewAdminData({...editNewAdminData, username: e.target.value})} />
                          </FormGroup>
                          <FormGroup>
                            <FormLabel>New Admin Password *</FormLabel>
                            <FormInput type="password" placeholder="Min 8 chars, uppercase + lowercase + number"
                              value={editNewAdminData.password}
                              onChange={(e) => setEditNewAdminData({...editNewAdminData, password: e.target.value})} />
                          </FormGroup>
                        </>
                      ) : (
                        <FormGroup style={{ position: 'relative', gridColumn: '1 / -1', zIndex: 100 }}>
                          <FormLabel>Search and select an existing user</FormLabel>
                          <DropdownContainer>
                            <DropdownInput type="text" placeholder="Type to search by name, email, or username..."
                              value={editAdminSearchQuery}
                              onChange={(e) => handleEditAdminSearch(e.target.value)}
                              onFocus={() => handleEditAdminSearch(editAdminSearchQuery)}
                              onBlur={() => setTimeout(() => setShowEditAdminDropdown(false), 200)} />
                            <DropdownMenu show={showEditAdminDropdown}>
                              {adminCandidates.length === 0 ? (
                                <div style={{padding: '12px 16px', color: '#6B7280', fontSize: '13px'}}>
                                  {editAdminSearchQuery.length > 0 ? 'No available users found' : 'Type to search users...'}
                                </div>
                              ) : (
                                adminCandidates.map(user => (
                                  <DropdownItem key={user.id} onClick={() => handleEditAdminSelect(user)}>
                                    <ManagerName>{user.full_name || user.username}</ManagerName>
                                    <ManagerDetails>{user.email} • {user.role}</ManagerDetails>
                                  </DropdownItem>
                                ))
                              )}
                            </DropdownMenu>
                          </DropdownContainer>
                          {editSelectedAdmin && (
                            <div style={{
                              marginTop: '8px', padding: '12px 16px', background: '#F0EFFF',
                              borderRadius: '8px', border: '1px solid #D4D0FF',
                              display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                            }}>
                              <div>
                                <div style={{fontWeight: '600', color: '#1F2937', fontSize: '14px'}}>
                                  {editSelectedAdmin.full_name || editSelectedAdmin.username}
                                </div>
                                <div style={{fontSize: '12px', color: '#6B7280'}}>
                                  {editSelectedAdmin.email} • {editSelectedAdmin.role}
                                </div>
                              </div>
                              <button onClick={() => { setEditSelectedAdmin(null); setEditAdminSearchQuery(''); }}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#DC2626', fontSize: '18px', fontWeight: '600' }}>
                                ×
                              </button>
                            </div>
                          )}
                        </FormGroup>
                      )}
                    </>
                  )}

                  {/* Oversight Managers (Optional) */}
                  <div style={{gridColumn: '1 / -1', marginTop: '16px', marginBottom: '4px'}}>
                    <h3 style={{margin: 0, fontSize: '16px', fontWeight: '600', color: '#0A2540', borderBottom: '1px solid #E5E7EB', paddingBottom: '8px'}}>
                      Oversight Managers
                    </h3>
                    <div style={{fontSize: '12px', color: '#6B7280', marginTop: '4px'}}>
                      Brand/Foodcourt managers who oversee this restaurant
                    </div>
                  </div>

                  <FormGroup style={{ position: 'relative', gridColumn: '1 / -1', zIndex: 90 }}>
                    <DropdownContainer>
                      <DropdownInput
                        type="text"
                        placeholder="Search and select oversight managers..."
                        value={editManagerSearchQuery}
                        onChange={(e) => handleEditManagerSearch(e.target.value)}
                        onFocus={() => {
                          setShowEditManagerDropdown(true);
                          if (editManagerSearchQuery.length === 0) {
                            setFilteredEditManagers(availableManagers.slice(0, 10));
                          }
                        }}
                        onBlur={() => setTimeout(() => setShowEditManagerDropdown(false), 200)}
                      />
                      <DropdownMenu show={showEditManagerDropdown}>
                        {filteredEditManagers.map(manager => (
                          <DropdownItem
                            key={manager.id}
                            onClick={() => handleEditManagerSelect(manager)}
                          >
                            <ManagerName>{manager.full_name || manager.username}</ManagerName>
                            <ManagerDetails>{manager.username} • {manager.email} • {manager.role}</ManagerDetails>
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </DropdownContainer>
                    {selectedEditManagers.length > 0 && (
                      <SelectedManagersContainer>
                        {selectedEditManagers.map(manager => (
                          <ManagerTag key={manager.id}>
                            {manager.full_name || manager.username}
                            <RemoveTagButton onClick={() => handleRemoveEditManager(manager.id.toString())}>
                              ×
                            </RemoveTagButton>
                          </ManagerTag>
                        ))}
                      </SelectedManagersContainer>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Email Address *</FormLabel>
                    <FormInput
                      type="email"
                      placeholder="restaurant@example.com"
                      value={editingRestaurant.email || ''}
                      onChange={(e) => setEditingRestaurant({...editingRestaurant, email: e.target.value})}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Phone Number *</FormLabel>
                    <PhoneInput
                      value={editingRestaurant.phone || ''}
                      onChange={(value) => setEditingRestaurant({...editingRestaurant, phone: value})}
                      defaultCountry={editingRestaurant.country}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Address *</FormLabel>
                    <FormTextarea
                      placeholder="Enter restaurant address"
                      value={editingRestaurant.address || editingRestaurant.location}
                      onChange={(e) => setEditingRestaurant({...editingRestaurant, address: e.target.value, location: e.target.value})}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>City</FormLabel>
                    <FormInput
                      type="text"
                      placeholder="e.g., Kuala Lumpur"
                      value={editingRestaurant.city || ''}
                      onChange={(e) => setEditingRestaurant({...editingRestaurant, city: e.target.value})}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>State / Province</FormLabel>
                    <FormInput
                      type="text"
                      placeholder="e.g., Selangor"
                      value={editingRestaurant.state || ''}
                      onChange={(e) => setEditingRestaurant({...editingRestaurant, state: e.target.value})}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Postal Code</FormLabel>
                    <FormInput
                      type="text"
                      placeholder="e.g., 50000"
                      value={editingRestaurant.postalCode || ''}
                      onChange={(e) => setEditingRestaurant({...editingRestaurant, postalCode: e.target.value})}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Country</FormLabel>
                    <FormSelect
                      value={editingRestaurant.country || 'MY'}
                      onChange={(e) => setEditingRestaurant({...editingRestaurant, country: e.target.value})}
                    >
                      {COUNTRIES.map(country => (
                        <option key={country.code} value={country.code}>
                          {country.name}
                        </option>
                      ))}
                    </FormSelect>
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Business Registration No.</FormLabel>
                    <FormInput
                      type="text"
                      placeholder="e.g., 123456-A"
                      value={editingRestaurant.businessRegistration || ''}
                      onChange={(e) => setEditingRestaurant({...editingRestaurant, businessRegistration: e.target.value})}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Tax ID / GST No.</FormLabel>
                    <FormInput
                      type="text"
                      placeholder="e.g., 000123456789"
                      value={editingRestaurant.taxId || ''}
                      onChange={(e) => setEditingRestaurant({...editingRestaurant, taxId: e.target.value})}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Cuisine Type</FormLabel>
                    <FormInput
                      type="text"
                      placeholder="e.g., Malaysian, Chinese, Italian"
                      value={editingRestaurant.cuisine}
                      onChange={(e) => setEditingRestaurant({...editingRestaurant, cuisine: e.target.value})}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Currency *</FormLabel>
                    <FormSelect
                      value={normalizeCurrencyCode(editingRestaurant.currency || 'MYR')}
                      onChange={(e) => {
                        const cur = e.target.value;
                        const selectedPlan = availablePlans.find(p => p.display_name === (editingRestaurant.planType || 'Basic Plan'));
                        setEditingRestaurant({
                          ...editingRestaurant,
                          currency: cur,
                          planAmount: selectedPlan ? String(getPlanPrice(selectedPlan, cur)) : editingRestaurant.planAmount
                        });
                      }}
                    >
                      {planCurrencies.map(cur => (
                        <option key={cur} value={cur}>{cur}</option>
                      ))}
                    </FormSelect>
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Plan Type *</FormLabel>
                    <FormSelect
                      value={editingRestaurant.planType || 'Basic Plan'}
                      onChange={(e) => {
                        const selectedPlan = availablePlans.find(p => p.display_name === e.target.value);
                        const cur = normalizeCurrencyCode(editingRestaurant.currency || 'MYR');
                        setEditingRestaurant({
                          ...editingRestaurant,
                          planType: e.target.value,
                          planAmount: selectedPlan ? String(getPlanPrice(selectedPlan, cur)) : '0'
                        });
                      }}
                    >
                      {availablePlans.filter(p => p.plan_target === 'restaurant').map(plan => (
                        <option key={plan.id} value={plan.display_name}>
                          {plan.display_name} ({formatPlanPrice(plan, normalizeCurrencyCode(editingRestaurant.currency || 'MYR'))}/month)
                        </option>
                      ))}
                    </FormSelect>
                  </FormGroup>

                  {/* Subscription Settings 섹션 */}
                  <div style={{gridColumn: '1 / -1', marginTop: '20px', marginBottom: '10px'}}>
                    <h3 style={{margin: 0, fontSize: '18px', fontWeight: '600', color: '#0A2540', borderBottom: '2px solid #635BFF', paddingBottom: '8px'}}>
                      Subscription Settings
                    </h3>
                  </div>

                  <FormGroup>
                    <FormLabel>Billing Cycle *</FormLabel>
                    <FormSelect
                      value={editingRestaurant.billingCycle || 'monthly'}
                      onChange={(e) => {
                        const cycle = e.target.value as 'monthly' | 'annual';
                        const selectedPlan = availablePlans.find((p: any) => p.display_name === (editingRestaurant.planType || 'Basic Plan'));
                        const cur = normalizeCurrencyCode(editingRestaurant.currency || 'MYR');
                        const price = selectedPlan ? getPlanPrice(selectedPlan, cur, cycle) : 0;
                        setEditingRestaurant({
                          ...editingRestaurant,
                          billingCycle: cycle,
                          planAmount: price.toFixed(2)
                        });
                      }}
                    >
                      <option value="monthly">Monthly</option>
                      <option value="annual">Annual</option>
                    </FormSelect>
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Payment Model *</FormLabel>
                    <FormSelect
                      value={editingRestaurant.paymentModel || 'restaurant'}
                      onChange={(e) => setEditingRestaurant({...editingRestaurant, paymentModel: e.target.value as any})}
                    >
                      <option value="restaurant">Restaurant Admin</option>
                      <option value="foodcourt_manager">Foodcourt Manager</option>
                      <option value="brand_manager">Brand Manager</option>
                    </FormSelect>
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Subscription Start Date *</FormLabel>
                    <FormInput
                      type="date"
                      value={editingRestaurant.subscriptionStart || new Date().toISOString().split('T')[0]}
                      onChange={(e) => setEditingRestaurant({...editingRestaurant, subscriptionStart: e.target.value})}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Subscription End Date *</FormLabel>
                    <FormInput
                      type="date"
                      value={editingRestaurant.subscriptionEnd || new Date(Date.now() + 365*24*60*60*1000).toISOString().split('T')[0]}
                      onChange={(e) => setEditingRestaurant({...editingRestaurant, subscriptionEnd: e.target.value})}
                    />
                  </FormGroup>

                  <FormGroup style={{gridColumn: '1 / -1'}}>
                    <label style={{display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer'}}>
                      <input
                        type="checkbox"
                        checked={editingRestaurant.autoRenew || true}
                        onChange={(e) => setEditingRestaurant({...editingRestaurant, autoRenew: e.target.checked})}
                        style={{width: '16px', height: '16px'}}
                      />
                      <span style={{fontSize: '14px', color: '#374151'}}>
                        Auto-renew subscription
                      </span>
                    </label>
                  </FormGroup>

                  {/* Subscription Discount */}
                  <div style={{gridColumn: '1 / -1', marginTop: '16px', marginBottom: '6px'}}>
                    <h4 style={{margin: 0, fontSize: '15px', fontWeight: '600', color: '#0A2540'}}>
                      Subscription Discount
                    </h4>
                    <p style={{margin: '4px 0 0', fontSize: '12px', color: '#6B7280'}}>
                      Applied automatically to System Admin subscription invoices
                    </p>
                  </div>

                  <FormGroup>
                    <FormLabel>Discount Type</FormLabel>
                    <FormSelect
                      value={editingRestaurant.discount_type || 'none'}
                      onChange={(e) => setEditingRestaurant({...editingRestaurant, discount_type: e.target.value as any, discount_value: e.target.value === 'none' ? 0 : editingRestaurant.discount_value})}
                    >
                      <option value="none">None</option>
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed Amount</option>
                    </FormSelect>
                  </FormGroup>

                  {editingRestaurant.discount_type && editingRestaurant.discount_type !== 'none' && (
                    <FormGroup>
                      <FormLabel>Discount Value {editingRestaurant.discount_type === 'percentage' ? '(%)' : '(Amount)'}</FormLabel>
                      <FormInput
                        type="number"
                        min="0"
                        max={editingRestaurant.discount_type === 'percentage' ? '100' : undefined}
                        step="0.01"
                        value={editingRestaurant.discount_value || ''}
                        onChange={(e) => setEditingRestaurant({...editingRestaurant, discount_value: parseFloat(e.target.value) || 0})}
                        placeholder={editingRestaurant.discount_type === 'percentage' ? 'e.g. 10' : 'e.g. 5.00'}
                      />
                    </FormGroup>
                  )}

                  {editingRestaurant.discount_type && editingRestaurant.discount_type !== 'none' && (
                    <FormGroup style={{gridColumn: '1 / -1'}}>
                      <FormLabel>Discount Reason</FormLabel>
                      <FormInput
                        type="text"
                        value={editingRestaurant.discount_reason || ''}
                        onChange={(e) => setEditingRestaurant({...editingRestaurant, discount_reason: e.target.value})}
                        placeholder="e.g. Early bird discount, Loyalty discount"
                      />
                    </FormGroup>
                  )}

                  <div style={{gridColumn: '1 / -1', padding: '16px', background: '#F3F4F6', borderRadius: '8px', marginTop: '10px'}}>
                    <div style={{fontSize: '14px', color: '#6B7280', marginBottom: '8px'}}>
                      <strong>Summary:</strong>
                    </div>
                    <div style={{fontSize: '16px', fontWeight: '600', color: '#0A2540'}}>
                      {editingRestaurant.planType || 'Basic Plan'} - {formatCurrency(parseFloat(editingRestaurant.planAmount || '0'), editingRestaurant.currency || 'MYR')} ({editingRestaurant.billingCycle || 'monthly'})
                      {editingRestaurant.discount_type && editingRestaurant.discount_type !== 'none' && (editingRestaurant.discount_value || 0) > 0 && (
                        <span style={{color: '#15803D', fontSize: '14px', marginLeft: '8px'}}>
                          (-{editingRestaurant.discount_type === 'percentage' ? `${editingRestaurant.discount_value}%` : formatCurrency(editingRestaurant.discount_value || 0, editingRestaurant.currency || 'MYR')})
                        </span>
                      )}
                    </div>
                    <div style={{fontSize: '12px', color: '#6B7280', marginTop: '4px'}}>
                      Paid by: {editingRestaurant.paymentModel === 'brand_manager' ? 'Brand Manager' : editingRestaurant.paymentModel === 'foodcourt_manager' ? 'Foodcourt Manager' : 'Restaurant Admin'}
                    </div>
                  </div>
                </FormGrid>
                {editModalWarning && (
                  <ModalWarning>{editModalWarning}</ModalWarning>
                )}
              
          </CommonModal>
        )}

        {/* View Restaurant Modal */}
        {showViewModal && selectedRestaurant && (
                    <CommonModal isOpen={true} onClose={() => setShowViewModal(false)} title="Restaurant Details" size="large" footer={<><ActionButton onClick={() => setShowViewModal(false)}>Close</ActionButton></>}>

                <FormGrid>
                  <FormGroup style={{ gridColumn: '1 / -1' }}>
                    <FormLabel>Restaurant Name</FormLabel>
                    <FormInput
                      type="text"
                      value={selectedRestaurant.name}
                      disabled
                      style={{ backgroundColor: '#F8FAFC', color: '#6B7280' }}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Restaurant Admin</FormLabel>
                    {selectedRestaurant.admin ? (
                      <div style={{padding: '10px 12px', background: '#F0EFFF', borderRadius: '8px', border: '1px solid #D4D0FF'}}>
                        <div style={{fontWeight: '600', color: '#1F2937', fontSize: '14px'}}>
                          {selectedRestaurant.admin.name}
                        </div>
                        <div style={{fontSize: '12px', color: '#6B7280', marginTop: '2px'}}>
                          {selectedRestaurant.admin.email} {selectedRestaurant.admin.phone ? `• ${selectedRestaurant.admin.phone}` : ''}
                        </div>
                      </div>
                    ) : (
                      <FormInput type="text" value="No Admin Assigned" disabled style={{ backgroundColor: '#FEF2F2', color: '#DC2626' }} />
                    )}
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Oversight Managers</FormLabel>
                    <FormTextarea
                      value={
                        selectedRestaurant.managers && selectedRestaurant.managers.length > 0
                          ? selectedRestaurant.managers.map((m, idx) =>
                              `${idx + 1}. ${m.name} - ${m.email} (${m.role})`
                            ).join('\n')
                          : 'No oversight managers assigned'
                      }
                      disabled
                      style={{ backgroundColor: '#F8FAFC', color: '#6B7280', minHeight: '60px' }}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Email Address</FormLabel>
                    <FormInput
                      type="email"
                      value={selectedRestaurant.email || 'N/A'}
                      disabled
                      style={{ backgroundColor: '#F8FAFC', color: '#6B7280' }}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Phone Number</FormLabel>
                    <FormInput
                      type="tel"
                      value={formatPhoneForDisplay(selectedRestaurant.phone) || 'N/A'}
                      disabled
                      style={{ backgroundColor: '#F8FAFC', color: '#6B7280' }}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Address</FormLabel>
                    <FormTextarea
                      value={selectedRestaurant.address || selectedRestaurant.location || 'N/A'}
                      disabled
                      style={{ backgroundColor: '#F8FAFC', color: '#6B7280' }}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Cuisine Type</FormLabel>
                    <FormInput
                      type="text"
                      value={selectedRestaurant.cuisine || 'Various'}
                      disabled
                      style={{ backgroundColor: '#F8FAFC', color: '#6B7280' }}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Status</FormLabel>
                    <FormInput
                      type="text"
                      value={selectedRestaurant.status ? selectedRestaurant.status.charAt(0).toUpperCase() + selectedRestaurant.status.slice(1) : 'Unknown'}
                      disabled
                      style={{ backgroundColor: '#F8FAFC', color: '#6B7280' }}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Plan Type</FormLabel>
                    <FormInput
                      type="text"
                      value={selectedRestaurant.planType || 'Basic Plan'}
                      disabled
                      style={{ backgroundColor: '#F8FAFC', color: '#6B7280' }}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Created Date</FormLabel>
                    <FormInput
                      type="text"
                      value={selectedRestaurant.createdAt ? new Date(selectedRestaurant.createdAt).toLocaleDateString() : 'N/A'}
                      disabled
                      style={{ backgroundColor: '#F8FAFC', color: '#6B7280' }}
                    />
                  </FormGroup>
                </FormGrid>
              
          </CommonModal>
        )}

        {/* Delete Confirm Modal */}
        <ConfirmModal
          isOpen={showDeleteConfirm}
          title="Delete Restaurant"
          message={`Are you sure you want to delete "${deletingRestaurant?.name}"? This action cannot be undone. All related data (orders, invoices, menu items, etc.) will be permanently removed.`}
          onConfirm={confirmDeleteRestaurant}
          onCancel={() => { setShowDeleteConfirm(false); setDeletingRestaurant(null); }}
          confirmText="Delete"
          cancelText="Cancel"
          type="danger"
        />

        </Content>
      </Container>
    </>
  );
};

export default RestaurantsPage;