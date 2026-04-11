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
import SettingsModal from './modals/SettingsModal';
import GeneralStockFormModal from './modals/GeneralStockFormModal';
import DeleteConfirmModal from './modals/DeleteConfirmModal';

const InventoryManager: React.FC<InventoryManagerProps> = ({ mode, restaurantId: propRestaurantId }) => {
  useAuth();
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

  const order = useOrderModal();

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
      />

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
