import { isEvmWallet, Wallet } from "@injectivelabs/wallet-base";
import { useState, ReactNode, useEffect, useCallback } from "react";
import { validateMetamask } from "../app/wallet/metamask";

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

    if (isEvmWallet(wallet)) {
      const provider = await walletStrategy.getEip1193Provider();

      await provider.request({ method: "eth_requestAccounts", params: [] });
    }

    if (wallet === Wallet.Metamask) {
      await validateMetamask(address);
    }
  }

  const init = useCallback(() => {
    walletStrategy.setWallet(wallet || Wallet.Metamask);
  }, [wallet]);

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

  async function connectPhantom() {
    await connectWallet(Wallet.Phantom);

    const addresses = await getAddresses();
    const [address] = addresses;

    setWallet(Wallet.Phantom);
    setAddress(address);
    setAddresses(addresses);
    setInjectiveAddress(getInjectiveAddress(address));
    setAddressConfirmation(await walletStrategy.getSessionOrConfirm(address));

    // on connect
  }

  useEffect(() => {
    init();
  }, [init]);

  const value: WalletState = {
    wallet,
    address,
    addresses,
    hwAddresses,
    isConnected,
    injectiveAddress,
    addressConfirmation,
    connectMetamask,
    connectPhantom,
    validate,
    init,
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};
