const router = require('express').Router()
const Recipe = require('../Models/recipeModel')
const User = require('../Models/userModel')
const {ObjectId} = require('mongoose').Types

//create new recipe

router.post('/', async (req, res) => {
    
    const {userId, userName, name, ingredients, instructions, pictures, category} = req.body

    try {
        const recipe = await Recipe.create({userId, userName, name, ingredients, instructions, pictures, category})
        const recipes = await Recipe.find()
        await recipe.save()
        const user = await User.findById(userId)
        await user.updateOne({$push: {recipes: recipe}})
        res.status(200).json(recipes)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

//get all recipes
router.get('/', async (req, res) => {

    try {
        const recipes = await Recipe.find()
        res.status(200).json(recipes)
    } catch (error) {
        res.status(400).send(error.message)
    }
    
})

//get one recipe
router.get('/:id', async (req, res) => {

    const{id} = req.params

    try {
        const recipe = await Recipe.findById(id)
        res.status(200).json(recipe)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

//get by category
router.get('/category/:category', async (req, res) => {
    const {category} = req.params

    try {
        let recipes
        if(category == "all"){
            recipes = await Recipe.find().sort((('date', -1)))
        }else{
            recipes = await Recipe.find({category})
        }
        res.status(200).json(recipes)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

//update a recipe
router.patch('/:id', async (req, res) => {
    const {id} = req.params
    const {userId, userName, name, ingredients, instructions, pictures, category} = req.body

    try {
        const recipe = await Recipe.findByIdAndUpdate(id, {userId, userName, name, ingredients, instructions, pictures, category})
        const recipes = await Recipe.find()
        // await recipe.save()
        // const user = await User.findById(userId)
        // await user.updateOne({$push: {recipes: recipe}})
        res.status(200).json(recipes)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

//delete recipe
router.delete('/:id', async (req, res) => {

    const {id} = req.params

    //try findbyidanddelete() again?
    //why aren't we getting the user object?
    //I don't know why I had to do objectId for the recipe to pull
    try {
        const recipe = await Recipe.findById(id)
        const user = await User.findById(recipe.userId)
        await user.updateOne({$pull: {recipes: ObjectId(recipe)}})
        await recipe.deleteOne()
        const recipes = await Recipe.find()
        res.status(200).json(recipes)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

//like a recipe
router.put('/:id/likes', async (req, res) => {
    const {id,} = req.params
    const {userId} = req.body
    try {
        const recipe = await Recipe.findById(id)
        if(!recipe.likes.includes(userId)){
            await recipe.updateOne({$push: {likes: userId}})
            res.status(200).json("post liked")
        }
        else{
            await recipe.updateOne({$pull: {likes: userId}})
            res.status(200).json("post unliked")
        }
    } catch (error) {
        res.status(400).send(error.message)
    }

})

//dislikes
router.put('/:id/dislikes', async (req, res) => {
    const {id,} = req.params
    const {userId} = req.body
    try {
        const recipe = await Recipe.findById(id)
        if(!recipe.dislikes.includes(userId)){
            await recipe.updateOne({$push: {dislikes: userId}})
            res.status(200).json("post disliked")
        }
        else{
            await recipe.updateOne({$pull: {dislikes: userId}})
            res.status(200).json("post un-disliked")
        }
    } catch (error) {
        res.status(400).send(error.message)
    }

})

//add comment
router.post('/:id/comments', async (req, res) => {
    const {id} = req.params
    const {comment, userId} = req.body

    try {
        const recipe = await Recipe.findById(id)
        const poster = await User.findById(userId)
        await recipe.updateOne({$push: {comments: {comment: comment, poster: poster.userName, userId: userId}}})
        res.status(200).json(comment)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

//get comments
router.get('/:id/comments', async (req, res) => {
    const {id} = req.params
    try {
        const recipe = await Recipe.findById(id)
        const comments = recipe.comments
        res.status(200).json(comments)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

//delete comments
router.put('/:id/comments/delete', async (req, res) => {
    const {id} = req.params
    const {comment} = req.body
    try {
        const recipe = await Recipe.findById(id)
        // const poster = await User.findById(userId)
        await recipe.updateOne({$pull: {comments: {_id: comment}}})
        res.status(200).json(comment)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router