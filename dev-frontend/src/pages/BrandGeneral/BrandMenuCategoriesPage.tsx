/**
 * Brand Menu Categories — embedded as a tab inside BrandMenusPage.
 * Receives `brandId` via prop; brand selector / PageHeader live in the parent.
 * Distinct from BrandProductCategory (BG's supply catalog categories).
 */
import React, { useEffect, useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Edit2, Trash2, Tag, ChevronUp, ChevronDown } from 'lucide-react';
import { IconButton } from '../../components/UI/TableComponents';
import { sortItems } from '../../components/Common/SortDropdown';
import { Modal as CommonModal } from '../../components/UI';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import ConfirmModal from '../../components/ConfirmModal';
import ListControlsBar from '../../components/Common/ListControlsBar';
import EmojiPickerField from '../../components/Common/EmojiPickerField';
import { getAuthToken } from '../../utils/auth';

const Wrapper = styled.div``;
const ActionRow = styled.div` display: flex; align-items: center; gap: 12px; margin-bottom: 16px; `;
const Card = styled.div` background: white; border: 1px solid #C7CED6; border-radius: 12px; padding: 16px; margin-bottom: 12px; display: flex; align-items: center; gap: 12px; `;
const IconCircle = styled.div`
  width: 40px; height: 40px; border-radius: 8px;
  background: #F0EFFF; color: #635BFF;
  display: inline-flex; align-items: center; justify-content: center;
  svg { width: 18px; height: 18px; }
  flex-shrink: 0;
`;
const Body = styled.div` flex: 1; min-width: 0; `;
const Name = styled.div` font-size: 14px; font-weight: 600; color: #0A2540; `;
const Meta = styled.div` font-size: 12px; color: #4B5563; margin-top: 2px; `;
const Actions = styled.div` display: flex; gap: 8px; `;
const IconBtn = styled.button`
  display: inline-flex; align-items: center; justify-content: center;
  padding: 6px 10px; background: transparent; border: 1px solid #C7CED6; border-radius: 6px;
  color: #4B5563; cursor: pointer; transition: all 0.15s;
  &:hover { border-color: #635BFF; color: #635BFF; }
  svg { width: 14px; height: 14px; }
`;
const FormGroup = styled.div` margin-bottom: 16px; `;
const Label = styled.label` display: block; font-size: 13px; font-weight: 500; color: #0A2540; margin-bottom: 6px; `;
const Input = styled.input`
  width: 100%; padding: 8px 12px; border: 1px solid #C7CED6; border-radius: 6px;
  font-size: 14px; box-sizing: border-box;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99,91,255,0.1); }
`;
const EmptyState = styled.div` background: white; border: 1px dashed #C7CED6; border-radius: 12px; padding: 48px; text-align: center; color: #4B5563; `;

interface Category { id: number; brand_id: number; name: string; emoji: string | null; sort_order: number; menu_count: number; }

const authHeaders = () => {
  const t = getAuthToken();
  return t ? { 'Content-Type': 'application/json', Authorization: `Bearer ${t}` } : { 'Content-Type': 'application/json' };
};

interface Props {
  brandId: number | null;
}

