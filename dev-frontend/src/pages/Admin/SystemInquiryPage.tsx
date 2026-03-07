import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Tabs, Tab } from '../../components/Common/TabComponents';
import { useTabParam } from '../../hooks/useTabParam';
import { SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import CommentSection from '../../components/Common/CommentSection';
import FileUpload, { AttachmentFile } from '../../components/Common/FileUpload';
import AttachmentList from '../../components/Common/AttachmentList';
import { Modal as CommonModal } from '../../components/UI';
import { useAuth } from '../../contexts/AuthContext';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  ActionSection
} from '../../components/UI/PageComponents';
import {
  StatsGrid,
  StatCard,
  StatValue,
  StatLabel,
  StatDescription
} from '../../components/UI/StatCard';

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
  status: 'open' | 'in-progress' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'technical' | 'billing' | 'feature-request' | 'bug-report' | 'general';
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  attachments?: any[];
}

// Using common components from PageComponents and StatCard
// Container, Header, Title, Content, Button, ActionSection are imported
// StatsGrid, StatCard, StatValue, StatLabel are imported

const FiltersContainer = styled.div`
  margin-bottom: 24px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 768px) {
    gap: 6px;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;



const TicketsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 968px) {
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
  cursor: pointer;

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
  font-size: 12px;
  font-weight: 500;
  color: #6B7280;
  margin-bottom: 6px;
`;

