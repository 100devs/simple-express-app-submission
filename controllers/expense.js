// const cloudinary = require("../middleware/cloudinary");
const Expense = require("../models/Expense");
const Income = require("../models/Income");

module.exports = {
  getBudget: async (req, res) => {
    try {
      const expenses = await Expense.find({ user: req.user.id, deleted: false })
      const incomes = await Income.find({ user: req.user.id, deleted: false })

      res.render("budget.ejs", { expenses: expenses, incomes: incomes, user: req.user });
      // console.log(expenses)
    } catch (err) {
      console.error(err);
    }
  },
  getExpense: async (req, res) => {
    try {
      const expense = await Expense.findById(req.params.id);
      console.log(expense)
      res.render("expenses/expense", { expense: expense, user: req.user });
    } catch (err) {
      console.error(err);
    }
  },
  getAddExpense: (req, res) => {
    res.render("expenses/add")
  },
  createExpense: async (req, res) => {
    try {
      // // Upload image to cloudinary
      // const result = await cloudinary.uploader.upload(req.file.path);
      const expense = await Expense.create({
        expense: req.body.expense,
        cost: req.body.cost,
        // frequency: req.body.frequency,
        frequency: {
          num: req.body.num,
          unit: req.body.unit,
        },
        category: req.body.category,
        due: req.body.due,
        fundsSource: req.body.fundsSource,
        notes: req.body.notes,
        user: req.user.id,
      });
      console.log(`Expense ${expense} created`);
      res.redirect("/budget");
    } catch (err) {
      console.error(err);
    }
  },
  getEditExpense: async (req, res) => {
    try {
      const expense = await Expense.findById(req.params.id);
      res.render("expenses/edit", { expense: expense, user: req.user });
    } catch (err) {
      console.error(err);
    }
  },
  editExpense: async (req, res) => {
    try {
      let expense = await Expense.findById(req.params.id).lean()

      if (!expense) {
          return res.render('error/404')
      }

      if (expense.user != req.user.id) {
          res.redirect('/')
      } else {
          expense = await Expense.findOneAndUpdate({
            _id: req.params.id},
            {
              expense: req.body.expense,
              cost: req.body.cost,
              // frequency: req.body.frequency,
              frequency: {
                num: req.body.num,
                unit: req.body.unit,
              },
              category: req.body.category,
              due: req.body.due,
              fundsSource: req.body.fundsSource,
              notes: req.body.notes,
              user: req.user.id,
            },
            {
              new: true,
              runValidators: true
            })
      res.redirect(`/expense/${req.params.id}`)
      }

  } catch (err) {
      console.error(err)
  }
  },
  deleteExpense: async (req, res) => {
    try {
      let expense = await Expense.findById(req.params.id);

      // ! Check if this works
      await Expense.findOneAndUpdate({ _id: req.params.id }, {deleted: true});
      console.log(`Deleted ${expense.expense}`);
      res.redirect("/budget");
    } catch (err) {
      console.error(err)
      res.redirect("/budget");
    }
  },
};
