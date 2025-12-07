import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import { useAuth } from '../../contexts/AuthContext';
import { Modal, ModalButton, FormGroup as UIFormGroup, FormLabel, FormInput, FormSelect, FormTextArea } from '../../components/UI/Modal';
import ImageUploadDropzone from '../../components/common/ImageUploadDropzone';
import ConfirmModal from '../../components/ConfirmModal';

interface RecipesTabProps {
  brandId: number | null;
  restaurantId?: number | null;
  onCountChange: (count: number) => void;
  categoryRefreshKey?: number;
}

interface Recipe {
  id: number;
  brand_id: number | null;
  restaurant_id: number | null;
  owner_type: 'brand' | 'restaurant';
  code: string | null;
  name: string;
  description: string | null;
  category: string;
  recipe_category_id: number | null;
  recipeCategory?: RecipeCategory;
  emoji: string | null;
  image: string | null;
  total_ingredient_cost: number;
  suggested_price: number | null;
  is_active: boolean;
  recipeIngredients?: RecipeIngredient[];
}

interface RecipeCategory {
  id: number;
  brand_id: number | null;
  restaurant_id: number | null;
  name: string;
  description: string | null;
  emoji: string | null;
  display_order: number;
  is_active: boolean;
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
  grid-template-columns: 3fr 1fr 0.7fr 2fr 40px;
  gap: 8px;
  align-items: end;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const RemoveButtonWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  padding-top: 22px;
`;

const RemoveButton = styled.button`
  background: #FEE2E2;
  color: #DC2626;
  border: 1px solid #FCA5A5;
  border-radius: 8px;
  padding: 10px 12px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 16px;
  line-height: 1;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;

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

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
`;

const RemoveTagButton = styled.button`
  background: none;
  border: none;
  color: #635BFF;
  cursor: pointer;
  padding: 0;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  line-height: 1;

