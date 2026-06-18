import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { getRestaurantDisplayName } from '../../utils/restaurantDisplay';
import {
  Container,
  Header,
  Title,
  ActionSection,
  Content,
  Button,
  StatsGrid,
  StatCard,
  StatValue,
  StatLabel,
  StatDescription
, Modal as CommonModal } from '../../components/UI';
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import { useAuth } from '../../contexts/AuthContext';
import { formatCurrency } from '../../utils/currency';
import ConfirmModal from '../../components/ConfirmModal';
import { useTranslation } from 'react-i18next';

import { getAuthToken } from '../../utils/auth';
import { formatDate as tzFormatDate } from '../../utils/timezone';
import { formatEntityAddress, AppLocale } from '../../utils/formatAddress';
// ============================================
// Types
// ============================================

interface EntityPlan {
  id: number;
  entity_type: 'brand' | 'foodcourt';
  entity_id: number;
  name: string;
  description: string | null;
  charge_type: 'fixed' | 'percentage' | 'combined' | 'additive';
  percentage_value: string;
  revenue_base: 'previous_month' | 'previous_year' | 'up_to_billing_day';
  billing_day: number | null;
  auto_generate: boolean;
  currency: string;
  is_active: boolean;
  category: 'basic' | 'custom';
  is_popular: boolean;
  features: string[];
  included_modules: string[];
  menu_item_limit: number;
  order_limit: number;
  staff_limit: number;
  created_by: number | null;
  createdAt: string;
  updatedAt: string;
  planRestaurants?: PlanRestaurant[];
  prices?: EntityPlanPrice[];
  contractLinks?: ContractLink[];
}

// Phase 2-F: reverse lookup — which contracts are (or were) attached to this plan
interface ContractLink {
  id: number;
  contract_id: number;
  entity_plan_id: number;
  assigned_at: string | null;
  end_at: string | null;
  contract?: {
    id: number;
    contract_number: string | null;
    stage: string;
    start_date: string | null;
    end_date: string | null;
    applicant_company_name: string | null;
  };
}

