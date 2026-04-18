import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import { Modal as CommonModal, StatsGrid, StatCard, StatValue, StatLabel } from '../../components/UI';
import CommentSection from '../../components/Common/CommentSection';
import AttachmentList from '../../components/Common/AttachmentList';
import { useTranslation } from 'react-i18next';

import { getAuthToken } from '../../utils/auth';
import { formatDateTime as formatDateTimeTz } from '../../utils/timezone';
interface OperationTicket {
  id: string;
  ticketNumber: string;
  managerId: number;
  managerName: string;
  requesterId: number;
  requesterName: string;
  requesterEmail: string;
  requesterRole: 'Restaurant Admin' | 'Staff';
  restaurantId: number;
  restaurantName: string;
  subject: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'schedule' | 'inventory' | 'staff' | 'menu' | 'customer' | 'other';
  attachments?: any[];
  createdAt: string;
  updatedAt: string;
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
  border-bottom: 1px solid #E6EBF1;
  margin-bottom: 0;
  height: 56px;
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
  background: #FAFBFC;
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
    color: #6B7280;
    border: 1px solid #E6EBF1;

    &:hover {
      background: #F8FAFC;
      color: #0A2540;
      border-color: #CBD5E1;
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

const SearchInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
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
  border: 1px solid #E6EBF1;
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
  border: 1px solid #E6EBF1;
  transition: all 0.2s;
  cursor: pointer;
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
  color: #374151;
  margin-bottom: 8px;
  line-height: 1.4;
`;

const RequesterInfo = styled.div`
  font-size: 14px;
  color: #6B7280;
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
      case 'closed': return '#F3F4F6';
      default: return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'open': return '#D97706';
      case 'in-progress': return '#1E40AF';
      case 'resolved': return '#059669';
      case 'closed': return '#6B7280';
      default: return '#6B7280';
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
      default: return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch(props.priority) {
      case 'urgent': return '#DC2626';
      case 'high': return '#EA580C';
      case 'medium': return '#D97706';
      case 'low': return '#0891B2';
      default: return '#6B7280';
    }
  }};
`;

const TicketDescription = styled.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
`;

const TicketBadges = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`;

const TicketMeta = styled.div`
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

const MetaLabel = styled.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const MetaValue = styled.span`
  color: #374151;
`;


const InfoBox = styled.div`
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 0;

  &:not(:last-child) {
    border-bottom: 1px solid #F3F4F6;
  }
`;

const InfoLabel = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
  width: 100px;
  flex-shrink: 0;
`;

const InfoValue = styled.span`
  font-size: 14px;
  color: #0A2540;
`;

const DetailDescription = styled.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.6;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #635BFF;
  margin-bottom: 20px;
  white-space: pre-wrap;
  word-break: break-word;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`;

const StatusRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const OperationInquiryPage: React.FC = () => {
  const { t } = useTranslation('admin');
  const { user } = useAuth();
  const [tickets, setTickets] = useState<OperationTicket[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState<OperationTicket | null>(null);
  const [detailStatus, setDetailStatus] = useState('');
  const [unreadCounts, setUnreadCounts] = useState<Record<string, { total_comments: number; unread_count: number }>>({});

  const currentUserId = user?.id;
  const currentUserRole = user?.role || 'Brand Manager';

  useEffect(() => {
    fetchTickets();
    const interval = setInterval(fetchTickets, 10000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await fetch(`/api/operation-tickets?userId=${currentUserId}&userRole=${currentUserRole}`);
      if (response.ok) {
        const data = await response.json();
        setTickets(data);
        fetchUnreadCounts(data);
      }
    } catch (error) {
      console.error('Error fetching operation tickets:', error);
    }
  };

  const fetchUnreadCounts = async (ticketList: OperationTicket[]) => {
    if (ticketList.length === 0) return;
    try {
      const token = getAuthToken();
      const ids = ticketList.map(t => t.id).join(',');
      const res = await fetch(`/api/comments/unread-counts?entity_type=operation_ticket&entity_ids=${ids}`, {
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

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.requesterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const totalTickets = tickets.length;
  const openTickets = tickets.filter(t => t.status === 'open').length;
  const inProgressTickets = tickets.filter(t => t.status === 'in-progress').length;
  const resolvedTickets = tickets.filter(t => t.status === 'resolved').length;

  const formatDateTime = (dateString: string) => {
    return formatDateTimeTz(dateString, null);
  };

  const handleCardClick = (ticket: OperationTicket) => {
    setSelectedTicket(ticket);
    setDetailStatus(ticket.status);
    window.dispatchEvent(new Event('refreshBadgeCounts'));
  };

  const handleCloseTicketFromModal = async () => {
    if (!selectedTicket) return;
    try {
      const res = await fetch(`/api/operation-tickets/${selectedTicket.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'closed' })
      });
      if (res.ok) {
        await fetchTickets();
        setSelectedTicket(null);
        window.dispatchEvent(new Event('refreshBadgeCounts'));
      }
    } catch (err) { /* silent */ }
  };

  const handleUpdateStatus = async () => {
    if (!selectedTicket) return;

    try {
      const response = await fetch(`/api/operation-tickets/${selectedTicket.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: detailStatus })
      });

      if (response.ok) {
        await fetchTickets();
        setSelectedTicket(prev => prev ? { ...prev, status: detailStatus as OperationTicket['status'] } : null);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <>
      <Container>
        <Header>
          <Title>{t('admin:operationInquiryPage.operationInquiry')}</Title>
        </Header>
        <Content>
          <StatsGrid>
            <StatCard color="#059669">
              <StatValue>{totalTickets}</StatValue>
              <StatLabel>{t('admin:operationInquiryPage.totalInquiries')}</StatLabel>
            </StatCard>
            <StatCard color="#D97706">
              <StatValue>{openTickets}</StatValue>
              <StatLabel>{t('admin:operationInquiryPage.open')}</StatLabel>
            </StatCard>
            <StatCard color="#2563EB">
              <StatValue>{inProgressTickets}</StatValue>
              <StatLabel>{t('admin:operationInquiryPage.inProgress')}</StatLabel>
            </StatCard>
            <StatCard color="#7C3AED">
              <StatValue>{resolvedTickets}</StatValue>
              <StatLabel>{t('admin:operationInquiryPage.resolved')}</StatLabel>
            </StatCard>
          </StatsGrid>

          <FiltersContainer>
            <SearchInput
              placeholder="Search inquiries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="all">{t('admin:operationInquiryPage.allStatus')}</option>
              <option value="open">{t('admin:operationInquiryPage.open')}</option>
              <option value="in-progress">{t('admin:operationInquiryPage.inProgress')}</option>
              <option value="resolved">{t('admin:operationInquiryPage.resolved')}</option>
              <option value="closed">{t('admin:operationInquiryPage.closed')}</option>
            </Select>
            <Select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
              <option value="all">{t('admin:operationInquiryPage.allPriority')}</option>
              <option value="urgent">{t('admin:operationInquiryPage.urgent')}</option>
              <option value="high">{t('admin:operationInquiryPage.high')}</option>
              <option value="medium">{t('admin:operationInquiryPage.medium')}</option>
              <option value="low">{t('admin:operationInquiryPage.low')}</option>
            </Select>
          </FiltersContainer>

          <TicketsGrid>
            {filteredTickets.map(ticket => (
              <TicketCard key={ticket.id} onClick={() => handleCardClick(ticket)}>
                <TicketHeader>
                  <TicketInfo>
                    <TicketNumber>{ticket.ticketNumber}</TicketNumber>
                    <TicketSubject>{ticket.subject}</TicketSubject>
                    <RequesterInfo>
                      {ticket.requesterName} ({ticket.requesterRole}) - {ticket.restaurantName}
                    </RequesterInfo>
                  </TicketInfo>
                  <TicketBadges>
                    <StatusBadge status={ticket.status}>{ticket.status}</StatusBadge>
                    <PriorityBadge priority={ticket.priority}>{ticket.priority}</PriorityBadge>
                  </TicketBadges>
                </TicketHeader>

                <TicketDescription>{ticket.description}</TicketDescription>

                <TicketMeta>
                  <div>
                    <MetaLabel>{t('admin:operationInquiryPage.created')}</MetaLabel>
                    <MetaValue>{formatDateTime(ticket.createdAt)}</MetaValue>
                  </div>
                  {unreadCounts[ticket.id] && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      Comments {unreadCounts[ticket.id].total_comments}
                      {unreadCounts[ticket.id].unread_count > 0 && (
                        <span style={{ background: '#EF4444', color: 'white', borderRadius: '10px', padding: '1px 7px', fontSize: '11px', fontWeight: 600 }}>
                          {unreadCounts[ticket.id].unread_count} new
                        </span>
                      )}
                    </span>
                  )}
                </TicketMeta>
              </TicketCard>
            ))}

            {filteredTickets.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: '#6B7280',
                gridColumn: '1 / -1'
              }}>
                <h3 style={{ color: '#374151', marginBottom: '8px' }}>{t('admin:operationInquiryPage.noInquiriesYet')}</h3>
                <p>{t('admin:operationInquiryPage.noOperationInquiriesHaveBeenSubmitted')}</p>
              </div>
            )}
          </TicketsGrid>

          {/* Detail Modal */}
          {selectedTicket && (
            <CommonModal isOpen={true} onClose={() => setSelectedTicket(null)} title={selectedTicket.ticketNumber} size="large" footer={selectedTicket.status !== 'closed' ? <Button variant="primary" onClick={handleCloseTicketFromModal}>{t('admin:operationInquiryPage.closeTicket', 'Close Ticket')}</Button> : undefined}>
                  <InfoBox>
                    <InfoRow>
                      <InfoLabel>{t('admin:operationInquiryPage.subject')}</InfoLabel>
                      <InfoValue>{selectedTicket.subject}</InfoValue>
                    </InfoRow>
                    <InfoRow>
                      <InfoLabel>{t('admin:operationInquiryPage.restaurant')}</InfoLabel>
                      <InfoValue>{selectedTicket.restaurantName}</InfoValue>
                    </InfoRow>
                    <InfoRow>
                      <InfoLabel>{t('admin:operationInquiryPage.from')}</InfoLabel>
                      <InfoValue>{selectedTicket.requesterName} ({selectedTicket.requesterRole})</InfoValue>
                    </InfoRow>
                    <InfoRow>
                      <InfoLabel>{t('admin:operationInquiryPage.priority')}</InfoLabel>
                      <InfoValue><PriorityBadge priority={selectedTicket.priority}>{selectedTicket.priority}</PriorityBadge></InfoValue>
                    </InfoRow>
                    <InfoRow>
                      <InfoLabel>{t('admin:operationInquiryPage.category')}</InfoLabel>
                      <InfoValue>{selectedTicket.category}</InfoValue>
                    </InfoRow>
                    <InfoRow>
                      <InfoLabel>{t('admin:operationInquiryPage.created')}</InfoLabel>
                      <InfoValue>{formatDateTime(selectedTicket.createdAt)}</InfoValue>
                    </InfoRow>
                  </InfoBox>

                  <DetailDescription>{selectedTicket.description}</DetailDescription>

                  {selectedTicket?.attachments && selectedTicket.attachments.length > 0 && (
                    <AttachmentList attachments={selectedTicket.attachments} />
                  )}

                  <FormGroup>
                    <FormLabel>{t('admin:operationInquiryPage.status')}</FormLabel>
                    <StatusRow>
                      <Select value={detailStatus} onChange={(e) => setDetailStatus(e.target.value)}>
                        <option value="open">{t('admin:operationInquiryPage.open')}</option>
                        <option value="in-progress">{t('admin:operationInquiryPage.inProgress')}</option>
                        <option value="resolved">{t('admin:operationInquiryPage.resolved')}</option>
                        <option value="closed">{t('admin:operationInquiryPage.closed')}</option>
                      </Select>
                      <Button
                        variant="primary"
                        onClick={handleUpdateStatus}
                        disabled={detailStatus === selectedTicket.status}
                      >
                        Save
                      </Button>
                    </StatusRow>
                  </FormGroup>

                  <CommentSection
                    entityType="operation_ticket"
                    entityId={String(selectedTicket.id)}
                    currentUserId={user?.id}
                    onMarkRead={() => setUnreadCounts(prev => { const next = { ...prev }; const key = String(selectedTicket.id); if (next[key]) next[key] = { ...next[key], unread_count: 0 }; return next; })}
                  />
            </CommonModal>
          )}
        </Content>
      </Container>
    </>
  );
};

export default OperationInquiryPage;
