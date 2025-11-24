/**
 * Fix Restaurant Slugs Script
 *
 * This script generates slugs for restaurants that have NULL slugs.
 * It uses the same slug generation logic as the Restaurant model hooks.
 *
 * Usage:
 *   node scripts/fix-restaurant-slugs.js
 */

const Restaurant = require('../models/Restaurant');
const { sequelize } = require('../config/database');

// Helper function to generate URL-friendly slug
function generateSlug(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')          // Replace spaces with hyphens
    .replace(/-+/g, '-')           // Replace multiple hyphens with single hyphen
    .substring(0, 100);            // Limit length
}

async function fixRestaurantSlugs() {
  try {
    console.log('🔍 Finding restaurants with NULL slugs...\n');

    // Find all restaurants with NULL slugs
    const restaurants = await Restaurant.findAll({
      where: {
        slug: null
      }
    });

    if (restaurants.length === 0) {
      console.log('✅ No restaurants with NULL slugs found. All good!');
      return;
    }

    console.log(`📋 Found ${restaurants.length} restaurant(s) with NULL slugs:\n`);

    // Display restaurants before update
    restaurants.forEach(restaurant => {
      console.log(`   - ID ${restaurant.id}: "${restaurant.name}" (slug: ${restaurant.slug})`);
    });

    console.log('\n🔧 Generating slugs...\n');

    // Update each restaurant
    const updates = [];
    for (const restaurant of restaurants) {
      let slug = generateSlug(restaurant.name);
      let baseSlug = slug;
      let counter = 1;

      // Ensure unique slug
      while (await Restaurant.findOne({ where: { slug: slug } })) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }

      // Update the restaurant
      await restaurant.update({ slug: slug });

      updates.push({
        id: restaurant.id,
        name: restaurant.name,
        oldSlug: null,
        newSlug: slug
      });

      console.log(`   ✅ ID ${restaurant.id}: "${restaurant.name}" → slug: "${slug}"`);
    }

    console.log('\n✅ All restaurant slugs have been generated successfully!\n');
    console.log('📊 Summary:');
    console.log(`   - Total updated: ${updates.length}`);
    console.log(`   - Mobile order URLs are now available at: ${process.env.SITE_URL}/mobile/:slug/menu`);

    console.log('\n🔗 Updated restaurant URLs:');
    updates.forEach(update => {
      console.log(`   - ${update.name}: ${process.env.SITE_URL}/mobile/${update.newSlug}/menu`);
    });

  } catch (error) {
    console.error('❌ Error fixing restaurant slugs:', error);
    throw error;
  } finally {
    await sequelize.close();
  }
}

// Run the script
if (require.main === module) {
  fixRestaurantSlugs()
    .then(() => {
      console.log('\n✅ Script completed successfully!');
      process.exit(0);
    })
    .catch(error => {
      console.error('\n❌ Script failed:', error);
      process.exit(1);
    });
}

module.exports = { fixRestaurantSlugs, generateSlug };
