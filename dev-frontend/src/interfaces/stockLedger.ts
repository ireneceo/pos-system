/** 재고 장부 정렬 + 일괄 링크 — API 응답 타입.
 *  설계: docs/STOCK_LEDGER_UNIFICATION_DESIGN.md §9-2 */

export type LinkMode = 'connect' | 'create' | 'skip' | 'hold';

export interface SellerSource {
  seller_type: 'supplier' | 'brand' | 'foodcourt';
  seller_entity_id: number;
  seller_product_id: number;
  unit_price: string | number;
  unit_conversion: string | number;
  min_order_quantity: number;
  lead_time_days: number;
  is_preferred: boolean;
}

export interface MatchInfo {
  type: 'exact' | 'none';
  ingredient_id: number | null;
  ingredient_name: string | null;
  recipe_usage_count: number;
}

/** 모드 1 — BG 재고아이템 이관 후보 */
export interface MigrationItem {
  source_ref: string;
  source_id: number;
  name: string;
  unit: string | null;
  unit_cost: string | number | null;
  seller_sources: SellerSource[];
  match: MatchInfo;
  suggested_mode: LinkMode;
}

/** 모드 2 — 판매자 카탈로그 후보 */
export interface CatalogItem {
  seller_product_id: number;
  name: string;
  sku: string | null;
  unit: string | null;
  unit_price: string | number | null;
  min_order_quantity: number | null;
  /** 담기 불가 사유. null 이면 담을 수 있다. 화면에서 숨기지 말 것 */
  blocked_reason: string | null;
  already_linked_ingredient_id: number | null;
  match: MatchInfo;
  suggested_mode: LinkMode;
}

export interface PreviewSummary {
  total: number;
  auto: number;
  review: number;
  already_linked?: number;
  blocked?: number;
}

export interface BatchResult {
  batch_id: string;
  dry_run?: boolean;
  created: number;
  connected: number;
  skipped: number;
  held?: number;
  failed: Array<{ source_id?: number; seller_product_id?: number; reason: string }>;
}

export interface CoverageReport {
  unmapped_ingredients: Array<{ ingredient_id: number; name: string; unit: string | null; recipe_usage_count: number }>;
  recipes_without_ingredients: Array<{ recipe_id: number; name: string }>;
  summary: {
    ingredients_total: number;
    ingredients_unmapped: number;
    ingredients_unmapped_used_in_recipes: number;
    recipes_total: number;
    recipes_without_ingredients: number;
  };
}

/** 화면에서 행마다 사용자가 고른 결정 */
export interface RowDecision {
  mode: LinkMode;
  existing_ingredient_id: number | null;
  apply_cost: boolean;
}
