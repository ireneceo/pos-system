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

export function useInventoryData({ mode, restaurantId, authFetch, includeUntracked = false }: Params & { includeUntracked?: boolean }) {
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
          authFetch(`/api/restaurants/${restaurantId}/inventory${includeUntracked ? '?include_untracked=true' : ''}`),
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
        // 재고 관리 꺼진 항목까지 보려면 필터를 빼고 전부 받는다(그 화면에서 바로 켤 수 있게).
        const inventoryRes = await authFetch(
          includeUntracked ? '/api/product-ingredients' : '/api/product-ingredients?track_stock=true'
        );

        if (inventoryRes.success) {
          const ingredients = inventoryRes.data || [];

          const transformedInventory = ingredients.map((ing: any) => {
            // 브랜드 수량 = **브랜드 자기 재고**(current_stock). 매장이 들고 있는 양은
            // 더하지 않고 **따로** 보여준다. (2026-08-22 Irene 확정 · routes/brand-inventory.js 주석)
            // 예전엔 linked_stock + linked_store_total 을 더해 브랜드 수량인 척 보여줬는데,
            // ①브랜드가 자기 창고에 뭐가 있는지 알 수 없고 ②브랜드 행에 매장 값을 복사해 둔
            // 표시용 사본(운영 18건)과 겹쳐 이중계상으로 읽혔다.
            // 또한 입고·조정·차감은 전부 current_stock 에 쓰므로, 표시도 current_stock 이어야
            // "보이는 값"과 "바뀌는 값"이 같아진다.
            const currentStock = parseFloat(ing.current_stock) || 0;
            const storeTotal = parseFloat(ing.linked_store_total) || 0;
            const minStock = parseFloat(ing.min_stock) || 0;

            // 임계치를 안 정한 품목(min_stock=0)은 알림 대상이 아니다.
            // 예전에는 재고 0 이면 무조건 '품절'로 떠서, 애초에 재고를 안 세는 품목까지
            // 경고 목록을 가득 채웠다 — 진짜 부족한 것이 그 속에 묻혔다.
            let stockStatus: 'normal' | 'low_stock' | 'out_of_stock' = 'normal';
            if (minStock > 0) {
              if (currentStock <= 0) {
                stockStatus = 'out_of_stock';
              } else if (currentStock <= minStock) {
                stockStatus = 'low_stock';
              }
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
              track_stock: ing.track_stock !== false,
              // 발주 담기·연결 안내에 필요한 원본 정보(화면이 판단하지 않게 여기서 넘긴다)
              linked_ingredient_id: ing.linked_ingredient_id || null,
              linked_stock: ing.linked_stock != null ? parseFloat(ing.linked_stock) || 0 : null,
              linked_store_total: storeTotal,
              // 매장별 보유 내역 — "어느 매장에 얼마" 를 그대로 보여주기 위해 원본을 넘긴다
              linked_stores: Array.isArray(ing.linked_stores) ? ing.linked_stores : [],
              unit_price: parseFloat(ing.unit_price) || parseFloat(ing.unit_cost) || 0,
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
  }, [mode, restaurantId, authFetch, includeUntracked]);

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
