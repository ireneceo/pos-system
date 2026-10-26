/**
 * suites/user-contexts.js — 부여된 컨텍스트("모자") 불변식.
 *
 * docs/MULTI_CONTEXT_LOGIN_DESIGN.md §3.2. user_contexts 는 "부여받은 모자"만 담는 표이고,
 * role 에 대해서는 투영의 사실상 원천이므로(독립 검증 F2 지적) 아래 불변식이 곧 보안 요건이다.
 *
 * P1 시점에는 행이 0건이고 이 표를 읽는 코드도 없다 — 그래도 게이트를 먼저 박아둔다.
 * 부여 라우트(P5)가 생기는 순간부터 위반이 실데이터로 나타날 수 있기 때문.
 *
 * 테이블 미존재(P1 마이그 이전 환경)에서는 조용히 pass — 배포 순서 의존을 만들지 않는다.
 */

// v1 에서 부여 허용되는 유일 조합 — services/userContexts.js 의 V1_GRANTABLE 과 동형.
// (인스펙션은 DB만 보는 독립 검사라 앱 코드를 import 하지 않는다 — 값이 갈라지면 UC-002 가 잡는다.)
const V1_ENTITY_TYPE = 'restaurant';
const V1_ROLE = 'Restaurant Admin';

module.exports = {
  name: 'user-contexts',
  async run({ q }) {
    const checks = [];
    const add = (name, pass, detail) => checks.push({ name, pass, detail });

    const [exists] = await q(
      `SELECT COUNT(*) c FROM information_schema.tables
        WHERE table_schema = DATABASE() AND table_name = 'user_contexts'`
    );
    if (!Number(exists.c)) {
      add('UC-000 테이블 존재', true, 'user_contexts 미생성 — P1 마이그 이전 환경이라 스킵');
      return checks;
    }

    const cnt = async (sql) => Number((await q(sql))[0].c);

    // UC-001: 부여자 없는 모자 금지. granted_by 는 "누가 이 권한을 줬는가"의 유일한 기록이라
    // NULL 이면 감사 추적이 끊긴다(모델 allowNull:false — 우회 INSERT 감지용).
    const orphanGrantor = await cnt(
      `SELECT COUNT(*) c FROM user_contexts WHERE granted_by IS NULL`
    );
    add('UC-001 granted_by 없는 모자 0건', orphanGrantor === 0,
      orphanGrantor === 0 ? '0건' : `${orphanGrantor}건 — 부여 출처 추적 불가`);

    // v1.3(2026-10-05): restaurant×Staff 추가 — Staff 판정은 restaurant_id 스칼라 + permissions 두 값만 읽는다.
    // UC-002: 허용 외 조합 금지. restaurant×Restaurant Admin 외의 모자는 접근판정 4곳의
    // 규칙이 갈려 "절반만 열리는" 상태가 된다(검증 F4). 앱 레벨 정합 검사를 우회한 행 감지.
    // v1.2(2026-10-04): brand×Brand Manager 추가 — BM 판정은 스칼라(brand_id) 경로라 투영이 그대로 먹는다.
    const badCombo = await cnt(
      `SELECT COUNT(*) c FROM user_contexts
        WHERE NOT ((entity_type = '${V1_ENTITY_TYPE}' AND role = '${V1_ROLE}')
                OR (entity_type = 'restaurant' AND role = 'Staff')
                OR (entity_type = 'brand' AND role = 'Brand Manager'))`
    );
    add('UC-002 허용 외 조합 0건', badCombo === 0,
      badCombo === 0 ? '0건' : `${badCombo}건 — restaurant×Restaurant Admin · restaurant×Staff · brand×Brand Manager 외 조합 존재`);

    // UC-003: 고아 모자(대상 매장이 사라진 행) 경고. 목록 쿼리는 JOIN 으로 이미 걸러내지만,
    // 남아 있으면 회수 누락이라 부여 관리(P5)에서 정리 대상이다.
    const orphanEntity = await cnt(
      `SELECT COUNT(*) c FROM user_contexts uc
         LEFT JOIN restaurants r ON r.id = uc.entity_id
        WHERE uc.entity_type = '${V1_ENTITY_TYPE}' AND r.id IS NULL`
    );
    add('UC-003 고아 매장 모자 0건', orphanEntity === 0,
      orphanEntity === 0 ? '0건' : `${orphanEntity}건 — 삭제된 매장의 모자 잔존(회수 누락)`);

    // UC-004: 고아 브랜드 모자(대상 브랜드가 사라진 행) — v1.2
    const orphanBrand = await cnt(
      `SELECT COUNT(*) c FROM user_contexts uc
         LEFT JOIN brands b ON b.id = uc.entity_id
        WHERE uc.entity_type = 'brand' AND b.id IS NULL`
    );
    add('UC-004 고아 브랜드 모자 0건', orphanBrand === 0,
      orphanBrand === 0 ? '0건' : `${orphanBrand}건 — 삭제된 브랜드의 모자 잔존(회수 누락)`);

    // ── v1.3 (2026-10-05) — Staff 모자 권한 · 역할 추가 요청 ──────────────────
    const hasCol = async (table, col) => Number((await q(
      `SELECT COUNT(*) c FROM information_schema.COLUMNS
        WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = '${table}' AND COLUMN_NAME = '${col}'`
    ))[0].c) > 0;

    if (await hasCol('user_contexts', 'permissions')) {
      // UC-007: Staff 모자는 권한 1개 이상(0개 = 들어가서 아무것도 못 보는 죽은 카드),
      //         브랜드 매니저 모자는 NULL(=기본 2키) 또는 정규화된 값(dashboard 포함 배열 — 2026-10-26),
      //         나머지 모자는 permissions NULL(값이 있으면 투영이 읽지 않는 유령 권한).
      const staffNoPerm = await cnt(
        `SELECT COUNT(*) c FROM user_contexts
          WHERE role = 'Staff' AND (permissions IS NULL OR JSON_LENGTH(permissions) = 0)`
      );
      const bmBadPerm = await cnt(
        `SELECT COUNT(*) c FROM user_contexts
          WHERE entity_type = 'brand' AND role = 'Brand Manager' AND permissions IS NOT NULL
            AND (JSON_TYPE(permissions) <> 'ARRAY' OR NOT JSON_CONTAINS(permissions, '"dashboard"'))`
      );
      const otherWithPerm = await cnt(
        `SELECT COUNT(*) c FROM user_contexts
          WHERE role <> 'Staff' AND NOT (entity_type = 'brand' AND role = 'Brand Manager') AND permissions IS NOT NULL`
      );
      const ok7 = staffNoPerm === 0 && bmBadPerm === 0 && otherWithPerm === 0;
      add('UC-007 Staff 모자 권한 1개 이상 · 브랜드 매니저 모자 NULL/정규화 값 · 다른 모자 NULL', ok7,
        ok7 ? '0건' : `Staff 권한 없음 ${staffNoPerm}건 · 브랜드 매니저 모자 잘못된 값 ${bmBadPerm}건 · 다른 모자 권한 값 ${otherWithPerm}건`);
    } else {
      add('UC-007 Staff 모자 권한', true, 'user_contexts.permissions 미생성 — 마이그 이전 환경이라 스킵');
    }

    // UC-008: 같은 사람이 같은 매장에 매장 모자(RA·Staff) 두 장 겹침 0 — 승급은 회수 후 부여.
    const overlap = await cnt(
      `SELECT COUNT(*) c FROM (
         SELECT user_id, entity_id FROM user_contexts
          WHERE entity_type = 'restaurant'
          GROUP BY user_id, entity_id HAVING COUNT(*) > 1
       ) t`
    );
    add('UC-008 같은 매장 RA↔Staff 겹침 0건', overlap === 0,
      overlap === 0 ? '0건' : `${overlap}쌍 — 같은 매장에 매장 모자 두 장`);

    const [reqExists] = await q(
      `SELECT COUNT(*) c FROM information_schema.tables
        WHERE table_schema = DATABASE() AND table_name = 'user_context_requests'`
    );
    if (Number(reqExists.c)) {
      // UC-005: 결정된 요청(approved·rejected)엔 결정자·결정 시각이 있다 — 감사 추적.
      const noDecider = await cnt(
        `SELECT COUNT(*) c FROM user_context_requests
          WHERE status IN ('approved', 'rejected') AND (decided_by IS NULL OR decided_at IS NULL)`
      );
      add('UC-005 결정된 요청에 결정자 있음', noDecider === 0,
        noDecider === 0 ? '0건' : `${noDecider}건 — 결정자/결정시각 없는 결정`);

      // UC-006: 요청 조합은 부여 가능 집합(4조합) 안 — services/userContexts.GRANTABLE_COMBINATIONS 와 동형.
      const badReq = await cnt(
        `SELECT COUNT(*) c FROM user_context_requests
          WHERE NOT ((entity_type = 'restaurant' AND role IN ('Staff', 'Restaurant Admin', 'Restaurant Owner'))
                  OR (entity_type = 'brand' AND role = 'Brand Manager'))`
      );
      add('UC-006 요청 조합은 부여 가능 집합 안', badReq === 0,
        badReq === 0 ? '0건' : `${badReq}건 — 부여 불가 조합의 요청`);

      const [invCol] = await q(
        `SELECT COUNT(*) c FROM information_schema.COLUMNS
          WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'user_context_requests' AND COLUMN_NAME = 'initiator'`
      );
      if (Number(invCol.c)) {
        // UC-009 (v1.4 초대): 초대 행은 보낸 사람·권한(1개 이상) 있음 · Staff 매장 모자만 · 요청 행은 permissions NULL.
        const badInv = await cnt(
          `SELECT COUNT(*) c FROM user_context_requests
            WHERE (initiator = 'grantor' AND (created_by IS NULL OR permissions IS NULL
                     OR JSON_LENGTH(permissions) < 1 OR entity_type <> 'restaurant' OR role <> 'Staff'))
               OR (initiator = 'requester' AND permissions IS NOT NULL)`
        );
        add('UC-009 초대 행 모양(보낸 사람·권한) · 요청 행 permissions 없음', badInv === 0,
          badInv === 0 ? '0건' : `${badInv}건 — 초대/요청 행 모양 어긋남`);

        // UC-010: 승인된 초대의 결정자 = 본인(수락) · 승인된 요청의 결정자 ≠ 본인(셀프 부여 사후 감시).
        const selfGrant = await cnt(
          `SELECT COUNT(*) c FROM user_context_requests
            WHERE status = 'approved'
              AND ((initiator = 'grantor' AND decided_by <> user_id)
                OR (initiator = 'requester' AND decided_by = user_id))`
        );
        add('UC-010 초대는 본인이 수락 · 요청은 남이 승인', selfGrant === 0,
          selfGrant === 0 ? '0건' : `${selfGrant}건 — 본인 동의 없는 초대 승인 또는 셀프 승인`);
      } else {
        add('UC-009/010 초대 칸', true, 'user_context_requests.initiator 미생성 — 마이그 이전 환경이라 스킵');
      }
    } else {
      add('UC-005/006 요청 표', true, 'user_context_requests 미생성 — 마이그 이전 환경이라 스킵');
    }

    return checks;
  }
};
