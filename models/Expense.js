const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  expense: {
    type: String,
    required: true,
  },
  // image: {
  //   type: String,
  //   require: true,
  // },
  // cloudinaryId: {
  //   type: String,
  //   require: true,
  // },
  cost: {
    type: Number,
    required: true,
  },
  frequency: {
    num: {
      type: Number,
      default: 1,
    },
    unit: {
      type: String,
      default: 'month',
      enum: ['day', 'week', 'month', 'year']
    }
  },
  category: {
    type: String,
    default: ""
  },
  due: {
    type: Date,
  },
  fundsSource: {
    type: String,
  },
  notes: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  deleted: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

ExpenseSchema.virtual('daily')
  .get(function() {
    
    const cost = this.cost
    const num = this.frequency.num
    const unit = this.frequency.unit

    // Day
    if (unit === 'day') {
      return (cost / num).toFixed(2)
    // Week
    } else if (unit === 'week') {
      return ((cost / num) / 7).toFixed(2)
    // Month
    } else if (unit === 'month') {
      return ((cost / num) / 30.44).toFixed(2)
    // Year
    } else if (unit === 'year') {
      return (cost / (365 / num)).toFixed(2)
    }
})

ExpenseSchema.virtual('weekly')
  .get(function() {
    
    const cost = this.cost
    const num = this.frequency.num
    const unit = this.frequency.unit

    // Day
    if (unit === 'day') {
      return ((7 / num) * cost).toFixed(2)
    // Week
    } else if (unit === 'week') {
      return (cost / num).toFixed(2)
    // Month
    } else if (unit === 'month') {
      return ((cost / num) / 4.35).toFixed(2)
    // Year
    } else if (unit === 'year') {
      return (cost / (52 / num)).toFixed(2)
    }
})

ExpenseSchema.virtual('monthly')
  .get(function() {
    
    const cost = this.cost
    const num = this.frequency.num
    const unit = this.frequency.unit

    // Day
    if (unit === 'day') {
      return ((30.44 / num) * cost).toFixed(2)
    // Week
    } else if (unit === 'week') {
      return ((4.35 / num) * cost).toFixed(2)
    // Month
    } else if (unit === 'month') {
      return (cost / num).toFixed(2)
    // Year
    } else if (unit === 'year') {
      return ((cost / num) / 12).toFixed(2)
    }
})

ExpenseSchema.virtual('yearly')
  .get(function() {
    
    const cost = this.cost
    const num = this.frequency.num
    const unit = this.frequency.unit

    // Day
    if (unit === 'day') {
      return ((365 / num) * cost).toFixed(2)
    // Week
    } else if (unit === 'week') {
      return ((52 / num) * cost).toFixed(2)
    // Month
    } else if (unit === 'month') {
      return ((12 / num) * cost).toFixed(2)
    // Year
    } else if (unit === 'year') {
      return (cost / num).toFixed(2)
    }
})

ExpenseSchema.set('toJSON', { virtuals: true })
ExpenseSchema.set('toObject', { virtuals: true })

module.exports = mongoose.model("Expense", ExpenseSchema);
