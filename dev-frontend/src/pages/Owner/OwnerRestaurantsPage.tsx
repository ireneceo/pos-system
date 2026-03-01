import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { EmptyState } from '../../components/UI/TableComponents';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import { useAuth } from '../../contexts/AuthContext';
import { StatsGrid, StatCard, StatValue, StatLabel, StatTrend } from '../../components/UI';
import { COUNTRIES } from '../../constants/countries';
import PhoneInput from '../../components/Common/PhoneInput';

interface Restaurant {
  id: string;
  name: string;
  location: string;
  address: string;
  phone: string;
  email: string;
  cuisine: string;
  status: 'active' | 'trial' | 'expired' | 'suspended' | 'cancelled' | 'inactive';
  plan: 'basic' | 'professional' | 'enterprise';
  todaySales: number;
  todayOrders: number;
  staffCount: number;
  rating: number;
  createdAt: string;
  lastOrder: string;
  monthlyFee: number;
  nextPayment: string;
  adminName: string;
  adminEmail: string;
  payment_model: string;
  currency?: string;
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

// Filter components
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

// Modal Components
const ModalOverlay = styled.div<{ show: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => props.show ? 'flex' : 'none'};
  align-items: flex-start;
  justify-content: center;
  z-index: 10000;
  overflow-y: auto;
  padding: 40px 0;
`;

const Modal = styled.div`
  background: white;
  border-radius: 12px;
  padding: 0;
  width: 90%;
  max-width: 900px;
  flex-shrink: 0;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

