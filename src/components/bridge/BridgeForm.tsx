import { useWallet } from "../../context/walletContext";
import {
  BigNumberInBase,
  BigNumberInWei,
  formatWalletAddress,
} from "@injectivelabs/utils";
import { getAddress } from "viem";
import Spinner from "../common/Spinner";
import Button from "../ui/Button";
import CurrencyInput from "../common/CurrencyInput";
import { injErc20Token, usdtToken } from "../../app/data/tokens";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAccount } from "../../context/accountContext";
import { useState } from "react";
import { usePeggy } from "../../context/peggyContext";
import { useEvent } from "../../context/eventContext";
import { IS_TESTNET } from "../../app/constants";
import Copy from "../assets/Copy";
import Selector from "./Selector";

type FormData = {
  amount: string;
};

const BridgeForm = () => {
  const { address, wallet } = useWallet();
  const { denomBalanceMap, fetchBalanceAndAllowance } = useAccount();
  const { peggyEthDeposit } = usePeggy();
  const { mock, onSuccess } = useEvent();

  const [token] = useState(IS_TESTNET ? injErc20Token : usdtToken);

  const [isLoading, setIsLoading] = useState(false);

  const availableBalance = new BigNumberInWei(
    denomBalanceMap[getAddress(token.address)]?.balance || "0"
  ).toBase(token.decimals);

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({ mode: "onChange" });

  const onSubmit: SubmitHandler<FormData> = async ({ amount }) => {
    setIsLoading(true);

    if (mock) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onSuccess({
        wallet,
        amount,
      });
      setIsLoading(false);
      return;
    }

    peggyEthDeposit({ amount, token })
      .then(() => {
        onSuccess({
          wallet,
          amount,
        });

        fetchBalanceAndAllowance();

        setTimeout(() => {
          fetchBalanceAndAllowance();
        }, 3000);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <Selector />
      </div>

      <CurrencyInput
        denom={token.denom}
        available={availableBalance}
        setMax={(value) => setValue("amount", value)}
        {...register("amount", {
          required: "Amount is required",
          validate: (value) => {
            const parsedValue = new BigNumberInBase(value);

            if (parsedValue.isNaN()) {
              return "Amount must be a number";
            }

            if (parsedValue.gt(availableBalance)) {
              return `You can only transfer up to ${availableBalance} USDT`;
            }

            if (parsedValue.lt(0)) {
              return "Amount must be greater than 0";
            }

            // if (typeof parseFloat(value) !== "number") {
            //   return "Amount must be a number";
            // }

            return true;
          },
        })}
      />

      {errors.amount && (
        <p className="text-sm text-red-500 mt-2">{errors.amount.message}</p>
      )}

      <div className="mt-2 flex items-center justify-Start space-x-2">
        <p className="text-sm dark:text-white">
          Address: {formatWalletAddress(address)}
        </p>

        <span
          onClick={handleCopy}
          className="cursor-pointer hover:text-[#4390FA] *:size-4"
        >
          <Copy />
        </span>
      </div>

      <div className="mt-5">
        <Button type="submit">
          {isLoading ? <Spinner isWhite size="sm" /> : <span>Deposit</span>}
        </Button>
      </div>
    </form>
  );
};

export default BridgeForm;
