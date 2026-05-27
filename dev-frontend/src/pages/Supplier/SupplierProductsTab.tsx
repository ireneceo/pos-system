import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { EmptyState } from '../../components/UI/TableComponents';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import SortDropdown, { SortKey, sortItems } from '../../components/Common/SortDropdown';
import {
  Modal,
  ModalButton,
  FormGroup as UIFormGroup,
  FormLabel,
  FormInput,
  FormSelect,
  FormTextArea
} from '../../components/UI/Modal';
import { FormGrid2, FormGrid4 } from '../../components/UI/FormGrid';
import ImageUploadDropzone from '../../components/Common/ImageUploadDropzone';
import ConfirmModal from '../../components/ConfirmModal';
import { getAuthToken } from '../../utils/auth';

interface SupplierProductCategory {
  id: number;
  name: string;
  emoji: string | null;
}

interface SupplierProductOption {
  id: number;
  name: string;
  price_adjustment: number;
}

interface SupplierProductOptionGroup {
  id: number;
  name: string;
  is_required: boolean;
  min_selections: number;
  max_selections: number;
  options?: SupplierProductOption[];
}

interface SupplierProduct {
  id: number;
  category_id: number | null;
  category?: SupplierProductCategory;
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
  current_stock: number;
  low_stock_threshold: number;
  lead_time_days: number;
  sort_order: number;
  optionGroups?: SupplierProductOptionGroup[];
}

interface PlanLimitError {
  message: string;
  current?: number;
  limit?: number;
}

interface Props {
  onCountChange: (count: number) => void;
  categoryRefreshKey?: number;
  optionRefreshKey?: number;
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
  border: 1px solid #e6ebf1;
  padding: 20px;
  transition: all 0.2s;
  opacity: ${(props) => (props.isActive ? 1 : 0.6)};
  cursor: pointer;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
    border-color: #635bff;
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
  background: ${(props) => (props.src ? `url(${props.src}) center/cover` : '#F1F4F8')};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 14px;
  color: #6b7280;
  font-weight: 600;
`;

const ProductInfoBlock = styled.div`
  flex: 1;
  min-width: 0;
`;

const ProductName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0a2540;
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
  color: #6b7280;
  margin-bottom: 4px;
`;

const ProductCategoryPill = styled.div`
  display: inline-block;
  padding: 4px 8px;
  background: #f0f4ff;
  color: #635bff;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
`;

const ProductDetails = styled.div`
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #e6ebf1;
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
  color: #6b7280;
`;

const DetailValue = styled.span`
  color: #0a2540;
  font-weight: 500;
`;

const PriceValue = styled.span`
  color: #059669;
  font-weight: 600;
  font-size: 16px;
`;

const StockBadge = styled.span<{ status: 'ok' | 'low' | 'out' }>`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  ${(props) =>
    props.status === 'out'
      ? `background: #FEE2E2; color: #DC2626;`
      : props.status === 'low'
        ? `background: #FEF3C7; color: #B45309;`
        : `background: #D1FAE5; color: #059669;`}
`;

const CardSpacer = styled.div`
  flex: 1;
  min-height: 12px;
`;

const ProductActions = styled.div`
  display: flex;
  gap: 8px;
  padding-top: 12px;
  border-top: 1px solid #e6ebf1;
`;

const ActionButton = styled.button<{ variant?: 'danger' }>`
  flex: 1;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid ${(props) => (props.variant === 'danger' ? '#FEE2E2' : '#C7CED6')};
  background: ${(props) => (props.variant === 'danger' ? '#FEF2F2' : '#F9FAFB')};
  color: ${(props) => (props.variant === 'danger' ? '#DC2626' : '#1F2937')};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${(props) => (props.variant === 'danger' ? '#FEE2E2' : '#F1F4F8')};
    border-color: ${(props) => (props.variant === 'danger' ? '#FECACA' : '#6B7280')};
  }
`;

const ToggleButton = styled.button<{ isActive: boolean }>`
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid ${(props) => (props.isActive ? '#D1FAE5' : '#FEE2E2')};
  background: ${(props) => (props.isActive ? '#ECFDF5' : '#FEF2F2')};
  color: ${(props) => (props.isActive ? '#059669' : '#DC2626')};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background: ${(props) => (props.isActive ? '#D1FAE5' : '#FEE2E2')};
  }
