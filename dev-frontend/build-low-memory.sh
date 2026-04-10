#!/bin/bash
# Low memory build script for 2GB RAM server

echo "🔧 Preparing low-memory build environment..."

# Stop PM2 services temporarily to free memory
echo "⏸️  Stopping services to free memory..."
pm2 stop all

# Clear system cache
echo "🧹 Clearing cache..."
sudo sync
echo 3 | sudo tee /proc/sys/vm/drop_caches > /dev/null

# Wait for memory to stabilize
sleep 2

# Show available memory
echo "💾 Available memory:"
free -h | grep Mem

echo ""
echo "🔨 Starting build with memory limits..."

# Build with strict memory limits and error handling
NODE_OPTIONS='--max-old-space-size=400' \
GENERATE_SOURCEMAP=false \
CI=false \
npm run build

BUILD_EXIT_CODE=$?

# Restart services
echo ""
echo "▶️  Restarting services..."
pm2 restart all

if [ $BUILD_EXIT_CODE -eq 0 ]; then
    echo ""
    echo "✓ Build completed successfully!"
else
    echo ""
    echo "✗ Build failed with exit code $BUILD_EXIT_CODE"
    exit $BUILD_EXIT_CODE
fi
