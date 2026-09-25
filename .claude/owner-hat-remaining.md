# 오너 모자(v1.1) — 남은 작업 지시서 (Fable 3회차 확정분 그대로)

> 2026-09-25 Irene 외출로 중단. **이 문서의 내용은 Fable 이 코드 형태까지 정한 것이다.**
> Irene 지시: 「너가 판단하지마. 이건 복잡한 구조야」 → **새로 판단하지 말고 그대로 옮겨 적는다.**
> 옮기다 막히면(앵커가 없거나 다르면) **중단하고 사실만 보고**한다.
> 완료분·검증 결과는 `dev-backend/releases/2026-09-25-owner-hat.json`.

---

## F4. `dev-frontend/src/components/Admin/UserContextsSection.tsx`

- 12–13행 주석을 다음으로 교체:
```
 * v1 은 (매장 × Restaurant Admin), v1.1 은 여기에 (매장 × Restaurant Owner) 를 더한다 — 역할은 이 둘뿐이다.
 * 오너 부여는 user_contexts 행이 아니라 소유행(restaurant_managers)이라 목록·회수도 따로 온다(ownerships).
```
- `interface Orphan …` 아래에 `interface Ownership { id: number; name: string; }`
- state 추가(기존 `const [orphans, …]` 아래):
```ts
const [ownerships, setOwnerships] = useState<Ownership[]>([]);
const [pickRole, setPickRole] = useState<'Restaurant Admin' | 'Restaurant Owner'>('Restaurant Admin');
```
- `revoking` 타입을 `useState<{ label: string; run: () => Promise<void> } | null>(null)` 로 교체
- `load` 안 `setOrphans(...)` 아래 `setOwnerships(json?.data?.ownerships || []);`
- `grant` body: `role: 'Restaurant Admin'` → `role: pickRole`
- `revoke(ctx)` 를 두 함수로 교체:
```ts
  const revokeContext = async (ctx: Ctx) => {
    setBusy(true); setError(null);
    try {
      const res = await fetch(`/api/users/${userId}/contexts/${ctx.id}`, { method: 'DELETE', headers: headers() });
      if (!res.ok) { setError(t('context.admin.revokeFailed')); return; }
      await load();
    } catch {
      setError(t('context.admin.revokeFailed'));
    } finally {
      setBusy(false);
    }
  };

  const revokeOwnership = async (o: Ownership) => {
    setBusy(true); setError(null);
    try {
      const res = await fetch(`/api/users/${userId}/ownerships/${o.id}`, { method: 'DELETE', headers: headers() });
      if (!res.ok) { setError(t('context.admin.revokeFailed')); return; }
      await load();
    } catch {
      setError(t('context.admin.revokeFailed'));
    } finally {
      setBusy(false);
    }
  };
```
- `const granted = contexts.filter((c) => c.kind === 'granted');`
  → `const granted = contexts.filter((c) => c.kind === 'granted' && c.entity_type !== 'owner');`
  (오너 카드는 소유행 목록으로 대신 보여준다 — 두 번 안 보이게)
- `{granted.length === 0 && <Empty>…}` → `{granted.length === 0 && ownerships.length === 0 && <Empty>…}`
- granted 행의 `onClick={() => setRevoking(c)}`
  → `onClick={() => setRevoking({ label: c.label, run: () => revokeContext(c) })}`
- orphan 행의 `onClick={() => setRevoking({ kind: 'granted', id: o.id, … })}`
  → `onClick={() => setRevoking({ label: String(o.entity_id), run: () => revokeContext({ kind: 'granted', id: o.id, entity_type: 'restaurant', entity_id: o.entity_id, role: o.role, label: String(o.entity_id) }) })}`
