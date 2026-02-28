const User = require('./User');
const Restaurant = require('./Restaurant');
const Brand = require('./Brand');
const Foodcourt = require('./Foodcourt');
const Invoice = require('./Invoice');
const InvoiceItem = require('./InvoiceItem');
const InvoiceSettings = require('./InvoiceSettings');
const InvoiceCategory = require('./InvoiceCategory');
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
const SupplierCategory = require('./SupplierCategory');
const SupplierBrand = require('./SupplierBrand');
const InventoryTransaction = require('./InventoryTransaction');
const StockTake = require('./StockTake');
const StockTakeItem = require('./StockTakeItem');
const StockAlert = require('./StockAlert');
const InventoryBatch = require('./InventoryBatch');
const GeneralStock = require('./GeneralStock');
const GeneralStockCategory = require('./GeneralStockCategory');
const GeneralStockTransaction = require('./GeneralStockTransaction');
const ProductRecipe = require('./ProductRecipe');
const ProductIngredient = require('./ProductIngredient');
const ProductRecipeCategory = require('./ProductRecipeCategory');
const ProductIngredientCategory = require('./ProductIngredientCategory');
const ProductRecipeIngredient = require('./ProductRecipeIngredient');
const MembershipSettings = require('./MembershipSettings');
const PointTransaction = require('./PointTransaction');
const EntityPlan = require('./EntityPlan');
const EntityPlanRestaurant = require('./EntityPlanRestaurant');
const EntityPlanPrice = require('./EntityPlanPrice');
const RestaurantIngredientCost = require('./RestaurantIngredientCost');
const SystemLog = require('./SystemLog');
const Comment = require('./Comment');
const CommentRead = require('./CommentRead');
const Notice = require('./Notice');
const NoticeRecipient = require('./NoticeRecipient');

// Define associations
// Brand - Restaurant associations
Brand.hasMany(Restaurant, { foreignKey: 'brand_id', as: 'restaurants' });
Restaurant.belongsTo(Brand, { foreignKey: 'brand_id', as: 'brand' });

// Brand - User (owner) associations
Brand.belongsTo(User, { foreignKey: 'owner_id', as: 'owner' });
User.hasMany(Brand, { foreignKey: 'owner_id', as: 'brands' });

// Foodcourt - User (owner) associations
Foodcourt.belongsTo(User, { foreignKey: 'owner_id', as: 'owner' });
User.hasMany(Foodcourt, { foreignKey: 'owner_id', as: 'foodcourts' });

// Foodcourt - Restaurant associations
Foodcourt.hasMany(Restaurant, { foreignKey: 'foodcourt_id', as: 'restaurants' });
Restaurant.belongsTo(Foodcourt, { foreignKey: 'foodcourt_id', as: 'foodcourt' });

// Restaurant Admin (1:1 relationship)
Restaurant.belongsTo(User, { foreignKey: 'admin_id', as: 'admin' });
User.hasMany(Restaurant, { foreignKey: 'admin_id', as: 'adminRestaurants' });

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

// BrandProduct - Recipe association
BrandProduct.belongsTo(Recipe, { foreignKey: 'recipe_id', as: 'recipe' });
Recipe.hasMany(BrandProduct, { foreignKey: 'recipe_id', as: 'brandProducts' });

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

// Supplier associations (legacy - keep for backward compatibility)
Supplier.belongsTo(Brand, { foreignKey: 'brand_id', as: 'brand' });
Brand.hasMany(Supplier, { foreignKey: 'brand_id', as: 'suppliers' });
Supplier.belongsTo(Restaurant, { foreignKey: 'restaurant_id', as: 'restaurant' });
Restaurant.hasMany(Supplier, { foreignKey: 'restaurant_id', as: 'suppliers' });

// Supplier - Brand (N:M through SupplierBrand) - NEW: Multiple brands can share suppliers
Supplier.belongsToMany(Brand, {
  through: SupplierBrand,
  foreignKey: 'supplier_id',
  otherKey: 'brand_id',
  as: 'connectedBrands'
});
Brand.belongsToMany(Supplier, {
  through: SupplierBrand,
  foreignKey: 'brand_id',
  otherKey: 'supplier_id',
  as: 'connectedSuppliers'
});

