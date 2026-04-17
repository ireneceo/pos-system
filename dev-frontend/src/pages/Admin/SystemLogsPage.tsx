import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Container, Header, Title, ActionSection, Content } from '../../components/UI/PageComponents';
import { BaseButton } from '../../components/UI/CommonStyles';
import { StatsGrid, StatCard, StatValue, StatLabel } from '../../components/UI/StatCard';
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import { Modal, ModalButton } from '../../components/UI/Modal';
import { getActionGuide } from '../../utils/logActionGuides';
import { formatDateTime } from '../../utils/timezone';
import DateField from '../../components/Common/DateField';

import { getAuthToken } from '../../utils/auth';
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

interface HealthData {
  current: {
    server: string;
    ip: string;
    timestamp: string;
    cpu: { usage: number };
    memory: { total: number; used: number; free: number; available: number; usagePercent: number };
    disk: { total: string; used: string; available: string; usagePercent: number };
    pm2: Array<{ name: string; status: string; cpu: number; memory: number; uptime: number; restarts: number }>;
    services: { nginx: string; mysql: string };
    serverUptime: string;
    securityUpdates: number;
  } | null;
  lastCheck: string | null;
  lastLevel: string | null;
  trend: Array<{ timestamp: string; level: string; cpu: number; memory: number; disk: number }>;
  alertCount: number;
}

type ActiveTab = 'logs' | 'health';

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
    background: #10B981;
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
  gap: 8px;
  margin-bottom: 4px;
  flex-wrap: wrap;
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
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
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

const ActionGuidePanel = styled.div`
  background: #F0F9FF;
  border: 1px solid #BAE6FD;
  border-radius: 8px;
  padding: 14px 16px;
  margin-top: 10px;
`;

const GuideTitle = styled.div`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  color: #0369A1;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`;

const GuideWhatHappened = styled.div`
  font-size: 13px;
  color: #1E3A5F;
  margin-bottom: 10px;
  line-height: 1.5;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`;

const GuideStepList = styled.ol`
  margin: 0;
  padding-left: 20px;
  font-size: 13px;
  color: #1E3A5F;
  line-height: 1.7;
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;

  li {
    margin-bottom: 2px;
  }
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

const TabBar = styled.div`
  display: flex;
  gap: 0;
  margin-bottom: 24px;
  border-bottom: 2px solid #E6EBF1;
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  background: none;
  color: ${props => props.active ? '#635BFF' : '#6B7280'};
  border-bottom: 2px solid ${props => props.active ? '#635BFF' : 'transparent'};
  margin-bottom: -2px;
  transition: all 0.2s;

  &:hover {
    color: ${props => props.active ? '#635BFF' : '#374151'};
  }
`;

const HealthGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const HealthCard = styled.div<{ status: 'ok' | 'warning' | 'critical' | 'unknown' }>`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid ${props => {
    switch(props.status) {
      case 'ok': return '#D1FAE5';
      case 'warning': return '#FDE68A';
      case 'critical': return '#FCA5A5';
      default: return '#E6EBF1';
    }
  }};
  background: ${props => {
    switch(props.status) {
      case 'ok': return '#F0FDF4';
      case 'warning': return '#FFFBEB';
      case 'critical': return '#FEF2F2';
      default: return '#F8FAFC';
    }
  }};
`;

const HealthCardTitle = styled.div`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  color: #6B7280;
  margin-bottom: 8px;
`;

const HealthCardValue = styled.div<{ status: 'ok' | 'warning' | 'critical' | 'unknown' }>`
  font-size: 28px;
  font-weight: 700;
  color: ${props => {
    switch(props.status) {
      case 'ok': return '#059669';
      case 'warning': return '#D97706';
      case 'critical': return '#DC2626';
      default: return '#6B7280';
    }
  }};
`;

const HealthCardSub = styled.div`
  font-size: 13px;
  color: #6B7280;
  margin-top: 4px;
`;

const HealthSection = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  padding: 20px 24px;
  margin-bottom: 16px;
`;

const HealthSectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 16px 0;
`;

const ServiceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`;

const ServiceName = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`;

const ServiceBadge = styled.span<{ status: 'online' | 'offline' | 'unknown' }>`
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  background: ${props => {
    switch(props.status) {
      case 'online': return '#D1FAE5';
      case 'offline': return '#FEE2E2';
      default: return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'online': return '#059669';
      case 'offline': return '#DC2626';
      default: return '#6B7280';
    }
  }};
`;

const TrendRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px 0;
  font-size: 13px;
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
`;

const TrendTime = styled.span`
  color: #6B7280;
  min-width: 50px;
`;

const TrendBar = styled.div<{ percent: number; color: string }>`
  height: 16px;
  width: ${props => Math.max(props.percent, 1)}%;
  max-width: 100%;
  background: ${props => props.color};
  border-radius: 3px;
  transition: width 0.3s;
`;

const TrendBarContainer = styled.div`
  flex: 1;
  background: #F3F4F6;
  border-radius: 3px;
  height: 16px;
`;

const TrendValue = styled.span`
  color: #374151;
  font-weight: 500;
  min-width: 45px;
  text-align: right;
`;

const HealthHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const HealthLastCheck = styled.div`
  font-size: 13px;
  color: #6B7280;
`;

const CheckNowBtn = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid #635BFF;
  background: #635BFF;
  color: white;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #5A51E6;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const NoDataMessage = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;
  font-size: 16px;
