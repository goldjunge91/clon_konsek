# # DSM Password: U2FsdGVkX18qLxMTy1kfa2Xkr0gA/BFjPPYFFqfV9hU=
# # Zip Password: U2FsdGVkX1/qNiWnPnmW/cJM9qbYbf/TwmHsVTRXDd8=


# from base64 import b64decode
# from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
# from cryptography.hazmat.primitives import padding
# from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes

# from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes

# # Geheimer Schlüssel (muss der gleiche wie in TypeScript sein)
# secret_key = b"OMxBHleuNuSTz7nm3hjWRMqN5dkkDghf"

# # Funktion zum Entschlüsseln eines mit AES-ECB und PKCS7-Padding verschlüsselten Strings
# def decrypt_aes_ecb(encrypted_data: str) -> str:
#     # Verschlüsselte Daten in Bytes konvertieren
#     encrypted_data_bytes = b64decode(encrypted_data)

#     # AES-Cipher im ECB-Modus initialisieren
#     cipher = Cipher(algorithms.AES(secret_key), modes.ECB())
#     decryptor = cipher.decryptor()

#     # Entschlüsseln der Daten
#     decrypted_data_bytes = decryptor.update(encrypted_data_bytes) + decryptor.finalize()

#     # Entfernen des PKCS7-Paddings (ohne Bibliotheksfunktion)
#     pad_len = decrypted_data_bytes[-1]
#     if pad_len < 1 or pad_len > 16 or any(b != pad_len for b in decrypted_data_bytes[-pad_len:]):
#         raise ValueError("Invalid padding bytes.")
#     decrypted_data_bytes = decrypted_data_bytes[:-pad_len]

#     # Rückgabe der entschlüsselten Daten als UTF-8 codierte Zeichenkette
#     return decrypted_data_bytes.decode('utf-8')

# # Beispielhafte Verwendung
# encrypted_text = "U2FsdGVkX1/qNiWnPnmW/cJM9qbYbf/TwmHsVTRXDd8="
# try:
#     decrypted_text = decrypt_aes_ecb(encrypted_text)
#     print(f"Entschlüsselter Text: {decrypted_text}")
# except ValueError as e:
#     print(f"Fehler: {e}")
#AES ECB mode without IV



import os
from dotenv import load_dotenv
from Crypto.Cipher import AES
from base64 import b64decode

# Load environment variables
load_dotenv()

# Get the encryption key from the environment variable
key = os.getenv('ENCRYPTION_KEY')

# Encrypted passwords (replace with the actual encrypted passwords from the TypeScript code)
encrypted_dsm_password = ''
encrypted_zip_password = ''

# Decryption function
def decrypt_password(encrypted_password):
    encrypted_password_bytes = b64decode(encrypted_password)
    cipher = AES.new(key.encode('utf-8'), AES.MODE_ECB)
    decrypted_password_bytes = cipher.decrypt(encrypted_password_bytes)
    decrypted_password = decrypted_password_bytes.decode('utf-8').rstrip('\0')
    return decrypted_password

# Decrypt passwords
decrypted_dsm_password = decrypt_password(encrypted_dsm_password)
decrypted_zip_password = decrypt_password(encrypted_zip_password)

# Print decrypted passwords
print('Decrypted DSM Password:', decrypted_dsm_password)
print('Decrypted Zip Password:', decrypted_zip_password)