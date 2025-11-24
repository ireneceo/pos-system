require('dotenv').config();

// Load environment-specific config
const envConfig = process.env.NODE_ENV === 'production'
  ? require('dotenv').config({ path: '.env.production' })
  : require('dotenv').config({ path: '.env.codespace' });

const bcrypt = require('bcrypt');
const { sequelize } = require('./config/database');
const User = require('./models/User');

const managerUsers = [
  {
    username: 'foodcourt_general',
    email: 'foodcourt_general@orderhere.center',
    password: 'test123',
    role: 'Foodcourt General',
    full_name: '이명호',
    position: '푸드코트 총괄매니저',
    department: '푸드코트 운영팀',
    company_name: '오더히어 푸드코트',
    phone: '02-1234-5678',
    address: '서울특별시 강남구 테헤란로 123'
  },
  {
    username: 'brand_general',
    email: 'brand_general@orderhere.center',
    password: 'test123',
    role: 'Brand General',
    full_name: '김수진',
    position: '브랜드 총괄매니저',
    department: '브랜드 운영팀',
    company_name: '오더히어 브랜드',
    phone: '02-1234-5679',
    address: '서울특별시 강남구 테헤란로 124'
  },
  {
    username: 'foodcourt_manager1',
    email: 'foodcourt_manager1@orderhere.center',
    password: 'test123',
    role: 'Foodcourt Manager',
    full_name: '박준영',
    position: '푸드코트 매니저',
    department: '현장관리팀',
    company_name: '선웨이 푸드코트',
    phone: '02-1234-5680',
    address: '서울특별시 강남구 테헤란로 125'
  },
  {
    username: 'brand_manager1',
    email: 'brand_manager1@orderhere.center',
    password: 'test123',
    role: 'Brand Manager',
    full_name: '최지은',
    position: '브랜드 매니저',
    department: '브랜드관리팀',
    company_name: 'K-DINE 브랜드',
    phone: '02-1234-5681',
    address: '서울특별시 강남구 테헤란로 126'
  },
  {
    username: 'admin',
    email: 'admin@orderhere.com',
    password: 'admin123',
    role: 'System Admin',
    full_name: '오더히어 관리자',
    position: '시스템 관리자',
    department: 'IT팀',
    company_name: '오더히어 테크놀로지스',
    phone: '02-1234-5677',
    address: '서울특별시 강남구 테헤란로 122'
  }
];

async function setupManagerUsers() {
  try {
    console.log('🔗 데이터베이스 연결 중...');
    await sequelize.authenticate();
    console.log('✅ 데이터베이스 연결 성공');

    console.log('🗂️  데이터베이스 동기화 중...');
    await sequelize.sync();
    console.log('✅ 데이터베이스 동기화 완료');

    console.log('👥 매니저 사용자 생성 시작...\n');

    for (const userData of managerUsers) {
      try {
        // 기존 사용자 확인
        const existingUser = await User.findOne({ where: { email: userData.email } });

        if (existingUser) {
          console.log(`⚠️  사용자 이미 존재: ${userData.email}`);

          // 비밀번호 해시 확인 및 업데이트
          const isValidPassword = await bcrypt.compare(userData.password, existingUser.password);
          let needsUpdate = false;
          const updateData = {};

          if (!isValidPassword) {
            console.log(`🔐 비밀번호 업데이트 중: ${userData.email}`);
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            updateData.password = hashedPassword;
            needsUpdate = true;
          }

          // 역할 업데이트 확인
          if (existingUser.role !== userData.role) {
            console.log(`👤 역할 업데이트: ${userData.email} (${existingUser.role} → ${userData.role})`);
            updateData.role = userData.role;
            needsUpdate = true;
          }

          if (needsUpdate) {
            await existingUser.update(updateData);
            console.log(`✅ 사용자 업데이트 완료: ${userData.email}`);
          } else {
            console.log(`✅ 사용자 정보 이미 최신: ${userData.email}`);
          }
          continue;
        }

        // 새 사용자 생성
        console.log(`👤 사용자 생성 중: ${userData.email}`);
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const newUser = await User.create({
          ...userData,
          password: hashedPassword
        });

        console.log(`✅ 사용자 생성 완료: ${userData.email} (ID: ${newUser.id})`);

      } catch (userError) {
        console.error(`❌ 사용자 처리 실패 (${userData.email}):`, userError.message);
      }
    }

    console.log('\n🎉 매니저 사용자 설정 완료!');
    console.log('\n📋 생성된 계정 정보:');
    console.log('==================================');

    managerUsers.forEach(user => {
      console.log(`• ${user.role}: ${user.email} / ${user.password}`);
    });

    console.log('==================================\n');

  } catch (error) {
    console.error('❌ 매니저 사용자 설정 실패:', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

// 스크립트 실행
setupManagerUsers();