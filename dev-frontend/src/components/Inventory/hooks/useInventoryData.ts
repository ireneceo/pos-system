import { useState, useEffect, useCallback } from 'react';
import { useBrandCurrency } from '../../../hooks/useBrandCurrency';
import {
  InventoryMode,
  IngredientStock,
  StockAlert,
  ReorderSuggestion,
  Summary,
  ExpiringItem,
  GeneralStockItem,
  Supplier,
  GeneralStockCategory,
} from '../types';
import { AuthFetch } from './useAuthFetch';

interface Params {
  mode: InventoryMode;
  restaurantId?: number;
  authFetch: AuthFetch;
}

export function useInventoryData({ mode, restaurantId, authFetch }: Params) {
  const { defaultCurrency } = useBrandCurrency();
  const [selectedCurrency, setSelectedCurrency] = useState<string>('RM');

  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [inventory, setInventory] = useState<IngredientStock[]>([]);
  const [alerts, setAlerts] = useState<StockAlert[]>([]);
  const [suggestions, setSuggestions] = useState<ReorderSuggestion[]>([]);
  const [expiringItems, setExpiringItems] = useState<ExpiringItem[]>([]);
  const [generalStockInventory, setGeneralStockInventory] = useState<GeneralStockItem[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [generalStockCategories, setGeneralStockCategories] = useState<GeneralStockCategory[]>([]);

  useEffect(() => {
    if (defaultCurrency) {
      setSelectedCurrency(defaultCurrency);
    }
  }, [defaultCurrency]);

  const fetchData = useCallback(async () => {
    if (mode === 'restaurant' && !restaurantId) return;

    try {
      setLoading(true);

      if (mode === 'restaurant') {
        const [summaryRes, inventoryRes, alertsRes, suggestionsRes, expiringRes] = await Promise.all([
          authFetch(`/api/restaurants/${restaurantId}/inventory/summary`),
          authFetch(`/api/restaurants/${restaurantId}/inventory`),
          authFetch(`/api/restaurants/${restaurantId}/inventory/alerts?resolved=false`),
          authFetch(`/api/restaurants/${restaurantId}/inventory/reorder-suggestions`),
          authFetch(`/api/restaurants/${restaurantId}/inventory/expiring?days=14`)
        ]);

        if (summaryRes.success) setSummary(summaryRes.data);
        if (inventoryRes.success) setInventory(inventoryRes.data);
        if (alertsRes.success) setAlerts(alertsRes.data);
        if (suggestionsRes.success) setSuggestions(suggestionsRes.data);
        if (expiringRes.success) setExpiringItems(expiringRes.data);

        try {
          const generalStockRes = await authFetch(`/api/restaurants/${restaurantId}/inventory/general-stock`);
          if (generalStockRes.success) setGeneralStockInventory(generalStockRes.data || []);
        } catch {
          setGeneralStockInventory([]);
        }

        try {
          const suppliersRes = await authFetch(`/api/restaurants/${restaurantId}/suppliers`);
          if (suppliersRes.success) setSuppliers(suppliersRes.data || []);
        } catch {
          setSuppliers([]);
        }

        try {
          const categoriesRes = await authFetch(`/api/restaurants/${restaurantId}/general-stock-categories`);
          if (categoriesRes.success) {
            const allCategories = [
              ...(categoriesRes.data.brand_categories || []),
              ...(categoriesRes.data.own_categories || [])
            ];
            setGeneralStockCategories(allCategories);
          }
        } catch {
          setGeneralStockCategories([]);
        }
      } else {
        // Brand mode
        const inventoryRes = await authFetch('/api/product-ingredients?track_stock=true');

        if (inventoryRes.success) {
          const ingredients = inventoryRes.data || [];

          const transformedInventory = ingredients.map((ing: any) => {
            const currentStock = parseFloat(ing.current_stock) || 0;
            const minStock = parseFloat(ing.min_stock) || 0;

            let stockStatus: 'normal' | 'low_stock' | 'out_of_stock' = 'normal';
            if (currentStock <= 0) {
              stockStatus = 'out_of_stock';
            } else if (currentStock <= minStock) {
              stockStatus = 'low_stock';
            }

            return {
              id: ing.id,
              name: ing.name,
              code: ing.code,
              image_url: ing.image_url,
              unit: ing.unit,
              unit_cost: parseFloat(ing.unit_cost) || 0,
              category: ing.category?.name || 'Uncategorized',
              current_stock: currentStock,
              min_stock: minStock,
              min_order: parseFloat(ing.min_order) || 0,
              last_actual_stock: parseFloat(ing.last_actual_stock) || 0,
              last_stock_take_at: ing.last_stock_take_at,
              avg_daily_usage: parseFloat(ing.avg_daily_usage) || 0,
              lead_time_days: ing.lead_time_days || 1,
              safety_stock_percent: parseFloat(ing.safety_stock_percent) || 20,
              manual_daily_usage: ing.manual_daily_usage ? parseFloat(ing.manual_daily_usage) : null,
              prediction_confidence: ing.prediction_confidence || 'none',
              stock_status: stockStatus,
              supplier_id: ing.supplier_id,
              supplier_name: ing.supplier_name
            };
          });

          setInventory(transformedInventory);

          const lowStockCount = transformedInventory.filter((i: any) => i.stock_status === 'low_stock').length;
          const outOfStockCount = transformedInventory.filter((i: any) => i.stock_status === 'out_of_stock').length;

          setSummary({
            total_items: transformedInventory.length,
            low_stock_count: lowStockCount,
            out_of_stock_count: outOfStockCount,
            monthly_loss: 0,
            unresolved_alerts: lowStockCount + outOfStockCount
          });

          const generatedAlerts = transformedInventory
            .filter((i: any) => i.stock_status !== 'normal')
            .map((i: any, idx: number) => ({
              id: idx,
              ingredient_id: i.id,
              alert_type: i.stock_status as 'low_stock' | 'out_of_stock',
              current_stock: i.current_stock,
              min_stock: i.min_stock,
              ingredient: {
                id: i.id,
                name: i.name,
                unit: i.unit,
                unit_cost: i.unit_cost
              }
            }));
          setAlerts(generatedAlerts);
        }

        try {
          const generalStockRes = await authFetch('/api/general-stock');
          if (generalStockRes.success) setGeneralStockInventory(generalStockRes.data || []);
        } catch {
          setGeneralStockInventory([]);
        }

        try {
          const categoriesRes = await authFetch('/api/general-stock-categories');
          if (categoriesRes.success) {
            setGeneralStockCategories(categoriesRes.data || []);
          }
        } catch {
          setGeneralStockCategories([]);
        }

        try {
          const suppliersRes = await authFetch('/api/suppliers');
          if (suppliersRes.success) setSuppliers(suppliersRes.data || []);
        } catch {
          setSuppliers([]);
        }

        setSuggestions([]);
        setExpiringItems([]);
      }
    } catch (error) {
      console.error('Failed to fetch inventory data:', error);
    } finally {
      setLoading(false);
    }
  }, [mode, restaurantId, authFetch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    loading,
    selectedCurrency,
    summary,
    inventory,
    setInventory,
    alerts,
    setAlerts,
    suggestions,
    expiringItems,
    generalStockInventory,
    setGeneralStockInventory,
    suppliers,
    generalStockCategories,
    refetch: fetchData,
  };
}
