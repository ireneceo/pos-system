import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainLayout from '../../components/Layout/MainLayout';
import { Modal, FormLabel, FormInput, StatsGrid, StatCard, StatValue, StatLabel, StatTrend } from '../../components/UI';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import ConfirmModal from '../../components/ConfirmModal';

const Container = styled.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`;

const Header = styled.div`
  background: white;
  padding: 32px;
  border-bottom: 1px solid #E6EBF1;
  margin-bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    padding: 20px;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const Content = styled.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #6B7280;
  margin: 8px 0 0;
`;


const ContentCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  margin-bottom: 24px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`;

const ActionSection = styled.div`
  display: flex;
  gap: 12px;
`;

const BrandList = styled.div`
  display: grid;
  gap: 16px;
`;

const BrandCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  background: white;
  transition: all 0.2s;

  &:hover {
    border-color: #635BFF;
    transform: translateY(-1px);
  }
`;

const BrandInfo = styled.div`
  flex: 1;
`;

const BrandName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`;

const BrandDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  font-size: 14px;
  color: #6B7280;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button<{ variant: 'edit' | 'delete' | 'view' }>`
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  ${props => {
    switch (props.variant) {
      case 'edit':
        return `
          background: #EBF8FF;
          border-color: #2563EB;
          color: #2563EB;
          &:hover { background: #DBEAFE; }
        `;
      case 'delete':
        return `
          background: #FEF2F2;
          border-color: #DC2626;
          color: #DC2626;
          &:hover { background: #FECACA; }
        `;
      case 'view':
      default:
        return `
          background: #F3F4F6;
          border-color: #9CA3AF;
          color: #374151;
          &:hover { background: #E5E7EB; }
        `;
    }
  }}
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

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  ${props => props.variant === 'secondary' ? `
    background: white;
    border-color: #E6EBF1;
    color: #0A2540;
    &:hover { background: #F8FAFC; }
  ` : `
    background: #635BFF;
    border-color: #635BFF;
    color: white;
    &:hover { background: #5A51E6; }
  `}
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
}

interface BrandRestaurant {
  id: number;
  name: string;
  status: string;
  address?: string;
  phone?: string;
  recipe_manager_type: 'restaurant' | 'brand';
}

