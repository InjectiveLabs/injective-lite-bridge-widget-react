import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Providers } from "./Providers.tsx";
import { Wallet } from "@injectivelabs/wallet-base";

type WidgetProps = {
  wallet?: {
    wallet: Wallet;
    address: string;
    injectiveAddress: string;
  };
  onInit?: (...args: unknown[]) => unknown;
  onError?: (...args: unknown[]) => unknown;
  onSuccess?: (...args: unknown[]) => unknown;
  onBalanceFetched?: (...args: unknown[]) => unknown;
  mock?: boolean;
};

type CreateWidgetFn = (selector: string | Element, props: WidgetProps) => void;

declare global {
  interface Window {
    createWidget: CreateWidgetFn;
  }
}

const createWidget: CreateWidgetFn = (
  selector: string | Element,
  { onInit, onSuccess, onError, onBalanceFetched, wallet, mock }: WidgetProps
) => {
  const container =
    typeof selector === "string" ? document.getElementById(selector) : selector;

  if (!container) {
    throw new Error("createWidget: target element not found");
  }

  const root = createRoot(container);
  root.render(
    <StrictMode>
      <Providers
        wallet={wallet}
        mock={mock}
        onInit={onInit ?? (() => {})}
        onSuccess={onSuccess ?? (() => {})}
        onError={onError ?? (() => {})}
        onBalanceFetched={onBalanceFetched ?? (() => {})}
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
