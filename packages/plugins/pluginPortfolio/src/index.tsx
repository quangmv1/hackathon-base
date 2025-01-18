import { useGlobalHook, useRegisterPlugin } from '@repo/plugin-sdk';
import { TUserInfo } from '@repo/store/types';
import React from 'react';
import { AppProvider } from './providers/app';
import { ConnectWallet } from './components/ConnectWallet';

export const PluginPortfolio = () => {
  const { add_hook } = useGlobalHook();

  const bootstrap = () => {
    //This fn can be extracted;
    add_hook(
      'subtitle',
      () => {
        return <div>Plugin contents 123</div>;
      },
      'action',
      'PluginPortfolio'
    );
    add_hook(
      'dataPortfolio',
      (...args: any[]) => {
        console.log('Args in dataPortfolio:', args);
        const [mockUserInfo, inputAddress] = args;
        const result = mockUserInfo.filter(
          (user: TUserInfo) => user.address === inputAddress
        );
        return result;
      },
      'filter',
      'PluginPortfolio'
    );
  };

  useRegisterPlugin({
    name: 'PluginPortfolio',
    author: 'Dangvu',
    bootstrap,
  });
  return (
    <AppProvider>
      <div className="border rounded-lg p-4 border-dividerColorDefault">
        Sui Create NFT
        <ConnectWallet />
      </div>
    </AppProvider>
  );
};
