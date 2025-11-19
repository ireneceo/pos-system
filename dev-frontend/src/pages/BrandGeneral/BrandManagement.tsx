import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainLayout from '../../components/Layout/MainLayout';
import { ModalComponent, FormGroup, FormLabel, FormInput, Button, StatsGrid, StatCard, StatValue, StatLabel, StatTrend } from '../../components/UI';
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

interface Brand {
  id: string;
  name: string;
  stores: number;
  manager: string;
  monthlyRevenue: number;
  category: string;
  established: string;
}

interface BrandFormData {
  name: string;
  manager: string;
  category: string;
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
    manager: '',
    category: ''
  });

  useEffect(() => {
    // Generate mock brands data
    const mockBrands: Brand[] = [
      {
        id: '1',
        name: 'K-DINE Korean Restaurant',
        stores: 25,
        manager: 'Kim Sujin',
        monthlyRevenue: 450000000,
        category: 'Korean Food',
        established: '2019-03-15'
      },
      {
        id: '2',
        name: 'Delicious Chicken',
        stores: 18,
        manager: 'Park Junyoung',
        monthlyRevenue: 320000000,
        category: 'Chicken',
        established: '2020-07-20'
      },
      {
        id: '3',
        name: 'Healthy Salad',
        stores: 12,
        manager: 'Lee Younghee',
        monthlyRevenue: 180000000,
        category: 'Salad',
        established: '2021-01-10'
      },
      {
        id: '4',
        name: 'Premium Burger',
        stores: 15,
        manager: 'Choi Minsu',
        monthlyRevenue: 275000000,
        category: 'Burger',
        established: '2020-11-05'
      },
      {
        id: '5',
        name: 'Asia Noodle',
        stores: 10,
        manager: 'Jung Hana',
        monthlyRevenue: 150000000,
        category: 'Asian Cuisine',
        established: '2021-05-18'
      },
      {
        id: '6',
        name: 'Cafe Break',
        stores: 20,
        manager: 'Yoon Seojun',
        monthlyRevenue: 380000000,
        category: 'Cafe',
        established: '2019-09-12'
      },
    ];

    setBrands(mockBrands);

    const totalRevenue = mockBrands.reduce((sum, brand) => sum + brand.monthlyRevenue, 0);
    const totalStores = mockBrands.reduce((sum, brand) => sum + brand.stores, 0);
    const activeManagers = new Set(mockBrands.map(brand => brand.manager)).size;

    setStats({
      totalBrands: mockBrands.length,
      totalStores,
      activeManagers,
      monthlyRevenue: totalRevenue,
    });
  }, []);

  const handleAddBrand = () => {
    setIsEditing(false);
    setSelectedBrand(null);
    setFormData({ name: '', manager: '', category: '' });
    setShowModal(true);
  };

  const handleEditBrand = (brand: Brand) => {
    setIsEditing(true);
    setSelectedBrand(brand);
    setFormData({
      name: brand.name,
      manager: brand.manager,
      category: brand.category
    });
    setShowModal(true);
  };

  const handleDeleteBrand = (brand: Brand) => {
    setSelectedBrand(brand);
    setShowDeleteModal(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && selectedBrand) {
      setBrands(prev => prev.map(brand =>
        brand.id === selectedBrand.id
          ? { ...brand, ...formData }
          : brand
      ));
    } else {
      const newBrand: Brand = {
        id: (brands.length + 1).toString(),
        ...formData,
        stores: 0,
        monthlyRevenue: 0,
        established: new Date().toISOString().split('T')[0]
      };
      setBrands(prev => [...prev, newBrand]);
    }
    setShowModal(false);
  };

  const confirmDelete = () => {
    if (selectedBrand) {
      setBrands(prev => prev.filter(brand => brand.id !== selectedBrand.id));
    }
    setShowDeleteModal(false);
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

            <BrandList>
              {brands.map((brand) => (
                <BrandCard key={brand.id}>
                  <BrandInfo>
                    <BrandName>{brand.name}</BrandName>
                    <BrandDetails>
                      <div><strong>Category:</strong> {brand.category}</div>
                      <div><strong>Manager:</strong> {brand.manager}</div>
                      <div><strong>Stores:</strong> {brand.stores}</div>
                      <div><strong>Monthly Revenue:</strong> RM {(brand.monthlyRevenue / 1000000).toFixed(0)}M</div>
                      <div><strong>Established:</strong> {brand.established}</div>
                    </BrandDetails>
                  </BrandInfo>
                  <ActionButtons>
                    <ActionButton variant="view">
                      View Details
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
          </ContentCard>

          {/* Add/Edit Modal */}
          <ModalComponent
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title={isEditing ? 'Edit Brand' : 'Add New Brand'}
          >
            <form onSubmit={handleFormSubmit}>
              <FormGroup>
                <FormLabel>Brand Name</FormLabel>
                <FormInput
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Category</FormLabel>
                <FormInput
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  required
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Manager</FormLabel>
                <FormInput
                  type="text"
                  value={formData.manager}
                  onChange={(e) => setFormData(prev => ({ ...prev, manager: e.target.value }))}
                  required
                />
              </FormGroup>

              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <Button type="button" variant="secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {isEditing ? 'Update' : 'Add'}
                </Button>
              </div>
            </form>
          </ModalComponent>

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
    </MainLayout>
  );
};

export default BrandManagement;