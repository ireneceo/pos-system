import React, { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import CommonEmptyState from '../../components/Common/EmptyState';
import { formatAddress, AppLocale } from '../../utils/formatAddress';
import { useAuth } from '../../contexts/AuthContext';
import { useAllowedRoutes } from '../../hooks/useAllowedRoutes';
import { getAuthToken } from '../../utils/auth';
import { getCurrencySymbol } from '../../utils/currency';
import { Button } from '../../components/Button';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
});

interface UnitDetail {
  id: number;
  unit_number: string;
  status: string;
  size_value: number | null;
  size_unit: 'sqft' | 'sqm' | null;
  location_description?: string | null;
  displayStage: 'active' | 'setup' | 'contracting' | 'proposal' | 'expired' | 'vacant';
  currentContract: {
    id: number;
    stage: string;
    contract_type?: string | null;
    applicant_company_name?: string | null;
    start_date?: string | null;
    end_date?: string | null;
    renewal_alert_months?: number | null;
    financial_terms?: Record<string, any> | null;
    financial_redacted?: boolean;
    restaurant?: { id: number; name: string; branch_name?: string | null; logo_url?: string | null } | null;
  } | null;
}
interface Branch {
  id: number; name: string; code: string; status: string;
  address?: string; city?: string; state?: string; country?: string;
  phone?: string; email?: string;
  latitude: number | null; longitude: number | null;
  is_primary?: boolean;
  unit_stats: { total: number; active: number; setup: number; contracting: number; proposal: number; vacant: number; expired: number };
  units: UnitDetail[];
}

interface Restaurant {
  id: number; name: string; branch_name?: string; status: string;
  branch_id?: number | null;
  latitude: number | null; longitude: number | null;
  logo_url?: string; is_demo?: boolean;
  sales_30d?: number;
  contract_type?: string | null;
  radius_km?: number | null;
}

interface TenancyMapData {
  foodcourt: { id: number; name: string; code: string; logo_url?: string; currency?: string; time_zone?: string };
  mappedBranches: Branch[];
  unmappedBranches: Branch[];
  restaurants: Restaurant[];
  max_sales_30d: number;
  total_branches: number;
  total_restaurants: number;
}

// "Occupied" in a foodcourt tenancy context = units under an active lease
// (signed contract currently running OR in setup/preparing to open). This is
// the retail property industry convention — proposal/contracting are pipeline,
// expired/vacant are available inventory. Backend returns `unit_stats` with
// per-stage counts (no `occupied` field); we derive it here consistently
// wherever occupancy is displayed.
const occupiedCount = (s: Branch['unit_stats']): number =>
  (s?.active || 0) + (s?.setup || 0);

const STATUS_COLOR: Record<string, string> = {
  active: '#10B981', trial: '#F59E0B', suspended: '#EF4444', overdue: '#EAB308',
  inactive: '#6B7280', expired: '#6B7280', cancelled: '#6B7280'
};

const Layout = styled.div<{ $hasDetail?: boolean }>`
  display: grid;
  grid-template-columns: ${p => p.$hasDetail ? '260px 1fr 360px' : '320px 1fr'};
  gap: 12px;
  height: 640px;
  @media (max-width: 1200px) {
    grid-template-columns: ${p => p.$hasDetail ? '240px 1fr 320px' : '280px 1fr'};
  }
  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    height: auto;
  }
`;

// Stage palette matches Floor Plan's DISPLAY_PALETTE for visual consistency
const STAGE_PALETTE: Record<string, { bg: string; border: string; text: string; label: string }> = {
  active:      { bg: '#DCFCE7', border: '#16A34A', text: '#15803D', label: 'Active' },
  setup:       { bg: '#DBEAFE', border: '#3B82F6', text: '#1E40AF', label: 'Setup' },
  contracting: { bg: '#FFEDD5', border: '#F97316', text: '#9A3412', label: 'In Talks' },
  proposal:    { bg: '#EDE9FE', border: '#8B5CF6', text: '#5B21B6', label: 'Proposal' },
  expired:     { bg: '#FEE2E2', border: '#EF4444', text: '#991B1B', label: 'Expired' },
  vacant:      { bg: '#F1F4F8', border: '#6B7280', text: '#4B5563', label: 'Vacant' }
};

const StatsPillRow = styled.div`
  display: flex; flex-wrap: wrap; gap: 4px; margin-top: 6px;
`;
const StatPill = styled.span<{ $bg: string; $text: string; $border: string }>`
  display: inline-flex; align-items: center; gap: 4px;
  padding: 2px 7px;
  background: ${p => p.$bg};
  color: ${p => p.$text};
  border: 1px solid ${p => p.$border};
  border-radius: 10px;
  font-size: 10px;
  font-weight: 600;
  line-height: 1.4;
`;

// Right-side detail panel (new)
const DetailPanel = styled.div`
  display: flex; flex-direction: column;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  background: white;
  overflow: hidden;
`;
const DetailHeader = styled.div`
  padding: 14px 16px;
  border-bottom: 1px solid #C7CED6;
  display: flex; justify-content: space-between; align-items: flex-start;
  gap: 8px;
  .title { font-size: 15px; font-weight: 700; color: #0A2540; margin: 0 0 4px; }
  .code { font-size: 11px; color: #6B7280; font-weight: 500; letter-spacing: 0.3px; }
  .close { background: none; border: none; cursor: pointer; font-size: 18px; color: #4B5563; &:hover { color: #0A2540; } }
`;
const DetailBody = styled.div`
  flex: 1; overflow-y: auto; padding: 14px 16px;
`;
const DetailSection = styled.div`margin-bottom: 16px;`;
const DetailSectionTitle = styled.div`
  font-size: 10px; font-weight: 600; color: #4B5563;
  text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;
`;
const UnitRow = styled.div<{ $bg: string; $border: string; $text: string }>`
  display: flex; justify-content: space-between; align-items: center;
  padding: 8px 10px;
  background: ${p => p.$bg};
  border: 1px solid ${p => p.$border};
  border-radius: 6px;
  margin-bottom: 4px;
  font-size: 12px;
  color: ${p => p.$text};
  .unit-code { font-weight: 700; font-size: 13px; }
  .tenant { color: #1F2937; font-size: 11px; opacity: 0.9; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 140px; }
  .stage-tag { font-size: 9px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.3px; }
`;
const InfoRow = styled.div`
  display: flex; justify-content: space-between;
  padding: 4px 0;
  font-size: 12px;
  color: #374151;
  b { color: #0A2540; text-align: right; }
`;
const ViewFloorPlanLink = styled(Link)`
  display: inline-block; margin-top: 10px;
  padding: 8px 14px;
  background: #635BFF;
  color: white;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-decoration: none;
  text-align: center;
  &:hover { background: #5A51E6; }
`;

