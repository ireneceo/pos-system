import React, { useState, useEffect, useCallback } from 'react';
import { parseMinOrderQty } from '../../utils/unitConversion';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import {
  Modal as CommonModal, ModalButton,
  FormGroup as UIFormGroup, FormLabel, FormInput, FormSelect, FormTextArea,
  EmptyState
} from '../../components/UI';
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import SortDropdown, { SortKey, sortItems } from '../../components/Common/SortDropdown';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import ConfirmModal from '../../components/ConfirmModal';
import { getAuthToken } from '../../utils/auth';

interface Category {
  id: number;
  name: string;
  emoji: string | null;
}

interface OptionGroup {
  id: number;
  name: string;
  is_required: boolean;
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
  after_meal?: boolean;
  current_stock: number;
  low_stock_threshold: number;
  lead_time_days: number;
  optionGroups?: OptionGroup[];
  sort_order: number;
}

interface FoodcourtProductsTabProps {
  onCountChange: (n: number) => void;
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
  border: 1px solid #C7CED6;
  padding: 20px;
  opacity: ${p => p.isActive ? 1 : 0.6};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  transition: all 0.2s;

  &:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.08); transform: translateY(-2px); border-color: #635BFF; }
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
  background: ${p => p.src ? `url(${p.src}) center/cover` : '#F1F4F8'};
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
  margin-bottom: 8px;
  font-size: 14px;
  &:last-child { margin-bottom: 0; }
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

const ActionBtn = styled.button<{ variant?: 'danger' }>`
  flex: 1;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid ${p => p.variant === 'danger' ? '#FEE2E2' : '#C7CED6'};
  background: ${p => p.variant === 'danger' ? '#FEF2F2' : '#F9FAFB'};
  color: ${p => p.variant === 'danger' ? '#DC2626' : '#1F2937'};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: ${p => p.variant === 'danger' ? '#FEE2E2' : '#F1F4F8'};
  }
`;

const ToggleBtn = styled.button<{ isActive: boolean }>`
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid ${p => p.isActive ? '#D1FAE5' : '#FEE2E2'};
  background: ${p => p.isActive ? '#ECFDF5' : '#FEF2F2'};
  color: ${p => p.isActive ? '#059669' : '#DC2626'};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
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
`;

const EmojiPicker = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 4px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
  background: #F9FAFB;
  border-radius: 8px;
`;

const EmojiOption = styled.button<{ selected?: boolean }>`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 4px;
  background: ${p => p.selected ? '#C7CED6' : 'white'};
  border: 1px solid ${p => p.selected ? '#6B7280' : '#C7CED6'};
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ErrorBox = styled.div`
  margin-top: 12px;
  padding: 10px 14px;
  background: #FEF2F2;
  border: 1px solid #FCA5A5;
  border-radius: 8px;
  color: #DC2626;
  font-size: 13px;
`;

const EMOJI_OPTIONS = [
  '🍔','🍟','🌭','🍕','🥪','🌮','🌯','🥙','🍝','🍜',
  '🍣','🍤','🍱','🍙','🍘','🍡','🥟','🥠','🥡','🍢',
  '🍰','🧁','🍪','🍩','🍫','🍬','🍭','🥐','🍞','🥖',
  '🥗','🌶️','🥒','🍅','🍆','🥕','🌽','🥔','🍠','🍵',
  '☕','🥤','🧃','🍺','🍷','🍶','🥂','🍹','🥛','🧋'
];

const UNIT_OPTIONS = [
  { value: 'piece', label: 'piece' },
  { value: 'pack', label: 'pack' },
  { value: 'kg', label: 'kg' },
  { value: 'g', label: 'g' },
  { value: 'L', label: 'L' },
  { value: 'ml', label: 'ml' },
  { value: 'box', label: 'box' },
  { value: 'serving', label: 'serving' }
];

