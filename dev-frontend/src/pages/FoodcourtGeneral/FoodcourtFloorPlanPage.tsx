// Foodcourt Floor Plan VIEW — mirrors Restaurant /floor-plan standalone page.
// Structure cloned from /pages/FloorPlan/FloorPlanPage.tsx. Units shown as shapes;
// click → right-side detail panel with contract + tenancy + restaurant info.
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useAllowedRoutes } from '../../hooks/useAllowedRoutes';
import { FloorPlanData, FloorTable, TableStatusInfo } from '../FloorPlan/types';
import FloorPlanCanvas from '../FloorPlan/FloorPlanCanvas';
import FoodcourtUnitNode, { UnitDisplay, UnitDisplayStatus } from './FoodcourtUnitNode';
import { useTranslation } from 'react-i18next';
import { getAuthToken } from '../../utils/auth';
import { getCurrencySymbol } from '../../utils/currency';
import { Button } from '../../components/Button';
import EmptyState from '../../components/Common/EmptyState';

// ───── Types ─────
interface Branch { id: number; name: string; code: string; foodcourt_id: number; is_primary?: boolean; country?: string; }
interface UnitCurrentContract {
  id: number;
  contract_number?: string | null;
  stage?: string | null;
  contract_type?: string | null;
  applicant_company_name?: string | null;
  applicant_contact_person?: string | null;
  applicant_email?: string | null;
  applicant_phone?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  signing_date?: string | null;
  duration_months?: number | null;
  renewal_type?: string | null;
  renewal_alert_months?: number | null;
  termination_notice_months?: number | null;
  financial_terms?: Record<string, any> | null;
  financial_redacted?: boolean;
  exclusivity_terms?: Record<string, any> | null;
  renewal_policy?: Record<string, any> | null;
  restaurant?: { id: number; name: string; branch_name?: string | null; logo_url?: string | null; brand_id?: number | null } | null;
}
interface FoodcourtUnit {
  id: number; unit_number: string; status: string;
  size_value?: number | null;
  size_unit?: 'sqft' | 'sqm' | null;
  plan_x: number | null; plan_y: number | null;
  plan_width: number | null; plan_height: number | null;
  plan_shape: string | null;
  location_description?: string | null;
  current_contract_id?: number | null;
  currentContract?: UnitCurrentContract | null;
  billing_gap?: boolean;
}
interface FloorPlan {
  id: number; branch_id: number; floor_name: string;
  canvas_width: number; canvas_height: number; grid_size: number; show_grid: boolean;
  units: FoodcourtUnit[];
}
interface ContractDetail {
  id: number;
  contract_number?: string;
  stage: string;
  contract_type?: string;
  applicant_company_name?: string;
  applicant_contact_person?: string;
  applicant_email?: string;
  applicant_phone?: string;
  start_date?: string;
  end_date?: string;
  signing_date?: string;
  duration_months?: number;
  renewal_type?: string;
  renewal_alert_months?: number;
  termination_notice_months?: number;
  financial_terms?: Record<string, any> | null;
  financial_redacted?: boolean;
  exclusivity_terms?: Record<string, any> | null;
  renewal_policy?: Record<string, any> | null;
  restaurant?: { id: number; name: string; status?: string; logo_url?: string | null; branch_name?: string | null; brand_id?: number | null } | null;
  created_at?: string;
}

// ───── Styled (cloned from FloorPlanPage.tsx) ─────
const PageContainer = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #FAFBFC; height: 100vh;
  display: flex; flex-direction: column; overflow: hidden;
`;
const Header = styled.div`
  background: white; padding: 12px 24px; border-bottom: 1px solid #E6EBF1;
  display: flex; justify-content: space-between; align-items: center; flex-shrink: 0;
`;
const HeaderLeft = styled.div`display: flex; align-items: center; gap: 16px;`;
const HeaderTitle = styled.h1`font-size: 20px; font-weight: 700; color: #0A2540; margin: 0;`;
const Clock = styled.div`font-size: 14px; font-weight: 600; color: #0A2540; font-variant-numeric: tabular-nums;`;
const HeaderRight = styled.div`display: flex; align-items: center; gap: 12px;`;
const EditBtn = styled.button`
  padding: 6px 14px; border-radius: 6px; font-size: 12px; font-weight: 600;
  cursor: pointer; transition: all .15s; border: 1px solid #E6EBF1;
  background: white; color: #374151;
  &:hover { background: #F3F4F6; border-color: #D1D9E0; }
`;
const PrimaryBtn = styled(EditBtn)`
  background: #635BFF; color: white; border-color: #635BFF;
  &:hover { background: #5A51E6; border-color: #5A51E6; }
`;

const Select = styled.select`
  padding: 5px 10px; border: 1px solid #E6EBF1; border-radius: 6px;
  font-size: 13px; background: white; cursor: pointer;
`;

const MainContent = styled.div`flex: 1; display: flex; min-height: 0;`;
const CanvasWrapper = styled.div`
  flex: 1; padding: 16px 24px;
  display: flex; flex-direction: column; min-height: 0; min-width: 0;
  @media (max-width: 768px) { padding: 12px; }
`;

