#!/bin/sh
set -e

# Check if node_modules exists and package.json has changed
if [ ! -d "node_modules" ] || [ ! -f "node_modules/.package.json" ] || ! cmp -s "package.json" "node_modules/.package.json"; then
    echo "📦 Installing dependencies..."
    npm install
    # Store package.json for future comparison
    cp package.json node_modules/.package.json
else
    echo "✅ Dependencies are up to date"
fi

# Execute the main command
exec "$@" 