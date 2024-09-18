import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { nodePolyfills } from "@bangjelkoski/vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const config = {
    plugins: [react(), nodePolyfills({ protocolImports: true })],
  };

  if (command === "serve") {
    // Development configuration
    return {
      ...config,
    };
  } else {
    // Production configuration

    const isTestnet = mode === "testnet";

    const outDir = isTestnet ? "dist/testnet" : "dist/mainnet";

    return {
      ...config,
      build: {
        outDir: outDir,
        lib: {
          entry: "./src/main.tsx",
          name: "InjectiveLiteBridge",
          fileName: (format) => `index.${format}.js`,
          formats: ["umd", "es"],
        },
        rollupOptions: {
          external: [], //["react", "react-dom"]
          output: {
            globals: {
              react: "React",
              "react-dom": "ReactDOM",
            },
          },
        },
      },
    };
  }
});
