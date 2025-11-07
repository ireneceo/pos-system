import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

// 스탭 타입 정의
export interface Staff {
  id: string;
  username: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'manager' | 'cashier' | 'kitchen' | 'server';
  department: 'management' | 'kitchen' | 'service' | 'delivery';
  avatar?: string;
  isActive: boolean;
  permissions: string[];
  joinDate: string;
  lastLogin?: string;
  totalShifts: number;
  totalSales: number;
  performance: {
    efficiency: number;
    customerRating: number;
    ordersProcessed: number;
  };
  schedule: {
    monday: { start: string; end: string; active: boolean };
    tuesday: { start: string; end: string; active: boolean };
    wednesday: { start: string; end: string; active: boolean };
    thursday: { start: string; end: string; active: boolean };
    friday: { start: string; end: string; active: boolean };
    saturday: { start: string; end: string; active: boolean };
    sunday: { start: string; end: string; active: boolean };
  };
}

export interface Shift {
  id: string;
  staffId: string;
  staffName: string;
  startTime: string;
  endTime?: string;
  breakTime?: number;
  salesAmount: number;
  ordersProcessed: number;
  status: 'active' | 'completed' | 'break';
}

// Context 타입 정의
interface StaffContextType {
  // 현재 로그인된 스탭
  currentStaff: Staff | null;
  currentShift: Shift | null;
  isLoggedIn: boolean;
  
  // 모든 스탭 관리
  staffList: Staff[];
  activeShifts: Shift[];
  
  // 인증 함수들
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  
  // 스탭 관리 함수들
  addStaff: (staffData: Partial<Staff>) => Promise<Staff>;
  updateStaff: (staffId: string, updates: Partial<Staff>) => Promise<Staff>;
  deactivateStaff: (staffId: string) => void;
  getStaffById: (id: string) => Staff | null;
  searchStaff: (query: string) => Staff[];
  
  // 시프트 관리
  startShift: (staffId: string) => Promise<Shift>;
  endShift: (shiftId: string) => void;
  startBreak: (shiftId: string) => void;
  endBreak: (shiftId: string) => void;
  updateShiftStats: (shiftId: string, salesAmount: number, orders: number) => void;
  
  // 권한 관리
  hasPermission: (permission: string) => boolean;
  getRolePermissions: (role: Staff['role']) => string[];
}

const StaffContext = createContext<StaffContextType | undefined>(undefined);

export const useStaff = () => {
  const context = useContext(StaffContext);
  if (!context) {
    throw new Error('useStaff must be used within a StaffProvider');
  }
  return context;
};

