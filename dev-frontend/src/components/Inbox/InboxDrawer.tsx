import React, { useEffect, useRef, useState, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchInbox, markNoticeRead, markAllRead, InboxItem, InboxFilter } from './inboxApi';
import InboxItemCard from './InboxItemCard';

interface Props {
  open: boolean;
  onClose: () => void;
  onItemRead?: () => void;
}

const FILTERS: { value: InboxFilter; key: string; defaultLabel: string }[] = [
  { value: 'all',              key: 'inbox.filter.all',     defaultLabel: 'All' },
  { value: 'notice',           key: 'inbox.filter.notice',  defaultLabel: 'Notices' },
  { value: 'support_ticket',   key: 'inbox.filter.support', defaultLabel: 'Support' },
  { value: 'operation_ticket', key: 'inbox.filter.ops',     defaultLabel: 'Ops' }
];

const InboxDrawer: React.FC<Props> = ({ open, onClose, onItemRead }) => {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const [filter, setFilter] = useState<InboxFilter>('all');
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [items, setItems] = useState<InboxItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({ notice: 0, support_ticket: 0, operation_ticket: 0, total: 0 });
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const r = await fetchInbox({ type: filter, unreadOnly, limit: 20 });
    setItems(Array.isArray(r.data) ? r.data : []);
    setCounts(r.unread_count || { notice: 0, support_ticket: 0, operation_ticket: 0, total: 0 });
    setLoading(false);
  }, [filter, unreadOnly]);

  useEffect(() => {
    if (open) load();
  }, [open, load]);

  // ESC + focus management
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    closeBtnRef.current?.focus();
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const onItemClick = async (item: InboxItem) => {
    // Optimistic mark-as-read for notices
    if (item.type === 'notice' && !item.read && item.source?.id) {
      setItems(prev => prev.map(i => i.id === item.id ? { ...i, read: true } : i));
      markNoticeRead(item.source.id).then(() => onItemRead && onItemRead());
    }
    onClose();
    navigate(item.link);
  };

  const onMarkAll = async () => {
    const n = await markAllRead('notice');
    if (n > 0) {
      setItems(prev => prev.map(i => i.type === 'notice' ? { ...i, read: true } : i));
      onItemRead && onItemRead();
      load();
    }
  };

  const visibleItems = unreadOnly ? items.filter(i => !i.read) : items;

  return (
    <>
      <Backdrop $open={open} onClick={onClose} aria-hidden={!open} />
      <Drawer
        ref={drawerRef}
        $open={open}
        role="dialog"
        aria-modal="true"
        aria-label={t('inbox.drawer.title', 'Inbox')}
      >
        <Header>
          <HeaderTitle>{t('inbox.drawer.title', 'Inbox')}</HeaderTitle>
          <HeaderActions>
            <SmallBtn type="button" onClick={onMarkAll} title={t('inbox.markAllRead', 'Mark all as read')}>
              ✓ {t('inbox.markAllRead', 'Mark all read')}
            </SmallBtn>
            <CloseBtn ref={closeBtnRef} type="button" onClick={onClose} aria-label={t('button.close', 'Close')}>
              ×
            </CloseBtn>
          </HeaderActions>
        </Header>

        <FilterBar role="tablist">
          {FILTERS.map(f => {
            const c = f.value === 'all' ? counts.total
              : f.value === 'notice' ? counts.notice
              : f.value === 'support_ticket' ? counts.support_ticket
              : counts.operation_ticket;
            return (
              <FilterPill
                key={f.value}
                role="tab"
                type="button"
                aria-selected={filter === f.value}
                $active={filter === f.value}
                onClick={() => setFilter(f.value)}
              >
                {t(f.key, f.defaultLabel)}
                {c > 0 && <PillCount $active={filter === f.value}>{c}</PillCount>}
              </FilterPill>
            );
          })}
        </FilterBar>

        <ToggleRow>
          <ToggleLabel>
            <input
              type="checkbox"
              checked={unreadOnly}
              onChange={e => setUnreadOnly(e.target.checked)}
            />
            {t('inbox.unreadOnly', 'Show unread only')}
          </ToggleLabel>
        </ToggleRow>

        <Body>
          {loading ? (
            <SkeletonList>
              {[0, 1, 2, 3, 4].map(i => <SkeletonCard key={i} />)}
            </SkeletonList>
          ) : visibleItems.length === 0 ? (
            <EmptyState>
              <EmptyIcon aria-hidden="true">📬</EmptyIcon>
              <EmptyTitle>{t('inbox.empty.title', "You're all caught up!")}</EmptyTitle>
              <EmptyDesc>
                {unreadOnly
                  ? t('inbox.empty.unread', 'No unread items right now.')
                  : t('inbox.empty.all', 'New notifications will appear here.')}
              </EmptyDesc>
            </EmptyState>
          ) : (
            <ItemList>
              {visibleItems.map(item => (
                <InboxItemCard key={item.id} item={item} onClick={onItemClick} />
              ))}
            </ItemList>
          )}
        </Body>

        <Footer>
          <FooterLink type="button" onClick={() => { onClose(); navigate('/pos/inbox'); }}>
            {t('inbox.viewAll', 'View all in Inbox →')}
          </FooterLink>
        </Footer>
      </Drawer>
    </>
  );
};

