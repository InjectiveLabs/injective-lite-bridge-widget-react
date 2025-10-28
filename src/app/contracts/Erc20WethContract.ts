import { mainnet } from "viem/chains";
import { wethToken } from "../data/tokens";
import { NETWORK } from "../constants";
import {
  http,
  toHex,
  parseAbi,
  parseEther,
  maxUint256,
  createPublicClient,
  encodeFunctionData,
} from "viem";
import {
  estimateGasAndNonce,
  getAlchemyUrl,
  getInjNetworkToChain,
} from "./utils";
import type { Network } from "@injectivelabs/networks";

import type { Chain, Address, PublicClient } from "viem";

export const erc20WethAbi = parseAbi([
  // Events
  "event Approval(address indexed src, address indexed guy, uint256 wad)",
  "event Deposit(address indexed dst, uint256 wad)",
  "event Transfer(address indexed src, address indexed dst, uint256 wad)",
  "event Withdrawal(address indexed src, uint256 wad)",

  // ERC-20
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address guy, uint256 wad) returns (bool)",
  "function transfer(address dst, uint256 wad) returns (bool)",
  "function transferFrom(address src, address dst, uint256 wad) returns (bool)",

  // WETH specific
  "function deposit() payable",
  "function withdraw(uint256 wad)",

  // Fallback
  "receive() external payable",
]);

export class Erc20WethContract {
  private publicClient: PublicClient;
  private wethAddress: Address;
  private chain: Chain;

  constructor(params: { network: Network }) {
    this.chain = getInjNetworkToChain(params.network) ?? mainnet;

    this.wethAddress = wethToken.address as Address;
    this.publicClient = createPublicClient({
      chain: this.chain,
      transport: http(getAlchemyUrl(params.network)),
    });
  }

  async setTokenAllowance({
    amount = maxUint256,
    fromAddress,
    tokenAddress,
    spenderAddress,
  }: {
    amount?: bigint;
    fromAddress: Address;
    tokenAddress: Address;
    spenderAddress: Address;
  }) {
    const calldata = encodeFunctionData({
      abi: erc20WethAbi,
      functionName: "approve",
      args: [spenderAddress, amount],
    });

    const { gas, fees, nonce } = await estimateGasAndNonce({
      value: 0n,
      calldata,
      to: tokenAddress,
      from: fromAddress,
      publicClient: this.publicClient,
    });

    const tx = {
      data: calldata,
      gas: toHex(gas),
      from: fromAddress,
      nonce: toHex(nonce),
      to: tokenAddress,
      maxFeePerGas: toHex(fees.maxFeePerGas),
      maxPriorityFeePerGas: toHex(fees.maxPriorityFeePerGas),
    };

    return tx;
  }

  async transfer({
    amount,
    fromAddress,
    tokenAddress,
    toAddress,
  }: {
    amount: bigint;
    toAddress: Address;
    fromAddress: Address;
    tokenAddress: Address;
  }) {
    const calldata = encodeFunctionData({
      abi: erc20WethAbi,
      functionName: "transfer",
      args: [toAddress, amount],
    });

    const { gas, fees, nonce } = await estimateGasAndNonce({
      value: 0n,
      calldata,
      from: fromAddress,
      to: tokenAddress,
      publicClient: this.publicClient,
    });

    const tx = {
      data: calldata,
      gas: toHex(gas),
      from: fromAddress,
      nonce: toHex(nonce),
      to: tokenAddress,
      maxFeePerGas: toHex(fees.maxFeePerGas),
      maxPriorityFeePerGas: toHex(fees.maxPriorityFeePerGas),
    };

    return tx;
  }

  async deposit(amount: string, fromAddress: Address) {
    const calldata = encodeFunctionData({
      abi: erc20WethAbi,
      functionName: "deposit",
      args: [],
    });

    const value = parseEther(amount);

    const { gas, fees, nonce } = await estimateGasAndNonce({
      value,
      calldata,
      from: fromAddress,
      to: this.wethAddress,
      publicClient: this.publicClient,
    });

    const tx = {
      data: calldata,
      gas: toHex(gas),
      from: fromAddress,
      nonce: toHex(nonce),
      value: toHex(value),
      to: this.wethAddress,
      maxFeePerGas: toHex(fees.maxFeePerGas),
      maxPriorityFeePerGas: toHex(fees.maxPriorityFeePerGas),
    };

    return tx;
  }
}

export const erc20WethContract = new Erc20WethContract({
  network: NETWORK,
});
