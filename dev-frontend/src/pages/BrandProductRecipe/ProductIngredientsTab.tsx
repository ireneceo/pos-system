import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import { Modal, ModalButton, FormGroup as UIFormGroup, FormLabel, FormInput, FormSelect, FormRow as UIFormRow } from '../../components/UI/Modal';
import ConfirmModal from '../../components/ConfirmModal';
import { fetchAPI } from '../../utils/api';
import { useBrandCurrency } from '../../hooks/useBrandCurrency';
import { formatCurrency } from '../../utils/currency';

interface ProductIngredientsTabProps {
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
  min_stock: number;
  min_order: number;
  current_stock: number;
  track_stock: boolean;
  is_active: boolean;
}

const IngredientsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 24px;
  align-items: start;
`;

const IngredientCard = styled.div<{ isActive?: boolean }>`
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

const IngredientImageContainer = styled.div`
  width: 100%;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 12px;
  background: #F6F9FC;
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

const TrackStockBadge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  background: #D1FAE5;
  color: #065F46;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  margin-left: 8px;
`;

const TrackStockRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: #F6F9FC;
  border-radius: 8px;
  margin-top: 12px;
`;

const TrackStockLabel = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: #0A2540;
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 22px;
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #E6EBF1;
  transition: 0.3s;
  border-radius: 22px;

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
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`;

const InfoLabel = styled.span`
  font-size: 12px;
  color: #6B7280;
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
          background: #F6F9FC;
          border: 1px solid #E6EBF1;
          color: #6B7280;
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

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
`;

const EmptyTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`;

const EmptyDescription = styled.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const ImagePreview = styled.div`
  width: 100%;
  height: 150px;
  border: 2px dashed #E6EBF1;
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
  color: #9CA3AF;
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

