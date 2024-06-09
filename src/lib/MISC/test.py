import json
import base64
from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad
from dotenv import load_dotenv
import os

load_dotenv()

def decrypt_data(encrypted_data: str) -> dict:
    key = os.getenv('ENCRYPTION_KEY')
    iv = os.getenv('ENCRYPTION_IV')
    
    if not key or not iv:
        raise ValueError('Encryption key or IV not found in environment variables.')

    encrypted_data_bytes = base64.b64decode(encrypted_data)
    cipher = AES.new(key.encode(), AES.MODE_CBC, iv.encode())
    decrypted_data_bytes = unpad(cipher.decrypt(encrypted_data_bytes), AES.block_size)
    decrypted_data = json.loads(decrypted_data_bytes.decode())

    return decrypted_data

# Read the encrypted data from the JSON file
with open('encrypted_data.json', 'r') as file:
    encrypted_data = file.read()

# Decrypt the data
decrypted_data = decrypt_data(encrypted_data)

# Use the decrypted data in your Python script
# ...

# import os
# from dotenv import load_dotenv

# # Pfad zur .env-Datei ausgeben
# # env_path = "/home/marco/git/pdf-website/.env"
# env_path = os.path.join(os.path.dirname(__file__), '../../.env')
# print(f"Pfad zur .env-Datei: {env_path}")
# with open(env_path, 'r') as file:
#     env_content = file.read()
#     print(f"Inhalt der .env-Datei:\n{env_content}")

# # Lade die Umgebungsvariablen aus der .env-Datei mit dem angegebenen Pfad
# load_dotenv(env_path)

# # Hole den geheimen Schlüssel aus den Umgebungsvariablen
# secret_key = os.getenv('SECRET_KEY')

# print(f"Secret Key: {secret_key}")

# # Teste, ob der Schlüssel korrekt geladen wurde
# expected_key = "cG1aPYjB/66iNG/j894f04kDg6/dQTV81GrEb/WuwYc="
# if secret_key == expected_key:
#     print("Der Schlüssel wurde korrekt geladen.")
# else:
#     print("Der geladene Schlüssel stimmt nicht mit dem erwarteten Schlüssel überein.")

# nextauth_url = os.getenv('NEXTAUTH_URL')
# print(f"NEXTAUTH_URL: {nextauth_url}")

# print("#####################  #####################")
# print("#####################   #####################")
# print("##################### ####################")
# load_dotenv(env_path)
# print(f"Geladene Umgebungsvariablen: {os.environ}")



