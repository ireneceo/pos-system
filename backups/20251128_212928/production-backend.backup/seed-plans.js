const fs = require('fs');
const path = require('path');

// Load environment-specific config
if (fs.existsSync(path.join(__dirname, '.env.codespace'))) {
  require('dotenv').config({ path: '.env.codespace' });
} else {
  require('dotenv').config();
}

const PlanTemplate = require('./models/PlanTemplate');

const seedPlans = async () => {
  try {
    // Wait a bit for database to be ready
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Sync the PlanTemplate model
    await PlanTemplate.sync({ alter: true });

    // Default plans data
    const defaultPlans = [
      {
        name: 'basic',
        display_name: 'Basic Plan',
        base_price_monthly: 29,
        base_price_annual: 290,
        order_limit: 1000,
        menu_item_limit: 50,
        staff_limit: 5,
        features: [
          'Up to 1,000 orders/month',
          'Up to 50 menu items',
          'Up to 5 staff accounts',
          'Basic analytics',
          'Community support',
          'Standard POS features'
        ],
        is_active: true,
        sort_order: 1
      },
      {
        name: 'professional',
        display_name: 'Professional Plan',
        base_price_monthly: 99,
        base_price_annual: 990,
        order_limit: 10000,
        menu_item_limit: 200,
        staff_limit: 20,
        features: [
          'Up to 10,000 orders/month',
          'Up to 200 menu items',
          'Up to 20 staff accounts',
          'Advanced analytics',
          'Email support',
          'Inventory management',
          'Customer loyalty program',
          'Multi-location support'
        ],
        is_active: true,
        sort_order: 2
      },
      {
        name: 'enterprise',
        display_name: 'Enterprise Plan',
        base_price_monthly: 199,
        base_price_annual: 2190,
        order_limit: -1,
        menu_item_limit: -1,
        staff_limit: -1,
        features: [
          'Unlimited orders',
          'Unlimited menu items',
          'Unlimited staff accounts',
          'Premium analytics & reports',
          'Priority 24/7 support',
          'Custom branding',
          'API access',
          'Dedicated account manager',
          'Custom integrations',
          'Training sessions'
        ],
        is_active: true,
        sort_order: 3
      }
    ];

    // Insert or update plans
    for (const plan of defaultPlans) {
      await PlanTemplate.upsert(plan, {
        conflictFields: ['name']
      });
      console.log(`✅ Seeded plan: ${plan.display_name}`);
    }

    console.log('✅ All plans seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding plans:', error);
    process.exit(1);
  }
};

seedPlans();