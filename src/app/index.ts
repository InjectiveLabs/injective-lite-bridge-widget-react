import { alchemyRpcEndpoint, NETWORK } from "./constants";
import { Web3Client } from "./web3Client";

export const web3Client = new Web3Client({
  network: NETWORK,
  rpc: alchemyRpcEndpoint,
});
