
import codecs
import shutil
import base64
import configparser
import datetime
import logging
import logging.handlers
import os
import sys
import re
import time
from ast import main
import pandas as pd
from typing import Any, Dict
# from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.chrome.service import Service as ChromiumService
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait
from webdriver_manager.chrome import ChromeDriverManager
from webdriver_manager.core.os_manager import ChromeType
import json
import pyzipper
from typing import Any
from db_utils import update_task_status_in_db
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')
# + Variablen für den gesamten Code...
LOG_FILE_EXT = ".log"
now = datetime.datetime.now()
# base_path = "/home/marco/git/pdf-website/DATA/downloads/"
# base_path = "/home/marco/pdf-website/DATA/downloads/"
base_path = r'C:\\Users\\tozzi\\Git\\pdf-website\\DATA\\downloads\\'


options = webdriver.ChromeOptions()  # Initialize the options object
# Disable GPU acceleration
options.add_argument('--disable-gpu')
options.add_argument('--headless')
options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')
options.add_argument("user-agent=[user-agent string]")
options.add_argument('--disable-blink-features=AutomationControlled')
driver = webdriver.Chrome(service=ChromiumService(executable_path=ChromeDriverManager(chrome_type=ChromeType.GOOGLE).install()), options=options,)


def setup_logging():

    current_date = datetime.datetime.now().strftime("%d-%m-%Y")
    logger = logging.getLogger()
    logger.setLevel(logging.INFO)

    log_file_path = f"{__file__}_{current_date}_{LOG_FILE_EXT}"
    file_handler = logging.handlers.RotatingFileHandler(
        log_file_path, maxBytes=10 * 1024 * 1024, backupCount=5
    )
    file_handler.setLevel(logging.INFO)

    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.WARNING)

    formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
    file_handler.setFormatter(formatter)
    console_handler.setFormatter(formatter)

    logger.addHandler(file_handler)
    logger.addHandler(console_handler)
    logging.info("Logging-System erfolgreich konfiguriert.")

def clean_filename(filename):
    # Entferne ungültige Zeichen aus dem Dateinamen
    cleaned_filename = re.sub(r'[\\/*?:"<>|]', "", filename)
    # Kürze den Dateinamen auf maximal 100 Zeichen
    truncated_filename = cleaned_filename[:100]
    return truncated_filename


def get_user_input(base_path):
    try:
        # Überprüfen, ob der Pfad als Argument übergeben wurde
        if len(sys.argv) < 2:
            raise ValueError("Bitte übergeben Sie den Pfad als Argument.")
        # Den übergebenen Pfad an den Basispfad anhängen
        path = os.path.join(base_path, sys.argv[1])

        # Überprüfen, ob die form-data.json-Datei existiert
        form_data_path = os.path.join(path, "form-data.json")
        if not os.path.exists(form_data_path):
            raise FileNotFoundError(f"Die Datei {form_data_path} wurde nicht gefunden.")

        # form-data.json lesen und Daten extrahieren
        with open(form_data_path, "r") as file:
            form_data = json.load(file)
            user_email = form_data["dsm_mail"]
            user_password = form_data["dsmpassword"]
            user_link = form_data["dsm_url"]
            zip_password = form_data["zippassword"]
            zip_name = form_data["id"]
            taskid = form_data["id"]

        # Überprüfen, ob die benötigten Werte vorhanden sind
        if not user_email or not user_password or not user_link:
            raise ValueError("Unvollständige Daten in form-data.json.")

        # Überprüfen, ob die liste.csv-Datei existiert
        file_path = os.path.join(path, "liste.csv")
        if not os.path.exists(file_path):
            # Überprüfen, ob die liste.xlsx-Datei existiert
            file_path = os.path.join(path, "liste.xlsx")
            if not os.path.exists(file_path):
                raise FileNotFoundError("Weder liste.csv noch liste.xlsx wurden gefunden.")
        return user_email, user_password, user_link, zip_password, zip_name, file_path, taskid
    except Exception as error:
        ###print(f"{error} in main script:{error} {get_user_input} ")
        logging.info('Error in main script: ', error)
        raise

# ! Funktion für neuen Tab öffnen
def open_new_tab(driver):
    driver.execute_script("window.open('');")
    time.sleep(1)
    driver.switch_to.window(driver.window_handles[-1])

# ! Funktion zum warten auf die Website.
def navigate_and_wait_for_load(driver, url):

    driver.get(url)
    WebDriverWait(driver, 15).until(EC.presence_of_element_located((By.TAG_NAME, "body")))
    time.sleep(0.5)


