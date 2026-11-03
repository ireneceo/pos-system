#!/bin/bash
# Dev Frontend 빌드 및 배포 자동화 스크립트

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
BUILD_DIR="$SCRIPT_DIR/build"
CACHE_DIR="$SCRIPT_DIR/node_modules/.cache"
DEPLOY_DIR="/var/www/dev-frontend-build"
CURRENT_USER=$(whoami)

# ── 메모리 자리표 (2026-11-03 Irene «같은 일 안생기게 메모리 나눠서 순서대로 쓰게 해야지») ──
#   11-03 PlanQ 빌드 두 개가 겹쳐 메모리 바닥·스왑 99% → 서버 통신 끊김 → 재부팅. 솔루션마다 게이트가 따로라
#   서로의 «들어가는 중» 을 못 봤다. 자리표(~/dev-server/bin/mem-slot)는 세 솔루션이 같이 서는 줄 — 먼저 선 순서대로,
#   메모리가 될 때 들어가고, 들어간 일은 칸막이 상자(몫×1.3) 안에서 돌아 넘치면 그 일만 죽는다(137).
#   60분 안 차례가 안 오면 75(실행 안 함 · 우회 금지).
#   몫 2850MB = 실측 정점 2475MB(타입 검사기 뺀 10-23 이후 빌드 29번의 최댓값 · 11-03 집계) + 15% → 상자 3705MB.
#   정점이 올라가면 끝에 찍히는 «빌드 상자 메모리 피크» 를 보고 이 숫자를 고친다.
#
#   **이 스크립트 전체**를 자리표 안에서 돌린다 — 빌드 줄만 감싸면 «옛 빌드 지우기»·«복사» 가 밖이라
#   다음 PurpleHere 빌드가 줄 서기 전에 build/ 를 지워 앞 빌드의 복사를 깨뜨린다(11-03 10:05 실제로 남).
#   ⚠ 두 겹 금지 — 이미 자리표 상자 안이면(작업방이 `mem-slot run … -- npm run build:dev` 로 감쌈) 다시 감싸지 않는다.
#     두 겹이면 안쪽이 바깥 자리를 기다리며 60분 멈추고 뒤에 선 다른 솔루션 빌드까지 막는다(11-03 10:05 실제로 남).
#     package.json 의 build 스크립트도 그래서 감싸지 않는다. build:dev 끝 주석은 공용 검사(mem-slot-guard) 표시 — 지우지 말 것.
MEM_SLOT=/home/irene/dev-server/bin/mem-slot
BUILD_MB=2850
INSIDE_SLOT_UNIT=$(grep -o 'memslot-[A-Za-z0-9_.-]*\.scope' /proc/self/cgroup 2>/dev/null | head -1)
if [ -z "$INSIDE_SLOT_UNIT" ] && [ -x "$MEM_SLOT" ]; then
    echo -e "${BLUE}메모리 자리표로 빌드 (몫 ${BUILD_MB}MB · 상자 $(( BUILD_MB * 13 / 10 ))MB) — 차례가 오면 시작합니다. 지금 상태: $MEM_SLOT status${NC}"
    exec "$MEM_SLOT" run purple-build "$BUILD_MB" -- "$SCRIPT_DIR/deploy-dev.sh" "$@"
fi

echo -e "${BLUE}Dev Frontend 배포 시작...${NC}"

