import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';

const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'ms', label: 'Melayu', flag: '🇲🇾' },
];

interface LanguageSelectorProps {
  variant?: 'dropdown' | 'compact' | 'sidebar' | 'icon' | 'globe';
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ variant = 'dropdown' }) => {
  const { i18n } = useTranslation();
  const { user, updateLanguage } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find(l => l.code === i18n.language) || LANGUAGES[0];

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSelect = async (code: string) => {
    setOpen(false);
    if (code === i18n.language) return;

    if (user) {
      await updateLanguage(code);
    } else {
      await i18n.changeLanguage(code);
      localStorage.setItem('i18nextLng', code);
    }
  };

  // Icon-only variant for mobile header
  if (variant === 'icon') {
    return (
      <Container ref={ref}>
        <IconToggle onClick={() => setOpen(!open)}>
          {currentLang.flag}
        </IconToggle>
        {open && (
          <Dropdown $direction="down">
            {LANGUAGES.map(lang => (
              <Option key={lang.code} $active={lang.code === i18n.language} onClick={() => handleSelect(lang.code)}>
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
                {lang.code === i18n.language && <Check>✓</Check>}
              </Option>
            ))}
          </Dropdown>
        )}
      </Container>
    );
  }

  // Globe variant: modern globe icon + language code for landing pages
  if (variant === 'globe') {
    return (
      <Container ref={ref}>
        <GlobeToggle onClick={() => setOpen(!open)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M2 12h20"/>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>
          <span>{currentLang.code.toUpperCase()}</span>
        </GlobeToggle>
        {open && (
          <GlobeDropdown>
            {LANGUAGES.map(lang => (
              <GlobeOption
                key={lang.code}
                $active={lang.code === i18n.language}
                onClick={() => handleSelect(lang.code)}
              >
                <span style={{ fontSize: '15px' }}>{lang.flag}</span>
                <GlobeLabel>
                  <span>{lang.label}</span>
                  <GlobeCode>{lang.code.toUpperCase()}</GlobeCode>
                </GlobeLabel>
                {lang.code === i18n.language && <Check>✓</Check>}
              </GlobeOption>
            ))}
          </GlobeDropdown>
        )}
      </Container>
    );
  }

  // Sidebar variant: full-width bar
  if (variant === 'sidebar') {
    return (
      <Container ref={ref} style={{ width: '100%' }}>
        <SidebarToggle onClick={() => setOpen(!open)}>
          <SidebarLeft>
            <FlagCircle>{currentLang.flag}</FlagCircle>
            <SidebarLabel>{currentLang.label}</SidebarLabel>
          </SidebarLeft>
          <Arrow $open={open}>▾</Arrow>
        </SidebarToggle>
        {open && (
          <Dropdown $direction="up">
            {LANGUAGES.map(lang => (
              <Option key={lang.code} $active={lang.code === i18n.language} onClick={() => handleSelect(lang.code)}>
                <FlagCircle>{lang.flag}</FlagCircle>
                <span>{lang.label}</span>
                {lang.code === i18n.language && <Check>✓</Check>}
              </Option>
            ))}
          </Dropdown>
        )}
      </Container>
    );
  }

  // Default & compact
  const isCompact = variant === 'compact';

  return (
    <Container ref={ref}>
      <Toggle onClick={() => setOpen(!open)} $compact={isCompact}>
        <span>{currentLang.flag}</span>
        {!isCompact && <span>{currentLang.label}</span>}
        <Arrow $open={open}>▾</Arrow>
      </Toggle>
      {open && (
        <Dropdown $direction="down">
          {LANGUAGES.map(lang => (
            <Option key={lang.code} $active={lang.code === i18n.language} onClick={() => handleSelect(lang.code)}>
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
              {lang.code === i18n.language && <Check>✓</Check>}
            </Option>
          ))}
        </Dropdown>
      )}
    </Container>
  );
};

export default LanguageSelector;

// ─── Styled ─────────────────────────────────────────

const Container = styled.div`
  position: relative;
  display: inline-flex;
`;

const GlobeToggle = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: transparent;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 20px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  color: #1F2937;
  transition: all 0.2s;
  letter-spacing: 0.3px;

  svg { color: #4B5563; }

  &:hover {
    background: rgba(0, 0, 0, 0.04);
    border-color: rgba(0, 0, 0, 0.2);
  }
`;

const GlobeDropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 180px;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  /* Sits above Landing header (1500) and any in-page banner / hero. */
  z-index: 1600;
  overflow: hidden;
  padding: 4px;
`;

const GlobeOption = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 12px;
  border: none;
  border-radius: 8px;
  background: ${({ $active }) => $active ? '#F0EEFF' : 'transparent'};
  cursor: pointer;
  font-size: 14px;
  color: ${({ $active }) => $active ? '#635BFF' : '#1F2937'};
  font-weight: ${({ $active }) => $active ? 600 : 400};
  transition: background 0.15s;

  &:hover {
    background: ${({ $active }) => $active ? '#F0EEFF' : '#F5F5F5'};
  }
`;

const GlobeLabel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1px;
  font-size: 14px;
`;

const GlobeCode = styled.span`
  font-size: 11px;
  color: #6B7280;
  font-weight: 400;
`;

const Toggle = styled.button<{ $compact: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ $compact }) => $compact ? '4px' : '8px'};
  padding: ${({ $compact }) => $compact ? '6px 8px' : '6px 12px'};
  background: transparent;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  color: #1F2937;
  transition: all 0.15s;

  &:hover {
    background: #F9FAFB;
    border-color: #6B7280;
  }
`;

const IconToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: none;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  transition: background 0.15s;

  &:hover {
    background: #F1F4F8;
  }
`;

const SidebarToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 16px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 13px;
  color: #1F2937;
  transition: background 0.15s;
  border-radius: 0;

  &:hover {
    background: #F1F4F8;
  }
`;

const SidebarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SidebarLabel = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: #374151;
`;

const FlagCircle = styled.span`
  font-size: 16px;
  line-height: 1;
`;

const Arrow = styled.span<{ $open: boolean }>`
  font-size: 10px;
  color: #6B7280;
  transition: transform 0.15s;
  transform: ${({ $open }) => $open ? 'rotate(180deg)' : 'none'};
`;

const Dropdown = styled.div<{ $direction?: 'up' | 'down' }>`
  position: absolute;
  ${({ $direction }) => $direction === 'up'
    ? 'bottom: calc(100% + 4px);'
    : 'top: calc(100% + 4px);'}
  left: 0;
  right: 0;
  min-width: 170px;
  background: white;
  border: 1px solid #C7CED6;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
  /* Sits above Landing header (1500) and any in-page banner / hero. */
  z-index: 1600;
  overflow: hidden;
`;

const Option = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 14px;
  border: none;
  background: ${({ $active }) => $active ? '#F0EEFF' : 'transparent'};
  cursor: pointer;
  font-size: 14px;
  color: ${({ $active }) => $active ? '#635BFF' : '#1F2937'};
  font-weight: ${({ $active }) => $active ? 600 : 400};
  transition: background 0.1s;

  &:hover {
    background: ${({ $active }) => $active ? '#F0EEFF' : '#F9FAFB'};
  }
`;

const Check = styled.span`
  margin-left: auto;
  color: #635BFF;
  font-size: 14px;
`;
