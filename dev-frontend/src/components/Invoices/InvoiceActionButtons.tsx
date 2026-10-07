import type { CSSProperties } from 'react';
import styled from 'styled-components';
import { ActionButtons } from '../UI';

/**
 * 청구서 목록 표의 «Actions» 칸 — 청구서 화면(Owner · RA · Brand · Foodcourt)이 같이 쓴다 — Foodcourt 는 격자 배치라 머리칸 폭 대신 묶음 폭만 쓴다. (2026-10-07)
 *
 * 표에 열이 10개라 노트북 폭(1440px, 사이드바 2단)에서 이 칸에 남는 폭은 약 157px 이다(실측: 표 칸 1016 − 다른 열 최소 합 859).
 * 그래서 묶음 폭을 118px(«Mark paid» 94 + 여유)로 고정 → 칸 = 118 + 좌우 여백 32 = 150px.
 * «View + Mark paid» 를 한 줄에 두려면 190px 가 필요해 안 들어가므로, 넓은 화면에서는
 *   - 글자 버튼(View · Mark paid · Pay · Confirm · Edit)은 같은 폭으로 위아래로 쌓고
 *   - 아이콘 버튼(PDF · Print · Send · 삭제)은 그 아래 한 줄에 둔다.
 * 글자 버튼 = 안에 요소가 없는 버튼(글자만), 아이콘 버튼 = svg·기호 span 을 가진 버튼.
 * 안내 글자(«Pay via SOA» · «No linked purchase order»)도 한 줄을 통째로 쓴다.
 * 1024px 이하(행이 카드로 바뀌는 폭)는 공용 ActionButtons 그대로 한 줄로 흐른다.
 */
export const InvoiceActionButtons = styled(ActionButtons)`
  @media (min-width: 1025px) {
    width: 118px;

    > button:not(:has(> *)),
    > span {
      flex: 1 1 100%;
    }
  }
`;

/** 같은 표의 «Actions» 머리칸 최소 폭 = 위 묶음 폭. 표 칸은 content-box 라 좌우 여백 32 는 따로 붙어 칸 = 150px. */
export const INVOICE_ACTIONS_COL: CSSProperties = { minWidth: 118 };
