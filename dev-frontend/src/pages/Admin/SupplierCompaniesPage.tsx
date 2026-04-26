import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Header,
  Title,
  ActionSection,
  Content,
  Button,
  StatsGrid,
  StatCard,
  StatValue,
  StatLabel,
  DataTableContainer,
  DataTable,
  DataTableHead,
  DataTableHeaderCell,
  DataTableRow,
  DataTableCell,
  DataTableEmpty,
  DataTableActions,
  DataTableStatus,
  Modal as CommonModal,
  ModalButton,
  FormGroup,
  FormLabel,
  FormInput,
  FormSelect,
  FormTextArea,
  FormRow
} from '../../components/UI';
import { getAuthToken } from '../../utils/auth';
import { formatDate } from '../../utils/timezone';

// ----- Types -----

interface SupplierOwner {
  id: number;
  email: string;
  full_name?: string;
  role: string;
}

interface SupplierPlan {
  id: number;
  name: string;
  display_name?: string;
  plan_target?: string;
}

interface SupplierCompany {
  id: number;
  name: string;
  code?: string;
  description?: string;
  status: string;
  email?: string;
  phone?: string;
  company_name?: string;
  registration_no?: string;
  trade_name?: string;
  tax_no?: string;
  address?: string;
  address_line_2?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
  website?: string;
  logo_url?: string;
  bank_name?: string;
  bank_account?: string;
  bank_account_name?: string;
  currency?: string;
  plan_id?: number | null;
  plan_type?: string;
  plan_amount?: string | number;
  billing_cycle?: string;
  subscription_status?: string;
  subscription_start?: string;
  subscription_end?: string;
  trial_end_date?: string;
  is_demo?: boolean;
  is_test?: boolean;
  product_count?: number;
  created_at?: string;
  createdAt?: string;
  owner?: SupplierOwner | null;
  plan?: SupplierPlan | null;
}

interface UserOption {
  id: number | string;
  email: string;
  full_name?: string;
  role: string;
}

interface PlanOption {
  id: number;
  name: string;
  display_name?: string;
  plan_target: string;
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ----- Styled -----

const FiltersContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

const FilterSelect = styled.select`
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  min-width: 160px;
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const SearchInput = styled.input`
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  flex: 1;
  min-width: 220px;
  max-width: 320px;
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 12px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #E6EBF1;
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 24px;

