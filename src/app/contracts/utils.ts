import { mainnet, sepolia } from "viem/chains";
import { Network, isMainnet } from "@injectivelabs/networks";

import type { Chain, Address, PublicClient } from "viem";
import { ALCHEMY_KEY, ALCHEMY_SEPOLIA_KEY } from "../constants";

export const getInjNetworkToChain = (network: Network): Chain => {
  if (isMainnet(network)) {
    return mainnet;
  }

  return sepolia;
};

export const alchemyUrlNetworkMap: Partial<Record<Network, string>> = {
  [Network.Mainnet]: "https://eth-mainnet.g.alchemy.com/v2/" + ALCHEMY_KEY,
  [Network.Testnet]:
    "https://eth-sepolia.g.alchemy.com/v2/" + ALCHEMY_SEPOLIA_KEY,
};

export const getAlchemyUrl = (network: Network): string => {
  return (
    alchemyUrlNetworkMap[network] ?? alchemyUrlNetworkMap[Network.Mainnet] ?? ""
  );
};

export const estimateGasAndNonce = async ({
  from,
  to,
  value,
  calldata,
  publicClient,
}: {
  to: Address;
  from: Address;
  value: bigint;
  calldata: `0x${string}`;
  publicClient: PublicClient;
}) => {
  const [gas, fees, nonce] = await Promise.all([
    publicClient.estimateGas({
      account: from,
      to,
      data: calldata,
      value,
    }),
    publicClient.estimateFeesPerGas(),
    publicClient.getTransactionCount({ address: from }),
  ]);
  return { gas, fees, nonce };
};
