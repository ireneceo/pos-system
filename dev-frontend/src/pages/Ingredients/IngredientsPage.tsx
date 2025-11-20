import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainLayout from '../../components/Layout/MainLayout';
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
import { useAuth } from '../../contexts/AuthContext';
import { Modal, ModalButton, FormGroup as UIFormGroup, FormLabel, FormInput, FormSelect, FormRow as UIFormRow } from '../../components/UI/Modal';

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
  border: 1px solid #E6EBF1;
  padding: 20px;
  transition: all 0.2s;
  opacity: ${props => props.isActive ? 1 : 0.6};
  cursor: pointer;

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
  margin-top: 16px;
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
          background: #FEE2E2;
          color: #DC2626;
          &:hover { background: #FCA5A5; }
        `;
      default:
        return `
          background: #F3F4F6;
          color: #374151;
          &:hover { background: #E5E7EB; }
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

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
`;

const EmptyIcon = styled.div`
  font-size: 64px;
  margin-bottom: 16px;
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

const IngredientsPage: React.FC = () => {
  const { user } = useAuth();
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
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

  useEffect(() => {
    fetchIngredients();
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

  const handleDelete = async (ingredientId: number) => {
    if (!window.confirm('정말 이 재료를 삭제하시겠습니까?')) {
      return;
    }

    try {
      let url = '';
      if (user?.role === 'Brand General' || user?.role === 'Brand Manager') {
        url = `/api/brands/${user?.brand_id}/ingredients/${ingredientId}`;
      } else if (user?.role === 'Restaurant Admin') {
        url = `/api/restaurants/${user?.restaurant_id}/ingredients/${ingredientId}`;
      }

      const response = await fetch(url, { method: 'DELETE' });
      const data = await response.json();

      if (data.success) {
        alert('재료가 삭제되었습니다');
        fetchIngredients();
      }
    } catch (error) {
      console.error('Failed to delete ingredient:', error);
      alert('재료 삭제 실패');
    }
  };

  const handleOpenModal = (ingredient: Ingredient | null) => {
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

    if (!formData.name || !formData.category || !formData.unit || !formData.unit_cost) {
      alert('모든 필수 항목을 입력해주세요');
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
        alert(selectedIngredient ? '재료가 수정되었습니다' : '재료가 생성되었습니다');
        handleCloseModal();
        fetchIngredients();
      } else {
        alert(data.error || '재료 저장 실패');
      }
    } catch (error) {
      console.error('Failed to save ingredient:', error);
      alert('재료 저장 실패');
    }
  };

  const filteredIngredients = ingredients.filter(ingredient => {
    const matchesSearch = ingredient.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || ingredient.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(ingredients.map(i => i.category)))];
  const activeIngredients = ingredients.filter(i => i.is_active).length;
  const avgCost = ingredients.length > 0
    ? ingredients.reduce((sum, i) => sum + Number(i.unit_cost), 0) / ingredients.length
    : 0;

  return (
    <MainLayout>
      <Container>
        <Header>
          <Title>Ingredients</Title>
          <ActionSection>
            <ThemedButton
              variant="primary"
              onClick={() => handleOpenModal(null)}
            >
              + New Ingredient
            </ThemedButton>
          </ActionSection>
        </Header>

        <StatsGrid>
          <StatCard>
            <StatLabel>Total Ingredients</StatLabel>
            <StatValue>{ingredients.length}</StatValue>
            <StatDescription>{activeIngredients} active</StatDescription>
          </StatCard>
          <StatCard>
            <StatLabel>Average Cost</StatLabel>
            <StatValue>RM {avgCost.toFixed(2)}</StatValue>
            <StatDescription>per unit</StatDescription>
          </StatCard>
          <StatCard>
            <StatLabel>Categories</StatLabel>
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
        </FilterBar>

        <Content>
          {loading ? (
            <EmptyState>
              <EmptyTitle>Loading...</EmptyTitle>
            </EmptyState>
          ) : filteredIngredients.length === 0 ? (
            <EmptyState>
              <EmptyTitle>No ingredients found</EmptyTitle>
              <EmptyDescription>
                {searchTerm || selectedCategory !== 'all'
                  ? 'Try adjusting your filters'
                  : 'Create your first ingredient to get started'}
              </EmptyDescription>
              {!searchTerm && selectedCategory === 'all' && (
                <ThemedButton
                  variant="primary"
                  onClick={() => handleOpenModal(null)}
                >
                  + Create First Ingredient
                </ThemedButton>
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
                      <InfoLabel>Unit Cost</InfoLabel>
                      <InfoValue>RM {Number(ingredient.unit_cost).toFixed(2)}</InfoValue>
                    </InfoRow>
                    <InfoRow>
                      <InfoLabel>Unit</InfoLabel>
                      <InfoValue>{ingredient.unit}</InfoValue>
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
              <FormLabel>Code</FormLabel>
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
              <FormLabel>Supplier</FormLabel>
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
              <FormLabel>Unit Cost (RM) *</FormLabel>
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
            <FormLabel>Minimum Stock</FormLabel>
            <FormInput
              type="number"
              value={formData.min_stock}
              onChange={(e) => setFormData({ ...formData, min_stock: e.target.value })}
              placeholder="0"
            />
          </UIFormGroup>

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
    </MainLayout>
  );
};

export default IngredientsPage;
