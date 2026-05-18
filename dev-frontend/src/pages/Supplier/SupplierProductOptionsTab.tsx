import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { EmptyState } from '../../components/UI/TableComponents';
import { FormGrid2 } from '../../components/UI/FormGrid';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import { FilterBar, SearchInput } from '../../components/Common/FilterComponents';
import {
  Modal,
  ModalButton,
  FormGroup as UIFormGroup,
  FormLabel,
  FormInput
} from '../../components/UI/Modal';
import ConfirmModal from '../../components/ConfirmModal';
import { getAuthToken } from '../../utils/auth';

interface SupplierProductOption {
  id?: number;
  name: string;
  price_adjustment: number;
  sort_order?: number;
}

interface SupplierProductOptionGroup {
  id: number;
  supplier_company_id: number;
  name: string;
  is_required: boolean;
  min_selections: number;
  max_selections: number;
  sort_order: number;
  options: SupplierProductOption[];
}

interface Props {
  onCountChange: (count: number) => void;
  onOptionGroupChange?: () => void;
}

const Grid = styled.div`
  display: grid;
  gap: 16px;
  margin-top: 24px;
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

const CardInfo = styled.div`
  flex: 1;
`;

const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px 0;
`;

const CardMeta = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Pill = styled.span<{ type: 'required' | 'optional' }>`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  ${(props) =>
    props.type === 'required'
      ? `background: #FEE2E2; color: #DC2626;`
      : `background: #E0F2FE; color: #0369A1;`}
`;

const CardActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: auto;
  padding-top: 12px;
`;

const IconButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f9fafb;
    border-color: #d1d5db;
  }

  svg {
    width: 16px;
    height: 16px;
    color: #6b7280;
  }
`;

const OptionsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const OptionChip = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  background: #f3f4f6;
  border-radius: 6px;
  font-size: 13px;
  color: #374151;
`;

const OptionPrice = styled.span`
  margin-left: 6px;
  color: #6b7280;
  font-size: 12px;
`;

const EmptyTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px 0;
`;

const EmptyDescription = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 0 0 24px 0;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #374151;
`;

const OptionItemRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
  border-bottom: 1px solid #f3f4f6;

  &:last-child {
    border-bottom: none;
  }
`;

const RemoveButton = styled.button`
  background: #fee2e2;
  color: #dc2626;
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #fecaca;
  }
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

const SmallNumberInput = styled.input`
  width: 80px;
  box-sizing: border-box;
  padding: 8px 10px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 13px;

  &:focus {
    outline: none;
    border-color: #635bff;
  }
`;

