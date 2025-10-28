import { mainnet, sepolia } from "viem/chains";
import { Network, isMainnet } from "@injectivelabs/networks";

import type { Chain, Address, PublicClient } from "viem";

export const getInjNetworkToChain = (network: Network): Chain => {
  if (isMainnet(network)) {
    return mainnet;
  }

  return sepolia;
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
