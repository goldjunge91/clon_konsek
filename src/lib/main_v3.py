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
from db_utils import update_task_status_in_db, schedule_delete_folder_cronjob
import sys
import io
import chardet
from crypto_utils import encrypt_data, decrypt_data
import binascii


# + Variablen für den gesamten Code...
LOG_FILE_EXT = ".log"
now = datetime.datetime.now()
base_path = "/home/marco/git/pdf-website/DATA/downloads/"
# base_path = r'C:\\Users\\tozzi\\Git\\pdf-website\\DATA\\downloads\\'

# windows pfad setzen für debugging.
# base_path = r'C:\GIT\pdf-website\DATA\downloads'

# # Get the directory of the current script
# current_dir = os.path.dirname(os.path.abspath(__file__))
# # Construct the path to the config file
# config_path = os.path.join(current_dir, 'python_config.json')
# # Read the configuration
# with open(config_path, 'r') as f:
#     config = json.load(f)

# base_path = config['GLOBAL_PATHS']['DATA_PATH']
# env_path = config['GLOBAL_PATHS']['ENV_PATH']

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8")

options = webdriver.ChromeOptions()  # Initialize the options object
options.add_argument("--disable-gpu")
options.add_argument("--headless")
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")
options.add_argument("user-agent=[user-agent string]")
options.add_argument("--disable-blink-features=AutomationControlled")
driver = webdriver.Chrome(
    service=ChromiumService(
        executable_path=ChromeDriverManager(chrome_type=ChromeType.GOOGLE).install()
    ),
    options=options,
)


def encrypt_sensitive_data_in_json(form_data_path):
    with open(form_data_path, "r+") as file:
        data = json.load(file)
        encrypted = False
        # Only encrypt if not already encrypted; you can tweak this logic as needed
        if not data["dsmpassword"].startswith("ENC_"):
            data["dsmpassword"] = (
                "ENC_"
                + binascii.hexlify(encrypt_data(data["dsmpassword"].encode())).decode()
            )
            encrypted = True
        if not data["zippassword"].startswith("ENC_"):
            data["zippassword"] = (
                "ENC_"
                + binascii.hexlify(encrypt_data(data["zippassword"].encode())).decode()
            )
            encrypted = True

        if encrypted:
            file.seek(0)
            json.dump(data, file, indent=4)
            file.truncate()


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
    formatter = logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")
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


def decrypt_in_memory(encrypted_str):
    if encrypted_str.startswith("ENC_"):
        encrypted_data = binascii.unhexlify(encrypted_str[4:].encode())
        return decrypt_data(encrypted_data).decode("utf-8")
    return encrypted_str  # Just for safety, in case it's not encrypted


def get_user_input(base_path):
    try:
        path = os.path.join(base_path, sys.argv[1])  # This comes from your main block
        form_data_path = os.path.join(path, "form-data.json")
        # print(f"Attempting to access file at: {form_data_path}")

        with open(form_data_path, "r") as file:
            form_data = json.load(file)

        # Decrypting here
        form_data["dsmpassword"] = decrypt_in_memory(form_data["dsmpassword"])
        form_data["zippassword"] = decrypt_in_memory(form_data["zippassword"])

        # Extract and return the necessary information
        user_email = form_data["dsm_mail"]
        user_password = form_data["dsmpassword"]
        user_link = form_data["dsm_url"]
        zip_password = form_data["zippassword"]
        zip_name = form_data["id"]
        taskid = form_data["id"]

        # Determine the file_path based on whether a CSV or Excel file is present
        file_path = os.path.join(path, "liste.csv")
        if not os.path.exists(file_path):
            file_path = os.path.join(path, "liste.xlsx")
            if not os.path.exists(file_path):
                raise FileNotFoundError(
                    "Weder liste.csv noch liste.xlsx wurden gefunden."
                )

        return (
            user_email,
            user_password,
            user_link,
            zip_password,
            zip_name,
            file_path,
            taskid,
        )
    except Exception as error:
        logging.error(f"Error in get_user_input: {error}")
        raise


# ! Funktion für neuen Tab öffnen
def open_new_tab(driver):
    driver.execute_script("window.open('');")
    time.sleep(1)
    driver.switch_to.window(driver.window_handles[-1])


# ! Funktion zum warten auf die Website.
def navigate_and_wait_for_load(driver, url):
    try:
        driver.get(url)
        WebDriverWait(driver, 15).until(
            EC.presence_of_element_located((By.TAG_NAME, "body"))
        )
        time.sleep(0.5)
    except TimeoutException:
        logging.error(f"Page did not load in time.")