const TicketSubject = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
  line-height: 1.4;
  word-break: break-word;
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
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  text-transform: uppercase;
  background: ${props => {
    switch(props.status) {
      case 'open': return '#FEF3C7';
      case 'in-progress': return '#DBEAFE';
      case 'closed': return '#ECFDF5';
      default: return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'open': return '#D97706';
      case 'in-progress': return '#1E40AF';
      case 'closed': return '#059669';
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
`;

const TicketMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
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

const UserSearchInput = styled(FormInput)`
  width: 100%;
`;

const DropdownContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  max-height: 240px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  margin-top: 4px;
`;

const DropdownItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.15s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #F8FAFC;
  }
`;

const DropdownItemTitle = styled.div`
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 4px;
`;

const DropdownItemSubtitle = styled.div`
  font-size: 12px;
  color: #6B7280;
`;

const SelectedUserBadge = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background: #ECFDF5;
  border: 1px solid #10B981;
  border-radius: 6px;
  margin-top: 8px;
  font-size: 14px;
  color: #059669;

  strong {
    margin-left: 4px;
    color: #047857;
  }
`;

const SystemInquiryPage: React.FC = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [activeTab, handleTabChange] = useTabParam<'all' | 'open' | 'in-progress'>('open');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showCreateTicketModal, setShowCreateTicketModal] = useState(false);
  const [showViewTicketModal, setShowViewTicketModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [detailStatus, setDetailStatus] = useState('');
  const [newTicket, setNewTicket] = useState({
    subject: '',
    description: '',
    priority: 'medium' as SupportTicket['priority'],
    category: 'general' as SupportTicket['category'],
    customerName: '',
    customerEmail: '',
    customerId: ''
  });
  const [newAttachments, setNewAttachments] = useState<AttachmentFile[]>([]);

  const [unreadCounts, setUnreadCounts] = useState<Record<string, { total_comments: number; unread_count: number }>>({});

  // User search states
  const [users, setUsers] = useState<any[]>([]);
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [userSearchResults, setUserSearchResults] = useState<any[]>([]);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

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

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem('auth_token');
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
        // error handling
      }
    };

    // Fetch all users for user search dropdown
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const response = await fetch('/api/users', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const result = await response.json();
          const usersArray = result.data || result;
          setUsers(usersArray);
        }
      } catch (error) {
        // error handling
      }
    };

    fetchTickets();
    fetchUsers();

    const interval = setInterval(fetchTickets, 10000);

    return () => clearInterval(interval);
  }, []);

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || ticket.status === activeTab;
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority;
    const matchesCategory = filterCategory === 'all' || ticket.category === filterCategory;
    return matchesSearch && matchesTab && matchesStatus && matchesPriority && matchesCategory;
  });

  const totalTickets = tickets.length;
  const openTickets = tickets.filter(t => t.status === 'open').length;
  const inProgressTickets = tickets.filter(t => t.status === 'in-progress').length;
  const closedTickets = tickets.filter(t => t.status === 'closed').length;

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-MY');
  };

  const handleExportReports = () => {
    const csvHeaders = [
      'Ticket Number',
      'Customer Name',
      'Customer Email',
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
    link.download = `support-tickets-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleUserSearch = (query: string) => {
    setUserSearchQuery(query);
    setShowUserDropdown(true);

    if (query.length < 1) {
      const initialResults = users.slice(0, 10);
      setUserSearchResults(initialResults);
      return;
    }

    const filtered = users.filter(user =>
      (user.full_name && user.full_name.toLowerCase().includes(query.toLowerCase())) ||
      (user.username && user.username.toLowerCase().includes(query.toLowerCase())) ||
      (user.email && user.email.toLowerCase().includes(query.toLowerCase()))
    );
    setUserSearchResults(filtered.slice(0, 10));
  };

  const handleUserSelect = (user: any) => {
    setSelectedUser(user);
    setUserSearchQuery(user.full_name || user.username);
    setShowUserDropdown(false);
    setNewTicket(prev => ({
      ...prev,
      customerId: user.id.toString(),
      customerName: user.full_name || user.username,
      customerEmail: user.email
    }));
  };

  const handleCreateTicket = () => {
    setShowCreateTicketModal(true);
  };

  const handleSubmitTicket = async () => {
    if (!selectedUser) return;

    try {
      const newSupportTicket = {
        customerId: newTicket.customerId,
        subject: newTicket.subject,
        description: newTicket.description,
        status: 'open',
        priority: newTicket.priority,
        category: newTicket.category,
        attachments: newAttachments.length > 0 ? newAttachments : undefined
      };

      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/support-tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(newSupportTicket)
      });

      if (response.ok) {
        const result = await response.json();
        const createdTicket = result.data || result;
        setTickets([createdTicket, ...tickets]);
      } else {
        return;
      }
    } catch (error) {
      return;
    }
    setShowCreateTicketModal(false);
    setNewTicket({
      subject: '',
      description: '',
      priority: 'medium',
      category: 'general',
      customerName: '',
      customerEmail: '',
      customerId: ''
    });
    setNewAttachments([]);
    setSelectedUser(null);
    setUserSearchQuery('');
    setUserSearchResults([]);
  };

  const handleViewTicket = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setDetailStatus(ticket.status);
    setShowViewTicketModal(true);
    window.dispatchEvent(new Event('refreshBadgeCounts'));
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!selectedTicket) return;
    setDetailStatus(newStatus);
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/support-tickets/${selectedTicket.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        setTickets(prev => prev.map(t =>
          t.id === selectedTicket.id ? { ...t, status: newStatus as SupportTicket['status'] } : t
        ));
        setSelectedTicket(prev => prev ? { ...prev, status: newStatus as SupportTicket['status'] } : null);
      }
    } catch (error) {
      // error handling
    }
  };

  return (
    <>
      <Container>
        <Header>
          <Title>System Inquiry</Title>
          <ActionSection>
            <Button variant="secondary" onClick={handleExportReports}>Export</Button>
            <Button variant="primary" onClick={handleCreateTicket}>Create Inquiry</Button>
          </ActionSection>
        </Header>
        <Content>

        <StatsGrid>
          <StatCard color="#059669">
            <StatValue>{totalTickets}</StatValue>
            <StatLabel>Total Tickets</StatLabel>
            <StatDescription>All support requests</StatDescription>
          </StatCard>
          <StatCard color="#D97706">
            <StatValue>{openTickets}</StatValue>
            <StatLabel>Open Tickets</StatLabel>
            <StatDescription>Awaiting response</StatDescription>
          </StatCard>
          <StatCard color="#2563EB">
            <StatValue>{inProgressTickets}</StatValue>
            <StatLabel>In Progress</StatLabel>
            <StatDescription>Currently being handled</StatDescription>
          </StatCard>
          <StatCard color="#7C3AED">
            <StatValue>{closedTickets}</StatValue>
            <StatLabel>Closed</StatLabel>
            <StatDescription>{totalTickets > 0 ? Math.round((closedTickets/totalTickets)*100) : 0}% completion rate</StatDescription>
          </StatCard>
        </StatsGrid>

        <Tabs>
          <Tab active={activeTab === 'open'} onClick={() => handleTabChange('open')}>
            Open
          </Tab>
          <Tab active={activeTab === 'in-progress'} onClick={() => handleTabChange('in-progress')}>
            In Progress
          </Tab>
          <Tab active={activeTab === 'all'} onClick={() => handleTabChange('all')}>
            All Tickets
          </Tab>
        </Tabs>

        <FiltersContainer>
          {activeTab === 'all' && (
            <FilterGroup>
              <FilterSelect value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={{ maxWidth: '180px' }}>
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="closed">Closed</option>
              </FilterSelect>
            </FilterGroup>
          )}
          <FilterGroup>
            <FilterSelect value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)} style={{ maxWidth: '180px' }}>
              <option value="all">All Priority</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </FilterSelect>
          </FilterGroup>
          <FilterGroup>
            <FilterSelect value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} style={{ maxWidth: '180px' }}>
              <option value="all">All Categories</option>
              <option value="technical">Technical</option>
              <option value="billing">Billing</option>
              <option value="feature-request">Feature Request</option>
              <option value="bug-report">Bug Report</option>
              <option value="general">General</option>
            </FilterSelect>
          </FilterGroup>
          <FilterGroup>
            <SearchInput
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </FilterGroup>
        </FiltersContainer>

        <TicketsGrid>
          {filteredTickets.map(ticket => (
            <TicketCard key={ticket.id} onClick={() => handleViewTicket(ticket)}>
              <TicketHeader>
                <TicketInfo>
                  <TicketNumber>{ticket.ticketNumber}</TicketNumber>
                  <TicketSubject>{ticket.subject}</TicketSubject>
                  <CustomerInfo>{ticket.customerName} • {ticket.customerEmail}</CustomerInfo>
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
                  <MetaLabel>Created</MetaLabel>
                  <MetaValue>{formatDateTime(ticket.createdAt)}</MetaValue>
                </MetaItem>
                <MetaItem>
                  <MetaLabel>Category</MetaLabel>
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
              color: '#6B7280',
              gridColumn: '1 / -1'
            }}>
              <h3 style={{ color: '#374151', marginBottom: '8px' }}>No tickets yet</h3>
              <p>No support tickets have been submitted.</p>
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
                  disabled={!newTicket.subject || !newTicket.description || !selectedUser}
                >
                  Create Inquiry
                </Button>
              </>
            }
          >
                <FormGroup style={{ position: 'relative' }}>
                  <FormLabel>Select User *</FormLabel>
                  <UserSearchInput
                    type="text"
                    value={userSearchQuery}
                    onChange={(e) => handleUserSearch(e.target.value)}
                    onFocus={() => {
                      setShowUserDropdown(true);
                      if (userSearchQuery.length === 0) {
                        setUserSearchResults(users.slice(0, 10));
                      }
                    }}
                    onBlur={() => setTimeout(() => setShowUserDropdown(false), 200)}
                    placeholder="Search by name, username, or email..."
                  />
                  {showUserDropdown && userSearchResults.length > 0 && (
                    <DropdownContainer>
                      {userSearchResults.map(user => (
                        <DropdownItem
                          key={user.id}
                          onClick={() => handleUserSelect(user)}
                        >
                          <DropdownItemTitle>{user.full_name || user.username}</DropdownItemTitle>
                          <DropdownItemSubtitle>
                            {user.email} • {user.role}
                          </DropdownItemSubtitle>
                        </DropdownItem>
                      ))}
                    </DropdownContainer>
                  )}
                  {selectedUser && (
                    <SelectedUserBadge>
                      ✓ Selected: <strong>{selectedUser.full_name || selectedUser.username}</strong> ({selectedUser.email})
                    </SelectedUserBadge>
                  )}
                </FormGroup>
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
                  <FormLabel>Attachments</FormLabel>
                  <FileUpload
                    files={newAttachments}
                    onChange={setNewAttachments}
                    maxFiles={5}
                  />
                </div>
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
            </CommonModal>
        )}

        {/* View Ticket Details Modal */}
        {showViewTicketModal && selectedTicket && (
          <CommonModal
            isOpen={true}
            onClose={() => setShowViewTicketModal(false)}
            title="Inquiry Details"
            footer={
              <Button variant="secondary" onClick={() => setShowViewTicketModal(false)}>
                Close
              </Button>
            }
          >
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
                      <FormSelect
                        value={detailStatus}
                        onChange={(e) => handleStatusChange(e.target.value)}
                      >
                        <option value="open">Open</option>
                        <option value="in-progress">In Progress</option>
                        <option value="closed">Closed</option>
                      </FormSelect>
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

                  {selectedTicket?.attachments && selectedTicket.attachments.length > 0 && (
                    <AttachmentList attachments={selectedTicket.attachments} />
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                      <FormLabel>Created At</FormLabel>
                      <div style={{ padding: '8px 0', color: '#6B7280' }}>
                        {formatDateTime(selectedTicket.createdAt)}
                      </div>
                    </div>
                    <div>
                      <FormLabel>Last Updated</FormLabel>
                      <div style={{ padding: '8px 0', color: '#6B7280' }}>
                        {formatDateTime(selectedTicket.updatedAt)}
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

export default SystemInquiryPage;