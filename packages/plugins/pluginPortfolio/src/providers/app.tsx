import { SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useState } from 'react';

const queryClient = new QueryClient();
const networks = {
  devnet: { url: getFullnodeUrl('devnet') },
};

import '@mysten/dapp-kit/dist/index.css';
export const AppContext = React.createContext({});
export const useAppContext = () => React.useContext(AppContext);

export const AppProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [userInfo, setUserInfo] = useState({});

  function updateUserInfo(data: any) {
    setUserInfo(data);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networks} defaultNetwork="devnet">
        <WalletProvider autoConnect>
          <AppContext.Provider value={{ userInfo, updateUserInfo }}>
            {children}
          </AppContext.Provider>
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
};
