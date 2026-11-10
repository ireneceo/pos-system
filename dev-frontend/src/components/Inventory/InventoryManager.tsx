import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Container, Header, Title, Content, TabContainer, Tab, EmptyState } from '../UI';
import GeneralStockCategoriesTab from '../../pages/RecipeManagement/GeneralStockCategoriesTab';

import { InventoryManagerProps, InventoryTab, StockItemType } from './types';
import { useAuthFetch } from './hooks/useAuthFetch';
import { useInventoryData } from './hooks/useInventoryData';
import { useIngredientAdjustModal } from './hooks/useIngredientAdjustModal';
import { useProduceModal } from './hooks/useProduceModal';
import { useSettingsModal } from './hooks/useSettingsModal';
import { useInitialStockModal } from './hooks/useInitialStockModal';
import { useGeneralStockReceiveModal } from './hooks/useGeneralStockReceiveModal';
import { useGeneralStockForm } from './hooks/useGeneralStockForm';
import { useInlineStockEdit } from './hooks/useInlineStockEdit';
import { useOrderModal } from './hooks/useOrderModal';
import { useBulkOrder } from './hooks/useBulkOrder';
import { useDeleteConfirm } from './hooks/useDeleteConfirm';

import DashboardSection from './sections/DashboardSection';
import CostReadinessPanel from './sections/CostReadinessPanel';
import StockListSection from './sections/StockListSection';
import TransactionHistorySection from './sections/TransactionHistorySection';

import ReceiveModal from './modals/ReceiveModal';
import ProduceModal from './modals/ProduceModal';
import WasteModal from './modals/WasteModal';
import InitialStockModal from './modals/InitialStockModal';
import GeneralStockReceiveModal from './modals/GeneralStockReceiveModal';
import OrderModal from './modals/OrderModal';
import BulkOrderModal from './modals/BulkOrderModal';
import ForesightPanel from './sections/ForesightPanel';
import { useParSuggestions, ParSuggestionsBadge, ParSuggestionsPanel } from '../PurchaseOrders/ParSuggestions';
import { stockVerdict } from './stockVerdict';
import StockSettingsModal, { StockSettings } from './modals/StockSettingsModal';
import { getAuthToken } from '../../utils/auth';
import { useStore } from '../../contexts/StoreContext';
import SettingsModal from './modals/SettingsModal';
import GeneralStockFormModal from './modals/GeneralStockFormModal';
import DeleteConfirmModal from './modals/DeleteConfirmModal';
import ConnectSellerModal from '../Common/ConnectSellerModal';
import RegisterExternalSupplierModal from '../Common/RegisterExternalSupplierModal';

