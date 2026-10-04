import { parseFeed, parseVersion, isNewer, isDismissed, writeDismiss } from '../nativeAppUpdate';

const SHA = 'a'.repeat(64);
const feed = (o: any = {}) => parseFeed({ versionName: '0.3.1', versionCode: 4, file: 'PurplePOS-0.3.1.apk', sha256: SHA, size: 3000000, ...o })!;

describe('nativeAppUpdate', () => {
  test('parseVersion', () => {
    expect(parseVersion('0.3.1-dev')).toEqual([0, 3, 1]);
    expect(parseVersion('x')).toBeNull();
    expect(parseVersion(null)).toBeNull();
  });
  test('isNewer — semver 폴백', () => {
    expect(isNewer(feed(), { versionName: '0.2.0', versionCode: null })).toBe(true);
    expect(isNewer(feed({ versionName: '0.3.0', file: 'PurplePOS-0.3.0.apk', versionCode: 3 }), { versionName: '0.3.0', versionCode: null })).toBe(false);
    expect(isNewer(feed(), { versionName: '0.3.1-dev', versionCode: null })).toBe(false);
  });
  test('isNewer — versionCode 우선', () => {
    expect(isNewer(feed(), { versionName: '9.9.9', versionCode: 3 })).toBe(true);
    expect(isNewer(feed(), { versionName: '0.0.1', versionCode: 4 })).toBe(false);
  });
  test('isNewer — 현재 버전 모르면 true', () => {
    expect(isNewer(feed(), { versionName: null, versionCode: null })).toBe(true);
  });
  test('parseFeed — 모양 불량·정규식 불일치 null', () => {
    expect(parseFeed(null)).toBeNull();
    expect(parseFeed({ versionName: '0.3.1', file: '../evil.apk', sha256: SHA, size: 1 })).toBeNull();
    expect(parseFeed({ versionName: '0.3.1', file: 'PurplePOS-0.3.1.apk', sha256: 'zz', size: 1 })).toBeNull();
    expect(parseFeed({ versionName: '0.3.1', file: 'PurplePOS-0.3.1.apk', sha256: SHA, size: 0 })).toBeNull();
    expect(feed().versionCode).toBe(4);
  });
  test('isDismissed — 같은 버전만', () => {
    localStorage.clear();
    writeDismiss('0.3.1');
    expect(isDismissed(feed())).toBe(true);
    expect(isDismissed(feed({ versionName: '0.3.2', file: 'PurplePOS-0.3.2.apk' }))).toBe(false);
  });
});
