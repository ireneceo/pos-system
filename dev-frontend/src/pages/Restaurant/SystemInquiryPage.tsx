import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import CommentSection from '../../components/Common/CommentSection';
import FileUpload, { AttachmentFile } from '../../components/Common/FileUpload';
import AttachmentList from '../../components/Common/AttachmentList';
import { StatsGrid, StatCard, StatValue, StatLabel, Modal as CommonModal } from '../../components/UI';
import ConfirmModal from '../../components/ConfirmModal';
import { useTranslation } from 'react-i18next';

import { getAuthToken } from '../../utils/auth';
import { formatDateTime as formatDateTimeTz } from '../../utils/timezone';
interface SupportTicket {
  id: string;
  ticketNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerRole: string;
  restaurantId?: number;
  restaurantName?: string;
  subject: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'technical' | 'billing' | 'feature-request' | 'bug-report' | 'general';
  createdAt: string;
  updatedAt: string;
  attachments?: any[];
}


const Container = styled.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`;

const Header = styled.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #C7CED6;
  margin-bottom: 0;
  height: 80px;
  min-height: 80px;
  max-height: 80px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 16px;
    height: auto;
    min-height: 56px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

const Content = styled.div`
  padding: 32px;
  background: #F9FAFB;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const ActionSection = styled.div`
  display: flex;
  gap: 12px;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${props => props.variant === 'primary' ? `
    background: #635BFF;
    color: white;

    &:hover {
      background: #5A51E6;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);
    }
  ` : `
    background: white;
    color: #4B5563;
    border: 1px solid #C7CED6;

    &:hover {
      background: #F1F4F8;
      color: #0A2540;
      border-color: #64748B;
    }
  `}
`;

const FiltersContainer = styled.div`
  margin-bottom: 24px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const FilterLabel = styled.label`
  font-size: 12px;
  font-weight: 600;
  color: #4B5563;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const SearchInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  font-size: 14px;
  width: 250px;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  font-size: 14px;
  background: white;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`;

const TicketsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const TicketCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #C7CED6;
  transition: all 0.2s;
  overflow: hidden;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

const TicketHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`;

const TicketInfo = styled.div`
  flex: 1;
`;

const TicketNumber = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`;

const TicketSubject = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #1F2937;
  margin-bottom: 8px;
  line-height: 1.4;
  word-break: break-word;
  overflow-wrap: break-word;
`;

const CustomerInfo = styled.div`
  font-size: 14px;
  color: #4B5563;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const getRoleBadgeColors = (role: string) => {
  const r = role.toLowerCase();
  if (r.includes('admin') && !r.includes('restaurant')) return { bg: '#F3E8FF', color: '#7C3AED' };
  if (r.includes('brand')) return { bg: '#E0F2FE', color: '#0891B2' };
  if (r.includes('foodcourt')) return { bg: '#E0F2FE', color: '#0891B2' };
  if (r.includes('restaurant') || r === 'restaurant') return { bg: '#FEF3C7', color: '#D97706' };
  if (r.includes('owner')) return { bg: '#FFF7ED', color: '#EA580C' };
  if (r.includes('staff') || r === 'staff') return { bg: '#ECFDF5', color: '#059669' };
  if (r === 'manager') return { bg: '#E0F2FE', color: '#0891B2' };
  return { bg: '#F1F4F8', color: '#4B5563' };
};

const RoleBadge = styled.span<{ role: string }>`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  margin-left: 8px;
  background: ${props => getRoleBadgeColors(props.role).bg};
  color: ${props => getRoleBadgeColors(props.role).color};
`;

const TicketBadges = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${props => {
    switch(props.status) {
      case 'open': return '#FEF3C7';
      case 'in-progress': return '#DBEAFE';
      case 'resolved': return '#ECFDF5';
      case 'closed': return '#F1F4F8';
      default: return '#F1F4F8';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'open': return '#D97706';
      case 'in-progress': return '#1E40AF';
      case 'resolved': return '#059669';
      case 'closed': return '#4B5563';
      default: return '#4B5563';
    }
  }};
