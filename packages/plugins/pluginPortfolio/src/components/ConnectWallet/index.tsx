/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ConnectButton,
  useAutoConnectWallet,
  useCurrentAccount,
  useSignTransaction,
  useSuiClient,
  useSuiClientQuery,
} from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import React from 'react';

import { Button } from '@repo/ui';

function OwnedObjects({ address }: { address: string }) {
  const { data } = useSuiClientQuery('getOwnedObjects', {
    owner: address,
  });
  if (!data) {
    return null;
  }

  return (
    <ul>
      {data.data.map((object) => (
        <li key={object.data?.objectId}>
          <a
            href={`https://example-explorer.com/object/${object.data?.objectId}`}
          >
            {object.data?.objectId}
          </a>
        </li>
      ))}
    </ul>
  );
}

function ConnectedAccount() {
  const account = useCurrentAccount();

  if (!account) {
    return null;
  }

  return (
    <div>
      <div className="truncate">Connected to {account.address}</div>;
      {/* <OwnedObjects address={account.address} /> */}
    </div>
  );
}

export const ConnectWallet: React.FC = () => {
  const client = useSuiClient();
  const { mutateAsync: signTransaction } = useSignTransaction();
  const autoConnectionStatus = useAutoConnectWallet();

  const handleTransferNft = () => {};

  const handleMint = React.useCallback(async () => {
    const tx = new Transaction();
    let name = 'Default Name',
      description = 'Default Description',
      url = 'https://example.com',
      metadata = 'https://example.com';
    const gasBudget = 20_000_000;

    tx.moveCall({
      function: 'mint_to_sender',
      module: 'testnet_nft',
      arguments: [
        tx.pure.string(name),
        tx.pure.string(description),
        tx.pure.string(url),
        tx.pure.string(metadata),
      ],
      package:
        '0x2801a62547b9eb7e617fb9de58877a7fff5a25c0aab59f03e179e3850b8d353e',
    });

    tx.setGasBudget(gasBudget);

    console.log('🚀 ~ handleMint ~ tx:', tx);

    // transfer the split coin to a specific address
    const { bytes, signature, reportTransactionEffects } =
      await signTransaction({
        transaction: tx,
        chain: 'sui:devnet',
      });
    console.log('🚀 ~ handleMint ~ signature:', signature, bytes);

    const executeResult = await client.executeTransactionBlock({
      transactionBlock: bytes,
      signature,
      options: {
        showRawEffects: true,
      },
    });
    console.log('🚀 ~ handleMint ~ executeResult:', executeResult);

    // Always report transaction effects to the wallet after execution
    reportTransactionEffects(executeResult.rawEffects);

    console.log(executeResult);
  }, []);

  return (
    <div className="App">
      <div className="App-header">
        <ConnectButton className={'p-2'} />
        <div>Auto-connection status: {autoConnectionStatus}</div>
      </div>
      <Button onClick={handleMint}> Mint NFT </Button>
    </div>
  );
};
