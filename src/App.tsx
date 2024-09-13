import React from "react";
import { useWallet } from "./context/walletContext";
import { ConnectWallet } from "./components/wallet/ConnectWallet";

const App: React.FC = () => {
  const { isConnected } = useWallet();

  return (
    <div className='inj-app'>
      <div className='p-5 w-full'>
        {isConnected ? <div>Connected</div> : <ConnectWallet />}
      </div>
    </div>
  );
};

export default App;
