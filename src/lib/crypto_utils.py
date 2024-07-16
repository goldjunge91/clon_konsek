# File: crypto_utils.py

from cryptography.hazmat.primitives import padding
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
import os
from dotenv import load_dotenv
import binascii

load_dotenv(os.path.join(os.path.dirname(__file__), "../../.env"))
# # Pfad zur .env-Datei ausgeben
# TODO change my path
# env_path = "/home/runneruser/actions-runner/_work/pdf-website/pdf-website/.env"
# env_path = r"C:\\GIT\\pdf-website\\.env"

# Windows Debugging
env_path = "/home/runneruser/actions-runner/_work/pdf-website/pdf-website/.env"


load_dotenv(env_path)
print(f"Pfad zur .env-Datei: {load_dotenv}")


ENCRYPTION_KEY = bytes.fromhex(os.getenv("ENCRYPTION_KEY"))  # type: ignore
# ENCRYPTION_IV = os.getenv("ENCRYPTION_IV").encode()
ENCRYPTION_IV = os.getenv("ENCRYPTION_IV").encode()  # type: ignore


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
