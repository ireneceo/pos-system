/**
 * Docs — 안내 문서 (2026-10-04 Irene 「Docs에 필요한 안내 내용들 이렇게 안내페이지들 넣는 거 구성해야 하는데」).
 * /docs = 목차 + 첫 문서, /docs/:slug = 그 문서. 글은 System Admin 이 콘텐츠 관리(Docs 탭)에서 쓴다 —
 * 블로그와 같은 저장소(contents.type='docs')·같은 다국어 폴백. 새 표 없음.
 * 본문 HTML 은 SA 가 쓴 것만 실린다(블로그 본문과 같은 신뢰 경계 — BlogPostPage 와 동일 렌더).
 */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { LandingLayout } from '../../components/Landing';
import SEOHead from '../../components/Common/SEOHead';

interface DocItem { id: number; title: string; slug: string; excerpt?: string | null }
interface DocSection { id: number; name: string; slug: string; items: DocItem[] }
interface DocPost { id: number; title: string; slug: string; content: string; excerpt?: string | null; seo_title?: string | null; seo_description?: string | null }

const Wrap = styled.div`
  max-width: 1120px; margin: 0 auto; padding: 40px 16px 72px;
  display: grid; grid-template-columns: 260px minmax(0, 1fr); gap: 40px;
  @media (max-width: 860px) { grid-template-columns: 1fr; gap: 20px; padding-top: 24px; }
`;
const Toc = styled.nav`
  position: sticky; top: 88px; align-self: start;
  border: 1px solid #E3E8EE; border-radius: 10px; padding: 16px; background: #fff;
  @media (max-width: 860px) { position: static; }
`;
const TocTitle = styled.div`font-size: 13px; font-weight: 700; color: #6B7C93; text-transform: uppercase; letter-spacing: .04em; margin-bottom: 10px;`;
const TocSection = styled.div`font-size: 13px; font-weight: 700; color: #0A2540; margin: 14px 0 6px;`;
const TocLink = styled.a<{ $active?: boolean }>`
  display: block; padding: 6px 8px; border-radius: 6px; font-size: 14px; text-decoration: none;
  color: ${p => (p.$active ? '#635BFF' : '#425466')}; background: ${p => (p.$active ? '#EEEDFF' : 'transparent')};
  font-weight: ${p => (p.$active ? 600 : 400)};
  &:hover { background: #F6F7FB; }
`;
const H1 = styled.h1`font-size: 32px; line-height: 1.25; color: #0A2540; margin: 0 0 12px; @media (max-width: 600px) { font-size: 26px; }`;
const Lead = styled.p`font-size: 16px; color: #6B7C93; margin: 0 0 28px;`;
const Article = styled.div`
  font-size: 16px; line-height: 1.75; color: #1F2937; min-width: 0;
  h2 { font-size: 24px; color: #0A2540; margin: 40px 0 16px; }
  h3 { font-size: 19px; color: #0A2540; margin: 28px 0 12px; }
  p { margin: 0 0 18px; }
  ul, ol { margin: 0 0 18px; padding-left: 22px; li { margin-bottom: 8px; } }
  img { max-width: 100%; height: auto; border: 1px solid #E3E8EE; border-radius: 8px; margin: 16px 0; }
  table { border-collapse: collapse; width: 100%; margin: 16px 0; display: block; overflow-x: auto; }
  th, td { border: 1px solid #E3E8EE; padding: 8px 12px; text-align: left; }
  code { background: #F1F4F8; padding: 2px 6px; border-radius: 4px; font-size: 14px; word-break: break-all; }
  blockquote { margin: 20px 0; padding: 12px 18px; border-left: 3px solid #B45309; background: #FFFBEB; border-radius: 0 8px 8px 0; }
  a { color: #635BFF; }
`;
const Muted = styled.p`color: #6B7C93; font-size: 15px;`;

const DocsPage: React.FC = () => {
  const { t, i18n } = useTranslation('landing');
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();
  const lang = (i18n.language || 'en').split('-')[0];
  const [sections, setSections] = useState<DocSection[] | null>(null);
  const [post, setPost] = useState<DocPost | null>(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch(`/api/contents/public/docs?lang=${encodeURIComponent(lang)}`)
      .then(r => r.json()).then(j => { if (alive) setSections(j?.data?.sections || []); })
      .catch(() => { if (alive) setSections([]); });
    return () => { alive = false; };
  }, [lang]);

  // 주소에 문서가 없으면 목차의 첫 문서를 보여 준다
  const target = slug || sections?.[0]?.items?.[0]?.slug || null;
  useEffect(() => {
    if (!target) { setPost(null); return; }
    let alive = true;
    setMissing(false);
    fetch(`/api/contents/public/docs/${encodeURIComponent(target)}?lang=${encodeURIComponent(lang)}`)
      .then(async r => { const j = await r.json().catch(() => null); if (!alive) return; if (!r.ok || !j?.post) { setPost(null); setMissing(true); } else setPost(j.post); })
      .catch(() => { if (alive) { setPost(null); setMissing(true); } });
    return () => { alive = false; };
  }, [target, lang]);

  const go = (e: React.MouseEvent, s: string) => { e.preventDefault(); navigate(`/docs/${s}`); window.scrollTo(0, 0); };

  return (
    <LandingLayout>
      <SEOHead
        title={post ? `${post.seo_title || post.title} — Docs` : `${t('docs.title', 'PurpleHere Docs')}`}
        description={post?.seo_description || post?.excerpt || t('docs.subtitle', 'Step-by-step guides for setting up and running PurpleHere POS.')}
      />
      <Wrap>
        <Toc aria-label={t('docs.contents', 'Contents') as string}>
          <TocTitle>{t('docs.contents', 'Contents')}</TocTitle>
          {sections === null && <Muted>{t('docs.loading', 'Loading…')}</Muted>}
          {sections !== null && sections.length === 0 && <Muted>{t('docs.empty', 'Guides are being prepared.')}</Muted>}
          {(sections || []).map(sec => (
            <div key={sec.id}>
              <TocSection>{sec.name}</TocSection>
              {sec.items.map(it => (
                <TocLink key={it.id} href={`/docs/${it.slug}`} $active={it.slug === (post?.slug || target)} onClick={(e) => go(e, it.slug)}>
                  {it.title}
                </TocLink>
              ))}
            </div>
          ))}
        </Toc>
        <main style={{ minWidth: 0 }}>
          {!slug && <><H1>{t('docs.title', 'PurpleHere Docs')}</H1><Lead>{t('docs.subtitle', 'Step-by-step guides for setting up and running PurpleHere POS.')}</Lead></>}
          {missing && <Muted>{t('docs.notFound', 'This guide could not be found.')}</Muted>}
          {post && (
            <>
              {slug && <H1>{post.title}</H1>}
              {!slug && <h2 style={{ fontSize: 24, color: '#0A2540', margin: '8px 0 16px' }}>{post.title}</h2>}
              <Article dangerouslySetInnerHTML={{ __html: post.content }} />
            </>
          )}
        </main>
      </Wrap>
    </LandingLayout>
  );
};

export default DocsPage;