const SupplierProductOptionsTab: React.FC<Props> = ({ onCountChange, onOptionGroupChange }) => {
  const { t } = useTranslation('supplier');
  const [optionGroups, setOptionGroups] = useState<SupplierProductOptionGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<SupplierProductOptionGroup | null>(null);
  const [deletingGroupId, setDeletingGroupId] = useState<number | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    is_required: false,
    min_selections: 0,
    max_selections: 1,
    options: [] as SupplierProductOption[]
  });
  const [newOption, setNewOption] = useState<{ name: string; price_adjustment: number }>({
    name: '',
    price_adjustment: 0
  });

  const fetchOptionGroups = useCallback(async () => {
    try {
      const token = getAuthToken();
      const response = await fetch('/api/supplier-product-option-groups', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setOptionGroups(data.data || []);
        onCountChange((data.data || []).length);
      }
    } catch (error) {
      console.error('Failed to fetch option groups:', error);
    } finally {
      setLoading(false);
    }
  }, [onCountChange]);

  useEffect(() => {
    fetchOptionGroups();
  }, [fetchOptionGroups]);

  const handleOpenModal = (group?: SupplierProductOptionGroup) => {
    if (group) {
      setEditingGroup(group);
      setFormData({
        name: group.name,
        is_required: group.is_required,
        min_selections: group.min_selections,
        max_selections: group.max_selections,
        options: (group.options || []).map((o) => ({ ...o }))
      });
    } else {
      setEditingGroup(null);
      setFormData({
        name: '',
        is_required: false,
        min_selections: 0,
        max_selections: 1,
        options: []
      });
    }
    setNewOption({ name: '', price_adjustment: 0 });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingGroup(null);
    setFormData({ name: '', is_required: false, min_selections: 0, max_selections: 1, options: [] });
    setNewOption({ name: '', price_adjustment: 0 });
    setFormError(null);
  };

  const handleAddOption = () => {
    if (!newOption.name.trim()) return;
    const priceAdj = Number.isFinite(newOption.price_adjustment) ? newOption.price_adjustment : 0;
    setFormData((prev) => ({
      ...prev,
      options: [
        ...prev.options,
        {
          name: newOption.name.trim(),
          price_adjustment: priceAdj,
          sort_order: prev.options.length
        }
      ]
    }));
    setNewOption({ name: '', price_adjustment: 0 });
  };

  const handleRemoveOption = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    if (isSubmitting) return;
    if (!formData.name.trim()) {
      setFormError('Group name is required');
      return;
    }
    if (formData.options.length === 0) {
      setFormError('At least one option is required');
      return;
    }
    if (formData.max_selections < 1) {
      setFormError('max_selections must be at least 1');
      return;
    }
    if (formData.min_selections < 0) {
      setFormError('min_selections must be 0 or higher');
      return;
    }
    if (formData.min_selections > formData.max_selections) {
      setFormError('min_selections cannot exceed max_selections');
      return;
    }

    setIsSubmitting(true);
    setFormError(null);

    try {
      const token = getAuthToken();
      const url = editingGroup
        ? `/api/supplier-product-option-groups/${editingGroup.id}`
        : '/api/supplier-product-option-groups';
      const method = editingGroup ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          is_required: formData.is_required,
          min_selections: formData.min_selections,
          max_selections: formData.max_selections,
          options: formData.options.map((o, idx) => ({
            id: o.id,
            name: o.name,
            price_adjustment: o.price_adjustment,
            sort_order: idx
          }))
        })
      });

      const data = await response.json();

      if (data.success) {
        handleCloseModal();
        await fetchOptionGroups();
        onOptionGroupChange?.();
      } else {
        setFormError(data.message || 'Failed to save option group');
      }
    } catch (error) {
      console.error('Error saving option group:', error);
      setFormError('Failed to save option group');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = (groupId: number) => {
    setDeletingGroupId(groupId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deletingGroupId) return;
    try {
      const token = getAuthToken();
      const response = await fetch(`/api/supplier-product-option-groups/${deletingGroupId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        await fetchOptionGroups();
        onOptionGroupChange?.();
      } else {
        setFormError(data.message || 'Failed to delete option group');
      }
    } catch (error) {
      console.error('Error deleting option group:', error);
    } finally {
      setIsDeleteModalOpen(false);
      setDeletingGroupId(null);
    }
  };

  const filteredGroups = optionGroups.filter((group) =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#6B7280' }}>Loading...</div>
    );
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginTop: '24px',
          marginBottom: '24px'
        }}
      >
        <FilterBar style={{ marginBottom: 0 }}>
          <SearchInput
            type="text"
            placeholder="Search option groups..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </FilterBar>
        <ThemedButton onClick={() => handleOpenModal()} style={{ flexShrink: 0 }}>
          {t('products.addOptionGroup', 'Add Option Group')}
        </ThemedButton>
      </div>

      {filteredGroups.length === 0 ? (
        <EmptyState>
          <EmptyTitle>No option groups yet</EmptyTitle>
          <EmptyDescription>
            Create option groups to add customizable options (size, packaging, grade) to your
            products.
          </EmptyDescription>
          <ThemedButton onClick={() => handleOpenModal()}>
            {t('products.addOptionGroup', 'Add Option Group')}
          </ThemedButton>
        </EmptyState>
      ) : (
        <Grid>
          {filteredGroups.map((group) => (
            <Card key={group.id}>
              <CardHeader>
                <CardInfo>
                  <CardTitle>{group.name}</CardTitle>
                  <CardMeta>
                    <Pill type={group.is_required ? 'required' : 'optional'}>
                      {group.is_required ? 'Required' : 'Optional'}
                    </Pill>
                    <span style={{ fontSize: '13px', color: '#6B7280' }}>
                      {group.options?.length || 0} options
                    </span>
                    <span style={{ fontSize: '13px', color: '#6B7280' }}>
                      {group.min_selections}-{group.max_selections} selections
                    </span>
                  </CardMeta>
                </CardInfo>
                <CardActions>
                  <IconButton onClick={() => handleOpenModal(group)} title="Edit">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(group.id)} title="Delete">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </IconButton>
                </CardActions>
              </CardHeader>
              <OptionsList>
                {(group.options || []).map((option, idx) => (
                  <OptionChip key={option.id ?? idx}>
                    {option.name}
                    {Number(option.price_adjustment) !== 0 && (
                      <OptionPrice>
                        {Number(option.price_adjustment) > 0 ? '+' : ''}RM{' '}
                        {(Number(option.price_adjustment) || 0).toFixed(2)}
                      </OptionPrice>
                    )}
                  </OptionChip>
                ))}
              </OptionsList>
            </Card>
          ))}
        </Grid>
      )}

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={editingGroup ? 'Edit Option Group' : t('products.addOptionGroup', 'Add Option Group')}
        >
          <UIFormGroup>
            <FormLabel>Group Name *</FormLabel>
            <FormInput
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Size, Grade, Packaging"
            />
          </UIFormGroup>

          <UIFormGroup>
            <CheckboxLabel>
              <input
                type="checkbox"
                checked={formData.is_required}
                onChange={(e) => setFormData({ ...formData, is_required: e.target.checked })}
              />
              Required Selection
            </CheckboxLabel>
          </UIFormGroup>

          <FormGrid2>
            <UIFormGroup>
              <FormLabel>Min Selections</FormLabel>
              <FormInput
                type="number"
                min="0"
                value={formData.min_selections}
                onChange={(e) =>
                  setFormData({ ...formData, min_selections: parseInt(e.target.value, 10) || 0 })
                }
              />
            </UIFormGroup>
            <UIFormGroup>
              <FormLabel>Max Selections</FormLabel>
              <FormInput
                type="number"
                min="1"
                value={formData.max_selections}
                onChange={(e) =>
                  setFormData({ ...formData, max_selections: parseInt(e.target.value, 10) || 1 })
                }
              />
            </UIFormGroup>
          </FormGrid2>

          <UIFormGroup>
            <FormLabel>Options *</FormLabel>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
              <FormInput
                type="text"
                value={newOption.name}
                onChange={(e) => setNewOption({ ...newOption, name: e.target.value })}
                placeholder="Option name"
                style={{ flex: 2 }}
              />
              <SmallNumberInput
                type="number"
                value={newOption.price_adjustment}
                onChange={(e) =>
                  setNewOption({
                    ...newOption,
                    price_adjustment: parseFloat(e.target.value) || 0
                  })
                }
                placeholder="Price adj."
                step="0.50"
              />
              <ModalButton
                type="button"
                onClick={handleAddOption}
                disabled={!newOption.name.trim()}
              >
                Add
              </ModalButton>
            </div>

            {formData.options.map((option, idx) => (
              <OptionItemRow key={idx}>
                <div style={{ flex: 1 }}>
                  <strong>{option.name}</strong>
                  {Number(option.price_adjustment) !== 0 && (
                    <span style={{ marginLeft: '8px', color: '#6B7280' }}>
                      ({Number(option.price_adjustment) > 0 ? '+' : ''}RM{' '}
                      {(Number(option.price_adjustment) || 0).toFixed(2)})
                    </span>
                  )}
                </div>
                <RemoveButton type="button" onClick={() => handleRemoveOption(idx)}>
                  x
                </RemoveButton>
              </OptionItemRow>
            ))}
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
            <ModalButton
              type="button"
              variant="primary"
              onClick={handleSave}
              disabled={isSubmitting || !formData.name.trim() || formData.options.length === 0}
            >
              {isSubmitting ? 'Saving...' : editingGroup ? 'Update' : 'Create'}
            </ModalButton>
          </div>

          {formError && <ErrorBanner>{formError}</ErrorBanner>}
        </Modal>
      )}

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onCancel={() => {
          setIsDeleteModalOpen(false);
          setDeletingGroupId(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Option Group"
        message="Are you sure you want to delete this option group? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
};

export default SupplierProductOptionsTab;
