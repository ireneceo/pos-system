import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainLayout from '../../components/Layout/MainLayout';

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
  internalNotes?: string;
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

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`;

const StatCard = styled.div<{ color?: string }>`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${props => props.color || '#635BFF'};
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
  padding: 20px 0;
  margin-bottom: 24px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
  border-bottom: 1px solid #E6EBF1;
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

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  ${props => props.variant === 'primary' ? `
    background: #635BFF;
    color: white;
    border-color: #635BFF;

    &:hover {
      background: #5A51E6;
    }
  ` : props.variant === 'danger' ? `
    background: transparent;
    color: #DC2626;
    border-color: #FCA5A5;

    &:hover {
      background: #FEE2E2;
    }
  ` : `
    background: transparent;
    color: #6B7280;
    border-color: #E6EBF1;

    &:hover {
      background: #F8FAFC;
      color: #0A2540;
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

const FormTextArea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 100px;
  transition: all 0.15s;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const OperationInquiryPage: React.FC = () => {
  const [tickets, setTickets] = useState<OperationTicket[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState<OperationTicket | null>(null);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
  const [internalNote, setInternalNote] = useState('');

  // Get current user info (for demo, using hardcoded manager ID)
  const currentManagerId = localStorage.getItem('userId') || '2';
  // const currentManagerName = localStorage.getItem('userName') || 'Manager';

  useEffect(() => {
    fetchTickets();
    const interval = setInterval(fetchTickets, 10000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await fetch(`/api/operation-tickets?userId=${currentManagerId}&userRole=Manager`);
      if (response.ok) {
        const data = await response.json();
        setTickets(data);
      }
    } catch (error) {
      console.error('Error fetching operation tickets:', error);
    }
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
    return new Date(dateString).toLocaleString('en-MY');
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const handleReply = (ticket: OperationTicket) => {
    setSelectedTicket(ticket);
    setShowReplyModal(true);
  };

  const handleSendReply = async () => {
    if (!selectedTicket || !replyMessage.trim()) return;

    try {
      const response = await fetch(`/api/operation-tickets/${selectedTicket.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          response: replyMessage,
          status: 'resolved'
        })
      });

      if (response.ok) {
        await fetchTickets();
        setReplyMessage('');
        setShowReplyModal(false);
      }
    } catch (error) {
      console.error('Error sending reply:', error);
    }
  };

  const handleAddNote = (ticket: OperationTicket) => {
    setSelectedTicket(ticket);
    setInternalNote(ticket.internalNotes || '');
    setShowNoteModal(true);
  };

  const handleSaveNote = async () => {
    if (!selectedTicket) return;

    try {
      const response = await fetch(`/api/operation-tickets/${selectedTicket.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          internalNotes: internalNote
        })
      });

      if (response.ok) {
        await fetchTickets();
        setInternalNote('');
        setShowNoteModal(false);
      }
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleUpdateStatus = async (ticket: OperationTicket, newStatus: string) => {
    try {
      const response = await fetch(`/api/operation-tickets/${ticket.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        await fetchTickets();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <MainLayout>
      <Container>
        <Header>
          <Title>Operation Inquiry</Title>
          <Button variant="secondary" onClick={fetchTickets}>Refresh</Button>
        </Header>
        <Content>
          <StatsGrid>
            <StatCard color="#059669">
              <StatValue>{totalTickets}</StatValue>
              <StatLabel>Total Inquiries</StatLabel>
            </StatCard>
            <StatCard color="#D97706">
              <StatValue>{openTickets}</StatValue>
              <StatLabel>Open</StatLabel>
            </StatCard>
            <StatCard color="#2563EB">
              <StatValue>{inProgressTickets}</StatValue>
              <StatLabel>In Progress</StatLabel>
            </StatCard>
            <StatCard color="#7C3AED">
              <StatValue>{resolvedTickets}</StatValue>
              <StatLabel>Resolved</StatLabel>
            </StatCard>
          </StatsGrid>

          <FiltersContainer>
            <SearchInput
              placeholder="Search inquiries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </Select>
            <Select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
              <option value="all">All Priority</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </Select>
          </FiltersContainer>

          <TicketsGrid>
            {filteredTickets.map(ticket => (
              <TicketCard key={ticket.id}>
                <TicketHeader>
                  <TicketInfo>
                    <TicketNumber>{ticket.ticketNumber}</TicketNumber>
                    <TicketSubject>{ticket.subject}</TicketSubject>
                    <RequesterInfo>
                      {ticket.requesterName} ({ticket.requesterRole}) • {ticket.restaurantName}
                    </RequesterInfo>
                  </TicketInfo>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <StatusBadge status={ticket.status}>{ticket.status}</StatusBadge>
                    <PriorityBadge priority={ticket.priority}>{ticket.priority}</PriorityBadge>
                  </div>
                </TicketHeader>

                <TicketDescription>{ticket.description}</TicketDescription>

                {ticket.response && (
                  <div style={{
                    marginTop: '16px',
                    padding: '12px',
                    backgroundColor: '#F0F9FF',
                    borderRadius: '8px',
                    border: '1px solid #BAE6FD'
                  }}>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: '#0369A1', marginBottom: '6px' }}>
                      Manager Response • {ticket.resolvedAt && formatDateTime(ticket.resolvedAt)}
                    </div>
                    <div style={{ fontSize: '14px', color: '#374151' }}>
                      {ticket.response}
                    </div>
                  </div>
                )}

                {ticket.internalNotes && (
                  <div style={{
                    marginTop: '16px',
                    padding: '12px',
                    backgroundColor: '#FEF3C7',
                    borderRadius: '8px',
                    border: '1px solid #FCD34D'
                  }}>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: '#92400E', marginBottom: '6px' }}>
                      Internal Notes (Not visible to requester)
                    </div>
                    <div style={{ fontSize: '14px', color: '#78350F' }}>
                      {ticket.internalNotes}
                    </div>
                  </div>
                )}

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '16px',
                  paddingTop: '16px',
                  borderTop: '1px solid #F3F4F6',
                  fontSize: '12px',
                  color: '#6B7280'
                }}>
                  <span>Created: {formatDateTime(ticket.createdAt)}</span>
                  {ticket.responseTime > 0 && (
                    <span>Response Time: {formatDuration(ticket.responseTime)}</span>
                  )}
                </div>

                <ActionButtons>
                  {ticket.status === 'open' && (
                    <ActionButton variant="primary" onClick={() => handleUpdateStatus(ticket, 'in-progress')}>
                      Start Working
                    </ActionButton>
                  )}
                  {ticket.status !== 'closed' && ticket.status !== 'resolved' && (
                    <ActionButton variant="primary" onClick={() => handleReply(ticket)}>
                      Reply
                    </ActionButton>
                  )}
                  <ActionButton onClick={() => handleAddNote(ticket)}>
                    {ticket.internalNotes ? 'Edit Note' : 'Add Note'}
                  </ActionButton>
                  {ticket.status === 'resolved' && (
                    <ActionButton onClick={() => handleUpdateStatus(ticket, 'closed')}>
                      Close Inquiry
                    </ActionButton>
                  )}
                </ActionButtons>
              </TicketCard>
            ))}
          </TicketsGrid>

          {/* Reply Modal */}
          {showReplyModal && selectedTicket && (
            <Modal onClick={() => setShowReplyModal(false)}>
              <ModalContent onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                  <ModalTitle>Reply to {selectedTicket.ticketNumber}</ModalTitle>
                  <CloseButton onClick={() => setShowReplyModal(false)}>×</CloseButton>
                </ModalHeader>
                <ModalBody>
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E6EBF1' }}>
                      <div style={{ fontWeight: '600', color: '#0A2540', marginBottom: '4px' }}>
                        {selectedTicket.subject}
                      </div>
                      <div style={{ fontSize: '14px', color: '#6B7280', marginBottom: '8px' }}>
                        From: {selectedTicket.requesterName} ({selectedTicket.requesterRole})
                      </div>
                      <div style={{ color: '#374151', lineHeight: '1.5' }}>
                        {selectedTicket.description}
                      </div>
                    </div>
                  </div>

                  <FormGroup>
                    <FormLabel>Your Reply</FormLabel>
                    <FormTextArea
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      placeholder="Type your reply to the staff member..."
                      style={{ minHeight: '120px' }}
                    />
                  </FormGroup>
                </ModalBody>
                <ModalFooter>
                  <Button variant="secondary" onClick={() => setShowReplyModal(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleSendReply} disabled={!replyMessage.trim()}>
                    Send Reply
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}

          {/* Note Modal */}
          {showNoteModal && selectedTicket && (
            <Modal onClick={() => setShowNoteModal(false)}>
              <ModalContent onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                  <ModalTitle>Internal Note for {selectedTicket.ticketNumber}</ModalTitle>
                  <CloseButton onClick={() => setShowNoteModal(false)}>×</CloseButton>
                </ModalHeader>
                <ModalBody>
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E6EBF1' }}>
                      <div style={{ fontWeight: '600', color: '#0A2540', marginBottom: '4px' }}>
                        {selectedTicket.subject}
                      </div>
                      <div style={{ fontSize: '14px', color: '#6B7280' }}>
                        From: {selectedTicket.requesterName} ({selectedTicket.requesterRole})
                      </div>
                    </div>
                  </div>

                  <FormGroup>
                    <FormLabel>Internal Note (Not visible to requester)</FormLabel>
                    <FormTextArea
                      value={internalNote}
                      onChange={(e) => setInternalNote(e.target.value)}
                      placeholder="Add internal notes about this inquiry..."
                      style={{ minHeight: '120px' }}
                    />
                  </FormGroup>
                </ModalBody>
                <ModalFooter>
                  <Button variant="secondary" onClick={() => setShowNoteModal(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleSaveNote}>
                    Save Note
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