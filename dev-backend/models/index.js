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
const SystemSettings = require('./SystemSettings');
const PlanPrice = require('./PlanPrice');
const IngredientCost = require('./IngredientCost');
const RecipeCost = require('./RecipeCost');

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
  RecipeCost
};