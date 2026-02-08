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
  seo_title: 'PurpleHere - Cloud POS System',
  seo_description: 'Subscription-based cloud POS system for restaurants, brands, and food courts.',
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
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/site-settings');
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
