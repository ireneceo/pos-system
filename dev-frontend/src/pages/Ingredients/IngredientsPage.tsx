import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { EmptyState } from '../../components/UI/TableComponents';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import {
  StatsGrid,
  StatCard,
  StatLabel,
  StatValue,
  StatDescription,
  Container,
  Header,
  Title,
  ActionSection,
  Content
} from '../../components/UI';
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import SortDropdown, { SortKey, sortItems } from '../../components/Common/SortDropdown';
import { useAuth } from '../../contexts/AuthContext';
import { Modal, ModalButton, FormGroup as UIFormGroup, FormLabel, FormInput, FormRow as UIFormRow } from '../../components/UI/Modal';
import { useBrandCurrency } from '../../hooks/useBrandCurrency';
import { formatCurrency, getCurrencySymbol } from '../../utils/currency';
import ConfirmModal from '../../components/ConfirmModal';

import { getAuthToken } from '../../utils/auth';
interface Ingredient {
  id: number;
  brand_id: number | null;
  restaurant_id: number | null;
  code: string | null;
  name: string;
  category: string;
  unit: string;
  unit_cost: number;
  supplier_name: string | null;
  is_active: boolean;
  min_stock?: number;
  current_stock?: number;
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

const IngredientCategory = styled.div`
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

const IngredientInfo = styled.div`
  margin: 12px 0;
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
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          background: #635BFF;
          color: white;
          &:hover { background: #4F46E5; }
        `;
      case 'danger':
        return `
          background: #FEF2F2;
          border: 1px solid #EF4444;
          color: #EF4444;
          &:hover { background: #FEE2E2; }
        `;
      default:
        return `
          background: #F1F4F8;
          color: #1F2937;
          &:hover { background: #C7CED6; }
        `;
    }
  }}
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

const IngredientsPage: React.FC = () => {
  const { user } = useAuth();
  const { defaultCurrency, supportedCurrencies } = useBrandCurrency();
  const [selectedCurrency, setSelectedCurrency] = useState<string>('');
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('newest');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    category: '',
    unit: '',
    unit_cost: '',
    supplier_name: '',
    min_stock: '0'
  });

  // ConfirmModal states
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingIngredientId, setDeletingIngredientId] = useState<number | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Set default currency when loaded
  useEffect(() => {
    if (defaultCurrency && !selectedCurrency) {
      setSelectedCurrency(defaultCurrency);
    }
  }, [defaultCurrency, selectedCurrency]);

  useEffect(() => {
    fetchIngredients();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchIngredients = async () => {
    try {
      setLoading(true);
      let url = '';

      if (user?.role === 'Brand General' || user?.role === 'Brand Manager') {
        if (user.brand_id) {
          url = `/api/brands/${user.brand_id}/ingredients`;
        }
      } else if (user?.role === 'Restaurant Admin') {
        if (user.restaurant_id) {
          url = `/api/restaurants/${user.restaurant_id}/ingredients`;
        }
      }

      if (!url) {
        setLoading(false);
        return;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setIngredients(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch ingredients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (ingredientId: number) => {
    setDeleteError(null);
    setDeletingIngredientId(ingredientId);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!deletingIngredientId) return;
    setShowDeleteConfirm(false);

    try {
      let url = '';
      if (user?.role === 'Brand General' || user?.role === 'Brand Manager') {
        url = `/api/brands/${user?.brand_id}/ingredients/${deletingIngredientId}`;
      } else if (user?.role === 'Restaurant Admin') {
        url = `/api/restaurants/${user?.restaurant_id}/ingredients/${deletingIngredientId}`;
      }

      const token = getAuthToken();
      const response = await fetch(url, {
        method: 'DELETE',
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      const data = await response.json();

      if (data.success) {
        fetchIngredients();
      }
    } catch (error) {
      console.error('Failed to delete ingredient:', error);
      setDeleteError('Failed to delete ingredient');
    } finally {
      setDeletingIngredientId(null);
    }
  };

  const handleOpenModal = (ingredient: Ingredient | null) => {
    setSubmitError(null);
    if (ingredient) {
      setSelectedIngredient(ingredient);
      setFormData({
        code: ingredient.code || '',
        name: ingredient.name,
        category: ingredient.category,
        unit: ingredient.unit,
        unit_cost: ingredient.unit_cost.toString(),
        supplier_name: ingredient.supplier_name || '',
        min_stock: ingredient.min_stock?.toString() || '0'
      });
    } else {
      setSelectedIngredient(null);
      setFormData({
        code: '',
        name: '',
        category: '',
        unit: '',
        unit_cost: '',
        supplier_name: '',
        min_stock: '0'
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedIngredient(null);
    setFormData({
      code: '',
      name: '',
      category: '',
      unit: '',
      unit_cost: '',
      supplier_name: '',
      min_stock: '0'
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!formData.name || !formData.category || !formData.unit || !formData.unit_cost) {
      setSubmitError('Please fill in all required fields');
      return;
    }

    try {
      let url = '';
      const method = selectedIngredient ? 'PUT' : 'POST';

      if (user?.role === 'Brand General' || user?.role === 'Brand Manager') {
        if (selectedIngredient) {
          url = `/api/brands/${user.brand_id}/ingredients/${selectedIngredient.id}`;
        } else {
          url = `/api/brands/${user.brand_id}/ingredients`;
        }
      } else if (user?.role === 'Restaurant Admin') {
        if (selectedIngredient) {
          url = `/api/restaurants/${user.restaurant_id}/ingredients/${selectedIngredient.id}`;
        } else {
          url = `/api/restaurants/${user.restaurant_id}/ingredients`;
        }
      }

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          unit_cost: parseFloat(formData.unit_cost),
          min_stock: parseInt(formData.min_stock) || 0
        })
      });

      const data = await response.json();

      if (data.success) {
        handleCloseModal();
        fetchIngredients();
      } else {
        setSubmitError(data.error || 'Failed to save ingredient');
      }
    } catch (error) {
      console.error('Failed to save ingredient:', error);
      setSubmitError('Failed to save ingredient');
    }
  };

  const filteredIngredients = sortItems(ingredients.filter(ingredient => {
    const matchesSearch = ingredient.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || ingredient.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }), sortKey);

  const categories = ['all', ...Array.from(new Set(ingredients.map(i => i.category)))];
  const activeIngredients = ingredients.filter(i => i.is_active).length;
  const avgCost = ingredients.length > 0
    ? ingredients.reduce((sum, i) => sum + Number(i.unit_cost), 0) / ingredients.length
    : 0;

  return (
    <>
      <Container>
        <Header>
          <Title>{'Ingredients'}</Title>
          <ActionSection>
            <ThemedButton
              variant="primary"
              onClick={() => handleOpenModal(null)}
            >
              New Ingredient
            </ThemedButton>
          </ActionSection>
        </Header>

        <StatsGrid>
          <StatCard>
            <StatLabel>{'Total Ingredients'}</StatLabel>
            <StatValue>{ingredients.length}</StatValue>
            <StatDescription>{activeIngredients} active</StatDescription>
          </StatCard>
          <StatCard>
            <StatLabel>{'Average Cost'}</StatLabel>
            <StatValue>{formatCurrency(avgCost, selectedCurrency || 'MYR')}</StatValue>
            <StatDescription>per unit</StatDescription>
          </StatCard>
          <StatCard>
            <StatLabel>{'Categories'}</StatLabel>
            <StatValue>{categories.length - 1}</StatValue>
            <StatDescription>ingredient types</StatDescription>
          </StatCard>
        </StatsGrid>

        <FilterBar>
          <SearchInput
            type="text"
            placeholder="Search ingredients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FilterSelect
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </FilterSelect>
          <FilterSelect
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            style={{ minWidth: '140px' }}
          >
            {supportedCurrencies.map(code => (
              <option key={code} value={code}>
                {getCurrencySymbol(code)} {code}
              </option>
            ))}
          </FilterSelect>
          <SortDropdown value={sortKey} onChange={setSortKey} />
        </FilterBar>

        <Content>
          {/* Inline error messages */}
          {deleteError && (
            <div style={{ padding: '12px 16px', marginBottom: '16px', background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '8px', color: '#DC2626', fontSize: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {deleteError}
              <button onClick={() => setDeleteError(null)} style={{ background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer', fontSize: '18px' }}>&times;</button>
            </div>
          )}

          {loading && filteredIngredients.length === 0 ? (
            <EmptyState>
              <EmptyTitle>{'Loading...'}</EmptyTitle>
            </EmptyState>
          ) : filteredIngredients.length === 0 ? (
            <EmptyState>
              <EmptyTitle>{searchTerm || selectedCategory !== 'all' ? 'No ingredients match' : 'No stock items yet'}</EmptyTitle>
              <EmptyDescription>
                {searchTerm || selectedCategory !== 'all'
                  ? 'Try adjusting your filters or category.'
                  : 'Stock items track raw materials with quantity, cost, and supplier links — used for inventory deduction when orders are completed and for purchase order suggestions.'}
              </EmptyDescription>
              {!searchTerm && selectedCategory === 'all' && (
                <>
                  <div style={{ marginTop: 14, padding: '10px 14px', background: 'white', border: '1px solid #C7CED6', borderRadius: 8, fontSize: 12.5, color: '#374151', textAlign: 'left', maxWidth: 460 }}>
                    <div style={{ marginBottom: 4 }}><strong style={{ color: '#635BFF' }}>1.</strong> Add a stock item with name, unit, and starting quantity</div>
                    <div style={{ marginBottom: 4 }}><strong style={{ color: '#635BFF' }}>2.</strong> Link it to menu products (Recipes) so it deducts on each sale</div>
                    <div><strong style={{ color: '#635BFF' }}>3.</strong> Set min/par levels to enable reorder alerts and PO suggestions</div>
                  </div>
                  <ThemedButton
                    variant="primary"
                    onClick={() => handleOpenModal(null)}
                    style={{ marginTop: 14 }}
                  >
                    Add your first stock item
                  </ThemedButton>
                </>
              )}
            </EmptyState>
          ) : (
            <IngredientsGrid>
              {filteredIngredients.map(ingredient => (
                <IngredientCard key={ingredient.id} isActive={ingredient.is_active}>
                  <IngredientHeader>
                    <div>
                      <IngredientName>{ingredient.name}</IngredientName>
                      <IngredientCategory>{ingredient.category}</IngredientCategory>
                    </div>
                  </IngredientHeader>

                  <IngredientInfo>
                    <InfoRow>
                      <InfoLabel>{'Unit Cost'}</InfoLabel>
                      <InfoValue>{formatCurrency(ingredient.unit_cost, selectedCurrency || 'MYR')}</InfoValue>
                    </InfoRow>
                    <InfoRow>
                      <InfoLabel>{'Unit'}</InfoLabel>
                      <InfoValue>{ingredient.unit}</InfoValue>
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
                      onClick={() => handleDelete(ingredient.id)}
                    >
                      Delete
                    </ActionButton>
                  </IngredientActions>
                </IngredientCard>
              ))}
            </IngredientsGrid>
          )}
        </Content>
      </Container>

      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={selectedIngredient ? 'Edit Ingredient' : 'New Ingredient'}
        size="medium"
      >
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <UIFormRow>
            <UIFormGroup>
              <FormLabel>Ingredient Name *</FormLabel>
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
              <FormInput
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g., Grains"
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

          <UIFormRow>
            <UIFormGroup>
              <FormLabel>Unit *</FormLabel>
              <FormInput
                type="text"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                placeholder="kg, g, L, ml"
                required
              />
            </UIFormGroup>
            <UIFormGroup>
              <FormLabel>Unit Cost ({getCurrencySymbol(selectedCurrency || 'MYR')}) *</FormLabel>
              <FormInput
                type="number"
                step="0.01"
                value={formData.unit_cost}
                onChange={(e) => setFormData({ ...formData, unit_cost: e.target.value })}
                placeholder="0.00"
                required
              />
            </UIFormGroup>
          </UIFormRow>

          <UIFormGroup>
            <FormLabel>{'Minimum Stock'}</FormLabel>
            <FormInput
              type="number"
              value={formData.min_stock}
              onChange={(e) => setFormData({ ...formData, min_stock: e.target.value })}
              placeholder="0"
            />
          </UIFormGroup>

          {/* Error Display */}
          {submitError && (
            <div style={{ padding: '12px 16px', background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '8px', color: '#DC2626', fontSize: '14px' }}>
              {submitError}
            </div>
          )}

          <ButtonGroup>
            <ModalButton type="button" variant="secondary" onClick={handleCloseModal}>
              Cancel
            </ModalButton>
            <ModalButton type="submit" variant="primary">
              {selectedIngredient ? 'Update Ingredient' : 'Create Ingredient'}
            </ModalButton>
          </ButtonGroup>
        </form>
      </Modal>

      {/* Delete Ingredient Confirm Modal */}
      <ConfirmModal
        isOpen={showDeleteConfirm}
        title="Delete Ingredient"
        message="Are you sure you want to delete this ingredient?"
        onConfirm={confirmDelete}
        onCancel={() => { setShowDeleteConfirm(false); setDeletingIngredientId(null); }}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </>
  );
};

export default IngredientsPage;
