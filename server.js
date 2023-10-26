const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const url = require('url');
const querystring = require('querystring');
const MongoClient = require("mongodb").MongoClient;
const methodOverride = require('method-override');
const ObjectId = new require('mongodb').ObjectId;

const cors = require('cors');
const PORT = process.env.PORT || 2000;
require("dotenv").config();

let db,
  dbConnectionStr = process.env.DB_STRING,
  dbName = "recipes";

app.use(cors())

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }).then(
    (client) => {
      console.log(`Connected to ${dbName} Database`);
      db = client.db(dbName);
    }
);
  
//Middleware
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use(bodyParser.json())


//Method override
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    let method = req.body._method
    delete req.body._method
    return method
  }
}))


//http methods
app.get("/", (request, response) => {
    db.collection("recipes")
      .find()
      .sort({ recipeName: -1 })
      .toArray()
      .then((data) => {
        response.render("index", { info: data });
        console.log(request.body)
      })
      .catch((error) => console.error(error));
});
  
app.post("/addRecipe", (request, response) => {
    db.collection("recipes")
      .insertOne({
        recipeName: request.body.recipeName,
        ingredients: request.body.ingredients,
        instructions: request.body.instructions,
      })
      .then((result) => {
        console.log("Recipe Added");
        console.log(request);
        response.redirect("/");
      })
      .catch((error) => console.error(error));
  });
  app.get('/editRecipe/:id', (request, response) => {
    response.redirect("/")
   
});
  app.put('/editRecipe/:id', (request, response) => {
    //const recipeId = new ObjectId(request.params.id);
    db.collection("recipes")
        .updateOne(
          //fuck the _id, use the recipe name to find it jesus
          { recipeName: request.body.recipeName },
          {
            $set: {
              recipeName: request.body.recipeName,
              ingredients: request.body.ingredients,
              instructions: request.body.instructions,
            }
          },
        {
          sort: { _id: -1 },
          upsert: true,
        }
      )
      .then((result) => {
        response.redirect("/");
        console.log("Recipe Edit");
        //response.json("Recipe Edit");
        
        
      })
      .catch((error) => {
        console.error(error);
        //console.log(recipeId)
        

      });
  });
  
  app.delete("/deleteRecipe", (request, response) => {
    db.collection("recipes")
      .deleteOne({ 
        recipeName: request.body.recipeName,  
        ingredients: request.body.ingredients,
        instructions: request.body.instructions, })
      .then((result) => {
        console.log("Recipe Deleted");
        response.json("Recipe Deleted");
      })
      .catch((error) => console.error(error));
  });

app.listen(PORT, ()=>{
    console.log(`The server is running on port ${PORT}.`)
})