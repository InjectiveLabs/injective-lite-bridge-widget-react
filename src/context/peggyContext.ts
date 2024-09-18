import { createContext, useContext } from "react";
import { TokenStatic } from "@injectivelabs/sdk-ts";

interface PeggyProviderActions {
  peggyEthDeposit: ({
    amount,
    token,
  }: {
    amount: string;
    token: TokenStatic;
  }) => Promise<string | undefined>;
}

export type PeggyState = PeggyProviderActions;

const PeggyContext = createContext<PeggyState | undefined>(undefined);

export const usePeggy = () => {
  const context = useContext(PeggyContext);
  if (!context) {
    throw new Error("usePeggy must be used within a PeggyProvider");
  }
  return context;
};

export default PeggyContext;
