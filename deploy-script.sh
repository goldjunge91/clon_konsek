#!/bin/bash
set -e

# Aktuelles Verzeichnis anzeigen
pwd

# Pfad zur .env.production-Datei
FILE=".env"

# Überprüfen, ob die .env.production-Datei existiert
if [ ! -f "$FILE" ]; then
  echo "$FILE file not found!"
  exit 1
fi

# Jede Zeile aus der .env.production-Datei lesen und exportieren
while IFS= read -r line || [[ -n "$line" ]]; do
  # Zeilen überspringen, die Kommentare oder leer sind
  if [[ ! "$line" =~ ^# && -n "$line" ]]; then
    # Führende Leerzeichen und Leerzeichen um das Gleichheitszeichen entfernen
    line=$(echo "$line" | sed 's/^[[:space:]]*//;s/[[:space:]]*=[[:space:]]*/=/g')
    export "$line"
    echo "Exported: $line"
  fi
done < "$FILE"

echo "Environment variables from $FILE have been exported."


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
# npm ci
# Build the application
# npx next build
pm2 restart ecosystem.config.cjs --update-env
pm2 save
