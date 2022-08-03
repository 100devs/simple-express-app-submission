const express = require('express'); 
const app = express(); 
const cors = require('cors');   
const { response } = require('express'); 
const mongoose = require('mongoose');
require('dotenv').config();   
const Recipe = require('./models/schema'); 
const { db } = require('./models/schema');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_STRING,
            {useNewUrlParser: true})
        console.log(`Connected to database: ${mongoose.connection.name}`);
    } catch(error) {
        console.log('Failed to connect to database', error)
    };
};

connectDB(); 

app.set('view engine', 'ejs'); 
app.use(cors());
app.use(express.static('public')); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

//homepage
app.get('/', async (request, response) => {
    try {
        const recipes = await Recipe.find({});
        response.render('index.ejs', { recipe: recipes}); 
    }
    catch (error) {
        response.status(500).send({message: error.message}) 
    };
});

//viewRecipe
app
    .route('/viewRecipe/:id')
    .get(async (request, response) => {
        try {
            const id = request.params.id;
            const recipes = await Recipe.findById(id);
            response.render('viewRecipe.ejs', { recipe: recipes});
        } catch {
            response.status(500).send({message: error.message}) 
        }
    })


//create a new recipe
app.post('/addRecipe', async (request, response) => {
    const recipe = new Recipe(
        {
            type: request.body.type.toLowerCase(),
            name: request.body.name,
            servings: request.body.servings,
            prepTime: request.body.prepTime,
            cookTime: request.body.cookTime,
            totalTime: request.body.totalTime,
            ingredients: request.body.ingredients.split(', '),
            directions: request.body.directions.split('. '),
            specialNotes: request.body.specialNotes
        }
    );
    try {
        await recipe.save();
        response.redirect('/'); 
    } catch (error) {
        response.status(500).send({message: error.message}); 
    };    
});

//edit or update recipe

app
    .route('/edit/:id')
    .get(async (request, response) => {
        try {
            const id = request.params.id;
            const recipes = await Recipe.findById(id);
            response.render('edit.ejs', { recipe: recipes});
        } catch (error){
            response.status(500).send({message: error.message}) 
        }
    })
    .post((request, response) => {
        const id = request.params.id;
        Recipe.findByIdAndUpdate(
            id,
            {
                type: request.body.type,
                name: request.body.name,
                servings: request.body.servings,
                prepTime: request.body.prepTime,
                cookTime: request.body.cookTime,
                totalTime: request.body.totalTime,
                ingredients: request.body.ingredients,
                directions: request.body.directions,
                specialNotes: request.body.specialNotes
            },
            error => {
                if (error) {
                    response.status(500).send({message: error.message}); 
                } else {
                    response.redirect('/edit/' + id);
                };
            }
        );
    });

//add a new ingredient
app.post('/addIngredient/:id', async (request, response) => {
    const id = request.params.id;
    const recipes = await Recipe.findById(id);
    recipes.ingredients.push(request.body.ingredients);
    try {
        await recipes.save();
        response.redirect('/edit/' + id);
    } catch (error) {
        response.status(500).send({message: error.message}) 
    }
})

//delete an ingredient from the recipe (located in the edit page), not working yet
app.delete('/deleteIngredient/:index'), (async (response, request) => {
    const id = request.paramas.id;
    const index = request.params.index
    const recipes = await Recipe.findOneAndRemove(index);
    recipes.ingredients.splice(index, 1);
    try {
        await recipes.save();
        response.redirect('/edit/' + id);
    } catch (error) {
        response.status(500).send({message: error.message}) 
    }
})

//deletes the recipe from homepage, want to refactor this to be a app.delete('/deleteRecipe/:id')
app
    .route('/delete/:id')
    .get((request, response) => {
        const id = request.params.id;
        Recipe.findByIdAndRemove(id, error => {
            if (error) {
                response.status(500).send({message: error.message});   
            } else {
                response.redirect('/'); 
            }
        });
    })

//client side delete recipe
app.delete('/deleteRecipe/:id', async (request, response) => {
    const id = request.params.id;
    const recipes = await Recipe.findById(id);
    try {
        await recipes.remove();
        response.redirect('/'); 
    } catch (error) {
        response.status(500).send({message: error.message}) 
    }
})

    
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`); 
});