  &:hover {
    color: #5A51E6;
  }
`;

const TagInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
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

const RecipesTab: React.FC<RecipesTabProps> = ({ brandId, restaurantId: propsRestaurantId, onCountChange, categoryRefreshKey }) => {
  const { user } = useAuth();
  // URL 파라미터의 restaurantId가 우선, 없으면 user.restaurant_id 또는 user.restaurantId 사용
  const effectiveRestaurantId = propsRestaurantId || user?.restaurant_id || user?.restaurantId;
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [recipeCategories, setRecipeCategories] = useState<RecipeCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    recipe_category_id: '',
    image: '',
    prep_time: '',
    cook_time: '',
    instructions: '',
    suggested_price: ''
  });
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [recipeIngredients, setRecipeIngredients] = useState<Array<{
    ingredient_id: number;
    quantity: string;
    unit: string;
    notes: string;
  }>>([]);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; recipeId: number | null; recipeName: string }>({
    isOpen: false,
    recipeId: null,
    recipeName: ''
  });

  const isRestaurantAdmin = user?.role === 'Restaurant Admin';
  // Restaurant Admin은 자신의 레시피만 수정/삭제 가능 (브랜드 레시피는 읽기전용)
  const isItemReadOnly = (item: Recipe) => isRestaurantAdmin && item.owner_type === 'brand';

  // Helper to get auth token
  const getToken = useCallback(() => localStorage.getItem('auth_token'), []);

  // Parallel fetch all data for performance
  useEffect(() => {
    const fetchAllData = async () => {
      if (!brandId && !effectiveRestaurantId) return;

      setLoading(true);
      const token = getToken();
      const isBrandRole = user?.role === 'Brand General' || user?.role === 'Brand Manager';

      try {
        const promises: Promise<any>[] = [];

        // Build URLs based on role
        let recipesUrl = '', ingredientsUrl = '', categoriesUrl = '', restaurantUrl = '';

        if (isBrandRole && brandId) {
          recipesUrl = `/api/brands/${brandId}/recipes`;
          ingredientsUrl = `/api/brands/${brandId}/ingredients`;
          categoriesUrl = `/api/brands/${brandId}/recipe-categories`;
        } else if (isRestaurantAdmin && effectiveRestaurantId) {
          recipesUrl = `/api/restaurants/${effectiveRestaurantId}/recipes`;
          ingredientsUrl = `/api/restaurants/${effectiveRestaurantId}/ingredients`;
          categoriesUrl = `/api/restaurants/${effectiveRestaurantId}/recipe-categories`;
          restaurantUrl = `/api/restaurants/${effectiveRestaurantId}`;
        }

        // Fetch all in parallel
        if (recipesUrl) {
          promises.push(
            fetch(recipesUrl, { headers: { 'Authorization': `Bearer ${token}` } }).then(r => r.json()),
            fetch(ingredientsUrl, { headers: { 'Authorization': `Bearer ${token}` } }).then(r => r.json()),
            fetch(categoriesUrl, { headers: { 'Authorization': `Bearer ${token}` } }).then(r => r.json())
          );
          if (restaurantUrl) {
            promises.push(fetch(restaurantUrl, { headers: { 'Authorization': `Bearer ${token}` } }).then(r => r.json()));
          }
        }

        const results = await Promise.all(promises);

        // Process recipes
        if (results[0]?.success) {
          if (Array.isArray(results[0].data)) {
            setRecipes(results[0].data);
          } else {
            setRecipes([...(results[0].data.brand_recipes || []), ...(results[0].data.own_recipes || [])]);
          }
        }

        // Process ingredients
        if (results[1]?.success) {
          setIngredients(results[1].data);
        }

        // Process categories
        if (results[2]?.success) {
          if (Array.isArray(results[2].data)) {
            setRecipeCategories(results[2].data.filter((c: RecipeCategory) => c.is_active));
          } else {
            const allCategories = [
              ...(results[2].data.own_categories || []),
              ...(results[2].data.brand_categories || [])
            ].filter((c: RecipeCategory) => c.is_active);
            setRecipeCategories(allCategories);
          }
        }

      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [brandId, effectiveRestaurantId, user?.role, getToken, isRestaurantAdmin]);

  // 카테고리가 변경되면 카테고리 목록을 새로 가져옴
  useEffect(() => {
    if (categoryRefreshKey && (brandId || effectiveRestaurantId)) {
      fetchRecipeCategories();
    }
  }, [categoryRefreshKey]);

  const fetchRecipeCategories = async () => {
    try {
      let url = '';
      if (user?.role === 'Brand General' || user?.role === 'Brand Manager') {
        if (brandId) {
          url = `/api/brands/${brandId}/recipe-categories`;
        }
      } else if (user?.role === 'Restaurant Admin') {
        if (effectiveRestaurantId) {
          url = `/api/restaurants/${effectiveRestaurantId}/recipe-categories`;
        }
      }

      if (!url) return;

      const token = localStorage.getItem('auth_token');
      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();

      if (data.success) {
        // Brand categories are in data.data array, restaurant may have own_categories and brand_categories
        if (Array.isArray(data.data)) {
          setRecipeCategories(data.data.filter((c: RecipeCategory) => c.is_active));
        } else {
          // Combine own and brand categories for restaurant
          const allCategories = [
            ...(data.data.own_categories || []),
            ...(data.data.brand_categories || [])
          ].filter((c: RecipeCategory) => c.is_active);
          setRecipeCategories(allCategories);
        }
      }
    } catch (error) {
      console.error('Failed to fetch recipe categories:', error);
    }
  };

  const fetchIngredients = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      let url = '';
      if (user?.role === 'Brand General' || user?.role === 'Brand Manager') {
        if (brandId) {
          url = `/api/brands/${brandId}/ingredients`;
        }
      } else if (user?.role === 'Restaurant Admin') {
        if (effectiveRestaurantId) {
          url = `/api/restaurants/${effectiveRestaurantId}/ingredients`;
        }
      }

      if (!url) return;

      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
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
        if (brandId) {
          url = `/api/brands/${brandId}/recipes`;
        }
      }
      // Restaurant Admin
      else if (user?.role === 'Restaurant Admin') {
        if (effectiveRestaurantId) {
          url = `/api/restaurants/${effectiveRestaurantId}/recipes`;
        }
      }

      if (!url) {
        setLoading(false);
        return;
      }

      const token = localStorage.getItem('auth_token');
      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
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

  const handleDeleteClick = (recipe: Recipe) => {
    setDeleteConfirm({
      isOpen: true,
      recipeId: recipe.id,
      recipeName: recipe.name
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm.recipeId) return;

    try {
      const token = getToken();
      let url = '';
      if (user?.role === 'Brand General' || user?.role === 'Brand Manager') {
        url = `/api/brands/${brandId}/recipes/${deleteConfirm.recipeId}`;
      } else if (user?.role === 'Restaurant Admin') {
        url = `/api/restaurants/${effectiveRestaurantId}/recipes/${deleteConfirm.recipeId}`;
      }

      const response = await fetch(url, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();

      if (data.success) {
        // Update local state immediately for instant feedback
        setRecipes(prev => prev.filter(r => r.id !== deleteConfirm.recipeId));
      } else {
        console.error('Delete failed:', data.error);
      }
    } catch (error) {
      console.error('Failed to delete recipe:', error);
    } finally {
      setDeleteConfirm({ isOpen: false, recipeId: null, recipeName: '' });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm({ isOpen: false, recipeId: null, recipeName: '' });
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleOpenModal = (recipe: Recipe | null) => {
    if (recipe) {
      // Edit mode
      setSelectedRecipe(recipe);
      setFormData({
        name: recipe.name,
        description: recipe.description || '',
        category: recipe.category,
        recipe_category_id: recipe.recipe_category_id?.toString() || '',
        image: recipe.image || '',
        prep_time: '',
        cook_time: '',
        instructions: '',
        suggested_price: recipe.suggested_price?.toString() || ''
      });
      setTags(recipe.category ? recipe.category.split(',').map(t => t.trim()) : []);
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
        recipe_category_id: '',
        image: '',
        prep_time: '',
        cook_time: '',
        instructions: '',
        suggested_price: ''
      });
      setTags([]);
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
      recipe_category_id: '',
      image: '',
      prep_time: '',
      cook_time: '',
      instructions: '',
      suggested_price: ''
    });
    setRecipeIngredients([]);
    setTags([]);
    setTagInput('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name) {
      alert('Recipe name is required');
      return;
    }

    try {
      let url = '';
      const method = selectedRecipe ? 'PUT' : 'POST';

      if (user?.role === 'Brand General' || user?.role === 'Brand Manager') {
        if (selectedRecipe) {
          url = `/api/brands/${brandId}/recipes/${selectedRecipe.id}`;
        } else {
          url = `/api/brands/${brandId}/recipes`;
        }
      } else if (user?.role === 'Restaurant Admin') {
        if (selectedRecipe) {
          url = `/api/restaurants/${effectiveRestaurantId}/recipes/${selectedRecipe.id}`;
        } else {
          url = `/api/restaurants/${effectiveRestaurantId}/recipes`;
        }
      }

      const token = localStorage.getItem('auth_token');
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          category: tags.length > 0 ? tags.join(', ') : '',
          recipe_category_id: formData.recipe_category_id ? parseInt(formData.recipe_category_id) : null,
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
        alert(data.error || 'Failed to save recipe');
      }
    } catch (error) {
      console.error('Failed to save recipe:', error);
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

    // 재료를 선택하면 자동으로 해당 재료의 unit을 설정
    if (field === 'ingredient_id') {
      const selectedIngredient = ingredients.find(ing => ing.id === value);
      if (selectedIngredient) {
        updated[index] = {
          ...updated[index],
          ingredient_id: value,
          unit: selectedIngredient.unit
        };
      } else {
        updated[index] = { ...updated[index], [field]: value };
      }
    } else {
      updated[index] = { ...updated[index], [field]: value };
    }

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
    const matchesCategory = selectedCategory === 'all' ||
      recipe.recipe_category_id?.toString() === selectedCategory ||
      recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories from recipeCategories list
  const filterCategories = [
    { id: 'all', name: 'All Categories' },
    ...recipeCategories.map(c => ({ id: c.id.toString(), name: c.name }))
  ];

  // Update count when recipes change
  useEffect(() => {
    onCountChange(recipes.length);
  }, [recipes.length, onCountChange]);

  return (
    <>
      <HeaderSection>
        <FilterBar style={{ marginBottom: 0, flex: 1 }}>
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
            {filterCategories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </FilterSelect>
        </FilterBar>

        <ThemedButton
          variant="primary"
          onClick={() => handleOpenModal(null)}
          style={{ whiteSpace: 'nowrap' }}
        >
          + New Recipe
        </ThemedButton>
      </HeaderSection>

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
              {recipe.image && (
                <div style={{
                  width: '100%',
                  height: '180px',
                  borderRadius: '8px 8px 0 0',
                  overflow: 'hidden',
                  marginBottom: '16px'
                }}>
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              )}

              <RecipeHeader>
                {recipe.emoji && <RecipeEmoji>{recipe.emoji}</RecipeEmoji>}
                <RecipeInfo>
                  <RecipeName>{recipe.name}</RecipeName>
                  <RecipeCategory>
                    {recipe.recipeCategory?.emoji} {recipe.recipeCategory?.name || recipe.category || 'Uncategorized'}
                  </RecipeCategory>
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

              {!isItemReadOnly(recipe) && (
                <RecipeActions>
                  <ActionButton
                    variant="secondary"
                    onClick={() => handleOpenModal(recipe)}
                  >
                    Edit
                  </ActionButton>
                  <ActionButton
                    variant="danger"
                    onClick={() => handleDeleteClick(recipe)}
                  >
                    Delete
                  </ActionButton>
                </RecipeActions>
              )}
            </RecipeCard>
          ))}
        </RecipesGrid>
      )}

      {/* Modal for create/edit */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={selectedRecipe ? 'Edit Recipe' : 'New Recipe'}
        size="medium"
      >
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Basic Information */}
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
              <FormLabel>Category</FormLabel>
              <FormSelect
                value={formData.recipe_category_id}
                onChange={(e) => setFormData({ ...formData, recipe_category_id: e.target.value })}
              >
                <option value="">Select category...</option>
                {recipeCategories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.emoji} {cat.name}
                  </option>
                ))}
              </FormSelect>
            </UIFormGroup>

            <UIFormGroup>
              <FormLabel>Recipe Image</FormLabel>
              <ImageUploadDropzone
                value={formData.image}
                onChange={(value) => setFormData({ ...formData, image: value })}
                label="Drop recipe image here or click to upload"
              />
            </UIFormGroup>

            <UIFormGroup>
              <FormLabel>Tags (Press Enter to add)</FormLabel>
              <TagInput
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="e.g., Main Dish, Spicy, Popular"
              />
              {tags.length > 0 && (
                <TagsContainer>
                  {tags.map(tag => (
                    <Tag key={tag}>
                      {tag}
                      <RemoveTagButton type="button" onClick={() => handleRemoveTag(tag)}>
                        ×
                      </RemoveTagButton>
                    </Tag>
                  ))}
                </TagsContainer>
              )}
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

            <UIFormGroup>
              <FormLabel>Description</FormLabel>
              <FormTextArea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of the recipe..."
              />
            </UIFormGroup>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <UIFormGroup>
                <FormLabel>Prep Time (minutes)</FormLabel>
                <FormInput
                  type="number"
                  value={formData.prep_time}
                  onChange={(e) => setFormData({ ...formData, prep_time: e.target.value })}
                  placeholder="e.g., 15"
                />
              </UIFormGroup>

              <UIFormGroup>
                <FormLabel>Cook Time (minutes)</FormLabel>
                <FormInput
                  type="number"
                  value={formData.cook_time}
                  onChange={(e) => setFormData({ ...formData, cook_time: e.target.value })}
                  placeholder="e.g., 30"
                />
              </UIFormGroup>
            </div>

            <UIFormGroup>
              <FormLabel>Cooking Instructions</FormLabel>
              <FormTextArea
                value={formData.instructions}
                onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                placeholder="Step-by-step cooking instructions..."
                rows={6}
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
                        readOnly
                        disabled
                        style={{ background: '#F3F4F6', cursor: 'not-allowed' }}
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
                    <RemoveButtonWrapper>
                      <RemoveButton type="button" onClick={() => removeIngredient(index)}>
                        ×
                      </RemoveButton>
                    </RemoveButtonWrapper>
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

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        title="Delete Recipe"
        message={`Are you sure you want to delete "${deleteConfirm.recipeName}"? This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </>
  );
};

export default RecipesTab;
