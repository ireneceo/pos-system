import React, { useState, useEffect } from 'react';
import ConfirmModal from '../../components/ConfirmModal';
import styled from 'styled-components';
import { Carrot, UtensilsCrossed } from 'lucide-react';
import { EmptyState } from '../../components/UI/TableComponents';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import { useAuth } from '../../contexts/AuthContext';
import { Modal, ModalButton, FormGroup as UIFormGroup, FormLabel, FormInput, FormTextArea } from '../../components/UI/Modal';
import { OrderControls } from '../../components/UI';
import ConfirmDialog from '../../components/Common/ConfirmDialog';
import { useTranslation } from 'react-i18next';

import { getAuthToken } from '../../utils/auth';
interface CategoriesTabProps {
  brandId: number | null;
  restaurantId?: number | null;
  onCountChange: (count: number) => void;
}

interface Category {
  id: number;
  brand_id: number | null;
  restaurant_id: number | null;
  owner_type: 'brand' | 'restaurant';
  name: string;
  description: string | null;
  emoji: string | null;
  display_order: number;
  is_active: boolean;
  recipe_count?: number;
  ingredient_count?: number;
  editable?: boolean;
}

const Container = styled.div`
  padding: 24px 0;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SectionDivider = styled.div`
  margin: 32px 0;
  border-top: 1px solid #E5E7EB;
`;

const CategoryGrid = styled.div`
  display: grid;
  gap: 12px;
`;

const CategoryCard = styled.div<{ isActive?: boolean; readOnly?: boolean }>`
  background: white;
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.2s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  opacity: ${props => props.isActive !== false ? 1 : 0.6};
  ${props => props.readOnly && `
    background: #F9FAFB;
    border: 1px dashed #D1D5DB;
  `}

  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`;

const CategoryIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`;

const CategoryInfo = styled.div`
  flex: 1;
`;

const CategoryName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`;

const CategoryMeta = styled.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #6B7280;
`;

const CategoryDescription = styled.div`
  font-size: 13px;
  color: #6B7280;
  margin-top: 4px;
`;

const CategoryActions = styled.div`
  display: flex;
  gap: 8px;
`;

const IconButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #F9FAFB;
    border-color: #D1D5DB;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: 18px;
    height: 18px;
    color: #6B7280;
  }
`;


const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: 12px;
  opacity: 0.5;
`;

const EmptyTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`;

const EmptyDescription = styled.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 16px 0;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const ReadOnlyBadge = styled.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  background: #FEF3C7;
  color: #92400E;
  margin-left: 8px;
`;

const StatusBadge = styled.span<{ active: boolean }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: ${props => props.active ? '#D1FAE5' : '#FEE2E2'};
  color: ${props => props.active ? '#059669' : '#DC2626'};
`;

const EmojiPicker = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 4px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
  background: #F9FAFB;
  border-radius: 8px;
`;

const EmojiOption = styled.button<{ selected?: boolean }>`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 4px;
  background: ${props => props.selected ? '#635BFF' : 'white'};
  border: 1px solid ${props => props.selected ? '#635BFF' : '#E5E7EB'};
  cursor: pointer;
  transition: all 0.2s;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${props => props.selected ? '#635BFF' : '#F3F4F6'};
  }
`;

const BrandCategoriesSection = styled.div`
  margin-bottom: 24px;
  padding: 16px;
  background: #FFFBEB;
  border-radius: 12px;
  border: 1px solid #FDE68A;
`;

const BrandCategoriesHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 14px;
  color: #92400E;
  font-weight: 500;
