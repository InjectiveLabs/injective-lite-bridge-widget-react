import React from "react";
import { useWallet } from "./context/walletContext";
import { ConnectWallet } from "./components/wallet/ConnectWallet";
import Bridge from "./components/bridge/Bridge";

const App: React.FC = () => {
  const { isConnected } = useWallet();

  return (
    <div className='inj-app'>
      <div className='p-5 w-full'>
        {isConnected ? <Bridge /> : <ConnectWallet />}
      </div>
    </div>
  );
};

export default App;
