const router = require('express').Router()
const User = require('../Models/userModel')
const Recipe = require('../Models/recipeModel')

//signup

router.post('/signup', async (req, res) => {
    const {userName, email, password} = req.body
    try {
        const user = await User.create({userName, email, password})
        res.json(user)
    } catch (error) {
        if(error.code === 11000) return res.status(400).send('User already exists');
        res.status(400).send(error.message)
    }

})

//login
router.post('/login', async (req, res) => {
    const {userName, password} = req.body
    try {
        const user = await User.findByCredentials(userName, password)
        res.json(user)
    } catch (error) {
        res.status(400).send(error.message)
    }

})

//get all users

// router.get('/', async (req, res) => {
//     try {
//         const users = await User.find()
//         res.status(200).json(users)
//     } catch (error) {
//         res.status(400).send(error.message)
//     }
// })

//get a user
// router.get('/:id', async (req, res) => {
//     const {id} = req.params

router.get('/', async (req, res) => {
    const userId = req.query.userId
    const userName = req.query.userName

    try {
        const user = userId
      ? await User.findById(userId)
      : await User.findOne({ userName: userName });
        // const user = await User.findById(id)
        res.status(200).json(user)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

//get a user
router.get('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

//user recipes
router.get('/:id/recipes', async (req, res) => {
    const {id} = req.params

    try {
        const user = await User.findById(id).populate('recipes')
        res.json(user.recipes)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

//update profile ALWAYS ALWAYS ALWAYS find by ID
router.patch('/:id', async (req, res) => {
    const {id} = req.params
    const {description, picture} = req.body

    try {
        const user = await User.findByIdAndUpdate(id, {description, picture})
        // const user = await User.findOneAndUpdate(userName, {description, picture})
        res.status(200).json(user)
    } catch (error) {
        res.status(400).send(error.message)
    }
})



module.exports = router