import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { EmptyState } from '../../components/UI/TableComponents';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import { SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import ListControlsBar from '../../components/Common/ListControlsBar';
import SortDropdown, { SortKey, sortItems } from '../../components/Common/SortDropdown';
import { useAuth } from '../../contexts/AuthContext';
import { Modal, ModalButton, ModalWarning, FormGroup as UIFormGroup, FormLabel, FormInput, FormSelect, FormTextArea } from '../../components/UI/Modal';
import ImageUploadDropzone from '../../components/Common/ImageUploadDropzone';
import SearchableSelect from '../../components/Common/SearchableSelect';
import { useBrandCurrency } from '../../hooks/useBrandCurrency';
import { formatCurrency, getCurrencySymbol } from '../../utils/currency';
import { fetchAPI } from '../../utils/api';
import { STANDARD_UNITS, calculateIngredientCost, calculateCostPerUnit, formatQuantity } from '../../utils/unitConversion';
import ConfirmModal from '../../components/ConfirmModal';

interface ProductRecipesTabProps {
  /**
   * Active brand id resolved by parent page from /api/brands (BG owns 1+ brands).
   * Required for create flows that need a target brand_id; null only during the
   * brief loading window before the parent has resolved the brand list.
   */
  brandId?: number | null;
  onCountChange?: (count: number) => void;
  categoryRefreshKey?: number;
}

interface ProductRecipe {
  id: number;
  brand_id: number;
  code: string | null;
  name: string;
  description: string | null;
  category_id: number | null;
  category?: ProductRecipeCategory;
  emoji: string | null;
  image: string | null;
  image_url?: string | null;
  yield_amount: number;
  yield_unit: string;
  total_ingredient_cost: number;
  suggested_price: number | null;
  prep_time: number | null;
  cook_time: number | null;
  instructions: string | null;
  instructions_summary: string | null;
  instructions_detail: string | null;
  is_active: boolean;
  recipeIngredients?: RecipeIngredient[];
}

interface ProductRecipeCategory {
  id: number;
  name: string;
  emoji: string | null;
}

interface ProductIngredient {
  id: number;
  code: string;
  name: string;
  unit: string;
  base_quantity: number;
  unit_cost: number;
  category?: { id: number; name: string; emoji?: string };
  is_active: boolean;
}

interface RecipeIngredient {
  id?: number;
  recipe_id?: number;
  ingredient_id: number;
  quantity: number;
  unit: string;
  cost: number;
  notes: string | null;
  ingredient?: ProductIngredient;
}

// Styled Components
const RecipesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  margin-top: 24px;
`;

const RecipeImageFull = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 8px 8px 0 0;
  overflow: hidden;
  background: #F4F6F9;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const RecipeCard = styled.div<{ isActive?: boolean }>`
  background: white;
  border-radius: 12px;
  border: 1px solid #C7CED6;
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
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-word;
`;

const RecipeCategoryBadge = styled.div`
  display: inline-block;
  padding: 4px 8px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
`;

const RecipeDescription = styled.p`
  font-size: 14px;
  color: #4B5563;
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
  background: #F1F4F8;
  border-radius: 8px;
`;

const CostItem = styled.div``;

const CostLabel = styled.div`
  font-size: 11px;
  color: #4B5563;
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
  border-top: 1px solid #C7CED6;
`;

const IngredientsCount = styled.div`
  font-size: 12px;
  color: #4B5563;
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
  background: #F1F4F8;
  color: #374151;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
`;

const RecipeMetaInfo = styled.div`
  display: flex;
  gap: 12px;
  font-size: 12px;
  color: #4B5563;
  margin: 8px 0;
  padding: 8px;
  background: #F9FAFB;
  border-radius: 6px;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  span {
    color: #6B7280;
  }

  strong {
    color: #1F2937;
    font-weight: 600;
  }
`;

const InstructionsPreview = styled.div`
  font-size: 13px;
  color: #4B5563;
  margin: 8px 0;
  padding: 8px;
  background: #FEFCE8;
  border-radius: 6px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
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


const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 8px 0;
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
  border-bottom: 1px solid #C7CED6;

  span {
    font-size: 13px;
    font-weight: 600;
    color: #4B5563;
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
  border-top: 1px solid #C7CED6;
`;

const CostSummaryLabel = styled.div`
  font-size: 14px;
  color: #4B5563;
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

// View mode styles

// Emoji Picker Styles
const EmojiPicker = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
  gap: 6px;
  max-height: 160px;
  overflow-y: auto;
  padding: 8px;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  background: #F9FAFB;
`;

const EmojiOption = styled.button<{ selected?: boolean }>`
  width: 36px;
  height: 36px;
  font-size: 20px;
  background: ${props => props.selected ? '#635BFF' : 'white'};
  border: 1px solid ${props => props.selected ? '#635BFF' : '#C7CED6'};
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.selected ? '#635BFF' : '#F0F0FF'};
    border-color: #635BFF;
    transform: scale(1.1);
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
  margin: auto 0;
`;

const RecipeModalHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid #C7CED6;
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
  color: #4B5563;
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
  background: #F1F4F8;
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
  color: #4B5563;
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
  border-bottom: 1px solid #C7CED6;
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
  border-bottom: 1px solid #F1F4F8;

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
  color: #374151;
  line-height: 1.8;
  margin: 0;
  white-space: pre-wrap;
`;

const RecipeDetailText = styled.div`
  font-size: 15px;
  color: #1F2937;
  line-height: 1.8;
  white-space: pre-wrap;
`;

// View Mode Styled Components (same design as RecipesTab)
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
  background: #F1F4F8;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
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
  color: #4B5563;
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
  border-bottom: 1px solid #C7CED6;
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
  background: #F1F4F8;
  border-radius: 12px;
`;

const ViewGridLabel = styled.div`
  font-size: 12px;
  color: #4B5563;
  margin-bottom: 4px;
`;

const ViewGridValue = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`;

const ViewInstructions = styled.div`
  font-size: 15px;
  color: #1F2937;
  line-height: 1.8;
  white-space: pre-wrap;
`;

const ViewIngredientTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #C7CED6;
  }

  th {
    font-size: 12px;
    font-weight: 600;
    color: #4B5563;
    text-transform: uppercase;
  }

  td {
    font-size: 14px;
    color: #1F2937;
  }

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
  border-top: 1px solid #C7CED6;
  font-weight: 600;

  span:first-child {
    color: #4B5563;
  }

  span:last-child {
    color: #635BFF;
    font-size: 16px;
  }