// SupplierBrand associations for direct access
SupplierBrand.belongsTo(Supplier, { foreignKey: 'supplier_id', as: 'supplier' });
SupplierBrand.belongsTo(Brand, { foreignKey: 'brand_id', as: 'brand' });

// Ingredient - Supplier association
Ingredient.belongsTo(Supplier, { foreignKey: 'supplier_id', as: 'supplier' });
Supplier.hasMany(Ingredient, { foreignKey: 'supplier_id', as: 'ingredients' });

// Product - Supplier association (for product inventory)
Product.belongsTo(Supplier, { foreignKey: 'supplier_id', as: 'supplier' });
Supplier.hasMany(Product, { foreignKey: 'supplier_id', as: 'products' });

// SupplierCategory associations
SupplierCategory.belongsTo(Brand, { foreignKey: 'brand_id', as: 'brand' });
Brand.hasMany(SupplierCategory, { foreignKey: 'brand_id', as: 'supplierCategories' });
SupplierCategory.belongsTo(Restaurant, { foreignKey: 'restaurant_id', as: 'restaurant' });
Restaurant.hasMany(SupplierCategory, { foreignKey: 'restaurant_id', as: 'supplierCategories' });

// Supplier - SupplierCategory association
Supplier.belongsTo(SupplierCategory, { foreignKey: 'supplier_category_id', as: 'supplierCategory' });
SupplierCategory.hasMany(Supplier, { foreignKey: 'supplier_category_id', as: 'suppliers' });

// InventoryTransaction associations
InventoryTransaction.belongsTo(Restaurant, { foreignKey: 'restaurant_id', as: 'restaurant' });
Restaurant.hasMany(InventoryTransaction, { foreignKey: 'restaurant_id', as: 'inventoryTransactions' });
InventoryTransaction.belongsTo(Ingredient, { foreignKey: 'ingredient_id', as: 'ingredient' });
Ingredient.hasMany(InventoryTransaction, { foreignKey: 'ingredient_id', as: 'inventoryTransactions' });

// StockTake associations
StockTake.belongsTo(Restaurant, { foreignKey: 'restaurant_id', as: 'restaurant' });
Restaurant.hasMany(StockTake, { foreignKey: 'restaurant_id', as: 'stockTakes' });
StockTake.hasMany(StockTakeItem, { foreignKey: 'stock_take_id', as: 'items' });
StockTakeItem.belongsTo(StockTake, { foreignKey: 'stock_take_id', as: 'stockTake' });
StockTakeItem.belongsTo(Ingredient, { foreignKey: 'ingredient_id', as: 'ingredient' });
Ingredient.hasMany(StockTakeItem, { foreignKey: 'ingredient_id', as: 'stockTakeItems' });

// StockAlert associations
StockAlert.belongsTo(Restaurant, { foreignKey: 'restaurant_id', as: 'restaurant' });
Restaurant.hasMany(StockAlert, { foreignKey: 'restaurant_id', as: 'stockAlerts' });
StockAlert.belongsTo(Ingredient, { foreignKey: 'ingredient_id', as: 'ingredient' });
Ingredient.hasMany(StockAlert, { foreignKey: 'ingredient_id', as: 'stockAlerts' });

// InventoryBatch associations
InventoryBatch.belongsTo(Restaurant, { foreignKey: 'restaurant_id', as: 'restaurant' });
Restaurant.hasMany(InventoryBatch, { foreignKey: 'restaurant_id', as: 'inventoryBatches' });
InventoryBatch.belongsTo(Ingredient, { foreignKey: 'ingredient_id', as: 'ingredient' });
Ingredient.hasMany(InventoryBatch, { foreignKey: 'ingredient_id', as: 'inventoryBatches' });
InventoryBatch.belongsTo(Supplier, { foreignKey: 'supplier_id', as: 'supplier' });
Supplier.hasMany(InventoryBatch, { foreignKey: 'supplier_id', as: 'inventoryBatches' });

