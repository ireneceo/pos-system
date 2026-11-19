import React, { useState, useEffect } from 'react';
import ConfirmModal from '../../components/ConfirmModal';
import styled from 'styled-components';
import { EmptyState } from '../../components/UI/TableComponents';
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
  ActionButtons,
  ActionButton
} from '../../components/UI';
import { DataTable, DataTableHead, DataTableHeaderCell, DataTableRow, DataTableCell, DataTableEmpty, DataTableScroll } from '../../components/UI/DataTable';
import { Tabs, Tab } from '../../components/Common/TabComponents';
import { useTabParam } from '../../hooks/useTabParam';
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import { useTranslation } from 'react-i18next';

import { getAuthToken } from '../../utils/auth';
import { formatDate as formatDateTz } from '../../utils/timezone';
import { statusLabel } from '../../utils/statusLabel';
interface ContentCategory {
  id: number;
  type: 'blog' | 'faq' | 'docs';
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
  type: 'blog' | 'faq' | 'docs';
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
  background: #F1F4F8;
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
  color: #4B5563;
`;

const CategoryActions = styled.div`
  display: flex;
  gap: 8px;
`;

const IconButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid #C7CED6;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #F9FAFB;
    border-color: #6B7280;
  }

  svg {
    width: 18px;
    height: 18px;
    color: #4B5563;
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
  border-bottom: 1px solid #C7CED6;
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
  border: 1px solid #C7CED6;
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
  border: 2px dashed #C7CED6;
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
    color: #4B5563;
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
  const { t } = useTranslation('admin');
  const [activeTab, setTabParam] = useTabParam<'blog' | 'blog-categories' | 'faq' | 'faq-categories' | 'docs' | 'docs-categories'>('blog');
  const [categories, setCategories] = useState<ContentCategory[]>([]);
  const [infoModal, setInfoModal] = useState<{ open: boolean; title: string; message: string }>({ open: false, title: '', message: '' });
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [, setLoading] = useState(true);
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
  // 'docs' = 안내 문서(2026-10-04) — 글 모양은 블로그와 같다(제목·주소·요약·본문), 공개 주소는 /docs
  const getContentType = () => activeTab.includes('docs') ? 'docs' : activeTab.includes('blog') ? 'blog' : 'faq';
  const isCategory = activeTab.includes('categories');

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    const type = getContentType();
    try {
      const token = getAuthToken();
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

  const handleTabChange = (tab: 'blog' | 'blog-categories' | 'faq' | 'faq-categories' | 'docs' | 'docs-categories') => {
    setTabParam(tab);
    setIsEditing(false);
    setEditingContent(null);
  };

  const handleSaveCategory = async () => {
    if (!editingCategory?.name) return;

    try {
      const token = getAuthToken();
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
        setSuccessMessage(isNew ? t('admin:ui.content.catCreated', 'Category created successfully') : t('admin:ui.content.catUpdated', 'Category updated successfully'));
        setShowCategoryModal(false);
        setEditingCategory(null);
        fetchData();
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        const error = await response.json();
        setInfoModal({ open: true, title: t('admin:ui.content.saveFailed', 'Save Failed'), message: error.error || t('admin:ui.content.catSaveFailed', 'Failed to save category. Please try again.') });
      }
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    setConfirmDialog({
      show: true,
      title: t('admin:ui.content.deleteCategory', 'Delete Category'),
      message: t('admin:ui.content.deleteCategoryQ', 'Are you sure you want to delete this category? This action cannot be undone.'),
      onConfirm: async () => {
        try {
          const token = getAuthToken();
          const response = await fetch(`/api/contents/categories/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
          });

          if (response.ok) {
            setSuccessMessage(t('admin:ui.content.catDeleted', 'Category deleted successfully'));
            fetchData();
            setTimeout(() => setSuccessMessage(''), 3000);
          } else {
            const error = await response.json();
            setInfoModal({ open: true, title: t('admin:ui.content.deleteFailed', 'Delete Failed'), message: error.error || t('admin:ui.content.catDeleteFailed', 'Failed to delete category. Please try again.') });
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
      setInfoModal({ open: true, title: t('admin:ui.content.requiredFields', 'Required Fields'), message: t('admin:ui.content.fillRequired', 'Please fill in all required fields.') });
      return;
    }

    try {
      const token = getAuthToken();
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
        setSuccessMessage(isNew ? t('admin:ui.content.contentCreated', 'Content created successfully') : t('admin:ui.content.contentUpdated', 'Content updated successfully'));
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
      title: t('admin:ui.content.deleteContent', 'Delete Content'),
      message: t('admin:ui.content.deleteContentQ', 'Are you sure you want to delete this content? This action cannot be undone.'),
      onConfirm: async () => {
        try {
          const token = getAuthToken();
          await fetch(`/api/contents/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
          });
          setSuccessMessage(t('admin:ui.content.contentDeleted', 'Content deleted successfully'));
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
      const token = getAuthToken();
      const newStatus = item.status === 'published' ? 'draft' : 'published';

      await fetch(`/api/contents/${item.id}/${newStatus === 'published' ? 'publish' : 'unpublish'}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      setSuccessMessage(newStatus === 'published' ? t('admin:ui.content.contentPublished', 'Content published') : t('admin:ui.content.contentUnpublished', 'Content unpublished'));
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
          {editingContent?.id ? t('common:button.edit', 'Edit') : t('admin:ui.content.new', 'New')} {contentType === 'docs' ? t('admin:ui.content.doc', 'Doc') : contentType !== 'faq' ? t('admin:ui.content.blogPost', 'Blog Post') : t('admin:ui.content.faqItem', 'FAQ Item')}
        </EditorTitle>
        <EditorActions>
          <ThemedButton variant="secondary" onClick={() => { setIsEditing(false); setEditingContent(null); }}>
            {t('common:button.cancel', 'Cancel')}
          </ThemedButton>
          <ThemedButton variant="secondary" onClick={() => { setEditingContent({ ...editingContent, status: 'draft' }); handleSaveContent(); }}>
            {t('admin:ui.content.saveDraft', 'Save as Draft')}
          </ThemedButton>
          <ThemedButton onClick={() => { setEditingContent({ ...editingContent, status: 'published' }); handleSaveContent(); }}>
            {t('admin:ui.content.publish', 'Publish')}
          </ThemedButton>
        </EditorActions>
      </EditorHeader>

      <EditorForm>
        <FormRow>
          <FormGroup>
            <FormLabel>{t('admin:contentManagementPage.title', 'Title')} *</FormLabel>
            <FormInput
              value={editingContent?.title || ''}
              onChange={(e) => setEditingContent({ ...editingContent, title: e.target.value })}
              placeholder={contentType !== 'faq' ? t('admin:ui.content.titlePh', 'Enter post title') : t('admin:ui.content.questionPh', 'Enter question')}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>{t('admin:contentManagementPage.category', 'Category')} *</FormLabel>
            <FilterSelect
              value={editingContent?.category_id?.toString() || ''}
              onChange={(e) => setEditingContent({ ...editingContent, category_id: parseInt(e.target.value) })}
            >
              <option value="">{t('admin:contentManagementPage.selectCategory')}</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
              ))}
            </FilterSelect>
          </FormGroup>
        </FormRow>

        {contentType !== 'faq' && (
          <FormRow>
            <FormGroup>
              <FormLabel>{t('admin:contentManagementPage.excerpt')}</FormLabel>
              <FormTextArea
                value={editingContent?.excerpt || ''}
                onChange={(e) => setEditingContent({ ...editingContent, excerpt: e.target.value })}
                placeholder={t('admin:ui.content.excerptPh', 'Brief summary for the blog card')}
                rows={3}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>{t('admin:contentManagementPage.thumbnail')}</FormLabel>
              <ThumbnailUpload>
                {editingContent?.thumbnail_url ? (
                  <img src={editingContent.thumbnail_url} alt="Thumbnail" />
                ) : (
                  <p>{t('admin:contentManagementPage.clickToUploadThumbnailImage')}</p>
                )}
                <FormInput
                  type="text"
                  value={editingContent?.thumbnail_url || ''}
                  onChange={(e) => setEditingContent({ ...editingContent, thumbnail_url: e.target.value })}
                  placeholder={t('admin:ui.content.imageUrlPh', 'Enter image URL')}
                  style={{ marginTop: '12px' }}
                />
              </ThumbnailUpload>
            </FormGroup>
          </FormRow>
        )}

        <FormGroup>
          <FormLabel>{contentType !== 'faq' ? `${t('admin:contentManagementPage.content', 'Content')} *` : `${t('admin:ui.content.answer', 'Answer')} *`}</FormLabel>
          <RichTextEditor
            value={editingContent?.content || ''}
            onChange={(e) => setEditingContent({ ...editingContent, content: e.target.value })}
            placeholder={contentType !== 'faq' ? t('admin:ui.content.bodyPh', 'Write your blog post content...') : t('admin:ui.content.answerPh', 'Write the answer to this question...')}
          />
        </FormGroup>

        {/* SEO/AEO Section */}
        <div style={{ marginTop: '24px', padding: '20px', background: '#F1F4F8', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <h4 style={{ margin: '0 0 16px', fontSize: '14px', fontWeight: 600, color: '#0F172A' }}>
            {t('admin:ui.content.seoSettings', 'SEO & AEO Settings')}
          </h4>

          <FormGroup>
            <FormLabel>{t('admin:contentManagementPage.aiSummaryForAiCitation')}</FormLabel>
            <FormTextArea
              value={editingContent?.ai_summary || ''}
              onChange={(e) => setEditingContent({ ...editingContent, ai_summary: e.target.value })}
              placeholder={t('admin:ui.content.aiSummaryPh', '2-3 sentence summary that AI assistants will use to cite this content. Be concise and include key facts.')}
              rows={3}
              maxLength={500}
            />
            <small style={{ color: '#475569', fontSize: '12px' }}>{(editingContent?.ai_summary || '').length}/500 {t('admin:ui.content.chars', 'characters')}</small>
          </FormGroup>

          {contentType !== 'faq' && (
            <>
              <FormRow>
                <FormGroup>
                  <FormLabel>{t('admin:contentManagementPage.seoTitleMax70Chars')}</FormLabel>
                  <FormInput
                    type="text"
                    value={editingContent?.seo_title || ''}
                    onChange={(e) => setEditingContent({ ...editingContent, seo_title: e.target.value })}
                    placeholder={t('admin:ui.content.seoTitlePh', 'Custom title for search results')}
                    maxLength={70}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>{t('admin:contentManagementPage.ogImageUrl')}</FormLabel>
                  <FormInput
                    type="text"
                    value={editingContent?.og_image_url || ''}
                    onChange={(e) => setEditingContent({ ...editingContent, og_image_url: e.target.value })}
                    placeholder={t('admin:ui.content.ogPh', 'Image URL for social sharing')}
                  />
                </FormGroup>
              </FormRow>

              <FormGroup>
                <FormLabel>{t('admin:contentManagementPage.seoDescriptionMax160Chars')}</FormLabel>
                <FormTextArea
                  value={editingContent?.seo_description || ''}
                  onChange={(e) => setEditingContent({ ...editingContent, seo_description: e.target.value })}
                  placeholder={t('admin:ui.content.seoDescPh', 'Description for search results')}
                  rows={2}
                  maxLength={160}
                />
                <small style={{ color: '#475569', fontSize: '12px' }}>{(editingContent?.seo_description || '').length}/160 {t('admin:ui.content.chars', 'characters')}</small>
              </FormGroup>

              <FormGroup>
                <FormLabel>{t('admin:contentManagementPage.seoKeywordsCommaSeparated')}</FormLabel>
                <FormInput
                  type="text"
                  value={editingContent?.seo_keywords || ''}
                  onChange={(e) => setEditingContent({ ...editingContent, seo_keywords: e.target.value })}
                  placeholder={t('admin:ui.content.keywordsPh', 'keyword1, keyword2, keyword3')}
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
          placeholder={t('admin:ui.content.searchCategoriesPh', 'Search categories...')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ maxWidth: '300px' }}
        />
        <div style={{ marginLeft: 'auto' }}>
          <ThemedButton onClick={() => { setEditingCategory({ type: contentType as 'blog' | 'faq' | 'docs' }); setShowCategoryModal(true); }}>
            {t('admin:ui.content.addCategory', 'Add Category')}
          </ThemedButton>
        </div>
      </FilterBarWithButton>

      <CategoryGrid>
        {categories.length === 0 ? (
          <EmptyState>
            <h3>{t('admin:contentManagementPage.noCategoriesYet')}</h3>
            <p>{contentType !== 'faq' ? t('admin:ui.content.firstCategoryBlog', 'Create your first category to organize your blog posts') : t('admin:ui.content.firstCategoryFaq', 'Create your first category to organize your FAQ items')}</p>
            <ThemedButton onClick={() => { setEditingCategory({ type: contentType as 'blog' | 'faq' | 'docs' }); setShowCategoryModal(true); }}>
              {t('admin:ui.content.addCategory', 'Add Category')}
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
                  {cat.content_count} {contentType !== 'faq' ? t('admin:ui.content.posts', 'posts') : t('admin:ui.content.items', 'items')} • {cat.description || t('admin:ui.content.noDescription', 'No description')}
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
          <StatLabel>{contentType !== 'faq' ? t('admin:ui.content.totalPosts', 'Total Posts') : t('admin:ui.content.totalFaqs', 'Total FAQs')}</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{stats.published}</StatValue>
          <StatLabel>{t('admin:contentManagementPage.published')}</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{stats.draft}</StatValue>
          <StatLabel>{t('admin:contentManagementPage.drafts')}</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{stats.categories}</StatValue>
          <StatLabel>{t('admin:contentManagementPage.categories')}</StatLabel>
        </StatCard>
      </StatsGrid>

      <FilterBarWithButton>
        <FilterSelect value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">{t('admin:contentManagementPage.allStatus')}</option>
          <option value="published">{t('admin:contentManagementPage.published')}</option>
          <option value="draft">{t('admin:contentManagementPage.draft')}</option>
        </FilterSelect>
        <FilterSelect value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="all">{t('admin:contentManagementPage.allCategories')}</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </FilterSelect>
        <SearchInput
          type="text"
          placeholder={t('admin:ui.content.searchPh', 'Search...')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div style={{ marginLeft: 'auto' }}>
          <ThemedButton onClick={() => { setEditingContent({ type: contentType as 'blog' | 'faq' | 'docs' }); setIsEditing(true); }}>
            {contentType !== 'faq' ? t('admin:ui.content.newPost', 'New Post') : t('admin:ui.content.newFaq', 'New FAQ')}
          </ThemedButton>
        </div>
      </FilterBarWithButton>

      {isEditing ? (
        renderEditor()
      ) : filteredContents.length === 0 ? (
        <EmptyState>
          <h3>{t('admin:contentManagementPage.noContentYet')}</h3>
          <p>{contentType !== 'faq' ? t('admin:ui.content.firstPost', 'Create your first blog post') : t('admin:ui.content.firstFaq', 'Create your first FAQ item')}</p>
          <ThemedButton onClick={() => { setEditingContent({ type: contentType as 'blog' | 'faq' | 'docs' }); setIsEditing(true); }}>
            {contentType !== 'faq' ? t('admin:ui.content.newPost', 'New Post') : t('admin:ui.content.newFaq', 'New FAQ')}
          </ThemedButton>
        </EmptyState>
      ) : (
        <DataTableScroll>
        <DataTable>
          <DataTableHead>
            <tr>
              <DataTableHeaderCell align="left">{t('admin:contentManagementPage.title')}</DataTableHeaderCell>
              <DataTableHeaderCell align="left">{t('admin:contentManagementPage.category')}</DataTableHeaderCell>
              <DataTableHeaderCell align="left">{t('admin:contentManagementPage.status')}</DataTableHeaderCell>
              <DataTableHeaderCell align="left">{t('admin:contentManagementPage.date')}</DataTableHeaderCell>
              <DataTableHeaderCell align="left">{t('admin:contentManagementPage.actions')}</DataTableHeaderCell>
            </tr>
          </DataTableHead>
          <tbody>
            {filteredContents.map(item => (
              <DataTableRow key={item.id}>
                <DataTableCell data-label={t('admin:contentManagementPage.title')}>
                  <strong>{item.title}</strong>
                  {contentType === 'blog' && item.view_count > 0 && (
                    <span style={{ fontSize: '12px', color: '#4B5563', marginLeft: '8px' }}>
                      {item.view_count} {t('admin:ui.content.views', 'views')}
                    </span>
                  )}
                </DataTableCell>
                <DataTableCell data-label={t('admin:contentManagementPage.category')}>{item.category?.icon} {item.category?.name}</DataTableCell>
                <DataTableCell data-label={t('admin:contentManagementPage.status')}>
                  <StatusBadge status={item.status}>
                    {item.status === 'published' ? t('admin:contentManagementPage.published', 'Published') : item.status === 'draft' ? t('admin:contentManagementPage.draft', 'Draft') : statusLabel(t, item.status)}
                  </StatusBadge>
                </DataTableCell>
                <DataTableCell data-label={t('admin:contentManagementPage.date')}>{formatDateTz(item.updated_at, null)}</DataTableCell>
                <DataTableCell data-label={t('admin:contentManagementPage.actions')} mobileFullWidth>
                  <ActionButtons>
                    <ActionButton onClick={() => { setEditingContent(item); setIsEditing(true); }}>
                      {t('common:button.edit', 'Edit')}
                    </ActionButton>
                    <ActionButton onClick={() => handleTogglePublish(item)}>
                      {item.status === 'published' ? t('admin:ui.content.unpublish', 'Unpublish') : t('admin:ui.content.publish', 'Publish')}
                    </ActionButton>
                    <ActionButton onClick={() => handleDeleteContent(item.id)} className="danger">
                      {t('common:button.delete', 'Delete')}
                    </ActionButton>
                  </ActionButtons>
                </DataTableCell>
              </DataTableRow>
            ))}
          </tbody>
        </DataTable>
        </DataTableScroll>
      )}
    </>
  );
  return (
    <>
      <Container>
        <Header>
          <Title>{t('admin:contentManagementPage.content')}</Title>
        </Header>

        {successMessage && (
          <div style={{ background: '#ECFDF5', color: '#059669', padding: '12px 16px', borderRadius: '8px', marginBottom: '16px' }}>
            {successMessage}
          </div>
        )}

        <Content>
          <Tabs>
            <Tab active={activeTab === 'blog'} onClick={() => handleTabChange('blog')}>
              Blog
            </Tab>
            <Tab active={activeTab === 'blog-categories'} onClick={() => handleTabChange('blog-categories')}>
              {t('admin:ui.content.blogCategories', 'Blog Categories')}
            </Tab>
            <Tab active={activeTab === 'faq'} onClick={() => handleTabChange('faq')}>
              FAQ
            </Tab>
            <Tab active={activeTab === 'faq-categories'} onClick={() => handleTabChange('faq-categories')}>
              {t('admin:ui.content.faqCategories', 'FAQ Categories')}
            </Tab>
            <Tab active={activeTab === 'docs'} onClick={() => handleTabChange('docs')}>
              {t('admin:ui.content.docs', 'Docs')}
            </Tab>
            <Tab active={activeTab === 'docs-categories'} onClick={() => handleTabChange('docs-categories')}>
              {t('admin:ui.content.docsCategories', 'Docs Categories')}
            </Tab>
          </Tabs>

          {isCategory ? renderCategories() : renderContents()}
        </Content>
      </Container>

      {/* Category Modal */}
      <Modal
        isOpen={showCategoryModal}
        onClose={() => { setShowCategoryModal(false); setEditingCategory(null); }}
        title={editingCategory?.id ? t('admin:ui.content.editCategory', 'Edit Category') : t('admin:ui.content.newCategory', 'New Category')}
        footer={
          <>
            <ModalButton variant="secondary" onClick={() => { setShowCategoryModal(false); setEditingCategory(null); }}>
              {t('common:button.cancel', 'Cancel')}
            </ModalButton>
            <ModalButton onClick={handleSaveCategory}>
              {editingCategory?.id ? t('common:button.update', 'Update') : t('common:button.create', 'Create')}
            </ModalButton>
          </>
        }
      >
        <FormGroup>
          <FormLabel>{t('admin:ui.content.name', 'Name')} *</FormLabel>
          <FormInput
            value={editingCategory?.name || ''}
            onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
            placeholder={t('admin:ui.content.categoryNamePh', 'Category name')}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>{t('admin:contentManagementPage.iconEmoji')}</FormLabel>
          <FormInput
            value={editingCategory?.icon || ''}
            onChange={(e) => setEditingCategory({ ...editingCategory, icon: e.target.value })}
            placeholder={t('admin:ui.content.iconPh', 'e.g. 📚')}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>{t('admin:contentManagementPage.description')}</FormLabel>
          <FormTextArea
            value={editingCategory?.description || ''}
            onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
            placeholder={t('admin:ui.content.descPh', 'Brief description')}
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
        confirmText={t('common:button.delete', 'Delete')}
        cancelText={t('common:button.cancel', 'Cancel')}
        variant="danger"
      />
      <ConfirmModal
        isOpen={infoModal.open}
        title={infoModal.title}
        message={infoModal.message}
        onConfirm={() => setInfoModal({ open: false, title: '', message: '' })}
        onCancel={() => setInfoModal({ open: false, title: '', message: '' })}
        confirmText="OK"
        type="info"
        singleButton
      />
    </>
  );
};

export default ContentManagementPage;
