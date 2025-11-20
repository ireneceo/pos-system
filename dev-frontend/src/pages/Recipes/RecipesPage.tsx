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
import { Modal, ModalButton, FormGroup as UIFormGroup, FormLabel, FormInput, FormSelect, FormTextArea, FormRow as UIFormRow } from '../../components/UI/Modal';

interface Recipe {
  id: number;
  brand_id: number | null;
  restaurant_id: number | null;
  code: string | null;
  name: string;
  description: string | null;
  category: string;
  emoji: string | null;
  image: string | null;
  total_ingredient_cost: number;
  suggested_price: number | null;
  is_active: boolean;
  recipeIngredients?: RecipeIngredient[];
}

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
}

interface RecipeIngredient {
  id: number;
  recipe_id: number;
  ingredient_id: number;
  quantity: number;
  unit: string;
  cost: number;
  notes: string | null;
  ingredient?: Ingredient;
}

const RecipesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  margin-top: 24px;
`;

const RecipeCard = styled.div<{ isActive?: boolean }>`
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

const RecipeHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
`;

const RecipeEmoji = styled.div`
  font-size: 40px;
  line-height: 1;
  flex-shrink: 0;
`;

const RecipeInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const RecipeName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RecipeCategory = styled.div`
  display: inline-block;
  padding: 4px 8px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const RecipeDescription = styled.p`
  font-size: 14px;
  color: #6B7280;
  margin: 12px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const RecipeCosts = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin: 16px 0;
  padding: 12px;
  background: #F8FAFC;
  border-radius: 8px;
`;

const CostItem = styled.div``;

const CostLabel = styled.div`
  font-size: 11px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
`;

const CostValue = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #0A2540;
`;

const RecipeIngredients = styled.div`
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #E6EBF1;
`;

const IngredientsCount = styled.div`
  font-size: 12px;
  color: #6B7280;
`;

const RecipeActions = styled.div`
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

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 8px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const IngredientsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const IngredientRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 2fr 40px;
  gap: 8px;
  align-items: end;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const RemoveButton = styled.button`
  background: #FEE2E2;
  color: #DC2626;
  border: none;
  border-radius: 6px;
  padding: 10px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 16px;
  line-height: 1;

  &:hover {
    background: #FCA5A5;
  }
`;

const AddButton = styled.button`
  background: #F0F4FF;
  color: #635BFF;
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
  align-self: flex-start;

  &:hover {
    background: #E0E7FF;
  }
`;

const CostSummary = styled.div`
  background: #F8FAFC;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CostSummaryLabel = styled.div`
  font-size: 14px;
  color: #6B7280;
  font-weight: 600;
`;

const CostSummaryValue = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #635BFF;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
`;

