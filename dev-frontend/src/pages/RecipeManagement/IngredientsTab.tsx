import { useTranslation } from 'react-i18next';
import { parseMinOrderQty } from '../../utils/unitConversion';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { EmptyState } from '../../components/UI/TableComponents';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import { SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import ListControlsBar from '../../components/Common/ListControlsBar';
import SortDropdown, { SortKey, sortItems } from '../../components/Common/SortDropdown';
import { useAuth } from '../../contexts/AuthContext';
import { DataTableStatus } from '../../components/UI/DataTable';
import { Modal, ModalButton, FormGroup as UIFormGroup, FormLabel, FormInput, FormSelect, FormRow as UIFormRow } from '../../components/UI/Modal';
import ConfirmModal from '../../components/ConfirmModal';
import SearchableSelect from '../../components/Common/SearchableSelect';
import ImageUploadDropzone from '../../components/Common/ImageUploadDropzone';
import ConnectSellerModal from '../../components/Common/ConnectSellerModal';
import RegisterExternalSupplierModal from '../../components/Common/RegisterExternalSupplierModal';
import RegisterAsProductModal from '../../components/Common/RegisterAsProductModal';
import AutoSaveField from '../../components/Common/AutoSaveField';
import Toggle from '../../components/Common/Toggle';
import { useBrandCurrency } from '../../hooks/useBrandCurrency';
import { formatCurrency } from '../../utils/currency';
import { costOrNotSet } from '../../utils/costDisplay';
import { getAuthToken } from '../../utils/auth';
interface IngredientsTabProps {
  brandId: number | null;
  restaurantId?: number | null;
  onCountChange: (count: number) => void;
  categoryRefreshKey?: number;
}

interface IngredientCategory {
  id: number;
  brand_id: number | null;
  restaurant_id: number | null;
  name: string;
  description: string | null;
  emoji: string | null;
  display_order: number;
  is_active: boolean;
}

interface Supplier {
  id: number;
  brand_id: number | null;
  restaurant_id: number | null;
  owner_type: 'brand' | 'restaurant';
  code: string | null;
  name: string;
  contact_name: string | null;
  phone: string | null;
  is_active: boolean;
}

interface Ingredient {
  id: number;
  brand_id: number | null;
  restaurant_id: number | null;
  owner_type: 'brand' | 'restaurant';
  ingredient_category_id: number | null;
  ingredientCategory?: IngredientCategory;
  brand_product_id: number | null;
  code: string | null;
  name: string;
  image_url: string | null;
  category: string;
  unit: string;
  base_quantity: number;
  unit_cost: number;
  restaurant_cost: number | null;
  cost_notes: string | null;
  effective_cost: number;
  supplier_name: string | null;
  supplier_id: number | null;
  supplier?: Supplier;
  is_active: boolean;
  min_stock?: number;
  current_stock?: number;
  sellers?: Array<{
    id: number;
    seller_type: 'supplier' | 'brand' | 'foodcourt';
    seller_entity_id: number | null;
    seller_name?: string;
    // 공급업체 자체 판매품목명·SKU (공급업체 타입만 값 있음; brand/foodcourt는 null)
    seller_product_name?: string | null;
    seller_product_sku?: string | null;
    unit_price?: number;
    is_preferred?: boolean;
  }>;
}

const IngredientsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 24px;
`;

const IngredientCard = styled.div<{ isActive?: boolean }>`
  background: white;
  border-radius: 12px;
  border: 1px solid #C7CED6;
  padding: 20px;
  transition: all 0.2s;
  opacity: ${props => props.isActive ? 1 : 0.6};
  cursor: pointer;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
    border-color: #635BFF;
  }
`;

const IngredientHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

const IngredientName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-word;
`;

const IngredientCategoryBadge = styled.div`
  display: inline-block;
  padding: 4px 8px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const BrandBadge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  background: #FEF3C7;
  color: #92400E;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  margin-left: 8px;
`;

const CostOverrideSection = styled.div`
  margin-top: 8px;
  padding: 10px 12px;
  background: #F0F7FF;
  border-radius: 8px;
  border: 1px solid #DBEAFE;
`;

const CostRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 0;
`;

const CostLabel = styled.span<{ type?: 'brand' | 'my' | 'applied' }>`
  font-size: 12px;
  color: ${props => props.type === 'brand' ? '#4B5563' : props.type === 'my' ? '#2563EB' : '#059669'};
  font-weight: ${props => props.type === 'applied' ? 600 : 400};
`;

const CostValue = styled.span<{ type?: 'brand' | 'my' | 'applied' }>`
  font-size: 13px;
  font-weight: ${props => props.type === 'applied' ? 700 : props.type === 'my' ? 600 : 400};
  color: ${props => props.type === 'brand' ? '#6B7280' : props.type === 'my' ? '#2563EB' : '#059669'};
  text-decoration: none;
`;

const SetCostButton = styled.button`
  padding: 4px 10px;
  background: #EFF6FF;
  border: 1px solid #BFDBFE;
  border-radius: 4px;
  color: #2563EB;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: #DBEAFE;
  }
`;

const CostEditInline = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const CostInput = styled.input`
  width: 100px;
  padding: 4px 8px;
  border: 1px solid #BFDBFE;
  border-radius: 4px;
  font-size: 13px;
  text-align: right;

  &:focus {
    outline: none;
    border-color: #2563EB;
  }
`;

const CostSaveButton = styled.button`
  padding: 4px 8px;
  background: #10B981;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 11px;
  cursor: pointer;

  &:hover {
    background: #059669;
  }
`;

const CostCancelButton = styled.button`
  padding: 4px 8px;
  background: #F1F4F8;
  color: #4B5563;
  border: none;
  border-radius: 4px;
  font-size: 11px;
  cursor: pointer;

  &:hover {
    background: #C7CED6;
  }
`;

const ResetButton = styled.button`
  padding: 2px 6px;
  background: none;
  border: none;
  color: #6B7280;
  font-size: 11px;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: #EF4444;
  }
`;

// 2026-09-01(Q5): 재고추적 토글 UI 제거 — 스위치 자체를 없앴다(항상 추적).

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 22px;
  cursor: pointer;
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  position: absolute;
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #C7CED6;
  transition: 0.3s;
  border-radius: 22px;
  pointer-events: none;

  &:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.3s;
    border-radius: 50%;
  }

  ${ToggleInput}:checked + & {
    background-color: #635BFF;
  }

  ${ToggleInput}:checked + &:before {
    transform: translateX(22px);
  }
`;

const IngredientInfo = styled.div`
  margin: 12px 0;
  flex: 1;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #F1F4F8;

  &:last-child {
    border-bottom: none;
  }
`;

const InfoLabel = styled.span`
  font-size: 12px;
  color: #4B5563;
`;