const SidePanel = styled.div`
  display: flex; flex-direction: column;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  background: white;
  overflow: hidden;
`;

const SidePanelHeader = styled.div`
  padding: 12px 14px;
  border-bottom: 1px solid #C7CED6;
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
  background: #F1F4F8;
`;

const SideList = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const BranchCard = styled.div<{ $selected?: boolean }>`
  padding: 12px 14px;
  border-bottom: 1px solid #EEF2F6;
  cursor: pointer;
  transition: background 0.12s;
  background: ${p => p.$selected ? '#F0EDFF' : 'white'};
  border-left: 3px solid ${p => p.$selected ? '#635BFF' : 'transparent'};
  &:hover { background: ${p => p.$selected ? '#F0EDFF' : '#F1F4F8'}; }
  h4 { margin: 0 0 4px; font-size: 14px; color: #0A2540; display: flex; align-items: center; gap: 8px; }
  .code { font-size: 11px; color: #6B7280; font-weight: 500; }
  .addr { font-size: 12px; color: #4B5563; margin-top: 2px; }
  .stats { margin-top: 6px; display: flex; gap: 8px; font-size: 11px; color: #374151; }
  .stats b { color: #0A2540; }
  .occupancy { background: var(--c); color: white; padding: 1px 6px; border-radius: 4px; font-size: 10px; font-weight: 600; }
`;

const TenantSubList = styled.div`
  padding: 8px 14px 12px;
  background: #F9FAFB;
  border-bottom: 1px solid #EEF2F6;
  .sub-title { font-size: 11px; font-weight: 600; color: #4B5563; text-transform: uppercase; margin: 4px 0; }
`;

const TenantRow = styled.div<{ $selected?: boolean }>`
  padding: 6px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  color: #1F2937;
  background: ${p => p.$selected ? '#E0E7FF' : 'transparent'};
  &:hover { background: ${p => p.$selected ? '#E0E7FF' : '#F1F4F8'}; }
  display: flex; align-items: center; gap: 6px;
  .dot { width: 8px; height: 8px; border-radius: 50%; background: var(--c, #6B7280); flex-shrink: 0; }
  .name { flex: 1; }
  .sales { color: #6B7280; font-size: 11px; }
`;

const NoTenants = styled.div`
  font-size: 12px; color: #6B7280; font-style: italic; padding: 4px 8px;
`;

const MapWrap = styled.div`
  border: 1px solid #C7CED6; border-radius: 8px; overflow: hidden; height: 640px;
  .leaflet-container { height: 100%; width: 100%; }
  @media (max-width: 960px) { height: 480px; }
`;

const Legend = styled.div`display: flex; flex-wrap: wrap; gap: 16px; font-size: 12px; color: #374151;`;
const LegendItem = styled.span`
  display: inline-flex; align-items: center; gap: 6px;
  &::before { content: ''; width: 10px; height: 10px; border-radius: 50%; background: var(--c, #6B7280); }
`;

const Summary = styled.div`
  display: flex; gap: 16px; font-size: 13px; color: #374151;
  strong { color: #0A2540; }
`;

const UnmappedBox = styled.div`
  border: 1px solid #C7CED6; border-radius: 8px; padding: 12px 16px; background: #F9FAFB;
  margin-top: 16px;
`;

const UnmappedTitle = styled.div`font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 8px;`;

const UnmappedList = styled.ul`
  margin: 0; padding-left: 20px; font-size: 13px; color: #4B5563;
  li { margin: 2px 0; }
`;

const EmptyState = styled.div`padding: 48px 16px; text-align: center; color: #4B5563; font-size: 14px;`;

const FRANCHISE_TYPES = ['franchise', 'license', 'master', 'revenue_share'];

const createBranchIcon = (status: string, unitStats: Branch['unit_stats'], selected: boolean) => {
  const color = STATUS_COLOR[status] || '#6B7280';
  const occupancyRate = unitStats.total > 0 ? occupiedCount(unitStats) / unitStats.total : 0;
  const pct = Math.round(occupancyRate * 100);
  const size = selected ? 44 : 36;
  const h = Math.round(size * 46 / 36);
  // Selection indicated by inner ring accent (no external drop-shadow → avoids clipping)
  const selectedRing = selected ? `<circle cx="18" cy="18" r="14" fill="none" stroke="#635BFF" stroke-width="2"/>` : '';
  const svg = `
    <svg width="${size}" height="${h}" viewBox="0 0 36 46" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 0C8.1 0 0 8.1 0 18c0 12.2 18 28 18 28s18-15.8 18-28C36 8.1 27.9 0 18 0z" fill="${color}"/>
      ${selectedRing}
      <circle cx="18" cy="18" r="12" fill="white"/>
      <text x="18" y="22" text-anchor="middle" font-size="11" font-weight="700" fill="${color}">${pct}%</text>
    </svg>`;
  return L.divIcon({
    html: svg, className: 'tenancy-map-branch-pin',
    iconSize: [size, h], iconAnchor: [size / 2, h], popupAnchor: [0, -(h - 4)]
  });
};

