#!/usr/bin/env python3
import os
import sys
import requests
import json
import argparse
import glob
from dotenv import load_dotenv

load_dotenv()

# 프로젝트 설정 파일
PROJECTS_FILE = os.path.expanduser("~/.claude_projects.json")

# 문서 보호 정책
READONLY_DOCS = [
    "development-guide.md",  # 🚨 개발 가이드 - 절대 보호
    "ia-structure.md",       # 🚨 UI 구조 - 사업 기획
    "requirements.md"        # 🚨 요구사항 - 사업 명세
]

UPDATABLE_DOCS = [
    "database-erd.md",        # 기술 변경시만
    "api-specification.md",   # API 추가시만  
    "project-guide.md",       # 전략 변경시만
    "system-architecture.md"  # 구조 변경시만
]

def load_projects():
    """저장된 프로젝트 설정 불러오기"""
    if os.path.exists(PROJECTS_FILE):
        with open(PROJECTS_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {}

def save_projects(projects):
    """프로젝트 설정 저장"""
    with open(PROJECTS_FILE, 'w', encoding='utf-8') as f:
        json.dump(projects, f, indent=2, ensure_ascii=False)

def find_domain_path(domain):
    """도메인 경로 자동 탐지"""
    domain_parts = domain.split('.')
    if len(domain_parts) < 2:
        return None
    domain_folder = domain
    root_folder = f"{domain_parts[-2]}.{domain_parts[-1]}"
    possible_paths = [
        f"/var/www/vhosts/{root_folder}/{domain_folder}/",
        f"/var/www/vhosts/{domain_folder}/",
        f"/var/www/vhosts/*/{domain_folder}/",
    ]
    
    for path_pattern in possible_paths:
        paths = glob.glob(path_pattern)
        if paths:
            return paths[0]
    
    return None

def check_protected_files(request, work_dir):
    """보호된 파일 수정 시도 감지"""
    protected_paths = []
    for doc in READONLY_DOCS:
        doc_path = os.path.join(work_dir, "docs", doc)
        if os.path.exists(doc_path):
            protected_paths.append(doc_path)
    
    # 요청에서 보호된 파일 언급 체크
    request_lower = request.lower()
    for doc in READONLY_DOCS:
        if doc.lower() in request_lower or doc.replace('-', ' ').lower() in request_lower:
            return True, f"⚠️ 경고: {doc}는 수정이 금지된 문서입니다."
    
    return False, None

def load_docs_content(work_dir):
    """설계 문서들 내용 로드"""
    docs_content = {}
    docs_dir = os.path.join(work_dir, "docs")
    
    if not os.path.exists(docs_dir):
        return docs_content
    
    # 모든 설계 문서 로드
    all_docs = READONLY_DOCS + UPDATABLE_DOCS
    for doc in all_docs:
        doc_path = os.path.join(docs_dir, doc)
        if os.path.exists(doc_path):
            try:
                with open(doc_path, 'r', encoding='utf-8') as f:
                    docs_content[doc] = f.read()
            except Exception as e:
                print(f"⚠️ 문서 로드 실패 {doc}: {e}")
    
    return docs_content

def call_claude_api(prompt, work_dir):
    api_key = "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"

    if not api_key:
        return "🚨 오류: API 키가 설정되지 않았습니다. CLAUDE_API_KEY 또는 ANTHROPIC_API_KEY 환경 변수를 확인하세요."

    # 보호된 파일 체크
    is_protected, warning = check_protected_files(prompt, work_dir)
    if is_protected:
        return warning

    # 설계 문서 로드
    docs_content = load_docs_content(work_dir)

    url = "https://api.anthropic.com/v1/messages"
    headers = {
        "x-api-key": api_key,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json"
    }
    
    # 설계 문서 내용을 시스템 프롬프트에 포함
    docs_sections = []
    for doc_name, content in docs_content.items():
        protection_status = "🚨 절대 수정 금지" if doc_name in READONLY_DOCS else "📝 기술적 업데이트 가능"
        docs_sections.append(f"""
### {doc_name} ({protection_status})
{content}
""")
    
    docs_context = "\n".join(docs_sections) if docs_sections else "설계 문서를 찾을 수 없습니다."
    
    system_prompt = f"""당신은 POS 시스템 전문 개발자입니다. 현재 작업 디렉토리는 {work_dir} 입니다.

🚨 **중요: 문서 보호 정책**
다음 문서들은 **절대 수정하지 마세요**:
- development-guide.md (개발 가이드)
- ia-structure.md (UI 구조)  
- requirements.md (요구사항)

이 문서들의 내용을 **100% 엄격히 준수**해서 개발하세요.

🛡️ **개발 제약 사항**
1. 사용자가 명시적으로 요청하지 않은 기존 파일 수정 금지
2. 확인 완료된 코드 임의 변경 금지
3. 설계 문서의 내용을 정확히 따를 것
4. React 기반 프론트엔드 + Node.js 백엔드 구조 유지
5. 단계별 개발 원칙 준수

🏗️ **프로젝트 구조 (React 기반)**
```
frontend/          # React 앱
├── src/
│   ├── pages/     # 페이지 컴포넌트
│   ├── components/ # 재사용 컴포넌트
│   ├── styles/    # CSS/디자인
│   ├── utils/     # 유틸리티
│   └── hooks/     # 커스텀 훅
backend/           # Node.js API
docs/              # 설계 문서들
```

📋 **설계 문서 내용**
{docs_context}

응답 형식:
1. 먼저 설계 문서 기반 개발 계획 설명
2. 기존 파일 영향도 분석
3. 실제 파일들 생성/수정

파일 형식:
FILE: frontend/src/pages/LoginPage.jsx
```jsx
// React 컴포넌트
```

FILE: backend/routes/auth.js
```javascript
// Node.js API
```

🚨 **절대 규칙**
- 설계 문서 내용 100% 준수
- 기존 완성 코드 임의 수정 금지
- 사용자 명령 없이 구조 변경 금지
- React + Node.js 기술 스택 유지"""

    data = {
        "model": "claude-3-haiku-20240307",
        "max_tokens": 4000,
        "system": system_prompt,
        "messages": [
            {"role": "user", "content": prompt}
        ]
    }
    
    try:
        response = requests.post(url, headers=headers, json=data)
        if response.status_code == 200:
            result = response.json()
            return result['content'][0]['text']
        else:
            return f"API 오류: {response.status_code} - {response.text}"
    except Exception as e:
        return f"오류: {str(e)}"

def is_protected_file(filename, work_dir):
    """파일이 보호된 문서인지 확인"""
    for doc in READONLY_DOCS:
        if filename.endswith(doc) or doc in filename:
            return True
    return False

def parse_and_create_files(claude_response, work_dir):
    """Claude 응답에서 파일을 파싱하고 실제 파일 생성"""
    lines = claude_response.split('\n')
    current_file = None
    current_content = []
    in_code_block = False
    
    for line in lines:
        if line.startswith('FILE: '):
            # 이전 파일 저장
            if current_file and current_content:
                if not is_protected_file(current_file, work_dir):
                    save_file(current_file, '\n'.join(current_content), work_dir)
                else:
                    print(f"🚨 보호된 파일 수정 시도 차단: {current_file}")
            
            # 새 파일 시작
            current_file = line.replace('FILE: ', '').strip()
            current_content = []
            in_code_block = False
            
        elif line.startswith('```') and current_file:
            in_code_block = not in_code_block
            if not in_code_block:
                # 코드 블록 끝
                if not is_protected_file(current_file, work_dir):
                    save_file(current_file, '\n'.join(current_content), work_dir)
                    current_file = None
                    current_content = []
                else:
                    print(f"🚨 보호된 파일 수정 시도 차단: {current_file}")
                    current_file = None
                    current_content = []
                
        elif in_code_block and current_file:
            current_content.append(line)
    
    # 마지막 파일 저장
    if current_file and current_content:
        if not is_protected_file(current_file, work_dir):
            save_file(current_file, '\n'.join(current_content), work_dir)
        else:
            print(f"🚨 보호된 파일 수정 시도 차단: {current_file}")

def save_file(filename, content, work_dir):
    """파일을 실제로 저장"""
    try:
        # 절대 경로 생성
        full_path = os.path.join(work_dir, filename)
        
        # 보호된 파일 최종 체크
        if is_protected_file(filename, work_dir):
            print(f"🚨 보호된 파일 저장 차단: {full_path}")
            return
        
        # 디렉토리 생성
        directory = os.path.dirname(full_path)
        if directory and not os.path.exists(directory):
            os.makedirs(directory)
        
        # 파일 저장
        with open(full_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✅ 파일 생성: {full_path}")
        
    except Exception as e:
        print(f"❌ 파일 생성 실패 {full_path}: {e}")

def main():
    parser = argparse.ArgumentParser(description='Claude 개발 도우미 (강화 버전)')
    parser.add_argument('--domain', '-d', help='도메인명 (예: pos.orderhere.center)')
    parser.add_argument('--project', '-p', help='프로젝트명 (저장된 프로젝트 사용)')
    parser.add_argument('--save', '-s', help='현재 설정을 프로젝트로 저장')
    parser.add_argument('--list', '-l', action='store_true', help='저장된 프로젝트 목록')
    parser.add_argument('--path', help='직접 경로 지정')
    parser.add_argument('--docs', action='store_true', help='문서 보호 정책 확인')
    parser.add_argument('request', nargs='*', help='개발 요청')
    
    args = parser.parse_args()
    
    projects = load_projects()
    
    # 문서 보호 정책 출력
    if args.docs:
        print("🚨 문서 보호 정책:")
        print("\n🔒 절대 수정 금지:")
        for doc in READONLY_DOCS:
            print(f"  - {doc}")
        print("\n📝 기술적 업데이트 가능:")
        for doc in UPDATABLE_DOCS:
            print(f"  - {doc}")
        return
    
    # 프로젝트 목록 출력
    if args.list:
        print("💾 저장된 프로젝트:")
        for name, path in projects.items():
            print(f"  {name}: {path}")
        return
    
    # 작업 디렉토리 결정
    work_dir = None
    
    if args.path:
        work_dir = args.path
    elif args.project:
        if args.project in projects:
            work_dir = projects[args.project]
            print(f"📁 프로젝트 '{args.project}' 사용: {work_dir}")
        else:
            print(f"❌ 프로젝트 '{args.project}'를 찾을 수 없습니다.")
            return
    elif args.domain:
        work_dir = find_domain_path(args.domain)
        if not work_dir:
            print(f"❌ 도메인 '{args.domain}' 경로를 찾을 수 없습니다.")
            return
        print(f"🌐 도메인 '{args.domain}' 감지: {work_dir}")
    else:
        work_dir = os.getcwd()
        print(f"📂 현재 디렉토리 사용: {work_dir}")
    
    # 프로젝트 저장
    if args.save and work_dir:
        projects[args.save] = work_dir
        save_projects(projects)
        print(f"💾 프로젝트 '{args.save}' 저장됨: {work_dir}")
        return
    
    # 개발 요청 처리
    if not args.request:
        print("사용법:")
        print("  python3 claude_dev.py --domain pos.orderhere.center \"React 로그인 페이지 만들어줘\"")
        print("  python3 claude_dev.py --project pos \"메인 대시보드 컴포넌트 추가해줘\"")
        print("  python3 claude_dev.py --list  # 저장된 프로젝트 목록")
        print("  python3 claude_dev.py --docs  # 문서 보호 정책 확인")
        print("  python3 claude_dev.py --domain pos.orderhere.center --save pos  # 프로젝트 저장")
        return
    
    user_request = ' '.join(args.request)
    print(f"🤖 Claude에게 요청: {user_request}")
    print(f"📁 작업 디렉토리: {work_dir}")
    print("🛡️ 문서 보호 정책 적용 중...")
    print("⏳ 개발 중...")
    
    # Claude API 호출
    response = call_claude_api(user_request, work_dir)
    
    # 응답 출력
    print("\n📋 Claude 응답:")
    print("="*50)
    print(response)
    print("="*50)
    
    # 파일 생성
    print("\n📁 파일 생성 중...")
    parse_and_create_files(response, work_dir)
    
    print("\n🎉 개발 완료!")
    print("🚨 주의: 보호된 문서는 수정되지 않았습니다.")

if __name__ == "__main__":
    main()