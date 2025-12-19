import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import MainLayout from '../../components/Layout/MainLayout';
import { ThemedButton } from '../../components/Theme/ThemedButton';
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
  Content
} from '../../components/UI';
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import { useAuth } from '../../contexts/AuthContext';
import { Modal, ModalButton, FormGroup as UIFormGroup, FormLabel, FormInput } from '../../components/UI/Modal';
import { useBrandCurrency } from '../../hooks/useBrandCurrency';
import { formatCurrency, getCurrencySymbol } from '../../utils/currency';
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
  stock_status: 'normal' | 'low_stock' | 'out_of_stock';
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
  suggested_qty: number;
  estimated_cost: number;
  urgency: 'critical' | 'high' | 'normal';
}

interface Summary {
  total_items: number;
  low_stock_count: number;
  out_of_stock_count: number;
  monthly_loss: number;
  unresolved_alerts: number;
}

// Styled Components
const InfoBox = styled.div`
  background: #F0F9FF;
  border: 1px solid #BAE6FD;
  border-radius: 8px;
  padding: 12px 16px;
  color: #0369A1;
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

const StockGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  margin-top: 16px;
`;

const StockCard = styled.div<{ status?: string }>`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  padding: 20px;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    border-color: #635BFF;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

const IngredientName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;

  ${props => {
    switch (props.status) {
      case 'out_of_stock':
        return 'background: #FEE2E2; color: #DC2626;';
      case 'low_stock':
        return 'background: #FEF3C7; color: #D97706;';
      default:
        return 'background: #D1FAE5; color: #059669;';
    }
  }}
`;

const StockInfo = styled.div`
  margin: 16px 0;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`;

const InfoLabel = styled.span`
  font-size: 13px;
  color: #6B7280;
`;

const InfoValue = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`;

const CardActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  flex: 1;
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          background: #635BFF;
          color: white;
          &:hover { background: #4F46E5; }
        `;
      case 'danger':
        return `
          background: #FEE2E2;
          color: #DC2626;
          &:hover { background: #FCA5A5; }
        `;
      default:
        return `
          background: #F3F4F6;
          color: #374151;
          &:hover { background: #E5E7EB; }
        `;
    }
  }}
`;

const AlertsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
`;

