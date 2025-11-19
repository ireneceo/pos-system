import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainLayout from '../../components/Layout/MainLayout';
import { Container, Header, Title, ActionSection, Content } from '../../components/UI/PageComponents';
import { BaseButton } from '../../components/UI/CommonStyles';
import { StandardSelect } from '../../components/UI/SelectComponents';
import { Modal, ModalButton } from '../../components/UI/Modal';

interface SystemConfig {
  id: string;
  category: string;
  key: string;
  displayName: string;
  value: string;
  dataType: 'string' | 'number' | 'boolean' | 'json' | 'email' | 'url';
  description: string;
  isEditable: boolean;
  requiresRestart: boolean;
  updatedAt: string;
  updatedBy: string;
}

const ConfigCategories = styled.div`
  display: grid;
  gap: 24px;
`;

const CategorySection = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`;

const CategoryHeader = styled.div`
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;
  padding: 20px 24px;
`;

const CategoryTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  text-transform: capitalize;
  margin: 0;
`;

const ConfigGrid = styled.div`
  padding: 0;
  display: grid;
  gap: 0;
`;

const ConfigItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 20px;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #E6EBF1;
  transition: all 0.2s;

  &:hover {
    background: #FAFBFC;
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 16px 20px;
  }
`;

const ConfigInfo = styled.div``;

const ConfigName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`;

const ConfigDescription = styled.div`
  font-size: 13px;
  color: #6B7280;
  line-height: 1.4;
`;

const ConfigKey = styled.div`
  font-size: 12px;
  color: #9CA3AF;
  font-family: 'Monaco', 'Menlo', monospace;
  margin-top: 4px;
`;

const ConfigValue = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ValueInput = styled.input<{ dataType: string }>`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  min-width: 200px;
  font-family: ${props => props.dataType === 'json' ? "'Monaco', 'Menlo', monospace" : 'inherit'};

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:disabled {
    background: #F3F4F6;
    cursor: not-allowed;
  }
`;

const ValueDisplay = styled.div`
  padding: 8px 12px;
  background: #F8FAFC;
  border-radius: 6px;
  font-size: 14px;
  color: #6B7280;
  min-width: 200px;
`;

const ConfigActions = styled.div`
  display: flex;
  gap: 8px;

  @media (max-width: 1024px) {
    justify-content: flex-start;
  }
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  padding: 6px 12px;
  border-radius: 4px;
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

    &:disabled {
      background: #CBD5E1;
      border-color: #CBD5E1;
      cursor: not-allowed;
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

const RequiresBadge = styled.span`
  background: #FEF3C7;
  color: #D97706;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  margin-left: 8px;
`;

const FileInputContainer = styled.div`
  position: relative;
  margin-bottom: 16px;
`;

const FileInput = styled.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`;

const FileInputLabel = styled.label`
  display: block;
  padding: 12px 16px;
  border: 2px dashed #CBD5E1;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  color: #6B7280;
  background: #F8FAFC;

  &:hover {
    border-color: #635BFF;
    background: #F0F0FF;
    color: #635BFF;
  }
`;

const FileInfo = styled.div`
  font-size: 14px;
  color: #059669;
  background: #ECFDF5;
  padding: 8px 12px;
  border-radius: 6px;
  border-left: 3px solid #10B981;
`;

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

