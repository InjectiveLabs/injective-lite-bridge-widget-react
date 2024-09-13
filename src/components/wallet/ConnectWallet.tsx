import { useWallet } from "../../context/walletContext";
import InjectiveLogo from "../assets/InjectiveLogo";
import Metamask from "../assets/wallet/Metamask";
import { WalletItem } from "./WalletItem";

export const ConnectWallet = () => {
  const { connectMetamask } = useWallet();

  return (
    <div className='py-4'>
      <div className='flex justify-center'>
        <InjectiveLogo className='h-12  w-full' />
      </div>

      <h3 className='text-xl font-semibold my-4'>Connect Wallet</h3>

      <div className='border rounded-md dark:border-gray-700 p-2'>
        <WalletItem
          name='Metamask'
          logo={Metamask}
          connect={connectMetamask}
        />
      </div>
    </div>
  );
};
