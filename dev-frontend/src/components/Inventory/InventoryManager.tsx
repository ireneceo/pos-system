import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Container, Header, Title, Content, TabContainer, Tab, EmptyState } from '../UI';
import GeneralStockCategoriesTab from '../../pages/RecipeManagement/GeneralStockCategoriesTab';

import { InventoryManagerProps, InventoryTab } from './types';
import { useAuthFetch } from './hooks/useAuthFetch';
import { useInventoryData } from './hooks/useInventoryData';
import { useIngredientAdjustModal } from './hooks/useIngredientAdjustModal';
import { useSettingsModal } from './hooks/useSettingsModal';
import { useInitialStockModal } from './hooks/useInitialStockModal';
import { useGeneralStockReceiveModal } from './hooks/useGeneralStockReceiveModal';
import { useGeneralStockForm } from './hooks/useGeneralStockForm';
import { useInlineStockEdit } from './hooks/useInlineStockEdit';
import { useOrderModal } from './hooks/useOrderModal';
import { useBulkOrder } from './hooks/useBulkOrder';
import { useDeleteConfirm } from './hooks/useDeleteConfirm';
import { useAlertResolver } from './hooks/useAlertResolver';

import DashboardSection from './sections/DashboardSection';
import StockListSection from './sections/StockListSection';
import TransactionHistorySection from './sections/TransactionHistorySection';

import ReceiveModal from './modals/ReceiveModal';
import WasteModal from './modals/WasteModal';
import InitialStockModal from './modals/InitialStockModal';
import GeneralStockReceiveModal from './modals/GeneralStockReceiveModal';
import OrderModal from './modals/OrderModal';
import BulkOrderModal from './modals/BulkOrderModal';
import SettingsModal from './modals/SettingsModal';
import GeneralStockFormModal from './modals/GeneralStockFormModal';
import DeleteConfirmModal from './modals/DeleteConfirmModal';

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
  const [statusFilter, setStatusFilter] = useState('all');
  const [stockTypeFilter, setStockTypeFilter] = useState<'all' | 'ingredients' | 'general_stock'>('all');

  // ── 부족 알림에서 바로 발주 담기 ─────────────────────────────────────────
  // 즉시 발주가 아니라 **장바구니에 담는다**: 부족한 품목은 보통 여러 개 나오고,
  // 하나씩 주문서를 만들면 같은 판매자에게 주문이 쪼개진다. 담아 두면 발주 화면에서
  // 판매자별로 묶어 한 번에 보낼 수 있다.
  // 저장 형식은 발주 화면(NewPurchaseOrderPage)의 CartRow 와 **같은 모양·같은 키**를 쓴다 —
  // 다른 형식으로 쓰면 담긴 게 화면에 안 나타나는 조용한 실패가 된다.
  const [cartNotice, setCartNotice] = useState<string | null>(null);

  const addToPurchaseCart = (ingredient: any) => {
    const brandId = (user as any)?.brand_id;
    if (!brandId) return;
    const key = `po-cart:brands:${brandId}`;
    try {
      const raw = localStorage.getItem(key);
      const cart: any[] = raw ? JSON.parse(raw) : [];
      const cartKey = `pi:${ingredient.id}`;
      const existing = cart.find((r) => r.cart_key === cartKey);
      // 부족분 = 최소 재고 - 현재 재고. 0 이하면 최소 주문량(없으면 1)으로 시작한다.
      const shortfall = Math.max(0, (ingredient.min_stock || 0) - (ingredient.current_stock || 0));
      const qty = Math.max(shortfall || 0, ingredient.min_order || 0) || 1;
      if (existing) {
        existing.quantity = (existing.quantity || 0) + qty;
      } else {
        cart.push({
          cart_key: cartKey,
          ingredient_id: ingredient.linked_ingredient_id || ingredient.id,
          product_ingredient_id: ingredient.id,
          ingredient_name: ingredient.name,
          ingredient_unit: ingredient.unit,
          selected_seller_id: ingredient.supplier_id || 0,
          quantity: qty,
          available_sellers: []
        });
      }
      localStorage.setItem(key, JSON.stringify(cart));
      setCartNotice(`${ingredient.name} added to your order cart (${cart.length} item${cart.length > 1 ? 's' : ''}).`);
      window.setTimeout(() => setCartNotice(null), 4000);
    } catch {
      setCartNotice('Could not add to cart. Please try again.');
      window.setTimeout(() => setCartNotice(null), 4000);
    }
  };

  const authFetch = useAuthFetch();

  const data = useInventoryData({ mode, restaurantId, authFetch });

  const adjust = useIngredientAdjustModal({
    mode,
    restaurantId,
    authFetch,
    setInventory: data.setInventory,
    setAlerts: data.setAlerts,
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
  const bulk = useBulkOrder();

  const deleteConfirm = useDeleteConfirm({
    mode,
    restaurantId,
    isBrandGeneralMode,
    authFetch,
    setInventory: data.setInventory,
    setGeneralStockInventory: data.setGeneralStockInventory,
  });

  const resolveAlert = useAlertResolver({
    mode,
    restaurantId,
    authFetch,
    setAlerts: data.setAlerts,
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
      </Header>

      {/* 담긴 사실을 알려주지 않으면 눌렀는지 몰라 같은 품목을 또 담는다.
          발주 화면으로 강제 이동시키지는 않는다 — 여러 건을 이어서 담는 흐름을 끊지 않기 위함. */}
      {cartNotice && (
        <div style={{
          margin: '0 24px 12px', padding: '10px 14px', borderRadius: '8px',
          background: '#EEF2FF', border: '1px solid #C7D2FE', color: '#3730A3', fontSize: '13px'
        }}>
          {cartNotice}
        </div>
      )}

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
          <DashboardSection
            summary={data.summary}
            inventory={data.inventory}
            alerts={data.alerts}
            suggestions={data.suggestions}
            expiringItems={data.expiringItems}
            selectedCurrency={data.selectedCurrency}
            orderQuantities={order.orderQuantities}
            setOrderQuantities={order.setOrderQuantities}
            onReceive={adjust.openReceive}
            onWaste={adjust.openWaste}
            onResolveAlert={resolveAlert}
            onOrder={order.open}
            onAddToPurchaseCart={isBrandGeneralMode ? addToPurchaseCart : undefined}
            onGoToList={() => setActiveTab('list')}
            onGoToHistory={() => setActiveTab('history')}
            onGoToIngredientsPage={goToIngredientsPage}
          />
        ) : activeTab === 'list' ? (
          <StockListSection
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
            orderQuantities={order.orderQuantities}
            setOrderQuantities={order.setOrderQuantities}
            onOrder={order.open}
            setOrderQuantity={order.setOrderQuantity}
            inlineEdit={{
              editingStockId: inlineEdit.editingStockId,
              editingStockValue: inlineEdit.editingStockValue,
              setEditingStockValue: inlineEdit.setEditingStockValue,
              editingStockType: inlineEdit.editingStockType,
              start: inlineEdit.start,
              handleKeyDown: inlineEdit.handleKeyDown,
              save: inlineEdit.save,
            }}
            onAddGeneralStock={gsForm.openAdd}
            onGeneralStockReceive={gsReceive.open}
            onEditGeneralStock={gsForm.openEdit}
            onReceive={adjust.openReceive}
            onWaste={adjust.openWaste}
            onSettings={settings.open}
            onDelete={deleteConfirm.open}
            suggestionsById={bulk.suggestionsById}
            selectedIds={bulk.selectedIds}
            onToggleSelect={bulk.toggleSelect}
          />
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
        onClose={order.close}
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
      />

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
        onSave={settings.handleSave}
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
