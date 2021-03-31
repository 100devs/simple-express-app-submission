const cors = require('cors')
const express = require('express')
const app = express()
const PORT = 8000

let hobbies = [
    {
        id: 00,
        hobby: 'none',
        relevantSearches: ['none'],
        hobbyType: ['none']
    },
    {
        id: 01,
        hobby: 'knitting',
        relevantSearches: ['How to cast on', 'How to make the knit stitch', 'How to make the purl stitch', 'What is a LYS?'],
        hobbyType: ['relaxing', 'craft']
    },
    {
        id: 02,
        hobby: 'skateboarding',
        relevantSearches: ['How to put the skateboard on a grass patch', 'Beginner skateboarding tips', 'Skateboard position', 'Skate shop near me'],
        hobbyType: ['athletic', 'cool']
    },
    {
        id: 03,
        hobby: 'pine needle basket weaving',
        relevantSearches: ['Where to find pine needles for basket weaving', 'How to make a pine needle basket', 'How to dye pine needles', 'How to make a pine needle coil'],
        hobbyType: ['relaxing', 'craft']
    },
    {
        id: 04,
        hobby: 'playing chess',
        relevantSearches: ['Chess playing apps', 'The basic rules of chess', 'Chess grand masters', 'Queen\'s Gambit'],
        hobbyType: ['academic', 'game']
    },
    {
        id: 05,
        hobby: 'archery',
        relevantSearches: ['Beginner archery tips', 'What is a recurve bow?', 'How to string a recurve bow', 'How to draw a recurve bow'],
        hobbyType: ['sport', 'athletic']
    },
    {
        id: 06,
        hobby: 'gardening',
        relevantSearches: ['Container gardening for beginners', 'The easiest vegetables to grow', 'Heirloom vegtable seeds', 'How to plant an herb garden'],
        hobbyType: ['outdoor', 'relaxing']
    },
    {
        id: 07,
        hobby: 'playing magic the gathering',
        relevantSearches: ['Magic the Gathering for beginners', 'Polyhedral dice', 'How to build a basic MTG deck', 'What is a commander in MTG?'],
        hobbyType: ['games', 'fun']
    },
    {
        id: 08,
        hobby: 'wood whittling',
        relevantSearches: ['How to carve a wood spoon with a pocketknife', 'Simple beginner wood whittling projects', 'Burnishing wood with stones', 'Whittling pocketknife'],
        hobbyType: ['craft', 'relaxing']
    },
    {
        id: 09,
        hobby: 'hiking',
        relevantSearches: ['Hiking spots near me', 'How to use AllTrails', 'Hiking tips and safety', 'Hiking boots and trail runners'],
        hobbyType: ['outdoor', 'relaxing', 'athletic']
    },
    {
        id: 10,
        hobby: 'Spinning yarn',
        relevantSearches: ['How to use a drop Spindle', 'Roving for handspinning', 'How to ply yarn', 'Types of spindles for spinning yarn'],
        hobbyType: ['craft', 'relaxing']
    }
]

app.use(cors())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/api/hobby/:id', (req, res) => {
    const id = Number(req.params.id)
    const hobby = hobbies.find(hobby => hobby.id === id)
     if (hobby){
         res.json(hobby)
     } else {
         res.json(hobbies[00])
     }
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

