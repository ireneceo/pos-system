import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { EmptyState } from '../../components/UI/TableComponents';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import { Modal, ModalButton, FormGroup as UIFormGroup, FormLabel, FormInput, FormTextArea } from '../../components/UI/Modal';
import { OrderControls } from '../../components/UI';
import ConfirmModal from '../../components/ConfirmModal';

import { getAuthToken } from '../../utils/auth';
interface BrandProductCategoriesTabProps {
  onCountChange: (count: number) => void;
  onCategoryChange?: () => void;
}

interface Category {
  id: number;
  brand_id: number;
  name: string;
  emoji: string | null;
  description: string | null;
  sort_order: number;
  is_active: boolean;
  product_count?: number;
}

const Container = styled.div`
  margin-top: 24px;
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

const BrandProductCategoriesTab: React.FC<BrandProductCategoriesTabProps> = ({
  onCountChange,
  onCategoryChange
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
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
    '📦', '🥫', '🧂', '🌾', '🥛', '🧈', '🥚', '🍖', '🥩', '🍗',
    '🐟', '🦐', '🦑', '🥬', '🥕', '🧅', '🧄', '🥔', '🍅', '🌶️',
    '🍋', '🍊', '🍇', '🍓', '🫐', '🥥', '🥜', '🌰', '🍯', '🫒',
    '🧊', '🍶', '🫙', '🧴', '🧃', '🍵', '☕', '🍺', '🍷', '🥤',
    '🍰', '🧁', '🍪', '🍩', '🍫', '🍬', '🍭', '🧇', '🥐', '🍞'
  ];

  const getToken = useCallback(() => getAuthToken(), []);

  const fetchCategories = useCallback(async () => {
    try {
      const token = getToken();
      const response = await fetch('/api/brand-product-categories', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();

      if (data.success) {
        setCategories(data.data);
        onCountChange(data.data.length);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    } finally {
      setLoading(false);
    }
  }, [getToken, onCountChange]);

  useEffect(() => {
    setLoading(true);
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
      const token = getToken();
      const method = editingCategory ? 'PUT' : 'POST';
      const url = editingCategory
        ? `/api/brand-product-categories/${editingCategory.id}`
        : '/api/brand-product-categories';

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
      const token = getToken();
      const response = await fetch(`/api/brand-product-categories/${categoryToDelete.id}`, {
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

  const handleReorder = async (categoryId: number, direction: 'up' | 'down') => {
    try {
      const token = getToken();
      const response = await fetch(`/api/brand-product-categories/${categoryId}/reorder`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ direction })
      });

      const data = await response.json();

      if (data.success) {
        fetchCategories();
      } else {
        alert(data.error || 'Failed to reorder');
      }
    } catch (error) {
      console.error('Failed to reorder category:', error);
    }
  };

  if (loading) {
  // useTranslation moved to component level

  return (
      <Container>
        <div style={{ textAlign: 'center', padding: '40px', color: '#6B7280' }}>
          Loading categories...
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
        <ThemedButton onClick={() => handleOpenModal()}>
          Add Category
        </ThemedButton>
      </div>

      {categories.length === 0 ? (
        <EmptyState>
          <EmptyTitle>{'No categories yet'}</EmptyTitle>
          <EmptyDescription>{'Create your first product category to organize your products.'}</EmptyDescription>
          <ThemedButton onClick={() => handleOpenModal()}>{'Add Category'}</ThemedButton>
        </EmptyState>
      ) : (
        <CategoryGrid>
          {categories.map((category, index) => (
            <CategoryCard key={category.id} isActive={category.is_active}>
              <OrderControls
                onMoveUp={() => handleReorder(category.id, 'up')}
                onMoveDown={() => handleReorder(category.id, 'down')}
                disableUp={index === 0}
                disableDown={index === categories.length - 1}
              />

              <CategoryIcon>
                {category.emoji || '📦'}
              </CategoryIcon>

              <CategoryInfo>
                <CategoryName>{category.name}</CategoryName>
                <CategoryMeta>
                  <span>{category.product_count || 0} products</span>
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
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                </IconButton>
                <IconButton onClick={() => handleDeleteClick(category)} title="Delete">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                    <line x1="10" y1="11" x2="10" y2="17"/>
                    <line x1="14" y1="11" x2="14" y2="17"/>
                  </svg>
                </IconButton>
              </CategoryActions>
            </CategoryCard>
          ))}
        </CategoryGrid>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={handleCloseModal}
          title={editingCategory ? 'Edit Category' : 'Add Category'}
        >
          <form onSubmit={handleSubmit}>
            <UIFormGroup>
              <FormLabel>Name *</FormLabel>
              <FormInput
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Category name"
                required
              />
            </UIFormGroup>

            <UIFormGroup>
              <FormLabel>{'Emoji'}</FormLabel>
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
              <FormLabel>{'Description'}</FormLabel>
              <FormTextArea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Category description (optional)"
                rows={3}
              />
            </UIFormGroup>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
              <ModalButton type="button" onClick={handleCloseModal}>
                Cancel
              </ModalButton>
              <ModalButton type="submit" variant="primary">
                {editingCategory ? 'Update' : 'Create'}
              </ModalButton>
            </div>
          </form>
        </Modal>
      )}

      {/* Delete Confirm Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        onCancel={() => {
          setDeleteModalOpen(false);
          setCategoryToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Category"
        message={`Are you sure you want to delete "${categoryToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </Container>
  );
};

export default BrandProductCategoriesTab;
