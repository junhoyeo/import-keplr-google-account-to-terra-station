## Import Keplr (Google) Accounts to Terra Station

- Special thanks to:
  - https://github.com/terra-money/station/issues/61
  - https://github.com/terra-money/station/blob/main/src/auth/scripts/encrypt.ts
  - https://github.com/junhoyeo/keplr-wallet/blob/5c8cc2b7ee5357584d25bc8026dcee946f82c56f/packages/cosmos/src/bech32/index.ts#L4
- Send your love here:
  - `osmo15zysaya5j34vy2cqd7y9q8m3drjpy0d2lvmkpa`
  - `terra1ydkzy07s632sswe7x4tj2guex4v2tue06zy9v8`

```js
const KEPLR_PRIVATE_KEY = "keplr_private_key_without_0x" // Keplr private key without 0x
const bech = Bech32Address.fromBech32('public_address_that_have_osmo_or_cosmos_prefix') // Public address for same address in Keplr
const NAME = "new_wallet_name" // New wallet name to show in Terra Station (should not be duplicated)
const PASSWORD_IN_TERRA = "new_password_in_terra" // New wallet password to use in Terra Station
```

```
git clone https://github.com/junhoyeo/keplr-to-terra
yarn
yarn start
```
