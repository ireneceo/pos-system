import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import { Modal as CommonModal } from '../../components/UI';
import CommentSection from '../../components/Common/CommentSection';
import AttachmentList from '../../components/Common/AttachmentList';

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
  response?: string;
  responseTime: number;
  resolutionTime?: number;
  resolvedAt?: string;
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

    &:disabled {
      background: #9CA3AF;
      cursor: not-allowed;
      transform: none;
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

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`;

const StatCard = styled.div<{ borderColor?: string; color?: string }>`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${props => props.borderColor || props.color || '#635BFF'};
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
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
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
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
  min-width: 0;
`;

const TicketNumber = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #635BFF;
  margin-bottom: 8px;
`;

const TicketSubject = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
  word-break: break-word;
  overflow-wrap: break-word;
`;

const TicketMeta = styled.div`
  font-size: 13px;
  color: #6B7C93;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

const BadgeContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: flex-end;
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 6px 12px;
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
  padding: 6px 12px;
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
  line-height: 1.6;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  word-break: break-word;
  overflow-wrap: break-word;
`;

const TicketFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
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

const FormSelect = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
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

const InfoBox = styled.div`
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoLabel = styled.span`
  color: #6B7C93;
  font-weight: 500;
`;

const InfoValue = styled.span`
  color: #0A2540;
  font-weight: 600;
  word-break: break-word;
  overflow-wrap: break-word;
  text-align: right;
  max-width: 60%;
`;

const DetailDescription = styled.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.6;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  margin-bottom: 20px;
  word-break: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;
`;

const OperationInquiryPage: React.FC = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<OperationTicket[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState<OperationTicket | null>(null);
  const [detailStatus, setDetailStatus] = useState<OperationTicket['status']>('open');
  const [unreadCounts, setUnreadCounts] = useState<Record<string, { total_comments: number; unread_count: number }>>({});

  const currentUserId = user?.id || '2';
  const currentUserRole = user?.role || 'Brand General';

  useEffect(() => {
    if (user) {
      fetchTickets();
      const interval = setInterval(fetchTickets, 10000);
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/operation-tickets?userId=${currentUserId}&userRole=${currentUserRole}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
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
      const token = localStorage.getItem('auth_token');
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
                         ticket.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.requesterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.restaurantName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const totalTickets = tickets.length;
  const openTickets = tickets.filter(t => t.status === 'open').length;
  const inProgressTickets = tickets.filter(t => t.status === 'in-progress').length;
  const resolvedTickets = tickets.filter(t => t.status === 'resolved').length;

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-MY');
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const handleViewTicket = (ticket: OperationTicket) => {
    setSelectedTicket(ticket);
    setDetailStatus(ticket.status);
    window.dispatchEvent(new Event('refreshBadgeCounts'));
  };

  const handleStatusChange = async () => {
    if (!selectedTicket || detailStatus === selectedTicket.status) return;

    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/operation-tickets/${selectedTicket.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          status: detailStatus,
          ...(detailStatus === 'resolved' && {
            resolvedAt: new Date().toISOString().replace('T', ' ').slice(0, 19)
          })
        })
      });

      if (response.ok) {
        const result = await response.json();
        const updatedTicket = result.data || result;
        setTickets(prev => prev.map(t =>
          t.id === selectedTicket.id ? { ...t, ...updatedTicket } : t
        ));
        setSelectedTicket(prev => prev ? { ...prev, ...updatedTicket } : null);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <>
      <Container>
        <Header>
          <Title>Operation Inquiry</Title>
        </Header>
        <Content>
          <StatsGrid>
            <StatCard borderColor="#635BFF">
              <StatValue>{totalTickets}</StatValue>
              <StatLabel>Total Inquiries</StatLabel>
            </StatCard>
            <StatCard borderColor="#F59E0B">
              <StatValue>{openTickets}</StatValue>
              <StatLabel>Open</StatLabel>
            </StatCard>
            <StatCard borderColor="#3B82F6">
              <StatValue>{inProgressTickets}</StatValue>
              <StatLabel>In Progress</StatLabel>
            </StatCard>
            <StatCard borderColor="#10B981">
              <StatValue>{resolvedTickets}</StatValue>
              <StatLabel>Resolved</StatLabel>
            </StatCard>
          </StatsGrid>

          <FiltersContainer>
            <FilterGroup>
              <FilterLabel>Search</FilterLabel>
              <SearchInput
                placeholder="Search inquiries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </FilterGroup>
            <FilterGroup>
              <FilterLabel>Status</FilterLabel>
              <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </Select>
            </FilterGroup>
            <FilterGroup>
              <FilterLabel>Priority</FilterLabel>
              <Select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
                <option value="all">All Priority</option>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </Select>
            </FilterGroup>
          </FiltersContainer>

          <TicketsGrid>
            {filteredTickets.map(ticket => (
              <TicketCard key={ticket.id} onClick={() => handleViewTicket(ticket)}>
                <TicketHeader>
                  <TicketInfo>
                    <TicketNumber>{ticket.ticketNumber}</TicketNumber>
                    <TicketSubject>{ticket.subject}</TicketSubject>
                    <TicketMeta>
                      <span>Restaurant: {ticket.restaurantName}</span>
                      <span>From: {ticket.requesterName}</span>
                      <span>Category: {ticket.category}</span>
                    </TicketMeta>
                  </TicketInfo>
                  <BadgeContainer>
                    <StatusBadge status={ticket.status}>{ticket.status}</StatusBadge>
                    <PriorityBadge priority={ticket.priority}>{ticket.priority}</PriorityBadge>
                  </BadgeContainer>
                </TicketHeader>

                <TicketDescription>{ticket.description}</TicketDescription>

                <TicketFooter>
                  <span>Created: {formatDateTime(ticket.createdAt)}</span>
                  {ticket.responseTime > 0 && (
                    <span>Response Time: {formatDuration(ticket.responseTime)}</span>
                  )}
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
                </TicketFooter>
              </TicketCard>
            ))}

            {filteredTickets.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: '#6B7280',
                gridColumn: '1 / -1'
              }}>
                <h3 style={{ color: '#374151', marginBottom: '8px' }}>No inquiries yet</h3>
                <p>Restaurant inquiries will appear here when submitted.</p>
              </div>
            )}
          </TicketsGrid>

          {/* Detail Modal */}
          {selectedTicket && (
            <CommonModal isOpen={true} onClose={() => setSelectedTicket(null)} title={selectedTicket.ticketNumber} size="large" footer={<><Button variant="secondary" onClick={() => setSelectedTicket(null)}>Close</Button></>}>
                  <InfoBox>
                    <InfoRow>
                      <InfoLabel>Subject:</InfoLabel>
                      <InfoValue>{selectedTicket.subject}</InfoValue>
                    </InfoRow>
                    <InfoRow>
                      <InfoLabel>Restaurant:</InfoLabel>
                      <InfoValue>{selectedTicket.restaurantName}</InfoValue>
                    </InfoRow>
                    <InfoRow>
                      <InfoLabel>From:</InfoLabel>
                      <InfoValue>{selectedTicket.requesterName}</InfoValue>
                    </InfoRow>
                    <InfoRow>
                      <InfoLabel>Priority:</InfoLabel>
                      <InfoValue><PriorityBadge priority={selectedTicket.priority}>{selectedTicket.priority}</PriorityBadge></InfoValue>
                    </InfoRow>
                    <InfoRow>
                      <InfoLabel>Category:</InfoLabel>
                      <InfoValue>{selectedTicket.category}</InfoValue>
                    </InfoRow>
                    <InfoRow>
                      <InfoLabel>Created:</InfoLabel>
                      <InfoValue>{formatDateTime(selectedTicket.createdAt)}</InfoValue>
                    </InfoRow>
                  </InfoBox>

                  <FormLabel>Description</FormLabel>
                  <DetailDescription>{selectedTicket.description}</DetailDescription>

                  {selectedTicket?.attachments && selectedTicket.attachments.length > 0 && (
                    <AttachmentList attachments={selectedTicket.attachments} />
                  )}

                  <FormGroup>
                    <FormLabel>Status</FormLabel>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <FormSelect
                        value={detailStatus}
                        onChange={(e) => setDetailStatus(e.target.value as OperationTicket['status'])}
                        style={{ flex: 1 }}
                      >
                        <option value="open">Open</option>
                        <option value="in-progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="closed">Closed</option>
                      </FormSelect>
                      {detailStatus !== selectedTicket.status && (
                        <Button variant="primary" onClick={handleStatusChange} style={{ padding: '10px 16px', fontSize: '13px' }}>
                          Save
                        </Button>
                      )}
                    </div>
                  </FormGroup>

                  <CommentSection entityType="operation_ticket" entityId={String(selectedTicket.id)} currentUserId={user?.id} onMarkRead={() => setUnreadCounts(prev => { const next = { ...prev }; const key = String(selectedTicket.id); if (next[key]) next[key] = { ...next[key], unread_count: 0 }; return next; })} />
            </CommonModal>
          )}
        </Content>
      </Container>
    </>
  );
};

export default OperationInquiryPage;
