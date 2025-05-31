import { jwtDecode } from 'jwt-decode';
import { stark, TypedDataRevision, type TypedData } from 'starknet';
import type { AccountInterface } from 'starknet';

import { api } from '@configs';
import { setAccessToken } from '@services/jwt';

export const signUp = async (accountAddress: string) => {
  try {
    await api.post<void>(`/auth/web3/signup`, { accountAddress });
  } catch (e) {
    console.error(e);
  }
};

export const generateNonce = async (accountAddress: string) => {
  try {
    const res = await api.post<{ jwt: string }>(`/auth/web3/nonce`, {
      accountAddress,
    });
    const { nonce } = jwtDecode<{ nonce: string }>(res.data.jwt);

    return { jwt: res.data.jwt, nonce };
  } catch (e) {
    console.error(e);
  }
};

export const signIn = async (
  account: AccountInterface,
  jwt: string,
  nonce: string
) => {
  try {
    const message = generateMessage(nonce);
    const signedMessage = await account.signMessage(message);
    const transformedSignedMessage = stark.formatSignature(signedMessage);

    const res = await api.post<{
      accessToken: string;
      refreshToken: string;
    }>(`/auth/web3/signin`, {
      signedMessage: transformedSignedMessage,
      jwt,
    });

    setAccessToken(res.data.accessToken);
  } catch (e) {
    console.error(e);
  }
};

const generateMessage = (nonce: string): TypedData => ({
  domain: {
    name: import.meta.env.VITE_APP_NAME,
    chainId: import.meta.env.VITE_CHAIN_ID,
    version: import.meta.env.VITE_APP_VERSION,
    revision: TypedDataRevision.ACTIVE,
  },
  message: {
    nonce,
  },
  primaryType: 'Simple',
  types: {
    Simple: [
      {
        name: 'nonce',
        type: 'u128',
      },
    ],
    StarknetDomain: [
      {
        name: 'name',
        type: 'shortstring',
      },
      {
        name: 'chainId',
        type: 'shortstring',
      },
      {
        name: 'version',
        type: 'shortstring',
      },
      {
        name: 'revision',
        type: 'shortstring',
      },
    ],
  },
});
