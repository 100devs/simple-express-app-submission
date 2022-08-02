console.log('Server is here')

if (process.env.NODE_DEV !== 'production'){
    const dotenv = require('dotenv')
    dotenv.config({path: 'proc.env'}) //add env path
}
const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient

MongoClient.connect(process.env.DATABASE_URL, { 
    useUnifiedTopology: true 
})
    .then(client => {
        console.log('connected to database')
        const db = client.db('bunch-of-things')  //database name
        const thingGroup = db.collection('things') //collection name

        // express to find and serve public directory contents
        app.use(express.static('public'))
        // set engine ahead of everything else
        app.set('view engine', 'ejs')
        // 'middleware'
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }))

        app.get ('/', (req,res)=>{
            // res.send('HELLO!')
            thingGroup.find().toArray()
                .then(results => {
                    res.render('index.ejs', { stuff: results }) 
                })
            console.log('we sent a thing')
        })

        // filter by tag
        app.get ('/tags/:keyword', (req,res)=>{
            const tag = req.params.keyword
            thingGroup.find({ tags: tag }).toArray()
            .then(results => {
                res.render('index.ejs', { stuff: results }) 
            })
        })

        // search, not filter
        app.get ('/search', (req,res)=>{
            const term = req.query.term
            thingGroup.find({ title: { $regex:term, $options: 'i'}}).toArray()
            .then(results => {
                res.render('index.ejs', { stuff: results }) 
            })
        })
        
        app.post('/addPic', (req,res)=>{
            if (req.body.passcode === process.env.PASSCODE){
                const newTags = req.body.tags.split(', ')
                thingGroup.insertOne({
                    title: req.body.title,
                    imgURL: req.body.imgURL,
                    vidURL: req.body.vidURL,
                    caption: req.body.caption,
                    tags: [...newTags]
                })
                .then(result => {
                    // console.log(result)
                    res.redirect('/') //you don't want to reload persistently at /thing either - it resubs
                })
            }else {
                res.json('Passcode incorrect.')
            }
            
        })

        app.post('/find', (req,res)=>{
            if (req.body.passcode === '2554'){
                const newTags = req.body.tags.split(', ')
                thingGroup.insertOne({
                    title: req.body.title,
                    imgURL: req.body.imgURL,
                    vidURL: req.body.vidURL,
                    caption: req.body.caption,
                    tags: [...newTags]
                })
                .then(result => {
                    // console.log(result)
                    res.redirect('/') //you don't want to reload persistently at /thing either - it resubs
                })
            }else {
                res.json('Passcode incorrect.')
            }
            
        })

        app.put('/update', (req,res)=>{
            if (req.body.passcode === process.env.PASSCODE){
                if (req.body.field === 'Title'){
                    thingGroup.updateOne({title: req.body.title}, {
                        $set: {
                            'title': req.body.edit
                        }
                    },{
                        sort: {_id: -1}, //not sure this does anything for me - is it listing from most recent entry to oldest?
                        upsert: false //don't add if doesn't exist
                    })
                    .then(result => {
                        console.log('Updated a title')
                        res.json('Updated a title')
                    })
                    .catch(error => console.error(error))
                }else if (req.body.field === 'Tags'){
                    const newTags = req.body.edit.split(', ')
                    thingGroup.updateOne({title: req.body.title}, {
                        $addToSet: { 'tags': [...newTags] }
                    },{
                        sort: {_id: -1}, //not sure this does anything for me - is it listing from most recent entry to oldest?
                        upsert: false //don't add if doesn't exist based on title spec
                    })
                    .then(result => {
                        console.log('Updated a title')
                        res.json('Updated a title')
                    })
                    .catch(error => console.error(error))
                }else if (req.body.field === 'Asset URL'){
                    if (req.body.urlType === 'video'){
                        thingGroup.updateOne({title: req.body.title}, {
                            $set: {
                                'vidURL': req.body.edit,
                            }
                        },{
                            sort: {_id: -1}, 
                            upsert: false 
                        })
                        .then(result => {
                            console.log('Updated vid url')
                            res.json('Updated video url')
                        })
                        .catch(error => console.error(error))
                    } else {
                        thingGroup.updateOne({title: req.body.title}, {
                            $set: {
                                'imgURL': req.body.edit,
                            }
                        },{
                            sort: {_id: -1}, 
                            upsert: false 
                        })
                        .then(result => {
                            console.log('Updated img url')
                            res.json('Updated img url')
                        })
                        .catch(error => console.error(error))
                    }
                }else if (req.body.field === 'Caption'){
                    thingGroup.updateOne({title: req.body.title}, {
                        $set: {
                            'caption': req.body.edit 
                        }
                    },{
                        sort: {_id: -1}, 
                        upsert: false 
                    })
                    .then(result => {
                        console.log('Updated a caption')
                        // response.json('Updated a caption')
                    })
                    .catch(error => console.error(error))
                }else {
                    res.end() //can't do anything 
                }
                res.redirect('/') //refresh to show change
            }else {
                res.json('Passcode incorrect.')
                // res.end() //don't do anything if not valid
            }
        })

        app.delete('/deletePic', (req,res)=>{
            if (req.body.passcode === process.env.PASSCODE){
                thingGroup.deleteOne({title:req.body.title})
                .then(result => {
                    res.json('Bye forever')
                })
                .catch(err=> console.log(err))
            }else {
                res.json('Passcode incorrect.')
                // res.end() //don't do anything if not valid
            }
        })

        app.listen(process.env.PORT || 3300, ()=> {
            console.log('Listening on 3300 or her port')
        })
    })
    .catch(err => console.log(err))

