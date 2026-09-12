/**
 * UpgradeGuidePage — «발주 전용(무료)» 등급에서 잠긴 메뉴를 눌렀을 때 오는 화면.
 *
 * 왜 있나: 무료 등급은 발주·공급업체·매입 청구서만 열린다. 재고·레시피·메뉴는 요금제 문이 막는데,
 * 막히기만 하면 왜 안 되는지 알 수 없다 → 여기서 «올리면 무엇이 자동으로 계산되는지»를 보여준다
 * (2026-09-12 · docs/BUYER_FREE_TIER_DESIGN.md §5-1).
 *
 * 이미 유료 등급이면 잠긴 것이 없으므로 안내 대신 «이미 쓰고 있다»를 보여준다.
 */
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Header, Title, Content, ThemedButton } from '../../components/UI';
import { useAuth } from '../../contexts/AuthContext';
import { useAllowedRoutes } from '../../hooks/useAllowedRoutes';

const Lead = styled.p`
  margin: 0 0 24px;
  font-size: 15px;
  line-height: 1.7;
  color: #4B5563;
  max-width: 720px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  margin-bottom: 28px;
`;

const Card = styled.div`
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 20px;
`;

const CardTitle = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 8px;
`;

const CardBody = styled.div`
  font-size: 13px;
  line-height: 1.7;
  color: #6B7280;
`;

const KeepRow = styled.div`
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 16px 20px;
  font-size: 13px;
  line-height: 1.7;
  color: #4B5563;
  margin-bottom: 28px;
  max-width: 720px;
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const UpgradeGuidePage: React.FC = () => {
  const { t } = useTranslation(['subscription', 'common']);
  const navigate = useNavigate();
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const { user } = useAuth();
  const { hasModule, loading } = useAllowedRoutes({
    role: user?.role || '',
    // AuthContext 의 restaurantId 는 문자열이다 — 훅은 숫자를 받으므로 여기서 맞춘다.
    restaurantId: restaurantId ? parseInt(restaurantId, 10) : (user?.restaurantId ? parseInt(user.restaurantId, 10) : null)
  });

  // 재고 모듈이 이미 있으면 잠긴 것이 없다 — 안내가 아니라 사실을 보여준다.
  const alreadyIncluded = !loading && hasModule('inventory_management');

  const items: Array<{ key: string; title: string; body: string }> = [
    {
      key: 'stock',
      title: t('subscription:upgradeGuide.stockTitle', '발주하면 재고가 저절로 쌓입니다'),
      body: t('subscription:upgradeGuide.stockBody', '입고를 기록하면 남은 수량이 자동으로 올라가고, 판매하면 내려갑니다. 따로 세지 않아도 됩니다.')
    },
    {
      key: 'recipe',
      title: t('subscription:upgradeGuide.recipeTitle', '메뉴 한 그릇의 원가가 계산됩니다'),
      body: t('subscription:upgradeGuide.recipeBody', '레시피에 재료를 걸어두면 발주 단가가 바뀔 때 메뉴 원가도 같이 바뀝니다.')
    },
    {
      key: 'supplier',
      title: t('subscription:upgradeGuide.supplierTitle', '업체별 단가를 한눈에 비교합니다'),
      body: t('subscription:upgradeGuide.supplierBody', '같은 재료를 여러 곳에서 받을 때 어디가 싼지, 언제 올랐는지 기록이 남습니다.')
    }
  ];

  return (
    <Container>
      <Header>
        <Title>
          {alreadyIncluded
            ? t('subscription:upgradeGuide.titleIncluded', '이미 사용할 수 있는 기능입니다')
            : t('subscription:upgradeGuide.title', '업그레이드하면 자동으로 계산됩니다')}
        </Title>
      </Header>
      <Content>
        <Lead>
          {alreadyIncluded
            ? t('subscription:upgradeGuide.leadIncluded', '현재 요금제에 재고·레시피 기능이 들어 있습니다. 왼쪽 메뉴에서 바로 여세요.')
            : t('subscription:upgradeGuide.lead', '지금 요금제는 공급업체 발주와 매입 청구서까지 무료로 쓰실 수 있습니다. 여기에 재고와 레시피를 더하면, 발주한 것이 그대로 재고와 메뉴 원가로 이어집니다.')}
        </Lead>

        <CardGrid>
          {items.map(item => (
            <Card key={item.key}>
              <CardTitle>{item.title}</CardTitle>
              <CardBody>{item.body}</CardBody>
            </Card>
          ))}
        </CardGrid>

        {!alreadyIncluded && (
          <KeepRow>
            {t('subscription:upgradeGuide.keep', '지금 쓰고 계신 발주 내역과 공급업체 정보는 그대로 남습니다. 다시 입력하지 않으셔도 됩니다.')}
          </KeepRow>
        )}

        <Actions>
          <ThemedButton variant="primary" onClick={() => navigate('/pricing')}>
            {t('subscription:upgradeGuide.seePlans', '요금제 보기')}
          </ThemedButton>
          <ThemedButton
            variant="secondary"
            onClick={() => navigate(restaurantId ? `/restaurant/${restaurantId}/dashboard` : '/pos/dashboard')}
          >
            {t('common:backToDashboard', '대시보드로 돌아가기')}
          </ThemedButton>
        </Actions>
      </Content>
    </Container>
  );
};

export default UpgradeGuidePage;
