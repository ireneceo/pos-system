import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { LandingLayout } from '../../components/Landing';
import SEOHead, { generateArticleSchema, generateBreadcrumbSchema } from '../../components/Common/SEOHead';
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
  category?: BlogCategory;
  // SEO fields
  seo_title?: string | null;
  seo_description?: string | null;
  seo_keywords?: string | null;
  og_image_url?: string | null;
  ai_summary?: string | null;
}

const PageContainer = styled.div`
  background: #FAFBFC;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 20px 60px;
  color: white;

  @media (max-width: 768px) {
    padding: 32px 20px 40px;
  }
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;

  @media (max-width: 768px) {
    text-align: left;
    padding: 0 4px;
  }
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  color: #425466;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 24px;
  transition: all 0.2s;

  &:hover {
    border-color: #635BFF;
    color: #635BFF;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const CategoryBadge = styled.span`
  display: inline-block;
  padding: 6px 14px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    margin-bottom: 12px;
  }
`;

const PostTitle = styled.h1`
  font-size: 36px;
  font-weight: 700;
  color: white;
  margin: 0 0 20px;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 26px;
    line-height: 1.4;
    margin-bottom: 0;
  }
`;

const PostMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;

  span {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  svg {
    width: 16px;
    height: 16px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding: 16px 20px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    margin-top: 20px;

    span {
      gap: 10px;
      font-size: 14px;
    }

    svg {
      width: 18px;
      height: 18px;
      opacity: 0.8;
    }
  }
`;

const ThumbnailSection = styled.div`
  max-width: 900px;
  margin: -30px auto 0;
  padding: 0 48px;

  @media (max-width: 768px) {
    padding: 0 20px;
    margin-top: -20px;
  }
`;

const Thumbnail = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    height: 250px;
  }
`;

const ArticleSection = styled.article`
  max-width: 800px;
  margin: 0 auto;
  padding: 48px 48px 80px;

  @media (max-width: 768px) {
    padding: 32px 20px 60px;
  }
`;

const ArticleHeader = styled.div`
  margin-bottom: 32px;
`;

const ArticleContent = styled.div`
  font-size: 17px;
  line-height: 1.8;
  color: #1F2937;

  h2 {
    font-size: 28px;
    font-weight: 700;
    color: #0A2540;
    margin: 48px 0 24px;
  }

  h3 {
    font-size: 22px;
    font-weight: 600;
    color: #0A2540;
    margin: 36px 0 16px;
  }

  p {
    margin: 0 0 24px;
  }

  ul, ol {
    margin: 0 0 24px;
    padding-left: 24px;

    li {
      margin-bottom: 12px;
    }
  }

  blockquote {
    margin: 32px 0;
    padding: 24px 32px;
    background: #F8F9FF;
    border-left: 4px solid #635BFF;
    border-radius: 0 8px 8px 0;
    font-style: italic;
    color: #425466;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 24px 0;
  }

  a {
    color: #635BFF;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  code {
    background: #F3F4F6;
    padding: 2px 8px;
    border-radius: 4px;
    font-family: monospace;
    font-size: 15px;
  }

  pre {
    background: #1F2937;
    color: #E5E7EB;
    padding: 24px;
    border-radius: 8px;
    overflow-x: auto;
    margin: 24px 0;

    code {
      background: none;
      padding: 0;
      color: inherit;
    }
  }
`;

const RelatedSection = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 48px 80px;

  @media (max-width: 768px) {
    padding: 0 20px 60px;
  }
`;

const RelatedTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0 0 24px;
  padding-top: 48px;
  border-top: 1px solid #E5E7EB;
`;

const RelatedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const RelatedCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }
`;

const RelatedCardTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px;
  line-height: 1.4;
`;

const RelatedCardDate = styled.span`
  font-size: 13px;
  color: #6B7280;
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 120px 20px;
  color: #6B7280;
`;

const NotFoundState = styled.div`
  text-align: center;
  padding: 120px 20px;

  h2 {
    font-size: 24px;
    color: #0A2540;
    margin: 0 0 12px;
  }

  p {
    color: #6B7280;
    margin: 0 0 24px;
  }
