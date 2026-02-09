import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import MainLayout from '../../components/Layout/MainLayout';
import {
  Container,
  Header,
  Title,
  ActionSection,
  Content,
  Button
} from '../../components/UI';
import { FilterBar, SearchInput } from '../../components/Common/FilterComponents';
import { useAuth } from '../../contexts/AuthContext';
import { formatCurrency } from '../../utils/currency';

// ============================================
// Types
// ============================================

interface EntityPlan {
  id: number;
  entity_type: 'brand' | 'foodcourt';
  entity_id: number;
  name: string;
  description: string | null;
  subscription_fee: string;
  revenue_percentage: string;
  rent_type: 'none' | 'fixed' | 'percentage' | 'combined';
  rent_fixed: string;
  rent_percentage: string;
  billing_cycle: 'monthly' | 'annual';
  auto_generate: boolean;
  tax_rate: string;
  currency: string;
  is_active: boolean;
  created_by: number | null;
  createdAt: string;
  updatedAt: string;
  planRestaurants?: PlanRestaurant[];
}

interface PlanRestaurant {
  id: number;
  entity_plan_id: number;
  restaurant_id: number;
  activation_date: string;
  is_active: boolean;
  restaurant?: {
    id: number;
    name: string;
    status: string;
    address?: string;
  };
}

interface FoodcourtRestaurant {
  id: number;
  name: string;
  status: string;
  address?: string;
  phone?: string;
}

interface PlanFormData {
  name: string;
  description: string;
  subscription_fee: string;
  revenue_percentage: string;
  rent_type: 'none' | 'fixed' | 'percentage' | 'combined';
  rent_fixed: string;
  rent_percentage: string;
  billing_cycle: 'monthly' | 'annual';
  auto_generate: boolean;
  tax_rate: string;
  currency: string;
}

const defaultFormData: PlanFormData = {
  name: '',
  description: '',
  subscription_fee: '0',
  revenue_percentage: '0',
  rent_type: 'none',
  rent_fixed: '0',
  rent_percentage: '0',
  billing_cycle: 'monthly',
  auto_generate: true,
  tax_rate: '6',
  currency: 'MYR'
};

// ============================================
// Styled Components
// ============================================

const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PlanCard = styled.div<{ isActive?: boolean }>`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
  transition: all 0.2s;
  opacity: ${props => props.isActive === false ? 0.6 : 1};

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
`;

const CardHeader = styled.div`
  padding: 24px 24px 16px;
  border-bottom: 1px solid #F0F2F5;
`;

const CardHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`;

const PlanName = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`;

const StatusBadge = styled.span<{ isActive: boolean }>`
  display: inline-block;
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  white-space: nowrap;
  background: ${props => props.isActive ? '#ECFDF5' : '#FEF2F2'};
  color: ${props => props.isActive ? '#059669' : '#DC2626'};
`;

const PlanDescription = styled.p`
  font-size: 13px;
  color: #6B7C93;
  margin: 0;
  line-height: 1.5;
`;

const CardBody = styled.div`
  padding: 20px 24px;
`;

const FeeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 16px;
`;

const FeeItem = styled.div`
  background: #F8FAFC;
  padding: 12px;
  border-radius: 8px;
`;

const FeeLabel = styled.div`
  font-size: 11px;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  margin-bottom: 4px;
`;

const FeeValue = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #0A2540;
`;

const FeeNote = styled.div`
  font-size: 11px;
  color: #9CA3AF;
  margin-top: 2px;
`;

const RentSection = styled.div`
  background: #FFF7ED;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 16px;
  border: 1px solid #FED7AA;
`;

const RentTitle = styled.div`
  font-size: 11px;
  color: #9A3412;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  font-weight: 600;
  margin-bottom: 6px;
`;

const RentDetail = styled.div`
  font-size: 14px;
  color: #0A2540;
  font-weight: 600;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  font-size: 13px;

  &:not(:last-child) {
    border-bottom: 1px solid #F0F2F5;
  }
`;

