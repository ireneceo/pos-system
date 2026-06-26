const User = require('./User');
const Restaurant = require('./Restaurant');
const Brand = require('./Brand');
const Foodcourt = require('./Foodcourt');
const Invoice = require('./Invoice');
const InvoiceItem = require('./InvoiceItem');
const InvoiceSettings = require('./InvoiceSettings');
const InvoiceCategory = require('./InvoiceCategory');
const Order = require('./Order');
const OrderAction = require('./OrderAction');
const OrderPayment = require('./OrderPayment');
const CashierShift = require('./CashierShift');
const CashReconciliation = require('./CashReconciliation');
const CashMovement = require('./CashMovement');
const PaymentMethodSetting = require('./PaymentMethodSetting');
const RestaurantDailyStats = require('./RestaurantDailyStats');
const PlanTemplate = require('./PlanTemplate');
const OperationTicket = require('./OperationTicket');
const SupportTicket = require('./SupportTicket');
const RestaurantManager = require('./RestaurantManager');
const Customer = require('./Customer');
const RestaurantCustomer = require('./RestaurantCustomer');
const Product = require('./Product');
const Category = require('./Category');
// #11c 모바일 크로스셀
const ProductRecommendation = require('./ProductRecommendation');
const BrandMenuRecommendation = require('./BrandMenuRecommendation');
const OptionGroup = require('./OptionGroup');
const Option = require('./Option');
const OptionIngredient = require('./OptionIngredient');
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
const BrandProductOptionIngredient = require('./BrandProductOptionIngredient');
const BrandProductBrand = require('./BrandProductBrand');
const BrandProductRestaurant = require('./BrandProductRestaurant');
const FoodcourtProductRestaurant = require('./FoodcourtProductRestaurant');
const BrandProductOptionGroupProduct = require('./BrandProductOptionGroupProduct');
// Brand Menu System (v3.32+) — Brand-level menu templates pushed to franchise restaurants
const BrandMenu = require('./BrandMenu');
const BrandMenuCategory = require('./BrandMenuCategory');
const BrandMenuOptionGroup = require('./BrandMenuOptionGroup');
const BrandMenuOption = require('./BrandMenuOption');
const BrandMenuOptionGroupLink = require('./BrandMenuOptionGroupLink');
const BrandMenuRestaurant = require('./BrandMenuRestaurant');
const Supplier = require('./Supplier');
const SupplierCategory = require('./SupplierCategory');
const SupplierBrand = require('./SupplierBrand');
// Sprint 1 (Supply Chain Design 1) — Supplier/Foodcourt seller catalog + inventory
const SupplierCompany = require('./SupplierCompany');
const SupplierProduct = require('./SupplierProduct');
const SupplierProductCategory = require('./SupplierProductCategory');
const SupplierProductOptionGroup = require('./SupplierProductOptionGroup');
const SupplierProductOption = require('./SupplierProductOption');
const SupplierProductOptionGroupProduct = require('./SupplierProductOptionGroupProduct');
const SupplierInvitation = require('./SupplierInvitation');
const FoodcourtProduct = require('./FoodcourtProduct');
const FoodcourtProductCategory = require('./FoodcourtProductCategory');
const FoodcourtProductOptionGroup = require('./FoodcourtProductOptionGroup');
const FoodcourtProductOption = require('./FoodcourtProductOption');
const FoodcourtProductOptionGroupProduct = require('./FoodcourtProductOptionGroupProduct');
// Sprint 2 (Supply Chain Design 2) — Supplier Contract
const SupplierContract = require('./SupplierContract');
// Sprint 3 (Supply Chain Design 3) — Purchase Order
const IngredientSellerProduct = require('./IngredientSellerProduct');
const PurchaseOrder = require('./PurchaseOrder');
const PurchaseOrderItem = require('./PurchaseOrderItem');
const InventoryTransaction = require('./InventoryTransaction');
const SupplierInventoryTransaction = require('./SupplierInventoryTransaction');
const Carrier = require('./Carrier');
const CarrierWebhookEvent = require('./CarrierWebhookEvent');
const PurchaseOrderReturn = require('./PurchaseOrderReturn');
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
const SchedulerRun = require('./SchedulerRun');
const Comment = require('./Comment');
const CommentRead = require('./CommentRead');
const Notice = require('./Notice');
const NoticeRecipient = require('./NoticeRecipient');
const KitchenStation = require('./KitchenStation');
const ImportHistory = require('./ImportHistory');
const SystemProduct = require('./SystemProduct');
const SystemProductCategory = require('./SystemProductCategory');
const SystemProductPrice = require('./SystemProductPrice');
const SystemProductAddon = require('./SystemProductAddon');
const SystemProductOptionGroup = require('./SystemProductOptionGroup');
const SystemProductOption = require('./SystemProductOption');
const SystemProductOptionGroupProduct = require('./SystemProductOptionGroupProduct');
const HardwareQuote = require('./HardwareQuote');
const TableQRSession = require('./TableQRSession');
const Contract = require('./Contract');
const ContractDocument = require('./ContractDocument');
const ContractTask = require('./ContractTask');
const ContractNote = require('./ContractNote');
const ContractHistory = require('./ContractHistory');
const ContractPlan = require('./ContractPlan');
const FoodcourtUnit = require('./FoodcourtUnit');
const WorkManual = require('./WorkManual');
const WorkManualCategory = require('./WorkManualCategory');
// Referral System (Refer & Earn)
const ReferralWallet = require('./ReferralWallet');
const ReferralCommission = require('./ReferralCommission');
const ReferralWalletTransaction = require('./ReferralWalletTransaction');
const ReferralPayout = require('./ReferralPayout');
const ReferralClick = require('./ReferralClick');
const ReferralSettings = require('./ReferralSettings');

