import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { EmptyState } from '../../components/UI/TableComponents';
import { Modal as CommonModal, Container, Header, Title, Content } from '../../components/UI';
import { Tabs, Tab } from '../../components/Common/TabComponents';
import { useTabParam } from '../../hooks/useTabParam';
import { formatCurrency } from '../../utils/currency';
import CommentSection from '../../components/Common/CommentSection';
import { useAuth } from '../../contexts/AuthContext';

// ─── Types ───────────────────────────────────────────────────────

interface AddonItem {
  product_id: number;
  name: string;
  quantity: number;
  unit_price: number;
  subtotal?: number;
  total_price?: number;
}

interface LinkedUser {
  id: number;
  full_name: string;
  email: string;
  role: string;
}

interface LinkedInvoice {
  id: number;
  invoice_number: string;
  status: string;
  total_amount: number;
  currency: string;
}

interface HardwareQuote {
  id: number;
  quote_number: string;
  contact_name: string;
  contact_email: string;
  contact_phone?: string;
  company_name?: string;
  message?: string;
  country_code?: string;
  status: 'new' | 'contacted' | 'confirmed' | 'invoiced' | 'cancelled';
  admin_notes?: string;
  package_product_id?: number;
  package_snapshot?: { name: string; set_items?: { name: string; quantity: number }[] } | null;
  package_price: number;
  addon_items: AddonItem[];
  addon_total: number;
  total_amount: number;
  currency: string;
  plan_id?: number | null;
  billing_cycle?: string | null;
  plan_snapshot?: { display_name: string; base_price_monthly: number; base_price_annual: number; currency_prices?: Record<string, any> } | null;
  user_id?: number;
  user?: LinkedUser;
  restaurant_id?: number;
  invoice_id?: number;
  invoice?: LinkedInvoice;
  subscription_invoice_id?: number | null;
  subscription_invoice?: LinkedInvoice | null;
  packageProduct?: { id: number; name: string; set_group: string; set_tier: string } | null;
  created_at: string;
  updated_at: string;
  confirmed_at?: string;
  invoiced_at?: string;
}

interface Stats {
  total: number;
  new: number;
  contacted: number;
  confirmed: number;
  invoiced: number;
}

interface UserSearchResult {
  id: number;
  full_name: string;
  email: string;
  role: string;
}

// ─── Styled Components ──────────────────────────────────────────



const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`;

const StatCard = styled.div<{ color?: string }>`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${props => props.color || '#635BFF'};
`;

const StatValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #0A2540;
`;

const StatLabel = styled.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 4px;
`;

const FilterBar = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
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

const QuoteGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const QuoteCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

const QuoteHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;
`;

const QuoteInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const QuoteNumber = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #635BFF;
  margin-bottom: 8px;
  font-family: monospace;
`;

const QuoteName = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #374151;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const QuoteEmail = styled.div`
  font-size: 13px;
  color: #6B7C93;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const QuoteCompany = styled.div`
  font-size: 13px;
  color: #6B7280;
  margin-top: 2px;
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  flex-shrink: 0;
  background: ${props => {
    switch (props.status) {
      case 'new': return '#FEF3C7';
      case 'contacted': return '#DBEAFE';
      case 'confirmed': return '#ECFDF5';
      case 'invoiced': return '#F0F0FF';
      case 'cancelled': return '#F3F4F6';
      default: return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'new': return '#D97706';
      case 'contacted': return '#1E40AF';
      case 'confirmed': return '#059669';
      case 'invoiced': return '#635BFF';
      case 'cancelled': return '#6B7280';
      default: return '#6B7280';
    }
  }};
`;

const PackageBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  background: #F0F4FF;
  color: #635BFF;
  margin: 8px 0 4px 0;
`;

const AddonSummary = styled.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
`;

const TotalAmount = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #0A2540;
  margin: 4px 0;
`;

const CardSpacer = styled.div`
  flex: 1;
  min-height: 12px;
`;

const QuoteFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`;

const CloseQuoteButton = styled.button`
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 500;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  background: #fff;
  color: #6B7280;
  cursor: pointer;
  transition: all 0.15s;
  &:hover {
    background: #E5E7EB;
    color: #374151;
  }
`;

// Modal styled components

const SectionTitle = styled.h3`
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
  margin: 24px 0 12px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #E6EBF1;

  &:first-child {
    margin-top: 0;
  }
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
`;

const DetailItem = styled.div`
  font-size: 14px;
`;

const DetailItemLabel = styled.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
  text-transform: uppercase;
  font-weight: 600;
`;

const DetailItemValue = styled.div`
  font-size: 14px;
  color: #0A2540;
  word-break: break-word;
`;

const StatusSelect = styled.select`
  padding: 6px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 13px;
  background: white;
  cursor: pointer;
  font-weight: 500;
  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  padding: 8px 16px;
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
    &:hover { background: #5A51E6; }
  ` : props.variant === 'danger' ? `
    background: transparent;
    color: #DC2626;
    border-color: #FCA5A5;
    &:hover { background: #FEE2E2; }
  ` : `
    background: transparent;
    color: #6B7280;
    border-color: #E6EBF1;
    &:hover { background: #F8FAFC; color: #0A2540; }
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const MessageBlock = styled.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.6;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  white-space: pre-wrap;
  word-break: break-word;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`;

const FormTextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`;

const AddonRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  font-size: 14px;
  color: #374151;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  font-size: 16px;
  font-weight: 700;
  color: #0A2540;
  border-top: 2px solid #E6EBF1;
  margin-top: 8px;
`;

const LinkedUserBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #F0F4FF;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const LinkedUserInfo = styled.div`
  font-size: 14px;
  color: #0A2540;
`;

const UserSearchList = styled.div`
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
`;

const UserSearchItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.15s;

  &:hover {
    background: #F0F4FF;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const UserSearchName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
`;

const UserSearchEmail = styled.div`
  font-size: 12px;
  color: #6B7280;
`;

const InvoiceInfoBox = styled.div`
  padding: 12px 16px;
  background: #F5F3FF;
  border-radius: 8px;
  border-left: 3px solid #635BFF;
`;

const ChargeRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 8px;
`;

const InlineFormGroup = styled.div`
  flex: 1;
