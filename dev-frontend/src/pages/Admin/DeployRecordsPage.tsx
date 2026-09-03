import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import {
  Container, Header, Title, Content,
  DataTableContainer, DataTable, DataTableHead, DataTableRow,
  DataTableCell, DataTableHeaderCell, DataTableEmpty,
} from '../../components/UI';
import { getAuthToken } from '../../utils/auth';

/**
 * 솔루션 개발이슈 — 배포 회차별 개발 현황(시스템 관리자 전용).
 *
 * Irene 요구(2026-09-03): "배포할 때마다 현재 작업중/완료/진행중/이슈/앞으로 할 것 리스트업.
 *   변경 후 바뀌는 현상, 추가로 체크해야 할 영역도 꼭 넣어. 개발자/관리자 시선으로."
 *
 * 데이터는 저장소의 `releases/*.json` 을 배포 스크립트가 적재한 것이다(읽기 전용).
 * 섹션 순서는 **읽는 사람이 먼저 알아야 하는 것** 순서다 — 무엇이 달라지는지 → 무엇을 확인할지
 * → 무엇이 끝났는지 → 남은 문제 → 진행중 → 예정 → 어떻게 검증했는지.
 */

interface ListRow {
  id: number; tag: string; deployed_at: string;
  sw_version: string | null; public_release: string | null; git_commit: string | null;
  completed_count: number; open_issue_count: number; check_area_count: number;
}
interface Item { title: string; detail?: string; scope?: string; status?: string; who?: string; }
interface Detail {
  id: number; tag: string; deployed_at: string; sw_version: string | null;
  git_commit: string | null; fable_note: string | null;
  sections: Record<string, Item[] | Record<string, string> | 'none'>;
}

// 화면 문구는 여기 두지 않는다 — 렌더 시점에 t() 로 뽑는다(언어 전환이 바로 먹는다).
// 순서 = 읽는 사람이 먼저 알아야 하는 것 순서.
interface OpenInquiry {
  id: string;
  ticketNumber: string;
  subject: string;
  status: string;
  createdAt: string;
}

const SECTION_KEYS = ['behavior_changes', 'check_areas', 'completed', 'issues', 'in_progress', 'upcoming'] as const;

const Split = styled.div`display: grid; grid-template-columns: 340px 1fr; gap: 20px; align-items: start;
  @media (max-width: 1024px) { grid-template-columns: 1fr; }`;
const Panel = styled.div`background: #fff; border: 1px solid #C7CED6; border-radius: 10px; padding: 18px;`;
const SectionTitle = styled.div`display: flex; align-items: baseline; gap: 8px; margin: 22px 0 10px;
  &:first-of-type { margin-top: 0; }`;
const SectionName = styled.h3`margin: 0; font-size: 15px; font-weight: 600; color: #0A2540;`;
const SectionHint = styled.span`font-size: 12px; color: #4B5563;`;
const ItemRow = styled.div<{ $open?: boolean }>`padding: 10px 12px; border-left: 3px solid ${p => (p.$open ? '#EF4444' : '#C7CED6')};
  background: #F9FAFB; border-radius: 0 6px 6px 0; margin-bottom: 8px;`;
const ItemTitle = styled.div`font-size: 14px; font-weight: 600; color: #0A2540;`;
const ItemDetail = styled.div`font-size: 13px; color: #4B5563; line-height: 1.55; margin-top: 4px;`;
const ItemMeta = styled.div`font-size: 11px; color: #6B7280; margin-top: 6px; font-family: ui-monospace, monospace;`;
const Badge = styled.span<{ $tone?: 'open' | 'done' | 'plain' }>`display: inline-block; padding: 1px 7px; border-radius: 10px;
  font-size: 11px; font-weight: 600; margin-left: 6px;
  background: ${p => (p.$tone === 'open' ? '#FEF2F2' : p.$tone === 'done' ? '#F0FDF4' : '#F4F6F9')};
  color: ${p => (p.$tone === 'open' ? '#B91C1C' : p.$tone === 'done' ? '#166534' : '#4B5563')};`;