const InfoValue = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`;

const IngredientActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: auto;
  padding-top: 16px;
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  flex: 1;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;

  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          background: #635BFF;
          color: white;
          border: 1px solid #635BFF;
          &:hover {
            background: #4F46E5;
            transform: translateY(-1px);
          }
        `;
      case 'danger':
        return `
          background: #FEF2F2;
          border: 1px solid #EF4444;
          color: #EF4444;
          &:hover {
            background: #FEE2E2;
            transform: translateY(-1px);
          }
        `;
      default:
        return `
          background: #F4F6F9;
          border: 1px solid #C7CED6;
          color: #4B5563;
          &:hover {
            border-color: #635BFF;
            color: #635BFF;
            background: #F4F3FF;
            transform: translateY(-1px);
          }
        `;
    }
  }}

  &:active {
    transform: translateY(0);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
`;


const IngredientImageContainer = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 8px 8px 0 0;
  overflow: hidden;
  background: #F4F6F9;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IngredientImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImagePreview = styled.div`
  width: 100%;
  height: 150px;
  border: 2px dashed #C7CED6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;
  background: #F9FAFB;

  &:hover {
    border-color: #635BFF;
    background: #F4F3FF;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ImagePlaceholder = styled.div`
  text-align: center;
  color: #6B7280;
  font-size: 13px;
`;

const EmptyTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`;

const EmptyDescription = styled.p`
  font-size: 14px;
  color: #4B5563;
  margin-bottom: 24px;
`;


const IngredientsTab: React.FC<IngredientsTabProps> = ({ brandId, restaurantId: propsRestaurantId, onCountChange, categoryRefreshKey }) => {
  const { t } = useTranslation(['purchaseOrders', 'common']);
  const { user } = useAuth();
  const { defaultCurrency } = useBrandCurrency();
  const [infoModal, setInfoModal] = useState<{ open: boolean; title: string; message: string }>({ open: false, title: '', message: '' });
  const [selectedCurrency, setSelectedCurrency] = useState<string>('RM');
  // URL 파라미터의 restaurantId가 우선, 없으면 user.restaurant_id 사용
  const effectiveRestaurantId = propsRestaurantId || user?.restaurant_id || (user as any)?.restaurantId;

  useEffect(() => {
    if (defaultCurrency) {
      setSelectedCurrency(defaultCurrency);
    }
  }, [defaultCurrency]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [ingredientCategories, setIngredientCategories] = useState<IngredientCategory[]>([]);
  const [connectTarget, setConnectTarget] = useState<Ingredient | null>(null);
  // 경로② — 이 재고(stock item)를 외부공급업체 상품으로 등록 (솔루션 미가입 공급업체용).
  // 2026-09-02(P3-③) 외부공급업체 등록은 공유 부품(RegisterExternalSupplierModal)이 맡는다.
  //   폼·업체목록·저장은 부품 안에 있고 여기서는 **대상만** 들고 있는다(BG 화면과 같은 코드를 쓴다).
  const [extTarget, setExtTarget] = useState<Ingredient | null>(null);
  // Track Stock pending value (AutoSaveField onSave 가 onChange 직후 호출됨)
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('newest');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'compact' | 'image'>(() => {
    const saved = localStorage.getItem('ingredientsViewMode');
    return saved === 'image' ? 'image' : 'compact';
  });
  const [detailIngredient, setDetailIngredient] = useState<Ingredient | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [linkedItems, setLinkedItems] = useState<{recipes: any[]; products: any[]}>({ recipes: [], products: [] });
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);
  const [showModal, setShowModal] = useState(false);
  const EMPTY_FORM = {
    code: '',
    name: '',
    image_url: '',
    ingredient_category_id: '',
    unit: '',
    base_quantity: '1',
    unit_cost: '',
    supplier_id: '' as string | number,
    min_stock: '0',

  };
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [initialFormData, setInitialFormData] = useState(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; ingredientId: number | null; ingredientName: string }>({
    isOpen: false,
    ingredientId: null,
    ingredientName: ''
  });

  // My Cost inline editing state
  const [editingCostId, setEditingCostId] = useState<number | null>(null);
  const [editingCostValue, setEditingCostValue] = useState('');
  const [editingCostNotes, setEditingCostNotes] = useState('');
  const [savingCost, setSavingCost] = useState(false);

  const isRestaurantAdmin = user?.role === 'Restaurant Admin';
  const isBrandRole = user?.role === 'Brand General' || user?.role === 'Brand Manager';
  // Restaurant Admin은 자신의 재료만 수정/삭제 가능 (브랜드 재료는 읽기전용)
  const isItemReadOnly = (item: Ingredient) => isRestaurantAdmin && item.owner_type === 'brand';

  // Helper to get auth token
  const getToken = useCallback(() => getAuthToken(), []);

  // Parallel fetch all data for performance
  useEffect(() => {
    const fetchAllData = async () => {
      if (!brandId && !effectiveRestaurantId) return;

      setLoading(true);
      const token = getToken();
      const isBrandRole = user?.role === 'Brand General' || user?.role === 'Brand Manager';

      try {
        const promises: Promise<any>[] = [];

        // Build URLs based on role
        let ingredientsUrl = '', categoriesUrl = '', suppliersUrl = '';

        if (isBrandRole && brandId) {
          ingredientsUrl = `/api/brands/${brandId}/ingredients?include=sellers`;
          categoriesUrl = `/api/brands/${brandId}/ingredient-categories`;
          suppliersUrl = `/api/brands/${brandId}/suppliers`;
        } else if (isRestaurantAdmin && effectiveRestaurantId) {
          ingredientsUrl = `/api/restaurants/${effectiveRestaurantId}/ingredients?include=sellers`;
          categoriesUrl = `/api/restaurants/${effectiveRestaurantId}/ingredient-categories`;
          suppliersUrl = `/api/restaurants/${effectiveRestaurantId}/all-suppliers`;
        }

        // Fetch all in parallel
        if (ingredientsUrl) {
          promises.push(
            fetch(ingredientsUrl, { headers: { 'Authorization': `Bearer ${token}` } }).then(r => r.json()),
            fetch(categoriesUrl, { headers: { 'Authorization': `Bearer ${token}` } }).then(r => r.json()),
            fetch(suppliersUrl, { headers: { 'Authorization': `Bearer ${token}` } }).then(r => r.json())
          );
          // 레스토랑 관리자일 경우 브랜드 재료도 함께 조회
          if (isRestaurantAdmin && effectiveRestaurantId) {
            promises.push(
              fetch(`/api/restaurants/${effectiveRestaurantId}/brand-ingredients`, { headers: { 'Authorization': `Bearer ${token}` } }).then(r => r.json())
            );
          }
        }

        const results = await Promise.all(promises);

        // Process ingredients
        if (results[0]?.success) {
          let allIngredients = Array.isArray(results[0].data) ? results[0].data : [];

          // 레스토랑 관리자일 경우 브랜드 재료 추가
          if (isRestaurantAdmin && results[3]?.success && Array.isArray(results[3].data)) {
            allIngredients = [...results[3].data, ...allIngredients]; // 브랜드 재료를 먼저 표시
          }

          setIngredients(allIngredients);
        }

        // Process categories
        if (results[1]?.success) {
          if (Array.isArray(results[1].data)) {
            setIngredientCategories(results[1].data.filter((c: IngredientCategory) => c.is_active));
          } else {
            const allCategories = [
              ...(results[1].data.own_categories || []),
              ...(results[1].data.brand_categories || [])
            ].filter((c: IngredientCategory) => c.is_active);
            setIngredientCategories(allCategories);
          }
        }

        // Process suppliers
        if (results[2]?.success) {
          if (Array.isArray(results[2].data)) {
            setSuppliers(results[2].data.filter((s: Supplier) => s.is_active));
          } else {
            const allSuppliers = [
              ...(results[2].data.brand_suppliers || []),
              ...(results[2].data.own_suppliers || [])
            ].filter((s: Supplier) => s.is_active);
            setSuppliers(allSuppliers);
          }
        }

      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [brandId, effectiveRestaurantId, user?.role, getToken, isRestaurantAdmin]);

  // 카테고리가 변경되면 카테고리 목록을 새로 가져옴
  useEffect(() => {
    if (categoryRefreshKey && (brandId || effectiveRestaurantId)) {
      fetchIngredientCategories();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryRefreshKey]);

  const fetchIngredientCategories = async () => {
    try {
      let url = '';
      if (user?.role === 'Brand General' || user?.role === 'Brand Manager') {
        if (brandId) {
          url = `/api/brands/${brandId}/ingredient-categories`;
        }
      } else if (user?.role === 'Restaurant Admin') {
        if (effectiveRestaurantId) {
          url = `/api/restaurants/${effectiveRestaurantId}/ingredient-categories`;
        }
      }

      if (!url) return;

      const token = getToken();
      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();

      if (data.success) {
        if (Array.isArray(data.data)) {
          setIngredientCategories(data.data.filter((c: IngredientCategory) => c.is_active));
        } else {
          const allCategories = [
            ...(data.data.own_categories || []),
            ...(data.data.brand_categories || [])
          ].filter((c: IngredientCategory) => c.is_active);
          setIngredientCategories(allCategories);
        }
      }
    } catch (error) {
      console.error('Failed to fetch ingredient categories:', error);
    }
  };

  // My Cost 저장
  const handleSaveMyCost = async (ingredientId: number) => {
    if (!effectiveRestaurantId || !editingCostValue) return;
    setSavingCost(true);
    try {
      const token = getToken();
      const response = await fetch(`/api/restaurants/${effectiveRestaurantId}/ingredient-costs/${ingredientId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          unit_cost: parseFloat(editingCostValue),
          notes: editingCostNotes || null
        })
      });
      const data = await response.json();
      if (data.success) {
        // 로컬 state 업데이트
        setIngredients(prev => prev.map(ing =>
          ing.id === ingredientId
            ? { ...ing, restaurant_cost: parseFloat(editingCostValue), effective_cost: parseFloat(editingCostValue), cost_notes: editingCostNotes || null }
            : ing
        ));
        setEditingCostId(null);
      }
    } catch (error) {
      console.error('Failed to save my cost:', error);
    } finally {
      setSavingCost(false);
    }
  };

  // My Cost 삭제 (브랜드 코스트로 복귀)
  const handleResetMyCost = async (ingredient: Ingredient) => {
    if (!effectiveRestaurantId) return;
    try {
      const token = getToken();
      const response = await fetch(`/api/restaurants/${effectiveRestaurantId}/ingredient-costs/${ingredient.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setIngredients(prev => prev.map(ing =>
          ing.id === ingredient.id
            ? { ...ing, restaurant_cost: null, effective_cost: ing.unit_cost, cost_notes: null }
            : ing
        ));
      }
    } catch (error) {
      console.error('Failed to reset my cost:', error);
    }
  };

  // 새 목록을 받아 카드 갱신 + (편집 모달이 열려 있으면) selectedIngredient 의 sellers 도 동기화.
  const applyReloadedList = (newList: Ingredient[]) => {
    setIngredients(newList);
    setSelectedIngredient(prev => prev ? (newList.find(i => i.id === prev.id) || prev) : prev);
  };

  // 경로② 후 카드 즉시 갱신 (seller 배지 반영) — onConnected 와 동일 로직.
  const reloadWithSellers = () => {
    const token = getAuthToken();
    const url = isBrandRole && brandId
      ? `/api/brands/${brandId}/ingredients?include=sellers`
      : `/api/restaurants/${effectiveRestaurantId}/ingredients?include=sellers`;
    fetch(url, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(j => {
        const newList = Array.isArray(j?.data) ? j.data : [];
        if (isRestaurantAdmin && effectiveRestaurantId) {
          fetch(`/api/restaurants/${effectiveRestaurantId}/brand-ingredients`, { headers: { Authorization: `Bearer ${token}` } })
            .then(r => r.json())
            .then(bj => { const brandList = Array.isArray(bj?.data) ? bj.data : []; applyReloadedList([...brandList, ...newList]); })
            .catch(() => applyReloadedList(newList));
        } else applyReloadedList(newList);
      })
      .catch(() => {});
  };

  // 발주처 연결 해제 — 연결은 되는데 끊을 수가 없어 잘못 연결하면 되돌릴 방법이 없었다.
  // 매핑만 지운다(공급업체 상품 자체는 그대로). 재고/발주 이력에는 영향 없음.
  // BG 는 브랜드를 여러 개 소유할 수 있는데 buyer 스코프(requireBuyerRole)는 primary 브랜드에
  // 고정된다 → 지금 보고 있는 브랜드를 명시해야 그 브랜드로 귀속된다(서버가 소유 검사).
  // docs/BRAND_STOCK_SHARING_DESIGN.md §2
  const buyerScopeQS = (isBrandRole && brandId) ? `?entity_type=brand&entity_id=${brandId}` : '';

  const [unlinkTarget, setUnlinkTarget] = useState<{ id: number; label: string } | null>(null);

  const confirmUnlinkSeller = async () => {
    if (!unlinkTarget) return;
    const target = unlinkTarget;
    setUnlinkTarget(null);
    try {
      const res = await fetch(`/api/ingredient-seller-products/${target.id}${buyerScopeQS}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setInfoModal({ open: true, title: 'Could not disconnect', message: j.message || 'Failed to disconnect the seller source.' });
        return;
      }
      reloadWithSellers();
    } catch (err) {
      console.error('Error disconnecting seller source:', err);
      setInfoModal({ open: true, title: 'Could not disconnect', message: 'Failed to disconnect the seller source.' });
    }
  };

  // 이 재고를 외부공급업체 상품으로 등록 — 폼·업체목록·2단계 저장은 공유 부품이 맡는다(P3-③).
  //   같은 코드가 RA·BG 두 화면에 복사돼 있으면 곧 갈라진다. 여기서는 대상만 지정한다.
  const openExtRegister = (ing: Ingredient) => setExtTarget(ing);

  // 이 재고를 **그대로 파는 프로덕트로도** 등록 (P3-③ · 재료 ×1 레시피는 서버가 만든다).
  // 매장 소유 재료만 — 브랜드 표준 재료는 브랜드가 관리한다(매장에서는 읽기전용).
  const [sellAsProductTarget, setSellAsProductTarget] = useState<Ingredient | null>(null);

  const fetchIngredients = async () => {
    try {
      const token = getToken();

      // Brand General/Manager
      if (user?.role === 'Brand General' || user?.role === 'Brand Manager') {
        if (brandId) {
          const response = await fetch(`/api/brands/${brandId}/ingredients`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const data = await response.json();
          if (data.success) {
            setIngredients(data.data);
          }
        }
      }
      // Restaurant Admin - 자체 재료 + 브랜드 재료 함께 조회
      else if (user?.role === 'Restaurant Admin' && effectiveRestaurantId) {
        const [ownRes, brandRes] = await Promise.all([
          fetch(`/api/restaurants/${effectiveRestaurantId}/ingredients`, {
            headers: { 'Authorization': `Bearer ${token}` }
          }).then(r => r.json()),
          fetch(`/api/restaurants/${effectiveRestaurantId}/brand-ingredients`, {
            headers: { 'Authorization': `Bearer ${token}` }
          }).then(r => r.json())
        ]);

        let allIngredients: Ingredient[] = [];
        if (brandRes.success && Array.isArray(brandRes.data)) {
          allIngredients = [...brandRes.data];
        }
        if (ownRes.success && Array.isArray(ownRes.data)) {
          allIngredients = [...allIngredients, ...ownRes.data];
        }
        setIngredients(allIngredients);
      }
    } catch (error) {
      console.error('Failed to fetch ingredients:', error);
    }
  };

  const handleDeleteClick = (ingredient: Ingredient) => {
    setDeleteConfirm({
      isOpen: true,
      ingredientId: ingredient.id,
      ingredientName: ingredient.name
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm.ingredientId) return;

    try {
      let url = '';
      if (user?.role === 'Brand General' || user?.role === 'Brand Manager') {
        url = `/api/brands/${brandId}/ingredients/${deleteConfirm.ingredientId}`;
      } else if (user?.role === 'Restaurant Admin') {
        url = `/api/restaurants/${effectiveRestaurantId}/ingredients/${deleteConfirm.ingredientId}`;
      }

      const token = getToken();
      const response = await fetch(url, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();

      if (data.success) {
        setIngredients(prev => prev.filter(i => i.id !== deleteConfirm.ingredientId));
      } else {
        console.error('Delete failed:', data.error);
      }
    } catch (error) {
      console.error('Failed to delete ingredient:', error);
    } finally {
      setDeleteConfirm({ isOpen: false, ingredientId: null, ingredientName: '' });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm({ isOpen: false, ingredientId: null, ingredientName: '' });
  };

  const handleOpenModal = (ingredient: Ingredient | null) => {
    let next;
    if (ingredient) {
      setSelectedIngredient(ingredient);
      next = {
        code: ingredient.code || '',
        name: ingredient.name,
        image_url: ingredient.image_url || '',
        ingredient_category_id: ingredient.ingredient_category_id?.toString() || '',
        unit: ingredient.unit,
        base_quantity: ingredient.base_quantity?.toString() || '1',
        unit_cost: ingredient.unit_cost.toString(),
        supplier_id: ingredient.supplier_id || '',
        min_stock: ingredient.min_stock?.toString() || '0',
      };
    } else {
      setSelectedIngredient(null);
      next = EMPTY_FORM;
    }
    setFormData(next);
    setInitialFormData(next);
    setIsSubmitting(false);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedIngredient(null);
    setFormData(EMPTY_FORM);
    setInitialFormData(EMPTY_FORM);
    setIsSubmitting(false);
  };

  // dirty check — for edit mode disable Save when nothing changed
  const isDirty = React.useMemo(() => {
    return Object.keys(formData).some(k => (formData as any)[k] !== (initialFormData as any)[k]);
  }, [formData, initialFormData]);

  const isFormValid = !!(formData.name && formData.ingredient_category_id && formData.unit && formData.unit_cost);
  const canSubmit = isFormValid && !isSubmitting && (!selectedIngredient || isDirty);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image_url: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!formData.name || !formData.ingredient_category_id || !formData.unit || !formData.unit_cost) {
      setInfoModal({ open: true, title: 'Required Fields', message: 'Please fill in all required fields.' });
      return;
    }

    setIsSubmitting(true);
    try {
      let url = '';
      const method = selectedIngredient ? 'PUT' : 'POST';

      // Brand context: BG/Brand Manager use brand path
      if ((user?.role === 'Brand General' || user?.role === 'Brand Manager') && brandId) {
        url = selectedIngredient
          ? `/api/brands/${brandId}/ingredients/${selectedIngredient.id}`
          : `/api/brands/${brandId}/ingredients`;
      // Restaurant context: Restaurant Admin OR System Admin browsing /restaurant/:id/ingredients
      } else if (effectiveRestaurantId) {
        url = selectedIngredient
          ? `/api/restaurants/${effectiveRestaurantId}/ingredients/${selectedIngredient.id}`
          : `/api/restaurants/${effectiveRestaurantId}/ingredients`;
      } else {
        setInfoModal({ open: true, title: 'Save Context Missing', message: 'Cannot determine save context (missing restaurant or brand id). Please reload the page.' });
        return;
      }

      const token = getAuthToken();
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          code: formData.code,
          name: formData.name,
          image_url: formData.image_url || null,
          ingredient_category_id: formData.ingredient_category_id ? parseInt(formData.ingredient_category_id as string) : null,
          unit: formData.unit,
          // 레거시 supplier_id/supplier_name 미전송 (2026-07-04) — 공급처는 seller-source 매핑으로 관리. 백엔드도 쓰기 중단.
          base_quantity: parseFloat(formData.base_quantity) || 1,
          unit_cost: parseFloat(formData.unit_cost),
          min_stock: parseInt(formData.min_stock) || 0,
        })
      });

      // Read body as text first so we get useful error info even when server returns HTML / non-JSON
      const text = await response.text();
      let data: any = null;
      try { data = text ? JSON.parse(text) : null; } catch { /* non-JSON */ }

      if (response.ok && data?.success) {
        handleCloseModal();
        fetchIngredients();
      } else {
        const msg = data?.error || data?.message || `Save failed (HTTP ${response.status})`;
        console.error('Ingredient save failed:', response.status, text.slice(0, 300));
        setInfoModal({ open: true, title: 'Save Failed', message: msg });
        setIsSubmitting(false);
      }
    } catch (error: any) {
      console.error('Failed to save ingredient:', error);
      setInfoModal({ open: true, title: 'Network Error', message: 'Network error: ' + (error?.message || 'unable to reach server') });
      setIsSubmitting(false);
    }
  };

  // Track Stock 토글 핸들러 (브랜드 재료도 재고 연동은 가능)

  const filteredIngredients = sortItems(ingredients.filter(ingredient => {
    const matchesSearch = ingredient.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' ||
      ingredient.ingredient_category_id?.toString() === selectedCategory;
    return matchesSearch && matchesCategory;
  }), sortKey);

  // Get categories for filter dropdown
  const filterCategories = [
    { id: 'all', name: 'All Categories' },
    ...ingredientCategories.map(c => ({ id: c.id.toString(), name: c.name }))
  ];

  // Update count when ingredients change
  useEffect(() => {
    onCountChange(ingredients.length);
  }, [ingredients.length, onCountChange]);

  return (
    <>
      <ListControlsBar>
        <SearchInput
          type="text"
          placeholder="Search stock items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FilterSelect
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {filterCategories.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </FilterSelect>
        <SortDropdown value={sortKey} onChange={setSortKey} />
        <div data-controls-trailing>
          <div style={{ display: 'flex', background: '#F1F4F8', borderRadius: '6px', padding: '2px' }}>
            <button onClick={() => { setViewMode('compact'); localStorage.setItem('ingredientsViewMode', 'compact'); }} style={{ padding: '5px 14px', border: 'none', borderRadius: '5px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s', background: viewMode === 'compact' ? 'white' : 'transparent', color: viewMode === 'compact' ? '#0A2540' : '#4B5563', boxShadow: viewMode === 'compact' ? '0 1px 2px rgba(0,0,0,0.08)' : 'none' }}>
              Compact
            </button>
            <button onClick={() => { setViewMode('image'); localStorage.setItem('ingredientsViewMode', 'image'); }} style={{ padding: '5px 14px', border: 'none', borderRadius: '5px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s', background: viewMode === 'image' ? 'white' : 'transparent', color: viewMode === 'image' ? '#0A2540' : '#4B5563', boxShadow: viewMode === 'image' ? '0 1px 2px rgba(0,0,0,0.08)' : 'none' }}>
              Image
            </button>
          </div>
          <ThemedButton variant="primary" onClick={() => handleOpenModal(null)}>
            New Stock Item
          </ThemedButton>
        </div>
      </ListControlsBar>

      {loading && filteredIngredients.length === 0 ? (
        <EmptyState>
          <EmptyTitle>{'Loading...'}</EmptyTitle>
        </EmptyState>
      ) : filteredIngredients.length === 0 ? (
        <EmptyState>
          <EmptyTitle>{'No ingredients found'}</EmptyTitle>
          <EmptyDescription>
            {searchTerm || selectedCategory !== 'all'
              ? 'Try adjusting your filters'
              : 'Create your first ingredient to get started'}
          </EmptyDescription>
          {!searchTerm && selectedCategory === 'all' && (
            <ThemedButton
              variant="primary"
              onClick={() => handleOpenModal(null)}
            >
              Create First Ingredient
            </ThemedButton>
          )}
        </EmptyState>
      ) : (
        <IngredientsGrid>
          {filteredIngredients.map(ingredient => (
            <IngredientCard key={ingredient.id} isActive={ingredient.is_active} onClick={() => {
              setDetailIngredient(ingredient);
              setShowDetailModal(true);
              setLinkedItems({ recipes: [], products: [] });
              const token = getAuthToken();
              fetch(`/api/restaurants/${effectiveRestaurantId}/ingredients/${ingredient.id}/usage`, {
                headers: { 'Authorization': `Bearer ${token}` }
              }).then(r => r.json()).then(data => {
                if (data.success) setLinkedItems(data.data);
              }).catch(() => {});
            }}>
              {viewMode === 'image' && ingredient.image_url && (
                <IngredientImageContainer>
                  <IngredientImage src={ingredient.image_url} alt={ingredient.name} />
                </IngredientImageContainer>
              )}
              <IngredientHeader>
                <div>
                  <IngredientName>
                    {ingredient.name}
                  </IngredientName>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                    {isRestaurantAdmin && ingredient.owner_type === 'brand' && (
                      <BrandBadge>{'Brand'}</BrandBadge>
                    )}
                    <IngredientCategoryBadge>
                      {ingredient.ingredientCategory?.emoji} {ingredient.ingredientCategory?.name || 'Uncategorized'}
                    </IngredientCategoryBadge>
                  </div>
                </div>
              </IngredientHeader>

              <IngredientInfo>
                {/* 브랜드 재료 + Restaurant Admin: My Cost 오버라이드 UI */}
                {isRestaurantAdmin && ingredient.owner_type === 'brand' ? (
                  <>
                    <CostOverrideSection>
                      <CostRow>
                        <CostLabel type="brand">{'Brand Cost'}</CostLabel>
                        {/* 원가 0 = "정말 0원"이 아니라 **안 넣은 것**이다. 숫자로 찍으면 구분이 안 돼
                            그대로 발주·레시피 원가에 들어간다(운영 실측 2026-09-02: 원가 0 인 재료가 99건). */}
                        <CostValue type="brand">
                          {costOrNotSet(ingredient.unit_cost, selectedCurrency, t('ingredients.costNotSet', '원가 미설정') as string, ingredient.unit)}
                        </CostValue>
                      </CostRow>

                      {editingCostId === ingredient.id ? (
                        /* 인라인 편집 모드 */
                        <div style={{ marginTop: 6 }}>
                          <CostRow>
                            <CostLabel type="my">{'My Cost'}</CostLabel>
                            <CostEditInline>
                              <CostInput
                                type="number"
                                step="0.01"
                                min="0"
                                value={editingCostValue}
                                onChange={(e) => setEditingCostValue(e.target.value)}
                                autoFocus
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') handleSaveMyCost(ingredient.id);
                                  if (e.key === 'Escape') setEditingCostId(null);
                                }}
                              />
                              <CostSaveButton onClick={() => handleSaveMyCost(ingredient.id)} disabled={savingCost}>
                                {savingCost ? '...' : 'Save'}
                              </CostSaveButton>
                              <CostCancelButton onClick={() => setEditingCostId(null)}>
                                ✕
                              </CostCancelButton>
                            </CostEditInline>
                          </CostRow>
                        </div>
                      ) : ingredient.restaurant_cost !== null && ingredient.restaurant_cost !== undefined ? (
                        /* My Cost 설정됨 */
                        <CostRow style={{ marginTop: 4 }}>
                          <CostLabel type="my">
                            My Cost
                            <SetCostButton
                              style={{ marginLeft: 6, padding: '2px 6px', fontSize: '10px' }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingCostId(ingredient.id);
                                setEditingCostValue(String(ingredient.restaurant_cost));
                                setEditingCostNotes(ingredient.cost_notes || '');
                              }}
                            >
                              Edit
                            </SetCostButton>
                            <ResetButton onClick={(e) => { e.stopPropagation(); handleResetMyCost(ingredient); }}>
                              Reset
                            </ResetButton>
                          </CostLabel>
                          <CostValue type="my">{formatCurrency(Number(ingredient.restaurant_cost), selectedCurrency)}/{ingredient.unit}</CostValue>
                        </CostRow>
                      ) : (
                        /* My Cost 미설정 */
                        <CostRow style={{ marginTop: 4 }}>
                          <CostLabel type="my">{'My Cost'}</CostLabel>
                          <SetCostButton onClick={(e) => {
                            e.stopPropagation();
                            setEditingCostId(ingredient.id);
                            setEditingCostValue('');
                            setEditingCostNotes('');
                          }}>
                            Set Cost
                          </SetCostButton>
                        </CostRow>
                      )}

                      <CostRow style={{ marginTop: 6, borderTop: '1px solid #DBEAFE', paddingTop: 6 }}>
                        <CostLabel type="applied">{'Applied'}</CostLabel>
                        <CostValue type="applied">
                          {Number(ingredient.effective_cost ?? ingredient.unit_cost) > 0
                            ? `${formatCurrency(Number(ingredient.effective_cost ?? ingredient.unit_cost), selectedCurrency)}/${ingredient.unit} ${ingredient.restaurant_cost !== null && ingredient.restaurant_cost !== undefined ? '✓' : ''}`
                            : t('ingredients.costNotSet', '원가 미설정')}
                        </CostValue>
                      </CostRow>
                    </CostOverrideSection>
                    {ingredient.cost_notes && (
                      <InfoRow>
                        <InfoLabel style={{ fontSize: '11px', color: '#6B7280', fontStyle: 'italic' }}>{ingredient.cost_notes}</InfoLabel>
                      </InfoRow>
                    )}
                  </>
                ) : (
                  /* 브랜드 관리자 or 레스토랑 자체 재료: 기존 방식 */
                  <InfoRow>
                    <InfoLabel>{'Unit Cost'}</InfoLabel>
                    <InfoValue>
                      {/* 원가가 0이면 "안 넣은 것"인지 "정말 0원"인지 화면에서 구분이 안 됐다.
                          Irene 2026-08-28: "원가 0이고 판매가 0이면 알게 해줄 수 없어? 알기 쉽게 ui에서"
                          → 오류가 아니라 **미입력 상태**라 danger 빨강이 아닌 공용 warning 배지를 쓴다. */}
                      {Number(ingredient.unit_cost) > 0
                        ? formatCurrency(Number(ingredient.unit_cost), selectedCurrency)
                        : <DataTableStatus variant="warning">{t('ingredients.costNotSet', '원가 미설정')}</DataTableStatus>}
                    </InfoValue>
                  </InfoRow>
                )}
                <InfoRow>
                  <InfoLabel>{'Base Qty / Unit'}</InfoLabel>
                  <InfoValue>{Number(ingredient.base_quantity || 1)} {ingredient.unit}</InfoValue>
                </InfoRow>
                {(ingredient.supplier?.name || ingredient.supplier_name) && (
                  <InfoRow>
                    <InfoLabel>{'Supplier'}</InfoLabel>
                    <InfoValue>{ingredient.supplier?.name || ingredient.supplier_name}</InfoValue>
                  </InfoRow>
                )}
                {/* 발주처(seller) 연결 — 같은 재료를 여러 셀러에서 살 수 있음 (1상품 ↔ N셀러).
                    seller_product_id 가 셀러별 상품 변종을 가리킴. 매핑 0 → CTA, ≥1 → 리스트 + "Add seller". */}
                {(() => {
                  const sellers = Array.isArray(ingredient.sellers) ? ingredient.sellers : [];
                  const goConnect = (e: any) => {
                    e?.stopPropagation?.();
                    // Inline modal — 페이지 이동 없이 catalog 검색 + 선택 + 매핑.
                    setConnectTarget(ingredient);
                  };
                  return (
                    <InfoRow>
                      <InfoLabel>{'Sellers'}</InfoLabel>
                      <InfoValue style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-start' }}>
                        {sellers.length > 0 && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                            {sellers.map(s => (
                              <span key={s.id} style={{
                                display: 'inline-flex', alignItems: 'center', gap: 4,
                                padding: '2px 8px', borderRadius: 12, fontSize: 11, fontWeight: 600,
                                background: s.seller_type === 'brand' ? '#EDE9FE' : s.seller_type === 'foodcourt' ? '#FCE7F3' : '#DCFCE7',
                                color: s.seller_type === 'brand' ? '#6D28D9' : s.seller_type === 'foodcourt' ? '#9D174D' : '#166534'
                              }}>
                                {s.seller_type === 'brand' ? 'BRAND' : s.seller_type === 'foodcourt' ? 'FC' : 'SUP'}
                                {s.seller_name ? ` · ${s.seller_name}` : ''}
                                {s.seller_product_name ? ` · ${s.seller_product_name}` : ''}
                                {s.seller_product_sku ? ` · SKU: ${s.seller_product_sku}` : ''}
                                {/* 0 은 "공짜"가 아니라 **가격을 안 넣은 것**이다(운영 100건). 숫자로 찍으면 구분이 안 된다. */}
                                {s.unit_price != null
                                  ? (Number(s.unit_price) > 0 ? ` · RM${Number(s.unit_price).toFixed(2)}` : ` · ${t('ingredients.linkPriceNotSet', '가격 미입력')}`)
                                  : ''}
                              </span>
                            ))}
                          </div>
                        )}
                        {/* 브랜드 표준 재료는 공급처를 브랜드가 정한다 — 매장에는 연결/등록 버튼을 주지 않는다(읽기전용).
                            docs/BRAND_STOCK_SHARING_DESIGN.md */}
                        {isItemReadOnly(ingredient) ? (
                          sellers.length === 0 && (
                            <span style={{ fontSize: 12, color: '#92400E' }}>
                              {t('purchaseOrders:newPo.brandNeedsLink', 'Your brand has not linked a supplier to this item yet')}
                            </span>
                          )
                        ) : (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                          <button
                            type="button"
                            onClick={goConnect}
                            style={{
                              display: 'inline-flex', alignItems: 'center', gap: 6,
                              padding: '4px 10px', borderRadius: 6,
                              background: sellers.length === 0 ? '#FEF3C7' : '#EEF2FF',
                              border: `1px solid ${sellers.length === 0 ? '#FDE68A' : '#C7D2FE'}`,
                              color: sellers.length === 0 ? '#92400E' : '#3730A3',
                              fontSize: 12, fontWeight: 600, cursor: 'pointer'
                            }}
                          >
                            {sellers.length === 0 ? 'No seller — click to connect →' : 'Add another seller'}
                          </button>
                          {/* 솔루션 미가입 외부공급업체로 이 재고를 바로 등록(상품 생성 + 매핑) */}
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); openExtRegister(ingredient); }}
                            style={{
                              display: 'inline-flex', alignItems: 'center', gap: 6,
                              padding: '4px 10px', borderRadius: 6,
                              background: '#fff', border: '1px solid #C7CED6', color: '#4B5563',
                              fontSize: 12, fontWeight: 600, cursor: 'pointer'
                            }}
                          >
                            Register on external supplier
                          </button>
                          {/* 그대로 파는 물건이면 프로덕트로도 등록 — 재고는 이 아이템 한 곳에만 남는다 */}
                          {!isBrandRole && (
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); setSellAsProductTarget(ingredient); }}
                              style={{
                                display: 'inline-flex', alignItems: 'center', gap: 6,
                                padding: '4px 10px', borderRadius: 6,
                                background: '#fff', border: '1px solid #C7CED6', color: '#4B5563',
                                fontSize: 12, fontWeight: 600, cursor: 'pointer'
                              }}
                            >
                              Also sell as product
                            </button>
                          )}
                        </div>
                        )}
                      </InfoValue>
                    </InfoRow>
                  );
                })()}
                {ingredient.code && (
                  <InfoRow>
                    <InfoLabel>{'Code'}</InfoLabel>
                    <InfoValue>{ingredient.code}</InfoValue>
                  </InfoRow>
                )}
              </IngredientInfo>

              {!isItemReadOnly(ingredient) && (
                <IngredientActions>
                  <ActionButton
                    variant="secondary"
                    onClick={(e) => { e.stopPropagation(); handleOpenModal(ingredient); }}
                  >
                    Edit
                  </ActionButton>
                  <ActionButton
                    variant="danger"
                    onClick={(e) => { e.stopPropagation(); handleDeleteClick(ingredient); }}
                  >
                    Delete
                  </ActionButton>
                </IngredientActions>
              )}
            </IngredientCard>
          ))}
        </IngredientsGrid>
      )}

      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={selectedIngredient ? 'Edit Stock Item' : 'New Stock Item'}
        size="medium"
        footer={(
          <>
            <ModalButton type="button" variant="secondary" onClick={handleCloseModal} disabled={isSubmitting}>
              Cancel
            </ModalButton>
            <ModalButton
              type="submit"
              form="ingredient-form"
              variant="primary"
              disabled={!canSubmit}
            >
              {isSubmitting ? 'Saving...' : (selectedIngredient ? 'Update Stock Item' : 'Create Stock Item')}
            </ModalButton>
          </>
        )}
      >
        <form id="ingredient-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <ImageUploadDropzone
            value={formData.image_url || ''}
            onChange={(url) => setFormData({ ...formData, image_url: url })}
            label="Image"
            helpText="Drag & drop or click to upload (auto-compressed)"
          />

          <UIFormRow>
            <UIFormGroup>
              <FormLabel>Stock Item Name *</FormLabel>
              <FormInput
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Rice"
                required
              />
            </UIFormGroup>
            <UIFormGroup>
              <FormLabel>{'Code'}</FormLabel>
              <FormInput
                type="text"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="ING-001"
              />
            </UIFormGroup>
          </UIFormRow>

          <UIFormRow>
            <UIFormGroup>
              <FormLabel>Category *</FormLabel>
              <FormSelect
                value={formData.ingredient_category_id}
                onChange={(e) => setFormData({ ...formData, ingredient_category_id: e.target.value })}
                required
              >
                <option value="">{'Select category...'}</option>
                {ingredientCategories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.emoji} {cat.name}
                  </option>
                ))}
              </FormSelect>
            </UIFormGroup>
            <UIFormGroup>
              <FormLabel>{'Supplier source'}</FormLabel>
              {(selectedIngredient?.supplier?.name || selectedIngredient?.supplier_name) && (
                <div style={{ fontSize: 14, color: '#0A2540', padding: '2px 0' }}>
                  {selectedIngredient?.supplier?.name || selectedIngredient?.supplier_name}
                  <span style={{ fontSize: 12, color: '#9CA3AF', marginLeft: 6 }}>(legacy)</span>
                </div>
              )}
              <div style={{ fontSize: 12, color: '#6B7280', marginTop: 4 }}>
                Add the supplier's own product name, SKU and price as a supplier source on the item (from the item's supplier sources).
              </div>
            </UIFormGroup>
          </UIFormRow>

          <UIFormRow>
            <UIFormGroup>
              <FormLabel>Base Quantity *</FormLabel>
              <FormInput
                type="number"
                step="0.01"
                min="0.01"
                value={formData.base_quantity}
                onChange={(e) => setFormData({ ...formData, base_quantity: e.target.value })}
                placeholder="1"
                required
              />
            </UIFormGroup>
            <UIFormGroup>
              <FormLabel>Unit *</FormLabel>
              <FormSelect
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                required
              >
                <option value="">{'Select unit...'}</option>
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="L">L</option>
                <option value="ml">ml</option>
                <option value="piece">piece</option>
                <option value="pack">pack</option>
                <option value="can">can</option>
                <option value="bottle">bottle</option>
              </FormSelect>
            </UIFormGroup>
          </UIFormRow>

          <UIFormRow>
            <UIFormGroup>
              <FormLabel>Unit Cost ({selectedCurrency}) *</FormLabel>
              <FormInput
                type="number"
                step="0.01"
                value={formData.unit_cost}
                onChange={(e) => setFormData({ ...formData, unit_cost: e.target.value })}
                placeholder="0.00"
                required
              />
            </UIFormGroup>
            <UIFormGroup>
              <FormLabel>{'Minimum Stock'}</FormLabel>
              <FormInput
                type="number"
                value={formData.min_stock}
                onChange={(e) => setFormData({ ...formData, min_stock: e.target.value })}
                placeholder="0"
              />
            </UIFormGroup>
          </UIFormRow>

          {/* 켜고 끄기 토글은 **BG 가 실제로 여는 화면**(pages/Ingredients/IngredientsPage)에 있다.
              여기(RecipeManagement/IngredientsTab)에도 뒀다가 지웠다 — 이 컴포넌트를 렌더하는
              라우트에 BG 가 도달하지 못해 **보이지 않는 두 번째 사본**이 되기 때문이다.
              한 벌만 둔다(복제하면 곧 갈라진다). 2026-09-02 */
          }

          {/* Suppliers — 재고를 발주처(seller)/외부공급업체에 연결.
              연결은 ingredient_id 매핑이 필요 → 새로 만들 때(id 없음)는 저장 후로 안내.
              연결/외부등록 모달은 컴포넌트 하단에 단일 렌더(connectTarget/extTarget) — 여기선 핸들러만 호출(중복 정의 X). */}
          <div style={{ borderTop: '1px solid #F1F4F8', paddingTop: '16px' }}>
            <FormLabel>{'Suppliers'}</FormLabel>
            {selectedIngredient ? (
              <>
                {/* 현재 연결된 발주처(있으면) */}
                {Array.isArray(selectedIngredient.sellers) && selectedIngredient.sellers.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, margin: '6px 0 10px' }}>
                    {selectedIngredient.sellers.map(s => (
                      <span key={s.id} style={{
                        display: 'inline-flex', alignItems: 'center', gap: 4,
                        padding: '2px 8px', borderRadius: 12, fontSize: 11, fontWeight: 600,
                        background: s.seller_type === 'brand' ? '#EDE9FE' : s.seller_type === 'foodcourt' ? '#FCE7F3' : '#DCFCE7',
                        color: s.seller_type === 'brand' ? '#6D28D9' : s.seller_type === 'foodcourt' ? '#9D174D' : '#166534'
                      }}>
                        {s.seller_type === 'brand' ? 'BRAND' : s.seller_type === 'foodcourt' ? 'FC' : 'SUP'}
                        {s.seller_name ? ` · ${s.seller_name}` : ''}
                        {s.seller_product_name ? ` · ${s.seller_product_name}` : ''}
                        {s.seller_product_sku ? ` · SKU: ${s.seller_product_sku}` : ''}
                        {s.unit_price != null
                          ? (Number(s.unit_price) > 0 ? ` · ${formatCurrency(Number(s.unit_price), selectedCurrency)}` : ` · ${t('ingredients.linkPriceNotSet', '가격 미입력')}`)
                          : ''}
                        <button
                          type="button"
                          title="Disconnect this seller source"
                          aria-label="Disconnect this seller source"
                          onClick={() => setUnlinkTarget({
                            id: s.id,
                            label: [s.seller_name, s.seller_product_name].filter(Boolean).join(' · ') || 'this seller source',
                          })}
                          style={{
                            marginLeft: 2, padding: 0, width: 16, height: 16, lineHeight: '14px',
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            border: 'none', borderRadius: '50%', cursor: 'pointer',
                            background: 'rgba(0,0,0,0.08)', color: 'inherit', fontSize: 11, fontWeight: 700,
                          }}
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 6 }}>
                  <button
                    type="button"
                    onClick={() => { setConnectTarget(selectedIngredient); }}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: '6px 12px', borderRadius: 6,
                      background: '#EEF2FF', border: '1px solid #C7D2FE', color: '#3730A3',
                      fontSize: 13, fontWeight: 600, cursor: 'pointer'
                    }}
                  >
                    Connect supplier product
                  </button>
                  <button
                    type="button"
                    onClick={() => { openExtRegister(selectedIngredient); }}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: '6px 12px', borderRadius: 6,
                      background: '#fff', border: '1px solid #C7CED6', color: '#4B5563',
                      fontSize: 13, fontWeight: 600, cursor: 'pointer'
                    }}
                  >
                    Register on external supplier
                  </button>
                  {!isBrandRole && (
                    <button
                      type="button"
                      onClick={() => { setSellAsProductTarget(selectedIngredient); }}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        padding: '6px 12px', borderRadius: 6,
                        background: '#fff', border: '1px solid #C7CED6', color: '#4B5563',
                        fontSize: 13, fontWeight: 600, cursor: 'pointer'
                      }}
                    >
                      Also sell as product
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 6 }}>
                <button
                  type="button"
                  disabled
                  title="Save the stock item first, then connect suppliers"
                  style={{
                    padding: '6px 12px', borderRadius: 6,
                    background: '#F4F6F9', border: '1px solid #C7CED6', color: '#9CA3AF',
                    fontSize: 13, fontWeight: 600, cursor: 'not-allowed'
                  }}
                >
                  Connect supplier product
                </button>
                <button
                  type="button"
                  disabled
                  title="Save the stock item first, then connect suppliers"
                  style={{
                    padding: '6px 12px', borderRadius: 6,
                    background: '#F4F6F9', border: '1px solid #C7CED6', color: '#9CA3AF',
                    fontSize: 13, fontWeight: 600, cursor: 'not-allowed'
                  }}
                >
                  Register on external supplier
                </button>
                <div style={{ flexBasis: '100%', fontSize: 12, color: '#4B5563', marginTop: 2 }}>
                  Save the stock item first, then connect suppliers.
                </div>
              </div>
            )}
          </div>

        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        title="Delete Ingredient"
        message={`Are you sure you want to delete "${deleteConfirm.ingredientName}"? This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />

      {/* Detail Modal */}
      {showDetailModal && detailIngredient && (
        <Modal isOpen={showDetailModal} onClose={() => setShowDetailModal(false)} title={detailIngredient.name} size="medium">
          {/* Image - full width, same aspect ratio as list card (300:180) */}
          {detailIngredient.image_url && (
            <div style={{ width: '100%', aspectRatio: '300/180', borderRadius: '8px', overflow: 'hidden', marginBottom: '16px', background: '#F4F6F9' }}>
              <img src={detailIngredient.image_url} alt={detailIngredient.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}

          {/* Badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px', flexWrap: 'wrap' }}>
            {isRestaurantAdmin && detailIngredient.owner_type === 'brand' && (
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#92400E', background: '#FEF3C7', padding: '3px 8px', borderRadius: '4px' }}>{'Brand'}</span>
            )}
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#635BFF', background: '#F0F4FF', padding: '3px 8px', borderRadius: '4px' }}>
              {detailIngredient.ingredientCategory?.emoji} {detailIngredient.ingredientCategory?.name || 'Uncategorized'}
            </span>
            {detailIngredient.code && (
              <span style={{ fontSize: '11px', fontWeight: 500, color: '#4B5563', background: '#F1F4F8', padding: '3px 8px', borderRadius: '4px' }}>{detailIngredient.code}</span>
            )}
          </div>

          {/* Cost */}
          <div style={{ marginBottom: '16px' }}>
            {isRestaurantAdmin && detailIngredient.owner_type === 'brand' ? (
              detailIngredient.restaurant_cost != null ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ fontSize: '13px', color: '#6B7280' }}>Brand Cost: <span style={{ textDecoration: 'line-through' }}>
                    {Number(detailIngredient.unit_cost) > 0
                      ? `${formatCurrency(Number(detailIngredient.unit_cost), selectedCurrency)}/${detailIngredient.unit}`
                      : t('ingredients.costNotSet', '원가 미설정')}
                  </span></div>
                  <div style={{ fontSize: '16px', fontWeight: 600, color: '#2563EB' }}>
                    My Cost: {formatCurrency(Number(detailIngredient.restaurant_cost), selectedCurrency)}/{detailIngredient.unit}
                  </div>
                </div>
              ) : (
                <div style={{ fontSize: '16px', fontWeight: 600, color: '#0A2540' }}>
                  Unit Cost: {costOrNotSet(detailIngredient.unit_cost, selectedCurrency, t('ingredients.costNotSet', '원가 미설정') as string, detailIngredient.unit)}
                </div>
              )
            ) : (
              <div style={{ fontSize: '16px', fontWeight: 600, color: '#0A2540' }}>
                Unit Cost: {formatCurrency(Number(detailIngredient.unit_cost), selectedCurrency)} / {detailIngredient.unit}
              </div>
            )}
          </div>

          {/* Base Qty / Stock / Min Stock - 3 columns */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '16px' }}>
            <div style={{ padding: '10px', background: '#F9FAFB', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: '#4B5563', marginBottom: '3px' }}>{'Base Qty'}</div>
              <div style={{ fontSize: '14px', fontWeight: 600 }}>{Number(detailIngredient.base_quantity || 1)} {detailIngredient.unit}</div>
            </div>
            <div style={{ padding: '10px', background: '#F9FAFB', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: '#4B5563', marginBottom: '3px' }}>{'Current Stock'}</div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: Number(detailIngredient.current_stock || 0) <= Number(detailIngredient.min_stock || 0) ? '#EF4444' : '#0A2540' }}>
                {`${Number(detailIngredient.current_stock || 0).toFixed(1)} ${detailIngredient.unit}`}
              </div>
            </div>
            <div style={{ padding: '10px', background: '#F9FAFB', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: '#4B5563', marginBottom: '3px' }}>{'Min Stock'}</div>
              <div style={{ fontSize: '14px', fontWeight: 600 }}>{`${Number(detailIngredient.min_stock || 0)} ${detailIngredient.unit}`}</div>
            </div>
          </div>

          {/* Supplier */}
          {(detailIngredient.supplier?.name || detailIngredient.supplier_name) && (
            <div style={{ marginBottom: '16px', fontSize: '13px', color: '#4B5563' }}>
              Supplier: <span style={{ color: '#0A2540', fontWeight: 500 }}>{detailIngredient.supplier?.name || detailIngredient.supplier_name}</span>
            </div>
          )}

          {/* Connected recipes/menus */}
          <div style={{ padding: '12px', background: '#F0F4FF', borderRadius: '8px', border: '1px solid #DBEAFE', marginBottom: '16px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#1E40AF', marginBottom: '8px' }}>{'Used In'}</div>
            {linkedItems.recipes.length === 0 && linkedItems.products.length === 0 ? (
              <div style={{ fontSize: '13px', color: '#4B5563' }}>{'Not linked to any recipe or menu yet.'}</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {linkedItems.recipes.map((r: any) => (
                  <div key={'r' + r.id} style={{ fontSize: '13px', color: '#1E40AF' }}>
                    <span style={{ fontSize: '11px', background: '#EFF6FF', padding: '1px 6px', borderRadius: '3px', marginRight: '6px' }}>{'Recipe'}</span>
                    {r.name}
                  </div>
                ))}
                {linkedItems.products.map((p: any) => (
                  <div key={'p' + p.id} style={{ fontSize: '13px', color: '#059669' }}>
                    <span style={{ fontSize: '11px', background: '#ECFDF5', padding: '1px 6px', borderRadius: '3px', marginRight: '6px' }}>{'Menu'}</span>
                    {p.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {isItemReadOnly(detailIngredient) && (
            <div style={{ padding: '10px 12px', background: '#FEF3C7', borderRadius: '6px', fontSize: '12px', color: '#92400E', textAlign: 'center' }}>
              Managed by Brand. You can set My Cost from the ingredient list.
            </div>
          )}
        </Modal>
      )}

      <ConnectSellerModal
        open={!!connectTarget}
        ingredient={connectTarget ? { id: connectTarget.id, name: connectTarget.name, unit: connectTarget.unit } : null}
        buyerApiBase={
          isBrandRole && brandId
            ? `/api/brands/${brandId}`
            : (isRestaurantAdmin && effectiveRestaurantId ? `/api/restaurants/${effectiveRestaurantId}` : '/api/restaurants/0')
        }
        buyerScopeQS={buyerScopeQS}
        onClose={() => setConnectTarget(null)}
        onConnected={() => {
          // Inline reload — 카드 즉시 갱신. categoryRefreshKey 트릭으로 useEffect 재실행 유도.
          const token = getAuthToken();
          const url = isBrandRole && brandId
            ? `/api/brands/${brandId}/ingredients?include=sellers`
            : `/api/restaurants/${effectiveRestaurantId}/ingredients?include=sellers`;
          fetch(url, { headers: { Authorization: `Bearer ${token}` } })
            .then(r => r.json())
            .then(j => {
              const newList = Array.isArray(j?.data) ? j.data : [];
              if (isRestaurantAdmin && effectiveRestaurantId) {
                // 브랜드 재료 합치기 (기존 fetch와 동일 로직)
                fetch(`/api/restaurants/${effectiveRestaurantId}/brand-ingredients`, { headers: { Authorization: `Bearer ${token}` } })
                  .then(r => r.json())
                  .then(bj => {
                    const brandList = Array.isArray(bj?.data) ? bj.data : [];
                    applyReloadedList([...brandList, ...newList]);
                  })
                  .catch(() => applyReloadedList(newList));
              } else {
                applyReloadedList(newList);
              }
            })
            .catch(() => {});
        }}
      />
      {/* 경로② — 이 재고를 외부공급업체 상품으로 등록 (공유 부품 · BG 재고 화면과 같은 코드) */}
      <RegisterExternalSupplierModal
        target={extTarget ? { id: extTarget.id, name: extTarget.name, unit: extTarget.unit } : null}
        targetKind="ingredient"
        buyerApiBase={isBrandRole && brandId ? `/api/brands/${brandId}` : `/api/restaurants/${effectiveRestaurantId}`}
        buyerScopeQS={buyerScopeQS}
        onClose={() => setExtTarget(null)}
        onRegistered={() => { reloadWithSellers(); }}
      />
      {/* 경로③ — 이 재고를 그대로 파는 프로덕트로도 등록 (판매가 필수 · 서버가 재료 ×1 레시피 생성) */}
      <RegisterAsProductModal
        target={sellAsProductTarget ? { id: sellAsProductTarget.id, name: sellAsProductTarget.name, unit: sellAsProductTarget.unit } : null}
        endpoint={sellAsProductTarget ? `/api/restaurants/${effectiveRestaurantId}/ingredients/${sellAsProductTarget.id}/register-as-product` : ''}
        onClose={() => setSellAsProductTarget(null)}
        onRegistered={() => { reloadWithSellers(); }}
      />

      <ConfirmModal
        isOpen={unlinkTarget !== null}
        title="Disconnect seller source"
        message={unlinkTarget
          ? `${unlinkTarget.label} will no longer be linked to this stock item. The supplier product itself is not deleted — you can connect it again anytime.`
          : ''}
        onConfirm={confirmUnlinkSeller}
        onCancel={() => setUnlinkTarget(null)}
        confirmText="Disconnect"
        cancelText="Keep"
        type="warning"
      />
      <ConfirmModal
        isOpen={infoModal.open}
        title={infoModal.title}
        message={infoModal.message}
        onConfirm={() => setInfoModal({ open: false, title: '', message: '' })}
        onCancel={() => setInfoModal({ open: false, title: '', message: '' })}
        confirmText="OK"
        type="info"
        singleButton
      />
    </>
  );
};

export default IngredientsTab;
