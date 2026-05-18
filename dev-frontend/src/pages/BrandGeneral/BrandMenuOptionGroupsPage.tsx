/**
 * Brand Menu Option Groups — BG manages option groups (e.g. Size, Spice Level) for Brand Menus.
 * Each option group has options (e.g. Small/Medium/Large) with optional extra_price.
 * Editing version-bumps the group, marking all consuming BrandMenus as pending_update.
 */
import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Edit2, Trash2, ChevronDown, ChevronRight, Layers } from 'lucide-react';
import { Modal as CommonModal } from '../../components/UI';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import ConfirmModal from '../../components/ConfirmModal';
import ListControlsBar from '../../components/Common/ListControlsBar';
import { getAuthToken } from '../../utils/auth';

const Wrapper = styled.div``;
const GroupCard = styled.div` background: white; border: 1px solid #E6EBF1; border-radius: 12px; padding: 16px; margin-bottom: 12px; `;
const GroupHeader = styled.div` display: flex; align-items: center; gap: 12px; cursor: pointer; `;
const GroupName = styled.div` font-size: 14px; font-weight: 600; color: #0A2540; flex: 1; `;
const GroupMeta = styled.div` font-size: 12px; color: #6B7C93; `;
const OptionList = styled.div` margin-top: 12px; padding-top: 12px; border-top: 1px solid #F3F4F6; `;
const OptionRow = styled.div` display: flex; align-items: center; gap: 12px; padding: 6px 0; font-size: 13px; color: #0A2540; `;
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
const Row = styled.div` display: flex; gap: 8px; align-items: center; margin-bottom: 8px; `;
const Toggle = styled.label`
  display: inline-flex; align-items: center; gap: 8px; cursor: pointer; font-size: 13px;
  input { accent-color: #635BFF; }
`;
const EmptyState = styled.div` background: white; border: 1px dashed #E6EBF1; border-radius: 12px; padding: 48px; text-align: center; color: #6B7C93; `;

interface BMOption { id?: number; name: string; extra_price: number; sort_order?: number; }
interface BMGroup {
  id: number; brand_id: number; name: string; description: string | null;
  min_select: number; max_select: number; is_required: boolean;
  version: number; menu_count: number; options: BMOption[];
}

const authHeaders = () => {
  const t = getAuthToken();
  return t ? { 'Content-Type': 'application/json', Authorization: `Bearer ${t}` } : { 'Content-Type': 'application/json' };
};

interface Props { brandId: number | null; }

