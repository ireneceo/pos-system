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
  StockItemImage,
  StockItemInfo,
  StockItemDetails,
  StockItemCode,
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
  EditButton, PrepTag} from '../styles';
import { formatCurrency } from '../../../utils/currency';
import { formatStock, formatDate } from '../utils';
import VerdictBadge from '../VerdictBadge';
import { stockVerdict, StockVerdict, FILTER_TO_VERDICT } from '../stockVerdict';
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
  /** 준비 재료 «만들기» — 준비 재료 행에서만 쓰인다 (2026-09-17) */
  onProduce?: (ingredient: IngredientStock) => void;
  onWaste: (ingredient: IngredientStock) => void;
  onSettings: (ingredient: IngredientStock) => void;

  // Delete
  onDelete: (target: DeleteTarget) => void;

  // 재고 관리 켜기/끄기 — 이 화면 안에서 처리한다(끄면 사라져 다시 못 켜던 것 해소).
  showUntracked?: boolean;
  setShowUntracked?: (v: boolean) => void;

  // Sprint 5: bulk selection + suggestions
  suggestionsById?: Map<number, SuggestionRow>;
  /** 발주 전망 «기준 없음» 품목 id (서버 summary 와 같은 판정) */
  noBasisIds?: Set<number>;
  /** 숫자를 안 정한(자동) 품목의 발주 기준 — «발주 기준» 칸 «자동 · n» (2026-11-10) */
  autoLevels?: Map<number, number>;
  /** 발주 전망을 읽었는가 — 못 읽었으면 판정이 옛 필드로 떨어진다(stockVerdict) */
  suggestionsLoaded?: boolean;
  selectedIds?: Set<number>;
  onToggleSelect?: (id: number) => void;

  // 공급처 연결을 이 목록 안에서 바로 (2026-11-03 Irene «여기서 바로 바로 연결하게 해줘. 이동시키지 말고»)
  //   있으면 «Link» 가 다른 화면으로 가지 않고 연결 창을 연다. 없으면(매장 모드) 종전대로.
  onLinkSupplier?: (ingredient: IngredientStock) => void;
  /** 카탈로그에 없는 업체 — 외부 공급업체 상품으로 만들어 바로 연결 */
  onCreateSupplierProduct?: (ingredient: IngredientStock) => void;
}

/**
 * «발주 기준» 칸 — 정함: «5 kg» · 자동: «자동 · 24 kg» · 없음: «미정 · 정하기». 누르면 그 품목 설정 창 (2026-11-10 §2-4)
 */
