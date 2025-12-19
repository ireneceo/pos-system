import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import MainLayout from '../../components/Layout/MainLayout';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import {
  Container,
  Header,
  Title,
  ActionSection
} from '../../components/UI';
import { useAuth } from '../../contexts/AuthContext';
import { useBrandCurrency } from '../../hooks/useBrandCurrency';
import { formatCurrency } from '../../utils/currency';
import { fetchAPI } from '../../utils/api';

interface StockTakeItem {
  id: number;
  ingredient_id: number;
  theoretical_stock: number;
  actual_stock: number | null;
  variance: number | null;
  unit_cost: number;
  variance_value: number | null;
  variance_reason: string | null;
  notes: string | null;
  ingredient: {
    id: number;
    name: string;
    unit: string;
    category: string;
  };
}

interface StockTake {
  id: number;
  stock_take_date: string;
  status: 'in_progress' | 'completed' | 'cancelled';
  total_items: number;
  items_with_variance: number;
  total_variance_value: number | null;
  variance_percentage: number | null;
  items: StockTakeItem[];
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

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #E5E7EB;
  border-radius: 4px;
  margin: 16px 0;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ percentage: number }>`
  width: ${props => props.percentage}%;
  height: 100%;
  background: #635BFF;
  transition: width 0.3s ease;
`;

const ProgressText = styled.div`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 8px;
`;

const StockTable = styled.table`
  width: 100%;
  border-collapse: collapse;
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

  tr:hover {
    background: #F9FAFB;
  }
`;

const StockInput = styled.input`
  width: 100px;
  padding: 8px 12px;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const ReasonSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  font-size: 14px;
  min-width: 120px;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`;

const VarianceCell = styled.td<{ variance: number | null }>`
  color: ${props => {
    if (props.variance === null || props.variance === 0) return '#0A2540';
    return props.variance > 0 ? '#059669' : '#DC2626';
  }};
  font-weight: 600;
`;

const SummaryCard = styled.div`
  display: flex;
  gap: 24px;
  padding: 20px;
  background: #F9FAFB;
  border-radius: 8px;
  margin-top: 24px;
`;

const SummaryItem = styled.div`
  text-align: center;
`;

const SummaryLabel = styled.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
`;

const SummaryValue = styled.div<{ color?: string }>`
  font-size: 20px;
  font-weight: 600;
  color: ${props => props.color || '#0A2540'};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
`;

const EmptyTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`;

const EmptyDescription = styled.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
`;

const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
`;

const HistoryCard = styled.div<{ status: string }>`
  padding: 16px 20px;
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    border-color: #635BFF;
  }
`;

const HistoryInfo = styled.div``;

const HistoryDate = styled.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`;

const HistoryMeta = styled.div`
  font-size: 13px;
  color: #6B7280;
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;

  ${props => {
    switch (props.status) {
      case 'completed':
        return 'background: #D1FAE5; color: #059669;';
      case 'cancelled':
        return 'background: #FEE2E2; color: #DC2626;';
      default:
        return 'background: #FEF3C7; color: #D97706;';
    }
  }}
`;

const CategoryHeader = styled.tr`
  background: #F3F4F6 !important;

  td {
    font-weight: 600;
    color: #374151;
    padding: 10px 16px;
  }
