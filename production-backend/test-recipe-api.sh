#!/bin/bash
# Recipe Management API Test Script

BASE_URL="http://localhost:3001/api"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

success() { echo -e "${GREEN}✓ $1${NC}"; }
fail() { echo -e "${RED}✗ $1${NC}"; }
info() { echo -e "${YELLOW}→ $1${NC}"; }

# 1. Login as System Admin
echo "========================================"
echo "1. Login (System Admin)"
echo "========================================"
LOGIN_RESP=$(curl -s -X POST $BASE_URL/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@pos-system.com","password":"admin123"}')
TOKEN=$(echo $LOGIN_RESP | jq -r '.data.token')
if [ "$TOKEN" != "null" ] && [ -n "$TOKEN" ]; then
  success "Login successful"
else
  fail "Login failed"
  exit 1
fi

# 2. Get Brand Restaurants
echo ""
echo "========================================"
echo "2. Get Brand Restaurants (brand_id=1)"
echo "========================================"
BRAND_RESTS=$(curl -s $BASE_URL/brands/1/restaurants -H "Authorization: Bearer $TOKEN")
echo $BRAND_RESTS | jq '.'
if echo $BRAND_RESTS | jq -e '.success' > /dev/null 2>&1; then
  success "Get brand restaurants OK"
else
  fail "Get brand restaurants failed"
fi

# 3. Update recipe_manager_type
echo ""
echo "========================================"
echo "3. Update recipe_manager_type to 'brand'"
echo "========================================"
UPDATE_RESP=$(curl -s -X PATCH $BASE_URL/brands/1/restaurants/8/recipe-manager-type \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"recipe_manager_type":"brand"}')
echo $UPDATE_RESP | jq '.'
if echo $UPDATE_RESP | jq -e '.success' > /dev/null 2>&1; then
  success "Update recipe_manager_type to 'brand' OK"
else
  fail "Update recipe_manager_type failed"
fi

# 4. Create Brand Ingredient
echo ""
echo "========================================"
echo "4. Create Brand Ingredient"
echo "========================================"
INGR_RESP=$(curl -s -X POST $BASE_URL/brands/1/ingredients \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "code":"ING001",
    "name":"Korean Chili Paste (Gochujang)",
    "category":"spices",
    "unit":"kg",
    "unit_cost":15.00,
    "supplier_name":"Korean Foods Inc",
    "min_stock":5
  }')
echo $INGR_RESP | jq '.'
INGREDIENT_ID=$(echo $INGR_RESP | jq -r '.data.id')
if [ "$INGREDIENT_ID" != "null" ] && [ -n "$INGREDIENT_ID" ]; then
  success "Create ingredient OK (ID: $INGREDIENT_ID)"
else
  fail "Create ingredient failed"
fi

# 5. Get Brand Ingredients
echo ""
echo "========================================"
echo "5. Get Brand Ingredients"
echo "========================================"
curl -s $BASE_URL/brands/1/ingredients -H "Authorization: Bearer $TOKEN" | jq '.data | .[] | {id, name, unit_cost}'

# 6. Create Brand Recipe
echo ""
echo "========================================"
echo "6. Create Brand Recipe"
echo "========================================"
RECIPE_RESP=$(curl -s -X POST $BASE_URL/brands/1/recipes \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"name\":\"Bibimbap\",
    \"description\":\"Traditional Korean mixed rice bowl\",
    \"category\":\"Main\",
    \"emoji\":\"🍚\",
    \"prep_time\":10,
    \"cook_time\":15,
    \"suggested_price\":18.90,
    \"ingredients\":[
      {\"ingredient_id\":$INGREDIENT_ID,\"quantity\":0.05,\"unit\":\"kg\"}
    ],
    \"instructions\":\"1. Cook rice\\n2. Prepare vegetables\\n3. Mix with gochujang\"
  }")
echo $RECIPE_RESP | jq '.'
RECIPE_ID=$(echo $RECIPE_RESP | jq -r '.data.id')
if [ "$RECIPE_ID" != "null" ] && [ -n "$RECIPE_ID" ]; then
  success "Create recipe OK (ID: $RECIPE_ID)"
else
  fail "Create recipe failed"
fi

# 7. Get Brand Recipes
echo ""
echo "========================================"
echo "7. Get Brand Recipes"
echo "========================================"
curl -s $BASE_URL/brands/1/recipes -H "Authorization: Bearer $TOKEN" | jq '.data | .[] | {id, name, suggested_price, total_ingredient_cost}'

# 8. Get Restaurant Recipes (should see brand recipes)
echo ""
echo "========================================"
echo "8. Get Restaurant Recipes (restaurant_id=8)"
echo "========================================"
REST_RECIPES=$(curl -s $BASE_URL/restaurants/8/recipes -H "Authorization: Bearer $TOKEN")
echo $REST_RECIPES | jq '{recipe_manager_type: .data.recipe_manager_type, brand_recipes: [.data.brand_recipes[] | {id, name, editable}], own_recipes: .data.own_recipes | length}'

# 9. Try to create recipe in brand-managed restaurant (should fail)
echo ""
echo "========================================"
echo "9. Try Create Recipe in Brand-Managed Restaurant (Should FAIL)"
echo "========================================"
FAIL_RESP=$(curl -s -X POST $BASE_URL/restaurants/8/recipes \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Recipe","category":"Test"}')
echo $FAIL_RESP | jq '.'
if echo $FAIL_RESP | jq -e '.error' > /dev/null 2>&1; then
  success "Correctly rejected - brand managed restaurant cannot create recipes"
else
  fail "Should have been rejected"
fi

# 10. Change to restaurant-managed
echo ""
echo "========================================"
echo "10. Change to restaurant-managed"
echo "========================================"
curl -s -X PATCH $BASE_URL/brands/1/restaurants/8/recipe-manager-type \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"recipe_manager_type":"restaurant"}' | jq '.'

# 11. Create recipe in restaurant-managed mode (should succeed)
echo ""
echo "========================================"
echo "11. Create Recipe in Restaurant-Managed Mode (Should SUCCEED)"
echo "========================================"
REST_RECIPE=$(curl -s -X POST $BASE_URL/restaurants/8/recipes \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Restaurant Special","description":"Our special dish","category":"Special","suggested_price":25.00}')
echo $REST_RECIPE | jq '.'
REST_RECIPE_ID=$(echo $REST_RECIPE | jq -r '.data.id')
if [ "$REST_RECIPE_ID" != "null" ] && [ -n "$REST_RECIPE_ID" ]; then
  success "Create restaurant recipe OK (ID: $REST_RECIPE_ID)"
else
  fail "Create restaurant recipe failed"
fi

# 12. Recipe to Product conversion
echo ""
echo "========================================"
echo "12. Convert Recipe to Product"
echo "========================================"
PRODUCT_RESP=$(curl -s -X POST $BASE_URL/restaurants/8/products/create-from-recipe \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"recipe_id\":$RECIPE_ID,\"price\":19.90}")
echo $PRODUCT_RESP | jq '.'
if echo $PRODUCT_RESP | jq -e '.success' > /dev/null 2>&1; then
  success "Recipe to Product conversion OK"
else
  fail "Recipe to Product conversion failed"
fi

# 13. Update Brand Recipe
echo ""
echo "========================================"
echo "13. Update Brand Recipe"
echo "========================================"
UPDATE_RECIPE=$(curl -s -X PUT $BASE_URL/brands/1/recipes/$RECIPE_ID \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Bibimbap Deluxe","suggested_price":22.90}')
echo $UPDATE_RECIPE | jq '{id: .data.id, name: .data.name, suggested_price: .data.suggested_price}'
if echo $UPDATE_RECIPE | jq -e '.success' > /dev/null 2>&1; then
  success "Update brand recipe OK"
else
  fail "Update brand recipe failed"
fi

# 14. Delete Restaurant Recipe
echo ""
echo "========================================"
echo "14. Delete Restaurant Recipe"
echo "========================================"
if [ "$REST_RECIPE_ID" != "null" ] && [ -n "$REST_RECIPE_ID" ]; then
  DEL_RESP=$(curl -s -X DELETE $BASE_URL/restaurants/8/recipes/$REST_RECIPE_ID \
    -H "Authorization: Bearer $TOKEN")
  echo $DEL_RESP | jq '.'
  if echo $DEL_RESP | jq -e '.success' > /dev/null 2>&1; then
    success "Delete restaurant recipe OK"
  else
    fail "Delete restaurant recipe failed"
  fi
fi

echo ""
echo "========================================"
echo "TEST SUMMARY"
echo "========================================"
echo "All Recipe Management APIs tested!"
