import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
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
  Button,
  Table,
  TableHeader,
  TableRow,
  MobileLabel,
  MobileValue,
  MobileGrid,
  ActionButtons,
  EmptyState,
  TabContainer,
  Tab
} from '../UI';
import { FilterBar, SearchInput, FilterSelect } from '../Common/FilterComponents';
import { useAuth } from '../../contexts/AuthContext';
import { Modal, ModalButton, FormGroup as UIFormGroup, FormLabel, FormInput } from '../UI/Modal';
import { useBrandCurrency } from '../../hooks/useBrandCurrency';
import { formatCurrency } from '../../utils/currency';
import { fetchAPI } from '../../utils/api';
import GeneralStockCategoriesTab from '../../pages/RecipeManagement/GeneralStockCategoriesTab';
import ProductIngredientCategoriesTab from '../../pages/BrandProductRecipe/ProductIngredientCategoriesTab';
import ImageUploadDropzone from '../common/ImageUploadDropzone';

// Props interface for shared component
export interface InventoryManagerProps {
  mode: 'restaurant' | 'brand';
  restaurantId?: number;  // Required for restaurant mode
}

interface IngredientStock {
  id: number;
  name: string;
  code: string | null;
  image_url: string | null;
  unit: string;
  unit_cost: number;
  category: string;
  current_stock: number;
  min_stock: number;
  min_order: number;
  last_actual_stock: number;
  last_stock_take_at: string | null;
  avg_daily_usage: number;
  lead_time_days: number;
  safety_stock_percent: number;
  manual_daily_usage: number | null;
  prediction_confidence: 'high' | 'medium' | 'low' | 'none';
  stock_status: 'normal' | 'low_stock' | 'out_of_stock';
  supplier_id: number | null;
  supplier_name: string | null;
  supplier?: {
    id: number;
    name: string;
    code: string | null;
    contact_name: string | null;
    phone: string | null;
  } | null;
}

interface StockAlert {
  id: number;
  ingredient_id: number;
  alert_type: 'low_stock' | 'out_of_stock';
  current_stock: number;
  min_stock: number;
  ingredient: {
    id: number;
    name: string;
    unit: string;
    unit_cost: number;
  };
}

interface ReorderSuggestion {
  ingredient: {
    id: number;
    name: string;
    unit: string;
    unit_cost: number;
    category: string;
  };
  current_stock: number;
  min_stock: number;
  avg_daily_usage: number;
  lead_time_days: number;
  reorder_point: number;
  par_level: number;
  suggested_qty: number;
  estimated_cost: number;
  urgency: 'critical' | 'high' | 'normal';
  prediction_confidence: 'high' | 'medium' | 'low' | 'none';
}

interface Summary {
  total_items: number;
  low_stock_count: number;
  out_of_stock_count: number;
  monthly_loss: number;
  unresolved_alerts: number;
}

interface ExpiringItem {
  id: number;
  batch_number: string | null;
  ingredient_id: number;
  ingredient_name: string;
  remaining_quantity: number;
  unit: string;
  expiry_date: string;
  days_until_expiry: number;
  urgency: 'expired' | 'critical' | 'warning' | 'normal';
}

interface GeneralStockItem {
  id: number;
  name: string;
  code: string | null;
  image_url: string | null;
  category: string;
  current_stock: number;
  min_stock: number;
  min_order: number;
  stock_unit: string;
  unit: string;
  unit_cost: number;
  supplier_id: number | null;
  supplier_name: string | null;
  last_stock_take_at: string | null;
  stock_status: 'normal' | 'low_stock' | 'out_of_stock';
}

// Styled Components - 최소한의 페이지 전용 스타일만 정의
const InfoBox = styled.div`
  background: #F0F4FF;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 12px 16px;
  color: #635BFF;
  font-size: 14px;
  margin-bottom: 24px;
  line-height: 1.5;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 24px 0 16px 0;
`;

const StatusBadge = styled.span<{ status: string }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;

  ${props => {
    switch (props.status) {
      case 'out_of_stock':
        return 'background: #FEE2E2; color: #DC2626;';
      case 'low_stock':
        return 'background: #FEF3C7; color: #D97706;';
      default:
        return 'background: #ECFDF5; color: #059669;';
    }
  }}
`;

const AlertCard = styled.div<{ type: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: ${props => props.type === 'out_of_stock' ? '#FEF2F2' : '#FFFBEB'};
  border: 1px solid ${props => props.type === 'out_of_stock' ? '#FECACA' : '#FED7AA'};
  border-radius: 8px;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const AlertInfo = styled.div`
  flex: 1;
`;

const AlertTitle = styled.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`;

const AlertDetail = styled.div`
  font-size: 13px;
  color: #6B7280;
`;

const StockItemImage = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 6px;
  overflow: hidden;
  background: #F3F4F6;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const StockItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StockItemDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const StockItemCode = styled.span`
  font-size: 11px;
  color: #9CA3AF;
  font-family: monospace;
`;

const UrgencyBadge = styled.span<{ level: string }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;

  ${props => {
    switch (props.level) {
      case 'critical':
        return 'background: #DC2626; color: white;';
      case 'high':
        return 'background: #F59E0B; color: white;';
      default:
        return 'background: #10B981; color: white;';
    }
  }}
`;

const ExpiryAlertCard = styled.div<{ urgency: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: ${props => {
    switch (props.urgency) {
      case 'expired': return '#FEF2F2';
      case 'critical': return '#FEF2F2';
      case 'warning': return '#FFFBEB';
      default: return '#F0F9FF';
    }
  }};
  border: 1px solid ${props => {
    switch (props.urgency) {
      case 'expired': return '#FECACA';
      case 'critical': return '#FECACA';
      case 'warning': return '#FED7AA';
      default: return '#BAE6FD';
    }
  }};
  border-radius: 8px;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ExpiryBadge = styled.span<{ urgency: string }>`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;

  ${props => {
    switch (props.urgency) {
      case 'expired':
        return 'background: #7F1D1D; color: white;';
      case 'critical':
        return 'background: #DC2626; color: white;';
      case 'warning':
        return 'background: #F59E0B; color: white;';
      default:
        return 'background: #059669; color: white;';
    }
  }}
`;

const ConfidenceBadge = styled.span<{ level: string }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;

  ${props => {
    switch (props.level) {
      case 'high':
        return 'background: #ECFDF5; color: #059669;';
      case 'medium':
        return 'background: #FEF3C7; color: #D97706;';
      case 'low':
        return 'background: #FEE2E2; color: #DC2626;';
      default:
        return 'background: #F3F4F6; color: #6B7280;';
    }
  }}
`;

const SettingsButton = styled.button`
  background: #F3F4F6;
  border: 1px solid #E5E7EB;
  padding: 6px 12px;
  cursor: pointer;
  color: #6B7280;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.15s ease;

  &:hover {
    background: #E5E7EB;
    color: #0A2540;
    border-color: #D1D5DB;
  }
`;

const QuickActions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  flex-wrap: wrap;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
`;

const IngredientInfo = styled.div``;

const IngredientName = styled.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`;

const IngredientMeta = styled.div`
  font-size: 13px;
  color: #6B7280;
`;

// 반응형 테이블 헤더
const InventoryTableHeader = styled(TableHeader)`
  @media (max-width: 1200px) {
    & > span:nth-child(5),
    & > span:nth-child(6) {
      display: none;
    }
  }

  @media (max-width: 1024px) {
    & > span:nth-child(4) {
      display: none;
    }
  }
`;

// 반응형 테이블 행
const InventoryTableRow = styled(TableRow)`
  @media (max-width: 1200px) {
    & > div:nth-child(5),
    & > div:nth-child(6) {
      display: none;
    }
  }

  @media (max-width: 1024px) {
    & > div:nth-child(4) {
      display: none;
    }
  }
`;

// Inline editable stock value
const EditableStock = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background 0.15s;

  &:hover {
    background: #F3F4F6;
  }
`;

const InlineStockInput = styled.input`
  width: 80px;
  padding: 4px 8px;
  border: 1px solid #635BFF;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  outline: none;

  &:focus {
    box-shadow: 0 0 0 2px rgba(99, 91, 255, 0.2);
  }
`;

const OrderInput = styled.input`
  width: 70px;
  padding: 4px 8px;
  border: 1px solid #E5E7EB;
  border-radius: 4px;
  font-size: 13px;
  text-align: right;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`;

const OrderButton = styled.button`
  padding: 6px 12px;
  background: #F0FDF4;
  color: #16A34A;
  border: 1px solid #16A34A;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: #DCFCE7;
  }
`;

const SearchableSelectContainer = styled.div`
  position: relative;
  z-index: 10;
`;

const SearchableSelectInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #635BFF;
    box-shadow: 0 0 0 2px rgba(99, 91, 255, 0.1);
  }
`;

const SearchableSelectDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 200px;
  overflow-y: auto;
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  margin-top: 4px;
`;

const SearchableSelectOption = styled.div<{ selected?: boolean }>`
  padding: 10px 12px;
  cursor: pointer;
  background: ${props => props.selected ? '#F0F4FF' : 'white'};
  color: ${props => props.selected ? '#635BFF' : '#0A2540'};

  &:hover {
    background: #F3F4F6;
  }
`;

