import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import MainLayout from '../../components/Layout/MainLayout';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import { useAuth } from '../../contexts/AuthContext';
import { StatsGrid, StatCard, StatValue, StatLabel, StatTrend } from '../../components/UI';
// Using page-specific filter components instead of common ones
// 매니저는 브랜드 테마 적용 안함
import { BaseRestaurant } from '../../interfaces/Restaurant';

interface Restaurant extends Omit<BaseRestaurant, 'status'> {
  status: 'active' | 'trial' | 'expired' | 'suspended' | 'cancelled';
  cuisine: string;
  plan: 'basic' | 'professional' | 'enterprise';
  todaySales: number;
  todayOrders: number;
  staffCount: number;
  rating: number;
  createdAt: string;
  lastOrder: string;
  monthlyFee: number;
  nextPayment: string;
  brand_id?: number;
  recipe_manager_type?: 'restaurant' | 'brand';
}

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
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  background: ${props => {
    switch(props.status) {
      case 'active': return '#ECFDF5';
      case 'trial': return '#DBEAFE';
      case 'expired': return '#FEF2F2';
      case 'suspended': return '#FEF3C7';
      case 'cancelled': return '#F3F4F6';
      case 'inactive': return '#FEF2F2';
      case 'maintenance': return '#FEF3C7';
      default: return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'active': return '#059669';
      case 'trial': return '#1E40AF';
      case 'expired': return '#DC2626';
      case 'suspended': return '#D97706';
      case 'cancelled': return '#6B7280';
      case 'inactive': return '#DC2626';
      case 'maintenance': return '#D97706';
      default: return '#6B7280';
    }
  }};
`;

const PlanBadge = styled.span<{ plan: string }>`
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  margin-left: 8px;
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
      case 'enterprise': return '#5B21B6';
      case 'professional': return '#1E40AF';
      case 'basic': return '#6B7280';
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

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 8px 12px;
  background: transparent;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  color: #6B7280;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #635BFF;
    color: #635BFF;
    background: #F4F3FF;
  }
`;

// Modal Components (same as Admin)
const ModalOverlay = styled.div<{ show: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => props.show ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 10000;
`;

const Modal = styled.div`
  background: white;
  border-radius: 12px;
  padding: 0;
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

  @media (max-width: 768px) {
    width: 95%;
    max-width: none;
    margin: 20px;
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
  font-size: 28px;
  color: #6B7280;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  border-radius: 6px;
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

  button {
    min-width: 120px;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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
    background: #F9FAFB;
    color: #6B7280;
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
  flex: 0 1 250px;
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
  flex: 0 0 150px;
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

// Filter dropdown styled components
const DropdownContainer = styled.div`
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
  box-sizing: border-box;

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

const ItemName = styled.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 2px;
`;

const ItemDetails = styled.div`
  font-size: 12px;
  color: #6B7280;
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

const ManagerRestaurantsPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterBrand, setFilterBrand] = useState('all');
  const [filterBrandSearchQuery, setFilterBrandSearchQuery] = useState('');
  const [showFilterBrandDropdown, setShowFilterBrandDropdown] = useState(false);
  const [filteredFilterBrands, setFilteredFilterBrands] = useState<any[]>([]);

  const [newRestaurant, setNewRestaurant] = useState({
    name: '',
    managerId: '',
    email: '',
    phone: '',
    address: '',
    cuisine: '',
    planType: 'Basic Plan',
    planAmount: '29.00',
    status: 'trial' as 'active' | 'trial' | 'expired' | 'suspended' | 'cancelled',
    billingCycle: 'monthly' as 'monthly' | 'annual',
    paymentModel: 'manager' as 'manager' | 'restaurant',
    subscriptionStart: '',
    subscriptionEnd: '',
    autoRenew: true,
    brandId: '',
    recipeManagerType: 'restaurant' as 'restaurant' | 'brand'
  });
  const [editingRestaurant, setEditingRestaurant] = useState<Restaurant | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [brands, setBrands] = useState<Array<{ id: number; name: string; code: string; currency: string }>>([]);

  // Filter Brand Search Functions
  const handleFilterBrandSearch = (query: string) => {
    setFilterBrandSearchQuery(query);
    setShowFilterBrandDropdown(true);

    if (query.length < 1) {
      setFilteredFilterBrands(brands.slice(0, 10));
      return;
    }

    const filtered = brands.filter(brand => {
      const term = query.toLowerCase();
      const name = (brand.name || '').toLowerCase();
      const code = (brand.code || '').toLowerCase();
      return name.includes(term) || code.includes(term);
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
    navigate('/pos/manager/restaurants', { replace: true });
  };

  // Fetch brands for dropdown
  useEffect(() => {
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
    fetchBrands();

    // URL 파라미터에서 브랜드 ID를 읽어서 필터 설정
    const brandId = searchParams.get('brandId');
    const brandName = searchParams.get('brandName');

    if (brandId && brandName) {
      setFilterBrand(brandId);
      setFilterBrandSearchQuery(decodeURIComponent(brandName));
    }
  }, [searchParams]);

  useEffect(() => {
    console.log('🚀 useEffect TRIGGERED - RestaurantsPage');
    console.log(' User state:', user);
    console.log('⏱️ User loading state:', { user, isAuthenticated });

    const fetchRestaurants = async () => {
      try {
        // Wait for user to be loaded
        if (!user) {
          console.log('⏳ User not loaded yet, skipping restaurant fetch');
          console.log('❌ PROBLEM: User is null/undefined');
          return;
        }

        console.log(' Current user object:', user);
        console.log('🔍 user.id:', user?.id);
        console.log('🔍 user.role:', user?.role);
        console.log(' Fetching restaurants (role-based filtering on server)');
        console.log('🌐 API URL:', `/api/restaurants`);
        console.log('⚡ MAKING API CALL NOW...');

        const token = localStorage.getItem('auth_token');
        const response = await fetch(`/api/restaurants`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log('📡 Restaurants API response status:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log('🏪 Restaurant data from API:', data);
          console.log('🔄 Data length:', data.length);
          console.log('📋 Raw restaurant names:', data.map(r => r.name));
          
          // Transform backend data to match frontend interface
          const transformedRestaurants: Restaurant[] = data.map((restaurant: any) => ({
            id: restaurant.id.toString(),
            name: restaurant.name,
            branchName: restaurant.name, // Use name as branchName for now
            location: restaurant.address || 'No address provided',
            address: restaurant.address || 'No address provided',
            phone: restaurant.phone || 'No phone provided',
            email: restaurant.email || 'No email provided',
            brandId: restaurant.manager_id?.toString() || '1',
            brandName: restaurant.manager_name || 'Manager Brand',
            cuisine: restaurant.cuisine || 'Various',
            status: restaurant.status,
            plan: restaurant.plan_type?.toLowerCase().replace(' plan', '') as 'basic' | 'professional' | 'enterprise' || 'basic',
            todaySales: 0, // This would need to be calculated from orders API
            todayOrders: 0, // This would need to be calculated from orders API
            staffCount: 0, // This would need to be calculated from users API
            rating: 4.5, // Default rating
            createdAt: new Date(restaurant.createdAt).toISOString().split('T')[0],
            lastOrder: 'No orders yet', // This would need to be calculated from orders API
            monthlyFee: parseFloat(restaurant.plan_amount) || 29,
            nextPayment: restaurant.subscription_end ?
              new Date(restaurant.subscription_end).toISOString().split('T')[0] :
              new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
            brand_id: restaurant.brand_id || null,
            recipe_manager_type: restaurant.recipe_manager_type || 'restaurant'
          }));

          console.log('✅ Transformed restaurants:', transformedRestaurants);
          console.log('🎯 Setting restaurants state with', transformedRestaurants.length, 'items');
          console.log(' Restaurant names after transform:', transformedRestaurants.map(r => r.name));

          setRestaurants(transformedRestaurants);
        } else {
          console.error('Failed to fetch restaurants from API');
          setRestaurants([]);
        }
      } catch (error) {
        console.error('Error fetching restaurants:', error);
        setRestaurants([]);
      }
    };

    if (user) {
      fetchRestaurants();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Filter restaurants based on search and filters
  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          restaurant.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || restaurant.status === filterStatus;
    const matchesBrand = filterBrand === 'all' ||
                         (restaurant.brand_id && restaurant.brand_id.toString() === filterBrand);

    return matchesSearch && matchesStatus && matchesBrand;
  });

  const totalRestaurants = restaurants.length;
  const activeRestaurants = restaurants.filter(r => r.status === 'active').length;
  const totalSales = restaurants.reduce((sum, r) => sum + r.todaySales, 0);
  const totalOrders = restaurants.reduce((sum, r) => sum + r.todayOrders, 0);
  const totalStaff = restaurants.reduce((sum, r) => sum + r.staffCount, 0);

  // 디버깅: 렌더링 시 레스토랑 상태 출력
  console.log('🖼️ RENDER: Current restaurants state:', restaurants);
  console.log(' RENDER: totalRestaurants =', totalRestaurants);

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

  const handleAddRestaurant = () => {
    // Reset form and auto-fill manager information only
    const managerId = user?.managerId || user?.id || '8';
    const currentDate = new Date().toISOString().split('T')[0];
    const endDate = new Date();
    endDate.setFullYear(endDate.getFullYear() + 1);

    setNewRestaurant({
      name: '',
      managerId: managerId,
      email: '',
      phone: '',
      address: '',
      cuisine: '',
      planType: 'Basic Plan',
      planAmount: '29.00',
      status: 'trial',
      billingCycle: 'monthly',
      paymentModel: 'manager',
      subscriptionStart: currentDate,
      subscriptionEnd: endDate.toISOString().split('T')[0],
      autoRenew: true,
      brandId: '',
      recipeManagerType: 'restaurant'
    });
    setShowAddModal(true);
  };

  const handleSubmitNewRestaurant = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🔄 Restaurant submit called with data:', newRestaurant);
    
    try {
      const managerId = user?.managerId || user?.id || '2';
      const managerName = user?.name || 'Manager';
      
      const restaurantData = {
        name: newRestaurant.name,
        address: newRestaurant.address,
        phone: newRestaurant.phone,
        email: newRestaurant.email,
        cuisine: newRestaurant.cuisine,
        manager_id: managerId,
        manager_name: managerName,
        plan_type: newRestaurant.planType,
        plan_amount: parseFloat(newRestaurant.planAmount),
        status: newRestaurant.status,
        billing_cycle: newRestaurant.billingCycle,
        payment_model: newRestaurant.paymentModel,
        subscription_start: new Date(newRestaurant.subscriptionStart),
        subscription_end: new Date(newRestaurant.subscriptionEnd),
        auto_renew: newRestaurant.autoRenew,
        created_by: managerId,
        brand_id: newRestaurant.brandId ? parseInt(newRestaurant.brandId) : null,
        recipe_manager_type: newRestaurant.brandId ? newRestaurant.recipeManagerType : 'restaurant'
      };
      
      console.log('🏗️ Creating new restaurant:', restaurantData);
      
      const response = await fetch('/api/restaurants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(restaurantData)
      });
      
      console.log('📡 Create restaurant response status:', response.status);
      
      if (response.ok) {
        const result = await response.json();
        console.log('✅ Restaurant created successfully:', result);
        
        // Refresh the restaurants list
        const managerId = user?.managerId || user?.id || '8';
        const fetchResponse = await fetch(`/api/restaurants/manager/${managerId}`);
        if (fetchResponse.ok) {
          const data = await fetchResponse.json();
          const transformedRestaurants: Restaurant[] = data.map((restaurant: any) => ({
            id: restaurant.id.toString(),
            name: restaurant.name,
            branchName: restaurant.name,
            location: restaurant.address || 'No address provided',
            address: restaurant.address || 'No address provided',
            phone: restaurant.phone || 'No phone provided',
            email: restaurant.email || 'No email provided',
            brandId: restaurant.manager_id?.toString() || '1',
            brandName: restaurant.manager_name || 'Manager Brand',
            cuisine: 'Various',
            status: restaurant.status,
            plan: restaurant.plan_type?.toLowerCase().replace(' plan', '') as 'basic' | 'professional' | 'enterprise' || 'basic',
            todaySales: Math.floor(Math.random() * 5000) + 1000,
            todayOrders: Math.floor(Math.random() * 100) + 20,
            staffCount: Math.floor(Math.random() * 10) + 3,
            rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
            createdAt: new Date(restaurant.createdAt).toISOString().split('T')[0],
            lastOrder: `${Math.floor(Math.random() * 60)} mins ago`,
            monthlyFee: parseFloat(restaurant.plan_amount) || 29,
            nextPayment: restaurant.subscription_end ? 
              new Date(restaurant.subscription_end).toISOString().split('T')[0] : 
              new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0]
          }));
          setRestaurants(transformedRestaurants);
        }
        
        setShowAddModal(false);
        alert(`Restaurant "${newRestaurant.name}" added successfully with ${newRestaurant.planType}!`);

        // Reset form
        setNewRestaurant({
          name: '',
          managerId: '',
          email: '',
          phone: '',
          address: '',
          cuisine: '',
          planType: 'Basic Plan',
          planAmount: '29.00',
          status: 'trial',
          billingCycle: 'monthly',
          paymentModel: 'manager',
          subscriptionStart: '',
          subscriptionEnd: '',
          autoRenew: true,
          brandId: '',
          recipeManagerType: 'restaurant'
        });
      } else {
        const errorText = await response.text();
        console.error('Failed to create restaurant:', errorText);
        alert('Failed to create restaurant. Please try again.');
      }
    } catch (error) {
      console.error('Error creating restaurant:', error);
      alert('Error creating restaurant. Please try again.');
    }
  };

  const handleExportData = () => {
    const exportData = {
      exportDate: new Date().toISOString(),
      totalRestaurants: restaurants.length,
      manager: user?.name,
      restaurants: restaurants.map(restaurant => ({
        name: restaurant.name,
        location: restaurant.location,
        status: restaurant.status,
        plan: restaurant.plan,
        todaySales: restaurant.todaySales,
        todayOrders: restaurant.todayOrders,
        staffCount: restaurant.staffCount,
        rating: restaurant.rating,
        monthlyFee: restaurant.monthlyFee
      }))
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `restaurants-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleRestaurantClick = (restaurantId: string) => {
    // Navigate based on user role
    if (user?.role === 'Brand General') {
      navigate(`/pos/brand/general/reports?restaurant=${restaurantId}`);
    } else {
      // Manager roles go to manager reports
      navigate(`/pos/manager/reports?restaurant=${restaurantId}`);
    }
  };

  const handleEditRestaurant = (e: React.MouseEvent, restaurant: Restaurant) => {
    e.stopPropagation();
    setEditingRestaurant(restaurant);
    setNewRestaurant({
      name: restaurant.name,
      managerId: restaurant.brandId || '',
      email: restaurant.email,
      phone: restaurant.phone,
      address: restaurant.address,
      cuisine: restaurant.cuisine,
      planType: restaurant.plan === 'basic' ? 'Basic Plan' : restaurant.plan === 'professional' ? 'Professional Plan' : 'Enterprise Plan',
      planAmount: restaurant.monthlyFee?.toString() || '29.00',
      status: 'active',
      billingCycle: 'monthly',
      paymentModel: 'manager',
      subscriptionStart: '',
      subscriptionEnd: '',
      autoRenew: true,
      brandId: restaurant.brand_id?.toString() || '',
      recipeManagerType: restaurant.recipe_manager_type || 'restaurant'
    });
    setShowEditModal(true);
  };

  const handleUpdateRestaurant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingRestaurant) {
      try {
        const token = localStorage.getItem('auth_token');
        const updateData = {
          name: newRestaurant.name,
          email: newRestaurant.email,
          phone: newRestaurant.phone,
          address: newRestaurant.address,
          cuisine: newRestaurant.cuisine,
          status: newRestaurant.status,
          plan_type: newRestaurant.planType,
          plan_amount: parseFloat(newRestaurant.planAmount),
          brand_id: newRestaurant.brandId ? parseInt(newRestaurant.brandId) : null,
          recipe_manager_type: newRestaurant.brandId ? newRestaurant.recipeManagerType : 'restaurant'
        };

        console.log('🔄 Updating restaurant:', editingRestaurant.id, updateData);

        const response = await fetch(`/api/restaurants/${editingRestaurant.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(updateData)
        });

        if (response.ok) {
          // Update local state
          const updatedRestaurants = restaurants.map(rest =>
            rest.id === editingRestaurant.id
              ? {
                  ...rest,
                  name: newRestaurant.name,
                  email: newRestaurant.email,
                  phone: newRestaurant.phone,
                  address: newRestaurant.address,
                  location: newRestaurant.address,
                  cuisine: newRestaurant.cuisine,
                  status: newRestaurant.status as 'active' | 'trial' | 'expired' | 'suspended' | 'cancelled',
                  plan: newRestaurant.planType.toLowerCase().replace(' plan', '') as 'basic' | 'professional' | 'enterprise',
                  monthlyFee: parseFloat(newRestaurant.planAmount),
                  brand_id: newRestaurant.brandId ? parseInt(newRestaurant.brandId) : undefined
                }
              : rest
          );
          setRestaurants(updatedRestaurants);
          setShowEditModal(false);
          setEditingRestaurant(null);
          setNewRestaurant({
            name: '',
            managerId: '',
            email: '',
            phone: '',
            address: '',
            cuisine: '',
            planType: 'Basic Plan',
            planAmount: '29.00',
            status: 'trial',
            billingCycle: 'monthly',
            paymentModel: 'manager',
            subscriptionStart: '',
            subscriptionEnd: '',
            autoRenew: true,
            brandId: '',
            recipeManagerType: 'restaurant'
          });
          console.log('✅ Restaurant updated successfully');
        } else {
          const errorText = await response.text();
          console.error('Failed to update restaurant:', errorText);
          alert('Failed to update restaurant. Please try again.');
        }
      } catch (error) {
        console.error('Error updating restaurant:', error);
        alert('Error updating restaurant. Please try again.');
      }
    }
  };

  const handleDeleteRestaurant = (e: React.MouseEvent, restaurantId: string) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this restaurant?')) {
      setRestaurants(restaurants.filter(r => r.id !== restaurantId));
    }
  };

  const handleViewReports = (e: React.MouseEvent, restaurant: Restaurant) => {
    e.stopPropagation();
    // Navigate to manager reports with restaurant filter
    navigate(`/manager/reports?restaurant=${restaurant.id}`);
  };


  return (
    <MainLayout>
      <Container>
        <Header>
          <Title>Restaurants</Title>
          <ActionSection>
            <Button variant="secondary" onClick={handleExportData}>Export Data</Button>
            <Button variant="primary" onClick={handleAddRestaurant}>Add Restaurant</Button>
          </ActionSection>
        </Header>
        
        <Content>
          <StatsGrid>
            <StatCard color="#059669">
              <StatValue>{totalRestaurants}</StatValue>
              <StatLabel>Total Restaurants</StatLabel>
              <StatTrend trend="up">+1 this month</StatTrend>
            </StatCard>
            <StatCard color="#2563EB">
              <StatValue>{activeRestaurants}</StatValue>
              <StatLabel>Active Restaurants</StatLabel>
              <StatTrend trend="up">{Math.round((activeRestaurants/totalRestaurants)*100)}% operational</StatTrend>
            </StatCard>
            <StatCard color="#7C3AED">
              <StatValue>RM {totalSales.toLocaleString()}</StatValue>
              <StatLabel>Today's Total Sales</StatLabel>
              <StatTrend trend="up">+24% vs yesterday</StatTrend>
            </StatCard>
            <StatCard color="#DC2626">
              <StatValue>{totalOrders}</StatValue>
              <StatLabel>Today's Orders</StatLabel>
              <StatTrend trend="up">+18% vs yesterday</StatTrend>
            </StatCard>
            <StatCard color="#D97706">
              <StatValue>{totalStaff}</StatValue>
              <StatLabel>Total Staff</StatLabel>
              <StatTrend trend="neutral">All present</StatTrend>
            </StatCard>
          </StatsGrid>

          <PageFilterWrapper>
            <PageSearchInput
              placeholder="Search restaurants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <DropdownContainer>
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
                  navigate('/pos/manager/restaurants', { replace: true });
                }}>
                  <ItemName>All Brands</ItemName>
                  <ItemDetails>Show all restaurants</ItemDetails>
                </DropdownItem>
                {filteredFilterBrands.map(brand => (
                  <DropdownItem
                    key={brand.id}
                    onClick={() => handleFilterBrandSelect(brand)}
                  >
                    <ItemName>{brand.name}</ItemName>
                    <ItemDetails>{brand.code} • {brand.currency}</ItemDetails>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </DropdownContainer>
            <PageFilterSelect value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="trial">Trial</option>
              <option value="expired">Expired</option>
              <option value="suspended">Suspended</option>
              <option value="cancelled">Cancelled</option>
            </PageFilterSelect>
          </PageFilterWrapper>

          <RestaurantGrid>
            {filteredRestaurants.map(restaurant => (
              <RestaurantCard key={restaurant.id} onClick={() => handleRestaurantClick(restaurant.id)}>
                <RestaurantHeader>
                  <RestaurantInfo>
                    <RestaurantName>{restaurant.name}</RestaurantName>
                    {restaurant.brand_id && (
                      <RestaurantMeta style={{ fontWeight: '600', color: '#635BFF' }}>
                        {brands.find(b => b.id === restaurant.brand_id)?.name || 'Brand'}
                      </RestaurantMeta>
                    )}
                    <RestaurantMeta>{restaurant.location} • {restaurant.cuisine}</RestaurantMeta>
                    <RestaurantMeta>{restaurant.address}</RestaurantMeta>
                  </RestaurantInfo>
                  <div>
                    <StatusBadge status={restaurant.status}>
                      {restaurant.status}
                    </StatusBadge>
                    <PlanBadge plan={restaurant.plan}>
                      {restaurant.plan}
                    </PlanBadge>
                  </div>
                </RestaurantHeader>

                <RatingContainer>
                  {renderStars(restaurant.rating)}
                  <span style={{ fontSize: '12px', color: '#6B7280', marginLeft: '4px' }}>
                    {restaurant.rating} • Last order: {restaurant.lastOrder}
                  </span>
                </RatingContainer>

                <MetricsGrid>
                  <Metric>
                    <MetricValue>RM {restaurant.todaySales.toLocaleString()}</MetricValue>
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

                <ActionButtons>
                  <ActionButton onClick={(e) => handleEditRestaurant(e, restaurant)}>Edit</ActionButton>
                  <ActionButton onClick={(e) => handleViewReports(e, restaurant)}>View Reports</ActionButton>
                  <ActionButton onClick={(e) => handleDeleteRestaurant(e, restaurant.id)} style={{ color: '#DC2626', borderColor: '#FEE2E2' }}>Delete</ActionButton>
                </ActionButtons>
              </RestaurantCard>
            ))}
          </RestaurantGrid>
        </Content>
      </Container>

      {/* Add Restaurant Modal */}
      {showAddModal && (
        <ModalOverlay show={showAddModal} onClick={() => setShowAddModal(false)}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Add New Restaurant</ModalTitle>
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

                <FormGroup>
                  <FormLabel>Manager *</FormLabel>
                  <FormInput
                    type="text"
                    value={user?.name || 'K-DINE Chain Manager'}
                    disabled
                  />
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
                  <FormInput
                    type="tel"
                    placeholder="+60123456789"
                    value={newRestaurant.phone}
                    onChange={(e) => setNewRestaurant({...newRestaurant, phone: e.target.value})}
                  />
                </FormGroup>

                <FormGroup style={{gridColumn: '1 / -1'}}>
                  <FormLabel>Address *</FormLabel>
                  <FormTextarea
                    placeholder="Enter restaurant address"
                    value={newRestaurant.address}
                    onChange={(e) => setNewRestaurant({...newRestaurant, address: e.target.value})}
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
                  <FormLabel>Brand (Franchise)</FormLabel>
                  <FormSelect
                    value={newRestaurant.brandId}
                    onChange={(e) => setNewRestaurant({...newRestaurant, brandId: e.target.value, recipeManagerType: e.target.value ? 'brand' : 'restaurant'})}
                  >
                    <option value="">-- Independent (No Brand) --</option>
                    {brands.map(brand => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name} ({brand.code}) - {brand.currency}
                      </option>
                    ))}
                  </FormSelect>
                </FormGroup>

                {newRestaurant.brandId && (
                  <FormGroup>
                    <FormLabel>Recipe Management</FormLabel>
                    <FormSelect
                      value={newRestaurant.recipeManagerType}
                      onChange={(e) => setNewRestaurant({...newRestaurant, recipeManagerType: e.target.value as 'restaurant' | 'brand'})}
                    >
                      <option value="brand">Brand Managed (use brand recipes)</option>
                      <option value="restaurant">Restaurant Managed (independent recipes)</option>
                    </FormSelect>
                    <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
                      {newRestaurant.recipeManagerType === 'brand'
                        ? 'Recipes will be managed by the brand. Restaurant cannot create own recipes.'
                        : 'Restaurant can create and manage its own recipes independently.'}
                    </div>
                  </FormGroup>
                )}

                <FormGroup>
                  <FormLabel>Plan Type *</FormLabel>
                  <FormSelect
                    value={newRestaurant.planType}
                    onChange={(e) => {
                      const planAmounts: Record<string, string> = {
                        'Basic Plan': '29.00',
                        'Professional Plan': '99.00',
                        'Enterprise Plan': '199.00'
                      };
                      setNewRestaurant({
                        ...newRestaurant,
                        planType: e.target.value,
                        planAmount: planAmounts[e.target.value] || '29.00'
                      });
                    }}
                  >
                    <option value="Basic Plan">Basic Plan (RM 29/month)</option>
                    <option value="Professional Plan">Professional Plan (RM 99/month)</option>
                    <option value="Enterprise Plan">Enterprise Plan (RM 199/month)</option>
                  </FormSelect>
                </FormGroup>

                <FormGroup>
                  <FormLabel>Status *</FormLabel>
                  <FormSelect
                    value={newRestaurant.status}
                    onChange={(e) => setNewRestaurant({...newRestaurant, status: e.target.value as 'active' | 'trial' | 'expired' | 'suspended' | 'cancelled'})}
                  >
                    <option value="active">Active</option>
                    <option value="trial">Trial</option>
                    <option value="expired">Expired</option>
                    <option value="suspended">Suspended</option>
                    <option value="cancelled">Cancelled</option>
                  </FormSelect>
                </FormGroup>

                {/* Subscription Settings */}
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
                      const planAmounts = {
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
                    onChange={(e) => setNewRestaurant({...newRestaurant, paymentModel: e.target.value as 'manager' | 'restaurant'})}
                  >
                    <option value="manager">Manager Pays</option>
                    <option value="restaurant">Restaurant Pays</option>
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
            </ModalBody>
            <ModalActions>
              <ThemedButton variant="cancel" onClick={() => setShowAddModal(false)}>Cancel</ThemedButton>
              <ThemedButton variant="primary" onClick={handleSubmitNewRestaurant}>Add Restaurant</ThemedButton>
            </ModalActions>
          </Modal>
        </ModalOverlay>
      )}

      {/* Edit Restaurant Modal */}
      {showEditModal && (
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
                    value={newRestaurant.name}
                    onChange={(e) => setNewRestaurant({...newRestaurant, name: e.target.value})}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Manager *</FormLabel>
                  <FormInput
                    type="text"
                    value={user?.name || 'K-DINE Chain Manager'}
                    disabled
                  />
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
                  <FormInput
                    type="tel"
                    placeholder="+60123456789"
                    value={newRestaurant.phone}
                    onChange={(e) => setNewRestaurant({...newRestaurant, phone: e.target.value})}
                  />
                </FormGroup>

                <FormGroup style={{gridColumn: '1 / -1'}}>
                  <FormLabel>Address *</FormLabel>
                  <FormTextarea
                    placeholder="Enter restaurant address"
                    value={newRestaurant.address}
                    onChange={(e) => setNewRestaurant({...newRestaurant, address: e.target.value})}
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
                  <FormLabel>Brand (Franchise)</FormLabel>
                  <FormSelect
                    value={newRestaurant.brandId}
                    onChange={(e) => setNewRestaurant({...newRestaurant, brandId: e.target.value, recipeManagerType: e.target.value ? 'brand' : 'restaurant'})}
                  >
                    <option value="">-- Independent (No Brand) --</option>
                    {brands.map(brand => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name} ({brand.code}) - {brand.currency}
                      </option>
                    ))}
                  </FormSelect>
                </FormGroup>

                {newRestaurant.brandId && (
                  <FormGroup>
                    <FormLabel>Recipe Management</FormLabel>
                    <FormSelect
                      value={newRestaurant.recipeManagerType}
                      onChange={(e) => setNewRestaurant({...newRestaurant, recipeManagerType: e.target.value as 'restaurant' | 'brand'})}
                    >
                      <option value="brand">Brand Managed (use brand recipes)</option>
                      <option value="restaurant">Restaurant Managed (independent recipes)</option>
                    </FormSelect>
                    <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
                      {newRestaurant.recipeManagerType === 'brand'
                        ? 'Recipes will be managed by the brand. Restaurant cannot create own recipes.'
                        : 'Restaurant can create and manage its own recipes independently.'}
                    </div>
                  </FormGroup>
                )}

                <FormGroup>
                  <FormLabel>Plan Type *</FormLabel>
                  <FormSelect
                    value={newRestaurant.planType}
                    onChange={(e) => {
                      const planAmounts: Record<string, string> = {
                        'Basic Plan': '29.00',
                        'Professional Plan': '99.00',
                        'Enterprise Plan': '199.00'
                      };
                      setNewRestaurant({
                        ...newRestaurant,
                        planType: e.target.value,
                        planAmount: planAmounts[e.target.value] || '29.00'
                      });
                    }}
                  >
                    <option value="Basic Plan">Basic Plan (RM 29/month)</option>
                    <option value="Professional Plan">Professional Plan (RM 99/month)</option>
                    <option value="Enterprise Plan">Enterprise Plan (RM 199/month)</option>
                  </FormSelect>
                </FormGroup>

                <FormGroup>
                  <FormLabel>Status *</FormLabel>
                  <FormSelect
                    value={newRestaurant.status}
                    onChange={(e) => setNewRestaurant({...newRestaurant, status: e.target.value as 'active' | 'trial' | 'expired' | 'suspended' | 'cancelled'})}
                  >
                    <option value="active">Active</option>
                    <option value="trial">Trial</option>
                    <option value="expired">Expired</option>
                    <option value="suspended">Suspended</option>
                    <option value="cancelled">Cancelled</option>
                  </FormSelect>
                </FormGroup>

                {/* Subscription Settings */}
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
                      const planAmounts = {
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
                    onChange={(e) => setNewRestaurant({...newRestaurant, paymentModel: e.target.value as 'manager' | 'restaurant'})}
                  >
                    <option value="manager">Manager Pays</option>
                    <option value="restaurant">Restaurant Pays</option>
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
            </ModalBody>
            <ModalActions>
              <ThemedButton variant="cancel" onClick={() => setShowEditModal(false)}>Cancel</ThemedButton>
              <ThemedButton variant="primary" onClick={handleUpdateRestaurant}>Update Restaurant</ThemedButton>
            </ModalActions>
          </Modal>
        </ModalOverlay>
      )}
    </MainLayout>
  );
};

export default ManagerRestaurantsPage;