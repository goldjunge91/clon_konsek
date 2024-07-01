import base64
from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad
from dotenv import load_dotenv
import os

# Laden der Umgebungsvariablen
load_dotenv()

key = os.getenv('ENCRYPTION_KEY')
if key is not None:
    key = key.encode('utf-8')  # Konvertiert den String-Schlüssel in Bytes
else:
    raise ValueError('ENCRYPTION_KEY is not set in .env file')

# Falls du den IV für deine CBC-Entschlüsselung anpasst, füge ihn zu deiner .env Datei hinzu
iv = os.getenv('ENCRYPTION_IV')
if iv is not None:
    iv = iv.encode('utf-8')  # Konvertiert den String-IV in Bytes für CBC Modus
else:
    # Im Produktionscode sollte ein detaillierter Fehler ausgegeben werden, der dem Kontext entspricht
    raise ValueError('ENCRYPTION_IV is not set in .env file for CBC mode')

def decrypt_ecb(encrypted):
    encrypted_bytes = base64.b64decode(encrypted)
    cipher = AES.new(key, AES.MODE_ECB)
    decrypted_bytes = unpad(cipher.decrypt(encrypted_bytes), 16)
    return decrypted_bytes.decode('utf-8')

def decrypt_cbc(encrypted):
    encrypted_bytes = base64.b64decode(encrypted)
    cipher = AES.new(key, AES.MODE_CBC, iv)
    decrypted_bytes = unpad(cipher.decrypt(encrypted_bytes), 16)
    return decrypted_bytes.decode('utf-8')

# Beispielnutzung
# Diese sind nur Beispielwerte - ersetze sie durch deine tatsächlich verschlüsselten Strings
encrypted_ecb = '1z667JmbS6GG3Mg0lihdFA=='
encrypted_cbc = '1z667JmbS6GG3Mg0lihdFA=='

# Beispiel basierend auf dem vorherigen Code
try:
    print('ECB decrypted:', decrypt_ecb(encrypted_ecb))
except ValueError as e:
    print(f"ECB Error during decryption: {e}")

try:
    print('CBC decrypted:', decrypt_cbc(encrypted_cbc))
except ValueError as e:
    print(f"CBC Error during decryption: {e}")
