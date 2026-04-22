import React, { useEffect, useState, useMemo, useRef } from 'react';
import { MapContainer, TileLayer, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { getAuthToken } from '../../utils/auth';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
});

interface CurrentContract {
  id: number;
  contract_number?: string | null;
  stage: string;
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
}
interface MappedRestaurant {
  id: number;
  name: string;
  branch_name?: string;
  status: string;
  address?: string;
  city?: string;
  state?: string;
  phone?: string;
  email?: string;
  latitude: number;
  longitude: number;
  logo_url?: string;
  is_demo?: boolean;
  sales_30d?: number;
  order_count?: number;
  contract_id?: number | null;
  contract_type?: string | null;
  contract_stage?: string | null;
  radius_km?: number | null;
  currentContract?: CurrentContract | null;
}

interface UnmappedRestaurant extends Omit<MappedRestaurant, 'latitude' | 'longitude'> {
  latitude: null;
  longitude: null;
}

interface FranchiseMapData {
  brand: { id: number; name: string; code: string; logo_url?: string };
  mapped: MappedRestaurant[];
  unmapped: UnmappedRestaurant[];
  total: number;
  max_sales_30d?: number;
}

interface BrandFranchiseMapPageProps {
  brandId: number;
}

const STATUS_COLOR: Record<string, string> = {
  active: '#10B981', trial: '#F59E0B', suspended: '#EF4444', overdue: '#EAB308',
  inactive: '#9CA3AF', expired: '#9CA3AF', cancelled: '#9CA3AF'
};

const FRANCHISE_TYPES = ['franchise', 'license', 'master'];

// ============ Styled ============

const Layout = styled.div<{ $hasDetail?: boolean }>`
  display: grid;
  grid-template-columns: ${p => p.$hasDetail ? '260px 1fr 360px' : '320px 1fr'};
  gap: 12px;
  height: 640px;
  @media (max-width: 1200px) {
    grid-template-columns: ${p => p.$hasDetail ? '240px 1fr 320px' : '280px 1fr'};
  }
  @media (max-width: 960px) {
    grid-template-columns: 1fr; height: auto;
  }
`;

const STAGE_PALETTE: Record<string, { bg: string; border: string; text: string; label: string }> = {
  active:      { bg: '#DCFCE7', border: '#16A34A', text: '#15803D', label: 'Active' },
  setup:       { bg: '#DBEAFE', border: '#3B82F6', text: '#1E40AF', label: 'Setup' },
  contracting: { bg: '#FFEDD5', border: '#F97316', text: '#9A3412', label: 'In Talks' },
  proposal:    { bg: '#EDE9FE', border: '#8B5CF6', text: '#5B21B6', label: 'Proposal' },
  expired:     { bg: '#FEE2E2', border: '#EF4444', text: '#991B1B', label: 'Expired' }
};

const DetailPanel = styled.div`
  display: flex; flex-direction: column;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  background: white;
  overflow: hidden;
`;
const DetailHeader = styled.div`
  padding: 14px 16px;
  border-bottom: 1px solid #E6EBF1;
  display: flex; justify-content: space-between; align-items: flex-start;
  gap: 8px;
  .title { font-size: 15px; font-weight: 700; color: #0A2540; margin: 0; }
  .sub { font-size: 11px; color: #9CA3AF; font-weight: 500; margin-top: 2px; }
  .close { background: none; border: none; cursor: pointer; font-size: 18px; color: #6B7C93; &:hover { color: #0A2540; } }
`;
const DetailBody = styled.div`flex: 1; overflow-y: auto; padding: 14px 16px;`;
const DetailSection = styled.div`margin-bottom: 16px;`;
const DetailSectionTitle = styled.div`
  font-size: 10px; font-weight: 600; color: #6B7C93;
  text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;
`;
const StageBadge = styled.span<{ $bg: string; $text: string; $border: string }>`
  display: inline-block; padding: 2px 10px;
  border-radius: 10px;
  font-size: 10px; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.3px;
  background: ${p => p.$bg}; color: ${p => p.$text};
  border: 1px solid ${p => p.$border};
`;
const InfoRow = styled.div`
  display: flex; justify-content: space-between;
  padding: 4px 0;
  font-size: 12px;
  color: #4B5563;
  b { color: #0A2540; text-align: right; }
`;
const TileGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  margin-bottom: 8px;
`;
const Tile = styled.div<{ $color: string }>`
  padding: 8px;
  border-radius: 6px;
  background: #F8FAFC;
  border-left: 3px solid ${p => p.$color};
