import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { EmptyState } from '../../components/UI/TableComponents';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import {
  Container,
  Header,
  Title,
  ActionSection,
  Content,
  Button
} from '../../components/UI';
import { useAuth } from '../../contexts/AuthContext';
import { useBrandCurrency } from '../../hooks/useBrandCurrency';
import { formatCurrency } from '../../utils/currency';
import { fetchAPI } from '../../utils/api';
import ConfirmModal from '../../components/ConfirmModal';
import { useTranslation } from 'react-i18next';
import { formatDate as formatDateTz } from '../../utils/timezone';

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
    owner_type?: 'brand' | 'restaurant' | 'foodcourt';  // brand = 브랜드 표준 재료(정의는 브랜드 소유)
    base_quantity?: number | string;  // unit_cost 는 이 양의 가격 — 금액 계산 때 나눈다
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
  background: #C7CED6;
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
  color: #4B5563;
  margin-bottom: 8px;
`;

const StockTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #C7CED6;

  th, td {
    padding: 12px 16px;
    text-align: left;
    border-bottom: 1px solid #C7CED6;
  }

  th {
    background: #F9FAFB;
    font-weight: 600;
    font-size: 13px;
    color: #1F2937;
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
  border: 1px solid #6B7280;
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
  border: 1px solid #6B7280;
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
  color: #4B5563;
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


const EmptyTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 12px;
`;

const EmptyDescription = styled.p`
  font-size: 14px;
  color: #4B5563;
  margin-bottom: 24px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const GuideBox = styled.div`
  background: #F0FDF4;
  border: 1px solid #BBF7D0;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 24px;
`;

const GuideTitle = styled.h4`
  font-size: 15px;
  font-weight: 600;
  color: #166534;
  margin-bottom: 12px;
`;

const GuideList = styled.ol`
  margin: 0;
  padding-left: 20px;
  color: #166534;
  font-size: 14px;
  line-height: 1.8;
`;

const GuideStep = styled.li`
  margin-bottom: 4px;
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
  border: 1px solid #C7CED6;
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
  color: #4B5563;
`;

/** 브랜드 표준 재료 표식 — 실사 수량은 이 매장 것이지만 재료 정의는 브랜드 소유. */
const BrandTag = styled.span`
  display: inline-flex;
  align-items: center;
  margin-left: 6px;
  padding: 1px 6px;
  border-radius: 999px;
  background: #F3F4F6;
  color: #4B5563;
  font-size: 10px;
  font-weight: 700;
  vertical-align: middle;
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
  background: #F1F4F8 !important;

  td {
    font-weight: 600;
    color: #1F2937;
    padding: 10px 16px;
  }