const SystemConfigPage: React.FC = () => {
  const [configs, setConfigs] = useState<SystemConfig[]>([]);
  const [tempValues, setTempValues] = useState<{ [key: string]: string }>({});
  const [changedConfigs, setChangedConfigs] = useState<Set<string>>(new Set());
  const [showImportModal, setShowImportModal] = useState(false);
  const [showRestartModal, setShowRestartModal] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);

  useEffect(() => {
    const sampleConfigs: SystemConfig[] = [
      {
        id: 'config-001',
        category: 'general',
        key: 'app.name',
        displayName: 'Application Name',
        value: 'Purple Here POS',
        dataType: 'string',
        description: 'The display name of the application shown to users',
        isEditable: true,
        requiresRestart: false,
        updatedAt: '2025-01-15 10:30:00',
        updatedBy: 'System Admin'
      },
      {
        id: 'config-002',
        category: 'general',
        key: 'app.version',
        displayName: 'Application Version',
        value: '2.1.4',
        dataType: 'string',
        description: 'Current version of the application',
        isEditable: false,
        requiresRestart: false,
        updatedAt: '2025-01-20 14:22:00',
        updatedBy: 'Auto Deploy'
      },
      {
        id: 'config-003',
        category: 'general',
        key: 'system.maintenance_mode',
        displayName: 'Maintenance Mode',
        value: 'false',
        dataType: 'boolean',
        description: 'Enable maintenance mode to prevent user access during updates',
        isEditable: true,
        requiresRestart: false,
        updatedAt: '2025-01-18 09:15:00',
        updatedBy: 'System Admin'
      },
      {
        id: 'config-004',
        category: 'database',
        key: 'db.connection_pool_size',
        displayName: 'Connection Pool Size',
        value: '20',
        dataType: 'number',
        description: 'Maximum number of database connections in the pool',
        isEditable: true,
        requiresRestart: true,
        updatedAt: '2025-01-10 16:45:00',
        updatedBy: 'DevOps Team'
      },
      {
        id: 'config-005',
        category: 'database',
        key: 'db.query_timeout',
        displayName: 'Query Timeout (seconds)',
        value: '30',
        dataType: 'number',
        description: 'Maximum time allowed for database queries to complete',
        isEditable: true,
        requiresRestart: true,
        updatedAt: '2025-01-12 11:20:00',
        updatedBy: 'Database Admin'
      },
      {
        id: 'config-006',
        category: 'database',
        key: 'db.backup_retention_days',
        displayName: 'Backup Retention (days)',
        value: '30',
        dataType: 'number',
        description: 'Number of days to keep database backups',
        isEditable: true,
        requiresRestart: false,
        updatedAt: '2025-01-08 13:30:00',
        updatedBy: 'Backup System'
      },
      {
        id: 'config-007',
        category: 'email',
        key: 'email.smtp_host',
        displayName: 'SMTP Host',
        value: 'smtp.gmail.com',
        dataType: 'string',
        description: 'SMTP server hostname for sending emails',
        isEditable: true,
        requiresRestart: false,
        updatedAt: '2025-01-05 08:45:00',
        updatedBy: 'System Admin'
      },
      {
        id: 'config-008',
        category: 'email',
        key: 'email.from_address',
        displayName: 'From Email Address',
        value: 'noreply@orderhere.com',
        dataType: 'email',
        description: 'Default sender email address for system notifications',
        isEditable: true,
        requiresRestart: false,
        updatedAt: '2025-01-05 08:47:00',
        updatedBy: 'System Admin'
      },
      {
        id: 'config-009',
        category: 'security',
        key: 'auth.session_timeout',
        displayName: 'Session Timeout (minutes)',
        value: '480',
        dataType: 'number',
        description: 'User session timeout in minutes',
        isEditable: true,
        requiresRestart: false,
        updatedAt: '2025-01-14 15:20:00',
        updatedBy: 'Security Team'
      },
      {
        id: 'config-010',
        category: 'security',
        key: 'auth.max_login_attempts',
        displayName: 'Max Login Attempts',
        value: '5',
        dataType: 'number',
        description: 'Maximum failed login attempts before account lockout',
        isEditable: true,
        requiresRestart: false,
        updatedAt: '2025-01-16 12:10:00',
        updatedBy: 'Security Team'
      },
      {
        id: 'config-011',
        category: 'payment',
        key: 'payment.stripe_webhook_url',
        displayName: 'Stripe Webhook URL',
        value: 'https://api.orderhere.com/webhooks/stripe',
        dataType: 'url',
        description: 'Stripe webhook endpoint URL for payment processing',
        isEditable: true,
        requiresRestart: false,
        updatedAt: '2025-01-19 10:15:00',
        updatedBy: 'Payment Team'
      },
      {
        id: 'config-012',
        category: 'payment',
        key: 'payment.currency',
        displayName: 'Default Currency',
        value: 'MYR',
        dataType: 'string',
        description: 'Default currency for all transactions',
        isEditable: true,
        requiresRestart: false,
        updatedAt: '2025-01-02 14:30:00',
        updatedBy: 'Finance Team'
      }
    ];

    setConfigs(sampleConfigs);
  }, []);

  const groupedConfigs = configs.reduce((groups, config) => {
    const category = config.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(config);
    return groups;
  }, {} as { [key: string]: SystemConfig[] });

  const handleValueChange = (configId: string, newValue: string) => {
    const config = configs.find(c => c.id === configId);
    if (config && config.value !== newValue) {
      setTempValues({ ...tempValues, [configId]: newValue });
      setChangedConfigs(prev => new Set(prev).add(configId));
    } else {
      const newTempValues = { ...tempValues };
      delete newTempValues[configId];
      setTempValues(newTempValues);
      setChangedConfigs(prev => {
        const newSet = new Set(prev);
        newSet.delete(configId);
        return newSet;
      });
    }
  };

  const handleSave = (configId: string) => {
    const newValue = tempValues[configId];
    if (newValue !== undefined) {
      setConfigs(configs.map(config =>
        config.id === configId
          ? { ...config, value: newValue, updatedAt: new Date().toISOString().replace('T', ' ').slice(0, 19), updatedBy: 'System Admin' }
          : config
      ));
      const newTempValues = { ...tempValues };
      delete newTempValues[configId];
      setTempValues(newTempValues);
      setChangedConfigs(prev => {
        const newSet = new Set(prev);
        newSet.delete(configId);
        return newSet;
      });
    }
  };

  const handleReset = (configId: string) => {
    const newTempValues = { ...tempValues };
    delete newTempValues[configId];
    setTempValues(newTempValues);
    setChangedConfigs(prev => {
      const newSet = new Set(prev);
      newSet.delete(configId);
      return newSet;
    });
  };

  const handleExportConfig = () => {
    const configData = {
      timestamp: new Date().toISOString(),
      version: "2.1.4",
      configs: configs.reduce((acc, config) => {
        acc[config.key] = {
          value: config.value,
          dataType: config.dataType,
          category: config.category
        };
        return acc;
      }, {} as any)
    };

    const dataStr = JSON.stringify(configData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `system-config-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImportConfig = () => {
    setShowImportModal(true);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImportFile(file);
    }
  };

  const handleConfirmImport = () => {
    if (!importFile) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const configData = JSON.parse(e.target?.result as string);
        if (configData.configs) {
          const updatedConfigs = configs.map(config => {
            const importedConfig = configData.configs[config.key];
            if (importedConfig && config.isEditable) {
              return {
                ...config,
                value: importedConfig.value,
                updatedAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
                updatedBy: 'Config Import'
              };
            }
            return config;
          });
          setConfigs(updatedConfigs);
          alert('Configuration imported successfully!');
        }
      } catch (error) {
        alert('Error parsing configuration file. Please check the file format.');
      }
    };
    reader.readAsText(importFile);
    setShowImportModal(false);
    setImportFile(null);
  };

  const handleRestartSystem = () => {
    setShowRestartModal(true);
  };

  const handleConfirmRestart = () => {
    alert('System restart initiated. This may take a few minutes...');
    setShowRestartModal(false);
    setTimeout(() => {
      alert('System restart completed successfully!');
    }, 3000);
  };

  const renderValueInput = (config: SystemConfig) => {
    const currentValue = tempValues[config.id] !== undefined ? tempValues[config.id] : config.value;

    if (!config.isEditable) {
      return <ValueDisplay>{config.value}</ValueDisplay>;
    }

    if (config.dataType === 'boolean') {
      return (
        <StandardSelect
          value={currentValue}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleValueChange(config.id, e.target.value)}
        >
          <option value="true">True</option>
          <option value="false">False</option>
        </StandardSelect>
      );
    }

    return (
      <ValueInput
        type={config.dataType === 'number' ? 'number' : config.dataType === 'email' ? 'email' : 'text'}
        dataType={config.dataType}
        value={currentValue}
        onChange={(e) => handleValueChange(config.id, e.target.value)}
      />
    );
  };

  return (
    <MainLayout>
      <Container>
        <Header>
          <Title>System Configuration</Title>
          <ActionSection>
            <BaseButton variant="secondary" onClick={handleExportConfig}>Export Config</BaseButton>
            <BaseButton variant="secondary" onClick={handleImportConfig}>Import Config</BaseButton>
            <BaseButton variant="primary" onClick={handleRestartSystem}>Restart System</BaseButton>
          </ActionSection>
        </Header>

        <Content>
          <ConfigCategories>
            {Object.entries(groupedConfigs).map(([category, categoryConfigs]) => (
              <CategorySection key={category}>
                <CategoryHeader>
                  <CategoryTitle>{category.replace('_', ' ')}</CategoryTitle>
                </CategoryHeader>
                <ConfigGrid>
                  {categoryConfigs.map(config => (
                    <ConfigItem key={config.id}>
                      <ConfigInfo>
                        <ConfigName>
                          {config.displayName}
                          {config.requiresRestart && <RequiresBadge>Requires Restart</RequiresBadge>}
                        </ConfigName>
                        <ConfigDescription>{config.description}</ConfigDescription>
                        <ConfigKey>{config.key}</ConfigKey>
                      </ConfigInfo>

                      <ConfigValue>
                        {renderValueInput(config)}
                      </ConfigValue>

                      <ConfigActions>
                        {config.isEditable && (
                          <>
                            <ActionButton
                              variant="primary"
                              onClick={() => handleSave(config.id)}
                              disabled={!changedConfigs.has(config.id)}
                            >
                              Save
                            </ActionButton>
                            {changedConfigs.has(config.id) && (
                              <ActionButton onClick={() => handleReset(config.id)}>
                                Reset
                              </ActionButton>
                            )}
                          </>
                        )}
                      </ConfigActions>
                    </ConfigItem>
                  ))}
                </ConfigGrid>
              </CategorySection>
            ))}
          </ConfigCategories>

          {/* Import Config Modal */}
          {showImportModal && (
            <Modal
              isOpen={showImportModal}
              onClose={() => setShowImportModal(false)}
              title="Import Configuration"
              footer={
                <>
                  <ModalButton variant="secondary" onClick={() => setShowImportModal(false)}>
                    Cancel
                  </ModalButton>
                  <ModalButton onClick={handleConfirmImport} disabled={!importFile}>
                    Import Configuration
                  </ModalButton>
                </>
              }
            >
              <p style={{ marginBottom: '20px', color: '#6B7280' }}>
                Select a configuration file to import. Only editable settings will be updated.
              </p>
              <FileInputContainer>
                <FileInput
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  id="config-file"
                />
                <FileInputLabel htmlFor="config-file">
                  {importFile ? importFile.name : 'Choose Configuration File'}
                </FileInputLabel>
              </FileInputContainer>
              {importFile && (
                <FileInfo>
                  Selected: {importFile.name} ({(importFile.size / 1024).toFixed(1)} KB)
                </FileInfo>
              )}
            </Modal>
          )}

          {/* Restart System Modal */}
          {showRestartModal && (
            <Modal
              isOpen={showRestartModal}
              onClose={() => setShowRestartModal(false)}
              title="Restart System"
              footer={
                <>
                  <ModalButton variant="secondary" onClick={() => setShowRestartModal(false)}>
                    Cancel
                  </ModalButton>
                  <ModalButton variant="danger" onClick={handleConfirmRestart}>
                    Restart System
                  </ModalButton>
                </>
              }
            >
              <WarningIcon>⚠️</WarningIcon>
              <WarningText>
                <strong>Are you sure you want to restart the system?</strong>
              </WarningText>
              <p style={{ color: '#6B7280', marginBottom: '0' }}>
                This will temporarily interrupt service for all users. The system will be back online in a few minutes.
              </p>
            </Modal>
          )}
        </Content>
      </Container>
    </MainLayout>
  );
};

export default SystemConfigPage;
