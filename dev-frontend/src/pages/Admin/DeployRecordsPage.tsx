import React, { useCallback, useEffect, useState } from 'react';
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

const SECTIONS: { key: string; label: string; hint: string }[] = [
  { key: 'behavior_changes', label: '변경 후 바뀌는 현상', hint: '이 배포로 화면·수치·동작이 달라지는 것' },
  { key: 'check_areas',      label: '추가로 체크할 영역', hint: '누가 무엇을 눈으로 확인해야 하는가' },
  { key: 'completed',        label: '완료',              hint: '이번 배포에 들어간 것' },
  { key: 'issues',           label: '이슈',              hint: '발견됐고 아직 안 닫힌 것' },
  { key: 'in_progress',      label: '작업중',            hint: '배포 시점에 진행 중' },
  { key: 'upcoming',         label: '앞으로 할 것',       hint: '다음 사이클 후보' },
];

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

  const renderItems = (raw: Item[] | Record<string, string> | 'none' | undefined) => {
    if (!raw || raw === 'none') return <ItemDetail>없음</ItemDetail>;
    if (!Array.isArray(raw)) {
      return <Note>{Object.entries(raw).map(([k, v]) => `${k}: ${v}`).join('\n')}</Note>;
    }
    const items = openOnly ? raw.filter(i => i.status === 'open') : raw;
    if (!items.length) return <ItemDetail>없음</ItemDetail>;
    return items.map((i, n) => (
      <ItemRow key={n} $open={i.status === 'open'}>
        <ItemTitle>
          {i.title}
          {i.status && <Badge $tone={i.status === 'open' ? 'open' : i.status === 'deployed' || i.status === 'done' ? 'done' : 'plain'}>{i.status}</Badge>}
        </ItemTitle>
        {i.detail && <ItemDetail>{i.detail}</ItemDetail>}
        {(i.scope || i.who) && <ItemMeta>{[i.scope, i.who && `확인: ${i.who}`].filter(Boolean).join('  ·  ')}</ItemMeta>}
      </ItemRow>
    ));
  };

  return (
    <Container>
      <Header>
        <Title>솔루션 개발이슈</Title>
        <Toggle>
          <input type="checkbox" checked={openOnly} onChange={e => setOpenOnly(e.target.checked)} />
          미해결만
        </Toggle>
      </Header>
      <Content>
        <Split>
          <DataTableContainer>
            <DataTable>
              <DataTableHead>
                <DataTableRow>
                  <DataTableHeaderCell>배포</DataTableHeaderCell>
                  <DataTableHeaderCell>완료</DataTableHeaderCell>
                  <DataTableHeaderCell>미해결</DataTableHeaderCell>
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
            {!loading && rows.length === 0 && <DataTableEmpty>배포 기록이 없습니다</DataTableEmpty>}
          </DataTableContainer>

          <Panel>
            {!detail ? (
              <ItemDetail>{loading ? '불러오는 중' : '왼쪽에서 배포를 선택하세요'}</ItemDetail>
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
                {SECTIONS.map(s => (
                  <div key={s.key}>
                    <SectionTitle>
                      <SectionName>{s.label}</SectionName>
                      <SectionHint>{s.hint}</SectionHint>
                    </SectionTitle>
                    {renderItems(detail.sections?.[s.key] as any)}
                  </div>
                ))}
                <SectionTitle>
                  <SectionName>검증 내역</SectionName>
                  <SectionHint>어떤 게이트·계약으로 확인했는가</SectionHint>
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
