const express = require('express');
const bodyParser = require('body-parser');
const { delimiter } = require('ejs');
const app = express();
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
app.set('view engine', 'ejs')
// import ingredients from './ingredients.json' assert {type: 'json'}
//TODO: Move these into their own file
const ingredientsList = ["white rice","brown rice","black beans","pinto beans","chicken","beef","pork","steak","fish","barbacoa","tofu","seitan","onions","peppers","corn","broccoli","peas","carrots","avocado","zucchini","cheese","queso","pico de gallo","salsa","mild sauce","guacamole","fire sauce","sour cream","green beans"]

const cursedIngredients = ["ice cubes","nylon","diced plastic","bin juice","milk","a used sock","grated rubber","soap","Axe body spray","a whole lemon","mustard","super glue", "a sense of regret", "apple seeds","mold","tire sealant","scraps of denim","stained underwear","laxatives","lawn clippings","nicotine","Monster energy"]

const ingredients = {
    vegan: ["white rice","brown rice","black beans","pinto beans","tofu","seitan","onions","peppers","corn","broccoli","peas","carrots","avocado","zucchini","pico de gallo","salsa","mild sauce","guacamole","fire sauce","green beans"],
    dairy: ["sour cream","queso","cheese"],
    meat: ["chicken","beef","pork","steak","fish","barbacoa"],
    cursed: ["ice cubes","nylon","diced plastic","bin juice","caffeine","a used sock","grated rubber","soap","Axe body spray","a whole lemon","mustard","super glue", "a sense of regret", "apple seeds","mold","tire sealant","scraps of denim","stained underwear","laxatives","lawn clippings","nicotine","Monster energy"]
}

app.listen((process.env.PORT || 3000), () => {
    console.log(`listening on ${process.env.PORT}`)
})

MongoClient.connect(process.env.SERVER)
    .then(client => {
        console.log('Connected to database')
        const db = client.db('burrito-maker')
        const burritoesCollection = db.collection('burritoes')

        //Get all orders from the burrito DB. Convert to an array, then
        //send array to be rendered with 'index.ejs '
        app.get('/', (req, res) => {
            burritoesCollection.find().toArray()
                .then(burritoes => {
                    res.render('index.ejs', {burritoes: burritoes}) 
                })
                .catch(error => console.error(error))
        })
        //Displays most recent order (last element in the database)
        app.get('/order', (req, res) => {
            burritoesCollection.find().toArray()
                .then(results => {
                    res.render('order.ejs', {burrito: results[results.length-1]}) 
                })
                .catch(error => console.error(error))
        })

        //Makes a new burrito when a post request is received
        app.post('/burritoes', (req,res) => {
            let burrito = new Burrito(req.body)
            burritoesCollection.insertOne(burrito)
                .then(result => {
                    res.render('order',{burrito: burrito})
                })
                .catch(error => console.log(error))
        })

        //PUT request with order number => Find order in DB, use its data (cursed, numIngredients) to generate a new ingredients list, then update the order in the DB
        app.put('/burritoes', (req, res) => {
            const order = burritoesCollection.findOne({orderNum: req.body.orderNum})
            .then( data => {           
                console.log(data)
                    let newOne = new Burrito({
                        name: data.name,
                        cursed: data.cursed,
                        numIngredients: data.ingredients.length
                    })
                    burritoesCollection.findOneAndUpdate(
                    {orderNum: req.body.orderNum},
                    {$set: {ingredients: newOne.ingredients}},
                    { upsert: true}
                )
                    .then(result => {
                        return res.json('Updated!')
                    })
                    .catch(error => console.error(error))}
            )
          })
        
        app.delete('/burritoes', (req, res) => {
            burritoesCollection.deleteOne(
              { orderNum: req.body.orderNum }
            )
              .then(result => {
                  if (result.deletedCount === 0) {
                      return res.json('No order to delete')
                  }
                res.json(`Burrito deleted`)
              })
              .catch(error => console.error(error))
          })

          app.delete('/ingredient', (req, res) => {
            const order = burritoesCollection.findOne({orderNum: req.body.orderNum})
            .then( data => {
                //  console.log(data)
                //  //If it's on the cursed list, don't remove the ingredient.
                //  if (isCursed(req.body.ingredient)) {
                //     res.json('Cursed items cannot be removed.')
                //  }

                // let delIndex = data.ingredients.indexOf(req.body.ingredient)
                // console.log(`Del index: ${delIndex} for ${req.body.ingredient}`)
                // if (delIndex > -1) { 
                //     data.ingredients.splice(delIndex,1)
                // }
                //  console.log(data.ingredients)
                 //console.log(data)
                 //If it's on the cursed list, don't remove the ingredient.
                 let response = deleteIngredient(req.body.ingredient,data.ingredients)
                 if (response === 'cursed') {
                    res.json('Cursed items cannot be removed.')
                 } else {
                    console.log(data.ingredients)
                    // data.deleteIngredient(req.body.ingredient)
                    //TODO: also update numIngredients (or change everything to use ingredients.length instead)
                    //TODO: Check if it's a cursed ingredient, and if so, just display text on page: 'Cursed items cannot be removed'
                    burritoesCollection.findOneAndUpdate(
                        {orderNum: req.body.orderNum},
                        {$set: {ingredients: data.ingredients}},
                        { upsert: true}
                    )
                        .then(result => {
                            return res.json('success');
                        })
                        .catch(error => console.error(error))
                }
            })

          })
    })
    .catch(error => console.error(error))
    





