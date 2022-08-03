const express = require('express')
const mongoose = require('mongoose');
const Anime = require('./dbSchema')
const app = express()


const dbUri = "mongodb+srv://JaMox2:20040210Jv@animedb.fz6gtq6.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(
    dbUri,
    { useNewUrlParser: true, useUnifiedTopology: true}
  )
  .then(()=>console.log('connected'))
  .catch(e=>console.log(e));

app.use('/public', express.static('public'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(express.json({extended: true}))

// https://api.jikan.moe/v3/search/anime?q=nar

let getTopAnimeHTTP = "https://api.jikan.moe/v3/search/anime?q=&order_by=members&sort=desc&page=1"

app.get('/', async (req,res)=>{
    let topAni = await fetch(getTopAnimeHTTP)
        let anime = await topAni.json()
    // console.log(anime)
    res.render('index.ejs', {anime: anime})
})
app.get('/search', async (req,res)=>{
    let query = req.query.title.split(' ').join('%20')
    console.log(query)
    let searchAnime = await fetch(`https://api.jikan.moe/v3/search/anime?q=${query}&limit=20`)
        let filteredAnime = await searchAnime.json()
    if(filteredAnime['results'].length > 0){
        res.render("search.ejs", {searchAnim: filteredAnime})

    }else if(filteredAnime['status'] == 500){
        res.render("search.ejs")
    }
})
app.get('/mylist', async (req,res)=>{
    let allAnimeInList = await Anime.find().sort({createdAt: 'desc'})
    // console.log(allAnimeInList)
    res.render('list.ejs', {anime: allAnimeInList})
})
app.post('/', (req,res)=>{
    let anim = new Anime({
        title: req.body.title,
        score: req.body.score,
        img: req.body.imgUrl,
        ep: req.body.episodes,
        synopsis: req.body.synopsis,
        currentEp: 0
    })
    res.json({msg: `${req.body.title} hase been saved`})
    anim.save().then(()=>console.log(`Anime: ${anim.title} has been save to DB`))
})
app.delete('/', (req,res)=>{
    let lookingFor = req.body.name
    Anime.deleteOne({title: lookingFor},(err,doc)=>{})
    res.json({msg: `Deleted`})
})
app.put('/', async (req,res)=>{
    let value = Number(req.body.newValue)
    let anime = await Anime.findOneAndUpdate({title: req.body.title}, {currentEp: value}, { new: true })
    res.json({msg:`${req.body.title} has been updated`})
})

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server is running in PORT: ${PORT}`))