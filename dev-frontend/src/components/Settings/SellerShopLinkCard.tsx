/**
 * 주문용 상품 링크 — 공급업체·브랜드 공용 카드
 * 설계: docs/BUYER_FREE_TIER_DESIGN.md §5-6 (Irene 2026-09-12)
 *
 * **자리**: 판매자의 «상품» 화면 맨 위. 자기 상품을 보는 곳에 그 상품을 남에게 보여 주는
 * 링크가 함께 있어야 «보면 바로 안다». 회사 정보(상호·주소·계좌)에 두면 아무도 못 찾는다
 * (2026-09-12 Irene 지적으로 옮김).
 *
 * 모양은 매장의 «모바일 주문 링크» 카드와 같은 것을 쓴다 — 주소 칸 + 복사 + QR.
 * 판매자 종류마다 다른 화면을 만들지 않는다.
 */
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react';
import { getAuthToken } from '../../utils/auth';
import { StandardSelect } from '../UI/SelectComponents';
import { Button } from '../UI/Button';

type SellerType = 'supplier' | 'brand';

interface Props {
  sellerType: SellerType;
  /** 브랜드는 링크가 브랜드 1곳에 붙는다. 여러 브랜드를 가진 오너는 대표 브랜드 기준. */
  disabled?: boolean;
}

const Card = styled.div`
  background: white;
  border: 1px solid #C7CED6;
  border-radius: 10px;
  padding: 16px 18px;
  margin-bottom: 16px;
`;

const Row = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const Left = styled.div`
  flex: 1;
  min-width: 280px;
`;

const CardTitle = styled.h3`
  margin: 0 0 6px;
  font-size: 15px;
  font-weight: 600;
  color: #111827;
`;

const Hint = styled.p`
  margin: 0 0 12px;
  font-size: 13px;
  color: #6B7280;
  line-height: 1.5;
`;

const FieldLabel = styled.label`
  display: block;
  font-size: 12px;
  font-weight: 500;
  color: #4B5563;
  margin: 10px 0 4px;
`;

const Input = styled.input`
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  padding: 8px 12px;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  font-size: 14px;
`;

const UrlInput = styled(Input)`
  font-family: monospace;
  font-size: 13px;
  background: #F8F9FC;
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 10px;
  flex-wrap: wrap;
`;

const QRBox = styled.div`
  padding: 10px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  background: white;
`;

const Empty = styled.div`
  font-size: 13px;
  color: #6B7280;
`;

const Saved = styled.span`
  font-size: 12px;
  color: #059669;
  margin-left: 8px;
`;

const ErrorText = styled.span`
  font-size: 12px;
  color: #EF4444;
  margin-left: 8px;
`;

