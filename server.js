const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8000
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config()

// console.log(dotenv.parsed)

// const connectionString = process.env.dbString

// console.log(process.env)


// let db,
// let dbconnectionStr = process.env.DB_STRING
//     dbName = 'favMoviesPt2'


app.use(cors())
// middleware - helps facilitate communication
// app.set('view engine' ,'ejs')



MongoClient.connect(process.env.dbString, { useUnifiedTopology: true })
    .then(client => {
        // console.log(`Connected to ${dbname} Database`)
        // db = client.db(dbName)
        console.log(`Connected to database`)
        const db = client.db('favMoviesPt2')
        const movieCollection = db.collection('movie-info')

        // Middlewares
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(express.urlencoded({
            extended: true
        }))
        app.use(express.json())
        app.use(express.static('public'))


    
    // Routes

    // Whenever there is '/' that means we will be directed to the homepage
    app.get('/', (request, response) => {
        response.sendFile(__dirname + '/index.html')
        // const movieCollection = db.collection('movie-info').find().toArray()
        // console.log(movieCollection)
        // response.render('index.ejs', {})
        // const connectionString = process.env.DB_STRING

    })

    // route for when user enters a movie title that's
    // already in the db and wants that data to be returned
    // in JSON format
    app.get('/api/:movieName', (request, response) => {
    const movieNames = request.params.movieName
        movieCollection.find({movieTitle: movieNames}).toArray()
        .then(results => {
            console.log(results)
            response.json(results[0])
        })
        .catch(error => console.error(error))

        

    })

    // route if user were to add movie to db
    // connects to the collection in db
    // and adds everything inputted in field straight to the db
    app.post('/addMovie', (request, response) => {
        db.collection('movie-info').insertOne({movieTitle: request.body.movieTitle,
        dateReleased: request.body.dateReleased, notableCelebs: {name1: request.body.name1, name2: request.body.name2, name3: request.body.name3},//request.body.notableCeleb1, 
        shortBio: request.body.shortBio, rottenTomatoesRating: request.body.rottenTomatoesRating})
        // movieCollection.insertOne(request.body)

            .then(result => {
                console.log('Movie Added')
                response.redirect('/')
            })
       
    })

})
.catch(error => console.error(error))


app.listen(process.env.PORT || PORT, () => {
    console.log('Server is running.')
})


// creation of my own movie api
// const movieList = {
//     'I Am Legend': {
//         'movieTitle': 'I Am Legend',
//         'dateReleased': 'December 14, 2007',
//         'notableCelebs': {
//             'name1': 'Will Smith',
//             'name2': 'Alice Braga',
//             'name3': 'Charlie Tahan'
//         },
//         'shortBio': 'Will Smith plays as a scientist who survives a man-made plague that transforms humans into mutants. Now he wanders NY looking for survivors while on the hunt for a possible cure but the infected watch his every move hoping for his one mistake that will make Will become one of them',
//         'rottenTomatoesRating': '68%'
//     },

//     'Avengers: Infinity War': {
//         'movieTitle': 'Avengers: Infinity War',
//         'dateReleased': 'April 23, 2018',
//         'notableCelebs': {
//             'name1': 'Robert Downey Jr',
//             'name2': 'Chris Hemsworth',
//             'name3': 'Chris Evans'
//         },
//         'shortBio': 'Iron Man, Thor, Hulk and the rest of the Avengers unite to battle their most powerful enemy yet, Thanos who is on a mission to collect 6 infinity stones to wipe out half population on Earth.',
//         'rottenTomatoesRating': '85%'
//     },

//     'Really Love': {
//         'movieTitle': 'Really Love',
//         'dateReleased': 'August 25, 2021',
//         'notableCelebs': {
//             'name1': 'Kofi Siriboe',
//             'name2': 'Yootha Wong-Loi-Sing',
//             'name3': 'Michael Ealy'
//         },
//         'shortBio': 'A rising black painter tries to break into the competitive art world while balancing an unexpected romance with an ambitious law student.',
//         'rottenTomatoesRating': '86%'
//     },

//     'Rush Hour 2': {
//         'movieTitle': 'Rush Hour 2',
//         'dateReleased': 'August 3, 2001',
//         'notableCelebs': {
//             'name1': 'Jackie Chan',
//             'name2': 'Chris Tucker',
//             'name3': 'Roselyn Sanchez'
//         },
//         'shortBio': 'An explosion in the U.S. Embassy in Hong Kong kills 2 cutoms agents investigating currency smuggling. Inspector Lee and James Carter search for the mastermind. Minions are sent out to try and prevent them from finding out who did it.',
//         'rottenTomatoesRating': '52%' 
//     },

//     'Other Movies': {
//         'movieTitle': 'Blahh the movie',
//         'dateReleased': 'May blah blah',
//         'notableCelebs': {
//             'name1': 'not',
//             'name2': 'a',
//             'name3': 'movie'
//         },
//         'shortBio': 'A movie about nothing',
//         'rottenTomatoesRating': '0%'
//     }
// }
