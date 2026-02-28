import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import { useBrandCurrency } from '../../hooks/useBrandCurrency';
import { formatCurrency } from '../../utils/currency';

interface Restaurant {
  id: string;
  name: string;
  location: string;
}

interface Promotion {
  id: string;
  name: string;
  type: 'percentage' | 'fixed_amount' | 'bogo' | 'free_shipping' | 'happy_hour';
  discountValue: number;
  discountText: string;
  restaurants: string[];
  restaurantNames: string[];
  startDate: string;
  endDate: string;
  usageCount: number;
  usageLimit: number | null;
  minOrderAmount: number | null;
  maxDiscount: number | null;
  status: 'active' | 'scheduled' | 'paused' | 'expired';
  createdDate: string;
  description: string;
  conditions: string[];
  generatedRevenue: number;
}

const Container = styled.div`
  min-height: 100vh;
  background: #FAFBFC;
`;

const Header = styled.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  margin-bottom: 0;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 16px;
    height: auto;
    min-height: 56px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  gap: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Controls = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 8px;
  }
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;
  
  ${props => props.variant === 'primary' ? `
    background: #635BFF;
    color: white;
    
    &:hover {
      background: #5A51E6;
      transform: translateY(-1px);
    }
  ` : `
    background: white;
    color: #6B7280;
    border: 1px solid #E6EBF1;
    
    &:hover {
      background: #F8FAFC;
      color: #0A2540;
      border-color: #CBD5E1;
    }
  `}
`;

const FilterRow = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
`;

