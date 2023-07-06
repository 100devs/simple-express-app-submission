const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 8000;

app.use(cors());

const teams = {
    'ireland': {
        'country': 'Ireland',
        'pool': 'Pool B'
    },
    'england': {
        'country': 'England',
        'pool': 'Pool D'
    },
    'scotland': {
        'country': 'Scotland',
        'pool': 'Pool B'
    },
    'wales': {
        'country': 'Wales',
        'pool': 'Pool C'
    },
    'france': {
        'country': 'France',
        'pool': 'Pool A'
    },
    'italy': {
        'country': 'Italy',
        'pool': 'Pool A'
    },
    'south africa': {
        'country': 'South Africa',
        'pool': 'Pool B'
    },
    'new zealand': {
        'country': 'New Zealand',
        'pool': 'Pool A'
    },
    'australia': {
        'country': 'Australia',
        'pool': 'Pool C'
    },
    'argentina': {
        'country': 'Argentina',
        'pool': 'Pool D'
    },
    'japan': {
        'country': 'Japan',
        'pool': 'Pool D'
    },
    'tonga': {
        'country': 'Tonga',
        'pool': 'Pool B'
    },
    'samoa': {
        'country': 'Samoa',
        'pool': 'Pool D'
    },
    'namibia': {
        'country': 'Namibia',
        'pool': 'Pool A'
    },
    'romania': {
        'country': 'Romania',
        'pool': 'Pool B'
    },
    'chile': {
        'country': 'Chile',
        'pool': 'Pool D'
    },
    'uruguay': {
        'country': 'Uruguay',
        'pool': 'Pool A'
    },
    'fiji': {
        'country': 'Fiji',
        'pool': 'Pool C'
    },
    'georgia': {
        'country': 'Georgia',
        'pool': 'Pool C'
    },
    'portugal': {
        'country': 'Portugal',
        'pool': 'Pool C'
    },
    'unknown': {
        'pool': 'Unfortunately did not qualify for Rugby World Cup 2023'
    }

}

app.get('/', (req, resp) => {
    resp.sendFile(__dirname + '/index.html');
})

app.get('/api/:country', (req,res) => {
    const countryName = req.params.country.toLowerCase();
    teams[countryName] ? res.json(teams[countryName]) : res.json(teams['unknown']);
})

app.listen(process.env.PORT || PORT, () =>{
    console.log(`Server running on port ${PORT}`);
})