// Foodcourt Floor Plan VIEW — mirrors Restaurant /floor-plan standalone page.
// Structure cloned from /pages/FloorPlan/FloorPlanPage.tsx. Units shown as shapes;
// click → right-side detail panel with contract + tenancy + restaurant info.
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FloorPlanData, FloorTable, TableStatusInfo } from '../FloorPlan/types';
import FloorPlanCanvas from '../FloorPlan/FloorPlanCanvas';
import { useTranslation } from 'react-i18next';
import { getAuthToken } from '../../utils/auth';

// ───── Types ─────
interface Branch { id: number; name: string; code: string; foodcourt_id: number; is_primary?: boolean; country?: string; }
interface FoodcourtUnit {
  id: number; unit_number: string; status: string;
  plan_x: number | null; plan_y: number | null;
  plan_width: number | null; plan_height: number | null;
  plan_shape: string | null;
  location_description?: string | null;
}
interface FloorPlan {
  id: number; branch_id: number; floor_name: string;
  canvas_width: number; canvas_height: number; grid_size: number; show_grid: boolean;
  units: FoodcourtUnit[];
}
interface ContractDetail {
  id: number; contract_number?: string; stage: string; contract_type?: string;
  applicant_company_name?: string; applicant_contact_person?: string;
  applicant_email?: string; applicant_phone?: string;
  start_date?: string; end_date?: string;
  financial_terms?: any;
  restaurant?: { id: number; name: string; status: string; logo_url?: string; branch_name?: string } | null;
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

const SubHeader = styled.div`
  background: white; padding: 8px 24px; border-bottom: 1px solid #E6EBF1;
  display: flex; gap: 12px; align-items: center; flex-shrink: 0; flex-wrap: wrap;
`;
const Select = styled.select`
  padding: 5px 10px; border: 1px solid #E6EBF1; border-radius: 6px;
  font-size: 13px; background: white; cursor: pointer;
`;
const Tabs = styled.div`display: flex; gap: 2px; flex: 1; overflow-x: auto;`;
const TabBtn = styled.button<{ $active?: boolean }>`
  padding: 5px 12px; border: none; background: none; cursor: pointer;
  font-size: 13px; font-weight: 500; white-space: nowrap;
  color: ${p => p.$active ? '#635BFF' : '#6B7C93'};
  border-bottom: 2px solid ${p => p.$active ? '#635BFF' : 'transparent'};
  &:hover { color: #635BFF; }
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
const OpenLink = styled.a`
  display: inline-block; margin-top: 6px; font-size: 13px; color: #635BFF;
  text-decoration: none; font-weight: 600;
  &:hover { text-decoration: underline; }
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

const UNIT_STATUS_COLOR: Record<string, { bg: string; border: string; text: string }> = {
  vacant:    { bg: '#F3F4F6', border: '#D1D5DB', text: '#6B7280' },
  reserved:  { bg: '#FEF3C7', border: '#F59E0B', text: '#92400E' },
  preparing: { bg: '#DBEAFE', border: '#3B82F6', text: '#1E40AF' },
  occupied:  { bg: '#DCFCE7', border: '#16A34A', text: '#15803D' }
};
const STAGE_BG: Record<string, string> = {
  proposal: '#2563EB', contracting: '#D97706', setup: '#8B5CF6',
  active: '#059669', terminated: '#6B7280', expired: '#6B7280', renewed: '#7C3AED'
};

// Convert foodcourt unit (top-left coords) → Restaurant FloorTable (center coords)
function unitsToFloorTables(units: FoodcourtUnit[]): FloorTable[] {
  return units
    .filter(u => u.plan_x != null && u.plan_y != null)
    .map(u => {
      const w = u.plan_width ?? 100;
      const h = u.plan_height ?? 80;
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
        tableType: 'table' as const
      };
    });
}

