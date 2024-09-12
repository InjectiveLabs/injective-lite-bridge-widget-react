import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
  };

  if (command === "serve") {
    // Development configuration
    return {
      ...config,
    };
  } else {
    // Production configuration
    return {
      ...config,
      build: {
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
