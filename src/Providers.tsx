import { AccountProvider } from "./context/AccountProvider";
import { PeggyProvider } from "./context/PeggyProvider";
import { TokenProvider } from "./context/TokenProvider";
import { WalletProvider } from "./context/WalletProvider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <WalletProvider>
      <TokenProvider>
        <AccountProvider>
          <PeggyProvider>{children}</PeggyProvider>
        </AccountProvider>
      </TokenProvider>
    </WalletProvider>
  );
};