const BrandMenuOptionGroupsPage: React.FC<Props> = ({ brandId }) => {
  const { t } = useTranslation(['brand', 'common']);
  const [groups, setGroups] = useState<BMGroup[]>([]);
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  const [editing, setEditing] = useState<BMGroup | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState<{ name: string; min: number; max: number; required: boolean; options: BMOption[] }>({
    name: '', min: 0, max: 1, required: false, options: [{ name: '', extra_price: 0 }]
  });
  const [error, setError] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<BMGroup | null>(null);
  const [inUseInfo, setInUseInfo] = useState<{ name: string; count: number } | null>(null);

  const load = useCallback(async () => {
    if (!brandId) { setGroups([]); return; }
    const r = await fetch(`/api/brand-menu-option-groups?brand_id=${brandId}`, { headers: authHeaders() });
    if (!r.ok) return;
    const j = await r.json();
    setGroups(j.data || []);
  }, [brandId]);

  useEffect(() => { load(); }, [load]);

  const openCreate = () => {
    setForm({ name: '', min: 0, max: 1, required: false, options: [{ name: '', extra_price: 0 }] });
    setEditing(null);
    setShowAdd(true);
    setError(null);
  };

  const openEdit = (g: BMGroup) => {
    setForm({
      name: g.name, min: g.min_select, max: g.max_select, required: g.is_required,
      options: (g.options || []).map(o => ({ name: o.name, extra_price: Number(o.extra_price) }))
    });
    setEditing(g);
    setShowAdd(true);
    setError(null);
  };

  const closeModal = () => { setShowAdd(false); setEditing(null); setError(null); };

  const save = async () => {
    if (!form.name.trim()) { setError(t('brand:brandMenusPage.errors.nameRequired', 'Name is required')); return; }
    const cleanOptions = form.options.filter(o => o.name.trim());
    if (cleanOptions.length === 0) { setError(t('brand:brandMenuOptionGroupsPage.atLeastOneOption', 'At least one option is required')); return; }
    try {
      const body = {
        brand_id: brandId, name: form.name.trim(),
        min_select: form.min, max_select: form.max, is_required: form.required,
        options: cleanOptions
      };
      const url = editing ? `/api/brand-menu-option-groups/${editing.id}` : '/api/brand-menu-option-groups';
      const method = editing ? 'PUT' : 'POST';
      const r = await fetch(url, { method, headers: authHeaders(), body: JSON.stringify(body) });
      const j = await r.json();
      if (!r.ok || !j.success) throw new Error(j.message || 'Save failed');
      closeModal();
      load();
    } catch (e: any) { setError(e.message); }
  };

  const askRemove = (g: BMGroup) => {
    if (g.menu_count > 0) {
      setInUseInfo({ name: g.name, count: g.menu_count });
      return;
    }
    setDeleteConfirm(g);
  };

  const confirmRemove = async () => {
    if (!deleteConfirm) return;
    const target = deleteConfirm;
    setDeleteConfirm(null);
    const r = await fetch(`/api/brand-menu-option-groups/${target.id}`, { method: 'DELETE', headers: authHeaders() });
    if (r.ok) load();
  };

  const toggleExpand = (id: number) => {
    const next = new Set(expanded);
    if (next.has(id)) next.delete(id); else next.add(id);
    setExpanded(next);
  };

  return (
    <Wrapper>
      <ListControlsBar>
        <div data-controls-trailing>
          <ThemedButton variant="primary" onClick={openCreate} disabled={!brandId}>
            {t('brand:brandMenuOptionGroupsPage.addGroup', 'Add Option Group')}
          </ThemedButton>
        </div>
      </ListControlsBar>
        {groups.length === 0 ? (
          <EmptyState>
            <Layers style={{ width: 32, height: 32, color: '#9CA3AF', marginBottom: 8 }} />
            <div style={{ fontWeight: 500, color: '#0A2540', marginBottom: 4 }}>
              {t('brand:brandMenuOptionGroupsPage.empty', 'No option groups yet')}
            </div>
            <div style={{ fontSize: 13 }}>
              {t('brand:brandMenuOptionGroupsPage.emptyHint', 'Add-ons and variations like "Size" (S/M/L) or "Spice level". Reuse across multiple menus.')}
            </div>
          </EmptyState>
        ) : groups.map(g => (
          <GroupCard key={g.id}>
            <GroupHeader onClick={() => toggleExpand(g.id)}>
              {expanded.has(g.id) ? <ChevronDown style={{ width: 16, height: 16, color: '#9CA3AF' }} /> : <ChevronRight style={{ width: 16, height: 16, color: '#9CA3AF' }} />}
              <GroupName>{g.name}</GroupName>
              <GroupMeta>
                {g.is_required ? t('brand:brandMenuOptionGroupsPage.required', 'Required') : t('brand:brandMenuOptionGroupsPage.optional', 'Optional')} ·{' '}
                {g.min_select}–{g.max_select} ·{' '}
                {(g.options || []).length} {t('brand:brandMenuOptionGroupsPage.options', 'options')} ·{' '}
                {g.menu_count} {t('brand:brandMenuOptionGroupsPage.menus', 'menus')} ·{' '}
                v{g.version}
              </GroupMeta>
              <Actions onClick={(e) => e.stopPropagation()}>
                <IconBtn type="button" onClick={() => openEdit(g)} title={t('common:button.edit')}><Edit2 /></IconBtn>
                <IconBtn type="button" onClick={() => askRemove(g)} title={t('common:button.delete')}><Trash2 /></IconBtn>
              </Actions>
            </GroupHeader>
            {expanded.has(g.id) && (
              <OptionList>
                {(g.options || []).map((o, i) => (
                  <OptionRow key={i}>
                    <span style={{ flex: 1 }}>{o.name}</span>
                    <span style={{ color: '#6B7C93' }}>{Number(o.extra_price) > 0 ? `+${Number(o.extra_price).toFixed(2)}` : ''}</span>
                  </OptionRow>
                ))}
              </OptionList>
            )}
          </GroupCard>
        ))}

        {showAdd && (
          <CommonModal isOpen={true} onClose={closeModal}
            title={editing ? t('brand:brandMenuOptionGroupsPage.editGroup', 'Edit Option Group') : t('brand:brandMenuOptionGroupsPage.addGroup', 'Add Option Group')}
            footer={<><ThemedButton variant="cancel" onClick={closeModal}>{t('common:button.cancel')}</ThemedButton><ThemedButton variant="primary" onClick={save}>{t('common:button.save')}</ThemedButton></>}>
            {error && <div style={{ padding: 12, background: '#FEE2E2', color: '#DC2626', borderRadius: 8, marginBottom: 16, fontSize: 13 }}>{error}</div>}
            <FormGroup>
              <Label>{t('common:label.name', 'Name')} *</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Size" />
            </FormGroup>
            <FormGroup>
              <Label>{t('brand:brandMenuOptionGroupsPage.selection', 'Selection')}</Label>
              <Row>
                <Toggle><input type="checkbox" checked={form.required} onChange={(e) => setForm({ ...form, required: e.target.checked })} />{t('brand:brandMenuOptionGroupsPage.required', 'Required')}</Toggle>
                <span style={{ color: '#6B7C93', fontSize: 13 }}>Min</span>
                <Input style={{ width: 70 }} type="number" min={0} value={form.min} onChange={(e) => setForm({ ...form, min: parseInt(e.target.value) || 0 })} />
                <span style={{ color: '#6B7C93', fontSize: 13 }}>Max</span>
                <Input style={{ width: 70 }} type="number" min={1} value={form.max} onChange={(e) => setForm({ ...form, max: parseInt(e.target.value) || 1 })} />
              </Row>
            </FormGroup>
            <FormGroup>
              <Label>{t('brand:brandMenuOptionGroupsPage.options', 'Options')}</Label>
              {form.options.map((o, i) => (
                <Row key={i}>
                  <Input style={{ flex: 1 }} value={o.name} onChange={(e) => {
                    const next = [...form.options]; next[i] = { ...next[i], name: e.target.value }; setForm({ ...form, options: next });
                  }} placeholder={t('brand:brandMenuOptionGroupsPage.optionNamePlaceholder', 'Option name')} />
                  <Input style={{ width: 100 }} type="number" step="0.01" min="0" value={o.extra_price} onChange={(e) => {
                    const next = [...form.options]; next[i] = { ...next[i], extra_price: parseFloat(e.target.value) || 0 }; setForm({ ...form, options: next });
                  }} placeholder="0.00" />
                  <IconBtn type="button" onClick={() => {
                    setForm({ ...form, options: form.options.filter((_, j) => j !== i) });
                  }}><Trash2 /></IconBtn>
                </Row>
              ))}
              <ThemedButton variant="secondary" onClick={() => setForm({ ...form, options: [...form.options, { name: '', extra_price: 0 }] })}>
                {t('brand:brandMenuOptionGroupsPage.addOption', 'Add Option')}
              </ThemedButton>
            </FormGroup>
            {editing && (
              <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 12 }}>
                {t('brand:brandMenuOptionGroupsPage.propagateWarning', 'Saving will bump version and mark consuming menus as pending_update for restaurants.')}
              </div>
            )}
          </CommonModal>
        )}
      <ConfirmModal
        isOpen={!!deleteConfirm}
        type="danger"
        title={t('brand:brandMenuOptionGroupsPage.confirmDeleteTitle', 'Delete option group')}
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
        title={t('brand:brandMenuOptionGroupsPage.cannotDeleteTitle', 'Cannot delete option group')}
        message={t('brand:brandMenuOptionGroupsPage.cannotDeleteInUse', { count: inUseInfo?.count || 0, defaultValue: `"${inUseInfo?.name}" is used by ${inUseInfo?.count || 0} menus. Remove from those menus first.` })}
        confirmText={t('common:button.ok', 'OK')}
        onConfirm={() => setInUseInfo(null)}
        onCancel={() => setInUseInfo(null)}
      />
    </Wrapper>
  );
};

export default BrandMenuOptionGroupsPage;
