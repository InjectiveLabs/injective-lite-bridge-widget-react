import React, { useEffect } from "react";
import { useWallet } from "./context/walletContext";
import { ConnectWallet } from "./components/wallet/ConnectWallet";
import Bridge from "./components/bridge/Bridge";
import { useEvent } from "./context/eventContext";

const App: React.FC = () => {
  const { isConnected } = useWallet();
  const { onInit } = useEvent();

  useEffect(() => {
    onInit();
  });

  return (
    <div className='inj-app'>
      <div className='p-5 w-full dark:text-white text-black'>
        {isConnected ? <Bridge /> : <ConnectWallet />}
      </div>
    </div>
  );
};

export default App;
