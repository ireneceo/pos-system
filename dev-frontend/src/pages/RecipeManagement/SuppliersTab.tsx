import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { EmptyState } from '../../components/UI/TableComponents';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import { FilterBar, SearchInput } from '../../components/Common/FilterComponents';
import { useAuth } from '../../contexts/AuthContext';
import { Modal, ModalButton, FormGroup as UIFormGroup, FormLabel, FormInput, FormTextArea, FormRow as UIFormRow } from '../../components/UI/Modal';
import ConfirmModal from '../../components/ConfirmModal';

interface SuppliersTabProps {
  brandId: number | null;
  restaurantId?: number | null;
  onCountChange: (count: number) => void;
}

interface Supplier {
  id: number;
  brand_id: number | null;
  restaurant_id: number | null;
  owner_type: 'brand' | 'restaurant';
  code: string | null;
  name: string;
  contact_name: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  business_number: string | null;
  bank_name: string | null;
  bank_account: string | null;
  payment_terms: string | null;
  notes: string | null;
  is_active: boolean;
}

const SuppliersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  margin-top: 24px;
  align-items: start;
`;

const SupplierCard = styled.div<{ isActive?: boolean; readOnly?: boolean }>`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  padding: 20px;
  transition: all 0.2s;
  opacity: ${props => props.isActive ? 1 : 0.6};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  ${props => props.readOnly && `
    background: #F9FAFB;
    border: 1px dashed #D1D5DB;
  `}

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
    border-color: #635BFF;
  }
`;

const SupplierHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

const SupplierName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`;

const SupplierCode = styled.span`
  font-size: 12px;
  color: #6B7280;
  margin-left: 8px;
`;

const BrandBadge = styled.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  background: #FEF3C7;
  color: #92400E;
`;

const StatusBadge = styled.span<{ active: boolean }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  background: ${props => props.active ? '#D1FAE5' : '#FEE2E2'};
  color: ${props => props.active ? '#059669' : '#DC2626'};
  margin-left: 8px;
`;

const SupplierInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #6B7280;

  svg {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
  }
`;

const CardActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #E6EBF1;
`;

const ActionButton = styled.button<{ variant?: 'danger' }>`
  flex: 1;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  border: 1px solid ${props => props.variant === 'danger' ? '#FEE2E2' : '#E6EBF1'};
  background: ${props => props.variant === 'danger' ? '#FEF2F2' : 'white'};
  color: ${props => props.variant === 'danger' ? '#DC2626' : '#4B5563'};

  &:hover {
    background: ${props => props.variant === 'danger' ? '#FEE2E2' : '#F9FAFB'};
    border-color: ${props => props.variant === 'danger' ? '#FECACA' : '#D1D5DB'};
  }
`;


const EmptyTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`;

const EmptyDescription = styled.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const BrandSuppliersSection = styled.div`
  margin-bottom: 32px;
