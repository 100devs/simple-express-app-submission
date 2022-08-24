// declare variables
const express = require('express')
const app = express()
const mongoose = require("mongoose")
require('dotenv').config({path:'.env'}) /*things to keep secret, make sure it is able to use those variables*/
const TodoTask =require('./models/todotask')
const PORT = 8500

//middleware, use server.js to render ejs
app.set('view engine', 'ejs')  
app.use(express.static('public')) /*store css files in public folder, express will look there, hey express if you're looking for style sheets look in the public folder */
app.use(express.urlencoded({extended:true})) /*help validate information we're passing back and forth, extended allow us to do send complex items */

mongoose.connect(process.env.DB_STRING, //telling mongoose where to look //needed .env!
     {useNewUrlParser: true},
     () => {console.log('Connected to db YAY!')}
    ) 

//GET METHOD
app.get('/', async(request,response) => {
    try {
        TodoTask.find({}, (err, tasks)=> { //await
            response.render('index.ejs', {
                todoTasks:tasks //todoTasks doesn't have to match database name, not key value pairs, just the object we're passing back to ejs that ejs can reference
            })
        })
    }
    catch (err){
        if (err) return res.status(500).send(err)
    }
})

//POST
app.post('/', async(request,response)=>{
    const todoTask=new TodoTask(
        {
            title:request.body.title,
            content: request.body.content,
            imageURL:request.body.imageURL 
        }
                                 )
    try {
        await todoTask.save()
        console.log(todoTask)
        response.redirect("/")
         }
         
    catch(err){
        if (err) return response.status(500).send(err)
        response.redirect('/')
    }

})

//EDIT or update Method
    //when i click that edit button, which is coded in the ejs file
app

    .route("/edit/:id") //extract that id out, what will we do it. On edit page, still want all the other tasks to still show
    .get((req,res)=> {
        const id=req.params.id //get the id from the route, 
        TodoTask.find({},(err,tasks)=>{ //find the list of tasks and the one i want to edit
            res.render('edit.ejs',{ //render the edit.ejs page
                todoTasks:tasks, //pass into ejs, the tasks and 
                idTask:id  //seperately the one we specifically want to edit
            })
        })
    })
    .post((req,res) =>{
        const id=req.params.id //get the id from the route, to get the specific id of what we're editing and updating
        TodoTask.findByIdAndUpdate(
            id,
            {
                title: req.body.title,
                content: req.body.content
            },
            err=>{
                if (err) return res.status(500).send(err)
                res.redirect('/')
            }
        )
    })
    //why post not put? want to use native built in functionality of forms, forms can't support put requests. Don't want to write client side javascript just for this one thing, can call it cheating if you want ;)

        //we're doing it as app.route .get, . post since we're chaining methods together. Also easier to visually see
//DELETE

app
    .route("/remove/:id")
    .get((req,res)=>{
       const id= req.params.id
       TodoTask.findByIdAndRemove(id, err=>{
          if (err) return res.status(500).send(err)
          res.redirect('/')
       })
    })
//we're avoiding writing client side js aka main.js, if we were doing client side we'd have to use fetches instead of these methods. We're avoiding fetches ;)


//PORT = 8000, set up server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})