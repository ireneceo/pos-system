#!/bin/bash
#
# 주간 보안 리포트 정확도 수정 — **운영 서버에서 1회 실행** (2026-09-07)
#
# 왜: 주간 리포트가 매주 세 가지를 시켰는데 둘이 틀렸다.
#   ① "[긴급] 보안 업데이트 N개 적용 필요" → `unattended-upgrades` 가 이미 자동 적용한다.
#      리포트 시점에 몇 개 보이는 것은 정상이고 몇 시간 뒤 사라진다(실측: 리포트 1개 → 확인 시 0개).
#      매주 [긴급]으로 올리면 손댈 필요 없는 일에 사람이 계속 불려 나온다.
#      → **자동 적용이 멈췄을 때만** 올린다(꺼져 있거나 3일 넘게 안 돌았을 때).
#   ② "디스크 73% → journalctl --vacuum-time=7d" → 저널은 **364MB** 뿐이라 원인이 아니었다.
#      진짜 원인은 배포 백업 210개 = **134G**(디스크 사용량 169G 의 대부분).
#      → **무엇이 차지하는지 실제로 재서** 알려준다.
#   ③ "서버 리부트 필요" → 이건 맞다. 그대로 둔다.
#
# 배포 백업 누적 자체는 `deploy-to-production.sh` 가 30일 보관으로 자동 정리한다(같은 날 수정).
#
# 사용(운영 터미널에서 직접, sudo 비번 필요):
#   sudo bash /var/www/production-backend/scripts/ops/fix-weekly-report.sh
# 원본은 `.bak-<타임스탬프>` 로 남는다. 되돌리려면 그 파일을 되돌려 놓으면 된다.
# ✅ 반려 지적 2건 반영 완료 (2026-09-08 확인). 아래가 그때 지적이고, 둘 다 본문에 들어가 있다:
#   ①`du --max-depth=2` 는 /var(139G) 자체가 1등이라 정보가 없다 → `du -xsh /var/*/* /opt/* /home/*` 3줄
#     (아래 TOP_DIR 라인)
#   ②마지막 자동적용 시각은 로그 mtime 이 아니라 `/var/lib/apt/periodic/unattended-upgrades-stamp`
#     (로그 폴더가 root:adm 750 이라 root 아니면 항상 99일 → 매주 거짓 [긴급]). 아래 AUTO_STAMP 라인.
#     로그 mtime 은 스탬프가 없을 때만 폴백으로 쓴다.
# 남은 것은 **운영에서 1회 실행**뿐이고, 대상 파일이 root 소유라 sudo 가 필요해 Irene 이 직접 돌려야 한다.
set -e
# 대상 파일이 root 소유(rwxr-xr-x)라 **sudo 로 실행**해야 한다.
[ "$(id -u)" = 0 ] || { echo "root 로 실행하세요:  sudo bash $0"; exit 1; }
F=/opt/security-monitor/weekly-report.sh
[ -f "$F" ] || { echo "대상 없음: $F"; exit 1; }
cp "$F" "${F}.bak-$(date +%Y%m%d_%H%M%S)"

python3 - "$F" <<'PY'
import sys
p = sys.argv[1]
s = open(p).read()