# 0. 권한 문제 자동 해결 — 디렉터리 내 한 파일이라도 CURRENT_USER 가 아닌 소유면 전체 chown.
# 다중 개발자 (irene/lua) 가 번갈아 빌드할 때 chmod fail 방지.
fix_ownership() {
    local dir=$1
    local name=$2
    if [ -d "$dir" ]; then
        local mismatched=$(find "$dir" -not -user "$CURRENT_USER" -print -quit 2>/dev/null)
        if [ -n "$mismatched" ]; then
            echo -e "${YELLOW}$name 소유자 불일치 감지 - 자동 수정 중...${NC}"
            if sudo -n chown -R "$CURRENT_USER":"$CURRENT_USER" "$dir" 2>/dev/null; then
                echo -e "${GREEN}$name 권한 수정 완료${NC}"
            else
                echo -e "${RED}sudo 권한이 없습니다. 수동으로 권한을 수정하세요:${NC}"
                echo -e "  sudo chown -R $CURRENT_USER:$CURRENT_USER $dir"
                exit 1
            fi
        fi
    fi
}

fix_ownership "$CACHE_DIR" "캐시 폴더"
fix_ownership "$BUILD_DIR" "빌드 폴더"

# 0.5 Autoprint regression gate — locks in critical store invariants
# (enrichment per-path, polling stationName, frontend bucketing including the
# "station has no printer config → silent merge" trap). If this fails the
# build aborts so a broken auto-print path cannot ship to dev/store.
# Skip with SKIP_REGRESSION=1 if backend is intentionally offline.
if [ "$SKIP_REGRESSION" != "1" ]; then
    echo -e "\n${BLUE}🧪 Autoprint regression check...${NC}"
    REGRESSION_LOG=$(mktemp)
    if (cd /var/www/dev-backend && node tests/autoprint-regression.js) >"$REGRESSION_LOG" 2>&1; then
        PASS_LINE=$(grep -E "^PASS: " "$REGRESSION_LOG" | tail -1)
        echo -e "${GREEN}✓ Autoprint regression $PASS_LINE${NC}"
        rm -f "$REGRESSION_LOG"
    else
        echo -e "${RED}✗ Autoprint regression FAILED — build aborted${NC}"
        echo -e "${YELLOW}━━━ Last 40 lines of regression output ━━━${NC}"
        tail -40 "$REGRESSION_LOG"
        echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
        echo -e "${RED}코드 변경이 자동인쇄 invariant 를 깼습니다. fix 후 다시 build.${NC}"
        echo -e "${YELLOW}(긴급히 우회 필요 시: SKIP_REGRESSION=1 npm run build:dev — 사유 기록 권장)${NC}"
        rm -f "$REGRESSION_LOG"
        exit 1
    fi
else
    echo -e "${YELLOW}⚠ Autoprint regression SKIPPED (SKIP_REGRESSION=1)${NC}"
fi

# 0. 메모리 게이트 — 에뮬레이터와 겹치거나 메모리가 부족하면 빌드를 시작하지 않는다.
#    (서버 프리즈·강제 재부팅 방지. 우회: SKIP_MEMGATE=1)
if ! bash /var/www/scripts/heavy-task-gate.sh build; then
    echo -e "${RED}✗ 빌드를 시작하지 않았습니다 (메모리 게이트).${NC}"
    exit 1
fi

# 1. 이전 빌드 정리 + 빌드 실행
if [ -d "$BUILD_DIR/static" ]; then
    rm -rf "$BUILD_DIR/static"
    echo -e "${YELLOW}🗑️ 이전 빌드 파일 정리 완료${NC}"
fi
echo -e "\n${YELLOW}React 앱 빌드 중... (1~3분 소요)${NC}"
cd "$SCRIPT_DIR"

export TSC_COMPILE_ON_ERROR=true
BUILD_START=$(date +%s)

# 빌드 상자 — 위에서 자리표 안으로 들어왔으면 그 상자가 곧 빌드 상자다(다시 감싸지 않음).
#   자리표를 못 쓰는 계정(다른 개발자 등)이면 예전처럼 systemd-run 상자(5G)만 씌운다.
BUILD_RUNNER=""
BUILD_BOX_MB="?"
if [ -n "$INSIDE_SLOT_UNIT" ]; then
    BUILD_UNIT_GLOB="${INSIDE_SLOT_UNIT%.scope}"
    _max=$(cat "/sys/fs/cgroup$(cut -d: -f3 /proc/self/cgroup | head -1)/memory.max" 2>/dev/null || true)
    case "$_max" in ''|*[!0-9]*) ;; *) BUILD_BOX_MB=$(( _max / 1048576 )) ;; esac
    echo -e "${BLUE}메모리 자리표 상자 안(${INSIDE_SLOT_UNIT} · 상한 ${BUILD_BOX_MB}MB)에서 빌드합니다${NC}"
