import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import MainLayout from '../../components/Layout/MainLayout';
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
} from '../../components/UI';
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import { useAuth } from '../../contexts/AuthContext';
import { Modal, ModalButton, FormGroup as UIFormGroup, FormLabel, FormInput } from '../../components/UI/Modal';
import { useBrandCurrency } from '../../hooks/useBrandCurrency';
import { formatCurrency } from '../../utils/currency';
import { fetchAPI } from '../../utils/api';

interface IngredientStock {
  id: number;
  name: string;
  unit: string;
  unit_cost: number;
  category: string;
  current_stock: number;
  min_stock: number;
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

interface ProductStock {
  id: number;
  name: string;
  price: number;
  category: string;
  track_stock: boolean;
  current_stock: number;
  min_stock: number;
  stock_unit: string;
  unit_cost: number;
  supplier_id: number | null;
  supplier_name: string | null;
  last_stock_take_at: string | null;
  stock_status: 'normal' | 'low_stock' | 'out_of_stock';
  soldOut: boolean;
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
  background: none;
  border: none;
  padding: 4px 8px;
  cursor: pointer;
  color: #6B7280;
  border-radius: 4px;
  font-size: 12px;

  &:hover {
    background: #F3F4F6;
    color: #0A2540;
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

const InventoryPage: React.FC = () => {
  const { user } = useAuth();
  const { restaurantId: urlRestaurantId } = useParams<{ restaurantId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { defaultCurrency } = useBrandCurrency();
  const [selectedCurrency, setSelectedCurrency] = useState<string>('RM');

  // Get tab from URL, default to 'dashboard'
  const activeTab = (searchParams.get('tab') as 'dashboard' | 'list' | 'history') || 'dashboard';

  const setActiveTab = (tab: 'dashboard' | 'list' | 'history') => {
    setSearchParams({ tab });
  };
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [inventory, setInventory] = useState<IngredientStock[]>([]);
  const [alerts, setAlerts] = useState<StockAlert[]>([]);
  const [suggestions, setSuggestions] = useState<ReorderSuggestion[]>([]);
  const [expiringItems, setExpiringItems] = useState<ExpiringItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Product inventory
  const [productInventory, setProductInventory] = useState<ProductStock[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductStock | null>(null);
  const [showProductReceiveModal, setShowProductReceiveModal] = useState(false);
  const [showProductAdjustModal, setShowProductAdjustModal] = useState(false);
  const [productQuantity, setProductQuantity] = useState('');
  const [productNotes, setProductNotes] = useState('');

  // Stock list type filter (ingredients or products)
  const [stockTypeFilter, setStockTypeFilter] = useState<'all' | 'ingredients' | 'products'>('all');

  // Modals
  const [showReceiveModal, setShowReceiveModal] = useState(false);
  const [showWasteModal, setShowWasteModal] = useState(false);
  const [showInitialStockModal, setShowInitialStockModal] = useState(false);
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
    min_stock: ''
  });
  const [savingSettings, setSavingSettings] = useState(false);

  // Add Ingredient Modal
  const [showAddIngredientModal, setShowAddIngredientModal] = useState(false);
  const [addIngredientForm, setAddIngredientForm] = useState({
    name: '',
    unit: 'kg',
    unit_cost: '',
    category: 'Produce',
    current_stock: '',
    min_stock: ''
  });
  const [savingIngredient, setSavingIngredient] = useState(false);

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

      const [summaryRes, inventoryRes, alertsRes, suggestionsRes, expiringRes, productsRes] = await Promise.all([
        authFetch(`/api/restaurants/${restaurantId}/inventory/summary`),
        authFetch(`/api/restaurants/${restaurantId}/inventory`),
        authFetch(`/api/restaurants/${restaurantId}/inventory/alerts?resolved=false`),
        authFetch(`/api/restaurants/${restaurantId}/inventory/reorder-suggestions`),
        authFetch(`/api/restaurants/${restaurantId}/inventory/expiring?days=14`),
        authFetch(`/api/restaurants/${restaurantId}/inventory/products`)
      ]);

      if (summaryRes.success) setSummary(summaryRes.data);
      if (inventoryRes.success) setInventory(inventoryRes.data);
      if (alertsRes.success) setAlerts(alertsRes.data);
      if (suggestionsRes.success) setSuggestions(suggestionsRes.data);
      if (expiringRes.success) setExpiringItems(expiringRes.data);
      if (productsRes.success) setProductInventory(productsRes.data || []);
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
      min_stock: (ingredient.min_stock || 0).toString()
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
          min_stock: parseFloat(settingsForm.min_stock) || 0
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

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.stock_status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
          <ActionSection>
            {needsInitialSetup && (
              <Button
                variant="primary"
                onClick={openInitialStockModal}
              >
                Set Initial Stock
              </Button>
            )}
            <Button
              variant="secondary"
              onClick={() => window.location.href = `/restaurant/${restaurantId}/stock-take`}
            >
              Stock Take
            </Button>
          </ActionSection>
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
          </TabContainer>

          {loading ? (
            <EmptyState>Loading...</EmptyState>
          ) : activeTab === 'dashboard' ? (
            <>
              {needsInitialSetup && inventory.length > 0 && (
                <InfoBox>
                  <strong>Welcome to Inventory Management</strong>
                  <br />
                  Set your initial stock levels to start tracking inventory. Click the "Set Initial Stock" button above to enter your current stock quantities.
                </InfoBox>
              )}
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
                    <TableHeader columns="2fr 1fr 1fr 1fr 1fr 100px">
                      <span>Ingredient</span>
                      <span>Current Stock</span>
                      <span>Daily Usage</span>
                      <span>Suggested Qty</span>
                      <span>Est. Cost</span>
                      <span>Urgency</span>
                    </TableHeader>
                    {suggestions.slice(0, 10).map(s => (
                      <TableRow key={s.ingredient.id} columns="2fr 1fr 1fr 1fr 1fr 100px">
                        <div>{s.ingredient.name}</div>
                        <div>{s.current_stock} {s.ingredient.unit}</div>
                        <div>{(parseFloat(s.avg_daily_usage) || 0).toFixed(2)} {s.ingredient.unit}/day</div>
                        <div style={{ fontWeight: 600 }}>{s.suggested_qty} {s.ingredient.unit}</div>
                        <div>{formatCurrency(s.estimated_cost, selectedCurrency)}</div>
                        <div>
                          <UrgencyBadge level={s.urgency}>
                            {s.urgency.toUpperCase()}
                          </UrgencyBadge>
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
                  onChange={(e) => setStockTypeFilter(e.target.value as 'all' | 'ingredients' | 'products')}
                  style={{ minWidth: '140px' }}
                >
                  <option value="all">All Items</option>
                  <option value="ingredients">Ingredients</option>
                  <option value="products">Products</option>
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
              </FilterBar>

              {/* Show Products Section */}
              {(stockTypeFilter === 'all' || stockTypeFilter === 'products') && productInventory.length > 0 && (
                <>
                  {stockTypeFilter === 'all' && <SectionTitle>Products ({productInventory.filter(p => {
                    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
                    const matchesStatus = statusFilter === 'all' || p.stock_status === statusFilter;
                    return matchesSearch && matchesStatus;
                  }).length})</SectionTitle>}
                  <Table style={{ marginBottom: '24px' }}>
                    <InventoryTableHeader columns="2fr 1fr 1fr 1fr 1fr 1fr 150px">
                      <span>Product</span>
                      <span>Status</span>
                      <span>Current Stock</span>
                      <span>Min Stock</span>
                      <span>Unit Cost</span>
                      <span>Supplier</span>
                      <span>Actions</span>
                    </InventoryTableHeader>
                    {productInventory
                      .filter(p => {
                        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
                        const matchesStatus = statusFilter === 'all' || p.stock_status === statusFilter;
                        return matchesSearch && matchesStatus;
                      })
                      .map(product => (
                      <InventoryTableRow key={`product-${product.id}`} columns="2fr 1fr 1fr 1fr 1fr 1fr 150px">
                        <MobileGrid>
                          <MobileValue>
                            <MobileLabel>Product</MobileLabel>
                            <IngredientInfo>
                              <IngredientName>{product.name}</IngredientName>
                              <IngredientMeta>{product.category} • {formatCurrency(product.price, selectedCurrency)}</IngredientMeta>
                            </IngredientInfo>
                          </MobileValue>
                          <MobileValue>
                            <MobileLabel>Status</MobileLabel>
                            <StatusBadge status={product.stock_status}>
                              {getStatusLabel(product.stock_status)}
                            </StatusBadge>
                          </MobileValue>
                          <MobileValue>
                            <MobileLabel>Current Stock</MobileLabel>
                            <div style={{ fontWeight: 600, color: '#0A2540' }}>
                              {product.current_stock} {product.stock_unit}
                            </div>
                          </MobileValue>
                          <MobileValue>
                            <MobileLabel>Min Stock</MobileLabel>
                            <div style={{ color: '#6B7280' }}>
                              {product.min_stock} {product.stock_unit}
                            </div>
                          </MobileValue>
                          <MobileValue>
                            <MobileLabel>Unit Cost</MobileLabel>
                            <div style={{ color: '#0A2540' }}>
                              {formatCurrency(product.unit_cost, selectedCurrency)}
                            </div>
                          </MobileValue>
                          <MobileValue>
                            <MobileLabel>Supplier</MobileLabel>
                            <div style={{ color: product.supplier_name ? '#0A2540' : '#9CA3AF', fontSize: '13px' }}>
                              {product.supplier_name || '-'}
                            </div>
                          </MobileValue>
                        </MobileGrid>
                        <ActionButtons>
                          <Button
                            variant="primary"
                            onClick={() => {
                              setSelectedProduct(product);
                              setProductQuantity('');
                              setProductNotes('');
                              setShowProductReceiveModal(true);
                            }}
                            style={{ padding: '6px 12px', fontSize: '13px' }}
                          >
                            Receive
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => {
                              setSelectedProduct(product);
                              setProductQuantity('');
                              setProductNotes('');
                              setShowProductAdjustModal(true);
                            }}
                            style={{ padding: '6px 12px', fontSize: '13px' }}
                          >
                            Adjust
                          </Button>
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
                  <InventoryTableHeader columns="2fr 1fr 1fr 1fr 1fr 1fr 1fr 180px">
                    <span>Ingredient</span>
                    <span>Status</span>
                    <span>Current Stock</span>
                    <span>Min / Prediction</span>
                    <span>Unit Cost</span>
                    <span>Supplier</span>
                    <span>Last Stock Take</span>
                    <span>Actions</span>
                  </InventoryTableHeader>
                  {filteredInventory.map(item => (
                    <InventoryTableRow key={item.id} columns="2fr 1fr 1fr 1fr 1fr 1fr 1fr 180px">
                      <MobileGrid>
                        <MobileValue>
                          <MobileLabel>Ingredient</MobileLabel>
                          <IngredientInfo>
                            <IngredientName>{item.name}</IngredientName>
                            <IngredientMeta>{item.category} • {(parseFloat(String(item.avg_daily_usage)) || 0).toFixed(2)} {item.unit}/day</IngredientMeta>
                          </IngredientInfo>
                        </MobileValue>
                        <MobileValue>
                          <MobileLabel>Status</MobileLabel>
                          <StatusBadge status={item.stock_status}>
                            {getStatusLabel(item.stock_status)}
                          </StatusBadge>
                        </MobileValue>
                        <MobileValue>
                          <MobileLabel>Current Stock</MobileLabel>
                          <div style={{ fontWeight: 600, color: '#0A2540' }}>
                            {item.current_stock} {item.unit}
                          </div>
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
                      <ActionButtons>
                        <Button
                          variant="primary"
                          onClick={() => openReceiveModal(item)}
                          style={{ padding: '6px 12px', fontSize: '13px' }}
                        >
                          Receive
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => openWasteModal(item)}
                          style={{ padding: '6px 12px', fontSize: '13px' }}
                        >
                          Waste
                        </Button>
                        <SettingsButton onClick={() => openSettingsModal(item)}>
                          Settings
                        </SettingsButton>
                      </ActionButtons>
                    </InventoryTableRow>
                  ))}
                </Table>
              )}
            </>
          )}
            </>
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

      {/* Product Receive Modal */}
      <Modal
        isOpen={showProductReceiveModal}
        onClose={() => setShowProductReceiveModal(false)}
        title={`Receive Stock: ${selectedProduct?.name || ''}`}
        size="small"
      >
        {selectedProduct && (
          <>
            <div style={{ marginBottom: '16px', padding: '12px', background: '#F9FAFB', borderRadius: '8px' }}>
              <div style={{ fontSize: '13px', color: '#6B7280' }}>Current Stock</div>
              <div style={{ fontSize: '18px', fontWeight: 600, color: '#0A2540' }}>
                {selectedProduct.current_stock} {selectedProduct.stock_unit}
              </div>
            </div>
            <UIFormGroup>
              <FormLabel>Quantity to Add *</FormLabel>
              <FormInput
                type="number"
                min="0"
                step="0.01"
                value={productQuantity}
                onChange={(e) => setProductQuantity(e.target.value)}
                placeholder="Enter quantity"
              />
            </UIFormGroup>
            <UIFormGroup>
              <FormLabel>Notes (Optional)</FormLabel>
              <FormInput
                value={productNotes}
                onChange={(e) => setProductNotes(e.target.value)}
                placeholder="Enter notes"
              />
            </UIFormGroup>
            <ButtonGroup>
              <ModalButton variant="secondary" onClick={() => setShowProductReceiveModal(false)}>
                Cancel
              </ModalButton>
              <ModalButton
                variant="primary"
                onClick={async () => {
                  if (!productQuantity || parseFloat(productQuantity) <= 0) return;
                  try {
                    const response = await authFetch(
                      `/api/restaurants/${restaurantId}/inventory/products/${selectedProduct.id}/receive`,
                      {
                        method: 'POST',
                        body: JSON.stringify({
                          quantity: parseFloat(productQuantity),
                          notes: productNotes
                        })
                      }
                    );
                    if (response.success) {
                      setShowProductReceiveModal(false);
                      fetchData();
                    }
                  } catch (error) {
                    console.error('Failed to receive product:', error);
                  }
                }}
                disabled={!productQuantity || parseFloat(productQuantity) <= 0}
              >
                Receive
              </ModalButton>
            </ButtonGroup>
          </>
        )}
      </Modal>

      {/* Product Adjust Modal */}
      <Modal
        isOpen={showProductAdjustModal}
        onClose={() => setShowProductAdjustModal(false)}
        title={`Adjust Stock: ${selectedProduct?.name || ''}`}
        size="small"
      >
        {selectedProduct && (
          <>
            <div style={{ marginBottom: '16px', padding: '12px', background: '#F9FAFB', borderRadius: '8px' }}>
              <div style={{ fontSize: '13px', color: '#6B7280' }}>Current Stock</div>
              <div style={{ fontSize: '18px', fontWeight: 600, color: '#0A2540' }}>
                {selectedProduct.current_stock} {selectedProduct.stock_unit}
              </div>
            </div>
            <UIFormGroup>
              <FormLabel>Adjustment Quantity *</FormLabel>
              <FormInput
                type="number"
                step="0.01"
                value={productQuantity}
                onChange={(e) => setProductQuantity(e.target.value)}
                placeholder="Enter quantity (negative to reduce)"
              />
              <div style={{ fontSize: '12px', color: '#8898AA', marginTop: '4px' }}>
                Use negative value to reduce stock (e.g., -5 for waste/damage)
              </div>
            </UIFormGroup>
            <UIFormGroup>
              <FormLabel>Reason / Notes</FormLabel>
              <FormInput
                value={productNotes}
                onChange={(e) => setProductNotes(e.target.value)}
                placeholder="e.g., Damaged, Expired, Correction"
              />
            </UIFormGroup>
            <ButtonGroup>
              <ModalButton variant="secondary" onClick={() => setShowProductAdjustModal(false)}>
                Cancel
              </ModalButton>
              <ModalButton
                variant="primary"
                onClick={async () => {
                  if (!productQuantity) return;
                  try {
                    const response = await authFetch(
                      `/api/restaurants/${restaurantId}/inventory/products/${selectedProduct.id}/adjust`,
                      {
                        method: 'POST',
                        body: JSON.stringify({
                          quantity: parseFloat(productQuantity),
                          reason: productNotes,
                          notes: productNotes
                        })
                      }
                    );
                    if (response.success) {
                      setShowProductAdjustModal(false);
                      fetchData();
                    }
                  } catch (error) {
                    console.error('Failed to adjust product:', error);
                  }
                }}
                disabled={!productQuantity}
              >
                Adjust
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