# ! Funktion erstellung der PDF
def generate_and_save_pdf(driver, pdf_path):

    result = driver.execute_cdp_cmd(
        "Page.printToPDF",
        {
            "landscape": False,
            "displayHeaderFooter": False,
            "printBackground": True,
            "preferCSSPageSize": True,
        },
    )
    with open(pdf_path, "wb") as pdf_file:
        pdf_file.write(base64.b64decode(result["data"]))


def create_pdf_from_url(driver, url, pdf_path):
    try:
        open_new_tab(driver)
        navigate_and_wait_for_load(driver, url)
        generate_and_save_pdf(driver, pdf_path)
        driver.close()
        driver.switch_to.window(driver.window_handles[0])
    except Exception as error:
        logging.info("Error creating PDF from ", url, error)
        raise


def check_datei_endung(file_path):
    try:
        file_name, file_extension = os.path.splitext(file_path)
        logging.info("Start der Funktion: ", check_datei_endung)
        if file_extension == ".csv":
            data = pd.read_csv(file_path, delimiter=";", encoding="utf-8")
            logging.info(
                f"check_datei_endung. Aktuelles Datum und Uhrzeit:",
                datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            )
            return data
        logging.error("Nicht unterstützte Dateierweiterung.")
        raise ValueError("Nicht unterstützte Dateierweiterung.")
    except Exception as e:
        logging.error("Fehler beim Laden der Datei: $error ", e)
        raise


def detect_encoding(file_path):
    with open(file_path, "rb") as f:
        result = chardet.detect(f.read())
    return result["encoding"]


def process_csv(file_path):
    try:
        encoding = detect_encoding(file_path)
        df = pd.read_csv(file_path, delimiter=";", encoding=encoding)

        df[["Title", "URL"]] = df["Titel"].str.extract(
            r"^(.*?)\s*(\(https?://[^\s()]+\))?$", expand=True
        )
        df["URL"] = df["URL"].str.strip("()")
        df["URL"] = df["URL"].fillna(df["Title"])
        df.to_csv(file_path, index=False, sep=";", encoding=encoding)
        return df
    except Exception as error:
        logging.error("Fehler bei der Verarbeitung der CSV-Datei: ", {error})
        raise


def process_excel(file_path):
    try:
        df = pd.read_excel(file_path)
        df[["Title", "URL"]] = df["Titel"].str.extract(
            r"^(.*?)\s*(\(https?://[^\s()]+\))?$", expand=True, flags=re.UNICODE
        )
        df["URL"] = df["URL"].str.strip("()")
        df["URL"] = df["URL"].fillna(df["Title"])
        df.to_excel(file_path, index=False)
        return df
    except Exception as error:
        logging.error("Fehler bei der Verarbeitung der Excel-Datei: ", error)
        raise


def process_file(file_path):
    _, file_extension = os.path.splitext(file_path)
    if file_extension == ".csv":
        return process_csv(file_path)
    elif file_extension in [".xls", ".xlsx"]:
        return process_excel(file_path)
    else:
        raise ValueError(
            "Ungültige Dateierweiterung. Nur CSV- und Excel-Dateien werden unterstützt."
        )


def links(data):
    try:
        if isinstance(data, pd.DataFrame):
            df = data
        else:
            df = process_file(data)
        if "URL" in df.columns:
            base_url = df["URL"].str.extract(r"^(https?://[^/]+)")[0].mode()[0]
        else:
            base_url = ""
        # logging.info(f"Func_links. \n")

        dataToSave = df[["Title", "URL"]]
        return df, base_url, dataToSave
    except Exception as error:
        logging.error("Fehler bei der Verarbeitung der Daten: ", error)
        raise


def save_csv(file_path, dataToSave):
    try:
        file_name, file_extension = os.path.splitext(file_path)
        modified_file_path = f"{file_name}_aenderung_{now}_{file_extension}"
        dataToSave.to_csv(modified_file_path, index=False, sep=";", encoding="utf-8")
        logging.info("Geänderte Daten wurden in  gespeichert.", modified_file_path)
    except Exception as e:
        logging.error("Fehler beim Speichern der Datei: ", e)
        raise


