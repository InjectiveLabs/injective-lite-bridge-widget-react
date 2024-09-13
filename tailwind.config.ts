import type { Config } from "tailwindcss";
import {
  scopedPreflightStyles,
  isolateInsideOfContainer,
} from "tailwindcss-scoped-preflight";

export default {
  darkMode: "class",

  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  important: ".inj-app",

  blocklist: ["container"],

  theme: {
    extend: {},
  },

  plugins: [
    scopedPreflightStyles({
      isolationStrategy: isolateInsideOfContainer(".inj-app", {
        // except: ".no-twp", // optional, to exclude some elements under .twp from being preflighted, like external markup
        rootStyles: "move to container",
      }),
    }),
  ],
} satisfies Config;
