import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
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

// Styled Components - 최소한의 페이지 전용 스타일만 정의
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
  const [selectedIngredient, setSelectedIngredient] = useState<IngredientStock | null>(null);
  const [quantity, setQuantity] = useState('');
  const [notes, setNotes] = useState('');

  // URL 파라미터 우선, 없으면 user의 restaurant_id 사용
  const restaurantId = urlRestaurantId ? parseInt(urlRestaurantId, 10) : user?.restaurant_id;

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
            <Button
              variant="secondary"
              onClick={() => window.location.href = `/restaurant/${restaurantId}/inventory/stock-take`}
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
                        <div>{s.avg_daily_usage.toFixed(2)} {s.ingredient.unit}/day</div>
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
                <Button variant="primary" onClick={() => setActiveTab('list')}>
                  + Receive Stock
                </Button>
                <Button variant="secondary" onClick={() => setActiveTab('list')}>
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
                  <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                    No ingredients found
                  </div>
                  <div style={{ fontSize: '14px' }}>
                    Add ingredients in the Ingredients page first.
                  </div>
                </EmptyState>
              ) : (
                <Table>
                  <InventoryTableHeader columns="2fr 1fr 1fr 1fr 1fr 1fr 150px">
                    <span>Ingredient</span>
                    <span>Status</span>
                    <span>Current Stock</span>
                    <span>Min Stock</span>
                    <span>Unit Cost</span>
                    <span>Last Stock Take</span>
                    <span>Actions</span>
                  </InventoryTableHeader>
                  {filteredInventory.map(item => (
                    <InventoryTableRow key={item.id} columns="2fr 1fr 1fr 1fr 1fr 1fr 150px">
                      <MobileGrid>
                        <MobileValue>
                          <MobileLabel>Ingredient</MobileLabel>
                          <IngredientInfo>
                            <IngredientName>{item.name}</IngredientName>
                            <IngredientMeta>{item.category} • {item.avg_daily_usage?.toFixed(2) || '0'} {item.unit}/day</IngredientMeta>
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
                          <MobileLabel>Min Stock</MobileLabel>
                          <div style={{ color: '#6B7280' }}>
                            {item.min_stock} {item.unit}
                          </div>
                        </MobileValue>
                        <MobileValue>
                          <MobileLabel>Unit Cost</MobileLabel>
                          <div style={{ color: '#0A2540' }}>
                            {formatCurrency(item.unit_cost, selectedCurrency)}
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
                      </ActionButtons>
                    </InventoryTableRow>
                  ))}
                </Table>
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
