import dotenv from "dotenv";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import ViteRestart from "vite-plugin-restart";
import { ViteEjsPlugin } from "vite-plugin-ejs";
import viteCopyPlugin from "@col0ring/vite-plugin-copy";
import path from "path";

const resolve = (p: string) => path.resolve(__dirname, p);

dotenv.config();

const { HOST = "localhost", PROTOCOL = "http", PORT = 7356, MODE = "development", TYPE = "client" } = process.env;

/**
	We use this line to modify index.html with the ecs plugin.
	As we have a problem ( i have ^^' ) to get the i18n go the right way
	when using bad links url. Even if we have an error page, translation will be relative
	and not be accessible, so i use base url to fix it.
*/

const conf =
  TYPE === "client"
    ? []
    : [
        {
          server: {
            proxy: {
              "/api": {
                target: `${PROTOCOL}://${HOST}:${PORT}`,
                changeOrigin: true,
              },
            },
          },
        },
      ];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteRestart({
      reload: ["public/**/*"],
      restart: ["./server.ts", "./vite.config.ts"],
    }),
    ViteEjsPlugin({
      base: "/",
    }),
  ],
  build: {
    minify: false,
  },
  root: "",
  ...conf,
  //  addType: "custom",
});
