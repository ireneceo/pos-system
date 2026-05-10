import styled from 'styled-components';

/**
 * Responsive form grid components.
 * Replace inline `<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>`
 * with `<FormGrid2>` so the layout collapses to a single column on mobile.
 *
 * Breakpoints:
 *   ≤768px → all stacks become a single column
 *   ≤1024px (FormGrid4 only) → 4-col falls back to 2-col first
 */

const baseGrid = `
  display: grid;
  gap: 16px;
  width: 100%;
`;

export const FormGrid2 = styled.div`
  ${baseGrid}
  grid-template-columns: 1fr 1fr;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FormGrid3 = styled.div`
  ${baseGrid}
  grid-template-columns: 1fr 1fr 1fr;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const FormGrid4 = styled.div`
  ${baseGrid}
  grid-template-columns: 1fr 1fr 1fr 1fr;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;
