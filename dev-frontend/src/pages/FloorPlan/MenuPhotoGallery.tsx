import React, { useMemo, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Modal } from '../../components/UI/Modal';
import SearchableSelect from '../../components/Common/SearchableSelect';
import MenuThumb from './MenuThumb';
import { ProductPhotoMaps, ProductPhotoInfo } from './productImageMap';
import { getAuthToken } from '../../utils/auth';

/**
 * MenuPhotoGallery — 메뉴 사진 갤러리 (Track A). 표준 Modal size large.
 * 검색 + 카테고리 필터 + 카드 그리드 → 카드 탭 = 같은 모달 내 상세(← Back).
 * 표시 전용(주문/서빙 동작 없음). 설계: docs/AI_FOOD_RECOGNITION_DESIGN.md §A-4.6.
 */

const Toolbar = styled.div`
  display: flex; gap: 8px; flex-wrap: wrap; align-items: center; margin-bottom: 14px;
  .search { flex: 2 1 180px; min-width: 150px; }
  .search input {
    height: 40px; width: 100%; box-sizing: border-box; border: 1px solid var(--pos-border, #C7CED6);
    border-radius: 8px; padding: 0 12px; font-size: 14px; font-family: inherit;
    background: var(--pos-surface, #fff); color: var(--pos-text, #0A2540);
  }
  .sel { flex: 1 1 150px; min-width: 140px; max-width: 240px; }
`;
const Grid = styled.div`
  display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 12px;
`;
const CardBtn = styled.button`
  display: flex; flex-direction: column; text-align: left; padding: 0; border: 1px solid var(--pos-border, #C7CED6);
  border-radius: 10px; overflow: hidden; background: var(--pos-surface, #fff); cursor: pointer; appearance: none; font-family: inherit;
  transition: border-color .15s, box-shadow .15s;
  &:hover { border-color: var(--pos-brand, #635BFF); }
  &:focus-visible { outline: none; box-shadow: 0 0 0 3px rgba(99,91,255,0.3); }
`;
const CardImg = styled.div`
  position: relative; width: 100%; aspect-ratio: 1 / 1; background: var(--pos-surface-2, #EDF1F5);
  display: flex; align-items: center; justify-content: center;
  img { width: 100%; height: 100%; object-fit: cover; display: block; }
`;
const CardInitial = styled.span` font-size: 40px; font-weight: 700; color: var(--pos-text-muted, #9CA3AF); text-transform: uppercase; `;
const SoldBadge = styled.span`
  position: absolute; top: 6px; left: 6px; background: #6B7280; color: #fff; font-size: 10px; font-weight: 800;
  letter-spacing: .4px; padding: 2px 7px; border-radius: 5px;
`;
const CardMeta = styled.div` padding: 8px 10px; display: flex; flex-direction: column; gap: 2px;
  .n { font-size: 14px; font-weight: 700; color: var(--pos-text, #0A2540); line-height: 1.25; }
  .p { font-size: 13px; color: var(--pos-text-muted, #6B7C93); }
  .np { font-size: 12px; color: var(--pos-text-muted, #9CA3AF); }
`;
const EmptyBox = styled.div` padding: 40px 0; text-align: center; color: var(--pos-text-muted, #6B7C93); font-size: 15px; `;

// 상세 뷰
const Detail = styled.div` display: flex; flex-direction: column; gap: 12px; `;
const BackBtn = styled.button`
  align-self: flex-start; border: 1px solid var(--pos-border, #C7CED6); background: var(--pos-surface, #fff);
  color: var(--pos-text, #0A2540); border-radius: 8px; padding: 6px 14px; font-size: 13px; font-weight: 600;
  cursor: pointer; font-family: inherit;
  &:hover { border-color: var(--pos-brand, #635BFF); }
`;
const BigPhoto = styled.div`
  width: 100%; max-height: 42vh; min-height: 180px; border-radius: 10px; overflow: hidden;
  background: var(--pos-surface-2, #EDF1F5); border: 1px solid var(--pos-border, #C7CED6);
  display: flex; align-items: center; justify-content: center;
  img { width: 100%; max-height: 42vh; object-fit: cover; display: block; }
  span { font-size: 72px; font-weight: 700; color: var(--pos-text-muted, #9CA3AF); text-transform: uppercase; }
`;
const DName = styled.div` font-size: 20px; font-weight: 800; color: var(--pos-text, #0A2540); `;
const DRow = styled.div` display: flex; gap: 10px; align-items: baseline; flex-wrap: wrap; font-size: 14px; color: var(--pos-text-muted, #4B5563); `;
const DPrice = styled.span` font-size: 18px; font-weight: 800; color: var(--pos-brand-text, #635BFF); `;
const DDesc = styled.p` margin: 0; font-size: 14px; color: var(--pos-text, #0A2540); line-height: 1.5; `;
const OptGroup = styled.div` font-size: 13px; color: var(--pos-text-muted, #4B5563);
  .g { font-weight: 700; color: var(--pos-text, #0A2540); }
`;