const InfoLabel = styled.span`
  color: #6B7C93;
`;

const InfoValue = styled.span`
  color: #0A2540;
  font-weight: 500;
`;

const RestaurantCount = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 12px;
  padding: 10px 12px;
  background: #FFF7ED;
  border-radius: 8px;
  font-size: 13px;
  color: #C2410C;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: #FFEDD5;
  }
`;

const CardActions = styled.div`
  display: flex;
  gap: 8px;
  padding: 16px 24px;
  border-top: 1px solid #F0F2F5;
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  flex: 1;
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: 1px solid;

  ${props => props.variant === 'primary' ? `
    background: #EA580C;
    color: white;
    border-color: #EA580C;
    &:hover { background: #C2410C; }
  ` : props.variant === 'danger' ? `
    background: white;
    color: #DC2626;
    border-color: #FCA5A5;
    &:hover { background: #FEF2F2; }
  ` : `
    background: white;
    color: #374151;
    border-color: #D1D5DB;
    &:hover { background: #F9FAFB; }
  `}
`;

// Modal styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 1000;
  overflow-y: auto;
  padding: 40px 0;
`;

const Modal = styled.div`
  background: white;
  border-radius: 16px;
  width: 95%;
  max-width: 640px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  flex-shrink: 0;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #E6EBF1;
`;

const ModalTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #6B7C93;
  cursor: pointer;
  padding: 4px;
  line-height: 1;

  &:hover { color: #0A2540; }
`;

const ModalBody = styled.div`
  padding: 24px;
  max-height: 70vh;
  overflow-y: auto;
`;

const ModalFooter = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding: 16px 24px;
  border-top: 1px solid #E6EBF1;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div<{ fullWidth?: boolean }>`
  margin-bottom: 16px;
  ${props => props.fullWidth && 'grid-column: 1 / -1;'}
`;

const Label = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  color: #0A2540;
  box-sizing: border-box;
  transition: all 0.15s;

  &:focus {
    outline: none;
    border-color: #EA580C;
    box-shadow: 0 0 0 3px rgba(234, 88, 12, 0.1);
  }

  &::placeholder { color: #9CA3AF; }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  color: #0A2540;
  box-sizing: border-box;
  resize: vertical;
  min-height: 60px;
  font-family: inherit;
  transition: all 0.15s;

  &:focus {
    outline: none;
    border-color: #EA580C;
    box-shadow: 0 0 0 3px rgba(234, 88, 12, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  color: #0A2540;
  box-sizing: border-box;
  background: white;
  cursor: pointer;
  transition: all 0.15s;

  &:focus {
    outline: none;
    border-color: #EA580C;
    box-shadow: 0 0 0 3px rgba(234, 88, 12, 0.1);
  }
`;

const CheckboxRow = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
`;

const SectionTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin: 20px 0 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #E6EBF1;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
`;

const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
`;

const EmptyText = styled.div`
  font-size: 16px;
  color: #6B7C93;
  margin-bottom: 8px;
`;

const EmptySubText = styled.div`
  font-size: 13px;
  color: #9CA3AF;
  margin-bottom: 20px;
`;

// Restaurant assignment modal
const RestaurantList = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

const RestaurantItem = styled.div<{ selected?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 1px solid ${props => props.selected ? '#EA580C' : '#E6EBF1'};
  border-radius: 8px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: all 0.15s;
  background: ${props => props.selected ? '#FFF7ED' : 'white'};

  &:hover {
    border-color: #EA580C;
    background: ${props => props.selected ? '#FFF7ED' : '#FFFBF5'};
  }
`;

const RestaurantCheckbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const RestaurantInfo = styled.div`
  flex: 1;
`;

const RestaurantName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
`;

const RestaurantMeta = styled.div`
  font-size: 12px;
  color: #6B7C93;
  margin-top: 2px;
`;

const AssignedBadge = styled.span`
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 4px;
  background: #FFEDD5;
  color: #C2410C;
`;

const EstimateBox = styled.div`
  background: #F0FDF4;
  border: 1px solid #BBF7D0;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
`;

const EstimateTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #166534;
  margin-bottom: 8px;
`;

const EstimateLine = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #374151;
  padding: 4px 0;
`;

const EstimateTotal = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  font-weight: 700;
  color: #0A2540;
  padding-top: 8px;
  margin-top: 8px;
  border-top: 1px solid #BBF7D0;
`;

// ============================================
// Component
// ============================================

const FoodcourtPlansPage: React.FC = () => {
  const { user } = useAuth();
  const [plans, setPlans] = useState<EntityPlan[]>([]);
  const [foodcourtRestaurants, setFoodcourtRestaurants] = useState<FoodcourtRestaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [foodcourtId, setFoodcourtId] = useState<number | null>(null);

  // Modal states
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRestaurantModal, setShowRestaurantModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState<EntityPlan | null>(null);
  const [deletingPlan, setDeletingPlan] = useState<EntityPlan | null>(null);
  const [managingPlan, setManagingPlan] = useState<EntityPlan | null>(null);
  const [formData, setFormData] = useState<PlanFormData>({ ...defaultFormData });
  const [saving, setSaving] = useState(false);
  const [selectedRestaurants, setSelectedRestaurants] = useState<number[]>([]);

  const token = localStorage.getItem('auth_token');

  // Get foodcourt ID from user
  useEffect(() => {
    if (user?.foodcourt_id) {
      setFoodcourtId(Number(user.foodcourt_id));
    }
  }, [user]);

  const fetchPlans = useCallback(async () => {
    if (!foodcourtId) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/foodcourts/${foodcourtId}/plans`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setPlans(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching plans:', error);
    } finally {
      setLoading(false);
    }
  }, [foodcourtId, token]);

  const fetchFoodcourtRestaurants = useCallback(async () => {
    if (!foodcourtId) return;
    try {
      const response = await fetch(`/api/foodcourts/${foodcourtId}/restaurants`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setFoodcourtRestaurants(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  }, [foodcourtId, token]);

  useEffect(() => {
    if (foodcourtId) {
      fetchPlans();
      fetchFoodcourtRestaurants();
    }
  }, [foodcourtId, fetchPlans, fetchFoodcourtRestaurants]);

  // Filter plans
  const filteredPlans = plans.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.description || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Stats
  const totalPlans = plans.length;
  const activePlans = plans.filter(p => p.is_active).length;
  const totalAssigned = plans.reduce((sum, p) =>
    sum + (p.planRestaurants?.filter(pr => pr.is_active)?.length || 0), 0
  );

  // Form handlers
  const handleOpenCreate = () => {
    setEditingPlan(null);
    setFormData({ ...defaultFormData });
    setShowFormModal(true);
  };

  const handleOpenEdit = (plan: EntityPlan) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name,
      description: plan.description || '',
      subscription_fee: plan.subscription_fee || '0',
      revenue_percentage: plan.revenue_percentage || '0',
      rent_type: plan.rent_type || 'none',
      rent_fixed: plan.rent_fixed || '0',
      rent_percentage: plan.rent_percentage || '0',
      billing_cycle: plan.billing_cycle || 'monthly',
      auto_generate: plan.auto_generate,
      tax_rate: plan.tax_rate || '6',
      currency: plan.currency || 'MYR'
    });
    setShowFormModal(true);
  };

  const handleSavePlan = async () => {
    if (!foodcourtId || !formData.name.trim()) return;
    setSaving(true);
    try {
      const url = editingPlan
        ? `/api/foodcourts/${foodcourtId}/plans/${editingPlan.id}`
        : `/api/foodcourts/${foodcourtId}/plans`;
      const method = editingPlan ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description || null,
          subscription_fee: parseFloat(formData.subscription_fee) || 0,
          revenue_percentage: parseFloat(formData.revenue_percentage) || 0,
          rent_type: formData.rent_type,
          rent_fixed: parseFloat(formData.rent_fixed) || 0,
          rent_percentage: parseFloat(formData.rent_percentage) || 0,
          billing_cycle: formData.billing_cycle,
          auto_generate: formData.auto_generate,
          tax_rate: parseFloat(formData.tax_rate) || 0,
          currency: formData.currency
        })
      });

      if (response.ok) {
        setShowFormModal(false);
        fetchPlans();
      }
    } catch (error) {
      console.error('Error saving plan:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePlan = async () => {
    if (!foodcourtId || !deletingPlan) return;
    try {
      const response = await fetch(`/api/foodcourts/${foodcourtId}/plans/${deletingPlan.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        setShowDeleteModal(false);
        setDeletingPlan(null);
        fetchPlans();
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to delete plan');
      }
    } catch (error) {
      console.error('Error deleting plan:', error);
    }
  };

  const handleToggleActive = async (plan: EntityPlan) => {
    if (!foodcourtId) return;
    try {
      await fetch(`/api/foodcourts/${foodcourtId}/plans/${plan.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ is_active: !plan.is_active })
      });
      fetchPlans();
    } catch (error) {
      console.error('Error toggling plan:', error);
    }
  };

  // Restaurant assignment handlers
  const handleOpenRestaurants = (plan: EntityPlan) => {
    setManagingPlan(plan);
    const currentAssigned = (plan.planRestaurants || [])
      .filter(pr => pr.is_active)
      .map(pr => pr.restaurant_id);
    setSelectedRestaurants(currentAssigned);
    setShowRestaurantModal(true);
  };

  const handleToggleRestaurant = (restaurantId: number) => {
    setSelectedRestaurants(prev =>
      prev.includes(restaurantId)
        ? prev.filter(id => id !== restaurantId)
        : [...prev, restaurantId]
    );
  };

  const handleSaveRestaurants = async () => {
    if (!foodcourtId || !managingPlan) return;
    setSaving(true);
    try {
      const currentAssigned = (managingPlan.planRestaurants || [])
        .filter(pr => pr.is_active)
        .map(pr => pr.restaurant_id);

      const toAdd = selectedRestaurants.filter(id => !currentAssigned.includes(id));
      const toRemove = currentAssigned.filter(id => !selectedRestaurants.includes(id));

      if (toAdd.length > 0) {
        await fetch(`/api/foodcourts/${foodcourtId}/plans/${managingPlan.id}/restaurants`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ restaurant_ids: toAdd })
        });
      }

      for (const rid of toRemove) {
        await fetch(`/api/foodcourts/${foodcourtId}/plans/${managingPlan.id}/restaurants/${rid}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
      }

      setShowRestaurantModal(false);
      setManagingPlan(null);
      fetchPlans();
    } catch (error) {
      console.error('Error saving restaurant assignments:', error);
    } finally {
      setSaving(false);
    }
  };

  // Estimate calculation
  const calculateEstimate = (data: PlanFormData, revenue: number = 50000) => {
    const fee = parseFloat(data.subscription_fee) || 0;
    const revPct = parseFloat(data.revenue_percentage) || 0;
    const royalty = revenue * (revPct / 100);

    let rent = 0;
    const rentFixed = parseFloat(data.rent_fixed) || 0;
    const rentPct = parseFloat(data.rent_percentage) || 0;
    switch (data.rent_type) {
      case 'fixed': rent = rentFixed; break;
      case 'percentage': rent = revenue * (rentPct / 100); break;
      case 'combined': rent = Math.max(rentFixed, revenue * (rentPct / 100)); break;
    }

    const subtotal = fee + royalty + rent;
    const taxRate = parseFloat(data.tax_rate) || 0;
    const tax = subtotal * (taxRate / 100);
    return { fee, royalty, rent, subtotal, tax, total: subtotal + tax };
  };

  const getRentDescription = (plan: EntityPlan) => {
    switch (plan.rent_type) {
      case 'fixed': return `${formatCurrency(parseFloat(plan.rent_fixed), plan.currency)} / month`;
      case 'percentage': return `${plan.rent_percentage}% of revenue`;
      case 'combined': return `MAX(${formatCurrency(parseFloat(plan.rent_fixed), plan.currency)}, ${plan.rent_percentage}%)`;
      default: return 'None';
    }
  };

  if (!user) return null;

  return (
    <MainLayout>
      <Container>
        <Header>
          <Title>Foodcourt Plans</Title>
          <ActionSection>
            <Button onClick={handleOpenCreate}>+ New Plan</Button>
          </ActionSection>
        </Header>

        <Content>
          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            <div style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #E6EBF1' }}>
              <div style={{ fontSize: '13px', color: '#6B7C93', textTransform: 'uppercase', letterSpacing: '0.3px' }}>Total Plans</div>
              <div style={{ fontSize: '28px', fontWeight: 700, color: '#0A2540', marginTop: '4px' }}>{totalPlans}</div>
            </div>
            <div style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #E6EBF1' }}>
              <div style={{ fontSize: '13px', color: '#6B7C93', textTransform: 'uppercase', letterSpacing: '0.3px' }}>Active Plans</div>
              <div style={{ fontSize: '28px', fontWeight: 700, color: '#059669', marginTop: '4px' }}>{activePlans}</div>
            </div>
            <div style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #E6EBF1' }}>
              <div style={{ fontSize: '13px', color: '#6B7C93', textTransform: 'uppercase', letterSpacing: '0.3px' }}>Assigned Tenants</div>
              <div style={{ fontSize: '28px', fontWeight: 700, color: '#EA580C', marginTop: '4px' }}>{totalAssigned}</div>
            </div>
            <div style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #E6EBF1' }}>
              <div style={{ fontSize: '13px', color: '#6B7C93', textTransform: 'uppercase', letterSpacing: '0.3px' }}>Foodcourt Tenants</div>
              <div style={{ fontSize: '28px', fontWeight: 700, color: '#0A2540', marginTop: '4px' }}>{foodcourtRestaurants.length}</div>
            </div>
          </div>

          {/* Search */}
          <FilterBar>
            <SearchInput
              placeholder="Search plans..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            />
          </FilterBar>

          {/* Plans Grid */}
          {loading ? (
            <EmptyState>
              <EmptyText>Loading plans...</EmptyText>
            </EmptyState>
          ) : filteredPlans.length === 0 ? (
            <EmptyState>
              <EmptyIcon>&#128203;</EmptyIcon>
              <EmptyText>{searchTerm ? 'No plans match your search' : 'No foodcourt plans yet'}</EmptyText>
              <EmptySubText>Create your first plan to start managing tenant fees, rent and revenue sharing</EmptySubText>
              {!searchTerm && <Button onClick={handleOpenCreate}>+ Create First Plan</Button>}
            </EmptyState>
          ) : (
            <PlansGrid>
              {filteredPlans.map(plan => {
                const activeRestaurants = (plan.planRestaurants || []).filter(pr => pr.is_active);
                return (
                  <PlanCard key={plan.id} isActive={plan.is_active}>
                    <CardHeader>
                      <CardHeaderRow>
                        <PlanName>{plan.name}</PlanName>
                        <StatusBadge isActive={plan.is_active}>
                          {plan.is_active ? 'Active' : 'Inactive'}
                        </StatusBadge>
                      </CardHeaderRow>
                      {plan.description && <PlanDescription>{plan.description}</PlanDescription>}
                    </CardHeader>

                    <CardBody>
                      <FeeGrid>
                        <FeeItem>
                          <FeeLabel>Management Fee</FeeLabel>
                          <FeeValue>{formatCurrency(parseFloat(plan.subscription_fee), plan.currency)}</FeeValue>
                          <FeeNote>/ {plan.billing_cycle}</FeeNote>
                        </FeeItem>
                        <FeeItem>
                          <FeeLabel>Revenue Share</FeeLabel>
                          <FeeValue>{parseFloat(plan.revenue_percentage) > 0 ? `${plan.revenue_percentage}%` : '-'}</FeeValue>
                          <FeeNote>{parseFloat(plan.revenue_percentage) > 0 ? 'of monthly revenue' : 'Not applied'}</FeeNote>
                        </FeeItem>
                      </FeeGrid>

                      {plan.rent_type !== 'none' && (
                        <RentSection>
                          <RentTitle>Rent / Lease</RentTitle>
                          <RentDetail>{getRentDescription(plan)}</RentDetail>
                        </RentSection>
                      )}

                      <InfoRow>
                        <InfoLabel>Billing Cycle</InfoLabel>
                        <InfoValue style={{ textTransform: 'capitalize' }}>{plan.billing_cycle}</InfoValue>
                      </InfoRow>
                      <InfoRow>
                        <InfoLabel>Auto Invoice</InfoLabel>
                        <InfoValue>{plan.auto_generate ? 'Enabled' : 'Disabled'}</InfoValue>
                      </InfoRow>
                      <InfoRow>
                        <InfoLabel>Tax Rate</InfoLabel>
                        <InfoValue>{plan.tax_rate}%</InfoValue>
                      </InfoRow>

                      <RestaurantCount onClick={() => handleOpenRestaurants(plan)}>
                        <span>{activeRestaurants.length} tenant(s) assigned</span>
                        <span style={{ marginLeft: 'auto', fontSize: '12px' }}>Manage &rarr;</span>
                      </RestaurantCount>
                    </CardBody>

                    <CardActions>
                      <ActionButton variant="primary" onClick={() => handleOpenEdit(plan)}>Edit</ActionButton>
                      <ActionButton variant="secondary" onClick={() => handleToggleActive(plan)}>
                        {plan.is_active ? 'Deactivate' : 'Activate'}
                      </ActionButton>
                      <ActionButton variant="danger" onClick={() => { setDeletingPlan(plan); setShowDeleteModal(true); }}>
                        Delete
                      </ActionButton>
                    </CardActions>
                  </PlanCard>
                );
              })}
            </PlansGrid>
          )}
        </Content>
      </Container>

      {/* Create/Edit Plan Modal */}
      {showFormModal && (
        <ModalOverlay onClick={() => setShowFormModal(false)}>
          <Modal onClick={e => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>{editingPlan ? 'Edit Plan' : 'Create New Plan'}</ModalTitle>
              <CloseButton onClick={() => setShowFormModal(false)}>&times;</CloseButton>
            </ModalHeader>
            <ModalBody>
              <FormGrid>
                <FormGroup fullWidth>
                  <Label>Plan Name *</Label>
                  <Input
                    placeholder="e.g., Standard Tenant Plan"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </FormGroup>

                <FormGroup fullWidth>
                  <Label>Description</Label>
                  <TextArea
                    placeholder="Brief description of this plan..."
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                  />
                </FormGroup>

                <SectionTitle style={{ gridColumn: '1 / -1', marginTop: '8px' }}>Fee Structure</SectionTitle>

                <FormGroup>
                  <Label>Management Fee ({formData.currency})</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.subscription_fee}
                    onChange={e => setFormData({ ...formData, subscription_fee: e.target.value })}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Revenue Share (%)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.revenue_percentage}
                    onChange={e => setFormData({ ...formData, revenue_percentage: e.target.value })}
                  />
                </FormGroup>

                <SectionTitle style={{ gridColumn: '1 / -1' }}>Rent / Lease</SectionTitle>

                <FormGroup fullWidth>
                  <Label>Rent Type</Label>
                  <Select
                    value={formData.rent_type}
                    onChange={e => setFormData({ ...formData, rent_type: e.target.value as PlanFormData['rent_type'] })}
                  >
                    <option value="none">No Rent</option>
                    <option value="fixed">Fixed Amount</option>
                    <option value="percentage">Revenue Percentage</option>
                    <option value="combined">Combined (MAX of fixed, percentage)</option>
                  </Select>
                </FormGroup>

                {(formData.rent_type === 'fixed' || formData.rent_type === 'combined') && (
                  <FormGroup>
                    <Label>Fixed Rent ({formData.currency})</Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.rent_fixed}
                      onChange={e => setFormData({ ...formData, rent_fixed: e.target.value })}
                    />
                  </FormGroup>
                )}

                {(formData.rent_type === 'percentage' || formData.rent_type === 'combined') && (
                  <FormGroup>
                    <Label>Rent Percentage (%)</Label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.rent_percentage}
                      onChange={e => setFormData({ ...formData, rent_percentage: e.target.value })}
                    />
                  </FormGroup>
                )}

                <SectionTitle style={{ gridColumn: '1 / -1' }}>Billing Settings</SectionTitle>

                <FormGroup>
                  <Label>Billing Cycle</Label>
                  <Select
                    value={formData.billing_cycle}
                    onChange={e => setFormData({ ...formData, billing_cycle: e.target.value as 'monthly' | 'annual' })}
                  >
                    <option value="monthly">Monthly</option>
                    <option value="annual">Annual</option>
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label>Tax Rate (%)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    value={formData.tax_rate}
                    onChange={e => setFormData({ ...formData, tax_rate: e.target.value })}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Currency</Label>
                  <Select
                    value={formData.currency}
                    onChange={e => setFormData({ ...formData, currency: e.target.value })}
                  >
                    <option value="MYR">MYR (RM)</option>
                    <option value="USD">USD ($)</option>
                    <option value="KRW">KRW (Won)</option>
                    <option value="SGD">SGD (S$)</option>
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label>&nbsp;</Label>
                  <CheckboxRow>
                    <input
                      type="checkbox"
                      checked={formData.auto_generate}
                      onChange={e => setFormData({ ...formData, auto_generate: e.target.checked })}
                      style={{ width: '16px', height: '16px' }}
                    />
                    Auto-generate invoices
                  </CheckboxRow>
                </FormGroup>
              </FormGrid>

              {/* Estimate Preview */}
              <EstimateBox>
                <EstimateTitle>Estimated Monthly Charge (per tenant, RM 50,000 revenue)</EstimateTitle>
                {(() => {
                  const est = calculateEstimate(formData, 50000);
                  return (
                    <>
                      <EstimateLine>
                        <span>Management Fee</span>
                        <span>{formatCurrency(est.fee, formData.currency)}</span>
                      </EstimateLine>
                      {est.royalty > 0 && (
                        <EstimateLine>
                          <span>Revenue Share ({formData.revenue_percentage}%)</span>
                          <span>{formatCurrency(est.royalty, formData.currency)}</span>
                        </EstimateLine>
                      )}
                      {est.rent > 0 && (
                        <EstimateLine>
                          <span>Rent ({formData.rent_type})</span>
                          <span>{formatCurrency(est.rent, formData.currency)}</span>
                        </EstimateLine>
                      )}
                      <EstimateLine>
                        <span>Tax ({formData.tax_rate}%)</span>
                        <span>{formatCurrency(est.tax, formData.currency)}</span>
                      </EstimateLine>
                      <EstimateTotal>
                        <span>Total</span>
                        <span>{formatCurrency(est.total, formData.currency)}</span>
                      </EstimateTotal>
                    </>
                  );
                })()}
              </EstimateBox>
            </ModalBody>
            <ModalFooter>
              <ActionButton variant="secondary" onClick={() => setShowFormModal(false)}>Cancel</ActionButton>
              <ActionButton variant="primary" onClick={handleSavePlan} disabled={saving || !formData.name.trim()}>
                {saving ? 'Saving...' : editingPlan ? 'Update Plan' : 'Create Plan'}
              </ActionButton>
            </ModalFooter>
          </Modal>
        </ModalOverlay>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && deletingPlan && (
        <ModalOverlay onClick={() => setShowDeleteModal(false)}>
          <Modal onClick={e => e.stopPropagation()} style={{ maxWidth: '420px' }}>
            <ModalHeader>
              <ModalTitle>Delete Plan</ModalTitle>
              <CloseButton onClick={() => setShowDeleteModal(false)}>&times;</CloseButton>
            </ModalHeader>
            <ModalBody>
              <p style={{ color: '#374151', fontSize: '14px', lineHeight: 1.6 }}>
                Are you sure you want to delete <strong>{deletingPlan.name}</strong>?
                {(deletingPlan.planRestaurants?.filter(pr => pr.is_active)?.length || 0) > 0 &&
                  ' This plan has active tenant assignments. Please unassign all tenants first.'
                }
              </p>
            </ModalBody>
            <ModalFooter>
              <ActionButton variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</ActionButton>
              <ActionButton variant="danger" onClick={handleDeletePlan}>Delete Plan</ActionButton>
            </ModalFooter>
          </Modal>
        </ModalOverlay>
      )}

      {/* Restaurant Assignment Modal */}
      {showRestaurantModal && managingPlan && (
        <ModalOverlay onClick={() => setShowRestaurantModal(false)}>
          <Modal onClick={e => e.stopPropagation()} style={{ maxWidth: '560px' }}>
            <ModalHeader>
              <ModalTitle>Manage Tenants - {managingPlan.name}</ModalTitle>
              <CloseButton onClick={() => setShowRestaurantModal(false)}>&times;</CloseButton>
            </ModalHeader>
            <ModalBody>
              <p style={{ fontSize: '13px', color: '#6B7C93', marginBottom: '16px' }}>
                Select tenants to assign to this plan. {selectedRestaurants.length} selected.
              </p>
              <RestaurantList>
                {foodcourtRestaurants.length === 0 ? (
                  <EmptyState style={{ padding: '30px' }}>
                    <EmptyText>No tenants in this foodcourt</EmptyText>
                  </EmptyState>
                ) : (
                  foodcourtRestaurants.map(r => {
                    const isSelected = selectedRestaurants.includes(r.id);
                    const otherPlan = plans.find(p =>
                      p.id !== managingPlan.id &&
                      p.planRestaurants?.some(pr => pr.restaurant_id === r.id && pr.is_active)
                    );
                    return (
                      <RestaurantItem
                        key={r.id}
                        selected={isSelected}
                        onClick={() => handleToggleRestaurant(r.id)}
                      >
                        <RestaurantCheckbox
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleRestaurant(r.id)}
                        />
                        <RestaurantInfo>
                          <RestaurantName>{r.name}</RestaurantName>
                          <RestaurantMeta>{r.status} {r.address && `| ${r.address}`}</RestaurantMeta>
                        </RestaurantInfo>
                        {otherPlan && <AssignedBadge>{otherPlan.name}</AssignedBadge>}
                      </RestaurantItem>
                    );
                  })
                )}
              </RestaurantList>
            </ModalBody>
            <ModalFooter>
              <ActionButton variant="secondary" onClick={() => setShowRestaurantModal(false)}>Cancel</ActionButton>
              <ActionButton variant="primary" onClick={handleSaveRestaurants} disabled={saving}>
                {saving ? 'Saving...' : 'Save Assignments'}
              </ActionButton>
            </ModalFooter>
          </Modal>
        </ModalOverlay>
      )}
    </MainLayout>
  );
};

export default FoodcourtPlansPage;
