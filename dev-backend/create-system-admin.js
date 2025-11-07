const bcrypt = require('bcryptjs');
const { User } = require('./models');
const { syncDatabase } = require('./db');

async function createSystemAdmin() {
  try {
    await syncDatabase();
    
    // 기존 시스템 관리자 확인
    const existingAdmin = await User.findOne({ 
      where: { email: 'sysadmin@orderhere.kr' } 
    });
    
    if (existingAdmin) {
      console.log('✅ 시스템 관리자 계정이 이미 존재합니다.');
      console.log('이메일:', existingAdmin.email);
      console.log('역할:', existingAdmin.role);
      return;
    }
    
    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash('sysadmin123!', 12);
    
    // 시스템 관리자 생성
    const systemAdmin = await User.create({
      username: 'sysadmin',
      email: 'sysadmin@orderhere.kr',
      password: hashedPassword,
      role: 'System Admin',
      full_name: 'System Administrator',
      company_name: 'OrderHere System',
      position: 'System Administrator',
      department: 'IT Management',
      phone: '02-1234-5678',
      address: 'Seoul, South Korea'
    });
    
    console.log('✅ 시스템 관리자 계정이 생성되었습니다!');
    console.log('==========================================');
    console.log('이메일: sysadmin@orderhere.kr');
    console.log('비밀번호: sysadmin123!');
    console.log('역할: System Admin');
    console.log('이름: System Administrator');
    console.log('==========================================');
    
  } catch (error) {
    console.error('❌ 시스템 관리자 계정 생성 실패:', error.message);
  }
}

createSystemAdmin();
