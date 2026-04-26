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
  FormTextArea
} from '../../components/UI';
import { getAuthToken } from '../../utils/auth';
import { formatDateTime } from '../../utils/timezone';

// ----- Types -----

interface PlanRef {
  id: number;
  name: string;
  display_name?: string;
}

interface UserRef {
  id: number;
  full_name?: string;
  email: string;
}

interface SupplierInvitation {
  id: number;
  email: string;
  supplier_name?: string | null;
  message?: string | null;
  status: 'pending' | 'used' | 'expired' | 'revoked';
  expires_at: string;
  created_at?: string;
  used_at?: string | null;
  inviter?: UserRef | null;
  usedBy?: UserRef | null;
  plan?: PlanRef | null;
  token?: string;
}

interface PlanOption {
  id: number;
  name: string;
  display_name?: string;
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

const ActionLink = styled.button<{ variant?: 'danger' | 'success' }>`
  background: none;
  border: 1px solid ${p =>
    p.variant === 'danger' ? '#FCA5A5' : p.variant === 'success' ? '#86EFAC' : '#E6EBF1'};
  color: ${p =>
    p.variant === 'danger' ? '#DC2626' : p.variant === 'success' ? '#059669' : '#374151'};
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.15s;
  &:hover {
    background: ${p =>
      p.variant === 'danger' ? '#FEF2F2' : p.variant === 'success' ? '#F0FDF4' : '#F8FAFC'};
  }
`;

const ResultBox = styled.div`
  background: #F0FDF4;
  border: 1px solid #BBF7D0;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
`;

const ResultRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  &:last-child { margin-bottom: 0; }
`;

const ResultLabel = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #166534;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  min-width: 80px;
`;

const ResultLink = styled.input`
  flex: 1;
  padding: 6px 10px;
  border: 1px solid #BBF7D0;
  border-radius: 6px;
  font-size: 13px;
  font-family: monospace;
  background: white;
  color: #374151;
`;

const InlineCopyBtn = styled.button<{ copied?: boolean }>`
  padding: 6px 12px;
  border: 1px solid ${p => (p.copied ? '#16A34A' : '#E6EBF1')};
  background: ${p => (p.copied ? '#16A34A' : 'white')};
  color: ${p => (p.copied ? 'white' : '#374151')};
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  &:hover {
    border-color: #635BFF;
    color: ${p => (p.copied ? 'white' : '#635BFF')};
  }
`;

// ----- Helpers -----

const STATUS_OPTIONS: Array<{
  value: SupplierInvitation['status'];
  label: string;
  variant: 'success' | 'warning' | 'error' | 'info' | 'default';
}> = [
  { value: 'pending', label: 'Pending', variant: 'warning' },
  { value: 'used', label: 'Used', variant: 'success' },
  { value: 'expired', label: 'Expired', variant: 'default' },
  { value: 'revoked', label: 'Revoked', variant: 'error' }
];

const statusVariant = (s: string) =>
  STATUS_OPTIONS.find(o => o.value === s)?.variant || 'default';

const buildLinkFromToken = (token: string) => {
  if (typeof window === 'undefined') return `?invitation=${token}`;
  return `${window.location.origin}/signup?invitation=${token}`;
};

// ----- Component -----

const SupplierInvitationsPage: React.FC = () => {
  const { t } = useTranslation('admin');

  const [invitations, setInvitations] = useState<SupplierInvitation[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('');

  const [showSend, setShowSend] = useState(false);
  const [sendForm, setSendForm] = useState<{
    email: string;
    supplier_name: string;
    plan_id: string;
    message: string;
  }>({
    email: '',
    supplier_name: '',
    plan_id: '',
    message: ''
  });
  const [lastResult, setLastResult] = useState<{ link: string; email: string } | null>(null);

  const [confirmRevokeId, setConfirmRevokeId] = useState<number | null>(null);

  const [supplierPlans, setSupplierPlans] = useState<PlanOption[]>([]);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const fetchInvitations = useCallback(async () => {
    setLoading(true);
    try {
      const token = getAuthToken();
      const qs = new URLSearchParams();
      if (statusFilter) qs.set('status', statusFilter);

      const res = await fetch(`/api/admin/supplier-invitations?${qs.toString()}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          setInvitations(Array.isArray(json.data) ? json.data : []);
        }
      }
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchInvitations();
  }, [fetchInvitations]);

  // Load supplier plans for dropdown
  useEffect(() => {
    const loadPlans = async () => {
      try {
        const token = getAuthToken();
        const res = await fetch('/api/plans?plan_target=supplier', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const json = await res.json();
          const list = json.data || json;
          if (Array.isArray(list)) setSupplierPlans(list);
        }
      } catch {
        // silent
      }
    };
    loadPlans();
  }, []);

  const handleSend = async () => {
    if (!sendForm.email) return;
    try {
      const token = getAuthToken();
      const body: any = {
        email: sendForm.email
      };
      if (sendForm.supplier_name) body.supplier_name = sendForm.supplier_name;
      if (sendForm.plan_id) body.plan_id = Number(sendForm.plan_id);
      if (sendForm.message) body.message = sendForm.message;

      const res = await fetch('/api/admin/supplier-invitations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setLastResult({
            link: json.data.link || buildLinkFromToken(json.data.token),
            email: json.data.email
          });
          // Clear form for next send but keep modal open so SA can copy link
          setSendForm({ email: '', supplier_name: '', plan_id: '', message: '' });
          await fetchInvitations();
        }
      }
    } catch {
      // silent
    }
  };

  const handleRevoke = async () => {
    if (!confirmRevokeId) return;
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/admin/supplier-invitations/${confirmRevokeId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setConfirmRevokeId(null);
        await fetchInvitations();
      }
    } catch {
      // silent
    }
  };

  const handleCopy = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      setTimeout(() => {
        setCopiedKey(prev => (prev === key ? null : prev));
      }, 2000);
    } catch {
      // fallback: textarea trick
      const ta = document.createElement('textarea');
      ta.value = value;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      try {
        document.execCommand('copy');
        setCopiedKey(key);
        setTimeout(() => {
          setCopiedKey(prev => (prev === key ? null : prev));
        }, 2000);
      } catch {
        // give up silently
      }
      document.body.removeChild(ta);
    }
  };

  const totalCount = invitations.length;
  const pendingCount = invitations.filter(i => i.status === 'pending').length;
  const usedCount = invitations.filter(i => i.status === 'used').length;
  const inactiveCount = invitations.filter(i => i.status === 'expired' || i.status === 'revoked').length;

  return (
    <Container>
      <Header>
        <Title>{t('supplierInvitations.title', 'Supplier Invitations')}</Title>
        <ActionSection>
          <Button
            variant="primary"
            onClick={() => {
              setSendForm({ email: '', supplier_name: '', plan_id: '', message: '' });
              setLastResult(null);
              setShowSend(true);
            }}
          >
            {t('supplierInvitations.send', 'Send Invitation')}
          </Button>
        </ActionSection>
      </Header>
      <Content>
        <StatsGrid>
          <StatCard color="#635BFF">
            <StatValue>{totalCount}</StatValue>
            <StatLabel>Total</StatLabel>
          </StatCard>
          <StatCard color="#D97706">
            <StatValue>{pendingCount}</StatValue>
            <StatLabel>Pending</StatLabel>
          </StatCard>
          <StatCard color="#059669">
            <StatValue>{usedCount}</StatValue>
            <StatLabel>Used</StatLabel>
          </StatCard>
          <StatCard color="#9CA3AF">
            <StatValue>{inactiveCount}</StatValue>
            <StatLabel>Expired / Revoked</StatLabel>
          </StatCard>
        </StatsGrid>

        <FiltersContainer>
          <FilterSelect
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            {STATUS_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </FilterSelect>
        </FiltersContainer>

        <DataTableContainer>
          <DataTable>
            <DataTableHead>
              <tr>
                <DataTableHeaderCell align="left">Email</DataTableHeaderCell>
                <DataTableHeaderCell align="left">Suggested Name</DataTableHeaderCell>
                <DataTableHeaderCell align="left">Inviter</DataTableHeaderCell>
                <DataTableHeaderCell align="left">Plan</DataTableHeaderCell>
                <DataTableHeaderCell align="center">Status</DataTableHeaderCell>
                <DataTableHeaderCell align="center">Expires</DataTableHeaderCell>
                <DataTableHeaderCell align="left">Used By</DataTableHeaderCell>
                <DataTableHeaderCell align="right">Actions</DataTableHeaderCell>
              </tr>
            </DataTableHead>
            <tbody>
              {invitations.map(inv => {
                const link = inv.token ? buildLinkFromToken(inv.token) : '';
                const copyKey = `link-${inv.id}`;
                const isCopied = copiedKey === copyKey;
                return (
                  <DataTableRow key={inv.id}>
                    <DataTableCell data-label="Email">
                      <strong>{inv.email}</strong>
                    </DataTableCell>
                    <DataTableCell data-label="Suggested Name">
                      {inv.supplier_name || <span style={{ color: '#9CA3AF' }}>—</span>}
                    </DataTableCell>
                    <DataTableCell data-label="Inviter">
                      {inv.inviter ? (inv.inviter.full_name || inv.inviter.email) : '—'}
                    </DataTableCell>
                    <DataTableCell data-label="Plan">
                      {inv.plan ? (inv.plan.display_name || inv.plan.name) : '—'}
                    </DataTableCell>
                    <DataTableCell data-label="Status" align="center">
                      <DataTableStatus variant={statusVariant(inv.status)}>
                        {STATUS_OPTIONS.find(o => o.value === inv.status)?.label || inv.status}
                      </DataTableStatus>
                    </DataTableCell>
                    <DataTableCell data-label="Expires" align="center">
                      {inv.expires_at ? formatDateTime(inv.expires_at, null) : '—'}
                    </DataTableCell>
                    <DataTableCell data-label="Used By">
                      {inv.usedBy ? (inv.usedBy.full_name || inv.usedBy.email) : '—'}
                    </DataTableCell>
                    <DataTableCell data-label="Actions" align="right" mobileFullWidth>
                      <DataTableActions>
                        {inv.status === 'pending' && link && (
                          <InlineCopyBtn
                            copied={isCopied}
                            onClick={() => handleCopy(copyKey, link)}
                          >
                            {isCopied ? 'Copied!' : 'Copy Link'}
                          </InlineCopyBtn>
                        )}
                        {inv.status === 'pending' && (
                          <ActionLink
                            variant="danger"
                            onClick={() => setConfirmRevokeId(inv.id)}
                          >
                            Revoke
                          </ActionLink>
                        )}
                      </DataTableActions>
                    </DataTableCell>
                  </DataTableRow>
                );
              })}
            </tbody>
          </DataTable>
          {invitations.length === 0 && (
            <DataTableEmpty>
              {loading ? 'Loading...' : 'No invitations yet.'}
            </DataTableEmpty>
          )}
        </DataTableContainer>

        {/* Send Modal */}
        {showSend && (
          <CommonModal
            isOpen={true}
            onClose={() => setShowSend(false)}
            title="Send Supplier Invitation"
            size="medium"
            footer={
              <>
                <ModalButton onClick={() => setShowSend(false)}>Close</ModalButton>
                <ModalButton
                  variant="primary"
                  onClick={handleSend}
                  disabled={!sendForm.email}
                >
                  Send Invitation
                </ModalButton>
              </>
            }
          >
            {lastResult && (
              <ResultBox>
                <div style={{ fontSize: 13, color: '#166534', fontWeight: 600, marginBottom: 8 }}>
                  Invitation sent to {lastResult.email}
                </div>
                <ResultRow>
                  <ResultLabel>Link</ResultLabel>
                  <ResultLink readOnly value={lastResult.link} onFocus={e => e.target.select()} />
                  <InlineCopyBtn
                    copied={copiedKey === 'lastResult'}
                    onClick={() => handleCopy('lastResult', lastResult.link)}
                  >
                    {copiedKey === 'lastResult' ? 'Copied!' : 'Copy'}
                  </InlineCopyBtn>
                </ResultRow>
              </ResultBox>
            )}

            <FormGroup>
              <FormLabel>{t('supplierInvitations.fields.email', 'Email')} *</FormLabel>
              <FormInput
                type="email"
                value={sendForm.email}
                onChange={e => setSendForm({ ...sendForm, email: e.target.value })}
                placeholder="supplier@example.com"
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>
                {t('supplierInvitations.fields.supplier_name', 'Suggested Company Name (optional)')}
              </FormLabel>
              <FormInput
                value={sendForm.supplier_name}
                onChange={e => setSendForm({ ...sendForm, supplier_name: e.target.value })}
                placeholder="ACME Suppliers Sdn Bhd"
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>
                {t('supplierInvitations.fields.plan', 'Default Plan (optional)')}
              </FormLabel>
              <FormSelect
                value={sendForm.plan_id}
                onChange={e => setSendForm({ ...sendForm, plan_id: e.target.value })}
              >
                <option value="">— No default plan —</option>
                {supplierPlans.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.display_name || p.name}
                  </option>
                ))}
              </FormSelect>
            </FormGroup>
            <FormGroup>
              <FormLabel>
                {t('supplierInvitations.fields.message', 'Personal Message (optional)')}
              </FormLabel>
              <FormTextArea
                value={sendForm.message}
                onChange={e => setSendForm({ ...sendForm, message: e.target.value })}
                placeholder="A short message that will appear in the email..."
              />
            </FormGroup>
          </CommonModal>
        )}

        {/* Revoke Confirm Modal */}
        {confirmRevokeId !== null && (
          <CommonModal
            isOpen={true}
            onClose={() => setConfirmRevokeId(null)}
            title="Revoke Invitation"
            size="small"
            footer={
              <>
                <ModalButton onClick={() => setConfirmRevokeId(null)}>Cancel</ModalButton>
                <ModalButton variant="danger" onClick={handleRevoke}>Revoke</ModalButton>
              </>
            }
          >
            <div style={{ color: '#374151', fontSize: 14, lineHeight: 1.5 }}>
              Revoking this invitation will prevent the recipient from using the link. This cannot be undone. Continue?
            </div>
          </CommonModal>
        )}
      </Content>
    </Container>
  );
};

export default SupplierInvitationsPage;
