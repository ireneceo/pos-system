import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Table,
  MobileLabel,
  MobileValue,
  MobileGrid,
  ActionButtons,
  EmptyState,
} from '../../UI';
import { FilterBar, SearchInput, FilterSelect } from '../../Common/FilterComponents';
import {
  SectionTitle,
  StatusBadge,
  StockItemImage,
  StockItemInfo,
  StockItemDetails,
  StockItemCode,
  ConfidenceBadge,
  SettingsButton,
  IngredientName,
  BrandTag,
  IngredientMeta,
  InventoryTableHeader,
  InventoryTableRow,
  EditableStock,
  InlineStockInput,
  OrderInput,
  OrderButton,
  DeleteButton,
  EditButton,
} from '../styles';
import { formatCurrency } from '../../../utils/currency';
import { formatStock, formatDate, getStatusLabel, getConfidenceLabel } from '../utils';
import {
  InventoryMode,
  IngredientStock,
  GeneralStockItem,
  UnifiedStockItem,
  StockItemType,
  DeleteTarget,
} from '../types';
import { SuggestionRow } from '../hooks/useBulkOrder';

type StockTypeFilter = 'all' | 'ingredients' | 'general_stock';
type StatusFilter = string;

interface InlineEditApi {
  editingStockId: number | null;
  editingStockValue: string;
  setEditingStockValue: (v: string) => void;
  editingStockType: StockItemType;
  start: (id: number, currentValue: number, type: StockItemType) => void;
  handleKeyDown: (e: React.KeyboardEvent, id: number) => void;
  save: (id: number) => void;
}

interface Props {
  mode: InventoryMode;
  restaurantId?: number;
  inventory: IngredientStock[];
  generalStockInventory: GeneralStockItem[];
  selectedCurrency: string;

  // Filters
  stockTypeFilter: StockTypeFilter;
  setStockTypeFilter: (v: StockTypeFilter) => void;
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  statusFilter: StatusFilter;
  setStatusFilter: (v: StatusFilter) => void;
  categoryFilter: string;
  setCategoryFilter: (v: string) => void;

  // Order input state
  orderQuantities: { [key: string]: string };
  setOrderQuantities: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  onOrder: (item: UnifiedStockItem) => void;
  setOrderQuantity: (v: string) => void;

  // Inline edit
  inlineEdit: InlineEditApi;

  // General stock actions
  onAddGeneralStock: () => void;
  onGeneralStockReceive: (item: GeneralStockItem) => void;
  onEditGeneralStock: (item: GeneralStockItem) => void;

  // Ingredient actions
  onReceive: (ingredient: IngredientStock) => void;
  onWaste: (ingredient: IngredientStock) => void;
  onSettings: (ingredient: IngredientStock) => void;

  // Delete
  onDelete: (target: DeleteTarget) => void;

  // 재고 관리 켜기/끄기 — 이 화면 안에서 처리한다(끄면 사라져 다시 못 켜던 것 해소).
  showUntracked?: boolean;
  setShowUntracked?: (v: boolean) => void;
  onToggleTrackStock?: (item: IngredientStock, next: boolean) => void;

  // Sprint 5: bulk selection + suggestions
  suggestionsById?: Map<number, SuggestionRow>;
  selectedIds?: Set<number>;
  onToggleSelect?: (id: number) => void;
}

