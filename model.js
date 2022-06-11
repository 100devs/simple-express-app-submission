const mongoose = require('mongoose');
const modInfoSchema = new mongoose.Schema({
    mod: Number,
    sp: Number,
    bal: Number,
    liners: Number,
    cp: Number,
    ab: Number,
});

const workOrderSchema = new mongoose.Schema({
    module: Number,
    machine: Number,
    shop: Number,
    problem: String,
});

const modInfo = mongoose.model('modInfo', modInfoSchema);
const workOrder = mongoose.model('workOrder', workOrderSchema);

module.exports = {
    modInfo, workOrder
}