# ! Funktion erstellung der PDF
def generate_and_save_pdf(driver, pdf_path):

    result = driver.execute_cdp_cmd(
        'Page.printToPDF',
        {
            'landscape': False,
            'displayHeaderFooter': False,
            'printBackground': True,
            'preferCSSPageSize': True,
    },)
    with open(pdf_path, 'wb') as pdf_file:
        pdf_file.write(base64.b64decode(result['data']))


def create_pdf_from_url(driver, url, pdf_path):
    try:
        open_new_tab(driver)
        navigate_and_wait_for_load(driver, url)
        generate_and_save_pdf(driver, pdf_path)
        #print("logging.info(f'Aktuelles Datum und Uhrzeit:')")
        logging.info(f'Aktuelles Datum und Uhrzeit: {now}')
        # extract_and_save_metadata(driver, pdf_path)
        driver.close()
        driver.switch_to.window(driver.window_handles[0])
    except Exception as error:
        #print(f"Error creating PDF from {url}: {error}")
        logging.info('Error creating PDF from ', url, error)
        raise


def check_datei_endung(file_path):
    try:
        file_name, file_extension = os.path.splitext(file_path)
        logging.info('Start der Funktion: ', check_datei_endung)
        if file_extension == '.csv':
            data = pd.read_csv(file_path, delimiter=';', encoding='utf-8')
            #print(
                # f"Func:cde... Aktuelles Datum und Uhrzeit: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
            logging.info(
                'Aktuelles Datum und Uhrzeit: ',
                datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            )
            return data
        logging.error("Nicht unterstützte Dateierweiterung.")
        raise ValueError("Nicht unterstützte Dateierweiterung.")
    except Exception as e:
        logging.error('Fehler beim Laden der Datei: $error ', e)
        raise

def process_csv(file_path):
    try:
        df = pd.read_csv(file_path, delimiter=';', encoding='utf-8')

        #print("Eingabedaten:")
        # #print(df.head())

        # Extrahieren von Titel und URL mit regulären Ausdrücken
        df[['Title', 'URL']] = df['Titel'].str.extract(r'^(.*?)\s*(\(https?://[^\s()]+\))?$', expand=True)
        df['URL'] = df['URL'].str.strip('()')

        # Wenn die URL nicht extrahiert werden konnte, verwenden wir den Titel als URL
        df['URL'] = df['URL'].fillna(df['Title'])

        #print("Daten nach Titel- und URL-Extraktion:")
        #print(df.head())

        # Überschreiben der Eingabedatei mit den aktualisierten Daten
        df.to_csv(file_path, index=False, sep=';', encoding='utf-8')

        return df

    except Exception as error:
        logging.error('Fehler bei der Verarbeitung der CSV-Datei: ', error)
        raise

def process_excel(file_path):
    try:
        df = pd.read_excel(file_path)

        #print("Eingabedaten:")
        # #print(df.head())

        # Extrahieren von Titel und URL mit regulären Ausdrücken
        df[['Title', 'URL']] = df['Titel'].str.extract(r'^(.*?)\s*(\(https?://[^\s()]+\))?$', expand=True, flags=re.UNICODE)
        df['URL'] = df['URL'].str.strip('()')

        # Wenn die URL nicht extrahiert werden konnte, verwenden wir den Titel als URL
        df['URL'] = df['URL'].fillna(df['Title'])

        #print("Daten nach Titel- und URL-Extraktion:")
        # #print(df.head())

        # Überschreiben der Eingabedatei mit den aktualisierten Daten
        df.to_excel(file_path, index=False)

        return df

    except Exception as error:
        logging.error('Fehler bei der Verarbeitung der Excel-Datei: ', error)
        raise


def process_file(file_path):
    _, file_extension = os.path.splitext(file_path)
    if file_extension == '.csv':
        return process_csv(file_path)
    elif file_extension in ['.xls', '.xlsx']:
        return process_excel(file_path)
    else:
        raise ValueError("Ungültige Dateierweiterung. Nur CSV- und Excel-Dateien werden unterstützt.")