// Map unit status to table status palette used by FloorPlanCanvas
function statusMap(units: FoodcourtUnit[]): Record<string, TableStatusInfo> {
  const out: Record<string, TableStatusInfo> = {};
  units.forEach(u => {
    let s: TableStatusInfo['status'] = 'available';
    if (u.status === 'occupied') s = 'occupied';
    else if (u.status === 'reserved' || u.status === 'preparing') s = 'needs-attention';
    out[u.unit_number] = { tableNumber: u.unit_number, status: s, orderCount: 0, totalAmount: 0, elapsedMinutes: 0 };
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

  const [branches, setBranches] = useState<Branch[]>([]);
  const [selectedBranchId, setSelectedBranchId] = useState<number | null>(branchFromUrl);
  const [floorPlans, setFloorPlans] = useState<FloorPlan[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
  const [selectedUnitNumber, setSelectedUnitNumber] = useState<string | null>(null);
  const [contract, setContract] = useState<ContractDetail | null>(null);
  const [clock, setClock] = useState('');
  const [loading, setLoading] = useState(true);

  // Clock
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setClock(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  // Load branches
  useEffect(() => {
    if (!fcId) return;
    (async () => {
      const token = getAuthToken();
      const res = await fetch(`/api/foodcourts/${fcId}/branches`, { headers: { Authorization: `Bearer ${token}` } });
      const list: Branch[] = (await res.json()).data || [];
      setBranches(list);
      if (list.length > 0) setSelectedBranchId(prev => prev ?? list[0].id);
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
    tables: currentPlan ? unitsToFloorTables(currentPlan.units) : []
  }), [currentPlan]);
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
              ✎ {t('floorPlan.editLayout', 'Edit Layout')}
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
            <LoadingScreen>
              {canEdit
                ? t('floorPlan.emptyEdit', 'No floor plans yet. Click "Edit Layout" to create one.')
                : t('floorPlan.empty', 'No floor plans available for this branch yet.')}
            </LoadingScreen>
          ) : !currentPlan ? null : (
            <FloorPlanCanvas
              floorPlan={floorPlanData}
              tableStatuses={statuses}
              isEditing={false}
              selectedTableId={selectedUnitNumber ? `u${selectedUnit?.id}` : null}
              onTableClick={handleTableClick}
            />
          )}
        </CanvasWrapper>

        {selectedUnit && (
          <DetailPanel>
            <PanelHeader>
              <BigTitle>
                {selectedUnit.unit_number}
                <Badge $bg={UNIT_STATUS_COLOR[selectedUnit.status]?.border || '#9CA3AF'}>{selectedUnit.status}</Badge>
              </BigTitle>
              <PanelClose onClick={() => setSelectedUnitNumber(null)}>✕</PanelClose>
            </PanelHeader>
            <PanelBody>
              {/* STORE */}
              <Section>
                <SectionTitle>{t('floorPlan.store', 'Store')}</SectionTitle>
                {selectedUnit.location_description && (
                  <div style={{ fontSize: 13, color: '#4B5563' }}>{selectedUnit.location_description}</div>
                )}
                {!selectedUnit.location_description && <EmptyHint>{t('floorPlan.noDescription', 'No description')}</EmptyHint>}
              </Section>

              {/* TENANCY CONTRACT */}
              <Section>
                <SectionTitle>{t('floorPlan.tenancyContract', 'Tenancy Contract')}</SectionTitle>
                {contract ? (
                  <>
                    <Row><span>{t('floorPlan.number', 'Number')}</span><b>{contract.contract_number || `#${contract.id}`}</b></Row>
                    <Row><span>{t('floorPlan.stage', 'Stage')}</span><Badge $bg={STAGE_BG[contract.stage] || '#6B7280'}>{contract.stage}</Badge></Row>
                    {contract.contract_type && <Row><span>{t('floorPlan.type', 'Type')}</span><b>{contract.contract_type}</b></Row>}
                    {contract.start_date && <Row><span>{t('floorPlan.period', 'Period')}</span><b>{String(contract.start_date).substring(0,10)} ~ {String(contract.end_date || '').substring(0,10) || '—'}</b></Row>}
                    {contract.applicant_company_name && <Row><span>{t('floorPlan.tenant', 'Tenant')}</span><b>{contract.applicant_company_name}</b></Row>}
                    {contract.applicant_contact_person && <Row><span>{t('floorPlan.contact', 'Contact')}</span><b>{contract.applicant_contact_person}</b></Row>}
                    {contract.applicant_phone && <Row><span>{t('floorPlan.phone', 'Phone')}</span><b>{contract.applicant_phone}</b></Row>}
                    {contract.applicant_email && <Row><span>{t('floorPlan.email', 'Email')}</span><b>{contract.applicant_email}</b></Row>}
                  </>
                ) : <EmptyHint>{t('floorPlan.noContract', 'No active contract')}</EmptyHint>}
              </Section>

              {/* FINANCIAL TERMS */}
              {contract?.financial_terms && Object.keys(contract.financial_terms).length > 0 && (
                <Section>
                  <SectionTitle>{t('floorPlan.financialTerms', 'Financial Terms')}</SectionTitle>
                  {Object.entries(contract.financial_terms).map(([k, v]) => (
                    <Row key={k}><span>{k}</span><b>{typeof v === 'object' ? JSON.stringify(v) : String(v)}</b></Row>
                  ))}
                </Section>
              )}

              {/* RESTAURANT */}
              {contract?.restaurant && (
                <Section>
                  <SectionTitle>{t('floorPlan.restaurant', 'Restaurant')}</SectionTitle>
                  <RestaurantCard>
                    <RestaurantLogo $src={contract.restaurant.logo_url} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#0A2540', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {contract.restaurant.name}
                        {contract.restaurant.branch_name && <span style={{ color: '#9CA3AF', fontWeight: 400 }}> · {contract.restaurant.branch_name}</span>}
                      </div>
                      <div style={{ fontSize: 12, color: '#6B7C93', marginTop: 2 }}>
                        <Badge $bg={contract.restaurant.status === 'active' ? '#059669' : '#9CA3AF'}>{contract.restaurant.status}</Badge>
                      </div>
                    </div>
                  </RestaurantCard>
                </Section>
              )}

              {contract && (
                <OpenLink href={`/pos/foodcourt/tenancy?id=${contract.id}`}>
                  {t('floorPlan.openContract', 'Open contract →')}
                </OpenLink>
              )}
            </PanelBody>
          </DetailPanel>
        )}
      </MainContent>
    </PageContainer>
  );
};

export default FoodcourtFloorPlanPage;
