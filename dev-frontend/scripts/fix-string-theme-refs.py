#!/usr/bin/env python3
"""
일반 문자열('...' 또는 "...") 안에 잘못 들어간 ${t.xxx} / ${theme.xxx} 참조를
실제 색상값으로 되돌리는 스크립트.

styled-component 백틱(`) 안에서는 ${t.colors.primary} 가 정상 동작하지만,
JS 객체 리터럴이나 JSX inline style의 일반 문자열에서는 동작하지 않는다.
"""

import os
import re

# theme.ts 값 매핑 (t.xxx → 실제 값)
THEME_MAP = {
    # colors
    't.colors.primary': '#635BFF',
    't.colors.primaryHover': '#5A51E6',
    't.colors.primaryLight': 'rgba(99, 91, 255, 0.1)',
    't.colors.primaryShadow': 'rgba(99, 91, 255, 0.3)',
    't.colors.secondary': '#0A2540',
    't.colors.secondaryLight': '#F8FAFC',
    't.colors.background': '#FAFBFC',
    't.colors.backgroundAlt': '#F6F9FC',
    't.colors.surface': '#FFFFFF',
    't.colors.surfaceHover': '#F8FAFC',
    't.colors.surfaceMuted': '#F3F4F6',
    't.colors.text.primary': '#0A2540',
    't.colors.text.secondary': '#6B7C93',
    't.colors.text.light': '#8898AA',
    't.colors.text.muted': '#6B7280',
    't.colors.text.dark': '#374151',
    't.colors.text.placeholder': '#9CA3AF',
    't.colors.status.success': '#28C76F',
    't.colors.status.successAlt': '#059669',
    't.colors.status.successAlt2': '#10B981',
    't.colors.status.successLight': '#ECFDF5',
    't.colors.status.successDark': '#15803D',
    't.colors.status.warning': '#FF9F43',
    't.colors.status.warningAlt': '#D97706',
    't.colors.status.warningLight': '#FFF7ED',
    't.colors.status.warningLightAlt': '#FEF3C7',
    't.colors.status.error': '#EA5455',
    't.colors.status.errorLight': '#FEF2F2',
    't.colors.status.errorLightAlt': '#FEE2E2',
    't.colors.status.info': '#00CFE8',
    't.colors.danger': '#DC2626',
    't.colors.dangerHover': '#B91C1C',
    't.colors.dangerLight': '#FEF2F2',
    't.colors.dangerBorder': '#FCA5A5',
    't.colors.dangerShadow': 'rgba(220, 38, 38, 0.3)',
    't.colors.border': '#E6EBF1',
    't.colors.borderLight': '#E5E7EB',
    't.colors.borderHover': '#CBD5E1',
    't.colors.disabled.background': '#F3F4F6',
    't.colors.disabled.text': '#D1D5DB',
    't.colors.disabled.primaryBg': '#A5A0FF',
    't.colors.disabled.dangerBg': '#FCA5A5',
    # typography
    't.typography.fontSize.xs': '12px',
    't.typography.fontSize.sm': '14px',
    't.typography.fontSize.base': '16px',
    't.typography.fontSize.lg': '18px',
    't.typography.fontSize.xl': '20px',
    't.typography.fontWeight.regular': '400',
    't.typography.fontWeight.medium': '500',
    't.typography.fontWeight.semibold': '600',
    't.typography.fontWeight.bold': '700',
    # spacing
    't.spacing.xs': '4px',
    't.spacing.sm': '8px',
    't.spacing.md': '16px',
    't.spacing.lg': '24px',
    't.spacing.xl': '32px',
    # borderRadius
    't.borderRadius.sm': '4px',
    't.borderRadius.md': '8px',
    't.borderRadius.lg': '12px',
    't.borderRadius.xl': '16px',
    't.borderRadius.full': '9999px',
    # shadows
    't.shadows.primaryHover': '0 4px 12px rgba(99, 91, 255, 0.3)',
    't.shadows.dangerHover': '0 4px 12px rgba(220, 38, 38, 0.3)',
    # transitions
    't.transitions.fast': '150ms ease-in-out',
    't.transitions.normal': '300ms ease-in-out',
    # breakpoints
    't.breakpoints.sm': '640px',
    't.breakpoints.md': '768px',
    't.breakpoints.lg': '1024px',
    't.breakpoints.xl': '1280px',
    # components
    't.components.modal.overlayBg': 'rgba(0, 0, 0, 0.5)',
    't.components.modal.widthSm': '400px',
    't.components.modal.widthMd': '600px',
    't.components.modal.widthLg': '800px',
    't.components.form.focusShadow': '0 0 0 3px rgba(99, 91, 255, 0.1)',
    't.components.form.inputPadding': '10px 12px',
    't.components.form.labelSize': '13px',
}