// GeneralStock associations
GeneralStock.belongsTo(Restaurant, { foreignKey: 'restaurant_id', as: 'restaurant' });
Restaurant.hasMany(GeneralStock, { foreignKey: 'restaurant_id', as: 'generalStocks' });
GeneralStock.belongsTo(Supplier, { foreignKey: 'supplier_id', as: 'supplier' });
Supplier.hasMany(GeneralStock, { foreignKey: 'supplier_id', as: 'generalStocks' });

// GeneralStockCategory associations
GeneralStockCategory.belongsTo(Brand, { foreignKey: 'brand_id', as: 'brand' });
Brand.hasMany(GeneralStockCategory, { foreignKey: 'brand_id', as: 'generalStockCategories' });
GeneralStockCategory.belongsTo(Restaurant, { foreignKey: 'restaurant_id', as: 'restaurant' });
Restaurant.hasMany(GeneralStockCategory, { foreignKey: 'restaurant_id', as: 'generalStockCategories' });

// GeneralStockTransaction associations
GeneralStockTransaction.belongsTo(GeneralStock, { foreignKey: 'general_stock_id', as: 'generalStock' });
GeneralStock.hasMany(GeneralStockTransaction, { foreignKey: 'general_stock_id', as: 'transactions' });

// ProductRecipe associations
ProductRecipe.belongsTo(ProductRecipeCategory, { foreignKey: 'category_id', as: 'category' });
ProductRecipeCategory.hasMany(ProductRecipe, { foreignKey: 'category_id', as: 'recipes' });

ProductRecipe.hasMany(ProductRecipeIngredient, { foreignKey: 'recipe_id', as: 'recipeIngredients' });
ProductRecipeIngredient.belongsTo(ProductRecipe, { foreignKey: 'recipe_id', as: 'recipe' });

// ProductIngredient associations
ProductIngredient.belongsTo(ProductIngredientCategory, { foreignKey: 'category_id', as: 'category' });
ProductIngredientCategory.hasMany(ProductIngredient, { foreignKey: 'category_id', as: 'ingredients' });

ProductIngredient.hasMany(ProductRecipeIngredient, { foreignKey: 'ingredient_id', as: 'recipeIngredients' });
ProductRecipeIngredient.belongsTo(ProductIngredient, { foreignKey: 'ingredient_id', as: 'ingredient' });

// BrandProduct - ProductRecipe association
BrandProduct.belongsTo(ProductRecipe, { foreignKey: 'product_recipe_id', as: 'productRecipe' });
ProductRecipe.hasMany(BrandProduct, { foreignKey: 'product_recipe_id', as: 'brandProducts' });

// MembershipSettings - Restaurant association (1:1)
MembershipSettings.belongsTo(Restaurant, { foreignKey: 'restaurant_id', as: 'restaurant' });
Restaurant.hasOne(MembershipSettings, { foreignKey: 'restaurant_id', as: 'membershipSettings' });

// PointTransaction associations
PointTransaction.belongsTo(Restaurant, { foreignKey: 'restaurant_id', as: 'restaurant' });
Restaurant.hasMany(PointTransaction, { foreignKey: 'restaurant_id', as: 'pointTransactions' });
PointTransaction.belongsTo(Customer, { foreignKey: 'customer_id', as: 'customer' });
Customer.hasMany(PointTransaction, { foreignKey: 'customer_id', as: 'pointTransactions' });
PointTransaction.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });
Order.hasMany(PointTransaction, { foreignKey: 'order_id', as: 'pointTransactions' });

// EntityPlan associations
EntityPlan.belongsTo(Brand, { foreignKey: 'entity_id', constraints: false, as: 'brand' });
EntityPlan.belongsTo(Foodcourt, { foreignKey: 'entity_id', constraints: false, as: 'foodcourt' });
EntityPlan.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });

// EntityPlan - Restaurant (N:M through EntityPlanRestaurant)
EntityPlan.belongsToMany(Restaurant, {
  through: EntityPlanRestaurant,
  foreignKey: 'entity_plan_id',
  otherKey: 'restaurant_id',
  as: 'restaurants'
});
Restaurant.belongsToMany(EntityPlan, {
  through: EntityPlanRestaurant,
  foreignKey: 'restaurant_id',
  otherKey: 'entity_plan_id',
  as: 'entityPlans'
});