def process_urls_to_pdf(user_email, user_password, user_link, file_path):

    setup_logging()  # Konfigurieren der Logging-Funktion
    start_time = time.time()  # Startzeitpunkt der Ausführung
    logging.info(f'Aktuelles Datum und Uhrzeit: "{now}", "{file_path}" Erste Zeile')
    if not all([user_email, user_password, user_link, file_path]):
        data = check_datei_endung(file_path)  # Überprüfen der Dateiendung
        processed_data = links(
            data
        )  # Speichern der verarbeiteten Daten in einer CSV-Datei
        save_csv(file_path, processed_data[2])
        raise ValueError("Alle Felder muessen ausgefuellt sein.")
    try:
        logging.info("Start der Funktion:, process_urls_to_pdf")
        logging.info(f"Start der Funktion: {process_urls_to_pdf}\n")
        driver.get(user_link)  # Navigieren zur Benutzer-URL
        driver.find_element(By.NAME, "username").send_keys(
            user_email
        )  # Benutzername und Passwort eingeben und absenden
        driver.find_element(By.NAME, "password").send_keys(user_password, Keys.RETURN)
        WebDriverWait(driver, 10)  # Warten, bis die Seite geladen ist
        csv_file_path = file_path  # Pfad zur CSV-Datei
        urls_data_frame = pd.read_csv(
            csv_file_path, delimiter=";"
        )  # CSV-Datei einlesen
        folder_path = os.path.dirname(file_path)  # Ordnerpfad bestimmen
        pdf_folder = os.path.join(
            folder_path, "pdf/"
        )  # Pfad zum PDF-Ordner zusammenstellen
        # logging.info(f'Aktuelles Datum und Uhrzeit: {now}, \"{pdf_folder}\" Erste Zeile')
        try:
            os.makedirs(pdf_folder, exist_ok=True)
        except FileExistsError:
            logging.warning(f"Der Ordner {pdf_folder} existiert bereits.")
            if "URL" in urls_data_frame.columns and "Title" in urls_data_frame.columns:
                for index, row in enumerate(urls_data_frame.itertuples(), start=1):
                    url = row.URL  # URL extrahieren
                    pdf_name = row.Title  # Titelschlüssel extrahieren
                    pdf_path = os.path.join(
                        pdf_folder, clean_filename(f"{pdf_name}.pdf")
                    )
                    if not os.path.exists(pdf_path):
                        create_pdf_from_url(driver, url, pdf_path)
                        logging.info(f"{index} von {total_links} erstellt: {url}")
                    else:
                        logging.info(f"File {pdf_path} already exists")
                    progress = index / total_links
                    filled_width = int(progress * progress_bar_width)
                    progress_bar = "█" * filled_width + "░" * (
                        progress_bar_width - filled_width
                    )
        logging.info("Ende von process_urls_to_pdf")
        end_time = time.time()
        total_time = end_time - start_time
        logging.info(f"Gesamtlaufzeit: {total_time} Sekunden")
    except Exception as error:  # Fehlermeldung ausgeben und loggen
        logging.info("Error in main script: ", error)
    finally:
        logging.info("Programm beendet.")  # Loggen des Programmendes
    end_time = time.time()  # End time after the program has run
    total_time = end_time - start_time  # Total runtime
    logging.info(total_time)
    logging.info("Ende von process_urls_to_pdf")


def zip_pdf_folder(pdf_folder, zip_password, zip_name, zip_path):
    try:
        with pyzipper.AESZipFile(zip_path, "w", compression=pyzipper.ZIP_LZMA) as zf:
            zf.setpassword(zip_password.encode())
            zf.setencryption(pyzipper.WZ_AES, nbits=256)
            for root, dirs, files in os.walk(pdf_folder):
                for file in files:
                    file_path = os.path.join(root, file)
                    zf.write(file_path, os.path.relpath(file_path, pdf_folder))
        logging.info(f"PDF-Ordner erfolgreich als ZIP-Datei gespeichert: {zip_path}")
        shutil.rmtree(pdf_folder)
        logging.info(f"PDF-Ordner gelöscht: {pdf_folder}")
    except Exception as error:
        logging.error(f"Fehler beim Komprimieren des PDF-Ordners: {error}")
        raise


def setup_loggers(logger, progress_logger, log_file, progress_log_file):
    logger.setLevel(logging.INFO)
    progress_logger.setLevel(logging.INFO)
    file_handler = logging.FileHandler(log_file, encoding="utf-8")
    progress_file_handler = logging.FileHandler(progress_log_file, encoding="utf-8")
    # formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
    formatter = logging.Formatter(
        "%(asctime)s - %(levelname)s - %(message)s", datefmt="%d.%m.%Y %H:%M"
    )
    progress_formatter = logging.Formatter(
        "%(asctime)s - %(message)s", datefmt="%d.%m.%Y %H:%M"
    )
    file_handler.setFormatter(formatter)
    progress_file_handler.setFormatter(progress_formatter)
    logger.addHandler(file_handler)
    progress_logger.addHandler(progress_file_handler)


