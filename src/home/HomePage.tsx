import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import { Bech32Address } from '@/utils/bech32';
import { encrypt } from '@/utils/encrypt';

const HomePage = () => {
  const [privateKey, setPrivateKey] = useState<string>('');
  const [cosmosAddress, setCosmosAddress] = useState<string>('');
  const [walletName, setWalletName] = useState<string>('');
  const [walletPassword, setWalletPassword] = useState<string>('');

  const [terraStationKey, setTerraStationKey] = useState<string>('');
  const onClickGenerateKey = useCallback(() => {
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
  }, [privateKey, cosmosAddress, walletName, walletPassword]);

  return (
    <Container>
      <span>Credentials</span>
      <Input
        value={privateKey}
        onChange={(e) => setPrivateKey(e.target.value)}
        placeholder="Keplr private key"
      />
      <Input
        value={cosmosAddress}
        onChange={(e) => setCosmosAddress(e.target.value)}
        placeholder="Cosmos/Osmosis Address"
      />

      <span>Set wallet name and password to use in Terra Station</span>
      <Input
        value={walletName}
        onChange={(e) => setWalletName(e.target.value)}
        placeholder="Wallet Name"
      />
      <Input
        value={walletPassword}
        onChange={(e) => setWalletPassword(e.target.value)}
        placeholder="Wallet Password"
      />

      <button onClick={onClickGenerateKey}>Generate Key</button>

      {!!terraStationKey && <input value={terraStationKey} disabled />}
    </Container>
  );
};

export default HomePage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input``;