`;

const EmptyTitle = styled.h4`
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px 0;
`;

const EmptyDescription = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 0 0 20px 0;
`;

const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 8px;
`;

const OptionBadge = styled.span`
  display: inline-block;
  padding: 2px 8px;
  background: #e5e7eb;
  color: #1F2937;
  border-radius: 4px;
  font-size: 11px;
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
  background: #f9fafb;
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
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;

  &:hover {
    border-color: #635bff;
  }
`;

const ErrorBanner = styled.div`
  margin-top: 16px;
  padding: 12px 16px;
  background: #fef2f2;
  border: 1px solid #fca5a5;
  border-radius: 8px;
  color: #dc2626;
  font-size: 14px;
`;

const PlanLimitBanner = styled.div`
  margin-top: 16px;
  padding: 12px 16px;
  background: #fffbeb;
  border: 1px solid #fcd34d;
  border-radius: 8px;
  color: #92400e;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

const UpgradeLink = styled.button`
  background: #f59e0b;
  color: white;
  border: none;
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #d97706;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 24px;
  padding: 16px 0;
`;

const PageButton = styled.button<{ active?: boolean }>`
  padding: 8px 14px;
  border-radius: 6px;
  border: 1px solid ${(props) => (props.active ? '#635BFF' : '#C7CED6')};
  background: ${(props) => (props.active ? '#635BFF' : 'white')};
  color: ${(props) => (props.active ? 'white' : '#1F2937')};
  font-size: 13px;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    border-color: #635bff;
  }
`;

const UNIT_OPTIONS = [
  { value: 'kg', label: 'kg' },
  { value: 'g', label: 'g' },
  { value: 'L', label: 'L' },
  { value: 'ml', label: 'ml' },
  { value: 'piece', label: 'piece' },
  { value: 'pack', label: 'pack' },
  { value: 'can', label: 'can' },
  { value: 'bottle', label: 'bottle' },
  { value: 'box', label: 'box' },
  { value: 'carton', label: 'carton' }
];

const PAGE_SIZE = 50;

