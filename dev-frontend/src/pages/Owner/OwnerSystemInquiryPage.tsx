import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import CommentSection from '../../components/Common/CommentSection';
import FileUpload, { AttachmentFile } from '../../components/Common/FileUpload';
import AttachmentList from '../../components/Common/AttachmentList';

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

interface OwnedRestaurant {
  id: number;
  name: string;
}

const Container = styled.div`
  min-height: 100vh;
`;

const Header = styled.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
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
  &:hover { box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); }
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
  &:focus { outline: none; border-color: #635BFF; }
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

const CustomerInfo = styled.div`
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

const RestaurantBadge = styled.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  background: #F3E8FF;
  color: #7C3AED;
  margin-left: 8px;
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
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
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
  &:hover { color: #0A2540; }
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
  @media (max-width: 640px) { grid-template-columns: 1fr; }
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
  font-family: inherit;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;
  h3 { color: #374151; margin-bottom: 8px; }
`;

const OwnerSystemInquiryPage: React.FC = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [ownedRestaurants, setOwnedRestaurants] = useState<OwnedRestaurant[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterRestaurant, setFilterRestaurant] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [detailStatus, setDetailStatus] = useState<SupportTicket['status']>('open');
  const [newTicket, setNewTicket] = useState({
    restaurantId: '',
    subject: '',
    description: '',
    priority: 'medium' as SupportTicket['priority'],
    category: 'general' as SupportTicket['category']
  });
  const [newAttachments, setNewAttachments] = useState<AttachmentFile[]>([]);
  const [unreadCounts, setUnreadCounts] = useState<Record<string, { total_comments: number; unread_count: number }>>({});

  useEffect(() => {
    if (user) {
      fetchOwnedRestaurants();
    }
  }, [user]);

  useEffect(() => {
    if (ownedRestaurants.length > 0) {
      fetchTickets();
      const interval = setInterval(fetchTickets, 10000);
      return () => clearInterval(interval);
    }
  }, [ownedRestaurants]);

  const fetchOwnedRestaurants = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/owner/restaurants', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const result = await response.json();
        const restaurants = result.data || result;
        setOwnedRestaurants(restaurants.map((r: any) => ({ id: r.id, name: r.name })));
      }
    } catch (error) {
      console.error('Error fetching owned restaurants:', error);
    }
  };

  const fetchTickets = async () => {
    try {
      const response = await fetch('/api/support-tickets');
      if (response.ok) {
        const result = await response.json();
        const allTickets = result.data || result;
        // Filter to only owned restaurants' tickets + tickets created by this owner
        const ownedIds = ownedRestaurants.map(r => r.id);
        const myTickets = allTickets.filter((t: SupportTicket) =>
          (t.restaurantId && ownedIds.includes(t.restaurantId)) ||
          t.customerId === String(user?.id)
        );
        setTickets(myTickets);
        fetchUnreadCounts(myTickets);
      }
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  const fetchUnreadCounts = async (ticketList: SupportTicket[]) => {
    if (ticketList.length === 0) return;
    try {
      const token = localStorage.getItem('auth_token');
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

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority;
    const matchesCategory = filterCategory === 'all' || ticket.category === filterCategory;
    const matchesRestaurant = filterRestaurant === 'all' || String(ticket.restaurantId) === filterRestaurant;
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory && matchesRestaurant;
  });

  const openTickets = tickets.filter(t => t.status === 'open').length;
  const inProgressTickets = tickets.filter(t => t.status === 'in-progress').length;
  const resolvedTickets = tickets.filter(t => t.status === 'resolved').length;

  const formatDateTime = (dateString: string) => new Date(dateString).toLocaleString('en-MY');

  const getRestaurantName = (restaurantId?: number) => {
    if (!restaurantId) return '';
    const r = ownedRestaurants.find(r => r.id === restaurantId);
    return r ? r.name : '';
  };

  const handleSubmitTicket = async () => {
    if (!newTicket.restaurantId || !newTicket.subject.trim() || !newTicket.description.trim()) return;

    const selectedRestaurant = ownedRestaurants.find(r => r.id === parseInt(newTicket.restaurantId));

    try {
      const ticket = {
        customerId: user?.id || '',
        customerName: user?.name || 'Restaurant Owner',
        customerEmail: user?.email || '',
        customerRole: 'manager',
        restaurantId: parseInt(newTicket.restaurantId),
        restaurantName: selectedRestaurant?.name || '',
        subject: newTicket.subject,
        description: newTicket.description,
        status: 'open',
        priority: newTicket.priority,
        category: newTicket.category
      };

      const response = await fetch('/api/support-tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ticket)
      });

      if (response.ok) {
        fetchTickets();
        setShowCreateModal(false);
        setNewTicket({ restaurantId: '', subject: '', description: '', priority: 'medium', category: 'general' });
      }
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };

  const handleStatusChange = async () => {
    if (!selectedTicket) return;
    try {
      const response = await fetch(`/api/support-tickets/${selectedTicket.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
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

  return (
    <>
      <Container>
        <Header>
          <Title>System Inquiry</Title>
          <ActionSection>
            <Button variant="secondary" onClick={fetchTickets}>Refresh</Button>
            <Button variant="primary" onClick={() => setShowCreateModal(true)}>New Inquiry</Button>
          </ActionSection>
        </Header>
        <Content>
          <StatsGrid>
            <StatCard color="#635BFF">
              <StatValue>{tickets.length}</StatValue>
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
              <FilterLabel>Search</FilterLabel>
              <SearchInput
                placeholder="Search inquiries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </FilterGroup>
            <FilterGroup>
              <FilterLabel>Restaurant</FilterLabel>
              <Select value={filterRestaurant} onChange={(e) => setFilterRestaurant(e.target.value)}>
                <option value="all">All Restaurants</option>
                {ownedRestaurants.map(r => (
                  <option key={r.id} value={String(r.id)}>{r.name}</option>
                ))}
              </Select>
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
              <TicketCard key={ticket.id} onClick={() => { setSelectedTicket(ticket); setDetailStatus(ticket.status); setShowViewModal(true); window.dispatchEvent(new Event('refreshBadgeCounts')); }}>
                <TicketHeader>
                  <TicketInfo>
                    <TicketNumber>{ticket.ticketNumber}</TicketNumber>
                    <TicketSubject>{ticket.subject}</TicketSubject>
                    <CustomerInfo>
                      {ticket.customerName}
                      {ticket.restaurantName && (
                        <RestaurantBadge>{ticket.restaurantName}</RestaurantBadge>
                      )}
                    </CustomerInfo>
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
                    <MetaValue style={{textTransform: 'capitalize'}}>{ticket.category.replace('-', ' ')}</MetaValue>
                  </MetaItem>
                  <MetaItem>
                    <MetaLabel>Restaurant</MetaLabel>
                    <MetaValue>{getRestaurantName(ticket.restaurantId) || ticket.restaurantName || '-'}</MetaValue>
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
              <EmptyState>
                <h3>No inquiries yet</h3>
                <p>Click "New Inquiry" to submit a system inquiry for your restaurants.</p>
              </EmptyState>
            )}
          </TicketsGrid>

          {/* Create Modal */}
          {showCreateModal && (
            <Modal onClick={() => setShowCreateModal(false)}>
              <ModalContent onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                  <ModalTitle>Create System Inquiry</ModalTitle>
                  <CloseButton onClick={() => setShowCreateModal(false)}>×</CloseButton>
                </ModalHeader>
                <ModalBody>
                  <FormGroup>
                    <FormLabel>Restaurant *</FormLabel>
                    <FormSelect
                      value={newTicket.restaurantId}
                      onChange={(e) => setNewTicket({...newTicket, restaurantId: e.target.value})}
                      required
                    >
                      <option value="">Select Restaurant</option>
                      {ownedRestaurants.map(r => (
                        <option key={r.id} value={String(r.id)}>{r.name}</option>
                      ))}
                    </FormSelect>
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
                      placeholder="Detailed description..."
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
                  <Button variant="secondary" onClick={() => setShowCreateModal(false)}>Cancel</Button>
                  <Button
                    variant="primary"
                    onClick={handleSubmitTicket}
                    disabled={!newTicket.restaurantId || !newTicket.subject.trim() || !newTicket.description.trim()}
                  >
                    Submit Inquiry
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}

          {/* View Modal */}
          {showViewModal && selectedTicket && (
            <Modal onClick={() => setShowViewModal(false)}>
              <ModalContent onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                  <ModalTitle>Inquiry Details</ModalTitle>
                  <CloseButton onClick={() => setShowViewModal(false)}>×</CloseButton>
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
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <FormSelect value={detailStatus} onChange={(e) => setDetailStatus(e.target.value as SupportTicket['status'])} style={{ flex: 1 }}>
                            <option value="open">Open</option>
                            <option value="in-progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                            <option value="closed">Closed</option>
                          </FormSelect>
                          {detailStatus !== selectedTicket.status && (
                            <Button variant="primary" onClick={handleStatusChange} style={{ padding: '10px 20px' }}>Save</Button>
                          )}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div>
                        <FormLabel>Priority</FormLabel>
                        <div style={{ padding: '8px 0' }}>
                          <PriorityBadge priority={selectedTicket.priority}>{selectedTicket.priority}</PriorityBadge>
                        </div>
                      </div>
                      <div>
                        <FormLabel>Restaurant</FormLabel>
                        <div style={{ padding: '8px 0', color: '#374151' }}>
                          {getRestaurantName(selectedTicket.restaurantId) || selectedTicket.restaurantName || '-'}
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
                        padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '8px',
                        border: '1px solid #E6EBF1', minHeight: '80px', whiteSpace: 'pre-wrap',
                        lineHeight: '1.5', color: '#374151'
                      }}>
                        {selectedTicket.description}
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div>
                        <FormLabel>Created</FormLabel>
                        <div style={{ padding: '8px 0', color: '#6B7280' }}>{formatDateTime(selectedTicket.createdAt)}</div>
                      </div>
                      <div>
                        <FormLabel>Category</FormLabel>
                        <div style={{ padding: '8px 0', color: '#374151', textTransform: 'capitalize' }}>
                          {selectedTicket.category.replace('-', ' ')}
                        </div>
                      </div>
                    </div>
                  </div>
                  <CommentSection entityType="support_ticket" entityId={selectedTicket.id} currentUserId={user?.id} onMarkRead={() => setUnreadCounts(prev => { const next = { ...prev }; if (next[selectedTicket.id]) next[selectedTicket.id] = { ...next[selectedTicket.id], unread_count: 0 }; return next; })} />
                </ModalBody>
                <ModalFooter>
                  <Button variant="secondary" onClick={() => setShowViewModal(false)}>Close</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}
        </Content>
      </Container>
    </>
  );
};

export default OwnerSystemInquiryPage;
