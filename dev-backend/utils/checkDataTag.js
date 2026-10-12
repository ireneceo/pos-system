'use strict';
/**
 * «[확인용]» 시험 데이터 보존 규칙 (2026-10-11 · 상황판 «시험 계정으로 열기» — ~/dev-server/kit/DEV-LOGIN.md).
 *
 * 작업방 보고의 «확인할 곳» 링크가 보여 주는 시험 데이터는 이름에 `[확인용]` 을 달고 남긴다.
 * 기존 정리 작업(데모 매장 자정 초기화 resetDemoOrders)은 이 표시가 붙은 행을 **7일 동안 남기고**,
 * 7일 지나면 평소처럼 지운다 — 새 정리 일정(cron)은 만들지 않는다.
 *
 * 찾기·지우기 조건은 이 함수 하나로 공유한다(조건이 갈라지면 «지우기가 덜 지운다»).
 */
const CHECK_DATA_TAG = '[확인용]';
const CHECK_DATA_KEEP_DAYS = 7;

/**
 * 「7일 안 된 [확인용] 행」 조건 SQL 조각. columns = 표시를 찾을 칸(따옴표 없는 칸 이름).
 * LIKE 의 대괄호는 MySQL 에서 특수문자가 아니다.
 */
function keepCheckDataSql(columns, createdAtColumn = 'createdAt') {
  const tagged = columns.map((c) => `COALESCE(${c}, '') LIKE '%${CHECK_DATA_TAG}%'`).join(' OR ');
  return `((${tagged}) AND ${createdAtColumn} >= NOW() - INTERVAL ${CHECK_DATA_KEEP_DAYS} DAY)`;
}

module.exports = { CHECK_DATA_TAG, CHECK_DATA_KEEP_DAYS, keepCheckDataSql };