`;

const SectionTitle = styled.h4`
  font-size: 14px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SuppliersTab: React.FC<SuppliersTabProps> = ({ brandId, restaurantId: propsRestaurantId, onCountChange }) => {
  const { user } = useAuth();
  const effectiveRestaurantId = propsRestaurantId || user?.restaurant_id || (user as any)?.restaurantId;
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [brandSuppliers, setBrandSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    contact_name: '',
    phone: '',
    email: '',
    address: '',
    business_number: '',
    bank_name: '',
    bank_account: '',
    payment_terms: '',
    notes: ''
  });
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; supplierId: number | null; supplierName: string }>({
    isOpen: false,
    supplierId: null,
    supplierName: ''
  });

  const isRestaurantAdmin = user?.role === 'Restaurant Admin';
  const isBrandUser = user?.role === 'Brand General' || user?.role === 'Brand Manager';
  const isItemReadOnly = (item: Supplier) => isRestaurantAdmin && item.owner_type === 'brand';

  const getToken = useCallback(() => localStorage.getItem('auth_token'), []);

  useEffect(() => {
    const fetchAllData = async () => {
      if (!brandId && !effectiveRestaurantId) return;

      setLoading(true);
      const token = getToken();

      try {
        if (isBrandUser && brandId) {
          const response = await fetch(`/api/brands/${brandId}/suppliers`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const data = await response.json();
          if (data.success) {
            setSuppliers(data.data);
            onCountChange(data.data.length);
          }
        } else if (isRestaurantAdmin && effectiveRestaurantId) {
          const response = await fetch(`/api/restaurants/${effectiveRestaurantId}/all-suppliers`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const data = await response.json();
          if (data.success) {
            setSuppliers(data.data.own_suppliers || []);
            setBrandSuppliers(data.data.brand_suppliers || []);
            onCountChange((data.data.own_suppliers?.length || 0) + (data.data.brand_suppliers?.length || 0));
          }
        }
      } catch (error) {
        console.error('Failed to fetch suppliers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [brandId, effectiveRestaurantId, isBrandUser, isRestaurantAdmin, getToken, onCountChange]);

  const fetchSuppliers = async () => {
    const token = getToken();

    try {
      if (isBrandUser && brandId) {
        const response = await fetch(`/api/brands/${brandId}/suppliers`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (data.success) {
          setSuppliers(data.data);
          onCountChange(data.data.length);
        }
      } else if (isRestaurantAdmin && effectiveRestaurantId) {
        const response = await fetch(`/api/restaurants/${effectiveRestaurantId}/all-suppliers`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (data.success) {
          setSuppliers(data.data.own_suppliers || []);
          setBrandSuppliers(data.data.brand_suppliers || []);
          onCountChange((data.data.own_suppliers?.length || 0) + (data.data.brand_suppliers?.length || 0));
        }
      }
    } catch (error) {
      console.error('Failed to fetch suppliers:', error);
    }
  };

  const handleOpenModal = (supplier?: Supplier) => {
    if (supplier) {
      setSelectedSupplier(supplier);
      setFormData({
        code: supplier.code || '',
        name: supplier.name,
        contact_name: supplier.contact_name || '',
        phone: supplier.phone || '',
        email: supplier.email || '',
        address: supplier.address || '',
        business_number: supplier.business_number || '',
        bank_name: supplier.bank_name || '',
        bank_account: supplier.bank_account || '',
        payment_terms: supplier.payment_terms || '',
        notes: supplier.notes || ''
      });
    } else {
      setSelectedSupplier(null);
      setFormData({
        code: '',
        name: '',
        contact_name: '',
        phone: '',
        email: '',
        address: '',
        business_number: '',
        bank_name: '',
        bank_account: '',
        payment_terms: '',
        notes: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSupplier(null);
    setFormData({
      code: '',
      name: '',
      contact_name: '',
      phone: '',
      email: '',
      address: '',
      business_number: '',
      bank_name: '',
      bank_account: '',
      payment_terms: '',
      notes: ''
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    try {
      const token = getToken();
      let url = '';
      const method = selectedSupplier ? 'PUT' : 'POST';

      if (isBrandUser && brandId) {
        url = selectedSupplier
          ? `/api/brands/${brandId}/suppliers/${selectedSupplier.id}`
          : `/api/brands/${brandId}/suppliers`;
      } else if (isRestaurantAdmin && effectiveRestaurantId) {
        url = selectedSupplier
          ? `/api/restaurants/${effectiveRestaurantId}/suppliers/${selectedSupplier.id}`
          : `/api/restaurants/${effectiveRestaurantId}/suppliers`;
      }

      if (!url) return;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        handleCloseModal();
        fetchSuppliers();
      } else {
        alert(data.error || 'Failed to save');
      }
    } catch (error) {
      console.error('Failed to save supplier:', error);
      alert('Failed to save');
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm.supplierId) return;

    try {
      const token = getToken();
      let url = '';

      if (isBrandUser && brandId) {
        url = `/api/brands/${brandId}/suppliers/${deleteConfirm.supplierId}`;
      } else if (isRestaurantAdmin && effectiveRestaurantId) {
        url = `/api/restaurants/${effectiveRestaurantId}/suppliers/${deleteConfirm.supplierId}`;
      }

      if (!url) return;

      const response = await fetch(url, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();

      if (data.success) {
        setDeleteConfirm({ isOpen: false, supplierId: null, supplierName: '' });
        fetchSuppliers();
      } else {
        alert(data.error || 'Failed to delete');
      }
    } catch (error) {
      console.error('Failed to delete supplier:', error);
      alert('Failed to delete');
    }
  };

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (supplier.code && supplier.code.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (supplier.contact_name && supplier.contact_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredBrandSuppliers = brandSuppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (supplier.code && supplier.code.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (supplier.contact_name && supplier.contact_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const renderSupplierCard = (supplier: Supplier, readOnly: boolean = false) => (
    <SupplierCard
      key={supplier.id}
      isActive={supplier.is_active}
      readOnly={readOnly}
      onClick={() => !readOnly && handleOpenModal(supplier)}
    >
      <SupplierHeader>
        <div>
          <SupplierName>
            {supplier.name}
            {supplier.code && <SupplierCode>({supplier.code})</SupplierCode>}
          </SupplierName>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {readOnly && <BrandBadge>Brand</BrandBadge>}
          {!readOnly && <StatusBadge active={supplier.is_active}>{supplier.is_active ? 'Active' : 'Inactive'}</StatusBadge>}
        </div>
      </SupplierHeader>

      <SupplierInfo>
        {supplier.contact_name && (
          <InfoRow>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            {supplier.contact_name}
          </InfoRow>
        )}
        {supplier.phone && (
          <InfoRow>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            {supplier.phone}
          </InfoRow>
        )}
        {supplier.email && (
          <InfoRow>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            {supplier.email}
          </InfoRow>
        )}
        {supplier.payment_terms && (
          <InfoRow>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
              <line x1="1" y1="10" x2="23" y2="10" />
            </svg>
            {supplier.payment_terms}
          </InfoRow>
        )}
      </SupplierInfo>

      {!readOnly && (
        <CardActions onClick={e => e.stopPropagation()}>
          <ActionButton onClick={() => handleOpenModal(supplier)}>Edit</ActionButton>
          <ActionButton
            variant="danger"
            onClick={() => setDeleteConfirm({ isOpen: true, supplierId: supplier.id, supplierName: supplier.name })}
          >
            Delete
          </ActionButton>
        </CardActions>
      )}
    </SupplierCard>
  );

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#6B7280' }}>
        Loading...
      </div>
    );
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <FilterBar style={{ marginBottom: 0, flex: 1 }}>
          <SearchInput
            type="text"
            placeholder="Search suppliers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </FilterBar>
        <ThemedButton variant="primary" onClick={() => handleOpenModal()} style={{ flexShrink: 0 }}>
          Add Supplier
        </ThemedButton>
      </div>

      {isRestaurantAdmin && filteredBrandSuppliers.length > 0 && (
        <BrandSuppliersSection>
          <SectionTitle>Brand Suppliers (Read Only)</SectionTitle>
          <SuppliersGrid>
            {filteredBrandSuppliers.map(supplier => renderSupplierCard(supplier, true))}
          </SuppliersGrid>
        </BrandSuppliersSection>
      )}

      {suppliers.length === 0 && brandSuppliers.length === 0 ? (
        <EmptyState>
          <EmptyTitle>No suppliers yet</EmptyTitle>
          <EmptyDescription>
            Add suppliers to manage your ingredient sources
          </EmptyDescription>
          <ThemedButton variant="primary" onClick={() => handleOpenModal()}>
            Add Supplier
          </ThemedButton>
        </EmptyState>
      ) : filteredSuppliers.length === 0 && !isRestaurantAdmin ? (
        <EmptyState>
          <EmptyTitle>No suppliers found</EmptyTitle>
          <EmptyDescription>
            {searchTerm ? 'Try adjusting your search' : 'Add your first supplier'}
          </EmptyDescription>
        </EmptyState>
      ) : (
        <>
          {isRestaurantAdmin && filteredSuppliers.length > 0 && (
            <SectionTitle>My Suppliers</SectionTitle>
          )}
          <SuppliersGrid>
            {filteredSuppliers.map(supplier => renderSupplierCard(supplier, isItemReadOnly(supplier)))}
          </SuppliersGrid>
        </>
      )}

      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={selectedSupplier ? 'Edit Supplier' : 'New Supplier'}
        size="large"
        footer={
          <>
            <ModalButton variant="secondary" onClick={handleCloseModal}>Cancel</ModalButton>
            <ModalButton variant="primary" onClick={handleSubmit} disabled={!formData.name.trim()}>
              {selectedSupplier ? 'Update' : 'Create'}
            </ModalButton>
          </>
        }
      >
        <form onSubmit={handleSubmit}>
          <UIFormRow>
            <UIFormGroup>
              <FormLabel>Supplier Name *</FormLabel>
              <FormInput
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Company name"
                required
              />
            </UIFormGroup>
            <UIFormGroup>
              <FormLabel>Code</FormLabel>
              <FormInput
                type="text"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="Internal code"
              />
            </UIFormGroup>
          </UIFormRow>

          <UIFormRow>
            <UIFormGroup>
              <FormLabel>Contact Person</FormLabel>
              <FormInput
                type="text"
                value={formData.contact_name}
                onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })}
                placeholder="Contact name"
              />
            </UIFormGroup>
            <UIFormGroup>
              <FormLabel>Phone</FormLabel>
              <FormInput
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Phone number"
              />
            </UIFormGroup>
          </UIFormRow>

          <UIFormRow>
            <UIFormGroup>
              <FormLabel>Email</FormLabel>
              <FormInput
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Email address"
              />
            </UIFormGroup>
            <UIFormGroup>
              <FormLabel>Business Number</FormLabel>
              <FormInput
                type="text"
                value={formData.business_number}
                onChange={(e) => setFormData({ ...formData, business_number: e.target.value })}
                placeholder="Business registration number"
              />
            </UIFormGroup>
          </UIFormRow>

          <UIFormGroup>
            <FormLabel>Address</FormLabel>
            <FormInput
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Full address"
            />
          </UIFormGroup>

          <UIFormRow>
            <UIFormGroup>
              <FormLabel>Payment Terms</FormLabel>
              <FormInput
                type="text"
                value={formData.payment_terms}
                onChange={(e) => setFormData({ ...formData, payment_terms: e.target.value })}
                placeholder="e.g., Net 30, COD"
              />
            </UIFormGroup>
          </UIFormRow>

          <UIFormRow>
            <UIFormGroup>
              <FormLabel>Bank Name</FormLabel>
              <FormInput
                type="text"
                value={formData.bank_name}
                onChange={(e) => setFormData({ ...formData, bank_name: e.target.value })}
                placeholder="Bank name"
              />
            </UIFormGroup>
            <UIFormGroup>
              <FormLabel>Bank Account</FormLabel>
              <FormInput
                type="text"
                value={formData.bank_account}
                onChange={(e) => setFormData({ ...formData, bank_account: e.target.value })}
                placeholder="Account number"
              />
            </UIFormGroup>
          </UIFormRow>

          <UIFormGroup>
            <FormLabel>Notes</FormLabel>
            <FormTextArea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Additional notes..."
              rows={3}
            />
          </UIFormGroup>
        </form>
      </Modal>

      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        onCancel={() => setDeleteConfirm({ isOpen: false, supplierId: null, supplierName: '' })}
        onConfirm={handleDelete}
        title="Delete Supplier"
        message={`Are you sure you want to delete "${deleteConfirm.supplierName}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </>
  );
};

export default SuppliersTab;
