#!/bin/bash
set -e

# Clear npm cache
npm cache clean --force

# Install dependencies
npm ci

# Build the application
npm run build


# Run deployment
pm2 start ecosystem.config.cjs
