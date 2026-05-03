/**
 * PlanBadge — header chip showing current subscription plan.
 *
 * Resolves the active plan from useAllowedRoutes hook (plan_type) and renders
 * a compact label in the dashboard header. Hidden when role has no plan
 * (System Admin) or while loading.
 */
import React from 'react';
import styled from 'styled-components';

const Pill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  background: linear-gradient(135deg, #635BFF 0%, #7C3AED 100%);
  color: #fff;
  border-radius: 16px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.3px;
  white-space: nowrap;
  box-shadow: 0 1px 3px rgba(99, 91, 255, 0.25);

  @media (max-width: 768px) {
    padding: 3px 8px;
    font-size: 10px;
  }
`;

const Dot = styled.span`
  width: 6px;
  height: 6px;
  background: #fff;
  border-radius: 50%;
  opacity: 0.9;
`;

interface Props {
  planType: string | null | undefined;
  loading?: boolean;
}

export default function PlanBadge({ planType, loading }: Props) {
  if (loading) return null;
  if (!planType) return null;
  return (
    <Pill title={`Current plan: ${planType}`}>
      <Dot />
      {planType}
    </Pill>
  );
}