// Payment gateway (v3.24+)
const PaymentCustomer = require('./PaymentCustomer');
const Subscription = require('./Subscription');
const WebhookEvent = require('./WebhookEvent');

// Web Push notifications (v3.28+)
const PushSubscription = require('./PushSubscription');
const PushLog = require('./PushLog');

// Reservations (v3.29+)
const Reservation = require('./Reservation');

// Print Visibility & Diagnostics (2026-06-26) — additive log, no print-path change
const PrintEvent = require('./PrintEvent');

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
RestaurantDailyStats.belongsTo(Restaurant, { foreignKey: 'restaurant_id', as: 'restaurant' });
Restaurant.hasMany(RestaurantDailyStats, { foreignKey: 'restaurant_id', as: 'dailyStats' });

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

// #11c 크로스셀 — ProductRecommendation: 기준상품/추천상품 → products.id (방향성 N:N)
ProductRecommendation.belongsTo(Product, { foreignKey: 'product_id', as: 'baseProduct' });
ProductRecommendation.belongsTo(Product, { foreignKey: 'recommended_product_id', as: 'recommendedProduct' });
Product.hasMany(ProductRecommendation, { foreignKey: 'product_id', as: 'recommendations' });
// BrandMenuRecommendation: 기준/추천 브랜드메뉴 → brand_menus.id
BrandMenuRecommendation.belongsTo(BrandMenu, { foreignKey: 'brand_menu_id', as: 'baseBrandMenu' });
BrandMenuRecommendation.belongsTo(BrandMenu, { foreignKey: 'recommended_brand_menu_id', as: 'recommendedBrandMenu' });

// OptionGroup - Option associations
OptionGroup.hasMany(Option, {
  foreignKey: 'option_group_id',
  as: 'options'
});
Option.belongsTo(OptionGroup, {
  foreignKey: 'option_group_id',
  as: 'optionGroup'
});
Option.hasMany(OptionIngredient, { foreignKey: 'option_id', as: 'optionIngredients' });
OptionIngredient.belongsTo(Option, { foreignKey: 'option_id', as: 'option' });
OptionIngredient.belongsTo(Ingredient, { foreignKey: 'ingredient_id', as: 'ingredient' });
Ingredient.hasMany(OptionIngredient, { foreignKey: 'ingredient_id', as: 'optionIngredients' });

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

// BrandProduct ↔ Restaurant (N:M for distribution_mode='specific_restaurants')
BrandProduct.belongsToMany(Restaurant, {
  through: BrandProductRestaurant,
  foreignKey: 'product_id',
  otherKey: 'restaurant_id',
  as: 'restaurants'
});
Restaurant.belongsToMany(BrandProduct, {
  through: BrandProductRestaurant,
  foreignKey: 'restaurant_id',
  otherKey: 'product_id',
  as: 'sellingBrandProducts'
});
BrandProductRestaurant.belongsTo(BrandProduct, { foreignKey: 'product_id', as: 'product' });
BrandProductRestaurant.belongsTo(Restaurant, { foreignKey: 'restaurant_id', as: 'restaurant' });

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
BrandProductOption.hasMany(BrandProductOptionIngredient, { foreignKey: 'option_id', as: 'optionIngredients' });
BrandProductOptionIngredient.belongsTo(BrandProductOption, { foreignKey: 'option_id', as: 'option' });
BrandProductOptionIngredient.belongsTo(ProductIngredient, { foreignKey: 'ingredient_id', as: 'ingredient' });
ProductIngredient.hasMany(BrandProductOptionIngredient, { foreignKey: 'ingredient_id', as: 'brandOptionIngredients' });

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

// BG 재고아이템(ProductIngredient) ↔ 공용 공급망(공급업체상품·발주·재고) 연결
IngredientSellerProduct.belongsTo(ProductIngredient, { foreignKey: 'product_ingredient_id', as: 'productIngredient' });
ProductIngredient.hasMany(IngredientSellerProduct, { foreignKey: 'product_ingredient_id', as: 'sellerProducts' });
PurchaseOrderItem.belongsTo(ProductIngredient, { foreignKey: 'product_ingredient_id', as: 'productIngredient' });
ProductIngredient.hasMany(PurchaseOrderItem, { foreignKey: 'product_ingredient_id', as: 'purchaseOrderItems' });
InventoryTransaction.belongsTo(ProductIngredient, { foreignKey: 'product_ingredient_id', as: 'productIngredient' });
ProductIngredient.hasMany(InventoryTransaction, { foreignKey: 'product_ingredient_id', as: 'inventoryTransactions' });

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

