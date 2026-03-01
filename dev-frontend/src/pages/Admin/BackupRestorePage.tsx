import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, Header, Title, ActionSection, Content } from '../../components/UI/PageComponents';
import { BaseButton } from '../../components/UI/CommonStyles';
import { StandardSelect } from '../../components/UI/SelectComponents';
import { StatsGrid, StatCard, StatValue, StatLabel } from '../../components/UI/StatCard';
import { Tabs, Tab } from '../../components/Common/TabComponents';
import { useTabParam } from '../../hooks/useTabParam';
import { Modal, ModalButton } from '../../components/UI/Modal';

interface BackupRecord {
  id: string;
  name: string;
  type: 'full' | 'incremental' | 'differential';
  size: number;
  createdAt: string;
  status: 'completed' | 'in-progress' | 'failed' | 'scheduled';
  duration: number;
  location: string;
  description?: string;
  tables: string[];
  compressed: boolean;
  encrypted: boolean;
}

interface RestoreOperation {
  id: string;
  backupId: string;
  backupName: string;
  startedAt: string;
  completedAt?: string;
  status: 'in-progress' | 'completed' | 'failed';
  progress: number;
  restoredTables: string[];
  totalTables: number;
  errorMessage?: string;
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
  justify-content: space-between;
  align-items: center;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`;

const SectionActions = styled.div`
  display: flex;
  gap: 8px;
`;

const BackupGrid = styled.div`
  display: grid;
  gap: 0;
`;

const BackupCard = styled.div<{ status?: string }>`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 20px;
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  transition: all 0.2s;

  ${props => props.status === 'failed' && `
    background: #FEF2F2;
  `}

  ${props => props.status === 'in-progress' && `
    background: #EFF6FF;
  `}

  &:hover {
    background: #FAFBFC;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const BackupInfo = styled.div``;

const BackupName = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`;

const BackupMeta = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 16px;
  margin-bottom: 12px;
`;

const MetaItem = styled.div``;

const MetaLabel = styled.div`
  font-size: 11px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 2px;
`;

const MetaValue = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`;

const BackupTags = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 8px;
`;

const Tag = styled.span<{ variant?: string }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${props => {
    switch(props.variant) {
      case 'type': return '#DBEAFE';
      case 'encrypted': return '#ECFDF5';
      case 'compressed': return '#FEF3C7';
      default: return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch(props.variant) {
      case 'type': return '#1E40AF';
      case 'encrypted': return '#059669';
      case 'compressed': return '#D97706';
      default: return '#6B7280';
    }
  }};
`;

const BackupActions = styled.div`
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
      case 'completed': return '#ECFDF5';
      case 'in-progress': return '#DBEAFE';
      case 'failed': return '#FEE2E2';
      case 'scheduled': return '#FEF3C7';
      default: return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'completed': return '#059669';
      case 'in-progress': return '#1E40AF';
      case 'failed': return '#DC2626';
      case 'scheduled': return '#D97706';
      default: return '#6B7280';
    }
  }};
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'danger' }>`
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

const RestoreProgress = styled.div`
  padding: 0;
`;

const ProgressItem = styled.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;

  &:last-child {
    border-bottom: none;
  }
`;

const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const ProgressInfo = styled.div``;

const ProgressName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`;

const ProgressMeta = styled.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #F3F4F6;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
`;

const ProgressFill = styled.div<{ percentage: number }>`
  height: 100%;
  width: ${props => props.percentage}%;
  background: #635BFF;
  transition: width 0.3s ease;
`;

const ProgressText = styled.div`
  font-size: 12px;
  color: #6B7280;
  display: flex;
  justify-content: space-between;
`;

// Modal now imported from common/Modal

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

const FormTextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 80px;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const FormHelp = styled.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 4px;
  line-height: 1.4;
`;

const BackupList = styled.div`
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  overflow: hidden;
`;

const BackupListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #F3F4F6;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #F8FAFC;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const BackupListInfo = styled.div`
  flex: 1;
`;

const BackupListName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 4px;
`;

const BackupListMeta = styled.div`
  font-size: 12px;
  color: #6B7280;
`;

