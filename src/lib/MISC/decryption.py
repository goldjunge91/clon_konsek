import os
from dotenv import load_dotenv
from Crypto.Cipher import AES
from base64 import b64decode

# Load environment variables
load_dotenv()

# Get the encryption key and IV from the environment variables
key = os.getenv('ENCRYPTION_KEY').encode('utf-8')
iv = os.getenv('ENCRYPTION_IV').encode('utf-8')

# Encrypted passwords (replace with the actual encrypted passwords from the TypeScript code)
encrypted_dsm_password = '1z667JmbS6GG3Mg0lihdFA=='
encrypted_zip_password = '1z667JmbS6GG3Mg0lihdFA=='

# Custom unpad function
def unpad(data):
    padding_length = data[-1]
    return data[:-padding_length]

# Decryption function
def decrypt_password(encrypted_password, key, iv):
    encrypted_password_bytes = b64decode(encrypted_password)
    cipher = AES.new(key, AES.MODE_CBC, iv)
    decrypted_password_bytes = cipher.decrypt(encrypted_password_bytes)
    decrypted_password = unpad(decrypted_password_bytes).decode('utf-8')
    return decrypted_password

# Decrypt passwords
decrypted_dsm_password = decrypt_password(encrypted_dsm_password, key, iv)
decrypted_zip_password = decrypt_password(encrypted_zip_password, key, iv)

# Print decrypted passwords
print('Entschlüsselte Passwörter:')
print('DSM Password:', decrypted_dsm_password)
print('Zip Password:', decrypted_zip_password)