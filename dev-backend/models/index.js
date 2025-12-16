const User = require('./User');
const Restaurant = require('./Restaurant');
const Brand = require('./Brand');
const Invoice = require('./Invoice');
const InvoiceItem = require('./InvoiceItem');
const InvoiceSettings = require('./InvoiceSettings');
const Order = require('./Order');
const PlanTemplate = require('./PlanTemplate');
const OperationTicket = require('./OperationTicket');
const SupportTicket = require('./SupportTicket');
const RestaurantManager = require('./RestaurantManager');
const Customer = require('./Customer');
const RestaurantCustomer = require('./RestaurantCustomer');
const Product = require('./Product');
const Category = require('./Category');
const OptionGroup = require('./OptionGroup');
const Option = require('./Option');
const AddonModule = require('./AddonModule');
const Recipe = require('./Recipe');
const Ingredient = require('./Ingredient');
const RecipeIngredient = require('./RecipeIngredient');
const RecipeCategory = require('./RecipeCategory');
const IngredientCategory = require('./IngredientCategory');
const SystemSettings = require('./SystemSettings');
const PlanPrice = require('./PlanPrice');
const IngredientCost = require('./IngredientCost');
const RecipeCost = require('./RecipeCost');
const BrandProduct = require('./BrandProduct');
const BrandProductCategory = require('./BrandProductCategory');
const BrandProductOptionGroup = require('./BrandProductOptionGroup');
const BrandProductOption = require('./BrandProductOption');
const BrandProductBrand = require('./BrandProductBrand');
const BrandProductOptionGroupProduct = require('./BrandProductOptionGroupProduct');
const Supplier = require('./Supplier');

// Define associations
// Brand - Restaurant associations
Brand.hasMany(Restaurant, { foreignKey: 'brand_id', as: 'restaurants' });
Restaurant.belongsTo(Brand, { foreignKey: 'brand_id', as: 'brand' });

// Brand - User (owner) associations
Brand.belongsTo(User, { foreignKey: 'owner_id', as: 'owner' });
User.hasMany(Brand, { foreignKey: 'owner_id', as: 'brands' });

// Keep old single manager relationship for backward compatibility
Restaurant.belongsTo(User, { foreignKey: 'manager_id', as: 'manager' });
User.hasMany(Restaurant, { foreignKey: 'manager_id', as: 'managedRestaurants' });

// Add many-to-many relationship for multiple managers
Restaurant.belongsToMany(User, {
  through: RestaurantManager,
  foreignKey: 'restaurant_id',
  otherKey: 'manager_id',
  as: 'managers'
});
User.belongsToMany(Restaurant, {
  through: RestaurantManager,
  foreignKey: 'manager_id',
  otherKey: 'restaurant_id',
  as: 'managedRestaurantsMany'
});

Invoice.belongsTo(Restaurant, { foreignKey: 'restaurant_id', as: 'restaurant' });
Restaurant.hasMany(Invoice, { foreignKey: 'restaurant_id', as: 'invoices' });

InvoiceItem.belongsTo(Invoice, { foreignKey: 'invoice_id', as: 'invoice' });
Invoice.hasMany(InvoiceItem, { foreignKey: 'invoice_id', as: 'items' });

Order.belongsTo(Restaurant, { foreignKey: 'restaurant_id', as: 'restaurant' });
Restaurant.hasMany(Order, { foreignKey: 'restaurant_id', as: 'orders' });

OperationTicket.belongsTo(User, { foreignKey: 'managerId', as: 'manager' });
OperationTicket.belongsTo(User, { foreignKey: 'requesterId', as: 'requester' });
OperationTicket.belongsTo(Restaurant, { foreignKey: 'restaurantId', as: 'restaurant' });

User.hasMany(OperationTicket, { foreignKey: 'managerId', as: 'managedTickets' });
User.hasMany(OperationTicket, { foreignKey: 'requesterId', as: 'requestedTickets' });
Restaurant.hasMany(OperationTicket, { foreignKey: 'restaurantId', as: 'operationTickets' });

// Customer - Restaurant (N:M through RestaurantCustomer)
Customer.belongsToMany(Restaurant, {
  through: RestaurantCustomer,
  foreignKey: 'customer_id',
  otherKey: 'restaurant_id',
  as: 'restaurants'
});
Restaurant.belongsToMany(Customer, {
  through: RestaurantCustomer,
  foreignKey: 'restaurant_id',
  otherKey: 'customer_id',
  as: 'customers'
});

