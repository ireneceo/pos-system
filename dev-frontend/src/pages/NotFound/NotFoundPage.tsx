/**
 * 없는 주소 안내 화면 (2026-09-13)
 * ------------------------------------------------------------------
 * 왜 필요한가: App.tsx 에 catch-all 라우트가 없어서 잘못된 주소는 **완전 백지**였다
 * (#root 자식 0개 · 글자 0). 매장에서 옛 북마크·오타 주소를 열면 직원은 "시스템이 죽었다"로
 * 판단하고 복구 방법을 알 수 없다. 화면은 ①무엇이 잘못됐는지 ②지금 상태 ③다음에 할 일을 준다.
 */
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Button } from '../../components/UI/Button';

const Wrap = styled.div`
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 40px 16px;
  text-align: center;
`;
const Mark = styled.div`
  font-size: 32px;
  color: #9CA3AF;
  line-height: 1;
`;
const Title = styled.h1`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #17212F;
`;
const Desc = styled.p`
  margin: 0;
  font-size: 14px;
  color: #4B5563;
  max-width: 480px;
`;
const Path = styled.code`
  display: inline-block;
  margin-top: 4px;
  padding: 4px 8px;
  border-radius: 6px;
  background: #F3F4F6;
  color: #374151;
  font-size: 13px;
  word-break: break-all;
`;
const Actions = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 8px;
`;

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <Wrap>
      <Mark>◯</Mark>
      <Title>{t('common:notFound.title', { defaultValue: 'This page does not exist' })}</Title>
      <Desc>
        {t('common:notFound.desc', { defaultValue: 'The address may have changed, or the link is out of date. Nothing was lost — your data is unaffected.' })}
        <br />
        <Path>{location.pathname}</Path>
      </Desc>
      <Actions>
        <Button variant="secondary" onClick={() => navigate(-1)}>
          {t('common:notFound.back', { defaultValue: 'Go back' })}
        </Button>
        <Button variant="primary" onClick={() => navigate('/')}>
          {t('common:notFound.home', { defaultValue: 'Go to start page' })}
        </Button>
      </Actions>
    </Wrap>
  );
};

export default NotFoundPage;
