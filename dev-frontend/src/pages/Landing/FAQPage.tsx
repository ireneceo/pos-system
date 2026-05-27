import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { EmptyState } from '../../components/UI/TableComponents';
import { LandingLayout } from '../../components/Landing';
import SEOHead, { generateFAQSchema, generateBreadcrumbSchema } from '../../components/Common/SEOHead';
import { useTranslation } from 'react-i18next';

interface FAQCategory {
  id: number;
  name: string;
  slug: string;
  icon: string | null;
}

interface FAQItem {
  id: number;
  title: string;
  content: string;
  category?: FAQCategory;
}

const PageContainer = styled.div`
  background: #F9FAFB;
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
  max-width: 900px;
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
  border: 2px solid ${props => props.active ? '#635BFF' : '#C7CED6'};
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

const FAQList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FAQCard = styled.div<{ isOpen?: boolean }>`
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: all 0.3s;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
`;

const FAQHeader = styled.button`
  width: 100%;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
`;

const FAQQuestion = styled.h3`
  font-size: 17px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
  flex: 1;
  line-height: 1.4;
`;

const FAQIcon = styled.div<{ isOpen?: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${props => props.isOpen ? '#635BFF' : '#F1F4F8'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s;

  svg {
    width: 16px;
    height: 16px;
    color: ${props => props.isOpen ? 'white' : '#4B5563'};
    transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0)'};
    transition: transform 0.3s;
  }
`;

const FAQAnswer = styled.div<{ isOpen?: boolean }>`
  max-height: ${props => props.isOpen ? '800px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
`;

const FAQAnswerContent = styled.div`
  padding: 0 24px;
  font-size: 15px;
  color: #425466;
  line-height: 1.7;

  p {
    margin: 0 0 12px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &::after {
    content: '';
    display: block;
    height: 24px;
  }
`;

const CategoryBadge = styled.span`
  display: inline-block;
  padding: 4px 10px;
  background: #F1F4F8;
  color: #4B5563;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 12px;
`;


const ContactSection = styled.div`
  text-align: center;
  padding: 48px;
  background: linear-gradient(135deg, #635BFF 0%, #8B5CF6 100%);
  border-radius: 24px;
  margin-top: 48px;
  color: white;

  h3 {
    font-size: 24px;
    font-weight: 700;
    margin: 0 0 12px;
  }

  p {
    font-size: 16px;
    opacity: 0.9;
    margin: 0 0 24px;
  }
`;

const ContactButton = styled.button`
  padding: 14px 32px;
  background: white;
  color: #635BFF;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 60px;
  color: #4B5563;
`;

const FAQPage: React.FC = () => {
  const { t, i18n } = useTranslation('landing');
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState<FAQCategory[]>([]);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  useEffect(() => {
    fetchFAQs();
    const category = searchParams.get('category');
    if (category) {
      setActiveCategory(category);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]);

  useEffect(() => {
    if (activeCategory !== 'all') {
      setSearchParams({ category: activeCategory });
    } else {
      setSearchParams({});
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory]);

  const fetchFAQs = async () => {
    try {
      const lang = (i18n.language || 'en').split('-')[0];
      const response = await fetch(`/api/contents/public/faq?lang=${encodeURIComponent(lang)}`);
      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories || []);
        setFaqs(data.items || []);
      }
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    }
    setLoading(false);
  };

  const filteredFAQs = activeCategory === 'all'
    ? faqs
    : faqs.filter(faq => faq.category?.slug === activeCategory);

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  // Generate FAQ Schema for AEO (uses all FAQs for maximum AI visibility)
  const faqSchemaData = useMemo(() => {
    if (faqs.length === 0) return null;
    return generateFAQSchema(
      faqs.map(faq => ({
        question: faq.title,
        answer: faq.content.replace(/<[^>]*>/g, '') // Strip HTML for schema
      }))
    );
  }, [faqs]);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://purplehere.com' },
    { name: 'FAQ', url: 'https://purplehere.com/faq' }
  ]);
  return (
    <LandingLayout>
      <SEOHead
        title="FAQ - Frequently Asked Questions"
        description="Find answers to common questions about PurpleHere POS system. Learn about pricing, features, free trial, setup, and support for restaurants, brands, and food courts."
        keywords="POS FAQ, restaurant POS questions, PurpleHere help, POS system support, free trial POS"
        canonicalUrl="https://purplehere.com/faq"
        jsonLd={faqSchemaData ? [faqSchemaData, breadcrumbSchema] : [breadcrumbSchema]}
      />
      <PageContainer>
        <HeroSection>
          <HeroTitle>{t('landing:fAQPage.frequentlyAskedQuestions')}</HeroTitle>
          <HeroSubtitle>
            {t('landing:fAQPage.findAnswersToCommonQuestionsAboutPurpleh')}
          </HeroSubtitle>
        </HeroSection>

        <ContentSection>
          <CategoryTabs>
            <CategoryTab
              active={activeCategory === 'all'}
              onClick={() => setActiveCategory('all')}
            >
              All
            </CategoryTab>
            {categories.map(cat => (
              <CategoryTab
                key={cat.id}
                active={activeCategory === cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
              >
                {cat.name}
              </CategoryTab>
            ))}
          </CategoryTabs>

          {loading ? (
            <LoadingSpinner>{t('landing:fAQPage.loading')}</LoadingSpinner>
          ) : filteredFAQs.length === 0 ? (
            <EmptyState>
              <h3>{t('landing:fAQPage.noFaqsFound')}</h3>
              <p>{t('landing:fAQPage.checkBackLaterForUpdates')}</p>
            </EmptyState>
          ) : (
            <FAQList>
              {filteredFAQs.map(faq => (
                <FAQCard key={faq.id} isOpen={openFAQ === faq.id}>
                  <FAQHeader onClick={() => toggleFAQ(faq.id)}>
                    <FAQQuestion>{faq.title}</FAQQuestion>
                    <FAQIcon isOpen={openFAQ === faq.id}>
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </FAQIcon>
                  </FAQHeader>
                  <FAQAnswer isOpen={openFAQ === faq.id}>
                    <FAQAnswerContent>
                      {faq.category && (
                        <CategoryBadge>{faq.category.name}</CategoryBadge>
                      )}
                      <div dangerouslySetInnerHTML={{ __html: faq.content.replace(/\n/g, '<br/>') }} />
                    </FAQAnswerContent>
                  </FAQAnswer>
                </FAQCard>
              ))}
            </FAQList>
          )}

          <ContactSection>
            <h3>{t('landing:fAQPage.stillHaveQuestions')}</h3>
            <p>{t('landing:fAQPage.cantFindTheAnswerYoureLookingForOurSupportTeamIsHereToHelp')}</p>
            <ContactButton onClick={() => navigate('/contact')}>
              {t('landing:fAQPage.contactSupport')}
            </ContactButton>
          </ContactSection>
        </ContentSection>
      </PageContainer>
    </LandingLayout>
  );
};

export default FAQPage;
