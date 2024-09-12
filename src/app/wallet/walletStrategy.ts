import { WalletStrategy } from "@injectivelabs/wallet-ts";
import {
  ErrorType,
  WalletException,
  UnspecifiedErrorCode,
} from "@injectivelabs/exceptions";
import {
  CHAIN_ID,
  IS_MAINNET,
  ALCHEMY_KEY,
  ETHEREUM_CHAIN_ID,
  ALCHEMY_SEPOLIA_KEY,
} from "./../constants/setup";
import { alchemyRpcEndpoint } from "./../constants/setup";
import {
  APP_NAME,
  APP_BASE_URL,
  WALLET_CONNECT_PROJECT_ID,
} from "./../constants/setup";

export const walletStrategy = new WalletStrategy({
  chainId: CHAIN_ID,
  ethereumOptions: {
    ethereumChainId: ETHEREUM_CHAIN_ID,
    rpcUrl: alchemyRpcEndpoint,
  },
  options: {
    metadata: {
      name: APP_NAME,
      url: APP_BASE_URL,
      projectId: WALLET_CONNECT_PROJECT_ID,
      description: "",
    },
  },
});

export const alchemyKey = (
  IS_MAINNET ? ALCHEMY_KEY : ALCHEMY_SEPOLIA_KEY
) as string;

export const getAddresses = async (): Promise<string[]> => {
  const addresses = await walletStrategy.enableAndGetAddresses();

  if (addresses.length === 0) {
    throw new WalletException(
      new Error("There are no addresses linked to this wallet."),
      {
        code: UnspecifiedErrorCode,
        type: ErrorType.WalletError,
      }
    );
  }

  if (!addresses.every((address) => !!address)) {
    throw new WalletException(
      new Error("There are no addresses linked to this wallet."),
      {
        code: UnspecifiedErrorCode,
        type: ErrorType.WalletError,
      }
    );
  }

  return addresses;
};
