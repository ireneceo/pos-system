import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { EmptyState } from '../../components/UI/TableComponents';
import { LandingLayout } from '../../components/Landing';
import SEOHead, { generateItemListSchema, generateBreadcrumbSchema } from '../../components/Common/SEOHead';
import { useTranslation } from 'react-i18next';
import { useSiteTimezone, formatDateInSiteTz } from '../../hooks/useSiteTimezone';

interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  icon: string | null;
}

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  thumbnail_url: string | null;
  published_at: string | null;
  view_count: number;
  author_name: string | null;
  language?: string;
  category?: BlogCategory;
  target_persona?: string | null;
  problem_category?: string | null;
  _is_fallback?: boolean;
}

interface TagCount {
  target_persona?: string;
  problem_category?: string;
  count: number;
}

// Persona + Problem 라벨 매핑 (DB 값 → 화면 표시)
const PERSONA_LABELS: Record<string, string> = {
  restaurant_owner: 'Restaurant',
  brand_general: 'Brand',
  foodcourt_operator: 'Foodcourt',
  owner: 'Multi-restaurant Owner',
};
const PERSONA_ORDER = ['restaurant_owner', 'brand_general', 'foodcourt_operator', 'owner'];

const PROBLEM_LABELS: Record<string, string> = {
  operations: 'Operations',
  customer_experience: 'Customer Experience',
  data_decisions: 'Data & Decisions',
  management: 'Management',
  organization: 'Organization',
  automation: 'Automation',
};
const PROBLEM_ORDER = ['operations', 'customer_experience', 'data_decisions', 'management', 'organization', 'automation'];

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

/* ─── Tag-style filters (POS OptionChip pattern) ────────────────────────────
   Source: BrandProductOptionsTab.tsx OptionChip + soft hover/active.
   All tags (persona + problem) unified in a single wrapping row.
   No labels. Click = toggle. POS system visual language.
*/
const TagsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 20px;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
`;

/* Category tabs demoted to secondary filter — subtle inline text links */
const CategoryTabsMuted = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2px 4px;
  justify-content: center;
  margin-bottom: 32px;
  align-items: baseline;

  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
`;

const CategoryLinkTab = styled.button<{ active?: boolean }>`
  background: none;
  border: none;
  padding: 4px 8px;
  font-size: 13px;
  color: ${props => props.active ? '#4338CA' : '#9CA3AF'};
  font-weight: ${props => props.active ? 600 : 400};
  cursor: pointer;
  position: relative;
  transition: color 0.15s;
  font-family: inherit;

  ${props => props.active && `
    &::after {
      content: '';
      position: absolute;
      left: 8px;
      right: 8px;
      bottom: 1px;
      height: 2px;
      background: #4338CA;
      border-radius: 1px;
    }
  `}

  &:hover {
    color: #4338CA;
  }
`;

const CategoryDot = styled.span`
  color: #D6DBE0;
  font-size: 11px;
  user-select: none;
`;

/* Active colors borrowed from MenuManagementPage OptionGroupChip (POS pastel):
   background: #E0E7FF (soft indigo), text: #4338CA (deep indigo) */
