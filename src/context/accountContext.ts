import { createContext, useContext } from "react";

interface AccountContextType {
  denomBalanceMap: Record<string, { balance: string; allowance: string }>;
}

interface AccountProviderActions {
  fetchBalanceAndAllowance: () => Promise<void>;
}

export type AccountState = AccountContextType & AccountProviderActions;

const AccountContext = createContext<AccountState | undefined>(undefined);

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccount must be used within an AccountProvider");
  }
  return context;
};

export default AccountContext;
