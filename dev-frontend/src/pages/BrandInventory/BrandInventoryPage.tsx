import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
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
import GeneralStockCategoriesTab from '../RecipeManagement/GeneralStockCategoriesTab';

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
}

interface Summary {
  total_items: number;
  low_stock_count: number;
  out_of_stock_count: number;
  total_value: number;
}

// Styled Components
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

const BrandInventoryPage: React.FC = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const { defaultCurrency } = useBrandCurrency();
  const [selectedCurrency, setSelectedCurrency] = useState<string>('RM');

  // Get tab from URL, default to 'dashboard'
  const activeTab = (searchParams.get('tab') as 'dashboard' | 'list' | 'categories') || 'dashboard';

  const setActiveTab = (tab: 'dashboard' | 'list' | 'categories') => {
    setSearchParams({ tab });
  };

  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [inventory, setInventory] = useState<IngredientStock[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Categories state
  const [generalStockCategoriesCount, setGeneralStockCategoriesCount] = useState(0);

  // Modal states
  const [showReceiveModal, setShowReceiveModal] = useState(false);
  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState<IngredientStock | null>(null);
  const [quantity, setQuantity] = useState('');
  const [notes, setNotes] = useState('');

  // Inline editing
  const [editingStockId, setEditingStockId] = useState<number | null>(null);
  const [editingStockValue, setEditingStockValue] = useState('');

  const brandId = user?.brand_id;

  useEffect(() => {
    if (defaultCurrency) {
      setSelectedCurrency(defaultCurrency);
    }
  }, [defaultCurrency]);

  const fetchData = useCallback(async () => {
    if (!brandId) return;

    try {
      setLoading(true);

      // Fetch brand-level ingredients
      const ingredientsRes = await fetchAPI(`/api/brands/${brandId}/ingredients`);
      if (ingredientsRes.success) {
        const ingredients = ingredientsRes.data || [];

        // Calculate stock status for each ingredient
        const inventoryData = ingredients.map((ing: any) => {
          const currentStock = parseFloat(ing.current_stock) || 0;
          const minStock = parseFloat(ing.min_stock) || 0;

          let stockStatus = 'normal';
          if (currentStock <= 0) {
            stockStatus = 'out_of_stock';
          } else if (currentStock <= minStock) {
            stockStatus = 'low_stock';
          }

          return {
            ...ing,
            current_stock: currentStock,
            min_stock: minStock,
            stock_status: stockStatus
          };
        });

        setInventory(inventoryData);

        // Calculate summary
        const lowStockCount = inventoryData.filter((i: any) => i.stock_status === 'low_stock').length;
        const outOfStockCount = inventoryData.filter((i: any) => i.stock_status === 'out_of_stock').length;
        const totalValue = inventoryData.reduce((acc: number, i: any) =>
          acc + (parseFloat(i.current_stock) || 0) * (parseFloat(i.unit_cost) || 0), 0);

        setSummary({
          total_items: inventoryData.length,
          low_stock_count: lowStockCount,
          out_of_stock_count: outOfStockCount,
          total_value: totalValue
        });
      }
    } catch (error) {
      console.error('Failed to fetch brand inventory data:', error);
    } finally {
      setLoading(false);
    }
  }, [brandId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Get unique categories
  const categories = [...new Set(inventory.map(i => i.category).filter(Boolean))];

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.code && item.code.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || item.stock_status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'out_of_stock': return 'Out of Stock';
      case 'low_stock': return 'Low Stock';
      default: return 'Normal';
    }
  };

  const getConfidenceLabel = (confidence: string) => {
    switch (confidence) {
      case 'high': return 'High';
      case 'medium': return 'Medium';
      case 'low': return 'Low';
      default: return 'No Data';
    }
  };

  // Handle inline stock edit
  const handleStockClick = (item: IngredientStock) => {
    setEditingStockId(item.id);
    setEditingStockValue(item.current_stock.toString());
  };

  const handleStockSave = async (item: IngredientStock) => {
    if (!brandId) return;

    const newStock = parseFloat(editingStockValue);
    if (isNaN(newStock) || newStock < 0) {
      setEditingStockId(null);
      return;
    }

    try {
      const response = await fetchAPI(`/api/brands/${brandId}/ingredients/${item.id}`, {
        method: 'PUT',
        body: JSON.stringify({ current_stock: newStock })
      });

      if (response.success) {
        // Update local state
        setInventory(prev => prev.map(i =>
          i.id === item.id
            ? { ...i, current_stock: newStock, stock_status: newStock <= 0 ? 'out_of_stock' : newStock <= i.min_stock ? 'low_stock' : 'normal' }
            : i
        ));
      }
    } catch (error) {
      console.error('Failed to update stock:', error);
    }

    setEditingStockId(null);
  };

  const handleStockKeyDown = (e: React.KeyboardEvent, item: IngredientStock) => {
    if (e.key === 'Enter') {
      handleStockSave(item);
    } else if (e.key === 'Escape') {
      setEditingStockId(null);
    }
  };

  // Handle receive stock
  const openReceiveModal = (item: IngredientStock) => {
    setSelectedIngredient(item);
    setQuantity('');
    setNotes('');
    setShowReceiveModal(true);
  };

  const handleReceive = async () => {
    if (!selectedIngredient || !quantity || !brandId) return;

    try {
      const newStock = selectedIngredient.current_stock + parseFloat(quantity);
      const response = await fetchAPI(`/api/brands/${brandId}/ingredients/${selectedIngredient.id}`, {
        method: 'PUT',
        body: JSON.stringify({ current_stock: newStock })
      });

      if (response.success) {
        fetchData();
        setShowReceiveModal(false);
      }
    } catch (error) {
      console.error('Failed to receive stock:', error);
    }
  };

  // Handle adjust stock
  const openAdjustModal = (item: IngredientStock) => {
    setSelectedIngredient(item);
    setQuantity(item.current_stock.toString());
    setNotes('');
    setShowAdjustModal(true);
  };

  const handleAdjust = async () => {
    if (!selectedIngredient || !quantity || !brandId) return;

    try {
      const response = await fetchAPI(`/api/brands/${brandId}/ingredients/${selectedIngredient.id}`, {
        method: 'PUT',
        body: JSON.stringify({ current_stock: parseFloat(quantity) })
      });

      if (response.success) {
        fetchData();
        setShowAdjustModal(false);
      }
    } catch (error) {
      console.error('Failed to adjust stock:', error);
    }
  };

  if (!brandId) {
    return (
      <MainLayout>
        <Container>
          <EmptyState>
            <p>Brand not found. Please log in with a brand account.</p>
          </EmptyState>
        </Container>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Container>
        <Header>
          <Title>Inventory Management</Title>
          <ActionSection>
            <Button variant="primary" onClick={() => window.location.href = '/pos/ingredients'}>
              Manage Ingredients
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
            <Tab active={activeTab === 'categories'} onClick={() => setActiveTab('categories')}>
              Categories ({generalStockCategoriesCount})
            </Tab>
          </TabContainer>

          {loading ? (
            <EmptyState>Loading...</EmptyState>
          ) : activeTab === 'dashboard' ? (
            <>
              <InfoBox>
                Brand-level inventory management for ingredients used in your recipes. Track stock levels, receive deliveries, and adjust quantities.
              </InfoBox>

              <StatsGrid>
                <StatCard color="#635BFF">
                  <StatValue>{summary?.total_items || 0}</StatValue>
                  <StatLabel>Total Items</StatLabel>
                  <StatDescription>ingredients tracked</StatDescription>
                </StatCard>
                <StatCard color="#059669">
                  <StatValue>{formatCurrency(summary?.total_value || 0, selectedCurrency)}</StatValue>
                  <StatLabel>Total Value</StatLabel>
                  <StatDescription>inventory worth</StatDescription>
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
              </StatsGrid>

              {/* Low Stock Alert Section */}
              {(summary?.low_stock_count || 0) + (summary?.out_of_stock_count || 0) > 0 && (
                <>
                  <SectionTitle>Stock Alerts</SectionTitle>
                  <Table>
                    <InventoryTableHeader columns="2fr 1fr 1fr 1fr 120px">
                      <span>Ingredient</span>
                      <span>Status</span>
                      <span>Current</span>
                      <span>Min Stock</span>
                      <span>Actions</span>
                    </InventoryTableHeader>
                    {inventory
                      .filter(item => item.stock_status === 'low_stock' || item.stock_status === 'out_of_stock')
                      .slice(0, 5)
                      .map(item => (
                        <InventoryTableRow key={item.id} columns="2fr 1fr 1fr 1fr 120px">
                          <MobileGrid>
                            <MobileValue>
                              <StockItemInfo>
                                <StockItemImage>
                                  {item.image_url ? (
                                    <img src={item.image_url} alt={item.name} />
                                  ) : (
                                    <span style={{ fontSize: '16px', color: '#9CA3AF' }}>-</span>
                                  )}
                                </StockItemImage>
                                <StockItemDetails>
                                  <IngredientName>{item.name}</IngredientName>
                                  {item.code && <StockItemCode>{item.code}</StockItemCode>}
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
                              <MobileLabel>Current</MobileLabel>
                              <div style={{ fontWeight: 600, color: item.stock_status === 'out_of_stock' ? '#DC2626' : '#0A2540' }}>
                                {item.current_stock} {item.unit}
                              </div>
                            </MobileValue>
                            <MobileValue>
                              <MobileLabel>Min Stock</MobileLabel>
                              <div>{item.min_stock} {item.unit}</div>
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
                          </ActionButtons>
                        </InventoryTableRow>
                      ))}
                  </Table>
                </>
              )}
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
                <FilterSelect
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </FilterSelect>
              </FilterBar>

              {filteredInventory.length === 0 ? (
                <EmptyState>
                  <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                    No ingredients found
                  </div>
                  <div style={{ fontSize: '14px' }}>
                    Add ingredients in the Ingredients page to manage their stock here.
                  </div>
                </EmptyState>
              ) : (
                <Table>
                  <InventoryTableHeader columns="2fr 1fr 1fr 1fr 1fr 150px">
                    <span>Ingredient</span>
                    <span>Category</span>
                    <span>Status</span>
                    <span>Current Stock</span>
                    <span>Unit Cost</span>
                    <span>Actions</span>
                  </InventoryTableHeader>
                  {filteredInventory.map(item => (
                    <InventoryTableRow key={item.id} columns="2fr 1fr 1fr 1fr 1fr 150px">
                      <MobileGrid>
                        <MobileValue>
                          <StockItemInfo>
                            <StockItemImage>
                              {item.image_url ? (
                                <img src={item.image_url} alt={item.name} />
                              ) : (
                                <span style={{ fontSize: '16px', color: '#9CA3AF' }}>-</span>
                              )}
                            </StockItemImage>
                            <StockItemDetails>
                              <IngredientName>{item.name}</IngredientName>
                              {item.code && <StockItemCode>{item.code}</StockItemCode>}
                            </StockItemDetails>
                          </StockItemInfo>
                        </MobileValue>
                        <MobileValue>
                          <MobileLabel>Category</MobileLabel>
                          <div>{item.category || '-'}</div>
                        </MobileValue>
                        <MobileValue>
                          <MobileLabel>Status</MobileLabel>
                          <StatusBadge status={item.stock_status}>
                            {getStatusLabel(item.stock_status)}
                          </StatusBadge>
                        </MobileValue>
                        <MobileValue>
                          <MobileLabel>Current Stock</MobileLabel>
                          {editingStockId === item.id ? (
                            <InlineStockInput
                              type="number"
                              value={editingStockValue}
                              onChange={(e) => setEditingStockValue(e.target.value)}
                              onBlur={() => handleStockSave(item)}
                              onKeyDown={(e) => handleStockKeyDown(e, item)}
                              autoFocus
                            />
                          ) : (
                            <EditableStock onClick={() => handleStockClick(item)}>
                              <span style={{ fontWeight: 600, color: item.stock_status === 'out_of_stock' ? '#DC2626' : '#0A2540' }}>
                                {item.current_stock}
                              </span>
                              <span style={{ color: '#6B7280' }}>{item.unit}</span>
                            </EditableStock>
                          )}
                        </MobileValue>
                        <MobileValue>
                          <MobileLabel>Unit Cost</MobileLabel>
                          <div>{formatCurrency(item.unit_cost || 0, selectedCurrency)}</div>
                        </MobileValue>
                      </MobileGrid>
                      <ActionButtons>
                        <Button
                          variant="primary"
                          onClick={() => openReceiveModal(item)}
                          style={{ padding: '6px 10px', fontSize: '12px' }}
                        >
                          +
                        </Button>
                        <EditButton onClick={() => openAdjustModal(item)}>
                          Adjust
                        </EditButton>
                      </ActionButtons>
                    </InventoryTableRow>
                  ))}
                </Table>
              )}
            </>
          ) : activeTab === 'categories' ? (
            <GeneralStockCategoriesTab
              brandId={brandId}
              onCategoryCountChange={setGeneralStockCategoriesCount}
            />
          ) : null}
        </Content>
      </Container>

      {/* Receive Stock Modal */}
      {showReceiveModal && selectedIngredient && (
        <Modal
          isOpen={showReceiveModal}
          onClose={() => setShowReceiveModal(false)}
          title={`Receive Stock - ${selectedIngredient.name}`}
        >
          <UIFormGroup>
            <FormLabel>Current Stock</FormLabel>
            <div style={{ padding: '10px', background: '#F3F4F6', borderRadius: '6px', fontWeight: 600 }}>
              {selectedIngredient.current_stock} {selectedIngredient.unit}
            </div>
          </UIFormGroup>
          <UIFormGroup>
            <FormLabel>Quantity to Receive *</FormLabel>
            <FormInput
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder={`Enter quantity in ${selectedIngredient.unit}`}
              min="0"
              step="0.01"
            />
          </UIFormGroup>
          <UIFormGroup>
            <FormLabel>Notes</FormLabel>
            <FormInput
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Optional notes"
            />
          </UIFormGroup>
          {quantity && (
            <div style={{ padding: '12px', background: '#F0FDF4', borderRadius: '6px', marginTop: '12px' }}>
              <div style={{ fontSize: '13px', color: '#6B7280' }}>New Stock Level:</div>
              <div style={{ fontSize: '18px', fontWeight: 600, color: '#059669' }}>
                {(selectedIngredient.current_stock + parseFloat(quantity || '0')).toFixed(2)} {selectedIngredient.unit}
              </div>
            </div>
          )}
          <ButtonGroup>
            <Button variant="secondary" onClick={() => setShowReceiveModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleReceive} disabled={!quantity}>
              Receive Stock
            </Button>
          </ButtonGroup>
        </Modal>
      )}

      {/* Adjust Stock Modal */}
      {showAdjustModal && selectedIngredient && (
        <Modal
          isOpen={showAdjustModal}
          onClose={() => setShowAdjustModal(false)}
          title={`Adjust Stock - ${selectedIngredient.name}`}
        >
          <UIFormGroup>
            <FormLabel>New Stock Level *</FormLabel>
            <FormInput
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder={`Enter new quantity in ${selectedIngredient.unit}`}
              min="0"
              step="0.01"
            />
          </UIFormGroup>
          <UIFormGroup>
            <FormLabel>Reason for Adjustment</FormLabel>
            <FormInput
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g., Stock count correction, waste, etc."
            />
          </UIFormGroup>
          <ButtonGroup>
            <Button variant="secondary" onClick={() => setShowAdjustModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAdjust} disabled={!quantity}>
              Save Adjustment
            </Button>
          </ButtonGroup>
        </Modal>
      )}
    </MainLayout>
  );
};

export default BrandInventoryPage;
