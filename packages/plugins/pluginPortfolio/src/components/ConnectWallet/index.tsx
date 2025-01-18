/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ConnectButton,
  useCurrentAccount,
  useSignTransaction,
  useSuiClient,
} from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import React, { useState } from 'react';
import { toast } from 'sonner';

import { useQuery } from '@tanstack/react-query';

export interface SuiAccountObject {
  coins: Coin[];
  nfts: Nft[];
  domains: any[];
  unknowns: any[];
  kiosks: any[];
}

export interface Coin {
  objectCount: number;
  type: string;
  lockedBalance: null;
  totalBalance: number;
  bridge: boolean;
  decimals: number;
  denom: string;
  name: string;
  symbol: string;
  verified: boolean;
  objectType: string;
  tokenPrice: number;
  iconUrl: string;
  noMetadata: boolean;
  scamMessage: null;
  afSupported: boolean;
}

export interface Nft {
  objectType: string;
  type: string;
  icon: string;
  name: string;
  objectId: string;
  scamMessage: null;
  amount: number;
  objectCount: number;
}

export interface ObjectNFT {
  jsonrpc: string;
  id: number;
  result: Result;
}

export interface Result {
  data: Data;
}

export interface Data {
  objectId: string;
  version: string;
  digest: string;
  type: string;
  owner: Owner;
  previousTransaction: string;
  storageRebate: string;
  display: Display;
  content: Content;
  bcs: Bcs;
}

export interface Bcs {
  dataType: string;
  type: string;
  hasPublicTransfer: boolean;
  version: number;
  bcsBytes: string;
}

export interface Content {
  dataType: string;
  type: string;
  hasPublicTransfer: boolean;
  fields: Fields;
}

export interface Fields {
  description: string;
  id: ID;
  metadata: string;
  name: string;
  url: string;
}

export interface ID {
  id: string;
}

export interface Display {
  data: null;
  error: null;
}

export interface Owner {
  AddressOwner: string;
}

const TAROT_NFT_PACKAGE =
  '0x2801a62547b9eb7e617fb9de58877a7fff5a25c0aab59f03e179e3850b8d353e';

export const useFetchAccountNftTokens = () => {
  const account = useCurrentAccount();

  return useQuery({
    queryKey: ['api/accounts/objects', account?.address],
    queryFn: async () => {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      const raw = JSON.stringify({
        objectTypes: ['coin', 'nft', 'unknown', 'kiosk', 'domains'],
      });

      const json = await fetch(
        `https://suiscan.xyz/api/sui-backend/devnet/api/accounts/${account?.address}/objects`,
        {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow',
        }
      )
        .then((response) => response.json())
        .then((result) => result as SuiAccountObject)
        .catch(() => null);

      if (Array.isArray(json?.nfts)) {
        const promise = await Promise.all(
          json.nfts.map(async (nft) => {
            const raw = JSON.stringify({
              jsonrpc: '2.0',
              id: 1,
              method: 'sui_getObject',
              params: [
                nft.objectId,
                {
                  showType: true,
                  showOwner: true,
                  showPreviousTransaction: true,
                  showDisplay: true,
                  showContent: true,
                  showBcs: true,
                  showStorageRebate: true,
                },
              ],
            });

            const arr = await fetch('https://suiscan.xyz/api/sui/devnet/', {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow',
            })
              .then((response) => response.json())
              .then((result) => result as ObjectNFT)
              .catch(() => null);

            return arr?.result?.data;
          })
        );

        if (promise) return promise as Data[]
        return [];
      }

      return [];
    },
    enabled: !!account?.address,
  });
};

export const useMintTarotNft = () => {
  const client = useSuiClient();
  const { mutateAsync: signTransaction } = useSignTransaction();
  const [isLoading, setIsLoading] = useState(false);
  const [mintData, setMintData] = useState<any>();

  const handleMint = React.useCallback(
    async (props?: {
      name: string;
      description: string;
      url: string;
      metadata: string;
    }) => {
      try {
        setIsLoading(true);
        const tx = new Transaction();
        let name = props?.name ?? 'Default Name',
          description = props?.description ?? 'Default Description',
          url = props?.url ?? 'https://example.com',
          metadata =
            typeof props?.metadata === 'string'
              ? props?.metadata
              : JSON.stringify(props?.metadata ?? {});
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
          package: TAROT_NFT_PACKAGE,
        });

        tx.setGasBudget(gasBudget);

        // transfer the split coin to a specific address
        const { bytes, signature } = await signTransaction({
          transaction: tx,
          chain: 'sui:devnet',
        });

        const executeRequest = client.executeTransactionBlock({
          transactionBlock: bytes,
          signature,
          options: {
            showRawEffects: true,
          },
        });

        toast.promise(executeRequest, {
          loading: 'Getting your NFT...',
          success: (executeResult: any) => {
            const txLink = `https://suiscan.xyz/devnet/tx/${executeResult.digest}`;
            setMintData(executeResult);
            return (
              <span>
                Get NFT completed!{' '}
                <a
                  href={txLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-400"
                >
                  View Transaction
                </a>
              </span>
            );
          },
          error: 'Failed to get NFT',
        });

        // console.log(executeResult);
        // setTimeout(() => {
        //   window.open(`https://suiscan.xyz/devnet/tx/${executeResult.digest}`);
        // }, 1_500);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { handleMint, isLoading, mintData };
};

export const ConnectWallet: React.FC = () => {
  return (
    <div className="App">
      <div className="App-header">
        <ConnectButton className={'p-2'} />
      </div>
      {/* <Button
        onClick={() => {
          handleMint();
        }}
      >
        {' '}
        Mint NFT{' '}
      </Button> */}
    </div>
  );
};
