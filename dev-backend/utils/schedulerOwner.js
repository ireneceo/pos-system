/**
 * 정기 작업(스케줄러) 주인 판정 — 2026-11-08 확장성 정비 (Fable 설계).
 *
 * 웹 프로세스가 여러 개가 되면 청구서·SOA·정기 발주 같은 정기 작업이 프로세스마다 돌아
 * 두 번 생긴다. 주인 1개만 스케줄러를 켠다.
 *  - SCHEDULER_OWNER='1' → 주인, '0' → 주인 아님 (명시 스위치 우선 — 두 번째 서버엔 0)
 *  - 아니면 pm2 cluster 인스턴스 번호 0(또는 없음 = fork 1개) 만 주인
 * 기본은 «주인» — 환경변수가 없는 지금 운영(fork 1개)에서 정기 작업이 조용히 멈추지 않게.
 */
function isSchedulerOwner(env = process.env) {
  if (env.SCHEDULER_OWNER === '0') return false;
  if (env.SCHEDULER_OWNER === '1') return true;
  return env.NODE_APP_INSTANCE === undefined || env.NODE_APP_INSTANCE === '0';
}

module.exports = { isSchedulerOwner };
