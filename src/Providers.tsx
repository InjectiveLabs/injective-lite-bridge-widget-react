import { AccountProvider } from "./context/AccountProvider";
import { TokenProvider } from "./context/TokenProvider";
import { WalletProvider } from "./context/WalletProvider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <WalletProvider>
      <TokenProvider>
        <AccountProvider>{children}</AccountProvider>
      </TokenProvider>
    </WalletProvider>
  );
};
