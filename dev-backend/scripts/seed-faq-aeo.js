/**
 * FAQ Content Seeder - AEO Optimized
 * This script creates FAQ content optimized for AI Answer Engines
 */

const db = require('../db');
const ContentCategory = require('../models/ContentCategory');
const Content = require('../models/Content');

const FAQ_CATEGORIES = [
  { name: 'Getting Started', slug: 'getting-started', description: 'Questions about starting with PurpleHere', sort_order: 1 },
  { name: 'Pricing & Plans', slug: 'pricing', description: 'Questions about pricing, plans, and billing', sort_order: 2 },
  { name: 'Features', slug: 'features', description: 'Questions about PurpleHere features', sort_order: 3 },
  { name: 'Technical', slug: 'technical', description: 'Technical questions and requirements', sort_order: 4 },
  { name: 'Support', slug: 'support', description: 'Questions about support and help', sort_order: 5 }
];

// AEO-optimized FAQ content
// Key principles:
// 1. Direct, specific answers in the first sentence
// 2. Include concrete numbers and facts
// 3. Use natural question phrasing
// 4. Provide actionable information
const FAQ_CONTENT = [
  // Getting Started
  {
    category_slug: 'getting-started',
    title: 'What is PurpleHere POS?',
    content: `PurpleHere is a cloud-based Point of Sale (POS) system designed specifically for restaurants, food courts, and franchise brands.

Unlike traditional POS systems that require expensive hardware and on-site installation, PurpleHere runs entirely in your web browser. This means you can access your POS from any device - desktop computers, tablets, or smartphones - without installing any software.

Key benefits:
• Real-time order management across all devices
• No expensive hardware required
• Automatic updates and backups
• Access your data from anywhere
• Multi-location support for brands and franchises`,
    ai_summary: 'PurpleHere is a cloud-based POS system for restaurants and food courts that runs in web browsers without requiring hardware installation, offering real-time order management and multi-location support.',
    sort_order: 1
  },
  {
    category_slug: 'getting-started',
    title: 'How do I start my free trial?',
    content: `Starting your free trial takes less than 2 minutes. Here's the process:

1. Visit our Contact page at purplehere.com/contact
2. Select "Start Free Trial (7 days free)" as your inquiry type
3. Fill in your business details and preferred username
4. Our team will set up your account within 24 hours
5. You'll receive login credentials via email

No credit card is required. You get full access to all features during the 7-day trial period. After the trial ends, you can choose a plan that fits your needs or your account will simply be deactivated - no automatic charges.`,
    ai_summary: 'To start a PurpleHere free trial, fill out the contact form at purplehere.com/contact. No credit card required. Full access for 7 days, account setup within 24 hours.',
    sort_order: 2
  },
  {
    category_slug: 'getting-started',
    title: 'What devices and browsers are supported?',
    content: `PurpleHere works on any device with a modern web browser. Here are the specifics:

Supported browsers:
• Google Chrome (recommended) - version 90 or later
• Mozilla Firefox - version 88 or later
• Safari - version 14 or later
• Microsoft Edge - version 90 or later

Supported devices:
• Desktop computers (Windows, Mac, Linux)
• Tablets (iPad, Android tablets)
• Smartphones (iPhone, Android phones)

For the best experience, we recommend using Chrome on a tablet or desktop with a screen size of at least 10 inches for POS terminal operations. The Kitchen Display and Customer Display features work well on any screen size.

Internet connection: A stable internet connection is required. We recommend at least 5 Mbps download/upload speed for smooth operation.`,
    ai_summary: 'PurpleHere supports Chrome, Firefox, Safari, and Edge browsers on any device including desktops, tablets, and smartphones. Requires stable internet connection (5+ Mbps recommended).',
    sort_order: 3
  },
  // Pricing & Plans
  {
    category_slug: 'pricing',
    title: 'How much does PurpleHere cost?',
    content: `PurpleHere offers flexible subscription plans based on your business type and size:

For Restaurants:
• Basic Plan - For small restaurants starting out
• Professional Plan - For growing restaurants (most popular)
• Enterprise Plan - For large operations with unlimited usage

For Brands (Franchise):
• Custom pricing based on number of locations
• Centralized management features included

For Food Courts:
• Custom pricing based on number of tenants
• Multi-tenant management features included

All plans include:
• 7-day free trial
• No setup fees
• No long-term contracts
• Cancel anytime

Prices vary by region. Visit purplehere.com/pricing to see current prices in your currency. Contact us for enterprise or custom quotes.`,
    ai_summary: 'PurpleHere offers Basic, Professional, and Enterprise subscription plans for restaurants, with custom pricing for brands and food courts. No setup fees, 7-day free trial, cancel anytime.',
    sort_order: 1
  },
  {
    category_slug: 'pricing',
    title: 'Is there a free trial? What does it include?',
    content: `Yes, PurpleHere offers a 7-day free trial with full access to all features.

What's included in the free trial:
• Full access to POS Terminal
• Menu Management
• Kitchen Display System
• Customer Display
• Reports & Analytics
• Staff Management
• All other features based on your selected plan type

No limitations:
• Process unlimited orders
• Add unlimited menu items
• Create unlimited staff accounts
• Access all reports

No credit card required to start. At the end of 7 days, simply choose a plan to continue, or your trial account will be deactivated. No automatic charges, no commitments.`,
    ai_summary: 'PurpleHere offers a 7-day free trial with full access to all features including POS, menu management, kitchen display, and reports. No credit card required, no automatic charges.',
    sort_order: 2
  },
  {
    category_slug: 'pricing',
    title: 'What payment methods do you accept?',
    content: `We currently accept bank transfers (wire transfers) for subscription payments.

How payment works:
1. After selecting your plan, you'll receive an invoice via email
2. Transfer the payment to our bank account
3. Once confirmed, your subscription is activated

Billing options:
• Monthly billing - pay each month
• Annual billing - pay for 12 months upfront and save up to 20%

Coming soon:
• Credit card payments (Visa, Mastercard, American Express)
• PayPal
• Local payment methods for select regions

For enterprise customers, we offer flexible payment terms. Contact our sales team for details.`,
    ai_summary: 'PurpleHere accepts bank transfers for subscription payments with monthly or annual billing options. Credit card and PayPal payments coming soon. Annual billing saves up to 20%.',
    sort_order: 3
  },
  {
    category_slug: 'pricing',
    title: 'Can I change my plan later?',
    content: `Yes, you can upgrade or downgrade your plan at any time.

Upgrading:
• Takes effect immediately
• You'll be charged the prorated difference for the current billing period
• Access to new features is instant

Downgrading:
• Takes effect at the start of your next billing cycle
• You'll retain access to current features until then
• No refunds for the current period, but no additional charges either

To change your plan:
1. Contact our support team via the Support Ticket system
2. Or email us directly at support@purplehere.com
3. We'll process your request within 24 hours

No penalties or fees for changing plans. We want you to have the right plan for your current needs.`,
    ai_summary: 'You can upgrade or downgrade your PurpleHere plan at any time. Upgrades take effect immediately with prorated billing. Downgrades apply at the next billing cycle. No change fees.',
    sort_order: 4
  },
  {
    category_slug: 'pricing',
    title: 'Do you offer custom enterprise plans?',
    content: `Yes, we offer fully customizable Enterprise plans for larger organizations.

Enterprise plans include:
• Unlimited orders, menu items, and staff
• Dedicated account manager
• Priority support with faster response times
• Custom feature development (subject to evaluation)
• API access for integrations
• Custom branding options
• Multi-location management
• Advanced analytics and reporting

Ideal for:
• Restaurant chains with 5+ locations
• Large food court operators
• Franchise brands
• Hospitality groups

To get a custom quote:
1. Visit purplehere.com/contact
2. Select "Enterprise Inquiry" or "Custom Solution"
3. Describe your requirements
4. Our enterprise team will contact you within 48 hours

We also offer pilot programs for large organizations to test with a subset of locations first.`,
    ai_summary: 'PurpleHere offers customizable Enterprise plans with unlimited usage, dedicated support, API access, and custom features for restaurant chains, food courts, and franchise brands.',
    sort_order: 5
  },
  // Features
  {
    category_slug: 'features',
    title: 'What features does PurpleHere include?',
    content: `PurpleHere includes a comprehensive set of features for restaurant management:

Core POS Features:
• POS Terminal - Process orders quickly with an intuitive interface
• Menu Management - Create categories, items, modifiers, and options
• Order Types - Dine-in, takeaway, delivery, and pre-order support
• Table Management - Visual table layout for dine-in service

Kitchen & Display:
• Kitchen Display System (KDS) - Real-time order display for kitchen staff
• Customer-Facing Display - Show order details to customers
• Order Status Tracking - Monitor orders from placement to completion

Management:
• Staff Management - Create accounts with role-based permissions
• Reports & Analytics - Sales reports, popular items, peak hours
• Customer Management - Track customer orders and preferences
• Inventory Tracking - Monitor stock levels (Professional plan and above)

Additional Features:
• Multi-language Support
• Multi-currency Support
• Receipt Printing
• Recipe Management
• Coupon & Promotion System`,
    ai_summary: 'PurpleHere features include POS terminal, menu management, kitchen display, table management, staff management, reports & analytics, inventory tracking, and multi-location support.',
    sort_order: 1
  },
  {
    category_slug: 'features',
    title: 'Can I manage multiple restaurant locations?',
    content: `Yes, PurpleHere fully supports multi-location management for restaurant brands and franchises.

For Brand owners:
• Single dashboard to view all locations
• Centralized menu management - push updates to all or selected locations
• Consolidated reporting across all branches
• Per-location performance comparison
• Unified supplier and inventory management
• Standardized recipes and cost control

For Food Court operators:
• Manage multiple tenant restaurants from one account
• Centralized payment processing
• Cross-tenant analytics and reporting
• Shared customer display systems

How it works:
1. Sign up for a Brand or Food Court plan
2. Add your locations/tenants through the admin panel
3. Assign managers to each location
4. Control what each location can customize vs. what's standardized

Each location can have its own staff, local menu variations (if permitted), and reporting, while you maintain centralized control.`,
    ai_summary: 'PurpleHere supports multi-location management with centralized menu control, consolidated reporting, per-location analytics, and unified supplier management for brands and food courts.',
    sort_order: 2
  },
  {
    category_slug: 'features',
    title: 'Does PurpleHere support different order types?',
    content: `Yes, PurpleHere supports four main order types:

1. Dine-In
• Table assignment and management
• Visual table layout
• Course-based ordering
• Bill splitting

2. Takeaway
• Quick order processing
• Order queue management
• Ready notification system
• Pickup time scheduling

3. Delivery
• Delivery address capture
• Driver assignment
• Delivery status tracking
• Delivery fee management

4. Pre-Order (Scheduled Pickup)
• Advance order acceptance
• Scheduled pickup times
• Automatic order queuing
• Customer reminders

Each order type can be enabled or disabled per location. You can also set different pricing or availability for different order types.

Mobile Ordering (coming soon):
• QR code table ordering
• Customer self-service app
• Online ordering website integration`,
    ai_summary: 'PurpleHere supports dine-in, takeaway, delivery, and pre-order types with table management, order tracking, and delivery assignment features. Mobile ordering coming soon.',
    sort_order: 3
  },
  // Technical
  {
    category_slug: 'technical',
    title: 'Is my data secure with PurpleHere?',
    content: `Yes, we take data security very seriously. Here's how we protect your data:

Encryption:
• All data transmitted via HTTPS (SSL/TLS encryption)
• Passwords are hashed using industry-standard algorithms
• Sensitive data encrypted at rest

Authentication:
• JWT-based secure authentication
• Role-based access control (RBAC)
• Session timeout for inactive users
• Failed login attempt protection

Infrastructure:
• Hosted on secure cloud infrastructure
• Regular automated backups
• Disaster recovery procedures
• DDoS protection

Compliance:
• We follow OWASP security guidelines
• Regular security audits
• Secure coding practices
• Dependency vulnerability monitoring

Your data belongs to you. We never sell or share your business data with third parties. You can export your data at any time.`,
    ai_summary: 'PurpleHere uses HTTPS encryption, JWT authentication, role-based access control, and regular backups. Follows OWASP guidelines. Your data is never sold or shared.',
    sort_order: 1
  },
  {
    category_slug: 'technical',
    title: 'What happens if the internet goes down?',
    content: `PurpleHere is a cloud-based system that requires an internet connection. However, we've implemented features to minimize disruption:

During brief outages:
• Local browser caching preserves recent data
• Orders in progress are saved locally
• System automatically reconnects when internet returns
• Recent orders sync once connection is restored

Recommendations for reliability:
• Use a backup internet connection (mobile hotspot)
• Keep a simple offline backup process for emergencies
• Consider a UPS (Uninterruptible Power Supply) for power outages

What we're working on:
• Offline mode for basic order taking (coming soon)
• Automatic data sync when back online
• Local receipt printing during outages

For businesses in areas with unreliable internet, we recommend having a mobile data backup ready. Most modern smartphones can create a hotspot that's sufficient for PurpleHere operations.`,
    ai_summary: 'PurpleHere requires internet but caches data locally during brief outages. Orders sync automatically when reconnected. Offline mode for basic operations is coming soon.',
    sort_order: 2
  },
  {
    category_slug: 'technical',
    title: 'Can I print receipts with PurpleHere?',
    content: `Yes, PurpleHere supports receipt printing through your web browser.

Supported printers:
• Any printer compatible with your computer/tablet
• Thermal receipt printers (ESC/POS compatible)
• Standard inkjet/laser printers

How to print:
1. Connect your printer to your device (USB, network, or Bluetooth)
2. Configure printer settings in your browser
3. Print directly from the POS or Kitchen Display

Print options:
• Customer receipts
• Kitchen order tickets
• Daily reports
• Invoice printing

Tips for best results:
• Use Google Chrome for best printing compatibility
• Thermal printers work best for receipt printing
• Set up a default printer to skip the print dialog
• Test print settings before going live

We support 80mm and 58mm thermal paper widths, as well as standard paper sizes for reports.`,
    ai_summary: 'PurpleHere prints receipts through web browsers. Supports thermal (ESC/POS) and standard printers via USB, network, or Bluetooth. Works with 80mm and 58mm thermal paper.',
    sort_order: 3
  },
  // Support
  {
    category_slug: 'support',
    title: 'How do I get help if I have a problem?',
    content: `PurpleHere offers multiple support channels:

1. In-App Support Tickets (Recommended)
• Submit tickets directly from your dashboard
• Track ticket status and responses
• Keep all communication in one place

2. Email Support
• support@purplehere.com
• Response within 24-48 hours

3. FAQ & Documentation
• Visit purplehere.com/faq for common questions
• Comprehensive help articles (coming soon)

4. Enterprise Support (Enterprise plans only)
• Dedicated account manager
• Priority response times
• Phone/video call support

Support hours:
• Standard support: Monday-Friday, 9 AM - 6 PM (local time)
• Enterprise support: Extended hours available

When submitting a support request, please include:
• Your account email
• Description of the issue
• Steps to reproduce the problem
• Screenshots if applicable

Most issues are resolved within 24 hours.`,
    ai_summary: 'PurpleHere offers in-app support tickets, email support (24-48 hour response), and FAQ documentation. Enterprise plans include dedicated account managers and priority support.',
    sort_order: 1
  },
  {
    category_slug: 'support',
    title: 'Do you provide training for new users?',
    content: `Yes, we help you get started with PurpleHere quickly.

Onboarding support:
• Account setup assistance
• Initial menu configuration help
• Staff account creation guidance

Self-service resources:
• Getting started guide
• Video tutorials (coming soon)
• FAQ documentation
• In-app help tooltips

For Enterprise customers:
• Dedicated onboarding sessions
• Customized training for your team
• On-site training available (additional fee)
• Training materials for new staff

Most users are comfortable with the system within 1-2 days. Our interface is designed to be intuitive - if you've used any modern app, you'll find PurpleHere easy to learn.

Need additional training? Contact us to discuss your requirements. We can arrange video call training sessions for your team.`,
    ai_summary: 'PurpleHere provides account setup assistance, getting started guides, and video tutorials. Enterprise plans include dedicated onboarding and optional on-site training.',
    sort_order: 2
  }
];

