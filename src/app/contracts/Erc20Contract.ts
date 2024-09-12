import { EthereumChainId, TransactionOptions } from "@injectivelabs/ts-types";
import { ALLOWANCE_DEFAULT_GAS_LIMIT } from "../constants";
import { ContractTxFunctionObj } from "./types";
import abi from "./abi/injective";
import BaseContract from "./BaseContract";

export class Erc20Contract extends BaseContract<any> {
  static contractName = "Erc20";

  constructor({
    ethereumChainId,
    address,
    provider,
  }: {
    ethereumChainId: EthereumChainId;
    address: string;
    provider: any;
  }) {
    super({
      abi: JSON.stringify(abi),
      ethereumChainId,
      address,
      provider,
    });
  }

  setAllowanceOf({
    amount,
    contractAddress,
    transactionOptions,
  }: {
    amount: string;
    contractAddress: string;
    transactionOptions: TransactionOptions;
  }): ContractTxFunctionObj {
    const { contract, ethersInterface } = this;

    return {
      getABIEncodedTransactionData(): string {
        return ethersInterface.encodeFunctionData("approve", [
          contractAddress,
          amount,
        ]);
      },

      async estimateGasAsync(): Promise<number> {
        try {
          const response = await contract.estimateGas.approve(
            contractAddress,
            amount,
            {
              value: 0,
              from: transactionOptions.from,
            }
          );

          return parseInt(response.toString(), 10);
        } catch (e) {
          return ALLOWANCE_DEFAULT_GAS_LIMIT;
        }
      },
    };
  }

  getDepositEthTx({
    amount,
    transactionOptions,
  }: {
    amount: string;
    transactionOptions: TransactionOptions;
  }): ContractTxFunctionObj {
    const { contract, ethersInterface } = this;

    return {
      getABIEncodedTransactionData(): string {
        return ethersInterface.encodeFunctionData("deposit", []);
      },

      async estimateGasAsync(): Promise<number> {
        try {
          const response = await contract.estimateGas.deposit({
            value: amount,
            from: transactionOptions.from,
          });

          return parseInt(response.toString(), 10);
        } catch (e) {
          return ALLOWANCE_DEFAULT_GAS_LIMIT;
        }
      },
    };
  }
}
