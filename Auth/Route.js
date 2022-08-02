const express = require("express")
const router = express.Router()
const { register, login } = require("./auth");
const {userAuth} = require("../middleware/auth");
router.route("/register").post(register)
router.route("/login").post(login);

module.exports = router;
