import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

interface ContractStageBarProps {
  currentStage: string;
}

const STAGES = ['proposal', 'contracting', 'setup', 'active'];

const BarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 16px 0;
`;

const StageStep = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Dot = styled.div<{ isActive: boolean; isPast: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
  background: ${p => p.isActive ? '#635BFF' : p.isPast ? '#059669' : '#E6EBF1'};
  color: ${p => (p.isActive || p.isPast) ? '#fff' : '#6B7C93'};
`;

const StepLabel = styled.span<{ isActive: boolean; isPast: boolean }>`
  font-size: 13px;
  font-weight: ${p => p.isActive ? 600 : 400};
  color: ${p => p.isActive ? '#0A2540' : p.isPast ? '#059669' : '#6B7C93'};
`;

const Line = styled.div<{ isPast: boolean }>`
  flex: 1;
  height: 2px;
  background: ${p => p.isPast ? '#059669' : '#E6EBF1'};
`;

const ContractStageBar: React.FC<ContractStageBarProps> = ({ currentStage }) => {
  const { t } = useTranslation('contract');
  const currentIndex = STAGES.indexOf(currentStage);

  const labels: Record<string, string> = {
    proposal: t('stages.proposal', 'Proposal'),
    contracting: t('stages.contracting', 'Contracting'),
    setup: t('stages.setup', 'Setup'),
    active: t('stages.active', 'Active')
  };

  return (
    <BarContainer>
      {STAGES.map((stage, i) => (
        <React.Fragment key={stage}>
          <StageStep>
            <Dot isActive={i === currentIndex} isPast={i < currentIndex}>
              {i < currentIndex ? '✓' : i + 1}
            </Dot>
            <StepLabel isActive={i === currentIndex} isPast={i < currentIndex}>
              {labels[stage]}
            </StepLabel>
          </StageStep>
          {i < STAGES.length - 1 && <Line isPast={i < currentIndex} />}
        </React.Fragment>
      ))}
    </BarContainer>
  );
};

export default ContractStageBar;
