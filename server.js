const express = require('express');
const app = express();
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const WorkOrder = require('./models/workOrders');
const workOrders = require('./routes/workOrders')
const PORT = 8000;
require('dotenv').config();

let workOrderDb,
    modMachInfoDB,
    dbConnectionStr = 'mongodb+srv://drader2:KodaDash1@cluster0.ugc78.mongodb.net/workOrders?';

mongoose.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected To Database');
    })
    .catch(error => console.error(error));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
app.use('/submitWO', workOrders);

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/workOrders', (req, res) => {
    WorkOrder.find({}, (err, workOrders) => {
        if (err) res.send(err);

        res.json(workOrders);
    });
});

app.get('/getWoInfo/:num', (req, res) => {
    WorkOrder.find({ workOrderNum: req.params.num }, (err, workOrder) => {
        if (err) res.send(err);
        res.json(workOrder[0]);
    });
});

app.put('/respondToWorkOder/:num', (req, res) => {
    WorkOrder.updateOne({ workOrderNum: req.params.num }, {
        $set: {
            respondedTo: true,
            resEmp: req.body.resEmp,
            resEmpTitle: req.body.resEmpTitle,
            resDate: req.body.resDate,
            resTime: req.body.resTime
        }
    }, {
        sort: { _id: -1 },
        upsert: true
    }, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
        }
        res.json('')
    });
});

app.put('/closeWorkOrder/:num', (req, res) => {
    WorkOrder.updateOne({ workOrderNum: req.params.num }, {
        $set: {
            status: 'closed',
            solutionDetail: req.body.solDetail
        }
    }, {
        sort: { _id: -1 },
        upsert: true
    }, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
        }
        res.json('')
    });
});

app.post('/workOrders', (req, res) => {
    console.log(req.body);
    try {
        let workOrderNum;
        // let usedNums = results.map(workOrder => workOrder.workOrderNum)
        workOrderNum = setWONum();
        console.log(workOrderNum);
        const newWorkOrder = new WorkOrder({
            workOrderNum: workOrderNum,
            status: 'open',
            respondedTo: false,
            reqEmp: req.body.reqEmp,
            reqEmpTitle: req.body.reqEmpTitle,
            reqDate: req.body.reqDate,
            reqTime: req.body.reqTime,
            mod: req.body.mod,
            mach: req.body.mach,
            machNum: req.body.machNum,
            reqDept: req.body.reqDept,
            probDetail: req.body.probDetail,
            resEmp: '',
            resEmpTitle: '',
            resDate: '',
            resTime: '',
            solutionDetail: ''
        });
        newWorkOrder.save();
        res.json(workOrderNum);
    }
    catch (err) {
        console.log(err);
    }


    // workOrderDb.collection('request').find().toArray()
    //     .then(results => {
    //         let usedNums = results.map(workOrder => workOrder.workOrderNum)
    //         workOrderNum = setWONum();
    //     })
    //     .then(data => {
    //         workOrderDb.collection('request').insertOne({
    //             workOrderNum: workOrderNum,
    //             status: 'open',
    //             respondedTo: false,
    //             reqEmp: req.body.reqEmp,
    //             reqEmpTitle: req.body.reqEmpTitle,
    //             reqDate: req.body.reqDate,
    //             reqTime: req.body.reqTime,
    //             mod: req.body.mod,
    //             mach: req.body.mach,
    //             machNum: req.body.machNum,
    //             reqDept: req.body.reqDept,
    //             probDetail: req.body.probDetail,
    //             resEmp: '',
    //             resEmpTitle: '',
    //             resDate: '',
    //             resTime: '',
    //             solutionDetail: ''
    //         })
    //             .then(result => {
    //                 res.json(workOrderNum);
    //             })
    //     })
    // .catch (error => console.error(error));
});

app.delete('/deleteWorkOrder/:num', (req, res) => {
    WorkOrder.deleteOne({ workOrderNum: req.params.num }, (err, workOrders) => {
        if (err) res.send(err);

        res.json(workOrders);
    });
});

app.listen(process.env.PORT || PORT, (req, res) => {
    console.log(`Running server on port ${PORT}`);
});

function setWONum(usedNums) {
    let num = 0;
    // while (usedNums.includes(num) || num === 0) {
    num = Math.ceil(Math.random() * 999);
    num = ("0000" + num).slice(-6);
    // }
    return num;
}