const RecipesPage: React.FC = () => {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    emoji: '',
    image: '',
    prep_time: '',
    cook_time: '',
    instructions: '',
    suggested_price: ''
  });
  const [recipeIngredients, setRecipeIngredients] = useState<Array<{
    ingredient_id: number;
    quantity: string;
    unit: string;
    notes: string;
  }>>([]);

  // Fetch recipes and ingredients
  useEffect(() => {
    fetchRecipes();
    fetchIngredients();
  }, [user]);

  const fetchIngredients = async () => {
    try {
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

      if (!url) return;

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setIngredients(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch ingredients:', error);
    }
  };

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      let url = '';

      // Brand General/Manager
      if (user?.role === 'Brand General' || user?.role === 'Brand Manager') {
        if (user.brand_id) {
          url = `/api/brands/${user.brand_id}/recipes`;
        }
      }
      // Restaurant Admin
      else if (user?.role === 'Restaurant Admin') {
        if (user.restaurant_id) {
          url = `/api/restaurants/${user.restaurant_id}/recipes`;
        }
      }

      if (!url) {
        setLoading(false);
        return;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        // Brand General/Manager: data.data is array
        // Restaurant Admin: data.data is object with brand_recipes and own_recipes
        if (Array.isArray(data.data)) {
          setRecipes(data.data);
        } else {
          setRecipes([...data.data.brand_recipes, ...data.data.own_recipes]);
        }
      }
    } catch (error) {
      console.error('Failed to fetch recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (recipeId: number) => {
    if (!window.confirm('정말 이 레시피를 삭제하시겠습니까?')) {
      return;
    }

    try {
      let url = '';
      if (user?.role === 'Brand General' || user?.role === 'Brand Manager') {
        url = `/api/brands/${user?.brand_id}/recipes/${recipeId}`;
      } else if (user?.role === 'Restaurant Admin') {
        url = `/api/restaurants/${user?.restaurant_id}/recipes/${recipeId}`;
      }

      const response = await fetch(url, { method: 'DELETE' });
      const data = await response.json();

      if (data.success) {
        alert('레시피가 삭제되었습니다');
        fetchRecipes();
      }
    } catch (error) {
      console.error('Failed to delete recipe:', error);
      alert('레시피 삭제 실패');
    }
  };

  const handleOpenModal = (recipe: Recipe | null) => {
    if (recipe) {
      // Edit mode
      setSelectedRecipe(recipe);
      setFormData({
        name: recipe.name,
        description: recipe.description || '',
        category: recipe.category,
        emoji: recipe.emoji || '',
        image: recipe.image || '',
        prep_time: '',
        cook_time: '',
        instructions: '',
        suggested_price: recipe.suggested_price?.toString() || ''
      });
      setRecipeIngredients(recipe.recipeIngredients?.map(ri => ({
        ingredient_id: ri.ingredient_id,
        quantity: ri.quantity.toString(),
        unit: ri.unit,
        notes: ri.notes || ''
      })) || []);
    } else {
      // Create mode
      setSelectedRecipe(null);
      setFormData({
        name: '',
        description: '',
        category: '',
        emoji: '',
        image: '',
        prep_time: '',
        cook_time: '',
        instructions: '',
        suggested_price: ''
      });
      setRecipeIngredients([]);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRecipe(null);
    setFormData({
      name: '',
      description: '',
      category: '',
      emoji: '',
      image: '',
      prep_time: '',
      cook_time: '',
      instructions: '',
      suggested_price: ''
    });
    setRecipeIngredients([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.category) {
      alert('레시피 이름과 카테고리는 필수입니다');
      return;
    }

    try {
      let url = '';
      const method = selectedRecipe ? 'PUT' : 'POST';

      if (user?.role === 'Brand General' || user?.role === 'Brand Manager') {
        if (selectedRecipe) {
          url = `/api/brands/${user.brand_id}/recipes/${selectedRecipe.id}`;
        } else {
          url = `/api/brands/${user.brand_id}/recipes`;
        }
      } else if (user?.role === 'Restaurant Admin') {
        if (selectedRecipe) {
          url = `/api/restaurants/${user.restaurant_id}/recipes/${selectedRecipe.id}`;
        } else {
          url = `/api/restaurants/${user.restaurant_id}/recipes`;
        }
      }

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          suggested_price: parseFloat(formData.suggested_price) || 0,
          ingredients: recipeIngredients.map(ri => ({
            ingredient_id: ri.ingredient_id,
            quantity: parseFloat(ri.quantity),
            unit: ri.unit,
            notes: ri.notes
          }))
        })
      });

      const data = await response.json();

      if (data.success) {
        alert(selectedRecipe ? '레시피가 수정되었습니다' : '레시피가 생성되었습니다');
        handleCloseModal();
        fetchRecipes();
      } else {
        alert(data.error || '레시피 저장 실패');
      }
    } catch (error) {
      console.error('Failed to save recipe:', error);
      alert('레시피 저장 실패');
    }
  };

  const addIngredient = () => {
    setRecipeIngredients([...recipeIngredients, {
      ingredient_id: 0,
      quantity: '',
      unit: '',
      notes: ''
    }]);
  };

  const removeIngredient = (index: number) => {
    setRecipeIngredients(recipeIngredients.filter((_, i) => i !== index));
  };

  const updateIngredient = (index: number, field: string, value: any) => {
    const updated = [...recipeIngredients];
    updated[index] = { ...updated[index], [field]: value };
    setRecipeIngredients(updated);
  };

  const calculateTotalCost = () => {
    return recipeIngredients.reduce((sum, ri) => {
      const ingredient = ingredients.find(ing => ing.id === ri.ingredient_id);
      if (ingredient && ri.quantity) {
        return sum + (parseFloat(ri.quantity) * parseFloat(ingredient.unit_cost.toString()));
      }
      return sum;
    }, 0);
  };

  // Filter recipes
  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(recipes.map(r => r.category)))];

  // Calculate stats
  const activeRecipes = recipes.filter(r => r.is_active).length;
  const totalCost = recipes.reduce((sum, r) => sum + Number(r.total_ingredient_cost || 0), 0);
  const avgCost = recipes.length > 0 ? totalCost / recipes.length : 0;

  return (
    <MainLayout>
      <Container>
        <Header>
          <Title>Recipes</Title>
          <ActionSection>
            <ThemedButton
              variant="primary"
              onClick={() => handleOpenModal(null)}
            >
              + New Recipe
            </ThemedButton>
          </ActionSection>
        </Header>

        {/* Stats */}
        <StatsGrid>
          <StatCard>
            <StatLabel>Total Recipes</StatLabel>
            <StatValue>{recipes.length}</StatValue>
            <StatDescription>{activeRecipes} active</StatDescription>
          </StatCard>
          <StatCard>
            <StatLabel>Average Cost</StatLabel>
            <StatValue>RM {avgCost.toFixed(2)}</StatValue>
            <StatDescription>per recipe</StatDescription>
          </StatCard>
          <StatCard>
            <StatLabel>Total Value</StatLabel>
            <StatValue>RM {totalCost.toFixed(2)}</StatValue>
            <StatDescription>all recipes</StatDescription>
          </StatCard>
        </StatsGrid>

        {/* Filters */}
        <FilterBar>
          <SearchInput
            type="text"
            placeholder="Search recipes..."
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
          ) : filteredRecipes.length === 0 ? (
            <EmptyState>
              <EmptyTitle>No recipes found</EmptyTitle>
              <EmptyDescription>
                {searchTerm || selectedCategory !== 'all'
                  ? 'Try adjusting your filters'
                  : 'Create your first recipe to get started'}
              </EmptyDescription>
              {!searchTerm && selectedCategory === 'all' && (
                <ThemedButton
                  variant="primary"
                  onClick={() => handleOpenModal(null)}
                >
                  + Create First Recipe
                </ThemedButton>
              )}
            </EmptyState>
          ) : (
            <RecipesGrid>
              {filteredRecipes.map(recipe => (
                <RecipeCard key={recipe.id} isActive={recipe.is_active}>
                  <RecipeHeader>
                    {recipe.emoji && <RecipeEmoji>{recipe.emoji}</RecipeEmoji>}
                    <RecipeInfo>
                      <RecipeName>{recipe.name}</RecipeName>
                      <RecipeCategory>{recipe.category}</RecipeCategory>
                    </RecipeInfo>
                  </RecipeHeader>

                  {recipe.description && (
                    <RecipeDescription>{recipe.description}</RecipeDescription>
                  )}

                  <RecipeCosts>
                    <CostItem>
                      <CostLabel>Cost</CostLabel>
                      <CostValue>RM {Number(recipe.total_ingredient_cost || 0).toFixed(2)}</CostValue>
                    </CostItem>
                    <CostItem>
                      <CostLabel>Suggested</CostLabel>
                      <CostValue>RM {Number(recipe.suggested_price || 0).toFixed(2)}</CostValue>
                    </CostItem>
                  </RecipeCosts>

                  <RecipeIngredients>
                    <IngredientsCount>
                      {recipe.recipeIngredients?.length || 0} ingredients
                    </IngredientsCount>
                  </RecipeIngredients>

                  <RecipeActions>
                    <ActionButton
                      variant="secondary"
                      onClick={() => handleOpenModal(recipe)}
                    >
                      Edit
                    </ActionButton>
                    <ActionButton
                      variant="danger"
                      onClick={() => handleDelete(recipe.id)}
                    >
                      Delete
                    </ActionButton>
                  </RecipeActions>
                </RecipeCard>
              ))}
            </RecipesGrid>
          )}
        </Content>
      </Container>

      {/* Modal for create/edit */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={selectedRecipe ? 'Edit Recipe' : 'New Recipe'}
        size="large"
      >
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Basic Information */}
            <UIFormRow>
              <UIFormGroup>
                <FormLabel>Recipe Name *</FormLabel>
                <FormInput
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Nasi Lemak Special"
                  required
                />
              </UIFormGroup>
              <UIFormGroup>
                <FormLabel>Category *</FormLabel>
                <FormInput
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g., Main Dish"
                  required
                />
              </UIFormGroup>
            </UIFormRow>

            <UIFormRow>
              <UIFormGroup>
                <FormLabel>Emoji</FormLabel>
                <FormInput
                  type="text"
                  value={formData.emoji}
                  onChange={(e) => setFormData({ ...formData, emoji: e.target.value })}
                  placeholder="🍛"
                  maxLength={4}
                />
              </UIFormGroup>
              <UIFormGroup>
                <FormLabel>Suggested Price (RM)</FormLabel>
                <FormInput
                  type="number"
                  step="0.01"
                  value={formData.suggested_price}
                  onChange={(e) => setFormData({ ...formData, suggested_price: e.target.value })}
                  placeholder="0.00"
                />
              </UIFormGroup>
            </UIFormRow>

            <UIFormGroup>
              <FormLabel>Description</FormLabel>
              <FormTextArea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of the recipe..."
              />
            </UIFormGroup>

            {/* Ingredients Section */}
            <div>
              <SectionTitle>Ingredients</SectionTitle>
              <IngredientsList>
                {recipeIngredients.map((ri, index) => (
                  <IngredientRow key={index}>
                    <UIFormGroup>
                      <FormLabel>Ingredient</FormLabel>
                      <FormSelect
                        value={ri.ingredient_id}
                        onChange={(e) => updateIngredient(index, 'ingredient_id', parseInt(e.target.value))}
                        required
                      >
                        <option value={0}>Select ingredient...</option>
                        {ingredients.map(ing => (
                          <option key={ing.id} value={ing.id}>
                            {ing.name} (RM {Number(ing.unit_cost).toFixed(2)}/{ing.unit})
                          </option>
                        ))}
                      </FormSelect>
                    </UIFormGroup>
                    <UIFormGroup>
                      <FormLabel>Quantity</FormLabel>
                      <FormInput
                        type="number"
                        step="0.01"
                        value={ri.quantity}
                        onChange={(e) => updateIngredient(index, 'quantity', e.target.value)}
                        placeholder="0"
                        required
                      />
                    </UIFormGroup>
                    <UIFormGroup>
                      <FormLabel>Unit</FormLabel>
                      <FormInput
                        type="text"
                        value={ri.unit}
                        onChange={(e) => updateIngredient(index, 'unit', e.target.value)}
                        placeholder="kg/g/ml"
                        required
                      />
                    </UIFormGroup>
                    <UIFormGroup>
                      <FormLabel>Notes</FormLabel>
                      <FormInput
                        type="text"
                        value={ri.notes}
                        onChange={(e) => updateIngredient(index, 'notes', e.target.value)}
                        placeholder="Optional"
                      />
                    </UIFormGroup>
                    <RemoveButton type="button" onClick={() => removeIngredient(index)}>
                      ×
                    </RemoveButton>
                  </IngredientRow>
                ))}
              </IngredientsList>

              <AddButton type="button" onClick={addIngredient}>
                + Add Ingredient
              </AddButton>

              {recipeIngredients.length > 0 && (
                <CostSummary>
                  <CostSummaryLabel>Total Ingredient Cost</CostSummaryLabel>
                  <CostSummaryValue>RM {calculateTotalCost().toFixed(2)}</CostSummaryValue>
                </CostSummary>
              )}
            </div>

            {/* Action Buttons */}
            <ButtonGroup>
              <ModalButton type="button" variant="secondary" onClick={handleCloseModal}>
                Cancel
              </ModalButton>
              <ModalButton type="submit" variant="primary">
                {selectedRecipe ? 'Update Recipe' : 'Create Recipe'}
              </ModalButton>
            </ButtonGroup>
          </form>
      </Modal>
    </MainLayout>
  );
};

export default RecipesPage;
