const express = require('express');
const nodemon = require('nodemon');
const app = express();
const cors = require('cors');
const { response } = require('express');
const PORT = 8000;

app.use(express.static('./'))
app.use(cors())

let pokemon = {
    'Sprigatito': {
		'name': 'sprigatito',
		'image': './imgs/sprigatito.png',
		'category': 'grass cat',
		'type': 'grass',
		'height': '1 ft 4 in',
		'weight': '9 lbs.',
		'ability': 'overgrow',
		'dexEntry': 'Capricious and attention seeking, it may sulk if it sees its Trainer giving attention to a Pok&eacute;mon other than itself.'
	}, 
	'Fuecoco': {
		'name': 'fuecoco',
		'image': './imgs/fuecoco.png',
		'category': 'fire croc',
		'type': 'fire',
		'height': '1 ft 4 in',
		'weight': '21.6 lbs.',
		'ability': 'blaze',
		'dexEntry': 'Fuecoco is laid-back and does things at its own pace. It loves to eat, and it will sprint toward any food it finds with a glint in its eye.'
	},
	'Quaxly': {
		'name': 'quaxly',
		'image': './imgs/quaxly.png',
		'category': 'duckling',
		'type': 'water',
		'height': '1 ft 8 in',
		'weight': '13.4 lbs.', 
		'ability': 'torrent',
		'dexEntry': 'This serious-mannered Pok&eacute;mon will follow in its Trainer\'s wake. It\'s tidy, and it especially dislikes getting its head dirty.'	
	},
	'Pawmi': {
		'name': 'pawmi',
		'image': './imgs/pawmi.png',
		'category': 'mouse',
		'type': 'electric',
		'height': '1 ft',
		'weight': '5.5 lbs.', 
		'ability': 'static/natural, cure',
		'dexEntry': 'Pawmi is one of the Pok&eacute;mon used by Nemona, your friend.'
	},
	'Lechonk': {
		'name': 'lechonk',
		'image': './imgs/lechonk.png',
		'category': 'hog',
		'type': 'normal',
		'height': '1 ft 8 in',
		'weight': '22.5 lbs.',
		'ability': 'aroma veil, gluttony', 
		'dexEntry': 'Lechonk is one of the Pok&eacute;mon used by Nemona, your friend.'
	}, 
	'Smoliv': {
		'name': 'smoliv',
		'image': './imgs/smoliv.png',
		'category': 'olive',
		'type': 'grass/normal',
		'height': '1 ft',
		'weight': '14.3 lbs.',
		'ability': 'early bird', 
		'dexEntry': 'Smoliv is one of the Pok&eacute;mon used by Nemona, your friend.'
	},
    'unknown': {
        'name': 'unknown',
		'image': 'unknown',
		'category': 'unknown',
		'type': 'unknown',
		'height': 'unknown',
		'weight': 'unknown',
		'ability': 'unknown', 
		'dexEntry': 'unknown'
    }
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/api/pokemon', (req, res) => {
	response.json(pokemon)
})

app.get('/api/pokemon/:name', (req, res) => {
    const pokeName = req.params.name.toLowerCase()
    if (pokemon[pokeName]) {
        res.json(pokemon[pokeName])
    } else {
        res.json(pokemon['unknown'])
    }
})

app.post('/api/pokemon', (req, res) => {
	const body = req.body;
	let poke = {
		name: body.name
	}
	if(!body.name) {
		return res.status(400).json({
			error: 'Please enter a name.'
		});
	}

	if(pokemon.find(poke => poke.name === body.name)) {
		return res.status(400).json({
			error: 'You were close...please enter a unique name.'
		});
	}
	pokemon = pokemon.concat(poke);
	res.json(poke);
})

app.delete('/api/pokemon/:name', (req, res) => {
	pokeName = req.params.name.toLowerCase()
	pokemon = pokemon.filter(poke => poke.name !== pokeName)
	response.status(204).end()
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

