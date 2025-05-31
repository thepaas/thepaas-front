import type { FC, PropsWithChildren } from 'react';
import { InjectedConnector } from 'starknetkit/injected';
import { WebWalletConnector } from 'starknetkit/webwallet';
import { StarknetConfig, publicProvider, voyager } from '@starknet-react/core';
import { sepolia } from '@starknet-react/chains';
import type { Connector } from 'starknetkit';

const connectors = [
  new InjectedConnector({
    options: { id: 'argentX', name: 'Argent X' },
  }),
  new InjectedConnector({
    options: { id: 'braavos', name: 'Braavos' },
  }),
  new WebWalletConnector({ url: 'https://web.argent.xyz' }),
];

export const ArgentProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <StarknetConfig
      autoConnect
      chains={[sepolia]}
      provider={publicProvider()}
      connectors={connectors as Connector[]}
      explorer={voyager}
    >
      {children}
    </StarknetConfig>
  );
};