- orphan 목록 아래·부여 Row 위에 추가:
```tsx
      {ownerships.map((o) => (
        <Row key={'own-' + o.id}>
          <RowLabel>{o.name}</RowLabel>
          <Tag>Restaurant Owner</Tag>
          <Button variant="danger" size="small" disabled={busy} onClick={() => setRevoking({ label: o.name, run: () => revokeOwnership(o) })}>
            {t('context.admin.revoke')}
          </Button>
        </Row>
      ))}
```
- 부여 Row 의 매장 `<Picker>` **앞**에 역할 선택 추가(같은 `Picker` 스타일 재사용 — 이 파일의 기존 방식, **새 styled 금지**):
```tsx
        <Picker value={pickRole} onChange={(e) => setPickRole(e.target.value as 'Restaurant Admin' | 'Restaurant Owner')} disabled={busy}>
          <option value="Restaurant Admin">{t('context.admin.roleAdmin')}</option>
          <option value="Restaurant Owner">{t('context.admin.roleOwner')}</option>
        </Picker>
```
- ConfirmModal: `message={t('context.admin.revokeConfirmMessage', { name: revoking?.label || '' })}` 는 그대로,
  `onConfirm={() => { const c = revoking; setRevoking(null); if (c) c.run(); }}`

---

## F5. i18n — `dev-frontend/public/locales/{en,ko,zh,ms}/auth.json`

`context.select` 에 `grantHint`, `context.admin` 에 `roleAdmin`·`roleOwner` 추가, `context.admin.hint` 교체.

| 키 | en |
|---|---|
| select.grantHint | Need another store or role? A system administrator grants access in Staff Management. |
| admin.roleAdmin | Store admin |
| admin.roleOwner | Owner |
| admin.hint | Grant this user access to another store — as store admin, or as owner (all owned stores appear as one owner card). They can switch into it after logging in. Revoking takes effect on their next request — they are returned to their own account, not logged out. |

| 키 | ko |
|---|---|
| select.grantHint | 다른 매장이나 역할이 필요하면 시스템 관리자가 Staff Management 에서 부여합니다. |
| admin.roleAdmin | 매장 관리자 |
| admin.roleOwner | 오너 |
| admin.hint | 이 사용자에게 다른 매장의 권한을 부여합니다 — 매장 관리자 또는 오너(소유 매장 전체가 오너 카드 1장으로 보입니다). 로그인 후 그 자격으로 전환할 수 있게 됩니다. 회수하면 다음 요청부터 적용되며, 로그아웃이 아니라 본래 계정으로 되돌아갑니다. |

| 키 | zh |
|---|---|
| select.grantHint | 需要其他门店或角色？由系统管理员在 Staff Management 中授予。 |
| admin.roleAdmin | 门店管理员 |
| admin.roleOwner | 业主 |
| admin.hint | 授予该用户另一门店的权限——门店管理员或业主（名下所有门店显示为一张业主卡片）。登录后即可切换。撤销后在其下次请求时生效——会返回其本人账号，而非退出登录。 |

| 키 | ms |
|---|---|
| select.grantHint | Perlukan kedai atau peranan lain? Pentadbir sistem memberikan akses di Staff Management. |
| admin.roleAdmin | Pentadbir kedai |
| admin.roleOwner | Pemilik |
| admin.hint | Beri pengguna ini akses ke kedai lain — sebagai pentadbir kedai atau pemilik (semua kedai milik dipaparkan sebagai satu kad pemilik). Mereka boleh bertukar selepas log masuk. Penarikan balik berkuat kuasa pada permintaan seterusnya — mereka kembali ke akaun sendiri, bukan dilog keluar. |

→ `npm run i18n:verify` 통과 확인.

---

## H. `docs/MULTI_CONTEXT_LOGIN_DESIGN.md`

