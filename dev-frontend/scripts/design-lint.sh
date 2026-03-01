#!/bin/bash
# ============================================================================
# Design Lint — 하드코딩된 디자인 값 감지
# 빌드 전 실행: npm run lint:design
# theme.ts의 토큰 대신 직접 색상값을 사용하면 경고/에러
# ============================================================================

RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color
BOLD='\033[1m'

PAGES_DIR="src/pages"
ERRORS=0
WARNINGS=0

echo ""
echo "${BOLD}=== Design Lint ===${NC}"
echo "Checking for hardcoded design values in ${PAGES_DIR}/..."
echo ""

# -------------------------------------------------------------------
# 1. 하드코딩된 Primary 색상 (#635BFF) in styled-components
# -------------------------------------------------------------------
echo "${BOLD}[1/4] Checking hardcoded primary color (#635BFF)...${NC}"

# 새로 추가된 파일에서만 감지 (기존 파일은 Phase 2 마이그레이션에서 처리)
# git diff로 새로 생성되거나 수정된 파일 확인
CHANGED_FILES=$(git diff --name-only HEAD 2>/dev/null | grep -E "^dev-frontend/src/pages/.*\.tsx$" || true)

if [ -n "$CHANGED_FILES" ]; then
  for file in $CHANGED_FILES; do
    # styled.button 직접 정의 감지
    STYLED_BUTTONS=$(grep -n "styled\.button" "$file" 2>/dev/null | head -5)
    if [ -n "$STYLED_BUTTONS" ]; then
      echo "${YELLOW}  WARNING: $file${NC}"
      echo "    styled.button 직접 정의 → import { Button } from '../../components/UI' 사용"
      echo "$STYLED_BUTTONS" | while read line; do
        echo "    $line"
      done
      ((WARNINGS++))
    fi

    # #635BFF 하드코딩 감지
    HARDCODED=$(grep -n "#635BFF\|#5A51E6\|#5A54E5" "$file" 2>/dev/null | head -5)
    if [ -n "$HARDCODED" ]; then
      echo "${YELLOW}  WARNING: $file${NC}"
      echo "    하드코딩된 색상 → import { theme } from '../../styles/theme' 사용"
      echo "$HARDCODED" | while read line; do
        echo "    $line"
      done
      ((WARNINGS++))
    fi
  done
fi

# -------------------------------------------------------------------
# 2. 전체 프로젝트 통계 (정보 제공용)
# -------------------------------------------------------------------
echo ""
echo "${BOLD}[2/4] Project-wide statistics...${NC}"

TOTAL_HARDCODED=$(grep -rl "#635BFF" $PAGES_DIR --include="*.tsx" 2>/dev/null | wc -l)
TOTAL_STYLED_BTN=$(grep -rl "styled\.button" $PAGES_DIR --include="*.tsx" 2>/dev/null | wc -l)
TOTAL_PAGES=$(find $PAGES_DIR -name "*.tsx" 2>/dev/null | wc -l)
USING_THEME=$(grep -rl "from.*styles/theme\|from.*components/UI" $PAGES_DIR --include="*.tsx" 2>/dev/null | sort -u | wc -l)

echo "  Pages total:          $TOTAL_PAGES"
echo "  Using theme/UI:       $USING_THEME"
echo "  Hardcoded #635BFF:    ${YELLOW}${TOTAL_HARDCODED}${NC}"
echo "  Custom styled.button: ${YELLOW}${TOTAL_STYLED_BTN}${NC}"

# -------------------------------------------------------------------
# 3. 마이그레이션 진행률
# -------------------------------------------------------------------
echo ""
echo "${BOLD}[3/4] Migration progress...${NC}"

if [ "$TOTAL_PAGES" -gt 0 ]; then
  MIGRATED=$((TOTAL_PAGES - TOTAL_HARDCODED))
  PCT=$((MIGRATED * 100 / TOTAL_PAGES))
  echo "  ${GREEN}${MIGRATED}/${TOTAL_PAGES} pages migrated (${PCT}%)${NC}"

  # Progress bar
  FILLED=$((PCT / 5))
  EMPTY=$((20 - FILLED))
  BAR=$(printf "%${FILLED}s" | tr ' ' '█')
  SPACE=$(printf "%${EMPTY}s" | tr ' ' '░')
  echo "  [${GREEN}${BAR}${NC}${SPACE}] ${PCT}%"
fi

# -------------------------------------------------------------------
# 4. 결과
# -------------------------------------------------------------------
echo ""
echo "${BOLD}[4/4] Result${NC}"

if [ "$ERRORS" -gt 0 ]; then
  echo "${RED}  ✕ ${ERRORS} error(s) found — fix before committing${NC}"
  exit 1
elif [ "$WARNINGS" -gt 0 ]; then
  echo "${YELLOW}  ⚠ ${WARNINGS} warning(s) — consider using shared components${NC}"
  exit 0
else
  echo "${GREEN}  ✓ No new hardcoded values detected${NC}"
  exit 0
fi
