import { useEffect, useState, type FC } from 'react';
import { useAccount, useConnect, useDisconnect } from '@starknet-react/core';
import ControllerConnector from '@cartridge/connector/controller';
import { Button } from '@cartridge/ui-next';

export const CartridgeConnectWallet: FC = () => {
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { address } = useAccount();
  const controller = connectors[0] as ControllerConnector;
  const [username, setUsername] = useState<string>();

  useEffect(() => {
    if (!address) return;
    controller.username()?.then((n) => setUsername(n));
  }, [address, controller]);

  return (
    <div>
      {address && (
        <>
          <p>Account: {address}</p>
          {username && <p>Username: {username}</p>}
        </>
      )}
      {address ? (
        <Button onClick={() => disconnect()}>Disconnect</Button>
      ) : (
        <Button
          onClick={() => {
            try {
              connect({ connector: controller });
            } catch (error) {
              console.error('🚀 ~ error:', error);
            }
          }}
        >
          Connect Cartridge
        </Button>
      )}
    </div>
  );
};
