import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { EmptyState } from '../../components/UI/TableComponents';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import {
  Modal,
  ModalButton,
  FormGroup as UIFormGroup,
  FormLabel,
  FormInput,
  FormTextArea
} from '../../components/UI/Modal';
import { OrderControls } from '../../components/UI';
import ConfirmModal from '../../components/ConfirmModal';
import { getAuthToken } from '../../utils/auth';

interface SupplierProductCategory {
  id: number;
  supplier_company_id: number;
  name: string;
  emoji: string | null;
  description: string | null;
  sort_order: number;
  is_active: boolean;
  product_count?: number;
}

interface Props {
  onCountChange: (count: number) => void;
  onCategoryChange?: () => void;
}

const Wrapper = styled.div`
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
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  opacity: ${(props) => (props.isActive !== false ? 1 : 0.6)};

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const CategoryIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #f3f4f6;
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
  color: #1f2937;
  margin-bottom: 4px;
`;

const CategoryMeta = styled.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #6b7280;
`;

const CategoryDescription = styled.div`
  font-size: 13px;
  color: #6b7280;
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
  border: 1px solid #e6ebf1;
  background: #f6f9fc;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    border-color: #635bff;
    background: #f4f3ff;
    transform: translateY(-1px);

    svg {
      color: #635bff;
    }
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    width: 18px;
    height: 18px;
    color: #6b7280;
    transition: color 0.15s;
  }
`;

const StatusBadge = styled.span<{ active: boolean }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: ${(props) => (props.active ? '#D1FAE5' : '#FEE2E2')};
  color: ${(props) => (props.active ? '#059669' : '#DC2626')};
`;

const EmojiPicker = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 4px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
  background: #f9fafb;
  border-radius: 8px;
`;

const EmojiOption = styled.button<{ selected?: boolean }>`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 4px;
  background: ${(props) => (props.selected ? '#E5E7EB' : 'white')};
  border: 1px solid ${(props) => (props.selected ? '#9CA3AF' : '#E5E7EB')};
  cursor: pointer;
  transition: all 0.2s;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${(props) => (props.selected ? '#E5E7EB' : '#F3F4F6')};
  }
`;

const EmptyTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px 0;
`;

const EmptyDescription = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 0 0 16px 0;
`;

const ErrorBanner = styled.div`
  margin-top: 16px;
  padding: 12px 16px;
  background: #fef2f2;
  border: 1px solid #fca5a5;
  border-radius: 8px;
  color: #dc2626;
  font-size: 14px;
`;

const EMOJI_OPTIONS = [
  'PKG', 'CAN', 'BAG', 'BOX', 'JAR', 'BTL',
  'KEG', 'TRY', 'BOL', 'CRT', 'TIN', 'POT'
];

const SupplierProductCategoriesTab: React.FC<Props> = ({ onCountChange, onCategoryChange }) => {
  const { t } = useTranslation('supplier');
  const [categories, setCategories] = useState<SupplierProductCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<SupplierProductCategory | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<SupplierProductCategory | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    emoji: '',
    description: ''
  });

  const fetchCategories = useCallback(async () => {
    try {
      const token = getAuthToken();
      const response = await fetch('/api/supplier-product-categories', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setCategories(data.data || []);
        onCountChange((data.data || []).length);
      }
    } catch (error) {
      console.error('Failed to fetch supplier categories:', error);
    } finally {
      setLoading(false);
    }
  }, [onCountChange]);

  useEffect(() => {
    setLoading(true);
    fetchCategories();
  }, [fetchCategories]);

  const handleOpenModal = (category?: SupplierProductCategory) => {
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
    setFormError(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setFormError(null);
    setFormData({ name: '', emoji: '', description: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!formData.name.trim()) {
      setFormError(t('products.fields.name', 'Name is required'));
      return;
    }
    setIsSubmitting(true);
    setFormError(null);

    try {
      const token = getAuthToken();
      const method = editingCategory ? 'PUT' : 'POST';
      const url = editingCategory
        ? `/api/supplier-product-categories/${editingCategory.id}`
        : '/api/supplier-product-categories';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
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
        await fetchCategories();
        onCategoryChange?.();
      } else {
        setFormError(data.message || 'Failed to save category');
      }
    } catch (error) {
      console.error('Failed to save category:', error);
      setFormError('Failed to save category');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = (category: SupplierProductCategory) => {
    setCategoryToDelete(category);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!categoryToDelete) return;
    try {
      const token = getAuthToken();
      const response = await fetch(`/api/supplier-product-categories/${categoryToDelete.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setDeleteModalOpen(false);
        setCategoryToDelete(null);
        await fetchCategories();
        onCategoryChange?.();
      } else {
        setFormError(data.message || 'Failed to delete category');
      }
    } catch (error) {
      console.error('Failed to delete category:', error);
      setFormError('Failed to delete category');
    }
  };

  const handleReorder = async (index: number, direction: 'up' | 'down') => {
    const target = categories[index];
    const swapWith = direction === 'up' ? categories[index - 1] : categories[index + 1];
    if (!target || !swapWith) return;

    try {
      const token = getAuthToken();
      await Promise.all([
        fetch(`/api/supplier-product-categories/${target.id}/reorder`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ sort_order: swapWith.sort_order })
        }),
        fetch(`/api/supplier-product-categories/${swapWith.id}/reorder`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ sort_order: target.sort_order })
        })
      ]);
      await fetchCategories();
      onCategoryChange?.();
    } catch (error) {
      console.error('Failed to reorder category:', error);
    }
  };

  if (loading) {
    return (
      <Wrapper>
        <div style={{ textAlign: 'center', padding: '40px', color: '#6B7280' }}>
          Loading categories...
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
        <ThemedButton onClick={() => handleOpenModal()}>
          {t('products.addCategory', 'Add Category')}
        </ThemedButton>
      </div>

      {categories.length === 0 ? (
        <EmptyState>
          <EmptyTitle>No categories yet</EmptyTitle>
          <EmptyDescription>
            Create your first product category to organize your catalog.
          </EmptyDescription>
          <ThemedButton onClick={() => handleOpenModal()}>
            {t('products.addCategory', 'Add Category')}
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

              <CategoryIcon>{category.emoji || 'PKG'}</CategoryIcon>

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
                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </IconButton>
                <IconButton onClick={() => handleDeleteClick(category)} title="Delete">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                    <line x1="10" y1="11" x2="10" y2="17" />
                    <line x1="14" y1="11" x2="14" y2="17" />
                  </svg>
                </IconButton>
              </CategoryActions>
            </CategoryCard>
          ))}
        </CategoryGrid>
      )}

      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={handleCloseModal}
          title={editingCategory ? 'Edit Category' : t('products.addCategory', 'Add Category')}
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
              <FormLabel>Icon</FormLabel>
              <EmojiPicker>
                {EMOJI_OPTIONS.map((emoji) => (
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
              <FormLabel>Description</FormLabel>
              <FormTextArea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Category description (optional)"
                rows={3}
              />
            </UIFormGroup>

            <div
              style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'flex-end',
                marginTop: '24px'
              }}
            >
              <ModalButton type="button" onClick={handleCloseModal} disabled={isSubmitting}>
                Cancel
              </ModalButton>
              <ModalButton type="submit" variant="primary" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : editingCategory ? 'Update' : 'Create'}
              </ModalButton>
            </div>

            {formError && <ErrorBanner>{formError}</ErrorBanner>}
          </form>
        </Modal>
      )}

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
    </Wrapper>
  );
};

export default SupplierProductCategoriesTab;
