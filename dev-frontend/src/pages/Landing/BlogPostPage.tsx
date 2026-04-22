import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { LandingLayout } from '../../components/Landing';
import SEOHead, { generateArticleSchema, generateBreadcrumbSchema } from '../../components/Common/SEOHead';
import { useTranslation } from 'react-i18next';
import { useSiteTimezone, formatDateInSiteTz } from '../../hooks/useSiteTimezone';
import { useAuth } from '../../contexts/AuthContext';

interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  icon: string | null;
}

interface SocialPost {
  title?: string;
  body?: string;
  hashtags?: string[];
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
  // SEO fields
  seo_title?: string | null;
  seo_description?: string | null;
  seo_keywords?: string | null;
  og_image_url?: string | null;
  ai_summary?: string | null;
  // Distribution fields (admin-only)
  video_prompt?: string | null;
  social_post?: SocialPost | null;
  target_persona?: string | null;
  problem_category?: string | null;
  content_tier?: string | null;
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

const MultiFormatSection = styled.section`
  max-width: 800px;
  margin: 32px auto 48px;
  padding: 24px 28px;
  background: #FFFBF0;
  border: 1px dashed #F59E0B;
  border-radius: 16px;

  @media (max-width: 768px) {
    margin: 24px 16px;
    padding: 20px;
  }
`;

const AdminBadge = styled.div`
  display: inline-block;
  padding: 4px 10px;
  background: #F59E0B;
  color: white;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
`;

const MultiFormatTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #0A2540;
  margin: 0 0 8px;
`;

const MultiFormatHint = styled.p`
  font-size: 13px;
  color: #6B7C93;
  margin: 0 0 20px;
  line-height: 1.5;
`;

const UsageGuide = styled.div`
  background: white;
  border: 1px solid #F59E0B;
  border-radius: 8px;
  padding: 14px 18px;
  margin-bottom: 20px;
  font-size: 13px;
  color: #425466;
  line-height: 1.6;

  strong {
    display: block;
    color: #0A2540;
    font-size: 14px;
    margin-bottom: 8px;
  }

  ol {
    margin: 0 0 10px;
    padding-left: 20px;
  }

  li {
    margin-bottom: 4px;
  }

  em {
    display: block;
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px dashed #F59E0B;
    font-style: normal;
    font-size: 12px;
    color: #6B7C93;
  }

  b {
    color: #0A2540;
  }
`;

const AssetTip = styled.div`
  padding: 6px 14px;
  background: #FFFBF0;
  border-bottom: 1px dashed #F59E0B;
  font-size: 11px;
  color: #B45309;
  font-style: italic;
`;

const AssetBlock = styled.div`
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  margin-bottom: 12px;
  overflow: hidden;
  background: #FAFBFC;