`;

// mode='brand' = 본사 창고(BG 재고아이템) 실사 — 같은 화면, 서버만 /api/product-ingredients/stock-takes (2026-10-08)
const StockTakePage: React.FC<{ mode?: 'restaurant' | 'brand' }> = ({ mode = 'restaurant' }) => {
  const { t } = useTranslation('inventory');
  const { user } = useAuth();
  // 실사 확정·취소는 매니저 이상(서버 requireStockManager 와 같은 기준) — Staff 는 입력·중간 저장까지
  const canFinalize = user?.role !== 'Staff';
  const { restaurantId: urlRestaurantId } = useParams<{ restaurantId: string }>();
  const { defaultCurrency } = useBrandCurrency();
  const [selectedCurrency, setSelectedCurrency] = useState<string>('RM');
  const [loading, setLoading] = useState(true);
  const [currentStockTake, setCurrentStockTake] = useState<StockTake | null>(null);
  const [stockTakeHistory, setStockTakeHistory] = useState<StockTake[]>([]);
  const [localItems, setLocalItems] = useState<StockTakeItem[]>([]);
  const [saving, setSaving] = useState(false);

  // ConfirmModal states
  const [showCompleteConfirm, setShowCompleteConfirm] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  // URL 파라미터 우선, 없으면 user의 restaurant_id 사용
  const restaurantId = urlRestaurantId ? parseInt(urlRestaurantId, 10) : user?.restaurant_id;
  const isBrand = mode === 'brand';
  // 화면 진입 가능 여부 — 매장 실사는 매장이 있어야, 본사 실사는 계정만 있으면
  const scopeId = isBrand ? (user?.id ?? null) : restaurantId;
  const apiBase = isBrand ? '/api/product-ingredients/stock-takes' : `/api/restaurants/${restaurantId}/stock-takes`;
  // 부분 실사(2026-10-08) — 고른 분류만 센다. 비우면 전체
  const [categories, setCategories] = useState<Array<{ id: number; name: string }>>([]);
  const [pickedCategories, setPickedCategories] = useState<number[]>([]);
  const [lastResult, setLastResult] = useState<{ skipped: number; moved: number } | null>(null);

  useEffect(() => {
    if (defaultCurrency) {
      setSelectedCurrency(defaultCurrency);
    }
  }, [defaultCurrency]);

  const fetchStockTakes = useCallback(async () => {
    if (!scopeId) return;

    try {
      setLoading(true);
      const response = await fetchAPI(isBrand ? apiBase : `${apiBase}?limit=20`);

      if (response.success) {
        const stockTakes = response.data;
        setStockTakeHistory(stockTakes);

        // Find in-progress stock take
        const inProgress = stockTakes.find((st: StockTake) => st.status === 'in_progress');
        if (inProgress) {
          // Fetch full details
          const detailResponse = await fetchAPI(`${apiBase}/${inProgress.id}`);
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
  }, [scopeId, apiBase, isBrand]);

  useEffect(() => {
    fetchStockTakes();
  }, [fetchStockTakes]);

  // 부분 실사용 분류 목록
  useEffect(() => {
    if (!scopeId) return;
    const url = isBrand ? '/api/product-ingredient-categories' : `/api/restaurants/${restaurantId}/ingredient-categories`;
    fetchAPI(url).then((r: any) => {
      const d = r?.data;
      const list = Array.isArray(d) ? d : [...(d?.own_categories || []), ...(d?.brand_categories || [])];
      setCategories(list.filter((c: any) => c && c.id).map((c: any) => ({ id: c.id, name: c.name })));
    }).catch(() => { /* 분류를 못 불러오면 전체 실사만 */ });
  }, [scopeId, isBrand, restaurantId]);

  const handleStartStockTake = async () => {
    if (!scopeId) return;

    try {
      setLoading(true);
      setLastResult(null);
      const response = await fetchAPI(apiBase, {
        method: 'POST',
        body: JSON.stringify(pickedCategories.length ? { category_ids: pickedCategories } : {})
      });

      if (response.success) {
        setCurrentStockTake(response.data);
        setLocalItems(response.data.items || []);
      }
    } catch (error) {
      console.error('Failed to start stock take:', error);
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
          // unit_cost = 기준양의 가격 → 취급단위 1 의 값으로 나눠 곱한다(서버 계산과 같은 식)
          const baseQty = parseFloat(String(item.ingredient?.base_quantity ?? 1)) || 1;
          updated.variance_value = updated.variance * (parseFloat(String(item.unit_cost)) / baseQty);
        }

        return updated;
      }
      return item;
    }));
  };

  const handleSaveProgress = async () => {
    if (!currentStockTake || !scopeId) return;

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

      await fetchAPI(
        `${apiBase}/${currentStockTake.id}/items`,
        {
          method: 'PUT',
          body: JSON.stringify({ items: itemsToSave })
        }
      );

      // Progress saved silently
    } catch (error) {
      console.error('Failed to save progress:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleComplete = () => {
    if (!currentStockTake || !scopeId) return;

    // 센 항목만 반영된다(안 센 항목은 그대로) — 하나도 안 셌으면 확정할 것이 없다
    if (!localItems.some(item => item.actual_stock !== null)) return;

    setShowCompleteConfirm(true);
  };

  const confirmComplete = async () => {
    if (!currentStockTake || !scopeId) return;
    setShowCompleteConfirm(false);

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
        `${apiBase}/${currentStockTake.id}/items`,
        {
          method: 'PUT',
          body: JSON.stringify({ items: itemsToSave })
        }
      );

      // Complete the stock take
      const response = await fetchAPI(
        `${apiBase}/${currentStockTake.id}/complete`,
        { method: 'POST' }
      );

      if (response.success) {
        setLastResult({ skipped: Number((response as any).skipped_count) || 0, moved: ((response as any).movement_since_start || []).length });
        fetchStockTakes();
      }
    } catch (error) {
      console.error('Failed to complete stock take:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (!currentStockTake || !scopeId) return;
    setShowCancelConfirm(true);
  };

  const confirmCancel = async () => {
    if (!currentStockTake || !scopeId) return;
    setShowCancelConfirm(false);

    try {
      const response = await fetchAPI(
        `${apiBase}/${currentStockTake.id}/cancel`,
        { method: 'POST' }
      );

      if (response.success) {
        fetchStockTakes();
      }
    } catch (error) {
      console.error('Failed to cancel stock take:', error);
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

  if (!scopeId) {
    return (
      <>
        <Container>
          <EmptyState>
            <EmptyTitle>{t('inventory:stockTakePage.accessDenied')}</EmptyTitle>
            <EmptyDescription>{t('inventory:stockTakePage.pleaseLogInWithARestaurantAccount')}</EmptyDescription>
          </EmptyState>
        </Container>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <Container>
          <Header>
            <Title>{t('inventory:stockTakePage.stockTake')}</Title>
          </Header>
          <EmptyState>
            <EmptyDescription>{t('inventory:stockTakePage.loading')}</EmptyDescription>
          </EmptyState>
        </Container>
      </>
    );
  }

  return (
    <>
      <Container>
        <Header>
          <Title>{t('inventory:stockTakePage.stockTake')}</Title>
          <ActionSection>
            <Button
              variant="secondary"
              onClick={() => window.location.href = isBrand ? '/pos/brand-inventory' : `/restaurant/${restaurantId}/inventory`}
            >
              Back to Inventory
            </Button>
          </ActionSection>
        </Header>

        <Content>
          {currentStockTake ? (
            <>
              <GuideBox>
                <GuideTitle>{t('inventory:stockTakePage.howToCompleteStockTake')}</GuideTitle>
                <GuideList>
                  <GuideStep>{t('inventory:stockTakePage.physicallyCountEachIngredientInYourInventory')}</GuideStep>
                  <GuideStep>Enter the actual quantity in the "Actual Stock" column</GuideStep>
                  <GuideStep>{t('inventory:stockTakePage.ifTheresAVarianceSelectAReasonFromTheDropdown')}</GuideStep>
                  <GuideStep>Click "Save Progress" to save your work and continue later</GuideStep>
                  <GuideStep>{t('inventory:stockTakePage.completeCountedOnly')}</GuideStep>
                </GuideList>
              </GuideBox>

              <InfoBox>
                The "Theoretical Stock" shows what the system expects based on purchases and sales.
                Any difference between theoretical and actual stock will be recorded as loss/gain.
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
                  <th>{t('inventory:stockTakePage.ingredient')}</th>
                  <th>{t('inventory:stockTakePage.unit')}</th>
                  <th>{t('inventory:stockTakePage.theoreticalStock')}</th>
                  <th>{t('inventory:stockTakePage.actualStock')}</th>
                  <th>{t('inventory:stockTakePage.variance')}</th>
                  <th>{t('inventory:stockTakePage.reason')}</th>
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
                        <td>
                          {item.ingredient?.name || '-'}
                          {item.ingredient?.owner_type === 'brand' && (
                            <BrandTag title="Stock item defined by your brand">Brand</BrandTag>
                          )}
                        </td>
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
                              <option value="">{t('inventory:stockTakePage.select')}</option>
                              <option value="waste">{t('inventory:stockTakePage.waste')}</option>
                              <option value="breakage">{t('inventory:stockTakePage.breakage')}</option>
                              <option value="recipe_variance">{t('inventory:stockTakePage.recipeVariance')}</option>
                              <option value="unrecorded">{t('inventory:stockTakePage.unrecordedUse')}</option>
                              <option value="measurement">{t('inventory:stockTakePage.measurementError')}</option>
                              <option value="other">{t('inventory:stockTakePage.other')}</option>
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
                <SummaryLabel>{t('inventory:stockTakePage.itemsCounted')}</SummaryLabel>
                <SummaryValue>{countedItems} / {totalItems}</SummaryValue>
              </SummaryItem>
              <SummaryItem>
                <SummaryLabel>{t('inventory:stockTakePage.itemsWithVariance')}</SummaryLabel>
                <SummaryValue color="#D97706">{itemsWithVariance}</SummaryValue>
              </SummaryItem>
              <SummaryItem>
                <SummaryLabel>{t('inventory:stockTakePage.totalLossValue')}</SummaryLabel>
                <SummaryValue color={totalVariance < 0 ? '#DC2626' : '#059669'}>
                  {formatCurrency(Math.abs(totalVariance), selectedCurrency)}
                </SummaryValue>
              </SummaryItem>
            </SummaryCard>

            <ButtonGroup>
              {canFinalize && (
                <ThemedButton variant="secondary" onClick={handleCancel} disabled={saving}>
                  Cancel
                </ThemedButton>
              )}
              <ThemedButton variant="secondary" onClick={handleSaveProgress} disabled={saving}>
                {saving ? 'Saving...' : 'Save Progress'}
              </ThemedButton>
              {canFinalize && (
                <ThemedButton variant="primary" onClick={handleComplete} disabled={saving || countedItems === 0}>
                  {saving ? 'Processing...' : 'Complete Stock Take'}
                </ThemedButton>
              )}
            </ButtonGroup>
          </>
        ) : (
          <>
            <GuideBox>
              <GuideTitle>{t('inventory:stockTakePage.whatIsStockTake')}</GuideTitle>
              <GuideList>
                <GuideStep>{t('inventory:stockTakePage.stockTakeIsAProcessOfPhysicallyCountingAllIngredientsInYourInventory')}</GuideStep>
                <GuideStep>{t('inventory:stockTakePage.itHelpsIdentifyDiscrepanciesBetweenSystemRecordsAndActualStock')}</GuideStep>
                <GuideStep>{t('inventory:stockTakePage.regularStockTakesHelpReduceLossAndImproveInventoryAccuracy')}</GuideStep>
                <GuideStep>{t('inventory:stockTakePage.weRecommendDoingAStockTakeAtLeastOnceAWeek')}</GuideStep>
              </GuideList>
            </GuideBox>

            {lastResult && (
              <InfoBox>
                {t('inventory:stockTakePage.completedResult', { skipped: lastResult.skipped, moved: lastResult.moved })}
              </InfoBox>
            )}
            <EmptyState>
              <EmptyTitle>{t('inventory:stockTakePage.readyToStart')}</EmptyTitle>
              <EmptyDescription>
                Click the button below to begin counting your inventory.
                You can save your progress and continue later if needed.
                Once completed, your stock levels will be updated automatically.
              </EmptyDescription>
              {categories.length > 0 && (
                <div style={{ margin: '0 0 16px', textAlign: 'left', width: '100%', maxWidth: 640 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#0A2540', marginBottom: 8 }}>{t('inventory:stockTakePage.partialTitle')}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {categories.map(c => (
                      <label key={c.id} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 10px', border: '1px solid #E3E8EF', borderRadius: 8, fontSize: 13, cursor: 'pointer', background: pickedCategories.includes(c.id) ? '#EEF0FF' : '#FFFFFF' }}>
                        <input type="checkbox" checked={pickedCategories.includes(c.id)}
                          onChange={() => setPickedCategories(prev => prev.includes(c.id) ? prev.filter(x => x !== c.id) : [...prev, c.id])} />
                        {c.name}
                      </label>
                    ))}
                  </div>
                  <div style={{ fontSize: 12, color: '#6B7280', marginTop: 6 }}>{t('inventory:stockTakePage.partialHint')}</div>
                </div>
              )}
              <Button variant="primary" onClick={handleStartStockTake}>
                Start Stock Take
              </Button>
            </EmptyState>

            {stockTakeHistory.length > 0 && (
              <>
                <Title style={{ fontSize: '18px', marginTop: '48px' }}>{t('inventory:stockTakePage.previousStockTakes')}</Title>
                <HistoryList>
                  {stockTakeHistory.filter(st => st.status !== 'in_progress').map(st => (
                    <HistoryCard key={st.id} status={st.status}>
                      <HistoryInfo>
                        <HistoryDate>{formatDateTz(st.stock_take_date, null)}</HistoryDate>
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
        </Content>
      </Container>

      {/* Complete Stock Take Confirm Modal */}
      <ConfirmModal
        isOpen={showCompleteConfirm}
        title="Complete Stock Take"
        message="Complete this stock take? This will update all stock levels to the counted values."
        onConfirm={confirmComplete}
        onCancel={() => setShowCompleteConfirm(false)}
        confirmText="Complete"
        cancelText="Cancel"
        type="warning"
      />

      {/* Cancel Stock Take Confirm Modal */}
      <ConfirmModal
        isOpen={showCancelConfirm}
        title="Cancel Stock Take"
        message="Cancel this stock take? All entered data will be lost."
        onConfirm={confirmCancel}
        onCancel={() => setShowCancelConfirm(false)}
        confirmText="Cancel Stock Take"
        cancelText="Go Back"
        type="danger"
      />
    </>
  );
};

export default StockTakePage;
