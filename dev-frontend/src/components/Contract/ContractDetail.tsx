import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import ContractStageBar from './ContractStageBar';
import LinkedPlansSection from './LinkedPlansSection';
import AutoSaveField from '../Common/AutoSaveField';
import CommentSection from '../Common/CommentSection';
import DateField from '../Common/DateField';
import DateRangeField from '../Common/DateRangeField';
import { FormAccordion, FormAccordionSection } from '../UI/FormAccordion';
import BankInfoField from './BankInfoField';
import RepresentativeField from './RepresentativeField';
import SyncMasterToggle from './SyncMasterToggle';
import RentScheduleEditor from './RentScheduleEditor';
import PercentageRentField from './PercentageRentField';
import ConditionListEditor from './ConditionListEditor';
import SupportServicesChecklist from './SupportServicesChecklist';
import LegalTermsEditor from './LegalTermsEditor';
import { useAuth } from '../../contexts/AuthContext';
import { useAllowedRoutes } from '../../hooks/useAllowedRoutes';

import { getAuthToken } from '../../utils/auth';
import { formatDate as tzFormatDate } from '../../utils/timezone';
import { getCurrencySymbol } from '../../utils/currency';
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

  .field-shell {
    scroll-margin-top: 80px;
  }
  .field-shell.field-error input,
  .field-shell.field-error select,
  .field-shell.field-error textarea {
    border-color: #DC2626;
    box-shadow: 0 0 0 1px #DC2626;
  }
  .field-shell.field-error .field-error-msg {
    display: block;
  }
  .field-shell .field-error-msg {
    display: none;
    color: #DC2626;
    font-size: 12px;
    margin-top: 4px;
  }
  .field-shell.field-highlight {
    animation: purpleFieldPulse 1.2s ease-out 2;
    border-radius: 6px;
  }
  @keyframes purpleFieldPulse {
    0%   { box-shadow: 0 0 0 0 rgba(99, 91, 255, 0.45); }
    70%  { box-shadow: 0 0 0 10px rgba(99, 91, 255, 0); }
    100% { box-shadow: 0 0 0 0 rgba(99, 91, 255, 0); }
  }
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
  gap: 16px;
  margin-bottom: 8px;
  flex-wrap: wrap;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
  margin-left: auto;
`;

const RequiredBanner = styled.div`
  background: #FEF3C7;
  border: 1px solid #FCD34D;
  border-radius: 8px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 16px;
`;

const RequiredIcon = styled.span`
  font-size: 16px;
  color: #B45309;
`;

const RequiredText = styled.span`
  font-size: 14px;
  color: #78350F;
  font-weight: 600;
`;

const RequiredChips = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-left: auto;
`;

const RequiredChip = styled.button`
  background: #fff;
  border: 1px solid #FCD34D;
  color: #92400E;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: #FEF3C7;
    border-color: #D97706;
  }
`;

const ReadyBanner = styled.div`
  background: #D1FAE5;
  border: 1px solid #6EE7B7;
  border-radius: 8px;
  padding: 10px 16px;
  color: #065F46;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 16px;
`;

const ExpiryBanner = styled.div<{ urgent: boolean }>`
  background: ${p => p.urgent ? '#FEE2E2' : '#FEF3C7'};
  border: 1px solid ${p => p.urgent ? '#FECACA' : '#FCD34D'};
  border-left: 4px solid ${p => p.urgent ? '#DC2626' : '#F59E0B'};
  border-radius: 8px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 16px;
`;

const ExpiryIcon = styled.span`
  font-size: 16px;
`;

const ExpiryText = styled.span`
  flex: 1;
  font-size: 14px;
  color: #1F2937;
`;

const ExpiryActions = styled.div`
  display: flex;
  gap: 8px;
  margin-left: auto;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
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
  border: 1px solid #C7CED6;
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
  border-bottom: 1px solid #F1F4F8;
`;

const RequiredHint = styled.div`
  font-size: 12px;
  color: #4B5563;
  background: #FEF3C7;
  border: 1px solid #FDE68A;
  border-radius: 6px;
  padding: 8px 12px;
  margin-bottom: 16px;
  &::before {
    content: '* ';
    color: #DC2626;
    font-weight: 700;
  }
`;

const SubsectionTitle = styled.h4`
  font-size: 12px;
  font-weight: 600;
  color: #635BFF;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin: 20px 0 12px 0;
  &:first-of-type { margin-top: 0; }
`;

