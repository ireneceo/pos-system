import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { getAuthToken } from '../../utils/auth';
import { useStore } from '../../contexts/StoreContext';
import { formatDateTime } from '../../utils/timezone';
import { DataTable, DataTableHead, DataTableHeaderCell, DataTableRow, DataTableCell, DataTableEmpty } from '../../components/UI/DataTable';

interface JobSummary {
  job_name: string;
  total_runs: number;
  latest_started_at: string | null;
  latest_status: 'success' | 'partial' | 'error' | 'running' | null;
  latest_finished_at: string | null;
  latest_duration_ms: number | null;
  latest_results: Record<string, any> | null;
  latest_error: string | null;
  errors_24h: number;
}

interface RunRow {
  id: number;
  job_name: string;
  started_at: string;
  finished_at: string | null;
  duration_ms: number | null;
  status: 'success' | 'partial' | 'error' | 'running';
  results: Record<string, any> | null;
  error_message: string | null;
}

const STATUS_COLORS: Record<string, { bg: string; fg: string }> = {
  success: { bg: '#D1FAE5', fg: '#065F46' },
  partial: { bg: '#FEF3C7', fg: '#92400E' },
  error:   { bg: '#FEE2E2', fg: '#991B1B' },
  running: { bg: '#DBEAFE', fg: '#1E40AF' }
};

function authHeaders() {
  const t = getAuthToken();
  return t ? { Authorization: `Bearer ${t}` } : {};
}

function fmtDuration(ms: number | null): string {
  if (ms == null) return '—';
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60_000) return `${(ms / 1000).toFixed(2)}s`;
  return `${(ms / 60_000).toFixed(1)}m`;
}

// Cron job id → user-friendly label/description (English defaults; i18n via schedulerJobs.<id>.*)
const JOB_LABELS: Record<string, { label: string; desc: string }> = {
  'subscription-reminder':       { label: 'Subscription Reminder',      desc: 'Sends automatic reminders 3, 7, and 14 days before a trial or subscription ends' },
  'invoice-reminder':            { label: 'Invoice Reminder',           desc: 'Sends unsent or overdue invoices automatically each day' },
  'soa-statement':               { label: 'Monthly SOA',                desc: 'Sends the Statement of Account automatically on the 1st of each month' },
  'contract-expiry-reminder':    { label: 'Contract Expiry Reminder',   desc: 'Sends automatic alerts when a restaurant contract is about to expire' },
  'invoice-overdue-suspend':     { label: 'Overdue Auto-Suspend',       desc: 'Automatically suspends accounts 30 days after an invoice becomes overdue' },
  'po-auto-cancel':              { label: 'Purchase Order Auto-Cancel',  desc: 'Automatically cancels old unreceived purchase orders' },
  'inventory-low-stock-alert':   { label: 'Low Stock Alert',            desc: 'Sends automatic alerts for ingredients below the safety stock level' },
};

// results 객체 → 사람이 읽을 수 있는 한 줄
function summarizeResults(results: Record<string, any> | null, error: string | null): string {
  if (error) return error;
  if (!results) return '—';
  const parts: string[] = [];
  for (const [k, v] of Object.entries(results)) {
    if (v === 0 || v == null) continue;
    if (typeof v === 'object') continue;  // 중첩 객체는 카드/모달에서만
    const friendly = k.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    parts.push(`${friendly}: ${v}`);
  }
  return parts.length ? parts.join(' · ') : 'No results';
}