**H1.** `### 5.3 불변식 …` 절 끝(`## 6. UI/UX` 바로 위)에 추가:
```
### 5.4 오너 모자 = 소유행 파생 (v1.1, 2026-09-25 — Irene 「한 아이디에서 오너까지」)
- 오너는 사람 단위 정체이고 권한 판정은 `restaurant_managers(manager_id=user.id, relationship_type='ownership')`
  **한 경로**뿐이다(`middleware/auth.js:275·479`, `routes/owner.js` 전부). §5.2 가 예고한 「소유행 기반 모자 = 데이터 부여」가
  바로 이것이라, **부여 기록 = 소유행**이다. `user_contexts` 행도 ENUM 확장도 없다.
- 목록·검증·전환·소켓은 여전히 `validateGrantedContext` 하나를 공유한다(오너 분기 추가). `entity_type='owner'`,
  `entity_id=자기 user id`, 카드는 계정당 1장(제목 = 소유 매장명, 2개 이상이면 「첫 매장 +N」).
- 투영: `role='Restaurant Owner'`, `restaurant_id/brand_id/foodcourt_id=null`, `permissions=[]`. 네이티브 오너에겐 카드를 붙이지 않는다.
- 부여/회수는 SA 전용(§8-3 봉인 유지): `POST /users/:id/contexts` (restaurant × Restaurant Owner) → 소유행 upsert(oversight 행이 있으면 409),
  `DELETE /users/:id/ownerships/:rid`. 회수 = 소유행 삭제 → 다음 요청 네이티브 폴백(401 아님).
- 「5번째 판정처 금지」 준수: 새 판정은 없고 기존 오너 판정을 그대로 쓴다. brand/foodcourt 모자·계정 병합·셀프 부여는 여전히 제외.
```

**H2.** §8.1 항목 3 을 다음으로 교체:
```
3. **유저 단위 청구(Owner)와의 상호작용**: 오너 **모자**는 청구 주체가 아니다 — `invoiceScheduler` 는 `role='Restaurant Owner'` 인
   계정만 오너 구독 대상으로 뽑으므로(실측 :726), 모자를 쓴 BG/RA 에게 OWN 인보이스가 생기지 않는다. 매장 청구는 `restaurants.payment_model`
   그대로다. ⚠ `payment_model='restaurant_owner'` 매장의 청구 대상은 `subscriptions.js:90` 이 **첫 소유행 1개**로 뽑으므로, 한 매장에
   소유자를 둘 두지 않는다(운영 절차: 새 소유자 부여 → 옛 소유행 회수).
```

---

## I. 남은 검증 순서 (빌드 1회·sweep 1회)

2. 프론트 F4·F5 전부 확정 → `npm run i18n:verify` → `npm run build:dev` **1회**
3. `node scripts/verify-all.js --full` **1회** (print-guard 변경 0 = MainLayout 무접촉 증명, design-guard)
4. 실브라우저(dev, demo BG 22 에 rid 18 소유행 SQL 부여 후): 선택 화면 3카드(◯ 카드 제목 «Test Debug Restaurant») → 오너 대시보드 진입 → 사이드바/헤더 스위처 제목이 그 카드명 → 브랜드 카드로 복귀 → SA Staff Management 에서 22 의 소유행이 «Restaurant Owner» 태그로 보이고 회수 버튼 동작 → 역할 선택 «Owner» 로 부여 재현. 1440·390 폭, console.error 0. **끝나면 소유행 삭제.**
5. `node scripts/check-sensitive-diff.js` → 게이트 판정 요청(사실만: diff 파일 목록, 테스트 수, FI 결과, sweep 결과)

> 1단계(백엔드 + 테스트 + 고장주입)는 2026-09-25 에 **완료**됐다.

---

## 배포 후 Irene 이 할 일 (Fable 0. 판정)

1. **순서 고정**: SA 화면에서 ①gitconsulting 에 「오너 · with MIN Cafe」 부여 → ②`withmin_owner`(64)의 소유 회수 → ③64 비활성화
   - 근거: `subscriptions.js:90` 이 매장 청구 대상을 **첫 소유행 1개**로 뽑는다. 소유자가 둘이면 비결정이고, 비활성 계정이 뽑힐 수 있다
2. 64 의 오너 데이터 0 은 **「로그인 이력 없음」으로 증명** — SA Users 에서 64 의 마지막 로그인이 비어 있는지 확인. **비어 있지 않으면 중단·보고**
3. (기록용·차단 아님) with MIN Cafe 구독 «billed to» 가 브랜드인지 확인