class Burrito{
    //Holds all the information about a burrito
    constructor(data){
            this.name = data.name;
            this.generateOrderNumber();
            this.cursed = Boolean(data.cursed);
            this.checkLength(data.numIngredients);
            this.ingredients = this.randomIngredients(this.numIngredients)
    }
    //Generates a 9-digit order number. TODO: check for duplicates in db
    generateOrderNumber() {
        this.orderNum = String(Math.floor(10000000*Math.random()))
    }
    //Check if numIngredients is more than what's available. If so, set to max ingredients.
    checkLength(length) {
        this.maxLength = this.cursed ? (ingredientsList.length + cursedIngredients.length) : ingredientsList.length;
        length > this.maxLength ? this.numIngredients = this.maxLength : this.numIngredients = length
    }
    //Chooses ingredients randomly from list(s)
    randomIngredients(num) {
        let selection = []
        let picks = []
            //Make a copy of all possible ingredients
        this.cursed ? selection = [...ingredientsList,...cursedIngredients] : selection = [...ingredientsList]
        //Pick one random element. Push to 'picks', then remove from 'selection' to prevent duplicates.
        for (let i=0;i<num;i++) {
            let n=Math.floor(Math.random()*selection.length)
            picks.push(selection[n])
            selection.splice(n,1);
        }
        return picks;
    }
}


function asssembleIngredientChoices(vegan,dairy,cursed) {
    //TODO: have this method assemble list of valid ingredients. Add checkboxes for vegan/vegetarian on order form. Use array.concat(ingredients["vegan"],ingredients["cursed"]) etc
    let choices = [...ingredients['vegan']];
    if (cursed) {choices.push(...ingredients['cursed'])}
    if (dairy) {choices.push(...ingredients['dairy'])}
    if (!vegan) {choices.push(...ingredients['meat'])}
    //console.log(choices.length);
    return choices;
}
//Test cases for assembleIngredientChoices
// let testList = asssembleIngredientChoices(false,true, true);
// asssembleIngredientChoices(true,false,false);
// asssembleIngredientChoices(false,false,false);


function isCursed(ingredient) {
    return ingredients['cursed'].indexOf(ingredient) >= 0 //? 'true' : 'false';
}
//Test case for isCursed
// for (let i=12;i<25;i++) {
//     console.log(testList[i] + ' ' + isCursed(testList[i]))
// }

function removeCurse(ingredients) {
    const uncursed = ingredients.filter(ingredient => !isCursed(ingredient))
    return uncursed;
}
//Test case for removeCurse
// console.log(removeCurse(testList))

function deleteIngredient(ingredient,list) {
    //Delete one item from a list of ingredients
    //!This would work as a function in class Burrito if burritoes were staying in server memory, but since they're getting sent to a DB, functions aren't stored
    if (isCursed(ingredient)) {
        console.log('Cursed items cannot be removed');
        return 'cursed';
    } else {
        let delIndex = list.indexOf(ingredient);
        //console.log(` n = ${delIndex}`)
        if (delIndex > 0) {        
            list.splice(delIndex,1);
            return 'deleted';
        } else {
            return 'not found'
        }
        //console.log(`New list: ${list}`)
        //Splice modifies the original array, so no need to return. Should probably return a new array instead though
    }

}




//TEST CASES
// let newb = new Burrito({name: 'Alfredo', numIngredients: 11, cursed: 'true'})
// console.log(newb)

// for (let i=newb.ingredients.length;i>=0;i--) {
//     deleteIngredient(newb.ingredients[i],newb.ingredients)
// }
// console.log(newb.ingredients)
// console.log(removeCurse(newb.ingredients))
// newb.ingredients = removeCurse(newb.ingredients)
// console.log(newb.ingredients)