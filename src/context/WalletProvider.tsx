import { isCosmosBrowserWallet, Wallet } from "@injectivelabs/wallet-ts";
import { useState, ReactNode } from "react";
import { validateMetamask } from "../app/wallet/metamask";
import { validateCosmosWallet } from "../app/wallet/cosmos";
import { getAddresses, walletStrategy } from "../app/wallet/walletStrategy";
import { getInjectiveAddress } from "@injectivelabs/sdk-ts";
import WalletContext, { WalletState } from "./walletContext";

type WalletProviderProps = {
  children: ReactNode;
  wallet?: {
    wallet: Wallet;
    address: string;
    injectiveAddress: string;
  };
};

export const WalletProvider = ({
  children,
  wallet: walletProps,
}: WalletProviderProps) => {
  const [address, setAddress] = useState<string>(walletProps?.address || "");
  const [injectiveAddress, setInjectiveAddress] = useState<string>(
    walletProps?.injectiveAddress || ""
  );
  const [addressConfirmation, setAddressConfirmation] = useState<string>("");
  const [addresses, setAddresses] = useState<string[]>(
    walletProps?.address ? [walletProps.address] : []
  );
  const [hwAddresses] = useState<string[]>([]);
  const [wallet, setWallet] = useState<Wallet | undefined>(walletProps?.wallet);

  const isConnected = !!(address && wallet && injectiveAddress);

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

    setWallet(Wallet.Metamask);
    setAddress(address);
    setAddresses(addresses);
    setInjectiveAddress(getInjectiveAddress(address));
    setAddressConfirmation(await walletStrategy.getSessionOrConfirm(address));

    // on connect
  }

  const value: WalletState = {
    wallet,
    address,
    addresses,
    hwAddresses,
    isConnected,
    injectiveAddress,
    addressConfirmation,
    connectMetamask,
    validate,
    init,
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};
