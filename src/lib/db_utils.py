import os
from dotenv import load_dotenv
import psycopg2
from psycopg2.extras import RealDictCursor
from crontab import CronTab
from datetime import datetime, timedelta
import logging
import logging.handlers

LOG_FILE_EXT = ".log"

# Laden der Umgebungsvariablen aus der .env-Datei
load_dotenv(os.path.join(os.path.dirname(__file__), "../../.env"))
#  TODO change me
# base_path ="/home/runneruser/actions-runner/_work/pdf-website/pdf-website/"
base_path = (
    "/home/runneruser/actions-runner/_work/pdf-website/pdf-website/DATA/downloads/"
)
# env_path = r"C:\GIT\pdf-website\.env"


# Datenbank-Verbindungsdetails aus den Umgebungsvariablen
DB_HOST = os.environ.get("DB_HOST")
DB_NAME = os.environ.get("DB_NAME")
DB_USER = os.environ.get("DB_USER")
DB_PASSWORD = os.environ.get("DB_PASSWORD")


def setup_logging():
    current_date = datetime.now().strftime("%d-%m-%Y")
    logger = logging.getLogger()
    logger.setLevel(logging.INFO)
    log_file_path = f"{__file__}_{current_date}_{LOG_FILE_EXT}"
    file_handler = logging.handlers.RotatingFileHandler(
        log_file_path, maxBytes=10 * 1024 * 1024, backupCount=5
    )
    file_handler.setLevel(logging.INFO)
    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.WARNING)
    formatter = logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")
    file_handler.setFormatter(formatter)
    console_handler.setFormatter(formatter)
    logger.addHandler(file_handler)
    logger.addHandler(console_handler)
    logging.info("Logging-System erfolgreich konfiguriert.")


def update_task_status_in_db(task_id: str, new_status: str) -> bool:
    try:
        conn = psycopg2.connect(
            host=DB_HOST, database=DB_NAME, user=DB_USER, password=DB_PASSWORD
        )
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        update_query = "UPDATE task SET status = %s WHERE id = %s"
        cursor.execute(update_query, (new_status, task_id))
        conn.commit()
        updated_rows = cursor.rowcount
        cursor.close()
        conn.close()
        return updated_rows > 0
    except (Exception, psycopg2.Error) as error:
        logging.error(f"Fehler beim Aktualisieren des Task-Status: {error}")
        return False


def schedule_delete_folder_cronjob(folder_to_delete: str) -> None:
    try:
        # Create a new cron job
        Crontab = CronTab(user=True)
        command = f"rm -rf {folder_to_delete}"
        job = Crontab.new(command=command)

        # Set the job to run in 120 minutes
        now = datetime.now()
        execution_time = now + timedelta(minutes=120)
        job.setall(execution_time.strftime("%-M %-H %-d %-m *"))
        # Write the cron job to the crontab file
        Crontab.write()
        logging.info(
            f"Cronjob scheduled to delete folder: {folder_to_delete} at {execution_time}"
        )
    except Exception as error:
        logging.error(f"Fehler beim Planen des Cronjobs: {error}")


def schedule_delete_db_point_and_folder(folder_to_delete: str, task_id: str) -> None:
    try:
        # cron = CronTab(user=True)
        cron = CronTab()
        # Command to delete folder
        folder_delete_command = f"rm -rf {folder_to_delete}"

        # Command to delete task from database
        db_delete_command = f"psql -h {DB_HOST} -U {DB_USER} -d {DB_NAME} -c \"DELETE FROM task WHERE id = '{task_id}'\""

        # Combine commands
        combined_command = f"{folder_delete_command} && {db_delete_command}"

        job = cron.new(command=combined_command)

        # Set the job to run in 120 minutes
        now = datetime.now()
        execution_time = now + timedelta(minutes=120)
        job.setall(execution_time.strftime("%-M %-H %-d %-m *"))

        # Write the cron job to the crontab file
        cron.write()
        logging.info(
            f"Cronjob scheduled to delete folder and task: {folder_to_delete}, {task_id} at {execution_time}"
        )
    except Exception as error:
        logging.error(f"Error scheduling cronjob: {error}")


def test_db_deletion(task_id: str) -> None:
    try:
        conn = psycopg2.connect(
            host=DB_HOST, database=DB_NAME, user=DB_USER, password=DB_PASSWORD)
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        delete_query = "DELETE FROM task WHERE id = %s RETURNING *"
        cursor.execute(delete_query, (task_id,))
        deleted_task = cursor.fetchone()
        conn.commit()
        cursor.close()
        conn.close()

        if deleted_task:
            logging.info(f"Task {task_id} successfully deleted: {deleted_task}")
        else:
            logging.warning(f"No task found with id {task_id}")
    except (Exception, psycopg2.Error) as error:
        logging.error(f"Error deleting task from database: {error}")


# db_delete_command = f"psql -h {DB_HOST} -U {DB_USER} -d {DB_NAME} -c \"DELETE FROM task WHERE id = '{task_id}'\""
