import {
  isMainnet,
  isTestnet,
  isDevnet,
  Network,
  getNetworkEndpoints,
} from "@injectivelabs/networks";
import { EthereumChainId } from "@injectivelabs/ts-types";

export const NETWORK =
  (import.meta.env.VITE_NETWORK as Network) || Network.Testnet;

export const ETHEREUM_CHAIN_ID = parseInt(
  import.meta.env.VITE_ETHEREUM_CHAIN_ID || 1
);
export const CHAIN_ID = import.meta.env.VITE_CHAIN_ID || "injective-1";

export const IS_MAINNET = isMainnet(NETWORK);
export const IS_TESTNET = isTestnet(NETWORK);
export const IS_DEVNET = isDevnet(NETWORK);

export const ENDPOINTS = getNetworkEndpoints(NETWORK);

export const APP_NAME = "Injective Widget";
export const APP_BASE_URL = import.meta.env.VITE_BASE_URL || "";
export const WALLET_CONNECT_PROJECT_ID =
  import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || "";

export const ALCHEMY_KEY = (import.meta.env.VITE_ALCHEMY_KEY || "") as string;
export const COINGECKO_KEY = (import.meta.env.VITE_COINGECKO_KEY ||
  "") as string;
export const ALCHEMY_KOVAN_KEY = (import.meta.env.VITE_ALCHEMY_KOVAN_KEY ||
  "") as string;
export const ALCHEMY_GOERLI_KEY = (import.meta.env.VITE_ALCHEMY_GOERLI_KEY ||
  "") as string;
export const ALCHEMY_SEPOLIA_KEY = (import.meta.env.VITE_ALCHEMY_SEPOLIA_KEY ||
  "") as string;
export const SOL_ALCHEMY_KEY = (import.meta.env.VITE_SOL_ALCHEMY_KEY ||
  "") as string;

export const FEE_PAYER_PUB_KEY = import.meta.env.VITE_FEE_PAYER_PUB_KEY || "";

export const getRpcUrlsForChainIds = (): Record<EthereumChainId, string> => {
  return {
    [EthereumChainId.Ganache]: "http://localhost:8545",
    [EthereumChainId.HardHat]: "http://localhost:8545",
    [EthereumChainId.Goerli]: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_GOERLI_KEY}`,
    [EthereumChainId.Sepolia]: `https://eth-sepolia.alchemyapi.io/v2/${ALCHEMY_SEPOLIA_KEY}`,
    [EthereumChainId.Kovan]: `https://eth-kovan.alchemyapi.io/v2/${ALCHEMY_KOVAN_KEY}`,
    [EthereumChainId.Mainnet]: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_KEY}`,
    [EthereumChainId.Injective]: "",
    [EthereumChainId.Rinkeby]: "",
    [EthereumChainId.Ropsten]: "",
  };
};

export const alchemyRpcEndpoint =
  IS_TESTNET || IS_DEVNET
    ? `https://eth-sepolia.alchemyapi.io/v2/${ALCHEMY_SEPOLIA_KEY}`
    : `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_KEY}`;
