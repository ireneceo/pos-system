import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { EmptyState } from '../../components/UI/TableComponents';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import { useAuth } from '../../contexts/AuthContext';
import { Modal, ModalButton, FormGroup as UIFormGroup, FormLabel, FormInput, FormSelect, FormTextArea } from '../../components/UI/Modal';
import ImageUploadDropzone from '../../components/Common/ImageUploadDropzone';
import SearchableSelect from '../../components/Common/SearchableSelect';
import ConfirmModal from '../../components/ConfirmModal';
import { useBrandCurrency } from '../../hooks/useBrandCurrency';
import { formatCurrency, getCurrencySymbol } from '../../utils/currency';
import { STANDARD_UNITS, calculateIngredientCost, calculateCostPerUnit } from '../../utils/unitConversion';

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
  yield_amount: number;
  yield_unit: string;
  total_ingredient_cost: number;
  restaurant_ingredient_cost: number | null;
  effective_ingredient_cost: number;
  suggested_price: number | null;
  prep_time: number | null;
  cook_time: number | null;
  instructions: string | null;
  instructions_summary: string | null;
  instructions_detail: string | null;
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
  base_quantity: number;
  unit_cost: number;
  restaurant_cost: number | null;
  effective_cost: number;
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
  brand_cost: number;
  effective_cost: number;
  notes: string | null;
  ingredient?: Ingredient;
}

const RecipesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  margin-top: 24px;
  align-items: start;
`;

const RecipeCard = styled.div<{ isActive?: boolean }>`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  padding: 20px;
  transition: all 0.2s;
  opacity: ${props => props.isActive !== false ? 1 : 0.6};
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

const RecipeCategoryBadge = styled.div`
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

const BrandBadge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  background: #FEF3C7;
  color: #92400E;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  margin-left: 8px;
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
  white-space: pre-wrap;
`;

// View Mode Styles
const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ViewHeader = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-start;
`;

const ViewImage = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ViewEmoji = styled.div`
  font-size: 80px;
  line-height: 1;
`;

const ViewTitleSection = styled.div`
  flex: 1;
`;

const ViewTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #0A2540;
  margin: 0 0 8px 0;
`;

const ViewCategoryBadge = styled.span`
  display: inline-block;
  padding: 6px 12px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
`;

const ViewDescription = styled.p`
  font-size: 15px;
  color: #6B7280;
  margin: 16px 0 0 0;
  line-height: 1.6;
`;

const ViewSection = styled.div`
  padding: 0;
  margin-bottom: 8px;
`;

const ViewSectionTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 12px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #E5E7EB;
`;

const ViewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ViewGridItem = styled.div`
  text-align: center;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 12px;
`;

const ViewGridLabel = styled.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
`;

const ViewGridValue = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`;

const ViewInstructions = styled.div`
  font-size: 15px;
  color: #374151;
  line-height: 1.8;
  white-space: pre-wrap;
`;

const ViewIngredientTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #E6EBF1;
  }

  th {
    font-size: 12px;
    font-weight: 600;
    color: #6B7280;
    text-transform: uppercase;
  }

  td {
    font-size: 14px;
    color: #374151;
  }

  /* Subtotal column right-align */
  th:last-child, td:last-child {
    text-align: right;
  }

  tr:last-child td {
    border-bottom: none;
  }
`;

const ViewTotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  margin-top: 12px;
  border-top: 1px solid #E5E7EB;
  font-weight: 600;

  span:first-child {
    color: #6B7280;
  }

  span:last-child {
    color: #635BFF;
    font-size: 16px;
  }
`;

const RecipeActions = styled.div`
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