// EntityPlanRestaurant direct associations
EntityPlanRestaurant.belongsTo(EntityPlan, { foreignKey: 'entity_plan_id', as: 'plan' });
EntityPlan.hasMany(EntityPlanRestaurant, { foreignKey: 'entity_plan_id', as: 'planRestaurants' });
EntityPlanRestaurant.belongsTo(Restaurant, { foreignKey: 'restaurant_id', as: 'restaurant' });
Restaurant.hasMany(EntityPlanRestaurant, { foreignKey: 'restaurant_id', as: 'entityPlanRestaurants' });

// EntityPlanPrice associations (multi-currency pricing for entity plans)
EntityPlanPrice.belongsTo(EntityPlan, { foreignKey: 'entity_plan_id', as: 'entityPlan' });
EntityPlan.hasMany(EntityPlanPrice, { foreignKey: 'entity_plan_id', as: 'prices' });

// RestaurantIngredientCost associations (restaurant-level cost override for brand ingredients)
RestaurantIngredientCost.belongsTo(Restaurant, { foreignKey: 'restaurant_id', as: 'restaurant' });
Restaurant.hasMany(RestaurantIngredientCost, { foreignKey: 'restaurant_id', as: 'ingredientCosts' });
RestaurantIngredientCost.belongsTo(Ingredient, { foreignKey: 'ingredient_id', as: 'ingredient' });
Ingredient.hasMany(RestaurantIngredientCost, { foreignKey: 'ingredient_id', as: 'restaurantCosts' });
RestaurantIngredientCost.belongsTo(User, { foreignKey: 'updated_by', as: 'updater' });

// Comment associations (polymorphic)
Comment.belongsTo(User, { foreignKey: 'author_id', as: 'author' });
User.hasMany(Comment, { foreignKey: 'author_id', as: 'comments' });

// Notice associations
Notice.belongsTo(User, { foreignKey: 'author_id', as: 'author' });
User.hasMany(Notice, { foreignKey: 'author_id', as: 'notices' });
Notice.belongsTo(Brand, { foreignKey: 'brand_id', as: 'brand' });
Brand.hasMany(Notice, { foreignKey: 'brand_id', as: 'notices' });
Notice.belongsTo(Foodcourt, { foreignKey: 'foodcourt_id', as: 'foodcourt' });
Foodcourt.hasMany(Notice, { foreignKey: 'foodcourt_id', as: 'notices' });

// NoticeRecipient associations
NoticeRecipient.belongsTo(Notice, { foreignKey: 'notice_id', as: 'notice' });
Notice.hasMany(NoticeRecipient, { foreignKey: 'notice_id', as: 'recipients' });
NoticeRecipient.belongsTo(Restaurant, { foreignKey: 'restaurant_id', as: 'restaurant' });
Restaurant.hasMany(NoticeRecipient, { foreignKey: 'restaurant_id', as: 'noticeRecipients' });
NoticeRecipient.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
NoticeRecipient.belongsTo(User, { foreignKey: 'read_by', as: 'reader' });

module.exports = {
  User,
  Restaurant,
  Brand,
  Foodcourt,
  Invoice,
  InvoiceItem,
  InvoiceSettings,
  InvoiceCategory,
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
  Supplier,
  SupplierCategory,
  SupplierBrand,
  InventoryTransaction,
  StockTake,
  StockTakeItem,
  StockAlert,
  InventoryBatch,
  GeneralStock,
  GeneralStockCategory,
  GeneralStockTransaction,
  ProductRecipe,
  ProductIngredient,
  ProductRecipeCategory,
  ProductIngredientCategory,
  ProductRecipeIngredient,
  MembershipSettings,
  PointTransaction,
  EntityPlan,
  EntityPlanRestaurant,
  EntityPlanPrice,
  RestaurantIngredientCost,
  SystemLog,
  Comment,
  CommentRead,
  Notice,
  NoticeRecipient
};