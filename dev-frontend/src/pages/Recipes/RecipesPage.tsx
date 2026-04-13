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
import { useAuth } from '../../contexts/AuthContext';
import { Modal, ModalButton, FormGroup as UIFormGroup, FormLabel, FormInput, FormSelect, FormTextArea, FormRow as UIFormRow } from '../../components/UI/Modal';
import { useBrandCurrency } from '../../hooks/useBrandCurrency';
import { formatCurrency, getCurrencySymbol } from '../../utils/currency';
import ConfirmModal from '../../components/ConfirmModal';

import { getAuthToken } from '../../utils/auth';
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
  from_brand?: boolean;
  editable?: boolean;
  prep_time?: number | null;
  cook_time?: number | null;
  instructions?: string | null;
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
  display: flex;
  flex-direction: column;

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

const CardSpacer = styled.div`
  flex: 1;
  min-height: 12px;
`;

const RecipeIngredients = styled.div`
  padding-top: 12px;
  border-top: 1px solid #E6EBF1;
`;

const IngredientsCount = styled.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 8px;
`;

const IngredientTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 6px;
`;

const IngredientTag = styled.span`
  display: inline-block;
  padding: 2px 8px;
  background: #F3F4F6;
  color: #4B5563;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
`;

const RecipeMetaInfo = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;
  padding: 10px;
  background: #FAFAFA;
  border-radius: 8px;
  font-size: 12px;
  color: #6B7280;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const InstructionsPreview = styled.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 8px;
  padding: 8px;
  background: #FFFBEB;
  border-radius: 6px;
  border-left: 3px solid #F59E0B;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const RecipeActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
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
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          color: #475569;
          &:hover {
            background: #F1F5F9;
            transform: translateY(-1px);
          }
        `;
    }
  }}
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
  const { defaultCurrency, supportedCurrencies } = useBrandCurrency();
  const [selectedCurrency, setSelectedCurrency] = useState<string>('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [canCreateRecipe, setCanCreateRecipe] = useState(true);
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
  const [viewMode, setViewMode] = useState(false);
  const [userBrandId, setUserBrandId] = useState<number | null>(null);

  // ConfirmModal states
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingRecipeId, setDeletingRecipeId] = useState<number | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [showRegisterConfirm, setShowRegisterConfirm] = useState(false);
  const [registeringRecipe, setRegisteringRecipe] = useState<Recipe | null>(null);
  const [registerError, setRegisterError] = useState<string | null>(null);

  // Set default currency when loaded
  useEffect(() => {
    if (defaultCurrency && !selectedCurrency) {
      setSelectedCurrency(defaultCurrency);
    }
  }, [defaultCurrency, selectedCurrency]);

  // Fetch user's brand_id for Brand General/Manager
  useEffect(() => {
    const fetchUserBrand = async () => {
      if (user?.role === 'Brand General' || user?.role === 'Brand Manager') {
        try {
          const response = await fetch('/api/brands');
          const data = await response.json();
          if (data.success && data.data.length > 0) {
            // Find brand where owner_id matches user.id
            const userBrand = data.data.find((b: any) => b.owner_id === user.id);
            if (userBrand) {
              setUserBrandId(userBrand.id);
            }
          }
        } catch (error) {
          console.error('Failed to fetch user brand:', error);
        }
      }
    };
    fetchUserBrand();
  }, [user]);

  // Fetch recipes and ingredients when userBrandId is set
  useEffect(() => {
    if (user?.role === 'Brand General' || user?.role === 'Brand Manager') {
      if (userBrandId) {
        fetchRecipes();
        fetchIngredients();
      }
    } else if (user?.role === 'Restaurant Admin') {
      fetchRecipes();
      fetchIngredients();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, userBrandId]);

  const fetchIngredients = async () => {
    try {
      let url = '';
      if (user?.role === 'Brand General' || user?.role === 'Brand Manager') {
        if (userBrandId) {
          url = `/api/brands/${userBrandId}/ingredients`;
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
        if (userBrandId) {
          url = `/api/brands/${userBrandId}/recipes`;
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
          console.log('=== RECIPES API RESPONSE ===');
          console.log('First recipe:', data.data[0]);
          console.log('prep_time:', data.data[0]?.prep_time);
          console.log('cook_time:', data.data[0]?.cook_time);
          console.log('instructions:', data.data[0]?.instructions);
          console.log('recipeIngredients:', data.data[0]?.recipeIngredients);
          setRecipes(data.data);
          setCanCreateRecipe(true); // Brand 유저는 항상 레시피 생성 가능
        } else {
          setRecipes([...data.data.brand_recipes, ...data.data.own_recipes]);
          // recipe_manager_type이 'brand'이면 레시피 생성 불가
          setCanCreateRecipe(data.data.recipe_manager_type !== 'brand');
        }
      }
    } catch (error) {
      console.error('Failed to fetch recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (recipeId: number) => {
    setDeleteError(null);
    setDeletingRecipeId(recipeId);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!deletingRecipeId) return;
    setShowDeleteConfirm(false);

    try {
      let url = '';
      if (user?.role === 'Brand General' || user?.role === 'Brand Manager') {
        url = `/api/brands/${userBrandId}/recipes/${deletingRecipeId}`;
      } else if (user?.role === 'Restaurant Admin') {
        url = `/api/restaurants/${user?.restaurant_id}/recipes/${deletingRecipeId}`;
      }

      const token = getAuthToken();
      const response = await fetch(url, {
        method: 'DELETE',
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      const data = await response.json();

      if (data.success) {
        fetchRecipes();
      }
    } catch (error) {
      console.error('Failed to delete recipe:', error);
      setDeleteError('Failed to delete recipe');
    } finally {
      setDeletingRecipeId(null);
    }
  };

  const handleOpenModal = (recipe: Recipe | null, isViewMode: boolean = false) => {
    setSubmitError(null);
    setViewMode(isViewMode);
    if (recipe) {
      // Edit or View mode
      setSelectedRecipe(recipe);
      setFormData({
        name: recipe.name,
        description: recipe.description || '',
        category: recipe.category,
        emoji: recipe.emoji || '',
        image: recipe.image || '',
        prep_time: recipe.prep_time?.toString() || '',
        cook_time: recipe.cook_time?.toString() || '',
        instructions: recipe.instructions || '',
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
    setViewMode(false);
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

  // Register recipe as menu item
  const handleRegisterAsMenu = (recipe: Recipe) => {
    if (!user?.restaurant_id) {
      setRegisterError('Restaurant ID is required to register menu');
      return;
    }
    setRegisterError(null);
    setRegisteringRecipe(recipe);
    setShowRegisterConfirm(true);
  };

  const confirmRegisterAsMenu = async () => {
    if (!registeringRecipe || !user?.restaurant_id) return;
    setShowRegisterConfirm(false);

    try {
      const response = await fetch('/api/menu/product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: registeringRecipe.name,
          description: registeringRecipe.description || '',
          price: registeringRecipe.suggested_price || 0,
          category: registeringRecipe.category,
          emoji: registeringRecipe.emoji || '',
          restaurant_id: user.restaurant_id,
          recipe_id: registeringRecipe.id
        })
      });

      const data = await response.json();

      if (!data.success) {
        setRegisterError(data.error || 'Failed to register menu item');
      }
    } catch (error) {
      console.error('Failed to register menu:', error);
      setRegisterError('Failed to register menu item');
    } finally {
      setRegisteringRecipe(null);
    }
  };

  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!formData.name || !formData.category) {
      setSubmitError('Recipe name and category are required');
      return;
    }

    try {
      let url = '';
      const method = selectedRecipe ? 'PUT' : 'POST';

      if (user?.role === 'Brand General' || user?.role === 'Brand Manager') {
        if (selectedRecipe) {
          url = `/api/brands/${userBrandId}/recipes/${selectedRecipe.id}`;
        } else {
          url = `/api/brands/${userBrandId}/recipes`;
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
          name: formData.name,
          description: formData.description,
          category: formData.category,
          emoji: formData.emoji,
          image: formData.image,
          prep_time: formData.prep_time ? parseInt(formData.prep_time) : null,
          cook_time: formData.cook_time ? parseInt(formData.cook_time) : null,
          instructions: formData.instructions || null,
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
        handleCloseModal();
        fetchRecipes();
      } else {
        setSubmitError(data.error || 'Failed to save recipe');
      }
    } catch (error) {
      console.error('Failed to save recipe:', error);
      setSubmitError('Failed to save recipe');
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
    <>
      <Container>
        <Header>
          <Title>{'Recipes'}</Title>
          <ActionSection>
            {canCreateRecipe && (
              <ThemedButton
                variant="primary"
                onClick={() => handleOpenModal(null)}
              >
                New Recipe
              </ThemedButton>
            )}
          </ActionSection>
        </Header>

        {/* Stats */}
        <StatsGrid>
          <StatCard>
            <StatLabel>{'Total Recipes'}</StatLabel>
            <StatValue>{recipes.length}</StatValue>
            <StatDescription>{activeRecipes} active</StatDescription>
          </StatCard>
          <StatCard>
            <StatLabel>{'Average Cost'}</StatLabel>
            <StatValue>{formatCurrency(avgCost, selectedCurrency || 'MYR')}</StatValue>
            <StatDescription>per recipe</StatDescription>
          </StatCard>
          <StatCard>
            <StatLabel>{'Total Value'}</StatLabel>
            <StatValue>{formatCurrency(totalCost, selectedCurrency || 'MYR')}</StatValue>
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
        </FilterBar>

        <Content>
          {/* Inline error messages */}
          {deleteError && (
            <div style={{ padding: '12px 16px', marginBottom: '16px', background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '8px', color: '#DC2626', fontSize: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {deleteError}
              <button onClick={() => setDeleteError(null)} style={{ background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer', fontSize: '18px' }}>&times;</button>
            </div>
          )}
          {registerError && (
            <div style={{ padding: '12px 16px', marginBottom: '16px', background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '8px', color: '#DC2626', fontSize: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {registerError}
              <button onClick={() => setRegisterError(null)} style={{ background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer', fontSize: '18px' }}>&times;</button>
            </div>
          )}

          {loading ? (
            <EmptyState>
              <EmptyTitle>{'Loading...'}</EmptyTitle>
            </EmptyState>
          ) : filteredRecipes.length === 0 ? (
            <EmptyState>
              <EmptyTitle>{'No recipes found'}</EmptyTitle>
              <EmptyDescription>
                {searchTerm || selectedCategory !== 'all'
                  ? 'Try adjusting your filters'
                  : canCreateRecipe
                    ? 'Create your first recipe to get started'
                    : 'Brand recipes will appear here when available'}
              </EmptyDescription>
              {!searchTerm && selectedCategory === 'all' && canCreateRecipe && (
                <ThemedButton
                  variant="primary"
                  onClick={() => handleOpenModal(null)}
                >
                  Create First Recipe
                </ThemedButton>
              )}
            </EmptyState>
          ) : (
            <RecipesGrid>
              {filteredRecipes.map(recipe => (
                <RecipeCard key={recipe.id} isActive={recipe.is_active} onClick={() => handleOpenModal(recipe, true)}>
                  <RecipeHeader>
                    {recipe.emoji && <RecipeEmoji>{recipe.emoji}</RecipeEmoji>}
                    <RecipeInfo>
                      <RecipeName>{recipe.name}</RecipeName>
                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <RecipeCategory>{recipe.category}</RecipeCategory>
                        {recipe.from_brand && (
                          <RecipeCategory style={{ background: '#FEF3C7', color: '#D97706' }}>
                            Brand
                          </RecipeCategory>
                        )}
                      </div>
                    </RecipeInfo>
                  </RecipeHeader>

                  {recipe.description && (
                    <RecipeDescription>{recipe.description}</RecipeDescription>
                  )}

                  <RecipeCosts>
                    <CostItem>
                      <CostLabel>{'Cost'}</CostLabel>
                      <CostValue>{formatCurrency(recipe.total_ingredient_cost || 0, selectedCurrency || 'MYR')}</CostValue>
                    </CostItem>
                    <CostItem>
                      <CostLabel>{'Suggested'}</CostLabel>
                      <CostValue>{formatCurrency(recipe.suggested_price || 0, selectedCurrency || 'MYR')}</CostValue>
                    </CostItem>
                  </RecipeCosts>

                  {/* Cook Time & Prep Time */}
                  {(recipe.prep_time || recipe.cook_time) && (
                    <RecipeMetaInfo>
                      {recipe.prep_time && (
                        <MetaItem>
                          <span>Prep:</span>
                          <strong>{recipe.prep_time} min</strong>
                        </MetaItem>
                      )}
                      {recipe.cook_time && (
                        <MetaItem>
                          <span>Cook:</span>
                          <strong>{recipe.cook_time} min</strong>
                        </MetaItem>
                      )}
                      {recipe.prep_time && recipe.cook_time && (
                        <MetaItem>
                          <span>Total:</span>
                          <strong>{recipe.prep_time + recipe.cook_time} min</strong>
                        </MetaItem>
                      )}
                    </RecipeMetaInfo>
                  )}

                  {/* Instructions Preview */}
                  {recipe.instructions && (
                    <InstructionsPreview>
                      {recipe.instructions}
                    </InstructionsPreview>
                  )}

                  <CardSpacer />
                  <RecipeIngredients>
                    <IngredientsCount>
                      {recipe.recipeIngredients?.length || 0} ingredients
                    </IngredientsCount>
                    {recipe.recipeIngredients && recipe.recipeIngredients.length > 0 && (
                      <IngredientTags>
                        {recipe.recipeIngredients.slice(0, 5).map((ri, idx) => (
                          <IngredientTag key={idx}>
                            {ri.ingredient?.name || `Ingredient #${ri.ingredient_id}`}
                          </IngredientTag>
                        ))}
                        {recipe.recipeIngredients.length > 5 && (
                          <IngredientTag style={{ background: '#E0E7FF', color: '#4F46E5' }}>
                            +{recipe.recipeIngredients.length - 5} more
                          </IngredientTag>
                        )}
                      </IngredientTags>
                    )}
                  </RecipeIngredients>

                  <RecipeActions onClick={(e) => e.stopPropagation()}>
                    {recipe.editable !== false && (
                      <>
                        <ActionButton
                          variant="primary"
                          onClick={() => handleOpenModal(recipe, false)}
                        >
                          Edit
                        </ActionButton>
                        <ActionButton
                          variant="danger"
                          onClick={() => handleDelete(recipe.id)}
                        >
                          Delete
                        </ActionButton>
                      </>
                    )}
                    {user?.restaurant_id && (
                      <ActionButton
                        variant="primary"
                        onClick={() => handleRegisterAsMenu(recipe)}
                        style={{ background: '#10B981' }}
                      >
                        + Menu
                      </ActionButton>
                    )}
                  </RecipeActions>
                </RecipeCard>
              ))}
            </RecipesGrid>
          )}
        </Content>
      </Container>

      {/* Modal for create/edit/view */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={viewMode ? 'Recipe Details' : (selectedRecipe ? 'Edit Recipe' : 'New Recipe')}
        size="large"
      >
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Basic Information */}
            <UIFormRow>
              <UIFormGroup>
                <FormLabel>Recipe Name {!viewMode && '*'}</FormLabel>
                <FormInput
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Nasi Lemak Special"
                  required={!viewMode}
                  disabled={viewMode}
                />
              </UIFormGroup>
              <UIFormGroup>
                <FormLabel>Category {!viewMode && '*'}</FormLabel>
                <FormInput
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g., Main Dish"
                  required={!viewMode}
                  disabled={viewMode}
                />
              </UIFormGroup>
            </UIFormRow>

            <UIFormRow>
              <UIFormGroup>
                <FormLabel>{'Emoji'}</FormLabel>
                <FormInput
                  type="text"
                  value={formData.emoji}
                  onChange={(e) => setFormData({ ...formData, emoji: e.target.value })}
                  placeholder="🍛"
                  maxLength={4}
                  disabled={viewMode}
                />
              </UIFormGroup>
              <UIFormGroup>
                <FormLabel>Suggested Price ({getCurrencySymbol(selectedCurrency || 'MYR')})</FormLabel>
                <FormInput
                  type="number"
                  step="0.01"
                  value={formData.suggested_price}
                  onChange={(e) => setFormData({ ...formData, suggested_price: e.target.value })}
                  placeholder="0.00"
                  disabled={viewMode}
                />
              </UIFormGroup>
            </UIFormRow>

            <UIFormRow>
              <UIFormGroup>
                <FormLabel>{'Prep Time (minutes)'}</FormLabel>
                <FormInput
                  type="number"
                  value={formData.prep_time}
                  onChange={(e) => setFormData({ ...formData, prep_time: e.target.value })}
                  placeholder="e.g., 15"
                  disabled={viewMode}
                />
              </UIFormGroup>
              <UIFormGroup>
                <FormLabel>{'Cook Time (minutes)'}</FormLabel>
                <FormInput
                  type="number"
                  value={formData.cook_time}
                  onChange={(e) => setFormData({ ...formData, cook_time: e.target.value })}
                  placeholder="e.g., 30"
                  disabled={viewMode}
                />
              </UIFormGroup>
            </UIFormRow>

            <UIFormGroup>
              <FormLabel>{'Description'}</FormLabel>
              <FormTextArea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of the recipe..."
                disabled={viewMode}
              />
            </UIFormGroup>

            <UIFormGroup>
              <FormLabel>{'Cooking Instructions'}</FormLabel>
              <FormTextArea
                value={formData.instructions}
                onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                placeholder="Step-by-step cooking instructions..."
                disabled={viewMode}
                style={{ minHeight: '100px' }}
              />
            </UIFormGroup>

            {/* Ingredients Section */}
            <div>
              <SectionTitle>{'Ingredients'}</SectionTitle>
              <IngredientsList>
                {recipeIngredients.map((ri, index) => (
                  <IngredientRow key={index}>
                    <UIFormGroup>
                      <FormLabel>{'Ingredient'}</FormLabel>
                      <FormSelect
                        value={ri.ingredient_id}
                        onChange={(e) => updateIngredient(index, 'ingredient_id', parseInt(e.target.value))}
                        required={!viewMode}
                        disabled={viewMode}
                      >
                        <option value={0}>{'Select ingredient...'}</option>
                        {ingredients.map(ing => (
                          <option key={ing.id} value={ing.id}>
                            {ing.name} ({formatCurrency(ing.unit_cost, selectedCurrency || 'MYR')}/{ing.unit})
                          </option>
                        ))}
                      </FormSelect>
                    </UIFormGroup>
                    <UIFormGroup>
                      <FormLabel>{'Quantity'}</FormLabel>
                      <FormInput
                        type="number"
                        step="0.01"
                        value={ri.quantity}
                        onChange={(e) => updateIngredient(index, 'quantity', e.target.value)}
                        placeholder="0"
                        required={!viewMode}
                        disabled={viewMode}
                      />
                    </UIFormGroup>
                    <UIFormGroup>
                      <FormLabel>{'Unit'}</FormLabel>
                      <FormInput
                        type="text"
                        value={ri.unit}
                        onChange={(e) => updateIngredient(index, 'unit', e.target.value)}
                        placeholder="kg/g/ml"
                        required={!viewMode}
                        disabled={viewMode}
                      />
                    </UIFormGroup>
                    <UIFormGroup>
                      <FormLabel>{'Notes'}</FormLabel>
                      <FormInput
                        type="text"
                        value={ri.notes}
                        onChange={(e) => updateIngredient(index, 'notes', e.target.value)}
                        placeholder="Optional"
                        disabled={viewMode}
                      />
                    </UIFormGroup>
                    {!viewMode && (
                      <RemoveButton type="button" onClick={() => removeIngredient(index)}>
                        ×
                      </RemoveButton>
                    )}
                  </IngredientRow>
                ))}
              </IngredientsList>

              {!viewMode && (
                <AddButton type="button" onClick={addIngredient}>
                  Add Ingredient
                </AddButton>
              )}

              {recipeIngredients.length > 0 && (
                <CostSummary>
                  <CostSummaryLabel>{'Total Ingredient Cost'}</CostSummaryLabel>
                  <CostSummaryValue>{formatCurrency(calculateTotalCost(), selectedCurrency || 'MYR')}</CostSummaryValue>
                </CostSummary>
              )}
            </div>

            {/* Error Display */}
            {submitError && (
              <div style={{ padding: '12px 16px', background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '8px', color: '#DC2626', fontSize: '14px' }}>
                {submitError}
              </div>
            )}

            {/* Action Buttons */}
            <ButtonGroup>
              <ModalButton type="button" variant="secondary" onClick={handleCloseModal}>
                {viewMode ? 'Close' : 'Cancel'}
              </ModalButton>
              {!viewMode && (
                <ModalButton type="submit" variant="primary">
                  {selectedRecipe ? 'Update Recipe' : 'Create Recipe'}
                </ModalButton>
              )}
              {viewMode && user?.restaurant_id && selectedRecipe && (
                <ModalButton
                  type="button"
                  variant="primary"
                  onClick={() => {
                    handleCloseModal();
                    handleRegisterAsMenu(selectedRecipe);
                  }}
                  style={{ background: '#10B981' }}
                >
                  + Register as Menu
                </ModalButton>
              )}
            </ButtonGroup>
          </form>
      </Modal>

      {/* Delete Recipe Confirm Modal */}
      <ConfirmModal
        isOpen={showDeleteConfirm}
        title="Delete Recipe"
        message="Are you sure you want to delete this recipe?"
        onConfirm={confirmDelete}
        onCancel={() => { setShowDeleteConfirm(false); setDeletingRecipeId(null); }}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />

      {/* Register as Menu Confirm Modal */}
      <ConfirmModal
        isOpen={showRegisterConfirm}
        title="Register as Menu Item"
        message={`Register "${registeringRecipe?.name}" as a menu item?`}
        onConfirm={confirmRegisterAsMenu}
        onCancel={() => { setShowRegisterConfirm(false); setRegisteringRecipe(null); }}
        confirmText="Register"
        cancelText="Cancel"
        type="info"
      />
    </>
  );
};

export default RecipesPage;
