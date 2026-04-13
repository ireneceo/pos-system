import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  StatsGrid,
  StatCard,
  StatLabel,
  StatValue,
  StatDescription,
  Container,
  Header,
  Title,
  ActionSection,
  Content,
  Button
, Modal as CommonModal } from '../../components/UI';
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import { formatCurrency } from '../../utils/currency';
import ConfirmModal from '../../components/ConfirmModal';
import { useTranslation } from 'react-i18next';

import { getAuthToken } from '../../utils/auth';
interface CurrencyPrice {
  monthly: number;
  annual: number;
}

interface Plan {
  id: string;
  name: string;
  displayName: string;
  description: string;
  category: 'basic' | 'custom';
  planTarget: 'restaurant' | 'brand' | 'foodcourt' | 'owner';
  monthlyPrice: number;
  annualPrice: number;
  orderLimit: number;
  menuItemLimit: number;
  staffLimit: number;
  restaurantLimit: number;
  managerLimit: number;
  features: string[];
  includedModules?: string[];
  isPopular: boolean;
  isActive: boolean;
  createdAt: string;
  subscriptionCount: number;
  currencyPrices?: Record<string, CurrencyPrice>;
}

interface AddonModule {
  id: number;
  target_user_type: 'restaurant' | 'brand' | 'foodcourt' | 'owner' | 'all';
  module_code: string;
  name: string;
  description: string;
  category: 'basic' | 'advanced' | 'revenue' | 'operation' | 'analytics' | string;
  base_price_monthly: number;
  base_price_annual: number;
  features: string[];
  dependencies: string[];
  is_active: boolean;
  sort_order: number;
}

// Modules that are always included and cannot be removed from plans
const ALWAYS_INCLUDED_MODULES: Record<string, string[]> = {
  restaurant: ['dashboard', 'membership'],
  brand: ['brand_dashboard'],
  foodcourt: ['fc_dashboard'],
  owner: ['owner_dashboard'],
};

// Common components now imported from ../../components/UI
// Page-specific styled components below

const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

const PlanCard = styled.div<{ isPopular?: boolean; isActive?: boolean }>`
  background: white;
  border-radius: 16px;
  padding: 32px;
  border: 2px solid ${props => props.isPopular ? '#635BFF' : '#E6EBF1'};
  position: relative;
  transition: all 0.2s;
  opacity: ${props => props.isActive ? 1 : 0.6};
  display: flex;
  flex-direction: column;
  min-height: 550px;

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
`;

const PlanHeader = styled.div`
  text-align: center;
  margin-bottom: 32px;
  margin-top: 36px;
`;

const PlanName = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 8px;
  text-transform: capitalize;
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
  color: #6B7280;
`;

const PlanLimits = styled.div`
  margin: 8px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 12px;
`;

const LimitItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const LimitLabel = styled.span`
  font-size: 14px;
  color: #374151;
`;

const LimitValue = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
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
  color: #374151;
  line-height: 1.5;
`;

const ModulesSection = styled.div`
  margin: 8px 0;
  padding: 12px;
  background: #F8FAFC;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`;

const ModulesSectionTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #6B7280;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ModulesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const ModuleTag = styled.span`
  display: inline-block;
  padding: 6px 12px;
  background: #FFFFFF;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  font-size: 13px;
  color: #374151;
  font-weight: 500;
`;

const PlanStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  margin-bottom: 0;
  padding-top: 16px;
  padding-bottom: 16px;
  border-top: 1px solid #E6EBF1;
  border-bottom: 1px solid #E6EBF1;
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
  color: #6B7280;
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

const CategoryBadge = styled.span<{ category: 'basic' | 'custom' }>`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${props => props.category === 'basic' ? '#DBEAFE' : '#FEF3C7'};
  color: ${props => props.category === 'basic' ? '#1E40AF' : '#92400E'};
`;

const BadgeContainer = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 8px;
  align-items: center;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
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
    
    &:hover {
      background: #5A51E6;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);
    }
  ` : props.variant === 'danger' ? `
    background: transparent;
    color: #DC2626;
    border-color: #FCA5A5;
    
    &:hover {
      background: #FEE2E2;
    }
  ` : `
    background: transparent;
    color: #6B7280;
    border-color: #E6EBF1;
    
    &:hover {
      background: #F8FAFC;
      color: #0A2540;
    }
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
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const FormTextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const PricingRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

const LimitsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
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

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    margin-top: 2px;
    flex-shrink: 0;
    accent-color: #635BFF;
  }

  label {
    font-size: 14px;
    color: #0A2540;
    cursor: pointer;
  }
`;


const DetailSection = styled.div`
  margin-bottom: 24px;

  h4 {
    font-size: 16px;
    font-weight: 600;
    color: #0A2540;
    margin: 0 0 16px 0;
    padding-bottom: 8px;
    border-bottom: 1px solid #E6EBF1;
  }
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const DetailLabel = styled.span`
  font-size: 14px;
  color: #6B7280;
  font-weight: 500;
`;

const DetailValue = styled.span`
  font-size: 14px;
  color: #0A2540;
  font-weight: 500;
