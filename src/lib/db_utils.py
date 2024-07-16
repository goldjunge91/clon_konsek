# Importieren der benötigten Module
import os
import sys
import argparse
from dotenv import load_dotenv
import psycopg2
from psycopg2.extras import RealDictCursor
from crontab import CronTab
from datetime import datetime, timedelta
import logging
import logging.handlers
import shutil
import subprocess
from pathlib import Path


# Definition der Dateiendung für Log-Dateien
LOG_FILE_EXT = ".log"

# Laden der Umgebungsvariablen aus der .env-Datei
load_dotenv(os.path.join(os.path.dirname(__file__), "../../.env"))

# Definition des Basispfads für Downloads
base_path = Path(
    "/home/runneruser/actions-runner/_work/pdf-website/pdf-website/DATA/downloads/"
).joinpath("")

# Abrufen der Datenbankverbindungsdetails aus den Umgebungsvariablen
DB_HOST = os.environ.get("DB_HOST")
DB_NAME = os.environ.get("DB_NAME")
DB_USER = os.environ.get("DB_USER")
DB_PASSWORD = os.environ.get("DB_PASSWORD")


# Funktion zum Einrichten des Loggings
def setup_logging():
    # Aktuelles Datum für den Log-Dateinamen
    current_date = datetime.now().strftime("%d-%m-%Y")
    # Erstellen des Logger-Objekts
    logger = logging.getLogger()
    # Setzen des Log-Levels
    logger.setLevel(logging.INFO)
    # Erstellen des Pfads für die Log-Datei
    log_file_path = f"{__file__}_{current_date}_{LOG_FILE_EXT}"
    # Erstellen eines rotierenden File-Handlers
    file_handler = logging.handlers.RotatingFileHandler(
        log_file_path, maxBytes=10 * 1024 * 1024, backupCount=5
    )
    # Setzen des Log-Levels für den File-Handler
    file_handler.setLevel(logging.INFO)
    # Erstellen eines Console-Handlers
    console_handler = logging.StreamHandler()
    # Setzen des Log-Levels für den Console-Handler
    console_handler.setLevel(logging.WARNING)
    # Erstellen eines Formatters für die Log-Nachrichten
    formatter = logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")
    # Zuweisen des Formatters zu den Handlern
    file_handler.setFormatter(formatter)
    console_handler.setFormatter(formatter)
    # Hinzufügen der Handler zum Logger
    logger.addHandler(file_handler)
    logger.addHandler(console_handler)
    # Loggen einer Erfolgsmeldung
    logging.info("Logging-System erfolgreich konfiguriert.")


# Funktion zum Planen der Löschung und Aktualisieren des Datenbankstatus
def schedule_delete_db_update_db(new_status: str, task_id: str) -> bool:
    try:
        folder_to_delete = os.path.join(str(base_path), str(task_id))
        # Verbindung zur Datenbank herstellen
        conn = psycopg2.connect(
            host=DB_HOST, database=DB_NAME, user=DB_USER, password=DB_PASSWORD
        )
        # Cursor erstellen
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        # SQL-Query zum Aktualisieren des Task-Status
        update_query = "UPDATE task SET status = %s WHERE id = %s"
        # Ausführen der Query
        cursor.execute(update_query, (new_status, task_id))
        updated_rows = cursor.rowcount  # Anzahl der aktualisierten Zeilen speichern
        # Änderungen bestätigen
        conn.commit()
        # Cursor und Verbindung schließen
        cursor.close()
        conn.close()
        if updated_rows == 0:
            logging.warning(f"Keine Aufgabe mit ID {task_id} gefunden.")
            return False
        logging.info(f"Datenbankstatus für Task {task_id} auf 'completed' gesetzt.")
        cron = CronTab(user=True)  # Planen des Cronjobs
        # Erstellen eines neuen Cronjobs
        job = cron.new(command=f"python3 {os.path.abspath(__file__)} delete {task_id}")
        # execution_time = (datetime.now() + timedelta(minutes=1)).strftime(
        #     "%M %H %d %m *"
        # )
        execution_time = datetime.now() + timedelta(minutes=10)
        # Setzen des Zeitplans für den Cronjob (120 Minuten in der Zukunft)
        job.setall(execution_time)
        # Speichern des Cronjobs
        cron.write()
        # Loggen der erfolgreichen Aktualisierung und Planung
        return True
    except Exception as error:
        # Loggen eines Fehlers bei der Cronjob-Planung
        logging.error(
            f"Fehler beim Aktualisieren des Task-Status und Planen der Löschung: {error}"
        )
        return False
    finally:
        logging.info(
            f"Task {task_id} Status aktualisiert und Löschung in 120 Minuten geplant."
        )


