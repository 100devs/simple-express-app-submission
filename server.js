const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8000;


const funFacts = {
    'dogs': {
        'fun fact 1':'a dog\'s sense of smell is at least 40 times better than ours. they have upwards of 300 million olfactory receptors in their noses.',
        'fun fact 2':'Dogs can sniff while they breathe. Their noses are designed so air can move in and out at the same time, unlike us humans who have to either breathe in OR out only.'
    },

    'cats': {
        'fun fact 1':'We have 206 bones - cats on average have 244.',
        'fun fact 2':'A house cat is genetically 95.6% Tiger.'
    },

    'tattoos': {
        'fun fact 1':'During a tattoo session, our skin gets pricked anywhere between 50 to 3000 times each miinute.',
        'fun fact 2':'The first tattoo machine was created in 1891 and got its inspiration from Thomas Edison\'s electric pen.'
    },

    'planet': {
        'fun fact 1':'Earth is not a perfect sphere. As the National Oceanic and Atmospheric Administration (NOAA) points out, Earth spins while gravity pushes toward the center and a centrifugal force, perpendicular to Earth\'s axis, pushes out. This results in a bit of a tilted shape—not a perfect sphere.',
        'fun fact 2':'Earth is about 4.54 billion years old.'
    }
}

//app.use(express.static('js'))
//app.use(express.urlencoded({ extended: true})) 
//app.use(express.json())

app.use(cors())

//app.use(express.static(__dirname + '/js'));

app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html')
        })



app.get('/api/:subject', (req, res)=> {
    const subjects = req.params.subject.toLowerCase()   
        if (funFacts[subjects]) {
        res.json(funFacts[subjects])
        } else {
        res.json('Invalid Subject Choice')
        }
    //res.json(funFacts)
        })

  
app.listen(process.env.PORT || PORT, ()=>{
    console.log(`The server is running on port ${PORT}, you better go catch it!`)
    })
    
