import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MainLayout from '../../components/Layout/MainLayout';
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
} from '../../components/UI';
import { ModalWarning } from '../../components/UI/Modal';
// Using page-specific filter components instead of common ones
import { useStore } from '../../contexts/StoreContext';
import { formatCurrency } from '../../utils/currency';
import { formatPhoneForDisplay } from '../../utils/phoneUtils';
import PhoneInput from '../../components/common/PhoneInput';
// API imports removed - using direct fetch like StaffManagementPage and ManagersPage

interface Restaurant {
  id: string;
  name: string;
  managerId: string;
  managerName: string;
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
  planType?: string;
  planAmount?: string;
  billingCycle?: 'monthly' | 'annual';
  paymentModel?: 'manager' | 'restaurant';
  autoRenew?: boolean;
  subscriptionStart?: string;
  subscriptionEnd?: string;
  brand_id?: number;
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
      case 'inactive': return '#F3F4F6';
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
      case 'inactive': return '#6B7280';
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
  gap: 16px;
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

const FormTextarea = styled.textarea`
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 80px;
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
`;

// Filter용 Dropdown Container (고정 너비)
const FilterDropdownContainer = styled.div`
  position: relative;
  flex: 0 0 180px;

  @media (max-width: 600px) {
    flex: 1 1 100%;
    width: 100%;
  }
`;

const DropdownInput = styled.input`
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  width: 100%;
  min-width: 150px;

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
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
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
    planAmount: '29.00',
    status: 'active' as 'active' | 'trial' | 'expired' | 'suspended' | 'cancelled',
    // Subscription Settings 추가
    billingCycle: 'monthly' as 'monthly' | 'annual',
    paymentModel: 'manager' as 'manager' | 'restaurant',
    autoRenew: true,
    subscriptionStart: new Date().toISOString().split('T')[0],
    subscriptionEnd: '',
  });
  const [availableManagers, setAvailableManagers] = useState<any[]>([]);
  const [availablePlans, setAvailablePlans] = useState<any[]>([]);
  const [brands, setBrands] = useState<Array<{ id: number; name: string; code: string; currency: string }>>([]);

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
    console.log('🎯 RestaurantsPage useEffect triggered');
    console.log('🎯 searchParams:', searchParams.toString());

    fetchRestaurants();
    fetchPlans();
    fetchBrands();

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
      console.log('🔄 Fetching restaurants from API (using same method as StaffManagementPage)...');

      // Use exact same method as StaffManagementPage and ManagersPage - direct fetch
      const restaurantsResponse = await fetch('/api/restaurants');
      console.log('📡 Restaurants API response status:', restaurantsResponse.status);

      if (restaurantsResponse.ok) {
        const restaurantsData = await restaurantsResponse.json();
        console.log('✅ Restaurants API response:', restaurantsData);

        // Fetch managers from API for dropdown
        const managersResponse = await fetch('/api/users?role=Manager');
        console.log('📡 Managers API response status:', managersResponse.status);

        const managersData = managersResponse.ok ? await managersResponse.json() : [];
        console.log('✅ Managers API response:', managersData);

        // Handle both data array and direct array like StaffManagementPage
        const restaurantsArray = restaurantsData.data || restaurantsData;
        const managersArray = managersData.data || managersData;

        const restaurants = Array.isArray(restaurantsArray) ? restaurantsArray : [];
        const managers = Array.isArray(managersArray) ? managersArray : [];

        console.log('✅ Setting available managers:', managers);
        setAvailableManagers(managers);

        // Transform API data to Restaurant interface format
        const formattedRestaurants: Restaurant[] = restaurants.map((restaurant: any, index: number) => {
          return {
            id: restaurant.id?.toString() || `rest-${index}`,
            name: restaurant.name || 'Restaurant Name',
            managerId: restaurant.managerId || '', // Use already transformed managerId from backend
            managerName: restaurant.managerName || 'No Manager Assigned', // Use already transformed managerName from backend
            managers: restaurant.managers || [], // Include managers array from backend
            location: restaurant.location || 'Location not specified', // Use location field from backend
            cuisine: restaurant.cuisine || 'Various', // Use cuisine field from backend
            status: restaurant.status || 'active',
            todaySales: restaurant.todaySales || 0, // Use actual data from backend
            todayOrders: restaurant.todayOrders || 0, // Use actual data from backend
            staffCount: restaurant.staffCount || 0, // Use actual data from backend
            rating: restaurant.rating || 4.5, // Use actual data from backend
            createdAt: restaurant.createdAt ? new Date(restaurant.createdAt).toISOString().split('T')[0] : '2024-01-01',
            lastOrder: restaurant.lastOrder || 'Never', // Use actual data from backend
            brand_id: restaurant.brand_id || null, // Include brand_id from backend
            paymentModel: restaurant.payment_model || 'restaurant', // payment_model from backend
            subscriptionStart: restaurant.subscriptionStart || null,
            subscriptionEnd: restaurant.subscriptionEnd || null,
            planType: restaurant.planType || 'Basic Plan',
            planAmount: restaurant.planAmount || '29.00',
            billingCycle: restaurant.billingCycle || 'monthly',
            autoRenew: restaurant.autoRenew !== undefined ? restaurant.autoRenew : true
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
      cuisine: '',
      planType: firstPlan ? firstPlan.display_name : 'Basic Plan',
      planAmount: firstPlan ? firstPlan.base_price_monthly : '29.00',
      status: 'active',
      billingCycle: 'monthly',
      paymentModel: 'restaurant',
      autoRenew: true,
      subscriptionStart: new Date().toISOString().split('T')[0],
      subscriptionEnd: endDate.toISOString().split('T')[0]
    });
    setManagerSearchQuery('');
    setFilteredManagers([]);
    setShowManagerDropdown(false);
    setSelectedManagers([]);
    setShowAddModal(true);
  };

  const handleManagerSearch = (query: string) => {
    setManagerSearchQuery(query);
    setShowManagerDropdown(true);

    if (query.length < 2) {
      setFilteredManagers([]);
      return;
    }

    const filtered = availableManagers.filter(manager =>
      (manager.full_name && manager.full_name.toLowerCase().includes(query.toLowerCase())) ||
      (manager.username && manager.username.toLowerCase().includes(query.toLowerCase()))
    );
    setFilteredManagers(filtered.slice(0, 5));
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
    const defaultPlanAmount = restaurant.planAmount || (firstPlan ? firstPlan.base_price_monthly : '29.00');

    const editData = {
      ...restaurant,
      email: restaurant.email || '',
      phone: restaurant.phone || '',
      address: restaurant.location || '',
      planType: defaultPlanType,
      planAmount: defaultPlanAmount,
      billingCycle: (restaurant.billingCycle as 'monthly' | 'annual') || 'monthly',
      paymentModel: (restaurant.paymentModel as 'manager' | 'restaurant') || 'restaurant',
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
    setShowEditModal(true);
  };

  const handleSubmitAdd = async () => {
    try {
      console.log('Adding restaurant:', newRestaurant);
      console.log('Selected managers:', selectedManagers);
      setAddModalWarning(''); // Clear previous warning

      // Validate required fields
      if (!newRestaurant.name || selectedManagers.length === 0 || !newRestaurant.email || !newRestaurant.phone || !newRestaurant.address) {
        setAddModalWarning('Please fill in all required fields. At least one manager must be selected.');
        return;
      }

      // Use first manager as primary manager (for backward compatibility)
      const primaryManagerId = parseInt(selectedManagers[0].id.toString());

      // Create restaurant data payload following API integration guide
      const restaurantData = {
        name: newRestaurant.name,
        managerId: primaryManagerId,
        managerIds: selectedManagers.map(m => parseInt(m.id.toString())), // Send all selected managers
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
        billingCycle: newRestaurant.billingCycle,
        payment_model: newRestaurant.paymentModel,
        autoRenew: newRestaurant.autoRenew,
        subscriptionStart: newRestaurant.subscriptionStart,
        subscriptionEnd: newRestaurant.subscriptionEnd
      };

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
        setAddModalWarning(`Error creating restaurant: ${errorData.error || 'Please try again.'}`);
      }
    } catch (error) {
      console.error('❌ Error adding restaurant:', error);
      setAddModalWarning('Error adding restaurant. Please check your connection and try again.');
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
      if (!editingRestaurant.name || selectedEditManagers.length === 0) {
        setEditModalWarning('Please fill in all required fields. At least one manager must be selected.');
        return;
      }

      // Use first manager as primary manager (for backward compatibility)
      const primaryManagerId = parseInt(selectedEditManagers[0].id.toString());

      // Create restaurant update data payload with all fields
      const updateData = {
        name: editingRestaurant.name,
        managerId: primaryManagerId,
        managerIds: selectedEditManagers.map(m => parseInt(m.id.toString())), // Send all selected managers
        email: editingRestaurant.email || '',
        phone: editingRestaurant.phone || '',
        address: editingRestaurant.address || editingRestaurant.location || '',
        location: editingRestaurant.address || editingRestaurant.location || '',
        cuisine: editingRestaurant.cuisine || 'Various',
        status: editingRestaurant.status,
        planType: editingRestaurant.planType || 'Basic Plan',
        planAmount: parseFloat(editingRestaurant.planAmount || '29.00'),
        billingCycle: editingRestaurant.billingCycle || 'monthly',
        payment_model: editingRestaurant.paymentModel || 'restaurant',
        autoRenew: editingRestaurant.autoRenew || true,
        subscriptionStart: editingRestaurant.subscriptionStart,
        subscriptionEnd: editingRestaurant.subscriptionEnd
      };

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
        setEditModalWarning(`Error updating restaurant: ${errorData.error || 'Please try again.'}`);
      }
    } catch (error) {
      console.error('❌ Error updating restaurant:', error);
      setEditModalWarning('Error updating restaurant. Please check your connection and try again.');
    }
  };

  const handleDeleteRestaurant = async (restaurant: Restaurant) => {
    if (!confirm(`Are you sure you want to delete "${restaurant.name}"? This action cannot be undone.`)) {
      return;
    }

    try {
      console.log('Deleting restaurant:', restaurant.id);
      setEditModalWarning(''); // Clear previous warning

      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/restaurants/${restaurant.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('📡 Restaurant delete API response status:', response.status);

      if (response.ok) {
        console.log('✅ Restaurant deleted successfully');

        setEditModalWarning('');
        setShowEditModal(false);
        setEditingRestaurant(null);
        setSuccessMessage('Restaurant deleted successfully!');
        setShowSuccessModal(true);

        // Refresh restaurant list
        await fetchRestaurants();
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('❌ Failed to delete restaurant:', errorData);
        setEditModalWarning(`Error deleting restaurant: ${errorData.error || 'Please try again.'}`);
      }
    } catch (error) {
      console.error('❌ Error deleting restaurant:', error);
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
    <MainLayout>
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
          <PageSearchInput
            placeholder="Search restaurants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
                ? '🔄 Loading restaurants...' 
                : '📭 No restaurants found matching your criteria.'
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
                  <RestaurantName>{restaurant.name}</RestaurantName>
                  <RestaurantMeta>
                    {restaurant.managers && restaurant.managers.length > 0
                      ? restaurant.managers.map((m) =>
                          `${m.name}${m.isPrimary ? ' (Primary)' : ''}`
                        ).join(', ')
                      : restaurant.managerName || 'No Manager Assigned'
                    }
                  </RestaurantMeta>
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
          <ModalOverlay show={showAddModal} onClick={() => setShowAddModal(false)}>
            <Modal onClick={(e) => e.stopPropagation()}>
              <ModalHeader>
                <ModalTitle>Add Restaurant</ModalTitle>
                <CloseButton onClick={() => setShowAddModal(false)}>×</CloseButton>
              </ModalHeader>
              <ModalBody>
                <FormGrid>
                  <FormGroup>
                    <FormLabel>Restaurant Name *</FormLabel>
                    <FormInput
                      type="text"
                      placeholder="Enter restaurant name"
                      value={newRestaurant.name}
                      onChange={(e) => setNewRestaurant({...newRestaurant, name: e.target.value})}
                    />
                  </FormGroup>

                  <FormGroup style={{ position: 'relative' }}>
                    <FormLabel>Managers (Multiple selection supported)</FormLabel>
                    <DropdownContainer>
                      <DropdownInput
                        type="text"
                        placeholder="Type to search and select managers..."
                        value={managerSearchQuery}
                        onChange={(e) => handleManagerSearch(e.target.value)}
                        onFocus={() => {
                          setShowManagerDropdown(true);
                          if (managerSearchQuery.length === 0) {
                            setFilteredManagers(availableManagers.slice(0, 10));
                          }
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
                            <ManagerDetails>{manager.username} • {manager.email}</ManagerDetails>
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
                      onChange={(e) => setNewRestaurant({...newRestaurant, country: e.target.value})}
                    >
                      <option value="MY">Malaysia</option>
                      <option value="SG">Singapore</option>
                      <option value="TH">Thailand</option>
                      <option value="KR">South Korea</option>
                      <option value="ID">Indonesia</option>
                      <option value="PH">Philippines</option>
                      <option value="VN">Vietnam</option>
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
                    <FormLabel>Plan Type *</FormLabel>
                    <FormSelect
                      value={newRestaurant.planType}
                      onChange={(e) => {
                        const selectedPlan = availablePlans.find(p => p.display_name === e.target.value);
                        setNewRestaurant({
                          ...newRestaurant,
                          planType: e.target.value,
                          planAmount: selectedPlan?.base_price_monthly?.toString() || '29.00'
                        });
                      }}
                    >
                      {availablePlans.map(plan => (
                        <option key={plan.id} value={plan.display_name}>
                          {plan.display_name} ({formatCurrency(parseFloat(plan.base_price_monthly), operationSettings.currency)}/month)
                        </option>
                      ))}
                    </FormSelect>
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Status *</FormLabel>
                    <FormSelect
                      value={newRestaurant.status}
                      onChange={(e) => setNewRestaurant({...newRestaurant, status: e.target.value as any})}
                    >
                      <option value="active">Active</option>
                      <option value="trial">Trial</option>
                      <option value="expired">Expired</option>
                      <option value="suspended">Suspended</option>
                      <option value="cancelled">Cancelled</option>
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
                      value={newRestaurant.billingCycle}
                      onChange={(e) => {
                        const cycle = e.target.value as 'monthly' | 'annual';
                        const planAmounts: { [key: string]: { monthly: string, annual: string } } = {
                          'Basic Plan': { monthly: '29.00', annual: '290.00' },
                          'Professional Plan': { monthly: '99.00', annual: '990.00' },
                          'Enterprise Plan': { monthly: '199.00', annual: '2190.00' }
                        };
                        const amounts = planAmounts[newRestaurant.planType] || planAmounts['Basic Plan'];
                        setNewRestaurant({
                          ...newRestaurant,
                          billingCycle: cycle,
                          planAmount: amounts[cycle]
                        });
                      }}
                    >
                      <option value="monthly">Monthly</option>
                      <option value="annual">Annual (10% discount)</option>
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
                      {newRestaurant.planType} - ${newRestaurant.planAmount} ({newRestaurant.billingCycle})
                    </div>
                    <div style={{fontSize: '12px', color: '#6B7280', marginTop: '4px'}}>
                      Paid by: {newRestaurant.paymentModel === 'manager' ? 'Manager' : 'Restaurant'}
                    </div>
                  </div>
                </FormGrid>
                {addModalWarning && (
                  <ModalWarning>{addModalWarning}</ModalWarning>
                )}
              </ModalBody>
              <ModalActions>
                <ThemedButton variant="cancel" onClick={() => { setAddModalWarning(''); setShowAddModal(false); }}>Cancel</ThemedButton>
                <ThemedButton variant="primary" onClick={handleSubmitAdd}>Add Restaurant</ThemedButton>
              </ModalActions>
            </Modal>
          </ModalOverlay>
        )}

        {/* Edit Restaurant Modal */}
        {showEditModal && editingRestaurant && (
          <ModalOverlay show={showEditModal} onClick={() => setShowEditModal(false)}>
            <Modal onClick={(e) => e.stopPropagation()}>
              <ModalHeader>
                <ModalTitle>Edit Restaurant</ModalTitle>
                <CloseButton onClick={() => setShowEditModal(false)}>×</CloseButton>
              </ModalHeader>
              <ModalBody>
                <FormGrid>
                  <FormGroup>
                    <FormLabel>Restaurant Name *</FormLabel>
                    <FormInput
                      type="text"
                      placeholder="Enter restaurant name"
                      value={editingRestaurant.name}
                      onChange={(e) => setEditingRestaurant({...editingRestaurant, name: e.target.value})}
                    />
                  </FormGroup>

                  <FormGroup style={{ position: 'relative' }}>
                    <FormLabel>Managers (Multiple selection supported)</FormLabel>
                    <DropdownContainer>
                      <DropdownInput
                        type="text"
                        placeholder="Type to search and select managers..."
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
                            <ManagerDetails>{manager.username} • {manager.email}</ManagerDetails>
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
                    <FormLabel>Cuisine Type</FormLabel>
                    <FormInput
                      type="text"
                      placeholder="e.g., Malaysian, Chinese, Italian"
                      value={editingRestaurant.cuisine}
                      onChange={(e) => setEditingRestaurant({...editingRestaurant, cuisine: e.target.value})}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Plan Type *</FormLabel>
                    <FormSelect
                      value={editingRestaurant.planType || 'Basic Plan'}
                      onChange={(e) => {
                        const selectedPlan = availablePlans.find(p => p.display_name === e.target.value);
                        setEditingRestaurant({
                          ...editingRestaurant,
                          planType: e.target.value,
                          planAmount: selectedPlan?.base_price_monthly?.toString() || '29.00'
                        });
                      }}
                    >
                      {availablePlans.map(plan => (
                        <option key={plan.id} value={plan.display_name}>
                          {plan.display_name} ({formatCurrency(parseFloat(plan.base_price_monthly), operationSettings.currency)}/month)
                        </option>
                      ))}
                    </FormSelect>
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Status *</FormLabel>
                    <FormSelect
                      value={editingRestaurant.status}
                      onChange={(e) => setEditingRestaurant({...editingRestaurant, status: e.target.value as any})}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="trial">Trial</option>
                      <option value="expired">Expired</option>
                      <option value="suspended">Suspended</option>
                      <option value="cancelled">Cancelled</option>
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
                        const planAmounts: { [key: string]: { monthly: string, annual: string } } = {
                          'Basic Plan': { monthly: '29.00', annual: '290.00' },
                          'Professional Plan': { monthly: '99.00', annual: '990.00' },
                          'Enterprise Plan': { monthly: '199.00', annual: '2190.00' }
                        };
                        const amounts = planAmounts[editingRestaurant.planType || 'Basic Plan'] || planAmounts['Basic Plan'];
                        setEditingRestaurant({
                          ...editingRestaurant,
                          billingCycle: cycle,
                          planAmount: amounts[cycle]
                        });
                      }}
                    >
                      <option value="monthly">Monthly</option>
                      <option value="annual">Annual (10% discount)</option>
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

                  <div style={{gridColumn: '1 / -1', padding: '16px', background: '#F3F4F6', borderRadius: '8px', marginTop: '10px'}}>
                    <div style={{fontSize: '14px', color: '#6B7280', marginBottom: '8px'}}>
                      <strong>Summary:</strong>
                    </div>
                    <div style={{fontSize: '16px', fontWeight: '600', color: '#0A2540'}}>
                      {editingRestaurant.planType || 'Basic Plan'} - ${editingRestaurant.planAmount || '29.00'} ({editingRestaurant.billingCycle || 'monthly'})
                    </div>
                    <div style={{fontSize: '12px', color: '#6B7280', marginTop: '4px'}}>
                      Paid by: {(editingRestaurant.paymentModel || 'manager') === 'manager' ? 'Manager' : 'Restaurant'}
                    </div>
                  </div>
                </FormGrid>
                {editModalWarning && (
                  <ModalWarning>{editModalWarning}</ModalWarning>
                )}
              </ModalBody>
              <ModalActions>
                <ThemedButton variant="cancel" onClick={() => { setEditModalWarning(''); setShowEditModal(false); }}>Cancel</ThemedButton>
                <ThemedButton variant="danger-outline" onClick={() => handleDeleteRestaurant(editingRestaurant)}>Delete</ThemedButton>
                <ThemedButton variant="primary" onClick={handleSubmitEdit}>Update Restaurant</ThemedButton>
              </ModalActions>
            </Modal>
          </ModalOverlay>
        )}

        {/* View Restaurant Modal */}
        {showViewModal && selectedRestaurant && (
          <ModalOverlay show={showViewModal} onClick={() => setShowViewModal(false)}>
            <Modal onClick={(e) => e.stopPropagation()}>
              <ModalHeader>
                <ModalTitle>Restaurant Details</ModalTitle>
                <CloseButton onClick={() => setShowViewModal(false)}>×</CloseButton>
              </ModalHeader>
              <ModalBody>
                <FormGrid>
                  <FormGroup>
                    <FormLabel>Restaurant Name</FormLabel>
                    <FormInput
                      type="text"
                      value={selectedRestaurant.name}
                      disabled
                      style={{ backgroundColor: '#F8FAFC', color: '#6B7280' }}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Manager{selectedRestaurant.managers && selectedRestaurant.managers.length > 1 ? 's' : ''}</FormLabel>
                    <FormTextarea
                      value={
                        selectedRestaurant.managers && selectedRestaurant.managers.length > 0
                          ? selectedRestaurant.managers.map((m, idx) =>
                              `${idx + 1}. ${m.name}${m.isPrimary ? ' (Primary)' : ''} - ${m.email}`
                            ).join('\n')
                          : selectedRestaurant.managerName || 'No Manager Assigned'
                      }
                      disabled
                      style={{ backgroundColor: '#F8FAFC', color: '#6B7280', minHeight: '80px' }}
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
                      value={selectedRestaurant.status === 'active' ? 'Active' : 'Inactive'}
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
              </ModalBody>
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

        </Content>
      </Container>
    </MainLayout>
  );
};

export default RestaurantsPage;