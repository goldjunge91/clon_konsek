#!/bin/bash

# Funktion zum Überprüfen, ob ein Befehl erfolgreich ausgeführt wurde
check_success() {
    if [ $? -ne 0 ]; then
        echo "Fehler beim Ausführen des Befehls: $1"
        exit 1
    fi
}

# Verzeichnis und Berechtigungen festlegen
DATA_DIR="/home/runneruser/1234"

echo "Erstelle Verzeichnis und setze Berechtigungen..."
sudo mkdir -p $DATA_DIR
check_success "sudo mkdir -p $DATA_DIR"

sudo chmod -R 777 $DATA_DIR
check_success "sudo chmod -R 777 $DATA_DIR"

# Docker-Gruppe erstellen, falls sie nicht existiert
if ! getent group docker > /dev/null; then
    echo "Erstelle Docker-Gruppe..."
    sudo groupadd docker
    check_success "sudo groupadd docker"
fi

# Benutzer zur Docker-Gruppe hinzufügen
echo "Füge Benutzer zur Docker-Gruppe hinzu..."
sudo usermod -aG docker $USER
check_success "sudo usermod -aG docker $USER"

# Docker-Gruppe zu sudoers hinzufügen
echo "Füge Docker-Gruppe zu sudoers hinzu..."
echo '%docker ALL=(ALL) NOPASSWD:ALL' | sudo tee -a /etc/sudoers.d/docker
check_success "sudo tee -a /etc/sudoers.d/docker"

# .env_docker Datei erstellen
ENV_FILE=".env_docker"

echo "Erstelle .env_docker Datei..."
echo "UID=$(id -u)" > $ENV_FILE
echo "GID=$(id -g)" >> $ENV_FILE
echo "POSTGRES_USER=postgres" >> $ENV_FILE
echo "POSTGRES_PASSWORD=postgres" >> $ENV_FILE
echo "POSTGRES_DB=postgres" >> $ENV_FILE

# Docker Compose Datei erstellen
COMPOSE_FILE="docker-compose.yml"

echo "Erstelle docker-compose.yml Datei..."
cat <<EOL > $COMPOSE_FILE
version: '3.9'

services:
  postgres10:
    image: postgres:latest
    restart: always
    container_name: postgres10
    user: 'root'
    ports:
      - '5432:5432'
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: postgres
    volumes:
      - $DATA_DIR:/var/lib/postgresql/data
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready -U postgres']
      interval: 10s
      timeout: 5s
      retries: 5
EOL

# Docker Compose Umgebung neu starten
echo "Starte Docker Compose Umgebung neu..."
docker-compose down -v
check_success "docker-compose down -v"

docker-compose --env-file $ENV_FILE up -d
check_success "docker-compose --env-file $ENV_FILE up -d"

# Überprüfen, ob der Container läuft
echo "Überprüfe, ob der Container läuft..."
docker ps | grep postgres10
check_success "docker ps | grep postgres10"

echo "Setup erfolgreich abgeschlossen!"