const DeleteButton = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 4px;
  border: 1px solid #FEE2E2;
  background: #FEF2F2;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s;
  color: #DC2626;

  &:hover {
    background: #FEE2E2;
    border-color: #FECACA;
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;

const EditButton = styled.button`
  padding: 6px 12px;
  background: #F3F4F6;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  color: #6B7280;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: #E5E7EB;
    color: #0A2540;
    border-color: #D1D5DB;
  }
`;

const InventoryManager: React.FC<InventoryManagerProps> = ({ mode, restaurantId: propRestaurantId }) => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const { defaultCurrency } = useBrandCurrency();
  const [selectedCurrency, setSelectedCurrency] = useState<string>('RM');

  // Determine the ID to use based on mode
  const restaurantId = mode === 'restaurant' ? propRestaurantId : undefined;
  const brandId = mode === 'brand' ? user?.brand_id : undefined;

  // Get tab from URL, default to 'dashboard'
  const activeTab = (searchParams.get('tab') as 'dashboard' | 'list' | 'history' | 'categories') || 'dashboard';

  const setActiveTab = (tab: 'dashboard' | 'list' | 'history' | 'categories') => {
    setSearchParams({ tab });
  };

  // General Stock Categories state (only for restaurant mode)
  const [generalStockCategoriesCount, setGeneralStockCategoriesCount] = useState(0);
  const [generalStockCategoryRefreshKey, setGeneralStockCategoryRefreshKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [inventory, setInventory] = useState<IngredientStock[]>([]);
  const [alerts, setAlerts] = useState<StockAlert[]>([]);
  const [suggestions, setSuggestions] = useState<ReorderSuggestion[]>([]);
  const [expiringItems, setExpiringItems] = useState<ExpiringItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // General Stock inventory
  const [generalStockInventory, setGeneralStockInventory] = useState<GeneralStockItem[]>([]);
  const [selectedGeneralStock, setSelectedGeneralStock] = useState<GeneralStockItem | null>(null);
  const [showGeneralStockReceiveModal, setShowGeneralStockReceiveModal] = useState(false);
  const [generalStockQuantity, setGeneralStockQuantity] = useState('');
  const [generalStockNotes, setGeneralStockNotes] = useState('');

  // Stock list type filter (ingredients or general_stock)
  const [stockTypeFilter, setStockTypeFilter] = useState<'all' | 'ingredients' | 'general_stock'>('all');

  // Modals
  const [showReceiveModal, setShowReceiveModal] = useState(false);
  const [showWasteModal, setShowWasteModal] = useState(false);
  const [showInitialStockModal, setShowInitialStockModal] = useState(false);
  const [showIngredientAdjustModal, setShowIngredientAdjustModal] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState<IngredientStock | null>(null);
  const [quantity, setQuantity] = useState('');
  const [notes, setNotes] = useState('');
  // Batch info for receive modal
  const [batchNumber, setBatchNumber] = useState('');
  const [manufactureDate, setManufactureDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  // Initial Stock Setup
  const [initialStockItems, setInitialStockItems] = useState<{[key: number]: { quantity: string; min_stock: string }}>({});
  const [needsInitialSetup, setNeedsInitialSetup] = useState(false);
  const [savingInitialStock, setSavingInitialStock] = useState(false);

  // Settings Modal
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [settingsIngredient, setSettingsIngredient] = useState<IngredientStock | null>(null);
  const [settingsForm, setSettingsForm] = useState({
    lead_time_days: '',
    safety_stock_percent: '',
    manual_daily_usage: '',
    min_stock: '',
    min_order: '',
    new_stock: '',
    adjustment_reason: ''
  });
  const [savingSettings, setSavingSettings] = useState(false);

  // Add General Stock Modal
  const [showAddGeneralStockModal, setShowAddGeneralStockModal] = useState(false);
  const [generalStockForm, setGeneralStockForm] = useState({
    name: '',
    code: '',
    image_url: '',
    stock_unit: 'piece',
    unit_cost: '',
    category: '',
    current_stock: '',
    min_stock: '',
    min_order: '',
    supplier_id: ''
  });
  const [savingGeneralStock, setSavingGeneralStock] = useState(false);
  const [suppliers, setSuppliers] = useState<{id: number; name: string}[]>([]);
  const [generalStockCategories, setGeneralStockCategories] = useState<{id: number; name: string; emoji?: string}[]>([]);
  const [unitSearchTerm, setUnitSearchTerm] = useState('');
  const [showUnitDropdown, setShowUnitDropdown] = useState(false);

  // Edit General Stock Modal
  const [showEditGeneralStockModal, setShowEditGeneralStockModal] = useState(false);
  const [editingGeneralStock, setEditingGeneralStock] = useState<GeneralStockItem | null>(null);

  // Delete confirmation modal
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{type: 'ingredient' | 'general_stock'; id: number; name: string} | null>(null);

  // Order modal
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderItem, setOrderItem] = useState<UnifiedStockItem | null>(null);
  const [orderQuantity, setOrderQuantity] = useState('');

  // Unit options - comprehensive list
  const unitOptions = [
    { value: 'piece', label: 'Piece' },
    { value: 'box', label: 'Box' },
    { value: 'pack', label: 'Pack' },
    { value: 'roll', label: 'Roll' },
    { value: 'bag', label: 'Bag' },
    { value: 'set', label: 'Set' },
    { value: 'bundle', label: 'Bundle' },
    { value: 'case', label: 'Case' },
    { value: 'carton', label: 'Carton' },
    { value: 'pallet', label: 'Pallet' },
    { value: 'bottle', label: 'Bottle' },
    { value: 'can', label: 'Can' },
    { value: 'jar', label: 'Jar' },
    { value: 'tube', label: 'Tube' },
    { value: 'container', label: 'Container' },
    { value: 'kg', label: 'Kilogram (kg)' },
    { value: 'g', label: 'Gram (g)' },
    { value: 'L', label: 'Liter (L)' },
    { value: 'ml', label: 'Milliliter (ml)' },
    { value: 'm', label: 'Meter (m)' },
    { value: 'cm', label: 'Centimeter (cm)' },
    { value: 'pair', label: 'Pair' },
    { value: 'dozen', label: 'Dozen' },
    { value: 'sheet', label: 'Sheet' },
    { value: 'ream', label: 'Ream' }
  ];

  const filteredUnitOptions = unitOptions.filter(opt =>
    opt.label.toLowerCase().includes(unitSearchTerm.toLowerCase()) ||
    opt.value.toLowerCase().includes(unitSearchTerm.toLowerCase())
  );

  // Inline editing for stock
  const [editingStockId, setEditingStockId] = useState<number | null>(null);
  const [editingStockValue, setEditingStockValue] = useState('');
  const [editingStockType, setEditingStockType] = useState<'ingredient' | 'general_stock'>('ingredient');

  // Reorder quantities
  const [orderQuantities, setOrderQuantities] = useState<{[key: number]: string}>({});

  // URL 파라미터 우선, 없으면 user의 restaurant_id 사용
  const restaurantId = urlRestaurantId ? parseInt(urlRestaurantId, 10) : user?.restaurant_id;

  useEffect(() => {
    if (defaultCurrency) {
      setSelectedCurrency(defaultCurrency);
    }
  }, [defaultCurrency]);

  // Helper to get auth token
  const getToken = useCallback(() => localStorage.getItem('auth_token'), []);

  // Helper for authenticated fetch
  const authFetch = useCallback(async (url: string, options: RequestInit = {}) => {
    const token = getToken();
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers
      }
    });
    return response.json();
  }, [getToken]);

  const fetchData = useCallback(async () => {
    if (!restaurantId) return;

    try {
      setLoading(true);

      const [summaryRes, inventoryRes, alertsRes, suggestionsRes, expiringRes] = await Promise.all([
        authFetch(`/api/restaurants/${restaurantId}/inventory/summary`),
        authFetch(`/api/restaurants/${restaurantId}/inventory`),
        authFetch(`/api/restaurants/${restaurantId}/inventory/alerts?resolved=false`),
        authFetch(`/api/restaurants/${restaurantId}/inventory/reorder-suggestions`),
        authFetch(`/api/restaurants/${restaurantId}/inventory/expiring?days=14`)
      ]);

      if (summaryRes.success) setSummary(summaryRes.data);
      if (inventoryRes.success) setInventory(inventoryRes.data);
      if (alertsRes.success) setAlerts(alertsRes.data);
      if (suggestionsRes.success) setSuggestions(suggestionsRes.data);
      if (expiringRes.success) setExpiringItems(expiringRes.data);

      // General stock은 별도로 가져오기 (실패해도 재료 표시에 영향 없음)
      try {
        const generalStockRes = await authFetch(`/api/restaurants/${restaurantId}/inventory/general-stock`);
        if (generalStockRes.success) setGeneralStockInventory(generalStockRes.data || []);
      } catch {
        setGeneralStockInventory([]);
      }

      // 공급업체 목록 가져오기
      try {
        const suppliersRes = await authFetch(`/api/restaurants/${restaurantId}/suppliers`);
        if (suppliersRes.success) setSuppliers(suppliersRes.data || []);
      } catch {
        setSuppliers([]);
      }

      // General stock 카테고리 가져오기
      try {
        const categoriesRes = await authFetch(`/api/restaurants/${restaurantId}/general-stock-categories`);
        if (categoriesRes.success) {
          const allCategories = [
            ...(categoriesRes.data.brand_categories || []),
            ...(categoriesRes.data.own_categories || [])
          ];
          setGeneralStockCategories(allCategories);
        }
      } catch {
        setGeneralStockCategories([]);
      }
    } catch (error) {
      console.error('Failed to fetch inventory data:', error);
    } finally {
      setLoading(false);
    }
  }, [restaurantId, authFetch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Check if initial stock setup is needed
  useEffect(() => {
    if (inventory.length > 0) {
      const hasAnyStock = inventory.some(item => item.current_stock > 0 || item.last_stock_take_at);
      setNeedsInitialSetup(!hasAnyStock);
    }
  }, [inventory]);

  // Initialize initial stock items when modal opens
  const openInitialStockModal = () => {
    const items: {[key: number]: { quantity: string; min_stock: string }} = {};
    inventory.forEach(item => {
      items[item.id] = {
        quantity: item.current_stock.toString(),
        min_stock: item.min_stock.toString()
      };
    });
    setInitialStockItems(items);
    setShowInitialStockModal(true);
  };

  // Handle initial stock save
  const handleSaveInitialStock = async () => {
    const itemsToSave = Object.entries(initialStockItems)
      .filter(([_, values]) => parseFloat(values.quantity) > 0)
      .map(([id, values]) => ({
        ingredient_id: parseInt(id),
        quantity: parseFloat(values.quantity),
        min_stock: parseFloat(values.min_stock) || 0
      }));

    if (itemsToSave.length === 0) {
      return;
    }

    try {
      setSavingInitialStock(true);
      const response = await authFetch(`/api/restaurants/${restaurantId}/inventory/initial`, {
        method: 'POST',
        body: JSON.stringify({ items: itemsToSave })
      });

      if (response.success) {
        setShowInitialStockModal(false);
        setNeedsInitialSetup(false);
        fetchData();
      }
    } catch (error) {
      console.error('Failed to save initial stock:', error);
    } finally {
      setSavingInitialStock(false);
    }
  };

  // Update initial stock item
  const updateInitialStockItem = (id: number, field: 'quantity' | 'min_stock', value: string) => {
    setInitialStockItems(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value
      }
    }));
  };

  // Open settings modal
  const openSettingsModal = (ingredient: IngredientStock) => {
    setSettingsIngredient(ingredient);
    setSettingsForm({
      lead_time_days: (ingredient.lead_time_days || 1).toString(),
      safety_stock_percent: (ingredient.safety_stock_percent || 20).toString(),
      manual_daily_usage: ingredient.manual_daily_usage?.toString() || '',
      min_stock: (ingredient.min_stock || 0).toString(),
      min_order: ((ingredient as any).min_order || 0).toString(),
      new_stock: '',
      adjustment_reason: ''
    });
    setShowSettingsModal(true);
  };

  // Save ingredient settings
  const handleSaveSettings = async () => {
    if (!settingsIngredient) return;

    try {
      setSavingSettings(true);
      const response = await authFetch(`/api/restaurants/${restaurantId}/inventory/${settingsIngredient.id}/settings`, {
        method: 'PUT',
        body: JSON.stringify({
          lead_time_days: parseInt(settingsForm.lead_time_days) || 1,
          safety_stock_percent: parseFloat(settingsForm.safety_stock_percent) || 20,
          manual_daily_usage: settingsForm.manual_daily_usage ? parseFloat(settingsForm.manual_daily_usage) : null,
          min_stock: parseFloat(settingsForm.min_stock) || 0,
          min_order: parseFloat(settingsForm.min_order) || 0
        })
      });

      if (response.success) {
        setShowSettingsModal(false);
        fetchData();
      }
    } catch (error) {
      console.error('Failed to save settings:', error);
    } finally {
      setSavingSettings(false);
    }
  };

  // Get confidence label
  const getConfidenceLabel = (confidence: string) => {
    switch (confidence) {
      case 'high': return 'High';
      case 'medium': return 'Medium';
      case 'low': return 'Low';
      default: return 'No Data';
    }
  };

  const handleReceive = async () => {
    if (!selectedIngredient || !quantity) return;

    try {
      const response = await authFetch(`/api/restaurants/${restaurantId}/inventory/receive`, {
        method: 'POST',
        body: JSON.stringify({
          ingredient_id: selectedIngredient.id,
          quantity: parseFloat(quantity),
          notes,
          batch_number: batchNumber || null,
          manufacture_date: manufactureDate || null,
          expiry_date: expiryDate || null
        })
      });

      if (response.success) {
        setShowReceiveModal(false);
        setSelectedIngredient(null);
        setQuantity('');
        setNotes('');
        setBatchNumber('');
        setManufactureDate('');
        setExpiryDate('');
        fetchData();
      }
    } catch (error) {
      console.error('Failed to receive stock:', error);
    }
  };

  const handleWaste = async () => {
    if (!selectedIngredient || !quantity) return;

    try {
      const response = await authFetch(`/api/restaurants/${restaurantId}/inventory/waste`, {
        method: 'POST',
        body: JSON.stringify({
          ingredient_id: selectedIngredient.id,
          quantity: parseFloat(quantity),
          notes
        })
      });

      if (response.success) {
        setShowWasteModal(false);
        setSelectedIngredient(null);
        setQuantity('');
        setNotes('');
        fetchData();
      }
    } catch (error) {
      console.error('Failed to record waste:', error);
    }
  };

  const handleResolveAlert = async (alertId: number) => {
    try {
      const response = await authFetch(`/api/restaurants/${restaurantId}/inventory/alerts/${alertId}/resolve`, {
        method: 'PUT'
      });

      if (response.success) {
        fetchData();
      }
    } catch (error) {
      console.error('Failed to resolve alert:', error);
    }
  };

  const openReceiveModal = (ingredient: IngredientStock) => {
    setSelectedIngredient(ingredient);
    setQuantity('');
    setNotes('');
    setBatchNumber('');
    setManufactureDate('');
    setExpiryDate('');
    setShowReceiveModal(true);
  };

  const openWasteModal = (ingredient: IngredientStock) => {
    setSelectedIngredient(ingredient);
    setQuantity('');
    setNotes('');
    setShowWasteModal(true);
  };

  // Inline stock editing handlers
  const startEditingStock = (id: number, currentValue: number, type: 'ingredient' | 'general_stock') => {
    setEditingStockId(id);
    setEditingStockValue(currentValue.toString());
    setEditingStockType(type);
  };

  const cancelEditingStock = () => {
    setEditingStockId(null);
    setEditingStockValue('');
  };

  const saveInlineStock = async (id: number) => {
    const newValue = parseFloat(editingStockValue);
    if (isNaN(newValue) || newValue < 0) {
      cancelEditingStock();
      return;
    }

    try {
      const endpoint = editingStockType === 'ingredient'
        ? `/api/restaurants/${restaurantId}/inventory/adjust`
        : `/api/restaurants/${restaurantId}/inventory/general-stock/${id}/adjust`;

      const body = { new_quantity: newValue, reason: 'Stock adjustment' };
      if (editingStockType === 'ingredient') {
        (body as any).ingredient_id = id;
      }

      const response = await authFetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(body)
      });

      if (response.success) {
        // Update local state instead of full refresh to preserve scroll position
        if (editingStockType === 'ingredient') {
          setInventory(prev => prev.map(item =>
            item.id === id ? { ...item, current_stock: newValue } : item
          ));
        } else {
          setGeneralStockInventory(prev => prev.map(item =>
            item.id === id ? { ...item, current_stock: newValue } : item
          ));
        }
      }
    } catch (error) {
      console.error('Failed to adjust stock:', error);
    } finally {
      cancelEditingStock();
    }
  };

  const handleStockKeyDown = (e: React.KeyboardEvent, id: number) => {
    if (e.key === 'Enter') {
      saveInlineStock(id);
    } else if (e.key === 'Escape') {
      cancelEditingStock();
    }
  };

  // Order button handler
  const handleOrderClick = (item: UnifiedStockItem) => {
    setOrderItem(item);
    setOrderQuantity(item.min_order ? String(item.min_order) : '');
    setShowOrderModal(true);
  };

  const handleSendOrder = () => {
    if (!orderItem || !orderQuantity) return;
    // TODO: Implement actual order sending to supplier
    alert(`Order sent: ${orderQuantity} ${orderItem.unit} of ${orderItem.name}`);
    setShowOrderModal(false);
    setOrderItem(null);
    setOrderQuantity('');
  };

  // Helper type for unified stock list (moved here for handleOrderClick)
  type UnifiedStockItem = {
    id: number;
    name: string;
    code?: string | null;
    image_url?: string | null;
    category: string;
    current_stock: number;
    min_stock: number;
    min_order?: number;
    unit: string;
    unit_cost: number;
    supplier_name: string | null;
    stock_status: 'normal' | 'low_stock' | 'out_of_stock';
    last_stock_take_at: string | null;
    item_type: 'ingredient' | 'general_stock';
    avg_daily_usage?: number;
    prediction_confidence?: string;
  };

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.stock_status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // 통합 재고 리스트 (Ingredients + General Stock)
  const unifiedStockList: UnifiedStockItem[] = [
    // Ingredients
    ...(stockTypeFilter === 'all' || stockTypeFilter === 'ingredients'
      ? filteredInventory.map(item => ({
          id: item.id,
          name: item.name,
          code: item.code || null,
          image_url: item.image_url || null,
          category: item.category,
          current_stock: item.current_stock,
          min_stock: item.min_stock,
          min_order: item.min_order || 0,
          unit: item.unit,
          unit_cost: item.unit_cost,
          supplier_name: item.supplier_name,
          stock_status: item.stock_status,
          last_stock_take_at: item.last_stock_take_at,
          item_type: 'ingredient' as const,
          avg_daily_usage: parseFloat(String(item.avg_daily_usage)) || 0,
          prediction_confidence: item.prediction_confidence
        }))
      : []),
    // General Stock
    ...(stockTypeFilter === 'all' || stockTypeFilter === 'general_stock'
      ? generalStockInventory
          .filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === 'all' || item.stock_status === statusFilter;
            return matchesSearch && matchesStatus;
          })
          .map(item => ({
            id: item.id,
            name: item.name,
            code: item.code || null,
            image_url: item.image_url || null,
            category: item.category,
            current_stock: item.current_stock,
            min_stock: item.min_stock,
            min_order: item.min_order || 0,
            unit: item.stock_unit || item.unit,
            unit_cost: item.unit_cost,
            supplier_name: item.supplier_name,
            stock_status: item.stock_status,
            last_stock_take_at: item.last_stock_take_at,
            item_type: 'general_stock' as const
          }))
      : [])
  ];

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'out_of_stock': return 'Out of Stock';
      case 'low_stock': return 'Low Stock';
      default: return 'Normal';
    }
  };

  if (!restaurantId) {
    return (
      <MainLayout>
        <Container>
          <EmptyState>
            <p>Restaurant not found. Please log in with a restaurant account.</p>
          </EmptyState>
        </Container>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Container>
        <Header>
          <Title>Inventory</Title>
        </Header>

        <Content>
          <TabContainer>
            <Tab active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')}>
              Dashboard
            </Tab>
            <Tab active={activeTab === 'list'} onClick={() => setActiveTab('list')}>
              Stock List
            </Tab>
            <Tab active={activeTab === 'history'} onClick={() => setActiveTab('history')}>
              History
            </Tab>
            <Tab active={activeTab === 'categories'} onClick={() => setActiveTab('categories')}>
              Categories
            </Tab>
          </TabContainer>

          {loading ? (
            <EmptyState>Loading...</EmptyState>
          ) : activeTab === 'dashboard' ? (
            <>
              <StatsGrid>
                <StatCard color="#059669">
                  <StatValue>{summary?.total_items || 0}</StatValue>
                  <StatLabel>Total Ingredients</StatLabel>
                  <StatDescription>managed items</StatDescription>
                </StatCard>
                <StatCard color="#D97706">
                  <StatValue>{summary?.low_stock_count || 0}</StatValue>
                  <StatLabel>Low Stock</StatLabel>
                  <StatDescription>need attention</StatDescription>
                </StatCard>
                <StatCard color="#DC2626">
                  <StatValue>{summary?.out_of_stock_count || 0}</StatValue>
                  <StatLabel>Out of Stock</StatLabel>
                  <StatDescription>urgent</StatDescription>
                </StatCard>
                <StatCard color="#7C3AED">
                  <StatValue>{formatCurrency(summary?.monthly_loss || 0, selectedCurrency)}</StatValue>
                  <StatLabel>Monthly Loss</StatLabel>
                  <StatDescription>this month</StatDescription>
                </StatCard>
                <StatCard color="#EA580C">
                  <StatValue>{expiringItems.filter(i => i.urgency === 'expired' || i.urgency === 'critical').length}</StatValue>
                  <StatLabel>Expiring Soon</StatLabel>
                  <StatDescription>within 3 days</StatDescription>
                </StatCard>
              </StatsGrid>

              {alerts.length > 0 && (
                <>
                  <SectionTitle>Stock Alerts</SectionTitle>
                  <div>
                    {alerts.slice(0, 5).map(alert => (
                      <AlertCard key={alert.id} type={alert.alert_type}>
                        <AlertInfo>
                          <AlertTitle>{alert.ingredient.name}</AlertTitle>
                          <AlertDetail>
                            Current: {alert.current_stock} {alert.ingredient.unit} / Min: {alert.min_stock} {alert.ingredient.unit}
                          </AlertDetail>
                        </AlertInfo>
                        <ActionButtons>
                          <Button
                            variant="primary"
                            onClick={() => {
                              const ing = inventory.find(i => i.id === alert.ingredient_id);
                              if (ing) openReceiveModal(ing);
                            }}
                            style={{ padding: '8px 16px', fontSize: '13px' }}
                          >
                            Receive
                          </Button>
                          <Button
                            variant="secondary"
                            onClick={() => handleResolveAlert(alert.id)}
                            style={{ padding: '8px 16px', fontSize: '13px' }}
                          >
                            Dismiss
                          </Button>
                        </ActionButtons>
                      </AlertCard>
                    ))}
                  </div>
                </>
              )}

              {expiringItems.length > 0 && (
                <>
                  <SectionTitle>Expiring Items</SectionTitle>
                  <div>
                    {expiringItems.slice(0, 5).map(item => (
                      <ExpiryAlertCard key={item.id} urgency={item.urgency}>
                        <AlertInfo>
                          <AlertTitle>
                            {item.ingredient_name}
                            {item.batch_number && (
                              <span style={{ fontSize: '12px', color: '#6B7280', marginLeft: '8px' }}>
                                Batch: {item.batch_number}
                              </span>
                            )}
                          </AlertTitle>
                          <AlertDetail>
                            {item.remaining_quantity} {item.unit} remaining • Expires: {new Date(item.expiry_date).toLocaleDateString()}
                          </AlertDetail>
                        </AlertInfo>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <ExpiryBadge urgency={item.urgency}>
                            {item.urgency === 'expired' ? 'EXPIRED' :
                             item.urgency === 'critical' ? `${item.days_until_expiry}d LEFT` :
                             item.urgency === 'warning' ? `${item.days_until_expiry} DAYS` :
                             `${item.days_until_expiry} days`}
                          </ExpiryBadge>
                          <Button
                            variant="danger"
                            onClick={() => {
                              const ing = inventory.find(i => i.id === item.ingredient_id);
                              if (ing) openWasteModal(ing);
                            }}
                            style={{ padding: '6px 12px', fontSize: '12px' }}
                          >
                            Dispose
                          </Button>
                        </div>
                      </ExpiryAlertCard>
                    ))}
                  </div>
                </>
              )}

              {suggestions.length > 0 && (
                <>
                  <SectionTitle>Reorder Suggestions</SectionTitle>
                  <InfoBox>
                    Calculated based on average daily usage over the last 30 days and supplier lead time.
                  </InfoBox>
                  <Table>
                    <TableHeader columns="2fr 1fr 1fr 1fr 1fr 100px 150px">
                      <span>Ingredient</span>
                      <span>Current Stock</span>
                      <span>Daily Usage</span>
                      <span>Suggested Qty</span>
                      <span>Est. Cost</span>
                      <span>Urgency</span>
                      <span>Order</span>
                    </TableHeader>
                    {suggestions.slice(0, 10).map(s => (
                      <TableRow key={s.ingredient.id} columns="2fr 1fr 1fr 1fr 1fr 100px 150px">
                        <div>{s.ingredient.name}</div>
                        <div>{s.current_stock} {s.ingredient.unit}</div>
                        <div>{(parseFloat(String(s.avg_daily_usage)) || 0).toFixed(2)} {s.ingredient.unit}/day</div>
                        <div style={{ fontWeight: 600 }}>{s.suggested_qty} {s.ingredient.unit}</div>
                        <div>{formatCurrency(s.estimated_cost, selectedCurrency)}</div>
                        <div>
                          <UrgencyBadge level={s.urgency}>
                            {s.urgency.toUpperCase()}
                          </UrgencyBadge>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <OrderInput
                            type="number"
                            min="0"
                            step="1"
                            value={orderQuantities[s.ingredient.id] || s.suggested_qty}
                            onChange={(e) => setOrderQuantities(prev => ({
                              ...prev,
                              [s.ingredient.id]: e.target.value
                            }))}
                            placeholder={String(s.suggested_qty)}
                          />
                          <OrderButton onClick={() => {
                            // Find the ingredient from inventory to get full details
                            const ing = inventory.find(i => i.id === s.ingredient.id);
                            if (ing) {
                              handleOrderClick({
                                id: ing.id,
                                name: ing.name,
                                code: ing.code,
                                image_url: ing.image_url,
                                category: ing.category,
                                current_stock: s.current_stock,
                                min_stock: s.min_stock,
                                min_order: ing.min_order || 0,
                                unit: ing.unit,
                                unit_cost: ing.unit_cost,
                                supplier_name: ing.supplier_name,
                                stock_status: ing.stock_status,
                                last_stock_take_at: ing.last_stock_take_at,
                                item_type: 'ingredient',
                                avg_daily_usage: s.avg_daily_usage,
                                prediction_confidence: ing.prediction_confidence
                              });
                            }
                          }}>
                            Order
                          </OrderButton>
                        </div>
                      </TableRow>
                    ))}
                  </Table>
                </>
              )}

              <QuickActions>
                <Button
                  variant="primary"
                  onClick={() => {
                    if (inventory.length === 0) {
                      window.location.href = `/restaurant/${restaurantId}/recipe-management?tab=ingredients`;
                    } else {
                      setActiveTab('list');
                    }
                  }}
                >
                  + Receive Stock
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    if (inventory.length === 0) {
                      window.location.href = `/restaurant/${restaurantId}/recipe-management?tab=ingredients`;
                    } else {
                      setActiveTab('list');
                    }
                  }}
                >
                  + Record Waste
                </Button>
                <Button variant="secondary" onClick={() => setActiveTab('history')}>
                  View All Transactions
                </Button>
              </QuickActions>
            </>
          ) : activeTab === 'list' ? (
            <>
              <FilterBar>
                <FilterSelect
                  value={stockTypeFilter}
                  onChange={(e) => setStockTypeFilter(e.target.value as 'all' | 'ingredients' | 'general_stock')}
                  style={{ minWidth: '140px' }}
                >
                  <option value="all">All Items</option>
                  <option value="ingredients">Ingredients</option>
                  <option value="general_stock">General Stock</option>
                </FilterSelect>
                <SearchInput
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FilterSelect
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="normal">Normal</option>
                  <option value="low_stock">Low Stock</option>
                  <option value="out_of_stock">Out of Stock</option>
                </FilterSelect>
                <Button
                  variant="primary"
                  onClick={() => setShowAddGeneralStockModal(true)}
                  style={{ marginLeft: 'auto' }}
                >
                  + Add General Stock
                </Button>
              </FilterBar>

              {/* Show General Stock Section */}
              {(stockTypeFilter === 'all' || stockTypeFilter === 'general_stock') && generalStockInventory.length > 0 && (
                <>
                  {stockTypeFilter === 'all' && <SectionTitle>General Stock ({generalStockInventory.filter(item => {
                    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
                    const matchesStatus = statusFilter === 'all' || item.stock_status === statusFilter;
                    return matchesSearch && matchesStatus;
                  }).length})</SectionTitle>}
                  <Table style={{ marginBottom: '24px' }}>
                    <InventoryTableHeader columns="2.5fr 1fr 1fr 1fr 1fr 1fr 150px 120px">
                      <span>Item</span>
                      <span>Status</span>
                      <span>Current Stock</span>
                      <span>Min Stock</span>
                      <span>Unit Cost</span>
                      <span>Supplier</span>
                      <span>Order</span>
                      <span>Actions</span>
                    </InventoryTableHeader>
                    {generalStockInventory
                      .filter(item => {
                        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
                        const matchesStatus = statusFilter === 'all' || item.stock_status === statusFilter;
                        return matchesSearch && matchesStatus;
                      })
                      .map(item => (
                      <InventoryTableRow key={`general-stock-${item.id}`} columns="2.5fr 1fr 1fr 1fr 1fr 1fr 150px 120px">
                        <MobileGrid>
                          <MobileValue>
                            <MobileLabel>Item</MobileLabel>
                            <StockItemInfo>
                              <StockItemImage>
                                {item.image_url ? (
                                  <img src={item.image_url} alt={item.name} />
                                ) : (
                                  <span style={{ fontSize: '16px', color: '#9CA3AF' }}>📦</span>
                                )}
                              </StockItemImage>
                              <StockItemDetails>
                                <IngredientName>{item.name}</IngredientName>
                                {item.code && <StockItemCode>{item.code}</StockItemCode>}
                                <IngredientMeta>{item.category}</IngredientMeta>
                              </StockItemDetails>
                            </StockItemInfo>
                          </MobileValue>
                          <MobileValue>
                            <MobileLabel>Status</MobileLabel>
                            <StatusBadge status={item.stock_status}>
                              {getStatusLabel(item.stock_status)}
                            </StatusBadge>
                          </MobileValue>
                          <MobileValue>
                            <MobileLabel>Current Stock</MobileLabel>
                            {editingStockId === item.id && editingStockType === 'general_stock' ? (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <InlineStockInput
                                  type="number"
                                  step="0.01"
                                  value={editingStockValue}
                                  onChange={(e) => setEditingStockValue(e.target.value)}
                                  onKeyDown={(e) => handleStockKeyDown(e, item.id)}
                                  onBlur={() => saveInlineStock(item.id)}
                                  autoFocus
                                />
                                <span style={{ fontSize: '13px', color: '#6B7280' }}>{item.stock_unit}</span>
                              </div>
                            ) : (
                              <EditableStock onClick={() => startEditingStock(item.id, item.current_stock, 'general_stock')}>
                                <span style={{ fontWeight: 600, color: '#0A2540' }}>{item.current_stock}</span>
                                <span style={{ fontSize: '13px', color: '#6B7280' }}>{item.stock_unit}</span>
                              </EditableStock>
                            )}
                          </MobileValue>
                          <MobileValue>
                            <MobileLabel>Min Stock</MobileLabel>
                            <div style={{ color: '#6B7280' }}>
                              {item.min_stock} {item.stock_unit}
                            </div>
                          </MobileValue>
                          <MobileValue>
                            <MobileLabel>Unit Cost</MobileLabel>
                            <div style={{ color: '#0A2540' }}>
                              {formatCurrency(item.unit_cost, selectedCurrency)}
                            </div>
                          </MobileValue>
                          <MobileValue>
                            <MobileLabel>Supplier</MobileLabel>
                            <div style={{ color: item.supplier_name ? '#0A2540' : '#9CA3AF', fontSize: '13px' }}>
                              {item.supplier_name || '-'}
                            </div>
                          </MobileValue>
                        </MobileGrid>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <OrderInput
                            type="number"
                            min="0"
                            step="1"
                            value={orderQuantities[`gs_${item.id}`] || ''}
                            onChange={(e) => setOrderQuantities(prev => ({
                              ...prev,
                              [`gs_${item.id}`]: e.target.value
                            }))}
                            placeholder={String(item.min_order || 1)}
                          />
                          <OrderButton onClick={() => {
                            const qty = orderQuantities[`gs_${item.id}`] || String(item.min_order || 1);
                            if (qty && parseFloat(qty) > 0) {
                              handleOrderClick({
                                id: item.id,
                                name: item.name,
                                code: item.code,
                                image_url: item.image_url,
                                category: item.category,
                                current_stock: item.current_stock,
                                min_stock: item.min_stock,
                                min_order: item.min_order || 0,
                                unit: item.stock_unit || item.unit,
                                unit_cost: item.unit_cost,
                                supplier_name: item.supplier_name,
                                stock_status: item.stock_status,
                                last_stock_take_at: item.last_stock_take_at,
                                item_type: 'general_stock'
                              });
                              setOrderQuantity(qty);
                            }
                          }}>
                            Order
                          </OrderButton>
                        </div>
                        <ActionButtons>
                          <Button
                            variant="primary"
                            onClick={() => {
                              setSelectedGeneralStock(item);
                              setGeneralStockQuantity('');
                              setGeneralStockNotes('');
                              setShowGeneralStockReceiveModal(true);
                            }}
                            style={{ padding: '6px 12px', fontSize: '13px' }}
                          >
                            Receive
                          </Button>
                          <EditButton onClick={() => {
                            setEditingGeneralStock(item);
                            setGeneralStockForm({
                              name: item.name,
                              code: item.code || '',
                              image_url: item.image_url || '',
                              stock_unit: item.stock_unit || item.unit,
                              unit_cost: item.unit_cost.toString(),
                              category: item.category,
                              current_stock: item.current_stock.toString(),
                              min_stock: item.min_stock.toString(),
                              min_order: (item.min_order || 0).toString(),
                              supplier_id: item.supplier_id?.toString() || ''
                            });
                            setShowEditGeneralStockModal(true);
                          }}>
                            Edit
                          </EditButton>
                          <DeleteButton onClick={() => {
                            setDeleteTarget({ type: 'general_stock', id: item.id, name: item.name });
                            setShowDeleteConfirmModal(true);
                          }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                          </DeleteButton>
                        </ActionButtons>
                      </InventoryTableRow>
                    ))}
                  </Table>
                </>
              )}

              {/* Show Ingredients Section */}
              {(stockTypeFilter === 'all' || stockTypeFilter === 'ingredients') && (
                <>
                  {stockTypeFilter === 'all' && <SectionTitle>Ingredients ({filteredInventory.length})</SectionTitle>}
                  {filteredInventory.length === 0 ? (
                    <EmptyState>
                      <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                        {inventory.length === 0 ? 'No ingredients found' : 'No matching ingredients'}
                      </div>
                      <div style={{ fontSize: '14px', marginBottom: '16px' }}>
                        {inventory.length === 0
                          ? 'Add ingredients in the Ingredients page first.'
                          : 'Try adjusting your search or filter.'}
                      </div>
                      {inventory.length === 0 && (
                        <Button
                          variant="primary"
                          onClick={() => window.location.href = `/restaurant/${restaurantId}/recipe-management?tab=ingredients`}
                        >
                          Go to Ingredients
                        </Button>
                      )}
                    </EmptyState>
                  ) : (
                <Table>
                  <InventoryTableHeader columns="2.5fr 1fr 1fr 1fr 1fr 1fr 1fr 150px 120px">
                    <span>Ingredient</span>
                    <span>Status</span>
                    <span>Current Stock</span>
                    <span>Min / Prediction</span>
                    <span>Unit Cost</span>
                    <span>Supplier</span>
                    <span>Last Stock Take</span>
                    <span>Order</span>
                    <span>Actions</span>
                  </InventoryTableHeader>
                  {filteredInventory.map(item => (
                    <InventoryTableRow key={item.id} columns="2.5fr 1fr 1fr 1fr 1fr 1fr 1fr 150px 120px">
                      <MobileGrid>
                        <MobileValue>
                          <MobileLabel>Ingredient</MobileLabel>
                          <StockItemInfo>
                            <StockItemImage>
                              {item.image_url ? (
                                <img src={item.image_url} alt={item.name} />
                              ) : (
                                <span style={{ fontSize: '16px', color: '#9CA3AF' }}>🥗</span>
                              )}
                            </StockItemImage>
                            <StockItemDetails>
                              <IngredientName>{item.name}</IngredientName>
                              {item.code && <StockItemCode>{item.code}</StockItemCode>}
                              <IngredientMeta>{item.category} • {(parseFloat(String(item.avg_daily_usage)) || 0).toFixed(2)} {item.unit}/day</IngredientMeta>
                            </StockItemDetails>
                          </StockItemInfo>
                        </MobileValue>
                        <MobileValue>
                          <MobileLabel>Status</MobileLabel>
                          <StatusBadge status={item.stock_status}>
                            {getStatusLabel(item.stock_status)}
                          </StatusBadge>
                        </MobileValue>
                        <MobileValue>
                          <MobileLabel>Current Stock</MobileLabel>
                          {editingStockId === item.id && editingStockType === 'ingredient' ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <InlineStockInput
                                type="number"
                                step="0.01"
                                value={editingStockValue}
                                onChange={(e) => setEditingStockValue(e.target.value)}
                                onKeyDown={(e) => handleStockKeyDown(e, item.id)}
                                onBlur={() => saveInlineStock(item.id)}
                                autoFocus
                              />
                              <span style={{ fontSize: '13px', color: '#6B7280' }}>{item.unit}</span>
                            </div>
                          ) : (
                            <EditableStock onClick={() => startEditingStock(item.id, item.current_stock, 'ingredient')}>
                              <span style={{ fontWeight: 600, color: '#0A2540' }}>{item.current_stock}</span>
                              <span style={{ fontSize: '13px', color: '#6B7280' }}>{item.unit}</span>
                            </EditableStock>
                          )}
                        </MobileValue>
                        <MobileValue>
                          <MobileLabel>Min / Prediction</MobileLabel>
                          <div style={{ color: '#6B7280', marginBottom: '4px' }}>
                            Min: {item.min_stock} {item.unit}
                          </div>
                          <ConfidenceBadge level={item.prediction_confidence || 'none'}>
                            {getConfidenceLabel(item.prediction_confidence || 'none')}
                          </ConfidenceBadge>
                        </MobileValue>
                        <MobileValue>
                          <MobileLabel>Unit Cost</MobileLabel>
                          <div style={{ color: '#0A2540' }}>
                            {formatCurrency(item.unit_cost, selectedCurrency)}
                          </div>
                        </MobileValue>
                        <MobileValue>
                          <MobileLabel>Supplier</MobileLabel>
                          <div style={{ color: item.supplier_name ? '#0A2540' : '#9CA3AF', fontSize: '13px' }}>
                            {item.supplier_name || '-'}
                          </div>
                        </MobileValue>
                        <MobileValue>
                          <MobileLabel>Last Stock Take</MobileLabel>
                          <div style={{ color: '#6B7280' }}>
                            {formatDate(item.last_stock_take_at)}
                          </div>
                        </MobileValue>
                      </MobileGrid>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <OrderInput
                          type="number"
                          min="0"
                          step="1"
                          value={orderQuantities[item.id] || ''}
                          onChange={(e) => setOrderQuantities(prev => ({
                            ...prev,
                            [item.id]: e.target.value
                          }))}
                          placeholder={String(item.min_order || 1)}
                        />
                        <OrderButton onClick={() => {
                          const qty = orderQuantities[item.id] || String(item.min_order || 1);
                          if (qty && parseFloat(qty) > 0) {
                            handleOrderClick({
                              id: item.id,
                              name: item.name,
                              code: item.code,
                              image_url: item.image_url,
                              category: item.category,
                              current_stock: item.current_stock,
                              min_stock: item.min_stock,
                              min_order: item.min_order || 0,
                              unit: item.unit,
                              unit_cost: item.unit_cost,
                              supplier_name: item.supplier_name,
                              stock_status: item.stock_status,
                              last_stock_take_at: item.last_stock_take_at,
                              item_type: 'ingredient',
                              avg_daily_usage: item.avg_daily_usage,
                              prediction_confidence: item.prediction_confidence
                            });
                            setOrderQuantity(qty);
                          }
                        }}>
                          Order
                        </OrderButton>
                      </div>
                      <ActionButtons>
                        <Button
                          variant="primary"
                          onClick={() => openReceiveModal(item)}
                          style={{ padding: '6px 12px', fontSize: '13px' }}
                        >
                          Receive
                        </Button>
                        <SettingsButton onClick={() => openSettingsModal(item)}>
                          Settings
                        </SettingsButton>
                        <DeleteButton onClick={() => {
                          setDeleteTarget({ type: 'ingredient', id: item.id, name: item.name });
                          setShowDeleteConfirmModal(true);
                        }}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                          </svg>
                        </DeleteButton>
                      </ActionButtons>
                    </InventoryTableRow>
                  ))}
                </Table>
              )}
            </>
          )}
            </>
          ) : activeTab === 'categories' ? (
            <GeneralStockCategoriesTab
              brandId={null}
              restaurantId={restaurantId ? Number(restaurantId) : null}
              onCountChange={setGeneralStockCategoriesCount}
              onCategoryChange={() => setGeneralStockCategoryRefreshKey(k => k + 1)}
            />
          ) : (
            <TransactionHistory restaurantId={restaurantId} currency={selectedCurrency} />
          )}
        </Content>
      </Container>

      {/* Receive Stock Modal */}
      <Modal
        isOpen={showReceiveModal}
        onClose={() => setShowReceiveModal(false)}
        title="Receive Stock"
        size="medium"
      >
        {selectedIngredient && (
          <>
            <InfoBox>
              Enter the quantity received and batch details for inventory tracking.
            </InfoBox>
            <UIFormGroup>
              <FormLabel>Ingredient</FormLabel>
              <FormInput type="text" value={selectedIngredient.name} disabled />
            </UIFormGroup>
            <UIFormGroup>
              <FormLabel>Current Stock</FormLabel>
              <FormInput type="text" value={`${selectedIngredient.current_stock} ${selectedIngredient.unit}`} disabled />
            </UIFormGroup>
            <UIFormGroup>
              <FormLabel>Quantity Received ({selectedIngredient.unit}) *</FormLabel>
              <FormInput
                type="number"
                step="0.01"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter quantity"
                required
              />
            </UIFormGroup>

            <div style={{ borderTop: '1px solid #E5E7EB', margin: '16px 0', paddingTop: '16px' }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#0A2540', marginBottom: '12px' }}>
                Batch Details (Optional)
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <UIFormGroup style={{ marginBottom: 0 }}>
                  <FormLabel>Batch/Lot Number</FormLabel>
                  <FormInput
                    type="text"
                    value={batchNumber}
                    onChange={(e) => setBatchNumber(e.target.value)}
                    placeholder="e.g., LOT-2024-001"
                  />
                </UIFormGroup>
                <UIFormGroup style={{ marginBottom: 0 }}>
                  <FormLabel>Manufacture Date</FormLabel>
                  <FormInput
                    type="date"
                    value={manufactureDate}
                    onChange={(e) => setManufactureDate(e.target.value)}
                  />
                </UIFormGroup>
              </div>
              <UIFormGroup style={{ marginTop: '12px' }}>
                <FormLabel>Expiry Date</FormLabel>
                <FormInput
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
                <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
                  Items with earlier expiry dates will be used first (FIFO)
                </div>
              </UIFormGroup>
            </div>

            <UIFormGroup>
              <FormLabel>Notes (Optional)</FormLabel>
              <FormInput
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g., PO #12345"
              />
            </UIFormGroup>
            <ButtonGroup>
              <ModalButton variant="secondary" onClick={() => setShowReceiveModal(false)}>
                Cancel
              </ModalButton>
              <ModalButton variant="primary" onClick={handleReceive}>
                Confirm Receive
              </ModalButton>
            </ButtonGroup>
          </>
        )}
      </Modal>

      {/* Waste Modal */}
      <Modal
        isOpen={showWasteModal}
        onClose={() => setShowWasteModal(false)}
        title="Record Waste"
        size="small"
      >
        {selectedIngredient && (
          <>
            <InfoBox>
              Record wasted or disposed stock. This will be deducted from current stock.
            </InfoBox>
            <UIFormGroup>
              <FormLabel>Ingredient</FormLabel>
              <FormInput type="text" value={selectedIngredient.name} disabled />
            </UIFormGroup>
            <UIFormGroup>
              <FormLabel>Current Stock</FormLabel>
              <FormInput type="text" value={`${selectedIngredient.current_stock} ${selectedIngredient.unit}`} disabled />
            </UIFormGroup>
            <UIFormGroup>
              <FormLabel>Waste Quantity ({selectedIngredient.unit}) *</FormLabel>
              <FormInput
                type="number"
                step="0.01"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter quantity"
                required
              />
            </UIFormGroup>
            <UIFormGroup>
              <FormLabel>Reason (Optional)</FormLabel>
              <FormInput
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g., Expired, Damaged"
              />
            </UIFormGroup>
            <ButtonGroup>
              <ModalButton variant="secondary" onClick={() => setShowWasteModal(false)}>
                Cancel
              </ModalButton>
              <ModalButton variant="primary" onClick={handleWaste}>
                Confirm Waste
              </ModalButton>
            </ButtonGroup>
          </>
        )}
      </Modal>

      {/* Initial Stock Modal */}
      <Modal
        isOpen={showInitialStockModal}
        onClose={() => setShowInitialStockModal(false)}
        title="Set Initial Stock"
        size="large"
      >
        <InfoBox>
          Enter your current stock quantities and minimum stock levels. Items with 0 quantity will be skipped.
        </InfoBox>
        <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          {/* Group by category */}
          {Object.entries(
            inventory.reduce((acc, item) => {
              const category = item.category || 'Other';
              if (!acc[category]) acc[category] = [];
              acc[category].push(item);
              return acc;
            }, {} as {[key: string]: IngredientStock[]})
          ).map(([category, items]) => (
            <div key={category} style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#0A2540', marginBottom: '12px', textTransform: 'capitalize' }}>
                {category.replace('_', ' ')}
              </h3>
              <Table>
                <TableHeader columns="2fr 1fr 1fr">
                  <span>Ingredient</span>
                  <span>Current Qty</span>
                  <span>Min Stock</span>
                </TableHeader>
                {items.map(item => (
                  <TableRow key={item.id} columns="2fr 1fr 1fr" style={{ padding: '12px 16px' }}>
                    <div>
                      <div style={{ fontWeight: 600, color: '#0A2540' }}>{item.name}</div>
                      <div style={{ fontSize: '13px', color: '#6B7280' }}>{item.unit}</div>
                    </div>
                    <div>
                      <FormInput
                        type="number"
                        step="0.01"
                        min="0"
                        value={initialStockItems[item.id]?.quantity || ''}
                        onChange={(e) => updateInitialStockItem(item.id, 'quantity', e.target.value)}
                        placeholder="0"
                        style={{ width: '100px' }}
                      />
                    </div>
                    <div>
                      <FormInput
                        type="number"
                        step="0.01"
                        min="0"
                        value={initialStockItems[item.id]?.min_stock || ''}
                        onChange={(e) => updateInitialStockItem(item.id, 'min_stock', e.target.value)}
                        placeholder="0"
                        style={{ width: '100px' }}
                      />
                    </div>
                  </TableRow>
                ))}
              </Table>
            </div>
          ))}
        </div>
        <ButtonGroup>
          <ModalButton variant="secondary" onClick={() => setShowInitialStockModal(false)}>
            Cancel
          </ModalButton>
          <ModalButton
            variant="primary"
            onClick={handleSaveInitialStock}
            disabled={savingInitialStock}
          >
            {savingInitialStock ? 'Saving...' : 'Save Initial Stock'}
          </ModalButton>
        </ButtonGroup>
      </Modal>

      {/* General Stock Receive Modal */}
      <Modal
        isOpen={showGeneralStockReceiveModal}
        onClose={() => setShowGeneralStockReceiveModal(false)}
        title={`Receive Stock: ${selectedGeneralStock?.name || ''}`}
        size="small"
      >
        {selectedGeneralStock && (
          <>
            <div style={{ marginBottom: '16px', padding: '12px', background: '#F9FAFB', borderRadius: '8px' }}>
              <div style={{ fontSize: '13px', color: '#6B7280' }}>Current Stock</div>
              <div style={{ fontSize: '18px', fontWeight: 600, color: '#0A2540' }}>
                {selectedGeneralStock.current_stock} {selectedGeneralStock.stock_unit}
              </div>
            </div>
            <UIFormGroup>
              <FormLabel>Quantity to Add *</FormLabel>
              <FormInput
                type="number"
                min="0"
                step="0.01"
                value={generalStockQuantity}
                onChange={(e) => setGeneralStockQuantity(e.target.value)}
                placeholder="Enter quantity"
              />
            </UIFormGroup>
            <UIFormGroup>
              <FormLabel>Notes (Optional)</FormLabel>
              <FormInput
                value={generalStockNotes}
                onChange={(e) => setGeneralStockNotes(e.target.value)}
                placeholder="Enter notes"
              />
            </UIFormGroup>
            <ButtonGroup>
              <ModalButton variant="secondary" onClick={() => setShowGeneralStockReceiveModal(false)}>
                Cancel
              </ModalButton>
              <ModalButton
                variant="primary"
                onClick={async () => {
                  if (!generalStockQuantity || parseFloat(generalStockQuantity) <= 0) return;
                  try {
                    const response = await authFetch(
                      `/api/restaurants/${restaurantId}/inventory/general-stock/${selectedGeneralStock.id}/receive`,
                      {
                        method: 'POST',
                        body: JSON.stringify({
                          quantity: parseFloat(generalStockQuantity),
                          notes: generalStockNotes
                        })
                      }
                    );
                    if (response.success) {
                      setShowGeneralStockReceiveModal(false);
                      fetchData();
                    }
                  } catch (error) {
                    console.error('Failed to receive general stock:', error);
                  }
                }}
                disabled={!generalStockQuantity || parseFloat(generalStockQuantity) <= 0}
              >
                Receive
              </ModalButton>
            </ButtonGroup>
          </>
        )}
      </Modal>

      {/* Order Modal */}
      <Modal
        isOpen={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        title={`Order: ${orderItem?.name || ''}`}
        size="small"
      >
        {orderItem && (
          <>
            <div style={{ marginBottom: '16px', padding: '12px', background: '#F9FAFB', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div>
                  <div style={{ fontSize: '13px', color: '#6B7280' }}>Current Stock</div>
                  <div style={{ fontSize: '18px', fontWeight: 600, color: '#0A2540' }}>
                    {orderItem.current_stock} {orderItem.unit}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '13px', color: '#6B7280' }}>Min Stock</div>
                  <div style={{ fontSize: '18px', fontWeight: 600, color: '#6B7280' }}>
                    {orderItem.min_stock} {orderItem.unit}
                  </div>
                </div>
              </div>
              {orderItem.min_order && orderItem.min_order > 0 && (
                <div style={{ fontSize: '12px', color: '#16A34A', marginTop: '8px' }}>
                  Minimum order quantity: {orderItem.min_order} {orderItem.unit}
                </div>
              )}
              {orderItem.supplier_name && (
                <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
                  Supplier: {orderItem.supplier_name}
                </div>
              )}
            </div>
            <UIFormGroup>
              <FormLabel>Order Quantity ({orderItem.unit}) *</FormLabel>
              <FormInput
                type="number"
                min="0"
                step="0.01"
                value={orderQuantity}
                onChange={(e) => setOrderQuantity(e.target.value)}
                placeholder={orderItem.min_order ? `Min: ${orderItem.min_order}` : 'Enter quantity'}
              />
            </UIFormGroup>
            {orderQuantity && parseFloat(orderQuantity) > 0 && (
              <div style={{ padding: '12px', background: '#F0FDF4', borderRadius: '8px', marginBottom: '16px' }}>
                <div style={{ fontSize: '13px', color: '#6B7280' }}>Estimated Cost</div>
                <div style={{ fontSize: '18px', fontWeight: 600, color: '#16A34A' }}>
                  {formatCurrency(parseFloat(orderQuantity) * orderItem.unit_cost, selectedCurrency)}
                </div>
              </div>
            )}
            <ButtonGroup>
              <ModalButton variant="secondary" onClick={() => setShowOrderModal(false)}>
                Cancel
              </ModalButton>
              <ModalButton
                variant="primary"
                onClick={handleSendOrder}
                disabled={!orderQuantity || parseFloat(orderQuantity) <= 0}
              >
                Send Order
              </ModalButton>
            </ButtonGroup>
          </>
        )}
      </Modal>

      {/* Settings Modal */}
      <Modal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        title={`Settings: ${settingsIngredient?.name || ''}`}
        size="small"
      >
        {settingsIngredient && (
          <>
            <InfoBox>
              Configure PAR Level calculation parameters and manual usage settings.
            </InfoBox>

            <div style={{ marginBottom: '16px', padding: '12px', background: '#F9FAFB', borderRadius: '8px' }}>
              <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '8px' }}>Current Prediction</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ConfidenceBadge level={settingsIngredient.prediction_confidence || 'none'}>
                  {getConfidenceLabel(settingsIngredient.prediction_confidence || 'none')}
                </ConfidenceBadge>
                <span style={{ fontSize: '14px', color: '#0A2540' }}>
                  {(parseFloat(String(settingsIngredient.avg_daily_usage)) || 0).toFixed(2)} {settingsIngredient.unit}/day (calculated)
                </span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <UIFormGroup>
                <FormLabel>Minimum Stock Level ({settingsIngredient.unit})</FormLabel>
                <FormInput
                  type="number"
                  step="0.01"
                  min="0"
                  value={settingsForm.min_stock}
                  onChange={(e) => setSettingsForm({ ...settingsForm, min_stock: e.target.value })}
                  placeholder="0"
                />
              </UIFormGroup>
              <UIFormGroup>
                <FormLabel>Minimum Order ({settingsIngredient.unit})</FormLabel>
                <FormInput
                  type="number"
                  step="0.01"
                  min="0"
                  value={settingsForm.min_order}
                  onChange={(e) => setSettingsForm({ ...settingsForm, min_order: e.target.value })}
                  placeholder="0"
                />
                <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
                  Minimum order quantity from supplier
                </div>
              </UIFormGroup>
            </div>

            <UIFormGroup>
              <FormLabel>Lead Time (days)</FormLabel>
              <FormInput
                type="number"
                min="1"
                value={settingsForm.lead_time_days}
                onChange={(e) => setSettingsForm({ ...settingsForm, lead_time_days: e.target.value })}
                placeholder="1"
              />
              <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
                Time from order to delivery
              </div>
            </UIFormGroup>

            <UIFormGroup>
              <FormLabel>Safety Stock (%)</FormLabel>
              <FormInput
                type="number"
                min="0"
                max="100"
                value={settingsForm.safety_stock_percent}
                onChange={(e) => setSettingsForm({ ...settingsForm, safety_stock_percent: e.target.value })}
                placeholder="20"
              />
              <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
                Buffer percentage for unexpected demand
              </div>
            </UIFormGroup>

            <UIFormGroup>
              <FormLabel>Manual Daily Usage ({settingsIngredient.unit}/day)</FormLabel>
              <FormInput
                type="number"
                step="0.01"
                min="0"
                value={settingsForm.manual_daily_usage}
                onChange={(e) => setSettingsForm({ ...settingsForm, manual_daily_usage: e.target.value })}
                placeholder="Leave empty to use calculated value"
              />
              <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
                Override calculated usage when prediction confidence is low
              </div>
            </UIFormGroup>

            <ButtonGroup>
              <ModalButton variant="secondary" onClick={() => setShowSettingsModal(false)}>
                Cancel
              </ModalButton>
              <ModalButton
                variant="primary"
                onClick={handleSaveSettings}
                disabled={savingSettings}
              >
                {savingSettings ? 'Saving...' : 'Save Settings'}
              </ModalButton>
            </ButtonGroup>
          </>
        )}
      </Modal>

      {/* Add General Stock Modal */}
      <Modal
        isOpen={showAddGeneralStockModal}
        onClose={() => { setShowAddGeneralStockModal(false); setShowUnitDropdown(false); }}
        title="Add General Stock"
        size="medium"
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <UIFormGroup>
            <FormLabel>Item Name *</FormLabel>
            <FormInput
              type="text"
              value={generalStockForm.name}
              onChange={(e) => setGeneralStockForm({ ...generalStockForm, name: e.target.value })}
              placeholder="e.g., Takeaway Containers"
            />
          </UIFormGroup>
          <UIFormGroup>
            <FormLabel>Code (SKU)</FormLabel>
            <FormInput
              type="text"
              value={generalStockForm.code}
              onChange={(e) => setGeneralStockForm({ ...generalStockForm, code: e.target.value })}
              placeholder="Auto-generate if empty"
            />
          </UIFormGroup>
        </div>
        <ImageUploadDropzone
          value={generalStockForm.image_url}
          onChange={(base64) => setGeneralStockForm({ ...generalStockForm, image_url: base64 })}
          label="Image (Optional)"
          helpText="Drag & drop or click to upload item image"
          maxSize={2}
        />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <UIFormGroup>
            <FormLabel>Unit *</FormLabel>
            <SearchableSelectContainer>
              <SearchableSelectInput
                type="text"
                value={showUnitDropdown ? unitSearchTerm : (unitOptions.find(u => u.value === generalStockForm.stock_unit)?.label || generalStockForm.stock_unit)}
                onChange={(e) => { setUnitSearchTerm(e.target.value); setShowUnitDropdown(true); }}
                onFocus={() => { setShowUnitDropdown(true); setUnitSearchTerm(''); }}
                onBlur={() => setTimeout(() => setShowUnitDropdown(false), 200)}
                placeholder="Search unit..."
              />
              {showUnitDropdown && (
                <SearchableSelectDropdown>
                  {filteredUnitOptions.map(opt => (
                    <SearchableSelectOption
                      key={opt.value}
                      selected={generalStockForm.stock_unit === opt.value}
                      onClick={() => {
                        setGeneralStockForm({ ...generalStockForm, stock_unit: opt.value });
                        setShowUnitDropdown(false);
                        setUnitSearchTerm('');
                      }}
                    >
                      {opt.label}
                    </SearchableSelectOption>
                  ))}
                  {filteredUnitOptions.length === 0 && (
                    <SearchableSelectOption onClick={() => {
                      setGeneralStockForm({ ...generalStockForm, stock_unit: unitSearchTerm });
                      setShowUnitDropdown(false);
                    }}>
                      Use "{unitSearchTerm}"
                    </SearchableSelectOption>
                  )}
                </SearchableSelectDropdown>
              )}
            </SearchableSelectContainer>
          </UIFormGroup>
          <UIFormGroup>
            <FormLabel>Category</FormLabel>
            <FilterSelect
              value={generalStockForm.category}
              onChange={(e) => setGeneralStockForm({ ...generalStockForm, category: e.target.value })}
              style={{ width: '100%' }}
            >
              <option value="">Select Category</option>
              {generalStockCategories.length > 0 ? (
                generalStockCategories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.emoji ? `${cat.emoji} ` : ''}{cat.name}</option>
                ))
              ) : (
                <>
                  <option value="Supplies">Supplies</option>
                  <option value="Packaging">Packaging</option>
                  <option value="Cleaning">Cleaning</option>
                  <option value="Equipment">Equipment</option>
                  <option value="Other">Other</option>
                </>
              )}
            </FilterSelect>
          </UIFormGroup>
          <UIFormGroup>
            <FormLabel>Supplier</FormLabel>
            <FilterSelect
              value={generalStockForm.supplier_id}
              onChange={(e) => setGeneralStockForm({ ...generalStockForm, supplier_id: e.target.value })}
              style={{ width: '100%' }}
            >
              <option value="">Select Supplier (Optional)</option>
              {suppliers.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </FilterSelect>
          </UIFormGroup>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '16px' }}>
          <UIFormGroup>
            <FormLabel>Unit Cost</FormLabel>
            <FormInput
              type="number"
              step="0.01"
              min="0"
              value={generalStockForm.unit_cost}
              onChange={(e) => setGeneralStockForm({ ...generalStockForm, unit_cost: e.target.value })}
              placeholder="0.00"
            />
          </UIFormGroup>
          <UIFormGroup>
            <FormLabel>Initial Stock</FormLabel>
            <FormInput
              type="number"
              step="0.01"
              min="0"
              value={generalStockForm.current_stock}
              onChange={(e) => setGeneralStockForm({ ...generalStockForm, current_stock: e.target.value })}
              placeholder="0"
            />
          </UIFormGroup>
          <UIFormGroup>
            <FormLabel>Min Stock</FormLabel>
            <FormInput
              type="number"
              step="0.01"
              min="0"
              value={generalStockForm.min_stock}
              onChange={(e) => setGeneralStockForm({ ...generalStockForm, min_stock: e.target.value })}
              placeholder="0"
            />
          </UIFormGroup>
          <UIFormGroup>
            <FormLabel>Min Order</FormLabel>
            <FormInput
              type="number"
              step="0.01"
              min="0"
              value={generalStockForm.min_order}
              onChange={(e) => setGeneralStockForm({ ...generalStockForm, min_order: e.target.value })}
              placeholder="0"
            />
          </UIFormGroup>
        </div>
        <ButtonGroup>
          <ModalButton variant="secondary" onClick={() => { setShowAddGeneralStockModal(false); setShowUnitDropdown(false); }}>
            Cancel
          </ModalButton>
          <ModalButton
            variant="primary"
            onClick={async () => {
              if (!generalStockForm.name.trim()) return;
              try {
                setSavingGeneralStock(true);
                const response = await authFetch(`/api/restaurants/${restaurantId}/inventory/general-stock`, {
                  method: 'POST',
                  body: JSON.stringify({
                    name: generalStockForm.name,
                    code: generalStockForm.code || null,
                    image_url: generalStockForm.image_url || null,
                    stock_unit: generalStockForm.stock_unit,
                    unit_cost: parseFloat(generalStockForm.unit_cost) || 0,
                    category: generalStockForm.category || 'Other',
                    current_stock: parseFloat(generalStockForm.current_stock) || 0,
                    min_stock: parseFloat(generalStockForm.min_stock) || 0,
                    min_order: parseFloat(generalStockForm.min_order) || 0,
                    supplier_id: generalStockForm.supplier_id ? parseInt(generalStockForm.supplier_id) : null
                  })
                });
                if (response.success) {
                  setShowAddGeneralStockModal(false);
                  setGeneralStockForm({
                    name: '',
                    code: '',
                    image_url: '',
                    stock_unit: 'piece',
                    unit_cost: '',
                    category: '',
                    current_stock: '',
                    min_stock: '',
                    min_order: '',
                    supplier_id: ''
                  });
                  fetchData();
                }
              } catch (error) {
                console.error('Failed to add general stock:', error);
              } finally {
                setSavingGeneralStock(false);
              }
            }}
            disabled={savingGeneralStock || !generalStockForm.name.trim()}
          >
            {savingGeneralStock ? 'Adding...' : 'Add Item'}
          </ModalButton>
        </ButtonGroup>
      </Modal>

      {/* Edit General Stock Modal */}
      <Modal
        isOpen={showEditGeneralStockModal}
        onClose={() => { setShowEditGeneralStockModal(false); setEditingGeneralStock(null); }}
        title="Edit General Stock"
        size="medium"
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <UIFormGroup>
            <FormLabel>Item Name *</FormLabel>
            <FormInput
              type="text"
              value={generalStockForm.name}
              onChange={(e) => setGeneralStockForm({ ...generalStockForm, name: e.target.value })}
              placeholder="e.g., Takeaway Containers"
            />
          </UIFormGroup>
          <UIFormGroup>
            <FormLabel>Code (SKU)</FormLabel>
            <FormInput
              type="text"
              value={generalStockForm.code}
              onChange={(e) => setGeneralStockForm({ ...generalStockForm, code: e.target.value })}
              placeholder="Auto-generate if empty"
            />
          </UIFormGroup>
        </div>
        <ImageUploadDropzone
          value={generalStockForm.image_url}
          onChange={(base64) => setGeneralStockForm({ ...generalStockForm, image_url: base64 })}
          label="Image (Optional)"
          helpText="Drag & drop or click to upload item image"
          maxSize={2}
        />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <UIFormGroup>
            <FormLabel>Unit *</FormLabel>
            <SearchableSelectContainer>
              <SearchableSelectInput
                type="text"
                value={showUnitDropdown ? unitSearchTerm : (unitOptions.find(u => u.value === generalStockForm.stock_unit)?.label || generalStockForm.stock_unit)}
                onChange={(e) => { setUnitSearchTerm(e.target.value); setShowUnitDropdown(true); }}
                onFocus={() => { setShowUnitDropdown(true); setUnitSearchTerm(''); }}
                onBlur={() => setTimeout(() => setShowUnitDropdown(false), 200)}
                placeholder="Search unit..."
              />
              {showUnitDropdown && (
                <SearchableSelectDropdown>
                  {filteredUnitOptions.map(opt => (
                    <SearchableSelectOption
                      key={opt.value}
                      selected={generalStockForm.stock_unit === opt.value}
                      onClick={() => {
                        setGeneralStockForm({ ...generalStockForm, stock_unit: opt.value });
                        setShowUnitDropdown(false);
                        setUnitSearchTerm('');
                      }}
                    >
                      {opt.label}
                    </SearchableSelectOption>
                  ))}
                  {filteredUnitOptions.length === 0 && (
                    <SearchableSelectOption onClick={() => {
                      setGeneralStockForm({ ...generalStockForm, stock_unit: unitSearchTerm });
                      setShowUnitDropdown(false);
                    }}>
                      Use "{unitSearchTerm}"
                    </SearchableSelectOption>
                  )}
                </SearchableSelectDropdown>
              )}
            </SearchableSelectContainer>
          </UIFormGroup>
          <UIFormGroup>
            <FormLabel>Category</FormLabel>
            <FilterSelect
              value={generalStockForm.category}
              onChange={(e) => setGeneralStockForm({ ...generalStockForm, category: e.target.value })}
              style={{ width: '100%' }}
            >
              <option value="">Select Category</option>
              {generalStockCategories.length > 0 ? (
                generalStockCategories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.emoji ? `${cat.emoji} ` : ''}{cat.name}</option>
                ))
              ) : (
                <>
                  <option value="Supplies">Supplies</option>
                  <option value="Packaging">Packaging</option>
                  <option value="Cleaning">Cleaning</option>
                  <option value="Equipment">Equipment</option>
                  <option value="Other">Other</option>
                </>
              )}
            </FilterSelect>
          </UIFormGroup>
          <UIFormGroup>
            <FormLabel>Supplier</FormLabel>
            <FilterSelect
              value={generalStockForm.supplier_id}
              onChange={(e) => setGeneralStockForm({ ...generalStockForm, supplier_id: e.target.value })}
              style={{ width: '100%' }}
            >
              <option value="">Select Supplier (Optional)</option>
              {suppliers.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </FilterSelect>
          </UIFormGroup>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '16px' }}>
          <UIFormGroup>
            <FormLabel>Unit Cost</FormLabel>
            <FormInput
              type="number"
              step="0.01"
              min="0"
              value={generalStockForm.unit_cost}
              onChange={(e) => setGeneralStockForm({ ...generalStockForm, unit_cost: e.target.value })}
              placeholder="0.00"
            />
          </UIFormGroup>
          <UIFormGroup>
            <FormLabel>Current Stock</FormLabel>
            <FormInput
              type="number"
              step="0.01"
              min="0"
              value={generalStockForm.current_stock}
              onChange={(e) => setGeneralStockForm({ ...generalStockForm, current_stock: e.target.value })}
              placeholder="0"
            />
          </UIFormGroup>
          <UIFormGroup>
            <FormLabel>Min Stock</FormLabel>
            <FormInput
              type="number"
              step="0.01"
              min="0"
              value={generalStockForm.min_stock}
              onChange={(e) => setGeneralStockForm({ ...generalStockForm, min_stock: e.target.value })}
              placeholder="0"
            />
          </UIFormGroup>
          <UIFormGroup>
            <FormLabel>Min Order</FormLabel>
            <FormInput
              type="number"
              step="0.01"
              min="0"
              value={generalStockForm.min_order}
              onChange={(e) => setGeneralStockForm({ ...generalStockForm, min_order: e.target.value })}
              placeholder="0"
            />
          </UIFormGroup>
        </div>
        <ButtonGroup>
          <ModalButton variant="secondary" onClick={() => { setShowEditGeneralStockModal(false); setEditingGeneralStock(null); }}>
            Cancel
          </ModalButton>
          <ModalButton
            variant="primary"
            onClick={async () => {
              if (!generalStockForm.name.trim() || !editingGeneralStock) return;
              try {
                setSavingGeneralStock(true);
                const response = await authFetch(`/api/restaurants/${restaurantId}/inventory/general-stock/${editingGeneralStock.id}`, {
                  method: 'PUT',
                  body: JSON.stringify({
                    name: generalStockForm.name,
                    code: generalStockForm.code || null,
                    image_url: generalStockForm.image_url || null,
                    stock_unit: generalStockForm.stock_unit,
                    unit_cost: parseFloat(generalStockForm.unit_cost) || 0,
                    category: generalStockForm.category || 'Other',
                    current_stock: parseFloat(generalStockForm.current_stock) || 0,
                    min_stock: parseFloat(generalStockForm.min_stock) || 0,
                    min_order: parseFloat(generalStockForm.min_order) || 0,
                    supplier_id: generalStockForm.supplier_id ? parseInt(generalStockForm.supplier_id) : null
                  })
                });
                if (response.success) {
                  setShowEditGeneralStockModal(false);
                  setEditingGeneralStock(null);
                  setGeneralStockForm({
                    name: '',
                    code: '',
                    image_url: '',
                    stock_unit: 'piece',
                    unit_cost: '',
                    category: '',
                    current_stock: '',
                    min_stock: '',
                    min_order: '',
                    supplier_id: ''
                  });
                  fetchData();
                }
              } catch (error) {
                console.error('Failed to update general stock:', error);
              } finally {
                setSavingGeneralStock(false);
              }
            }}
            disabled={savingGeneralStock || !generalStockForm.name.trim()}
          >
            {savingGeneralStock ? 'Saving...' : 'Save Changes'}
          </ModalButton>
        </ButtonGroup>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteConfirmModal}
        onClose={() => { setShowDeleteConfirmModal(false); setDeleteTarget(null); }}
        title="Unlink from Inventory"
        size="small"
      >
        {deleteTarget && (
          <>
            <div style={{ padding: '16px 0', textAlign: 'center' }}>
              <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px', color: '#0A2540' }}>
                {deleteTarget.name}
              </div>
              <div style={{ fontSize: '14px', color: '#6B7280' }}>
                {deleteTarget.type === 'ingredient'
                  ? 'This will unlink the ingredient from inventory tracking. The ingredient itself will not be deleted from the Recipes page.'
                  : 'This will permanently delete this general stock item.'}
              </div>
            </div>
            <ButtonGroup>
              <ModalButton variant="secondary" onClick={() => { setShowDeleteConfirmModal(false); setDeleteTarget(null); }}>
                Cancel
              </ModalButton>
              <ModalButton
                variant="primary"
                onClick={async () => {
                  try {
                    if (deleteTarget.type === 'ingredient') {
                      // For ingredients, set track_stock to false to unlink from inventory
                      const response = await authFetch(`/api/restaurants/${restaurantId}/ingredients/${deleteTarget.id}`, {
                        method: 'PUT',
                        body: JSON.stringify({
                          track_stock: false
                        })
                      });
                      if (response.success) {
                        // Update local state - remove from inventory list
                        setInventory(prev => prev.filter(item => item.id !== deleteTarget.id));
                      }
                    } else {
                      // For general stock, actually delete
                      const response = await authFetch(`/api/restaurants/${restaurantId}/inventory/general-stock/${deleteTarget.id}`, {
                        method: 'DELETE'
                      });
                      if (response.success) {
                        setGeneralStockInventory(prev => prev.filter(item => item.id !== deleteTarget.id));
                      }
                    }
                    setShowDeleteConfirmModal(false);
                    setDeleteTarget(null);
                  } catch (error) {
                    console.error('Failed to delete:', error);
                  }
                }}
                style={{ background: '#DC2626' }}
              >
                {deleteTarget.type === 'ingredient' ? 'Unlink' : 'Delete'}
              </ModalButton>
            </ButtonGroup>
          </>
        )}
      </Modal>
    </MainLayout>
  );
};