export default InboxDrawer;

// ─── Styled ──────────────────────────────────────────────────

const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;

const Backdrop = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(10, 37, 64, 0.45);
  z-index: 9998;
  opacity: ${p => p.$open ? 1 : 0};
  pointer-events: ${p => p.$open ? 'auto' : 'none'};
  transition: opacity 0.2s ease;
  animation: ${fadeIn} 0.2s ease;
`;

const Drawer = styled.div<{ $open: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 420px;
  max-width: 100%;
  background: white;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  transform: translateX(${p => p.$open ? '0' : '100%'});
  transition: transform 0.25s cubic-bezier(0.32, 0.72, 0, 1);
  box-shadow: -8px 0 32px rgba(0, 0, 0, 0.15);

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #C7CED6;
  flex-shrink: 0;
`;

const HeaderTitle = styled.h2`
  margin: 0;
  font-size: 17px;
  font-weight: 700;
  color: #0A2540;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const SmallBtn = styled.button`
  background: none;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  padding: 5px 10px;
  font-size: 12px;
  color: #374151;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
  &:hover { background: #F1F4F8; border-color: #64748B; }
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  font-size: 26px;
  line-height: 1;
  color: #4B5563;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  &:hover { color: #0A2540; background: #F1F4F8; }
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(99,91,255,0.18);
  }
`;

const FilterBar = styled.div`
  display: flex;
  gap: 6px;
  padding: 12px 16px 8px;
  overflow-x: auto;
  flex-shrink: 0;

  &::-webkit-scrollbar { display: none; }
  scrollbar-width: none;
`;

const FilterPill = styled.button<{ $active: boolean }>`
  background: ${p => p.$active ? '#0A2540' : '#F1F4F8'};
  color: ${p => p.$active ? 'white' : '#374151'};
  border: none;
  border-radius: 16px;
  padding: 6px 14px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: background 0.15s;
  &:hover { background: ${p => p.$active ? '#0A2540' : '#C7CED6'}; }
`;

const PillCount = styled.span<{ $active: boolean }>`
  background: ${p => p.$active ? 'rgba(255,255,255,0.25)' : '#DC2626'};
  color: white;
  font-size: 11px;
  font-weight: 600;
  padding: 1px 6px;
  border-radius: 8px;
  min-width: 16px;
  text-align: center;
`;

const ToggleRow = styled.div`
  padding: 0 20px 10px;
  flex-shrink: 0;
`;

const ToggleLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #4B5563;
  cursor: pointer;
  user-select: none;

  input { cursor: pointer; }
`;

const Body = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 4px 16px 16px;
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SkeletonList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const skeletonPulse = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

const SkeletonCard = styled.div`
  height: 76px;
  border-radius: 10px;
  background: linear-gradient(90deg, #F1F4F8 0%, #C7CED6 50%, #F1F4F8 100%);
  background-size: 200px 100%;
  animation: ${skeletonPulse} 1.4s linear infinite;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 60px 24px;
  color: #4B5563;
`;

const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: 12px;
  opacity: 0.6;
`;

const EmptyTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 6px;
`;

const EmptyDesc = styled.div`
  font-size: 13px;
  line-height: 1.5;
`;

const Footer = styled.footer`
  border-top: 1px solid #C7CED6;
  padding: 12px 20px;
  flex-shrink: 0;
`;

const FooterLink = styled.button`
  background: none;
  border: none;
  color: #635BFF;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  padding: 6px 0;
  &:hover { text-decoration: underline; }
`;