`;

const CategoriesTab: React.FC<CategoriesTabProps> = ({ brandId, restaurantId, onCountChange }) => {
  const { t } = useTranslation('recipes');
  const { user } = useAuth();
  const [infoModal, setInfoModal] = useState<{ open: boolean; title: string; message: string }>({ open: false, title: '', message: '' });
  const [recipeCategories, setRecipeCategories] = useState<Category[]>([]);
  const [ingredientCategories, setIngredientCategories] = useState<Category[]>([]);
  const [brandRecipeCategories, setBrandRecipeCategories] = useState<Category[]>([]);
  const [brandIngredientCategories, setBrandIngredientCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'recipe' | 'ingredient'>('recipe');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<{ category: Category; type: 'recipe' | 'ingredient' } | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    emoji: '🍽️'
  });

  const isRestaurantAdmin = user?.role === 'Restaurant Admin';
  const isBrandUser = user?.role === 'Brand General' || user?.role === 'Brand Manager';
  // Restaurant Admin은 자신의 카테고리만 수정/삭제 가능 (브랜드 카테고리는 읽기전용)
  const isItemReadOnly = (item: Category) => isRestaurantAdmin && item.owner_type === 'brand';

  const emojiOptions = [
    '🍔', '🍕', '🍗', '🥗', '🍜', '🍝', '🍤', '🥘', '🍛', '🍲',
    '☕', '🥤', '🧃', '🍵', '🧋', '🍺', '🍷', '🥃', '🍹', '🍸',
    '🍰', '🧁', '🍪', '🍩', '🍨', '🍧', '🍦', '🍮', '🍭', '🍫',
    '🥐', '🥖', '🍞', '🥨', '🥯', '🧇', '🥞', '🍳', '🥚', '🧈',
    '🍱', '🍙', '🍘', '🍣', '🍥', '🍡', '🍢', '🍠', '🥟', '🥠',
    '🌮', '🌯', '🥙', '🫔', '🥪', '🌭', '🍟', '🫓', '🥓', '🧆',
    '🥕', '🥬', '🧅', '🧄', '🌶️', '🥩', '🍖', '🥚', '🧀', '🥛',
    '🍽️', '🥄', '🍴', '🥢', '🧊', '🧂', '🫒', '🌿', '🍃', '🌱'
  ];

  useEffect(() => {
    fetchCategories();
  }, [brandId, user]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const token = getAuthToken();

      if (isBrandUser && brandId) {
        // Brand: 브랜드 카테고리 조회
        const [recipeRes, ingredientRes] = await Promise.all([
          fetch(`/api/brands/${brandId}/recipe-categories`, {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch(`/api/brands/${brandId}/ingredient-categories`, {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ]);

        const recipeData = await recipeRes.json();
        const ingredientData = await ingredientRes.json();

        if (recipeData.success) {
          setRecipeCategories(recipeData.data);
        }
        if (ingredientData.success) {
          setIngredientCategories(ingredientData.data);
        }

        onCountChange((recipeData.data?.length || 0) + (ingredientData.data?.length || 0));

      } else if (isRestaurantAdmin && user?.restaurant_id) {
        // Restaurant: 자체 + 브랜드 카테고리 조회
        const [recipeRes, ingredientRes] = await Promise.all([
          fetch(`/api/restaurants/${user.restaurant_id}/recipe-categories`, {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch(`/api/restaurants/${user.restaurant_id}/ingredient-categories`, {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ]);

        const recipeData = await recipeRes.json();
        const ingredientData = await ingredientRes.json();

        if (recipeData.success) {
          setRecipeCategories(recipeData.data.own_categories || []);
          setBrandRecipeCategories(recipeData.data.brand_categories || []);
        }
        if (ingredientData.success) {
          setIngredientCategories(ingredientData.data.own_categories || []);
          setBrandIngredientCategories(ingredientData.data.brand_categories || []);
        }

        const totalOwn = (recipeData.data?.own_categories?.length || 0) + (ingredientData.data?.own_categories?.length || 0);
        const totalBrand = (recipeData.data?.brand_categories?.length || 0) + (ingredientData.data?.brand_categories?.length || 0);
        onCountChange(totalOwn + totalBrand);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (type: 'recipe' | 'ingredient', category?: Category) => {
    setModalType(type);
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        description: category.description || '',
        emoji: category.emoji || '🍽️'
      });
    } else {
      setEditingCategory(null);
      setFormData({
        name: '',
        description: '',
        emoji: type === 'ingredient' ? '🥕' : '🍽️'
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setFormData({ name: '', description: '', emoji: '🍽️' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    try {
      const token = getAuthToken();
      let url = '';
      const method = editingCategory ? 'PUT' : 'POST';

      if (isBrandUser && brandId) {
        const basePath = modalType === 'recipe' ? 'recipe-categories' : 'ingredient-categories';
        url = editingCategory
          ? `/api/brands/${brandId}/${basePath}/${editingCategory.id}`
          : `/api/brands/${brandId}/${basePath}`;
      } else if (isRestaurantAdmin && user?.restaurant_id) {
        const basePath = modalType === 'recipe' ? 'recipe-categories' : 'ingredient-categories';
        url = editingCategory
          ? `/api/restaurants/${user.restaurant_id}/${basePath}/${editingCategory.id}`
          : `/api/restaurants/${user.restaurant_id}/${basePath}`;
      }

      if (!url) return;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          description: formData.description.trim() || null,
          emoji: formData.emoji
        })
      });

      const data = await response.json();

      if (data.success) {
        handleCloseModal();
        fetchCategories();
      } else {
        setInfoModal({ open: true, title: 'Save Failed', message: data.error || 'Failed to save. Please try again.' });
      }
    } catch (error) {
      console.error('Failed to save category:', error);
      setInfoModal({ open: true, title: 'Save Failed', message: 'Failed to save. Please try again.' });
    }
  };

  const handleDeleteClick = (category: Category, type: 'recipe' | 'ingredient') => {
    setCategoryToDelete({ category, type });
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!categoryToDelete) return;

    try {
      const token = getAuthToken();
      let url = '';

      if (isBrandUser && brandId) {
        const basePath = categoryToDelete.type === 'recipe' ? 'recipe-categories' : 'ingredient-categories';
        url = `/api/brands/${brandId}/${basePath}/${categoryToDelete.category.id}`;
      } else if (isRestaurantAdmin && user?.restaurant_id) {
        const basePath = categoryToDelete.type === 'recipe' ? 'recipe-categories' : 'ingredient-categories';
        url = `/api/restaurants/${user.restaurant_id}/${basePath}/${categoryToDelete.category.id}`;
      }

      if (!url) return;

      const response = await fetch(url, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();

      if (data.success) {
        setDeleteModalOpen(false);
        setCategoryToDelete(null);
        fetchCategories();
      } else {
        setInfoModal({ open: true, title: 'Delete Failed', message: data.error || 'Failed to delete. Please try again.' });
      }
    } catch (error) {
      console.error('Failed to delete category:', error);
      setInfoModal({ open: true, title: 'Delete Failed', message: 'Failed to delete. Please try again.' });
    }
  };

  const handleReorder = async (type: 'recipe' | 'ingredient', index: number, direction: 'up' | 'down') => {
    const categories = type === 'recipe' ? recipeCategories : ingredientCategories;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= categories.length) return;

    const items = [...categories];
    [items[index], items[targetIndex]] = [items[targetIndex], items[index]];

    const orders = items.map((item, idx) => ({
      id: item.id,
      display_order: idx
    }));

    try {
      const token = getAuthToken();
      let url = '';

      if (isBrandUser && brandId) {
        const basePath = type === 'recipe' ? 'recipe-categories' : 'ingredient-categories';
        url = `/api/brands/${brandId}/${basePath}/reorder`;
      } else if (isRestaurantAdmin && user?.restaurant_id) {
        const basePath = type === 'recipe' ? 'recipe-categories' : 'ingredient-categories';
        url = `/api/restaurants/${user.restaurant_id}/${basePath}/reorder`;
      }

      if (!url) return;

      await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ orders })
      });

      fetchCategories();
    } catch (error) {
      console.error('Failed to reorder:', error);
    }
  };

  const renderCategoryCard = (category: Category, type: 'recipe' | 'ingredient', index: number, categories: Category[], readOnly: boolean = false) => {
    const count = type === 'recipe' ? category.recipe_count : category.ingredient_count;

    return (
      <CategoryCard key={category.id} isActive={category.is_active} readOnly={readOnly}>
        {!readOnly && (
          <OrderControls
            onMoveUp={() => handleReorder(type, index, 'up')}
            onMoveDown={() => handleReorder(type, index, 'down')}
            disableUp={index === 0}
            disableDown={index === categories.length - 1}
          />
        )}
        <CategoryIcon>{category.emoji || <UtensilsCrossed size={20} />}</CategoryIcon>
        <CategoryInfo>
          <CategoryName>
            {category.name}
            {readOnly && <ReadOnlyBadge>{t('recipes:categoriesTab.brand')}</ReadOnlyBadge>}
          </CategoryName>
          <CategoryMeta>
            <span>{count || 0} {type === 'recipe' ? 'recipes' : 'ingredients'}</span>
            {!readOnly && <StatusBadge active={category.is_active}>{category.is_active ? 'Active' : 'Inactive'}</StatusBadge>}
          </CategoryMeta>
          {category.description && <CategoryDescription>{category.description}</CategoryDescription>}
        </CategoryInfo>
        {!readOnly && (
          <CategoryActions>
            <IconButton onClick={() => handleOpenModal(type, category)} title="Edit">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </IconButton>
            <IconButton onClick={() => handleDeleteClick(category, type)} title="Delete">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </IconButton>
          </CategoryActions>
        )}
      </CategoryCard>
    );
  };

  if (loading) {
    return (
      <Container>
        <div style={{ textAlign: 'center', padding: '40px', color: '#6B7280' }}>{t('recipes:categoriesTab.loading')}</div>
      </Container>
    );
  }

  return (
    <Container>
      {/* Recipe Categories Section */}
      <HeaderRow>
        <SectionTitle>{t('recipes:categoriesTab.recipeCategories')}</SectionTitle>
        <ThemedButton variant="primary" onClick={() => handleOpenModal('recipe')}>
          New Category
        </ThemedButton>
      </HeaderRow>

      {/* Brand Recipe Categories (Restaurant only) */}
      {isRestaurantAdmin && brandRecipeCategories.length > 0 && (
        <BrandCategoriesSection>
          <BrandCategoriesHeader>
            Brand Categories (Read Only)
          </BrandCategoriesHeader>
          <CategoryGrid>
            {brandRecipeCategories.map((cat, idx) => renderCategoryCard(cat, 'recipe', idx, brandRecipeCategories, true))}
          </CategoryGrid>
        </BrandCategoriesSection>
      )}

      {recipeCategories.length === 0 ? (
        <EmptyState>
          <EmptyIcon>📂</EmptyIcon>
          <EmptyTitle>{t('recipes:categoriesTab.noRecipeCategoriesYet')}</EmptyTitle>
          <EmptyDescription>
            Create categories to organize your recipes
          </EmptyDescription>
          <ThemedButton variant="primary" onClick={() => handleOpenModal('recipe')}>
            Create Category
          </ThemedButton>
        </EmptyState>
      ) : (
        <CategoryGrid>
          {recipeCategories.map((cat, idx) => renderCategoryCard(cat, 'recipe', idx, recipeCategories, isItemReadOnly(cat)))}
        </CategoryGrid>
      )}

      <SectionDivider />

      {/* Ingredient Categories Section */}
      <HeaderRow>
        <SectionTitle>{t('recipes:categoriesTab.ingredientCategories')}</SectionTitle>
        <ThemedButton variant="primary" onClick={() => handleOpenModal('ingredient')}>
          New Category
        </ThemedButton>
      </HeaderRow>

      {/* Brand Ingredient Categories (Restaurant only) */}
      {isRestaurantAdmin && brandIngredientCategories.length > 0 && (
        <BrandCategoriesSection>
          <BrandCategoriesHeader>
            Brand Categories (Read Only)
          </BrandCategoriesHeader>
          <CategoryGrid>
            {brandIngredientCategories.map((cat, idx) => renderCategoryCard(cat, 'ingredient', idx, brandIngredientCategories, true))}
          </CategoryGrid>
        </BrandCategoriesSection>
      )}

      {ingredientCategories.length === 0 ? (
        <EmptyState>
          <EmptyIcon><Carrot size={32} /></EmptyIcon>
          <EmptyTitle>{t('recipes:categoriesTab.noIngredientCategoriesYet')}</EmptyTitle>
          <EmptyDescription>
            Create categories to organize your ingredients
          </EmptyDescription>
          <ThemedButton variant="primary" onClick={() => handleOpenModal('ingredient')}>
            Create Category
          </ThemedButton>
        </EmptyState>
      ) : (
        <CategoryGrid>
          {ingredientCategories.map((cat, idx) => renderCategoryCard(cat, 'ingredient', idx, ingredientCategories, isItemReadOnly(cat)))}
        </CategoryGrid>
      )}

      {/* Create/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={`${editingCategory ? 'Edit' : 'New'} ${modalType === 'recipe' ? 'Recipe' : 'Ingredient'} Category`}
        size="medium"
        footer={
          <>
            <ModalButton variant="secondary" onClick={handleCloseModal}>{t('recipes:categoriesTab.cancel')}</ModalButton>
            <ModalButton variant="primary" onClick={handleSubmit} disabled={!formData.name.trim()}>
              {editingCategory ? 'Update' : 'Create'}
            </ModalButton>
          </>
        }
      >
        <form onSubmit={handleSubmit}>
          <UIFormGroup>
            <FormLabel>Category Name *</FormLabel>
            <FormInput
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder={modalType === 'recipe' ? 'e.g., Main Dishes' : 'e.g., Vegetables'}
              autoFocus
              required
            />
          </UIFormGroup>

          <UIFormGroup>
            <FormLabel>{t('recipes:categoriesTab.description')}</FormLabel>
            <FormTextArea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of this category..."
            />
          </UIFormGroup>

          <UIFormGroup>
            <FormLabel>{t('recipes:categoriesTab.icon')}</FormLabel>
            <EmojiPicker>
              {emojiOptions.map(emoji => (
                <EmojiOption
                  key={emoji}
                  selected={formData.emoji === emoji}
                  onClick={() => setFormData({ ...formData, emoji })}
                  type="button"
                >
                  {emoji}
                </EmojiOption>
              ))}
            </EmojiPicker>
          </UIFormGroup>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={deleteModalOpen}
        onClose={() => { setDeleteModalOpen(false); setCategoryToDelete(null); }}
        onConfirm={handleDeleteConfirm}
        title="Delete Category"
        message={
          categoryToDelete
            ? `Are you sure you want to delete "${categoryToDelete.category.name}"?`
            : ''
        }
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />
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
    </Container>
  );
};

export default CategoriesTab;
