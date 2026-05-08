// Walkthrough — overlay-based step tour with spotlight + tooltip.
// Self-contained: no external library. Uses 4-rect overlay for spotlight cutout
// (better cross-browser support than CSS clip-path).
//
// Usage:
//   <Walkthrough tourKey="fg_dashboard" steps={[...]} version={1} autoStart />
//
// Auto-start fires once per session when:
//   - user has not completed/skipped this tour at this version
//   - target of step 1 exists in the DOM (with a small retry window)
//
// Force-start anywhere via:
//   import { startTour } from '../hooks/useTourProgress';
//   startTour('fg_dashboard');

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useTourProgress, shouldAutoStart, TOUR_START_EVENT } from '../../hooks/useTourProgress';

export interface TourStep {
  selector: string;
  title: string;
  description: string;
  position?: 'auto' | 'top' | 'bottom' | 'left' | 'right';
  scrollIntoView?: boolean;
}

interface Props {
  tourKey: string;
  steps: TourStep[];
  version?: number;
  autoStart?: boolean;
}

interface Rect { top: number; left: number; width: number; height: number; }

const SPOT_PAD = 6;          // 타겟 주변 여백
const TOOLTIP_GAP = 12;      // 타겟과 툴팁 사이
const TOOLTIP_W = 340;
const POLL_INTERVAL = 60;    // 타겟 등장 폴링
const POLL_TIMEOUT = 3000;   // 최대 폴링 시간

function getRect(el: Element): Rect {
  const r = el.getBoundingClientRect();
  return { top: r.top, left: r.left, width: r.width, height: r.height };
}

function pickPosition(rect: Rect, hint: TourStep['position']): 'top' | 'bottom' | 'left' | 'right' {
  if (hint && hint !== 'auto') return hint;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const space = {
    bottom: vh - (rect.top + rect.height),
    top: rect.top,
    right: vw - (rect.left + rect.width),
    left: rect.left
  };
  // tooltip 높이 추정 ~ 180px, 폭 TOOLTIP_W
  if (space.bottom >= 180) return 'bottom';
  if (space.top >= 180) return 'top';
  if (space.right >= TOOLTIP_W + 24) return 'right';
  if (space.left >= TOOLTIP_W + 24) return 'left';
  return 'bottom';
}

function tooltipStyle(rect: Rect, pos: 'top' | 'bottom' | 'left' | 'right'): React.CSSProperties {
  const pad = SPOT_PAD + TOOLTIP_GAP;
  const vw = window.innerWidth;
  const center = rect.left + rect.width / 2;
  const verticalCenter = rect.top + rect.height / 2;
  switch (pos) {
    case 'bottom':
      return { top: rect.top + rect.height + pad, left: Math.max(12, Math.min(vw - TOOLTIP_W - 12, center - TOOLTIP_W / 2)) };
    case 'top':
      return { top: rect.top - pad, left: Math.max(12, Math.min(vw - TOOLTIP_W - 12, center - TOOLTIP_W / 2)), transform: 'translateY(-100%)' };
    case 'right':
      return { top: Math.max(12, verticalCenter - 90), left: rect.left + rect.width + pad };
    case 'left':
      return { top: Math.max(12, verticalCenter - 90), left: rect.left - pad, transform: 'translateX(-100%)' };
  }
}