# Funktion zum Löschen der Task-Daten
def delete_task_data(task_id: str) -> bool:
    try:
        # Ordner löschen
        folder_to_delete = base_path / task_id
        if folder_to_delete.exists():
            shutil.rmtree(folder_to_delete)
            logging.info(f"Ordner {folder_to_delete} wurde erfolgreich gelöscht.")
        else:
            logging.warning(f"Ordner {folder_to_delete} existiert nicht.")

        # Verbindung zur Datenbank herstellen
        conn = psycopg2.connect(
            host=DB_HOST, database=DB_NAME, user=DB_USER, password=DB_PASSWORD
        )
        # Cursor erstellen
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        # SQL-Query zum Löschen des Task-Eintrags
        delete_query = "DELETE FROM task WHERE id = %s"
        cursor.execute(delete_query, (task_id,))  # Ausführen der Query
        conn.commit()  # Änderungen bestätigen
        cursor.close()  # Cursor und Verbindung schließen
        conn.close()
        logging.info(
            f"Task {task_id} und zugehörige Daten erfolgreich gelöscht."
        )  # Loggen der erfolgreichen Löschung
        cron = CronTab(user=True)  # Löschen des Cronjobs
        cron.remove_all(
            comment=task_id
        )  # Entfernen aller Cronjobs mit dem entsprechenden Kommentar
        cron.write()  # Speichern der Änderungen
        logging.info(
            f"Cronjob für Task {task_id} wurde entfernt."
        )  # Loggen der erfolgreichen Entfernung des Cronjobs
    except Exception as error:
        logging.error(
            f"Fehler beim Löschen der Task-Daten: {error}"
        )  # Loggen eines Fehlers beim Löschen der Task-Daten
    finally:
        return True


# Hauptfunktion
def main():
    # Erstellen eines ArgumentParser-Objekts
    parser = argparse.ArgumentParser(description="Verwalte Aufgaben und deren Daten.")
    # Hinzufügen des Arguments für die Aktion
    parser.add_argument(
        "action",
        choices=["update", "delete"],
        help="Aktion, die ausgeführt werden soll",
    )
    # Hinzufügen des Arguments für die Task-ID
    parser.add_argument("task_id", help="ID der Aufgabe")
    # Hinzufügen des optionalen Arguments für den neuen Status
    parser.add_argument(
        "new_status",
        nargs="?",
        help="Neuer Status für die Aufgabe (nur bei 'update' erforderlich)",
    )

    # Parsen der Argumente
    args = parser.parse_args()

    # Einrichten des Loggings
    setup_logging()

    # Loggen der Aktion und Task-ID
    logging.info(f"Aktion: {args.action}")
    logging.info(f"Task ID: {args.task_id}")

    # Ausführen der entsprechenden Aktion
    if args.action == "delete":
        logging.info(f"Starte Löschvorgang für Aufgabe {args.task_id}...")
        success = delete_task_data(args.task_id)
        if success:
            logging.info(f"Löschvorgang für Aufgabe {args.task_id} abgeschlossen.")
        else:
            logging.error(f"Fehler beim Löschen der Aufgabe {args.task_id}.")
    if args.action == "update":
        logging.info(f"Starte Update für Aufgabe {args.task_id}...")
        success = schedule_delete_db_update_db(args.task_id, args.new_status)
        if success:
            logging.info(f"Löschvorgang für Aufgabe {args.task_id} abgeschlossen.")
        else:
            logging.error(f"Fehler beim Löschen der Aufgabe {args.task_id}.")


# Ausführen der Hauptfunktion, wenn das Skript direkt ausgeführt wird
if __name__ == "__main__":
    main()
