#!/usr/bin/env python3
"""theme 참조 문제 검출: theme as t 로 import했는데 ${theme.} 으로 쓰는 파일"""
import os, re

issues = []

for root, dirs, files in os.walk('src'):
    dirs[:] = [d for d in dirs if d not in ['node_modules', '.git', 'build']]
    for fname in files:
        if not (fname.endswith('.tsx') or fname.endswith('.ts')):
            continue
        fpath = os.path.join(root, fname)
        if 'src/styles/theme' in fpath:
            continue

        with open(fpath, 'r') as f:
            content = f.read()

        # ${theme. 패턴을 사용하는지
        uses_theme_dot = '${theme.' in content
        # import에서 theme as t 인지
        has_theme_as_t = bool(re.search(r'import\s*\{[^}]*theme\s+as\s+t[^}]*\}', content))
        # import에서 theme을 직접 import하는지 (as 없이)
        has_theme_direct = bool(re.search(r"import\s*\{[^}]*\btheme\b(?!\s+as)[^}]*\}\s*from\s*['\"].*theme['\"]", content))

        if uses_theme_dot and has_theme_as_t and not has_theme_direct:
            count = content.count('${theme.')
            issues.append((fpath, count))

if issues:
    print(f"=== {len(issues)} files use ${{theme.}} but imported as 'theme as t' ===")
    for fpath, count in sorted(issues):
        print(f"  {fpath}: {count} occurrences")
else:
    print("No issues found.")