const createRestaurantIcon = (status: string, contractType: string | null) => {
  const color = STATUS_COLOR[status] || '#6B7280';
  const isFranchise = contractType && FRANCHISE_TYPES.includes(contractType);
  const isDirect = contractType === 'direct' || contractType === 'standard';
  const mark = isFranchise
    ? `<polygon points="11,6 12,9.2 15.2,9.2 12.6,11.2 13.6,14.4 11,12.4 8.4,14.4 9.4,11.2 6.8,9.2 10,9.2" fill="#FFFFFF"/>`
    : isDirect
      ? `<circle cx="11" cy="11" r="4" fill="white"/>`
      : `<circle cx="11" cy="11" r="2.5" fill="white" opacity="0.7"/>`;
  const svg = `
    <svg width="22" height="32" viewBox="0 0 22 32" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 0C4.9 0 0 4.9 0 11c0 7.5 11 21 11 21s11-13.5 11-21C22 4.9 17.1 0 11 0z" fill="${color}"/>
      ${mark}
    </svg>`;
  return L.divIcon({
    html: svg, className: 'tenancy-map-restaurant-pin',
    iconSize: [22, 32], iconAnchor: [11, 32], popupAnchor: [0, -30]
  });
};

// View controller — setView on selection change, fitBounds when selection cleared
const MapView: React.FC<{ branches: Branch[]; selectedBranch: Branch | null }> = ({ branches, selectedBranch }) => {
  const map = useMap();
  useEffect(() => {
    if (selectedBranch && selectedBranch.latitude != null && selectedBranch.longitude != null) {
      map.setView([selectedBranch.latitude, selectedBranch.longitude], 16, { animate: true });
      return;
    }
    const pts = branches.filter(b => b.latitude != null && b.longitude != null);
    if (pts.length === 0) return;
    if (pts.length === 1) {
      map.setView([pts[0].latitude as number, pts[0].longitude as number], 14);
      return;
    }
    const bounds = L.latLngBounds(pts.map(p => [p.latitude as number, p.longitude as number]));
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
  }, [branches, selectedBranch, map]);
  return null;
};

