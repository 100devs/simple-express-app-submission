const mongoose = require("mongoose");

const IncomeSchema = new mongoose.Schema({
  source: {
    type: String,
    required: true,
  },
  amount: {
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
  // due: {
  //   type: Date,
  // },
  // fundsSource: {
  //   type: String,
  // },
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

IncomeSchema.virtual('daily')
  .get(function() {
    
    const amount = this.amount
    const num = this.frequency.num
    const unit = this.frequency.unit

    // Day
    if (unit === 'day') {
      return (amount / num).toFixed(2)
    // Week
    } else if (unit === 'week') {
      return ((amount / num) / 7).toFixed(2)
    // Month
    } else if (unit === 'month') {
      return ((amount / num) / 30.44).toFixed(2)
    // Year
    } else if (unit === 'year') {
      return (amount / (365 / num)).toFixed(2)
    }
})

IncomeSchema.virtual('weekly')
  .get(function() {
    
    const amount = this.amount
    const num = this.frequency.num
    const unit = this.frequency.unit

    // Day
    if (unit === 'day') {
      return ((7 / num) * amount).toFixed(2)
    // Week
    } else if (unit === 'week') {
      return (amount / num).toFixed(2)
    // Month
    } else if (unit === 'month') {
      return ((amount / num) / 4.35).toFixed(2)
    // Year
    } else if (unit === 'year') {
      return (amount / (52 / num)).toFixed(2)
    }
})

IncomeSchema.virtual('monthly')
  .get(function() {
    
    const amount = this.amount
    const num = this.frequency.num
    const unit = this.frequency.unit

    // Day
    if (unit === 'day') {
      return ((30.44 / num) * amount).toFixed(2)
    // Week
    } else if (unit === 'week') {
      return ((4.35 / num) * amount).toFixed(2)
    // Month
    } else if (unit === 'month') {
      return (amount / num).toFixed(2)
    // Year
    } else if (unit === 'year') {
      return ((amount / num) / 12).toFixed(2)
    }
})

IncomeSchema.virtual('yearly')
  .get(function() {
    
    const amount = this.amount
    const num = this.frequency.num
    const unit = this.frequency.unit

    // Day
    if (unit === 'day') {
      return ((365 / num) * amount).toFixed(2)
    // Week
    } else if (unit === 'week') {
      return ((52 / num) * amount).toFixed(2)
    // Month
    } else if (unit === 'month') {
      return ((12 / num) * amount).toFixed(2)
    // Year
    } else if (unit === 'year') {
      return (amount / num).toFixed(2)
    }
})

IncomeSchema.set('toJSON', { virtuals: true })
IncomeSchema.set('toObject', { virtuals: true })

module.exports = mongoose.model("Income", IncomeSchema);
