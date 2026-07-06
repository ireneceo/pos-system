import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { getAuthToken } from '../../utils/auth';
import MenuThumb from './MenuThumb';
import { ProductPhotoInfo } from './productImageMap';

/**
 * AIServeCameraOverlay — AI 카메라 서빙 (Track B / B1). FloorPlan 풀스크린 오버레이.
 * 뷰파인더 → 촬영 → recognize → 결과(모드별) → [서빙](기존 onServe 재사용) → 연속.
 * 원본 사진 무보존(서버 memoryStorage). 설계: docs/AI_FOOD_RECOGNITION_DESIGN.md §B-4.3.
 */

const Full = styled.div`
  position: fixed; inset: 0; z-index: 2000; background: #0A0A0A; color: #fff;
  display: flex; flex-direction: column;
`;
const Video = styled.video` flex: 1; width: 100%; object-fit: cover; background: #000; `;
const Still = styled.img` flex: 1; width: 100%; object-fit: contain; background: #000; `;
const Bar = styled.div` display: flex; align-items: center; justify-content: space-between; padding: 14px 16px; gap: 12px; background: rgba(0,0,0,0.6); `;
const TopBar = styled(Bar)` position: absolute; top: 0; left: 0; right: 0; z-index: 2; `;
const Shutter = styled.button`
  width: 74px; height: 74px; border-radius: 50%; border: 5px solid #fff; background: rgba(255,255,255,0.25);
  cursor: pointer; margin: 0 auto; display: block; &:active { transform: scale(0.94); } &:disabled { opacity: 0.5; }
`;
const LinkBtn = styled.button` background: none; border: none; color: #fff; font-size: 15px; font-weight: 600; cursor: pointer; padding: 8px 4px; text-decoration: underline; font-family: inherit; `;
const CloseX = styled.button` background: rgba(255,255,255,0.15); border: none; color: #fff; width: 40px; height: 40px; border-radius: 10px; font-size: 22px; cursor: pointer; `;
const Sheet = styled.div` flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 12px; background: #111; `;
const BigCard = styled.div`
  background: #1C1C1E; border: 1px solid #333; border-radius: 14px; padding: 16px; display: flex; flex-direction: column; gap: 12px; align-items: center;
`;
const CandCard = styled.button<{ $sel?: boolean }>`
  display: flex; align-items: center; gap: 12px; width: 100%; text-align: left; padding: 12px; border-radius: 12px; font-family: inherit;
  background: ${p => p.$sel ? '#2A2A6A' : '#1C1C1E'}; border: 2px solid ${p => p.$sel ? '#635BFF' : '#333'}; color: #fff; cursor: pointer;
`;
const Name = styled.div` font-size: 20px; font-weight: 800; `;
const Loc = styled.span` font-size: 14px; font-weight: 800; background: #333; color: #fff; border-radius: 6px; padding: 3px 10px; `;
const Opt = styled.span` font-size: 13px; color: #CFCFCF; background: #2A2A2A; border-radius: 6px; padding: 2px 8px; margin-right: 4px; `;
const Conf = styled.div` font-size: 14px; color: #A9A9C0; `;
const Actions = styled.div` display: flex; gap: 10px; width: 100%; margin-top: 4px; `;
const PrimaryBtn = styled.button` flex: 2; background: #10B981; border: none; color: #fff; font-size: 18px; font-weight: 800; padding: 16px; border-radius: 12px; cursor: pointer; font-family: inherit; &:active { transform: scale(0.98); } `;
const GhostBtn = styled.button` flex: 1; background: #2A2A2A; border: 1px solid #444; color: #fff; font-size: 15px; font-weight: 600; padding: 16px; border-radius: 12px; cursor: pointer; font-family: inherit; `;
const Msg = styled.div` text-align: center; color: #CFCFCF; font-size: 16px; padding: 24px 8px; `;
const Toast = styled.div` position: absolute; bottom: 24px; left: 50%; transform: translateX(-50%); background: #10B981; color: #fff; padding: 12px 20px; border-radius: 10px; font-weight: 700; z-index: 5; `;

interface Candidate {
  product_id: number | null; order_id: number; item_index: number; comp_index: number | null;
  name: string; table: string; options: string[]; set_name?: string | null; age_min?: number;
  confidence?: number | null;
}
interface Props {
  open: boolean;
  onClose: () => void;
  restaurantId: number;
  productLookup?: (productId?: number | null, name?: string) => ProductPhotoInfo | null;
  onServe: (orderId: number, itemIndex: number, compIndex: number | null, makeServed: boolean) => void;
}

type Phase = 'viewfinder' | 'analyzing' | 'result';

