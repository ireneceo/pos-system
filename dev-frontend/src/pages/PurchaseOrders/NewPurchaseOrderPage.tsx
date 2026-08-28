/**
 * NewPurchaseOrderPage — 발주 풀스크린 페이지 (POS Terminal 패턴, 2026-04-29 재설계).
 *
 * Layout:
 *   ┌─────────────────────────────────────────────────────────┐
 *   │ Header — 새 주문 [Submit]                                │
 *   ├──────────────────────────────────────┬──────────────────┤
 *   │ Tab: 내 재료 / 공급업체 상품          │  Cart            │
 *   │ Filter: search + supplier + 카테고리  │                  │
 *   ├──────────────────────────────────────┤   row × N        │
 *   │   상품 카드 그리드                     │                  │
 *   │   (POS terminal 패턴 — 클릭=cart 추가) │   total + submit │
 *   └──────────────────────────────────────┴──────────────────┘
 *
 *   Tab 1: 내 재료 (매핑 ingredient — 카테고리 chip)
 *   Tab 2: 공급업체 상품 (active contract supplier 카탈로그 — 카테고리 + supplier 필터)
 *   카드 클릭 = cart 추가. 카탈로그 클릭 시 ingredient 자동 생성 + 매핑.
 *   Submit → POST /purchase-orders/bulk → vendor 별 PO 자동 생성.
 */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTabParam } from '../../hooks/useTabParam';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import DateField from '../../components/Common/DateField';
import { useAuth } from '../../contexts/AuthContext';
import { getAuthToken } from '../../utils/auth';
import SupplierOptionModal, { SupplierOptionGroup, SelectedOption } from './SupplierOptionModal';
import ConnectSellerModal from '../../components/Common/ConnectSellerModal';
import SearchableSelect from '../../components/Common/SearchableSelect';
import ConfirmDialog from '../../components/Common/ConfirmDialog';
import { Modal as UIModal } from '../../components/UI/Modal';
import { qtyStepForUnit } from '../../utils/unitConversion';

type SellerType = 'system_admin' | 'brand' | 'foodcourt' | 'supplier';

interface SellerOpt {
  id: number;
  seller_product_id: number;
  seller_type: SellerType;
  seller_entity_id: number | null;
  seller_name: string;
  unit_price: number;
  unit_conversion: number;
  min_order_quantity: number;
  lead_time_days: number;
  is_preferred: boolean;
  option_groups?: SupplierOptionGroup[];
  has_options?: boolean;
  // 공급업체 판매품목 정체성(공급업체 것) — 내부 재고명(우리 것)과 별개.
  // 백엔드 ?include=sellers 가 SupplierProduct join 으로 채움(공급업체 타입만 값, 아니면 null).
  seller_product_name?: string | null;
  seller_product_sku?: string | null;
}

interface MyIngredientRow {
  id: number;
  name: string;
  unit?: string | null;
  ingredient_category_id?: number | null;
  ingredientCategory?: { id: number; name: string; emoji?: string | null } | null;
  sellers: SellerOpt[];
  track_stock?: boolean;
  // 지금 남아 있는 재고 — "얼마나 남았나"를 보고 발주량을 정하게 목록에 같이 보여준다.
  current_stock?: number | null;
  created_at?: string | null;
  // BG (brands) only — set when this row is a BG ProductIngredient (Stock Item),
  // not a brand ingredient. Carried into the cart so submit can emit product_ingredient_id.
  product_ingredient_id?: number;
  is_product_ingredient?: boolean;
  // 매장이 보는 부모 브랜드의 표준 재료 — 발주는 되지만 공급처 연결/해제는 브랜드 전용(읽기전용).
  is_brand_shared?: boolean;
}

interface CatalogRow {
  id: number;
  name: string;
  sku?: string | null;
  unit?: string | null;
  unit_price: number;
  min_order_quantity?: number;
  image_url?: string | null;
  category_id?: number | null;
  category_name?: string | null;
  supplier?: { id: number; name: string; seller_type?: 'supplier' | 'brand' | 'foodcourt' } | null;
  already_mapped: boolean;
  mapped_ingredient_id?: number | null;
  has_options?: boolean;
  option_groups?: SupplierOptionGroup[];
}

interface CartRow {
  cart_key: string;  // ingredient_id + 옵션 조합 hash (같은 재료 다른 옵션 = 별도 row)
  ingredient_id: number;
  ingredient_name: string;
  ingredient_unit: string;
  selected_seller_id: number;
  quantity: number;
  available_sellers: SellerOpt[];
  selected_options?: SelectedOption[];
  adjusted_unit_price?: number;  // base + 옵션 price_adjustment 합
  // 담을 때의 남은 재고 — 카트에서 "얼마 남았는지 보면서" 수량을 정하려면 필요하다.
  // (2026-08-25 Irene: "재고수량 보면서 발주해야 하는데 장바구니에선 안 보인다")
  current_stock?: number | null;
  // BG (brands) only — set when the source row is a BG ProductIngredient (Stock Item).
  // submit emits { product_ingredient_id, ... } instead of { ingredient_id, ... }.
  product_ingredient_id?: number;
}

const PageWrap = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #F9FAFB;

  @media (max-width: 768px) {
    height: calc(100vh - 56px);
  }
`;

const PageHeader = styled.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #C7CED6;
  height: 80px;
  min-height: 80px;
  max-height: 80px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 16px;
    height: auto;
  }
`;

const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

/** 우측 카트 폭은 사람이 끌어서 정한다 — 품목명이 길어 기본 380px 로는 늘 모자랐다.
 *  (2026-08-25 Irene: "우측 패널 사이즈를 리사이징 가능하게, 더 넓게 해야 할 때가 많다") */
/**
 * 공급업체 판매품목명에 붙어 있는 **포장 표기**만 뽑는다.
 *   "TK 1000 (A1000) ... (50SETS X 5PKTS/CTN)"  →  "50SETS X 5PKTS/CTN"
 *   "PP SHEET LID 8511 780/850/1000CC (50PCS X 12PKTS)" → "50PCS X 12PKTS"
 * 발주는 팩 단위로 넣는데 매입은 CTN 단위로 오는 일이 많아, "몇 팩이 한 박스인지"를
 * 주문하는 자리에서 바로 봐야 한다. (2026-08-25 Irene 요청)
 * 표기 규칙이 공급업체마다 제각각이라 **해석하지 않고 그대로 보여준다** — 잘못 계산해
 * 틀린 수량을 권하느니, 적힌 것을 정확히 옮기는 편이 안전하다.
 */
const packSpecOf = (sellerProductName?: string | null): string => {
  if (!sellerProductName) return '';
  const parts = String(sellerProductName).match(/\(([^()]*)\)/g) || [];
  for (let i = parts.length - 1; i >= 0; i--) {
    const inner = parts[i].slice(1, -1).trim();
    if (/\d/.test(inner) && /(PKT|PCS|SET|CTN|BOX|ROLL|BTL|PACK|BUNDLE|GRAM)/i.test(inner)) return inner;
  }
  // 괄호 없이 "… | 900ml x 12btl/ctn" 처럼 뒤에 붙는 형태
  const tail = String(sellerProductName).split('|').pop() || '';
  const m = tail.match(/[\w.]+\s*x\s*\d+\s*[A-Za-z]+\s*\/?\s*[A-Za-z]*/i);
  return m && /\d/.test(m[0]) ? m[0].trim() : '';
};

const CART_WIDTH_KEY = 'po_cart_width';
const CART_WIDTH_DEFAULT = 380;
const CART_WIDTH_MIN = 320;
const CART_WIDTH_MAX = 760;

const Layout = styled.div<{ $cartWidth: number }>`
  display: grid;
  grid-template-columns: minmax(0, 1fr) ${p => p.$cartWidth}px;
  gap: 0;
  flex: 1;
  min-height: 0;
  background: #F9FAFB;
  overflow: hidden;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 50vh;
  }
`;

const MainPane = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-right: 1px solid #C7CED6;
  background: white;

  @media (max-width: 1024px) {
    border-right: none;
    border-bottom: 1px solid #C7CED6;
  }
`;

const TabBar = styled.div`
  display: flex;
  height: 49px;
  box-sizing: border-box;
  border-bottom: 1px solid #C7CED6;
  background: white;
  flex-shrink: 0;
`;

const TabBtn = styled.button<{ $active: boolean }>`
  flex: 1;
  box-sizing: border-box;
  padding: 14px 20px;
  background: transparent;
  border: none;
  border-bottom: 2px solid ${p => p.$active ? '#635BFF' : 'transparent'};
  color: ${p => p.$active ? '#635BFF' : '#4B5563'};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  &:hover { color: #635BFF; }
`;

const FilterRow = styled.div`
  display: flex;
  gap: 10px;
  padding: 14px 24px;
  border-bottom: 1px solid #F1F5F9;
  flex-wrap: wrap;
  align-items: center;
  flex-shrink: 0;
`;

const SearchBox = styled.input`
  flex: 1;
  min-width: 220px;
  max-width: 280px;
  padding: 9px 14px;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  font-size: 13px;
  outline: none;
  &:focus { border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99,91,255,0.1); }