interface Props {
  open: boolean;
  onClose: () => void;
  maps: ProductPhotoMaps | null;
  currency?: string;
  // Track B: RA 레퍼런스 사진 관리 스트립(선택). aiServe 모듈 + RA 권한일 때만.
  restaurantId?: number | null;
  canManageRefs?: boolean;
}

interface RefPhoto { id: number; product_id: number; thumbnail_url: string | null; image_url: string; source: string; }

const StripWrap = styled.div` border-top: 1px solid var(--pos-border, #C7CED6); padding-top: 12px; margin-top: 4px; `;
const StripTitle = styled.div` font-size: 13px; font-weight: 700; color: var(--pos-text-muted, #6B7C93); margin-bottom: 8px; `;
const StripRow = styled.div` display: flex; gap: 8px; flex-wrap: wrap; align-items: center; `;
const RefCell = styled.div` position: relative; ` ;
const DelBtn = styled.button` position: absolute; top: -6px; right: -6px; width: 20px; height: 20px; border-radius: 50%; border: none; background: #EF4444; color: #fff; font-size: 13px; line-height: 1; cursor: pointer; `;
const AddBtn = styled.button` width: 60px; height: 60px; border: 1px dashed var(--pos-border, #C7CED6); border-radius: 8px; background: var(--pos-surface-2, #EDF1F5); color: var(--pos-text-muted, #6B7C93); font-size: 24px; cursor: pointer; font-family: inherit; `;

const ReferenceStrip: React.FC<{ restaurantId: number; productId: number }> = ({ restaurantId, productId }) => {
  const { t } = useTranslation(['floorplan']);
  const [refs, setRefs] = useState<RefPhoto[]>([]);
  const [busy, setBusy] = useState(false);
  const fileRef = React.useRef<HTMLInputElement>(null);
  const auth = () => { const tk = getAuthToken(); return tk ? { Authorization: `Bearer ${tk}` } : {}; };
  const load = useCallback(async () => {
    try {
      const res = await fetch(`/api/ai-serving/${restaurantId}/reference-photos?product_id=${productId}`, { headers: { ...auth() } });
      const j = await res.json().catch(() => ({})); setRefs(Array.isArray(j.data) ? j.data : []);
    } catch { setRefs([]); }
  }, [restaurantId, productId]);
  useEffect(() => { load(); }, [load]);
  const onPick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return; setBusy(true);
    try { const fd = new FormData(); fd.append('photo', f); fd.append('product_id', String(productId));
      await fetch(`/api/ai-serving/${restaurantId}/reference-photos`, { method: 'POST', headers: { ...auth() }, body: fd });
      await load();
    } catch { /* ignore */ } finally { setBusy(false); if (fileRef.current) fileRef.current.value = ''; }
  };
  const del = async (id: number) => {
    setBusy(true);
    try { await fetch(`/api/ai-serving/${restaurantId}/reference-photos/${id}`, { method: 'DELETE', headers: { ...auth() } }); await load(); }
    catch { /* ignore */ } finally { setBusy(false); }
  };
  return (
    <StripWrap>
      <StripTitle>{t('floorplan:aiServe.referencePhotos', { defaultValue: 'Recognition photos' })} ({refs.length})</StripTitle>
      <StripRow>
        {refs.map(r => (
          <RefCell key={r.id}>
            <MenuThumb src={r.thumbnail_url || r.image_url} name="" size={60} />
            {r.source === 'staff_upload' && <DelBtn type="button" onClick={() => del(r.id)} disabled={busy} title="delete">×</DelBtn>}
          </RefCell>
        ))}
        <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={onPick} />
        <AddBtn type="button" onClick={() => fileRef.current?.click()} disabled={busy} title={t('floorplan:aiServe.addPhoto', { defaultValue: 'Add photo' })}>+</AddBtn>
      </StripRow>
    </StripWrap>
  );
};

