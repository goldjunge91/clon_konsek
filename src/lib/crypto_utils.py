# File: crypto_utils.py

from cryptography.hazmat.primitives import padding
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
import os
from dotenv import load_dotenv
import binascii
import os


# Versuche, die .env-Datei zu finden und zu laden
dotenv_path = os.path.join(os.path.dirname(__file__), "../../.env")
if os.path.exists(dotenv_path):
    load_dotenv(dotenv_path)
    print(f"Pfad zur .env-Datei: {dotenv_path}")
else:
    print("Keine .env-Datei gefunden. Verwende Umgebungsvariablen.")

# Laden der Umgebungsvariablen
encryption_key = os.getenv("ENCRYPTION_KEY")
encryption_iv = os.getenv("ENCRYPTION_IV")

# Prüfung der geladenen Umgebungsvariablen
if not encryption_key or len(encryption_key) != 64:
    raise ValueError(
        "Ungültiger ENCRYPTION_KEY: Der Schlüssel muss ein 64 Zeichen langer Hex-String sein. "
        "Dies entspricht einem 256-Bit-Schlüssel (32 Bytes). "
        "Beispiel eines gültigen Schlüssels: '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef'. "
        "Bitte überprüfen Sie Ihre Konfiguration und stellen Sie sicher, dass der ENCRYPTION_KEY "
        "korrekt gesetzt ist und die erforderliche Länge hat."
    )

if not encryption_iv or len(encryption_iv) != 32:
        raise ValueError(
        "Ungültiger ENCRYPTION_IV: Der Initialisierungsvektor muss ein 32 Zeichen langer Hex-String sein. "
        "Dies entspricht einem 128-Bit-IV (16 Bytes). "
        "Beispiel eines gültigen IVs: '0123456789abcdef0123456789abcdef'. "
        "Bitte überprüfen Sie Ihre Konfiguration und stellen Sie sicher, dass der ENCRYPTION_IV "
        "korrekt gesetzt ist und die erforderliche Länge hat. "
        "Der IV sollte für jede Verschlüsselung einzigartig sein, um die Sicherheit zu gewährleisten."
    )


# Konvertierung der Hex-Strings zu Bytes
ENCRYPTION_KEY = bytes.fromhex(encryption_key)
ENCRYPTION_IV = bytes.fromhex(encryption_iv)



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
