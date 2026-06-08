import React from 'react';
import styled from 'styled-components';

/**
 * Shared emoji picker grid — the same 60-emoji set used by restaurant category
 * management (Settings > Categories). Use anywhere a category/item emoji is
 * chosen so brand and restaurant pickers stay consistent.
 */
export const CATEGORY_EMOJI_OPTIONS = [
  '🍔', '🍕', '🍗', '🥗', '🍜', '🍝', '🍤', '🥘', '🍛', '🍲',
  '☕', '🥤', '🧃', '🍵', '🧋', '🍺', '🍷', '🥃', '🍹', '🍸',
  '🍰', '🧁', '🍪', '🍩', '🍨', '🍧', '🍦', '🍮', '🍭', '🍫',
  '🥐', '🥖', '🍞', '🥨', '🥯', '🧇', '🥞', '🍳', '🥚', '🧈',
  '🍱', '🍙', '🍘', '🍣', '🍥', '🍡', '🍢', '🍠', '🥟', '🥠',
  '🌮', '🌯', '🥙', '🫔', '🥪', '🌭', '🍟', '🫓', '🥓', '🧆'
];

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 4px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
  background: #F9FAFB;
  border-radius: 8px;
`;

const Option = styled.button<{ selected?: boolean }>`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 4px;
  background: ${props => (props.selected ? '#C7CED6' : 'white')};
  border: 1px solid ${props => (props.selected ? '#6B7280' : '#C7CED6')};
  cursor: pointer;
  transition: all 0.2s;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${props => (props.selected ? '#C7CED6' : '#F1F4F8')};
  }
`;

interface Props {
  value: string;
  onChange: (emoji: string) => void;
  options?: string[];
}

const EmojiPickerField: React.FC<Props> = ({ value, onChange, options }) => {
  const list = options && options.length ? options : CATEGORY_EMOJI_OPTIONS;
  return (
    <Grid>
      {list.map((emoji) => (
        <Option
          key={emoji}
          type="button"
          selected={value === emoji}
          onClick={() => onChange(value === emoji ? '' : emoji)}
        >
          {emoji}
        </Option>
      ))}
    </Grid>
  );
};

export default EmojiPickerField;
