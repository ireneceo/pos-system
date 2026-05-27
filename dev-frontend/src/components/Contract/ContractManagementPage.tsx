import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Header,
  Title,
  ActionSection,
  Content,
  Button,
  StatsGrid,
  StatCard,
  StatValue,
  StatLabel,
  DataTableContainer,
  DataTable,
  DataTableHead,
  DataTableRow,
  DataTableCell,
  DataTableHeaderCell,
  DataTableEmpty
} from '../UI';
import { SearchInput, FilterSelect } from '../Common/FilterComponents';
import DatePeriodFilter, { PeriodType, DateRange, calculatePeriodDateRange } from '../Common/DatePeriodFilter';
import { TabContainer, Tab } from '../UI/Tabs';
import ContractPipeline from './ContractPipeline';
import ContractDetail from './ContractDetail';

import { getAuthToken } from '../../utils/auth';
interface ContractManagementPageProps {
  entityType: 'brand' | 'foodcourt';
  pageTitle: string;
  extraTabs?: React.ReactNode;
}

// Stage badge
const StageBadge = styled.span<{ bg: string; color: string }>`
  display: inline-block;
  padding: 3px 10px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 500;
  color: ${p => p.color};
  background: ${p => p.bg};
`;

const STAGE_COLORS: Record<string, { bg: string; color: string }> = {
  proposal: { bg: '#DBEAFE', color: '#2563EB' },
  contracting: { bg: '#FEF3C7', color: '#D97706' },
  setup: { bg: '#F5F3FF', color: '#6D28D9' },
  active: { bg: '#ECFDF5', color: '#059669' },
  terminated: { bg: '#F1F4F8', color: '#4B5563' },
  renewed: { bg: '#EDE9FE', color: '#7C3AED' },
  expired: { bg: '#F1F4F8', color: '#4B5563' }
};

const ClickableRow = styled(DataTableRow)`
  cursor: pointer;
  &:hover { background: #F1F4F8; }
`;

const Unlinked = styled.span`
  color: #6B7280;
  font-size: 13px;
`;

const ViewToggle = styled.div`
  display: flex;
  background: #F1F4F8;
  border-radius: 6px;
  padding: 2px;
  flex-shrink: 0;
`;

const ViewToggleBtn = styled.button<{ active: boolean }>`
  padding: 5px 14px;
  border: none;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  background: ${p => p.active ? 'white' : 'transparent'};
  color: ${p => p.active ? '#0A2540' : '#4B5563'};
  box-shadow: ${p => p.active ? '0 1px 2px rgba(0,0,0,0.08)' : 'none'};
`;

const STAT_COLORS: Record<string, string> = {
  proposal: '#2563EB',
  contracting: '#D97706',
  setup: '#8B5CF6',
  active: '#059669',
  terminated: '#4B5563',
  expired: '#4B5563',
  renewed: '#7C3AED'
};

const ACTIVE_STAGES = ['proposal', 'contracting', 'setup', 'active'];
const ARCHIVE_STAGES = ['terminated', 'expired', 'renewed'];