`;

const BlogPostPage: React.FC = () => {
  const { t } = useTranslation('landing');
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const isNews = location.pathname.startsWith('/news');
  const backPath = isNews ? '/news' : '/blog';
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const fetchPost = async () => {
    setLoading(true);
    setNotFound(false);
    try {
      const response = await fetch(`/api/contents/public/blog/${slug}`);
      if (response.ok) {
        const data = await response.json();
        setPost(data.post);
        setRelatedPosts(data.relatedPosts || []);
      } else if (response.status === 404) {
        setNotFound(true);
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      setNotFound(true);
    }
    setLoading(false);
  };

  const siteTimezone = useSiteTimezone();
  const formatDate = (dateStr: string | null) => formatDateInSiteTz(dateStr, siteTimezone, { month: 'long' });

  if (loading) {
  // useTranslation moved to component level

  return (
      <LandingLayout>
        <PageContainer>
          <LoadingState>{t('landing:blogPostPage.loading')}</LoadingState>
        </PageContainer>
      </LandingLayout>
    );
  }

  if (notFound || !post) {
    return (
      <LandingLayout>
        <PageContainer>
          <NotFoundState>
            <h2>{t('landing:blogPostPage.postNotFound')}</h2>
            <p>{t('landing:blogPostPage.theBlogPostYoureLookingForDoesntExistOrHasBeenRemoved')}</p>
            <BackButton onClick={() => navigate(backPath)} style={{ background: '#635BFF', border: 'none' }}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {t('landing:blogPostPage.backToBlog')}
            </BackButton>
          </NotFoundState>
        </PageContainer>
      </LandingLayout>
    );
  }

  // 이메일 형식이면 작성자명으로 변환
  const getAuthorDisplayName = (authorName: string | null) => {
    if (!authorName) return null;
    // 이메일 형식인 경우 (@ 포함)
    if (authorName.includes('@')) {
      return 'PurpleHere Team';
    }
    return authorName;
  };

  const postUrl = `https://purplehere.com/blog/${post.slug}`;
  const articleSchema = generateArticleSchema({
    title: post.seo_title || post.title,
    description: post.seo_description || post.excerpt || post.ai_summary || '',
    url: postUrl,
    image: post.og_image_url || post.thumbnail_url || undefined,
    author: getAuthorDisplayName(post.author_name) || 'PurpleHere',
    publishedTime: post.published_at || undefined,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://purplehere.com' },
    { name: 'Blog', url: 'https://purplehere.com/blog' },
    { name: post.title, url: postUrl }
  ]);

  return (
    <LandingLayout>
      <SEOHead
        title={post.seo_title || post.title}
        description={post.seo_description || post.excerpt || post.ai_summary || `Read ${post.title} on PurpleHere Blog`}
        keywords={post.seo_keywords || undefined}
        ogImage={post.og_image_url || post.thumbnail_url || undefined}
        ogType="article"
        canonicalUrl={postUrl}
        author={getAuthorDisplayName(post.author_name) || 'PurpleHere'}
        publishedTime={post.published_at || undefined}
        jsonLd={[articleSchema, breadcrumbSchema]}
      />
      <PageContainer>
        <HeroSection>
          <HeroContent>
            {post.category && (
              <CategoryBadge>{post.category.name}</CategoryBadge>
            )}

            <PostTitle>{post.title}</PostTitle>

            <PostMeta>
              {post.author_name && (
                <span>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {getAuthorDisplayName(post.author_name)}
                </span>
              )}
              <span>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatDate(post.published_at)}
              </span>
              <span>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {post.view_count} views
              </span>
            </PostMeta>
          </HeroContent>
        </HeroSection>

        {post.thumbnail_url && (
          <ThumbnailSection>
            <Thumbnail>
              <img src={post.thumbnail_url} alt={post.title} />
            </Thumbnail>
          </ThumbnailSection>
        )}

        <ArticleSection>
          <ArticleHeader>
            <BackButton onClick={() => navigate(backPath)}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {t('landing:blogPostPage.backToBlog')}
            </BackButton>
          </ArticleHeader>
          <ArticleContent dangerouslySetInnerHTML={{ __html: post.content }} />
        </ArticleSection>

        {relatedPosts.length > 0 && (
          <RelatedSection>
            <RelatedTitle>{t('landing:blogPostPage.relatedPosts')}</RelatedTitle>
            <RelatedGrid>
              {relatedPosts.map(relatedPost => (
                <RelatedCard key={relatedPost.id} onClick={() => navigate(`/blog/${relatedPost.slug}`)}>
                  <RelatedCardTitle>{relatedPost.title}</RelatedCardTitle>
                  <RelatedCardDate>{formatDate(relatedPost.published_at)}</RelatedCardDate>
                </RelatedCard>
              ))}
            </RelatedGrid>
          </RelatedSection>
        )}
      </PageContainer>
    </LandingLayout>
  );
};

export default BlogPostPage;