const ProductIngredientsTab: React.FC<ProductIngredientsTabProps> = ({ onCountChange, categoryRefreshKey }) => {
  const { defaultCurrency } = useBrandCurrency();
  const [selectedCurrency, setSelectedCurrency] = useState<string>('RM');
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingIngredient, setEditingIngredient] = useState<Ingredient | null>(null);
  const [saving, setSaving] = useState(false);
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
    min_stock: '0',
    min_order: '0',
    current_stock: '0',
    track_stock: true
  });

  useEffect(() => {
    if (defaultCurrency) {
      setSelectedCurrency(defaultCurrency);
    }
  }, [defaultCurrency]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [ingredientsRes, categoriesRes] = await Promise.all([
        fetchAPI('/api/product-ingredients'),
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
    if (ingredient) {
      setEditingIngredient(ingredient);
      setFormData({
        name: ingredient.name,
        category_id: ingredient.category_id?.toString() || '',
        image_url: ingredient.image_url || '',
        unit: ingredient.unit,
        base_quantity: ingredient.base_quantity.toString(),
        unit_cost: ingredient.unit_cost.toString(),
        supplier_name: ingredient.supplier_name || '',
        min_stock: ingredient.min_stock.toString(),
        min_order: ingredient.min_order.toString(),
        current_stock: ingredient.current_stock.toString(),
        track_stock: ingredient.track_stock
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
        min_stock: '0',
        min_order: '0',
        current_stock: '0',
        track_stock: true
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingIngredient(null);
    setFormData({
      name: '',
      category_id: '',
      image_url: '',
      unit: '',
      base_quantity: '1',
      unit_cost: '0',
      supplier_name: '',
      min_stock: '0',
      min_order: '0',
      current_stock: '0',
      track_stock: true
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

  const handleSave = async () => {
    if (!formData.name.trim() || !formData.unit.trim()) {
      alert('Name and Unit are required');
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
          supplier_name: formData.supplier_name || null,
          min_stock: parseFloat(formData.min_stock) || 0,
          min_order: parseFloat(formData.min_order) || 0,
          current_stock: parseFloat(formData.current_stock) || 0,
          track_stock: formData.track_stock
        })
      });

      if (response.success) {
        handleCloseModal();
        fetchData();
      } else {
        alert(response.error || 'Failed to save ingredient');
      }
    } catch (error) {
      console.error('Failed to save ingredient:', error);
      alert('Failed to save ingredient');
    } finally {
      setSaving(false);
    }
  };

  // Track Stock 토글 핸들러
  const handleTrackStockToggle = async (ingredient: Ingredient, newValue: boolean) => {
    try {
      const response = await fetchAPI(`/api/product-ingredients/${ingredient.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          ...ingredient,
          track_stock: newValue
        })
      });

      if (response.success) {
        // 로컬 상태 업데이트
        setIngredients(prev => prev.map(ing =>
          ing.id === ingredient.id ? { ...ing, track_stock: newValue } : ing
        ));
      } else {
        alert(response.error || 'Failed to update track stock');
      }
    } catch (error) {
      console.error('Failed to toggle track stock:', error);
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
        alert(response.error || 'Failed to delete ingredient');
      }
    } catch (error) {
      console.error('Failed to delete ingredient:', error);
      alert('Failed to delete ingredient');
    } finally {
      setDeleteConfirm({ isOpen: false, ingredientId: null, ingredientName: '' });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm({ isOpen: false, ingredientId: null, ingredientName: '' });
  };

  const getStockStatus = (ingredient: Ingredient): 'normal' | 'low' | 'out' => {
    if (!ingredient.track_stock) return 'normal';
    if (ingredient.current_stock <= 0) return 'out';
    if (ingredient.current_stock <= ingredient.min_stock) return 'low';
    return 'normal';
  };

  const filteredIngredients = ingredients.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' ||
                           (item.category_id?.toString() === categoryFilter);
    return matchesSearch && matchesCategory;
  });

  const filterCategories = [
    { id: 'all', name: 'All Categories' },
    ...categories.map(c => ({ id: c.id.toString(), name: c.name }))
  ];

  if (loading) {
    return (
      <EmptyState>
        <EmptyTitle>Loading...</EmptyTitle>
      </EmptyState>
    );
  }

  return (
    <>
      <HeaderSection>
        <FilterBar style={{ marginBottom: 0, flex: 1 }}>
          <SearchInput
            type="text"
            placeholder="Search ingredients..."
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
        </FilterBar>

        <ThemedButton
          variant="primary"
          onClick={() => handleOpenModal()}
          style={{ whiteSpace: 'nowrap' }}
        >
          New Ingredient
        </ThemedButton>
      </HeaderSection>

      {filteredIngredients.length === 0 ? (
        <EmptyState>
          <EmptyTitle>No ingredients found</EmptyTitle>
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
            <IngredientCard key={ingredient.id} isActive={ingredient.is_active}>
              {ingredient.image_url && (
                <IngredientImageContainer>
                  <IngredientImage src={ingredient.image_url} alt={ingredient.name} />
                </IngredientImageContainer>
              )}
              <IngredientHeader>
                <div>
                  <IngredientName>
                    {ingredient.name}
                    {ingredient.track_stock && (
                      <TrackStockBadge>Stock</TrackStockBadge>
                    )}
                  </IngredientName>
                  <IngredientCategoryBadge>
                    {ingredient.category?.emoji} {ingredient.category?.name || 'Uncategorized'}
                  </IngredientCategoryBadge>
                </div>
              </IngredientHeader>

              <IngredientInfo>
                <InfoRow>
                  <InfoLabel>Unit Cost</InfoLabel>
                  <InfoValue>{formatCurrency(Number(ingredient.unit_cost), selectedCurrency)}</InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>Base Qty / Unit</InfoLabel>
                  <InfoValue>{Number(ingredient.base_quantity || 1)} {ingredient.unit}</InfoValue>
                </InfoRow>
                {ingredient.supplier_name && (
                  <InfoRow>
                    <InfoLabel>Supplier</InfoLabel>
                    <InfoValue>{ingredient.supplier_name}</InfoValue>
                  </InfoRow>
                )}
                {ingredient.code && (
                  <InfoRow>
                    <InfoLabel>Code</InfoLabel>
                    <InfoValue>{ingredient.code}</InfoValue>
                  </InfoRow>
                )}
                {ingredient.track_stock && (
                  <InfoRow>
                    <InfoLabel>Stock</InfoLabel>
                    <StockBadge status={getStockStatus(ingredient)}>
                      {ingredient.current_stock} {ingredient.unit}
                    </StockBadge>
                  </InfoRow>
                )}
              </IngredientInfo>

              <IngredientActions>
                <ActionButton
                  variant="secondary"
                  onClick={() => handleOpenModal(ingredient)}
                >
                  Edit
                </ActionButton>
                <ActionButton
                  variant="danger"
                  onClick={() => handleDeleteClick(ingredient)}
                >
                  Delete
                </ActionButton>
              </IngredientActions>
            </IngredientCard>
          ))}
        </IngredientsGrid>
      )}

      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingIngredient ? 'Edit Ingredient' : 'New Ingredient'}
        size="medium"
      >
        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <UIFormGroup>
            <FormLabel>Image</FormLabel>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
              id="ingredient-image-upload"
            />
            <ImagePreview
              onClick={() => document.getElementById('ingredient-image-upload')?.click()}
            >
              {formData.image_url ? (
                <img src={formData.image_url} alt="Ingredient" />
              ) : (
                <ImagePlaceholder>Click to upload image</ImagePlaceholder>
              )}
            </ImagePreview>
          </UIFormGroup>

          <UIFormRow>
            <UIFormGroup>
              <FormLabel>Ingredient Name *</FormLabel>
              <FormInput
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Chicken Breast"
                required
              />
            </UIFormGroup>
            <UIFormGroup>
              <FormLabel>Category</FormLabel>
              <FormSelect
                value={formData.category_id}
                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
              >
                <option value="">Select category...</option>
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
                <option value="">Select unit...</option>
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
              <FormLabel>Supplier</FormLabel>
              <FormInput
                type="text"
                value={formData.supplier_name}
                onChange={(e) => setFormData({ ...formData, supplier_name: e.target.value })}
                placeholder="Supplier name"
              />
            </UIFormGroup>
          </UIFormRow>

          <ButtonGroup>
            <ModalButton type="button" variant="secondary" onClick={handleCloseModal}>
              Cancel
            </ModalButton>
            <ModalButton type="submit" variant="primary" disabled={saving}>
              {saving ? 'Saving...' : (editingIngredient ? 'Update Ingredient' : 'Create Ingredient')}
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
    </>
  );
};

export default ProductIngredientsTab;
