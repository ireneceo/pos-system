import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import {
  Modal as CommonModal, ModalButton,
  FormGroup as UIFormGroup, FormLabel, FormInput,
  EmptyState
} from '../../components/UI';
import { FilterBar, SearchInput } from '../../components/Common/FilterComponents';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import ConfirmModal from '../../components/ConfirmModal';
import { getAuthToken } from '../../utils/auth';

interface OptionItem {
  id?: number;
  name: string;
  price_adjustment: number;
}

interface OptionGroup {
  id: number;
  name: string;
  is_required: boolean;
  min_selections: number;
  max_selections: number;
  options: OptionItem[];
}

interface Props {
  onCountChange: (n: number) => void;
  onChange?: () => void;
}

const GroupCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  margin-bottom: 16px;
`;

const GroupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

const ReqBadge = styled.span<{ required: boolean }>`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  background: ${p => p.required ? '#FEE2E2' : '#E0F2FE'};
  color: ${p => p.required ? '#DC2626' : '#0369A1'};
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
  svg { width: 16px; height: 16px; color: #6B7280; }
`;

const OptionsListInline = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const OptionChip = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  background: #F3F4F6;
  border-radius: 6px;
  font-size: 13px;
  color: #374151;
`;

const OptionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
  border-bottom: 1px solid #F3F4F6;
  &:last-child { border-bottom: none; }
`;

const RemoveBtn = styled.button`
  background: #FEE2E2;
  color: #DC2626;
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #374151;
  cursor: pointer;
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

const FoodcourtProductOptionsTab: React.FC<Props> = ({ onCountChange, onChange }) => {
  const { t } = useTranslation(['foodcourt', 'common']);
  const [groups, setGroups] = useState<OptionGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<OptionGroup | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [toDelete, setToDelete] = useState<OptionGroup | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [formData, setFormData] = useState<{ name: string; is_required: boolean; options: OptionItem[] }>({
    name: '', is_required: false, options: []
  });
  const [newOption, setNewOption] = useState<OptionItem>({ name: '', price_adjustment: 0 });

  const fetchGroups = useCallback(async () => {
    try {
      const token = getAuthToken();
      const res = await fetch('/api/foodcourt-product-option-groups', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setGroups(data.data || []);
        onCountChange((data.data || []).length);
      }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, [onCountChange]);

  useEffect(() => { setLoading(true); fetchGroups(); }, [fetchGroups]);

  const openModal = (g?: OptionGroup) => {
    setFormError(null);
    if (g) {
      setEditing(g);
      setFormData({
        name: g.name,
        is_required: g.is_required,
        options: g.options.map(o => ({ ...o }))
      });
    } else {
      setEditing(null);
      setFormData({ name: '', is_required: false, options: [] });
    }
    setNewOption({ name: '', price_adjustment: 0 });
    setShowModal(true);
  };

  const closeModal = () => { setShowModal(false); setEditing(null); setFormError(null); };

  const addOption = () => {
    if (!newOption.name.trim()) return;
    const adj = isNaN(newOption.price_adjustment) ? 0 : newOption.price_adjustment;
    setFormData(prev => ({
      ...prev,
      options: [...prev.options, { name: newOption.name.trim(), price_adjustment: adj }]
    }));
    setNewOption({ name: '', price_adjustment: 0 });
  };

  const removeOption = (idx: number) => {
    setFormData(prev => ({ ...prev, options: prev.options.filter((_, i) => i !== idx) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setFormError(t('common:required', 'Name is required'));
      return;
    }
    if (formData.options.length === 0) {
      setFormError(t('foodcourt:products.atLeastOneOption', 'Add at least one option'));
      return;
    }
    try {
      const token = getAuthToken();
      const url = editing
        ? `/api/foodcourt-product-option-groups/${editing.id}`
        : '/api/foodcourt-product-option-groups';
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          name: formData.name.trim(),
          is_required: formData.is_required,
          options: formData.options
        })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setFormError(data.message || 'Failed to save');
        return;
      }
      closeModal();
      fetchGroups();
      onChange?.();
    } catch (err) {
      console.error(err);
      setFormError('Failed to save');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!toDelete) return;
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/foodcourt-product-option-groups/${toDelete.id}`, {
        method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setDeleteOpen(false);
        setToDelete(null);
        fetchGroups();
        onChange?.();
      }
    } catch (err) { console.error(err); }
  };

  const filtered = groups.filter(g => g.name.toLowerCase().includes(search.toLowerCase()));

  if (loading) {
    return <div style={{ padding: 40, textAlign: 'center', color: '#6B7280' }}>{t('common:loading', 'Loading...')}</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, marginTop: 16 }}>
        <FilterBar style={{ marginBottom: 0 }}>
          <SearchInput
            type="text"
            placeholder={t('common:search', 'Search') as string}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </FilterBar>
        <ThemedButton onClick={() => openModal()} style={{ flexShrink: 0 }}>
          {t('foodcourt:products.addOptionGroup', 'Add Option Group')}
        </ThemedButton>
      </div>

      {filtered.length === 0 ? (
        <EmptyState>
          <h4 style={{ fontSize: 18, fontWeight: 600, color: '#1F2937', margin: '0 0 8px 0' }}>
            {t('foodcourt:products.noOptionGroupsTitle', 'No option groups yet')}
          </h4>
          <p style={{ fontSize: 14, color: '#6B7280', margin: '0 0 24px 0' }}>
            {t('foodcourt:products.optionGroupsDescription', 'Create option groups to add customizable options to your products.')}
          </p>
          <ThemedButton onClick={() => openModal()}>
            {t('foodcourt:products.addOptionGroup', 'Add Option Group')}
          </ThemedButton>
        </EmptyState>
      ) : (
        <div>
          {filtered.map(g => (
            <GroupCard key={g.id}>
              <GroupHeader>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: '#1F2937', margin: '0 0 8px 0' }}>{g.name}</h3>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <ReqBadge required={g.is_required}>
                      {g.is_required ? t('common:required', 'Required') : t('common:optional', 'Optional')}
                    </ReqBadge>
                    <span style={{ fontSize: 13, color: '#6B7280' }}>
                      {g.options.length} {t('foodcourt:products.options', 'options')}
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <IconBtn onClick={() => openModal(g)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </IconBtn>
                  <IconBtn onClick={() => { setToDelete(g); setDeleteOpen(true); }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                    </svg>
                  </IconBtn>
                </div>
              </GroupHeader>
              <OptionsListInline>
                {g.options.map((opt, idx) => (
                  <OptionChip key={idx}>
                    {opt.name}
                    {Number(opt.price_adjustment) !== 0 && (
                      <span style={{ marginLeft: 6, color: '#6B7280', fontSize: 12 }}>
                        {Number(opt.price_adjustment) > 0 ? '+' : ''}RM {Number(opt.price_adjustment).toFixed(2)}
                      </span>
                    )}
                  </OptionChip>
                ))}
              </OptionsListInline>
            </GroupCard>
          ))}
        </div>
      )}

      {showModal && (
        <CommonModal
          isOpen={showModal}
          onClose={closeModal}
          title={editing
            ? t('foodcourt:products.editOptionGroup', 'Edit Option Group') as string
            : t('foodcourt:products.newOptionGroup', 'New Option Group') as string}
          footer={
            <>
              <ModalButton type="button" onClick={closeModal}>{t('common:cancel', 'Cancel')}</ModalButton>
              <ModalButton type="submit" form="fc-og-form" variant="primary">
                {editing ? t('common:update', 'Update') : t('common:create', 'Create')}
              </ModalButton>
            </>
          }
        >
          <form id="fc-og-form" onSubmit={handleSubmit}>
            <UIFormGroup>
              <FormLabel>{t('foodcourt:products.groupName', 'Group Name')} *</FormLabel>
              <FormInput type="text" value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Size, Toppings" required />
            </UIFormGroup>

            <UIFormGroup>
              <CheckboxLabel>
                <input type="checkbox" checked={formData.is_required}
                  onChange={(e) => setFormData({ ...formData, is_required: e.target.checked })} />
                {t('common:requiredSelection', 'Required Selection')}
              </CheckboxLabel>
            </UIFormGroup>

            <UIFormGroup>
              <FormLabel>{t('foodcourt:products.options', 'Options')}</FormLabel>
              <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                <FormInput type="text" value={newOption.name}
                  onChange={(e) => setNewOption({ ...newOption, name: e.target.value })}
                  placeholder={t('foodcourt:products.optionName', 'Option name') as string}
                  style={{ flex: 2 }} />
                <FormInput type="number" step="0.50" value={newOption.price_adjustment}
                  onChange={(e) => setNewOption({ ...newOption, price_adjustment: parseFloat(e.target.value) || 0 })}
                  placeholder={t('foodcourt:products.priceAdj', 'Price adj.') as string}
                  style={{ flex: 1 }} />
                <ThemedButton type="button" variant="outline" onClick={addOption} disabled={!newOption.name.trim()}>
                  {t('common:add', 'Add')}
                </ThemedButton>
              </div>

              {formData.options.map((opt, idx) => (
                <OptionRow key={idx}>
                  <div style={{ flex: 1 }}>
                    <strong>{opt.name}</strong>
                    {Number(opt.price_adjustment) !== 0 && (
                      <span style={{ marginLeft: 8, color: '#6B7280' }}>
                        ({Number(opt.price_adjustment) > 0 ? '+' : ''}RM {Number(opt.price_adjustment).toFixed(2)})
                      </span>
                    )}
                  </div>
                  <RemoveBtn type="button" onClick={() => removeOption(idx)}>x</RemoveBtn>
                </OptionRow>
              ))}
            </UIFormGroup>

            {formError && <ErrorBox>{formError}</ErrorBox>}
          </form>
        </CommonModal>
      )}

      <ConfirmModal
        isOpen={deleteOpen}
        onCancel={() => { setDeleteOpen(false); setToDelete(null); }}
        onConfirm={handleDeleteConfirm}
        title={t('foodcourt:products.deleteOptionGroup', 'Delete Option Group') as string}
        message={`${t('common:deleteConfirm', 'Are you sure you want to delete')} "${toDelete?.name}"?`}
        confirmText={t('common:delete', 'Delete') as string}
        cancelText={t('common:cancel', 'Cancel') as string}
      />
    </div>
  );
};

export default FoodcourtProductOptionsTab;
