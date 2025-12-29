import React, { useState, useEffect, useCallback } from 'react';
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

interface Restaurant {
  id: number;
  name: string;
  brand_id: number;
}

interface IngredientStock {
  id: number;
  name: string;
  unit: string;
  unit_cost: number;
  category: string;
  current_stock: number;
  min_stock: number;
  avg_daily_usage: number;
  prediction_confidence: 'high' | 'medium' | 'low' | 'none';
  stock_status: 'normal' | 'low_stock' | 'out_of_stock';
  restaurant_name?: string;
  restaurant_id?: number;
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
  restaurant_name?: string;
  restaurant_id?: number;
}

interface BrandSummary {
  total_restaurants: number;
  total_ingredients: number;
  low_stock_count: number;
  out_of_stock_count: number;
  expiring_count: number;
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

const RestaurantTag = styled.span`
  display: inline-block;
  padding: 2px 8px;
  background: #E0E7FF;
  color: #4338CA;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  margin-left: 8px;
`;

const BrandInventoryPage: React.FC = () => {
  const { user } = useAuth();
  const { defaultCurrency } = useBrandCurrency();
  const [selectedCurrency, setSelectedCurrency] = useState<string>('RM');
  const [activeTab, setActiveTab] = useState<'overview' | 'alerts' | 'by-restaurant'>('overview');
  const [loading, setLoading] = useState(true);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<string>('all');
  const [summary, setSummary] = useState<BrandSummary | null>(null);
  const [inventory, setInventory] = useState<IngredientStock[]>([]);
  const [expiringItems, setExpiringItems] = useState<ExpiringItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal states
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState<IngredientStock | null>(null);

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

      // Fetch restaurants under this brand
      const restaurantsRes = await fetchAPI(`/api/brands/${brandId}/restaurants`);
      if (restaurantsRes.success) {
        setRestaurants(restaurantsRes.data || []);
      }

      // Fetch brand-level inventory summary
      const summaryRes = await fetchAPI(`/api/brands/${brandId}/inventory/summary`);
      if (summaryRes.success) {
        setSummary(summaryRes.data);
      }

      // Fetch all inventory across restaurants
      const inventoryRes = await fetchAPI(`/api/brands/${brandId}/inventory`);
      if (inventoryRes.success) {
        setInventory(inventoryRes.data || []);
      }

      // Fetch expiring items across all restaurants
      const expiringRes = await fetchAPI(`/api/brands/${brandId}/inventory/expiring?days=14`);
      if (expiringRes.success) {
        setExpiringItems(expiringRes.data || []);
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

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.stock_status === statusFilter;
    const matchesRestaurant = selectedRestaurant === 'all' ||
      item.restaurant_id?.toString() === selectedRestaurant;
    return matchesSearch && matchesStatus && matchesRestaurant;
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

  const openDetailModal = (ingredient: IngredientStock) => {
    setSelectedIngredient(ingredient);
    setShowDetailModal(true);
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
          <Title>Brand Inventory</Title>
          <ActionSection>
            <FilterSelect
              value={selectedRestaurant}
              onChange={(e) => setSelectedRestaurant(e.target.value)}
              style={{ minWidth: '200px' }}
            >
              <option value="all">All Restaurants</option>
              {restaurants.map(r => (
                <option key={r.id} value={r.id.toString()}>{r.name}</option>
              ))}
            </FilterSelect>
          </ActionSection>
        </Header>

        <Content>
          <TabContainer>
            <Tab active={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>
              Overview
            </Tab>
            <Tab active={activeTab === 'alerts'} onClick={() => setActiveTab('alerts')}>
              Alerts ({(expiringItems.filter(i => i.urgency === 'expired' || i.urgency === 'critical').length) +
                (inventory.filter(i => i.stock_status === 'out_of_stock' || i.stock_status === 'low_stock').length)})
            </Tab>
            <Tab active={activeTab === 'by-restaurant'} onClick={() => setActiveTab('by-restaurant')}>
              By Restaurant
            </Tab>
          </TabContainer>

          {loading ? (
            <EmptyState>Loading...</EmptyState>
          ) : activeTab === 'overview' ? (
            <>
              <InfoBox>
                Brand-wide inventory overview showing stock levels across all your restaurants.
              </InfoBox>

              <StatsGrid>
                <StatCard color="#635BFF">
                  <StatValue>{summary?.total_restaurants || 0}</StatValue>
                  <StatLabel>Restaurants</StatLabel>
                  <StatDescription>active locations</StatDescription>
                </StatCard>
                <StatCard color="#059669">
                  <StatValue>{summary?.total_ingredients || 0}</StatValue>
                  <StatLabel>Total Items</StatLabel>
                  <StatDescription>tracked ingredients</StatDescription>
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
                <StatCard color="#EA580C">
                  <StatValue>{summary?.expiring_count || 0}</StatValue>
                  <StatLabel>Expiring Soon</StatLabel>
                  <StatDescription>within 7 days</StatDescription>
                </StatCard>
              </StatsGrid>

              <SectionTitle>Inventory Status</SectionTitle>
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
                    No inventory data found
                  </div>
                  <div style={{ fontSize: '14px' }}>
                    Inventory data from your restaurants will appear here.
                  </div>
                </EmptyState>
              ) : (
                <Table>
                  <TableHeader columns="2fr 1fr 1fr 1fr 1fr 120px">
                    <span>Ingredient</span>
                    <span>Restaurant</span>
                    <span>Status</span>
                    <span>Current Stock</span>
                    <span>Prediction</span>
                    <span>Actions</span>
                  </TableHeader>
                  {filteredInventory.slice(0, 20).map(item => (
                    <TableRow key={`${item.restaurant_id}-${item.id}`} columns="2fr 1fr 1fr 1fr 1fr 120px">
                      <MobileGrid>
                        <MobileValue>
                          <MobileLabel>Ingredient</MobileLabel>
                          <IngredientInfo>
                            <IngredientName>{item.name}</IngredientName>
                            <IngredientMeta>{item.category} - {formatCurrency(item.unit_cost, selectedCurrency)}/{item.unit}</IngredientMeta>
                          </IngredientInfo>
                        </MobileValue>
                        <MobileValue>
                          <MobileLabel>Restaurant</MobileLabel>
                          <div style={{ fontSize: '13px', color: '#4338CA' }}>
                            {item.restaurant_name || '-'}
                          </div>
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
                          <MobileLabel>Prediction</MobileLabel>
                          <ConfidenceBadge level={item.prediction_confidence || 'none'}>
                            {getConfidenceLabel(item.prediction_confidence || 'none')}
                          </ConfidenceBadge>
                        </MobileValue>
                      </MobileGrid>
                      <ActionButtons>
                        <Button
                          variant="secondary"
                          onClick={() => openDetailModal(item)}
                          style={{ padding: '6px 12px', fontSize: '13px' }}
                        >
                          View
                        </Button>
                      </ActionButtons>
                    </TableRow>
                  ))}
                </Table>
              )}
            </>
          ) : activeTab === 'alerts' ? (
            <>
              <InfoBox>
                Stock alerts and expiring items across all your restaurants.
              </InfoBox>

              {/* Low Stock / Out of Stock Alerts */}
              {inventory.filter(i => i.stock_status === 'out_of_stock' || i.stock_status === 'low_stock').length > 0 && (
                <>
                  <SectionTitle>Stock Alerts</SectionTitle>
                  <div>
                    {inventory
                      .filter(i => i.stock_status === 'out_of_stock' || i.stock_status === 'low_stock')
                      .slice(0, 10)
                      .map(item => (
                        <ExpiryAlertCard
                          key={`stock-${item.restaurant_id}-${item.id}`}
                          urgency={item.stock_status === 'out_of_stock' ? 'expired' : 'warning'}
                        >
                          <AlertInfo>
                            <AlertTitle>
                              {item.name}
                              <RestaurantTag>{item.restaurant_name}</RestaurantTag>
                            </AlertTitle>
                            <AlertDetail>
                              Current: {item.current_stock} {item.unit} / Min: {item.min_stock} {item.unit}
                            </AlertDetail>
                          </AlertInfo>
                          <StatusBadge status={item.stock_status}>
                            {getStatusLabel(item.stock_status)}
                          </StatusBadge>
                        </ExpiryAlertCard>
                      ))}
                  </div>
                </>
              )}

              {/* Expiring Items */}
              {expiringItems.length > 0 && (
                <>
                  <SectionTitle>Expiring Items</SectionTitle>
                  <div>
                    {expiringItems.slice(0, 10).map(item => (
                      <ExpiryAlertCard key={item.id} urgency={item.urgency}>
                        <AlertInfo>
                          <AlertTitle>
                            {item.ingredient_name}
                            {item.batch_number && (
                              <span style={{ fontSize: '12px', color: '#6B7280', marginLeft: '8px' }}>
                                Batch: {item.batch_number}
                              </span>
                            )}
                            <RestaurantTag>{item.restaurant_name}</RestaurantTag>
                          </AlertTitle>
                          <AlertDetail>
                            {item.remaining_quantity} {item.unit} remaining - Expires: {new Date(item.expiry_date).toLocaleDateString()}
                          </AlertDetail>
                        </AlertInfo>
                        <ExpiryBadge urgency={item.urgency}>
                          {item.urgency === 'expired' ? 'EXPIRED' :
                           item.urgency === 'critical' ? `${item.days_until_expiry}d LEFT` :
                           item.urgency === 'warning' ? `${item.days_until_expiry} DAYS` :
                           `${item.days_until_expiry} days`}
                        </ExpiryBadge>
                      </ExpiryAlertCard>
                    ))}
                  </div>
                </>
              )}

              {inventory.filter(i => i.stock_status !== 'normal').length === 0 && expiringItems.length === 0 && (
                <EmptyState>
                  <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                    No alerts
                  </div>
                  <div style={{ fontSize: '14px' }}>
                    All inventory levels are healthy across your restaurants.
                  </div>
                </EmptyState>
              )}
            </>
          ) : (
            <>
              <InfoBox>
                View inventory breakdown by individual restaurant.
              </InfoBox>

              {restaurants.map(restaurant => {
                const restaurantInventory = inventory.filter(i => i.restaurant_id === restaurant.id);
                const lowStockCount = restaurantInventory.filter(i => i.stock_status === 'low_stock').length;
                const outOfStockCount = restaurantInventory.filter(i => i.stock_status === 'out_of_stock').length;

                return (
                  <div key={restaurant.id} style={{ marginBottom: '32px' }}>
                    <SectionTitle style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {restaurant.name}
                      {outOfStockCount > 0 && (
                        <StatusBadge status="out_of_stock">{outOfStockCount} Out</StatusBadge>
                      )}
                      {lowStockCount > 0 && (
                        <StatusBadge status="low_stock">{lowStockCount} Low</StatusBadge>
                      )}
                    </SectionTitle>

                    {restaurantInventory.length === 0 ? (
                      <div style={{ color: '#6B7280', fontSize: '14px', padding: '16px 0' }}>
                        No inventory data for this restaurant.
                      </div>
                    ) : (
                      <Table>
                        <TableHeader columns="2fr 1fr 1fr 1fr 100px">
                          <span>Ingredient</span>
                          <span>Status</span>
                          <span>Current Stock</span>
                          <span>Min Stock</span>
                          <span>Actions</span>
                        </TableHeader>
                        {restaurantInventory.slice(0, 10).map(item => (
                          <TableRow key={item.id} columns="2fr 1fr 1fr 1fr 100px">
                            <MobileGrid>
                              <MobileValue>
                                <MobileLabel>Ingredient</MobileLabel>
                                <IngredientInfo>
                                  <IngredientName>{item.name}</IngredientName>
                                  <IngredientMeta>{item.category}</IngredientMeta>
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
                                <div style={{ fontWeight: 600 }}>
                                  {item.current_stock} {item.unit}
                                </div>
                              </MobileValue>
                              <MobileValue>
                                <MobileLabel>Min Stock</MobileLabel>
                                <div style={{ color: '#6B7280' }}>
                                  {item.min_stock} {item.unit}
                                </div>
                              </MobileValue>
                            </MobileGrid>
                            <ActionButtons>
                              <Button
                                variant="secondary"
                                onClick={() => window.location.href = `/restaurant/${restaurant.id}/inventory`}
                                style={{ padding: '6px 12px', fontSize: '12px' }}
                              >
                                Manage
                              </Button>
                            </ActionButtons>
                          </TableRow>
                        ))}
                      </Table>
                    )}
                  </div>
                );
              })}
            </>
          )}
        </Content>
      </Container>

      {/* Detail Modal */}
      <Modal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        title={`Inventory Detail: ${selectedIngredient?.name || ''}`}
        size="medium"
      >
        {selectedIngredient && (
          <>
            <div style={{ marginBottom: '16px' }}>
              <UIFormGroup>
                <FormLabel>Restaurant</FormLabel>
                <FormInput type="text" value={selectedIngredient.restaurant_name || '-'} disabled />
              </UIFormGroup>
              <UIFormGroup>
                <FormLabel>Category</FormLabel>
                <FormInput type="text" value={selectedIngredient.category} disabled />
              </UIFormGroup>
              <UIFormGroup>
                <FormLabel>Current Stock</FormLabel>
                <FormInput type="text" value={`${selectedIngredient.current_stock} ${selectedIngredient.unit}`} disabled />
              </UIFormGroup>
              <UIFormGroup>
                <FormLabel>Minimum Stock</FormLabel>
                <FormInput type="text" value={`${selectedIngredient.min_stock} ${selectedIngredient.unit}`} disabled />
              </UIFormGroup>
              <UIFormGroup>
                <FormLabel>Unit Cost</FormLabel>
                <FormInput type="text" value={formatCurrency(selectedIngredient.unit_cost, selectedCurrency)} disabled />
              </UIFormGroup>
              <UIFormGroup>
                <FormLabel>Avg. Daily Usage</FormLabel>
                <FormInput type="text" value={`${selectedIngredient.avg_daily_usage?.toFixed(2) || '0'} ${selectedIngredient.unit}/day`} disabled />
              </UIFormGroup>
              <UIFormGroup>
                <FormLabel>Prediction Confidence</FormLabel>
                <div style={{ marginTop: '8px' }}>
                  <ConfidenceBadge level={selectedIngredient.prediction_confidence || 'none'}>
                    {getConfidenceLabel(selectedIngredient.prediction_confidence || 'none')}
                  </ConfidenceBadge>
                </div>
              </UIFormGroup>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <ModalButton variant="secondary" onClick={() => setShowDetailModal(false)}>
                Close
              </ModalButton>
              <ModalButton
                variant="primary"
                onClick={() => window.location.href = `/restaurant/${selectedIngredient.restaurant_id}/inventory`}
              >
                Go to Restaurant Inventory
              </ModalButton>
            </div>
          </>
        )}
      </Modal>
    </MainLayout>
  );
};

export default BrandInventoryPage;
