import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { LandingLayout } from '../../components/Landing';

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
  category?: BlogCategory;
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;

  @media (max-width: 768px) {
    padding: 32px 20px;
  }
`;

const HeroTitle = styled.h1`
  font-size: 36px;
  font-weight: 700;
  color: white;
  margin: 0;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 16px;
  opacity: 0.9;
  max-width: 600px;
  margin: 6px auto 0;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 14px;
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
  margin-bottom: 48px;
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
  background: ${props => props.hasImage ? 'transparent' : 'linear-gradient(135deg, #635BFF 0%, #8B5CF6 100%)'};
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

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  grid-column: 1 / -1;

  h3 {
    font-size: 20px;
    color: #0A2540;
    margin: 0 0 8px;
  }

  p {
    color: #6B7280;
    margin: 0;
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
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
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
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [activeCategory, pagination.page]);

  useEffect(() => {
    const params: Record<string, string> = {};
    if (activeCategory !== 'all') params.category = activeCategory;
    if (pagination.page > 1) params.page = pagination.page.toString();
    setSearchParams(params);
  }, [activeCategory, pagination.page]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const categoryParam = activeCategory !== 'all' ? `&category=${activeCategory}` : '';
      const response = await fetch(`/api/contents/public/blog?page=${pagination.page}&limit=${pagination.limit}${categoryParam}`);
      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories || []);
        setPosts(data.items || []);
        setPagination(data.pagination || pagination);
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    }
    setLoading(false);
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleCategoryChange = (slug: string) => {
    setActiveCategory(slug);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  return (
    <LandingLayout>
      <PageContainer>
        <HeroSection>
          <HeroTitle>Blog</HeroTitle>
          <HeroSubtitle>
            Stay updated with the latest news and tips for PurpleHere POS
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

          <BlogGrid>
            {loading ? (
              <LoadingSpinner>Loading...</LoadingSpinner>
            ) : posts.length === 0 ? (
              <EmptyState>
                <h3>No posts found</h3>
                <p>Check back later for new content</p>
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
                      <BlogDate>{formatDate(post.published_at)}</BlogDate>
                    </BlogMeta>
                    <BlogTitle>{post.title}</BlogTitle>
                    <BlogExcerpt>
                      {post.excerpt || post.content.substring(0, 150).replace(/<[^>]*>/g, '')}...
                    </BlogExcerpt>
                    <ReadMoreLink>
                      Read more
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