// Customer - Order (1:N) - REMOVED: customer_id column does not exist in orders table
// Customer.hasMany(Order, { foreignKey: 'customer_id', as: 'orders' });
// Order.belongsTo(Customer, { foreignKey: 'customer_id', as: 'customer' });

// RestaurantCustomer associations
RestaurantCustomer.belongsTo(Restaurant, { foreignKey: 'restaurant_id', as: 'restaurant' });
RestaurantCustomer.belongsTo(Customer, { foreignKey: 'customer_id', as: 'customer' });

// Product - Category associations
Product.belongsTo(Category, {
  foreignKey: 'category',
  targetKey: 'name',
  as: 'categoryDetails'
});
Category.hasMany(Product, {
  foreignKey: 'category',
  sourceKey: 'name',
  as: 'products'
});

// Product - Restaurant associations
Product.belongsTo(Restaurant, { foreignKey: 'restaurant_id', as: 'restaurant' });
Restaurant.hasMany(Product, { foreignKey: 'restaurant_id', as: 'products' });

// Category - Restaurant associations
Category.belongsTo(Restaurant, { foreignKey: 'restaurant_id', as: 'restaurant' });
Restaurant.hasMany(Category, { foreignKey: 'restaurant_id', as: 'categories' });

// OptionGroup - Option associations
OptionGroup.hasMany(Option, {
  foreignKey: 'option_group_id',
  as: 'options'
});
Option.belongsTo(OptionGroup, {
  foreignKey: 'option_group_id',
  as: 'optionGroup'
});

// OptionGroup - Restaurant associations
OptionGroup.belongsTo(Restaurant, { foreignKey: 'restaurant_id', as: 'restaurant' });
Restaurant.hasMany(OptionGroup, { foreignKey: 'restaurant_id', as: 'optionGroups' });

// Recipe associations
Recipe.hasMany(RecipeIngredient, { foreignKey: 'recipe_id', as: 'recipeIngredients' });
RecipeIngredient.belongsTo(Recipe, { foreignKey: 'recipe_id', as: 'recipe' });

// Ingredient associations
Ingredient.hasMany(RecipeIngredient, { foreignKey: 'ingredient_id', as: 'recipeIngredients' });
RecipeIngredient.belongsTo(Ingredient, { foreignKey: 'ingredient_id', as: 'ingredient' });

// Recipe - Product association
Product.belongsTo(Recipe, { foreignKey: 'recipe_id', as: 'recipe' });
Recipe.hasMany(Product, { foreignKey: 'recipe_id', as: 'products' });

// PlanPrice - PlanTemplate association
PlanPrice.belongsTo(PlanTemplate, { foreignKey: 'plan_id', as: 'plan' });
PlanTemplate.hasMany(PlanPrice, { foreignKey: 'plan_id', as: 'prices' });

// IngredientCost - Ingredient association
IngredientCost.belongsTo(Ingredient, { foreignKey: 'ingredient_id', as: 'ingredient' });
Ingredient.hasMany(IngredientCost, { foreignKey: 'ingredient_id', as: 'costs' });

// RecipeCost - Recipe association
RecipeCost.belongsTo(Recipe, { foreignKey: 'recipe_id', as: 'recipe' });
Recipe.hasMany(RecipeCost, { foreignKey: 'recipe_id', as: 'costs' });

// RecipeCategory associations
RecipeCategory.belongsTo(Brand, { foreignKey: 'brand_id', as: 'brand' });
Brand.hasMany(RecipeCategory, { foreignKey: 'brand_id', as: 'recipeCategories' });
RecipeCategory.belongsTo(Restaurant, { foreignKey: 'restaurant_id', as: 'restaurant' });
Restaurant.hasMany(RecipeCategory, { foreignKey: 'restaurant_id', as: 'recipeCategories' });

// Recipe - RecipeCategory association
Recipe.belongsTo(RecipeCategory, { foreignKey: 'recipe_category_id', as: 'recipeCategory' });
RecipeCategory.hasMany(Recipe, { foreignKey: 'recipe_category_id', as: 'recipes' });