const FoodcourtProductsTab: React.FC<FoodcourtProductsTabProps> = ({
  onCountChange, categoryRefreshKey, optionRefreshKey
}) => {
  const { t } = useTranslation(['foodcourt', 'common']);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [optionGroups, setOptionGroups] = useState<OptionGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('newest');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [toDelete, setToDelete] = useState<Product | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '', description: '', sku: '', unit: '',
    base_quantity: '1', unit_price: '', min_order_quantity: '1',
    category_id: '', image_url: '', emoji: '', is_active: true, after_meal: false,
    current_stock: '0', low_stock_threshold: '0', lead_time_days: '0',
    option_group_ids: [] as number[]
  });

  const fetchProducts = useCallback(async () => {
    try {
      const token = getAuthToken();
      const res = await fetch('/api/foodcourt-products', { headers: { 'Authorization': `Bearer ${token}` } });
      const data = await res.json();
      if (data.success) {
        setProducts(data.data || []);
        onCountChange((data.data || []).length);
      }
    } catch (err) { console.error(err); }
  }, [onCountChange]);

  const fetchCategories = useCallback(async () => {
    try {
      const token = getAuthToken();
      const res = await fetch('/api/foodcourt-product-categories', { headers: { 'Authorization': `Bearer ${token}` } });
      const data = await res.json();
      if (data.success) setCategories(data.data || []);
    } catch (err) { console.error(err); }
  }, []);

  const fetchOptionGroups = useCallback(async () => {
    try {
      const token = getAuthToken();
      const res = await fetch('/api/foodcourt-product-option-groups', { headers: { 'Authorization': `Bearer ${token}` } });
      const data = await res.json();
      if (data.success) setOptionGroups(data.data || []);
    } catch (err) { console.error(err); }
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await Promise.all([fetchProducts(), fetchCategories(), fetchOptionGroups()]);
      setLoading(false);
    };
    load();
  }, [fetchProducts, fetchCategories, fetchOptionGroups]);

  useEffect(() => { if (categoryRefreshKey !== undefined) fetchCategories(); }, [categoryRefreshKey, fetchCategories]);
  useEffect(() => { if (optionRefreshKey !== undefined) fetchOptionGroups(); }, [optionRefreshKey, fetchOptionGroups]);

  const openModal = (product?: Product) => {
    setFormError(null);
    if (product) {
      setEditing(product);
      setFormData({
        name: product.name,
        description: product.description || '',
        sku: product.sku || '',
        unit: product.unit || '',
        base_quantity: (product.base_quantity || 1).toString(),
        unit_price: product.unit_price?.toString() || '',
        min_order_quantity: (product.min_order_quantity || 1).toString(),
        category_id: product.category_id?.toString() || '',
        image_url: product.image_url || '',
        emoji: product.emoji || '',
        is_active: product.is_active,
        after_meal: !!product.after_meal,
        current_stock: (product.current_stock || 0).toString(),
        low_stock_threshold: (product.low_stock_threshold || 0).toString(),
        lead_time_days: (product.lead_time_days || 0).toString(),
        option_group_ids: product.optionGroups?.map(og => og.id) || []
      });
    } else {
      setEditing(null);
      setFormData({
        name: '', description: '', sku: '', unit: '',
        base_quantity: '1', unit_price: '', min_order_quantity: '1',
        category_id: categories[0]?.id?.toString() || '',
        image_url: '', emoji: '', is_active: true, after_meal: false,
        current_stock: '0', low_stock_threshold: '0', lead_time_days: '0',
        option_group_ids: []
      });
    }
    setShowModal(true);
  };

  const closeModal = () => { setShowModal(false); setEditing(null); setFormError(null); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setFormError(null);

    if (!formData.name.trim()) { setFormError(t('common:required', 'Name is required')); return; }
    if (!formData.unit) { setFormError(t('common:required', 'Unit is required')); return; }

    setSubmitting(true);
    try {
      const token = getAuthToken();
      const url = editing ? `/api/foodcourt-products/${editing.id}` : '/api/foodcourt-products';
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          name: formData.name.trim(),
          description: formData.description.trim() || null,
          sku: formData.sku.trim() || null,
          unit: formData.unit || null,
          base_quantity: parseFloat(formData.base_quantity) || 1,
          unit_price: parseFloat(formData.unit_price) || 0,
          min_order_quantity: parseMinOrderQty(formData.min_order_quantity),
          category_id: formData.category_id ? parseInt(formData.category_id) : null,
          image_url: formData.image_url || null,
          emoji: formData.emoji || null,
          is_active: formData.is_active,
          after_meal: formData.after_meal,
          current_stock: parseFloat(formData.current_stock) || 0,
          low_stock_threshold: parseFloat(formData.low_stock_threshold) || 0,
          lead_time_days: parseInt(formData.lead_time_days) || 0,
          option_group_ids: formData.option_group_ids
        })
      });
      const data = await res.json();
      if (!res.ok || !data.success) { setFormError(data.message || 'Failed to save'); return; }
      closeModal();
      fetchProducts();
    } catch (err) {
      console.error(err);
      setFormError('Failed to save product');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopy = async (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/foodcourt-products/${product.id}/copy`, {
        method: 'POST', headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) fetchProducts();
    } catch (err) { console.error(err); }
  };

  const handleToggle = async (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/foodcourt-products/${product.id}/toggle-active`, {
        method: 'PUT', headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) fetchProducts();
    } catch (err) { console.error(err); }
  };

  const handleDeleteClick = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    setToDelete(product);
    setDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!toDelete) return;
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/foodcourt-products/${toDelete.id}`, {
        method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setDeleteOpen(false);
        setToDelete(null);
        fetchProducts();
      }
    } catch (err) { console.error(err); }
  };

  const toggleOptionGroup = (id: number) => {
    setFormData(prev => ({
      ...prev,
      option_group_ids: prev.option_group_ids.includes(id)
        ? prev.option_group_ids.filter(x => x !== id)
        : [...prev.option_group_ids, id]
    }));
  };

  const filtered = sortItems(products.filter(p => {
    const ms = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.sku && p.sku.toLowerCase().includes(searchTerm.toLowerCase()));
    const mc = categoryFilter === 'all' || p.category_id?.toString() === categoryFilter;
    return ms && mc;
  }), sortKey);

  if (loading) {
    return <div style={{ padding: 40, textAlign: 'center', color: '#4B5563' }}>{t('common:loading', 'Loading...')}</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <FilterBar style={{ marginBottom: 0 }}>
          <SearchInput
            type="text"
            placeholder={t('common:search', 'Search') as string}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FilterSelect value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="all">{t('common:allCategories', 'All Categories')}</option>
            {categories.map(c => (
              <option key={c.id} value={c.id.toString()}>
                {c.emoji ? `${c.emoji} ` : ''}{c.name}
              </option>
            ))}
          </FilterSelect>
          <SortDropdown value={sortKey} onChange={setSortKey} />
        </FilterBar>
        <ThemedButton onClick={() => openModal()} style={{ flexShrink: 0 }}>
          {t('foodcourt:products.addProduct', 'Add Product')}
        </ThemedButton>
      </div>

      {filtered.length === 0 ? (
        <EmptyState>
          <h4 style={{ fontSize: 18, fontWeight: 600, color: '#1F2937', margin: '0 0 8px 0' }}>
            {searchTerm || categoryFilter !== 'all'
              ? t('common:noResults', 'No products found')
              : t('foodcourt:products.noProducts', 'No products yet')}
          </h4>
          <p style={{ fontSize: 14, color: '#4B5563', margin: '0 0 20px 0' }}>
            {searchTerm || categoryFilter !== 'all'
              ? t('common:adjustFilters', 'Try adjusting your search or filter criteria.')
              : t('foodcourt:products.startAdding', 'Start by adding your first product.')}
          </p>
          {!searchTerm && categoryFilter === 'all' && (
            <ThemedButton onClick={() => openModal()}>
              {t('foodcourt:products.addProduct', 'Add Product')}
            </ThemedButton>
          )}
        </EmptyState>
      ) : (
        <ProductsGrid>
          {filtered.map(product => (
            <ProductCard key={product.id} isActive={product.is_active} onClick={() => openModal(product)}>
              <ProductHeader>
                <ProductImage src={product.image_url}>
                  {!product.image_url && (product.emoji || '🍽️')}
                </ProductImage>
                <ProductInfo>
                  <ProductName>{product.name}</ProductName>
                  {product.sku && <ProductSku>SKU: {product.sku}</ProductSku>}
                  {product.category && (
                    <ProductCategory>
                      {product.category.emoji} {product.category.name}
                    </ProductCategory>
                  )}
                </ProductInfo>
              </ProductHeader>

              <ProductDetails>
                <DetailRow>
                  <DetailLabel>{t('common:price', 'Unit Price')}</DetailLabel>
                  <PriceValue>RM {(Number(product.unit_price) || 0).toFixed(2)}</PriceValue>
                </DetailRow>
                {product.unit && (
                  <DetailRow>
                    <DetailLabel>{t('common:unit', 'Unit')}</DetailLabel>
                    <DetailValue>{product.unit}</DetailValue>
                  </DetailRow>
                )}
                <DetailRow>
                  <DetailLabel>{t('common:stock', 'Stock')}</DetailLabel>
                  <DetailValue>{Number(product.current_stock || 0).toFixed(2)}</DetailValue>
                </DetailRow>
              </ProductDetails>

              <CardSpacer />
              <ProductActions onClick={(e) => e.stopPropagation()}>
                <ActionBtn onClick={() => openModal(product)}>{t('common:edit', 'Edit')}</ActionBtn>
                <ActionBtn onClick={(e) => handleCopy(product, e)}>{t('common:copy', 'Copy')}</ActionBtn>
                <ToggleBtn isActive={product.is_active} onClick={(e) => handleToggle(product, e)}>
                  {product.is_active ? t('common:active', 'Active') : t('common:inactive', 'Inactive')}
                </ToggleBtn>
                <ActionBtn variant="danger" onClick={(e) => handleDeleteClick(product, e)}>
                  {t('common:delete', 'Delete')}
                </ActionBtn>
              </ProductActions>
            </ProductCard>
          ))}
        </ProductsGrid>
      )}

      {showModal && (
        <CommonModal
          isOpen={showModal}
          onClose={closeModal}
          title={editing
            ? t('foodcourt:products.editProduct', 'Edit Product') as string
            : t('foodcourt:products.addProduct', 'Add Product') as string}
          maxWidth="700px"
          footer={
            <>
              <ModalButton type="button" onClick={closeModal} disabled={submitting}>
                {t('common:cancel', 'Cancel')}
              </ModalButton>
              <ModalButton type="submit" form="fc-prod-form" variant="primary" disabled={submitting}>
                {submitting ? t('common:saving', 'Saving...') : (editing ? t('common:update', 'Update') : t('common:create', 'Create'))}
              </ModalButton>
            </>
          }
        >
          <form id="fc-prod-form" onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <UIFormGroup>
                <FormLabel>{t('common:name', 'Name')} *</FormLabel>
                <FormInput type="text" value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
              </UIFormGroup>
              <UIFormGroup>
                <FormLabel>SKU</FormLabel>
                <FormInput type="text" value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })} />
              </UIFormGroup>
            </div>

            <UIFormGroup>
              <FormLabel>{t('common:category', 'Category')}</FormLabel>
              <FormSelect value={formData.category_id}
                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}>
                <option value="">{t('common:noCategory', 'No category')}</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id.toString()}>{c.emoji} {c.name}</option>
                ))}
              </FormSelect>
            </UIFormGroup>

            <UIFormGroup>
              <FormLabel>{t('common:description', 'Description')}</FormLabel>
              <FormTextArea value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={2} />
            </UIFormGroup>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 16 }}>
              <UIFormGroup>
                <FormLabel>{t('common:price', 'Unit Price')} (RM) *</FormLabel>
                <FormInput type="number" step="0.01" min="0" value={formData.unit_price}
                  onChange={(e) => setFormData({ ...formData, unit_price: e.target.value })} required />
              </UIFormGroup>
              <UIFormGroup>
                <FormLabel>{t('common:baseQty', 'Base Qty')} *</FormLabel>
                <FormInput type="number" step="0.01" min="0.01" value={formData.base_quantity}
                  onChange={(e) => setFormData({ ...formData, base_quantity: e.target.value })} required />
              </UIFormGroup>
              <UIFormGroup>
                <FormLabel>{t('common:unit', 'Unit')} *</FormLabel>
                <FormSelect value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })} required>
                  <option value="">{t('common:selectUnit', 'Select unit')}</option>
                  {UNIT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </FormSelect>
              </UIFormGroup>
              <UIFormGroup>
                <FormLabel>{t('common:minOrderQty', 'Min Order Qty')}</FormLabel>
                <FormInput type="number" min="1" value={formData.min_order_quantity}
                  onChange={(e) => setFormData({ ...formData, min_order_quantity: e.target.value })} />
              </UIFormGroup>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
              <UIFormGroup>
                <FormLabel>{t('common:currentStock', 'Current Stock')}</FormLabel>
                <FormInput type="number" step="0.01" min="0" value={formData.current_stock}
                  onChange={(e) => setFormData({ ...formData, current_stock: e.target.value })} />
              </UIFormGroup>
              <UIFormGroup>
                <FormLabel>{t('common:lowStockThreshold', 'Low Stock Threshold')}</FormLabel>
                <FormInput type="number" step="0.01" min="0" value={formData.low_stock_threshold}
                  onChange={(e) => setFormData({ ...formData, low_stock_threshold: e.target.value })} />
              </UIFormGroup>
              <UIFormGroup>
                <FormLabel>{t('common:leadTimeDays', 'Lead Time (days)')}</FormLabel>
                <FormInput type="number" min="0" value={formData.lead_time_days}
                  onChange={(e) => setFormData({ ...formData, lead_time_days: e.target.value })} />
              </UIFormGroup>
            </div>

            <UIFormGroup>
              <FormLabel>{t('common:emoji', 'Emoji')}</FormLabel>
              <EmojiPicker>
                {EMOJI_OPTIONS.map(em => (
                  <EmojiOption key={em} type="button" selected={formData.emoji === em}
                    onClick={() => setFormData({ ...formData, emoji: em })}>
                    {em}
                  </EmojiOption>
                ))}
              </EmojiPicker>
            </UIFormGroup>

            <UIFormGroup>
              <FormLabel>{t('foodcourt:products.optionGroups', 'Option Groups')}</FormLabel>
              {optionGroups.length > 0 ? (
                <CheckboxGroup>
                  {optionGroups.map(og => (
                    <CheckboxItem key={og.id}>
                      <input type="checkbox"
                        checked={formData.option_group_ids.includes(og.id)}
                        onChange={() => toggleOptionGroup(og.id)} />
                      <span>{og.name}{og.is_required ? ' *' : ''}</span>
                    </CheckboxItem>
                  ))}
                </CheckboxGroup>
              ) : (
                <div style={{ padding: 12, background: '#F9FAFB', borderRadius: 8, color: '#4B5563', fontSize: 13 }}>
                  {t('foodcourt:products.noOptionGroups', 'No option groups available. Create option groups in the Option Groups tab first.')}
                </div>
              )}
            </UIFormGroup>

            <UIFormGroup style={{ marginBottom: 0 }}>
              <CheckboxLabel>
                <input type="checkbox" checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })} />
                {t('common:active', 'Active')}
              </CheckboxLabel>
            </UIFormGroup>

            {/* 2026-06-16: 'After meal' 필드 제거 (Irene 데모 리포트) — 푸드코트 상품 폼엔 불필요. */}

            {formError && <ErrorBox>{formError}</ErrorBox>}
          </form>
        </CommonModal>
      )}

      <ConfirmModal
        isOpen={deleteOpen}
        onCancel={() => { setDeleteOpen(false); setToDelete(null); }}
        onConfirm={handleDeleteConfirm}
        title={t('foodcourt:products.deleteProduct', 'Delete Product') as string}
        message={`${t('common:deleteConfirm', 'Are you sure you want to delete')} "${toDelete?.name}"?`}
        confirmText={t('common:delete', 'Delete') as string}
        cancelText={t('common:cancel', 'Cancel') as string}
      />
    </div>
  );
};

export default FoodcourtProductsTab;
