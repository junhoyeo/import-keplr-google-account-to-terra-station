import CryptoJS from 'crypto-js';

const keySize = 256;
const iterations = 100;

// NOTE: From https://github.com/terra-money/station/blob/main/src/auth/scripts/encrypt.ts
export const encrypt = (msg: string, pass: string) => {
  try {
    const salt = CryptoJS.lib.WordArray.random(128 / 8);

    const key = CryptoJS.PBKDF2(pass, salt, {
      keySize: keySize / 32,
      iterations: iterations,
    });

    const iv = CryptoJS.lib.WordArray.random(128 / 8);

    const encrypted = CryptoJS.AES.encrypt(msg, key, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    });

    const transitmessage =
      salt.toString() + iv.toString() + encrypted.toString();
    return transitmessage;
  } catch (error) {
    return '';
  }
};
