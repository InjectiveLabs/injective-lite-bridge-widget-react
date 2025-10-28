import {
  ErrorType,
  GeneralException,
  MetamaskException,
  UnspecifiedErrorCode,
} from "@injectivelabs/exceptions";
import { walletStrategy } from "./walletStrategy";

import { ETHEREUM_CHAIN_ID } from "../constants";
export const isMetamaskInstalled = async (): Promise<boolean> => {
  const provider = await walletStrategy.getEip1193Provider();

  return !!provider;
};

export const validateMetamask = async (address: string) => {
  const chainId = ETHEREUM_CHAIN_ID;
  const addresses = await walletStrategy.enableAndGetAddresses();
  const metamaskIsLocked = addresses.length === 0;

  if (metamaskIsLocked) {
    throw new MetamaskException(
      new Error(
        "Your Metamask is currently locked. Please unlock your Metamask."
      ),
      {
        code: UnspecifiedErrorCode,
        type: ErrorType.WalletError,
      }
    );
  }

  const [metamaskActiveAddress] = addresses;
  const metamaskActiveAddressDoesntMatchTheActiveAddress =
    address && metamaskActiveAddress.toLowerCase() !== address.toLowerCase();

  if (metamaskActiveAddressDoesntMatchTheActiveAddress) {
    throw new MetamaskException(
      new Error(
        "You are connected to the wrong address. Please logout and connect to Metamask again"
      ),
      {
        code: UnspecifiedErrorCode,
        type: ErrorType.WalletError,
      }
    );
  }

  const metamaskChainId = parseInt(
    await walletStrategy.getEthereumChainId(),
    16
  );
  const metamaskChainIdDoesntMatchTheActiveChainId =
    chainId !== metamaskChainId;

  if (metamaskChainIdDoesntMatchTheActiveChainId) {
    return await updateMetamaskNetwork();
  }

  const metamaskProvider = await walletStrategy.getEip1193Provider();

  if (!metamaskProvider) {
    throw new GeneralException(
      new Error("You are connected to the wrong wallet. Please use Metamask."),
      {
        code: UnspecifiedErrorCode,
        type: ErrorType.WalletError,
      }
    );
  }
};

export const switchToActiveMetamaskNetwork = async () => {
  return await updateMetamaskNetwork();
};

async function updateMetamaskNetwork() {
  return walletStrategy.getEip1193Provider().then((provider) => {
    return provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: `0x${ETHEREUM_CHAIN_ID.toString(16)}` }],
    });
  });
}
