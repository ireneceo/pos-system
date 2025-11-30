import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainLayout from '../../components/Layout/MainLayout';
import { useAuth } from '../../contexts/AuthContext';

interface SupportTicket {
  id: string;
  ticketNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerRole: 'manager' | 'restaurant' | 'staff';
  restaurantId?: number;
  restaurantName?: string;
  subject: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'technical' | 'billing' | 'feature-request' | 'bug-report' | 'general';
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  responseTime: number;
  resolutionTime?: number;
  replyMessage?: string;
  repliedBy?: string;
  repliedAt?: string;
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

const CustomerInfo = styled.div`
  font-size: 14px;
  color: #6B7280;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const RoleBadge = styled.span<{ role: string }>`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  margin-left: 8px;
  background: ${props => {
    switch(props.role) {
      case 'manager': return '#E0F2FE';
      case 'restaurant': return '#FEF3C7';
      case 'staff': return '#ECFDF5';
      default: return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch(props.role) {
      case 'manager': return '#0891B2';
      case 'restaurant': return '#D97706';
      case 'staff': return '#059669';
      default: return '#6B7280';
    }
  }};
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
  color: #374151;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
  flex-wrap: wrap;
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

// Modal components (using same styles as Admin)
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

const SupportTicketsPage: React.FC = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterRole, setFilterRole] = useState('all');
  const [showCreateTicketModal, setShowCreateTicketModal] = useState(false);
  const [showViewTicketModal, setShowViewTicketModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [newTicket, setNewTicket] = useState({
    subject: '',
    description: '',
    priority: 'medium' as SupportTicket['priority'],
    category: 'general' as SupportTicket['category']
  });

  // 현재 사용자의 레스토랑 ID (실제로는 user context에서 가져올 것)
  const currentRestaurantId = user?.restaurantId || 2;
  const currentRestaurantName = 'IOI Mall Food Court'; // 실제로는 user context에서 가져올 것

  useEffect(() => {
    // API에서 모든 티켓 불러오기 (시스템관리자에게 모두 표시되어야 함)
    const fetchTickets = async () => {
      try {
        const response = await fetch('/api/support-tickets');
        if (response.ok) {
          const allTickets = await response.json();
          console.log('📡 Restaurant page - All tickets loaded:', allTickets.length);
          setTickets(allTickets);
        }
      } catch (error) {
        console.error('Error fetching tickets:', error);
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
    const matchesRole = filterRole === 'all' || ticket.customerRole === filterRole;
    // 모든 티켓 표시 (레스토랑 제한 제거)
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory && matchesRole;
  });

  const totalTickets = tickets.length;
  const openTickets = tickets.filter(t => t.status === 'open').length;
  const inProgressTickets = tickets.filter(t => t.status === 'in-progress').length;
  const resolvedTickets = tickets.filter(t => t.status === 'resolved').length;
  const avgResponseTime = Math.round(tickets.reduce((sum, t) => sum + t.responseTime, 0) / tickets.length);

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-MY');
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
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
      'Assigned To',
      'Created At',
      'Updated At',
      'Response Time (minutes)',
      'Resolution Time (minutes)'
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
      ticket.assignedTo || 'Unassigned',
      ticket.createdAt,
      ticket.updatedAt,
      ticket.responseTime,
      ticket.resolutionTime || 'N/A'
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
        customerId: user?.id || 'restaurant-user',
        customerName: user?.name || 'Restaurant User',
        customerEmail: user?.email || 'user@restaurant.com',
        customerRole: ['Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager'].includes(user?.role || '') ? 'manager' : user?.role === 'Restaurant Admin' ? 'restaurant' : 'staff',
        restaurantId: currentRestaurantId,
        restaurantName: currentRestaurantName,
        subject: newTicket.subject,
        description: newTicket.description,
        status: 'open',
        priority: newTicket.priority,
        category: newTicket.category
      };

      const response = await fetch('/api/support-tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSupportTicket)
      });

      if (response.ok) {
        const createdTicket = await response.json();
        console.log('✅ Manager ticket created:', createdTicket);
        // 티켓 생성 후 다시 전체 티켓 목록을 가져와서 동기화
        const refreshResponse = await fetch('/api/support-tickets');
        if (refreshResponse.ok) {
          const allTickets = await refreshResponse.json();
          console.log('🔄 Manager page - Refreshed all tickets:', allTickets.length);
          setTickets(allTickets);
        }
        setShowCreateTicketModal(false);
      } else {
        console.error('Failed to create ticket');
        alert('Failed to create support ticket. Please try again.');
      }
    } catch (error) {
      console.error('Error creating ticket:', error);
      alert('Error creating support ticket. Please try again.');
    }
    setNewTicket({
      subject: '',
      description: '',
      priority: 'medium',
      category: 'general'
    });
  };

  const handleViewTicket = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setShowViewTicketModal(true);
  };

  return (
    <MainLayout>
      <Container>
        <Header>
          <Title>Support Tickets</Title>
          <ActionSection>
            <Button variant="secondary" onClick={handleExportReports}>Export</Button>
            <Button variant="primary" onClick={handleCreateTicket}>Create Ticket</Button>
          </ActionSection>
        </Header>
        <Content>
          <StatsGrid>
            <StatCard color="#059669">
              <StatValue>{totalTickets}</StatValue>
              <StatLabel>Total Tickets</StatLabel>
            </StatCard>
            <StatCard color="#D97706">
              <StatValue>{openTickets}</StatValue>
              <StatLabel>Open Tickets</StatLabel>
            </StatCard>
            <StatCard color="#2563EB">
              <StatValue>{inProgressTickets}</StatValue>
              <StatLabel>In Progress</StatLabel>
            </StatCard>
            <StatCard color="#7C3AED">
              <StatValue>{resolvedTickets}</StatValue>
              <StatLabel>Resolved</StatLabel>
            </StatCard>
            <StatCard color="#DC2626">
              <StatValue>{formatDuration(avgResponseTime)}</StatValue>
              <StatLabel>Avg Response Time</StatLabel>
            </StatCard>
          </StatsGrid>

          <FiltersContainer>
            <FilterGroup>
              <FilterLabel>Search</FilterLabel>
              <SearchInput
                placeholder="Search tickets..."
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
            <FilterGroup>
              <FilterLabel>Role</FilterLabel>
              <Select value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
                <option value="all">All Roles</option>
                <option value="restaurant">Restaurant Admin</option>
                <option value="staff">Staff</option>
              </Select>
            </FilterGroup>
            <FilterGroup>
              <FilterLabel>Category</FilterLabel>
              <Select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                <option value="all">All Categories</option>
                <option value="technical">Technical</option>
                <option value="billing">Billing</option>
                <option value="feature-request">Feature Request</option>
                <option value="bug-report">Bug Report</option>
                <option value="general">General</option>
              </Select>
            </FilterGroup>
          </FiltersContainer>

          <TicketsGrid>
            {filteredTickets.map(ticket => (
              <TicketCard key={ticket.id}>
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

                {/* Reply Section */}
                {ticket.replyMessage && (
                  <div style={{
                    marginTop: '16px',
                    padding: '12px',
                    backgroundColor: '#F0F9FF',
                    borderRadius: '8px',
                    border: '1px solid #BAE6FD'
                  }}>
                    <div style={{
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#0369A1',
                      marginBottom: '6px'
                    }}>
                      Reply from {ticket.repliedBy} • {formatDateTime(ticket.repliedAt || '')}
                    </div>
                    <div style={{
                      fontSize: '14px',
                      color: '#374151',
                      lineHeight: '1.4'
                    }}>
                      {ticket.replyMessage}
                    </div>
                  </div>
                )}

                <TicketMeta>
                  <MetaItem>
                    <MetaLabel>Created</MetaLabel>
                    <MetaValue>{formatDateTime(ticket.createdAt)}</MetaValue>
                  </MetaItem>
                  <MetaItem>
                    <MetaLabel>Category</MetaLabel>
                    <MetaValue style={{textTransform: 'capitalize'}}>{ticket.category.replace('-', ' ')}</MetaValue>
                  </MetaItem>
                  <MetaItem>
                    <MetaLabel>Response Time</MetaLabel>
                    <MetaValue>{formatDuration(ticket.responseTime)}</MetaValue>
                  </MetaItem>
                  {ticket.assignedTo && (
                    <MetaItem>
                      <MetaLabel>Assigned To</MetaLabel>
                      <MetaValue>{ticket.assignedTo}</MetaValue>
                    </MetaItem>
                  )}
                </TicketMeta>

                <ActionButtons>
                  <ActionButton variant="primary" onClick={() => handleViewTicket(ticket)}>View Details</ActionButton>
                </ActionButtons>
              </TicketCard>
            ))}
          </TicketsGrid>

          {/* Create Ticket Modal */}
          {showCreateTicketModal && (
            <Modal onClick={() => setShowCreateTicketModal(false)}>
              <ModalContent onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                  <ModalTitle>Create Support Ticket</ModalTitle>
                  <CloseButton onClick={() => setShowCreateTicketModal(false)}>×</CloseButton>
                </ModalHeader>
                <ModalBody>
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
                  <FormRow>
                    <FormGroup>
                      <FormLabel>Priority</FormLabel>
                      <FormSelect
                        value={newTicket.priority}
                        onChange={(e) => setNewTicket({...newTicket, priority: e.target.value as SupportTicket['priority']})}
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
                        onChange={(e) => setNewTicket({...newTicket, category: e.target.value as SupportTicket['category']})}
                      >
                        <option value="general">General</option>
                        <option value="technical">Technical</option>
                        <option value="billing">Billing</option>
                        <option value="feature-request">Feature Request</option>
                        <option value="bug-report">Bug Report</option>
                      </FormSelect>
                    </FormGroup>
                  </FormRow>
                </ModalBody>
                <ModalFooter>
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
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}

          {/* View Ticket Details Modal */}
          {showViewTicketModal && selectedTicket && (
            <Modal onClick={() => setShowViewTicketModal(false)}>
              <ModalContent onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                  <ModalTitle>Ticket Details</ModalTitle>
                  <CloseButton onClick={() => setShowViewTicketModal(false)}>×</CloseButton>
                </ModalHeader>
                <ModalBody>
                  <div style={{ display: 'grid', gap: '20px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div>
                        <FormLabel>Ticket Number</FormLabel>
                        <div style={{ padding: '8px 0', color: '#0A2540', fontWeight: '600' }}>
                          {selectedTicket.ticketNumber}
                        </div>
                      </div>
                      <div>
                        <FormLabel>Status</FormLabel>
                        <div style={{ padding: '8px 0' }}>
                          <StatusBadge status={selectedTicket.status}>
                            {selectedTicket.status}
                          </StatusBadge>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div>
                        <FormLabel>Priority</FormLabel>
                        <div style={{ padding: '8px 0' }}>
                          <PriorityBadge priority={selectedTicket.priority}>
                            {selectedTicket.priority}
                          </PriorityBadge>
                        </div>
                      </div>
                      <div>
                        <FormLabel>Category</FormLabel>
                        <div style={{ padding: '8px 0', color: '#374151', textTransform: 'capitalize' }}>
                          {selectedTicket.category.replace('-', ' ')}
                        </div>
                      </div>
                    </div>

                    <div>
                      <FormLabel>Customer Information</FormLabel>
                      <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E6EBF1' }}>
                        <div style={{ marginBottom: '4px', color: '#0A2540', fontWeight: '600' }}>
                          {selectedTicket.customerName}
                          <RoleBadge role={selectedTicket.customerRole} style={{ marginLeft: '8px' }}>
                            {selectedTicket.customerRole}
                          </RoleBadge>
                        </div>
                        <div style={{ color: '#6B7280', fontSize: '14px' }}>
                          {selectedTicket.customerEmail}
                        </div>
                      </div>
                    </div>

                    <div>
                      <FormLabel>Subject</FormLabel>
                      <div style={{ padding: '8px 0', color: '#0A2540', fontWeight: '600' }}>
                        {selectedTicket.subject}
                      </div>
                    </div>

                    <div>
                      <FormLabel>Description</FormLabel>
                      <div style={{
                        padding: '12px',
                        backgroundColor: '#F8FAFC',
                        borderRadius: '8px',
                        border: '1px solid #E6EBF1',
                        minHeight: '100px',
                        whiteSpace: 'pre-wrap',
                        lineHeight: '1.5',
                        color: '#374151'
                      }}>
                        {selectedTicket.description}
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div>
                        <FormLabel>Created At</FormLabel>
                        <div style={{ padding: '8px 0', color: '#6B7280' }}>
                          {selectedTicket.createdAt}
                        </div>
                      </div>
                      <div>
                        <FormLabel>Last Updated</FormLabel>
                        <div style={{ padding: '8px 0', color: '#6B7280' }}>
                          {selectedTicket.updatedAt}
                        </div>
                      </div>
                    </div>

                    {selectedTicket.assignedTo && (
                      <div>
                        <FormLabel>Assigned To</FormLabel>
                        <div style={{ padding: '8px 0', color: '#0A2540' }}>
                          {selectedTicket.assignedTo}
                        </div>
                      </div>
                    )}

                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button variant="secondary" onClick={() => setShowViewTicketModal(false)}>
                    Close
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

export default SupportTicketsPage;