const AIServeCameraOverlay: React.FC<Props> = ({ open, onClose, restaurantId, productLookup, onServe }) => {
  const { t } = useTranslation(['floorplan', 'common']);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [phase, setPhase] = useState<Phase>('viewfinder');
  const [still, setStill] = useState<string | null>(null);
  const [camError, setCamError] = useState(false);
  const [result, setResult] = useState<{ mode: string; candidates: Candidate[]; log_id?: number; top_confidence?: number | null; seeding?: boolean } | null>(null);
  const [selIdx, setSelIdx] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const stopStream = useCallback(() => {
    if (streamRef.current) { streamRef.current.getTracks().forEach(tk => tk.stop()); streamRef.current = null; }
  }, []);

  const startCamera = useCallback(async () => {
    setCamError(false);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      streamRef.current = stream;
      if (videoRef.current) { videoRef.current.srcObject = stream; await videoRef.current.play().catch(() => {}); }
    } catch { setCamError(true); }
  }, []);

  useEffect(() => {
    if (!open) return;
    setPhase('viewfinder'); setStill(null); setResult(null); setSelIdx(0);
    startCamera();
    return () => { stopStream(); };
  }, [open, startCamera, stopStream]);

  const authHeader = () => { const tk = getAuthToken(); return tk ? { Authorization: `Bearer ${tk}` } : {}; };

  const sendRecognize = useCallback(async (blob: Blob) => {
    setPhase('analyzing');
    try {
      const fd = new FormData(); fd.append('photo', blob, 'shot.jpg');
      const res = await fetch(`/api/ai-serving/${restaurantId}/recognize`, { method: 'POST', headers: { ...authHeader() }, body: fd });
      const j = await res.json().catch(() => ({}));
      if (!res.ok || !j.success) { setResult({ mode: 'reshoot', candidates: [] }); setPhase('result'); return; }
      setResult(j.data); setSelIdx(0); setPhase('result');
    } catch { setResult({ mode: 'reshoot', candidates: [] }); setPhase('result'); }
  }, [restaurantId]);

  const capture = useCallback(() => {
    const v = videoRef.current; if (!v || !v.videoWidth) return;
    const max = 512; const scale = Math.min(1, max / Math.max(v.videoWidth, v.videoHeight));
    const w = Math.round(v.videoWidth * scale), h = Math.round(v.videoHeight * scale);
    const canvas = document.createElement('canvas'); canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    ctx.drawImage(v, 0, 0, w, h);
    setStill(canvas.toDataURL('image/jpeg', 0.8));
    canvas.toBlob(b => { if (b) sendRecognize(b); }, 'image/jpeg', 0.8);
  }, [sendRecognize]);

  const onFilePick = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    setStill(URL.createObjectURL(f)); sendRecognize(f);
  }, [sendRecognize]);

  const loadManual = useCallback(async () => {
    try {
      const res = await fetch(`/api/ai-serving/${restaurantId}/ready-items`, { headers: { ...authHeader() } });
      const j = await res.json().catch(() => ({}));
      setResult({ mode: 'fallback', candidates: (j.data || []) }); setStill(null); setPhase('result');
    } catch { setResult({ mode: 'fallback', candidates: [] }); setPhase('result'); }
  }, [restaurantId]);

  const recordOutcome = (decision: string, c?: Candidate) => {
    if (!result?.log_id) return;
    fetch(`/api/ai-serving/${restaurantId}/logs/${result.log_id}/outcome`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', ...authHeader() },
      body: JSON.stringify({ decision, chosen_order_id: c?.order_id, chosen_item_index: c?.item_index, chosen_product_id: c?.product_id }),
    }).catch(() => {});
  };

  const doServe = (c: Candidate, decision: string) => {
    onServe(c.order_id, c.item_index, c.comp_index, true);
    recordOutcome(decision, c);
    setToast(`${c.table ? c.table + ' · ' : ''}${c.name}`);
    setTimeout(() => setToast(null), 1600);
    setPhase('viewfinder'); setStill(null); setResult(null);
  };

  const retake = () => { setPhase('viewfinder'); setStill(null); setResult(null); };

  if (!open) return null;

  const renderResult = () => {
    if (!result) return null;
    const cands = result.candidates || [];
    const mode = result.mode;
    if (mode === 'no_candidates') return <Msg>{t('floorplan:aiServe.noCandidates', { defaultValue: 'No dishes are ready right now.' })}</Msg>;
    if ((mode === 'reshoot' || cands.length === 0) && mode !== 'fallback') {
      return <><Msg>{t('floorplan:aiServe.reshootHint', { defaultValue: 'Not sure — please retake or pick manually.' })}</Msg>
        <Actions><GhostBtn onClick={retake}>{t('floorplan:aiServe.retake', { defaultValue: 'Retake' })}</GhostBtn>
          <GhostBtn onClick={loadManual}>{t('floorplan:aiServe.pickManually', { defaultValue: 'Pick manually' })}</GhostBtn></Actions></>;
    }
    if (mode === 'recommend') {
      const c = cands[0]; const ph = productLookup?.(c.product_id, c.name);
      return <BigCard>
        <MenuThumb src={ph?.image || ph?.thumb} name={c.name} size={160} radius={12} />
        <Name>{c.name}</Name>
        <div>{c.table && <Loc>{c.table}</Loc>} {c.options?.map((o, i) => <Opt key={i}>{o}</Opt>)}</div>
        {c.age_min != null && <Conf>{t('floorplan:aiServe.readyMin', { defaultValue: 'ready {{n}}m', n: c.age_min })}</Conf>}
        {c.confidence != null && <Conf>{Math.round((c.confidence || 0) * 100)}% · {t('floorplan:aiServe.pleaseConfirm', { defaultValue: 'please confirm' })}</Conf>}
        <Actions>
          <PrimaryBtn onClick={() => doServe(c, 'recommend_confirmed')}>{t('common:itemServe.serveHint', { defaultValue: 'Serve' })}</PrimaryBtn>
          <GhostBtn onClick={retake}>{t('floorplan:aiServe.retake', { defaultValue: 'Retake' })}</GhostBtn>
        </Actions>
      </BigCard>;
    }
    // pick / fallback → 후보 리스트
    return <>
      {result.seeding && <Msg>{t('floorplan:aiServe.seeding', { defaultValue: 'Preparing menu photos…' })}</Msg>}
      {cands.map((c, i) => { const ph = productLookup?.(c.product_id, c.name); return (
        <CandCard key={`${c.order_id}-${c.item_index}-${c.comp_index}-${i}`} $sel={selIdx === i} onClick={() => setSelIdx(i)}>
          <MenuThumb src={ph?.thumb} name={c.name} size={52} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <Name style={{ fontSize: 17 }}>{c.name}</Name>
            <div style={{ marginTop: 4 }}>{c.table && <Loc>{c.table}</Loc>} {c.options?.map((o, oi) => <Opt key={oi}>{o}</Opt>)}</div>
          </div>
        </CandCard>
      ); })}
      {cands.length > 0 && <Actions>
        <PrimaryBtn onClick={() => doServe(cands[selIdx], mode === 'fallback' ? 'manual' : 'picked_other')}>{t('common:itemServe.serveHint', { defaultValue: 'Serve' })}</PrimaryBtn>
        <GhostBtn onClick={retake}>{t('floorplan:aiServe.retake', { defaultValue: 'Retake' })}</GhostBtn>
      </Actions>}
    </>;
  };

  return (
    <Full>
      {phase === 'viewfinder' && (
        <>
          <TopBar>
            <LinkBtn onClick={loadManual}>{t('floorplan:aiServe.pickManually', { defaultValue: 'Pick manually' })}</LinkBtn>
            <CloseX onClick={() => { stopStream(); onClose(); }} aria-label="close">×</CloseX>
          </TopBar>
          {camError ? (
            <Sheet>
              <Msg>{t('floorplan:aiServe.cameraDenied', { defaultValue: 'Camera unavailable. Take a photo or pick manually.' })}</Msg>
              <input ref={fileRef} type="file" accept="image/*" capture="environment" style={{ display: 'none' }} onChange={onFilePick} />
              <PrimaryBtn onClick={() => fileRef.current?.click()}>{t('floorplan:aiServe.takePhoto', { defaultValue: 'Take a photo' })}</PrimaryBtn>
              <GhostBtn onClick={loadManual}>{t('floorplan:aiServe.pickManually', { defaultValue: 'Pick manually' })}</GhostBtn>
            </Sheet>
          ) : (
            <>
              <Video ref={videoRef} playsInline muted />
              <Bar><div style={{ width: 40 }} /><Shutter onClick={capture} aria-label="shoot" /><div style={{ width: 40 }} /></Bar>
            </>
          )}
        </>
      )}
      {phase === 'analyzing' && (
        <>
          {still && <Still src={still} alt="" />}
          <Bar><Msg style={{ flex: 1, padding: 8 }}>{t('floorplan:aiServe.analyzing', { defaultValue: 'Analyzing…' })}</Msg></Bar>
        </>
      )}
      {phase === 'result' && (
        <>
          <TopBar>
            <div />
            <CloseX onClick={() => { stopStream(); onClose(); }} aria-label="close">×</CloseX>
          </TopBar>
          <Sheet>{renderResult()}</Sheet>
        </>
      )}
      {toast && <Toast>{t('floorplan:aiServe.justServed', { defaultValue: 'Served' })}: {toast}</Toast>}
    </Full>
  );
};

export default AIServeCameraOverlay;
