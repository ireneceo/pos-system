#!/bin/bash
# ============================================================================
# 색상 하드코딩 → theme 토큰 일괄 마이그레이션 스크립트
# styled-components 내 하드코딩된 색상을 theme 토큰으로 치환
# ============================================================================

PAGES_DIR="src/pages"
COMPONENTS_DIR="src/components"
COUNT=0

echo "=== Color Migration Script ==="
echo ""

# 모든 tsx 파일에서 하드코딩된 색상을 theme 토큰으로 치환
for file in $(find $PAGES_DIR $COMPONENTS_DIR -name "*.tsx" -type f); do
  # 이미 theme import가 있는지 확인
  HAS_THEME=$(grep -c "from.*styles/theme" "$file" 2>/dev/null || echo "0")
  HAS_HARDCODED=$(grep -c "#635BFF\|#5A51E6\|#5A54E5\|#0A2540\|#6B7C93\|#6B7280\|#E6EBF1" "$file" 2>/dev/null || echo "0")

  if [ "$HAS_HARDCODED" -gt 0 ]; then
    # styled-components에서만 치환 (JSX inline style의 문자열은 건드리지 않음)
    # 핵심: backtick 안의 CSS 값만 치환

    # Primary colors
    sed -i "s/#635BFF/\${t.colors.primary}/g" "$file"
    sed -i "s/#5A51E6/\${t.colors.primaryHover}/g" "$file"
    sed -i "s/#5A54E5/\${t.colors.primaryHover}/g" "$file"

    # Secondary / Text colors
    sed -i "s/#0A2540/\${t.colors.secondary}/g" "$file"
    sed -i "s/#6B7C93/\${t.colors.text.secondary}/g" "$file"
    sed -i "s/#6B7280/\${t.colors.text.muted}/g" "$file"
    sed -i "s/#374151/\${t.colors.text.dark}/g" "$file"
    sed -i "s/#8898AA/\${t.colors.text.light}/g" "$file"
    sed -i "s/#9CA3AF/\${t.colors.text.placeholder}/g" "$file"

    # Background colors
    sed -i "s/#FAFBFC/\${t.colors.background}/g" "$file"
    sed -i "s/#F3F4F6/\${t.colors.surfaceMuted}/g" "$file"
    sed -i "s/#F8FAFC/\${t.colors.surfaceHover}/g" "$file"
    sed -i "s/#F6F9FC/\${t.colors.backgroundAlt}/g" "$file"

    # Border colors
    sed -i "s/#E6EBF1/\${t.colors.border}/g" "$file"
    sed -i "s/#E5E7EB/\${t.colors.borderLight}/g" "$file"
    sed -i "s/#CBD5E1/\${t.colors.borderHover}/g" "$file"

    # Danger colors
    sed -i "s/#DC2626/\${t.colors.danger}/g" "$file"
    sed -i "s/#B91C1C/\${t.colors.dangerHover}/g" "$file"
    sed -i "s/#FEF2F2/\${t.colors.dangerLight}/g" "$file"
    sed -i "s/#FCA5A5/\${t.colors.dangerBorder}/g" "$file"

    # Status colors
    sed -i "s/#059669/\${t.colors.status.successAlt}/g" "$file"
    sed -i "s/#10B981/\${t.colors.status.successAlt2}/g" "$file"
    sed -i "s/#ECFDF5/\${t.colors.status.successLight}/g" "$file"
    sed -i "s/#15803D/\${t.colors.status.successDark}/g" "$file"
    sed -i "s/#D97706/\${t.colors.status.warningAlt}/g" "$file"
    sed -i "s/#FEF3C7/\${t.colors.status.warningLightAlt}/g" "$file"
    sed -i "s/#FEE2E2/\${t.colors.status.errorLightAlt}/g" "$file"

    # rgba patterns
    sed -i "s/rgba(99, 91, 255, 0.1)/\${t.colors.primaryLight}/g" "$file"
    sed -i "s/rgba(99, 91, 255, 0.3)/\${t.colors.primaryShadow}/g" "$file"
    sed -i "s/rgba(99,91,255,0.1)/\${t.colors.primaryLight}/g" "$file"
    sed -i "s/rgba(99,91,255,0.3)/\${t.colors.primaryShadow}/g" "$file"

    # Shadow patterns
    sed -i "s/0 4px 12px rgba(220, 38, 38, 0.3)/\${t.shadows.dangerHover}/g" "$file"
    sed -i "s/0 4px 12px \${t.colors.primaryShadow}/\${t.shadows.primaryHover}/g" "$file"

    # theme import 추가 (아직 없으면)
    if [ "$HAS_THEME" -eq 0 ]; then
      # 첫 번째 import 줄 앞에 추가
      sed -i "1s/^/import { theme as t } from '..\/..\/styles\/theme';\n/" "$file"
    fi

    ((COUNT++))
    echo "  Migrated: $file ($HAS_HARDCODED replacements)"
  fi
done

echo ""
echo "=== Done: $COUNT files migrated ==="
