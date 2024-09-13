import { createContext, useContext } from "react";

interface TokenContextType {
  tokenUsdPriceMap: Record<string, number>;
}

interface TokenProviderActions {
  fetchTokenUsdPriceMap: (coinGeckoIdList: string[]) => Promise<void>;
}

export type TokenState = TokenContextType & TokenProviderActions;

const TokenContext = createContext<TokenState | undefined>(undefined);

export const useToken = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error("useToken must be used within a TokenProvider");
  }
  return context;
};

export default TokenContext;
