import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainLayout from '../../components/Layout/MainLayout';
import { useAuth } from '../../contexts/AuthContext';

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
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div<{ borderColor?: string }>`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border-left: 4px solid ${props => props.borderColor || '#635BFF'};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
`;

const StatValue = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 8px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #6B7C93;
  font-weight: 500;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E6EBF1;
  overflow-x: auto;
`;

const Tab = styled.button<{ active?: boolean }>`
  padding: 12px 0;
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.active ? '#635BFF' : '#6B7C93'};
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  transition: all 0.15s;
  white-space: nowrap;

  &:hover {
    color: #635BFF;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: ${props => props.active ? '#635BFF' : 'transparent'};
    transition: all 0.15s;
  }
`;

const TicketsGrid = styled.div`
  display: grid;
  gap: 20px;
`;

const TicketCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;

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
`;

const ResponseSection = styled.div`
  margin-top: 16px;
  padding: 16px;
  background: #F0F9FF;
  border-radius: 8px;
  border: 1px solid #BAE6FD;
`;

const ResponseHeader = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #0369A1;
  margin-bottom: 8px;
`;

const ResponseText = styled.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
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

const ActionButton = styled.button<{ variant?: 'primary' | 'danger' }>`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${props => props.variant === 'danger' ? `
    background: #FEE2E2;
    color: #DC2626;

    &:hover {
      background: #FEE2E2;
      transform: translateY(-1px);
    }
  ` : `
    background: #635BFF;
    color: white;

    &:hover {
      background: #5A51E6;
      transform: translateY(-1px);
    }
  `}
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
`;

const ModalHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #6B7C93;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;

  &:hover {
    color: #0A2540;
  }
`;

const ModalBody = styled.div`
  padding: 24px;
`;

const ModalFooter = styled.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
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

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const FormTextArea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 120px;
  transition: all 0.15s;
  font-family: inherit;

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
`;

const OperationInquiryPage: React.FC = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<OperationTicket[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'open' | 'in-progress' | 'resolved' | 'closed'>('all');
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<OperationTicket | null>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [replyStatus, setReplyStatus] = useState<OperationTicket['status']>('in-progress');

  const currentUserId = user?.id || '4';
  const currentUserRole = user?.role || 'Foodcourt General';

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
      }
    } catch (error) {
      console.error('Error fetching operation tickets:', error);
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    return activeTab === 'all' || ticket.status === activeTab;
  });

  const totalTickets = tickets.length;
  const openTickets = tickets.filter(t => t.status === 'open').length;
  const inProgressTickets = tickets.filter(t => t.status === 'in-progress').length;
  const resolvedTickets = tickets.filter(t => t.status === 'resolved').length;
  const closedTickets = tickets.filter(t => t.status === 'closed').length;

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-MY');
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const handleReplyTicket = (ticket: OperationTicket) => {
    setSelectedTicket(ticket);
    setReplyMessage(ticket.response || '');
    setReplyStatus(ticket.response ? ticket.status : 'in-progress');
    setShowReplyModal(true);
  };

  const handleSendReply = async () => {
    if (!replyMessage.trim() || !selectedTicket) return;

    const createdTime = new Date(selectedTicket.createdAt).getTime();
    const currentTime = new Date().getTime();
    const responseTimeMinutes = Math.round((currentTime - createdTime) / (1000 * 60));

    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/operation-tickets/${selectedTicket.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          status: replyStatus,
          response: replyMessage,
          responseTime: responseTimeMinutes > 0 ? responseTimeMinutes : 1,
          ...(replyStatus === 'resolved' && {
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
        setReplyMessage('');
        setShowReplyModal(false);
      } else {
        alert('Failed to send reply. Please try again.');
      }
    } catch (error) {
      console.error('Error sending reply:', error);
      alert('Error sending reply. Please try again.');
    }
  };

  return (
    <MainLayout>
      <Container>
        <Header>
          <Title>Operation Inquiry</Title>
          <ActionSection>
            <Button variant="secondary" onClick={fetchTickets}>Refresh</Button>
          </ActionSection>
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

          <TabContainer>
            <Tab active={activeTab === 'all'} onClick={() => setActiveTab('all')}>
              All ({totalTickets})
            </Tab>
            <Tab active={activeTab === 'open'} onClick={() => setActiveTab('open')}>
              Open ({openTickets})
            </Tab>
            <Tab active={activeTab === 'in-progress'} onClick={() => setActiveTab('in-progress')}>
              In Progress ({inProgressTickets})
            </Tab>
            <Tab active={activeTab === 'resolved'} onClick={() => setActiveTab('resolved')}>
              Resolved ({resolvedTickets})
            </Tab>
            <Tab active={activeTab === 'closed'} onClick={() => setActiveTab('closed')}>
              Closed ({closedTickets})
            </Tab>
          </TabContainer>

          <TicketsGrid>
            {filteredTickets.map(ticket => (
              <TicketCard key={ticket.id}>
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

                {ticket.response && (
                  <ResponseSection>
                    <ResponseHeader>
                      Your Response • {ticket.resolvedAt && formatDateTime(ticket.resolvedAt)}
                    </ResponseHeader>
                    <ResponseText>{ticket.response}</ResponseText>
                  </ResponseSection>
                )}

                <TicketFooter>
                  <span>Created: {formatDateTime(ticket.createdAt)}</span>
                  {ticket.responseTime > 0 && (
                    <span>Response Time: {formatDuration(ticket.responseTime)}</span>
                  )}
                  <ActionButton variant="primary" onClick={() => handleReplyTicket(ticket)}>
                    {ticket.response ? 'Update Reply' : 'Reply'}
                  </ActionButton>
                </TicketFooter>
              </TicketCard>
            ))}

            {filteredTickets.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: '#6B7280'
              }}>
                <h3 style={{ color: '#374151', marginBottom: '8px' }}>No inquiries yet</h3>
                <p>Restaurant inquiries will appear here when submitted.</p>
              </div>
            )}
          </TicketsGrid>

          {/* Reply Modal */}
          {showReplyModal && selectedTicket && (
            <Modal onClick={() => setShowReplyModal(false)}>
              <ModalContent onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                  <ModalTitle>{selectedTicket.response ? 'Update Reply' : 'Reply to Inquiry'}</ModalTitle>
                  <CloseButton onClick={() => setShowReplyModal(false)}>×</CloseButton>
                </ModalHeader>
                <ModalBody>
                  <InfoBox>
                    <InfoRow>
                      <InfoLabel>Ticket Number:</InfoLabel>
                      <InfoValue>{selectedTicket.ticketNumber}</InfoValue>
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
                      <InfoLabel>Subject:</InfoLabel>
                      <InfoValue>{selectedTicket.subject}</InfoValue>
                    </InfoRow>
                  </InfoBox>

                  <FormGroup>
                    <FormLabel>Status *</FormLabel>
                    <FormSelect
                      value={replyStatus}
                      onChange={(e) => setReplyStatus(e.target.value as OperationTicket['status'])}
                    >
                      <option value="open">Open</option>
                      <option value="in-progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                      <option value="closed">Closed</option>
                    </FormSelect>
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Response Message *</FormLabel>
                    <FormTextArea
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      placeholder="Enter your response to the inquiry..."
                    />
                  </FormGroup>
                </ModalBody>
                <ModalFooter>
                  <Button variant="secondary" onClick={() => setShowReplyModal(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleSendReply}
                    disabled={!replyMessage.trim()}
                  >
                    Send Reply
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}
        </Content>
      </Container>
    </MainLayout>
  );
};

export default OperationInquiryPage;
