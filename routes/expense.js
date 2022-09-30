const express = require("express");
const router = express.Router();
// const upload = require("../middleware/multer");
const expenseController = require("../controllers/expense");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/add", ensureAuth, expenseController.getAddExpense)

router.post("/add", expenseController.createExpense);

router.get("/:id", ensureAuth, expenseController.getExpense);

router.get("/:id/edit", ensureAuth, expenseController.getEditExpense);

router.put("/:id", expenseController.editExpense);

router.put("/:id/deleteExpense/", expenseController.deleteExpense);

module.exports = router;
