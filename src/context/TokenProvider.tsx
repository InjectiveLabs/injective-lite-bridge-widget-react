import { ReactNode, useState } from "react";
import TokenContext from "./tokenContext";
import { tokenPriceService } from "../app/service";

export const TokenProvider = ({ children }: { children: ReactNode }) => {
  const [tokenUsdPriceMap, setTokenUsdPriceMap] = useState<
    Record<string, number>
  >({});

  async function fetchTokenUsdPriceMap(coinGeckoIdList: string[]) {
    const priceMap = await tokenPriceService.fetchUsdTokensPrice(
      coinGeckoIdList
    );

    setTokenUsdPriceMap((p) => ({ ...p, ...priceMap }));
  }

  return (
    <TokenContext.Provider value={{ tokenUsdPriceMap, fetchTokenUsdPriceMap }}>
      {children}
    </TokenContext.Provider>
  );
};
