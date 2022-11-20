// const cloudinary = require("../middleware/cloudinary");
const Income = require("../models/Income");

module.exports = {
  getIncomes: async (req, res) => {
    try {
      const incomes = await Income.find({ user: req.user.id, deleted: false })

      res.render("income/incomes.ejs", { incomes: incomes, user: req.user });
    } catch (err) {
      console.error(err);
    }
  },
  getIncome: async (req, res) => {
    try {
      const income = await Income.findById(req.params.id);
      console.log(income)
      res.render("income/income", { income: income, user: req.user });
    } catch (err) {
      console.error(err);
    }
  },
  getAddIncome: (req, res) => {
    res.render("income/add")
  },
  createIncome: async (req, res) => {
    try {
      // // Upload image to cloudinary
      // const result = await cloudinary.uploader.upload(req.file.path);
      const income = await Income.create({
        source: req.body.source,
        amount: req.body.amount,
        // frequency: req.body.frequency,
        frequency: {
          num: req.body.num,
          unit: req.body.unit,
        },
        category: req.body.category,
        notes: req.body.notes,
        user: req.user.id,
      });
      console.log(`Income ${income} created`);
      res.redirect("/budget");
    } catch (err) {
      console.error(err);
    }
  },
  getEditIncome: async (req, res) => {
    try {
      const income = await Income.findById(req.params.id);
      res.render("income/edit", { income: income, user: req.user });
    } catch (err) {
      console.error(err);
    }
  },
  editIncome: async (req, res) => {
    try {
      let income = await Income.findById(req.params.id).lean()

      if (!income) {
          return res.render('error/404')
      }

      if (income.user != req.user.id) {
          res.redirect('/')
      } else {
          income = await Income.findOneAndUpdate({
            _id: req.params.id},
            {
              income: req.body.income,
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
      res.redirect(`/income/${req.params.id}`)
      }

  } catch (err) {
      console.error(err)
  }
  },
  deleteIncome: async (req, res) => {
    try {
      let income = await Income.findById(req.params.id);

      // ! Check if this works
      await Income.findOneAndUpdate({ _id: req.params.id }, {deleted: true});
      console.log(`Deleted ${income.income}`);
      res.redirect("/budget");
    } catch (err) {
      console.error(err)
      res.redirect("/budget");
    }
  },
};
