import {
  Connector,
  useAccount,
  useConnect,
  // useDisconnect,
} from '@starknet-react/core';
import { type FC } from 'react';
import { useStarknetkitConnectModal } from 'starknetkit';
import type { StarknetkitConnector } from 'starknetkit';

import argentIcon from '@assets/images/argent.png';
import styles from './index.module.css';

const ArgentWalletConnector: FC = () => {
  // const { disconnect } = useDisconnect();

  const { connect, connectors } = useConnect();
  const { starknetkitConnectModal } = useStarknetkitConnectModal({
    connectors: connectors as StarknetkitConnector[],
  });

  async function connectWallet() {
    const { connector } = await starknetkitConnectModal();
    if (!connector) {
      return;
    }
    await connect({ connector: connector as Connector });
  }

  const { address } = useAccount();

  if (!address) {
    return (
      <button
        onClick={connectWallet}
        className={styles.button}
        // className='text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors p-4'
      >
        <b className={styles.argentLabel}>sign in with</b>{' '}
        <img src={argentIcon} style={{ width: 32 }} alt='argent' />
        <b className={styles.argentTitle}>argent</b>
      </button>
    );
  }

  return null;
};

export default ArgentWalletConnector;
