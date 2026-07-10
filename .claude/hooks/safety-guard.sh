#!/bin/bash
# POS 프로젝트 안전 가드
# 1. PlanQ 파일/DB/PM2 건드리기 차단
# 2. npm run build 직접 실행 차단 (build:dev 사용)
# 3. node_modules/.cache 삭제 차단
# 4. deploy-to-production 무단 실행 차단

INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name')

deny() {
  jq -n --arg reason "$1" '{
    hookSpecificOutput: {
      hookEventName: "PreToolUse",
      permissionDecision: "deny",
      permissionDecisionReason: $reason
    }
  }'
  exit 0
}

ask() {
  jq -n --arg reason "$1" '{
    hookSpecificOutput: {
      hookEventName: "PreToolUse",
      permissionDecision: "ask",
      permissionDecisionReason: $reason
    }
  }'
  exit 0
}

# ===== BASH 명령어 검증 =====
if [ "$TOOL_NAME" = "Bash" ]; then
  CMD=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

  # PlanQ PM2 프로세스 건드리기 차단
  if echo "$CMD" | grep -qE "pm2.*(restart|stop|delete|start).*planq"; then
    deny "BLOCKED: PlanQ PM2 프로세스를 건드릴 수 없습니다. 이 창은 POS 전용입니다."
  fi

  # PlanQ DB 접근 차단
  if echo "$CMD" | grep -qi "planq_dev_db"; then
    deny "BLOCKED: PlanQ DB(planq_dev_db)에 접근할 수 없습니다. 이 창은 POS 전용입니다."
  fi

  # /opt/planq/ 경로 파일 수정 명령 차단
  if echo "$CMD" | grep -qE "(cat|echo|tee|sed|cp|mv|rm).*(/opt/planq/)"; then
    deny "BLOCKED: /opt/planq/ 파일을 수정할 수 없습니다. PlanQ는 별도 창에서 작업하세요."
  fi

  # npm run build 직접 실행 차단 (build:dev만 허용)
  if echo "$CMD" | grep -qE "npm run build[^:]" || echo "$CMD" | grep -qE "npm run build$"; then
    deny "BLOCKED: 'npm run build' 직접 실행 금지. 'npm run build:dev'를 사용하세요."
  fi

  # node_modules/.cache 삭제 차단
  if echo "$CMD" | grep -qE "rm.*node_modules/.cache"; then
    deny "BLOCKED: node_modules/.cache 삭제 금지. 삭제하면 빌드가 5분+ 걸립니다."
  fi

  # 가드 bless(기준 재등록) = Irene 승인 + (인쇄면) 실프린터 확인 후에만 (CLAUDE.md 🔒)
  if echo "$CMD" | grep -qE "check-print-guard\.js.*--bless|--bless.*check-print-guard"; then
    ask "🔒 인쇄 보호파일 기준(bless) 재등록 시도. Irene 승인 + 실프린터 종이 확인이 끝난 정식 인쇄 변경인지 확인하세요."
  fi

  # 배포 안전 게이트 우회 = 의식적 선택만 (긴급 핫픽스 전용)
  if echo "$CMD" | grep -qE "\-\-skip-safety"; then
    ask "⚠ --skip-safety = 인쇄/주문 안전 게이트 우회. Irene이 긴급 핫픽스로 명시 지시했는지 확인하세요."
  fi

  # deploy-to-production 무단 실행 경고 (차단은 아니고 ask)
  if echo "$CMD" | grep -qE "deploy.*production|deploy-to-production"; then
    jq -n '{
      hookSpecificOutput: {
        hookEventName: "PreToolUse",
        permissionDecision: "ask",
        permissionDecisionReason: "운영 배포 스크립트를 실행하려 합니다. Irene이 /배포 명령을 했는지 확인하세요."
      }
    }'
    exit 0
  fi
fi

# ===== 파일 수정 검증 =====
if [ "$TOOL_NAME" = "Edit" ] || [ "$TOOL_NAME" = "Write" ]; then
  FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

  # /opt/planq/ 파일 수정 차단
  if echo "$FILE_PATH" | grep -q "^/opt/planq"; then
    deny "BLOCKED: /opt/planq/ 파일을 수정할 수 없습니다. PlanQ는 별도 창에서 작업하세요."
  fi

  # 🔒 인쇄/KDS 생명선 보호 파일 편집 = 편집 시점에 확인 (CLAUDE.md 최우선 규칙과 동기화 —
  # check-print-guard.js PROTECTED_FILES 와 동일 목록. 배포 게이트는 사후 감지, 이건 사전 확인.)
  case "$FILE_PATH" in
    /var/www/dev-frontend/src/utils/billPrint.js|\
    /var/www/dev-frontend/src/hooks/useAutoPrintPoller.ts|\
    /var/www/dev-backend/utils/stationEnrichment.js|\
    /var/www/dev-backend/utils/orderTotals.js|\
    /var/www/dev-frontend/src/components/Layout/MainLayout.tsx|\
    /var/www/dev-frontend/src/pages/KitchenDisplay/KitchenDisplayPage.tsx|\
    /var/www/dev-frontend/src/pages/POSTerminal/POSTerminalPage.tsx|\
    /var/www/dev-backend/routes/orders-crud.js)
      ask "🔒 인쇄/KDS 보호 파일($FILE_PATH) 편집 시도. CLAUDE.md 절대규칙: Irene 명시 요청+승인된 인쇄/KDS 작업인가? 무관한 작업이면 이 파일을 건드리지 말 것."
      ;;
  esac

  # 가드 기준(baseline/manifest) 직접 편집 = 가드 무력화 시도일 수 있음 → 확인.
  # 정식 경로는 각 스크립트의 --bless 다 (직접 편집 아님).
  case "$FILE_PATH" in
    */scripts/print-guard.manifest.json|*/scripts/design-guard-baseline.json|\
    */scripts/inspection/baseline.json|*/scripts/timezone-baseline.json|*/scripts/route-guard-baseline.json)
      ask "⚠ 가드 baseline($FILE_PATH) 직접 편집 시도. 정식 경로는 해당 스크립트의 --bless 입니다. 직접 편집은 가드 무력화입니다."
      ;;
  esac
fi

exit 0
