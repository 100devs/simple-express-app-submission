const { response } = require('express');
const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
// const { modInfo, workOrder } = require('./model.js');
const PORT = 8000;


let workOrderDb,
    modMachInfoDB,
    dbConnectionStr = 'mongodb+srv://drader2:KodaDash1@cluster0.ugc78.mongodb.net/?retryWrites=true&w=majority';

MongoClient.connect(dbConnectionStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(client => {
        console.log('Connected To Database');
        workOrderDb = client.db('workOrders');
        modMachInfoDB = client.db('modMachInfo');
    })
    .catch(error => console.error(error));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    // res.sendFile(__dirname + '/index.html')
    workOrderDb.collection('request').find().toArray()
        .then(results => {
            modMachInfoDB.collection('mods').find().toArray()
                .then(data => {
                    res.render('index.ejs', { request: results, mods: data })
                })
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

app.put('/closeWorkOrder/:num', (req, res) => {
    workOrderDb.collection('request').updateOne({ workOrderNum: req.params.num }, {
        $set: {
            status: 'closed',
            resEmp: req.body.resEmp
        }
    }, {
        sort: { _id: -1 },
        upsert: true
    })
        .then(data => {
            res.json('success');
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
                mod: req.body.module,
                mach: req.body.machine,
                machNum: req.body.machNum,
                shop: req.body.shop,
                problemDetail: req.body.problemDetail,
                resEmp: 'unknown',
                // resEmpTitle: '',
                solutionDetail: '',
            })
                .then(result => {
                    res.redirect('/');
                })
        })
        .catch(error => console.error(error));
});

app.listen(PORT, (req, res) => {
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