const InventoryManager: React.FC<InventoryManagerProps> = ({ mode, restaurantId: propRestaurantId }) => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const restaurantId = mode === 'restaurant' ? propRestaurantId : undefined;
  const isBrandGeneralMode = mode === 'brand';

  const activeTab: InventoryTab = (searchParams.get('tab') as InventoryTab) || 'dashboard';
  const setActiveTab = (tab: InventoryTab) => setSearchParams({ tab });

  // Categories tab bookkeeping (existing behavior)
  const [, setGeneralStockCategoriesCount] = useState(0);
  const [, setGeneralStockCategoryRefreshKey] = useState(0);

  // Filters (owned here because shared across sections)
  const [searchTerm, setSearchTerm] = useState('');
  // ?filter=fs_out — 아침 재고 알림·받은 주문 «재고 부족» 줄에서 들어오면 그 단계로 걸러 연다(phase2 §5-2·§5-4)
  const [statusFilter, setStatusFilter] = useState(() => {
    const f = new URLSearchParams(window.location.search).get('filter');
    return f && /^fs_(out|order_now|soon|no_basis)$/.test(f) ? f : 'all';
  });
  const [stockTypeFilter, setStockTypeFilter] = useState<'all' | 'ingredients' | 'general_stock'>('all');
  // 카테고리 필터 — 재고가 많아지면 "무엇을 발주할지" 를 카테고리로 좁혀 보게 된다.
  const [categoryFilter, setCategoryFilter] = useState('all');

  // 재고 관리 켜기/끄기 — 재고 화면 한 곳에서 처리한다.
  // 예전에는 끄는 순간 목록에서 사라져, 다시 켜려면 재료 관리(RA)나 매입자재(BG) 화면으로
  // 따로 가야 했다. 여기서 "관리 안 함도 보기"를 켜면 꺼진 항목까지 나와 바로 되돌릴 수 있다.
  const [showUntracked, setShowUntracked] = useState(false);

  // 공급처 연결 — 목록 안에서 바로 (2026-11-03 Irene «여기서 바로 바로 연결하게 해줘. 이동시키지 말고»).
  //   창·경로는 브랜드 재료 화면(ProductIngredientsTab)과 같은 공유 부품: 카탈로그에서 고르기 / 외부 업체 상품 만들기.
  //   연결 뒤 목록을 다시 불러 그 행이 곧바로 «Order» 가 된다. 브랜드 모드만(매장 모드는 종전 그대로).
  const [linkTarget, setLinkTarget] = useState<any | null>(null);
  const [extSupplierTarget, setExtSupplierTarget] = useState<any | null>(null);
  //   재고아이템 연결(product_ingredient)은 두 창 모두 /api/product-ingredients/from-catalog 를 쓰고 brand 주소는 안 쓴다 —
  //   브랜드 번호가 없는 계정(System Admin 등)에서도 꺼지지 않게 «브랜드 모드면 켬» (브랜드 재료 화면과 같은 '/api/brands/0' 대체).
  const linkEnabled = isBrandGeneralMode;
  const linkBuyerBase = `/api/brands/${(user as any)?.brand_id || 0}`;

  const { t } = useTranslation(['inventory', 'common']);
  const authFetch = useAuthFetch();

  const data = useInventoryData({ mode, restaurantId, authFetch, includeUntracked: showUntracked });

  // 켜기/끄기 실행. 백엔드는 두 화면(RA 재료 / BG 매입자재)이 엔드포인트만 다르고 규칙은 같다.
  // 성공하면 목록을 다시 불러온다 — "관리 안 함 보기"가 꺼져 있으면 방금 끈 항목이 목록에서
  // 빠지는 것이 정상이고, 그 사실이 화면에 그대로 보이는 편이 덜 헷갈린다.


  const adjust = useIngredientAdjustModal({
    mode,
    restaurantId,
    authFetch,
    setInventory: data.setInventory,
    setAlerts: data.setAlerts,
  });

  // 준비된 재고 «만들기» (2026-09-17 Fable 판정) — 원재료를 빼고 준비 재료를 늘리는 한 번의 동작.
  const produce = useProduceModal({
    restaurantId,
    authFetch,
    onDone: () => data.refetch(),
    t: (key: string, fallback: string) => t(key, fallback) as string,
  });

  const settings = useSettingsModal({
    mode,
    restaurantId,
    authFetch,
    setInventory: data.setInventory,
  });

  const initialStock = useInitialStockModal({
    restaurantId,
    authFetch,
    inventory: data.inventory,
    setInventory: data.setInventory,
  });

  const gsReceive = useGeneralStockReceiveModal({
    restaurantId,
    isBrandGeneralMode,
    authFetch,
    setGeneralStockInventory: data.setGeneralStockInventory,
  });

  const gsForm = useGeneralStockForm({
    restaurantId,
    isBrandGeneralMode,
    authFetch,
    setGeneralStockInventory: data.setGeneralStockInventory,
  });

  const inlineEdit = useInlineStockEdit({
    mode,
    restaurantId,
    isBrandGeneralMode,
    authFetch,
    setInventory: data.setInventory,
    setGeneralStockInventory: data.setGeneralStockInventory,
  });

  const order = useOrderModal({ mode });
  const navigate = useNavigate();
  const bulk = useBulkOrder();
  // PAR 추천 창 — 발주 화면과 같은 공용 창(줄마다 골라 새 발주로). 일괄 발주로 담고 전망을 다시 읽으면 같이 다시 읽는다 (2026-11-10 Irene)
  const par = useParSuggestions(true, bulk.computedAt);
  const [parOpen, setParOpen] = useState(false);
  const { operationSettings } = useStore();
  const storeTz = (operationSettings as any)?.timeZone || 'Asia/Kuala_Lumpur';
  // «필요한 것 담기» 에 «곧 부족» 도 넣을지 — 기본 끔(과발주가 미발주보다 되돌리기 어렵다 · Fable §9 Q3)
  const [includeSoon, setIncludeSoon] = useState(false);
  // 브랜드 재고 설정 한 창(phase2 §4-1·§5-3) — 브랜드 모드에서만 1회 읽어 «곧 부족» 기본값·막기 표시에 쓴다
  const settingsBrandId = mode === 'brand' ? Number((user as any)?.brand_id) || null : null;
  const [stockSettings, setStockSettings] = useState<StockSettings | null>(null);
  const [showStockSettings, setShowStockSettings] = useState(false);
  React.useEffect(() => {
    if (!settingsBrandId) return;
    let alive = true;
    fetch(`/api/brands/${settingsBrandId}/stock-settings`, { headers: { Authorization: `Bearer ${getAuthToken()}` } })
      .then(r => r.json())
      .then(j => {
        if (!alive || !j?.success) return;
        setStockSettings(j.data.settings);
        setIncludeSoon(!!j.data.settings?.include_soon_default);
      })
      .catch(() => { /* 설정을 못 읽어도 띠는 동작한다(기본값) */ });
    return () => { alive = false; };
  }, [settingsBrandId]);
  const suggList = Array.from(bulk.suggestionsById.values());
  const linkedPositive = (x: any) => !!x.seller_type && ((x.order_qty ?? x.suggested_qty) || 0) > 0;
  const neededCount = suggList.filter(x => (x.status === 'out' || x.status === 'order_now') && linkedPositive(x)).length;
  // 일반재고도 같은 판정(stockVerdict)으로 목록에서 걸러지므로 띠 숫자에 더한다 — 카드 숫자 = 그 필터로 걸린 행 수(2026-11-10 §5-5)
  const gsExtra = React.useMemo(() => {
    const out = { out: 0, order_now: 0, no_basis: 0, soon: 0 };
    data.generalStockInventory.forEach(g => {
      const v = stockVerdict(g as any, undefined, undefined, false, false);
      if (v in out) (out as any)[v] += 1;
    });
    return out;
  }, [data.generalStockInventory]);
  const foresightPanel = (
    <>
    {parOpen && <ParSuggestionsPanel groups={par.groups} onClose={() => setParOpen(false)} />}
    <ForesightPanel
      summary={bulk.summary}
      computedAt={bulk.computedAt}
      neededCount={neededCount}
      activeFilter={statusFilter}
      onFilter={(f) => { setStatusFilter(f); if (f !== 'all') setActiveTab('list'); }}
      onAddNeeded={() => bulk.openNeeded(includeSoon)}
      onOpenSettings={settingsBrandId ? () => setShowStockSettings(true) : undefined}
      isBrand={mode === 'brand'}
      blocking={stockSettings?.short_order_policy === 'block'}
      extraCounts={gsExtra}
    />
    </>
  );

  const deleteConfirm = useDeleteConfirm({
    mode,
    restaurantId,
    isBrandGeneralMode,
    authFetch,
    setInventory: data.setInventory,
    setGeneralStockInventory: data.setGeneralStockInventory,
  });


  const hasValidId = mode === 'restaurant' ? !!restaurantId : true;
  if (!hasValidId) {
    return (
      <Container>
        <EmptyState>
          <p>Restaurant not found. Please log in with a restaurant account.</p>
        </EmptyState>
      </Container>
    );
  }

  const goToIngredientsPage = () => {
    window.location.href = mode === 'brand'
      ? '/brand/product-recipe?tab=ingredients'
      : `/restaurant/${restaurantId}/recipe-management?tab=ingredients`;
  };

  return (
    <Container>
      <Header>
        <Title>Inventory</Title>
        <ParSuggestionsBadge count={par.count} onClick={() => setParOpen(o => !o)} />
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

        {data.loading ? (
          <EmptyState>Loading...</EmptyState>
        ) : activeTab === 'dashboard' ? (
          <>
          {foresightPanel}
          <CostReadinessPanel mode={mode} restaurantId={restaurantId} selectedCurrency={data.selectedCurrency} authFetch={authFetch} />
          <DashboardSection
            summary={data.summary}
            inventory={data.inventory}
            expiringItems={data.expiringItems}
            selectedCurrency={data.selectedCurrency}
            onWaste={adjust.openWaste}
            onGoToList={() => setActiveTab('list')}
            onGoToHistory={() => setActiveTab('history')}
            onGoToIngredientsPage={goToIngredientsPage}
          />
          </>
        ) : activeTab === 'list' ? (
          <>
          {foresightPanel}
          <StockListSection
            showUntracked={showUntracked}
            setShowUntracked={setShowUntracked}
            mode={mode}
            restaurantId={restaurantId}
            inventory={data.inventory}
            generalStockInventory={data.generalStockInventory}
            selectedCurrency={data.selectedCurrency}
            stockTypeFilter={stockTypeFilter}
            setStockTypeFilter={setStockTypeFilter}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            orderQuantities={order.orderQuantities}
            setOrderQuantities={order.setOrderQuantities}
            onOrder={order.open}
            setOrderQuantity={order.setOrderQuantity}
            inlineEdit={{
              editingStockId: inlineEdit.editingStockId,
              editingStockValue: inlineEdit.editingStockValue,
              setEditingStockValue: inlineEdit.setEditingStockValue,
              editingStockType: inlineEdit.editingStockType,
              // 재료 수량 직접 고치기(= 조정)는 매니저 이상 — 서버 requireStockManager 와 같은 기준(Staff 는 입고·폐기로)
              start: (id: number, value: number, type: StockItemType) => {
                if (type === 'ingredient' && user?.role === 'Staff') return;
                inlineEdit.start(id, value, type);
              },
              handleKeyDown: inlineEdit.handleKeyDown,
              save: inlineEdit.save,
            }}
            onAddGeneralStock={gsForm.openAdd}
            onGeneralStockReceive={gsReceive.open}
            onEditGeneralStock={gsForm.openEdit}
            onReceive={adjust.openReceive}
            onProduce={produce.open}
            onWaste={adjust.openWaste}
            onSettings={settings.open}
            onDelete={deleteConfirm.open}
            suggestionsById={bulk.suggestionsById}
            noBasisIds={bulk.noBasisIds}
            autoLevels={bulk.autoLevels}
            suggestionsLoaded={!!bulk.summary}
            selectedIds={bulk.selectedIds}
            onToggleSelect={bulk.toggleSelect}
            onLinkSupplier={linkEnabled ? setLinkTarget : undefined}
            onCreateSupplierProduct={linkEnabled ? setExtSupplierTarget : undefined}
          />
          </>
        ) : activeTab === 'categories' ? (
          <GeneralStockCategoriesTab
            isBrandGeneralMode={isBrandGeneralMode}
            restaurantId={mode === 'restaurant' && restaurantId ? Number(restaurantId) : null}
            onCountChange={setGeneralStockCategoriesCount}
            onCategoryChange={() => setGeneralStockCategoryRefreshKey(k => k + 1)}
          />
        ) : (
          <TransactionHistorySection
            restaurantId={mode === 'restaurant' ? restaurantId : undefined}
            isBrandGeneralMode={isBrandGeneralMode}
          />
        )}
      </Content>

      {/* 준비된 재고 «만들기» (2026-09-17) */}
      <ProduceModal
        isOpen={produce.isOpen}
        onClose={produce.close}
        ingredient={produce.ingredient}
        batches={produce.batches}
        onBatchesChange={produce.setBatches}
        actualYield={produce.actualYield}
        onActualYieldChange={produce.setActualYield}
        expiryDate={produce.expiryDate}
        onExpiryDateChange={produce.setExpiryDate}
        preview={produce.preview}
        loading={produce.loading}
        saving={produce.saving}
        error={produce.error}
        onConfirm={produce.confirm}
      />

      <ReceiveModal
        isOpen={adjust.showReceiveModal}
        onClose={adjust.closeReceive}
        ingredient={adjust.selectedIngredient}
        quantity={adjust.quantity}
        onQuantityChange={adjust.setQuantity}
        notes={adjust.notes}
        onNotesChange={adjust.setNotes}
        batchNumber={adjust.batchNumber}
        onBatchNumberChange={adjust.setBatchNumber}
        manufactureDate={adjust.manufactureDate}
        onManufactureDateChange={adjust.setManufactureDate}
        expiryDate={adjust.expiryDate}
        onExpiryDateChange={adjust.setExpiryDate}
        openPoLines={adjust.openPoLines}
        selectedPoItemId={adjust.selectedPoItemId}
        onSelectPoItem={adjust.setSelectedPoItemId}
        onConfirm={adjust.handleReceive}
      />

      <WasteModal
        isOpen={adjust.showWasteModal}
        onClose={adjust.closeWaste}
        ingredient={adjust.selectedIngredient}
        quantity={adjust.quantity}
        onQuantityChange={adjust.setQuantity}
        notes={adjust.notes}
        onNotesChange={adjust.setNotes}
        reasonCode={adjust.wasteReason}
        onReasonCodeChange={adjust.setWasteReason}
        onConfirm={adjust.handleWaste}
      />

      <InitialStockModal
        isOpen={initialStock.showInitialStockModal}
        onClose={initialStock.close}
        inventory={data.inventory}
        initialStockItems={initialStock.initialStockItems}
        onUpdateItem={initialStock.updateItem}
        saving={initialStock.savingInitialStock}
        onSave={initialStock.handleSave}
      />

      <GeneralStockReceiveModal
        isOpen={gsReceive.showModal}
        onClose={gsReceive.close}
        item={gsReceive.selected}
        quantity={gsReceive.quantity}
        onQuantityChange={gsReceive.setQuantity}
        notes={gsReceive.notes}
        onNotesChange={gsReceive.setNotes}
        batchNumber={gsReceive.batchNumber}
        onBatchNumberChange={gsReceive.setBatchNumber}
        manufactureDate={gsReceive.manufactureDate}
        onManufactureDateChange={gsReceive.setManufactureDate}
        expiryDate={gsReceive.expiryDate}
        onExpiryDateChange={gsReceive.setExpiryDate}
        onConfirm={gsReceive.handleReceive}
      />

      <OrderModal
        isOpen={order.showOrderModal}
        onClose={() => { const added = !!order.lastOrderResult; order.close(); if (added) bulk.loadSuggestions(); }}
        item={order.orderItem}
        quantity={order.orderQuantity}
        onQuantityChange={order.setOrderQuantity}
        currency={data.selectedCurrency}
        onSend={order.handleSend}
        sellers={order.orderSellers}
        selectedSellerId={order.selectedSellerId}
        onSellerChange={order.setSelectedSellerId}
        error={order.orderError}
        submitting={order.orderSubmitting}
        lastResult={order.lastOrderResult}
        costSubject={mode === 'restaurant' ? 'ingredient' : 'product_ingredient'}
        inStaging={(() => {
          const sg = order.orderItem ? bulk.suggestionsById.get(Number(order.orderItem.id)) : undefined;
          return sg && sg.in_staging_order_qty ? { qty: sg.in_staging_order_qty, unit: sg.order_unit || null } : null;
        })()}
        onReview={() => { order.close(); navigate('/pos/purchase-orders/staging'); }}
      />

      {settingsBrandId && (
        <StockSettingsModal
          isOpen={showStockSettings}
          onClose={() => setShowStockSettings(false)}
          brandId={settingsBrandId}
          onSaved={(st) => { setStockSettings(st); setIncludeSoon(st.include_soon_default); }}
        />
      )}
      <BulkOrderModal
        isOpen={bulk.showBulkModal}
        onClose={bulk.closeBulk}
        items={bulk.bulkItems}
        currency={data.selectedCurrency}
        submitting={bulk.submitting}
        error={bulk.error}
        resultPos={bulk.resultPos}
        onUpdateItem={bulk.updateBulkItem}
        onRemoveItem={bulk.removeBulkItem}
        onSend={bulk.sendBulk}
        unlinkedItems={bulk.unlinkedItems}
        errorViolations={bulk.errorViolations}
        storeTz={storeTz}
        soonToggle={bulk.neededMode ? { count: bulk.soonLinkedCount, checked: bulk.soonIncluded, onChange: bulk.toggleSoonInModal } : null}
        stagedItems={bulk.stagedItems}
        onReview={() => { bulk.closeBulk(); navigate('/pos/purchase-orders/staging'); }}
        onLinkUnlinked={linkEnabled ? (u) => setLinkTarget({ id: u.ingredient_id, name: u.ingredient_name, unit: u.unit }) : undefined}
        onNewSupplierUnlinked={linkEnabled ? (u) => setExtSupplierTarget({ id: u.ingredient_id, name: u.ingredient_name, unit: u.unit }) : undefined}
      />

      {/* Sticky bottom bar — shown when items selected on the list tab */}
      {activeTab === 'list' && bulk.selectedIds.size > 0 && (
        <div style={{
          position: 'fixed',
          bottom: 0, left: 0, right: 0,
          background: 'white',
          borderTop: '1px solid #C7CED6',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.08)',
          padding: '14px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 16,
          zIndex: 100
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              minWidth: 32, height: 32, padding: '0 10px',
              borderRadius: 999, background: '#635BFF', color: 'white',
              fontSize: 13, fontWeight: 700
            }}>
              {bulk.selectedIds.size}
            </span>
            <span style={{ fontSize: 14, color: '#0A2540', fontWeight: 600 }}>
              ingredient{bulk.selectedIds.size === 1 ? '' : 's'} selected
            </span>
            <button
              type="button"
              onClick={bulk.clearSelection}
              style={{
                background: 'transparent', border: 'none', color: '#4B5563',
                fontSize: 13, cursor: 'pointer', textDecoration: 'underline'
              }}
            >Clear</button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              type="button"
              onClick={bulk.selectAllSuggested}
              style={{
                padding: '8px 14px',
                background: '#F1F4F8',
                border: '1px solid #C7CED6',
                borderRadius: 8,
                color: '#0A2540',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Select all suggestions ({bulk.suggestionsById.size})
            </button>
            <button
              type="button"
              onClick={bulk.openBulk}
              style={{
                padding: '10px 22px',
                background: '#635BFF',
                border: 'none',
                borderRadius: 8,
                color: 'white',
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(99,91,255,0.3)'
              }}
            >
              Order Selected →
            </button>
          </div>
        </div>
      )}

      <SettingsModal
        isOpen={settings.showSettingsModal}
        onClose={settings.close}
        ingredient={settings.settingsIngredient}
        form={settings.settingsForm}
        onFormChange={settings.setSettingsForm}
        saving={settings.savingSettings}
        onSave={async () => { if (await settings.handleSave()) bulk.loadSuggestions(); }}
        sugg={settings.settingsIngredient ? bulk.suggestionsById.get(Number(settings.settingsIngredient.id)) : undefined}
      />

      <GeneralStockFormModal
        mode="add"
        isOpen={gsForm.showAddModal}
        onClose={gsForm.closeAdd}
        form={gsForm.form}
        onFormChange={gsForm.setForm}
        suppliers={data.suppliers}
        categories={data.generalStockCategories}
        saving={gsForm.saving}
        onConfirm={gsForm.handleAdd}
      />

      <GeneralStockFormModal
        mode="edit"
        isOpen={gsForm.showEditModal}
        onClose={gsForm.closeEdit}
        form={gsForm.form}
        onFormChange={gsForm.setForm}
        suppliers={data.suppliers}
        categories={data.generalStockCategories}
        saving={gsForm.saving}
        onConfirm={gsForm.handleEdit}
      />

      {linkEnabled && (
        <>
          <ConnectSellerModal
            open={!!linkTarget}
            ingredient={linkTarget ? { id: linkTarget.id, name: linkTarget.name, unit: linkTarget.unit } : null}
            targetKind="product_ingredient"
            buyerApiBase={linkBuyerBase}
            onClose={() => setLinkTarget(null)}
            onConnected={() => { setLinkTarget(null); data.refetch(); bulk.loadSuggestions(); }}
          />
          <RegisterExternalSupplierModal
            target={extSupplierTarget ? { id: extSupplierTarget.id, name: extSupplierTarget.name, unit: extSupplierTarget.unit } : null}
            targetKind="product_ingredient"
            buyerApiBase={linkBuyerBase}
            onClose={() => setExtSupplierTarget(null)}
            onRegistered={() => { setExtSupplierTarget(null); data.refetch(); bulk.loadSuggestions(); }}
          />
        </>
      )}

      <DeleteConfirmModal
        isOpen={deleteConfirm.showModal}
        onClose={deleteConfirm.close}
        target={deleteConfirm.target}
        onConfirm={deleteConfirm.handleConfirm}
      />
    </Container>
  );
};

export default InventoryManager;
