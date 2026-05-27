// TourTrigger — header button to (re)start a walkthrough.
// Doesn't render its own tour; just dispatches the start event for whichever
// <Walkthrough> is mounted on the current page.

import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { startTour } from '../../hooks/useTourProgress';

interface Props {
  tourKey: string;
  /** Smaller variant for tight headers */
  compact?: boolean;
  className?: string;
}

const TourTrigger: React.FC<Props> = ({ tourKey, compact, className }) => {
  const { t } = useTranslation('walkthrough');
  return (
    <Btn
      type="button"
      data-tour="header-tour-trigger"
      className={className}
      $compact={!!compact}
      onClick={() => startTour(tourKey)}
      title={t('trigger.title', 'Replay the introduction tour')}
      aria-label={t('trigger.ariaLabel', 'Show me around')}
    >
      <Icon aria-hidden>?</Icon>
      <Label>{t('trigger.label', 'Show me around')}</Label>
    </Btn>
  );
};

export default TourTrigger;

const Btn = styled.button<{ $compact: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: ${p => p.$compact ? '4px 8px' : '6px 12px'};
  background: white;
  border: 1px solid #E0E7FF;
  border-radius: 999px;
  color: #374151;
  font-size: 12.5px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: #F1F0FF;
    border-color: #C7D2FE;
    color: #635BFF;
  }
`;

const Icon = styled.span`
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
`;

const Label = styled.span`
  white-space: nowrap;

  @media (max-width: 768px) {
    display: none;
  }
`;
