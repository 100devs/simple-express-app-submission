"use strict";
// import { Request, Response, Router } from "express";
import { Router } from "express";
import { hello, test, alpha, error } from "../../client/controllers/index.controller";
const router: Router = Router();

/**
 * List of API examples.
 * @route GET /api
 */

router.route("/api/hello").get(hello);

router.route("/api/test").get(test);

router.route("/api/alpha").get(alpha);

router.route("/api/*").get(error);

export default router;