`;

const FilterSel = styled.select`
  padding: 9px 12px;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  font-size: 13px;
  background: white;
  cursor: pointer;
  outline: none;
  &:focus { border-color: #635BFF; }
`;

// 검색 가능한 고급 셀렉트(SearchableSelect)를 필터 행에서 인라인으로 쓰기 위한 폭 래퍼.
const FilterSelectBox = styled.div`
  width: 200px;
  min-width: 170px;
  flex-shrink: 0;
`;

const CategoryRow = styled.div`
  display: flex;
  gap: 6px;
  padding: 10px 24px 14px;
  overflow-x: auto;
  border-bottom: 1px solid #F1F5F9;
  flex-shrink: 0;
  &::-webkit-scrollbar { height: 4px; }
  &::-webkit-scrollbar-thumb { background: #C7CED6; border-radius: 2px; }
`;

const CategoryChip = styled.button<{ $active: boolean }>`
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid ${p => p.$active ? '#635BFF' : '#C7CED6'};
  background: ${p => p.$active ? '#EEF2FF' : 'white'};
  color: ${p => p.$active ? '#635BFF' : '#1F2937'};
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s;
  &:hover { border-color: #635BFF; }
`;

const ScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 18px 24px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 14px;
`;

// 보기 컨테이너 — 카드 그리드 / 리스트 중 하나. 행 요소(Card ↔ ListRow)만 갈아끼우고
// 안의 내용(뱃지·이름·가격·옵션 버튼)은 그대로 재사용한다(두 벌 유지 금지).
const ItemContainer = styled.div<{ $list: boolean }>`
  ${p => (p.$list
    ? `display: flex; flex-direction: column; border: 1px solid #E6EBF1; border-radius: 8px; overflow: hidden; background: #fff;
       container-type: inline-size; container-name: polist;`
    : `display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 12px;`)}
`;

// 리스트(행) 보기 — 카드와 같은 데이터를 한 줄로. 많은 품목을 훑을 때 카드보다 빠르다.
const List = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
`;

const ListRow = styled.button<{ $disabled?: boolean; $actionsWidth?: number }>`
  /* 열과 자식이 1:1 (이름+배지 / 분류·단위 / 공급처 / 가격 / 액션).
     행마다 grid 가 따로라 auto 열은 행별 폭이 달라진다 → 가격·액션은 고정폭으로 정렬을 보장.
     폭 판단은 뷰포트가 아니라 **리스트 컨테이너**(@container) — 이 화면은 우측 카트 패널이
     폭을 먹어서 뷰포트 기준으론 이름 열이 찌그러진다. */
  display: grid;
  /* 분류·단위·재고는 더 이상 별도 열이 아니라 **이름 아래 줄**이다. 예전엔 분류가 열이라
     컨테이너 900px 이하에서 통째로 display:none 됐고(우측 카트 패널 때문에 사실상 항상
     숨김), 이름도 1줄 말줄임이라 긴 상품명이 잘렸다. 열을 하나 줄여 이름에 폭을 준다. */
  grid-template-columns: minmax(0, 2.4fr) minmax(0, 1fr) 96px ${p => p.$actionsWidth || 96}px;
  align-items: center;
  gap: 12px;
  width: 100%;
  min-height: 48px;
  padding: 6px 14px;
  text-align: left;
  background: #fff;
  border: none;
  border-bottom: 1px solid #F1F4F8;
  cursor: ${p => (p.$disabled ? 'default' : 'pointer')};
  opacity: ${p => (p.$disabled ? 0.55 : 1)};
  transition: background 0.15s;
  font-family: inherit;

  &:last-child { border-bottom: none; }
  &:hover { background: ${p => (p.$disabled ? '#fff' : '#F8FAFF')}; }

  /* 좁아지면 공급처를 접는다 (이름·가격·액션 우선). 분류·재고는 이름 아래라 안 사라진다. */
  @container polist (max-width: 680px) {
    grid-template-columns: minmax(0, 1fr) 96px ${p => p.$actionsWidth || 96}px;
  }

  /* 가장 좁을 때만 2줄 */
  @container polist (max-width: 460px) {
    grid-template-columns: minmax(0, 1fr) ${p => p.$actionsWidth || 96}px;
    row-gap: 6px;
  }
`;
/** 이름 칸 = 제목줄(이름+배지) + 정보줄(분류·단위·재고) 2단 */
const ListName = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 4px 0;
`;
const ListNameTop = styled.div`
  min-width: 0;
  font-size: 13.5px;
  font-weight: 600;
  color: #0A2540;
  display: flex;
  align-items: flex-start;
  gap: 6px;
  flex-wrap: wrap;
`;
/* 제목은 2줄까지 보여준다 — 한 줄 말줄임이라 긴 상품명이 앞부분만 남던 것 해소 */
const ListNameText = styled.span`
  min-width: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.35;
  word-break: break-word;
`;
/** 분류 · 단위 · 재고 — 이름 아래, 어느 폭에서도 사라지지 않는다 */
const ListMeta = styled.div`
  min-width: 0;
  font-size: 11.5px;
  color: #6B7C93;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
/** 공급처(+최소주문) — 두 번째로 접히는 열 */
const ListVendor = styled.div`
  min-width: 0;
  font-size: 12px;
  color: #6B7C93;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @container polist (max-width: 680px) { display: none; }
`;
const ListPrice = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: #0A2540;
  text-align: right;
  white-space: nowrap;

  @container polist (max-width: 460px) {
    grid-column: 2;
    grid-row: 2;
  }
`;
const ListNoSeller = styled.div`
  font-size: 12px;
  color: #92400E;
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @container polist (max-width: 460px) {
    grid-column: 2;
    grid-row: 2;
  }
`;
const ListActions = styled.div`
  display: flex;
  gap: 6px;
  justify-content: flex-end;
  flex-wrap: wrap;   /* 버튼 2개(옵션+담기)면 좁을 때 세로로 접힌다 */

  @container polist (max-width: 460px) {
    grid-column: 2;
    grid-row: 1;
  }
`;

/** 옵션 버튼 — 카드/리스트가 같은 모양을 쓴다(카드에 인라인으로 박혀 있던 것을 승격). */
const OptionsButton = styled.button`
  padding: 6px 12px;
  border: 1px solid #635BFF;
  border-radius: 8px;
  background: #EEF2FF;
  color: #635BFF;
  font-weight: 700;
  font-size: 12px;
  cursor: pointer;
  align-self: flex-start;
  font-family: inherit;
  white-space: nowrap;
`;

/** 리스트 행 썸네일 — 카탈로그 상품 이미지(작게). */
const ListThumb = styled.img`
  width: 26px;
  height: 26px;
  border-radius: 4px;
  object-fit: cover;
  flex-shrink: 0;
  background: #F1F4F8;
`;

const AddToStockButton = styled.button`
  padding: 6px 12px;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  background: #FFFFFF;
  color: #0A2540;
  font-weight: 700;
  font-size: 12px;
  cursor: pointer;
  font-family: inherit;
  white-space: nowrap;
`;


const ViewToggle = styled.div`
  display: flex;
  margin-left: auto;   /* 필터 줄 오른쪽 끝 */
  background: #F1F4F8;
  border-radius: 6px;
  padding: 2px;
  flex-shrink: 0;
`;

const ViewBtn = styled.button<{ $active: boolean }>`
  padding: 5px 14px;
  border: none;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  background: ${p => (p.$active ? '#FFFFFF' : 'transparent')};
  color: ${p => (p.$active ? '#0A2540' : '#4B5563')};
  box-shadow: ${p => (p.$active ? '0 1px 2px rgba(0,0,0,0.08)' : 'none')};
  flex-shrink: 0;
  white-space: nowrap;
`;

const Card = styled.button<{ $disabled?: boolean }>`
  background: white;
  border: 1px solid #C7CED6;
  border-radius: 10px;
  padding: 12px;
  text-align: left;
  cursor: ${p => p.$disabled ? 'default' : 'pointer'};
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-family: inherit;
  transition: all 0.15s;
  position: relative;
  opacity: ${p => p.$disabled ? 0.85 : 1};
  user-select: none;

  &:hover {
    ${p => p.$disabled ? '' : `
      border-color: #635BFF;
      box-shadow: 0 4px 14px rgba(99, 91, 255, 0.12);
      transform: translateY(-1px);
    `}
  }
`;

const ProductImage = styled.div`
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 6px;
  overflow: hidden;
  background: #F1F4F8;
  border: 1px solid #F1F5F9;
  margin-bottom: 4px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const CardName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  line-height: 1.3;
`;

const CardMeta = styled.div`
  font-size: 12px;
  color: #4B5563;
`;

const CardPrice = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #635BFF;
  margin-top: 4px;
`;

const BadgeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
  min-height: 18px;
`;

const Badge = styled.span<{ $variant?: 'success' | 'cart' | 'warning' | 'options' | 'brand' | 'foodcourt' | 'shared' }>`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 700;
  background: ${p => {
    switch (p.$variant) {
      case 'success': return '#DCFCE7';
      case 'warning': return '#FEF3C7';
      case 'options': return '#7C3AED';
      case 'brand': return '#EDE9FE';
      case 'foodcourt': return '#FCE7F3';
      case 'shared': return '#F3F4F6';
      default: return '#EEF2FF';
    }
  }};
  color: ${p => {
    switch (p.$variant) {
      case 'success': return '#166534';
      case 'warning': return '#92400E';
      case 'options': return 'white';
      case 'brand': return '#6D28D9';
      case 'shared': return '#4B5563';
      case 'foodcourt': return '#9D174D';
      default: return '#635BFF';
    }
  }};
`;

const Empty = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #4B5563;
  font-size: 13px;
  line-height: 1.6;
`;

// ── Cart sidebar ──
const CartPane = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
`;

/** 카트 왼쪽 모서리의 폭 조절 손잡이. 좁은 화면(카트가 아래로 내려가는 배치)에서는 숨긴다. */
const CartResizer = styled.div`
  position: absolute;
  left: -3px;
  top: 0;
  bottom: 0;
  width: 7px;
  cursor: col-resize;
  z-index: 5;
  background: transparent;
  &:hover, &:active { background: #635BFF22; }

  @media (max-width: 1024px) {
    display: none;
  }
`;

const CartHeader = styled.div`
  height: 49px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid #C7CED6;
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  flex-shrink: 0;
`;

const CartScroll = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 12px 16px;
`;

const CartLine = styled.div`
  border-bottom: 1px solid #F1F4F8;
  padding: 8px 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  &:last-child { border-bottom: none; }
`;

const CartLineHead = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 70px 70px 22px;
  align-items: start;
  gap: 6px;
`;

const QtyInput = styled.input`
  width: 100%;
  padding: 5px 6px;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  font-size: 12px;
  text-align: center;
  outline: none;
  &:focus { border-color: #635BFF; }
`;

const VendorMini = styled.select`
  width: 100%;
  padding: 6px 8px;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  font-size: 12px;
  background: white;
  outline: none;
  &:focus { border-color: #635BFF; }
`;

const RemoveX = styled.button`
  background: transparent;
  border: 1px solid transparent;
  color: #6B7280;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  &:hover { background: #FEF2F2; color: #DC2626; }
`;

const CartFooter = styled.div`
  border-top: 1px solid #C7CED6;
  padding: 16px 20px;
  background: #F9FAFB;
  flex-shrink: 0;
`;

const FieldLabel = styled.label`
  font-size: 11px;
  color: #4B5563;
  font-weight: 600;
  display: block;
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.4px;
`;

const InputBase = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  font-size: 13px;
  outline: none;
  &:focus { border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99,91,255,0.1); }
`;

const TotalAmount = styled.div`
  font-size: 22px;
  font-weight: 700;
  color: #0A2540;
`;

const SubmitMeta = styled.div`
  font-size: 12px;
  color: #4B5563;
  margin-bottom: 4px;
`;

const ErrorBox = styled.div`
  background: #FEF2F2;
  border: 1px solid #FCA5A5;
  color: #991B1B;
  font-size: 12px;
  padding: 8px 12px;
  border-radius: 6px;
  margin-bottom: 10px;
`;

const Toast = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: #111827;
  color: white;
  padding: 10px 18px;
  border-radius: 8px;
  font-size: 13px;
  z-index: 250;
  box-shadow: 0 8px 24px rgba(0,0,0,0.18);
`;

const sellerKey = (s: { seller_type: string; seller_entity_id: number | null }) =>
  `${s.seller_type}:${s.seller_entity_id ?? 'null'}`;

const NewPurchaseOrderPage: React.FC = () => {
  const { t } = useTranslation(['purchaseOrders', 'common']);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();

  // Buyer entity 결정 — Restaurant Admin / Brand General / Foodcourt General 모두 발주 가능
  const buyerEntity = useMemo(() => {
    const role = user?.role;
    if (!user) return null;
    if (['Restaurant Admin', 'Restaurant Owner', 'Staff'].includes(role || '') && user.restaurantId) {
      return { type: 'restaurants' as const, id: user.restaurantId };
    }
    // AuthContext user 객체는 brand_id / foodcourt_id (snake_case) 로 들고 있다(restaurantId 만 camelCase).
    // 예전엔 brandId/foodcourtId (camelCase) 를 읽어 항상 undefined → BG/FG buyerEntity=null →
    // fetchMine 조기 return → "No linked stock items"(stock item 은 owner 단위라 실제론 있는데 안 뜸).
    if (['Brand General', 'Brand Manager'].includes(role || '') && (user as any).brand_id) {
      return { type: 'brands' as const, id: (user as any).brand_id };
    }
    if (['Foodcourt General', 'Foodcourt Manager'].includes(role || '') && (user as any).foodcourt_id) {
      return { type: 'foodcourts' as const, id: (user as any).foodcourt_id };
    }
    return null;
  }, [user]);
  // 기존 코드 호환: restaurantId 변수 (string | number | null)
  const restaurantId = buyerEntity?.id;
  const buyerApiBase = buyerEntity ? `/api/${buyerEntity.type}/${buyerEntity.id}` : null;
  // 2026-06-22 (Irene): 발주 장바구니 영속화. 메모리뿐이라 페이지 이탈 시 담은 내역이 사라지던 문제.
  // buyer 별 localStorage 키에 저장 → 돌아와도 카트 유지. 제출 성공 시 클리어.
  const cartStorageKey = buyerEntity ? `po-cart:${buyerEntity.type}:${buyerEntity.id}` : null;

  const [tab, setTab] = useTabParam<'mine' | 'catalog'>('mine');

  // 보기 전환(카드/리스트). 탭마다 따로 기억하고 localStorage 에 남겨, 다시 들어와도 마지막
  // 선택이 그대로 적용된다. 옛 캐시에 값이 없거나 깨져 있어도 'card' 로 안전하게 떨어진다.
  const VIEW_KEY = 'po_view_mode';
  const readViewModes = (): { mine: 'card' | 'list'; catalog: 'card' | 'list' } => {
    const fallback = { mine: 'card' as const, catalog: 'card' as const };
    try {
      const raw = localStorage.getItem(VIEW_KEY);
      if (!raw) return fallback;
      const parsed = JSON.parse(raw);
      return {
        mine: parsed?.mine === 'list' ? 'list' : 'card',
        catalog: parsed?.catalog === 'list' ? 'list' : 'card',
      };
    } catch {
      return fallback;
    }
  };
  const [viewModes, setViewModes] = useState<{ mine: 'card' | 'list'; catalog: 'card' | 'list' }>(readViewModes);
  const viewMode = viewModes[tab];
  const setViewMode = (mode: 'card' | 'list') => {
    setViewModes(prev => {
      const next = { ...prev, [tab]: mode };
      try { localStorage.setItem(VIEW_KEY, JSON.stringify(next)); } catch { /* 저장 실패해도 화면은 동작 */ }
      return next;
    });
  };
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [supplierFilter, setSupplierFilter] = useState<string>('all');
  // mine 탭 발주처(seller) 필터 — 'type:id' 형식 (예: 'supplier:14', 'brand:1', 'all')
  const [mineSellerFilter, setMineSellerFilter] = useState<string>('all');

  const [myList, setMyList] = useState<MyIngredientRow[]>([]);
  const [loadingMine, setLoadingMine] = useState(false);

  const [catalogList, setCatalogList] = useState<CatalogRow[]>([]);
  const [catalogSuppliers, setCatalogSuppliers] = useState<Array<{ id: number; name: string }>>([]);
  const [catalogCategories, setCatalogCategories] = useState<Array<{ id: number; name: string; emoji?: string | null }>>([]);
  const [loadingCatalog, setLoadingCatalog] = useState(false);

  // 카트 영속화 (Irene): user(AuthContext) 가 첫 렌더에 늦게 오면 cartStorageKey 가 처음엔 null →
  // 그때 빈 카트로 저장돼 기존 카트가 날아가던 버그. 로드-가드 + skipSave 로 "덮어쓰기 wipe" 방지.
  const cartLoadedKeyRef = useRef<string | null>(null);
  const skipCartSaveRef = useRef(false);
  const [cart, setCart] = useState<CartRow[]>(() => {
    try {
      if (!cartStorageKey) return [];
      cartLoadedKeyRef.current = cartStorageKey; // 마운트 시 user 준비됐으면 즉시 로드
      const raw = localStorage.getItem(cartStorageKey);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch { return []; }
  });
  // key 가 첫 렌더엔 없다가 (user 늦게 로딩) 나중에 생기면 그때 로드.
  useEffect(() => {
    if (!cartStorageKey || cartLoadedKeyRef.current === cartStorageKey) return;
    cartLoadedKeyRef.current = cartStorageKey;
    skipCartSaveRef.current = true; // 이 로드로 인한 setCart 가 빈값 저장을 유발하지 않도록
    try {
      const raw = localStorage.getItem(cartStorageKey);
      const parsed = raw ? JSON.parse(raw) : [];
      setCart(Array.isArray(parsed) ? parsed : []);
    } catch { /* keep current */ }
  }, [cartStorageKey]);
  // 저장: 로드 완료된 key 에 한해서만. 로드 직후 1회는 skip (wipe 방지).
  useEffect(() => {
    if (!cartStorageKey || cartLoadedKeyRef.current !== cartStorageKey) return;
    if (skipCartSaveRef.current) { skipCartSaveRef.current = false; return; }
    try { localStorage.setItem(cartStorageKey, JSON.stringify(cart)); } catch { /* quota/serialize 무시 */ }
  }, [cart, cartStorageKey]);
  // 대기중(draft) PO 수 — 헤더에서 staging(Pending POs) 으로 바로 가는 링크 + 카운트.
  const [pendingCount, setPendingCount] = useState(0);
  useEffect(() => {
    const token = getAuthToken();
    if (!token) return;
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch('/api/purchase-orders?status=draft', { headers: { Authorization: `Bearer ${token}` } });
        const j = await r.json().catch(() => null);
        if (!cancelled && r.ok && j?.success) setPendingCount(Array.isArray(j.data) ? j.data.length : 0);
      } catch { /* noop */ }
    })();
    return () => { cancelled = true; };
  }, []);
  const [currencyConfirm, setCurrencyConfirm] = useState<{ message: string; settingsUrl: string } | null>(null);
  const [expectedDate, setExpectedDate] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // ── 카트 폭 (사람이 끌어서 정하고, 브라우저에 기억시킨다) ──────────────────────
  // localStorage 는 개인용 편의값이라 실패해도 화면이 정상 동작해야 한다 → 전부 try/catch.
  const [cartWidth, setCartWidth] = useState<number>(() => {
    try {
      const raw = window.localStorage.getItem(CART_WIDTH_KEY);
      const n = raw ? parseInt(raw, 10) : NaN;
      if (Number.isFinite(n)) return Math.min(CART_WIDTH_MAX, Math.max(CART_WIDTH_MIN, n));
    } catch { /* 저장소를 못 읽어도 기본값으로 뜬다 */ }
    return CART_WIDTH_DEFAULT;
  });
  const resizeRef = useRef<{ startX: number; startW: number } | null>(null);

  const onResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    resizeRef.current = { startX: e.clientX, startW: cartWidth };

    const onMove = (ev: MouseEvent) => {
      const st = resizeRef.current;
      if (!st) return;
      // 왼쪽으로 끌면 넓어진다(카트가 오른쪽에 있으므로 부호를 뒤집는다)
      const next = Math.min(CART_WIDTH_MAX, Math.max(CART_WIDTH_MIN, st.startW + (st.startX - ev.clientX)));
      setCartWidth(next);
    };
    const onUp = () => {
      const st = resizeRef.current;
      resizeRef.current = null;
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      document.body.style.userSelect = '';
      if (st) {
        setCartWidth(w => {
          try { window.localStorage.setItem(CART_WIDTH_KEY, String(w)); } catch { /* 기억 못 해도 그만 */ }
          return w;
        });
      }
    };
    document.body.style.userSelect = 'none';   // 끄는 동안 글자가 선택되지 않게
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }, [cartWidth]);

  const [optionModal, setOptionModal] = useState<{ row: CatalogRow; product: any } | null>(null);
  // Connect mode — mine 탭의 unlinked ingredient 를 catalog 항목과 연결할 때 사용
  const [connectTarget, setConnectTarget] = useState<{ id: number; name: string; unit?: string; product_ingredient_id?: number } | null>(null);
  // mine 탭에 untracked (track_stock=false) ingredient 표시 여부. 기본은 숨김 — 양념같이 추적 안 하는 건 발주 흐름 분리.
  const [showUntracked, setShowUntracked] = useState(false);
  // unit_conversion 입력 modal — connect 시 1 seller_unit = ? ingredient_unit
  const [conversionModal, setConversionModal] = useState<{
    row: CatalogRow;
    selectedOptions: SelectedOption[];
    adjustedUnitPrice: number;
    qty?: number;
    ingredientUnit: string;
    suggested: number;
    note?: string;
  } | null>(null);

  const buildCartKey = (ingredientId: number, optionIds: number[] = []) =>
    `ing-${ingredientId}` + (optionIds.length ? '-opt-' + [...optionIds].sort((a, b) => a - b).join('-') : '');

  useEffect(() => {
    if (!toast) return;
    const tm = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(tm);
  }, [toast]);

  const fetchMine = useCallback(async () => {
    if (!buyerApiBase) return;
    setLoadingMine(true);
    try {
      const token = getAuthToken();
      // BG 의 재고(Stock Items)는 owner_user_id 단위 ProductIngredient 가 단일 소스(브랜드 무관, owner 공유) —
      // 매장의 stock 관리 UI(ProductIngredientsTab)와 동일. 그래서 BG 는 brand Ingredient 목록을 부르지 않는다.
      // (예전엔 /api/brands/{id}/ingredients 를 같이 불러 타 매장 레스토랑 재료가 섞여 보이던 문제.)
      // Restaurant / Foodcourt 는 자기 ingredients 엔드포인트 유지.
      let ingredientRows: MyIngredientRow[] = [];
      if (buyerEntity?.type !== 'brands') {
        const res = await fetch(
          `${buyerApiBase}/ingredients?include=sellers`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const j = await res.json();
        ingredientRows = res.ok && j.success && Array.isArray(j.data) ? j.data : [];
      }

      // 매장은 부모 브랜드의 표준 재료도 발주한다 — 브랜드가 정의하고 공급처를 붙여둔 것을
      // 그대로 쓴다(읽기전용). 레시피 화면이 이미 쓰는 병합 패턴과 같은 엔드포인트.
      // docs/BRAND_STOCK_SHARING_DESIGN.md
      let brandSharedRows: MyIngredientRow[] = [];
      if (buyerEntity?.type === 'restaurants') {
        try {
          const bRes = await fetch(
            `/api/restaurants/${buyerEntity.id}/brand-ingredients?include=sellers`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const bJson = await bRes.json();
          const bData: any[] = bRes.ok && bJson.success && Array.isArray(bJson.data) ? bJson.data : [];
          brandSharedRows = bData.map((item): MyIngredientRow => ({
            id: item.id,
            name: item.name,
            unit: item.unit ?? null,
            ingredient_category_id: item.ingredient_category_id ?? null,
            ingredientCategory: item.ingredientCategory ?? null,
            track_stock: item.track_stock ?? true,
            current_stock: item.current_stock != null ? Number(item.current_stock) : null,
            created_at: item.created_at ?? null,
            is_brand_shared: true,
            sellers: (Array.isArray(item.sellerSources) ? item.sellerSources : []).map((s: any): SellerOpt => ({
              id: s.id,
              seller_product_id: s.seller_product_id,
              seller_type: s.seller_type,
              seller_entity_id: s.seller_entity_id ?? null,
              seller_name: s.seller_name,
              unit_price: Number(s.unit_price) || 0,
              unit_conversion: Number(s.unit_conversion) || 1,
              min_order_quantity: Number(s.min_order_quantity) || 1,
              lead_time_days: Number(s.lead_time_days) || 0,
              is_preferred: !!s.is_preferred,
              seller_product_name: s.seller_product_name ?? null,
              seller_product_sku: s.seller_product_sku ?? null,
            })),
          }));
        } catch { /* brand-shared fetch is additive; ignore failures */ }
      }

      // BG (brands) only — Stock Items = owner-scoped ProductIngredient with a seller-source mapping.
      let productIngredientRows: MyIngredientRow[] = [];
      if (buyerEntity?.type === 'brands') {
        try {
          const piRes = await fetch(
            '/api/product-ingredients?include=sellers',
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const piJson = await piRes.json();
          const piData: any[] = piRes.ok && piJson.success && Array.isArray(piJson.data) ? piJson.data : [];
          // Show ALL of the BG's stock items — linked or not. Unlinked items must appear
          // so the user can connect a supplier to them (the card renders a "Click to connect
          // supplier" prompt for sellers.length === 0). Previously this filtered to linked-only,
          // which hid every stock item until it already had a supplier — a chicken-and-egg that
          // made "My Items" look empty. (Irene 2026-07-05)
          productIngredientRows = piData
            .map((item): MyIngredientRow => ({
              id: 0,
              name: item.name,
              unit: item.unit ?? null,
              product_ingredient_id: item.id,
              is_product_ingredient: true,
              // DB 값을 그대로 쓴다. 예전엔 false 로 고정해서, 실제로는 track_stock=1 인
              // 재고아이템까지 전부 "untracked" 로 분류 → 기본 필터(showUntracked=false)가
              // 통째로 숨겨 "No linked stock items" 가 뜨고 숨긴 개수만 토글에 찍혔다
              // (운영 실측: owner 286개 전부 track_stock=1 인데 0개 노출). Irene 2026-08-24
              track_stock: item.track_stock ?? true,
              // 카테고리도 API 가 보내주는 걸 그대로 받는다(product_ingredients 는 category_id/category,
              // ingredients 는 ingredient_category_id/ingredientCategory 로 키 이름만 다르다).
              // 안 받아가서 BG 재고아이템이 전부 "미분류"로 떨어졌고, 카테고리 필터에 미분류 하나만
              // 뜨거나 아예 고를 게 없었다(운영: 286개 전부 카테고리 있는데 0개 노출). Irene 2026-08-24
              ingredient_category_id: item.category_id ?? null,
              ingredientCategory: item.category
                ? { id: item.category.id, name: item.category.name, emoji: item.category.emoji ?? null }
                : null,
              current_stock: item.current_stock != null ? Number(item.current_stock) : null,
              created_at: item.created_at ?? null,
              sellers: (Array.isArray(item.sellers) ? item.sellers : []).map((s): SellerOpt => ({
                id: s.id,
                seller_product_id: s.seller_product_id,
                seller_type: s.seller_type,
                seller_entity_id: s.seller_entity_id ?? null,
                seller_name: s.seller_name,
                unit_price: Number(s.unit_price) || 0,
                unit_conversion: Number(s.unit_conversion) || 1,
                min_order_quantity: Number(s.min_order_quantity) || 1,
                lead_time_days: Number(s.lead_time_days) || 0,
                is_preferred: !!s.is_preferred,
                seller_product_name: s.seller_product_name ?? null,
                seller_product_sku: s.seller_product_sku ?? null,
              })),
            }));
        } catch { /* BG stock-item fetch is additive; ignore failures */ }
      }

      setMyList([...ingredientRows, ...brandSharedRows, ...productIngredientRows]);
    } catch { setMyList([]); }
    finally { setLoadingMine(false); }
  }, [buyerApiBase, buyerEntity]);

  const fetchCatalog = useCallback(async () => {
    setLoadingCatalog(true);
    try {
      const token = getAuthToken();
      const params = new URLSearchParams();
      if (search.trim()) params.set('search', search.trim());
      if (categoryFilter !== 'all') params.set('category_id', categoryFilter);
      if (supplierFilter !== 'all') params.set('supplier_id', supplierFilter);
      const res = await fetch(`/api/supplier-catalog?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const j = await res.json();
      if (res.ok && j.success) {
        setCatalogList(Array.isArray(j.data) ? j.data : []);
        setCatalogSuppliers(j.filters?.suppliers || []);
        setCatalogCategories(j.filters?.categories || []);
      } else {
        setCatalogList([]);
      }
    } catch { setCatalogList([]); }
    finally { setLoadingCatalog(false); }
  }, [search, categoryFilter, supplierFilter]);

  useEffect(() => {
    if (tab === 'mine') fetchMine();
    else fetchCatalog();
  }, [tab, fetchMine, fetchCatalog]);

  // Deep-link from /restaurant/:id/ingredients — auto-enter connect mode for a specific ingredient.
  useEffect(() => {
    const cid = parseInt(searchParams.get('connect_ingredient_id') || '', 10);
    if (!Number.isFinite(cid) || connectTarget?.id === cid) return;
    // Deep-link 진입 — modal 자동 오픈 (catalog 탭 이동 / 자동 검색 prefill 없음)
    const row = myList.find(m => m.id === cid);
    setConnectTarget({ id: cid, name: row?.name || `#${cid}`, unit: row?.unit || '' });
  }, [searchParams, myList, connectTarget]);

  const myCategories = useMemo(() => {
    const map = new Map<number, { id: number; name: string; emoji?: string | null }>();
    for (const r of myList) {
      if (r.ingredientCategory) map.set(r.ingredientCategory.id, r.ingredientCategory);
    }
    return Array.from(map.values());
  }, [myList]);

  // 미분류(카테고리 없는 스톡아이템)가 하나라도 있으면 카테고리 필터에 "미분류" 버킷 노출.
  // "Add to My Stock" 으로 카탈로그에서 바로 등록한 항목은 카테고리가 비어 여기 잡힌다.
  const UNCAT = '__uncat__';
  const hasUncategorizedMine = useMemo(
    () => myList.some(r => !r.ingredient_category_id && (showUntracked || r.track_stock !== false)),
    [myList, showUntracked]
  );

  const filteredMy = useMemo(() => {
    const q = search.trim().toLowerCase();
    const ts = (r: MyIngredientRow) => (r.created_at ? new Date(r.created_at).getTime() : 0);
    return myList.filter(r => {
      // Track in Inventory 토글 OFF 이면 mine 탭에서 숨김 (showUntracked=true 일 때만 노출)
      if (!showUntracked && r.track_stock === false) return false;
      if (categoryFilter !== 'all') {
        if (categoryFilter === UNCAT) {
          if (r.ingredient_category_id) return false;
        } else if (String(r.ingredient_category_id || '') !== categoryFilter) {
          return false;
        }
      }
      // 발주처 필터 — 해당 seller 매핑된 ingredient만
      if (mineSellerFilter !== 'all') {
        const [t, idStr] = mineSellerFilter.split(':');
        const sid = parseInt(idStr, 10);
        if (!(r.sellers || []).some(s => s.seller_type === t && s.seller_entity_id === sid)) return false;
      }
      if (!q) return true;
      const haystack: string[] = [
        r.name,
        r.unit || '',
        r.ingredientCategory?.name || '',
        ...(r.sellers || []).map(s => s.seller_name || '')
      ];
      return haystack.some(s => s.toLowerCase().includes(q));
    }).sort((a, b) => ts(b) - ts(a)); // 최신 등록 순 (newest first)
  }, [myList, search, categoryFilter, showUntracked, mineSellerFilter]);

  // mine 탭 발주처(seller) 목록 — myList의 모든 sellers union (중복 제거)
  const mineSellers = useMemo(() => {
    const seen = new Map<string, { key: string; type: string; id: number; name: string; count: number }>();
    for (const r of myList) {
      for (const s of (r.sellers || [])) {
        if (s.seller_entity_id == null) continue;
        const key = `${s.seller_type}:${s.seller_entity_id}`;
        const ex = seen.get(key);
        if (ex) ex.count++;
        else seen.set(key, { key, type: s.seller_type, id: s.seller_entity_id, name: s.seller_name || '—', count: 1 });
      }
    }
    return Array.from(seen.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [myList]);

  const untrackedCount = useMemo(() => (myList || []).filter(r => r.track_stock === false).length, [myList]);

  // isInCart / cartQtyOf — 옵션 없는 row 만 빠른 lookup (옵션 있으면 항상 새 row)
  const isInCart = (ingredientId: number) =>
    cart.some(r => r.ingredient_id === ingredientId && (!r.selected_options || r.selected_options.length === 0));
  const cartQtyOf = (ingredientId: number) =>
    cart.filter(r => r.ingredient_id === ingredientId).reduce((s, r) => s + r.quantity, 0);

  // BG Stock Item rows share ingredient_id 0, so the helpers above can't tell them apart.
  // These match by cart_key (`pi-${product_ingredient_id}`) — used ONLY by the BG render path.
  const isInCartByKey = (key: string) => cart.some(r => r.cart_key === key);
  const cartQtyOfByKey = (key: string) =>
    cart.filter(r => r.cart_key === key).reduce((s, r) => s + r.quantity, 0);
  const incCartQtyByKey = (key: string, delta: number = 1) => {
    setCart(prev => prev.map(r => r.cart_key === key ? { ...r, quantity: Math.max(0, r.quantity + delta) } : r));
  };

  const addMineToCart = (row: MyIngredientRow) => {
    // 발주처 필터가 활성화돼 있으면 그 seller로 발주. 아니면 preferred → 첫 항목.
    let preferred: SellerOpt | undefined;
    if (mineSellerFilter !== 'all') {
      const [t2, idStr] = mineSellerFilter.split(':');
      const sid = parseInt(idStr, 10);
      preferred = row.sellers.find(s => s.seller_type === t2 && s.seller_entity_id === sid);
    }
    if (!preferred) preferred = row.sellers.find(s => s.is_preferred) || row.sellers[0];
    if (!preferred) {
      setToast(t('newPo.toast.needLink', { name: row.name, defaultValue: '"{{name}}" needs to be linked to a supplier first' }) as string);
      return;
    }
    // BG Stock Item rows share ingredient id 0 — namespace their cart_key by
    // product_ingredient_id so distinct stock items don't collide into one cart row.
    const key = row.product_ingredient_id
      ? `pi-${row.product_ingredient_id}`
      : buildCartKey(row.id);
    if (cart.some(r => r.cart_key === key)) {
      setCart(prev => prev.map(r => r.cart_key === key ? { ...r, quantity: r.quantity + 1 } : r));
      return;
    }
    setCart(prev => [...prev, {
      cart_key: key,
      ingredient_id: row.id,
      ingredient_name: row.name,
      ingredient_unit: row.unit || '',
      current_stock: row.current_stock ?? null,
      selected_seller_id: preferred.id,
      quantity: Math.max(1, preferred.min_order_quantity || 1),
      available_sellers: row.sellers,
      ...(row.product_ingredient_id ? { product_ingredient_id: row.product_ingredient_id } : {})
    }]);
    setToast(t('newPo.toast.added', { name: row.name, defaultValue: '"{{name}}" added to cart' }) as string);
  };

  const incCartQty = (ingredientId: number, delta: number = 1) => {
    // 옵션 없는 row 우선
    setCart(prev => {
      const idx = prev.findIndex(r => r.ingredient_id === ingredientId && (!r.selected_options || r.selected_options.length === 0));
      if (idx < 0) return prev;
      return prev.map((r, i) => i === idx ? { ...r, quantity: Math.max(0, r.quantity + delta) } : r);
    });
  };

  // Catalog 카드 본체 클릭 — 옵션 있어도 즉시 cart 추가 (기본값). 옵션 모달은 별도 옵션 버튼.
  const addCatalogToCart = async (row: CatalogRow) => {
    if (!restaurantId) return;
    await ensureIngredientAndAddToCart(row, [], row.unit_price);
  };

  // 양방향 등록 — 카탈로그 상품을 "주문 없이" 내 스톡아이템으로 등록(공급업체 매핑 포함).
  // 등록 후 My Stock Items 탭에 바로 나타나고, 카탈로그 행은 "Linked" 로 전환된다.
  const registerCatalogToStock = async (row: CatalogRow) => {
    if (!buyerApiBase) return;
    await ensureIngredientAndAddToCart(row, [], row.unit_price, undefined, undefined, { stockOnly: true });
  };

  const openCatalogOptionModal = (row: CatalogRow) => {
    if (row.option_groups && row.option_groups.length > 0) {
      setOptionModal({ row, product: row });
    }
  };

  const openMineOptionModal = (row: MyIngredientRow) => {
    const preferred = row.sellers.find(s => s.is_preferred) || row.sellers[0];
    if (!preferred?.option_groups || preferred.option_groups.length === 0) return;
    const catalogShape: CatalogRow = {
      id: preferred.seller_product_id,
      name: row.name,
      unit: row.unit,
      unit_price: preferred.unit_price,
      already_mapped: true,
      mapped_ingredient_id: row.id,
      option_groups: preferred.option_groups,
      has_options: true,
      supplier: { id: preferred.seller_entity_id || 0, name: preferred.seller_name }
    };
    setOptionModal({ row: catalogShape, product: catalogShape });
  };

  // 단위 호환성 그룹 + 자동 변환 계수 계산.
  // 호환되면 정확한 conversion (예: kg↔g = 0.001/1000) 반환, 비호환이면 null (사용자 입력 강제).
  const UNIT_WEIGHT = ['kg', 'g'];
  const UNIT_VOLUME = ['L', 'ml'];
  const UNIT_COUNT = ['piece', 'pack', 'can', 'bottle'];
  const detectConversion = (ingredientUnit: string, sellerUnit: string): { auto: number | null; compatible: boolean; note?: string } => {
    if (!ingredientUnit || !sellerUnit) return { auto: 1, compatible: true };
    const a = ingredientUnit, b = sellerUnit;
    if (a === b) return { auto: 1, compatible: true };
    // weight
    if (UNIT_WEIGHT.includes(a) && UNIT_WEIGHT.includes(b)) {
      if (a === 'kg' && b === 'g') return { auto: 0.001, compatible: true, note: '1g = 0.001 kg' };
      if (a === 'g' && b === 'kg') return { auto: 1000, compatible: true, note: '1 kg = 1000 g' };
    }
    // volume
    if (UNIT_VOLUME.includes(a) && UNIT_VOLUME.includes(b)) {
      if (a === 'L' && b === 'ml') return { auto: 0.001, compatible: true, note: '1 ml = 0.001 L' };
      if (a === 'ml' && b === 'L') return { auto: 1000, compatible: true, note: '1 L = 1000 ml' };
    }
    // count→count: 같은 ENUM 안에서도 변환 모름 (piece vs pack 등) — 사용자 입력
    if (UNIT_COUNT.includes(a) && UNIT_COUNT.includes(b)) {
      return { auto: null, compatible: false, note: t('unitCompat.diff', '{{a}} ↔ {{b}}: unit mismatch — manual entry required', { a, b }) as string };
    }
    // cross-group (weight ↔ volume ↔ count): 호환 안 됨
    return { auto: null, compatible: false, note: t('unitCompat.incompatible', '{{a}} and {{b}} are incompatible. Enter manually or add as a separate ingredient', { a, b }) as string };
  };

  const ensureIngredientAndAddToCart = async (row: CatalogRow, selectedOptions: SelectedOption[], adjustedUnitPrice: number, qty?: number, overrideConversion?: number, opts: { stockOnly?: boolean } = {}) => {
    if (!buyerApiBase) return;
    try {
      const token = getAuthToken();
      // BG (brands) 는 ProductIngredient 패밀리 → 전용 endpoint. RA/FC 는 기존 경로 100% 유지.
      const isBG = buyerEntity?.type === 'brands';
      // Seller type 분기 — supplier / brand / foodcourt 모두 동일 endpoint, body 키만 다름
      const sellerType = (row.supplier as any)?.seller_type || 'supplier';
      const body: any =
        sellerType === 'brand' ? { brand_product_id: row.id }
        : sellerType === 'foodcourt' ? { foodcourt_product_id: row.id }
        : { supplier_product_id: row.id };
      // Connect mode — 기존 ingredient 에 매핑만 추가 + unit_conversion 결정
      let autoConvNote: string | null = null;
      if (connectTarget?.id) {
        if (isBG) {
          body.existing_product_ingredient_id = connectTarget.product_ingredient_id;
        } else {
          body.existing_ingredient_id = connectTarget.id;
        }
        const ingUnit = connectTarget.unit
          || (isBG
              ? myList.find(m => m.product_ingredient_id === connectTarget.product_ingredient_id)?.unit
              : myList.find(m => m.id === connectTarget.id)?.unit)
          || '';
        const sellerUnit = row.unit || '';
        if (overrideConversion != null) {
          body.unit_conversion = overrideConversion;
        } else {
          const conv = detectConversion(ingUnit, sellerUnit);
          if (conv.auto != null && conv.compatible) {
            body.unit_conversion = conv.auto;
            if (conv.note) autoConvNote = conv.note; // 자동 변환 알림용
          } else {
            // 호환 안 됨 → modal 띄워 사용자 입력 받기
            setConversionModal({ row, selectedOptions, adjustedUnitPrice, qty, ingredientUnit: ingUnit, suggested: 1, note: conv.note });
            return; // 사용자 입력 대기
          }
        }
      }
      const fromCatalogUrl = isBG
        ? '/api/product-ingredients/from-catalog'
        : `${buyerApiBase}/ingredients/from-catalog`;
      const res = await fetch(fromCatalogUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(body)
      });
      const j = await res.json();
      if (!res.ok || !j.success) {
        setError(j?.message || 'Failed to add');
        return;
      }
      const ing = j.data.ingredient;
      const map = j.data.mapping;
      // 양방향 등록 — 카탈로그에서 "주문 없이 내 스톡으로만 등록". 카트 담기를 건너뛰고
      // 스톡 목록(mine)·카탈로그(already_mapped 갱신)만 새로고침한다.
      if (opts.stockOnly) {
        setToast(t('newPo.toast.stockRegistered', { name: ing.name, defaultValue: '"{{name}}" added to My Stock Items' }) as string);
        setConnectTarget(null);
        fetchMine();
        fetchCatalog();
        return;
      }
      const seller: SellerOpt = {
        id: map.id,
        seller_product_id: map.seller_product_id,
        seller_type: map.seller_type,
        seller_entity_id: map.seller_entity_id,
        seller_name: row.supplier?.name || 'Supplier',
        unit_price: parseFloat(map.unit_price) || 0,
        unit_conversion: parseFloat(map.unit_conversion) || 1,
        min_order_quantity: map.min_order_quantity || 1,
        lead_time_days: map.lead_time_days || 0,
        is_preferred: !!map.is_preferred,
        // CatalogRow 의 name/sku = 공급업체 판매품목명/SKU(공급업체 것). 카트 부라인 병기용.
        seller_product_name: row.name ?? null,
        seller_product_sku: row.sku ?? null
      };
      const optionIds = selectedOptions.map(o => o.option_id);
      // BG: ProductIngredient 패밀리 → mine-tab 과 동일하게 cart_key 를 pi-{id} 로 namespace + row 에 product_ingredient_id 부착.
      // RA/FC: 기존 ingredient 기반 cart_key 유지 (변경 없음).
      const cart_key = isBG && optionIds.length === 0
        ? `pi-${ing.id}`
        : buildCartKey(ing.id, optionIds);
      const baseQty = qty ?? Math.max(1, seller.min_order_quantity);

      const existing = cart.find(r => r.cart_key === cart_key);
      if (existing) {
        setCart(prev => prev.map(r => r.cart_key === cart_key ? { ...r, quantity: r.quantity + baseQty } : r));
      } else {
        setCart(prev => [...prev, {
          cart_key,
          ingredient_id: isBG ? 0 : ing.id,
          ingredient_name: ing.name,
          ingredient_unit: ing.unit || '',
          current_stock: (ing as any).current_stock ?? null,
          selected_seller_id: seller.id,
          quantity: baseQty,
          available_sellers: [seller],
          selected_options: selectedOptions.length ? selectedOptions : undefined,
          adjusted_unit_price: selectedOptions.length ? adjustedUnitPrice : undefined,
          ...(isBG ? { product_ingredient_id: ing.id } : {})
        }]);
      }
      if (j.data.connected) {
        const baseMsg = t('newPo.toast.connected', { name: ing.name, defaultValue: '"{{name}}" connected to a supplier ✓' }) as string;
        setToast(autoConvNote ? `${baseMsg} — ${autoConvNote}` : baseMsg);
        setConnectTarget(null);
        fetchMine();
        // Switch back to mine tab so the user sees the now-linked ingredient ready to order
        setTab('mine');
      } else if (j.data.created) {
        setToast(t('newPo.toast.linked', { name: ing.name, defaultValue: '"{{name}}" added to your inventory' }) as string);
        if (tab === 'mine') fetchMine();
      } else {
        setToast(t('newPo.toast.added', { name: ing.name, defaultValue: '"{{name}}" added to cart' }) as string);
      }
    } catch (e: any) {
      setError(e?.message || 'Network error');
    }
  };

  const updateRow = (cartKey: string, patch: Partial<CartRow>) => {
    setCart(prev => prev.map(r => r.cart_key === cartKey ? { ...r, ...patch } : r));
  };
  const removeRow = (cartKey: string) => {
    setCart(prev => prev.filter(r => r.cart_key !== cartKey));
  };

  const groups = useMemo(() => {
    const map = new Map<string, {
      key: string;
      seller_type: SellerType;
      seller_entity_id: number | null;
      seller_name: string;
      items: Array<{ row: CartRow; seller: SellerOpt }>;
      subtotal: number;
    }>();
    for (const row of cart) {
      const seller = row.available_sellers.find(s => s.id === row.selected_seller_id);
      if (!seller) continue;
      const k = sellerKey(seller);
      const effectiveUnitPrice = row.adjusted_unit_price ?? seller.unit_price;
      const lineTotal = effectiveUnitPrice * row.quantity;
      const ex = map.get(k);
      if (ex) { ex.items.push({ row, seller }); ex.subtotal += lineTotal; }
      else map.set(k, {
        key: k, seller_type: seller.seller_type, seller_entity_id: seller.seller_entity_id,
        seller_name: seller.seller_name, items: [{ row, seller }], subtotal: lineTotal
      });
    }
    return Array.from(map.values());
  }, [cart]);

  const grandTotal = useMemo(() => groups.reduce((s, g) => s + g.subtotal, 0), [groups]);

  const submit = async () => {
    if (cart.length === 0) {
      setError(t('newPo.error.empty', 'Cart is empty.') as string);
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const token = getAuthToken();
      // 옵션 선택 정보는 group notes 에 직렬화 (PurchaseOrder.notes — Phase D 에서 backend item-level 처리 예정)
      const groupsBody = groups.map(g => {
        const optionLines = g.items
          .filter(({ row }) => row.selected_options && row.selected_options.length > 0)
          .map(({ row }) => `${row.ingredient_name}: ${row.selected_options!.map(o => `${o.group_name}=${o.option_name}`).join(', ')}`);
        const baseNotes = optionLines.length > 0
          ? `[Options]\n${optionLines.join('\n')}`
          : null;
        return {
          seller_type: g.seller_type,
          seller_entity_id: g.seller_entity_id,
          items: g.items.map(({ row, seller }) => (
            row.product_ingredient_id
              ? {
                  // BG Stock Item (ProductIngredient) — backend accepts product_ingredient_id.
                  product_ingredient_id: row.product_ingredient_id,
                  ingredient_seller_product_id: seller.id,
                  quantity_ordered: row.quantity
                }
              : {
                  ingredient_id: row.ingredient_id,
                  ingredient_seller_product_id: seller.id,
                  quantity_ordered: row.quantity
                }
          )),
          expected_delivery_date: expectedDate || null,
          delivery_address: deliveryAddress.trim() || null,
          notes: baseNotes
        };
      });
      // Cart submit (1차) → status='draft' staging. 사용자가 staging 페이지에서 외부 PO 처리 후 일괄 Submit
      const res = await fetch('/api/purchase-orders/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ groups: groupsBody, auto_submit: false })
      });
      const j = await res.json();
      if (!res.ok || !j.success) {
        if (j?.code === 'NO_BUYER_CURRENCY' || j?.code === 'CURRENCY_MISMATCH') {
          setCurrencyConfirm({ message: j.message, settingsUrl: j.settingsUrl || '/pos/settings' });
          return;
        }
        setError(j?.message || t('newPo.error.failed', 'Failed to create POs') as string);
        return;
      }
      // 제출 성공 → 카트는 draft PO 로 옮겨졌으므로 비운다(메모리 + localStorage).
      try { if (cartStorageKey) localStorage.removeItem(cartStorageKey); } catch { /* noop */ }
      setCart([]);
      navigate('/pos/purchase-orders/staging');
    } catch (e: any) {
      setError(e?.message || 'Network error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageWrap>
      <PageHeader>
        <PageTitle>{t('newPo.title', 'Purchase Order')}</PageTitle>
        <ThemedButton variant="outline" onClick={() => navigate('/pos/purchase-orders/staging')}>
          {t('newPo.pendingLink', 'Pending POs')}{pendingCount > 0 ? ` (${pendingCount})` : ''} →
        </ThemedButton>
      </PageHeader>

      <Layout $cartWidth={cartWidth}>
        <MainPane>
          <TabBar>
            <TabBtn $active={tab === 'mine'} onClick={() => { setTab('mine'); setCategoryFilter('all'); setMineSellerFilter('all'); setSearch(''); }}>
              {t('newPo.tabMine', 'My Stock Items')}
            </TabBtn>
            <TabBtn $active={tab === 'catalog'} onClick={() => { setTab('catalog'); setCategoryFilter('all'); setSupplierFilter('all'); setSearch(''); }}>
              {t('newPo.tabCatalog', 'Supplier Catalog')}
            </TabBtn>
          </TabBar>

          {connectTarget && tab === 'catalog' && (
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              gap: 12, padding: '10px 14px', margin: '0 0 12px',
              background: '#FEF3C7', border: '1px solid #FDE68A', borderRadius: 8,
              fontSize: 13, color: '#92400E'
            }}>
              <div>
                <strong>{t('newPo.connecting', 'Connecting')}:</strong> {connectTarget.name} —{' '}
                {t('newPo.connectHelp', 'click any catalog item below to link this ingredient to a supplier')}
              </div>
              <button
                type="button"
                onClick={() => { setConnectTarget(null); setSearch(''); }}
                style={{ background: 'transparent', border: '1px solid #92400E', color: '#92400E', borderRadius: 6, padding: '4px 10px', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}
              >
                {t('common.cancel', 'Cancel')}
              </button>
            </div>
          )}

          <FilterRow>
            <SearchBox
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('newPo.searchPlaceholder', 'Search products...') as string}
            />
            {tab === 'catalog' && catalogSuppliers.length > 0 && (
              <FilterSel value={supplierFilter} onChange={(e) => setSupplierFilter(e.target.value)}>
                <option value="all">{t('newPo.allSuppliers', 'All suppliers')}</option>
                {catalogSuppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </FilterSel>
            )}
            {tab === 'mine' && (myCategories.length > 0 || hasUncategorizedMine) && (
              <FilterSelectBox>
                <SearchableSelect
                  options={[
                    ...myCategories.map(c => ({
                      value: String(c.id),
                      label: `${c.emoji ? c.emoji + ' ' : ''}${c.name}`,
                    })),
                    ...(hasUncategorizedMine ? [{ value: UNCAT, label: t('newPo.uncategorized', '미분류') as string }] : []),
                  ]}
                  value={categoryFilter === 'all' ? null : categoryFilter}
                  onChange={(val) => setCategoryFilter(val == null ? 'all' : String(val))}
                  placeholder={t('newPo.allCategoriesFilter', 'All categories') as string}
                  allowClear
                  noOptionsMessage={t('newPo.noCategories', 'No categories') as string}
                />
              </FilterSelectBox>
            )}
            {tab === 'mine' && mineSellers.length > 0 && (
              <FilterSelectBox>
                <SearchableSelect
                  options={mineSellers.map(s => ({
                    value: s.key,
                    label: `${s.name} (${s.count})`,
                    subLabel: s.type === 'brand' ? 'Brand' : s.type === 'foodcourt' ? 'Foodcourt' : 'Supplier',
                  }))}
                  value={mineSellerFilter === 'all' ? null : mineSellerFilter}
                  onChange={(val) => setMineSellerFilter(val == null ? 'all' : String(val))}
                  placeholder={t('newPo.allSellers', 'All sellers') as string}
                  allowClear
                  noOptionsMessage={t('newPo.noSellers', 'No sellers') as string}
                />
              </FilterSelectBox>
            )}
            {tab === 'mine' && untrackedCount > 0 && (
              <label style={{
                display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 10px',
                background: showUntracked ? '#EEF2FF' : '#F1F4F8',
                border: `1px solid ${showUntracked ? '#C7D2FE' : '#C7CED6'}`,
                borderRadius: 6, fontSize: 12, fontWeight: 600,
                color: showUntracked ? '#3730A3' : '#4B5563', cursor: 'pointer'
              }}>
                <input
                  type="checkbox"
                  checked={showUntracked}
                  onChange={(e) => setShowUntracked(e.target.checked)}
                  style={{ margin: 0 }}
                />
                {t('newPo.showUntracked', 'Show untracked')} ({untrackedCount})
              </label>
            )}
            {/* 보기 전환 — 카드 / 리스트. 탭별로 기억하고 localStorage 에 남아 재진입 시 유지된다. */}
            <ViewToggle role="group" aria-label={t('newPo.viewMode', 'View mode') as string}>
              <ViewBtn
                type="button"
                $active={viewMode === 'card'}
                aria-pressed={viewMode === 'card'}
                title={t('newPo.viewCard', 'Card view') as string}
                onClick={() => setViewMode('card')}
              >
                {t('newPo.viewCard', 'Card')}
              </ViewBtn>
              <ViewBtn
                type="button"
                $active={viewMode === 'list'}
                aria-pressed={viewMode === 'list'}
                title={t('newPo.viewList', 'List view') as string}
                onClick={() => setViewMode('list')}
              >
                {t('newPo.viewList', 'List')}
              </ViewBtn>
            </ViewToggle>
          </FilterRow>

          {tab === 'catalog' && (
            <CategoryRow>
              <CategoryChip $active={categoryFilter === 'all'} onClick={() => setCategoryFilter('all')}>
                {t('newPo.allCategories', 'All')}
              </CategoryChip>
              {catalogCategories.map(c => (
                <CategoryChip
                  key={c.id}
                  $active={categoryFilter === String(c.id)}
                  onClick={() => setCategoryFilter(String(c.id))}
                >
                  {c.emoji ? `${c.emoji} ` : ''}{c.name}
                </CategoryChip>
              ))}
            </CategoryRow>
          )}

          <ScrollArea>
            {tab === 'mine' ? (
              loadingMine ? (
                <Empty>{t('common:loading', 'Loading…')}</Empty>
              ) : filteredMy.length === 0 ? (
                <Empty>
                  <strong>{t('newPo.empty.mine.title', 'No linked stock items')}</strong>
                  <div style={{ marginTop: 8, fontSize: 12.5, color: '#4B5563', lineHeight: 1.6, maxWidth: 440 }}>
                    {t('newPo.empty.mine.desc', 'Open the Supplier Catalog tab and click a product to order it — it’s added to your inventory automatically. If that tab is empty too, connect a brand or supplier first (see the Supplier Catalog tab for how).')}
                  </div>
                </Empty>
              ) : (
                <ItemContainer $list={viewMode === 'list'}>
                  {filteredMy.map(row => {
                    // BG Stock Item rows are identified by cart_key (`pi-${product_ingredient_id}`)
                    // since their ingredient_id is 0; normal rows keep the existing id-based lookup.
                    const piKey = row.product_ingredient_id ? `pi-${row.product_ingredient_id}` : null;
                    const reactKey = piKey || row.id;
                    const inCart = piKey ? isInCartByKey(piKey) : isInCart(row.id);
                    const qInCart = piKey ? cartQtyOfByKey(piKey) : cartQtyOf(row.id);
                    const hasSeller = row.sellers && row.sellers.length > 0;
                    const cat = row.ingredientCategory;
                    const isList = viewMode === 'list';
                    const ItemBox = isList ? ListRow : Card;

                    // 표시값은 한 번만 계산해 카드/리스트가 나눠 쓴다 (두 벌로 복제하면 곧 어긋난다)
                    const catText = cat
                      ? `${cat.emoji ? cat.emoji + ' ' : ''}${cat.name}`
                      : (t('newPo.uncategorized', 'Uncategorized') as string);
                    // 재고는 "모름(null)" 과 "0" 이 다르다 — 0 을 모름으로 뭉개면 발주 판단이 틀어진다.
                    // 수량 서식은 toLocaleString 을 쓰지 않는다 — 타임존 가드가 잡기도 하고,
                    // 재고 수량은 로케일 구분자보다 소수점 정리가 중요하다(1.50 → 1.5, 3.00 → 3).
                    const fmtQty = (v: number) => {
                      const s2 = v.toFixed(2);
                      return s2.replace(/\.00$/, '').replace(/(\.\d)0$/, '$1');
                    };
                    const stockText = row.current_stock != null
                      ? `${t('newPo.inStock', 'In stock')} ${fmtQty(Number(row.current_stock))}${row.unit ? ` ${row.unit}` : ''}`
                      : '';
                    // 대표 공급처(선호 → 첫 번째)의 포장 표기 — "몇 팩이 한 박스인지"
                    const packSpec = packSpecOf(
                      (row.sellers.find(s => s.is_preferred) || row.sellers[0])?.seller_product_name
                    );
                    const metaText = [catText, row.unit || '', stockText, packSpec].filter(Boolean).join(' · ');

                    let priceText = '';
                    let vendorText = '';
                    if (hasSeller) {
                      let pricedSellers = row.sellers;
                      if (mineSellerFilter !== 'all') {
                        const [tt, idStr] = mineSellerFilter.split(':');
                        const sid = parseInt(idStr, 10);
                        pricedSellers = row.sellers.filter(s => s.seller_type === tt && s.seller_entity_id === sid);
                      }
                      const perUnit = pricedSellers.map(s => (parseFloat(String(s.unit_price)) || 0) / (parseFloat(String(s.unit_conversion)) || 1));
                      const minPer = perUnit.length ? Math.min(...perUnit) : 0;
                      // 가격 0 은 "0원에 판다"가 아니라 **아직 안 넣은 것**이다. 숫자 0.00 으로 보이면
                      // 구분이 안 돼 그대로 발주하게 된다 — Irene 2026-08-28:
                      // "원가 0이고 판매가 0이면 알게 해줄 수 없어? 알기 쉽게 ui에서"
                      priceText = minPer > 0
                        ? ((pricedSellers.length === 1 || mineSellerFilter !== 'all')
                            ? minPer.toFixed(2)
                            : `from ${minPer.toFixed(2)}`)
                        : t('newPo.priceNotSet', '가격 미설정');
                      const minOrder = Math.max(1, ...row.sellers.map(s => Number(s.min_order_quantity) || 1));
                      const vendorName = row.sellers.length === 1
                        ? row.sellers[0].seller_name
                        : `${row.sellers.length} ${t('newPo.vendors', 'vendors')}`;
                      vendorText = isList
                        ? `${vendorName}${minOrder > 1 ? ` · ${t('newPo.minOrder', 'Min')} ${minOrder}` : ''}`
                        : `/${row.unit || 'unit'} · ${vendorName}${minOrder > 1 ? ` · ${t('newPo.minOrder', 'Min')} ${minOrder}` : ''}`;
                    }
                    const noSellerText = row.is_brand_shared
                      ? (t('newPo.brandNeedsLink', 'Your brand has not linked a supplier to this item yet') as string)
                      : (t('newPo.needLink', 'Link a supplier to order') as string);
                    const hasOptions = !!(row.sellers.find(s => s.is_preferred) || row.sellers[0])?.has_options;

                    const badges = (
                      <>
                        {inCart && <Badge $variant="cart">×{qInCart}</Badge>}
                        {row.is_brand_shared && <Badge $variant="shared">{t('newPo.brandStock', 'Brand stock')}</Badge>}
                        {!inCart && !hasSeller && !row.is_brand_shared && !isList && <Badge $variant="warning">{t('newPo.connectCta', 'Click to connect supplier →')}</Badge>}
                        {!inCart && hasSeller && !isList && <Badge $variant="success">{t('newPo.linked', 'Linked')}</Badge>}
                        {hasSeller && row.sellers.some(s => s.seller_type === 'brand') && <Badge $variant="brand">{t('newPo.brandBadge', 'BRAND')}</Badge>}
                        {hasSeller && row.sellers.some(s => s.seller_type === 'foodcourt') && <Badge $variant="foodcourt">{t('newPo.foodcourtBadge', 'FOODCOURT')}</Badge>}
                      </>
                    );

                    const optionsBtn = hasSeller && hasOptions ? (
                      <OptionsButton
                        type="button"
                        onClick={(e) => { e.stopPropagation(); openMineOptionModal(row); }}
                      >
                        {t('newPo.optionsButton', 'Options')}
                      </OptionsButton>
                    ) : null;

                    const onPick = () => {
                      if (!hasSeller) {
                        // 브랜드 표준 재료는 공급처를 브랜드가 붙인다 — 매장은 연결할 수 없다(읽기전용)
                        if (row.is_brand_shared) return;
                        // 발주처 미연결 — inline modal 띄움 (페이지 이동 X, catalog 탭 자동 검색 X)
                        setConnectTarget({ id: row.id, name: row.name, unit: row.unit || '', product_ingredient_id: row.product_ingredient_id });
                        return;
                      }
                      addMineToCart(row);
                    };

                    return (
                      <ItemBox
                        key={reactKey}
                        type="button"
                        {...(isList ? { $actionsWidth: 96 } : {})}
                        onClick={onPick}
                        onDoubleClick={() => hasSeller && (piKey ? incCartQtyByKey(piKey, 1) : incCartQty(row.id, 1))}
                      >
                        {isList ? (
                          <>
                            <ListName>
                              <ListNameTop>
                                <ListNameText title={row.name}>{row.name}</ListNameText>
                                {badges}
                              </ListNameTop>
                              <ListMeta title={metaText}>{metaText}</ListMeta>
                            </ListName>
                            <ListVendor title={vendorText}>{hasSeller ? vendorText : ''}</ListVendor>
                            {hasSeller
                              ? <ListPrice>{priceText}</ListPrice>
                              : <ListNoSeller title={noSellerText}>{noSellerText}</ListNoSeller>}
                            <ListActions>{optionsBtn}</ListActions>
                          </>
                        ) : (
                          <>
                            <BadgeRow>{badges}</BadgeRow>
                            <CardName>{row.name}</CardName>
                            <CardMeta>{metaText}</CardMeta>
                            {hasSeller ? (
                              <>
                                <CardPrice>{priceText}</CardPrice>
                                <CardMeta>{vendorText}</CardMeta>
                                {optionsBtn}
                              </>
                            ) : (
                              <CardMeta style={{ color: '#92400E' }}>{noSellerText}</CardMeta>
                            )}
                          </>
                        )}
                      </ItemBox>
                    );
                  })}
                </ItemContainer>
              )
            ) : (
              loadingCatalog ? (
                <Empty>{t('common:loading', 'Loading…')}</Empty>
              ) : catalogList.length === 0 ? (
                <Empty>
                  <strong>{t('newPo.empty.catalog.title', 'No products to order yet')}</strong>
                  <div style={{ marginTop: 8, fontSize: 13, color: '#4B5563', lineHeight: 1.7, maxWidth: 480 }}>
                    {t('newPo.empty.catalog.desc', 'Products you can order come from your brand or from suppliers you connect. Set up at least one source below to start ordering.')}
                  </div>
                  <div style={{ marginTop: 14, padding: '12px 14px', background: 'white', border: '1px solid #C7CED6', borderRadius: 8, fontSize: 12.5, color: '#374151', textAlign: 'left', maxWidth: 480, lineHeight: 1.6 }}>
                    <div style={{ marginBottom: 8 }}><strong style={{ color: '#635BFF' }}>A.</strong> <strong>{t('newPo.empty.catalog.srcBrandLabel', 'From your brand')}</strong> — {t('newPo.empty.catalog.srcBrand', 'products your brand shares appear here automatically (if your store is linked to a brand). No action needed.')}</div>
                    <div style={{ marginBottom: 8 }}><strong style={{ color: '#635BFF' }}>B.</strong> <strong>{t('newPo.empty.catalog.srcSupplierLabel', 'From a registered supplier')}</strong> — {t('newPo.empty.catalog.srcSupplier', 'find one in the Suppliers directory and request a contract; their catalog appears here once they accept.')}</div>
                    <div><strong style={{ color: '#635BFF' }}>C.</strong> <strong>{t('newPo.empty.catalog.srcExternalLabel', 'Your own supplier')}</strong> — {t('newPo.empty.catalog.srcExternal', 'not in the directory? Add it directly from the Suppliers page (orders are sent by PDF / WhatsApp).')}</div>
                  </div>
                  <div style={{ marginTop: 10, fontSize: 12, color: '#6B7280', maxWidth: 480 }}>
                    {t('newPo.empty.catalog.tip', 'Tip: each product links to your inventory automatically when you order it — you don’t need to create ingredients first.')}
                  </div>
                  <button
                    type="button"
                    onClick={() => window.location.href = '/pos/supplier-directory'}
                    style={{ marginTop: 14, background: '#635BFF', color: 'white', border: 'none', borderRadius: 8, padding: '9px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
                  >
                    {t('newPo.empty.catalog.cta', 'Browse & add suppliers')}
                  </button>
                </Empty>
              ) : (
                <ItemContainer $list={viewMode === 'list'}>
                  {catalogList.map(p => {
                    const inCart = p.mapped_ingredient_id != null && cart.some(r => r.ingredient_id === p.mapped_ingredient_id);
                    const qInCart = p.mapped_ingredient_id ? cartQtyOf(p.mapped_ingredient_id) : 0;
                    const isList = viewMode === 'list';
                    const ItemBox = isList ? ListRow : Card;

                    const metaText = `${p.category_name ? `${p.category_name} · ` : ''}${p.unit || ''}${
                      (p.min_order_quantity || 1) > 1 ? ` · ${t('newPo.minOrder', 'Min')} ${p.min_order_quantity}` : ''
                    }`;
                    const sellerText = `${p.supplier?.name || ''}${p.sku ? ` · ${p.sku}` : ''}`;

                    const badges = (
                      <>
                        {p.supplier?.seller_type === 'brand' && <Badge $variant="brand">{t('newPo.brandBadge', 'BRAND')}</Badge>}
                        {p.supplier?.seller_type === 'foodcourt' && <Badge $variant="foodcourt">{t('newPo.foodcourtBadge', 'FOODCOURT')}</Badge>}
                        {inCart && <Badge $variant="cart">×{qInCart}</Badge>}
                        {!inCart && p.already_mapped && <Badge $variant="success">{t('newPo.linked', 'Linked')}</Badge>}
                      </>
                    );

                    const actions = (
                      <>
                        {p.has_options && (
                          <OptionsButton
                            type="button"
                            onClick={(e) => { e.stopPropagation(); openCatalogOptionModal(p); }}
                          >
                            {t('newPo.optionsButton', 'Options')}
                          </OptionsButton>
                        )}
                        {!p.already_mapped && (
                          <AddToStockButton
                            type="button"
                            onClick={(e) => { e.stopPropagation(); registerCatalogToStock(p); }}
                            title={t('newPo.addToStockHint', 'Add to My Stock Items without ordering') as string}
                          >
                            {t('newPo.addToStock', 'Add to My Stock')}
                          </AddToStockButton>
                        )}
                      </>
                    );

                    return (
                      <ItemBox
                        key={p.id}
                        type="button"
                        {...(isList ? { $actionsWidth: 206 } : {})}
                        onClick={() => addCatalogToCart(p)}
                        onDoubleClick={() => !p.has_options && p.mapped_ingredient_id && incCartQty(p.mapped_ingredient_id, 1)}
                      >
                        {isList ? (
                          <>
                            <ListName>
                              {p.image_url && <ListThumb src={p.image_url} alt="" loading="lazy" />}
                              <ListNameText title={p.name}>{p.name}</ListNameText>
                              {badges}
                            </ListName>
                            <ListMeta title={metaText}>{metaText}</ListMeta>
                            <ListVendor title={sellerText}>{sellerText}</ListVendor>
                            <ListPrice>{p.unit_price.toFixed(2)}</ListPrice>
                            <ListActions>{actions}</ListActions>
                          </>
                        ) : (
                          <>
                            <BadgeRow>{badges}</BadgeRow>
                            {p.image_url && (
                              <ProductImage>
                                <img src={p.image_url} alt={p.name} loading="lazy" />
                              </ProductImage>
                            )}
                            <CardName>{p.name}</CardName>
                            <CardMeta>{metaText}</CardMeta>
                            <CardPrice>{p.unit_price.toFixed(2)}</CardPrice>
                            <CardMeta>{sellerText}</CardMeta>
                            <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>{actions}</div>
                          </>
                        )}
                      </ItemBox>
                    );
                  })}
                </ItemContainer>
              )
            )}
          </ScrollArea>
        </MainPane>

        <CartPane>
          <CartResizer onMouseDown={onResizeStart} title="Drag to resize" />
          <CartHeader>
            {t('newPo.cart.title', 'Planned Order')} {cart.length > 0 && `(${cart.length})`}
          </CartHeader>
          <CartScroll>
            {cart.length === 0 ? (
              <Empty>
                {t('newPo.cartEmpty', 'Click a card to add to cart.')}
              </Empty>
            ) : (
              // Supplier 별 group 으로 cart 표시
              groups.map(g => (
                <div key={g.key} style={{ marginBottom: 14 }}>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '6px 8px', background: '#F1F4F8', borderRadius: 6,
                    marginBottom: 6, fontSize: 11, fontWeight: 700, color: '#475569',
                    textTransform: 'uppercase', letterSpacing: 0.4
                  }}>
                    <span>{g.seller_name}</span>
                    <span style={{ color: '#635BFF' }}>{g.subtotal.toFixed(2)}</span>
                  </div>
                  {g.items.map(({ row, seller }) => {
                    const effectivePrice = row.adjusted_unit_price ?? seller.unit_price;
                    return (
                  <CartLine key={row.cart_key}>
                    <CartLineHead>
                      <div style={{ minWidth: 0 }}>
                        {/* 이름을 자르면 무엇을 담았는지 알 수 없다 — 접어서 전부 보여준다.
                            남은 재고를 같이 띄워, 카트를 벗어나지 않고 수량을 정할 수 있게 한다.
                            (2026-08-25 Irene 보고) */}
                        <div style={{
                          fontSize: 13, fontWeight: 600, color: '#0A2540',
                          overflowWrap: 'anywhere', wordBreak: 'break-word', lineHeight: 1.35
                        }}>{row.ingredient_name}</div>
                        {(row.current_stock != null || packSpecOf(seller.seller_product_name)) && (
                          <div style={{ fontSize: 11, color: '#6B7280', marginTop: 2 }}>
                            {row.current_stock != null && (
                              <>{t('newPo.cart.inStock', 'In stock')}: {row.current_stock} {row.ingredient_unit || ''}</>
                            )}
                            {/* 포장 표기 — 발주는 팩으로 넣는데 매입은 박스로 오는 일이 많다 */}
                            {packSpecOf(seller.seller_product_name) && (
                              <span style={{ marginLeft: row.current_stock != null ? 6 : 0, color: '#0A2540', fontWeight: 600 }}>
                                {packSpecOf(seller.seller_product_name)}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      <QtyInput
                        type="number"
                        min={0}
                        step={qtyStepForUnit(row.ingredient_unit)}
                        value={row.quantity}
                        onChange={(e) => updateRow(row.cart_key, {
                          quantity: Math.max(0, parseFloat(e.target.value) || 0)
                        })}
                      />
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#635BFF', textAlign: 'right' }}>
                        {(effectivePrice * row.quantity).toFixed(2)}
                      </div>
                      <RemoveX type="button" onClick={() => removeRow(row.cart_key)} aria-label="remove">×</RemoveX>
                    </CartLineHead>
                    {(() => {
                      // 공급업체 판매품목명 + SKU 를 작은 회색 부라인으로 병기(공급업체 것).
                      // 내부명(주)과 판매품목명이 같으면 이름은 생략하고 SKU만. 값 없으면 조각 생략.
                      const pieces: string[] = [];
                      if (seller.seller_product_name && seller.seller_product_name !== row.ingredient_name) {
                        pieces.push(seller.seller_product_name);
                      }
                      if (seller.seller_product_sku) pieces.push(seller.seller_product_sku);
                      if (pieces.length === 0) return null;
                      return (
                        <div style={{
                          fontSize: 11, color: '#9CA3AF',
                          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                        }}>
                          {pieces.join(' · ')}
                        </div>
                      );
                    })()}
                    {row.selected_options && row.selected_options.length > 0 && (
                      <div style={{ fontSize: 11, color: '#635BFF', display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                        {row.selected_options.map(o => (
                          <span key={o.option_id} style={{ background: '#EEF2FF', padding: '1px 6px', borderRadius: 999 }}>
                            {o.option_name}
                          </span>
                        ))}
                      </div>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#6B7280' }}>
                      {row.ingredient_unit && <span>{row.ingredient_unit}</span>}
                      {row.available_sellers.length > 1 ? (
                        <VendorMini
                          style={{ flex: 1, fontSize: 11, padding: '3px 6px' }}
                          value={row.selected_seller_id}
                          onChange={(e) => updateRow(row.cart_key, {
                            selected_seller_id: parseInt(e.target.value, 10)
                          })}
                        >
                          {row.available_sellers
                            .slice()
                            .sort((a, b) => a.unit_price - b.unit_price)
                            .map(s => (
                              <option key={s.id} value={s.id}>
                                {s.seller_name} {s.unit_price.toFixed(2)}
                              </option>
                            ))}
                        </VendorMini>
                      ) : (
                        <span style={{ flex: 1 }}>{seller.seller_name}</span>
                      )}
                    </div>
                  </CartLine>
                    );
                  })}
                </div>
              ))
            )}
          </CartScroll>
          <CartFooter>
            {error && <ErrorBox>{error}</ErrorBox>}
            {cart.length > 0 && (
              <>
                <SubmitMeta>
                  {t('newPo.submit.poCount', { count: groups.length, defaultValue: '{{count}} POs' })}
                  {' · '}
                  {t('newPo.submit.itemCount', { count: cart.length, defaultValue: '{{count}} items' })}
                </SubmitMeta>
                <TotalAmount>{grandTotal.toFixed(2)}</TotalAmount>
                <div style={{ marginTop: 12 }}>
                  <ThemedButton
                    variant="primary"
                    onClick={submit}
                    disabled={submitting || cart.length === 0}
                    style={{ width: '100%' }}
                  >
                    {submitting
                      ? t('newPo.submit.submitting', 'Creating...')
                      : t('newPo.submit.button', 'Create POs')}
                  </ThemedButton>
                </div>
              </>
            )}
          </CartFooter>
        </CartPane>
      </Layout>

      {toast && <Toast>{toast}</Toast>}

      {optionModal && optionModal.row.option_groups && (
        <SupplierOptionModal
          open={true}
          onClose={() => setOptionModal(null)}
          productName={optionModal.row.name}
          basePrice={optionModal.row.unit_price}
          unit={optionModal.row.unit}
          optionGroups={optionModal.row.option_groups}
          onConfirm={async (selectedOptions, adjustedUnitPrice, qty) => {
            const row = optionModal.row;
            setOptionModal(null);
            await ensureIngredientAndAddToCart(row, selectedOptions, adjustedUnitPrice, qty);
          }}
        />
      )}
      {/* Mine 탭에서 미연결 ingredient 클릭 시 inline 매핑 modal */}
      <ConnectSellerModal
        open={!!connectTarget}
        ingredient={connectTarget ? { id: connectTarget.id, name: connectTarget.name, unit: connectTarget.unit } : null}
        buyerApiBase={buyerApiBase || ''}
        onClose={() => setConnectTarget(null)}
        onConnected={() => { fetchMine(); }}
      />

      <UIModal
        isOpen={!!conversionModal}
        onClose={() => setConversionModal(null)}
        title={t('newPo.conversion.title', 'Unit conversion')}
        maxWidth="480px"
        footer={conversionModal ? (
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => setConversionModal(null)}
              style={{ padding: '8px 16px', background: '#F1F5F9', border: '1px solid #E2E8F0', color: '#475569', borderRadius: 6, fontWeight: 600, cursor: 'pointer' }}
            >
              {t('common.cancel', 'Cancel')}
            </button>
            <button
              type="button"
              onClick={async () => {
                const { row, selectedOptions, adjustedUnitPrice, qty } = conversionModal;
                setConversionModal(null);
                setConnectTarget(null);
                await ensureIngredientAndAddToCart(row, selectedOptions, adjustedUnitPrice, qty);
                setToast(t('newPo.toast.addedAsSeparate', { defaultValue: 'Added as a separate ingredient (different unit/spec).' }) as string);
              }}
              style={{ padding: '8px 16px', background: '#FEF3C7', border: '1px solid #FDE68A', color: '#92400E', borderRadius: 6, fontWeight: 600, cursor: 'pointer' }}
            >
              {t('newPo.conversion.asSeparate', '+ Add as separate ingredient')}
            </button>
            <button
              type="button"
              onClick={async () => {
                const { row, selectedOptions, adjustedUnitPrice, qty, suggested } = conversionModal;
                if (!suggested || suggested <= 0) return;
                setConversionModal(null);
                await ensureIngredientAndAddToCart(row, selectedOptions, adjustedUnitPrice, qty, suggested);
              }}
              disabled={!conversionModal.suggested || conversionModal.suggested <= 0}
              style={{
                padding: '8px 16px',
                background: conversionModal.suggested > 0 ? '#635BFF' : '#64748B',
                border: 'none', color: 'white', borderRadius: 6, fontWeight: 600,
                cursor: conversionModal.suggested > 0 ? 'pointer' : 'not-allowed'
              }}
            >
              {t('newPo.conversion.connect', 'Connect')}
            </button>
          </div>
        ) : null}
      >
        {conversionModal && (
          <>
            <p style={{ margin: '0 0 16px', color: '#475569', fontSize: 13, lineHeight: 1.5 }}>
              <strong>{conversionModal.row.name}</strong> (1 {conversionModal.row.unit || '?'}) =
              {' '}<input
                type="number"
                step="0.001"
                min="0.001"
                value={conversionModal.suggested}
                onChange={(e) => setConversionModal(prev => prev ? { ...prev, suggested: parseFloat(e.target.value) || 0 } : prev)}
                style={{ width: 100, padding: '4px 8px', border: '1px solid #C7D2FE', borderRadius: 6, fontSize: 14, fontWeight: 600 }}
              />
              {' '}<strong>{conversionModal.ingredientUnit || '?'}</strong>
            </p>
            {conversionModal.note && (
              <div style={{ padding: 10, background: '#FEF3C7', border: '1px solid #FDE68A', borderRadius: 6, color: '#92400E', fontSize: 12, marginBottom: 16, lineHeight: 1.5 }}>
                {conversionModal.note}
              </div>
            )}
            <p style={{ margin: 0, fontSize: 12, color: '#475569', lineHeight: 1.5 }}>
              {t('newPo.conversion.help', 'Example — a 10kg box of an ingredient measured in kg: enter 10. A 30-piece tray measured in piece: enter 30.')}
            </p>
          </>
        )}
      </UIModal>

      <ConfirmDialog
        isOpen={!!currencyConfirm}
        onClose={() => setCurrencyConfirm(null)}
        onConfirm={() => {
          const url = currencyConfirm?.settingsUrl;
          setCurrencyConfirm(null);
          if (url) navigate(url);
        }}
        title={t('newPo.error.currencyTitle', 'Currency Setup Required') as string}
        message={`${currencyConfirm?.message || ''}\n\n${t('newPo.error.goToSettings', 'Open payment settings?')}`}
        confirmText={t('newPo.error.openSettings', 'Open Settings') as string}
        cancelText={t('common:cancel', 'Cancel') as string}
        variant="warning"
      />
    </PageWrap>
  );
};

export default NewPurchaseOrderPage;
