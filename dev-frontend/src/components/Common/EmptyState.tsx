// EmptyState — 표준 빈 상태 컴포넌트.
// "No data" 단순 텍스트 → 시각 위계 (아이콘 + 제목 + 설명 + 1차 CTA + 2차 link).
// 30년차 UI/UX: 빈 상태도 자체로 navigation/onboarding 기회.

import React from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  text-align: center;
  background: #F9FAFB;
  border: 1px dashed #C7CED6;
  border-radius: 12px;
  min-height: 200px;
`;


const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 6px;
`;

const Description = styled.div`
  font-size: 13.5px;
  color: #4B5563;
  line-height: 1.6;
  max-width: 420px;
  margin-bottom: 20px;
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
`;

const PrimaryBtn = styled.button`
  background: #635BFF;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 9px 18px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
  &:hover { background: #5A51E6; }
`;

const SecondaryBtn = styled.button`
  background: white;
  color: #635BFF;
  border: 1px solid #D4D0FF;
  border-radius: 8px;
  padding: 9px 18px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  &:hover { background: #F1F0FF; }
`;

const Steps = styled.div`
  margin-top: 18px;
  padding: 12px 16px;
  background: white;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  font-size: 12.5px;
  color: #374151;
  line-height: 1.7;
  max-width: 420px;
  text-align: left;
`;

const StepNum = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #635BFF;
  color: white;
  font-size: 11px;
  font-weight: 700;
  margin-right: 8px;
`;

interface Action {
  label: string;
  onClick?: () => void;
  href?: string;
}

interface Props {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  primaryAction?: Action;
  secondaryAction?: Action;
  steps?: Array<{ label: string }>;
}


const EmptyState: React.FC<Props> = ({ title, description, primaryAction, secondaryAction, steps }) => {
  const handle = (a?: Action) => {
    if (!a) return;
    if (a.onClick) return a.onClick();
    if (a.href) window.open(a.href, a.href.startsWith('http') ? '_blank' : '_self');
  };

  return (
    <Wrap>
      {/* 2026-11-10 전 역할 통일(R7·RA 기준): 빈 상태는 글자만 — 아이콘 그림 안 그림(icon 값은 받기만) */}
      <Title>{title}</Title>
      {description && <Description>{description}</Description>}
      {(primaryAction || secondaryAction) && (
        <Actions>
          {primaryAction && <PrimaryBtn type="button" onClick={() => handle(primaryAction)}>{primaryAction.label}</PrimaryBtn>}
          {secondaryAction && <SecondaryBtn type="button" onClick={() => handle(secondaryAction)}>{secondaryAction.label}</SecondaryBtn>}
        </Actions>
      )}
      {steps && steps.length > 0 && (
        <Steps>
          {steps.map((s, i) => (
            <div key={i} style={{ marginBottom: i === steps.length - 1 ? 0 : 4 }}>
              <StepNum>{i + 1}</StepNum>{s.label}
            </div>
          ))}
        </Steps>
      )}
    </Wrap>
  );
};

export default EmptyState;