// KitchenStation associations
KitchenStation.belongsTo(Restaurant, { foreignKey: 'restaurant_id', as: 'restaurant' });
Restaurant.hasMany(KitchenStation, { foreignKey: 'restaurant_id', as: 'kitchenStations' });

KitchenStation.hasMany(Category, { foreignKey: 'kitchen_station_id', as: 'categories' });
Category.belongsTo(KitchenStation, { foreignKey: 'kitchen_station_id', as: 'kitchenStation' });

KitchenStation.hasMany(Product, { foreignKey: 'kitchen_station_id', as: 'products' });
Product.belongsTo(KitchenStation, { foreignKey: 'kitchen_station_id', as: 'kitchenStation' });

// SystemProduct associations
SystemProduct.belongsTo(SystemProductCategory, { foreignKey: 'category_id', as: 'category' });
SystemProductCategory.hasMany(SystemProduct, { foreignKey: 'category_id', as: 'products' });

SystemProductPrice.belongsTo(SystemProduct, { foreignKey: 'product_id', as: 'product' });
SystemProduct.hasMany(SystemProductPrice, { foreignKey: 'product_id', as: 'prices' });

SystemProductAddon.belongsTo(SystemProduct, { foreignKey: 'set_product_id', as: 'setProduct' });
SystemProductAddon.belongsTo(SystemProduct, { foreignKey: 'addon_product_id', as: 'addonProduct' });
SystemProduct.hasMany(SystemProductAddon, { foreignKey: 'set_product_id', as: 'addons' });

// SystemProduct Option associations
SystemProductOptionGroup.hasMany(SystemProductOption, { foreignKey: 'option_group_id', as: 'options' });
SystemProductOption.belongsTo(SystemProductOptionGroup, { foreignKey: 'option_group_id', as: 'optionGroup' });

SystemProduct.belongsToMany(SystemProductOptionGroup, { through: SystemProductOptionGroupProduct, foreignKey: 'product_id', otherKey: 'option_group_id', as: 'optionGroups' });
SystemProductOptionGroup.belongsToMany(SystemProduct, { through: SystemProductOptionGroupProduct, foreignKey: 'option_group_id', otherKey: 'product_id', as: 'products' });

// TableQRSession associations
TableQRSession.belongsTo(Restaurant, { foreignKey: 'restaurant_id', as: 'restaurant' });
Restaurant.hasMany(TableQRSession, { foreignKey: 'restaurant_id', as: 'qrSessions' });

// HardwareQuote associations
HardwareQuote.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
HardwareQuote.belongsTo(Restaurant, { foreignKey: 'restaurant_id', as: 'restaurant' });
HardwareQuote.belongsTo(SystemProduct, { foreignKey: 'package_product_id', as: 'packageProduct' });
HardwareQuote.belongsTo(Invoice, { foreignKey: 'invoice_id', as: 'invoice' });

// ============================================
// Contract Management associations
// ============================================

// Contract → Entity (Brand / Foodcourt)
Contract.belongsTo(Brand, { foreignKey: 'entity_id', constraints: false, as: 'brand' });
Contract.belongsTo(Foodcourt, { foreignKey: 'entity_id', constraints: false, as: 'foodcourt' });
Contract.belongsTo(Restaurant, { foreignKey: 'restaurant_id', as: 'restaurant' });
Contract.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });
Contract.belongsTo(User, { foreignKey: 'updated_by', as: 'updater' });
Contract.belongsTo(User, { foreignKey: 'terminated_by', as: 'terminator' });
Contract.belongsTo(Contract, { foreignKey: 'renewed_from_id', as: 'renewedFrom' });
Contract.belongsTo(Contract, { foreignKey: 'renewed_to_id', as: 'renewedTo' });
Contract.belongsTo(FoodcourtUnit, { foreignKey: 'unit_id', as: 'unit' });

Brand.hasMany(Contract, { foreignKey: 'entity_id', constraints: false, scope: { entity_type: 'brand' }, as: 'contracts' });
Foodcourt.hasMany(Contract, { foreignKey: 'entity_id', constraints: false, scope: { entity_type: 'foodcourt' }, as: 'contracts' });
Restaurant.hasMany(Contract, { foreignKey: 'restaurant_id', as: 'contracts' });

// ContractDocument
ContractDocument.belongsTo(Contract, { foreignKey: 'contract_id', as: 'contract' });
Contract.hasMany(ContractDocument, { foreignKey: 'contract_id', as: 'documents' });
ContractDocument.belongsTo(User, { foreignKey: 'uploaded_by', as: 'uploader' });

// ContractTask
ContractTask.belongsTo(Contract, { foreignKey: 'contract_id', as: 'contract' });
Contract.hasMany(ContractTask, { foreignKey: 'contract_id', as: 'tasks' });
ContractTask.belongsTo(User, { foreignKey: 'completed_by', as: 'completedByUser' });

// ContractNote
ContractNote.belongsTo(Contract, { foreignKey: 'contract_id', as: 'contract' });
Contract.hasMany(ContractNote, { foreignKey: 'contract_id', as: 'contractNotes' });
ContractNote.belongsTo(User, { foreignKey: 'created_by', as: 'author' });

