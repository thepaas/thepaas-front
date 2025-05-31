import { TypedDataRevision, type TypedData } from 'starknet';

export const generateMessage = (nonce: string): TypedData => ({
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
