import { type FC, type PropsWithChildren } from 'react';

import { sepolia, type Chain } from '@starknet-react/chains';
import {
  StarknetConfig,
  jsonRpcProvider,
  starkscan,
} from '@starknet-react/core';
import ControllerConnector from '@cartridge/connector/controller';
import { constants } from 'starknet';

export const ETH_TOKEN_ADDRESS =
  '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7';
// MY BRAAWOS
// export const ETH_TOKEN_ADDRESS =
//   '0x0116d24fa2ed8ced5e9c4e7da72e76216f104ff236cfb3c1033d611085df6b63';

// Define session policies
const policies = {
  contracts: {
    [ETH_TOKEN_ADDRESS]: {
      methods: [
        {
          name: 'approve',
          entrypoint: 'approve',
          description: 'Approve spending of tokens',
        },
        { name: 'transfer', entrypoint: 'transfer' },
      ],
    },
  },
};

// Initialize the connector
const connector = new ControllerConnector({
  policies,
  defaultChainId: constants.StarknetChainId.SN_SEPOLIA,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  rpcUrl: 'https://api.cartridge.gg/x/starknet/sepolia',
  chains: [
    { ...sepolia, rpcUrl: 'https://api.cartridge.gg/x/starknet/sepolia' },
  ],
});

// Configure RPC provider
const provider = jsonRpcProvider({
  rpc: (chain: Chain) => {
    switch (chain) {
      // case mainnet:
      //   return { nodeUrl: 'https://api.cartridge.gg/x/starknet/mainnet' };
      case sepolia:
      default:
        return { nodeUrl: 'https://api.cartridge.gg/x/starknet/sepolia' };
    }
  },
});

export const CartridgeProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <StarknetConfig
      autoConnect
      chains={[sepolia]}
      provider={provider}
      connectors={[connector]}
      explorer={starkscan}
    >
      {children}
    </StarknetConfig>
  );
};
