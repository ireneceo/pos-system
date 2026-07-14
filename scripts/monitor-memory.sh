#!/bin/bash
# memory forensics — 기록만 한다. 조치는 earlyoom 이 한다. (2026-07-14 전면 교체)
#
# 옛 버전은 메모리 85% 넘으면 drop_caches 를 하고 MySQL 을 재시작했다. 둘 다 유해했다:
#   - drop_caches: 스래시 중 페이지캐시를 버려 디스크 IO 를 폭증시킨다 = 프리즈를 악화
#   - MySQL 재시작: 압박 때마다 개발 DB 를 끊는다 (보호해야 할 대상을 스스로 죽임)
# 프리즈 방어는 earlyoom(가용 10%/5% 에서 폭주 프로세스만 kill) + cgroup 상자 + heavy-task-gate 가 한다.
# 이 스크립트의 유일한 일 = 다음 사건이 나면 원인을 1분 해상도로 되짚을 수 있게 남기는 것.
# 함께 볼 것: journalctl -u earlyoom · sar -r -f /var/log/sysstat/saDD

LOG_FILE="/var/www/logs/memory-monitor.log"
mkdir -p /var/www/logs

{
  printf '[%s] ' "$(date '+%Y-%m-%d %H:%M:%S')"
  free -m | awk '/^Mem:/{printf "mem_used=%sMB avail=%sMB ", $3, $7} /^Swap:/{printf "swap=%s/%sMB\n", $3, $2}'
  ps -eo pid,rss,comm --sort=-rss | awk 'NR>1 && NR<=6 {printf "    top%d: %sMB %s (pid %s)\n", NR-1, int($2/1024), $3, $1}'
} >> "$LOG_FILE"

# 1분 간격 × 상위5 프로세스 = 하루 약 8600줄. 10000줄이면 최근 하루치가 남는다.
tail -10000 "$LOG_FILE" > "${LOG_FILE}.tmp" && mv "${LOG_FILE}.tmp" "$LOG_FILE"
