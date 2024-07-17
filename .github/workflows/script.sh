#!/bin/bash
set -e

# Aktuelles Verzeichnis anzeigen
pwd
FILE="../../.env"
if
# Überprüfen, ob die .env-Datei existiert
if [ ! -f "$FILE" ]; then
  echo ".env file not found!"
  exit 1
  # Jede Zeile aus der .env-Datei lesen und exportieren
  while IFS= read -r line || [[ -n "$line" ]]; do
    # Zeilen überspringen, die Kommentare oder leer sind
    if [[ ! "$line" =~ ^# && -n "$line" ]]; then
      # Führende Leerzeichen und Leerzeichen um das Gleichheitszeichen entfernen
      line=$(echo $line | sed 's/^[[:space:]]*//;s/[[:space:]]*=[[:space:]]*/=/g')
      export "$line"
    fi
  done < "$FILE"
  echo "Environment variables from .env have been exported."
fi
# Ausführbares Deploy-Skript aufrufen
../../deploy-script.sh
