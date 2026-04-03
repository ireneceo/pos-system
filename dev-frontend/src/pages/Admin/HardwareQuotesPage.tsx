import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { EmptyState } from '../../components/UI/TableComponents';
import { Modal as CommonModal } from '../../components/UI';
import { formatCurrency } from '../../utils/currency';

// ─── Types ───────────────────────────────────────────────────────

interface AddonItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
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
  name: string;
  email: string;
  phone?: string;
  company_name?: string;
  message?: string;
  status: 'new' | 'contacted' | 'confirmed' | 'invoiced' | 'cancelled';
  admin_notes?: string;
  package_name: string;
  set_group: string;
  set_tier: string;
  package_price: number;
  addon_items: AddonItem[];
  total_amount: number;
  currency: string;
  user_id?: number;
  user?: LinkedUser;
  invoice_id?: number;
  invoice?: LinkedInvoice;
  createdAt: string;
  updatedAt: string;
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

const Container = styled.div`
  min-height: 100vh;
`;

const Header = styled.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`;

const Content = styled.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

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

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

const QuoteHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`;

const QuoteInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const QuoteNumber = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
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
  font-size: 14px;
  color: #635BFF;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
      case 'contacted': return '#3B82F6';
      case 'confirmed': return '#10B981';
      case 'invoiced': return '#635BFF';
      case 'cancelled': return '#6B7280';
      default: return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'new': return '#92400E';
      case 'contacted': return '#FFFFFF';
      case 'confirmed': return '#FFFFFF';
      case 'invoiced': return '#FFFFFF';
      case 'cancelled': return '#FFFFFF';
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
  margin: 8px 0;
`;

const TotalAmount = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #0A2540;
  margin: 8px 0;
`;

const QuoteMeta = styled.div`
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

const ViewDetailsLink = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: #635BFF;
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

const HardwareQuotesPage: React.FC = () => {
  const [quotes, setQuotes] = useState<HardwareQuote[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, new: 0, contacted: 0, confirmed: 0, invoiced: 0 });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

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

  const openDetail = async (quote: HardwareQuote) => {
    // Fetch full detail
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
        // Refresh detail
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
    setShowInvoiceModal(true);
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

    // Discount
    if (discountType === 'percentage' && discountValue) {
      total -= total * (parseFloat(discountValue) / 100);
    } else if (discountType === 'fixed' && discountValue) {
      total -= parseFloat(discountValue);
    }

    // Additional charges
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
    return status.charAt(0).toUpperCase() + status.slice(1);
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
            <StatCard color="#635BFF">
              <StatValue>{stats.invoiced}</StatValue>
              <StatLabel>Invoiced</StatLabel>
            </StatCard>
          </StatsGrid>

          <FilterBar>
            <FilterSelect
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="confirmed">Confirmed</option>
              <option value="invoiced">Invoiced</option>
              <option value="cancelled">Cancelled</option>
            </FilterSelect>
            <SearchInput
              placeholder="Search by name, email, company, quote number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </FilterBar>

          {loading ? (
            <EmptyState>Loading...</EmptyState>
          ) : quotes.length === 0 ? (
            <EmptyState>No hardware quotes found</EmptyState>
          ) : (
            <QuoteGrid>
              {quotes.map((quote) => (
                <QuoteCard key={quote.id} onClick={() => openDetail(quote)}>
                  <QuoteHeader>
                    <QuoteInfo>
                      <QuoteNumber>{quote.quote_number}</QuoteNumber>
                      <QuoteName>{quote.name}</QuoteName>
                      <QuoteEmail>{quote.email}</QuoteEmail>
                    </QuoteInfo>
                    <StatusBadge status={quote.status}>
                      {formatStatusLabel(quote.status)}
                    </StatusBadge>
                  </QuoteHeader>

                  <PackageBadge>
                    {quote.package_name} - {quote.set_group}/{quote.set_tier}
                  </PackageBadge>

                  <TotalAmount>
                    {formatCurrency(quote.total_amount, quote.currency)}
                  </TotalAmount>

                  <QuoteMeta>
                    <span>{formatDate(quote.createdAt)}</span>
                    <ViewDetailsLink>View Details</ViewDetailsLink>
                  </QuoteMeta>
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
                {selectedQuote.status === 'confirmed' && !selectedQuote.invoice_id && (
                  <ActionButton variant="primary" onClick={openInvoiceModal}>
                    Create Invoice
                  </ActionButton>
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
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="invoiced">Invoiced</option>
                    <option value="cancelled">Cancelled</option>
                  </StatusSelect>
                </DetailItemValue>
              </DetailItem>
              <DetailItem>
                <DetailItemLabel>Created</DetailItemLabel>
                <DetailItemValue>{formatDate(selectedQuote.createdAt)}</DetailItemValue>
              </DetailItem>
            </DetailGrid>

            {/* Customer Info */}
            <SectionTitle>Customer Info</SectionTitle>
            <DetailGrid>
              <DetailItem>
                <DetailItemLabel>Name</DetailItemLabel>
                <DetailItemValue>{selectedQuote.name}</DetailItemValue>
              </DetailItem>
              <DetailItem>
                <DetailItemLabel>Email</DetailItemLabel>
                <DetailItemValue>{selectedQuote.email}</DetailItemValue>
              </DetailItem>
              {selectedQuote.phone && (
                <DetailItem>
                  <DetailItemLabel>Phone</DetailItemLabel>
                  <DetailItemValue>{selectedQuote.phone}</DetailItemValue>
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
                  <strong>{selectedQuote.package_name}</strong>
                  <span style={{ color: '#6B7280', marginLeft: 8 }}>
                    ({selectedQuote.set_group} - {selectedQuote.set_tier})
                  </span>
                </div>
                <div style={{ fontWeight: 600 }}>{formatCurrency(selectedQuote.package_price, quoteCurrency)}</div>
              </AddonRow>

              {selectedQuote.addon_items && selectedQuote.addon_items.length > 0 && (
                <>
                  <div style={{ fontSize: 12, color: '#6B7280', marginTop: 12, marginBottom: 8, fontWeight: 600, textTransform: 'uppercase' }}>
                    Add-ons
                  </div>
                  {selectedQuote.addon_items.map((addon, idx) => (
                    <AddonRow key={idx}>
                      <div>{addon.name} x {addon.quantity}</div>
                      <div>{formatCurrency(addon.price * addon.quantity, quoteCurrency)}</div>
                    </AddonRow>
                  ))}
                </>
              )}

              <TotalRow>
                <div>Total</div>
                <div>{formatCurrency(selectedQuote.total_amount, quoteCurrency)}</div>
              </TotalRow>
            </div>

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

            {/* Invoice Info */}
            {selectedQuote.invoice && (
              <>
                <SectionTitle>Invoice</SectionTitle>
                <InvoiceInfoBox>
                  <DetailGrid style={{ marginBottom: 0 }}>
                    <DetailItem>
                      <DetailItemLabel>Invoice Number</DetailItemLabel>
                      <DetailItemValue style={{ fontFamily: 'monospace' }}>{selectedQuote.invoice.invoice_number}</DetailItemValue>
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
                <div><strong>{selectedQuote.package_name}</strong> ({selectedQuote.set_group} - {selectedQuote.set_tier})</div>
                <div>{formatCurrency(selectedQuote.package_price, quoteCurrency)}</div>
              </AddonRow>
              {selectedQuote.addon_items && selectedQuote.addon_items.map((addon, idx) => (
                <AddonRow key={idx}>
                  <div>{addon.name} x {addon.quantity}</div>
                  <div>{formatCurrency(addon.price * addon.quantity, quoteCurrency)}</div>
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