  &:last-child {
    margin-bottom: 0;
  }
`;

const AssetHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  background: white;
  border-bottom: 1px solid #E6EBF1;
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
`;

const AssetBody = styled.div`
  padding: 14px 16px;
  font-size: 14px;
  color: #425466;
  line-height: 1.6;

  pre {
    margin: 0;
    white-space: pre-wrap;
    word-wrap: break-word;
    font-family: inherit;
    font-size: 13px;
  }
`;

const CopyButton = styled.button`
  padding: 5px 12px;
  border: 1px solid #E6EBF1;
  background: white;
  color: #635BFF;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: #F8F9FF;
    border-color: #635BFF;
  }
`;

const SocialField = styled.div`
  margin-bottom: 14px;
  padding-bottom: 14px;
  border-bottom: 1px solid #E6EBF1;

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
`;

const SocialFieldHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
  font-size: 11px;
  font-weight: 700;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const CopyButtonSmall = styled.button`
  padding: 3px 8px;
  border: 1px solid #E6EBF1;
  background: white;
  color: #635BFF;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  text-transform: none;
  letter-spacing: 0;

  &:hover {
    background: #F8F9FF;
    border-color: #635BFF;
  }
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
  const { t, i18n } = useTranslation('landing');
  const { user } = useAuth();
  const isSystemAdmin = user?.role === 'System Admin';
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const isNews = location.pathname.startsWith('/news');
  const backPath = isNews ? '/news' : '/blog';
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [isFallback, setIsFallback] = useState(false);
  const [translations, setTranslations] = useState<Array<{ language: string; slug: string; title: string }>>([]);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (e) {
      console.error('Copy failed:', e);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, i18n.language]);

  // Auto-navigate to the correct slug — keeps URL in sync with (post.language, post.slug).
  // Two cases:
  //   A) UI language differs from post language → navigate to translated version (if exists)
  //   B) URL slug differs from the returned post.slug (e.g. user hit MS slug with lang=en;
  //      server resolved it to the EN sibling) → replace URL to the canonical slug.
  useEffect(() => {
    if (!post) return;
    const uiLang = (i18n.language || 'en').split('-')[0];

    // Case A: language mismatch — try to switch to matching translation
    if (post.language !== uiLang && translations.length) {
      const match = translations.find(tr => tr.language === uiLang);
      if (match && match.slug !== slug) {
        navigate(`/blog/${match.slug}`, { replace: true });
        return;
      }
      // No translation in requested lang → fall through (fallback banner shown)
    }

    // Case B: same language but URL slug doesn't match canonical — fix URL
    if (post.slug && post.slug !== slug) {
      navigate(`/blog/${post.slug}`, { replace: true });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language, post?.slug, post?.language, translations.length]);

  const fetchPost = async () => {
    setLoading(true);
    setNotFound(false);
    try {
      const lang = (i18n.language || 'en').split('-')[0];
      const response = await fetch(`/api/contents/public/blog/${slug}?lang=${encodeURIComponent(lang)}`);
      if (response.ok) {
        const data = await response.json();
        setPost(data.post);
        setRelatedPosts(data.relatedPosts || []);
        setIsFallback(Boolean(data.is_fallback));
        setTranslations(Array.isArray(data.translations) ? data.translations : []);
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
        language={post.language as 'en' | 'ms' | 'zh' | 'ko' | undefined}
        alternateUrls={translations.length > 1 ? Object.fromEntries(
          translations.map(tr => [tr.language, `https://purplehere.com/blog/${tr.slug}`])
        ) : undefined}
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

        {isFallback && (
          <div style={{ maxWidth: 800, margin: '0 auto', padding: '20px 20px 0' }}>
            <div style={{
              background: '#FFF8E1',
              border: '1px solid #FFE082',
              borderRadius: 8,
              padding: '12px 16px',
              fontSize: 14,
              color: '#6B4E00',
            }}>
              {t('landing:blogPostPage.fallbackNotice', 'This article is only available in English. Translation coming soon.')}
            </div>
          </div>
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

        {isSystemAdmin && (post.video_prompt || post.social_post) && (
          <MultiFormatSection>
            <AdminBadge>🔒 {t('landing:blogPostPage.adminOnly', 'Admin only — not visible to public readers')}</AdminBadge>
            <MultiFormatTitle>
              📣 {t('landing:blogPostPage.distributionKit', 'Distribution Kit')}
            </MultiFormatTitle>

            <UsageGuide>
              <strong>How to distribute this post</strong>
              <ol>
                <li><b>Video Prompt</b> → Paste into any AI video generator (Sora / Runway / Veo / Pika) to produce a 15-28s vertical video. The first frame becomes your thumbnail automatically — no separate thumbnail work needed.</li>
                <li><b>Social Post</b> → Copy title, body, and hashtags. Paste identically on Facebook / LinkedIn / Threads / YouTube / TikTok. Upload the generated video as the attachment.</li>
                <li><b>Or use an auto-distribution tool</b> (Buffer, Hootsuite, Publer) — post once, it fans out to all channels.</li>
              </ol>
            </UsageGuide>

            {post.video_prompt && (
              <AssetBlock>
                <AssetHeader>
                  <span>🎬 {t('landing:blogPostPage.videoPrompt', 'Video Production Prompt')}</span>
                  <CopyButton onClick={() => copyToClipboard(post.video_prompt!, 'video')}>
                    {copiedKey === 'video' ? '✓ Copied' : 'Copy prompt'}
                  </CopyButton>
                </AssetHeader>
                <AssetTip>Paste into Sora / Runway / Veo / Pika. Includes scene breakdown, voice-over script, text overlays, thumbnail spec (first frame), and visual style guide. Generated video = ready to upload.</AssetTip>
                <AssetBody>
                  <pre>{post.video_prompt}</pre>
                </AssetBody>
              </AssetBlock>
            )}

            {post.social_post && (
              <AssetBlock>
                <AssetHeader>
                  <span>📱 {t('landing:blogPostPage.socialPost', 'Social Post (all platforms)')}</span>
                  <CopyButton
                    onClick={() => {
                      const packaged = [
                        post.social_post?.title || '',
                        '',
                        post.social_post?.body || '',
                        '',
                        (post.social_post?.hashtags || []).join(' ')
                      ].join('\n');
                      copyToClipboard(packaged, 'social-full');
                    }}
                  >
                    {copiedKey === 'social-full' ? '✓ Copied full package' : 'Copy full package'}
                  </CopyButton>
                </AssetHeader>
                <AssetTip>Paste identically on Facebook, LinkedIn, Threads, YouTube, TikTok. Use the generated video as the attachment on all platforms.</AssetTip>
                <AssetBody>
                  {post.social_post.title && (
                    <SocialField>
                      <SocialFieldHeader>
                        <span>Title</span>
                        <CopyButtonSmall onClick={() => copyToClipboard(post.social_post!.title!, 'social-title')}>
                          {copiedKey === 'social-title' ? '✓' : 'Copy'}
                        </CopyButtonSmall>
                      </SocialFieldHeader>
                      <div style={{ fontWeight: 600, fontSize: 16, color: '#0A2540' }}>{post.social_post.title}</div>
                    </SocialField>
                  )}
                  {post.social_post.body && (
                    <SocialField>
                      <SocialFieldHeader>
                        <span>Body</span>
                        <CopyButtonSmall onClick={() => copyToClipboard(post.social_post!.body!, 'social-body')}>
                          {copiedKey === 'social-body' ? '✓' : 'Copy'}
                        </CopyButtonSmall>
                      </SocialFieldHeader>
                      <div style={{ whiteSpace: 'pre-wrap', fontSize: 14, lineHeight: 1.6 }}>{post.social_post.body}</div>
                    </SocialField>
                  )}
                  {post.social_post.hashtags && post.social_post.hashtags.length > 0 && (
                    <SocialField>
                      <SocialFieldHeader>
                        <span>Hashtags</span>
                        <CopyButtonSmall onClick={() => copyToClipboard((post.social_post!.hashtags || []).join(' '), 'social-tags')}>
                          {copiedKey === 'social-tags' ? '✓' : 'Copy'}
                        </CopyButtonSmall>
                      </SocialFieldHeader>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {post.social_post.hashtags.map((tag, i) => (
                          <span key={i} style={{ background: '#F0EFFF', color: '#635BFF', padding: '3px 10px', borderRadius: 4, fontSize: 12, fontWeight: 600 }}>{tag}</span>
                        ))}
                      </div>
                    </SocialField>
                  )}
                </AssetBody>
              </AssetBlock>
            )}
          </MultiFormatSection>
        )}

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
