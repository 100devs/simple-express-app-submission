const express = require('express');
const app = express();
const PORT = 8000;
const cors = require('cors');

app.use(cors());

const birds = {
    'list': {
        'possible bird names': ['burrowing owl', 'american coot', 'white-winged dove', 'northern mocking bird', 'anna\'s hummingbird', 'common black hawk'],
    },
    'burrowing owl': {
        'latin name': 'Athene cunicularia',
        'family': 'Owls',
        'habitat': ['open grassland', 'prairie', 'farmland', 'airfields'],
        'size': {
            'lengthInches': 9,
            'widthInches': 24
        } 
    },
    'american coot': {
        'latin name': 'Fulica americana​',
        'family': 'Rails, Gallinules, Coots',
        'habitat': ['ponds', 'lakes', 'marshes', 'fields', 'park ponds', 'salt bays'],
        'size': {
            'lengthInches': 16,
            'widthInches': 26
        } 
    },
    'white-winged dove': {
        'latin name': 'Zenaida asiatica',
        'family': 'Pigeons and Doves',
        'habitat': ['river woods', 'mesquites', 'saguaros', 'groves', 'towns'],
        'size': {
            'lengthInches': 12,
            'widthInches': 20
        } 
    },
    'northern mocking bird': {
        'latin name': 'Mimus polyglottos',
        'family': 'Mockingbirds and Thrashers',
        'habitat': ['brushy areas', 'thickets', 'roadsides', 'farms', 'towns'],
        'size': {
            'lengthInches': 1,
            'widthInches': 14
        } 
    },
    'anna\'s hummingbird': {
        'latin name': 'Calypte anna',
        'family': 'Hummingbirds',
        'habitat': ['gardens', 'chaparral', 'open woods'],
        'size': {
            'lengthInches': 4,
            'widthInches': 5
        } 
    },
    'common black hawk': {
        'latin name': 'Buteogallus anthracinus',
        'family': 'Hawks and Eagles',
        'habitat': ['wooded streams'],
        'size': {
            'lengthInches': 21,
            'widthInches': 48
        } 
    },
}

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html')
});

app.get('/api/:bird', (request, response) => {
    const birdName = request.params.bird.toLowerCase()
    if (birds[birdName]) {
        response.json(birds[birdName]);
    } else {
        response.json(birds.list);
    }
});

app.get('/api', (request, response) => {
    response.json(birds.list);
});

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}.`);
});