const SchedulerMonitorPage: React.FC = () => {
  const { t } = useTranslation('admin');
  const { operationSettings } = useStore();
  const [jobs, setJobs] = useState<JobSummary[]>([]);
  const [runs, setRuns] = useState<RunRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterJob, setFilterJob] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [jobsR, runsR] = await Promise.all([
        fetch('/api/admin/scheduler-runs/jobs', { headers: authHeaders() }),
        fetch('/api/admin/scheduler-runs?limit=100', { headers: authHeaders() })
      ]);
      if (jobsR.ok) {
        const j = await jobsR.json();
        setJobs(Array.isArray(j.jobs) ? j.jobs : []);
      }
      if (runsR.ok) {
        const j = await runsR.json();
        setRuns(Array.isArray(j.data) ? j.data : []);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const filteredRuns = runs
    .filter(r => filterJob === 'all' ? true : r.job_name === filterJob)
    .filter(r => filterStatus === 'all' ? true : r.status === filterStatus);

  const formatTime = (iso: string | null) => iso ? formatDateTime(iso, operationSettings, {
    year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'
  }) : '—';

  return (
    <Container>
      <Header>
        <PageTitle>{t('schedulerMonitor.title', 'Scheduler Monitor')}</PageTitle>
        <RefreshBtn type="button" onClick={load} disabled={loading}>
          {loading ? t('common.loading', 'Loading…') : t('common.refresh', 'Refresh')}
        </RefreshBtn>
      </Header>

      <Content>
        <HelpBox>
          <HelpTitle>{t('schedulerMonitor.helpTitle', 'What is this page?')}</HelpTitle>
          <HelpDesc>
            {t('schedulerMonitor.helpDesc', 'This page shows the results of background tasks (cron jobs) that the system runs automatically every day or on a schedule. You can monitor whether automated tasks such as subscription reminders, automatic invoice sending, and contract expiry checks are working correctly, and trace the cause of any failed runs.')}
          </HelpDesc>
        </HelpBox>

        {/* ─── Job summary cards ─── */}
        <SectionTitle>{t('schedulerMonitor.jobs', 'Jobs')}</SectionTitle>
        <JobGrid>
          {jobs.length === 0 && !loading && (
            <Empty>
              <EmptyTitle>{t('schedulerMonitor.noJobs', 'No scheduler runs recorded yet')}</EmptyTitle>
              <EmptyDesc>{t('schedulerMonitor.noJobsDesc', 'Daily jobs will populate this dashboard at the next scheduled time (e.g. 02:00).')}</EmptyDesc>
            </Empty>
          )}
          {jobs.map(j => {
            const sc = STATUS_COLORS[j.latest_status || 'running'] || STATUS_COLORS.running;
            const meta = JOB_LABELS[j.job_name];
            return (
              <JobCard key={j.job_name}>
                <JobName>{meta ? t('schedulerJobs.' + j.job_name + '.label', meta.label) : j.job_name}</JobName>
                {meta?.desc && <JobDesc>{t('schedulerJobs.' + j.job_name + '.desc', meta.desc)}</JobDesc>}
                {!meta && <JobCode>{j.job_name}</JobCode>}
                <JobMetaRow>
                  <StatusPill $bg={sc.bg} $fg={sc.fg}>{j.latest_status || '—'}</StatusPill>
                  {j.errors_24h > 0 && <ErrorPill>{j.errors_24h} errors / 24h</ErrorPill>}
                </JobMetaRow>
                <JobMeta>
                  <MetaLabel>{t('schedulerMonitor.lastRun', 'Last run')}</MetaLabel>
                  <MetaValue>{formatTime(j.latest_started_at)}</MetaValue>
                </JobMeta>
                <JobMeta>
                  <MetaLabel>{t('schedulerMonitor.duration', 'Duration')}</MetaLabel>
                  <MetaValue>{fmtDuration(j.latest_duration_ms)}</MetaValue>
                </JobMeta>
                <JobMeta>
                  <MetaLabel>{t('schedulerMonitor.totalRuns', 'Total runs')}</MetaLabel>
                  <MetaValue>{j.total_runs}</MetaValue>
                </JobMeta>
                {j.latest_results && (
                  <Results>
                    {Object.entries(j.latest_results)
                      .filter(([, v]) => typeof v !== 'object' && v !== 0 && v != null)
                      .slice(0, 6)
                      .map(([k, v]) => (
                        <ResultPair key={k}>
                          <ResultKey>{k.replace(/_/g, ' ')}</ResultKey>
                          <ResultVal>{String(v)}</ResultVal>
                        </ResultPair>
                      ))}
                  </Results>
                )}
                {j.latest_error && (
                  <ErrorBox>{j.latest_error}</ErrorBox>
                )}
              </JobCard>
            );
          })}
        </JobGrid>

        {/* ─── Recent runs table ─── */}
        <SectionTitle style={{ marginTop: 32 }}>{t('schedulerMonitor.recentRuns', 'Recent runs')}</SectionTitle>
        <FilterRow>
          <FilterSelect value={filterJob} onChange={e => setFilterJob(e.target.value)}>
            <option value="all">{t('schedulerMonitor.allJobs', 'All jobs')}</option>
            {Array.from(new Set(runs.map(r => r.job_name))).map(j => (
              <option key={j} value={j}>{j}</option>
            ))}
          </FilterSelect>
          <FilterSelect value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="all">{t('schedulerMonitor.allStatuses', 'All statuses')}</option>
            <option value="success">success</option>
            <option value="partial">partial</option>
            <option value="error">error</option>
            <option value="running">running</option>
          </FilterSelect>
          <ResultMeta>{filteredRuns.length} {t('schedulerMonitor.results', 'results')}</ResultMeta>
        </FilterRow>

        {filteredRuns.length === 0 ? (
          <Empty><EmptyTitle>{t('schedulerMonitor.noRuns', 'No runs match the current filter')}</EmptyTitle></Empty>
        ) : (
          <DataTable>
            <DataTableHead>
              <tr>
                <DataTableHeaderCell align="left">{t('schedulerMonitor.job', 'Job')}</DataTableHeaderCell>
                <DataTableHeaderCell align="left">{t('schedulerMonitor.startedAt', 'Started')}</DataTableHeaderCell>
                <DataTableHeaderCell align="left">{t('schedulerMonitor.duration', 'Duration')}</DataTableHeaderCell>
                <DataTableHeaderCell align="left">{t('schedulerMonitor.status', 'Status')}</DataTableHeaderCell>
                <DataTableHeaderCell align="left">{t('schedulerMonitor.summary', 'Summary')}</DataTableHeaderCell>
              </tr>
            </DataTableHead>
            <tbody>
              {filteredRuns.map(r => {
                const sc = STATUS_COLORS[r.status] || STATUS_COLORS.running;
                const summary = summarizeResults(r.results, r.error_message);
                const jobMeta = JOB_LABELS[r.job_name];
                return (
                  <DataTableRow key={r.id}>
                    <DataTableCell data-label={t('schedulerMonitor.job', 'Job')}>{jobMeta ? t('schedulerJobs.' + r.job_name + '.label', jobMeta.label) : r.job_name}</DataTableCell>
                    <DataTableCell data-label={t('schedulerMonitor.startedAt', 'Started')}>{formatTime(r.started_at)}</DataTableCell>
                    <DataTableCell data-label={t('schedulerMonitor.duration', 'Duration')}>{fmtDuration(r.duration_ms)}</DataTableCell>
                    <DataTableCell data-label={t('schedulerMonitor.status', 'Status')}><StatusPill $bg={sc.bg} $fg={sc.fg}>{r.status}</StatusPill></DataTableCell>
                    <DataTableCell data-label={t('schedulerMonitor.summary', 'Summary')} title={summary}>{summary}</DataTableCell>
                  </DataTableRow>
                );
              })}
            </tbody>
          </DataTable>
        )}
      </Content>
    </Container>
  );
};