`;

// Currency types
interface CurrencyConfig {
  [key: string]: {
    symbol: string;
    name: string;
    decimals: number;
  };
}

interface PlanPrice {
  plan_id: number;
  currency: string;
  monthly_price: number;
  annual_price: number;
  is_active: boolean;
}

const PlansPage: React.FC = () => {
  const { t } = useTranslation('admin');
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [subscriptionStats, setSubscriptionStats] = useState<{[key: string]: number}>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [planTargetFilter, setPlanTargetFilter] = useState<'all' | 'restaurant' | 'brand' | 'foodcourt' | 'owner'>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'basic' | 'custom'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [displayCurrency, setDisplayCurrency] = useState<string>('');

  // Addon modules
  const [availableModules, setAvailableModules] = useState<AddonModule[]>([]);

  // Currency management states
  const [currencyConfig, setCurrencyConfig] = useState<CurrencyConfig>({});
  const [supportedCurrencies, setSupportedCurrencies] = useState<string[]>([]);
  const [showPlanPricesModal, setShowPlanPricesModal] = useState(false);
  const [, setPlanPrices] = useState<PlanPrice[]>([]);
  const [editingPlanPrices, setEditingPlanPrices] = useState<{[currency: string]: {monthly: string; annual: string}}>({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingPlanId, setDeletingPlanId] = useState<string | null>(null);

  // Form data for create plan
  const [createFormData, setCreateFormData] = useState({
    name: '',
    display_name: '',
    description: '',
    category: 'basic' as 'basic' | 'custom',
    plan_target: 'restaurant' as 'restaurant' | 'brand' | 'foodcourt' | 'owner',
    base_price_monthly: '',
    base_price_annual: '',
    currency_prices: {} as {[currency: string]: {monthly: string; annual: string}},
    order_limit: '',
    menu_item_limit: '',
    staff_limit: '',
    restaurant_limit: '',
    manager_limit: '',
    features: '',
    included_modules: [] as string[],
    is_popular: false,
    is_active: true
  });

  // Form data for edit plan
  const [editFormData, setEditFormData] = useState({
    id: '',
    name: '',
    display_name: '',
    description: '',
    category: 'basic' as 'basic' | 'custom',
    plan_target: 'restaurant' as 'restaurant' | 'brand' | 'foodcourt' | 'owner',
    base_price_monthly: '',
    base_price_annual: '',
    currency_prices: {} as {[currency: string]: {monthly: string; annual: string}},
    order_limit: '',
    menu_item_limit: '',
    staff_limit: '',
    restaurant_limit: '',
    manager_limit: '',
    features: '',
    included_modules: [] as string[],
    is_popular: false,
    is_active: true
  });

  const getAuthHeaders = (): HeadersInit => {
    const token = getAuthToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  };

  useEffect(() => {
    fetchSubscriptionStats();
    fetchAvailableModules();
    fetchCurrencyConfig();
    fetchSupportedCurrencies();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCurrencyConfig = async () => {
    try {
      const response = await fetch('/api/currencies/config', { headers: getAuthHeaders() });
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
      const response = await fetch('/api/currencies/supported', { headers: getAuthHeaders() });
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

  const fetchPlanPrices = async (planId: string) => {
    try {
      const token = getAuthToken();
      const numericId = planId.replace('plan-', '');
      const response = await fetch(`/api/currencies/plans/${numericId}/prices`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setPlanPrices(data.data || []);

        // Initialize editing state
        const editState: {[currency: string]: {monthly: string; annual: string}} = {};
        for (const price of (data.data || [])) {
          editState[price.currency] = {
            monthly: price.monthly_price?.toString() || '0',
            annual: price.annual_price?.toString() || '0'
          };
        }
        // Add empty entries for supported currencies not in prices
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

  const savePlanPrices = async () => {
    if (!selectedPlan) return;
    try {
      const token = getAuthToken();
      const numericId = selectedPlan.id.replace('plan-', '');
      const prices = Object.entries(editingPlanPrices).map(([currency, values]) => ({
        currency,
        monthly_price: parseFloat(values.monthly) || 0,
        annual_price: parseFloat(values.annual) || 0,
        is_active: true
      }));

      const response = await fetch(`/api/currencies/plans/${numericId}/prices`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ prices })
      });

      if (response.ok) {
        setShowPlanPricesModal(false);
        fetchPlans();
      } else {
        const error = await response.json();
        console.error('Failed to update prices:', error.error);
      }
    } catch (error) {
      console.error('Error saving plan prices:', error);
    }
  };

  useEffect(() => {
    if (Object.keys(subscriptionStats).length >= 0) {
      fetchPlans();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscriptionStats]);

  const fetchAvailableModules = async () => {
    try {
      const response = await fetch('/api/addon-modules?active_only=true', { headers: getAuthHeaders() });
      if (!response.ok) throw new Error('Failed to fetch addon modules');
      const data = await response.json();
      setAvailableModules(data);
    } catch (error) {
      console.error('Error fetching addon modules:', error);
      setAvailableModules([]);
    }
  };

  const fetchSubscriptionStats = async () => {
    try {
      const response = await fetch('/api/plans/stats/subscriptions', { headers: getAuthHeaders() });
      if (!response.ok) throw new Error('Failed to fetch subscription stats');
      const data = await response.json();

      // Transform subscription stats by plan
      const statsByPlan: {[key: string]: number} = {};
      if (data && Array.isArray(data)) {
        data.forEach((item: any) => {
          statsByPlan[item.plan_name] = item.count || 0;
        });
      }
      setSubscriptionStats(statsByPlan);
    } catch (error) {
      console.error('Error fetching subscription stats:', error);
      // Fallback to default stats if API fails
      setSubscriptionStats({});
    }
  };

  const fetchPlans = async () => {
    try {
      const response = await fetch('/api/plans', { headers: getAuthHeaders() });
      if (!response.ok) throw new Error('Failed to fetch plans');

      const data = await response.json();
      const token = getAuthToken();

      // Transform API data to match frontend interface
      const transformedPlans: Plan[] = await Promise.all(data.map(async (plan: any) => {
        let features: string[] = [];
        try {
          // Parse features if it's a JSON string
          if (typeof plan.features === 'string') {
            features = JSON.parse(plan.features);
          } else if (Array.isArray(plan.features)) {
            features = plan.features;
          }
        } catch (e) {
          console.warn('Failed to parse features for plan:', plan.name, e);
          features = [];
        }

        // Parse included_modules
        let includedModules: string[] = [];
        try {
          if (typeof plan.included_modules === 'string') {
            includedModules = JSON.parse(plan.included_modules);
          } else if (Array.isArray(plan.included_modules)) {
            includedModules = plan.included_modules;
          }
        } catch (e) {
          console.warn('Failed to parse included_modules for plan:', plan.name, e);
          includedModules = [];
        }

        // Fetch currency prices for this plan
        let currencyPrices: Record<string, CurrencyPrice> = {};
        try {
          const pricesResponse = await fetch(`/api/currencies/plans/${plan.id}/prices`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (pricesResponse.ok) {
            const pricesData = await pricesResponse.json();
            for (const price of (pricesData.data || [])) {
              currencyPrices[price.currency] = {
                monthly: parseFloat(price.monthly_price) || 0,
                annual: parseFloat(price.annual_price) || 0
              };
            }
          }
        } catch (e) {
          console.warn('Failed to fetch currency prices for plan:', plan.name, e);
        }

        return {
          id: `plan-${plan.id}`,
          name: plan.name,
          displayName: plan.display_name,
          description: getDefaultDescription(plan.name),
          category: plan.category || 'basic',
          planTarget: plan.plan_target || 'restaurant',
          monthlyPrice: parseFloat(plan.base_price_monthly),
          annualPrice: parseFloat(plan.base_price_annual),
          orderLimit: plan.order_limit,
          menuItemLimit: plan.menu_item_limit,
          staffLimit: plan.staff_limit,
          restaurantLimit: plan.restaurant_limit,
          managerLimit: plan.manager_limit,
          features: features,
          includedModules: includedModules,
          isPopular: plan.name === 'professional',
          isActive: plan.is_active,
          createdAt: plan.createdAt ? new Date(plan.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          subscriptionCount: subscriptionStats[plan.display_name] || 0,
          currencyPrices
        };
      }));

      setPlans(transformedPlans);
    } catch (error) {
      console.error('Error fetching plans:', error);
      // Fallback to default plans if API fails
      setPlans(getDefaultPlans());
    }
  };

  const createPlan = async () => {
    try {
      // For custom plans, set all limits to -1 (unlimited)
      const isCustom = createFormData.category === 'custom';

      // Prepare data for API
      const planData = {
        name: createFormData.name,
        display_name: createFormData.display_name,
        description: createFormData.description,
        category: createFormData.category,
        plan_target: createFormData.plan_target,
        base_price_monthly: parseFloat(createFormData.base_price_monthly) || 0,
        base_price_annual: parseFloat(createFormData.base_price_annual) || 0,
        order_limit: isCustom ? -1 : (parseInt(createFormData.order_limit) || -1),
        menu_item_limit: isCustom ? -1 : (parseInt(createFormData.menu_item_limit) || -1),
        staff_limit: isCustom ? -1 : (parseInt(createFormData.staff_limit) || -1),
        restaurant_limit: isCustom ? -1 : (parseInt(createFormData.restaurant_limit) || -1),
        manager_limit: isCustom ? -1 : (parseInt(createFormData.manager_limit) || -1),
        features: createFormData.features.split('\n').filter(f => f.trim()),
        included_modules: [
          ...(ALWAYS_INCLUDED_MODULES[createFormData.plan_target] || []),
          ...createFormData.included_modules.filter(m => !(ALWAYS_INCLUDED_MODULES[createFormData.plan_target] || []).includes(m))
        ],
        is_popular: createFormData.is_popular,
        is_active: createFormData.is_active
      };

      console.log('Creating plan with data:', planData);

      const response = await fetch('/api/plans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify(planData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create plan');
      }

      const createdPlan = await response.json();

      // Save currency prices for the new plan
      if (createFormData.currency_prices && Object.keys(createFormData.currency_prices).length > 0) {
        const token = getAuthToken();
        const prices = Object.entries(createFormData.currency_prices).map(([currency, values]) => ({
          currency,
          monthly_price: parseFloat(values.monthly) || 0,
          annual_price: parseFloat(values.annual) || 0,
          is_active: true
        }));

        await fetch(`/api/currencies/plans/${createdPlan.id}/prices`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ prices })
        });
      }

      // Reset form
      setCreateFormData({
        name: '',
        display_name: '',
        description: '',
        category: 'basic' as 'basic' | 'custom',
        plan_target: 'restaurant' as 'restaurant' | 'brand' | 'foodcourt' | 'owner',
        base_price_monthly: '',
        base_price_annual: '',
        currency_prices: {},
        order_limit: '',
        menu_item_limit: '',
        staff_limit: '',
        restaurant_limit: '',
        manager_limit: '',
        features: '',
        included_modules: [],
        is_popular: false,
        is_active: true
      });

      // Close modal and refresh plans
      setShowCreateModal(false);
      fetchPlans();
    } catch (error) {
      console.error('Error creating plan:', error);
    }
  };

  const updatePlan = async () => {
    try {
      if (!editFormData.display_name) {
        console.log('Display name is required');
        return;
      }

      const isCustom = editFormData.category === 'custom';

      const planData = {
        display_name: editFormData.display_name,
        description: editFormData.description,
        category: editFormData.category,
        plan_target: editFormData.plan_target,
        base_price_monthly: parseFloat(editFormData.base_price_monthly) || 0,
        base_price_annual: parseFloat(editFormData.base_price_annual) || 0,
        order_limit: isCustom ? -1 : (parseInt(editFormData.order_limit) || -1),
        menu_item_limit: isCustom ? -1 : (parseInt(editFormData.menu_item_limit) || -1),
        staff_limit: isCustom ? -1 : (parseInt(editFormData.staff_limit) || -1),
        restaurant_limit: isCustom ? -1 : (parseInt(editFormData.restaurant_limit) || -1),
        manager_limit: isCustom ? -1 : (parseInt(editFormData.manager_limit) || -1),
        features: editFormData.features.split('\n').filter(f => f.trim()),
        included_modules: [
          ...(ALWAYS_INCLUDED_MODULES[editFormData.plan_target] || []),
          ...editFormData.included_modules.filter(m => !(ALWAYS_INCLUDED_MODULES[editFormData.plan_target] || []).includes(m))
        ],
        is_popular: editFormData.is_popular,
        is_active: editFormData.is_active
      };

      console.log('Updating plan with data:', planData);

      const planId = editFormData.id.replace('plan-', '');
      const response = await fetch(`/api/plans/${planId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify(planData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update plan');
      }

      // Save currency prices
      if (editFormData.currency_prices && Object.keys(editFormData.currency_prices).length > 0) {
        const token = getAuthToken();
        const prices = Object.entries(editFormData.currency_prices).map(([currency, values]) => ({
          currency,
          monthly_price: parseFloat(values.monthly) || 0,
          annual_price: parseFloat(values.annual) || 0,
          is_active: true
        }));

        await fetch(`/api/currencies/plans/${planId}/prices`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ prices })
        });
      }

      // Close modal and refresh plans
      setShowEditModal(false);
      fetchPlans();
    } catch (error) {
      console.error('Error updating plan:', error);
    }
  };

  const deletePlan = (planId: string) => {
    setDeletingPlanId(planId);
    setShowEditModal(false);
    setShowDeleteConfirm(true);
  };

  const confirmDeletePlan = async () => {
    if (!deletingPlanId) return;
    setShowDeleteConfirm(false);
    try {
      const token = getAuthToken();
      const numericId = deletingPlanId.replace('plan-', '');
      const response = await fetch(`/api/plans/${numericId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete plan');
      }

      // Close modal and refresh plans
      setShowEditModal(false);
      fetchPlans();
    } catch (error) {
      console.error('Error deleting plan:', error);
    }
    setDeletingPlanId(null);
  };

  const getDefaultDescription = (name: string) => {
    switch(name) {
      case 'basic':
        return 'Perfect for single restaurant owners starting their POS journey';
      case 'professional':
        return 'Ideal for growing businesses with multiple locations';
      case 'enterprise':
        return 'Comprehensive solution for large restaurant chains and food courts';
      default:
        return 'Subscription plan for restaurant management';
    }
  };

  const getDefaultPlans = (): Plan[] => {
    return [
      {
        id: 'plan-basic',
        name: 'basic',
        displayName: 'Basic',
        description: 'Perfect for single restaurant owners starting their POS journey',
        category: 'basic',
        planTarget: 'restaurant',
        monthlyPrice: 29,
        annualPrice: 290,
        menuItemLimit: 50,
        orderLimit: 1000,
        staffLimit: 5,
        restaurantLimit: -1,
        managerLimit: -1,
        features: [
          'Up to 1,000 orders per month',
          'Up to 50 menu items',
          'Up to 5 staff accounts',
          'Basic analytics',
          'Community support',
          'Standard POS features'
        ],
        isPopular: false,
        isActive: true,
        createdAt: '2024-01-01',
        subscriptionCount: subscriptionStats['Basic'] || 0
      },
      {
        id: 'plan-professional',
        name: 'professional',
        displayName: 'Professional',
        description: 'Ideal for growing businesses with multiple locations',
        category: 'basic',
        planTarget: 'restaurant',
        monthlyPrice: 99,
        annualPrice: 990,
        menuItemLimit: 200,
        orderLimit: 10000,
        staffLimit: 20,
        restaurantLimit: -1,
        managerLimit: -1,
        features: [
          'Up to 10,000 orders per month',
          'Up to 200 menu items',
          'Up to 20 staff accounts',
          'Advanced analytics',
          'Email support',
          'Inventory management',
          'Customer loyalty program',
          'Multi-location support'
        ],
        isPopular: true,
        isActive: true,
        createdAt: '2024-01-01',
        subscriptionCount: subscriptionStats['Professional'] || 0
      },
      {
        id: 'plan-enterprise',
        name: 'enterprise',
        displayName: 'Enterprise',
        description: 'Comprehensive solution for large restaurant chains and food courts',
        category: 'basic',
        planTarget: 'restaurant',
        monthlyPrice: 199,
        annualPrice: 2190,
        menuItemLimit: -1,
        orderLimit: -1,
        staffLimit: -1,
        restaurantLimit: -1,
        managerLimit: -1,
        features: [
          'Unlimited orders',
          'Unlimited menu items',
          'Unlimited staff accounts',
          'Premium analytics & reports',
          'Priority 24/7 support',
          'Custom branding',
          'API access',
          'Dedicated account manager',
          'Custom integrations',
          'Training sessions'
        ],
        isPopular: false,
        isActive: true,
        createdAt: '2024-01-01',
        subscriptionCount: subscriptionStats['Enterprise'] || 0
      }
    ];
  };

  const activePlans = plans.filter(p => p.isActive).length;
  const totalSubscriptions = plans.reduce((sum, p) => sum + p.subscriptionCount, 0);
  const monthlyRevenue = plans.reduce((sum, p) => sum + (p.monthlyPrice * p.subscriptionCount), 0);

  const formatLimit = (limit: number) => limit === -1 ? 'Unlimited' : limit.toLocaleString();

  // Get price for selected currency
  const getPlanPrice = (plan: Plan, type: 'monthly' | 'annual'): number => {
    if (plan.currencyPrices && plan.currencyPrices[displayCurrency]) {
      return plan.currencyPrices[displayCurrency][type];
    }
    // 선택된 통화에 가격이 없으면 0 반환
    return 0;
  };

  // 선택된 통화에 가격이 설정되어 있는지 확인
  const hasCurrencyPrice = (plan: Plan): boolean => {
    return !!(plan.currencyPrices && plan.currencyPrices[displayCurrency] &&
      (plan.currencyPrices[displayCurrency].monthly > 0 || plan.currencyPrices[displayCurrency].annual > 0));
  };

  // Format price with selected currency
  const formatPlanPrice = (plan: Plan, type: 'monthly' | 'annual'): string => {
    if (!hasCurrencyPrice(plan)) {
      return 'Not Set';
    }
    const price = getPlanPrice(plan, type);
    return formatCurrency(price, displayCurrency);
  };
  
  // Button handlers
  const handleCreatePlan = () => {
    setShowCreateModal(true);
  };
  
  const handleExportPlans = async () => {
    try {
      const response = await fetch('/api/plans/export/csv', { headers: getAuthHeaders() });
      if (!response.ok) throw new Error('Failed to export plans');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `subscription-plans-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error exporting plans:', error);
      console.error('Failed to export plans. Please try again.');
    }
  };
  
  const handleEditPlan = async (plan: Plan) => {
    setSelectedPlan(plan);

    // Load existing currency prices for this plan
    let currencyPricesData: {[currency: string]: {monthly: string; annual: string}} = {};
    try {
      const token = getAuthToken();
      const numericId = plan.id.replace('plan-', '');
      const response = await fetch(`/api/currencies/plans/${numericId}/prices`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        for (const price of (data.data || [])) {
          currencyPricesData[price.currency] = {
            monthly: price.monthly_price?.toString() || '0',
            annual: price.annual_price?.toString() || '0'
          };
        }
      }
    } catch (error) {
      console.error('Error loading plan prices:', error);
    }

    // Initialize edit form data with selected plan
    setEditFormData({
      id: plan.id,
      name: plan.name,
      display_name: plan.displayName,
      description: plan.description,
      category: plan.category,
      plan_target: plan.planTarget,
      base_price_monthly: plan.monthlyPrice.toString(),
      base_price_annual: plan.annualPrice.toString(),
      currency_prices: currencyPricesData,
      order_limit: plan.orderLimit.toString(),
      menu_item_limit: plan.menuItemLimit.toString(),
      staff_limit: plan.staffLimit.toString(),
      restaurant_limit: plan.restaurantLimit.toString(),
      manager_limit: plan.managerLimit.toString(),
      features: plan.features.join('\n'),
      included_modules: plan.includedModules || [],
      is_popular: plan.isPopular,
      is_active: plan.isActive
    });
    setShowEditModal(true);
  };
  
  const handleViewDetails = (plan: Plan) => {
    setSelectedPlan(plan);
    setShowDetailsModal(true);
  };

  // Filtered plans
  const filteredPlans = plans.filter(plan => {
    const matchesSearch = plan.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlanTarget = planTargetFilter === 'all' || plan.planTarget === planTargetFilter;
    const matchesCategory = categoryFilter === 'all' || plan.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' ||
                         (statusFilter === 'active' && plan.isActive) ||
                         (statusFilter === 'inactive' && !plan.isActive);
    return matchesSearch && matchesPlanTarget && matchesCategory && matchesStatus;
  });

  const basicPlansCount = plans.filter(p => p.category === 'basic').length;
  const customPlansCount = plans.filter(p => p.category === 'custom').length;
  return (
    <>
      <Container>
        <Header>
          <Title>{t('admin:plansPage.subscriptionPlans')}</Title>
          <ActionSection>
            <Button variant="secondary" onClick={handleExportPlans}>{t('admin:plansPage.export')}</Button>
            <Button variant="primary" onClick={handleCreatePlan}>{t('admin:plansPage.createPlan')}</Button>
          </ActionSection>
        </Header>
        <Content>

        <StatsGrid>
          <StatCard color="#059669">
            <StatValue>{plans.length}</StatValue>
            <StatLabel>{t('admin:plansPage.totalPlans')}</StatLabel>
            <StatDescription>{basicPlansCount} basic + {customPlansCount} custom</StatDescription>
          </StatCard>
          <StatCard color="#10B981">
            <StatValue>{activePlans}</StatValue>
            <StatLabel>{t('admin:plansPage.activePlans')}</StatLabel>
            <StatDescription>{plans.length > 0 ? Math.round((activePlans/plans.length)*100) : 0}% available</StatDescription>
          </StatCard>
          <StatCard color="#F59E0B">
            <StatValue>{totalSubscriptions}</StatValue>
            <StatLabel>{t('admin:plansPage.totalSubscriptions')}</StatLabel>
            <StatDescription>{t('admin:plansPage.acrossAllPlans')}</StatDescription>
          </StatCard>
          <StatCard color="#DC2626">
            <StatValue>{formatCurrency(monthlyRevenue)}</StatValue>
            <StatLabel>{t('admin:plansPage.monthlyRevenue')}</StatLabel>
            <StatDescription>{t('admin:plansPage.fromAllSubscriptions')}</StatDescription>
          </StatCard>
        </StatsGrid>

        <FilterBar>
          <FilterSelect
            value={planTargetFilter}
            onChange={(e) => setPlanTargetFilter(e.target.value as any)}
          >
            <option value="all">{t('admin:plansPage.allPlans')}</option>
            <option value="restaurant">{t('admin:plansPage.restaurantPlans')}</option>
            <option value="brand">{t('admin:plansPage.brandPlans')}</option>
            <option value="foodcourt">{t('admin:plansPage.foodcourtPlans')}</option>
            <option value="owner">{t('admin:plansPage.restaurantOwnerPlans')}</option>
          </FilterSelect>
          <FilterSelect
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as any)}
          >
            <option value="all">{t('admin:plansPage.allCategories')}</option>
            <option value="basic">{t('admin:plansPage.basicPlans')}</option>
            <option value="custom">{t('admin:plansPage.customPlans')}</option>
          </FilterSelect>
          <FilterSelect
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
          >
            <option value="all">{t('admin:plansPage.allStatus')}</option>
            <option value="active">{t('admin:plansPage.active')}</option>
            <option value="inactive">{t('admin:plansPage.inactive')}</option>
          </FilterSelect>
          <FilterSelect
            value={displayCurrency}
            onChange={(e) => setDisplayCurrency(e.target.value)}
            style={{ minWidth: '150px' }}
          >
            {supportedCurrencies.map(code => {
              const config = currencyConfig[code];
              return (
                <option key={code} value={code}>
                  {config?.symbol || code} {code}
                </option>
              );
            })}
          </FilterSelect>
          <SearchInput
            type="text"
            placeholder="Search plans..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </FilterBar>

        <PlansGrid>
          {filteredPlans.map(plan => (
            <PlanCard key={plan.id} isPopular={plan.isPopular} isActive={plan.isActive}>
              <BadgeContainer>
                <CategoryBadge category={plan.category}>
                  {plan.category === 'basic' ? 'Basic' : 'Custom'}
                </CategoryBadge>
                <StatusBadge isActive={plan.isActive}>
                  {plan.isActive ? 'Active' : 'Inactive'}
                </StatusBadge>
              </BadgeContainer>

              <PlanHeader>
                <PlanName>{plan.displayName}</PlanName>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#635BFF', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '24px' }}>
                  {plan.planTarget === 'restaurant' ? 'Restaurant Plan' : plan.planTarget === 'brand' ? 'Brand Plan' : plan.planTarget === 'foodcourt' ? 'Foodcourt Plan' : 'Owner Plan'}
                </div>

                <PlanPricing>
                  {hasCurrencyPrice(plan) ? (
                    <>
                      <MonthlyPrice>
                        {formatPlanPrice(plan, 'monthly')}<span style={{fontSize: '16px', color: '#6B7280'}}>/month</span>
                      </MonthlyPrice>
                      {getPlanPrice(plan, 'annual') > 0 && getPlanPrice(plan, 'monthly') > 0 && (
                        <AnnualPrice>
                          {formatPlanPrice(plan, 'annual')}/year
                          {getPlanPrice(plan, 'monthly') * 12 > getPlanPrice(plan, 'annual') && (
                            <span> (Save {Math.round(((getPlanPrice(plan, 'monthly') * 12 - getPlanPrice(plan, 'annual')) / (getPlanPrice(plan, 'monthly') * 12)) * 100)}%)</span>
                          )}
                        </AnnualPrice>
                      )}
                      <PricingNote>{t('admin:plansPage.billedMonthlyOrAnnually')}</PricingNote>
                    </>
                  ) : (
                    <>
                      <MonthlyPrice style={{color: '#F59E0B'}}>
                        Price Not Set
                      </MonthlyPrice>
                      <PricingNote style={{color: '#F59E0B'}}>
                        Set {displayCurrency} price in "Prices" button
                      </PricingNote>
                    </>
                  )}
                </PlanPricing>
              </PlanHeader>

              {plan.category === 'basic' && plan.planTarget === 'restaurant' && (
                <PlanLimits>
                  <LimitItem>
                    <LimitLabel>{t('admin:plansPage.menuItems')}</LimitLabel>
                    <LimitValue>{formatLimit(plan.menuItemLimit)}</LimitValue>
                  </LimitItem>
                  <LimitItem>
                    <LimitLabel>{t('admin:plansPage.ordersmonth')}</LimitLabel>
                    <LimitValue>{formatLimit(plan.orderLimit)}</LimitValue>
                  </LimitItem>
                  <LimitItem>
                    <LimitLabel>{t('admin:plansPage.staff')}</LimitLabel>
                    <LimitValue>{formatLimit(plan.staffLimit)}</LimitValue>
                  </LimitItem>
                </PlanLimits>
              )}
              {plan.category === 'basic' && (plan.planTarget === 'brand' || plan.planTarget === 'foodcourt') && (
                <PlanLimits>
                  <LimitItem>
                    <LimitLabel>{t('admin:plansPage.restaurants')}</LimitLabel>
                    <LimitValue>{formatLimit(plan.restaurantLimit)}</LimitValue>
                  </LimitItem>
                  <LimitItem>
                    <LimitLabel>{t('admin:plansPage.managers')}</LimitLabel>
                    <LimitValue>{formatLimit(plan.managerLimit)}</LimitValue>
                  </LimitItem>
                </PlanLimits>
              )}
              {plan.category === 'basic' && plan.planTarget === 'owner' && (
                <PlanLimits>
                  <LimitItem>
                    <LimitLabel>{t('admin:plansPage.restaurants')}</LimitLabel>
                    <LimitValue>{formatLimit(plan.restaurantLimit)}</LimitValue>
                  </LimitItem>
                </PlanLimits>
              )}

              {plan.includedModules && plan.includedModules.length > 0 && (() => {
                const basicModules = plan.includedModules
                  .map(code => availableModules.find(m => m.module_code === code))
                  .filter(m => m && m.category === 'basic');
                const advancedModules = plan.includedModules
                  .map(code => availableModules.find(m => m.module_code === code))
                  .filter(m => m && m.category !== 'basic');

                return (
                  <>
                    {basicModules.length > 0 && (
                      <ModulesSection>
                        <ModulesSectionTitle>Basic Modules ({basicModules.length})</ModulesSectionTitle>
                        <ModulesList>
                          {basicModules.map((module, index) => (
                            <ModuleTag key={index}>{module!.name}</ModuleTag>
                          ))}
                        </ModulesList>
                      </ModulesSection>
                    )}
                    {advancedModules.length > 0 && (
                      <ModulesSection>
                        <ModulesSectionTitle>Advanced Modules ({advancedModules.length})</ModulesSectionTitle>
                        <ModulesList>
                          {advancedModules.map((module, index) => (
                            <ModuleTag key={index}>{module!.name}</ModuleTag>
                          ))}
                        </ModulesList>
                      </ModulesSection>
                    )}
                  </>
                );
              })()}

              <FeaturesList>
                {(Array.isArray(plan.features) ? plan.features : []).map((feature, index) => (
                  <FeatureItem key={index}>{feature}</FeatureItem>
                ))}
              </FeaturesList>

              <PlanStats>
                <StatItem>
                  <StatNumber>{plan.subscriptionCount}</StatNumber>
                  <StatDesc>{t('admin:plansPage.subscriptions')}</StatDesc>
                </StatItem>
                <StatItem>
                  <StatNumber>{formatCurrency(getPlanPrice(plan, 'monthly') * plan.subscriptionCount, displayCurrency)}</StatNumber>
                  <StatDesc>{t('admin:plansPage.monthlyRevenue')}</StatDesc>
                </StatItem>
              </PlanStats>

              <ActionButtons>
                <PlanButton
                  variant="primary"
                  onClick={() => handleEditPlan(plan)}
                >
                  Edit
                </PlanButton>
                <PlanButton
                  variant="secondary"
                  onClick={() => {
                    setSelectedPlan(plan);
                    fetchPlanPrices(plan.id);
                    setShowPlanPricesModal(true);
                  }}
                >
                  Prices
                </PlanButton>
                <PlanButton
                  variant="secondary"
                  onClick={() => handleViewDetails(plan)}
                >
                  View
                </PlanButton>
              </ActionButtons>
            </PlanCard>
          ))}
        </PlansGrid>
        
        {/* Create Plan Modal */}
        {showCreateModal && (
                    <CommonModal isOpen={true} onClose={() => setShowCreateModal(false)} title="Create New Plan" footer={<><Button variant="secondary" onClick={() => setShowCreateModal(false)}>{t('admin:plansPage.cancel')}</Button><Button variant="primary" onClick={createPlan}>{t('admin:plansPage.createPlan')}</Button></>}>

                <FormGroup>
                  <FormLabel>Plan Target *</FormLabel>
                  <FormSelect
                    value={createFormData.plan_target}
                    onChange={(e) => setCreateFormData(prev => ({...prev, plan_target: e.target.value as 'restaurant' | 'brand' | 'foodcourt' | 'owner'}))}
                  >
                    <option value="restaurant">{t('admin:plansPage.restaurantPlan')}</option>
                    <option value="brand">{t('admin:plansPage.brandPlan')}</option>
                    <option value="foodcourt">{t('admin:plansPage.foodcourtPlan')}</option>
                    <option value="owner">{t('admin:plansPage.restaurantOwnerPlan')}</option>
                  </FormSelect>
                </FormGroup>
                <FormGroup>
                  <FormLabel>Plan Category *</FormLabel>
                  <FormSelect
                    value={createFormData.category}
                    onChange={(e) => setCreateFormData(prev => ({...prev, category: e.target.value as 'basic' | 'custom'}))}
                  >
                    <option value="basic">{t('admin:plansPage.basicSubscription')}</option>
                    <option value="custom">{t('admin:plansPage.customSubscription')}</option>
                  </FormSelect>
                </FormGroup>
                <FormGroup>
                  <FormLabel>Plan Name *</FormLabel>
                  <FormInput
                    type="text"
                    placeholder="e.g., Basic Plan, Manager Professional"
                    value={createFormData.display_name}
                    onChange={(e) => {
                      const displayName = e.target.value;
                      const internalName = displayName
                        .toLowerCase()
                        .replace(/[^a-z0-9\s]/g, '')
                        .replace(/\s+/g, '_')
                        .trim();
                      setCreateFormData(prev => ({
                        ...prev,
                        display_name: displayName,
                        name: internalName
                      }));
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>{t('admin:plansPage.description')}</FormLabel>
                  <FormTextArea
                    placeholder="Enter plan description..."
                    rows={3}
                    value={createFormData.description}
                    onChange={(e) => setCreateFormData(prev => ({...prev, description: e.target.value}))}
                  />
                </FormGroup>
                {/* Multi-Currency Pricing */}
                <FormGroup>
                  <FormLabel>{t('admin:plansPage.pricingByCurrency')}</FormLabel>
                  <div style={{ display: 'grid', gap: '12px', marginTop: '8px' }}>
                    {supportedCurrencies.map(code => {
                      const config = currencyConfig[code];
                      return (
                        <div key={code} style={{
                          padding: '12px',
                          border: '1px solid #E6EBF1',
                          borderRadius: '8px',
                          background: '#FAFBFC'
                        }}>
                          <div style={{ fontWeight: 600, marginBottom: '8px', color: '#0A2540' }}>
                            {config?.symbol || code} {code} - {config?.name || code}
                          </div>
                          <PricingRow>
                            <FormGroup style={{ marginBottom: 0 }}>
                              <FormLabel style={{ fontSize: '12px' }}>{t('admin:plansPage.monthly')}</FormLabel>
                              <FormInput
                                type="number"
                                placeholder="0"
                                value={createFormData.currency_prices?.[code]?.monthly || ''}
                                onChange={(e) => setCreateFormData(prev => ({
                                  ...prev,
                                  currency_prices: {
                                    ...prev.currency_prices,
                                    [code]: { ...prev.currency_prices?.[code], monthly: e.target.value }
                                  }
                                }))}
                              />
                            </FormGroup>
                            <FormGroup style={{ marginBottom: 0 }}>
                              <FormLabel style={{ fontSize: '12px' }}>{t('admin:plansPage.annual')}</FormLabel>
                              <FormInput
                                type="number"
                                placeholder="0"
                                value={createFormData.currency_prices?.[code]?.annual || ''}
                                onChange={(e) => setCreateFormData(prev => ({
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
                      <p style={{ color: '#6B7280', fontSize: '14px' }}>
                        No currencies configured. Add currencies in "Manage Currencies" first.
                      </p>
                    )}
                  </div>
                </FormGroup>
                {createFormData.category === 'basic' && createFormData.plan_target === 'restaurant' && (
                  <>
                    <LimitsRow>
                      <FormGroup>
                        <FormLabel>{t('admin:plansPage.menuItemLimit')}</FormLabel>
                        <FormInput
                          type="number"
                          placeholder="-1 for unlimited"
                          value={createFormData.menu_item_limit}
                          onChange={(e) => setCreateFormData(prev => ({...prev, menu_item_limit: e.target.value}))}
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormLabel>{t('admin:plansPage.orderLimitPerMonth')}</FormLabel>
                        <FormInput
                          type="number"
                          placeholder="-1 for unlimited"
                          value={createFormData.order_limit}
                          onChange={(e) => setCreateFormData(prev => ({...prev, order_limit: e.target.value}))}
                        />
                      </FormGroup>
                    </LimitsRow>
                    <FormGroup>
                      <FormLabel>{t('admin:plansPage.staffLimit')}</FormLabel>
                      <FormInput
                        type="number"
                        placeholder="-1 for unlimited"
                        value={createFormData.staff_limit}
                        onChange={(e) => setCreateFormData(prev => ({...prev, staff_limit: e.target.value}))}
                      />
                    </FormGroup>
                  </>
                )}
                {createFormData.category === 'basic' && (createFormData.plan_target === 'brand' || createFormData.plan_target === 'foodcourt') && (
                  <LimitsRow>
                    <FormGroup>
                      <FormLabel>{t('admin:plansPage.restaurantLimit')}</FormLabel>
                      <FormInput
                        type="number"
                        placeholder="-1 for unlimited"
                        value={createFormData.restaurant_limit}
                        onChange={(e) => setCreateFormData(prev => ({...prev, restaurant_limit: e.target.value}))}
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>{t('admin:plansPage.managerLimit')}</FormLabel>
                      <FormInput
                        type="number"
                        placeholder="-1 for unlimited"
                        value={createFormData.manager_limit}
                        onChange={(e) => setCreateFormData(prev => ({...prev, manager_limit: e.target.value}))}
                      />
                    </FormGroup>
                  </LimitsRow>
                )}
                {createFormData.category === 'basic' && createFormData.plan_target === 'owner' && (
                  <FormGroup>
                    <FormLabel>{t('admin:plansPage.restaurantLimit')}</FormLabel>
                    <FormInput
                      type="number"
                      placeholder="-1 for unlimited"
                      value={createFormData.restaurant_limit}
                      onChange={(e) => setCreateFormData(prev => ({...prev, restaurant_limit: e.target.value}))}
                    />
                  </FormGroup>
                )}

                {/* Only show module selection for Basic plans */}
                {createFormData.category === 'basic' && (
                  <FormGroup>
                    <FormLabel>{t('admin:plansPage.includedModules')}</FormLabel>

                    {/* Basic Modules */}
                    {availableModules.filter(m => m.category === 'basic' && (m.target_user_type === createFormData.plan_target || m.target_user_type === 'all')).length > 0 && (
                    <>
                      <div style={{marginTop: '16px', marginBottom: '8px', fontSize: '14px', fontWeight: 600, color: '#3B82F6'}}>
                        Basic Modules
                      </div>
                      <CheckboxGroup>
                        {availableModules
                          .filter(m => m.category === 'basic' && (m.target_user_type === createFormData.plan_target || m.target_user_type === 'all'))
                          .map((module) => {
                            const alwaysIncluded = (ALWAYS_INCLUDED_MODULES[createFormData.plan_target] || []).includes(module.module_code);
                            const isChecked = alwaysIncluded || createFormData.included_modules.includes(module.module_code);
                            return (
                              <CheckboxItem key={module.module_code}>
                                <input
                                  type="checkbox"
                                  id={`module-${module.module_code}`}
                                  checked={isChecked}
                                  disabled={alwaysIncluded}
                                  onChange={(e) => {
                                    if (alwaysIncluded) return;
                                    if (e.target.checked) {
                                      setCreateFormData(prev => ({
                                        ...prev,
                                        included_modules: [...prev.included_modules, module.module_code]
                                      }));
                                    } else {
                                      setCreateFormData(prev => ({
                                        ...prev,
                                        included_modules: prev.included_modules.filter(m => m !== module.module_code)
                                      }));
                                    }
                                  }}
                                />
                                <label htmlFor={`module-${module.module_code}`}>
                                  <strong>{module.name}</strong>{alwaysIncluded && <span style={{color: '#635BFF', fontSize: '12px', marginLeft: '6px'}}>{t('admin:plansPage.alwaysIncluded')}</span>}
                                  <br />
                                  <small style={{color: '#6B7280'}}>{module.description}</small>
                                </label>
                              </CheckboxItem>
                            );
                          })}
                      </CheckboxGroup>
                    </>
                  )}

                  {/* Advanced Modules */}
                  {availableModules.filter(m => m.category === 'advanced' && (m.target_user_type === createFormData.plan_target || m.target_user_type === 'all')).length > 0 && (
                    <>
                      <div style={{marginTop: '24px', marginBottom: '8px', fontSize: '14px', fontWeight: 600, color: '#8B5CF6'}}>
                        Advanced Modules
                      </div>
                      <CheckboxGroup>
                        {availableModules
                          .filter(m => m.category === 'advanced' && (m.target_user_type === createFormData.plan_target || m.target_user_type === 'all'))
                          .map((module) => {
                            const isChecked = createFormData.included_modules.includes(module.module_code);
                            return (
                              <CheckboxItem key={module.module_code}>
                                <input
                                  type="checkbox"
                                  id={`module-${module.module_code}`}
                                  checked={isChecked}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setCreateFormData(prev => ({
                                        ...prev,
                                        included_modules: [...prev.included_modules, module.module_code]
                                      }));
                                    } else {
                                      setCreateFormData(prev => ({
                                        ...prev,
                                        included_modules: prev.included_modules.filter(m => m !== module.module_code)
                                      }));
                                    }
                                  }}
                                />
                                <label htmlFor={`module-${module.module_code}`}>
                                  <strong>{module.name}</strong>
                                  <br />
                                  <small style={{color: '#6B7280'}}>{module.description}</small>
                                </label>
                              </CheckboxItem>
                            );
                          })}
                      </CheckboxGroup>
                    </>
                  )}

                  {/* Revenue Modules */}
                  {availableModules.filter(m => m.category === 'revenue' && (m.target_user_type === createFormData.plan_target || m.target_user_type === 'all')).length > 0 && (
                    <>
                      <div style={{marginTop: '24px', marginBottom: '8px', fontSize: '14px', fontWeight: 600, color: '#10B981'}}>
                        Revenue Modules
                      </div>
                      <CheckboxGroup>
                        {availableModules
                          .filter(m => m.category === 'revenue' && (m.target_user_type === createFormData.plan_target || m.target_user_type === 'all'))
                          .map((module) => {
                            const isChecked = createFormData.included_modules.includes(module.module_code);
                            return (
                              <CheckboxItem key={module.module_code}>
                                <input
                                  type="checkbox"
                                  id={`module-${module.module_code}`}
                                  checked={isChecked}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setCreateFormData(prev => ({
                                        ...prev,
                                        included_modules: [...prev.included_modules, module.module_code]
                                      }));
                                    } else {
                                      setCreateFormData(prev => ({
                                        ...prev,
                                        included_modules: prev.included_modules.filter(m => m !== module.module_code)
                                      }));
                                    }
                                  }}
                                />
                                <label htmlFor={`module-${module.module_code}`}>
                                  <strong>{module.name}</strong>
                                  <br />
                                  <small style={{color: '#6B7280'}}>{module.description}</small>
                                </label>
                              </CheckboxItem>
                            );
                          })}
                      </CheckboxGroup>
                    </>
                  )}

                  {/* Operation Modules */}
                  {availableModules.filter(m => m.category === 'operation' && (m.target_user_type === createFormData.plan_target || m.target_user_type === 'all')).length > 0 && (
                    <>
                      <div style={{marginTop: '24px', marginBottom: '8px', fontSize: '14px', fontWeight: 600, color: '#F59E0B'}}>
                        Operation Modules
                      </div>
                      <CheckboxGroup>
                        {availableModules
                          .filter(m => m.category === 'operation' && (m.target_user_type === createFormData.plan_target || m.target_user_type === 'all'))
                          .map((module) => {
                            const isChecked = createFormData.included_modules.includes(module.module_code);
                            return (
                              <CheckboxItem key={module.module_code}>
                                <input
                                  type="checkbox"
                                  id={`module-${module.module_code}`}
                                  checked={isChecked}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setCreateFormData(prev => ({
                                        ...prev,
                                        included_modules: [...prev.included_modules, module.module_code]
                                      }));
                                    } else {
                                      setCreateFormData(prev => ({
                                        ...prev,
                                        included_modules: prev.included_modules.filter(m => m !== module.module_code)
                                      }));
                                    }
                                  }}
                                />
                                <label htmlFor={`module-${module.module_code}`}>
                                  <strong>{module.name}</strong>
                                  <br />
                                  <small style={{color: '#6B7280'}}>{module.description}</small>
                                </label>
                              </CheckboxItem>
                            );
                          })}
                      </CheckboxGroup>
                    </>
                  )}

                  {/* Analytics Modules */}
                  {availableModules.filter(m => m.category === 'analytics' && (m.target_user_type === createFormData.plan_target || m.target_user_type === 'all')).length > 0 && (
                    <>
                      <div style={{marginTop: '24px', marginBottom: '8px', fontSize: '14px', fontWeight: 600, color: '#EF4444'}}>
                        Analytics Modules
                      </div>
                      <CheckboxGroup>
                        {availableModules
                          .filter(m => m.category === 'analytics' && (m.target_user_type === createFormData.plan_target || m.target_user_type === 'all'))
                          .map((module) => {
                            const isChecked = createFormData.included_modules.includes(module.module_code);
                            return (
                              <CheckboxItem key={module.module_code}>
                                <input
                                  type="checkbox"
                                  id={`module-${module.module_code}`}
                                  checked={isChecked}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setCreateFormData(prev => ({
                                        ...prev,
                                        included_modules: [...prev.included_modules, module.module_code]
                                      }));
                                    } else {
                                      setCreateFormData(prev => ({
                                        ...prev,
                                        included_modules: prev.included_modules.filter(m => m !== module.module_code)
                                      }));
                                    }
                                  }}
                                />
                                <label htmlFor={`module-${module.module_code}`}>
                                  <strong>{module.name}</strong>
                                  <br />
                                  <small style={{color: '#6B7280'}}>{module.description}</small>
                                </label>
                              </CheckboxItem>
                            );
                          })}
                      </CheckboxGroup>
                    </>
                  )}
                  </FormGroup>
                )}

                <FormGroup>
                  <FormLabel>{t('admin:plansPage.featuresOnePerLine')}</FormLabel>
                  <FormTextArea
                    placeholder="Enter features, one per line..."
                    rows={6}
                    value={createFormData.features}
                    onChange={(e) => setCreateFormData(prev => ({...prev, features: e.target.value}))}
                  />
                </FormGroup>

                <CheckboxGroup>
                  <CheckboxItem>
                    <input
                      type="checkbox"
                      id="popular"
                      checked={createFormData.is_popular}
                      onChange={(e) => setCreateFormData(prev => ({...prev, is_popular: e.target.checked}))}
                    />
                    <label htmlFor="popular">{t('admin:plansPage.markAsMostPopular')}</label>
                  </CheckboxItem>
                  <CheckboxItem>
                    <input
                      type="checkbox"
                      id="active"
                      checked={createFormData.is_active}
                      onChange={(e) => setCreateFormData(prev => ({...prev, is_active: e.target.checked}))}
                    />
                    <label htmlFor="active">{t('admin:plansPage.setAsActive')}</label>
                  </CheckboxItem>
                </CheckboxGroup>
              
          </CommonModal>
        )}
        
        {/* Edit Plan Modal */}
        {showEditModal && selectedPlan && (
                    <CommonModal isOpen={true} onClose={() => setShowEditModal(false)} title={`Edit Plan: ${selectedPlan.displayName}`} footer={<><Button variant="secondary" onClick={() => setShowEditModal(false)}>{t('admin:plansPage.cancel')}</Button><Button variant="danger" onClick={() => deletePlan(selectedPlan.id)}>{t('admin:plansPage.delete')}</Button><Button variant="primary" onClick={updatePlan}>{t('admin:plansPage.saveChanges')}</Button></>}>

                <FormGroup>
                  <FormLabel>Plan Name *</FormLabel>
                  <FormInput
                    type="text"
                    placeholder="e.g., Basic Plan, Manager Professional"
                    value={editFormData.display_name}
                    onChange={(e) => setEditFormData(prev => ({...prev, display_name: e.target.value}))}
                  />
                  <small style={{color: '#9CA3AF', fontSize: '12px', marginTop: '4px', display: 'block'}}>
                    Internal code: {editFormData.name}
                  </small>
                </FormGroup>
                <FormGroup>
                  <FormLabel>Plan Target *</FormLabel>
                  <FormSelect
                    value={editFormData.plan_target}
                    onChange={(e) => setEditFormData(prev => ({...prev, plan_target: e.target.value as 'restaurant' | 'brand' | 'foodcourt' | 'owner'}))}
                  >
                    <option value="restaurant">{t('admin:plansPage.restaurantPlan')}</option>
                    <option value="brand">{t('admin:plansPage.brandPlan')}</option>
                    <option value="foodcourt">{t('admin:plansPage.foodcourtPlan')}</option>
                    <option value="owner">{t('admin:plansPage.restaurantOwnerPlan')}</option>
                  </FormSelect>
                </FormGroup>
                <FormGroup>
                  <FormLabel>Plan Category *</FormLabel>
                  <FormSelect
                    value={editFormData.category}
                    onChange={(e) => setEditFormData(prev => ({...prev, category: e.target.value as 'basic' | 'custom'}))}
                  >
                    <option value="basic">{t('admin:plansPage.basicSubscription')}</option>
                    <option value="custom">{t('admin:plansPage.customSubscription')}</option>
                  </FormSelect>
                </FormGroup>
                {/* Multi-Currency Pricing */}
                <FormGroup>
                  <FormLabel>{t('admin:plansPage.pricingByCurrency')}</FormLabel>
                  <div style={{ display: 'grid', gap: '12px', marginTop: '8px' }}>
                    {supportedCurrencies.map(code => {
                      const config = currencyConfig[code];
                      return (
                        <div key={code} style={{
                          padding: '12px',
                          border: '1px solid #E6EBF1',
                          borderRadius: '8px',
                          background: '#FAFBFC'
                        }}>
                          <div style={{ fontWeight: 600, marginBottom: '8px', color: '#0A2540' }}>
                            {config?.symbol || code} {code} - {config?.name || code}
                          </div>
                          <PricingRow>
                            <FormGroup style={{ marginBottom: 0 }}>
                              <FormLabel style={{ fontSize: '12px' }}>{t('admin:plansPage.monthly')}</FormLabel>
                              <FormInput
                                type="number"
                                placeholder="0"
                                value={editFormData.currency_prices?.[code]?.monthly || ''}
                                onChange={(e) => setEditFormData(prev => ({
                                  ...prev,
                                  currency_prices: {
                                    ...prev.currency_prices,
                                    [code]: { ...prev.currency_prices?.[code], monthly: e.target.value }
                                  }
                                }))}
                              />
                            </FormGroup>
                            <FormGroup style={{ marginBottom: 0 }}>
                              <FormLabel style={{ fontSize: '12px' }}>{t('admin:plansPage.annual')}</FormLabel>
                              <FormInput
                                type="number"
                                placeholder="0"
                                value={editFormData.currency_prices?.[code]?.annual || ''}
                                onChange={(e) => setEditFormData(prev => ({
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
                      <p style={{ color: '#6B7280', fontSize: '14px' }}>
                        No currencies configured.
                      </p>
                    )}
                  </div>
                </FormGroup>
                {editFormData.category === 'basic' && editFormData.plan_target === 'restaurant' && (
                  <>
                    <LimitsRow>
                      <FormGroup>
                        <FormLabel>{t('admin:plansPage.menuItemLimit')}</FormLabel>
                        <FormInput
                          type="number"
                          placeholder="-1 for unlimited"
                          value={editFormData.menu_item_limit}
                          onChange={(e) => setEditFormData(prev => ({...prev, menu_item_limit: e.target.value}))}
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormLabel>{t('admin:plansPage.orderLimitPerMonth')}</FormLabel>
                        <FormInput
                          type="number"
                          placeholder="-1 for unlimited"
                          value={editFormData.order_limit}
                          onChange={(e) => setEditFormData(prev => ({...prev, order_limit: e.target.value}))}
                        />
                      </FormGroup>
                    </LimitsRow>
                    <FormGroup>
                      <FormLabel>{t('admin:plansPage.staffLimit')}</FormLabel>
                      <FormInput
                        type="number"
                        placeholder="-1 for unlimited"
                        value={editFormData.staff_limit}
                        onChange={(e) => setEditFormData(prev => ({...prev, staff_limit: e.target.value}))}
                      />
                    </FormGroup>
                  </>
                )}
                {editFormData.category === 'basic' && (editFormData.plan_target === 'brand' || editFormData.plan_target === 'foodcourt') && (
                  <LimitsRow>
                    <FormGroup>
                      <FormLabel>{t('admin:plansPage.restaurantLimit')}</FormLabel>
                      <FormInput
                        type="number"
                        placeholder="-1 for unlimited"
                        value={editFormData.restaurant_limit}
                        onChange={(e) => setEditFormData(prev => ({...prev, restaurant_limit: e.target.value}))}
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>{t('admin:plansPage.managerLimit')}</FormLabel>
                      <FormInput
                        type="number"
                        placeholder="-1 for unlimited"
                        value={editFormData.manager_limit}
                        onChange={(e) => setEditFormData(prev => ({...prev, manager_limit: e.target.value}))}
                      />
                    </FormGroup>
                  </LimitsRow>
                )}
                {editFormData.category === 'basic' && editFormData.plan_target === 'owner' && (
                  <FormGroup>
                    <FormLabel>{t('admin:plansPage.restaurantLimit')}</FormLabel>
                    <FormInput
                      type="number"
                      placeholder="-1 for unlimited"
                      value={editFormData.restaurant_limit}
                      onChange={(e) => setEditFormData(prev => ({...prev, restaurant_limit: e.target.value}))}
                    />
                  </FormGroup>
                )}

                {/* Only show module selection for Basic plans */}
                {editFormData.category === 'basic' && (
                  <FormGroup>
                    <FormLabel>{t('admin:plansPage.includedModules')}</FormLabel>

                    {/* Basic Modules */}
                    {availableModules.filter(m => m.category === 'basic' && (m.target_user_type === editFormData.plan_target || m.target_user_type === 'all')).length > 0 && (
                      <>
                        <div style={{marginTop: '16px', marginBottom: '8px', fontSize: '14px', fontWeight: 600, color: '#3B82F6'}}>
                          Basic Modules
                        </div>
                        <CheckboxGroup>
                          {availableModules
                            .filter(m => m.category === 'basic' && (m.target_user_type === editFormData.plan_target || m.target_user_type === 'all'))
                            .map((module) => {
                              const alwaysIncluded = (ALWAYS_INCLUDED_MODULES[editFormData.plan_target] || []).includes(module.module_code);
                              const isChecked = alwaysIncluded || editFormData.included_modules.includes(module.module_code);
                              return (
                                <CheckboxItem key={module.module_code}>
                                  <input
                                    type="checkbox"
                                    id={`edit-module-${module.module_code}`}
                                    checked={isChecked}
                                    disabled={alwaysIncluded}
                                    onChange={(e) => {
                                      if (alwaysIncluded) return;
                                      if (e.target.checked) {
                                        setEditFormData(prev => ({
                                          ...prev,
                                          included_modules: [...prev.included_modules, module.module_code]
                                        }));
                                      } else {
                                        setEditFormData(prev => ({
                                          ...prev,
                                          included_modules: prev.included_modules.filter(m => m !== module.module_code)
                                        }));
                                      }
                                    }}
                                  />
                                  <label htmlFor={`edit-module-${module.module_code}`}>
                                    <strong>{module.name}</strong>{alwaysIncluded && <span style={{color: '#635BFF', fontSize: '12px', marginLeft: '6px'}}>{t('admin:plansPage.alwaysIncluded')}</span>}
                                    <br />
                                    <small style={{color: '#6B7280'}}>{module.description}</small>
                                  </label>
                                </CheckboxItem>
                              );
                            })}
                        </CheckboxGroup>
                      </>
                    )}

                    {/* Advanced Modules */}
                    {availableModules.filter(m => m.category === 'advanced' && (m.target_user_type === editFormData.plan_target || m.target_user_type === 'all')).length > 0 && (
                      <>
                        <div style={{marginTop: '24px', marginBottom: '8px', fontSize: '14px', fontWeight: 600, color: '#8B5CF6'}}>
                          Advanced Modules
                        </div>
                        <CheckboxGroup>
                          {availableModules
                            .filter(m => m.category === 'advanced' && (m.target_user_type === editFormData.plan_target || m.target_user_type === 'all'))
                            .map((module) => {
                              const isChecked = editFormData.included_modules.includes(module.module_code);
                              return (
                                <CheckboxItem key={module.module_code}>
                                  <input
                                    type="checkbox"
                                    id={`edit-module-${module.module_code}`}
                                    checked={isChecked}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setEditFormData(prev => ({
                                          ...prev,
                                          included_modules: [...prev.included_modules, module.module_code]
                                        }));
                                      } else {
                                        setEditFormData(prev => ({
                                          ...prev,
                                          included_modules: prev.included_modules.filter(m => m !== module.module_code)
                                        }));
                                      }
                                    }}
                                  />
                                  <label htmlFor={`edit-module-${module.module_code}`}>
                                    <strong>{module.name}</strong>
                                    <br />
                                    <small style={{color: '#6B7280'}}>{module.description}</small>
                                  </label>
                                </CheckboxItem>
                              );
                            })}
                        </CheckboxGroup>
                      </>
                    )}

                    {/* Revenue Modules */}
                    {availableModules.filter(m => m.category === 'revenue' && (m.target_user_type === editFormData.plan_target || m.target_user_type === 'all')).length > 0 && (
                      <>
                        <div style={{marginTop: '24px', marginBottom: '8px', fontSize: '14px', fontWeight: 600, color: '#10B981'}}>
                          Revenue Modules
                        </div>
                        <CheckboxGroup>
                          {availableModules
                            .filter(m => m.category === 'revenue' && (m.target_user_type === editFormData.plan_target || m.target_user_type === 'all'))
                            .map((module) => {
                              const isChecked = editFormData.included_modules.includes(module.module_code);
                              return (
                                <CheckboxItem key={module.module_code}>
                                  <input
                                    type="checkbox"
                                    id={`edit-module-${module.module_code}`}
                                    checked={isChecked}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setEditFormData(prev => ({
                                          ...prev,
                                          included_modules: [...prev.included_modules, module.module_code]
                                        }));
                                      } else {
                                        setEditFormData(prev => ({
                                          ...prev,
                                          included_modules: prev.included_modules.filter(m => m !== module.module_code)
                                        }));
                                      }
                                    }}
                                  />
                                  <label htmlFor={`edit-module-${module.module_code}`}>
                                    <strong>{module.name}</strong>
                                    <br />
                                    <small style={{color: '#6B7280'}}>{module.description}</small>
                                  </label>
                                </CheckboxItem>
                              );
                            })}
                        </CheckboxGroup>
                      </>
                    )}

                    {/* Operation Modules */}
                    {availableModules.filter(m => m.category === 'operation' && (m.target_user_type === editFormData.plan_target || m.target_user_type === 'all')).length > 0 && (
                      <>
                        <div style={{marginTop: '24px', marginBottom: '8px', fontSize: '14px', fontWeight: 600, color: '#F59E0B'}}>
                          Operation Modules
                        </div>
                        <CheckboxGroup>
                          {availableModules
                            .filter(m => m.category === 'operation' && (m.target_user_type === editFormData.plan_target || m.target_user_type === 'all'))
                            .map((module) => {
                              const isChecked = editFormData.included_modules.includes(module.module_code);
                              return (
                                <CheckboxItem key={module.module_code}>
                                  <input
                                    type="checkbox"
                                    id={`edit-module-${module.module_code}`}
                                    checked={isChecked}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setEditFormData(prev => ({
                                          ...prev,
                                          included_modules: [...prev.included_modules, module.module_code]
                                        }));
                                      } else {
                                        setEditFormData(prev => ({
                                          ...prev,
                                          included_modules: prev.included_modules.filter(m => m !== module.module_code)
                                        }));
                                      }
                                    }}
                                  />
                                  <label htmlFor={`edit-module-${module.module_code}`}>
                                    <strong>{module.name}</strong>
                                    <br />
                                    <small style={{color: '#6B7280'}}>{module.description}</small>
                                  </label>
                                </CheckboxItem>
                              );
                            })}
                        </CheckboxGroup>
                      </>
                    )}

                    {/* Analytics Modules */}
                    {availableModules.filter(m => m.category === 'analytics' && (m.target_user_type === editFormData.plan_target || m.target_user_type === 'all')).length > 0 && (
                      <>
                        <div style={{marginTop: '24px', marginBottom: '8px', fontSize: '14px', fontWeight: 600, color: '#EF4444'}}>
                          Analytics Modules
                        </div>
                        <CheckboxGroup>
                          {availableModules
                            .filter(m => m.category === 'analytics' && (m.target_user_type === editFormData.plan_target || m.target_user_type === 'all'))
                            .map((module) => {
                              const isChecked = editFormData.included_modules.includes(module.module_code);
                              return (
                                <CheckboxItem key={module.module_code}>
                                  <input
                                    type="checkbox"
                                    id={`edit-module-${module.module_code}`}
                                    checked={isChecked}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setEditFormData(prev => ({
                                          ...prev,
                                          included_modules: [...prev.included_modules, module.module_code]
                                        }));
                                      } else {
                                        setEditFormData(prev => ({
                                          ...prev,
                                          included_modules: prev.included_modules.filter(m => m !== module.module_code)
                                        }));
                                      }
                                    }}
                                  />
                                  <label htmlFor={`edit-module-${module.module_code}`}>
                                    <strong>{module.name}</strong>
                                    <br />
                                    <small style={{color: '#6B7280'}}>{module.description}</small>
                                  </label>
                                </CheckboxItem>
                              );
                            })}
                        </CheckboxGroup>
                      </>
                    )}
                  </FormGroup>
                )}

                <FormGroup>
                  <FormLabel>{t('admin:plansPage.featuresOnePerLine')}</FormLabel>
                  <FormTextArea
                    placeholder="Enter features, one per line..."
                    rows={6}
                    value={editFormData.features}
                    onChange={(e) => setEditFormData(prev => ({...prev, features: e.target.value}))}
                  />
                </FormGroup>

                <CheckboxGroup>
                  <CheckboxItem>
                    <input
                      type="checkbox"
                      id="edit-popular"
                      checked={editFormData.is_popular}
                      onChange={(e) => setEditFormData(prev => ({...prev, is_popular: e.target.checked}))}
                    />
                    <label htmlFor="edit-popular">{t('admin:plansPage.markAsMostPopular')}</label>
                  </CheckboxItem>
                  <CheckboxItem>
                    <input
                      type="checkbox"
                      id="edit-active"
                      checked={editFormData.is_active}
                      onChange={(e) => setEditFormData(prev => ({...prev, is_active: e.target.checked}))}
                    />
                    <label htmlFor="edit-active">{t('admin:plansPage.setAsActive')}</label>
                  </CheckboxItem>
                </CheckboxGroup>
              
          </CommonModal>
        )}
        
        {/* View Details Modal */}
        {showDetailsModal && selectedPlan && (
                    <CommonModal isOpen={true} onClose={() => setShowDetailsModal(false)} title={`Plan Details: ${selectedPlan.displayName}`} footer={<><Button variant="secondary" onClick={() => setShowDetailsModal(false)}>{t('admin:plansPage.close')}</Button><Button variant="primary" onClick={() => { setShowDetailsModal(false); handleEditPlan(selectedPlan); }}>{t('admin:plansPage.editPlan')}</Button></>}>

                <DetailSection>
                  <DetailRow>
                    <DetailLabel>{t('admin:plansPage.planId')}</DetailLabel>
                    <DetailValue>{selectedPlan.id}</DetailValue>
                  </DetailRow>
                  <DetailRow>
                    <DetailLabel>{t('admin:plansPage.internalName')}</DetailLabel>
                    <DetailValue>{selectedPlan.name}</DetailValue>
                  </DetailRow>
                  <DetailRow>
                    <DetailLabel>{t('admin:plansPage.displayName')}</DetailLabel>
                    <DetailValue>{selectedPlan.displayName}</DetailValue>
                  </DetailRow>
                  <DetailRow>
                    <DetailLabel>{t('admin:plansPage.status')}</DetailLabel>
                    <StatusBadge isActive={selectedPlan.isActive}>
                      {selectedPlan.isActive ? 'Active' : 'Inactive'}
                    </StatusBadge>
                  </DetailRow>
                  <DetailRow>
                    <DetailLabel>{t('admin:plansPage.popularPlan')}</DetailLabel>
                    <DetailValue>{selectedPlan.isPopular ? 'Yes' : 'No'}</DetailValue>
                  </DetailRow>
                </DetailSection>

                <DetailSection>
                  <h4>{t('admin:plansPage.pricing')}</h4>
                  <DetailRow>
                    <DetailLabel>{t('admin:plansPage.monthlyPrice')}</DetailLabel>
                    <DetailValue>{formatCurrency(selectedPlan.monthlyPrice)}</DetailValue>
                  </DetailRow>
                  <DetailRow>
                    <DetailLabel>{t('admin:plansPage.annualPrice')}</DetailLabel>
                    <DetailValue>{formatCurrency(selectedPlan.annualPrice)}</DetailValue>
                  </DetailRow>
                  <DetailRow>
                    <DetailLabel>{t('admin:plansPage.annualDiscount')}</DetailLabel>
                    <DetailValue>
                      {Math.round(((selectedPlan.monthlyPrice * 12 - selectedPlan.annualPrice) / (selectedPlan.monthlyPrice * 12)) * 100)}%
                    </DetailValue>
                  </DetailRow>
                </DetailSection>

                <DetailSection>
                  <h4>{t('admin:plansPage.limits')}</h4>
                  {selectedPlan.planTarget === 'restaurant' && (
                    <>
                      <DetailRow>
                        <DetailLabel>{t('admin:plansPage.menuItemLimit')}</DetailLabel>
                        <DetailValue>{formatLimit(selectedPlan.menuItemLimit)}</DetailValue>
                      </DetailRow>
                      <DetailRow>
                        <DetailLabel>{t('admin:plansPage.monthlyOrderLimit')}</DetailLabel>
                        <DetailValue>{formatLimit(selectedPlan.orderLimit)}</DetailValue>
                      </DetailRow>
                      <DetailRow>
                        <DetailLabel>{t('admin:plansPage.staffLimit')}</DetailLabel>
                        <DetailValue>{formatLimit(selectedPlan.staffLimit)}</DetailValue>
                      </DetailRow>
                    </>
                  )}
                  {(selectedPlan.planTarget === 'brand' || selectedPlan.planTarget === 'foodcourt') && (
                    <>
                      <DetailRow>
                        <DetailLabel>{t('admin:plansPage.restaurantLimit')}</DetailLabel>
                        <DetailValue>{formatLimit(selectedPlan.restaurantLimit)}</DetailValue>
                      </DetailRow>
                      <DetailRow>
                        <DetailLabel>{t('admin:plansPage.managerLimit')}</DetailLabel>
                        <DetailValue>{formatLimit(selectedPlan.managerLimit)}</DetailValue>
                      </DetailRow>
                    </>
                  )}
                  {selectedPlan.planTarget === 'owner' && (
                    <DetailRow>
                      <DetailLabel>{t('admin:plansPage.restaurantLimit')}</DetailLabel>
                      <DetailValue>{formatLimit(selectedPlan.restaurantLimit)}</DetailValue>
                    </DetailRow>
                  )}
                </DetailSection>

                <DetailSection>
                  <h4>{t('admin:plansPage.statistics')}</h4>
                  <DetailRow>
                    <DetailLabel>{t('admin:plansPage.currentSubscriptions')}</DetailLabel>
                    <DetailValue>{selectedPlan.subscriptionCount}</DetailValue>
                  </DetailRow>
                  <DetailRow>
                    <DetailLabel>{t('admin:plansPage.monthlyRevenue')}</DetailLabel>
                    <DetailValue>{formatCurrency(selectedPlan.monthlyPrice * selectedPlan.subscriptionCount)}</DetailValue>
                  </DetailRow>
                  <DetailRow>
                    <DetailLabel>{t('admin:plansPage.createdDate')}</DetailLabel>
                    <DetailValue>{selectedPlan.createdAt}</DetailValue>
                  </DetailRow>
                </DetailSection>

                <DetailSection>
                  <h4>{t('admin:plansPage.features')}</h4>
                  <FeaturesList>
                    {(Array.isArray(selectedPlan.features) ? selectedPlan.features : []).map((feature, index) => (
                      <FeatureItem key={index}>{feature}</FeatureItem>
                    ))}
                  </FeaturesList>
                </DetailSection>
              
          </CommonModal>
        )}

        {/* Plan Prices Modal */}
        {showPlanPricesModal && selectedPlan && (
                    <CommonModal isOpen={true} onClose={() => setShowPlanPricesModal(false)} title={`Set Prices for ${selectedPlan.displayName}`} footer={<><Button variant="secondary" onClick={() => setShowPlanPricesModal(false)}>{t('admin:plansPage.cancel')}</Button><Button variant="primary" onClick={savePlanPrices}>{t('admin:plansPage.savePrices')}</Button></>}>

                <p style={{ marginBottom: '20px', color: '#6B7280', fontSize: '14px' }}>
                  Configure pricing for each supported currency.
                </p>
                <div style={{ display: 'grid', gap: '16px' }}>
                  {supportedCurrencies.map(code => {
                    const config = currencyConfig[code];
                    return (
                      <div key={code} style={{
                        padding: '16px',
                        border: '1px solid #E6EBF1',
                        borderRadius: '8px',
                        background: '#FAFBFC'
                      }}>
                        <div style={{
                          fontWeight: 600,
                          marginBottom: '12px',
                          color: '#0A2540',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}>
                          <span style={{
                            padding: '4px 8px',
                            background: '#635BFF',
                            color: 'white',
                            borderRadius: '4px',
                            fontSize: '12px'
                          }}>{config?.symbol || code}</span>
                          {config?.name || code} ({code})
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                          <div>
                            <label style={{ fontSize: '13px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                              Monthly Price
                            </label>
                            <input
                              type="number"
                              value={editingPlanPrices[code]?.monthly || ''}
                              onChange={(e) => setEditingPlanPrices({
                                ...editingPlanPrices,
                                [code]: { ...editingPlanPrices[code], monthly: e.target.value }
                              })}
                              style={{
                                width: '100%',
                                padding: '10px 12px',
                                border: '1px solid #E6EBF1',
                                borderRadius: '6px',
                                fontSize: '14px',
                                boxSizing: 'border-box' as const
                              }}
                              placeholder="0.00"
                            />
                          </div>
                          <div>
                            <label style={{ fontSize: '13px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                              Annual Price
                            </label>
                            <input
                              type="number"
                              value={editingPlanPrices[code]?.annual || ''}
                              onChange={(e) => setEditingPlanPrices({
                                ...editingPlanPrices,
                                [code]: { ...editingPlanPrices[code], annual: e.target.value }
                              })}
                              style={{
                                width: '100%',
                                padding: '10px 12px',
                                border: '1px solid #E6EBF1',
                                borderRadius: '6px',
                                fontSize: '14px',
                                boxSizing: 'border-box' as const
                              }}
                              placeholder="0.00"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {supportedCurrencies.length === 0 && (
                    <p style={{ textAlign: 'center', color: '#6B7280', padding: '20px' }}>
                      No currencies configured. Please add currencies first.
                    </p>
                  )}
                </div>
              
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

export default PlansPage;