old_sec = '''if [ "${SECURITY_UPDATES:-0}" -gt 0 ]; then
    TODO_COUNT=$((TODO_COUNT + 1))
    TODO_ITEMS="${TODO_ITEMS}  ${TODO_COUNT}. [긴급] 보안 업데이트 ${SECURITY_UPDATES}개 적용 필요\\n"
    TODO_ITEMS="${TODO_ITEMS}     -> sudo apt update && sudo apt upgrade -y\\n\\n"
fi'''
new_sec = '''# 보안 업데이트는 `unattended-upgrades` 가 매일 자동 적용한다.
#   리포트 시점에 몇 개 보이는 것은 정상이고, 진짜 이상은 **자동 적용이 멈춘 것**이다.
AUTO_UPG_ENABLED=$(systemctl is-enabled unattended-upgrades 2>/dev/null || echo disabled)
# 마지막 자동적용 시각은 **로그 파일 mtime 이 아니라** apt 의 주기 실행 스탬프가 진실이다.
#   로그는 "고칠 것이 있었을 때"만 갱신돼, 조용히 잘 돌던 서버가 몇 십 일째 멈춘 것처럼 보인다.
#   (2026-09-07 상위 검증 지적)
AUTO_STAMP=/var/lib/apt/periodic/unattended-upgrades-stamp
AUTO_AGE_DAYS=99
if [ -f "$AUTO_STAMP" ]; then
    AUTO_AGE_DAYS=$(( ( $(date +%s) - $(stat -c %Y "$AUTO_STAMP") ) / 86400 ))
elif [ -f /var/log/unattended-upgrades/unattended-upgrades.log ]; then
    AUTO_AGE_DAYS=$(( ( $(date +%s) - $(stat -c %Y /var/log/unattended-upgrades/unattended-upgrades.log) ) / 86400 ))
fi
if [ "$AUTO_UPG_ENABLED" != "enabled" ]; then
    TODO_COUNT=$((TODO_COUNT + 1))
    TODO_ITEMS="${TODO_ITEMS}  ${TODO_COUNT}. [긴급] 자동 보안 업데이트가 꺼져 있습니다\\n"
    TODO_ITEMS="${TODO_ITEMS}     -> sudo systemctl enable --now unattended-upgrades\\n\\n"
elif [ "${AUTO_AGE_DAYS:-99}" -gt 3 ]; then
    TODO_COUNT=$((TODO_COUNT + 1))
    TODO_ITEMS="${TODO_ITEMS}  ${TODO_COUNT}. [긴급] 자동 보안 업데이트가 ${AUTO_AGE_DAYS}일째 동작하지 않았습니다\\n"
    TODO_ITEMS="${TODO_ITEMS}     -> sudo unattended-upgrade -d  (로그: /var/log/unattended-upgrades/)\\n\\n"
fi'''
assert old_sec in s, "보안 블록 앵커 없음 — 이미 패치됐거나 원본이 다릅니다"
s = s.replace(old_sec, new_sec, 1)

old_disk = '''if [ "${DISK_PERCENT:-0}" -ge 70 ]; then
    TODO_COUNT=$((TODO_COUNT + 1))
    TODO_ITEMS="${TODO_ITEMS}  ${TODO_COUNT}. [주의] 디스크 사용량 ${DISK_PERCENT}% - 정리 필요\\n"
    TODO_ITEMS="${TODO_ITEMS}     -> sudo journalctl --vacuum-time=7d\\n\\n"
fi'''
new_disk = '''if [ "${DISK_PERCENT:-0}" -ge 70 ]; then
    TODO_COUNT=$((TODO_COUNT + 1))
    # `journalctl --vacuum` 을 무조건 권하지 않는다 — 실측 364MB 라 원인과 거의 무관했다.
    # `--max-depth=2 /var` 는 /var 자체(139G)가 늘 1등이라 아무것도 못 알려준다.
    #   한 단계 더 들어간 실제 폴더 3개를 보여준다 (2026-09-07 상위 검증 지적).
    TOP_DIR=$(du -xsh /var/*/* /opt/* /home/* 2>/dev/null | sort -rh | head -3 | awk '{printf "%s %s; ", $1, $2}')
    JOURNAL_SZ=$(journalctl --disk-usage 2>/dev/null | grep -oE '[0-9.]+[MG]' | head -1)
    TODO_ITEMS="${TODO_ITEMS}  ${TODO_COUNT}. [주의] 디스크 사용량 ${DISK_PERCENT}% - 정리 필요\\n"
    TODO_ITEMS="${TODO_ITEMS}     가장 큰 곳 셋: ${TOP_DIR}\\n"
    TODO_ITEMS="${TODO_ITEMS}     (시스템 로그는 ${JOURNAL_SZ:-알수없음} 이라 대개 원인이 아닙니다)\\n"
    TODO_ITEMS="${TODO_ITEMS}     -> 위 폴더를 먼저 확인하세요. 배포 백업은 배포 스크립트가 30일 보관으로 자동 정리합니다.\\n\\n"
fi'''
assert old_disk in s, "디스크 블록 앵커 없음 — 이미 패치됐거나 원본이 다릅니다"
s = s.replace(old_disk, new_disk, 1)

open(p, 'w').write(s)
print("패치 적용 완료")
PY
bash -n "$F" && echo "문법 검사 통과"
# ⛔ 여기서 리포트를 실행하지 않는다 — 운영 `weekly-report.sh` 에는 `--dry-run` 이 **없어서**
#   인자를 무시하고 끝까지 돌아 **실제 메일을 한 통 더 보내고** 옛 로그까지 지운다(2026-09-07 Fable 적발).
#   확인은 문법 검사 + 패치된 블록 확인으로 대신한다.
echo "패치된 블록:"
grep -n "자동 보안 업데이트가\|가장 큰 곳" "$F" | head -4
