// /* eslint-disable @typescript-eslint/no-var-requires */
// const dotenv = require('dotenv');
// const cryptovar = require('crypto-js');

// // Load environment variables
// dotenv.config();

// // Get the encryption key and IV from the environment variables
// const key = process.env.ENCRYPTION_KEY || '';
// const iv = process.env.ENCRYPTION_IV || '';

// // Test values
// const originalDsmPassword = 'menwyg--ponwoX';
// const originalZipPassword = 'menwyg--ponwoX';

// // Encryption function
// const encryptPassword = (password: string) => {
//   const parsedKey = cryptovar.enc.Utf8.parse(key);
//   const parsedIV = cryptovar.enc.Utf8.parse(iv);
//   return cryptovar.AES.encrypt(password, parsedKey, {
//     iv: parsedIV,
//     mode: cryptovar.mode.CBC,
//     padding: cryptovar.pad.Pkcs7,
//   }).toString();
// };

// // Encrypt passwords
// const encryptedDsmPassword = encryptPassword(originalDsmPassword);
// const encryptedZipPassword = encryptPassword(originalZipPassword);

// console.log('Verschlüsselte Passwörter:');
// console.log('DSM Password:', encryptedDsmPassword);
// console.log('Zip Password:', encryptedZipPassword);


// // import all necessary modules from crypto-js
// import { AES, mode, pad, enc } from 'crypto-js';
// import dotenv from 'dotenv';

// // initialize dotenv
// dotenv.config();

// const key = enc.Utf8.parse(process.env.ENCRYPTION_KEY!);
// const iv = enc.Utf8.parse(process.env.ENCRYPTION_IV!); // Nur nötig für CBC

// // export function encryptECB(message: string): string {
// //   return AES.encrypt(message, key, { mode: mode.ECB, padding: pad.Pkcs7 }).toString();
// // }

// // export function encryptCBC(message: string): string {
// //   return AES.encrypt(message, key, { iv, mode: mode.CBC, padding: pad.Pkcs7 }).toString();
// // }

// // Nur nötig für CBC
// export function encryptECB(message: string): string {
//   return enc.Base64.stringify(AES.encrypt(message, key, { 
//     mode: mode.ECB, 
//     padding: pad.Pkcs7 
//   }).ciphertext);
// }

// export function encryptCBC(message: string): string {
//   return enc.Base64.stringify(AES.encrypt(message, key, {
//     iv,
//     mode: mode.CBC,
//     padding: pad.Pkcs7
//   }).ciphertext);
// }

// // Beispielnutzung
// const encryptedECB = encryptECB("I love Medium");
// const encryptedCBC = encryptCBC("I love Medium");

// console.log("encrypted ECB: ", encryptedECB);
// console.log("encrypted CBC: ", encryptedCBC);
