// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tsconfigPaths from "vite-tsconfig-paths";
// import checker from "vite-plugin-checker";
// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),
//     tsconfigPaths(),
//     checker({
//       typescript: true,
//     }),
//   ],
//   resolve: {
//     alias: [{ find: "~", replacement: "/src" }],
//   },
// });

// import { defineConfig, loadEnv } from "vite";
// import react from "@vitejs/plugin-react";
// import viteTsconfigPaths from "vite-tsconfig-paths";
// import path from "path";
// import svgr from "vite-plugin-svgr";
// // https://vitejs.dev/config/
// export default defineConfig(({ mode }) => {
//   const env = loadEnv(mode, process.cwd());

//   return {
//     plugins: [react(), svgr(), viteTsconfigPaths()],
//     define: {
//       "process.env": process.env,
//     },
//     resolve: {
//       alias: [
//         {
//           find: "src",
//           replacement: path.resolve(__dirname, "./src"),
//         },
//       ],
//     },
//     server: {
//       host: "localhost",
//       open: true,
//       port: parseInt(env.VITE_REACT_PORT, 10),
//       proxy: {
//         "/api": {
//           target: env.VITE_REACT_APP_URL,
//           secure: false,
//           changeOrigin: true,
//         },
//       },
//     },
//     esbuild: {
//       drop: mode !== "development" ? ["console", "debugger"] : [],
//     },
//   };
// });

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import path from "path";
import svgr from "vite-plugin-svgr";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react(), svgr(), viteTsconfigPaths()],
    define: {
      "process.env": {
        ...process.env,
        VITE_REACT_PORT: env.VITE_REACT_PORT,
        VITE_REACT_APP_URL: env.VITE_REACT_APP_URL,
        VITE_REACT_APP_API_VERSION: env.VITE_REACT_APP_API_VERSION,
      },
    },
    resolve: {
      alias: [
        {
          find: "src",
          replacement: path.resolve(__dirname, "./src"),
        },
      ],
    },
    server: {
      host: "localhost",
      open: true,
      port: parseInt(env.VITE_REACT_PORT, 10) || 3000,
      proxy: {
        "/api": {
          target: env.VITE_REACT_APP_URL,
          secure: false,
          changeOrigin: true,
        },
      },
    },
    esbuild: {
      drop: mode !== "development" ? ["console", "debugger"] : [],
    },
  };
});
