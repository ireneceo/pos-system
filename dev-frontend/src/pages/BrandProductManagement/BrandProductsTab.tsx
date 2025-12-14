import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import { Modal, ModalButton, FormGroup as UIFormGroup, FormLabel, FormInput, FormSelect, FormTextArea } from '../../components/UI/Modal';
import ImageUploadDropzone from '../../components/common/ImageUploadDropzone';
import ConfirmModal from '../../components/ConfirmModal';

interface BrandProductsTabProps {
  brandId: number;
  onCountChange: (count: number) => void;
  categoryRefreshKey?: number;
}

interface Category {
  id: number;
  brand_id: number;
  name: string;
  emoji: string | null;
}

interface OptionGroup {
  id?: number;
  name: string;
  is_required: boolean;
  min_selections: number;
  max_selections: number;
  sort_order: number;
  options: Option[];
}

interface Option {
  id?: number;
  name: string;
  price_adjustment: number;
  sort_order: number;
  is_active: boolean;
}

interface Product {
  id: number;
  brand_id: number;
  category_id: number | null;
  category?: Category;
  name: string;
  description: string | null;
  sku: string | null;
  unit: string | null;
  unit_price: number;
  min_order_quantity: number;
  image_url: string | null;
  is_active: boolean;
  sort_order: number;
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

const OptionGroupsSection = styled.div`
  margin-top: 8px;
`;

const OptionGroupBadge = styled.span`
  display: inline-block;
  padding: 2px 8px;
  background: #E5E7EB;
  color: #374151;
  border-radius: 4px;
  font-size: 11px;
  margin-right: 4px;
  margin-bottom: 4px;
`;

// Modal Styles
const OptionGroupContainer = styled.div`
  background: #F9FAFB;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
`;

const OptionGroupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const OptionGroupTitle = styled.div`
  font-weight: 600;
  color: #374151;
`;

const OptionRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 8px;
  padding: 8px;
  background: white;
  border-radius: 6px;
`;

const SmallInput = styled.input`
  padding: 6px 10px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 13px;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`;

const RemoveButton = styled.button`
  padding: 4px 8px;
  background: #FEE2E2;
  color: #DC2626;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background: #FECACA;
  }
`;

const AddButton = styled.button`
  padding: 6px 12px;
  background: #E0E7FF;
  color: #4F46E5;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: #C7D2FE;
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #374151;
  cursor: pointer;
