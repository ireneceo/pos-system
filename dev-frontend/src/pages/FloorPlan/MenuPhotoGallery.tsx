import React, { useMemo, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Modal } from '../../components/UI/Modal';
import SearchableSelect from '../../components/Common/SearchableSelect';
import MenuThumb from './MenuThumb';
import { ProductPhotoMaps, ProductPhotoInfo } from './productImageMap';

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
}

const MenuPhotoGallery: React.FC<Props> = ({ open, onClose, maps, currency }) => {
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