const ContractManagementPage: React.FC<ContractManagementPageProps> = ({ entityType, pageTitle, extraTabs }) => {
  const { t } = useTranslation('contract');
  const [searchParams, setSearchParams] = useSearchParams();
  const [contracts, setContracts] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  // URL-backed state
  const view = (searchParams.get('view') || 'pipeline') as 'pipeline' | 'list';
  const tab = (searchParams.get('tab') || 'active') as 'active' | 'archive';
  const selectedId = searchParams.get('id') ? Number(searchParams.get('id')) : null;

  const setView = (v: 'pipeline' | 'list') => {
    setSearchParams(prev => {
      const p = new URLSearchParams(prev);
      p.set('view', v);
      p.delete('id');
      return p;
    }, { replace: true });
  };

  const setTab = (t: 'active' | 'archive') => {
    setSearchParams(prev => {
      const p = new URLSearchParams(prev);
      p.set('tab', t);
      p.delete('id');
      if (t === 'archive') p.set('view', 'list');
      return p;
    }, { replace: true });
    setStageFilter('');
  };

  const setSelectedId = (id: number | null) => {
    setSearchParams(prev => {
      const p = new URLSearchParams(prev);
      if (id) { p.set('id', String(id)); } else { p.delete('id'); }
      p.delete('section');
      return p;
    }, { replace: true });
  };
  const [stageFilter, setStageFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Date period filter state
  const [activePeriod, setActivePeriod] = useState<PeriodType>('all');
  const [dateRange, setDateRange] = useState<DateRange>(calculatePeriodDateRange('all'));
  const [isCustomDateRange, setIsCustomDateRange] = useState(false);

  const [debouncedSearch, setDebouncedSearch] = useState('');
  const searchTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  // Debounce search input
  useEffect(() => {
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(() => setDebouncedSearch(search), 400);
    return () => { if (searchTimerRef.current) clearTimeout(searchTimerRef.current); };
  }, [search]);

  const fetchContracts = useCallback(async () => {
    try {
      setLoading(true);
      const token = getAuthToken();
      const params = new URLSearchParams();
      if (stageFilter) params.set('stage', stageFilter);
      if (debouncedSearch) params.set('search', debouncedSearch);

      const res = await fetch(`/api/contracts?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setContracts(data.data || []);
        setError(null);
      } else {
        setError(data.message || 'Failed to load contracts');
      }
    } catch (err) {
      setError('Failed to load contracts');
    } finally {
      setLoading(false);
    }
  }, [stageFilter, debouncedSearch]);

  useEffect(() => { fetchContracts(); }, [fetchContracts]);

  const handlePeriodChange = (period: PeriodType) => {
    setActivePeriod(period);
    setIsCustomDateRange(false);
    setDateRange(calculatePeriodDateRange(period));
  };

  const handleCalendarRangeSelect = (start: string, end: string) => {
    setDateRange({ start, end });
    setIsCustomDateRange(true);
  };

  const handleCreateProposal = async () => {
    try {
      const token = getAuthToken();
      const res = await fetch('/api/contracts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          applicant_company_name: t('newProposal.defaultName', 'New Proposal'),
          contract_type: entityType === 'brand' ? 'franchise' : 'standard'
        })
      });
      const data = await res.json();
      if (data.success) {
        setSelectedId(data.data.id);
      } else {
        setError(data.message || 'Failed to create proposal');
      }
    } catch {
      setError('Failed to create proposal');
    }
  };

  // Filter by date range (search is now server-side)
  const dateFilteredContracts = contracts.filter(c => {
    if (activePeriod !== 'all' || isCustomDateRange) {
      const contractDate = c.created_at || c.createdAt || '';
      if (contractDate) {
        const d = contractDate.substring(0, 10);
        if (d < dateRange.start || d > dateRange.end) return false;
      }
    }
    return true;
  });

  // Tab split (active vs archive)
  const activeContracts = dateFilteredContracts.filter(c => ACTIVE_STAGES.includes(c.stage));
  const archiveContracts = dateFilteredContracts.filter(c => ARCHIVE_STAGES.includes(c.stage));
  const filteredContracts = tab === 'archive' ? archiveContracts : activeContracts;

  // Stats per tab
  const stageCounts = {
    proposal: activeContracts.filter(c => c.stage === 'proposal').length,
    contracting: activeContracts.filter(c => c.stage === 'contracting').length,
    setup: activeContracts.filter(c => c.stage === 'setup').length,
    active: activeContracts.filter(c => c.stage === 'active').length,
    terminated: archiveContracts.filter(c => c.stage === 'terminated').length,
    expired: archiveContracts.filter(c => c.stage === 'expired').length,
    renewed: archiveContracts.filter(c => c.stage === 'renewed').length
  };

  return (
    <Container>
      <Header>
        <Title>{pageTitle}</Title>
        {!selectedId && (
          <ActionSection>
            <Button variant="primary" onClick={handleCreateProposal}>
              {t('newProposal.button', 'New Proposal')}
            </Button>
          </ActionSection>
        )}
      </Header>

      <Content>
        {selectedId ? (
          <ContractDetail
            contractId={selectedId}
            entityType={entityType}
            onBack={() => { setSelectedId(null); fetchContracts(); }}
          />
        ) : (
        <>
        {extraTabs}
        <TabContainer>
          <Tab active={tab === 'active'} onClick={() => setTab('active')}>
            {t('tabs.active', 'Active Pipeline')} ({activeContracts.length})
          </Tab>
          <Tab active={tab === 'archive'} onClick={() => setTab('archive')}>
            {t('tabs.archive', 'Archive')} ({archiveContracts.length})
          </Tab>
        </TabContainer>

        {tab === 'active' ? (
          <StatsGrid>
            <StatCard color={STAT_COLORS.proposal}>
              <StatValue>{stageCounts.proposal}</StatValue>
              <StatLabel>{t('stages.proposal', 'Proposal')}</StatLabel>
            </StatCard>
            <StatCard color={STAT_COLORS.contracting}>
              <StatValue>{stageCounts.contracting}</StatValue>
              <StatLabel>{t('stages.contracting', 'Contracting')}</StatLabel>
            </StatCard>
            <StatCard color={STAT_COLORS.setup}>
              <StatValue>{stageCounts.setup}</StatValue>
              <StatLabel>{t('stages.setup', 'Setup')}</StatLabel>
            </StatCard>
            <StatCard color={STAT_COLORS.active}>
              <StatValue>{stageCounts.active}</StatValue>
              <StatLabel>{t('stages.active', 'Active')}</StatLabel>
            </StatCard>
          </StatsGrid>
        ) : (
          <StatsGrid>
            <StatCard color={STAT_COLORS.terminated}>
              <StatValue>{stageCounts.terminated}</StatValue>
              <StatLabel>{t('stages.terminated', 'Terminated')}</StatLabel>
            </StatCard>
            <StatCard color={STAT_COLORS.expired}>
              <StatValue>{stageCounts.expired}</StatValue>
              <StatLabel>{t('stages.expired', 'Expired')}</StatLabel>
            </StatCard>
            <StatCard color={STAT_COLORS.renewed}>
              <StatValue>{stageCounts.renewed}</StatValue>
              <StatLabel>{t('stages.renewed', 'Renewed')}</StatLabel>
            </StatCard>
          </StatsGrid>
        )}

        <DatePeriodFilter
          activePeriod={activePeriod}
          dateRange={dateRange}
          isCustomDateRange={isCustomDateRange}
          onPeriodChange={handlePeriodChange}
          onCalendarRangeSelect={handleCalendarRangeSelect}
        >
          <FilterSelect
            value={stageFilter}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStageFilter(e.target.value)}
            style={{ minWidth: '120px', maxWidth: '150px' }}
          >
            <option value="">{t('list.allStages', 'All Stages')}</option>
            {tab === 'active' ? (
              <>
                <option value="proposal">{t('stages.proposal', 'Proposal')}</option>
                <option value="contracting">{t('stages.contracting', 'Contracting')}</option>
                <option value="setup">{t('stages.setup', 'Setup')}</option>
                <option value="active">{t('stages.active', 'Active')}</option>
              </>
            ) : (
              <>
                <option value="terminated">{t('stages.terminated', 'Terminated')}</option>
                <option value="expired">{t('stages.expired', 'Expired')}</option>
                <option value="renewed">{t('stages.renewed', 'Renewed')}</option>
              </>
            )}
          </FilterSelect>
          <SearchInput
            placeholder={t('list.search', 'Search...')}
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            style={{ minWidth: '140px', maxWidth: '200px' }}
          />
          {tab === 'active' && (
            <div style={{ marginLeft: 'auto' }}>
              <ViewToggle>
                <ViewToggleBtn active={view === 'pipeline'} onClick={() => setView('pipeline')}>
                  {t('views.pipeline', 'Pipeline')}
                </ViewToggleBtn>
                <ViewToggleBtn active={view === 'list'} onClick={() => setView('list')}>
                  {t('views.list', 'List')}
                </ViewToggleBtn>
              </ViewToggle>
            </div>
          )}
        </DatePeriodFilter>

        {error && (
          <div style={{ color: '#DC2626', fontSize: '14px', marginBottom: '16px' }}>{error}</div>
        )}

        {loading ? (
          <DataTableEmpty>{t('common.loading', 'Loading...')}</DataTableEmpty>
        ) : view === 'pipeline' && tab === 'active' ? (
          <ContractPipeline
            contracts={filteredContracts}
            onCardClick={(id) => setSelectedId(id)}
            entityType={entityType}
          />
        ) : (
          <>
            {filteredContracts.length === 0 ? (
              <DataTableEmpty>{t('list.empty', 'No contracts found')}</DataTableEmpty>
            ) : (
              <DataTableContainer>
                <DataTable>
                  <DataTableHead>
                    <DataTableHeaderCell>{t('list.name', 'Name')}</DataTableHeaderCell>
                    <DataTableHeaderCell>{t('list.stage', 'Stage')}</DataTableHeaderCell>
                    <DataTableHeaderCell>{t('list.period', 'Period')}</DataTableHeaderCell>
                    <DataTableHeaderCell>{t('list.restaurant', 'Restaurant')}</DataTableHeaderCell>
                  </DataTableHead>
                  <tbody>
                    {filteredContracts.map(c => {
                      const badge = STAGE_COLORS[c.stage] || STAGE_COLORS.expired;
                      return (
                        <ClickableRow key={c.id} onClick={() => setSelectedId(c.id)}>
                          <DataTableCell data-label={t('list.companyName', 'Company Name')} style={{ fontWeight: 500 }}>
                            <div>{c.applicant_company_name || c.applicant_name || '-'}</div>
                            {c.applicant_contact_person && (
                              <div style={{ fontSize: '12px', color: '#4B5563', marginTop: '2px' }}>
                                {c.applicant_contact_person}
                              </div>
                            )}
                          </DataTableCell>
                          <DataTableCell data-label={t('list.stage', 'Stage')}>
                            <StageBadge bg={badge.bg} color={badge.color}>{c.stage}</StageBadge>
                          </DataTableCell>
                          <DataTableCell data-label={t('list.period', 'Period')}>
                            {c.start_date && c.end_date
                              ? `${c.start_date.substring(0, 7)} ~ ${c.end_date.substring(0, 7)}`
                              : '-'}
                          </DataTableCell>
                          <DataTableCell data-label={t('list.restaurant', 'Restaurant')}>
                            {c.restaurant?.name || <Unlinked>(unlinked)</Unlinked>}
                          </DataTableCell>
                        </ClickableRow>
                      );
                    })}
                  </tbody>
                </DataTable>
              </DataTableContainer>
            )}
          </>
        )}
        </>
        )}
      </Content>
    </Container>
  );
};

export default ContractManagementPage;