`;

const StockTakePage: React.FC = () => {
  const { user } = useAuth();
  const { defaultCurrency } = useBrandCurrency();
  const [selectedCurrency, setSelectedCurrency] = useState<string>('MYR');
  const [loading, setLoading] = useState(true);
  const [currentStockTake, setCurrentStockTake] = useState<StockTake | null>(null);
  const [stockTakeHistory, setStockTakeHistory] = useState<StockTake[]>([]);
  const [localItems, setLocalItems] = useState<StockTakeItem[]>([]);
  const [saving, setSaving] = useState(false);

  const restaurantId = user?.restaurant_id;

  useEffect(() => {
    if (defaultCurrency) {
      setSelectedCurrency(defaultCurrency);
    }
  }, [defaultCurrency]);

  const fetchStockTakes = useCallback(async () => {
    if (!restaurantId) return;

    try {
      setLoading(true);
      const response = await fetchAPI(`/api/restaurants/${restaurantId}/stock-takes?limit=20`);

      if (response.success) {
        const stockTakes = response.data;
        setStockTakeHistory(stockTakes);

        // Find in-progress stock take
        const inProgress = stockTakes.find((st: StockTake) => st.status === 'in_progress');
        if (inProgress) {
          // Fetch full details
          const detailResponse = await fetchAPI(`/api/restaurants/${restaurantId}/stock-takes/${inProgress.id}`);
          if (detailResponse.success) {
            setCurrentStockTake(detailResponse.data);
            setLocalItems(detailResponse.data.items || []);
          }
        } else {
          setCurrentStockTake(null);
          setLocalItems([]);
        }
      }
    } catch (error) {
      console.error('Failed to fetch stock takes:', error);
    } finally {
      setLoading(false);
    }
  }, [restaurantId]);

  useEffect(() => {
    fetchStockTakes();
  }, [fetchStockTakes]);

  const handleStartStockTake = async () => {
    if (!restaurantId) return;

    try {
      setLoading(true);
      const response = await fetchAPI(`/api/restaurants/${restaurantId}/stock-takes`, {
        method: 'POST'
      });

      if (response.success) {
        setCurrentStockTake(response.data);
        setLocalItems(response.data.items || []);
      } else {
        alert(response.message || 'Failed to start stock take');
      }
    } catch (error) {
      console.error('Failed to start stock take:', error);
      alert('Failed to start stock take');
    } finally {
      setLoading(false);
    }
  };

  const handleItemChange = (itemId: number, field: string, value: string | number | null) => {
    setLocalItems(prev => prev.map(item => {
      if (item.id === itemId) {
        const updated = { ...item, [field]: value };

        // Calculate variance if actual_stock is set
        if (field === 'actual_stock' && value !== null && value !== '') {
          const actualStock = parseFloat(value as string);
          updated.actual_stock = actualStock;
          updated.variance = parseFloat(String(item.theoretical_stock)) - actualStock;
          updated.variance_value = updated.variance * parseFloat(String(item.unit_cost));
        }

        return updated;
      }
      return item;
    }));
  };

  const handleSaveProgress = async () => {
    if (!currentStockTake || !restaurantId) return;

    try {
      setSaving(true);
      const itemsToSave = localItems
        .filter(item => item.actual_stock !== null)
        .map(item => ({
          id: item.id,
          actual_stock: item.actual_stock,
          variance_reason: item.variance_reason,
          notes: item.notes
        }));

      const response = await fetchAPI(
        `/api/restaurants/${restaurantId}/stock-takes/${currentStockTake.id}/items`,
        {
          method: 'PUT',
          body: JSON.stringify({ items: itemsToSave })
        }
      );

      if (response.success) {
        alert('Progress saved');
      } else {
        alert(response.message || 'Failed to save progress');
      }
    } catch (error) {
      console.error('Failed to save progress:', error);
      alert('Failed to save progress');
    } finally {
      setSaving(false);
    }
  };

  const handleComplete = async () => {
    if (!currentStockTake || !restaurantId) return;

    const uncountedItems = localItems.filter(item => item.actual_stock === null);
    if (uncountedItems.length > 0) {
      alert(`Please count all items. ${uncountedItems.length} items remaining.`);
      return;
    }

    if (!window.confirm('Complete this stock take? This will update all stock levels to the counted values.')) {
      return;
    }

    try {
      setSaving(true);

      // Save all items first
      const itemsToSave = localItems.map(item => ({
        id: item.id,
        actual_stock: item.actual_stock,
        variance_reason: item.variance_reason,
        notes: item.notes
      }));

      await fetchAPI(
        `/api/restaurants/${restaurantId}/stock-takes/${currentStockTake.id}/items`,
        {
          method: 'PUT',
          body: JSON.stringify({ items: itemsToSave })
        }
      );

      // Complete the stock take
      const response = await fetchAPI(
        `/api/restaurants/${restaurantId}/stock-takes/${currentStockTake.id}/complete`,
        { method: 'POST' }
      );

      if (response.success) {
        alert('Stock take completed successfully');
        fetchStockTakes();
      } else {
        alert(response.message || 'Failed to complete stock take');
      }
    } catch (error) {
      console.error('Failed to complete stock take:', error);
      alert('Failed to complete stock take');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = async () => {
    if (!currentStockTake || !restaurantId) return;

    if (!window.confirm('Cancel this stock take? All entered data will be lost.')) {
      return;
    }

    try {
      const response = await fetchAPI(
        `/api/restaurants/${restaurantId}/stock-takes/${currentStockTake.id}/cancel`,
        { method: 'POST' }
      );

      if (response.success) {
        fetchStockTakes();
      } else {
        alert(response.message || 'Failed to cancel stock take');
      }
    } catch (error) {
      console.error('Failed to cancel stock take:', error);
      alert('Failed to cancel stock take');
    }
  };

  // Calculate progress
  const countedItems = localItems.filter(item => item.actual_stock !== null).length;
  const totalItems = localItems.length;
  const progressPercentage = totalItems > 0 ? (countedItems / totalItems) * 100 : 0;

  // Calculate variance summary
  const totalVariance = localItems.reduce((sum, item) => sum + (parseFloat(String(item.variance_value)) || 0), 0);
  const itemsWithVariance = localItems.filter(item => item.variance !== null && item.variance !== 0).length;

  // Group items by category
  const groupedItems = localItems.reduce((acc, item) => {
    const category = item.ingredient?.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {} as Record<string, StockTakeItem[]>);

  if (!restaurantId) {
    return (
      <MainLayout>
        <Container>
          <EmptyState>
            <EmptyTitle>Access Denied</EmptyTitle>
            <EmptyDescription>Please log in with a restaurant account.</EmptyDescription>
          </EmptyState>
        </Container>
      </MainLayout>
    );
  }

  if (loading) {
    return (
      <MainLayout>
        <Container>
          <Header>
            <Title>Stock Take</Title>
          </Header>
          <EmptyState>
            <EmptyDescription>Loading...</EmptyDescription>
          </EmptyState>
        </Container>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Container>
        <Header>
          <Title>Stock Take</Title>
          <ActionSection>
            <ThemedButton
              variant="secondary"
              onClick={() => window.location.href = `/restaurants/${restaurantId}/inventory`}
            >
              Back to Inventory
            </ThemedButton>
          </ActionSection>
        </Header>

        {currentStockTake ? (
          <>
            <InfoBox>
              Measure and enter the actual quantity of each ingredient.
              When completed, your stock levels will be updated to match the counted values.
              Any difference between theoretical and actual stock will be recorded as Loss.
            </InfoBox>

            <ProgressText>
              Progress: {countedItems} / {totalItems} items counted
            </ProgressText>
            <ProgressBar>
              <ProgressFill percentage={progressPercentage} />
            </ProgressBar>

            <StockTable>
              <thead>
                <tr>
                  <th>Ingredient</th>
                  <th>Unit</th>
                  <th>Theoretical Stock</th>
                  <th>Actual Stock</th>
                  <th>Variance</th>
                  <th>Reason</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(groupedItems).map(([category, items]) => (
                  <React.Fragment key={category}>
                    <CategoryHeader>
                      <td colSpan={6}>{category}</td>
                    </CategoryHeader>
                    {items.map(item => (
                      <tr key={item.id}>
                        <td>{item.ingredient?.name || '-'}</td>
                        <td>{item.ingredient?.unit || '-'}</td>
                        <td>{item.theoretical_stock}</td>
                        <td>
                          <StockInput
                            type="number"
                            step="0.01"
                            value={item.actual_stock ?? ''}
                            onChange={(e) => handleItemChange(item.id, 'actual_stock', e.target.value)}
                            placeholder="Enter"
                          />
                        </td>
                        <VarianceCell variance={item.variance}>
                          {item.variance !== null ? (
                            <>
                              {item.variance > 0 ? '+' : ''}{item.variance.toFixed(2)} {item.ingredient?.unit}
                              {item.variance_value !== null && (
                                <span style={{ display: 'block', fontSize: '12px' }}>
                                  ({formatCurrency(Math.abs(item.variance_value), selectedCurrency)})
                                </span>
                              )}
                            </>
                          ) : '-'}
                        </VarianceCell>
                        <td>
                          {item.variance !== null && item.variance !== 0 && (
                            <ReasonSelect
                              value={item.variance_reason || ''}
                              onChange={(e) => handleItemChange(item.id, 'variance_reason', e.target.value || null)}
                            >
                              <option value="">Select...</option>
                              <option value="waste">Waste</option>
                              <option value="breakage">Breakage</option>
                              <option value="recipe_variance">Recipe Variance</option>
                              <option value="unrecorded">Unrecorded Use</option>
                              <option value="measurement">Measurement Error</option>
                              <option value="other">Other</option>
                            </ReasonSelect>
                          )}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </StockTable>

            <SummaryCard>
              <SummaryItem>
                <SummaryLabel>Items Counted</SummaryLabel>
                <SummaryValue>{countedItems} / {totalItems}</SummaryValue>
              </SummaryItem>
              <SummaryItem>
                <SummaryLabel>Items with Variance</SummaryLabel>
                <SummaryValue color="#D97706">{itemsWithVariance}</SummaryValue>
              </SummaryItem>
              <SummaryItem>
                <SummaryLabel>Total Loss Value</SummaryLabel>
                <SummaryValue color={totalVariance < 0 ? '#DC2626' : '#059669'}>
                  {formatCurrency(Math.abs(totalVariance), selectedCurrency)}
                </SummaryValue>
              </SummaryItem>
            </SummaryCard>

            <ButtonGroup>
              <ThemedButton variant="secondary" onClick={handleCancel} disabled={saving}>
                Cancel
              </ThemedButton>
              <ThemedButton variant="secondary" onClick={handleSaveProgress} disabled={saving}>
                {saving ? 'Saving...' : 'Save Progress'}
              </ThemedButton>
              <ThemedButton variant="primary" onClick={handleComplete} disabled={saving || countedItems < totalItems}>
                {saving ? 'Processing...' : 'Complete Stock Take'}
              </ThemedButton>
            </ButtonGroup>
          </>
        ) : (
          <>
            <EmptyState>
              <EmptyTitle>Start a New Stock Take</EmptyTitle>
              <EmptyDescription>
                Count your physical inventory and compare it with the system records.
                This helps identify loss and keep your stock levels accurate.
              </EmptyDescription>
              <ThemedButton variant="primary" onClick={handleStartStockTake}>
                Start Stock Take
              </ThemedButton>
            </EmptyState>

            {stockTakeHistory.length > 0 && (
              <>
                <Title style={{ fontSize: '18px', marginTop: '48px' }}>Previous Stock Takes</Title>
                <HistoryList>
                  {stockTakeHistory.filter(st => st.status !== 'in_progress').map(st => (
                    <HistoryCard key={st.id} status={st.status}>
                      <HistoryInfo>
                        <HistoryDate>{new Date(st.stock_take_date).toLocaleDateString()}</HistoryDate>
                        <HistoryMeta>
                          {st.total_items} items |
                          {st.items_with_variance > 0 && ` ${st.items_with_variance} with variance |`}
                          {st.total_variance_value !== null && ` Loss: ${formatCurrency(Math.abs(st.total_variance_value), selectedCurrency)}`}
                        </HistoryMeta>
                      </HistoryInfo>
                      <StatusBadge status={st.status}>
                        {st.status === 'completed' ? 'Completed' : 'Cancelled'}
                      </StatusBadge>
                    </HistoryCard>
                  ))}
                </HistoryList>
              </>
            )}
          </>
        )}
      </Container>
    </MainLayout>
  );
};

export default StockTakePage;
