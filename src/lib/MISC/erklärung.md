
Installing PyCryptodome:
`pip install pycryptodome
`
After that we can test an encryption to check if everything is OK!
Importing the necessary libraries in our test.py file:

```python
import base64 
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad,unpad
from Crypto.Random import get_random_bytes #only for AES CBC mode

```

In our case we gonna work with this 2 modes: AES ECB and CBC mode. The first one ECB mode is interessant for som case
use where you cannot send the intialization Vector(IV) to the JavaScript code (even if its possible to put it in the
header of a post HTTP request) I do not recommend using AES ECB for production. Over the net use CBC. But that not the
purpose of this post if you want to learn more about cryptografy there a lot of good text on the web.
we gonna make an AES128 encryption. 128-bit keys are sufficient to ensure a good security, but is up to you to choose an
AES192 or AES256.

```python

import base64 
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad,unpad

#AES ECB mode without IV

data = 'I love Medium'
key = 'AAAAAAAAAAAAAAAA' #Must Be 16 char for AES128

def encrypt(raw):
        raw = pad(raw.encode(),16)
        cipher = AES.new(key.encode('utf-8'), AES.MODE_ECB)
        return base64.b64encode(cipher.encrypt(raw))

def decrypt(enc):
        enc = base64.b64decode(enc)
        cipher = AES.new(key.encode('utf-8'), AES.MODE_ECB)
        return unpad(cipher.decrypt(enc),16)

encrypted = encrypt(data)
print('encrypted ECB Base64:',encrypted.decode("utf-8", "ignore"))

decrypted = decrypt(encrypted)
print('data: ',decrypted.decode("utf-8", "ignore"))
```

## Output:

```python
python test.py
>> encrypted ECB Base64: gfp6wzvTH3lN5TO2B37yWQ==
>> data:  I love Medium
```

We have now a base 64 string that can be passed to JavaScript
For the AES CBC mode we just have one diference the IV ( Initialization Vector) which should be 128 bits pr 16 char too.
We can use a fix IV or random IV. That’s up to you the random is more secure both should be passed to the Javascript for
decryption.

## **AES CBC MODE**

Encryption and decryption AES128 CBC mode in Python with Fix IV

```python
import base64 
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad,unpad

#CBC with Fix IV

data = 'I love Medium'
key = 'AAAAAAAAAAAAAAAA' #16 char for AES128

#FIX IV
iv =  'BBBBBBBBBBBBBBBB'.encode('utf-8') #16 char for AES128

def encrypt(data,key,iv):
        data= pad(data.encode(),16)
        cipher = AES.new(key.encode('utf-8'),AES.MODE_CBC,iv)
        return base64.b64encode(cipher.encrypt(data))

def decrypt(enc,key,iv):
        enc = base64.b64decode(enc)
        cipher = AES.new(key.encode('utf-8'), AES.MODE_CBC, iv)
        return unpad(cipher.decrypt(enc),16)

encrypted = encrypt(data,key,iv)
print('encrypted CBC base64 : ',encrypted.decode("utf-8", "ignore"))

decrypted = decrypt(encrypted,key,iv)
print('data: ', decrypted.decode("utf-8", "ignore"))
```

## Output:

```python
python test.py
>>encrypted CBC base64 :  VEX7Eequ5TM9+jlgrwnkNw==
>>data:  I love Medium

```

Encryption and decryption AES128 CBC mode in Python with random IV

for this one we gonna import _get\_random\_bytes_ from Crypto to generate the 128 bits IV.

```python
import base64
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad,unpad
from Crypto.Random import get_random_bytes

#CBC mode with random IV

data = 'I love Medium'
key = 'AAAAAAAAAAAAAAAA' #16 char for AES128

#Random IV more secure
iv =  get_random_bytes(16) #16 char for AES128

def encrypt(data,key,iv):
        data = pad(data.encode(),16)
        cipher = AES.new(key.encode('utf-8'),AES.MODE_CBC,iv)
        print('random IV : ' , base64.b64encode(cipher.iv).decode('utf-8'))
        return base64.b64encode(cipher.encrypt(data)),base64.b64encode(cipher.iv).decode('utf-8')
  
def decrypt(enc,key,iv):
        enc = base64.b64decode(enc)
        cipher = AES.new(key.encode('utf-8'), AES.MODE_CBC, base64.b64decode(iv))
        return unpad(cipher.decrypt(enc),16)

encrypted, iv = encrypt(data,key,iv)
print('encrypted CBC base64 : ',encrypted.decode("utf-8", "ignore"))

decrypted = decrypt(encrypted,key,iv)
print('data: ', decrypted.decode("utf-8", "ignore"))
```

Output:

```python

python test.py
>>random IV :  HlR8EJsTuXi9hFx8GINO5A==
>>encrypted CBC base64 :  CyL3j8VSHrGPBcujlo4b4Q==
>>data:  I love Medium
```