const TagChip = styled.button<{ active?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 6px 12px;
  background: ${props => props.active ? '#E0E7FF' : '#F3F4F6'};
  color: ${props => props.active ? '#4338CA' : '#374151'};
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: ${props => props.active ? 600 : 500};
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  font-family: inherit;

  &:hover {
    background: ${props => props.active ? '#C7D2FE' : '#E5E7EB'};
    color: ${props => props.active ? '#4338CA' : '#1F2937'};
  }
`;

const TagChipCount = styled.span<{ active?: boolean }>`
  font-size: 11px;
  color: ${props => props.active ? '#6366F1' : '#9CA3AF'};
  font-weight: 500;
`;

const ClearFiltersButton = styled.button`
  background: none;
  border: none;
  color: #6B7280;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  padding: 6px 8px;
  margin-left: 4px;
  display: inline-flex;
  align-items: center;
  gap: 2px;

  &:hover { color: #374151; }
`;

const BlogGrid = styled.div`
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

const BlogCard = styled.article`
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

const BlogThumbnail = styled.div<{ hasImage?: boolean }>`
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

const BlogContent = styled.div`
  padding: 24px;
`;

const BlogMeta = styled.div`
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

const FallbackBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 3px 7px;
  background: #FFF7E0;
  color: #B45309;
  border: 1px solid #FBBF24;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;

const FallbackNotice = styled.div`
  background: #FFFBEB;
  border: 1px solid #FBBF24;
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 20px;
  font-size: 13px;
  color: #78350F;
  line-height: 1.5;
  display: flex;
  align-items: flex-start;
  gap: 10px;

  strong {
    display: block;
    margin-bottom: 2px;
    font-weight: 700;
  }
`;

const BlogDate = styled.span`
  font-size: 13px;
  color: #6B7280;
`;

const BlogTitle = styled.h2`
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

const BlogExcerpt = styled.p`
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

  ${BlogCard}:hover & svg {
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

const BlogPage: React.FC = () => {
  const { t, i18n } = useTranslation('landing');
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  // Lazy-init from URL to prevent an extra initial fetch.
  const [activeCategory, setActiveCategory] = useState(() => searchParams.get('category') || 'all');
  // Multi-select filters — comma-separated in URL (?personas=a,b&problems=c,d)
  const parseMulti = (s: string | null): string[] =>
    (s || '').split(',').map(x => x.trim()).filter(Boolean);
  const [activePersonas, setActivePersonas] = useState<string[]>(() =>
    parseMulti(searchParams.get('personas') || searchParams.get('persona'))
  );
  const [activeProblems, setActiveProblems] = useState<string[]>(() =>
    parseMulti(searchParams.get('problems') || searchParams.get('problem'))
  );
  const [personaTags, setPersonaTags] = useState<TagCount[]>([]);
  const [problemTags, setProblemTags] = useState<TagCount[]>([]);
  const [pagination, setPagination] = useState(() => ({
    total: 0,
    page: parseInt(searchParams.get('page') || '1') || 1,
    limit: 12,
    totalPages: 1
  }));

  useEffect(() => {
    fetchPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory, activePersonas.join(','), activeProblems.join(','), pagination.page, i18n.language]);

  useEffect(() => {
    const params: Record<string, string> = {};
    if (activeCategory !== 'all') params.category = activeCategory;
    if (activePersonas.length > 0) params.personas = activePersonas.join(',');
    if (activeProblems.length > 0) params.problems = activeProblems.join(',');
    if (pagination.page > 1) params.page = pagination.page.toString();
    setSearchParams(params);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory, activePersonas.join(','), activeProblems.join(','), pagination.page]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const categoryParam = activeCategory !== 'all' ? `&category=${activeCategory}` : '';
      const personaParam = activePersonas.length > 0 ? `&personas=${encodeURIComponent(activePersonas.join(','))}` : '';
      const problemParam = activeProblems.length > 0 ? `&problems=${encodeURIComponent(activeProblems.join(','))}` : '';
      const lang = (i18n.language || 'en').split('-')[0];
      const response = await fetch(
        `/api/contents/public/blog?page=${pagination.page}&limit=${pagination.limit}&lang=${encodeURIComponent(lang)}${categoryParam}${personaParam}${problemParam}`
      );
      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories || []);
        setPosts(data.items || []);
        setPagination(data.pagination || pagination);
        setPersonaTags(data.available_tags?.persona || []);
        setProblemTags(data.available_tags?.problem || []);
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    }
    setLoading(false);
  };

  // Helper: get count for a persona/problem (0 if missing)
  const getPersonaCount = (key: string) => personaTags.find(t => t.target_persona === key)?.count || 0;
  const getProblemCount = (key: string) => problemTags.find(t => t.problem_category === key)?.count || 0;
  const totalPersonaCount = personaTags.reduce((s, t) => s + Number(t.count || 0), 0);
  const totalProblemCount = problemTags.reduce((s, t) => s + Number(t.count || 0), 0);

  // Fallback detection
  const currentLang = (i18n.language || 'en').split('-')[0];
  const fallbackCount = posts.filter(p => p._is_fallback).length;
  const showFallbackNotice = fallbackCount > 0 && currentLang !== 'en';

  const hasActiveFilter = activePersonas.length > 0 || activeProblems.length > 0 || activeCategory !== 'all';
  const clearAllFilters = () => {
    setActiveCategory('all');
    setActivePersonas([]);
    setActiveProblems([]);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const siteTimezone = useSiteTimezone();
  const formatDate = (dateStr: string | null) => formatDateInSiteTz(dateStr, siteTimezone);

  // Generate ItemList schema for blog posts (AEO)
  const blogListSchema = useMemo(() => {
    if (posts.length === 0) return null;
    return generateItemListSchema(
      posts.map((post, index) => ({
        name: post.title,
        url: `https://purplehere.com/blog/${post.slug}`,
        position: index + 1
      }))
    );
  }, [posts]);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://purplehere.com' },
    { name: 'Blog', url: 'https://purplehere.com/blog' }
  ]);

  const handleCategoryChange = (slug: string) => {
    setActiveCategory(slug);
    setPagination(prev => ({ ...prev, page: 1 }));
  };
  const togglePersona = (key: string) => {
    setActivePersonas(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
    setPagination(prev => ({ ...prev, page: 1 }));
  };
  const toggleProblem = (key: string) => {
    setActiveProblems(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
    setPagination(prev => ({ ...prev, page: 1 }));
  };
  return (
    <LandingLayout>
      <SEOHead
        title="Blog - Restaurant Industry Insights & Tips"
        description="Read the latest articles about restaurant management, POS technology, food industry trends, and business tips from PurpleHere."
        keywords="restaurant blog, POS tips, food industry trends, restaurant management tips"
        canonicalUrl="https://purplehere.com/blog"
        jsonLd={blogListSchema ? [blogListSchema, breadcrumbSchema] : [breadcrumbSchema]}
      />
      <PageContainer>
        <HeroSection>
          <HeroTitle>{t('landing:blogPage.blog')}</HeroTitle>
          <HeroSubtitle>
            {t('landing:blogPage.stayUpdatedWithTheLatestNewsAndTipsForPu')}
          </HeroSubtitle>
        </HeroSection>

        <ContentSection>
          <CategoryTabs>
            <CategoryTab
              active={activeCategory === 'all'}
              onClick={() => handleCategoryChange('all')}
            >
              All
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

          {(totalPersonaCount > 0 || totalProblemCount > 0) && (
            <TagsRow>
              {PERSONA_ORDER.filter(k => getPersonaCount(k) > 0).map(key => {
                const isActive = activePersonas.includes(key);
                return (
                  <TagChip
                    key={'p-' + key}
                    active={isActive}
                    onClick={() => togglePersona(key)}
                  >
                    {PERSONA_LABELS[key]}
                    <TagChipCount active={isActive}>{getPersonaCount(key)}</TagChipCount>
                  </TagChip>
                );
              })}
              {PROBLEM_ORDER.filter(k => getProblemCount(k) > 0).map(key => {
                const isActive = activeProblems.includes(key);
                return (
                  <TagChip
                    key={'t-' + key}
                    active={isActive}
                    onClick={() => toggleProblem(key)}
                  >
                    {PROBLEM_LABELS[key]}
                    <TagChipCount active={isActive}>{getProblemCount(key)}</TagChipCount>
                  </TagChip>
                );
              })}
              {hasActiveFilter && (
                <ClearFiltersButton onClick={clearAllFilters}>
                  × {t('landing:blogPage.clearFilters', 'Clear')}
                </ClearFiltersButton>
              )}
            </TagsRow>
          )}

          {showFallbackNotice && (
            <FallbackNotice>
              <span style={{ fontSize: 18 }}>⚠️</span>
              <div>
                <strong>
                  {t('landing:blogPage.fallbackNoticeTitle', 'Some articles are shown in English (original)')}
                </strong>
                {t('landing:blogPage.fallbackNoticeBody', 'We\'re translating these posts. Marked with an EN badge until the translated version is available.')}
              </div>
            </FallbackNotice>
          )}

          <BlogGrid>
            {loading ? (
              <LoadingSpinner>{t('landing:blogPage.loading')}</LoadingSpinner>
            ) : posts.length === 0 ? (
              <EmptyState>
                <h3>{t('landing:blogPage.noPostsFound')}</h3>
                <p>{t('landing:blogPage.checkBackLaterForNewContent')}</p>
              </EmptyState>
            ) : (
              posts.map(post => (
                <BlogCard key={post.id} onClick={() => navigate(`/blog/${post.slug}`)}>
                  <BlogThumbnail hasImage={!!post.thumbnail_url}>
                    {post.thumbnail_url ? (
                      <img src={post.thumbnail_url} alt={post.title} />
                    ) : (
                      <span>{post.category?.icon || '📝'}</span>
                    )}
                  </BlogThumbnail>
                  <BlogContent>
                    <BlogMeta>
                      {post.category && (
                        <CategoryBadge>{post.category.name}</CategoryBadge>
                      )}
                      {post._is_fallback && (
                        <FallbackBadge>EN</FallbackBadge>
                      )}
                      <BlogDate>{formatDate(post.published_at)}</BlogDate>
                    </BlogMeta>
                    <BlogTitle>{post.title}</BlogTitle>
                    <BlogExcerpt>
                      {post.excerpt || post.content.substring(0, 150).replace(/<[^>]*>/g, '')}...
                    </BlogExcerpt>
                    <ReadMoreLink>
                      {t('landing:blogPage.readMore')}
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </ReadMoreLink>
                  </BlogContent>
                </BlogCard>
              ))
            )}
          </BlogGrid>

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

export default BlogPage;
