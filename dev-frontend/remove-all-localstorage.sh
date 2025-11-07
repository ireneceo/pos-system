#!/bin/bash

echo "🗑️  Removing ALL localStorage usage from frontend..."

# 모든 TypeScript/TSX 파일에서 localStorage 사용 주석 처리
find /workspaces/pos-system/frontend/src -name "*.tsx" -o -name "*.ts" | while IFS= read -r file; do
  # node_modules와 backup 파일 제외
  if [[ "$file" != *"node_modules"* ]] && [[ "$file" != *".bak"* ]]; then
    # localStorage 사용 확인
    if grep -q "localStorage\." "$file"; then
      echo "Processing: $file"

      # Backup
      cp "$file" "${file}.bak"

      # localStorage 호출 주석 처리
      sed -i 's/localStorage\.getItem(/\/\/ localStorage.getItem(/g' "$file"
      sed -i 's/localStorage\.setItem(/\/\/ localStorage.setItem(/g' "$file"
      sed -i 's/localStorage\.removeItem(/\/\/ localStorage.removeItem(/g' "$file"
      sed -i 's/localStorage\.clear(/\/\/ localStorage.clear(/g' "$file"

      echo "  ✅ Processed"
    fi
  fi
done

echo ""
echo "✅ All localStorage usage has been commented out!"
echo "📦 Backup files created with .bak extension"
echo ""
echo "🔍 Summary:"
find /workspaces/pos-system/frontend/src -name "*.bak" | wc -l
echo " files processed"
