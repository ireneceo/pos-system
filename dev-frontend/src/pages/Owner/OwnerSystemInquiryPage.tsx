import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { EmptyState } from '../../components/UI/TableComponents';
import { useAuth } from '../../contexts/AuthContext';
import CommentSection from '../../components/Common/CommentSection';
import { StatsGrid, StatCard, StatValue, StatLabel, Modal as CommonModal } from '../../components/UI';
import { useTranslation } from 'react-i18next';

import { getAuthToken } from '../../utils/auth';
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


const OwnerSystemInquiryPage: React.FC = () => {
  const { t } = useTranslation('owner');
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ownedRestaurants]);

  const fetchOwnedRestaurants = async () => {
    try {
      const token = getAuthToken();
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
      console.error('Error fetching tickets:', error);
    }
  };

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
        restaurantId: parseInt(newTicket.restaurantId),
        restaurantName: selectedRestaurant?.name || '',
        subject: newTicket.subject,
        description: newTicket.description,
        status: 'open',
        priority: newTicket.priority,
        category: newTicket.category
      };

      const token = getAuthToken();
      const response = await fetch('/api/support-tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
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

  return (
    <>
      <Container>
        <Header>
          <Title>{t('owner:ownerSystemInquiryPage.systemInquiry')}</Title>
          <ActionSection>
            <Button variant="primary" onClick={() => setShowCreateModal(true)}>{t('owner:ownerSystemInquiryPage.newInquiry')}</Button>
          </ActionSection>
        </Header>
        <Content>
          <StatsGrid>
            <StatCard color="#635BFF">
              <StatValue>{tickets.length}</StatValue>
              <StatLabel>{t('owner:ownerSystemInquiryPage.totalInquiries')}</StatLabel>
            </StatCard>
            <StatCard color="#F59E0B">
              <StatValue>{openTickets}</StatValue>
              <StatLabel>{t('owner:ownerSystemInquiryPage.open')}</StatLabel>
            </StatCard>
            <StatCard color="#3B82F6">
              <StatValue>{inProgressTickets}</StatValue>
              <StatLabel>{t('owner:ownerSystemInquiryPage.inProgress')}</StatLabel>
            </StatCard>
            <StatCard color="#10B981">
              <StatValue>{resolvedTickets}</StatValue>
              <StatLabel>{t('owner:ownerSystemInquiryPage.resolved')}</StatLabel>
            </StatCard>
          </StatsGrid>

          <FiltersContainer>
            <Select value={filterRestaurant} onChange={(e) => setFilterRestaurant(e.target.value)}>
              <option value="all">{t('owner:ownerSystemInquiryPage.allRestaurants')}</option>
              {ownedRestaurants.map(r => (
                <option key={r.id} value={String(r.id)}>{r.name}</option>
              ))}
            </Select>
            <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="all">{t('owner:ownerSystemInquiryPage.allStatus')}</option>
              <option value="open">{t('owner:ownerSystemInquiryPage.open')}</option>
              <option value="in-progress">{t('owner:ownerSystemInquiryPage.inProgress')}</option>
              <option value="resolved">{t('owner:ownerSystemInquiryPage.resolved')}</option>
              <option value="closed">{t('owner:ownerSystemInquiryPage.closed')}</option>
            </Select>
            <Select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
              <option value="all">{t('owner:ownerSystemInquiryPage.allPriority')}</option>
              <option value="urgent">{t('owner:ownerSystemInquiryPage.urgent')}</option>
              <option value="high">{t('owner:ownerSystemInquiryPage.high')}</option>
              <option value="medium">{t('owner:ownerSystemInquiryPage.medium')}</option>
              <option value="low">{t('owner:ownerSystemInquiryPage.low')}</option>
            </Select>
            <Select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
              <option value="all">{t('owner:ownerSystemInquiryPage.allCategories')}</option>
              <option value="technical">{t('owner:ownerSystemInquiryPage.technical')}</option>
              <option value="billing">{t('owner:ownerSystemInquiryPage.billing')}</option>
              <option value="feature-request">{t('owner:ownerSystemInquiryPage.featureRequest')}</option>
              <option value="bug-report">{t('owner:ownerSystemInquiryPage.bugReport')}</option>
              <option value="general">{t('owner:ownerSystemInquiryPage.general')}</option>
            </Select>
            <SearchInput
              placeholder="Search inquiries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
                    <MetaLabel>{t('owner:ownerSystemInquiryPage.created')}</MetaLabel>
                    <MetaValue>{formatDateTime(ticket.createdAt)}</MetaValue>
                  </MetaItem>
                  <MetaItem>
                    <MetaLabel>{t('owner:ownerSystemInquiryPage.category')}</MetaLabel>
                    <MetaValue style={{textTransform: 'capitalize'}}>{ticket.category.replace('-', ' ')}</MetaValue>
                  </MetaItem>
                  <MetaItem>
                    <MetaLabel>{t('owner:ownerSystemInquiryPage.restaurant')}</MetaLabel>
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
                <h3>{t('owner:ownerSystemInquiryPage.noInquiriesYet')}</h3>
                <p>Click "New Inquiry" to submit a system inquiry for your restaurants.</p>
              </EmptyState>
            )}
          </TicketsGrid>

          {/* Create Modal */}
          {showCreateModal && (
            <CommonModal
              isOpen={true}
              onClose={() => setShowCreateModal(false)}
              title="Create System Inquiry"
              footer={
                <>
                  <Button variant="secondary" onClick={() => setShowCreateModal(false)}>{t('owner:ownerSystemInquiryPage.cancel')}</Button>
                  <Button
                    variant="primary"
                    onClick={handleSubmitTicket}
                    disabled={!newTicket.restaurantId || !newTicket.subject.trim() || !newTicket.description.trim()}
                  >
                    Submit Inquiry
                  </Button>
                </>
              }
            >
                  <FormGroup>
                    <FormLabel>Restaurant *</FormLabel>
                    <FormSelect
                      value={newTicket.restaurantId}
                      onChange={(e) => setNewTicket({...newTicket, restaurantId: e.target.value})}
                      required
                    >
                      <option value="">{t('owner:ownerSystemInquiryPage.selectRestaurant')}</option>
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
                      <FormLabel>{t('owner:ownerSystemInquiryPage.priority')}</FormLabel>
                      <FormSelect
                        value={newTicket.priority}
                        onChange={(e) => setNewTicket({...newTicket, priority: e.target.value as SupportTicket['priority']})}
                      >
                        <option value="low">{t('owner:ownerSystemInquiryPage.low')}</option>
                        <option value="medium">{t('owner:ownerSystemInquiryPage.medium')}</option>
                        <option value="high">{t('owner:ownerSystemInquiryPage.high')}</option>
                        <option value="urgent">{t('owner:ownerSystemInquiryPage.urgent')}</option>
                      </FormSelect>
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>{t('owner:ownerSystemInquiryPage.category')}</FormLabel>
                      <FormSelect
                        value={newTicket.category}
                        onChange={(e) => setNewTicket({...newTicket, category: e.target.value as SupportTicket['category']})}
                      >
                        <option value="general">{t('owner:ownerSystemInquiryPage.general')}</option>
                        <option value="technical">{t('owner:ownerSystemInquiryPage.technical')}</option>
                        <option value="billing">{t('owner:ownerSystemInquiryPage.billing')}</option>
                        <option value="feature-request">{t('owner:ownerSystemInquiryPage.featureRequest')}</option>
                        <option value="bug-report">{t('owner:ownerSystemInquiryPage.bugReport')}</option>
                      </FormSelect>
                    </FormGroup>
                  </FormRow>
              </CommonModal>
          )}

          {/* View Modal */}
          {showViewModal && selectedTicket && (
            <CommonModal
              isOpen={true}
              onClose={() => setShowViewModal(false)}
              title="Inquiry Details"
              footer={
                <Button variant="secondary" onClick={() => setShowViewModal(false)}>{t('owner:ownerSystemInquiryPage.close')}</Button>
              }
            >
                  <div style={{ display: 'grid', gap: '20px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div>
                        <FormLabel>{t('owner:ownerSystemInquiryPage.ticketNumber')}</FormLabel>
                        <div style={{ padding: '8px 0', color: '#0A2540', fontWeight: '600' }}>
                          {selectedTicket.ticketNumber}
                        </div>
                      </div>
                      <div>
                        <FormLabel>{t('owner:ownerSystemInquiryPage.status')}</FormLabel>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <FormSelect value={detailStatus} onChange={(e) => setDetailStatus(e.target.value as SupportTicket['status'])} style={{ flex: 1 }}>
                            <option value="open">{t('owner:ownerSystemInquiryPage.open')}</option>
                            <option value="in-progress">{t('owner:ownerSystemInquiryPage.inProgress')}</option>
                            <option value="resolved">{t('owner:ownerSystemInquiryPage.resolved')}</option>
                            <option value="closed">{t('owner:ownerSystemInquiryPage.closed')}</option>
                          </FormSelect>
                          {detailStatus !== selectedTicket.status && (
                            <Button variant="primary" onClick={handleStatusChange} style={{ padding: '10px 20px' }}>{t('owner:ownerSystemInquiryPage.save')}</Button>
                          )}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div>
                        <FormLabel>{t('owner:ownerSystemInquiryPage.priority')}</FormLabel>
                        <div style={{ padding: '8px 0' }}>
                          <PriorityBadge priority={selectedTicket.priority}>{selectedTicket.priority}</PriorityBadge>
                        </div>
                      </div>
                      <div>
                        <FormLabel>{t('owner:ownerSystemInquiryPage.restaurant')}</FormLabel>
                        <div style={{ padding: '8px 0', color: '#374151' }}>
                          {getRestaurantName(selectedTicket.restaurantId) || selectedTicket.restaurantName || '-'}
                        </div>
                      </div>
                    </div>

                    <div>
                      <FormLabel>{t('owner:ownerSystemInquiryPage.subject')}</FormLabel>
                      <div style={{ padding: '8px 0', color: '#0A2540', fontWeight: '600' }}>
                        {selectedTicket.subject}
                      </div>
                    </div>

                    <div>
                      <FormLabel>{t('owner:ownerSystemInquiryPage.description')}</FormLabel>
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
                        <FormLabel>{t('owner:ownerSystemInquiryPage.created')}</FormLabel>
                        <div style={{ padding: '8px 0', color: '#6B7280' }}>{formatDateTime(selectedTicket.createdAt)}</div>
                      </div>
                      <div>
                        <FormLabel>{t('owner:ownerSystemInquiryPage.category')}</FormLabel>
                        <div style={{ padding: '8px 0', color: '#374151', textTransform: 'capitalize' }}>
                          {selectedTicket.category.replace('-', ' ')}
                        </div>
                      </div>
                    </div>
                  </div>
                  <CommentSection entityType="support_ticket" entityId={selectedTicket.id} currentUserId={user?.id} onMarkRead={() => setUnreadCounts(prev => { const next = { ...prev }; if (next[selectedTicket.id]) next[selectedTicket.id] = { ...next[selectedTicket.id], unread_count: 0 }; return next; })} />
              </CommonModal>
          )}
        </Content>
      </Container>
    </>
  );
};

export default OwnerSystemInquiryPage;
