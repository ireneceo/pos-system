import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { EmptyState } from '../../components/UI/TableComponents';
import { LandingLayout } from '../../components/Landing';
import SEOHead, { generateItemListSchema, generateBreadcrumbSchema } from '../../components/Common/SEOHead';
import { useTranslation } from 'react-i18next';
import { useSiteTimezone, formatDateInSiteTz } from '../../hooks/useSiteTimezone';

interface NewsCategory {
  id: number;
  name: string;
  slug: string;
  icon: string | null;
}

interface NewsPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  thumbnail_url: string | null;
  published_at: string | null;
  view_count: number;
  author_name: string | null;
  category?: NewsCategory;
}

const PageContainer = styled.div`
  background: #FAFBFC;
`;

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 40px 20px;
  min-height: 160px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;

  @media (max-width: 768px) {
    padding: 32px 20px;
    min-height: 140px;
  }
`;

const HeroTitle = styled.h1`
  font-size: 36px;
  font-weight: 700;
  color: white;
  margin: 0;
  line-height: 1.2;
  word-break: keep-all;
  overflow-wrap: break-word;

  @media (max-width: 768px) {
    font-size: 28px;
    padding: 0 8px;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 16px;
  opacity: 0.9;
  max-width: 600px;
  margin: 6px auto 0;
  line-height: 1.5;
  word-break: keep-all;
  overflow-wrap: break-word;

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 0 8px;
  }
`;

const ContentSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

const CategoryTabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
`;

const CategoryTab = styled.button<{ active?: boolean }>`
  padding: 12px 24px;
  border: 2px solid ${props => props.active ? '#635BFF' : '#E5E7EB'};
  background: ${props => props.active ? '#635BFF' : 'white'};
  color: ${props => props.active ? 'white' : '#425466'};
  border-radius: 50px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    border-color: #635BFF;
    ${props => !props.active && 'background: #F8F9FF;'}
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 13px;
  }
`;

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const NewsCard = styled.article`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
`;

const NewsThumbnail = styled.div<{ hasImage?: boolean }>`
  width: 100%;
  height: 200px;
  background: ${props => props.hasImage ? 'transparent' : 'linear-gradient(135deg, #F8F9FA 0%, #E9ECEF 50%, #DEE2E6 100%)'};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  span {
    font-size: 48px;
  }
`;

const NewsContent = styled.div`
  padding: 24px;
`;

const NewsMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`;

const CategoryBadge = styled.span`
  display: inline-block;
  padding: 4px 10px;
  background: #F0EFFF;
  color: #635BFF;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
`;

const NewsDate = styled.span`
  font-size: 13px;
  color: #6B7280;
