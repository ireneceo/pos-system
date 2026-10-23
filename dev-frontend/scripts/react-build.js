#!/usr/bin/env node
/**
 * react-build.js — 타입 검사기(ForkTsChecker)를 뺀 react-scripts build (2026-10-23)
 * ------------------------------------------------------------------
 * 왜 빼는가
 *   - 빌드 안 검사기는 자기 힙 상한 2048MB 에서 죽는다(10-23 배포 «JavaScript heap out of memory»).
 *     TSC_COMPILE_ON_ERROR=true 경로(ForkTsCheckerWarningWebpackPlugin)는 설정을 넘겨받지 않아
 *     memoryLimit 을 올릴 길도 없다.
 *   - 살아도 아무것도 막지 못한다 — 오류를 경고로 바꾸고(TSC_COMPILE_ON_ERROR), i18next d.ts 파싱에서
 *     멈춰 우리 코드 검사로 넘어가지도 않는다(메모리 reference_type_gate_two_blocks).
 *   - 그런데 상자(5G) 안에서 2GB 넘게 먹는다.
 *   타입 검사는 빌드 밖 `dev-backend/scripts/check-type-baseline.js`(verify-all · tsc 힙 3584MB)가 맡는다.
 */
// react-scripts/scripts/build.js 첫 줄과 같다 — 설정 파일이 읽힐 때 이미 필요하다.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const configPath = require.resolve('react-scripts/config/webpack.config');
const configFactory = require(configPath);

require.cache[configPath].exports = (env) => {
  const config = configFactory(env);
  const before = config.plugins.length;
  config.plugins = config.plugins.filter((p) => !/ForkTsChecker/.test(p.constructor.name));
  // react-scripts 가 바뀌어 못 찾으면 조용히 넘어가지 않는다 — 검사기가 되살아나 또 죽는다.
  if (before - config.plugins.length !== 1) {
    console.error(`react-build: 타입 검사기 플러그인을 ${before - config.plugins.length}개 찾음(1개여야 함) — react-scripts 구조 확인`);
    process.exit(1);
  }
  return config;
};

require('react-scripts/scripts/build');
