import { Wallet } from "@injectivelabs/wallet-ts";
import { createContext, useContext } from "react";

interface WalletContextType {
  address: string;
  injectiveAddress: string;
  addressConfirmation: string;
  addresses: string[];
  hwAddresses: string[];
  wallet?: Wallet;
  isConnected: boolean;
}

interface WalletProviderActions {
  init: () => void;
  validate: () => Promise<void>;
  connectMetamask: () => Promise<void>;
}

export type WalletState = WalletContextType & WalletProviderActions;

const WalletContext = createContext<WalletState | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};

export default WalletContext;
