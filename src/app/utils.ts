import { TransactionOptions } from "@injectivelabs/ts-types";
import { DEFAULT_GAS_PRICE } from "./constants";
import { TX_DEFAULTS_GAS } from "./constants";

export const ALLOWANCE_DEFAULT_GAS_LIMIT = 45000;
export const PEGGY_TRANSFER_DEFAULT_GAS_LIMIT = 100000;

export const getTransactionOptions = (
  transactionOptions: Partial<TransactionOptions>
): TransactionOptions => ({
  from: transactionOptions.from,
  gas: transactionOptions.gas ? transactionOptions.gas : TX_DEFAULTS_GAS,
  gasPrice: transactionOptions.gasPrice
    ? transactionOptions.gasPrice.toString()
    : DEFAULT_GAS_PRICE.toString(),
});

export const peggyDenomToContractAddress = (denom: string): string =>
  denom.replace("peggy", "");

export const getKeyFromRpcUrl = (rpcUrl: string) => {
  if (!rpcUrl.includes("alchemyapi.io") && !rpcUrl.includes("alchemy.com")) {
    return rpcUrl;
  }

  const [key] = rpcUrl.split("/").reverse();

  return key;
};
