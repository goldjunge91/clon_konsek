"use strict";
/* eslint-disable */
// @typescript-eslint/no-var-requires
Object.defineProperty(exports, "__esModule", { value: true });
var CryptoJS = require("crypto-js");
//laden von .env
var dotenv = require("dotenv");
dotenv.config({ path: "../../.env" }); // Relativer Pfad zur .env-Datei
var key0 = process.env.SECRET_KEY; // SECRET_KEY="AAAAAAAAAAAAAAAA"
console.log("Key0:", key0);
var key1 = process.env.ENCRYPTION_SECRET_KEY; // ENCRYPTION_SECRET_KEY="53023d56bf525503b18059bb328499e2e2c25e5f8d8c41d734c501ae66d46a23"
console.log("Key1:", key1);
var key2 = process.env.ENCRYPTION_KEY; // ENCRYPTION_KEY=AAAAAAAAAAAAAAAA
console.log("Key2:", key2);
var key3 = process.env.ENCRYPTION_IV; // ENCRYPTION_IV=BBBBBBBBBBBBBBBB
console.log("Key3:", key3);
// Geheimnis
var key = process.env.ENCRYPTION_KEY;
var iv = process.env.ENCRYPTION_IV;
// Übergabe der variablen prüfen
console.log("key dotenv:", key);
console.log("iv dotenv:", iv);
var message = "menwyg--ponwoX";
var key_enc = CryptoJS.enc.Utf8.parse(key);
console.log("Key_encoding:", key_enc);
var iv_enc = CryptoJS.enc.Utf8.parse(iv);
console.log("iv encoding:", iv_enc);
// Übergabe der variablen prüfen ende
//verschlüsseln mit cbc
var encryptedParams = CryptoJS.AES.encrypt(message, key_enc, {
    iv: iv_enc,
    mode: CryptoJS.mode.CBC,
});
var encrypted = encryptedParams.toString();
console.log("encrypted:", encryptedParams);
console.log("encrypted:", encrypted);
// entschlüssen mit cbc
var decrypting2 = CryptoJS.AES.decrypt(encryptedParams.toString(), key_enc, {
    iv: iv_enc,
    mode: CryptoJS.mode.CBC,
});
console.log("prüfen:", decrypting2.toString(CryptoJS.enc.Base64));
//encrypted: U2FsdGVkX1/QGQRNvyyLEIulFQHbRP6CF5f0C8cp1X8=
// entschlüssen mit cbc
var decrypting = CryptoJS.AES.decrypt(encryptedParams.toString(), key_enc, {
    iv: iv_enc,
    mode: CryptoJS.mode.CBC,
});
console.log("decrypted:", decrypting.toString(CryptoJS.enc.Utf8));
// werte zum Testen
// const originalDsmPassword = "menwyg--ponwoX";
// const originalZipPassword = "menwyg--ponwoX";
// // Verschlüsselung Funktion
// const encryptedDsmPassword = CryptoJS.AES.encrypt(originalDsmPassword, key, {
//     mode: CryptoJS.mode.ECB,
//     padding: CryptoJS.pad.Pkcs7,
// }).toString();
// const encryptedZipPassword = CryptoJS.AES.encrypt(originalZipPassword, key, {
//     mode: CryptoJS.mode.ECB,
//     padding: CryptoJS.pad.Pkcs7,
// }).toString();
// console.log("Verschlüsseleltes Kernnwort ausgeben:");
// console.log("DSM Password:", encryptedDsmPassword);
// console.log("Zip Password:", encryptedZipPassword);
// // Entschlüsseln Funktion
// const decryptedDsmPassword = CryptoJS.AES.decrypt(encryptedDsmPassword, key, {
//     mode: CryptoJS.mode.ECB,
//     padding: CryptoJS.pad.Pkcs7,
// }).toString(CryptoJS.enc.Utf8);
// const decryptedZipPassword = CryptoJS.AES.decrypt(encryptedZipPassword, key, {
//     mode: CryptoJS.mode.ECB,
//     padding: CryptoJS.pad.Pkcs7,
// }).toString(CryptoJS.enc.Utf8);
// console.log("\n Ausgabe Entschlüsseltes Kennwort:");
// console.log("DSM Password:", decryptedDsmPassword);
// console.log("Zip Password:", decryptedZipPassword);
// // Ausgabe in Console zum Prüfen
// console.log("\nDecryption Check:");
// console.log("DSM Password Match:", decryptedDsmPassword );
// console.log("DSM Password Match:", decryptedDsmPassword === originalDsmPassword);
// console.log("Zip Password Match:", decryptedZipPassword );
// console.log("Zip Password Match:", decryptedZipPassword === originalZipPassword);
