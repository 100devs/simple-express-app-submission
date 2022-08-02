const express = require("express")
const router = express.Router()
const { addPet, getPets, petMetrics, getLoggedMetrics, deleteMetric  } = require("./auth");
const {userAuth} = require("../middleware/auth");

router.route("/addPet").post(userAuth, addPet); 
router.route("/getPets").get(userAuth, getPets);
router.route("/petMetrics").post(userAuth, petMetrics);
router.route("/getMetrics").get(userAuth, petMetrics);
router.route("/deleteMetric").post(userAuth, deleteMetric);
router.route("/getLoggedMetrics/:name").get(userAuth, getLoggedMetrics);
module.exports = router;