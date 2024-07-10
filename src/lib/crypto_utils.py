# File: crypto_utils.py

from cryptography.hazmat.primitives import padding
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
import os
from dotenv import load_dotenv
import binascii

# load_dotenv(os.path.join(os.path.dirname(__file__), '../../.env'))
# # Pfad zur .env-Datei ausgeben
# TODO change my path
env_path = "/home/marco/git/pdf-website/.env"
# env_path = r"C:\\GIT\\pdf-website\\.env"

# Windows Debugging
# env_path = r"C:\GIT\pdf-website\.env"
# import json

# with open('src/config.json', 'r') as f:
#     config = json.load(f)

# base_path = config['GLOBAL_PATHS']['DATA_PATH']
# env_path = config['GLOBAL_PATHS']['ENV_PATH']
# Lade die Umgebungsvariablen aus der .env-Datei
load_dotenv(env_path)
print(f"Pfad zur .env-Datei: {load_dotenv}")


ENCRYPTION_KEY = bytes.fromhex(os.getenv("ENCRYPTION_KEY")) # type: ignore
ENCRYPTION_IV = os.getenv("ENCRYPTION_IV").encode()

def decrypt_in_memory(encrypted_str):
    if encrypted_str.startswith("ENC_"):
        encrypted_bytes = binascii.unhexlify(encrypted_str[4:].encode())
        return decrypt_data(encrypted_bytes).decode('utf-8')
    return encrypted_str
def pad(data):
    padder = padding.PKCS7(128).padder()
    padded_data = padder.update(data) + padder.finalize()
    return padded_data

def unpad(data):
    unpadder = padding.PKCS7(128).unpadder()
    unpadded_data = unpadder.update(data) + unpadder.finalize()
    return unpadded_data

def encrypt_data(data):
    backend = default_backend()
    cipher = Cipher(algorithms.AES(ENCRYPTION_KEY), modes.CBC(ENCRYPTION_IV), backend=backend)
    encryptor = cipher.encryptor()
    ct = encryptor.update(pad(data)) + encryptor.finalize()
    return ct

def decrypt_data(data):
    backend = default_backend()
    cipher = Cipher(algorithms.AES(ENCRYPTION_KEY), modes.CBC(ENCRYPTION_IV), backend=backend)
    decryptor = cipher.decryptor()
    decrypted_data = decryptor.update(data) + decryptor.finalize()
    return unpad(decrypted_data)
