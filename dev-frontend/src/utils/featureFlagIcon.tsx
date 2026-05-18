import React from 'react';
import { Check, X } from 'lucide-react';

/**
 * Render a feature-flag value as a lucide icon instead of ✓/✗ emoji.
 * Accepts: '✓' / '✗' / 'true' / 'false' / boolean — anything else renders as plain text.
 *
 * Why: Purple POS design guide bans decorative emoji in UI (memory: feedback_no_emoji_icons).
 * Centralizing the rendering lets us migrate older feature tables without
 * touching every callsite's data shape.
 */
export const renderFeatureFlag = (v: string | boolean | number | null | undefined) => {
  if (v === '✓' || v === true || v === 'true' || v === 'yes') {
    return <Check size={16} style={{ color: '#10B981' }} aria-label="Yes" />;
  }
  if (v === '✗' || v === '✘' || v === false || v === 'false' || v === 'no') {
    return <X size={16} style={{ color: '#D1D5DB' }} aria-label="No" />;
  }
  return <span style={{ color: '#0A2540', fontSize: 14 }}>{v as string}</span>;
};
