#!/bin/bash
# heavy-task-gate.sh — 메모리 폭주로 서버가 얼어붙는 것을 막는 상호배제 게이트 (2026-07-14)
#
# 배경: 7/8~7/14 서버 재부팅 4회의 원인 = 메모리 고갈 프리즈.
#   프론트 빌드(node, 최대 4.8GB) 와 안드로이드 에뮬레이터(qemu, 약 4.5GB) 가
#   7.9GB 서버에서 겹치면 스왑이 만재되고 머신이 응답을 잃는다.
#   방어는 4중이다: [이 게이트] → 빌드 힙 상한 → cgroup 상자 → earlyoom.
#   이 게이트는 그중 첫 층 — 애초에 겹치지 않게 한다.
#
# 사용: heavy-task-gate.sh build|emulator     (exit 1 = 차단)
#       SKIP_MEMGATE=1 로 의식적 우회 가능 (사유 기록 권장)

[ "$SKIP_MEMGATE" = "1" ] && { echo "⚠ heavy-task-gate SKIPPED (SKIP_MEMGATE=1)"; exit 0; }

ROLE="$1"
AVAIL=$(awk '/MemAvailable/{print int($2/1024)}' /proc/meminfo)

# 판정은 커맨드라인이 아니라 프로세스 이름(comm)으로 한다.
# `pgrep -f qemu-system` 은 earlyoom 의 --prefer 정규식('...qemu-system-x86...')까지 잡는
# 자기매칭 오탐을 낸다 (2026-07-14 실측). comm 은 그런 문자열을 담지 않는다.
# 에뮬레이터 comm = qemu-system-x86 (15자 절단) / 빌드 = comm 이 node 이면서 args 에 react-scripts.
emulator_running() { pgrep -x 'qemu-system-x86|emulator' >/dev/null 2>&1; }
build_running() {
  ps -eo comm,args --no-headers | awk '$1 == "node" && /react-scripts/ { found = 1 } END { exit !found }'
}

case "$ROLE" in
  build)
    if emulator_running; then
      echo "GATE 차단: 안드로이드 에뮬레이터(qemu)가 실행 중입니다 — 빌드와 겹치면 서버가 얼어붙습니다."
      echo "          에뮬레이터 종료 후 다시 빌드하세요. (확인: pgrep -af qemu-system)"
      exit 1
    fi
    MIN=2500
    ;;
  emulator)
    if build_running; then
      echo "GATE 차단: 프론트 빌드가 실행 중입니다 — 에뮬레이터와 겹치면 서버가 얼어붙습니다."
      echo "          빌드 완료 후 다시 실행하세요."
      exit 1
    fi
    MIN=3000
    ;;
  *)
    echo "사용법: heavy-task-gate.sh build|emulator" >&2
    exit 2
    ;;
esac

if [ "$AVAIL" -lt "$MIN" ]; then
  echo "GATE 차단: 가용 메모리 ${AVAIL}MB < 필요 ${MIN}MB — 지금 ${ROLE} 을 시작하면 서버가 위험합니다."
  echo "          메모리를 먹는 프로세스 상위 5개:"
  ps -eo pid,rss,comm --sort=-rss | awk 'NR>1&&NR<=6{printf "            %sMB  %s (pid %s)\n", int($2/1024), $3, $1}'
  exit 1
fi

exit 0