`;

const ProductRecipesTab: React.FC<ProductRecipesTabProps> = ({ brandId: brandIdProp, onCountChange, categoryRefreshKey }) => {
  const { user } = useAuth();
  const { defaultCurrency } = useBrandCurrency();
  const [selectedCurrency, setSelectedCurrency] = useState<string>('RM');
  const [recipes, setRecipes] = useState<ProductRecipe[]>([]);
  const [ingredients, setIngredients] = useState<ProductIngredient[]>([]);
  const [categories, setCategories] = useState<ProductRecipeCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('newest');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [linkedProducts, setLinkedProducts] = useState<Record<number, string[]>>({});
  const [viewMode, setViewMode] = useState<'compact' | 'image'>(() => {
    const saved = localStorage.getItem('brandProductRecipesViewMode');
    return saved === 'image' ? 'image' : 'compact';
  });

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<ProductRecipe | null>(null);
  const [saving, setSaving] = useState(false);

  // Recipe Modal states
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [recipeModalData, setRecipeModalData] = useState<ProductRecipe | null>(null);

  // Form data
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category_id: '',
    emoji: '',
    image: '',
    yield_amount: '1',
    yield_unit: 'portion',
    prep_time: '',
    cook_time: '',
    instructions_summary: '',
    instructions_detail: '',
    suggested_price: ''
  });

  // Form error state
  const [formError, setFormError] = useState<string | null>(null);

  // Recipe ingredients in form
  const [formIngredients, setFormIngredients] = useState<Array<{
    ingredient_id: number;
    quantity: string;
    unit: string;
    notes: string;
  }>>([]);

  // View mode for modal
  const [isViewMode, setIsViewMode] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingRecipe, setDeletingRecipe] = useState<ProductRecipe | null>(null);

  // Emoji options for recipe
  const emojiOptions = [
    // Food
    '🍖', '🍲', '🍚', '🥓', '🍜', '🍗', '🥟', '🥘', '🍣', '🍤', '🍔', '🍟', '🍝', '🥗',
    '🌮', '🌯', '🥙', '🫔', '🥪', '🌭', '🍕', '🍞', '🥐', '🥖', '🥨', '🥯', '🧇', '🥞',
    '🍳', '🥚', '🧈', '🥩', '🍙', '🍘', '🍥', '🍢', '🍠', '🥠', '🧆',
    // Beverages
    '☕', '🍵', '🥤', '🍺', '🍷', '🥛', '🧃', '🧋', '🍹', '🍸', '🍶', '🥃', '🍾', '🧉',
    '🫖', '🍼', '🧊',
    // Desserts
    '🍰', '🍨', '🍡', '🍮', '🍩', '🍪', '🧁', '🍫', '🍬', '🥧', '🍭', '🍯', '🥮',
    '🍦', '🍧', '🎂', '🥜', '🌰', '🥥',
    // Fruits & Vegetables
    '🍓', '🍇', '🍈', '🍉', '🍊', '🍋', '🍌', '🍍', '🥭', '🍎', '🍏', '🍐', '🍑',
    '🍒', '🥝', '🍅', '🥑', '🌶️', '🥒', '🥬', '🥦', '🧄', '🧅', '🌽', '🥕', '🥔', '🍄',
    // Default
    '📋'
  ];

  // Prefer the explicit prop from parent (multi-brand selector). Fall back to
  // user.brand_id only for legacy users on a single-brand account where the
  // parent might not have resolved /api/brands yet — in practice parent
  // resolves first, so this fallback is defensive only.
  const brandId = brandIdProp ?? user?.brand_id ?? null;

  useEffect(() => {
    if (defaultCurrency) {
      setSelectedCurrency(defaultCurrency);
    }
  }, [defaultCurrency]);

  const fetchData = useCallback(async () => {
    if (!brandId) return;

    try {
      setLoading(true);
      // Pass brand_id query so backend's requireBrandScope filters to the
      // selected brand (BG can own multiple brands; without the filter we'd
      // mix recipes across brands).
      const q = `?brand_id=${brandId}`;
      const [recipesRes, ingredientsRes, categoriesRes] = await Promise.all([
        fetchAPI(`/api/product-recipes${q}`),
        fetchAPI('/api/product-ingredients'),  // BG owner-scoped, brand-agnostic
        fetchAPI(`/api/product-recipe-categories${q}`)
      ]);

      if (recipesRes.success) {
        setRecipes(recipesRes.data || []);
        onCountChange?.(recipesRes.data?.length || 0);
      }
      if (ingredientsRes.success) {
        setIngredients((ingredientsRes.data || []).filter((i: ProductIngredient) => i.is_active));
      }
      if (categoriesRes.success) {
        setCategories(categoriesRes.data || []);
      }

      // Fetch brand products to show linked products on recipe cards (filter to active brand)
      try {
        const bpRes = await fetchAPI(`/api/brand-products${q}`);
        const bpList = (Array.isArray(bpRes?.data) ? bpRes.data : Array.isArray(bpRes) ? bpRes : []);
        const map: Record<number, string[]> = {};
        (Array.isArray(bpList) ? bpList : []).forEach((bp: any) => {
          if (bp.product_recipe_id) {
            if (!map[bp.product_recipe_id]) map[bp.product_recipe_id] = [];
            map[bp.product_recipe_id].push(bp.name);
          }
        });
        setLinkedProducts(map);
      } catch (e) { /* ignore */ }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  }, [brandId, onCountChange]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Refresh categories when categoryRefreshKey changes
  useEffect(() => {
    if (categoryRefreshKey) {
      fetchCategories();
    }
  }, [categoryRefreshKey]);

  const fetchCategories = async () => {
    try {
      const response = await fetchAPI('/api/product-recipe-categories');
      if (response.success) {
        setCategories(response.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleOpenModal = (recipe?: ProductRecipe, isViewMode: boolean = false) => {
    setIsViewMode(isViewMode);
    setFormError(null);
    if (recipe) {
      setEditingRecipe(recipe);
      setFormData({
        name: recipe.name,
        description: recipe.description || '',
        category_id: recipe.category_id?.toString() || '',
        emoji: recipe.emoji || '',
        image: recipe.image || '',
        yield_amount: recipe.yield_amount?.toString() || '1',
        yield_unit: recipe.yield_unit || 'portion',
        prep_time: recipe.prep_time?.toString() || '',
        cook_time: recipe.cook_time?.toString() || '',
        instructions_summary: recipe.instructions_summary || '',
        instructions_detail: recipe.instructions_detail || '',
        suggested_price: recipe.suggested_price?.toString() || ''
      });
      // Load recipe ingredients
      if (recipe.recipeIngredients) {
        setFormIngredients(recipe.recipeIngredients.map(ri => ({
          ingredient_id: ri.ingredient_id,
          quantity: ri.quantity.toString(),
          unit: ri.unit,
          notes: ri.notes || ''
        })));
      } else {
        setFormIngredients([]);
      }
    } else {
      setEditingRecipe(null);
      setFormData({
        name: '',
        description: '',
        category_id: '',
        emoji: '',
        image: '',
        yield_amount: '1',
        yield_unit: 'portion',
        prep_time: '',
        cook_time: '',
        instructions_summary: '',
        instructions_detail: '',
        suggested_price: ''
      });
      setFormIngredients([]);
    }
    setShowModal(true);
  };

  const handleOpenRecipeModal = (recipe: ProductRecipe) => {
    setRecipeModalData(recipe);
    setShowRecipeModal(true);
  };

  const handleCloseRecipeModal = () => {
    setShowRecipeModal(false);
    setRecipeModalData(null);
  };

  const addIngredientRow = () => {
    setFormIngredients([...formIngredients, {
      ingredient_id: 0,
      quantity: '',
      unit: '', // Empty until ingredient selected
      notes: ''
    }]);
  };

  const updateIngredientRow = (index: number, field: string, value: any) => {
    const updated = [...formIngredients];
    updated[index] = { ...updated[index], [field]: value };

    // Auto-fill unit when ingredient selected
    if (field === 'ingredient_id') {
      const ing = ingredients.find(i => i.id === value);
      if (ing) {
        updated[index].unit = ing.unit;
      }
    }

    setFormIngredients(updated);
  };

  const removeIngredientRow = (index: number) => {
    setFormIngredients(formIngredients.filter((_, i) => i !== index));
  };

  const calculateTotalCost = () => {
    return formIngredients.reduce((sum, fi) => {
      const ing = ingredients.find(i => i.id === fi.ingredient_id);
      if (ing && fi.quantity) {
        // unit_cost는 base_quantity 기준이므로 단위당 비용 계산
        const baseQty = ing.base_quantity || 1;
        const costPerUnit = ing.unit_cost / baseQty;
        return sum + (costPerUnit * parseFloat(fi.quantity));
      }
      return sum;
    }, 0);
  };

  const handleSave = async () => {
    setFormError(null);

    if (!formData.name.trim()) {
      setFormError('Recipe name is required');
      return;
    }

    if (!formData.yield_amount || parseFloat(formData.yield_amount) <= 0) {
      setFormError('Yield amount must be greater than 0');
      return;
    }

    try {
      setSaving(true);

      const payload = {
        // brand_id is REQUIRED by the backend for multi-brand Brand Generals (a BG that
        // owns >1 brand has no single fallback). Without it, recipe creation 400'd and the
        // Brand Menu "Linked Recipe" dropdown stayed empty. brandId = the selected brand.
        brand_id: brandId,
        name: formData.name,
        description: formData.description || null,
        category_id: formData.category_id ? parseInt(formData.category_id) : null,
        emoji: formData.emoji || null,
        image: formData.image || null,
        yield_amount: parseFloat(formData.yield_amount) || 1,
        yield_unit: formData.yield_unit || 'portion',
        prep_time: formData.prep_time ? parseInt(formData.prep_time) : null,
        cook_time: formData.cook_time ? parseInt(formData.cook_time) : null,
        instructions_summary: formData.instructions_summary || null,
        instructions_detail: formData.instructions_detail || null,
        suggested_price: formData.suggested_price ? parseFloat(formData.suggested_price) : null,
        ingredients: formIngredients
          .filter(fi => fi.ingredient_id && fi.quantity)
          .map(fi => {
            const ingredient = ingredients.find(ing => ing.id === fi.ingredient_id);
            // 단위 변환을 고려한 비용 계산
            const cost = ingredient
              ? calculateIngredientCost(
                  ingredient.unit_cost / (ingredient.base_quantity || 1),
                  ingredient.unit,
                  parseFloat(fi.quantity),
                  fi.unit
                ) || 0
              : 0;
            return {
              ingredient_id: fi.ingredient_id,
              quantity: parseFloat(fi.quantity),
              unit: fi.unit,
              cost,
              notes: fi.notes || null
            };
          })
      };

      const url = editingRecipe
        ? `/api/product-recipes/${editingRecipe.id}`
        : '/api/product-recipes';
      const method = editingRecipe ? 'PUT' : 'POST';

      const response = await fetchAPI(url, {
        method,
        body: JSON.stringify(payload)
      });

      if (response.success) {
        setShowModal(false);
        setFormError(null);
        fetchData();
      } else {
        setFormError(response.error || 'Failed to save recipe');
      }
    } catch (error) {
      console.error('Failed to save recipe:', error);
      setFormError('Failed to save recipe');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (recipe: ProductRecipe) => {
    setDeletingRecipe(recipe);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteRecipe = async () => {
    if (!deletingRecipe) return;
    setShowDeleteConfirm(false);
    try {
      const response = await fetchAPI(`/api/product-recipes/${deletingRecipe.id}`, {
        method: 'DELETE'
      });

      if (response.success) {
        fetchData();
      } else {
        console.error('Failed to delete recipe:', response.error);
      }
    } catch (error) {
      console.error('Failed to delete recipe:', error);
    }
    setDeletingRecipe(null);
  };

  const filteredRecipes = sortItems(recipes.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.code?.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' ||
                           (item.category_id?.toString() === categoryFilter);
    return matchesSearch && matchesCategory;
  }), sortKey);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '40px', color: '#4B5563' }}>{'Loading...'}</div>;
  }

  return (
    <>
      <ListControlsBar>
        <SearchInput
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FilterSelect
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">{'All Categories'}</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.emoji} {cat.name}</option>
          ))}
        </FilterSelect>
        <SortDropdown value={sortKey} onChange={setSortKey} />
        <div data-controls-trailing>
          <div style={{ display: 'flex', background: '#F1F4F8', borderRadius: '6px', padding: '2px' }}>
            <button onClick={() => { setViewMode('compact'); localStorage.setItem('brandProductRecipesViewMode', 'compact'); }} style={{ padding: '5px 14px', border: 'none', borderRadius: '5px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s', background: viewMode === 'compact' ? 'white' : 'transparent', color: viewMode === 'compact' ? '#0A2540' : '#4B5563', boxShadow: viewMode === 'compact' ? '0 1px 2px rgba(0,0,0,0.08)' : 'none' }}>
              Compact
            </button>
            <button onClick={() => { setViewMode('image'); localStorage.setItem('brandProductRecipesViewMode', 'image'); }} style={{ padding: '5px 14px', border: 'none', borderRadius: '5px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s', background: viewMode === 'image' ? 'white' : 'transparent', color: viewMode === 'image' ? '#0A2540' : '#4B5563', boxShadow: viewMode === 'image' ? '0 1px 2px rgba(0,0,0,0.08)' : 'none' }}>
              Image
            </button>
          </div>
          <ThemedButton variant="primary" onClick={() => handleOpenModal()}>
            Add Recipe
          </ThemedButton>
        </div>
      </ListControlsBar>

      {filteredRecipes.length === 0 ? (
        <EmptyState>
          <EmptyTitle>{'No recipes found'}</EmptyTitle>
          <EmptyDescription>
            Create product recipes to track ingredient costs and manage production.
          </EmptyDescription>
          <ThemedButton variant="primary" onClick={() => handleOpenModal()}>
            Add First Recipe
          </ThemedButton>
        </EmptyState>
      ) : (
        <RecipesGrid>
          {filteredRecipes.map(recipe => (
            <RecipeCard key={recipe.id} isActive={recipe.is_active} onClick={() => handleOpenModal(recipe, true)}>
              {viewMode === 'image' && recipe.image && (
                <RecipeImageFull>
                  <img src={recipe.image} alt={recipe.name} />
                </RecipeImageFull>
              )}
              <RecipeHeader>
                <RecipeInfo>
                  <RecipeName>{recipe.name}</RecipeName>
                  <RecipeCategoryBadge>
                    {recipe.category?.name || 'Uncategorized'}
                  </RecipeCategoryBadge>
                </RecipeInfo>
              </RecipeHeader>

              {recipe.description && (
                <RecipeDescription>{recipe.description}</RecipeDescription>
              )}

              <RecipeCosts>
                <CostItem>
                  <CostLabel>{'Ingredient Cost'}</CostLabel>
                  <CostValue>{formatCurrency(recipe.total_ingredient_cost || 0, selectedCurrency)}</CostValue>
                </CostItem>
                <CostItem>
                  <CostLabel>{'Suggested Price'}</CostLabel>
                  <CostValue>
                    {recipe.suggested_price
                      ? formatCurrency(recipe.suggested_price, selectedCurrency)
                      : '-'}
                  </CostValue>
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

              {/* Recipe Summary Preview */}
              {recipe.instructions_summary && (
                <InstructionsPreview>
                  {recipe.instructions_summary}
                </InstructionsPreview>
              )}

              <CardSpacer />
              {recipe.recipeIngredients && recipe.recipeIngredients.length > 0 && (
                <RecipeIngredients>
                  <IngredientsCount>
                    {recipe.recipeIngredients.length} ingredient{recipe.recipeIngredients.length > 1 ? 's' : ''}
                  </IngredientsCount>
                  <IngredientTags>
                    {recipe.recipeIngredients.slice(0, 4).map((ri, idx) => (
                      <IngredientTag key={idx}>
                        {ri.ingredient?.name || `Ingredient #${ri.ingredient_id}`}
                      </IngredientTag>
                    ))}
                    {recipe.recipeIngredients.length > 4 && (
                      <IngredientTag>+{recipe.recipeIngredients.length - 4} more</IngredientTag>
                    )}
                  </IngredientTags>
                </RecipeIngredients>
              )}

              {linkedProducts[recipe.id] && linkedProducts[recipe.id].length > 0 && (
                <div style={{ marginTop: '8px', display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                  {linkedProducts[recipe.id].map((name, i) => (
                    <span key={i} style={{ fontSize: '11px', background: '#ECFDF5', color: '#059669', padding: '2px 8px', borderRadius: '4px', fontWeight: 500 }}>
                      {name}
                    </span>
                  ))}
                </div>
              )}

              <RecipeActions onClick={(e) => e.stopPropagation()}>
                <ActionButton onClick={() => handleOpenRecipeModal(recipe)}>
                  Recipe
                </ActionButton>
                <ActionButton variant="primary" onClick={() => handleOpenModal(recipe)}>
                  Edit
                </ActionButton>
                <ActionButton variant="danger" onClick={() => handleDelete(recipe)}>
                  Delete
                </ActionButton>
              </RecipeActions>
            </RecipeCard>
          ))}
        </RecipesGrid>
      )}

      {/* Recipe Form Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={isViewMode ? 'Recipe Details' : (editingRecipe ? 'Edit Recipe' : 'Add Recipe')}
        size="large"
      >
        {isViewMode && editingRecipe ? (
          /* View Mode - Clean readable layout (same as RecipesTab) */
          <ViewContainer>
            {/* Header with image and title */}
            <ViewHeader>
              {formData.image && (
              <ViewImage>
                <img src={formData.image} alt={formData.name} />
              </ViewImage>
              )}
              <ViewTitleSection>
                <ViewTitle>{formData.name}</ViewTitle>
                <ViewCategoryBadge>
                  {editingRecipe.category?.emoji} {editingRecipe.category?.name || 'Uncategorized'}
                </ViewCategoryBadge>
                {formData.description && (
                  <ViewDescription>{formData.description}</ViewDescription>
                )}
              </ViewTitleSection>
            </ViewHeader>

            {/* Cost & Time Info */}
            <ViewSection>
              <ViewSectionTitle>{'Cost & Time'}</ViewSectionTitle>
              <ViewGrid>
                <ViewGridItem>
                  <ViewGridLabel>{'Ingredient Cost'}</ViewGridLabel>
                  <ViewGridValue>{formatCurrency(Number(editingRecipe.total_ingredient_cost || 0), selectedCurrency)}</ViewGridValue>
                </ViewGridItem>
                <ViewGridItem>
                  <ViewGridLabel>{'Suggested Price'}</ViewGridLabel>
                  <ViewGridValue>{formatCurrency(Number(formData.suggested_price || 0), selectedCurrency)}</ViewGridValue>
                </ViewGridItem>
                {formData.prep_time && (
                  <ViewGridItem>
                    <ViewGridLabel>{'Prep Time'}</ViewGridLabel>
                    <ViewGridValue>{formData.prep_time} min</ViewGridValue>
                  </ViewGridItem>
                )}
                {formData.cook_time && (
                  <ViewGridItem>
                    <ViewGridLabel>{'Cook Time'}</ViewGridLabel>
                    <ViewGridValue>{formData.cook_time} min</ViewGridValue>
                  </ViewGridItem>
                )}
              </ViewGrid>
            </ViewSection>

            {/* Yield */}
            {(formData.yield_amount && formData.yield_amount !== '1') && (
              <ViewSection>
                <ViewSectionTitle>{'Yield'}</ViewSectionTitle>
                <div style={{ fontSize: '15px', color: '#1F2937' }}>
                  {formData.yield_amount} {STANDARD_UNITS.find(u => u.value === formData.yield_unit)?.label || formData.yield_unit}
                  <span style={{ marginLeft: '16px', color: '#4B5563', fontSize: '13px' }}>
                    (Cost per {formData.yield_unit}: {formatCurrency(
                      calculateCostPerUnit(
                        calculateTotalCost(),
                        parseFloat(formData.yield_amount) || 1,
                        formData.yield_unit
                      ).cost,
                      selectedCurrency
                    )})
                  </span>
                </div>
              </ViewSection>
            )}

            {/* Ingredients */}
            {formIngredients.length > 0 && (
              <ViewSection>
                <ViewSectionTitle>Ingredients ({formIngredients.length})</ViewSectionTitle>
                <ViewIngredientTable>
                  <thead>
                    <tr>
                      <th>{'Ingredient'}</th>
                      <th>{'Quantity'}</th>
                      <th>{'Unit Cost'}</th>
                      <th>{'Subtotal'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formIngredients.map((fi, idx) => {
                      const ingredient = ingredients.find(ing => ing.id === fi.ingredient_id);
                      const baseQty = ingredient?.base_quantity || 1;
                      const costPerUnit = (ingredient?.unit_cost || 0) / baseQty;
                      const subtotal = parseFloat(fi.quantity) * costPerUnit;
                      return (
                        <tr key={idx}>
                          <td><strong>{ingredient?.name || `Ingredient #${fi.ingredient_id}`}</strong></td>
                          <td>{formatQuantity(fi.quantity)} {fi.unit}</td>
                          <td>{getCurrencySymbol(selectedCurrency)} {costPerUnit.toFixed(2)}/{ingredient?.unit}</td>
                          <td>{formatCurrency(subtotal, selectedCurrency)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </ViewIngredientTable>
                <ViewTotalRow>
                  <span>{'Total Ingredient Cost'}</span>
                  <span>{formatCurrency(calculateTotalCost(), selectedCurrency)}</span>
                </ViewTotalRow>
              </ViewSection>
            )}

            {/* Recipe Summary */}
            {(formData.instructions_summary) && (
              <ViewSection>
                <ViewSectionTitle>{'Recipe Summary'}</ViewSectionTitle>
                <ViewInstructions>{formData.instructions_summary}</ViewInstructions>
              </ViewSection>
            )}

            {/* Detailed Instructions */}
            {formData.instructions_detail && (
              <ViewSection>
                <ViewSectionTitle>{'Detailed Instructions'}</ViewSectionTitle>
                <ViewInstructions>{formData.instructions_detail}</ViewInstructions>
              </ViewSection>
            )}

            {/* Connected Products */}
            {linkedProducts[editingRecipe.id] && linkedProducts[editingRecipe.id].length > 0 && (
              <ViewSection>
                <ViewSectionTitle>Connected Products ({linkedProducts[editingRecipe.id].length})</ViewSectionTitle>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {linkedProducts[editingRecipe.id].map((name, i) => (
                    <span key={i} style={{ fontSize: '13px', background: '#ECFDF5', color: '#059669', padding: '4px 12px', borderRadius: '6px', fontWeight: 500 }}>
                      {name}
                    </span>
                  ))}
                </div>
              </ViewSection>
            )}

            {/* Action Buttons */}
            <ButtonGroup>
              <ModalButton type="button" variant="secondary" onClick={() => setShowModal(false)}>
                Close
              </ModalButton>
              <ModalButton
                type="button"
                variant="primary"
                onClick={() => setIsViewMode(false)}
              >
                Edit
              </ModalButton>
            </ButtonGroup>
          </ViewContainer>
        ) : (
          /* Edit/Create Mode - Form layout */
          <>
        <UIFormGroup>
          <FormLabel>Recipe Name *</FormLabel>
          <FormInput
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Grilled Chicken"
          />
        </UIFormGroup>

        <UIFormGroup>
          <FormLabel>{'Category'}</FormLabel>
          <FormSelect
            value={formData.category_id}
            onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
          >
            <option value="">{'Select Category'}</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.emoji} {cat.name}</option>
            ))}
          </FormSelect>
        </UIFormGroup>

        <UIFormGroup>
          <FormLabel>{'Emoji Icon'}</FormLabel>
          <EmojiPicker>
            {emojiOptions.map((emoji) => (
              <EmojiOption
                key={emoji}
                type="button"
                selected={formData.emoji === emoji}
                onClick={() => setFormData({ ...formData, emoji })}
              >
                {emoji}
              </EmojiOption>
            ))}
          </EmojiPicker>
        </UIFormGroup>

        <UIFormGroup>
          <FormLabel>{'Recipe Image'}</FormLabel>
          <ImageUploadDropzone
            value={formData.image}
            onChange={(value) => setFormData({ ...formData, image: value })}
            label="Drop recipe image here or click to upload"
          />
        </UIFormGroup>

        <UIFormGroup>
          <FormLabel>{'Description'}</FormLabel>
          <FormTextArea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Brief description of the recipe"
            rows={2}
          />
        </UIFormGroup>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
          <UIFormGroup>
            <FormLabel>{'Prep Time (min)'}</FormLabel>
            <FormInput
              type="number"
              min="0"
              value={formData.prep_time}
              onChange={(e) => setFormData({ ...formData, prep_time: e.target.value })}
            />
          </UIFormGroup>
          <UIFormGroup>
            <FormLabel>{'Cook Time (min)'}</FormLabel>
            <FormInput
              type="number"
              min="0"
              value={formData.cook_time}
              onChange={(e) => setFormData({ ...formData, cook_time: e.target.value })}
            />
          </UIFormGroup>
          <UIFormGroup>
            <FormLabel>Suggested Price ({selectedCurrency})</FormLabel>
            <FormInput
              type="number"
              step="0.01"
              min="0"
              value={formData.suggested_price}
              onChange={(e) => setFormData({ ...formData, suggested_price: e.target.value })}
            />
          </UIFormGroup>
        </div>

        <UIFormGroup>
          <FormLabel>{'Recipe Summary'}</FormLabel>
          <FormTextArea
            value={formData.instructions_summary}
            onChange={(e) => setFormData({ ...formData, instructions_summary: e.target.value })}
            placeholder="Brief summary for list display (e.g., Pan-fried chicken with garlic sauce)"
            rows={2}
          />
        </UIFormGroup>

        <UIFormGroup>
          <FormLabel>{'Detailed Instructions'}</FormLabel>
          <FormTextArea
            value={formData.instructions_detail}
            onChange={(e) => setFormData({ ...formData, instructions_detail: e.target.value })}
            placeholder="Step-by-step cooking instructions...
1. Prepare ingredients...
2. Heat the pan...
3. ..."
            rows={6}
          />
        </UIFormGroup>

        {/* Yield Section */}
        <SectionTitle>{'Yield (Production Amount)'}</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <UIFormGroup>
            <FormLabel>Yield Amount *</FormLabel>
            <FormInput
              type="number"
              step="0.01"
              min="0.01"
              value={formData.yield_amount}
              onChange={(e) => setFormData({ ...formData, yield_amount: e.target.value })}
              placeholder="e.g., 10"
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

        {/* Ingredients Section */}
        <SectionTitle>{'Ingredients'}</SectionTitle>

        <AddButton onClick={addIngredientRow}>
          Add Ingredient
        </AddButton>

        {formIngredients.length > 0 && (
          <IngredientsList>
            <IngredientHeaderRow>
              <span>{'Ingredient'}</span>
              <span>{'Quantity'}</span>
              <span>{'Unit'}</span>
              <span>{'Notes'}</span>
              <span></span>
            </IngredientHeaderRow>

            {formIngredients.map((fi, index) => {
              return (
                <IngredientRow key={index}>
                  <SearchableSelect
                    options={ingredients.map(ing => {
                      const costPerUnit = ing.unit_cost / (ing.base_quantity || 1);
                      return {
                        value: ing.id,
                        label: ing.name,
                        subLabel: `${getCurrencySymbol(selectedCurrency)} ${costPerUnit.toFixed(2)}/${ing.unit}`
                      };
                    })}
                    value={fi.ingredient_id || null}
                    onChange={(value) => updateIngredientRow(index, 'ingredient_id', value as number)}
                    placeholder="Search ingredient..."
                  />
                  <FormInput
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="Qty"
                    value={fi.quantity}
                    onChange={(e) => updateIngredientRow(index, 'quantity', e.target.value)}
                  />
                  <FormInput
                    value={fi.unit}
                    disabled
                    style={{ background: '#F1F4F8', color: '#4B5563' }}
                  />
                  <FormInput
                    value={fi.notes}
                    onChange={(e) => updateIngredientRow(index, 'notes', e.target.value)}
                    placeholder="Notes"
                  />
                  <RemoveButton onClick={() => removeIngredientRow(index)}>×</RemoveButton>
                </IngredientRow>
              );
            })}
          </IngredientsList>
        )}

        <CostSummary>
          <CostSummaryLabel>{'Total Ingredient Cost'}</CostSummaryLabel>
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

        {formError && <ModalWarning>{formError}</ModalWarning>}

        <ButtonGroup>
          <ModalButton variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </ModalButton>
          <ModalButton variant="primary" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save Recipe'}
          </ModalButton>
        </ButtonGroup>
          </>
        )}
      </Modal>

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
                  <RecipeSectionTitle>{'Ingredients'}</RecipeSectionTitle>
                  <RecipeIngredientList>
                    {recipeModalData.recipeIngredients.map((ri, idx) => (
                      <RecipeIngredientItem key={idx}>
                        <RecipeIngredientName>{ri.ingredient?.name || `Ingredient #${ri.ingredient_id}`}</RecipeIngredientName>
                        <RecipeIngredientQty>{formatQuantity(ri.quantity)} {ri.unit}</RecipeIngredientQty>
                      </RecipeIngredientItem>
                    ))}
                  </RecipeIngredientList>
                </RecipeSection>
              )}

              {/* Recipe Summary */}
              {recipeModalData.instructions_summary && (
                <RecipeSection>
                  <RecipeSectionTitle>{'Summary'}</RecipeSectionTitle>
                  <RecipeSummaryText>
                    {recipeModalData.instructions_summary}
                  </RecipeSummaryText>
                </RecipeSection>
              )}

              {/* Detailed Instructions */}
              {recipeModalData.instructions_detail && (
                <RecipeSection>
                  <RecipeSectionTitle>{'Detailed Instructions'}</RecipeSectionTitle>
                  <RecipeDetailText>
                    {recipeModalData.instructions_detail}
                  </RecipeDetailText>
                </RecipeSection>
              )}

              {/* Connected Products */}
              {linkedProducts[recipeModalData.id] && linkedProducts[recipeModalData.id].length > 0 && (
                <RecipeSection>
                  <RecipeSectionTitle>{'Connected Products'}</RecipeSectionTitle>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {linkedProducts[recipeModalData.id].map((name, i) => (
                      <span key={i} style={{ fontSize: '13px', background: '#ECFDF5', color: '#059669', padding: '4px 12px', borderRadius: '6px', fontWeight: 500 }}>
                        {name}
                      </span>
                    ))}
                  </div>
                </RecipeSection>
              )}
            </RecipeModalBody>
          </RecipeModalContent>
        </RecipeModalOverlay>
      )}

      <ConfirmModal
        isOpen={showDeleteConfirm}
        title="Delete Recipe"
        message={`Delete "${deletingRecipe?.name}"? This action cannot be undone.`}
        onConfirm={confirmDeleteRecipe}
        onCancel={() => { setShowDeleteConfirm(false); setDeletingRecipe(null); }}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </>
  );
};

export default ProductRecipesTab;
