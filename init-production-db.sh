#!/bin/bash
echo "========================================="
echo "Initializing Production Database"
echo "========================================="
cd /var/www/production-backend
node sync-database.js
echo "Done!"