`;

const BrandProductsTab: React.FC<BrandProductsTabProps> = ({
  brandId,
  onCountChange,
  categoryRefreshKey
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    sku: '',
    unit: '',
    unit_price: '',
    min_order_quantity: '1',
    category_id: '',
    image_url: '',
    is_active: true,
    optionGroups: [] as OptionGroup[]
  });

  const getToken = useCallback(() => localStorage.getItem('auth_token'), []);

  const fetchProducts = useCallback(async () => {
    if (!brandId) return;

    try {
      const token = getToken();
      const response = await fetch(`/api/brands/${brandId}/products`, {
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
  }, [brandId, getToken, onCountChange]);

  const fetchCategories = useCallback(async () => {
    if (!brandId) return;

    try {
      const token = getToken();
      const response = await fetch(`/api/brands/${brandId}/product-categories`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();

      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  }, [brandId, getToken]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchProducts(), fetchCategories()]);
      setLoading(false);
    };
    loadData();
  }, [brandId, fetchProducts, fetchCategories]);

  useEffect(() => {
    if (categoryRefreshKey !== undefined) {
      fetchCategories();
    }
  }, [categoryRefreshKey, fetchCategories]);

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        description: product.description || '',
        sku: product.sku || '',
        unit: product.unit || '',
        unit_price: product.unit_price.toString(),
        min_order_quantity: product.min_order_quantity.toString(),
        category_id: product.category_id?.toString() || '',
        image_url: product.image_url || '',
        is_active: product.is_active,
        optionGroups: product.optionGroups || []
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        sku: '',
        unit: '',
        unit_price: '',
        min_order_quantity: '1',
        category_id: categories.length > 0 ? categories[0].id.toString() : '',
        image_url: '',
        is_active: true,
        optionGroups: []
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    try {
      const token = getToken();
      const method = editingProduct ? 'PUT' : 'POST';
      const url = editingProduct
        ? `/api/brands/${brandId}/products/${editingProduct.id}`
        : `/api/brands/${brandId}/products`;

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
          unit: formData.unit.trim() || null,
          unit_price: parseFloat(formData.unit_price) || 0,
          min_order_quantity: parseInt(formData.min_order_quantity) || 1,
          category_id: formData.category_id ? parseInt(formData.category_id) : null,
          image_url: formData.image_url || null,
          is_active: formData.is_active,
          optionGroups: formData.optionGroups
        })
      });

      const data = await response.json();

      if (data.success) {
        handleCloseModal();
        fetchProducts();
      } else {
        alert(data.error || 'Failed to save product');
      }
    } catch (error) {
      console.error('Failed to save product:', error);
      alert('Failed to save product');
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
      const response = await fetch(`/api/brands/${brandId}/products/${productToDelete.id}`, {
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

  // Option Group handlers
  const handleAddOptionGroup = () => {
    setFormData({
      ...formData,
      optionGroups: [
        ...formData.optionGroups,
        {
          name: '',
          is_required: false,
          min_selections: 0,
          max_selections: 1,
          sort_order: formData.optionGroups.length,
          options: []
        }
      ]
    });
  };

  const handleRemoveOptionGroup = (index: number) => {
    const newGroups = [...formData.optionGroups];
    newGroups.splice(index, 1);
    setFormData({ ...formData, optionGroups: newGroups });
  };

  const handleOptionGroupChange = (index: number, field: string, value: any) => {
    const newGroups = [...formData.optionGroups];
    (newGroups[index] as any)[field] = value;
    setFormData({ ...formData, optionGroups: newGroups });
  };

  const handleAddOption = (groupIndex: number) => {
    const newGroups = [...formData.optionGroups];
    newGroups[groupIndex].options.push({
      name: '',
      price_adjustment: 0,
      sort_order: newGroups[groupIndex].options.length,
      is_active: true
    });
    setFormData({ ...formData, optionGroups: newGroups });
  };

  const handleRemoveOption = (groupIndex: number, optionIndex: number) => {
    const newGroups = [...formData.optionGroups];
    newGroups[groupIndex].options.splice(optionIndex, 1);
    setFormData({ ...formData, optionGroups: newGroups });
  };

  const handleOptionChange = (groupIndex: number, optionIndex: number, field: string, value: any) => {
    const newGroups = [...formData.optionGroups];
    (newGroups[groupIndex].options[optionIndex] as any)[field] = value;
    setFormData({ ...formData, optionGroups: newGroups });
  };

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (product.sku && product.sku.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || product.category_id?.toString() === categoryFilter;
    return matchesSearch && matchesCategory;
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
        <ThemedButton onClick={() => handleOpenModal()}>
          + Add Product
        </ThemedButton>
      </FilterBar>

      {filteredProducts.length === 0 ? (
        <EmptyState>
          <EmptyTitle>
            {searchTerm || categoryFilter !== 'all' ? 'No products found' : 'No products yet'}
          </EmptyTitle>
          <EmptyDescription>
            {searchTerm || categoryFilter !== 'all'
              ? 'Try adjusting your search or filter criteria.'
              : 'Start by adding your first product.'}
          </EmptyDescription>
          {!searchTerm && categoryFilter === 'all' && (
            <ThemedButton onClick={() => handleOpenModal()}>+ Add Product</ThemedButton>
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
                  <PriceValue>RM {product.unit_price.toFixed(2)}</PriceValue>
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

              {product.optionGroups && product.optionGroups.length > 0 && (
                <OptionGroupsSection>
                  {product.optionGroups.map(og => (
                    <OptionGroupBadge key={og.id || og.name}>
                      {og.name} ({og.options?.length || 0})
                    </OptionGroupBadge>
                  ))}
                </OptionGroupsSection>
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
        <Modal onClose={handleCloseModal} width="700px">
          <h2 style={{ marginTop: 0, marginBottom: '24px' }}>
            {editingProduct ? 'Edit Product' : 'Add Product'}
          </h2>
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
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
                <FormLabel>Unit</FormLabel>
                <FormInput
                  type="text"
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  placeholder="kg, L, pcs, etc."
                />
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
                currentImage={formData.image_url}
                onImageChange={(url) => setFormData({ ...formData, image_url: url || '' })}
                uploadPath="brand-products"
              />
            </UIFormGroup>

            <UIFormGroup>
              <CheckboxLabel>
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                />
                Active
              </CheckboxLabel>
            </UIFormGroup>

            {/* Option Groups */}
            <div style={{ marginTop: '24px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <FormLabel style={{ margin: 0 }}>Option Groups</FormLabel>
                <AddButton type="button" onClick={handleAddOptionGroup}>
                  + Add Option Group
                </AddButton>
              </div>

              {formData.optionGroups.map((group, groupIndex) => (
                <OptionGroupContainer key={groupIndex}>
                  <OptionGroupHeader>
                    <SmallInput
                      type="text"
                      placeholder="Group name (e.g., Size, Grade)"
                      value={group.name}
                      onChange={(e) => handleOptionGroupChange(groupIndex, 'name', e.target.value)}
                      style={{ flex: 1, marginRight: '12px' }}
                    />
                    <CheckboxLabel style={{ marginRight: '12px' }}>
                      <input
                        type="checkbox"
                        checked={group.is_required}
                        onChange={(e) => handleOptionGroupChange(groupIndex, 'is_required', e.target.checked)}
                      />
                      Required
                    </CheckboxLabel>
                    <RemoveButton type="button" onClick={() => handleRemoveOptionGroup(groupIndex)}>
                      Remove
                    </RemoveButton>
                  </OptionGroupHeader>

                  {group.options.map((option, optionIndex) => (
                    <OptionRow key={optionIndex}>
                      <SmallInput
                        type="text"
                        placeholder="Option name"
                        value={option.name}
                        onChange={(e) => handleOptionChange(groupIndex, optionIndex, 'name', e.target.value)}
                        style={{ flex: 1 }}
                      />
                      <SmallInput
                        type="number"
                        step="0.01"
                        placeholder="+ Price"
                        value={option.price_adjustment}
                        onChange={(e) => handleOptionChange(groupIndex, optionIndex, 'price_adjustment', parseFloat(e.target.value) || 0)}
                        style={{ width: '100px' }}
                      />
                      <RemoveButton type="button" onClick={() => handleRemoveOption(groupIndex, optionIndex)}>
                        ×
                      </RemoveButton>
                    </OptionRow>
                  ))}

                  <AddButton type="button" onClick={() => handleAddOption(groupIndex)}>
                    + Add Option
                  </AddButton>
                </OptionGroupContainer>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
              <ModalButton type="button" onClick={handleCloseModal}>
                Cancel
              </ModalButton>
              <ModalButton type="submit" variant="primary">
                {editingProduct ? 'Update' : 'Create'}
              </ModalButton>
            </div>
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
