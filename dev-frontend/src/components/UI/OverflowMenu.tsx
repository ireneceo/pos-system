import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

/**
 * OverflowMenu — kebab (⋯) menu trigger + dropdown panel.
 *
 * Used on Floor Plan / POS Terminal headers to collapse rarely-used actions on
 * narrow screens (≤1280px, e.g. 10-inch tablets) so the visible toolbar stays
 * usable. Matches Toast / Square / Linear overflow-menu pattern.
 *
 * Behaviour:
 *  - Click outside or press Escape to close.
 *  - Right-aligned dropdown anchored to the trigger.
 *  - Each item runs its onClick then auto-closes the menu.
 */
export interface OverflowMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  variant?: 'default' | 'destructive';
  disabled?: boolean;
  /** Highlight indicator dot (e.g. "auto-open enabled"). */
  indicator?: boolean;
}

interface OverflowMenuProps {
  items: OverflowMenuItem[];
  ariaLabel?: string;
  /** Override trigger label — defaults to "More". */
  triggerTitle?: string;
}

const OverflowMenu: React.FC<OverflowMenuProps> = ({ items, ariaLabel = 'More actions', triggerTitle = 'More' }) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  const handleSelect = (item: OverflowMenuItem) => {
    if (item.disabled) return;
    setOpen(false);
    // Run after the close paint so the dropdown disappearance feels immediate.
    setTimeout(() => item.onClick(), 0);
  };

  return (
    <Wrapper ref={wrapperRef}>
      <Trigger
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="menu"
        aria-expanded={open}
        title={triggerTitle}
        onClick={() => setOpen(prev => !prev)}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <circle cx="5" cy="12" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="19" cy="12" r="2" />
        </svg>
      </Trigger>
      {open && (
        <Panel role="menu" aria-label={ariaLabel}>
          {items.map(item => (
            <MenuItem
              key={item.id}
              type="button"
              role="menuitem"
              $destructive={item.variant === 'destructive'}
              disabled={item.disabled}
              onClick={() => handleSelect(item)}
            >
              {item.icon && <IconSlot aria-hidden="true">{item.icon}</IconSlot>}
              <Label>{item.label}</Label>
              {item.indicator && <Indicator aria-hidden="true" />}
            </MenuItem>
          ))}
        </Panel>
      )}
    </Wrapper>
  );
};

export default OverflowMenu;

const Wrapper = styled.div`
  position: relative;
  display: inline-flex;
`;

const Trigger = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: white;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  color: #1F2937;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;

  &:hover {
    background: #F1F4F8;
    border-color: #B0BEC5;
  }

  &:focus-visible {
    outline: 2px solid rgba(99, 91, 255, 0.35);
    outline-offset: 1px;
  }
`;

const Panel = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  min-width: 200px;
  background: white;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 12px;
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.12), 0 2px 6px rgba(15, 23, 42, 0.06);
  padding: 6px;
  z-index: 1600;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const MenuItem = styled.button<{ $destructive?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 12px;
  background: transparent;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  color: ${p => p.$destructive ? '#DC2626' : '#1F2937'};
  cursor: pointer;
  text-align: left;
  transition: background 0.12s;
  white-space: nowrap;

  &:hover:not(:disabled) {
    background: ${p => p.$destructive ? 'rgba(220, 38, 38, 0.08)' : '#F4F6F9'};
  }

  &:focus-visible {
    outline: 2px solid rgba(99, 91, 255, 0.35);
    outline-offset: -2px;
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

const IconSlot = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  color: currentColor;
  flex-shrink: 0;

  svg { width: 16px; height: 16px; }
`;

const Label = styled.span`
  flex: 1;
`;

const Indicator = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #635BFF;
  flex-shrink: 0;
`;