// ContractHistory
ContractHistory.belongsTo(Contract, { foreignKey: 'contract_id', as: 'contract' });
Contract.hasMany(ContractHistory, { foreignKey: 'contract_id', as: 'history' });
ContractHistory.belongsTo(User, { foreignKey: 'changed_by', as: 'changedByUser' });

// ContractPlan
ContractPlan.belongsTo(Contract, { foreignKey: 'contract_id', as: 'contract' });
Contract.hasMany(ContractPlan, { foreignKey: 'contract_id', as: 'plans' });
ContractPlan.belongsTo(EntityPlan, { foreignKey: 'entity_plan_id', as: 'entityPlan' });
// Phase 2-F: reverse lookup — find which contracts use a given plan
EntityPlan.hasMany(ContractPlan, { foreignKey: 'entity_plan_id', as: 'contractLinks' });

// Contract ↔ Invoice (one-time invoice traceability — logical FK only)
Contract.hasMany(Invoice, { foreignKey: 'contract_id', as: 'invoices', constraints: false });
Invoice.belongsTo(Contract, { foreignKey: 'contract_id', as: 'contract', constraints: false });

// FoodcourtUnit
FoodcourtUnit.belongsTo(Foodcourt, { foreignKey: 'foodcourt_id', as: 'foodcourt' });
Foodcourt.hasMany(FoodcourtUnit, { foreignKey: 'foodcourt_id', as: 'units' });
FoodcourtUnit.belongsTo(Contract, { foreignKey: 'current_contract_id', as: 'currentContract' });

// FoodcourtBranch
const FoodcourtBranch = require('./FoodcourtBranch');
FoodcourtBranch.belongsTo(Foodcourt, { foreignKey: 'foodcourt_id', as: 'foodcourt' });
Foodcourt.hasMany(FoodcourtBranch, { foreignKey: 'foodcourt_id', as: 'branches' });
FoodcourtBranch.hasMany(FoodcourtUnit, { foreignKey: 'branch_id', as: 'units' });
FoodcourtUnit.belongsTo(FoodcourtBranch, { foreignKey: 'branch_id', as: 'branch' });
// Restaurant ↔ Branch (which branch of a foodcourt this restaurant is in)
FoodcourtBranch.hasMany(Restaurant, { foreignKey: 'branch_id', as: 'restaurants' });
Restaurant.belongsTo(FoodcourtBranch, { foreignKey: 'branch_id', as: 'branch' });

// FoodcourtFloorPlan associations
const FoodcourtFloorPlan = require('./FoodcourtFloorPlan');
FoodcourtFloorPlan.belongsTo(FoodcourtBranch, { foreignKey: 'branch_id', as: 'branch' });
FoodcourtBranch.hasMany(FoodcourtFloorPlan, { foreignKey: 'branch_id', as: 'floorPlans' });
FoodcourtFloorPlan.hasMany(FoodcourtUnit, { foreignKey: 'floor_plan_id', as: 'units' });
FoodcourtUnit.belongsTo(FoodcourtFloorPlan, { foreignKey: 'floor_plan_id', as: 'floorPlan' });

// WorkManual associations
WorkManual.belongsTo(User, { foreignKey: 'author_id', as: 'author' });
User.hasMany(WorkManual, { foreignKey: 'author_id', as: 'workManuals' });
WorkManual.belongsTo(Restaurant, { foreignKey: 'restaurant_id', as: 'restaurant' });
Restaurant.hasMany(WorkManual, { foreignKey: 'restaurant_id', as: 'workManuals' });
WorkManual.belongsTo(Brand, { foreignKey: 'brand_id', as: 'brand' });
Brand.hasMany(WorkManual, { foreignKey: 'brand_id', as: 'workManuals' });
WorkManual.belongsTo(Foodcourt, { foreignKey: 'foodcourt_id', as: 'foodcourt' });
Foodcourt.hasMany(WorkManual, { foreignKey: 'foodcourt_id', as: 'workManuals' });
WorkManual.belongsTo(WorkManualCategory, { foreignKey: 'category_id', as: 'category' });
WorkManualCategory.hasMany(WorkManual, { foreignKey: 'category_id', as: 'manuals' });

// ============================================
// Contract Issuer Auto-Sync Hooks (Phase 1.5)
// ============================================
// When Brand/Foodcourt master info changes, propagate to contracts
// that have issuer_sync_with_master=true. Non-active contracts only
// (stage: proposal/contracting/setup) — active/terminated/renewed/expired
// contracts are legal snapshots and must not mutate.
// ============================================
const SYNC_STAGES = ['proposal', 'contracting', 'setup'];
const buildIssuerPayloadFromMaster = (m) => ({
  issuer_company_name: m.company_name || m.name || null,
  issuer_business_registration: m.registration_no || null,
  issuer_website: m.website || null,
  issuer_bank_info: (m.bank_name || m.bank_account || m.bank_account_name) ? {
    bank: m.bank_name || null,
    account: m.bank_account || null,
    holder: m.bank_account_name || null
  } : null
});

