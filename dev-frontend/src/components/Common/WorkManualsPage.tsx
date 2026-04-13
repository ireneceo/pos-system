import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { EmptyState } from '../UI/TableComponents';
import { useAuth } from '../../contexts/AuthContext';
import { Container, Header, Title, Content, Button, ActionSection } from '../UI/PageComponents';
import { StatsGrid, StatCard, StatValue, StatLabel } from '../UI/StatCard';
import { SearchInput, FilterSelect } from './FilterComponents';
import FileUpload, { AttachmentFile } from './FileUpload';
import AttachmentList from './AttachmentList';
import CommentSection from './CommentSection';
import { linkifyText } from '../../utils/linkify';
import ConfirmModal from '../ConfirmModal';
import { Modal as CommonModal } from '../UI';
import { useTranslation } from 'react-i18next';
import { getAuthToken } from '../../utils/auth';

// ============================================================================
// Interfaces
// ============================================================================

interface WorkManual {
  id: number;
  title: string;
  content: string;
  author_id: number;
  author_name: string;
  author_role: string;
  restaurant_id: number | null;
  brand_id: number | null;
  foodcourt_id: number | null;
  category_id: number | null;
  category: { id: number; name: string } | null;
  restaurant: { id: number; name: string } | null;
  attachments?: any[];
  source_notice_id: number | null;
  status: string;
  createdAt: string;
  commentCount: number;
  author?: { id: number; full_name: string; role: string };
}

interface ManualCategory {
  id: number;
  name: string;
  owner_type: string;
  owner_id: number | null;
  sort_order: number;
}

interface OwnerRestaurant {
  id: number;
  name: string;
  branch_name?: string;
}

interface WorkManualsPageProps {
  pageTitle: string;
  translationNs: string;
  isOwner?: boolean;
  restaurantId?: string;
}

// ============================================================================
// Styled Components
// ============================================================================

const FilterBar = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 12px;
    > * { width: 100% !important; min-width: 100% !important; max-width: 100% !important; }
  }
`;

const ManualsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const ManualCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  cursor: pointer;
  transition: all 0.2s;
  border-left: 4px solid #635BFF;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 12px;
`;

const CardTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
  min-width: 0;
`;

const CardContent = styled.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CategoryBadge = styled.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  background: #EEF2FF;
  color: #4338CA;
  white-space: nowrap;
  flex-shrink: 0;
`;

const RestaurantBadge = styled.span`
  display: inline-block;
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 500;
  background: #FEF3C7;
  color: #92400E;
  white-space: nowrap;
  margin-bottom: 16px;
`;

const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
`;

const MetaLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const MetaRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
`;

// View Modal
const ViewSection = styled.div`
  margin-bottom: 24px;
`;

const ViewSectionTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
`;

const ViewTitle = styled.h3`
  font-size: 22px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
  line-height: 1.4;
`;

const ViewMeta = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
  font-size: 13px;
  color: #6B7280;
  & > * { flex-shrink: 0; }
`;

const ViewContent = styled.div`
  font-size: 15px;
  color: #374151;
  line-height: 1.7;
  padding: 20px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #635BFF;
  white-space: pre-wrap;
`;

// Form
const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
  transition: all 0.15s;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  box-sizing: border-box;
  transition: all 0.15s;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`;

const FormTextArea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
  box-sizing: border-box;
  transition: all 0.15s;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`;

const DeleteButton = styled.button`
  padding: 8px 16px;
  background: transparent;
  color: #DC2626;
  border: 1px solid #FCA5A5;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  &:hover { background: #FEE2E2; }
`;

const CategoryPill = styled.button<{ active: boolean }>`
  padding: 6px 16px;
  border-radius: 20px;
  border: ${props => props.active ? '1.5px solid #635BFF' : '1px solid #E6EBF1'};
  background: ${props => props.active ? '#F0EFFF' : 'white'};
  color: ${props => props.active ? '#635BFF' : '#6B7280'};
  font-size: 13px;
  font-weight: ${props => props.active ? 600 : 400};
  cursor: pointer;
  transition: all 0.15s;
`;

const CategoryManageRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 8px;
`;

const CategoryInput = styled.input`
  padding: 6px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 13px;
  flex: 1;
  &:focus { outline: none; border-color: #635BFF; }
`;

const SmallButton = styled.button<{ variant?: string }>`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  border: 1px solid ${props => props.variant === 'danger' ? '#FCA5A5' : '#E6EBF1'};
  background: ${props => props.variant === 'danger' ? 'transparent' : '#F8FAFC'};
  color: ${props => props.variant === 'danger' ? '#DC2626' : '#374151'};
  &:hover { background: ${props => props.variant === 'danger' ? '#FEE2E2' : '#E6EBF1'}; }
`;

const RestaurantSelector = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

// ============================================================================
// Component
// ============================================================================

const WorkManualsPage: React.FC<WorkManualsPageProps> = ({
  pageTitle,
  translationNs,
  isOwner = false,
  restaurantId
}) => {
  const { t } = useTranslation(translationNs);
  const { user } = useAuth();

  // Data
  const [manuals, setManuals] = useState<WorkManual[]>([]);
  const [categories, setCategories] = useState<ManualCategory[]>([]);
  const [ownerRestaurants, setOwnerRestaurants] = useState<OwnerRestaurant[]>([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<number | null>(null);
  const [unreadCounts, setUnreadCounts] = useState<Record<string, { total_comments: number; unread_count: number }>>({});

  // UI
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<number | 'all'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedManual, setSelectedManual] = useState<WorkManual | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ title: '', content: '', category_id: null as number | null });
  const [saving, setSaving] = useState(false);
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showCopyModal, setShowCopyModal] = useState(false);
  const [copyTargetRestaurantId, setCopyTargetRestaurantId] = useState<number | null>(null);

  // Create form
  const [newManual, setNewManual] = useState({ title: '', content: '', category_id: null as number | null });
  const [newAttachments, setNewAttachments] = useState<AttachmentFile[]>([]);
  const [createRestaurantId, setCreateRestaurantId] = useState<number | null>(null);

  const getAuthHeaders = useCallback(() => {
    const token = getAuthToken();
    return { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };
  }, []);

  const getRestaurantParam = useCallback(() => {
    if (restaurantId) return `restaurant_id=${restaurantId}`;
    if (isOwner && selectedRestaurantId) return `restaurant_id=${selectedRestaurantId}`;
    return '';
  }, [restaurantId, isOwner, selectedRestaurantId]);

  // Fetch owner restaurants
  useEffect(() => {
    if (!isOwner) return;
    (async () => {
      try {
        const res = await fetch('/api/work-manuals/restaurants', { headers: getAuthHeaders() });
        if (res.ok) {
          const data = await res.json();
          setOwnerRestaurants(data.data || []);
          if (data.data?.length > 0 && !selectedRestaurantId) {
            setSelectedRestaurantId(data.data[0].id);
          }
        }
      } catch (e) { /* silent */ }
    })();
  }, [isOwner, getAuthHeaders]);

  // Fetch unread comment counts
  const fetchUnreadCounts = async (list: any[]) => {
    if (list.length === 0) return;
    try {
      const token = getAuthToken();
      const ids = list.map((m: any) => m.id).join(',');
      const res = await fetch(`/api/comments/unread-counts?entity_type=work_manual&entity_ids=${ids}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          const map: Record<string, { total_comments: number; unread_count: number }> = {};
          data.data.forEach((item: any) => { map[item.entity_id] = { total_comments: Number(item.total_comments), unread_count: Number(item.unread_count) }; });
          setUnreadCounts(map);
        }
      }
    } catch (e) { /* silent */ }
  };

  // Fetch manuals
  const fetchManuals = useCallback(async () => {
    try {
      const param = getRestaurantParam();
      const url = `/api/work-manuals${param ? '?' + param : ''}`;
      const res = await fetch(url, { headers: getAuthHeaders(), cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        const list = data.data || [];
        setManuals(list);
        fetchUnreadCounts(list);
      }
    } catch (e) { /* silent */ }
  }, [getAuthHeaders, getRestaurantParam]);

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      const param = getRestaurantParam();
      const url = `/api/work-manuals/categories${param ? '?' + param : ''}`;
      const res = await fetch(url, { headers: getAuthHeaders() });
      if (res.ok) {
        const data = await res.json();
        setCategories(data.data || []);
      }
    } catch (e) { /* silent */ }
  }, [getAuthHeaders, getRestaurantParam]);

  useEffect(() => {
    if (isOwner && !selectedRestaurantId) return;
    fetchManuals();
    fetchCategories();
  }, [fetchManuals, fetchCategories, isOwner, selectedRestaurantId]);

  // Stats
  const totalManuals = manuals.length;
  const thisMonth = manuals.filter(m => {
    const d = new Date(m.createdAt);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;
  const categorizedCount = manuals.filter(m => m.category_id).length;
  const uncategorizedCount = manuals.filter(m => !m.category_id).length;

  // Filter
  const filteredManuals = manuals
    .filter(m => {
      const matchesSearch = m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.author_name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' ||
        (categoryFilter === 0 ? !m.category_id : m.category_id === categoryFilter);
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-MY', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-MY', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  // Create
  const handleCreate = async () => {
    if (!newManual.title.trim() || !newManual.content.trim()) return;
    setSaving(true);
    try {
      const body: any = {
        title: newManual.title,
        content: newManual.content,
        category_id: newManual.category_id,
        attachments: newAttachments.length > 0 ? newAttachments : undefined
      };
      if (isOwner && createRestaurantId) {
        body.restaurant_id = createRestaurantId;
      } else if (restaurantId) {
        body.restaurant_id = parseInt(restaurantId);
      }

      const res = await fetch('/api/work-manuals', {
        method: 'POST', headers: getAuthHeaders(), body: JSON.stringify(body)
      });
      if (res.ok) {
        setShowCreateModal(false);
        setNewManual({ title: '', content: '', category_id: null });
        setNewAttachments([]);
        setCreateRestaurantId(null);
        fetchManuals();
      }
    } catch (e) { /* silent */ }
    finally { setSaving(false); }
  };

  // Delete
  const handleDelete = async () => {
    if (!selectedManual) return;
    try {
      const res = await fetch(`/api/work-manuals/${selectedManual.id}`, {
        method: 'DELETE', headers: getAuthHeaders()
      });
      if (res.ok) {
        setShowDeleteConfirm(false);
        setShowViewModal(false);
        setSelectedManual(null);
        fetchManuals();
      }
    } catch (e) { /* silent */ }
  };

  // Edit save
  const handleEditSave = async () => {
    if (!selectedManual) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/work-manuals/${selectedManual.id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(editForm)
      });
      const data = await res.json();
      if (data.success) {
        setIsEditing(false);
        setSelectedManual({ ...selectedManual, ...editForm, category: editForm.category_id ? categories.find(c => c.id === editForm.category_id) ? { id: editForm.category_id, name: categories.find(c => c.id === editForm.category_id)!.name } : null : null });
        fetchManuals();
      }
    } catch (e) { /* silent */ }
    finally { setSaving(false); }
  };

  // Copy
  const handleCopy = async () => {
    if (!selectedManual) return;
    setSaving(true);
    try {
      const body: any = {};
      if (isOwner && copyTargetRestaurantId) {
        body.restaurant_id = copyTargetRestaurantId;
      }
      const res = await fetch(`/api/work-manuals/copy/${selectedManual.id}`, {
        method: 'POST', headers: getAuthHeaders(), body: JSON.stringify(body)
      });
      if (res.ok) {
        setShowCopyModal(false);
        setCopyTargetRestaurantId(null);
        fetchManuals();
      }
    } catch (e) { /* silent */ }
    finally { setSaving(false); }
  };

  // Category CRUD
  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    const body: any = { name: newCategoryName.trim() };
    if (isOwner && selectedRestaurantId) body.restaurant_id = selectedRestaurantId;
    else if (restaurantId) body.restaurant_id = parseInt(restaurantId);

    const res = await fetch('/api/work-manuals/categories', {
      method: 'POST', headers: getAuthHeaders(), body: JSON.stringify(body)
    });
    if (res.ok) {
      setNewCategoryName('');
      fetchCategories();
    }
  };

  const handleDeleteCategory = async (catId: number) => {
    const res = await fetch(`/api/work-manuals/categories/${catId}`, {
      method: 'DELETE', headers: getAuthHeaders()
    });
    if (res.ok) {
      fetchCategories();
      if (categoryFilter === catId) setCategoryFilter('all');
    }
  };

  // View
  const handleViewManual = async (manual: WorkManual) => {
    try {
      const res = await fetch(`/api/work-manuals/${manual.id}`, { headers: getAuthHeaders() });
      if (res.ok) {
        const data = await res.json();
        setSelectedManual(data.data);
        setShowViewModal(true);
      }
    } catch (e) { /* silent */ }
  };

  return (
    <Container>
      <Header>
        <Title>{pageTitle}</Title>
        <ActionSection>
          <Button variant="secondary" onClick={() => setShowCategoryManager(!showCategoryManager)}>
            {t('workManuals.manageCategories', 'Manage Categories')}
          </Button>
          <Button variant="primary" onClick={() => {
            if (isOwner && selectedRestaurantId) setCreateRestaurantId(selectedRestaurantId);
            setShowCreateModal(true);
          }}>
            {t('workManuals.newManual', 'New Manual')}
          </Button>
        </ActionSection>
      </Header>

      <Content>
        {/* Owner: Restaurant Selector */}
        {isOwner && ownerRestaurants.length > 0 && (
          <RestaurantSelector>
            <FormLabel style={{ marginBottom: 0 }}>{t('workManuals.restaurant', 'Restaurant')}:</FormLabel>
            <FilterSelect
              value={selectedRestaurantId || ''}
              onChange={(e) => setSelectedRestaurantId(parseInt(e.target.value))}
              style={{ width: 'auto', minWidth: '200px' }}
            >
              {ownerRestaurants.map(r => (
                <option key={r.id} value={r.id}>{r.name}{r.branch_name ? ` (${r.branch_name})` : ''}</option>
              ))}
            </FilterSelect>
          </RestaurantSelector>
        )}

        {/* Stats */}
        <StatsGrid>
          <StatCard color="#635BFF">
            <StatValue>{totalManuals}</StatValue>
            <StatLabel>{t('workManuals.totalManuals', 'Total Manuals')}</StatLabel>
          </StatCard>
          <StatCard color="#10B981">
            <StatValue>{thisMonth}</StatValue>
            <StatLabel>{t('workManuals.thisMonth', 'This Month')}</StatLabel>
          </StatCard>
          <StatCard color="#F59E0B">
            <StatValue>{categorizedCount}</StatValue>
            <StatLabel>{t('workManuals.categorized', 'Categorized')}</StatLabel>
          </StatCard>
          <StatCard color="#6B7280">
            <StatValue>{uncategorizedCount}</StatValue>
            <StatLabel>{t('workManuals.uncategorized', 'Uncategorized')}</StatLabel>
          </StatCard>
        </StatsGrid>

        {/* Category Manager */}
        {showCategoryManager && (
          <div style={{ background: '#F8FAFC', borderRadius: '12px', padding: '20px', marginBottom: '20px', border: '1px solid #E6EBF1', position: 'relative' }}>
            <button
              onClick={() => setShowCategoryManager(false)}
              style={{ position: 'absolute', top: '12px', right: '12px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: '#9CA3AF', padding: '4px 8px', lineHeight: 1 }}
              title="Close"
            >&times;</button>
            <ViewSectionTitle>{t('workManuals.categories', 'Categories')}</ViewSectionTitle>
            {categories.map(cat => (
              <CategoryManageRow key={cat.id}>
                <span style={{ flex: 1, fontSize: '14px' }}>{cat.name}</span>
                <SmallButton variant="danger" onClick={() => handleDeleteCategory(cat.id)}>
                  {t('workManuals.delete', 'Delete')}
                </SmallButton>
              </CategoryManageRow>
            ))}
            <CategoryManageRow>
              <CategoryInput
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder={t('workManuals.newCategoryPlaceholder', 'New category name...')}
                onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
              />
              <SmallButton onClick={handleAddCategory}>{t('workManuals.add', 'Add')}</SmallButton>
            </CategoryManageRow>
          </div>
        )}

        {/* Category Filter Pills */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <CategoryPill active={categoryFilter === 'all'} onClick={() => setCategoryFilter('all')}>
            {t('workManuals.all', 'All')}
          </CategoryPill>
          {categories.map(cat => (
            <CategoryPill key={cat.id} active={categoryFilter === cat.id} onClick={() => setCategoryFilter(cat.id)}>
              {cat.name}
            </CategoryPill>
          ))}
          <CategoryPill active={categoryFilter === 0} onClick={() => setCategoryFilter(0)}>
            {t('workManuals.uncategorized', 'Uncategorized')}
          </CategoryPill>
        </div>

        {/* Search */}
        <FilterBar>
          <SearchInput
            type="text"
            placeholder={t('workManuals.searchPlaceholder', 'Search manuals...')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </FilterBar>

        {/* Manuals Grid */}
        {filteredManuals.length === 0 ? (
          <EmptyState>
            <h3>{t('workManuals.noManualsFound', 'No manuals found')}</h3>
            <p>
              {manuals.length === 0
                ? t('workManuals.createFirst', 'Create your first work manual by clicking "New Manual" above.')
                : t('workManuals.noMatchFilters', 'No manuals match your current filters.')}
            </p>
          </EmptyState>
        ) : (
          <ManualsGrid>
            {filteredManuals.map(manual => (
              <ManualCard key={manual.id} onClick={() => handleViewManual(manual)}>
                <CardHeader>
                  <CardTitle>{manual.title}</CardTitle>
                  <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                    {manual.category && <CategoryBadge>{manual.category.name}</CategoryBadge>}
                  </div>
                </CardHeader>

                <CardContent>{manual.content}</CardContent>

                {isOwner && manual.restaurant && (
                  <RestaurantBadge>{manual.restaurant.name}</RestaurantBadge>
                )}

                <CardMeta>
                  <MetaLeft>
                    <MetaItem>{formatDate(manual.createdAt)}</MetaItem>
                    <MetaItem style={{ color: '#9CA3AF' }}>
                      {manual.author_name}
                    </MetaItem>
                  </MetaLeft>
                  <MetaRight>
                    <MetaItem>
                      {manual.commentCount || 0} comment{(manual.commentCount || 0) !== 1 ? 's' : ''}
                      {unreadCounts[String(manual.id)]?.unread_count > 0 && (
                        <span style={{ background: '#EF4444', color: 'white', borderRadius: '10px', padding: '1px 7px', fontSize: '11px', fontWeight: 600, marginLeft: '4px' }}>
                          {unreadCounts[String(manual.id)].unread_count} new
                        </span>
                      )}
                    </MetaItem>
                  </MetaRight>
                </CardMeta>
              </ManualCard>
            ))}
          </ManualsGrid>
        )}
      </Content>

      {/* ====================================================================== */}
      {/* Create Modal */}
      {/* ====================================================================== */}
      {showCreateModal && (
        <CommonModal
          isOpen={true}
          onClose={() => { setShowCreateModal(false); setNewManual({ title: '', content: '', category_id: null }); setNewAttachments([]); }}
          title={t('workManuals.newManual', 'New Manual')}
          maxWidth="720px"
          footer={
            <>
              <Button variant="secondary" onClick={() => { setShowCreateModal(false); setNewManual({ title: '', content: '', category_id: null }); setNewAttachments([]); }}>
                {t('workManuals.cancel', 'Cancel')}
              </Button>
              <Button variant="primary" onClick={handleCreate} disabled={saving || !newManual.title.trim() || !newManual.content.trim()}>
                {saving ? t('workManuals.saving', 'Saving...') : t('workManuals.create', 'Create')}
              </Button>
            </>
          }
        >
          {isOwner && ownerRestaurants.length > 0 && (
            <FormGroup>
              <FormLabel>{t('workManuals.restaurant', 'Restaurant')}</FormLabel>
              <FormSelect
                value={createRestaurantId || ''}
                onChange={(e) => setCreateRestaurantId(parseInt(e.target.value))}
              >
                {ownerRestaurants.map(r => (
                  <option key={r.id} value={r.id}>{r.name}{r.branch_name ? ` (${r.branch_name})` : ''}</option>
                ))}
              </FormSelect>
            </FormGroup>
          )}

          <FormGroup>
            <FormLabel>{t('workManuals.title', 'Title')}</FormLabel>
            <FormInput
              type="text"
              placeholder={t('workManuals.titlePlaceholder', 'Enter manual title')}
              value={newManual.title}
              onChange={(e) => setNewManual(prev => ({ ...prev, title: e.target.value }))}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>{t('workManuals.category', 'Category')}</FormLabel>
            <FormSelect
              value={newManual.category_id || ''}
              onChange={(e) => setNewManual(prev => ({ ...prev, category_id: e.target.value ? parseInt(e.target.value) : null }))}
            >
              <option value="">{t('workManuals.noCategory', 'No Category')}</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </FormSelect>
          </FormGroup>

          <FormGroup>
            <FormLabel>{t('workManuals.content', 'Content')}</FormLabel>
            <FormTextArea
              placeholder={t('workManuals.contentPlaceholder', 'Enter manual content...')}
              value={newManual.content}
              onChange={(e) => setNewManual(prev => ({ ...prev, content: e.target.value }))}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>{t('workManuals.attachments', 'Attachments')}</FormLabel>
            <FileUpload files={newAttachments} onChange={setNewAttachments} maxFiles={5} />
          </FormGroup>
        </CommonModal>
      )}

      {/* ====================================================================== */}
      {/* View Modal */}
      {/* ====================================================================== */}
      {showViewModal && selectedManual && (
        <CommonModal
          isOpen={true}
          onClose={() => { setShowViewModal(false); setSelectedManual(null); setIsEditing(false); }}
          title={isEditing ? t('workManuals.editManual', 'Edit Manual') : t('workManuals.manualDetails', 'Manual Details')}
          size="large"
          footer={
            isEditing ? (
              <>
                <Button variant="secondary" onClick={() => setIsEditing(false)}>{t('workManuals.cancel', 'Cancel')}</Button>
                <Button variant="primary" onClick={handleEditSave} disabled={saving}>
                  {saving ? t('workManuals.saving', 'Saving...') : t('workManuals.save', 'Save')}
                </Button>
              </>
            ) : (
              <>
                <Button variant="secondary" onClick={() => {
                  setShowCopyModal(true);
                  if (isOwner && selectedRestaurantId) setCopyTargetRestaurantId(selectedRestaurantId);
                }}>
                  {t('workManuals.copy', 'Copy')}
                </Button>
                {(String(selectedManual.author_id) === String(user?.id) || user?.role === 'System Admin') && (
                  <Button variant="primary" onClick={() => {
                    setEditForm({ title: selectedManual.title, content: selectedManual.content, category_id: selectedManual.category_id });
                    setIsEditing(true);
                  }}>
                    {t('workManuals.edit', 'Edit')}
                  </Button>
                )}
                {(String(selectedManual.author_id) === String(user?.id) || user?.role === 'System Admin') && (
                  <DeleteButton onClick={() => setShowDeleteConfirm(true)}>
                    {t('workManuals.delete', 'Delete')}
                  </DeleteButton>
                )}
                <Button variant="secondary" onClick={() => { setShowViewModal(false); setSelectedManual(null); }}>
                  {t('workManuals.close', 'Close')}
                </Button>
              </>
            )
          }
        >
          {isEditing ? (
            <ViewSection>
              <FormGroup>
                <FormLabel>{t('workManuals.title', 'Title')}</FormLabel>
                <FormInput value={editForm.title} onChange={(e: any) => setEditForm({ ...editForm, title: e.target.value })} />
              </FormGroup>
              <FormGroup>
                <FormLabel>{t('workManuals.category', 'Category')}</FormLabel>
                <FormSelect
                  value={editForm.category_id || ''}
                  onChange={(e) => setEditForm({ ...editForm, category_id: e.target.value ? parseInt(e.target.value) : null })}
                >
                  <option value="">{t('workManuals.noCategory', 'No Category')}</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </FormSelect>
              </FormGroup>
              <FormGroup>
                <FormLabel>{t('workManuals.content', 'Content')}</FormLabel>
                <textarea
                  value={editForm.content}
                  onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                  style={{ width: '100%', minHeight: '200px', padding: '12px', borderRadius: '8px', border: '1px solid #E6EBF1', fontSize: '14px', fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box' }}
                />
              </FormGroup>
            </ViewSection>
          ) : (
            <>
              <ViewSection>
                <ViewTitle>{selectedManual.title}</ViewTitle>
                <ViewMeta>
                  {selectedManual.category && <CategoryBadge>{selectedManual.category.name}</CategoryBadge>}
                  {selectedManual.restaurant && <RestaurantBadge>{selectedManual.restaurant.name}</RestaurantBadge>}
                  <span>{formatDateTime(selectedManual.createdAt)}</span>
                  <span style={{ color: '#9CA3AF' }}>by {selectedManual.author?.full_name || selectedManual.author_name}</span>
                  {selectedManual.source_notice_id && (
                    <span style={{ fontSize: '11px', padding: '2px 8px', background: '#FEF3C7', borderRadius: '4px', color: '#92400E' }}>
                      {t('workManuals.fromNotice', 'From Notice')}
                    </span>
                  )}
                </ViewMeta>
                <ViewContent>
                  {selectedManual.content.split('\n').map((line: string, i: number) => (
                    <React.Fragment key={i}>{i > 0 && <br />}{linkifyText(line)}</React.Fragment>
                  ))}
                </ViewContent>
                {selectedManual?.attachments && selectedManual.attachments.length > 0 && (
                  <div style={{ marginTop: '16px' }}>
                    <AttachmentList attachments={selectedManual.attachments} />
                  </div>
                )}
              </ViewSection>

              <CommentSection
                entityType="work_manual"
                entityId={String(selectedManual.id)}
                currentUserId={user?.id}
                onMarkRead={() => setUnreadCounts(prev => { const next = { ...prev }; const key = String(selectedManual.id); if (next[key]) next[key] = { ...next[key], unread_count: 0 }; return next; })}
              />
            </>
          )}
        </CommonModal>
      )}

      {/* Delete Confirm */}
      {showDeleteConfirm && (
        <ConfirmModal
          isOpen={true}
          onCancel={() => setShowDeleteConfirm(false)}
          onConfirm={handleDelete}
          title={t('workManuals.deleteConfirmTitle', 'Delete Manual')}
          message={t('workManuals.deleteConfirmMessage', 'Are you sure you want to delete this manual? This action cannot be undone.')}
          confirmText={t('workManuals.delete', 'Delete')}
          cancelText={t('workManuals.cancel', 'Cancel')}
          type="danger"
        />
      )}

      {/* Copy Modal */}
      {showCopyModal && selectedManual && (
        <CommonModal
          isOpen={true}
          onClose={() => { setShowCopyModal(false); setCopyTargetRestaurantId(null); }}
          title={t('workManuals.copyManual', 'Copy Manual')}
          maxWidth="480px"
          footer={
            <>
              <Button variant="secondary" onClick={() => { setShowCopyModal(false); setCopyTargetRestaurantId(null); }}>
                {t('workManuals.cancel', 'Cancel')}
              </Button>
              <Button variant="primary" onClick={handleCopy} disabled={saving || (isOwner && !copyTargetRestaurantId)}>
                {saving ? t('workManuals.copying', 'Copying...') : t('workManuals.copy', 'Copy')}
              </Button>
            </>
          }
        >
          <p style={{ marginBottom: '16px', color: '#6B7280', fontSize: '14px' }}>
            {t('workManuals.copyDescription', 'A copy of this manual will be created. You can edit it after copying.')}
          </p>
          <p style={{ fontWeight: 600, marginBottom: '16px' }}>"{selectedManual.title}"</p>

          {isOwner && ownerRestaurants.length > 0 && (
            <FormGroup>
              <FormLabel>{t('workManuals.copyToRestaurant', 'Copy to Restaurant')}</FormLabel>
              <FormSelect
                value={copyTargetRestaurantId || ''}
                onChange={(e) => setCopyTargetRestaurantId(parseInt(e.target.value))}
              >
                <option value="">{t('workManuals.selectRestaurant', 'Select restaurant...')}</option>
                {ownerRestaurants.map(r => (
                  <option key={r.id} value={r.id}>{r.name}{r.branch_name ? ` (${r.branch_name})` : ''}</option>
                ))}
              </FormSelect>
            </FormGroup>
          )}
        </CommonModal>
      )}
    </Container>
  );
};

export default WorkManualsPage;
