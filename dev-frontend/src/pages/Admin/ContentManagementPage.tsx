import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import MainLayout from '../../components/Layout/MainLayout';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import { Modal, ModalButton, FormGroup, FormLabel, FormInput, FormTextArea } from '../../components/UI/Modal';
import ConfirmDialog from '../../components/Common/ConfirmDialog';
import {
  Container,
  Header,
  Title,
  Content,
  StatsGrid,
  StatCard,
  StatValue,
  StatLabel,
  Table,
  TableHeader,
  TableRow,
  ActionButtons,
  ActionButton
} from '../../components/UI';
import { TabContainer, Tab } from '../../components/UI/Tabs';
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';

interface ContentCategory {
  id: number;
  type: 'blog' | 'faq';
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  sort_order: number;
  is_active: boolean;
  content_count: number;
}

interface ContentItem {
  id: number;
  type: 'blog' | 'faq';
  category_id: number;
  title: string;
  slug: string | null;
  content: string;
  excerpt: string | null;
  thumbnail_url: string | null;
  status: 'draft' | 'published';
  sort_order: number;
  view_count: number;
  author_name: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  category?: ContentCategory;
  // SEO/AEO fields
  seo_title?: string | null;
  seo_description?: string | null;
  seo_keywords?: string | null;
  og_image_url?: string | null;
  ai_summary?: string | null;
}

const StatusBadge = styled.span<{ status: string }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  background: ${props => props.status === 'published' ? '#ECFDF5' : '#FEF3C7'};
  color: ${props => props.status === 'published' ? '#059669' : '#D97706'};
`;

const CategoryGrid = styled.div`
  display: grid;
  gap: 12px;
`;

const CategoryCard = styled.div<{ isActive?: boolean }>`
  background: white;
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  opacity: ${props => props.isActive !== false ? 1 : 0.6};
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`;

const CategoryIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`;

const CategoryInfo = styled.div`
  flex: 1;
`;

const CategoryName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`;

const CategoryMeta = styled.div`
  font-size: 13px;
  color: #6B7280;
`;

const CategoryActions = styled.div`
  display: flex;
  gap: 8px;
`;

const IconButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #F9FAFB;
    border-color: #D1D5DB;
  }

  svg {
    width: 18px;
    height: 18px;
    color: #6B7280;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);

  h3 {
    font-size: 18px;
    color: #1F2937;
    margin: 16px 0 8px;
  }

  p {
    color: #6B7280;
    font-size: 14px;
    margin-bottom: 24px;
  }
`;

const EditorWrapper = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  margin-top: 16px;
`;

const EditorHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #E5E7EB;
`;

const EditorTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`;

const EditorActions = styled.div`
  display: flex;
  gap: 12px;
`;

const EditorForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const RichTextEditor = styled.textarea`
  width: 100%;
  min-height: 300px;
  padding: 16px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.6;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const ThumbnailUpload = styled.div`
  border: 2px dashed #E5E7EB;
  border-radius: 8px;
  padding: 24px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #635BFF;
    background: #F9FAFB;
  }

  img {
    max-width: 200px;
    max-height: 150px;
    border-radius: 8px;
    margin-bottom: 12px;
  }

  p {
    color: #6B7280;
    font-size: 14px;
    margin: 0;
  }
`;

