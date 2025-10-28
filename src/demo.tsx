import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Providers } from "./Providers.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers
      // wallet={{
      //   wallet: Wallet.Metamask,
      //   address: "0x2968698C6b9Ed6D44b667a0b1F312a3b5D94Ded7",
      //   injectiveAddress: "inj1995xnrrtnmtdgjmx0g937vf28dwefhkhy6gy5e",
      // }}
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
