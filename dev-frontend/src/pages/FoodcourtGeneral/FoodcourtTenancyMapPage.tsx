import React, { useEffect, useState, useMemo, useRef } from 'react';
import { MapContainer, TileLayer, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { getAuthToken } from '../../utils/auth';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
});

interface Branch {
  id: number; name: string; code: string; status: string;
  address?: string; city?: string; state?: string; country?: string;
  phone?: string; email?: string;
  latitude: number | null; longitude: number | null;
  is_primary?: boolean;
  unit_stats: { total: number; occupied: number; vacant: number; reserved: number };
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
  foodcourt: { id: number; name: string; code: string; logo_url?: string };
  mappedBranches: Branch[];
  unmappedBranches: Branch[];
  restaurants: Restaurant[];
  max_sales_30d: number;
  total_branches: number;
  total_restaurants: number;
}

const STATUS_COLOR: Record<string, string> = {
  active: '#10B981', trial: '#F59E0B', suspended: '#EF4444', overdue: '#EAB308',
  inactive: '#9CA3AF', expired: '#9CA3AF', cancelled: '#9CA3AF'
};

const Container = styled.div`display: flex; flex-direction: column; gap: 16px;`;
const MapWrap = styled.div`
  height: 520px; border: 1px solid #E6EBF1; border-radius: 8px; overflow: hidden;
  .leaflet-container { height: 100%; width: 100%; }
`;
const Legend = styled.div`display: flex; flex-wrap: wrap; gap: 16px; font-size: 13px; color: #4B5563;`;
const LegendItem = styled.span`
  display: inline-flex; align-items: center; gap: 6px;
  &::before { content: ''; width: 10px; height: 10px; border-radius: 50%; background: var(--c, #9CA3AF); }
`;
const Summary = styled.div`
  display: flex; gap: 16px; font-size: 13px; color: #4B5563;
  strong { color: #0A2540; }
`;
const UnmappedBox = styled.div`
  border: 1px solid #E6EBF1; border-radius: 8px; padding: 12px 16px; background: #FAFBFC;
`;
const UnmappedTitle = styled.div`font-size: 13px; font-weight: 600; color: #4B5563; margin-bottom: 8px;`;
const UnmappedList = styled.ul`
  margin: 0; padding-left: 20px; font-size: 13px; color: #6B7280;
  li { margin: 2px 0; }
`;
const EmptyState = styled.div`padding: 48px 16px; text-align: center; color: #6B7280; font-size: 14px;`;

const FRANCHISE_TYPES = ['franchise', 'license', 'master', 'revenue_share'];

const createBranchIcon = (status: string, unitStats: Branch['unit_stats']) => {
  const color = STATUS_COLOR[status] || '#9CA3AF';
  const occupancyRate = unitStats.total > 0 ? unitStats.occupied / unitStats.total : 0;
  // Branch pin shows occupancy percentage in the center
  const pct = Math.round(occupancyRate * 100);
  const svg = `
    <svg width="36" height="46" viewBox="0 0 36 46" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 0C8.1 0 0 8.1 0 18c0 12.2 18 28 18 28s18-15.8 18-28C36 8.1 27.9 0 18 0z" fill="${color}"/>
      <circle cx="18" cy="18" r="12" fill="white"/>
      <text x="18" y="22" text-anchor="middle" font-size="11" font-weight="700" fill="${color}">${pct}%</text>
    </svg>`;
  return L.divIcon({
    html: svg,
    className: 'tenancy-map-branch-pin',
    iconSize: [36, 46],
    iconAnchor: [18, 46],
    popupAnchor: [0, -42]
  });
};

const createRestaurantIcon = (status: string, contractType: string | null, salesIntensity: number) => {
  const color = STATUS_COLOR[status] || '#9CA3AF';
  const scale = 0.85 + Math.min(1, Math.max(0, salesIntensity)) * 0.5;
  const w = Math.round(22 * scale);
  const h = Math.round(32 * scale);
  const isFranchise = contractType && FRANCHISE_TYPES.includes(contractType);
  const mark = isFranchise
    ? `<polygon points="11,6 12,9.2 15.2,9.2 12.6,11.2 13.6,14.4 11,12.4 8.4,14.4 9.4,11.2 6.8,9.2 10,9.2" fill="#FFFFFF"/>`
    : `<circle cx="11" cy="11" r="4" fill="white"/>`;
  const svg = `
    <svg width="${w}" height="${h}" viewBox="0 0 22 32" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 0C4.9 0 0 4.9 0 11c0 7.5 11 21 11 21s11-13.5 11-21C22 4.9 17.1 0 11 0z" fill="${color}"/>
      ${mark}
    </svg>`;
  return L.divIcon({
    html: svg,
    className: 'tenancy-map-restaurant-pin',
    iconSize: [w, h],
    iconAnchor: [Math.round(w / 2), h],
    popupAnchor: [0, -(h - 2)]
  });
};

const FitBounds: React.FC<{ branches: Branch[] }> = ({ branches }) => {
  const map = useMap();
  useEffect(() => {
    const pts = branches.filter(b => b.latitude != null && b.longitude != null);
    if (pts.length === 0) return;
    const bounds = L.latLngBounds(pts.map(p => [p.latitude as number, p.longitude as number]));
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
  }, [branches, map]);
  return null;
};

