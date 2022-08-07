"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const vite_1 = require("vite");
const plugin_react_1 = __importDefault(require("@vitejs/plugin-react"));
const vite_plugin_restart_1 = __importDefault(require("vite-plugin-restart"));
const vite_plugin_ejs_1 = require("vite-plugin-ejs");
const path_1 = __importDefault(require("path"));
const resolve = (p) => path_1.default.resolve(__dirname, p);
dotenv_1.default.config();
const { HOST = "localhost", PROTOCOL = "http", PORT = 7356, MODE = "development", TYPE = "client" } = process.env;
/**
    We use this line to modify index.html with the ecs plugin.
    As we have a problem ( i have ^^' ) to get the i18n go the right way
    when using bad links url. Even if we have an error page, translation will be relative
    and not be accessible, so i use base url to fix it.
*/
const conf = TYPE === "client"
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
exports.default = (0, vite_1.defineConfig)({
    plugins: [
        (0, plugin_react_1.default)(),
        (0, vite_plugin_restart_1.default)({
            reload: ["public/**/*"],
            restart: ["./server.ts", "./vite.config.ts"],
        }),
        (0, vite_plugin_ejs_1.ViteEjsPlugin)({
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
//# sourceMappingURL=vite.config.js.map