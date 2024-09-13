import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Providers } from "./Providers.tsx";
import { Wallet } from "@injectivelabs/wallet-ts";

type WidgetProps = {
  wallet?: {
    wallet: Wallet;
    address: string;
    injectiveAddress: string;
  };
  onInit?: (...args: unknown[]) => unknown;
  onError?: (...args: unknown[]) => unknown;
  onSuccess?: (...args: unknown[]) => unknown;
  mock?: boolean;
};

type CreateWidgetFn = (selector: string, props: WidgetProps) => void;

declare global {
  interface Window {
    createWidget: CreateWidgetFn;
  }
}

const createWidget: CreateWidgetFn = (
  selector: string,
  { onInit, onSuccess, onError, wallet, mock }: WidgetProps
) => {
  const root = createRoot(document.getElementById(selector)!);
  root.render(
    <StrictMode>
      <Providers
        wallet={wallet}
        mock={mock}
        onInit={onInit ?? (() => {})}
        onSuccess={onSuccess ?? (() => {})}
        onError={onError ?? (() => {})}
      >
        <App />
      </Providers>
    </StrictMode>
  );

  return root.unmount.bind(root);
};

if (typeof window !== "undefined") {
  window.createWidget = createWidget;
}
