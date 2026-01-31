import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainLayout from '../../components/Layout/MainLayout';
import { SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
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
  customerRole: 'manager' | 'restaurant' | 'staff';
  restaurantId?: number;
  restaurantName?: string;
  subject: string;
  description: string;
  status: 'open' | 'in-progress' | 'closed';
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
  notes?: Array<{
    id: string;
    message: string;
    createdBy: string;
    createdAt: string;
  }>;
}

// Using common components from PageComponents and StatCard
// Container, Header, Title, Content, Button, ActionSection are imported
// StatsGrid, StatCard, StatValue, StatLabel are imported

const TabsContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  border-bottom: 2px solid #E6EBF1;
  padding-bottom: 0;
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 500;
  background: ${props => props.active ? '#635BFF' : 'transparent'};
  color: ${props => props.active ? 'white' : '#6B7280'};
  border: none;
  border-bottom: 2px solid ${props => props.active ? '#635BFF' : 'transparent'};
  margin-bottom: -2px;
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 6px 6px 0 0;

  &:hover {
    background: ${props => props.active ? '#5A54E5' : '#F8FAFC'};
    color: ${props => props.active ? 'white' : '#0A2540'};
  }
`;

const FiltersContainer = styled.div`
  padding: 20px 0;
  margin-bottom: 24px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
  border-bottom: 1px solid #E6EBF1;

  @media (max-width: 768px) {
    gap: 12px;
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
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'open' | 'in-progress'>('open');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showCreateTicketModal, setShowCreateTicketModal] = useState(false);
  const [showViewTicketModal, setShowViewTicketModal] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const [showCloseTicketModal, setShowCloseTicketModal] = useState(false);
  const [showDeleteTicketModal, setShowDeleteTicketModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [replyStatus, setReplyStatus] = useState<SupportTicket['status']>('in-progress');
  const [noteMessage, setNoteMessage] = useState('');
  const [newTicket, setNewTicket] = useState({
    subject: '',
    description: '',
    priority: 'medium' as SupportTicket['priority'],
    category: 'general' as SupportTicket['category'],
    customerName: '',
    customerEmail: '',
    customerId: ''
  });

  // User search states
  const [users, setUsers] = useState<any[]>([]);
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [userSearchResults, setUserSearchResults] = useState<any[]>([]);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  useEffect(() => {
    // What and Why: API에서 티켓 데이터 불러오기
    // - 새 응답 형식 { success: true, data: [...] } 처리
    const fetchTickets = async () => {
      try {
        const response = await fetch('/api/support-tickets');
        if (response.ok) {
          const result = await response.json();
          const ticketsData = result.data || result;
          setTickets(ticketsData);
        }
      } catch (error) {
        // 에러 처리
      }
    };

    // Fetch all users for user search dropdown
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        if (response.ok) {
          const result = await response.json();
          const usersArray = result.data || result;
          setUsers(usersArray);
        }
      } catch (error) {
        // 에러 처리
      }
    };

    fetchTickets();
    fetchUsers();

    // 10초마다 자동으로 티켓 새로고침
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

  // Calculate average response time from resolved/closed tickets only
  const ticketsWithResponseTime = tickets.filter(t => t.responseTime && t.responseTime > 0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const avgResponseTime = ticketsWithResponseTime.length > 0
    ? Math.round(ticketsWithResponseTime.reduce((sum, t) => sum + t.responseTime, 0) / ticketsWithResponseTime.length)
    : 0;

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-MY');
  };

  const formatDuration = (minutes: number) => {
    if (!minutes || minutes === 0) return 'Pending';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const handleRefreshTickets = async () => {
    try {
      const response = await fetch('/api/support-tickets');
      if (response.ok) {
        const result = await response.json();
        setTickets(result.data || result);
      }
    } catch (error) {
      // 에러 처리
    }
  };

  const handleExportReports = () => {
    // CSV 헤더
    const csvHeaders = [
      'Ticket Number',
      'Customer Name',
      'Customer Email',
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

    // CSV 데이터 행
    const csvRows = filteredTickets.map(ticket => [
      ticket.ticketNumber,
      ticket.customerName,
      ticket.customerEmail,
      `"${ticket.subject.replace(/"/g, '""')}"`, // 따옴표 이스케이프
      `"${ticket.description.replace(/"/g, '""')}"`, // 따옴표 이스케이프
      ticket.status,
      ticket.priority,
      ticket.category,
      ticket.assignedTo || 'Unassigned',
      ticket.createdAt,
      ticket.updatedAt,
      ticket.responseTime,
      ticket.resolutionTime || 'N/A'
    ]);

    // CSV 문자열 생성
    const csvContent = [
      csvHeaders.join(','),
      ...csvRows.map(row => row.join(','))
    ].join('\n');

    // BOM 추가 (엑셀에서 한글이 깨지지 않도록)
    const bom = '\uFEFF';
    const csvWithBom = bom + csvContent;

    // 다운로드
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
    if (!selectedUser) {
      alert('Please select a user to create ticket for');
      return;
    }

    try {
      const newSupportTicket = {
        customerId: newTicket.customerId,
        customerName: newTicket.customerName,
        customerEmail: newTicket.customerEmail,
        customerRole: selectedUser.role === 'System Admin' ? 'admin' :
                      selectedUser.role === 'Restaurant Admin' ? 'restaurant' :
                      ['Foodcourt Manager', 'Foodcourt General', 'Brand Manager', 'Brand General'].includes(selectedUser.role) ? 'manager' : 'staff',
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
        const result = await response.json();
        const createdTicket = result.data || result;
        setTickets([createdTicket, ...tickets]);
      } else {
        alert('Failed to create support ticket. Please try again.');
        return;
      }
    } catch (error) {
      alert('Error creating support ticket. Please try again.');
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
    setSelectedUser(null);
    setUserSearchQuery('');
    setUserSearchResults([]);
  };

  const handleViewTicket = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setShowViewTicketModal(true);
  };

  const handleAddNote = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setShowAddNoteModal(true);
  };

  const handleConfirmAddNote = async () => {
    if (!noteMessage.trim() || !selectedTicket) return;

    const newNote = {
      id: `note-${Date.now()}`,
      message: noteMessage,
      createdBy: 'System Admin',
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19)
    };

    const updatedNotes = [...(selectedTicket.notes || []), newNote];

    try {
      const response = await fetch(`/api/support-tickets/${selectedTicket.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          notes: updatedNotes
        })
      });

      if (response.ok) {
        const result = await response.json();
        const updatedTicket = result.data || result;
        setTickets(prev => prev.map(t =>
          t.id === selectedTicket.id ? { ...t, ...updatedTicket } : t
        ));
      } else {
        alert('Failed to add note. Please try again.');
        return;
      }
    } catch (error) {
      alert('Error adding note. Please try again.');
      return;
    }

    setNoteMessage('');
    setShowAddNoteModal(false);
  };

  const handleCloseTicket = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setShowCloseTicketModal(true);
  };

  const handleConfirmCloseTicket = () => {
    if (!selectedTicket) return;

    setTickets(prev => prev.map(t => 
      t.id === selectedTicket.id 
        ? { 
            ...t, 
            status: 'closed' as const, 
            resolvedAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
            updatedAt: new Date().toISOString().replace('T', ' ').slice(0, 19) 
          }
        : t
    ));
    setShowCloseTicketModal(false);
  };

  const handleReplyTicket = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setReplyMessage(ticket.replyMessage || '');
    setReplyStatus(ticket.status);
    setShowReplyModal(true);
  };

  const handleSendReply = async () => {
    if (!replyMessage.trim() || !selectedTicket) return;

    // Calculate response time in minutes
    const createdTime = new Date(selectedTicket.createdAt).getTime();
    const currentTime = new Date().getTime();
    const responseTimeMinutes = Math.round((currentTime - createdTime) / (1000 * 60));

    try {
      const response = await fetch(`/api/support-tickets/${selectedTicket.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: replyStatus,
          replyMessage: replyMessage,
          repliedBy: 'Support Agent',
          repliedAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
          responseTime: responseTimeMinutes > 0 ? responseTimeMinutes : 1,
          ...(replyStatus === 'closed' && {
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
      } else {
        alert('Failed to send reply. Please try again.');
        return;
      }
    } catch (error) {
      alert('Error sending reply. Please try again.');
      return;
    }

    setReplyMessage('');
    setShowReplyModal(false);
  };

  const handleDeleteTicket = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setShowDeleteTicketModal(true);
  };

  const handleConfirmDeleteTicket = async () => {
    if (!selectedTicket) return;

    try {
      const response = await fetch(`/api/support-tickets/${selectedTicket.id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setTickets(prev => prev.filter(t => t.id !== selectedTicket.id));
      } else {
        alert('Failed to delete support ticket. Please try again.');
        return;
      }
    } catch (error) {
      alert('Error deleting support ticket. Please try again.');
      return;
    }

    setShowDeleteTicketModal(false);
    setSelectedTicket(null);
  };

  return (
    <MainLayout>
      <Container>
        <Header>
          <Title>System Inquiry</Title>
          <ActionSection>
            <Button variant="secondary" onClick={handleRefreshTickets}>Refresh</Button>
            <Button variant="secondary" onClick={handleExportReports}>Export</Button>
            <Button variant="primary" onClick={handleCreateTicket}>Create Ticket</Button>
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

        <TabsContainer>
          <Tab active={activeTab === 'open'} onClick={() => setActiveTab('open')}>
            Open
          </Tab>
          <Tab active={activeTab === 'in-progress'} onClick={() => setActiveTab('in-progress')}>
            In Progress
          </Tab>
          <Tab active={activeTab === 'all'} onClick={() => setActiveTab('all')}>
            All Tickets
          </Tab>
        </TabsContainer>

        <FiltersContainer>
          <FilterGroup>
            <SearchInput
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </FilterGroup>
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
        </FiltersContainer>

        <TicketsGrid>
          {filteredTickets.map(ticket => (
            <TicketCard key={ticket.id}>
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
                  <MetaValue>{ticket.replyMessage ? formatDuration(ticket.responseTime) : 'Pending'}</MetaValue>
                </MetaItem>
              </TicketMeta>

              <ActionButtons>
                <ActionButton variant="primary" onClick={() => handleViewTicket(ticket)}>View</ActionButton>
                {ticket.status !== 'closed' && (
                  <ActionButton variant="primary" onClick={() => handleReplyTicket(ticket)}>Reply</ActionButton>
                )}
                <ActionButton onClick={() => handleAddNote(ticket)}>Add Note</ActionButton>
                {ticket.replyMessage && ticket.status !== 'closed' && (
                  <ActionButton onClick={() => handleCloseTicket(ticket)}>Close Ticket</ActionButton>
                )}
                <ActionButton variant="danger" onClick={() => handleDeleteTicket(ticket)}>Delete</ActionButton>
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
                  disabled={!newTicket.subject || !newTicket.description || !selectedUser}
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
                        <span style={{
                          padding: '4px 12px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '600',
                          background: selectedTicket.status === 'open' ? '#FEF3C7' :
                                    selectedTicket.status === 'in-progress' ? '#DBEAFE' : '#ECFDF5',
                          color: selectedTicket.status === 'open' ? '#D97706' :
                                selectedTicket.status === 'in-progress' ? '#1E40AF' : '#059669'
                        }}>
                          {selectedTicket.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                      <FormLabel>Priority</FormLabel>
                      <div style={{ padding: '8px 0' }}>
                        <span style={{
                          padding: '4px 12px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '600',
                          background: selectedTicket.priority === 'urgent' ? '#FEE2E2' :
                                    selectedTicket.priority === 'high' ? '#FEF3C7' :
                                    selectedTicket.priority === 'medium' ? '#DBEAFE' : '#F3F4F6',
                          color: selectedTicket.priority === 'urgent' ? '#DC2626' :
                                selectedTicket.priority === 'high' ? '#D97706' :
                                selectedTicket.priority === 'medium' ? '#1E40AF' : '#6B7280'
                        }}>
                          {selectedTicket.priority}
                        </span>
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

                  {selectedTicket.replyMessage && (
                    <div>
                      <FormLabel>Support Reply</FormLabel>
                      <div style={{
                        padding: '12px',
                        backgroundColor: '#F0F9FF',
                        borderRadius: '8px',
                        border: '1px solid #BAE6FD',
                        marginTop: '8px'
                      }}>
                        <div style={{
                          fontSize: '12px',
                          color: '#0369A1',
                          marginBottom: '8px',
                          fontWeight: '600'
                        }}>
                          {selectedTicket.repliedBy} • {formatDateTime(selectedTicket.repliedAt || '')}
                        </div>
                        <div style={{
                          color: '#374151',
                          lineHeight: '1.5',
                          whiteSpace: 'pre-wrap'
                        }}>
                          {selectedTicket.replyMessage}
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedTicket.notes && selectedTicket.notes.length > 0 && (
                    <div>
                      <FormLabel>Internal Notes (Admin Only)</FormLabel>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
                        {selectedTicket.notes.map(note => (
                          <div key={note.id} style={{
                            padding: '12px',
                            backgroundColor: '#FEF3C7',
                            borderRadius: '8px',
                            border: '1px solid #FCD34D'
                          }}>
                            <div style={{
                              fontSize: '12px',
                              color: '#92400E',
                              marginBottom: '8px',
                              fontWeight: '600'
                            }}>
                              {note.createdBy} • {formatDateTime(note.createdAt)}
                            </div>
                            <div style={{
                              color: '#374151',
                              lineHeight: '1.5',
                              whiteSpace: 'pre-wrap'
                            }}>
                              {note.message}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="secondary" onClick={() => setShowViewTicketModal(false)}>
                  Close
                </Button>
                {selectedTicket.status !== 'closed' && (
                  <Button variant="primary" onClick={() => {
                    setShowViewTicketModal(false);
                    handleReplyTicket(selectedTicket);
                  }}>
                    Reply
                  </Button>
                )}
                <Button variant="secondary" onClick={() => handleAddNote(selectedTicket)}>
                  Add Note
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}

        {/* Reply Modal */}
        {showReplyModal && selectedTicket && (
          <Modal onClick={() => setShowReplyModal(false)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <ModalHeader>
                <ModalTitle>Reply to Ticket {selectedTicket.ticketNumber}</ModalTitle>
                <CloseButton onClick={() => setShowReplyModal(false)}>×</CloseButton>
              </ModalHeader>
              <ModalBody>
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E6EBF1' }}>
                    <div style={{ fontWeight: '600', color: '#0A2540', marginBottom: '4px' }}>
                      {selectedTicket.subject}
                    </div>
                    <div style={{ fontSize: '14px', color: '#6B7280', marginBottom: '8px' }}>
                      From: {selectedTicket.customerName} ({selectedTicket.customerEmail})
                    </div>
                    <div style={{ color: '#374151', lineHeight: '1.5' }}>
                      {selectedTicket.description}
                    </div>
                  </div>
                </div>

                {selectedTicket.notes && selectedTicket.notes.length > 0 && (
                  <div style={{ marginBottom: '20px' }}>
                    <FormLabel>Internal Notes (Admin Only)</FormLabel>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                      {selectedTicket.notes.map(note => (
                        <div key={note.id} style={{
                          padding: '10px',
                          backgroundColor: '#FEF3C7',
                          borderRadius: '6px',
                          border: '1px solid #FCD34D'
                        }}>
                          <div style={{
                            fontSize: '11px',
                            color: '#92400E',
                            marginBottom: '6px',
                            fontWeight: '600'
                          }}>
                            📝 {note.createdBy} • {formatDateTime(note.createdAt)}
                          </div>
                          <div style={{
                            color: '#374151',
                            fontSize: '13px',
                            lineHeight: '1.4'
                          }}>
                            {note.message}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <FormGroup>
                  <FormLabel>Ticket Status</FormLabel>
                  <FormSelect
                    value={replyStatus}
                    onChange={(e) => setReplyStatus(e.target.value as SupportTicket['status'])}
                  >
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="closed">Closed</option>
                  </FormSelect>
                </FormGroup>

                <FormGroup>
                  <FormLabel>Your Reply</FormLabel>
                  <FormTextArea
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder="Type your reply to the customer..."
                    style={{ minHeight: '120px' }}
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

        {/* Add Note Modal */}
        {showAddNoteModal && selectedTicket && (
          <Modal onClick={() => setShowAddNoteModal(false)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <ModalHeader>
                <ModalTitle>Add Note to Ticket {selectedTicket.ticketNumber}</ModalTitle>
                <CloseButton onClick={() => setShowAddNoteModal(false)}>×</CloseButton>
              </ModalHeader>
              <ModalBody>
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E6EBF1' }}>
                    <div style={{ fontWeight: '600', color: '#0A2540', marginBottom: '4px' }}>
                      {selectedTicket.subject}
                    </div>
                    <div style={{ fontSize: '14px', color: '#6B7280' }}>
                      From: {selectedTicket.customerName} ({selectedTicket.customerEmail})
                    </div>
                  </div>
                </div>
                
                <FormGroup>
                  <FormLabel>Internal Note (Not visible to customer)</FormLabel>
                  <FormTextArea
                    value={noteMessage}
                    onChange={(e) => setNoteMessage(e.target.value)}
                    placeholder="Add an internal note for your team..."
                  />
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button variant="secondary" onClick={() => setShowAddNoteModal(false)}>
                  Cancel
                </Button>
                <Button 
                  variant="primary" 
                  onClick={handleConfirmAddNote}
                  disabled={!noteMessage.trim()}
                >
                  Add Note
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}


        {/* Close Ticket Modal */}
        {showCloseTicketModal && selectedTicket && (
          <Modal onClick={() => setShowCloseTicketModal(false)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <ModalHeader>
                <ModalTitle>Close Ticket</ModalTitle>
                <CloseButton onClick={() => setShowCloseTicketModal(false)}>×</CloseButton>
              </ModalHeader>
              <ModalBody>
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <h3 style={{ color: '#0A2540', marginBottom: '12px' }}>Close This Ticket?</h3>
                  <p style={{ color: '#6B7280', marginBottom: '20px', lineHeight: '1.5' }}>
                    This will mark ticket <strong>{selectedTicket.ticketNumber}</strong> as <strong>CLOSED</strong>.
                    <br />
                    The customer will be notified that their issue has been resolved.
                  </p>
                  
                  <div style={{ padding: '12px', backgroundColor: '#ECFDF5', borderRadius: '8px', border: '1px solid #86EFAC', marginBottom: '20px' }}>
                    <div style={{ fontWeight: '600', color: '#065F46', marginBottom: '4px' }}>
                      Subject: {selectedTicket.subject}
                    </div>
                    <div style={{ fontSize: '14px', color: '#047857' }}>
                      Customer: {selectedTicket.customerName}
                    </div>
                    <div style={{ fontSize: '14px', color: '#047857' }}>
                      Current Status: <span style={{ textTransform: 'uppercase', fontWeight: '600' }}>{selectedTicket.status}</span>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="secondary" onClick={() => setShowCloseTicketModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleConfirmCloseTicket}>
                  Close Ticket
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}

        {/* Delete Ticket Modal */}
        {showDeleteTicketModal && selectedTicket && (
          <Modal onClick={() => setShowDeleteTicketModal(false)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <ModalHeader>
                <ModalTitle>Delete Ticket</ModalTitle>
                <CloseButton onClick={() => setShowDeleteTicketModal(false)}>×</CloseButton>
              </ModalHeader>
              <ModalBody>
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <h3 style={{ color: '#0A2540', marginBottom: '12px' }}>Delete This Ticket?</h3>
                  <p style={{ color: '#6B7280', marginBottom: '20px', lineHeight: '1.5' }}>
                    This action <strong>cannot be undone</strong>. This will permanently delete ticket <strong>{selectedTicket.ticketNumber}</strong> and remove all associated data.
                  </p>

                  <div style={{ padding: '12px', backgroundColor: '#FEE2E2', borderRadius: '8px', border: '1px solid #FCA5A5', marginBottom: '20px' }}>
                    <div style={{ fontWeight: '600', color: '#991B1B', marginBottom: '4px' }}>
                      Subject: {selectedTicket.subject}
                    </div>
                    <div style={{ fontSize: '14px', color: '#B91C1C' }}>
                      Customer: {selectedTicket.customerName}
                    </div>
                    <div style={{ fontSize: '14px', color: '#B91C1C' }}>
                      Status: <span style={{ textTransform: 'uppercase', fontWeight: '600' }}>{selectedTicket.status}</span>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="secondary" onClick={() => setShowDeleteTicketModal(false)}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleConfirmDeleteTicket}
                  style={{ backgroundColor: '#DC2626', borderColor: '#DC2626' }}
                >
                  Delete Permanently
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

export default SystemInquiryPage;