const StockListSection: React.FC<Props> = ({
  mode,
  restaurantId,
  inventory,
  generalStockInventory,
  selectedCurrency,
  stockTypeFilter,
  setStockTypeFilter,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  categoryFilter,
  setCategoryFilter,
  orderQuantities,
  setOrderQuantities,
  onOrder,
  setOrderQuantity,
  inlineEdit,
  onAddGeneralStock,
  onGeneralStockReceive,
  onEditGeneralStock,
  onReceive,
  onWaste,
  onSettings,
  onDelete,
  showUntracked,
  setShowUntracked,
  onToggleTrackStock,
  suggestionsById,
  selectedIds,
  onToggleSelect,
}) => {
  const { t } = useTranslation(['inventory', 'common']);

  // 카테고리 목록 — 지금 보고 있는 재고에서 실제로 쓰이는 것만(빈 카테고리는 안 띄운다).
  const categories = React.useMemo(() => {
    const set = new Set<string>();
    inventory.forEach(i => { if (i.category) set.add(i.category); });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [inventory]);

  // 'zero' = 재고가 0 인 것. stock_status 와 별개 기준인 이유: 최소재고(min_stock)를 안 정한
  // 품목은 stock_status 가 늘 'normal' 이라 "재고 없는 것만 보기"가 불가능했다.
  // (임계치 미설정 품목을 경고로 안 띄우는 기존 알림 정책은 그대로 둔다.)
  const matchesStatusFilter = (item: { stock_status: string; current_stock: number }) =>
    statusFilter === 'all' ? true
      : statusFilter === 'zero' ? (item.current_stock <= 0)
      : item.stock_status === statusFilter;

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = matchesStatusFilter(item);
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <>
      <FilterBar>
        <FilterSelect
          value={stockTypeFilter}
          onChange={(e) => setStockTypeFilter(e.target.value as StockTypeFilter)}
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
        {categories.length > 0 && (
          <FilterSelect
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{ minWidth: '160px' }}
          >
            <option value="all">All Categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </FilterSelect>
        )}
        <FilterSelect
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="zero">Zero Stock</option>
          <option value="normal">Normal</option>
          <option value="low_stock">Low Stock</option>
          <option value="out_of_stock">Out of Stock</option>
        </FilterSelect>
        <Button
          variant="primary"
          onClick={onAddGeneralStock}
          style={{ marginLeft: 'auto' }}
        >
          Add General Stock
        </Button>
      </FilterBar>

      {(stockTypeFilter === 'all' || stockTypeFilter === 'general_stock') && generalStockInventory.length > 0 && (
        <>
          {stockTypeFilter === 'all' && (
            <SectionTitle>
              General Stock ({generalStockInventory.filter(item => {
                const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesStatus = matchesStatusFilter(item);
                return matchesSearch && matchesStatus;
              }).length})
            </SectionTitle>
          )}
          <Table style={{ marginBottom: '24px' }}>
            <InventoryTableHeader columns="2.5fr 1fr 1fr 1fr 1fr 1fr 1fr 150px 260px">
              <span className="col-info">Item</span>
              <span>Status</span>
              <span>Current Stock</span>
              <span className="col-min">Min Stock</span>
              <span className="col-cost">Unit Cost</span>
              <span className="col-supplier">Supplier</span>
              <span className="col-last">Last Stock Take</span>
              <span>Order</span>
              <span className="col-action">Actions</span>
            </InventoryTableHeader>
            {generalStockInventory
              .filter(item => {
                const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesStatus = matchesStatusFilter(item);
                return matchesSearch && matchesStatus;
              })
              .map(item => (
                <InventoryTableRow key={`general-stock-${item.id}`} columns="2.5fr 1fr 1fr 1fr 1fr 1fr 1fr 150px 260px">
                  <MobileGrid>
                    <MobileValue className="col-info">
                      <MobileLabel>Item</MobileLabel>
                      <StockItemInfo>
                        <StockItemImage>
                          {item.image_url ? (
                            <img src={item.image_url} alt={item.name} />
                          ) : (
                            <span />
                          )}
                        </StockItemImage>
                        <StockItemDetails>
                          <IngredientName>
                            {item.name}
                            {item.is_brand_shared && (
                              <BrandTag title={t('inventory:brandSharedHint', 'Stock item defined by your brand') as string}>
                                {t('inventory:brandShared', 'Brand')}
                              </BrandTag>
                            )}
                          </IngredientName>
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
                      {inlineEdit.editingStockId === item.id && inlineEdit.editingStockType === 'general_stock' ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <InlineStockInput
                            type="number"
                            step="0.01"
                            value={inlineEdit.editingStockValue}
                            onChange={(e) => inlineEdit.setEditingStockValue(e.target.value)}
                            onKeyDown={(e) => inlineEdit.handleKeyDown(e, item.id)}
                            onBlur={() => inlineEdit.save(item.id)}
                            autoFocus
                          />
                          <span style={{ fontSize: '13px', color: '#4B5563' }}>{item.stock_unit}</span>
                        </div>
                      ) : (
                        <EditableStock onClick={() => inlineEdit.start(item.id, item.current_stock, 'general_stock')}>
                          <span style={{ fontWeight: 600, color: '#0A2540' }}>{formatStock(item.current_stock)}</span>
                          <span style={{ fontSize: '13px', color: '#4B5563' }}>{item.stock_unit}</span>
                        </EditableStock>
                      )}
                    </MobileValue>
                    <MobileValue className="col-min">
                      <MobileLabel>Min Stock</MobileLabel>
                      <div style={{ color: '#4B5563' }}>
                        {formatStock(item.min_stock)} {item.stock_unit}
                      </div>
                    </MobileValue>
                    <MobileValue className="col-cost">
                      <MobileLabel>Unit Cost</MobileLabel>
                      <div style={{ color: '#0A2540' }}>
                        {formatCurrency(item.unit_cost, selectedCurrency)}
                      </div>
                    </MobileValue>
                    <MobileValue className="col-supplier">
                      <MobileLabel>Supplier</MobileLabel>
                      <div style={{ color: item.supplier_name ? '#0A2540' : '#6B7280', fontSize: '13px' }}>
                        {item.supplier_name || '-'}
                      </div>
                    </MobileValue>
                    <MobileValue className="col-last">
                      <MobileLabel>Last Stock Take</MobileLabel>
                      <div style={{ color: '#4B5563' }}>
                        {formatDate(item.last_stock_take_at)}
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
                        [`gs_${item.id}`]: e.target.value,
                      }))}
                      placeholder={String(item.min_order || 1)}
                    />
                    <OrderButton onClick={() => {
                      const qty = orderQuantities[`gs_${item.id}`] || String(item.min_order || 1);
                      if (qty && parseFloat(qty) > 0) {
                        onOrder({
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
                          item_type: 'general_stock',
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
                      onClick={() => onGeneralStockReceive(item)}
                      style={{ padding: '6px 12px', fontSize: '13px' }}
                    >
                      Receive
                    </Button>
                    <EditButton onClick={() => onEditGeneralStock(item)}>
                      Edit
                    </EditButton>
                    <DeleteButton onClick={() => onDelete({ type: 'general_stock', id: item.id, name: item.name })}>
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

      {(stockTypeFilter === 'all' || stockTypeFilter === 'ingredients') && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
            {stockTypeFilter === 'all' && <SectionTitle>Ingredients ({filteredInventory.length})</SectionTitle>}
            {/* 재고를 세지 않는 항목까지 함께 보여 주는 스위치.
                끄면 목록에서 사라지므로, 다시 켜려면 이 화면에서 볼 수 있어야 한다. */}
            {setShowUntracked && (
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#4B5563', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={!!showUntracked}
                  onChange={(e) => setShowUntracked(e.target.checked)}
                  style={{ width: 16, height: 16, cursor: 'pointer', accentColor: '#635BFF' }}
                />
                Show items not tracked
              </label>
            )}
          </div>
          {filteredInventory.length === 0 ? (
            <EmptyState>
              <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                {inventory.length === 0 ? 'No ingredients found' : 'No matching ingredients'}
              </div>
              <div style={{ fontSize: '14px', marginBottom: '16px' }}>
                {inventory.length === 0
                  ? mode === 'brand'
                    ? 'Add ingredients with "Track in Inventory" enabled in the Product Ingredients page first.'
                    : 'Add ingredients in the Ingredients page first.'
                  : 'Try adjusting your search or filter.'}
              </div>
              {inventory.length === 0 && (
                <Button
                  variant="primary"
                  onClick={() => window.location.href = mode === 'brand'
                    ? '/brand/product-recipe?tab=ingredients'
                    : `/restaurant/${restaurantId}/recipe-management?tab=ingredients`}
                >
                  Go to {mode === 'brand' ? 'Product Ingredients' : 'Ingredients'}
                </Button>
              )}
            </EmptyState>
          ) : (
            <Table>
              <InventoryTableHeader columns="36px 2.5fr 1fr 1fr 1fr 1fr 1fr 1fr 150px 260px">
                <span></span>
                <span className="col-info">Ingredient</span>
                <span>Status</span>
                <span>Current Stock</span>
                <span className="col-min">Min / Prediction</span>
                <span className="col-cost">Unit Cost</span>
                <span className="col-supplier">Supplier</span>
                <span className="col-last">Last Stock Take</span>
                <span>Order</span>
                <span className="col-action">Actions</span>
              </InventoryTableHeader>
              {filteredInventory.map(item => {
                const sugg = suggestionsById?.get(item.id);
                const hasMapping = !!sugg && !!sugg.seller_type;
                const isChecked = selectedIds?.has(item.id) || false;
                return (
                <InventoryTableRow
                  key={item.id}
                  columns="36px 2.5fr 1fr 1fr 1fr 1fr 1fr 1fr 150px 260px"
                  style={item.track_stock === false ? { opacity: 0.55 } : undefined}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {hasMapping && onToggleSelect ? (
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => onToggleSelect(item.id)}
                        aria-label={`Select ${item.name} for bulk order`}
                        style={{ width: 18, height: 18, cursor: 'pointer', accentColor: '#635BFF' }}
                      />
                    ) : (
                      <span style={{ width: 18, height: 18, display: 'inline-block' }} />
                    )}
                  </div>
                  <MobileGrid>
                    <MobileValue className="col-info">
                      <MobileLabel>Ingredient</MobileLabel>
                      <StockItemInfo>
                        <StockItemImage>
                          {item.image_url ? (
                            <img src={item.image_url} alt={item.name} />
                          ) : (
                            <span />
                          )}
                        </StockItemImage>
                        <StockItemDetails>
                          <IngredientName>
                            {item.name}
                            {item.is_brand_shared && (
                              <BrandTag title={t('inventory:brandSharedHint', 'Stock item defined by your brand') as string}>
                                {t('inventory:brandShared', 'Brand')}
                              </BrandTag>
                            )}
                          </IngredientName>
                          {item.code && <StockItemCode>{item.code}</StockItemCode>}
                          <IngredientMeta>
                            {item.category} • {(parseFloat(String(item.avg_daily_usage)) || 0).toFixed(2)} {item.unit}/day
                          </IngredientMeta>
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
                      {inlineEdit.editingStockId === item.id && inlineEdit.editingStockType === 'ingredient' ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <InlineStockInput
                            type="number"
                            step="0.01"
                            value={inlineEdit.editingStockValue}
                            onChange={(e) => inlineEdit.setEditingStockValue(e.target.value)}
                            onKeyDown={(e) => inlineEdit.handleKeyDown(e, item.id)}
                            onBlur={() => inlineEdit.save(item.id)}
                            autoFocus
                          />
                          <span style={{ fontSize: '13px', color: '#4B5563' }}>{item.unit}</span>
                        </div>
                      ) : (
                        <EditableStock onClick={() => inlineEdit.start(item.id, item.current_stock, 'ingredient')}>
                          <span style={{ fontWeight: 600, color: '#0A2540' }}>{formatStock(item.current_stock)}</span>
                          <span style={{ fontSize: '13px', color: '#4B5563' }}>{item.unit}</span>
                        </EditableStock>
                      )}
                      {Number(item.on_order_quantity) > 0 && (
                        <div
                          title={item.on_order_delivery_date ? `Expected delivery: ${formatDate(item.on_order_delivery_date)}` : 'On order — already purchased'}
                          style={{ display: 'inline-block', marginTop: 4, fontSize: 10, padding: '1px 6px',
                            background: '#E0F2FE', color: '#075985', borderRadius: 999, fontWeight: 600 }}
                        >
                          ↧ {formatStock(item.on_order_quantity)} {item.unit} incoming
                        </div>
                      )}
                    </MobileValue>
                    <MobileValue className="col-min">
                      <MobileLabel>Min / Prediction</MobileLabel>
                      <div style={{ color: '#4B5563', marginBottom: '4px' }}>
                        Min: {formatStock(item.min_stock)} {item.unit}
                      </div>
                      <ConfidenceBadge level={item.prediction_confidence || 'none'}>
                        {getConfidenceLabel(item.prediction_confidence || 'none')}
                      </ConfidenceBadge>
                    </MobileValue>
                    <MobileValue className="col-cost">
                      <MobileLabel>Unit Cost</MobileLabel>
                      <div style={{ color: '#0A2540' }}>
                        {formatCurrency(item.unit_cost, selectedCurrency)}
                      </div>
                    </MobileValue>
                    <MobileValue className="col-supplier">
                      <MobileLabel>Supplier</MobileLabel>
                      {sugg && sugg.seller_name ? (
                        <div>
                          <div style={{ color: '#0A2540', fontSize: '13px', fontWeight: 600 }}>
                            {sugg.seller_name}
                          </div>
                          <div style={{ display: 'inline-block', marginTop: 2, fontSize: 10, padding: '1px 6px',
                            background: '#FEF3C7', color: '#92400E', borderRadius: 999, fontWeight: 600 }}>
                            ↓ {sugg.suggested_qty} {sugg.unit}
                          </div>
                        </div>
                      ) : item.supplier_name ? (
                        <div style={{ color: '#0A2540', fontSize: '13px' }}>{item.supplier_name}</div>
                      ) : (
                        <span style={{ display: 'inline-block', padding: '1px 6px', background: '#F1F4F8', color: '#6B7280', borderRadius: 999, fontWeight: 600, fontSize: 10 }}>
                          No mapping
                        </span>
                      )}
                    </MobileValue>
                    <MobileValue className="col-last">
                      <MobileLabel>Last Stock Take</MobileLabel>
                      <div style={{ color: '#4B5563' }}>
                        {formatDate(item.last_stock_take_at)}
                      </div>
                    </MobileValue>
                  </MobileGrid>
                  {/* 공급처가 연결되지 않은 품목은 발주 자체가 불가능하다. 예전에는 연결된 것과
                      똑같이 수량칸+Order 버튼을 그려서, 눌러야 "No supplier mapping" 을 보고
                      알 수 있었다 — 목록만 봐서는 무엇을 발주할 수 있는지 구분이 안 됐다.
                      버튼을 비활성으로 두지 않고(비활성 금지 규칙), 연결하러 가는 행동을 준다. */}
                  {!hasMapping ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: 12, color: '#6B7280', whiteSpace: 'nowrap' }}>
                        No supplier linked
                      </span>
                      <OrderButton
                        onClick={() => { window.location.href = '/pos/purchase-orders'; }}
                        style={{ background: '#F1F4F8', color: '#374151', borderColor: '#C7CED6' }}
                      >
                        Link
                      </OrderButton>
                    </div>
                  ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <OrderInput
                      type="number"
                      min="0"
                      step="1"
                      value={orderQuantities[item.id] || (sugg ? String(sugg.suggested_qty) : '')}
                      onChange={(e) => setOrderQuantities(prev => ({
                        ...prev,
                        [item.id]: e.target.value,
                      }))}
                      placeholder={String(item.min_order || 1)}
                    />
                    <OrderButton onClick={() => {
                      const qty = orderQuantities[item.id] || String(item.min_order || 1);
                      if (qty && parseFloat(qty) > 0) {
                        onOrder({
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
                          prediction_confidence: item.prediction_confidence,
                        });
                        setOrderQuantity(qty);
                      }
                    }}>
                      Order
                    </OrderButton>
                  </div>
                  )}
                  <ActionButtons>
                    <Button
                      variant="primary"
                      onClick={() => onReceive(item)}
                      style={{ padding: '6px 12px', fontSize: '13px' }}
                    >
                      Receive
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => onWaste(item)}
                      style={{ padding: '6px 12px', fontSize: '13px' }}
                    >
                      Waste
                    </Button>
                    {/* 재료 **정의**(이름·단위·공급처·삭제)는 브랜드 소유 → 매장에서 못 고친다.
                        하지만 **PAR 설정**(최소재고·리드타임·사용량)은 매장별이다 — 지점마다 회전율이
                        달라 발주점이 같을 수 없다(프랜차이즈 표준). Settings 는 브랜드 재료에도 연다. */}
                    {onToggleTrackStock && (
                      // 한 번 눌러 켜고 끈다. 끄면 목록·알림·실사·발주 제안에서 즉시 빠지고,
                      // 데이터는 그대로 남는다(삭제가 아니다).
                      <SettingsButton
                        onClick={() => onToggleTrackStock(item, item.track_stock === false)}
                        style={item.track_stock === false
                          ? { color: '#635BFF', borderColor: '#635BFF' }
                          : undefined}
                        title={item.track_stock === false
                          ? 'Not counted in inventory — click to start tracking'
                          : 'Counted in inventory — click to stop tracking'}
                      >
                        {item.track_stock === false ? 'Track' : 'Untrack'}
                      </SettingsButton>
                    )}
                    <SettingsButton onClick={() => onSettings(item)}>
                      Settings
                    </SettingsButton>
                    {!item.is_brand_shared && (
                    <DeleteButton onClick={() => onDelete({ type: 'ingredient', id: item.id, name: item.name })}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </DeleteButton>
                    )}
                  </ActionButtons>
                </InventoryTableRow>
                );
              })}
            </Table>
          )}
        </>
      )}
    </>
  );
};

export default StockListSection;
