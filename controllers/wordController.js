const Words = require('../models/wordModel')
module.exports = {
    getPage: async (req, res) => {
        try {
            const vocabWords = await Words.find().sort({'difficulty': -1, 'word': 1})
            res.render('wordViews.ejs', {words: vocabWords})
        } catch(err) {
            console.error(err)
        }
    },
    addWord: async (req, res) => {
        try {
            await Words.create({word: req.body.word, def: req.body.defintion, difficulty: 'easy'})
            console.log('word added')
            res.redirect('/word')
        } catch(err) {
            console.error(err)
        }
    },
    setHard: async (req, res) => {
        try {
            await Words.findOneAndUpdate({_id: req.body.change},{
                difficulty: 'hard'
            })
            console.log('set to hard')
            res.json('set to hard')
        } catch(err) { 
            console.error(err)
        }
    },
    setEasy: async (req, res) => {
        try {
            await Words.findOneAndUpdate({_id: req.body.change},{
                difficulty: 'easy'
            })
            console.log('set to easy')
            res.json('set to easy')
        } catch(err) { 
            console.error(err)
        }
    },
    removeOne: async (req, res) => {
        try {
        await Words.findOneAndDelete({_id: req.body.removal})
            console.log('removed')
            res.json('removed')
        } catch(err) { 
            console.error(err)
        }
    }
}