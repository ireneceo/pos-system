import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Button, Table, TableHeader, TableRow, MobileLabel, MobileValue, MobileGrid, ActionButtons, EmptyState as UIEmptyState } from '../../components/UI';
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import { Modal, ModalButton, FormGroup as UIFormGroup, FormLabel, FormInput, FormSelect } from '../../components/UI/Modal';
import { fetchAPI } from '../../utils/api';
import { useBrandCurrency } from '../../hooks/useBrandCurrency';
import { formatCurrency } from '../../utils/currency';

interface ProductIngredientsTabProps {
  onCountChange?: (count: number) => void;
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

const Container = styled.div`
  padding: 0;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`;

const IngredientInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const IngredientImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 6px;
  object-fit: cover;
`;

const IngredientImagePlaceholder = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 6px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9CA3AF;
  font-size: 18px;
`;

const IngredientDetails = styled.div``;

const IngredientName = styled.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 2px;
`;

const IngredientCode = styled.div`
  font-size: 12px;
  color: #6B7280;
`;

const StatusBadge = styled.span<{ active: boolean }>`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  background: ${props => props.active ? '#ECFDF5' : '#FEE2E2'};
  color: ${props => props.active ? '#059669' : '#DC2626'};
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

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProductIngredientsTab: React.FC<ProductIngredientsTabProps> = ({ onCountChange }) => {
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
  const [formData, setFormData] = useState({
    name: '',
    category_id: '',
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
  }, [fetchData]);

  const handleOpenModal = (ingredient?: Ingredient) => {
    if (ingredient) {
      setEditingIngredient(ingredient);
      setFormData({
        name: ingredient.name,
        category_id: ingredient.category_id?.toString() || '',
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
        setShowModal(false);
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

  const handleDelete = async (ingredient: Ingredient) => {
    if (!confirm(`Are you sure you want to delete "${ingredient.name}"?`)) return;

    try {
      const response = await fetchAPI(`/api/product-ingredients/${ingredient.id}`, {
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
    }
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

  if (loading) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <HeaderRow>
        <SectionTitle>Ingredients ({ingredients.length})</SectionTitle>
        <Button variant="primary" onClick={() => handleOpenModal()}>
          Add Ingredient
        </Button>
      </HeaderRow>

      <FilterBar>
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
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.emoji} {cat.name}</option>
          ))}
        </FilterSelect>
      </FilterBar>

      {filteredIngredients.length === 0 ? (
        <UIEmptyState>
          <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
            No ingredients found
          </div>
          <div style={{ fontSize: '14px', marginBottom: '16px' }}>
            Add ingredients to use in your product recipes
          </div>
          <Button variant="primary" onClick={() => handleOpenModal()}>
            Add First Ingredient
          </Button>
        </UIEmptyState>
      ) : (
        <Table>
          <TableHeader columns="2fr 1fr 1fr 1fr 1fr 120px">
            <span>Ingredient</span>
            <span>Category</span>
            <span>Unit Cost</span>
            <span>Stock</span>
            <span>Status</span>
            <span>Actions</span>
          </TableHeader>
          {filteredIngredients.map(ingredient => (
            <TableRow key={ingredient.id} columns="2fr 1fr 1fr 1fr 1fr 120px">
              <MobileGrid>
                <MobileValue>
                  <MobileLabel>Ingredient</MobileLabel>
                  <IngredientInfo>
                    {ingredient.image_url ? (
                      <IngredientImage src={ingredient.image_url} alt={ingredient.name} />
                    ) : (
                      <IngredientImagePlaceholder>
                        {ingredient.category?.emoji || '📦'}
                      </IngredientImagePlaceholder>
                    )}
                    <IngredientDetails>
                      <IngredientName>{ingredient.name}</IngredientName>
                      <IngredientCode>{ingredient.code}</IngredientCode>
                    </IngredientDetails>
                  </IngredientInfo>
                </MobileValue>
                <MobileValue>
                  <MobileLabel>Category</MobileLabel>
                  <span>{ingredient.category?.name || '-'}</span>
                </MobileValue>
                <MobileValue>
                  <MobileLabel>Unit Cost</MobileLabel>
                  <span>{formatCurrency(ingredient.unit_cost, selectedCurrency)}/{ingredient.unit}</span>
                </MobileValue>
                <MobileValue>
                  <MobileLabel>Stock</MobileLabel>
                  {ingredient.track_stock ? (
                    <StockBadge status={getStockStatus(ingredient)}>
                      {ingredient.current_stock} {ingredient.unit}
                    </StockBadge>
                  ) : (
                    <span style={{ color: '#9CA3AF' }}>Not tracked</span>
                  )}
                </MobileValue>
                <MobileValue>
                  <MobileLabel>Status</MobileLabel>
                  <StatusBadge active={ingredient.is_active}>
                    {ingredient.is_active ? 'Active' : 'Inactive'}
                  </StatusBadge>
                </MobileValue>
              </MobileGrid>
              <ActionButtons>
                <Button
                  variant="secondary"
                  onClick={() => handleOpenModal(ingredient)}
                  style={{ padding: '6px 12px', fontSize: '12px' }}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(ingredient)}
                  style={{ padding: '6px 12px', fontSize: '12px' }}
                >
                  Delete
                </Button>
              </ActionButtons>
            </TableRow>
          ))}
        </Table>
      )}

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingIngredient ? 'Edit Ingredient' : 'Add Ingredient'}
        size="large"
      >
        <FormRow>
          <UIFormGroup>
            <FormLabel>Name *</FormLabel>
            <FormInput
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Chicken Breast"
            />
          </UIFormGroup>
          <UIFormGroup>
            <FormLabel>Category</FormLabel>
            <FormSelect
              value={formData.category_id}
              onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.emoji} {cat.name}</option>
              ))}
            </FormSelect>
          </UIFormGroup>
        </FormRow>

        <FormRow>
          <UIFormGroup>
            <FormLabel>Unit *</FormLabel>
            <FormInput
              value={formData.unit}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              placeholder="e.g., kg, pcs, ml"
            />
          </UIFormGroup>
          <UIFormGroup>
            <FormLabel>Unit Cost ({selectedCurrency})</FormLabel>
            <FormInput
              type="number"
              step="0.01"
              min="0"
              value={formData.unit_cost}
              onChange={(e) => setFormData({ ...formData, unit_cost: e.target.value })}
            />
          </UIFormGroup>
        </FormRow>

        <FormRow>
          <UIFormGroup>
            <FormLabel>Supplier</FormLabel>
            <FormInput
              value={formData.supplier_name}
              onChange={(e) => setFormData({ ...formData, supplier_name: e.target.value })}
              placeholder="Supplier name"
            />
          </UIFormGroup>
          <UIFormGroup>
            <FormLabel>Track Stock</FormLabel>
            <FormSelect
              value={formData.track_stock ? 'yes' : 'no'}
              onChange={(e) => setFormData({ ...formData, track_stock: e.target.value === 'yes' })}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </FormSelect>
          </UIFormGroup>
        </FormRow>

        {formData.track_stock && (
          <FormRow>
            <UIFormGroup>
              <FormLabel>Current Stock</FormLabel>
              <FormInput
                type="number"
                step="0.01"
                min="0"
                value={formData.current_stock}
                onChange={(e) => setFormData({ ...formData, current_stock: e.target.value })}
              />
            </UIFormGroup>
            <UIFormGroup>
              <FormLabel>Min Stock (Alert)</FormLabel>
              <FormInput
                type="number"
                step="0.01"
                min="0"
                value={formData.min_stock}
                onChange={(e) => setFormData({ ...formData, min_stock: e.target.value })}
              />
            </UIFormGroup>
          </FormRow>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
          <ModalButton variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </ModalButton>
          <ModalButton variant="primary" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </ModalButton>
        </div>
      </Modal>
    </Container>
  );
};

export default ProductIngredientsTab;
