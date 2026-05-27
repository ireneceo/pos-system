import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { EmptyState } from '../../components/UI/TableComponents';
import { Container, Header, Title, Content } from '../../components/UI';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import { FilterBar, SearchInput } from '../../components/Common/FilterComponents';
import { useAuth } from '../../contexts/AuthContext';
import ConfirmModal from '../../components/ConfirmModal';
import SupplierFormModal from '../../components/Suppliers/SupplierFormModal';
import SupplierViewModal from '../../components/Suppliers/SupplierViewModal';
import { useTranslation } from 'react-i18next';

import { getAuthToken } from '../../utils/auth';
interface Brand {
  id: number;
  name: string;
  code: string;
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
  connectedBrands?: Brand[];
}

const HeaderActions = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

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
  border: 1px solid #C7CED6;
  padding: 20px;
  transition: all 0.2s;
  opacity: ${props => props.isActive ? 1 : 0.6};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  ${props => props.readOnly && `
    background: #F9FAFB;
    border: 1px dashed #6B7280;
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
  color: #4B5563;
  margin-left: 8px;
`;


const StatusBadge = styled.span<{ active: boolean }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  background: ${props => props.active ? '#ECFDF5' : '#FEE2E2'};
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
  color: #4B5563;

  svg {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
  }
`;

const CardActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid #C7CED6;
`;

const ActionButton = styled.button<{ variant?: 'danger' }>`
  flex: 1;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  border: 1px solid ${props => props.variant === 'danger' ? '#FEE2E2' : '#C7CED6'};
  background: ${props => props.variant === 'danger' ? '#FEF2F2' : 'white'};
  color: ${props => props.variant === 'danger' ? '#DC2626' : '#374151'};

  &:hover {
    background: ${props => props.variant === 'danger' ? '#FEE2E2' : '#F9FAFB'};
    border-color: ${props => props.variant === 'danger' ? '#FECACA' : '#6B7280'};
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
  color: #4B5563;
  margin-bottom: 24px;
`;

const FilterSection = styled.div`
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
  color: #4B5563;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;


const ViewSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ViewRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ViewField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ViewLabel = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #4B5563;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;

const ViewValue = styled.span`
  font-size: 14px;
  color: #1F2937;
  font-weight: 500;
`;

const ViewDivider = styled.hr`
  border: none;
  border-top: 1px solid #C7CED6;
  margin: 4px 0;
`;

const SuppliersPage: React.FC = () => {
  const { t, i18n } = useTranslation('suppliers');
  const { user } = useAuth();
  const effectiveRestaurantId = user?.restaurant_id || (user as any)?.restaurantId;
  const [searchParams, setSearchParams] = useSearchParams();

  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [brandSuppliers, setBrandSuppliers] = useState<Supplier[]>([]);
  // 가맹본부 / 푸드코트 본부 / 계약된 supplier_company — 자동 fetch 후 list 에 추가 섹션
  const [parentSellers, setParentSellers] = useState<Array<any>>([]);
  const [contractSellers, setContractSellers] = useState<Array<any>>([]);
  const [, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [infoModal, setInfoModal] = useState<{ open: boolean; title: string; message: string }>({ open: false, title: '', message: '' });
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewSupplier, setViewSupplier] = useState<Supplier | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; supplierId: number | null; supplierName: string }>({
    isOpen: false,
    supplierId: null,
    supplierName: ''
  });

  const isRestaurantAdmin = user?.role === 'Restaurant Admin';
  const isBrandUser = user?.role === 'Brand General' || user?.role === 'Brand Manager';

  const getToken = useCallback(() => getAuthToken(), []);

  // Parent BG/FG + 계약된 supplier_company 추가 fetch — Direct 탭에 표시.
  useEffect(() => {
    const token = getToken();
    const auth = { headers: { Authorization: `Bearer ${token}` } };
    const loadExtras = async () => {
      try {
        // 1) Parent BG/FG — Restaurant Admin 한정 (가맹점이 자기 본부를 공급처로 표시)
        const parents: any[] = [];
        if (isRestaurantAdmin && effectiveRestaurantId) {
          const restRes = await fetch(`/api/restaurants/${effectiveRestaurantId}`, auth).then(r => r.json()).catch(() => null);
          const rest = restRes?.data || restRes;
          if (rest?.brand_id) {
            const brRes = await fetch(`/api/brands/${rest.brand_id}`, auth).then(r => r.json()).catch(() => null);
            const br = brRes?.data || brRes;
            if (br?.id) parents.push({
              id: `bg-${br.id}`, name: br.name, email: br.email || null,
              phone: br.phone || null, contact_name: null,
              _source: 'brand_parent', _label: 'BRAND HQ', _category: { name: '가맹본부', color: '#6D28D9' }
            });
          }
          if (rest?.foodcourt_id) {
            const fcRes = await fetch(`/api/foodcourts/${rest.foodcourt_id}`, auth).then(r => r.json()).catch(() => null);
            const fc = fcRes?.data || fcRes;
            if (fc?.id) parents.push({
              id: `fg-${fc.id}`, name: fc.name, email: fc.email || null,
              phone: fc.phone || null, contact_name: null,
              _source: 'foodcourt_parent', _label: 'FOODCOURT', _category: { name: '푸드코트 본부', color: '#9D174D' }
            });
          }
        }
        setParentSellers(parents);

        // 2) 계약된 supplier_company — 자동 정보 가져오기 (이름/email/phone 등)
        const contractsRes = await fetch('/api/supplier-contracts?status=active', auth).then(r => r.json()).catch(() => null);
        const contracts = contractsRes?.data || [];
        const contractItems = contracts.map((c: any) => {
          const sc = c.supplierCompany || {};
          return {
            id: `c-${sc.id || c.supplier_company_id}`,
            name: sc.name || '—', email: sc.email || null,
            phone: sc.phone || null, contact_name: null,
            _source: 'contract', _label: 'CONTRACTED', _category: { name: '계약', color: '#166534' }
          };
        });
        setContractSellers(contractItems);
      } catch (e) {
        console.error('Failed to load parent/contract sellers:', e);
      }
    };
    loadExtras();
  }, [isRestaurantAdmin, effectiveRestaurantId, getToken]);

  // Fetch brands for Brand General/Manager
  useEffect(() => {
    if (isBrandUser) {
      fetchBrands();
      fetchSuppliers();
    } else if (isRestaurantAdmin && effectiveRestaurantId) {
      fetchRestaurantSuppliers();
    } else {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBrandUser, isRestaurantAdmin, effectiveRestaurantId]);

  const fetchBrands = async () => {
    try {
      const token = getToken();
      const response = await fetch('/api/brands', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setBrands(data);
      }
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  const fetchSuppliers = async () => {
    const token = getToken();
    setLoading(true);

    try {
      // Use new unified API
      const response = await fetch('/api/suppliers', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setSuppliers(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch suppliers:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRestaurantSuppliers = async () => {
    const token = getToken();
    setLoading(true);

    try {
      const response = await fetch(`/api/restaurants/${effectiveRestaurantId}/all-suppliers`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setSuppliers(data.data.own_suppliers || []);
        setBrandSuppliers(data.data.brand_suppliers || []);
      }
    } catch (error) {
      console.error('Failed to fetch suppliers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (supplier?: Supplier) => {
    setSelectedSupplier(supplier || null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSupplier(null);
  };

  const handleViewSupplier = (supplier: Supplier) => {
    setViewSupplier(supplier);
    setShowViewModal(true);
  };

  // Deep link: ?supplier=ID — AllSuppliersView 카드에서 Edit/View 클릭 시 자동 모달 open.
  // own 은 edit 모달, brand_shared(owner_type='brand') 는 view 모달.
  useEffect(() => {
    const supplierIdParam = searchParams.get('supplier');
    if (!supplierIdParam) return;
    if (loading) return;
    const id = parseInt(supplierIdParam, 10);
    if (isNaN(id)) return;
    const found = [...suppliers, ...brandSuppliers].find(s => s.id === id);
    if (!found) return;
    if (found.owner_type === 'brand' && isRestaurantAdmin) {
      handleViewSupplier(found);
    } else {
      handleOpenModal(found);
    }
    // 쿼리 제거 — 모달 닫고 재오픈 방지
    const next = new URLSearchParams(searchParams);
    next.delete('supplier');
    setSearchParams(next, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [suppliers, brandSuppliers, loading]);

  // 저장은 SupplierFormModal 자체에서 처리. 성공 시 onSaved 콜백으로 list 재 fetch.
  const handleFormSaved = () => {
    handleCloseModal();
    if (isBrandUser) fetchSuppliers();
    else fetchRestaurantSuppliers();
  };

  const handleDelete = async () => {
    if (!deleteConfirm.supplierId) return;

    try {
      const token = getToken();
      let url = '';

      if (isBrandUser) {
        url = `/api/suppliers/${deleteConfirm.supplierId}`;
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
        if (isBrandUser) {
          fetchSuppliers();
        } else {
          fetchRestaurantSuppliers();
        }
      } else {
        setInfoModal({ open: true, title: t('suppliers:deleteFailedTitle', 'Delete Failed'), message: data.error || t('suppliers:deleteFailedMessage', 'Failed to delete. Please try again.') });
      }
    } catch (error) {
      console.error('Failed to delete supplier:', error);
      setInfoModal({ open: true, title: t('suppliers:deleteFailedTitle', 'Delete Failed'), message: t('suppliers:deleteFailedMessage', 'Failed to delete. Please try again.') });
    }
  };

  const handleToggleActive = async (supplier: Supplier) => {
    try {
      const token = getAuthToken();
      let url = '';
      if (isBrandUser) {
        url = `/api/suppliers/${supplier.id}`;
      } else if (isRestaurantAdmin && effectiveRestaurantId) {
        url = `/api/restaurants/${effectiveRestaurantId}/suppliers/${supplier.id}`;
      }
      if (!url) return;
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ is_active: !supplier.is_active })
      });
      if (response.ok) {
        if (isBrandUser) fetchSuppliers();
        else fetchRestaurantSuppliers();
      }
    } catch (error) {
      console.error('Toggle active error:', error);
    }
  };

  const isItemReadOnly = (item: Supplier) => isRestaurantAdmin && item.owner_type === 'brand';

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
      onClick={() => readOnly ? handleViewSupplier(supplier) : handleOpenModal(supplier)}
    >
      <SupplierHeader>
        <div>
          <SupplierName>
            {supplier.name}
            {supplier.code && <SupplierCode>({supplier.code})</SupplierCode>}
          </SupplierName>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {!readOnly && <StatusBadge active={supplier.is_active}>{supplier.is_active ? 'Active' : 'Inactive'}</StatusBadge>}
        </div>
      </SupplierHeader>

      {/* Brand tags removed - suppliers are shared across all brands */}

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

      <CardActions onClick={e => e.stopPropagation()}>
        <ActionButton onClick={() => handleViewSupplier(supplier)}>{t('suppliers:suppliersPage.view')}</ActionButton>
        {!readOnly && (
          <>
            <ActionButton
              onClick={() => handleToggleActive(supplier)}
              title={supplier.is_active ? 'Deactivate' : 'Activate'}
              style={{ color: supplier.is_active ? '#10B981' : '#6B7280' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                {supplier.is_active
                  ? <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></>
                  : <circle cx="12" cy="12" r="10" />
                }
              </svg>
            </ActionButton>
            <ActionButton onClick={() => handleOpenModal(supplier)}>{t('suppliers:suppliersPage.edit')}</ActionButton>
            <ActionButton
              variant="danger"
              onClick={() => setDeleteConfirm({ isOpen: true, supplierId: supplier.id, supplierName: supplier.name })}
            >
              Delete
            </ActionButton>
          </>
        )}
      </CardActions>
    </SupplierCard>
  );

  if (loading && !suppliers.length && !brandSuppliers.length) {
    return (
      <>
        <Container>
          <Header>
            <Title>{t('suppliers:suppliersPage.suppliers')}</Title>
          </Header>
          <Content>
            <div style={{ textAlign: 'center', padding: '40px', color: '#4B5563' }}>
              Loading...
            </div>
          </Content>
        </Container>
      </>
    );
  }

  return (
    <>
      <Container>
        <Content>
          <FilterSection>
            <FilterBar style={{ marginBottom: 0, flex: 1 }}>
              <SearchInput
                type="text"
                placeholder="Search suppliers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div style={{ marginLeft: 'auto' }}>
                <ThemedButton variant="primary" onClick={() => handleOpenModal()}>
                  Add Supplier
                </ThemedButton>
              </div>
            </FilterBar>
          </FilterSection>

          {isRestaurantAdmin && filteredBrandSuppliers.length > 0 && (
            <BrandSuppliersSection>
              <SectionTitle>{t('suppliers:suppliersPage.brandSuppliersReadOnly')}</SectionTitle>
              <SuppliersGrid>
                {filteredBrandSuppliers.map(supplier => renderSupplierCard(supplier, true))}
              </SuppliersGrid>
            </BrandSuppliersSection>
          )}

          {suppliers.length === 0 && brandSuppliers.length === 0 ? (
            <EmptyState>
              <EmptyTitle>{t('suppliers:suppliersPage.noSuppliersYet')}</EmptyTitle>
              <EmptyDescription>
                Add suppliers to manage your ingredient sources.
                {isBrandUser && ' You can connect suppliers to multiple brands.'}
              </EmptyDescription>
              <ThemedButton variant="primary" onClick={() => handleOpenModal()}>
                Add Supplier
              </ThemedButton>
            </EmptyState>
          ) : filteredSuppliers.length === 0 && !isRestaurantAdmin ? (
            <EmptyState>
              <EmptyTitle>{t('suppliers:suppliersPage.noSuppliersFound')}</EmptyTitle>
              <EmptyDescription>
                {searchTerm ? 'Try adjusting your search' : 'Add your first supplier'}
              </EmptyDescription>
            </EmptyState>
          ) : (
            <>
              {isRestaurantAdmin && filteredSuppliers.length > 0 && (
                <SectionTitle>{t('suppliers:suppliersPage.mySuppliers')}</SectionTitle>
              )}
              <SuppliersGrid>
                {filteredSuppliers.map(supplier => renderSupplierCard(supplier, isItemReadOnly(supplier)))}
              </SuppliersGrid>
            </>
          )}
        </Content>

        <SupplierFormModal
          isOpen={showModal}
          onClose={handleCloseModal}
          onSaved={handleFormSaved}
          supplier={selectedSupplier}
        />

        <SupplierViewModal
          isOpen={showViewModal}
          onClose={() => { setShowViewModal(false); setViewSupplier(null); }}
          supplier={viewSupplier}
        />

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
        <ConfirmModal
          isOpen={infoModal.open}
          title={infoModal.title}
          message={infoModal.message}
          onConfirm={() => setInfoModal({ open: false, title: '', message: '' })}
          onCancel={() => setInfoModal({ open: false, title: '', message: '' })}
          confirmText={t('common:ok', 'OK')}
          type="info"
          singleButton
        />
      </Container>
    </>
  );
};

export default SuppliersPage;