const BackupListSize = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #635BFF;
`;

const BackupRestorePage: React.FC = () => {
  const [activeTab, handleTabChange] = useTabParam('backups');
  const [backups, setBackups] = useState<BackupRecord[]>([]);
  const [restoreOperations, setRestoreOperations] = useState<RestoreOperation[]>([]);
  const [showCreateBackupModal, setShowCreateBackupModal] = useState(false);
  const [showAddScheduleModal, setShowAddScheduleModal] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [, ] = useState<BackupRecord | null>(null);
  const [backupType, setBackupType] = useState<'full' | 'incremental' | 'differential'>('full');
  const [backupDescription, setBackupDescription] = useState('');

  useEffect(() => {
    // TODO: Implement API call to fetch backups and restore operations
    setBackups([]);
    setRestoreOperations([]);
  }, []);

  const completedBackups = backups.filter(b => b.status === 'completed').length;
  const failedBackups = backups.filter(b => b.status === 'failed').length;
  const totalBackupSize = backups.filter(b => b.status === 'completed').reduce((sum, b) => sum + b.size, 0);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-MY');
  };

  const handleDownloadBackup = () => {
    const completedBackups = backups.filter(b => b.status === 'completed');
    if (completedBackups.length === 0) {
      alert('No completed backups available for download.');
      return;
    }
    setShowDownloadModal(true);
  };

  const handleCreateBackup = () => {
    setShowCreateBackupModal(true);
  };

  const handleConfirmCreateBackup = () => {
    const newBackup: BackupRecord = {
      id: `backup-${Date.now()}`,
      name: `${backupType.charAt(0).toUpperCase() + backupType.slice(1)} Backup - ${new Date().toLocaleDateString()}`,
      type: backupType,
      size: 0,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
      status: 'in-progress',
      duration: 0,
      location: `s3://orderhere-backups/${backupType}-${new Date().toISOString().split('T')[0]}.sql.gz`,
      description: backupDescription || `${backupType} backup created manually`,
      tables: backupType === 'full' 
        ? ['users', 'restaurants', 'orders', 'menu_items', 'payments', 'subscriptions', 'invoices']
        : ['orders', 'payments', 'order_items'],
      compressed: true,
      encrypted: true
    };

    setBackups([newBackup, ...backups]);
    setShowCreateBackupModal(false);
    setBackupDescription('');

    // Simulate backup completion
    setTimeout(() => {
      setBackups(prev => prev.map(b => 
        b.id === newBackup.id 
          ? { ...b, status: 'completed', duration: Math.floor(Math.random() * 1800) + 300, size: Math.floor(Math.random() * 1000000000) + 100000000 }
          : b
      ));
      alert('Backup completed successfully!');
    }, 3000);
  };

  const handleCleanupOldBackups = () => {
    const oldBackups = backups.filter(b => {
      const backupDate = new Date(b.createdAt);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return backupDate < thirtyDaysAgo && b.status === 'completed';
    });

    if (oldBackups.length === 0) {
      alert('No old backups found to clean up.');
      return;
    }

    if (confirm(`This will delete ${oldBackups.length} backups older than 30 days. Continue?`)) {
      const remainingBackups = backups.filter(b => !oldBackups.includes(b));
      setBackups(remainingBackups);
      alert(`Successfully cleaned up ${oldBackups.length} old backups.`);
    }
  };

  const handleAddSchedule = () => {
    setShowAddScheduleModal(true);
  };

  const handleDownloadSelected = (backup: BackupRecord) => {
    // Simulate file download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${backup.name.replace(/[^a-zA-Z0-9]/g, '-')}.sql.gz`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert(`Starting download of ${backup.name}...`);
    setShowDownloadModal(false);
  };

  return (
    <>
      <Container>
        <Header>
          <Title>Backup & Restore</Title>
          <ActionSection>
            <BaseButton variant="secondary" onClick={handleDownloadBackup}>Download Backup</BaseButton>
            <BaseButton variant="primary" onClick={handleCreateBackup}>Create Backup</BaseButton>
          </ActionSection>
        </Header>
        <Content>

        <StatsGrid>
          <StatCard color="#059669">
            <StatValue>{backups.length}</StatValue>
            <StatLabel>Total Backups</StatLabel>
          </StatCard>
          <StatCard color="#2563EB">
            <StatValue>{completedBackups}</StatValue>
            <StatLabel>Successful Backups</StatLabel>
          </StatCard>
          <StatCard color="#DC2626">
            <StatValue>{failedBackups}</StatValue>
            <StatLabel>Failed Backups</StatLabel>
          </StatCard>
          <StatCard color="#7C3AED">
            <StatValue>{formatBytes(totalBackupSize)}</StatValue>
            <StatLabel>Total Storage Used</StatLabel>
          </StatCard>
        </StatsGrid>

        <Tabs>
          <Tab active={activeTab === 'backups'} onClick={() => handleTabChange('backups')}>
            Backup History
          </Tab>
          <Tab active={activeTab === 'restore'} onClick={() => handleTabChange('restore')}>
            Restore Operations
          </Tab>
          <Tab active={activeTab === 'schedule'} onClick={() => handleTabChange('schedule')}>
            Backup Schedule
          </Tab>
        </Tabs>

        <ContentSection>
          {activeTab === 'backups' && (
            <>
              <SectionHeader>
                <SectionTitle>Backup History</SectionTitle>
                <SectionActions>
                  <BaseButton variant="secondary" onClick={handleCleanupOldBackups}>Cleanup Old Backups</BaseButton>
                  <BaseButton variant="primary" onClick={handleCreateBackup}>New Backup</BaseButton>
                </SectionActions>
              </SectionHeader>
              <BackupGrid>
                {backups.map(backup => (
                  <BackupCard key={backup.id} status={backup.status}>
                    <BackupInfo>
                      <BackupName>{backup.name}</BackupName>
                      <BackupMeta>
                        <MetaItem>
                          <MetaLabel>Size</MetaLabel>
                          <MetaValue>{formatBytes(backup.size)}</MetaValue>
                        </MetaItem>
                        <MetaItem>
                          <MetaLabel>Duration</MetaLabel>
                          <MetaValue>{backup.duration > 0 ? formatDuration(backup.duration) : 'N/A'}</MetaValue>
                        </MetaItem>
                        <MetaItem>
                          <MetaLabel>Created</MetaLabel>
                          <MetaValue>{formatDateTime(backup.createdAt)}</MetaValue>
                        </MetaItem>
                        <MetaItem>
                          <MetaLabel>Tables</MetaLabel>
                          <MetaValue>{backup.tables.length} tables</MetaValue>
                        </MetaItem>
                      </BackupMeta>
                      {backup.description && (
                        <div style={{ fontSize: '14px', color: '#6B7280', marginBottom: '8px' }}>
                          {backup.description}
                        </div>
                      )}
                      <BackupTags>
                        <Tag variant="type">{backup.type}</Tag>
                        {backup.encrypted && <Tag variant="encrypted">Encrypted</Tag>}
                        {backup.compressed && <Tag variant="compressed">Compressed</Tag>}
                      </BackupTags>
                    </BackupInfo>
                    <BackupActions>
                      <StatusBadge status={backup.status}>{backup.status}</StatusBadge>
                      {backup.status === 'completed' && (
                        <>
                          <ActionButton variant="primary">Restore</ActionButton>
                          <ActionButton>Download</ActionButton>
                          <ActionButton variant="danger">Delete</ActionButton>
                        </>
                      )}
                      {backup.status === 'failed' && (
                        <>
                          <ActionButton variant="primary">Retry</ActionButton>
                          <ActionButton variant="danger">Delete</ActionButton>
                        </>
                      )}
                      {backup.status === 'scheduled' && (
                        <>
                          <ActionButton>Edit Schedule</ActionButton>
                          <ActionButton variant="danger">Cancel</ActionButton>
                        </>
                      )}
                    </BackupActions>
                  </BackupCard>
                ))}
              </BackupGrid>
            </>
          )}

          {activeTab === 'restore' && (
            <>
              <SectionHeader>
                <SectionTitle>Restore Operations</SectionTitle>
              </SectionHeader>
              <RestoreProgress>
                {restoreOperations.map(restore => (
                  <ProgressItem key={restore.id}>
                    <ProgressHeader>
                      <ProgressInfo>
                        <ProgressName>Restoring: {restore.backupName}</ProgressName>
                        <ProgressMeta>
                          Started: {formatDateTime(restore.startedAt)} | 
                          {restore.completedAt && ` Completed: ${formatDateTime(restore.completedAt)}`}
                        </ProgressMeta>
                      </ProgressInfo>
                      <StatusBadge status={restore.status}>{restore.status}</StatusBadge>
                    </ProgressHeader>
                    <ProgressBar>
                      <ProgressFill percentage={restore.progress} />
                    </ProgressBar>
                    <ProgressText>
                      <span>{restore.restoredTables.length} of {restore.totalTables} tables restored</span>
                      <span>{restore.progress}%</span>
                    </ProgressText>
                    {restore.errorMessage && (
                      <div style={{ color: '#DC2626', fontSize: '12px', marginTop: '8px' }}>
                        Error: {restore.errorMessage}
                      </div>
                    )}
                  </ProgressItem>
                ))}
                {restoreOperations.length === 0 && (
                  <div style={{ textAlign: 'center', color: '#6B7280', padding: '40px' }}>
                    No restore operations in progress
                  </div>
                )}
              </RestoreProgress>
            </>
          )}

          {activeTab === 'schedule' && (
            <>
              <SectionHeader>
                <SectionTitle>Backup Schedule</SectionTitle>
                <SectionActions>
                  <BaseButton variant="primary" onClick={handleAddSchedule}>Add Schedule</BaseButton>
                </SectionActions>
              </SectionHeader>
              <div style={{ padding: '24px', textAlign: 'center', color: '#6B7280' }}>
                Backup scheduling configuration will be implemented here.
                <br />
                Features: Daily/Weekly/Monthly schedules, retention policies, notification settings.
              </div>
            </>
          )}
        </ContentSection>

        {/* Create Backup Modal */}
        <Modal
          isOpen={showCreateBackupModal}
          onClose={() => setShowCreateBackupModal(false)}
          title="Create New Backup"
          footer={
            <>
              <ModalButton variant="secondary" onClick={() => setShowCreateBackupModal(false)}>
                Cancel
              </ModalButton>
              <ModalButton variant="primary" onClick={handleConfirmCreateBackup}>
                Create Backup
              </ModalButton>
            </>
          }
        >
          <FormGroup>
            <FormLabel>Backup Type</FormLabel>
            <StandardSelect value={backupType} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setBackupType(e.target.value as any)}>
              <option value="full">Full Backup</option>
              <option value="incremental">Incremental Backup</option>
              <option value="differential">Differential Backup</option>
            </StandardSelect>
            <FormHelp>
              Full: Complete database backup. Incremental: Only changes since last backup.
              Differential: Changes since last full backup.
            </FormHelp>
          </FormGroup>
          <FormGroup>
            <FormLabel>Description (Optional)</FormLabel>
            <FormTextArea
              value={backupDescription}
              onChange={(e) => setBackupDescription(e.target.value)}
              placeholder="Enter a description for this backup..."
              rows={3}
            />
          </FormGroup>
        </Modal>

        {/* Download Backup Modal */}
        <Modal
          isOpen={showDownloadModal}
          onClose={() => setShowDownloadModal(false)}
          title="Download Backup"
          footer={
            <ModalButton variant="secondary" onClick={() => setShowDownloadModal(false)}>
              Cancel
            </ModalButton>
          }
        >
          <p style={{ marginBottom: '20px', color: '#6B7280' }}>
            Select a backup to download:
          </p>
          <BackupList>
            {backups.filter(b => b.status === 'completed').map(backup => (
              <BackupListItem key={backup.id} onClick={() => handleDownloadSelected(backup)}>
                <BackupListInfo>
                  <BackupListName>{backup.name}</BackupListName>
                  <BackupListMeta>
                    {formatBytes(backup.size)} • {formatDateTime(backup.createdAt)}
                  </BackupListMeta>
                </BackupListInfo>
                <BackupListSize>{formatBytes(backup.size)}</BackupListSize>
              </BackupListItem>
            ))}
          </BackupList>
        </Modal>

        {/* Add Schedule Modal */}
        <Modal
          isOpen={showAddScheduleModal}
          onClose={() => setShowAddScheduleModal(false)}
          title="Add Backup Schedule"
          footer={
            <>
              <ModalButton variant="secondary" onClick={() => setShowAddScheduleModal(false)}>
                Cancel
              </ModalButton>
              <ModalButton variant="primary" onClick={() => {
                alert('Backup schedule created successfully!');
                setShowAddScheduleModal(false);
              }}>
                Create Schedule
              </ModalButton>
            </>
          }
        >
          <FormGroup>
            <FormLabel>Schedule Name</FormLabel>
            <FormInput type="text" placeholder="e.g., Daily Full Backup" />
          </FormGroup>
          <FormGroup>
            <FormLabel>Backup Type</FormLabel>
            <StandardSelect>
              <option value="full">Full Backup</option>
              <option value="incremental">Incremental Backup</option>
            </StandardSelect>
          </FormGroup>
          <FormGroup>
            <FormLabel>Frequency</FormLabel>
            <StandardSelect>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </StandardSelect>
          </FormGroup>
          <FormGroup>
            <FormLabel>Time</FormLabel>
            <FormInput type="time" defaultValue="02:00" />
          </FormGroup>
          <FormGroup>
            <FormLabel>Retention Policy</FormLabel>
            <StandardSelect>
              <option value="7">Keep for 7 days</option>
              <option value="30">Keep for 30 days</option>
              <option value="90">Keep for 90 days</option>
              <option value="365">Keep for 1 year</option>
            </StandardSelect>
          </FormGroup>
        </Modal>
        </Content>
      </Container>
    </>
  );
};

export default BackupRestorePage;