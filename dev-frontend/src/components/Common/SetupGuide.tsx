import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export interface SetupItem {
  key: string;
  label: string;
  description: string;
  path: string;
  completed: boolean;
  /**
   * Optional list of other setup-item keys that should be completed first.
   * If any dependency is not yet completed AND this item itself is not done,
   * the SetupGuide renders the row in a "locked" visual state (still clickable
   * — never block the user, just guide them to the natural order).
   */
  dependsOn?: string[];
}

interface SetupGuideProps {
  items: SetupItem[];
  entityId?: string | number;
}

const SetupGuide: React.FC<SetupGuideProps> = ({ items, entityId }) => {
  const navigate = useNavigate();
  const storageKey = `setup_guide_dismissed_${entityId || 'default'}`;

  const completedCount = items.filter(i => i.completed).length;
  const allDone = completedCount === items.length;

  // Auto-hide when all complete, or if user dismissed
  const [dismissed, setDismissed] = React.useState(() => {
    if (allDone) return true;
    return localStorage.getItem(storageKey) === 'true';
  });
  const [blockedKey, setBlockedKey] = React.useState<string | null>(null);
  const blockedTimerRef = React.useRef<number | null>(null);
  const flashBlocked = (key: string) => {
    setBlockedKey(key);
    if (blockedTimerRef.current) window.clearTimeout(blockedTimerRef.current);
    blockedTimerRef.current = window.setTimeout(() => setBlockedKey(null), 3000);
  };
  React.useEffect(() => () => { if (blockedTimerRef.current) window.clearTimeout(blockedTimerRef.current); }, []);

  // Re-show if something becomes incomplete after dismiss
  React.useEffect(() => {
    if (allDone) {
      localStorage.setItem(storageKey, 'true');
      setDismissed(true);
    }
  }, [allDone, storageKey]);

  if (dismissed) return null;

  const incomplete = items.filter(i => !i.completed);

  return (
    <Container>
      <GuideHeader>
        <HeaderLeft>
          <GuideTitle>Complete Your Setup</GuideTitle>
          <Progress>{completedCount}/{items.length} completed</Progress>
        </HeaderLeft>
        <DismissButton onClick={() => {
          localStorage.setItem(storageKey, 'true');
          setDismissed(true);
        }}>
          Dismiss
        </DismissButton>
      </GuideHeader>

      <ProgressBar>
        <ProgressFill style={{ width: `${(completedCount / items.length) * 100}%` }} />
      </ProgressBar>

      <ItemList>
        {incomplete.map(item => {
          const deps = item.dependsOn || [];
          const blockingDeps = deps
            .map(k => items.find(i => i.key === k))
            .filter((i): i is SetupItem => !!i && !i.completed);
          const locked = blockingDeps.length > 0;
          const tooltip = locked
            ? `Complete first: ${blockingDeps.map(d => d.label).join(', ')}`
            : '';
          const isBlockedFlash = blockedKey === item.key;
          return (
            <Item
              key={item.key}
              $locked={locked}
              $flash={isBlockedFlash}
              title={tooltip}
              onClick={() => {
                if (locked) { flashBlocked(item.key); return; }
                navigate(item.path);
              }}
            >
              <ItemIcon>{locked ? '\u{1F512}' : '○'}</ItemIcon>
              <ItemContent>
                <ItemLabel>{item.label}</ItemLabel>
                <ItemDesc>
                  {isBlockedFlash
                    ? `Complete first: ${blockingDeps.map(d => d.label).join(', ')}`
                    : item.description}
                </ItemDesc>
              </ItemContent>
              <ItemArrow>&rarr;</ItemArrow>
            </Item>
          );
        })}
      </ItemList>
    </Container>
  );
};

export default SetupGuide;

// ─── Styled Components ───────────────────────────────────────

const Container = styled.div`
  background: white;
  border: 1px solid #E0E7FF;
  border-left: 4px solid #635BFF;
  border-radius: 12px;
  padding: 20px 24px;
  margin-bottom: 24px;
`;

const GuideHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const GuideTitle = styled.h3`
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`;

const Progress = styled.span`
  font-size: 13px;
  color: #4B5563;
`;

const DismissButton = styled.button`
  background: none;
  border: none;
  font-size: 13px;
  color: #6B7280;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;

  &:hover {
    color: #4B5563;
    background: #F1F4F8;
  }
`;

const ProgressBar = styled.div`
  height: 4px;
  background: #C7CED6;
  border-radius: 2px;
  margin-bottom: 16px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: #635BFF;
  border-radius: 2px;
  transition: width 0.3s ease;
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Item = styled.div<{ $locked?: boolean; $flash?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  cursor: ${p => p.$locked ? 'not-allowed' : 'pointer'};
  transition: background 0.15s, opacity 0.15s;
  opacity: ${p => p.$locked ? 0.55 : 1};
  background: ${p => p.$flash ? '#FFFBEB' : 'transparent'};
  border: 1px solid ${p => p.$flash ? '#FDE68A' : 'transparent'};

  &:hover {
    background: ${p => p.$flash ? '#FFFBEB' : '#F1F4F8'};
    opacity: ${p => p.$locked ? 0.75 : 1};
  }
`;

const ItemIcon = styled.span`
  font-size: 16px;
  color: #6B7280;
  flex-shrink: 0;
`;

const ItemContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const ItemLabel = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
`;

const ItemDesc = styled.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 1px;
`;

const ItemArrow = styled.span`
  font-size: 14px;
  color: #6B7280;
  flex-shrink: 0;
`;