export const StaffProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [currentStaff, setCurrentStaff] = useState<Staff | null>(null);
  const [currentShift, setCurrentShift] = useState<Shift | null>(null);
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [activeShifts, setActiveShifts] = useState<Shift[]>([]);

  const isLoggedIn = !!currentStaff;

  // Helper function to get fetch options with credentials
  const getFetchOptions = (options: RequestInit = {}): RequestInit => {
    const token = localStorage.getItem('auth_token');
    return {
      ...options,
      credentials: 'include', // 쿠키를 포함하여 요청
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...(options.headers || {})
      }
    };
  };

  // 권한 정의
  const ROLE_PERMISSIONS = {
    admin: ['all'],
    manager: [
      'staff_management', 'shift_management', 'reports_view', 'settings_edit',
      'pos_access', 'kitchen_access', 'customer_management', 'inventory_management'
    ],
    cashier: ['pos_access', 'customer_management', 'shift_basic'],
    kitchen: ['kitchen_access', 'order_management', 'shift_basic'],
    server: ['pos_access', 'customer_service', 'shift_basic']
  };

  // AuthContext에서 로그인한 사용자 정보를 사용하여 자동 로그인
  useEffect(() => {
    if (isAuthenticated && user && !currentStaff) {
      console.log('🔑 Auto-login from AuthContext user:', user);

      // AuthContext의 user를 Staff 형태로 변환
      const staffFromAuth: Staff = {
        id: user.id,
        username: user.email.split('@')[0],
        name: user.name,
        email: user.email,
        phone: '',
        role: user.role.toLowerCase().includes('admin') ? 'admin' :
              user.role.toLowerCase().includes('staff') ? 'cashier' : 'manager',
        department: 'management',
        isActive: true,
        permissions: user.permissions || [],
        joinDate: new Date().toISOString(),
        totalShifts: 0,
        totalSales: 0,
        performance: {
          efficiency: 100,
          customerRating: 5,
          ordersProcessed: 0
        },
        schedule: {
          monday: { start: '09:00', end: '18:00', active: true },
          tuesday: { start: '09:00', end: '18:00', active: true },
          wednesday: { start: '09:00', end: '18:00', active: true },
          thursday: { start: '09:00', end: '18:00', active: true },
          friday: { start: '09:00', end: '18:00', active: true },
          saturday: { start: '09:00', end: '18:00', active: true },
          sunday: { start: '09:00', end: '18:00', active: true }
        }
      };

      setCurrentStaff(staffFromAuth);
      console.log('✅ Staff auto-login successful');
    }
  }, [isAuthenticated, user]);

  // 초기 데이터 로드 - DB에서 가져오기
  useEffect(() => {
    loadInitialData();
  }, []);

  // localStorage 세션 체크 제거 - 서버 세션만 사용

  const loadInitialData = async () => {
    try {
      // DB에서 스탭 목록 가져오기
      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/staff', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });
      const data = await response.json();

      if (data.success && Array.isArray(data.data)) {
        setStaffList(data.data);
        console.log('✅ Loaded staff from database:', data.data.length);
      } else {
        console.warn('⚠️ No staff found, using empty list');
        setStaffList([]);
      }
    } catch (error) {
      console.error('Failed to load staff:', error);
      setStaffList([]);
    }
  };


  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      // 서버에 로그인 요청
      const response = await fetch('/api/staff/login', getFetchOptions({
        method: 'POST',
        body: JSON.stringify({ username, password })
      }));

      const data = await response.json();

      if (response.ok && data.success) {
        setCurrentStaff(data.data);
        console.log('✅ Staff logged in:', data.data.username);
        return true;
      }

      console.error('❌ Staff login failed:', data.message);
      return false;
    } catch (error) {
      console.error('Staff login error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      if (currentShift && currentShift.status === 'active') {
        endShift(currentShift.id);
      }

      // 서버에 로그아웃 요청
      await fetch('/api/staff/logout', getFetchOptions({
        method: 'POST'
      }));

      setCurrentStaff(null);
      setCurrentShift(null);
      console.log('✅ Staff logged out');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const addStaff = async (staffData: Partial<Staff>): Promise<Staff> => {
    const newStaff: Staff = {
      id: `staff-${Date.now()}`,
      username: staffData.username || '',
      name: staffData.name || '',
      email: staffData.email || '',
      phone: staffData.phone || '',
      role: staffData.role || 'cashier',
      department: staffData.department || 'service',
      isActive: true,
      permissions: ROLE_PERMISSIONS[staffData.role || 'cashier'],
      joinDate: new Date().toISOString().split('T')[0],
      totalShifts: 0,
      totalSales: 0,
      performance: {
        efficiency: 0,
        customerRating: 0,
        ordersProcessed: 0
      },
      schedule: {
        monday: { start: '09:00', end: '17:00', active: false },
        tuesday: { start: '09:00', end: '17:00', active: false },
        wednesday: { start: '09:00', end: '17:00', active: false },
        thursday: { start: '09:00', end: '17:00', active: false },
        friday: { start: '09:00', end: '17:00', active: false },
        saturday: { start: '09:00', end: '17:00', active: false },
        sunday: { start: '09:00', end: '17:00', active: false }
      },
      ...staffData
    };

    setStaffList(prev => [...prev, newStaff]);
    return newStaff;
  };

  const updateStaff = async (staffId: string, updates: Partial<Staff>): Promise<Staff> => {
    const updatedStaffList = staffList.map(staff => 
      staff.id === staffId ? { ...staff, ...updates } : staff
    );
    
    setStaffList(updatedStaffList);
    
    const updatedStaff = updatedStaffList.find(s => s.id === staffId)!;
    
    // 현재 로그인된 스탭 업데이트
    if (currentStaff?.id === staffId) {
      setCurrentStaff(updatedStaff);
    }
    
    return updatedStaff;
  };

  const deactivateStaff = (staffId: string) => {
    updateStaff(staffId, { isActive: false });
  };

  const getStaffById = (id: string): Staff | null => {
    return staffList.find(staff => staff.id === id) || null;
  };

  const searchStaff = (query: string): Staff[] => {
    if (!query.trim()) return staffList;
    
    const lowercaseQuery = query.toLowerCase();
    return staffList.filter(staff => 
      staff.name.toLowerCase().includes(lowercaseQuery) ||
      staff.username.toLowerCase().includes(lowercaseQuery) ||
      staff.email.toLowerCase().includes(lowercaseQuery) ||
      staff.phone.includes(query)
    );
  };

  const startShift = async (staffId: string): Promise<Shift> => {
    const newShift: Shift = {
      id: `shift-${Date.now()}`,
      staffId,
      staffName: getStaffById(staffId)?.name || 'Unknown',
      startTime: new Date().toISOString(),
      salesAmount: 0,
      ordersProcessed: 0,
      status: 'active'
    };

    setActiveShifts(prev => [...prev, newShift]);
    
    if (currentStaff?.id === staffId) {
      setCurrentShift(newShift);
    }
    
    return newShift;
  };

  const endShift = (shiftId: string) => {
    setActiveShifts(prev => 
      prev.map(shift => 
        shift.id === shiftId 
          ? { ...shift, endTime: new Date().toISOString(), status: 'completed' as const }
          : shift
      )
    );
    
    if (currentShift?.id === shiftId) {
      setCurrentShift(null);
    }
  };

  const startBreak = (shiftId: string) => {
    setActiveShifts(prev =>
      prev.map(shift =>
        shift.id === shiftId ? { ...shift, status: 'break' as const } : shift
      )
    );
  };

  const endBreak = (shiftId: string) => {
    setActiveShifts(prev =>
      prev.map(shift =>
        shift.id === shiftId ? { ...shift, status: 'active' as const } : shift
      )
    );
  };

  const updateShiftStats = (shiftId: string, salesAmount: number, orders: number) => {
    setActiveShifts(prev =>
      prev.map(shift =>
        shift.id === shiftId 
          ? { 
              ...shift, 
              salesAmount: shift.salesAmount + salesAmount,
              ordersProcessed: shift.ordersProcessed + orders
            }
          : shift
      )
    );
  };

  const hasPermission = (permission: string): boolean => {
    if (!currentStaff) return false;
    return currentStaff.permissions.includes('all') || currentStaff.permissions.includes(permission);
  };

  const getRolePermissions = (role: Staff['role']): string[] => {
    return ROLE_PERMISSIONS[role];
  };

  const value: StaffContextType = {
    currentStaff,
    currentShift,
    isLoggedIn,
    staffList,
    activeShifts,
    login,
    logout,
    addStaff,
    updateStaff,
    deactivateStaff,
    getStaffById,
    searchStaff,
    startShift,
    endShift,
    startBreak,
    endBreak,
    updateShiftStats,
    hasPermission,
    getRolePermissions
  };

  return (
    <StaffContext.Provider value={value}>
      {children}
    </StaffContext.Provider>
  );
};