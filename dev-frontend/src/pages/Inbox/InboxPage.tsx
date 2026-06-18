import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchInbox, markNoticeRead, markAllRead, InboxItem, InboxFilter } from '../../components/Inbox/inboxApi';
import InboxItemCard from '../../components/Inbox/InboxItemCard';

const TYPE_TABS: { value: InboxFilter; key: string; defaultLabel: string }[] = [
  { value: 'all',              key: 'inbox.filter.all',     defaultLabel: 'All' },
  { value: 'notice',           key: 'inbox.filter.notice',  defaultLabel: 'Notices' },
  { value: 'support_ticket',   key: 'inbox.filter.support', defaultLabel: 'Support tickets' },
  { value: 'operation_ticket', key: 'inbox.filter.ops',     defaultLabel: 'Operation tickets' }
];

type StatusFilter = 'all' | 'unread' | 'read';

const InboxPage: React.FC = () => {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const [type, setType] = useState<InboxFilter>('all');
  const [status, setStatus] = useState<StatusFilter>('all');
  const [search, setSearch] = useState('');
  const [items, setItems] = useState<InboxItem[]>([]);
  const [counts, setCounts] = useState({ notice: 0, support_ticket: 0, operation_ticket: 0, total: 0 });
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const r = await fetchInbox({ type, unreadOnly: status === 'unread', limit: 100 });
    setItems(Array.isArray(r.data) ? r.data : []);
    setCounts(r.unread_count || { notice: 0, support_ticket: 0, operation_ticket: 0, total: 0 });
    setLoading(false);
  }, [type, status]);

  useEffect(() => { load(); }, [load]);

  const filtered = items
    .filter(i => status === 'all' ? true : status === 'unread' ? !i.read : i.read)
    .filter(i => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return i.title.toLowerCase().includes(q) || i.preview.toLowerCase().includes(q);
    });

  const onItemClick = async (item: InboxItem) => {
    if (item.type === 'notice' && !item.read && item.source?.id) {
      setItems(prev => prev.map(i => i.id === item.id ? { ...i, read: true } : i));
      markNoticeRead(item.source.id);
    }
    navigate(item.link);
  };

  const onMarkAll = async () => {
    const n = await markAllRead('notice');
    if (n > 0) {
      setItems(prev => prev.map(i => i.type === 'notice' ? { ...i, read: true } : i));
      load();
    }
  };

  return (
    <Container>
      <Header>
        <PageTitle>{t('inbox.page.title', 'Inbox')}</PageTitle>
        <HeaderRight>
          <SecondaryBtn type="button" onClick={onMarkAll}>
            ✓ {t('inbox.markAllRead', 'Mark all as read')}
          </SecondaryBtn>
        </HeaderRight>
      </Header>

      <Content>
        <Toolbar>
          <Tabs role="tablist">
            {TYPE_TABS.map(tab => {
              const c = tab.value === 'all' ? counts.total
                : tab.value === 'notice' ? counts.notice
                : tab.value === 'support_ticket' ? counts.support_ticket
                : counts.operation_ticket;
              return (
                <Tab
                  key={tab.value}
                  role="tab"
                  type="button"
                  aria-selected={type === tab.value}
                  $active={type === tab.value}
                  onClick={() => setType(tab.value)}
                >
                  {t(tab.key, tab.defaultLabel)}
                  {c > 0 && <TabCount $active={type === tab.value}>{c}</TabCount>}
                </Tab>
              );
            })}
          </Tabs>

          <RightControls>
            <StatusGroup>
              <SegBtn type="button" $active={status === 'all'}    onClick={() => setStatus('all')}>{t('inbox.status.all', 'All')}</SegBtn>
              <SegBtn type="button" $active={status === 'unread'} onClick={() => setStatus('unread')}>{t('inbox.status.unread', 'Unread')}</SegBtn>
              <SegBtn type="button" $active={status === 'read'}   onClick={() => setStatus('read')}>{t('inbox.status.read', 'Read')}</SegBtn>
            </StatusGroup>
            <SearchInput
              type="search"
              placeholder={t('inbox.searchPlaceholder', 'Search title or preview')}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </RightControls>
        </Toolbar>

        {loading && filtered.length === 0 ? (
          <Skeleton>{[0,1,2,3,4,5].map(i => <SkeletonRow key={i} />)}</Skeleton>
        ) : filtered.length === 0 ? (
          <Empty>
            <EmptyIcon aria-hidden="true">📭</EmptyIcon>
            <EmptyTitle>{t('inbox.empty.title', "You're all caught up!")}</EmptyTitle>
            <EmptyDesc>
              {search.trim()
                ? t('inbox.empty.search', 'No items match your search.')
                : status === 'unread'
                ? t('inbox.empty.unread', 'No unread items right now.')
                : t('inbox.empty.all', 'New notifications will appear here.')}
            </EmptyDesc>
          </Empty>
        ) : (
          <>
            <ResultMeta>
              {t('inbox.resultCount', '{{count}} items', { count: filtered.length })}
            </ResultMeta>
            <List>
              {filtered.map(item => (
                <InboxItemCard key={item.id} item={item} onClick={onItemClick} />
              ))}
            </List>
          </>
        )}
      </Content>
    </Container>
  );
};