const ReorderAtCell: React.FC<{ level: number; auto?: number; unit: string; onEdit: () => void }> = ({ level, auto, unit, onEdit }) => {
  const { t } = useTranslation(['inventory']);
  const btn: React.CSSProperties = { background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', font: 'inherit' };
  if (level > 0) {
    return (
      <button type="button" onClick={onEdit} title={t('inventory:reorderAt.edit', 'Change the reorder number') as string}
        style={{ ...btn, color: '#0A2540', fontWeight: 600, fontSize: 14 }}>
        {formatStock(level)} {unit}
      </button>
    );
  }
  if (auto != null && auto > 0) {
    return (
      <button type="button" onClick={onEdit} title={t('inventory:reorderAt.autoHint', 'Estimated from the last 28 days of use. Set your own number in the item settings.') as string}
        style={{ ...btn, color: '#4B5563', fontSize: 13 }}>
        {t('inventory:reorderAt.auto', { defaultValue: 'Auto · {{qty}} {{unit}}', qty: formatStock(auto), unit })}
      </button>
    );
  }
  return (
    <span style={{ fontSize: 13, color: '#6B7280' }}>
      {t('inventory:reorderAt.notSet', 'Not set')}
      {' · '}
      <button type="button" onClick={onEdit} style={{ ...btn, color: '#635BFF', fontWeight: 600, textDecoration: 'underline' }}>
        {t('inventory:reorderAt.set', 'Set')}
      </button>
    </span>
  );
};

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
  onProduce,
  onWaste,
  onSettings,
  onDelete,
  showUntracked,
  setShowUntracked,
  suggestionsById,
  noBasisIds,
  autoLevels,
  suggestionsLoaded = false,
  selectedIds,
  onToggleSelect,
  onLinkSupplier,
  onCreateSupplierProduct,
}) => {
  const { t } = useTranslation(['inventory', 'common']);

  // 공급업체 필터 — «우리가 어느 공급업체를 쓰는지» 를 목록에서 바로 좁혀 본다.
  //   'all' = 전부 · '__none__' = 연결 없음(발주 불가) · 그 밖 = 그 공급업체 이름
  const [supplierFilter, setSupplierFilter] = React.useState('all');
  const namesOf = (i: IngredientStock): string[] =>
    (i.seller_source_names && i.seller_source_names.length > 0)
      ? i.seller_source_names
      : ((i.seller_source_name || i.supplier_name) ? [String(i.seller_source_name || i.supplier_name)] : []);
  const isLinked = (i: IngredientStock): boolean =>
    i.has_seller_source !== undefined ? !!i.has_seller_source : namesOf(i).length > 0;
  const supplierOptions = React.useMemo(() => {
    const count = new Map<string, number>();
    inventory.forEach(i => { if (isLinked(i)) namesOf(i).forEach(n => count.set(n, (count.get(n) || 0) + 1)); });
    return Array.from(count.entries()).sort((a, b) => a[0].localeCompare(b[0]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inventory]);
  const unlinkedCount = React.useMemo(() => inventory.filter(i => !isLinked(i)).length,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [inventory]);
  const matchesSupplier = (i: IngredientStock) =>
    supplierFilter === 'all' ? true
      : supplierFilter === '__none__' ? !isLinked(i)
      : isLinked(i) && namesOf(i).includes(supplierFilter);

  // 카테고리 목록 — 지금 보고 있는 재고에서 실제로 쓰이는 것만(빈 카테고리는 안 띄운다).
  const categories = React.useMemo(() => {
    const set = new Set<string>();
    inventory.forEach(i => { if (i.category) set.add(i.category); });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [inventory]);

  // 상태 판정은 한 함수(stockVerdict — 2026-11-10 Fable 설계 §2-1). 배지·필터·띠 숫자가 같은 답을 낸다.
  //   필터 값은 기존 fs_* 그대로(아침 알림 ?filter=fs_out 링크 보존). 일반재고도 같은 판정으로 걸린다.
  const verdictOfIngredient = (item: IngredientStock): StockVerdict =>
    stockVerdict(item, suggestionsById?.get(item.id), noBasisIds, suggestionsLoaded, true);
  const verdictOfGeneral = (item: GeneralStockItem): StockVerdict =>
    stockVerdict(item, undefined, undefined, false, false);
  const matchesVerdict = (v: StockVerdict) => {
    if (statusFilter === 'all') return true;
    const want = FILTER_TO_VERDICT[statusFilter];
    // 지금 발주 필터는 «주문함 · 오는 중» 도 함께(기준 이하인데 이미 주문한 것 — 숨기면 왜 안 보이는지 모른다)
    if (statusFilter === 'fs_order_now' && v === 'incoming') return true;
    return want ? want.includes(v) : true;
  };

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = matchesVerdict(verdictOfIngredient(item));
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory && matchesSupplier(item);
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
        {(supplierOptions.length > 0 || unlinkedCount > 0) && (
          <FilterSelect
            value={supplierFilter}
            onChange={(e) => setSupplierFilter(e.target.value)}
            style={{ minWidth: '170px' }}
            aria-label={t('inventory:supplierFilter.label', 'Supplier') as string}
          >
            <option value="all">{t('inventory:supplierFilter.all', 'All Suppliers')}</option>
            {supplierOptions.map(([n, c]) => <option key={n} value={n}>{n} ({c})</option>)}
            {unlinkedCount > 0 && (
              <option value="__none__">{t('inventory:supplierFilter.none', 'No supplier linked')} ({unlinkedCount})</option>
            )}
          </FilterSelect>
        )}
        <FilterSelect
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">{t('inventory:statusFilter.all', 'All statuses')}</option>
          <option value="fs_out">{t('inventory:statusFilter.out', 'Out of stock')}</option>
          <option value="fs_order_now">{t('inventory:statusFilter.orderNow', 'Order now')}</option>
          <option value="fs_soon">{t('inventory:statusFilter.soon', 'Running low')}</option>
          <option value="fs_no_basis">{t('inventory:statusFilter.noLevel', 'No reorder number')}</option>
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
                const matchesStatus = matchesVerdict(verdictOfGeneral(item));
                return matchesSearch && matchesStatus;
              }).length})
            </SectionTitle>
          )}
          <Table style={{ marginBottom: '24px' }}>
            <InventoryTableHeader columns="2.5fr 1fr 1fr 1fr 1fr 1fr 1fr 150px 260px">
              <span className="col-info">Item</span>
              <span>Status</span>
              <span>Current Stock</span>
              <span className="col-min">{t('inventory:reorderAt.column', 'Reorder at')}</span>
              <span className="col-cost">Unit Cost</span>
              <span className="col-supplier">Supplier</span>
              <span className="col-last">Last Stock Take</span>
              <span>Order</span>
              <span className="col-action">Actions</span>
            </InventoryTableHeader>
            {generalStockInventory
              .filter(item => {
                const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesStatus = matchesVerdict(verdictOfGeneral(item));
                return matchesSearch && matchesStatus;
              })
              .map(item => (
                <InventoryTableRow key={`general-stock-${item.id}`} columns="2.5fr 1fr 1fr 1fr 1fr 1fr 1fr 150px 260px">
                  <MobileGrid>
                    <MobileValue className="col-info">
                      <MobileLabel>Item</MobileLabel>
                      <StockItemInfo>
                        {/* 사진이 없으면 자리표시 네모를 그리지 않는다 — 빈 회색 박스가
                            무엇인지 알 수 없는 데다, 좁은 이름 칸을 52px 씩 잡아먹었다. */}
                        {item.image_url && (
                          <StockItemImage>
                            <img src={item.image_url} alt={item.name} />
                          </StockItemImage>
                        )}
                        <StockItemDetails>
                          <IngredientName>
                            {item.name}
                            {item.is_brand_shared && (
                              <BrandTag title={t('inventory:brandSharedHint', 'Stock item defined by your brand') as string}>
                                {t('inventory:brandShared', 'Brand')}
                              </BrandTag>
                            )}
                            {/* 준비 재료 — 사는 게 아니라 만드는 것. 어디서 나오는지(레시피)를 같이 보여준다 */}
                            {item.source_recipe_id && (
                              <PrepTag title={t('inventory:prepTagHint', '레시피로 만드는 재료입니다. 발주가 아니라 «만들기» 로 재고를 늘립니다') as string}>
                                {t('inventory:prepTag', '준비 재료')}
                              </PrepTag>
                            )}
                          </IngredientName>
                          {item.source_recipe_id && item.source_recipe_name && (
                            <StockItemCode>
                              {t('inventory:prepSource', '레시피: {{name}}', { name: item.source_recipe_name })}
                            </StockItemCode>
                          )}
                          {item.code && <StockItemCode>{item.code}</StockItemCode>}
                          <IngredientMeta>{item.category}</IngredientMeta>
                        </StockItemDetails>
                      </StockItemInfo>
                    </MobileValue>
                    <MobileValue>
                      <MobileLabel>Status</MobileLabel>
                      <VerdictBadge verdict={verdictOfGeneral(item)} />
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
                      <MobileLabel>{t('inventory:reorderAt.column', 'Reorder at')}</MobileLabel>
                      <ReorderAtCell
                        level={Number(item.min_stock) || 0}
                        unit={item.stock_unit || item.unit}
                        onEdit={() => onEditGeneralStock(item)}
                      />
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
              <InventoryTableHeader columns="36px 3.5fr 0.9fr 1fr 1fr 0.9fr 1.1fr 0.9fr 150px 260px">
                <span></span>
                <span className="col-info">Ingredient</span>
                <span>Status</span>
                <span>Current Stock</span>
                <span className="col-min">{t('inventory:reorderAt.column', 'Reorder at')}</span>
                <span className="col-cost">Unit Cost</span>
                <span className="col-supplier">Supplier</span>
                <span className="col-last">Last Stock Take</span>
                <span>Order</span>
                <span className="col-action">Actions</span>
              </InventoryTableHeader>
              {filteredInventory.map(item => {
                const sugg = suggestionsById?.get(item.id);
                // 발주 가능 = 공급처가 연결돼 있는가. **재고가 부족한가와 다른 질문이다.**
                // 예전엔 `sugg`(재고부족 발주제안) 유무로 판정해, 최소치를 안 정한 품목은
                // 연결이 멀쩡해도 "No supplier linked" 로 뜨고 주문 칸이 통째로 사라졌다
                // (운영 실측 2026-08-25: BG 285건 · 매장 77건이 연결돼 있는데 발주 불가로 보임).
                // has_seller_source 가 없는 옛 응답에서는 종전대로 제안 유무로 떨어진다.
                const hasMapping = item.has_seller_source !== undefined
                  ? item.has_seller_source
                  : (!!sugg && !!sugg.seller_type);
                // 일괄발주 체크박스는 **부족분 담기** 기능이라 제안이 있어야 의미가 있다 — 그대로 둔다.
                const canBulkSelect = !!sugg && !!sugg.seller_type;
                const isChecked = selectedIds?.has(item.id) || false;
                return (
                <InventoryTableRow
                  key={item.id}
                  columns="36px 3.5fr 0.9fr 1fr 1fr 0.9fr 1.1fr 0.9fr 150px 260px"
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {canBulkSelect && onToggleSelect ? (
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
                        {/* 사진이 없으면 자리표시 네모를 그리지 않는다 — 빈 회색 박스가
                            무엇인지 알 수 없는 데다, 좁은 이름 칸을 52px 씩 잡아먹었다. */}
                        {item.image_url && (
                          <StockItemImage>
                            <img src={item.image_url} alt={item.name} />
                          </StockItemImage>
                        )}
                        <StockItemDetails>
                          <IngredientName>
                            {item.name}
                            {item.is_brand_shared && (
                              <BrandTag title={t('inventory:brandSharedHint', 'Stock item defined by your brand') as string}>
                                {t('inventory:brandShared', 'Brand')}
                              </BrandTag>
                            )}
                            {/* 준비 재료 — 사는 게 아니라 만드는 것. 어디서 나오는지(레시피)를 같이 보여준다 */}
                            {item.source_recipe_id && (
                              <PrepTag title={t('inventory:prepTagHint', '레시피로 만드는 재료입니다. 발주가 아니라 «만들기» 로 재고를 늘립니다') as string}>
                                {t('inventory:prepTag', '준비 재료')}
                              </PrepTag>
                            )}
                          </IngredientName>
                          {item.source_recipe_id && item.source_recipe_name && (
                            <StockItemCode>
                              {t('inventory:prepSource', '레시피: {{name}}', { name: item.source_recipe_name })}
                            </StockItemCode>
                          )}
                          {item.code && <StockItemCode>{item.code}</StockItemCode>}
                          <IngredientMeta>
                            {item.category} • {(sugg && sugg.daily_usage !== undefined ? sugg.daily_usage : (parseFloat(String(item.avg_daily_usage)) || 0)).toFixed(2)} {item.unit}/day
                            {sugg && sugg.usage_source === 'ledger' && <> ({t('inventory:foresight.last28d', '28d')})</>}
                          </IngredientMeta>
                          {sugg && !!sugg.committed && (
                            <IngredientMeta>
                              {t('inventory:foresight.committedLine', { defaultValue: 'Store orders waiting: {{qty}} {{unit}}', qty: sugg.committed, unit: item.unit })}
                            </IngredientMeta>
                          )}
                        </StockItemDetails>
                      </StockItemInfo>
                    </MobileValue>
                    <MobileValue>
                      <MobileLabel>Status</MobileLabel>
                      <VerdictBadge verdict={verdictOfIngredient(item)} days={sugg && sugg.status === 'soon' ? sugg.days_of_cover : null} />
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
                      <MobileLabel>{t('inventory:reorderAt.column', 'Reorder at')}</MobileLabel>
                      <ReorderAtCell
                        level={Number(item.min_stock) || 0}
                        auto={autoLevels?.get(item.id)}
                        unit={item.unit}
                        onEdit={() => onSettings(item)}
                      />
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
                            ↓ {sugg.suggested_qty} {sugg.order_unit || sugg.unit}
                          </div>
                        </div>
                      ) : hasMapping && namesOf(item).length > 0 ? (
                        // 연결된 공급처 이름 — 대표 먼저, 여럿이면 «+N» (2026-11-03 Irene «어느 공급업체를 쓰는지 리스트에서 바로»).
                        // seller_source_names = 실제 연결(ingredient_seller_products), supplier_name = 쓰기중단 레거시라 맨 뒤.
                        <div>
                          <div
                            style={{ color: '#0A2540', fontSize: '13px', fontWeight: 600 }}
                            title={namesOf(item).join(', ')}
                          >
                            {namesOf(item)[0]}
                            {namesOf(item).length > 1 && (
                              <span style={{ color: '#4B5563', fontWeight: 500 }}> +{namesOf(item).length - 1}</span>
                            )}
                          </div>
                          {item.seller_source_all_off && (
                            <div style={{ display: 'inline-block', marginTop: 2, fontSize: 10, padding: '1px 6px',
                              background: '#FEE2E2', color: '#991B1B', borderRadius: 999, fontWeight: 600 }}>
                              {t('inventory:sellerOff', 'Product removed by supplier — relink')}
                            </div>
                          )}
                        </div>
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
                  {(!hasMapping || (item.seller_source_all_off && onLinkSupplier)) ? (
                    // 연결이 없거나, 연결된 판매 상품이 전부 삭제·판매중지면 발주가 안 된다 → 그 자리에서 연결.
                    //   onLinkSupplier 가 있으면(브랜드 모드) 창이 이 목록 위에 열리고, 연결하면 목록을 다시 불러
                    //   같은 행이 곧바로 수량칸+Order 로 바뀐다(2026-11-03 Irene «이동시키지 말고 · 발주도 바로바로»).
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                      {!hasMapping && (
                        <span style={{ fontSize: 12, color: '#6B7280', whiteSpace: 'nowrap' }}>
                          {t('inventory:supplierFilter.none', 'No supplier linked')}
                        </span>
                      )}
                      <OrderButton
                        onClick={() => {
                          if (onLinkSupplier) onLinkSupplier(item);
                          else window.location.href = '/pos/purchase-orders';
                        }}
                        style={{ background: '#F1F4F8', color: '#374151', borderColor: '#C7CED6' }}
                      >
                        {t('inventory:linkSupplier', 'Link')}
                      </OrderButton>
                      {onCreateSupplierProduct && (
                        <button
                          type="button"
                          onClick={() => onCreateSupplierProduct(item)}
                          style={{ background: 'transparent', border: 'none', color: '#635BFF', fontSize: 12,
                            fontWeight: 600, cursor: 'pointer', padding: 0, textDecoration: 'underline' }}
                        >
                          {t('inventory:newSupplierProduct', 'New supplier')}
                        </button>
                      )}
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
                    {/* 준비 재료(출처 = 레시피)는 사는 게 아니라 만드는 것이라 «입고» 대신 «만들기».
                        2026-09-17 Fable 판정 — 누르면 원재료가 빠지고 이 재료가 들어온다. */}
                    {item.source_recipe_id ? (
                      <Button
                        variant="primary"
                        onClick={() => onProduce && onProduce(item)}
                        style={{ padding: '6px 12px', fontSize: '13px' }}
                      >
                        {t('inventory:produce.title', '만들기')}
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        onClick={() => onReceive(item)}
                        style={{ padding: '6px 12px', fontSize: '13px' }}
                      >
                        Receive
                      </Button>
                    )}
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
