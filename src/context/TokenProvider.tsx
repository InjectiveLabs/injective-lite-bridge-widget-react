import { ReactNode, useState } from "react";
import TokenContext from "./tokenContext";
import { tokenPriceService } from "../app/service";
import { TokenStatic } from "@injectivelabs/sdk-ts";
import { injErc20Token, injToken, usdtToken } from "../app/data/tokens";

export const TokenProvider = ({ children }: { children: ReactNode }) => {
  const [tokenUsdPriceMap, setTokenUsdPriceMap] = useState<
    Record<string, number>
  >({});
  const [tokens] = useState<TokenStatic[]>([
    injToken,
    injErc20Token,
    usdtToken,
  ]);

  async function fetchTokenUsdPriceMap(coinGeckoIdList: string[]) {
    const priceMap = await tokenPriceService.fetchUsdTokensPrice(
      coinGeckoIdList
    );

    setTokenUsdPriceMap((p) => ({ ...p, ...priceMap }));
  }

  return (
    <TokenContext.Provider
      value={{ tokenUsdPriceMap, fetchTokenUsdPriceMap, tokens }}
    >
      {children}
    </TokenContext.Provider>
  );
};
