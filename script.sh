#!/bin/bash
set -e
pwd
# Ensure the file exists
if [ ! -f .env.production ]; then
  echo ".env.production file not found!"
  exit 1
fi

# Read and export each line in the .env.production file
while IFS= read -r line || [[ -n "$line" ]]; do
  # Skip lines that are comments or empty
  if [[ ! "$line" =~ ^# && -n "$line" ]]; then
    export "$line"
  fi
done < .env.production

echo "Environment variables from .env.production have been exported."
# # Navigate to the directory containing package.json
# cd /home/runneruser/actions-runner/_work/pdf-website/pdf-website

# # Clear npm cache
# npm cache clean --force

# # Install dependencies
# npm ci

# # Build the application
# npm run build

# # Run deployment
# pm2 start ecosystem.config.cjs
