import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import { useAuth } from '../../contexts/AuthContext';
import { StatsGrid, StatCard, StatValue, StatLabel, StatTrend , Modal as CommonModal } from '../../components/UI';
// Using page-specific filter components instead of common ones
// 매니저는 브랜드 테마 적용 안함
import { BaseRestaurant } from '../../interfaces/Restaurant';
import { useBrandCurrency } from '../../hooks/useBrandCurrency';
import { formatCurrency, getPlanPrice, formatPlanPrice, normalizeCurrencyCode } from '../../utils/currency';
import { COUNTRIES } from '../../constants/countries';
import PhoneInput from '../../components/Common/PhoneInput';

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
  display: flex;
  flex-direction: column;

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
  margin-top: auto;
  padding-top: 16px;
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
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const { defaultCurrency } = useBrandCurrency();
  const [selectedCurrency, setSelectedCurrency] = useState<string>('RM');

  useEffect(() => {
    if (defaultCurrency) {
      setSelectedCurrency(defaultCurrency);
    }
  }, [defaultCurrency]);

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
    city: '',
    state: '',
    postalCode: '',
    country: 'MY',
    businessRegistration: '',
    taxId: '',
    cuisine: '',
    planType: 'Basic Plan',
    planAmount: '29.00',
    currency: 'MYR',
    status: 'active' as 'active' | 'trial' | 'expired' | 'suspended' | 'cancelled',
    billingCycle: 'monthly' as 'monthly' | 'annual',
    paymentModel: 'manager' as 'manager' | 'restaurant',
    subscriptionStart: '',
    subscriptionEnd: '',
    autoRenew: true,
    enableTrial: false
  });
  const [editingRestaurant, setEditingRestaurant] = useState<Restaurant | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [brands, setBrands] = useState<Array<{ id: number; name: string; code: string; currency: string }>>([]);
  // Restaurant Admin states
  const [adminAction, setAdminAction] = useState<'create' | 'assign'>('create');
  const [newAdminData, setNewAdminData] = useState({ fullName: '', email: '', username: '', phone: '' });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [successPassword, setSuccessPassword] = useState('');
  const [passwordCopied, setPasswordCopied] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<any>(null);
  const [adminCandidates, setAdminCandidates] = useState<any[]>([]);
  const [adminSearchQuery, setAdminSearchQuery] = useState('');
  const [showAdminDropdown, setShowAdminDropdown] = useState(false);
  // Delete confirmation modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [restaurantToDelete, setRestaurantToDelete] = useState<Restaurant | null>(null);
  // Inline error messages (no browser alert!)
  const [formError, setFormError] = useState('');
  const [availablePlans, setAvailablePlans] = useState<any[]>([]);

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

  // Fetch brands and plans
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

    const fetchPlans = async () => {
      try {
        const response = await fetch('/api/plans');
        if (response.ok) {
          const plans = await response.json();
          const restaurantPlans = plans.filter((p: any) => p.plan_target === 'restaurant' && p.is_active);
          setAvailablePlans(restaurantPlans);
          if (restaurantPlans.length > 0) {
            setNewRestaurant(prev => ({
              ...prev,
              planType: restaurantPlans[0].display_name,
              planAmount: String(getPlanPrice(restaurantPlans[0], normalizeCurrencyCode(selectedCurrency)))
            }));
          }
        }
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    };
    fetchPlans();

    // URL 파라미터에서 브랜드 ID를 읽어서 필터 설정
    const brandId = searchParams.get('brandId');
    const brandName = searchParams.get('brandName');

    if (brandId && brandName) {
      setFilterBrand(brandId);
      setFilterBrandSearchQuery(decodeURIComponent(brandName));
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        if (!user) return;

        const token = localStorage.getItem('auth_token');
        const response = await fetch(`/api/restaurants`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          const transformedRestaurants: Restaurant[] = data.map((restaurant: any) => ({
            id: restaurant.id.toString(),
            name: restaurant.name,
            branchName: restaurant.name, // Use name as branchName for now
            location: restaurant.address || restaurant.location || 'No address provided',
            address: restaurant.address || restaurant.location || 'No address provided',
            phone: restaurant.phone || 'No phone provided',
            email: restaurant.email || 'No email provided',
            brandId: restaurant.managerId || restaurant.admin_id?.toString() || '1',
            brandName: restaurant.managerName || restaurant.admin_name || 'Manager Brand',
            cuisine: restaurant.cuisine || 'Various',
            status: restaurant.status,
            plan: (restaurant.planType || restaurant.plan_type)?.toLowerCase().replace(' plan', '') as 'basic' | 'professional' | 'enterprise' || 'basic',
            todaySales: parseFloat(restaurant.todaySales) || 0,
            todayOrders: parseInt(restaurant.todayOrders) || 0,
            staffCount: parseInt(restaurant.staffCount) || 0,
            rating: 4.5,
            createdAt: new Date(restaurant.createdAt).toISOString().split('T')[0],
            lastOrder: 'No orders yet', // This would need to be calculated from orders API
            monthlyFee: parseFloat(restaurant.planAmount || restaurant.plan_amount) || 29,
            nextPayment: (restaurant.subscriptionEnd || restaurant.subscription_end) ?
              new Date(restaurant.subscriptionEnd || restaurant.subscription_end).toISOString().split('T')[0] :
              new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
            brand_id: restaurant.brand_id || null,
            payment_model: restaurant.payment_model || 'restaurant'
          }));

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
      city: '',
      state: '',
      postalCode: '',
      country: 'MY',
      businessRegistration: '',
      taxId: '',
      cuisine: '',
      planType: 'Basic Plan',
      planAmount: '29.00',
      currency: 'MYR',
      status: 'active',
      billingCycle: 'monthly',
      paymentModel: 'manager',
      subscriptionStart: currentDate,
      subscriptionEnd: endDate.toISOString().split('T')[0],
      autoRenew: true,
      enableTrial: false
    });
    setAdminAction('create');
    setNewAdminData({ fullName: '', email: '', username: '', phone: '' });
    setSelectedAdmin(null);
    setAdminCandidates([]);
    setAdminSearchQuery('');
    setFormError('');
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

  const handleSubmitNewRestaurant = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    try {
      // Validate admin fields
      if (adminAction === 'create') {
        if (!newAdminData.fullName || !newAdminData.email || !newAdminData.username) {
          setFormError('Please fill in all required Restaurant Admin fields (Full Name, Email, Username).');
          return;
        }
      } else if (adminAction === 'assign' && !selectedAdmin) {
        setFormError('Please select an existing user as Restaurant Admin.');
        return;
      }

      const managerId = user?.managerId || user?.id || '2';

      // Auto-link brand_id/foodcourt_id based on current user's role
      let autoBrandId: number | null = null;
      let autoFoodcourtId: number | null = null;
      if (user?.role === 'Brand General' || user?.role === 'Brand Manager') {
        autoBrandId = (user as any)?.brand_id || null;
      }
      if (user?.role === 'Foodcourt General' || user?.role === 'Foodcourt Manager') {
        autoFoodcourtId = (user as any)?.foodcourt_id || null;
      }

      const restaurantData: any = {
        name: newRestaurant.name,
        address: newRestaurant.address,
        city: newRestaurant.city,
        state: newRestaurant.state,
        postal_code: newRestaurant.postalCode,
        country: newRestaurant.country,
        phone: newRestaurant.phone,
        email: newRestaurant.email,
        cuisine: newRestaurant.cuisine,
        business_registration: newRestaurant.businessRegistration || undefined,
        tax_id: newRestaurant.taxId || undefined,
        // Current manager as oversight manager (auto, no UI selection)
        managerIds: [parseInt(managerId.toString())],
        adminAction,
        plan_type: newRestaurant.planType,
        plan_amount: parseFloat(newRestaurant.planAmount),
        currency: newRestaurant.currency,
        status: 'active',
        billing_cycle: newRestaurant.billingCycle,
        payment_model: newRestaurant.paymentModel === 'manager'
          ? (user?.role === 'Foodcourt General' || user?.role === 'Foodcourt Manager' ? 'foodcourt_manager' : 'brand_manager')
          : 'restaurant',
        subscription_start: new Date(newRestaurant.subscriptionStart),
        subscription_end: new Date(newRestaurant.subscriptionEnd),
        auto_renew: newRestaurant.autoRenew,
        created_by: managerId,
        brand_id: autoBrandId,
        foodcourt_id: autoFoodcourtId
      };

      // Add admin-specific fields
      if (adminAction === 'create') {
        restaurantData.adminEmail = newAdminData.email;
        restaurantData.adminUsername = newAdminData.username;
        restaurantData.adminFullName = newAdminData.fullName;
        restaurantData.adminPhone = newAdminData.phone || undefined;
      } else if (adminAction === 'assign') {
        restaurantData.adminUserId = parseInt(selectedAdmin.id.toString());
      }

      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/restaurants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(restaurantData)
      });
      
      if (response.ok) {
        const result = await response.json();

        // Show generated password if admin was created
        if (result.generatedPassword) {
          setSuccessMessage('Restaurant Admin created successfully.');
          setSuccessPassword(result.generatedPassword);
          setPasswordCopied(false);
          setShowSuccessModal(true);
        }
        
        // Refresh the restaurants list using same API as initial load
        const token2 = localStorage.getItem('auth_token');
        const fetchResponse = await fetch(`/api/restaurants`, {
          headers: { 'Authorization': `Bearer ${token2}` }
        });
        if (fetchResponse.ok) {
          const data = await fetchResponse.json();
          const transformedRestaurants: Restaurant[] = data.map((restaurant: any) => ({
            id: restaurant.id.toString(),
            name: restaurant.name,
            branchName: restaurant.name,
            location: restaurant.address || restaurant.location || 'No address provided',
            address: restaurant.address || restaurant.location || 'No address provided',
            phone: restaurant.phone || 'No phone provided',
            email: restaurant.email || 'No email provided',
            brandId: restaurant.admin_id?.toString() || '',
            brandName: restaurant.admin_name || '',
            cuisine: restaurant.cuisine || 'Various',
            status: restaurant.status,
            plan: (restaurant.planType || restaurant.plan_type)?.toLowerCase().replace(' plan', '') as 'basic' | 'professional' | 'enterprise' || 'basic',
            todaySales: parseFloat(restaurant.todaySales) || 0,
            todayOrders: parseInt(restaurant.todayOrders) || 0,
            staffCount: parseInt(restaurant.staffCount) || 0,
            rating: 4.5,
            createdAt: new Date(restaurant.createdAt).toISOString().split('T')[0],
            lastOrder: 'No orders yet',
            monthlyFee: parseFloat(restaurant.planAmount || restaurant.plan_amount) || 29,
            nextPayment: (restaurant.subscriptionEnd || restaurant.subscription_end) ?
              new Date(restaurant.subscriptionEnd || restaurant.subscription_end).toISOString().split('T')[0] :
              new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
            brand_id: restaurant.brand_id || null,
            payment_model: restaurant.payment_model || 'restaurant'
          }));
          setRestaurants(transformedRestaurants);
        }

        setShowAddModal(false);

        // Reset form
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
          planType: 'Basic Plan',
          planAmount: '29.00',
          currency: 'MYR',
          status: 'active',
          billingCycle: 'monthly',
          paymentModel: 'manager',
          subscriptionStart: '',
          subscriptionEnd: '',
          autoRenew: true,
          enableTrial: false
        });
        setAdminAction('create');
        setNewAdminData({ fullName: '', email: '', username: '', phone: '' });
        setSelectedAdmin(null);
        setAdminCandidates([]);
        setAdminSearchQuery('');
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('Failed to create restaurant:', errorData);
        let errorMsg = 'Please try again.';
        if (typeof errorData.error === 'string') errorMsg = errorData.error;
        else if (errorData.error?.message) {
          errorMsg = errorData.error.message;
          if (errorData.error.details?.length) errorMsg += ': ' + errorData.error.details.map((d: any) => d.message).join(', ');
        } else if (errorData.message) errorMsg = errorData.message;
        setFormError(`Failed to create restaurant: ${errorMsg}`);
      }
    } catch (error) {
      console.error('Error creating restaurant:', error);
      setFormError('Error creating restaurant. Please try again.');
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

  const handleRestaurantClick = (restaurantId: string, restaurantName: string) => {
    // Navigate based on user role - go to sales report with restaurant filter
    if (user?.role === 'Brand General') {
      navigate(`/pos/brand/general/reports?tab=sales&restaurantId=${restaurantId}&restaurantName=${encodeURIComponent(restaurantName)}`);
    } else {
      // Manager roles go to manager reports
      navigate(`/pos/manager/reports?tab=sales&restaurantId=${restaurantId}&restaurantName=${encodeURIComponent(restaurantName)}`);
    }
  };

  const handleEditRestaurant = (e: React.MouseEvent, restaurant: Restaurant) => {
    e.stopPropagation();
    setFormError('');
    setEditingRestaurant(restaurant);

    const paymentModelValue = (restaurant as any).payment_model;
    const mappedPaymentModel = paymentModelValue === 'brand_manager' ? 'manager' :
                               paymentModelValue === 'restaurant' ? 'restaurant' : 'manager';

    setNewRestaurant({
      name: restaurant.name,
      managerId: '',
      email: restaurant.email,
      phone: restaurant.phone,
      address: restaurant.address,
      city: (restaurant as any).city || '',
      state: (restaurant as any).state || '',
      postalCode: (restaurant as any).postalCode || '',
      country: (restaurant as any).country || 'MY',
      businessRegistration: (restaurant as any).businessRegistration || '',
      taxId: (restaurant as any).taxId || '',
      cuisine: restaurant.cuisine,
      planType: restaurant.plan === 'basic' ? 'Basic Plan' : restaurant.plan === 'professional' ? 'Professional Plan' : 'Enterprise Plan',
      planAmount: restaurant.monthlyFee?.toString() || '29.00',
      currency: (restaurant as any).currency || 'MYR',
      status: restaurant.status || 'active',
      billingCycle: (restaurant as any).billing_cycle || (restaurant as any).billingCycle || 'monthly',
      paymentModel: mappedPaymentModel,
      subscriptionStart: '',
      subscriptionEnd: '',
      autoRenew: true,
      enableTrial: false
    });
    setShowEditModal(true);
  };

  const handleUpdateRestaurant = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (editingRestaurant) {
      try {
        const token = localStorage.getItem('auth_token');
        const updateData: any = {
          name: newRestaurant.name,
          email: newRestaurant.email,
          phone: newRestaurant.phone,
          address: newRestaurant.address,
          city: newRestaurant.city,
          state: newRestaurant.state,
          postal_code: newRestaurant.postalCode,
          country: newRestaurant.country,
          business_registration: newRestaurant.businessRegistration || undefined,
          tax_id: newRestaurant.taxId || undefined,
          cuisine: newRestaurant.cuisine,
          plan_type: newRestaurant.planType,
          plan_amount: parseFloat(newRestaurant.planAmount),
          currency: newRestaurant.currency,
          billing_cycle: newRestaurant.billingCycle,
          payment_model: newRestaurant.paymentModel === 'manager'
            ? (user?.role === 'Foodcourt General' || user?.role === 'Foodcourt Manager' ? 'foodcourt_manager' : 'brand_manager')
            : 'restaurant'
        };

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
                  payment_model: newRestaurant.paymentModel === 'manager'
                    ? (user?.role === 'Foodcourt General' || user?.role === 'Foodcourt Manager' ? 'foodcourt_manager' : 'brand_manager')
                    : 'restaurant'
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
            city: '',
            state: '',
            postalCode: '',
            country: 'MY',
            businessRegistration: '',
            taxId: '',
            cuisine: '',
            planType: 'Basic Plan',
            planAmount: '29.00',
            status: 'active',
            billingCycle: 'monthly',
            paymentModel: 'manager',
            subscriptionStart: '',
            subscriptionEnd: '',
            autoRenew: true,
            currency: '',
            enableTrial: false
          });
        } else {
          const errorText = await response.text();
          console.error('Failed to update restaurant:', errorText);
          setFormError('Failed to update restaurant. Please try again.');
        }
      } catch (error) {
        console.error('Error updating restaurant:', error);
        setFormError('Error updating restaurant. Please try again.');
      }
    }
  };

  const handleDeleteRestaurant = (e: React.MouseEvent, restaurant: Restaurant) => {
    e.stopPropagation();
    setRestaurantToDelete(restaurant);
    setShowDeleteModal(true);
  };

  const confirmDeleteRestaurant = async () => {
    if (!restaurantToDelete) return;

    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/restaurants/${restaurantToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setRestaurants(restaurants.filter(r => r.id !== restaurantToDelete.id));
        setShowDeleteModal(false);
        setRestaurantToDelete(null);
      } else {
        console.error('Failed to delete restaurant');
      }
    } catch (error) {
      console.error('Error deleting restaurant:', error);
    }
  };

  const handleViewReports = (e: React.MouseEvent, restaurant: Restaurant) => {
    e.stopPropagation();
    // Navigate to reports with restaurant filter - same as card click
    if (user?.role === 'Brand General') {
      navigate(`/pos/brand/general/reports?tab=sales&restaurantId=${restaurant.id}&restaurantName=${encodeURIComponent(restaurant.name)}`);
    } else {
      navigate(`/pos/manager/reports?tab=sales&restaurantId=${restaurant.id}&restaurantName=${encodeURIComponent(restaurant.name)}`);
    }
  };

  return (
    <>
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
              <StatValue>{formatCurrency(totalSales, selectedCurrency)}</StatValue>
              <StatLabel>Today's Total Sales</StatLabel>
              <StatTrend trend="up">+24% vs yesterday</StatTrend>
            </StatCard>
            <StatCard color="#DC2626">
              <StatValue>{totalOrders}</StatValue>
              <StatLabel>Today's Orders</StatLabel>
              <StatTrend trend="up">+18% vs yesterday</StatTrend>
            </StatCard>
          </StatsGrid>

          <PageFilterWrapper>
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
            <PageSearchInput
              placeholder="Search restaurants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </PageFilterWrapper>

          <RestaurantGrid>
            {filteredRestaurants.map(restaurant => (
              <RestaurantCard key={restaurant.id} onClick={() => handleRestaurantClick(restaurant.id, restaurant.name)}>
                <RestaurantHeader>
                  <RestaurantInfo>
                    <RestaurantName>{restaurant.name} {restaurant.currency && <span style={{ fontSize: '11px', fontWeight: 500, color: '#635BFF', background: '#F0EDFF', padding: '1px 6px', borderRadius: '4px', marginLeft: '6px', verticalAlign: 'middle' }}>{restaurant.currency}</span>}</RestaurantName>
                    {restaurant.brand_id && (
                      <RestaurantMeta style={{ fontWeight: '600', color: '#635BFF' }}>
                        {brands.find(b => b.id === restaurant.brand_id)?.name || 'Brand'}
                      </RestaurantMeta>
                    )}
                    <RestaurantMeta>{restaurant.location} • {restaurant.cuisine}</RestaurantMeta>
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
                    <MetricValue>{formatCurrency(restaurant.todaySales, selectedCurrency)}</MetricValue>
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
                  <ActionButton onClick={(e) => handleDeleteRestaurant(e, restaurant)} style={{ color: '#DC2626', borderColor: '#FEE2E2' }}>Delete</ActionButton>
                </ActionButtons>
              </RestaurantCard>
            ))}
          </RestaurantGrid>
        </Content>
      </Container>

      {/* Add Restaurant Modal */}
      {showAddModal && (
                <CommonModal isOpen={true} onClose={() => setShowAddModal(false)} title="Add New Restaurant" footer={<>{formError && ( <div style={{width: '100%', padding: '10px 16px', marginBottom: '8px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', color: '#DC2626', fontSize: '13px', lineHeight: '1.5'}}> {formError} </div> )} <ThemedButton variant="cancel" onClick={() => { setShowAddModal(false); setFormError(''); }}>Cancel</ThemedButton><ThemedButton variant="primary" onClick={handleSubmitNewRestaurant}>Add Restaurant</ThemedButton></>}>

              <FormGrid>
                <FormGroup style={{gridColumn: '1 / -1'}}>
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
                      border: adminAction === 'create' ? '2px solid #635BFF' : '2px solid #E5E7EB'
                    }}>
                      <input type="radio" name="adminActionMgr" checked={adminAction === 'create'}
                        onChange={() => { setAdminAction('create'); setSelectedAdmin(null); }}
                        style={{ accentColor: '#635BFF' }} />
                      <span style={{fontSize: '14px', fontWeight: '500', color: '#374151'}}>Create New Account</span>
                    </label>
                    <label style={{
                      display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer',
                      padding: '8px 16px', borderRadius: '8px',
                      background: adminAction === 'assign' ? '#F0EFFF' : '#F9FAFB',
                      border: adminAction === 'assign' ? '2px solid #635BFF' : '2px solid #E5E7EB'
                    }}>
                      <input type="radio" name="adminActionMgr" checked={adminAction === 'assign'}
                        onChange={() => { setAdminAction('assign'); setNewAdminData({ fullName: '', email: '', username: '', phone: '' }); }}
                        style={{ accentColor: '#635BFF' }} />
                      <span style={{fontSize: '14px', fontWeight: '500', color: '#374151'}}>Select Existing User</span>
                    </label>
                  </div>
                </div>

                {adminAction === 'create' ? (
                  <>
                    <FormGroup>
                      <FormLabel>Admin Full Name *</FormLabel>
                      <FormInput type="text" placeholder="e.g., Kim Owner"
                        value={newAdminData.fullName}
                        onChange={(e) => setNewAdminData({...newAdminData, fullName: e.target.value})} />
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>Admin Email *</FormLabel>
                      <FormInput type="email" placeholder="admin@restaurant.com"
                        value={newAdminData.email}
                        onChange={(e) => setNewAdminData({...newAdminData, email: e.target.value})} />
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>Admin Username *</FormLabel>
                      <FormInput type="text" placeholder="e.g., kim_owner"
                        value={newAdminData.username}
                        onChange={(e) => setNewAdminData({...newAdminData, username: e.target.value})} />
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
                      <DropdownInput type="text" placeholder="Type to search by name, email, or username..."
                        value={adminSearchQuery}
                        onChange={(e) => handleAdminSearch(e.target.value)}
                        onFocus={() => handleAdminSearch(adminSearchQuery)}
                        onBlur={() => setTimeout(() => setShowAdminDropdown(false), 200)} />
                      <DropdownMenu show={showAdminDropdown}>
                        {adminCandidates.length === 0 ? (
                          <div style={{padding: '12px 16px', color: '#6B7280', fontSize: '13px'}}>
                            {adminSearchQuery.length > 0 ? 'No available users found' : 'Type to search users...'}
                          </div>
                        ) : (
                          adminCandidates.map(u => (
                            <DropdownItem key={u.id} onClick={() => handleAdminSelect(u)}>
                              <ItemName>{u.full_name || u.username}</ItemName>
                              <ItemDetails>{u.email} • {u.role}</ItemDetails>
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
                        <button onClick={() => { setSelectedAdmin(null); setAdminSearchQuery(''); }}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#DC2626', fontSize: '18px', fontWeight: '600' }}>
                          ×
                        </button>
                      </div>
                    )}
                  </FormGroup>
                )}

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
                  <FormLabel>Country *</FormLabel>
                  <FormSelect
                    value={newRestaurant.country}
                    onChange={(e) => setNewRestaurant({...newRestaurant, country: e.target.value})}
                  >
                    {COUNTRIES.map(country => (
                      <option key={country.code} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </FormSelect>
                </FormGroup>

                <FormGroup>
                  <FormLabel>Phone Number *</FormLabel>
                  <PhoneInput
                    value={newRestaurant.phone}
                    onChange={(value) => setNewRestaurant({...newRestaurant, phone: value})}
                    defaultCountry={newRestaurant.country}
                  />
                </FormGroup>

                <FormGroup style={{gridColumn: '1 / -1'}}>
                  <FormLabel>Address *</FormLabel>
                  <FormTextarea
                    placeholder="Enter street address"
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
                    placeholder="e.g., Wilayah Persekutuan"
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
                  <FormLabel>Cuisine Type</FormLabel>
                  <FormInput
                    type="text"
                    placeholder="e.g., Malaysian, Chinese, Italian"
                    value={newRestaurant.cuisine}
                    onChange={(e) => setNewRestaurant({...newRestaurant, cuisine: e.target.value})}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Business Registration No.</FormLabel>
                  <FormInput
                    type="text"
                    placeholder="e.g., 202401012345"
                    value={newRestaurant.businessRegistration}
                    onChange={(e) => setNewRestaurant({...newRestaurant, businessRegistration: e.target.value})}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Tax ID / GST No.</FormLabel>
                  <FormInput
                    type="text"
                    placeholder="e.g., MY1234567890"
                    value={newRestaurant.taxId}
                    onChange={(e) => setNewRestaurant({...newRestaurant, taxId: e.target.value})}
                  />
                </FormGroup>

                {/* Subscription Settings */}
                <div style={{gridColumn: '1 / -1', marginTop: '20px', marginBottom: '10px'}}>
                  <h3 style={{margin: 0, fontSize: '18px', fontWeight: '600', color: '#0A2540', borderBottom: '2px solid #635BFF', paddingBottom: '8px'}}>
                    Subscription Settings
                  </h3>
                </div>

                <FormGroup>
                  <FormLabel>Plan Type *</FormLabel>
                  <FormSelect
                    value={newRestaurant.planType}
                    onChange={(e) => {
                      const selectedPlan = availablePlans.find((p: any) => p.display_name === e.target.value);
                      setNewRestaurant({
                        ...newRestaurant,
                        planType: e.target.value,
                        planAmount: selectedPlan ? String(getPlanPrice(selectedPlan, normalizeCurrencyCode(selectedCurrency))) : '0'
                      });
                    }}
                  >
                    {availablePlans.map((plan: any) => (
                      <option key={plan.id} value={plan.display_name}>
                        {plan.display_name} ({formatPlanPrice(plan, normalizeCurrencyCode(selectedCurrency))}/month)
                      </option>
                    ))}
                  </FormSelect>
                </FormGroup>

                <FormGroup>
                  <FormLabel>Billing Cycle *</FormLabel>
                  <FormSelect
                    value={newRestaurant.billingCycle}
                    onChange={(e) => {
                      const cycle = e.target.value as 'monthly' | 'annual';
                      const selectedPlan = availablePlans.find((p: any) => p.display_name === newRestaurant.planType);
                      const cur = normalizeCurrencyCode(selectedCurrency);
                      const price = selectedPlan ? getPlanPrice(selectedPlan, cur, cycle) : 0;
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
                    {newRestaurant.planType} - {formatCurrency(parseFloat(newRestaurant.planAmount) || 0, newRestaurant.currency || 'MYR')} ({newRestaurant.billingCycle})
                  </div>
                  <div style={{fontSize: '12px', color: '#6B7280', marginTop: '4px'}}>
                    Paid by: {newRestaurant.paymentModel === 'manager' ? 'Manager' : 'Restaurant'}
                  </div>
                </div>
              </FormGrid>
            
        </CommonModal>
      )}

      {/* Edit Restaurant Modal */}
      {showEditModal && (
                <CommonModal isOpen={true} onClose={() => setShowEditModal(false)} title="Edit Restaurant" footer={<>{formError && ( <div style={{width: '100%', padding: '10px 16px', marginBottom: '8px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', color: '#DC2626', fontSize: '13px', lineHeight: '1.5'}}> {formError} </div> )} <ThemedButton variant="cancel" onClick={() => { setShowEditModal(false); setFormError(''); }}>Cancel</ThemedButton><ThemedButton variant="primary" onClick={handleUpdateRestaurant}>Update Restaurant</ThemedButton></>}>

              <FormGrid>
                <FormGroup style={{gridColumn: '1 / -1'}}>
                  <FormLabel>Restaurant Name *</FormLabel>
                  <FormInput
                    type="text"
                    placeholder="Enter restaurant name"
                    value={newRestaurant.name}
                    onChange={(e) => setNewRestaurant({...newRestaurant, name: e.target.value})}
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
                  <FormLabel>Country *</FormLabel>
                  <FormSelect
                    value={newRestaurant.country}
                    onChange={(e) => setNewRestaurant({...newRestaurant, country: e.target.value})}
                  >
                    {COUNTRIES.map(country => (
                      <option key={country.code} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </FormSelect>
                </FormGroup>

                <FormGroup>
                  <FormLabel>Phone Number *</FormLabel>
                  <PhoneInput
                    value={newRestaurant.phone}
                    onChange={(value) => setNewRestaurant({...newRestaurant, phone: value})}
                    defaultCountry={newRestaurant.country}
                  />
                </FormGroup>

                <FormGroup style={{gridColumn: '1 / -1'}}>
                  <FormLabel>Address *</FormLabel>
                  <FormTextarea
                    placeholder="Enter street address"
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
                    placeholder="e.g., Wilayah Persekutuan"
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
                  <FormLabel>Cuisine Type</FormLabel>
                  <FormInput
                    type="text"
                    placeholder="e.g., Malaysian, Chinese, Italian"
                    value={newRestaurant.cuisine}
                    onChange={(e) => setNewRestaurant({...newRestaurant, cuisine: e.target.value})}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Business Registration No.</FormLabel>
                  <FormInput
                    type="text"
                    placeholder="e.g., 202401012345"
                    value={newRestaurant.businessRegistration}
                    onChange={(e) => setNewRestaurant({...newRestaurant, businessRegistration: e.target.value})}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Tax ID / GST No.</FormLabel>
                  <FormInput
                    type="text"
                    placeholder="e.g., MY1234567890"
                    value={newRestaurant.taxId}
                    onChange={(e) => setNewRestaurant({...newRestaurant, taxId: e.target.value})}
                  />
                </FormGroup>

                {/* Subscription Settings */}
                <div style={{gridColumn: '1 / -1', marginTop: '20px', marginBottom: '10px'}}>
                  <h3 style={{margin: 0, fontSize: '18px', fontWeight: '600', color: '#0A2540', borderBottom: '2px solid #635BFF', paddingBottom: '8px'}}>
                    Subscription Settings
                  </h3>
                </div>

                <FormGroup>
                  <FormLabel>Plan Type *</FormLabel>
                  <FormSelect
                    value={newRestaurant.planType}
                    onChange={(e) => {
                      const selectedPlan = availablePlans.find((p: any) => p.display_name === e.target.value);
                      setNewRestaurant({
                        ...newRestaurant,
                        planType: e.target.value,
                        planAmount: selectedPlan ? String(getPlanPrice(selectedPlan, normalizeCurrencyCode(selectedCurrency))) : '0'
                      });
                    }}
                  >
                    {availablePlans.map((plan: any) => (
                      <option key={plan.id} value={plan.display_name}>
                        {plan.display_name} ({formatPlanPrice(plan, normalizeCurrencyCode(selectedCurrency))}/month)
                      </option>
                    ))}
                  </FormSelect>
                </FormGroup>

                <FormGroup>
                  <FormLabel>Billing Cycle *</FormLabel>
                  <FormSelect
                    value={newRestaurant.billingCycle}
                    onChange={(e) => {
                      const cycle = e.target.value as 'monthly' | 'annual';
                      const selectedPlan = availablePlans.find((p: any) => p.display_name === newRestaurant.planType);
                      const cur = normalizeCurrencyCode(selectedCurrency);
                      const price = selectedPlan ? getPlanPrice(selectedPlan, cur, cycle) : 0;
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
                    {newRestaurant.planType} - {formatCurrency(parseFloat(newRestaurant.planAmount) || 0, newRestaurant.currency || 'MYR')} ({newRestaurant.billingCycle})
                  </div>
                  <div style={{fontSize: '12px', color: '#6B7280', marginTop: '4px'}}>
                    Paid by: {newRestaurant.paymentModel === 'manager' ? 'Manager' : 'Restaurant'}
                  </div>
                </div>
              </FormGrid>
            
        </CommonModal>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && restaurantToDelete && (
                <CommonModal isOpen={true} onClose={() => setShowDeleteModal(false)} title="Delete Restaurant" footer={<><ThemedButton variant="cancel" onClick={() => setShowDeleteModal(false)}>Cancel</ThemedButton><ThemedButton variant="primary" onClick={confirmDeleteRestaurant} style={{ background: '#EF4444' }} > Delete Restaurant </ThemedButton></>}>

              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: '#FEE2E2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px'
                }}>
                  <span style={{ fontSize: '32px', color: '#DC2626' }}>!</span>
                </div>
                <h3 style={{ margin: '0 0 12px', fontSize: '18px', fontWeight: '600', color: '#0A2540' }}>
                  Are you sure you want to delete this restaurant?
                </h3>
                <div style={{ textAlign: 'left', margin: '0 auto', maxWidth: '320px' }}>
                  <p style={{ margin: '0 0 12px', fontSize: '14px', color: '#6B7280' }}>
                    <strong style={{ color: '#DC2626' }}>{restaurantToDelete.name}</strong> and all its data will be permanently deleted:
                  </p>
                  <div style={{ padding: '12px 16px', backgroundColor: '#FEF2F2', borderRadius: '8px', border: '1px solid #FECACA', fontSize: '13px', color: '#991B1B', lineHeight: '1.6' }}>
                    <div>• All orders, menu items, and categories</div>
                    <div>• All invoices and payment records</div>
                    <div>• Staff accounts linked to this restaurant</div>
                    <div>• Kitchen stations and floor plans</div>
                    <div style={{ marginTop: '8px', fontWeight: '600' }}>This action cannot be undone.</div>
                  </div>
                </div>
              </div>
            
        </CommonModal>
      )}

      {showSuccessModal && (
        <CommonModal isOpen={true} onClose={() => setShowSuccessModal(false)} title="Password Generated" size="small" footer={<>
          {successPassword && <ThemedButton variant="secondary" onClick={() => { navigator.clipboard.writeText(successPassword); setPasswordCopied(true); setTimeout(() => setPasswordCopied(false), 2000); }}>{passwordCopied ? 'Copied!' : 'Copy Password'}</ThemedButton>}
          <ThemedButton onClick={() => setShowSuccessModal(false)}>Done</ThemedButton>
        </>}>
          <div style={{ marginBottom: '20px', fontSize: '14px', color: '#6B7280' }}>
            {successMessage} Please share this password securely. They should change it after first login.
          </div>
          {successPassword && (
            <div style={{ background: '#F8FAFC', border: '1px solid #E6EBF1', borderRadius: '8px', padding: '16px', textAlign: 'center', marginBottom: '16px' }}>
              <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px', fontWeight: 600 }}>Temporary Password</div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: '#0A2540', fontFamily: 'monospace', letterSpacing: '1px', userSelect: 'all' as const }}>{successPassword}</div>
            </div>
          )}
          <div style={{ fontSize: '12px', color: '#DC2626' }}>This password will not be shown again. Please copy it now.</div>
        </CommonModal>
      )}
    </>
  );
};

export default ManagerRestaurantsPage;