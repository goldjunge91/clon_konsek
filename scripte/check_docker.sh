#!/bin/bash

# Funktion zur Überprüfung und Ausführung von Docker-Befehlen
check_container() {
    local container_id=$1

    echo "Überprüfe Container: $container_id"

    if ! docker ps | grep -q $container_id; then
        echo "Container $container_id ist nicht aktiv. Versuche zu starten..."
        docker start $container_id
    fi

    echo "Container Informationen:"
    docker inspect $container_id | grep -E "Name|State|Platform|Image"

    echo "Container Netzwerk-Informationen:"
    docker inspect $container_id | grep -A 10 "Networks"

    echo "Container Umgebungsvariablen:"
    docker exec $container_id env

    echo "PostgreSQL Version:"
    docker exec $container_id psql --version

    echo "PostgreSQL Datenbanken:"
    docker exec $container_id psql -U postgres -c "\l"

    echo "Container Logs (letzte 20 Zeilen):"
    docker logs --tail 20 $container_id
}

# Hauptskript
echo "Aktive Docker Container:"
docker ps

read -p "Geben Sie die Container-ID oder den Namen ein: " container_id

check_container $container_id