def links(data):
    try:
        if isinstance(data, pd.DataFrame):
            df = data
        else:
            df = process_file(data)

        # Extrahieren der Basis-URL
        if 'URL' in df.columns:
            base_url = df['URL'].str.extract(r'^(https?://[^/]+)')[0].mode()[0]
        else:
            base_url = ''

        # Aktuelle Uhrzeit
        now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        #print(f"logging.info(f'Aktuelles Datum und Uhrzeit:')")
        logging.info(f'Aktuelles Datum und Uhrzeit: {now}')

        dataToSave = df[["Title", "URL"]]

        #print("Daten für dataToSave:")
        #print(dataToSave.head())

        return df, base_url, dataToSave

    except Exception as error:
        logging.error('Fehler bei der Verarbeitung der Daten: ', error)
        raise

# def links(data):
#     try:
#         if isinstance(data, pd.DataFrame):
#             df = data
#         else:
#             df = process_file(data)
#         # Extrahieren der Basis-URL
#         if 'URL' in df.columns:
#             base_url = df['URL'].str.extract(r'^(https?://[^/]+)')[0].mode()[0]
#         else:
#             base_url = ''
#         # Aktuelle Uhrzeit
#         now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
#         #print(f"logging.info(f'Aktuelles Datum und Uhrzeit:')")
#         logging.info(f'Aktuelles Datum und Uhrzeit: {now}')

#         # Überprüfen, ob die benötigten Spalten vorhanden sind
#         required_columns = ["Dokumententyp", "Verantwortlich", "Version", "Status", "Status seit", "Letzte Änderung", "Letzte Änderung durch"]
#         missing_columns = [col for col in required_columns if col not in df.columns]

#         if missing_columns:
#             logging.warning(f"Folgende Spalten fehlen im Eingabedatensatz: {', '.join(missing_columns)}")
#             dataToSave = df[["Title", "URL"] + [col for col in required_columns if col in df.columns]]
#         else:
#             dataToSave = df[["Title", "URL"] + required_columns]

#         #print("Daten für dataToSave:")
#         #print(dataToSave.head())

#         return df, base_url, dataToSave

#     except Exception as error:
#         logging.error('Fehler bei der Verarbeitung der Daten: ', error)
#         raise

def save_csv(file_path, dataToSave):
    try:
        file_name, file_extension = os.path.splitext(file_path)
        modified_file_path = f"{file_name}_aenderung_{now}_{file_extension}"
        dataToSave.to_csv(modified_file_path, index=False, sep=';', encoding='utf-8')
        logging.info("Geänderte Daten wurden in  gespeichert.", modified_file_path)
    except Exception as e:
        logging.error('Fehler beim Speichern der Datei: ', e)
        raise

def process_urls_to_pdf(user_email, user_password, user_link, file_path):

    setup_logging()  # Konfigurieren der Logging-Funktion
    start_time = time.time()  # Startzeitpunkt der Ausführung
    #print(f"Aktuelles Datum und Uhrzeit, Erste Zeile:, {file_path}")
    logging.info(f"Aktuelles Datum und Uhrzeit: {now}, \"{file_path}\" Erste Zeile")
    if not all([user_email, user_password, user_link, file_path]):
        data = check_datei_endung(file_path)  # Überprüfen der Dateiendung
        processed_data = links(data)  # Speichern der verarbeiteten Daten in einer CSV-Datei
        save_csv(file_path, processed_data[2])
        # Fehler werfen, wenn Eingaben fehlen
        raise ValueError("Alle Felder muessen ausgefuellt sein.")
    try:
        logging.info('Start der Funktion:, process_urls_to_pdf')
        logging.info(f'Start der Funktion: {process_urls_to_pdf}\n')
        driver.get(user_link)  # Navigieren zur Benutzer-URL
        driver.find_element(By.NAME, 'username').send_keys(user_email) # Benutzername und Passwort eingeben und absenden
        driver.find_element(By.NAME, 'password').send_keys(user_password, Keys.RETURN)
        WebDriverWait(driver, 10)  # Warten, bis die Seite geladen ist
        csv_file_path = file_path  # Pfad zur CSV-Datei
        urls_data_frame = pd.read_csv(csv_file_path, delimiter=';')  # CSV-Datei einlesen
        folder_path = os.path.dirname(file_path)  # Ordnerpfad bestimmen
        pdf_folder = os.path.join(folder_path, "pdf/") # Pfad zum PDF-Ordner zusammenstellen
        #print(f"Aktuelles Datum und Uhrzeit, Erste Zeile:, {pdf_folder}")
        logging.info(f"Aktuelles Datum und Uhrzeit: {now}, \"{pdf_folder}\" Erste Zeile")
        try:
            os.makedirs(pdf_folder, exist_ok=True)
        except FileExistsError:
            logging.warning(f"Der Ordner {pdf_folder} existiert bereits.")
            if 'URL' in urls_data_frame.columns and 'Title' in urls_data_frame.columns:
                for index, row in enumerate(urls_data_frame.itertuples(), start=1):
                    url = row.URL  # URL extrahieren
                    pdf_name = row.Title  # Titelschlüssel extrahieren
                    pdf_path = os.path.join(pdf_folder, clean_filename(f"{pdf_name}.pdf"))
                    if not os.path.exists(pdf_path):
                        create_pdf_from_url(driver, url, pdf_path)
                        logging.info(f"{index} von {total_links} erstellt: {url}")
                    else:
                        #print(f"File {pdf_path} already exists")
                        logging.info(f"File {pdf_path} already exists")
                    progress = index / total_links
                    filled_width = int(progress * progress_bar_width)
                    progress_bar = '█' * filled_width + '░' * (progress_bar_width - filled_width)
                    #print(f"\rFortschritt: [{progress_bar}] {index}/{total_links}", end="")

        #print("Alle Dateien erfolgreich erstellt")
        logging.info("Ende von process_urls_to_pdf")
        end_time = time.time()
        total_time = end_time - start_time
        logging.info(f"Gesamtlaufzeit: {total_time} Sekunden")
    except Exception as error: # Fehlermeldung ausgeben und loggen
        #print(f"Error in main script: {error}")
        logging.info('Error in main script: ', error)
    finally:
        logging.info("Programm beendet.")  # Loggen des Programmendes
    end_time = time.time()  # End time after the program has run
    total_time = end_time - start_time  # Total runtime
    #print(f"Total runtime of the program is {total_time} seconds.")
    logging.info(total_time)
    logging.info("Ende von process_urls_to_pdf")

