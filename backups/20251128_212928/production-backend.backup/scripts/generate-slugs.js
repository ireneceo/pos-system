const Restaurant = require('../models/Restaurant');

// Function to generate slug from name
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\s-]/g, '') // Remove special characters, keep Korean
    .replace(/[\s_]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

async function generateSlugsForExistingRestaurants() {
  try {
    console.log('Starting slug generation for existing restaurants...');

    // Get all restaurants without slug
    const restaurants = await Restaurant.findAll({
      where: {
        slug: null
      }
    });

    console.log(`Found ${restaurants.length} restaurants without slug`);

    for (const restaurant of restaurants) {
      let slug = generateSlug(restaurant.name);
      let counter = 1;

      // Check if slug already exists, add counter if needed
      while (await Restaurant.findOne({ where: { slug } })) {
        slug = `${generateSlug(restaurant.name)}-${counter}`;
        counter++;
      }

      await restaurant.update({ slug });
      console.log(`✓ Generated slug for "${restaurant.name}": ${slug}`);
    }

    console.log('Slug generation completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error generating slugs:', error);
    process.exit(1);
  }
}

generateSlugsForExistingRestaurants();