`;
const TileLabel = styled.div`
  font-size: 9px; font-weight: 600; color: #6B7C93;
  text-transform: uppercase; letter-spacing: 0.3px;
  margin-bottom: 3px;
`;
const TileValue = styled.div`
  font-size: 13px; font-weight: 700; color: #0A2540;
  line-height: 1.2;
`;
const OpenContractLink = styled.a`
  display: inline-block; margin-top: 8px;
  padding: 8px 14px;
  background: #635BFF;
  color: white;
  border-radius: 6px;
  font-size: 12px; font-weight: 600;
  text-decoration: none;
  &:hover { background: #5A51E6; }
`;

function fmtMoney(v: any): string {
  const n = Number(v);
  if (isNaN(n)) return String(v);
  return n.toLocaleString('en-MY', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

const SidePanel = styled.div`
  display: flex; flex-direction: column;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  background: white;
  overflow: hidden;
`;

const SidePanelHeader = styled.div`
  padding: 12px 14px;
  border-bottom: 1px solid #E6EBF1;
  font-size: 13px; font-weight: 600; color: #0A2540;
  background: #F8FAFC;
  display: flex; align-items: center; gap: 8px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 4px 8px;
  border: 1px solid #E6EBF1;
  border-radius: 4px;
  font-size: 12px;
  &:focus { outline: none; border-color: #635BFF; }
`;

const SideList = styled.div`
  flex: 1; overflow-y: auto;
`;

const RestaurantCard = styled.div<{ $selected?: boolean }>`
  padding: 12px 14px;
  border-bottom: 1px solid #EEF2F6;
  cursor: pointer;
  transition: background 0.12s;
  background: ${p => p.$selected ? '#F0EDFF' : 'white'};
  border-left: 3px solid ${p => p.$selected ? '#635BFF' : 'transparent'};
  &:hover { background: ${p => p.$selected ? '#F0EDFF' : '#F8FAFC'}; }
  h4 { margin: 0 0 4px; font-size: 13px; color: #0A2540; display: flex; align-items: center; gap: 6px; }
  .addr { font-size: 11px; color: #6B7280; margin-top: 2px; }
  .stats { margin-top: 6px; display: flex; gap: 8px; font-size: 11px; color: #4B5563; align-items: center; }
  .status-badge { padding: 1px 6px; border-radius: 4px; font-size: 10px; font-weight: 600; color: white; background: var(--c); }
  .type-mark { font-size: 11px; }
`;

const MapWrap = styled.div`
  border: 1px solid #E6EBF1; border-radius: 8px; overflow: hidden; height: 640px;
  .leaflet-container { height: 100%; width: 100%; }
  @media (max-width: 960px) { height: 480px; }
`;

const Legend = styled.div`display: flex; flex-wrap: wrap; gap: 16px; font-size: 12px; color: #4B5563;`;
const LegendItem = styled.span`
  display: inline-flex; align-items: center; gap: 6px;
  &::before { content: ''; width: 10px; height: 10px; border-radius: 50%; background: var(--c, #9CA3AF); }
`;

const Summary = styled.div`display: flex; gap: 16px; font-size: 13px; color: #4B5563; strong { color: #0A2540; }`;

const UnmappedBox = styled.div`
  border: 1px solid #E6EBF1; border-radius: 8px; padding: 12px 16px; background: #FAFBFC; margin-top: 16px;
`;
const UnmappedTitle = styled.div`font-size: 13px; font-weight: 600; color: #4B5563; margin-bottom: 8px;`;
const UnmappedList = styled.ul`margin: 0; padding-left: 20px; font-size: 13px; color: #6B7280; li { margin: 2px 0; }`;

const EmptyState = styled.div`padding: 48px 16px; text-align: center; color: #6B7280; font-size: 14px;`;

// ============ Map helpers ============

const createPinIcon = (status: string, contractType: string | null, salesIntensity: number, selected: boolean) => {
  const color = STATUS_COLOR[status] || '#9CA3AF';
  const scale = (selected ? 1.2 : 1) * (0.85 + Math.min(1, Math.max(0, salesIntensity)) * 0.6);
  const w = Math.round(28 * scale);
  const h = Math.round(40 * scale);
  const isFranchise = contractType && FRANCHISE_TYPES.includes(contractType);
  const isDirect = contractType === 'direct';
  // Star for franchise/license/master, filled dot for direct, small dot for unknown/no contract
  const starMark = isFranchise
    ? `<polygon points="14,8 15.2,12 19.2,12 16,14.5 17.2,18.5 14,16 10.8,18.5 12,14.5 8.8,12 12.8,12" fill="#FFFFFF"/>`
    : isDirect
      ? `<circle cx="14" cy="14" r="5" fill="white"/>`
      : `<circle cx="14" cy="14" r="3" fill="white" opacity="0.7"/>`;
  // Selection = inner purple ring (no external glow → avoids clipping)
  const selectedRing = selected ? `<circle cx="14" cy="14" r="10" fill="none" stroke="#635BFF" stroke-width="2"/>` : '';
  const svg = `
    <svg width="${w}" height="${h}" viewBox="0 0 28 40" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 0C6.3 0 0 6.3 0 14c0 9.5 14 26 14 26s14-16.5 14-26c0-7.7-6.3-14-14-14z" fill="${color}"/>
      ${selectedRing}
      ${starMark}
    </svg>`;
  return L.divIcon({
    html: svg, className: 'franchise-map-pin',
    iconSize: [w, h], iconAnchor: [Math.round(w / 2), h], popupAnchor: [0, -(h - 4)]
  });
};

const MapView: React.FC<{ points: MappedRestaurant[]; selected: MappedRestaurant | null }> = ({ points, selected }) => {
  const map = useMap();
  useEffect(() => {
    if (selected) {
      map.setView([selected.latitude, selected.longitude], 16, { animate: true });
      return;
    }
    if (points.length === 0) return;
    if (points.length === 1) {
      map.setView([points[0].latitude, points[0].longitude], 14);
      return;
    }
    const bounds = L.latLngBounds(points.map(p => [p.latitude, p.longitude]));
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
  }, [points, selected, map]);
  return null;
};

const ClusterLayer: React.FC<{
  points: MappedRestaurant[];
  maxSales: number;
  selectedId: number | null;
  onPinClick: (id: number) => void;
}> = ({ points, maxSales, selectedId, onPinClick }) => {
  const map = useMap();
  const groupRef = useRef<any>(null);

  useEffect(() => {
    if (!map) return;
    if (groupRef.current) { groupRef.current.clearLayers(); map.removeLayer(groupRef.current); }
    const group = (L as any).markerClusterGroup({ maxClusterRadius: 50 });
    points.forEach(p => {
      const intensity = maxSales > 0 ? (p.sales_30d || 0) / maxSales : 0;
      const isSelected = selectedId === p.id;
      const marker = L.marker([p.latitude, p.longitude], { icon: createPinIcon(p.status, p.contract_type || null, intensity, isSelected) });
      marker.on('click', () => onPinClick(p.id));
      const color = STATUS_COLOR[p.status] || '#9CA3AF';
      const ctypeLabel = p.contract_type || '—';
      const salesLabel = p.sales_30d != null ? p.sales_30d.toLocaleString() : '—';
      const radiusLabel = p.radius_km ? `${p.radius_km} km` : '—';
      const html = `
        <div style="min-width:220px">
          <h4 style="margin:0 0 6px;font-size:14px;color:#0A2540">${p.name}${p.branch_name ? ' · ' + p.branch_name : ''}</h4>
          ${p.address ? `<div style="font-size:12px;color:#6B7280;margin:2px 0">${p.address}</div>` : ''}
          ${p.city || p.state ? `<div style="font-size:12px;color:#6B7280;margin:2px 0">${[p.city, p.state].filter(Boolean).join(', ')}</div>` : ''}
          ${p.phone ? `<div style="font-size:12px;color:#6B7280;margin:2px 0">${p.phone}</div>` : ''}
          <div style="display:flex;gap:12px;margin-top:8px;font-size:11px;color:#4B5563">
            <span><b>Type:</b> ${ctypeLabel}</span>
            <span><b>Radius:</b> ${radiusLabel}</span>
          </div>
          <div style="font-size:11px;color:#4B5563;margin-top:2px"><b>Sales 30d:</b> ${salesLabel} (${p.order_count || 0} orders)</div>
          <span style="display:inline-block;padding:2px 8px;border-radius:10px;font-size:11px;font-weight:600;margin-top:6px;color:white;background:${color}">${p.status}</span>
        </div>`;
      marker.bindPopup(html);
      group.addLayer(marker);
    });
    groupRef.current = group;
    map.addLayer(group);
    return () => {
      if (groupRef.current) { groupRef.current.clearLayers(); map.removeLayer(groupRef.current); groupRef.current = null; }
    };
  }, [points, map, maxSales, selectedId, onPinClick]);

  return null;
};

// ============ Main ============

const BrandFranchiseMapPage: React.FC<BrandFranchiseMapPageProps> = ({ brandId }) => {
  const { t } = useTranslation('contract');
  const [data, setData] = useState<FranchiseMapData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const token = getAuthToken();
        const res = await fetch(`/api/brands/${brandId}/franchise-map`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const json = await res.json();
        if (json.success) { setData(json.data); setError(null); setSelectedId(null); }
        else setError(json.message || 'Failed to load map');
      } catch { setError('Failed to load map'); }
      finally { setLoading(false); }
    })();
  }, [brandId]);

  const mapped = useMemo(() => data?.mapped || [], [data]);
  const unmapped = useMemo(() => data?.unmapped || [], [data]);
  const allRestaurants = useMemo(() => [...mapped, ...unmapped], [mapped, unmapped]);

  const selected = useMemo(
    () => mapped.find(r => r.id === selectedId) || null,
    [mapped, selectedId]
  );

  const filteredList = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return allRestaurants;
    return allRestaurants.filter(r =>
      r.name.toLowerCase().includes(q) ||
      (r.branch_name || '').toLowerCase().includes(q) ||
      (r.address || '').toLowerCase().includes(q) ||
      (r.city || '').toLowerCase().includes(q)
    );
  }, [allRestaurants, search]);

  if (loading) return <EmptyState>{t('common.loading', 'Loading...')}</EmptyState>;
  if (error) return <EmptyState style={{ color: '#DC2626' }}>{error}</EmptyState>;
  if (!data || data.total === 0) return <EmptyState>{t('map.empty', 'No restaurants to display on the map yet.')}</EmptyState>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Summary>
        <span><strong>{data.total}</strong> {t('map.total', 'total')}</span>
        <span><strong>{mapped.length}</strong> {t('map.mapped', 'on map')}</span>
        {unmapped.length > 0 && (
          <span><strong>{unmapped.length}</strong> {t('map.unmapped', 'un-mapped')}</span>
        )}
      </Summary>

      <Legend>
        <LegendItem style={{ ['--c' as any]: STATUS_COLOR.active }}>{t('map.legend.active', 'Active')}</LegendItem>
        <LegendItem style={{ ['--c' as any]: STATUS_COLOR.trial }}>{t('map.legend.trial', 'Trial')}</LegendItem>
        <LegendItem style={{ ['--c' as any]: STATUS_COLOR.overdue }}>{t('map.legend.overdue', 'Overdue')}</LegendItem>
        <LegendItem style={{ ['--c' as any]: STATUS_COLOR.suspended }}>{t('map.legend.suspended', 'Suspended')}</LegendItem>
        <LegendItem style={{ ['--c' as any]: STATUS_COLOR.inactive }}>{t('map.legend.archive', 'Archive')}</LegendItem>
        <span style={{ marginLeft: 12, color: '#6B7280' }}>
          ★ {t('map.legend.franchise', 'Franchise/License')}  ·  ● {t('map.legend.direct', 'Direct')}  ·  ⎯⎯ {t('map.legend.territory', 'Territory radius')}
        </span>
        <span style={{ marginLeft: 12, color: '#6B7280' }}>{t('map.legend.sizeNote', 'Pin size = sales last 30d')}</span>
      </Legend>

      <Layout $hasDetail={!!selected}>
        <SidePanel>
          <SidePanelHeader>
            <span>{t('map.restaurantListHeader', 'Restaurants ({{count}})', { count: filteredList.length })}</span>
            <SearchInput
              placeholder={t('map.search', 'Search...')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </SidePanelHeader>
          <SideList>
            {filteredList.map(r => {
              const isSelected = selectedId === r.id;
              const color = STATUS_COLOR[r.status] || '#9CA3AF';
              const isFranchise = r.contract_type && FRANCHISE_TYPES.includes(r.contract_type);
              const isDirect = r.contract_type === 'direct';
              const hasCoords = r.latitude != null && r.longitude != null;
              const typeMark = isFranchise ? '★' : isDirect ? '●' : '';
              const typeTitle = isFranchise ? 'Franchise/License' : isDirect ? 'Direct' : '';
              return (
                <RestaurantCard
                  key={r.id}
                  $selected={isSelected}
                  onClick={() => hasCoords ? setSelectedId(isSelected ? null : r.id) : undefined}
                  style={!hasCoords ? { opacity: 0.6, cursor: 'not-allowed' } : {}}
                >
                  <h4>
                    {typeMark && <span className="type-mark" title={typeTitle}>{typeMark}</span>}
                    {r.name}{r.branch_name ? ` · ${r.branch_name}` : ''}
                    <span className="status-badge" style={{ ['--c' as any]: color, marginLeft: 'auto' }}>{r.status}</span>
                  </h4>
                  {r.address && <div className="addr">{r.address}{r.city ? `, ${r.city}` : ''}</div>}
                  <div className="stats">
                    {r.contract_type && <span><b>{r.contract_type}</b></span>}
                    {r.sales_30d != null && <span>{r.sales_30d.toLocaleString()} sales 30d</span>}
                    {!hasCoords && <span style={{ color: '#EF4444' }}>no coords</span>}
                  </div>
                </RestaurantCard>
              );
            })}
          </SideList>
        </SidePanel>

        {mapped.length > 0 ? (
          <MapWrap>
            <MapContainer center={[3.139, 101.6869]} zoom={6} scrollWheelZoom>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
              {mapped.filter(p => p.radius_km && p.radius_km > 0).map(p => {
                const isSelected = selectedId === p.id;
                const color = STATUS_COLOR[p.status] || '#9CA3AF';
                return (
                  <Circle
                    key={`radius-${p.id}`}
                    center={[p.latitude, p.longitude]}
                    radius={(p.radius_km as number) * 1000}
                    pathOptions={{
                      color,
                      fillOpacity: 0,         // no color fill — avoids green wash over the map
                      opacity: isSelected ? 0.7 : 0.35,
                      weight: isSelected ? 1.5 : 1,
                      dashArray: '4 4'
                    }}
                  />
                );
              })}
              <ClusterLayer
                points={mapped}
                maxSales={data.max_sales_30d || 0}
                selectedId={selectedId}
                onPinClick={(id) => setSelectedId(id === selectedId ? null : id)}
              />
              <MapView points={mapped} selected={selected} />
            </MapContainer>
          </MapWrap>
        ) : (
          <EmptyState>{t('map.noCoords', 'No restaurants have coordinates yet. Edit a restaurant to add location data.')}</EmptyState>
        )}

        {/* Right detail panel — contract + tenant info for clicked restaurant */}
        {selected && (() => {
          const c = selected.currentContract;
          const stagePalette = c && STAGE_PALETTE[c.stage] ? STAGE_PALETTE[c.stage] : null;
          const daysLeft = c?.end_date ? Math.ceil((new Date(c.end_date + 'T00:00:00').getTime() - Date.now()) / (24 * 3600 * 1000)) : null;
          const ft = (c?.financial_terms && !c.financial_redacted) ? c.financial_terms : null;
          const currency = 'RM';

          return (
            <DetailPanel>
              <DetailHeader>
                <div>
                  <h3 className="title">{selected.name}{selected.branch_name ? ` · ${selected.branch_name}` : ''}</h3>
                  {(selected.city || selected.address) && (
                    <div className="sub">{[selected.address, selected.city, selected.state].filter(Boolean).join(', ')}</div>
                  )}
                </div>
                <button className="close" onClick={() => setSelectedId(null)} aria-label={t('common.close', 'Close')} type="button">✕</button>
              </DetailHeader>
              <DetailBody>
                {/* Restaurant basics */}
                <DetailSection>
                  <DetailSectionTitle>{t('map.restaurant', 'Restaurant')}</DetailSectionTitle>
                  <InfoRow><span>{t('map.status', 'Status')}</span>
                    <b style={{ color: STATUS_COLOR[selected.status] || '#6B7280' }}>{selected.status}</b></InfoRow>
                  {selected.phone && <InfoRow><span>{t('map.phone', 'Phone')}</span>
                    <b><a href={`tel:${selected.phone}`} style={{ color: '#635BFF', textDecoration: 'none' }}>{selected.phone}</a></b></InfoRow>}
                  {selected.email && <InfoRow><span>{t('map.email', 'Email')}</span>
                    <b><a href={`mailto:${selected.email}`} style={{ color: '#635BFF', textDecoration: 'none' }}>{selected.email}</a></b></InfoRow>}
                  <InfoRow><span>{t('map.sales30d', 'Sales (30d)')}</span>
                    <b>{currency} {fmtMoney(selected.sales_30d || 0)}</b></InfoRow>
                </DetailSection>

                {/* Contract */}
                {c ? (
                  <>
                    <DetailSection>
                      <DetailSectionTitle>
                        {t('floorPlan.sec.contract', 'Current Contract')}
                        {stagePalette && (
                          <StageBadge
                            style={{ marginLeft: 8 }}
                            $bg={stagePalette.bg}
                            $text={stagePalette.text}
                            $border={stagePalette.border}
                          >
                            {t(`floorPlan.unitStatus.${c.stage}`, stagePalette.label)}
                          </StageBadge>
                        )}
                      </DetailSectionTitle>
                      <InfoRow><span>{t('floorPlan.contract.number', 'Number')}</span>
                        <b>{c.contract_number || `#${c.id}`}</b></InfoRow>
                      {c.contract_type && <InfoRow><span>{t('floorPlan.contract.type', 'Type')}</span>
                        <b>{t(`floorPlan.contractType.${c.contract_type}`, c.contract_type)}</b></InfoRow>}
                      {(c.start_date || c.end_date) && (
                        <InfoRow>
                          <span>{t('floorPlan.contract.period', 'Period')}</span>
                          <b>
                            {c.start_date ? new Date(c.start_date).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric', timeZone: 'Asia/Kuala_Lumpur' }) : '—'}
                            {' → '}
                            {c.end_date ? new Date(c.end_date).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric', timeZone: 'Asia/Kuala_Lumpur' }) : '—'}
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
                      {c.renewal_type && (
                        <InfoRow><span>{t('floorPlan.contract.renewal', 'Renewal')}</span>
                          <b>{t(`floorPlan.renewalType.${c.renewal_type}`, c.renewal_type)}
                            {c.renewal_alert_months ? ` · ${c.renewal_alert_months}mo alert` : ''}
                          </b></InfoRow>
                      )}
                    </DetailSection>

                    {/* Applicant (legal entity + contact) */}
                    {(c.applicant_company_name || c.applicant_contact_person) && (
                      <DetailSection>
                        <DetailSectionTitle>{t('floorPlan.sec.tenant', 'Tenant')}</DetailSectionTitle>
                        {c.applicant_company_name && <InfoRow><span>{t('floorPlan.tenant.legalEntity', 'Legal entity')}</span>
                          <b>{c.applicant_company_name}</b></InfoRow>}
                        {c.applicant_contact_person && <InfoRow><span>{t('floorPlan.tenant.contact', 'Contact')}</span>
                          <b>{c.applicant_contact_person}</b></InfoRow>}
                        {c.applicant_phone && <InfoRow><span>{t('floorPlan.tenant.phone', 'Phone')}</span>
                          <b><a href={`tel:${c.applicant_phone}`} style={{ color: '#635BFF', textDecoration: 'none' }}>{c.applicant_phone}</a></b></InfoRow>}
                        {c.applicant_email && <InfoRow><span>{t('floorPlan.tenant.email', 'Email')}</span>
                          <b><a href={`mailto:${c.applicant_email}`} style={{ color: '#635BFF', textDecoration: 'none' }}>{c.applicant_email}</a></b></InfoRow>}
                      </DetailSection>
                    )}

                    {/* Financial terms — Brand-style: franchise_fee + royalties + marketing fund + deposit */}
                    {c.financial_redacted && (
                      <DetailSection>
                        <DetailSectionTitle>{t('floorPlan.sec.financial', 'Financial Terms')}</DetailSectionTitle>
                        <div style={{ fontSize: 12, color: '#9CA3AF', fontStyle: 'italic' }}>
                          🔒 {t('floorPlan.fin.redacted', 'Financial terms are visible to Brand General and System Admin only')}
                        </div>
                      </DetailSection>
                    )}
                    {ft && Object.keys(ft).length > 0 && (
                      <DetailSection>
                        <DetailSectionTitle>{t('floorPlan.sec.financial', 'Financial Terms')}</DetailSectionTitle>
                        <TileGrid>
                          {ft.franchise_fee != null && <Tile $color="#15803D"><TileLabel>{t('map.fin.franchiseFee', 'Franchise Fee')}</TileLabel><TileValue>{currency} {fmtMoney(ft.franchise_fee)}</TileValue></Tile>}
                          {ft.royalty_value != null && <Tile $color="#1E40AF"><TileLabel>{t('map.fin.royalty', 'Royalty')}</TileLabel><TileValue>{ft.royalty_type === 'percent' ? `${ft.royalty_value}%` : `${currency} ${fmtMoney(ft.royalty_value)}`}</TileValue></Tile>}
                          {ft.marketing_fund_value != null && <Tile $color="#B45309"><TileLabel>{t('map.fin.marketingFund', 'Marketing Fund')}</TileLabel><TileValue>{ft.marketing_fund_type === 'percent' ? `${ft.marketing_fund_value}%` : `${currency} ${fmtMoney(ft.marketing_fund_value)}`}</TileValue></Tile>}
                          {ft.security_deposit != null && <Tile $color="#6D28D9"><TileLabel>{t('floorPlan.fin.deposit', 'Deposit')}</TileLabel><TileValue>{currency} {fmtMoney(ft.security_deposit)}</TileValue></Tile>}
                        </TileGrid>
                        {ft.territory && <InfoRow><span>{t('map.fin.territory', 'Territory')}</span><b>{ft.territory}</b></InfoRow>}
                        {selected.radius_km && <InfoRow><span>{t('map.fin.exclusivityRadius', 'Exclusivity')}</span><b>{selected.radius_km} km</b></InfoRow>}
                      </DetailSection>
                    )}

                    <OpenContractLink href={`/pos/brand/franchise?id=${c.id}`}>
                      {t('floorPlan.action.open', 'Open contract →')}
                    </OpenContractLink>
                  </>
                ) : (
                  <DetailSection>
                    <div style={{ fontSize: 12, color: '#9CA3AF', fontStyle: 'italic', padding: '8px 0' }}>
                      {t('map.noContract', 'No active contract with this restaurant')}
                    </div>
                  </DetailSection>
                )}
              </DetailBody>
            </DetailPanel>
          );
        })()}
      </Layout>

      {unmapped.length > 0 && (
        <UnmappedBox>
          <UnmappedTitle>{t('map.unmappedTitle', 'Un-mapped Restaurants ({{count}})', { count: unmapped.length })}</UnmappedTitle>
          <UnmappedList>
            {unmapped.map(r => (
              <li key={r.id}>
                {r.name}{r.branch_name ? ` · ${r.branch_name}` : ''}
                {r.address ? ` — ${r.address}` : ''}
              </li>
            ))}
          </UnmappedList>
        </UnmappedBox>
      )}
    </div>
  );
};

export default BrandFranchiseMapPage;
