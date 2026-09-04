import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { EmptyState, IconButton } from '../../components/UI/TableComponents';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import { SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import ListControlsBar from '../../components/Common/ListControlsBar';
import SortDropdown, { SortKey, sortItems } from '../../components/Common/SortDropdown';
import { Modal, ModalButton, FormGroup as UIFormGroup, FormLabel, FormInput, FormSelect, FormRow as UIFormRow } from '../../components/UI/Modal';
import ConfirmModal from '../../components/ConfirmModal';
import SearchableSelect from '../../components/Common/SearchableSelect';
import RegisterExternalSupplierModal from '../../components/Common/RegisterExternalSupplierModal';
import RegisterAsProductModal from '../../components/Common/RegisterAsProductModal';
import { fetchAPI } from '../../utils/api';
import ImageUploadDropzone from '../../components/Common/ImageUploadDropzone';
import { useBrandCurrency } from '../../hooks/useBrandCurrency';
import { formatCurrency } from '../../utils/currency';

import { getAuthToken } from '../../utils/auth';
interface ProductIngredientsTabProps {
  brandId?: number | null;
  onCountChange?: (count: number) => void;
  categoryRefreshKey?: number;
}

interface Category {
  id: number;
  name: string;
  emoji: string | null;
}

interface Ingredient {
  id: number;
  code: string;
  name: string;
  category_id: number | null;
  category?: Category;
  image_url: string | null;
  unit: string;
  base_quantity: number;
  unit_cost: number;
  supplier_name: string | null;
  supplier_id: number | null;
  min_stock: number;
  min_order: number;
  current_stock: number;
  is_active: boolean;
  sellers?: Array<{
    id: number;
    seller_product_id?: number;
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

// 재고아이템 ↔ 공급업체 상품 매핑 (발주 연결). 이 매핑이 있어야 발주(PO)에서 주문 가능.
interface SellerSource {
  id: number;
  seller_type: 'supplier' | 'system_admin' | 'brand' | 'foodcourt';
  seller_entity_id: number | null;
  seller_product_id: number;
  // 공급업체 자체 판매품목명·SKU (공급업체 타입만 값 있음; brand/system_admin는 null → 폴백)
  seller_product_name?: string | null;
  seller_product_sku?: string | null;
  unit_price: number;
  unit_conversion: number;
  min_order_quantity: number;
  lead_time_days: number;
  is_preferred: boolean;
}

// /api/supplier-catalog 응답 row (NewPurchaseOrderPage fetchCatalog 와 동일 shape)
interface CatalogRow {
  id: number;
  name: string;
  sku?: string | null;
  unit?: string | null;
  unit_price: number;
  category_name?: string | null;
  supplier?: { id: number; name: string; seller_type?: 'supplier' | 'brand' | 'foodcourt' } | null;
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

// 2026-09-01(Q5): 재고추적 토글 UI 제거 — 스위치 자체를 없앴다(항상 추적).

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

const StockBadge = styled.span<{ status: 'normal' | 'low' | 'out' }>`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  background: ${props => {
    if (props.status === 'out') return '#FEE2E2';
    if (props.status === 'low') return '#FEF3C7';
    return '#ECFDF5';
  }};
  color: ${props => {
    if (props.status === 'out') return '#DC2626';
    if (props.status === 'low') return '#D97706';
    return '#059669';
  }};
`;

const ProductIngredientsTab: React.FC<ProductIngredientsTabProps> = ({ brandId, onCountChange, categoryRefreshKey }) => {
  const { defaultCurrency } = useBrandCurrency();
  const [infoModal, setInfoModal] = useState<{ open: boolean; title: string; message: string }>({ open: false, title: '', message: '' });
  const [selectedCurrency, setSelectedCurrency] = useState<string>('RM');
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('newest');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingIngredient, setEditingIngredient] = useState<Ingredient | null>(null);
  const [saving, setSaving] = useState(false);
  const [viewMode, setViewMode] = useState<'compact' | 'image'>(() => {
    const saved = localStorage.getItem('brandIngredientsViewMode');
    return saved === 'image' ? 'image' : 'compact';
  });
  const [detailIngredient, setDetailIngredient] = useState<Ingredient | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [linkedItems, setLinkedItems] = useState<{recipes: any[]; products: any[]}>({ recipes: [], products: [] });
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; ingredientId: number | null; ingredientName: string }>({
    isOpen: false,
    ingredientId: null,
    ingredientName: ''
  });
  const [formData, setFormData] = useState({
    name: '',
    category_id: '',
    image_url: '',
    unit: '',
    base_quantity: '1',
    unit_cost: '0',
    supplier_name: '',
    supplier_id: '' as string | number,
    min_stock: '0',
    min_order: '0',
    current_stock: '0'
  });

  // 2026-09-02(P3-③) 두 입구를 RA 재료 화면과 **같은 공유 부품**으로 연다.
  //   그전까지 BG 재고 화면에는 외부공급업체 등록 입구가 아예 없었다(RA 에만 있었다).
  const [extTarget, setExtTarget] = useState<Ingredient | null>(null);
  const [sellAsProductTarget, setSellAsProductTarget] = useState<Ingredient | null>(null);
  const [togglingId, setTogglingId] = useState<number | null>(null);

  // ── Supplier Products (seller-sources) — 발주 연결용 매핑 (editing existing item only) ──
  const [sellerSources, setSellerSources] = useState<SellerSource[]>([]);
  const [catalog, setCatalog] = useState<CatalogRow[]>([]);
  const [sourceForm, setSourceForm] = useState<{ seller_product_id: number | null; unit_price: string; unit_conversion: string; is_preferred: boolean }>({
    seller_product_id: null,
    unit_price: '',
    unit_conversion: '1',
    is_preferred: false
  });
  const [savingSource, setSavingSource] = useState(false);

  useEffect(() => {
    if (defaultCurrency) {
      setSelectedCurrency(defaultCurrency);
    }
  }, [defaultCurrency]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [ingredientsRes, categoriesRes] = await Promise.all([
        fetchAPI('/api/product-ingredients?include=sellers'),
        fetchAPI('/api/product-ingredient-categories')
      ]);

      if (ingredientsRes.success) {
        setIngredients(ingredientsRes.data || []);
        onCountChange?.(ingredientsRes.data?.length || 0);
      }
      if (categoriesRes.success) {
        setCategories(categoriesRes.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  }, [onCountChange]);

  useEffect(() => {
    fetchData();
  }, [fetchData, categoryRefreshKey]);

  const handleOpenModal = (ingredient?: Ingredient) => {
    setSellerSources([]);
    setSourceForm({ seller_product_id: null, unit_price: '', unit_conversion: '1', is_preferred: false });
    if (ingredient) {
      setEditingIngredient(ingredient);
      // 기존 아이템 — 발주 연결 매핑 + 카탈로그 로드
      loadSellerSources(ingredient.id);
      loadCatalog();
      setFormData({
        name: ingredient.name,
        category_id: ingredient.category_id?.toString() || '',
        image_url: ingredient.image_url || '',
        unit: ingredient.unit,
        base_quantity: ingredient.base_quantity.toString(),
        unit_cost: ingredient.unit_cost.toString(),
        supplier_name: ingredient.supplier_name || '',
        supplier_id: ingredient.supplier_id || '',
        min_stock: ingredient.min_stock.toString(),
        min_order: ingredient.min_order.toString(),
        current_stock: ingredient.current_stock.toString()
      });
    } else {
      setEditingIngredient(null);
      setFormData({
        name: '',
        category_id: '',
        image_url: '',
        unit: '',
        base_quantity: '1',
        unit_cost: '0',
        supplier_name: '',
        supplier_id: '',
        min_stock: '0',
        min_order: '0',
        current_stock: '0'
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingIngredient(null);
    setSellerSources([]);
    setSourceForm({ seller_product_id: null, unit_price: '', unit_conversion: '1', is_preferred: false });
    setFormData({
      name: '',
      category_id: '',
      image_url: '',
      unit: '',
      base_quantity: '1',
      unit_cost: '0',
      supplier_name: '',
      supplier_id: '',
      min_stock: '0',
      min_order: '0',
      current_stock: '0'
    });
  };

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

  // ── Supplier Products (seller-sources) ──
  const loadSellerSources = useCallback(async (ingredientId: number) => {
    try {
      const res = await fetchAPI(`/api/product-ingredients/${ingredientId}/seller-sources`);
      setSellerSources(res?.success && Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error('Failed to load seller sources:', error);
      setSellerSources([]);
    }
  }, []);

  // 발주 카탈로그 (구매 가능한 공급업체 상품) — NewPurchaseOrderPage fetchCatalog 와 동일 소스
  const loadCatalog = useCallback(async () => {
    try {
      const res = await fetchAPI('/api/supplier-catalog');
      setCatalog(res?.success && Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error('Failed to load supplier catalog:', error);
      setCatalog([]);
    }
  }, []);

  // 매핑 추가 (POST). 성공 시 목록만 재조회 (success toast 없음).
  const handleAddSellerSource = async () => {
    if (!editingIngredient || !sourceForm.seller_product_id) return;
    const picked = catalog.find(c => c.id === sourceForm.seller_product_id);
    if (!picked) return;
    const price = parseFloat(sourceForm.unit_price);
    if (!(price >= 0)) {
      setInfoModal({ open: true, title: 'Unit Price Required', message: 'Enter a valid unit price (≥ 0).' });
      return;
    }
    try {
      setSavingSource(true);
      const res = await fetchAPI(`/api/product-ingredients/${editingIngredient.id}/seller-sources`, {
        method: 'POST',
        body: JSON.stringify({
          seller_type: picked.supplier?.seller_type || 'supplier',
          seller_entity_id: picked.supplier?.id ?? null,
          seller_product_id: picked.id,
          unit_price: price,
          unit_conversion: parseFloat(sourceForm.unit_conversion) || 1,
          is_preferred: sourceForm.is_preferred
        })
      });
      if (res?.success) {
        setSourceForm({ seller_product_id: null, unit_price: '', unit_conversion: '1', is_preferred: false });
        await loadSellerSources(editingIngredient.id);
      } else {
        setInfoModal({ open: true, title: 'Add Failed', message: res?.message || 'Failed to add supplier product.' });
      }
    } catch (error) {
      console.error('Failed to add seller source:', error);
      setInfoModal({ open: true, title: 'Add Failed', message: 'Failed to add supplier product. Please try again.' });
    } finally {
      setSavingSource(false);
    }
  };

  // 매핑 삭제 (DELETE). 성공 시 목록만 재조회.
  const handleDeleteSellerSource = async (mappingId: number) => {
    if (!editingIngredient) return;
    try {
      const res = await fetchAPI(`/api/product-ingredients/${editingIngredient.id}/seller-sources/${mappingId}`, {
        method: 'DELETE'
      });
      if (res?.success) {
        await loadSellerSources(editingIngredient.id);
      } else {
        setInfoModal({ open: true, title: 'Remove Failed', message: res?.message || 'Failed to remove supplier product.' });
      }
    } catch (error) {
      console.error('Failed to delete seller source:', error);
      setInfoModal({ open: true, title: 'Remove Failed', message: 'Failed to remove supplier product. Please try again.' });
    }
  };

  const handleSave = async () => {
    if (!formData.name.trim() || !formData.unit.trim()) {
      setInfoModal({ open: true, title: 'Required Fields', message: 'Name and Unit are required.' });
      return;
    }

    try {
      setSaving(true);
      const url = editingIngredient
        ? `/api/product-ingredients/${editingIngredient.id}`
        : '/api/product-ingredients';
      const method = editingIngredient ? 'PUT' : 'POST';

      const response = await fetchAPI(url, {
        method,
        body: JSON.stringify({
          name: formData.name,
          category_id: formData.category_id ? parseInt(formData.category_id) : null,
          image_url: formData.image_url || null,
          unit: formData.unit,
          base_quantity: parseFloat(formData.base_quantity) || 1,
          unit_cost: parseFloat(formData.unit_cost) || 0,
          min_stock: parseFloat(formData.min_stock) || 0,
          min_order: parseFloat(formData.min_order) || 0,
          current_stock: parseFloat(formData.current_stock) || 0
        })
      });

      if (response.success) {
        handleCloseModal();
        fetchData();
      } else {
        setInfoModal({ open: true, title: 'Save Failed', message: response.error || 'Failed to save ingredient. Please try again.' });
      }
    } catch (error) {
      console.error('Failed to save ingredient:', error);
      setInfoModal({ open: true, title: 'Save Failed', message: 'Failed to save ingredient. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  // 활성/비활성 토글. 서버가 거울(브랜드 재료)까지 같이 따라오게 한다(F2 동기화).
  const handleToggleActive = async (ingredient: Ingredient) => {
    setTogglingId(ingredient.id);
    try {
      const res = await fetchAPI(`/api/product-ingredients/${ingredient.id}`, {
        method: 'PUT',
        body: JSON.stringify({ is_active: ingredient.is_active === false })
      });
      if (res?.success) await fetchData();
    } finally {
      setTogglingId(null);
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
      const response = await fetchAPI(`/api/product-ingredients/${deleteConfirm.ingredientId}`, {
        method: 'DELETE'
      });

      if (response.success) {
        fetchData();
      } else {
        setInfoModal({ open: true, title: 'Delete Failed', message: response.error || 'Failed to delete ingredient. Please try again.' });
      }
    } catch (error) {
      console.error('Failed to delete ingredient:', error);
      setInfoModal({ open: true, title: 'Delete Failed', message: 'Failed to delete ingredient. Please try again.' });
    } finally {
      setDeleteConfirm({ isOpen: false, ingredientId: null, ingredientName: '' });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm({ isOpen: false, ingredientId: null, ingredientName: '' });
  };

  const getStockStatus = (ingredient: Ingredient): 'normal' | 'low' | 'out' => {
    // 2026-09-01(Q5): 재고추적 스위치 제거 — 항상 재고 기준으로 본다
    if (ingredient.current_stock <= 0) return 'out';
    if (ingredient.current_stock <= ingredient.min_stock) return 'low';
    return 'normal';
  };

  const filteredIngredients = sortItems(ingredients.filter(item => {
    // ⚠ `code`·`name` 이 비어 있을 수 있다 — 그때 `.toLowerCase()` 가 화면을 통째로 죽인다.
    //   2026-09-04 실제로 그랬다: 이관이 만든 재고아이템 35건에 code 가 없어 **검색창에 입력하는 순간**
    //   "Something went wrong" 이 떴다. 데이터는 채웠지만, 값이 비었다고 화면이 죽어서는 안 된다.
    const q = searchTerm.toLowerCase();
    const matchesSearch = String(item.name || '').toLowerCase().includes(q) ||
                         String(item.code || '').toLowerCase().includes(q);
    const matchesCategory = categoryFilter === 'all' ||
                           (item.category_id?.toString() === categoryFilter);
    return matchesSearch && matchesCategory;
  }), sortKey);

  const filterCategories = [
    { id: 'all', name: 'All Categories' },
    ...categories.map(c => ({ id: c.id.toString(), name: c.name }))
  ];

  if (loading) {
    return (
      <EmptyState>
        <EmptyTitle>{'Loading...'}</EmptyTitle>
      </EmptyState>
    );
  }

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
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
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
            <button onClick={() => { setViewMode('compact'); localStorage.setItem('brandIngredientsViewMode', 'compact'); }} style={{ padding: '5px 14px', border: 'none', borderRadius: '5px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s', background: viewMode === 'compact' ? 'white' : 'transparent', color: viewMode === 'compact' ? '#0A2540' : '#4B5563', boxShadow: viewMode === 'compact' ? '0 1px 2px rgba(0,0,0,0.08)' : 'none' }}>
              Compact
            </button>
            <button onClick={() => { setViewMode('image'); localStorage.setItem('brandIngredientsViewMode', 'image'); }} style={{ padding: '5px 14px', border: 'none', borderRadius: '5px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s', background: viewMode === 'image' ? 'white' : 'transparent', color: viewMode === 'image' ? '#0A2540' : '#4B5563', boxShadow: viewMode === 'image' ? '0 1px 2px rgba(0,0,0,0.08)' : 'none' }}>
              Image
            </button>
          </div>
          <ThemedButton variant="primary" onClick={() => handleOpenModal()}>
            New Stock Item
          </ThemedButton>
        </div>
      </ListControlsBar>

      {filteredIngredients.length === 0 ? (
        <EmptyState>
          <EmptyTitle>{'No ingredients found'}</EmptyTitle>
          <EmptyDescription>
            {searchTerm || categoryFilter !== 'all'
              ? 'Try adjusting your filters'
              : 'Add ingredients to use in your product recipes'}
          </EmptyDescription>
          {!searchTerm && categoryFilter === 'all' && (
            <ThemedButton
              variant="primary"
              onClick={() => handleOpenModal()}
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
              fetch(`/api/product-ingredients/${ingredient.id}/usage`, {
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
                  <IngredientCategoryBadge>
                    {ingredient.category?.emoji} {ingredient.category?.name || 'Uncategorized'}
                  </IngredientCategoryBadge>
                </div>
              </IngredientHeader>

              <IngredientInfo>
                <InfoRow>
                  <InfoLabel>{'Unit Cost'}</InfoLabel>
                  <InfoValue>{formatCurrency(Number(ingredient.unit_cost), selectedCurrency)}</InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>{'Base Qty / Unit'}</InfoLabel>
                  <InfoValue>{Number(ingredient.base_quantity || 1)} {ingredient.unit}</InfoValue>
                </InfoRow>
                {/* 발주처(seller) 연결 — 재고 품목 ↔ 공급업체 상품 매핑(읽기전용). seller-source 섹션에서 관리. */}
                {(() => {
                  const sellers = Array.isArray(ingredient.sellers) ? ingredient.sellers : [];
                  if (sellers.length === 0) return null;
                  return (
                    <InfoRow>
                      <InfoLabel>{'Sellers'}</InfoLabel>
                      <InfoValue style={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'flex-end' }}>
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
                            {s.unit_price != null ? ` · ${formatCurrency(Number(s.unit_price), selectedCurrency)}` : ''}
                          </span>
                        ))}
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
                <InfoRow>
                  <InfoLabel>{'Stock'}</InfoLabel>
                  <StockBadge status={getStockStatus(ingredient)}>
                    {ingredient.current_stock} {ingredient.unit}
                  </StockBadge>
                </InfoRow>
              </IngredientInfo>


              <IngredientActions>
                <ActionButton
                  variant="secondary"
                  onClick={(e: React.MouseEvent) => { e.stopPropagation(); handleOpenModal(ingredient); }}
                >
                  Edit
                </ActionButton>
                {/* 솔루션 미가입 외부공급업체 상품으로 등록 — RA 재료 화면과 같은 부품 */}
                <ActionButton
                  variant="secondary"
                  onClick={(e: React.MouseEvent) => { e.stopPropagation(); setExtTarget(ingredient); }}
                >
                  External supplier
                </ActionButton>
                {/* 그대로 파는 물건이면 브랜드 프로덕트로도 등록 — 재고는 이 아이템 한 곳에만 남는다 */}
                <ActionButton
                  variant="secondary"
                  onClick={(e: React.MouseEvent) => { e.stopPropagation(); setSellAsProductTarget(ingredient); }}
                >
                  Also sell as product
                </ActionButton>
                {/* 활성/비활성 — 2026-09-04 신설. 그전에는 화면에 이 버튼이 없어
                    **꺼진 재고아이템을 되살릴 방법이 아예 없었다**(Irene: "활성/비활성 버튼도 없고만 어디서 하라는 거야?").
                    끄기는 삭제가 아니다 — 레시피·발주 이력이 붙어 있어 지울 수 없는 것을 목록에서 내리는 것. */}
                <ActionButton
                  variant="secondary"
                  disabled={togglingId === ingredient.id}
                  onClick={(e: React.MouseEvent) => { e.stopPropagation(); handleToggleActive(ingredient); }}
                >
                  {togglingId === ingredient.id
                    ? '…'
                    : (ingredient.is_active === false ? 'Activate' : 'Deactivate')}
                </ActionButton>
                <ActionButton
                  variant="danger"
                  onClick={(e: React.MouseEvent) => { e.stopPropagation(); handleDeleteClick(ingredient); }}
                >
                  Delete
                </ActionButton>
              </IngredientActions>
            </IngredientCard>
          ))}
        </IngredientsGrid>
      )}

      {/* 경로② — 이 재고를 외부공급업체 상품으로 등록 (RA 재료 화면과 같은 공유 부품) */}
      <RegisterExternalSupplierModal
        target={extTarget ? { id: extTarget.id, name: extTarget.name, unit: extTarget.unit } : null}
        targetKind="product_ingredient"
        buyerApiBase={brandId ? `/api/brands/${brandId}` : ''}
        buyerScopeQS={brandId ? `?entity_type=brand&entity_id=${brandId}` : ''}
        onClose={() => setExtTarget(null)}
        onRegistered={() => { fetchData(); }}
      />
      {/* 경로③ — 그대로 파는 브랜드 프로덕트로도 등록 (판매가 필수 · 서버가 재고 ×1 레시피 생성) */}
      <RegisterAsProductModal
        target={sellAsProductTarget ? { id: sellAsProductTarget.id, name: sellAsProductTarget.name, unit: sellAsProductTarget.unit } : null}
        endpoint={sellAsProductTarget ? `/api/product-ingredients/${sellAsProductTarget.id}/register-as-product` : ''}
        brandId={brandId ?? null}
        onClose={() => setSellAsProductTarget(null)}
        onRegistered={() => { fetchData(); }}
      />

      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingIngredient ? 'Edit Stock Item' : 'New Stock Item'}
        size="medium"
      >
        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
                placeholder="e.g., Chicken Breast"
                required
              />
            </UIFormGroup>
            <UIFormGroup>
              <FormLabel>{'Category'}</FormLabel>
              <FormSelect
                value={formData.category_id}
                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
              >
                <option value="">{'Select category...'}</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.emoji} {cat.name}
                  </option>
                ))}
              </FormSelect>
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
                min="0"
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

          {/* Supplier Products (발주 연결) — 기존 아이템 편집 시에만. 매핑이 있어야 발주(PO)에서 주문 가능. */}
          {editingIngredient && (
            <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '16px' }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#0A2540', marginBottom: '4px' }}>
                Supplier Products
              </div>
              <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '12px' }}>
                Map this item to a supplier's catalog product so you can order it on a purchase order.
              </div>

              {sellerSources.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                  {sellerSources.map(src => {
                    const cat = catalog.find(c => c.id === src.seller_product_id && (c.supplier?.seller_type || 'supplier') === src.seller_type);
                    const sellerName = cat?.supplier?.name || (src.seller_type === 'system_admin' ? 'System Admin' : 'Supplier');
                    return (
                      <div key={src.id} style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px',
                        padding: '10px 12px', background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '8px'
                      }}>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '13px', fontWeight: 600, color: '#0A2540' }}>{sellerName}</span>
                            {src.is_preferred && (
                              <span style={{ fontSize: '10px', fontWeight: 700, color: '#166534', background: '#DCFCE7', padding: '2px 8px', borderRadius: '999px' }}>
                                PREFERRED
                              </span>
                            )}
                          </div>
                          <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>
                            {src.seller_product_name || cat?.name || `Product #${src.seller_product_id}`}
                            {src.seller_product_sku ? ` · SKU: ${src.seller_product_sku}` : ''}
                            {' · '}{formatCurrency(Number(src.unit_price), selectedCurrency)}
                            {Number(src.unit_conversion) && Number(src.unit_conversion) !== 1 ? ` · ×${Number(src.unit_conversion)}` : ''}
                          </div>
                        </div>
                        <IconButton
                          type="button"
                          variant="delete"
                          onClick={() => handleDeleteSellerSource(src.id)}
                          title="Remove supplier product"
                          aria-label="Remove supplier product"
                        >
                          ✕
                        </IconButton>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '16px' }}>
                  No supplier product linked yet.
                </div>
              )}

              <div style={{ background: '#F4F6F9', borderRadius: '8px', padding: '12px' }}>
                <UIFormGroup>
                  <FormLabel>Add supplier product</FormLabel>
                  <SearchableSelect
                    options={catalog.map(c => ({
                      value: c.id,
                      label: c.name,
                      subLabel: [c.supplier?.name, c.sku ? `SKU: ${c.sku}` : null, c.unit ? c.unit : null].filter(Boolean).join(' · ') || undefined
                    }))}
                    value={sourceForm.seller_product_id}
                    onChange={(val) => {
                      const picked = catalog.find(c => c.id === val);
                      setSourceForm(prev => ({
                        ...prev,
                        seller_product_id: (val as number) || null,
                        // 카탈로그 단가를 기본 unit_price 로 prefill (편집 가능)
                        unit_price: picked ? String(picked.unit_price ?? '') : prev.unit_price
                      }));
                    }}
                    placeholder="Search catalog products..."
                    noOptionsMessage="No catalog products found"
                  />
                </UIFormGroup>

                <UIFormRow style={{ marginTop: '12px' }}>
                  <UIFormGroup>
                    <FormLabel>Unit Price ({selectedCurrency})</FormLabel>
                    <FormInput
                      type="number"
                      step="0.01"
                      min="0"
                      value={sourceForm.unit_price}
                      onChange={(e) => setSourceForm(prev => ({ ...prev, unit_price: e.target.value }))}
                      placeholder="0.00"
                    />
                  </UIFormGroup>
                  <UIFormGroup>
                    <FormLabel>Unit Conversion</FormLabel>
                    <FormInput
                      type="number"
                      step="0.001"
                      min="0.001"
                      value={sourceForm.unit_conversion}
                      onChange={(e) => setSourceForm(prev => ({ ...prev, unit_conversion: e.target.value }))}
                      placeholder="1"
                    />
                  </UIFormGroup>
                </UIFormRow>

                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px', fontSize: '13px', color: '#0A2540', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={sourceForm.is_preferred}
                    onChange={(e) => setSourceForm(prev => ({ ...prev, is_preferred: e.target.checked }))}
                    style={{ margin: 0 }}
                  />
                  Preferred supplier for this item
                </label>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                  <ModalButton
                    type="button"
                    variant="primary"
                    onClick={handleAddSellerSource}
                    disabled={savingSource || !sourceForm.seller_product_id}
                  >
                    {savingSource ? 'Adding...' : 'Add supplier product'}
                  </ModalButton>
                </div>
              </div>
            </div>
          )}

          <ButtonGroup>
            <ModalButton type="button" variant="secondary" onClick={handleCloseModal}>
              Cancel
            </ModalButton>
            <ModalButton type="submit" variant="primary" disabled={saving}>
              {saving ? 'Saving...' : (editingIngredient ? 'Update Stock Item' : 'Create Stock Item')}
            </ModalButton>
          </ButtonGroup>
        </form>
      </Modal>

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
          {detailIngredient.image_url && (
            <div style={{ width: '100%', aspectRatio: '300/180', borderRadius: '8px', overflow: 'hidden', marginBottom: '16px', background: '#F4F6F9' }}>
              <img src={detailIngredient.image_url} alt={detailIngredient.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#635BFF', background: '#F0F4FF', padding: '3px 8px', borderRadius: '4px' }}>
              {detailIngredient.category_name || 'Uncategorized'}
            </span>
          </div>

          <div style={{ fontSize: '16px', fontWeight: 600, color: '#0A2540', marginBottom: '16px' }}>
            Unit Cost: {Number(detailIngredient.unit_cost).toFixed(2)} / {detailIngredient.unit}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '16px' }}>
            <div style={{ padding: '10px', background: '#F9FAFB', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: '#4B5563', marginBottom: '3px' }}>{'Base Qty'}</div>
              <div style={{ fontSize: '14px', fontWeight: 600 }}>{Number(detailIngredient.base_quantity || 1)} {detailIngredient.unit}</div>
            </div>
            <div style={{ padding: '10px', background: '#F9FAFB', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: '#4B5563', marginBottom: '3px' }}>{'Current Stock'}</div>
              <div style={{ fontSize: '14px', fontWeight: 600 }}>{`${Number(detailIngredient.current_stock || 0).toFixed(1)} ${detailIngredient.unit}`}</div>
            </div>
            <div style={{ padding: '10px', background: '#F9FAFB', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: '#4B5563', marginBottom: '3px' }}>{'Min Stock'}</div>
              <div style={{ fontSize: '14px', fontWeight: 600 }}>{`${Number(detailIngredient.min_stock || 0)} ${detailIngredient.unit}`}</div>
            </div>
          </div>

          {detailIngredient.supplier_name && (
            <div style={{ marginBottom: '16px', fontSize: '13px', color: '#4B5563' }}>
              Supplier: <span style={{ color: '#0A2540', fontWeight: 500 }}>{detailIngredient.supplier_name}</span>
            </div>
          )}

          {/* Connected recipes/products */}
          <div style={{ padding: '12px', background: '#F0F4FF', borderRadius: '8px', border: '1px solid #DBEAFE', marginBottom: '16px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#1E40AF', marginBottom: '8px' }}>{'Used In'}</div>
            {linkedItems.recipes.length === 0 && linkedItems.products.length === 0 ? (
              <div style={{ fontSize: '13px', color: '#4B5563' }}>{'Not linked to any recipe or product yet.'}</div>
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
                    <span style={{ fontSize: '11px', background: '#ECFDF5', padding: '1px 6px', borderRadius: '3px', marginRight: '6px' }}>{'Product'}</span>
                    {p.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </Modal>
      )}

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

export default ProductIngredientsTab;
