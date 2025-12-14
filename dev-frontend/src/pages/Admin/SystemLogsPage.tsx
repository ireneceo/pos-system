import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainLayout from '../../components/Layout/MainLayout';
import { Container, Header, Title, ActionSection, Content } from '../../components/UI/PageComponents';
import { BaseButton } from '../../components/UI/CommonStyles';
import { StatsGrid, StatCard, StatValue, StatLabel } from '../../components/UI/StatCard';
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import { Modal, ModalButton } from '../../components/UI/Modal';

interface SystemLog {
  id: string;
  timestamp: string;
  level: 'debug' | 'info' | 'warning' | 'error' | 'critical';
  category: 'system' | 'database' | 'auth' | 'payment' | 'api' | 'security' | 'backup';
  service: string;
  message: string;
  details?: any;
  userId?: string;
  userName?: string;
  ipAddress?: string;
  userAgent?: string;
  requestId?: string;
  duration?: number;
  statusCode?: number;
}

// Container, Header, Title, ActionSection, Content now imported from PageComponents
// BaseButton now imported from CommonStyles
// StatsGrid, StatCard, StatValue, StatLabel now imported from UI/StatCard






const DateInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`;

const LiveToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
`;

const ToggleButton = styled.button<{ active?: boolean }>`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;
  
  ${props => props.active ? `
    background: #059669;
    color: white;
    border-color: #059669;
    
    &:hover {
      background: #047857;
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

const LogsContainer = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`;

const LogsHeader = styled.div`
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogsTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`;

const LogsActions = styled.div`
  display: flex;
  gap: 8px;
`;

const LogsList = styled.div`
  max-height: 700px;
  overflow-y: auto;
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
  font-size: 13px;
  line-height: 1.4;
`;

const LogItem = styled.div<{ level: string }>`
  padding: 12px 24px;
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.2s;
  
  ${props => {
    switch(props.level) {
      case 'error':
      case 'critical':
        return `
          background: #FEF2F2;
          border-left: 4px solid #DC2626;
        `;
      case 'warning':
        return `
          background: #FFFBEB;
          border-left: 4px solid #F59E0B;
        `;
      case 'debug':
        return `
          background: #F8FAFC;
          border-left: 4px solid #6B7280;
        `;
      default:
        return `
          &:hover {
            background: #FAFBFC;
          }
        `;
    }
  }}
  
  &:last-child {
    border-bottom: none;
  }
`;

const LogHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 4px;
`;

const LogTimestamp = styled.span`
  color: #6B7280;
  font-size: 12px;
`;

const LogLevel = styled.span<{ level: string }>`
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${props => {
    switch(props.level) {
      case 'critical': return '#FEE2E2';
      case 'error': return '#FED7D7';
      case 'warning': return '#FEF3C7';
      case 'info': return '#DBEAFE';
      case 'debug': return '#F3F4F6';
      default: return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch(props.level) {
      case 'critical': return '#DC2626';
      case 'error': return '#E53E3E';
      case 'warning': return '#D97706';
      case 'info': return '#1E40AF';
      case 'debug': return '#6B7280';
      default: return '#6B7280';
    }
  }};
`;

const LogCategory = styled.span`
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 10px;
  font-weight: 500;
  text-transform: uppercase;
  background: #E0F2FE;
  color: #0891B2;
`;

const LogService = styled.span`
  color: #374151;
  font-weight: 500;
`;

const LogMessage = styled.div`
  color: #1F2937;
  margin-bottom: 4px;
`;

const LogMeta = styled.div`
  color: #9CA3AF;
  font-size: 11px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

const LogDetails = styled.pre`
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  border-radius: 4px;
  padding: 8px;
  margin-top: 8px;
  font-size: 11px;
  color: #374151;
  overflow-x: auto;
  white-space: pre-wrap;
`;

// Modal now imported from common/Modal

const ExportOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
`;

const ExportOption = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #F8FAFC;
    border-color: #635BFF;
    transform: translateY(-1px);
  }
