"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.alpha = exports.test = exports.hello = void 0;
const hello = (req, res) => {
    res.send("Hello World from api!");
};
exports.hello = hello;
const test = (req, res) => {
    res.send("Tests is the dev's best friend!");
};
exports.test = test;
const alpha = (req, res) => {
    res.send("abcdefghijklmnopqrstuvwxyz!");
};
exports.alpha = alpha;
const error = (req, res) => {
    res.send("Oops, something goes wrong!");
};
exports.error = error;
//# sourceMappingURL=index.controller.js.map