import type { Config } from "tailwindcss";
import {
  scopedPreflightStyles,
  isolateInsideOfContainer,
} from "tailwindcss-scoped-preflight";

export default {
  darkMode: ["selector", '[data-mode="dark"]'],
  // darkMode: "class",

  content: ["./src/**/*.{js,ts,jsx,tsx}"],

  important: ".inj-app",

  blocklist: ["container"],

  theme: {
    extend: {},
  },

  plugins: [
    scopedPreflightStyles({
      isolationStrategy: isolateInsideOfContainer(".inj-app", {
        // except: ".no-twp", // optional, to exclude some elements under .twp from being preflighted, like external markup
        rootStyles: "add :where",
      }),
    }),
  ],
} satisfies Config;
