# 개발서버 메모리 보호 — 프리즈·강제 재부팅 방지

> 2026-07-14 구축. 설계 = Fable, 구현·실증 = Opus.
> 대상 = 개발서버(87.106.11.184, RAM 7.9GB / 스왑 2GB / 4 vCPU). 운영서버는 범위 밖.

## 무슨 일이 있었나 (원인)

7/8 ~ 7/14 사이 서버가 **4번 재부팅**됐다. 프로세스 크래시가 아니라 **머신 전체**가 죽었다.

| 시각 | 사건 | 종료 방식 |
|------|------|-----------|
| 7/8 18:01 | 프론트 빌드(node) OOM 킬 | 18:13 콘솔 전원버튼 |
| 7/13 11:21 | 빌드 OOM 킬 | 11:34 콘솔 전원버튼 |
| 7/13 19:38~19:45 | 메모리 96.7% · **스왑 2GB 100% 만재** · 가용 103MB | 20:07 콘솔 전원버튼 |
| 7/14 07:55 | 빌드(RSS 4.8GB) OOM 킬 | — |
| 7/14 08:55~08:58 | 에뮬레이터 가동 중 **완전 프리즈**(sar 샘플 끊김, journal 08:58에서 단절) | 09:01 하드 리셋 |

- **근본 원인 = 메모리 고갈.** 프론트 빌드(node, 최대 4.8GB)와 안드로이드 에뮬레이터(qemu, 약 4.5GB)가 7.9GB 서버에서 겹치면 스왑이 만재되고 머신이 응답을 잃는다.
- 리눅스 기본 OOM 킬러는 **너무 늦게** 발동한다. 그 사이 스왑 스래싱으로 SSH·nginx 까지 멈추고, 사람이 호스팅 콘솔에서 리셋한다(= "Power key pressed short" 로그).
- OOM 희생자 6건은 **전부 프론트 빌드 node**. 빌드 힙 상한이 `--max-old-space-size=4096` 이라 V8 이 한계까지 부풀었다. **실측 필요치는 총 피크 3.08GiB.**

## 0층 — 서버 공용 «메모리 자리표»(mem-slot) (2026-11-03 추가 · 지금 기준)

> Irene «같은 일 안생기게 메모리 나눠서 순서대로 쓰게 해야지» — 11-03 07:51·07:55 PlanQ 빌드 두 개가 겹쳐 메모리 바닥·스왑 99% → 통신 끊김 → 08:02 재부팅.
> 아래 1층 게이트는 PurpleHere 것이라 PlanQ·Lingo 의 «들어가는 중» 을 못 봤다. 자리표는 세 솔루션이 같이 서는 줄이다. 설명 단일 진실 = `~/dev-server/README.md` §2.

- 쓰는 법: `mem-slot run <이름> <MB> -- <명령>` — 먼저 선 순서대로, 상자 합이 나눠 쓸 메모리(전체 − 2400MB) 안일 때 들어간다. 상자 = 몫×1.3(최대 5494MB) · 넘치면 그 일만 죽음(137) · 60분(우리 검사는 30분) 안 차례가 안 오면 75(실행 안 함 · 우회 금지).
- 자리표 없이 빌드·에뮬레이터·`playwright test` 를 치면 공용 검사 `mem-slot-guard` 가 작업방 명령을 막는다.