  @media (max-width: 768px) {
    width: 95%;
    max-width: none;
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

// Admin search dropdown
const DropdownContainer = styled.div`
  position: relative;

  @media (max-width: 600px) {
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


const OwnerRestaurantsPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const [newRestaurant, setNewRestaurant] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'MY',
    businessRegistration: '',
    taxId: '',
    cuisine: ''
  });
  const [editingRestaurant, setEditingRestaurant] = useState<Restaurant | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // Restaurant Admin states
  const [adminAction, setAdminAction] = useState<'create' | 'assign'>('create');
  const [newAdminData, setNewAdminData] = useState({ fullName: '', email: '', username: '', password: '', phone: '' });
  const [selectedAdmin, setSelectedAdmin] = useState<any>(null);
  const [adminCandidates, setAdminCandidates] = useState<any[]>([]);
  const [adminSearchQuery, setAdminSearchQuery] = useState('');
  const [showAdminDropdown, setShowAdminDropdown] = useState(false);

  // Delete confirmation modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [restaurantToDelete, setRestaurantToDelete] = useState<Restaurant | null>(null);

  // Inline error messages
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (user) {
      fetchRestaurants();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchRestaurants = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/owner/restaurants', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          const transformedRestaurants: Restaurant[] = result.data.map((restaurant: any) => ({
            id: restaurant.id.toString(),
            name: restaurant.name,
            location: restaurant.address || 'No address provided',
            address: restaurant.address || '',
            phone: restaurant.phone || '',
            email: restaurant.email || '',
            cuisine: restaurant.cuisine || restaurant.cuisine_type || 'Various',
            status: restaurant.status || 'inactive',
            plan: (restaurant.plan_type || 'Basic Plan').toLowerCase().replace(' plan', '') as 'basic' | 'professional' | 'enterprise',
            todaySales: 0,
            todayOrders: 0,
            staffCount: 0,
            rating: 4.5,
            createdAt: restaurant.createdAt ? new Date(restaurant.createdAt).toISOString().split('T')[0] : '',
            lastOrder: 'No orders yet',
            monthlyFee: parseFloat(restaurant.plan_amount) || 29,
            nextPayment: restaurant.subscription_end
              ? new Date(restaurant.subscription_end).toISOString().split('T')[0]
              : new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
            adminName: restaurant.admin?.full_name || restaurant.admin_name || '',
            adminEmail: restaurant.admin?.email || '',
            payment_model: restaurant.payment_model || 'restaurant'
          }));
          setRestaurants(transformedRestaurants);
        }
      }
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  // Filter restaurants
  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          restaurant.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || restaurant.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalRestaurants = restaurants.length;
  const activeRestaurants = restaurants.filter(r => r.status === 'active').length;
  const totalSales = restaurants.reduce((sum, r) => sum + r.todaySales, 0);
  const totalOrders = restaurants.reduce((sum, r) => sum + r.todayOrders, 0);
  const totalStaff = restaurants.reduce((sum, r) => sum + r.staffCount, 0);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(<Star key={i} filled={i <= rating}>&#9733;</Star>);
    }
    return stars;
  };

  const handleAddRestaurant = () => {
    setNewRestaurant({
      name: '', email: '', phone: '', address: '', city: '', state: '',
      postalCode: '', country: 'MY', businessRegistration: '', taxId: '', cuisine: ''
    });
    setAdminAction('create');
    setNewAdminData({ fullName: '', email: '', username: '', password: '', phone: '' });
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

  const handleAdminSelect = (u: any) => {
    setSelectedAdmin(u);
    setAdminSearchQuery(u.full_name || u.username);
    setShowAdminDropdown(false);
  };

  const handleSubmitNewRestaurant = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    try {
      // Validate admin fields
      if (adminAction === 'create') {
        if (!newAdminData.fullName || !newAdminData.email || !newAdminData.username || !newAdminData.password) {
          setFormError('Please fill in all required Restaurant Admin fields.');
          return;
        }
        if (newAdminData.password.length < 8) {
          setFormError('Admin password must be at least 8 characters.');
          return;
        }
        if (!/[a-z]/.test(newAdminData.password) || !/[A-Z]/.test(newAdminData.password) || !/[0-9]/.test(newAdminData.password)) {
          setFormError('Admin password must contain uppercase, lowercase letters and a number.');
          return;
        }
      } else if (adminAction === 'assign' && !selectedAdmin) {
        setFormError('Please select an existing user as Restaurant Admin.');
        return;
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
        // Owner as oversight manager
        managerIds: [parseInt((user?.id || '0').toString())],
        adminAction,
        status: 'active'
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
        const newRestId = result.id || result.data?.id;

        // Auto-link ownership for the new restaurant
        if (newRestId) {
          await fetch(`/api/owner/restaurants/${newRestId}/claim`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
        }

        setShowAddModal(false);
        await fetchRestaurants();
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
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
      owner: user?.name,
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
    link.download = `owner-restaurants-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleRestaurantClick = (restaurantId: string, restaurantName: string) => {
    navigate(`/pos/owner/reports?tab=sales&restaurantId=${restaurantId}&restaurantName=${encodeURIComponent(restaurantName)}`);
  };

  const handleEditRestaurant = (e: React.MouseEvent, restaurant: Restaurant) => {
    e.stopPropagation();
    setFormError('');
    setEditingRestaurant(restaurant);

    setNewRestaurant({
      name: restaurant.name,
      email: restaurant.email,
      phone: restaurant.phone,
      address: restaurant.address,
      city: '',
      state: '',
      postalCode: '',
      country: 'MY',
      businessRegistration: '',
      taxId: '',
      cuisine: restaurant.cuisine
    });
    setShowEditModal(true);
  };

  const handleUpdateRestaurant = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (!editingRestaurant) return;

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
        cuisine: newRestaurant.cuisine
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
        setShowEditModal(false);
        setEditingRestaurant(null);
        await fetchRestaurants();
      } else {
        setFormError('Failed to update restaurant. Please try again.');
      }
    } catch (error) {
      console.error('Error updating restaurant:', error);
      setFormError('Error updating restaurant. Please try again.');
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
      // First unclaim the restaurant
      const token = localStorage.getItem('auth_token');
      await fetch(`/api/owner/restaurants/${restaurantToDelete.id}/unclaim`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      setRestaurants(restaurants.filter(r => r.id !== restaurantToDelete.id));
      setShowDeleteModal(false);
      setRestaurantToDelete(null);
    } catch (error) {
      console.error('Error removing restaurant:', error);
    }
  };

  const handleViewReports = (e: React.MouseEvent, restaurant: Restaurant) => {
    e.stopPropagation();
    navigate(`/pos/owner/reports?tab=sales&restaurantId=${restaurant.id}&restaurantName=${encodeURIComponent(restaurant.name)}`);
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
              <StatTrend trend="up">Owned restaurants</StatTrend>
            </StatCard>
            <StatCard color="#2563EB">
              <StatValue>{activeRestaurants}</StatValue>
              <StatLabel>Active Restaurants</StatLabel>
              <StatTrend trend="up">{totalRestaurants > 0 ? Math.round((activeRestaurants/totalRestaurants)*100) : 0}% operational</StatTrend>
            </StatCard>
            <StatCard color="#7C3AED">
              <StatValue>RM {totalSales.toFixed(2)}</StatValue>
              <StatLabel>Today's Total Sales</StatLabel>
              <StatTrend trend="neutral">Across all restaurants</StatTrend>
            </StatCard>
            <StatCard color="#DC2626">
              <StatValue>{totalOrders}</StatValue>
              <StatLabel>Today's Orders</StatLabel>
              <StatTrend trend="neutral">Across all restaurants</StatTrend>
            </StatCard>
            <StatCard color="#D97706">
              <StatValue>{totalStaff}</StatValue>
              <StatLabel>Total Staff</StatLabel>
              <StatTrend trend="neutral">All restaurants</StatTrend>
            </StatCard>
          </StatsGrid>

          <PageFilterWrapper>
            <PageSearchInput
              placeholder="Search restaurants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <PageFilterSelect value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="trial">Trial</option>
              <option value="inactive">Inactive</option>
              <option value="expired">Expired</option>
              <option value="suspended">Suspended</option>
              <option value="cancelled">Cancelled</option>
            </PageFilterSelect>
          </PageFilterWrapper>

          {filteredRestaurants.length === 0 ? (
            <EmptyState>
              {restaurants.length === 0
                ? 'No restaurants linked to your account yet. Click "Add Restaurant" to create a new one.'
                : 'No restaurants match the current filter.'}
            </EmptyState>
          ) : (
            <RestaurantGrid>
              {filteredRestaurants.map(restaurant => (
                <RestaurantCard key={restaurant.id} onClick={() => handleRestaurantClick(restaurant.id, restaurant.name)}>
                  <RestaurantHeader>
                    <RestaurantInfo>
                      <RestaurantName>{restaurant.name} {restaurant.currency && <span style={{ fontSize: '11px', fontWeight: 500, color: '#635BFF', background: '#F0EDFF', padding: '1px 6px', borderRadius: '4px', marginLeft: '6px', verticalAlign: 'middle' }}>{restaurant.currency}</span>}</RestaurantName>
                      {restaurant.adminName && (
                        <RestaurantMeta style={{ fontWeight: '600', color: '#635BFF' }}>
                          Admin: {restaurant.adminName}
                        </RestaurantMeta>
                      )}
                      <RestaurantMeta>{restaurant.location} {restaurant.cuisine !== 'Various' ? `\u00B7 ${restaurant.cuisine}` : ''}</RestaurantMeta>
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
                      {restaurant.rating} &middot; Last order: {restaurant.lastOrder}
                    </span>
                  </RatingContainer>

                  <MetricsGrid>
                    <Metric>
                      <MetricValue>RM {restaurant.todaySales.toFixed(2)}</MetricValue>
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
                    <ActionButton onClick={(e) => handleDeleteRestaurant(e, restaurant)} style={{ color: '#DC2626', borderColor: '#FEE2E2' }}>Remove</ActionButton>
                  </ActionButtons>
                </RestaurantCard>
              ))}
            </RestaurantGrid>
          )}
        </Content>
      </Container>

      {/* Add Restaurant Modal */}
      {showAddModal && (
        <ModalOverlay show={showAddModal} onClick={() => setShowAddModal(false)}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Add New Restaurant</ModalTitle>
              <CloseButton onClick={() => setShowAddModal(false)}>&times;</CloseButton>
            </ModalHeader>
            <ModalBody>
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
                      <input type="radio" name="adminActionOwner" checked={adminAction === 'create'}
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
                      <input type="radio" name="adminActionOwner" checked={adminAction === 'assign'}
                        onChange={() => { setAdminAction('assign'); setNewAdminData({ fullName: '', email: '', username: '', password: '', phone: '' }); }}
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
                    <FormGroup>
                      <FormLabel>Admin Password *</FormLabel>
                      <FormInput type="password" placeholder="Min 8 chars, uppercase + lowercase + number"
                        value={newAdminData.password}
                        onChange={(e) => setNewAdminData({...newAdminData, password: e.target.value})} />
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
                              <ItemDetails>{u.email} &middot; {u.role}</ItemDetails>
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
                            {selectedAdmin.email} &middot; {selectedAdmin.role}
                          </div>
                        </div>
                        <button onClick={() => { setSelectedAdmin(null); setAdminSearchQuery(''); }}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#DC2626', fontSize: '18px', fontWeight: '600' }}>
                          &times;
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
                  <FormInput type="text" placeholder="e.g., Kuala Lumpur"
                    value={newRestaurant.city}
                    onChange={(e) => setNewRestaurant({...newRestaurant, city: e.target.value})} />
                </FormGroup>

                <FormGroup>
                  <FormLabel>State / Province</FormLabel>
                  <FormInput type="text" placeholder="e.g., Wilayah Persekutuan"
                    value={newRestaurant.state}
                    onChange={(e) => setNewRestaurant({...newRestaurant, state: e.target.value})} />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Postal Code</FormLabel>
                  <FormInput type="text" placeholder="e.g., 50000"
                    value={newRestaurant.postalCode}
                    onChange={(e) => setNewRestaurant({...newRestaurant, postalCode: e.target.value})} />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Cuisine Type</FormLabel>
                  <FormInput type="text" placeholder="e.g., Malaysian, Chinese, Italian"
                    value={newRestaurant.cuisine}
                    onChange={(e) => setNewRestaurant({...newRestaurant, cuisine: e.target.value})} />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Business Registration No.</FormLabel>
                  <FormInput type="text" placeholder="e.g., 202401012345"
                    value={newRestaurant.businessRegistration}
                    onChange={(e) => setNewRestaurant({...newRestaurant, businessRegistration: e.target.value})} />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Tax ID / GST No.</FormLabel>
                  <FormInput type="text" placeholder="e.g., MY1234567890"
                    value={newRestaurant.taxId}
                    onChange={(e) => setNewRestaurant({...newRestaurant, taxId: e.target.value})} />
                </FormGroup>
              </FormGrid>
            </ModalBody>
            <ModalActions>
              {formError && (
                <div style={{width: '100%', padding: '10px 16px', marginBottom: '8px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', color: '#DC2626', fontSize: '13px', lineHeight: '1.5'}}>
                  {formError}
                </div>
              )}
              <ThemedButton variant="cancel" onClick={() => { setShowAddModal(false); setFormError(''); }}>Cancel</ThemedButton>
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
              <CloseButton onClick={() => setShowEditModal(false)}>&times;</CloseButton>
            </ModalHeader>
            <ModalBody>
              <FormGrid>
                <FormGroup style={{gridColumn: '1 / -1'}}>
                  <FormLabel>Restaurant Name *</FormLabel>
                  <FormInput type="text" placeholder="Enter restaurant name"
                    value={newRestaurant.name}
                    onChange={(e) => setNewRestaurant({...newRestaurant, name: e.target.value})} />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Email Address *</FormLabel>
                  <FormInput type="email" placeholder="restaurant@example.com"
                    value={newRestaurant.email}
                    onChange={(e) => setNewRestaurant({...newRestaurant, email: e.target.value})} />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Country *</FormLabel>
                  <FormSelect value={newRestaurant.country}
                    onChange={(e) => setNewRestaurant({...newRestaurant, country: e.target.value})}>
                    {COUNTRIES.map(country => (
                      <option key={country.code} value={country.code}>{country.name}</option>
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
                  <FormTextarea placeholder="Enter street address"
                    value={newRestaurant.address}
                    onChange={(e) => setNewRestaurant({...newRestaurant, address: e.target.value})} />
                </FormGroup>

                <FormGroup>
                  <FormLabel>City</FormLabel>
                  <FormInput type="text" placeholder="e.g., Kuala Lumpur"
                    value={newRestaurant.city}
                    onChange={(e) => setNewRestaurant({...newRestaurant, city: e.target.value})} />
                </FormGroup>

                <FormGroup>
                  <FormLabel>State / Province</FormLabel>
                  <FormInput type="text" placeholder="e.g., Wilayah Persekutuan"
                    value={newRestaurant.state}
                    onChange={(e) => setNewRestaurant({...newRestaurant, state: e.target.value})} />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Postal Code</FormLabel>
                  <FormInput type="text" placeholder="e.g., 50000"
                    value={newRestaurant.postalCode}
                    onChange={(e) => setNewRestaurant({...newRestaurant, postalCode: e.target.value})} />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Cuisine Type</FormLabel>
                  <FormInput type="text" placeholder="e.g., Malaysian, Chinese, Italian"
                    value={newRestaurant.cuisine}
                    onChange={(e) => setNewRestaurant({...newRestaurant, cuisine: e.target.value})} />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Business Registration No.</FormLabel>
                  <FormInput type="text" placeholder="e.g., 202401012345"
                    value={newRestaurant.businessRegistration}
                    onChange={(e) => setNewRestaurant({...newRestaurant, businessRegistration: e.target.value})} />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Tax ID / GST No.</FormLabel>
                  <FormInput type="text" placeholder="e.g., MY1234567890"
                    value={newRestaurant.taxId}
                    onChange={(e) => setNewRestaurant({...newRestaurant, taxId: e.target.value})} />
                </FormGroup>
              </FormGrid>
            </ModalBody>
            <ModalActions>
              {formError && (
                <div style={{width: '100%', padding: '10px 16px', marginBottom: '8px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', color: '#DC2626', fontSize: '13px', lineHeight: '1.5'}}>
                  {formError}
                </div>
              )}
              <ThemedButton variant="cancel" onClick={() => { setShowEditModal(false); setFormError(''); }}>Cancel</ThemedButton>
              <ThemedButton variant="primary" onClick={handleUpdateRestaurant}>Update Restaurant</ThemedButton>
            </ModalActions>
          </Modal>
        </ModalOverlay>
      )}

      {/* Remove Confirmation Modal */}
      {showDeleteModal && restaurantToDelete && (
        <ModalOverlay show={showDeleteModal} onClick={() => setShowDeleteModal(false)}>
          <Modal onClick={(e) => e.stopPropagation()} style={{ maxWidth: '450px' }}>
            <ModalHeader>
              <ModalTitle>Remove Restaurant</ModalTitle>
              <CloseButton onClick={() => setShowDeleteModal(false)}>&times;</CloseButton>
            </ModalHeader>
            <ModalBody>
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{
                  width: '64px', height: '64px', borderRadius: '50%', background: '#FEE2E2',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px'
                }}>
                  <span style={{ fontSize: '32px', color: '#DC2626' }}>!</span>
                </div>
                <h3 style={{ margin: '0 0 12px', fontSize: '18px', fontWeight: '600', color: '#0A2540' }}>
                  Are you sure you want to remove this restaurant?
                </h3>
                <p style={{ margin: 0, fontSize: '14px', color: '#6B7280', lineHeight: '1.5' }}>
                  <strong style={{ color: '#DC2626' }}>{restaurantToDelete.name}</strong> will be unlinked from your account.
                  <br />The restaurant itself will not be deleted.
                </p>
              </div>
            </ModalBody>
            <ModalActions>
              <ThemedButton variant="cancel" onClick={() => setShowDeleteModal(false)}>Cancel</ThemedButton>
              <ThemedButton
                variant="primary"
                onClick={confirmDeleteRestaurant}
                style={{ background: '#DC2626' }}
              >
                Remove Restaurant
              </ThemedButton>
            </ModalActions>
          </Modal>
        </ModalOverlay>
      )}
    </>
  );
};

export default OwnerRestaurantsPage;
