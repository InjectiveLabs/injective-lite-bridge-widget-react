import { isMainnet, isTestnet, Network } from "@injectivelabs/networks";
import { NETWORK } from "../constants";

export const getInjectivePeggyBridgeAddress = (network: Network) => {
  if (isMainnet(network)) {
    return "0xF955C57f9EA9Dc8781965FEaE0b6A2acE2BAD6f3";
  }

  if (isTestnet(network)) {
    return "0x12e1181a741b70BE6A9D81f85af3E92B6ba41897";
  }

  return "0x430544ca09F7914077a0E8F405Da62292428F49D";
};

export const injectivePeggyBridgeAddress =
  getInjectivePeggyBridgeAddress(NETWORK);
