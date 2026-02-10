const { sequelize } = require('./config/database');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const Invoice = require('./models/Invoice');
const InvoiceItem = require('./models/InvoiceItem');
const InvoiceSettings = require('./models/InvoiceSettings');
const Restaurant = require('./models/Restaurant');
const SupportTicket = require('./models/SupportTicket');
const OptionGroup = require('./models/OptionGroup');
const Option = require('./models/Option');
const EntityPlan = require('./models/EntityPlan');
const EntityPlanRestaurant = require('./models/EntityPlanRestaurant');

async function syncDatabase() {
  try {
    // Test connection
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    // Initialize model associations
    const models = { User, Product, Order, Invoice, InvoiceItem, InvoiceSettings, Restaurant, SupportTicket, OptionGroup, Option, EntityPlan, EntityPlanRestaurant };
    Object.keys(models).forEach(modelName => {
      if (models[modelName].associate) {
        models[modelName].associate(models);
      }
    });
    console.log('✅ Model associations initialized.');

    // Sync all models
    // WARNING: { alter: true } can reset ENUM column values to their defaults!
    // Use { alter: false } for production to preserve existing data
    // Only use { alter: true } when you need to add new columns (run manually)
    await sequelize.sync({ alter: false });
    
    console.log('✅ All models were synchronized successfully.');
    
    // Check if we need to seed initial data
    const userCount = await User.count();
    if (userCount === 0) {
      console.log('📝 Seeding initial data...');
      
      // Create default admin user
      const bcrypt = require('bcrypt');
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      await User.create({
        username: 'admin',
        email: 'admin@pos-system.com',
        password: hashedPassword,
        role: 'System Admin',
        full_name: 'System Administrator',
        company_name: 'OrderHere',
        position: 'System Admin',
        department: 'IT'
      });
      
      // Create sample managers
      const manager1 = await User.create({
        username: 'john_manager',
        email: 'john@manager.com',
        password: hashedPassword,
        role: 'Manager',
        full_name: 'John Smith',
        company_name: 'Smith Restaurant Group',
        position: 'General Manager',
        department: 'Operations',
        phone: '010-1234-5678',
        address: '123 Business Street, Seoul'
      });
      
      const manager2 = await User.create({
        username: 'jane_manager',
        email: 'jane@manager.com',
        password: hashedPassword,
        role: 'Manager',
        full_name: 'Jane Wilson',
        company_name: 'Wilson Hospitality',
        position: 'Restaurant Manager',
        department: 'Food & Beverage',
        phone: '010-2345-6789',
        address: '456 Manager Ave, Seoul'
      });
      
      console.log('✅ Initial users created (admin, 2 managers)');
      
      // Create sample restaurants
      await Restaurant.create({
        name: 'Seoul BBQ House',
        admin_id: manager1.id,
        admin_name: manager1.full_name,
        email: 'seoulbbq@example.com',
        phone: '02-1234-5678',
        address: '789 Gangnam-gu, Seoul',
        plan_type: 'Professional Plan',
        plan_amount: 599.00,
        status: 'active'
      });
      
      await Restaurant.create({
        name: 'Downtown Pizza',
        admin_id: manager1.id,
        admin_name: manager1.full_name,
        email: 'downtown@example.com',
        phone: '02-2345-6789',
        address: '123 Jung-gu, Seoul',
        plan_type: 'Basic Plan',
        plan_amount: 299.00,
        status: 'active'
      });
      
      await Restaurant.create({
        name: 'Sunset Cafe',
        admin_id: manager2.id,
        admin_name: manager2.full_name,
        email: 'sunset@example.com',
        phone: '02-3456-7890',
        address: '456 Mapo-gu, Seoul',
        plan_type: 'Enterprise Plan',
        plan_amount: 999.00,
        status: 'active'
      });
      
      await Restaurant.create({
        name: 'Fresh Sushi',
        admin_id: manager2.id,
        admin_name: manager2.full_name,
        email: 'sushi@example.com',
        phone: '02-4567-8901',
        address: '789 Songpa-gu, Seoul',
        plan_type: 'Professional Plan',
        plan_amount: 599.00,
        status: 'active'
      });
      
      console.log('✅ Sample restaurants created');
    }
    
    // Check if we need sample products
    const productCount = await Product.count();
    if (productCount === 0) {
      await Product.bulkCreate([
        {
          name: 'Classic Burger',
          price: 15.90,
          category: 'Burgers',
          description: 'Juicy beef patty with lettuce, tomato, and our special sauce'
        },
        {
          name: 'Cheese Pizza',
          price: 18.90,
          category: 'Pizza',
          description: 'Traditional cheese pizza with mozzarella and tomato sauce'
        },
        {
          name: 'Cola',
          price: 3.50,
          category: 'Drinks',
          description: 'Refreshing cola drink'
        },
        {
          name: 'Chocolate Cake',
          price: 6.90,
          category: 'Desserts',
          description: 'Rich chocolate cake with chocolate frosting'
        }
      ]);
      
      console.log('✅ Sample products created');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Unable to sync database:', error);
    process.exit(1);
  }
}

// Run sync if this file is executed directly
if (require.main === module) {
  syncDatabase();
}