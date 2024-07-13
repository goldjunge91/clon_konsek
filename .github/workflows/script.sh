#!/bin/bash
set -e
pwd
# Navigate to the directory containing package.json
cd /home/runneruser/actions-runner/_work/pdf-website/pdf-website

# Clear npm cache
npm cache clean --force

# Install dependencies
npm ci

# Build the application
npm run build

# Run deployment
pm2 start ecosystem.config.cjs