const SellerShopLinkCard: React.FC<Props> = ({ sellerType, disabled }) => {
  const { t } = useTranslation(['common']);
  const [slug, setSlug] = useState('');
  const [savedSlug, setSavedSlug] = useState('');
  const [salesAccess, setSalesAccess] = useState<'contract_required' | 'open'>('contract_required');
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<'idle' | 'saved' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const readUrl = sellerType === 'supplier' ? '/api/supplier/company' : '/api/brands/company-info';
  const writeUrl = sellerType === 'supplier' ? '/api/supplier/company' : '/api/brands/company-info';

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const token = getAuthToken();
        const res = await fetch(readUrl, { headers: { Authorization: `Bearer ${token}` } });
        const json = await res.json();
        if (cancelled || !res.ok) return;
        const d = json?.data || {};
        setSlug(d.shop_slug || '');
        setSavedSlug(d.shop_slug || '');
        setSalesAccess(d.operation_settings?.sales_access === 'open' ? 'open' : 'contract_required');
      } catch {
        /* 못 읽어도 화면은 뜬다 — 링크 칸이 비어 보일 뿐이다 */
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [readUrl]);

  const save = useCallback(async (body: any) => {
    setStatus('idle');
    setErrorMsg('');
    try {
      const token = getAuthToken();
      // ⚠ 실패 본문(사유)을 읽어야 한다 — 공용 fetchAPI 는 본문을 버린다
      //   ([[reference_fetchapi_drops_error_body]]). 그래서 여기서는 직접 fetch 한다.
      const res = await fetch(writeUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(body)
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus('error');
        setErrorMsg(json?.message || json?.error?.message || '');
        return false;
      }
      setStatus('saved');
      return true;
    } catch {
      setStatus('error');
      return false;
    }
  }, [writeUrl]);

  const saveSlug = async () => {
    const ok = await save({ shop_slug: slug.trim() || null });
    if (ok) {
      // 서버가 규칙대로 다듬은 값을 다시 읽어 그대로 보여 준다(대문자·기호가 정리된다)
      try {
        const token = getAuthToken();
        const res = await fetch(readUrl, { headers: { Authorization: `Bearer ${token}` } });
        const json = await res.json();
        const v = json?.data?.shop_slug || '';
        setSlug(v);
        setSavedSlug(v);
      } catch { setSavedSlug(slug.trim()); }
    }
  };

  const saveAccess = async (value: 'contract_required' | 'open') => {
    setSalesAccess(value);
    await save({ operation_settings: { sales_access: value } });
  };

  const url = savedSlug ? `${window.location.origin}/shop/${savedSlug}` : '';
  const qrId = `shop-link-qr-${sellerType}`;

  if (loading) return null;

  return (
    <Card>
      <Row>
        <Left>
          <CardTitle>{t('common:shopLink.title')}</CardTitle>
          <Hint>{t('common:shopLink.hint')}</Hint>

          <FieldLabel>{t('common:shopLink.nameLabel')}</FieldLabel>
          <Input
            type="text"
            value={slug}
            disabled={disabled}
            onChange={e => setSlug(e.target.value)}
            onBlur={() => { if (slug.trim() !== savedSlug) void saveSlug(); }}
            placeholder={t('common:shopLink.placeholder') as string}
          />
          {status === 'saved' && <Saved>{t('common:shopLink.saved')}</Saved>}
          {status === 'error' && <ErrorText>{errorMsg || t('common:shopLink.saveFailed')}</ErrorText>}

          <FieldLabel>{t('common:shopLink.urlLabel')}</FieldLabel>
          {url ? (
            <>
              <UrlInput readOnly value={url} />
              <Actions>
                <Button variant="secondary" size="small" type="button" onClick={() => { navigator.clipboard?.writeText(url).catch(() => {}); }}>
                  {t('common:shopLink.copy')}
                </Button>
                <Button
                  variant="secondary"
                  size="small"
                  type="button"
                  onClick={() => {
                    const canvas = document.getElementById(qrId) as HTMLCanvasElement | null;
                    if (!canvas) return;
                    const a = document.createElement('a');
                    a.href = canvas.toDataURL('image/png');
                    a.download = `shop-link-qr.png`;
                    a.click();
                  }}
                >PNG</Button>
                <Button variant="secondary" size="small" type="button" onClick={() => window.open(url, '_blank')}>
                  {t('common:shopLink.open')}
                </Button>
              </Actions>
            </>
          ) : (
            <Empty>{t('common:shopLink.empty')}</Empty>
          )}

          <FieldLabel>{t('common:salesAccess.title')}</FieldLabel>
          <StandardSelect
            value={salesAccess}
            disabled={disabled}
            onChange={e => { void saveAccess(e.target.value as 'contract_required' | 'open'); }}
          >
            <option value="contract_required">{t('common:salesAccess.contract_required')}</option>
            <option value="open">{t('common:salesAccess.open')}</option>
          </StandardSelect>
          <Hint style={{ margin: '6px 0 0' }}>
            {salesAccess === 'open'
              ? t('common:salesAccess.openHint')
              : t('common:salesAccess.contract_requiredHint')}
            {sellerType === 'brand' ? ' ' + t('common:salesAccess.franchiseNote') : ''}
          </Hint>
        </Left>

        {url && (
          <QRBox>
            <QRCodeCanvas id={qrId} value={url} size={110} level="H" includeMargin style={{ display: 'none' }} />
            <QRCodeSVG value={url} size={110} level="H" includeMargin />
          </QRBox>
        )}
      </Row>
    </Card>
  );
};

export default SellerShopLinkCard;
