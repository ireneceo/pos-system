#!/bin/bash

echo "🔧 Fixing localStorage removal..."

# 백업에서 복원 후 올바르게 제거
find /workspaces/pos-system/frontend/src -name "*.bak" | while IFS= read -r bakfile; do
  origfile="${bakfile%.bak}"
  echo "Fixing: $origfile"

  # 원본으로 복원
  cp "$bakfile" "$origfile"

  # localStorage.getItem(...) → null
  sed -i 's/localStorage\.getItem([^)]*)/null/g' "$origfile"

  # localStorage.setItem(...) 라인 제거
  sed -i '/localStorage\.setItem/d' "$origfile"

  # localStorage.removeItem(...) 라인 제거
  sed -i '/localStorage\.removeItem/d' "$origfile"

  # localStorage.clear() 라인 제거
  sed -i '/localStorage\.clear/d' "$origfile"

  echo "  ✅ Fixed"
done

echo ""
echo "✅ localStorage completely removed!"
