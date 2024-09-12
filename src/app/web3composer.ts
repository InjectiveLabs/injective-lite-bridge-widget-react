import { EthereumChainId } from "@injectivelabs/ts-types";
import { Network, isTestnet } from "@injectivelabs/networks";
import { BigNumberInWei } from "@injectivelabs/utils";
import { injToken, injErc20Token, wethToken } from "./data/tokens";
import { Alchemy, Network as AlchemyNetwork } from "alchemy-sdk";
import {
  getKeyFromRpcUrl,
  getTransactionOptions,
  peggyDenomToContractAddress,
} from "../app/utils";

import { Erc20Contract, PeggyContract } from "./contracts";

import {
  TIP_IN_GWEI,
  TIP_IN_GWEI_TESTNET,
  GAS_LIMIT_MULTIPLIER,
  NETWORK,
  alchemyRpcEndpoint,
  ETHEREUM_CHAIN_ID,
} from "../app/constants/index";
import { injectivePeggyAddress } from "../app/data/web3";

/**
 * Preparing and broadcasting
 * Ethereum transactions
 */
export class Web3Composer {
  private network: Network;

  private ethereumChainId: EthereumChainId;

  private rpc: string;

  private alchemy: Alchemy | undefined;

  constructor({
    ethereumChainId,
    network,
    rpc,
  }: {
    rpc: string;
    ethereumChainId: EthereumChainId;
    network: Network;
  }) {
    this.rpc = rpc;
    this.ethereumChainId = ethereumChainId;
    this.network = network;
  }

  async getSetTokenAllowanceTx({
    address,
    amount,
    gasPrice,
    tokenAddress,
  }: {
    address: string;
    amount: string;
    gasPrice: string;
    tokenAddress: string;
  }) {
    const { ethereumChainId, network } = this;
    const alchemy = await this.getAlchemy();
    const ethersProvider = await alchemy.config.getProvider();

    const erc20Contract = new Erc20Contract({
      ethereumChainId,
      provider: ethersProvider,
      address: tokenAddress,
    });

    const setAllowanceOfContractFunction = erc20Contract.setAllowanceOf({
      amount,
      contractAddress: injectivePeggyAddress[network],
      transactionOptions: getTransactionOptions({
        gasPrice: "0",
        from: address,
      }),
    });

    const data = setAllowanceOfContractFunction.getABIEncodedTransactionData();
    const gas = new BigNumberInWei(
      await setAllowanceOfContractFunction.estimateGasAsync()
    );
    const maxPriorityFeePerGas = (
      isTestnet(network) ? TIP_IN_GWEI_TESTNET : TIP_IN_GWEI
    ).toString(16);

    return {
      from: address,
      to: tokenAddress,
      gas: new BigNumberInWei(gas.times(GAS_LIMIT_MULTIPLIER).toFixed(0))
        .decimalPlaces(0)
        .toNumber()
        .toString(16),
      maxFeePerGas: new BigNumberInWei(gasPrice)
        .decimalPlaces(0)
        .toNumber()
        .toString(16),
      maxPriorityFeePerGas,
      data,
    };
  }

  async getPeggyTransferTx({
    address,
    amount,
    denom,
    destinationAddress,
    gasPrice,
    data = "",
  }: {
    address: string;
    amount: string; // BigNumberInWei
    denom: string;
    destinationAddress: string;
    gasPrice: string; // BigNumberInWei,
    data?: string;
  }) {
    const { network, ethereumChainId } = this;
    const alchemy = await this.getAlchemy();
    const ethersProvider = await alchemy.config.getProvider();

    const contractAddress =
      denom === injToken.denom
        ? injErc20Token.address
        : peggyDenomToContractAddress(denom);
    const peggyContractAddress = injectivePeggyAddress[network];

    const contract = new PeggyContract({
      ethereumChainId,
      provider: ethersProvider,
      address: peggyContractAddress,
    });

    const depositForContractFunction = contract.sendToInjective({
      contractAddress,
      data,
      amount: new BigNumberInWei(amount).toFixed(),
      address: `0x${"0".repeat(24)}${destinationAddress.slice(2)}`,
      transactionOptions: getTransactionOptions({
        gasPrice: "0",
        from: address,
      }),
    });

    const abiEncodedData =
      depositForContractFunction.getABIEncodedTransactionData();
    const gas = new BigNumberInWei(
      await depositForContractFunction.estimateGasAsync()
    );

    const maxPriorityFeePerGas = (
      isTestnet(network) ? TIP_IN_GWEI_TESTNET : TIP_IN_GWEI
    ).toString(16);

    return {
      from: address,
      to: peggyContractAddress,
      gas: new BigNumberInWei(gas.times(GAS_LIMIT_MULTIPLIER).toFixed(0))
        .decimalPlaces(0)
        .toNumber()
        .toString(16),
      maxFeePerGas: new BigNumberInWei(gasPrice)
        .decimalPlaces(0)
        .toNumber()
        .toString(16),
      maxPriorityFeePerGas,
      data: abiEncodedData,
    };
  }

  async getDepositEthTx({
    address,
    amount,
    gasPrice,
  }: {
    address: string;
    amount: string;
    gasPrice: string;
  }) {
    const { ethereumChainId } = this;
    const alchemy = await this.getAlchemy();
    const ethersProvider = await alchemy.config.getProvider();

    if (!wethToken) {
      return;
    }

    const erc20Contract = new Erc20Contract({
      ethereumChainId,
      provider: ethersProvider,
      address: wethToken.address,
    });

    const depositTx = erc20Contract.getDepositEthTx({
      amount: amount.toString(),
      transactionOptions: getTransactionOptions({
        gasPrice: "0", // Setting gasPrice to '0' for gas estimation
        from: address,
      }),
    });

    const data = depositTx.getABIEncodedTransactionData();
    const gas = new BigNumberInWei(await depositTx.estimateGasAsync());
    const maxPriorityFeePerGas = (
      isTestnet(this.network) ? TIP_IN_GWEI_TESTNET : TIP_IN_GWEI
    ).toString(16);

    const transaction = {
      from: address,
      to: erc20Contract.address,
      gas: new BigNumberInWei(gas.times(GAS_LIMIT_MULTIPLIER).toFixed(0))
        .decimalPlaces(0)
        .toNumber()
        .toString(16),
      maxFeePerGas: new BigNumberInWei(gasPrice)
        .decimalPlaces(0)
        .toNumber()
        .toString(16),
      maxPriorityFeePerGas,
      data,
      value: new BigNumberInWei(amount)
        .decimalPlaces(0)
        .toNumber()
        .toString(16),
    };

    return transaction;
  }

  private async getAlchemy() {
    if (this.alchemy) {
      return this.alchemy;
    }

    const { rpc, ethereumChainId } = this;

    this.alchemy = new Alchemy({
      apiKey: getKeyFromRpcUrl(rpc),
      network:
        ethereumChainId === EthereumChainId.Mainnet
          ? AlchemyNetwork.ETH_MAINNET
          : AlchemyNetwork.ETH_SEPOLIA,
    });

    return this.alchemy;
  }
}

export const web3Composer = new Web3Composer({
  network: NETWORK,
  rpc: alchemyRpcEndpoint,
  ethereumChainId: ETHEREUM_CHAIN_ID,
});
