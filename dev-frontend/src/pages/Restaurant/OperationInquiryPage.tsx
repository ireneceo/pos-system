import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { EmptyState } from '../../components/UI/TableComponents';
import { useAuth } from '../../contexts/AuthContext';
import CommentSection from '../../components/Common/CommentSection';
import FileUpload, { AttachmentFile } from '../../components/Common/FileUpload';
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
  word-break: break-word;
  overflow-wrap: break-word;
`;

const ManagerInfo = styled.div`
  font-size: 14px;
  color: #6B7280;
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
  word-break: break-word;
  overflow-wrap: break-word;
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
  margin: auto 0;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
  margin: auto 0;
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
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const OperationInquiryPage: React.FC = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<OperationTicket[]>([]);
  const [managers, setManagers] = useState<{ id: number; name: string; email: string; role: string; company?: string }[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedManagerId, setSelectedManagerId] = useState('');
  const [newTicket, setNewTicket] = useState({
    subject: '',
    description: '',
    priority: 'medium' as OperationTicket['priority'],
    category: 'other' as OperationTicket['category']
  });
  const [selectedTicket, setSelectedTicket] = useState<OperationTicket | null>(null);
  const [newAttachments, setNewAttachments] = useState<AttachmentFile[]>([]);
  const [unreadCounts, setUnreadCounts] = useState<Record<string, { total_comments: number; unread_count: number }>>({});

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

  // Auto-select if only one person connected
  useEffect(() => {
    if (managers.length === 1) {
      setSelectedManagerId(managers[0].id.toString());
    }
  }, [managers]);

  // Helper: derive inquiryType from selected manager's role
  const getInquiryType = (managerId: string): 'foodcourt' | 'brand' | 'owner' | undefined => {
    const m = managers.find(mg => mg.id.toString() === managerId);
    if (!m) return undefined;
    if (m.role === 'Foodcourt General' || m.role === 'Foodcourt Manager') return 'foodcourt';
    if (m.role === 'Brand General' || m.role === 'Brand Manager') return 'brand';
    if (m.role === 'Restaurant Owner') return 'owner';
    return undefined;
  };

  const getRoleLabel = (role: string): string => {
    if (role === 'Foodcourt General' || role === 'Foodcourt Manager') return 'Foodcourt';
    if (role === 'Brand General' || role === 'Brand Manager') return 'Brand';
    if (role === 'Restaurant Owner') return 'Owner';
    return role;
  };

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
                         ticket.managerName.toLowerCase().includes(searchTerm.toLowerCase());
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
    return new Date(dateString).toLocaleString('en-MY');
  };

  const handleViewTicket = (ticket: OperationTicket) => {
    setSelectedTicket(ticket);
    window.dispatchEvent(new Event('refreshBadgeCounts'));
  };

  const handleCreateTicket = () => {
    setShowCreateModal(true);
  };

  const handleSubmitTicket = async () => {
    if (!newTicket.subject.trim() || !newTicket.description.trim() || !selectedManagerId) {
      return;
    }

    const selectedManager = managers.find(m => m.id.toString() === selectedManagerId);
    if (!selectedManager) return;

    const inquiryType = getInquiryType(selectedManagerId);

    try {
      const ticketData = {
        requesterId: parseInt(currentUserId),
        requesterName: currentUserName,
        requesterEmail: currentUserEmail,
        requesterRole: currentUserRole,
        restaurantId: parseInt(currentRestaurantId),
        restaurantName: currentRestaurantName,
        managerId: parseInt(selectedManager.id.toString()),
        managerName: selectedManager.name,
        subject: newTicket.subject,
        description: newTicket.description,
        priority: newTicket.priority,
        category: newTicket.category,
        inquiryType,
        attachments: newAttachments.length > 0 ? newAttachments : undefined
      };

      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/operation-tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(ticketData)
      });

      if (response.ok) {
        await fetchTickets();
        setNewTicket({ subject: '', description: '', priority: 'medium', category: 'other' });
        setNewAttachments([]);
        setSelectedManagerId(managers.length === 1 ? managers[0].id.toString() : '');
        setShowCreateModal(false);
      }
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };

  return (
    <>
      <Container>
        <Header>
          <Title>Operation Inquiry</Title>
          <ActionSection>
            <Button variant="primary" onClick={handleCreateTicket}>New Inquiry</Button>
          </ActionSection>
        </Header>
        <Content>
          <StatsGrid>
            <StatCard color="#635BFF">
              <StatValue>{totalTickets}</StatValue>
              <StatLabel>Total Inquiries</StatLabel>
            </StatCard>
            <StatCard color="#F59E0B">
              <StatValue>{openTickets}</StatValue>
              <StatLabel>Open</StatLabel>
            </StatCard>
            <StatCard color="#3B82F6">
              <StatValue>{inProgressTickets}</StatValue>
              <StatLabel>In Progress</StatLabel>
            </StatCard>
            <StatCard color="#10B981">
              <StatValue>{resolvedTickets}</StatValue>
              <StatLabel>Resolved</StatLabel>
            </StatCard>
          </StatsGrid>

          <FiltersContainer>
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
              <FilterLabel>Category</FilterLabel>
              <Select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                <option value="all">All Categories</option>
                <option value="schedule">Schedule</option>
                <option value="inventory">Inventory</option>
                <option value="staff">Staff</option>
                <option value="menu">Menu</option>
                <option value="customer">Customer</option>
                <option value="other">Other</option>
              </Select>
            </FilterGroup>
            <FilterGroup>
              <FilterLabel>Search</FilterLabel>
              <SearchInput
                placeholder="Search inquiries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </FilterGroup>
          </FiltersContainer>

          <TicketsGrid>
            {filteredTickets.map(ticket => (
              <TicketCard key={ticket.id} onClick={() => handleViewTicket(ticket)} style={{ cursor: 'pointer' }}>
                <TicketHeader>
                  <TicketInfo>
                    <TicketNumber>{ticket.ticketNumber}</TicketNumber>
                    <TicketSubject>{ticket.subject}</TicketSubject>
                    <ManagerInfo>Manager: {ticket.managerName}</ManagerInfo>
                  </TicketInfo>
                  <TicketBadges>
                    <StatusBadge status={ticket.status}>{ticket.status}</StatusBadge>
                    <PriorityBadge priority={ticket.priority}>{ticket.priority}</PriorityBadge>
                  </TicketBadges>
                </TicketHeader>

                <TicketDescription>{ticket.description}</TicketDescription>

                <TicketMeta>
                  <MetaItem>
                    <MetaLabel>Created</MetaLabel>
                    <MetaValue>{formatDateTime(ticket.createdAt)}</MetaValue>
                  </MetaItem>
                  <MetaItem>
                    <MetaLabel>Category</MetaLabel>
                    <MetaValue>{ticket.category}</MetaValue>
                  </MetaItem>
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
              <EmptyState>
                <h3>No inquiries yet</h3>
                <p>Click "New Inquiry" to submit your first operation inquiry to your manager.</p>
              </EmptyState>
            )}
          </TicketsGrid>

          {/* Detail View Modal */}
          {selectedTicket && (
            <Modal onClick={() => setSelectedTicket(null)}>
              <ModalContent onClick={(e) => e.stopPropagation()} style={{ maxWidth: '800px' }}>
                <ModalHeader>
                  <ModalTitle>{selectedTicket.ticketNumber}</ModalTitle>
                  <CloseButton onClick={() => setSelectedTicket(null)}>×</CloseButton>
                </ModalHeader>
                <ModalBody>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '18px', fontWeight: 600, color: '#0A2540', marginBottom: '8px', wordBreak: 'break-word' }}>{selectedTicket.subject}</div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                      <StatusBadge status={selectedTicket.status}>{selectedTicket.status}</StatusBadge>
                      <PriorityBadge priority={selectedTicket.priority}>{selectedTicket.priority}</PriorityBadge>
                      <span style={{ fontSize: '12px', color: '#6B7C93', padding: '4px 12px', background: '#F3F4F6', borderRadius: '6px' }}>{selectedTicket.category}</span>
                    </div>
                    <div style={{ fontSize: '13px', color: '#6B7C93' }}>
                      To: {selectedTicket.managerName} · {formatDateTime(selectedTicket.createdAt)}
                    </div>
                  </div>

                  <TicketDescription>{selectedTicket.description}</TicketDescription>

                  {selectedTicket?.attachments && selectedTicket.attachments.length > 0 && (
                    <AttachmentList attachments={selectedTicket.attachments} />
                  )}

                  <CommentSection entityType="operation_ticket" entityId={String(selectedTicket.id)} currentUserId={user?.id} onMarkRead={() => setUnreadCounts(prev => { const next = { ...prev }; const key = String(selectedTicket.id); if (next[key]) next[key] = { ...next[key], unread_count: 0 }; return next; })} />
                </ModalBody>
              </ModalContent>
            </Modal>
          )}

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
                    <FormLabel>Inquiry Target *</FormLabel>
                    <FormSelect
                      value={selectedManagerId}
                      onChange={(e) => setSelectedManagerId(e.target.value)}
                      required
                      disabled={managers.length <= 1}
                    >
                      <option value="">
                        {managers.length === 0 ? 'No one connected' : 'Select Inquiry Target'}
                      </option>
                      {managers.map(m => (
                        <option key={m.id} value={m.id.toString()}>
                          {m.name} ({getRoleLabel(m.role)})
                        </option>
                      ))}
                    </FormSelect>
                    {managers.length === 0 && (
                      <div style={{ fontSize: '12px', color: '#DC2626', marginTop: '4px' }}>
                        This restaurant is not connected to anyone. Please contact system administrator.
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
                  <FormGroup>
                    <FormLabel>Attachments</FormLabel>
                    <FileUpload
                      files={newAttachments}
                      onChange={setNewAttachments}
                      maxFiles={5}
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
                    disabled={!newTicket.subject.trim() || !newTicket.description.trim() || !selectedManagerId}
                  >
                    Submit Inquiry
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}
        </Content>
      </Container>
    </>
  );
};

export default OperationInquiryPage;