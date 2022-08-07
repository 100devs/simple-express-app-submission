"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MongoClient = require('mongodb').MongoClient;
const fs = require("fs");
const path = require("path");
const express = require("express");
const todos_1 = __importDefault(require("./src/server/routes/todos"));
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
const isTest = process.env.NODE_ENV === "test" || !!process.env.VITE_TEST_BUILD;
dotenv.config();
const app = express();
// !WARNING was getting an empty body while using bodyParser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
MongoClient.connect(process.env.DB_CONN_STRING, { useUnifiedTopology: true })
    .then((client) => {
    console.log('Connected to Database');
    const db = client.db(process.env.DB_NAME);
    const todo = db.collection(process.env.TODOS_COLLECTION_NAME);
    async function createServer(root = __dirname, isProd = process.env.NODE_ENV === "production") {
        const resolve = (p) => path.resolve(__dirname, p);
        //  app.use("/", routes);
        app.use("/", todos_1.default);
        // use this only in dev 
        if (!isProd)
            app.set('view engine', 'ejs');
        let isDistFolder = false;
        // Using fs.exists() method
        fs.exists('/dist', (exists) => {
            if (!exists)
                isDistFolder = true;
        });
        //not sure what "extended: false" is for
        const requestHandler = express.static(resolve(isDistFolder ? 'assets' : "public/assets"));
        /**
         * @type {import('vite').ViteDevServer}
         */
        let vite;
        if (!isProd) {
            app.use("/assets", requestHandler);
            vite = await require("vite").createServer({
                root,
                logLevel: isTest ? "error" : "info",
                server: {
                    middlewareMode: true,
                    addType: "custom",
                    watch: {
                        // During tests we edit the files too fast and sometimes chokidar
                        // misses change events, so enforce polling for consistency
                        usePolling: true,
                        interval: 100,
                    },
                },
            });
            // use vite's connect instance as middleware
            app.use(vite.middlewares);
        }
        else {
            app.use(require("compression")());
            app.use("/assets", requestHandler);
        }
        app.use("*", async (req, res, next) => {
            const url = req.originalUrl;
            // 1. Read index.html
            let template = fs.readFileSync(path.resolve(__dirname, "index.html"), "utf-8");
            try {
                // 2. Apply Vite HTML transforms. This injects the Vite HMR client, and
                //    also applies HTML transforms from Vite plugins, e.g. global preambles
                //    from @vitejs/plugin-react
                template = await vite.transformIndexHtml(url, template);
                // 3. Load the server entry. vite.ssrLoadModule automatically transforms
                //    your ESM source code to be usable in Node.js! There is no bundling
                //    required, and provides efficient invalidation similar to HMR.
                const { render } = await vite.ssrLoadModule(isProd ? "/src/entry-server.js" : "/src/Client/entry-server.tsx");
                // 4. render the app HTML. This assumes entry-server.js's exported `render`
                //    function calls appropriate framework SSR APIs,
                //    e.g. ReactDOMServer.renderToString()
                const appHtml = await render(url);
                // 5. Inject the app-rendered HTML into the template.
                const template = template.replace(`<!--ssr-outlet-->`, appHtml);
            }
            catch (e) {
                // If an error is caught, let Vite fix the stack trace so it maps back to
                // your actual source code.
                vite.ssrFixStacktrace(e);
                next(e);
            }
            // 6. Send the rendered HTML back.
            res.status(200).set({ "Content-Type": "text/html" }).end(template);
        });
        return { app, vite };
    }
    const checkPort = (port, app) => new Promise(resolve => {
        app
            .listen(port, "0.0.0.0", () => {
            console.log(`Start listening Express at http://localhost:${port}`);
        })
            .on("error", () => {
            console.log(`App already running at http://localhost:${port}`);
            resolve(false);
        });
    });
    /* create a server and verify if port is already use :
        catch error  EADDRINUSE and can let the app working instead
    */
    createServer().then(({ app: Express }) => {
        const port = process.env.PORT ? Number(process.env.PORT) : 7456;
        checkPort(Number(port), app);
    });
})
    .catch((error) => {
    console.error("Database connection failed", error);
    process.exit();
});
exports.default = app;
//# sourceMappingURL=server.js.map