import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { EmptyState } from '../../components/UI/TableComponents';
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
  Modal,
  FormLabel,
  FormInput,
  Table,
  TableHeader,
  TableRow,
  ActionButtons,
  IconButton
} from '../../components/UI';
import ConfirmModal from '../../components/ConfirmModal';
import PhoneInput from '../../components/Common/PhoneInput';
import { useTranslation } from 'react-i18next';

import { getAuthToken } from '../../utils/auth';
// Page-specific styled components
const StatusBadge = styled.span<{ status: string }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  background: ${props => props.status === 'active' ? '#ECFDF5' : '#FEE2E2'};
  color: ${props => props.status === 'active' ? '#059669' : '#DC2626'};
`;

const RestaurantLink = styled.span`
  color: #635BFF;
  cursor: pointer;
  text-decoration: underline;
  font-weight: 600;

  &:hover {
    color: #5A51E6;
  }
`;

const ErrorMessage = styled.div`
  color: #DC2626;
  font-size: 14px;
  margin-top: 12px;
  padding: 12px;
  background: #FEF2F2;
  border: 1px solid #FEE2E2;
  border-radius: 8px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  justify-content: flex-end;
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  font-size: 14px;
  color: #0A2540;
  background: white;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`;

const BrandInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const BrandName = styled.div`
  font-weight: 600;
  color: #0A2540;
`;

const BrandCode = styled.div`
  font-size: 12px;
  color: #6B7280;
