import { isCosmosBrowserWallet, Wallet } from "@injectivelabs/wallet-ts";
import { createContext, useState, useContext, ReactNode } from "react";
import { validateMetamask } from "../app/wallet/metamask";
import { validateCosmosWallet } from "../app/wallet/cosmos";
import { getAddresses, walletStrategy } from "../app/wallet/walletStrategy";
import { getInjectiveAddress } from "@injectivelabs/sdk-ts";

interface WalletContextType {
  address: string;
  injectiveAddress: string;
  addressConfirmation: string;
  addresses: string[];
  hwAddresses: string[];
  wallet?: Wallet;
}

interface WalletProviderActions {
  init: () => void;
  connectMetamask: () => Promise<void>;
}

type State = WalletContextType & WalletProviderActions;

const WalletContext = createContext<State>({
  address: "",
  addresses: [],
  hwAddresses: [],
  wallet: undefined,
  injectiveAddress: "",
  addressConfirmation: "",
  connectMetamask: async () => {},
  init: () => {},
});

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [address, setAddress] = useState<string>("");
  const [injectiveAddress, setInjectiveAddress] = useState<string>("");
  const [addressConfirmation, setAddressConfirmation] = useState<string>("");
  const [addresses, setAddresses] = useState<string[]>([]);
  const [hwAddresses, setHwAddresses] = useState<string[]>([]);
  const [wallet, setWallet] = useState<Wallet | undefined>(undefined);

  async function validate() {
    if (!wallet) {
      throw new Error("Wallet not found");
    }

    if (wallet === Wallet.Metamask) {
      await validateMetamask(address);
    }

    if (isCosmosBrowserWallet(wallet)) {
      await validateCosmosWallet({
        wallet,
        address: injectiveAddress,
      });
    }
  }

  function init() {
    walletStrategy.setWallet(wallet || Wallet.Metamask);
  }

  async function connectWallet(wallet: Wallet) {
    await walletStrategy.disconnect();
    await walletStrategy.setWallet(wallet);
  }

  async function connectMetamask() {
    await connectWallet(Wallet.Metamask);

    const addresses = await getAddresses();
    const [address] = addresses;

    setAddresses(addresses);
    setAddress(address);
    setInjectiveAddress(getInjectiveAddress(address));
    setAddressConfirmation(await walletStrategy.getSessionOrConfirm(address));

    // on connect
  }

  return (
    <WalletContext.Provider
      value={{
        wallet,
        address,
        addresses,
        hwAddresses,
        injectiveAddress,
        addressConfirmation,
        connectMetamask,
        init,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
