/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useState } from 'react';

import { Bech32Address } from '@/utils/bech32';
import { encrypt } from '@/utils/encrypt';

const inputClassName =
  'text-white p-3 px-4 rounded-md bg-indigo-400/10 font-medium outline-none focus:bg-indigo-600/10';

const HomePage = () => {
  const [privateKey, setPrivateKey] = useState<string>('');
  const [cosmosAddress, setCosmosAddress] = useState<string>('');
  const [walletName, setWalletName] = useState<string>('');
  const [walletPassword, setWalletPassword] = useState<string>('');

  const [keplrHelpShown, setKeplrHelpShown] = useState<boolean>(false);
  const [terraStationHelpShown, setTerraStationHelpShown] =
    useState<boolean>(false);

  const [terraStationKey, setTerraStationKey] = useState<string>(
    '(result show up here)',
  );
  const onClickGenerateKey = useCallback(() => {
    try {
      if (!walletName || !walletPassword) {
        throw new Error('Wallet name and password are required');
      }

      const cleanPrivateKey = privateKey.startsWith('0x')
        ? privateKey.slice(2)
        : privateKey;

      const bech = Bech32Address.fromBech32(cosmosAddress);
      const terraAddress = bech.toBech32('terra');
      const encryptedKey = encrypt(cleanPrivateKey, walletPassword);
      const key = Buffer.from(
        `{
            "name":"${walletName}",
            "address":"${terraAddress}",
            "encrypted_key":"${encryptedKey}"
        }`,
      ).toString('base64');

      setTerraStationKey(key);
    } catch (error) {
      window.alert(error.message);
    }
  }, [privateKey, cosmosAddress, walletName, walletPassword]);

  return (
    <div className="min-h-screen px-4 pt-6 pb-24 flex">
      <main className="w-full max-w-2xl mx-auto">
        <div className="flex flex-col">
          <h1
            className="mt-4 text-white text-lg font-light"
            style={{
              backgroundImage:
                'linear-gradient(249deg,#00c0f8,#2640e4 51%,#9162ff)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Import <strong className="font-bold text-white">Keplr</strong>{' '}
            account to{' '}
            <strong className="font-bold text-white">Terra Station</strong>
          </h1>
          <a
            href="https://github.com/junhoyeo/keplr-to-terra-station"
            target="_blank"
            rel="noreferrer"
            className="mt-1 mb-6 text-white/80 underline"
          >
            Project GitHub
          </a>

          <section className="mt-4 flex flex-col gap-2">
            <img
              className="mx-auto w-fit h-16 object-contain"
              alt="Keplr"
              src="/assets/keplr.png"
            />
            <span
              className="mb-1 mx-auto font-bold leading-tight text-center text-white/80 cursor-pointer select-none"
              onClick={() => setKeplrHelpShown((prev) => !prev)}
            >
              Credentials in Keplr{' '}
              <span className="text-[#04bbf6]">[Help]</span>
            </span>
            {keplrHelpShown && (
              <img
                className="mb-2 mx-auto rounded-md w-fit h-80 object-contain cursor-pointer select-none"
                alt="Press 'View private key' of selected wallet in Keplr Extension"
                src="/assets/keplr-select-account.png"
                onClick={() => setKeplrHelpShown((prev) => !prev)}
              />
            )}
            <input
              className={inputClassName}
              value={privateKey}
              onChange={(e) => setPrivateKey(e.target.value)}
              placeholder="Keplr private key"
            />
            <input
              className={inputClassName}
              value={cosmosAddress}
              onChange={(e) => setCosmosAddress(e.target.value)}
              placeholder="Cosmos/Osmosis Address"
            />
          </section>

          <section className="mt-12 flex flex-col gap-2">
            <img
              className="mx-auto w-fit h-16 object-contain"
              alt="Keplr"
              src="/assets/terra-station.png"
            />
            <span className="mb-2 mx-auto max-w-[240px] font-bold leading-tight text-center text-white/80">
              Set wallet name and password{' '}
              <span className="inline-block">to use in Terra Station</span>
            </span>
            <input
              className={inputClassName}
              value={walletName}
              onChange={(e) => setWalletName(e.target.value)}
              placeholder="Wallet Name"
            />
            <input
              className={inputClassName}
              value={walletPassword}
              onChange={(e) => setWalletPassword(e.target.value)}
              placeholder="Wallet Password"
            />
          </section>

          <div className="mt-4 w-full flex flex-col">
            <button
              className="py-4 rounded-md ring-2 ring-indigo-600/25 font-bold text-lg text-white"
              style={{
                backgroundImage:
                  'linear-gradient(249deg,#00c0f8,#2640e4 51%,#9162ff)',
              }}
              onClick={onClickGenerateKey}
            >
              Generate Key
            </button>
          </div>

          {!!terraStationKey && (
            <section className="mt-12 flex flex-col gap-2">
              <span
                className="mb-1 mx-auto font-bold leading-tight text-center text-white/80 cursor-pointer select-none"
                onClick={() => setTerraStationHelpShown((prev) => !prev)}
              >
                🎉 Import this key to Terra Station!{' '}
                <span className="text-[#04bbf6]">[Help]</span>
              </span>
              {terraStationHelpShown && (
                <img
                  className="mb-2 mx-auto rounded-md w-fit h-80 object-contain cursor-pointer select-none"
                  alt="Import wallet in Terra Station"
                  src="/assets/terra-station-import-wallet.png"
                  onClick={() => setTerraStationHelpShown((prev) => !prev)}
                />
              )}
              <textarea
                rows={7}
                className={inputClassName}
                value={terraStationKey}
                disabled
              />
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
