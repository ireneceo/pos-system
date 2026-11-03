import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// 번역 파일 주소 끝 표시 = 이번 빌드의 main.<지문>.js 지문 (2026-11-03 운영 속도 점검).
//   예전엔 Date.now() 라 새로고침마다 주소가 바뀌어 39개 묶음(영어만 ~750KB)을 매번 다시 받았다.
//   빌드 지문이면 같은 빌드 안에서는 브라우저가 저장본을 쓰고, 새 배포(새 지문)에서만 새로 받는다.
//   지문을 못 읽으면(개발 서버 npm start 등) 옛 방식 그대로 — 번역이 낡을 일은 없다.
//   같은 지문 읽기는 index.tsx 의 서비스워커 등록(?b=) 과 같다.
const I18N_CACHE_BUST = (() => {
  try {
    const s = typeof document !== 'undefined'
      ? (document.querySelector('script[src*="/static/js/main."]') as HTMLScriptElement | null)
      : null;
    const m = s?.src.match(/main\.([a-f0-9]+)\.js/);
    if (m) return m[1];
  } catch { /* 아래 옛 방식 */ }
  return Date.now().toString();
})();

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
      'printDiagnostics', 'attendance', 'profitability'
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
