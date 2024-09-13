import { ReactNode } from "react";
import PeggyContext, { PeggyState } from "./peggyContext";
import { Coin, TokenStatic } from "@injectivelabs/sdk-ts";
import { BigNumberInBase, BigNumberInWei } from "@injectivelabs/utils";
import { NETWORK, UNLIMITED_ALLOWANCE, ZERO_IN_WEI } from "../app/constants";
import { useWallet } from "./walletContext";
import { injErc20Token, injToken, usdtToken } from "../app/data/tokens";
import { fetchGasPrice } from "../app/ethGasPrice";
import { web3Composer } from "../app/web3composer";
import { web3Broadcaster } from "../app/wallet/walletService";
import { useAccount } from "./accountContext";
import { GeneralException } from "@injectivelabs/exceptions";

export const PeggyProvider = ({ children }: { children: ReactNode }) => {
  const { fetchBalanceAndAllowance, denomBalanceMap } = useAccount();
  const { isConnected, validate, address } = useWallet();
  const allowanceResetSymbols = ["USDT"];

  async function resetOrSetEthAllowance(token: TokenStatic, allowance: Coin) {
    // const bridgeStore = useBridgeStore();
    // const walletStore = useWalletStore();

    /** TODO: investigate if we need this */
    //   walletStore.$patch({
    //     queueStatus: StatusType.Idle,
    //   });

    /**
     * If the allowance is not 0 we first need to reset it to 0
     * and then set it again to the unlimited allowance
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     */
    if (
      new BigNumberInBase(allowance.amount).gte(0) &&
      allowanceResetSymbols.includes(token.symbol)
    ) {
      await peggySetTokenAllowance(token, ZERO_IN_WEI);
    }

    await peggySetTokenAllowance(token);
  }

  async function peggySetTokenAllowance(
    token: TokenStatic,
    amount = UNLIMITED_ALLOWANCE
  ) {
    // const walletStore = useWalletStore();
    // const accountStore = useAccountStore();

    if (!isConnected) {
      return;
    }

    await validate();

    const tokenAddress =
      token?.address === injToken.denom
        ? injErc20Token.address
        : token?.address;

    if (!tokenAddress) {
      return;
    }

    const gasPrice = await fetchGasPrice(NETWORK);

    const tx = await web3Composer.getSetTokenAllowanceTx({
      gasPrice,
      tokenAddress,
      address: address,
      amount: amount.toFixed(),
    });

    await web3Broadcaster.sendTransaction({
      tx,
      address: address,
    });

    await fetchBalanceAndAllowance();
  }

  async function peggyEthDeposit({ amount }: { amount: string }) {
    const sourceAddress = address;

    if (!isConnected || !sourceAddress) {
      return;
    }

    await validate();

    const ethDestinationAddress = address;

    const token = usdtToken;

    if (!token) {
      throw new GeneralException(new Error("Cannot find token"));
    }

    const actualAmount = new BigNumberInBase(amount).toWei(token.decimals);

    const gasPrice = await fetchGasPrice(NETWORK);

    const allowanceByDenom = denomBalanceMap[token.denom].allowance;

    const hasEnoughAllowance = new BigNumberInWei(actualAmount).lte(
      allowanceByDenom
    );

    if (!hasEnoughAllowance) {
      await resetOrSetEthAllowance(token, {
        amount: allowanceByDenom,
        denom: token.denom, // TODO check if we need to remove peggy
      });
    }

    const tx = await web3Composer.getPeggyTransferTx({
      gasPrice,
      address: address,
      denom: token.denom,
      amount: actualAmount.toFixed(),
      destinationAddress: ethDestinationAddress,
    });

    const txHash = await web3Broadcaster.sendTransaction({
      tx,
      address: address,
    });

    return txHash;
  }

  const value: PeggyState = {
    peggyEthDeposit,
  };

  return (
    <PeggyContext.Provider value={value}>{children}</PeggyContext.Provider>
  );
};
