import {
  AccountAddress,
  EthereumChainId,
  TransactionOptions,
} from "@injectivelabs/ts-types";
import BaseContract from "./BaseContract";
import { ContractTxFunctionObj } from "./types";

import { PEGGY_TRANSFER_DEFAULT_GAS_LIMIT } from "../constants";
import abi from "./abi/peggy";

export class PeggyContract extends BaseContract<any> {
  static contractName = "Peggy";

  constructor({
    ethereumChainId,
    address,
    provider,
  }: {
    ethereumChainId: EthereumChainId;
    provider: any;
    address: string;
  }) {
    super({
      abi: JSON.stringify(abi),
      ethereumChainId,
      provider,
      address,
    });
  }

  sendToInjective({
    data = "",
    amount,
    address,
    contractAddress,
    transactionOptions,
  }: {
    data?: any;
    amount: string;
    address: AccountAddress;
    contractAddress: string;
    transactionOptions: TransactionOptions;
  }): ContractTxFunctionObj {
    const { contract, ethersInterface } = this;

    return {
      getABIEncodedTransactionData(): string {
        return ethersInterface.encodeFunctionData("sendToInjective", [
          contractAddress,
          address,
          amount,
          data,
        ]);
      },

      async estimateGasAsync(): Promise<number> {
        try {
          const response = await contract.estimateGas.sendToInjective(
            contractAddress,
            address,
            amount,
            data,
            {
              value: 0,
              from: transactionOptions.from,
            }
          );

          return parseInt(response.toString(), 10);
        } catch (e) {
          return PEGGY_TRANSFER_DEFAULT_GAS_LIMIT;
        }
      },
    };
  }
}
