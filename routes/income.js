const express = require("express");
const router = express.Router();
// const upload = require("../middleware/multer");
const incomeController = require("../controllers/income");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/add", ensureAuth, incomeController.getAddIncome)

router.post("/add", incomeController.createIncome);

router.get("/", incomeController.getIncomes);

router.get("/:id", ensureAuth, incomeController.getIncome);

router.get("/:id/edit", ensureAuth, incomeController.getEditIncome);

router.put("/:id", incomeController.editIncome);

router.put("/:id/deleteIncome/", incomeController.deleteIncome);

module.exports = router;
