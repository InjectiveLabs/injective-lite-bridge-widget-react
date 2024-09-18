import { useWallet } from "../../context/walletContext";
import {
  BigNumberInBase,
  BigNumberInWei,
  formatWalletAddress,
} from "@injectivelabs/utils";
import Money from "../assets/Money";
import Spinner from "../common/Spinner";
import Button from "../ui/Button";
import CurrencyInput from "../common/CurrencyInput";
import { injErc20Token, injToken, usdtToken } from "../../app/data/tokens";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAccount } from "../../context/accountContext";
import { useState } from "react";
import { usePeggy } from "../../context/peggyContext";
import { useEvent } from "../../context/eventContext";
import { IS_TESTNET } from "../../app/constants";

type FormData = {
  amount: string;
};

const BridgeForm = () => {
  const { address } = useWallet();
  const { denomBalanceMap } = useAccount();
  const { peggyEthDeposit } = usePeggy();
  const { mock, onSuccess } = useEvent();

  const [token] = useState(IS_TESTNET ? injErc20Token : usdtToken);

  const [isLoading, setIsLoading] = useState(false);

  const availableBalance = new BigNumberInWei(
    denomBalanceMap[token.denom]?.balance || "0"
  ).toBase(token.decimals);

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
      onSuccess();
      setIsLoading(false);
      return;
    }

    peggyEthDeposit({ amount, token })
      .then(() => {
        alert("Deposit successful");
        onSuccess();
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
      <Money className='mx-auto mb-4' />

      <div className='text-center mb-8'>
        <h3 className='font-semibold text-xl'>Transfer USDT to Helix</h3>
        <p className='text-sm mt-4'>
          It looks like you have some USDT on Ethereum. You can transfer it to
          Helix with just one click!
        </p>
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
        <p className='text-sm text-red-500 mt-2'>{errors.amount.message}</p>
      )}

      <div className='mt-2'>
        <p className='text-sm text-gray-500'>
          Address: {formatWalletAddress(address)}
        </p>
      </div>

      <div className='mt-8'>
        <Button type='submit'>
          {isLoading ? (
            <Spinner
              isWhite
              size='sm'
            />
          ) : (
            <span>Confirm</span>
          )}
        </Button>
      </div>
    </form>
  );
};

export default BridgeForm;
