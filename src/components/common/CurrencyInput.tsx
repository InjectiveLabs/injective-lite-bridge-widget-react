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
        htmlFor="id"
        className="border rounded-md px-4 py-6 border-gray-300 dark:border-[#42474E] block"
      >
        <div className="flex justify-between">
          <p className="text-sm flex-1 text-gray-500 dark:text-gray-500">
            Amount
          </p>
          <div className="flex items-center gap-2">
            <p className="text-xs font-medium text-[#4390FA]">
              Available: {availableAmount}
            </p>
            <button
              type="button"
              className="text-xs font-medium text-[#4390FA] bg-[#4390FA]/10 py-0.5 px-1.5 rounded font-light hover:bg-[#4390FA]/20 none"
              onClick={handleMax}
            >
              MAX
            </button>
          </div>
        </div>

        <div className="flex pt-1">
          <input
            ref={ref}
            type="string"
            step="any"
            id={id}
            className="flex-1 bg-transparent min-w-0 focus:outline-none  font-semibold text-xl"
            placeholder="0.00"
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

          <div className="p-1 flex justify-center items-center gap-2">
            <img
              src={token.logo}
              alt={token.name}
              className="size-6 bg-gray-300 dark:bg-gray-700 rounded-full"
            />
            <p className="text-xl font-semibold">{token.symbol}</p>
          </div>
        </div>
      </label>
    );
  }
);

export default CurrencyInput;
