import { MsgBroadcaster, Web3Broadcaster } from "@injectivelabs/wallet-core";
import { EvmChainId } from "@injectivelabs/ts-types";
import { walletStrategy } from "./walletStrategy";
import {
  NETWORK,
  ENDPOINTS,
  ETHEREUM_CHAIN_ID,
  FEE_PAYER_PUB_KEY,
} from "./../constants/setup";

// Transaction broadcaster
export const msgBroadcaster = new MsgBroadcaster({
  walletStrategy,
  simulateTx: true,
  network: NETWORK,
  endpoints: ENDPOINTS,
  feePayerPubKey: FEE_PAYER_PUB_KEY,
  gasBufferCoefficient: 1.4,
});

export const web3Broadcaster = new Web3Broadcaster({
  walletStrategy,
  network: NETWORK,
  evmChainId: ETHEREUM_CHAIN_ID as unknown as EvmChainId,
});