export default SchedulerMonitorPage;

// ─── Styled ──────────────────────────────────────────────────

const Container = styled.div`min-height: 100vh;`;
const Header = styled.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #C7CED6;
  height: 80px;
  min-height: 80px;
  max-height: 80px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) { padding: 16px; height: auto; }
`;
const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  @media (max-width: 768px) { font-size: 20px; }
`;
const RefreshBtn = styled.button`
  background: white;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  padding: 8px 14px;
  font-size: 13px;
  color: #374151;
  font-weight: 500;
  cursor: pointer;
  &:hover { background: #F1F4F8; border-color: #64748B; }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;
const Content = styled.div`
  padding: 24px 32px;
  max-width: 1200px;
  margin: 0 auto;
  @media (max-width: 768px) { padding: 20px 16px; }
`;
const SectionTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 12px;
`;
const HelpBox = styled.div`
  background: #F1F5F9;
  border: 1px solid #64748B;
  border-radius: 10px;
  padding: 14px 18px;
  margin-bottom: 24px;
`;
const HelpTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 6px;
`;
const HelpDesc = styled.div`
  font-size: 13px;
  color: #475569;
  line-height: 1.6;
`;
const JobDesc = styled.div`
  font-size: 12px;
  color: #4B5563;
  margin-top: 2px;
  margin-bottom: 10px;
  line-height: 1.4;
