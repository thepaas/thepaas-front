import { useCallback, useState, type FC } from 'react';
import { useAccount, useExplorer } from '@starknet-react/core';
import { constants, stark, TypedDataRevision, type TypedData } from 'starknet';

const ETH_CONTRACT =
  '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7';

export const myTypedData: TypedData = {
  domain: {
    name: 'ThePaaSApp',
    chainId: constants.StarknetChainId.SN_SEPOLIA,
    version: '0.0.1',
    revision: TypedDataRevision.ACTIVE,
  },
  message: {
    name: 'MonKeyCollection',
    value: 2312,
  },
  primaryType: 'Simple',
  types: {
    Simple: [
      {
        name: 'name',
        type: 'shortstring',
      },
      {
        name: 'value',
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
};

export const CartridgeTestTransfer: FC = () => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const { account } = useAccount();
  const explorer = useExplorer();
  const [txnHash, setTxnHash] = useState<string>();

  const testSign = useCallback(async () => {
    if (!account) return;

    setSubmitted(true);
    setTxnHash(undefined);

    try {
      const res = await account.signMessage(myTypedData);
      const cartridgeFomnatted = stark.formatSignature(res);
      console.warn('🚀 ~ testSign ~ cartridgeFomnatted:', cartridgeFomnatted);
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitted(false);
    }
  }, [account]);

  const execute = useCallback(
    async (amount: string) => {
      if (!account) return;
      setSubmitted(true);
      setTxnHash(undefined);
      try {
        const result = await account.execute([
          {
            contractAddress: ETH_CONTRACT,
            entrypoint: 'approve',
            calldata: [account?.address, amount, '0x0'],
          },
          {
            contractAddress: ETH_CONTRACT,
            entrypoint: 'transfer',
            calldata: [account?.address, amount, '0x0'],
          },
        ]);
        setTxnHash(result.transaction_hash);
      } catch (e) {
        console.error(e);
      } finally {
        setSubmitted(false);
      }
    },
    [account]
  );

  if (!account) return null;

  return (
    <div>
      <h2>Transfer ETH</h2>
      <button onClick={() => execute('0x1C6BF52634000')} disabled={submitted}>
        Transfer 0.005 ETH
      </button>

      <button onClick={() => testSign()} disabled={submitted}>
        Test sign
      </button>

      {txnHash && (
        <p>
          Transaction hash:{' '}
          <a
            href={explorer.transaction(txnHash)}
            target='blank'
            rel='noreferrer'
          >
            {txnHash}
          </a>
        </p>
      )}
    </div>
  );
};
