import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MainLayout from '../../components/Layout/MainLayout';
import {
  Container,
  Header,
  Title,
  ActionSection,
  Button,
  Content,
  StatsGrid,
  StatCard,
  StatValue,
  StatLabel,
  StatDescription,
  Table,
  TableHeader as CommonTableHeader,
  TableRow as CommonTableRow,
  MobileLabel,
  MobileValue,
  MobileGrid,
  ActionButtons,
  // ActionButton, // Removed - not used after handleEditManager was commented out
  IconButton
} from '../../components/UI';
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import { formatCurrency } from '../../utils/currency';
import { useStore } from '../../contexts/StoreContext';

interface Manager {
  id: string;
  managerId: string;
  userId: number; // Actual numeric user ID for filtering
  fullName: string;
  companyName: string;
  email: string;
  position: string;
  department: string;
  phone: string;
  status: 'active' | 'inactive';
  restaurantCount: number;
  totalRevenue: number;
  createdAt: string;
  lastActive: string;
  address: string;
}

// Common components now imported from ../../components/UI
// Page-specific styled components below

// 페이지별 반응형 테이블 헤더 (Managers 전용)
const ManagerTableHeader = styled(CommonTableHeader)`
  @media (max-width: 1400px) {
    & > span:nth-child(4),
    & > span:nth-child(5) {
      display: none;
    }
  }

  @media (max-width: 1024px) {
    & > span:nth-child(3),
    & > span:nth-child(4),
    & > span:nth-child(5) {
      display: none;
    }
  }
`;

// 페이지별 반응형 테이블 행 (Managers 전용)
const ManagerTableRow = styled(CommonTableRow)`
  @media (max-width: 1400px) {
    & > div:nth-child(4),
    & > div:nth-child(5) {
      display: none;
    }
  }

  @media (max-width: 1024px) {
    & > div:nth-child(3),
    & > div:nth-child(4),
    & > div:nth-child(5) {
      display: none;
    }
  }
`;



const ManagerInfo = styled.div``;

const CompanyName = styled.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`;

const ContactInfo = styled.div`
  font-size: 13px;
  color: #6B7280;
`;

const StatusBadge = styled.span<{ status: string }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  background: ${props => {
    switch(props.status) {
      case 'active': return '#ECFDF5';
      case 'inactive': return '#FEE2E2';
      default: return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'active': return '#059669';
      case 'inactive': return '#DC2626';
      default: return '#6B7280';
    }
  }};
`;

const IconSymbol = styled.span`
  font-size: 14px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
`;

// Validation helpers



// Modal styled components
const ModalOverlay = styled.div<{ show?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => props.show ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: white;
  border-radius: 12px;
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 28px;
  color: #6B7280;
  cursor: pointer;
  line-height: 1;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    background: #F3F4F6;
    color: #0A2540;
  }
`;

const ModalBody = styled.div`
  padding: 24px;
`;

const ModalActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`;

const FormInput = styled.input`
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;


const FormTextarea = styled.textarea`
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  min-height: 80px;
  resize: vertical;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

// Success Modal Components
const SuccessModal = styled.div`
  background: white;
  border-radius: 16px;
  padding: 48px 32px;
  max-width: 400px;
  width: 90%;
  text-align: center;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
`;

const SuccessIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #10B981 0%, #059669 100%);
  color: white;
  font-size: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  font-weight: bold;
`;

const SuccessTitle = styled.h3`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 12px 0;
`;

const SuccessMessage = styled.p`
  font-size: 16px;
  color: #6B7280;
  margin: 0 0 32px 0;
  line-height: 1.5;
