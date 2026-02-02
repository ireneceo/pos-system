#!/bin/bash
# Safe npm install for low memory servers

TARGET_DIR="${1:-.}"
cd "$TARGET_DIR" || exit 1

echo "🔧 Starting safe npm install in: $(pwd)"
echo ""

# Stop PM2 services
echo "⏸️  Stopping services..."
pm2 stop all 2>/dev/null || true

# Clear cache
echo "🧹 Clearing system cache..."
sudo sync
echo 3 | sudo tee /proc/sys/vm/drop_caches > /dev/null
npm cache clean --force 2>/dev/null || true

# Wait
sleep 2

echo "💾 Available memory:"
free -h | grep Mem
echo ""

# Install with memory limits
echo "📦 Installing packages..."
NODE_OPTIONS='--max-old-space-size=400' npm install --prefer-offline --no-audit --progress=false

INSTALL_EXIT_CODE=$?

# Restart services
echo ""
echo "▶️  Restarting services..."
pm2 restart all 2>/dev/null || true

if [ $INSTALL_EXIT_CODE -eq 0 ]; then
    echo ""
    echo "✅ npm install completed successfully!"
else
    echo ""
    echo "❌ npm install failed with exit code $INSTALL_EXIT_CODE"
    exit $INSTALL_EXIT_CODE
fi
