import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Providers } from "./Providers.tsx";
import { Wallet } from "@injectivelabs/wallet-ts";

declare global {
  interface Window {
    createWidget: (
      selector: string,
      wallet?: {
        wallet: Wallet;
        address: string;
        injectiveAddress: string;
      }
    ) => () => void;
  }
}

function createWidget(
  selector: string,
  wallet?: {
    wallet: Wallet;
    address: string;
    injectiveAddress: string;
  }
) {
  const root = createRoot(document.getElementById(selector)!);
  root.render(
    <StrictMode>
      <Providers wallet={wallet}>
        <App />
      </Providers>
    </StrictMode>
  );

  return root.unmount.bind(root);
}

if (typeof window !== "undefined") {
  window.createWidget = createWidget;
}
