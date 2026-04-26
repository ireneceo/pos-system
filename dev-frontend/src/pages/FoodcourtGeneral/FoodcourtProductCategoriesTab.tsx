import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import {
  Modal as CommonModal, ModalButton,
  FormGroup as UIFormGroup, FormLabel, FormInput, FormTextArea,
  OrderControls, EmptyState
} from '../../components/UI';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import ConfirmModal from '../../components/ConfirmModal';
import { getAuthToken } from '../../utils/auth';

interface Category {
  id: number;
  name: string;
  emoji: string | null;
  description: string | null;
  sort_order: number;
  is_active: boolean;
  product_count?: number;
}

interface Props {
  onCountChange: (n: number) => void;
  onCategoryChange?: () => void;
}

const CategoryGrid = styled.div`
  display: grid;
  gap: 12px;
  margin-top: 24px;
`;

const CategoryCard = styled.div<{ isActive?: boolean }>`
  background: white;
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  opacity: ${p => p.isActive !== false ? 1 : 0.6};
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

const IconBtn = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 6px;
  border: 1px solid #E6EBF1;
  background: #F6F9FC;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover { border-color: #635BFF; background: #F4F3FF; }
  svg { width: 18px; height: 18px; color: #6B7280; }
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
  background: ${p => p.selected ? '#E5E7EB' : 'white'};
  border: 1px solid ${p => p.selected ? '#9CA3AF' : '#E5E7EB'};
  cursor: pointer;
  font-size: 20px;
`;

const ErrorBox = styled.div`
  margin-top: 12px;
  padding: 10px 14px;
  background: #FEF2F2;
  border: 1px solid #FCA5A5;
  border-radius: 8px;
  color: #DC2626;
  font-size: 13px;
`;

const EMOJI_OPTIONS = [
  '🍔','🍟','🌭','🍕','🥪','🌮','🌯','🥙','🍝','🍜',
  '🍣','🍤','🍱','🍙','🍘','🍡','🥟','🥠','🥡','🍢',
  '🍰','🧁','🍪','🍩','🍫','🍬','🍭','🥐','🍞','🥖',
  '🥗','🌶️','🥒','🍅','🍆','🥕','🌽','🥔','🍠','🍵',
  '☕','🥤','🧃','🍺','🍷','🍶','🥂','🍹','🥛','🧋'
];