const Note = styled.div`font-size: 12px; color: #4B5563; background: #F4F6F9; border: 1px solid #C7CED6;
  border-radius: 6px; padding: 10px 12px; line-height: 1.6; white-space: pre-wrap;`;
const Toggle = styled.label`display: inline-flex; align-items: center; gap: 6px; font-size: 13px; color: #0A2540; cursor: pointer;`;

const DeployRecordsPage: React.FC = () => {
  const { t } = useTranslation('admin');
  const [inquiries, setInquiries] = useState<OpenInquiry[]>([]);
  const [rows, setRows] = useState<ListRow[]>([]);
  const [detail, setDetail] = useState<Detail | null>(null);
  const [loading, setLoading] = useState(true);
  const [openOnly, setOpenOnly] = useState(false);

  const load = useCallback(async () => {
    try {
      const r = await fetch('/api/admin/deploy-records', { headers: { Authorization: `Bearer ${getAuthToken()}` } });
      const j = await r.json();
      const list: ListRow[] = j?.data || [];
      setRows(list);
      if (list.length) void openDetail(list[0].id);
    } finally { setLoading(false); }
  }, []);

  const openDetail = async (id: number) => {
    const r = await fetch(`/api/admin/deploy-records/${id}`, { headers: { Authorization: `Bearer ${getAuthToken()}` } });
    const j = await r.json();
    if (j?.data) setDetail(j.data);
  };

  useEffect(() => { void load(); }, [load]);

  // 문의는 **복사하지 않고 산다** — 배포기록에 옮겨 적으면 두 곳이 갈라진다.
  // 여기서는 읽기만 하고, 닫는 것은 사람이 문의 관리 화면에서 한다(자동 상태변경 없음).
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/support-tickets', { headers: { Authorization: `Bearer ${getAuthToken()}` } });
        if (!res.ok) return;
        const j = await res.json();
        const all: OpenInquiry[] = (j?.data || j || []) as OpenInquiry[];
        setInquiries(all
          .filter(x => x.status === 'open' || x.status === 'in-progress')
          .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt))));
      } catch { /* 이 섹션이 없다고 배포기록을 못 보면 안 된다 */ }
    })();
  }, []);

  const renderItems = (raw: Array<Item | string> | Record<string, string> | 'none' | undefined) => {
    if (!raw || raw === 'none') return <ItemDetail>{t('deployRecords.none')}</ItemDetail>;
    if (!Array.isArray(raw)) {
      return <Note>{Object.entries(raw).map(([k, v]) => `${k}: ${v}`).join('\n')}</Note>;
    }
    // 기록은 문자열 배열로도, {title, detail} 객체 배열로도 쓸 수 있다.
    // 문자열로 쓴 기록이 **빈 줄로 렌더되던 결함**을 실브라우저에서 잡았다(2026-09-03).
    // 쓰는 사람이 형식을 외우게 하지 않는다 — 화면이 둘 다 받는다.
    const norm: Item[] = raw.map(x => (typeof x === 'string' ? ({ title: x } as Item) : x));
    const items = openOnly ? norm.filter(i => i.status === 'open') : norm;
    if (!items.length) return <ItemDetail>{t('deployRecords.none')}</ItemDetail>;
    return items.map((i, n) => (
      <ItemRow key={n} $open={i.status === 'open'}>
        <ItemTitle>
          {i.title}
          {i.status && <Badge $tone={i.status === 'open' ? 'open' : i.status === 'deployed' || i.status === 'done' ? 'done' : 'plain'}>{i.status}</Badge>}
        </ItemTitle>
        {i.detail && <ItemDetail>{i.detail}</ItemDetail>}
        {(i.scope || i.who) && <ItemMeta>{[i.scope, i.who && t('deployRecords.checkedBy', { who: i.who })].filter(Boolean).join('  ·  ')}</ItemMeta>}
      </ItemRow>
    ));
  };

  return (
    <Container>
      <Header>
        <Title>{t('deployRecords.title')}</Title>
        <Toggle>
          <input type="checkbox" checked={openOnly} onChange={e => setOpenOnly(e.target.checked)} />
          {t('deployRecords.openOnly')}
        </Toggle>
      </Header>
      <Content>
        <Split>
          <DataTableContainer>
            <DataTable>
              <DataTableHead>
                <DataTableRow>
                  <DataTableHeaderCell>{t('deployRecords.colDeploy')}</DataTableHeaderCell>
                  <DataTableHeaderCell>{t('deployRecords.colDone')}</DataTableHeaderCell>
                  <DataTableHeaderCell>{t('deployRecords.colOpen')}</DataTableHeaderCell>
                </DataTableRow>
              </DataTableHead>
              <tbody>
                {rows.map(r => (
                  <DataTableRow key={r.id} onClick={() => void openDetail(r.id)} style={{ cursor: 'pointer' }}>
                    <DataTableCell>
                      <div style={{ fontWeight: 600 }}>{r.tag}</div>
                      <div style={{ fontSize: 11, color: '#6B7280' }}>
                        {new Date(r.deployed_at).toISOString().slice(0, 16).replace('T', ' ')}
                        {r.sw_version ? `  ·  SW ${r.sw_version}` : ''}
                      </div>
                    </DataTableCell>
                    <DataTableCell>{r.completed_count}</DataTableCell>
                    <DataTableCell>{r.open_issue_count > 0 ? <Badge $tone="open">{r.open_issue_count}</Badge> : 0}</DataTableCell>
                  </DataTableRow>
                ))}
              </tbody>
            </DataTable>
            {!loading && rows.length === 0 && <DataTableEmpty>{t('deployRecords.empty')}</DataTableEmpty>}

            <SectionTitle>
              <SectionName>{t('deployRecords.inquiries')}</SectionName>
              <SectionHint>{t('deployRecords.inquiriesHint')}</SectionHint>
            </SectionTitle>
            {inquiries.length === 0
              ? <ItemDetail>{t('deployRecords.inqEmpty')}</ItemDetail>
              : inquiries.map(q => {
                  // "반영: <배포태그>" 는 저장하지 않고 **계산해서** 보여준다.
                  const inTag = rows.find(r => (r.resolves || []).includes(q.ticketNumber))?.tag;
                  return (
                    <ItemRow key={q.id} $open>
                      <ItemTitle>
                        {q.subject}
                        {q.subject.startsWith('[auto]') && <Badge $tone="open">{t('deployRecords.inqCrash')}</Badge>}
                        {inTag && <Badge $tone="done">{t('deployRecords.addressedIn', { tag: inTag })}</Badge>}
                      </ItemTitle>
                      <ItemMeta>{q.ticketNumber}  ·  {String(q.createdAt).slice(0, 10)}</ItemMeta>
                    </ItemRow>
                  );
                })}
          </DataTableContainer>

          <Panel>
            {!detail ? (
              <ItemDetail>{loading ? t('deployRecords.loading') : t('deployRecords.pickOne')}</ItemDetail>
            ) : (
              <>
                <SectionTitle>
                  <SectionName>{detail.tag}</SectionName>
                  <SectionHint>
                    {new Date(detail.deployed_at).toISOString().slice(0, 16).replace('T', ' ')}
                    {detail.sw_version ? `  ·  SW ${detail.sw_version}` : ''}
                    {detail.git_commit ? `  ·  ${detail.git_commit}` : ''}
                  </SectionHint>
                </SectionTitle>
                {detail.fable_note && <Note>{detail.fable_note}</Note>}
                {SECTION_KEYS.map(k => (
                  <div key={k}>
                    <SectionTitle>
                      <SectionName>{t(`deployRecords.sections.${k}`)}</SectionName>
                      <SectionHint>{t(`deployRecords.sections.${k}Hint`)}</SectionHint>
                    </SectionTitle>
                    {renderItems(detail.sections?.[k] as any)}
                  </div>
                ))}
                <SectionTitle>
                  <SectionName>{t('deployRecords.verification')}</SectionName>
                  <SectionHint>{t('deployRecords.verificationHint')}</SectionHint>
                </SectionTitle>
                {renderItems(detail.sections?.verification as any)}
              </>
            )}
          </Panel>
        </Split>
      </Content>
    </Container>
  );
};

export default DeployRecordsPage;
