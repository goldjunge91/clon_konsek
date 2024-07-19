#!/bin/bash

ENVIRONMENT=$1
DEPLOY_MESSAGE=$2

echo "Deploying to $ENVIRONMENT environment"
echo "Deploy message: $DEPLOY_MESSAGE"
# export NODE_ENV=development # developmentKorrektur: Zuweisung mit Gleichheitszeichen und korrekter Syntax
# echo "NODE_ENV set to $NODE_ENV" # Verbesserte Ausgabe

set -a # Alle folgenden Variablen werden automatisch exportiert
source .env # Lädt Umgebungsvariablen aus der .env-Datei
set +a # Beendet den automatischen Export von Variablen

# Exportieren der Umgebungsvariablen für PM2^^
export $(grep -v '^#' .env | xargs) # Ignoriert Kommentare in der .env-Datei
# Überprüfung, ob die Verzeichnisse .next oder node_modules existieren
if [ ! -d ".next" ] || [ ! -d "node_modules" ]; then
    npm install
fi

# npm install
npx next build
pm2 restart ecosystem.config.cjs
pm2 save

echo "Deployment abgeschlossen"
