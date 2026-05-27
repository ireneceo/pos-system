import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from '../../utils/currency';
import { formatDateTime as formatDateTimeUtil } from '../../utils/timezone';
import { Modal } from '../../components/UI';
import { DbOrder } from './types';
import { getProofCurrent, getProofHistory } from './helpers';
import { VerifyRejectButton, VerifyConfirmButton } from './styles';

interface PaymentVerificationModalProps {
  verifyOrder: DbOrder | null;
  operationSettings: any;
  onClose: () => void;
  onConfirm: () => void;
  onReject: () => void;
}

const PaymentVerificationModal: React.FC<PaymentVerificationModalProps> = ({
  verifyOrder, operationSettings, onClose, onConfirm, onReject
}) => {
  const { t } = useTranslation('orders');

  return (
    <Modal
      isOpen={!!verifyOrder} onClose={onClose}
      title={(verifyOrder?.payment_status as any) === 'payment_verification_pending' ? 'Payment Verification' : 'Customer Submitted Proof'}
      size="small"
      footer={(verifyOrder?.payment_status as any) === 'payment_verification_pending' ? (
        <>
          <VerifyRejectButton variant="secondary" onClick={onReject}>{t('orders:liveOrdersPage.reject')}</VerifyRejectButton>
          <VerifyConfirmButton variant="primary" onClick={onConfirm}>{t('orders:liveOrdersPage.confirmPayment')}</VerifyConfirmButton>
        </>
      ) : undefined}
    >
      {verifyOrder && (() => {
        const currentProof = getProofCurrent((verifyOrder as any).payment_proof);
        const proofHistory = getProofHistory((verifyOrder as any).payment_proof);
        return (
          <>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '14px', color: '#4B5563', marginBottom: '6px' }}>Order: <strong style={{ color: '#0A2540' }}>#{verifyOrder.order_number}</strong></div>
              <div style={{ fontSize: '14px', color: '#4B5563', marginBottom: '6px' }}>Amount: <strong style={{ color: '#0A2540' }}>{formatCurrency(verifyOrder.total_amount, operationSettings.currency)}</strong></div>
              <div style={{ fontSize: '14px', color: '#4B5563' }}>Method: <strong style={{ color: '#0A2540' }}>{verifyOrder.payment_method}</strong></div>
            </div>

            <div style={{ borderTop: '1px solid #C7CED6', paddingTop: '16px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#0A2540', marginBottom: '12px' }}>{t('orders:liveOrdersPage.customerSubmittedProof')}</div>
              {currentProof ? (
                <>
                  {currentProof.reference && (<div style={{ fontSize: '13px', marginBottom: '6px' }}><span style={{ color: '#4B5563' }}>Reference: </span><span style={{ fontFamily: 'monospace', fontWeight: 600, color: '#0A2540' }}>{currentProof.reference}</span></div>)}
                  {currentProof.file_name && (<div style={{ fontSize: '13px', marginBottom: '6px', color: '#4B5563' }}>File: {currentProof.file_name}</div>)}
                  {currentProof.uploaded_at && (<div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '6px' }}>Submitted: {formatDateTimeUtil(currentProof.uploaded_at, operationSettings)}</div>)}
                  {currentProof.image && (<img src={currentProof.image} alt="Payment proof" style={{ width: '100%', borderRadius: '6px', marginTop: '8px', cursor: 'pointer' }} onClick={() => window.open(currentProof.image, '_blank')} />)}
                </>
              ) : (
                <div style={{ fontSize: '13px', color: '#6B7280' }}>
                  {(verifyOrder.payment_status as any) === 'rejected' ? 'Waiting for customer to resubmit.' : 'No payment proof submitted.'}
                </div>
              )}
            </div>

            {proofHistory.length > 0 && (
              <div style={{ borderTop: '1px solid #C7CED6', paddingTop: '16px', marginTop: '16px' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#4B5563', marginBottom: '10px' }}>Previous Attempts ({proofHistory.length})</div>
                {proofHistory.map((entry: any, idx: number) => (
                  <div key={idx} style={{ padding: '10px', background: '#F9FAFB', borderRadius: '6px', marginBottom: idx < proofHistory.length - 1 ? '8px' : 0, border: '1px solid #C7CED6' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{ fontSize: '12px', color: '#DC2626', fontWeight: 600 }}>Rejected #{entry.reject_count || idx + 1}</span>
                      {entry.rejected_at && (<span style={{ fontSize: '11px', color: '#6B7280' }}>{formatDateTimeUtil(entry.rejected_at, operationSettings)}</span>)}
                    </div>
                    {entry.reference && (<div style={{ fontSize: '12px', color: '#4B5563' }}>Ref: <span style={{ fontFamily: 'monospace' }}>{entry.reference}</span></div>)}
                    {entry.image && (<img src={entry.image} alt={`Previous proof #${idx + 1}`} style={{ width: '100%', maxHeight: '150px', objectFit: 'contain', borderRadius: '4px', marginTop: '6px', cursor: 'pointer' }} onClick={() => window.open(entry.image, '_blank')} />)}
                  </div>
                ))}
              </div>
            )}
          </>
        );
      })()}
    </Modal>
  );
};

export default PaymentVerificationModal;
