const CryptoJS = require('crypto-js');

// Define a secret key
const secretKey = process.env.APP_SECRET_KEY;

const encrypt = (text) => {
  const iv = CryptoJS.lib.WordArray.random(16);
  const encrypted = CryptoJS.AES.encrypt(text, secretKey, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return iv.toString() + ':' + encrypted.toString();
};

const decrypt = (encryptedText) => {
  const [iv, encrypted] = encryptedText.split(':');
  const decrypted = CryptoJS.AES.decrypt(encrypted, secretKey, {
    iv: CryptoJS.enc.Hex.parse(iv),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
};

/**
 * Generates a random secret key.
 * @param {number} length - The length of the secret key in bytes.
 * @returns {string} - The generated secret key in hexadecimal format.
 */
const generateSecretKey = (length = 32) => {
  const newSecretKey = CryptoJS.lib.WordArray.random(length).toString(CryptoJS.enc.Hex);
  console.log('Generated Secret Key:', newSecretKey);
  return newSecretKey;
}

module.exports = {
  encrypt,
  decrypt,
  generateSecretKey,
};