const FoodcourtProductCategoriesTab: React.FC<Props> = ({ onCountChange, onCategoryChange }) => {
  const { t } = useTranslation(['foodcourt', 'common']);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [toDelete, setToDelete] = useState<Category | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', emoji: '', description: '' });

  const fetchCategories = useCallback(async () => {
    try {
      const token = getAuthToken();
      const res = await fetch('/api/foodcourt-product-categories', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setCategories(data.data || []);
        onCountChange((data.data || []).length);
      }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, [onCountChange]);

  useEffect(() => { setLoading(true); fetchCategories(); }, [fetchCategories]);

  const openModal = (cat?: Category) => {
    setFormError(null);
    if (cat) {
      setEditing(cat);
      setFormData({ name: cat.name, emoji: cat.emoji || '', description: cat.description || '' });
    } else {
      setEditing(null);
      setFormData({ name: '', emoji: '', description: '' });
    }
    setShowModal(true);
  };

  const closeModal = () => { setShowModal(false); setEditing(null); setFormError(null); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setFormError(t('common:required', 'Name is required'));
      return;
    }
    try {
      const token = getAuthToken();
      const url = editing
        ? `/api/foodcourt-product-categories/${editing.id}`
        : '/api/foodcourt-product-categories';
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          name: formData.name.trim(),
          emoji: formData.emoji || null,
          description: formData.description.trim() || null
        })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setFormError(data.message || 'Failed to save');
        return;
      }
      closeModal();
      fetchCategories();
      onCategoryChange?.();
    } catch (err) {
      console.error(err);
      setFormError('Failed to save');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!toDelete) return;
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/foodcourt-product-categories/${toDelete.id}`, {
        method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setDeleteOpen(false);
        setToDelete(null);
        fetchCategories();
        onCategoryChange?.();
      }
    } catch (err) { console.error(err); }
  };

  const handleReorder = async (id: number, direction: 'up' | 'down') => {
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/foodcourt-product-categories/${id}/reorder`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ direction })
      });
      const data = await res.json();
      if (data.success) fetchCategories();
    } catch (err) { console.error(err); }
  };

  if (loading) {
    return <div style={{ padding: 40, textAlign: 'center', color: '#6B7280' }}>{t('common:loading', 'Loading...')}</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16, marginBottom: 8 }}>
        <ThemedButton onClick={() => openModal()}>
          {t('foodcourt:products.addCategory', 'Add Category')}
        </ThemedButton>
      </div>

      {categories.length === 0 ? (
        <EmptyState>
          <h4 style={{ fontSize: 16, fontWeight: 600, color: '#1F2937', margin: '0 0 8px 0' }}>
            {t('foodcourt:products.noCategories', 'No categories yet')}
          </h4>
          <p style={{ fontSize: 14, color: '#6B7280', margin: '0 0 16px 0' }}>
            {t('foodcourt:products.startCategories', 'Create your first product category to organize your products.')}
          </p>
          <ThemedButton onClick={() => openModal()}>
            {t('foodcourt:products.addCategory', 'Add Category')}
          </ThemedButton>
        </EmptyState>
      ) : (
        <CategoryGrid>
          {categories.map((cat, idx) => (
            <CategoryCard key={cat.id} isActive={cat.is_active}>
              <OrderControls
                onMoveUp={() => handleReorder(cat.id, 'up')}
                onMoveDown={() => handleReorder(cat.id, 'down')}
                disableUp={idx === 0}
                disableDown={idx === categories.length - 1}
              />
              <CategoryIcon>{cat.emoji || '📦'}</CategoryIcon>
              <CategoryInfo>
                <CategoryName>{cat.name}</CategoryName>
                <CategoryMeta>
                  <span>{cat.product_count || 0} {t('foodcourt:products.products', 'products')}</span>
                </CategoryMeta>
                {cat.description && (
                  <div style={{ fontSize: 13, color: '#6B7280', marginTop: 4 }}>{cat.description}</div>
                )}
              </CategoryInfo>
              <CategoryActions>
                <IconBtn onClick={() => openModal(cat)} title={t('common:edit', 'Edit') as string}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </IconBtn>
                <IconBtn onClick={() => { setToDelete(cat); setDeleteOpen(true); }} title={t('common:delete', 'Delete') as string}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                  </svg>
                </IconBtn>
              </CategoryActions>
            </CategoryCard>
          ))}
        </CategoryGrid>
      )}

      {showModal && (
        <CommonModal
          isOpen={showModal}
          onClose={closeModal}
          title={editing
            ? t('foodcourt:products.editCategory', 'Edit Category') as string
            : t('foodcourt:products.addCategory', 'Add Category') as string}
          footer={
            <>
              <ModalButton type="button" onClick={closeModal}>{t('common:cancel', 'Cancel')}</ModalButton>
              <ModalButton type="submit" form="fc-cat-form" variant="primary">
                {editing ? t('common:update', 'Update') : t('common:create', 'Create')}
              </ModalButton>
            </>
          }
        >
          <form id="fc-cat-form" onSubmit={handleSubmit}>
            <UIFormGroup>
              <FormLabel>{t('common:name', 'Name')} *</FormLabel>
              <FormInput type="text" value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            </UIFormGroup>
            <UIFormGroup>
              <FormLabel>{t('common:emoji', 'Emoji')}</FormLabel>
              <EmojiPicker>
                {EMOJI_OPTIONS.map(em => (
                  <EmojiOption key={em} type="button" selected={formData.emoji === em}
                    onClick={() => setFormData({ ...formData, emoji: em })}>
                    {em}
                  </EmojiOption>
                ))}
              </EmojiPicker>
            </UIFormGroup>
            <UIFormGroup>
              <FormLabel>{t('common:description', 'Description')}</FormLabel>
              <FormTextArea value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} />
            </UIFormGroup>
            {formError && <ErrorBox>{formError}</ErrorBox>}
          </form>
        </CommonModal>
      )}

      <ConfirmModal
        isOpen={deleteOpen}
        onCancel={() => { setDeleteOpen(false); setToDelete(null); }}
        onConfirm={handleDeleteConfirm}
        title={t('foodcourt:products.deleteCategory', 'Delete Category') as string}
        message={`${t('common:deleteConfirm', 'Are you sure you want to delete')} "${toDelete?.name}"?`}
        confirmText={t('common:delete', 'Delete') as string}
        cancelText={t('common:cancel', 'Cancel') as string}
      />
    </div>
  );
};

export default FoodcourtProductCategoriesTab;
