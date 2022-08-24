const mongoose= require('mongoose')
const todoTaskSchema= new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,       
    },
    date: {
        type: Date,
        default: Date.now
    },
    imageURL: {
        type: String,
        required:false,
    },

})
module.exports= mongoose.model('todoTask',todoTaskSchema,'tasks')
//last thing 'tasks' is saying exactly what collection we're connecting too, otherwise it would create a new collection for me andmake the schema name plural (todoTask=>todoTasks)
