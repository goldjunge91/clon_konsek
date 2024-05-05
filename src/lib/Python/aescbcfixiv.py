
import base64 
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad,unpad

def encrypt(data,key,iv):
        data= pad(data.encode(),16)
        cipher = AES.new(key.encode('utf-8'),AES.MODE_CBC,iv)
        print('Fix IV : ' ,iv.decode())
        return base64.b64encode(cipher.encrypt(data))

def decrypt(enc,key,iv):
        enc = base64.b64decode(enc)
        cipher = AES.new(key.encode('utf-8'), AES.MODE_CBC, iv)
        return unpad(cipher.decrypt(enc),16)

def aescbcfixiv(data,key,iv):
  encrypted = encrypt(data,key,iv)
  print('encrypted CBC base64 : ',encrypted.decode("utf-8", "ignore"))

  decrypted = decrypt(encrypted,key,iv)
  print('data: ', decrypted.decode("utf-8", "ignore"))
