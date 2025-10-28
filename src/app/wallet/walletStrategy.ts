import { WalletStrategy } from "@injectivelabs/wallet-strategy";
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
  NETWORK,
} from "./../constants/setup";
import { getAlchemyUrl } from "./../constants/setup";

import { EvmChainId } from "@injectivelabs/ts-types";
export const walletStrategy = new WalletStrategy({
  chainId: CHAIN_ID,
  evmOptions: {
    evmChainId: ETHEREUM_CHAIN_ID as unknown as EvmChainId,
    rpcUrl: getAlchemyUrl(NETWORK),
  },

  strategies: {},
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
