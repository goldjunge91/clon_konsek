#!/bin/bash

ENVIRONMENT=$1
DEPLOY_MESSAGE=$2

echo "Deploying to $ENVIRONMENT environment"
echo "Deploy message: $DEPLOY_MESSAGE"

cd /home/$USER/app

# Führen Sie hier Ihre Deployment-Schritte aus, z.B.:
npm install --production
pm2 restart ecosystem.config.cjs
pm2 save

echo "Deployment abgeschlossen"
