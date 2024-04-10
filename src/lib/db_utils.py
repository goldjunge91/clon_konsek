import os
from dotenv import load_dotenv
import psycopg2
from psycopg2.extras import RealDictCursor

# Laden der Umgebungsvariablen aus der .env-Datei
load_dotenv(os.path.join(os.path.dirname(__file__), '../../.env'))

# Datenbank-Verbindungsdetails aus den Umgebungsvariablen
DB_HOST = os.environ.get('DB_HOST', 'localhost')
DB_NAME = os.environ.get('DB_NAME', 'postgres')
DB_USER = os.environ.get('DB_USER', 'postgres')
DB_PASSWORD = os.environ.get('DB_PASSWORD', 'Iphone5S')

def update_task_status_in_db(task_id: str, new_status: str) -> None:
    try:
        conn = psycopg2.connect(
            host=DB_HOST,
            database=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD
        )

        cursor = conn.cursor(cursor_factory=RealDictCursor)
        update_query = "UPDATE task SET status = %s WHERE id = %s"
        cursor.execute(update_query, (new_status, task_id))
        conn.commit()

        updated_rows = cursor.rowcount

        if updated_rows > 0:
            return
            # print(f"Task mit ID {task_id} wurde auf '{new_status}' gesetzt.")
        else:
            return
            # print(f"Task mit ID {task_id} konnte nicht aktualisiert werden.")

        cursor.close()
        conn.close()

    except (Exception, psycopg2.Error) as error:
        print(f"Fehler beim Aktualisieren des Task-Status: {error}")