const FilterBarWithButton = styled(FilterBar)`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const ContentManagementPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab') || 'blog';

  const [activeTab, setActiveTab] = useState<'blog' | 'blog-categories' | 'faq' | 'faq-categories'>(
    tabParam as 'blog' | 'blog-categories' | 'faq' | 'faq-categories'
  );
  const [categories, setCategories] = useState<ContentCategory[]>([]);
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Editor state
  const [isEditing, setIsEditing] = useState(false);
  const [editingContent, setEditingContent] = useState<Partial<ContentItem> | null>(null);

  // Category modal
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Partial<ContentCategory> | null>(null);

  // Confirm dialog
  const [confirmDialog, setConfirmDialog] = useState<{
    show: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({ show: false, title: '', message: '', onConfirm: () => {} });

  const [successMessage, setSuccessMessage] = useState('');

  // Get content type from tab
  const getContentType = () => activeTab.includes('blog') ? 'blog' : 'faq';
  const isCategory = activeTab.includes('categories');

  useEffect(() => {
    fetchData();
    setSearchParams({ tab: activeTab });
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    const type = getContentType();
    try {
      const token = localStorage.getItem('auth_token');
      const headers = { 'Authorization': `Bearer ${token}` };

      const [categoriesRes, contentsRes] = await Promise.all([
        fetch(`/api/contents/categories?type=${type}`, { headers }),
        fetch(`/api/contents?type=${type}`, { headers })
      ]);

      if (categoriesRes.ok) {
        const data = await categoriesRes.json();
        setCategories(data);
      }

      if (contentsRes.ok) {
        const data = await contentsRes.json();
        setContents(data.items || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  const handleTabChange = (tab: 'blog' | 'blog-categories' | 'faq' | 'faq-categories') => {
    setActiveTab(tab);
    setIsEditing(false);
    setEditingContent(null);
  };

  const handleSaveCategory = async () => {
    if (!editingCategory?.name) return;

    try {
      const token = localStorage.getItem('auth_token');
      const isNew = !editingCategory.id;
      const type = getContentType();

      const response = await fetch(
        isNew ? '/api/contents/categories' : `/api/contents/categories/${editingCategory.id}`,
        {
          method: isNew ? 'POST' : 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            type: type,
            name: editingCategory.name,
            description: editingCategory.description,
            icon: editingCategory.icon
          })
        }
      );

      if (response.ok) {
        setSuccessMessage(isNew ? 'Category created successfully' : 'Category updated successfully');
        setShowCategoryModal(false);
        setEditingCategory(null);
        fetchData();
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to save category');
      }
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    setConfirmDialog({
      show: true,
      title: 'Delete Category',
      message: 'Are you sure you want to delete this category? This action cannot be undone.',
      onConfirm: async () => {
        try {
          const token = localStorage.getItem('auth_token');
          const response = await fetch(`/api/contents/categories/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
          });

          if (response.ok) {
            setSuccessMessage('Category deleted successfully');
            fetchData();
            setTimeout(() => setSuccessMessage(''), 3000);
          } else {
            const error = await response.json();
            alert(error.error || 'Failed to delete category');
          }
        } catch (error) {
          console.error('Error deleting category:', error);
        }
        setConfirmDialog({ ...confirmDialog, show: false });
      }
    });
  };

  const handleSaveContent = async () => {
    if (!editingContent?.title || !editingContent?.content || !editingContent?.category_id) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const token = localStorage.getItem('auth_token');
      const isNew = !editingContent.id;
      const type = getContentType();

      const response = await fetch(
        isNew ? '/api/contents' : `/api/contents/${editingContent.id}`,
        {
          method: isNew ? 'POST' : 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            type: type,
            category_id: editingContent.category_id,
            title: editingContent.title,
            content: editingContent.content,
            excerpt: editingContent.excerpt,
            thumbnail_url: editingContent.thumbnail_url,
            status: editingContent.status || 'draft',
            // SEO/AEO fields
            seo_title: editingContent.seo_title,
            seo_description: editingContent.seo_description,
            seo_keywords: editingContent.seo_keywords,
            og_image_url: editingContent.og_image_url,
            ai_summary: editingContent.ai_summary
          })
        }
      );

      if (response.ok) {
        setSuccessMessage(isNew ? 'Content created successfully' : 'Content updated successfully');
        setIsEditing(false);
        setEditingContent(null);
        fetchData();
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error saving content:', error);
    }
  };

  const handleDeleteContent = async (id: number) => {
    setConfirmDialog({
      show: true,
      title: 'Delete Content',
      message: 'Are you sure you want to delete this content? This action cannot be undone.',
      onConfirm: async () => {
        try {
          const token = localStorage.getItem('auth_token');
          await fetch(`/api/contents/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
          });
          setSuccessMessage('Content deleted successfully');
          fetchData();
          setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
          console.error('Error deleting content:', error);
        }
        setConfirmDialog({ ...confirmDialog, show: false });
      }
    });
  };

  const handleTogglePublish = async (item: ContentItem) => {
    try {
      const token = localStorage.getItem('auth_token');
      const newStatus = item.status === 'published' ? 'draft' : 'published';

      await fetch(`/api/contents/${item.id}/${newStatus === 'published' ? 'publish' : 'unpublish'}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      setSuccessMessage(newStatus === 'published' ? 'Content published' : 'Content unpublished');
      fetchData();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error toggling publish:', error);
    }
  };

  const filteredContents = contents.filter(item => {
    if (searchTerm && !item.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (statusFilter !== 'all' && item.status !== statusFilter) return false;
    if (categoryFilter !== 'all' && item.category_id !== parseInt(categoryFilter)) return false;
    return true;
  });

  const stats = {
    total: contents.length,
    published: contents.filter(c => c.status === 'published').length,
    draft: contents.filter(c => c.status === 'draft').length,
    categories: categories.length
  };

  const contentType = getContentType();

  // Render Editor inside the main layout
  const renderEditor = () => (
    <EditorWrapper>
      <EditorHeader>
        <EditorTitle>
          {editingContent?.id ? 'Edit' : 'New'} {contentType === 'blog' ? 'Blog Post' : 'FAQ Item'}
        </EditorTitle>
        <EditorActions>
          <ThemedButton variant="secondary" onClick={() => { setIsEditing(false); setEditingContent(null); }}>
            Cancel
          </ThemedButton>
          <ThemedButton variant="secondary" onClick={() => { setEditingContent({ ...editingContent, status: 'draft' }); handleSaveContent(); }}>
            Save as Draft
          </ThemedButton>
          <ThemedButton onClick={() => { setEditingContent({ ...editingContent, status: 'published' }); handleSaveContent(); }}>
            Publish
          </ThemedButton>
        </EditorActions>
      </EditorHeader>

      <EditorForm>
        <FormRow>
          <FormGroup>
            <FormLabel>Title *</FormLabel>
            <FormInput
              value={editingContent?.title || ''}
              onChange={(e) => setEditingContent({ ...editingContent, title: e.target.value })}
              placeholder={contentType === 'blog' ? 'Enter post title' : 'Enter question'}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Category *</FormLabel>
            <FilterSelect
              value={editingContent?.category_id?.toString() || ''}
              onChange={(e) => setEditingContent({ ...editingContent, category_id: parseInt(e.target.value) })}
            >
              <option value="">Select category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
              ))}
            </FilterSelect>
          </FormGroup>
        </FormRow>

        {contentType === 'blog' && (
          <FormRow>
            <FormGroup>
              <FormLabel>Excerpt</FormLabel>
              <FormTextArea
                value={editingContent?.excerpt || ''}
                onChange={(e) => setEditingContent({ ...editingContent, excerpt: e.target.value })}
                placeholder="Brief summary for the blog card"
                rows={3}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Thumbnail</FormLabel>
              <ThumbnailUpload>
                {editingContent?.thumbnail_url ? (
                  <img src={editingContent.thumbnail_url} alt="Thumbnail" />
                ) : (
                  <p>Click to upload thumbnail image</p>
                )}
                <FormInput
                  type="text"
                  value={editingContent?.thumbnail_url || ''}
                  onChange={(e) => setEditingContent({ ...editingContent, thumbnail_url: e.target.value })}
                  placeholder="Enter image URL"
                  style={{ marginTop: '12px' }}
                />
              </ThumbnailUpload>
            </FormGroup>
          </FormRow>
        )}

        <FormGroup>
          <FormLabel>{contentType === 'blog' ? 'Content *' : 'Answer *'}</FormLabel>
          <RichTextEditor
            value={editingContent?.content || ''}
            onChange={(e) => setEditingContent({ ...editingContent, content: e.target.value })}
            placeholder={contentType === 'blog' ? 'Write your blog post content...' : 'Write the answer to this question...'}
          />
        </FormGroup>

        {/* SEO/AEO Section */}
        <div style={{ marginTop: '24px', padding: '20px', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <h4 style={{ margin: '0 0 16px', fontSize: '14px', fontWeight: 600, color: '#0F172A' }}>
            SEO & AEO Settings
          </h4>

          <FormGroup>
            <FormLabel>AI Summary (for AI citation)</FormLabel>
            <FormTextArea
              value={editingContent?.ai_summary || ''}
              onChange={(e) => setEditingContent({ ...editingContent, ai_summary: e.target.value })}
              placeholder="2-3 sentence summary that AI assistants will use to cite this content. Be concise and include key facts."
              rows={3}
              maxLength={500}
            />
            <small style={{ color: '#64748B', fontSize: '12px' }}>{(editingContent?.ai_summary || '').length}/500 characters</small>
          </FormGroup>

          {contentType === 'blog' && (
            <>
              <FormRow>
                <FormGroup>
                  <FormLabel>SEO Title (max 70 chars)</FormLabel>
                  <FormInput
                    type="text"
                    value={editingContent?.seo_title || ''}
                    onChange={(e) => setEditingContent({ ...editingContent, seo_title: e.target.value })}
                    placeholder="Custom title for search results"
                    maxLength={70}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>OG Image URL</FormLabel>
                  <FormInput
                    type="text"
                    value={editingContent?.og_image_url || ''}
                    onChange={(e) => setEditingContent({ ...editingContent, og_image_url: e.target.value })}
                    placeholder="Image URL for social sharing"
                  />
                </FormGroup>
              </FormRow>

              <FormGroup>
                <FormLabel>SEO Description (max 160 chars)</FormLabel>
                <FormTextArea
                  value={editingContent?.seo_description || ''}
                  onChange={(e) => setEditingContent({ ...editingContent, seo_description: e.target.value })}
                  placeholder="Description for search results"
                  rows={2}
                  maxLength={160}
                />
                <small style={{ color: '#64748B', fontSize: '12px' }}>{(editingContent?.seo_description || '').length}/160 characters</small>
              </FormGroup>

              <FormGroup>
                <FormLabel>SEO Keywords (comma separated)</FormLabel>
                <FormInput
                  type="text"
                  value={editingContent?.seo_keywords || ''}
                  onChange={(e) => setEditingContent({ ...editingContent, seo_keywords: e.target.value })}
                  placeholder="keyword1, keyword2, keyword3"
                />
              </FormGroup>
            </>
          )}
        </div>
      </EditorForm>
    </EditorWrapper>
  );

  // Render Categories View
  const renderCategories = () => (
    <>
      <FilterBarWithButton>
        <SearchInput
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ maxWidth: '300px' }}
        />
        <div style={{ marginLeft: 'auto' }}>
          <ThemedButton onClick={() => { setEditingCategory({ type: contentType as 'blog' | 'faq' }); setShowCategoryModal(true); }}>
            Add Category
          </ThemedButton>
        </div>
      </FilterBarWithButton>

      <CategoryGrid>
        {categories.length === 0 ? (
          <EmptyState>
            <h3>No categories yet</h3>
            <p>Create your first category to organize your {contentType === 'blog' ? 'blog posts' : 'FAQ items'}</p>
            <ThemedButton onClick={() => { setEditingCategory({ type: contentType as 'blog' | 'faq' }); setShowCategoryModal(true); }}>
              Add Category
            </ThemedButton>
          </EmptyState>
        ) : (
          categories
            .filter(cat => !searchTerm || cat.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map(cat => (
            <CategoryCard key={cat.id} isActive={cat.is_active}>
              <CategoryIcon>{cat.icon || '📁'}</CategoryIcon>
              <CategoryInfo>
                <CategoryName>{cat.name}</CategoryName>
                <CategoryMeta>
                  {cat.content_count} {contentType === 'blog' ? 'posts' : 'items'} • {cat.description || 'No description'}
                </CategoryMeta>
              </CategoryInfo>
              <CategoryActions>
                <IconButton onClick={() => { setEditingCategory(cat); setShowCategoryModal(true); }}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </IconButton>
                <IconButton onClick={() => handleDeleteCategory(cat.id)}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </IconButton>
              </CategoryActions>
            </CategoryCard>
          ))
        )}
      </CategoryGrid>
    </>
  );

  // Render Contents View
  const renderContents = () => (
    <>
      <StatsGrid>
        <StatCard>
          <StatValue>{stats.total}</StatValue>
          <StatLabel>Total {contentType === 'blog' ? 'Posts' : 'FAQs'}</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{stats.published}</StatValue>
          <StatLabel>Published</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{stats.draft}</StatValue>
          <StatLabel>Drafts</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{stats.categories}</StatValue>
          <StatLabel>Categories</StatLabel>
        </StatCard>
      </StatsGrid>

      <FilterBarWithButton>
        <SearchInput
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FilterSelect value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </FilterSelect>
        <FilterSelect value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </FilterSelect>
        <div style={{ marginLeft: 'auto' }}>
          <ThemedButton onClick={() => { setEditingContent({ type: contentType as 'blog' | 'faq' }); setIsEditing(true); }}>
            New {contentType === 'blog' ? 'Post' : 'FAQ'}
          </ThemedButton>
        </div>
      </FilterBarWithButton>

      {isEditing ? (
        renderEditor()
      ) : filteredContents.length === 0 ? (
        <EmptyState>
          <h3>No content yet</h3>
          <p>Create your first {contentType === 'blog' ? 'blog post' : 'FAQ item'}</p>
          <ThemedButton onClick={() => { setEditingContent({ type: contentType as 'blog' | 'faq' }); setIsEditing(true); }}>
            New {contentType === 'blog' ? 'Post' : 'FAQ'}
          </ThemedButton>
        </EmptyState>
      ) : (
        <Table>
          <TableHeader columns="2fr 1fr 1fr 1fr 120px">
            <span>Title</span>
            <span>Category</span>
            <span>Status</span>
            <span>Date</span>
            <span>Actions</span>
          </TableHeader>
          {filteredContents.map(item => (
            <TableRow key={item.id} columns="2fr 1fr 1fr 1fr 120px">
              <div>
                <strong>{item.title}</strong>
                {contentType === 'blog' && item.view_count > 0 && (
                  <span style={{ fontSize: '12px', color: '#6B7280', marginLeft: '8px' }}>
                    {item.view_count} views
                  </span>
                )}
              </div>
              <div>{item.category?.icon} {item.category?.name}</div>
              <div>
                <StatusBadge status={item.status}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </StatusBadge>
              </div>
              <div>{new Date(item.updated_at).toLocaleDateString()}</div>
              <ActionButtons>
                <ActionButton onClick={() => { setEditingContent(item); setIsEditing(true); }}>
                  Edit
                </ActionButton>
                <ActionButton onClick={() => handleTogglePublish(item)}>
                  {item.status === 'published' ? 'Unpublish' : 'Publish'}
                </ActionButton>
                <ActionButton onClick={() => handleDeleteContent(item.id)} className="danger">
                  Delete
                </ActionButton>
              </ActionButtons>
            </TableRow>
          ))}
        </Table>
      )}
    </>
  );

  return (
    <MainLayout>
      <Container>
        <Header>
          <Title>Content</Title>
        </Header>

        {successMessage && (
          <div style={{ background: '#ECFDF5', color: '#059669', padding: '12px 16px', borderRadius: '8px', marginBottom: '16px' }}>
            {successMessage}
          </div>
        )}

        <Content>
          <TabContainer>
            <Tab active={activeTab === 'blog'} onClick={() => handleTabChange('blog')}>
              Blog
            </Tab>
            <Tab active={activeTab === 'blog-categories'} onClick={() => handleTabChange('blog-categories')}>
              Blog Categories
            </Tab>
            <Tab active={activeTab === 'faq'} onClick={() => handleTabChange('faq')}>
              FAQ
            </Tab>
            <Tab active={activeTab === 'faq-categories'} onClick={() => handleTabChange('faq-categories')}>
              FAQ Categories
            </Tab>
          </TabContainer>

          {isCategory ? renderCategories() : renderContents()}
        </Content>
      </Container>

      {/* Category Modal */}
      <Modal
        isOpen={showCategoryModal}
        onClose={() => { setShowCategoryModal(false); setEditingCategory(null); }}
        title={editingCategory?.id ? 'Edit Category' : 'New Category'}
        footer={
          <>
            <ModalButton variant="secondary" onClick={() => { setShowCategoryModal(false); setEditingCategory(null); }}>
              Cancel
            </ModalButton>
            <ModalButton onClick={handleSaveCategory}>
              {editingCategory?.id ? 'Update' : 'Create'}
            </ModalButton>
          </>
        }
      >
        <FormGroup>
          <FormLabel>Name *</FormLabel>
          <FormInput
            value={editingCategory?.name || ''}
            onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
            placeholder="Category name"
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Icon (emoji)</FormLabel>
          <FormInput
            value={editingCategory?.icon || ''}
            onChange={(e) => setEditingCategory({ ...editingCategory, icon: e.target.value })}
            placeholder="e.g. 📚"
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Description</FormLabel>
          <FormTextArea
            value={editingCategory?.description || ''}
            onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
            placeholder="Brief description"
            rows={3}
          />
        </FormGroup>
      </Modal>

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.show}
        title={confirmDialog.title}
        message={confirmDialog.message}
        onConfirm={confirmDialog.onConfirm}
        onClose={() => setConfirmDialog({ ...confirmDialog, show: false })}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />
    </MainLayout>
  );
};

export default ContentManagementPage;
