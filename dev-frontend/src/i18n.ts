import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// Cache-bust locale files per page load so translation key updates take effect
// without users manually clearing cache. Evaluated once at module load.
const I18N_CACHE_BUST = Date.now().toString();

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'ko', 'zh', 'ms'],

    ns: [
      'common', 'auth', 'dashboard', 'orders', 'menu', 'inventory',
      'invoices', 'staff', 'customers', 'pos', 'kitchen', 'settings',
      'reports', 'brand', 'foodcourt', 'owner', 'admin', 'landing',
      'plans', 'notifications', 'floorplan', 'recipes', 'suppliers',
      'validation', 'contract', 'supplier', 'supplierDirectory',
      'purchaseOrders', 'purchaseInvoices', 'referrals', 'billing',
      'walkthrough', 'subscription', 'reservation', 'cash', 'promotions',
      'printDiagnostics'
    ],
    defaultNS: 'common',

    backend: {
      loadPath: `/locales/{{lng}}/{{ns}}.json?v=${I18N_CACHE_BUST}`,
    },

    detection: {
      order: ['localStorage', 'navigator'],
      // ⛔ `caches: []` — **사람이 고른 것만** 브라우저에 저장한다 (2026-09-05 Irene 신고).
      //   예전에는 `caches: ['localStorage']` 라 `i18n.changeLanguage()` 호출이 **전부** 저장됐다.
      //   로그인·세션복원이 `apiUser.preferred_language` 로 언어를 바꾸는데(AuthContext:580/660/727)
      //   그 값까지 브라우저에 남아, **로그아웃 후 랜딩이나 다른 계정에서도** 그 언어가 계속 나왔다.
      //   Irene 실측: 브라우저 기본이 영어인데 랜딩이 한국어. 운영 `users.preferred_language` 는
      //   49명 전원 `en`(Irene 계정 3개 포함) — DB 에는 한국어가 없다.
      //   사용자가 직접 고르는 경로 두 곳은 `localStorage.setItem` 을 **자기가 하고 있으므로**
      //   (`LanguageSelector.tsx:41` · `AuthContext.tsx:1013`) 이 값을 비워도 선택은 그대로 기억된다.
      //   결과: 랜딩 = "직접 고른 언어 > 브라우저 언어". 위치(IP)는 예나 지금이나 안 본다 —
      //   말레이시아 사용자 다수가 영어 브라우저이고, VPN·회사망에서 틀리며, 업계 표준도 아니다.
      caches: [],
      lookupLocalStorage: 'i18nextLng',
    },

    interpolation: {
      escapeValue: false,
    },

    // Only load namespaces when needed
    partialBundledLanguages: true,

    // Don't wait for translations to load before rendering
    react: {
      useSuspense: false,
    },
  });

// Keep <html lang="..."> in sync with i18n language.
// Native browser components (e.g., <input type="time"> AM/PM, date pickers,
// number formatting, hyphenation) read this attribute to choose their locale,
// so leaving it stale causes Korean "오전/오후" to appear in non-Korean UIs.
const syncHtmlLang = (lng: string) => {
  if (typeof document !== 'undefined' && document.documentElement) {
    document.documentElement.setAttribute('lang', lng);
  }
};
i18n.on('languageChanged', syncHtmlLang);
i18n.on('initialized', () => syncHtmlLang(i18n.language));

export default i18n;