const ClusterLayer: React.FC<{
  branches: Branch[];
  restaurants: Restaurant[];
  maxSales: number;
}> = ({ branches, restaurants, maxSales }) => {
  const map = useMap();
  const groupRef = useRef<any>(null);

  useEffect(() => {
    if (!map) return;
    if (groupRef.current) { groupRef.current.clearLayers(); map.removeLayer(groupRef.current); }
    const group = (L as any).markerClusterGroup({ maxClusterRadius: 50 });

    // Branch pins (large)
    branches.forEach(b => {
      if (b.latitude == null || b.longitude == null) return;
      const marker = L.marker([b.latitude, b.longitude], { icon: createBranchIcon(b.status, b.unit_stats) });
      const color = STATUS_COLOR[b.status] || '#9CA3AF';
      const html = `
        <div style="min-width:220px">
          <h4 style="margin:0 0 6px;font-size:14px;color:#0A2540">${b.name}${b.is_primary ? ' <span style="font-size:10px;background:#F0EDFF;color:#635BFF;padding:1px 5px;border-radius:3px">PRIMARY</span>' : ''}</h4>
          <div style="font-size:11px;color:#9CA3AF;margin:2px 0">${b.code}</div>
          ${b.address ? `<div style="font-size:12px;color:#6B7280;margin:2px 0">${b.address}</div>` : ''}
          <div style="display:flex;gap:10px;margin-top:8px;font-size:11px">
            <span><b>Total:</b> ${b.unit_stats.total}</span>
            <span style="color:#10B981"><b>Occupied:</b> ${b.unit_stats.occupied}</span>
            <span style="color:#6B7280"><b>Vacant:</b> ${b.unit_stats.vacant}</span>
            ${b.unit_stats.reserved ? `<span style="color:#F59E0B"><b>Reserved:</b> ${b.unit_stats.reserved}</span>` : ''}
          </div>
          <span style="display:inline-block;padding:2px 8px;border-radius:10px;font-size:11px;font-weight:600;margin-top:6px;color:white;background:${color}">${b.status}</span>
        </div>`;
      marker.bindPopup(html);
      group.addLayer(marker);
    });

    // Tenant restaurants (small pins)
    restaurants.forEach(r => {
      if (r.latitude == null || r.longitude == null) return;
      const intensity = maxSales > 0 ? (r.sales_30d || 0) / maxSales : 0;
      const marker = L.marker([r.latitude, r.longitude], { icon: createRestaurantIcon(r.status, r.contract_type || null, intensity) });
      const color = STATUS_COLOR[r.status] || '#9CA3AF';
      const html = `
        <div style="min-width:200px">
          <h4 style="margin:0 0 6px;font-size:13px;color:#0A2540">${r.name}${r.branch_name ? ' · ' + r.branch_name : ''}</h4>
          <div style="display:flex;gap:12px;margin-top:4px;font-size:11px;color:#4B5563">
            <span><b>Type:</b> ${r.contract_type || '—'}</span>
            <span><b>Radius:</b> ${r.radius_km ? r.radius_km + ' km' : '—'}</span>
          </div>
          <div style="font-size:11px;color:#4B5563;margin-top:2px"><b>Sales 30d:</b> ${(r.sales_30d || 0).toLocaleString()}</div>
          <span style="display:inline-block;padding:2px 8px;border-radius:10px;font-size:11px;font-weight:600;margin-top:6px;color:white;background:${color}">${r.status}</span>
        </div>`;
      marker.bindPopup(html);
      group.addLayer(marker);
    });

    groupRef.current = group;
    map.addLayer(group);
    return () => {
      if (groupRef.current) { groupRef.current.clearLayers(); map.removeLayer(groupRef.current); groupRef.current = null; }
    };
  }, [branches, restaurants, map, maxSales]);

  return null;
};

const FoodcourtTenancyMapPage: React.FC = () => {
  const { t } = useTranslation('contract');
  const { user } = useAuth();
  const fcId = user?.foodcourt_id;
  const [data, setData] = useState<TenancyMapData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
  const restaurants = useMemo(() => data?.restaurants || [], [data]);

  if (loading) return <EmptyState>{t('common.loading', 'Loading...')}</EmptyState>;
  if (error) return <EmptyState style={{ color: '#DC2626' }}>{error}</EmptyState>;
  if (!data || data.total_branches === 0) return <EmptyState>{t('map.emptyFoodcourt', 'No branches to display on the map yet.')}</EmptyState>;

  return (
    <Container>
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
        <span style={{ marginLeft: 12, color: '#6B7280' }}>
          {t('map.legend.branchPin', 'Large pin = branch (shows occupancy %)')}  ·  {t('map.legend.restaurantPin', 'Small pin = tenant restaurant')}
        </span>
      </Legend>

      {mappedBranches.length > 0 ? (
        <MapWrap>
          <MapContainer center={[3.139, 101.6869]} zoom={6} scrollWheelZoom>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            {restaurants.filter(r => r.radius_km && r.radius_km > 0 && r.latitude != null && r.longitude != null).map(r => (
              <Circle
                key={`radius-${r.id}`}
                center={[r.latitude as number, r.longitude as number]}
                radius={(r.radius_km as number) * 1000}
                pathOptions={{
                  color: STATUS_COLOR[r.status] || '#9CA3AF',
                  fillColor: STATUS_COLOR[r.status] || '#9CA3AF',
                  fillOpacity: 0.08, weight: 1, dashArray: '4 4'
                }}
              />
            ))}
            <ClusterLayer branches={mappedBranches} restaurants={restaurants} maxSales={data.max_sales_30d || 0} />
            <FitBounds branches={mappedBranches} />
          </MapContainer>
        </MapWrap>
      ) : (
        <EmptyState>{t('map.noCoordsFoodcourt', 'No branches have coordinates yet. Edit a branch to add location data.')}</EmptyState>
      )}

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
    </Container>
  );
};

export default FoodcourtTenancyMapPage;
