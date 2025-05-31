import { useState } from 'react';
import { useAccount } from '@starknet-react/core';
import { jwtDecode } from 'jwt-decode';
import { stark } from 'starknet';

import { generateMessage } from './auth-view.api';
import { api } from '@configs';

export const AuthView = () => {
  const { address, account } = useAccount();

  const [jwt, setJwt] = useState('');
  const [nonce, setNonce] = useState('');

  const signUp = async () => {
    try {
      await api.post<void>(`/auth/web3/signup`, { accountAddress: address });
    } catch (e) {
      console.error(e);
    }
  };

  const generateNonce = async () => {
    try {
      const res = await api.post<{ jwt: string }>(`/auth/web3/nonce`, {
        accountAddress: address,
      });
      const decodedJwt = jwtDecode<{ nonce: string }>(res.data.jwt);
      setJwt(res.data.jwt);
      setNonce(decodedJwt.nonce);
    } catch (e) {
      console.error(e);
    }
  };

  const signIn = async () => {
    try {
      if (nonce === undefined || !account || !jwt)
        throw new Error('Invalid sign in data');

      const message = generateMessage(nonce);
      const signedMessage = await account.signMessage(message);
      const transformedSignedMessage = stark.formatSignature(signedMessage);

      await api.post<{
        accessToken: string;
        refreshToken: string;
      }>(`/auth/web3/signin`, {
        signedMessage: transformedSignedMessage,
        jwt,
      });
    } catch (e) {
      console.error(e);
    }
  };

  if (!account) return null;

  return (
    <div>
      <button onClick={signUp}>sign up</button>
      <button onClick={generateNonce}>generate nonce</button>
      <button onClick={signIn}>sign in</button>
    </div>
  );
};
