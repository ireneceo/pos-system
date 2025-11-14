import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainLayout from '../../components/Layout/MainLayout';
import { useStaff } from '../../contexts/StaffContext';
import { useOrders } from '../../contexts/OrderContext';
import { TabContainer, Tab } from '../../components/UI';

// 매출 데이터 타입 정의
interface SalesTransaction {
  id: string;
  orderNumber: string;
  date: string;
  time: string;
  customer: {
    type: 'guest' | 'member';
    name: string;
    id?: string;
  };
  staff: {
    id: string;
    name: string;
  };
  items: {
    name: string;
    quantity: number;
    price: number;
    total: number;
  }[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod: 'cash' | 'card' | 'digital_wallet' | 'points';
  status: 'completed' | 'refunded' | 'cancelled';
}

interface SalesSummary {
  totalSales: number;
  totalTransactions: number;
  averageOrderValue: number;
  totalTax: number;
  totalDiscount: number;
  cashSales: number;
  cardSales: number;
  digitalWalletSales: number;
  pointsSales: number;
}

interface SalesAggregate {
  period: string;
  totalSales: number;
  totalTransactions: number;
  averageOrderValue: number;
  growth?: number;
}

type ViewMode = 'transactions' | 'yearly' | 'monthly' | 'daily';

interface DetailViewState {
  type: 'year' | 'month' | 'day' | null;
  value: string;
  parentValue?: string;
}

// 스타일 컴포넌트
const SalesContainer = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`;

const Header = styled.header`
  background: white;
  padding: 24px 32px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 16px 20px;
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }
`;

const HeaderTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  border: ${props => props.variant === 'primary' ? 'none' : '1px solid #E6EBF1'};
  background: ${props => props.variant === 'primary' ? '#635BFF' : 'white'};
  color: ${props => props.variant === 'primary' ? 'white' : '#6B7C93'};
  
  &:hover {
    background: ${props => props.variant === 'primary' ? '#5A51E6' : '#F6F9FC'};
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const Content = styled.main`
  padding: 32px;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const FiltersRow = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const FilterLabel = styled.label`
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;

const FilterSelect = styled.select`
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 120px;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const DateInput = styled.input`
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`;

const StatCard = styled.div<{ color?: string }>`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${props => props.color || '#635BFF'};
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
`;

const StatLabel = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`;

const StatValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`;

const StatDescription = styled.div`
  font-size: 13px;
  color: #6B7280;
`;

