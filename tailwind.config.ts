import {
  scopedPreflightStyles,
  isolateInsideOfContainer,
} from "tailwindcss-scoped-preflight";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  important: ".inj-app",

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
};