const CheckboxInline = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #0A2540;
  padding: 10px 12px;
  background: #F1F4F8;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  cursor: pointer;
  user-select: none;
  width: fit-content;
  &:hover { border-color: #C7D2FE; }
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

const Label = styled.label<{ required?: boolean }>`
  font-size: 12px;
  font-weight: 500;
  color: #4B5563;
  ${p => p.required && `
    &::after {
      content: ' *';
      color: #DC2626;
      font-weight: 700;
    }
  `}
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  font-size: 14px;
  color: #0A2540;
  outline: none;
  box-sizing: border-box;
  &:focus { border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
  &:disabled { background: #F1F4F8; color: #4B5563; }
`;

const CurrencyInputWrapper = styled.div`
  display: flex;
  align-items: stretch;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  background: #FFFFFF;
  overflow: hidden;
  transition: border-color 0.15s, box-shadow 0.15s;
  &:focus-within { border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
  &[data-disabled="true"] { background: #F1F4F8; }
`;

const CurrencyPrefix = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0 10px;
  background: #F1F4F8;
  border-right: 1px solid #C7CED6;
  font-size: 13px;
  font-weight: 600;
  color: #4B5563;
  min-width: 48px;
  justify-content: center;
`;

const CurrencyInputInner = styled.input`
  flex: 1;
  padding: 10px 12px;
  border: none;
  font-size: 14px;
  color: #0A2540;
  outline: none;
  background: transparent;
  box-sizing: border-box;
  width: 100%;
  &:disabled { background: transparent; color: #4B5563; cursor: not-allowed; }
`;

const PercentSuffix = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0 10px;
  background: #F1F4F8;
  border-left: 1px solid #C7CED6;
  font-size: 14px;
  font-weight: 500;
  color: #4B5563;
`;

interface CurrencyInputProps {
  value: any;
  onChange: (v: string) => void;
  disabled?: boolean;
  currency?: string;
}
const CurrencyInput: React.FC<CurrencyInputProps> = ({ value, onChange, disabled, currency }) => {
  const symbol = getCurrencySymbol(currency || 'MYR');
  return (
    <CurrencyInputWrapper data-disabled={disabled ? 'true' : 'false'}>
      <CurrencyPrefix>{symbol}</CurrencyPrefix>
      <CurrencyInputInner
        type="number"
        step="0.01"
        min="0"
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        disabled={disabled}
      />
    </CurrencyInputWrapper>
  );
};

interface PercentInputProps {
  value: any;
  onChange: (v: string) => void;
  disabled?: boolean;
}
const PercentInput: React.FC<PercentInputProps> = ({ value, onChange, disabled }) => (
  <CurrencyInputWrapper data-disabled={disabled ? 'true' : 'false'}>
    <CurrencyInputInner
      type="number"
      step="0.01"
      min="0"
      max="100"
      value={value || ''}
      onChange={e => onChange(e.target.value)}
      disabled={disabled}
    />
    <PercentSuffix>%</PercentSuffix>
  </CurrencyInputWrapper>
);

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #C7CED6;
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
  border: 1px solid #C7CED6;
  border-radius: 6px;
  font-size: 14px;
  color: #0A2540;
  box-sizing: border-box;
  outline: none;
  &:focus { border-color: #635BFF; }
  &:disabled { background: #F1F4F8; }
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

  background: ${p => p.variant === 'danger' ? '#DC2626' : p.variant === 'secondary' ? '#F1F4F8' : '#635BFF'};
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
  border-bottom: 1px solid #F1F4F8;
  &:last-child { border-bottom: none; }
`;

const NoteMeta = styled.span`
  font-size: 12px;
  color: #4B5563;
`;

const DocItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #F1F4F8;
  &:last-child { border-bottom: none; }
`;

const HistoryItem = styled.div`
  display: flex;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid #F1F4F8;
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
  color: #4B5563;
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

  @media (max-width: 640px) {
    padding: 12px;
  }
`;

const ModalBox = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  max-width: 440px;
  width: 90%;
  box-shadow: 0 20px 25px rgba(0,0,0,0.1);

  @media (max-width: 640px) {
    width: 100%;
    padding: 18px;
    border-radius: 10px;
  }
`;

const STAGE_COLORS: Record<string, { bg: string; color: string }> = {
  proposal: { bg: '#DBEAFE', color: '#2563EB' },
  contracting: { bg: '#FEF3C7', color: '#D97706' },
  setup: { bg: '#FEF3C7', color: '#D97706' },
  active: { bg: '#ECFDF5', color: '#059669' },
  terminated: { bg: '#F1F4F8', color: '#4B5563' },
  renewed: { bg: '#EDE9FE', color: '#7C3AED' }
};

// ============================================
// Component
// ============================================

const ContractDetail: React.FC<ContractDetailProps> = ({ contractId, entityType, onBack }) => {
  const { t } = useTranslation('contract');
  const { user } = useAuth();
  // Subscription Plans (brand_plans / fc_plans) is an advanced-tier module.
  // Gate LinkedPlansSection on module availability — basic-tier customers use
  // financial_terms only, no plan linkage.
  const { hasModule } = useAllowedRoutes({
    role: user?.role || '',
    brandId: user?.brand_id || null,
    foodcourtId: user?.foodcourt_id || null
  });
  const planModuleCode = entityType === 'brand' ? 'brand_plans' : 'fc_plans';
  const canUsePlans = hasModule(planModuleCode);
  const [contract, setContract] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<any>({});
  const [formError, setFormError] = useState<string | null>(null);
  const formRef = React.useRef<any>({});
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [terminateModal, setTerminateModal] = useState(false);
  const [terminateReason, setTerminateReason] = useState('');
  const [restaurantSearch, setRestaurantSearch] = useState('');
  const [restaurantResults, setRestaurantResults] = useState<any[]>([]);
  const [searchingRestaurant, setSearchingRestaurant] = useState(false);
  const searchTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  const validSections = ['parties', 'contract', 'billing', 'setup', 'documents'] as const;
  type SectionKey = typeof validSections[number];
  const readSectionsFromUrl = (): Set<SectionKey> => {
    try {
      const q = new URLSearchParams(window.location.search).get('section');
      if (q) {
        const arr = q.split(',').filter(s => (validSections as readonly string[]).includes(s));
        if (arr.length > 0) return new Set(arr as SectionKey[]);
      }
    } catch {}
    return new Set();
  };
  const [expandedSections, setExpandedSections] = useState<Set<SectionKey>>(readSectionsFromUrl());
  const [attemptedSave, setAttemptedSave] = useState(false);
  const [highlightField, setHighlightField] = useState<string | null>(null);
  const [supportServicesTemplate, setSupportServicesTemplate] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/contracts/support-services/template?entity_type=${entityType}`, {
          headers: { Authorization: `Bearer ${getAuthToken()}` }
        });
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) setSupportServicesTemplate(data.data);
      } catch {}
    })();
  }, [entityType]);
  const syncSectionsToUrl = useCallback((next: Set<SectionKey>) => {
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete('tab');
      if (next.size > 0) url.searchParams.set('section', Array.from(next).join(','));
      else url.searchParams.delete('section');
      window.history.replaceState({}, '', url.toString());
    } catch {}
  }, []);

  const handleSectionsChange = useCallback((next: Set<string>) => {
    const casted = next as Set<SectionKey>;
    setExpandedSections(casted);
    syncSectionsToUrl(casted);
  }, [syncSectionsToUrl]);

  const openSectionAndScroll = useCallback((section: SectionKey, fieldKey?: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      next.add(section);
      syncSectionsToUrl(next);
      return next;
    });
    setTimeout(() => {
      if (fieldKey) {
        const fieldEl = document.querySelector(`[data-field-key="${fieldKey}"]`);
        if (fieldEl) {
          fieldEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setHighlightField(fieldKey);
          setTimeout(() => setHighlightField(null), 2500);
          return;
        }
      }
      const el = document.getElementById(`section-${section}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  }, [syncSectionsToUrl]);

  const getToken = () => getAuthToken();
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

  // Handle ?action=renew URL parameter — auto-open renewal flow once
  const renewActionRef = React.useRef(false);
  useEffect(() => {
    if (renewActionRef.current || !contract || contract.stage !== 'active') return;
    try {
      const url = new URL(window.location.href);
      if (url.searchParams.get('action') === 'renew') {
        renewActionRef.current = true;
        url.searchParams.delete('action');
        window.history.replaceState({}, '', url.toString());
        // Slight delay so banner renders first
        setTimeout(() => {
          if (window.confirm(t('detail.renewConfirm', 'Renew this contract? A new renewed contract will be created.') as string)) {
            handleRenew();
          }
        }, 200);
      }
    } catch {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract?.stage]);


  const handleAutoSave = async () => {
    setFormError(null);
    // Only send whitelisted fields — backend filters but we reduce payload
    const f = formRef.current || {};
    const payload: any = {};
    const fields = [
      'applicant_company_name', 'applicant_contact_person',
      'applicant_email', 'applicant_phone',
      'applicant_business_type', 'applicant_location', 'applicant_notes',
      'applicant_business_registration', 'applicant_website',
      'applicant_bank_info', 'applicant_representatives',
      'issuer_company_name', 'issuer_business_registration',
      'issuer_website', 'issuer_bank_info', 'issuer_representatives',
      'issuer_sync_with_master',
      'special_conditions', 'renewal_policy', 'exclusivity_terms',
      'support_services', 'legal_terms',
      'contract_number', 'contract_type', 'start_date', 'end_date',
      'duration_months', 'signing_date', 'financial_terms',
      'renewal_type', 'renewal_alert_months', 'termination_notice_months',
      'early_termination_fee', 'restaurant_id', 'unit_id',
      'target_open_date', 'person_in_charge', 'notes'
    ];
    for (const k of fields) {
      if (f[k] !== undefined) payload[k] = f[k];
    }
    const res = await fetch(`/api/contracts/${contractId}`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify(payload)
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
        const msg = (data.message || 'Stage transition failed').toLowerCase();
        // Route the user to the tab where the missing field lives
        if (msg.includes('document')) changeTab('documents');
        else if (msg.includes('contract number') || msg.includes('date') || msg.includes('period')) changeTab('contract');
        else if (msg.includes('task')) changeTab('setup');
        else if (msg.includes('applicant') || msg.includes('restaurant')) changeTab('parties');
        setFormError(data.message || 'Stage transition failed');
      }
    } catch {
      setFormError('Stage transition failed');
    }
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

  const handleToggleTaskRequired = async (taskId: number, isRequired: boolean) => {
    try {
      await fetch(`/api/contracts/${contractId}/tasks/${taskId}`, {
        method: 'PUT', headers: headers(),
        body: JSON.stringify({ is_required: !isRequired })
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
        const res = await fetch(`/api/restaurants?search=${encodeURIComponent(term)}&limit=10`, {
          headers: { Authorization: `Bearer ${getToken()}` }
        });
        const data = await res.json();
        const list = Array.isArray(data) ? data : (data.data?.restaurants || data.data || []);
        // Client-side defensive filter (in case backend doesn't filter)
        const normalized = term.trim().toLowerCase();
        const filtered = (Array.isArray(list) ? list : []).filter((r: any) => {
          const hay = [r.name, r.branch_name, r.slug, r.phone, r.address]
            .filter(Boolean)
            .map(v => String(v).toLowerCase())
            .join(' ');
          return hay.includes(normalized);
        });
        setRestaurantResults(filtered.slice(0, 10));
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

  if (loading) return <DetailContainer><div style={{ padding: '40px', textAlign: 'center', color: '#4B5563' }}>Loading...</div></DetailContainer>;
  if (!contract) return <DetailContainer><div style={{ padding: '40px', textAlign: 'center', color: '#4B5563' }}>Contract not found</div></DetailContainer>;

  // Currency: Contract.currency is the source of truth (explicit per-contract).
  // Falls back to entity default on legacy rows before backfill. entitySupported
  // drives the picker options when the entity supports multiple currencies.
  const entityCurrency: string = contract.currency || contract.entity_currency || 'MYR';
  const entitySupported: string[] = Array.isArray(contract.entity_supported_currencies) && contract.entity_supported_currencies.length > 0
    ? contract.entity_supported_currencies
    : [entityCurrency];
  const currencyLocked: boolean = !!contract.currency_locked;

  const badge = STAGE_COLORS[contract.stage] || { color: '#4B5563', bg: '#F1F4F8' };
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

  // Compute required-field gaps per section for next-stage gating
  interface SectionReq { section: SectionKey; fieldKey: string; label: string; }
  const getSectionRequirements = (): SectionReq[] => {
    const out: SectionReq[] = [];
    if (nextStage === 'contracting') {
      // P0 #2 — applicant identifier: company_name OR contact_person
      if (!form.applicant_company_name && !form.applicant_contact_person) {
        out.push({ section: 'parties', fieldKey: 'applicant_company_name', label: t('detail.applicantIdentifier', 'Applicant Company Name or Contact Person') as string });
      }
    } else if (nextStage === 'setup') {
      if (!form.contract_number) out.push({ section: 'contract', fieldKey: 'contract_number', label: t('detail.contractNumber', 'Contract Number') as string });
      if (!form.start_date) out.push({ section: 'contract', fieldKey: 'start_date', label: t('detail.startDate', 'Start Date') as string });
      if (!form.end_date) out.push({ section: 'contract', fieldKey: 'end_date', label: t('detail.endDate', 'End Date') as string });
      // P0 #1 — Foodcourt: unit_id 필수 (unit 정보는 Contract 섹션 Tenancy Terms 안에 있음)
      if (contract.entity_type === 'foodcourt' && !contract.unit_id) {
        out.push({ section: 'contract', fieldKey: 'unit_id', label: t('detail.linkedUnit', 'Linked Unit') as string });
      }
    } else if (nextStage === 'active') {
      if (!contract.restaurant_id) out.push({ section: 'parties', fieldKey: 'link_restaurant', label: t('detail.linkedRestaurant', 'Linked Restaurant') as string });
      // P0 #3 — 필수(is_required) task 만 체크
      if (contract.tasks && contract.tasks.some((tk: any) => tk.is_required !== false && !tk.is_completed)) {
        out.push({ section: 'setup', fieldKey: 'setup_tasks', label: t('detail.pendingSetupTasks', 'Pending Setup Tasks') as string });
      }
    }
    return out;
  };
  const sectionRequirements = nextStage ? getSectionRequirements() : [];
  const missingRequired = sectionRequirements.map(r => r.label);

  const requirementsBySection: Record<SectionKey, SectionReq[]> = {
    parties: sectionRequirements.filter(r => r.section === 'parties'),
    contract: sectionRequirements.filter(r => r.section === 'contract'),
    billing: sectionRequirements.filter(r => r.section === 'billing'),
    setup: sectionRequirements.filter(r => r.section === 'setup'),
    documents: sectionRequirements.filter(r => r.section === 'documents')
  };
  // Helpers for strict per-field completeness checks (Irene's "모든 항목 입력" rule).
  const isNonEmpty = (v: any): boolean =>
    v != null && v !== '' && !(Array.isArray(v) && v.length === 0) &&
    !(typeof v === 'object' && !Array.isArray(v) && !(v instanceof Date) && Object.keys(v || {}).length === 0);
  // Object (e.g. bank_info) counts as filled if at least one meaningful property is set.
  const objectHasAnyValue = (obj: any): boolean =>
    obj != null && typeof obj === 'object' && !Array.isArray(obj) &&
    Object.values(obj).some(isNonEmpty);

  // "Complete" per Irene's spec = EVERY user-facing field in the section is filled.
  // Anything partial / any field empty → not Complete → "In progress".
  const isSectionComplete = (sec: SectionKey): boolean => {
    if (sec === 'parties') {
      const fields = [
        form.applicant_company_name,
        form.applicant_contact_person,
        form.applicant_email,
        form.applicant_phone,
        form.applicant_business_type,
        form.applicant_location,
        form.applicant_business_registration,
        form.applicant_website,
        objectHasAnyValue(form.applicant_bank_info) ? true : null,
        Array.isArray(form.applicant_representatives) && form.applicant_representatives.length > 0 ? true : null,
        form.applicant_notes,
        form.issuer_company_name,
        form.issuer_business_registration,
        form.issuer_website,
        objectHasAnyValue(form.issuer_bank_info) ? true : null,
        Array.isArray(form.issuer_representatives) && form.issuer_representatives.length > 0 ? true : null
      ];
      return fields.every(isNonEmpty);
    }
    if (sec === 'contract') {
      // Contract Information sub-block: all user-facing fields.
      const infoFields = [
        form.contract_number,
        form.contract_type,
        form.currency,
        form.start_date,
        form.end_date,
        form.signing_date,
        form.duration_months,
        form.notes,
        // foodcourt requires a unit; brand never uses unit_id
        entityType === 'brand' ? true : (contract.unit_id ? true : null)
      ];
      if (!infoFields.every(isNonEmpty)) return false;

      // Financial Terms sub-block — entity-specific fields shown in the Contract accordion UI.
      const ft = form.financial_terms || {};
      if (entityType === 'brand') {
        const brandFields = [
          ft.franchise_fee,                    // Initial Fees
          ft.security_deposit,                 // Initial Fees
          ft.system_setup_fee,                 // System Fees
          ft.system_monthly_fee,               // System Fees
          ft.royalty_value,                    // Royalty
          ft.royalty_payment?.due_day,         // Royalty — Due Day
          ft.royalty_payment?.grace_days,      // Royalty — Grace Days
          ft.royalty_payment?.late_interest_pct, // Royalty — Late Interest
          ft.marketing_fund_value,             // Marketing
          ft.territory                         // Territory
        ];
        return brandFields.every(isNonEmpty);
      }
      // foodcourt
      const fcFields = [
        ft.unit_size_sqft,                     // Unit
        Array.isArray(ft.rent_schedule) && ft.rent_schedule.length > 0 ? true : null, // Rent Schedule
        ft.percentage_rent?.rate,              // Percentage Rent — Rate
        ft.handover_date,                      // Key Dates
        ft.commencement_date,                  // Key Dates
        ft.fit_out_period_days,                // Key Dates
        ft.security_deposit,                   // Others
        ft.min_guarantee,                      // Others
        ft.maintenance_fee,                    // Others
        ft.operating_hours                     // Others
      ];
      return fcFields.every(isNonEmpty);
    }
    if (sec === 'billing') {
      return Array.isArray(form.plans) && form.plans.some((p: any) => !p.end_at);
    }
    if (sec === 'setup') {
      const tasks = Array.isArray(contract.tasks) ? contract.tasks : [];
      if (tasks.length === 0) return false;
      const required = tasks.filter((t: any) => t.is_required !== false);
      if (required.length === 0) return false;
      return required.every((t: any) => t.is_completed);
    }
    if (sec === 'documents') {
      return Array.isArray(contract.documents) && contract.documents.length > 0;
    }
    return false;
  };

  // Did the user enter ANYTHING in this section? (any value that counts toward "started")
  const hasAnyInputIn = (sec: SectionKey): boolean => {
    if (sec === 'parties') {
      return !!(form.applicant_company_name || form.applicant_contact_person
        || form.applicant_email || form.applicant_phone || form.applicant_location
        || form.applicant_business_type || form.applicant_business_registration
        || form.applicant_website || form.applicant_notes
        || form.issuer_company_name || form.issuer_business_registration);
    }
    if (sec === 'contract') {
      const ft = form.financial_terms || {};
      const hasAnyTerm = Object.values(ft).some((v: any) => v != null && v !== '' && Number(v) !== 0);
      return !!(form.contract_number || form.start_date || form.end_date
        || form.duration_months || form.contract_type || form.signing_date
        || contract.unit_id || hasAnyTerm);
    }
    if (sec === 'billing') {
      return Array.isArray(form.plans) && form.plans.some((p: any) => !p.end_at);
    }
    if (sec === 'setup') {
      return Array.isArray(contract.tasks) && contract.tasks.length > 0;
    }
    if (sec === 'documents') {
      return Array.isArray(contract.documents) && contract.documents.length > 0;
    }
    return false;
  };

  // Section status per Irene's spec (2026-04-23):
  //   has required + empty       → required (red)    "입력 필수"
  //   has required + partial     → optional (gray)   "입력중"
  //   has required + all filled  → complete (green)  "입력완료"
  //   no required + empty        → optional (gray)   "입력중"
  //   no required + all filled   → complete (green)  "입력완료"
  const sectionStatus = (sec: SectionKey): { status: 'complete' | 'required' | 'optional' | 'empty'; label: string } => {
    const reqs = requirementsBySection[sec];
    const hasRequiredGap = reqs.length > 0;
    const hasAny = hasAnyInputIn(sec);
    const isComplete = isSectionComplete(sec);

    if (isComplete) {
      return { status: 'complete', label: t('detail.sectionComplete', '✓ Complete') as string };
    }
    if (hasRequiredGap && !hasAny) {
      return { status: 'required', label: `${t('detail.sectionRequired', 'Required')} ${reqs.length}` };
    }
    return { status: 'optional', label: t('detail.sectionInProgress', 'In progress') as string };
  };

  const nextDisabled = missingRequired.length > 0;

  const missingFieldKeys = new Set(sectionRequirements.map(r => r.fieldKey));
  const fieldShellClass = (key: string): string => {
    const cls = ['field-shell'];
    if (attemptedSave && missingFieldKeys.has(key)) cls.push('field-error');
    if (highlightField === key) cls.push('field-highlight');
    return cls.join(' ');
  };
  const nextDisabledTitle = nextDisabled
    ? `${t('detail.requiredMissing', 'Required:')} ${missingRequired.join(', ')}`
    : undefined;

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
        <TitleRow>
          <DetailTitle>{contract.restaurant?.name || contract.applicant_company_name || contract.applicant_name}{contract.restaurant?.branch_name && <span style={{ fontSize: '14px', fontWeight: 500, color: '#4B5563', marginLeft: '8px' }}>({contract.restaurant.branch_name})</span>}</DetailTitle>
          <StageBadge bg={badge.bg} color={badge.color}>{contract.stage}</StageBadge>
        </TitleRow>
        <HeaderActions>
          {nextStage && (
            <Btn variant="primary" onClick={() => {
              if (nextDisabled) {
                setAttemptedSave(true);
                if (sectionRequirements.length > 0) {
                  const first = sectionRequirements[0];
                  openSectionAndScroll(first.section, first.fieldKey);
                }
                return;
              }
              handleStageTransition(nextStage);
            }} title={nextDisabledTitle}>
              {nextStageLabels[nextStage]} &rarr;
            </Btn>
          )}
          {contract.stage === 'active' && (
            <>
              <Btn variant="primary" onClick={handleRenew}>{t('detail.renewContract', 'Renew Contract')}</Btn>
              <Btn variant="danger" onClick={() => setTerminateModal(true)}>{t('detail.terminateContract', 'Terminate Contract')}</Btn>
            </>
          )}
        </HeaderActions>
      </DetailHeader>

      {!['terminated', 'renewed', 'expired'].includes(contract.stage) && (
        <ContractStageBar currentStage={contract.stage} />
      )}

      {(() => {
        if (contract.stage !== 'active' || !contract.end_date) return null;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const end = new Date(String(contract.end_date).slice(0, 10) + 'T00:00:00');
        const days = Math.floor((end.getTime() - today.getTime()) / 86400000);
        const alertMonths = contract.renewal_alert_months ?? 3;
        const primary = alertMonths * 30;
        if (days < 0 || days > primary) return null;
        const urgent = days <= 7;
        return (
          <ExpiryBanner urgent={urgent}>
            <ExpiryIcon>{urgent ? '🔴' : '⚠'}</ExpiryIcon>
            <ExpiryText>
              <strong>{t('detail.expiryBannerTitle', 'Contract expiring in')} {days} {t('detail.days', 'days')}</strong>
              {' · '}
              {t('detail.expiryBannerBody', 'Start renewal discussion or plan transition.')}
            </ExpiryText>
            <ExpiryActions>
              <Btn variant="primary" onClick={handleRenew} style={{ padding: '6px 14px', fontSize: 13 }}>
                {t('detail.renewContract', 'Renew Contract')}
              </Btn>
            </ExpiryActions>
          </ExpiryBanner>
        );
      })()}

      {formError && <ErrorMsg>{formError}</ErrorMsg>}

      {sectionRequirements.length > 0 && (
        <RequiredBanner>
          <RequiredIcon>⚠</RequiredIcon>
          <RequiredText>
            {sectionRequirements.length} {t('detail.bannerRequired', 'required field(s) missing')}
          </RequiredText>
          <RequiredChips>
            {(['parties', 'contract', 'billing', 'setup', 'documents'] as SectionKey[]).map(sec => {
              const reqs = requirementsBySection[sec];
              if (reqs.length === 0) return null;
              const labels: Record<SectionKey, string> = {
                parties: t('detail.tabParties', 'Parties') as string,
                contract: t('detail.tabContract', 'Contract') as string,
                billing: t('detail.tabBilling', 'Billing') as string,
                setup: t('detail.tabSetup', 'Setup') as string,
                documents: t('detail.tabDocuments', 'Documents') as string
              };
              return (
                <RequiredChip key={sec} onClick={() => openSectionAndScroll(sec, reqs[0]?.fieldKey)}>
                  {labels[sec]} ({reqs.length})
                </RequiredChip>
              );
            })}
          </RequiredChips>
        </RequiredBanner>
      )}
      {nextStage && sectionRequirements.length === 0 && (
        <ReadyBanner>
          ✓ {t('detail.bannerReady', 'Ready to move to')} {nextStageLabels[nextStage]?.replace(/^Proceed to |^Start /i, '') || nextStage}
        </ReadyBanner>
      )}

      <FormAccordion expanded={expandedSections as Set<string>} onChange={handleSectionsChange}>
      <FormAccordionSection id="parties" title={t('detail.tabParties', 'Parties') as string} status={sectionStatus('parties').status} statusLabel={sectionStatus('parties').label}>
      {/* Applicant Information */}
      <Section>
        <SectionTitle>{t('detail.applicantInfo', 'Applicant Information')}</SectionTitle>
        <FormGrid>
          <FormGroup data-field-key="applicant_company_name" className={fieldShellClass('applicant_company_name')}>
            <Label>{t('detail.companyName', 'Company Name')}</Label>
            <AutoSaveField onSave={handleAutoSave}>
              <Input value={form.applicant_company_name || ''} onChange={e => updateField('applicant_company_name', e.target.value)} disabled={!isEditable} />
            </AutoSaveField>
            <div className="field-error-msg">{t('detail.applicantIdentifier', 'Applicant Company Name or Contact Person')}</div>
          </FormGroup>
          <FormGroup data-field-key="applicant_contact_person" className={fieldShellClass('applicant_company_name')}>
            <Label>{t('detail.contactPerson', 'Contact Person')}</Label>
            <AutoSaveField onSave={handleAutoSave}>
              <Input value={form.applicant_contact_person || ''} onChange={e => updateField('applicant_contact_person', e.target.value)} disabled={!isEditable} />
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
          <FormGroup>
            <Label>{t('detail.businessRegistration', 'Business Registration')}</Label>
            <AutoSaveField onSave={handleAutoSave}>
              <Input value={form.applicant_business_registration || ''} onChange={e => updateField('applicant_business_registration', e.target.value)} disabled={!isEditable} />
            </AutoSaveField>
          </FormGroup>
          <FormGroup>
            <Label>{t('detail.website', 'Website')}</Label>
            <AutoSaveField onSave={handleAutoSave}>
              <Input value={form.applicant_website || ''} onChange={e => updateField('applicant_website', e.target.value)} disabled={!isEditable} />
            </AutoSaveField>
          </FormGroup>
          <FormGroup style={{ gridColumn: '1 / -1' }}>
            <Label>{t('detail.bankInfo', 'Bank Info')}</Label>
            <BankInfoField
              value={form.applicant_bank_info}
              onChange={v => updateField('applicant_bank_info', v)}
              onSave={handleAutoSave}
              disabled={!isEditable}
            />
          </FormGroup>
          <FormGroup style={{ gridColumn: '1 / -1' }}>
            <Label>{t('detail.representatives', 'Representatives')}</Label>
            <RepresentativeField
              value={form.applicant_representatives}
              onChange={v => updateField('applicant_representatives', v)}
              onSave={handleAutoSave}
              disabled={!isEditable}
            />
          </FormGroup>
        </FormGrid>
      </Section>

      {/* Issuer Information */}
      <Section>
        <SectionTitle>{t('detail.issuerInfo', 'Issuer Information')}</SectionTitle>
        <div style={{ marginBottom: 16 }}>
          <SyncMasterToggle
            checked={form.issuer_sync_with_master !== false}
            onChange={v => {
              updateField('issuer_sync_with_master', v);
              setTimeout(() => { handleAutoSave(); }, 0);
            }}
            disabled={!isEditable}
            label={t('detail.syncWithMaster', `Keep in sync with ${entityType === 'brand' ? 'Brand' : 'Foodcourt'} master`) as string}
            hint={t('detail.syncWithMasterHint', 'When on, issuer fields auto-update from master entity. Turn off to lock this contract as independent snapshot.') as string}
          />
        </div>
        <FormGrid>
          <FormGroup>
            <Label>{t('detail.companyName', 'Company Name')}</Label>
            <AutoSaveField onSave={handleAutoSave}>
              <Input value={form.issuer_company_name || ''} onChange={e => updateField('issuer_company_name', e.target.value)} disabled={!isEditable} />
            </AutoSaveField>
          </FormGroup>
          <FormGroup>
            <Label>{t('detail.businessRegistration', 'Business Registration')}</Label>
            <AutoSaveField onSave={handleAutoSave}>
              <Input value={form.issuer_business_registration || ''} onChange={e => updateField('issuer_business_registration', e.target.value)} disabled={!isEditable} />
            </AutoSaveField>
          </FormGroup>
          <FormGroup>
            <Label>{t('detail.website', 'Website')}</Label>
            <AutoSaveField onSave={handleAutoSave}>
              <Input value={form.issuer_website || ''} onChange={e => updateField('issuer_website', e.target.value)} disabled={!isEditable} />
            </AutoSaveField>
          </FormGroup>
          <FormGroup style={{ gridColumn: '1 / -1' }}>
            <Label>{t('detail.bankInfo', 'Bank Info')}</Label>
            <BankInfoField
              value={form.issuer_bank_info}
              onChange={v => updateField('issuer_bank_info', v)}
              onSave={handleAutoSave}
              disabled={!isEditable}
            />
          </FormGroup>
          <FormGroup style={{ gridColumn: '1 / -1' }}>
            <Label>{t('detail.representatives', 'Representatives')}</Label>
            <RepresentativeField
              value={form.issuer_representatives}
              onChange={v => updateField('issuer_representatives', v)}
              onSave={handleAutoSave}
              disabled={!isEditable}
            />
          </FormGroup>
        </FormGrid>
      </Section>

      {/* Link Restaurant */}
      <Section data-field-key="link_restaurant" className={fieldShellClass('link_restaurant')}>
        <SectionTitle>{t('detail.linkRestaurant', 'Link Restaurant')}</SectionTitle>
        {contract.restaurant ? (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: '#F0FDF4', borderRadius: '8px', border: '1px solid #BBF7D0' }}>
            <div>
              <div style={{ fontWeight: 600, color: '#0A2540', fontSize: '15px' }}>{contract.restaurant.name}</div>
              {contract.restaurant.address && <div style={{ fontSize: '13px', color: '#4B5563', marginTop: '2px' }}>{contract.restaurant.address}</div>}
              {contract.restaurant.phone && <div style={{ fontSize: '13px', color: '#4B5563' }}>{contract.restaurant.phone}</div>}
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
              {searchingRestaurant && <div style={{ fontSize: '12px', color: '#4B5563', marginTop: '4px' }}>Searching...</div>}
              {restaurantResults.length > 0 && (
                <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#fff', border: '1px solid #C7CED6', borderRadius: '8px', marginTop: '4px', maxHeight: '200px', overflowY: 'auto', zIndex: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                  {restaurantResults.map((r: any) => (
                    <div key={r.id} onClick={() => handleLinkRestaurant(r.id)}
                      style={{ padding: '10px 14px', cursor: 'pointer', borderBottom: '1px solid #F1F4F8', fontSize: '14px' }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#F1F4F8')}
                      onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
                    >
                      <div style={{ fontWeight: 500, color: '#0A2540' }}>{r.name}</div>
                      {r.address && <div style={{ fontSize: '12px', color: '#4B5563' }}>{r.address}</div>}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '6px' }}>
              {t('detail.restaurantHint', 'Link an existing restaurant or leave empty to connect later. Restaurant is required before Active stage.')}
            </div>
          </div>
        )}
      </Section>
      </FormAccordionSection>
      <FormAccordionSection id="contract" title={t('detail.tabContract', 'Contract') as string} status={sectionStatus('contract').status} statusLabel={sectionStatus('contract').label}>
      {/* Contract Info */}
      {['contracting', 'setup', 'active', 'terminated', 'renewed'].includes(contract.stage) && (
        <Section>
          <SectionTitle>{t('detail.contractInfo', 'Contract Information')}</SectionTitle>
          {contract.stage === 'contracting' && (
            <RequiredHint>
              {t('detail.requiredForSetup', 'Fields marked * are required before moving to Setup stage.')}
            </RequiredHint>
          )}
          <FormGrid>
            <FormGroup data-field-key="contract_number" className={fieldShellClass('contract_number')}>
              <Label required>{t('detail.contractNumber', 'Contract Number')}</Label>
              <AutoSaveField onSave={handleAutoSave}>
                <Input value={form.contract_number || ''} onChange={e => updateField('contract_number', e.target.value)} disabled={!isEditable} placeholder={t('detail.contractNumberPlaceholder', 'e.g. FRN-2026-001') as string} />
              </AutoSaveField>
              <div className="field-error-msg">{t('detail.contractNumber', 'Contract Number')} {t('detail.isRequired', 'is required')}</div>
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
              <Label>{t('detail.currency', 'Currency')}</Label>
              {entitySupported.length > 1 && !currencyLocked ? (
                <AutoSaveField onSave={handleAutoSave} type="select" debounceMs={300}>
                  <Select
                    value={form.currency || entityCurrency}
                    onChange={e => updateField('currency', e.target.value)}
                    disabled={!isEditable}
                  >
                    {entitySupported.map(code => (
                      <option key={code} value={code}>{getCurrencySymbol(code)} — {code}</option>
                    ))}
                  </Select>
                </AutoSaveField>
              ) : (
                <Input
                  value={`${getCurrencySymbol(form.currency || entityCurrency)} — ${form.currency || entityCurrency}`}
                  disabled
                  title={currencyLocked ? (t('detail.currencyLocked', 'Currency is locked — invoices have been issued') as string) : ''}
                />
              )}
              {currencyLocked && (
                <div style={{ fontSize: '11px', color: '#4B5563', marginTop: '4px' }}>
                  🔒 {t('detail.currencyLocked', 'Currency is locked — invoices have been issued')}
                </div>
              )}
            </FormGroup>
            <FormGroup data-field-key="start_date" className={[fieldShellClass('start_date'), highlightField === 'end_date' ? 'field-highlight' : '', (attemptedSave && missingFieldKeys.has('end_date')) ? 'field-error' : ''].filter(Boolean).join(' ')}>
              <Label required>{t('detail.contractPeriod', 'Contract Period')}</Label>
              <AutoSaveField onSave={handleAutoSave} debounceMs={300}>
                <DateRangeField
                  startDate={form.start_date}
                  endDate={form.end_date}
                  onChange={(s, e) => {
                    updateField('start_date', s);
                    updateField('end_date', e);
                  }}
                  disabled={!isEditable}
                  placeholder={t('detail.selectContractPeriod', 'Select start and end date') as string}
                />
              </AutoSaveField>
              <div className="field-error-msg">{t('detail.contractPeriodRequired', 'Contract Period is required')}</div>
            </FormGroup>
            <FormGroup>
              <Label>{t('detail.signingDate', 'Signing Date')}</Label>
              <AutoSaveField onSave={handleAutoSave} debounceMs={300}>
                <DateField
                  value={form.signing_date}
                  onChange={v => updateField('signing_date', v)}
                  disabled={!isEditable}
                />
              </AutoSaveField>
            </FormGroup>
            <FormGroup>
              <Label>{t('detail.durationMonths', 'Duration (months)')}</Label>
              <AutoSaveField onSave={handleAutoSave}>
                <Input type="number" value={form.duration_months || ''} onChange={e => updateField('duration_months', parseInt(e.target.value) || null)} disabled={!isEditable} />
              </AutoSaveField>
            </FormGroup>
            <FormGroup>
              <Label>{t('detail.remarks', 'Remarks')}</Label>
              <AutoSaveField onSave={handleAutoSave}>
                <Input value={form.notes || ''} onChange={e => updateField('notes', e.target.value)} disabled={!isEditable} placeholder={t('detail.remarksPlaceholder', 'Additional notes') as string} />
              </AutoSaveField>
            </FormGroup>
          </FormGrid>
        </Section>
      )}

      {/* Financial Terms */}
      <Section>
        <SectionTitle>{entityType === 'brand' ? t('detail.franchiseTerms', 'Franchise Terms') : t('detail.tenancyTerms', 'Tenancy Terms')}</SectionTitle>
        {Array.isArray(form.plans) && form.plans.some((p: any) => !p.end_at) ? (
          <div style={{ padding: '10px 14px', background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: 6, fontSize: 13, color: '#065F46', marginBottom: 16 }}>
            <strong>{t('detail.planLinked', 'Billing plan linked')}</strong> — {t('detail.planLinkedHint', 'Actual invoices are generated from the subscription plan(s) below. Values in this section are reference terms captured during negotiation.')}
          </div>
        ) : (
          <div style={{ padding: '10px 14px', background: '#FEF3C7', border: '1px solid #FCD34D', borderRadius: 6, fontSize: 13, color: '#78350F', marginBottom: 16 }}>
            <strong>{t('detail.pendingPlan', 'No billing plan linked')}</strong> — {t('detail.pendingPlanHint', 'These are negotiated reference terms. Link a subscription plan to begin actual invoicing.')}
          </div>
        )}
        {entityType === 'brand' ? (
          <>
            {/* Initial Fees */}
            <SubsectionTitle>{t('detail.initialFees', 'Initial Fees')}</SubsectionTitle>
            <FormGrid>
              <FormGroup>
                <Label>{t('detail.franchiseFee', 'Franchise Fee')}</Label>
                <AutoSaveField onSave={handleAutoSave}>
                  <CurrencyInput currency={entityCurrency} value={form.financial_terms?.franchise_fee} onChange={v => updateFinancialTerm('franchise_fee', v)} disabled={!isEditable} />
                </AutoSaveField>
              </FormGroup>
              <FormGroup>
                <Label>{t('detail.franchiseFeeOriginal', 'Original Price')}</Label>
                <AutoSaveField onSave={handleAutoSave}>
                  <CurrencyInput currency={entityCurrency} value={form.financial_terms?.franchise_fee_original} onChange={v => updateFinancialTerm('franchise_fee_original', v)} disabled={!isEditable} />
                </AutoSaveField>
              </FormGroup>
              <FormGroup style={{ gridColumn: '1 / -1' }}>
                <Label>{t('detail.discountReason', 'Discount Reason')}</Label>
                <AutoSaveField onSave={handleAutoSave}>
                  <Input value={form.financial_terms?.franchise_fee_discount_reason || ''} onChange={e => updateFinancialTerm('franchise_fee_discount_reason', e.target.value)} disabled={!isEditable} placeholder={t('detail.discountReasonHint', 'Optional — e.g. early-bird, strategic partner') as string} />
                </AutoSaveField>
              </FormGroup>
              <FormGroup>
                <Label>{t('detail.securityDeposit', 'Security Deposit')}</Label>
                <AutoSaveField onSave={handleAutoSave}>
                  <CurrencyInput currency={entityCurrency} value={form.financial_terms?.security_deposit} onChange={v => updateFinancialTerm('security_deposit', v)} disabled={!isEditable} />
                </AutoSaveField>
              </FormGroup>
            </FormGrid>

            {/* System Fees */}
            <SubsectionTitle>{t('detail.systemFees', 'System')}</SubsectionTitle>
            <FormGrid>
              <FormGroup>
                <Label>{t('detail.systemSetupFee', 'Setup Fee')}</Label>
                <AutoSaveField onSave={handleAutoSave}>
                  <CurrencyInput currency={entityCurrency} value={form.financial_terms?.system_setup_fee} onChange={v => updateFinancialTerm('system_setup_fee', v)} disabled={!isEditable} />
                </AutoSaveField>
              </FormGroup>
              <FormGroup>
                <Label>{t('detail.systemMonthlyFee', 'Monthly Fee')}</Label>
                <AutoSaveField onSave={handleAutoSave}>
                  <CurrencyInput currency={entityCurrency} value={form.financial_terms?.system_monthly_fee} onChange={v => updateFinancialTerm('system_monthly_fee', v)} disabled={!isEditable} />
                </AutoSaveField>
              </FormGroup>
              <FormGroup style={{ gridColumn: '1 / -1' }}>
                <CheckboxInline>
                  <input type="checkbox" style={{ width: 16, height: 16, accentColor: '#635BFF' }}
                    checked={!!form.financial_terms?.initial_supply_package_included}
                    onChange={e => { updateFinancialTerm('initial_supply_package_included', e.target.checked); setTimeout(() => handleAutoSave(), 0); }}
                    disabled={!isEditable} />
                  {t('detail.supplyPackageIncluded', 'Initial supply package included')}
                </CheckboxInline>
              </FormGroup>
              <FormGroup style={{ gridColumn: '1 / -1' }}>
                <Label>{t('detail.trainingAdditionalCostNote', 'Training / Additional Cost Note')}</Label>
                <AutoSaveField onSave={handleAutoSave}>
                  <TextArea rows={2} value={form.financial_terms?.training_additional_cost_note || ''} onChange={e => updateFinancialTerm('training_additional_cost_note', e.target.value)} disabled={!isEditable} />
                </AutoSaveField>
              </FormGroup>
            </FormGrid>

            {/* Royalty */}
            <SubsectionTitle>{t('detail.royalty', 'Royalty')}</SubsectionTitle>
            <FormGrid>
              <FormGroup>
                <Label>{t('detail.royaltyPercent', 'Rate (%)')}</Label>
                <AutoSaveField onSave={handleAutoSave}>
                  <PercentInput value={form.financial_terms?.royalty_value} onChange={v => updateFinancialTerm('royalty_value', v)} disabled={!isEditable} />
                </AutoSaveField>
              </FormGroup>
              <FormGroup>
                <Label>{t('detail.royaltyDueDay', 'Due Day (1-31)')}</Label>
                <AutoSaveField onSave={handleAutoSave}>
                  <Input type="number" min="1" max="31" inputMode="numeric"
                    value={form.financial_terms?.royalty_payment?.due_day ?? ''}
                    onChange={e => updateFinancialTerm('royalty_payment', { ...(form.financial_terms?.royalty_payment || {}), due_day: e.target.value })}
                    disabled={!isEditable} />
                </AutoSaveField>
              </FormGroup>
              <FormGroup>
                <Label>{t('detail.royaltyGraceDays', 'Grace Days')}</Label>
                <AutoSaveField onSave={handleAutoSave}>
                  <Input type="number" min="0" inputMode="numeric"
                    value={form.financial_terms?.royalty_payment?.grace_days ?? ''}
                    onChange={e => updateFinancialTerm('royalty_payment', { ...(form.financial_terms?.royalty_payment || {}), grace_days: e.target.value })}
                    disabled={!isEditable} />
                </AutoSaveField>
              </FormGroup>
              <FormGroup>
                <Label>{t('detail.royaltyLateInterest', 'Late Interest (% annual)')}</Label>
                <AutoSaveField onSave={handleAutoSave}>
                  <PercentInput value={form.financial_terms?.royalty_payment?.late_interest_pct}
                    onChange={v => updateFinancialTerm('royalty_payment', { ...(form.financial_terms?.royalty_payment || {}), late_interest_pct: v })}
                    disabled={!isEditable} />
                </AutoSaveField>
              </FormGroup>
            </FormGrid>

            {/* Marketing & Territory */}
            <SubsectionTitle>{t('detail.marketingTerritory', 'Marketing & Territory')}</SubsectionTitle>
            <FormGrid>
              <FormGroup>
                <Label>{t('detail.marketingFundPercent', 'Marketing Fund (%)')}</Label>
                <AutoSaveField onSave={handleAutoSave}>
                  <PercentInput value={form.financial_terms?.marketing_fund_value} onChange={v => updateFinancialTerm('marketing_fund_value', v)} disabled={!isEditable} />
                </AutoSaveField>
              </FormGroup>
              <FormGroup>
                <Label>{t('detail.territory', 'Territory')}</Label>
                <AutoSaveField onSave={handleAutoSave}>
                  <Input value={form.financial_terms?.territory || ''} onChange={e => updateFinancialTerm('territory', e.target.value)} disabled={!isEditable} />
                </AutoSaveField>
              </FormGroup>
            </FormGrid>
          </>
        ) : (
          <>
            {/* Unit */}
            <SubsectionTitle>{t('detail.unit', 'Unit')}</SubsectionTitle>
            <FormGrid data-field-key="unit_id" className={fieldShellClass('unit_id')}>
              <FormGroup>
                <Label required={!contract.unit_id}>{t('detail.unitFullCode', 'Unit')}</Label>
                <Input
                  value={
                    contract.unit
                      ? (contract.unit.branch?.code
                          ? `${contract.unit.branch.code}-${contract.unit.unit_number}${contract.unit.branch.name ? ` (${contract.unit.branch.name})` : ''}`
                          : contract.unit.unit_number)
                      : '—'
                  }
                  disabled
                  readOnly
                />
                <div className="field-error-msg">{t('detail.unitAssignHint', 'Assign via Foodcourt Units page')}</div>
              </FormGroup>
              <FormGroup>
                <Label>{t('detail.unitSizeSqft', 'Unit Size (sqft)')}</Label>
                <AutoSaveField onSave={handleAutoSave}>
                  <Input type="number" min="0" step="0.01" inputMode="decimal"
                    value={form.financial_terms?.unit_size_sqft ?? ''}
                    onChange={e => updateFinancialTerm('unit_size_sqft', e.target.value)}
                    disabled={!isEditable} />
                </AutoSaveField>
              </FormGroup>
            </FormGrid>

            {/* Rent Schedule */}
            <SubsectionTitle>{t('detail.rentSchedule', 'Rent Schedule')}</SubsectionTitle>
            <RentScheduleEditor
              value={form.financial_terms?.rent_schedule}
              onChange={v => updateFinancialTerm('rent_schedule', v)}
              onSave={handleAutoSave}
              disabled={!isEditable}
              currency={entityCurrency}
            />

            {/* Percentage Rent */}
            <SubsectionTitle>{t('detail.percentageRent', 'Percentage Rent')}</SubsectionTitle>
            <PercentageRentField
              value={form.financial_terms?.percentage_rent}
              onChange={v => updateFinancialTerm('percentage_rent', v)}
              onSave={handleAutoSave}
              disabled={!isEditable}
            />

            {/* Key Dates */}
            <SubsectionTitle>{t('detail.keyDates', 'Key Dates')}</SubsectionTitle>
            <FormGrid>
              <FormGroup>
                <Label>{t('detail.handoverDate', 'Handover Date')}</Label>
                <AutoSaveField onSave={handleAutoSave} debounceMs={300}>
                  <DateField value={form.financial_terms?.handover_date} onChange={v => updateFinancialTerm('handover_date', v)} disabled={!isEditable} />
                </AutoSaveField>
              </FormGroup>
              <FormGroup>
                <Label>{t('detail.commencementDate', 'Commencement Date')}</Label>
                <AutoSaveField onSave={handleAutoSave} debounceMs={300}>
                  <DateField value={form.financial_terms?.commencement_date} onChange={v => updateFinancialTerm('commencement_date', v)} disabled={!isEditable} />
                </AutoSaveField>
              </FormGroup>
              <FormGroup>
                <Label>{t('detail.fitOutPeriodDays', 'Fit-Out Period (days)')}</Label>
                <AutoSaveField onSave={handleAutoSave}>
                  <Input type="number" min="0" inputMode="numeric"
                    value={form.financial_terms?.fit_out_period_days ?? ''}
                    onChange={e => updateFinancialTerm('fit_out_period_days', e.target.value)}
                    disabled={!isEditable} />
                </AutoSaveField>
              </FormGroup>
            </FormGrid>

            {/* Others */}
            <SubsectionTitle>{t('detail.others', 'Others')}</SubsectionTitle>
            <FormGrid>
              <FormGroup>
                <Label>{t('detail.securityDeposit', 'Security Deposit')}</Label>
                <AutoSaveField onSave={handleAutoSave}>
                  <CurrencyInput currency={entityCurrency} value={form.financial_terms?.security_deposit} onChange={v => updateFinancialTerm('security_deposit', v)} disabled={!isEditable} />
                </AutoSaveField>
              </FormGroup>
              <FormGroup>
                <Label>{t('detail.minGuarantee', 'Min Guarantee')}</Label>
                <AutoSaveField onSave={handleAutoSave}>
                  <CurrencyInput currency={entityCurrency} value={form.financial_terms?.min_guarantee} onChange={v => updateFinancialTerm('min_guarantee', v)} disabled={!isEditable} />
                </AutoSaveField>
              </FormGroup>
              <FormGroup>
                <Label>{t('detail.maintenanceFee', 'Maintenance Fee (monthly)')}</Label>
                <AutoSaveField onSave={handleAutoSave}>
                  <CurrencyInput currency={entityCurrency} value={form.financial_terms?.maintenance_fee} onChange={v => updateFinancialTerm('maintenance_fee', v)} disabled={!isEditable} />
                </AutoSaveField>
              </FormGroup>
              <FormGroup>
                <Label>{t('detail.operatingHours', 'Operating Hours')}</Label>
                <AutoSaveField onSave={handleAutoSave}>
                  <Input value={form.financial_terms?.operating_hours || ''} onChange={e => updateFinancialTerm('operating_hours', e.target.value)} disabled={!isEditable} />
                </AutoSaveField>
              </FormGroup>
            </FormGrid>
          </>
        )}
      </Section>

      {/* Special Conditions */}
      <Section>
        <SectionTitle>{t('detail.specialConditions', 'Special Conditions')}</SectionTitle>
        <ConditionListEditor
          value={form.special_conditions}
          onChange={v => updateField('special_conditions', v)}
          onSave={handleAutoSave}
          disabled={!isEditable}
          addLabel={t('detail.addCondition', 'Add Condition') as string}
          emptyLabel={t('detail.noSpecialConditions', 'No special conditions') as string}
        />
      </Section>

      {/* Renewal Policy */}
      <Section>
        <SectionTitle>{t('detail.renewalPolicy', 'Renewal Policy')}</SectionTitle>
        <FormGrid>
          <FormGroup>
            <Label>{t('detail.renewalType', 'Type')}</Label>
            <AutoSaveField onSave={handleAutoSave} type="select" debounceMs={300}>
              <Select
                value={form.renewal_policy?.type || ''}
                onChange={e => updateField('renewal_policy', { ...(form.renewal_policy || {}), type: e.target.value })}
                disabled={!isEditable}
              >
                <option value="">{t('detail.select', 'Select...')}</option>
                <option value="auto">Auto Renewal</option>
                <option value="manual">Manual Renewal</option>
                <option value="none">No Renewal</option>
              </Select>
            </AutoSaveField>
          </FormGroup>
          <FormGroup>
            <Label>{t('detail.noticeMonths', 'Notice Period (months)')}</Label>
            <AutoSaveField onSave={handleAutoSave}>
              <Input type="number" min="0" inputMode="numeric"
                value={form.renewal_policy?.notice_months ?? ''}
                onChange={e => updateField('renewal_policy', { ...(form.renewal_policy || {}), notice_months: e.target.value })}
                disabled={!isEditable} />
            </AutoSaveField>
          </FormGroup>
          <FormGroup>
            <Label>{t('detail.renewalRentPolicy', 'Rent Policy at Renewal')}</Label>
            <AutoSaveField onSave={handleAutoSave} type="select" debounceMs={300}>
              <Select
                value={form.renewal_policy?.rent_policy || ''}
                onChange={e => updateField('renewal_policy', { ...(form.renewal_policy || {}), rent_policy: e.target.value })}
                disabled={!isEditable}
              >
                <option value="">{t('detail.select', 'Select...')}</option>
                <option value="same">Same as current</option>
                <option value="market">Market rate</option>
                <option value="negotiated">Negotiated</option>
              </Select>
            </AutoSaveField>
          </FormGroup>
          <FormGroup>
            <Label>{t('detail.renewalPeriodYears', 'Renewal Term (years)')}</Label>
            <AutoSaveField onSave={handleAutoSave}>
              <Input type="number" min="0" inputMode="numeric"
                value={form.renewal_policy?.renewal_period_years ?? ''}
                onChange={e => updateField('renewal_policy', { ...(form.renewal_policy || {}), renewal_period_years: e.target.value })}
                disabled={!isEditable} />
            </AutoSaveField>
          </FormGroup>
          <FormGroup style={{ gridColumn: '1 / -1' }}>
            <CheckboxInline>
              <input type="checkbox" style={{ width: 16, height: 16, accentColor: '#635BFF' }}
                checked={!!form.renewal_policy?.terms_changeable}
                onChange={e => {
                  updateField('renewal_policy', { ...(form.renewal_policy || {}), terms_changeable: e.target.checked });
                  setTimeout(() => handleAutoSave(), 0);
                }}
                disabled={!isEditable} />
              {t('detail.termsChangeable', 'Terms can be re-negotiated at renewal')}
            </CheckboxInline>
          </FormGroup>
        </FormGrid>
      </Section>

      {/* Exclusivity (Brand only) */}
      {entityType === 'brand' && (
        <Section>
          <SectionTitle>{t('detail.exclusivity', 'Exclusivity')}</SectionTitle>
          <FormGrid>
            <FormGroup style={{ gridColumn: '1 / -1' }}>
              <CheckboxInline>
                <input type="checkbox" style={{ width: 16, height: 16, accentColor: '#635BFF' }}
                  checked={!!form.exclusivity_terms?.is_exclusive}
                  onChange={e => {
                    updateField('exclusivity_terms', { ...(form.exclusivity_terms || {}), is_exclusive: e.target.checked });
                    setTimeout(() => handleAutoSave(), 0);
                  }}
                  disabled={!isEditable} />
                {t('detail.isExclusive', 'Exclusive territory granted')}
              </CheckboxInline>
            </FormGroup>
            {form.exclusivity_terms?.is_exclusive && (
              <>
                <FormGroup style={{ gridColumn: '1 / -1' }}>
                  <Label>{t('detail.territoryDetail', 'Territory Detail')}</Label>
                  <AutoSaveField onSave={handleAutoSave}>
                    <TextArea rows={2}
                      value={form.exclusivity_terms?.territory_detail || ''}
                      onChange={e => updateField('exclusivity_terms', { ...(form.exclusivity_terms || {}), territory_detail: e.target.value })}
                      disabled={!isEditable} />
                  </AutoSaveField>
                </FormGroup>
                <FormGroup style={{ gridColumn: '1 / -1' }}>
                  <Label>{t('detail.salesTarget', 'Sales Target (for maintaining exclusivity)')}</Label>
                  <AutoSaveField onSave={handleAutoSave}>
                    <Input value={form.exclusivity_terms?.sales_target || ''}
                      onChange={e => updateField('exclusivity_terms', { ...(form.exclusivity_terms || {}), sales_target: e.target.value })}
                      disabled={!isEditable} placeholder={t('detail.salesTargetHint', 'e.g. MYR 500,000 per year') as string} />
                  </AutoSaveField>
                </FormGroup>
              </>
            )}
          </FormGrid>
        </Section>
      )}

      {/* Legal Terms */}
      <Section>
        <SectionTitle>{t('detail.legalTerms', 'Legal Terms')}</SectionTitle>
        <LegalTermsEditor
          value={form.legal_terms}
          onChange={v => updateField('legal_terms', v)}
          onSave={handleAutoSave}
          disabled={!isEditable}
        />
      </Section>
      </FormAccordionSection>
      <FormAccordionSection id="billing" title={t('detail.tabBilling', 'Billing') as string} status={sectionStatus('billing').status} statusLabel={sectionStatus('billing').label}>

      {/* Negotiated terms reference (from financial_terms) — read-only for cross-check */}
      {(() => {
        const ft = form.financial_terms || {};
        const rows: Array<{ label: string; value: string }> = [];
        const currency = contract?.entity_currency || 'MYR';
        const money = (v: any) => (v != null && v !== '' && Number.isFinite(Number(v))) ? `${currency} ${Number(v).toLocaleString('en-MY', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}` : null;
        if (entityType === 'brand') {
          const fee = money(ft.franchise_fee); if (fee) rows.push({ label: t('detail.franchiseFee', 'Franchise Fee') as string, value: fee });
          if (ft.royalty_value != null && ft.royalty_value !== '') {
            const isPct = ft.royalty_type === 'percent' || ft.royalty_type === 'percentage';
            rows.push({ label: t('detail.royalty', 'Royalty') as string, value: isPct ? `${ft.royalty_value}%` : (money(ft.royalty_value) || '—') });
          }
          const sys = money(ft.system_monthly_fee); if (sys) rows.push({ label: t('detail.systemMonthlyFee', 'System Fee (Monthly)') as string, value: `${sys}/mo` });
          const dep = money(ft.security_deposit); if (dep) rows.push({ label: t('detail.securityDeposit', 'Security Deposit') as string, value: dep });
        } else {
          let rent: number | null = null;
          if (Array.isArray(ft.rent_schedule) && ft.rent_schedule.length) {
            const y1 = ft.rent_schedule.find((r: any) => Number(r.year) === 1) || ft.rent_schedule[0];
            rent = y1?.base_rent != null ? Number(y1.base_rent) : null;
          }
          if (rent == null && ft.base_rent != null) rent = Number(ft.base_rent);
          if (rent != null) rows.push({ label: t('detail.baseRent', 'Base Rent') as string, value: `${money(rent)}/mo` });
          const mgmt = money(ft.maintenance_fee); if (mgmt) rows.push({ label: t('detail.maintenanceFee', 'Management Fee') as string, value: `${mgmt}/mo` });
          if (ft.percentage_rent?.rate != null && ft.percentage_rent.rate !== '') {
            rows.push({ label: t('detail.percentageRent', 'Percentage Rent') as string, value: `${ft.percentage_rent.rate}%` });
          }
          const dep = money(ft.security_deposit); if (dep) rows.push({ label: t('detail.securityDeposit', 'Security Deposit') as string, value: dep });
        }
        if (rows.length === 0) return null;
        return (
          <div style={{ background: '#F1F4F8', border: '1px solid #C7CED6', borderRadius: 6, padding: '12px 14px', marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#374151', textTransform: 'uppercase', letterSpacing: 0.3, marginBottom: 8 }}>
              {t('detail.negotiatedTerms', 'Negotiated Financial Terms (reference)')}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
              {rows.map((r, i) => (
                <div key={i} style={{ fontSize: 13 }}>
                  <span style={{ color: '#4B5563' }}>{r.label}:</span>
                  {' '}
                  <span style={{ color: '#0A2540', fontWeight: 600 }}>{r.value}</span>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 11, color: '#6B7280', marginTop: 8 }}>
              {t('detail.negotiatedTermsHint', 'Compare with actual plans and invoices below. Differences may be intentional (discounts, partial coverage, etc.).')}
            </div>
          </div>
        );
      })()}

      {/* Recurring Subscriptions (ContractPlans) + Billing Preview.
          Gated on brand_plans / fc_plans advanced-tier module. Basic-tier
          customers bill off financial_terms alone via the One-time Invoices below. */}
      {canUsePlans && (
        <LinkedPlansSection
          contractId={contract.id}
          entityId={contract.entity_id}
          plans={Array.isArray(form.plans) ? form.plans : []}
          currency={entityCurrency}
          entityType={entityType}
          canManage={['System Admin', 'Foodcourt General', 'Brand General'].includes(user?.role || '')}
          onChanged={fetchContract}
          t={t}
          financialTerms={form.financial_terms}
        />
      )}

      {/* One-time Invoices */}
      <Section>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 12, marginBottom: 16, paddingBottom: 10, borderBottom: '1px solid #F1F4F8'
        }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: '#0A2540', margin: 0 }}>
            {t('detail.oneTimeInvoices', 'One-time Invoices')}
          </h3>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => {
                const page = entityType === 'brand' ? '/pos/brand/invoices' : '/pos/foodcourt/invoices';
                window.open(`${page}?contract_id=${contractId}`, '_blank');
              }}
              style={{
                padding: '6px 12px', borderRadius: 6, fontSize: 12, fontWeight: 600,
                cursor: 'pointer', border: '1px solid #C7CED6',
                background: '#F1F4F8', color: '#374151', transition: 'all 0.15s'
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#F1F4F8'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#F1F4F8'; }}
            >
              {t('detail.viewAllContractInvoices', 'View all invoices')}
            </button>
            <button
              type="button"
              onClick={() => {
                const page = entityType === 'brand' ? '/pos/brand/invoices' : '/pos/foodcourt/invoices';
                window.open(`${page}?contract_id=${contractId}&action=create`, '_blank');
              }}
              disabled={!isEditable && contract.stage !== 'active'}
              style={{
                padding: '6px 12px', borderRadius: 6, fontSize: 12, fontWeight: 600,
                cursor: (!isEditable && contract.stage !== 'active') ? 'not-allowed' : 'pointer',
                border: '1px solid #635BFF',
                background: '#635BFF', color: 'white',
                opacity: (!isEditable && contract.stage !== 'active') ? 0.5 : 1,
                transition: 'all 0.15s'
              }}
              onMouseEnter={e => {
                const btn = e.currentTarget as HTMLButtonElement;
                if (!btn.disabled) { btn.style.background = '#5A51E6'; btn.style.borderColor = '#5A51E6'; }
              }}
              onMouseLeave={e => {
                const btn = e.currentTarget as HTMLButtonElement;
                if (!btn.disabled) { btn.style.background = '#635BFF'; btn.style.borderColor = '#635BFF'; }
              }}
            >
              {t('detail.issueOneTimeInvoice', 'Issue One-time Invoice')}
            </button>
          </div>
        </div>
        {Array.isArray(contract.invoices) && contract.invoices.length > 0 ? (
          <div style={{ marginBottom: 12 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 0.8fr 0.8fr 0.8fr', gap: 8, padding: '8px 12px', background: '#F1F4F8', fontWeight: 600, fontSize: 12, color: '#374151', borderRadius: 4 }}>
              <div>{t('detail.invoiceNumber', 'Invoice #')}</div>
              <div>{t('detail.category', 'Category')}</div>
              <div>{t('detail.amount', 'Amount')}</div>
              <div>{t('detail.status', 'Status')}</div>
              <div>{t('detail.dueDate', 'Due')}</div>
            </div>
            {contract.invoices.map((inv: any) => (
              <div key={inv.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 0.8fr 0.8fr 0.8fr', gap: 8, padding: '10px 12px', borderBottom: '1px solid #C7CED6', fontSize: 13, alignItems: 'center' }}>
                <div style={{ fontWeight: 600, color: '#0A2540' }}>{inv.invoice_number}</div>
                <div style={{ color: '#374151' }}>{inv.category_display_name || inv.invoice_category || '—'}</div>
                <div style={{ color: '#0A2540', fontWeight: 600 }}>{inv.currency || 'MYR'} {Number(inv.total_amount).toLocaleString('en-MY', { minimumFractionDigits: 2 })}</div>
                <div>
                  <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600,
                    background: inv.status === 'paid' ? '#D1FAE5' : inv.status === 'overdue' ? '#FEE2E2' : inv.status === 'pending_payment' ? '#FEF3C7' : '#C7CED6',
                    color: inv.status === 'paid' ? '#065F46' : inv.status === 'overdue' ? '#991B1B' : inv.status === 'pending_payment' ? '#92400E' : '#374151'
                  }}>{inv.status}</span>
                </div>
                <div style={{ color: '#4B5563' }}>{inv.due_date ? tzFormatDate(inv.due_date, null) : '—'}</div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ fontSize: 13, color: '#6B7280', textAlign: 'center', padding: 20 }}>
            {t('detail.noOneTimeInvoices', 'No one-time invoices for this contract yet.')}
          </div>
        )}
      </Section>

      </FormAccordionSection>
      <FormAccordionSection id="setup" title={t('detail.tabSetup', 'Setup') as string} status={sectionStatus('setup').status} statusLabel={sectionStatus('setup').label}>
      {/* Support Services */}
      <Section>
        <SectionTitle>{t('detail.supportServices', 'Support Services')}</SectionTitle>
        <div style={{ fontSize: 12, color: '#4B5563', marginBottom: 12 }}>
          {t('detail.supportServicesHint', 'Check services included in this contract. Checked items will auto-generate tasks when you enter the Setup stage.')}
        </div>
        <SupportServicesChecklist
          value={form.support_services}
          onChange={v => updateField('support_services', v)}
          onSave={handleAutoSave}
          disabled={!isEditable}
          template={supportServicesTemplate}
        />
      </Section>

      {/* Setup Checklist */}
      {['setup', 'active'].includes(contract.stage) && (
        <Section data-field-key="setup_tasks" className={fieldShellClass('setup_tasks')}>
          <SectionTitle>{t('detail.setupChecklist', 'Setup Checklist')}</SectionTitle>
          {contract.tasks?.map((task: any) => {
            const isReq = task.is_required !== false;
            return (
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
                color: task.is_completed ? '#4B5563' : '#0A2540',
                fontSize: '14px', flex: 1
              }}>
                {task.title}
              </span>
              {contract.stage === 'setup' && (
                <label
                  title={isReq ? t('detail.requiredTaskTooltip', 'Required task — must be completed before Active') as string : t('detail.optionalTaskTooltip', 'Optional task — can be completed later') as string}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: '11px', color: isReq ? '#92400E' : '#6B7280', cursor: 'pointer', padding: '2px 8px', borderRadius: 10, background: isReq ? '#FEF3C7' : '#F1F4F8', fontWeight: 600 }}
                >
                  <input
                    type="checkbox"
                    checked={isReq}
                    onChange={() => handleToggleTaskRequired(task.id, isReq)}
                    style={{ width: 12, height: 12, margin: 0 }}
                  />
                  {isReq ? t('detail.required', 'Required') : t('detail.optional', 'Optional')}
                </label>
              )}
              {task.completed_at && <NoteMeta>{tzFormatDate(task.completed_at, null)}</NoteMeta>}
            </CheckItem>
          );})}
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
      </FormAccordionSection>
      <FormAccordionSection id="documents" title={t('detail.tabDocuments', 'Documents') as string} status={sectionStatus('documents').status} statusLabel={sectionStatus('documents').label}>
      {/* Documents */}
      <Section>
        <SectionTitle>{t('detail.documents', 'Documents')}</SectionTitle>
        {isEditable && (
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', border: '1px solid #C7CED6', borderRadius: '6px', fontSize: '14px', fontWeight: 500, color: '#1F2937', cursor: 'pointer', transition: 'all 0.15s' }}>
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
            <span style={{ fontSize: '12px', color: '#6B7280', marginLeft: '8px' }}>PDF, DOC, JPG, PNG, XLS (max 10MB)</span>
          </div>
        )}
        {contract.documents && contract.documents.length > 0 ? (
          contract.documents.map((doc: any) => (
            <DocItem key={doc.id}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4B5563" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                <a href={doc.file_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '14px', color: '#635BFF', textDecoration: 'none', fontWeight: 500 }}>
                  {doc.file_name}
                </a>
                <NoteMeta>{doc.file_size ? `${(doc.file_size / 1024).toFixed(0)}KB` : ''}</NoteMeta>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <NoteMeta>{tzFormatDate(doc.createdAt || doc.created_at, null)}</NoteMeta>
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
          <div style={{ fontSize: '13px', color: '#6B7280', textAlign: 'center', padding: '16px' }}>
            {t('detail.noDocuments', 'No documents uploaded yet')}
          </div>
        )}
      </Section>
      </FormAccordionSection>
      </FormAccordion>

      {/* Comments (replaces Notes) */}
      <Section>
        <CommentSection
          entityType="contract"
          entityId={String(contractId)}
          currentUserId={user?.id}
          titleText={t('detail.notesComments', 'Notes & Comments') as string}
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
                  {h.changedByUser?.full_name} &middot; {tzFormatDate(h.createdAt || h.created_at, null)}
                </HistoryDate>
              </div>
            </HistoryItem>
          ))}
        </Section>
      )}

      {/* Action Buttons (mirrors header) */}
      <ButtonRow>
        {nextStage && (
          <Btn variant="primary" onClick={() => {
            if (nextDisabled) {
              setAttemptedSave(true);
              if (sectionRequirements.length > 0) {
                const first = sectionRequirements[0];
                openSectionAndScroll(first.section, first.fieldKey);
              }
              return;
            }
            handleStageTransition(nextStage);
          }} title={nextDisabledTitle}>
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
      {nextStage && nextDisabled && (
        <div style={{ fontSize: 12, color: '#DC2626', textAlign: 'right', marginTop: 8 }}>
          {nextDisabledTitle}
        </div>
      )}

      {/* Terminate Modal */}
      {terminateModal && (
        <ModalOverlay onClick={() => { setTerminateModal(false); setTerminateReason(''); }}>
          <ModalBox onClick={e => e.stopPropagation()}>
            <SectionTitle style={{ borderBottom: 'none', marginBottom: '8px' }}>{t('detail.terminateContract', 'Terminate Contract')}</SectionTitle>
            <p style={{ fontSize: '14px', color: '#4B5563', marginBottom: '12px' }}>{t('detail.terminationReasonPrompt', 'Enter termination reason:')}</p>
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
