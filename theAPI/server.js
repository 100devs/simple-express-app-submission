const express = require('express')
const app = express()
const cors = require('cors')

const PORT = process.env.PORT || 8000

app.use(cors())

//obj layout: 
// 'name':'',
// 'skillLevel':'',
// 'inventor':'',
// 'yearCreated': '',
// 'description': '',
// 'image':'',
// 'sideNote': '',
// 'wikiLink': ''
const tricks = {
    'ollie': {
        'name':'Ollie',
        'skillLevel':'foundational, beginner',
        'inventor':'Alan "Ollie" Gelfand',
        'yearCreated': '1973',
        'description': 'The ollie is a skateboarding trick where the rider and board leap into the air without the use of the rider\'s hands. With the combination of stomping, also known as popping, the tail of the skateboard off the ground to get the board mostly vertical, jumping, and sliding the front foot forward to level out the skateboard at the peak of the jump.',
        'image':'https://tenor.com/P8tH.gif',
        'sideNote': 'also see Rodney Mullen for flat ollie',
        'wikiLink': 'https://en.wikipedia.org/wiki/Ollie_(skateboarding)'
    },
    'shuvit': {
        'name':'Shuvit',
        'skillLevel':'foundational, beginner',
        'inventor':'contested, see sideNote',
        'yearCreated': '1970\'s',
        'description': "A 'shuvit' involves rotating the skateboard in a 180-degree motion without flipping the board. It involves pushing (or 'popping') the tail while also shoving the board under the rider's feet. While the board rotates beneath the rider, he/she maintains the same position in the air. If performed with a larger rotation, the trick is named according to the extent of the rotation: a 360-, 540-degree, etc. shuvit.",
        'image':'https://tenor.com/bwkXm.gif',
        'sideNote': 'also see Ty Page and the Ty Hop, Alan Gelfand, Steve Rocco', 
        'wikiLink':'https://en.wikipedia.org/wiki/Shove-it'
    },
    'kickflip': {
        'name':'Kickflip',
        'skillLevel':'foundational, beginner',
        'inventor':'Curt Lindgren',
        'yearCreated': '1978',
        'description': 'The kickflip is a maneuver in skateboarding in which the rider flips their skateboard 360° along the axis that extends from the nose to the tail of the deck. When the rider is regular footed the board spins counter-clockwise if viewed from the side.',
        'image':'https://tenor.com/view/neo_kickflip-kickflip-skateboard-skateboarding-gif-21271872',
        'sideNote': 'also see Rodney Mullens',
        'wikiLink': 'https://en.wikipedia.org/wiki/Kickflip'
    },
    'heelflip': {
        'name':'Heelflip',
        'skillLevel':'foundational, beginner',
        'inventor':'Rodney Mullen',
        'yearCreated': '1982',
        'description': 'Similar to a kickflip, the heelflip is instead executed with the heel section flipping away from the skater this time. For a regular-footed skater (left foot in front) the board spins clockwise from the perspective of a view from behind the skater. Again, a kick formulates part of the ollie, but unlike the kickflip, the kick is directed forward and outwards, away from the rider\'s toe side (diagonal), so that the last part of the foot to leave the board is the heel—hence the name.',
        'image':'https://tenor.com/bzjCJ.gif',
        'sideNote': '',
        'wikiLink': 'https://en.wikipedia.org/wiki/Skateboarding_trick'
    },
    'varialflip': {
        'name':'Varial Flip',
        'skillLevel':'intermediate',
        'inventor':'Rodney Mullen',
        'yearCreated': '1982',
        'description': 'A varial kickflip (also known as a kickflip shuvit or 180 flip) is a kickflip combined with a backside-pop shuvit.[',
        'image':'https://tenor.com/bsu33.gif',
        'sideNote': 'Initially named: "Ollie Flip"',
        'wikiLink': 'https://en.wikipedia.org/wiki/Flip_trick#Varial_kickflip'
    },
    '5050grind': {
        'name':'50-50 Grind',
        'skillLevel':'foundational, beginner',
        'inventor':'unknown',
        'yearCreated': '1970\'s',
        'description': 'The 50-50 is a basic grind with both trucks on the rail. It can be done easily on the backside and the frontside.The 50-50 grind is where both trucks are on the edge. This move evolved from the horizontal-stance carve grind in pools and was taken up on top of the lip by such skaters as Jay Adams, Tony Alva and Stacy Peralta.',
        'image':'https://media.giphy.com/media/1hMgHopeyzmSmjh0LP/giphy.gif',
        'sideNote': '',
        'wikiLink': ''
    },
    'boardslide': {
        'name':'Board Slide',
        'skillLevel':'foundational, beginner',
        'inventor':'Alan Geflend',
        'yearCreated': '1976',
        'description': 'The board straddles the obstacle perpendicularly as the skateboarder slides along the center of the board. Most commonly when people refer to boardslides, it is a backside boardslide unless stated otherwise. The basic board slide also goes by many names, like: "back board," "bs board," "b-slide," and heavily depends on your vernacular.',
        'image':'https://tenor.com/bdVHk.gif',
        'sideNote': 'also see Peter Kiwi Gifford, Corey O\'Brien, John Lucero, Neil Blender',
        'wikiLink': ''
    },
    'empty': {
        'name':'',
        'skillLevel':'',
        'inventor':'',
        'yearCreated': '',
        'description': '',
        'image':'',
        'sideNote': '',
        'wikiLink': ''
    },
}

app.get('/', (requst, response) => {
    response.sendFile(__dirname + '/index.html')
})

app.get('/api/:trickName', (request, response) => {
    const trickName = request.params.trickName.toLowerCase()
    if(tricks[trickName]) {
        response.json(tricks[trickName])
    } else {
        //default answer for when nothing in the object
        response.json(tricks['empty'])
    }
})

app.get('/api', (request, response) => {
    response.json(tricks)
})

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
})
