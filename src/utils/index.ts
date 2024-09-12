import { IS_DEVNET, IS_TESTNET } from "../app/constants";

export const getExplorerUrl = (): string => {
  if (IS_DEVNET) {
    return "https://devnet.explorer.injective.dev";
  }

  if (IS_TESTNET) {
    return "https://testnet.explorer.injective.network";
  }

  return "https://explorer.injective.network";
};

export const formatCurrency = (
  amount: number | string,
  decimals = 2
): string => {
  return new Intl.NumberFormat("en-US", {
    style: "decimal",

    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(Number(amount));
};
