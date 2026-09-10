#!/usr/bin/env python3
"""
nginx 캐시 정책 정정 — **운영 서버에서 1회 실행** (2026-09-09)

## 왜

인보이스 대조 화면에서 업로드된 PDF 미리보기가 «purplehere.com refused to connect» 로 막혔다.
파일도 코드도 정상이었다. 원인은 nginx 가 응답을 **1년 immutable** 로 못박은 것이다.

  location ^~ /uploads {
      expires 1y;
      add_header Cache-Control "public, immutable, max-age=31536000";
  }

백엔드는 이미 올바르게 보내고 있었다 — `Cache-Control: public, max-age=0` + `ETag` + `Last-Modified`.
nginx 가 그걸 덮어써서 «1년간 바뀌지 않는다»고 거짓말을 했다.

HTTP 캐시는 본문만이 아니라 **응답 헤더까지 함께** 저장한다. 그래서 나중에 `/uploads` 의
`X-Frame-Options` 를 `DENY` → `SAMEORIGIN` 으로 고쳐도, 이미 캐시한 브라우저·CDN 은
**옛 DENY 헤더를 계속 재사용**했다. `immutable` 은 «재검증하지 말라»는 지시라 새로고침으로도 안 풀린다.
Cloudflare 퍼지는 엣지만 지우지 각 브라우저 안은 못 지운다.

같은 원인이 그날 파비콘에서도 났다. `favicon.ico` 를 새로 만들어 배포했는데 옛 아이콘이 계속 나왔다
— 아래 ② 블록이 **파일명에 해시가 없는 루트 자산**까지 1년 immutable 로 묶고 있었기 때문이다.
(PDF 같은 비-HTML 문서는 `<link rel=icon>` 이 없어 `/favicon.ico` 로 폴백한다.)

## 무엇을 고치나

① `/uploads` — `expires` / `add_header Cache-Control` 두 줄을 **제거**한다.
   캐시 정책은 백엔드가 정한다(`max-age=0` + ETag). 매 요청이 304 라 비용은 사실상 같고,
   보안 헤더 변경이 즉시 전파된다. 업로드 파일명에는 이미 타임스탬프+해시가 붙어 URL 이 고유하다.

② 파일명에 해시가 없는 **루트 자산**(favicon 류·og-image·app-icon)에 정확일치 location 을 추가해
   1시간 캐시로 되돌린다. nginx 는 정확일치(`location =`)를 정규식보다 우선한다.
   `/static/` 아래 번들(js·css·이미지)은 **파일명에 해시가 있으므로 1년 immutable 이 맞다** — 건드리지 않는다.

## 사용 (운영 터미널에서 직접, sudo 비번 필요)

    sudo python3 /var/www/production-backend/scripts/ops/fix-uploads-cache-policy.py

- 원본은 `/etc/nginx/backups/purplehere.com.bak-<타임스탬프>` 로 남는다
  (sites-enabled 안에 두면 nginx 가 그 백업까지 설정으로 읽는다).
- `nginx -t` 가 실패하면 **자동으로 백업을 되돌리고** nginx 는 건드리지 않는다.
- 두 번 실행해도 안전하다(이미 적용됐으면 «건너뜀»).
- `--dry-run` 을 주면 바뀔 내용만 보여주고 파일을 쓰지 않는다.

## 적용 뒤 확인

    curl -sI https://purplehere.com/uploads/<아무 업로드 파일> | grep -i 'cache-control\\|x-frame'
      → cache-control: public, max-age=0   (immutable 없음)
      → x-frame-options: SAMEORIGIN

⚠ 이미 «1년 immutable» 로 캐시해 간 브라우저는 그 파일에 한해 여전히 옛 응답을 쓴다.
   그건 이 수정으로 소급해 풀 수 없다(그게 immutable 의 뜻이다). 새로 올라오는 파일부터 정상이고,
   기존 파일은 Cloudflare 퍼지 + 해당 브라우저에서 사이트 데이터 삭제로 푼다.
"""
import datetime
import os
import shutil
import subprocess
import sys

CONF = '/etc/nginx/sites-enabled/purplehere.com'
# 백업은 nginx 가 읽지 않는 폴더에 둔다 (아래 backup 생성부 주석 참조)
BACKUP_DIR = '/etc/nginx/backups'
DRY = '--dry-run' in sys.argv

# ── ① /uploads : 캐시 정책 덮어쓰기 제거 ────────────────────────────────
A_OLD = """    location ^~ /uploads {
        proxy_pass http://localhost:3002;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        expires 1y;
        add_header Cache-Control "public, immutable, max-age=31536000";
    }"""

A_NEW = """    # 캐시 정책은 **백엔드가 정한다** (Cache-Control: public, max-age=0 + ETag/Last-Modified).
    # 여기서 expires/add_header 로 덮어쓰면 안 된다 — 2026-09-09 사고:
    #   «1년 immutable» 로 덮은 탓에 응답이 **헤더째** 굳었고, 나중에 /uploads 의
    #   X-Frame-Options 를 DENY→SAMEORIGIN 으로 고쳐도 이미 캐시한 브라우저·CDN 이
    #   옛 DENY 를 계속 써서 인보이스 미리보기가 «refused to connect» 로 막혔다.
    #   immutable 은 «재검증하지 말라»는 뜻이라 새로고침으로도 안 풀린다.
    # 백엔드 정책(max-age=0 + ETag)이면 매 요청이 304 라 비용은 사실상 같고,
    # 보안 헤더 변경이 즉시 전파된다.
    location ^~ /uploads {
        proxy_pass http://localhost:3002;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }"""

