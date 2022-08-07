import express from 'express'
import cors from 'cors'
import fs from 'fs'

//define __dirname since using ES modules does not do it automatically?
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()
const PORT = process.env.PORT || 8000

app.set('view engine', 'ejs')

app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

app.get('/', (req, res) => {
    let data = JSON.parse(getCharacters())
    res.render('index.ejs', { info: data, p1: '', p2: '' })
})

app.get('/turn/:player1/:player2', (req, res) => {
    const player1 = req.params.player1.toLowerCase()
    const player2 = req.params.player2.toLowerCase()
    const data = JSON.parse(getCharacters())
    res.render('index.ejs', { info: data, p1: player1, p2: player2 })
})

app.get('/api', (req, res) => {
    res.render('api.ejs')
})

app.get('/api/:character', (req, res) => {
    const character = req.params.character.toLowerCase()

    //serves a JSON file if the api endpoint matches one of the file names in /data
    if (fs.existsSync(`./data/ggst/${character}.json`)) {
        res.sendFile(__dirname + `/data/ggst/${character}.json`)
    }else{
        res.statusMessage =  'Invalid Endpoint'
        res.status(400).end()
    }
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`) 
})

function getCharacters() {

    let data = fs.readFileSync(`${__dirname}/data/ggst/all.json`, 'utf8', (err, data) => {
        if (err) throw err
        return JSON.parse(data)
    })

    return data

}
