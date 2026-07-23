#!/bin/bash
# 운영서버 메모리 보호막 — 무중단 설치 (2026-07-14)
#
# 개발서버에서 검증한 것과 동일한 보호막을 운영에 씌운다.
#   - earlyoom: 폭주 프로세스만 죽여 머신 프리즈를 막는다 (가용 10% SIGTERM / 5% SIGKILL)
#   - oom_score_adj: MySQL·PM2 백엔드·nginx·sshd 는 절대 희생되지 않게 보호
#   - 부검 로그: 다음 사건을 1분 해상도로 되짚을 수 있게 기록
#
# ⚠ 매장 영업 중에도 안전하다: 서비스 재시작 0건.
#   실행 중인 프로세스엔 /proc 로 즉시 적용하고, systemd 드롭인은 "다음 재시작부터" 유효.
# 멱등 — 여러 번 돌려도 안전.
#
# 실행 (2단계 — 반드시 이 순서로):
#   scp /var/www/scripts/prod-memory-protection.sh irene@87.106.78.146:/tmp/
#   ssh -t irene@87.106.78.146 'sudo bash /tmp/prod-memory-protection.sh'
#
# ⚠ 2026-07-23: 원래 여기 적혀 있던 `ssh -t ... 'sudo bash -s' < 이파일` 은 실행되지 않는다.
#   stdin 을 스크립트 파일이 차지해 -t 가 TTY 를 못 잡고, 운영 sudo 는 비밀번호를 요구하므로
#   "sudo: a terminal is required to read the password" 로 죽는다. 그래서 7/14 이후 이 보호막이
#   미적용으로 남아 있었다. 파일을 먼저 올린 뒤 실행해야 sudo 가 프롬프트를 띄울 수 있다.
#   (개발서버는 NOPASSWD 라 옛 명령도 통과해서, 차이를 눈치채기 어려웠다.)

set -e
echo "=== 운영서버 메모리 보호막 설치 (무중단) ==="

# 1. earlyoom
if ! command -v earlyoom >/dev/null 2>&1; then
  echo "→ earlyoom 설치 중..."
  DEBIAN_FRONTEND=noninteractive apt-get install -y earlyoom >/dev/null
fi
cat > /etc/default/earlyoom <<'EOF'
# 운영 프리즈 방지 (2026-07-14). 개발서버와 동일 설정.
# 정규식엔 공백 금지 (systemd EnvironmentFile 은 공백으로 인자를 나눈다).
# node 를 --prefer 에 넣지 않는다 — 백엔드를 오폭할 경로를 만들지 않기 위해서다.
EARLYOOM_ARGS=-m 10,5 -s 50,25 -r 3600 --avoid ^(mysqld|sshd|nginx|systemd|init|PM2|mariadbd|rsyslogd|cron)$ --prefer ^(qemu-system-x86|chrome|headless_shell|chromium|java)$
EOF
systemctl enable earlyoom >/dev/null 2>&1
systemctl restart earlyoom   # earlyoom 자신만 재시작 (서비스 무영향)
echo "→ earlyoom: $(systemctl is-active earlyoom)"

# 2. oom_score_adj — 드롭인(다음 재시작부터) + 실행 중 프로세스에 즉시 적용(재시작 없이)
for pair in "mysql:-800" "pm2-irene:-500" "nginx:-500"; do
  unit="${pair%:*}"; adj="${pair#*:}"
  mkdir -p "/etc/systemd/system/${unit}.service.d"
  printf '[Service]\nOOMScoreAdjust=%s\n' "$adj" > "/etc/systemd/system/${unit}.service.d/oom.conf"
done
systemctl daemon-reload   # 재시작 아님 — 설정만 다시 읽는다

apply_live() {  # $1=패턴(pgrep -f) $2=값
  for p in $(pgrep -f "$1" 2>/dev/null); do
    echo "$2" > "/proc/$p/oom_score_adj" 2>/dev/null || true
  done
}
apply_live 'mysqld' -800
apply_live 'PM2 v' -500
apply_live 'production-backend/server.js' -500
apply_live 'nginx: master' -500
# PM2 가 관리하는 앱 전부 (planq 포함)
for p in $(pgrep -u root -f 'ProcessContainerFork\|server.js' 2>/dev/null); do
  echo -500 > "/proc/$p/oom_score_adj" 2>/dev/null || true
done

# 3. 부검 로그 (1분 간격, 기록만 — drop_caches·서비스 재시작 절대 안 함)
mkdir -p /var/www/logs
cat > /var/www/scripts/monitor-memory.sh <<'EOF'
#!/bin/bash
# memory forensics — 기록만 한다. 조치는 earlyoom 이 한다.
LOG_FILE="/var/www/logs/memory-monitor.log"
mkdir -p /var/www/logs
{
  printf '[%s] ' "$(date '+%Y-%m-%d %H:%M:%S')"
  free -m | awk '/^Mem:/{printf "mem_used=%sMB avail=%sMB ", $3, $7} /^Swap:/{printf "swap=%s/%sMB\n", $3, $2}'
  ps -eo pid,rss,comm --sort=-rss | awk 'NR>1 && NR<=6 {printf "    top%d: %sMB %s (pid %s)\n", NR-1, int($2/1024), $3, $1}'
} >> "$LOG_FILE"
tail -10000 "$LOG_FILE" > "${LOG_FILE}.tmp" && mv "${LOG_FILE}.tmp" "$LOG_FILE"
EOF
chmod +x /var/www/scripts/monitor-memory.sh
( crontab -l 2>/dev/null | grep -v 'monitor-memory.sh'; echo '*/1 * * * * /var/www/scripts/monitor-memory.sh' ) | crontab -

echo
echo "=== 검증 ==="
systemctl is-active earlyoom fail2ban mysql nginx pm2-irene | paste -sd' ' - | sed 's/^/  서비스: /'
journalctl -u earlyoom -n 20 --no-pager | grep -m2 "when mem" | sed 's/^.*earlyoom\[[0-9]*\]: /  earlyoom: /'
echo "  보호값:"
for n in mysqld nginx; do p=$(pgrep -x $n | head -1); [ -n "$p" ] && echo "    $n = $(cat /proc/$p/oom_score_adj)"; done
for p in $(pgrep -f 'production-backend' | head -1); do echo "    production-backend = $(cat /proc/$p/oom_score_adj)"; done
free -m | awk '/Mem:/{print "  가용 메모리: "$7"MB / "$2"MB"}'
echo
echo "✓ 완료 — 서비스 재시작 0건 (매장 무영향)"
