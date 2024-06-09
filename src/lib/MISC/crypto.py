import json
from Crypto.Cipher import AES
from base64 import b64decode
from dotenv import load_dotenv
# from dotenv import dotenv_values

import os


def decrypt_data(encrypted_data, secret_key):
    encrypted_data = b64decode(encrypted_data)
    cipher = AES.new(secret_key.encode(), AES.MODE_ECB)
    decrypted_data = cipher.decrypt(encrypted_data)
    return decrypted_data.rstrip(b'\0').decode()


# def decrypt_data(encrypted_data, secret_key):
#     encrypted_data = b64decode(encrypted_data)
#     cipher = AES.new(secret_key.encode(), AES.MODE_ECB)
#     decrypted_data = cipher.decrypt(encrypted_data)
#     return decrypted_data.rstrip(b'\0').decode()


# def decrypt_data(encrypted_data, secret_key):
#     secret_key = bytes.(secret_key)
    
#     encrypted_data = b64decode(encrypted_data)
#     cipher = AES.new(secret_key, AES.MODE_ECB)
#     decrypted_data = cipher.decrypt(encrypted_data)
#     return decrypted_data.rstrip(b'\0').decode()


# config = dotenv_values(".env")
load_dotenv(os.path.join(os.path.dirname(__file__), '../../.env'))
# Lade die Umgebungsvariablen aus der .env-Datei
# load_dotenv()

# Lade die JSON-Datei

with open('/home/marco/git/pdf-website/DATA/downloads/1dc8b69a-171a-45f7-8f3e-6fdbb31692d9/form-data.json', 'r') as file:
    data = json.load(file)

# Hole den geheimen Schlüssel aus den Umgebungsvariablen
secret_key = os.getenv('ENCRYPTION_SECRET_KEY')
secret_key = os.getenv('ENCRYPTION_SECRET_KEY')
print(f"Secret Key: {secret_key}")

# Entschlüssele die Passwörter
if 'zippassword' in data:
    data['zippassword'] = decrypt_data(data['zippassword'], secret_key)
if 'dsmpassword' in data:
    data['dsmpassword'] = decrypt_data(data['dsmpassword'], secret_key)

# Verwende die entschlüsselten Daten in deinem Python-Skript
print(data)