# ── ② 해시 없는 루트 자산 : 1년 immutable 에서 빼낸다 ───────────────────
B_ANCHOR = r"""    location ~* \.(png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {"""

_ROOT_ASSETS = [
    '/favicon.ico', '/favicon-48.png', '/apple-touch-icon.png',
    '/logo192.png', '/logo512.png', '/og-image.png', '/app-icon.svg',
]
B_INSERT = (
    "    # 파일명에 해시가 없는 루트 자산 — 내용이 바뀌어도 URL 이 같으므로 immutable 을 걸면 안 된다.\n"
    "    # 2026-09-09: favicon.ico 를 새로 만들어 배포했는데 «1년 immutable» 탓에 옛 아이콘이 계속 나왔다\n"
    "    # (PDF 등 비-HTML 문서는 <link rel=icon> 이 없어 이 파일로 폴백한다).\n"
    "    # 정확일치 location 은 정규식보다 우선한다. /static/ 아래 해시 붙은 번들은 그대로 1년 캐시.\n"
    + "".join(
        f'    location = {p:<22} {{ expires 1h; add_header Cache-Control "public, max-age=3600"; access_log off; }}\n'
        for p in _ROOT_ASSETS
    )
    + "\n"
)


def main() -> int:
    try:
        original = open(CONF, encoding='utf-8').read()
    except PermissionError:
        print(f'!! {CONF} 를 읽을 수 없다. sudo 로 실행해야 한다.')
        return 1
    except FileNotFoundError:
        print(f'!! {CONF} 가 없다. 서버가 맞는지 확인할 것.')
        return 1

    text = original
    done = []

    # ①
    if A_OLD in text:
        text = text.replace(A_OLD, A_NEW, 1)
        done.append('① /uploads 캐시 덮어쓰기 제거 (백엔드 정책으로 환원)')
    elif 'location ^~ /uploads' not in text:
        print('!! /uploads 블록을 찾지 못했다 — 설정이 예상과 다르다. 중단한다.')
        return 1
    else:
        uploads_block = text.split('location ^~ /uploads', 1)[1].split('}', 1)[0]
        if 'immutable' in uploads_block or 'expires' in uploads_block:
            print('!! /uploads 블록이 예상 형태와 다르다 — 사람이 직접 봐야 한다. 중단한다.')
            print(uploads_block)
            return 1
        done.append('① 이미 적용됨 — 건너뜀')

    # ②
    if 'location = /favicon.ico' in text:
        done.append('② 이미 적용됨 — 건너뜀')
    elif B_ANCHOR in text:
        text = text.replace(B_ANCHOR, B_INSERT + B_ANCHOR, 1)
        done.append(f'② 해시 없는 루트 자산 {len(_ROOT_ASSETS)}개를 1시간 캐시로 분리')
    else:
        print('!! 이미지 캐시 블록을 찾지 못했다 — 설정이 예상과 다르다. 중단한다.')
        return 1

    if text == original:
        print('변경 없음 — 이미 다 적용돼 있다.')
        return 0

    for d in done:
        print(' -', d)

    if DRY:
        print('\n[dry-run] 파일을 쓰지 않았다.')
        return 0

    # ⛔ 백업을 sites-enabled 안에 두면 안 된다 — nginx 는 그 폴더의 **모든 파일**을 설정으로
    #    읽어서, 백업본이 같은 server_name 을 또 선언해 «conflicting server name» 경고가 나고
    #    진짜 설정이 사라지면 묵은 백업이 대신 살아난다(2026-09-10 실측: sites-enabled 안에
    #    purplehere.com.bak(1월자) + .bak-20260910_111400 두 개가 이미 그렇게 읽히고 있었다).
    os.makedirs(BACKUP_DIR, exist_ok=True)
    backup = os.path.join(
        BACKUP_DIR,
        os.path.basename(CONF) + '.bak-' + datetime.datetime.now().strftime('%Y%m%d_%H%M%S'))
    shutil.copy2(CONF, backup)
    open(CONF, 'w', encoding='utf-8').write(text)
    print('백업:', backup)

    check = subprocess.run(['/usr/sbin/nginx', '-t'], capture_output=True, text=True)
    print(check.stderr.strip())
    if check.returncode != 0:
        shutil.copy2(backup, CONF)
        print('!! 문법 오류 — 백업으로 자동 복구했다. nginx 는 건드리지 않았다.')
        return 1

    subprocess.run(['/usr/bin/systemctl', 'reload', 'nginx'], check=True)
    print('OK — nginx 리로드 완료.')
    print('확인: curl -sI https://purplehere.com/favicon.ico | grep -i cache-control')
    return 0


if __name__ == '__main__':
    sys.exit(main())
