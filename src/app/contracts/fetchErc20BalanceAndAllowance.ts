import { mainnet, sepolia } from "viem/chains";
import { http, erc20Abi, createPublicClient } from "viem";
import { NETWORK, IS_MAINNET } from "../constants";
import { getAlchemyUrl } from "./utils";
import type { ERC20BalanceAndAllowance } from "../../types";
import type { TokenStatic } from "@injectivelabs/sdk-ts";

export async function getErc20BalancesAndAllowances({
  address,
  spender,
  tokenList,
}: {
  address: string;
  spender: string;
  tokenList: TokenStatic[];
}) {
  const client = createPublicClient({
    chain: IS_MAINNET ? mainnet : sepolia,
    transport: http(getAlchemyUrl(NETWORK)),
  });

  const contracts = tokenList.flatMap((token) => [
    {
      address: token.address as `0x${string}`,
      abi: erc20Abi,
      functionName: "balanceOf",
      args: [address],
    },
    {
      address: token.address as `0x${string}`,
      abi: erc20Abi,
      functionName: "allowance",
      args: [address, spender],
    },
  ]);

  const results = await client.multicall({ contracts });

  const data: ERC20BalanceAndAllowance[] = [];

  for (let i = 0; i < tokenList.length; i++) {
    const token = tokenList[i];
    const balanceRes = results[i * 2 + 0];
    const allowanceRes = results[i * 2 + 1];

    if (!balanceRes) {
      data.push({
        address: token.address as string,
        balance: "0",
        allowance: "0",
        decimals: token.decimals || 18,
        symbol: token.symbol,
      });
      continue;
    }

    data.push({
      address: token.address as string,
      balance: String(balanceRes.result),
      allowance: String(allowanceRes.result),
      decimals: token.decimals || 18,
      symbol: token.symbol,
    });
  }

  return data;
}