const MenuPhotoGallery: React.FC<Props> = ({ open, onClose, maps, currency, restaurantId, canManageRefs }) => {
  const { t } = useTranslation(['floorplan']);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('all');
  const [selected, setSelected] = useState<ProductPhotoInfo | null>(null);

  // 열릴 때마다 상태 초기화(이전 선택/검색 잔존 방지).
  useEffect(() => { if (open) { setSelected(null); setSearch(''); setCatFilter('all'); } }, [open]);

  const list = maps?.list || [];
  const categories = useMemo(() => {
    const s = new Set<string>();
    list.forEach(p => { if (p.category) s.add(p.category); });
    return [...s].sort();
  }, [list]);

  const view = useMemo(() => {
    const q = search.trim().toLowerCase();
    return list.filter(p => {
      if (q && !p.name.toLowerCase().includes(q)) return false;
      if (catFilter !== 'all' && p.category !== catFilter) return false;
      return true;
    });
  }, [list, search, catFilter]);

  const money = (n: number) => `${currency || ''}${Number(n || 0).toFixed(2)}`;

  if (!open) return null;

  return (
    <Modal isOpen={open} onClose={onClose} title={t('floorplan:menuPhotos.title', { defaultValue: 'Menu Photos' })} size="large" maxWidth="960px">
      {selected ? (
        <Detail>
          <BackBtn type="button" onClick={() => setSelected(null)}>← {t('floorplan:menuPhotos.back', { defaultValue: 'Back' })}</BackBtn>
          <BigPhoto>
            {selected.image ? <img src={selected.image} alt="" /> : <span>{(selected.name || '').trim().charAt(0) || '?'}</span>}
          </BigPhoto>
          <DName>{selected.name}</DName>
          <DRow>
            <DPrice>{money(selected.price)}</DPrice>
            {selected.category && <span>· {selected.category}</span>}
            {selected.soldOut && <span style={{ color: '#6B7280', fontWeight: 700 }}>· {t('floorplan:menuPhotos.soldOut', { defaultValue: 'SOLD OUT' })}</span>}
          </DRow>
          {selected.description && <DDesc>{selected.description}</DDesc>}
          {Array.isArray(selected.optionGroups) && selected.optionGroups.length > 0 && selected.optionGroups.map((g: any, gi: number) => (
            <OptGroup key={gi}>
              <span className="g">{g?.name || g?.groupName || ''}</span>
              {': '}
              {(Array.isArray(g?.options) ? g.options : []).map((o: any) => (typeof o === 'string' ? o : (o?.name || ''))).filter(Boolean).join(' · ')}
            </OptGroup>
          ))}
          {canManageRefs && restaurantId && <ReferenceStrip restaurantId={restaurantId} productId={selected.id} />}
        </Detail>
      ) : (
        <>
          <Toolbar>
            <div className="search">
              <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder={t('floorplan:menuPhotos.search', { defaultValue: 'Search menu' })} />
            </div>
            {categories.length > 0 && (
              <div className="sel">
                <SearchableSelect
                  allowClear={false}
                  value={catFilter === 'all' ? null : catFilter}
                  onChange={v => setCatFilter(v ? String(v) : 'all')}
                  placeholder={t('floorplan:menuPhotos.allCategories', { defaultValue: 'All categories' })}
                  options={[{ value: 'all', label: t('floorplan:menuPhotos.allCategories', { defaultValue: 'All categories' }) }, ...categories.map(c => ({ value: c, label: c }))]}
                />
              </div>
            )}
          </Toolbar>
          {view.length === 0 ? (
            <EmptyBox>{t('floorplan:menuPhotos.empty', { defaultValue: 'No menu items' })}</EmptyBox>
          ) : (
            <Grid>
              {view.map(p => (
                <CardBtn key={p.id} type="button" onClick={() => setSelected(p)}>
                  <CardImg>
                    {p.thumb ? <img src={p.thumb} alt="" loading="lazy" /> : <CardInitial>{(p.name || '').trim().charAt(0) || '?'}</CardInitial>}
                    {p.soldOut && <SoldBadge>{t('floorplan:menuPhotos.soldOut', { defaultValue: 'SOLD OUT' })}</SoldBadge>}
                  </CardImg>
                  <CardMeta>
                    <span className="n">{p.name}</span>
                    {p.thumb ? <span className="p">{money(p.price)}</span> : <span className="np">{t('floorplan:menuPhotos.noPhoto', { defaultValue: 'No photo' })}</span>}
                  </CardMeta>
                </CardBtn>
              ))}
            </Grid>
          )}
        </>
      )}
    </Modal>
  );
};

export default MenuPhotoGallery;
