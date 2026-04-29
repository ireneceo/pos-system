import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { getAuthToken } from '../../utils/auth';
import { useStore } from '../../contexts/StoreContext';
import { formatDateTime } from '../../utils/timezone';

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

// Cron job 식별자 → 사용자 친화 라벨/설명
const JOB_LABELS: Record<string, { label: string; desc: string }> = {
  'subscription-reminder':       { label: '구독 만료 알림',       desc: '체험/구독 종료 D-3·7·14일 전 자동 알림 발송' },
  'invoice-reminder':            { label: '인보이스 발송 리마인더', desc: '미발송/연체 인보이스 일일 자동 발송' },
  'soa-statement':               { label: '월간 SOA 발송',         desc: 'Statement of Account 매월 1일 자동 발송' },
  'contract-expiry-reminder':    { label: '계약 만료 알림',         desc: '레스토랑 계약 만료 임박 자동 알림' },
  'invoice-overdue-suspend':     { label: '연체 자동 정지',         desc: '연체 30일 경과 시 계정 자동 suspend' },
  'po-auto-cancel':              { label: '발주 자동 취소',         desc: '오래된 미수령 PO 자동 취소' },
  'inventory-low-stock-alert':   { label: '재고 부족 알림',         desc: '안전재고 미만 재료 자동 알림' },
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
  return parts.length ? parts.join(' · ') : '결과 없음';
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
          <HelpTitle>{t('schedulerMonitor.helpTitle', '이 페이지는 무엇인가요?')}</HelpTitle>
          <HelpDesc>
            {t('schedulerMonitor.helpDesc', '시스템이 매일 또는 주기적으로 자동 실행하는 백그라운드 작업(cron jobs)의 실행 결과를 확인하는 페이지입니다. 구독 알림 발송, 인보이스 자동 발송, 계약 만료 체크 등의 자동화 작업이 정상 작동하는지 모니터링하고, 실패한 작업의 원인을 추적할 수 있습니다.')}
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
                <JobName>{meta?.label || j.job_name}</JobName>
                {meta?.desc && <JobDesc>{meta.desc}</JobDesc>}
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
          <Table>
            <thead>
              <tr>
                <Th>{t('schedulerMonitor.job', 'Job')}</Th>
                <Th>{t('schedulerMonitor.startedAt', 'Started')}</Th>
                <Th>{t('schedulerMonitor.duration', 'Duration')}</Th>
                <Th>{t('schedulerMonitor.status', 'Status')}</Th>
                <Th>{t('schedulerMonitor.summary', 'Summary')}</Th>
              </tr>
            </thead>
            <tbody>
              {filteredRuns.map(r => {
                const sc = STATUS_COLORS[r.status] || STATUS_COLORS.running;
                const summary = summarizeResults(r.results, r.error_message);
                const jobMeta = JOB_LABELS[r.job_name];
                return (
                  <tr key={r.id}>
                    <Td>{jobMeta?.label || r.job_name}</Td>
                    <Td>{formatTime(r.started_at)}</Td>
                    <Td>{fmtDuration(r.duration_ms)}</Td>
                    <Td><StatusPill $bg={sc.bg} $fg={sc.fg}>{r.status}</StatusPill></Td>
                    <Td $small title={summary}>{summary}</Td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
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
  border-bottom: 1px solid #E6EBF1;
  height: 56px;
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
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 8px 14px;
  font-size: 13px;
  color: #4B5563;
  font-weight: 500;
  cursor: pointer;
  &:hover { background: #F8FAFC; border-color: #CBD5E1; }
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
  border: 1px solid #CBD5E1;
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
  color: #6B7C93;
  margin-top: 2px;
  margin-bottom: 10px;
  line-height: 1.4;
`;
const JobCode = styled.div`
  font-size: 11px;
  color: #94A3B8;
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
  border: 1px solid #E6EBF1;
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
const MetaLabel = styled.span`font-size: 12px; color: #6B7C93;`;
const MetaValue = styled.span`font-size: 12px; color: #0A2540; font-weight: 500;`;
const Results = styled.div`
  margin-top: 12px;
  padding-top: 10px;
  border-top: 1px dashed #E6EBF1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px 12px;
`;
const ResultPair = styled.div`display: flex; justify-content: space-between; gap: 8px;`;
const ResultKey = styled.span`font-size: 11px; color: #6B7C93; font-family: ui-monospace, monospace;`;
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
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 13px;
  background: white;
  color: #4B5563;
`;
const ResultMeta = styled.span`font-size: 12px; color: #9CA3AF; margin-left: auto;`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #E6EBF1;
`;
const Th = styled.th`
  text-align: left;
  padding: 12px 16px;
  background: #F8FAFC;
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  border-bottom: 1px solid #E6EBF1;
`;
const Td = styled.td<{ $small?: boolean }>`
  padding: 12px 16px;
  font-size: ${p => p.$small ? '12px' : '13px'};
  color: #0A2540;
  border-bottom: 1px solid #F3F4F6;
  ${p => p.$small && `
    max-width: 400px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #6B7C93;
    font-family: ui-monospace, monospace;
  `}
`;
const Empty = styled.div`
  background: white;
  border: 1px dashed #E6EBF1;
  border-radius: 12px;
  padding: 60px 24px;
  text-align: center;
  color: #6B7C93;
`;
const EmptyTitle = styled.div`font-size: 16px; font-weight: 600; color: #0A2540; margin-bottom: 4px;`;
const EmptyDesc = styled.div`font-size: 13px; color: #6B7C93;`;