| 이름 | 몫 | 근거 | 어디서 감싸나 |
|---|---|---|---|
| `purple-build` | **2850MB** (상자 3705) | 실측 정점 2475MB(10-23 타입 검사기 뺀 뒤 빌드 29번 최댓값) + 15% | `dev-frontend/deploy-dev.sh` **스크립트 전체**(맨 위에서 자기를 자리표로 다시 띄움 · `BUILD_MB`) — 지우기·빌드·복사가 한 자리 안이라 다음 빌드가 앞 빌드의 build/ 를 못 지운다(11-03 10:05 사고) · `build:dev`·운영 배포(`deploy-to-production.sh` 가 `build:dev` 를 부름) 둘 다 |
| `purple-chrome` | 1000MB | 공용 어림값 — 실측 뒤 고침 | `verify-all.js` 의 `mount`·`print-routes` 게이트 (`slot:`) |
| `purple-emulator` | 4500MB (상자 5494 로 잘림) | qemu 약 4.5GB RSS(07-14 실측) | `mobile-app/scripts/verify/run-v3.js`·`run-v4.js` — 에뮬레이터만 상자에, 차례가 온 뒤부터 부팅 5분을 잰다 |
| `purple-typecheck` | 4000MB | tsc 힙 상한 3584MB 기준 어림 — 실측 뒤 고침 | `check-type-baseline.js` (빌드 밖 tsc) |

- 몫 숫자는 한 곳: 빌드 = `deploy-dev.sh` 의 `BUILD_MB`, 나머지 = `dev-backend/scripts/lib/memSlot.js` 의 `SHARES`. 실측 정점+15% 로 고친다(빌드는 끝에 «빌드 상자 메모리 피크» 줄이 찍힌다).
- ⚠ **두 겹 금지** — 자리표 안에서 또 자리표를 부르면 자기 자리를 기다리며 멈춘다. 그래서 `package.json` 의 `build` 는 감싸지 않고 `deploy-dev.sh` 에서 한 번만 감싼다. `deploy-dev.sh` 도 이미 자리표 상자 안이면 다시 감싸지 않는다(11-03 10:05 — 작업방이 바깥에서 `mem-slot run … -- npm run build:dev` 로 감싸 두 겹이 되어 멈추고 뒤의 PlanQ 빌드까지 막힌 일). `memSlot.wrap` 은 이미 자리표 상자 안(`/proc/self/cgroup` 에 `memslot-`)이거나 `PURPLE_MEM_SLOT` 이 있으면 감싸지 않는다.
- `package.json` 의 `build:dev` 끝 주석(`# … mem-slot …`)은 공용 검사가 «이미 감쌌음» 을 알아보게 하는 표시다 — 지우면 `npm run build:dev` 가 막힌다.
- 아래 1층 게이트(heavy-task-gate)는 그대로 앞에 둔다(자리표 밖 프로그램까지 보는 겹). 3층 상자는 자리표가 맡고, 자리표를 못 쓰는 계정이면 예전 상자(빌드 5G·에뮬레이터 5G)로 돌아간다.

## 4중 방어 (하나가 뚫려도 다음 층이 잡는다)

| 층 | 무엇 | 어디 |
|---|------|------|
| 1. 게이트 | 빌드↔에뮬레이터 **상호배제** + 최소 가용 메모리 요구 | `/var/www/scripts/heavy-task-gate.sh` (deploy-dev.sh · run-v3.js · run-v4.js 가 호출) |
| 2. 힙 상한 | 빌드 V8 힙 4096 → **2560MB** | `dev-frontend/package.json` 의 `build` |
| 3. cgroup 상자 | 빌드 **MemoryMax=4G** / 에뮬레이터 **MemoryMax=5G** — 폭주해도 자기만 죽는다 | `deploy-dev.sh` · `run-v3.js`/`run-v4.js` 의 `systemd-run --user --scope` |
| 4. earlyoom | 가용 10%(SIGTERM)/5%(SIGKILL) 에서 **폭주 프로세스만** kill — 프리즈 도달 전에 자름 | `/etc/default/earlyoom` |

**보호 대상 (절대 희생되면 안 되는 것) — oom_score_adj:**

| 대상 | 값 | 설정 |
|------|----|------|
| sshd | −1000 | (기본) |
| MySQL | −800 | `/etc/systemd/system/mysql.service.d/oom.conf` |
| PM2 백엔드 4개(dev-backend/planq/lingo/qnote) | −500 | `pm2-irene.service.d/oom.conf` (자식이 상속) |
| nginx | −500 | `nginx.service.d/oom.conf` |