def zip_pdf_folder(pdf_folder, zip_password, zip_name, zip_path):
    try:
        # Komprimieren des PDF-Ordners als ZIP-Datei mit Passwortschutz
        with pyzipper.AESZipFile(zip_path, 'w', compression=pyzipper.ZIP_LZMA) as zf:
            zf.setpassword(zip_password.encode())
            zf.setencryption(pyzipper.WZ_AES, nbits=256)
            for root, dirs, files in os.walk(pdf_folder):
                for file in files:
                    file_path = os.path.join(root, file)
                    zf.write(file_path, os.path.relpath(file_path, pdf_folder))

        #print(f"PDF-Ordner erfolgreich als ZIP-Datei gespeichert: {zip_path}")
        logging.info(f"PDF-Ordner erfolgreich als ZIP-Datei gespeichert: {zip_path}")

        # Löschen des PDF-Ordners (auskommentiert)
        shutil.rmtree(pdf_folder)
        #print(f"PDF-Ordner gelöscht: {pdf_folder}")
        logging.info(f"PDF-Ordner gelöscht: {pdf_folder}")

    except Exception as error:
        #print(f"Fehler beim Komprimieren des PDF-Ordners: {error}")
        logging.error(f"Fehler beim Komprimieren des PDF-Ordners: {error}")
        raise


