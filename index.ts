import { bech32 } from 'bech32';
import CryptoJS from "crypto-js"

const keySize = 256
const iterations = 100


// NOTE: From https://github.com/junhoyeo/keplr-wallet/blob/5c8cc2b7ee5357584d25bc8026dcee946f82c56f/packages/cosmos/src/bech32/index.ts#L4
export class Bech32Address {
  constructor(public readonly address: Uint8Array) {}

  static fromBech32(bech32Address: string, prefix?: string): Bech32Address {
    const decoded = bech32.decode(bech32Address);
    if (prefix && decoded.prefix !== prefix) {
      throw new Error('Unmatched prefix');
    }

    return new Bech32Address(new Uint8Array(bech32.fromWords(decoded.words)));
  }

  // NOTE: we use only `mainPrefix` as `prefix` for now (Hint: `defaultBech32Config` in `keplr-wallet`)
  toBech32(prefix: string): string {
    const words = bech32.toWords(this.address);
    return bech32.encode(prefix, words);
  }
}

// NOTE: From https://github.com/terra-money/station/blob/main/src/auth/scripts/encrypt.ts
const encrypt = (msg: string, pass: string) => {
  try {
    const salt = CryptoJS.lib.WordArray.random(128 / 8)

    const key = CryptoJS.PBKDF2(pass, salt, {
      keySize: keySize / 32,
      iterations: iterations,
    })

    const iv = CryptoJS.lib.WordArray.random(128 / 8)

    const encrypted = CryptoJS.AES.encrypt(msg, key, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    })

    const transitmessage =
      salt.toString() + iv.toString() + encrypted.toString()
    return transitmessage
  } catch (error) {
    return ""
  }
}

// NOTE: From https://github.com/terra-money/station/issues/61
const KEPLR_PRIVATE_KEY = "keplr_private_key_without_0x" // Keplr private key without 0x
const bech = Bech32Address.fromBech32('public_address_that_have_osmo_or_cosmos_prefix') // Public address for same address in Keplr
const NAME = "new_wallet_name" // New wallet name to show in Terra Station (should not be duplicated)
const PASSWORD_IN_TERRA = "new_password_in_terra" // New wallet password to use in Terra Station

const TERRA_ADDRESS_IN_KEPLR = bech.toBech32('terra')
const ENCRYPTED_KEY= encrypt(KEPLR_PRIVATE_KEY, PASSWORD_IN_TERRA)
const key = Buffer.from(`{
    "name":"${NAME}",
    "address":"${TERRA_ADDRESS_IN_KEPLR}",
    "encrypted_key":"${ENCRYPTED_KEY}"
}`).toString('base64')

// Import this key in `Terra Station` with `PASSWORD_IN_TERRA`
console.log(key)
