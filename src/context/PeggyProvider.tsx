import { ReactNode } from "react";
import PeggyContext, { PeggyState } from "./peggyContext";
import { TokenStatic } from "@injectivelabs/sdk-ts";
import { BigNumberInBase, BigNumberInWei } from "@injectivelabs/utils";
import { useWallet } from "./walletContext";
import { web3Broadcaster } from "../app/wallet/walletService";
import { useAccount } from "./accountContext";
import { GeneralException } from "@injectivelabs/exceptions";
import { Address, getAddress, maxUint256 } from "viem";
import { erc20WethContract } from "../app/contracts/Erc20WethContract";
import { peggyContract } from "../app/contracts/PeggyContract";
import { injectivePeggyBridgeAddress } from "../app/data/web3";

export const PeggyProvider = ({ children }: { children: ReactNode }) => {
  const { denomBalanceMap } = useAccount();
  const { isConnected, validate, address } = useWallet();
  const allowanceResetSymbols = ["USDT"];

  async function setAllowance({
    amount = maxUint256,
    token,
  }: {
    amount?: bigint;
    token: TokenStatic;
  }) {
    const tx = await erc20WethContract.setTokenAllowance({
      amount,
      fromAddress: address as Address,
      tokenAddress: getAddress(token.address) as Address,
      spenderAddress: injectivePeggyBridgeAddress as Address,
    });

    const txHash = await web3Broadcaster.sendTransaction({
      tx,
      address: address,
    });

    return txHash;
  }

  async function peggyEthDeposit({
    amount,
    token,
  }: {
    amount: string;
    token: TokenStatic;
  }) {
    const sourceAddress = address;

    if (!isConnected || !sourceAddress) {
      return;
    }

    await validate();

    const ethDestinationAddress = address;

    if (!token) {
      throw new GeneralException(new Error("Cannot find token"));
    }

    const actualAmount = new BigNumberInBase(amount).toWei(token.decimals);

    const allowanceByDenom =
      denomBalanceMap[getAddress(token.address)].allowance;

    const hasEnoughAllowance = new BigNumberInWei(actualAmount).lte(
      allowanceByDenom
    );

    const isZeroAllowance = new BigNumberInBase(allowanceByDenom).isZero();

    if (
      !hasEnoughAllowance &&
      allowanceResetSymbols.includes(token.symbol) &&
      !isZeroAllowance
    ) {
      // We need to reset the allowance to 0 first for legacy tokens if we want to increase allowance
      await setAllowance({ amount: 0n, token });
    }

    if (!hasEnoughAllowance) {
      // set to unlimited allowance
      await setAllowance({ amount: maxUint256, token });
    }

    const tx = await peggyContract.sendToInjective({
      amount: actualAmount.toFixed(),
      fromAddress: address,
      tokenAddress: getAddress(token.address),
      destinationAddress: ethDestinationAddress,
    });

    const txHash = await web3Broadcaster.sendTransaction({
      tx,
      address,
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