const IngredientHeaderRow = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 0.7fr 2fr 40px;
  gap: 8px;
  padding: 8px 0;
  margin-bottom: 8px;
  border-bottom: 1px solid #E5E7EB;

  span {
    font-size: 13px;
    font-weight: 600;
    color: #6B7280;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const IngredientRow = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 0.7fr 2fr 40px;
  gap: 8px;
  align-items: center;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const RemoveButton = styled.button`
  background: #FEE2E2;
  color: #DC2626;
  border: 1px solid #FCA5A5;
  border-radius: 8px;
  width: 38px;
  height: 38px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 18px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

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
  margin-bottom: 16px;

  &:hover {
    background: #E0E7FF;
  }
`;

const CostSummary = styled.div`
  padding: 16px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #E5E7EB;
`;

const CostSummaryLabel = styled.div`
  font-size: 14px;
  color: #6B7280;
  font-weight: 600;
`;

const CostSummaryValue = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
`;

const ErrorMessage = styled.div`
  background: #FEF2F2;
  border: 1px solid #FECACA;
  color: #DC2626;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 16px;
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

// Recipe Modal Styles (Cooking-focused popup)
const RecipeModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow-y: auto;
  padding: 40px 0;
  z-index: 1000;
`;

const RecipeModalContent = styled.div`
  background: white;
  border-radius: 16px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
`;

const RecipeModalHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const RecipeModalTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`;

const RecipeModalClose = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #6B7280;
  cursor: pointer;
  padding: 4px;
  line-height: 1;

  &:hover {
    color: #0A2540;
  }
`;

const RecipeModalBody = styled.div`
  padding: 24px;
`;

const RecipeTimeRow = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 12px;
`;

const RecipeTimeItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RecipeTimeIcon = styled.span`
  font-size: 20px;
`;

const RecipeTimeLabel = styled.span`
  font-size: 14px;
  color: #6B7280;
`;

const RecipeTimeValue = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`;

const RecipeSection = styled.div`
  margin-bottom: 24px;
`;

const RecipeSectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 12px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #E5E7EB;
`;

const RecipeIngredientList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const RecipeIngredientItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`;

const RecipeIngredientName = styled.span`
  font-size: 15px;
  color: #0A2540;
`;

const RecipeIngredientQty = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: #635BFF;
`;

const RecipeSummaryText = styled.p`
  font-size: 15px;
  color: #4B5563;
  line-height: 1.8;
  margin: 0;
  white-space: pre-wrap;
`;

const RecipeDetailText = styled.div`
  font-size: 15px;
  color: #374151;
  line-height: 1.8;
  white-space: pre-wrap;
`;

const RecipesTab: React.FC<RecipesTabProps> = ({ brandId, restaurantId: propsRestaurantId, onCountChange, categoryRefreshKey }) => {
  const { user } = useAuth();
  const { defaultCurrency } = useBrandCurrency();
  const [selectedCurrency, setSelectedCurrency] = useState<string>('RM');
  // URL 파라미터의 restaurantId가 우선, 없으면 user.restaurant_id 또는 user.restaurantId 사용
  const effectiveRestaurantId = propsRestaurantId || user?.restaurant_id || user?.restaurantId;
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [recipeCategories, setRecipeCategories] = useState<RecipeCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (defaultCurrency) {
      setSelectedCurrency(defaultCurrency);
    }
  }, [defaultCurrency]);

  // Get initial search term from URL parameter
  const getInitialSearchTerm = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('search') || '';
  };
  const [searchTerm, setSearchTerm] = useState(getInitialSearchTerm);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    recipe_category_id: '',
    image: '',
    yield_amount: '1',
    yield_unit: 'portion',
    prep_time: '',
    cook_time: '',
    instructions: '',
    instructions_summary: '',
    instructions_detail: '',
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
  const [formError, setFormError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState(false);
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [recipeModalData, setRecipeModalData] = useState<Recipe | null>(null);

  const isRestaurantAdmin = user?.role === 'Restaurant Admin';
  // Restaurant Admin은 자신의 레시피만 수정/삭제 가능 (브랜드 레시피는 읽기전용)
  const isItemReadOnly = (item: Recipe) => isRestaurantAdmin && item.owner_type === 'brand';
  // 뷰 모달에서 브랜드 레시피 코스트 비교 표시 여부
  const isBrandRecipeView = isRestaurantAdmin && selectedRecipe?.owner_type === 'brand';

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
        let recipesUrl = '', ingredientsUrl = '', categoriesUrl = '';

        if (isBrandRole && brandId) {
          recipesUrl = `/api/brands/${brandId}/recipes`;
          ingredientsUrl = `/api/brands/${brandId}/ingredients`;
          categoriesUrl = `/api/brands/${brandId}/recipe-categories`;
        } else if (isRestaurantAdmin && effectiveRestaurantId) {
          recipesUrl = `/api/restaurants/${effectiveRestaurantId}/recipes`;
          ingredientsUrl = `/api/restaurants/${effectiveRestaurantId}/ingredients`;
          categoriesUrl = `/api/restaurants/${effectiveRestaurantId}/recipe-categories`;
        }

        // Fetch all in parallel
        if (recipesUrl) {
          promises.push(
            fetch(recipesUrl, { headers: { 'Authorization': `Bearer ${token}` } }).then(r => r.json()),
            fetch(ingredientsUrl, { headers: { 'Authorization': `Bearer ${token}` } }).then(r => r.json()),
            fetch(categoriesUrl, { headers: { 'Authorization': `Bearer ${token}` } }).then(r => r.json())
          );
          // 레스토랑 관리자일 경우 브랜드 데이터도 함께 조회
          if (isRestaurantAdmin && effectiveRestaurantId) {
            promises.push(
              fetch(`/api/restaurants/${effectiveRestaurantId}/brand-recipes`, { headers: { 'Authorization': `Bearer ${token}` } }).then(r => r.json()),
              fetch(`/api/restaurants/${effectiveRestaurantId}/brand-ingredients`, { headers: { 'Authorization': `Bearer ${token}` } }).then(r => r.json())
            );
          }
        }

        const results = await Promise.all(promises);

        // Process recipes
        if (results[0]?.success) {
          let allRecipes = Array.isArray(results[0].data) ? results[0].data : [];

          // 레스토랑 관리자일 경우 브랜드 레시피 추가
          if (isRestaurantAdmin && results[3]?.success && Array.isArray(results[3].data)) {
            allRecipes = [...results[3].data, ...allRecipes]; // 브랜드 레시피를 먼저 표시
          }

          setRecipes(allRecipes);
        }

        // Process ingredients
        if (results[1]?.success) {
          let allIngredients = Array.isArray(results[1].data) ? results[1].data : [];

          // 레스토랑 관리자일 경우 브랜드 재료 추가
          if (isRestaurantAdmin && results[4]?.success && Array.isArray(results[4].data)) {
            allIngredients = [...results[4].data, ...allIngredients]; // 브랜드 재료를 먼저 표시
          }

          setIngredients(allIngredients);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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


  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('auth_token');

      // Brand General/Manager
      if (user?.role === 'Brand General' || user?.role === 'Brand Manager') {
        if (brandId) {
          const response = await fetch(`/api/brands/${brandId}/recipes`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const data = await response.json();
          if (data.success) {
            setRecipes(data.data);
          }
        }
      }
      // Restaurant Admin - 자체 레시피 + 브랜드 레시피 함께 조회
      else if (user?.role === 'Restaurant Admin' && effectiveRestaurantId) {
        const [ownRes, brandRes] = await Promise.all([
          fetch(`/api/restaurants/${effectiveRestaurantId}/recipes`, {
            headers: { 'Authorization': `Bearer ${token}` }
          }).then(r => r.json()),
          fetch(`/api/restaurants/${effectiveRestaurantId}/brand-recipes`, {
            headers: { 'Authorization': `Bearer ${token}` }
          }).then(r => r.json())
        ]);

        let allRecipes: Recipe[] = [];
        if (brandRes.success && Array.isArray(brandRes.data)) {
          allRecipes = [...brandRes.data];
        }
        if (ownRes.success && Array.isArray(ownRes.data)) {
          allRecipes = [...allRecipes, ...ownRes.data];
        }
        setRecipes(allRecipes);
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

  const handleOpenModal = (recipe: Recipe | null, isViewMode: boolean = false) => {
    setFormError(null);
    setViewMode(isViewMode);
    if (recipe) {
      // Edit or View mode
      setSelectedRecipe(recipe);
      setFormData({
        name: recipe.name,
        description: recipe.description || '',
        category: recipe.category,
        recipe_category_id: recipe.recipe_category_id?.toString() || '',
        image: recipe.image || '',
        yield_amount: recipe.yield_amount?.toString() || '1',
        yield_unit: recipe.yield_unit || 'portion',
        prep_time: recipe.prep_time?.toString() || '',
        cook_time: recipe.cook_time?.toString() || '',
        instructions: recipe.instructions || '',
        instructions_summary: recipe.instructions_summary || '',
        instructions_detail: recipe.instructions_detail || '',
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
        yield_amount: '1',
        yield_unit: 'portion',
        prep_time: '',
        cook_time: '',
        instructions: '',
        instructions_summary: '',
        instructions_detail: '',
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
    setViewMode(false);
    setFormError(null);
    setFormData({
      name: '',
      description: '',
      category: '',
      recipe_category_id: '',
      image: '',
      yield_amount: '1',
      yield_unit: 'portion',
      prep_time: '',
      cook_time: '',
      instructions: '',
      instructions_summary: '',
      instructions_detail: '',
      suggested_price: ''
    });
    setRecipeIngredients([]);
    setTags([]);
    setTagInput('');
  };

  const handleOpenRecipeModal = (recipe: Recipe) => {
    setRecipeModalData(recipe);
    setShowRecipeModal(true);
  };

  const handleCloseRecipeModal = () => {
    setShowRecipeModal(false);
    setRecipeModalData(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!formData.name) {
      setFormError('Recipe name is required');
      return;
    }

    if (!formData.yield_amount || parseFloat(formData.yield_amount) <= 0) {
      setFormError('Yield amount must be greater than 0');
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
          yield_amount: parseFloat(formData.yield_amount) || 1,
          yield_unit: formData.yield_unit || 'portion',
          suggested_price: parseFloat(formData.suggested_price) || 0,
          ingredients: recipeIngredients.map(ri => {
            const ingredient = ingredients.find(ing => ing.id === ri.ingredient_id);
            // 단위 변환을 고려한 비용 계산
            const cost = ingredient
              ? calculateIngredientCost(
                  ingredient.unit_cost / (ingredient.base_quantity || 1),
                  ingredient.unit,
                  parseFloat(ri.quantity),
                  ri.unit
                ) || 0
              : 0;
            return {
              ingredient_id: ri.ingredient_id,
              quantity: parseFloat(ri.quantity),
              unit: ri.unit,
              cost,
              notes: ri.notes
            };
          })
        })
      });

      const data = await response.json();

      if (data.success) {
        handleCloseModal();
        fetchRecipes();
      } else {
        setFormError(data.error || 'Failed to save recipe');
      }
    } catch (error) {
      console.error('Failed to save recipe:', error);
      setFormError('Failed to save recipe');
    }
  };

  const addIngredient = () => {
    setRecipeIngredients([...recipeIngredients, {
      ingredient_id: 0,
      quantity: '',
      unit: '', // Empty until ingredient selected
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
        // effective_cost(restaurant override or brand cost) 사용, fallback to unit_cost
        const unitCost = ingredient.effective_cost ?? ingredient.unit_cost;
        const baseQty = ingredient.base_quantity || 1;
        const costPerUnit = parseFloat(unitCost.toString()) / baseQty;
        return sum + (parseFloat(ri.quantity) * costPerUnit);
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
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
        <ThemedButton variant="primary" onClick={() => handleOpenModal(null)} style={{ flexShrink: 0 }}>
          New Recipe
        </ThemedButton>
      </div>

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
              Create First Recipe
            </ThemedButton>
          )}
        </EmptyState>
      ) : (
        <RecipesGrid>
          {filteredRecipes.map(recipe => (
            <RecipeCard
              key={recipe.id}
              isActive={recipe.is_active}
              onClick={() => handleOpenModal(recipe, true)}
            >
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
                <RecipeInfo>
                  <RecipeName>
                    {recipe.name}
                    {isRestaurantAdmin && recipe.owner_type === 'brand' && (
                      <BrandBadge>Brand</BrandBadge>
                    )}
                  </RecipeName>
                  <RecipeCategoryBadge>
                    {recipe.recipeCategory?.emoji} {recipe.recipeCategory?.name || recipe.category || 'Uncategorized'}
                  </RecipeCategoryBadge>
                </RecipeInfo>
              </RecipeHeader>

              {recipe.description && (
                <RecipeDescription>{recipe.description}</RecipeDescription>
              )}

              <RecipeCosts>
                {isRestaurantAdmin && recipe.owner_type === 'brand' && recipe.restaurant_ingredient_cost !== null ? (
                  <>
                    <CostItem>
                      <CostLabel style={{ color: '#6B7280' }}>Brand Cost</CostLabel>
                      <CostValue style={{ color: '#6B7280', textDecoration: 'line-through', fontSize: '13px' }}>
                        {formatCurrency(Number(recipe.total_ingredient_cost || 0), selectedCurrency)}
                      </CostValue>
                    </CostItem>
                    <CostItem>
                      <CostLabel style={{ color: '#2563EB' }}>My Cost</CostLabel>
                      <CostValue style={{ color: '#2563EB', fontWeight: 700 }}>
                        {formatCurrency(Number(recipe.effective_ingredient_cost || 0), selectedCurrency)}
                      </CostValue>
                    </CostItem>
                  </>
                ) : (
                  <CostItem>
                    <CostLabel>Cost</CostLabel>
                    <CostValue>
                      {formatCurrency(Number(
                        isRestaurantAdmin && recipe.owner_type === 'brand'
                          ? (recipe.effective_ingredient_cost || recipe.total_ingredient_cost || 0)
                          : (recipe.total_ingredient_cost || 0)
                      ), selectedCurrency)}
                    </CostValue>
                  </CostItem>
                )}
                <CostItem>
                  <CostLabel>Suggested</CostLabel>
                  <CostValue>{formatCurrency(Number(recipe.suggested_price || 0), selectedCurrency)}</CostValue>
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
                </RecipeMetaInfo>
              )}

              {/* Recipe Summary Preview */}
              {recipe.instructions_summary && (
                <InstructionsPreview>
                  {recipe.instructions_summary}
                </InstructionsPreview>
              )}

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
                <ActionButton
                  variant="secondary"
                  onClick={() => handleOpenRecipeModal(recipe)}
                >
                  Recipe
                </ActionButton>
                {!isItemReadOnly(recipe) && (
                  <>
                    <ActionButton
                      variant="primary"
                      onClick={() => handleOpenModal(recipe, false)}
                    >
                      Edit
                    </ActionButton>
                    <ActionButton
                      variant="danger"
                      onClick={() => handleDeleteClick(recipe)}
                    >
                      Delete
                    </ActionButton>
                  </>
                )}
              </RecipeActions>
            </RecipeCard>
          ))}
        </RecipesGrid>
      )}

      {/* Modal for create/edit/view */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={viewMode ? 'Recipe Details' : (selectedRecipe ? 'Edit Recipe' : 'New Recipe')}
        size={viewMode ? 'large' : 'medium'}
      >
        {viewMode && selectedRecipe ? (
          /* View Mode - Clean readable layout */
          <ViewContainer>
            {/* Header with image and title */}
            <ViewHeader>
              <ViewImage>
                {formData.image ? (
                  <img src={formData.image} alt={formData.name} />
                ) : (
                  <ViewEmoji>{selectedRecipe.emoji || '🍽️'}</ViewEmoji>
                )}
              </ViewImage>
              <ViewTitleSection>
                <ViewTitle>{formData.name}</ViewTitle>
                <ViewCategoryBadge>
                  {selectedRecipe.recipeCategory?.emoji} {selectedRecipe.recipeCategory?.name || formData.category || 'Uncategorized'}
                </ViewCategoryBadge>
                {formData.description && (
                  <ViewDescription>{formData.description}</ViewDescription>
                )}
              </ViewTitleSection>
            </ViewHeader>

            {/* Cost & Time Info */}
            <ViewSection>
              <ViewSectionTitle>Cost & Time</ViewSectionTitle>
              <ViewGrid>
                {isRestaurantAdmin && selectedRecipe.owner_type === 'brand' && selectedRecipe.restaurant_ingredient_cost !== null ? (
                  <>
                    <ViewGridItem>
                      <ViewGridLabel style={{ color: '#6B7280' }}>Brand Cost</ViewGridLabel>
                      <ViewGridValue style={{ color: '#6B7280', textDecoration: 'line-through', fontSize: '14px' }}>
                        {formatCurrency(Number(selectedRecipe.total_ingredient_cost || 0), selectedCurrency)}
                      </ViewGridValue>
                    </ViewGridItem>
                    <ViewGridItem>
                      <ViewGridLabel style={{ color: '#2563EB' }}>My Cost</ViewGridLabel>
                      <ViewGridValue style={{ color: '#2563EB', fontWeight: 700 }}>
                        {formatCurrency(Number(selectedRecipe.effective_ingredient_cost || 0), selectedCurrency)}
                      </ViewGridValue>
                    </ViewGridItem>
                  </>
                ) : (
                  <ViewGridItem>
                    <ViewGridLabel>Ingredient Cost</ViewGridLabel>
                    <ViewGridValue>{formatCurrency(Number(
                      isRestaurantAdmin && selectedRecipe.owner_type === 'brand'
                        ? (selectedRecipe.effective_ingredient_cost || selectedRecipe.total_ingredient_cost || 0)
                        : (selectedRecipe.total_ingredient_cost || 0)
                    ), selectedCurrency)}</ViewGridValue>
                  </ViewGridItem>
                )}
                <ViewGridItem>
                  <ViewGridLabel>Suggested Price</ViewGridLabel>
                  <ViewGridValue>{formatCurrency(Number(formData.suggested_price || 0), selectedCurrency)}</ViewGridValue>
                </ViewGridItem>
                {formData.prep_time && (
                  <ViewGridItem>
                    <ViewGridLabel>Prep Time</ViewGridLabel>
                    <ViewGridValue>{formData.prep_time} min</ViewGridValue>
                  </ViewGridItem>
                )}
                {formData.cook_time && (
                  <ViewGridItem>
                    <ViewGridLabel>Cook Time</ViewGridLabel>
                    <ViewGridValue>{formData.cook_time} min</ViewGridValue>
                  </ViewGridItem>
                )}
              </ViewGrid>
            </ViewSection>

            {/* Ingredients */}
            {recipeIngredients.length > 0 && (
              <ViewSection>
                <ViewSectionTitle>Ingredients ({recipeIngredients.length})</ViewSectionTitle>
                <ViewIngredientTable>
                  <thead>
                    <tr>
                      <th>Ingredient</th>
                      <th>Quantity</th>
                      <th>Unit Cost</th>
                      {isBrandRecipeView && <th>My Cost</th>}
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recipeIngredients.map((ri, idx) => {
                      const ingredient = ingredients.find(ing => ing.id === ri.ingredient_id);
                      const baseQty = ingredient?.base_quantity || 1;
                      const brandCostPerUnit = (ingredient?.unit_cost || 0) / baseQty;
                      const effectiveUnitCost = ingredient?.effective_cost ?? ingredient?.unit_cost ?? 0;
                      const effectiveCostPerUnit = effectiveUnitCost / baseQty;
                      const subtotal = parseFloat(ri.quantity) * effectiveCostPerUnit;
                      const hasOverride = ingredient?.restaurant_cost !== null && ingredient?.restaurant_cost !== undefined;
                      return (
                        <tr key={idx}>
                          <td><strong>{ingredient?.name || `Ingredient #${ri.ingredient_id}`}</strong></td>
                          <td>{Number(ri.quantity).toFixed(2)} {ri.unit}</td>
                          <td style={isBrandRecipeView && hasOverride ? { color: '#6B7280', textDecoration: 'line-through' } : {}}>
                            {getCurrencySymbol(selectedCurrency)} {brandCostPerUnit.toFixed(2)}/{ingredient?.unit}
                          </td>
                          {isBrandRecipeView && (
                            <td style={hasOverride ? { color: '#2563EB', fontWeight: 600 } : { color: '#9CA3AF' }}>
                              {hasOverride
                                ? `${getCurrencySymbol(selectedCurrency)} ${effectiveCostPerUnit.toFixed(2)}/${ingredient?.unit}`
                                : '-'
                              }
                            </td>
                          )}
                          <td>{formatCurrency(subtotal, selectedCurrency)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </ViewIngredientTable>
                <ViewTotalRow>
                  <span>Total Ingredient Cost</span>
                  <span>{formatCurrency(calculateTotalCost(), selectedCurrency)}</span>
                </ViewTotalRow>
              </ViewSection>
            )}

            {/* Recipe Summary */}
            {(formData.instructions_summary || formData.instructions) && (
              <ViewSection>
                <ViewSectionTitle>Recipe Summary</ViewSectionTitle>
                <ViewInstructions>
                  {formData.instructions_summary || formData.instructions}
                </ViewInstructions>
              </ViewSection>
            )}

            {/* Detailed Instructions */}
            {formData.instructions_detail && (
              <ViewSection>
                <ViewSectionTitle>Detailed Instructions</ViewSectionTitle>
                <ViewInstructions>{formData.instructions_detail}</ViewInstructions>
              </ViewSection>
            )}

            {/* Action Buttons */}
            <ButtonGroup>
              <ModalButton type="button" variant="secondary" onClick={handleCloseModal}>
                Close
              </ModalButton>
              {!isItemReadOnly(selectedRecipe) && (
                <ModalButton
                  type="button"
                  variant="primary"
                  onClick={() => setViewMode(false)}
                >
                  Edit
                </ModalButton>
              )}
            </ButtonGroup>
          </ViewContainer>
        ) : (
          /* Edit/Create Mode - Form layout */
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
              <FormLabel>Suggested Price ({selectedCurrency})</FormLabel>
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
              <FormLabel>Recipe Summary</FormLabel>
              <FormTextArea
                value={formData.instructions_summary}
                onChange={(e) => setFormData({ ...formData, instructions_summary: e.target.value })}
                placeholder="Brief summary for list display (e.g., Pan-fried chicken with garlic sauce)"
                rows={2}
              />
            </UIFormGroup>

            <UIFormGroup>
              <FormLabel>Detailed Instructions</FormLabel>
              <FormTextArea
                value={formData.instructions_detail}
                onChange={(e) => setFormData({ ...formData, instructions_detail: e.target.value })}
                placeholder="Step-by-step cooking instructions...
1. Prepare ingredients...
2. Heat the pan...
3. ..."
                rows={8}
              />
            </UIFormGroup>

            {/* Yield Section */}
            <div>
              <SectionTitle>Yield (Production Amount)</SectionTitle>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <UIFormGroup>
                  <FormLabel>Yield Amount *</FormLabel>
                  <FormInput
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={formData.yield_amount}
                    onChange={(e) => setFormData({ ...formData, yield_amount: e.target.value })}
                    placeholder="e.g., 10"
                    required
                  />
                </UIFormGroup>
                <UIFormGroup>
                  <FormLabel>Yield Unit *</FormLabel>
                  <FormSelect
                    value={formData.yield_unit}
                    onChange={(e) => setFormData({ ...formData, yield_unit: e.target.value })}
                  >
                    {STANDARD_UNITS.map(u => (
                      <option key={u.value} value={u.value}>{u.label}</option>
                    ))}
                  </FormSelect>
                </UIFormGroup>
              </div>
            </div>

            {/* Ingredients Section */}
            <div>
              <SectionTitle>Ingredients</SectionTitle>
              {recipeIngredients.length > 0 && (
                <IngredientHeaderRow>
                  <span>Ingredient</span>
                  <span>Quantity</span>
                  <span>Unit</span>
                  <span>Notes</span>
                  <span></span>
                </IngredientHeaderRow>
              )}
              <IngredientsList>
                {recipeIngredients.map((ri, index) => (
                  <IngredientRow key={index}>
                    <SearchableSelect
                      options={ingredients.map(ing => {
                        const costPerUnit = Number(ing.unit_cost) / (ing.base_quantity || 1);
                        return {
                          value: ing.id,
                          label: ing.name,
                          subLabel: `${getCurrencySymbol(selectedCurrency)} ${costPerUnit.toFixed(2)}/${ing.unit}`
                        };
                      })}
                      value={ri.ingredient_id || null}
                      onChange={(value) => updateIngredient(index, 'ingredient_id', value as number)}
                      placeholder="Search ingredient..."
                    />
                    <FormInput
                      type="number"
                      step="0.01"
                      value={ri.quantity}
                      onChange={(e) => updateIngredient(index, 'quantity', e.target.value)}
                      placeholder="0"
                      required
                    />
                    <FormInput
                      value={ri.unit}
                      disabled
                      style={{ background: '#F3F4F6', color: '#6B7280' }}
                    />
                    <FormInput
                      type="text"
                      value={ri.notes}
                      onChange={(e) => updateIngredient(index, 'notes', e.target.value)}
                      placeholder="Optional"
                    />
                    <RemoveButton type="button" onClick={() => removeIngredient(index)}>
                      ×
                    </RemoveButton>
                  </IngredientRow>
                ))}
              </IngredientsList>

              <AddButton type="button" onClick={addIngredient}>
                Add Ingredient
              </AddButton>

              {recipeIngredients.length > 0 && (
                <>
                  <CostSummary>
                    <CostSummaryLabel>Total Ingredient Cost</CostSummaryLabel>
                    <CostSummaryValue>{formatCurrency(calculateTotalCost(), selectedCurrency)}</CostSummaryValue>
                  </CostSummary>
                  <CostSummary style={{ marginTop: '8px' }}>
                    <CostSummaryLabel>Cost per {formData.yield_unit}</CostSummaryLabel>
                    <CostSummaryValue>
                      {formatCurrency(
                        calculateCostPerUnit(
                          calculateTotalCost(),
                          parseFloat(formData.yield_amount) || 1,
                          formData.yield_unit
                        ).cost,
                        selectedCurrency
                      )}
                    </CostSummaryValue>
                  </CostSummary>
                </>
              )}
            </div>

            {/* Error Message */}
            {formError && (
              <ErrorMessage>{formError}</ErrorMessage>
            )}

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
        )}
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

      {/* Recipe Modal (Cooking-focused popup) */}
      {showRecipeModal && recipeModalData && (
        <RecipeModalOverlay onClick={handleCloseRecipeModal}>
          <RecipeModalContent onClick={(e) => e.stopPropagation()}>
            <RecipeModalHeader>
              <RecipeModalTitle>{recipeModalData.name}</RecipeModalTitle>
              <RecipeModalClose onClick={handleCloseRecipeModal}>&times;</RecipeModalClose>
            </RecipeModalHeader>
            <RecipeModalBody>
              {/* Time Information */}
              {(recipeModalData.prep_time || recipeModalData.cook_time) && (
                <RecipeTimeRow>
                  {recipeModalData.prep_time && (
                    <RecipeTimeItem>
                      <RecipeTimeIcon>⏱</RecipeTimeIcon>
                      <RecipeTimeLabel>Prep:</RecipeTimeLabel>
                      <RecipeTimeValue>{recipeModalData.prep_time} min</RecipeTimeValue>
                    </RecipeTimeItem>
                  )}
                  {recipeModalData.cook_time && (
                    <RecipeTimeItem>
                      <RecipeTimeIcon>🔥</RecipeTimeIcon>
                      <RecipeTimeLabel>Cook:</RecipeTimeLabel>
                      <RecipeTimeValue>{recipeModalData.cook_time} min</RecipeTimeValue>
                    </RecipeTimeItem>
                  )}
                </RecipeTimeRow>
              )}

              {/* Ingredients with Quantities */}
              {recipeModalData.recipeIngredients && recipeModalData.recipeIngredients.length > 0 && (
                <RecipeSection>
                  <RecipeSectionTitle>Ingredients</RecipeSectionTitle>
                  <RecipeIngredientList>
                    {recipeModalData.recipeIngredients.map((ri, idx) => {
                      const ingredient = ingredients.find(ing => ing.id === ri.ingredient_id);
                      return (
                        <RecipeIngredientItem key={idx}>
                          <RecipeIngredientName>{ingredient?.name || `Ingredient #${ri.ingredient_id}`}</RecipeIngredientName>
                          <RecipeIngredientQty>{Number(ri.quantity).toFixed(2)} {ri.unit}</RecipeIngredientQty>
                        </RecipeIngredientItem>
                      );
                    })}
                  </RecipeIngredientList>
                </RecipeSection>
              )}

              {/* Recipe Summary */}
              {(recipeModalData.instructions_summary || recipeModalData.instructions) && (
                <RecipeSection>
                  <RecipeSectionTitle>Summary</RecipeSectionTitle>
                  <RecipeSummaryText>
                    {recipeModalData.instructions_summary || recipeModalData.instructions}
                  </RecipeSummaryText>
                </RecipeSection>
              )}

              {/* Detailed Instructions */}
              {recipeModalData.instructions_detail && (
                <RecipeSection>
                  <RecipeSectionTitle>Detailed Instructions</RecipeSectionTitle>
                  <RecipeDetailText>
                    {recipeModalData.instructions_detail}
                  </RecipeDetailText>
                </RecipeSection>
              )}
            </RecipeModalBody>
          </RecipeModalContent>
        </RecipeModalOverlay>
      )}
    </>
  );
};

export default RecipesTab;
