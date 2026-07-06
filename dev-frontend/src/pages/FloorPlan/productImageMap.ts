/**
 * productImageMap.ts — /api/menu items → 상품 사진 lookup (Track A, AI 없음).
 *
 * FloorPlanPage 가 이미 마운트 시 받는 `/api/menu` 응답(images/optionGroups 포함)을 소비해
 * 주문 품목 ↔ 상품 이미지를 잇는 lookup 을 만든다. 신규 API/DB 0 — 표시 전용.
 * 설계: docs/AI_FOOD_RECOGNITION_DESIGN.md §A-4.2.
 */

export interface ProductPhotoInfo {
  id: number;
  name: string;
  thumb: string | null;   // imageThumbnail (없으면 image 폴백)
  image: string | null;   // 원본 (시트/갤러리 확대용)
  category: string;       // categoryId (갤러리 필터용)
  price: number;
  description?: string | null;
  optionGroups: any[];
  soldOut: boolean;
  isSetMenu: boolean;
  setOnly: boolean;
}

export interface ProductPhotoMaps {
  byId: Map<number, ProductPhotoInfo>;
  byName: Map<string, ProductPhotoInfo>;   // key = name.trim().toLowerCase()
  list: ProductPhotoInfo[];                // 갤러리용 (is_active !== false 만)
}

const nameKey = (s: string): string => String(s || '').trim().toLowerCase();

/** /api/menu items 배열 → lookup maps. 요청 추가 0 (이미 받던 페이로드 소비). */
export function buildProductPhotoMaps(items: any[]): ProductPhotoMaps {
  const byId = new Map<number, ProductPhotoInfo>();
  const byName = new Map<string, ProductPhotoInfo>();
  const list: ProductPhotoInfo[] = [];
  (Array.isArray(items) ? items : []).forEach((p: any) => {
    if (!p || p.id == null) return;
    const thumb = p.imageThumbnail ?? p.image_thumbnail ?? p.image ?? null;
    const image = p.image ?? p.imageThumbnail ?? null;
    const info: ProductPhotoInfo = {
      id: Number(p.id),
      name: p.name || '',
      thumb: thumb || null,
      image: image || null,
      category: p.categoryId || p.category || '',
      price: Number(p.price) || 0,
      description: p.description ?? null,
      optionGroups: Array.isArray(p.optionGroups) ? p.optionGroups : [],
      soldOut: p.soldOut === true,
      isSetMenu: p.is_set_menu === true,
      setOnly: p.set_only === true,
    };
    byId.set(info.id, info);
    // 이름 중복 시 첫 항목 유지(단순·결정적).
    const k = nameKey(info.name);
    if (k && !byName.has(k)) byName.set(k, info);
    // 갤러리 목록 = 활성 상품만 (is_active 기본 true).
    if (p.is_active !== false) list.push(info);
  });
  return { byId, byName, list };
}

/**
 * 품목 → 상품 사진 조회. 우선순위: product_id → 정규화 이름. 둘 다 miss → null(플레이스홀더).
 * 세트 구성품은 라인에 product_id 가 없어 이름 매칭만 동작(설계 §A-4.2).
 */
export function lookupProductPhoto(
  maps: ProductPhotoMaps | null | undefined,
  productId?: number | null,
  name?: string | null,
): ProductPhotoInfo | null {
  if (!maps) return null;
  if (productId != null) {
    const byId = maps.byId.get(Number(productId));
    if (byId) return byId;
  }
  if (name) {
    const byName = maps.byName.get(nameKey(name));
    if (byName) return byName;
  }
  return null;
}