const Walkthrough: React.FC<Props> = ({ tourKey, steps, version = 1, autoStart = true }) => {
  const { t } = useTranslation('walkthrough');
  const { progress, loading, setStep } = useTourProgress();
  const [active, setActive] = useState(false);
  const [stepIdx, setStepIdx] = useState(0);
  const [rect, setRect] = useState<Rect | null>(null);
  const startedRef = useRef(false);

  const current = steps[stepIdx];

  const closeAndMark = useCallback((kind: 'completed' | 'skipped') => {
    setActive(false);
    setStep(tourKey, { [kind]: true, version });
  }, [setStep, tourKey, version]);

  // Imperative start listener
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (!detail || detail.tourKey !== tourKey) return;
      setStepIdx(0);
      setActive(true);
    };
    window.addEventListener(TOUR_START_EVENT, handler);
    return () => window.removeEventListener(TOUR_START_EVENT, handler);
  }, [tourKey]);

  // Auto-start logic — runs once per mount after progress loads
  useEffect(() => {
    if (loading || !autoStart || startedRef.current || steps.length === 0) return;
    if (!shouldAutoStart(progress[tourKey], version)) {
      startedRef.current = true;
      return;
    }
    // Wait for target of step 1 to appear (sidebar lazy-mounts in some routes)
    const start = Date.now();
    const tick = () => {
      if (startedRef.current) return;
      const el = document.querySelector(steps[0].selector);
      if (el) {
        startedRef.current = true;
        setStepIdx(0);
        setActive(true);
        return;
      }
      if (Date.now() - start > POLL_TIMEOUT) {
        startedRef.current = true; // 타임아웃 시 자동 시작 포기 (헤더 트리거로는 시작 가능)
        return;
      }
      setTimeout(tick, POLL_INTERVAL);
    };
    tick();
  }, [loading, autoStart, progress, tourKey, version, steps]);

  // Track target rect — recompute on resize/scroll/step change
  useEffect(() => {
    if (!active || !current) { setRect(null); return; }
    const compute = () => {
      const el = document.querySelector(current.selector);
      if (!el) { setRect(null); return; }
      if (current.scrollIntoView !== false) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
      }
      // Smooth scroll → wait a tick for final position
      requestAnimationFrame(() => {
        const target = document.querySelector(current.selector);
        if (target) setRect(getRect(target));
      });
    };
    compute();
    const onResize = () => compute();
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onResize, true);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onResize, true);
    };
  }, [active, current, stepIdx]);

  // Body scroll lock while active
  useEffect(() => {
    if (!active) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = original; };
  }, [active]);

  const goNext = () => {
    if (stepIdx + 1 >= steps.length) closeAndMark('completed');
    else setStepIdx(stepIdx + 1);
  };
  const goBack = () => { if (stepIdx > 0) setStepIdx(stepIdx - 1); };

  if (!active || !current) return null;

  const pos = rect ? pickPosition(rect, current.position) : 'bottom';
  const ttStyle = rect ? tooltipStyle(rect, pos) : { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
  const isLast = stepIdx + 1 >= steps.length;

  // 4-rect overlay creates a hole around the target
  const overlayParts = rect ? [
    { top: 0, left: 0, right: 0, height: Math.max(0, rect.top - SPOT_PAD) },
    { top: Math.max(0, rect.top - SPOT_PAD), left: 0, width: Math.max(0, rect.left - SPOT_PAD), height: rect.height + SPOT_PAD * 2 },
    { top: Math.max(0, rect.top - SPOT_PAD), left: rect.left + rect.width + SPOT_PAD, right: 0, height: rect.height + SPOT_PAD * 2 },
    { top: rect.top + rect.height + SPOT_PAD, left: 0, right: 0, bottom: 0 }
  ] : null;

  return (
    <Root role="dialog" aria-modal="true" aria-labelledby="walkthrough-title">
      {overlayParts ? (
        overlayParts.map((p, i) => <Mask key={i} style={p as React.CSSProperties} />)
      ) : (
        <Mask style={{ inset: 0 } as React.CSSProperties} />
      )}

      {rect && (
        <Spot style={{
          top: rect.top - SPOT_PAD,
          left: rect.left - SPOT_PAD,
          width: rect.width + SPOT_PAD * 2,
          height: rect.height + SPOT_PAD * 2
        }} />
      )}

      <Tooltip style={ttStyle}>
        <Progress>
          {stepIdx + 1} / {steps.length}
        </Progress>
        <Title id="walkthrough-title">{current.title}</Title>
        <Desc>{current.description}</Desc>
        <Actions>
          <SkipBtn type="button" onClick={() => closeAndMark('skipped')}>
            {t('skip', 'Skip tour')}
          </SkipBtn>
          <RightBtns>
            {stepIdx > 0 && (
              <SecondaryBtn type="button" onClick={goBack}>
                {t('back', 'Back')}
              </SecondaryBtn>
            )}
            <PrimaryBtn type="button" onClick={goNext}>
              {isLast ? t('done', 'Got it') : t('next', 'Next')}
            </PrimaryBtn>
          </RightBtns>
        </Actions>
      </Tooltip>
    </Root>
  );
};

export default Walkthrough;

// ─── Styles ─────────────────────────────────────────────────

const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;

const Root = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10000;
  pointer-events: auto;
  animation: ${fadeIn} 0.2s ease;
`;

const Mask = styled.div`
  position: fixed;
  background: rgba(10, 37, 64, 0.55);
  pointer-events: auto;
`;

const Spot = styled.div`
  position: fixed;
  border-radius: 10px;
  box-shadow: 0 0 0 4px rgba(99, 91, 255, 0.45), 0 0 24px rgba(99, 91, 255, 0.5);
  pointer-events: none;
  transition: top 0.2s, left 0.2s, width 0.2s, height 0.2s;
`;

const Tooltip = styled.div`
  position: fixed;
  width: ${TOOLTIP_W}px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.18);
  padding: 18px 20px;
  z-index: 10001;
`;

const Progress = styled.div`
  font-size: 11px;
  font-weight: 600;
  color: #635BFF;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #0A2540;
  margin: 0 0 6px;
`;

const Desc = styled.div`
  font-size: 13px;
  line-height: 1.55;
  color: #4B5563;
  margin-bottom: 16px;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

const RightBtns = styled.div`
  display: flex;
  gap: 8px;
`;

const baseBtn = `
  border: none;
  border-radius: 8px;
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s, opacity 0.15s;
`;

const SkipBtn = styled.button`
  ${baseBtn}
  background: transparent;
  color: #9CA3AF;
  &:hover { color: #4B5563; }
`;

const SecondaryBtn = styled.button`
  ${baseBtn}
  background: #F3F4F6;
  color: #4B5563;
  &:hover { background: #E5E7EB; }
`;

const PrimaryBtn = styled.button`
  ${baseBtn}
  background: #635BFF;
  color: white;
  &:hover { opacity: 0.9; }
`;
