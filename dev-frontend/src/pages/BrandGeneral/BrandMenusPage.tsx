/**
 * Brand Menus — BG main page.
 *
 * Manages menu templates that BG pushes to franchise restaurants.
 * Each card shows: image, name, recommended price, category, lock badge (🔒N),
 * distribution summary (synced/pending/unlinked counts).
 *
 * Distinct from BrandProducts (BG's supply catalog). Names follow the Brand Menu
 * terminology — never "Product" in this domain.
 */
import React, { useEffect, useMemo, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Lock, Building2, Plus, Edit2, Copy, Trash2, Send, ChevronDown } from 'lucide-react';
import PageHeader from '../../components/Common/PageHeader';
import { Modal as CommonModal } from '../../components/UI';
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import { getAuthToken } from '../../utils/auth';
import { formatCurrency } from '../../utils/currency';

const Container = styled.div`
  min-height: 100vh;
  background: #FAFBFC;
`;

const Content = styled.main`
  padding: 24px 32px;
  @media (max-width: 768px) { padding: 16px; }
`;

const ActionRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

const BrandPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  color: #0A2540;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  &:hover { border-color: #635BFF; }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
  margin-top: 16px;
`;

const Card = styled.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: all 0.15s;
  &:hover { border-color: #635BFF; box-shadow: 0 2px 8px rgba(99, 91, 255, 0.06); }
`;

const CardImage = styled.div<{ $src?: string | null; $emoji?: string | null }>`
  width: 100%;
  aspect-ratio: 16 / 9;
  background: ${p => p.$src ? `url(${p.$src})` : '#F0EFFF'} center/cover no-repeat;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 56px;
`;

const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
  line-height: 1.3;
`;

const CardRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: #6B7C93;
`;

const LockBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: #F0EFFF;
  color: #635BFF;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;
  svg { width: 12px; height: 12px; }
`;

const DistributionLine = styled.div`
  font-size: 12px;
  color: #6B7C93;
  display: flex;
  gap: 8px;
  align-items: center;
`;

const CardActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
  border-top: 1px solid #F3F4F6;
  padding-top: 12px;
`;

const IconBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 6px 10px;
  background: transparent;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  color: #6B7C93;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.15s;
  &:hover { border-color: #635BFF; color: #635BFF; }
  svg { width: 14px; height: 14px; }
`;

const EmptyState = styled.div`
  background: white;
  border: 1px dashed #E6EBF1;
  border-radius: 12px;
  padding: 64px 24px;
  text-align: center;
  color: #6B7C93;
  font-size: 14px;
  margin-top: 16px;
`;

const BrandSwitch = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  cursor: pointer;
  &:hover { border-color: #635BFF; }
  svg { width: 14px; height: 14px; color: #6B7C93; }
`;

const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  min-width: 100%;
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  z-index: 100;
  overflow: hidden;
`;

const DropdownItem = styled.div<{ $active?: boolean }>`
  padding: 8px 12px;
  font-size: 14px;
  color: ${p => p.$active ? '#635BFF' : '#0A2540'};
  background: ${p => p.$active ? '#F0EFFF' : 'white'};
  cursor: pointer;
  &:hover { background: #F0EFFF; }
`;

interface Brand { id: number; name: string; }
interface BrandMenu {
  id: number; brand_id: number; category_id: number | null;
  name: string; description: string | null;
  image_url: string | null; emoji: string | null;
  recommended_price: number; currency: string;
  version: number; distribution_mode: 'auto' | 'manual';
  locks: { name: boolean; price: boolean; category: boolean; image: boolean; options: boolean };
  category?: { id: number; name: string; emoji: string | null } | null;
  recipe?: { id: number; name: string; code: string } | null;
  distribution: { in_sync: number; pending_update: number; unlinked: number };
}

const authHeaders = () => {
  const t = getAuthToken();
  return t ? { 'Content-Type': 'application/json', Authorization: `Bearer ${t}` } : { 'Content-Type': 'application/json' };
};

const BrandMenusPage: React.FC = () => {
  const { t } = useTranslation(['brand', 'common']);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedBrandId, setSelectedBrandId] = useState<number | null>(() => {
    const saved = localStorage.getItem('bg.selectedBrandId');
    return saved ? Number(saved) : null;
  });
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);
  const [menus, setMenus] = useState<BrandMenu[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMenu, setEditingMenu] = useState<BrandMenu | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load brands BG owns
  useEffect(() => {
    (async () => {
      try {
        const r = await fetch('/api/brands?owner=me', { headers: authHeaders() });
        if (!r.ok) return;
        const j = await r.json();
        const list: Brand[] = (j.data || j || []).map((b: any) => ({ id: b.id, name: b.name }));
        setBrands(list);
        if (!selectedBrandId && list.length > 0) {
          setSelectedBrandId(list[0].id);
          localStorage.setItem('bg.selectedBrandId', String(list[0].id));
        }
      } catch (e) { /* silent */ }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMenus = useCallback(async () => {
    if (!selectedBrandId) return;
    setLoading(true);
    setError(null);
    try {
      const qs = new URLSearchParams({ brand_id: String(selectedBrandId) });
      if (searchQuery) qs.set('search', searchQuery);
      if (categoryFilter) qs.set('category_id', categoryFilter);
      const r = await fetch(`/api/brand-menus?${qs}`, { headers: authHeaders() });
      const j = await r.json();
      if (!r.ok || !j.success) throw new Error(j.message || 'Failed to load');
      setMenus(j.data || []);
    } catch (e: any) {
      setError(e?.message || 'Failed to load menus');
    } finally {
      setLoading(false);
    }
  }, [selectedBrandId, searchQuery, categoryFilter]);

  useEffect(() => { loadMenus(); }, [loadMenus]);

  const handleBrandChange = (id: number) => {
    setSelectedBrandId(id);
    localStorage.setItem('bg.selectedBrandId', String(id));
    setShowBrandDropdown(false);
  };

  const handlePush = async (menuId: number) => {
    if (!window.confirm(t('brand:brandMenusPage.confirmPushAll', 'Push this menu to all franchise restaurants?'))) return;
    try {
      const r = await fetch(`/api/brand-menus/${menuId}/push`, {
        method: 'POST', headers: authHeaders(),
        body: JSON.stringify({ restaurant_ids: 'all' })
      });
      const j = await r.json();
      if (!r.ok || !j.success) throw new Error(j.message || 'Push failed');
      loadMenus();
    } catch (e: any) {
      setError(e?.message || 'Failed to push');
    }
  };

  const handleDelete = async (menuId: number, menuName: string) => {
    if (!window.confirm(t('brand:brandMenusPage.confirmDelete', { name: menuName, defaultValue: `Delete "${menuName}"? Linked restaurant products will be soft-unlinked but preserved.` }))) return;
    try {
      const r = await fetch(`/api/brand-menus/${menuId}`, { method: 'DELETE', headers: authHeaders() });
      const j = await r.json();
      if (!r.ok || !j.success) throw new Error(j.message || 'Delete failed');
      loadMenus();
    } catch (e: any) {
      setError(e?.message || 'Failed to delete');
    }
  };

  const lockCount = (m: BrandMenu) => Object.values(m.locks || {}).filter(Boolean).length;
  const currentBrand = useMemo(() => brands.find(b => b.id === selectedBrandId), [brands, selectedBrandId]);

  return (
    <Container>
      <PageHeader title={t('brand:brandMenusPage.title', 'Brand Menus')} />
      <Content>
        <ActionRow>
          {brands.length > 1 && (
            <div style={{ position: 'relative' }}>
              <BrandSwitch onClick={() => setShowBrandDropdown(!showBrandDropdown)} type="button">
                <Building2 />
                {currentBrand?.name || t('brand:brandMenusPage.selectBrand', 'Select Brand')}
                <ChevronDown />
              </BrandSwitch>
              {showBrandDropdown && (
                <Dropdown>
                  {brands.map(b => (
                    <DropdownItem key={b.id} $active={b.id === selectedBrandId} onClick={() => handleBrandChange(b.id)}>
                      {b.name}
                    </DropdownItem>
                  ))}
                </Dropdown>
              )}
            </div>
          )}
          <div style={{ flex: 1 }} />
          <ThemedButton variant="primary" onClick={() => setShowAddModal(true)} disabled={!selectedBrandId}>
            <Plus style={{ width: 14, height: 14, marginRight: 4 }} />
            {t('brand:brandMenusPage.addMenu', 'Add Brand Menu')}
          </ThemedButton>
        </ActionRow>

        <FilterBar>
          <SearchInput
            type="text"
            placeholder={t('brand:brandMenusPage.searchPlaceholder', 'Search by name...')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </FilterBar>

        {error && (
          <div style={{ padding: 12, background: '#FEE2E2', color: '#DC2626', borderRadius: 8, marginBottom: 16, fontSize: 13 }}>{error}</div>
        )}

        {loading ? (
          <EmptyState>{t('common:label.loading', 'Loading...')}</EmptyState>
        ) : menus.length === 0 ? (
          <EmptyState>
            <Building2 style={{ width: 32, height: 32, color: '#9CA3AF', marginBottom: 8 }} />
            <div style={{ fontWeight: 500, color: '#0A2540', marginBottom: 4 }}>
              {t('brand:brandMenusPage.emptyTitle', 'No brand menus yet')}
            </div>
            <div>
              {t('brand:brandMenusPage.emptyDesc', 'Create menu templates here and push them to franchise restaurants.')}
            </div>
          </EmptyState>
        ) : (
          <Grid>
            {menus.map(m => (
              <Card key={m.id}>
                <CardImage $src={m.image_url}>
                  {!m.image_url && <span>{m.emoji || '🍽️'}</span>}
                </CardImage>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                  <CardTitle>{m.name}</CardTitle>
                  {lockCount(m) > 0 && (
                    <LockBadge><Lock />{lockCount(m)}</LockBadge>
                  )}
                </div>
                <CardRow>
                  <span style={{ fontWeight: 600, color: '#0A2540' }}>{formatCurrency(Number(m.recommended_price), m.currency || 'MYR')}</span>
                  <span>{m.category?.name || '—'}</span>
                </CardRow>
                <DistributionLine>
                  <span style={{ color: m.distribution.in_sync > 0 ? '#10B981' : '#9CA3AF' }}>✓ {m.distribution.in_sync}</span>
                  {m.distribution.pending_update > 0 && <span style={{ color: '#F59E0B' }}>⏳ {m.distribution.pending_update}</span>}
                  {m.distribution.unlinked > 0 && <span style={{ color: '#6B7C93' }}>— {m.distribution.unlinked}</span>}
                  <span style={{ color: '#9CA3AF', marginLeft: 'auto' }}>v{m.version}</span>
                </DistributionLine>
                <CardActions>
                  <IconBtn type="button" onClick={() => setEditingMenu(m)} title={t('common:button.edit')}>
                    <Edit2 /> {t('common:button.edit')}
                  </IconBtn>
                  <IconBtn type="button" onClick={() => handlePush(m.id)} title={t('brand:brandMenusPage.pushToAllNow', 'Push to All Now')}>
                    <Send /> {t('brand:brandMenusPage.push', 'Push')}
                  </IconBtn>
                  <IconBtn type="button" onClick={() => handleDelete(m.id, m.name)} title={t('common:button.delete')} style={{ marginLeft: 'auto' }}>
                    <Trash2 />
                  </IconBtn>
                </CardActions>
              </Card>
            ))}
          </Grid>
        )}

        {showAddModal && (
          <BrandMenuEditModal
            brandId={selectedBrandId!}
            brands={brands}
            onClose={() => setShowAddModal(false)}
            onSaved={() => { setShowAddModal(false); loadMenus(); }}
          />
        )}
        {editingMenu && (
          <BrandMenuEditModal
            brandId={editingMenu.brand_id}
            menu={editingMenu}
            brands={brands}
            onClose={() => setEditingMenu(null)}
            onSaved={() => { setEditingMenu(null); loadMenus(); }}
          />
        )}
      </Content>
    </Container>
  );
};

// ──────────────────────────────────────────────────────────────────────────
// Edit modal (Create + Edit unified)
// ──────────────────────────────────────────────────────────────────────────
const ModalGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

const Section = styled.div`
  background: #FAFBFC;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
`;

const SectionTitle = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  margin-bottom: 12px;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
  &:last-child { margin-bottom: 0; }
`;

const Label = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 6px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  color: #0A2540;
  background: white;
  box-sizing: border-box;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99,91,255,0.1); }