const BrandMenuCategoriesPage: React.FC<Props> = ({ brandId }) => {
  const { t } = useTranslation(['brand', 'common']);
  const [cats, setCats] = useState<Category[]>([]);
  const [editing, setEditing] = useState<Category | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<Category | null>(null);
  const [listError, setListError] = useState<string | null>(null);
  const [inUseInfo, setInUseInfo] = useState<{ name: string; count: number } | null>(null);

  const load = useCallback(async () => {
    if (!brandId) { setCats([]); return; }
    const r = await fetch(`/api/brand-menu-categories?brand_id=${brandId}`, { headers: authHeaders() });
    if (!r.ok) return;
    const j = await r.json();
    // 순서 안 정한 카테고리(sort_order 0)는 뒤로 — 메뉴 'Menu order' 정렬과 같은 규칙
    const list: Category[] = j.data || [];
    setCats(sortItems(list.map(c => ({ ...c, display_order: c.sort_order })), 'custom') as Category[]);
  }, [brandId]);

  // 카테고리 순서 — ▲▼ 로 옮기고 전체 순서를 저장(1..N). 브랜드 설정 «Lock menu order» 가 켜지면 매장에 이 순서가 간다.
  const reorderInFlight = useRef(false);
  const move = async (idx: number, dir: -1 | 1) => {
    const to = idx + dir;
    if (!brandId || reorderInFlight.current || to < 0 || to >= cats.length) return;
    reorderInFlight.current = true;
    const next = [...cats];
    const [moved] = next.splice(idx, 1);
    next.splice(to, 0, moved);
    setCats(next);
    setError(null);
    try {
      const r = await fetch('/api/brand-menu-categories/reorder/bulk', {
        method: 'PUT', headers: authHeaders(),
        body: JSON.stringify({ brand_id: brandId, order: next.map(c => c.id) })
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || j.success === false) setListError(j.message || t('brand:brandMenuCategoriesPage.reorderFailed', 'Failed to save category order'));
      else setListError(null);
    } catch (e: any) {
      setListError(e?.message || t('brand:brandMenuCategoriesPage.reorderFailed', 'Failed to save category order'));
    } finally {
      reorderInFlight.current = false;
      load();
    }
  };

  useEffect(() => { load(); }, [load]);

  const openCreate = () => { setName(''); setEmoji(''); setEditing(null); setShowAdd(true); setError(null); };
  const openEdit = (c: Category) => { setName(c.name); setEmoji(c.emoji || ''); setEditing(c); setShowAdd(true); setError(null); };
  const closeModal = () => { setShowAdd(false); setEditing(null); setError(null); };

  const save = async () => {
    if (!name.trim()) { setError(t('brand:brandMenusPage.errors.nameRequired', 'Name is required')); return; }
    try {
      const body = { brand_id: brandId, name: name.trim(), emoji: emoji || null };
      const url = editing ? `/api/brand-menu-categories/${editing.id}` : '/api/brand-menu-categories';
      const method = editing ? 'PUT' : 'POST';
      const r = await fetch(url, { method, headers: authHeaders(), body: JSON.stringify(body) });
      const j = await r.json();
      if (!r.ok || !j.success) throw new Error(j.message || 'Save failed');
      closeModal();
      load();
    } catch (e: any) { setError(e.message); }
  };

  const askRemove = (c: Category) => {
    if (c.menu_count > 0) {
      setInUseInfo({ name: c.name, count: c.menu_count });
      return;
    }
    setDeleteConfirm(c);
  };

  const confirmRemove = async () => {
    if (!deleteConfirm) return;
    const target = deleteConfirm;
    setDeleteConfirm(null);
    const r = await fetch(`/api/brand-menu-categories/${target.id}`, { method: 'DELETE', headers: authHeaders() });
    if (r.ok) load();
  };

  return (
    <Wrapper>
      <ListControlsBar>
        <div data-controls-trailing>
          <ThemedButton variant="primary" onClick={openCreate} disabled={!brandId}>
            {t('brand:brandMenuCategoriesPage.addCategory', 'Add Category')}
          </ThemedButton>
        </div>
      </ListControlsBar>
      {cats.length > 1 && (
        <div style={{ fontSize: 13, color: '#4B5563', marginBottom: 12 }}>
          {t('brand:brandMenuCategoriesPage.reorderHint', 'Use ▲▼ to set the category order. Stores show categories in this order when "Lock menu order" is on in Settings.')}
        </div>
      )}
      {listError && <div style={{ padding: 12, background: '#FEE2E2', color: '#DC2626', borderRadius: 8, marginBottom: 12, fontSize: 13 }}>{listError}</div>}
      {cats.length === 0 ? (
        <EmptyState>
          <Tag style={{ width: 32, height: 32, color: '#6B7280', marginBottom: 8 }} />
          <div style={{ fontWeight: 500, color: '#0A2540', marginBottom: 4 }}>
            {t('brand:brandMenuCategoriesPage.empty', 'No categories yet')}
          </div>
          <div style={{ fontSize: 13 }}>
            {t('brand:brandMenuCategoriesPage.emptyHint', 'Group menu items into categories like "Mains" or "Drinks".')}
          </div>
        </EmptyState>
      ) : cats.map((c, idx) => (
        <Card key={c.id}>
          <IconCircle>{c.emoji ? <span style={{ fontSize: 18 }}>{c.emoji}</span> : <Tag />}</IconCircle>
          <Body>
            <Name>{c.name}</Name>
            <Meta>{t('brand:brandMenuCategoriesPage.menuCount', { count: c.menu_count, defaultValue: `${c.menu_count} menus` })}</Meta>
          </Body>
          <Actions>
            <IconButton type="button" onClick={() => move(idx, -1)} disabled={idx === 0}
              style={idx === 0 ? { opacity: 0.35, cursor: 'default' } : undefined}
              title={t('brand:brandMenuCategoriesPage.moveUp', 'Move up') as string}><ChevronUp size={16} /></IconButton>
            <IconButton type="button" onClick={() => move(idx, 1)} disabled={idx === cats.length - 1}
              style={idx === cats.length - 1 ? { opacity: 0.35, cursor: 'default' } : undefined}
              title={t('brand:brandMenuCategoriesPage.moveDown', 'Move down') as string}><ChevronDown size={16} /></IconButton>
            <IconBtn type="button" onClick={() => openEdit(c)} title={t('common:button.edit')}><Edit2 /></IconBtn>
            <IconBtn type="button" onClick={() => askRemove(c)} title={t('common:button.delete')}><Trash2 /></IconBtn>
          </Actions>
        </Card>
      ))}
      {showAdd && (
        <CommonModal isOpen={true} onClose={closeModal}
          title={editing ? t('brand:brandMenuCategoriesPage.editCategory', 'Edit Category') : t('brand:brandMenuCategoriesPage.addCategory', 'Add Category')}
          footer={<><ThemedButton variant="cancel" onClick={closeModal}>{t('common:button.cancel')}</ThemedButton><ThemedButton variant="primary" onClick={save}>{t('common:button.save')}</ThemedButton></>}>
          {error && <div style={{ padding: 12, background: '#FEE2E2', color: '#DC2626', borderRadius: 8, marginBottom: 16, fontSize: 13 }}>{error}</div>}
          <FormGroup>
            <Label>{t('common:label.name', 'Name')} *</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Mains" />
          </FormGroup>
          <FormGroup>
            <Label>{t('brand:brandMenusPage.emojiOptional', 'Emoji (optional)')}</Label>
            <EmojiPickerField value={emoji} onChange={setEmoji} />
          </FormGroup>
        </CommonModal>
      )}
      <ConfirmModal
        isOpen={!!deleteConfirm}
        type="danger"
        title={t('brand:brandMenuCategoriesPage.confirmDeleteTitle', 'Delete category')}
        message={t('brand:brandMenusPage.confirmDelete', { name: deleteConfirm?.name || '', defaultValue: `Delete "${deleteConfirm?.name}"?` })}
        confirmText={t('common:button.delete', 'Delete')}
        cancelText={t('common:button.cancel', 'Cancel')}
        onConfirm={confirmRemove}
        onCancel={() => setDeleteConfirm(null)}
      />
      <ConfirmModal
        isOpen={!!inUseInfo}
        type="warning"
        singleButton
        title={t('brand:brandMenuCategoriesPage.cannotDeleteTitle', 'Cannot delete category')}
        message={t('brand:brandMenuCategoriesPage.cannotDeleteInUse', { count: inUseInfo?.count || 0, defaultValue: `"${inUseInfo?.name}" is used by ${inUseInfo?.count || 0} menus. Reassign those menus first.` })}
        confirmText={t('common:button.ok', 'OK')}
        onConfirm={() => setInUseInfo(null)}
        onCancel={() => setInUseInfo(null)}
      />
    </Wrapper>
  );
};

export default BrandMenuCategoriesPage;