export default InboxPage;

// ─── Styled ──────────────────────────────────────────────────

const Container = styled.div`
  min-height: 100vh;
`;

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

  @media (max-width: 768px) {
    padding: 16px;
    height: auto;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) { font-size: 20px; }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SecondaryBtn = styled.button`
  background: white;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  padding: 8px 14px;
  font-size: 13px;
  color: #374151;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
  &:hover { background: #F1F4F8; border-color: #64748B; }
`;

const Content = styled.div`
  padding: 24px 32px;
  max-width: 880px;
  margin: 0 auto;

  @media (max-width: 768px) { padding: 20px 16px; }
`;

const Toolbar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
`;

const Tabs = styled.div`
  display: flex;
  gap: 4px;
  border-bottom: 1px solid #C7CED6;
  overflow-x: auto;

  &::-webkit-scrollbar { display: none; }
  scrollbar-width: none;
`;

const Tab = styled.button<{ $active: boolean }>`
  background: none;
  border: none;
  padding: 10px 14px;
  font-size: 14px;
  font-weight: 500;
  color: ${p => p.$active ? '#0A2540' : '#4B5563'};
  cursor: pointer;
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
  &:after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: ${p => p.$active ? '#635BFF' : 'transparent'};
    transition: background 0.15s;
  }
  &:hover { color: #0A2540; }
`;

const TabCount = styled.span<{ $active: boolean }>`
  background: ${p => p.$active ? '#635BFF' : '#C7CED6'};
  color: ${p => p.$active ? 'white' : '#4B5563'};
  font-size: 11px;
  font-weight: 600;
  padding: 1px 7px;
  border-radius: 10px;
`;

const RightControls = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
`;

const StatusGroup = styled.div`
  display: inline-flex;
  background: #F1F4F8;
  border-radius: 8px;
  padding: 2px;
`;

const SegBtn = styled.button<{ $active: boolean }>`
  background: ${p => p.$active ? 'white' : 'transparent'};
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 500;
  color: ${p => p.$active ? '#0A2540' : '#4B5563'};
  cursor: pointer;
  box-shadow: ${p => p.$active ? '0 1px 2px rgba(0,0,0,0.08)' : 'none'};
  transition: background 0.15s;
  &:hover { color: #0A2540; }
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 200px;
  padding: 8px 12px;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  font-size: 13px;
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99,91,255,0.1);
  }
`;

const ResultMeta = styled.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 8px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Skeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SkeletonRow = styled.div`
  height: 76px;
  border-radius: 10px;
  background: #F1F4F8;
`;

const Empty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 80px 24px;
  background: white;
  border: 1px dashed #C7CED6;
  border-radius: 12px;
  color: #4B5563;
`;

const EmptyIcon = styled.div`
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.6;
`;

const EmptyTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 6px;
`;

const EmptyDesc = styled.div`
  font-size: 14px;
  line-height: 1.5;
  max-width: 340px;
`;
