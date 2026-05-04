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
      'purchaseOrders', 'purchaseInvoices', 'referrals', 'billing'
    ],
    defaultNS: 'common',

    backend: {
      loadPath: `/locales/{{lng}}/{{ns}}.json?v=${I18N_CACHE_BUST}`,
    },

    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
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

export default i18n;
