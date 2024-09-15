import { forwardRef, useId } from "react";
import { useToken } from "../../context/tokenContext";
import { BigNumberInBase } from "@injectivelabs/utils";

type CurrencyInputProps = {
  denom: string;
  available: BigNumberInBase;
  setMax?: (max: string) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ denom, available, setMax, ...props }, ref) => {
    const { tokens } = useToken();
    const id = useId();
    const { onChange, ...restProps } = props;

    const token = tokens.find((token) => token.denom === denom);

    const availableAmount = available.toFixed(2);

    const handleMax = () => {
      if (setMax) {
        setMax(available.toFixed());
      }
    };

    if (!token) {
      return <></>;
    }

    return (
      <label
        htmlFor='id'
        className='border rounded-md p-2 border-gray-300 dark:border-gray-700 block'
      >
        <div className='flex justify-between mb-2 p-1'>
          <p className='text-xs flex-1 text-gray-500 dark:text-gray-500'>
            Amount
          </p>
          <div className='flex items-center gap-2'>
            <p className='text-xs text-blue-500'>
              Available: {availableAmount}
            </p>
            <button
              type='button'
              className='text-xs text-blue-500 bg-blue-500/10 px-1 rounded font-light hover:bg-blue-500/20 none'
              onClick={handleMax}
            >
              MAX
            </button>
          </div>
        </div>

        <div className='flex'>
          <input
            ref={ref}
            type='string'
            step='any'
            id={id}
            className='flex-1 bg-transparent min-w-0 focus:outline-none p-1'
            placeholder='0.00'
            onChange={(e) => {
              // const regex = /^(?!-?\.)(-?[0-9]*\.?[0-9]*)$/;   // Allow negative sign
              const regex = /^[0-9]+\.?[0-9]*$/;

              if (!regex.test(e.target.value)) {
                e.target.value = e.target.value.slice(0, -1);
              }

              onChange?.(e);
            }}
            {...restProps}
          />
          <div className='p-1 flex justify-center items-center gap-2'>
            <img
              src={token.logo}
              alt={token.name}
              className='size-6 border border-gray-300 dark:border-gray-700 bg-gray-300 dark:bg-gray-700 rounded-full p-0.5'
            />
            <p className='text-xl font-semibold'>{token.symbol}</p>
          </div>
        </div>
      </label>
    );
  }
);

export default CurrencyInput;
