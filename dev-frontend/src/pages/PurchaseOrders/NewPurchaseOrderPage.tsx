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
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import DateField from '../../components/Common/DateField';
import { useAuth } from '../../contexts/AuthContext';
import { getAuthToken } from '../../utils/auth';
import SupplierOptionModal, { SupplierOptionGroup, SelectedOption } from './SupplierOptionModal';
import ConfirmDialog from '../../components/Common/ConfirmDialog';

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
}

interface MyIngredientRow {
  id: number;
  name: string;
  unit?: string | null;
  ingredient_category_id?: number | null;
  ingredientCategory?: { id: number; name: string; emoji?: string | null } | null;
  sellers: SellerOpt[];
}

interface CatalogRow {
  id: number;
  name: string;
  sku?: string | null;
  unit?: string | null;
  unit_price: number;
  image_url?: string | null;
  category_id?: number | null;
  category_name?: string | null;
  supplier?: { id: number; name: string } | null;
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
}

const PageWrap = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #FAFBFC;

  @media (max-width: 768px) {
    height: calc(100vh - 56px);
  }
`;

const PageHeader = styled.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  height: 56px;
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

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 0;
  flex: 1;
  min-height: 0;
  background: #FAFBFC;
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
  border-right: 1px solid #E6EBF1;
  background: white;

  @media (max-width: 1024px) {
    border-right: none;
    border-bottom: 1px solid #E6EBF1;
  }
`;

const TabBar = styled.div`
  display: flex;
  border-bottom: 1px solid #E6EBF1;
  background: white;
  flex-shrink: 0;
`;

const TabBtn = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 14px 20px;
  background: transparent;
  border: none;
  border-bottom: 2px solid ${p => p.$active ? '#635BFF' : 'transparent'};
  color: ${p => p.$active ? '#635BFF' : '#6B7280'};
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
  padding: 9px 14px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 13px;
  outline: none;
  &:focus { border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99,91,255,0.1); }
`;

const FilterSel = styled.select`
  padding: 9px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 13px;
  background: white;
  cursor: pointer;
  outline: none;
  &:focus { border-color: #635BFF; }
`;

const CategoryRow = styled.div`
  display: flex;
  gap: 6px;
  padding: 10px 24px 14px;
  overflow-x: auto;
  border-bottom: 1px solid #F1F5F9;
  flex-shrink: 0;
  &::-webkit-scrollbar { height: 4px; }
  &::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 2px; }
`;

const CategoryChip = styled.button<{ $active: boolean }>`
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid ${p => p.$active ? '#635BFF' : '#E6EBF1'};
  background: ${p => p.$active ? '#EEF2FF' : 'white'};
  color: ${p => p.$active ? '#635BFF' : '#374151'};
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

const Card = styled.button<{ $disabled?: boolean }>`
  background: white;
  border: 1px solid #E6EBF1;
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
  background: #F8FAFC;
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
  color: #6B7280;
`;

const CardPrice = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #635BFF;
  margin-top: 4px;
`;

const Badge = styled.span<{ $variant?: 'success' | 'cart' | 'warning' | 'options' }>`
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 700;
  background: ${p => {
    switch (p.$variant) {
      case 'success': return '#DCFCE7';
      case 'warning': return '#FEF3C7';
      case 'options': return '#7C3AED';
      default: return '#EEF2FF';
    }
  }};
  color: ${p => {
    switch (p.$variant) {
      case 'success': return '#166534';
      case 'warning': return '#92400E';
      case 'options': return 'white';
      default: return '#635BFF';
    }
  }};
  z-index: 1;
`;

const Empty = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;
  font-size: 13px;
  line-height: 1.6;
`;

// ── Cart sidebar ──
const CartPane = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const CartHeader = styled.div`
  padding: 14px 20px;
  border-bottom: 1px solid #E6EBF1;
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
  border-bottom: 1px solid #F3F4F6;
  padding: 8px 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  &:last-child { border-bottom: none; }
`;

