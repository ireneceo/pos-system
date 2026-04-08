import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

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
      'validation'
    ],
    defaultNS: 'common',

    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
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