const SupplierProductsTab: React.FC<Props> = ({
  onCountChange,
  categoryRefreshKey,
  optionRefreshKey
}) => {
  const { t } = useTranslation('supplier');
  const navigate = useNavigate();

  const [products, setProducts] = useState<SupplierProduct[]>([]);
  const [categories, setCategories] = useState<SupplierProductCategory[]>([]);
  const [optionGroups, setOptionGroups] = useState<SupplierProductOptionGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('newest');
  const [appliedSearch, setAppliedSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<SupplierProduct | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<SupplierProduct | null>(null);

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
    low_stock_threshold: '0',
    lead_time_days: '0',
    option_group_ids: [] as number[]
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [planLimit, setPlanLimit] = useState<PlanLimitError | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Debounce search
  useEffect(() => {
    const handle = setTimeout(() => {
      setAppliedSearch(searchTerm);
      setPage(1);
    }, 300);
    return () => clearTimeout(handle);
  }, [searchTerm]);

  const fetchProducts = useCallback(async () => {
    try {
      const token = getAuthToken();
      const params = new URLSearchParams();
      if (categoryFilter !== 'all') params.append('category_id', categoryFilter);
      if (activeFilter !== 'all') params.append('active', activeFilter === 'active' ? 'true' : 'false');
      if (appliedSearch.trim()) params.append('search', appliedSearch.trim());
      params.append('page', String(page));
      params.append('limit', String(PAGE_SIZE));

      const response = await fetch(`/api/supplier-products?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();

      if (data.success) {
        setProducts(data.data || []);
        const pg = data.pagination || {};
        setTotalCount(pg.total || (data.data || []).length);
        setTotalPages(pg.total_pages || 1);
        onCountChange(pg.total || (data.data || []).length);
      }
    } catch (error) {
      console.error('Failed to fetch supplier products:', error);
    }
  }, [appliedSearch, categoryFilter, activeFilter, page, onCountChange]);

  const fetchCategories = useCallback(async () => {
    try {
      const token = getAuthToken();
      const response = await fetch('/api/supplier-product-categories', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) setCategories(data.data || []);
    } catch (error) {
      console.error('Failed to fetch supplier categories:', error);
    }
  }, []);

  const fetchOptionGroups = useCallback(async () => {
    try {
      const token = getAuthToken();
      const response = await fetch('/api/supplier-product-option-groups', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) setOptionGroups(data.data || []);
    } catch (error) {
      console.error('Failed to fetch supplier option groups:', error);
    }
  }, []);

  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      await Promise.all([fetchProducts(), fetchCategories(), fetchOptionGroups()]);
      setLoading(false);
    };
    loadAll();
  }, [fetchProducts, fetchCategories, fetchOptionGroups]);

  useEffect(() => {
    if (categoryRefreshKey !== undefined) fetchCategories();
  }, [categoryRefreshKey, fetchCategories]);

  useEffect(() => {
    if (optionRefreshKey !== undefined) fetchOptionGroups();
  }, [optionRefreshKey, fetchOptionGroups]);

  const fetchProductDetail = async (productId: number): Promise<SupplierProduct | null> => {
    try {
      const token = getAuthToken();
      const response = await fetch(`/api/supplier-products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) return data.data;
    } catch (error) {
      console.error('Failed to fetch product detail:', error);
    }
    return null;
  };

  const handleOpenModal = async (product?: SupplierProduct) => {
    setFormError(null);
    if (product) {
      // Refetch full detail to get optionGroups
      const detail = (await fetchProductDetail(product.id)) || product;
      setEditingProduct(detail);
      setFormData({
        name: detail.name,
        description: detail.description || '',
        sku: detail.sku || '',
        unit: detail.unit || '',
        base_quantity: (detail.base_quantity ?? 1).toString(),
        unit_price: detail.unit_price.toString(),
        min_order_quantity: detail.min_order_quantity.toString(),
        category_id: detail.category_id?.toString() || '',
        image_url: detail.image_url || '',
        emoji: detail.emoji || '',
        is_active: detail.is_active,
        low_stock_threshold: (detail.low_stock_threshold ?? 0).toString(),
        lead_time_days: (detail.lead_time_days ?? 0).toString(),
        option_group_ids: detail.optionGroups?.map((og) => og.id) || []
      });
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
        low_stock_threshold: '0',
        lead_time_days: '0',
        option_group_ids: []
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setFormError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setFormError(null);

    if (!formData.name.trim()) {
      setFormError('Product name is required');
      return;
    }
    const unitPrice = parseFloat(formData.unit_price);
    if (!Number.isFinite(unitPrice) || unitPrice < 0) {
      setFormError('Unit price must be a non-negative number');
      return;
    }

    setIsSubmitting(true);

    try {
      const token = getAuthToken();
      const method = editingProduct ? 'PUT' : 'POST';
      const url = editingProduct
        ? `/api/supplier-products/${editingProduct.id}`
        : '/api/supplier-products';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          description: formData.description.trim() || null,
          sku: formData.sku.trim() || undefined,
          unit: formData.unit || null,
          base_quantity: parseFloat(formData.base_quantity) || 1,
          unit_price: unitPrice,
          min_order_quantity: parseInt(formData.min_order_quantity, 10) || 1,
          category_id: formData.category_id ? parseInt(formData.category_id, 10) : null,
          image_url: formData.image_url || null,
          emoji: formData.emoji || null,
          is_active: formData.is_active,
          low_stock_threshold: parseFloat(formData.low_stock_threshold) || 0,
          lead_time_days: parseInt(formData.lead_time_days, 10) || 0,
          option_group_ids: formData.option_group_ids
        })
      });

      const data = await response.json();

      if (data.success) {
        handleCloseModal();
        await fetchProducts();
      } else if (data.code === 'PLAN_LIMIT_REACHED') {
        setFormError(
          data.message ||
            t('products.planLimitReached', 'Product limit reached for your plan. Please upgrade.')
        );
      } else {
        setFormError(data.message || 'Failed to save product');
      }
    } catch (error) {
      console.error('Failed to save product:', error);
      setFormError('Failed to save product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyProduct = async (product: SupplierProduct, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const token = getAuthToken();
      const response = await fetch(`/api/supplier-products/${product.id}/copy`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        await fetchProducts();
      } else if (data.code === 'PLAN_LIMIT_REACHED') {
        setPlanLimit({
          message:
            data.message ||
            t('products.planLimitReached', 'Product limit reached for your plan. Please upgrade.'),
          current: data.current,
          limit: data.limit
        });
      }
    } catch (error) {
      console.error('Failed to copy product:', error);
    }
  };

  const handleToggleActive = async (product: SupplierProduct, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const token = getAuthToken();
      const response = await fetch(`/api/supplier-products/${product.id}/toggle-active`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        await fetchProducts();
      }
    } catch (error) {
      console.error('Failed to toggle product:', error);
    }
  };

  const handleDeleteClick = (product: SupplierProduct, e: React.MouseEvent) => {
    e.stopPropagation();
    setProductToDelete(product);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;
    try {
      const token = getAuthToken();
      const response = await fetch(`/api/supplier-products/${productToDelete.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setDeleteModalOpen(false);
        setProductToDelete(null);
        await fetchProducts();
      }
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  const handleOptionGroupToggle = (ogId: number) => {
    setFormData((prev) => ({
      ...prev,
      option_group_ids: prev.option_group_ids.includes(ogId)
        ? prev.option_group_ids.filter((id) => id !== ogId)
        : [...prev.option_group_ids, ogId]
    }));
  };

  const stockStatus = (product: SupplierProduct): 'ok' | 'low' | 'out' => {
    if (product.current_stock <= 0) return 'out';
    if (product.low_stock_threshold > 0 && product.current_stock <= product.low_stock_threshold)
      return 'low';
    return 'ok';
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#4B5563' }}>
        Loading products...
      </div>
    );
  }

  return (
    <div>
      {planLimit && (
        <PlanLimitBanner>
          <span>
            {planLimit.message}
            {planLimit.current !== undefined && planLimit.limit !== undefined && (
              <strong style={{ marginLeft: 8 }}>
                ({planLimit.current}/{planLimit.limit})
              </strong>
            )}
          </span>
          <UpgradeLink onClick={() => navigate('/pos/profile?tab=subscription')}>
            Upgrade Plan
          </UpgradeLink>
        </PlanLimitBanner>
      )}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginTop: '16px',
          marginBottom: '24px'
        }}
      >
        <FilterBar style={{ marginBottom: 0 }}>
          <SearchInput
            type="text"
            placeholder={t('products.searchPlaceholder', 'Search products...')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FilterSelect
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setPage(1);
            }}
          >
            <option value="all">{t('products.categoryFilter', 'All Categories')}</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id.toString()}>
                {cat.emoji ? `${cat.emoji} ${cat.name}` : cat.name}
              </option>
            ))}
          </FilterSelect>
          <FilterSelect
            value={activeFilter}
            onChange={(e) => {
              setActiveFilter(e.target.value as 'all' | 'active' | 'inactive');
              setPage(1);
            }}
          >
            <option value="all">All Status</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </FilterSelect>
          <SortDropdown value={sortKey} onChange={setSortKey} />
        </FilterBar>
        <ThemedButton onClick={() => handleOpenModal()} style={{ flexShrink: 0 }}>
          {t('products.addProduct', 'Add Product')}
        </ThemedButton>
      </div>

      {products.length === 0 ? (
        <EmptyState>
          <EmptyTitle>
            {appliedSearch || categoryFilter !== 'all' || activeFilter !== 'all'
              ? 'No products found'
              : 'No products yet'}
          </EmptyTitle>
          <EmptyDescription>
            {appliedSearch || categoryFilter !== 'all' || activeFilter !== 'all'
              ? 'Try adjusting your search or filter criteria.'
              : t(
                  'products.noProducts',
                  'No products yet. Click "Add Product" to start building your catalog.'
                )}
          </EmptyDescription>
          {!appliedSearch && categoryFilter === 'all' && activeFilter === 'all' && (
            <ThemedButton onClick={() => handleOpenModal()}>
              {t('products.addProduct', 'Add Product')}
            </ThemedButton>
          )}
        </EmptyState>
      ) : (
        <>
          <ProductsGrid>
            {sortItems(products, sortKey).map((product) => (
              <ProductCard
                key={product.id}
                isActive={product.is_active}
                onClick={() => handleOpenModal(product)}
              >
                <ProductHeader>
                  <ProductImage src={product.image_url}>
                    {!product.image_url && (product.emoji || 'PKG')}
                  </ProductImage>
                  <ProductInfoBlock>
                    <ProductName>{product.name}</ProductName>
                    {product.sku && <ProductSku>SKU: {product.sku}</ProductSku>}
                    {product.category && (
                      <ProductCategoryPill>
                        {product.category.emoji
                          ? `${product.category.emoji} ${product.category.name}`
                          : product.category.name}
                      </ProductCategoryPill>
                    )}
                  </ProductInfoBlock>
                </ProductHeader>

                <ProductDetails>
                  <DetailRow>
                    <DetailLabel>{t('products.fields.unitPrice', 'Unit Price')}</DetailLabel>
                    <PriceValue>RM {(Number(product.unit_price) || 0).toFixed(2)}</PriceValue>
                  </DetailRow>
                  {product.unit && (
                    <DetailRow>
                      <DetailLabel>{t('products.fields.unit', 'Unit')}</DetailLabel>
                      <DetailValue>
                        {product.base_quantity} {product.unit}
                      </DetailValue>
                    </DetailRow>
                  )}
                  <DetailRow>
                    <DetailLabel>
                      {t('products.fields.minOrderQuantity', 'Min Order')}
                    </DetailLabel>
                    <DetailValue>{product.min_order_quantity}</DetailValue>
                  </DetailRow>
                  <DetailRow>
                    <DetailLabel>{t('products.fields.currentStock', 'Stock')}</DetailLabel>
                    <DetailValue>
                      {product.current_stock}{' '}
                      <StockBadge status={stockStatus(product)}>
                        {stockStatus(product) === 'out'
                          ? 'OUT'
                          : stockStatus(product) === 'low'
                            ? 'LOW'
                            : 'OK'}
                      </StockBadge>
                    </DetailValue>
                  </DetailRow>
                  {product.lead_time_days > 0 && (
                    <DetailRow>
                      <DetailLabel>
                        {t('products.fields.leadTimeDays', 'Lead Time')}
                      </DetailLabel>
                      <DetailValue>{product.lead_time_days}d</DetailValue>
                    </DetailRow>
                  )}
                </ProductDetails>

                {product.optionGroups && product.optionGroups.length > 0 && (
                  <BadgeContainer>
                    {product.optionGroups.map((og) => (
                      <OptionBadge key={og.id}>{og.name}</OptionBadge>
                    ))}
                  </BadgeContainer>
                )}

                <CardSpacer />
                <ProductActions onClick={(e) => e.stopPropagation()}>
                  <ActionButton onClick={() => handleOpenModal(product)}>Edit</ActionButton>
                  <ActionButton onClick={(e) => handleCopyProduct(product, e)}>Copy</ActionButton>
                  <ToggleButton
                    isActive={product.is_active}
                    onClick={(e) => handleToggleActive(product, e)}
                  >
                    {product.is_active ? 'Active' : 'Inactive'}
                  </ToggleButton>
                  <ActionButton variant="danger" onClick={(e) => handleDeleteClick(product, e)}>
                    Delete
                  </ActionButton>
                </ProductActions>
              </ProductCard>
            ))}
          </ProductsGrid>

          {totalPages > 1 && (
            <Pagination>
              <PageButton onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1}>
                Prev
              </PageButton>
              <span style={{ fontSize: '13px', color: '#4B5563' }}>
                Page {page} of {totalPages} · {totalCount} total
              </span>
              <PageButton
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
              >
                Next
              </PageButton>
            </Pagination>
          )}
        </>
      )}

      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={handleCloseModal}
          title={editingProduct ? 'Edit Product' : t('products.addProduct', 'Add Product')}
          maxWidth="700px"
        >
          <form onSubmit={handleSubmit}>
            {formError && <ErrorBanner style={{ marginTop: 0, marginBottom: 16 }}>{formError}</ErrorBanner>}

            <FormGrid2>
              <UIFormGroup>
                <FormLabel>{t('products.fields.name', 'Product Name')} *</FormLabel>
                <FormInput
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Product name"
                  required
                />
              </UIFormGroup>

              <UIFormGroup>
                <FormLabel>{t('products.fields.sku', 'SKU')}</FormLabel>
                <FormInput
                  type="text"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  placeholder="Auto-generated if empty"
                />
              </UIFormGroup>
            </FormGrid2>

            <UIFormGroup>
              <FormLabel>{t('products.fields.category', 'Category')}</FormLabel>
              <FormSelect
                value={formData.category_id}
                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
              >
                <option value="">No category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id.toString()}>
                    {cat.emoji ? `${cat.emoji} ${cat.name}` : cat.name}
                  </option>
                ))}
              </FormSelect>
            </UIFormGroup>

            <UIFormGroup>
              <FormLabel>Description</FormLabel>
              <FormTextArea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Product description"
                rows={2}
              />
            </UIFormGroup>

            <FormGrid4>
              <UIFormGroup>
                <FormLabel>{t('products.fields.unitPrice', 'Unit Price')} (RM) *</FormLabel>
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
                <FormLabel>{t('products.fields.baseQuantity', 'Base Qty')}</FormLabel>
                <FormInput
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={formData.base_quantity}
                  onChange={(e) => setFormData({ ...formData, base_quantity: e.target.value })}
                  placeholder="1"
                />
              </UIFormGroup>

              <UIFormGroup>
                <FormLabel>{t('products.fields.unit', 'Unit')}</FormLabel>
                <FormSelect
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                >
                  <option value="">Select unit</option>
                  {UNIT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </FormSelect>
              </UIFormGroup>

              <UIFormGroup>
                <FormLabel>{t('products.fields.minOrderQuantity', 'Min Order')}</FormLabel>
                <FormInput
                  type="number"
                  min="1"
                  value={formData.min_order_quantity}
                  onChange={(e) =>
                    setFormData({ ...formData, min_order_quantity: e.target.value })
                  }
                />
              </UIFormGroup>
            </FormGrid4>

            <FormGrid2>
              <UIFormGroup>
                <FormLabel>
                  {t('products.fields.lowStockThreshold', 'Low Stock Threshold')}
                </FormLabel>
                <FormInput
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.low_stock_threshold}
                  onChange={(e) =>
                    setFormData({ ...formData, low_stock_threshold: e.target.value })
                  }
                />
              </UIFormGroup>

              <UIFormGroup>
                <FormLabel>{t('products.fields.leadTimeDays', 'Lead Time (days)')}</FormLabel>
                <FormInput
                  type="number"
                  min="0"
                  value={formData.lead_time_days}
                  onChange={(e) => setFormData({ ...formData, lead_time_days: e.target.value })}
                />
              </UIFormGroup>
            </FormGrid2>

            <UIFormGroup>
              <FormLabel>{t('products.fields.image', 'Product Image')}</FormLabel>
              <ImageUploadDropzone
                value={formData.image_url}
                onChange={(url) => setFormData({ ...formData, image_url: url || '' })}
                label=""
                helpText="Upload a product image (max 2MB)"
              />
            </UIFormGroup>

            <UIFormGroup>
              <FormLabel>{t('products.optionGroups', 'Option Groups')}</FormLabel>
              {optionGroups.length > 0 ? (
                <CheckboxGroup>
                  {optionGroups.map((og) => (
                    <CheckboxItem key={og.id}>
                      <input
                        type="checkbox"
                        checked={formData.option_group_ids.includes(og.id)}
                        onChange={() => handleOptionGroupToggle(og.id)}
                      />
                      <span>
                        {og.name} {og.is_required ? '(Required)' : ''}
                      </span>
                    </CheckboxItem>
                  ))}
                </CheckboxGroup>
              ) : (
                <div
                  style={{
                    padding: '12px',
                    background: '#F9FAFB',
                    borderRadius: '8px',
                    color: '#4B5563',
                    fontSize: '13px'
                  }}
                >
                  No option groups available. Create option groups in the Options tab first.
                </div>
              )}
            </UIFormGroup>

            <UIFormGroup style={{ marginBottom: 0 }}>
              <CheckboxLabel>
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                />
                {t('products.fields.isActive', 'Active')}
              </CheckboxLabel>
            </UIFormGroup>

            <div
              style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'flex-end',
                marginTop: '24px'
              }}
            >
              <ModalButton type="button" onClick={handleCloseModal} disabled={isSubmitting}>
                Cancel
              </ModalButton>
              <ModalButton type="submit" variant="primary" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : editingProduct ? 'Update' : 'Create'}
              </ModalButton>
            </div>

            {formError && formError.includes('limit') && (
              <PlanLimitBanner>
                <span>{formError}</span>
                <UpgradeLink
                  type="button"
                  onClick={() => navigate('/pos/profile?tab=subscription')}
                >
                  Upgrade Plan
                </UpgradeLink>
              </PlanLimitBanner>
            )}
          </form>
        </Modal>
      )}

      <ConfirmModal
        isOpen={deleteModalOpen}
        onCancel={() => {
          setDeleteModalOpen(false);
          setProductToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Product"
        message={
          productToDelete
            ? `Are you sure you want to delete "${productToDelete.name}"? This action cannot be undone.`
            : t('products.deleteConfirm', 'Are you sure you want to delete this product?')
        }
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default SupplierProductsTab;