const CartLineHead = styled.div`
  display: grid;
  grid-template-columns: 1fr 70px 70px 22px;
  align-items: center;
  gap: 6px;
`;

const QtyInput = styled.input`
  width: 100%;
  padding: 5px 6px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 12px;
  text-align: center;
  outline: none;
  &:focus { border-color: #635BFF; }
`;

const VendorMini = styled.select`
  width: 100%;
  padding: 6px 8px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 12px;
  background: white;
  outline: none;
  &:focus { border-color: #635BFF; }
`;

const RemoveX = styled.button`
  background: transparent;
  border: 1px solid transparent;
  color: #9CA3AF;
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
  border-top: 1px solid #E6EBF1;
  padding: 16px 20px;
  background: #FAFBFC;
  flex-shrink: 0;
`;

const FieldLabel = styled.label`
  font-size: 11px;
  color: #6B7280;
  font-weight: 600;
  display: block;
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.4px;
`;

const InputBase = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
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
  color: #6B7280;
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
  const { user } = useAuth();

  // Buyer entity 결정 — Restaurant Admin / Brand General / Foodcourt General 모두 발주 가능
  const buyerEntity = useMemo(() => {
    const role = user?.role;
    if (!user) return null;
    if (['Restaurant Admin', 'Restaurant Owner', 'Staff'].includes(role || '') && user.restaurantId) {
      return { type: 'restaurants' as const, id: user.restaurantId };
    }
    if (['Brand General', 'Brand Manager'].includes(role || '') && (user as any).brandId) {
      return { type: 'brands' as const, id: (user as any).brandId };
    }
    if (['Foodcourt General', 'Foodcourt Manager'].includes(role || '') && (user as any).foodcourtId) {
      return { type: 'foodcourts' as const, id: (user as any).foodcourtId };
    }
    return null;
  }, [user]);
  // 기존 코드 호환: restaurantId 변수 (string | number | null)
  const restaurantId = buyerEntity?.id;
  const buyerApiBase = buyerEntity ? `/api/${buyerEntity.type}/${buyerEntity.id}` : null;

  const [tab, setTab] = useState<'mine' | 'catalog'>('mine');
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [supplierFilter, setSupplierFilter] = useState<string>('all');

  const [myList, setMyList] = useState<MyIngredientRow[]>([]);
  const [loadingMine, setLoadingMine] = useState(false);

  const [catalogList, setCatalogList] = useState<CatalogRow[]>([]);
  const [catalogSuppliers, setCatalogSuppliers] = useState<Array<{ id: number; name: string }>>([]);
  const [catalogCategories, setCatalogCategories] = useState<Array<{ id: number; name: string; emoji?: string | null }>>([]);
  const [loadingCatalog, setLoadingCatalog] = useState(false);

  const [cart, setCart] = useState<CartRow[]>([]);
  const [currencyConfirm, setCurrencyConfirm] = useState<{ message: string; settingsUrl: string } | null>(null);
  const [expectedDate, setExpectedDate] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [optionModal, setOptionModal] = useState<{ row: CatalogRow; product: any } | null>(null);

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
      const res = await fetch(
        `${buyerApiBase}/ingredients?include=sellers`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const j = await res.json();
      setMyList(res.ok && j.success && Array.isArray(j.data) ? j.data : []);
    } catch { setMyList([]); }
    finally { setLoadingMine(false); }
  }, [buyerApiBase]);

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

  const myCategories = useMemo(() => {
    const map = new Map<number, { id: number; name: string; emoji?: string | null }>();
    for (const r of myList) {
      if (r.ingredientCategory) map.set(r.ingredientCategory.id, r.ingredientCategory);
    }
    return Array.from(map.values());
  }, [myList]);

  const filteredMy = useMemo(() => {
    const q = search.trim().toLowerCase();
    return myList.filter(r => {
      if (categoryFilter !== 'all' && String(r.ingredient_category_id || '') !== categoryFilter) return false;
      if (!q) return true;
      const haystack: string[] = [
        r.name,
        r.unit || '',
        r.ingredientCategory?.name || '',
        ...(r.sellers || []).map(s => s.seller_name || '')
      ];
      return haystack.some(s => s.toLowerCase().includes(q));
    });
  }, [myList, search, categoryFilter]);

  // isInCart / cartQtyOf — 옵션 없는 row 만 빠른 lookup (옵션 있으면 항상 새 row)
  const isInCart = (ingredientId: number) =>
    cart.some(r => r.ingredient_id === ingredientId && (!r.selected_options || r.selected_options.length === 0));
  const cartQtyOf = (ingredientId: number) =>
    cart.filter(r => r.ingredient_id === ingredientId).reduce((s, r) => s + r.quantity, 0);

  const addMineToCart = (row: MyIngredientRow) => {
    const preferred = row.sellers.find(s => s.is_preferred) || row.sellers[0];
    if (!preferred) {
      setToast(t('newPo.toast.needLink', { name: row.name, defaultValue: '"{{name}}" needs to be linked to a supplier first' }) as string);
      return;
    }
    const key = buildCartKey(row.id);
    if (cart.some(r => r.cart_key === key)) {
      setCart(prev => prev.map(r => r.cart_key === key ? { ...r, quantity: r.quantity + 1 } : r));
      return;
    }
    setCart(prev => [...prev, {
      cart_key: key,
      ingredient_id: row.id,
      ingredient_name: row.name,
      ingredient_unit: row.unit || '',
      selected_seller_id: preferred.id,
      quantity: Math.max(1, preferred.min_order_quantity || 1),
      available_sellers: row.sellers
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

  const ensureIngredientAndAddToCart = async (row: CatalogRow, selectedOptions: SelectedOption[], adjustedUnitPrice: number, qty?: number) => {
    if (!buyerApiBase) return;
    try {
      const token = getAuthToken();
      const res = await fetch(`${buyerApiBase}/ingredients/from-catalog`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ supplier_product_id: row.id })
      });
      const j = await res.json();
      if (!res.ok || !j.success) {
        setError(j?.message || 'Failed to add');
        return;
      }
      const ing = j.data.ingredient;
      const map = j.data.mapping;
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
        is_preferred: !!map.is_preferred
      };
      const optionIds = selectedOptions.map(o => o.option_id);
      const cart_key = buildCartKey(ing.id, optionIds);
      const baseQty = qty ?? Math.max(1, seller.min_order_quantity);

      const existing = cart.find(r => r.cart_key === cart_key);
      if (existing) {
        setCart(prev => prev.map(r => r.cart_key === cart_key ? { ...r, quantity: r.quantity + baseQty } : r));
      } else {
        setCart(prev => [...prev, {
          cart_key,
          ingredient_id: ing.id,
          ingredient_name: ing.name,
          ingredient_unit: ing.unit || '',
          selected_seller_id: seller.id,
          quantity: baseQty,
          available_sellers: [seller],
          selected_options: selectedOptions.length ? selectedOptions : undefined,
          adjusted_unit_price: selectedOptions.length ? adjustedUnitPrice : undefined
        }]);
      }
      if (j.data.created) {
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
          items: g.items.map(({ row, seller }) => ({
            ingredient_id: row.ingredient_id,
            ingredient_seller_product_id: seller.id,
            quantity_ordered: row.quantity
          })),
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
      </PageHeader>

      <Layout>
        <MainPane>
          <TabBar>
            <TabBtn $active={tab === 'mine'} onClick={() => { setTab('mine'); setCategoryFilter('all'); setSearch(''); }}>
              {t('newPo.tabMine', 'My Ingredients')}
            </TabBtn>
            <TabBtn $active={tab === 'catalog'} onClick={() => { setTab('catalog'); setCategoryFilter('all'); setSupplierFilter('all'); setSearch(''); }}>
              {t('newPo.tabCatalog', 'Supplier Catalog')}
            </TabBtn>
          </TabBar>

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
          </FilterRow>

          <CategoryRow>
            <CategoryChip $active={categoryFilter === 'all'} onClick={() => setCategoryFilter('all')}>
              {t('newPo.allCategories', 'All')}
            </CategoryChip>
            {tab === 'mine' && myCategories.map(c => (
              <CategoryChip
                key={c.id}
                $active={categoryFilter === String(c.id)}
                onClick={() => setCategoryFilter(String(c.id))}
              >
                {c.emoji ? `${c.emoji} ` : ''}{c.name}
              </CategoryChip>
            ))}
            {tab === 'catalog' && catalogCategories.map(c => (
              <CategoryChip
                key={c.id}
                $active={categoryFilter === String(c.id)}
                onClick={() => setCategoryFilter(String(c.id))}
              >
                {c.emoji ? `${c.emoji} ` : ''}{c.name}
              </CategoryChip>
            ))}
          </CategoryRow>

          <ScrollArea>
            {tab === 'mine' ? (
              loadingMine ? (
                <Empty>{t('common:loading', 'Loading…')}</Empty>
              ) : filteredMy.length === 0 ? (
                <Empty>
                  <strong>{t('newPo.empty.mine.title', 'No ingredients found')}</strong>
                  <div style={{ marginTop: 8, fontSize: 12 }}>
                    {t('newPo.empty.mine.desc', 'Click any product in the Supplier Catalog tab to add to your inventory.')}
                  </div>
                </Empty>
              ) : (
                <Grid>
                  {filteredMy.map(row => {
                    const inCart = isInCart(row.id);
                    const qInCart = cartQtyOf(row.id);
                    const hasSeller = row.sellers && row.sellers.length > 0;
                    const minPrice = hasSeller ? Math.min(...row.sellers.map(s => s.unit_price)) : 0;
                    const cat = row.ingredientCategory;
                    return (
                      <Card
                        key={row.id}
                        type="button"
                        onClick={() => addMineToCart(row)}
                        onDoubleClick={() => hasSeller && incCartQty(row.id, 1)}
                        $disabled={!hasSeller}
                      >
                        {inCart && <Badge $variant="cart">×{qInCart}</Badge>}
                        {!inCart && !hasSeller && <Badge $variant="warning">{t('newPo.unlinked', 'Unlinked')}</Badge>}
                        <CardName>{row.name}</CardName>
                        <CardMeta>
                          {cat ? `${cat.emoji ? cat.emoji + ' ' : ''}${cat.name}` : t('newPo.uncategorized', 'Uncategorized')}
                          {row.unit ? ` · ${row.unit}` : ''}
                        </CardMeta>
                        {hasSeller ? (
                          <>
                            <CardPrice>
                              {row.sellers.length === 1 ? minPrice.toFixed(2) : `from ${minPrice.toFixed(2)}`}
                            </CardPrice>
                            <CardMeta>
                              {row.sellers.length === 1 ? row.sellers[0].seller_name : `${row.sellers.length} ${t('newPo.vendors', 'vendors')}`}
                            </CardMeta>
                            {(row.sellers.find(s => s.is_preferred) || row.sellers[0])?.has_options && (
                              <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); openMineOptionModal(row); }}
                                style={{
                                  marginTop: 8,
                                  padding: '6px 12px',
                                  border: '1px solid #635BFF',
                                  borderRadius: 8,
                                  background: '#EEF2FF',
                                  color: '#635BFF',
                                  fontWeight: 700,
                                  fontSize: 12,
                                  cursor: 'pointer',
                                  alignSelf: 'flex-start',
                                  fontFamily: 'inherit',
                                }}
                              >
                                {t('newPo.optionsButton', 'Options')}
                              </button>
                            )}
                          </>
                        ) : (
                          <CardMeta style={{ color: '#92400E' }}>
                            {t('newPo.needLink', 'Link a supplier to order')}
                          </CardMeta>
                        )}
                      </Card>
                    );
                  })}
                </Grid>
              )
            ) : (
              loadingCatalog ? (
                <Empty>{t('common:loading', 'Loading…')}</Empty>
              ) : catalogList.length === 0 ? (
                <Empty>
                  <strong>{t('newPo.empty.catalog.title', 'No supplier products')}</strong>
                  <div style={{ marginTop: 8, fontSize: 12 }}>
                    {t('newPo.empty.catalog.desc', 'You need an active contract with a supplier.')}
                  </div>
                </Empty>
              ) : (
                <Grid>
                  {catalogList.map(p => {
                    const inCart = p.mapped_ingredient_id != null && cart.some(r => r.ingredient_id === p.mapped_ingredient_id);
                    const qInCart = p.mapped_ingredient_id ? cartQtyOf(p.mapped_ingredient_id) : 0;
                    return (
                      <Card
                        key={p.id}
                        type="button"
                        onClick={() => addCatalogToCart(p)}
                        onDoubleClick={() => !p.has_options && p.mapped_ingredient_id && incCartQty(p.mapped_ingredient_id, 1)}
                      >
                        {inCart && <Badge $variant="cart">×{qInCart}</Badge>}
                        {!inCart && p.already_mapped && <Badge $variant="success">{t('newPo.linked', 'Linked')}</Badge>}
                        {!inCart && !p.already_mapped && <Badge $variant="warning">{t('newPo.notLinked', 'Not linked')}</Badge>}
                        {p.image_url && (
                          <ProductImage>
                            <img src={p.image_url} alt={p.name} loading="lazy" />
                          </ProductImage>
                        )}
                        <CardName>{p.name}</CardName>
                        <CardMeta>
                          {p.category_name ? `${p.category_name} · ` : ''}{p.unit || ''}
                        </CardMeta>
                        <CardPrice>{p.unit_price.toFixed(2)}</CardPrice>
                        <CardMeta>{p.supplier?.name || ''}{p.sku ? ` · ${p.sku}` : ''}</CardMeta>
                        {p.has_options && (
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); openCatalogOptionModal(p); }}
                            style={{
                              marginTop: 8,
                              padding: '6px 12px',
                              border: '1px solid #635BFF',
                              borderRadius: 8,
                              background: '#EEF2FF',
                              color: '#635BFF',
                              fontWeight: 700,
                              fontSize: 12,
                              cursor: 'pointer',
                              alignSelf: 'flex-start',
                              fontFamily: 'inherit',
                            }}
                          >
                            {t('newPo.optionsButton', 'Options')}
                          </button>
                        )}
                      </Card>
                    );
                  })}
                </Grid>
              )
            )}
          </ScrollArea>
        </MainPane>

        <CartPane>
          <CartHeader>
            {t('newPo.cart.title', 'Cart')} {cart.length > 0 && `(${cart.length})`}
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
                    padding: '6px 8px', background: '#F8FAFC', borderRadius: 6,
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
                        <div style={{
                          fontSize: 13, fontWeight: 600, color: '#0A2540',
                          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                        }}>{row.ingredient_name}</div>
                      </div>
                      <QtyInput
                        type="number"
                        min={0}
                        step={0.01}
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
                    {row.selected_options && row.selected_options.length > 0 && (
                      <div style={{ fontSize: 11, color: '#635BFF', display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                        {row.selected_options.map(o => (
                          <span key={o.option_id} style={{ background: '#EEF2FF', padding: '1px 6px', borderRadius: 999 }}>
                            {o.option_name}
                          </span>
                        ))}
                      </div>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#9CA3AF' }}>
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
