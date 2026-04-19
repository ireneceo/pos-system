import React, { createContext, useContext, useCallback } from 'react';
import styled from 'styled-components';

export type SectionStatus = 'complete' | 'required' | 'optional' | 'empty';

interface AccordionContextValue {
  expanded: Set<string>;
  toggle: (id: string) => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

interface FormAccordionProps {
  expanded: Set<string>;
  onChange: (next: Set<string>) => void;
  children: React.ReactNode;
}

export const FormAccordion: React.FC<FormAccordionProps> = ({ expanded, onChange, children }) => {
  const toggle = useCallback((id: string) => {
    const next = new Set(expanded);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onChange(next);
  }, [expanded, onChange]);

  return (
    <AccordionContext.Provider value={{ expanded, toggle }}>
      <Wrapper>{children}</Wrapper>
    </AccordionContext.Provider>
  );
};

interface FormAccordionSectionProps {
  id: string;
  title: string;
  status?: SectionStatus;
  statusLabel?: string;
  children: React.ReactNode;
}

export const FormAccordionSection: React.FC<FormAccordionSectionProps> = ({
  id, title, status = 'optional', statusLabel, children
}) => {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error('FormAccordionSection must be inside FormAccordion');
  const isOpen = ctx.expanded.has(id);

  return (
    <SectionWrap id={`section-${id}`} data-section={id}>
      <Header onClick={() => ctx.toggle(id)} aria-expanded={isOpen} aria-controls={`panel-${id}`} type="button">
        <HeaderLeft>
          <Chevron open={isOpen}>▶</Chevron>
          <Title>{title}</Title>
        </HeaderLeft>
        {statusLabel && <StatusBadge status={status}>{statusLabel}</StatusBadge>}
      </Header>
      {isOpen && <Panel id={`panel-${id}`} role="region">{children}</Panel>}
    </SectionWrap>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid #E6EBF1;
  margin-bottom: 20px;
`;

const SectionWrap = styled.div`
  border-bottom: 1px solid #E6EBF1;
`;

const Header = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 14px 4px;
  background: transparent;
  border: 0;
  cursor: pointer;
  text-align: left;

  &:hover { background: #F8FAFC; }

  @media (max-width: 768px) {
    padding: 12px 4px;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Chevron = styled.span<{ open: boolean }>`
  display: inline-block;
  font-size: 10px;
  color: #6B7C93;
  transform: rotate(${p => p.open ? '90deg' : '0deg'});
  transition: transform 0.15s ease;
  width: 10px;
`;

const Title = styled.span`
  font-weight: 600;
  font-size: 15px;
  color: #0A2540;
`;

const StatusBadge = styled.span<{ status: SectionStatus }>`
  font-size: 12px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 12px;
  ${p => {
    switch (p.status) {
      case 'complete':
        return `background: #D1FAE5; color: #065F46;`;
      case 'required':
        return `background: #FEF3C7; color: #92400E;`;
      case 'optional':
        return `background: transparent; color: #9CA3AF;`;
      case 'empty':
      default:
        return `background: transparent; color: #9CA3AF;`;
    }
  }}
`;

const Panel = styled.div`
  padding: 4px 0 20px;

  @media (max-width: 768px) {
    padding: 4px 0 16px;
  }
`;
