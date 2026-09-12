import styled from 'styled-components';

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

/**
 * 필수 표시 — 공용 한 곳 (UI_DESIGN_GUIDE.md §4.3-1 · 2026-09-12 Irene 지시)
 *
 * `<FormLabel required>` 면 라벨 뒤에 빨간 별이 붙는다.
 *  · 기준은 **서버가 400 으로 막는 칸**만. 서버가 안 막으면 붙이지 않는다.
 *  · 선택 칸에는 아무 표시도 하지 않는다(「선택」 배지 금지).
 *  · 표시는 저장을 막지 않는다 — 버튼은 항상 활성(§4.4).
 * ⛔ 화면마다 로컬 RequiredStar 를 새로 만들지 않는다.
 */
export const FormLabel = styled.label<{ required?: boolean }>`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #4B5563;
  margin-bottom: 8px;

  ${props => props.required && `
    &::after {
      content: ' *';
      color: #EF4444;
      font-weight: 600;
    }
  `}
`;

export const FormInput = styled.input`
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  padding: 10px 12px;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.15s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:disabled {
    background: #F1F4F8;
    color: #4B5563;
    cursor: not-allowed;
  }
`;

export const FormSelect = styled.select`
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  padding: 10px 12px;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: all 0.15s;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:disabled {
    background: #F1F4F8;
    color: #4B5563;
    cursor: not-allowed;
  }
`;

export const FormTextArea = styled.textarea`
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  padding: 10px 12px;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 100px;
  transition: all 0.15s;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:disabled {
    background: #F1F4F8;
    color: #4B5563;
    cursor: not-allowed;
  }
`;

export const FormError = styled.div`
  color: #DC2626;
  font-size: 12px;
  margin-top: 4px;
`;

export const FormHelperText = styled.div`
  color: #4B5563;
  font-size: 12px;
  margin-top: 4px;
`;