const express = require('express');
const { ObjectId } = require('mongodb');
const app =  express();
const MongoClient = require('mongodb').MongoClient;
const { v4: uuidv4 } = require('uuid');

const PORT = 1111;


// var ObjectID = require('mongodb').ObjectID;

require('dotenv').config();



let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'todoAPI'

MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.get('/', (request, response)=>{
    db.collection('actionLists').find().sort({listNumber: -1}).toArray()
    .then(data => {
        response.render('index.ejs', { listData: data })
    })
    .catch(error => console.error(error))
})

app.post('/getTask', (request, response) => {

    db.collection('actionLists').aggregate([
        {
            "$match": { "tasks.id": request.body.id}
        },
        {
            "$project": {
                tasks: {
                    "$filter": {
                        input: "$tasks",
                        as: "task",
                        cond: { $eq: ["$$task.id", request.body.id]}
                    }
                }
            }
        }
    ]).toArray()
    .then(data => {
        console.log(data[0]);
        response.json(data[0].tasks[0])
    })
})

app.post('/getListID', (request, response) => {
    db.collection('actionLists').aggregate([
        {
            "$match": { "tasks.id": request.body.id}
        },
        {
            "$project": {
                tasks: {
                    "$filter": {
                        input: "$tasks",
                        as: "task",
                        cond: { $eq: ["$$task.id", request.body.id]}
                    }
                }
            }
        }
    ]).toArray()
    .then(data => {
        console.log(`Current ListID: ${data[0]._id || 'NOT FOUND'} `);
        response.json(data[0]._id || data)
    })
})



app.put('/addTask', (request, response) => {
    db.collection('actionLists').updateOne({_id: ObjectId(request.body.id)},
                                            {
                                                $push: {
                                                    tasks: {
                                                        $each: [
                                                            {
                                                                id: uuidv4(),
                                                                taskName: request.body.taskName,
                                                                difficulty: request.body.difficulty,
                                                                notes: request.body.notes,
                                                                dueDate: request.body.dueDate,
                                                            }
                                                            ],
                                                        $position: 0
                                                    }
                                                }
                                            })
                                            .then(result => {
                                                console.log(`Added task: ${request.body.taskName} to List: ${request.body.id}`)
                                                response.json(`Added task: ${request.body.taskName} to List: ${request.body.id}`)
                                            })
                                            .catch(error => console.error(error))
    
})

app.post('/addList', (request, response) => {
    db.collection("actionLists").insertOne({
                                            tasks: [],
                                            name: ''
                                            })
                                            .then(result => {
                                                console.log('Added New List')
                                                response.redirect('/')
                                            })
                                            .catch(error => console.error(error))
})

app.delete('/deleteList', (request, response) => {
    db.collection('actionLists').deleteOne({_id: ObjectId(request.body.listID)})
    .then(result => {
        console.log('List deleted');
        response.json('List deleted')
    })
    .catch(error => console.error(error))
})

app.put('/deleteTask', (request, response) => {
    db.collection('actionLists').updateOne(
                                            {_id: ObjectId(request.body.listID)},
                                            {
                                                $pull: {
                                                    tasks: {
                                                        id: request.body.taskID
                                                    }
                                                }
                                            },
                                            false, //Upsert
                                            true //Multi
                                            )
                                            .then(result => {
                                                console.log(`Deleted task: ${request.body.taskID}`)
                                                response.json(`Task: ${request.body.taskID} from Table: ${request.body.tableID}`)
                                            })
                                            .catch(error => console.error(error))
})



app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})