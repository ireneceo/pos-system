import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Modal, ModalButton } from '../../components/UI/Modal';
import { toDisplayStatus, ITEM_SOLID } from './orderItemStatus';
import { ProductPhotoInfo } from './productImageMap';

/**
 * ItemPhotoSheet — 서빙 품목 사진 상세 시트 (Track A). 표준 Modal(body portal).
 * 큰 사진 + 테이블/단계/세트/옵션/수량/시각 + [Serve]. Serve = 기존 onServe 경로 재사용(새 전이 없음).
 * 설계: docs/AI_FOOD_RECOGNITION_DESIGN.md §A-4.4.
 */

export interface SheetRow {
  orderId: number; itemIndex: number; compIndex: number | null;
  name: string; qty: number; opt: string[]; setName: string | null;
  status: string; loc: string; orderTime: string | null; servedAt: string | null;
}

const Photo = styled.div`
  width: 100%; max-height: 40vh; min-height: 160px; border-radius: 10px; overflow: hidden;
  background: var(--pos-surface-2, #EDF1F5); border: 1px solid var(--pos-border, #C7CED6);
  display: flex; align-items: center; justify-content: center; margin-bottom: 16px;
  img { width: 100%; max-height: 40vh; object-fit: cover; display: block; }
`;
const PhotoInitial = styled.span`
  font-size: 64px; font-weight: 700; color: var(--pos-text-muted, #9CA3AF); text-transform: uppercase;
`;
const Meta = styled.div` display: flex; flex-direction: column; gap: 10px; `;
const Row = styled.div` display: flex; align-items: center; gap: 8px; flex-wrap: wrap; font-size: 15px; color: var(--pos-text, #0A2540); `;
const Label = styled.span` font-size: 12px; font-weight: 700; color: var(--pos-text-muted, #6B7C93); min-width: 64px; text-transform: uppercase; letter-spacing: .3px; `;
const Loc = styled.span` font-size: 15px; font-weight: 800; color: var(--pos-surface, #fff); background: var(--pos-text, #0A2540); border-radius: 6px; padding: 3px 12px; `;
const StagePill = styled.span<{ $bg: string; $fg: string }>`
  display: inline-block; padding: 4px 12px; border-radius: 6px; font-size: 13px; font-weight: 800; letter-spacing: .3px;
  background: ${p => p.$bg}; color: ${p => p.$fg};
`;
const Opt = styled.span` font-size: 14px; color: var(--pos-text-muted, #4B5563); background: var(--pos-surface-2, #EDF1F5); border-radius: 6px; padding: 3px 9px; `;
const Qty = styled.span` font-size: 18px; font-weight: 800; color: var(--pos-brand-text, #635BFF); `;

interface Props {
  open: boolean;
  onClose: () => void;
  row: SheetRow | null;
  photo: ProductPhotoInfo | null;
  onServe: (orderId: number, itemIndex: number, compIndex: number | null, makeServed: boolean) => void;
  timezone?: string;
}

const ItemPhotoSheet: React.FC<Props> = ({ open, onClose, row, photo, onServe, timezone }) => {
  const { t } = useTranslation(['floorplan', 'common']);
  if (!open || !row) return null;

  const ds = toDisplayStatus(row.status);
  const isServed = ds === 'served';
  const solid = ITEM_SOLID[ds] || ITEM_SOLID['queued'];
  const stageLabel = t(`floorplan:tableDetailPanel.itemStatus.${ds}`);
  const fmtTime = (iso: string | null): string => {
    if (!iso) return '';
    try { return new Date(iso).toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: timezone || undefined }); }
    catch { return ''; }
  };

  const handleServe = () => { onServe(row.orderId, row.itemIndex, row.compIndex, !isServed); onClose(); };

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      title={row.name}
      maxWidth="520px"
      footer={
        <>
          <ModalButton variant="secondary" onClick={onClose}>{t('floorplan:itemSheet.close', { defaultValue: 'Close' })}</ModalButton>
          <ModalButton variant="primary" onClick={handleServe}>
            {isServed
              ? t('floorplan:tableDetailPanel.itemStatus.unmarkServed', { defaultValue: 'Unmark served' })
              : t('common:itemServe.serveHint', { defaultValue: 'Serve' })}
          </ModalButton>
        </>
      }
    >
      <Photo>
        {photo?.image
          ? <img src={photo.image} alt="" />
          : <PhotoInitial>{(row.name || '').trim().charAt(0) || '?'}</PhotoInitial>}
      </Photo>
      <Meta>
        <Row><Label>{t('floorplan:itemSheet.table', { defaultValue: 'Location' })}</Label><Loc>{row.loc}</Loc>
          <StagePill $bg={solid.bg} $fg={solid.text || '#fff'}>{stageLabel}</StagePill></Row>
        {row.setName && (
          <Row><Label>{t('floorplan:itemList.setBadge', { defaultValue: 'SET' })}</Label><span>{row.setName}</span></Row>
        )}
        {row.opt.length > 0 && (
          <Row><Label>{t('floorplan:itemSheet.options', { defaultValue: 'Options' })}</Label>
            {row.opt.map((o, i) => <Opt key={i}>{o}</Opt>)}</Row>
        )}
        <Row>
          <Label>{t('floorplan:itemSheet.qty', { defaultValue: 'Qty' })}</Label><Qty>{row.qty}</Qty>
          {row.orderTime && <span style={{ marginLeft: 8, color: 'var(--pos-text-muted, #6B7C93)', fontSize: 13 }}>· {fmtTime(row.orderTime)}</span>}
          {isServed && row.servedAt && <span style={{ color: 'var(--pos-positive, #10B981)', fontSize: 13, fontWeight: 700 }}>· {t('floorplan:itemList.served', { defaultValue: 'served' })} {fmtTime(row.servedAt)}</span>}
        </Row>
      </Meta>
    </Modal>
  );
};

export default ItemPhotoSheet;
