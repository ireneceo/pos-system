import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { EmptyState } from '../../components/UI/TableComponents';
import { Modal as CommonModal } from '../../components/UI';

interface ContactInquiry {
  id: number;
  name: string;
  email: string;
  phone?: string;
  company_name?: string;
  inquiry_type?: 'free_trial' | 'pricing' | 'demo' | 'support' | 'partnership' | 'other';
  interested_plan?: string;
  preferred_username?: string;
  message: string;
  status: 'new' | 'in_progress' | 'resolved' | 'closed';
  notes?: string;
  reply_message?: string;
  replied_by_name?: string;
  replied_at?: string;
  email_sent?: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Stats {
  total: number;
  new: number;
  in_progress: number;
  resolved: number;
}

const Container = styled.div`
  min-height: 100vh;
`;

const Header = styled.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`;

const Content = styled.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`;

const StatCard = styled.div<{ color?: string }>`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${props => props.color || '#635BFF'};
`;

const StatValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #0A2540;
`;

const StatLabel = styled.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 4px;
`;

const FilterBar = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

const SearchInput = styled.input`
  padding: 10px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  min-width: 250px;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`;

const FilterSelect = styled.select`
  padding: 10px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`;

const InquiryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const InquiryCard = styled.div`
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

const InquiryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`;

const InquiryInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const InquiryName = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const InquiryEmail = styled.div`
  font-size: 14px;
  color: #635BFF;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const InquiryCompany = styled.div`
  font-size: 14px;
  color: #6B7280;
  margin-top: 4px;
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  flex-shrink: 0;
  background: ${props => {
    switch(props.status) {
      case 'new': return '#FEF3C7';
      case 'in_progress': return '#DBEAFE';
      case 'resolved': return '#ECFDF5';
      case 'closed': return '#F3F4F6';
      default: return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'new': return '#D97706';
      case 'in_progress': return '#1E40AF';
      case 'resolved': return '#059669';
      case 'closed': return '#6B7280';
      default: return '#6B7280';
    }
  }};
`;

const PlanBadge = styled.span`
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  background: #F0F4FF;
  color: #635BFF;
  margin-left: 8px;
`;

const InquiryTypeBadge = styled.span<{ type?: string }>`
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  margin-left: 8px;
  background: ${props => {
    switch(props.type) {
      case 'free_trial': return '#ECFDF5';
      case 'pricing': return '#FEF3C7';
      case 'demo': return '#DBEAFE';
      case 'support': return '#FEE2E2';
      case 'partnership': return '#F3E8FF';
      default: return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch(props.type) {
      case 'free_trial': return '#059669';
      case 'pricing': return '#D97706';
      case 'demo': return '#1E40AF';
      case 'support': return '#DC2626';
      case 'partnership': return '#7C3AED';
      default: return '#6B7280';
    }
  }};
`;

const InquiryMessage = styled.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.6;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  margin: 16px 0;
  white-space: pre-wrap;
  word-break: break-word;
`;

const CardMessagePreview = styled.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
  margin: 12px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
`;

const ReplySection = styled.div`
  margin-top: 16px;
  padding: 16px;
  background: #ECFDF5;
  border-radius: 8px;
  border-left: 3px solid #10B981;
`;

const ReplyLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #059669;
  text-transform: uppercase;
  margin-bottom: 8px;
`;

const ReplyContent = styled.div`
  font-size: 14px;
  color: #065F46;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
`;

const ReplyMeta = styled.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 8px;
`;

const InquiryMeta = styled.div`
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

const RepliedBadge = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: #059669;
  background: #ECFDF5;
  padding: 2px 8px;
  border-radius: 4px;
`;


const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`;

const FormTextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  min-height: 150px;
  resize: vertical;
  font-family: inherit;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`;

const Checkbox = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;

  input {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
`;

const DetailItem = styled.div`
  font-size: 14px;
`;

const DetailItemLabel = styled.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
  text-transform: uppercase;
  font-weight: 600;
`;

const DetailItemValue = styled.div`
  font-size: 14px;
  color: #0A2540;
  word-break: break-word;
`;

const StatusSelect = styled.select`
  padding: 6px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 13px;
  background: white;
  cursor: pointer;
  font-weight: 500;
  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  ${props => props.variant === 'primary' ? `
    background: #635BFF;
    color: white;
    border-color: #635BFF;
    &:hover { background: #5A51E6; }
  ` : props.variant === 'danger' ? `
    background: transparent;
    color: #DC2626;
    border-color: #FCA5A5;
    &:hover { background: #FEE2E2; }
  ` : `
    background: transparent;
    color: #6B7280;
    border-color: #E6EBF1;
    &:hover { background: #F8FAFC; color: #0A2540; }
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ContactInquiriesPage: React.FC = () => {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, new: 0, in_progress: 0, resolved: 0 });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Detail modal state
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<ContactInquiry | null>(null);
  const [detailStatus, setDetailStatus] = useState('');

  // Reply modal state
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
  const [sendEmail, setSendEmail] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Delete confirm state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const loadData = useCallback(async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      const token = localStorage.getItem('auth_token');
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (searchTerm) params.append('search', searchTerm);

      const [inquiriesRes, statsRes] = await Promise.all([
        fetch(`/api/public/admin/inquiries?${params}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('/api/public/admin/inquiries-stats', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      if (inquiriesRes.ok) {
        setInquiries(await inquiriesRes.json());
      }
      if (statsRes.ok) {
        setStats(await statsRes.json());
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, statusFilter]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // 10초 polling
  useEffect(() => {
    const interval = setInterval(() => loadData(true), 10000);
    return () => clearInterval(interval);
  }, [loadData]);

  const openDetail = (inquiry: ContactInquiry) => {
    setSelectedInquiry(inquiry);
    setDetailStatus(inquiry.status);
    setShowDetailModal(true);
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!selectedInquiry) return;
    setDetailStatus(newStatus);
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/public/admin/inquiries/${selectedInquiry.id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        setInquiries(prev => prev.map(i =>
          i.id === selectedInquiry.id ? { ...i, status: newStatus as ContactInquiry['status'] } : i
        ));
        setSelectedInquiry(prev => prev ? { ...prev, status: newStatus as ContactInquiry['status'] } : null);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const openReplyModal = () => {
    setReplyMessage('');
    setSendEmail(true);
    setShowReplyModal(true);
  };

  const submitReply = async () => {
    if (!selectedInquiry || !replyMessage.trim()) return;

    setSubmitting(true);
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/public/admin/inquiries/${selectedInquiry.id}/reply`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          reply_message: replyMessage,
          send_email: sendEmail
        })
      });

      if (response.ok) {
        setShowReplyModal(false);
        setShowDetailModal(false);
        loadData();
      }
    } catch (error) {
      console.error('Error sending reply:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const deleteInquiry = async () => {
    if (!selectedInquiry) return;
    try {
      const token = localStorage.getItem('auth_token');
      await fetch(`/api/public/admin/inquiries/${selectedInquiry.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setShowDeleteConfirm(false);
      setShowDetailModal(false);
      loadData();
    } catch (error) {
      console.error('Error deleting inquiry:', error);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPlan = (plan: string) => {
    if (!plan) return null;
    return plan.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatInquiryType = (type: string) => {
    const labels: Record<string, string> = {
      free_trial: 'Free Trial',
      pricing: 'Pricing',
      demo: 'Demo',
      support: 'Support',
      partnership: 'Partnership',
      other: 'Other'
    };
    return labels[type] || type;
  };

  return (
    <>
      <Container>
        <Header>
          <Title>Contact Inquiries</Title>
        </Header>

        <Content>
          <StatsGrid>
            <StatCard color="#635BFF">
              <StatValue>{stats.total}</StatValue>
              <StatLabel>Total Inquiries</StatLabel>
            </StatCard>
            <StatCard color="#F59E0B">
              <StatValue>{stats.new}</StatValue>
              <StatLabel>New</StatLabel>
            </StatCard>
            <StatCard color="#3B82F6">
              <StatValue>{stats.in_progress}</StatValue>
              <StatLabel>In Progress</StatLabel>
            </StatCard>
            <StatCard color="#10B981">
              <StatValue>{stats.resolved}</StatValue>
              <StatLabel>Resolved</StatLabel>
            </StatCard>
          </StatsGrid>

          <FilterBar>
            <FilterSelect
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </FilterSelect>
            <SearchInput
              placeholder="Search by name, email, company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </FilterBar>

          {loading ? (
            <EmptyState>Loading...</EmptyState>
          ) : inquiries.length === 0 ? (
            <EmptyState>No inquiries found</EmptyState>
          ) : (
            <InquiryGrid>
              {inquiries.map((inquiry) => (
                <InquiryCard key={inquiry.id} onClick={() => openDetail(inquiry)}>
                  <InquiryHeader>
                    <InquiryInfo>
                      <InquiryName>
                        {inquiry.name}
                      </InquiryName>
                      <InquiryEmail>{inquiry.email}</InquiryEmail>
                      {inquiry.company_name && (
                        <InquiryCompany>{inquiry.company_name}</InquiryCompany>
                      )}
                    </InquiryInfo>
                    <StatusBadge status={inquiry.status}>
                      {inquiry.status.replace('_', ' ')}
                    </StatusBadge>
                  </InquiryHeader>

                  <CardMessagePreview>{inquiry.message}</CardMessagePreview>

                  <InquiryMeta>
                    <span>{formatDate(inquiry.createdAt)}</span>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      {inquiry.inquiry_type && (
                        <InquiryTypeBadge type={inquiry.inquiry_type} style={{ marginLeft: 0 }}>
                          {formatInquiryType(inquiry.inquiry_type)}
                        </InquiryTypeBadge>
                      )}
                      {inquiry.reply_message && (
                        <RepliedBadge>Replied</RepliedBadge>
                      )}
                    </div>
                  </InquiryMeta>
                </InquiryCard>
              ))}
            </InquiryGrid>
          )}
        </Content>

        {/* Detail Modal */}
        {showDetailModal && selectedInquiry && (
                    <CommonModal isOpen={true} onClose={() => setShowDetailModal(false)} title="Inquiry Details" footer={<><ActionButton variant="danger" onClick={() => setShowDeleteConfirm(true)}> Delete </ActionButton><div style={{ flex: 1 }} /> {!selectedInquiry.reply_message && ( <ActionButton variant="primary" onClick={openReplyModal}> Reply </ActionButton> )} <ActionButton onClick={() => setShowDetailModal(false)}> Close </ActionButton></>}>

                <DetailGrid>
                  <DetailItem>
                    <DetailItemLabel>Name</DetailItemLabel>
                    <DetailItemValue>{selectedInquiry.name}</DetailItemValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailItemLabel>Email</DetailItemLabel>
                    <DetailItemValue>{selectedInquiry.email}</DetailItemValue>
                  </DetailItem>
                  {selectedInquiry.company_name && (
                    <DetailItem>
                      <DetailItemLabel>Company</DetailItemLabel>
                      <DetailItemValue>{selectedInquiry.company_name}</DetailItemValue>
                    </DetailItem>
                  )}
                  {selectedInquiry.phone && (
                    <DetailItem>
                      <DetailItemLabel>Phone</DetailItemLabel>
                      <DetailItemValue>{selectedInquiry.phone}</DetailItemValue>
                    </DetailItem>
                  )}
                  {selectedInquiry.inquiry_type && (
                    <DetailItem>
                      <DetailItemLabel>Type</DetailItemLabel>
                      <DetailItemValue>
                        <InquiryTypeBadge type={selectedInquiry.inquiry_type} style={{ marginLeft: 0 }}>
                          {formatInquiryType(selectedInquiry.inquiry_type)}
                        </InquiryTypeBadge>
                      </DetailItemValue>
                    </DetailItem>
                  )}
                  {selectedInquiry.interested_plan && (
                    <DetailItem>
                      <DetailItemLabel>Interested Plan</DetailItemLabel>
                      <DetailItemValue>
                        <PlanBadge style={{ marginLeft: 0 }}>{formatPlan(selectedInquiry.interested_plan)}</PlanBadge>
                      </DetailItemValue>
                    </DetailItem>
                  )}
                  {selectedInquiry.preferred_username && (
                    <DetailItem>
                      <DetailItemLabel>Preferred Username</DetailItemLabel>
                      <DetailItemValue><strong>{selectedInquiry.preferred_username}</strong></DetailItemValue>
                    </DetailItem>
                  )}
                  <DetailItem>
                    <DetailItemLabel>Status</DetailItemLabel>
                    <DetailItemValue>
                      <StatusSelect
                        value={detailStatus}
                        onChange={(e) => handleStatusChange(e.target.value)}
                      >
                        <option value="new">New</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="closed">Closed</option>
                      </StatusSelect>
                    </DetailItemValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailItemLabel>Received</DetailItemLabel>
                    <DetailItemValue>{formatDate(selectedInquiry.createdAt)}</DetailItemValue>
                  </DetailItem>
                </DetailGrid>

                <FormGroup>
                  <FormLabel>Message</FormLabel>
                  <InquiryMessage style={{ margin: 0 }}>
                    {selectedInquiry.message}
                  </InquiryMessage>
                </FormGroup>

                {selectedInquiry.reply_message && (
                  <ReplySection>
                    <ReplyLabel>
                      Reply {selectedInquiry.email_sent && '(Email Sent)'}
                    </ReplyLabel>
                    <ReplyContent>{selectedInquiry.reply_message}</ReplyContent>
                    <ReplyMeta>
                      Replied by {selectedInquiry.replied_by_name} on {formatDate(selectedInquiry.replied_at!)}
                    </ReplyMeta>
                  </ReplySection>
                )}
              
          </CommonModal>
        )}

        {/* Reply Modal */}
        {showReplyModal && selectedInquiry && (
                    <CommonModal isOpen={true} onClose={() => setShowReplyModal(false)} title="Reply to {selectedInquiry.name}" footer={<><ActionButton onClick={() => setShowReplyModal(false)}> Cancel </ActionButton><ActionButton variant="primary" onClick={submitReply} disabled={submitting || !replyMessage.trim()} > {submitting ? 'Sending...' : (sendEmail ? 'Send Reply & Email' : 'Save Reply')} </ActionButton></>}>

                <FormGroup>
                  <FormLabel>Original Message</FormLabel>
                  <InquiryMessage style={{ margin: 0 }}>
                    {selectedInquiry.message}
                  </InquiryMessage>
                </FormGroup>

                <FormGroup>
                  <FormLabel>Your Reply</FormLabel>
                  <FormTextArea
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder="Type your reply here..."
                  />
                </FormGroup>

                <Checkbox>
                  <input
                    type="checkbox"
                    checked={sendEmail}
                    onChange={(e) => setSendEmail(e.target.checked)}
                  />
                  Send reply via email to {selectedInquiry.email}
                </Checkbox>
              
          </CommonModal>
        )}

        {/* Delete Confirm Modal */}
        {showDeleteConfirm && (
                    <CommonModal isOpen={true} onClose={() => setShowDeleteConfirm(false)} title="Confirm Delete" footer={<><ActionButton onClick={() => setShowDeleteConfirm(false)}> Cancel </ActionButton><ActionButton variant="danger" onClick={deleteInquiry}> Delete </ActionButton></>}>

                <p style={{ margin: 0, color: '#374151', fontSize: '14px' }}>
                  Are you sure you want to delete this inquiry from <strong>{selectedInquiry?.name}</strong>? This action cannot be undone.
                </p>
              
          </CommonModal>
        )}
      </Container>
    </>
  );
};

export default ContactInquiriesPage;
