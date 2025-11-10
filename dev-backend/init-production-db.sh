#!/bin/bash

echo "========================================="
echo "Initializing Production Database"
echo "========================================="

PROD_DIR="/var/www/production-backend"

cd $PROD_DIR

echo "Step 1: Syncing database schema..."
node sync-database.js

echo ""
echo "Step 2: Creating system admin (optional)..."
echo "You can run: node create-system-admin.js"

echo ""
echo "========================================="
echo "Production Database Initialized!"
echo "========================================="
