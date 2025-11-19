import React, { useState } from 'react';
import styled from 'styled-components';
import MainLayout from '../../components/Layout/MainLayout';
import { useMenu } from '../../contexts/MenuContext';
import { Modal, ModalButton } from '../../components/UI/Modal';

const Container = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
`;

const Header = styled.header`
  background: white;
  padding: 24px 32px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
          background: #EF4444;
          color: white;
          &:hover {
            background: #DC2626;
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

const OptionGroupGrid = styled.div`
  display: grid;
  gap: 16px;
  padding: 24px 0;
`;

const OptionGroupCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`;

const OptionGroupHeader = styled.div`
  display: flex;
  justify-content: between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

const OptionGroupInfo = styled.div`
  flex: 1;
`;

const OptionGroupName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 4px 0;
`;

const OptionGroupMeta = styled.div`
  display: flex;
  gap: 12px;
  font-size: 13px;
  color: #6B7280;
  margin-bottom: 8px;
`;

const OptionGroupBadge = styled.span<{ type: 'required' | 'optional' | 'single' | 'multiple' }>`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  
  ${props => {
    switch (props.type) {
      case 'required':
        return `
          background: #FEE2E2;
          color: #DC2626;
        `;
      case 'optional':
        return `
          background: #E0F2FE;
          color: #0369A1;
        `;
      case 'single':
        return `
          background: #F3F4F6;
          color: #6B7280;
        `;
      case 'multiple':
        return `
          background: #ECFDF5;
          color: #059669;
        `;
      default:
        return `
          background: #F3F4F6;
          color: #6B7280;
        `;
    }
  }}
`;

const OptionGroupActions = styled.div`
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
  display: grid;
  gap: 8px;
`;

const OptionItem = styled.div`
  display: flex;
  justify-content: between;
  align-items: center;
  padding: 8px 12px;
  background: #F9FAFB;
  border-radius: 6px;
  border: 1px solid #E5E7EB;
`;

const OptionItemInfo = styled.div`
  flex: 1;
`;

const OptionItemName = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #1F2937;
`;

const OptionItemPrice = styled.span`
  font-size: 13px;
  color: #6B7280;
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

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  accent-color: #635BFF;
`;


const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 12px;
  margin: 24px 0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

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

const OptionItemsList = styled.div`
  margin-top: 16px;
`;

const OptionItemRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid #F3F4F6;
  
  &:last-child {
    border-bottom: none;
  }
`;

const RemoveOptionButton = styled.button`
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


interface OptionGroup {
  id: string;
  name: string;
  required: boolean;
  multiple: boolean;
  options: Array<{
    id: string;
    name: string;
    price: number;
  }>;
}

const OptionManagementPage: React.FC = () => {
  const { optionGroups, addOptionGroup, updateOptionGroup, deleteOptionGroup } = useMenu();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingGroupId, setDeletingGroupId] = useState<string | null>(null);
  const [editingGroup, setEditingGroup] = useState<OptionGroup | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    required: false,
    multiple: false,
    options: [] as Array<{ id: string; name: string; price: number }>
  });
  const [newOption, setNewOption] = useState({ name: '', price: 0 });

  const handleOpenModal = (group?: OptionGroup) => {
    if (group) {
      setEditingGroup(group);
      setFormData({
        name: group.name,
        required: group.required,
        multiple: group.multiple,
        options: [...group.options]
      });
    } else {
      setEditingGroup(null);
      setFormData({
        name: '',
        required: false,
        multiple: false,
        options: []
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingGroup(null);
    setFormData({
      name: '',
      required: false,
      multiple: false,
      options: []
    });
    setNewOption({ name: '', price: 0 });
  };

  const handleAddOption = () => {
    if (!newOption.name.trim()) return;
    
    const option = {
      id: `opt-${Date.now()}`,
      name: newOption.name,
      price: newOption.price
    };
    
    setFormData({
      ...formData,
      options: [...formData.options, option]
    });
    
    setNewOption({ name: '', price: 0 });
  };

  const handleRemoveOption = (optionId: string) => {
    setFormData({
      ...formData,
      options: formData.options.filter(opt => opt.id !== optionId)
    });
  };

  const handleSave = () => {
    if (!formData.name.trim() || formData.options.length === 0) return;

    if (editingGroup) {
      updateOptionGroup(editingGroup.id, {
        ...formData,
        id: editingGroup.id
      });
    } else {
      const newGroup = {
        id: `group-${Date.now()}`,
        ...formData
      };
      addOptionGroup(newGroup);
    }
    handleCloseModal();
  };

  const handleDeleteClick = (groupId: string) => {
    setDeletingGroupId(groupId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deletingGroupId) {
      deleteOptionGroup(deletingGroupId);
      setIsDeleteModalOpen(false);
      setDeletingGroupId(null);
    }
  };

  return (
    <MainLayout>
      <Container>
        <Header>
          <HeaderTitle>Options</HeaderTitle>
          <HeaderActions>
            <Button onClick={() => handleOpenModal()}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Add Option Group
            </Button>
          </HeaderActions>
        </Header>

        <Content>
          {optionGroups.length === 0 ? (
            <EmptyState>
              <EmptyIcon>⚙️</EmptyIcon>
              <EmptyTitle>No option groups yet</EmptyTitle>
              <EmptyDescription>
                Create your first option group to add customizable options to your menu items
              </EmptyDescription>
              <Button onClick={() => handleOpenModal()}>
                Create Option Group
              </Button>
            </EmptyState>
          ) : (
            <OptionGroupGrid>
              {optionGroups.map(group => (
                <OptionGroupCard key={group.id}>
                  <OptionGroupHeader>
                    <OptionGroupInfo>
                      <OptionGroupName>{group.name}</OptionGroupName>
                      <OptionGroupMeta>
                        <OptionGroupBadge type={group.required ? 'required' : 'optional'}>
                          {group.required ? 'Required' : 'Optional'}
                        </OptionGroupBadge>
                        <OptionGroupBadge type={group.multiple ? 'multiple' : 'single'}>
                          {group.multiple ? 'Multiple Selection' : 'Single Selection'}
                        </OptionGroupBadge>
                        <span>{group.options.length} options</span>
                      </OptionGroupMeta>
                    </OptionGroupInfo>
                    <OptionGroupActions>
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
                    </OptionGroupActions>
                  </OptionGroupHeader>
                  
                  <OptionsList>
                    {group.options.map(option => (
                      <OptionItem key={option.id}>
                        <OptionItemInfo>
                          <OptionItemName>{option.name}</OptionItemName>
                          {option.price > 0 && (
                            <OptionItemPrice>+RM {option.price.toFixed(2)}</OptionItemPrice>
                          )}
                        </OptionItemInfo>
                      </OptionItem>
                    ))}
                  </OptionsList>
                </OptionGroupCard>
              ))}
            </OptionGroupGrid>
          )}
        </Content>

        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={editingGroup ? 'Edit Option Group' : 'New Option Group'}
          footer={
            <>
              <ModalButton variant="secondary" onClick={handleCloseModal}>
                Cancel
              </ModalButton>
              <ModalButton
                variant="primary"
                onClick={handleSave}
                disabled={!formData.name.trim() || formData.options.length === 0}
              >
                {editingGroup ? 'Update' : 'Create'}
              </ModalButton>
            </>
          }
        >
          <FormGroup>
            <Label>Group Name</Label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Size, Spice Level, Extra Toppings"
              autoFocus
            />
          </FormGroup>

          <FormGroup>
            <Label>Selection Type</Label>
            <CheckboxGroup>
              <CheckboxLabel>
                <Checkbox
                  type="checkbox"
                  checked={formData.required}
                  onChange={(e) => setFormData({ ...formData, required: e.target.checked })}
                />
                Required
              </CheckboxLabel>
              <CheckboxLabel>
                <Checkbox
                  type="checkbox"
                  checked={formData.multiple}
                  onChange={(e) => setFormData({ ...formData, multiple: e.target.checked })}
                />
                Multiple Selection
              </CheckboxLabel>
            </CheckboxGroup>
          </FormGroup>

          <FormGroup>
            <Label>Add Option</Label>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <Input
                type="text"
                value={newOption.name}
                onChange={(e) => setNewOption({ ...newOption, name: e.target.value })}
                placeholder="Option name"
                style={{ flex: 2 }}
              />
              <Input
                type="number"
                value={newOption.price}
                onChange={(e) => setNewOption({ ...newOption, price: parseFloat(e.target.value) || 0 })}
                placeholder="Price"
                step="0.50"
                min="0"
                style={{ flex: 1 }}
              />
              <Button
                variant="secondary"
                onClick={handleAddOption}
                disabled={!newOption.name.trim()}
              >
                Add
              </Button>
            </div>

            <OptionItemsList>
              {formData.options.map(option => (
                <OptionItemRow key={option.id}>
                  <div style={{ flex: 1 }}>
                    <strong>{option.name}</strong>
                    {option.price > 0 && <span> (+RM {option.price.toFixed(2)})</span>}
                  </div>
                  <RemoveOptionButton onClick={() => handleRemoveOption(option.id)}>
                    ×
                  </RemoveOptionButton>
                </OptionItemRow>
              ))}
            </OptionItemsList>
          </FormGroup>
        </Modal>

        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          title="Delete Option Group"
          footer={
            <>
              <ModalButton variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>
                Cancel
              </ModalButton>
              <ModalButton variant="danger" onClick={handleConfirmDelete}>
                Delete
              </ModalButton>
            </>
          }
        >
          <p>Are you sure you want to delete this option group? This action cannot be undone.</p>
        </Modal>
      </Container>
    </MainLayout>
  );
};

export default OptionManagementPage;