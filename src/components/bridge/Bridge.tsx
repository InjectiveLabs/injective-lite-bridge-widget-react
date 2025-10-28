import { useEffect, useState } from "react";
import BridgeForm from "./BridgeForm";
import { useAccount } from "../../context/accountContext";
import { useWallet } from "../../context/walletContext";
import Spinner from "../common/Spinner";
import { useEvent } from "../../context/eventContext";

const Bridge = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { fetchBalanceAndAllowance } = useAccount();
  const { address } = useWallet();
  const { onBalanceFetched } = useEvent();

  useEffect(() => {
    if (address) {
      setIsLoading(true);

      fetchBalanceAndAllowance()
        .then(() => {
          onBalanceFetched();
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [address, fetchBalanceAndAllowance]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-52">
        <Spinner />
      </div>
    );
  }

  return <BridgeForm />;
};

export default Bridge;