elif systemd-run --user --scope -q -p MemoryMax=10M true >/dev/null 2>&1; then
    echo -e "${YELLOW}⚠ 메모리 자리표($MEM_SLOT)를 못 씀 — 자리표 없이 상자(5G)만 씌워 빌드합니다${NC}"
    BUILD_UNIT_GLOB="purple-build-$$"
    BUILD_BOX_MB=5120
    BUILD_RUNNER="systemd-run --user --scope -q --unit=purple-build-$$ -p MemoryMax=5G -p MemorySwapMax=512M"
else
    echo -e "${YELLOW}⚠ 자리표·systemd-run 모두 사용 불가 — 상자 없이 빌드합니다${NC}"
fi

# 상자 메모리 피크 기록 (2026-10-17 Fable 조건 B) — 몫이 맞는지 숫자로 가른다. scope 는 끝나면 사라지므로
#   빌드 도는 동안 5초마다 memory.peak 를 읽어 둔다. 실패해도 빌드엔 영향 없음.
#   자리표 상자 = 이 스크립트 전체가 든 상자라 피크에 자동인쇄 회귀 검사(node)도 들어간다(작음).
PEAK_FILE="/tmp/purple-build-peak-$$"
if [ -n "${BUILD_UNIT_GLOB:-}" ]; then
    ( for _ in $(seq 1 1800); do
        f=$(ls -d /sys/fs/cgroup/user.slice/user-$(id -u).slice/user@$(id -u).service/app.slice/${BUILD_UNIT_GLOB}.scope 2>/dev/null | head -1)
        [ -n "$f" ] && [ -r "$f/memory.peak" ] && cat "$f/memory.peak" > "$PEAK_FILE" 2>/dev/null
        sleep 5
      done ) &
    PEAK_PID=$!
fi
report_peak() {
    [ -n "${PEAK_PID:-}" ] && kill "$PEAK_PID" 2>/dev/null
    if [ -s "$PEAK_FILE" ]; then echo -e "  빌드 상자 메모리 피크: $(( $(cat "$PEAK_FILE") / 1048576 ))MB (상한 ${BUILD_BOX_MB}MB)"; rm -f "$PEAK_FILE"; fi
    return 0  # 피크를 못 읽었어도(set -e) 빌드 성공을 실패로 끝내지 않는다
}

# 빌드 실행 — 진행 상황을 실시간 출력
# set -e 가 실패한 파이프에서 바로 끝내면 아래 «✗ 빌드 실패»·피크·자리표 안내가 안 찍힌다(10-17 부수 결함) → 종료 코드를 받아 둔다.
#   pipefail 이라 $? = 오른쪽에서 처음 0 아닌 코드 = 빌드(자리표) 쪽 코드(아래 while 은 늘 0).
set -o pipefail
BUILD_STATUS=0
$BUILD_RUNNER npm run build 2>&1 | while IFS= read -r line; do
    # 핵심 진행 메시지만 출력 (Creating, Compiled, error)
    if echo "$line" | grep -qiE "Creating|Compiled|error|warning|Failed"; then
        echo -e "  ${line}"
    fi
done || BUILD_STATUS=$?
set +o pipefail
report_peak

