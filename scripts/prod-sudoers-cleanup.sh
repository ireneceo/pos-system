#!/bin/bash
# 운영서버 sudoers 위생 정리 — 위험한 NOPASSWD 3종 제거 (2026-07-23)
#
# 설계 = Fable 검증 게이트 PASS / 실측 = Opus
#
# 지우는 것 (전부 "사용처 0" 실측 확인):
#   NOPASSWD: /usr/bin/chown   ← 인자 제한 없음 = `sudo chown irene /etc/sudoers` 한 줄로
#                                 비밀번호 없는 root 와 동치. 운영 사용처 0건.
#   NOPASSWD: /usr/bin/kill    ← 임의 PID = root 로 mysqld/nginx/sshd 즉사 가능(매장 마비).
#   NOPASSWD: /usr/sbin/lsof   ← 전 유저 열린 파일·소켓 정보 노출.
#
# 남기는 것 (배포가 실제로 쓰는 하중 — 문자 그대로 무접촉):
#   systemctl reload/restart nginx · nginx -t · rm -rf /var/cache/nginx/*
#   그리고 `(ALL:ALL) ALL` (비밀번호 치면 뭐든 되는 관리자 권한) — 유지.
#   ⇒ 기능 상실 0. NOPASSWD 는 "무인 자동화용"인데 자동화가 쓰는 건 nginx 계열뿐이다.
#
# 안전장치 (fail-closed):
#   ① 편집 전 /etc/sudoers·/etc/sudoers.d 통째로 백업
#   ② 임시 사본에 먼저 반영 → `visudo -cf` 문법검증 통과할 때만 실제 파일에 씀
#   ③ 끝에 `visudo -c` 전체 재검증 + nginx 항목 생존 확인
#   ④ 멱등 — 여러 번 돌려도 안전
#
# ⚠ 실행 전 필수: 다른 SSH 창을 하나 더 열어 `sudo -s` 로 root 셸을 띄워두고
#    이 작업이 끝날 때까지 닫지 마세요. 만에 하나 어긋나도 그 셸로 복구합니다.
#
# 실행:
#   scp /var/www/scripts/prod-sudoers-cleanup.sh irene@87.106.78.146:/tmp/
#   ssh -t irene@87.106.78.146 'sudo bash /tmp/prod-sudoers-cleanup.sh'
#
# 매장 영업 중 안전: 서비스 재시작 0건, nginx 무접촉.

set -u
if [ "$(id -u)" != "0" ]; then echo "root 로 실행하세요: sudo bash $0"; exit 1; fi

TS=$(date +%Y%m%d_%H%M%S)
BK="/root/sudoers-backup-$TS"
TARGETS='/usr/bin/chown|/usr/bin/kill|/usr/sbin/lsof'

echo "=== 운영 sudoers 정리 (백업 $BK) ==="

# 1. 백업
mkdir -p "$BK"
cp -a /etc/sudoers "$BK/sudoers"
[ -d /etc/sudoers.d ] && cp -ra /etc/sudoers.d "$BK/sudoers.d"
echo "  ✓ 백업 완료"

# 2. 현재 상태
echo "--- 정리 전 NOPASSWD 목록 ---"
grep -rhE 'NOPASSWD' /etc/sudoers /etc/sudoers.d/ 2>/dev/null | sed 's/^/    /'

# 3. 대상 줄만 삭제 (인자 없는 단독 항목만 — nginx 줄은 패턴상 절대 안 걸린다)
CHANGED=0
FILES=$(grep -rlE "NOPASSWD:[[:space:]]*($TARGETS)[[:space:]]*\$" /etc/sudoers /etc/sudoers.d/* 2>/dev/null || true)
if [ -z "$FILES" ]; then
  echo "  ○ 대상 없음 — 이미 정리됨(멱등)"
else
  for f in $FILES; do
    echo "--- $f ---"
    sed -E "\%^[^#]*NOPASSWD:[[:space:]]*($TARGETS)[[:space:]]*\$%d" "$f" > /root/.sudoers.work
    if visudo -cf /root/.sudoers.work >/dev/null 2>&1; then
      # 콤마로 여러 명령이 한 줄에 묶인 형태는 이 패턴에 안 걸린다 → 남으면 4번에서 잡힌다
      cat /root/.sudoers.work > "$f"
      chmod 0440 "$f"
      echo "  ✓ 반영됨"
      CHANGED=1
    else
      echo "  ✗ 문법검증 실패 — 이 파일은 원본 그대로 둠 (수동 확인 필요)"
    fi
  done
  rm -f /root/.sudoers.work
fi

# 4. 검증
echo "--- 최종 검증 ---"
visudo -c >/dev/null 2>&1 && echo "  ✓ sudoers 문법 정상" || { echo "  ✗✗ 문법 오류! 즉시 복구: cp $BK/sudoers /etc/sudoers"; exit 1; }

FAIL=0
if grep -rhE "NOPASSWD:.*($TARGETS)" /etc/sudoers /etc/sudoers.d/ 2>/dev/null | grep -q .; then
  echo "  ✗ 위험 항목이 아직 남아 있습니다 (콤마로 묶인 줄일 수 있음 — 아래를 보고 visudo 로 수동 제거):"
  grep -rnE "NOPASSWD:.*($TARGETS)" /etc/sudoers /etc/sudoers.d/ 2>/dev/null | sed 's/^/      /'
  FAIL=1
else
  echo "  ✓ chown/kill/lsof NOPASSWD 제거 확인"
fi

# 배포 하중이 살아 있는지 — 여기가 깨지면 다음 배포가 멈춘다
if sudo -n /usr/sbin/nginx -t >/dev/null 2>&1; then echo "  ✓ nginx -t NOPASSWD 유지"; else echo "  ✗ nginx -t 가 사라졌습니다 — 복구 필요"; FAIL=1; fi
if sudo -n /bin/systemctl reload nginx >/dev/null 2>&1 || sudo -n /usr/bin/systemctl reload nginx >/dev/null 2>&1; then
  echo "  ✓ systemctl reload nginx NOPASSWD 유지 (배포 무손상, graceful=무중단)"
else
  echo "  ✗ reload nginx 가 사라졌습니다 — 배포가 깨집니다. 복구 필요"; FAIL=1
fi

echo
if [ "$FAIL" = "0" ]; then
  echo "=== 완료 ===  변경=$CHANGED · 백업=$BK"
  echo "복구가 필요하면: cp -a $BK/sudoers /etc/sudoers  (드롭인은 $BK/sudoers.d/)"
else
  echo "=== 확인 필요 — 위 ✗ 항목을 보세요. 백업=$BK ==="
  exit 1
fi
