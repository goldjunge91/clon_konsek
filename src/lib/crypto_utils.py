# File: crypto_utils.py

from cryptography.hazmat.primitives import padding
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
import os
from dotenv import load_dotenv
import binascii
import os


# env_path = find_dotenv()
# if env_path:
#     load_dotenv(env_path)
#     print(f"Pfad zur .env-Datei: {env_path}")
# else:
#     print("Keine .env-Datei gefunden. Verwende Umgebungsvariablen.")
# # Laden der Umgebungsvariablen
# encryption_key_hex = os.getenv("ENCRYPTION_KEY")
# encryption_iv = os.getenv("ENCRYPTION_IV")

# if not encryption_key_hex or len(encryption_key_hex) != 64:
#     raise ValueError("ENCRYPTION_KEY muss ein 64 Zeichen langer Hex-String sein.")

# if not encryption_iv or len(encryption_iv) != 16:
#     raise ValueError("ENCRYPTION_IV muss ein 16 Zeichen langer String sein.")


# # Laden der Umgebungsvariablen
# encryption_key_hex = os.getenv("ENCRYPTION_KEY")
# encryption_iv = os.getenv("ENCRYPTION_IV")

# load_dotenv(os.path.join(os.path.dirname(__file__), "../../.env"))
# # # Pfad zur .env-Datei ausgeben
# # TODO change my path
# # env_path = "/home/runneruser/actions-runner/_work/pdf-website/pdf-website/.env"
# # env_path = r"C:\\GIT\\pdf-website\\.env"

# # Windows Debugging
# env_path = "/home/runneruser/actions-runner/_work/pdf-website/pdf-website/.env"


# load_dotenv(env_path)
# print(f"Pfad zur .env-Datei: {load_dotenv}")


# ENCRYPTION_KEY = bytes.fromhex(os.getenv("ENCRYPTION_KEY"))  # type: ignore
# # ENCRYPTION_IV = os.getenv("ENCRYPTION_IV").encode()
# ENCRYPTION_IV = os.getenv("ENCRYPTION_IV").encode()  # type: ignore

# Versuche, die .env-Datei zu finden und zu laden
dotenv_path = os.path.join(os.path.dirname(__file__), "../../.env")
if os.path.exists(dotenv_path):
    load_dotenv(dotenv_path)
    print(f"Pfad zur .env-Datei: {dotenv_path}")
else:
    print("Keine .env-Datei gefunden. Verwende Umgebungsvariablen.")

# Laden der Umgebungsvariablen
encryption_key_hex = os.getenv("ENCRYPTION_KEY")
encryption_iv = os.getenv("ENCRYPTION_IV")

# Prüfung der geladenen Umgebungsvariablen
if not encryption_key_hex or len(encryption_key_hex) != 64:
    raise ValueError("ENCRYPTION_KEY muss ein 64 Zeichen langer Hex-String sein.")

if not encryption_iv or len(encryption_iv) != 16:
    raise ValueError("ENCRYPTION_IV muss ein 16 Zeichen langer String sein.")

ENCRYPTION_KEY = bytes.fromhex(encryption_key_hex)
ENCRYPTION_IV = encryption_iv.encode()



def pad(data):
    # Erstellt einen PKCS7-Padder für 128-Bit-Blöcke
    padder = padding.PKCS7(128).padder()
    # Fügt Padding hinzu und finalisiert
    padded_data = padder.update(data) + padder.finalize()
    return padded_data


def unpad(data):
    # Erstellt einen PKCS7-Unpadder für 128-Bit-Blöcke
    unpadder = padding.PKCS7(128).unpadder()
    # Entfernt das Padding und finalisiert
    unpadded_data = unpadder.update(data) + unpadder.finalize()
    return unpadded_data


def encrypt_data(data):
    # Initialisiert den Crypto-Backend
    backend = default_backend()
    # Erstellt eine AES-Cipher im CBC-Modus mit dem definierten Schlüssel und IV
    cipher = Cipher(
        algorithms.AES(ENCRYPTION_KEY), modes.CBC(ENCRYPTION_IV), backend=backend
    )
    # Erstellt einen Encryptor
    encryptor = cipher.encryptor()
    # Verschlüsselt die gepadten Daten und finalisiert
    ct = encryptor.update(pad(data)) + encryptor.finalize()
    return ct


def decrypt_data(data):
    # Initialisiert den Crypto-Backend
    backend = default_backend()
    # Erstellt eine AES-Cipher im CBC-Modus mit dem definierten Schlüssel und IV
    cipher = Cipher(
        algorithms.AES(ENCRYPTION_KEY), modes.CBC(ENCRYPTION_IV), backend=backend
    )
    # Erstellt einen Decryptor
    decryptor = cipher.decryptor()
    # Entschlüsselt die Daten und finalisiert
    decrypted_data = decryptor.update(data) + decryptor.finalize()
    # Entfernt das Padding von den entschlüsselten Daten
    return unpad(decrypted_data)