`;

// ─── Component ──────────────────────────────────────────────────

const NEW_STATUSES = ['new'];
const PROGRESS_STATUSES = ['contacted', 'confirmed'];
const CLOSED_STATUSES = ['invoiced', 'cancelled'];

const HardwareQuotesPage: React.FC = () => {
  const { user } = useAuth();
  const [quotes, setQuotes] = useState<HardwareQuote[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, new: 0, contacted: 0, confirmed: 0, invoiced: 0 });
  const [loading, setLoading] = useState(true);
  const [urlSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(urlSearchParams.get('search') || '');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, handleTabChange] = useTabParam<'new' | 'progress' | 'closed'>('new');

  // Detail modal
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<HardwareQuote | null>(null);
  const [detailStatus, setDetailStatus] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);

  // Delete confirm
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Link User modal
  const [showLinkUserModal, setShowLinkUserModal] = useState(false);
  const [userSearch, setUserSearch] = useState('');
  const [userResults, setUserResults] = useState<UserSearchResult[]>([]);
  const [searchingUsers, setSearchingUsers] = useState(false);

  // Create Invoice modal
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [invoiceDueDate, setInvoiceDueDate] = useState('');
  const [discountType, setDiscountType] = useState<'none' | 'percentage' | 'fixed'>('none');
  const [discountValue, setDiscountValue] = useState('');
  const [additionalCharges, setAdditionalCharges] = useState<Array<{ name: string; amount: string }>>([]);
  const [creatingInvoice, setCreatingInvoice] = useState(false);

  // Proceed Contract modal (for quotes with plan_id)
  const [showProceedModal, setShowProceedModal] = useState(false);
  const [proceedDueDate, setProceedDueDate] = useState('');
  const [proceedDiscountType, setProceedDiscountType] = useState<'none' | 'percentage' | 'fixed'>('none');
  const [proceedDiscountValue, setProceedDiscountValue] = useState('');
  const [proceedCharges, setProceedCharges] = useState<Array<{ name: string; amount: string }>>([]);
  const [proceedMarkAsPaid, setProceedMarkAsPaid] = useState(false);
  const [proceeding, setProceeding] = useState(false);
  const [proceedResult, setProceedResult] = useState<{ hardware_invoice?: string; subscription_invoice?: string } | null>(null);

  const getToken = () => localStorage.getItem('auth_token');

  const loadData = useCallback(async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      const token = getToken();
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (searchTerm) params.append('search', searchTerm);

      const [quotesRes, statsRes] = await Promise.all([
        fetch(`/api/hardware-quotes?${params}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('/api/hardware-quotes/stats', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      if (quotesRes.ok) {
        const data = await quotesRes.json();
        setQuotes(data.data || data);
      }
      if (statsRes.ok) {
        const data = await statsRes.json();
        setStats(data.data || data);
      }
    } catch (error) {
      console.error('Error loading hardware quotes:', error);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, statusFilter]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // 10-second polling
  useEffect(() => {
    const interval = setInterval(() => loadData(true), 10000);
    return () => clearInterval(interval);
  }, [loadData]);

  // Filter quotes by tab + search
  const filteredQuotes = quotes.filter(q => {
    const tabStatuses = activeTab === 'new' ? NEW_STATUSES : activeTab === 'progress' ? PROGRESS_STATUSES : CLOSED_STATUSES;
    return tabStatuses.includes(q.status);
  });

  const newCount = quotes.filter(q => NEW_STATUSES.includes(q.status)).length;
  const progressCount = quotes.filter(q => PROGRESS_STATUSES.includes(q.status)).length;
  const closedCount = quotes.filter(q => CLOSED_STATUSES.includes(q.status)).length;

  const getAddonSummary = (addons: AddonItem[] | undefined): string => {
    if (!addons || addons.length === 0) return '';
    return '+ ' + addons.map(a => `${a.name} x${a.quantity}`).join(', ');
  };

  const openDetail = async (quote: HardwareQuote) => {
    try {
      const token = getToken();
      const res = await fetch(`/api/hardware-quotes/${quote.id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        const fullQuote = data.data || data;
        setSelectedQuote(fullQuote);
        setDetailStatus(fullQuote.status);
        setAdminNotes(fullQuote.admin_notes || '');
        setShowDetailModal(true);
      }
    } catch (error) {
      console.error('Error loading quote detail:', error);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!selectedQuote) return;
    setDetailStatus(newStatus);
    try {
      const token = getToken();
      const response = await fetch(`/api/hardware-quotes/${selectedQuote.id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        setQuotes(prev => prev.map(q =>
          q.id === selectedQuote.id ? { ...q, status: newStatus as HardwareQuote['status'] } : q
        ));
        setSelectedQuote(prev => prev ? { ...prev, status: newStatus as HardwareQuote['status'] } : null);
        loadData(true);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedQuote) return;
    setSavingNotes(true);
    try {
      const token = getToken();
      const response = await fetch(`/api/hardware-quotes/${selectedQuote.id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ admin_notes: adminNotes })
      });
      if (response.ok) {
        setSelectedQuote(prev => prev ? { ...prev, admin_notes: adminNotes } : null);
      }
    } catch (error) {
      console.error('Error saving notes:', error);
    } finally {
      setSavingNotes(false);
    }
  };

  const handleCloseQuote = async (quote: HardwareQuote) => {
    try {
      const token = getToken();
      const response = await fetch(`/api/hardware-quotes/${quote.id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'cancelled' })
      });
      if (response.ok) {
        setQuotes(prev => prev.map(q =>
          q.id === quote.id ? { ...q, status: 'cancelled' as HardwareQuote['status'] } : q
        ));
        loadData(true);
      }
    } catch (error) {
      console.error('Error closing quote:', error);
    }
  };

  const handleStartProcess = async (quote: HardwareQuote) => {
    try {
      const token = getToken();
      const response = await fetch(`/api/hardware-quotes/${quote.id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'contacted' })
      });
      if (response.ok) {
        setQuotes(prev => prev.map(q =>
          q.id === quote.id ? { ...q, status: 'contacted' as HardwareQuote['status'] } : q
        ));
        loadData(true);
      }
    } catch (error) {
      console.error('Error starting process:', error);
    }
  };

  const deleteQuote = async () => {
    if (!selectedQuote) return;
    try {
      const token = getToken();
      await fetch(`/api/hardware-quotes/${selectedQuote.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setShowDeleteConfirm(false);
      setShowDetailModal(false);
      loadData();
    } catch (error) {
      console.error('Error deleting quote:', error);
    }
  };

  // Link User
  const openLinkUserModal = () => {
    setUserSearch('');
    setUserResults([]);
    setShowLinkUserModal(true);
  };

  const searchUsers = useCallback(async (term: string) => {
    if (term.length < 2) {
      setUserResults([]);
      return;
    }
    setSearchingUsers(true);
    try {
      const token = getToken();
      const res = await fetch(`/api/users?search=${encodeURIComponent(term)}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        const users = Array.isArray(data) ? data : (data.data || []);
        setUserResults(users.slice(0, 20).map((u: UserSearchResult) => ({
          id: u.id,
          full_name: u.full_name,
          email: u.email,
          role: u.role
        })));
      }
    } catch (error) {
      console.error('Error searching users:', error);
    } finally {
      setSearchingUsers(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (userSearch) searchUsers(userSearch);
    }, 300);
    return () => clearTimeout(timer);
  }, [userSearch, searchUsers]);

  const linkUser = async (userId: number) => {
    if (!selectedQuote) return;
    try {
      const token = getToken();
      const res = await fetch(`/api/hardware-quotes/${selectedQuote.id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id: userId })
      });
      if (res.ok) {
        setShowLinkUserModal(false);
        openDetail(selectedQuote);
      }
    } catch (error) {
      console.error('Error linking user:', error);
    }
  };

  // Create Invoice
  const openInvoiceModal = () => {
    const defaultDue = new Date();
    defaultDue.setDate(defaultDue.getDate() + 14);
    setInvoiceDueDate(defaultDue.toISOString().split('T')[0]);
    setDiscountType('none');
    setDiscountValue('');
    setAdditionalCharges([]);
    setShowDetailModal(false);
    setTimeout(() => setShowInvoiceModal(true), 200);
  };

  const addCharge = () => {
    setAdditionalCharges(prev => [...prev, { name: '', amount: '' }]);
  };

  const updateCharge = (index: number, field: 'name' | 'amount', value: string) => {
    setAdditionalCharges(prev => prev.map((c, i) => i === index ? { ...c, [field]: value } : c));
  };

  const removeCharge = (index: number) => {
    setAdditionalCharges(prev => prev.filter((_, i) => i !== index));
  };

  const calculateInvoiceTotal = (): number => {
    if (!selectedQuote) return 0;
    let total = selectedQuote.total_amount;

    if (discountType === 'percentage' && discountValue) {
      total -= total * (parseFloat(discountValue) / 100);
    } else if (discountType === 'fixed' && discountValue) {
      total -= parseFloat(discountValue);
    }

    additionalCharges.forEach(c => {
      if (c.amount) total += parseFloat(c.amount);
    });

    return Math.max(0, total);
  };

  const createInvoice = async () => {
    if (!selectedQuote) return;
    setCreatingInvoice(true);
    try {
      const token = getToken();
      const body: Record<string, unknown> = {
        due_date: invoiceDueDate
      };

      if (discountType !== 'none' && discountValue) {
        body.discount_type = discountType;
        body.discount_value = parseFloat(discountValue);
      }

      const validCharges = additionalCharges.filter(c => c.name && c.amount);
      if (validCharges.length > 0) {
        body.additional_charges = validCharges.map(c => ({
          name: c.name,
          amount: parseFloat(c.amount)
        }));
      }

      const res = await fetch(`/api/hardware-quotes/${selectedQuote.id}/invoice`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        setShowInvoiceModal(false);
        setShowDetailModal(false);
        loadData();
      } else {
        const err = await res.json();
        alert(err.message || 'Failed to create invoice');
      }
    } catch (error) {
      console.error('Error creating invoice:', error);
    } finally {
      setCreatingInvoice(false);
    }
  };

  // Proceed Contract (for quotes with plan_id)
  const openProceedModal = () => {
    const defaultDue = new Date();
    defaultDue.setDate(defaultDue.getDate() + 14);
    setProceedDueDate(defaultDue.toISOString().split('T')[0]);
    setProceedDiscountType('none');
    setProceedDiscountValue('');
    setProceedCharges([]);
    setProceedMarkAsPaid(false);
    setProceedResult(null);
    setShowDetailModal(false);
    setTimeout(() => setShowProceedModal(true), 200);
  };

  const addProceedCharge = () => {
    setProceedCharges(prev => [...prev, { name: '', amount: '' }]);
  };

  const updateProceedCharge = (index: number, field: 'name' | 'amount', value: string) => {
    setProceedCharges(prev => prev.map((c, i) => i === index ? { ...c, [field]: value } : c));
  };

  const removeProceedCharge = (index: number) => {
    setProceedCharges(prev => prev.filter((_, i) => i !== index));
  };

  const calculateProceedTotal = (): number => {
    if (!selectedQuote) return 0;
    let total = selectedQuote.total_amount;

    if (proceedDiscountType === 'percentage' && proceedDiscountValue) {
      total -= total * (parseFloat(proceedDiscountValue) / 100);
    } else if (proceedDiscountType === 'fixed' && proceedDiscountValue) {
      total -= parseFloat(proceedDiscountValue);
    }

    proceedCharges.forEach(c => {
      if (c.amount) total += parseFloat(c.amount);
    });

    return Math.max(0, total);
  };

  const proceedContract = async () => {
    if (!selectedQuote) return;
    setProceeding(true);
    try {
      const token = getToken();
      const body: Record<string, unknown> = {
        due_date: proceedDueDate,
        mark_as_paid: proceedMarkAsPaid,
      };

      if (proceedDiscountType !== 'none' && proceedDiscountValue) {
        body.discount_type = proceedDiscountType;
        body.discount_value = parseFloat(proceedDiscountValue);
      }

      const validCharges = proceedCharges.filter(c => c.name && c.amount);
      if (validCharges.length > 0) {
        body.additional_charges = validCharges.map(c => ({
          name: c.name,
          amount: parseFloat(c.amount)
        }));
      }

      const res = await fetch(`/api/hardware-quotes/${selectedQuote.id}/proceed`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        const data = await res.json();
        setProceedResult({
          hardware_invoice: data.data?.hardware_invoice?.invoice_number || data.hardware_invoice?.invoice_number,
          subscription_invoice: data.data?.subscription_invoice?.invoice_number || data.subscription_invoice?.invoice_number,
        });
        loadData(true);
      } else {
        const err = await res.json();
        alert(err.message || 'Failed to proceed contract');
      }
    } catch (error) {
      console.error('Error proceeding contract:', error);
    } finally {
      setProceeding(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      new: 'New',
      contacted: 'In Progress',
      confirmed: 'Confirmed',
      invoiced: 'Invoiced',
      cancelled: 'Closed'
    };
    return labels[status] || status.charAt(0).toUpperCase() + status.slice(1);
  };

  const quoteCurrency = selectedQuote?.currency || 'MYR';

  return (
    <>
      <Container>
        <Header>
          <Title>Hardware Quotes</Title>
        </Header>

        <Content>
          <StatsGrid>
            <StatCard color="#635BFF">
              <StatValue>{stats.total}</StatValue>
              <StatLabel>Total</StatLabel>
            </StatCard>
            <StatCard color="#F59E0B">
              <StatValue>{stats.new}</StatValue>
              <StatLabel>New</StatLabel>
            </StatCard>
            <StatCard color="#3B82F6">
              <StatValue>{stats.contacted}</StatValue>
              <StatLabel>Contacted</StatLabel>
            </StatCard>
            <StatCard color="#10B981">
              <StatValue>{stats.confirmed}</StatValue>
              <StatLabel>Confirmed</StatLabel>
            </StatCard>
            <StatCard color="#8B5CF6">
              <StatValue>{stats.invoiced}</StatValue>
              <StatLabel>Invoiced</StatLabel>
            </StatCard>
          </StatsGrid>

          <Tabs>
            <Tab active={activeTab === 'new'} onClick={() => handleTabChange('new')}>
              New ({newCount})
            </Tab>
            <Tab active={activeTab === 'progress'} onClick={() => handleTabChange('progress')}>
              In Progress ({progressCount})
            </Tab>
            <Tab active={activeTab === 'closed'} onClick={() => handleTabChange('closed')}>
              Closed ({closedCount})
            </Tab>
          </Tabs>

          <FilterBar>
            <SearchInput
              placeholder="Search by name, email, company, quote number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FilterSelect
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              {activeTab === 'new' ? (
                <option value="new">New</option>
              ) : activeTab === 'progress' ? (
                <>
                  <option value="contacted">Contacted</option>
                  <option value="confirmed">Confirmed</option>
                </>
              ) : (
                <>
                  <option value="invoiced">Invoiced</option>
                  <option value="cancelled">Cancelled</option>
                </>
              )}
            </FilterSelect>
          </FilterBar>

          {loading ? (
            <EmptyState>Loading...</EmptyState>
          ) : filteredQuotes.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: '#6B7280',
              gridColumn: '1 / -1'
            }}>
              <h3 style={{ color: '#374151', marginBottom: '8px' }}>
                No {activeTab === 'new' ? 'new' : activeTab === 'progress' ? 'in progress' : 'closed'} quotes
              </h3>
              <p>Hardware quotes will appear here when submitted.</p>
            </div>
          ) : (
            <QuoteGrid>
              {filteredQuotes.map((quote) => (
                <QuoteCard key={quote.id} onClick={() => openDetail(quote)}>
                  <QuoteHeader>
                    <QuoteInfo>
                      <QuoteNumber>{quote.quote_number}</QuoteNumber>
                      <QuoteName>{quote.contact_name}</QuoteName>
                      <QuoteEmail>{quote.contact_email}</QuoteEmail>
                      {quote.company_name && (
                        <QuoteCompany>{quote.company_name}</QuoteCompany>
                      )}
                    </QuoteInfo>
                    <StatusBadge status={quote.status}>
                      {formatStatusLabel(quote.status)}
                    </StatusBadge>
                  </QuoteHeader>

                  <PackageBadge>{quote.packageProduct?.name || quote.package_snapshot?.name || 'N/A'}</PackageBadge>
                  {quote.plan_id && (
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 600,
                      background: '#ECFDF5',
                      color: '#059669',
                      marginBottom: '4px',
                    }}>
                      + Subscription: {quote.plan_snapshot?.display_name || 'Plan'} ({quote.billing_cycle || 'monthly'})
                    </span>
                  )}
                  {quote.addon_items && quote.addon_items.length > 0 && (
                    <AddonSummary>{getAddonSummary(quote.addon_items)}</AddonSummary>
                  )}

                  <TotalAmount>
                    {formatCurrency(quote.total_amount, quote.currency)}
                  </TotalAmount>

                  {quote.invoice_id && (
                    <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ padding: '3px 8px', fontSize: '11px', fontWeight: 600, background: '#ECFDF5', color: '#059669', borderRadius: '4px' }}>Invoice Created</span>
                      {quote.invoice?.invoice_number && (
                        <a
                          href={`/pos/admin/invoices?search=${quote.invoice.invoice_number}`}
                          onClick={(e) => e.stopPropagation()}
                          style={{ fontSize: '11px', color: '#635BFF', textDecoration: 'none', fontWeight: 500 }}
                        >
                          {quote.invoice.invoice_number} →
                        </a>
                      )}
                    </div>
                  )}

                  <CardSpacer />

                  <QuoteFooter>
                    <span>{formatDate(quote.created_at)}</span>
                    {activeTab === 'new' && (
                      <CloseQuoteButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStartProcess(quote);
                        }}
                        style={{ background: '#F0F0FF', color: '#635BFF', borderColor: '#635BFF' }}
                      >
                        Start Process
                      </CloseQuoteButton>
                    )}
                    {activeTab === 'progress' && (
                      <CloseQuoteButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCloseQuote(quote);
                        }}
                      >
                        Close
                      </CloseQuoteButton>
                    )}
                  </QuoteFooter>
                </QuoteCard>
              ))}
            </QuoteGrid>
          )}
        </Content>

        {/* Detail Modal */}
        {showDetailModal && selectedQuote && (
          <CommonModal
            isOpen={true}
            onClose={() => setShowDetailModal(false)}
            title={`Quote ${selectedQuote.quote_number}`}
            footer={
              <>
                <ActionButton variant="danger" onClick={() => setShowDeleteConfirm(true)}>
                  Delete
                </ActionButton>
                <div style={{ flex: 1 }} />
                {selectedQuote.status !== 'invoiced' && selectedQuote.status !== 'cancelled' && !selectedQuote.invoice_id && (
                  selectedQuote.plan_id ? (
                    <ActionButton variant="primary" onClick={() => openProceedModal()}>
                      Proceed Contract
                    </ActionButton>
                  ) : (
                    <ActionButton variant="primary" onClick={() => openInvoiceModal()}>
                      Create Invoice
                    </ActionButton>
                  )
                )}
                <ActionButton onClick={() => setShowDetailModal(false)}>
                  Close
                </ActionButton>
              </>
            }
          >
            {/* Quote Info */}
            <SectionTitle style={{ marginTop: 0 }}>Quote Info</SectionTitle>
            <DetailGrid>
              <DetailItem>
                <DetailItemLabel>Quote Number</DetailItemLabel>
                <DetailItemValue style={{ fontFamily: 'monospace' }}>{selectedQuote.quote_number}</DetailItemValue>
              </DetailItem>
              <DetailItem>
                <DetailItemLabel>Status</DetailItemLabel>
                <DetailItemValue>
                  <StatusSelect
                    value={detailStatus}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    disabled={detailStatus === 'invoiced'}
                  >
                    <option value="new">New</option>
                    <option value="contacted">In Progress</option>
                    <option value="confirmed">Confirmed</option>
                    {detailStatus === 'invoiced' && <option value="invoiced">Invoiced</option>}
                    <option value="cancelled">Closed</option>
                  </StatusSelect>
                </DetailItemValue>
              </DetailItem>
              <DetailItem>
                <DetailItemLabel>Created</DetailItemLabel>
                <DetailItemValue>{formatDate(selectedQuote.created_at)}</DetailItemValue>
              </DetailItem>
            </DetailGrid>

            {/* Customer Info */}
            <SectionTitle>Customer Info</SectionTitle>
            <DetailGrid>
              <DetailItem>
                <DetailItemLabel>Name</DetailItemLabel>
                <DetailItemValue>{selectedQuote.contact_name}</DetailItemValue>
              </DetailItem>
              <DetailItem>
                <DetailItemLabel>Email</DetailItemLabel>
                <DetailItemValue>{selectedQuote.contact_email}</DetailItemValue>
              </DetailItem>
              {selectedQuote.contact_phone && (
                <DetailItem>
                  <DetailItemLabel>Phone</DetailItemLabel>
                  <DetailItemValue>{selectedQuote.contact_phone}</DetailItemValue>
                </DetailItem>
              )}
              {selectedQuote.company_name && (
                <DetailItem>
                  <DetailItemLabel>Company</DetailItemLabel>
                  <DetailItemValue>{selectedQuote.company_name}</DetailItemValue>
                </DetailItem>
              )}
            </DetailGrid>

            {/* Linked User */}
            <SectionTitle>Linked User</SectionTitle>
            {selectedQuote.user ? (
              <LinkedUserBox>
                <LinkedUserInfo>
                  <strong>{selectedQuote.user.full_name}</strong>
                  <span style={{ color: '#6B7280', marginLeft: 8 }}>({selectedQuote.user.email})</span>
                  <span style={{ color: '#635BFF', marginLeft: 8, fontSize: 12 }}>{selectedQuote.user.role}</span>
                </LinkedUserInfo>
                <ActionButton onClick={openLinkUserModal}>Change</ActionButton>
              </LinkedUserBox>
            ) : (
              <LinkedUserBox style={{ background: '#F9FAFB' }}>
                <LinkedUserInfo style={{ color: '#6B7280' }}>Not linked</LinkedUserInfo>
                <ActionButton variant="primary" onClick={openLinkUserModal}>Link User</ActionButton>
              </LinkedUserBox>
            )}

            {/* Quote Details */}
            <SectionTitle>Quote Details</SectionTitle>
            <div style={{ background: '#F8FAFC', borderRadius: 8, padding: 16, marginBottom: 16 }}>
              <AddonRow>
                <div>
                  <strong>{selectedQuote.packageProduct?.name || selectedQuote.package_snapshot?.name || 'N/A'}</strong>
                  <span style={{ color: '#6B7280', marginLeft: 8 }}>
                    ({selectedQuote.packageProduct?.set_group || ''} - {selectedQuote.packageProduct?.set_tier || ''})
                  </span>
                </div>
                <div style={{ fontWeight: 600 }}>{formatCurrency(selectedQuote.package_price, quoteCurrency)}</div>
              </AddonRow>

              {selectedQuote.addon_items && selectedQuote.addon_items.length > 0 && (
                <>
                  <div style={{ fontSize: 12, color: '#6B7280', marginTop: 12, marginBottom: 8, fontWeight: 600, textTransform: 'uppercase' as const }}>
                    Add-ons
                  </div>
                  {selectedQuote.addon_items.map((addon, idx) => (
                    <AddonRow key={idx}>
                      <div>{addon.name} x {addon.quantity}</div>
                      <div>{formatCurrency(addon.subtotal || addon.total_price || (addon.unit_price * addon.quantity), quoteCurrency)}</div>
                    </AddonRow>
                  ))}
                </>
              )}

              <TotalRow>
                <div>Total</div>
                <div>{formatCurrency(selectedQuote.total_amount, quoteCurrency)}</div>
              </TotalRow>
            </div>

            {/* Subscription Plan Info */}
            {selectedQuote.plan_id && selectedQuote.plan_snapshot && (
              <>
                <SectionTitle>Subscription Plan</SectionTitle>
                <div style={{ background: '#ECFDF5', borderRadius: 8, padding: 16, marginBottom: 16, borderLeft: '3px solid #059669' }}>
                  <DetailGrid style={{ marginBottom: 0 }}>
                    <DetailItem>
                      <DetailItemLabel>Plan</DetailItemLabel>
                      <DetailItemValue style={{ fontWeight: 600 }}>{selectedQuote.plan_snapshot.display_name}</DetailItemValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailItemLabel>Billing Cycle</DetailItemLabel>
                      <DetailItemValue style={{ textTransform: 'capitalize' }}>{selectedQuote.billing_cycle || 'monthly'}</DetailItemValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailItemLabel>Monthly Price</DetailItemLabel>
                      <DetailItemValue>
                        {formatCurrency(
                          selectedQuote.plan_snapshot.currency_prices?.[quoteCurrency]?.monthly || selectedQuote.plan_snapshot.base_price_monthly,
                          quoteCurrency
                        )}/mo
                      </DetailItemValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailItemLabel>Annual Price</DetailItemLabel>
                      <DetailItemValue>
                        {formatCurrency(
                          selectedQuote.plan_snapshot.currency_prices?.[quoteCurrency]?.annual || selectedQuote.plan_snapshot.base_price_annual,
                          quoteCurrency
                        )}/yr
                      </DetailItemValue>
                    </DetailItem>
                  </DetailGrid>
                </div>
              </>
            )}

            {/* Customer Message */}
            {selectedQuote.message && (
              <>
                <SectionTitle>Customer Message</SectionTitle>
                <MessageBlock>{selectedQuote.message}</MessageBlock>
              </>
            )}

            {/* Admin Notes */}
            <SectionTitle>Admin Notes</SectionTitle>
            <FormGroup style={{ marginBottom: 0 }}>
              <FormTextArea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Add internal notes..."
                style={{ minHeight: 80 }}
              />
              <div style={{ marginTop: 8, textAlign: 'right' }}>
                <ActionButton
                  variant="primary"
                  onClick={handleSaveNotes}
                  disabled={savingNotes || adminNotes === (selectedQuote.admin_notes || '')}
                >
                  {savingNotes ? 'Saving...' : 'Save Notes'}
                </ActionButton>
              </div>
            </FormGroup>

            {/* Comments */}
            <CommentSection
              entityType="hardware_quote"
              entityId={String(selectedQuote.id)}
              currentUserId={user?.id ? Number(user.id) : undefined}
            />

            {/* Invoice Info */}
            {selectedQuote.invoice && (
              <>
                <SectionTitle>Hardware Invoice</SectionTitle>
                <InvoiceInfoBox>
                  <DetailGrid style={{ marginBottom: 0 }}>
                    <DetailItem>
                      <DetailItemLabel>Invoice Number</DetailItemLabel>
                      <DetailItemValue>
                        <a href={`/pos/admin/invoices?search=${selectedQuote.invoice.invoice_number}`} style={{ fontFamily: 'monospace', color: '#635BFF', textDecoration: 'none', fontWeight: 600 }}>
                          {selectedQuote.invoice.invoice_number} →
                        </a>
                      </DetailItemValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailItemLabel>Status</DetailItemLabel>
                      <DetailItemValue>
                        <StatusBadge status={selectedQuote.invoice.status}>
                          {formatStatusLabel(selectedQuote.invoice.status)}
                        </StatusBadge>
                      </DetailItemValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailItemLabel>Amount</DetailItemLabel>
                      <DetailItemValue style={{ fontWeight: 600 }}>
                        {formatCurrency(selectedQuote.invoice.total_amount, selectedQuote.invoice.currency)}
                      </DetailItemValue>
                    </DetailItem>
                  </DetailGrid>
                </InvoiceInfoBox>
              </>
            )}

            {/* Subscription Invoice Info */}
            {selectedQuote.subscription_invoice && (
              <>
                <SectionTitle>Subscription Invoice</SectionTitle>
                <InvoiceInfoBox style={{ borderLeftColor: '#059669' }}>
                  <DetailGrid style={{ marginBottom: 0 }}>
                    <DetailItem>
                      <DetailItemLabel>Invoice Number</DetailItemLabel>
                      <DetailItemValue>
                        <a href={`/pos/admin/invoices?search=${selectedQuote.subscription_invoice.invoice_number}`} style={{ fontFamily: 'monospace', color: '#635BFF', textDecoration: 'none', fontWeight: 600 }}>
                          {selectedQuote.subscription_invoice.invoice_number} →
                        </a>
                      </DetailItemValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailItemLabel>Status</DetailItemLabel>
                      <DetailItemValue>
                        <StatusBadge status={selectedQuote.subscription_invoice.status}>
                          {formatStatusLabel(selectedQuote.subscription_invoice.status)}
                        </StatusBadge>
                      </DetailItemValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailItemLabel>Amount</DetailItemLabel>
                      <DetailItemValue style={{ fontWeight: 600 }}>
                        {formatCurrency(selectedQuote.subscription_invoice.total_amount, selectedQuote.subscription_invoice.currency)}
                      </DetailItemValue>
                    </DetailItem>
                  </DetailGrid>
                </InvoiceInfoBox>
              </>
            )}
          </CommonModal>
        )}

        {/* Link User Modal */}
        {showLinkUserModal && (
          <CommonModal
            isOpen={true}
            onClose={() => setShowLinkUserModal(false)}
            title="Link User to Quote"
            footer={
              <ActionButton onClick={() => setShowLinkUserModal(false)}>Cancel</ActionButton>
            }
          >
            <FormGroup>
              <FormLabel>Search users by name or email</FormLabel>
              <FormInput
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                placeholder="Type at least 2 characters..."
                autoFocus
              />
            </FormGroup>

            {searchingUsers && <div style={{ textAlign: 'center', color: '#6B7280', padding: 16 }}>Searching...</div>}

            {userResults.length > 0 && (
              <UserSearchList>
                {userResults.map((u) => (
                  <UserSearchItem key={u.id} onClick={() => linkUser(u.id)}>
                    <UserSearchName>{u.full_name}</UserSearchName>
                    <UserSearchEmail>{u.email} - {u.role}</UserSearchEmail>
                  </UserSearchItem>
                ))}
              </UserSearchList>
            )}

            {userSearch.length >= 2 && !searchingUsers && userResults.length === 0 && (
              <div style={{ textAlign: 'center', color: '#6B7280', padding: 16 }}>No users found</div>
            )}
          </CommonModal>
        )}

        {/* Create Invoice Modal */}
        {showInvoiceModal && selectedQuote && (
          <CommonModal
            isOpen={true}
            onClose={() => setShowInvoiceModal(false)}
            title="Create Invoice from Quote"
            footer={
              <>
                <ActionButton onClick={() => setShowInvoiceModal(false)}>Cancel</ActionButton>
                <ActionButton variant="primary" onClick={createInvoice} disabled={creatingInvoice}>
                  {creatingInvoice ? 'Creating...' : 'Create Invoice'}
                </ActionButton>
              </>
            }
          >
            {/* Quote Summary */}
            <SectionTitle style={{ marginTop: 0 }}>Quote Summary</SectionTitle>
            <div style={{ background: '#F8FAFC', borderRadius: 8, padding: 16, marginBottom: 20 }}>
              <AddonRow>
                <div><strong>{selectedQuote.packageProduct?.name || selectedQuote.package_snapshot?.name || 'N/A'}</strong> ({selectedQuote.packageProduct?.set_group || ''} - {selectedQuote.packageProduct?.set_tier || ''})</div>
                <div>{formatCurrency(selectedQuote.package_price, quoteCurrency)}</div>
              </AddonRow>
              {selectedQuote.addon_items && selectedQuote.addon_items.map((addon, idx) => (
                <AddonRow key={idx}>
                  <div>{addon.name} x {addon.quantity}</div>
                  <div>{formatCurrency(addon.subtotal || addon.total_price || (addon.unit_price * addon.quantity), quoteCurrency)}</div>
                </AddonRow>
              ))}
              <TotalRow>
                <div>Subtotal</div>
                <div>{formatCurrency(selectedQuote.total_amount, quoteCurrency)}</div>
              </TotalRow>
            </div>

            {/* Due Date */}
            <FormGroup>
              <FormLabel>Due Date</FormLabel>
              <FormInput
                type="date"
                value={invoiceDueDate}
                onChange={(e) => setInvoiceDueDate(e.target.value)}
              />
            </FormGroup>

            {/* Discount */}
            <FormGroup>
              <FormLabel>Discount</FormLabel>
              <div style={{ display: 'flex', gap: 12 }}>
                <FormSelect
                  style={{ width: 'auto', minWidth: 150 }}
                  value={discountType}
                  onChange={(e) => setDiscountType(e.target.value as 'none' | 'percentage' | 'fixed')}
                >
                  <option value="none">No Discount</option>
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed Amount</option>
                </FormSelect>
                {discountType !== 'none' && (
                  <FormInput
                    type="number"
                    min="0"
                    step="0.01"
                    value={discountValue}
                    onChange={(e) => setDiscountValue(e.target.value)}
                    placeholder={discountType === 'percentage' ? 'e.g. 10' : 'e.g. 50.00'}
                    style={{ width: 150 }}
                  />
                )}
              </div>
            </FormGroup>

            {/* Additional Charges */}
            <FormGroup>
              <FormLabel>Additional Charges</FormLabel>
              {additionalCharges.map((charge, idx) => (
                <ChargeRow key={idx}>
                  <InlineFormGroup>
                    <FormInput
                      value={charge.name}
                      onChange={(e) => updateCharge(idx, 'name', e.target.value)}
                      placeholder="Charge name"
                    />
                  </InlineFormGroup>
                  <InlineFormGroup>
                    <FormInput
                      type="number"
                      min="0"
                      step="0.01"
                      value={charge.amount}
                      onChange={(e) => updateCharge(idx, 'amount', e.target.value)}
                      placeholder="Amount"
                    />
                  </InlineFormGroup>
                  <ActionButton variant="danger" onClick={() => removeCharge(idx)} style={{ flexShrink: 0 }}>
                    Remove
                  </ActionButton>
                </ChargeRow>
              ))}
              <ActionButton onClick={addCharge} style={{ marginTop: 8 }}>
                + Add Charge
              </ActionButton>
            </FormGroup>

            {/* Calculated Total */}
            <TotalRow style={{ fontSize: 18 }}>
              <div>Invoice Total</div>
              <div>{formatCurrency(calculateInvoiceTotal(), quoteCurrency)}</div>
            </TotalRow>
          </CommonModal>
        )}

        {/* Proceed Contract Modal */}
        {showProceedModal && selectedQuote && (
          <CommonModal
            isOpen={true}
            onClose={() => { setShowProceedModal(false); setProceedResult(null); }}
            title="Proceed Contract"
            footer={
              proceedResult ? (
                <ActionButton onClick={() => { setShowProceedModal(false); setShowDetailModal(false); setProceedResult(null); loadData(); }}>
                  Close
                </ActionButton>
              ) : (
                <>
                  <ActionButton onClick={() => setShowProceedModal(false)}>Cancel</ActionButton>
                  <ActionButton variant="primary" onClick={proceedContract} disabled={proceeding || !selectedQuote.user_id}>
                    {proceeding ? 'Processing...' : 'Proceed Contract'}
                  </ActionButton>
                </>
              )
            }
          >
            {proceedResult ? (
              <div style={{ background: '#ECFDF5', border: '1px solid #10B981', borderRadius: 8, padding: 24, textAlign: 'center', color: '#065F46', lineHeight: 1.6 }}>
                <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Contract Created Successfully</div>
                {proceedResult.hardware_invoice && (
                  <div>Hardware Invoice: <strong style={{ fontFamily: 'monospace' }}>{proceedResult.hardware_invoice}</strong></div>
                )}
                {proceedResult.subscription_invoice && (
                  <div>Subscription Invoice: <strong style={{ fontFamily: 'monospace' }}>{proceedResult.subscription_invoice}</strong></div>
                )}
              </div>
            ) : (
              <>
                {!selectedQuote.user_id && (
                  <div style={{ background: '#FEF3C7', border: '1px solid #F59E0B', borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 13, color: '#92400E' }}>
                    A linked user is required to proceed. Please link a user first.
                  </div>
                )}

                {/* Hardware Summary */}
                <SectionTitle style={{ marginTop: 0 }}>Hardware</SectionTitle>
                <div style={{ background: '#F8FAFC', borderRadius: 8, padding: 16, marginBottom: 20 }}>
                  <AddonRow>
                    <div><strong>{selectedQuote.packageProduct?.name || selectedQuote.package_snapshot?.name || 'N/A'}</strong></div>
                    <div>{formatCurrency(selectedQuote.package_price, quoteCurrency)}</div>
                  </AddonRow>
                  {selectedQuote.addon_items && selectedQuote.addon_items.map((addon, idx) => (
                    <AddonRow key={idx}>
                      <div>{addon.name} x {addon.quantity}</div>
                      <div>{formatCurrency(addon.subtotal || addon.total_price || (addon.unit_price * addon.quantity), quoteCurrency)}</div>
                    </AddonRow>
                  ))}
                  <TotalRow>
                    <div>Hardware Subtotal</div>
                    <div>{formatCurrency(selectedQuote.total_amount, quoteCurrency)}</div>
                  </TotalRow>
                </div>

                {/* Subscription Plan Summary */}
                {selectedQuote.plan_snapshot && (
                  <>
                    <SectionTitle>Subscription Plan</SectionTitle>
                    <div style={{ background: '#ECFDF5', borderRadius: 8, padding: 16, marginBottom: 20, borderLeft: '3px solid #059669' }}>
                      <div style={{ fontWeight: 600, fontSize: 14, color: '#0A2540', marginBottom: 4 }}>
                        {selectedQuote.plan_snapshot.display_name}
                      </div>
                      <div style={{ fontSize: 13, color: '#6B7280' }}>
                        {selectedQuote.billing_cycle === 'annual' ? 'Annual' : 'Monthly'} billing -{' '}
                        {formatCurrency(
                          selectedQuote.billing_cycle === 'annual'
                            ? (selectedQuote.plan_snapshot.currency_prices?.[quoteCurrency]?.annual || selectedQuote.plan_snapshot.base_price_annual)
                            : (selectedQuote.plan_snapshot.currency_prices?.[quoteCurrency]?.monthly || selectedQuote.plan_snapshot.base_price_monthly),
                          quoteCurrency
                        )}
                        {selectedQuote.billing_cycle === 'annual' ? '/yr' : '/mo'}
                      </div>
                    </div>
                  </>
                )}

                {/* Due Date */}
                <FormGroup>
                  <FormLabel>Due Date</FormLabel>
                  <FormInput
                    type="date"
                    value={proceedDueDate}
                    onChange={(e) => setProceedDueDate(e.target.value)}
                  />
                </FormGroup>

                {/* Discount (for hardware) */}
                <FormGroup>
                  <FormLabel>Hardware Discount</FormLabel>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <FormSelect
                      style={{ width: 'auto', minWidth: 150 }}
                      value={proceedDiscountType}
                      onChange={(e) => setProceedDiscountType(e.target.value as 'none' | 'percentage' | 'fixed')}
                    >
                      <option value="none">No Discount</option>
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed Amount</option>
                    </FormSelect>
                    {proceedDiscountType !== 'none' && (
                      <FormInput
                        type="number"
                        min="0"
                        step="0.01"
                        value={proceedDiscountValue}
                        onChange={(e) => setProceedDiscountValue(e.target.value)}
                        placeholder={proceedDiscountType === 'percentage' ? 'e.g. 10' : 'e.g. 50.00'}
                        style={{ width: 150 }}
                      />
                    )}
                  </div>
                </FormGroup>

                {/* Additional Charges */}
                <FormGroup>
                  <FormLabel>Additional Charges</FormLabel>
                  {proceedCharges.map((charge, idx) => (
                    <ChargeRow key={idx}>
                      <InlineFormGroup>
                        <FormInput
                          value={charge.name}
                          onChange={(e) => updateProceedCharge(idx, 'name', e.target.value)}
                          placeholder="Charge name"
                        />
                      </InlineFormGroup>
                      <InlineFormGroup>
                        <FormInput
                          type="number"
                          min="0"
                          step="0.01"
                          value={charge.amount}
                          onChange={(e) => updateProceedCharge(idx, 'amount', e.target.value)}
                          placeholder="Amount"
                        />
                      </InlineFormGroup>
                      <ActionButton variant="danger" onClick={() => removeProceedCharge(idx)} style={{ flexShrink: 0 }}>
                        Remove
                      </ActionButton>
                    </ChargeRow>
                  ))}
                  <ActionButton onClick={addProceedCharge} style={{ marginTop: 8 }}>
                    + Add Charge
                  </ActionButton>
                </FormGroup>

                {/* Mark as Paid */}
                <FormGroup>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', color: '#374151' }}>
                    <input
                      type="checkbox"
                      checked={proceedMarkAsPaid}
                      onChange={(e) => setProceedMarkAsPaid(e.target.checked)}
                      style={{ width: '18px', height: '18px', accentColor: '#635BFF' }}
                    />
                    Mark hardware invoice as paid
                  </label>
                </FormGroup>

                {/* Calculated Total */}
                <TotalRow style={{ fontSize: 18 }}>
                  <div>Hardware Invoice Total</div>
                  <div>{formatCurrency(calculateProceedTotal(), quoteCurrency)}</div>
                </TotalRow>
              </>
            )}
          </CommonModal>
        )}

        {/* Delete Confirm Modal */}
        {showDeleteConfirm && (
          <CommonModal
            isOpen={true}
            onClose={() => setShowDeleteConfirm(false)}
            title="Confirm Delete"
            footer={
              <>
                <ActionButton onClick={() => setShowDeleteConfirm(false)}>Cancel</ActionButton>
                <ActionButton variant="danger" onClick={deleteQuote}>Delete</ActionButton>
              </>
            }
          >
            <p style={{ margin: 0, color: '#374151', fontSize: '14px' }}>
              Are you sure you want to delete quote <strong>{selectedQuote?.quote_number}</strong>? This action cannot be undone.
            </p>
          </CommonModal>
        )}
      </Container>
    </>
  );
};

export default HardwareQuotesPage;
