import React, { useState, useEffect, useCallback } from 'react';
import { getErrorMessage } from '../../utils/apiError';
import styled from 'styled-components';
import { EmptyState } from '../../components/UI/TableComponents';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import SortDropdown, { SortKey, sortItems } from '../../components/Common/SortDropdown';
import { Modal, ModalButton, FormGroup as UIFormGroup, FormLabel, FormInput, FormSelect, FormTextArea } from '../../components/UI/Modal';
import ImageUploadDropzone from '../../components/Common/ImageUploadDropzone';
import ConfirmModal from '../../components/ConfirmModal';
import SearchableSelect from '../../components/Common/SearchableSelect';
import { useTranslation } from 'react-i18next';

import { getAuthToken } from '../../utils/auth';
interface Brand {
  id: number;
  name: string;
  code: string;
}

interface BrandProductsTabProps {
  brands: Brand[];
  onCountChange: (count: number) => void;
  categoryRefreshKey?: number;
  optionRefreshKey?: number;
}

interface Category {
  id: number;
  name: string;
  emoji: string | null;
}

interface OptionGroup {
  id: number;
  name: string;
  is_required: boolean;
  min_selections: number;
  max_selections: number;
}

interface ProductRecipe {
  id: number;
  name: string;
  total_ingredient_cost: number;
  category?: { name: string; emoji?: string };
}

interface SetMenuItem {
  productId: number;
  name: string;
  quantity: number;
}

interface Product {
  id: number;
  category_id: number | null;
  category?: Category;
  name: string;
  description: string | null;
  sku: string | null;
  unit: string | null;
  base_quantity: number;
  unit_price: number;
  min_order_quantity: number;
  image_url: string | null;
  emoji: string | null;
  is_active: boolean;
  is_set_menu: boolean;
  set_items: SetMenuItem[] | null;
  set_display_order: number;
  product_recipe_id: number | null;
  productRecipe?: ProductRecipe;
  sort_order: number;
  brands?: Brand[];
  optionGroups?: OptionGroup[];
}

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 24px;
`;

const ProductCard = styled.div<{ isActive?: boolean }>`
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

const ProductHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
`;

const ProductImage = styled.div<{ src?: string | null }>`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  background: ${props => props.src ? `url(${props.src}) center/cover` : '#F1F4F8'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 28px;
`;

const ProductInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const ProductName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-word;
`;

const ProductSku = styled.div`
  font-size: 12px;
  color: #4B5563;
  margin-bottom: 4px;
`;

const ProductCategory = styled.div`
  display: inline-block;
  padding: 4px 8px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
`;

const ProductDetails = styled.div`
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #C7CED6;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 14px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const DetailLabel = styled.span`
  color: #4B5563;
`;

const DetailValue = styled.span`
  color: #0A2540;
  font-weight: 500;
`;

const PriceValue = styled.span`
  color: #059669;
  font-weight: 600;
  font-size: 16px;
`;

const CardSpacer = styled.div`
  flex: 1;
  min-height: 12px;
`;

const ProductActions = styled.div`
  display: flex;
  gap: 8px;
  padding-top: 12px;
  border-top: 1px solid #C7CED6;
`;

const ActionButton = styled.button<{ variant?: 'danger' }>`
  flex: 1;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid ${props => props.variant === 'danger' ? '#FEE2E2' : '#C7CED6'};
  background: ${props => props.variant === 'danger' ? '#FEF2F2' : '#F9FAFB'};
  color: ${props => props.variant === 'danger' ? '#DC2626' : '#1F2937'};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.variant === 'danger' ? '#FEE2E2' : '#F1F4F8'};
    border-color: ${props => props.variant === 'danger' ? '#FECACA' : '#6B7280'};
  }
`;


const EmptyTitle = styled.h4`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`;

const EmptyDescription = styled.p`
  font-size: 14px;
  color: #4B5563;
  margin: 0 0 20px 0;
`;

const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 8px;
`;

const Badge = styled.span<{ color?: string }>`
  display: inline-block;
  padding: 2px 8px;
  background: ${props => props.color || '#C7CED6'};
  color: #1F2937;
  border-radius: 4px;
  font-size: 11px;
`;

const BrandBadge = styled(Badge)`
  background: #DBEAFE;
  color: #1E40AF;
`;

const OptionBadge = styled(Badge)`
  background: #C7CED6;
  color: #1F2937;
`;

const SetBadge = styled.span`
  display: inline-block;
  padding: 2px 8px;
  background: #667eea;
  color: white;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  margin-left: 6px;
`;

const SetItemsSummary = styled.div`
  font-size: 11px;
  color: #667eea;
  margin-top: 4px;
  line-height: 1.4;
`;

const CopyButton = styled.button`
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #C7CED6;
  background: #F9FAFB;
  color: #1F2937;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  &:hover { background: #F1F4F8; border-color: #6B7280; }
`;

