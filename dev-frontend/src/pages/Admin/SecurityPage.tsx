import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, Header, Title, ActionSection, Content } from '../../components/UI/PageComponents';
import { BaseButton } from '../../components/UI/CommonStyles';
import { StandardSelect } from '../../components/UI/SelectComponents';
import { StatsGrid, StatCard, StatValue, StatLabel } from '../../components/UI/StatCard';
import { TabContainer, Tab } from '../../components/UI';
import { Modal, ModalButton } from '../../components/UI/Modal';

interface SecurityEvent {
  id: string;
  timestamp: string;
  eventType: 'login' | 'logout' | 'failed_login' | 'password_change' | 'permission_change' | 'data_access' | 'suspicious_activity';
  severity: 'low' | 'medium' | 'high' | 'critical';
  userId: string;
  userName: string;
  userRole: string;
  ipAddress: string;
  userAgent: string;
  description: string;
  location?: string;
  resolved: boolean;
}

interface SecurityPolicy {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  category: 'authentication' | 'authorization' | 'data_protection' | 'monitoring';
  settings: { [key: string]: any };
  lastUpdated: string;
}

// Container, Header, Title, ActionSection, Content now imported from PageComponents
// BaseButton now imported from CommonStyles

// StatsGrid, StatCard, StatValue, StatLabel now imported from UI/StatCard

const ContentSection = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`;

const SectionHeader = styled.div`
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;
  padding: 20px 24px;
  display: flex;
  justify-content: between;
  align-items: center;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`;





const EventsList = styled.div`
  max-height: 600px;
  overflow-y: auto;
`;

const EventItem = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.2s;
  
  &:hover {
    background: #FAFBFC;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const EventHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`;

const EventInfo = styled.div`
  flex: 1;
`;

const EventType = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  text-transform: capitalize;
  margin-bottom: 4px;
`;

const EventUser = styled.div`
  font-size: 14px;
  color: #6B7280;
`;

const EventBadges = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const SeverityBadge = styled.span<{ severity: string }>`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${props => {
    switch(props.severity) {
      case 'critical': return '#FEE2E2';
      case 'high': return '#FED7AA';
      case 'medium': return '#FEF3C7';
      case 'low': return '#E0F2FE';
      default: return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch(props.severity) {
      case 'critical': return '#DC2626';
      case 'high': return '#EA580C';
      case 'medium': return '#D97706';
      case 'low': return '#0891B2';
      default: return '#6B7280';
    }
  }};
`;

const EventTimestamp = styled.div`
  font-size: 12px;
  color: #9CA3AF;
`;

const EventDescription = styled.div`
  font-size: 14px;
  color: #6B7280;
  margin: 8px 0;
  line-height: 1.4;
`;

const EventMeta = styled.div`
  font-size: 12px;
  color: #9CA3AF;
  font-family: 'Monaco', 'Menlo', monospace;
`;

const PoliciesGrid = styled.div`
  padding: 0;
  display: grid;
  gap: 0;
`;

const PolicyItem = styled.div<{ enabled?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #E6EBF1;
  transition: all 0.2s;
  opacity: ${props => props.enabled ? 1 : 0.6};

  &:hover {
    background: #FAFBFC;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const PolicyInfo = styled.div`
  flex: 1;
`;

const PolicyName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`;

const PolicyDescription = styled.div`
  font-size: 13px;
  color: #6B7280;
  line-height: 1.4;
`;

const PolicyCategory = styled.div`
  font-size: 11px;
  color: #9CA3AF;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 4px;
`;

const PolicyActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Toggle = styled.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  
  &:checked + span {
    background-color: #635BFF;
  }
  
  &:checked + span:before {
    transform: translateX(24px);
  }
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #CBD5E1;
  transition: 0.3s;
  border-radius: 24px;

  &:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: 0.3s;
    border-radius: 50%;
  }
`;

// Modal now imported from common/Modal

const WarningIcon = styled.div`
  font-size: 48px;
  text-align: center;
  margin-bottom: 16px;
