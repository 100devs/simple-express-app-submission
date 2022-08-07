"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { Request, Response, Router } from "express";
const express_1 = require("express");
const index_controller_1 = require("../../client/controllers/index.controller");
const router = (0, express_1.Router)();
/**
 * List of API examples.
 * @route GET /api
 */
router.route("/api/hello").get(index_controller_1.hello);
router.route("/api/test").get(index_controller_1.test);
router.route("/api/alpha").get(index_controller_1.alpha);
router.route("/api/*").get(index_controller_1.error);
exports.default = router;
//# sourceMappingURL=api.js.map