import { useWallet } from "../../context/walletContext";
import { BigNumberInWei, formatWalletAddress } from "@injectivelabs/utils";
import Money from "../assets/Money";
import Spinner from "../common/Spinner";
import Button from "../ui/Button";
import CurrencyInput from "../common/CurrencyInput";
import { usdtToken } from "../../app/data/tokens";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAccount } from "../../context/accountContext";
import { useState } from "react";
import { usePeggy } from "../../context/peggyContext";
import { useEvent } from "../../context/eventContext";

type FormData = {
  amount: string;
};

const BridgeForm = () => {
  const { address } = useWallet();
  const { denomBalanceMap } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const { peggyEthDeposit } = usePeggy();
  const { mock, onSuccess } = useEvent();

  const availableUSDT = new BigNumberInWei(
    denomBalanceMap[usdtToken.denom]?.balance || "0"
  )
    .toBase(usdtToken.decimals)
    .toFixed(4);

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

    peggyEthDeposit({ amount })
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
        denom={usdtToken.denom}
        available={availableUSDT}
        setMax={(value) => setValue("amount", value)}
        {...register("amount", {
          required: "Amount is required",
          validate: (value) => {
            if (Number(value) > Number(availableUSDT)) {
              return `You can only transfer up to ${availableUSDT} USDT`;
            }

            if (Number(value) < 0) {
              return "Amount must be greater than 0";
            }

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
