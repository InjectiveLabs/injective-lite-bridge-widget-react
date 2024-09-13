import { Wallet } from "@injectivelabs/wallet-ts";
import { AccountProvider } from "./context/AccountProvider";
import { PeggyProvider } from "./context/PeggyProvider";
import { TokenProvider } from "./context/TokenProvider";
import { WalletProvider } from "./context/WalletProvider";

type ProvidersProps = {
  children: React.ReactNode;
  wallet?: {
    wallet: Wallet;
    address: string;
    injectiveAddress: string;
  };
};

export const Providers = ({ children, wallet }: ProvidersProps) => {
  return (
    <WalletProvider wallet={wallet}>
      <TokenProvider>
        <AccountProvider>
          <PeggyProvider>{children}</PeggyProvider>
        </AccountProvider>
      </TokenProvider>
    </WalletProvider>
  );
};
