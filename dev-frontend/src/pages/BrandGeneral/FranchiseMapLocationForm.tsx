// 프랜차이즈맵 오른쪽 창 — 지도 위치가 없는 매장에 바로 주소를 넣는 칸 (2026-11-15 Irene
// «주소가 없으면 클릭했을 때 레스토랑 정보는 기본 나오게 하고 우측에서 주소 넣으라고 못해? … 아무 반응이 없어서 나쁜 UI»).
// 저장 = 매장 수정 경로(PUT /api/restaurants/:id) 그대로 — 권한(브랜드 총괄·매니저는 자기 매장만)은 서버가 판정한다.
// 서버는 주소가 바뀌면 지도 위치를 뒤에서 찾는다(utils/geocoding) → 저장 뒤 지도를 몇 번 다시 불러 핀이 생겼는지 본다.
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { AddressFields } from '../../components/Form';
import { Button } from '../../components/Button';
import { getAuthToken } from '../../utils/auth';
import type { Address } from '../../utils/formatAddress';

export interface LocationFormRestaurant {
  id: number;
  address?: string | null;
  address_line_2?: string | null;
  city?: string | null;
  state?: string | null;
  postal_code?: string | null;
  country?: string | null;
}

interface Props {
  restaurant: LocationFormRestaurant;
  /** 지도 데이터를 다시 불러오고, 이 매장에 좌표가 생겼으면 true */
  reloadAndCheck: () => Promise<boolean>;
}

type Phase = 'idle' | 'saving' | 'locating' | 'found' | 'notFound' | 'error';

const Box = styled.div`
  border: 1px solid #FCD34D;
  background: #FFFBEB;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .lead { font-size: 13px; font-weight: 600; color: #92400E; }
  .help { font-size: 12px; color: #78350F; line-height: 1.5; }
  .msg { font-size: 12px; line-height: 1.5; }
  .msg.err { color: #B91C1C; }
  .msg.ok { color: #047857; }
  .msg.wait { color: #4B5563; }
`;

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

const toAddress = (r: LocationFormRestaurant): Address => ({
  address: r.address || '',
  address_line_2: r.address_line_2 || '',
  city: r.city || '',
  state: r.state || '',
  postal_code: r.postal_code || '',
  country: (r.country || 'MY').toUpperCase()
} as Address);

const FranchiseMapLocationForm: React.FC<Props> = ({ restaurant, reloadAndCheck }) => {
  const { t } = useTranslation('contract');
  const [addr, setAddr] = useState<Address>(() => toAddress(restaurant));
  const [phase, setPhase] = useState<Phase>('idle');
  const [errMsg, setErrMsg] = useState('');

  // 다른 매장을 고르면 칸을 그 매장 값으로
  useEffect(() => {
    setAddr(toAddress(restaurant));
    setPhase('idle');
    setErrMsg('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurant.id]);

  const busy = phase === 'saving' || phase === 'locating';
  const canSave = !busy && !!(addr.address || '').trim();

  const save = async () => {
    if (!canSave) return;
    setPhase('saving');
    setErrMsg('');
    try {
      const res = await fetch(`/api/restaurants/${restaurant.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getAuthToken()}` },
        body: JSON.stringify({
          address: (addr.address || '').trim(),
          address_line_2: (addr.address_line_2 || '').trim() || null,
          city: (addr.city || '').trim(),
          state: (addr.state || '').trim(),
          postal_code: (addr.postal_code || '').trim(),
          country: (addr.country || '').toUpperCase() || null
        })
      });
      let body: any = null;
      try { body = await res.json(); } catch { /* 본문 없음 */ }
      if (!res.ok || body?.success === false) {
        setPhase('error');
        setErrMsg(res.status === 403
          ? t('map.location.noPermission', "You don't have permission to edit this restaurant. Ask the restaurant admin to add the address in Settings.")
          : (body?.message || body?.error?.message || t('map.location.saveFailed', 'Could not save the address. Please try again.')));
        return;
      }
      // 위치 찾기는 서버 뒤에서 돈다(1~3초 · 다시 찾기 포함 최대 몇 초) → 몇 번 다시 불러 확인
      setPhase('locating');
      for (const wait of [2000, 3000, 5000]) {
        await sleep(wait);
        if (await reloadAndCheck()) { setPhase('found'); return; }
      }
      setPhase('notFound');
    } catch {
      setPhase('error');
      setErrMsg(t('map.location.saveFailed', 'Could not save the address. Please try again.'));
    }
  };

  return (
    <Box>
      <div className="lead">{t('map.location.title', 'This restaurant is not on the map yet')}</div>
      <div className="help">{t('map.location.help', 'Add the street address and save. The map pin is placed automatically from the address.')}</div>
      <AddressFields value={addr} onChange={setAddr} compact disabled={busy} required={['address']} />
      <div>
        <Button variant="primary" size="small" onClick={save} disabled={!canSave}>
          {phase === 'saving' ? t('map.location.saving', 'Saving…') : t('map.location.save', 'Save address')}
        </Button>
      </div>
      {phase === 'locating' && <div className="msg wait">{t('map.location.locating', 'Saved. Finding the location on the map…')}</div>}
      {phase === 'found' && <div className="msg ok">{t('map.location.found', 'Saved and placed on the map.')}</div>}
      {phase === 'notFound' && <div className="msg err">{t('map.location.notFound', 'Saved, but this address could not be found on the map. Check the street name, postcode and city, then save again.')}</div>}
      {phase === 'error' && <div className="msg err">{errMsg}</div>}
    </Box>
  );
};

// 핀이 생기면 이 칸은 사라진다(이제 위치가 있으니) → 부모가 이 한 줄을 대신 보여 준다
export const PlacedNote = styled.div`
  border: 1px solid #A7F3D0;
  background: #ECFDF5;
  color: #047857;
  border-radius: 8px;
  padding: 10px 12px;
  margin-bottom: 16px;
  font-size: 12px;
`;

export default FranchiseMapLocationForm;
