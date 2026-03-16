import React, { useState } from 'react';
import styled from 'styled-components';
import { EmptyState } from '../../components/UI/TableComponents';
import { useMenu } from '../../contexts/MenuContext';
import ConfirmDialog from '../../components/Common/ConfirmDialog';
import { Modal as UIModal, ModalButton } from '../../components/UI/Modal';
import { OrderControls } from '../../components/UI';

const Container = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`;

const Content = styled.div`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`;

const Header = styled.header`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
`;

const HeaderTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 12px;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  
  ${props => {
    switch (props.variant) {
      case 'danger':
        return `
          background: #FEF2F2;
          color: #EF4444;
          border: 1px solid #EF4444;
          &:hover {
            background: #FEE2E2;
          }
        `;
      case 'secondary':
        return `
          background: white;
          color: #6B7280;
          border: 1px solid #E5E7EB;
          &:hover {
            background: #F9FAFB;
          }
        `;
      default:
        return `
          background: #635BFF;
          color: white;
          &:hover {
            background: #5246ED;
          }
        `;
    }
  }}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CategoryGrid = styled.div`
  display: grid;
  gap: 16px;
  padding: 24px 0;
`;

const CategoryCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.2s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  
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
  
  svg {
    width: 18px;
    height: 18px;
    color: #6B7280;
  }
`;

// Removed: Using standard UI Modal component instead

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
  flex-shrink: 0;
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: #635BFF;
  }

  &:checked + span:before {
    transform: translateX(20px);
  }
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #E5E7EB;
  transition: 0.3s;
  border-radius: 24px;

  &:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.3s;
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  }
`;

const StatusBadge = styled.span<{ active: boolean }>`
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 4px;
  background: ${props => props.active ? '#ECFDF5' : '#FEF2F2'};
  color: ${props => props.active ? '#059669' : '#DC2626'};
  margin-left: 8px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  padding: 10px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
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

// Removed: Using standard UI Modal component footer instead


const EmptyIcon = styled.div`
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.5;
`;

const EmptyTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`;

const EmptyDescription = styled.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 24px 0;
`;

interface Category {
  id: string;
  name: string;
  emoji: string;
  order: number;
  itemCount?: number;
  isActive?: boolean;
}