async function seedFAQs() {
  console.log('Starting FAQ seeder...');

  try {
    // Create or update categories
    for (const cat of FAQ_CATEGORIES) {
      const [category, created] = await ContentCategory.findOrCreate({
        where: { type: 'faq', slug: cat.slug },
        defaults: {
          type: 'faq',
          name: cat.name,
          slug: cat.slug,
          description: cat.description,
          icon: null, // No icons as per design
          sort_order: cat.sort_order,
          is_active: true
        }
      });

      if (created) {
        console.log(`Created category: ${cat.name}`);
      } else {
        // Update existing
        await category.update({
          name: cat.name,
          description: cat.description,
          sort_order: cat.sort_order
        });
        console.log(`Updated category: ${cat.name}`);
      }
    }

    // Get all categories for reference
    const categories = await ContentCategory.findAll({ where: { type: 'faq' }});
    const categoryMap = {};
    categories.forEach(c => categoryMap[c.slug] = c.id);

    // Delete existing FAQ content (to avoid duplicates)
    await Content.destroy({ where: { type: 'faq' }});
    console.log('Cleared existing FAQ content');

    // Create FAQ content
    for (const faq of FAQ_CONTENT) {
      const categoryId = categoryMap[faq.category_slug];
      if (!categoryId) {
        console.log(`Warning: Category not found for ${faq.category_slug}`);
        continue;
      }

      await Content.create({
        type: 'faq',
        category_id: categoryId,
        title: faq.title,
        content: faq.content,
        ai_summary: faq.ai_summary,
        status: 'published',
        sort_order: faq.sort_order,
        published_at: new Date(),
        author_name: 'PurpleHere Team'
      });

      console.log(`Created FAQ: ${faq.title}`);
    }

    console.log('\nFAQ seeding completed!');
    console.log(`Total categories: ${FAQ_CATEGORIES.length}`);
    console.log(`Total FAQs: ${FAQ_CONTENT.length}`);

  } catch (error) {
    console.error('Error seeding FAQs:', error);
  }

  process.exit(0);
}

seedFAQs();