// IngredientCategory associations
IngredientCategory.belongsTo(Brand, { foreignKey: 'brand_id', as: 'brand' });
Brand.hasMany(IngredientCategory, { foreignKey: 'brand_id', as: 'ingredientCategories' });
IngredientCategory.belongsTo(Restaurant, { foreignKey: 'restaurant_id', as: 'restaurant' });
Restaurant.hasMany(IngredientCategory, { foreignKey: 'restaurant_id', as: 'ingredientCategories' });

// Ingredient - IngredientCategory association
Ingredient.belongsTo(IngredientCategory, { foreignKey: 'ingredient_category_id', as: 'ingredientCategory' });
IngredientCategory.hasMany(Ingredient, { foreignKey: 'ingredient_category_id', as: 'ingredients' });

// Ingredient - BrandProduct association
Ingredient.belongsTo(BrandProduct, { foreignKey: 'brand_product_id', as: 'brandProduct' });
BrandProduct.hasMany(Ingredient, { foreignKey: 'brand_product_id', as: 'ingredients' });

// BrandProduct - Category associations
BrandProduct.belongsTo(BrandProductCategory, { foreignKey: 'category_id', as: 'category' });
BrandProductCategory.hasMany(BrandProduct, { foreignKey: 'category_id', as: 'products' });

// BrandProduct - Brand (N:M through BrandProductBrand)
BrandProduct.belongsToMany(Brand, {
  through: BrandProductBrand,
  foreignKey: 'product_id',
  otherKey: 'brand_id',
  as: 'brands'
});
Brand.belongsToMany(BrandProduct, {
  through: BrandProductBrand,
  foreignKey: 'brand_id',
  otherKey: 'product_id',
  as: 'brandProducts'
});

// BrandProductBrand associations for direct access
BrandProductBrand.belongsTo(BrandProduct, { foreignKey: 'product_id', as: 'product' });
BrandProductBrand.belongsTo(Brand, { foreignKey: 'brand_id', as: 'brand' });

// BrandProduct - OptionGroup (N:M through BrandProductOptionGroupProduct)
BrandProduct.belongsToMany(BrandProductOptionGroup, {
  through: BrandProductOptionGroupProduct,
  foreignKey: 'product_id',
  otherKey: 'option_group_id',
  as: 'optionGroups'
});
BrandProductOptionGroup.belongsToMany(BrandProduct, {
  through: BrandProductOptionGroupProduct,
  foreignKey: 'option_group_id',
  otherKey: 'product_id',
  as: 'products'
});

// BrandProductOptionGroupProduct associations for direct access
BrandProductOptionGroupProduct.belongsTo(BrandProduct, { foreignKey: 'product_id', as: 'product' });
BrandProductOptionGroupProduct.belongsTo(BrandProductOptionGroup, { foreignKey: 'option_group_id', as: 'optionGroup' });

// BrandProductOption associations
BrandProductOption.belongsTo(BrandProductOptionGroup, { foreignKey: 'option_group_id', as: 'optionGroup' });
BrandProductOptionGroup.hasMany(BrandProductOption, { foreignKey: 'option_group_id', as: 'options' });

// Supplier associations
Supplier.belongsTo(Brand, { foreignKey: 'brand_id', as: 'brand' });
Brand.hasMany(Supplier, { foreignKey: 'brand_id', as: 'suppliers' });
Supplier.belongsTo(Restaurant, { foreignKey: 'restaurant_id', as: 'restaurant' });
Restaurant.hasMany(Supplier, { foreignKey: 'restaurant_id', as: 'suppliers' });

// Ingredient - Supplier association
Ingredient.belongsTo(Supplier, { foreignKey: 'supplier_id', as: 'supplier' });
Supplier.hasMany(Ingredient, { foreignKey: 'supplier_id', as: 'ingredients' });

module.exports = {
  User,
  Restaurant,
  Brand,
  Invoice,
  InvoiceItem,
  InvoiceSettings,
  Order,
  PlanTemplate,
  OperationTicket,
  SupportTicket,
  RestaurantManager,
  Customer,
  RestaurantCustomer,
  Product,
  Category,
  OptionGroup,
  Option,
  AddonModule,
  Recipe,
  Ingredient,
  RecipeIngredient,
  SystemSettings,
  PlanPrice,
  IngredientCost,
  RecipeCost,
  RecipeCategory,
  IngredientCategory,
  BrandProduct,
  BrandProductCategory,
  BrandProductOptionGroup,
  BrandProductOption,
  BrandProductBrand,
  BrandProductOptionGroupProduct,
  Supplier
};