`;

const Select = styled.select`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  color: #0A2540;
  cursor: pointer;
`;

const LockRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #F3F4F6;
  &:last-child { border-bottom: none; }
`;

const Toggle = styled.label`
  position: relative;
  display: inline-block;
  width: 36px;
  height: 20px;
  cursor: pointer;
  input { opacity: 0; width: 0; height: 0; }
  span {
    position: absolute; inset: 0; background: #CBD5E1; border-radius: 20px;
    transition: 0.15s;
    &::before {
      content: ''; position: absolute; left: 3px; bottom: 3px;
      width: 14px; height: 14px; background: white; border-radius: 50%; transition: 0.15s;
    }
  }
  input:checked + span { background: #635BFF; }
  input:checked + span::before { transform: translateX(16px); }
`;

interface ModalProps {
  brandId: number;
  brands: Brand[];
  menu?: BrandMenu;
  onClose: () => void;
  onSaved: () => void;
}

const BrandMenuEditModal: React.FC<ModalProps> = ({ brandId, brands, menu, onClose, onSaved }) => {
  const { t } = useTranslation(['brand', 'common']);
  const isEdit = !!menu;
  const [name, setName] = useState(menu?.name || '');
  const [description, setDescription] = useState(menu?.description || '');
  const [price, setPrice] = useState(String(menu?.recommended_price ?? '0'));
  const [emoji, setEmoji] = useState(menu?.emoji || '');
  const [imageUrl, setImageUrl] = useState(menu?.image_url || '');
  const [categoryId, setCategoryId] = useState<string>(menu?.category_id ? String(menu.category_id) : '');
  const [distribution, setDistribution] = useState<'auto' | 'manual'>(menu?.distribution_mode || 'manual');
  const [locks, setLocks] = useState({
    name: menu?.locks?.name || false,
    price: menu?.locks?.price || false,
    category: menu?.locks?.category || false,
    image: menu?.locks?.image || false,
    options: menu?.locks?.options || false
  });
  const [categories, setCategories] = useState<Array<{ id: number; name: string }>>([]);
  const [recipes, setRecipes] = useState<Array<{ id: number; name: string }>>([]);
  const [recipeId, setRecipeId] = useState<string>(menu?.recipe?.id ? String(menu.recipe.id) : '');
  const [optionGroups, setOptionGroups] = useState<Array<{ id: number; name: string }>>([]);
  const [selectedOptionGroupIds, setSelectedOptionGroupIds] = useState<number[]>([]);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Load supporting data
  useEffect(() => {
    (async () => {
      try {
        const [c, og, r] = await Promise.all([
          fetch(`/api/brand-menu-categories?brand_id=${brandId}`, { headers: authHeaders() }).then(r => r.ok ? r.json() : { data: [] }),
          fetch(`/api/brand-menu-option-groups?brand_id=${brandId}`, { headers: authHeaders() }).then(r => r.ok ? r.json() : { data: [] }),
          fetch(`/api/brand-product-recipes?brand_id=${brandId}`, { headers: authHeaders() }).then(r => r.ok ? r.json() : { data: [] })
        ]);
        setCategories((c.data || []).map((x: any) => ({ id: x.id, name: x.name })));
        setOptionGroups((og.data || []).map((x: any) => ({ id: x.id, name: x.name })));
        setRecipes((r.data || []).map((x: any) => ({ id: x.id, name: x.name })));
      } catch (e) { /* silent */ }
    })();
  }, [brandId]);

  // Load existing menu's option groups
  useEffect(() => {
    if (!menu) return;
    (async () => {
      try {
        const r = await fetch(`/api/brand-menus/${menu.id}`, { headers: authHeaders() });
        if (!r.ok) return;
        const j = await r.json();
        const ogs = j.data?.optionGroups || [];
        setSelectedOptionGroupIds(ogs.map((g: any) => g.id));
      } catch (e) { /* silent */ }
    })();
  }, [menu]);

  const handleSave = async () => {
    if (!name.trim()) { setSaveError(t('brand:brandMenusPage.errors.nameRequired', 'Name is required')); return; }
    setSaving(true);
    setSaveError(null);
    try {
      const body: any = {
        brand_id: brandId, name: name.trim(), description: description || null,
        emoji: emoji || null, image_url: imageUrl || null,
        recommended_price: parseFloat(price) || 0,
        category_id: categoryId ? parseInt(categoryId, 10) : null,
        product_recipe_id: recipeId ? parseInt(recipeId, 10) : null,
        distribution_mode: distribution,
        lock_name: locks.name, lock_price: locks.price, lock_category: locks.category,
        lock_image: locks.image, lock_options: locks.options,
        option_group_ids: selectedOptionGroupIds
      };
      const url = isEdit ? `/api/brand-menus/${menu!.id}` : '/api/brand-menus';
      const method = isEdit ? 'PUT' : 'POST';
      const r = await fetch(url, { method, headers: authHeaders(), body: JSON.stringify(body) });
      const j = await r.json();
      if (!r.ok || !j.success) throw new Error(j.message || 'Save failed');
      onSaved();
    } catch (e: any) {
      setSaveError(e?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <CommonModal
      isOpen={true}
      onClose={onClose}
      title={isEdit ? `${t('common:button.edit')} — ${menu!.name}` : t('brand:brandMenusPage.addMenu', 'Add Brand Menu')}
      footer={
        <>
          <ThemedButton variant="cancel" onClick={onClose}>{t('common:button.cancel')}</ThemedButton>
          <ThemedButton variant="primary" onClick={handleSave} disabled={saving}>
            {saving ? t('common:label.saving', 'Saving...') : (isEdit ? t('common:button.save') : t('common:button.create'))}
          </ThemedButton>
        </>
      }
    >
      {saveError && (
        <div style={{ padding: 12, background: '#FEE2E2', color: '#DC2626', borderRadius: 8, marginBottom: 16, fontSize: 13 }}>{saveError}</div>
      )}
      <ModalGrid>
        <div>
          <Section>
            <SectionTitle>{t('brand:brandMenusPage.menuDetails', 'Menu Details')}</SectionTitle>
            <FormGroup>
              <Label>{t('brand:brandMenusPage.name', 'Name')} *</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Soju Set" />
            </FormGroup>
            <FormGroup>
              <Label>{t('brand:brandMenusPage.description', 'Description')}</Label>
              <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="..." />
            </FormGroup>
            <FormGroup>
              <Label>{t('brand:brandMenusPage.category', 'Category')}</Label>
              <Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                <option value="">—</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </Select>
            </FormGroup>
            <FormGroup>
              <Label>{t('brand:brandMenusPage.recommendedPrice', 'Recommended Price (RM)')} *</Label>
              <Input type="number" step="0.01" min="0" value={price} onChange={(e) => setPrice(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Label>{t('brand:brandMenusPage.emoji', 'Emoji')}</Label>
              <Input value={emoji} onChange={(e) => setEmoji(e.target.value)} maxLength={4} placeholder="🍶" />
            </FormGroup>
            <FormGroup>
              <Label>{t('brand:brandMenusPage.imageUrl', 'Image URL or upload')}</Label>
              <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="/uploads/brand-menus/..." />
            </FormGroup>
            <FormGroup>
              <Label>{t('brand:brandMenusPage.linkedRecipe', 'Linked Recipe (optional)')}</Label>
              <Select value={recipeId} onChange={(e) => setRecipeId(e.target.value)}>
                <option value="">—</option>
                {recipes.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
              </Select>
            </FormGroup>
            <FormGroup>
              <Label>{t('brand:brandMenusPage.optionGroups', 'Option Groups')}</Label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 160, overflowY: 'auto', padding: 8, border: '1px solid #E6EBF1', borderRadius: 6, background: 'white' }}>
                {optionGroups.length === 0 ? (
                  <div style={{ fontSize: 13, color: '#9CA3AF' }}>{t('brand:brandMenusPage.noOptionGroups', 'No option groups available — create in Menu Options.')}</div>
                ) : optionGroups.map(g => (
                  <label key={g.id} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={selectedOptionGroupIds.includes(g.id)}
                      onChange={(e) => {
                        if (e.target.checked) setSelectedOptionGroupIds([...selectedOptionGroupIds, g.id]);
                        else setSelectedOptionGroupIds(selectedOptionGroupIds.filter(x => x !== g.id));
                      }}
                    />
                    {g.name}
                  </label>
                ))}
              </div>
            </FormGroup>
          </Section>
        </div>

        <div>
          <Section style={{ marginBottom: 16 }}>
            <SectionTitle>
              <Lock style={{ width: 12, height: 12, verticalAlign: -2, marginRight: 4 }} />
              {t('brand:brandMenusPage.lockSettings', 'Lock Settings')}
            </SectionTitle>
            <div style={{ fontSize: 12, color: '#6B7C93', marginBottom: 12 }}>
              {t('brand:brandMenusPage.lockSettingsHelp', "Once locked, restaurants can't change these fields.")}
            </div>
            {(['name','price','category','image','options'] as const).map(k => (
              <LockRow key={k}>
                <span style={{ fontSize: 13, color: '#0A2540' }}>{t(`brand:brandMenusPage.lock_${k}`, k.charAt(0).toUpperCase() + k.slice(1))}</span>
                <Toggle>
                  <input type="checkbox" checked={locks[k]} onChange={(e) => setLocks({ ...locks, [k]: e.target.checked })} />
                  <span />
                </Toggle>
              </LockRow>
            ))}
          </Section>

          <Section>
            <SectionTitle>
              <Send style={{ width: 12, height: 12, verticalAlign: -2, marginRight: 4 }} />
              {t('brand:brandMenusPage.distribution', 'Distribution')}
            </SectionTitle>
            <FormGroup>
              <div style={{ display: 'flex', gap: 8 }}>
                {(['manual','auto'] as const).map(m => (
                  <label key={m} style={{
                    flex: 1, padding: 10, border: '1px solid ' + (distribution === m ? '#635BFF' : '#E6EBF1'),
                    borderRadius: 6, cursor: 'pointer', background: distribution === m ? '#F0EFFF' : 'white',
                    textAlign: 'center'
                  }}>
                    <input type="radio" name="distribution" checked={distribution === m} onChange={() => setDistribution(m)} style={{ display: 'none' }} />
                    <div style={{ fontWeight: 500, fontSize: 13 }}>{m === 'auto' ? t('brand:brandMenusPage.distributionAuto', 'Auto') : t('brand:brandMenusPage.distributionManual', 'Manual')}</div>
                    <div style={{ fontSize: 11, color: '#6B7C93', marginTop: 2 }}>
                      {m === 'auto' ? t('brand:brandMenusPage.distributionAutoHelp', 'Push immediately') : t('brand:brandMenusPage.distributionManualHelp', 'Push when ready')}
                    </div>
                  </label>
                ))}
              </div>
            </FormGroup>
            {isEdit && (
              <div style={{ marginTop: 16, fontSize: 13, color: '#6B7C93' }}>
                <div>{t('brand:brandMenusPage.version', 'Version')}: <strong style={{ color: '#0A2540' }}>v{menu!.version}</strong></div>
                <div style={{ marginTop: 4 }}>
                  {t('brand:brandMenusPage.syncedTo', { count: menu!.distribution.in_sync, total: menu!.distribution.in_sync + menu!.distribution.pending_update + menu!.distribution.unlinked, defaultValue: `Synced to ${menu!.distribution.in_sync} restaurants` })}
                </div>
              </div>
            )}
          </Section>
        </div>
      </ModalGrid>
    </CommonModal>
  );
};

export default BrandMenusPage;
