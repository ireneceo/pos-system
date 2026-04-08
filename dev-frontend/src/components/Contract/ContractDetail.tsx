import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import ContractStageBar from './ContractStageBar';
import AutoSaveField from '../Common/AutoSaveField';
import CommentSection from '../Common/CommentSection';
import { useAuth } from '../../contexts/AuthContext';

interface ContractDetailProps {
  contractId: number;
  entityType: 'brand' | 'foodcourt';
  onBack: () => void;
}

// ============================================
// Styled Components (프로젝트 디자인 가이드 준수)
// ============================================

const DetailContainer = styled.div`
  width: 100%;
`;

const BackLink = styled.button`
  background: none;
  border: none;
  color: #635BFF;
  font-size: 14px;
  cursor: pointer;
  padding: 0;
  margin-bottom: 16px;
  &:hover { text-decoration: underline; }
`;

const DetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const DetailTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`;

const StageBadge = styled.span<{ bg: string; color: string }>`
  padding: 4px 14px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  color: ${p => p.color};
  background: ${p => p.bg};
`;

const Section = styled.div`
  background: #fff;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  padding: 24px 28px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const SectionTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 16px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #F3F4F6;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.label`
  font-size: 12px;
  font-weight: 500;
  color: #6B7C93;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  color: #0A2540;
  outline: none;
  box-sizing: border-box;
  &:focus { border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
  &:disabled { background: #F8FAFC; color: #6B7C93; }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  color: #0A2540;
  outline: none;
  resize: vertical;
  min-height: 60px;
  box-sizing: border-box;
  &:focus { border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  color: #0A2540;
  box-sizing: border-box;
  outline: none;
  &:focus { border-color: #635BFF; }
  &:disabled { background: #F8FAFC; }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 20px;
`;

const Btn = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: all 0.15s;

  background: ${p => p.variant === 'danger' ? '#DC2626' : p.variant === 'secondary' ? '#F3F4F6' : '#635BFF'};
  color: ${p => p.variant === 'secondary' ? '#0A2540' : '#fff'};

  &:hover { opacity: 0.9; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

const ErrorMsg = styled.div`
  color: #DC2626;
  font-size: 13px;
  margin-bottom: 12px;
  padding: 8px 12px;
  background: #FEE2E2;
  border-radius: 6px;
`;

const CheckItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid #F3F4F6;
  &:last-child { border-bottom: none; }
`;

const NoteItem = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid #F3F4F6;
  &:last-child { border-bottom: none; }
`;

const NoteText = styled.p`
  font-size: 14px;
  color: #0A2540;
  margin: 0 0 4px 0;
`;

const NoteMeta = styled.span`
  font-size: 12px;
  color: #6B7C93;
`;

const DocItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #F3F4F6;
  &:last-child { border-bottom: none; }
`;

const HistoryItem = styled.div`
  display: flex;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid #F3F4F6;
  &:last-child { border-bottom: none; }
`;

const HistoryDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #635BFF;
  margin-top: 6px;
  flex-shrink: 0;
`;

const HistoryText = styled.div`
  font-size: 13px;
  color: #0A2540;
`;

const HistoryDate = styled.div`
  font-size: 12px;
  color: #6B7C93;
  margin-top: 2px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  max-width: 440px;
  width: 90%;
  box-shadow: 0 20px 25px rgba(0,0,0,0.1);
`;

const STAGE_COLORS: Record<string, { bg: string; color: string }> = {
  proposal: { bg: '#DBEAFE', color: '#2563EB' },
  contracting: { bg: '#FEF3C7', color: '#D97706' },
  setup: { bg: '#FEF3C7', color: '#D97706' },
  active: { bg: '#ECFDF5', color: '#059669' },
  terminated: { bg: '#F3F4F6', color: '#6B7280' },
  renewed: { bg: '#EDE9FE', color: '#7C3AED' }
};

// ============================================
// Component
// ============================================

const ContractDetail: React.FC<ContractDetailProps> = ({ contractId, entityType, onBack }) => {
  const { t } = useTranslation('contract');
  const { user } = useAuth();
  const [contract, setContract] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<any>({});
  const [formError, setFormError] = useState<string | null>(null);
  const formRef = React.useRef<any>({});
  const [newNote, setNewNote] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [terminateModal, setTerminateModal] = useState(false);
  const [terminateReason, setTerminateReason] = useState('');
  const [restaurantSearch, setRestaurantSearch] = useState('');
  const [restaurantResults, setRestaurantResults] = useState<any[]>([]);
  const [searchingRestaurant, setSearchingRestaurant] = useState(false);
  const searchTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  const getToken = () => localStorage.getItem('auth_token');
  const headers = () => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` });

  const fetchContract = useCallback(async () => {
    try {
      const res = await fetch(`/api/contracts/${contractId}`, { headers: { Authorization: `Bearer ${getToken()}` } });
      const data = await res.json();
      if (data.success) {
        setContract(data.data);
        setForm(data.data);
        setFormError(null);
      }
    } catch {
      setFormError('Failed to load contract');
    } finally {
      setLoading(false);
    }
  }, [contractId]);

  useEffect(() => { fetchContract(); }, [fetchContract]);

  // Keep formRef in sync
  React.useEffect(() => { formRef.current = form; }, [form]);

  const handleAutoSave = async () => {
    setFormError(null);
    const res = await fetch(`/api/contracts/${contractId}`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify(formRef.current)
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || 'Save failed');
  };

  const handleStageTransition = async (nextStage: string) => {
    setFormError(null);
    try {
      const res = await fetch(`/api/contracts/${contractId}/stage`, {
        method: 'PUT',
        headers: headers(),
        body: JSON.stringify({ stage: nextStage })
      });
      const data = await res.json();
      if (data.success) {
        await fetchContract();
      } else {
        setFormError(data.message || 'Stage transition failed');
      }
    } catch {
      setFormError('Stage transition failed');
    }
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    try {
      await fetch(`/api/contracts/${contractId}/notes`, {
        method: 'POST', headers: headers(),
        body: JSON.stringify({ content: newNote })
      });
      setNewNote('');
      await fetchContract();
    } catch {}
  };

  const handleAddTask = async () => {
    if (!newTaskTitle.trim()) return;
    try {
      await fetch(`/api/contracts/${contractId}/tasks`, {
        method: 'POST', headers: headers(),
        body: JSON.stringify({ title: newTaskTitle })
      });
      setNewTaskTitle('');
      await fetchContract();
    } catch {}
  };

  const handleToggleTask = async (taskId: number, isCompleted: boolean) => {
    try {
      await fetch(`/api/contracts/${contractId}/tasks/${taskId}`, {
        method: 'PUT', headers: headers(),
        body: JSON.stringify({ is_completed: !isCompleted })
      });
      await fetchContract();
    } catch {}
  };

  const handleTerminate = async () => {
    if (!terminateReason.trim()) return;
    setFormError(null);
    try {
      const res = await fetch(`/api/contracts/${contractId}/terminate`, {
        method: 'POST', headers: headers(),
        body: JSON.stringify({ termination_reason: terminateReason })
      });
      const data = await res.json();
      if (data.success) {
        setTerminateModal(false);
        setTerminateReason('');
        await fetchContract();
      } else {
        setFormError(data.message || 'Termination failed');
      }
    } catch {
      setFormError('Termination failed');
    }
  };

  const handleRenew = async () => {
    setFormError(null);
    try {
      const res = await fetch(`/api/contracts/${contractId}/renew`, {
        method: 'POST', headers: headers(),
        body: JSON.stringify({ terms_changed: false })
      });
      const data = await res.json();
      if (data.success) {
        await fetchContract();
      } else {
        setFormError(data.message || 'Renewal failed');
      }
    } catch {
      setFormError('Renewal failed');
    }
  };

  const handleRestaurantSearch = (term: string) => {
    setRestaurantSearch(term);
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    if (term.length < 2) { setRestaurantResults([]); return; }
    setSearchingRestaurant(true);
    searchTimerRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/restaurants?search=${encodeURIComponent(term)}`, {
          headers: { Authorization: `Bearer ${getToken()}` }
        });
        const data = await res.json();
        const list = Array.isArray(data) ? data : (data.data?.restaurants || data.data || []);
        setRestaurantResults(Array.isArray(list) ? list.slice(0, 10) : []);
      } catch { setRestaurantResults([]); }
      setSearchingRestaurant(false);
    }, 300);
  };

  const handleLinkRestaurant = async (restaurantId: number) => {
    try {
      const res = await fetch(`/api/contracts/${contractId}`, {
        method: 'PUT', headers: headers(),
        body: JSON.stringify({ restaurant_id: restaurantId })
      });
      const data = await res.json();
      if (data.success) {
        setRestaurantSearch('');
        setRestaurantResults([]);
        await fetchContract();
      } else {
        setFormError(data.message || 'Failed to link restaurant');
      }
    } catch { setFormError('Failed to link restaurant'); }
  };

  const handleUnlinkRestaurant = async () => {
    try {
      const res = await fetch(`/api/contracts/${contractId}`, {
        method: 'PUT', headers: headers(),
        body: JSON.stringify({ restaurant_id: null })
      });
      const data = await res.json();
      if (data.success) await fetchContract();
    } catch {}
  };

  const updateField = (field: string, value: any) => {
    setForm((prev: any) => ({ ...prev, [field]: value }));
  };

  const updateFinancialTerm = (key: string, value: any) => {
    setForm((prev: any) => ({
      ...prev,
      financial_terms: { ...prev.financial_terms, [key]: value }
    }));
  };

  if (loading) return <DetailContainer><div style={{ padding: '40px', textAlign: 'center', color: '#6B7C93' }}>Loading...</div></DetailContainer>;
  if (!contract) return <DetailContainer><div style={{ padding: '40px', textAlign: 'center', color: '#6B7C93' }}>Contract not found</div></DetailContainer>;

  const badge = STAGE_COLORS[contract.stage] || { color: '#6B7280', bg: '#F3F4F6' };
  const isEditable = ['proposal', 'contracting', 'setup'].includes(contract.stage);

  const nextStageMap: Record<string, string> = {
    proposal: 'contracting',
    contracting: 'setup',
    setup: 'active'
  };
  const nextStage = nextStageMap[contract.stage];

  const nextStageLabels: Record<string, string> = {
    contracting: t('detail.proceedToContracting', 'Proceed to Contracting'),
    setup: t('detail.proceedToSetup', 'Proceed to Setup'),
    active: t('detail.startOperations', 'Start Operations')
  };

  const formatHistoryAction = (action: string) => {
    const map: Record<string, string> = {
      created: 'Created',
      stage_changed: 'Stage changed',
      terms_updated: 'Terms updated',
      document_uploaded: 'Document uploaded',
      task_completed: 'Task completed',
      restaurant_linked: 'Restaurant linked',
      plan_assigned: 'Plan assigned',
      terminated: 'Terminated',
      renewed: 'Renewed'
    };
    return map[action] || action;
  };

  return (
    <DetailContainer>
      <BackLink onClick={onBack}>&larr; {t('detail.backToList', 'Back to list')}</BackLink>

      <DetailHeader>
        <DetailTitle>{contract.restaurant?.name || contract.applicant_name}</DetailTitle>
        <StageBadge bg={badge.bg} color={badge.color}>{contract.stage}</StageBadge>
      </DetailHeader>

      {!['terminated', 'renewed', 'expired'].includes(contract.stage) && (
        <ContractStageBar currentStage={contract.stage} />
      )}

      {formError && <ErrorMsg>{formError}</ErrorMsg>}

      {/* Applicant Information */}
      <Section>
        <SectionTitle>{t('detail.applicantInfo', 'Applicant Information')}</SectionTitle>
        <FormGrid>
          <FormGroup>
            <Label>{t('detail.name', 'Name')}</Label>
            <AutoSaveField onSave={handleAutoSave}>
              <Input value={form.applicant_name || ''} onChange={e => updateField('applicant_name', e.target.value)} disabled={!isEditable} />
            </AutoSaveField>
          </FormGroup>
          <FormGroup>
            <Label>{t('detail.email', 'Email')}</Label>
            <AutoSaveField onSave={handleAutoSave}>
              <Input value={form.applicant_email || ''} onChange={e => updateField('applicant_email', e.target.value)} disabled={!isEditable} />
            </AutoSaveField>
          </FormGroup>
          <FormGroup>
            <Label>{t('detail.phone', 'Phone')}</Label>
            <AutoSaveField onSave={handleAutoSave}>
              <Input value={form.applicant_phone || ''} onChange={e => updateField('applicant_phone', e.target.value)} disabled={!isEditable} />
            </AutoSaveField>
          </FormGroup>
          <FormGroup>
            <Label>{t('detail.businessType', 'Business Type')}</Label>
            <AutoSaveField onSave={handleAutoSave}>
              <Input value={form.applicant_business_type || ''} onChange={e => updateField('applicant_business_type', e.target.value)} disabled={!isEditable} />
            </AutoSaveField>
          </FormGroup>
          <FormGroup>
            <Label>{entityType === 'brand' ? t('detail.location', 'Location') : t('detail.preferredUnit', 'Preferred Unit')}</Label>
            <AutoSaveField onSave={handleAutoSave}>
              <Input value={form.applicant_location || ''} onChange={e => updateField('applicant_location', e.target.value)} disabled={!isEditable} />
            </AutoSaveField>
          </FormGroup>
        </FormGrid>
      </Section>

      {/* Link Restaurant */}
      <Section>
        <SectionTitle>{t('detail.linkRestaurant', 'Link Restaurant')}</SectionTitle>
        {contract.restaurant ? (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: '#F0FDF4', borderRadius: '8px', border: '1px solid #BBF7D0' }}>
            <div>
              <div style={{ fontWeight: 600, color: '#0A2540', fontSize: '15px' }}>{contract.restaurant.name}</div>
              {contract.restaurant.address && <div style={{ fontSize: '13px', color: '#6B7C93', marginTop: '2px' }}>{contract.restaurant.address}</div>}
              {contract.restaurant.phone && <div style={{ fontSize: '13px', color: '#6B7C93' }}>{contract.restaurant.phone}</div>}
            </div>
            {isEditable && (
              <Btn variant="secondary" onClick={handleUnlinkRestaurant} style={{ fontSize: '12px', padding: '6px 12px' }}>
                {t('detail.unlink', 'Unlink')}
              </Btn>
            )}
          </div>
        ) : (
          <div>
            <div style={{ position: 'relative' }}>
              <Input
                value={restaurantSearch}
                onChange={e => handleRestaurantSearch(e.target.value)}
                placeholder={t('detail.searchRestaurant', 'Search restaurant by name...')}
                disabled={!isEditable}
              />
              {searchingRestaurant && <div style={{ fontSize: '12px', color: '#6B7C93', marginTop: '4px' }}>Searching...</div>}
              {restaurantResults.length > 0 && (
                <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#fff', border: '1px solid #E6EBF1', borderRadius: '8px', marginTop: '4px', maxHeight: '200px', overflowY: 'auto', zIndex: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                  {restaurantResults.map((r: any) => (
                    <div key={r.id} onClick={() => handleLinkRestaurant(r.id)}
                      style={{ padding: '10px 14px', cursor: 'pointer', borderBottom: '1px solid #F3F4F6', fontSize: '14px' }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#F8FAFC')}
                      onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
                    >
                      <div style={{ fontWeight: 500, color: '#0A2540' }}>{r.name}</div>
                      {r.address && <div style={{ fontSize: '12px', color: '#6B7C93' }}>{r.address}</div>}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '6px' }}>
              {t('detail.restaurantHint', 'Link an existing restaurant or leave empty to connect later. Restaurant is required before Active stage.')}
            </div>
          </div>
        )}
      </Section>

      {/* Contract Info */}
      {['contracting', 'setup', 'active', 'terminated', 'renewed'].includes(contract.stage) && (
        <Section>
          <SectionTitle>{t('detail.contractInfo', 'Contract Information')}</SectionTitle>
          <FormGrid>
            <FormGroup>
              <Label>{t('detail.contractNumber', 'Contract Number')}</Label>
              <AutoSaveField onSave={handleAutoSave}>
                <Input value={form.contract_number || ''} onChange={e => updateField('contract_number', e.target.value)} disabled={!isEditable} />
              </AutoSaveField>
            </FormGroup>
            <FormGroup>
              <Label>{t('detail.contractType', 'Contract Type')}</Label>
              <AutoSaveField onSave={handleAutoSave} type="select" debounceMs={300}>
                <Select value={form.contract_type || ''} onChange={e => updateField('contract_type', e.target.value)} disabled={!isEditable}>
                  <option value="">{t('detail.select', 'Select...')}</option>
                  {entityType === 'brand' ? (
                    <>
                      <option value="franchise">Franchise</option>
                      <option value="license">License</option>
                      <option value="master">Master</option>
                      <option value="direct">Direct</option>
                    </>
                  ) : (
                    <>
                      <option value="standard">Standard Lease</option>
                      <option value="revenue_share">Revenue Share</option>
                      <option value="popup">Pop-up</option>
                    </>
                  )}
                </Select>
              </AutoSaveField>
            </FormGroup>
            <FormGroup>
              <Label>{t('detail.startDate', 'Start Date')}</Label>
              <AutoSaveField onSave={handleAutoSave} debounceMs={300}>
                <Input type="date" value={form.start_date || ''} onChange={e => updateField('start_date', e.target.value)} disabled={!isEditable} />
              </AutoSaveField>
            </FormGroup>
            <FormGroup>
              <Label>{t('detail.endDate', 'End Date')}</Label>
              <AutoSaveField onSave={handleAutoSave} debounceMs={300}>
                <Input type="date" value={form.end_date || ''} onChange={e => updateField('end_date', e.target.value)} disabled={!isEditable} />
              </AutoSaveField>
            </FormGroup>
            <FormGroup>
              <Label>{t('detail.durationMonths', 'Duration (months)')}</Label>
              <AutoSaveField onSave={handleAutoSave}>
                <Input type="number" value={form.duration_months || ''} onChange={e => updateField('duration_months', parseInt(e.target.value) || null)} disabled={!isEditable} />
              </AutoSaveField>
            </FormGroup>
            <FormGroup>
              <Label>{t('detail.signingDate', 'Signing Date')}</Label>
              <AutoSaveField onSave={handleAutoSave} debounceMs={300}>
                <Input type="date" value={form.signing_date || ''} onChange={e => updateField('signing_date', e.target.value)} disabled={!isEditable} />
              </AutoSaveField>
            </FormGroup>
          </FormGrid>
        </Section>
      )}

      {/* Financial Terms */}
      <Section>
        <SectionTitle>{entityType === 'brand' ? t('detail.franchiseTerms', 'Franchise Terms') : t('detail.tenancyTerms', 'Tenancy Terms')}</SectionTitle>
        <FormGrid>
          {entityType === 'brand' ? (
            <>
              <FormGroup>
                <Label>{t('detail.franchiseFee', 'Franchise Fee')}</Label>
                <AutoSaveField onSave={handleAutoSave}>
                  <Input type="number" value={form.financial_terms?.franchise_fee || ''} onChange={e => updateFinancialTerm('franchise_fee', e.target.value)} disabled={!isEditable} />
                </AutoSaveField>
              </FormGroup>
              <FormGroup>
                <Label>{t('detail.royaltyPercent', 'Royalty (%)')}</Label>
                <AutoSaveField onSave={handleAutoSave}>
                  <Input type="number" value={form.financial_terms?.royalty_value || ''} onChange={e => updateFinancialTerm('royalty_value', e.target.value)} disabled={!isEditable} />
                </AutoSaveField>
              </FormGroup>
              <FormGroup>
                <Label>{t('detail.marketingFundPercent', 'Marketing Fund (%)')}</Label>
                <AutoSaveField onSave={handleAutoSave}>
                  <Input type="number" value={form.financial_terms?.marketing_fund_value || ''} onChange={e => updateFinancialTerm('marketing_fund_value', e.target.value)} disabled={!isEditable} />
                </AutoSaveField>
              </FormGroup>
              <FormGroup>
                <Label>{t('detail.securityDeposit', 'Security Deposit')}</Label>
                <AutoSaveField onSave={handleAutoSave}>
                  <Input type="number" value={form.financial_terms?.security_deposit || ''} onChange={e => updateFinancialTerm('security_deposit', e.target.value)} disabled={!isEditable} />
                </AutoSaveField>
              </FormGroup>
              <FormGroup>
                <Label>{t('detail.territory', 'Territory')}</Label>
                <AutoSaveField onSave={handleAutoSave}>
                  <Input value={form.financial_terms?.territory || ''} onChange={e => updateFinancialTerm('territory', e.target.value)} disabled={!isEditable} />
                </AutoSaveField>
              </FormGroup>
            </>
          ) : (
            <>
              <FormGroup>
                <Label>{t('detail.baseRent', 'Base Rent (monthly)')}</Label>
                <AutoSaveField onSave={handleAutoSave}>
                  <Input type="number" value={form.financial_terms?.base_rent || ''} onChange={e => updateFinancialTerm('base_rent', e.target.value)} disabled={!isEditable} />
                </AutoSaveField>
              </FormGroup>
              <FormGroup>
                <Label>{t('detail.revenueSharePercent', 'Revenue Share (%)')}</Label>
                <AutoSaveField onSave={handleAutoSave}>
                  <Input type="number" value={form.financial_terms?.revenue_share_percent || ''} onChange={e => updateFinancialTerm('revenue_share_percent', e.target.value)} disabled={!isEditable} />
                </AutoSaveField>
              </FormGroup>
              <FormGroup>
                <Label>{t('detail.minGuarantee', 'Min Guarantee')}</Label>
                <AutoSaveField onSave={handleAutoSave}>
                  <Input type="number" value={form.financial_terms?.min_guarantee || ''} onChange={e => updateFinancialTerm('min_guarantee', e.target.value)} disabled={!isEditable} />
                </AutoSaveField>
              </FormGroup>
              <FormGroup>
                <Label>{t('detail.maintenanceFee', 'Maintenance Fee (monthly)')}</Label>
                <AutoSaveField onSave={handleAutoSave}>
                  <Input type="number" value={form.financial_terms?.maintenance_fee || ''} onChange={e => updateFinancialTerm('maintenance_fee', e.target.value)} disabled={!isEditable} />
                </AutoSaveField>
              </FormGroup>
              <FormGroup>
                <Label>{t('detail.securityDeposit', 'Security Deposit')}</Label>
                <AutoSaveField onSave={handleAutoSave}>
                  <Input type="number" value={form.financial_terms?.security_deposit || ''} onChange={e => updateFinancialTerm('security_deposit', e.target.value)} disabled={!isEditable} />
                </AutoSaveField>
              </FormGroup>
              <FormGroup>
                <Label>{t('detail.operatingHours', 'Operating Hours')}</Label>
                <AutoSaveField onSave={handleAutoSave}>
                  <Input value={form.financial_terms?.operating_hours || ''} onChange={e => updateFinancialTerm('operating_hours', e.target.value)} disabled={!isEditable} />
                </AutoSaveField>
              </FormGroup>
            </>
          )}
        </FormGrid>
      </Section>

      {/* Setup Checklist */}
      {['setup', 'active'].includes(contract.stage) && (
        <Section>
          <SectionTitle>{t('detail.setupChecklist', 'Setup Checklist')}</SectionTitle>
          {contract.tasks?.map((task: any) => (
            <CheckItem key={task.id}>
              <input
                type="checkbox"
                checked={task.is_completed}
                onChange={() => handleToggleTask(task.id, task.is_completed)}
                disabled={contract.stage === 'active'}
                style={{ width: 16, height: 16 }}
              />
              <span style={{
                textDecoration: task.is_completed ? 'line-through' : 'none',
                color: task.is_completed ? '#6B7C93' : '#0A2540',
                fontSize: '14px', flex: 1
              }}>
                {task.title}
              </span>
              {task.completed_at && <NoteMeta>{new Date(task.completed_at).toLocaleDateString()}</NoteMeta>}
            </CheckItem>
          ))}
          {contract.stage === 'setup' && (
            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
              <Input
                value={newTaskTitle}
                onChange={e => setNewTaskTitle(e.target.value)}
                placeholder={t('detail.addTask', 'Add task...')}
                onKeyDown={e => e.key === 'Enter' && handleAddTask()}
                style={{ flex: 1 }}
              />
              <Btn variant="secondary" onClick={handleAddTask} style={{ padding: '8px 16px' }}>+</Btn>
            </div>
          )}
        </Section>
      )}

      {/* Documents */}
      <Section>
        <SectionTitle>{t('detail.documents', 'Documents')}</SectionTitle>
        {isEditable && (
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', border: '1px solid #E6EBF1', borderRadius: '6px', fontSize: '14px', fontWeight: 500, color: '#374151', cursor: 'pointer', transition: 'all 0.15s' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              {t('detail.uploadDocument', 'Upload Document')}
              <input type="file" style={{ display: 'none' }} accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xls,.xlsx"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const formData = new FormData();
                  formData.append('files', file);
                  try {
                    const uploadRes = await fetch('/api/upload/files', {
                      method: 'POST',
                      headers: { Authorization: `Bearer ${getToken()}` },
                      body: formData
                    });
                    const uploadData = await uploadRes.json();
                    if (uploadData.success && uploadData.data?.[0]?.url) {
                      await fetch(`/api/contracts/${contractId}/documents`, {
                        method: 'POST', headers: headers(),
                        body: JSON.stringify({
                          file_name: file.name,
                          file_url: uploadData.data[0].url,
                          file_size: file.size,
                          file_type: file.type,
                          document_type: 'contract'
                        })
                      });
                      await fetchContract();
                    } else {
                      setFormError(uploadData.message || 'Upload failed');
                    }
                  } catch { setFormError('Upload failed'); }
                  e.target.value = '';
                }}
              />
            </label>
            <span style={{ fontSize: '12px', color: '#9CA3AF', marginLeft: '8px' }}>PDF, DOC, JPG, PNG, XLS (max 10MB)</span>
          </div>
        )}
        {contract.documents && contract.documents.length > 0 ? (
          contract.documents.map((doc: any) => (
            <DocItem key={doc.id}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7C93" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                <a href={doc.file_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '14px', color: '#635BFF', textDecoration: 'none', fontWeight: 500 }}>
                  {doc.file_name}
                </a>
                <NoteMeta>{doc.file_size ? `${(doc.file_size / 1024).toFixed(0)}KB` : ''}</NoteMeta>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <NoteMeta>{new Date(doc.createdAt || doc.created_at).toLocaleDateString()}</NoteMeta>
                {isEditable && (
                  <button onClick={async () => {
                    await fetch(`/api/contracts/${contractId}/documents/${doc.id}`, { method: 'DELETE', headers: headers() });
                    await fetchContract();
                  }} style={{ background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer', fontSize: '14px', padding: '2px 6px' }}>✕</button>
                )}
              </div>
            </DocItem>
          ))
        ) : (
          <div style={{ fontSize: '13px', color: '#9CA3AF', textAlign: 'center', padding: '16px' }}>
            {t('detail.noDocuments', 'No documents uploaded yet')}
          </div>
        )}
      </Section>

      {/* Comments (replaces Notes) */}
      <Section>
        <SectionTitle>{t('detail.notesComments', 'Notes & Comments')}</SectionTitle>
        <CommentSection
          entityType="contract"
          entityId={String(contractId)}
          currentUserId={user?.id}
        />
      </Section>

      {/* History Timeline */}
      {contract.history && contract.history.length > 0 && (
        <Section>
          <SectionTitle>History</SectionTitle>
          {contract.history.map((h: any) => (
            <HistoryItem key={h.id}>
              <HistoryDot />
              <div>
                <HistoryText>
                  {formatHistoryAction(h.action)}
                  {h.from_value && h.to_value ? `: ${h.from_value} → ${h.to_value}` : h.to_value ? `: ${h.to_value}` : ''}
                </HistoryText>
                <HistoryDate>
                  {h.changedByUser?.full_name} &middot; {new Date(h.createdAt || h.created_at).toLocaleDateString()}
                </HistoryDate>
              </div>
            </HistoryItem>
          ))}
        </Section>
      )}

      {/* Action Buttons */}
      <ButtonRow>
        {nextStage && (
          <Btn variant="primary" onClick={() => handleStageTransition(nextStage)}>
            {nextStageLabels[nextStage]} &rarr;
          </Btn>
        )}
        {contract.stage === 'active' && (
          <>
            <Btn variant="primary" onClick={handleRenew}>{t('detail.renewContract', 'Renew Contract')}</Btn>
            <Btn variant="danger" onClick={() => setTerminateModal(true)}>{t('detail.terminateContract', 'Terminate Contract')}</Btn>
          </>
        )}
      </ButtonRow>

      {/* Terminate Modal */}
      {terminateModal && (
        <ModalOverlay onClick={() => { setTerminateModal(false); setTerminateReason(''); }}>
          <ModalBox onClick={e => e.stopPropagation()}>
            <SectionTitle style={{ borderBottom: 'none', marginBottom: '8px' }}>{t('detail.terminateContract', 'Terminate Contract')}</SectionTitle>
            <p style={{ fontSize: '14px', color: '#6B7C93', marginBottom: '12px' }}>{t('detail.terminationReasonPrompt', 'Enter termination reason:')}</p>
            <TextArea
              value={terminateReason}
              onChange={e => setTerminateReason(e.target.value)}
              placeholder="Reason..."
              style={{ width: '100%', marginBottom: '16px' }}
            />
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <Btn variant="secondary" onClick={() => { setTerminateModal(false); setTerminateReason(''); }}>Cancel</Btn>
              <Btn variant="danger" onClick={handleTerminate} disabled={!terminateReason.trim()}>Terminate</Btn>
            </div>
          </ModalBox>
        </ModalOverlay>
      )}
    </DetailContainer>
  );
};

export default ContractDetail;