`;

const API_BASE = process.env.REACT_APP_API_URL || '';

const transformLog = (log: any): SystemLog => ({
  id: String(log.id),
  timestamp: log.timestamp,
  level: log.level,
  category: log.category,
  service: log.service,
  message: log.message,
  details: log.details,
  userId: log.user_id ? String(log.user_id) : undefined,
  userName: log.user_name || undefined,
  ipAddress: log.ip_address || undefined,
  userAgent: log.user_agent || undefined,
  requestId: log.request_id || undefined,
  duration: log.duration || undefined,
  statusCode: log.status_code || undefined
});

const SystemLogsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('logs');
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
  const [stats, setStats] = useState({ total24h: 0, errors: 0, warnings: 0, recent1h: 0 });
  const [, setLoading] = useState(false);
  const liveIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const logsListRef = useRef<HTMLDivElement | null>(null);

  // Server Health state
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [healthLoading, setHealthLoading] = useState(false);
  const [checkNowLoading, setCheckNowLoading] = useState(false);
  const [checkNowCooldown, setCheckNowCooldown] = useState(0);

  const token = getAuthToken();
  const headers = { Authorization: `Bearer ${token}` };

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: '200' });
      if (filterLevel !== 'all') params.set('level', filterLevel);
      if (filterCategory !== 'all') params.set('category', filterCategory);
      if (filterService !== 'all') params.set('service', filterService);
      if (filterDate) params.set('start_date', filterDate);
      if (searchTerm) params.set('search', searchTerm);

      const [logsRes, statsRes] = await Promise.all([
        axios.get(`${API_BASE}/api/system-logs?${params}`, { headers }),
        axios.get(`${API_BASE}/api/system-logs/stats`, { headers })
      ]);

      if (logsRes.data.success) {
        setLogs(logsRes.data.data.logs.map(transformLog));
      }
      if (statsRes.data.success) {
        setStats(statsRes.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch logs:', error);
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterLevel, filterCategory, filterService, filterDate, searchTerm]);

  const fetchHealth = useCallback(async () => {
    setHealthLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/api/system-logs/server-health`, { headers });
      if (res.data.success) {
        setHealthData(res.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch server health:', error);
    } finally {
      setHealthLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCheckNow = async () => {
    setCheckNowLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/api/system-logs/server-health/check-now`, {}, { headers });
      if (res.data.success) {
        await fetchHealth();
      }
    } catch (error: any) {
      if (error.response?.status === 429) {
        console.warn('Rate limited:', error.response.data.message);
      } else {
        console.error('Check now failed:', error);
      }
    } finally {
      setCheckNowLoading(false);
      setCheckNowCooldown(60);
    }
  };

  // Cooldown timer for Check Now button
  useEffect(() => {
    if (checkNowCooldown <= 0) return;
    const timer = setTimeout(() => setCheckNowCooldown(prev => prev - 1), 1000);
  // useTranslation moved to component level

  return () => clearTimeout(timer);
  }, [checkNowCooldown]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  useEffect(() => {
    if (activeTab === 'health') {
      fetchHealth();
    }
  }, [activeTab, fetchHealth]);

  // Live mode polling
  useEffect(() => {
    if (liveMode) {
      liveIntervalRef.current = setInterval(fetchLogs, 5000);
    } else if (liveIntervalRef.current) {
      clearInterval(liveIntervalRef.current);
      liveIntervalRef.current = null;
    }
    return () => {
      if (liveIntervalRef.current) clearInterval(liveIntervalRef.current);
    };
  }, [liveMode, fetchLogs]);

  // Auto-scroll to bottom when new logs arrive
  useEffect(() => {
    if (autoScroll && logsListRef.current) {
      logsListRef.current.scrollTop = logsListRef.current.scrollHeight;
    }
  }, [logs, autoScroll]);

  const filteredLogs = logs;

  const totalLogs = stats.total24h;
  const errorLogs = stats.errors;
  const warningLogs = stats.warnings;
  const recentLogs = stats.recent1h;

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
    return formatDateTime(timestamp, null, {
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
    fetchLogs();
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

  const confirmClearLogs = async () => {
    try {
      await axios.delete(`${API_BASE}/api/system-logs`, { headers });
      setShowClearModal(false);
      fetchLogs();
    } catch (error) {
      console.error('Failed to clear logs:', error);
      setShowClearModal(false);
    }
  };

  const getResourceStatus = (percent: number): 'ok' | 'warning' | 'critical' => {
    if (percent >= 90) return 'critical';
    if (percent >= 80) return 'warning';
    return 'ok';
  };

  const getServiceStatus = (status: string): 'online' | 'offline' | 'unknown' => {
    if (status === 'active' || status === 'online') return 'online';
    if (status === 'inactive' || status === 'stopped' || status === 'errored') return 'offline';
    return 'unknown';
  };

  const getBarColor = (percent: number): string => {
    if (percent >= 90) return '#DC2626';
    if (percent >= 80) return '#D97706';
    if (percent >= 60) return '#2563EB';
    return '#059669';
  };

  const formatUptime = (uptimeStr: string): string => {
    if (!uptimeStr) return 'N/A';
    try {
      const upSince = new Date(uptimeStr);
      const now = new Date();
      const diffMs = now.getTime() - upSince.getTime();
      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      return `${days}d ${hours}h`;
    } catch {
      return uptimeStr;
    }
  };

  const renderHealthTab = () => {
    if (healthLoading && !healthData) {
      return <NoDataMessage>{'Loading server health data...'}</NoDataMessage>;
    }

    if (!healthData || !healthData.current) {
      return (
        <NoDataMessage>
          No health data available yet.<br />
          Health checks run every 30 minutes, or click "Check Now" to trigger one.
          <div style={{ marginTop: 16 }}>
            <CheckNowBtn onClick={handleCheckNow} disabled={checkNowLoading}>
              {checkNowLoading ? 'Checking...' : 'Check Now'}
            </CheckNowBtn>
          </div>
        </NoDataMessage>
      );
    }

    const { current, lastCheck, lastLevel, trend, alertCount } = healthData;
    const cpuStatus = getResourceStatus(current.cpu.usage);
    const memStatus = getResourceStatus(current.memory.usagePercent);
    const diskStatus = getResourceStatus(current.disk.usagePercent);
    const overallStatus = lastLevel === 'critical' ? 'critical' : lastLevel === 'error' || lastLevel === 'warn' || lastLevel === 'warning' ? 'warning' : 'ok';

    return (
      <>
        <HealthHeaderRow>
          <HealthLastCheck>
            {lastCheck ? (
              <>Last check: {formatDateTime(lastCheck, null, { hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })} &middot; Status: <span style={{ fontWeight: 600, color: overallStatus === 'ok' ? '#059669' : overallStatus === 'warning' ? '#D97706' : '#DC2626' }}>{overallStatus === 'ok' ? 'Healthy' : overallStatus === 'warning' ? 'Warning' : 'Critical'}</span> &middot; Alerts (24h): {alertCount}</>
            ) : 'No health data yet'}
          </HealthLastCheck>
          <CheckNowBtn onClick={handleCheckNow} disabled={checkNowLoading || checkNowCooldown > 0}>
            {checkNowLoading ? 'Checking...' : checkNowCooldown > 0 ? `Wait ${checkNowCooldown}s` : 'Check Now'}
          </CheckNowBtn>
        </HealthHeaderRow>

        <HealthGrid>
          <HealthCard status={cpuStatus}>
            <HealthCardTitle>{'CPU Usage'}</HealthCardTitle>
            <HealthCardValue status={cpuStatus}>{current.cpu.usage}%</HealthCardValue>
            <HealthCardSub>{'Production Server'}</HealthCardSub>
          </HealthCard>
          <HealthCard status={memStatus}>
            <HealthCardTitle>{'Memory Usage'}</HealthCardTitle>
            <HealthCardValue status={memStatus}>{current.memory.usagePercent}%</HealthCardValue>
            <HealthCardSub>{current.memory.used}MB / {current.memory.total}MB</HealthCardSub>
          </HealthCard>
          <HealthCard status={diskStatus}>
            <HealthCardTitle>{'Disk Usage'}</HealthCardTitle>
            <HealthCardValue status={diskStatus}>{current.disk.usagePercent}%</HealthCardValue>
            <HealthCardSub>{current.disk.used} / {current.disk.total}</HealthCardSub>
          </HealthCard>
        </HealthGrid>

        {/* Services Status */}
        <HealthSection>
          <HealthSectionTitle>{'Services'}</HealthSectionTitle>
          <ServiceRow>
            <ServiceName>{'Nginx (Web Server)'}</ServiceName>
            <ServiceBadge status={getServiceStatus(current.services.nginx)}>
              {current.services.nginx === 'active' ? 'Active' : current.services.nginx}
            </ServiceBadge>
          </ServiceRow>
          <ServiceRow>
            <ServiceName>{'MySQL (Database)'}</ServiceName>
            <ServiceBadge status={getServiceStatus(current.services.mysql)}>
              {current.services.mysql === 'active' ? 'Active' : current.services.mysql}
            </ServiceBadge>
          </ServiceRow>
          {(current.pm2 || []).map((proc, idx) => (
            <ServiceRow key={idx}>
              <ServiceName>PM2: {proc.name}</ServiceName>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: '#6B7280' }}>
                  CPU: {proc.cpu}% &middot; MEM: {proc.memory}MB &middot; Restarts: {proc.restarts}
                </span>
                <ServiceBadge status={getServiceStatus(proc.status)}>
                  {proc.status === 'online' ? 'Online' : proc.status}
                </ServiceBadge>
              </div>
            </ServiceRow>
          ))}
        </HealthSection>

        {/* Server Info */}
        <HealthSection>
          <HealthSectionTitle>{'Server Info'}</HealthSectionTitle>
          <ServiceRow>
            <ServiceName>{'Server'}</ServiceName>
            <span style={{ fontSize: 14, color: '#374151' }}>{current.ip} (production)</span>
          </ServiceRow>
          <ServiceRow>
            <ServiceName>{'Uptime'}</ServiceName>
            <span style={{ fontSize: 14, color: '#374151' }}>{formatUptime(current.serverUptime)}</span>
          </ServiceRow>
          <ServiceRow>
            <ServiceName>{'Pending Security Updates'}</ServiceName>
            <span style={{ fontSize: 14, fontWeight: 600, color: current.securityUpdates > 10 ? '#D97706' : '#374151' }}>
              {current.securityUpdates}
            </span>
          </ServiceRow>
        </HealthSection>

        {/* 24h Trend */}
        {trend.length > 0 && (
          <HealthSection>
            <HealthSectionTitle>24h Resource Trend ({trend.length} data points)</HealthSectionTitle>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>{'CPU'}</div>
              {trend.filter((_, i) => i % Math.max(1, Math.floor(trend.length / 12)) === 0 || i === trend.length - 1).map((point, idx) => (
                <TrendRow key={`cpu-${idx}`}>
                  <TrendTime>{formatDateTime(point.timestamp, null, { hour: '2-digit', minute: '2-digit', hour12: false, year: undefined, month: undefined, day: undefined })}</TrendTime>
                  <TrendBarContainer>
                    <TrendBar percent={point.cpu} color={getBarColor(point.cpu)} />
                  </TrendBarContainer>
                  <TrendValue>{point.cpu}%</TrendValue>
                </TrendRow>
              ))}
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>{'Memory'}</div>
              {trend.filter((_, i) => i % Math.max(1, Math.floor(trend.length / 12)) === 0 || i === trend.length - 1).map((point, idx) => (
                <TrendRow key={`mem-${idx}`}>
                  <TrendTime>{formatDateTime(point.timestamp, null, { hour: '2-digit', minute: '2-digit', hour12: false, year: undefined, month: undefined, day: undefined })}</TrendTime>
                  <TrendBarContainer>
                    <TrendBar percent={point.memory} color={getBarColor(point.memory)} />
                  </TrendBarContainer>
                  <TrendValue>{point.memory}%</TrendValue>
                </TrendRow>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>{'Disk'}</div>
              {trend.filter((_, i) => i % Math.max(1, Math.floor(trend.length / 12)) === 0 || i === trend.length - 1).map((point, idx) => (
                <TrendRow key={`disk-${idx}`}>
                  <TrendTime>{formatDateTime(point.timestamp, null, { hour: '2-digit', minute: '2-digit', hour12: false, year: undefined, month: undefined, day: undefined })}</TrendTime>
                  <TrendBarContainer>
                    <TrendBar percent={point.disk} color={getBarColor(point.disk)} />
                  </TrendBarContainer>
                  <TrendValue>{point.disk}%</TrendValue>
                </TrendRow>
              ))}
            </div>
          </HealthSection>
        )}
      </>
    );
  };

  return (
    <>
      <Container>
        <Header>
          <Title>{'System Logs'}</Title>
          <ActionSection>
            {activeTab === 'logs' && (
              <>
                <BaseButton variant="secondary" onClick={handleExportLogs}>{'Export Logs'}</BaseButton>
                <BaseButton variant="danger" onClick={handleClearLogs}>{'Clear Logs'}</BaseButton>
              </>
            )}
          </ActionSection>
        </Header>

        <Content>
        <TabBar>
          <Tab active={activeTab === 'logs'} onClick={() => setActiveTab('logs')}>
            Logs
          </Tab>
          <Tab active={activeTab === 'health'} onClick={() => setActiveTab('health')}>
            Server Health
          </Tab>
        </TabBar>

        {activeTab === 'health' ? renderHealthTab() : (
        <>
        <StatsGrid>
          <StatCard color="#059669">
            <StatValue>{totalLogs}</StatValue>
            <StatLabel>{'Total Logs (24h)'}</StatLabel>
          </StatCard>
          <StatCard color="#DC2626">
            <StatValue>{errorLogs}</StatValue>
            <StatLabel>{'Errors & Critical'}</StatLabel>
          </StatCard>
          <StatCard color="#D97706">
            <StatValue>{warningLogs}</StatValue>
            <StatLabel>{'Warnings'}</StatLabel>
          </StatCard>
          <StatCard color="#2563EB">
            <StatValue>{recentLogs}</StatValue>
            <StatLabel>{'Recent (1h)'}</StatLabel>
          </StatCard>
        </StatsGrid>

        <FilterBar>
          <FilterSelect value={filterLevel} onChange={(e) => setFilterLevel(e.target.value)}>
            <option value="all">{'All Levels'}</option>
            <option value="critical">{'Critical'}</option>
            <option value="error">{'Error'}</option>
            <option value="warning">{'Warning'}</option>
            <option value="info">{'Info'}</option>
            <option value="debug">{'Debug'}</option>
          </FilterSelect>
          <FilterSelect value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="all">{'All Categories'}</option>
            <option value="system">{'System'}</option>
            <option value="database">{'Database'}</option>
            <option value="auth">{'Authentication'}</option>
            <option value="payment">{'Payment'}</option>
            <option value="api">{'API'}</option>
            <option value="security">{'Security'}</option>
            <option value="backup">{'Backup'}</option>
          </FilterSelect>
          <FilterSelect value={filterService} onChange={(e) => setFilterService(e.target.value)}>
            <option value="all">{'All Services'}</option>
            <option value="server-health">{'Server Health'}</option>
            <option value="invoice-scheduler">{'Invoice Scheduler'}</option>
            <option value="subscription-scheduler">{'Subscription Scheduler'}</option>
            <option value="stripe">{'Stripe'}</option>
            <option value="stripe-webhook">{'Stripe Webhook'}</option>
            <option value="order-service">{'Order Service'}</option>
            <option value="auth-service">{'Auth Service'}</option>
            <option value="pos-api">{'POS API'}</option>
            <option value="payment-service">{'Payment Service'}</option>
            <option value="backup-service">{'Backup Service'}</option>
            <option value="kitchen-display-service">{'Kitchen Display'}</option>
          </FilterSelect>
          <div style={{ minWidth: '180px' }}>
            <DateField
              value={filterDate}
              onChange={(v) => setFilterDate(v)}
            />
          </div>
          <SearchInput
            placeholder="Search logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
          <LogsList ref={logsListRef}>
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
                {expandedLogs.has(log.id) && ['warning', 'error', 'critical'].includes(log.level) && (() => {
                  const guide = getActionGuide(log.service, log.level);
                  if (!guide) return null;
                  return (
                    <ActionGuidePanel>
                      <GuideTitle>{'Action Guide'}</GuideTitle>
                      <GuideWhatHappened>{guide.whatHappened}</GuideWhatHappened>
                      <GuideTitle style={{ fontSize: '11px', marginBottom: '6px' }}>{'What to do'}</GuideTitle>
                      <GuideStepList>
                        {guide.whatToDo.map((step, i) => <li key={i}>{step}</li>)}
                      </GuideStepList>
                    </ActionGuidePanel>
                  );
                })()}
              </LogItem>
            ))}
            {filteredLogs.length === 0 && (
              <div style={{ padding: '40px', textAlign: 'center', color: '#6B7280' }}>
                No logs match the current filters
              </div>
            )}
          </LogsList>
        </LogsContainer>
        </>
        )}
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
                <ExportTitle>{'CSV Format'}</ExportTitle>
                <ExportDesc>{'Comma-separated values for spreadsheet analysis'}</ExportDesc>
              </ExportInfo>
            </ExportOption>
            <ExportOption onClick={() => confirmExport('json')}>
              <ExportIcon>📄</ExportIcon>
              <ExportInfo>
                <ExportTitle>{'JSON Format'}</ExportTitle>
                <ExportDesc>{'Structured data with full details'}</ExportDesc>
              </ExportInfo>
            </ExportOption>
            <ExportOption onClick={() => confirmExport('txt')}>
              <ExportIcon>📝</ExportIcon>
              <ExportInfo>
                <ExportTitle>{'Text Format'}</ExportTitle>
                <ExportDesc>{'Human-readable log format'}</ExportDesc>
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
    </>
  );
};

export default SystemLogsPage;