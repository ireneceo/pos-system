import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { checkPaymentStatus, PaymentStatus, canAccessPage } from '../utils/paymentStatus';
import { useAuth } from './AuthContext';

interface PaymentStatusContextType {
  paymentStatus: PaymentStatus;
  refreshPaymentStatus: () => void;
  canAccess: (path: string) => boolean;
  showWarning: boolean;
  showPartialRestriction: boolean;
  showBlockedModal: boolean;
  dismissWarning: () => void;
  dismissPartialRestriction: () => void;
}

const PaymentStatusContext = createContext<PaymentStatusContextType | undefined>(undefined);

export const usePaymentStatus = () => {
  const context = useContext(PaymentStatusContext);
  if (!context) {
    throw new Error('usePaymentStatus must be used within PaymentStatusProvider');
  }
  return context;
};

interface PaymentStatusProviderProps {
  children: ReactNode;
}

export const PaymentStatusProvider: React.FC<PaymentStatusProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>({
    hasOverdue: false,
    overdueAmount: 0,
    overdueDays: 0,
    restrictionLevel: 'none',
    overdueInvoices: []
  });
  
  const [showWarning, setShowWarning] = useState(false);
  const [showPartialRestriction, setShowPartialRestriction] = useState(false);
  const [showBlockedModal, setShowBlockedModal] = useState(false);
  const [warningDismissed, setWarningDismissed] = useState(false);
  const [partialRestrictionDismissed, setPartialRestrictionDismissed] = useState(false);

  const refreshPaymentStatus = () => {
    if (!user) return;
    
    // 시스템 관리자는 결제 상태 체크 안함
    if (user.role === 'System Admin') {
      setPaymentStatus({
        hasOverdue: false,
        overdueAmount: 0,
        overdueDays: 0,
        restrictionLevel: 'none',
        overdueInvoices: []
      });
      return;
    }
    
    const status = checkPaymentStatus(user.role, user.id || '');
    setPaymentStatus(status);
    
    // 상태에 따른 UI 표시 결정
    if (status.restrictionLevel === 'warning' && !warningDismissed) {
      setShowWarning(true);
    } else if (status.restrictionLevel === 'partial' && !partialRestrictionDismissed) {
      setShowPartialRestriction(true);
    } else if (status.restrictionLevel === 'blocked') {
      setShowBlockedModal(true);
    }
  };

  const canAccess = (path: string): boolean => {
    return canAccessPage(path, paymentStatus.restrictionLevel);
  };

  const dismissWarning = () => {
    setShowWarning(false);
    setWarningDismissed(true);
    // 1시간 후 다시 표시하도록 타이머 설정
    setTimeout(() => setWarningDismissed(false), 60 * 60 * 1000);
  };

  const dismissPartialRestriction = () => {
    setShowPartialRestriction(false);
    setPartialRestrictionDismissed(true);
    // 2시간 후 다시 표시하도록 타이머 설정  
    setTimeout(() => setPartialRestrictionDismissed(false), 2 * 60 * 60 * 1000);
  };

  useEffect(() => {
    refreshPaymentStatus();
    
    // 30분마다 결제 상태 체크
    const interval = setInterval(refreshPaymentStatus, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [user]);

  return (
    <PaymentStatusContext.Provider 
      value={{ 
        paymentStatus, 
        refreshPaymentStatus,
        canAccess,
        showWarning,
        showPartialRestriction, 
        showBlockedModal,
        dismissWarning,
        dismissPartialRestriction
      }}
    >
      {children}
    </PaymentStatusContext.Provider>
  );
};