`;

const PriorityBadge = styled.span<{ priority: string }>`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${props => {
    switch(props.priority) {
      case 'urgent': return '#FEE2E2';
      case 'high': return '#FED7AA';
      case 'medium': return '#FEF3C7';
      case 'low': return '#E0F2FE';
      default: return '#F1F4F8';
    }
  }};
  color: ${props => {
    switch(props.priority) {
      case 'urgent': return '#DC2626';
      case 'high': return '#EA580C';
      case 'medium': return '#D97706';
      case 'low': return '#0891B2';
      default: return '#4B5563';
    }
  }};
`;

const TicketDescription = styled.div`
  font-size: 14px;
  color: #4B5563;
  line-height: 1.5;
  margin: 16px 0;
  padding: 16px;
  background: #F1F4F8;
  border-radius: 8px;
  border-left: 3px solid #C7CED6;
  word-break: break-word;
  overflow-wrap: break-word;
`;

const TicketMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F1F4F8;
  font-size: 12px;
  color: #4B5563;
  flex-wrap: wrap;
  gap: 12px;
`;

const MetaItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const MetaLabel = styled.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const MetaValue = styled.span`
  color: #1F2937;
`;


const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #4B5563;
  margin-bottom: 8px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.15s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: all 0.15s;
  cursor: pointer;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const FormTextArea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 100px;
  transition: all 0.15s;
  font-family: inherit;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const SupportTicketsPage: React.FC = () => {
  const { t } = useTranslation('settings');
  const { user } = useAuth();
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showCreateTicketModal, setShowCreateTicketModal] = useState(false);
  const [infoModal, setInfoModal] = useState<{ open: boolean; title: string; message: string }>({ open: false, title: '', message: '' });
  const [showViewTicketModal, setShowViewTicketModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [detailStatus, setDetailStatus] = useState<SupportTicket['status']>('open');
  const [newTicket, setNewTicket] = useState({
    subject: '',
    description: '',
    priority: 'medium' as SupportTicket['priority'],
    category: 'general' as SupportTicket['category']
  });
  const [newAttachments, setNewAttachments] = useState<AttachmentFile[]>([]);
  const [unreadCounts, setUnreadCounts] = useState<Record<string, { total_comments: number; unread_count: number }>>({});

  // 현재 사용자의 레스토랑 ID (실제로는 user context에서 가져올 것)
  const currentRestaurantId = user?.restaurantId || 2;
  const currentRestaurantName = 'IOI Mall Food Court'; // 실제로는 user context에서 가져올 것

  const fetchUnreadCounts = async (ticketList: SupportTicket[]) => {
    if (ticketList.length === 0) return;
    try {
      const token = getAuthToken();
      const ids = ticketList.map(t => t.id).join(',');
      const res = await fetch(`/api/comments/unread-counts?entity_type=support_ticket&entity_ids=${ids}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          const map: Record<string, { total_comments: number; unread_count: number }> = {};
          data.data.forEach((item: any) => { map[item.entity_id] = { total_comments: Number(item.total_comments), unread_count: Number(item.unread_count) }; });
          setUnreadCounts(map);
        }
      }
    } catch (e) { console.error('Error fetching unread counts:', e); }
  };

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = getAuthToken();
        const response = await fetch('/api/support-tickets', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const result = await response.json();
          const ticketsData = result.data || result;
          setTickets(ticketsData);
          fetchUnreadCounts(ticketsData);
        }
      } catch (error) {
        // 에러 처리
      }
    };

    fetchTickets();
  }, [user]);

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority;
    const matchesCategory = filterCategory === 'all' || ticket.category === filterCategory;
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  const totalTickets = tickets.length;
  const openTickets = tickets.filter(t => t.status === 'open').length;
  const inProgressTickets = tickets.filter(t => t.status === 'in-progress').length;
  const resolvedTickets = tickets.filter(t => t.status === 'resolved').length;
  const formatDateTime = (dateString: string) => {
    return formatDateTimeTz(dateString, null);
  };

  const handleExportReports = () => {
    const csvHeaders = [
      'Ticket Number',
      'Customer Name',
      'Customer Email',
      'Customer Role',
      'Subject',
      'Description',
      'Status',
      'Priority',
      'Category',
      'Created At',
      'Updated At'
    ];

    const csvRows = filteredTickets.map(ticket => [
      ticket.ticketNumber,
      ticket.customerName,
      ticket.customerEmail,
      ticket.customerRole,
      `"${ticket.subject.replace(/"/g, '""')}"`,
      `"${ticket.description.replace(/"/g, '""')}"`,
      ticket.status,
      ticket.priority,
      ticket.category,
      ticket.createdAt,
      ticket.updatedAt
    ]);

    const csvContent = [
      csvHeaders.join(','),
      ...csvRows.map(row => row.join(','))
    ].join('\n');

    const bom = '\uFEFF';
    const csvWithBom = bom + csvContent;

    const dataBlob = new Blob([csvWithBom], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `restaurant-support-tickets-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCreateTicket = () => {
    setShowCreateTicketModal(true);
  };

  const handleSubmitTicket = async () => {
    try {
      const newSupportTicket = {
        restaurantId: currentRestaurantId,
        restaurantName: currentRestaurantName,
        subject: newTicket.subject,
        description: newTicket.description,
        status: 'open',
        priority: newTicket.priority,
        category: newTicket.category,
        attachments: newAttachments.length > 0 ? newAttachments : undefined
      };

      const token = getAuthToken();
      const response = await fetch('/api/support-tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(newSupportTicket)
      });

      if (response.ok) {
        const refreshResponse = await fetch('/api/support-tickets', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (refreshResponse.ok) {
          const result = await refreshResponse.json();
          const ticketsData = result.data || result;
          setTickets(ticketsData);
          fetchUnreadCounts(ticketsData);
        }
        setShowCreateTicketModal(false);
      } else {
        setInfoModal({ open: true, title: 'Submission Failed', message: 'Failed to create support ticket. Please try again.' });
      }
    } catch (error) {
      setInfoModal({ open: true, title: 'Submission Failed', message: 'Error creating support ticket. Please try again.' });
    }
    setNewTicket({
      subject: '',
      description: '',
      priority: 'medium',
      category: 'general'
    });
    setNewAttachments([]);
  };

  const handleViewTicket = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setDetailStatus(ticket.status);
    setShowViewTicketModal(true);
    window.dispatchEvent(new Event('refreshBadgeCounts'));
  };

  const handleStatusChange = async () => {
    if (!selectedTicket) return;
    try {
      const token = getAuthToken();
      const response = await fetch(`/api/support-tickets/${selectedTicket.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status: detailStatus })
      });
      if (response.ok) {
        setTickets(prev => prev.map(t => t.id === selectedTicket.id ? { ...t, status: detailStatus } : t));
        setSelectedTicket(prev => prev ? { ...prev, status: detailStatus } : prev);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleCloseTicketFromModal = async () => {
    if (!selectedTicket) return;
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/support-tickets/${selectedTicket.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status: 'closed' })
      });
      if (res.ok) {
        setTickets(prev => prev.map(t => t.id === selectedTicket.id ? { ...t, status: 'closed' as SupportTicket['status'] } : t));
        setShowViewTicketModal(false);
        setSelectedTicket(null);
        window.dispatchEvent(new Event('refreshBadgeCounts'));
      }
    } catch (err) { /* silent */ }
  };

  return (
    <>
      <Container>
        <Header>
          <Title>{t('settings:systemInquiryPage.systemInquiry')}</Title>
          <ActionSection>
            <Button variant="secondary" onClick={handleExportReports}>{t('settings:systemInquiryPage.export')}</Button>
            <Button variant="primary" onClick={handleCreateTicket}>{t('settings:systemInquiryPage.createTicket')}</Button>
          </ActionSection>
        </Header>
        <Content>
          <StatsGrid>
            <StatCard color="#059669">
              <StatValue>{totalTickets}</StatValue>
              <StatLabel>{t('settings:systemInquiryPage.totalTickets')}</StatLabel>
            </StatCard>
            <StatCard color="#D97706">
              <StatValue>{openTickets}</StatValue>
              <StatLabel>{t('settings:systemInquiryPage.openTickets')}</StatLabel>
            </StatCard>
            <StatCard color="#2563EB">
              <StatValue>{inProgressTickets}</StatValue>
              <StatLabel>{t('settings:systemInquiryPage.inProgress')}</StatLabel>
            </StatCard>
            <StatCard color="#7C3AED">
              <StatValue>{resolvedTickets}</StatValue>
              <StatLabel>{t('settings:systemInquiryPage.resolved')}</StatLabel>
            </StatCard>
          </StatsGrid>

          <FiltersContainer>
            <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="all">{t('settings:systemInquiryPage.allStatus')}</option>
              <option value="open">{t('settings:systemInquiryPage.open')}</option>
              <option value="in-progress">{t('settings:systemInquiryPage.inProgress')}</option>
              <option value="resolved">{t('settings:systemInquiryPage.resolved')}</option>
              <option value="closed">{t('settings:systemInquiryPage.closed')}</option>
            </Select>
            <Select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
              <option value="all">{t('settings:systemInquiryPage.allPriority')}</option>
              <option value="urgent">{t('settings:systemInquiryPage.urgent')}</option>
              <option value="high">{t('settings:systemInquiryPage.high')}</option>
              <option value="medium">{t('settings:systemInquiryPage.medium')}</option>
              <option value="low">{t('settings:systemInquiryPage.low')}</option>
            </Select>
            <Select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
              <option value="all">{t('settings:systemInquiryPage.allCategories')}</option>
              <option value="technical">{t('settings:systemInquiryPage.technical')}</option>
              <option value="billing">{t('settings:systemInquiryPage.billing')}</option>
              <option value="feature-request">{t('settings:systemInquiryPage.featureRequest')}</option>
              <option value="bug-report">{t('settings:systemInquiryPage.bugReport')}</option>
              <option value="general">{t('settings:systemInquiryPage.general')}</option>
            </Select>
            <SearchInput
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </FiltersContainer>

          <TicketsGrid>
            {filteredTickets.map(ticket => (
              <TicketCard key={ticket.id} onClick={() => handleViewTicket(ticket)} style={{ cursor: 'pointer' }}>
                <TicketHeader>
                  <TicketInfo>
                    <TicketNumber>{ticket.ticketNumber}</TicketNumber>
                    <TicketSubject>{ticket.subject}</TicketSubject>
                    <CustomerInfo>
                      <div>
                        {ticket.customerName} • {ticket.customerEmail}
                        <RoleBadge role={ticket.customerRole}>{ticket.customerRole}</RoleBadge>
                      </div>
                    </CustomerInfo>
                  </TicketInfo>
                  <TicketBadges>
                    <StatusBadge status={ticket.status}>{ticket.status}</StatusBadge>
                    <PriorityBadge priority={ticket.priority}>{ticket.priority}</PriorityBadge>
                  </TicketBadges>
                </TicketHeader>

                <TicketDescription>
                  {ticket.description}
                </TicketDescription>

                <TicketMeta>
                  <MetaItem>
                    <MetaLabel>{t('settings:systemInquiryPage.created')}</MetaLabel>
                    <MetaValue>{formatDateTime(ticket.createdAt)}</MetaValue>
                  </MetaItem>
                  <MetaItem>
                    <MetaLabel>{t('settings:systemInquiryPage.category')}</MetaLabel>
                    <MetaValue style={{textTransform: 'capitalize'}}>{ticket.category.replace('-', ' ')}</MetaValue>
                  </MetaItem>
                  {unreadCounts[ticket.id] && (
                    <MetaItem>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Comments {unreadCounts[ticket.id].total_comments}
                        {unreadCounts[ticket.id].unread_count > 0 && (
                          <span style={{ background: '#EF4444', color: 'white', borderRadius: '10px', padding: '1px 7px', fontSize: '11px', fontWeight: 600 }}>
                            {unreadCounts[ticket.id].unread_count} new
                          </span>
                        )}
                      </span>
                    </MetaItem>
                  )}
                </TicketMeta>

              </TicketCard>
            ))}

            {filteredTickets.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: '#4B5563',
                gridColumn: '1 / -1'
              }}>
                <h3 style={{ color: '#1F2937', marginBottom: '8px' }}>{t('settings:systemInquiryPage.noTicketsYet')}</h3>
                <p>Click "Create Ticket" to submit your first support ticket to system administrator.</p>
              </div>
            )}
          </TicketsGrid>

          {/* Create Ticket Modal */}
          {showCreateTicketModal && (
            <CommonModal
              isOpen={true}
              onClose={() => setShowCreateTicketModal(false)}
              title="Create System Inquiry"
              footer={
                <>
                  <Button variant="secondary" onClick={() => setShowCreateTicketModal(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleSubmitTicket}
                    disabled={!newTicket.subject || !newTicket.description}
                  >
                    Create Ticket
                  </Button>
                </>
              }
            >
                  <FormGroup>
                    <FormLabel>Subject *</FormLabel>
                    <FormInput
                      type="text"
                      value={newTicket.subject}
                      onChange={(e) => setNewTicket({...newTicket, subject: e.target.value})}
                      placeholder="Enter ticket subject"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Description *</FormLabel>
                    <FormTextArea
                      value={newTicket.description}
                      onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                      placeholder="Describe the issue or request in detail..."
                      rows={4}
                      required
                    />
                  </FormGroup>
                  <div>
                    <FormLabel>{t('settings:systemInquiryPage.attachments')}</FormLabel>
                    <FileUpload
                      files={newAttachments}
                      onChange={setNewAttachments}
                      maxFiles={5}
                    />
                  </div>
                  <FormRow>
                    <FormGroup>
                      <FormLabel>{t('settings:systemInquiryPage.priority')}</FormLabel>
                      <FormSelect
                        value={newTicket.priority}
                        onChange={(e) => setNewTicket({...newTicket, priority: e.target.value as SupportTicket['priority']})}
                      >
                        <option value="low">{t('settings:systemInquiryPage.low')}</option>
                        <option value="medium">{t('settings:systemInquiryPage.medium')}</option>
                        <option value="high">{t('settings:systemInquiryPage.high')}</option>
                        <option value="urgent">{t('settings:systemInquiryPage.urgent')}</option>
                      </FormSelect>
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>{t('settings:systemInquiryPage.category')}</FormLabel>
                      <FormSelect
                        value={newTicket.category}
                        onChange={(e) => setNewTicket({...newTicket, category: e.target.value as SupportTicket['category']})}
                      >
                        <option value="general">{t('settings:systemInquiryPage.general')}</option>
                        <option value="technical">{t('settings:systemInquiryPage.technical')}</option>
                        <option value="billing">{t('settings:systemInquiryPage.billing')}</option>
                        <option value="feature-request">{t('settings:systemInquiryPage.featureRequest')}</option>
                        <option value="bug-report">{t('settings:systemInquiryPage.bugReport')}</option>
                      </FormSelect>
                    </FormGroup>
                  </FormRow>
            </CommonModal>
          )}

          {/* View Ticket Details Modal */}
          {showViewTicketModal && selectedTicket && (
            <CommonModal
              isOpen={true}
              onClose={() => setShowViewTicketModal(false)}
              title="Inquiry Details"
              footer={selectedTicket.status !== 'closed' ? (
                <Button variant="primary" onClick={handleCloseTicketFromModal}>
                  Close Ticket
                </Button>
              ) : undefined}
            >
                  <div style={{ display: 'grid', gap: '20px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div>
                        <FormLabel>{t('settings:systemInquiryPage.ticketNumber')}</FormLabel>
                        <div style={{ padding: '8px 0', color: '#0A2540', fontWeight: '600' }}>
                          {selectedTicket.ticketNumber}
                        </div>
                      </div>
                      <div>
                        <FormLabel>{t('settings:systemInquiryPage.status')}</FormLabel>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <FormSelect value={detailStatus} onChange={(e) => setDetailStatus(e.target.value as SupportTicket['status'])} style={{ flex: 1 }}>
                            <option value="open">{t('settings:systemInquiryPage.open')}</option>
                            <option value="in-progress">{t('settings:systemInquiryPage.inProgress')}</option>
                            <option value="resolved">{t('settings:systemInquiryPage.resolved')}</option>
                            <option value="closed">{t('settings:systemInquiryPage.closed')}</option>
                          </FormSelect>
                          {detailStatus !== selectedTicket.status && (
                            <Button variant="primary" onClick={handleStatusChange} style={{ padding: '10px 20px' }}>{t('settings:systemInquiryPage.save')}</Button>
                          )}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div>
                        <FormLabel>{t('settings:systemInquiryPage.priority')}</FormLabel>
                        <div style={{ padding: '8px 0' }}>
                          <PriorityBadge priority={selectedTicket.priority}>
                            {selectedTicket.priority}
                          </PriorityBadge>
                        </div>
                      </div>
                      <div>
                        <FormLabel>{t('settings:systemInquiryPage.category')}</FormLabel>
                        <div style={{ padding: '8px 0', color: '#1F2937', textTransform: 'capitalize' }}>
                          {selectedTicket.category.replace('-', ' ')}
                        </div>
                      </div>
                    </div>

                    <div>
                      <FormLabel>{t('settings:systemInquiryPage.customerInformation')}</FormLabel>
                      <div style={{ padding: '12px', backgroundColor: '#F1F4F8', borderRadius: '8px', border: '1px solid #C7CED6' }}>
                        <div style={{ marginBottom: '4px', color: '#0A2540', fontWeight: '600' }}>
                          {selectedTicket.customerName}
                          <RoleBadge role={selectedTicket.customerRole} style={{ marginLeft: '8px' }}>
                            {selectedTicket.customerRole}
                          </RoleBadge>
                        </div>
                        <div style={{ color: '#4B5563', fontSize: '14px' }}>
                          {selectedTicket.customerEmail}
                        </div>
                      </div>
                    </div>

                    <div>
                      <FormLabel>{t('settings:systemInquiryPage.subject')}</FormLabel>
                      <div style={{ padding: '8px 0', color: '#0A2540', fontWeight: '600' }}>
                        {selectedTicket.subject}
                      </div>
                    </div>

                    <div>
                      <FormLabel>{t('settings:systemInquiryPage.description')}</FormLabel>
                      <div style={{
                        padding: '12px',
                        backgroundColor: '#F1F4F8',
                        borderRadius: '8px',
                        border: '1px solid #C7CED6',
                        minHeight: '100px',
                        whiteSpace: 'pre-wrap',
                        lineHeight: '1.5',
                        color: '#1F2937'
                      }}>
                        {selectedTicket.description}
                      </div>
                    </div>

                    {selectedTicket?.attachments && selectedTicket.attachments.length > 0 && (
                      <AttachmentList attachments={selectedTicket.attachments} />
                    )}

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div>
                        <FormLabel>{t('settings:systemInquiryPage.createdAt')}</FormLabel>
                        <div style={{ padding: '8px 0', color: '#4B5563' }}>
                          {selectedTicket.createdAt}
                        </div>
                      </div>
                      <div>
                        <FormLabel>{t('settings:systemInquiryPage.lastUpdated')}</FormLabel>
                        <div style={{ padding: '8px 0', color: '#4B5563' }}>
                          {selectedTicket.updatedAt}
                        </div>
                      </div>
                    </div>

                  </div>
                  <CommentSection entityType="support_ticket" entityId={selectedTicket.id} currentUserId={user?.id} onMarkRead={() => setUnreadCounts(prev => { const next = { ...prev }; if (next[selectedTicket.id]) next[selectedTicket.id] = { ...next[selectedTicket.id], unread_count: 0 }; return next; })} />
              </CommonModal>
          )}
        </Content>
      </Container>

      <ConfirmModal
        isOpen={infoModal.open}
        title={infoModal.title}
        message={infoModal.message}
        onConfirm={() => setInfoModal({ open: false, title: '', message: '' })}
        onCancel={() => setInfoModal({ open: false, title: '', message: '' })}
        confirmText="OK"
        type="info"
        singleButton
      />
    </>
  );
};

export default SupportTicketsPage;