const ToggleButton = styled.button<{ isActive: boolean }>`
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid ${props => props.isActive ? '#D1FAE5' : '#FEE2E2'};
  background: ${props => props.isActive ? '#ECFDF5' : '#FEF2F2'};
  color: ${props => props.isActive ? '#059669' : '#DC2626'};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background: ${props => props.isActive ? '#D1FAE5' : '#FEE2E2'};
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #1F2937;
  cursor: pointer;
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 12px;
  background: #F9FAFB;
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
`;

const CheckboxItem = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: white;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;

  &:hover {
    border-color: #635BFF;
  }

  input:checked + span {
    color: #635BFF;
    font-weight: 500;
  }
`;

const BrandProductsTab: React.FC<BrandProductsTabProps> = ({
  brands,
  onCountChange,
  categoryRefreshKey,
  optionRefreshKey
}) => {
  const { t } = useTranslation('brand');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [optionGroups, setOptionGroups] = useState<OptionGroup[]>([]);
  const [productRecipes, setProductRecipes] = useState<ProductRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('newest');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [brandFilter, setBrandFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [infoModal, setInfoModal] = useState<{ open: boolean; title: string; message: string }>({ open: false, title: '', message: '' });

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    sku: '',
    unit: '',
    base_quantity: '1',
    unit_price: '',
    min_order_quantity: '1',
    category_id: '',
    image_url: '',
    emoji: '',
    is_active: true,
    is_set_menu: false,
    set_items: [] as SetMenuItem[],
    set_display_order: '0',
    product_recipe_id: null as number | null,
    distribution_mode: 'specific_brands' as 'all' | 'specific_brands' | 'specific_restaurants',
    brand_ids: [] as number[],
    restaurant_ids: [] as number[],
    option_group_ids: [] as number[]
  });
  const [restaurants, setRestaurants] = useState<Array<{ id: number; name: string; brand_name?: string }>>([]);
  const [setMenuSearchQuery, setSetMenuSearchQuery] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [directIngredients, setDirectIngredients] = useState<{ingredient_id: number; name: string; quantity: number; unit: string; unit_cost: number}[]>([]);
  const [productIngredientsList, setProductIngredientsList] = useState<{id: number; name: string; unit: string; unit_cost: number}[]>([]);

  const unitOptions = [
    { value: 'kg', label: 'kg' },
    { value: 'g', label: 'g' },
    { value: 'L', label: 'L' },
    { value: 'ml', label: 'ml' },
    { value: 'piece', label: 'piece' },
    { value: 'pack', label: 'pack' },
    { value: 'can', label: 'can' },
    { value: 'bottle', label: 'bottle' }
  ];

  const getToken = useCallback(() => getAuthToken(), []);

  const fetchProducts = useCallback(async () => {
    try {
      const token = getToken();
      const response = await fetch('/api/brand-products', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();

      if (data.success) {
        setProducts(data.data);
        onCountChange(data.data.length);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  }, [getToken, onCountChange]);

  const fetchCategories = useCallback(async () => {
    try {
      const token = getToken();
      const response = await fetch('/api/brand-product-categories', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();

      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  }, [getToken]);

  const fetchOptionGroups = useCallback(async () => {
    try {
      const token = getToken();
      const response = await fetch('/api/brand-product-option-groups', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();

      if (data.success) {
        setOptionGroups(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch option groups:', error);
    }
  }, [getToken]);

  const fetchProductRecipes = useCallback(async () => {
    try {
      const token = getToken();
      const response = await fetch('/api/product-recipes', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();

      if (data.success) {
        setProductRecipes(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch product recipes:', error);
    }
  }, [getToken]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchProducts(), fetchCategories(), fetchOptionGroups(), fetchProductRecipes()]);
      // Fetch product ingredients for direct linking
      try {
        const token = getAuthToken();
        const piRes = await fetch('/api/product-ingredients', { headers: { 'Authorization': `Bearer ${token}` } });
        if (piRes.ok) {
          const piData = await piRes.json();
          setProductIngredientsList((Array.isArray(piData.data) ? piData.data : Array.isArray(piData) ? piData : []).map((pi: any) => ({ id: pi.id, name: pi.name, unit: pi.unit, unit_cost: Number(pi.unit_cost || 0) })));
        }
      } catch (e) { console.error('Failed to fetch product ingredients:', e); }
      // Fetch restaurants of BG's brands (for specific_restaurants distribution)
      try {
        const token = getAuthToken();
        const restRes = await fetch('/api/brand-products/restaurants', { headers: { 'Authorization': `Bearer ${token}` } });
        if (restRes.ok) {
          const rd = await restRes.json();
          setRestaurants(rd.data || []);
        }
      } catch (e) { console.error('Failed to fetch restaurants:', e); }
      setLoading(false);
    };
    loadData();
  }, [fetchProducts, fetchCategories, fetchOptionGroups, fetchProductRecipes]);

  useEffect(() => {
    if (categoryRefreshKey !== undefined) {
      fetchCategories();
    }
  }, [categoryRefreshKey, fetchCategories]);

  useEffect(() => {
    if (optionRefreshKey !== undefined) {
      fetchOptionGroups();
    }
  }, [optionRefreshKey, fetchOptionGroups]);

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        description: product.description || '',
        sku: product.sku || '',
        unit: product.unit || '',
        base_quantity: (product.base_quantity || 1).toString(),
        unit_price: product.unit_price.toString(),
        min_order_quantity: product.min_order_quantity.toString(),
        category_id: product.category_id?.toString() || '',
        image_url: product.image_url || '',
        emoji: product.emoji || '',
        is_active: product.is_active,
        is_set_menu: product.is_set_menu || false,
        set_items: product.set_items || [],
        set_display_order: (product.set_display_order || 0).toString(),
        product_recipe_id: (product.product_recipe_id && product.productRecipe?.name?.endsWith('(auto)')) ? null : (product.product_recipe_id || null),
        distribution_mode: (product as any).distribution_mode || 'specific_brands',
        brand_ids: product.brands?.map(b => b.id) || [],
        restaurant_ids: (product as any).restaurants?.map((r: any) => r.id) || [],
        option_group_ids: product.optionGroups?.map(og => og.id) || []
      });
      // Load directIngredients from auto recipe
      if (product.product_recipe_id && product.productRecipe?.name?.endsWith('(auto)')) {
        const token = getAuthToken();
        fetch(`/api/product-recipes/${product.product_recipe_id}`, { headers: { 'Authorization': `Bearer ${token}` } })
          .then(r => r.json())
          .then(data => {
            const recipe = data.data || data;
            const ris = recipe?.recipeIngredients || recipe?.ProductRecipeIngredients || [];
            setDirectIngredients(ris.map((ri: any) => ({
              ingredient_id: ri.ingredient_id,
              name: ri.ingredient?.name || '',
              quantity: parseFloat(ri.quantity),
              unit: ri.unit || ri.ingredient?.unit || '',
              unit_cost: parseFloat(ri.ingredient?.unit_cost || 0)
            })));
          })
          .catch(() => setDirectIngredients([]));
      } else {
        setDirectIngredients([]);
      }
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        sku: '',
        unit: '',
        base_quantity: '1',
        unit_price: '',
        min_order_quantity: '1',
        category_id: categories.length > 0 ? categories[0].id.toString() : '',
        image_url: '',
        emoji: '',
        is_active: true,
        is_set_menu: false,
        set_items: [],
        set_display_order: '0',
        product_recipe_id: null,
        distribution_mode: 'specific_brands',
        brand_ids: [],
        restaurant_ids: [],
        option_group_ids: []
      });
      setDirectIngredients([]);
    }
    setSetMenuSearchQuery('');
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setFormError(null);
  };

  // 중복 확인 대화: 서버가 409 SIMILAR_EXISTS 를 주면 사용자가 결정한다.
  // "그래도 새로 등록"을 고르면 같은 요청을 force:true 로 재전송한다.
  // ── 왜 필요한가 ────────────────────────────────────────────────────────
  // 2026-08-22 백엔드에 소프트 중복 가드가 들어갔는데 화면이 force 를 안 보내,
  // 괄호 안 설명만 다른 **정당한 변형**(종이볼 L/M/S, 850CC vs 780CC)을 아예 등록할 수
  // 없었다. 사용자에게는 원인 모를 실패로 보였다.
  const [similarConfirm, setSimilarConfirm] = useState<{
    open: boolean; names: string[]; retry: null | (() => void);
  }>({ open: false, names: [], retry: null });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    await submitProduct(false);
  };

  const submitProduct = async (force: boolean) => {
    setFormError(null);

    if (!formData.name.trim()) {
      setFormError('Product name is required');
      return;
    }
    if (!formData.unit) {
      setFormError('Unit is required');
      return;
    }

    setIsSubmitting(true);

    try {
      const token = getToken();
      const method = editingProduct ? 'PUT' : 'POST';
      const url = editingProduct
        ? `/api/brand-products/${editingProduct.id}`
        : '/api/brand-products';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          description: formData.description.trim() || null,
          sku: formData.sku.trim() || null,
          unit: formData.unit || null,
          base_quantity: parseFloat(formData.base_quantity) || 1,
          unit_price: parseFloat(formData.unit_price) || 0,
          min_order_quantity: parseInt(formData.min_order_quantity) || 1,
          category_id: formData.category_id ? parseInt(formData.category_id) : null,
          image_url: formData.image_url || null,
          emoji: formData.emoji || null,
          is_active: formData.is_active,
          is_set_menu: formData.is_set_menu,
          set_items: formData.is_set_menu ? formData.set_items : null,
          set_display_order: parseInt(formData.set_display_order) || 0,
          product_recipe_id: formData.product_recipe_id,
          distribution_mode: formData.distribution_mode,
          brand_ids: formData.distribution_mode === 'specific_brands' ? formData.brand_ids : [],
          restaurant_ids: formData.distribution_mode === 'specific_restaurants' ? formData.restaurant_ids : [],
          option_group_ids: formData.option_group_ids,
          directIngredients: !formData.product_recipe_id ? directIngredients : undefined,
          // 사용자가 "그래도 새로 등록"을 고른 경우에만 실린다. 하드 중복(SKU·이름 완전일치)은
          // force 로도 통과하지 않는다 — 그건 되돌릴 수 없이 명백한 중복이기 때문.
          ...(force ? { force: true } : {})
        })
      });

      const data = await response.json();

      if (data.success) {
        setSimilarConfirm({ open: false, names: [], retry: null });
        handleCloseModal();
        fetchProducts();
      } else if (response.status === 409 && data?.error?.code === 'SIMILAR_EXISTS') {
        // 차단이 아니라 확인이다 — 사람이 "같은 물건인지" 판단한다.
        const names: string[] = [
          ...(data.error.similar || []).map((r: any) => r.name),
          ...(data.error.suggestions || []).map((r: any) => r.name),
        ];
        setSimilarConfirm({ open: true, names, retry: () => submitProduct(true) });
      } else if (response.status === 409 && data?.error?.existing) {
        // 하드 중복 — 이미 있는 상품이 무엇인지 이름·SKU 로 알려 준다(막연한 실패 금지).
        const ex = data.error.existing;
        setFormError(
          `${data.error.message || 'Already exists.'} — "${ex.name}"${ex.sku ? ` (SKU ${ex.sku})` : ''}`
        );
      } else {
        setFormError(getErrorMessage(data, 'Failed to save product'));
      }
    } catch (error) {
      console.error('Failed to save product:', error);
      setFormError('Failed to save product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyProduct = async (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const token = getToken();
      const response = await fetch(`/api/brand-products/${product.id}/copy`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        fetchProducts();
      } else {
        alert(getErrorMessage(data, 'Failed to copy product'));
      }
    } catch (error) {
      console.error('Failed to copy product:', error);
    }
  };

  const handleToggleActive = async (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const token = getToken();
      const response = await fetch(`/api/brand-products/${product.id}/toggle-active`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        fetchProducts();
      }
    } catch (error) {
      console.error('Failed to toggle product:', error);
    }
  };

  // Set menu helpers
  const handleAddSetMenuItem = (menuItemId: number) => {
    const menuItem = products.find(p => p.id === menuItemId);
    if (!menuItem || menuItem.is_set_menu) return;

    const existing = formData.set_items.find(item => item.productId === menuItemId);
    if (existing) {
      setFormData(prev => ({
        ...prev,
        set_items: prev.set_items.map(item =>
          item.productId === menuItemId ? { ...item, quantity: item.quantity + 1 } : item
        )
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        set_items: [...prev.set_items, { productId: menuItemId, name: menuItem.name, quantity: 1 }]
      }));
    }
  };

  const handleRemoveSetMenuItem = (productId: number) => {
    setFormData(prev => ({
      ...prev,
      set_items: prev.set_items.filter(item => item.productId !== productId)
    }));
  };

  const handleUpdateSetMenuItemQuantity = (productId: number, delta: number) => {
    setFormData(prev => ({
      ...prev,
      set_items: prev.set_items.map(item => {
        if (item.productId === productId) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    }));
  };

  const handleDeleteClick = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    setProductToDelete(product);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;

    try {
      const token = getToken();
      const response = await fetch(`/api/brand-products/${productToDelete.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();

      if (data.success) {
        setDeleteModalOpen(false);
        setProductToDelete(null);
        fetchProducts();
      } else {
        setInfoModal({ open: true, title: t('brand:brandProductsTab.deleteFailedTitle', 'Delete Failed'), message: getErrorMessage(data, t('brand:brandProductsTab.deleteFailedMessage', 'Failed to delete product.')) });
      }
    } catch (error) {
      console.error('Failed to delete product:', error);
      setInfoModal({ open: true, title: t('brand:brandProductsTab.deleteFailedTitle', 'Delete Failed'), message: t('brand:brandProductsTab.deleteFailedMessage', 'Failed to delete product.') });
    }
  };

  const handleBrandToggle = (brandId: number) => {
    setFormData(prev => ({
      ...prev,
      brand_ids: prev.brand_ids.includes(brandId)
        ? prev.brand_ids.filter(id => id !== brandId)
        : [...prev.brand_ids, brandId]
    }));
  };

  const handleOptionGroupToggle = (ogId: number) => {
    setFormData(prev => ({
      ...prev,
      option_group_ids: prev.option_group_ids.includes(ogId)
        ? prev.option_group_ids.filter(id => id !== ogId)
        : [...prev.option_group_ids, ogId]
    }));
  };

  // Filter products
  const filteredProducts = sortItems(products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (product.sku && product.sku.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || product.category_id?.toString() === categoryFilter;
    const matchesBrand = brandFilter === 'all' || product.brands?.some(b => b.id.toString() === brandFilter);
    return matchesSearch && matchesCategory && matchesBrand;
  }), sortKey);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#4B5563' }}>
        {t('productsTab.loading')}
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <FilterBar style={{ marginBottom: 0 }}>
          <SearchInput
            type="text"
            placeholder={t('productsTab.searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FilterSelect
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">{t('productsTab.allCategories')}</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id.toString()}>
                {cat.emoji} {cat.name}
              </option>
            ))}
          </FilterSelect>
          <FilterSelect
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
          >
            <option value="all">{t('productsTab.allBrands')}</option>
            {brands.map(brand => (
              <option key={brand.id} value={brand.id.toString()}>
                {brand.name}
              </option>
            ))}
          </FilterSelect>
          <SortDropdown value={sortKey} onChange={setSortKey} />
        </FilterBar>
        <ThemedButton onClick={() => handleOpenModal()} style={{ flexShrink: 0 }}>
          {t('productsTab.addProduct')}
        </ThemedButton>
      </div>

      {filteredProducts.length === 0 ? (
        <EmptyState>
          <EmptyTitle>
            {searchTerm || categoryFilter !== 'all' || brandFilter !== 'all'
              ? t('productsTab.noProductsFound')
              : t('productsTab.noProductsYet')}
          </EmptyTitle>
          <EmptyDescription>
            {searchTerm || categoryFilter !== 'all' || brandFilter !== 'all'
              ? t('common:emptyState.adjustFilters', 'Try adjusting your search or filter criteria.')
              : t('productsTab.startBuilding')}
          </EmptyDescription>
          {!searchTerm && categoryFilter === 'all' && brandFilter === 'all' && (
            <ThemedButton onClick={() => handleOpenModal()}>{t('productsTab.addProduct')}</ThemedButton>
          )}
        </EmptyState>
      ) : (
        <ProductsGrid>
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              isActive={product.is_active}
              onClick={() => handleOpenModal(product)}
            >
              <ProductHeader>
                <ProductImage src={product.image_url}>
                  {!product.image_url && (product.emoji || '📦')}
                </ProductImage>
                <ProductInfo>
                  <ProductName>
                    {product.name}
                    {product.is_set_menu && <SetBadge>{'SET'}</SetBadge>}
                  </ProductName>
                  {product.sku && <ProductSku>SKU: {product.sku}</ProductSku>}
                  {product.category && (
                    <ProductCategory>
                      {product.category.emoji} {product.category.name}
                    </ProductCategory>
                  )}
                  {product.is_set_menu && product.set_items && product.set_items.length > 0 && (
                    <SetItemsSummary>
                      Set: {product.set_items.map(si => `${si.name} x${si.quantity}`).join(', ')}
                    </SetItemsSummary>
                  )}
                </ProductInfo>
              </ProductHeader>

              <ProductDetails>
                <DetailRow>
                  <DetailLabel>{'Unit Price'}</DetailLabel>
                  <PriceValue>RM {(Number(product.unit_price) || 0).toFixed(2)}</PriceValue>
                </DetailRow>
                {product.unit && (
                  <DetailRow>
                    <DetailLabel>{'Unit'}</DetailLabel>
                    <DetailValue>{product.unit}</DetailValue>
                  </DetailRow>
                )}
                <DetailRow>
                  <DetailLabel>{'Min Order'}</DetailLabel>
                  <DetailValue>{product.min_order_quantity}</DetailValue>
                </DetailRow>
              </ProductDetails>

              {product.brands && product.brands.length > 0 && (
                <BadgeContainer>
                  {product.brands.map(brand => (
                    <BrandBadge key={brand.id}>{brand.name}</BrandBadge>
                  ))}
                </BadgeContainer>
              )}

              {product.optionGroups && product.optionGroups.length > 0 && (
                <BadgeContainer>
                  {product.optionGroups.map(og => (
                    <OptionBadge key={og.id}>{og.name}</OptionBadge>
                  ))}
                </BadgeContainer>
              )}

              <CardSpacer />
              <ProductActions onClick={(e) => e.stopPropagation()}>
                <ActionButton onClick={() => handleOpenModal(product)}>
                  Edit
                </ActionButton>
                <CopyButton onClick={(e) => handleCopyProduct(product, e)}>
                  Copy
                </CopyButton>
                <ToggleButton isActive={product.is_active} onClick={(e) => handleToggleActive(product, e)}>
                  {product.is_active ? 'Active' : 'Inactive'}
                </ToggleButton>
                <ActionButton variant="danger" onClick={(e) => handleDeleteClick(product, e)}>
                  Delete
                </ActionButton>
              </ProductActions>
            </ProductCard>
          ))}
        </ProductsGrid>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={handleCloseModal}
          title={editingProduct ? t('productsTab.editProduct') : t('productsTab.addProduct')}
          maxWidth="700px"
        >
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <UIFormGroup>
                <FormLabel>Name *</FormLabel>
                <FormInput
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Product name"
                  required
                />
              </UIFormGroup>

              <UIFormGroup>
                <FormLabel>{'SKU'}</FormLabel>
                <FormInput
                  type="text"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  placeholder="Product code"
                />
              </UIFormGroup>
            </div>

            <UIFormGroup>
              <FormLabel>{'Category'}</FormLabel>
              <FormSelect
                value={formData.category_id}
                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
              >
                <option value="">{'No category'}</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id.toString()}>
                    {cat.emoji} {cat.name}
                  </option>
                ))}
              </FormSelect>
            </UIFormGroup>

            <UIFormGroup>
              <FormLabel>{'Description'}</FormLabel>
              <FormTextArea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Product description"
                rows={2}
              />
            </UIFormGroup>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '16px' }}>
              <UIFormGroup>
                <FormLabel>Unit Price (RM) *</FormLabel>
                <FormInput
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.unit_price}
                  onChange={(e) => setFormData({ ...formData, unit_price: e.target.value })}
                  placeholder="0.00"
                  required
                />
              </UIFormGroup>

              <UIFormGroup>
                <FormLabel>Base Qty *</FormLabel>
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
                  <option value="">{'Select unit'}</option>
                  {unitOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </FormSelect>
              </UIFormGroup>

              <UIFormGroup>
                <FormLabel>{'Min Order Qty'}</FormLabel>
                <FormInput
                  type="number"
                  min="1"
                  value={formData.min_order_quantity}
                  onChange={(e) => setFormData({ ...formData, min_order_quantity: e.target.value })}
                />
              </UIFormGroup>
            </div>

            <UIFormGroup>
              <FormLabel>{'Product Image'}</FormLabel>
              <ImageUploadDropzone
                value={formData.image_url}
                onChange={(url) => setFormData({ ...formData, image_url: url || '' })}
                label=""
                helpText="Upload a product image (max 2MB)"
              />
            </UIFormGroup>

            <UIFormGroup>
              <CheckboxLabel>
                <input
                  type="checkbox"
                  checked={formData.is_set_menu}
                  onChange={(e) => setFormData({ ...formData, is_set_menu: e.target.checked, set_items: e.target.checked ? formData.set_items : [] })}
                />
                Set Menu (bundle multiple products)
              </CheckboxLabel>
            </UIFormGroup>

            {formData.is_set_menu && (
              <UIFormGroup>
                <FormLabel>Set Items *</FormLabel>
                {formData.set_items.length > 0 && (
                  <div style={{ marginBottom: '12px' }}>
                    {formData.set_items.map(item => (
                      <div key={item.productId} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', background: '#F9FAFB', borderRadius: '6px', marginBottom: '4px' }}>
                        <span style={{ flex: 1, fontSize: '14px' }}>{item.name}</span>
                        <button type="button" onClick={() => handleUpdateSetMenuItemQuantity(item.productId, -1)} style={{ width: '28px', height: '28px', border: '1px solid #6B7280', borderRadius: '4px', background: 'white', cursor: 'pointer' }}>-</button>
                        <span style={{ minWidth: '24px', textAlign: 'center', fontWeight: 600 }}>{item.quantity}</span>
                        <button type="button" onClick={() => handleUpdateSetMenuItemQuantity(item.productId, 1)} style={{ width: '28px', height: '28px', border: '1px solid #6B7280', borderRadius: '4px', background: 'white', cursor: 'pointer' }}>+</button>
                        <button type="button" onClick={() => handleRemoveSetMenuItem(item.productId)} style={{ color: '#DC2626', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>x</button>
                      </div>
                    ))}
                  </div>
                )}
                <FormInput
                  type="text"
                  placeholder="Search products to add..."
                  value={setMenuSearchQuery}
                  onChange={(e) => setSetMenuSearchQuery(e.target.value)}
                  style={{ marginBottom: '8px' }}
                />
                <div style={{ maxHeight: '200px', overflowY: 'auto', background: '#F9FAFB', borderRadius: '8px', padding: '8px' }}>
                  {products
                    .filter(p => !p.is_set_menu && (editingProduct ? p.id !== editingProduct.id : true))
                    .filter(p => !setMenuSearchQuery || p.name.toLowerCase().includes(setMenuSearchQuery.toLowerCase()) || (p.sku && p.sku.toLowerCase().includes(setMenuSearchQuery.toLowerCase())))
                    .map(p => (
                      <div
                        key={p.id}
                        onClick={() => handleAddSetMenuItem(p.id)}
                        style={{
                          padding: '8px 12px', cursor: 'pointer', borderRadius: '6px', marginBottom: '2px',
                          background: formData.set_items.some(si => si.productId === p.id) ? '#EEF2FF' : 'white',
                          border: '1px solid #C7CED6', fontSize: '13px',
                          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                        }}
                      >
                        <span>{p.emoji || '📦'} {p.sku ? `${p.sku} ` : ''}{p.name}</span>
                        <span style={{ color: '#4B5563' }}>RM {(Number(p.unit_price) || 0).toFixed(2)}</span>
                      </div>
                    ))
                  }
                </div>
              </UIFormGroup>
            )}

            <UIFormGroup>
              <FormLabel>{t('brandProducts.distribution.label', { defaultValue: 'Distribution Scope' })}</FormLabel>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '8px 0' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="distmode"
                    checked={formData.distribution_mode === 'all'}
                    onChange={() => setFormData(prev => ({ ...prev, distribution_mode: 'all' }))}
                  />
                  <span><strong>{t('brandProducts.distribution.allTitle', { defaultValue: 'All franchises' })}</strong> — {t('brandProducts.distribution.allDesc', { defaultValue: 'Automatically available to every franchise across all my brands' })}</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="distmode"
                    checked={formData.distribution_mode === 'specific_brands'}
                    onChange={() => setFormData(prev => ({ ...prev, distribution_mode: 'specific_brands' }))}
                  />
                  <span><strong>{t('brandProducts.distribution.brandsTitle', { defaultValue: 'Specific brands only' })}</strong> — {t('brandProducts.distribution.brandsDesc', { defaultValue: 'All franchises in the selected brands' })}</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="distmode"
                    checked={formData.distribution_mode === 'specific_restaurants'}
                    onChange={() => setFormData(prev => ({ ...prev, distribution_mode: 'specific_restaurants' }))}
                  />
                  <span><strong>{t('brandProducts.distribution.restaurantsTitle', { defaultValue: 'Specific restaurants only' })}</strong> — {t('brandProducts.distribution.restaurantsDesc', { defaultValue: 'Only the selected franchises can order' })}</span>
                </label>
              </div>
            </UIFormGroup>

            {formData.distribution_mode === 'specific_brands' && (
              <UIFormGroup>
                <FormLabel>{t('brandProductsTab.targetBrands', 'Target Brands')}</FormLabel>
                <CheckboxGroup>
                  {brands.map(brand => (
                    <CheckboxItem key={brand.id}>
                      <input
                        type="checkbox"
                        checked={formData.brand_ids.includes(brand.id)}
                        onChange={() => handleBrandToggle(brand.id)}
                      />
                      <span>{brand.name}</span>
                    </CheckboxItem>
                  ))}
                </CheckboxGroup>
              </UIFormGroup>
            )}

            {formData.distribution_mode === 'specific_restaurants' && (
              <UIFormGroup>
                <FormLabel>{t('brandProductsTab.targetRestaurants', 'Target Stores')}</FormLabel>
                {restaurants.length === 0 ? (
                  <div style={{ padding: 12, background: '#F9FAFB', borderRadius: 8, color: '#4B5563', fontSize: 13 }}>
                    No restaurants available.
                  </div>
                ) : (
                  <CheckboxGroup>
                    {restaurants.map(r => (
                      <CheckboxItem key={r.id}>
                        <input
                          type="checkbox"
                          checked={(formData.restaurant_ids || []).includes(r.id)}
                          onChange={() => setFormData(prev => ({
                            ...prev,
                            restaurant_ids: (prev.restaurant_ids || []).includes(r.id)
                              ? (prev.restaurant_ids || []).filter(id => id !== r.id)
                              : [...(prev.restaurant_ids || []), r.id]
                          }))}
                        />
                        <span>{r.name}{r.brand_name ? ` (${r.brand_name})` : ''}</span>
                      </CheckboxItem>
                    ))}
                  </CheckboxGroup>
                )}
              </UIFormGroup>
            )}

            <UIFormGroup>
              <FormLabel>{'Option Groups'}</FormLabel>
              {optionGroups.length > 0 ? (
                <CheckboxGroup>
                  {optionGroups.map(og => (
                    <CheckboxItem key={og.id}>
                      <input
                        type="checkbox"
                        checked={formData.option_group_ids.includes(og.id)}
                        onChange={() => handleOptionGroupToggle(og.id)}
                      />
                      <span>{og.name} {og.is_required ? '(Required)' : ''}</span>
                    </CheckboxItem>
                  ))}
                </CheckboxGroup>
              ) : (
                <div style={{ padding: '12px', background: '#F9FAFB', borderRadius: '8px', color: '#4B5563', fontSize: '13px' }}>
                  No option groups available. Create option groups in the Options tab first.
                </div>
              )}
            </UIFormGroup>

            {directIngredients.length === 0 && (
              <UIFormGroup>
                <FormLabel>{'Linked Product Recipe'}</FormLabel>
                <SearchableSelect
                  options={productRecipes.filter(r => !r.name?.endsWith('(auto)')).map(recipe => ({
                    value: recipe.id,
                    label: recipe.name,
                    subLabel: `Cost: RM ${Number(recipe.total_ingredient_cost || 0).toFixed(2)}`
                  }))}
                  value={formData.product_recipe_id}
                  onChange={(value) => setFormData({ ...formData, product_recipe_id: value as number | null })}
                  placeholder="Search or select recipe..."
                  allowClear={true}
                  noOptionsMessage="No product recipes found"
                />
              </UIFormGroup>
            )}

            {!formData.product_recipe_id && (
              <UIFormGroup>
                <FormLabel>Ingredients (direct) {directIngredients.length > 0 && <span style={{ fontSize: '11px', color: '#4B5563', fontWeight: 400 }}>Cost: RM {directIngredients.reduce((sum, di) => sum + (di.unit_cost * di.quantity), 0).toFixed(2)}</span>}</FormLabel>
                {directIngredients.map((di, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px', fontSize: '13px', background: '#F9FAFB', padding: '8px 12px', borderRadius: '6px' }}>
                    <span style={{ flex: 1 }}>{di.name}</span>
                    <input type="number" value={di.quantity} min="0.01" step="0.01" style={{ width: '60px', textAlign: 'center', border: '1px solid #C7CED6', borderRadius: '4px', padding: '2px 4px', fontSize: '13px' }}
                      onChange={(e) => setDirectIngredients(prev => prev.map((item, i) => i === idx ? { ...item, quantity: parseFloat(e.target.value) || 0 } : item))} />
                    <span style={{ fontSize: '12px', color: '#4B5563', width: '30px' }}>{di.unit}</span>
                    <span style={{ width: '70px', textAlign: 'right', color: '#4B5563', fontSize: '12px' }}>RM {(di.unit_cost * di.quantity).toFixed(2)}</span>
                    <button type="button" onClick={() => setDirectIngredients(prev => prev.filter((_, i) => i !== idx))} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', fontSize: '16px', padding: '0 4px' }}>x</button>
                  </div>
                ))}
                <SearchableSelect
                  options={productIngredientsList.filter(ing => !directIngredients.some(di => di.ingredient_id === ing.id)).map(ing => ({
                    value: ing.id,
                    label: ing.name,
                    subLabel: `${ing.unit} / RM ${Number(ing.unit_cost || 0).toFixed(2)}`
                  }))}
                  value={null}
                  onChange={(value) => {
                    if (value) {
                      const ing = productIngredientsList.find(i => i.id === value);
                      if (ing) setDirectIngredients(prev => [...prev, { ingredient_id: ing.id, name: ing.name, quantity: 1, unit: ing.unit, unit_cost: Number(ing.unit_cost || 0) }]);
                    }
                  }}
                  placeholder="Add ingredient..."
                  allowClear={false}
                  noOptionsMessage="No ingredients available"
                />
              </UIFormGroup>
            )}

            <UIFormGroup style={{ marginBottom: 0 }}>
              <CheckboxLabel>
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                />
                Active
              </CheckboxLabel>
            </UIFormGroup>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
              <ModalButton type="button" onClick={handleCloseModal} disabled={isSubmitting}>
                Cancel
              </ModalButton>
              <ModalButton type="submit" variant="primary" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : (editingProduct ? 'Update' : 'Create')}
              </ModalButton>
            </div>

            {formError && (
              <div style={{
                marginTop: '16px',
                padding: '12px 16px',
                background: '#FEF2F2',
                border: '1px solid #FCA5A5',
                borderRadius: '8px',
                color: '#DC2626',
                fontSize: '14px'
              }}>
                {formError}
              </div>
            )}
          </form>
        </Modal>
      )}

      {/* Delete Confirm Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        onCancel={() => {
          setDeleteModalOpen(false);
          setProductToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Product"
        message={`Are you sure you want to delete "${productToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
      <ConfirmModal
        isOpen={similarConfirm.open}
        title="Similar product already exists"
        message={
          `${similarConfirm.names.slice(0, 5).map((n) => `• ${n}`).join('\n')}`
          + `${similarConfirm.names.length > 5 ? `\n… and ${similarConfirm.names.length - 5} more` : ''}`
          + '\n\nRegister this as a new product anyway?'
        }
        onConfirm={() => {
          const retry = similarConfirm.retry;
          setSimilarConfirm({ open: false, names: [], retry: null });
          if (retry) retry();
        }}
        onCancel={() => setSimilarConfirm({ open: false, names: [], retry: null })}
        confirmText="Register anyway"
        cancelText="Cancel"
        type="warning"
      />
      <ConfirmModal
        isOpen={infoModal.open}
        title={infoModal.title}
        message={infoModal.message}
        onConfirm={() => setInfoModal({ open: false, title: '', message: '' })}
        onCancel={() => setInfoModal({ open: false, title: '', message: '' })}
        confirmText={t('common:ok', 'OK')}
        type="info"
        singleButton
      />
    </div>
  );
};

export default BrandProductsTab;
