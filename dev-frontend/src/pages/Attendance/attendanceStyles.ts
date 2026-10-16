import styled from 'styled-components';

// 출퇴근 화면 공용 모양 — 표·버튼·창은 공용 컴포넌트를 쓰고, 여기는 카드·배지·줄 배치만.

export const Card = styled.div`
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
`;

export const CardTitle = styled.h3`
  margin: 0 0 12px;
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
`;

export const Muted = styled.div`
  color: #6B7280;
  font-size: 13px;
  line-height: 1.5;
`;

export const Row = styled.div<{ gap?: number; wrap?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${p => p.gap ?? 12}px;
  flex-wrap: ${p => (p.wrap === false ? 'nowrap' : 'wrap')};
`;

export const Spacer = styled.div`
  flex: 1;
`;

export const Badge = styled.span<{ tone?: 'green' | 'gray' | 'amber' | 'red' | 'purple' | 'blue' }>`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  ${p => {
    switch (p.tone) {
      case 'green': return 'background:#ECFDF5;color:#047857;';
      case 'amber': return 'background:#FFFBEB;color:#B45309;';
      case 'red': return 'background:#FEF2F2;color:#B91C1C;';
      case 'purple': return 'background:#EEF2FF;color:#4F46E5;';
      case 'blue': return 'background:#EFF6FF;color:#1D4ED8;';
      default: return 'background:#F3F4F6;color:#4B5563;';
    }
  }}
`;

export const Dot = styled.span<{ color?: string | null }>`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 6px;
  background: ${p => p.color || '#9CA3AF'};
`;

export const ErrorBox = styled.div`
  background: #FEF2F2;
  border: 1px solid #FECACA;
  color: #B91C1C;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  font-size: 14px;
  line-height: 1.5;
`;

export const InfoBox = styled.div`
  background: #F5F3FF;
  border: 1px solid #DDD6FE;
  color: #4C1D95;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  font-size: 14px;
  line-height: 1.5;
`;

export const PersonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
`;

export const PersonCard = styled.div<{ warn?: boolean }>`
  border: 1px solid ${p => (p.warn ? '#FCD34D' : '#E5E7EB')};
  background: ${p => (p.warn ? '#FFFBEB' : '#FFFFFF')};
  border-radius: 10px;
  padding: 14px 16px;
`;

export const PersonName = styled.div`
  font-weight: 600;
  color: #0A2540;
  font-size: 14px;
  margin-bottom: 4px;
`;

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;
  color: #374151;
  font-weight: 500;
  min-width: 160px;
`;

export const TextInput = styled.input`
  height: 38px;
  padding: 0 12px;
  border: 1px solid #D1D5DB;
  border-radius: 8px;
  font-size: 14px;
  color: #111827;
  background: #FFFFFF;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.15); }
`;

export const TextArea = styled.textarea`
  padding: 10px 12px;
  border: 1px solid #D1D5DB;
  border-radius: 8px;
  font-size: 14px;
  min-height: 72px;
  resize: vertical;
  font-family: inherit;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.15); }
`;

export const Select = styled.select`
  height: 38px;
  padding: 0 10px;
  border: 1px solid #D1D5DB;
  border-radius: 8px;
  font-size: 14px;
  background: #FFFFFF;
  color: #111827;
`;

export const Toggle = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 14px;
  color: #111827;
  cursor: pointer;
  padding: 8px 0;
  input { margin-top: 3px; width: 16px; height: 16px; accent-color: #635BFF; }
`;

export const Mono = styled.span`
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 13px;
`;
