// 결제 상태 체크 유틸리티

export interface PaymentStatus {
  hasOverdue: boolean;
  overdueAmount: number;
  overdueDays: number;
  restrictionLevel: 'none' | 'warning' | 'partial' | 'blocked';
  nextRestrictionDate?: string;
  overdueInvoices: OverdueInvoice[];
}

export interface OverdueInvoice {
  id: string;
  invoiceNumber: string;
  amount: number;
  dueDate: string;
  overdueDays: number;
}

// 결제 상태 확인 함수
export const checkPaymentStatus = (userRole: string, userId: string): PaymentStatus => {
  // 실제로는 API에서 데이터를 가져올 것
  // 현재는 샘플 데이터로 시뮬레이션 (기본적으로는 연체 없음)
  
  const mockOverdueInvoices: OverdueInvoice[] = [
    // 테스트를 위해 연체 인보이스를 시뮬레이션하려면 주석을 해제하세요
    // {
    //   id: 'inv-001',
    //   invoiceNumber: 'INV-202412-001',
    //   amount: 105,
    //   dueDate: '2024-12-15',
    //   overdueDays: calculateOverdueDays('2024-12-15')
    // },
  ];
  
  // 실제 환경에서는 조건부로 반환
  // 테스트를 위해 연체 상황 시뮬레이션
  const hasOverdue = mockOverdueInvoices.length > 0;
  const maxOverdueDays = Math.max(...mockOverdueInvoices.map(inv => inv.overdueDays));
  const overdueAmount = mockOverdueInvoices.reduce((sum, inv) => sum + inv.amount, 0);
  
  let restrictionLevel: PaymentStatus['restrictionLevel'] = 'none';
  let nextRestrictionDate: string | undefined;
  
  if (maxOverdueDays >= 8) {
    restrictionLevel = 'blocked';
  } else if (maxOverdueDays >= 4) {
    restrictionLevel = 'partial';
    nextRestrictionDate = addDays(new Date(), 8 - maxOverdueDays).toISOString().split('T')[0];
  } else if (maxOverdueDays >= 1) {
    restrictionLevel = 'warning';
    nextRestrictionDate = addDays(new Date(), 4 - maxOverdueDays).toISOString().split('T')[0];
  }
  
  return {
    hasOverdue,
    overdueAmount,
    overdueDays: maxOverdueDays,
    restrictionLevel,
    nextRestrictionDate,
    overdueInvoices: mockOverdueInvoices
  };
};

// 연체 일수 계산
// const calculateOverdueDays = (dueDate: string): number => {
//   const due = new Date(dueDate);
//   const today = new Date();
//   const diffTime = today.getTime() - due.getTime();
//   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//   return Math.max(0, diffDays);
// };
// 
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
      
    case 'partial':
      // 일부 기능만 제한 (새 주문, 분석 등)
      const restrictedInPartial = [
        '/pos-terminal',
        '/reports',
        '/analytics',
        '/promotions'
      ];
      return !restrictedInPartial.some(path => pagePath.includes(path));
      
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