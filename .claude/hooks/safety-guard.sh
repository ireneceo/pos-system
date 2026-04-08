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
fi

exit 0
