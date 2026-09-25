/**
 * 공개 마케팅 페이지 목록 — 단일 소스 (docs/SEO_OPERATIONS.md · 2026-09-24 SEO C1)
 *
 * 쓰는 곳 두 군데가 **같은 목록**을 본다(목록 두 벌 금지):
 *   - scripts/generate-sitemap.js  → sitemap.xml 의 고정 페이지
 *   - routes/seo-html.js           → 크롤러가 받는 페이지별 HTML(제목·설명·canonical·본문)
 *
 * title/description 은 각 페이지 SEOHead 에 넘기는 영어 문구와 같게 둔다(화면이 뜨면 Helmet 이 같은 값으로 교체).
 * 페이지를 더하거나 문구를 바꾸면 여기와 그 페이지 SEOHead 를 함께 고친다.
 */
const SITE = 'https://purplehere.com';

// App.tsx 공개 라우트 중 색인 대상(로그인·가입·비밀번호·/shop/:slug 제외)
const STATIC_PAGES = [
  { loc: '/', file: 'HomePage.tsx', changefreq: 'weekly', priority: '1.0',
    title: 'Cloud POS System for Restaurants',
    description: 'PurpleHere is a subscription-based cloud POS system for restaurants, brands, and food courts. Real-time order management, inventory tracking, multi-location support. Start your 7-day free trial today.' },
  { loc: '/pricing', file: 'PricingPage.tsx', changefreq: 'weekly', priority: '0.9',
    title: 'Pricing - Subscription Plans',
    description: 'Simple, transparent pricing for PurpleHere POS system. Choose from Basic, Professional, or Enterprise plans for restaurants, brands, and food courts. 7-day free trial available.' },
  { loc: '/features', file: 'FeaturesPage.tsx', changefreq: 'monthly', priority: '0.8',
    title: 'Features - Powerful POS Tools for Every Business',
    description: "Explore PurpleHere's powerful features: POS terminal, menu management, real-time analytics, multi-branch support, kitchen display, and more." },
  { loc: '/packages', file: 'PackagesPage.tsx', changefreq: 'monthly', priority: '0.7',
    title: 'POS Hardware Packages - PurpleHere',
    description: 'Choose the right POS hardware setup for your restaurant. Select a package, add extra equipment, and get an instant quote.' },
  { loc: '/about', file: 'AboutPage.tsx', changefreq: 'monthly', priority: '0.7',
    title: 'Run your restaurant business from one platform — PurpleHere',
    description: 'From a single outlet to a hundred. Mobile orders, POS, inventory, staff, franchises, and billing — one cloud platform built for restaurant operators, brand HQs, foodcourts, and suppliers.' },
  { loc: '/faq', file: 'FAQPage.tsx', changefreq: 'monthly', priority: '0.7',
    title: 'FAQ - Frequently Asked Questions',
    description: 'Find answers to common questions about PurpleHere POS system. Learn about pricing, features, free trial, setup, and support for restaurants, brands, and food courts.' },
  { loc: '/blog', file: 'BlogPage.tsx', changefreq: 'weekly', priority: '0.8',
    title: 'Blog - Restaurant Industry Insights & Tips',
    description: 'Read the latest articles about restaurant management, POS technology, food industry trends, and business tips from PurpleHere.' },
  { loc: '/news', file: 'NewsPage.tsx', changefreq: 'weekly', priority: '0.6',
    title: 'News - Product Updates & Announcements',
    description: 'Latest product news, release notes, and announcements from PurpleHere POS.' },
  { loc: '/contact', file: 'ContactPage.tsx', changefreq: 'monthly', priority: '0.6',
    title: 'Contact Us - Get Started with PurpleHere',
    description: 'Contact PurpleHere for a free trial, pricing inquiry, or technical support. We typically respond within 24 hours.' },
  { loc: '/demo', file: 'DemoPage.tsx', changefreq: 'monthly', priority: '0.6',
    title: 'Try Demo - Experience PurpleHere POS',
    description: 'Try PurpleHere POS system live with our interactive demo. Explore features for restaurants, brands, and food courts - no signup required.' },
  { loc: '/referral-program', file: 'ReferralLandingPage.tsx', changefreq: 'monthly', priority: '0.5',
    title: 'Referral Program - Earn 15% Recurring',
    description: 'Tell other restaurant operators about Purple POS. They get 20% off their first month. You earn 15% commission every time they pay — for as long as they stay subscribed.' },
  { loc: '/company', file: 'CompanyPage.tsx', changefreq: 'yearly', priority: '0.4',
    title: 'Company Information - GIT Consulting Sdn. Bhd.',
    description: 'GIT Consulting Sdn. Bhd. operates PurpleHere, a cloud-based POS platform for restaurants, brands, and food courts based in Malaysia.' },
  { loc: '/privacy', file: 'PrivacyPolicyPage.tsx', changefreq: 'yearly', priority: '0.3',
    title: 'Privacy Policy - PurpleHere',
    description: "PurpleHere's privacy policy. Learn how we collect, use, and protect your personal information." },
  { loc: '/terms', file: 'TermsOfServicePage.tsx', changefreq: 'yearly', priority: '0.3',
    title: 'Terms of Service - PurpleHere',
    description: "PurpleHere's terms of service. Read our terms for using the PurpleHere POS platform and subscription services." },
];

// /news 에 모이고 /blog 목록에서 빠지는 카테고리 (routes/contents.js 목록 API 와 같은 기준)
const NEWS_CATEGORY_SLUGS = ['product-news', 'updates'];

module.exports = { SITE, STATIC_PAGES, NEWS_CATEGORY_SLUGS };
