import { useState, useCallback } from 'react';
import { GeneralStockItem, GeneralStockForm } from '../types';
import { calculateStockStatus, EMPTY_GENERAL_STOCK_FORM } from '../utils';
import { AuthFetch } from './useAuthFetch';

interface Params {
  restaurantId?: number;
  isBrandGeneralMode: boolean;
  authFetch: AuthFetch;
  setGeneralStockInventory: React.Dispatch<React.SetStateAction<GeneralStockItem[]>>;
}

export function useGeneralStockForm({
  restaurantId,
  isBrandGeneralMode,
  authFetch,
  setGeneralStockInventory,
}: Params) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editing, setEditing] = useState<GeneralStockItem | null>(null);
  const [form, setForm] = useState<GeneralStockForm>(EMPTY_GENERAL_STOCK_FORM);
  const [saving, setSaving] = useState(false);

  const openAdd = useCallback(() => {
    setForm(EMPTY_GENERAL_STOCK_FORM);
    setShowAddModal(true);
  }, []);

  const openEdit = useCallback((item: GeneralStockItem) => {
    setEditing(item);
    setForm({
      name: item.name,
      code: item.code || '',
      image_url: item.image_url || '',
      stock_unit: item.stock_unit || item.unit,
      unit_cost: item.unit_cost.toString(),
      category: item.category,
      current_stock: item.current_stock.toString(),
      min_stock: item.min_stock.toString(),
      min_order: (item.min_order || 0).toString(),
      supplier_id: item.supplier_id?.toString() || '',
    });
    setShowEditModal(true);
  }, []);

  const closeAdd = useCallback(() => setShowAddModal(false), []);
  const closeEdit = useCallback(() => {
    setShowEditModal(false);
    setEditing(null);
  }, []);

  const handleAdd = useCallback(async () => {
    if (!form.name.trim()) return;
    try {
      setSaving(true);
      const endpoint = isBrandGeneralMode
        ? '/api/general-stock'
        : `/api/restaurants/${restaurantId}/inventory/general-stock`;
      const response = await authFetch(endpoint, {
        method: 'POST',
        body: JSON.stringify({
          name: form.name,
          code: form.code || null,
          image_url: form.image_url || null,
          stock_unit: form.stock_unit,
          unit_cost: parseFloat(form.unit_cost) || 0,
          category: form.category || 'Other',
          current_stock: parseFloat(form.current_stock) || 0,
          min_stock: parseFloat(form.min_stock) || 0,
          min_order: parseFloat(form.min_order) || 0,
          supplier_id: form.supplier_id ? parseInt(form.supplier_id) : null,
        }),
      });
      if (response.success && response.data) {
        const newItem = {
          ...response.data,
          stock_unit: response.data.stock_unit || response.data.unit || form.stock_unit,
          stock_status: calculateStockStatus(
            parseFloat(form.current_stock) || 0,
            parseFloat(form.min_stock) || 0
          ),
          last_stock_take_at: new Date().toISOString(),
        };
        setGeneralStockInventory(prev => [...prev, newItem]);
        setShowAddModal(false);
        setForm(EMPTY_GENERAL_STOCK_FORM);
      }
    } catch (error) {
      console.error('Failed to add general stock:', error);
    } finally {
      setSaving(false);
    }
  }, [form, isBrandGeneralMode, restaurantId, authFetch, setGeneralStockInventory]);

  const handleEdit = useCallback(async () => {
    if (!form.name.trim() || !editing) return;
    try {
      setSaving(true);
      const endpoint = isBrandGeneralMode
        ? `/api/general-stock/${editing.id}`
        : `/api/restaurants/${restaurantId}/inventory/general-stock/${editing.id}`;
      const response = await authFetch(endpoint, {
        method: 'PUT',
        body: JSON.stringify({
          name: form.name,
          code: form.code || null,
          image_url: form.image_url || null,
          stock_unit: form.stock_unit,
          unit_cost: parseFloat(form.unit_cost) || 0,
          category: form.category || 'Other',
          current_stock: parseFloat(form.current_stock) || 0,
          min_stock: parseFloat(form.min_stock) || 0,
          min_order: parseFloat(form.min_order) || 0,
          supplier_id: form.supplier_id ? parseInt(form.supplier_id) : null,
        }),
      });
      if (response.success && editing) {
        const newCurrentStock = parseFloat(form.current_stock) || 0;
        const newMinStock = parseFloat(form.min_stock) || 0;
        setGeneralStockInventory(prev => prev.map(item => {
          if (item.id === editing.id) {
            return {
              ...item,
              name: form.name,
              code: form.code || null,
              image_url: form.image_url || null,
              stock_unit: form.stock_unit,
              unit_cost: parseFloat(form.unit_cost) || 0,
              category: form.category || 'Other',
              current_stock: newCurrentStock,
              min_stock: newMinStock,
              min_order: parseFloat(form.min_order) || 0,
              supplier_id: form.supplier_id ? parseInt(form.supplier_id) : null,
              stock_status: calculateStockStatus(newCurrentStock, newMinStock),
            };
          }
          return item;
        }));
        setShowEditModal(false);
        setEditing(null);
        setForm(EMPTY_GENERAL_STOCK_FORM);
      }
    } catch (error) {
      console.error('Failed to update general stock:', error);
    } finally {
      setSaving(false);
    }
  }, [form, editing, isBrandGeneralMode, restaurantId, authFetch, setGeneralStockInventory]);

  return {
    showAddModal,
    showEditModal,
    editing,
    form,
    setForm,
    saving,
    openAdd,
    openEdit,
    closeAdd,
    closeEdit,
    handleAdd,
    handleEdit,
  };
}