  @media (max-width: 600px) { grid-template-columns: 1fr; }
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const DetailLabel = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.4px;
`;

const DetailValue = styled.span`
  font-size: 14px;
  color: #0A2540;
`;

const Checkbox = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
  input { width: 16px; height: 16px; }
`;

const PaginationBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  font-size: 13px;
  color: #6B7280;
`;

const PageBtn = styled.button<{ disabled?: boolean }>`
  padding: 6px 12px;
  border: 1px solid #E6EBF1;
  background: white;
  border-radius: 6px;
  font-size: 13px;
  color: #374151;
  cursor: ${p => (p.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${p => (p.disabled ? 0.5 : 1)};
  &:hover:not(:disabled) {
    border-color: #635BFF;
    color: #635BFF;
  }
`;

const ActionLink = styled.button<{ variant?: 'danger' }>`
  background: none;
  border: 1px solid ${p => (p.variant === 'danger' ? '#FCA5A5' : '#E6EBF1')};
  color: ${p => (p.variant === 'danger' ? '#DC2626' : '#374151')};
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.15s;
  &:hover {
    background: ${p => (p.variant === 'danger' ? '#FEF2F2' : '#F8FAFC')};
    border-color: ${p => (p.variant === 'danger' ? '#DC2626' : '#635BFF')};
    color: ${p => (p.variant === 'danger' ? '#B91C1C' : '#635BFF')};
  }
`;

// ----- Helpers -----

const STATUS_OPTIONS = [
  { value: 'active', label: 'Active', variant: 'success' as const },
  { value: 'trial', label: 'Trial', variant: 'info' as const },
  { value: 'inactive', label: 'Inactive', variant: 'default' as const },
  { value: 'suspended', label: 'Suspended', variant: 'warning' as const },
  { value: 'expired', label: 'Expired', variant: 'error' as const }
];

const statusVariant = (s: string): 'success' | 'warning' | 'error' | 'info' | 'default' => {
  const found = STATUS_OPTIONS.find(o => o.value === s);
  return found?.variant || 'default';
};

const blankNew = (): Partial<SupplierCompany> & { owner_user_id?: number | string } => ({
  name: '',
  status: 'active',
  is_demo: false,
  is_test: false
});

// ----- Component -----

const SupplierCompaniesPage: React.FC = () => {
  const { t } = useTranslation('admin');

  const [companies, setCompanies] = useState<SupplierCompany[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    page: 1,
    limit: 50,
    totalPages: 0
  });
  const [loading, setLoading] = useState(false);

  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [page, setPage] = useState(1);

  // Detail modal
  const [showDetail, setShowDetail] = useState(false);
  const [selected, setSelected] = useState<SupplierCompany | null>(null);

  // Edit modal
  const [showEdit, setShowEdit] = useState(false);
  const [editForm, setEditForm] = useState<Partial<SupplierCompany>>({});
  const [editId, setEditId] = useState<number | null>(null);

  // Create modal
  const [showCreate, setShowCreate] = useState(false);
  const [createForm, setCreateForm] = useState<ReturnType<typeof blankNew>>(blankNew());

  // Delete confirm
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  // Reference data
  const [supplierAdmins, setSupplierAdmins] = useState<UserOption[]>([]);
  const [supplierPlans, setSupplierPlans] = useState<PlanOption[]>([]);

  const fetchCompanies = useCallback(async () => {
    setLoading(true);
    try {
      const token = getAuthToken();
      const qs = new URLSearchParams();
      if (statusFilter) qs.set('status', statusFilter);
      if (search) qs.set('search', search);
      qs.set('page', String(page));
      qs.set('limit', '50');

      const res = await fetch(`/api/supplier-companies?${qs.toString()}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          setCompanies(Array.isArray(json.data) ? json.data : []);
          if (json.pagination) setPagination(json.pagination);
        }
      }
    } finally {
      setLoading(false);
    }
  }, [statusFilter, search, page]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  // Load reference data once
  useEffect(() => {
    const loadRefs = async () => {
      try {
        const token = getAuthToken();
        const [usersRes, plansRes] = await Promise.all([
          fetch('/api/users?role=Supplier Admin', { headers: { Authorization: `Bearer ${token}` } }),
          fetch('/api/plans?plan_target=supplier', { headers: { Authorization: `Bearer ${token}` } })
        ]);
        if (usersRes.ok) {
          const j = await usersRes.json();
          const list = j.data || j;
          if (Array.isArray(list)) setSupplierAdmins(list);
        }
        if (plansRes.ok) {
          const j = await plansRes.json();
          const list = j.data || j;
          if (Array.isArray(list)) setSupplierPlans(list);
        }
      } catch {
        // silent
      }
    };
    loadRefs();
  }, []);

  const openDetail = async (company: SupplierCompany) => {
    setSelected(company);
    setShowDetail(true);
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/supplier-companies/${company.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) setSelected(json.data);
      }
    } catch {
      // keep summary
    }
  };

  const openEdit = (company: SupplierCompany) => {
    setEditId(company.id);
    setEditForm({
      name: company.name,
      status: company.status,
      plan_id: company.plan_id ?? null,
      plan_amount: company.plan_amount,
      billing_cycle: company.billing_cycle,
      email: company.email,
      phone: company.phone,
      address: company.address,
      city: company.city,
      state: company.state,
      postal_code: company.postal_code,
      country: company.country,
      website: company.website,
      registration_no: company.registration_no,
      tax_no: company.tax_no,
      bank_name: company.bank_name,
      bank_account: company.bank_account,
      bank_account_name: company.bank_account_name,
      is_demo: !!company.is_demo,
      is_test: !!company.is_test
    });
    setShowEdit(true);
    setShowDetail(false);
  };

  const handleSaveEdit = async () => {
    if (!editId) return;
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/supplier-companies/${editId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(editForm)
      });
      if (res.ok) {
        setShowEdit(false);
        setEditId(null);
        setEditForm({});
        await fetchCompanies();
      }
    } catch {
      // silent
    }
  };

  const handleCreate = async () => {
    if (!createForm.name || !(createForm as any).owner_user_id) return;
    try {
      const token = getAuthToken();
      const res = await fetch('/api/supplier-companies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(createForm)
      });
      if (res.ok) {
        setShowCreate(false);
        setCreateForm(blankNew());
        await fetchCompanies();
      }
    } catch {
      // silent
    }
  };

  const handleDelete = async () => {
    if (!confirmDeleteId) return;
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/supplier-companies/${confirmDeleteId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setConfirmDeleteId(null);
        await fetchCompanies();
      }
    } catch {
      // silent
    }
  };

  const totalCount = pagination.total;
  const activeCount = companies.filter(c => c.status === 'active').length;
  const trialCount = companies.filter(c => c.status === 'trial').length;
  const inactiveCount = companies.filter(c => c.status === 'inactive' || c.status === 'suspended').length;

  return (
    <Container>
      <Header>
        <Title>{t('supplierCompanies.title', 'Supplier Companies')}</Title>
        <ActionSection>
          <Button variant="primary" onClick={() => { setCreateForm(blankNew()); setShowCreate(true); }}>
            Add Supplier
          </Button>
        </ActionSection>
      </Header>
      <Content>
        <StatsGrid>
          <StatCard color="#635BFF">
            <StatValue>{totalCount}</StatValue>
            <StatLabel>Total</StatLabel>
          </StatCard>
          <StatCard color="#059669">
            <StatValue>{activeCount}</StatValue>
            <StatLabel>Active</StatLabel>
          </StatCard>
          <StatCard color="#0284C7">
            <StatValue>{trialCount}</StatValue>
            <StatLabel>Trial</StatLabel>
          </StatCard>
          <StatCard color="#9CA3AF">
            <StatValue>{inactiveCount}</StatValue>
            <StatLabel>Inactive / Suspended</StatLabel>
          </StatCard>
        </StatsGrid>

        <FiltersContainer>
          <FilterSelect
            value={statusFilter}
            onChange={e => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All Status</option>
            {STATUS_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </FilterSelect>
          <SearchInput
            placeholder="Search by name, email, company..."
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                setSearch(searchInput);
                setPage(1);
              }
            }}
          />
          <Button
            variant="secondary"
            onClick={() => { setSearch(searchInput); setPage(1); }}
            style={{ padding: '8px 16px', fontSize: '13px' }}
          >
            Search
          </Button>
        </FiltersContainer>

        <DataTableContainer>
          <DataTable>
            <DataTableHead>
              <tr>
                <DataTableHeaderCell align="left">Name</DataTableHeaderCell>
                <DataTableHeaderCell align="left">Owner</DataTableHeaderCell>
                <DataTableHeaderCell align="left">Plan</DataTableHeaderCell>
                <DataTableHeaderCell align="center">Status</DataTableHeaderCell>
                <DataTableHeaderCell align="center">Products</DataTableHeaderCell>
                <DataTableHeaderCell align="center">Created</DataTableHeaderCell>
                <DataTableHeaderCell align="right">Actions</DataTableHeaderCell>
              </tr>
            </DataTableHead>
            <tbody>
              {companies.map(c => (
                <DataTableRow key={c.id} onClick={() => openDetail(c)} style={{ cursor: 'pointer' }}>
                  <DataTableCell data-label="Name">
                    <strong>{c.name}</strong>
                    {c.is_demo && (
                      <span style={{
                        marginLeft: 8,
                        background: '#FEF3C7',
                        color: '#D97706',
                        padding: '2px 6px',
                        borderRadius: 4,
                        fontSize: 11,
                        fontWeight: 600
                      }}>
                        DEMO
                      </span>
                    )}
                    {c.is_test && (
                      <span style={{
                        marginLeft: 8,
                        background: '#E0F2FE',
                        color: '#0284C7',
                        padding: '2px 6px',
                        borderRadius: 4,
                        fontSize: 11,
                        fontWeight: 600
                      }}>
                        TEST
                      </span>
                    )}
                  </DataTableCell>
                  <DataTableCell data-label="Owner">
                    {c.owner ? (
                      <div>
                        <div style={{ color: '#0A2540' }}>{c.owner.full_name || c.owner.email}</div>
                        <div style={{ fontSize: 12, color: '#6B7280' }}>{c.owner.email}</div>
                      </div>
                    ) : (
                      <span style={{ color: '#9CA3AF' }}>—</span>
                    )}
                  </DataTableCell>
                  <DataTableCell data-label="Plan">
                    {c.plan ? (c.plan.display_name || c.plan.name) : <span style={{ color: '#9CA3AF' }}>—</span>}
                  </DataTableCell>
                  <DataTableCell data-label="Status" align="center">
                    <DataTableStatus variant={statusVariant(c.status)}>
                      {STATUS_OPTIONS.find(o => o.value === c.status)?.label || c.status}
                    </DataTableStatus>
                  </DataTableCell>
                  <DataTableCell data-label="Products" align="center">
                    {c.product_count !== undefined ? c.product_count : '—'}
                  </DataTableCell>
                  <DataTableCell data-label="Created" align="center">
                    {c.created_at ? formatDate(c.created_at, null) : (c.createdAt ? formatDate(c.createdAt, null) : '—')}
                  </DataTableCell>
                  <DataTableCell data-label="Actions" align="right" mobileFullWidth>
                    <DataTableActions>
                      <ActionLink onClick={e => { e.stopPropagation(); openEdit(c); }}>
                        Edit
                      </ActionLink>
                      <ActionLink
                        variant="danger"
                        onClick={e => { e.stopPropagation(); setConfirmDeleteId(c.id); }}
                      >
                        Delete
                      </ActionLink>
                    </DataTableActions>
                  </DataTableCell>
                </DataTableRow>
              ))}
            </tbody>
          </DataTable>
          {companies.length === 0 && (
            <DataTableEmpty>
              {loading ? 'Loading...' : 'No supplier companies found.'}
            </DataTableEmpty>
          )}
        </DataTableContainer>

        {pagination.totalPages > 1 && (
          <PaginationBar>
            <span>
              Page {pagination.page} of {pagination.totalPages} ({pagination.total} total)
            </span>
            <div style={{ display: 'flex', gap: 8 }}>
              <PageBtn disabled={page <= 1} onClick={() => setPage(p => Math.max(1, p - 1))}>
                Previous
              </PageBtn>
              <PageBtn
                disabled={page >= pagination.totalPages}
                onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
              >
                Next
              </PageBtn>
            </div>
          </PaginationBar>
        )}

        {/* Detail Modal */}
        {showDetail && selected && (
          <CommonModal
            isOpen={true}
            onClose={() => { setShowDetail(false); setSelected(null); }}
            title={selected.name}
            size="large"
            footer={
              <>
                <ModalButton variant="primary" onClick={() => openEdit(selected)}>Edit</ModalButton>
              </>
            }
          >
            <Section>
              <SectionTitle>Status & Plan</SectionTitle>
              <DetailGrid>
                <DetailItem>
                  <DetailLabel>Status</DetailLabel>
                  <DetailValue>
                    <DataTableStatus variant={statusVariant(selected.status)}>
                      {STATUS_OPTIONS.find(o => o.value === selected.status)?.label || selected.status}
                    </DataTableStatus>
                  </DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Plan</DetailLabel>
                  <DetailValue>
                    {selected.plan ? (selected.plan.display_name || selected.plan.name) : '—'}
                  </DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Billing Cycle</DetailLabel>
                  <DetailValue>{selected.billing_cycle || '—'}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Plan Amount</DetailLabel>
                  <DetailValue>{selected.plan_amount ?? '—'}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Subscription Start</DetailLabel>
                  <DetailValue>
                    {selected.subscription_start ? formatDate(selected.subscription_start, null) : '—'}
                  </DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Subscription End</DetailLabel>
                  <DetailValue>
                    {selected.subscription_end ? formatDate(selected.subscription_end, null) : '—'}
                  </DetailValue>
                </DetailItem>
              </DetailGrid>
            </Section>

            <Section>
              <SectionTitle>Owner</SectionTitle>
              {selected.owner ? (
                <DetailGrid>
                  <DetailItem>
                    <DetailLabel>Name</DetailLabel>
                    <DetailValue>{selected.owner.full_name || '—'}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Email</DetailLabel>
                    <DetailValue>{selected.owner.email}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Role</DetailLabel>
                    <DetailValue>{selected.owner.role}</DetailValue>
                  </DetailItem>
                </DetailGrid>
              ) : (
                <div style={{ color: '#9CA3AF', fontSize: 14 }}>No owner assigned</div>
              )}
            </Section>

            <Section>
              <SectionTitle>Company Information</SectionTitle>
              <DetailGrid>
                <DetailItem>
                  <DetailLabel>Trade Name</DetailLabel>
                  <DetailValue>{selected.trade_name || selected.company_name || '—'}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Registration No</DetailLabel>
                  <DetailValue>{selected.registration_no || '—'}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Tax No</DetailLabel>
                  <DetailValue>{selected.tax_no || '—'}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Email</DetailLabel>
                  <DetailValue>{selected.email || '—'}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Phone</DetailLabel>
                  <DetailValue>{selected.phone || '—'}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Website</DetailLabel>
                  <DetailValue>{selected.website || '—'}</DetailValue>
                </DetailItem>
              </DetailGrid>
            </Section>

            <Section>
              <SectionTitle>Address</SectionTitle>
              <DetailGrid>
                <DetailItem>
                  <DetailLabel>Address</DetailLabel>
                  <DetailValue>{selected.address || '—'}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>City</DetailLabel>
                  <DetailValue>{selected.city || '—'}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>State</DetailLabel>
                  <DetailValue>{selected.state || '—'}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Postal Code</DetailLabel>
                  <DetailValue>{selected.postal_code || '—'}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Country</DetailLabel>
                  <DetailValue>{selected.country || '—'}</DetailValue>
                </DetailItem>
              </DetailGrid>
            </Section>
          </CommonModal>
        )}

        {/* Edit Modal */}
        {showEdit && (
          <CommonModal
            isOpen={true}
            onClose={() => { setShowEdit(false); setEditId(null); }}
            title="Edit Supplier"
            size="large"
            footer={
              <>
                <ModalButton onClick={() => { setShowEdit(false); setEditId(null); }}>Cancel</ModalButton>
                <ModalButton variant="primary" onClick={handleSaveEdit} disabled={!editForm.name}>
                  Save
                </ModalButton>
              </>
            }
          >
            <FormRow>
              <FormGroup>
                <FormLabel>Name *</FormLabel>
                <FormInput
                  value={editForm.name || ''}
                  onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Status</FormLabel>
                <FormSelect
                  value={editForm.status || 'active'}
                  onChange={e => setEditForm({ ...editForm, status: e.target.value })}
                >
                  {STATUS_OPTIONS.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </FormSelect>
              </FormGroup>
            </FormRow>
            <FormRow>
              <FormGroup>
                <FormLabel>Plan</FormLabel>
                <FormSelect
                  value={editForm.plan_id ?? ''}
                  onChange={e =>
                    setEditForm({
                      ...editForm,
                      plan_id: e.target.value ? Number(e.target.value) : null
                    })
                  }
                >
                  <option value="">— No plan —</option>
                  {supplierPlans.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.display_name || p.name}
                    </option>
                  ))}
                </FormSelect>
              </FormGroup>
              <FormGroup>
                <FormLabel>Billing Cycle</FormLabel>
                <FormSelect
                  value={editForm.billing_cycle || ''}
                  onChange={e => setEditForm({ ...editForm, billing_cycle: e.target.value })}
                >
                  <option value="">—</option>
                  <option value="monthly">Monthly</option>
                  <option value="annual">Annual</option>
                </FormSelect>
              </FormGroup>
            </FormRow>
            <FormRow>
              <FormGroup>
                <FormLabel>Email</FormLabel>
                <FormInput
                  type="email"
                  value={editForm.email || ''}
                  onChange={e => setEditForm({ ...editForm, email: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Phone</FormLabel>
                <FormInput
                  value={editForm.phone || ''}
                  onChange={e => setEditForm({ ...editForm, phone: e.target.value })}
                />
              </FormGroup>
            </FormRow>
            <FormRow>
              <FormGroup>
                <FormLabel>Registration No</FormLabel>
                <FormInput
                  value={editForm.registration_no || ''}
                  onChange={e => setEditForm({ ...editForm, registration_no: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Tax No</FormLabel>
                <FormInput
                  value={editForm.tax_no || ''}
                  onChange={e => setEditForm({ ...editForm, tax_no: e.target.value })}
                />
              </FormGroup>
            </FormRow>
            <FormGroup>
              <FormLabel>Address</FormLabel>
              <FormInput
                value={editForm.address || ''}
                onChange={e => setEditForm({ ...editForm, address: e.target.value })}
              />
            </FormGroup>
            <FormRow>
              <FormGroup>
                <FormLabel>City</FormLabel>
                <FormInput
                  value={editForm.city || ''}
                  onChange={e => setEditForm({ ...editForm, city: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>State</FormLabel>
                <FormInput
                  value={editForm.state || ''}
                  onChange={e => setEditForm({ ...editForm, state: e.target.value })}
                />
              </FormGroup>
            </FormRow>
            <FormRow>
              <FormGroup>
                <FormLabel>Postal Code</FormLabel>
                <FormInput
                  value={editForm.postal_code || ''}
                  onChange={e => setEditForm({ ...editForm, postal_code: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Country (ISO 3166-1 alpha-2)</FormLabel>
                <FormInput
                  maxLength={2}
                  value={editForm.country || ''}
                  onChange={e => setEditForm({ ...editForm, country: e.target.value.toUpperCase() })}
                />
              </FormGroup>
            </FormRow>
            <FormRow>
              <FormGroup>
                <Checkbox>
                  <input
                    type="checkbox"
                    checked={!!editForm.is_demo}
                    onChange={e => setEditForm({ ...editForm, is_demo: e.target.checked })}
                  />
                  Demo account
                </Checkbox>
              </FormGroup>
              <FormGroup>
                <Checkbox>
                  <input
                    type="checkbox"
                    checked={!!editForm.is_test}
                    onChange={e => setEditForm({ ...editForm, is_test: e.target.checked })}
                  />
                  Test account
                </Checkbox>
              </FormGroup>
            </FormRow>
          </CommonModal>
        )}

        {/* Create Modal */}
        {showCreate && (
          <CommonModal
            isOpen={true}
            onClose={() => setShowCreate(false)}
            title="Add Supplier Company"
            size="medium"
            footer={
              <>
                <ModalButton onClick={() => setShowCreate(false)}>Cancel</ModalButton>
                <ModalButton
                  variant="primary"
                  onClick={handleCreate}
                  disabled={!createForm.name || !(createForm as any).owner_user_id}
                >
                  Create
                </ModalButton>
              </>
            }
          >
            <FormGroup>
              <FormLabel>Name *</FormLabel>
              <FormInput
                value={createForm.name || ''}
                onChange={e => setCreateForm({ ...createForm, name: e.target.value })}
                placeholder="Company display name"
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Owner (Supplier Admin) *</FormLabel>
              <FormSelect
                value={(createForm as any).owner_user_id || ''}
                onChange={e =>
                  setCreateForm({ ...createForm, owner_user_id: e.target.value })
                }
              >
                <option value="">— Select owner —</option>
                {supplierAdmins.map(u => (
                  <option key={u.id} value={u.id}>
                    {(u.full_name ? `${u.full_name} ` : '')}({u.email})
                  </option>
                ))}
              </FormSelect>
              {supplierAdmins.length === 0 && (
                <div style={{ fontSize: 12, color: '#6B7280', marginTop: 6 }}>
                  No Supplier Admin users found. Create one in User Management first.
                </div>
              )}
            </FormGroup>
            <FormGroup>
              <FormLabel>Plan</FormLabel>
              <FormSelect
                value={createForm.plan_id ?? ''}
                onChange={e =>
                  setCreateForm({
                    ...createForm,
                    plan_id: e.target.value ? Number(e.target.value) : null
                  })
                }
              >
                <option value="">— No plan —</option>
                {supplierPlans.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.display_name || p.name}
                  </option>
                ))}
              </FormSelect>
            </FormGroup>
            <FormGroup>
              <FormLabel>Status</FormLabel>
              <FormSelect
                value={createForm.status || 'active'}
                onChange={e => setCreateForm({ ...createForm, status: e.target.value })}
              >
                {STATUS_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </FormSelect>
            </FormGroup>
            <FormGroup>
              <FormLabel>Description</FormLabel>
              <FormTextArea
                value={createForm.description || ''}
                onChange={e => setCreateForm({ ...createForm, description: e.target.value })}
                placeholder="Optional notes"
              />
            </FormGroup>
            <FormRow>
              <FormGroup>
                <Checkbox>
                  <input
                    type="checkbox"
                    checked={!!createForm.is_demo}
                    onChange={e => setCreateForm({ ...createForm, is_demo: e.target.checked })}
                  />
                  Demo account
                </Checkbox>
              </FormGroup>
              <FormGroup>
                <Checkbox>
                  <input
                    type="checkbox"
                    checked={!!createForm.is_test}
                    onChange={e => setCreateForm({ ...createForm, is_test: e.target.checked })}
                  />
                  Test account
                </Checkbox>
              </FormGroup>
            </FormRow>
          </CommonModal>
        )}

        {/* Delete Confirm Modal */}
        {confirmDeleteId !== null && (
          <CommonModal
            isOpen={true}
            onClose={() => setConfirmDeleteId(null)}
            title="Delete Supplier Company"
            size="small"
            footer={
              <>
                <ModalButton onClick={() => setConfirmDeleteId(null)}>Cancel</ModalButton>
                <ModalButton variant="danger" onClick={handleDelete}>Delete</ModalButton>
              </>
            }
          >
            <div style={{ color: '#374151', fontSize: 14, lineHeight: 1.5 }}>
              This will mark the supplier company as inactive and soft-delete it. The record can be restored from the database if needed. Continue?
            </div>
          </CommonModal>
        )}
      </Content>
    </Container>
  );
};

export default SupplierCompaniesPage;
