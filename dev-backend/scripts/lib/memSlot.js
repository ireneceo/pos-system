/**
 * memSlot.js — 무거운 작업(크롬·에뮬레이터·tsc)을 서버 공용 «메모리 자리표» 로 감싸는 한 곳 (2026-11-03)
 * ------------------------------------------------------------------
 * Irene «같은 일 안생기게 메모리 나눠서 순서대로 쓰게 해야지» — 11-03 PlanQ 빌드 두 개가 겹쳐 메모리 바닥·스왑 99%
 *   → 서버 통신 끊김 → 재부팅. 세 솔루션(PurpleHere·PlanQ·Lingo)이 같은 서버라 같은 줄에 서야 서로를 본다.
 * 자리표 = ~/dev-server/bin/mem-slot (설명 ~/dev-server/README.md §2):
 *   먼저 선 순서대로 · 몫×1.3 상자 안에서 돌아 넘치면 그 일만 죽음(137) · --wait 초 안 차례가 안 오면 75(우회 금지).
 *
 * 몫(MB)은 실측 정점+15% 로 적는다. 여기 한 곳에 모은다 — 고칠 때 이 표만 고친다.
 *   빌드(purple-build)는 dev-frontend/deploy-dev.sh 가 셸에서 직접 감싼다(BUILD_MB).
 *
 * ⚠ 두 겹 금지: 자리표 안에서 또 자리표를 부르면 자기 자리를 기다리며 멈출 수 있다.
 *   그래서 감쌀 때 PURPLE_MEM_SLOT 을 자식에게 넘기고, 이미 있으면 감싸지 않는다.
 */
const fs = require('fs');

const SLOT = '/home/irene/dev-server/bin/mem-slot';

// 몫(MB) — 실측 정점+15%. 숫자를 바꾸면 이유(언제·몇 MB 실측)를 옆에 적는다.
const SHARES = {
  'purple-chrome': 1000,     // 헤드리스 크롬 한 벌(mount sweep · 인쇄 라우트) — 공용 어림값, 실측 뒤 고침
  'purple-emulator': 4500,   // 안드로이드 에뮬레이터 시험(run-v3/v4) — qemu 약 4.5GB RSS(07-14 실측) · 상자는 나눠 쓸 메모리 한도로 잘림
  'purple-typecheck': 4000,  // 빌드 밖 tsc(힙 상한 3584MB) — 힙 상한 기준 어림, 실측 뒤 고침
};

function available() {
  try { fs.accessSync(SLOT, fs.constants.X_OK); return true; } catch { return false; }
}

/**
 * 명령 배열을 자리표로 감싼다.
 * @returns {{ cmd: string[], env: object, slotted: boolean }}
 *   slotted=false 면 원래 명령 그대로(자리표 없음 · 이미 자리표 안).
 */
// 이미 자리표 상자 안인가 — 작업방이 바깥에서 `mem-slot run … -- node verify-all.js` 로 감싼 경우.
//   상자 이름이 memslot-<이름>-<pid>.scope 라 /proc/self/cgroup 에 보인다.
function insideSlot() {
  try { return /memslot-/.test(fs.readFileSync('/proc/self/cgroup', 'utf8')); } catch { return false; }
}

function wrap(name, cmd, { waitSec = 1800, env = process.env } = {}) {
  const mb = SHARES[name];
  if (!mb) throw new Error(`memSlot: 모르는 이름 ${name}`);
  if (env.PURPLE_MEM_SLOT || insideSlot() || !available()) return { cmd, env, slotted: false };
  return {
    cmd: [SLOT, 'run', name, String(mb), '--wait', String(waitSec), '--', ...cmd],
    env: { ...env, PURPLE_MEM_SLOT: name },
    slotted: true,
  };
}

/**
 * 뒤에서 띄운(spawn) 자리표 작업이 차례를 받아 실제로 시작했는지 기다린다 — 에뮬레이터처럼
 * 띄워 두고 다른 일을 하는 작업용. 줄 서 있는 동안 «부팅 5분» 같은 시간 한도가 흐르지 않게 한다.
 * @param child spawn 결과(자리표 프로그램 자체 — 자리표 한 줄의 pid 가 이 pid)
 * @returns Promise<void> — 차례가 오면 끝 · 자리표가 먼저 끝나면(75 = 시간 초과 등) 오류
 */
function waitAdmitted(child, { maxMs = 1830 * 1000, stepMs = 3000, onWait } = {}) {
  const { spawnSync } = require('child_process');
  const t0 = Date.now();
  let said = false;
  return new Promise((resolve, reject) => {
    const tick = () => {
      if (child.exitCode !== null || child.signalCode) {
        reject(new Error(child.exitCode === 75
          ? '메모리 자리표에서 차례가 오지 않아 실행하지 않음(75 · 우회 금지) — 앞의 무거운 작업이 끝난 뒤 다시'
          : `자리표 작업이 시작 전에 끝남(코드 ${child.exitCode}${child.signalCode ? ' / ' + child.signalCode : ''})`));
        return;
      }
      let state = null;
      try {
        const st = JSON.parse(spawnSync(SLOT, ['status', '--json'], { encoding: 'utf8', timeout: 20000 }).stdout || '{}');
        const mine = (st.slots || []).find((s) => s.pid === child.pid);
        state = mine ? mine.state : null;
      } catch { /* 다음에 다시 */ }
      if (state === 'run') { resolve(); return; }
      if (!said && state === 'wait' && onWait) { onWait(); said = true; }
      if (Date.now() - t0 > maxMs) { reject(new Error('메모리 자리표 차례 기다리기 시간 초과')); return; }
      setTimeout(tick, stepMs);
    };
    tick();
  });
}

module.exports = { SLOT, SHARES, wrap, available, insideSlot, waitAdmitted };
