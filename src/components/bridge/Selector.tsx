import { usdtToken, wethToken } from "../../app/data/tokens";
import ChevronDown from "../assets/ChevronDown";

export default function Selector() {
  return (
    <div className="border rounded-md px-4 py-3 border-gray-300 dark:border-[#42474E] block flex items-center cursor-not-allowed">
      <div>
        <div className="relative">
          <img className="size-10" src={usdtToken.logo} alt={usdtToken.name} />
          <img
            className="size-3 absolute bottom-0 right-0"
            src={wethToken.logo}
            alt={wethToken.name}
          />
        </div>
      </div>

      <div className="pl-2 flex-1">
        <p className="font-semibold dark:text-white">USDT</p>
        <p className="text-xs text-gray-500">On Ethereum</p>
      </div>

      <div className="*:size-4">
        <ChevronDown />
      </div>
    </div>
  );
}