const CategoryManagementPage: React.FC = () => {
  const { categories, menuItems, addCategory, updateCategory, deleteCategory, reorderCategories } = useMenu();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<{ id: string; name: string; itemCount: number } | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    emoji: '🍽️'
  });

  const emojiOptions = [
    '🍔', '🍕', '🍗', '🥗', '🍜', '🍝', '🍤', '🥘', '🍛', '🍲',
    '☕', '🥤', '🧃', '🍵', '🧋', '🍺', '🍷', '🥃', '🍹', '🍸',
    '🍰', '🧁', '🍪', '🍩', '🍨', '🍧', '🍦', '🍮', '🍭', '🍫',
    '🥐', '🥖', '🍞', '🥨', '🥯', '🧇', '🥞', '🍳', '🥚', '🧈',
    '🍱', '🍙', '🍘', '🍣', '🍥', '🍡', '🍢', '🍠', '🥟', '🥠',
    '🌮', '🌯', '🥙', '🫔', '🥪', '🌭', '🍟', '🫓', '🥓', '🧆'
  ];

  // Calculate item count for each category and sort by order
  const categoriesWithCount = categories
    .map(cat => ({
      ...cat,
      itemCount: menuItems.filter(item => item.category === cat.id).length
    }))
    .sort((a, b) => a.order - b.order);

  const handleOpenModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        emoji: category.emoji
      });
    } else {
      setEditingCategory(null);
      setFormData({
        name: '',
        emoji: '🍽️'
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    setFormData({
      name: '',
      emoji: '🍽️'
    });
  };

  const handleSave = async () => {
    if (!formData.name.trim()) return;

    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, {
          ...formData,
          id: editingCategory.id,
          order: editingCategory.order
        });
      } else {
        const newCategory = {
          id: `cat-${Date.now()}`,
          ...formData,
          order: categories.length
        };
        await addCategory(newCategory);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Failed to save category:', error);
      alert('Failed to save category. Please try again.');
    }
  };

  const handleDeleteClick = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    if (!category) return;

    const itemCount = menuItems.filter(item => item.category === categoryId).length;
    setCategoryToDelete({
      id: categoryId,
      name: category.name,
      itemCount
    });
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!categoryToDelete) return;

    try {
      await deleteCategory(categoryToDelete.id);
      setIsDeleteModalOpen(false);
      setCategoryToDelete(null);
    } catch (error) {
      console.error('Failed to delete category:', error);
      alert('Failed to delete category. Please try again.');
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setCategoryToDelete(null);
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const items = [...categoriesWithCount];
    [items[index - 1], items[index]] = [items[index], items[index - 1]];
    const updatedCategories = items.map((item, idx) => ({
      ...item,
      order: idx
    }));
    reorderCategories(updatedCategories);
  };

  const handleMoveDown = (index: number) => {
    if (index === categoriesWithCount.length - 1) return;
    const items = [...categoriesWithCount];
    [items[index], items[index + 1]] = [items[index + 1], items[index]];
    const updatedCategories = items.map((item, idx) => ({
      ...item,
      order: idx
    }));
    reorderCategories(updatedCategories);
  };

  const handleToggleActive = async (category: Category) => {
    try {
      const pathParts = window.location.pathname.split('/');
      const restaurantIndex = pathParts.indexOf('restaurant');
      const restaurantId = restaurantIndex >= 0 ? pathParts[restaurantIndex + 1] : null;

      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/categories/id/${category.id}/toggle-active?restaurantId=${restaurantId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          // Update local state via updateCategory
          await updateCategory(category.id, { ...category, isActive: result.data.isActive });
        }
      }
    } catch (error) {
      console.error('Failed to toggle category:', error);
    }
  };

  return (
    <>
      <Container>
        <Header>
          <HeaderTitle>Categories</HeaderTitle>
          <HeaderActions>
          <Button onClick={() => handleOpenModal()}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Add Category
          </Button>
        </HeaderActions>
      </Header>

      <Content>
        {categoriesWithCount.length === 0 ? (
          <EmptyState>
          <EmptyIcon>📂</EmptyIcon>
          <EmptyTitle>No categories yet</EmptyTitle>
          <EmptyDescription>
            Create your first category to organize your menu items
          </EmptyDescription>
          <Button onClick={() => handleOpenModal()}>
            Create Category
          </Button>
        </EmptyState>
      ) : (
        <CategoryGrid>
          {categoriesWithCount.map((category, index) => (
            <CategoryCard key={category.id}>
              <OrderControls
                onMoveUp={() => handleMoveUp(index)}
                onMoveDown={() => handleMoveDown(index)}
                disableUp={index === 0}
                disableDown={index === categoriesWithCount.length - 1}
              />
              <CategoryIcon>
                {category.emoji}
              </CategoryIcon>
              <CategoryInfo>
                <CategoryName>
                  {category.name}
                  {category.isActive === false && <StatusBadge active={false}>Inactive</StatusBadge>}
                </CategoryName>
                <CategoryMeta>
                  <span>{category.itemCount || 0} items</span>
                  <span>Position {index + 1}</span>
                </CategoryMeta>
              </CategoryInfo>
              <ToggleSwitch title={category.isActive !== false ? 'Click to hide from POS/Mobile' : 'Click to show on POS/Mobile'}>
                <ToggleInput
                  type="checkbox"
                  checked={category.isActive !== false}
                  onChange={() => handleToggleActive(category)}
                />
                <ToggleSlider />
              </ToggleSwitch>
              <CategoryActions>
                <IconButton onClick={() => handleOpenModal(category)}>
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </IconButton>
                <IconButton onClick={() => handleDeleteClick(category.id)}>
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </IconButton>
              </CategoryActions>
            </CategoryCard>
          ))}
          </CategoryGrid>
        )}
      </Content>

      <UIModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingCategory ? 'Edit Category' : 'New Category'}
        size="medium"
        footer={
          <>
            <ModalButton variant="secondary" onClick={handleCloseModal}>
              Cancel
            </ModalButton>
            <ModalButton variant="primary" onClick={handleSave} disabled={!formData.name.trim()}>
              {editingCategory ? 'Update' : 'Create'}
            </ModalButton>
          </>
        }
      >
        <FormGroup>
          <Label>Category Name</Label>
          <Input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Main Dishes"
            autoFocus
          />
        </FormGroup>

        <FormGroup>
          <Label>Icon</Label>
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
        </FormGroup>

      </UIModal>

        {/* Delete Confirmation Dialog */}
        <ConfirmDialog
          isOpen={isDeleteModalOpen}
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
          title="Delete Category"
          message={
            categoryToDelete
              ? `Are you sure you want to delete "${categoryToDelete.name}"?${
                  categoryToDelete.itemCount > 0
                    ? `\n\nThis category contains ${categoryToDelete.itemCount} menu item${categoryToDelete.itemCount > 1 ? 's' : ''}. They will be moved to 'Uncategorized'.`
                    : ''
                }`
              : ''
          }
          confirmText="Delete"
          cancelText="Cancel"
          variant="danger"
        />
      </Container>
    </>
  );
};

export default CategoryManagementPage;