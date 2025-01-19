import { useGlobalHook, useRegisterPlugin } from '@repo/plugin-sdk';
import React from 'react';

import TarotContainer from './components/TarotContainer';

export const PluginPortfolio = () => {
  const { add_hook } = useGlobalHook();

  const bootstrap = () => {
    //This fn can be extracted;
    add_hook(
      'subtitle',
      () => {
        // return <div>Plugin contents 123</div>;
        // return <div>AI Pro Tarrot</div>;
        return null
      },
      'action',
      'PluginPortfolio'
    );
    add_hook(
      'dataPortfolio',
      (...args: any[]) => {
        console.log('Args in dataPortfolio:', args);
        // const [mockUserInfo, inputAddress] = args;
        // const result = mockUserInfo.filter(
        //   (user: TUserInfo) => user.address === inputAddress
        // );
        // return result;
        return null;
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
    <div className="border rounded-lg p-4 border-dividerColorDefault">
      {/* <ConnectWallet /> */}
      <TarotContainer />
    </div>
  );
};