earlyoom `--prefer` = qemu/chrome/java, `--avoid` = mysqld/sshd/nginx/systemd/cron.
**`--prefer` 에 `node` 를 넣지 않는다** — 백엔드를 오폭할 경로를 애초에 만들지 않는다. 빌드 node 는 RSS 가 압도적이라 prefer 없이도 항상 1순위로 선택된다.

## 실증 (2026-07-14)

- **earlyoom 실사격**: 메모리 풍선(RSS 4.2GB·6.4GB)을 띄우자 **4초 만에** 풍선만 SIGTERM. 커널 OOM 0건, MySQL·nginx·PM2 5개 전원 생존, 가용 메모리 즉시 회복.
- **게이트 양방향**: 가짜 qemu 가동 → 빌드 차단(exit 1) / 가짜 빌드 가동 → 에뮬레이터 차단(exit 1) / 둘 다 없으면 통과.
- **실빌드**: 힙 2560 + cgroup 4G 로 69초 성공, earlyoom 발동 0건. (이전엔 4.8GB 까지 부풀어 OOM 당했다.)
- verify-all 13/13 · 인쇄 보호파일 8/8 무접촉.

## 다음에 또 죽으면 (부검 순서)

```bash
sudo journalctl -u earlyoom -b -1          # earlyoom 이 누구를 죽였나
tail -50 /var/www/logs/memory-monitor.log  # 1분 간격 상위 5개 RSS
sar -r -f /var/log/sysstat/sa$(date +%d)   # 1분 간격 메모리·스왑 추이
sudo journalctl -k -b -1 | grep -i "out of memory"   # 커널 OOM (여기 걸리면 방어가 뚫린 것)
last reboot                                # 재부팅 이력
```
저널이 **shutdown 기록 없이 끊겼으면 = 프리즈 후 강제 리셋**. `Power key pressed short` 는 콘솔에서 사람이 누른 것.

## 하지 말 것

1. **스왑 증설 금지** — 스래시 구간만 길어진다. 프리즈 해법은 스왑이 아니라 위 4중 방어다. (`vm.swappiness=10` 도 그대로 둔다.)
2. **`drop_caches` · 압박 시 서비스 재시작 류의 "최적화" 재도입 금지** — 옛 `monitor-memory.sh` 가 하던 짓이고, 스래시 중 페이지캐시를 버려 **프리즈를 악화**시켰다. 지금 이 스크립트는 **기록만** 한다.
3. **`vm.overcommit_memory=2` 금지** — Claude CLI 의 VSZ 가 수십 GB 라 정상 프로세스가 즉사한다.
4. **earlyoom `--prefer` 에 node 추가 금지** (위 이유).
5. **에뮬레이터 실행 중 빌드 금지** — 이제 게이트가 막지만, `SKIP_MEMGATE=1` 로 우회하지 말 것.

## 남은 권고 (Irene 결정 사항)

**RAM 8GB → 16GB 증설.** V3/V4 안드로이드 인쇄 게이트를 계속 자주 돌릴 거라면, "에뮬레이터 + 빌드 + Playwright 동시"는 8GB 에서 **물리적으로 불가능**하다 — 코드로 못 고친다. 호스팅 콘솔에서 증설이 가장 싸고 확실하다(코드 변경 0). 대안 = 게이트를 별도 머신/로컬 러너로 이전.

## 부수 조치 (같은 날)

- **fail2ban** 도입 — SSH 무차별 대입이 7/13 이후 22,000건 넘게 들어오고 있었다. 5회 실패 → 1시간 밴(`backend=systemd`, 24.04 는 journald 라 필수). 켜자마자 2개 IP 차단.
- **SSH 비밀번호 로그인 차단** — 최근 7일 성공 로그인 **237건 전부 publickey**, 비번 로그인 0건이라 락아웃 위험 없이 차단(`/etc/ssh/sshd_config.d/01-hardening.conf`). 파일명이 `01` 인 이유 = sshd 는 **먼저 읽은 값이 이기고**, `50-cloud-init.conf` 가 `PasswordAuthentication yes` 를 다시 켜기 때문.
