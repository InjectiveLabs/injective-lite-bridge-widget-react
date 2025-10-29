import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Providers } from "./Providers.tsx";
import { Wallet } from "@injectivelabs/wallet-base";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers
      wallet={{
        wallet: Wallet.Phantom,
        address: "0xF22DccAcE9d0610334f32637100CAD2934528F81",
        injectiveAddress: "inj17gkuet8f6pssxd8nycm3qr9d9y699rupv6397z",
      }}
      onInit={() => {
        console.log("[onInit]");
      }}
      onSuccess={() => {
        console.log("[onSuccess]");
      }}
      onError={() => {
        console.log("[onError]");
      }}
      onBalanceFetched={() => {
        console.log("[onBalanceFetched]");
      }}
      mock={false}
    >
      <App />
    </Providers>
  </StrictMode>
);
