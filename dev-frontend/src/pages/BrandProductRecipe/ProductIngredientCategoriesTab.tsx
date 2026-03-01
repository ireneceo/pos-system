import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { EmptyState } from '../../components/UI/TableComponents';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import { Modal, ModalButton, FormGroup as UIFormGroup, FormLabel, FormInput, FormTextArea } from '../../components/UI/Modal';
import { OrderControls } from '../../components/UI';
import ConfirmModal from '../../components/ConfirmModal';
import { fetchAPI } from '../../utils/api';

interface ProductIngredientCategoriesTabProps {
  onCountChange?: (count: number) => void;
  onCategoryChange?: () => void;
}

interface Category {
  id: number;
  name: string;
  emoji: string | null;
  description: string | null;
  display_order: number;
  is_active: boolean;
  ingredient_count?: number;
}

const Container = styled.div`
  padding: 24px 0;
`;

const CategoryGrid = styled.div`
  display: grid;
  gap: 12px;
`;

const CategoryCard = styled.div<{ isActive?: boolean }>`
  background: white;
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.2s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  opacity: ${props => props.isActive !== false ? 1 : 0.6};

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

const StatusBadge = styled.span<{ active: boolean }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: ${props => props.active ? '#D1FAE5' : '#FEE2E2'};
  color: ${props => props.active ? '#059669' : '#DC2626'};
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

const ProductIngredientCategoriesTab: React.FC<ProductIngredientCategoriesTabProps> = ({ onCountChange, onCategoryChange }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    emoji: '',
    description: ''
  });

  const emojiOptions = [
    '🥩', '🍖', '🥓', '🍗', '🦐', '🦞', '🦀', '🐟', '🥚', '🧀',
    '🥬', '🥦', '🥕', '🧅', '🧄', '🥔', '🍅', '🥒', '🌶️', '🫑',
    '🍎', '🍊', '🍋', '🍇', '🍓', '🫐', '🥝', '🍌', '🥭', '🍍',
    '🧈', '🥛', '🧂', '🍯', '🫒', '🥜', '🌰', '🍚', '🍝', '🥫',
    '🧊', '💧', '🍶', '🫗', '🧴', '🧹', '🧽', '📦', '🏷️', '🔖'
  ];

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetchAPI('/api/product-ingredient-categories');
      if (response.success) {
        setCategories(response.data || []);
        onCountChange?.(response.data?.length || 0);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    } finally {
      setLoading(false);
    }
  }, [onCountChange]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

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
      setFormData({ name: '', emoji: '', description: '' });
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
      setSaving(true);
      const url = editingCategory
        ? `/api/product-ingredient-categories/${editingCategory.id}`
        : '/api/product-ingredient-categories';
      const method = editingCategory ? 'PUT' : 'POST';

      const response = await fetchAPI(url, {
        method,
        body: JSON.stringify({
          name: formData.name.trim(),
          emoji: formData.emoji || null,
          description: formData.description.trim() || null
        })
      });

      if (response.success) {
        handleCloseModal();
        fetchCategories();
        onCategoryChange?.();
      } else {
        alert(response.error || 'Failed to save category');
      }
    } catch (error) {
      console.error('Failed to save category:', error);
      alert('Failed to save category');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteClick = (category: Category) => {
    setCategoryToDelete(category);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!categoryToDelete) return;

    try {
      const response = await fetchAPI(`/api/product-ingredient-categories/${categoryToDelete.id}`, {
        method: 'DELETE'
      });

      if (response.success) {
        setDeleteModalOpen(false);
        setCategoryToDelete(null);
        fetchCategories();
        onCategoryChange?.();
      } else {
        alert(response.error || 'Failed to delete category');
      }
    } catch (error) {
      console.error('Failed to delete category:', error);
      alert('Failed to delete category');
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
      await fetchAPI('/api/product-ingredient-categories/reorder', {
        method: 'PUT',
        body: JSON.stringify({ orders })
      });

      fetchCategories();
    } catch (error) {
      console.error('Failed to reorder:', error);
    }
  };

  const handleToggleActive = async (category: Category) => {
    try {
      const response = await fetchAPI(`/api/product-ingredient-categories/${category.id}`, {
        method: 'PUT',
        body: JSON.stringify({ ...category, is_active: !category.is_active })
      });

      if (response.success) {
        fetchCategories();
      }
    } catch (error) {
      console.error('Failed to toggle category:', error);
    }
  };

  if (loading) {
    return (
      <Container>
        <div style={{ textAlign: 'center', padding: '40px', color: '#6B7280' }}>Loading...</div>
      </Container>
    );
  }

  return (
    <Container>
      <HeaderRow>
        <SectionTitle>Ingredient Categories</SectionTitle>
        <ThemedButton variant="primary" onClick={() => handleOpenModal()}>
          Add Category
        </ThemedButton>
      </HeaderRow>

      {categories.length === 0 ? (
        <EmptyState>
          <EmptyTitle>No categories yet</EmptyTitle>
          <EmptyDescription>Create categories to organize your ingredients</EmptyDescription>
          <ThemedButton variant="primary" onClick={() => handleOpenModal()}>
            Add First Category
          </ThemedButton>
        </EmptyState>
      ) : (
        <CategoryGrid>
          {categories.map((category, index) => (
            <CategoryCard key={category.id} isActive={category.is_active}>
              <OrderControls
                onMoveUp={() => handleReorder(index, 'up')}
                onMoveDown={() => handleReorder(index, 'down')}
                disableUp={index === 0}
                disableDown={index === categories.length - 1}
              />
              {category.emoji && (
                <CategoryIcon>{category.emoji}</CategoryIcon>
              )}
              <CategoryInfo>
                <CategoryName>{category.name}</CategoryName>
                <CategoryMeta>
                  <span>{category.ingredient_count || 0} ingredients</span>
                  <StatusBadge active={category.is_active}>
                    {category.is_active ? 'Active' : 'Inactive'}
                  </StatusBadge>
                </CategoryMeta>
                {category.description && (
                  <CategoryDescription>{category.description}</CategoryDescription>
                )}
              </CategoryInfo>
              <CategoryActions>
                <IconButton onClick={() => handleOpenModal(category)} title="Edit">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </IconButton>
                <IconButton onClick={() => handleToggleActive(category)} title={category.is_active ? 'Deactivate' : 'Activate'}>
                  <svg viewBox="0 0 24 24" fill="none">
                    {category.is_active ? (
                      <path d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    ) : (
                      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    )}
                  </svg>
                </IconButton>
                <IconButton
                  onClick={() => handleDeleteClick(category)}
                  title="Delete"
                  disabled={(category.ingredient_count || 0) > 0}
                >
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </IconButton>
              </CategoryActions>
            </CategoryCard>
          ))}
        </CategoryGrid>
      )}

      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={`${editingCategory ? 'Edit' : 'New'} Ingredient Category`}
        size="medium"
        footer={
          <>
            <ModalButton variant="secondary" onClick={handleCloseModal}>Cancel</ModalButton>
            <ModalButton variant="primary" onClick={handleSubmit} disabled={!formData.name.trim() || saving}>
              {saving ? 'Saving...' : (editingCategory ? 'Update' : 'Create')}
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
              placeholder="e.g., Proteins"
              autoFocus
              required
            />
          </UIFormGroup>

          <UIFormGroup>
            <FormLabel>Icon</FormLabel>
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
            <FormLabel>Description</FormLabel>
            <FormTextArea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of this category..."
              rows={3}
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

export default ProductIngredientCategoriesTab;
