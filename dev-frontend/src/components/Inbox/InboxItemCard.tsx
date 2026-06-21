import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { InboxItem, TYPE_COLORS, SEVERITY_COLORS, relativeTime } from './inboxApi';
import { formatDateTime } from '../../utils/dateFormat';

interface Props {
  item: InboxItem;
  onClick: (item: InboxItem) => void;
  showTypeBadge?: boolean;
}

const ICONS: Record<string, string> = {
  notice: '●',
  support_ticket: '●',
  operation_ticket: '●'
};

const InboxItemCard: React.FC<Props> = ({ item, onClick, showTypeBadge = true }) => {
  const { i18n, t } = useTranslation('common');
  const colors = TYPE_COLORS[item.type] || TYPE_COLORS.notice;
  const isUnread = !item.read;
  const sevColor = SEVERITY_COLORS[item.severity] || SEVERITY_COLORS.normal;

  const typeLabel = t(`inbox.type.${item.type}`, item.type);

  return (
    <Card
      $unread={isUnread}
      role="button"
      tabIndex={0}
      onClick={() => onClick(item)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(item); } }}
      title={formatDateTime(item.timestamp, undefined, i18n.language)}
    >
      <UnreadStripe $color={colors.dot} $visible={isUnread} />
      <IconCircle $bg={colors.bg} $fg={colors.fg}>
        <span aria-hidden="true">{ICONS[item.type] || '•'}</span>
      </IconCircle>
      <Body>
        <TopRow>
          <Title $unread={isUnread}>{item.title}</Title>
          {item.severity !== 'normal' && (
            <SeverityDot $color={sevColor} title={t(`inbox.severity.${item.severity}`, item.severity)} />
          )}
        </TopRow>
        {item.preview && <Preview>{item.preview}</Preview>}
        <MetaRow>
          {showTypeBadge && (
            <TypeBadge $bg={colors.bg} $fg={colors.fg}>{typeLabel}</TypeBadge>
          )}
          {item.author_name && <Meta>{item.author_name}</Meta>}
          <Meta>{relativeTime(item.timestamp, i18n.language)}</Meta>
        </MetaRow>
      </Body>
    </Card>
  );
};

export default InboxItemCard;

// ─── Styled ──────────────────────────────────────────────────

const Card = styled.div<{ $unread: boolean }>`
  position: relative;
  display: flex;
  gap: 12px;
  padding: 12px 14px 12px 18px;
  background: ${p => p.$unread ? '#F1F4F8' : 'white'};
  border: 1px solid #C7CED6;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s, transform 0.05s;
  user-select: none;

  &:hover {
    background: #F1F5F9;
    border-color: #64748B;
  }

  &:active { transform: scale(0.997); }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.18);
  }
`;

const UnreadStripe = styled.span<{ $color: string; $visible: boolean }>`
  position: absolute;
  left: 0;
  top: 8px;
  bottom: 8px;
  width: 3px;
  border-radius: 0 3px 3px 0;
  background: ${p => p.$color};
  opacity: ${p => p.$visible ? 1 : 0};
  transition: opacity 0.2s;
`;

const IconCircle = styled.div<{ $bg: string; $fg: string }>`
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${p => p.$bg};
  color: ${p => p.$fg};
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Body = styled.div`
  flex: 1;
  min-width: 0;
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 2px;
`;

const Title = styled.div<{ $unread: boolean }>`
  flex: 1;
  font-size: 14px;
  font-weight: ${p => p.$unread ? 600 : 500};
  color: #0A2540;
  line-height: 1.35;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SeverityDot = styled.span<{ $color: string }>`
  flex-shrink: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${p => p.$color};
`;

const Preview = styled.div`
  font-size: 13px;
  color: #4B5563;
  line-height: 1.45;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 6px;
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

const TypeBadge = styled.span<{ $bg: string; $fg: string }>`
  background: ${p => p.$bg};
  color: ${p => p.$fg};
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 10px;
  text-transform: capitalize;
`;

const Meta = styled.span`
  font-size: 12px;
  color: #6B7280;
`;
