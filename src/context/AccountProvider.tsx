import { ReactNode, useCallback, useMemo, useState } from "react";
import AccountContext, { AccountState } from "./accountContext";
import { getAddress } from "viem";
import { useWallet } from "./walletContext";
import { injErc20Token, usdtToken } from "../app/data/tokens";
import { getErc20BalancesAndAllowances } from "../app/contracts/fetchErc20BalanceAndAllowance";
import { injectivePeggyBridgeAddress } from "../app/data/web3";

type BalanceAndAllowance = Record<
  string,
  { balance: string; allowance: string }
>;

export const AccountProvider = ({ children }: { children: ReactNode }) => {
  const { address } = useWallet();
  const [denomBalanceMap, setDenomBalanceMap] = useState<BalanceAndAllowance>(
    {}
  );

  const tokens = useMemo(() => [usdtToken, injErc20Token], []);

  const fetchBalanceAndAllowance = useCallback(async () => {
    const balancesAndAllowances = await getErc20BalancesAndAllowances({
      address: address,
      tokenList: tokens,
      spender: injectivePeggyBridgeAddress,
    });

    console.log({ balancesAndAllowances });

    const balanceAndAllowanceMap = balancesAndAllowances.reduce(
      (acc, token) => {
        acc[getAddress(token.address)] = {
          balance: token.balance,
          allowance: token.allowance,
        };
        return acc;
      },
      {} as BalanceAndAllowance
    );

    setDenomBalanceMap(balanceAndAllowanceMap);
  }, [address, tokens]);

  const value: AccountState = {
    denomBalanceMap,
    fetchBalanceAndAllowance,
  };

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
};