const syncIssuerToContracts = async (entityType, entityId, master) => {
  try {
    const payload = buildIssuerPayloadFromMaster(master);
    await Contract.update(payload, {
      where: {
        entity_type: entityType,
        entity_id: entityId,
        issuer_sync_with_master: true,
        stage: SYNC_STAGES
      },
      hooks: false
    });
  } catch (err) {
    console.error(`[ContractSync] Failed to sync issuer for ${entityType}:${entityId}`, err.message);
  }
};

// =====================================================================
// Sprint 1 (Supply Chain Design 1) — Associations
// =====================================================================

// SupplierCompany ↔ User (owner) + PlanTemplate
SupplierCompany.belongsTo(User, { foreignKey: 'owner_id', as: 'owner' });
User.hasOne(SupplierCompany, { foreignKey: 'owner_id', as: 'supplierCompany' });
SupplierCompany.belongsTo(PlanTemplate, { foreignKey: 'plan_id', as: 'plan' });

// SupplierCompany hasMany products/categories/option groups
SupplierCompany.hasMany(SupplierProduct, { foreignKey: 'supplier_company_id', as: 'products' });
SupplierCompany.hasMany(SupplierProductCategory, { foreignKey: 'supplier_company_id', as: 'productCategories' });
SupplierCompany.hasMany(SupplierProductOptionGroup, { foreignKey: 'supplier_company_id', as: 'productOptionGroups' });

// SupplierProduct relationships
SupplierProduct.belongsTo(SupplierCompany, { foreignKey: 'supplier_company_id', as: 'company' });
SupplierProduct.belongsTo(SupplierProductCategory, { foreignKey: 'category_id', as: 'category' });
SupplierProductCategory.hasMany(SupplierProduct, { foreignKey: 'category_id', as: 'products' });
SupplierProductCategory.belongsTo(SupplierCompany, { foreignKey: 'supplier_company_id', as: 'company' });

// SupplierProduct ↔ OptionGroup N:M via SupplierProductOptionGroupProduct
SupplierProduct.belongsToMany(SupplierProductOptionGroup, {
  through: { model: SupplierProductOptionGroupProduct, unique: false },
  foreignKey: 'product_id',
  otherKey: 'option_group_id',
  as: 'optionGroups'
});
SupplierProductOptionGroup.belongsToMany(SupplierProduct, {
  through: { model: SupplierProductOptionGroupProduct, unique: false },
  foreignKey: 'option_group_id',
  otherKey: 'product_id',
  as: 'products'
});
SupplierProductOptionGroup.belongsTo(SupplierCompany, { foreignKey: 'supplier_company_id', as: 'company' });
SupplierProductOptionGroup.hasMany(SupplierProductOption, { foreignKey: 'option_group_id', as: 'options' });
SupplierProductOption.belongsTo(SupplierProductOptionGroup, { foreignKey: 'option_group_id', as: 'group' });

// FoodcourtProduct mirrors (Foodcourt as parent)
Foodcourt.hasMany(FoodcourtProduct, { foreignKey: 'foodcourt_id', as: 'products' });
Foodcourt.hasMany(FoodcourtProductCategory, { foreignKey: 'foodcourt_id', as: 'productCategories' });
Foodcourt.hasMany(FoodcourtProductOptionGroup, { foreignKey: 'foodcourt_id', as: 'productOptionGroups' });

FoodcourtProduct.belongsTo(Foodcourt, { foreignKey: 'foodcourt_id', as: 'foodcourt' });
FoodcourtProduct.belongsTo(FoodcourtProductCategory, { foreignKey: 'category_id', as: 'category' });
FoodcourtProductCategory.hasMany(FoodcourtProduct, { foreignKey: 'category_id', as: 'products' });
FoodcourtProductCategory.belongsTo(Foodcourt, { foreignKey: 'foodcourt_id', as: 'foodcourt' });

FoodcourtProduct.belongsToMany(FoodcourtProductOptionGroup, {
  through: { model: FoodcourtProductOptionGroupProduct, unique: false },
  foreignKey: 'product_id',
  otherKey: 'option_group_id',
  as: 'optionGroups'
});
FoodcourtProductOptionGroup.belongsToMany(FoodcourtProduct, {
  through: { model: FoodcourtProductOptionGroupProduct, unique: false },
  foreignKey: 'option_group_id',
  otherKey: 'product_id',
  as: 'products'
});
FoodcourtProductOptionGroup.belongsTo(Foodcourt, { foreignKey: 'foodcourt_id', as: 'foodcourt' });
FoodcourtProductOptionGroup.hasMany(FoodcourtProductOption, { foreignKey: 'option_group_id', as: 'options' });
FoodcourtProductOption.belongsTo(FoodcourtProductOptionGroup, { foreignKey: 'option_group_id', as: 'group' });

// FoodcourtProduct ↔ Restaurant (N:M for distribution_mode='specific_restaurants')
FoodcourtProduct.belongsToMany(Restaurant, {
  through: FoodcourtProductRestaurant,
  foreignKey: 'product_id',
  otherKey: 'restaurant_id',
  as: 'restaurants'
});
Restaurant.belongsToMany(FoodcourtProduct, {
  through: FoodcourtProductRestaurant,
  foreignKey: 'restaurant_id',
  otherKey: 'product_id',
  as: 'sellingFoodcourtProducts'
});
FoodcourtProductRestaurant.belongsTo(FoodcourtProduct, { foreignKey: 'product_id', as: 'product' });
FoodcourtProductRestaurant.belongsTo(Restaurant, { foreignKey: 'restaurant_id', as: 'restaurant' });