const AlertCard = styled.div<{ type: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: ${props => props.type === 'out_of_stock' ? '#FEF2F2' : '#FFFBEB'};
  border: 1px solid ${props => props.type === 'out_of_stock' ? '#FECACA' : '#FED7AA'};
  border-radius: 8px;
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

const AlertActions = styled.div`
  display: flex;
  gap: 8px;
`;

const SuggestionTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #E6EBF1;

  th, td {
    padding: 12px 16px;
    text-align: left;
    border-bottom: 1px solid #E6EBF1;
  }

  th {
    background: #F9FAFB;
    font-weight: 600;
    font-size: 13px;
    color: #374151;
  }

  td {
    font-size: 14px;
    color: #0A2540;
  }

  tr:last-child td {
    border-bottom: none;
  }
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

const QuickActions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  flex-wrap: wrap;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #6B7280;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 4px;
  background: #F3F4F6;
  padding: 4px;
  border-radius: 8px;
  margin-bottom: 24px;
`;

const Tab = styled.button<{ active?: boolean }>`
  padding: 10px 20px;
  border: none;
  background: ${props => props.active ? 'white' : 'transparent'};
  color: ${props => props.active ? '#635BFF' : '#6B7280'};
  font-weight: 600;
  font-size: 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: ${props => props.active ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'};

  &:hover {
    color: ${props => props.active ? '#635BFF' : '#374151'};
  }
`;

const InventoryPage: React.FC = () => {
  const { user } = useAuth();
  const { defaultCurrency } = useBrandCurrency();
  const [selectedCurrency, setSelectedCurrency] = useState<string>('MYR');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'list' | 'history'>('dashboard');
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [inventory, setInventory] = useState<IngredientStock[]>([]);
  const [alerts, setAlerts] = useState<StockAlert[]>([]);
  const [suggestions, setSuggestions] = useState<ReorderSuggestion[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modals
  const [showReceiveModal, setShowReceiveModal] = useState(false);
  const [showWasteModal, setShowWasteModal] = useState(false);
  const [showInitialModal, setShowInitialModal] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState<IngredientStock | null>(null);
  const [quantity, setQuantity] = useState('');
  const [notes, setNotes] = useState('');

  const restaurantId = user?.restaurant_id;

  useEffect(() => {
    if (defaultCurrency) {
      setSelectedCurrency(defaultCurrency);
    }
  }, [defaultCurrency]);

  const fetchData = useCallback(async () => {
    if (!restaurantId) return;

    try {
      setLoading(true);

      const [summaryRes, inventoryRes, alertsRes, suggestionsRes] = await Promise.all([
        fetchAPI(`/api/restaurants/${restaurantId}/inventory/summary`),
        fetchAPI(`/api/restaurants/${restaurantId}/inventory`),
        fetchAPI(`/api/restaurants/${restaurantId}/inventory/alerts?resolved=false`),
        fetchAPI(`/api/restaurants/${restaurantId}/inventory/reorder-suggestions`)
      ]);

      if (summaryRes.success) setSummary(summaryRes.data);
      if (inventoryRes.success) setInventory(inventoryRes.data);
      if (alertsRes.success) setAlerts(alertsRes.data);
      if (suggestionsRes.success) setSuggestions(suggestionsRes.data);
    } catch (error) {
      console.error('Failed to fetch inventory data:', error);
    } finally {
      setLoading(false);
    }
  }, [restaurantId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleReceive = async () => {
    if (!selectedIngredient || !quantity) return;

    try {
      const response = await fetchAPI(`/api/restaurants/${restaurantId}/inventory/receive`, {
        method: 'POST',
        body: JSON.stringify({
          ingredient_id: selectedIngredient.id,
          quantity: parseFloat(quantity),
          notes
        })
      });

      if (response.success) {
        alert('Stock received successfully');
        setShowReceiveModal(false);
        setSelectedIngredient(null);
        setQuantity('');
        setNotes('');
        fetchData();
      } else {
        alert(response.message || 'Failed to receive stock');
      }
    } catch (error) {
      console.error('Failed to receive stock:', error);
      alert('Failed to receive stock');
    }
  };

  const handleWaste = async () => {
    if (!selectedIngredient || !quantity) return;

    try {
      const response = await fetchAPI(`/api/restaurants/${restaurantId}/inventory/waste`, {
        method: 'POST',
        body: JSON.stringify({
          ingredient_id: selectedIngredient.id,
          quantity: parseFloat(quantity),
          notes
        })
      });

      if (response.success) {
        alert('Waste recorded successfully');
        setShowWasteModal(false);
        setSelectedIngredient(null);
        setQuantity('');
        setNotes('');
        fetchData();
      } else {
        alert(response.message || 'Failed to record waste');
      }
    } catch (error) {
      console.error('Failed to record waste:', error);
      alert('Failed to record waste');
    }
  };

  const handleResolveAlert = async (alertId: number) => {
    try {
      const response = await fetchAPI(`/api/restaurants/${restaurantId}/inventory/alerts/${alertId}/resolve`, {
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
            <ThemedButton
              variant="secondary"
              onClick={() => window.location.href = `/restaurants/${restaurantId}/stock-take`}
            >
              Stock Take
            </ThemedButton>
          </ActionSection>
        </Header>

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
            <StatsGrid>
              <StatCard>
                <StatLabel>Total Ingredients</StatLabel>
                <StatValue>{summary?.total_items || 0}</StatValue>
                <StatDescription>managed items</StatDescription>
              </StatCard>
              <StatCard>
                <StatLabel>Low Stock</StatLabel>
                <StatValue style={{ color: '#D97706' }}>{summary?.low_stock_count || 0}</StatValue>
                <StatDescription>need attention</StatDescription>
              </StatCard>
              <StatCard>
                <StatLabel>Out of Stock</StatLabel>
                <StatValue style={{ color: '#DC2626' }}>{summary?.out_of_stock_count || 0}</StatValue>
                <StatDescription>urgent</StatDescription>
              </StatCard>
              <StatCard>
                <StatLabel>Monthly Loss</StatLabel>
                <StatValue>{formatCurrency(summary?.monthly_loss || 0, selectedCurrency)}</StatValue>
                <StatDescription>this month</StatDescription>
              </StatCard>
            </StatsGrid>

            {alerts.length > 0 && (
              <>
                <SectionTitle>Stock Alerts</SectionTitle>
                <AlertsList>
                  {alerts.slice(0, 5).map(alert => (
                    <AlertCard key={alert.id} type={alert.alert_type}>
                      <AlertInfo>
                        <AlertTitle>{alert.ingredient.name}</AlertTitle>
                        <AlertDetail>
                          Current: {alert.current_stock} {alert.ingredient.unit} / Min: {alert.min_stock} {alert.ingredient.unit}
                        </AlertDetail>
                      </AlertInfo>
                      <AlertActions>
                        <ActionButton
                          variant="primary"
                          onClick={() => {
                            const ing = inventory.find(i => i.id === alert.ingredient_id);
                            if (ing) openReceiveModal(ing);
                          }}
                        >
                          Receive
                        </ActionButton>
                        <ActionButton onClick={() => handleResolveAlert(alert.id)}>
                          Dismiss
                        </ActionButton>
                      </AlertActions>
                    </AlertCard>
                  ))}
                </AlertsList>
              </>
            )}

            {suggestions.length > 0 && (
              <>
                <SectionTitle>Reorder Suggestions</SectionTitle>
                <InfoBox>
                  Calculated based on average daily usage over the last 30 days and supplier lead time.
                </InfoBox>
                <SuggestionTable>
                  <thead>
                    <tr>
                      <th>Ingredient</th>
                      <th>Current Stock</th>
                      <th>Daily Usage</th>
                      <th>Suggested Qty</th>
                      <th>Est. Cost</th>
                      <th>Urgency</th>
                    </tr>
                  </thead>
                  <tbody>
                    {suggestions.slice(0, 10).map(s => (
                      <tr key={s.ingredient.id}>
                        <td>{s.ingredient.name}</td>
                        <td>{s.current_stock} {s.ingredient.unit}</td>
                        <td>{s.avg_daily_usage.toFixed(2)} {s.ingredient.unit}/day</td>
                        <td><strong>{s.suggested_qty} {s.ingredient.unit}</strong></td>
                        <td>{formatCurrency(s.estimated_cost, selectedCurrency)}</td>
                        <td>
                          <UrgencyBadge level={s.urgency}>
                            {s.urgency.toUpperCase()}
                          </UrgencyBadge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </SuggestionTable>
              </>
            )}

            <QuickActions>
              <ThemedButton variant="primary" onClick={() => setActiveTab('list')}>
                + Receive Stock
              </ThemedButton>
              <ThemedButton variant="secondary" onClick={() => setActiveTab('list')}>
                + Record Waste
              </ThemedButton>
              <ThemedButton variant="secondary" onClick={() => setActiveTab('history')}>
                View All Transactions
              </ThemedButton>
            </QuickActions>
          </>
        ) : activeTab === 'list' ? (
          <>
            <FilterBar>
              <SearchInput
                type="text"
                placeholder="Search ingredients..."
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

            {filteredInventory.length === 0 ? (
              <EmptyState>
                <p>No ingredients found. Add ingredients in the Ingredients page first.</p>
              </EmptyState>
            ) : (
              <StockGrid>
                {filteredInventory.map(item => (
                  <StockCard key={item.id} status={item.stock_status}>
                    <CardHeader>
                      <IngredientName>{item.name}</IngredientName>
                      <StatusBadge status={item.stock_status}>
                        {getStatusLabel(item.stock_status)}
                      </StatusBadge>
                    </CardHeader>

                    <StockInfo>
                      <InfoRow>
                        <InfoLabel>Current Stock</InfoLabel>
                        <InfoValue>{item.current_stock} {item.unit}</InfoValue>
                      </InfoRow>
                      <InfoRow>
                        <InfoLabel>Min Stock (Safety)</InfoLabel>
                        <InfoValue>{item.min_stock} {item.unit}</InfoValue>
                      </InfoRow>
                      <InfoRow>
                        <InfoLabel>Unit Cost</InfoLabel>
                        <InfoValue>{formatCurrency(item.unit_cost, selectedCurrency)}</InfoValue>
                      </InfoRow>
                      <InfoRow>
                        <InfoLabel>Avg. Daily Usage</InfoLabel>
                        <InfoValue>{item.avg_daily_usage?.toFixed(2) || '0'} {item.unit}/day</InfoValue>
                      </InfoRow>
                      <InfoRow>
                        <InfoLabel>Last Stock Take</InfoLabel>
                        <InfoValue>{formatDate(item.last_stock_take_at)}</InfoValue>
                      </InfoRow>
                    </StockInfo>

                    <CardActions>
                      <ActionButton variant="primary" onClick={() => openReceiveModal(item)}>
                        Receive
                      </ActionButton>
                      <ActionButton variant="danger" onClick={() => openWasteModal(item)}>
                        Waste
                      </ActionButton>
                    </CardActions>
                  </StockCard>
                ))}
              </StockGrid>
            )}
          </>
        ) : (
          <TransactionHistory restaurantId={restaurantId} currency={selectedCurrency} />
        )}
      </Container>

      {/* Receive Stock Modal */}
      <Modal
        isOpen={showReceiveModal}
        onClose={() => setShowReceiveModal(false)}
        title="Receive Stock"
        size="small"
      >
        {selectedIngredient && (
          <>
            <InfoBox>
              Enter the quantity received. This will be added to the current stock.
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

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ restaurantId, currency }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetchAPI(`/api/restaurants/${restaurantId}/inventory/transactions?limit=50`);
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
    return <EmptyState>No transactions recorded yet.</EmptyState>;
  }

  return (
    <SuggestionTable>
      <thead>
        <tr>
          <th>Date</th>
          <th>Ingredient</th>
          <th>Type</th>
          <th>Change</th>
          <th>After</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map(t => (
          <tr key={t.id}>
            <td>{new Date(t.created_at).toLocaleString()}</td>
            <td>{t.ingredient?.name || '-'}</td>
            <td>
              <span style={{ color: getTypeColor(t.transaction_type), fontWeight: 600 }}>
                {getTypeLabel(t.transaction_type)}
              </span>
            </td>
            <td style={{ color: parseFloat(String(t.quantity_change)) >= 0 ? '#059669' : '#DC2626' }}>
              {parseFloat(String(t.quantity_change)) >= 0 ? '+' : ''}{t.quantity_change} {t.unit}
            </td>
            <td>{t.stock_after} {t.unit}</td>
            <td>{t.notes || '-'}</td>
          </tr>
        ))}
      </tbody>
    </SuggestionTable>
  );
};

export default InventoryPage;
