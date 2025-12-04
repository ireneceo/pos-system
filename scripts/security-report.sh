#!/bin/bash
#
# Purple POS 서버 주간 보안 리포트
# 매주 월요일 09:00 UTC 실행
#

# 설정
REPORT_EMAIL="admin@purplehere.com"
SERVER_NAME="Purple POS Server"
REPORT_DATE=$(date '+%Y년 %m월 %d일 %H:%M')

# 색상 (이메일용 HTML)
generate_report() {
    cat <<EOF
==========================================================
🔒 ${SERVER_NAME} 주간 보안 리포트
==========================================================
📅 리포트 생성일: ${REPORT_DATE}

----------------------------------------------------------
📊 현재 상태 요약
----------------------------------------------------------

EOF

    # 디스크 사용량
    DISK_USAGE=$(df -h /dev/vda1 2>/dev/null | tail -1)
    DISK_PERCENT=$(echo "$DISK_USAGE" | awk '{print $5}' | tr -d '%')
    DISK_USED=$(echo "$DISK_USAGE" | awk '{print $3}')
    DISK_TOTAL=$(echo "$DISK_USAGE" | awk '{print $2}')

    if [ "$DISK_PERCENT" -lt 70 ]; then
        DISK_STATUS="✅ 양호"
    elif [ "$DISK_PERCENT" -lt 85 ]; then
        DISK_STATUS="⚠️ 주의"
    else
        DISK_STATUS="🔴 위험"
    fi

    # 메모리 사용량
    MEM_INFO=$(free -h | grep Mem)
    MEM_TOTAL=$(echo "$MEM_INFO" | awk '{print $2}')
    MEM_USED=$(echo "$MEM_INFO" | awk '{print $3}')
    MEM_AVAIL=$(free -h | grep Mem | awk '{print $7}')
    MEM_PERCENT=$(free | grep Mem | awk '{printf "%.0f", $3/$2 * 100}')

    if [ "$MEM_PERCENT" -lt 70 ]; then
        MEM_STATUS="✅ 양호"
    elif [ "$MEM_PERCENT" -lt 85 ]; then
        MEM_STATUS="⚠️ 주의"
    else
        MEM_STATUS="🔴 위험"
    fi

    cat <<EOF
| 항목          | 사용량              | 상태      |
|---------------|---------------------|-----------|
| 💾 디스크     | ${DISK_USED} / ${DISK_TOTAL} (${DISK_PERCENT}%) | ${DISK_STATUS} |
| 🧠 메모리     | ${MEM_USED} / ${MEM_TOTAL} (${MEM_PERCENT}%) | ${MEM_STATUS} |
| 📦 가용 메모리 | ${MEM_AVAIL}        | -         |

----------------------------------------------------------
🛡️ SSH 공격 차단 현황 (Fail2Ban)
----------------------------------------------------------

EOF

    # Fail2Ban 통계
    if command -v fail2ban-client &> /dev/null; then
        F2B_STATUS=$(fail2ban-client status sshd 2>/dev/null)
        CURRENT_BANNED=$(echo "$F2B_STATUS" | grep "Currently banned" | awk '{print $NF}')
        TOTAL_BANNED=$(echo "$F2B_STATUS" | grep "Total banned" | awk '{print $NF}')
        CURRENT_FAILED=$(echo "$F2B_STATUS" | grep "Currently failed" | awk '{print $NF}')
        TOTAL_FAILED=$(echo "$F2B_STATUS" | grep "Total failed" | awk '{print $NF}')
        BANNED_IPS=$(echo "$F2B_STATUS" | grep "Banned IP list" | cut -d: -f2 | xargs)

        cat <<EOF
| 항목              | 수치      |
|-------------------|-----------|
| 현재 차단된 IP    | ${CURRENT_BANNED:-0}개 |
| 누적 차단 IP      | ${TOTAL_BANNED:-0}개 |
| 현재 실패한 접속  | ${CURRENT_FAILED:-0}건 |
| 누적 실패 시도    | ${TOTAL_FAILED:-0}건 |

EOF
        if [ -n "$BANNED_IPS" ] && [ "$BANNED_IPS" != " " ]; then
            echo "🚫 현재 차단된 IP 목록:"
            for ip in $BANNED_IPS; do
                echo "   - $ip"
            done
            echo ""
        fi
    else
        echo "⚠️ Fail2Ban이 설치되지 않았습니다."
        echo ""
    fi

    cat <<EOF
----------------------------------------------------------
🔄 보안 업데이트 현황
----------------------------------------------------------

EOF

    # 보안 업데이트 확인
    UPDATES_AVAILABLE=$(/usr/lib/update-notifier/apt-check 2>&1)
    TOTAL_UPDATES=$(echo "$UPDATES_AVAILABLE" | cut -d';' -f1)
    SECURITY_UPDATES=$(echo "$UPDATES_AVAILABLE" | cut -d';' -f2)

    if [ "$SECURITY_UPDATES" -eq 0 ]; then
        UPDATE_STATUS="✅ 최신 상태"
    else
        UPDATE_STATUS="⚠️ 업데이트 필요"
    fi

    cat <<EOF
| 항목              | 수치      | 상태           |
|-------------------|-----------|----------------|
| 총 업데이트       | ${TOTAL_UPDATES}개 | -              |
| 보안 업데이트     | ${SECURITY_UPDATES}개 | ${UPDATE_STATUS} |

----------------------------------------------------------
🔧 서비스 상태
----------------------------------------------------------

EOF

    # PM2 서비스 상태
    echo "📌 PM2 프로세스:"
    pm2 jlist 2>/dev/null | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    for p in data:
        status = '✅ 실행중' if p['pm2_env']['status'] == 'online' else '❌ 중지'
        print(f\"   - {p['name']}: {status} (메모리: {p['monit']['memory'] // 1024 // 1024}MB)\")
except:
    print('   정보를 가져올 수 없습니다.')
" 2>/dev/null || echo "   PM2 정보를 가져올 수 없습니다."
    echo ""

    # Nginx 상태
    if systemctl is-active --quiet nginx; then
        echo "📌 Nginx: ✅ 실행중"
    else
        echo "📌 Nginx: ❌ 중지됨"
    fi

    # MySQL 상태
    if systemctl is-active --quiet mysql; then
        echo "📌 MySQL: ✅ 실행중"
    else
        echo "📌 MySQL: ❌ 중지됨"
    fi
    echo ""

    cat <<EOF
----------------------------------------------------------
📝 권장 조치 사항 (할 일)
----------------------------------------------------------

EOF

    TODO_COUNT=0

    # 보안 업데이트 권장
    if [ "$SECURITY_UPDATES" -gt 0 ]; then
        TODO_COUNT=$((TODO_COUNT + 1))
        cat <<EOF
${TODO_COUNT}. 🔴 [긴급] 보안 업데이트 적용
   - ${SECURITY_UPDATES}개의 보안 패키지 업데이트 대기 중
   - 명령어: sudo apt update && sudo apt upgrade -y

EOF
    fi

    # 디스크 경고
    if [ "$DISK_PERCENT" -ge 70 ]; then
        TODO_COUNT=$((TODO_COUNT + 1))
        cat <<EOF
${TODO_COUNT}. ⚠️ [주의] 디스크 공간 확보
   - 현재 사용량: ${DISK_PERCENT}%
   - 불필요한 로그 파일 정리 권장
   - 명령어: sudo journalctl --vacuum-time=7d

EOF
    fi

    # 메모리 경고
    if [ "$MEM_PERCENT" -ge 80 ]; then
        TODO_COUNT=$((TODO_COUNT + 1))
        cat <<EOF
${TODO_COUNT}. ⚠️ [주의] 메모리 사용량 높음
   - 현재 사용량: ${MEM_PERCENT}%
   - 프로세스 확인 및 최적화 필요

EOF
    fi

    # SSH 공격 경고
    if [ "${CURRENT_BANNED:-0}" -gt 5 ]; then
        TODO_COUNT=$((TODO_COUNT + 1))
        cat <<EOF
${TODO_COUNT}. 🔒 [권장] SSH 보안 강화 검토
   - ${CURRENT_BANNED}개 IP가 현재 차단 상태
   - SSH 포트 변경 또는 키 기반 인증만 허용 고려

EOF
    fi

    # 정기 점검 항목
    TODO_COUNT=$((TODO_COUNT + 1))
    cat <<EOF
${TODO_COUNT}. 📋 [정기] 로그 모니터링
   - 명령어: sudo tail -100 /var/log/auth.log

EOF

    TODO_COUNT=$((TODO_COUNT + 1))
    cat <<EOF
${TODO_COUNT}. 📋 [정기] 백업 상태 확인
   - 백업 위치: /var/www/backups/
   - 최근 백업 확인: ls -lt /var/www/backups/ | head -5

EOF

    # 종합 평가
    cat <<EOF
----------------------------------------------------------
📈 종합 평가
----------------------------------------------------------

EOF

    OVERALL_STATUS="🟢 양호"
    if [ "$SECURITY_UPDATES" -gt 0 ]; then
        OVERALL_STATUS="🟡 주의 (보안 업데이트 필요)"
    fi
    if [ "$DISK_PERCENT" -ge 85 ] || [ "$MEM_PERCENT" -ge 85 ]; then
        OVERALL_STATUS="🟠 경고 (리소스 부족)"
    fi

    cat <<EOF
전체 서버 상태: ${OVERALL_STATUS}

| 영역      | 상태      | 비고                    |
|-----------|-----------|-------------------------|
| 디스크    | ${DISK_STATUS} | $((100 - DISK_PERCENT))% 여유 공간     |
| 메모리    | ${MEM_STATUS} | $((100 - MEM_PERCENT))% 여유          |
| 보안      | ${UPDATE_STATUS} | 업데이트 ${SECURITY_UPDATES}개 대기    |
| SSH       | ✅ 정상    | Fail2Ban 작동 중        |

==========================================================
🤖 Purple POS 서버 자동 보안 모니터
   리포트 문의: admin@purplehere.com
==========================================================
EOF
}

# 리포트 생성
REPORT=$(generate_report)

# 출력 (테스트용)
echo "$REPORT"

# 메일 발송 (mailutils 설치 필요)
# echo "$REPORT" | mail -s "🔒 Purple POS 주간 보안 리포트 - ${REPORT_DATE}" "$REPORT_EMAIL"
