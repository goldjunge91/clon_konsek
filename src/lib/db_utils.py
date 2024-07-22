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
from pathlib import Path
from urllib.parse import quote_plus, urlparse


# def process_database_url(url):
#     # Parse die URL
#     parsed = urlparse(url)

#     # Extrahiere den Benutzernamen und das Passwort
#     userpass, at, hostport = parsed.netloc.rpartition('@')
#     user, colon, password = userpass.partition(':')

#     # Wenn das Passwort ein '@' enthält, muss es speziell behandelt werden
#     if '@' in password:
#         user, password = userpass.split(':', 1)

#     # Extrahiere Host und Port
#     host, colon, port = hostport.partition(':')

#     # Extrahiere den Datenbanknamen
#     path = parsed.path.lstrip('/')

#     return {
#         'dbname': path,
#         'user': user,
#         'password': password,
#         'host': host,
#         'port': port or '5432'  # Standard-Port, falls nicht angegeben
#     }

# Definition der Dateiendung für Log-Dateien
LOG_FILE_EXT = ".log"

# Laden der Umgebungsvariablen aus der .env-Datei

# Definition des Basispfads für Downloads
base_path = Path(
    "/home/runneruser/actions-runner/_work/pdf-website/pdf-website/DATA/downloads/"
).joinpath("")

# Abrufen der Datenbankverbindungsdetails aus den Umgebungsvariablen
dotenv_path = os.path.join(os.path.dirname(__file__), "../../.env")
if os.path.exists(dotenv_path):
    load_dotenv(dotenv_path)
    print(f"Pfad zur .env-Datei: {dotenv_path}")
else:
    print("Keine .env-Datei gefunden. Verwende Umgebungsvariablen.")
DB_HOST = os.environ.get("DB_HOST")
DB_NAME = os.environ.get("DB_NAME")
DB_USER = os.environ.get("DB_USER")
DB_PASSWORD = os.environ.get("DB_PASSWORD")


# Laden der Datenbank-URL aus den Umgebungsvariablen
database_url = os.getenv("DATABASE_URL")
if not database_url:
    raise ValueError("DATABASE_URL muss gesetzt sein.")


def preprocess_database_url(url):
    parsed = urlparse(url)
    username = parsed.username
    password = parsed.password
    hostname = parsed.hostname
    port = parsed.port or '5432'
    database = parsed.path.lstrip('/')

    # URL-encode das Passwort
    encoded_password = quote_plus(password) if password else ''

    # Setze die URL wieder zusammen
    return f"postgresql://{username}:{encoded_password}@{hostname}:{port}/{database}"

# Lade die Umgebungsvariablen
load_dotenv(dotenv_path)
database_url = os.getenv("DATABASE_URL")
if not database_url:
    raise ValueError("DATABASE_URL muss gesetzt sein.")


processed_database_url = preprocess_database_url(database_url)

# Lade die Umgebungsvariablen
load_dotenv(dotenv_path)
database_url = os.getenv("DATABASE_URL")
if not database_url:
    raise ValueError("DATABASE_URL muss gesetzt sein.")

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
    result = {
    "success": False,
    "message": "",
    "db_updated": False,
    "cron_job_scheduled": False
    }

    try:
        folder_to_delete = os.path.join(str(base_path), str(task_id))

        # Verbindung zur Datenbank herstellen
        conn = psycopg2.connect(processed_database_url)
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
            result["message"] = f"Keine Aufgabe mit ID {task_id} gefunden."
            logging.warning(result["message"])
            return result

        result["db_updated"] = True
        logging.info(f"Datenbankstatus für Task {task_id} auf 'completed' gesetzt.")

        cron = CronTab(user=True)  # Planen des Cronjobs
        # Erstellen eines neuen Cronjobs
        job = cron.new(command=f"python3 {os.path.abspath(__file__)} delete {task_id}")
        execution_time = datetime.now() + timedelta(minutes=5)
        job.setall(
            execution_time.strftime("%M %H %d %m *")
        )  # Setzen des Zeitplans für den Cronjob (120 Minuten in der Zukunft)
        job.set_comment(f"Delete_task_{task_id}")
        # Speichern des Cronjobs
        job.enable()
        cron.write()

        result["cron_job_scheduled"] = True
        result["success"] = True
        result["message"] = (f"Task {task_id} aktualisiert und Löschung geplant für {execution_time}.")
        logging.info(result["message"])

    except Exception as error:
        result["message"] = f"Fehler: {str(error)}"
        logging.error(f"Fehler beim Aktualisieren des Task-Status und Planen der Löschung: {error}")

    return result

def delete_task_data(task_id: str) -> dict:
    result = {
        "success": False,
        "folder_deleted": False,
        "db_entry_deleted": False,
        "cron_job_removed": False,
        "messages": []
    }

    try:
        # Ordner löschen
        folder_to_delete = base_path / task_id
        if folder_to_delete.exists():
            shutil.rmtree(folder_to_delete)
            result["folder_deleted"] = True
            result["messages"].append(f"Ordner {folder_to_delete} wurde erfolgreich gelöscht.")
        else:
            result["messages"].append(f"Ordner {folder_to_delete} existiert nicht.")

        # Datenbankeintrag löschen
        try:
            conn = psycopg2.connect(processed_database_url)
            cursor = conn.cursor(cursor_factory=RealDictCursor)
            delete_query = "DELETE FROM task WHERE id = %s"
            cursor.execute(delete_query, (task_id,))
            deleted_rows = cursor.rowcount
            conn.commit()
            cursor.close()
            conn.close()

            if deleted_rows > 0:
                result["db_entry_deleted"] = True
                result["messages"].append(f"Task {task_id} wurde aus der Datenbank gelöscht.")
            else:
                result["messages"].append(f"Kein Datenbankeintrag für Task {task_id} gefunden.")
        except Exception as db_error:
            result["messages"].append(f"Fehler beim Löschen des Datenbankeintrags: {str(db_error)}")

        # Cron-Job entfernen
        try:
            cron = CronTab(user=True)
            jobs_to_remove = cron.find_comment(f"Delete_task_{task_id}")
            removed_jobs = 0
            for job in jobs_to_remove:
                cron.remove(job)
                removed_jobs += 1
            if removed_jobs > 0:
                cron.write()
                result["cron_job_removed"] = True
                result["messages"].append(f"{removed_jobs} Cronjob(s) für Task {task_id} wurde(n) entfernt.")
            else:
                result["messages"].append(f"Kein Cronjob für Task {task_id} gefunden.")
        except Exception as cron_error:
            result["messages"].append(f"Fehler beim Entfernen des Cronjobs: {str(cron_error)}")

        # Gesamterfolg bestimmen
        result["success"] = result["folder_deleted"] or result["db_entry_deleted"] or result["cron_job_removed"]

    except Exception as error:
        result["messages"].append(f"Allgemeiner Fehler beim Löschen der Task-Daten: {str(error)}")

    return result

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

        conn = psycopg2.connect(processed_database_url)
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

         # Cron-Job entfernen
        cron = CronTab(user=True)
        jobs_to_remove = cron.find_comment(f"Delete_task_{task_id}")
        for job in jobs_to_remove:
            cron.remove(job)
            logging.info(f"Cronjob für Task {task_id} wurde entfernt.")
        cron.write()
        logging.info(f"Cronjob für Task {task_id} wurde entfernt.")
        return True
    except Exception as error:
        logging.error(f"Fehler beim Löschen der Task-Daten: {error}")
        return False


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
    logging.info(f"Original DATABASE_URL: {database_url}")
    logging.info(f"Processed DATABASE_URL: {processed_database_url}")

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
