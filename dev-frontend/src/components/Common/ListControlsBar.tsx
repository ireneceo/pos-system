/**
 * ListControlsBar — unified list page controls strip.
 * Mirrors the LiveOrders FilterToolbar pattern: a single flex-wrap container
 * holding [Search][Filters][Sort][ViewToggle][Action]. On small mobile, search
 * snaps to a full row above; the rest stays inline and wraps naturally.
 *
 * Use in product / recipe / ingredient list pages instead of the legacy
 * `<FilterBar>` + outer flex wrapper combo, which forced each control onto
 * its own row at <=600px.
 */
import styled from 'styled-components';

export const ListControlsBar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  flex-wrap: wrap;

  /* Search wrapper (SearchInputWrapper) is the first child — let it grow
     on desktop but cap its width so filters can sit beside it. */
  > div:first-child:not([data-controls-trailing]) {
    flex: 1 1 280px;
    min-width: 0;
    max-width: 420px;
  }

  /* 2026-11-10 전 역할 통일(R5): 태블릿에선 검색칸이 줄의 남는 폭을 채운다(공용 필터 줄과 같은 규칙) */
  @media (max-width: 1024px) {
    > div:first-child:not([data-controls-trailing]) {
      max-width: none;
    }
  }

  /* Push the trailing action group (ViewToggle + primary button) to the right
     on desktop. The group is the last child, identified by data attribute. */
  > [data-controls-trailing] {
    margin-left: auto;
    display: flex;
    gap: 8px;
    align-items: center;
    flex-shrink: 0;
  }

  @media (max-width: 600px) {
    gap: 8px;

    /* Search becomes a full-width row above the other controls.
       order:-1 keeps it visually first regardless of DOM position. */
    > div:first-child:not([data-controls-trailing]) {
      flex: 1 1 100%;
      max-width: 100%;
      order: -1;
    }

    /* Filter selects share the next row equally (2-up).
       Override the legacy 100%-width mobile rule from FilterComponents. */
    && > select {
      flex: 1 1 calc(50% - 4px);
      width: auto;
      min-width: 0;
      max-width: none;
    }

    /* Trailing group: drop the auto margin so it wraps naturally with rest.
       2026-11-10 반응형 점검: 폰에선 행동 버튼 줄이 한 줄 전체를 쓰고 버튼끼리 고르게 나눠 채운다
       (브랜드 메뉴 «Push All Changes»+«Add Brand Menu» 가 화면 밖으로 나가던 것). */
    > [data-controls-trailing] {
      margin-left: 0;
      flex: 1 1 100%;
      flex-wrap: wrap;
      flex-shrink: 1;
      min-width: 0;

      > button,
      > a {
        flex: 1 1 auto;
        margin-right: 0 !important;
      }
    }
  }
`;

export default ListControlsBar;
