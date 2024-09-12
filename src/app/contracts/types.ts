export interface ContractTxFunctionObj {
  getABIEncodedTransactionData(): string;
  estimateGasAsync(): Promise<number>;
}
