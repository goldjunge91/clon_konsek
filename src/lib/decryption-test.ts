const CryptoJS = require('crypto-js');

// Geheimnis
const secretKey = "296876904925-ocip2egqj8g29hqblefr6p51funjro67";

// werte zum Testen
const originalDsmPassword = "menwyg--ponwoX";
const originalZipPassword = "menwyg--ponwoX";

// Verschlüsselung Funktion 
const encryptedDsmPassword = CryptoJS.AES.encrypt(originalDsmPassword, secretKey).toString();
const encryptedZipPassword = CryptoJS.AES.encrypt(originalZipPassword, secretKey).toString();

console.log("Verschlüsseleltes Kernnwort ausgeben:");
console.log("DSM Password:", encryptedDsmPassword);
console.log("Zip Password:", encryptedZipPassword);

// Entschlüsseln Funktion
const decryptedDsmPassword = CryptoJS.AES.decrypt(encryptedDsmPassword, secretKey).toString(CryptoJS.enc.Utf8);
const decryptedZipPassword = CryptoJS.AES.decrypt(encryptedZipPassword, secretKey).toString(CryptoJS.enc.Utf8);

console.log("\n Ausgabe Entschlüsseltes Kennwort:");
console.log("DSM Password:", decryptedDsmPassword);
console.log("Zip Password:", decryptedZipPassword);

// Ausgabe in Console zum Prüfen
console.log("\nDecryption Check:");
console.log("DSM Password Match:", decryptedDsmPassword );
console.log("Zip Password Match:", decryptedZipPassword );