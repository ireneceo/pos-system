import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SiteSettings {
  site_name: string;
  brand_logo_url: string | null;
  favicon_url: string | null;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string | null;
  og_image_url: string | null;
  contact_email?: string | null;
  contact_phone?: string | null;
}

interface SiteSettingsContextType {
  settings: SiteSettings;
  loading: boolean;
}

const defaultSettings: SiteSettings = {
  site_name: 'PurpleHere',
  brand_logo_url: null,
  favicon_url: null,
  seo_title: 'Solving Real F&B Problems - Purple Here',
  seo_description: 'Solving Real F&B Problems — Purple Here. POS, ordering, kitchen, inventory, and analytics built for restaurants, brands, and food courts.',
  seo_keywords: null,
  og_image_url: null,
  contact_email: null,
  contact_phone: null
};

const SiteSettingsContext = createContext<SiteSettingsContextType>({
  settings: defaultSettings,
  loading: true
});

export const useSiteSettings = () => useContext(SiteSettingsContext);

export const SiteSettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 언마운트/이동 시 요청을 **우리가 명시적으로 취소**하고, catch 에서는 그 취소만 골라 침묵시킨다.
    // ⛔ 에러 메시지 문자열("Failed to fetch")로 거르지 않는다 — 같은 문자열이 진짜 네트워크 장애에서도
    //    나오므로, 그렇게 하면 실장애까지 덮는 새 fail-silent 가 된다.
    const controller = new AbortController();
    fetchSettings(controller.signal);
    return () => controller.abort();
  }, []);

  const fetchSettings = async (signal?: AbortSignal) => {
    try {
      const response = await fetch('/api/site-settings', { signal });
      if (response.ok) {
        const data = await response.json();
        setSettings({
          site_name: data.site_name || defaultSettings.site_name,
          brand_logo_url: data.brand_logo_url,
          favicon_url: data.favicon_url,
          seo_title: data.seo_title,
          seo_description: data.seo_description,
          seo_keywords: data.seo_keywords,
          og_image_url: data.og_image_url,
          contact_email: data.contact_email,
          contact_phone: data.contact_phone
        });
      }
    } catch (error) {
      // 우리가 취소한 요청은 실패가 아니다 — 조용히 끝낸다(로딩 상태도 건드리지 않는다).
      if (signal?.aborted || (error as Error)?.name === 'AbortError') return;
      console.error('Failed to load site settings:', error);
    }
    setLoading(false);
  };

  return (
    <SiteSettingsContext.Provider value={{ settings, loading }}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

export default SiteSettingsContext;
