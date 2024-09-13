import { ReactNode, useState } from "react";
import AccountContext, { AccountState } from "./accountContext";

export const AccountProvider = ({ children }: { children: ReactNode }) => {
  const [denomBalanceMap, setDenomBalanceMap] = useState<
    Record<string, { balance: string; allowance: string }>
  >({});

  async function fetchBalanceAndAllowance() {
    setDenomBalanceMap((p) => ({ ...p }));
  }

  const value: AccountState = {
    denomBalanceMap,
    fetchBalanceAndAllowance,
  };

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
};
