const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();

const FoodModel = require("./models/Food")

app.use(express.json());
app.use(cors())

mongoose.connect(
    "mongodb+srv://newUser:dY5H4vGEothVLd4R@crud.njaawme.mongodb.net/food?retryWrites=true&w=majority", 
    {
        useNewUrlParser: true,
    }
);

app.post('/insert', async (req, res) => {//insert stuff into database here
    const foodName = req.body.foodName
    const days = req.body.days
    const food = new FoodModel({foodName: foodName, daysSinceIAte: days})
    
    try{
        await food.save(); //database to save this information in the collection
        res.send("inserted data")
    }catch(err){
        console.log(err)
    }
})

app.get('/read', async (req, res) => {//have mongoose READ data from our database
    FoodModel.find({},(err, result)=> {//leaving empty object {} will grab EVERYTHING from the database.
        if (err) {
            res.send(err)
        }
        res.send(result)
    })      
})

app.put('/update', async (req, res) => {//insert stuff into database here
    const newFoodName = req.body.newFoodName
    const id = req.body.id;
    
    try{
        await FoodModel.findById(id, (err, updatedFood) =>{
            updatedFood.foodName = newFoodName
            updatedFood.save()
            res.send("update")
       })
    }catch(err){
        console.log(err)
    }
})

app.delete("/delete/:id", async (req,res)=> { //pass variable of id to the url
    const id = req.params.id
    await FoodModel.findByIdAndRemove(id).exec() //findByIdAndRemove is a mongoose method
    res.send('deleted')

})

app.listen(process.env.PORT || 3001, ()=>{
    console.log("Sever Running on Port 3001");
});