if [ "$BUILD_STATUS" -ne 0 ]; then
    echo -e "${RED}✗ 빌드 실패 (exit ${BUILD_STATUS})${NC}"
    if [ "$BUILD_STATUS" -eq 137 ] || [ "$BUILD_STATUS" -eq 134 ]; then
        echo -e "${RED}  빌드 상자 메모리 한도(${BUILD_BOX_MB:-?}MB)에 걸려 빌드만 죽었습니다(서버는 그대로).${NC}"
        echo -e "${RED}  위 «빌드 상자 메모리 피크» 를 보고 이 파일의 BUILD_MB(몫)를 피크+15% 로 고치거나,${NC}"
        echo -e "${RED}  package.json 힙 상한(현재 2560MB)을 조정하세요.${NC}"
    fi
    exit 1
fi

BUILD_END=$(date +%s)
BUILD_TIME=$((BUILD_END - BUILD_START))

# 2. 빌드 확인
if [ ! -f "$BUILD_DIR/index.html" ]; then
    echo -e "${RED}✗ 빌드 실패: index.html을 찾을 수 없습니다${NC}"
    exit 1
fi

# 3. 빌드 파일 정보 출력
echo -e "\n${GREEN}✓ 빌드 완료! (${BUILD_TIME}초)${NC}"
echo -e "${BLUE}📁 빌드된 파일:${NC}"
ls -lh "$BUILD_DIR/index.html" | awk '{print "   index.html (" $5 ")"}'
if [ -d "$BUILD_DIR/static/js" ]; then
    MAIN_JS=$(ls "$BUILD_DIR/static/js/main."*.js 2>/dev/null | head -1)
    if [ -n "$MAIN_JS" ]; then
        ls -lh "$MAIN_JS" | awk '{print "   " $9 " (" $5 ")"}'
    fi
fi

# 4. 파일 권한 설정 + nginx 배포
echo -e "\n${YELLOW}🔐 파일 권한 설정 중...${NC}"
chmod -R 755 "$BUILD_DIR"
find "$BUILD_DIR" -type f -exec chmod 644 {} \;

echo -e "\n${YELLOW}🗑️ 이전 빌드 파일 정리 중...${NC}"
# 2026-07-23: DEPLOY_DIR(dev-frontend-build)은 irene 소유 + lua ACL → sudo 불필요.
# nginx(www-data)는 other 읽기(755/644)만 필요하므로 소유자가 irene 이어도 서빙 정상.
# (근거·설계 = Fable 게이트. root 소유를 고집할 보안 이익 0 이었다.)
rm -rf "$DEPLOY_DIR/static"

echo -e "\n${YELLOW}📦 nginx 배포 폴더로 복사 중...${NC}"
if cp -r "$BUILD_DIR"/* "$DEPLOY_DIR"/; then
    echo -e "${GREEN}✓ $DEPLOY_DIR 로 복사 완료${NC}"
else
    echo -e "${RED}✗ 배포 폴더 복사 실패${NC}"
    exit 1
fi

# 2026-10-30: 인증서 자동 갱신(certbot webroot)은 확인 파일을 $BUILD_DIR/.well-known 에 쓰는데
# nginx 는 $DEPLOY_DIR/.well-known 에서 찾는다 → 5월부터 갱신 실패·인증서 만료. 둘을 잇는다(빌드가 지워도 다시 만듦).
mkdir -p "$BUILD_DIR/.well-known/acme-challenge" "$DEPLOY_DIR/.well-known"
ln -sfn "$BUILD_DIR/.well-known/acme-challenge" "$DEPLOY_DIR/.well-known/acme-challenge"

echo -e "\n${GREEN}✓ 배포 완료!${NC}"
echo -e "${BLUE}📂 빌드 위치: $BUILD_DIR${NC}"
echo -e "${BLUE}📂 배포 위치: $DEPLOY_DIR${NC}"
echo -e "${BLUE}🌐 웹사이트: https://dev.purplehere.com${NC}"
echo -e "${YELLOW}💡 브라우저에서 강력 새로고침 (Ctrl+Shift+R)을 사용하세요.${NC}"
