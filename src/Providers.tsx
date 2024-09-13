import { Wallet } from "@injectivelabs/wallet-ts";
import { AccountProvider } from "./context/AccountProvider";
import { PeggyProvider } from "./context/PeggyProvider";
import { TokenProvider } from "./context/TokenProvider";
import { WalletProvider } from "./context/WalletProvider";
import { EventProvider } from "./context/EventProvider";

type ProvidersProps = {
  children: React.ReactNode;
  wallet?: {
    wallet: Wallet;
    address: string;
    injectiveAddress: string;
  };
  onInit: (args: unknown) => void;
  onSuccess: (args: unknown) => void;
  onError: (args: unknown) => void;
  mock?: boolean;
};

export const Providers = ({
  children,
  wallet,
  onInit,
  onSuccess,
  onError,
  mock,
}: ProvidersProps) => {
  return (
    <EventProvider
      onInit={onInit}
      onError={onError}
      onSuccess={onSuccess}
      mock={mock}
    >
      <WalletProvider wallet={wallet}>
        <TokenProvider>
          <AccountProvider>
            <PeggyProvider>{children}</PeggyProvider>
          </AccountProvider>
        </TokenProvider>
      </WalletProvider>
    </EventProvider>
  );
};
