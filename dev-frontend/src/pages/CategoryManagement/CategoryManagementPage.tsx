import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { FolderOpen } from 'lucide-react';
import { EmptyState } from '../../components/UI/TableComponents';
import { useMenu } from '../../contexts/MenuContext';
import ConfirmDialog from '../../components/Common/ConfirmDialog';
import ConfirmModal from '../../components/ConfirmModal';
import { Modal as UIModal, ModalButton } from '../../components/UI/Modal';
import { OrderControls } from '../../components/UI';

import { getAuthToken } from '../../utils/auth';
const Container = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #F9FAFB;
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
  border-bottom: 1px solid #C7CED6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  min-height: 80px;
  max-height: 80px;
  box-sizing: border-box;
  /* 태블릿 세로(769~1024) — 이 구간 규칙이 없어 우측 내용이 넘치면 80px 고정에 잘렸다.
     내용이 접히면 높이만 늘어난다. PC·모바일 동작은 그대로. (2026-09-08 Irene) */
  @media (min-width: 769px) and (max-width: 1024px) {
    height: auto;
    min-height: 80px;
    max-height: none;
  }

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
          color: #4B5563;
          border: 1px solid #C7CED6;
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

const CategoryCard = styled.div<{ $sub?: boolean }>`
  background: white;
  margin-left: ${p => (p.$sub ? '40px' : '0')};
  border-left: ${p => (p.$sub ? '3px solid #C7D2FE' : '0')};
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
  background: #F1F4F8;
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
  color: #4B5563;
`;

const CategoryActions = styled.div`
  display: flex;
  gap: 8px;
`;

const IconButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid #C7CED6;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #F9FAFB;
    border-color: #6B7280;
  }
  
  svg {
    width: 18px;
    height: 18px;
    color: #4B5563;
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
  background-color: #C7CED6;
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
  color: #1F2937;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  padding: 10px 12px;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;
// #11c 크로스셀 — 카테고리 추천소스 선택(자동/항상포함/제외)
const Select = styled.select`
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  padding: 10px 12px;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  font-size: 14px;
  background: #FFFFFF;
  cursor: pointer;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;
const Hint = styled.p`
  margin: 8px 0 0 0;
  font-size: 12px;
  color: #6B7280;
  line-height: 1.5;
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
  background: ${props => props.selected ? '#C7CED6' : 'white'};
  border: 1px solid ${props => props.selected ? '#6B7280' : '#C7CED6'};
  cursor: pointer;
  transition: all 0.2s;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${props => props.selected ? '#C7CED6' : '#F1F4F8'};
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
  color: #4B5563;
  margin: 0 0 24px 0;
`;

interface Category {
  id: string;
  name: string;
  emoji: string;
  order: number;
  itemCount?: number;
  isActive?: boolean;
  is_recommendation_source?: boolean | null;
  parent_id?: string | null;
}

// #11c 크로스셀 — 카테고리 이름이 자동감지 추천 키워드(디저트/음료 등)에 걸리는지 (백엔드 crossSell.js 와 동일 키워드)
const REC_KEYWORDS = ['dessert', 'desserts', '디저트', 'drink', 'drinks', '음료', '음료수', 'beverage', 'beverages']; /* i18n-ok: 표시 문구가 아니라 매칭 키워드다. 백엔드 crossSell.js 와 같은 목록이라 번역하면 자동감지가 깨진다 */
const autoDetectsAsRecommendation = (name: string) => {
  const n = (name || '').trim().toLowerCase();
  return !!n && REC_KEYWORDS.some(k => n.includes(k));
};

const CategoryManagementPage: React.FC = () => {
  const { t } = useTranslation(['menu']);
  // 카테고리 관리 = 전체 목록(상위·하위). POS·메뉴 관리가 쓰는 categories 는 묶음 칸(하위 있는 상위)이 빠진 목록.
  const { allCategories: categories, menuItems, addCategory, updateCategory, deleteCategory, reorderCategories } = useMenu();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [infoModal, setInfoModal] = useState<{ open: boolean; title: string; message: string }>({ open: false, title: '', message: '' });
  const [categoryToDelete, setCategoryToDelete] = useState<{ id: string; name: string; itemCount: number } | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState<{ name: string; emoji: string; is_recommendation_source: boolean | null; parent_id: string; move_menus: boolean }>({
    name: '',
    emoji: '🍽️',
    is_recommendation_source: null,
    parent_id: '',
    move_menus: true
  });
  const [recSaving, setRecSaving] = useState(false);

  const emojiOptions = [
    '🍔', '🍕', '🍗', '🥗', '🍜', '🍝', '🍤', '🥘', '🍛', '🍲',
    '☕', '🥤', '🧃', '🍵', '🧋', '🍺', '🍷', '🥃', '🍹', '🍸',
    '🍰', '🧁', '🍪', '🍩', '🍨', '🍧', '🍦', '🍮', '🍭', '🍫',
    '🥐', '🥖', '🍞', '🥨', '🥯', '🧇', '🥞', '🍳', '🥚', '🧈',
    '🍱', '🍙', '🍘', '🍣', '🍥', '🍡', '🍢', '🍠', '🥟', '🥠',
    '🌮', '🌯', '🥙', '🫔', '🥪', '🌭', '🍟', '🫓', '🥓', '🧆'
  ];

  // Calculate item count for each category and sort by order
  // 2단 카테고리(docs/MENU_CATEGORY_TWO_LEVEL.md): 상위 다음에 그 하위들을 들여써서 보인다. 순서 바꾸기는 형제끼리.
  const withCount = categories.map(cat => ({
    ...cat,
    itemCount: menuItems.filter(item => item.category === cat.id).length,
    childCount: categories.filter(c => c.parent_id && c.parent_id === cat.id).length
  }));
  const byOrder = (a: { order: number }, b: { order: number }) => a.order - b.order;
  const topLevel = withCount.filter(c => !c.parent_id || !withCount.some(p => p.id === c.parent_id)).sort(byOrder);
  const childrenOf = (id: string) => withCount.filter(c => c.parent_id === id).sort(byOrder);
  const categoryRows = topLevel.flatMap(top => [
    { cat: top, sub: false, siblings: topLevel },
    ...childrenOf(top.id).map(ch => ({ cat: ch, sub: true, siblings: childrenOf(top.id) }))
  ]);
  const categoriesWithCount = categoryRows.map(r => r.cat);
  const nameOf = (id?: string | null) => (id ? categories.find(c => c.id === id)?.name || '' : '');
  // 상위로 고를 수 있는 것: 1단 카테고리(자기 자신 제외). 하위가 있는 카테고리는 다른 밑으로 못 감(2단까지).
  const parentOptions = topLevel.filter(c => c.id !== editingCategory?.id);
  const editingHasChildren = !!editingCategory && withCount.some(c => c.parent_id === editingCategory.id);
  const chosenParent = formData.parent_id ? withCount.find(c => c.id === formData.parent_id) : undefined;
  const parentChanged = (formData.parent_id || '') !== (editingCategory?.parent_id || '');
  const parentMenuCount = chosenParent && parentChanged ? chosenParent.itemCount : 0;

  const handleOpenModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        emoji: category.emoji,
        is_recommendation_source: category.is_recommendation_source ?? null,
        parent_id: category.parent_id || '',
        move_menus: true
      });
    } else {
      setEditingCategory(null);
      setFormData({
        name: '',
        emoji: '🍽️',
        is_recommendation_source: null,
        parent_id: '',
        move_menus: true
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    setFormData({
      name: '',
      emoji: '🍽️',
      is_recommendation_source: null,
      parent_id: '',
      move_menus: true
    });
  };

  // #11c 크로스셀 — 카테고리 추천소스 플래그 저장(true=항상포함 / false=제외 / null=자동감지)
  const saveRecommendationSource = async (categoryId: string, value: boolean | null) => {
    const pathParts = window.location.pathname.split('/');
    const restaurantIndex = pathParts.indexOf('restaurant');
    const restaurantId = restaurantIndex >= 0 ? pathParts[restaurantIndex + 1] : null;
    if (!restaurantId) return;
    const token = getAuthToken();
    setRecSaving(true);
    try {
      const res = await fetch(`/api/restaurants/${restaurantId}/categories/${categoryId}/recommendation-source`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ value })
      });
      if (!res.ok) throw new Error('Failed to update recommendation source');
    } finally {
      setRecSaving(false);
    }
  };

  const handleSave = async () => {
    if (!formData.name.trim()) return;

    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, {
          name: formData.name,
          emoji: formData.emoji,
          id: editingCategory.id,
          order: editingCategory.order,
          ...(parentChanged ? { parent_id: formData.parent_id || null, move_menus: parentMenuCount > 0 && formData.move_menus } : {})
        });
        // #11c 크로스셀 — 추천소스 플래그 변경 시에만 전용 엔드포인트로 저장(name/emoji 와 별개)
        if ((formData.is_recommendation_source ?? null) !== (editingCategory.is_recommendation_source ?? null)) {
          await saveRecommendationSource(editingCategory.id, formData.is_recommendation_source);
        }
      } else {
        const newCategory = {
          id: `cat-${Date.now()}`,
          name: formData.name,
          emoji: formData.emoji,
          order: categories.length,
          parent_id: formData.parent_id || null,
          move_menus: parentMenuCount > 0 && formData.move_menus
        };
        await addCategory(newCategory);
      }
      handleCloseModal();
    } catch (error: any) {
      console.error('Failed to save category:', error);
      setInfoModal({ open: true, title: 'Save Failed', message: error?.message || 'Failed to save category. Please try again.' });
    }
  };

  const handleDeleteClick = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    if (!category) return;
    // 하위가 있으면 지울 수 없다 — 서버도 거절한다(CATEGORY_HAS_CHILDREN). 먼저 안내.
    if (categories.some(c => c.parent_id === categoryId)) {
      setInfoModal({
        open: true,
        title: t('menu:categoryManagementPage.cannotDeleteTitle', 'Cannot delete'),
        message: t('menu:categoryManagementPage.cannotDeleteHasSubs', { name: category.name, defaultValue: '"{{name}}" has subcategories. Move or delete its subcategories first.' })
      });
      return;
    }

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
    } catch (error: any) {
      console.error('Failed to delete category:', error);
      setInfoModal({ open: true, title: 'Delete Failed', message: error?.message || 'Failed to delete category. Please try again.' });
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setCategoryToDelete(null);
  };

  // 형제(같은 상위 아래, 또는 1단끼리) 안에서만 자리를 바꾼다 → 화면 순서대로 전체 order 를 다시 매긴다.
  const moveWithinSiblings = (rowIndex: number, dir: -1 | 1) => {
    const row = categoryRows[rowIndex];
    const sibs = [...row.siblings];
    const i = sibs.findIndex(s => s.id === row.cat.id);
    const j = i + dir;
    if (j < 0 || j >= sibs.length) return;
    [sibs[i], sibs[j]] = [sibs[j], sibs[i]];
    const tops = row.sub ? topLevel : sibs;
    const flat = tops.flatMap(top => [top, ...(row.sub && top.id === row.cat.parent_id ? sibs : childrenOf(top.id))]);
    const updatedCategories = flat.map(({ itemCount, childCount, ...item }, idx) => ({ ...item, order: idx }));
    reorderCategories(updatedCategories);
  };
  const handleMoveUp = (index: number) => moveWithinSiblings(index, -1);
  const handleMoveDown = (index: number) => moveWithinSiblings(index, 1);
  const isFirstSibling = (index: number) => categoryRows[index].siblings[0]?.id === categoryRows[index].cat.id;
  const isLastSibling = (index: number) => {
    const sibs = categoryRows[index].siblings;
    return sibs[sibs.length - 1]?.id === categoryRows[index].cat.id;
  };

  const handleToggleActive = async (category: Category) => {
    try {
      const pathParts = window.location.pathname.split('/');
      const restaurantIndex = pathParts.indexOf('restaurant');
      const restaurantId = restaurantIndex >= 0 ? pathParts[restaurantIndex + 1] : null;

      const token = getAuthToken();
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
          <HeaderTitle>{'Categories'}</HeaderTitle>
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
          <EmptyIcon><FolderOpen size={48} color="#9CA3AF" /></EmptyIcon>
          <EmptyTitle>{'No categories yet'}</EmptyTitle>
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
            <CategoryCard key={category.id} $sub={categoryRows[index].sub}>
              <OrderControls
                onMoveUp={() => handleMoveUp(index)}
                onMoveDown={() => handleMoveDown(index)}
                disableUp={isFirstSibling(index)}
                disableDown={isLastSibling(index)}
              />
              <CategoryIcon>
                {category.emoji}
              </CategoryIcon>
              <CategoryInfo>
                <CategoryName>
                  {category.name}
                  {category.isActive === false && <StatusBadge active={false}>{'Inactive'}</StatusBadge>}
                </CategoryName>
                <CategoryMeta>
                  {category.childCount > 0
                    ? <span>{t('menu:categoryManagementPage.subcategoryCount', { n: category.childCount, defaultValue: 'Subcategories: {{n}}' })}</span>
                    : <span>{category.itemCount || 0} items</span>}
                  {categoryRows[index].sub && (
                    <span>{t('menu:categoryManagementPage.inParent', { name: nameOf(category.parent_id), defaultValue: 'In {{name}}' })}</span>
                  )}
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
          <Label>{'Category Name'}</Label>
          <Input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Main Dishes"
            autoFocus
          />
        </FormGroup>

        <FormGroup>
          <Label>{t('menu:categoryManagementPage.parentCategory', 'Parent category')}</Label>
          <Select
            value={formData.parent_id}
            onChange={(e) => setFormData({ ...formData, parent_id: e.target.value, move_menus: true })}
            disabled={editingHasChildren}
          >
            <option value="">{t('menu:categoryManagementPage.noParent', 'None — top-level category')}</option>
            {parentOptions.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </Select>
          <Hint>
            {editingHasChildren
              ? t('menu:categoryManagementPage.parentLockedHint', 'This category has its own subcategories, so it stays top-level. Only two levels are allowed.')
              : t('menu:categoryManagementPage.parentHint', 'Optional. Use subcategories when a category has too many items to scan. A category with subcategories holds no items itself — items go in its subcategories.')}
          </Hint>
          {parentMenuCount > 0 && chosenParent && (
            <label style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginTop: 8, fontSize: 14, color: '#1F2937' }}>
              <input
                type="checkbox"
                checked={formData.move_menus}
                onChange={(e) => setFormData({ ...formData, move_menus: e.target.checked })}
                style={{ marginTop: 3 }}
              />
              <span>{t('menu:categoryManagementPage.moveMenus', { n: parentMenuCount, parent: chosenParent.name, defaultValue: 'Move the menu items in "{{parent}}" ({{n}}) into this subcategory' })}</span>
            </label>
          )}
        </FormGroup>

        <FormGroup>
          <Label>{'Icon'}</Label>
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

        {editingCategory && (
          <FormGroup>
            <Label>{'Show in Recommendations'}</Label>
            <Select
              value={formData.is_recommendation_source === true ? 'on' : formData.is_recommendation_source === false ? 'off' : 'auto'}
              onChange={(e) => {
                const v = e.target.value;
                setFormData({ ...formData, is_recommendation_source: v === 'on' ? true : v === 'off' ? false : null });
              }}
              disabled={recSaving}
            >
              <option value="auto">Auto-detect</option>
              <option value="on">Always show as add-on</option>
              <option value="off">Never show as add-on</option>
            </Select>
            <Hint>
              {formData.is_recommendation_source === true
                ? 'Items in this category are always offered as add-ons after a customer adds to cart.'
                : formData.is_recommendation_source === false
                  ? 'Items in this category are never offered as add-ons.'
                  : autoDetectsAsRecommendation(formData.name)
                    ? `Auto: "${formData.name}" looks like a dessert/drink category, so its items are offered as add-ons.`
                    : 'Auto: this category is not offered as add-ons unless its name looks like a dessert/drink. Used only when a product has no manual recommendations.'}
            </Hint>
          </FormGroup>
        )}

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
    </>
  );
};

export default CategoryManagementPage;