`;
const JobCode = styled.div`
  font-size: 11px;
  color: #64748B;
  font-family: ui-monospace, monospace;
  margin-bottom: 10px;
`;
const JobGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
`;
const JobCard = styled.div`
  background: white;
  border: 1px solid #C7CED6;
  border-radius: 12px;
  padding: 18px 20px;
`;
const JobName = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`;
const JobMetaRow = styled.div`display: flex; gap: 6px; margin-bottom: 12px;`;
const StatusPill = styled.span<{ $bg: string; $fg: string }>`
  background: ${p => p.$bg};
  color: ${p => p.$fg};
  font-size: 11px;
  font-weight: 600;
  padding: 3px 9px;
  border-radius: 10px;
  text-transform: capitalize;
  display: inline-block;
`;
const ErrorPill = styled.span`
  background: #FEE2E2;
  color: #991B1B;
  font-size: 11px;
  font-weight: 600;
  padding: 3px 9px;
  border-radius: 10px;
`;
const JobMeta = styled.div`display: flex; justify-content: space-between; gap: 8px; padding: 4px 0;`;
const MetaLabel = styled.span`font-size: 12px; color: #4B5563;`;
const MetaValue = styled.span`font-size: 12px; color: #0A2540; font-weight: 500;`;
const Results = styled.div`
  margin-top: 12px;
  padding-top: 10px;
  border-top: 1px dashed #C7CED6;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px 12px;
`;
const ResultPair = styled.div`display: flex; justify-content: space-between; gap: 8px;`;
const ResultKey = styled.span`font-size: 11px; color: #4B5563; font-family: ui-monospace, monospace;`;
const ResultVal = styled.span`font-size: 11px; color: #0A2540; font-weight: 600;`;
const ErrorBox = styled.div`
  margin-top: 12px;
  background: #FEF2F2;
  color: #991B1B;
  font-size: 12px;
  padding: 8px 10px;
  border-radius: 6px;
  font-family: ui-monospace, monospace;
  word-break: break-word;
`;
const FilterRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  align-items: center;
  flex-wrap: wrap;
`;
const FilterSelect = styled.select`
  padding: 6px 10px;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  font-size: 13px;
  background: white;
  color: #374151;
`;
const ResultMeta = styled.span`font-size: 12px; color: #6B7280; margin-left: auto;`;
const Empty = styled.div`
  background: white;
  border: 1px dashed #C7CED6;
  border-radius: 12px;
  padding: 60px 24px;
  text-align: center;
  color: #4B5563;
`;
const EmptyTitle = styled.div`font-size: 16px; font-weight: 600; color: #0A2540; margin-bottom: 4px;`;
const EmptyDesc = styled.div`font-size: 13px; color: #4B5563;`;
