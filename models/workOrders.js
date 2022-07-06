const mongoose = require('mongoose');
const WorkOrderSchema = new mongoose.Schema({
    workOrderNum: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    respondedTo: {
        type: Boolean,
        required: true
    },
    reqEmp: {
        type: String,
        required: true
    },
    reqEmpTitle: {
        type: String,
        required: true
    },
    reqDate: {
        type: String,
        required: true
    },
    reqTime: {
        type: String,
        required: true
    },
    mod: {
        type: String,
        required: true
    },
    mach: {
        type: String,
        required: true
    },
    machNum: {
        type: String,
        required: true
    },
    reqDept: {
        type: String,
        required: true
    },
    probDetail: {
        type: String,
        required: true
    },
    resEmp: {
        type: String,
    },
    resEmpTitle: {
        type: String,
    },
    resDate: {
        type: String,
    },
    resTime: {
        type: String,
    },
    solutionDetail: {
        type: String,
    },
},
    {
        collection: 'request'
    }
);

// workOrderNum: workOrderNum,
// status: 'open',
// respondedTo: false,
// reqEmp: req.body.reqEmp,
// reqEmpTitle: req.body.reqEmpTitle,
// reqDate: req.body.reqDate,
// reqTime: req.body.reqTime,
// mod: req.body.mod,
// mach: req.body.mach,
// machNum: req.body.machNum,
// reqDept: req.body.reqDept,
// probDetail: req.body.probDetail,
// resEmp: '',
// resEmpTitle: '',
// resDate: '',
// resTime: '',
// solutionDetail: ''

const WorkOrder = mongoose.model('WorkOrders', WorkOrderSchema, 'request');

module.exports = WorkOrder;