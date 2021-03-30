const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8000

let db,
    dbConnectionStr = 'mongodb+srv://michaelizaguirre:tasklistdemo@cluster0.qapjw.mongodb.net/task-list?retryWrites=true&w=majority',
    dbName = 'task-list'

MongoClient.connect(dbConnectionStr, {
        useUnifiedTopology: true
    })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)

    })


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

app.get('/', (request, response) => {
    db.collection('tasks').find().toArray()
        .then(data => {
            response.render('index.ejs', {
                info: data
            })
        })
        .catch(error => console.error(error))
})


app.post('/addTask', (request, response) => {
    db.collection('tasks').insertOne(request.body)
        .then(result => {
            console.log('Task Added')
            response.redirect('/')
        })
        .catch(error => console.error(error))
})

app.delete('/deleteTask', (request, response) => {
    db.collection('tasks').deleteOne({
            taskName: request.body.taskNameS
        })
        .then(result => {
            console.log('Task Deleted')
            response.json('Task Deleted')
        })
        .catch(error => console.error(error))

})


app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`)
})