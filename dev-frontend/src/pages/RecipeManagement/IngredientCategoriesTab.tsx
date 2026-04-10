import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { EmptyState } from '../../components/UI/TableComponents';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import { useAuth } from '../../contexts/AuthContext';
import { Modal, ModalButton, FormGroup as UIFormGroup, FormLabel, FormInput, FormTextArea } from '../../components/UI/Modal';
import { OrderControls } from '../../components/UI';
import ConfirmModal from '../../components/ConfirmModal';
import { useTranslation } from 'react-i18next';

import { getAuthToken } from '../../utils/auth';
interface IngredientCategoriesTabProps {
  brandId: number | null;
  restaurantId?: number | null;
  onCountChange: (count: number) => void;
  onCategoryChange?: () => void;
}

interface Category {
  id: number;
  brand_id: number | null;
  restaurant_id: number | null;
  owner_type: 'brand' | 'restaurant';
  name: string;
  emoji: string | null;
  description: string | null;
  display_order: number;
  is_active: boolean;
  ingredient_count?: number;
  editable?: boolean;
}

const Container = styled.div`
  padding: 24px 0;
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
  border-radius: 6px;
  border: 1px solid #E6EBF1;
  background: #F6F9FC;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    border-color: #635BFF;
    background: #F4F3FF;
    transform: translateY(-1px);

    svg {
      color: #635BFF;
    }
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: 18px;
    height: 18px;
    color: #6B7280;
    transition: color 0.15s;
  }
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

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
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
  background: ${props => props.selected ? '#E5E7EB' : 'white'};
  border: 1px solid ${props => props.selected ? '#9CA3AF' : '#E5E7EB'};
  cursor: pointer;
  transition: all 0.2s;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${props => props.selected ? '#E5E7EB' : '#F3F4F6'};
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

const IngredientCategoriesTab: React.FC<IngredientCategoriesTabProps> = ({ brandId, restaurantId: propsRestaurantId, onCountChange, onCategoryChange }) => {
  const { t } = useTranslation('recipes');
  const { user } = useAuth();
  // URL 파라미터의 restaurantId가 우선, 없으면 user.restaurant_id 사용
  const effectiveRestaurantId = propsRestaurantId || user?.restaurant_id || (user as any)?.restaurantId;
  const [categories, setCategories] = useState<Category[]>([]);
  const [brandCategories, setBrandCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    emoji: '',
    description: ''
  });

  const emojiOptions = [
    '🥬', '🥕', '🧅', '🧄', '🥔', '🍅', '🌶️', '🥒', '🌽', '🥦',
    '🍖', '🥩', '🍗', '🥓', '🍤', '🦐', '🦑', '🐟', '🦞', '🦀',
    '🥛', '🧀', '🥚', '🧈', '🍶', '🧂', '🫒', '🥜', '🌰', '🍯',
    '🌾', '🍚', '🍞', '🥖', '🥐', '🧁', '🍰', '🍪', '🍩', '🍫',
    '🍋', '🍊', '🍎', '🍐', '🍌', '🍇', '🍓', '🫐', '🍑', '🥭',
    '🧊', '💧', '🫙', '🍾', '🥫', '🧴', '🍵', '☕', '🧃', '🥤'
  ];

  const isRestaurantAdmin = user?.role === 'Restaurant Admin';
  const isBrandUser = user?.role === 'Brand General' || user?.role === 'Brand Manager';
  // Restaurant Admin은 자신의 카테고리만 수정/삭제 가능 (브랜드 카테고리는 읽기전용)
  const isItemReadOnly = (item: Category) => isRestaurantAdmin && item.owner_type === 'brand';

  // Helper to get auth token
  const getToken = useCallback(() => getAuthToken(), []);

  // Parallel fetch all data
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      const token = getToken();

      try {
        if (isBrandUser && brandId) {
          const response = await fetch(`/api/brands/${brandId}/ingredient-categories`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const data = await response.json();

          if (data.success) {
            setCategories(data.data);
            onCountChange(data.data.length);
          }
        } else if (isRestaurantAdmin && effectiveRestaurantId) {
          const response = await fetch(`/api/restaurants/${effectiveRestaurantId}/ingredient-categories`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const categoriesRes = await response.json();

          if (categoriesRes.success) {
            setCategories(categoriesRes.data.own_categories || []);
            setBrandCategories(categoriesRes.data.brand_categories || []);
            onCountChange((categoriesRes.data.own_categories?.length || 0) + (categoriesRes.data.brand_categories?.length || 0));
          }
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [brandId, effectiveRestaurantId, isBrandUser, isRestaurantAdmin, getToken, onCountChange]);

  const fetchCategories = async () => {
    try {
      const token = getToken();

      if (isBrandUser && brandId) {
        const response = await fetch(`/api/brands/${brandId}/ingredient-categories`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();

        if (data.success) {
          setCategories(data.data);
          onCountChange(data.data.length);
        }
      } else if (isRestaurantAdmin && effectiveRestaurantId) {
        const response = await fetch(`/api/restaurants/${effectiveRestaurantId}/ingredient-categories`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();

        if (data.success) {
          setCategories(data.data.own_categories || []);
          setBrandCategories(data.data.brand_categories || []);
          onCountChange((data.data.own_categories?.length || 0) + (data.data.brand_categories?.length || 0));
        }
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleOpenModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        emoji: category.emoji || '',
        description: category.description || ''
      });
    } else {
      setEditingCategory(null);
      setFormData({
        name: '',
        emoji: '',
        description: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setFormData({ name: '', emoji: '', description: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    try {
      const token = getAuthToken();
      let url = '';
      const method = editingCategory ? 'PUT' : 'POST';

      if (isBrandUser && brandId) {
        url = editingCategory
          ? `/api/brands/${brandId}/ingredient-categories/${editingCategory.id}`
          : `/api/brands/${brandId}/ingredient-categories`;
      } else if (isRestaurantAdmin && effectiveRestaurantId) {
        url = editingCategory
          ? `/api/restaurants/${effectiveRestaurantId}/ingredient-categories/${editingCategory.id}`
          : `/api/restaurants/${effectiveRestaurantId}/ingredient-categories`;
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
          emoji: formData.emoji || null,
          description: formData.description.trim() || null
        })
      });

      const data = await response.json();

      if (data.success) {
        handleCloseModal();
        fetchCategories();
        onCategoryChange?.();
      } else {
        alert(data.error || 'Failed to save');
      }
    } catch (error) {
      console.error('Failed to save category:', error);
      alert('Failed to save');
    }
  };

  const handleDeleteClick = (category: Category) => {
    setCategoryToDelete(category);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!categoryToDelete) return;

    try {
      const token = getAuthToken();
      let url = '';

      if (isBrandUser && brandId) {
        url = `/api/brands/${brandId}/ingredient-categories/${categoryToDelete.id}`;
      } else if (isRestaurantAdmin && effectiveRestaurantId) {
        url = `/api/restaurants/${effectiveRestaurantId}/ingredient-categories/${categoryToDelete.id}`;
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
        onCategoryChange?.();
      } else {
        alert(data.error || 'Failed to delete');
      }
    } catch (error) {
      console.error('Failed to delete category:', error);
      alert('Failed to delete');
    }
  };

  const handleReorder = async (index: number, direction: 'up' | 'down') => {
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
        url = `/api/brands/${brandId}/ingredient-categories/reorder`;
      } else if (isRestaurantAdmin && effectiveRestaurantId) {
        url = `/api/restaurants/${effectiveRestaurantId}/ingredient-categories/reorder`;
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

  const renderCategoryCard = (category: Category, index: number, categoryList: Category[], readOnly: boolean = false) => {
    return (
      <CategoryCard key={category.id} isActive={category.is_active} readOnly={readOnly}>
        {!readOnly && (
          <OrderControls
            onMoveUp={() => handleReorder(index, 'up')}
            onMoveDown={() => handleReorder(index, 'down')}
            disableUp={index === 0}
            disableDown={index === categoryList.length - 1}
          />
        )}
        {category.emoji && (
          <CategoryIcon>{category.emoji}</CategoryIcon>
        )}
        <CategoryInfo>
          <CategoryName>
            {category.name}
            {readOnly && <ReadOnlyBadge>{t('recipes:ingredientCategoriesTab.brand')}</ReadOnlyBadge>}
          </CategoryName>
          <CategoryMeta>
            <span>{category.ingredient_count || 0} ingredients</span>
            {!readOnly && <StatusBadge active={category.is_active}>{category.is_active ? 'Active' : 'Inactive'}</StatusBadge>}
          </CategoryMeta>
          {category.description && <CategoryDescription>{category.description}</CategoryDescription>}
        </CategoryInfo>
        {!readOnly && (
          <CategoryActions>
            <IconButton onClick={() => handleOpenModal(category)} title="Edit">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </IconButton>
            <IconButton onClick={() => handleDeleteClick(category)} title="Delete">
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
        <div style={{ textAlign: 'center', padding: '40px', color: '#6B7280' }}>{t('recipes:ingredientCategoriesTab.loading')}</div>
      </Container>
    );
  }

  return (
    <Container>
      <HeaderRow>
        <SectionTitle>{t('recipes:ingredientCategoriesTab.ingredientCategories')}</SectionTitle>
        <ThemedButton variant="primary" onClick={() => handleOpenModal()}>
          Add Category
        </ThemedButton>
      </HeaderRow>

      {isRestaurantAdmin && brandCategories.length > 0 && (
        <BrandCategoriesSection>
          <BrandCategoriesHeader>
            Brand Categories (Read Only)
          </BrandCategoriesHeader>
          <CategoryGrid>
            {brandCategories.map((cat, idx) => renderCategoryCard(cat, idx, brandCategories, true))}
          </CategoryGrid>
        </BrandCategoriesSection>
      )}

      {categories.length === 0 ? (
        <EmptyState>
          <EmptyTitle>{t('recipes:ingredientCategoriesTab.noIngredientCategoriesYet')}</EmptyTitle>
          <EmptyDescription>
            Create categories to organize your ingredients
          </EmptyDescription>
          <ThemedButton variant="primary" onClick={() => handleOpenModal()}>
            Add Category
          </ThemedButton>
        </EmptyState>
      ) : (
        <CategoryGrid>
          {categories.map((cat, idx) => renderCategoryCard(cat, idx, categories, isItemReadOnly(cat)))}
        </CategoryGrid>
      )}

      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={`${editingCategory ? 'Edit' : 'New'} Ingredient Category`}
        size="medium"
        footer={
          <>
            <ModalButton variant="secondary" onClick={handleCloseModal}>{t('recipes:ingredientCategoriesTab.cancel')}</ModalButton>
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
              placeholder="e.g., Vegetables"
              autoFocus
              required
            />
          </UIFormGroup>

          <UIFormGroup>
            <FormLabel>{t('recipes:ingredientCategoriesTab.icon')}</FormLabel>
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

          <UIFormGroup>
            <FormLabel>{t('recipes:ingredientCategoriesTab.description')}</FormLabel>
            <FormTextArea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of this category..."
            />
          </UIFormGroup>
        </form>
      </Modal>

      <ConfirmModal
        isOpen={deleteModalOpen}
        onCancel={() => { setDeleteModalOpen(false); setCategoryToDelete(null); }}
        onConfirm={handleDeleteConfirm}
        title="Delete Category"
        message={
          categoryToDelete
            ? `Are you sure you want to delete "${categoryToDelete.name}"? This action cannot be undone.`
            : ''
        }
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </Container>
  );
};

export default IngredientCategoriesTab;
