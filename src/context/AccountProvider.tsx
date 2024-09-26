import { ReactNode, useCallback, useMemo, useState } from "react";
import AccountContext, { AccountState } from "./accountContext";
import { web3Client } from "../app/index";
import { useWallet } from "./walletContext";
import { injErc20Token, usdtToken } from "../app/data/tokens";

export const AccountProvider = ({ children }: { children: ReactNode }) => {
  const { address } = useWallet();
  const [denomBalanceMap, setDenomBalanceMap] = useState<
    Record<string, { balance: string; allowance: string }>
  >({});

  const tokens = useMemo(() => [usdtToken, injErc20Token], []);

  const fetchBalanceAndAllowance = useCallback(async () => {
    {
      for await (const token of tokens) {
        const { balance, allowance } =
          await web3Client.fetchTokenBalanceAndAllowance({
            address: address,
            contractAddress: token.denom.replace("peggy", ""),
          });

        setDenomBalanceMap((p) => ({
          ...p,
          [token.denom]: { balance, allowance },
        }));
      }
    }
  }, [address, tokens]);

  const value: AccountState = {
    denomBalanceMap,
    fetchBalanceAndAllowance,
  };

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
};