// Right-side detail panel
const DetailPanel = styled.div`
  width: 360px; flex-shrink: 0;
  background: white; border-left: 1px solid #E6EBF1;
  display: flex; flex-direction: column; overflow: hidden;
`;
const PanelHeader = styled.div`
  padding: 16px 20px; border-bottom: 1px solid #E6EBF1;
  display: flex; justify-content: space-between; align-items: center;
`;
const PanelBody = styled.div`flex: 1; overflow-y: auto; padding: 16px 20px;`;
const PanelClose = styled.button`
  background: none; border: none; cursor: pointer; color: #6B7C93; font-size: 18px; padding: 0 4px;
  &:hover { color: #0A2540; }
`;
const Section = styled.div`margin-bottom: 20px;`;
const SectionTitle = styled.div`
  font-size: 11px; font-weight: 600; color: #6B7C93;
  text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px;
`;
const Row = styled.div`
  display: flex; justify-content: space-between; font-size: 13px;
  padding: 5px 0; color: #4B5563;
  b { color: #0A2540; text-align: right; }
`;
const Badge = styled.span<{ $bg: string }>`
  display: inline-block; padding: 2px 10px; border-radius: 10px;
  font-size: 11px; font-weight: 600; color: white; background: ${p => p.$bg};
`;
const BigTitle = styled.div`
  font-size: 22px; font-weight: 700; color: #0A2540; margin-bottom: 4px;
  display: flex; align-items: center; gap: 10px;
`;
const EmptyHint = styled.div`font-size: 13px; color: #9CA3AF; font-style: italic; padding: 8px 0;`;
const RestaurantCard = styled.div`
  display: flex; align-items: center; gap: 12px; padding: 10px;
  background: #F8FAFC; border-radius: 8px; border: 1px solid #E6EBF1;
`;
const RestaurantLogo = styled.div<{ $src?: string }>`
  width: 42px; height: 42px; border-radius: 6px;
  background: ${p => p.$src ? `url(${p.$src}) center/cover` : '#E6EBF1'};
  flex-shrink: 0;
`;

const LoadingScreen = styled.div`
  flex: 1; display: flex; align-items: center; justify-content: center;
  color: #6B7C93; font-size: 14px;
`;

// ───── New styled for §1-§6 panel redesign ─────
const Banner = styled.div<{ $bg: string; $text: string; $border: string }>`
  padding: 10px 12px;
  background: ${p => p.$bg};
  color: ${p => p.$text};
  border: 1px solid ${p => p.$border};
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 16px;
  line-height: 1.4;
`;
const TileGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 12px;
`;
const Tile = styled.div<{ $color: string }>`
  padding: 10px;
  border-radius: 6px;
  background: #F8FAFC;
  border-left: 3px solid ${p => p.$color};
`;
const TileLabel = styled.div`
  font-size: 10px; font-weight: 600; color: #6B7C93;
  text-transform: uppercase; letter-spacing: 0.3px;
  margin-bottom: 4px;
`;
const TileValue = styled.div`
  font-size: 14px; font-weight: 700; color: #0A2540;
  line-height: 1.2;
`;
const TileUnit = styled.span`
  font-size: 11px; font-weight: 500; color: #6B7C93;
  margin-left: 3px;
`;
const TotalRow = styled.div`
  display: flex; justify-content: space-between;
  margin-top: 8px;
  padding: 8px 10px;
  background: #635BFF0A;
  border-radius: 6px;
  font-size: 13px; font-weight: 600; color: #0A2540;
  b { color: #635BFF; }
`;
const Timeline = styled.div`
  display: flex; align-items: flex-start; gap: 0;
  padding: 4px 0;
`;
const TimelineStep = styled.div<{ $active: boolean; $past: boolean; $last: boolean }>`
  flex: 1;
  display: flex; flex-direction: column; align-items: center;
  position: relative;
  &:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 5px; left: 50%; right: -50%;
    height: 2px;
    background: ${p => p.$past ? '#635BFF' : '#E6EBF1'};
    z-index: 0;
  }
`;
const TimelineDot = styled.div<{ $active: boolean; $past: boolean }>`
  width: 12px; height: 12px;
  border-radius: 50%;
  background: ${p => p.$active ? '#635BFF' : p.$past ? '#635BFF' : '#E6EBF1'};
  border: 2px solid ${p => p.$active ? '#635BFF' : 'white'};
  box-shadow: ${p => p.$active ? '0 0 0 3px rgba(99, 91, 255, 0.2)' : 'none'};
  z-index: 1;
`;
const TimelineLabel = styled.div<{ $active: boolean; $past: boolean }>`
  font-size: 10px;
  font-weight: ${p => p.$active ? 700 : 500};
  color: ${p => p.$active ? '#635BFF' : p.$past ? '#4B5563' : '#9CA3AF'};
  margin-top: 6px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  text-align: center;