`;

const WarningText = styled.div`
  font-size: 18px;
  color: #DC2626;
  text-align: center;
  margin-bottom: 16px;
`;

const PolicyMeta = styled.div`
  font-size: 14px;
  color: #6B7280;
  margin-top: 12px;
  line-height: 1.5;
`;

const ConfigForm = styled.div`
  margin-top: 24px;
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

const FormInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

// FormSelect replaced with StandardSelect from SelectComponents

const PolicyToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SecurityPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('events');
  const [events, setEvents] = useState<SecurityEvent[]>([]);
  const [policies, setPolicies] = useState<SecurityPolicy[]>([]);
  const [showConfigureModal, setShowConfigureModal] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<SecurityPolicy | null>(null);
  const [showLockSessionsModal, setShowLockSessionsModal] = useState(false);

  useEffect(() => {
    // TODO: Implement API call to fetch security events and policies
    setEvents([]);
    setPolicies([]);
  }, []);

  const totalEvents = events.length;
  const criticalEvents = events.filter(e => e.severity === 'critical').length;
  const unresolvedEvents = events.filter(e => !e.resolved).length;
  const enabledPolicies = policies.filter(p => p.enabled).length;

  const togglePolicy = (policyId: string) => {
    setPolicies(policies.map(policy => 
      policy.id === policyId 
        ? { ...policy, enabled: !policy.enabled, lastUpdated: new Date().toISOString().replace('T', ' ').slice(0, 19) }
        : policy
    ));
  };

  const handleSecurityReport = () => {
    const reportData = {
      generatedAt: new Date().toISOString(),
      summary: {
        totalEvents: events.length,
        criticalEvents,
        unresolvedEvents,
        activePolicies: enabledPolicies,
        totalPolicies: policies.length
      },
      eventBreakdown: {
        critical: events.filter(e => e.severity === 'critical').length,
        high: events.filter(e => e.severity === 'high').length,
        medium: events.filter(e => e.severity === 'medium').length,
        low: events.filter(e => e.severity === 'low').length
      },
      eventTypes: {
        login: events.filter(e => e.eventType === 'login').length,
        failed_login: events.filter(e => e.eventType === 'failed_login').length,
        permission_change: events.filter(e => e.eventType === 'permission_change').length,
        data_access: events.filter(e => e.eventType === 'data_access').length,
        suspicious_activity: events.filter(e => e.eventType === 'suspicious_activity').length
      },
      recentEvents: events.slice(0, 20),
      policies: policies.map(p => ({
        name: p.name,
        enabled: p.enabled,
        category: p.category,
        lastUpdated: p.lastUpdated
      }))
    };

    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `security-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleLockAllSessions = () => {
    setShowLockSessionsModal(true);
  };

  const handleConfirmLockSessions = () => {
    // In a real app, this would call an API to lock all active sessions
    alert('All user sessions have been locked. Users will be required to re-authenticate.');
    setShowLockSessionsModal(false);
    
    // Simulate adding a security event
    const lockEvent: SecurityEvent = {
      id: `event-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      eventType: 'permission_change',
      severity: 'high',
      userId: 'admin',
      userName: 'System Administrator',
      userRole: 'Admin',
      ipAddress: '127.0.0.1',
      userAgent: 'Admin Console',
      description: 'All user sessions locked by administrator',
      location: 'System',
      resolved: true
    };
    setEvents([lockEvent, ...events]);
  };

  const handleConfigurePolicy = (policy: SecurityPolicy) => {
    setSelectedPolicy(policy);
    setShowConfigureModal(true);
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-MY');
  };

  return (
    <>
      <Container>
        <Header>
          <Title>Security & Access Control</Title>
          <ActionSection>
            <BaseButton variant="secondary" onClick={handleSecurityReport}>Security Report</BaseButton>
            <BaseButton variant="primary" onClick={handleLockAllSessions}>Lock All Sessions</BaseButton>
          </ActionSection>
        </Header>
        <Content>

        <StatsGrid>
          <StatCard color="#059669">
            <StatValue>{totalEvents}</StatValue>
            <StatLabel>Security Events (24h)</StatLabel>
          </StatCard>
          <StatCard color="#DC2626">
            <StatValue>{criticalEvents}</StatValue>
            <StatLabel>Critical Alerts</StatLabel>
          </StatCard>
          <StatCard color="#D97706">
            <StatValue>{unresolvedEvents}</StatValue>
            <StatLabel>Unresolved Events</StatLabel>
          </StatCard>
          <StatCard color="#2563EB">
            <StatValue>{enabledPolicies}/{policies.length}</StatValue>
            <StatLabel>Active Policies</StatLabel>
          </StatCard>
        </StatsGrid>

        <TabContainer>
          <Tab active={activeTab === 'events'} onClick={() => setActiveTab('events')}>
            Security Events
          </Tab>
          <Tab active={activeTab === 'policies'} onClick={() => setActiveTab('policies')}>
            Security Policies
          </Tab>
          <Tab active={activeTab === 'access'} onClick={() => setActiveTab('access')}>
            Access Control
          </Tab>
        </TabContainer>

        <ContentSection>
          {activeTab === 'events' && (
            <>
              <SectionHeader>
                <SectionTitle>Recent Security Events</SectionTitle>
              </SectionHeader>
              <EventsList>
                {events.map(event => (
                  <EventItem key={event.id}>
                    <EventHeader>
                      <EventInfo>
                        <EventType>{event.eventType.replace('_', ' ')}</EventType>
                        <EventUser>{event.userName} ({event.userRole})</EventUser>
                      </EventInfo>
                      <EventBadges>
                        <SeverityBadge severity={event.severity}>{event.severity}</SeverityBadge>
                        <EventTimestamp>{formatTimestamp(event.timestamp)}</EventTimestamp>
                      </EventBadges>
                    </EventHeader>
                    <EventDescription>{event.description}</EventDescription>
                    <EventMeta>
                      IP: {event.ipAddress} | Location: {event.location || 'Unknown'} | 
                      Status: {event.resolved ? 'Resolved' : 'Unresolved'}
                    </EventMeta>
                  </EventItem>
                ))}
              </EventsList>
            </>
          )}

          {activeTab === 'policies' && (
            <>
              <SectionHeader>
                <SectionTitle>Security Policies</SectionTitle>
              </SectionHeader>
              <PoliciesGrid>
                {policies.map(policy => (
                  <PolicyItem key={policy.id} enabled={policy.enabled}>
                    <PolicyInfo>
                      <PolicyName>{policy.name}</PolicyName>
                      <PolicyDescription>{policy.description}</PolicyDescription>
                      <PolicyCategory>{policy.category.replace('_', ' ')}</PolicyCategory>
                    </PolicyInfo>
                    <PolicyActions>
                      <Toggle>
                        <ToggleInput
                          type="checkbox"
                          checked={policy.enabled}
                          onChange={() => togglePolicy(policy.id)}
                        />
                        <ToggleSlider />
                      </Toggle>
                      <BaseButton variant="secondary" onClick={() => handleConfigurePolicy(policy)}>Configure</BaseButton>
                    </PolicyActions>
                  </PolicyItem>
                ))}
              </PoliciesGrid>
            </>
          )}

          {activeTab === 'access' && (
            <>
              <SectionHeader>
                <SectionTitle>Access Control Matrix</SectionTitle>
              </SectionHeader>
              <div style={{ padding: '24px', textAlign: 'center', color: '#6B7280' }}>
                Access Control Matrix will be implemented here with role-based permissions management.
              </div>
            </>
          )}
        </ContentSection>

        {/* Lock Sessions Confirmation Modal */}
        <Modal
          isOpen={showLockSessionsModal}
          onClose={() => setShowLockSessionsModal(false)}
          title="Lock All User Sessions"
          footer={
            <>
              <ModalButton variant="secondary" onClick={() => setShowLockSessionsModal(false)}>
                Cancel
              </ModalButton>
              <ModalButton variant="primary" onClick={handleConfirmLockSessions}>
                Lock All Sessions
              </ModalButton>
            </>
          }
        >
          <WarningIcon>⚠️</WarningIcon>
          <WarningText>
            <strong>Are you sure you want to lock all active user sessions?</strong>
          </WarningText>
          <p style={{ color: '#6B7280', marginBottom: '0', textAlign: 'center' }}>
            This will immediately terminate all user sessions across all devices.
            Users will need to log in again to continue using the system.
          </p>
        </Modal>

        {/* Configure Policy Modal */}
        {selectedPolicy && (
          <Modal
            isOpen={showConfigureModal}
            onClose={() => setShowConfigureModal(false)}
            title={`Configure Policy: ${selectedPolicy.name}`}
            footer={
              <>
                <ModalButton variant="secondary" onClick={() => setShowConfigureModal(false)}>
                  Cancel
                </ModalButton>
                <ModalButton onClick={() => {
                  alert('Policy configuration updated successfully!');
                  setShowConfigureModal(false);
                }}>
                  Save Configuration
                </ModalButton>
              </>
            }
          >
                <PolicyInfo>
                  <PolicyDescription>{selectedPolicy.description}</PolicyDescription>
                  <PolicyMeta>
                    <strong>Category:</strong> {selectedPolicy.category.replace('_', ' ')}<br/>
                    <strong>Status:</strong> {selectedPolicy.enabled ? 'Enabled' : 'Disabled'}<br/>
                    <strong>Last Updated:</strong> {formatTimestamp(selectedPolicy.lastUpdated)}
                  </PolicyMeta>
                </PolicyInfo>
                <ConfigForm>
                  <FormGroup>
                    <FormLabel>Policy Status</FormLabel>
                    <PolicyToggle>
                      <Toggle>
                        <ToggleInput
                          type="checkbox"
                          checked={selectedPolicy.enabled}
                          onChange={() => togglePolicy(selectedPolicy.id)}
                        />
                        <ToggleSlider />
                      </Toggle>
                      <span>{selectedPolicy.enabled ? 'Enabled' : 'Disabled'}</span>
                    </PolicyToggle>
                  </FormGroup>
                  
                  {selectedPolicy.category === 'authentication' && (
                    <>
                      <FormGroup>
                        <FormLabel>Session Timeout (minutes)</FormLabel>
                        <FormInput type="number" defaultValue="30" min="5" max="480" />
                      </FormGroup>
                      <FormGroup>
                        <FormLabel>Max Login Attempts</FormLabel>
                        <FormInput type="number" defaultValue="5" min="3" max="10" />
                      </FormGroup>
                    </>
                  )}
                  
                  {selectedPolicy.category === 'data_protection' && (
                    <>
                      <FormGroup>
                        <FormLabel>Encryption Level</FormLabel>
                        <StandardSelect defaultValue="aes256">
                          <option value="aes128">AES-128</option>
                          <option value="aes256">AES-256</option>
                        </StandardSelect>
                      </FormGroup>
                      <FormGroup>
                        <FormLabel>Data Retention (days)</FormLabel>
                        <FormInput type="number" defaultValue="365" min="30" max="2555" />
                      </FormGroup>
                    </>
                  )}
                  
                  {selectedPolicy.category === 'monitoring' && (
                    <>
                      <FormGroup>
                        <FormLabel>Alert Threshold</FormLabel>
                        <StandardSelect defaultValue="medium">
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                          <option value="critical">Critical</option>
                        </StandardSelect>
                      </FormGroup>
                      <FormGroup>
                        <FormLabel>Monitoring Interval (minutes)</FormLabel>
                        <FormInput type="number" defaultValue="5" min="1" max="60" />
                      </FormGroup>
                    </>
                  )}
                </ConfigForm>
          </Modal>
        )}
        </Content>
      </Container>
    </>
  );
};

export default SecurityPage;