`;

const NewsTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #0A2540;
  margin: 0 0 12px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const NewsExcerpt = styled.p`
  font-size: 14px;
  color: #425466;
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ReadMoreLink = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: 16px;
  font-size: 14px;
  font-weight: 600;
  color: #635BFF;

  svg {
    width: 16px;
    height: 16px;
    transition: transform 0.2s;
  }

  ${NewsCard}:hover & svg {
    transform: translateX(4px);
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 48px;
`;

const PageButton = styled.button<{ active?: boolean }>`
  width: 40px;
  height: 40px;
  border: 1px solid ${props => props.active ? '#635BFF' : '#E5E7EB'};
  background: ${props => props.active ? '#635BFF' : 'white'};
  color: ${props => props.active ? 'white' : '#425466'};
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #635BFF;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 60px;
  color: #6B7280;
  grid-column: 1 / -1;
`;

const NewsPage: React.FC = () => {
  const { t, i18n } = useTranslation('landing');
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState<NewsCategory[]>([]);
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 12,
    totalPages: 1
  });

  useEffect(() => {
    const category = searchParams.get('category');
    const page = searchParams.get('page');
    if (category) setActiveCategory(category);
    if (page) setPagination(prev => ({ ...prev, page: parseInt(page) }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory, pagination.page, i18n.language]);

  useEffect(() => {
    const params: Record<string, string> = {};
    if (activeCategory !== 'all') params.category = activeCategory;
    if (pagination.page > 1) params.page = pagination.page.toString();
    setSearchParams(params);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory, pagination.page]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const categoryParam = activeCategory !== 'all' ? `&category=${activeCategory}` : '';
      const lang = (i18n.language || 'en').split('-')[0];
      const response = await fetch(`/api/contents/public/news?page=${pagination.page}&limit=${pagination.limit}&lang=${encodeURIComponent(lang)}${categoryParam}`);
      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories || []);
        setPosts(data.items || []);
        setPagination(data.pagination || pagination);
      }
    } catch (error) {
      console.error('Error fetching news posts:', error);
    }
    setLoading(false);
  };

  const siteTimezone = useSiteTimezone();
  const formatDate = (dateStr: string | null) => formatDateInSiteTz(dateStr, siteTimezone);

  const newsListSchema = useMemo(() => {
    if (posts.length === 0) return null;
    return generateItemListSchema(
      posts.map((post, index) => ({
        name: post.title,
        url: `https://purplehere.com/news/${post.slug}`,
        position: index + 1
      }))
    );
  }, [posts]);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://purplehere.com' },
    { name: 'News', url: 'https://purplehere.com/news' }
  ]);

  const handleCategoryChange = (slug: string) => {
    setActiveCategory(slug);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  return (
    <LandingLayout>
      <SEOHead
        title={t('newsPage.seoTitle', 'News - Product Updates & Announcements')}
        description={t('newsPage.seoDescription', 'Latest product news, release notes, and announcements from PurpleHere POS.')}
        keywords="purplehere news, pos updates, release notes, product news"
        canonicalUrl="https://purplehere.com/news"
        jsonLd={newsListSchema ? [newsListSchema, breadcrumbSchema] : [breadcrumbSchema]}
      />
      <PageContainer>
        <HeroSection>
          <HeroTitle>{t('newsPage.news', 'News')}</HeroTitle>
          <HeroSubtitle>
            {t('newsPage.subtitle', 'Product updates, release notes, and latest announcements')}
          </HeroSubtitle>
        </HeroSection>

        <ContentSection>
          <CategoryTabs>
            <CategoryTab
              active={activeCategory === 'all'}
              onClick={() => handleCategoryChange('all')}
            >
              {t('newsPage.all', 'All')}
            </CategoryTab>
            {categories.map(cat => (
              <CategoryTab
                key={cat.id}
                active={activeCategory === cat.slug}
                onClick={() => handleCategoryChange(cat.slug)}
              >
                {cat.name}
              </CategoryTab>
            ))}
          </CategoryTabs>

          <NewsGrid>
            {loading ? (
              <LoadingSpinner>{t('newsPage.loading', 'Loading...')}</LoadingSpinner>
            ) : posts.length === 0 ? (
              <EmptyState>
                <h3>{t('newsPage.noPostsFound', 'No news posts found')}</h3>
                <p>{t('newsPage.checkBackLater', 'Check back later for new updates')}</p>
              </EmptyState>
            ) : (
              posts.map(post => (
                <NewsCard key={post.id} onClick={() => navigate(`/news/${post.slug}`)}>
                  <NewsThumbnail hasImage={!!post.thumbnail_url}>
                    {post.thumbnail_url ? (
                      <img src={post.thumbnail_url} alt={post.title} />
                    ) : (
                      <span>{post.category?.icon || '📢'}</span>
                    )}
                  </NewsThumbnail>
                  <NewsContent>
                    <NewsMeta>
                      {post.category && (
                        <CategoryBadge>{post.category.name}</CategoryBadge>
                      )}
                      <NewsDate>{formatDate(post.published_at)}</NewsDate>
                    </NewsMeta>
                    <NewsTitle>{post.title}</NewsTitle>
                    <NewsExcerpt>
                      {post.excerpt || post.content.substring(0, 150).replace(/<[^>]*>/g, '')}...
                    </NewsExcerpt>
                    <ReadMoreLink>
                      {t('newsPage.readMore', 'Read more')}
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </ReadMoreLink>
                  </NewsContent>
                </NewsCard>
              ))
            )}
          </NewsGrid>

          {pagination.totalPages > 1 && (
            <Pagination>
              <PageButton
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                disabled={pagination.page <= 1}
              >
                &lt;
              </PageButton>
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => (
                <PageButton
                  key={page}
                  active={page === pagination.page}
                  onClick={() => setPagination(prev => ({ ...prev, page }))}
                >
                  {page}
                </PageButton>
              ))}
              <PageButton
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                disabled={pagination.page >= pagination.totalPages}
              >
                &gt;
              </PageButton>
            </Pagination>
          )}
        </ContentSection>
      </PageContainer>
    </LandingLayout>
  );
};

export default NewsPage;