OK everything fine with Python.

You can test it live here:

As you see all bytesdata are transformed in base64 for an easy manipulation.

Now we can see how we can decrypt thes datas with Javascript!

**JavaScript part of encrypting/decrypting**
============================================

**JavaScript encryption library**
---------------------------------

lets decode it in javascript!

I used crypto-js true CDN in our .html file.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>
```

From python we got various base64 string for all of our 3 cases:
For the ECB encryption we get :gfp6wzvTH3lN5TO2B37yWQ==

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>
<script>
 var encrypted ='gfp6wzvTH3lN5TO2B37yWQ=='; //python is base64 ECB
 var key ='AAAAAAAAAAAAAAAA'//key used in Python
 key = CryptoJS.enc.Utf8.parse(key); 
 var decrypted =  CryptoJS.AES.decrypt(encrypted, key, {mode:CryptoJS.mode.ECB});
 console.log(decrypted.toString(CryptoJS.enc.Utf8));
</script>

```

**Output in the developper console:**
---------------------------------

```html
test.html
>>I love Medium
```

For the CBC encryption we get :

```
random IV :  l5I5Toqn5RoX0JfTLQB9Pw==
encrypted CBC base64 :  uJrS9Zp1R5WjOEUkSK9clQ==
```

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>
<script>
//PYTHON FIX IV ENCRYPTION AND PYTHON FIX IV
var Base64CBC ='VEX7Eequ5TM9+jlgrwnkNw==';
var iv = CryptoJS.enc.Utf8.parse('BBBBBBBBBBBBBBBB');
//PYTHON RANDOM IV ENCRYPTION AND PYTHON RANDOM IV
//var Base64CBC ='uJrS9Zp1R5WjOEUkSK9clQ==';
//var iv = CryptoJS.enc.Base64.parse('l5I5Toqn5RoX0JfTLQB9Pw==');
var key ='AAAAAAAAAAAAAAAA'//key used in Python
 key = CryptoJS.enc.Utf8.parse(key);
    var decrypted =  CryptoJS.AES.decrypt(Base64CBC, key, { iv: iv, mode: CryptoJS.mode.CBC});
    decrypted = decrypted.toString(CryptoJS.enc.Utf8);
    console.log(decrypted);
 alert(decrypted);
</script>
```

**Output in the developper console:**
---------------------------------

```html
test.html
>>I love Medium
```

Just comment the PYTHON FIX IV ENCRYPTION AND PYTHON FIX IV and uncomment the //PYTHON RANDOM IV ENCRYPTION AND PYTHON
RANDOM IV to test the random solution :

```
//PYTHON FIX IV ENCRYPTION AND PYTHON FIX IV
//var Base64CBC ='VEX7Eequ5TM9+jlgrwnkNw==';
//var iv = CryptoJS.enc.Utf8.parse('BBBBBBBBBBBBBBBB');
//PYTHON RANDOM IV ENCRYPTION AND PYTHON RANDOM IV
var Base64CBC ='uJrS9Zp1R5WjOEUkSK9clQ==';
var iv = CryptoJS.enc.Base64.parse('l5I5Toqn5RoX0JfTLQB9Pw==');
```

**To encrypt in Javascript:**
---------------------------------

```javascript

<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>
<script>
//JS FIX IV ENCRYPTION CBC
var message = 'I love Medium';
var key ='AAAAAAAAAAAAAAAA'//key used in Python
key = CryptoJS.enc.Utf8.parse(key);
var iv = CryptoJS.enc.Utf8.parse('BBBBBBBBBBBBBBBB')
var encrypted = CryptoJS.AES.encrypt(message, key, { iv: iv, mode: CryptoJS.mode.CBC});
encrypted =encrypted.toString();
console.log('encrypted',encrypted );
alert(encrypted)

//JS RANDOM IV ENCRYPTION CBC
var iv = CryptoJS.enc.Hex.parse("101112131415161718191a1b1c1d1e1f");
var encrypted = CryptoJS.AES.encrypt(message, key, { iv: iv, mode: CryptoJS.mode.CBC});
encrypted =encrypted.toString();
console.log('encrypted',encrypted );
alert(encrypted)

//JS ENCRYPTION ECB
var encrypted = CryptoJS.AES.encrypt(message, key, {mode: CryptoJS.mode.ECB});
encrypted =encrypted.toString();
console.log('encrypted',encrypted );
alert(encrypted)
</script>
```

output :

```
VEX7Eequ5TM9+jlgrwnkNw== same output as our python CBC with fix iv
Txi+ue8bqPCHrcVORbiSrg== not the same. We generate random iV in JS
gfp6wzvTH3lN5TO2B37yWQ== same output as our python ECB
```

## Thats it!!!