interface EntityPlanPrice {
  id?: number;
  entity_plan_id: number;
  currency: string;
  monthly_price: string;
  annual_price: string;
  is_active: boolean;
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

interface BrandRestaurant {
  id: number;
  name: string;
  status: string;
  address?: string;
  phone?: string;
}

interface CurrencyConfig {
  [key: string]: {
    symbol: string;
    name: string;
    decimals: number;
  };
}

// ============================================
// Styled Components
// ============================================

const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const PlanCard = styled.div<{ isPopular?: boolean; isActive?: boolean }>`
  background: white;
  border-radius: 16px;
  padding: 32px;
  border: 2px solid ${props => props.isPopular ? '#635BFF' : '#C7CED6'};
  position: relative;
  transition: all 0.2s;
  opacity: ${props => props.isActive ? 1 : 0.6};
  display: flex;
  flex-direction: column;
  min-height: 450px;

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    transform: translateY(-4px);
  }

  ${props => props.isPopular && `
    &::before {
      content: 'Most Popular';
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      background: #635BFF;
      color: white;
      padding: 6px 16px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  `}

  @media (max-width: 768px) {
    padding: 16px;
    min-height: auto;
  }
`;

const PlanHeader = styled.div`
  text-align: center;
  margin-bottom: 24px;
  margin-top: 36px;
`;

const PlanName = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 8px;
`;

const PlanDescription = styled.p`
  font-size: 14px;
  color: #4B5563;
  margin-bottom: 24px;
`;

const PlanPricing = styled.div`
  text-align: center;
`;

const MonthlyPrice = styled.div`
  font-size: 36px;
  font-weight: 800;
  color: #0A2540;
  margin-bottom: 4px;
`;

const AnnualPrice = styled.div`
  font-size: 14px;
  color: #059669;
  font-weight: 600;
  margin-bottom: 8px;
`;

const PricingNote = styled.div`
  font-size: 12px;
  color: #4B5563;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 8px 0;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 14px;
  color: #1F2937;
  line-height: 1.5;
`;

const PlanStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  margin-bottom: 0;
  padding-top: 16px;
  padding-bottom: 16px;
  border-top: 1px solid #C7CED6;
  border-bottom: 1px solid #C7CED6;
  flex-wrap: wrap;
  gap: 12px;

  @media (max-width: 768px) {
    gap: 8px;
  }
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`;

const StatDesc = styled.div`
  font-size: 12px;
  color: #4B5563;
  margin-top: 2px;
`;

const StatusBadge = styled.span<{ isActive: boolean }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  text-transform: uppercase;
  background: ${props => props.isActive ? '#ECFDF5' : '#FEF2F2'};
  color: ${props => props.isActive ? '#059669' : '#DC2626'};
`;

const BadgeContainer = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 8px;
  align-items: center;
`;

const ChargeTypeBadge = styled.span<{ chargeType: 'fixed' | 'percentage' | 'combined' | 'additive' }>`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  ${p =>
    p.chargeType === 'fixed' ? 'background: #DBEAFE; color: #1E40AF;' :
    p.chargeType === 'percentage' ? 'background: #FEF3C7; color: #92400E;' :
    p.chargeType === 'additive' ? 'background: #DCFCE7; color: #166534;' :
    'background: #E9D5FF; color: #6B21A8;'}
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: stretch;
  }
`;

const PlanButton = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  flex: 1;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  ${props => props.variant === 'primary' ? `
    background: #635BFF;
    color: white;
    border-color: #635BFF;
    &:hover { background: #5A51E6; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3); }
  ` : props.variant === 'danger' ? `
    background: transparent;
    color: #DC2626;
    border-color: #FCA5A5;
    &:hover { background: #FEE2E2; }
  ` : `
    background: transparent;
    color: #4B5563;
    border-color: #C7CED6;
    &:hover { background: #F1F4F8; color: #0A2540; }
  `}
`;


const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 8px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
  background: white;
  cursor: pointer;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`;

const FormTextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  box-sizing: border-box;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`;

const PricingRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`;

const CheckboxItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  input[type="checkbox"] { width: 16px; height: 16px; margin-top: 2px; flex-shrink: 0; accent-color: #635BFF; }
  label { font-size: 14px; color: #0A2540; cursor: pointer; }
`;

const DetailSection = styled.div`
  margin-bottom: 24px;
  h4 { font-size: 16px; font-weight: 600; color: #0A2540; margin: 0 0 16px 0; padding-bottom: 8px; border-bottom: 1px solid #C7CED6; }
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  flex-wrap: wrap;
  gap: 8px;
  &:last-child { margin-bottom: 0; }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const DetailLabel = styled.span`
  font-size: 14px;
  color: #4B5563;
  font-weight: 500;
`;

const DetailValue = styled.span`
  font-size: 14px;
  color: #0A2540;
  font-weight: 500;
`;

const SectionDivider = styled.div`
  margin: 20px 0;
  padding: 12px 0 4px;
  border-top: 2px solid #C7CED6;
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
`;

const BrandChargesSection = styled.div`
  margin: 8px 0;
  padding: 12px 16px;
  background: #FFF7ED;
  border-radius: 8px;
  border: 1px solid #FED7AA;
`;

const BrandChargeItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
`;

const RestaurantList = styled.div`
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #C7CED6;
  border-radius: 8px;
`;

const RestaurantItem = styled.div<{ isAssigned?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #F1F4F8;
  background: ${props => props.isAssigned ? '#F0FDF4' : 'white'};
  flex-wrap: wrap;
  gap: 8px;
  &:last-child { border-bottom: none; }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

// ============================================
// Constants
// ============================================

const REVENUE_BASE_LABELS: Record<string, string> = {
  previous_month: 'Previous Month',
  previous_year: 'Previous Year',
  up_to_billing_day: 'Up to Billing Day'
};

// ============================================
// Component
// ============================================

const BrandPlansPage: React.FC = () => {
  const { t, i18n } = useTranslation('brand');
  const { user } = useAuth();

  const [plans, setPlans] = useState<EntityPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const brandId = user?.brand_id || null;

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [displayCurrency, setDisplayCurrency] = useState<string>('');

  const [currencyConfig, setCurrencyConfig] = useState<CurrencyConfig>({});
  const [supportedCurrencies, setSupportedCurrencies] = useState<string[]>([]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showPricesModal, setShowPricesModal] = useState(false);
  const [showRestaurantModal, setShowRestaurantModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<EntityPlan | null>(null);

  const [editingPlanPrices, setEditingPlanPrices] = useState<{[currency: string]: {monthly: string; annual: string}}>({});
  const [brandRestaurants, setBrandRestaurants] = useState<BrandRestaurant[]>([]);

  const defaultFormData = {
    name: '',
    description: '',
    charge_type: 'fixed' as 'fixed' | 'percentage' | 'combined' | 'additive',
    percentage_value: '',
    revenue_base: 'previous_month' as 'previous_month' | 'previous_year' | 'up_to_billing_day',
    billing_day: '',
    auto_generate: true,
    currency_prices: {} as {[currency: string]: {monthly: string; annual: string}},
    features: '',
    is_popular: false,
    is_active: true
  };

  const [createFormData, setCreateFormData] = useState(defaultFormData);
  const [editFormData, setEditFormData] = useState(defaultFormData);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingPlanId, setDeletingPlanId] = useState<number | null>(null);

  // ============================================
  // Data Fetching
  // ============================================

  const fetchPlans = useCallback(async (bId: number) => {
    try {
      setLoading(true);
      const token = getAuthToken();
      const response = await fetch(`/api/brands/${bId}/plans`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setPlans(data.success ? data.data : (Array.isArray(data) ? data : []));
      }
    } catch (error) {
      console.error('Error fetching plans:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCurrencyConfig = async () => {
    try {
      const response = await fetch('/api/currencies/config');
      if (response.ok) {
        const data = await response.json();
        setCurrencyConfig(data.currencies || data.data || {});
      }
    } catch (error) {
      console.error('Error fetching currency config:', error);
    }
  };

  const fetchSupportedCurrencies = async () => {
    try {
      const response = await fetch('/api/currencies/supported');
      if (response.ok) {
        const data = await response.json();
        const codes = (data.data || []).map((c: any) => c.code);
        setSupportedCurrencies(codes);
        if (codes.length > 0) {
          setDisplayCurrency(prev => prev || codes[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching supported currencies:', error);
      setSupportedCurrencies(['MYR', 'KRW']);
      setDisplayCurrency(prev => prev || 'MYR');
    }
  };

  const fetchBrandRestaurants = async (bId: number) => {
    try {
      const token = getAuthToken();
      const response = await fetch(`/api/brands/${bId}/restaurants`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setBrandRestaurants(data.success ? data.data : (Array.isArray(data) ? data : []));
      }
    } catch (error) {
      console.error('Error fetching brand restaurants:', error);
    }
  };

  const fetchPlanPrices = async (bId: number, planId: number) => {
    try {
      const token = getAuthToken();
      const response = await fetch(`/api/brands/${bId}/plans/${planId}/prices`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        const prices = data.success ? data.data : (Array.isArray(data) ? data : []);
        const editState: {[currency: string]: {monthly: string; annual: string}} = {};
        for (const price of prices) {
          editState[price.currency] = {
            monthly: price.monthly_price?.toString() || '0',
            annual: price.annual_price?.toString() || '0'
          };
        }
        for (const currency of supportedCurrencies) {
          if (!editState[currency]) {
            editState[currency] = { monthly: '0', annual: '0' };
          }
        }
        setEditingPlanPrices(editState);
      }
    } catch (error) {
      console.error('Error fetching plan prices:', error);
    }
  };

  useEffect(() => {
    if (brandId) fetchPlans(brandId);
    fetchCurrencyConfig();
    fetchSupportedCurrencies();
  }, [brandId, fetchPlans]);

  // ============================================
  // CRUD Operations
  // ============================================

  const createPlan = async () => {
    if (!brandId) return;
    try {
      const token = getAuthToken();

      const planData: any = {
        name: createFormData.name,
        description: createFormData.description || null,
        charge_type: createFormData.charge_type,
        billing_day: createFormData.billing_day ? parseInt(createFormData.billing_day) : null,
        auto_generate: createFormData.auto_generate,
        currency: 'MYR',
        is_popular: createFormData.is_popular,
        is_active: createFormData.is_active,
        features: createFormData.features.split('\n').filter(f => f.trim())
      };

      if (createFormData.charge_type === 'percentage') {
        planData.percentage_value = parseFloat(createFormData.percentage_value) || 0;
        planData.revenue_base = createFormData.revenue_base;
      } else {
        planData.currency_prices = Object.fromEntries(
          Object.entries(createFormData.currency_prices).map(([code, vals]) => [
            code, { monthly_price: parseFloat(vals.monthly) || 0, annual_price: parseFloat(vals.annual) || 0 }
          ])
        );
      }

      const response = await fetch(`/api/brands/${brandId}/plans`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(planData)
      });

      if (response.ok) {
        setShowCreateModal(false);
        setCreateFormData({...defaultFormData, currency_prices: {}});
        fetchPlans(brandId);
      } else {
        const error = await response.json();
        console.error('Failed to create plan:', error);
      }
    } catch (error) {
      console.error('Error creating plan:', error);
    }
  };

  const updatePlan = async () => {
    if (!brandId || !selectedPlan) return;
    try {
      const token = getAuthToken();

      const planData: any = {
        name: editFormData.name,
        description: editFormData.description || null,
        charge_type: editFormData.charge_type,
        billing_day: editFormData.billing_day ? parseInt(editFormData.billing_day) : null,
        auto_generate: editFormData.auto_generate,
        is_popular: editFormData.is_popular,
        is_active: editFormData.is_active,
        features: editFormData.features.split('\n').filter(f => f.trim())
      };

      if (editFormData.charge_type === 'percentage') {
        planData.percentage_value = parseFloat(editFormData.percentage_value) || 0;
        planData.revenue_base = editFormData.revenue_base;
      }

      const response = await fetch(`/api/brands/${brandId}/plans/${selectedPlan.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(planData)
      });

      if (response.ok) {
        // Save currency prices for fixed type
        if (editFormData.charge_type === 'fixed' && Object.keys(editFormData.currency_prices).length > 0) {
          const prices = Object.fromEntries(
            Object.entries(editFormData.currency_prices).map(([currency, values]) => [
              currency, { monthly_price: parseFloat(values.monthly) || 0, annual_price: parseFloat(values.annual) || 0 }
            ])
          );
          await fetch(`/api/brands/${brandId}/plans/${selectedPlan.id}/prices`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ prices })
          });
        }

        setShowEditModal(false);
        fetchPlans(brandId);
      } else {
        const error = await response.json();
        console.error('Failed to update plan:', error);
      }
    } catch (error) {
      console.error('Error updating plan:', error);
    }
  };

  const deletePlan = (planId: number) => {
    setDeletingPlanId(planId);
    setShowDeleteConfirm(true);
  };

  const confirmDeletePlan = async () => {
    if (!brandId || !deletingPlanId) return;
    setShowDeleteConfirm(false);
    try {
      const token = getAuthToken();
      const response = await fetch(`/api/brands/${brandId}/plans/${deletingPlanId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        setShowEditModal(false);
        fetchPlans(brandId);
      }
    } catch (error) {
      console.error('Error deleting plan:', error);
    }
    setDeletingPlanId(null);
  };

  const savePlanPrices = async () => {
    if (!brandId || !selectedPlan) return;
    try {
      const token = getAuthToken();
      const prices = Object.fromEntries(
        Object.entries(editingPlanPrices).map(([currency, values]) => [
          currency, { monthly_price: parseFloat(values.monthly) || 0, annual_price: parseFloat(values.annual) || 0 }
        ])
      );
      const response = await fetch(`/api/brands/${brandId}/plans/${selectedPlan.id}/prices`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ prices })
      });
      if (response.ok) {
        setShowPricesModal(false);
        fetchPlans(brandId);
      }
    } catch (error) {
      console.error('Error saving plan prices:', error);
    }
  };

  const assignRestaurant = async (restaurantId: number) => {
    if (!brandId || !selectedPlan) return;
    try {
      const token = getAuthToken();
      const response = await fetch(`/api/brands/${brandId}/plans/${selectedPlan.id}/restaurants`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ restaurant_ids: [restaurantId] })
      });
      if (response.ok) {
        fetchPlans(brandId);
        const updatedResponse = await fetch(`/api/brands/${brandId}/plans/${selectedPlan.id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (updatedResponse.ok) {
          const updatedData = await updatedResponse.json();
          setSelectedPlan(updatedData.success ? updatedData.data : updatedData);
        }
      }
    } catch (error) {
      console.error('Error assigning restaurant:', error);
    }
  };

  const removeRestaurant = async (restaurantId: number) => {
    if (!brandId || !selectedPlan) return;
    try {
      const token = getAuthToken();
      const response = await fetch(`/api/brands/${brandId}/plans/${selectedPlan.id}/restaurants/${restaurantId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        fetchPlans(brandId);
        const updatedResponse = await fetch(`/api/brands/${brandId}/plans/${selectedPlan.id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (updatedResponse.ok) {
          const updatedData = await updatedResponse.json();
          setSelectedPlan(updatedData.success ? updatedData.data : updatedData);
        }
      }
    } catch (error) {
      console.error('Error removing restaurant:', error);
    }
  };

  // ============================================
  // Helpers
  // ============================================

  const getPlanPrice = (plan: EntityPlan, type: 'monthly' | 'annual'): number => {
    if (plan.prices && plan.prices.length > 0) {
      const priceRecord = plan.prices.find(p => p.currency === displayCurrency);
      if (priceRecord) {
        return parseFloat(type === 'monthly' ? priceRecord.monthly_price : priceRecord.annual_price) || 0;
      }
    }
    return 0;
  };

  const hasCurrencyPrice = (plan: EntityPlan): boolean => {
    if (plan.prices && plan.prices.length > 0) {
      const priceRecord = plan.prices.find(p => p.currency === displayCurrency);
      return !!(priceRecord && (parseFloat(priceRecord.monthly_price) > 0 || parseFloat(priceRecord.annual_price) > 0));
    }
    return false;
  };

  const formatPlanPrice = (plan: EntityPlan, type: 'monthly' | 'annual'): string => {
    if (!hasCurrencyPrice(plan)) return 'Not Set';
    return formatCurrency(getPlanPrice(plan, type), displayCurrency);
  };

  const getSubscriptionCount = (plan: EntityPlan): number => {
    return plan.planRestaurants?.filter(r => r.is_active).length || 0;
  };

  // ============================================
  // Event Handlers
  // ============================================

  const handleCreatePlan = () => {
    setCreateFormData({...defaultFormData, currency_prices: {}});
    setShowCreateModal(true);
  };

  const handleEditPlan = (plan: EntityPlan) => {
    setSelectedPlan(plan);
    let currencyPricesData: {[currency: string]: {monthly: string; annual: string}} = {};
    if (plan.prices) {
      for (const price of plan.prices) {
        currencyPricesData[price.currency] = {
          monthly: price.monthly_price?.toString() || '0',
          annual: price.annual_price?.toString() || '0'
        };
      }
    }

    setEditFormData({
      name: plan.name,
      description: plan.description || '',
      charge_type: plan.charge_type || 'fixed',
      percentage_value: plan.percentage_value?.toString() || '0',
      revenue_base: plan.revenue_base || 'previous_month',
      billing_day: plan.billing_day?.toString() || '',
      auto_generate: plan.auto_generate !== false,
      currency_prices: currencyPricesData,
      features: Array.isArray(plan.features) ? plan.features.join('\n') : '',
      is_popular: plan.is_popular || false,
      is_active: plan.is_active !== false
    });
    setShowEditModal(true);
  };

  const handleViewDetails = (plan: EntityPlan) => {
    setSelectedPlan(plan);
    setShowDetailsModal(true);
  };

  const handlePlanPrices = (plan: EntityPlan) => {
    setSelectedPlan(plan);
    if (brandId) fetchPlanPrices(brandId, plan.id);
    setShowPricesModal(true);
  };

  const handleManageRestaurants = (plan: EntityPlan) => {
    setSelectedPlan(plan);
    if (brandId) fetchBrandRestaurants(brandId);
    setShowRestaurantModal(true);
  };

  // ============================================
  // Filtered Plans
  // ============================================

  const filteredPlans = plans.filter(plan => {
    const matchesSearch = plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (plan.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' ||
                         (statusFilter === 'active' && plan.is_active) ||
                         (statusFilter === 'inactive' && !plan.is_active);
    return matchesSearch && matchesStatus;
  });

  const activePlans = plans.filter(p => p.is_active).length;
  const totalSubscriptions = plans.reduce((sum, p) => sum + getSubscriptionCount(p), 0);
  const monthlyRevenue = plans.reduce((sum, p) => {
    if (p.charge_type === 'fixed') return sum + (getPlanPrice(p, 'monthly') * getSubscriptionCount(p));
    return sum;
  }, 0);

  // ============================================
  // Render helpers for modals
  // ============================================

  const renderChargeTypeFields = (
    formData: typeof createFormData,
    setFormData: React.Dispatch<React.SetStateAction<typeof createFormData>>
  ) => (
    <>
      <SectionDivider>{t('brand:brandPlansPage.chargeType')}</SectionDivider>
      <FormGroup>
        <FormLabel>Charge Type *</FormLabel>
        <FormSelect
          value={formData.charge_type}
          onChange={(e) => setFormData(prev => ({...prev, charge_type: e.target.value as any}))}
        >
          <option value="fixed">{t('brand:brandPlansPage.fixedAmount', 'Fixed Amount')}</option>
          <option value="percentage">{t('brand:brandPlansPage.percentageOfRevenue', '% of Revenue')}</option>
          <option value="additive">{t('brand:brandPlansPage.additive', 'Fixed Amount + % of Revenue')}</option>
          <option value="combined">{t('brand:brandPlansPage.combined', 'Fixed Amount or % of Revenue (whichever higher)')}</option>
        </FormSelect>
        <div style={{ fontSize: 12, color: '#4B5563', marginTop: 4 }}>
          {formData.charge_type === 'fixed' && t('brand:brandPlansPage.chargeHintFixed', 'Flat monthly fee per currency.')}
          {formData.charge_type === 'percentage' && t('brand:brandPlansPage.chargeHintPercentage', 'Royalty = revenue × rate. No fixed base.')}
          {formData.charge_type === 'additive' && t('brand:brandPlansPage.chargeHintAdditive', 'Bill = fixed amount + (revenue × rate). Both charged.')}
          {formData.charge_type === 'combined' && t('brand:brandPlansPage.chargeHintCombined', 'Bill = max(fixed amount, revenue × rate). Min-guarantee pattern.')}
        </div>
      </FormGroup>

      {(formData.charge_type === 'fixed' || formData.charge_type === 'additive' || formData.charge_type === 'combined') && (
        <FormGroup>
          <FormLabel>{t('brand:brandPlansPage.pricingByCurrency')}</FormLabel>
          <div style={{ display: 'grid', gap: '12px', marginTop: '8px' }}>
            {supportedCurrencies.map(code => {
              const config = currencyConfig[code];
              return (
                <div key={code} style={{ padding: '12px', border: '1px solid #C7CED6', borderRadius: '8px', background: '#F9FAFB' }}>
                  <div style={{ fontWeight: 600, marginBottom: '8px', color: '#0A2540' }}>
                    {config?.symbol || code} {code} - {config?.name || code}
                  </div>
                  <PricingRow>
                    <FormGroup style={{ marginBottom: 0 }}>
                      <FormLabel style={{ fontSize: '12px' }}>{t('brand:brandPlansPage.monthly')}</FormLabel>
                      <FormInput
                        type="number"
                        placeholder="0"
                        value={formData.currency_prices?.[code]?.monthly || ''}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          currency_prices: {
                            ...prev.currency_prices,
                            [code]: { ...prev.currency_prices?.[code], monthly: e.target.value }
                          }
                        }))}
                      />
                    </FormGroup>
                    <FormGroup style={{ marginBottom: 0 }}>
                      <FormLabel style={{ fontSize: '12px' }}>{t('brand:brandPlansPage.annual')}</FormLabel>
                      <FormInput
                        type="number"
                        placeholder="0"
                        value={formData.currency_prices?.[code]?.annual || ''}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          currency_prices: {
                            ...prev.currency_prices,
                            [code]: { ...prev.currency_prices?.[code], annual: e.target.value }
                          }
                        }))}
                      />
                    </FormGroup>
                  </PricingRow>
                </div>
              );
            })}
            {supportedCurrencies.length === 0 && (
              <p style={{ color: '#4B5563', fontSize: '14px' }}>
                No currencies configured. Add currencies in "Manage Currencies" first.
              </p>
            )}
          </div>
        </FormGroup>
      )}

      {(formData.charge_type === 'percentage' || formData.charge_type === 'additive' || formData.charge_type === 'combined') && (
        <>
          <FormGroup>
            <FormLabel>Revenue Percentage (%)</FormLabel>
            <FormInput
              type="number"
              step="0.01"
              placeholder="e.g., 5.00"
              value={formData.percentage_value}
              onChange={(e) => setFormData(prev => ({...prev, percentage_value: e.target.value}))}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>{t('brand:brandPlansPage.revenueBasePeriod')}</FormLabel>
            <FormSelect
              value={formData.revenue_base}
              onChange={(e) => setFormData(prev => ({...prev, revenue_base: e.target.value as any}))}
            >
              <option value="previous_month">{t('brand:brandPlansPage.previousMonth')}</option>
              <option value="previous_year">{t('brand:brandPlansPage.previousYear')}</option>
              <option value="up_to_billing_day">{t('brand:brandPlansPage.upToBillingDay')}</option>
            </FormSelect>
          </FormGroup>
        </>
      )}

      <FormGroup>
        <FormLabel>{t('brand:brandPlansPage.billingDay128')}</FormLabel>
        <FormInput
          type="number"
          min="1"
          max="28"
          placeholder="e.g., 15 (empty = subscription start date)"
          value={formData.billing_day}
          onChange={(e) => setFormData(prev => ({...prev, billing_day: e.target.value}))}
        />
        <div style={{ fontSize: '12px', color: '#4B5563', marginTop: '4px' }}>
          Leave empty to use subscription start date. Invoice auto-generated 14 days before billing day.
        </div>
      </FormGroup>
    </>
  );

  // ============================================
  // Render
  // ============================================

  return (
    <>
      <Container>
        <Header>
          <Title>{t('brand:brandPlansPage.brandPlans')}</Title>
          <ActionSection>
            <Button variant="primary" onClick={handleCreatePlan}>{t('brand:brandPlansPage.createPlan')}</Button>
          </ActionSection>
        </Header>
        <Content>

        <StatsGrid>
          <StatCard color="#059669">
            <StatValue>{plans.length}</StatValue>
            <StatLabel>{t('brand:brandPlansPage.totalPlans')}</StatLabel>
            <StatDescription>{activePlans} active</StatDescription>
          </StatCard>
          <StatCard color="#10B981">
            <StatValue>{activePlans}</StatValue>
            <StatLabel>{t('brand:brandPlansPage.activePlans')}</StatLabel>
            <StatDescription>{plans.length > 0 ? Math.round((activePlans/plans.length)*100) : 0}% available</StatDescription>
          </StatCard>
          <StatCard color="#F59E0B">
            <StatValue>{totalSubscriptions}</StatValue>
            <StatLabel>{t('brand:brandPlansPage.totalSubscriptions')}</StatLabel>
            <StatDescription>{t('brand:brandPlansPage.acrossAllPlans')}</StatDescription>
          </StatCard>
          <StatCard color="#DC2626">
            <StatValue>{formatCurrency(monthlyRevenue, displayCurrency)}</StatValue>
            <StatLabel>{t('brand:brandPlansPage.fixedMonthlyRevenue')}</StatLabel>
            <StatDescription>{t('brand:brandPlansPage.fromFixedtypePlans')}</StatDescription>
          </StatCard>
        </StatsGrid>

        <FilterBar>
          <SearchInput
            type="text"
            placeholder="Search plans..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FilterSelect
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
          >
            <option value="all">{t('brand:brandPlansPage.allStatus')}</option>
            <option value="active">{t('brand:brandPlansPage.active')}</option>
            <option value="inactive">{t('brand:brandPlansPage.inactive')}</option>
          </FilterSelect>
          <FilterSelect
            value={displayCurrency}
            onChange={(e) => setDisplayCurrency(e.target.value)}
            style={{ minWidth: '150px' }}
          >
            {supportedCurrencies.map(code => {
              const config = currencyConfig[code];
              return <option key={code} value={code}>{config?.symbol || code} {code}</option>;
            })}
          </FilterSelect>
        </FilterBar>

        {loading && filteredPlans.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#4B5563' }}>{t('brand:brandPlansPage.loadingPlans')}</div>
        ) : filteredPlans.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#4B5563' }}>
            {plans.length === 0 ? 'No plans created yet. Click "Create Plan" to get started.' : 'No plans match your filters.'}
          </div>
        ) : (
          <PlansGrid>
            {filteredPlans.map(plan => (
              <PlanCard key={plan.id} isPopular={plan.is_popular} isActive={plan.is_active}>
                <BadgeContainer>
                  <ChargeTypeBadge chargeType={plan.charge_type || 'fixed'}>
                    {plan.charge_type === 'percentage' ? '% Revenue'
                      : plan.charge_type === 'additive' ? 'Fixed + %'
                      : plan.charge_type === 'combined' ? 'Fixed or %'
                      : 'Fixed'}
                  </ChargeTypeBadge>
                  <StatusBadge isActive={plan.is_active}>
                    {plan.is_active ? 'Active' : 'Inactive'}
                  </StatusBadge>
                  {(plan.contractLinks || []).some(l => !l.end_at) && (
                    <span style={{
                      padding: '4px 10px', borderRadius: 12,
                      background: '#EEF2FF', color: '#4338CA',
                      fontSize: 11, fontWeight: 600, letterSpacing: 0.2
                    }} title="Created from a contract — see Details">
                      From contract
                    </span>
                  )}
                </BadgeContainer>

                <PlanHeader>
                  <PlanName>{plan.name}</PlanName>
                  {plan.description && <PlanDescription>{plan.description}</PlanDescription>}

                  <PlanPricing>
                    {plan.charge_type === 'percentage' ? (
                      <>
                        <MonthlyPrice>
                          {parseFloat(plan.percentage_value || '0')}%
                        </MonthlyPrice>
                        <PricingNote>of revenue ({REVENUE_BASE_LABELS[plan.revenue_base] || plan.revenue_base})</PricingNote>
                      </>
                    ) : hasCurrencyPrice(plan) ? (
                      <>
                        <MonthlyPrice>
                          {formatPlanPrice(plan, 'monthly')}<span style={{fontSize: '16px', color: '#4B5563'}}>/month</span>
                        </MonthlyPrice>
                        {getPlanPrice(plan, 'annual') > 0 && getPlanPrice(plan, 'monthly') > 0 && (
                          <AnnualPrice>
                            {formatPlanPrice(plan, 'annual')}/year
                            {getPlanPrice(plan, 'monthly') * 12 > getPlanPrice(plan, 'annual') && (
                              <span> (Save {Math.round(((getPlanPrice(plan, 'monthly') * 12 - getPlanPrice(plan, 'annual')) / (getPlanPrice(plan, 'monthly') * 12)) * 100)}%)</span>
                            )}
                          </AnnualPrice>
                        )}
                        <PricingNote>{t('brand:brandPlansPage.billedMonthlyOrAnnually')}</PricingNote>
                      </>
                    ) : (
                      <>
                        <MonthlyPrice style={{color: '#F59E0B'}}>{t('brand:brandPlansPage.priceNotSet')}</MonthlyPrice>
                        <PricingNote style={{color: '#F59E0B'}}>Set {displayCurrency} price in "Prices"</PricingNote>
                      </>
                    )}
                  </PlanPricing>
                </PlanHeader>

                {/* Billing Info */}
                <BrandChargesSection>
                  <BrandChargeItem>
                    <span style={{color: '#92400E', fontWeight: 500}}>{t('brand:brandPlansPage.billingDay')}</span>
                    <span style={{color: '#0A2540', fontWeight: 600}}>
                      {plan.billing_day ? `Every ${plan.billing_day}${plan.billing_day === 1 ? 'st' : plan.billing_day === 2 ? 'nd' : plan.billing_day === 3 ? 'rd' : 'th'}` : 'Subscription Start'}
                    </span>
                  </BrandChargeItem>
                  {plan.auto_generate && (
                    <BrandChargeItem style={{marginTop: 4}}>
                      <span style={{color: '#92400E', fontWeight: 500}}>{t('brand:brandPlansPage.autoinvoice')}</span>
                      <span style={{color: '#059669', fontWeight: 600}}>{t('brand:brandPlansPage.enabled')}</span>
                    </BrandChargeItem>
                  )}
                </BrandChargesSection>

                {Array.isArray(plan.features) && plan.features.length > 0 && (
                  <FeaturesList>
                    {plan.features.map((feature, index) => (
                      <FeatureItem key={index}>{feature}</FeatureItem>
                    ))}
                  </FeaturesList>
                )}

                <PlanStats>
                  <StatItem>
                    <StatNumber>{getSubscriptionCount(plan)}</StatNumber>
                    <StatDesc>{t('brand:brandPlansPage.subscriptions')}</StatDesc>
                  </StatItem>
                  <StatItem>
                    <StatNumber>
                      {plan.charge_type === 'fixed'
                        ? formatCurrency(getPlanPrice(plan, 'monthly') * getSubscriptionCount(plan), displayCurrency)
                        : `${parseFloat(plan.percentage_value || '0')}% rev`
                      }
                    </StatNumber>
                    <StatDesc>{plan.charge_type === 'fixed' ? 'Monthly Revenue' : 'Revenue Based'}</StatDesc>
                  </StatItem>
                </PlanStats>

                <ActionButtons>
                  <PlanButton variant="primary" onClick={() => handleEditPlan(plan)}>{t('brand:brandPlansPage.edit')}</PlanButton>
                  {plan.charge_type === 'fixed' && (
                    <PlanButton variant="secondary" onClick={() => handlePlanPrices(plan)}>{t('brand:brandPlansPage.prices')}</PlanButton>
                  )}
                  <PlanButton variant="secondary" onClick={() => handleViewDetails(plan)}>{t('brand:brandPlansPage.view')}</PlanButton>
                </ActionButtons>
              </PlanCard>
            ))}
          </PlansGrid>
        )}

        {/* Create Plan Modal */}
        {showCreateModal && (
                    <CommonModal isOpen={true} onClose={() => setShowCreateModal(false)} title="Create New Plan" footer={<><Button variant="secondary" onClick={() => setShowCreateModal(false)}>{t('brand:brandPlansPage.cancel')}</Button><Button variant="primary" onClick={createPlan}>{t('brand:brandPlansPage.createPlan')}</Button></>}>

                <FormGroup>
                  <FormLabel>Plan Name *</FormLabel>
                  <FormInput
                    type="text"
                    placeholder="e.g., Royalty Fee, Monthly Rent, Management Fee"
                    value={createFormData.name}
                    onChange={(e) => setCreateFormData(prev => ({...prev, name: e.target.value}))}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>{t('brand:brandPlansPage.description')}</FormLabel>
                  <FormTextArea
                    placeholder="Enter plan description..."
                    rows={3}
                    value={createFormData.description}
                    onChange={(e) => setCreateFormData(prev => ({...prev, description: e.target.value}))}
                  />
                </FormGroup>

                {renderChargeTypeFields(createFormData, setCreateFormData)}

                <FormGroup>
                  <FormLabel>{t('brand:brandPlansPage.featuresOnePerLine')}</FormLabel>
                  <FormTextArea
                    placeholder="Enter features, one per line..."
                    rows={4}
                    value={createFormData.features}
                    onChange={(e) => setCreateFormData(prev => ({...prev, features: e.target.value}))}
                  />
                </FormGroup>

                <CheckboxGroup>
                  <CheckboxItem>
                    <input type="checkbox" id="create-auto-generate" checked={createFormData.auto_generate}
                      onChange={(e) => setCreateFormData(prev => ({...prev, auto_generate: e.target.checked}))} />
                    <label htmlFor="create-auto-generate">{t('brand:brandPlansPage.autogenerateInvoices')}</label>
                  </CheckboxItem>
                  <CheckboxItem>
                    <input type="checkbox" id="create-popular" checked={createFormData.is_popular}
                      onChange={(e) => setCreateFormData(prev => ({...prev, is_popular: e.target.checked}))} />
                    <label htmlFor="create-popular">{t('brand:brandPlansPage.markAsMostPopular')}</label>
                  </CheckboxItem>
                  <CheckboxItem>
                    <input type="checkbox" id="create-active" checked={createFormData.is_active}
                      onChange={(e) => setCreateFormData(prev => ({...prev, is_active: e.target.checked}))} />
                    <label htmlFor="create-active">{t('brand:brandPlansPage.setAsActive')}</label>
                  </CheckboxItem>
                </CheckboxGroup>
              
          </CommonModal>
        )}

        {/* Edit Plan Modal */}
        {showEditModal && selectedPlan && (
                    <CommonModal isOpen={true} onClose={() => setShowEditModal(false)} title={`Edit Plan: ${selectedPlan.name}`} footer={<><Button variant="secondary" onClick={() => setShowEditModal(false)}>{t('brand:brandPlansPage.cancel')}</Button><Button variant="danger" onClick={() => deletePlan(selectedPlan.id)}>{t('brand:brandPlansPage.delete')}</Button><Button variant="primary" onClick={updatePlan}>{t('brand:brandPlansPage.saveChanges')}</Button></>}>

                <FormGroup>
                  <FormLabel>Plan Name *</FormLabel>
                  <FormInput
                    type="text"
                    value={editFormData.name}
                    onChange={(e) => setEditFormData(prev => ({...prev, name: e.target.value}))}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>{t('brand:brandPlansPage.description')}</FormLabel>
                  <FormTextArea
                    rows={3}
                    value={editFormData.description}
                    onChange={(e) => setEditFormData(prev => ({...prev, description: e.target.value}))}
                  />
                </FormGroup>

                {renderChargeTypeFields(editFormData, setEditFormData)}

                <FormGroup>
                  <FormLabel>{t('brand:brandPlansPage.featuresOnePerLine')}</FormLabel>
                  <FormTextArea
                    rows={4}
                    value={editFormData.features}
                    onChange={(e) => setEditFormData(prev => ({...prev, features: e.target.value}))}
                  />
                </FormGroup>

                <CheckboxGroup>
                  <CheckboxItem>
                    <input type="checkbox" id="edit-auto-generate" checked={editFormData.auto_generate}
                      onChange={(e) => setEditFormData(prev => ({...prev, auto_generate: e.target.checked}))} />
                    <label htmlFor="edit-auto-generate">{t('brand:brandPlansPage.autogenerateInvoices')}</label>
                  </CheckboxItem>
                  <CheckboxItem>
                    <input type="checkbox" id="edit-popular" checked={editFormData.is_popular}
                      onChange={(e) => setEditFormData(prev => ({...prev, is_popular: e.target.checked}))} />
                    <label htmlFor="edit-popular">{t('brand:brandPlansPage.markAsMostPopular')}</label>
                  </CheckboxItem>
                  <CheckboxItem>
                    <input type="checkbox" id="edit-active" checked={editFormData.is_active}
                      onChange={(e) => setEditFormData(prev => ({...prev, is_active: e.target.checked}))} />
                    <label htmlFor="edit-active">{t('brand:brandPlansPage.setAsActive')}</label>
                  </CheckboxItem>
                </CheckboxGroup>
              
          </CommonModal>
        )}

        {/* View Details Modal */}
        {showDetailsModal && selectedPlan && (
                    <CommonModal isOpen={true} onClose={() => setShowDetailsModal(false)} title={`Plan Details: ${selectedPlan.name}`} footer={<><Button variant="secondary" onClick={() => setShowDetailsModal(false)}>{t('brand:brandPlansPage.close')}</Button></>}>

                <DetailSection>
                  <h4>{t('brand:brandPlansPage.planInfo')}</h4>
                  <DetailRow>
                    <DetailLabel>{t('brand:brandPlansPage.planId')}</DetailLabel>
                    <DetailValue>{selectedPlan.id}</DetailValue>
                  </DetailRow>
                  <DetailRow>
                    <DetailLabel>{t('brand:brandPlansPage.name')}</DetailLabel>
                    <DetailValue>{selectedPlan.name}</DetailValue>
                  </DetailRow>
                  <DetailRow>
                    <DetailLabel>{t('brand:brandPlansPage.status')}</DetailLabel>
                    <StatusBadge isActive={selectedPlan.is_active}>
                      {selectedPlan.is_active ? 'Active' : 'Inactive'}
                    </StatusBadge>
                  </DetailRow>
                  <DetailRow>
                    <DetailLabel>{t('brand:brandPlansPage.chargeType')}</DetailLabel>
                    <ChargeTypeBadge chargeType={selectedPlan.charge_type || 'fixed'}>
                      {selectedPlan.charge_type === 'percentage' ? '% Revenue' : 'Fixed'}
                    </ChargeTypeBadge>
                  </DetailRow>
                  <DetailRow>
                    <DetailLabel>{t('brand:brandPlansPage.popularPlan')}</DetailLabel>
                    <DetailValue>{selectedPlan.is_popular ? 'Yes' : 'No'}</DetailValue>
                  </DetailRow>
                </DetailSection>

                <DetailSection>
                  <h4>{t('brand:brandPlansPage.billing')}</h4>
                  {selectedPlan.charge_type === 'percentage' ? (
                    <>
                      <DetailRow>
                        <DetailLabel>{t('brand:brandPlansPage.revenuePercentage')}</DetailLabel>
                        <DetailValue>{parseFloat(selectedPlan.percentage_value || '0')}%</DetailValue>
                      </DetailRow>
                      <DetailRow>
                        <DetailLabel>{t('brand:brandPlansPage.revenueBase')}</DetailLabel>
                        <DetailValue>{REVENUE_BASE_LABELS[selectedPlan.revenue_base] || selectedPlan.revenue_base}</DetailValue>
                      </DetailRow>
                    </>
                  ) : (
                    <>
                      {supportedCurrencies.map(code => {
                        const priceRecord = selectedPlan.prices?.find(p => p.currency === code);
                        if (!priceRecord) return null;
                        const monthly = parseFloat(priceRecord.monthly_price) || 0;
                        const annual = parseFloat(priceRecord.annual_price) || 0;
                        if (monthly === 0 && annual === 0) return null;
                        return (
                          <div key={code} style={{ marginBottom: '12px' }}>
                            <div style={{ fontWeight: 600, color: '#0A2540', marginBottom: '4px' }}>
                              {currencyConfig[code]?.symbol || code} {code}
                            </div>
                            <DetailRow>
                              <DetailLabel>{t('brand:brandPlansPage.monthly')}</DetailLabel>
                              <DetailValue>{formatCurrency(monthly, code)}</DetailValue>
                            </DetailRow>
                            {annual > 0 && (
                              <DetailRow>
                                <DetailLabel>{t('brand:brandPlansPage.annual')}</DetailLabel>
                                <DetailValue>{formatCurrency(annual, code)}</DetailValue>
                              </DetailRow>
                            )}
                          </div>
                        );
                      })}
                    </>
                  )}
                  <DetailRow>
                    <DetailLabel>{t('brand:brandPlansPage.billingDay')}</DetailLabel>
                    <DetailValue>{selectedPlan.billing_day ? `Every ${selectedPlan.billing_day}th` : 'Subscription Start Date'}</DetailValue>
                  </DetailRow>
                  <DetailRow>
                    <DetailLabel>{t('brand:brandPlansPage.autogenerateInvoices')}</DetailLabel>
                    <DetailValue>{selectedPlan.auto_generate ? 'Yes' : 'No'}</DetailValue>
                  </DetailRow>
                </DetailSection>

                <DetailSection>
                  <h4>{t('brand:brandPlansPage.statistics')}</h4>
                  <DetailRow>
                    <DetailLabel>{t('brand:brandPlansPage.currentSubscriptions')}</DetailLabel>
                    <DetailValue>{getSubscriptionCount(selectedPlan)}</DetailValue>
                  </DetailRow>
                  <DetailRow>
                    <DetailLabel>{t('brand:brandPlansPage.createdDate')}</DetailLabel>
                    <DetailValue>{tzFormatDate(selectedPlan.createdAt, null)}</DetailValue>
                  </DetailRow>
                </DetailSection>

                {Array.isArray(selectedPlan.features) && selectedPlan.features.length > 0 && (
                  <DetailSection>
                    <h4>{t('brand:brandPlansPage.features')}</h4>
                    <FeaturesList>
                      {selectedPlan.features.map((feature, index) => (
                        <FeatureItem key={index}>{feature}</FeatureItem>
                      ))}
                    </FeaturesList>
                  </DetailSection>
                )}

                <DetailSection>
                  <h4>Assigned Restaurants ({getSubscriptionCount(selectedPlan)})</h4>
                  {selectedPlan.planRestaurants && selectedPlan.planRestaurants.length > 0 ? (
                    <RestaurantList>
                      {selectedPlan.planRestaurants.map(pr => (
                        <RestaurantItem key={pr.id} isAssigned>
                          <div>
                            <div style={{fontWeight: 600, color: '#0A2540'}}>{pr.restaurant ? getRestaurantDisplayName(pr.restaurant) : `Restaurant #${pr.restaurant_id}`}</div>
                            <div style={{fontSize: '12px', color: '#4B5563'}}>
                              Since {tzFormatDate(pr.activation_date, null)}
                            </div>
                          </div>
                          <StatusBadge isActive={pr.is_active}>{pr.is_active ? 'Active' : 'Inactive'}</StatusBadge>
                        </RestaurantItem>
                      ))}
                    </RestaurantList>
                  ) : (
                    <p style={{color: '#4B5563', fontSize: '14px'}}>{t('brand:brandPlansPage.noRestaurantsAssignedToThisPlan')}</p>
                  )}
                  <Button variant="secondary" style={{marginTop: '12px', width: '100%'}} onClick={() => handleManageRestaurants(selectedPlan)}>
                    Manage Restaurant Assignments
                  </Button>
                </DetailSection>

                {/* Phase 2-F: Originating Contracts */}
                {(selectedPlan.contractLinks || []).length > 0 && (
                  <DetailSection>
                    <h4>Linked Contracts ({(selectedPlan.contractLinks || []).length})</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {(selectedPlan.contractLinks || []).map(link => {
                        const c = link.contract;
                        const isOpen = !link.end_at;
                        return (
                          <div key={link.id} style={{
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            padding: '10px 12px', background: isOpen ? '#F0F9FF' : '#F9FAFB',
                            borderRadius: 8, border: `1px solid ${isOpen ? '#BAE6FD' : '#C7CED6'}`
                          }}>
                            <div>
                              <div style={{ fontWeight: 600, color: '#0A2540', fontSize: 14 }}>
                                {c?.contract_number || `Contract #${link.contract_id}`}
                                {c?.applicant_company_name ? <span style={{ color: '#4B5563', fontWeight: 400, marginLeft: 6 }}>· {c.applicant_company_name}</span> : null}
                              </div>
                              <div style={{ fontSize: 12, color: '#4B5563', marginTop: 2 }}>
                                {c?.start_date ? tzFormatDate(c.start_date, null) : '—'}
                                {c?.end_date ? ` → ${tzFormatDate(c.end_date, null)}` : ''}
                                {c?.stage ? ` · ${c.stage}` : ''}
                              </div>
                            </div>
                            <span style={{
                              padding: '4px 10px', borderRadius: 12,
                              background: isOpen ? '#DCFCE7' : '#F1F4F8',
                              color: isOpen ? '#166534' : '#4B5563',
                              fontSize: 11, fontWeight: 600
                            }}>
                              {isOpen ? 'Open' : 'Closed'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </DetailSection>
                )}

          </CommonModal>
        )}

        {/* Plan Prices Modal (Fixed type only) */}
        {showPricesModal && selectedPlan && (
                    <CommonModal isOpen={true} onClose={() => setShowPricesModal(false)} title={`Set Prices for ${selectedPlan.name}`} footer={<><Button variant="secondary" onClick={() => setShowPricesModal(false)}>{t('brand:brandPlansPage.cancel')}</Button><Button variant="primary" onClick={savePlanPrices}>{t('brand:brandPlansPage.savePrices')}</Button></>}>

                <p style={{ marginBottom: '20px', color: '#4B5563', fontSize: '14px' }}>
                  Configure pricing for each supported currency.
                </p>
                <div style={{ display: 'grid', gap: '16px' }}>
                  {supportedCurrencies.map(code => {
                    const config = currencyConfig[code];
                    return (
                      <div key={code} style={{ padding: '16px', border: '1px solid #C7CED6', borderRadius: '8px', background: '#F9FAFB' }}>
                        <div style={{ fontWeight: 600, marginBottom: '12px', color: '#0A2540', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ padding: '4px 8px', background: '#635BFF', color: 'white', borderRadius: '4px', fontSize: '12px' }}>{config?.symbol || code}</span>
                          {config?.name || code} ({code})
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                          <div>
                            <label style={{ fontSize: '13px', color: '#4B5563', display: 'block', marginBottom: '4px' }}>{t('brand:brandPlansPage.monthlyPrice')}</label>
                            <input type="number" value={editingPlanPrices[code]?.monthly || ''} onChange={(e) => setEditingPlanPrices({
                              ...editingPlanPrices, [code]: { ...editingPlanPrices[code], monthly: e.target.value }
                            })} style={{ width: '100%', padding: '10px 12px', border: '1px solid #C7CED6', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' as const }} placeholder="0.00" />
                          </div>
                          <div>
                            <label style={{ fontSize: '13px', color: '#4B5563', display: 'block', marginBottom: '4px' }}>{t('brand:brandPlansPage.annualPrice')}</label>
                            <input type="number" value={editingPlanPrices[code]?.annual || ''} onChange={(e) => setEditingPlanPrices({
                              ...editingPlanPrices, [code]: { ...editingPlanPrices[code], annual: e.target.value }
                            })} style={{ width: '100%', padding: '10px 12px', border: '1px solid #C7CED6', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' as const }} placeholder="0.00" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              
          </CommonModal>
        )}

        {/* Restaurant Assignment Modal */}
        {showRestaurantModal && selectedPlan && (
                    <CommonModal isOpen={true} onClose={() => setShowRestaurantModal(false)} title={`Manage Restaurants: ${selectedPlan.name}`} footer={<><Button variant="secondary" onClick={() => setShowRestaurantModal(false)}>{t('brand:brandPlansPage.close')}</Button></>}>

                <p style={{ marginBottom: '16px', color: '#4B5563', fontSize: '14px' }}>
                  Assign or remove restaurants from this plan.
                </p>
                <RestaurantList>
                  {brandRestaurants.map(restaurant => {
                    const isAssigned = selectedPlan.planRestaurants?.some(pr => pr.restaurant_id === restaurant.id && pr.is_active);
                    return (
                      <RestaurantItem key={restaurant.id} isAssigned={isAssigned}>
                        <div>
                          <div style={{fontWeight: 600, color: '#0A2540'}}>{getRestaurantDisplayName(restaurant)}</div>
                          <div style={{fontSize: '12px', color: '#4B5563'}}>{formatEntityAddress(restaurant, (i18n.language as AppLocale) || 'en') || 'No address'}</div>
                        </div>
                        {isAssigned ? (
                          <Button variant="danger-outline" onClick={() => removeRestaurant(restaurant.id)} style={{padding: '6px 12px', fontSize: '12px'}}>{t('brand:brandPlansPage.remove')}</Button>
                        ) : (
                          <Button variant="primary" onClick={() => assignRestaurant(restaurant.id)} style={{padding: '6px 12px', fontSize: '12px'}}>{t('brand:brandPlansPage.assign')}</Button>
                        )}
                      </RestaurantItem>
                    );
                  })}
                  {brandRestaurants.length === 0 && (
                    <div style={{padding: '20px', textAlign: 'center', color: '#4B5563'}}>{t('brand:brandPlansPage.noRestaurantsFound')}</div>
                  )}
                </RestaurantList>
              
          </CommonModal>
        )}

        </Content>
      </Container>

      <ConfirmModal
        isOpen={showDeleteConfirm}
        title="Delete Plan"
        message="Are you sure you want to delete this plan? This action cannot be undone."
        onConfirm={confirmDeletePlan}
        onCancel={() => { setShowDeleteConfirm(false); setDeletingPlanId(null); }}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </>
  );
};

export default BrandPlansPage;