// Sprint 2 — SupplierContract
SupplierContract.belongsTo(SupplierCompany, { foreignKey: 'supplier_company_id', as: 'supplierCompany' });
SupplierCompany.hasMany(SupplierContract, { foreignKey: 'supplier_company_id', as: 'contracts' });
SupplierContract.belongsTo(User, { foreignKey: 'requested_by_user_id', as: 'requestedBy' });
SupplierContract.belongsTo(User, { foreignKey: 'approved_by_user_id', as: 'approvedBy' });
SupplierContract.belongsTo(User, { foreignKey: 'rejected_by_user_id', as: 'rejectedBy' });
SupplierContract.belongsTo(User, { foreignKey: 'terminated_by_user_id', as: 'terminatedByUser' });
// Polymorphic buyer 관계는 라우트에서 entity_type/entity_id 로 직접 조회

// Sprint 3 — Purchase Order associations
IngredientSellerProduct.belongsTo(Ingredient, { foreignKey: 'ingredient_id', as: 'ingredient' });
Ingredient.hasMany(IngredientSellerProduct, { foreignKey: 'ingredient_id', as: 'sellerSources' });

PurchaseOrder.hasMany(PurchaseOrderItem, { foreignKey: 'purchase_order_id', as: 'items' });
PurchaseOrderItem.belongsTo(PurchaseOrder, { foreignKey: 'purchase_order_id', as: 'order' });
PurchaseOrder.belongsTo(SupplierContract, { foreignKey: 'contract_id', as: 'contract' });
PurchaseOrder.belongsTo(User, { foreignKey: 'created_by_user_id', as: 'createdBy' });
PurchaseOrderItem.belongsTo(Ingredient, { foreignKey: 'ingredient_id', as: 'ingredient' });
PurchaseOrderItem.belongsTo(IngredientSellerProduct, { foreignKey: 'ingredient_seller_product_id', as: 'sellerSource' });

// Sprint 7: Carrier ↔ CarrierWebhookEvent / InventoryTransaction ↔ PurchaseOrder
Carrier.hasMany(CarrierWebhookEvent, { foreignKey: 'carrier_id', as: 'webhookEvents' });
CarrierWebhookEvent.belongsTo(Carrier, { foreignKey: 'carrier_id', as: 'carrier' });
CarrierWebhookEvent.belongsTo(PurchaseOrder, { foreignKey: 'purchase_order_id', as: 'purchaseOrder' });
PurchaseOrder.hasMany(CarrierWebhookEvent, { foreignKey: 'purchase_order_id', as: 'carrierWebhookEvents' });

InventoryTransaction.belongsTo(PurchaseOrder, { foreignKey: 'purchase_order_id', as: 'purchaseOrder' });
PurchaseOrder.hasMany(InventoryTransaction, { foreignKey: 'purchase_order_id', as: 'inventoryTransactions' });

// SupplierInvitation
SupplierInvitation.belongsTo(User, { foreignKey: 'invited_by', as: 'inviter' });
SupplierInvitation.belongsTo(User, { foreignKey: 'used_by_user_id', as: 'usedBy' });
SupplierInvitation.belongsTo(PlanTemplate, { foreignKey: 'plan_id', as: 'plan' });

// =====================================================================
// Referral System associations
// =====================================================================
// Self-referencing — referrer User -> referred Users via users.referred_by
User.belongsTo(User, { foreignKey: 'referred_by', as: 'referrer' });
User.hasMany(User, { foreignKey: 'referred_by', as: 'referredUsers' });

// Wallet — one user has many wallets (one per currency)
ReferralWallet.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasMany(ReferralWallet, { foreignKey: 'user_id', as: 'referralWallets' });

// Commission — referrer + referred + invoice
ReferralCommission.belongsTo(User, { foreignKey: 'referrer_id', as: 'referrer' });
ReferralCommission.belongsTo(User, { foreignKey: 'referred_id', as: 'referred' });
ReferralCommission.belongsTo(Invoice, { foreignKey: 'invoice_id', as: 'invoice' });
User.hasMany(ReferralCommission, { foreignKey: 'referrer_id', as: 'commissionsEarned' });
User.hasMany(ReferralCommission, { foreignKey: 'referred_id', as: 'commissionsTriggered' });
Invoice.hasMany(ReferralCommission, { foreignKey: 'invoice_id', as: 'referralCommissions' });

// Payment gateway associations (v3.24+)
Invoice.belongsTo(Subscription, { foreignKey: 'subscription_id', as: 'subscription', constraints: false });

