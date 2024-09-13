import { useWallet } from "../../context/walletContext";
import { formatWalletAddress } from "@injectivelabs/utils";
import Money from "../assets/Money";
import Spinner from "../common/Spinner";
import Button from "../ui/Button";
import CurrencyInput from "../common/CurrencyInput";
import { usdtToken } from "../../app/data/tokens";
import { useState } from "react";

const BridgeForm = () => {
  const { address } = useWallet();
  const [amount, setAmount] = useState<string>("");

  return (
    <div>
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
        available='100'
        amount={amount}
        setAmount={setAmount}
      />

      <div className='mt-2'>
        <p className='text-sm text-gray-500'>
          Address: {formatWalletAddress(address)}
        </p>
      </div>

      <div className='mt-8'>
        <Button>
          <Spinner
            isWhite
            size='sm'
          />
          <span>Confirm</span>
        </Button>
      </div>
    </div>
  );
};

export default BridgeForm;