`;

const ExportIcon = styled.div`
  font-size: 24px;
`;

const ExportInfo = styled.div`
  flex: 1;
`;

const ExportTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`;

const ExportDesc = styled.div`
  font-size: 14px;
  color: #6B7280;
`;

const WarningIcon = styled.div`
  font-size: 48px;
  text-align: center;
  margin-bottom: 16px;
`;

const WarningText = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  text-align: center;
  margin-bottom: 8px;
`;

const WarningSubtext = styled.div`
  font-size: 14px;
  color: #6B7280;
  text-align: center;
  margin-bottom: 24px;
`;

const ModalActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`;

const SystemLogsPage: React.FC = () => {
  const [logs, setLogs] = useState<SystemLog[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterService, setFilterService] = useState('all');
  const [filterDate, setFilterDate] = useState('');
  const [liveMode, setLiveMode] = useState(false);
  const [expandedLogs, setExpandedLogs] = useState<Set<string>>(new Set());
  const [autoScroll, setAutoScroll] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  useEffect(() => {
    // TODO: Implement API call to fetch system logs
    setLogs([]);
  }, []);

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (log.userName && log.userName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLevel = filterLevel === 'all' || log.level === filterLevel;
    const matchesCategory = filterCategory === 'all' || log.category === filterCategory;
    const matchesService = filterService === 'all' || log.service === filterService;
    const matchesDate = !filterDate || log.timestamp.startsWith(filterDate);
    
    return matchesSearch && matchesLevel && matchesCategory && matchesService && matchesDate;
  });

  const totalLogs = logs.length;
  const errorLogs = logs.filter(l => l.level === 'error' || l.level === 'critical').length;
  const warningLogs = logs.filter(l => l.level === 'warning').length;
  const recentLogs = logs.filter(l => {
    const logTime = new Date(l.timestamp).getTime();
    const hourAgo = Date.now() - (60 * 60 * 1000);
    return logTime > hourAgo;
  }).length;

  const toggleLogDetails = (logId: string) => {
    const newExpanded = new Set(expandedLogs);
    if (newExpanded.has(logId)) {
      newExpanded.delete(logId);
    } else {
      newExpanded.add(logId);
    }
    setExpandedLogs(newExpanded);
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-MY', { 
      hour12: false,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }) + `.${timestamp.split('.')[1] || '000'}`;
  };

  const handleExportLogs = () => {
    setShowExportModal(true);
  };

  const handleClearLogs = () => {
    setShowClearModal(true);
  };

  const handleRefresh = () => {
    // Simulate refreshing logs
    console.log('Refreshing logs...');
    // In real implementation, this would fetch fresh logs from API
  };

  const confirmExport = (format: 'csv' | 'json' | 'txt') => {
    const dataToExport = filteredLogs.map(log => ({
      timestamp: log.timestamp,
      level: log.level,
      category: log.category,
      service: log.service,
      message: log.message,
      userId: log.userId,
      userName: log.userName,
      ipAddress: log.ipAddress,
      requestId: log.requestId,
      duration: log.duration,
      statusCode: log.statusCode,
      details: log.details ? JSON.stringify(log.details) : ''
    }));

    let content = '';
    let mimeType = '';
    let filename = '';

    switch (format) {
      case 'csv':
        const headers = ['Timestamp', 'Level', 'Category', 'Service', 'Message', 'User ID', 'User Name', 'IP Address', 'Request ID', 'Duration', 'Status Code', 'Details'];
        content = [headers.join(','), ...dataToExport.map(log => 
          [log.timestamp, log.level, log.category, log.service, `"${log.message}"`, log.userId || '', log.userName || '', log.ipAddress || '', log.requestId || '', log.duration || '', log.statusCode || '', `"${log.details}"`].join(',')
        )].join('\n');
        mimeType = 'text/csv';
        filename = `system-logs-${new Date().toISOString().split('T')[0]}.csv`;
        break;
      case 'json':
        content = JSON.stringify(dataToExport, null, 2);
        mimeType = 'application/json';
        filename = `system-logs-${new Date().toISOString().split('T')[0]}.json`;
        break;
      case 'txt':
        content = filteredLogs.map(log => 
          `[${log.timestamp}] ${log.level.toUpperCase()} ${log.category}/${log.service}: ${log.message}${log.details ? '\nDetails: ' + JSON.stringify(log.details, null, 2) : ''}`
        ).join('\n\n');
        mimeType = 'text/plain';
        filename = `system-logs-${new Date().toISOString().split('T')[0]}.txt`;
        break;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
    
    setShowExportModal(false);
  };

  const confirmClearLogs = () => {
    setLogs([]);
    setShowClearModal(false);
    console.log('Logs cleared');
  };

  return (
    <MainLayout>
      <Container>
        <Header>
          <Title>System Logs</Title>
          <ActionSection>
            <BaseButton variant="secondary" onClick={handleExportLogs}>Export Logs</BaseButton>
            <BaseButton variant="danger" onClick={handleClearLogs}>Clear Logs</BaseButton>
          </ActionSection>
        </Header>
        
        <Content>
        <StatsGrid>
          <StatCard color="#059669">
            <StatValue>{totalLogs}</StatValue>
            <StatLabel>Total Logs (24h)</StatLabel>
          </StatCard>
          <StatCard color="#DC2626">
            <StatValue>{errorLogs}</StatValue>
            <StatLabel>Errors & Critical</StatLabel>
          </StatCard>
          <StatCard color="#D97706">
            <StatValue>{warningLogs}</StatValue>
            <StatLabel>Warnings</StatLabel>
          </StatCard>
          <StatCard color="#2563EB">
            <StatValue>{recentLogs}</StatValue>
            <StatLabel>Recent (1h)</StatLabel>
          </StatCard>
        </StatsGrid>

        <FilterBar>
          <SearchInput
            placeholder="Search logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FilterSelect value={filterLevel} onChange={(e) => setFilterLevel(e.target.value)}>
            <option value="all">All Levels</option>
            <option value="critical">Critical</option>
            <option value="error">Error</option>
            <option value="warning">Warning</option>
            <option value="info">Info</option>
            <option value="debug">Debug</option>
          </FilterSelect>
          <FilterSelect value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="all">All Categories</option>
            <option value="system">System</option>
            <option value="database">Database</option>
            <option value="auth">Authentication</option>
            <option value="payment">Payment</option>
            <option value="api">API</option>
            <option value="security">Security</option>
            <option value="backup">Backup</option>
          </FilterSelect>
          <FilterSelect value={filterService} onChange={(e) => setFilterService(e.target.value)}>
            <option value="all">All Services</option>
            <option value="order-service">Order Service</option>
            <option value="auth-service">Auth Service</option>
            <option value="pos-api">POS API</option>
            <option value="payment-service">Payment Service</option>
            <option value="backup-service">Backup Service</option>
            <option value="kitchen-display-service">Kitchen Display</option>
          </FilterSelect>
          <DateInput
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
          <LiveToggle>
            <span style={{ fontSize: '12px', color: '#6B7280', fontWeight: '600', textTransform: 'uppercase' }}>
              Live Mode
            </span>
            <ToggleButton
              active={liveMode}
              onClick={() => setLiveMode(!liveMode)}
            >
              {liveMode ? 'ON' : 'OFF'}
            </ToggleButton>
          </LiveToggle>
        </FilterBar>

        <LogsContainer>
          <LogsHeader>
            <LogsTitle>System Logs ({filteredLogs.length} entries)</LogsTitle>
            <LogsActions>
              <BaseButton
                variant={autoScroll ? 'primary' : 'secondary'}
                onClick={() => setAutoScroll(!autoScroll)}
              >
                {autoScroll ? '✓ Auto-scroll' : 'Auto-scroll'}
              </BaseButton>
              <BaseButton variant="secondary" onClick={handleRefresh}>🔄 Refresh</BaseButton>
            </LogsActions>
          </LogsHeader>
          <LogsList>
            {filteredLogs.map(log => (
              <LogItem key={log.id} level={log.level}>
                <LogHeader>
                  <LogTimestamp>{formatTimestamp(log.timestamp)}</LogTimestamp>
                  <LogLevel level={log.level}>{log.level}</LogLevel>
                  <LogCategory>{log.category}</LogCategory>
                  <LogService>{log.service}</LogService>
                  {log.statusCode && (
                    <span style={{ color: log.statusCode >= 400 ? '#DC2626' : '#059669', fontWeight: '500' }}>
                      {log.statusCode}
                    </span>
                  )}
                  {log.duration && (
                    <span style={{ color: '#6B7280' }}>{log.duration}ms</span>
                  )}
                </LogHeader>
                <LogMessage>{log.message}</LogMessage>
                <LogMeta>
                  {log.requestId && <span>Request: {log.requestId}</span>}
                  {log.userId && <span>User: {log.userName || log.userId}</span>}
                  {log.ipAddress && <span>IP: {log.ipAddress}</span>}
                  {log.details && (
                    <span 
                      style={{ cursor: 'pointer', textDecoration: 'underline' }}
                      onClick={() => toggleLogDetails(log.id)}
                    >
                      {expandedLogs.has(log.id) ? 'Hide Details' : 'Show Details'}
                    </span>
                  )}
                </LogMeta>
                {expandedLogs.has(log.id) && log.details && (
                  <LogDetails>{JSON.stringify(log.details, null, 2)}</LogDetails>
                )}
              </LogItem>
            ))}
            {filteredLogs.length === 0 && (
              <div style={{ padding: '40px', textAlign: 'center', color: '#6B7280' }}>
                No logs match the current filters
              </div>
            )}
          </LogsList>
        </LogsContainer>
        </Content>

        {/* Export Modal */}
        <Modal
          isOpen={showExportModal}
          onClose={() => setShowExportModal(false)}
          title="Export System Logs"
        >
          <p>Select the format for exporting {filteredLogs.length} log entries:</p>
          <ExportOptions>
            <ExportOption onClick={() => confirmExport('csv')}>
              <ExportIcon>📊</ExportIcon>
              <ExportInfo>
                <ExportTitle>CSV Format</ExportTitle>
                <ExportDesc>Comma-separated values for spreadsheet analysis</ExportDesc>
              </ExportInfo>
            </ExportOption>
            <ExportOption onClick={() => confirmExport('json')}>
              <ExportIcon>📄</ExportIcon>
              <ExportInfo>
                <ExportTitle>JSON Format</ExportTitle>
                <ExportDesc>Structured data with full details</ExportDesc>
              </ExportInfo>
            </ExportOption>
            <ExportOption onClick={() => confirmExport('txt')}>
              <ExportIcon>📝</ExportIcon>
              <ExportInfo>
                <ExportTitle>Text Format</ExportTitle>
                <ExportDesc>Human-readable log format</ExportDesc>
              </ExportInfo>
            </ExportOption>
          </ExportOptions>
        </Modal>

        {/* Clear Logs Confirmation Modal */}
        <Modal
          isOpen={showClearModal}
          onClose={() => setShowClearModal(false)}
          title="Clear System Logs"
          footer={
            <ModalActions>
              <ModalButton variant="secondary" onClick={() => setShowClearModal(false)}>
                Cancel
              </ModalButton>
              <ModalButton variant="danger" onClick={confirmClearLogs}>
                Clear All Logs
              </ModalButton>
            </ModalActions>
          }
        >
          <WarningIcon>⚠️</WarningIcon>
          <WarningText>
            Are you sure you want to clear all system logs?
          </WarningText>
          <WarningSubtext>
            This action cannot be undone. All {logs.length} log entries will be permanently removed.
          </WarningSubtext>
        </Modal>
      </Container>
    </MainLayout>
  );
};

export default SystemLogsPage;