// Pins layer
interface PopupLabels {
  primary: string;
  total: string;
  occupied: string;
  vacant: string;
  type: string;
  sales30d: string;
  currencySymbol: string;
}
const PinsLayer: React.FC<{
  branches: Branch[];
  tenantsForSelected: Restaurant[];
  selectedBranchId: number | null;
  onBranchClick: (id: number) => void;
  onTenantClick?: (restaurantId: number) => void;
  popupLabels: PopupLabels;
}> = ({ branches, tenantsForSelected, selectedBranchId, onBranchClick, onTenantClick, popupLabels }) => {
  const map = useMap();
  const { i18n } = useTranslation();
  const layerRef = useRef<any>(null);

  useEffect(() => {
    if (!map) return;
    if (layerRef.current) {
      layerRef.current.clearLayers();
      map.removeLayer(layerRef.current);
    }
    const layer = L.layerGroup();

    branches.forEach(b => {
      if (b.latitude == null || b.longitude == null) return;
      const isSelected = selectedBranchId === b.id;
      const marker = L.marker([b.latitude, b.longitude], { icon: createBranchIcon(b.status, b.unit_stats, isSelected) });
      marker.on('click', () => onBranchClick(b.id));
      const color = STATUS_COLOR[b.status] || '#6B7280';
      const occ = occupiedCount(b.unit_stats);
      // Popup strings are rendered into raw HTML by Leaflet, so escape user-controlled
      // fields (branch name, code, address) to avoid stored-XSS when names contain angle brackets.
      const esc = (s: any) => String(s ?? '').replace(/[&<>"']/g, (ch) =>
        ch === '&' ? '&amp;' : ch === '<' ? '&lt;' : ch === '>' ? '&gt;' : ch === '"' ? '&quot;' : '&#39;');
      const html = `
        <div style="min-width:220px">
          <h4 style="margin:0 0 6px;font-size:14px;color:#0A2540">${esc(b.name)}${b.is_primary ? ` <span style="font-size:10px;background:#F0EDFF;color:#635BFF;padding:1px 5px;border-radius:3px">${esc(popupLabels.primary)}</span>` : ''}</h4>
          <div style="font-size:11px;color:#6B7280;margin:2px 0">${esc(b.code)}</div>
          ${(() => { const a = formatAddress(b, 'short', (i18n.language as AppLocale) || 'en'); return a ? `<div style="font-size:12px;color:#4B5563;margin:2px 0">${esc(a)}</div>` : (b.address ? `<div style="font-size:12px;color:#4B5563;margin:2px 0">${esc(b.address)}</div>` : ''); })()}
          <div style="display:flex;gap:10px;margin-top:8px;font-size:11px">
            <span><b>${esc(popupLabels.total)}:</b> ${b.unit_stats.total}</span>
            <span style="color:#10B981"><b>${esc(popupLabels.occupied)}:</b> ${occ}</span>
            <span style="color:#4B5563"><b>${esc(popupLabels.vacant)}:</b> ${b.unit_stats.vacant}</span>
          </div>
          <span style="display:inline-block;padding:2px 8px;border-radius:10px;font-size:11px;font-weight:600;margin-top:6px;color:white;background:${color}">${esc(b.status)}</span>
        </div>`;
      marker.bindPopup(html);
      layer.addLayer(marker);
    });

    // Tenant pins shown only for selected branch
    const esc = (s: any) => String(s ?? '').replace(/[&<>"']/g, (ch) =>
      ch === '&' ? '&amp;' : ch === '<' ? '&lt;' : ch === '>' ? '&gt;' : ch === '"' ? '&quot;' : '&#39;');
    tenantsForSelected.forEach(r => {
      if (r.latitude == null || r.longitude == null) return;
      const m = L.marker([r.latitude, r.longitude], { icon: createRestaurantIcon(r.status, r.contract_type || null) });
      if (onTenantClick) m.on('click', () => onTenantClick(r.id));
      const color = STATUS_COLOR[r.status] || '#6B7280';
      const html = `
        <div style="min-width:200px">
          <h4 style="margin:0 0 6px;font-size:13px;color:#0A2540">${esc(r.name)}${r.branch_name ? ' · ' + esc(r.branch_name) : ''}</h4>
          <div style="font-size:11px;color:#374151;margin:2px 0"><b>${esc(popupLabels.type)}:</b> ${esc(r.contract_type || '—')}</div>
          <div style="font-size:11px;color:#374151"><b>${esc(popupLabels.sales30d)}:</b> ${esc(popupLabels.currencySymbol)} ${(r.sales_30d || 0).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</div>
          <span style="display:inline-block;padding:2px 8px;border-radius:10px;font-size:11px;font-weight:600;margin-top:6px;color:white;background:${color}">${esc(r.status)}</span>
        </div>`;
      m.bindPopup(html);
      layer.addLayer(m);
    });

    layerRef.current = layer;
    map.addLayer(layer);
    return () => {
      if (layerRef.current) { layerRef.current.clearLayers(); map.removeLayer(layerRef.current); layerRef.current = null; }
    };
  }, [branches, tenantsForSelected, selectedBranchId, map, onBranchClick, onTenantClick, popupLabels, i18n.language]);

  return null;
};

const FoodcourtTenancyMapPage: React.FC = () => {
  const { t, i18n } = useTranslation('contract');
  const { user } = useAuth();
  const fcId = user?.foodcourt_id;
  const navigate = useNavigate();
  const canEdit = user?.role === 'System Admin' || user?.role === 'Foodcourt General';

  // fc_plans module gates the billing_gap CTA — without the advanced plans feature,
  // the concept of "no plan linked" does not apply for basic-tier foodcourts.
  const { hasModule } = useAllowedRoutes({
    role: user?.role || '',
    foodcourtId: fcId || null
  });
  const canLinkPlans = hasModule('fc_plans');

  // Opener-aware navigation — same pattern as Floor Plan page.
  const openInOpener = useCallback((path: string) => {
    if (window.opener && !window.opener.closed) {
      try {
        window.opener.location.href = path;
        window.opener.focus();
        window.close();
        return;
      } catch { /* cross-origin or opener blocked — fall back */ }
    }
    navigate(path);
  }, [navigate]);
  const [data, setData] = useState<TenancyMapData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBranchId, setSelectedBranchId] = useState<number | null>(null);
  // Selecting a specific unit inside a branch — switches the right detail panel
  // from branch overview to a unit/tenant-focused view (contract + financial + actions).
  const [selectedUnitId, setSelectedUnitId] = useState<number | null>(null);
  const [stageActionLoading, setStageActionLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!fcId) { setLoading(false); return; }
    (async () => {
      try {
        setLoading(true);
        const token = getAuthToken();
        const res = await fetch(`/api/foodcourts/${fcId}/tenancy-map`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const json = await res.json();
        if (json.success) { setData(json.data); setError(null); }
        else setError(json.message || 'Failed to load map');
      } catch { setError('Failed to load map'); }
      finally { setLoading(false); }
    })();
  }, [fcId]);

  const mappedBranches = useMemo(() => data?.mappedBranches || [], [data]);
  const unmappedBranches = useMemo(() => data?.unmappedBranches || [], [data]);
  const allBranches = useMemo(() => [...mappedBranches, ...unmappedBranches], [mappedBranches, unmappedBranches]);
  const restaurants = useMemo(() => data?.restaurants || [], [data]);

  const selectedBranch = useMemo(
    () => allBranches.find(b => b.id === selectedBranchId) || null,
    [allBranches, selectedBranchId]
  );

  const selectedUnit = useMemo(() => {
    if (!selectedUnitId) return null;
    for (const b of allBranches) {
      const u = b.units?.find(x => x.id === selectedUnitId);
      if (u) return { unit: u, branch: b };
    }
    return null;
  }, [allBranches, selectedUnitId]);

  const tenantsForSelected = useMemo(
    () => selectedBranchId ? restaurants.filter(r => r.branch_id === selectedBranchId) : [],
    [restaurants, selectedBranchId]
  );

  const tenantsByBranch = useMemo(() => {
    const map: Record<number, Restaurant[]> = {};
    restaurants.forEach(r => {
      if (r.branch_id == null) return;
      if (!map[r.branch_id]) map[r.branch_id] = [];
      map[r.branch_id].push(r);
    });
    return map;
  }, [restaurants]);

  // Labels injected into the Leaflet popup HTML strings — computed in the
  // component so they respect i18next language switches.
  const fcCurrencyCode = data?.foodcourt?.currency || 'MYR';
  const popupLabels: PopupLabels = useMemo(() => ({
    primary: t('map.primary', 'PRIMARY'),
    total: t('map.popup.total', 'Total'),
    occupied: t('map.popup.occupied', 'Occupied'),
    vacant: t('map.popup.vacant', 'Vacant'),
    type: t('map.popup.type', 'Type'),
    sales30d: t('map.popup.sales30d', 'Sales 30d'),
    currencySymbol: getCurrencySymbol(fcCurrencyCode) || fcCurrencyCode
  }), [t, fcCurrencyCode]);

  if (loading) return <EmptyState>{t('common.loading', 'Loading...')}</EmptyState>;
  if (error) return <EmptyState style={{ color: '#DC2626' }}>{error}</EmptyState>;
  if (!data || data.total_branches === 0) {
    return (
      <div style={{ padding: 32, display: 'flex', justifyContent: 'center' }}>
        <CommonEmptyState
          title={t('map.emptyTitle', 'No branches yet')}
          description={t('map.emptyDescription', 'The tenancy map plots tenants onto branch units. Register a branch first, then lay out units to populate the map.')}
          primaryAction={{ label: t('map.createBranchCta', 'Create Branch'), onClick: () => navigate('/pos/foodcourt/branches') }}
          secondaryAction={{ label: t('map.openFloorPlanCta', 'Open Floor Plan'), onClick: () => navigate('/pos/foodcourt/floor-plan') }}
          steps={[
            { label: t('map.guideStep1', 'Register one or more branches.') },
            { label: t('map.guideStep2', 'Lay out the floor plan & units for each branch.') },
            { label: t('map.guideStep3', 'Place tenant restaurants onto units.') }
          ]}
        />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Summary>
        <span><strong>{data.total_branches}</strong> {t('map.branches', 'branches')}</span>
        <span><strong>{mappedBranches.length}</strong> {t('map.mapped', 'on map')}</span>
        <span><strong>{data.total_restaurants}</strong> {t('map.tenants', 'tenant restaurants')}</span>
      </Summary>

      <Legend>
        <LegendItem style={{ ['--c' as any]: STATUS_COLOR.active }}>{t('map.legend.active', 'Active')}</LegendItem>
        <LegendItem style={{ ['--c' as any]: STATUS_COLOR.trial }}>{t('map.legend.trial', 'Trial')}</LegendItem>
        <LegendItem style={{ ['--c' as any]: STATUS_COLOR.overdue }}>{t('map.legend.overdue', 'Overdue')}</LegendItem>
        <LegendItem style={{ ['--c' as any]: STATUS_COLOR.suspended }}>{t('map.legend.suspended', 'Suspended')}</LegendItem>
        <LegendItem style={{ ['--c' as any]: STATUS_COLOR.inactive }}>{t('map.legend.archive', 'Archive')}</LegendItem>
      </Legend>

      <Layout $hasDetail={!!selectedBranch}>
        <SidePanel>
          <SidePanelHeader>
            {t('map.branchListHeader', 'Branches ({{count}})', { count: allBranches.length })}
          </SidePanelHeader>
          <SideList>
            {allBranches.map(b => {
              const isSelected = selectedBranchId === b.id;
              const color = STATUS_COLOR[b.status] || '#6B7280';
              const pct = b.unit_stats.total > 0 ? Math.round(occupiedCount(b.unit_stats) / b.unit_stats.total * 100) : 0;
              // Sort units: non-vacant first (by stage priority), then vacant; each alphabetical by unit_number
              const stageOrder: Record<string, number> = { active: 1, setup: 2, contracting: 3, proposal: 4, expired: 5, vacant: 6 };
              const sortedUnits = [...(b.units || [])].sort((a, b2) => {
                const sa = stageOrder[a.displayStage] ?? 9;
                const sb = stageOrder[b2.displayStage] ?? 9;
                if (sa !== sb) return sa - sb;
                return String(a.unit_number).localeCompare(String(b2.unit_number), undefined, { numeric: true });
              });
              return (
                <React.Fragment key={b.id}>
                  <BranchCard
                    $selected={isSelected}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedBranchId(null);
                        setSelectedUnitId(null);
                      } else {
                        setSelectedBranchId(b.id);
                        setSelectedUnitId(null);
                      }
                    }}
                  >
                    <h4>
                      {b.name}
                      {b.is_primary && <span style={{ fontSize: 10, background: '#F0EDFF', color: '#635BFF', padding: '1px 5px', borderRadius: 3 }}>{t('map.primary', 'PRIMARY')}</span>}
                      <span className="occupancy" style={{ ['--c' as any]: color, marginLeft: 'auto' }}>{pct}%</span>
                    </h4>
                    <div className="code">{b.code}</div>
                    {(formatAddress(b, 'short', (i18n.language as AppLocale) || 'en') || b.address) && <div className="addr">{formatAddress(b, 'short', (i18n.language as AppLocale) || 'en') || b.address}</div>}
                    <div style={{ fontSize: 11, color: '#4B5563', marginTop: 4 }}>
                      <b style={{ color: '#0A2540' }}>{b.unit_stats.total}</b> {t('map.units', 'units')}
                      {b.latitude == null && <span style={{ color: '#EF4444', marginLeft: 6 }}>no coords</span>}
                    </div>
                    <StatsPillRow>
                      {(['active', 'setup', 'contracting', 'proposal', 'vacant', 'expired'] as const).map(k => {
                        const n = b.unit_stats[k];
                        if (!n) return null;
                        const p = STAGE_PALETTE[k];
                        return (
                          <StatPill key={k} $bg={p.bg} $text={p.text} $border={p.border}>
                            {n} {t(`floorPlan.unitStatus.${k === 'active' ? 'active' : k}`, p.label).toLowerCase()}
                          </StatPill>
                        );
                      })}
                    </StatsPillRow>
                  </BranchCard>
                  {/* Nested unit list — auto-expand for the selected branch. Click a unit
                      to switch the right detail panel from branch-level to unit/tenant-level. */}
                  {isSelected && sortedUnits.length > 0 && (
                    <TenantSubList>
                      <div className="sub-title">{t('map.tenantsIn', 'Tenants ({{count}})', { count: sortedUnits.length })}</div>
                      {sortedUnits.map(u => {
                        const pal = STAGE_PALETTE[u.displayStage] || STAGE_PALETTE.vacant;
                        const tenantName = u.currentContract?.restaurant?.name || u.currentContract?.applicant_company_name || null;
                        return (
                          <TenantRow
                            key={u.id}
                            $selected={selectedUnitId === u.id}
                            style={{ ['--c' as any]: pal.border }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedUnitId(selectedUnitId === u.id ? null : u.id);
                            }}
                          >
                            <span className="dot" />
                            <span className="name">
                              <b style={{ color: '#0A2540', marginRight: 6 }}>{u.unit_number}</b>
                              {tenantName ? tenantName : <span style={{ color: '#6B7280', fontStyle: 'italic' }}>{t('floorPlan.unitStatus.vacant', 'Vacant')}</span>}
                            </span>
                            <span className="sales" style={{ color: pal.text, fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.3 }}>
                              {t(`floorPlan.unitStatus.${u.displayStage}`, pal.label)}
                            </span>
                          </TenantRow>
                        );
                      })}
                    </TenantSubList>
                  )}
                </React.Fragment>
              );
            })}
          </SideList>
        </SidePanel>

        {mappedBranches.length > 0 ? (
          <MapWrap>
            <MapContainer center={[3.139, 101.6869]} zoom={6} scrollWheelZoom>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
              <PinsLayer
                branches={mappedBranches}
                tenantsForSelected={tenantsForSelected}
                selectedBranchId={selectedBranchId}
                onBranchClick={(id) => { setSelectedBranchId(id === selectedBranchId ? null : id); setSelectedUnitId(null); }}
                onTenantClick={(restaurantId) => {
                  // Locate the unit belonging to this restaurant under the currently selected branch
                  const b = allBranches.find(x => x.id === selectedBranchId);
                  if (!b) return;
                  const u = (b.units || []).find(x => x.currentContract?.restaurant?.id === restaurantId);
                  if (u) setSelectedUnitId(u.id);
                }}
                popupLabels={popupLabels}
              />
              <MapView branches={mappedBranches} selectedBranch={selectedBranch} />
            </MapContainer>
          </MapWrap>
        ) : (
          <EmptyState>{t('map.noCoordsFoodcourt', 'No branches have coordinates yet. Edit a branch to add location data.')}</EmptyState>
        )}

        {/* Right detail panel — 2-mode:
            (A) unit/tenant selected → unit-level detail (contract, financial, actions)
            (B) only branch selected → branch-level overview (info + unit list)
            Mirrors the Brand Franchise Map and Foodcourt Floor Plan detail patterns. */}
        {selectedUnit ? (() => {
          const u = selectedUnit.unit;
          const bRef = selectedUnit.branch;
          const c = u.currentContract;
          const pal = STAGE_PALETTE[u.displayStage] || STAGE_PALETTE.vacant;
          const displayStatus = u.displayStage;
          const daysLeft = c?.end_date ? Math.ceil((new Date(c.end_date + 'T00:00:00').getTime() - Date.now()) / (24 * 3600 * 1000)) : null;
          const isExpiring = (c?.stage === 'active') && daysLeft != null && daysLeft <= (c?.renewal_alert_months ?? 3) * 30;
          const isExpired = displayStatus === 'expired';
          const isVacant = displayStatus === 'vacant';
          const fcCurrencyCode2 = data?.foodcourt?.currency || 'MYR';
          const currency = getCurrencySymbol(fcCurrencyCode2) || fcCurrencyCode2;
          const fcTimeZone = data?.foodcourt?.time_zone || 'Asia/Kuala_Lumpur';
          const ft = (c?.financial_terms && !c?.financial_redacted) ? c.financial_terms : null;
          const fullCode = bRef.code ? `${bRef.code}-${u.unit_number}` : u.unit_number;

          const nextStageMap: Record<string, string | null> = {
            proposal: 'contracting', contracting: 'setup', setup: 'active',
            active: null, expired: null, terminated: null, renewed: null, vacant: null
          };
          const nextStageLabel: Record<string, string> = {
            contracting: t('floorPlan.action.advanceToContracting', 'Advance to Contracting'),
            setup: t('floorPlan.action.advanceToSetup', 'Advance to Setup'),
            active: t('floorPlan.action.advanceToActive', 'Mark Active')
          };
          const nextStageFor = c ? nextStageMap[c.stage] : null;
          const fmt = (v: any) => Number(v || 0).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 });

          const doAdvanceStage = async () => {
            if (!c || !nextStageFor) return;
            const confirmMsg = t('floorPlan.action.advanceConfirm',
              'Advance contract {{num}} to "{{stage}}"?',
              { num: (c as any).contract_number || `#${c.id}`, stage: nextStageFor });
            if (!window.confirm(confirmMsg)) return;
            setStageActionLoading(true);
            try {
              const token = getAuthToken();
              const res = await fetch(`/api/contracts/${c.id}/stage`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ stage: nextStageFor })
              });
              const resp = await res.json();
              if (!res.ok || resp.success === false) {
                alert(resp.message || 'Failed to advance stage');
                return;
              }
              // Reload tenancy map to reflect the new stage
              const reloadRes = await fetch(`/api/foodcourts/${fcId}/tenancy-map`, { headers: { Authorization: `Bearer ${token}` } });
              const reload = await reloadRes.json();
              if (reload.success) setData(reload.data);
            } finally {
              setStageActionLoading(false);
            }
          };

          return (
            <DetailPanel>
              <DetailHeader>
                <div>
                  <h3 className="title">
                    {fullCode}{' '}
                    <StatPill $bg={pal.bg} $text={pal.text} $border={pal.border} style={{ marginLeft: 6 }}>
                      {t(`floorPlan.unitStatus.${displayStatus}`, pal.label)}
                    </StatPill>
                  </h3>
                  <div className="code">{bRef.name}{bRef.is_primary ? ' · PRIMARY' : ''}</div>
                </div>
                <button className="close" onClick={() => setSelectedUnitId(null)} aria-label={t('common.close', 'Close')} type="button">✕</button>
              </DetailHeader>
              <DetailBody>
                {/* Billing gap — only relevant when fc_plans module is active */}
                {(u as any).billing_gap && canLinkPlans && c && (
                  <DetailSection>
                    <div style={{ padding: '10px 12px', background: '#FEE2E2', color: '#991B1B', border: '1px solid #DC2626', borderRadius: 6, fontSize: 12, marginBottom: 8 }}>
                      {t('floorPlan.banner.billingGap', 'Billing is not configured — no plan linked to this active contract. Open the contract to link or create a plan.')}
                    </div>
                    {canEdit && (
                      <Button variant="secondary" size="small" type="button"
                        onClick={() => openInOpener(`/pos/foodcourt/tenancy?id=${c.id}#billing`)}>
                        {t('floorPlan.action.linkPlan', 'Link a plan')}
                      </Button>
                    )}
                  </DetailSection>
                )}

                {/* Unit info */}
                <DetailSection>
                  <DetailSectionTitle>{t('floorPlan.sec.unit', 'Unit')}</DetailSectionTitle>
                  <InfoRow><span>{t('floorPlan.unit.code', 'Code')}</span><b>{fullCode}</b></InfoRow>
                  {u.size_value != null && <InfoRow><span>{t('floorPlan.unit.size', 'Size')}</span><b>{u.size_value} {u.size_unit || 'sqft'}</b></InfoRow>}
                  {u.location_description && <InfoRow><span>{t('floorPlan.unit.location', 'Location')}</span><b>{u.location_description}</b></InfoRow>}
                </DetailSection>

                {/* Vacant empty state */}
                {isVacant && (
                  <DetailSection>
                    <div style={{ fontSize: 12, color: '#6B7280', fontStyle: 'italic', padding: '8px 0' }}>
                      {t('floorPlan.vacant.noContract', 'This unit has no contract assigned.')}
                    </div>
                    {canEdit && (
                      <Button variant="primary" fullWidth type="button"
                        onClick={() => openInOpener(`/pos/foodcourt/tenancy?new=1&unit_id=${u.id}`)}>
                        {t('floorPlan.vacant.createProposal', 'Create tenancy proposal')}
                      </Button>
                    )}
                  </DetailSection>
                )}

                {/* Current Contract */}
                {c && (
                  <DetailSection>
                    <DetailSectionTitle>{t('floorPlan.sec.contract', 'Current Contract')}</DetailSectionTitle>
                    <InfoRow><span>{t('floorPlan.contract.number', 'Number')}</span><b>{(c as any).contract_number || `#${c.id}`}</b></InfoRow>
                    {c.contract_type && <InfoRow><span>{t('floorPlan.contract.type', 'Type')}</span><b>{t(`floorPlan.contractType.${c.contract_type}`, c.contract_type)}</b></InfoRow>}
                    {(c.start_date || c.end_date) && (
                      <InfoRow>
                        <span>{t('floorPlan.contract.period', 'Period')}</span>
                        <b>
                          {c.start_date ? new Date(c.start_date).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric', timeZone: fcTimeZone }) : '—'}
                          {' → '}
                          {c.end_date ? new Date(c.end_date).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric', timeZone: fcTimeZone }) : '—'}
                        </b>
                      </InfoRow>
                    )}
                    {daysLeft != null && (c.stage === 'active' || c.stage === 'setup') && (
                      <InfoRow>
                        <span>{t('floorPlan.contract.daysLeft', 'Days remaining')}</span>
                        <b style={{ color: daysLeft < 30 ? '#DC2626' : daysLeft < 90 ? '#D97706' : '#059669' }}>
                          {daysLeft > 0 ? `${daysLeft}d` : t('floorPlan.contract.overdue', 'Past end date')}
                        </b>
                      </InfoRow>
                    )}
                  </DetailSection>
                )}

                {/* Tenant */}
                {c && (c.restaurant || c.applicant_company_name) && (
                  <DetailSection>
                    <DetailSectionTitle>{t('floorPlan.sec.tenant', 'Tenant')}</DetailSectionTitle>
                    {c.restaurant && (
                      <InfoRow><span>{t('floorPlan.tenant.legalEntity', 'Legal entity')}</span><b>{c.restaurant.name}{c.restaurant.branch_name ? ` · ${c.restaurant.branch_name}` : ''}</b></InfoRow>
                    )}
                    {c.applicant_company_name && (!c.restaurant || c.applicant_company_name !== c.restaurant.name) && (
                      <InfoRow><span>{t('floorPlan.tenant.applicant', 'Applicant')}</span><b>{c.applicant_company_name}</b></InfoRow>
                    )}
                  </DetailSection>
                )}

                {/* Financial Terms */}
                {c && c.financial_redacted && (
                  <DetailSection>
                    <DetailSectionTitle>{t('floorPlan.sec.financial', 'Financial Terms')}</DetailSectionTitle>
                    <div style={{ fontSize: 12, color: '#6B7280', fontStyle: 'italic' }}>
                      🔒 {t('floorPlan.fin.redacted', 'Financial terms are visible to Foodcourt General and System Admin only')}
                    </div>
                  </DetailSection>
                )}
                {ft && Object.keys(ft).length > 0 && (
                  <DetailSection>
                    <DetailSectionTitle>{t('floorPlan.sec.financial', 'Financial Terms')}</DetailSectionTitle>
                    {ft.base_rent != null && <InfoRow><span>{t('floorPlan.fin.baseRent', 'Base Rent')}</span><b>{currency} {fmt(ft.base_rent)}/mo</b></InfoRow>}
                    {ft.revenue_share_percent != null && <InfoRow><span>{t('floorPlan.fin.revShare', 'Revenue Share')}</span><b>{ft.revenue_share_percent}% of GTO</b></InfoRow>}
                    {ft.min_guarantee != null && <InfoRow><span>{t('floorPlan.fin.minGuarantee', 'Min Guarantee')}</span><b>{currency} {fmt(ft.min_guarantee)}/mo</b></InfoRow>}
                    {ft.security_deposit != null && <InfoRow><span>{t('floorPlan.fin.deposit', 'Deposit')}</span><b>{currency} {fmt(ft.security_deposit)}</b></InfoRow>}
                    {ft.maintenance_fee != null && <InfoRow><span>{t('floorPlan.fin.cam', 'Maintenance (CAM)')}</span><b>{currency} {fmt(ft.maintenance_fee)}/mo</b></InfoRow>}
                  </DetailSection>
                )}

                {/* Actions */}
                {c && (
                  <DetailSection>
                    <DetailSectionTitle>{t('floorPlan.sec.actions', 'Actions')}</DetailSectionTitle>
                    {canEdit && nextStageFor && (
                      <Button variant="primary" fullWidth type="button"
                        onClick={doAdvanceStage} disabled={stageActionLoading} loading={stageActionLoading}>
                        {nextStageLabel[nextStageFor]}
                      </Button>
                    )}
                    {canEdit && isExpiring && (
                      <Button variant="primary" fullWidth type="button"
                        onClick={() => openInOpener(`/pos/foodcourt/tenancy?id=${c.id}&action=renew`)}>
                        {t('floorPlan.action.renew', 'Renew contract')}
                      </Button>
                    )}
                    {canEdit && isExpired && (
                      <Button variant="primary" fullWidth type="button"
                        onClick={() => openInOpener(`/pos/foodcourt/tenancy?new=1&unit_id=${u.id}`)}>
                        {t('floorPlan.action.newTenancy', 'Create new tenancy')}
                      </Button>
                    )}
                    <div style={{ marginTop: 10 }}>
                      <Button variant="secondary" fullWidth type="button"
                        onClick={() => openInOpener(`/pos/foodcourt/tenancy?id=${c.id}`)}>
                        {t('floorPlan.action.open', 'Open contract')}
                      </Button>
                    </div>
                  </DetailSection>
                )}
              </DetailBody>
            </DetailPanel>
          );
        })() : selectedBranch && (
          <DetailPanel>
            <DetailHeader>
              <div>
                <h3 className="title">
                  {selectedBranch.name}
                  {selectedBranch.is_primary && <span style={{ fontSize: 10, background: '#F0EDFF', color: '#635BFF', padding: '1px 5px', borderRadius: 3, marginLeft: 8, verticalAlign: 'middle' }}>{t('map.primary', 'PRIMARY')}</span>}
                </h3>
                <div className="code">{selectedBranch.code}</div>
              </div>
              <button className="close" onClick={() => setSelectedBranchId(null)} aria-label={t('common.close', 'Close')} type="button">✕</button>
            </DetailHeader>
            <DetailBody>
              {/* Branch info */}
              <DetailSection>
                <DetailSectionTitle>{t('map.branchInfo', 'Branch Info')}</DetailSectionTitle>
                {selectedBranch.address && <InfoRow><span>{t('map.address', 'Address')}</span><b>{formatAddress(selectedBranch, 'oneline', (i18n.language as AppLocale) || 'en') || selectedBranch.address}</b></InfoRow>}
                {selectedBranch.city && <InfoRow><span>{t('map.city', 'City')}</span><b>{selectedBranch.city}{selectedBranch.state ? `, ${selectedBranch.state}` : ''}</b></InfoRow>}
                {selectedBranch.phone && <InfoRow><span>{t('map.phone', 'Phone')}</span><b><a href={`tel:${selectedBranch.phone}`} style={{ color: '#635BFF', textDecoration: 'none' }}>{selectedBranch.phone}</a></b></InfoRow>}
                {selectedBranch.email && <InfoRow><span>{t('map.email', 'Email')}</span><b><a href={`mailto:${selectedBranch.email}`} style={{ color: '#635BFF', textDecoration: 'none' }}>{selectedBranch.email}</a></b></InfoRow>}
              </DetailSection>

              {/* Stage breakdown */}
              <DetailSection>
                <DetailSectionTitle>{t('map.occupancyBreakdown', 'Occupancy Breakdown')}</DetailSectionTitle>
                <StatsPillRow>
                  {(['active', 'setup', 'contracting', 'proposal', 'vacant', 'expired'] as const).map(k => {
                    const n = selectedBranch.unit_stats[k];
                    if (!n) return null;
                    const p = STAGE_PALETTE[k];
                    return (
                      <StatPill key={k} $bg={p.bg} $text={p.text} $border={p.border}>
                        {n} {t(`floorPlan.unitStatus.${k === 'active' ? 'active' : k}`, p.label)}
                      </StatPill>
                    );
                  })}
                </StatsPillRow>
              </DetailSection>

              <ViewFloorPlanLink to={`/pos/foodcourt/floor-plan?branch=${selectedBranch.id}`} target="_blank">
                {t('map.viewFloorPlan', 'View floor plan')}
              </ViewFloorPlanLink>
            </DetailBody>
          </DetailPanel>
        )}
      </Layout>

      {unmappedBranches.length > 0 && (
        <UnmappedBox>
          <UnmappedTitle>{t('map.unmappedBranches', 'Un-mapped Branches ({{count}})', { count: unmappedBranches.length })}</UnmappedTitle>
          <UnmappedList>
            {unmappedBranches.map(b => (
              <li key={b.id}>{b.name} ({b.code}){b.address ? ` — ${b.address}` : ''}</li>
            ))}
          </UnmappedList>
        </UnmappedBox>
      )}
    </div>
  );
};

export default FoodcourtTenancyMapPage;
