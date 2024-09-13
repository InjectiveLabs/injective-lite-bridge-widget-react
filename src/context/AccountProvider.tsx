import { ReactNode, useCallback, useState } from "react";
import AccountContext, { AccountState } from "./accountContext";
import { web3Client } from "../app/index";
import { useWallet } from "./walletContext";
import { usdtToken } from "../app/data/tokens";

export const AccountProvider = ({ children }: { children: ReactNode }) => {
  const { address } = useWallet();
  const [denomBalanceMap, setDenomBalanceMap] = useState<
    Record<string, { balance: string; allowance: string }>
  >({});

  const fetchBalanceAndAllowance = useCallback(async () => {
    {
      const { balance, allowance } =
        await web3Client.fetchTokenBalanceAndAllowance({
          address: address,
          contractAddress: usdtToken.denom.replace("peggy", ""),
        });

      setDenomBalanceMap((p) => ({
        ...p,
        [usdtToken.denom]: { balance, allowance },
      }));
    }
  }, [address]);

  const value: AccountState = {
    denomBalanceMap,
    fetchBalanceAndAllowance,
  };

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
};
