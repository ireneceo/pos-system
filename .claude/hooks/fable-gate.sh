#!/usr/bin/env bash
# Fable 게이트 — Stop 훅.
#
# "검증 없이 끝났다고 말하는 순간"을 막는다. 판정 로직은 전부
# /var/www/dev-backend/scripts/fable-gate.js 에 있고, 이 스크립트는 훅 규약만 처리한다.
#
# 규약:
#   - stdin 으로 JSON 이 들어온다. `stop_hook_active` 가 true 면 **이미 이 훅 때문에 한 번
#     멈춘 상태**라 다시 막지 않는다(무한루프 방지 — Claude Code Stop 훅 표준).
#   - exit 2 = 정지 차단(모델에게 stderr 가 전달됨). exit 0 = 통과.
#   - 게이트 자체가 고장 나서 작업을 영구히 막는 일이 없도록, node 실행 자체가 실패하면
#     통과시킨다(이 훅은 안전망이지 관문이 아니다 — 뒷문만 잠근다).

INPUT=$(cat)

if command -v jq >/dev/null 2>&1; then
  ACTIVE=$(echo "$INPUT" | jq -r '.stop_hook_active // false')
  if [ "$ACTIVE" = "true" ]; then
    exit 0
  fi
fi

OUT=$(node /var/www/dev-backend/scripts/fable-gate.js check 2>&1)
CODE=$?

if [ "$CODE" = "2" ]; then
  echo "$OUT" >&2
  exit 2
fi

# 게이트 통과 또는 게이트 자체 오류 — 작업을 막지 않는다.
[ -n "$OUT" ] && echo "$OUT" >&2
exit 0
