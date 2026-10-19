import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { getAuthToken } from '../../utils/auth';

/**
 * 구조도 — 재료·레시피·공급업체·청구가 어느 칸으로 이어지는지(시스템 관리자 전용, 읽기만).
 *
 * Irene 요구(2026-10-19): "우리 시스템관리자 메뉴에 구조도 보게 넣어줘 … 어디에서 항상 보게 … 계속 업데이트 되고."
 *
 * 원본은 저장소 `dev-backend/content/structure-map.html` 한 곳이다. 구조를 바꾸는 작업이 그 파일을 고치고
 * 배포로 같이 나간다 — 화면에서 고치는 칸을 두면 원본과 갈라지므로 두지 않는다.
 * 문서 자체 스타일이 앱 스타일과 섞이지 않게 iframe 에 넣는다. 스크립트는 막고(sandbox 에 allow-scripts 없음),
 * 높이 맞춤·밝은 테마 고정만 부모가 한다(allow-same-origin).
 */

const Frame = styled.iframe`width: 100%; min-height: 600px; border: 1px solid #C7CED6; border-radius: 10px; background: #fff; display: block;`;
const Meta = styled.div`font-size: 12px; color: #4B5563; margin-bottom: 10px;`;
const Empty = styled.div`font-size: 13px; color: #4B5563; padding: 16px 0;`;

const StructureMapView: React.FC = () => {
  const { t } = useTranslation('admin');
  const [html, setHtml] = useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch('/api/admin/deploy-records/structure-map', { headers: { Authorization: `Bearer ${getAuthToken()}` } });
        const j = await r.json();
        if (!r.ok || !j?.data?.html) { setFailed(true); return; }
        setHtml(j.data.html);
        setUpdatedAt(j.data.updated || null);
      } catch { setFailed(true); }
    })();
  }, []);

  const fit = useCallback(() => {
    const doc = frameRef.current?.contentDocument;
    if (!doc || !frameRef.current) return;
    doc.documentElement.setAttribute('data-theme', 'light');
    frameRef.current.style.height = `${doc.documentElement.scrollHeight + 4}px`;
  }, []);

  useEffect(() => {
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, [fit]);

  if (failed) return <Empty>{t('deployRecords.structureFailed')}</Empty>;
  if (html === null) return <Empty>{t('deployRecords.loading')}</Empty>;
  return (
    <>
      {updatedAt && <Meta>{t('deployRecords.structureUpdated', { at: updatedAt })}</Meta>}
      <Frame
        ref={frameRef}
        title={t('deployRecords.tabStructure')}
        sandbox="allow-same-origin"
        srcDoc={html}
        onLoad={() => { fit(); window.setTimeout(fit, 600); }}
      />
    </>
  );
};

export default StructureMapView;
