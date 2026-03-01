#!/usr/bin/env python3
"""
자체 정의 styled-components → 공유 UI 컴포넌트 마이그레이션 스크립트

각 페이지에서 중복 정의된 Modal, Form, Button 등을 삭제하고
공유 컴포넌트 import로 교체합니다.
"""

import os
import re
import sys

# 공유 컴포넌트에서 import할 수 있는 이름 매핑
# key: 로컬 정의 이름, value: 공유 import 이름
REPLACEABLE_COMPONENTS = {
    # Modal 관련
    'ModalOverlay': 'ModalOverlay',
    'ModalContent': 'ModalContent',
    'ModalHeader': 'ModalHeader',
    'ModalTitle': 'ModalTitle',
    'ModalBody': 'ModalBody',
    'ModalFooter': 'ModalFooter',
    'CloseButton': 'CloseButton',
    'ModalWarning': 'ModalWarning',
    # Form 관련
    'FormRow': 'FormRow',
    'FormGroup': 'FormGroup',
    'FormLabel': 'FormLabel',
    'FormInput': 'FormInput',
    'FormSelect': 'FormSelect',
    'FormTextArea': 'FormTextArea',
    'FormTextarea': 'FormTextArea',  # 이름 변형
    'FormError': 'FormError',
    'FormHelperText': 'FormHelperText',
}

# Modal과 ModalActions는 이름이 다른 공유 컴포넌트로 매핑
RENAME_COMPONENTS = {
    'Modal': 'ModalOverlay',       # 로컬 Modal은 보통 overlay 역할
    'ModalActions': 'ModalFooter',  # 로컬 ModalActions → ModalFooter
}

def find_styled_component_block(lines, start_idx):
    """styled-component 정의 블록의 끝 라인을 찾음 (backtick 끝)"""
    # 시작 라인에서 backtick 열기를 확인
    line = lines[start_idx]
    backtick_count = line.count('`')

    if backtick_count >= 2:
        # 한 줄에 열고 닫기
        return start_idx

    # backtick이 1개면 (열기), 닫기를 찾아야 함
    for i in range(start_idx + 1, len(lines)):
        if '`;' in lines[i] or (lines[i].strip() == '`' or lines[i].strip().endswith('`')):
            backtick_count += lines[i].count('`')
            if backtick_count >= 2:
                return i

    return start_idx  # 못 찾으면 한 줄만


def remove_component_definitions(content, components_to_remove):
    """파일 내용에서 지정된 styled-component 정의를 제거"""
    lines = content.split('\n')
    lines_to_remove = set()

    for comp_name in components_to_remove:
        for i, line in enumerate(lines):
            # const CompName = styled.xxx` 패턴
            pattern = rf'(export\s+)?const\s+{re.escape(comp_name)}\s*=\s*styled\.'
            if re.search(pattern, line):
                end_idx = find_styled_component_block(lines, i)
                for j in range(i, end_idx + 1):
                    lines_to_remove.add(j)
                # 다음 빈 줄도 제거
                if end_idx + 1 < len(lines) and lines[end_idx + 1].strip() == '':
                    lines_to_remove.add(end_idx + 1)
                break

    new_lines = [l for i, l in enumerate(lines) if i not in lines_to_remove]
    return '\n'.join(new_lines)


def get_existing_ui_imports(content):
    """현재 파일의 ../../components/UI import 목록을 반환"""
    imports = set()
    # 여러 줄 import 패턴
    pattern = r"import\s*\{([^}]+)\}\s*from\s*['\"].*components/UI['\"]"
    for match in re.finditer(pattern, content, re.DOTALL):
        for item in match.group(1).split(','):
            name = item.strip().split(' as ')[0].strip()
            if name:
                imports.add(name)

    # 단일 줄 Modal import
    pattern2 = r"import\s*\{([^}]+)\}\s*from\s*['\"].*components/UI/Modal['\"]"
    for match in re.finditer(pattern2, content, re.DOTALL):
        for item in match.group(1).split(','):
            name = item.strip().split(' as ')[0].strip()
            if name:
                imports.add(name)

    return imports