if __name__ == "__main__":
    setup_logging()
    start = {datetime.datetime.now().strftime('%Y%m%d_%H%M%S')}
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')
    start_time = time.time()
    # #print("Willkommen beim PDF-Exporter!")
    # #print("Starte die Verarbeitung...")
    user_email, user_password, user_link, zip_password, zip_name, file_path, task_id = get_user_input(base_path)

    log_folder = os.path.dirname(file_path)
    log_file = os.path.join(log_folder, f"pdf_export_{datetime.datetime.now().strftime('%Y%m%d_%H%M%S')}.log")
    progress_log_file = os.path.join(log_folder, f"{zip_name}.log")

    # Fehlertolerante Codierung für stdout und stderr
    sys.stderr = codecs.getwriter('utf-8')(sys.stderr.detach())
    logger = logging.getLogger()
    progress_logger = logging.getLogger('progress_logger')

    logger.setLevel(logging.INFO)
    progress_logger.setLevel(logging.INFO)
    
    file_handler = logging.FileHandler(log_file, encoding='utf-8')
    # file_handler = logging.FileHandler(log_file, encoding='utf-8')
    progress_file_handler = logging.FileHandler(progress_log_file, encoding='utf-8')

    formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
    progress_formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')

    file_handler.setFormatter(formatter)
    progress_file_handler.setFormatter(progress_formatter)

    logger.addHandler(file_handler)
    progress_logger.addHandler(progress_file_handler)

    if not all([user_email, user_password, user_link, zip_password, zip_name, file_path]):
        #print("Überprüfe CSV/Excel-Datei...")
        for _ in range(4):
            #print("...", end="\r")
            time.sleep(0.5)
        #print("CSV/Excel-Datei erfolgreich überprüft!")
        data = process_file(file_path)
        total_rows = len(data)
        total_urls = len(data[data['URL'].notnull()])
        # #print(f"Gesamtanzahl der Zeilen: {total_rows}")
        #print(f"Anzahl der gefundenen URLs: {total_urls}")
        progress_logger.info(f"Gesamtanzahl der Zeilen: {total_rows}")
        progress_logger.info(f"Anzahl der gefundenen URLs: {total_urls}")

        urls_data_frame, base_url, dataToSave = links(data)
        save_csv(file_path, dataToSave)
        raise ValueError("All fields must be filled out.")

    try:
        logging.info('Start der Funktion:\n')
        driver.get(user_link)
        driver.find_element(By.NAME, 'username').send_keys(user_email)
        driver.find_element(By.NAME, 'password').send_keys(user_password, Keys.RETURN)
        WebDriverWait(driver, 10)
        csv_file_path = file_path
        urls_data_frame, base_url, dataToSave = links(csv_file_path)
        folder_path = os.path.dirname(file_path)
        pdf_folder = os.path.join(folder_path, "pdf/")
        # #print(f"logging.info(f'Aktuelles Datum und Uhrzeit:'), \"{pdf_folder}\" Erste Zeile")
        # progress_logger.info(f"logging.info(f'Aktuelles Datum und Uhrzeit:'), \"{pdf_folder}\" Erste Zeile")
        progress_logger.info(f"logging.info(f'Aktuelles Datum und Uhrzeit:'), \"{pdf_folder}\" Erste Zeile")
        if not os.path.exists(pdf_folder):
            os.makedirs(pdf_folder)

        total_links = len(urls_data_frame)
        #print(f"Insgesamt {total_links} Links gefunden. Beginne mit der PDF-Erstellung.")
        
        progress_logger.info(f"##################### Gesamtanzahl der Links  #####################")
        progress_logger.info(f"Insgesamt {total_links} Links gefunden. Beginne mit der PDF-Erstellung.")
        progress_logger.info(f"##################### Gesamtanzahl der Links  #####################")
        progress_bar_width = 50

        if 'URL' in urls_data_frame.columns and 'Title' in urls_data_frame.columns:
            for index, row in enumerate(urls_data_frame.itertuples(), start=1):
                url = row.URL
                pdf_name = row.Title
                pdf_path = os.path.join(pdf_folder, clean_filename(f"{pdf_name}.pdf"))
                if not os.path.exists(pdf_path):
                    create_pdf_from_url(driver, url, pdf_path)
                    logging.info(f"{index} von {total_links} erstellt: {url}")
                    progress_logger.info(f"{index} von {total_links} erstellt: {url}")
                else:
                    #print(f"File {pdf_path} already exists")
                    logging.info(f"File {pdf_path} already exists")
                    progress_logger.info(f"File {pdf_path} already exists")

                progress = index / total_links
                filled_width = int(progress * progress_bar_width)
                progress_bar = '█' * filled_width + '░' * (progress_bar_width - filled_width)
                #print(f"\rFortschritt: [{progress_bar}] {index}/{total_links}", end="")
                progress_logger.info(f"Fortschritt: [{progress_bar}] {index}/{total_links}")
        else:
            logging.error("Die Spalten 'URL' und 'Title' sind nicht im DataFrame vorhanden.")

        #print("\nAlle Dateien erfolgreich erstellt!")
        logging.info("Alle Dateien erfolgreich erstellt!")
        progress_logger.info("Alle Dateien erfolgreich erstellt!")

        zip_path = os.path.join(os.path.dirname(file_path), f"{zip_name}.zip")
        zip_pdf_folder(pdf_folder, zip_password, zip_name, zip_path)
        time.time()

    except Exception as error:
        # #print(f"Error in main script: {error}")
        logging.info('Error in main script: ', error)

    finally:
        end_time = time.time()
        total_time = end_time - start_time
        #print(f"Total runtime of the program is {total_time} seconds.")
        logging.info(total_time)
        progress_logger.info("Programm beendet. Gesamtlaufzeit: {total_time} Sekunden.")
        # time.sleep(10)
        update_task_status_in_db(task_id, "completed")
        logging.info("Programm beendet.")
        progress_logger.info("Programm beendet.")
        sys.stdout.close()