// Reservations (v3.29+)
Reservation.belongsTo(Restaurant, { foreignKey: 'restaurant_id', as: 'restaurant' });
Reservation.belongsTo(RestaurantCustomer, { foreignKey: 'customer_id', as: 'customer', constraints: false });
Reservation.belongsTo(Order, { foreignKey: 'deposit_order_id', as: 'depositOrder', constraints: false });
Restaurant.hasMany(Reservation, { foreignKey: 'restaurant_id', as: 'reservations' });
RestaurantCustomer.hasMany(Reservation, { foreignKey: 'customer_id', as: 'reservations', constraints: false });
Order.hasOne(Reservation, { foreignKey: 'deposit_order_id', as: 'reservation', constraints: false });

// Web Push notifications (v3.28+)
User.hasMany(PushSubscription, { foreignKey: 'user_id', as: 'pushSubscriptions' });
PushSubscription.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasMany(PushLog, { foreignKey: 'user_id', as: 'pushLogs' });
PushLog.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
PushSubscription.hasMany(PushLog, { foreignKey: 'subscription_id', as: 'logs' });
PushLog.belongsTo(PushSubscription, { foreignKey: 'subscription_id', as: 'subscription' });
Subscription.hasMany(Invoice, { foreignKey: 'subscription_id', as: 'invoices', constraints: false });

// Wallet Transaction — wallet ledger
ReferralWalletTransaction.belongsTo(ReferralWallet, { foreignKey: 'wallet_id', as: 'wallet' });
ReferralWallet.hasMany(ReferralWalletTransaction, { foreignKey: 'wallet_id', as: 'transactions' });

// Payout — user + reviewer (System Admin)
ReferralPayout.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
ReferralPayout.belongsTo(User, { foreignKey: 'reviewed_by', as: 'reviewer' });
User.hasMany(ReferralPayout, { foreignKey: 'user_id', as: 'payouts' });

Brand.addHook('afterUpdate', async (brand) => {
  const relevant = ['company_name', 'name', 'registration_no', 'website',
                    'bank_name', 'bank_account', 'bank_account_name'];
  if (!relevant.some(f => brand.changed(f))) return;
  await syncIssuerToContracts('brand', brand.id, brand);
});

Foodcourt.addHook('afterUpdate', async (foodcourt) => {
  const relevant = ['company_name', 'name', 'registration_no', 'website',
                    'bank_name', 'bank_account', 'bank_account_name'];
  if (!relevant.some(f => foodcourt.changed(f))) return;
  await syncIssuerToContracts('foodcourt', foodcourt.id, foodcourt);
});

// ──────────────────────────────────────────────────────────────────────────
// Brand Menu System (v3.32+) — associations
// Brand 1:N BrandMenu, BrandMenu N:M BrandMenuOptionGroup, BrandMenu → Product (sync target)
// ──────────────────────────────────────────────────────────────────────────
Brand.hasMany(BrandMenu, { foreignKey: 'brand_id', as: 'brandMenus' });
BrandMenu.belongsTo(Brand, { foreignKey: 'brand_id', as: 'brand' });

Brand.hasMany(BrandMenuCategory, { foreignKey: 'brand_id', as: 'brandMenuCategories' });
BrandMenuCategory.belongsTo(Brand, { foreignKey: 'brand_id', as: 'brand' });
BrandMenuCategory.hasMany(BrandMenu, { foreignKey: 'category_id', as: 'menus' });
BrandMenu.belongsTo(BrandMenuCategory, { foreignKey: 'category_id', as: 'category' });

Brand.hasMany(BrandMenuOptionGroup, { foreignKey: 'brand_id', as: 'brandMenuOptionGroups' });
BrandMenuOptionGroup.belongsTo(Brand, { foreignKey: 'brand_id', as: 'brand' });
BrandMenuOptionGroup.hasMany(BrandMenuOption, { foreignKey: 'group_id', as: 'options' });
BrandMenuOption.belongsTo(BrandMenuOptionGroup, { foreignKey: 'group_id', as: 'group' });

BrandMenu.belongsTo(ProductRecipe, { foreignKey: 'product_recipe_id', as: 'recipe' });
ProductRecipe.hasMany(BrandMenu, { foreignKey: 'product_recipe_id', as: 'brandMenus' });

BrandMenu.belongsToMany(BrandMenuOptionGroup, {
  through: BrandMenuOptionGroupLink,
  foreignKey: 'brand_menu_id',
  otherKey: 'option_group_id',
  as: 'optionGroups'
});
BrandMenuOptionGroup.belongsToMany(BrandMenu, {
  through: BrandMenuOptionGroupLink,
  foreignKey: 'option_group_id',
  otherKey: 'brand_menu_id',
  as: 'menus'
});

// Restaurant.Product → BrandMenu (sync target)
BrandMenu.hasMany(Product, { foreignKey: 'brand_menu_id', as: 'linkedProducts' });
Product.belongsTo(BrandMenu, { foreignKey: 'brand_menu_id', as: 'brandMenu' });

