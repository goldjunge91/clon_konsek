#!/bin/bash
set -e


# Aktuelles Verzeichnis anzeigen
pwd

# Verzeichnis des Skripts bestimmen
SCRIPT_DIR=$(dirname "$(readlink -f "$0")")
echo "Script directory: $SCRIPT_DIR"

# Pfad zur .noob-Datei relativ zum Skriptverzeichnis
FILE="$SCRIPT_DIR/.env"

# Überprüfen, ob die .noob-Datei existiert
if [ ! -f "$FILE" ]; then
  echo ".noob file not found at $FILE!"
  exit 1
fi

echo ".noob file found at $FILE"


# Jede Zeile aus der .env.production-Datei lesen und exportieren
while IFS= read -r line || [[ -n "$line" ]]; do
  # Zeilen überspringen, die Kommentare oder leer sind
  if [[ ! "$line" =~ ^# && -n "$line" ]]; then
    # Führende Leerzeichen und Leerzeichen um das Gleichheitszeichen entfernen
    line=$(echo $line | sed 's/^[[:space:]]*//;s/[[:space:]]*=[[:space:]]*/=/g')
    export "$line"
    # echo "$line"
  fi
done < "$FILE"

echo "Environment variables from .env have been exported."
# # Navigate to the directory containing package.json
# Clear npm cache
# npm cache clean --force
# Datei, die gelöscht werden soll
# FILE=".env"
# # Überprüfen, ob die Datei existiert und löschen
# if [ -f "$FILE" ]; then
#     rm "$FILE"
#     echo "$FILE wurde gelöscht."
# else
#     echo "$FILE existiert nicht."
# fi
# Install dependencies
npm ci
# Build the application
npm run build
# Run deployment
pm2 start ecosystem.config.cjs
