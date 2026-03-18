// 결제 상태 체크 유틸리티

export interface PendingPlanChange {
  planType: string;
  planAmount: number;
  billingCycle: string;
  changeType: string;
  effectiveDate: string;
}

export interface PaymentStatus {
  hasOverdue: boolean;
  overdueAmount: number;
  overdueDays: number;
  restrictionLevel: 'none' | 'warning' | 'partial' | 'blocked';
  nextRestrictionDate?: string;
  overdueInvoices: OverdueInvoice[];
  subscriptionStatus?: string;
  currency?: string;
  trialEndDate?: string;
  planType?: string;
  pendingChange?: PendingPlanChange | null;
}

export interface OverdueInvoice {
  id: string;
  invoiceNumber: string;
  amount: number;
  dueDate: string;
  overdueDays: number;
}

// 실제 API에서 결제 상태를 가져오는 함수
export const fetchPaymentStatus = async (): Promise<PaymentStatus> => {
  const token = localStorage.getItem('auth_token');
  if (!token) {
    return getDefaultStatus();
  }

  try {
    const response = await fetch('/api/restaurants/subscription-status', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      return getDefaultStatus();
    }

    const result = await response.json();
    if (!result.success) {
      return getDefaultStatus();
    }

    const data = result.data;
    const overdueDays = data.daysOverdue || 0;
    const overdueAmount = parseFloat(data.overdueAmount) || 0;
    const hasOverdue = overdueAmount > 0 || data.subscriptionStatus === 'overdue';

    let restrictionLevel: PaymentStatus['restrictionLevel'] = 'none';
    let nextRestrictionDate: string | undefined;

    if (data.subscriptionStatus === 'suspended') {
      restrictionLevel = 'blocked';
    } else if (overdueDays >= 8 || data.subscriptionStatus === 'suspended') {
      restrictionLevel = 'blocked';
    } else if (overdueDays >= 4) {
      restrictionLevel = 'partial';
      nextRestrictionDate = addDays(new Date(), 8 - overdueDays).toISOString().split('T')[0];
    } else if (overdueDays >= 1 || data.subscriptionStatus === 'overdue') {
      restrictionLevel = 'warning';
      nextRestrictionDate = addDays(new Date(), 4 - overdueDays).toISOString().split('T')[0];
    }

    return {
      hasOverdue,
      overdueAmount,
      overdueDays,
      restrictionLevel,
      nextRestrictionDate,
      overdueInvoices: data.overdueInvoices || [],
      subscriptionStatus: data.subscriptionStatus,
      currency: data.currency,
      trialEndDate: data.trialEndDate,
      planType: data.planType,
      pendingChange: data.pendingChange || null
    };
  } catch {
    return getDefaultStatus();
  }
};

// 기본 상태 (연체 없음)
const getDefaultStatus = (): PaymentStatus => ({
  hasOverdue: false,
  overdueAmount: 0,
  overdueDays: 0,
  restrictionLevel: 'none',
  overdueInvoices: []
});

// 동기 버전 유지 (레거시 호환) - 기본값 반환
export const checkPaymentStatus = (_userRole: string, _userId: string): PaymentStatus => {
  return getDefaultStatus();
};

// 날짜 추가 유틸리티
const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// 페이지 접근 권한 체크
export const canAccessPage = (pagePath: string, restrictionLevel: PaymentStatus['restrictionLevel']): boolean => {
  // 항상 접근 가능한 페이지들
  const alwaysAccessible = [
    '/invoices',
    '/profile',
    '/settings',
    '/logout'
  ];

  if (alwaysAccessible.some(path => pagePath.includes(path))) {
    return true;
  }

  // 제한 레벨별 접근 권한
  switch (restrictionLevel) {
    case 'none':
    case 'warning':
      return true;

    case 'partial': {
      // 일부 기능만 제한 (새 주문, 분석 등)
      const restrictedInPartial = [
        '/pos-terminal',
        '/reports',
        '/analytics',
        '/coupons'
      ];
      return !restrictedInPartial.some(path => pagePath.includes(path));
    }

    case 'blocked':
      // 인보이스와 기본 페이지만 접근 가능
      return false;

    default:
      return true;
  }
};

// 제한된 기능 목록 가져오기
export const getRestrictedFeatures = (restrictionLevel: PaymentStatus['restrictionLevel']): string[] => {
  switch (restrictionLevel) {
    case 'partial':
      return [
        'New Orders (POS Terminal)',
        'Reports & Analytics',
        'Promotions Management',
        'New Customer Registration'
      ];

    case 'blocked':
      return [
        'All POS Functions',
        'Kitchen Display',
        'Customer Display',
        'Reports & Analytics',
        'Staff Management',
        'Menu Management',
        'All Business Operations'
      ];

    default:
      return [];
  }
};

// Re-export formatCurrency from currency utility for backward compatibility
export { formatCurrency } from './currency';