const TableContainer = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1.2fr 1fr 1fr 1fr 0.8fr 0.5fr 0.5fr;
  gap: 16px;
  padding: 16px 20px;
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.3px;

  span {
    text-align: center;
    
    &:first-child {
      text-align: left;
    }
  }

  @media (max-width: 1200px) {
    grid-template-columns: 1.5fr 1fr 0.8fr 1fr 0.8fr 0.6fr 0.3fr 0.3fr;
    gap: 12px;
    padding: 14px 16px;
    font-size: 11px;
  }

  @media (max-width: 968px) {
    grid-template-columns: 1.5fr 1fr 0.8fr 0.8fr 0.6fr 0.5fr;
    
    span:nth-child(7),
    span:nth-child(8) {
      display: none;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1.2fr 1fr 1fr 1fr 0.8fr 0.5fr 0.5fr;
  gap: 16px;
  padding: 16px 20px;
  border-bottom: 1px solid #F6F9FC;
  align-items: center;
  transition: all 0.2s;
  cursor: pointer;
  
  > div, > span {
    text-align: center;
    
    &:first-child {
      text-align: left;
    }
  }
  
  &:hover {
    background: #F8FAFC;
  }
  
  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 1200px) {
    grid-template-columns: 1.5fr 1fr 0.8fr 1fr 0.8fr 0.6fr 0.3fr 0.3fr;
    gap: 12px;
    padding: 14px 16px;
  }

  @media (max-width: 968px) {
    grid-template-columns: 1.5fr 1fr 0.8fr 0.8fr 0.6fr 0.5fr;
    
    > div:nth-child(7),
    > div:nth-child(8) {
      display: none;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileCard = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    background: white;
    border: 1px solid #E6EBF1;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 12px;
    cursor: pointer;
    transition: all 0.2s;
    
    &:hover {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }
  }
`;

const OrderNumber = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`;

const DateTime = styled.div`
  font-size: 12px;
  color: #6B7280;
`;

const CustomerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const CustomerName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #1F2937;
`;

const CustomerType = styled.span<{ type: 'guest' | 'member' }>`
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${props => props.type === 'member' ? '#ECFDF5' : '#F3F4F6'};
  color: ${props => props.type === 'member' ? '#059669' : '#6B7280'};
`;

const Amount = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`;

const PaymentBadge = styled.span<{ method: string }>`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${props => {
    switch(props.method) {
      case 'cash': return '#FEF3C7';
      case 'card': return '#DBEAFE';
      case 'digital_wallet': return '#ECFDF5';
      case 'points': return '#EDE9FE';
      default: return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch(props.method) {
      case 'cash': return '#D97706';
      case 'card': return '#1E40AF';
      case 'digital_wallet': return '#059669';
      case 'points': return '#5B21B6';
      default: return '#6B7280';
    }
  }};
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${props => {
    switch(props.status) {
      case 'completed': return '#E5E7EB';
      case 'refunded': return '#FEF2F2';
      case 'cancelled': return '#F3F4F6';
      default: return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'completed': return '#374151';
      case 'refunded': return '#DC2626';
      case 'cancelled': return '#6B7280';
      default: return '#6B7280';
    }
  }};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7C93;
`;

const EmptyStateIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
`;

const EmptyStateText = styled.p`
  font-size: 16px;
  margin-bottom: 24px;
`;

// TabContainer and Tab are now imported from UI components

const PeriodTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`;

const GrowthBadge = styled.span<{ positive?: boolean }>`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  background: ${props => props.positive ? '#ECFDF5' : '#FEF2F2'};
  color: ${props => props.positive ? '#059669' : '#DC2626'};
`;

const BreadcrumbContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  padding: 12px 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`;

const BreadcrumbItem = styled.span<{ clickable?: boolean }>`
  font-size: 14px;
  color: ${props => props.clickable ? '#635BFF' : '#6B7280'};
  cursor: ${props => props.clickable ? 'pointer' : 'default'};
  font-weight: 500;
  
  &:hover {
    ${props => props.clickable && `
      color: #5A51E6;
      text-decoration: underline;
    `}
  }
`;

const BreadcrumbSeparator = styled.span`
  color: #9CA3AF;
  font-size: 14px;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  color: #6B7280;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 16px;
  
  &:hover {
    background: #F1F5F9;
    color: #0A2540;
    border-color: #CBD5E1;
  }
`;

const DetailTransactionContainer = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
  margin-top: 20px;
`;

const DetailHeader = styled.div`
  padding: 20px;
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;
`;

const DetailTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`;

const DetailSubtitle = styled.p`
  font-size: 14px;
  color: #6B7280;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 24px;
  padding: 20px;
`;

const PaginationButton = styled.button<{ disabled?: boolean }>`
  padding: 8px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  background: ${props => props.disabled ? '#F8FAFC' : 'white'};
  color: ${props => props.disabled ? '#9CA3AF' : '#374151'};
  font-size: 14px;
  font-weight: 500;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s;
  
  &:hover:not(:disabled) {
    background: #F8FAFC;
    border-color: #635BFF;
  }
`;

const PageInfo = styled.span`
  font-size: 14px;
  color: #6B7280;
  font-weight: 500;
`;

const SalesPage: React.FC = () => {
  const { currentStaff, isLoggedIn } = useStaff();
  const { orders } = useOrders();
  const [viewMode, setViewMode] = useState<ViewMode>('transactions');
  const [dateFilter, setDateFilter] = useState('today');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [transactions, setTransactions] = useState<SalesTransaction[]>([]);
  const [summary, setSummary] = useState<SalesSummary | null>(null);
  const [aggregateData, setAggregateData] = useState<SalesAggregate[]>([]);
  const [detailView, setDetailView] = useState<DetailViewState>({ type: null, value: '' });
  const [detailTransactions, setDetailTransactions] = useState<SalesTransaction[]>([]);
  
  // 기간 선택 필터 상태
  const [yearFilter, setYearFilter] = useState(new Date().getFullYear().toString());
  const [monthFilter, setMonthFilter] = useState(new Date().getFullYear() + '-' + String(new Date().getMonth() + 1).padStart(2, '0'));
  const [weekFilter, setWeekFilter] = useState('');
  const [pageSize, setPageSize] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);

  // 실제 주문 데이터 로드
  useEffect(() => {
    loadSalesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders]);

  // 기간 필터 변경 시 데이터 재로드
  useEffect(() => {
    if (viewMode !== 'transactions') {
      generateAggregateData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewMode, yearFilter, monthFilter, weekFilter, currentPage]);

  // 필터링된 데이터 계산
  useEffect(() => {
    calculateSummary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactions, dateFilter, startDate, endDate, paymentFilter, statusFilter]);

  // 집계 데이터 계산
  useEffect(() => {
    if (viewMode !== 'transactions') {
      generateAggregateData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewMode, transactions, detailView]);

  const loadSalesData = () => {
    // 실제 주문 데이터를 매출 데이터로 변환
    const salesTransactions: SalesTransaction[] = orders
      .filter(order => order.status === 'ready')
      .map(order => {
        // 안전한 날짜 처리
        let orderDate = new Date();
        if (order.createdAt) {
          const parsedDate = new Date(order.createdAt);
          if (!isNaN(parsedDate.getTime())) {
            orderDate = parsedDate;
          }
        }
        
        return {
          id: order.id,
          orderNumber: order.orderNumber || `ORD${order.id.slice(-4)}`,
          date: orderDate.toISOString().split('T')[0],
          time: orderDate.toLocaleTimeString('en-US', { 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          customer: {
            type: 'guest' as const,
            name: order.customer?.name || 'Guest',
            id: undefined
          },
          staff: {
            id: 'staff-1',
            name: 'Staff Member'
          },
          items: order.items.map(item => ({
            name: item.menuItem ? item.menuItem.name : `Item ${item.id}`,
            quantity: item.quantity,
            price: item.menuItem ? item.menuItem.price : 10.00,
            total: item.menuItem ? item.menuItem.price * item.quantity : 10.00 * item.quantity
          })),
          subtotal: order.subtotal || order.total || 0,
          tax: order.tax || 0,
          discount: order.discount || 0,
          total: order.total || 0,
          paymentMethod: (order.paymentMethod as SalesTransaction['paymentMethod']) || 'cash',
          status: 'completed' as const
        };
      })
      .sort((a, b) => new Date(`${b.date} ${b.time}`).getTime() - new Date(`${a.date} ${a.time}`).getTime());

    setTransactions(salesTransactions);
  };


  const generateAggregateData = () => {
    if (transactions.length === 0) return;

    let aggregates: SalesAggregate[] = [];
    const groupedData: { [key: string]: SalesTransaction[] } = {};

    // 상세 뷰인 경우 필터링된 거래만 사용
    let sourceTransactions = transactions;
    if (detailView.type) {
      sourceTransactions = getDetailFilteredTransactions();
    } else {
      // 기간 필터 적용
      sourceTransactions = applyPeriodFilter(transactions);
    }

    // 데이터 그룹화
    sourceTransactions.forEach(transaction => {
      let key = '';
      const date = new Date(transaction.date);
      
      if (detailView.type === 'year') {
        // 연도 상세 - 월별로 그룹화
        key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      } else if (detailView.type === 'month') {
        // 월 상세 - 일별로 그룹화
        key = transaction.date;
      } else {
        // 기본 뷰
        switch (viewMode) {
          case 'yearly':
            key = date.getFullYear().toString();
            break;
          case 'monthly':
            key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            break;
          case 'daily':
            key = transaction.date;
            break;
        }
      }
      
      if (!groupedData[key]) {
        groupedData[key] = [];
      }
      groupedData[key].push(transaction);
    });

    // 집계 계산
    const sortedKeys = Object.keys(groupedData).sort().reverse(); // 최신순 정렬
    
    aggregates = sortedKeys.map((key, index) => {
      const periodTransactions = groupedData[key];
      const totalSales = periodTransactions.reduce((sum, t) => sum + t.total, 0);
      const totalTransactions = periodTransactions.length;
      const averageOrderValue = totalTransactions > 0 ? totalSales / totalTransactions : 0;
      
      // 성장률 계산 (이전 기간과 비교)
      let growth: number | undefined;
      if (index < sortedKeys.length - 1) {
        const prevKey = sortedKeys[index + 1];
        const prevPeriodTransactions = groupedData[prevKey];
        const prevTotalSales = prevPeriodTransactions.reduce((sum, t) => sum + t.total, 0);
        if (prevTotalSales > 0) {
          growth = ((totalSales - prevTotalSales) / prevTotalSales) * 100;
        }
      }

      // 기간 표시 포맷
      let period = '';
      if (detailView.type === 'year') {
        // 연도 상세 뷰 - 월별 표시
        const [year, month] = key.split('-');
        period = `${year}-${month.padStart(2, '0')}`;
      } else if (detailView.type === 'month') {
        // 월 상세 뷰 - 일별 표시
        period = new Date(key).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric'
        });
      } else {
        // 기본 뷰
        switch (viewMode) {
          case 'yearly':
            period = `${key}`;
            break;
          case 'monthly':
            const [year, month] = key.split('-');
            period = `${year}-${month.padStart(2, '0')}`;
            break;
          case 'daily':
            period = new Date(key).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            });
            break;
        }
      }

      return {
        period,
        totalSales,
        totalTransactions,
        averageOrderValue,
        growth
      };
    });

    setAggregateData(aggregates);
  };

  const applyPeriodFilter = (transactions: SalesTransaction[]): SalesTransaction[] => {
    let filtered = [...transactions];
    
    if (viewMode === 'yearly') {
      if (yearFilter !== 'all') {
        filtered = filtered.filter(t => t.date.startsWith(yearFilter));
      }
      // 연도별 뷰에서는 최근 5년 정도만 표시
      const startYear = yearFilter === 'all' ? new Date().getFullYear() - 4 : parseInt(yearFilter);
      const endYear = yearFilter === 'all' ? new Date().getFullYear() : parseInt(yearFilter);
      filtered = filtered.filter(t => {
        const year = parseInt(t.date.split('-')[0]);
        return year >= startYear && year <= endYear;
      });
    } else if (viewMode === 'monthly') {
      const selectedYear = monthFilter.split('-')[0];
      filtered = filtered.filter(t => t.date.startsWith(selectedYear));
    } else if (viewMode === 'daily') {
      const targetMonth = weekFilter || monthFilter;
      filtered = filtered.filter(t => t.date.startsWith(targetMonth));
      
      // 페이지네이션 적용
      const start = (currentPage - 1) * pageSize;
      const sortedByDate = filtered.sort((a, b) => b.date.localeCompare(a.date));
      filtered = sortedByDate.slice(start, start + pageSize);
    }
    
    return filtered;
  };

  const getDetailFilteredTransactions = () => {
    if (!detailView.type || !detailView.value) return transactions;

    return transactions.filter(transaction => {
      const date = new Date(transaction.date);
      
      if (detailView.type === 'year') {
        return date.getFullYear().toString() === detailView.value;
      } else if (detailView.type === 'month') {
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        return monthKey === detailView.value;
      } else if (detailView.type === 'day') {
        return transaction.date === detailView.value;
      }
      
      return true;
    });
  };

  const handleAggregateClick = (aggregate: SalesAggregate) => {
    if (detailView.type === 'year') {
      // 연도 상세에서 월 클릭 → 해당 월의 일별 상세
      const monthKey = aggregate.period; // 이미 "YYYY-MM" 형태
      setDetailView({ 
        type: 'month', 
        value: monthKey,
        parentValue: detailView.value 
      });
    } else if (detailView.type === 'month') {
      // 월 상세에서 일 클릭 → 해당 일의 거래 상세
      const dayTransactions = transactions.filter(t => {
        const date = new Date(t.date);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        return monthKey === detailView.value && 
               t.date === getDateFromPeriod(aggregate.period, detailView.value);
      });
      setDetailTransactions(dayTransactions);
      setDetailView({ 
        type: 'day', 
        value: getDateFromPeriod(aggregate.period, detailView.value),
        parentValue: detailView.value 
      });
    } else {
      // 기본 뷰에서 클릭
      if (viewMode === 'yearly') {
        // 연도 클릭 → 해당 연도의 월별 상세
        const year = aggregate.period;
        setDetailView({ type: 'year', value: year });
      } else if (viewMode === 'monthly') {
        // 월 클릭 → 해당 월의 일별 상세
        const monthKey = aggregate.period; // 이미 "YYYY-MM" 형태
        setDetailView({ type: 'month', value: monthKey });
      } else if (viewMode === 'daily') {
        // 일 클릭 → 해당 일의 거래 상세
        const targetDate = getDateFromPeriod(aggregate.period);
        console.log('Daily click - Period:', aggregate.period, 'Target Date:', targetDate);
        
        const dayTransactions = transactions.filter(t => {
          console.log('Checking transaction date:', t.date, 'vs target:', targetDate);
          return t.date === targetDate;
        });
        
        console.log('Found transactions:', dayTransactions.length);
        setDetailTransactions(dayTransactions);
        setDetailView({ type: 'day', value: targetDate });
      }
    }
  };

  const getDateFromPeriod = (period: string, parentValue?: string): string => {
    // "Jan 15" 형태 처리
    if (period.match(/^[A-Za-z]{3}\s+\d+$/)) {
      const currentYear = new Date().getFullYear();
      const date = new Date(period + ', ' + currentYear);
      if (parentValue) {
        const [year] = parentValue.split('-');
        date.setFullYear(parseInt(year));
      }
      return date.toISOString().split('T')[0];
    }
    
    // "Jan 15, 2024" 형태 처리
    if (period.match(/^[A-Za-z]{3}\s+\d+,\s+\d{4}$/)) {
      const dateObj = new Date(period);
      return dateObj.toISOString().split('T')[0];
    }
    
    // "2024-01-15" 같은 완전한 날짜 형태
    if (period.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return period;
    }
    
    // 일반적인 날짜 파싱 시도
    const dateObj = new Date(period);
    if (!isNaN(dateObj.getTime())) {
      return dateObj.toISOString().split('T')[0];
    }
    
    return '';
  };

  const goBackToParent = () => {
    if (detailView.type === 'day') {
      if (detailView.parentValue) {
        setDetailView({ type: 'month', value: detailView.parentValue });
      } else {
        setDetailView({ type: null, value: '' });
      }
      setDetailTransactions([]);
    } else if (detailView.type === 'month') {
      if (detailView.parentValue) {
        setDetailView({ type: 'year', value: detailView.parentValue });
      } else {
        setDetailView({ type: null, value: '' });
      }
    } else if (detailView.type === 'year') {
      setDetailView({ type: null, value: '' });
    }
  };

  const getFilteredTransactions = () => {
    let filtered = transactions;
    
    // 날짜 필터
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    switch (dateFilter) {
      case 'today':
        filtered = filtered.filter(t => t.date === todayStr);
        break;
      case 'yesterday':
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        filtered = filtered.filter(t => t.date === yesterday.toISOString().split('T')[0]);
        break;
      case 'this_week':
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay());
        filtered = filtered.filter(t => new Date(t.date) >= weekStart);
        break;
      case 'this_month':
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        filtered = filtered.filter(t => new Date(t.date) >= monthStart);
        break;
      case 'custom':
        if (startDate && endDate) {
          filtered = filtered.filter(t => t.date >= startDate && t.date <= endDate);
        }
        break;
    }
    
    // 결제 방법 필터
    if (paymentFilter !== 'all') {
      filtered = filtered.filter(t => t.paymentMethod === paymentFilter);
    }
    
    // 상태 필터
    if (statusFilter !== 'all') {
      filtered = filtered.filter(t => t.status === statusFilter);
    }
    
    return filtered;
  };

  const calculateSummary = () => {
    const filtered = getFilteredTransactions();
    
    const totalSales = filtered.reduce((sum, t) => sum + t.total, 0);
    const totalTransactions = filtered.length;
    const averageOrderValue = totalTransactions > 0 ? totalSales / totalTransactions : 0;
    const totalTax = filtered.reduce((sum, t) => sum + t.tax, 0);
    const totalDiscount = filtered.reduce((sum, t) => sum + t.discount, 0);
    
    const cashSales = filtered.filter(t => t.paymentMethod === 'cash').reduce((sum, t) => sum + t.total, 0);
    const cardSales = filtered.filter(t => t.paymentMethod === 'card').reduce((sum, t) => sum + t.total, 0);
    const digitalWalletSales = filtered.filter(t => t.paymentMethod === 'digital_wallet').reduce((sum, t) => sum + t.total, 0);
    const pointsSales = filtered.filter(t => t.paymentMethod === 'points').reduce((sum, t) => sum + t.total, 0);
    
    setSummary({
      totalSales,
      totalTransactions,
      averageOrderValue,
      totalTax,
      totalDiscount,
      cashSales,
      cardSales,
      digitalWalletSales,
      pointsSales
    });
  };

  const downloadCSV = () => {
    if (viewMode === 'transactions') {
      // 거래 내역 CSV
      const filtered = getFilteredTransactions();
      
      const headers = [
        'Order Number',
        'Date',
        'Time',
        'Customer Type',
        'Customer Name',
        'Staff',
        'Items',
        'Subtotal',
        'Tax',
        'Discount',
        'Total',
        'Payment Method',
        'Status'
      ];
      
      const csvData = filtered.map(t => [
        t.orderNumber,
        t.date,
        t.time,
        t.customer.type,
        t.customer.name,
        t.staff.name,
        t.items.map(item => `${item.name} (${item.quantity}x)`).join('; '),
        t.subtotal.toFixed(2),
        t.tax.toFixed(2),
        t.discount.toFixed(2),
        t.total.toFixed(2),
        t.paymentMethod,
        t.status
      ]);
      
      const csvContent = [headers, ...csvData]
        .map(row => row.map(field => `"${field}"`).join(','))
        .join('\n');
      
      downloadFile(csvContent, `sales-transactions-${new Date().toISOString().split('T')[0]}.csv`);
    } else {
      // 집계 데이터 CSV
      const headers = [
        'Period',
        'Total Sales (RM)',
        'Total Transactions',
        'Average Order Value (RM)',
        'Growth Rate (%)'
      ];
      
      const csvData = aggregateData.map(item => [
        item.period,
        item.totalSales.toFixed(2),
        item.totalTransactions,
        item.averageOrderValue.toFixed(2),
        item.growth ? item.growth.toFixed(2) : 'N/A'
      ]);
      
      const csvContent = [headers, ...csvData]
        .map(row => row.map(field => `"${field}"`).join(','))
        .join('\n');
      
      const viewModeText = viewMode === 'yearly' ? 'yearly' : viewMode === 'monthly' ? 'monthly' : 'daily';
      downloadFile(csvContent, `sales-${viewModeText}-${new Date().toISOString().split('T')[0]}.csv`);
    }
  };

  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const generateReport = () => {
    if (viewMode === 'transactions') {
      generateTransactionReport();
    } else {
      generateAggregateReport();
    }
  };

  const generateTransactionReport = () => {
    const filtered = getFilteredTransactions();
    
    // 상세 분석 계산
    const paymentMethodBreakdown = {
      cash: filtered.filter(t => t.paymentMethod === 'cash').reduce((sum, t) => sum + t.total, 0),
      card: filtered.filter(t => t.paymentMethod === 'card').reduce((sum, t) => sum + t.total, 0),
      digital_wallet: filtered.filter(t => t.paymentMethod === 'digital_wallet').reduce((sum, t) => sum + t.total, 0),
      points: filtered.filter(t => t.paymentMethod === 'points').reduce((sum, t) => sum + t.total, 0)
    };

    const customerTypeBreakdown = {
      member: filtered.filter(t => t.customer.type === 'member').reduce((sum, t) => sum + t.total, 0),
      guest: filtered.filter(t => t.customer.type === 'guest').reduce((sum, t) => sum + t.total, 0)
    };

    const statusBreakdown = {
      completed: filtered.filter(t => t.status === 'completed').length,
      refunded: filtered.filter(t => t.status === 'refunded').length,
      cancelled: filtered.filter(t => t.status === 'cancelled').length
    };

    const topStaff = Object.entries(
      filtered.reduce((acc, t) => {
        acc[t.staff.name] = (acc[t.staff.name] || 0) + t.total;
        return acc;
      }, {} as {[key: string]: number})
    ).sort((a, b) => b[1] - a[1]).slice(0, 5);

    const totalSales = filtered.reduce((sum, t) => sum + t.total, 0);
    const totalTransactions = filtered.length;

    // HTML 리포트 생성
    const reportContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Sales Report - ${new Date().toLocaleDateString()}</title>
    <style>
        body { font-family: 'Inter', Arial, sans-serif; margin: 40px; color: #333; line-height: 1.6; }
        .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #635BFF; padding-bottom: 20px; }
        .title { font-size: 28px; font-weight: 600; color: #0A2540; margin-bottom: 10px; }
        .subtitle { font-size: 16px; color: #6B7C93; }
        .section { margin-bottom: 30px; }
        .section-title { font-size: 20px; font-weight: 600; color: #0A2540; margin-bottom: 15px; border-bottom: 1px solid #E6EBF1; padding-bottom: 5px; }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 20px; }
        .stat-card { background: #F8FAFC; border: 1px solid #E6EBF1; border-radius: 8px; padding: 20px; text-align: center; }
        .stat-value { font-size: 24px; font-weight: 600; color: #0A2540; margin-bottom: 5px; }
        .stat-label { font-size: 14px; color: #6B7C93; text-transform: uppercase; letter-spacing: 0.5px; }
        .breakdown { background: white; border: 1px solid #E6EBF1; border-radius: 8px; padding: 20px; margin-bottom: 20px; }
        .breakdown-item { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #F6F9FC; }
        .breakdown-item:last-child { border-bottom: none; }
        .breakdown-label { font-weight: 500; }
        .breakdown-value { font-weight: 600; color: #0A2540; }
        .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #9CA3AF; border-top: 1px solid #E6EBF1; padding-top: 20px; }
    </style>
</head>
<body>
    <div class="header">
        <div class="title">Sales Report</div>
        <div class="subtitle">Generated on ${new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}</div>
        <div class="subtitle">Period: ${dateFilter === 'custom' && startDate && endDate ? `${startDate} to ${endDate}` : dateFilter.replace('_', ' ')}</div>
    </div>

    <div class="section">
        <div class="section-title">Summary</div>
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-value">RM ${totalSales.toFixed(2)}</div>
                <div class="stat-label">Total Sales</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${totalTransactions}</div>
                <div class="stat-label">Total Transactions</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">RM ${(totalSales / totalTransactions || 0).toFixed(2)}</div>
                <div class="stat-label">Average Order Value</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${((statusBreakdown.completed / totalTransactions) * 100).toFixed(1)}%</div>
                <div class="stat-label">Success Rate</div>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-title">Payment Method Breakdown</div>
        <div class="breakdown">
            <div class="breakdown-item">
                <span class="breakdown-label">Cash</span>
                <span class="breakdown-value">RM ${paymentMethodBreakdown.cash.toFixed(2)} (${((paymentMethodBreakdown.cash / totalSales) * 100).toFixed(1)}%)</span>
            </div>
            <div class="breakdown-item">
                <span class="breakdown-label">Card</span>
                <span class="breakdown-value">RM ${paymentMethodBreakdown.card.toFixed(2)} (${((paymentMethodBreakdown.card / totalSales) * 100).toFixed(1)}%)</span>
            </div>
            <div class="breakdown-item">
                <span class="breakdown-label">Digital Wallet</span>
                <span class="breakdown-value">RM ${paymentMethodBreakdown.digital_wallet.toFixed(2)} (${((paymentMethodBreakdown.digital_wallet / totalSales) * 100).toFixed(1)}%)</span>
            </div>
            <div class="breakdown-item">
                <span class="breakdown-label">Points</span>
                <span class="breakdown-value">RM ${paymentMethodBreakdown.points.toFixed(2)} (${((paymentMethodBreakdown.points / totalSales) * 100).toFixed(1)}%)</span>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-title">Customer Type Analysis</div>
        <div class="breakdown">
            <div class="breakdown-item">
                <span class="breakdown-label">Members</span>
                <span class="breakdown-value">RM ${customerTypeBreakdown.member.toFixed(2)} (${((customerTypeBreakdown.member / totalSales) * 100).toFixed(1)}%)</span>
            </div>
            <div class="breakdown-item">
                <span class="breakdown-label">Guests</span>
                <span class="breakdown-value">RM ${customerTypeBreakdown.guest.toFixed(2)} (${((customerTypeBreakdown.guest / totalSales) * 100).toFixed(1)}%)</span>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-title">Top Performing Staff</div>
        <div class="breakdown">
            ${topStaff.map(([name, sales]) => `
                <div class="breakdown-item">
                    <span class="breakdown-label">${name}</span>
                    <span class="breakdown-value">RM ${sales.toFixed(2)}</span>
                </div>
            `).join('')}
        </div>
    </div>

    <div class="footer">
        <p>Generated by Purple Here POS</p>
        <p>🤖 Generated with Claude Code</p>
    </div>
</body>
</html>`;

    downloadFile(reportContent, `sales-report-${new Date().toISOString().split('T')[0]}.html`);
  };

  const generateAggregateReport = () => {
    const totalSales = aggregateData.reduce((sum, item) => sum + item.totalSales, 0);
    const totalTransactions = aggregateData.reduce((sum, item) => sum + item.totalTransactions, 0);
    const avgGrowth = aggregateData.filter(item => item.growth !== undefined).reduce((sum, item) => sum + (item.growth || 0), 0) / aggregateData.filter(item => item.growth !== undefined).length;
    const bestPeriod = aggregateData.reduce((best, current) => current.totalSales > best.totalSales ? current : best, aggregateData[0]);
    const worstPeriod = aggregateData.reduce((worst, current) => current.totalSales < worst.totalSales ? current : worst, aggregateData[0]);

    const reportContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${viewMode.charAt(0).toUpperCase() + viewMode.slice(1)} Sales Report - ${new Date().toLocaleDateString()}</title>
    <style>
        body { font-family: 'Inter', Arial, sans-serif; margin: 40px; color: #333; line-height: 1.6; }
        .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #635BFF; padding-bottom: 20px; }
        .title { font-size: 28px; font-weight: 600; color: #0A2540; margin-bottom: 10px; }
        .subtitle { font-size: 16px; color: #6B7C93; }
        .section { margin-bottom: 30px; }
        .section-title { font-size: 20px; font-weight: 600; color: #0A2540; margin-bottom: 15px; border-bottom: 1px solid #E6EBF1; padding-bottom: 5px; }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 20px; }
        .stat-card { background: #F8FAFC; border: 1px solid #E6EBF1; border-radius: 8px; padding: 20px; text-align: center; }
        .stat-value { font-size: 24px; font-weight: 600; color: #0A2540; margin-bottom: 5px; }
        .stat-label { font-size: 14px; color: #6B7C93; text-transform: uppercase; letter-spacing: 0.5px; }
        .period-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .period-table th, .period-table td { padding: 12px; text-align: left; border-bottom: 1px solid #E6EBF1; }
        .period-table th { background: #F8FAFC; font-weight: 600; color: #0A2540; }
        .growth-positive { color: #059669; font-weight: 600; }
        .growth-negative { color: #DC2626; font-weight: 600; }
        .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #9CA3AF; border-top: 1px solid #E6EBF1; padding-top: 20px; }
    </style>
</head>
<body>
    <div class="header">
        <div class="title">${viewMode.charAt(0).toUpperCase() + viewMode.slice(1)} Sales Report</div>
        <div class="subtitle">Generated on ${new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}</div>
    </div>

    <div class="section">
        <div class="section-title">Overall Summary</div>
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-value">${aggregateData.length}</div>
                <div class="stat-label">Total Periods</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">RM ${totalSales.toFixed(2)}</div>
                <div class="stat-label">Total Sales</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${totalTransactions.toLocaleString()}</div>
                <div class="stat-label">Total Transactions</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${avgGrowth.toFixed(1)}%</div>
                <div class="stat-label">Average Growth</div>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-title">Performance Highlights</div>
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-value">RM ${bestPeriod.totalSales.toFixed(2)}</div>
                <div class="stat-label">Best Period: ${bestPeriod.period}</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">RM ${worstPeriod.totalSales.toFixed(2)}</div>
                <div class="stat-label">Lowest Period: ${worstPeriod.period}</div>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-title">Detailed Breakdown</div>
        <table class="period-table">
            <thead>
                <tr>
                    <th>Period</th>
                    <th>Total Sales</th>
                    <th>Transactions</th>
                    <th>Avg Order Value</th>
                    <th>Growth Rate</th>
                </tr>
            </thead>
            <tbody>
                ${aggregateData.map(item => `
                    <tr>
                        <td>${item.period}</td>
                        <td>RM ${item.totalSales.toFixed(2)}</td>
                        <td>${item.totalTransactions.toLocaleString()}</td>
                        <td>RM ${item.averageOrderValue.toFixed(2)}</td>
                        <td class="${item.growth && item.growth > 0 ? 'growth-positive' : 'growth-negative'}">
                            ${item.growth ? (item.growth > 0 ? '+' : '') + item.growth.toFixed(1) + '%' : 'N/A'}
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    </div>

    <div class="footer">
        <p>Generated by Purple Here POS</p>
        <p>🤖 Generated with Claude Code</p>
    </div>
</body>
</html>`;

    const viewModeText = viewMode === 'yearly' ? 'yearly' : viewMode === 'monthly' ? 'monthly' : 'daily';
    downloadFile(reportContent, `sales-${viewModeText}-report-${new Date().toISOString().split('T')[0]}.html`);
  };

  const formatCurrency = (amount: number) => {
    return `RM ${amount.toFixed(2)}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // 권한 체크
  if (!isLoggedIn || !currentStaff || !['admin', 'manager'].includes(currentStaff.role)) {
    return (
      <MainLayout>
        <SalesContainer>
          <EmptyState>
            <EmptyStateIcon>🚫</EmptyStateIcon>
            <EmptyStateText>
              Access Denied
            </EmptyStateText>
            <p style={{ fontSize: '14px', color: '#9CA3AF' }}>
              You need admin or manager privileges to access sales management.
            </p>
          </EmptyState>
        </SalesContainer>
      </MainLayout>
    );
  }

  const filteredTransactions = getFilteredTransactions();

  return (
    <MainLayout>
      <SalesContainer>
        <Header>
          <HeaderTitle>Sales Management</HeaderTitle>
          <HeaderActions>
            <Button variant="secondary" onClick={downloadCSV}>
              Export CSV
            </Button>
            <Button variant="primary" onClick={generateReport}>
              Generate Report
            </Button>
          </HeaderActions>
        </Header>

        <Content>
          <TabContainer>
            <Tab 
              active={viewMode === 'transactions'} 
              onClick={() => {
                setViewMode('transactions');
                setDetailView({ type: null, value: '' });
                setDetailTransactions([]);
              }}
            >
              Transactions
            </Tab>
            <Tab 
              active={viewMode === 'yearly'} 
              onClick={() => {
                setViewMode('yearly');
                setDetailView({ type: null, value: '' });
                setDetailTransactions([]);
              }}
            >
              Yearly Sales
            </Tab>
            <Tab 
              active={viewMode === 'monthly'} 
              onClick={() => {
                setViewMode('monthly');
                setDetailView({ type: null, value: '' });
                setDetailTransactions([]);
              }}
            >
              Monthly Sales
            </Tab>
            <Tab 
              active={viewMode === 'daily'} 
              onClick={() => {
                setViewMode('daily');
                setDetailView({ type: null, value: '' });
                setDetailTransactions([]);
              }}
            >
              Daily Sales
            </Tab>
          </TabContainer>

          {viewMode === 'transactions' && (
            <>
              <FiltersRow>
            <FilterGroup>
              <FilterLabel>Time Period</FilterLabel>
              <FilterSelect 
                value={dateFilter} 
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="this_week">This Week</option>
                <option value="this_month">This Month</option>
                <option value="custom">Custom Range</option>
              </FilterSelect>
            </FilterGroup>
            
            {dateFilter === 'custom' && (
              <>
                <FilterGroup>
                  <FilterLabel>Start Date</FilterLabel>
                  <DateInput
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </FilterGroup>
                <FilterGroup>
                  <FilterLabel>End Date</FilterLabel>
                  <DateInput
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </FilterGroup>
              </>
            )}
            
            <FilterGroup>
              <FilterLabel>Payment Method</FilterLabel>
              <FilterSelect 
                value={paymentFilter} 
                onChange={(e) => setPaymentFilter(e.target.value)}
              >
                <option value="all">All Methods</option>
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="digital_wallet">Digital Wallet</option>
                <option value="points">Points</option>
              </FilterSelect>
            </FilterGroup>
            
            <FilterGroup>
              <FilterLabel>Status</FilterLabel>
              <FilterSelect 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="refunded">Refunded</option>
                <option value="cancelled">Cancelled</option>
              </FilterSelect>
            </FilterGroup>
          </FiltersRow>

          {summary && (
            <StatsRow>
              <StatCard color="#059669">
                <StatLabel>Total Sales</StatLabel>
                <StatValue>{formatCurrency(summary.totalSales)}</StatValue>
                <StatDescription>{summary.totalTransactions} transactions</StatDescription>
              </StatCard>
              <StatCard color="#2563EB">
                <StatLabel>Average Order</StatLabel>
                <StatValue>{formatCurrency(summary.averageOrderValue)}</StatValue>
                <StatDescription>+12.5% vs last period</StatDescription>
              </StatCard>
              <StatCard color="#DC2626">
                <StatLabel>Total Tax</StatLabel>
                <StatValue>{formatCurrency(summary.totalTax)}</StatValue>
                <StatDescription>GST collected</StatDescription>
              </StatCard>
              <StatCard color="#7C3AED">
                <StatLabel>Total Discounts</StatLabel>
                <StatValue>{formatCurrency(summary.totalDiscount)}</StatValue>
                <StatDescription>Promotions applied</StatDescription>
              </StatCard>
            </StatsRow>
          )}

          <TableContainer>
            <TableHeader>
              <span>Order #</span>
              <span>Date & Time</span>
              <span>Customer</span>
              <span>Staff</span>
              <span>Subtotal</span>
              <span>Total</span>
              <span>Payment</span>
              <span>Status</span>
            </TableHeader>
            
            {filteredTransactions.length === 0 ? (
              <EmptyState>
                <EmptyStateText>
                  No sales transactions found for the selected criteria
                </EmptyStateText>
                <Button variant="secondary">
                  Clear Filters
                </Button>
              </EmptyState>
            ) : (
              <>
                {/* Desktop Table */}
                {filteredTransactions.map(transaction => (
                  <TableRow key={transaction.id}>
                    <OrderNumber>{transaction.orderNumber}</OrderNumber>
                    
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '500', color: '#1F2937' }}>
                        {formatDate(transaction.date)}
                      </div>
                      <DateTime>{transaction.time}</DateTime>
                    </div>
                    
                    <CustomerInfo>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <CustomerName>{transaction.customer.name}</CustomerName>
                        <CustomerType type={transaction.customer.type}>
                          {transaction.customer.type}
                        </CustomerType>
                      </div>
                    </CustomerInfo>
                    
                    <div style={{ fontSize: '14px', color: '#1F2937' }}>
                      {transaction.staff.name}
                    </div>
                    
                    <Amount>{formatCurrency(transaction.subtotal)}</Amount>
                    <Amount>{formatCurrency(transaction.total)}</Amount>
                    
                    <PaymentBadge method={transaction.paymentMethod}>
                      {transaction.paymentMethod.replace('_', ' ')}
                    </PaymentBadge>
                    
                    <StatusBadge status={transaction.status}>
                      {transaction.status}
                    </StatusBadge>
                  </TableRow>
                ))}

                {/* Mobile Cards */}
                {filteredTransactions.map(transaction => (
                  <MobileCard key={`mobile-${transaction.id}`}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <div>
                        <OrderNumber>{transaction.orderNumber}</OrderNumber>
                        <DateTime>{formatDate(transaction.date)} • {transaction.time}</DateTime>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                        <Amount>{formatCurrency(transaction.total)}</Amount>
                        <StatusBadge status={transaction.status}>
                          {transaction.status}
                        </StatusBadge>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <CustomerInfo>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <CustomerName>{transaction.customer.name}</CustomerName>
                          <CustomerType type={transaction.customer.type}>
                            {transaction.customer.type}
                          </CustomerType>
                        </div>
                        <div style={{ fontSize: '12px', color: '#6B7280' }}>
                          Staff: {transaction.staff.name}
                        </div>
                      </CustomerInfo>
                      
                      <PaymentBadge method={transaction.paymentMethod}>
                        {transaction.paymentMethod.replace('_', ' ')}
                      </PaymentBadge>
                    </div>
                  </MobileCard>
                ))}
              </>
            )}
          </TableContainer>
            </>
          )}

          {viewMode !== 'transactions' && (
            <>
              {/* Period Filter Controls */}
              {!detailView.type && (
                <FiltersRow>
                  {viewMode === 'yearly' && (
                    <FilterGroup>
                      <FilterLabel>Year Range</FilterLabel>
                      <FilterSelect 
                        value={yearFilter} 
                        onChange={(e) => setYearFilter(e.target.value)}
                      >
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                        <option value="all">All Years</option>
                      </FilterSelect>
                    </FilterGroup>
                  )}
                  
                  {viewMode === 'monthly' && (
                    <FilterGroup>
                      <FilterLabel>Select Year</FilterLabel>
                      <FilterSelect 
                        value={monthFilter.split('-')[0]} 
                        onChange={(e) => setMonthFilter(e.target.value + '-01')}
                      >
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                      </FilterSelect>
                    </FilterGroup>
                  )}
                  
                  {viewMode === 'daily' && (
                    <>
                      <FilterGroup>
                        <FilterLabel>Select Month</FilterLabel>
                        <DateInput
                          type="month"
                          value={weekFilter || monthFilter}
                          onChange={(e) => setWeekFilter(e.target.value)}
                        />
                      </FilterGroup>
                      <FilterGroup>
                        <FilterLabel>Page Size</FilterLabel>
                        <FilterSelect 
                          value={pageSize.toString()} 
                          onChange={(e) => setPageSize(parseInt(e.target.value))}
                        >
                          <option value="25">25 days</option>
                          <option value="50">50 days</option>
                          <option value="100">100 days</option>
                        </FilterSelect>
                      </FilterGroup>
                    </>
                  )}
                </FiltersRow>
              )}

              {/* Back Button */}
              {detailView.type && (
                <BackButton onClick={goBackToParent}>
                  ← Back
                </BackButton>
              )}

              {/* Breadcrumb Navigation */}
              {detailView.type && (
                <BreadcrumbContainer>
                  <BreadcrumbItem 
                    clickable 
                    onClick={() => setDetailView({ type: null, value: '' })}
                  >
                    {viewMode === 'yearly' ? 'Yearly' : viewMode === 'monthly' ? 'Monthly' : 'Daily'} Sales
                  </BreadcrumbItem>
                  
                  {detailView.type === 'year' && (
                    <>
                      <BreadcrumbSeparator>&gt;</BreadcrumbSeparator>
                      <BreadcrumbItem>{detailView.value} Monthly Details</BreadcrumbItem>
                    </>
                  )}
                  
                  {detailView.type === 'month' && (
                    <>
                      <BreadcrumbSeparator>&gt;</BreadcrumbSeparator>
                      {detailView.parentValue && (
                        <>
                          <BreadcrumbItem 
                            clickable
                            onClick={() => setDetailView({ type: 'year', value: detailView.parentValue! })}
                          >
                            Year {detailView.parentValue}
                          </BreadcrumbItem>
                          <BreadcrumbSeparator>&gt;</BreadcrumbSeparator>
                        </>
                      )}
                      <BreadcrumbItem>
                        {detailView.value.split('-')[0]}-{detailView.value.split('-')[1]} Daily Details
                      </BreadcrumbItem>
                    </>
                  )}
                  
                  {detailView.type === 'day' && (
                    <>
                      <BreadcrumbSeparator>&gt;</BreadcrumbSeparator>
                      {detailView.parentValue && (
                        <>
                          <BreadcrumbItem 
                            clickable
                            onClick={() => setDetailView({ type: 'month', value: detailView.parentValue! })}
                          >
                            {detailView.parentValue.split('-')[0]}-{detailView.parentValue.split('-')[1]}
                          </BreadcrumbItem>
                          <BreadcrumbSeparator>&gt;</BreadcrumbSeparator>
                        </>
                      )}
                      <BreadcrumbItem>
                        {new Date(detailView.value).toLocaleDateString('en-US')} Transaction Details
                      </BreadcrumbItem>
                    </>
                  )}
                </BreadcrumbContainer>
              )}

              {summary && (
                <StatsRow>
                  <StatCard color="#635BFF">
                    <StatLabel>
                      Total {detailView.type === 'year' ? 'Months' : detailView.type === 'month' ? 'Days' : viewMode === 'yearly' ? 'Years' : viewMode === 'monthly' ? 'Months' : 'Days'}
                    </StatLabel>
                    <StatValue>{aggregateData.length}</StatValue>
                    <StatDescription>Reporting Period</StatDescription>
                  </StatCard>
                  <StatCard color="#635BFF">
                    <StatLabel>Total Sales</StatLabel>
                    <StatValue>{formatCurrency(aggregateData.reduce((sum, item) => sum + item.totalSales, 0))}</StatValue>
                    <StatDescription>Cumulative Amount</StatDescription>
                  </StatCard>
                  <StatCard color="#635BFF">
                    <StatLabel>Average Sales</StatLabel>
                    <StatValue>
                      {formatCurrency(
                        aggregateData.length > 0 
                          ? aggregateData.reduce((sum, item) => sum + item.totalSales, 0) / aggregateData.length 
                          : 0
                      )}
                    </StatValue>
                    <StatDescription>Per Period Average</StatDescription>
                  </StatCard>
                  <StatCard color="#635BFF">
                    <StatLabel>Highest Sales</StatLabel>
                    <StatValue>
                      {formatCurrency(
                        aggregateData.length > 0 
                          ? Math.max(...aggregateData.map(item => item.totalSales))
                          : 0
                      )}
                    </StatValue>
                    <StatDescription>Peak Record</StatDescription>
                  </StatCard>
                </StatsRow>
              )}

              {/* Daily Transaction Details */}
              {detailView.type === 'day' && (
                <DetailTransactionContainer>
                  <DetailHeader>
                    <DetailTitle>
                      {new Date(detailView.value).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })} Transaction History
                    </DetailTitle>
                    <DetailSubtitle>
                      Total {detailTransactions.length} transactions • 
                      Total sales {formatCurrency(detailTransactions.reduce((sum, t) => sum + t.total, 0))}
                    </DetailSubtitle>
                  </DetailHeader>
                  
                  <TableContainer style={{ border: 'none', borderRadius: '0' }}>
                    <TableHeader>
                      <span>Order #</span>
                      <span>Time</span>
                      <span>Customer</span>
                      <span>Staff</span>
                      <span>Subtotal</span>
                      <span>Total</span>
                      <span>Payment</span>
                      <span>Status</span>
                    </TableHeader>
                    
                    {detailTransactions.length === 0 ? (
                      <EmptyState>
                        <EmptyStateIcon>📋</EmptyStateIcon>
                        <EmptyStateText>
                          No transactions found for this date
                        </EmptyStateText>
                      </EmptyState>
                    ) : (
                      <>
                        {detailTransactions.map(transaction => (
                      <TableRow key={transaction.id}>
                        <OrderNumber>{transaction.orderNumber}</OrderNumber>
                        <DateTime>{transaction.time}</DateTime>
                        
                        <CustomerInfo>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <CustomerName>{transaction.customer.name}</CustomerName>
                            <CustomerType type={transaction.customer.type}>
                              {transaction.customer.type}
                            </CustomerType>
                          </div>
                        </CustomerInfo>
                        
                        <div style={{ fontSize: '14px', color: '#1F2937' }}>
                          {transaction.staff.name}
                        </div>
                        
                        <Amount>{formatCurrency(transaction.subtotal)}</Amount>
                        <Amount>{formatCurrency(transaction.total)}</Amount>
                        
                        <PaymentBadge method={transaction.paymentMethod}>
                          {transaction.paymentMethod.replace('_', ' ')}
                        </PaymentBadge>
                        
                        <StatusBadge status={transaction.status}>
                          {transaction.status}
                        </StatusBadge>
                      </TableRow>
                    ))}

                    {/* Mobile Cards for detail transactions */}
                    {detailTransactions.map(transaction => (
                      <MobileCard key={`mobile-detail-${transaction.id}`}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                          <div>
                            <OrderNumber>{transaction.orderNumber}</OrderNumber>
                            <DateTime>{transaction.time}</DateTime>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                            <Amount>{formatCurrency(transaction.total)}</Amount>
                            <StatusBadge status={transaction.status}>
                              {transaction.status}
                            </StatusBadge>
                          </div>
                        </div>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <CustomerInfo>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <CustomerName>{transaction.customer.name}</CustomerName>
                              <CustomerType type={transaction.customer.type}>
                                {transaction.customer.type}
                              </CustomerType>
                            </div>
                            <div style={{ fontSize: '12px', color: '#6B7280' }}>
                              Staff: {transaction.staff.name}
                            </div>
                          </CustomerInfo>
                          
                          <PaymentBadge method={transaction.paymentMethod}>
                            {transaction.paymentMethod.replace('_', ' ')}
                          </PaymentBadge>
                        </div>
                      </MobileCard>
                    ))}
                      </>
                    )}
                  </TableContainer>
                </DetailTransactionContainer>
              )}

              {/* Aggregate Data Table (for yearly/monthly views) */}
              {detailView.type !== 'day' && (
                <TableContainer>
                  <TableHeader>
                    <span>Period</span>
                    <span>Total Sales</span>
                    <span>Transactions</span>
                    <span>Avg Order Value</span>
                    <span>Growth Rate</span>
                    <span>Sales Rank</span>
                    <span></span>
                    <span></span>
                  </TableHeader>
                  
                  {aggregateData.length === 0 ? (
                    <EmptyState>
                      <EmptyStateText>
                        No data available for aggregation
                      </EmptyStateText>
                    </EmptyState>
                  ) : (
                    <>
                      {/* Desktop Table */}
                      {aggregateData.map((aggregate, index) => (
                        <TableRow 
                          key={aggregate.period}
                          onClick={() => handleAggregateClick(aggregate)}
                        >
                          <PeriodTitle style={{ fontSize: '16px', fontWeight: '600' }}>
                            {aggregate.period}
                          </PeriodTitle>
                          
                          <Amount>{formatCurrency(aggregate.totalSales)}</Amount>
                          
                          <div style={{ fontSize: '14px', fontWeight: '500', color: '#1F2937' }}>
                            {aggregate.totalTransactions.toLocaleString()}
                          </div>
                          
                          <Amount>{formatCurrency(aggregate.averageOrderValue)}</Amount>
                          
                          <div>
                            {aggregate.growth !== undefined ? (
                              <GrowthBadge positive={aggregate.growth > 0}>
                                {aggregate.growth > 0 ? '+' : ''}{aggregate.growth.toFixed(1)}%
                              </GrowthBadge>
                            ) : (
                              <span style={{ fontSize: '12px', color: '#9CA3AF' }}>N/A</span>
                            )}
                          </div>
                          
                          <div style={{ fontSize: '14px', fontWeight: '600', color: '#635BFF' }}>
                            #{index + 1}
                          </div>
                          
                          <div></div>
                          <div></div>
                        </TableRow>
                      ))}

                      {/* Mobile Cards */}
                      {aggregateData.map((aggregate, index) => (
                        <MobileCard 
                          key={`mobile-${aggregate.period}`}
                          onClick={() => handleAggregateClick(aggregate)}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                            <div>
                              <PeriodTitle style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>
                                {aggregate.period}
                              </PeriodTitle>
                              <div style={{ fontSize: '12px', color: '#6B7280' }}>
                                {aggregate.totalTransactions.toLocaleString()} transactions
                              </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                              <Amount>{formatCurrency(aggregate.totalSales)}</Amount>
                              {aggregate.growth !== undefined && (
                                <GrowthBadge positive={aggregate.growth > 0}>
                                  {aggregate.growth > 0 ? '+' : ''}{aggregate.growth.toFixed(1)}%
                                </GrowthBadge>
                              )}
                            </div>
                          </div>
                          
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                              <div style={{ fontSize: '14px', fontWeight: '500', color: '#1F2937' }}>
                                Avg Order: {formatCurrency(aggregate.averageOrderValue)}
                              </div>
                            </div>
                            
                            <div style={{ 
                              padding: '4px 8px', 
                              borderRadius: '6px', 
                              fontSize: '12px', 
                              fontWeight: '600',
                              background: '#EDE9FE',
                              color: '#5B21B6'
                            }}>
                              #{index + 1}
                            </div>
                          </div>
                        </MobileCard>
                      ))}
                    </>
                  )}
                </TableContainer>
              )}

              {/* Pagination for Daily View */}
              {viewMode === 'daily' && !detailView.type && (
                <PaginationContainer>
                  <PaginationButton 
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Previous
                  </PaginationButton>
                  
                  <PageInfo>
                    Page {currentPage} • Showing {pageSize} days
                  </PageInfo>
                  
                  <PaginationButton 
                    disabled={aggregateData.length < pageSize}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next
                  </PaginationButton>
                </PaginationContainer>
              )}
            </>
          )}
        </Content>
      </SalesContainer>
    </MainLayout>
  );
};

export default SalesPage;