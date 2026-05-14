/**
 * Brand Menu Categories — BG manages menu categories for Brand Menus.
 * Distinct from BrandProductCategory (BG's supply catalog categories).
 */
import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Plus, Edit2, Trash2, Building2 } from 'lucide-react';
import PageHeader from '../../components/Common/PageHeader';
import { Modal as CommonModal } from '../../components/UI';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import { getAuthToken } from '../../utils/auth';

const Container = styled.div` min-height: 100vh; background: #FAFBFC; `;
const Content = styled.main` padding: 24px 32px; @media (max-width: 768px) { padding: 16px; } `;
const Card = styled.div` background: white; border: 1px solid #E6EBF1; border-radius: 12px; padding: 16px; margin-bottom: 12px; display: flex; align-items: center; gap: 12px; `;
const Emoji = styled.div` font-size: 24px; width: 40px; text-align: center; `;
const Body = styled.div` flex: 1; `;
const Name = styled.div` font-size: 14px; font-weight: 600; color: #0A2540; `;
const Meta = styled.div` font-size: 12px; color: #6B7C93; margin-top: 2px; `;
const Actions = styled.div` display: flex; gap: 8px; `;
const IconBtn = styled.button`
  display: inline-flex; align-items: center; justify-content: center;
  padding: 6px 10px; background: transparent; border: 1px solid #E6EBF1; border-radius: 6px;
  color: #6B7C93; cursor: pointer; transition: all 0.15s;
  &:hover { border-color: #635BFF; color: #635BFF; }
  svg { width: 14px; height: 14px; }
`;
const FormGroup = styled.div` margin-bottom: 16px; `;
const Label = styled.label` display: block; font-size: 13px; font-weight: 500; color: #0A2540; margin-bottom: 6px; `;
const Input = styled.input`
  width: 100%; padding: 8px 12px; border: 1px solid #E6EBF1; border-radius: 6px;
  font-size: 14px; box-sizing: border-box;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99,91,255,0.1); }
`;
const EmptyState = styled.div` background: white; border: 1px dashed #E6EBF1; border-radius: 12px; padding: 48px; text-align: center; color: #6B7C93; `;

interface Brand { id: number; name: string; }
interface Category { id: number; brand_id: number; name: string; emoji: string | null; sort_order: number; menu_count: number; }

const authHeaders = () => {
  const t = getAuthToken();
  return t ? { 'Content-Type': 'application/json', Authorization: `Bearer ${t}` } : { 'Content-Type': 'application/json' };
};

const BrandMenuCategoriesPage: React.FC = () => {
  const { t } = useTranslation(['brand', 'common']);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [brandId, setBrandId] = useState<number | null>(() => {
    const saved = localStorage.getItem('bg.selectedBrandId');
    return saved ? Number(saved) : null;
  });
  const [cats, setCats] = useState<Category[]>([]);
  const [editing, setEditing] = useState<Category | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const r = await fetch('/api/brands?owner=me', { headers: authHeaders() });
      if (!r.ok) return;
      const j = await r.json();
      const list: Brand[] = (j.data || j || []).map((b: any) => ({ id: b.id, name: b.name }));
      setBrands(list);
      if (!brandId && list.length > 0) {
        setBrandId(list[0].id);
        localStorage.setItem('bg.selectedBrandId', String(list[0].id));
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const load = useCallback(async () => {
    if (!brandId) return;
    const r = await fetch(`/api/brand-menu-categories?brand_id=${brandId}`, { headers: authHeaders() });
    if (!r.ok) return;
    const j = await r.json();
    setCats(j.data || []);
  }, [brandId]);

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

  const remove = async (c: Category) => {
    if (c.menu_count > 0) {
      window.alert(t('brand:brandMenuCategoriesPage.cannotDeleteInUse', { count: c.menu_count, defaultValue: `Used by ${c.menu_count} menus. Reassign first.` }));
      return;
    }
    if (!window.confirm(t('brand:brandMenusPage.confirmDelete', { name: c.name, defaultValue: `Delete "${c.name}"?` }))) return;
    const r = await fetch(`/api/brand-menu-categories/${c.id}`, { method: 'DELETE', headers: authHeaders() });
    if (r.ok) load();
  };

  return (
    <Container>
      <PageHeader title={t('brand:brandMenuCategoriesPage.title', 'Menu Categories')} />
      <Content>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          {brands.length > 1 && (
            <select value={brandId || ''} onChange={(e) => { const v = Number(e.target.value); setBrandId(v); localStorage.setItem('bg.selectedBrandId', String(v)); }}
              style={{ padding: '8px 12px', border: '1px solid #E6EBF1', borderRadius: 8, fontSize: 14, background: 'white' }}>
              {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          )}
          <div style={{ flex: 1 }} />
          <ThemedButton variant="primary" onClick={openCreate} disabled={!brandId}>
            <Plus style={{ width: 14, height: 14, marginRight: 4 }} />
            {t('brand:brandMenuCategoriesPage.addCategory', 'Add Category')}
          </ThemedButton>
        </div>
        {cats.length === 0 ? (
          <EmptyState>
            <Building2 style={{ width: 32, height: 32, color: '#9CA3AF', marginBottom: 8 }} />
            <div>{t('brand:brandMenuCategoriesPage.empty', 'No categories yet')}</div>
          </EmptyState>
        ) : cats.map(c => (
          <Card key={c.id}>
            <Emoji>{c.emoji || '🍽️'}</Emoji>
            <Body>
              <Name>{c.name}</Name>
              <Meta>{t('brand:brandMenuCategoriesPage.menuCount', { count: c.menu_count, defaultValue: `${c.menu_count} menus` })}</Meta>
            </Body>
            <Actions>
              <IconBtn type="button" onClick={() => openEdit(c)} title={t('common:button.edit')}><Edit2 /></IconBtn>
              <IconBtn type="button" onClick={() => remove(c)} title={t('common:button.delete')}><Trash2 /></IconBtn>
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
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Korean BBQ" />
            </FormGroup>
            <FormGroup>
              <Label>{t('brand:brandMenusPage.emoji', 'Emoji')}</Label>
              <Input value={emoji} onChange={(e) => setEmoji(e.target.value)} maxLength={4} placeholder="🥩" />
            </FormGroup>
          </CommonModal>
        )}
      </Content>
    </Container>
  );
};

export default BrandMenuCategoriesPage;