// Transaction History Component
interface TransactionHistoryProps {
  restaurantId: number;
  currency: string;
}

interface Transaction {
  id: number;
  transaction_type: string;
  quantity_change: number;
  unit: string;
  stock_after: number;
  notes: string;
  created_at: string;
  ingredient: {
    id: number;
    name: string;
    unit: string;
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TransactionHistory: React.FC<TransactionHistoryProps> = ({ restaurantId, currency }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const res = await fetch(`/api/restaurants/${restaurantId}/inventory/transactions?limit=50`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const response = await res.json();
        if (response.success) {
          setTransactions(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [restaurantId]);

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'initial': return 'Initial Setup';
      case 'purchase': return 'Received';
      case 'order_deduct': return 'Order';
      case 'stock_take': return 'Stock Take';
      case 'waste': return 'Waste';
      case 'adjustment': return 'Adjustment';
      default: return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'purchase':
      case 'initial':
        return '#059669';
      case 'order_deduct':
      case 'waste':
        return '#DC2626';
      case 'stock_take':
      case 'adjustment':
        return '#6B7280';
      default:
        return '#0A2540';
    }
  };

  if (loading) {
    return <EmptyState>Loading transactions...</EmptyState>;
  }

  if (transactions.length === 0) {
    return (
      <EmptyState>
        <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
          No transactions recorded yet
        </div>
        <div style={{ fontSize: '14px' }}>
          Transactions will appear here when you receive or waste stock.
        </div>
      </EmptyState>
    );
  }

  return (
    <Table>
      <TableHeader columns="1.5fr 1.5fr 1fr 1fr 1fr 2fr">
        <span>Date</span>
        <span>Ingredient</span>
        <span>Type</span>
        <span>Change</span>
        <span>After</span>
        <span>Notes</span>
      </TableHeader>
      {transactions.map(t => (
        <TableRow key={t.id} columns="1.5fr 1.5fr 1fr 1fr 1fr 2fr">
          <MobileGrid>
            <MobileValue>
              <MobileLabel>Date</MobileLabel>
              <div style={{ fontSize: '14px', color: '#0A2540' }}>
                {new Date(t.created_at).toLocaleString()}
              </div>
            </MobileValue>
            <MobileValue>
              <MobileLabel>Ingredient</MobileLabel>
              <div style={{ fontWeight: 600, color: '#0A2540' }}>
                {t.ingredient?.name || '-'}
              </div>
            </MobileValue>
            <MobileValue>
              <MobileLabel>Type</MobileLabel>
              <span style={{ color: getTypeColor(t.transaction_type), fontWeight: 600 }}>
                {getTypeLabel(t.transaction_type)}
              </span>
            </MobileValue>
            <MobileValue>
              <MobileLabel>Change</MobileLabel>
              <div style={{
                color: parseFloat(String(t.quantity_change)) >= 0 ? '#059669' : '#DC2626',
                fontWeight: 600
              }}>
                {parseFloat(String(t.quantity_change)) >= 0 ? '+' : ''}{t.quantity_change} {t.unit}
              </div>
            </MobileValue>
            <MobileValue>
              <MobileLabel>After</MobileLabel>
              <div style={{ color: '#0A2540' }}>
                {t.stock_after} {t.unit}
              </div>
            </MobileValue>
            <MobileValue>
              <MobileLabel>Notes</MobileLabel>
              <div style={{ color: '#6B7280', fontSize: '13px' }}>
                {t.notes || '-'}
              </div>
            </MobileValue>
          </MobileGrid>
        </TableRow>
      ))}
    </Table>
  );
};

export default InventoryPage;