`;

// Palette keyed by display status (matches FoodcourtUnitNode STATUS_PALETTE)
const DISPLAY_PALETTE: Record<UnitDisplayStatus, { bg: string; border: string; text: string }> = {
  vacant:      { bg: '#F3F4F6', border: '#9CA3AF', text: '#6B7280' },
  proposal:    { bg: '#EDE9FE', border: '#8B5CF6', text: '#5B21B6' },
  contracting: { bg: '#FFEDD5', border: '#F97316', text: '#9A3412' },
  preparing:   { bg: '#DBEAFE', border: '#3B82F6', text: '#1E40AF' },
  active:      { bg: '#DCFCE7', border: '#16A34A', text: '#15803D' },
  expiring:    { bg: '#FFFBEB', border: '#F59E0B', text: '#92400E' },
  expired:     { bg: '#FEE2E2', border: '#EF4444', text: '#991B1B' }
};
const DEFAULT_STATUS_LABEL: Record<UnitDisplayStatus, string> = {
  vacant: 'Vacant', proposal: 'Proposal', contracting: 'In Talks',
  preparing: 'Setup', active: 'Active', expiring: 'Expiring', expired: 'Expired'
};
const STAGE_BG: Record<string, string> = {
  proposal: '#8B5CF6', contracting: '#F97316', setup: '#3B82F6',
  active: '#16A34A', terminated: '#6B7280', expired: '#EF4444', renewed: '#7C3AED'
};

function fmtMoney(v: any): string {
  const n = Number(v);
  if (isNaN(n)) return String(v);
  return n.toLocaleString('en-MY', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

// Derive display status from (unit.status, contract.stage, contract.end_date + renewal_alert_months).
// active + within alert window → 'expiring' (dashed amber ring).
function deriveDisplayStatus(unit: FoodcourtUnit, now: Date = new Date()): UnitDisplayStatus {
  const c = unit.currentContract;
  if (!c) return 'vacant';
  const stage = c.stage || '';
  if (stage === 'active') {
    if (c.end_date) {
      const end = new Date(c.end_date + 'T00:00:00');
      const alertMonths = c.renewal_alert_months ?? 3;
      const alertThresholdMs = alertMonths * 30 * 24 * 3600 * 1000;
      if (end.getTime() - now.getTime() <= alertThresholdMs) return 'expiring';
    }
    return 'active';
  }
  if (stage === 'setup') return 'preparing';
  if (stage === 'contracting') return 'contracting';
  if (stage === 'proposal') return 'proposal';
  if (stage === 'expired') return 'expired';
  // renewed / terminated → no current tenant on this unit
  return 'vacant';
}

// Stage-specific key number for Tier D (large shapes)
function deriveKeyNumber(
  unit: FoodcourtUnit,
  displayStatus: UnitDisplayStatus,
  currency: string,
  now: Date = new Date(),
  timezone: string = 'Asia/Kuala_Lumpur'
): string | null {
  const c = unit.currentContract;
  if (displayStatus === 'active' && c?.financial_terms && !c.financial_redacted) {
    const rent = Number(c.financial_terms.base_rent);
    if (!isNaN(rent) && rent > 0) {
      const k = rent >= 1000 ? `${(rent / 1000).toFixed(rent % 1000 === 0 ? 0 : 1)}k` : String(Math.round(rent));
      return `${currency || 'RM'} ${k}/mo`;
    }
  }
  if (displayStatus === 'expiring' && c?.end_date) {
    const end = new Date(c.end_date + 'T00:00:00');
    const days = Math.max(0, Math.ceil((end.getTime() - now.getTime()) / (24 * 3600 * 1000)));
    return `${days}d left`;
  }
  if (displayStatus === 'preparing' && c?.start_date) {
    const d = new Date(c.start_date + 'T00:00:00');
    const opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', timeZone: timezone };
    return `Opens ${d.toLocaleDateString('en-GB', opts)}`;
  }
  if ((displayStatus === 'contracting' || displayStatus === 'proposal') && c) {
    // Time since contract record created — operators want "how long has this been in pipeline"
    const createdRaw = (c as any).created_at || (c as any).createdAt;
    if (createdRaw) {
      const created = new Date(createdRaw);
      const days = Math.max(0, Math.floor((now.getTime() - created.getTime()) / (24 * 3600 * 1000)));
      return days === 0 ? 'Today' : `${days}d`;
    }
  }
  if (displayStatus === 'expired' && c?.end_date) {
    const end = new Date(c.end_date + 'T00:00:00');
    const opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', timeZone: timezone };
    return `Ended ${end.toLocaleDateString('en-GB', opts)}`;
  }
  return null;
}

function sizeLabel(unit: FoodcourtUnit): string | null {
  if (unit.size_value == null) return null;
  return `${unit.size_value} ${unit.size_unit || 'sqft'}`;
}

// Convert foodcourt unit (top-left coords) → FloorTable (center coords).
// Attaches `unitDisplay` for FoodcourtUnitNode.
type FoodcourtFloorTable = FloorTable & { unitDisplay: UnitDisplay };
function unitsToFloorTables(units: FoodcourtUnit[], currency: string = 'RM', timezone: string = 'Asia/Kuala_Lumpur'): FoodcourtFloorTable[] {
  const now = new Date();
  return units
    .filter(u => u.plan_x != null && u.plan_y != null)
    .map(u => {
      const w = u.plan_width ?? 100;
      const h = u.plan_height ?? 80;
      const c = u.currentContract;
      const displayStatus = deriveDisplayStatus(u, now);
      const tenantName = c?.restaurant?.name || c?.applicant_company_name || null;
      return {
        id: `u${u.id}`,
        tableNumber: u.unit_number,
        label: u.unit_number,
        shape: (u.plan_shape === 'circle' ? 'round' : 'rectangle') as FloorTable['shape'],
        x: (u.plan_x as number) + w / 2,
        y: (u.plan_y as number) + h / 2,
        width: w,
        height: h,
        rotation: 0,
        seats: 0,
        tableType: 'table' as const,
        unitDisplay: {
          displayStatus,
          tenantName,
          contractStage: c?.stage || null,
          contractId: c?.id || null,
          logoUrl: c?.restaurant?.logo_url || null,
          keyNumber: deriveKeyNumber(u, displayStatus, currency, now, timezone),
          sizeLabel: sizeLabel(u),
          billingGap: !!u.billing_gap
        }
      };
    });
}

// Legacy statusMap kept as no-op for FloorPlanCanvas compatibility —
// FoodcourtUnitNode reads everything from unitDisplay instead.
function statusMap(units: FoodcourtUnit[]): Record<string, TableStatusInfo> {
  const out: Record<string, TableStatusInfo> = {};
  units.forEach(u => {
    out[u.unit_number] = { tableNumber: u.unit_number, status: 'available', orderCount: 0, totalAmount: 0, elapsedMinutes: 0 };
  });
  return out;
}

// ───── Main ─────
const FoodcourtFloorPlanPage: React.FC = () => {
  const { t } = useTranslation('contract');
  const navigate = useNavigate();
  const { user } = useAuth();
  const fcId = user?.foodcourt_id;
  const [searchParams] = useSearchParams();
  const branchFromUrl = searchParams.get('branch') ? Number(searchParams.get('branch')) : null;
  const canEdit = user?.role === 'System Admin' || user?.role === 'Foodcourt General';

  // fc_plans module gates the billing_gap CTA — without the advanced plans feature,
  // the concept of "no plan linked" does not apply.
  const { hasModule } = useAllowedRoutes({
    role: user?.role || '',
    foodcourtId: fcId || null
  });
  const canLinkPlans = hasModule('fc_plans');

  const [branches, setBranches] = useState<Branch[]>([]);
  const [selectedBranchId, setSelectedBranchId] = useState<number | null>(branchFromUrl);
  const [floorPlans, setFloorPlans] = useState<FloorPlan[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
  const [selectedUnitNumber, setSelectedUnitNumber] = useState<string | null>(null);
  const [contract, setContract] = useState<ContractDetail | null>(null);
  const [clock, setClock] = useState('');
  const [loading, setLoading] = useState(true);
  // Foodcourt-scoped display settings (currency + timezone) — no more hardcoded 'RM' / 'Asia/Kuala_Lumpur'
  const [fcCurrency, setFcCurrency] = useState<string>('MYR');
  const [fcTimeZone, setFcTimeZone] = useState<string>('Asia/Kuala_Lumpur');
  const [stageActionLoading, setStageActionLoading] = useState<boolean>(false);

  // Opener-aware navigation: when the page is open as a popup (from tenancy sidebar),
  // route the parent window to the contract and close this popup. Falls back to in-page navigate.
  const openInOpener = useCallback((path: string) => {
    if (window.opener && !window.opener.closed) {
      try {
        window.opener.location.href = path;
        window.opener.focus();
        window.close();
        return;
      } catch { /* cross-origin or opener blocked — fall through to navigate */ }
    }
    navigate(path);
  }, [navigate]);

  // Clock — uses foodcourt's own timezone
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setClock(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: fcTimeZone }));
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, [fcTimeZone]);

  // Load branches + foodcourt display settings (currency, timezone)
  useEffect(() => {
    if (!fcId) return;
    (async () => {
      const token = getAuthToken();
      const headers = { Authorization: `Bearer ${token}` };
      const [brRes, fcRes] = await Promise.all([
        fetch(`/api/foodcourts/${fcId}/branches`, { headers }),
        fetch(`/api/foodcourts/${fcId}`, { headers })
      ]);
      const list: Branch[] = (await brRes.json()).data || [];
      setBranches(list);
      if (list.length > 0) setSelectedBranchId(prev => prev ?? list[0].id);

      const fcJson = await fcRes.json().catch(() => ({}));
      const fc = fcJson.data || fcJson;
      if (fc?.currency) setFcCurrency(fc.currency);
      // operation_settings may be JSON string or object depending on serialization
      let ops: any = fc?.operation_settings;
      if (typeof ops === 'string') { try { ops = JSON.parse(ops); } catch { ops = null; } }
      if (ops?.timeZone) setFcTimeZone(ops.timeZone);
    })().catch(() => {});
  }, [fcId]);

  // Load plans
  const loadPlans = useCallback(async () => {
    if (!selectedBranchId) return;
    setLoading(true);
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/foodcourt-branches/${selectedBranchId}/floor-plans`, { headers: { Authorization: `Bearer ${token}` } });
      const plans: FloorPlan[] = (await res.json()).data || [];
      setFloorPlans(plans);
      if (plans.length > 0 && !plans.find(p => p.id === selectedPlanId)) setSelectedPlanId(plans[0].id);
      else if (plans.length === 0) setSelectedPlanId(null);
    } finally { setLoading(false); }
  }, [selectedBranchId, selectedPlanId]);

  useEffect(() => { loadPlans(); }, [loadPlans]);

  const currentPlan = useMemo(() => floorPlans.find(p => p.id === selectedPlanId) || null, [floorPlans, selectedPlanId]);
  const selectedUnit = useMemo(() => {
    if (!selectedUnitNumber || !currentPlan) return null;
    return currentPlan.units.find(u => u.unit_number === selectedUnitNumber) || null;
  }, [selectedUnitNumber, currentPlan]);

  // Convert for Canvas
  const floorPlanData: FloorPlanData = useMemo(() => ({
    version: 1,
    canvasWidth: currentPlan?.canvas_width ?? 1200,
    canvasHeight: currentPlan?.canvas_height ?? 800,
    gridSize: currentPlan?.grid_size ?? 20,
    showGrid: currentPlan?.show_grid ?? true,
    tables: currentPlan ? unitsToFloorTables(currentPlan.units, 'RM', fcTimeZone) : []
  }), [currentPlan, fcTimeZone]);
  const statuses = useMemo(() => currentPlan ? statusMap(currentPlan.units) : {}, [currentPlan]);

  // Load contract detail when unit selected
  useEffect(() => {
    if (!selectedUnit) { setContract(null); return; }
    (async () => {
      const token = getAuthToken();
      const res = await fetch(`/api/foodcourt-units/${selectedUnit.id}/detail`, { headers: { Authorization: `Bearer ${token}` } });
      const d = await res.json();
      setContract(d.data?.currentContract || null);
    })().catch(() => setContract(null));
  }, [selectedUnit]);

  const handleTableClick = (tableNumber: string) => {
    setSelectedUnitNumber(prev => prev === tableNumber ? null : tableNumber);
  };

  if (!fcId) return <PageContainer><LoadingScreen>No foodcourt assigned.</LoadingScreen></PageContainer>;

  // Prerequisite — no branches yet → guide to /branches before anything else.
  if (!loading && branches.length === 0) {
    return (
      <PageContainer>
        <Header>
          <HeaderLeft>
            <HeaderTitle>{t('floorPlan.title', 'Floor Plan')}</HeaderTitle>
            <EditBtn onClick={() => {
              if (window.opener) window.close();
              else navigate('/pos/foodcourt/general/dashboard');
            }}>← {t('common.back', 'Back')}</EditBtn>
          </HeaderLeft>
        </Header>
        <MainContent>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
            <EmptyState
              title={t('floorPlan.noBranchTitle', 'No branches yet')}
              description={t('floorPlan.noBranchDesc', 'A floor plan belongs to a branch. Register at least one branch before laying out units.')}
              primaryAction={{ label: t('floorPlan.createBranch', 'Create Branch'), onClick: () => navigate('/pos/foodcourt/branches') }}
              secondaryAction={canEdit ? { label: t('common.back', 'Back'), onClick: () => navigate('/pos/foodcourt/general/dashboard') } : undefined}
              steps={[
                { label: t('floorPlan.guideStep1', 'Register at least one branch (location).') },
                { label: t('floorPlan.guideStep2', 'Lay out the floor plan & units.') },
                { label: t('floorPlan.guideStep3', 'Place tenant restaurants onto units.') }
              ]}
            />
          </div>
        </MainContent>
      </PageContainer>
    );
  }

  const currentBranch = branches.find(b => b.id === selectedBranchId);

  return (
    <PageContainer>
      <Header>
        <HeaderLeft>
          <HeaderTitle>{t('floorPlan.title', 'Floor Plan')}</HeaderTitle>
          <EditBtn onClick={() => {
            if (window.opener) window.close();
            else navigate('/pos/foodcourt/general/dashboard');
          }}>← {t('common.back', 'Back')}</EditBtn>
          <Select
            value={selectedBranchId || ''}
            onChange={(e) => { setSelectedBranchId(Number(e.target.value)); setSelectedPlanId(null); setSelectedUnitNumber(null); }}
          >
            {branches.map(b => <option key={b.id} value={b.id}>{b.name}{b.is_primary ? ' (Primary)' : ''} — {b.code}</option>)}
          </Select>
          {currentBranch?.country && <span style={{ fontSize: 12, color: '#6B7C93' }}>{currentBranch.country}</span>}
        </HeaderLeft>
        <HeaderRight>
          <Clock>{clock}</Clock>
          {canEdit && selectedBranchId && (
            <PrimaryBtn onClick={() => {
              const url = `/pos/foodcourt/floor-plan-editor?branch=${selectedBranchId}${selectedPlanId ? `&plan=${selectedPlanId}` : ''}`;
              window.open(url, '_blank');
            }}>
              {t('floorPlan.editLayout', 'Edit Layout')}
              {currentBranch ? ` · ${currentBranch.name}` : ''}
            </PrimaryBtn>
          )}
        </HeaderRight>
      </Header>

      <MainContent>
        <CanvasWrapper>
          {loading ? (
            <LoadingScreen>{t('common.loading', 'Loading...')}</LoadingScreen>
          ) : floorPlans.length === 0 ? (
            <div style={{ padding: 32, display: 'flex', justifyContent: 'center' }}>
              <EmptyState
                title={t('floorPlan.emptyTitle', 'No floor plan for this branch')}
                description={canEdit
                  ? t('floorPlan.emptyDescEdit', 'Open the editor to draw your unit layout. Once units are placed, tenants can be assigned to them.')
                  : t('floorPlan.emptyDescView', 'The branch admin has not laid out the floor plan yet. Check back later.')}
                primaryAction={canEdit && selectedBranchId ? {
                  label: t('floorPlan.editLayout', 'Edit Layout'),
                  onClick: () => window.open(`/pos/foodcourt/floor-plan-editor?branch=${selectedBranchId}`, '_blank')
                } : undefined}
              />
            </div>
          ) : !currentPlan ? null : (
            <FloorPlanCanvas
              floorPlan={floorPlanData}
              tableStatuses={statuses}
              isEditing={false}
              selectedTableId={selectedUnitNumber ? `u${selectedUnit?.id}` : null}
              onTableClick={handleTableClick}
              renderNode={({ table, isSelected, isEditing, onClick, onMouseDown, onTouchStart }) => (
                <FoodcourtUnitNode
                  table={table as FoodcourtFloorTable}
                  isSelected={isSelected}
                  isEditing={isEditing}
                  onClick={onClick}
                  onMouseDown={onMouseDown}
                  onTouchStart={onTouchStart}
                  statusLabels={{
                    vacant: t('floorPlan.unitStatus.vacant', 'Vacant'),
                    proposal: t('floorPlan.unitStatus.proposal', 'Proposal'),
                    contracting: t('floorPlan.unitStatus.contracting', 'In Talks'),
                    preparing: t('floorPlan.unitStatus.preparing', 'Setup'),
                    active: t('floorPlan.unitStatus.active', 'Active'),
                    expiring: t('floorPlan.unitStatus.expiring', 'Expiring'),
                    expired: t('floorPlan.unitStatus.expired', 'Expired')
                  }}
                />
              )}
            />
          )}
        </CanvasWrapper>

        {selectedUnit && (() => {
          // Derive display status using the same rule as the canvas
          const displayStatus = deriveDisplayStatus(selectedUnit);
          const palette = DISPLAY_PALETTE[displayStatus];
          const isPipelineStage = displayStatus === 'proposal' || displayStatus === 'contracting';
          const isExpiring = displayStatus === 'expiring';
          const daysLeft = contract?.end_date ? Math.ceil((new Date(contract.end_date + 'T00:00:00').getTime() - Date.now()) / (24 * 3600 * 1000)) : null;
          const daysInPipeline = contract ? (() => {
            const raw = (contract as any).created_at || (contract as any).createdAt;
            if (!raw) return null;
            return Math.floor((Date.now() - new Date(raw).getTime()) / (24 * 3600 * 1000));
          })() : null;
          const currentBranchCode = currentBranch?.code || '';
          const fullCode = currentBranchCode ? `${currentBranchCode}-${selectedUnit.unit_number}` : selectedUnit.unit_number;
          const currency = getCurrencySymbol(fcCurrency) || fcCurrency;
          const ft = (contract?.financial_terms && !contract.financial_redacted) ? contract.financial_terms : null;
          const isVacant = displayStatus === 'vacant';
          const isExpired = displayStatus === 'expired';

          // Stage transition map (matches backend validTransitions in routes/contracts.js PUT /:id/stage)
          const nextStage: Record<string, string | null> = {
            proposal: 'contracting',
            contracting: 'setup',
            setup: 'active',
            active: null, // active→terminated|renewed handled via Renew flow
            expired: null,
            terminated: null,
            renewed: null
          };
          const nextStageLabel: Record<string, string> = {
            contracting: t('floorPlan.action.advanceToContracting', 'Advance to Contracting'),
            setup: t('floorPlan.action.advanceToSetup', 'Advance to Setup'),
            active: t('floorPlan.action.advanceToActive', 'Mark Active')
          };
          const nextStageFor = contract ? nextStage[contract.stage] : null;

          const doAdvanceStage = async () => {
            if (!contract || !nextStageFor) return;
            const confirmMsg = t('floorPlan.action.advanceConfirm',
              'Advance contract {{num}} to "{{stage}}"?',
              { num: contract.contract_number || `#${contract.id}`, stage: nextStageFor });
            if (!window.confirm(confirmMsg)) return;
            setStageActionLoading(true);
            try {
              const token = getAuthToken();
              const res = await fetch(`/api/contracts/${contract.id}/stage`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ stage: nextStageFor })
              });
              const data = await res.json();
              if (!res.ok || data.success === false) {
                alert(data.message || 'Failed to advance stage');
                return;
              }
              // Refresh unit detail + floor plan data
              const detailRes = await fetch(`/api/foodcourt-units/${selectedUnit.id}/detail`, { headers: { Authorization: `Bearer ${token}` } });
              const d = await detailRes.json();
              setContract(d.data?.currentContract || null);
              await loadPlans();
            } finally {
              setStageActionLoading(false);
            }
          };

          return (
          <DetailPanel>
            <PanelHeader>
              <BigTitle>
                {fullCode}
                <Badge $bg={palette.border}>
                  {t(`floorPlan.unitStatus.${displayStatus}`, DEFAULT_STATUS_LABEL[displayStatus])}
                </Badge>
              </BigTitle>
              <PanelClose onClick={() => setSelectedUnitNumber(null)} aria-label={t('common.close', 'Close')} type="button">✕</PanelClose>
            </PanelHeader>
            <PanelBody>
              {/* CONTEXTUAL BANNER */}
              {isPipelineStage && daysInPipeline != null && (
                <Banner $bg="#FFF7ED" $text="#9A3412" $border="#F97316">
                  {t('floorPlan.banner.inPipeline', 'Pipeline in progress · {{days}} days since start', { days: daysInPipeline })}
                </Banner>
              )}
              {isExpiring && daysLeft != null && (
                <Banner $bg="#FFFBEB" $text="#92400E" $border="#F59E0B">
                  {t('floorPlan.banner.expiring', 'Contract expires in {{days}} days — renewal review recommended', { days: daysLeft })}
                </Banner>
              )}
              {displayStatus === 'expired' && (
                <Banner $bg="#FEF2F2" $text="#991B1B" $border="#EF4444">
                  {t('floorPlan.banner.expired', 'Contract has expired — unit should be marked vacant or renewed')}
                </Banner>
              )}
              {/* billing_gap banner is only meaningful to foodcourts that have the
                  fc_plans advanced module. Basic-tier operators bill manually and do
                  not link plans — showing the banner would confuse them. */}
              {selectedUnit.billing_gap && canLinkPlans && (
                <Banner $bg="#FEE2E2" $text="#991B1B" $border="#DC2626">
                  <div>{t('floorPlan.banner.billingGap', 'Billing is not configured — no plan linked to this active contract. Open the contract to link or create a plan.')}</div>
                  {contract && canEdit && (
                    <div style={{ marginTop: 8 }}>
                      <Button variant="secondary" size="small" type="button"
                        onClick={() => openInOpener(`/pos/foodcourt/tenancy?id=${contract.id}#billing`)}>
                        {t('floorPlan.action.linkPlan', 'Link a plan')}
                      </Button>
                    </div>
                  )}
                </Banner>
              )}

              {/* §1 UNIT HEADER */}
              <Section>
                <SectionTitle>{t('floorPlan.sec.unit', 'Unit')}</SectionTitle>
                <Row><span>{t('floorPlan.unit.code', 'Code')}</span><b>{fullCode}</b></Row>
                {selectedUnit.size_value != null && (
                  <Row><span>{t('floorPlan.unit.size', 'Size')}</span><b>{selectedUnit.size_value} {selectedUnit.size_unit || 'sqft'}</b></Row>
                )}
                {selectedUnit.location_description && (
                  <Row><span>{t('floorPlan.unit.location', 'Location')}</span><b>{selectedUnit.location_description}</b></Row>
                )}
              </Section>

              {/* VACANT EMPTY STATE */}
              {isVacant && (
                <Section>
                  <EmptyHint>{t('floorPlan.vacant.noContract', 'This unit has no contract assigned.')}</EmptyHint>
                  {canEdit && (
                    <div style={{ marginTop: 8 }}>
                      <Button variant="primary" fullWidth type="button"
                        onClick={() => openInOpener(`/pos/foodcourt/tenancy?new=1&unit_id=${selectedUnit.id}`)}>
                        {t('floorPlan.vacant.createProposal', 'Create tenancy proposal')}
                      </Button>
                    </div>
                  )}
                </Section>
              )}

              {/* §2 CURRENT CONTRACT */}
              {contract && (
                <Section>
                  <SectionTitle>{t('floorPlan.sec.contract', 'Current Contract')}</SectionTitle>
                  <Row>
                    <span>{t('floorPlan.contract.number', 'Number')}</span>
                    <b>{contract.contract_number || `#${contract.id}`}</b>
                  </Row>
                  <Row>
                    <span>{t('floorPlan.contract.stage', 'Stage')}</span>
                    <Badge $bg={STAGE_BG[contract.stage] || '#6B7280'}>
                      {t(`floorPlan.contractStage.${contract.stage}`, contract.stage)}
                    </Badge>
                  </Row>
                  {contract.contract_type && (
                    <Row><span>{t('floorPlan.contract.type', 'Type')}</span><b>{t(`floorPlan.contractType.${contract.contract_type}`, contract.contract_type)}</b></Row>
                  )}
                  {(contract.start_date || contract.end_date) && (
                    <Row>
                      <span>{t('floorPlan.contract.period', 'Period')}</span>
                      <b>
                        {contract.start_date ? new Date(contract.start_date).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric', timeZone: fcTimeZone }) : '—'}
                        {' → '}
                        {contract.end_date ? new Date(contract.end_date).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric', timeZone: fcTimeZone }) : '—'}
                      </b>
                    </Row>
                  )}
                  {daysLeft != null && (contract.stage === 'active' || contract.stage === 'setup') && (
                    <Row>
                      <span>{t('floorPlan.contract.daysLeft', 'Days remaining')}</span>
                      <b style={{ color: daysLeft < 30 ? '#DC2626' : daysLeft < 90 ? '#D97706' : '#059669' }}>
                        {daysLeft > 0 ? `${daysLeft}d` : t('floorPlan.contract.overdue', 'Past end date')}
                      </b>
                    </Row>
                  )}
                  {contract.signing_date && (
                    <Row><span>{t('floorPlan.contract.signed', 'Signed on')}</span><b>{new Date(contract.signing_date).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric', timeZone: fcTimeZone })}</b></Row>
                  )}
                  {contract.renewal_type && (
                    <Row>
                      <span>{t('floorPlan.contract.renewal', 'Renewal')}</span>
                      <b>
                        {t(`floorPlan.renewalType.${contract.renewal_type}`, contract.renewal_type)}
                        {contract.renewal_alert_months ? ` · ${t('floorPlan.contract.alertMonths', '{{n}}mo alert', { n: contract.renewal_alert_months })}` : ''}
                      </b>
                    </Row>
                  )}
                </Section>
              )}

              {/* §3 TENANT */}
              {contract && (contract.restaurant || contract.applicant_company_name) && (
                <Section>
                  <SectionTitle>{t('floorPlan.sec.tenant', 'Tenant')}</SectionTitle>
                  {contract.restaurant ? (
                    <RestaurantCard>
                      <RestaurantLogo $src={contract.restaurant.logo_url || undefined} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: '#0A2540', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {contract.restaurant.name}
                          {contract.restaurant.branch_name && <span style={{ color: '#9CA3AF', fontWeight: 400 }}> · {contract.restaurant.branch_name}</span>}
                        </div>
                        {contract.applicant_company_name && contract.applicant_company_name !== contract.restaurant.name && (
                          <div style={{ fontSize: 11, color: '#6B7C93', marginTop: 2 }}>
                            {t('floorPlan.tenant.legalEntity', 'Legal entity')}: {contract.applicant_company_name}
                          </div>
                        )}
                      </div>
                    </RestaurantCard>
                  ) : (
                    <Row><span>{t('floorPlan.tenant.applicant', 'Applicant')}</span><b>{contract.applicant_company_name}</b></Row>
                  )}
                  {contract.applicant_contact_person && (
                    <Row><span>{t('floorPlan.tenant.contact', 'Contact')}</span><b>{contract.applicant_contact_person}</b></Row>
                  )}
                  {contract.applicant_phone && (
                    <Row><span>{t('floorPlan.tenant.phone', 'Phone')}</span>
                      <b><a href={`tel:${contract.applicant_phone}`} style={{ color: '#635BFF', textDecoration: 'none' }}>{contract.applicant_phone}</a></b></Row>
                  )}
                  {contract.applicant_email && (
                    <Row><span>{t('floorPlan.tenant.email', 'Email')}</span>
                      <b><a href={`mailto:${contract.applicant_email}`} style={{ color: '#635BFF', textDecoration: 'none' }}>{contract.applicant_email}</a></b></Row>
                  )}
                </Section>
              )}

              {/* §4 FINANCIAL TERMS — redacted for Manager */}
              {contract && contract.financial_redacted && (
                <Section>
                  <SectionTitle>{t('floorPlan.sec.financial', 'Financial Terms')}</SectionTitle>
                  <EmptyHint>🔒 {t('floorPlan.fin.redacted', 'Financial terms are visible to Foodcourt General and System Admin only')}</EmptyHint>
                </Section>
              )}
              {ft && Object.keys(ft).length > 0 && (
                <Section>
                  <SectionTitle>{t('floorPlan.sec.financial', 'Financial Terms')}</SectionTitle>
                  <TileGrid>
                    {ft.base_rent != null && <Tile $color="#15803D"><TileLabel>{t('floorPlan.fin.baseRent', 'Base Rent')}</TileLabel><TileValue>{currency} {fmtMoney(ft.base_rent)}<TileUnit>/mo</TileUnit></TileValue></Tile>}
                    {ft.revenue_share_percent != null && <Tile $color="#1E40AF"><TileLabel>{t('floorPlan.fin.revShare', 'Revenue Share')}</TileLabel><TileValue>{ft.revenue_share_percent}<TileUnit>% of GTO</TileUnit></TileValue></Tile>}
                    {ft.min_guarantee != null && <Tile $color="#B45309"><TileLabel>{t('floorPlan.fin.minGuarantee', 'Min Guarantee')}</TileLabel><TileValue>{currency} {fmtMoney(ft.min_guarantee)}<TileUnit>/mo</TileUnit></TileValue></Tile>}
                    {ft.security_deposit != null && <Tile $color="#6D28D9"><TileLabel>{t('floorPlan.fin.deposit', 'Deposit')}</TileLabel><TileValue>{currency} {fmtMoney(ft.security_deposit)}{ft.security_deposit_months ? <TileUnit>({ft.security_deposit_months}mo)</TileUnit> : null}</TileValue></Tile>}
                  </TileGrid>
                  {ft.maintenance_fee != null && <Row><span>{t('floorPlan.fin.cam', 'Maintenance (CAM)')}</span><b>{currency} {fmtMoney(ft.maintenance_fee)}/mo</b></Row>}
                  {ft.fitout_responsibility && <Row><span>{t('floorPlan.fin.fitout', 'Fit-out')}</span><b>{t(`floorPlan.fin.fitoutVal.${ft.fitout_responsibility}`, ft.fitout_responsibility)}</b></Row>}
                  {ft.operating_hours && <Row><span>{t('floorPlan.fin.hours', 'Operating hours')}</span><b>{ft.operating_hours}</b></Row>}
                  {ft.restoration_required != null && <Row><span>{t('floorPlan.fin.restoration', 'Restoration required')}</span><b>{ft.restoration_required ? t('common.yes', 'Yes') : t('common.no', 'No')}</b></Row>}
                  {/* Monthly obligation computed total */}
                  {(() => {
                    const base = Number(ft.base_rent) || 0;
                    const minG = Number(ft.min_guarantee) || 0;
                    const cam = Number(ft.maintenance_fee) || 0;
                    const total = Math.max(base, minG) + cam;
                    if (total <= 0) return null;
                    return (
                      <TotalRow>
                        <span>{t('floorPlan.fin.totalMonthly', 'Total monthly obligation')}</span>
                        <b>{currency} {fmtMoney(total)}/mo</b>
                      </TotalRow>
                    );
                  })()}
                </Section>
              )}

              {/* §5 TIMELINE */}
              {contract && (
                <Section>
                  <SectionTitle>{t('floorPlan.sec.timeline', 'Timeline')}</SectionTitle>
                  <Timeline>
                    {(['proposal', 'contracting', 'setup', 'active'] as const).map((s, i, arr) => {
                      const priority = { proposal: 1, contracting: 2, setup: 3, active: 4 } as Record<string, number>;
                      const currentPri = priority[contract.stage] || 0;
                      const isPast = priority[s] < currentPri;
                      const isCurrent = s === contract.stage;
                      return (
                        <TimelineStep key={s} $active={isCurrent} $past={isPast} $last={i === arr.length - 1}>
                          <TimelineDot $active={isCurrent} $past={isPast} />
                          <TimelineLabel $active={isCurrent} $past={isPast}>
                            {t(`floorPlan.contractStage.${s}`, s)}
                          </TimelineLabel>
                        </TimelineStep>
                      );
                    })}
                  </Timeline>
                </Section>
              )}

              {/* §6 ACTIONS — stage-aware primary + always-on secondary link */}
              {contract && (
                <Section>
                  <SectionTitle>{t('floorPlan.sec.actions', 'Actions')}</SectionTitle>
                  {/* Primary action depends on current stage:
                      - pipeline (proposal/contracting/setup) → advance to next
                      - expiring → renew
                      - expired → create new tenancy for this unit
                      - active (non-expiring) → no primary; just open contract */}
                  {canEdit && nextStageFor && (
                    <Button variant="primary" fullWidth type="button"
                      onClick={doAdvanceStage}
                      disabled={stageActionLoading}
                      loading={stageActionLoading}>
                      {nextStageLabel[nextStageFor]}
                    </Button>
                  )}
                  {canEdit && isExpiring && (
                    <Button variant="primary" fullWidth type="button"
                      onClick={() => openInOpener(`/pos/foodcourt/tenancy?id=${contract.id}&action=renew`)}>
                      {t('floorPlan.action.renew', 'Renew contract')}
                    </Button>
                  )}
                  {canEdit && isExpired && (
                    <Button variant="primary" fullWidth type="button"
                      onClick={() => openInOpener(`/pos/foodcourt/tenancy?new=1&unit_id=${selectedUnit.id}`)}>
                      {t('floorPlan.action.newTenancy', 'Create new tenancy')}
                    </Button>
                  )}
                  <div style={{ marginTop: 10 }}>
                    <Button variant="secondary" fullWidth type="button"
                      onClick={() => openInOpener(`/pos/foodcourt/tenancy?id=${contract.id}`)}>
                      {t('floorPlan.action.open', 'Open contract')}
                    </Button>
                  </div>
                </Section>
              )}
            </PanelBody>
          </DetailPanel>
          );
        })()}
      </MainContent>
    </PageContainer>
  );
};

export default FoodcourtFloorPlanPage;
