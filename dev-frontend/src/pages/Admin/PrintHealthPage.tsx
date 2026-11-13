import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Header, Title } from '../../components/UI/PageComponents';
import {
  DataTableContainer, DataTable, DataTableHead, DataTableRow,
  DataTableHeaderCell, DataTableCell, DataTableEmpty,
} from '../../components/UI/DataTable';
import { StatsGrid, StatCard, StatValue, StatLabel } from '../../components/UI/StatCard';
import { ModalComponent } from '../../components/UI/Modal';
import { Button } from '../../components/UI/Button';
import { getAuthToken } from '../../utils/auth';

/**
 * PrintHealthPage — System Admin remote view (design §5-2). Built from SERVER
 * data only: /fleet for the list, then /devices + /checks on drill-down. No
 * remote-execution buttons — the store presses its own "Run full check".
 */

interface FleetRow {
  restaurant_id: number;
  name: string;
  brand_id: number | null;
  severity: 'critical' | 'warn' | 'unknown' | 'ok';
  stuck: number;
  recentFails: number;
  pollerSinceSec: number | null;
  autoDevice: { label: string; appVersion: string | null; lastReportSec: number | null } | null;
}

// 인쇄 지킴이 발견(2026-11-13 · .claude/fable-design-20261113-print-monitoring.md §4-1) — GET /api/print-diagnostics/watch
interface WatchFinding {
  id: number;
  restaurant_id: number;
  code: string;
  severity: 'critical' | 'warn' | 'info';
  evidence: any;
  first_seen_at: string;
  last_seen_at: string;
  resolved_at: string | null;
  seen_count: number;
}

const SEV_STYLE: Record<string, { color: string; bg: string }> = {
  critical: { color: '#DC2626', bg: '#FEF2F2' },
  warn:     { color: '#B45309', bg: '#FFFBEB' },
  unknown:  { color: '#4B5563', bg: '#F3F4F6' },
  ok:       { color: '#059669', bg: '#ECFDF5' },
  info:     { color: '#4B5563', bg: '#F3F4F6' },
};