if __name__ == "__main__":
    setup_logging()
    folder_to_delete = None  # Define folder_to_delete before the try block
    if len(sys.argv) < 2:
        raise ValueError("Wrong Value contact admin.")
    path = os.path.join(base_path, sys.argv[1])
    form_data_path = os.path.join(path, "form-data.json")
    if not os.path.exists(form_data_path):
        raise FileNotFoundError(f"File {form_data_path} was not found.")
    encrypt_sensitive_data_in_json(form_data_path)
    user_email, user_password, user_link, zip_password, zip_name, file_path, task_id = (
        get_user_input(base_path)
    )
    start_time = time.time()
    beginn_uhrzeit = datetime.datetime.now()
    start_uhrtzeit = beginn_uhrzeit.strftime("%d.%m.%Y, %H:%M")
    jetzt = datetime.datetime.now()
    current_datetime = jetzt.strftime("%d.%m.%Y, %H:%M")

    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8")
    log_folder = os.path.dirname(file_path)
    log_file = os.path.join(log_folder, f"pdf_export_{current_datetime}.log")
    progress_log_file = os.path.join(log_folder, f"{zip_name}.log")
    logger = logging.getLogger("main_logger")
    progress_logger = logging.getLogger("progress_logger")
    setup_loggers(logger, progress_logger, log_file, progress_log_file)
    folder_to_delete = None  # Define folder_to_delete before the try block

    if not all(
        [user_email, user_password, user_link, zip_password, zip_name, file_path]
    ):
        for _ in range(4):
            time.sleep(0.5)
        data = process_file(file_path)
        total_rows = len(data)
        total_links = len(data[data["URL"].notnull()])
        progress_logger.info(f"Total number of rows: {total_rows}")
        progress_logger.info(f"Number of URLs found: {total_links}")
        logging.info(f"Total number of rows: {total_rows}")
        logging.info(f"Number of URLs found: {total_links}")
        urls_data_frame, base_url, dataToSave = links(data)
        save_csv(file_path, dataToSave)
        raise ValueError("All fields must be filled out.")
    try:
        driver.get(user_link)
        driver.find_element(By.NAME, "username").send_keys(user_email)
        driver.find_element(By.NAME, "password").send_keys(user_password, Keys.RETURN)
        WebDriverWait(driver, 10)
        urls_data_frame, base_url, dataToSave = links(file_path)
        pdf_folder = os.path.join(log_folder, "pdf/")
        progress_logger.info(f"Start of extraction: {current_datetime}, Start Process")
        os.makedirs(pdf_folder, exist_ok=True)
        total_links = len(urls_data_frame)
        progress_logger.info(f"################ Total number of links ################")
        progress_logger.info(
            f"Found {total_links} links in total. Starting PDF creation."
        )
        progress_logger.info(f"################ Total number of links ################")
        progress_logger.info(f"Quick timer to read total number of links: 10 seconds")
        time.sleep(10)
        progress_bar_width = 50
        if "URL" in urls_data_frame.columns and "Title" in urls_data_frame.columns:
            for index, row in enumerate(urls_data_frame.itertuples(), start=1):
                url = row.URL
                pdf_name = row.Title
                pdf_path = os.path.join(pdf_folder, clean_filename(f"{pdf_name}.pdf"))
                if not os.path.exists(pdf_path):
                    create_pdf_from_url(driver, url, pdf_path)
                    logging.info(f"{index} of {total_links} created: {url}")
                    progress_logger.info(f"{index} of {total_links} created: {url}")
                else:
                    logging.info(f"File {pdf_path} already exists")
                    progress_logger.info(f"File {pdf_path} already exists")
                progress = index / total_links
                filled_width = int(progress * progress_bar_width)
                progress_bar = "█" * filled_width + "░" * (
                    progress_bar_width - filled_width
                )
                progress_logger.info(
                    f"Progress: [{progress_bar}] {index}/{total_links}"
                )
        else:
            logging.error("The columns 'URL' and 'Title' are not present in the file.")
        logging.info("All files created successfully!")
        progress_logger.info("All files created successfully!")
        zip_path = os.path.join(os.path.dirname(file_path), f"{zip_name}.zip")
        zip_pdf_folder(pdf_folder, zip_password, zip_name, zip_path)
        folder_to_delete = os.path.join(base_path, task_id)
    except Exception as error:
        logging.exception("Error in main script: ")
    finally:
        end_time = time.time()
        total_time = end_time - start_time
        logging.info(total_time)
        progress_logger.info(f"Program finished. Total runtime: {total_time} seconds.")
        update_task_status_in_db(task_id, "completed")
        schedule_delete_folder_cronjob(folder_to_delete)
        logging.info("Program finished.")
        progress_logger.info("Program finished.")
