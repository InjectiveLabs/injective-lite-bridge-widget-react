import { NETWORK } from "../constants";
import { Network } from "@injectivelabs/networks";
import { injectivePeggyBridgeAddress } from "../data/web3";
import {
  http,
  toHex,
  padHex,
  parseAbi,
  createPublicClient,
  encodeFunctionData,
} from "viem";
import {
  estimateGasAndNonce,
  getAlchemyUrl,
  getInjNetworkToChain,
} from "./utils";

import type { Chain, Address, PublicClient } from "viem";

export const peggyAbi = parseAbi([
  "function sendToInjective(address _tokenContract, bytes32 _destination, uint256 _amount, string _data) external",
]);

export class PeggyContract {
  private publicClient: PublicClient;
  private peggyAddress: string;
  private chain: Chain;

  constructor(params: { network: Network }) {
    this.chain = getInjNetworkToChain(params.network ?? Network.Mainnet)!;
    this.peggyAddress = injectivePeggyBridgeAddress;
    this.publicClient = createPublicClient({
      chain: this.chain,
      transport: http(getAlchemyUrl(params.network)),
    });
  }

  async sendToInjective({
    amount,
    fromAddress,
    tokenAddress,
    destinationAddress,
  }: {
    amount: string;
    fromAddress: string;
    tokenAddress: string;
    destinationAddress: string;
  }) {
    const destination = destinationAddress as Address;

    const calldata = encodeFunctionData({
      abi: peggyAbi,
      functionName: "sendToInjective",
      args: [
        tokenAddress as Address,
        padHex(destination, { size: 32 }),
        BigInt(amount),
        "",
      ],
    });

    const { gas, fees, nonce } = await estimateGasAndNonce({
      from: fromAddress as Address,
      to: this.peggyAddress as Address,
      value: 0n,
      calldata,
      publicClient: this.publicClient,
    });

    const tx = {
      from: fromAddress as Address,
      to: this.peggyAddress as Address,
      data: calldata,
      value: toHex(0n),
      gas: toHex(gas),
      maxFeePerGas: toHex(fees.maxFeePerGas),
      maxPriorityFeePerGas: toHex(fees.maxPriorityFeePerGas),
      nonce: toHex(nonce),
    };

    return tx;
  }
}

export const peggyContract = new PeggyContract({
  network: NETWORK,
});
