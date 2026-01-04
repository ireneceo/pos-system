import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import { Modal, ModalButton, FormGroup as UIFormGroup, FormLabel, FormInput, FormSelect, FormTextArea } from '../../components/UI/Modal';
import ImageUploadDropzone from '../../components/common/ImageUploadDropzone';
import ConfirmModal from '../../components/ConfirmModal';
import SearchableSelect from '../../components/Common/SearchableSelect';

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
  is_active: boolean;
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
  border: 1px solid #E6EBF1;
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
  background: ${props => props.src ? `url(${props.src}) center/cover` : '#F3F4F6'};
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
`;

const ProductSku = styled.div`
  font-size: 12px;
  color: #6B7280;
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
  border-top: 1px solid #E6EBF1;
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
  color: #6B7280;
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

const ProductActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #E6EBF1;
`;

const ActionButton = styled.button<{ variant?: 'danger' }>`
  flex: 1;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid ${props => props.variant === 'danger' ? '#FEE2E2' : '#E6EBF1'};
  background: ${props => props.variant === 'danger' ? '#FEF2F2' : '#F9FAFB'};
  color: ${props => props.variant === 'danger' ? '#DC2626' : '#374151'};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.variant === 'danger' ? '#FEE2E2' : '#F3F4F6'};
    border-color: ${props => props.variant === 'danger' ? '#FECACA' : '#D1D5DB'};
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  margin-top: 24px;
`;

const EmptyTitle = styled.h4`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`;

const EmptyDescription = styled.p`
  font-size: 14px;
  color: #6B7280;
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
  background: ${props => props.color || '#E5E7EB'};
  color: #374151;
  border-radius: 4px;
  font-size: 11px;
`;

const BrandBadge = styled(Badge)`
  background: #DBEAFE;
  color: #1E40AF;
`;

const OptionBadge = styled(Badge)`
  background: #E5E7EB;
  color: #374151;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #374151;
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
  border: 1px solid #E5E7EB;
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
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [optionGroups, setOptionGroups] = useState<OptionGroup[]>([]);
  const [productRecipes, setProductRecipes] = useState<ProductRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [brandFilter, setBrandFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

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
    is_active: true,
    product_recipe_id: null as number | null,
    brand_ids: [] as number[],
    option_group_ids: [] as number[]
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const getToken = useCallback(() => localStorage.getItem('auth_token'), []);

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
        is_active: product.is_active,
        product_recipe_id: product.product_recipe_id || null,
        brand_ids: product.brands?.map(b => b.id) || [],
        option_group_ids: product.optionGroups?.map(og => og.id) || []
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
        is_active: true,
        product_recipe_id: null,
        brand_ids: [],
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
          is_active: formData.is_active,
          product_recipe_id: formData.product_recipe_id,
          brand_ids: formData.brand_ids,
          option_group_ids: formData.option_group_ids
        })
      });

      const data = await response.json();

      if (data.success) {
        handleCloseModal();
        fetchProducts();
      } else {
        setFormError(data.error || 'Failed to save product');
      }
    } catch (error) {
      console.error('Failed to save product:', error);
      setFormError('Failed to save product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
        alert(data.error || 'Failed to delete product');
      }
    } catch (error) {
      console.error('Failed to delete product:', error);
      alert('Failed to delete product');
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
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (product.sku && product.sku.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || product.category_id?.toString() === categoryFilter;
    const matchesBrand = brandFilter === 'all' || product.brands?.some(b => b.id.toString() === brandFilter);
    return matchesSearch && matchesCategory && matchesBrand;
  });

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#6B7280' }}>
        Loading products...
      </div>
    );
  }

  return (
    <div>
      <FilterBar>
        <SearchInput
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FilterSelect
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">All Categories</option>
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
          <option value="all">All Brands</option>
          {brands.map(brand => (
            <option key={brand.id} value={brand.id.toString()}>
              {brand.name}
            </option>
          ))}
        </FilterSelect>
        <ThemedButton onClick={() => handleOpenModal()}>
          Add Product
        </ThemedButton>
      </FilterBar>

      {filteredProducts.length === 0 ? (
        <EmptyState>
          <EmptyTitle>
            {searchTerm || categoryFilter !== 'all' || brandFilter !== 'all' ? 'No products found' : 'No products yet'}
          </EmptyTitle>
          <EmptyDescription>
            {searchTerm || categoryFilter !== 'all' || brandFilter !== 'all'
              ? 'Try adjusting your search or filter criteria.'
              : 'Start by adding your first product.'}
          </EmptyDescription>
          {!searchTerm && categoryFilter === 'all' && brandFilter === 'all' && (
            <ThemedButton onClick={() => handleOpenModal()}>Add Product</ThemedButton>
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
                  {!product.image_url && '📦'}
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
                  <DetailLabel>Unit Price</DetailLabel>
                  <PriceValue>RM {(Number(product.unit_price) || 0).toFixed(2)}</PriceValue>
                </DetailRow>
                {product.unit && (
                  <DetailRow>
                    <DetailLabel>Unit</DetailLabel>
                    <DetailValue>{product.unit}</DetailValue>
                  </DetailRow>
                )}
                <DetailRow>
                  <DetailLabel>Min Order</DetailLabel>
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

              <ProductActions onClick={(e) => e.stopPropagation()}>
                <ActionButton onClick={() => handleOpenModal(product)}>
                  Edit
                </ActionButton>
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
          title={editingProduct ? 'Edit Product' : 'Add Product'}
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
                <FormLabel>SKU</FormLabel>
                <FormInput
                  type="text"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  placeholder="Product code"
                />
              </UIFormGroup>
            </div>

            <UIFormGroup>
              <FormLabel>Category</FormLabel>
              <FormSelect
                value={formData.category_id}
                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
              >
                <option value="">No category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id.toString()}>
                    {cat.emoji} {cat.name}
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
                  <option value="">Select unit</option>
                  {unitOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </FormSelect>
              </UIFormGroup>

              <UIFormGroup>
                <FormLabel>Min Order Qty</FormLabel>
                <FormInput
                  type="number"
                  min="1"
                  value={formData.min_order_quantity}
                  onChange={(e) => setFormData({ ...formData, min_order_quantity: e.target.value })}
                />
              </UIFormGroup>
            </div>

            <UIFormGroup>
              <FormLabel>Product Image</FormLabel>
              <ImageUploadDropzone
                value={formData.image_url}
                onChange={(url) => setFormData({ ...formData, image_url: url || '' })}
                label=""
                helpText="Upload a product image (max 2MB)"
              />
            </UIFormGroup>

            <UIFormGroup>
              <FormLabel>Linked Brands</FormLabel>
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

            <UIFormGroup>
              <FormLabel>Option Groups</FormLabel>
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
                <div style={{ padding: '12px', background: '#F9FAFB', borderRadius: '8px', color: '#6B7280', fontSize: '13px' }}>
                  No option groups available. Create option groups in the Options tab first.
                </div>
              )}
            </UIFormGroup>

            <UIFormGroup>
              <FormLabel>Linked Product Recipe</FormLabel>
              <SearchableSelect
                options={productRecipes.map(recipe => ({
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
    </div>
  );
};

export default BrandProductsTab;
