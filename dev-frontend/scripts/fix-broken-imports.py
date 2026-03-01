#!/usr/bin/env python3
"""
깨진 import 구문을 수정하는 스크립트

migrate-components.py가 } 앞에 새 import를 추가할 때 쉼표/줄바꿈이 누락된 케이스를 수정.
예: `import { Tab   FormGroup,` → `import { Tab, FormGroup, }`  등
"""

import os
import re

def fix_broken_imports(content):
    """깨진 import 구문을 수정"""
    lines = content.split('\n')
    fixed_lines = []
    i = 0

    while i < len(lines):
        line = lines[i]

        # 패턴: import { ... Name   NewName, (두 칸 이상 공백으로 이어진 이름)
        if 'import' in line and '{' in line and re.search(r'[A-Za-z]\s{2,}[A-Z]', line):
            # 이 import 블록 전체를 수집
            import_block = [line]
            # } 를 찾을 때까지 다음 라인 수집
            if '}' not in line:
                j = i + 1
                while j < len(lines) and '}' not in lines[j]:
                    import_block.append(lines[j])
                    j += 1
                if j < len(lines):
                    import_block.append(lines[j])
                i = j + 1
            else:
                i += 1

            # 전체 import 블록을 하나의 문자열로
            full_import = '\n'.join(import_block)

            # from 경로 추출
            from_match = re.search(r"from\s*['\"]([^'\"]+)['\"]", full_import)
            if not from_match:
                fixed_lines.extend(import_block)
                continue

            from_path = from_match.group(1)

            # { ... } 사이의 이름들 추출
            names_match = re.search(r'\{([^}]+)\}', full_import, re.DOTALL)
            if not names_match:
                fixed_lines.extend(import_block)
                continue

            raw_names = names_match.group(1)
            # 쉼표와 공백으로 분리, 빈 문자열 제거
            names = []
            for part in re.split(r'[,\n]', raw_names):
                part = part.strip()
                if part:
                    # "Name as Alias" 형태 유지
                    # 추가 공백으로 이어진 두 이름 분리: "Tab   FormGroup" → "Tab", "FormGroup"
                    sub_parts = re.split(r'\s{2,}', part)
                    for sp in sub_parts:
                        sp = sp.strip()
                        if sp:
                            names.append(sp)

            # 중복 제거 (순서 유지)
            seen = set()
            unique_names = []
            for n in names:
                key = n.split(' as ')[0].strip()
                if key not in seen:
                    seen.add(key)
                    unique_names.append(n)

            # import 재구성
            if len(unique_names) <= 3:
                fixed_import = f"import {{ {', '.join(unique_names)} }} from '{from_path}';"
                fixed_lines.append(fixed_import)
            else:
                fixed_lines.append(f"import {{")
                for idx, name in enumerate(unique_names):
                    comma = ',' if idx < len(unique_names) - 1 else ''
                    fixed_lines.append(f"  {name}{comma}")
                fixed_lines.append(f"}} from '{from_path}';")
        else:
            fixed_lines.append(line)
            i += 1

    return '\n'.join(fixed_lines)


def process_file(file_path):
    """파일의 깨진 import를 수정"""
    with open(file_path, 'r') as f:
        content = f.read()

    # 깨진 import가 있는지 빠르게 확인
    if not re.search(r'import.*\{.*[A-Za-z]\s{2,}[A-Z]', content):
        return False

    fixed = fix_broken_imports(content)

    if fixed != content:
        with open(file_path, 'w') as f:
            f.write(fixed)
        return True
    return False


def main():
    fixed_count = 0

    for root, dirs, files in os.walk('src'):
        # node_modules 등 제외
        dirs[:] = [d for d in dirs if d not in ['node_modules', '.git', 'build']]

        for fname in files:
            if not fname.endswith('.tsx') and not fname.endswith('.ts'):
                continue
            fpath = os.path.join(root, fname)
            if process_file(fpath):
                fixed_count += 1
                print(f"  Fixed: {fpath}")

    print(f"\n=== Done: {fixed_count} files fixed ===")


if __name__ == '__main__':
    main()