const BrandManagement: React.FC = () => {
  const [stats, setStats] = useState({
    totalBrands: 0,
    totalStores: 0,
    activeManagers: 0,
    monthlyRevenue: 0,
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
    website: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [showRestaurantsModal, setShowRestaurantsModal] = useState(false);
  const [brandRestaurants, setBrandRestaurants] = useState<BrandRestaurant[]>([]);
  const [loadingRestaurants, setLoadingRestaurants] = useState(false);
  const [updatingRestaurant, setUpdatingRestaurant] = useState<number | null>(null);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/brands', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setBrands(data);

        const totalStores = data.reduce((sum: number, brand: Brand) => sum + (brand.restaurants?.length || 0), 0);

        setStats({
          totalBrands: data.length,
          totalStores,
          activeManagers: data.length, // Each brand has one owner
          monthlyRevenue: 0, // We don't have revenue data yet
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
      website: ''
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
      website: brand.website || ''
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
      const token = localStorage.getItem('auth_token');

      if (isEditing && selectedBrand) {
        // Update existing brand
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
        // Create new brand
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
      const token = localStorage.getItem('auth_token');
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

  const handleManageRestaurants = async (brand: Brand) => {
    setSelectedBrand(brand);
    setShowRestaurantsModal(true);
    setLoadingRestaurants(true);

    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/brands/${brand.id}/restaurants`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setBrandRestaurants(data.data || []);
      } else {
        console.error('Failed to fetch brand restaurants');
        setBrandRestaurants([]);
      }
    } catch (error) {
      console.error('Error fetching brand restaurants:', error);
      setBrandRestaurants([]);
    } finally {
      setLoadingRestaurants(false);
    }
  };

  const handleRecipeManagerTypeChange = async (restaurantId: number, newType: 'restaurant' | 'brand') => {
    if (!selectedBrand) return;

    setUpdatingRestaurant(restaurantId);

    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/brands/${selectedBrand.id}/restaurants/${restaurantId}/recipe-manager-type`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ recipe_manager_type: newType })
      });

      if (response.ok) {
        setBrandRestaurants(prev =>
          prev.map(r => r.id === restaurantId ? { ...r, recipe_manager_type: newType } : r)
        );
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to update setting');
      }
    } catch (error) {
      console.error('Error updating recipe_manager_type:', error);
      alert('Failed to update setting');
    } finally {
      setUpdatingRestaurant(null);
    }
  };

  return (
    <MainLayout>
      <Container>
        <Header>
          <div>
            <Title>Brand Management</Title>
            <Subtitle>Integrated management and growth strategy development for entire brand portfolio</Subtitle>
          </div>
          <ActionSection>
            <ThemedButton variant="outline">Export Brands</ThemedButton>
            <ThemedButton variant="primary" onClick={handleAddBrand}>Add Brand</ThemedButton>
          </ActionSection>
        </Header>

        <Content>
          <StatsGrid>
            <StatCard>
              <StatValue>{stats.totalBrands}</StatValue>
              <StatLabel>Active Brands</StatLabel>
              <StatTrend trend="up">+2 new brands</StatTrend>
            </StatCard>
            <StatCard>
              <StatValue>{stats.totalStores}</StatValue>
              <StatLabel>Total Stores</StatLabel>
              <StatTrend trend="up">+8 stores opened</StatTrend>
            </StatCard>
            <StatCard>
              <StatValue>{stats.activeManagers}</StatValue>
              <StatLabel>Active Managers</StatLabel>
              <StatTrend trend="up">Full staffed</StatTrend>
            </StatCard>
            <StatCard>
              <StatValue>RM {(stats.monthlyRevenue / 1000000000).toFixed(1)}B</StatValue>
              <StatLabel>Total Monthly Revenue</StatLabel>
              <StatTrend trend="up">+15% vs last month</StatTrend>
            </StatCard>
          </StatsGrid>

          <ContentCard>
            <SectionHeader>
              <SectionTitle>Brand Portfolio</SectionTitle>
              <ThemedButton variant="primary" onClick={handleAddBrand}>
                + Add New Brand
              </ThemedButton>
            </SectionHeader>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#6B7280' }}>
                Loading brands...
              </div>
            ) : brands.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#6B7280' }}>
                No brands found. Create your first brand to get started.
              </div>
            ) : (
              <BrandList>
                {brands.map((brand) => (
                  <BrandCard key={brand.id}>
                    <BrandInfo>
                      <BrandName>{brand.name}</BrandName>
                      <BrandDetails>
                        <div><strong>Code:</strong> {brand.code}</div>
                        <div><strong>Owner:</strong> {brand.owner?.full_name || 'N/A'}</div>
                        <div><strong>Restaurants:</strong> {brand.restaurants?.length || 0}</div>
                        <div><strong>Status:</strong> {brand.status}</div>
                        {brand.description && <div><strong>Description:</strong> {brand.description}</div>}
                        {brand.email && <div><strong>Email:</strong> {brand.email}</div>}
                        {brand.phone && <div><strong>Phone:</strong> {brand.phone}</div>}
                      </BrandDetails>
                    </BrandInfo>
                    <ActionButtons>
                      <ActionButton variant="view" onClick={() => handleManageRestaurants(brand)}>
                        Restaurants
                      </ActionButton>
                      <ActionButton variant="edit" onClick={() => handleEditBrand(brand)}>
                        Edit
                      </ActionButton>
                      <ActionButton variant="delete" onClick={() => handleDeleteBrand(brand)}>
                        Delete
                      </ActionButton>
                    </ActionButtons>
                  </BrandCard>
                ))}
              </BrandList>
            )}
          </ContentCard>

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
                <FormLabel>Description</FormLabel>
                <FormInput
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of the brand"
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Email</FormLabel>
                <FormInput
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="contact@brand.com"
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Phone</FormLabel>
                <FormInput
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+60123456789"
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Address</FormLabel>
                <FormInput
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Street address"
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Website</FormLabel>
                <FormInput
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                  placeholder="https://www.brand.com"
                />
              </FormGroup>

              {error && <ErrorMessage>{error}</ErrorMessage>}

              <ButtonGroup>
                <Button type="button" variant="secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button type="submit">
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

          {/* Restaurants Settings Modal */}
          <Modal
            isOpen={showRestaurantsModal}
            onClose={() => setShowRestaurantsModal(false)}
            title={`${selectedBrand?.name} - Restaurant Recipe Settings`}
          >
            <div style={{ minHeight: '200px' }}>
              {loadingRestaurants ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#6B7280' }}>
                  Loading restaurants...
                </div>
              ) : brandRestaurants.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#6B7280' }}>
                  No restaurants in this brand.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ marginBottom: '16px', padding: '12px', background: '#F0F9FF', borderRadius: '8px', fontSize: '14px', color: '#0369A1' }}>
                    <strong>Recipe Management Mode:</strong><br />
                    <span style={{ fontSize: '13px' }}>
                      • <strong>Brand</strong>: Restaurants use brand recipes only (cannot create own recipes)<br />
                      • <strong>Restaurant</strong>: Restaurants can create and manage their own recipes
                    </span>
                  </div>
                  {brandRestaurants.map(restaurant => (
                    <div
                      key={restaurant.id}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '16px',
                        border: '1px solid #E6EBF1',
                        borderRadius: '8px',
                        background: 'white'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 600, color: '#0A2540', marginBottom: '4px' }}>
                          {restaurant.name}
                        </div>
                        <div style={{ fontSize: '13px', color: '#6B7280' }}>
                          {restaurant.address || 'No address'}
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <select
                          value={restaurant.recipe_manager_type || 'restaurant'}
                          onChange={(e) => handleRecipeManagerTypeChange(restaurant.id, e.target.value as 'restaurant' | 'brand')}
                          disabled={updatingRestaurant === restaurant.id}
                          style={{
                            padding: '8px 12px',
                            borderRadius: '6px',
                            border: '1px solid #E6EBF1',
                            fontSize: '14px',
                            color: '#0A2540',
                            cursor: updatingRestaurant === restaurant.id ? 'not-allowed' : 'pointer',
                            opacity: updatingRestaurant === restaurant.id ? 0.6 : 1
                          }}
                        >
                          <option value="brand">Brand</option>
                          <option value="restaurant">Restaurant</option>
                        </select>
                        {updatingRestaurant === restaurant.id && (
                          <span style={{ fontSize: '12px', color: '#6B7280' }}>Saving...</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <ButtonGroup>
                <Button type="button" variant="secondary" onClick={() => setShowRestaurantsModal(false)}>
                  Close
                </Button>
              </ButtonGroup>
            </div>
          </Modal>
        </Content>
      </Container>
    </MainLayout>
  );
};

export default BrandManagement;