const FilterSelect = styled.select`
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 180px;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const SearchContainer = styled.div`
  flex: 1;
  min-width: 300px;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px 12px 44px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
  
  &::placeholder {
    color: #9CA3AF;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #6B7C93;
  font-size: 16px;
`;

const Content = styled.div`
  padding: 32px;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`;

const StatCard = styled.div<{ color?: string }>`
  background: white;
  border-radius: 12px;
  padding: 20px;
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
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`;

const StatChange = styled.div<{ positive?: boolean }>`
  font-size: 12px;
  color: ${props => props.positive ? '#059669' : '#DC2626'};
  font-weight: 500;
`;

const PromotionTable = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1.5fr 1fr 1fr 1fr 1fr 120px;
  gap: 16px;
  padding: 16px 24px;
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (max-width: 1400px) {
    display: none;
  }
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1.5fr 1fr 1fr 1fr 1fr 120px;
  gap: 16px;
  padding: 20px 24px;
  border-bottom: 1px solid #F3F4F6;
  align-items: center;
  transition: all 0.2s;
  cursor: pointer;
  
  &:hover {
    background: #F8FAFC;
  }
  
  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 1400px) {
    display: none;
  }
`;

const PromotionInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const PromotionName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
`;

const PromotionDescription = styled.div`
  font-size: 12px;
  color: #6B7280;
`;

const TypeBadge = styled.span<{ type: string }>`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${props => {
    switch(props.type) {
      case 'percentage': return '#DBEAFE';
      case 'fixed_amount': return '#D1FAE5';
      case 'bogo': return '#FEF3C7';
      case 'free_shipping': return '#E0E7FF';
      case 'happy_hour': return '#FCE7F3';
      default: return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch(props.type) {
      case 'percentage': return '#1E40AF';
      case 'fixed_amount': return '#065F46';
      case 'bogo': return '#92400E';
      case 'free_shipping': return '#3730A3';
      case 'happy_hour': return '#BE185D';
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
      case 'active': return '#ECFDF5';
      case 'scheduled': return '#FEF3C7';
      case 'paused': return '#F3F4F6';
      case 'expired': return '#FEF2F2';
      default: return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'active': return '#059669';
      case 'scheduled': return '#D97706';
      case 'paused': return '#6B7280';
      case 'expired': return '#DC2626';
      default: return '#6B7280';
    }
  }};
`;

const ValueCell = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  padding: 4px 8px;
  background: transparent;
  border: 1px solid #E6EBF1;
  border-radius: 4px;
  color: #6B7280;
  font-size: 11px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #635BFF;
    color: #635BFF;
    background: #F4F3FF;
  }
`;

// Mobile Cards
const MobilePromotionGrid = styled.div`
  display: none;
  
  @media (max-width: 1400px) {
    display: grid;
    gap: 16px;
  }
`;

const MobilePromotionCard = styled.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
`;

const MobilePromotionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

const MobilePromotionStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #6B7280;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #F3F4F6;
`;

// Promotion Detail Modal
const Modal = styled.div<{ isOpen: boolean }>`
  display: ${props => props.isOpen ? 'flex' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  align-items: center;
  justify-content: center;
  z-index: 10000;
  animation: fadeIn 0.2s ease-out;
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  overflow: auto;
  animation: slideUp 0.3s ease-out;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  
  @keyframes slideUp {
    from {
      transform: translateY(30px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const ModalHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1E293B;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #64748B;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s;
  
  &:hover {
    background: #F1F5F9;
    color: #475569;
  }
`;

const ModalBody = styled.div`
  padding: 24px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  resize: vertical;
  min-height: 80px;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const RestaurantCheckboxGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
  max-height: 150px;
  overflow-y: auto;
  padding: 8px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #374151;
  
  input {
    width: 16px;
    height: 16px;
    accent-color: #635BFF;
  }
`;

const ModalFooter = styled.div`
  padding: 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
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

const ManagerPromotionsPage: React.FC = () => {
  const { user } = useAuth();
  const [selectedRestaurant, setSelectedRestaurant] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [filteredPromotions, setFilteredPromotions] = useState<Promotion[]>([]);
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(null);
  const { defaultCurrency } = useBrandCurrency();
  const [selectedCurrency, setSelectedCurrency] = useState<string>('RM');

  useEffect(() => {
    if (defaultCurrency) {
      setSelectedCurrency(defaultCurrency);
    }
  }, [defaultCurrency]);

  const [newPromotion, setNewPromotion] = useState({
    name: '',
    type: 'percentage' as 'percentage' | 'fixed_amount' | 'bogo' | 'free_shipping' | 'happy_hour',
    discountValue: '',
    restaurants: [] as string[],
    startDate: '',
    endDate: '',
    usageLimit: '',
    minOrderAmount: '',
    maxDiscount: '',
    description: ''
  });

  const [restaurants] = useState<Restaurant[]>([]);

  // Fetch promotions data
  useEffect(() => {
    // TODO: Implement API call to fetch promotions and restaurants
    setPromotions([]);
  }, []);

  // Filter and sort promotions
  useEffect(() => {
    let filtered = promotions;

    // Restaurant filter
    if (selectedRestaurant !== 'all') {
      filtered = filtered.filter(promo => promo.restaurants.includes(selectedRestaurant));
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(promo =>
        promo.name.toLowerCase().includes(query) ||
        promo.description.toLowerCase().includes(query) ||
        promo.discountText.toLowerCase().includes(query)
      );
    }

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(promo => promo.type === typeFilter);
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(promo => promo.status === statusFilter);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'startDate':
          return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        case 'usageCount':
          return b.usageCount - a.usageCount;
        case 'revenue':
          return b.generatedRevenue - a.generatedRevenue;
        default:
          return 0;
      }
    });

    setFilteredPromotions(filtered);
  }, [promotions, selectedRestaurant, searchQuery, typeFilter, statusFilter, sortBy]);

  // Calculate statistics
  const stats = {
    totalPromotions: promotions.length,
    activePromotions: promotions.filter(p => p.status === 'active').length,
    usedThisMonth: promotions.reduce((sum, p) => {
      const thisMonth = new Date();
      const startOfMonth = new Date(thisMonth.getFullYear(), thisMonth.getMonth(), 1);
      const promoStart = new Date(p.startDate);
      return promoStart >= startOfMonth ? sum + p.usageCount : sum;
    }, 0),
    totalRevenue: promotions.reduce((sum, p) => sum + p.generatedRevenue, 0)
  };

  const getTypeLabel = (type: string) => {
    switch(type) {
      case 'percentage': return 'Percentage';
      case 'fixed_amount': return 'Fixed Amount';
      case 'bogo': return 'BOGO';
      case 'free_shipping': return 'Free Delivery';
      case 'happy_hour': return 'Time Discount';
      default: return type;
    }
  };

  const handlePromotionClick = (promotion: Promotion) => {
    setSelectedPromotion(promotion);
    setShowDetailModal(true);
  };

  const handleAddPromotion = () => {
    setEditingPromotion(null);
    setNewPromotion({
      name: '',
      type: 'percentage',
      discountValue: '',
      restaurants: [],
      startDate: '',
      endDate: '',
      usageLimit: '',
      minOrderAmount: '',
      maxDiscount: '',
      description: ''
    });
    setShowAddModal(true);
  };

  const handleEditPromotion = (promotion: Promotion) => {
    setEditingPromotion(promotion);
    setNewPromotion({
      name: promotion.name,
      type: promotion.type,
      discountValue: promotion.discountValue.toString(),
      restaurants: promotion.restaurants,
      startDate: promotion.startDate,
      endDate: promotion.endDate,
      usageLimit: promotion.usageLimit?.toString() || '',
      minOrderAmount: promotion.minOrderAmount?.toString() || '',
      maxDiscount: promotion.maxDiscount?.toString() || '',
      description: promotion.description
    });
    setShowAddModal(true);
  };

  const handleSavePromotion = () => {
    const discountText = newPromotion.type === 'percentage'
      ? `${newPromotion.discountValue}% off`
      : newPromotion.type === 'fixed_amount'
      ? `${formatCurrency(newPromotion.discountValue, selectedCurrency)} off`
      : newPromotion.type === 'bogo'
      ? `BOGO ${newPromotion.discountValue}% off`
      : newPromotion.type === 'free_shipping'
      ? 'Free delivery'
      : `${newPromotion.discountValue}% off (Happy Hour)`;

    const restaurantNames = restaurants
      .filter(r => newPromotion.restaurants.includes(r.id))
      .map(r => `${r.name} - ${r.location}`);

    const promotionData: Promotion = {
      id: editingPromotion?.id || `promo-${Date.now()}`,
      name: newPromotion.name,
      type: newPromotion.type,
      discountValue: parseFloat(newPromotion.discountValue),
      discountText,
      restaurants: newPromotion.restaurants,
      restaurantNames,
      startDate: newPromotion.startDate,
      endDate: newPromotion.endDate,
      usageCount: editingPromotion?.usageCount || 0,
      usageLimit: newPromotion.usageLimit ? parseInt(newPromotion.usageLimit) : null,
      minOrderAmount: newPromotion.minOrderAmount ? parseFloat(newPromotion.minOrderAmount) : null,
      maxDiscount: newPromotion.maxDiscount ? parseFloat(newPromotion.maxDiscount) : null,
      status: 'active',
      createdDate: editingPromotion?.createdDate || new Date().toISOString().split('T')[0],
      description: newPromotion.description,
      conditions: [],
      generatedRevenue: editingPromotion?.generatedRevenue || 0
    };

    if (editingPromotion) {
      setPromotions(promotions.map(p => p.id === editingPromotion.id ? promotionData : p));
    } else {
      setPromotions([...promotions, promotionData]);
    }

    setShowAddModal(false);
  };

  const handleTogglePromotionStatus = (id: string) => {
    setPromotions(promotions.map(p => 
      p.id === id 
        ? { ...p, status: p.status === 'active' ? 'paused' : 'active' as any }
        : p
    ));
  };

  const handleCopyPromotion = (promotion: Promotion) => {
    const copiedPromotion = {
      ...promotion,
      id: `promo-${Date.now()}`,
      name: `${promotion.name} (Copy)`,
      usageCount: 0,
      generatedRevenue: 0,
      createdDate: new Date().toISOString().split('T')[0],
      status: 'active' as 'active'
    };
    setPromotions([...promotions, copiedPromotion]);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDeletePromotion = (id: string) => {
    if (window.confirm('Are you sure you want to delete this promotion?')) {
      setPromotions(promotions.filter(p => p.id !== id));
    }
  };

  const handleExportData = () => {
    const exportData = {
      exportDate: new Date().toISOString(),
      restaurant: selectedRestaurant === 'all' ? 'All Restaurants' : restaurants.find(r => r.id === selectedRestaurant)?.name,
      totalPromotions: stats.totalPromotions,
      manager: user?.name,
      promotions: filteredPromotions.map(promo => ({
        name: promo.name,
        type: getTypeLabel(promo.type),
        discount: promo.discountText,
        restaurants: promo.restaurantNames.join(', '),
        startDate: promo.startDate,
        endDate: promo.endDate,
        usageCount: promo.usageCount,
        usageLimit: promo.usageLimit,
        status: promo.status,
        revenue: promo.generatedRevenue
      }))
    };

    const csvContent = `Promotion Export - ${exportData.restaurant}\n` +
      `Generated: ${new Date().toLocaleString()}\n` +
      `Manager: ${exportData.manager}\n\n` +
      `Name,Type,Discount,Restaurants,Start Date,End Date,Usage Count,Usage Limit,Status,Revenue\n` +
      exportData.promotions.map(promo => 
        `"${promo.name}","${promo.type}","${promo.discount}","${promo.restaurants}","${promo.startDate}","${promo.endDate}",${promo.usageCount},${promo.usageLimit || 'Unlimited'},"${promo.status}",${promo.revenue}`
      ).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `promotions-export-${selectedRestaurant}-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <>
      <Container>
        <Header>
          <HeaderContent>
            <PageTitle>Promotions</PageTitle>
            <Controls>
              <Button variant="secondary" onClick={handleExportData}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Export Data
              </Button>
              <Button variant="primary" onClick={handleAddPromotion}>
                Add Promotion
              </Button>
            </Controls>
          </HeaderContent>
          
          <FilterRow>
            <FilterSelect
              value={selectedRestaurant}
              onChange={(e) => setSelectedRestaurant(e.target.value)}
            >
              <option value="all">All Restaurants</option>
              {restaurants.map(restaurant => (
                <option key={restaurant.id} value={restaurant.id}>
                  {restaurant.name} - {restaurant.location}
                </option>
              ))}
            </FilterSelect>

            <SearchContainer>
              <SearchIcon>🔍</SearchIcon>
              <SearchInput
                type="text"
                placeholder="Search promotions by name, description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </SearchContainer>

            <FilterSelect 
              value={typeFilter} 
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="percentage">Percentage</option>
              <option value="fixed_amount">Fixed Amount</option>
              <option value="bogo">BOGO</option>
              <option value="free_shipping">Free Delivery</option>
              <option value="happy_hour">Time Discount</option>
            </FilterSelect>
            
            <FilterSelect 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="scheduled">Scheduled</option>
              <option value="paused">Paused</option>
              <option value="expired">Expired</option>
            </FilterSelect>
            
            <FilterSelect 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Sort by Name</option>
              <option value="startDate">Sort by Start Date</option>
              <option value="usageCount">Sort by Usage</option>
              <option value="revenue">Sort by Revenue</option>
            </FilterSelect>
          </FilterRow>
        </Header>
        
        <Content>
          <StatsGrid>
            <StatCard color="#059669">
              <StatLabel>Total Promotions</StatLabel>
              <StatValue>{stats.totalPromotions}</StatValue>
              <StatChange positive>All restaurants combined</StatChange>
            </StatCard>
            <StatCard color="#2563EB">
              <StatLabel>Active Promotions</StatLabel>
              <StatValue>{stats.activePromotions}</StatValue>
              <StatChange positive>Currently running</StatChange>
            </StatCard>
            <StatCard color="#7C3AED">
              <StatLabel>Used This Month</StatLabel>
              <StatValue>{stats.usedThisMonth}</StatValue>
              <StatChange positive>Promotion activations</StatChange>
            </StatCard>
            <StatCard color="#D97706">
              <StatLabel>Generated Revenue</StatLabel>
              <StatValue>{formatCurrency(stats.totalRevenue, selectedCurrency)}</StatValue>
              <StatChange positive>From all promotions</StatChange>
            </StatCard>
          </StatsGrid>

          <PromotionTable>
            <TableHeader>
              <span>Promotion</span>
              <span>Type</span>
              <span>Restaurants</span>
              <span>Dates</span>
              <span>Usage</span>
              <span>Revenue</span>
              <span>Status</span>
              <span>Actions</span>
            </TableHeader>
            
            {filteredPromotions.length === 0 ? (
              <EmptyState>
                <EmptyStateIcon>🎯</EmptyStateIcon>
                <EmptyStateText>
                  {searchQuery || typeFilter !== 'all' || statusFilter !== 'all' || selectedRestaurant !== 'all'
                    ? 'No promotions found with the current filters' 
                    : 'No promotions created yet'
                  }
                </EmptyStateText>
                <Button variant="primary" onClick={handleAddPromotion}>
                  Create First Promotion
                </Button>
              </EmptyState>
            ) : (
              <>
                {/* Desktop Table */}
                {filteredPromotions.map(promotion => (
                  <TableRow key={promotion.id} onClick={() => handlePromotionClick(promotion)}>
                    <PromotionInfo>
                      <PromotionName>{promotion.name}</PromotionName>
                      <PromotionDescription>{promotion.discountText}</PromotionDescription>
                    </PromotionInfo>
                    
                    <TypeBadge type={promotion.type}>
                      {getTypeLabel(promotion.type)}
                    </TypeBadge>
                    
                    <ValueCell>
                      <div style={{ fontSize: '12px' }}>
                        {promotion.restaurantNames.length > 2 
                          ? `${promotion.restaurantNames.slice(0, 2).join(', ')} +${promotion.restaurantNames.length - 2}`
                          : promotion.restaurantNames.join(', ')
                        }
                      </div>
                    </ValueCell>
                    
                    <ValueCell>
                      <div>{formatDate(promotion.startDate)}</div>
                      <div style={{ fontSize: '12px', color: '#6B7280' }}>to {formatDate(promotion.endDate)}</div>
                    </ValueCell>
                    
                    <ValueCell>
                      {promotion.usageCount} / {promotion.usageLimit || '∞'}
                    </ValueCell>
                    
                    <ValueCell style={{ color: '#059669', fontWeight: '600' }}>
                      {formatCurrency(promotion.generatedRevenue, selectedCurrency)}
                    </ValueCell>
                    
                    <StatusBadge status={promotion.status}>
                      {promotion.status}
                    </StatusBadge>
                    
                    <ActionButtons onClick={(e) => e.stopPropagation()}>
                      <ActionButton onClick={() => handleEditPromotion(promotion)}>Edit</ActionButton>
                      <ActionButton onClick={() => handleCopyPromotion(promotion)}>Copy</ActionButton>
                      <ActionButton onClick={() => handleTogglePromotionStatus(promotion.id)}>
                        {promotion.status === 'active' ? 'Pause' : 'Activate'}
                      </ActionButton>
                    </ActionButtons>
                  </TableRow>
                ))}

                {/* Mobile Cards */}
                <MobilePromotionGrid>
                  {filteredPromotions.map(promotion => (
                    <MobilePromotionCard key={promotion.id} onClick={() => handlePromotionClick(promotion)}>
                      <MobilePromotionHeader>
                        <PromotionInfo>
                          <PromotionName>{promotion.name}</PromotionName>
                          <PromotionDescription>{promotion.discountText}</PromotionDescription>
                        </PromotionInfo>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                          <TypeBadge type={promotion.type}>
                            {getTypeLabel(promotion.type)}
                          </TypeBadge>
                          <StatusBadge status={promotion.status}>
                            {promotion.status}
                          </StatusBadge>
                        </div>
                      </MobilePromotionHeader>
                      
                      <MobilePromotionStats>
                        <span>{promotion.usageCount} used</span>
                        <span style={{ color: '#059669', fontWeight: '600' }}>{formatCurrency(promotion.generatedRevenue, selectedCurrency)}</span>
                        <span>{formatDate(promotion.endDate)}</span>
                      </MobilePromotionStats>
                    </MobilePromotionCard>
                  ))}
                </MobilePromotionGrid>
              </>
            )}
          </PromotionTable>
        </Content>

        {/* Promotion Detail Modal */}
        <Modal isOpen={showDetailModal}>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Promotion Details</ModalTitle>
              <CloseButton onClick={() => setShowDetailModal(false)}>×</CloseButton>
            </ModalHeader>
            
            {selectedPromotion && (
              <ModalBody>
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1F2937', margin: 0 }}>
                      {selectedPromotion.name}
                    </h3>
                    <TypeBadge type={selectedPromotion.type}>
                      {getTypeLabel(selectedPromotion.type)}
                    </TypeBadge>
                    <StatusBadge status={selectedPromotion.status}>
                      {selectedPromotion.status}
                    </StatusBadge>
                  </div>
                  <p style={{ color: '#6B7280', margin: '0 0 16px 0' }}>{selectedPromotion.description}</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937', marginBottom: '12px' }}>Discount Details</h4>
                    <div style={{ fontSize: '14px', color: '#374151', lineHeight: '1.5' }}>
                      <p><strong>Discount:</strong> {selectedPromotion.discountText}</p>
                      <p><strong>Min Order:</strong> {selectedPromotion.minOrderAmount ? formatCurrency(selectedPromotion.minOrderAmount, selectedCurrency) : 'No minimum'}</p>
                      <p><strong>Max Discount:</strong> {selectedPromotion.maxDiscount ? formatCurrency(selectedPromotion.maxDiscount, selectedCurrency) : 'No limit'}</p>
                    </div>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937', marginBottom: '12px' }}>Usage & Performance</h4>
                    <div style={{ fontSize: '14px', color: '#374151', lineHeight: '1.5' }}>
                      <p><strong>Usage:</strong> {selectedPromotion.usageCount} / {selectedPromotion.usageLimit || '∞'}</p>
                      <p><strong>Revenue:</strong> {formatCurrency(selectedPromotion.generatedRevenue, selectedCurrency)}</p>
                      <p><strong>Created:</strong> {formatDate(selectedPromotion.createdDate)}</p>
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937', marginBottom: '12px' }}>Valid Period</h4>
                  <p style={{ fontSize: '14px', color: '#374151' }}>
                    <strong>From:</strong> {formatDate(selectedPromotion.startDate)} <br/>
                    <strong>To:</strong> {formatDate(selectedPromotion.endDate)}
                  </p>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937', marginBottom: '12px' }}>Applied Restaurants</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {selectedPromotion.restaurantNames.map((name, index) => (
                      <span 
                        key={index}
                        style={{
                          padding: '6px 12px',
                          background: '#F3F4F6',
                          borderRadius: '6px',
                          fontSize: '13px',
                          color: '#6B7280'
                        }}
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedPromotion.conditions.length > 0 && (
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937', marginBottom: '12px' }}>Terms & Conditions</h4>
                    <ul style={{ fontSize: '14px', color: '#374151', paddingLeft: '20px' }}>
                      {selectedPromotion.conditions.map((condition, index) => (
                        <li key={index} style={{ marginBottom: '4px' }}>{condition}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </ModalBody>
            )}
            
            <ModalFooter>
              <Button variant="secondary" onClick={() => setShowDetailModal(false)}>
                Close
              </Button>
              {selectedPromotion && (
                <>
                  <Button variant="secondary" onClick={() => {
                    setShowDetailModal(false);
                    handleEditPromotion(selectedPromotion);
                  }}>
                    Edit Promotion
                  </Button>
                  <Button variant="primary" onClick={() => {
                    setShowDetailModal(false);
                    handleCopyPromotion(selectedPromotion);
                  }}>
                    Duplicate
                  </Button>
                </>
              )}
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Add/Edit Promotion Modal */}
        <Modal isOpen={showAddModal}>
          <ModalContent style={{ maxWidth: '800px' }}>
            <ModalHeader>
              <ModalTitle>{editingPromotion ? 'Edit Promotion' : 'Create New Promotion'}</ModalTitle>
              <CloseButton onClick={() => setShowAddModal(false)}>×</CloseButton>
            </ModalHeader>
            
            <ModalBody>
              <FormRow>
                <FormGroup>
                  <Label>Promotion Name *</Label>
                  <Input
                    type="text"
                    value={newPromotion.name}
                    onChange={(e) => setNewPromotion({ ...newPromotion, name: e.target.value })}
                    placeholder="e.g., Summer Special 2025"
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Promotion Type *</Label>
                  <Select
                    value={newPromotion.type}
                    onChange={(e) => setNewPromotion({ ...newPromotion, type: e.target.value as any })}
                  >
                    <option value="percentage">Percentage Discount</option>
                    <option value="fixed_amount">Fixed Amount Discount</option>
                    <option value="bogo">Buy One Get One</option>
                    <option value="free_shipping">Free Delivery</option>
                    <option value="happy_hour">Happy Hour / Time-based</option>
                  </Select>
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <Label>Discount Value *</Label>
                  <Input
                    type="number"
                    value={newPromotion.discountValue}
                    onChange={(e) => setNewPromotion({ ...newPromotion, discountValue: e.target.value })}
                    placeholder={newPromotion.type === 'percentage' ? '15' : '10'}
                    step={newPromotion.type === 'percentage' ? '1' : '0.01'}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Minimum Order Amount</Label>
                  <Input
                    type="number"
                    value={newPromotion.minOrderAmount}
                    onChange={(e) => setNewPromotion({ ...newPromotion, minOrderAmount: e.target.value })}
                    placeholder="50.00"
                    step="0.01"
                  />
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <Label>Start Date *</Label>
                  <Input
                    type="date"
                    value={newPromotion.startDate}
                    onChange={(e) => setNewPromotion({ ...newPromotion, startDate: e.target.value })}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>End Date *</Label>
                  <Input
                    type="date"
                    value={newPromotion.endDate}
                    onChange={(e) => setNewPromotion({ ...newPromotion, endDate: e.target.value })}
                  />
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <Label>Usage Limit (Optional)</Label>
                  <Input
                    type="number"
                    value={newPromotion.usageLimit}
                    onChange={(e) => setNewPromotion({ ...newPromotion, usageLimit: e.target.value })}
                    placeholder="Leave empty for unlimited"
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Maximum Discount Amount</Label>
                  <Input
                    type="number"
                    value={newPromotion.maxDiscount}
                    onChange={(e) => setNewPromotion({ ...newPromotion, maxDiscount: e.target.value })}
                    placeholder="20.00"
                    step="0.01"
                  />
                </FormGroup>
              </FormRow>

              <FormGroup>
                <Label>Apply to Restaurants *</Label>
                <RestaurantCheckboxGroup>
                  {restaurants.map(restaurant => (
                    <CheckboxLabel key={restaurant.id}>
                      <input
                        type="checkbox"
                        checked={newPromotion.restaurants.includes(restaurant.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewPromotion({
                              ...newPromotion,
                              restaurants: [...newPromotion.restaurants, restaurant.id]
                            });
                          } else {
                            setNewPromotion({
                              ...newPromotion,
                              restaurants: newPromotion.restaurants.filter(id => id !== restaurant.id)
                            });
                          }
                        }}
                      />
                      {restaurant.name} - {restaurant.location}
                    </CheckboxLabel>
                  ))}
                </RestaurantCheckboxGroup>
              </FormGroup>

              <FormGroup>
                <Label>Description</Label>
                <TextArea
                  value={newPromotion.description}
                  onChange={(e) => setNewPromotion({ ...newPromotion, description: e.target.value })}
                  placeholder="Describe the promotion and its terms..."
                  rows={3}
                />
              </FormGroup>
            </ModalBody>
            
            <ModalFooter>
              <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSavePromotion}>
                {editingPromotion ? 'Update Promotion' : 'Create Promotion'}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Container>
    </>
  );
};

export default ManagerPromotionsPage;