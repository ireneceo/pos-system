/**
 * 키오스크 카드 결제 진행 창 — 손님이 보는 화면 (Fable 판정 .claude/fable-verdict-20261007-kiosk-payment-split.md D5).
 *
 * 단말기 흐름 자체는 계산대와 같은 utils/terminalSale.runTerminalSale 이다(BUSY 자동 대기·복구 포함).
 * 이 창은 손님 말로 상태만 보여 준다. 계산대 TerminalPanel 의 «수동 기록»·«Void» 는 직원 판단이라 여기 없다.
 *   - 진행 중: 카드를 대 달라는 안내(취소는 단말기의 Cancel 키).
 *   - 거절·단말기에 닿지 못함: «다시 시도» 또는 «카운터에서 결제»(주문은 남고 직원이 FloorPlan 에서 처리).
 *   - 결과를 모름(무응답): 다시 긁으면 두 번 청구될 수 있어 «다시 시도» 를 주지 않는다 → 직원에게.
 *   - 승인됐는데 기록 실패: 이미 결제됐다 — 직원이 같은 주문에 카드를 고르면 재청구 없이 기록된다(ALREADY_APPROVED).
 */
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import type { TerminalPhase } from '../../utils/terminalSale';
import { Button } from '../../components/UI/Button';

export type KioskCardIssue =
  | { kind: 'retryable'; message: string }
  | { kind: 'askStaff'; message: string }
  | { kind: 'paidNotRecorded' };

interface Props {
  phase: TerminalPhase | 'recording' | null;
  issue: KioskCardIssue | null;
  orderNumber?: string | null;
  amountText: string;
  onRetry: () => void;
  onPayAtCounter: () => void;
  onStopWaiting: () => void;
}

const Overlay = styled.div`
  position: fixed; inset: 0; z-index: 2000;
  background: rgba(10, 37, 64, 0.55);
  display: flex; align-items: center; justify-content: center; padding: 24px;
`;
const Box = styled.div`
  background: #FFFFFF; border-radius: 16px; width: 100%; max-width: 560px;
  padding: 32px 28px; text-align: center; box-shadow: 0 20px 40px rgba(10, 37, 64, 0.25);
`;
const Title = styled.div`
  font-size: 24px; font-weight: 700; color: #0A2540; margin-bottom: 10px;
`;
const Amount = styled.div`
  font-size: 32px; font-weight: 800; color: #635BFF; margin: 8px 0 16px;
`;
const Text = styled.div`
  font-size: 17px; line-height: 1.5; color: #425466; margin-bottom: 8px;
`;
const Actions = styled.div`
  display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-top: 20px;
`;
// 손님 손가락용 큰 버튼 — 공용 Button 을 키운다(디자인 기준: 로컬 버튼 신규 금지)
const big: React.CSSProperties = { minHeight: 56, minWidth: 200, fontSize: 17, fontWeight: 700, borderRadius: 12 };
const Spinner = styled.div`
  width: 44px; height: 44px; margin: 4px auto 16px; border-radius: 50%;
  border: 4px solid #E3E8EE; border-top-color: #635BFF; animation: kspin 0.9s linear infinite;
  @keyframes kspin { to { transform: rotate(360deg); } }
`;

const KioskCardPanel: React.FC<Props> = ({ phase, issue, orderNumber, amountText, onRetry, onPayAtCounter, onStopWaiting }) => {
  const { t } = useTranslation('menu');
  // 'reason:<키>' 는 계산대와 같은 단말기 사유 키 — 손님 말로 다시 옮긴다(모르는 키는 일반 문구)
  const reasonText = (m: string) => {
    const key = m.startsWith('reason:') ? m.slice(7).split(':')[0] : '';
    const known = ['cardTimeout', 'cancelledOnTerminal', 'notSupported', 'bankTimeout', 'hostComm', 'terminalBusy', 'terminalNotFound', 'notApproved'];
    return known.includes(key) ? t(`kiosk.pay.reason.${key}`) : t('kiosk.pay.reason.notApproved');
  };

  if (issue?.kind === 'paidNotRecorded' || issue?.kind === 'askStaff') {
    return (
      <Overlay role="alertdialog" aria-live="assertive">
        <Box>
          <Title>{t(issue.kind === 'paidNotRecorded' ? 'kiosk.pay.paidNotRecordedTitle' : 'kiosk.pay.askStaffTitle')}</Title>
          <Text>{t(issue.kind === 'paidNotRecorded' ? 'kiosk.pay.paidNotRecorded' : 'kiosk.pay.askStaff')}</Text>
          {orderNumber && <Text><strong>{t('kiosk.pay.orderNumber', { number: orderNumber })}</strong></Text>}
          <Actions><Button variant="primary" size="large" style={big} onClick={onPayAtCounter}>{t('kiosk.pay.ok')}</Button></Actions>
        </Box>
      </Overlay>
    );
  }

  if (issue?.kind === 'retryable') {
    return (
      <Overlay role="alertdialog" aria-live="assertive">
        <Box>
          <Title>{t('kiosk.pay.notPaidTitle')}</Title>
          <Text>{reasonText(issue.message)}</Text>
          <Actions>
            <Button variant="primary" size="large" style={big} onClick={onRetry}>{t('kiosk.pay.retry')}</Button>
            <Button variant="secondary" size="large" style={big} onClick={onPayAtCounter}>{t('kiosk.pay.payAtCounter')}</Button>
          </Actions>
        </Box>
      </Overlay>
    );
  }

  const busyText = phase === 'terminalBusy' ? t('kiosk.pay.terminalBusy')
    : phase === 'recording' ? t('kiosk.pay.recording')
    : phase === 'recovering' || phase === 'checking' ? t('kiosk.pay.checking')
    : phase === 'starting' ? t('kiosk.pay.starting')
    : t('kiosk.pay.tapCard');
  return (
    <Overlay role="status" aria-live="polite">
      <Box>
        <Spinner />
        <Title>{busyText}</Title>
        <Amount>{amountText}</Amount>
        {phase !== 'recording' && <Text>{t('kiosk.pay.cancelOnTerminal')}</Text>}
        {phase === 'terminalBusy' && (
          <Actions><Button variant="secondary" size="large" style={big} onClick={onStopWaiting}>{t('kiosk.pay.stopWaiting')}</Button></Actions>
        )}
      </Box>
    </Overlay>
  );
};

export default KioskCardPanel;