`;

const ManagersPage: React.FC = () => {
  const { operationSettings } = useStore();
  const [managers, setManagers] = useState<Manager[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedManager, setSelectedManager] = useState<Manager | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState<'delete' | 'resetPassword' | 'toggle' | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingManager, setEditingManager] = useState<Manager | null>(null);
  const [newManager, setNewManager] = useState({
    managerId: '',
    fullName: '',
    companyName: '',
    email: '',
    position: '',
    department: '',
    phone: '',
    address: '',
    role: 'Foodcourt Manager' as 'Foodcourt General' | 'Foodcourt Manager' | 'Brand General' | 'Brand Manager'
  });

  const navigate = useNavigate();

  const handleViewManagerRestaurants = (manager: Manager) => {
    // Use the actual numeric user ID for filtering
    console.log('🔗 Navigating to restaurants for manager:', manager.fullName, 'User ID:', manager.userId, 'Manager object:', manager);
    navigate(`/pos/admin/restaurants?managerId=${manager.userId}&managerName=${encodeURIComponent(manager.fullName)}`);
  };

  const fetchManagers = async () => {
    try {
      console.log('🔄 Fetching managers from API...');

      // Fetch managers only (4 roles: Foodcourt General, Foodcourt Manager, Brand General, Brand Manager)
      const usersResponse = await fetch('/api/users?role=Manager');
      console.log('📡 Users API response status:', usersResponse.status);

      if (usersResponse.ok) {
        const usersData = await usersResponse.json();
        console.log('👥 Manager users data from API:', usersData);

        // Fetch all restaurants to calculate counts and revenue
        const restaurantsResponse = await fetch('/api/restaurants');
        const restaurantsData = restaurantsResponse.ok ? await restaurantsResponse.json() : [];
        console.log('🏪 All restaurants data:', restaurantsData);

        // Handle both data array and direct array
        const managerUsers = usersData.data || usersData;
        console.log('👔 Manager users found:', managerUsers);
        
        if (managerUsers.length === 0) {
          console.log('⚠️ No manager users found');
          setManagers([]);
          return;
        }
        
        // Fetch invoices once for all managers
        let invoicesData: any[] = [];
        try {
          const invoicesResponse = await fetch('/api/invoices');
          if (invoicesResponse.ok) {
            const invoices = await invoicesResponse.json();
            invoicesData = invoices.data || invoices;
          }
        } catch (error) {
          console.error('❌ Error fetching invoices:', error);
        }

        // Transform API data to Manager interface
        const managersData: Manager[] = managerUsers.map((user: any) => {
          console.log('🔄 Processing manager:', user);

          // Find restaurants managed by this manager using both old managerId and new managers array
          const managerRestaurants = restaurantsData.filter((restaurant: any) => {
            // Check old single managerId field
            const matchesManagerId = restaurant.managerId === user.id.toString();
            // Check new managers array
            const matchesManagersArray = restaurant.managers && Array.isArray(restaurant.managers) &&
              restaurant.managers.some((m: any) => m.id.toString() === user.id.toString());
            return matchesManagerId || matchesManagersArray;
          });

          console.log(`🔍 Manager ${user.username} (ID: ${user.id}) has ${managerRestaurants.length} restaurants`);

          // Calculate total revenue from actual invoices
          let totalRevenue = 0;
          try {
            // Sum up invoices for restaurants managed by this manager
            totalRevenue = invoicesData
              .filter((invoice: any) => {
                return managerRestaurants.some((restaurant: any) =>
                  restaurant.id.toString() === invoice.restaurant_id?.toString()
                );
              })
              .reduce((sum: number, invoice: any) => {
                  return sum + (parseFloat(invoice.amount || invoice.total || 0));
                }, 0);
          } catch (error) {
            console.log('Could not fetch invoices for revenue calculation:', error);
            totalRevenue = 0;
          }
          
          // Managers are active by default
          const subscriptionStatus = 'active';
          
          const managerData = {
            id: `mgr-${user.id}`,
            managerId: user.username || `manager-${user.id}`,
            userId: user.id, // Store numeric user ID for filtering
            fullName: user.full_name || user.username || 'Unknown Name',
            companyName: user.company_name || 'Unknown Company',
            email: user.email,
            position: user.role || user.position || 'Manager', // Use role instead of position for English display
            department: user.department || 'Management',
            phone: user.phone || '+60 12-345-6789',
            status: subscriptionStatus as 'active' | 'inactive',
            restaurantCount: managerRestaurants.length,
            totalRevenue: totalRevenue,
            createdAt: user.createdAt ? new Date(user.createdAt).toISOString().split('T')[0] : '2024-01-01',
            lastActive: new Date().toISOString().split('T')[0],
            address: user.address || 'No address provided'
          };
          
          console.log('✅ Transformed manager:', managerData);
          return managerData;
        });
        
        console.log('✅ All transformed managers data:', managersData);
        console.log('✅ Setting managers state with', managersData.length, 'managers');
        setManagers(managersData);
        
      } else {
        console.error('❌ Failed to fetch users:', usersResponse.status);
        setManagers([]);
      }
      
    } catch (error) {
      console.error('❌ Error fetching managers:', error);
      console.error('Error details:', error);
      setManagers([]);
    }
  };

  useEffect(() => {
    fetchManagers();
  }, []);

  console.log('🔍 Filtering managers:', {
    totalManagers: managers.length,
    searchTerm,
    filterStatus,
    managers: managers
  });

  const filteredManagers = managers.filter(manager => {
    const matchesSearch = manager.managerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         manager.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         manager.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         manager.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         manager.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         manager.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || manager.status === filterStatus;
    
    console.log('🔍 Manager filter check:', {
      manager: manager.managerId,
      matchesSearch,
      matchesFilter,
      managerStatus: manager.status,
      expectedStatus: filterStatus
    });
    
    return matchesSearch && matchesFilter;
  });

  console.log('🔍 Filtered results:', filteredManagers.length, 'managers');

  const totalManagers = managers.length;
  const totalRestaurants = managers.reduce((sum, m) => sum + m.restaurantCount, 0);
  // Active subscriptions = total restaurants (since each restaurant is a separate subscription)
  const activeSubscriptions = totalRestaurants;
  const totalRevenue = managers.reduce((sum, m) => sum + m.totalRevenue, 0);

  const handleAddManager = () => {
    console.log('🔵 Add Manager button clicked');
    try {
      setShowAddModal(true);
      console.log('✅ Modal state updated to true');
    } catch (error) {
      console.error('❌ Error opening modal:', error);
      alert('Error opening modal: ' + error.message);
    }
  };

  // CSV 변환 함수
  const convertToCSV = (data: any[]) => {
    if (data.length === 0) return '';

    const headers = Object.keys(data[0]);
    const csvHeaders = headers.join(',');

    const csvRows = data.map(row =>
      headers.map(header => {
        const value = row[header];
        // CSV에서 쉼표와 따옴표 처리
        if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value || '';
      }).join(',')
    );

    return [csvHeaders, ...csvRows].join('\n');
  };

  const handleExportManagers = () => {
    // 현재 필터링된 매니저 리스트를 사용하여 CSV 데이터 생성
    const csvData = filteredManagers.map(manager => ({
      'Manager Info': `${manager.fullName} (${manager.companyName})`,
      'Email': manager.email,
      'Phone': manager.phone,
      'Status': manager.status,
      'Restaurants': manager.restaurantCount,
      'Revenue (RM)': manager.totalRevenue.toLocaleString(),
      'Last Active': manager.lastActive,
      'Position': manager.position,
      'Department': manager.department,
      'Address': manager.address,
      'Created At': manager.createdAt
    }));

    const csvContent = convertToCSV(csvData);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `managers-export-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setNewManager({
      managerId: '',
      fullName: '',
      companyName: '',
      email: '',
      position: '',
      department: '',
      phone: '',
      address: '',
      role: 'Foodcourt Manager'
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setNewManager(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleToggleStatus = (manager: Manager) => {
    setSelectedManager(manager);
    setConfirmAction('toggle');
    setShowConfirmModal(true);
  };

  const handlePasswordReset = (manager: Manager) => {
    setSelectedManager(manager);
    setConfirmAction('resetPassword');
    setShowConfirmModal(true);
  };

  const handleDeleteManager = (manager: Manager) => {
    setSelectedManager(manager);
    setConfirmAction('delete');
    setShowConfirmModal(true);
  };

//   const handleViewManager = (manager: Manager) => {
//     setSelectedManager(manager);
//     setShowViewModal(true);
//   };
// 
//   const handleEditManager = (manager: Manager) => {
//     setEditingManager(manager);
//     setShowEditModal(true);
//   };
// 
  const handleUpdateManager = async () => {
    if (!editingManager) return;

    if (!editingManager.managerId || !editingManager.fullName || !editingManager.companyName || !editingManager.email || !editingManager.position || !editingManager.department || !editingManager.phone) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      console.log('🔄 Updating manager:', editingManager);

      // Extract the real user ID from the manager ID (remove 'mgr-' prefix)
      const userId = editingManager.id.replace('mgr-', '');
      console.log('📝 Extracted user ID:', userId);

      // Prepare update data for backend API
      const updateData = {
        username: editingManager.managerId, // Manager ID as username
        full_name: editingManager.fullName,
        company_name: editingManager.companyName,
        email: editingManager.email,
        position: editingManager.position,
        department: editingManager.department,
        phone: editingManager.phone,
        address: editingManager.address
      };

      console.log('📝 Update data:', updateData);

      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });

      console.log('📡 Update response status:', response.status);

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Manager updated successfully:', result);

        // Close modal first
        setShowEditModal(false);
        setEditingManager(null);

        // Show success message
        setSuccessMessage('Manager updated successfully');
        setShowSuccessModal(true);

        // Refresh the managers list from server
        console.log('🔄 Refreshing managers list...');
        await fetchManagers();
      } else {
        const errorData = await response.json();
        console.error('❌ Update failed:', errorData);
        throw new Error(errorData.error || 'Update failed');
      }
    } catch (error) {
      console.error('❌ Error updating manager:', error);
      alert('Error updating manager: ' + error.message);
    }
  };

  const handleConfirmAction = async () => {
    if (!selectedManager || !confirmAction) return;

    try {
      if (confirmAction === 'delete') {
        console.log('🔄 Deleting manager:', selectedManager.id);
        
        // Extract the real user ID from the manager ID (remove 'mgr-' prefix)
        const userId = selectedManager.id.replace('mgr-', '');
        console.log('📝 Extracted user ID:', userId);
        
        const response = await fetch(`/api/users/${userId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        console.log('📡 Delete response status:', response.status);
        
        if (response.ok) {
          // Refresh managers list from server to ensure consistency
          await fetchManagers();
          setSuccessMessage('Manager deleted successfully');
          console.log('✅ Manager deleted and list refreshed');
        } else {
          const errorData = await response.text();
          console.error('❌ Delete failed:', errorData);
          throw new Error(`Delete failed: ${response.status}`);
        }
      } else if (confirmAction === 'resetPassword') {
        const userId = selectedManager.id.replace('mgr-', '');

        // Generate random password (8 chars: letters + numbers)
        const randomPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-4).toUpperCase();

        const response = await fetch(`/api/users/${userId}/reset-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            newPassword: randomPassword
          })
        });

        if (response.ok) {
          setSuccessMessage(`Password reset successfully. New password: ${randomPassword}\n\nPlease save this password and share it securely with the manager.`);
        } else {
          throw new Error('Password reset failed');
        }
      } else if (confirmAction === 'toggle') {
        const userId = selectedManager.id.replace('mgr-', '');
        const newStatus = selectedManager.status === 'active' ? 'inactive' : 'active';

        // Update status on server
        const response = await fetch(`/api/users/${userId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus })
        });

        if (response.ok) {
          // Update local state only after successful API call
          setManagers(prev => prev.map(m =>
            m.id === selectedManager.id ? { ...m, status: newStatus } : m
          ));
          setSuccessMessage(`Manager ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully`);
        } else {
          throw new Error('Status update failed');
        }
      }

      setShowSuccessModal(true);
    } catch (error) {
      console.error('❌ Action failed:', error);
      alert(`Action failed: ${error.message}. Please try again.`);
    }

    setShowConfirmModal(false);
    setSelectedManager(null);
    setConfirmAction(null);
  };

  // Test connection function
  const testConnection = async () => {
    try {
      console.log('🔗 Testing connection to /api/users...');
      const testResponse = await fetch('/api/users?role=Manager', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        mode: 'cors'
      });
      
      console.log('🔗 Test response status:', testResponse.status);
      console.log('🔗 Test response ok:', testResponse.ok);
      
      if (testResponse.ok) {
        const testData = await testResponse.json();
        console.log('🔗 Test data received:', Array.isArray(testData) ? `${testData.length} managers` : 'Non-array response');
        return true;
      } else {
        console.error('🔗 Connection test failed with status:', testResponse.status);
        return false;
      }
    } catch (error) {
      console.error('🔗 Connection test failed:', error);
      return false;
    }
  };

  const handleSubmit = async () => {
    console.log('🔄 Handle submit called with data:', newManager);
    
    // Test connection first
    const isConnected = await testConnection();
    if (!isConnected) {
      alert('Cannot connect to backend server. Please check if the server is running');
      return;
    }
    
    if (!newManager.managerId || !newManager.fullName || !newManager.companyName || !newManager.email || !newManager.position || !newManager.department || !newManager.phone) {
      console.error('❌ Validation failed:', {
        managerId: newManager.managerId,
        fullName: newManager.fullName,
        companyName: newManager.companyName,
        email: newManager.email,
        position: newManager.position,
        department: newManager.department,
        phone: newManager.phone
      });
      alert('Please fill in all required fields');
      return;
    }

    console.log('✅ Validation passed, proceeding with manager creation...');

    try {
      // Use managerId as username and include all profile data
      const managerUserData = {
        username: newManager.managerId,
        email: newManager.email,
        password: 'manager123', // Default password
        role: newManager.role,
        full_name: newManager.fullName,
        company_name: newManager.companyName,
        position: newManager.position,
        department: newManager.department,
        phone: newManager.phone,
        address: newManager.address
      };

      console.log('🔄 Creating manager user:', managerUserData);
      console.log('📍 API URL:', '/api/users');
      
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(managerUserData)
      });

      console.log('📡 Response status:', response.status);
      console.log('📡 Response ok:', response.ok);
      
      let result;
      const contentType = response.headers.get('content-type');
      console.log('📡 Content-Type:', contentType);
      
      if (contentType && contentType.includes('application/json')) {
        result = await response.json();
      } else {
        const responseText = await response.text();
        console.log('📡 Response text:', responseText);
        
        if (responseText.trim() === '') {
          throw new Error('Empty response from server');
        }
        
        try {
          result = JSON.parse(responseText);
        } catch (parseError) {
          console.error('❌ Failed to parse response:', parseError);
          console.error('Response was:', responseText);
          throw new Error(`Invalid JSON response: ${responseText.substring(0, 100)}...`);
        }
      }
      
      console.log('📡 Parsed result:', result);

      if (response.ok) {
        console.log('✅ Manager created successfully:', result);
        
        // Close modal first
        handleCloseModal();
        
        // Show success message in modal
        setSuccessMessage('Manager created successfully! Default password: manager123');
        setShowSuccessModal(true);
        
        // Refresh the managers list from server
        console.log('🔄 Refreshing managers list...');
        await fetchManagers();
      } else {
        console.error('❌ Failed to create manager:', result);
        alert('Failed to create manager: ' + (result.error || result.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('❌ Error creating manager:', error);
      console.error('Error details:', {
        name: (error as Error).name,
        message: (error as Error).message,
        stack: (error as Error).stack
      });
      
      if ((error as Error).message.includes('Failed to fetch')) {
        alert('Cannot connect to server. Please ensure the backend server is running');
      } else {
        alert('Error creating manager: ' + (error as Error).message);
      }
    }
  };


  return (
    <MainLayout>
      <Container>
        <Header>
          <Title>Managers</Title>
          <ActionSection>
            <Button variant="secondary" onClick={handleExportManagers}>Export</Button>
            <Button variant="primary" onClick={handleAddManager}>Add Manager</Button>
          </ActionSection>
        </Header>
        
        <Content>
          <StatsGrid>
          <StatCard color="#059669">
            <StatValue>{totalManagers}</StatValue>
            <StatLabel>Total Managers</StatLabel>
            <StatDescription>Currently active</StatDescription>
          </StatCard>
          <StatCard color="#2563EB">
            <StatValue>{activeSubscriptions}</StatValue>
            <StatLabel>Active Subscriptions</StatLabel>
            <StatDescription>{totalManagers > 0 ? (totalRestaurants/totalManagers).toFixed(1) : 0} restaurants per manager</StatDescription>
          </StatCard>
          <StatCard color="#7C3AED">
            <StatValue>{totalRestaurants}</StatValue>
            <StatLabel>Total Restaurants</StatLabel>
            <StatDescription>Across all managers</StatDescription>
          </StatCard>
          <StatCard color="#D97706">
            <StatValue>{formatCurrency(totalRevenue / 1000, operationSettings.currency).replace(/\.\d+/, '')}k</StatValue>
            <StatLabel>Total Revenue</StatLabel>
            <StatDescription>From actual invoices</StatDescription>
          </StatCard>
        </StatsGrid>

        <FilterBar>
          <SearchInput
            type="text"
            placeholder="Search by name, email, or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <FilterSelect
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </FilterSelect>
        </FilterBar>

        <Table>
          <ManagerTableHeader columns="2fr 1fr 1fr 1fr 1fr 200px">
            <span>Manager Info</span>
            <span>Status</span>
            <span>Restaurants</span>
            <span>Revenue (RM)</span>
            <span>Last Active</span>
            <span>Actions</span>
          </ManagerTableHeader>

          {filteredManagers.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#6B7280' }}>
              <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                No managers found
              </div>
              <div style={{ fontSize: '14px' }}>
                {managers.length === 0 ? 'Data may still be loading...' : 'Try adjusting your filters'}
              </div>
            </div>
          ) : (
            filteredManagers.map(manager => (
              <ManagerTableRow columns="2fr 1fr 1fr 1fr 1fr 200px" key={manager.id}>
                <MobileGrid>
                  <MobileValue>
                    <MobileLabel>Manager Info</MobileLabel>
                    <ManagerInfo>
                      <CompanyName>{manager.fullName}</CompanyName>
                      <ContactInfo>
                        {manager.companyName} • {manager.position} • {manager.department}
                      </ContactInfo>
                    </ManagerInfo>
                  </MobileValue>

                  <MobileValue>
                    <MobileLabel>Status</MobileLabel>
                    <div>
                      <StatusBadge status={manager.status}>
                        {manager.status === 'active' ? 'Active' : 'Inactive'}
                      </StatusBadge>
                    </div>
                  </MobileValue>

                  <MobileValue>
                    <MobileLabel>Restaurants</MobileLabel>
                    <span
                      style={{
                        color: '#635BFF',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                        fontWeight: '600'
                      }}
                      onClick={() => handleViewManagerRestaurants(manager)}
                      title={`View restaurants managed by ${manager.fullName}`}
                    >
                      {manager.restaurantCount}
                    </span>
                  </MobileValue>

                  <MobileValue>
                    <MobileLabel>Revenue (RM)</MobileLabel>
                    <div style={{ fontSize: '14px', color: '#374151', fontWeight: '600' }}>
                      {manager.totalRevenue.toLocaleString()}
                    </div>
                  </MobileValue>

                  <MobileValue>
                    <MobileLabel>Last Active</MobileLabel>
                    <div style={{ fontSize: '14px', color: '#6B7280' }}>
                      {manager.lastActive}
                    </div>
                  </MobileValue>
                </MobileGrid>

                <ActionButtons>
                  {/* <ActionButton onClick={() => handleEditManager(manager)}>Edit</ActionButton> */}
                  <IconButton
                    onClick={() => handleToggleStatus(manager)}
                    title={manager.status === 'active' ? 'Deactivate Manager' : 'Activate Manager'}
                  >
                    <IconSymbol>{manager.status === 'active' ? '⊗' : '◉'}</IconSymbol>
                  </IconButton>
                  <IconButton
                    onClick={() => handlePasswordReset(manager)}
                    title="Reset Password"
                  >
                    <IconSymbol>⚷</IconSymbol>
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteManager(manager)}
                    title="Delete Manager"
                  >
                    <IconSymbol>✕</IconSymbol>
                  </IconButton>
                </ActionButtons>
              </ManagerTableRow>
            ))
          )}
        </Table>

        {/* Add Manager Modal */}
        {showAddModal && (
        <ModalOverlay show={showAddModal} onClick={handleCloseModal}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Add New Manager</ModalTitle>
              <CloseButton onClick={handleCloseModal}>×</CloseButton>
            </ModalHeader>
            <ModalBody>
              <FormGrid>
                <FormGroup>
                  <FormLabel>Manager ID *</FormLabel>
                  <FormInput
                    type="text"
                    placeholder="Enter unique manager ID"
                    value={newManager.managerId}
                    onChange={(e) => handleInputChange('managerId', e.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Full Name *</FormLabel>
                  <FormInput
                    type="text"
                    placeholder="Enter full name"
                    value={newManager.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Company Name *</FormLabel>
                  <FormInput
                    type="text"
                    placeholder="Enter company name"
                    value={newManager.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Manager Role *</FormLabel>
                  <FilterSelect
                    value={newManager.role}
                    onChange={(e) => handleInputChange('role', e.target.value)}
                  >
                    <option value="Foodcourt General">Foodcourt General</option>
                    <option value="Foodcourt Manager">Foodcourt Manager</option>
                    <option value="Brand General">Brand General</option>
                    <option value="Brand Manager">Brand Manager</option>
                  </FilterSelect>
                </FormGroup>

                <FormGroup>
                  <FormLabel>Position *</FormLabel>
                  <FormInput
                    type="text"
                    placeholder="Enter position (e.g., General Manager, Operations Manager)"
                    value={newManager.position}
                    onChange={(e) => handleInputChange('position', e.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Department *</FormLabel>
                  <FormInput
                    type="text"
                    placeholder="Enter department (e.g., Operations, Sales, Marketing)"
                    value={newManager.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Email Address *</FormLabel>
                  <FormInput
                    type="email"
                    placeholder="Enter email address"
                    value={newManager.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Phone Number *</FormLabel>
                  <FormInput
                    type="tel"
                    placeholder="Enter phone number"
                    value={newManager.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Address</FormLabel>
                  <FormTextarea
                    placeholder="Enter company address"
                    value={newManager.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                  />
                </FormGroup>
              </FormGrid>
            </ModalBody>
            <ModalActions>
              <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
              <Button variant="primary" onClick={handleSubmit}>Add Manager</Button>
            </ModalActions>
          </Modal>
        </ModalOverlay>
        )}

        {/* Success Modal */}
        {showSuccessModal && (
        <ModalOverlay show={showSuccessModal} onClick={() => setShowSuccessModal(false)}>
          <SuccessModal onClick={(e) => e.stopPropagation()}>
            <SuccessIcon>✓</SuccessIcon>
            <SuccessTitle>Success!</SuccessTitle>
            <SuccessMessage>{successMessage}</SuccessMessage>
            <Button variant="primary" onClick={() => setShowSuccessModal(false)}>
              OK
            </Button>
          </SuccessModal>
        </ModalOverlay>
        )}

        {/* View Manager Modal */}
        {showViewModal && selectedManager && (
        <ModalOverlay show={showViewModal} onClick={() => setShowViewModal(false)}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Manager Details</ModalTitle>
              <CloseButton onClick={() => setShowViewModal(false)}>×</CloseButton>
            </ModalHeader>
            <ModalBody>
              <FormGrid>
                <FormGroup>
                  <FormLabel>Manager ID</FormLabel>
                  <FormInput type="text" value={selectedManager.managerId} disabled />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Full Name</FormLabel>
                  <FormInput type="text" value={selectedManager.fullName} disabled />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Company Name</FormLabel>
                  <FormInput type="text" value={selectedManager.companyName} disabled />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Position</FormLabel>
                  <FormInput type="text" value={selectedManager.position} disabled />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Department</FormLabel>
                  <FormInput type="text" value={selectedManager.department} disabled />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Email Address</FormLabel>
                  <FormInput type="email" value={selectedManager.email} disabled />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Phone Number</FormLabel>
                  <FormInput type="tel" value={selectedManager.phone} disabled />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Status</FormLabel>
                  <FormInput type="text" value={selectedManager.status === 'active' ? 'Active' : 'Inactive'} disabled />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Restaurant Count</FormLabel>
                  <FormInput type="text" value={selectedManager.restaurantCount.toString()} disabled />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Total Revenue</FormLabel>
                  <FormInput type="text" value={formatCurrency(selectedManager.totalRevenue, operationSettings.currency)} disabled />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Created Date</FormLabel>
                  <FormInput type="text" value={selectedManager.createdAt} disabled />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Last Active</FormLabel>
                  <FormInput type="text" value={selectedManager.lastActive} disabled />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Address</FormLabel>
                  <FormTextarea value={selectedManager.address} disabled />
                </FormGroup>
              </FormGrid>
            </ModalBody>
            <ModalActions>
              <Button variant="secondary" onClick={() => setShowViewModal(false)}>Close</Button>
            </ModalActions>
          </Modal>
        </ModalOverlay>
        )}

        {/* Edit Manager Modal */}
        {showEditModal && editingManager && (
        <ModalOverlay show={showEditModal} onClick={() => setShowEditModal(false)}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Edit Manager</ModalTitle>
              <CloseButton onClick={() => setShowEditModal(false)}>×</CloseButton>
            </ModalHeader>
            <ModalBody>
              <FormGrid>
                <FormGroup>
                  <FormLabel>Manager ID * (Read-only)</FormLabel>
                  <FormInput
                    type="text"
                    value={editingManager.managerId}
                    disabled
                    style={{ backgroundColor: '#F8FAFC', color: '#6B7280' }}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Full Name *</FormLabel>
                  <FormInput
                    type="text"
                    value={editingManager.fullName}
                    onChange={(e) => setEditingManager({...editingManager, fullName: e.target.value})}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Company Name *</FormLabel>
                  <FormInput
                    type="text"
                    value={editingManager.companyName}
                    onChange={(e) => setEditingManager({...editingManager, companyName: e.target.value})}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Position *</FormLabel>
                  <FormInput
                    type="text"
                    value={editingManager.position}
                    onChange={(e) => setEditingManager({...editingManager, position: e.target.value})}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Department *</FormLabel>
                  <FormInput
                    type="text"
                    value={editingManager.department}
                    onChange={(e) => setEditingManager({...editingManager, department: e.target.value})}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Email Address *</FormLabel>
                  <FormInput
                    type="email"
                    value={editingManager.email}
                    onChange={(e) => setEditingManager({...editingManager, email: e.target.value})}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Phone Number *</FormLabel>
                  <FormInput
                    type="tel"
                    value={editingManager.phone}
                    onChange={(e) => setEditingManager({...editingManager, phone: e.target.value})}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Address</FormLabel>
                  <FormTextarea
                    value={editingManager.address}
                    onChange={(e) => setEditingManager({...editingManager, address: e.target.value})}
                  />
                </FormGroup>
              </FormGrid>
            </ModalBody>
            <ModalActions>
              <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
              <Button variant="primary" onClick={handleUpdateManager}>Update Manager</Button>
            </ModalActions>
          </Modal>
        </ModalOverlay>
        )}

        {/* Confirm Action Modal */}
        {showConfirmModal && (
        <ModalOverlay show={showConfirmModal} onClick={() => setShowConfirmModal(false)}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Confirm Action</ModalTitle>
              <CloseButton onClick={() => setShowConfirmModal(false)}>×</CloseButton>
            </ModalHeader>
            <ModalBody>
              <p>
                {confirmAction === 'delete' && `Are you sure you want to delete Manager ID: ${selectedManager?.managerId}?`}
                {confirmAction === 'resetPassword' && `Are you sure you want to reset password for Manager ID: ${selectedManager?.managerId}?`}
                {confirmAction === 'toggle' && `Are you sure you want to ${selectedManager?.status === 'active' ? 'deactivate' : 'activate'} Manager ID: ${selectedManager?.managerId}?`}
              </p>
            </ModalBody>
            <ModalActions>
              <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>Cancel</Button>
              <Button 
                variant={confirmAction === 'delete' ? 'danger' : 'primary'} 
                onClick={handleConfirmAction}
              >
                {confirmAction === 'delete' ? 'Delete' : confirmAction === 'resetPassword' ? 'Reset Password' : 'Confirm'}
              </Button>
            </ModalActions>
          </Modal>
        </ModalOverlay>
        )}

        </Content>
      </Container>
    </MainLayout>
  );
};

export default ManagersPage;