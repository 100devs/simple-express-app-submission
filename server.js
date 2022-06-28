const express = require('express');
const app = express();
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient;
const PORT = 8000;
require('dotenv').config();

let workOrderDb,
    modMachInfoDB,
    dbConnectionStr = 'mongodb+srv://drader2:KodaDash1@cluster0.ugc78.mongodb.net/?';

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected To Database');
        workOrderDb = client.db('workOrders');
        // modMachInfoDB = client.db('modMachInfo');
    })
    .catch(error => console.error(error));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
    // res.sendFile(__dirname + '/index.html')
    workOrderDb.collection('request').find().toArray()
        .then(results => {
            res.render('index.ejs', { request: results })
        })
        .catch(error => console.error(error));
});

app.get('/getWoInfo/:num', (req, res) => {
    workOrderDb.collection('request').find().toArray()
        .then(data => {
            let woNumsArr = data.map(workOrder => workOrder.workOrderNum);
            woNumsArr.forEach((num, i) => {
                if (num === req.params.num) {
                    res.json(data[i]);
                }
            })
        })
        .catch(error => console.error(error));
});

app.get('/workOrders', (req, res) => {
    workOrderDb.collection('request').find().toArray()
        .then(data => {
            res.json(data);
        })
});

app.put('/respondToWorkOder/:num', (req, res) => {
    workOrderDb.collection('request').updateOne({ workOrderNum: req.params.num }, {
        $set: {
            respondedTo: true,
            resEmp: req.body.resEmp,
            resEmpTitle: req.body.resEmpTitle,
            resDate: req.body.resDate,
            resTime: req.body.resTime,
        }
    }, {
        sort: { _id: -1 },
        upsert: true
    })
        .then(data => {
            res.json('');
        })
        .catch(error => console.log(error));
});

app.put('/closeWorkOrder/:num', (req, res) => {
    workOrderDb.collection('request').updateOne({ workOrderNum: req.params.num }, {
        $set: {
            status: 'closed',
            solutionDetail: req.body.solDetail
        }
    }, {
        sort: { _id: -1 },
        upsert: true
    })
        .then(data => {
            res.json('');
        })
        .catch(error => console.log(error));
});

app.post('/workOrders', (req, res) => {
    let workOrderNum;

    workOrderDb.collection('request').find().toArray()
        .then(results => {
            let usedNums = results.map(workOrder => workOrder.workOrderNum)
            workOrderNum = setWONum(usedNums);
        })
        .then(data => {
            workOrderDb.collection('request').insertOne({
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
            })
                .then(result => {
                    res.json(workOrderNum);
                })
        })
        .catch(error => console.error(error));
});

app.delete('/deleteWorkOrder/:num', (req, res) => {
    workOrderDb.collection('request').deleteOne({ workOrderNum: req.params.num })
        .then(result => {
            res.json('');
        })
        .catch(error => console.error(error));
});

app.listen(process.env.PORT || PORT, (req, res) => {
    console.log(`Running server on port ${PORT}`);
});

function setWONum(usedNums) {
    let num = 0;
    while (usedNums.includes(num) || num === 0) {
        num = Math.ceil(Math.random() * 999);
        num = ("0000" + num).slice(-6);
    }
    return num;
}

