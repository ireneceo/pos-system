import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Container,
  Header,
  Title,
  ActionSection,
  Content,
  Button
, Modal as CommonModal } from '../../components/UI';
import ConfirmModal from '../../components/ConfirmModal';

interface AddonModule {
  id: number;
  module_code: string;
  name: string;
  description: string;
  category: 'basic' | 'advanced';
  target_user_type: 'restaurant' | 'brand' | 'foodcourt' | 'owner' | 'all';
  base_price_monthly: number;
  base_price_annual: number;
  features: string[];
  dependencies: string[];
  is_active: boolean;
  sort_order: number;
  createdAt: string;
  updatedAt: string;
}

const ModulesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
`;

const ModuleCard = styled.div<{ isActive?: boolean }>`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  opacity: ${props => props.isActive ? 1 : 0.6};
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

const ModuleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

const ModuleName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`;

const ModuleCode = styled.span`
  font-size: 12px;
  color: #6B7280;
  font-family: monospace;
  background: #F3F4F6;
  padding: 2px 6px;
  border-radius: 4px;
`;

const BadgeContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Badge = styled.span<{ variant?: 'category' | 'target' | 'status' }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;

  ${props => {
    switch (props.variant) {
      case 'category':
        return `
          background: #DBEAFE;
          color: #1E40AF;
        `;
      case 'target':
        return `
          background: #FEF3C7;
          color: #92400E;
        `;
      case 'status':
        return `
          background: ${props.children === 'Active' ? '#ECFDF5' : '#FEF2F2'};
          color: ${props.children === 'Active' ? '#059669' : '#DC2626'};
        `;
      default:
        return `
          background: #F3F4F6;
          color: #374151;
        `;
    }
  }}
`;

const ModuleDescription = styled.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 16px 0;
  line-height: 1.5;
`;

const PricingInfo = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  padding: 12px;
  background: #F8FAFC;
  border-radius: 8px;
`;

const PriceItem = styled.div`
  flex: 1;
`;

const PriceLabel = styled.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
`;

const PriceValue = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`;

const FeaturesList = styled.div`
  margin-bottom: 16px;
`;

const FeatureTag = styled.span`
  display: inline-block;
  padding: 4px 8px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 4px;
  font-size: 12px;
  margin: 0 4px 4px 0;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #E6EBF1;
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  flex: 1;
  padding: 10px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  ${props => props.variant === 'primary' ? `
    background: #635BFF;
    color: white;
    border-color: #635BFF;

    &:hover {
      background: #5A51E6;
    }
  ` : props.variant === 'danger' ? `
    background: transparent;
    color: #DC2626;
    border-color: #FCA5A5;

    &:hover {
      background: #FEE2E2;
    }
  ` : `
    background: transparent;
    color: #6B7280;
    border-color: #E6EBF1;

    &:hover {
      background: #F8FAFC;
      color: #0A2540;
    }
  `}
`;


const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 8px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
  background: white;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`;

const FormTextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

const CheckboxItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  input {
    width: 16px;
    height: 16px;
    accent-color: #635BFF;
  }

  label {
    font-size: 14px;
    color: #0A2540;
    cursor: pointer;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
`;

const StatValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #6B7280;
`;

const FilterBar = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

const FilterSelect = styled.select`
  padding: 10px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`;

const SearchInput = styled.input`
  padding: 10px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  min-width: 250px;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`;

const AddonModulesPage: React.FC = () => {
  const [modules, setModules] = useState<AddonModule[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingModule, setEditingModule] = useState<AddonModule | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [targetFilter, setTargetFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingModuleId, setDeletingModuleId] = useState<number | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    module_code: '',
    name: '',
    description: '',
    category: 'basic' as 'basic' | 'advanced',
    target_user_type: 'all' as 'restaurant' | 'brand' | 'foodcourt' | 'owner' | 'all',
    base_price_monthly: '',
    base_price_annual: '',
    features: '',
    dependencies: '',
    is_active: true,
    sort_order: '0'
  });

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/addon-modules');
      if (response.ok) {
        const data = await response.json();
        setModules(data);
      }
    } catch (error) {
      console.error('Error fetching modules:', error);
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingModule(null);
    setFormData({
      module_code: '',
      name: '',
      description: '',
      category: 'basic',
      target_user_type: 'all',
      base_price_monthly: '',
      base_price_annual: '',
      features: '',
      dependencies: '',
      is_active: true,
      sort_order: '0'
    });
    setShowModal(true);
  };

  const openEditModal = (module: AddonModule) => {
    setEditingModule(module);
    setFormData({
      module_code: module.module_code,
      name: module.name,
      description: module.description,
      category: module.category,
      target_user_type: module.target_user_type,
      base_price_monthly: module.base_price_monthly?.toString() || '0',
      base_price_annual: module.base_price_annual?.toString() || '0',
      features: (module.features || []).join('\n'),
      dependencies: (module.dependencies || []).join(', '),
      is_active: module.is_active,
      sort_order: module.sort_order?.toString() || '0'
    });
    setShowModal(true);
  };

  const saveModule = async () => {
    setSaveError(null);
    try {
      const payload = {
        module_code: formData.module_code,
        name: formData.name,
        description: formData.description,
        category: formData.category,
        target_user_type: formData.target_user_type,
        base_price_monthly: parseFloat(formData.base_price_monthly) || 0,
        base_price_annual: parseFloat(formData.base_price_annual) || 0,
        features: formData.features.split('\n').filter(f => f.trim()),
        dependencies: formData.dependencies.split(',').map(d => d.trim()).filter(d => d),
        is_active: formData.is_active,
        sort_order: parseInt(formData.sort_order) || 0
      };

      const url = editingModule
        ? `/api/addon-modules/${editingModule.id}`
        : '/api/addon-modules';

      const response = await fetch(url, {
        method: editingModule ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setShowModal(false);
        fetchModules();
      } else {
        const error = await response.json();
        setSaveError(error.error || 'Failed to save module');
      }
    } catch (error) {
      console.error('Error saving module:', error);
      setSaveError('Failed to save module');
    }
  };

  const deleteModule = (id: number) => {
    setDeletingModuleId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteModule = async () => {
    if (!deletingModuleId) return;
    setShowDeleteConfirm(false);
    try {
      const response = await fetch(`/api/addon-modules/${deletingModuleId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchModules();
      } else {
        setSaveError('Failed to delete module');
      }
    } catch (error) {
      console.error('Error deleting module:', error);
      setSaveError('Failed to delete module');
    }
    setDeletingModuleId(null);
  };

  const toggleModuleStatus = async (module: AddonModule) => {
    try {
      const response = await fetch(`/api/addon-modules/${module.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !module.is_active })
      });

      if (response.ok) {
        fetchModules();
      }
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };

  const filteredModules = modules.filter(module => {
    const matchesSearch = module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         module.module_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         module.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || module.category === categoryFilter;
    const matchesTarget = targetFilter === 'all' || module.target_user_type === targetFilter;
    const matchesStatus = statusFilter === 'all' ||
                         (statusFilter === 'active' && module.is_active) ||
                         (statusFilter === 'inactive' && !module.is_active);
    return matchesSearch && matchesCategory && matchesTarget && matchesStatus;
  });

  const activeModules = modules.filter(m => m.is_active).length;
  const basicModules = modules.filter(m => m.category === 'basic').length;
  const advancedModules = modules.filter(m => m.category !== 'basic').length;

  const formatPrice = (price: number) => {
    return price === 0 ? 'Free' : `RM ${price.toFixed(2)}`;
  };

  return (
    <>
      <Container>
        <Header>
          <Title>Addon Modules</Title>
          <ActionSection>
            <Button variant="primary" onClick={openCreateModal}>
              Create Module
            </Button>
          </ActionSection>
        </Header>
        <Content>
          <StatsGrid>
            <StatCard>
              <StatValue>{modules.length}</StatValue>
              <StatLabel>Total Modules</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{activeModules}</StatValue>
              <StatLabel>Active Modules</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{basicModules}</StatValue>
              <StatLabel>Basic Modules</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{advancedModules}</StatValue>
              <StatLabel>Advanced Modules</StatLabel>
            </StatCard>
          </StatsGrid>

          {saveError && (
            <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', padding: '12px 16px', marginBottom: '16px', color: '#DC2626', fontSize: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{saveError}</span>
              <button onClick={() => setSaveError(null)} style={{ background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer', fontSize: '16px' }}>&times;</button>
            </div>
          )}

          <FilterBar>
            <FilterSelect
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="basic">Basic</option>
              <option value="advanced">Advanced</option>
            </FilterSelect>
            <FilterSelect
              value={targetFilter}
              onChange={(e) => setTargetFilter(e.target.value)}
            >
              <option value="all">All Targets</option>
              <option value="restaurant">Restaurant</option>
              <option value="brand">Brand</option>
              <option value="foodcourt">Foodcourt</option>
              <option value="owner">Owner</option>
            </FilterSelect>
            <FilterSelect
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </FilterSelect>
            <SearchInput
              type="text"
              placeholder="Search modules..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </FilterBar>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#6B7280' }}>
              Loading modules...
            </div>
          ) : filteredModules.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#6B7280' }}>
              No modules found. Click "Create Module" to add one.
            </div>
          ) : (
            <ModulesGrid>
              {filteredModules.map(module => (
                <ModuleCard key={module.id} isActive={module.is_active}>
                  <ModuleHeader>
                    <div>
                      <ModuleName>{module.name}</ModuleName>
                      <ModuleCode>{module.module_code}</ModuleCode>
                    </div>
                    <BadgeContainer>
                      <Badge variant="category">{module.category}</Badge>
                      <Badge variant="target">{module.target_user_type}</Badge>
                      <Badge variant="status">{module.is_active ? 'Active' : 'Inactive'}</Badge>
                    </BadgeContainer>
                  </ModuleHeader>

                  <ModuleDescription>{module.description}</ModuleDescription>

                  <PricingInfo>
                    <PriceItem>
                      <PriceLabel>Monthly</PriceLabel>
                      <PriceValue>{formatPrice(module.base_price_monthly)}</PriceValue>
                    </PriceItem>
                    <PriceItem>
                      <PriceLabel>Annual</PriceLabel>
                      <PriceValue>{formatPrice(module.base_price_annual)}</PriceValue>
                    </PriceItem>
                  </PricingInfo>

                  {module.features && module.features.length > 0 && (
                    <FeaturesList>
                      {module.features.slice(0, 3).map((feature, index) => (
                        <FeatureTag key={index}>{feature}</FeatureTag>
                      ))}
                      {module.features.length > 3 && (
                        <FeatureTag>+{module.features.length - 3} more</FeatureTag>
                      )}
                    </FeaturesList>
                  )}

                  <ActionButtons>
                    <ActionButton variant="primary" onClick={() => openEditModal(module)}>
                      Edit
                    </ActionButton>
                    <ActionButton variant="secondary" onClick={() => toggleModuleStatus(module)}>
                      {module.is_active ? 'Deactivate' : 'Activate'}
                    </ActionButton>
                    <ActionButton variant="danger" onClick={() => deleteModule(module.id)}>
                      Delete
                    </ActionButton>
                  </ActionButtons>
                </ModuleCard>
              ))}
            </ModulesGrid>
          )}

          {/* Create/Edit Modal */}
          {showModal && (
                        <CommonModal isOpen={true} onClose={() => setShowModal(false)} title={editingModule ? 'Edit Module' : 'Create New Module'} footer={<><Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button><Button variant="primary" onClick={saveModule}> {editingModule ? 'Update' : 'Create'} </Button></>}>

                  <FormRow>
                    <FormGroup>
                      <FormLabel>Module Code *</FormLabel>
                      <FormInput
                        type="text"
                        value={formData.module_code}
                        onChange={(e) => setFormData({ ...formData, module_code: e.target.value.toLowerCase().replace(/\s/g, '_') })}
                        placeholder="e.g., pos_basic"
                        disabled={!!editingModule}
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>Name *</FormLabel>
                      <FormInput
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g., POS Basic"
                      />
                    </FormGroup>
                  </FormRow>

                  <FormGroup>
                    <FormLabel>Description</FormLabel>
                    <FormTextArea
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe what this module does..."
                    />
                  </FormGroup>

                  <FormRow>
                    <FormGroup>
                      <FormLabel>Category</FormLabel>
                      <FormSelect
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                      >
                        <option value="basic">Basic</option>
                        <option value="advanced">Advanced</option>
                      </FormSelect>
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>Target User Type</FormLabel>
                      <FormSelect
                        value={formData.target_user_type}
                        onChange={(e) => setFormData({ ...formData, target_user_type: e.target.value as any })}
                      >
                        <option value="all">All</option>
                        <option value="restaurant">Restaurant</option>
                        <option value="brand">Brand</option>
                        <option value="foodcourt">Foodcourt</option>
                        <option value="owner">Owner</option>
                      </FormSelect>
                    </FormGroup>
                  </FormRow>

                  <FormRow>
                    <FormGroup>
                      <FormLabel>Monthly Price (RM)</FormLabel>
                      <FormInput
                        type="number"
                        value={formData.base_price_monthly}
                        onChange={(e) => setFormData({ ...formData, base_price_monthly: e.target.value })}
                        placeholder="0.00"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>Annual Price (RM)</FormLabel>
                      <FormInput
                        type="number"
                        value={formData.base_price_annual}
                        onChange={(e) => setFormData({ ...formData, base_price_annual: e.target.value })}
                        placeholder="0.00"
                      />
                    </FormGroup>
                  </FormRow>

                  <FormGroup>
                    <FormLabel>Features (one per line)</FormLabel>
                    <FormTextArea
                      rows={4}
                      value={formData.features}
                      onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                      placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                    />
                  </FormGroup>

                  <FormRow>
                    <FormGroup>
                      <FormLabel>Dependencies (comma-separated codes)</FormLabel>
                      <FormInput
                        type="text"
                        value={formData.dependencies}
                        onChange={(e) => setFormData({ ...formData, dependencies: e.target.value })}
                        placeholder="e.g., pos_basic, inventory"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>Sort Order</FormLabel>
                      <FormInput
                        type="number"
                        value={formData.sort_order}
                        onChange={(e) => setFormData({ ...formData, sort_order: e.target.value })}
                        placeholder="0"
                      />
                    </FormGroup>
                  </FormRow>

                  <CheckboxItem>
                    <input
                      type="checkbox"
                      id="is_active"
                      checked={formData.is_active}
                      onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    />
                    <label htmlFor="is_active">Active</label>
                  </CheckboxItem>
                
            </CommonModal>
          )}
        </Content>
      </Container>

      <ConfirmModal
        isOpen={showDeleteConfirm}
        title="Delete Module"
        message="Are you sure you want to delete this module?"
        onConfirm={confirmDeleteModule}
        onCancel={() => { setShowDeleteConfirm(false); setDeletingModuleId(null); }}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </>
  );
};

export default AddonModulesPage;