# theme.xxx 도 같은 매핑 추가
THEME_MAP_FULL = {}
for k, v in THEME_MAP.items():
    THEME_MAP_FULL[k] = v
    THEME_MAP_FULL[k.replace('t.', 'theme.', 1)] = v


def fix_string_refs(content):
    """일반 문자열('...' 또는 "...") 안의 ${t.xxx} 를 실제 값으로 치환"""
    changed = False

    # 패턴: '...${t.xxx.yyy}...' 또는 "...${t.xxx.yyy}..."
    # 백틱 안은 건드리지 않음
    for token, value in THEME_MAP_FULL.items():
        # '${t.colors.primary}' → '#635BFF'
        old_single = "'${" + token + "}'"
        new_single = "'" + value + "'"
        if old_single in content:
            content = content.replace(old_single, new_single)
            changed = True

        # "${t.colors.primary}" → "#635BFF"
        old_double = '"${' + token + '}"'
        new_double = '"' + value + '"'
        if old_double in content:
            content = content.replace(old_double, new_double)
            changed = True

        # 문자열 중간에 있는 경우: '...text ${t.xxx} more...'
        # 이건 단순 치환이 어려우므로 regex 사용
        pattern_single = r"'([^']*)\$\{" + re.escape(token) + r"\}([^']*)'"
        if re.search(pattern_single, content):
            content = re.sub(pattern_single, lambda m: "'" + m.group(1) + value + m.group(2) + "'", content)
            changed = True

        pattern_double = r'"([^"]*)\$\{' + re.escape(token) + r'\}([^"]*)"'
        if re.search(pattern_double, content):
            content = re.sub(pattern_double, lambda m: '"' + m.group(1) + value + m.group(2) + '"', content)
            changed = True

    return content, changed


def process_file(fpath):
    with open(fpath, 'r') as f:
        content = f.read()

    # 빠른 체크: 일반 문자열에 ${t. 또는 ${theme. 가 있는지
    if "'${t." not in content and "'${theme." not in content and \
       '"${t.' not in content and '"${theme.' not in content:
        return 0

    new_content, changed = fix_string_refs(content)

    if changed:
        with open(fpath, 'w') as f:
            f.write(new_content)

        # 남은 참조 확인
        remaining = len(re.findall(r"""['"].*?\$\{t\.[^}]+\}.*?['"]""", new_content))
        remaining += len(re.findall(r"""['"].*?\$\{theme\.[^}]+\}.*?['"]""", new_content))
        return remaining
    return 0


def main():
    fixed_files = 0
    remaining_total = 0

    for root, dirs, files in os.walk('src'):
        dirs[:] = [d for d in dirs if d not in ['node_modules', '.git', 'build']]
        for fname in files:
            if not (fname.endswith('.tsx') or fname.endswith('.ts')):
                continue
            fpath = os.path.join(root, fname)
            if 'src/styles/theme' in fpath:
                continue

            remaining = process_file(fpath)
            if remaining >= 0:
                with open(fpath) as f:
                    c = f.read()
                had_refs = "'${t." in c or "'${theme." in c or '"${t.' in c or '"${theme.' in c
                if not had_refs:
                    fixed_files += 1
                else:
                    remaining_total += remaining
                    if remaining > 0:
                        print(f"  PARTIAL: {fpath} ({remaining} remaining)")

    # 재카운트
    total_remaining = 0
    for root, dirs, files in os.walk('src'):
        dirs[:] = [d for d in dirs if d not in ['node_modules', '.git', 'build']]
        for fname in files:
            if not (fname.endswith('.tsx') or fname.endswith('.ts')):
                continue
            fpath = os.path.join(root, fname)
            with open(fpath) as f:
                c = f.read()
            count = c.count("'${t.") + c.count("'${theme.") + c.count('"${t.') + c.count('"${theme.')
            if count > 0:
                total_remaining += count

    print(f"\n=== Fixed files, remaining string refs: {total_remaining} ===")


if __name__ == '__main__':
    main()
