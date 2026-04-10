// 환경 설정 로드
require('./config/env-loader')();

// 데이터베이스 연결
const { sequelize } = require('./config/database.js');

// 모델들 import
const User = require('./models/User');
const Restaurant = require('./models/Restaurant');
const Order = require('./models/Order');
const Product = require('./models/Product');

async function createRealisticData() {
  try {
    console.log('🔄 Creating realistic POS system data...');

    // 1. 먼저 K-DINE 레스토랑 생성 (로그인 계정들과 연결)
    console.log('🏪 Creating K-DINE restaurant...');
    const kdineRestaurant = await Restaurant.create({
      name: 'K-DINE Korean BBQ',
      admin_id: 8, // manager@kdine.com 계정
      admin_name: 'K-DINE Chain Manager',
      email: 'manager@kdine.com',
      phone: '+60 3-2142 8888',
      address: 'Lot G-23, Ground Floor, Sunway Pyramid Mall, Bandar Sunway, 47500 Subang Jaya, Selangor',
      plan_type: 'Professional Plan',
      plan_amount: 79.00,
      status: 'active',
      subscription_start: new Date(),
      subscription_end: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1년 후
      created_by: 1, // System Admin
      order_limit: 5000,
      menu_item_limit: 200,
      staff_limit: 15
    });
    console.log(`✓ Created K-DINE restaurant (ID: ${kdineRestaurant.id})`);

    // 2. 추가 레스토랑들 생성
    console.log('🏪 Creating additional restaurants...');
    const nasiLemakRestaurant = await Restaurant.create({
      name: 'Nasi Lemak Wangi',
      admin_id: 3, // admin@nasilemak.com
      admin_name: 'Ahmad Rahman',
      email: 'admin@nasilemak.com',
      phone: '+60 3-7956 1234',
      address: 'No. 15, Jalan Alor, Bukit Bintang, 50200 Kuala Lumpur',
      plan_type: 'Basic Plan',
      plan_amount: 29.00,
      status: 'active',
      subscription_start: new Date(),
      subscription_end: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      created_by: 1,
      order_limit: 1000,
      menu_item_limit: 50,
      staff_limit: 5
    });

    const kueyTeowRestaurant = await Restaurant.create({
      name: 'Kuey Teow Kung Fu',
      admin_id: 4, // admin@kueyteow.com
      admin_name: 'Sarah Lim',
      email: 'admin@kueyteow.com',
      phone: '+60 3-4141 5678',
      address: 'Shop 12, Jalan SS15/4D, Ss 15, 47500 Subang Jaya, Selangor',
      plan_type: 'Basic Plan',
      plan_amount: 29.00,
      status: 'active',
      subscription_start: new Date(),
      subscription_end: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      created_by: 1,
      order_limit: 1000,
      menu_item_limit: 50,
      staff_limit: 5
    });

    const koreanBBQRestaurant = await Restaurant.create({
      name: 'Seoul Garden BBQ',
      admin_id: 5, // admin@koreanbbq.com
      admin_name: 'David Kim',
      email: 'admin@koreanbbq.com',
      phone: '+60 3-2110 9999',
      address: 'Level 4, Pavilion KL, 168 Jalan Bukit Bintang, 55100 Kuala Lumpur',
      plan_type: 'Enterprise Plan',
      plan_amount: 199.00,
      status: 'active',
      subscription_start: new Date(),
      subscription_end: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      created_by: 1,
      order_limit: -1, // Unlimited
      menu_item_limit: -1,
      staff_limit: -1
    });

    console.log('✓ Created additional restaurants');

    // 3. 사용자들의 restaurant_id 업데이트
    console.log('👥 Updating user restaurant associations...');

    // K-DINE 직원들
    await User.update({ restaurant_id: kdineRestaurant.id }, { where: { id: 6 } }); // admin@kdine.com
    await User.update({ restaurant_id: kdineRestaurant.id }, { where: { id: 7 } }); // staff@kdine.com
    await User.update({ restaurant_id: kdineRestaurant.id }, { where: { id: 8 } }); // manager@kdine.com

    // 다른 레스토랑 관리자들
    await User.update({ restaurant_id: nasiLemakRestaurant.id }, { where: { id: 3 } }); // admin@nasilemak.com
    await User.update({ restaurant_id: kueyTeowRestaurant.id }, { where: { id: 4 } }); // admin@kueyteow.com
    await User.update({ restaurant_id: koreanBBQRestaurant.id }, { where: { id: 5 } }); // admin@koreanbbq.com

    console.log('✓ Updated user restaurant associations');

    // 4. K-DINE 메뉴 아이템 생성
    console.log('🍽️ Creating K-DINE menu items...');
    const kdineProducts = [
      // 메인 BBQ 메뉴
      { name: 'Premium Beef Bulgogi', price: 68.00, category: 'BBQ Main', description: 'Marinated premium beef with traditional Korean sauce' },
      { name: 'Pork Galbi', price: 58.00, category: 'BBQ Main', description: 'Tender pork ribs with sweet soy glaze' },
      { name: 'Chicken Dakgalbi', price: 48.00, category: 'BBQ Main', description: 'Spicy chicken with vegetables' },
      { name: 'Seafood Pancake', price: 35.00, category: 'Appetizer', description: 'Crispy pancake with fresh seafood' },

      // 한식 메인
      { name: 'Bibimbap', price: 32.00, category: 'Rice Bowl', description: 'Mixed rice with vegetables and meat' },
      { name: 'Kimchi Jjigae', price: 28.00, category: 'Soup', description: 'Spicy kimchi stew with pork' },
      { name: 'Japchae', price: 25.00, category: 'Noodles', description: 'Sweet potato noodles with vegetables' },

      // 음료
      { name: 'Korean Iced Tea', price: 8.00, category: 'Beverage', description: 'Traditional Korean barley tea' },
      { name: 'Soju', price: 18.00, category: 'Alcohol', description: 'Korean traditional spirit' },
      { name: 'Makgeolli', price: 22.00, category: 'Alcohol', description: 'Korean rice wine' },

      // 디저트
      { name: 'Bingsu', price: 15.00, category: 'Dessert', description: 'Korean shaved ice with toppings' },
      { name: 'Hotteok', price: 12.00, category: 'Dessert', description: 'Sweet Korean pancake' }
    ];

    for (const product of kdineProducts) {
      await Product.create({
        ...product,
        restaurant_id: kdineRestaurant.id
      });
    }

    // 5. 나시 르막 메뉴 아이템 생성
    console.log('🍽️ Creating Nasi Lemak menu items...');
    const nasiLemakProducts = [
      { name: 'Nasi Lemak Ayam Rendang', price: 15.00, category: 'Main Course', description: 'Coconut rice with chicken rendang' },
      { name: 'Nasi Lemak Sambal Sotong', price: 18.00, category: 'Main Course', description: 'Coconut rice with spicy squid' },
      { name: 'Nasi Lemak Daging', price: 20.00, category: 'Main Course', description: 'Coconut rice with beef curry' },
      { name: 'Roti Canai', price: 3.50, category: 'Appetizer', description: 'Malaysian flatbread with curry' },
      { name: 'Teh Tarik', price: 3.00, category: 'Beverage', description: 'Malaysian pulled tea' },
      { name: 'Kopi O', price: 2.50, category: 'Beverage', description: 'Black coffee Malaysian style' },
      { name: 'Cendol', price: 6.00, category: 'Dessert', description: 'Traditional Malaysian dessert' }
    ];

    for (const product of nasiLemakProducts) {
      await Product.create({
        ...product,
        restaurant_id: nasiLemakRestaurant.id
      });
    }

    // 6. 샘플 주문 생성 (최근 몇 일간)
    console.log('📋 Creating sample orders...');

    // K-DINE 주문들
    const kdineOrders = [
      {
        restaurant_id: kdineRestaurant.id,
        order_number: 'KD001',
        customer_name: 'John Lee',
        table_number: 'T05',
        total_amount: 136.00,
        status: 'completed',
        order_type: 'dine_in',
        payment_method: 'Credit Card',
        order_date: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2시간 전
        order_items: JSON.stringify([
          { name: 'Premium Beef Bulgogi', price: 68.00, quantity: 2 }
        ])
      },
      {
        restaurant_id: kdineRestaurant.id,
        order_number: 'KD002',
        customer_name: 'Sarah Kim',
        table_number: 'T12',
        total_amount: 93.00,
        status: 'preparing',
        order_type: 'dine_in',
        payment_method: 'Cash',
        order_date: new Date(Date.now() - 30 * 60 * 1000), // 30분 전
        order_items: JSON.stringify([
          { name: 'Pork Galbi', price: 58.00, quantity: 1 },
          { name: 'Seafood Pancake', price: 35.00, quantity: 1 }
        ])
      }
    ];

    // 나시 르막 주문들
    const nasiLemakOrders = [
      {
        restaurant_id: nasiLemakRestaurant.id,
        order_number: 'NL001',
        customer_name: 'Ahmad Ali',
        table_number: 'A03',
        total_amount: 21.50,
        status: 'completed',
        order_type: 'dine_in',
        payment_method: 'Cash',
        order_date: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4시간 전
        order_items: JSON.stringify([
          { name: 'Nasi Lemak Sambal Sotong', price: 18.00, quantity: 1 },
          { name: 'Teh Tarik', price: 3.50, quantity: 1 }
        ])
      }
    ];

    // 주문 생성
    for (const order of [...kdineOrders, ...nasiLemakOrders]) {
      await Order.create(order);
    }

    console.log('✓ Created sample orders');

    console.log('🎉 Realistic POS data creation completed!');
    console.log('\n📊 Summary:');
    console.log('- 4 Restaurants created with proper management structure');
    console.log('- 19 Menu items for K-DINE Korean BBQ');
    console.log('- 7 Menu items for Nasi Lemak Wangi');
    console.log('- Sample orders for testing');
    console.log('- All login accounts properly connected to restaurants');

    console.log('\n🔑 Test Login Accounts:');
    console.log('- admin@orderhere.com / admin123 (System Admin)');
    console.log('- manager@kdine.com / manager123 (K-DINE Chain Manager)');
    console.log('- admin@kdine.com / restaurant123 (K-DINE Restaurant Admin)');
    console.log('- staff@kdine.com / staff123 (K-DINE Staff)');
    console.log('- admin@nasilemak.com / admin123 (Nasi Lemak Admin)');
    console.log('- admin@kueyteow.com / admin123 (Kuey Teow Admin)');

  } catch (error) {
    console.error('✗ Error creating realistic data:', error);
  }
}

// 실행
createRealisticData().then(() => {
  console.log('✓ Data creation script completed');
  process.exit(0);
}).catch(error => {
  console.error('✗ Script failed:', error);
  process.exit(1);
});