def add_ui_imports(content, new_imports, file_path):
    """필요한 공유 컴포넌트를 import에 추가"""
    existing = get_existing_ui_imports(content)
    to_add = set(new_imports) - existing

    if not to_add:
        return content

    # 기존 UI import 라인을 찾아서 확장
    lines = content.split('\n')

    # components/UI import 찾기
    ui_import_start = -1
    ui_import_end = -1
    for i, line in enumerate(lines):
        if "components/UI'" in line or 'components/UI"' in line or "components/UI/Modal" in line:
            if 'import' in line:
                ui_import_start = i
                # 멀티라인 import의 끝 찾기
                if '}' in line:
                    ui_import_end = i
                else:
                    for j in range(i + 1, min(i + 20, len(lines))):
                        if '}' in lines[j]:
                            ui_import_end = j
                            break
                break

    if ui_import_start >= 0 and ui_import_end >= 0:
        # 기존 import 블록에 새 이름 추가
        import_block = '\n'.join(lines[ui_import_start:ui_import_end + 1])

        # } from 앞에 새 import 추가
        for name in sorted(to_add):
            if name not in import_block:
                import_block = import_block.replace('}', f'  {name},\n}}', 1)

        new_lines = lines[:ui_import_start] + [import_block] + lines[ui_import_end + 1:]
        return '\n'.join(new_lines)
    else:
        # UI import가 없으면 새로 추가
        imports_str = ', '.join(sorted(to_add))

        # 상대경로 계산
        dir_path = os.path.dirname(file_path)
        rel = os.path.relpath('src/styles', dir_path).replace('styles', '')
        # components/UI 경로
        ui_rel = os.path.relpath('src/components/UI', dir_path)

        import_line = f"import {{ {imports_str} }} from '{ui_rel}';"

        # 첫 번째 import 뒤에 추가
        for i, line in enumerate(lines):
            if line.startswith('import ') and 'from' in line:
                # import 블록의 마지막을 찾기
                last_import = i
                for j in range(i, len(lines)):
                    if lines[j].startswith('import ') and 'from' in lines[j]:
                        last_import = j
                    elif lines[j].strip() and not lines[j].startswith('import'):
                        break
                lines.insert(last_import + 1, import_line)
                return '\n'.join(lines)

    return content


def process_file(file_path):
    """단일 파일 처리"""
    with open(file_path, 'r') as f:
        content = f.read()

    original = content
    components_removed = []
    imports_needed = []

    # 1. 교체 가능한 컴포넌트 찾기
    for local_name, shared_name in REPLACEABLE_COMPONENTS.items():
        pattern = rf'(export\s+)?const\s+{re.escape(local_name)}\s*=\s*styled\.'
        if re.search(pattern, content):
            components_removed.append(local_name)
            imports_needed.append(shared_name)

    # 2. 이름 변경이 필요한 컴포넌트
    renames_applied = {}
    for local_name, shared_name in RENAME_COMPONENTS.items():
        pattern = rf'(export\s+)?const\s+{re.escape(local_name)}\s*=\s*styled\.'
        if re.search(pattern, content):
            # 'Modal'이 overlay 역할인지 확인 (position: fixed 포함)
            match = re.search(pattern, content)
            if match:
                start = match.start()
                # 이 컴포넌트 블록의 끝까지 찾기
                block_end = content.find('`;', start)
                if block_end > 0:
                    block = content[start:block_end]
                    if 'position: fixed' in block or 'position:fixed' in block:
                        components_removed.append(local_name)
                        imports_needed.append(shared_name)
                        renames_applied[local_name] = shared_name

    if not components_removed:
        return 0

    # 3. 정의 제거
    content = remove_component_definitions(content, components_removed)

    # 4. JSX에서 이름 변경 적용
    for old_name, new_name in renames_applied.items():
        content = content.replace(f'<{old_name}>', f'<{new_name}>')
        content = content.replace(f'<{old_name} ', f'<{new_name} ')
        content = content.replace(f'</{old_name}>', f'</{new_name}>')

    # FormTextarea → FormTextArea 이름 통일
    if 'FormTextarea' in components_removed:
        content = content.replace('<FormTextarea', '<FormTextArea')
        content = content.replace('</FormTextarea>', '</FormTextArea>')

    # ModalActions → ModalFooter 이름 통일
    if 'ModalActions' in [c for c in components_removed]:
        pass  # 이미 renames_applied에서 처리
    elif re.search(r'(export\s+)?const\s+ModalActions\s*=\s*styled\.', original):
        content = content.replace('<ModalActions>', '<ModalFooter>')
        content = content.replace('<ModalActions ', '<ModalFooter ')
        content = content.replace('</ModalActions>', '</ModalFooter>')
        # ModalActions 정의도 제거
        content = remove_component_definitions(content, ['ModalActions'])
        imports_needed.append('ModalFooter')

    # 5. 공유 import 추가
    imports_needed = list(set(imports_needed))
    content = add_ui_imports(content, imports_needed, file_path)

    if content != original:
        with open(file_path, 'w') as f:
            f.write(content)
        return len(components_removed)

    return 0


def main():
    total_files = 0
    total_components = 0

    for root, dirs, files in os.walk('src/pages'):
        for fname in files:
            if not fname.endswith('.tsx'):
                continue
            fpath = os.path.join(root, fname)
            count = process_file(fpath)
            if count > 0:
                total_files += 1
                total_components += count
                print(f"  {fpath}: {count} components replaced")

    # components/ 디렉토리도 처리
    for root, dirs, files in os.walk('src/components'):
        for fname in files:
            if not fname.endswith('.tsx'):
                continue
            fpath = os.path.join(root, fname)
            # UI/ 디렉토리 자체는 건너뜀
            if '/UI/' in fpath:
                continue
            count = process_file(fpath)
            if count > 0:
                total_files += 1
                total_components += count
                print(f"  {fpath}: {count} components replaced")

    print(f"\n=== Done: {total_files} files, {total_components} components replaced ===")


if __name__ == '__main__':
    main()
