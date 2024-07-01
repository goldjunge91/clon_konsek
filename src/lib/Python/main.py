#AES ECB mode without IV

print('AES ECB mode without IV:\n\n')

import aesecb as ecb

data = 'I love Medium'
key = 'AAAAAAAAAAAAAAAA' #Must Be 16 char for AES128

ecb.aesecb(data,key)

print('\n\n###################################\n\n')


#CBC with Fix IV

print('CBC with Fix IV:\n\n')

import aescbcfixiv as cbcfix

data = 'I love Medium'
key = 'AAAAAAAAAAAAAAAA' #16 char for AES128

#FIX IV
iv =  'BBBBBBBBBBBBBBBB'.encode('utf-8') #16 char for AES128

cbcfix.aescbcfixiv(data,key,iv)

print('\n\n###################################\n\n')


#CBC mode with random IV

print('CBC with Random IV:\n\n')

from Crypto.Random import get_random_bytes
import aescbcrandomiv as cbcrand

data = 'I love Medium'
key = 'AAAAAAAAAAAAAAAA' #16 char for AES128

#Random IV more secure
iv =  get_random_bytes(16) #16 char for AES128
#print(iv)
cbcrand.aescbcrandomiv(data,key,iv)

print('\n\n###################################\n\n')

