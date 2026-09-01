export interface InventoryManagerProps {
  mode: 'restaurant' | 'brand';
  restaurantId?: number;
}

export type InventoryMode = 'restaurant' | 'brand';
export type InventoryTab = 'dashboard' | 'list' | 'history' | 'categories';
export type StockStatus = 'normal' | 'low_stock' | 'out_of_stock';
export type StockItemType = 'ingredient' | 'general_stock';
export type PredictionConfidence = 'high' | 'medium' | 'low' | 'none';

export interface IngredientStock {
  id: number;
  name: string;
  code: string | null;
  image_url: string | null;
  unit: string;
  unit_cost: number;
  category: string;
  current_stock: number;
  min_stock: number;
  min_order: number;
  last_actual_stock: number;
  last_stock_take_at: string | null;
  avg_daily_usage: number;
  lead_time_days: number;
  safety_stock_percent: number;
  manual_daily_usage: number | null;
  prediction_confidence: PredictionConfidence;
  stock_status: StockStatus;
  supplier_id: number | null;
  supplier_name: string | null;
  // 재고 관리 대상 여부. 꺼져 있으면 목록·알림·실사·발주 제안에서 빠진다.
  // 목록에 함께 보여 주고 그 자리에서 켤 수 있게 하려고 화면까지 내려보낸다.
  // 브랜드 표준 재료(부모 브랜드 소유) — 매장은 재고를 다루되 재료 자체는 못 고친다(읽기전용).
  is_brand_shared?: boolean;
  // 공급처가 실제로 연결돼 있는가 = **발주 가능한가**. (2026-08-25)
  // 재고가 부족한가(발주제안)와는 다른 질문이다. 예전엔 이 둘을 한 값으로 섞어 써서,
  // 최소치를 안 정한 품목은 연결이 멀쩡해도 "No supplier linked" 로 뜨고 주문 버튼이 사라졌다.
  has_seller_source?: boolean;
  seller_source_name?: string | null;
  // 입고예정 — 이미 발주됐으나 미입고된 수량(재고단위 환산) + 가장 빠른 입고예정일.
  on_order_quantity?: number;
  on_order_delivery_date?: string | null;
  // 매장 보유분 — 브랜드 수량과 **더하지 않고 따로** 보여준다(2026-08-22 Irene 확정).
  // 브랜드 창고엔 없어도 매장이 들고 있을 수 있어, 발주량 판단에 필요한 정보다.
  linked_ingredient_id?: number | null;
  linked_stock?: number | null;
  linked_store_total?: number | null;
  linked_stores?: Array<{ restaurant_id: number; restaurant_name?: string; current_stock: number }>;
  supplier?: {
    id: number;
    name: string;
    code: string | null;
    contact_name: string | null;
    phone: string | null;
  } | null;
}

export interface StockAlert {
  id: number;
  ingredient_id: number;
  alert_type: 'low_stock' | 'out_of_stock';
  current_stock: number;
  min_stock: number;
  ingredient: {
    id: number;
    name: string;
    unit: string;
    unit_cost: number;
  };
}

export interface ReorderSuggestion {
  ingredient: {
    id: number;
    name: string;
    unit: string;
    unit_cost: number;
    category: string;
    owner_type?: 'brand' | 'restaurant' | 'foodcourt';
  };
  /** 브랜드 표준 재료 — 재고·PAR 은 이 매장 기준, 재료 정의는 브랜드 소유 */
  is_brand_shared?: boolean;
  current_stock: number;
  min_stock: number;
  avg_daily_usage: number;
  lead_time_days: number;
  reorder_point: number;
  par_level: number;
  suggested_qty: number;
  estimated_cost: number;
  urgency: 'critical' | 'high' | 'normal';
  prediction_confidence: PredictionConfidence;
}

export interface Summary {
  total_items: number;
  low_stock_count: number;
  out_of_stock_count: number;
  monthly_loss: number;
  unresolved_alerts: number;
}

export interface ExpiringItem {
  id: number;
  batch_number: string | null;
  ingredient_id: number;
  ingredient_name: string;
  remaining_quantity: number;
  unit: string;
  expiry_date: string;
  days_until_expiry: number;
  urgency: 'expired' | 'critical' | 'warning' | 'normal';
}

export interface GeneralStockItem {
  id: number;
  name: string;
  code: string | null;
  image_url: string | null;
  category: string;
  current_stock: number;
  min_stock: number;
  min_order: number;
  stock_unit: string;
  unit: string;
  unit_cost: number;
  supplier_id: number | null;
  supplier_name: string | null;
  last_stock_take_at: string | null;
  stock_status: StockStatus;
}

export interface Supplier {
  id: number;
  name: string;
}

export interface GeneralStockCategory {
  id: number;
  name: string;
  emoji?: string;
}

export interface UnifiedStockItem {
  id: number;
  name: string;
  code?: string | null;
  image_url?: string | null;
  category: string;
  current_stock: number;
  min_stock: number;
  min_order?: number;
  unit: string;
  unit_cost: number;
  supplier_name: string | null;
  stock_status: StockStatus;
  last_stock_take_at: string | null;
  item_type: StockItemType;
  avg_daily_usage?: number;
  prediction_confidence?: string;
}

export interface SettingsForm {
  lead_time_days: string;
  safety_stock_percent: string;
  manual_daily_usage: string;
  min_stock: string;
  min_order: string;
  new_stock: string;
  adjustment_reason: string;
}

export interface GeneralStockForm {
  name: string;
  code: string;
  image_url: string;
  stock_unit: string;
  unit_cost: string;
  category: string;
  current_stock: string;
  min_stock: string;
  min_order: string;
  supplier_id: string;
}

export interface DeleteTarget {
  type: StockItemType;
  id: number;
  name: string;
}

export interface InitialStockItemValues {
  quantity: string;
  min_stock: string;
}

export interface Transaction {
  id: number;
  transaction_type: string;
  quantity_change: number;
  unit: string;
  stock_after: number;
  notes: string;
  created_at: string;
  ingredient: {
    id: number;
    name: string;
    unit: string;
  };
}
