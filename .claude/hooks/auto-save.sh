#!/usr/bin/env bash
# Auto-save dead-man for /var/www
#
# Two modes:
#   stop  — Claude Stop hook fires after every Claude response.
#           Records activity timestamp only.
#   timer — Cron entry, runs every 5 min. Takes a snapshot ONLY when:
#             • Claude has been silent > 30 min (idle / SSH dropped / sleeping)
#             • Repo has uncommitted work
#             • Last snapshot was > 30 min ago
#
# ★ 2026-10-11 재설계 — 작업 브랜치에 커밋하지 않는다 (Fable 게이트 C1 근본 해결,
#   판정문 /var/www/backups/fable-pending/fable-verdict-20261011-clean-source-deploy-gate.md)
#   옛 버전은 `git add -A && git commit` 으로 **작업 브랜치 HEAD** 에 «wip: auto-save» 를 쌓았다.
#   배포가 «마지막 커밋의 깨끗한 사본» 에서 나가게 되자, 검증 안 된 진행 중 작업이 자동저장
#   커밋을 타고 운영으로 갈 수 있게 됐다. 그래서 PlanQ(scripts/claude-autosave.sh)와 같은 방식:
#   스냅샷을 전용 ref `refs/autosave/<브랜치>` 에 쌓는다. 워킹트리·인덱스·브랜치 어느 것도
#   건드리지 않는다(임시 인덱스 사용). 유실 방지력은 그대로, 히스토리·배포에는 사람이 커밋한 것만.
#   (옛 STALE 배너도 뺐다 — HEAD 에 코드가 들어가지 않으니 «HEAD 는 새 코드, 작업기록은 옛것»
#    상황이 생기지 않고, cron 이 작업 중인 방의 session-state.md 를 고쳐 쓰는 경합도 없어진다.)
#
#   복구:
#     git log --oneline refs/autosave/<브랜치>          # 스냅샷 목록
#     git show refs/autosave/<브랜치>:<경로>            # 파일 하나 꺼내 보기
#     git diff HEAD refs/autosave/<브랜치>              # 지금 커밋과 마지막 스냅샷 차이
#     git checkout refs/autosave/<브랜치> -- <경로>     # 되살리기

set -u

ACTIVITY_FILE="/tmp/.claude-last-activity"
LOG_FILE="/var/www/.claude/auto-save.log"
REPO="/var/www"
IDLE_THRESHOLD_SEC=1800       # 30 min — dead-man trigger
MIN_SNAPSHOT_INTERVAL_SEC=1800  # 30 min — between snapshots
MODE="${1:-stop}"
NOW=$(date +%s)

# ─── stop mode: just timestamp activity ───────────────────────────────
if [ "$MODE" = "stop" ]; then
  echo "$NOW" > "$ACTIVITY_FILE"
  exit 0
fi

# ─── timer mode: dead-man snapshot ────────────────────────────────────
[ "$MODE" = "timer" ] || exit 0

cd "$REPO" 2>/dev/null || exit 0
git rev-parse --verify -q HEAD >/dev/null 2>&1 || exit 0

# Skip if no uncommitted work
[ -n "$(git status --porcelain 2>/dev/null)" ] || exit 0

# Skip if Claude has been active in last 30 min
ACTIVITY_TS=$(cat "$ACTIVITY_FILE" 2>/dev/null || echo 0)
IDLE_SINCE=$((NOW - ACTIVITY_TS))
[ "$IDLE_SINCE" -ge "$IDLE_THRESHOLD_SEC" ] || exit 0

BRANCH=$(git symbolic-ref --quiet --short HEAD 2>/dev/null || echo "detached")
AUTOSAVE_REF="refs/autosave/${BRANCH}"
LAST=$(git rev-parse --verify -q "$AUTOSAVE_REF" 2>/dev/null || true)

# Skip if last snapshot (or, before the first one, last commit) is very recent
if [ -n "$LAST" ]; then
  REF_TIME=$(git log -1 --format=%ct "$LAST" 2>/dev/null || echo 0)
else
  REF_TIME=$(git log -1 --format=%ct HEAD 2>/dev/null || echo 0)
fi
[ $((NOW - REF_TIME)) -ge "$MIN_SNAPSHOT_INTERVAL_SEC" ] || exit 0

# Build snapshot tree in a temporary index — user's index/staging untouched
TMP_INDEX=$(mktemp "${TMPDIR:-/tmp}/.purple-autosave-index.XXXXXX") || exit 0
trap 'rm -f "$TMP_INDEX"' EXIT
export GIT_INDEX_FILE="$TMP_INDEX"
git read-tree HEAD >/dev/null 2>&1 || exit 0
git add -A >/dev/null 2>&1
# defensively keep sensitive paths at their HEAD state
git reset -q HEAD -- \
  '.env' '.env.local' '.env.development' '.env.production' \
  '*.pem' '*.key' '*credentials*' '*secret*' \
  >/dev/null 2>&1 || true
TREE=$(git write-tree 2>/dev/null) || exit 0
unset GIT_INDEX_FILE

# Same as previous snapshot, or nothing tracked actually changed → nothing to save
if [ -n "$LAST" ] && [ "$(git rev-parse -q --verify "${LAST}^{tree}" 2>/dev/null)" = "$TREE" ]; then
  exit 0
fi
[ "$(git rev-parse -q --verify 'HEAD^{tree}' 2>/dev/null)" != "$TREE" ] || exit 0

TIMESTAMP=$(date "+%Y-%m-%d %H:%M")
COUNT=$(git diff --name-only HEAD "$TREE" 2>/dev/null | wc -l | tr -d ' ')
HEAD_SHORT=$(git rev-parse --short HEAD)

# Parent: previous snapshot (chain), or HEAD for the first one
COMMIT=$(git -c user.name='Claude AutoSave' -c user.email='autosave@local' \
  commit-tree "$TREE" -p "${LAST:-HEAD}" \
  -m "autosave $TIMESTAMP ($COUNT files vs ${HEAD_SHORT}, idle ${IDLE_SINCE}s)" \
  -m "작업 브랜치가 아닌 스냅샷 ref. 복구: git checkout ${AUTOSAVE_REF} -- <경로>" 2>/dev/null) || exit 0

if git update-ref "$AUTOSAVE_REF" "$COMMIT" ${LAST:+"$LAST"} 2>/dev/null; then
  mkdir -p "$(dirname "$LOG_FILE")"
  echo "[$TIMESTAMP] snapshot $COUNT files (idle=${IDLE_SINCE}s) -> ${AUTOSAVE_REF} $(git rev-parse --short "$COMMIT") | 복구: git checkout ${AUTOSAVE_REF} -- <경로>" >> "$LOG_FILE"
fi

exit 0
