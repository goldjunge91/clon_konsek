// /* eslint-disable @typescript-eslint/no-var-requires */
// "use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
// exports.encryptCBC = exports.encryptECB = void 0;
// var dotenv = require('dotenv');
// var cryptovar = require('crypto-js');
// // Load environment variables
// dotenv.config();
// // Get the encryption key and IV from the environment variables
// var key = process.env.ENCRYPTION_KEY || '';
// var iv = process.env.ENCRYPTION_IV || '';
// // Test values
// var originalDsmPassword = 'menwyg--ponwoX';
// var originalZipPassword = 'menwyg--ponwoX';
// // Encryption function
// var encryptPassword = function (password) {
//     var parsedKey = cryptovar.enc.Utf8.parse(key);
//     var parsedIV = cryptovar.enc.Utf8.parse(iv);
//     return cryptovar.AES.encrypt(password, parsedKey, {
//         iv: parsedIV,
//         mode: cryptovar.mode.CBC,
//         padding: cryptovar.pad.Pkcs7,
//     }).toString();
// };
// // Encrypt passwords
// var encryptedDsmPassword = encryptPassword(originalDsmPassword);
// var encryptedZipPassword = encryptPassword(originalZipPassword);
// console.log('Verschlüsselte Passwörter:');
// console.log('DSM Password:', encryptedDsmPassword);
// console.log('Zip Password:', encryptedZipPassword);
// // import all necessary modules from crypto-js
// var crypto_js_1 = require("crypto-js");
// // initialize dotenv
// dotenv.config();
// var key = crypto_js_1.enc.Utf8.parse(process.env.ENCRYPTION_KEY);
// var iv = crypto_js_1.enc.Utf8.parse(process.env.ENCRYPTION_IV); // Nur nötig für CBC
// // export function encryptECB(message: string): string {
// //   return AES.encrypt(message, key, { mode: mode.ECB, padding: pad.Pkcs7 }).toString();
// // }
// // export function encryptCBC(message: string): string {
// //   return AES.encrypt(message, key, { iv, mode: mode.CBC, padding: pad.Pkcs7 }).toString();
// // }
// // Nur nötig für CBC
// function encryptECB(message) {
//     return crypto_js_1.enc.Base64.stringify(crypto_js_1.AES.encrypt(message, key, {
//         mode: crypto_js_1.mode.ECB,
//         padding: crypto_js_1.pad.Pkcs7
//     }).ciphertext);
// }
// exports.encryptECB = encryptECB;
// function encryptCBC(message) {
//     return crypto_js_1.enc.Base64.stringify(crypto_js_1.AES.encrypt(message, key, {
//         iv: iv,
//         mode: crypto_js_1.mode.CBC,
//         padding: crypto_js_1.pad.Pkcs7
//     }).ciphertext);
// }
// exports.encryptCBC = encryptCBC;
// // Beispielnutzung
// var encryptedECB = encryptECB("I love Medium");
// var encryptedCBC = encryptCBC("I love Medium");
// console.log("encrypted ECB: ", encryptedECB);
// console.log("encrypted CBC: ", encryptedCBC);