const PrintHealthPage: React.FC = () => {
  const { t } = useTranslation('printDiagnostics');
  const [rows, setRows] = useState<FleetRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [drill, setDrill] = useState<FleetRow | null>(null);
  const [drillData, setDrillData] = useState<{ devices: any[]; pollerSinceSec: number | null; checks: any[] } | null>(null);
  const [drillLoading, setDrillLoading] = useState(false);
  const [watch, setWatch] = useState<{ open: WatchFinding[]; resolved: WatchFinding[]; lastRun: { started_at: string; status: string } | null } | null>(null);
  const [watchError, setWatchError] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  const authHeaders = () => ({ 'Authorization': `Bearer ${getAuthToken()}` });

  const loadFleet = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch('/api/print-diagnostics/fleet', { headers: authHeaders() });
      const data = await res.json();
      if (data?.success && Array.isArray(data.data)) setRows(data.data);
      else setError(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadWatch = useCallback(async () => {
    setWatchError(false);
    try {
      const res = await fetch('/api/print-diagnostics/watch', { headers: authHeaders() });
      const data = await res.json();
      if (data?.success && data.data) setWatch(data.data);
      else setWatchError(true);
    } catch {
      setWatchError(true);
    }
  }, []);

  useEffect(() => { loadFleet(); loadWatch(); }, [loadFleet, loadWatch]);

  const openDrill = useCallback(async (row: FleetRow) => {
    setDrill(row);
    setDrillData(null);
    setDrillLoading(true);
    try {
      const [devRes, chkRes] = await Promise.all([
        fetch(`/api/print-diagnostics/restaurant/${row.restaurant_id}/devices`, { headers: authHeaders() }).then(r => r.json()).catch(() => null),
        fetch(`/api/print-diagnostics/restaurant/${row.restaurant_id}/checks`, { headers: authHeaders() }).then(r => r.json()).catch(() => null),
      ]);
      setDrillData({
        devices: devRes?.data?.devices || [],
        pollerSinceSec: devRes?.data?.pollerSinceSec ?? null,
        checks: chkRes?.data?.checks || [],
      });
    } finally {
      setDrillLoading(false);
    }
  }, []);

  const fmtAgo = (sec: number | null): string => {
    if (sec == null) return t('admin.never');
    if (sec < 60) return t('admin.secondsAgo', { n: sec });
    if (sec < 3600) return t('admin.minutesAgo', { n: Math.round(sec / 60) });
    return t('admin.hoursAgo', { n: Math.round(sec / 3600) });
  };

  const sevBadge = (sev: string) => {
    const s = SEV_STYLE[sev] || SEV_STYLE.unknown;
    return (
      <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 999, fontSize: 12, fontWeight: 700, color: s.color, background: s.bg, whiteSpace: 'nowrap' }}>
        {t(`admin.severity.${sev}`)}
      </span>
    );
  };

  const agoOf = (iso: string | null) => fmtAgo(iso ? Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 1000)) : null);
  const watchDetail = (f: WatchFinding): string => {
    const e = f.evidence || {};
    switch (f.code) {
      case 'setup_gap': return t('admin.watch.detail.setup_gap', { kitchens: (e.kitchens || []).join(', ') });
      case 'print_failures': return t('admin.watch.detail.print_failures', { n: e.count, top: (e.top || []).map((x: any) => `${x.reason} ×${x.n} (${x.printer})`).join(', ') });
      case 'unprinted_orders': return t('admin.watch.detail.unprinted_orders', { n: e.count, orders: (e.orders || []).join(', ') });
      case 'multi_auto_print': return t('admin.watch.detail.multi_auto_print', { n: e.count });
      case 'old_app': return t('admin.watch.detail.old_app', { devices: (e.devices || []).join(', '), min: e.min });
      case 'settings_blocked': return t('admin.watch.detail.settings_blocked', { n: e.count });
      default: return '';
    }
  };
  const visible = (list: WatchFinding[]) => list.filter((f) => showDemo || !f.evidence?.demo);
  const openFindings = watch ? visible(watch.open) : [];
  const resolvedFindings = watch ? visible(watch.resolved) : [];
  const findingRows = (list: WatchFinding[], resolved: boolean) => (
    <DataTableContainer>
      <DataTable>
        <DataTableHead>
          <tr>
            <DataTableHeaderCell align="left">{t('admin.col.restaurant')}</DataTableHeaderCell>
            <DataTableHeaderCell>{t('admin.col.status')}</DataTableHeaderCell>
            <DataTableHeaderCell align="left">{t('admin.watch.col.problem')}</DataTableHeaderCell>
            <DataTableHeaderCell align="left">{t('admin.watch.col.detail')}</DataTableHeaderCell>
            <DataTableHeaderCell>{resolved ? t('admin.watch.col.resolved') : t('admin.watch.col.since')}</DataTableHeaderCell>
          </tr>
        </DataTableHead>
        <tbody>
          {list.map((f) => (
            <DataTableRow key={f.id}>
              <DataTableCell align="left" data-label={t('admin.col.restaurant')}>
                {f.evidence?.name || `#${f.restaurant_id}`}
                {f.evidence?.demo && <span style={{ marginLeft: 6, fontSize: 11, color: '#6B7280' }}>{t('admin.watch.demoTag')}</span>}
              </DataTableCell>
              <DataTableCell align="center" data-label={t('admin.col.status')}>{sevBadge(resolved ? 'ok' : f.severity)}</DataTableCell>
              <DataTableCell align="left" data-label={t('admin.watch.col.problem')}>{t(`admin.watch.code.${f.code}`, f.code)}</DataTableCell>
              <DataTableCell align="left" data-label={t('admin.watch.col.detail')}><span style={{ fontSize: 13, color: '#374151' }}>{watchDetail(f)}</span></DataTableCell>
              <DataTableCell align="center" data-label={resolved ? t('admin.watch.col.resolved') : t('admin.watch.col.since')}>{agoOf(resolved ? f.resolved_at : f.first_seen_at)}</DataTableCell>
            </DataTableRow>
          ))}
        </tbody>
      </DataTable>
    </DataTableContainer>
  );

  return (
    <Container>
      <Header>
        <div>
          <Title>{t('admin.title')}</Title>
          <div style={{ fontSize: 13, color: '#6B7280', marginTop: 4 }}>{t('admin.subtitle')}</div>
        </div>
        <Button variant="secondary" size="small" onClick={() => { loadFleet(); loadWatch(); }} disabled={loading}>
          {loading ? t('admin.loading') : t('admin.refresh')}
        </Button>
      </Header>

      <section data-testid="print-watch" style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#0A2540' }}>{t('admin.watch.title')}</div>
            <div style={{ fontSize: 13, color: '#6B7280', marginTop: 2 }}>
              {t('admin.watch.subtitle')}
              {watch?.lastRun && <> · {t('admin.watch.lastRun', { ago: agoOf(watch.lastRun.started_at) })}</>}
            </div>
          </div>
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#374151', cursor: 'pointer' }}>
            <input type="checkbox" checked={showDemo} onChange={(e) => setShowDemo(e.target.checked)} />
            {t('admin.watch.showDemo')}
          </label>
        </div>
        {watchError ? (
          <DataTableEmpty>{t('admin.error')}</DataTableEmpty>
        ) : !watch ? (
          <DataTableEmpty>{t('admin.loading')}</DataTableEmpty>
        ) : openFindings.length === 0 ? (
          <DataTableEmpty>{t('admin.watch.empty')}</DataTableEmpty>
        ) : findingRows(openFindings, false)}
        {watch && resolvedFindings.length > 0 && (
          <details style={{ marginTop: 12 }}>
            <summary style={{ cursor: 'pointer', fontSize: 13, fontWeight: 600, color: '#374151' }}>{t('admin.watch.resolvedTitle', { n: resolvedFindings.length })}</summary>
            <div style={{ marginTop: 8 }}>{findingRows(resolvedFindings, true)}</div>
          </details>
        )}
      </section>

      <div style={{ fontSize: 16, fontWeight: 700, color: '#0A2540', marginBottom: 10 }}>{t('admin.watch.fleetTitle')}</div>
      {error ? (
        <DataTableEmpty>{t('admin.error')}</DataTableEmpty>
      ) : loading ? (
        <DataTableEmpty>{t('admin.loading')}</DataTableEmpty>
      ) : rows.length === 0 ? (
        <DataTableEmpty>{t('admin.empty')}</DataTableEmpty>
      ) : (
        <DataTableContainer>
          <DataTable>
            <DataTableHead>
              <tr>
                <DataTableHeaderCell align="left">{t('admin.col.restaurant')}</DataTableHeaderCell>
                <DataTableHeaderCell>{t('admin.col.status')}</DataTableHeaderCell>
                <DataTableHeaderCell>{t('admin.col.unprinted')}</DataTableHeaderCell>
                <DataTableHeaderCell>{t('admin.col.recentFails')}</DataTableHeaderCell>
                <DataTableHeaderCell align="left">{t('admin.col.autoDevice')}</DataTableHeaderCell>
                <DataTableHeaderCell>{t('admin.col.lastResponse')}</DataTableHeaderCell>
              </tr>
            </DataTableHead>
            <tbody>
              {rows.map((r) => (
                <DataTableRow key={r.restaurant_id} onClick={() => openDrill(r)} style={{ cursor: 'pointer' }}>
                  <DataTableCell align="left" data-label={t('admin.col.restaurant')}>{r.name}</DataTableCell>
                  <DataTableCell align="center" data-label={t('admin.col.status')}>{sevBadge(r.severity)}</DataTableCell>
                  <DataTableCell align="center" data-label={t('admin.col.unprinted')}>{r.stuck}</DataTableCell>
                  <DataTableCell align="center" data-label={t('admin.col.recentFails')}>{r.recentFails}</DataTableCell>
                  <DataTableCell align="left" data-label={t('admin.col.autoDevice')}>
                    {r.autoDevice
                      ? <span>{r.autoDevice.label || '-'}{r.autoDevice.appVersion ? ` · v${r.autoDevice.appVersion}` : ''}</span>
                      : <span style={{ color: '#9CA3AF' }}>{t('admin.noAutoDevice')}</span>}
                  </DataTableCell>
                  <DataTableCell align="center" data-label={t('admin.col.lastResponse')}>{fmtAgo(r.pollerSinceSec)}</DataTableCell>
                </DataTableRow>
              ))}
            </tbody>
          </DataTable>
        </DataTableContainer>
      )}

      <ModalComponent
        isOpen={!!drill}
        onClose={() => { setDrill(null); setDrillData(null); }}
        title={drill ? `${drill.name} — ${t('admin.drill.title')}` : ''}
        size="large"
      >
        {drillLoading || !drillData ? (
          <div style={{ padding: 20, textAlign: 'center', color: '#6B7280' }}>{t('admin.loading')}</div>
        ) : (
          <>
            <StatsGrid>
              <StatCard><StatValue>{drill?.stuck ?? 0}</StatValue><StatLabel>{t('admin.col.unprinted')}</StatLabel></StatCard>
              <StatCard><StatValue>{drill?.recentFails ?? 0}</StatValue><StatLabel>{t('admin.col.recentFails')}</StatLabel></StatCard>
              <StatCard><StatValue>{fmtAgo(drillData.pollerSinceSec)}</StatValue><StatLabel>{t('admin.col.lastResponse')}</StatLabel></StatCard>
              <StatCard><StatValue>{drillData.devices.length}</StatValue><StatLabel>{t('admin.drill.deviceCount')}</StatLabel></StatCard>
            </StatsGrid>

            <div style={{ marginTop: 20 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#111827', marginBottom: 8 }}>{t('admin.drill.serverChecks')}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {drillData.checks.length === 0 && <div style={{ fontSize: 13, color: '#9CA3AF' }}>{t('admin.drill.noChecks')}</div>}
                {drillData.checks.map((c: any) => {
                  const bad = c.status === 'fail';
                  const warn = c.status === 'warn';
                  const color = bad ? '#DC2626' : warn ? '#B45309' : c.status === 'pass' ? '#059669' : '#6B7280';
                  const glyph = bad ? '✕' : warn ? '!' : c.status === 'pass' ? '✓' : c.status === 'na' ? '–' : '?';
                  return (
                    <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
                      <span style={{ color, fontWeight: 800, minWidth: 14, textAlign: 'center' }}>{glyph}</span>
                      <span style={{ color: '#374151' }}>{t(c.title)}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ marginTop: 20 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#111827', marginBottom: 8 }}>{t('admin.drill.devices')}</div>
              {drillData.devices.length === 0 ? (
                <div style={{ fontSize: 13, color: '#9CA3AF' }}>{t('admin.drill.noDevices')}</div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 10 }}>
                  {drillData.devices.map((d: any) => (
                    <div key={d.device_id} style={{ padding: 12, border: '1px solid #E5E7EB', borderRadius: 8, background: '#FAFBFF' }}>
                      <div style={{ fontWeight: 700, fontSize: 13, color: '#111827', display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                        <span>{d.label || d.device_id.slice(0, 8)}</span>
                        {d.is_auto_print && <span style={{ fontSize: 11, color: '#065F46', fontWeight: 700 }}>{t('admin.drill.autoPrint')}</span>}
                      </div>
                      <div style={{ fontSize: 12, color: '#6B7280', marginTop: 6, lineHeight: 1.7 }}>
                        <div>{t('admin.drill.platform')}: {d.platform || '-'}</div>
                        <div>{t('admin.drill.version')}: {d.app_version || '-'}</div>
                        <div>{t('admin.drill.mode')}: {d.printer_mode || '-'}</div>
                        <div>{t('admin.drill.lastReport')}: {fmtAgo(d.last_report_at ? Math.round((Date.now() - new Date(d.last_report_at).getTime()) / 1000) : null)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ marginTop: 20, padding: '10px 12px', background: '#F3F4F6', border: '1px solid #E5E7EB', borderRadius: 8, fontSize: 12.5, color: '#4B5563', lineHeight: 1.6 }}>
              {t('admin.drill.guideStore')}
            </div>
          </>
        )}
      </ModalComponent>
    </Container>
  );
};

export default PrintHealthPage;
