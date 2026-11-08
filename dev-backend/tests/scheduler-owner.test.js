const { isSchedulerOwner } = require('../utils/schedulerOwner');

describe('isSchedulerOwner', () => {
  test('환경변수 없음(fork 1개) → 주인', () => {
    expect(isSchedulerOwner({})).toBe(true);
  });
  test('cluster 인스턴스 1 → 주인 아님', () => {
    expect(isSchedulerOwner({ NODE_APP_INSTANCE: '1' })).toBe(false);
  });
  test('cluster 인스턴스 0 → 주인', () => {
    expect(isSchedulerOwner({ NODE_APP_INSTANCE: '0' })).toBe(true);
  });
  test('명시 스위치가 인스턴스 번호보다 우선', () => {
    expect(isSchedulerOwner({ SCHEDULER_OWNER: '0', NODE_APP_INSTANCE: '0' })).toBe(false);
    expect(isSchedulerOwner({ SCHEDULER_OWNER: '1', NODE_APP_INSTANCE: '2' })).toBe(true);
  });
});