`;


interface Brand {
  id: number;
  name: string;
  code: string;
  description?: string;
  logo_url?: string;
  owner_id: number;
  status: 'active' | 'inactive';
  email?: string;
  phone?: string;
  address?: string;
  website?: string;
  created_at: string;
  updated_at: string;
  owner?: {
    id: number;
    full_name: string;
    email: string;
    role: string;
  };
  restaurants?: Array<{
    id: number;
    name: string;
    status: string;
  }>;
}

interface BrandFormData {
  name: string;
  code: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  currency: string;
}

const CURRENCY_OPTIONS = [
  { value: 'RM', label: 'RM - Malaysian Ringgit' },
  { value: 'USD', label: 'USD - US Dollar' },
  { value: 'SGD', label: 'SGD - Singapore Dollar' },
  { value: 'JPY', label: 'JPY - Japanese Yen' },
  { value: 'THB', label: 'THB - Thai Baht' },
  { value: 'KRW', label: 'KRW - Korean Won' },
  { value: 'EUR', label: 'EUR - Euro' },
  { value: 'GBP', label: 'GBP - British Pound' },
];

const BrandManagement: React.FC = () => {
  const { t } = useTranslation('brand');
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalBrands: 0,
    activeBrands: 0,
    totalStores: 0,
    activeManagers: 0,
  });

  const [brands, setBrands] = useState<Brand[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<BrandFormData>({
    name: '',
    code: '',
    description: '',
    email: '',
    phone: '',
    address: '',
    website: '',
    currency: 'RM'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      setLoading(true);
      const token = getAuthToken();
      const response = await fetch('/api/brands', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setBrands(data);

        const totalStores = data.reduce((sum: number, brand: Brand) => sum + (brand.restaurants?.length || 0), 0);
        const activeBrands = data.filter((b: Brand) => b.status === 'active').length;

        setStats({
          totalBrands: data.length,
          activeBrands,
          totalStores,
          activeManagers: data.length,
        });
      } else {
        console.error('Failed to fetch brands');
      }
    } catch (error) {
      console.error('Error fetching brands:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBrand = () => {
    setIsEditing(false);
    setSelectedBrand(null);
    setError('');
    setFormData({
      name: '',
      code: '',
      description: '',
      email: '',
      phone: '',
      address: '',
      website: '',
      currency: 'RM'
    });
    setShowModal(true);
  };

  const handleEditBrand = (brand: Brand) => {
    setIsEditing(true);
    setSelectedBrand(brand);
    setError('');
    setFormData({
      name: brand.name,
      code: brand.code,
      description: brand.description || '',
      email: brand.email || '',
      phone: brand.phone || '',
      address: brand.address || '',
      website: brand.website || '',
      currency: (brand as any).currency || 'MYR'
    });
    setShowModal(true);
  };

  const handleDeleteBrand = (brand: Brand) => {
    setSelectedBrand(brand);
    setShowDeleteModal(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const token = getAuthToken();

      if (isEditing && selectedBrand) {
        const response = await fetch(`/api/brands/${selectedBrand.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          setShowModal(false);
          fetchBrands();
        } else {
          const errorData = await response.json();
          setError(errorData.error || 'Failed to update brand');
        }
      } else {
        const response = await fetch('/api/brands', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            ...formData,
            status: 'active'
          })
        });

        if (response.ok) {
          setShowModal(false);
          fetchBrands();
        } else {
          const errorData = await response.json();
          setError(errorData.error || 'Failed to create brand');
        }
      }
    } catch (error) {
      console.error('Error saving brand:', error);
      setError('Failed to save brand. Please try again.');
    }
  };

  const confirmDelete = async () => {
    if (!selectedBrand) return;

    try {
      const token = getAuthToken();
      const response = await fetch(`/api/brands/${selectedBrand.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchBrands();
      }
    } catch (error) {
      console.error('Error deleting brand:', error);
    }

    setShowDeleteModal(false);
  };

  const handleNavigateToRestaurants = (brand: Brand) => {
    navigate(`/pos/manager/restaurants?brandId=${brand.id}&brandName=${encodeURIComponent(brand.name)}`);
  };
  return (
    <>
      <Container>
        <Header>
          <Title>{t('brand:brandManagement.brands')}</Title>
          <ActionSection>
            <Button variant="secondary">{t('brand:brandManagement.export')}</Button>
            <Button variant="primary" onClick={handleAddBrand}>{t('brand:brandManagement.addBrand')}</Button>
          </ActionSection>
        </Header>

        <Content>
          <StatsGrid>
            <StatCard color="#635BFF">
              <StatValue>{stats.totalBrands}</StatValue>
              <StatLabel>{t('brand:brandManagement.totalBrands')}</StatLabel>
              <StatDescription>{stats.activeBrands} active</StatDescription>
            </StatCard>
            <StatCard color="#10B981">
              <StatValue>{stats.activeBrands}</StatValue>
              <StatLabel>{t('brand:brandManagement.activeBrands')}</StatLabel>
              <StatDescription>{t('brand:brandManagement.currentlyOperating')}</StatDescription>
            </StatCard>
            <StatCard color="#F59E0B">
              <StatValue>{stats.totalStores}</StatValue>
              <StatLabel>{t('brand:brandManagement.totalStores')}</StatLabel>
              <StatDescription>{t('brand:brandManagement.acrossAllBrands')}</StatDescription>
            </StatCard>
            <StatCard color="#8B5CF6">
              <StatValue>{stats.activeManagers}</StatValue>
              <StatLabel>{t('brand:brandManagement.brandManagers')}</StatLabel>
              <StatDescription>{t('brand:brandManagement.assignedManagers')}</StatDescription>
            </StatCard>
          </StatsGrid>

          {loading ? (
            <EmptyState>
              <p>{t('brand:brandManagement.loadingBrands')}</p>
            </EmptyState>
          ) : brands.length === 0 ? (
            <EmptyState>
              <h3>{t('brand:brandManagement.noBrandsFound')}</h3>
              <p>{t('brand:brandManagement.createYourFirstBrandToGetStarted')}</p>
              <Button variant="primary" onClick={handleAddBrand}>{t('brand:brandManagement.addBrand')}</Button>
            </EmptyState>
          ) : (
            <Table>
              <TableHeader columns="2fr 2fr 1fr 1fr 1fr 120px">
                <span className="col-info">{t('brand:brandManagement.brand')}</span>
                <span>{t('brand:brandManagement.description')}</span>
                <span>{t('brand:brandManagement.restaurants')}</span>
                <span>{t('brand:brandManagement.status')}</span>
                <span>{t('brand:brandManagement.contact')}</span>
                <span className="col-action">{t('brand:brandManagement.actions')}</span>
              </TableHeader>
              {brands.map((brand) => (
                <TableRow key={brand.id} columns="2fr 2fr 1fr 1fr 1fr 120px">
                  <BrandInfo className="col-info">
                    <BrandName>{brand.name}</BrandName>
                    <BrandCode>{brand.code}</BrandCode>
                  </BrandInfo>
                  <div style={{ fontSize: '13px', color: '#6B7280' }}>{brand.description || '-'}</div>
                  <div>
                    <RestaurantLink onClick={() => handleNavigateToRestaurants(brand)}>
                      {brand.restaurants?.length || 0} stores
                    </RestaurantLink>
                  </div>
                  <div>
                    <StatusBadge status={brand.status}>
                      {brand.status === 'active' ? 'Active' : 'Inactive'}
                    </StatusBadge>
                  </div>
                  <div style={{ fontSize: '13px', color: '#6B7280' }}>
                    {brand.email || brand.phone || '-'}
                  </div>
                  <ActionButtons>
                    <IconButton
                      variant="edit"
                      onClick={() => handleEditBrand(brand)}
                      title="Edit"
                    >
                      Edit
                    </IconButton>
                    <IconButton
                      variant="delete"
                      onClick={() => handleDeleteBrand(brand)}
                      title="Delete"
                    >
                      ✕
                    </IconButton>
                  </ActionButtons>
                </TableRow>
              ))}
            </Table>
          )}

          {/* Add/Edit Modal */}
          <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title={isEditing ? 'Edit Brand' : 'Add New Brand'}
          >
            <form onSubmit={handleFormSubmit}>
              <FormGroup>
                <FormLabel>Brand Name *</FormLabel>
                <FormInput
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., K-DINE Korean Restaurant"
                  required
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Brand Code *</FormLabel>
                <FormInput
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
                  placeholder="e.g., KDINE"
                  required
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>{t('brand:brandManagement.description')}</FormLabel>
                <FormInput
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of the brand"
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>{t('brand:brandManagement.email')}</FormLabel>
                <FormInput
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="contact@brand.com"
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>{t('brand:brandManagement.phone')}</FormLabel>
                <PhoneInput
                  value={formData.phone}
                  onChange={(value) => setFormData(prev => ({ ...prev, phone: value }))}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>{t('brand:brandManagement.address')}</FormLabel>
                <FormInput
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Street address"
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>{t('brand:brandManagement.website')}</FormLabel>
                <FormInput
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                  placeholder="https://www.brand.com"
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Currency *</FormLabel>
                <FormSelect
                  value={formData.currency}
                  onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value }))}
                  required
                >
                  {CURRENCY_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </FormSelect>
              </FormGroup>

              {error && <ErrorMessage>{error}</ErrorMessage>}

              <ButtonGroup>
                <Button type="button" variant="secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  {isEditing ? 'Update Brand' : 'Create Brand'}
                </Button>
              </ButtonGroup>
            </form>
          </Modal>

          {/* Delete Confirmation Modal */}
          <ConfirmModal
            isOpen={showDeleteModal}
            title="Delete Brand"
            message={`Are you sure you want to delete '${selectedBrand?.name}' brand? This action cannot be undone.`}
            onConfirm={confirmDelete}
            onCancel={() => setShowDeleteModal(false)}
            confirmText="Delete"
            cancelText="Cancel"
            type="danger"
          />
        </Content>
      </Container>
    </>
  );
};

export default BrandManagement;
