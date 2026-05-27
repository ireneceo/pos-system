import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { EmptyState } from '../../components/UI/TableComponents';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import { SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import ListControlsBar from '../../components/Common/ListControlsBar';
import SortDropdown, { SortKey, sortItems } from '../../components/Common/SortDropdown';
import { Modal, ModalButton, FormGroup as UIFormGroup, FormLabel, FormInput, FormSelect, FormRow as UIFormRow } from '../../components/UI/Modal';
import ConfirmModal from '../../components/ConfirmModal';
import { fetchAPI } from '../../utils/api';
import ImageUploadDropzone from '../../components/Common/ImageUploadDropzone';
import { useBrandCurrency } from '../../hooks/useBrandCurrency';
import { formatCurrency } from '../../utils/currency';

import { getAuthToken } from '../../utils/auth';
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

const TrackStockRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: #F4F6F9;
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
  background-color: #C7CED6;
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

const ProductIngredientsTab: React.FC<ProductIngredientsTabProps> = ({ onCountChange, categoryRefreshKey }) => {
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
        setInfoModal({ open: true, title: 'Save Failed', message: response.error || 'Failed to save ingredient. Please try again.' });
      }
    } catch (error) {
      console.error('Failed to save ingredient:', error);
      setInfoModal({ open: true, title: 'Save Failed', message: 'Failed to save ingredient. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  // Track Stock 토글 핸들러
  const handleTrackStockToggle = async (ingredient: Ingredient, newValue: boolean) => {
    try {
      // 필요한 필드만 전송 (category 관계 객체 제외)
      const response = await fetchAPI(`/api/product-ingredients/${ingredient.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          name: ingredient.name,
          category_id: ingredient.category_id,
          image_url: ingredient.image_url,
          unit: ingredient.unit,
          base_quantity: ingredient.base_quantity,
          unit_cost: ingredient.unit_cost,
          supplier_name: ingredient.supplier_name,
          min_stock: ingredient.min_stock,
          min_order: ingredient.min_order,
          current_stock: ingredient.current_stock,
          is_active: ingredient.is_active,
          track_stock: newValue
        })
      });

      if (response.success) {
        // 로컬 상태 업데이트
        setIngredients(prev => prev.map(ing =>
          ing.id === ingredient.id ? { ...ing, track_stock: newValue } : ing
        ));
      } else {
        setInfoModal({ open: true, title: 'Update Failed', message: response.error || 'Failed to update track stock. Please try again.' });
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
    if (!ingredient.track_stock) return 'normal';
    if (ingredient.current_stock <= 0) return 'out';
    if (ingredient.current_stock <= ingredient.min_stock) return 'low';
    return 'normal';
  };

  const filteredIngredients = sortItems(ingredients.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.code.toLowerCase().includes(searchTerm.toLowerCase());
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
            New Ingredient
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
                {ingredient.supplier_name && (
                  <InfoRow>
                    <InfoLabel>{'Supplier'}</InfoLabel>
                    <InfoValue>{ingredient.supplier_name}</InfoValue>
                  </InfoRow>
                )}
                {ingredient.code && (
                  <InfoRow>
                    <InfoLabel>{'Code'}</InfoLabel>
                    <InfoValue>{ingredient.code}</InfoValue>
                  </InfoRow>
                )}
                {ingredient.track_stock && (
                  <InfoRow>
                    <InfoLabel>{'Stock'}</InfoLabel>
                    <StockBadge status={getStockStatus(ingredient)}>
                      {ingredient.current_stock} {ingredient.unit}
                    </StockBadge>
                  </InfoRow>
                )}
              </IngredientInfo>

              {/* Track Stock 토글 */}
              <TrackStockRow>
                <TrackStockLabel>{'Track in Inventory'}</TrackStockLabel>
                <ToggleSwitch>
                  <ToggleInput
                    type="checkbox"
                    checked={ingredient.track_stock || false}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleTrackStockToggle(ingredient, e.target.checked);
                    }}
                  />
                  <ToggleSlider />
                </ToggleSwitch>
              </TrackStockRow>

              <IngredientActions>
                <ActionButton
                  variant="secondary"
                  onClick={(e: React.MouseEvent) => { e.stopPropagation(); handleOpenModal(ingredient); }}
                >
                  Edit
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

      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingIngredient ? 'Edit Ingredient' : 'New Ingredient'}
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
              <FormLabel>{'Supplier'}</FormLabel>
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
            {detailIngredient.track_stock && (
              <span style={{ fontSize: '11px', fontWeight: 500, color: '#059669', background: '#ECFDF5', padding: '3px 8px', borderRadius: '4px' }}>{'Tracking'}</span>
            )}
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
              <div style={{ fontSize: '14px', fontWeight: 600 }}>{detailIngredient.track_stock ? `${Number(detailIngredient.current_stock || 0).toFixed(1)} ${detailIngredient.unit}` : '-'}</div>
            </div>
            <div style={{ padding: '10px', background: '#F9FAFB', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: '#4B5563', marginBottom: '3px' }}>{'Min Stock'}</div>
              <div style={{ fontSize: '14px', fontWeight: 600 }}>{detailIngredient.track_stock ? `${Number(detailIngredient.min_stock || 0)} ${detailIngredient.unit}` : '-'}</div>
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
