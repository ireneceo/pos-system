import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainLayout from '../../components/Layout/MainLayout';
import { useAuth } from '../../contexts/AuthContext';

interface Manager {
  id: number;
  username: string;
  email: string;
  role: string;
  company_name?: string;
}

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

const ManagerInfo = styled.div`
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
  color: #6B7C93;
  margin-bottom: 8px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.15s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
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
  const { user } = useAuth();
  const [tickets, setTickets] = useState<OperationTicket[]>([]);
  const [managers, setManagers] = useState<Manager[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTicket, setNewTicket] = useState({
    subject: '',
    description: '',
    priority: 'medium' as OperationTicket['priority'],
    category: 'other' as OperationTicket['category'],
    inquiryType: '' as 'foodcourt' | 'brand' | ''
  });

  // Get current user info from auth context
  const currentUserId = user?.id || '3';
  const currentUserName = user?.name || user?.email || 'Restaurant User';
  const currentUserEmail = user?.email || 'restaurant@example.com';
  const currentUserRole = user?.role || 'Restaurant Admin';
  const currentRestaurantId = user?.restaurantId || '1';
  const currentRestaurantName = user?.restaurantName || 'Test Restaurant';

  useEffect(() => {
    if (user && user.restaurantId) {
      fetchTickets();
      fetchManagers();
      const interval = setInterval(fetchTickets, 10000);
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Auto-select inquiry type if only one type of manager is connected
  useEffect(() => {
    if (managers.length > 0) {
      const hasFoodcourtManager = managers.some(m => m.role === 'Foodcourt General' || m.role === 'Foodcourt Manager');
      const hasBrandManager = managers.some(m => m.role === 'Brand General' || m.role === 'Brand Manager');

      // If only one type of manager is connected, auto-select it
      if (hasFoodcourtManager && !hasBrandManager) {
        setNewTicket(prev => ({...prev, inquiryType: 'foodcourt'}));
      } else if (hasBrandManager && !hasFoodcourtManager) {
        setNewTicket(prev => ({...prev, inquiryType: 'brand'}));
      } else {
        // Both or neither - let user select (reset to empty)
        setNewTicket(prev => ({...prev, inquiryType: ''}));
      }
    }
  }, [managers]);

  const fetchManagers = async () => {
    try {
      const response = await fetch(`/api/restaurants/${currentRestaurantId}`);
      if (response.ok) {
        const data = await response.json();
        console.log('Restaurant data:', data);

        // Extract managers from restaurant data
        if (data.managers && data.managers.length > 0) {
          setManagers(data.managers);
        } else {
          console.warn('No managers found for restaurant');
        }
      }
    } catch (error) {
      console.error('Error fetching managers:', error);
    }
  };

  const fetchTickets = async () => {
    try {
      const response = await fetch(`/api/operation-tickets?userId=${currentUserId}&userRole=${currentUserRole}`);
      if (response.ok) {
        const data = await response.json();
        setTickets(data);
      }
    } catch (error) {
      console.error('Error fetching operation tickets:', error);
    }
  };

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

  const handleCreateTicket = () => {
    setShowCreateModal(true);
  };

  const handleSubmitTicket = async () => {
    if (!newTicket.subject.trim() || !newTicket.description.trim() || !newTicket.inquiryType) {
      alert('Please fill in all required fields and select inquiry type.');
      return;
    }

    try {
      // Get managers for the selected inquiry type
      const typeManagers = managers.filter(m => {
        if (newTicket.inquiryType === 'foodcourt') {
          return m.role === 'Foodcourt General' || m.role === 'Foodcourt Manager';
        } else {
          return m.role === 'Brand General' || m.role === 'Brand Manager';
        }
      });

      if (typeManagers.length === 0) {
        alert(`No ${newTicket.inquiryType} managers connected to this restaurant.`);
        return;
      }

      // Use first manager as representative
      const representativeManager = typeManagers[0];

      const ticketData = {
        requesterId: parseInt(currentUserId),
        requesterName: currentUserName,
        requesterEmail: currentUserEmail,
        requesterRole: currentUserRole,
        restaurantId: parseInt(currentRestaurantId),
        restaurantName: currentRestaurantName,
        managerId: representativeManager.id,
        managerName: representativeManager.company_name || representativeManager.username,
        subject: newTicket.subject,
        description: newTicket.description,
        priority: newTicket.priority,
        category: newTicket.category,
        inquiryType: newTicket.inquiryType
      };

      const response = await fetch('/api/operation-tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ticketData)
      });

      if (response.ok) {
        await fetchTickets();
        setNewTicket({
          subject: '',
          description: '',
          priority: 'medium',
          category: 'other',
          inquiryType: ''
        });
        setShowCreateModal(false);
      } else {
        alert('Failed to create inquiry. Please try again.');
      }
    } catch (error) {
      console.error('Error creating ticket:', error);
      alert('Error creating inquiry. Please try again.');
    }
  };

  return (
    <MainLayout>
      <Container>
        <Header>
          <Title>Operation Inquiry</Title>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Button variant="secondary" onClick={fetchTickets}>Refresh</Button>
            <Button variant="primary" onClick={handleCreateTicket}>New Inquiry</Button>
          </div>
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

          <TicketsGrid>
            {tickets.map(ticket => (
              <TicketCard key={ticket.id}>
                <TicketHeader>
                  <TicketInfo>
                    <TicketNumber>{ticket.ticketNumber}</TicketNumber>
                    <TicketSubject>{ticket.subject}</TicketSubject>
                    <ManagerInfo>Manager: {ticket.managerName}</ManagerInfo>
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
                  <span>Category: {ticket.category}</span>
                  {ticket.responseTime > 0 && (
                    <span>Response Time: {formatDuration(ticket.responseTime)}</span>
                  )}
                </div>
              </TicketCard>
            ))}

            {tickets.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: '#6B7280'
              }}>
                <h3 style={{ color: '#374151', marginBottom: '8px' }}>No inquiries yet</h3>
                <p>Click "New Inquiry" to submit your first operation inquiry to your manager.</p>
              </div>
            )}
          </TicketsGrid>

          {/* Create Inquiry Modal */}
          {showCreateModal && (
            <Modal onClick={() => setShowCreateModal(false)}>
              <ModalContent onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                  <ModalTitle>Create Operation Inquiry</ModalTitle>
                  <CloseButton onClick={() => setShowCreateModal(false)}>×</CloseButton>
                </ModalHeader>
                <ModalBody>
                  <FormGroup>
                    <FormLabel>문의대상 *</FormLabel>
                    <FormSelect
                      value={newTicket.inquiryType}
                      onChange={(e) => setNewTicket({...newTicket, inquiryType: e.target.value as 'foodcourt' | 'brand'})}
                      required
                      disabled={managers.length === 0 || (
                        (managers.filter(m => m.role === 'Foodcourt General' || m.role === 'Foodcourt Manager').length > 0 ? 1 : 0) +
                        (managers.filter(m => m.role === 'Brand General' || m.role === 'Brand Manager').length > 0 ? 1 : 0)
                      ) === 1}
                    >
                      <option value="">
                        {managers.length === 0 ? 'No managers connected' : 'Select Inquiry Target'}
                      </option>
                      {managers.filter(m => m.role === 'Foodcourt General' || m.role === 'Foodcourt Manager').length > 0 && (
                        <option value="foodcourt">Foodcourt</option>
                      )}
                      {managers.filter(m => m.role === 'Brand General' || m.role === 'Brand Manager').length > 0 && (
                        <option value="brand">Brand</option>
                      )}
                    </FormSelect>
                    {managers.length === 0 && (
                      <div style={{ fontSize: '12px', color: '#DC2626', marginTop: '4px' }}>
                        This restaurant is not connected to any manager. Please contact system administrator.
                      </div>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Subject *</FormLabel>
                    <FormInput
                      type="text"
                      value={newTicket.subject}
                      onChange={(e) => setNewTicket({...newTicket, subject: e.target.value})}
                      placeholder="Brief description of your inquiry"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Description *</FormLabel>
                    <FormTextArea
                      value={newTicket.description}
                      onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                      placeholder="Detailed description of your inquiry..."
                      rows={4}
                      required
                    />
                  </FormGroup>
                  <FormRow>
                    <FormGroup>
                      <FormLabel>Priority</FormLabel>
                      <FormSelect
                        value={newTicket.priority}
                        onChange={(e) => setNewTicket({...newTicket, priority: e.target.value as OperationTicket['priority']})}
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </FormSelect>
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>Category</FormLabel>
                      <FormSelect
                        value={newTicket.category}
                        onChange={(e) => setNewTicket({...newTicket, category: e.target.value as OperationTicket['category']})}
                      >
                        <option value="schedule">Schedule</option>
                        <option value="inventory">Inventory</option>
                        <option value="staff">Staff</option>
                        <option value="menu">Menu</option>
                        <option value="customer">Customer</option>
                        <option value="other">Other</option>
                      </FormSelect>
                    </FormGroup>
                  </FormRow>
                </ModalBody>
                <ModalFooter>
                  <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleSubmitTicket}
                    disabled={!newTicket.subject.trim() || !newTicket.description.trim() || !newTicket.inquiryType}
                  >
                    Submit Inquiry
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