import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface BrandTheme {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  logo?: string;
}

interface BrandThemeContextType {
  theme: BrandTheme;
  setTheme: (theme: BrandTheme) => void;
  resetTheme: () => void;
  isDefaultTheme: boolean;
}

const defaultTheme: BrandTheme = {
  primaryColor: '#8B5CF6', // Default purple
  secondaryColor: '#A78BFA',
  accentColor: '#C4B5FD',
};

const BrandThemeContext = createContext<BrandThemeContextType | undefined>(undefined);

interface BrandThemeProviderProps {
  children: ReactNode;
}

export const BrandThemeProvider: React.FC<BrandThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<BrandTheme>(defaultTheme);

  const setTheme = (newTheme: BrandTheme) => {
    setThemeState(newTheme);
    // Apply CSS custom properties for dynamic theming
    document.documentElement.style.setProperty('--brand-primary', newTheme.primaryColor);
    document.documentElement.style.setProperty('--brand-secondary', newTheme.secondaryColor);
    document.documentElement.style.setProperty('--brand-accent', newTheme.accentColor);
  };

  const resetTheme = () => {
    setTheme(defaultTheme);
  };

  const isDefaultTheme = theme.primaryColor === defaultTheme.primaryColor;

  useEffect(() => {
    // Initialize theme on mount
    setTheme(theme);
  }, []);

  return (
    <BrandThemeContext.Provider value={{ theme, setTheme, resetTheme, isDefaultTheme }}>
      {children}
    </BrandThemeContext.Provider>
  );
};

export const useBrandTheme = (): BrandThemeContextType => {
  const context = useContext(BrandThemeContext);
  if (!context) {
    // BrandThemeProvider가 없는 경우 기본값 반환
    return {
      theme: defaultTheme,
      setTheme: () => {},
      resetTheme: () => {},
      isDefaultTheme: true
    };
  }
  return context;
};