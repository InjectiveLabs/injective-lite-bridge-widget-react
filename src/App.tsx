import React from "react";
import { useWallet } from "./context/walletContext";

const App: React.FC = () => {
  const { connectMetamask, address } = useWallet();

  return (
    <div className='inj-app'>
      <h1>Address : {address}</h1>
      <button onClick={connectMetamask}>Connect Metamask</button>
    </div>
  );
};

export default App;