// BrandMenu scope allowlist (scope_mode='selected') — 2026-06-15 §14
BrandMenu.belongsToMany(Restaurant, {
  through: BrandMenuRestaurant, foreignKey: 'brand_menu_id', otherKey: 'restaurant_id', as: 'scopeRestaurants'
});
Restaurant.belongsToMany(BrandMenu, {
  through: BrandMenuRestaurant, foreignKey: 'restaurant_id', otherKey: 'brand_menu_id', as: 'scopedBrandMenus'
});
BrandMenu.hasMany(BrandMenuRestaurant, { foreignKey: 'brand_menu_id', as: 'scopeRows' });
BrandMenuRestaurant.belongsTo(BrandMenu, { foreignKey: 'brand_menu_id', as: 'brandMenu' });
BrandMenuRestaurant.belongsTo(Restaurant, { foreignKey: 'restaurant_id', as: 'restaurant' });

// Restaurant.OptionGroup → BrandMenuOptionGroup (mirror sync)
BrandMenuOptionGroup.hasMany(OptionGroup, { foreignKey: 'brand_menu_option_group_id', as: 'mirrors' });
OptionGroup.belongsTo(BrandMenuOptionGroup, { foreignKey: 'brand_menu_option_group_id', as: 'sourceGroup' });

// Cash management — 교대(Shift) ↔ 대조(Reconciliation) ↔ 매장
CashierShift.belongsTo(Restaurant, { foreignKey: 'restaurant_id', as: 'restaurant' });
CashierShift.hasMany(CashReconciliation, { foreignKey: 'shift_id', as: 'reconciliations' });
CashReconciliation.belongsTo(CashierShift, { foreignKey: 'shift_id', as: 'shift' });
CashReconciliation.belongsTo(Restaurant, { foreignKey: 'restaurant_id', as: 'restaurant' });
// Phase 2 — 인출/입금(CashMovement) ↔ 교대 / 결제수단 사전등록(PaymentMethodSetting) ↔ 매장
CashierShift.hasMany(CashMovement, { foreignKey: 'shift_id', as: 'movements' });
CashMovement.belongsTo(CashierShift, { foreignKey: 'shift_id', as: 'shift' });
CashMovement.belongsTo(Restaurant, { foreignKey: 'restaurant_id', as: 'restaurant' });
PaymentMethodSetting.belongsTo(Restaurant, { foreignKey: 'restaurant_id', as: 'restaurant' });
Restaurant.hasMany(PaymentMethodSetting, { foreignKey: 'restaurant_id', as: 'paymentMethodSettings' });

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
  OrderAction,
  OrderPayment,
  CashierShift,
  CashReconciliation,
  CashMovement,
  PaymentMethodSetting,
  RestaurantDailyStats,
  PlanTemplate,
  OperationTicket,
  SupportTicket,
  RestaurantManager,
  Customer,
  RestaurantCustomer,
  Product,
  Category,
  ProductRecommendation,
  BrandMenuRecommendation,
  OptionGroup,
  Option,
  OptionIngredient,
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
  BrandProductOptionIngredient,
  BrandProductBrand,
  BrandProductRestaurant,
  FoodcourtProductRestaurant,
  BrandProductOptionGroupProduct,
  // Brand Menu System (v3.32+)
  BrandMenu,
  BrandMenuCategory,
  BrandMenuOptionGroup,
  BrandMenuOption,
  BrandMenuOptionGroupLink,
  BrandMenuRestaurant,
  Supplier,
  SupplierCategory,
  SupplierBrand,
  InventoryTransaction,
  SupplierInventoryTransaction,
  Carrier,
  CarrierWebhookEvent,
  PurchaseOrderReturn,
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
  SchedulerRun,
  Comment,
  CommentRead,
  Notice,
  NoticeRecipient,
  KitchenStation,
  ImportHistory,
  SystemProduct,
  SystemProductCategory,
  SystemProductPrice,
  SystemProductAddon,
  SystemProductOptionGroup,
  SystemProductOption,
  SystemProductOptionGroupProduct,
  HardwareQuote,
  TableQRSession,
  Contract,
  ContractDocument,
  ContractTask,
  ContractNote,
  ContractHistory,
  ContractPlan,
  FoodcourtUnit,
  FoodcourtBranch,
  FoodcourtFloorPlan,
  WorkManual,
  WorkManualCategory,
  // Sprint 1 (Supply Chain Design 1)
  SupplierCompany,
  SupplierProduct,
  SupplierProductCategory,
  SupplierProductOptionGroup,
  SupplierProductOption,
  SupplierProductOptionGroupProduct,
  SupplierInvitation,
  FoodcourtProduct,
  FoodcourtProductCategory,
  FoodcourtProductOptionGroup,
  FoodcourtProductOption,
  FoodcourtProductOptionGroupProduct,
  // Sprint 2 (Supply Chain Design 2)
  SupplierContract,
  // Sprint 3 (Supply Chain Design 3)
  IngredientSellerProduct,
  PurchaseOrder,
  PurchaseOrderItem,
  // Referral System
  ReferralWallet,
  ReferralCommission,
  ReferralWalletTransaction,
  ReferralPayout,
  ReferralClick,
  ReferralSettings,
  // Payment gateway (v3.24+)
  PaymentCustomer,
  Subscription,
  WebhookEvent,
  // Web Push notifications (v3.28+)
  PushSubscription,
  PushLog,
  // Reservations (v3.29+)
  Reservation,
  // Print Visibility & Diagnostics (2026-06-26)
  PrintEvent
};