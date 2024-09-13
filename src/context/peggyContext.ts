import { createContext, useContext } from "react";

interface PeggyProviderActions {
  peggyEthDeposit: ({
    amount,
  }: {
    amount: string;
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
