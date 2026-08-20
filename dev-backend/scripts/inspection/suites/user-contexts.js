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

    // UC-002: v1 비허용 조합 금지. restaurant×Restaurant Admin 외의 모자는 접근판정 4곳의
    // 규칙이 갈려 "절반만 열리는" 상태가 된다(검증 F4). 앱 레벨 정합 검사를 우회한 행 감지.
    const badCombo = await cnt(
      `SELECT COUNT(*) c FROM user_contexts
        WHERE entity_type <> '${V1_ENTITY_TYPE}' OR role <> '${V1_ROLE}'`
    );
    add('UC-002 v1 비허용 조합 0건', badCombo === 0,
      badCombo === 0 ? '0건' : `${badCombo}건 — restaurant×Restaurant Admin 외 조합 존재`);

    // UC-003: 고아 모자(대상 매장이 사라진 행) 경고. 목록 쿼리는 JOIN 으로 이미 걸러내지만,
    // 남아 있으면 회수 누락이라 부여 관리(P5)에서 정리 대상이다.
    const orphanEntity = await cnt(
      `SELECT COUNT(*) c FROM user_contexts uc
         LEFT JOIN restaurants r ON r.id = uc.entity_id
        WHERE uc.entity_type = '${V1_ENTITY_TYPE}' AND r.id IS NULL`
    );
    add('UC-003 고아 매장 모자 0건', orphanEntity === 0,
      orphanEntity === 0 ? '0건' : `${orphanEntity}건 — 삭제된 매장의 모자 잔존(회수 누락)`);

    return checks;
  }
};
