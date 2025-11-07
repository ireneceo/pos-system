#!/bin/bash

echo "🗑️  Removing localStorage usage from Context files..."

# Context 파일들에서 localStorage 관련 코드 제거
CONTEXT_FILES=(
  "/workspaces/pos-system/frontend/src/contexts/OrderContext.tsx"
  "/workspaces/pos-system/frontend/src/contexts/CustomerContext.tsx"
  "/workspaces/pos-system/frontend/src/contexts/StaffContext.tsx"
)

for file in "${CONTEXT_FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "Processing: $file"

    # Backup
    cp "$file" "${file}.bak"

    # localStorage.getItem, setItem, removeItem 호출을 주석 처리
    sed -i 's/localStorage\.getItem(/\/\/ localStorage.getItem(/g' "$file"
    sed -i 's/localStorage\.setItem(/\/\/ localStorage.setItem(/g' "$file"
    sed -i 's/localStorage\.removeItem(/\/\/ localStorage.removeItem(/g' "$file"

    echo "✅ Processed: $file"
  else
    echo "❌ File not found: $file"
  fi
done

echo ""
echo "✅ localStorage removal complete!"
echo "Backup files created with .bak extension"
