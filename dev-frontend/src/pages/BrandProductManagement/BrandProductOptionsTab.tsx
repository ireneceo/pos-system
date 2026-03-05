import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { EmptyState } from '../../components/UI/TableComponents';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import { FilterBar, SearchInput } from '../../components/Common/FilterComponents';
import { Modal } from '../../components/UI/Modal';


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
          background: #EF4444;
          color: white;
          &:hover { background: #DC2626; }
        `;
      case 'secondary':
        return `
          background: white;
          color: #6B7280;
          border: 1px solid #E5E7EB;
          &:hover { background: #F9FAFB; }
        `;
      default:
        return `
          background: #635BFF;
          color: white;
          &:hover { background: #5246ED; }
        `;
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Grid = styled.div`
  display: grid;
  gap: 16px;
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
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
  color: #1F2937;
  margin: 0 0 8px 0;
`;

const CardMeta = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Badge = styled.span<{ type: 'required' | 'optional' }>`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;

  ${props => props.type === 'required' ? `
    background: #FEE2E2;
    color: #DC2626;
  ` : `
    background: #E0F2FE;
    color: #0369A1;
  `}
`;

const CardActions = styled.div`
  display: flex;
  gap: 8px;
`;

const IconButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 6px;
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
    width: 16px;
    height: 16px;
    color: #6B7280;
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
  background: #F3F4F6;
  border-radius: 6px;
  font-size: 13px;
  color: #374151;
`;

const OptionPrice = styled.span`
  margin-left: 6px;
  color: #6B7280;
  font-size: 12px;
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
  box-sizing: border-box;
  padding: 10px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  gap: 16px;
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
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`;

const RemoveButton = styled.button`
  background: #FEE2E2;
  color: #DC2626;
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #FECACA;
  }
`;

interface Option {
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
  options: Option[];
}

interface Props {
  onCountChange: (count: number) => void;
}

const BrandProductOptionsTab: React.FC<Props> = ({ onCountChange }) => {
  const [optionGroups, setOptionGroups] = useState<OptionGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<OptionGroup | null>(null);
  const [deletingGroupId, setDeletingGroupId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    is_required: false,
    options: [] as Option[]
  });
  const [newOption, setNewOption] = useState({ name: '', price_adjustment: 0 });

  const fetchOptionGroups = useCallback(async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/brand-product-option-groups', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setOptionGroups(data.data);
          onCountChange(data.data.length);
        }
      }
    } catch (error) {
      console.error('Error fetching option groups:', error);
    } finally {
      setLoading(false);
    }
  }, [onCountChange]);

  useEffect(() => {
    fetchOptionGroups();
  }, [fetchOptionGroups]);

  const handleOpenModal = (group?: OptionGroup) => {
    if (group) {
      setEditingGroup(group);
      setFormData({
        name: group.name,
        is_required: group.is_required,
        options: group.options.map(o => ({ ...o }))
      });
    } else {
      setEditingGroup(null);
      setFormData({
        name: '',
        is_required: false,
        options: []
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingGroup(null);
    setFormData({ name: '', is_required: false, options: [] });
    setNewOption({ name: '', price_adjustment: 0 });
  };

  const handleAddOption = () => {
    if (!newOption.name.trim()) return;
    const priceAdj = isNaN(newOption.price_adjustment) ? 0 : newOption.price_adjustment;
    setFormData(prev => ({
      ...prev,
      options: [...prev.options, { name: newOption.name.trim(), price_adjustment: priceAdj }]
    }));
    setNewOption({ name: '', price_adjustment: 0 });
  };

  const handleRemoveOption = (index: number) => {
    setFormData(prev => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    if (!formData.name.trim() || formData.options.length === 0) return;

    try {
      const token = localStorage.getItem('auth_token');
      const url = editingGroup
        ? `/api/brand-product-option-groups/${editingGroup.id}`
        : '/api/brand-product-option-groups';
      const method = editingGroup ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          is_required: formData.is_required,
          options: formData.options
        })
      });

      if (response.ok) {
        fetchOptionGroups();
        handleCloseModal();
      }
    } catch (error) {
      console.error('Error saving option group:', error);
    }
  };

  const handleDeleteClick = (groupId: number) => {
    setDeletingGroupId(groupId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deletingGroupId) return;

    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/brand-product-option-groups/${deletingGroupId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        fetchOptionGroups();
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to delete option group');
      }
    } catch (error) {
      console.error('Error deleting option group:', error);
    } finally {
      setIsDeleteModalOpen(false);
      setDeletingGroupId(null);
    }
  };

  const filteredGroups = optionGroups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center', color: '#6B7280' }}>Loading...</div>;
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <FilterBar style={{ marginBottom: 0 }}>
          <SearchInput
            type="text"
            placeholder="Search option groups..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </FilterBar>
        <ThemedButton onClick={() => handleOpenModal()} style={{ flexShrink: 0 }}>
          Add Option Group
        </ThemedButton>
      </div>

      {filteredGroups.length === 0 ? (
        <EmptyState>
          <EmptyTitle>No option groups yet</EmptyTitle>
          <EmptyDescription>
            Create option groups to add customizable options to your products
          </EmptyDescription>
          <Button onClick={() => handleOpenModal()}>
            Add Option Group
          </Button>
        </EmptyState>
      ) : (
        <Grid>
          {filteredGroups.map(group => (
            <Card key={group.id}>
              <CardHeader>
                <CardInfo>
                  <CardTitle>{group.name}</CardTitle>
                  <CardMeta>
                    <Badge type={group.is_required ? 'required' : 'optional'}>
                      {group.is_required ? 'Required' : 'Optional'}
                    </Badge>
                    <span style={{ fontSize: '13px', color: '#6B7280' }}>
                      {group.options.length} options
                    </span>
                  </CardMeta>
                </CardInfo>
                <CardActions>
                  <IconButton onClick={() => handleOpenModal(group)}>
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(group.id)}>
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </IconButton>
                </CardActions>
              </CardHeader>
              <OptionsList>
                {group.options.map((option, idx) => (
                  <OptionChip key={idx}>
                    {option.name}
                    {option.price_adjustment !== 0 && (
                      <OptionPrice>
                        {Number(option.price_adjustment) > 0 ? '+' : ''}RM {(Number(option.price_adjustment) || 0).toFixed(2)}
                      </OptionPrice>
                    )}
                  </OptionChip>
                ))}
              </OptionsList>
            </Card>
          ))}
        </Grid>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingGroup ? 'Edit Option Group' : 'New Option Group'}
      >
        <FormGroup>
          <Label>Group Name</Label>
          <Input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Size, Grade, Packaging"
          />
        </FormGroup>

        <FormGroup>
          <CheckboxGroup>
            <CheckboxLabel>
              <input
                type="checkbox"
                checked={formData.is_required}
                onChange={(e) => setFormData({ ...formData, is_required: e.target.checked })}
              />
              Required Selection
            </CheckboxLabel>
          </CheckboxGroup>
        </FormGroup>

        <FormGroup>
          <Label>Options</Label>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <Input
              type="text"
              value={newOption.name}
              onChange={(e) => setNewOption({ ...newOption, name: e.target.value })}
              placeholder="Option name"
              style={{ flex: 2 }}
            />
            <Input
              type="number"
              value={newOption.price_adjustment}
              onChange={(e) => setNewOption({ ...newOption, price_adjustment: parseFloat(e.target.value) || 0 })}
              placeholder="Price adj."
              step="0.50"
              style={{ flex: 1 }}
            />
            <Button type="button" variant="secondary" onClick={handleAddOption} disabled={!newOption.name.trim()}>
              Add
            </Button>
          </div>

          {formData.options.map((option, idx) => (
            <OptionItemRow key={idx}>
              <div style={{ flex: 1 }}>
                <strong>{option.name}</strong>
                {option.price_adjustment !== 0 && (
                  <span style={{ marginLeft: '8px', color: '#6B7280' }}>
                    ({Number(option.price_adjustment) > 0 ? '+' : ''}RM {(Number(option.price_adjustment) || 0).toFixed(2)})
                  </span>
                )}
              </div>
              <RemoveButton onClick={() => handleRemoveOption(idx)}>x</RemoveButton>
            </OptionItemRow>
          ))}
        </FormGroup>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
          <Button type="button" variant="secondary" onClick={handleCloseModal}>Cancel</Button>
          <Button type="button" onClick={handleSave} disabled={!formData.name.trim() || formData.options.length === 0}>
            {editingGroup ? 'Update' : 'Create'}
          </Button>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Option Group"
      >
        <p>Are you sure you want to delete this option group? This action cannot be undone.</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
          <Button type="button" variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
          <Button type="button" variant="danger" onClick={handleConfirmDelete}>Delete</Button>
        </div>
      </Modal>
    </>
  );
};

export default BrandProductOptionsTab;
