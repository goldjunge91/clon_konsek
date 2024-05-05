import os
from base64 import b64encode

# Generate a random 32-byte secret key
secret_key = os.urandom(32)

# Encode the secret key as a base64 string
secret_key_base64 = b64encode(secret_key).decode('utf-8')

print("Generated Secret Key:", secret_key_base64)